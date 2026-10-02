/** Verified against the supplied résumé and project checkouts, October 2026.
 * Development labels are supplied by the owner; diagrams are explanatory, not telemetry.
 */
const github = (repo) => `https://github.com/adityatawde9699/${repo}`;
export const FEATURED_PROJECTS = [
  {
    id: 'amadeus-ai', title: 'Amadeus AI', subtitle: 'Local-first autonomous AI runtime', categoryDisplay: 'Autonomous AI',
    problem: 'An assistant needs more than a chat window: it needs tools, durable state, and boundaries around what it can execute.',
    system: 'A layered Python runtime routes requests to local or cloud models, executes plans through a permission engine, and retains observations and reflections in persistent memory.',
    built: 'Agent runtime, provider routing, hybrid retrieval, tool plugins, and approval gates.',
    techStack: ['Python', 'FastAPI', 'LlamaCpp', 'LLMs', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'Iterating', githubLink: github('Amadeus-AI'), liveLink: null,
    flow: ['Client', 'Transport', 'Agent runtime', 'Plan', 'Tools', 'Memory', 'Observation', 'Reflection', 'Response'],
    notes: ['Local-first inference', 'BM25 + dense retrieval', 'Persistent execution state', 'Permission-gated tools'],
    detail: 'Local vector memory · optional Qdrant adapter', visual: 'runtime',
  },
  {
    id: 'lunamatch', title: 'LunaMatch', subtitle: 'AI-assisted lunar image correspondence', categoryDisplay: 'Computer vision / geospatial',
    problem: 'Lunar images of the same terrain differ in illumination, viewpoint, scale, and sensor modality.',
    system: 'Classical and optional learned features propose correspondences. RANSAC verifies geometry; registration and optional sub-pixel refinement align the images.',
    built: 'Image ingestion, matching pipeline, registration exports, CLI, API, and research interface.',
    techStack: ['PyTorch', 'OpenCV', 'NumPy', 'Geospatial', 'FastAPI', 'React'],
    status: 'Building', githubLink: github('LunaMatch'), liveLink: 'https://lunamatchsih.vercel.app',
    flow: ['Source image', 'Feature extraction', 'Matching', 'Geometric verification', 'Registration', 'Refinement'],
    notes: ['OHRC / TMC-2 / IIRS', 'Classical + learned matchers', 'Geometry verifies', 'Research prototype'],
    detail: 'Independent ground-truth accuracy remains unevaluated.', visual: 'lunar',
  },
  {
    id: 'climax', title: 'ClimaX', subtitle: 'Environmental intelligence', categoryDisplay: 'Environmental / geospatial AI',
    problem: 'Environmental observations and citizen reports need a path from detected risk to coordinated response.',
    system: 'A FastAPI domain layer combines observations, risk assessments, incidents, and interventions. PostGIS stores spatial data; Redis caches forecasts and hotspots.',
    built: 'Environmental data services, incident lifecycle, spatial APIs, and role-based reporting interfaces.',
    techStack: ['AI', 'Geospatial', 'FastAPI', 'Next.js', 'PostGIS', 'Redis'],
    status: 'Building', githubLink: github('ClimaX'), liveLink: 'https://climaxevs.vercel.app',
    flow: ['Observation', 'Risk', 'Incident', 'Dispatch', 'Mitigation', 'Resolution'],
    notes: ['Sensor + citizen observations', 'Spatial risk assessment', 'Tracked interventions', 'REST + WebSocket'],
    detail: 'Schematic geography · no live environmental data shown', visual: 'map',
  },
  {
    id: 'cognate', title: 'Cognate', subtitle: 'Local-first intelligent planning', categoryDisplay: 'Local-first software',
    problem: 'Manual schedules become stale when priorities, meetings, and available time change.',
    system: 'A deterministic Rust planner assigns tasks to time blocks and reflows schedules. Local storage and an encrypted CRDT operation log support offline work and optional synchronization.',
    built: 'Desktop planning, time-block reflow, local persistence, CRDT sync, and optional AI advisors.',
    techStack: ['Rust', 'React', 'TypeScript', 'Tauri', 'CRDT', 'SQLite', 'Ollama'],
    status: 'Experimenting', githubLink: github('Cognate'), liveLink: 'https://adityatawde9699.github.io/Cognate/',
    flow: ['Tasks', 'Deterministic planner', 'Time blocks', 'Auto-reflow', 'CRDT sync'],
    notes: ['Offline-first', 'Deterministic scheduling', 'Local data', 'Encrypted synchronization'],
    detail: 'AI advises · the deterministic planner decides', visual: 'planner',
  },
  {
    id: 'neurox', title: 'NeuroX', subtitle: 'Voice-first cognitive support', categoryDisplay: 'Accessible / supportive software',
    problem: 'Supportive daily activities need to remain accessible across language barriers and intermittent connectivity.',
    system: 'An Android app caches activity data offline and syncs through FastAPI. A caregiver web interface shares authorized records; deterministic personalization adjusts activity difficulty.',
    built: 'Patient app, caregiver dashboard, synchronization, reminders, and access-controlled APIs.',
    techStack: ['Kotlin', 'Jetpack Compose', 'FastAPI', 'React', 'PostgreSQL'],
    status: 'Prototype', githubLink: github('NeuroX'), liveLink: 'https://neuroxcare.vercel.app',
    flow: ['Android', 'FastAPI', 'Database', 'Caregiver web'],
    notes: ['Voice interaction', 'Offline Room cache', 'Caregiver visibility', 'Adaptive activities'],
    detail: 'Supportive engagement prototype · no diagnostic or treatment claims', visual: 'support',
  },
  {
    id: 'ledger', title: 'Ledger', subtitle: 'AI-native personal finance platform', categoryDisplay: 'AI / data-driven software',
    problem: 'Transactions, receipts, and investments are fragmented across sources and difficult to interpret together.',
    system: 'FastAPI combines transaction imports, receipt extraction, rule-and-LLM categorization, portfolio records, and streamed advisor responses. Deterministic features work without AI.',
    built: 'Finance APIs, receipt ingestion, multi-provider AI routing, investment views, and an installable PWA.',
    techStack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'LLMs', 'OCR', 'PWA'],
    status: 'Iterating', githubLink: github('Leger'), liveLink: 'https://ledger-beta-two.vercel.app/',
    flow: ['Transactions', 'Receipt OCR', 'AI categorization', 'Investments', 'Insights'],
    notes: ['CSV / PDF import', 'Gemini receipt extraction', 'Rules + LLM fallback', 'REST + streamed chat'],
    detail: 'Core finance logic remains independent of AI providers', visual: 'finance',
  },
];
export const ARCHIVE_PROJECTS = [
  { id: 'coffee-n-me', title: "Coffee’n me", purpose: 'Editorial blogging platform with rich-text writing and a searchable story archive.', techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'], githubLink: github('Coffee-n-me') },
  { id: 'arth-neeti-game', title: 'Arth-Neeti', purpose: 'Financial literacy through a turn-based simulation and contextual AI advisors.', techStack: ['Django', 'React', 'Gemini'], githubLink: github('arth-neeti-game') },
  { id: 'amadeus-chat', title: 'Amadeus-chat', purpose: 'Local LLM CLI with hybrid retrieval and constrained tool execution.', techStack: ['Python', 'LlamaCpp', 'BM25', 'RRF'], githubLink: github('Amadeus-chat') },
  { id: 'system-32-inter-view-ai', title: 'InterView AI', purpose: 'Interview practice with local transcription and context-aware questions.', techStack: ['Python', 'FastAPI', 'Whisper', 'Gemini'], githubLink: github('System-32-Inter-View-AI') },
  { id: 'fake-review-system', title: 'Fake Review Detector', purpose: 'Review-text sentiment classification in a Streamlit interface.', techStack: ['Python', 'Streamlit', 'Scikit-learn'], githubLink: github('fake-review-system') },
  { id: 'indus', title: 'Industrial Equipment Failure Prediction', purpose: 'Industrial equipment prediction project.', techStack: ['HTML'], githubLink: github('indus') },
  { id: 'librarypro', title: 'LibraryPro', purpose: 'Desktop library management with role-based access and bulk catalog imports.', techStack: ['Java', 'Swing', 'SQLite'], githubLink: github('LibraryPro') },
  { id: 'datascraperviz', title: 'DataScraperViz', purpose: 'Market and job data collection with interactive analysis.', techStack: ['Python', 'Pandas', 'Plotly'], githubLink: null, sourceNote: 'Source unavailable' },
  { id: 'nexusarena', title: 'NexusArena', purpose: 'Competitive gaming and tournament platform.', techStack: ['HTML', 'JavaScript'], githubLink: github('NexusArena') },
  { id: 'crystalreadymades.com', title: 'CrystalReadymades', purpose: 'Commerce platform for fashion and décor.', techStack: ['React', 'FastAPI', 'PostgreSQL'], githubLink: github('crystalreadymades.com') },
  { id: 'queuebite', title: 'QueueBite', purpose: 'Canteen ordering with digital tokens and live order tracking.', techStack: ['JavaScript', 'Node.js'], githubLink: github('QueueBite') },
];
export const SKILLS_DATA = [
  { title: 'AI / ML', badges: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Transformers', 'OpenCV'] },
  { title: 'LLM / GenAI', badges: ['LlamaCpp', 'Ollama', 'GGUF', 'RAG', 'BM25', 'Dense retrieval', 'RRF', 'Whisper'] },
  { title: 'Backend', badges: ['FastAPI', 'Django', 'Flask', 'SQLAlchemy'] },
  { title: 'Data', badges: ['NumPy', 'Pandas', 'PostgreSQL', 'SQLite', 'Redis', 'Qdrant'] },
  { title: 'Frontend', badges: ['React', 'TypeScript', 'JavaScript', 'Vite', 'HTML', 'CSS'] },
  { title: 'Infrastructure', badges: ['Docker', 'Linux', 'Git', 'GitHub', 'CI/CD'] },
];
export const CERTIFICATIONS = [
  ['Gen AI Foundational Models for NLP', 'IBM'],
  ['Generative AI and LLMs: Architecture', 'IBM'],
  ['Deep Learning & Neural Networks with Keras', 'IBM'],
  ['Machine Learning with Python', 'IBM'],
  ['Building GenAI-Powered Apps with Python', 'IBM'],
  ['Developing AI Apps with Python & Flask', 'IBM'],
  ['ML Foundations: Case Study Approach', 'University of Washington'],
  ['Programming with JavaScript', 'Meta'],
].map(([name, issuer]) => ({ name, issuer }));
export const ACTIVITIES = [
  { name: 'Printhub / Udyam Startup Pitching', date: '02 / 2026', detail: 'Pitched at E-Summit, JNEC / MGM University.' },
  { name: 'Concept2Code & Tech-Escape Room', date: '02 / 2026', detail: 'Participated at Swayambhu Technical Fest, JNEC.' },
  { name: 'Dreamflow Buildathon', date: '2025', detail: 'Shipped a functional application. Certificate: 2026H2S02DFLOW-P00078.' },
];
export const CURRENT_WORK = [
  ['LunaMatch', 'Computer vision', 'Building', 'lunamatch'],
  ['ClimaX', 'Environmental intelligence', 'Building', 'climax'],
  ['Cognate', 'Local-first systems', 'Experimenting', 'cognate'],
  ['Amadeus AI', 'Autonomous AI', 'Iterating', 'amadeus-ai'],
  ['PyTorch / Transformers', 'Deep learning', 'Learning', null],
];

export function repositoryKey(url) {
  try { const parsed = new URL(url); return parsed.hostname === 'github.com' ? parsed.pathname.replace(/\.git$/, '').replace(/\/$/, '').toLowerCase() : null; }
  catch { return null; }
}
/** Curated architecture stays stable; CMS manages publication, links, and additional records.
 * Visibility is additive to the legacy API and includes only known public catalog IDs.
 */
export function mergeProjects(catalog, apiProjects = [], visibility = {}) {
  const records = new Map(apiProjects.map(p => [repositoryKey(p.github_link), p]).filter(([key]) => key));
  return catalog.filter(p => visibility[p.id] !== false).map(p => {
    const record = records.get(repositoryKey(p.githubLink));
    if (!record) return p;
    return { ...p, liveLink: record.live_link || p.liveLink, cmsDescription: record.description, cmsTitle: record.title };
  });
}
export function additionalProjects(apiProjects = [], visibility = {}) {
  const known = new Set([...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS].map(p => repositoryKey(p.githubLink)));
  return apiProjects.filter(p => p.github_link && !known.has(repositoryKey(p.github_link)) && p.status !== 'DRAFT')
    .map(p => ({ id: `cms-${p.id}`, title: p.title, purpose: p.description, techStack: p.tech_stack?.map(t => t.name) || [], githubLink: p.github_link, liveLink: p.live_link }))
    .filter(p => visibility[p.id] !== false);
}
