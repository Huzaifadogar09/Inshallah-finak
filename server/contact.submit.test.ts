import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the DB helper so tests don't need a real database
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue(42),
  listContactSubmissions: vi.fn().mockResolvedValue([]),
  markSubmissionRead: vi.fn().mockResolvedValue(undefined),
  listProjects: vi.fn().mockResolvedValue([]),
  listOngoingProjects: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// Mock the notification helper
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a valid EN submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Ahmed Al-Otaibi",
      email: "ahmed@example.com",
      phone: "+966501234567",
      company: "ACME Corp",
      subject: "Road Construction",
      message: "We are interested in your services.",
      lang: "en",
    });

    expect(result.success).toBe(true);
    expect(result.id).toBe(42);
  });

  it("accepts a minimal submission (name + email + message only)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Sara",
      email: "sara@example.com",
      message: "Hello",
      lang: "ar",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a submission with an invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Bad Email",
        email: "not-an-email",
        message: "Test",
        lang: "en",
      })
    ).rejects.toThrow();
  });

  it("rejects a submission with an empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Empty Message",
        email: "test@example.com",
        message: "",
        lang: "en",
      })
    ).rejects.toThrow();
  });
});
