import type {
  Certification,
  Education,
  Experience,
  Project,
  Skill,
  TechStack,
} from '../db/schema.js';

/**
 * Output shaping that matches the original DRF serializers in
 * server/portfolio/serializers.py, so the React client receives byte-for-byte
 * equivalent JSON and needs no field-level changes.
 */

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  WEB: 'Web Development',
  MOBILE: 'Mobile App',
  AI_ML: 'AI/ML',
  DATA: 'Data Science',
  DESKTOP: 'Desktop App',
  OTHER: 'Other',
};

export function serializeTechStack(t: TechStack) {
  return { id: t.id, name: t.name, icon_class: t.iconClass };
}

export function serializeProject(p: Project, techStack: TechStack[]) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    category_display: PROJECT_CATEGORY_LABELS[p.category] ?? p.category,
    image: p.imageUrl ?? null,
    github_link: p.githubLink ?? null,
    live_link: p.liveLink ?? null,
    tech_stack: techStack.map(serializeTechStack),
    order: p.order,
    is_featured: p.isFeatured,
  };
}

export function serializeSkill(s: Skill) {
  return { id: s.id, name: s.name, category: s.category };
}

export function serializeEducation(e: Education) {
  return {
    id: e.id,
    institution: e.institution,
    degree: e.degree,
    start_date: e.startDate,
    end_date: e.endDate ?? null,
    description: e.description,
    order: e.order,
  };
}

export function serializeCertification(c: Certification) {
  return {
    id: c.id,
    name: c.name,
    issuer: c.issuer,
    date_issued: c.dateIssued,
    description: c.description,
    url: c.url ?? null,
    image: c.imageUrl ?? null,
  };
}

export function serializeExperience(e: Experience) {
  return {
    id: e.id,
    title: e.title,
    category: e.category,
    icon: e.icon,
    color: e.color,
    items: e.items,
    order: e.order,
  };
}
