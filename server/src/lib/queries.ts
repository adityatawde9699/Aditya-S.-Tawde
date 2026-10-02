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

/** Only IDs from the already-public portfolio catalog are exposed. This lets
 * the client suppress curated fallback entries when an editor makes one draft,
 * without exposing draft titles, descriptions, or private repository links. */
export async function getProjectVisibility() {
  const catalog: Record<string, string> = {
    'amadeus-ai': 'amadeus-ai', lunamatch: 'lunamatch', climax: 'climax',
    cognate: 'cognate', neurox: 'neurox', leger: 'ledger',
    'coffee-n-me': 'coffee-n-me', 'arth-neeti-game': 'arth-neeti-game',
    'amadeus-chat': 'amadeus-chat', 'system-32-inter-view-ai': 'system-32-inter-view-ai',
    'fake-review-system': 'fake-review-system', indus: 'indus', librarypro: 'librarypro',
    datascraperviz: 'datascraperviz', nexusarena: 'nexusarena',
    'crystalreadymades.com': 'crystalreadymades.com', queuebite: 'queuebite',
  };
  const rows = await db.select({ link: projects.githubLink, status: projects.status }).from(projects);
  const visibility: Record<string, boolean> = {};
  for (const row of rows) {
    if (!row.link) continue;
    try {
      const url = new URL(row.link);
      if (url.hostname !== 'github.com') continue;
      const segments = url.pathname.toLowerCase().replace(/\.git$/, '').split('/').filter(Boolean);
      const id = segments[0] === 'adityatawde9699' && segments.length === 2 ? catalog[segments[1]] : undefined;
      if (id) visibility[id] = (visibility[id] ?? true) && row.status === 'PUBLISHED';
    } catch { /* Invalid legacy links do not participate in publication control. */ }
  }
  return visibility;
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
