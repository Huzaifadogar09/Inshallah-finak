import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions from the website's "Get In Touch" section.
 * Every submission is stored here so the admin can review and follow up.
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  /** Visitor's full name */
  name: varchar("name", { length: 200 }).notNull(),
  /** Visitor's email address */
  email: varchar("email", { length: 320 }).notNull(),
  /** Visitor's phone number (optional) */
  phone: varchar("phone", { length: 50 }),
  /** Company or organisation name (optional) */
  company: varchar("company", { length: 200 }),
  /** Subject / topic of the enquiry */
  subject: varchar("subject", { length: 300 }),
  /** Full message body */
  message: text("message").notNull(),
  /** Whether the submission has been read/reviewed by the admin */
  isRead: boolean("isRead").default(false).notNull(),
  /** Language the form was submitted in: 'en' or 'ar' */
  lang: varchar("lang", { length: 5 }).default("en").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Completed projects portfolio — mirrors the data in ProjectsSection.tsx
 * so it can be managed from the database over time.
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  /** Short project code used for filtering, e.g. "p1", "p16" */
  code: varchar("code", { length: 20 }).notNull().unique(),
  /** English title */
  titleEn: varchar("titleEn", { length: 400 }).notNull(),
  /** Arabic title */
  titleAr: varchar("titleAr", { length: 400 }).notNull(),
  /** English description */
  descEn: text("descEn"),
  /** Arabic description */
  descAr: text("descAr"),
  /** Client / owner name */
  client: varchar("client", { length: 200 }),
  /** Year of completion */
  year: varchar("year", { length: 10 }),
  /** Category tag, e.g. "Roads", "Bridges", "Pipelines" */
  category: varchar("category", { length: 100 }),
  /** JSON array of CDN image/video URLs */
  mediaUrls: text("mediaUrls"),
  /** Display order (lower = shown first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Ongoing / active contracts — mirrors OngoingProjectsSection.tsx data.
 */
export const ongoingProjects = mysqlTable("ongoing_projects", {
  id: int("id").autoincrement().primaryKey(),
  /** Short code, e.g. "op1" */
  code: varchar("code", { length: 20 }).notNull().unique(),
  /** English title */
  titleEn: varchar("titleEn", { length: 400 }).notNull(),
  /** Arabic title */
  titleAr: varchar("titleAr", { length: 400 }).notNull(),
  /** English description */
  descEn: text("descEn"),
  /** Arabic description */
  descAr: text("descAr"),
  /** Client / owner */
  client: varchar("client", { length: 200 }),
  /** Contract start date (ISO string) */
  startDate: varchar("startDate", { length: 20 }),
  /** Contract end date (ISO string) */
  endDate: varchar("endDate", { length: 20 }),
  /** Completion percentage 0-100 */
  completion: int("completion").default(0).notNull(),
  /** Category: "Roads" | "Bridges" | "Pipelines" | "Infrastructure" | "Maintenance" */
  category: varchar("category", { length: 100 }),
  /** Optional remarks */
  remarks: text("remarks"),
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OngoingProject = typeof ongoingProjects.$inferSelect;
export type InsertOngoingProject = typeof ongoingProjects.$inferInsert;
