import {
  certifications,
  education,
  experiences,
  projects,
  skills,
  techStacks,
} from '../db/schema.js';

/**
 * Declarative descriptors that drive the generic CMS CRUD UI. Each field maps
 * a form key to a Drizzle column property name plus an input type used for both
 * rendering and coercion.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'date'
  | 'url'
  | 'json';

export type Field = {
  key: string; // Drizzle column property AND form field name
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
};

export type Resource = {
  slug: string;
  label: string;
  table: any;
  fields: Field[];
  listColumns: string[];
  hasTechStack?: boolean; // projects only — M2M tech stack editor
  readOnly?: boolean; // contact inbox
  orderBy?: string; // column property to order the list by
};

export const RESOURCES: Record<string, Resource> = {
  projects: {
    slug: 'projects',
    label: 'Projects',
    table: projects,
    orderBy: 'order',
    hasTechStack: true,
    listColumns: ['title', 'category', 'status', 'order', 'isFeatured'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['PUBLISHED', 'DRAFT'] },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: ['WEB', 'MOBILE', 'AI_ML', 'DATA', 'DESKTOP', 'OTHER'],
      },
      {
        key: 'imageUrl',
        label: 'Image URL',
        type: 'url',
        help: 'External image URL (uploads are not supported).',
      },
      { key: 'githubLink', label: 'GitHub Link', type: 'url' },
      { key: 'liveLink', label: 'Live Link', type: 'url' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'isFeatured', label: 'Featured', type: 'boolean' },
    ],
  },
  'tech-stacks': {
    slug: 'tech-stacks',
    label: 'Tech Stacks',
    table: techStacks,
    orderBy: 'name',
    listColumns: ['name', 'iconClass', 'isVisible'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'iconClass', label: 'Icon Class', type: 'text' },
      { key: 'isVisible', label: 'Visible', type: 'boolean' },
    ],
  },
  skills: {
    slug: 'skills',
    label: 'Skills',
    table: skills,
    orderBy: 'order',
    listColumns: ['name', 'category', 'order'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: ['FRONTEND', 'BACKEND', 'AI_ML', 'TOOLS', 'OTHER'],
      },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  education: {
    slug: 'education',
    label: 'Education',
    table: education,
    orderBy: 'order',
    listColumns: ['degree', 'institution', 'startDate', 'order'],
    fields: [
      { key: 'institution', label: 'Institution', type: 'text', required: true },
      { key: 'degree', label: 'Degree', type: 'text', required: true },
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'endDate', label: 'End Date', type: 'date' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  certifications: {
    slug: 'certifications',
    label: 'Certifications',
    table: certifications,
    orderBy: 'dateIssued',
    listColumns: ['name', 'issuer', 'dateIssued'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'issuer', label: 'Issuer', type: 'text', required: true },
      { key: 'dateIssued', label: 'Date Issued', type: 'date', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'url', label: 'Verify URL', type: 'url' },
      { key: 'imageUrl', label: 'Image URL', type: 'url' },
    ],
  },
  experiences: {
    slug: 'experiences',
    label: 'Experience',
    table: experiences,
    orderBy: 'order',
    listColumns: ['title', 'category', 'order', 'isVisible'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: ['hackathons', 'engineering', 'academic', 'education'],
      },
      { key: 'icon', label: 'Icon (emoji)', type: 'text' },
      {
        key: 'color',
        label: 'Color',
        type: 'select',
        options: ['purple', 'cyan', 'green', 'pink', 'orange'],
      },
      {
        key: 'items',
        label: 'Items (JSON)',
        type: 'json',
        help: '[{"name": "...", "date": "...", "detail": "..."}]',
      },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'isVisible', label: 'Visible', type: 'boolean' },
    ],
  },
};

/** Coerce a raw form value to the typed value for its field. */
export function coerceField(field: Field, raw: string | undefined): unknown {
  switch (field.type) {
    case 'boolean':
      return raw === 'on' || raw === 'true';
    case 'number':
      return raw ? Number(raw) : 0;
    case 'json':
      return raw ? JSON.parse(raw) : [];
    case 'date':
      return raw ? raw : null;
    case 'url':
    case 'text':
    case 'textarea':
    case 'select':
      return raw ?? '';
    default:
      return raw ?? '';
  }
}
