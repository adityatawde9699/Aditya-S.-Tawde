import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * Drizzle schema mirroring the original Django models in
 * server/portfolio/models.py. Table/column names are kept explicit so the
 * schema is self-documenting and independent of Django's naming.
 */

export const techStacks = pgTable('tech_stacks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  iconClass: varchar('icon_class', { length: 100 }).notNull().default(''),
  isVisible: boolean('is_visible').notNull().default(true),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 10 }).notNull().default('PUBLISHED'),
  category: varchar('category', { length: 20 }).notNull().default('WEB'),
  imageUrl: text('image_url'),
  githubLink: text('github_link'),
  liveLink: text('live_link'),
  order: integer('order').notNull().default(0),
  isFeatured: boolean('is_featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Many-to-many join between projects and tech stacks. */
export const projectTechStacks = pgTable(
  'project_tech_stacks',
  {
    projectId: integer('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    techStackId: integer('tech_stack_id')
      .notNull()
      .references(() => techStacks.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.techStackId] })],
);

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  institution: varchar('institution', { length: 200 }).notNull(),
  degree: varchar('degree', { length: 200 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  description: text('description').notNull().default(''),
  order: integer('order').notNull().default(0),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 20 }).notNull().default('OTHER'),
  order: integer('order').notNull().default(0),
});

export const certifications = pgTable('certifications', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  issuer: varchar('issuer', { length: 200 }).notNull(),
  dateIssued: date('date_issued').notNull(),
  description: text('description').notNull().default(''),
  url: text('url'),
  imageUrl: text('image_url'),
});

export type ExperienceItem = { name: string; date: string; detail: string };

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  category: varchar('category', { length: 20 }).notNull().default('engineering'),
  icon: varchar('icon', { length: 10 }).notNull().default('🔬'),
  color: varchar('color', { length: 10 }).notNull().default('purple'),
  items: jsonb('items').$type<ExperienceItem[]>().notNull().default([]),
  order: integer('order').notNull().default(0),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  message: text('message').notNull(),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
  isRead: boolean('is_read').notNull().default(false),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 150 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Relations ────────────────────────────────────────────────────────────

export const projectsRelations = relations(projects, ({ many }) => ({
  projectTechStacks: many(projectTechStacks),
}));

export const techStacksRelations = relations(techStacks, ({ many }) => ({
  projectTechStacks: many(projectTechStacks),
}));

export const projectTechStacksRelations = relations(projectTechStacks, ({ one }) => ({
  project: one(projects, {
    fields: [projectTechStacks.projectId],
    references: [projects.id],
  }),
  techStack: one(techStacks, {
    fields: [projectTechStacks.techStackId],
    references: [techStacks.id],
  }),
}));

// ── Inferred types ───────────────────────────────────────────────────────

export type Project = typeof projects.$inferSelect;
export type TechStack = typeof techStacks.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
