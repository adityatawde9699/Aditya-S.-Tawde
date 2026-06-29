import { eq } from 'drizzle-orm';

import { config } from '../config.js';
import { hashPassword } from '../lib/auth.js';
import { db } from './client.js';
import {
  adminUsers,
  experiences,
  projects,
  projectTechStacks,
  skills,
  techStacks,
  type ExperienceItem,
} from './schema.js';

/**
 * Idempotent seed — ports server/portfolio/management/commands/seed_portfolio.py
 * verbatim (tech stacks, projects + M2M, experiences, skills) and ensures an
 * admin user exists from ADMIN_USERNAME / ADMIN_PASSWORD.
 *
 * Run with `npm run db:seed`. Pass `--force` to re-run even if projects exist.
 */

const TECHS = [
  'Python', 'FastAPI', 'SQLAlchemy', 'Docker', 'Gemini API',
  'HTML/CSS/JS', 'Whisper AI', 'TypeScript', 'Tauri 2.0', 'SQLite',
  'React', 'PostgreSQL', 'Node.js', 'Django', 'Vite',
  'Selenium', 'Pandas', 'Matplotlib', 'Seaborn',
  'Streamlit', 'Scikit-learn', 'JavaScript', 'HTML/CSS', 'REST APIs',
];

type ProjectSeed = {
  title: string;
  description: string;
  category: string;
  github_link?: string;
  techs: string[];
  order: number;
  is_featured: boolean;
};

const PROJECTS: ProjectSeed[] = [
  {
    title: 'Amadeus-AI: Hybrid AI Assistant',
    description:
      'A modular, voice-enabled AI assistant utilizing a hybrid architecture. Combines local ML classifiers for rapid intent routing with Google Gemini for complex reasoning and context management. Built with a scalable Python backend.',
    category: 'AI_ML',
    github_link: 'https://github.com/adityatawde9699/Amadeus-AI',
    techs: ['Python', 'FastAPI', 'SQLAlchemy', 'Docker', 'Gemini API'],
    order: 1,
    is_featured: true,
  },
  {
    title: 'System-32 AI Interview Coach',
    description:
      'Real-time AI interview coach featuring context-aware question generation. Implements local speech transcription via Whisper and utilizes Gemini 2.0 for zero-latency coaching feedback on speaking delivery.',
    category: 'AI_ML',
    github_link: 'https://github.com/adityatawde9699/System-32-Inter-View-AI',
    techs: ['Python', 'FastAPI', 'HTML/CSS/JS', 'Whisper AI', 'Gemini API'],
    order: 2,
    is_featured: true,
  },
  {
    title: 'Cognate Smart Task Manager',
    description:
      'Native, offline-capable smart task manager designed for cross-platform desktop use. Features a glassmorphism UI and a robust fallback storage mechanism bridging SQLite and localStorage.',
    category: 'DESKTOP',
    github_link: 'https://github.com/adityatawde9699/Cognate',
    techs: ['TypeScript', 'Tauri 2.0', 'SQLite', 'React'],
    order: 3,
    is_featured: true,
  },
  {
    title: 'CrystalReadymades E-Commerce Platform',
    description:
      'Full-stack e-commerce platform built for high-performance transaction processing. Features a robust relational database schema and a decoupled frontend-backend architecture.',
    category: 'WEB',
    github_link: 'https://github.com/adityatawde9699/crystalreadymades.com',
    techs: ['FastAPI', 'PostgreSQL', 'React', 'TypeScript'],
    order: 4,
    is_featured: true,
  },
  {
    title: 'Arth-Neeti Financial Simulation Game',
    description:
      'A simulation cards-based quizzer game designed to test and improve financial literacy. Built with a decoupled architecture utilizing a React frontend and Django REST backend.',
    category: 'WEB',
    github_link: 'https://github.com/adityatawde9699/arth-neeti-game',
    techs: ['React', 'Node.js', 'Python', 'Django', 'Vite'],
    order: 5,
    is_featured: true,
  },
  {
    title: 'Market & Job Data Scraper',
    description:
      'A Python-based automation toolkit that scrapes real-time stock market data via Alpha Vantage and extracts job listings using Selenium. Generates programmatic visualizations.',
    category: 'DATA',
    github_link: 'https://github.com/adityatawde9699/DataScraperViz',
    techs: ['Python', 'Selenium', 'Pandas', 'Matplotlib', 'Seaborn'],
    order: 6,
    is_featured: true,
  },
  {
    title: 'NLP Fake Review Detector',
    description:
      'NLP-powered Streamlit application for instant sentiment analysis. Predicts positive, neutral, or negative classifications from raw text inputs.',
    category: 'AI_ML',
    techs: ['Python', 'Streamlit', 'Scikit-learn'],
    order: 7,
    is_featured: false,
  },
  {
    title: 'QueueBite Canteen System',
    description:
      'Smart queue management system featuring live order tracking, digital token generation, and real-time state synchronization between customers and staff.',
    category: 'WEB',
    techs: ['JavaScript', 'HTML/CSS', 'Node.js'],
    order: 8,
    is_featured: false,
  },
  {
    title: 'WeatherForesite Dashboard',
    description:
      'Real-time global weather forecasting application integrating third-party REST APIs to handle dynamic location data and alerts.',
    category: 'WEB',
    techs: ['JavaScript', 'HTML/CSS', 'REST APIs'],
    order: 9,
    is_featured: false,
  },
];

type ExperienceSeed = {
  title: string;
  category: string;
  icon: string;
  color: string;
  order: number;
  items: ExperienceItem[];
};

const EXPERIENCES: ExperienceSeed[] = [
  {
    title: 'Hackathons & Competitions',
    category: 'hackathons',
    icon: '🏆',
    color: 'cyan',
    order: 1,
    items: [
      { name: 'Smart India Hackathon', date: '2024', detail: 'Developed an AI-powered financial simulation game for rural literacy.' },
      { name: 'MGMU Appathon', date: '2023', detail: 'Built a smart queue management system for university canteens.' },
    ],
  },
  {
    title: 'Open Source & Engineering',
    category: 'engineering',
    icon: '💻',
    color: 'purple',
    order: 2,
    items: [
      { name: 'Full-Stack Web Development', date: '2024 - Present', detail: 'Architecting production-ready applications with React, Next.js, and Django.' },
      { name: 'AI Model Deployment', date: '2024', detail: 'Deploying local LLMs and multi-agent systems via FastAPI.' },
    ],
  },
  {
    title: 'Academic Projects',
    category: 'academic',
    icon: '🔬',
    color: 'pink',
    order: 3,
    items: [
      { name: 'Predictive Maintenance Model', date: '2025 (Expected)', detail: 'Developing machine learning models for industrial IoT sensors.' },
      { name: 'Natural Language Processing', date: '2024', detail: 'Implemented sentiment analysis pipelines for product reviews.' },
    ],
  },
  {
    title: 'Education',
    category: 'education',
    icon: '🎓',
    color: 'green',
    order: 4,
    items: [
      { name: 'B.Tech AI & Data Science', date: '2024 - 2028', detail: 'Jawaharlal Nehru Engineering College, MGMU · Chh. Sambhajinagar' },
      { name: 'Higher Secondary (HSC)', date: '2022 - 2024', detail: 'Vasantrao Naik College · Science Stream' },
    ],
  },
];

type SkillSeed = { name: string; category: string; order: number };

const SKILLS: SkillSeed[] = [
  { name: 'React 19', category: 'FRONTEND', order: 1 },
  { name: 'Next.js', category: 'FRONTEND', order: 2 },
  { name: 'TypeScript', category: 'FRONTEND', order: 3 },
  { name: 'Tailwind CSS', category: 'FRONTEND', order: 4 },
  { name: 'Framer Motion', category: 'FRONTEND', order: 5 },
  { name: 'Python', category: 'BACKEND', order: 1 },
  { name: 'FastAPI', category: 'BACKEND', order: 2 },
  { name: 'Django', category: 'BACKEND', order: 3 },
  { name: 'PostgreSQL', category: 'BACKEND', order: 4 },
  { name: 'Node.js', category: 'BACKEND', order: 5 },
  { name: 'PyTorch', category: 'AI_ML', order: 1 },
  { name: 'Pandas/NumPy', category: 'AI_ML', order: 2 },
  { name: 'Gemini API', category: 'AI_ML', order: 3 },
  { name: 'Scikit-Learn', category: 'AI_ML', order: 4 },
  { name: 'Agentic AI', category: 'AI_ML', order: 5 },
  { name: 'Docker', category: 'TOOLS', order: 1 },
  { name: 'Git/GitHub Actions', category: 'TOOLS', order: 2 },
  { name: 'Linux', category: 'TOOLS', order: 3 },
  { name: 'AWS (EC2/S3)', category: 'TOOLS', order: 4 },
  { name: 'Vercel/Render', category: 'TOOLS', order: 5 },
];

async function upsertTechStacks(): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  for (const name of TECHS) {
    const [existing] = await db.select().from(techStacks).where(eq(techStacks.name, name)).limit(1);
    if (existing) {
      map.set(name, existing.id);
    } else {
      const [created] = await db.insert(techStacks).values({ name }).returning();
      map.set(name, created.id);
    }
  }
  return map;
}

async function upsertProjects(techMap: Map<string, number>): Promise<void> {
  for (const p of PROJECTS) {
    const [existing] = await db.select().from(projects).where(eq(projects.title, p.title)).limit(1);
    const values = {
      title: p.title,
      description: p.description,
      category: p.category,
      githubLink: p.github_link ?? null,
      order: p.order,
      isFeatured: p.is_featured,
    };
    let projectId: number;
    if (existing) {
      await db.update(projects).set(values).where(eq(projects.id, existing.id));
      projectId = existing.id;
    } else {
      const [created] = await db.insert(projects).values(values).returning();
      projectId = created.id;
    }
    await db.delete(projectTechStacks).where(eq(projectTechStacks.projectId, projectId));
    const techIds = p.techs.map((t) => techMap.get(t)).filter((n): n is number => Boolean(n));
    if (techIds.length > 0) {
      await db
        .insert(projectTechStacks)
        .values(techIds.map((techStackId) => ({ projectId, techStackId })));
    }
    console.log(`${existing ? 'Updated' : 'Created'} project: ${p.title}`);
  }
}

async function upsertExperiences(): Promise<void> {
  for (const e of EXPERIENCES) {
    const [existing] = await db.select().from(experiences).where(eq(experiences.title, e.title)).limit(1);
    const values = {
      title: e.title,
      category: e.category,
      icon: e.icon,
      color: e.color,
      items: e.items,
      order: e.order,
    };
    if (existing) {
      await db.update(experiences).set(values).where(eq(experiences.id, existing.id));
    } else {
      await db.insert(experiences).values(values);
    }
  }
  console.log('Created experience entries.');
}

async function upsertSkills(): Promise<void> {
  for (const s of SKILLS) {
    const [existing] = await db.select().from(skills).where(eq(skills.name, s.name)).limit(1);
    const values = { name: s.name, category: s.category, order: s.order };
    if (existing) {
      await db.update(skills).set(values).where(eq(skills.id, existing.id));
    } else {
      await db.insert(skills).values(values);
    }
  }
  console.log('Created skills entries.');
}

async function ensureAdminUser(): Promise<void> {
  const [existing] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, config.adminUsername))
    .limit(1);
  const passwordHash = await hashPassword(config.adminPassword);
  if (existing) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, existing.id));
    console.log(`Admin user '${config.adminUsername}' password synced.`);
  } else {
    await db.insert(adminUsers).values({ username: config.adminUsername, passwordHash });
    console.log(`Admin user '${config.adminUsername}' created.`);
  }
}

async function main() {
  const force = process.argv.includes('--force');
  const [anyProject] = await db.select().from(projects).limit(1);
  if (anyProject && !force) {
    console.log('Data exists. Use --force to reseed.');
    await ensureAdminUser();
    return;
  }

  console.log('Setting up tech stacks…');
  const techMap = await upsertTechStacks();
  console.log('Setting up projects…');
  await upsertProjects(techMap);
  console.log('Setting up experiences…');
  await upsertExperiences();
  console.log('Setting up skills…');
  await upsertSkills();
  await ensureAdminUser();
  console.log('Database seeding completed.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
