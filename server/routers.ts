import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  createContactSubmission,
  listContactSubmissions,
  markSubmissionRead,
  listProjects,
  listOngoingProjects,
} from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: router({
    /**
     * Public: submit the Get In Touch form.
     * Persists the submission to the database and notifies the site owner.
     */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          email: z.string().email().max(320),
          phone: z.string().max(50).optional(),
          company: z.string().max(200).optional(),
          subject: z.string().max(300).optional(),
          message: z.string().min(1),
          lang: z.enum(["en", "ar"]).default("en"),
        })
      )
      .mutation(async ({ input }) => {
        const id = await createContactSubmission(input);

        // Notify the site owner via Manus notification
        await notifyOwner({
          title: `New Contact Form Submission — ${input.name}`,
          content: `From: ${input.name} <${input.email}>\nCompany: ${input.company ?? "—"}\nSubject: ${input.subject ?? "—"}\n\n${input.message}`,
        }).catch(() => {
          // Non-fatal: log but don't fail the mutation
          console.warn("[Contact] Owner notification failed");
        });

        return { success: true, id };
      }),

    /**
     * Protected (admin only): list all contact submissions.
     */
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Forbidden");
      }
      return listContactSubmissions();
    }),

    /**
     * Protected (admin only): mark a submission as read.
     */
    markRead: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Forbidden");
        }
        await markSubmissionRead(input.id);
        return { success: true };
      }),
  }),

  // ─── Projects (completed) ─────────────────────────────────────────────────
  projects: router({
    /** Public: list all active completed projects */
    list: publicProcedure.query(async () => {
      return listProjects();
    }),
  }),

  // ─── Ongoing Projects ─────────────────────────────────────────────────────
  ongoingProjects: router({
    /** Public: list all active ongoing projects */
    list: publicProcedure.query(async () => {
      return listOngoingProjects();
    }),
  }),
});

export type AppRouter = typeof appRouter;
