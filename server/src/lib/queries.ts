import { and, asc, desc, eq, inArray } from 'drizzle-orm';

import { db } from '../db/client.js';
import {
  certifications,
  education,
  experiences,
  projects,
  projectTechStacks,
  skills,
  techStacks,
  type TechStack,
} from '../db/schema.js';
import {
  serializeCertification,
  serializeEducation,
  serializeExperience,
  serializeProject,
  serializeSkill,
  serializeTechStack,
} from './serialize.js';

/**
 * Read queries with response shaping. Projects + their M2M tech stacks are
 * fetched in two grouped queries (projects, then all join rows) and stitched
 * in memory — no per-project N+1 lookups.
 */

export type ProjectFilters = { featured?: boolean; category?: string };

export async function getProjects(filters: ProjectFilters = {}) {
  const conditions = [eq(projects.status, 'PUBLISHED')];
  if (filters.featured) conditions.push(eq(projects.isFeatured, true));
  if (filters.category) conditions.push(eq(projects.category, filters.category.toUpperCase()));

  const rows = await db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(asc(projects.order));

  if (rows.length === 0) return [];

  const projectIds = rows.map((r) => r.id);
  const joins = await db
    .select({
      projectId: projectTechStacks.projectId,
      tech: techStacks,
    })
    .from(projectTechStacks)
    .innerJoin(techStacks, eq(projectTechStacks.techStackId, techStacks.id))
    .where(inArray(projectTechStacks.projectId, projectIds));

  const byProject = new Map<number, TechStack[]>();
  for (const j of joins) {
    const list = byProject.get(j.projectId) ?? [];
    list.push(j.tech);
    byProject.set(j.projectId, list);
  }

  return rows.map((p) =>
    serializeProject(
      p,
      (byProject.get(p.id) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
    ),
  );
}

export async function getTechStacks() {
  const rows = await db
    .select()
    .from(techStacks)
    .where(eq(techStacks.isVisible, true))
    .orderBy(asc(techStacks.name));
  return rows.map(serializeTechStack);
}

export async function getSkills() {
  const rows = await db
    .select()
    .from(skills)
    .orderBy(asc(skills.category), asc(skills.order), asc(skills.name));
  return rows.map(serializeSkill);
}

export async function getEducation() {
  const rows = await db.select().from(education).orderBy(desc(education.startDate));
  return rows.map(serializeEducation);
}

export async function getCertifications() {
  const rows = await db
    .select()
    .from(certifications)
    .orderBy(desc(certifications.dateIssued));
  return rows.map(serializeCertification);
}

export async function getExperiences() {
  const rows = await db
    .select()
    .from(experiences)
    .where(eq(experiences.isVisible, true))
    .orderBy(asc(experiences.order));
  return rows.map(serializeExperience);
}
