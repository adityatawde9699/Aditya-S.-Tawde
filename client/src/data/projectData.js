/** Content informed by the final résumé review (September 2026) and existing project catalog.
 * Development labels are supplied by the owner; diagrams are explanatory, not telemetry.
 */
const github = (repo) => `https://github.com/adityatawde9699/${repo}`;
const projectOrder = ['amadeus-ai', 'fake-review-system', 'indus', 'ledger', 'cognate', 'lunamatch', 'climax', 'neurox'];
export const FEATURED_PROJECTS = [
  {
    id: 'amadeus-ai', seoDescription: 'Amadeus AI: a LangGraph assistant with hybrid BM25/dense retrieval, SQLite checkpoints, local/cloud LLM routing and permission-gated tools. By Aditya S. Tawde.', title: 'Amadeus AI', subtitle: 'Local-first AI assistant with LangGraph and hybrid retrieval', categoryDisplay: 'Generative AI / RAG',
    problem: 'An assistant needs more than a chat window: it needs tools, durable state, and boundaries around what it can execute.',
    system: 'LangGraph coordinates planning and tool execution across FastAPI, Telegram, and CLI transports. It can run local GGUF models or configured provider fallbacks, with SQLite graph checkpoints, persistent memory, and tool-permission checks.',
    built: 'Headless agent runtime, provider routing, plugin tools, permission and approval controls, and persistent episodic and semantic memory.',
    techStack: ['Python', 'FastAPI', 'LangGraph', 'llama.cpp', 'SQLite', 'Turbovec', 'Redis', 'Docker'],
    status: 'Iterating', githubLink: github('Amadeus-AI'), liveLink: null,
    flow: ['Client', 'Transport', 'Agent runtime', 'Plan', 'Tools', 'Memory', 'Observation', 'Reflection', 'Response'],
    notes: ['SQLite graph checkpoints', 'BM25 + dense retrieval with RRF', 'Human approval interrupts', 'Permission-gated tools'],
    caseStudy: {
      challenge: 'A useful agent runtime has to survive beyond a single prompt. It must keep execution state, recover after failures, and make tool access explicit so autonomy does not become unbounded execution.',
      approach: 'Amadeus models a task as a persistent LangGraph execution rather than a disposable chat turn. The graph can plan, call tools, inspect results, reflect, and resume; the policy layer evaluates tool risk and applies graduated permissions that fail closed.',
      implementation: 'A shared service sits behind FastAPI, Telegram, and CLI transports. Model routing can start with local GGUF inference and fall back to configured Groq or Gemini providers. SQLite-backed LangGraph checkpoints preserve execution state. Turbovec with SQLite payload storage supports long-term memory; workspace retrieval combines BM25 and dense ranking through reciprocal rank fusion (RRF). Redis tracks provider usage, and circuit breakers handle provider failures. Tools load as plugins instead of being embedded in the orchestration core.',
      boundaries: 'Local-only mode disables cloud providers. Redis and the vector store are optional. The Docker code sandbox is disabled by default; when the required sandbox is unavailable, the runtime refuses untrusted code execution.',
    },
    detail: 'SQLite checkpointing · hybrid workspace retrieval · configurable local/cloud providers', visual: 'runtime',
  },
  {
    id: 'fake-review-system', seoDescription: 'Fake Review Detection: TF-IDF and LinearSVC NLP pipeline with 94.75% recorded accuracy on 1,142 held-out reviews and a Streamlit interface. By Aditya S. Tawde.', title: 'Fake Review Detection', subtitle: 'NLP review classification with TF-IDF and LinearSVC', categoryDisplay: 'Machine learning / NLP',
    problem: 'Hotel and app reviews need a reproducible baseline for distinguishing fake from genuine text.',
    system: 'An NLTK cleaning and TF-IDF pipeline compares Logistic Regression and LinearSVC using five-fold cross-validation. A stratified held-out set measures classification quality before refitting.',
    built: 'Data preparation, classifier and vectorizer artifacts, held-out evaluation, and a Streamlit interface for review classification.',
    techStack: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF', 'LinearSVC', 'Streamlit'],
    status: 'Evaluated', githubLink: github('fake-review-system'), liveLink: null,
    flow: ['Review data', 'Clean / split', 'TF-IDF', 'Cross-validation', 'Held-out evaluation', 'Streamlit inference'],
    notes: ['94.75% recorded test accuracy', '0.945 recorded macro-F1', '1,142 held-out reviews', 'Five-fold cross-validation'],
    caseStudy: {
      challenge: 'Fake-review detection is a binary NLP classification problem. A useful implementation needs consistent labels, a text-processing pipeline, and evaluation beyond a single demonstration review.',
      approach: 'Data preparation removes empty and duplicate raw text, standardizes Fake/Genuine labels, and applies NLTK cleaning. A stratified 80/20 split precedes a five-fold cross-validation search over TF-IDF settings and Logistic Regression/LinearSVC hyperparameters, scored by macro-F1.',
      implementation: 'The recorded selected model is LinearSVC with unigram/bigram TF-IDF features and a 10,000-feature cap. Saved results report 94.75% accuracy, 0.945 macro-F1, and 0.990 ROC-AUC on 1,142 held-out reviews from 5,710 usable hotel and app reviews. Streamlit loads saved classifier/vectorizer artifacts for inference.',
      boundaries: 'These are recorded repository results, not a new training run. The mixed-domain random split is not a held-out-domain transfer test: reported accuracy is 97.62% for app reviews and 86.71% for hotel reviews. Scores describe the pre-refit evaluation; the application artifact is subsequently refitted on all data. No completed transformer benchmark is claimed.',
    },
    detail: 'Recorded held-out results · mixed hotel/app review dataset · evaluation before all-data refit', visual: 'classification',
  },
  {
    id: 'indus', seoDescription: 'Industrial Equipment Failure Prediction: Random Forest classification on synthetic AI4I data, with 85.29% recorded failure recall. Project by Aditya S. Tawde.', title: 'Industrial Equipment Failure Prediction', subtitle: 'Imbalanced failure classification with Random Forest', categoryDisplay: 'Machine learning / tabular data',
    problem: 'Rare equipment failures make accuracy alone an inadequate measure of a maintenance classifier.',
    system: 'A modular pipeline engineers sensor features, removes leakage columns, handles class imbalance, and selects a decision threshold from out-of-fold training predictions.',
    built: 'Model comparisons, stratified cross-validation, threshold tuning, held-out metrics, SHAP and permutation-importance analysis, and Streamlit/Plotly presentation code.',
    techStack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'SHAP', 'Streamlit', 'Plotly'],
    status: 'Evaluated', githubLink: github('indus'), liveLink: null,
    flow: ['AI4I sensor data', 'Feature engineering', 'Stratified CV', 'Threshold tuning', 'Test evaluation', 'Interpretation'],
    notes: ['85.29% recorded failure recall', '0.894 recorded average precision', '2,000 held-out samples', 'Synthetic AI4I 2020 dataset'],
    caseStudy: {
      challenge: 'The synthetic UCI AI4I 2020 dataset contains 10,000 rows and 339 failures. A classifier can appear accurate while missing failures, so recall, precision, and average precision need to accompany the headline result.',
      approach: 'The pipeline removes identifiers and failure-mode columns from model inputs, creates sensor-derived features, and compares candidate estimators with stratified cross-validation and class-imbalance handling. Randomized search and out-of-fold training predictions determine the model and threshold.',
      implementation: 'The recorded selected model is Random Forest at a threshold of 0.44. On 2,000 test samples, saved results contain 58 true positives, 10 false negatives, 8 false positives, and 1,924 true negatives: 85.29% recall, 87.88% precision, 0.866 F1, and 0.894 average precision. SHAP and permutation importance support model interpretation; Streamlit and Plotly provide presentation views.',
      boundaries: 'These are recorded repository results on synthetic data, not a new training run or verified advance warning on factory time-series data. Cost outputs use assumed costs rather than achieved business savings. Model and threshold selection use training/CV, while candidate test comparisons are also included in the saved outputs.',
    },
    detail: 'Recorded held-out results · synthetic AI4I 2020 dataset · no real-factory deployment claim', visual: 'classification',
  },
  {
    id: 'lunamatch', seoDescription: 'LunaMatch: a lunar-image registration prototype using OpenCV, optional learned feature matchers and RANSAC verification. Project by Aditya S. Tawde.', title: 'LunaMatch', subtitle: 'AI-assisted lunar image correspondence', categoryDisplay: 'Computer vision / geospatial',
    problem: 'Lunar images of the same terrain differ in illumination, viewpoint, scale, and sensor modality.',
    system: 'Classical and optional learned feature matchers propose correspondences across lunar products. RANSAC verifies geometry before registration; optional refinement improves alignment.',
    built: 'PDS4 and raster image ingestion, SIFT / ORB / AKAZE matching, optional learned matchers, registration exports, CLI, API, and React interface.',
    techStack: ['PyTorch', 'OpenCV', 'NumPy', 'Geospatial', 'FastAPI', 'React'],
    status: 'Building', githubLink: github('LunaMatch'), liveLink: 'https://lunamatchsih.vercel.app',
    flow: ['Source image', 'Feature extraction', 'Matching', 'Geometric verification', 'Registration', 'Refinement'],
    notes: ['Chandrayaan-2 OHRC / TMC-2 / IIRS', 'Optional LightGlue / LoFTR', 'Affine / homography RANSAC', 'Research prototype'],
    caseStudy: {
      challenge: 'Images of the same lunar terrain can differ in illumination, viewpoint, scale, resolution, and sensor modality. A matcher may find visually similar points that do not form a geometrically consistent transformation.',
      approach: 'The pipeline normalizes supported products into a shared image representation, proposes correspondences with classical or optional learned matchers, and checks those matches with affine or homography RANSAC. Grid selection and local sub-pixel refinement are available after geometric verification.',
      implementation: 'The prototype ingests PDS4 products, GeoTIFF/TIFF, PNG/JPEG, and NumPy arrays. It includes SIFT, ORB, and AKAZE, optional SuperPoint + LightGlue and LoFTR adapters, a CLI, FastAPI service, React dashboard, and CSV/JSON/TIFF/PNG exports. IIRS cubes can be represented through a PCA spatial plane or processed by band.',
      boundaries: 'The repository is an independent prototype and does not claim ISRO endorsement. Synthetic fixtures check software behavior, not lunar accuracy. Independent ground-truth accuracy and full-strip processing remain unevaluated; learned adapters require their weights and dependencies.',
    },
    detail: 'Independent ground-truth accuracy has not been evaluated; learned matchers require their model weights.', visual: 'lunar',
  },
  {
    id: 'climax', seoDescription: 'ClimaX: environmental observations, spatial risk assessment and incident-response workflows built with FastAPI, Next.js, PostGIS and Redis.', title: 'ClimaX', subtitle: 'Environmental intelligence', categoryDisplay: 'Environmental / geospatial AI',
    problem: 'Environmental observations and citizen reports need a path from detected risk to coordinated response.',
    system: 'A FastAPI domain layer combines configured sensor observations, citizen reports, risk assessments, incidents, and interventions. PostGIS stores spatial data; Redis provides best-effort prediction and hotspot caching.',
    built: 'Environmental data services, incident lifecycle, spatial APIs, authenticated REST and WebSocket interfaces, and reporting views.',
    techStack: ['AI', 'Geospatial', 'FastAPI', 'Next.js', 'PostGIS', 'Redis', 'WebSocket', 'GCP'],
    status: 'Building', githubLink: github('ClimaX'), liveLink: 'https://climaxevs.vercel.app',
    flow: ['Observation', 'Risk', 'Incident', 'Dispatch', 'Mitigation', 'Resolution'],
    notes: ['Configured sensor + citizen inputs', 'Spatial risk assessment', 'Tracked interventions', 'Gemini / Vertex integrations'],
    caseStudy: {
      challenge: 'Environmental observations, citizen reports, risk signals, and response actions need a shared operational path. Storing observations alone does not show whether a risk was investigated or mitigated.',
      approach: 'ClimaX models the response lifecycle explicitly: an assessment can create an incident, and interventions move it through investigation, dispatch, mitigation, and resolution. Spatial records live in PostGIS; Redis is used as a best-effort cache. Provider integrations sit outside the domain services.',
      implementation: 'The Next.js web app communicates with a FastAPI modular monolith over REST and authenticated WebSockets. The API separates transport, domain services, persistence, and integrations. Citizen reports can attach evidence through signed Google Cloud Storage uploads; configured high and critical assessments can create incidents.',
      boundaries: 'The database starts empty. Production observations depend on configured ingestion providers and credentials, so the interface should not be read as evidence of a live sensor network. Redis caching is best effort.',
    },
    detail: 'The database starts empty; live environmental observations depend on configured ingestion providers.', visual: 'map',
  },
  {
    id: 'cognate', seoDescription: 'Cognate: a Tauri, React and Rust desktop planner with deterministic scheduling, SQLite persistence and optional AI assistance. Project by Aditya S. Tawde.', title: 'Cognate', subtitle: 'Local-first intelligent planning', categoryDisplay: 'Local-first software',
    problem: 'Manual schedules become stale when priorities, meetings, deadlines, and available time change.',
    system: 'A deterministic Rust planner assigns and reflows task time blocks. SQLite keeps work local-first; CRDT-based synchronization supports collaboration when enabled, while optional local or hosted AI advises.',
    built: 'React and Tauri planning client, deterministic scheduling, offline persistence, synchronization, and AI advisor integrations.',
    techStack: ['Rust', 'React', 'TypeScript', 'Tauri', 'CRDT', 'SQLite', 'Ollama'],
    status: 'Experimenting', githubLink: github('Cognate'), liveLink: 'https://adityatawde9699.github.io/Cognate/',
    flow: ['Tasks', 'Deterministic planner', 'Time blocks', 'Auto-reflow', 'CRDT sync'],
    notes: ['Offline-first', 'Deterministic scheduling', 'Local SQLite data', 'CRDT synchronization'],
    caseStudy: {
      challenge: 'A schedule needs to adapt when tasks slip or meetings appear, while remaining predictable and usable offline. Putting the planner itself behind an LLM would make the core schedule difficult to reproduce or inspect.',
      approach: 'Cognate keeps scheduling deterministic in Rust. Tasks are placed as time blocks against deadlines, priority, duration, energy, and meetings; disruptions trigger a reflow with a rationale. AI remains an advisor, so planning still works without a model.',
      implementation: 'The React and Tauri client uses local storage for offline work. A CRDT sync spine merges changes across devices and supports shared workspaces, with end-to-end encryption intended to keep synced task content private from the relay. Optional Ollama or configured model providers supply AI assistance.',
      boundaries: 'The planner is the authority for scheduling; model output does not decide placements. Synchronization requires the configured relay and connectivity, while local planning is designed to continue offline.',
    },
    detail: 'AI advises · the deterministic planner decides · Ollama is supported for local models', visual: 'planner',
  },
  {
    id: 'neurox', seoDescription: 'NeuroX: an Android cognitive-support prototype with offline Room storage, FastAPI synchronization and a React caregiver dashboard. By Aditya S. Tawde.', title: 'NeuroX', subtitle: 'Voice-first cognitive support', categoryDisplay: 'Accessible / supportive software',
    problem: 'A supportive daily-activity prototype needs to work with intermittent connectivity and give caregivers appropriate visibility.',
    system: 'The Android app caches data in Room and syncs through FastAPI using role and caregiver-patient authorization. Deterministic personalization adjusts activity difficulty; WorkManager supports background synchronization.',
    built: 'Android patient app, React caregiver dashboard, offline cache, reminders, and access-controlled API backed by PostgreSQL with SQLite fallback.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Room', 'WorkManager', 'FastAPI', 'React', 'PostgreSQL'],
    status: 'Prototype', githubLink: github('NeuroX'), liveLink: 'https://neuroxcare.vercel.app',
    flow: ['Android', 'FastAPI', 'Database', 'Caregiver web'],
    notes: ['Voice interaction', 'Offline Room cache', 'Caregiver visibility', 'Adaptive activities'],
    caseStudy: {
      challenge: 'A cognitive-support tool for older adults must account for regional-language needs, intermittent connectivity, and caregiver coordination. Health-related interfaces also need a clear boundary between supportive features and clinical claims.',
      approach: 'NeuroX pairs an offline-first Android patient app with a caregiver dashboard and a role-checked API. Activity difficulty changes deterministically from recent completion, accuracy, and response-time history rather than presenting an opaque model score.',
      implementation: 'The Jetpack Compose app caches data in Room and uses WorkManager for background sync. The React dashboard presents assigned patient information and activity, alert, location-history, report, and settings views. FastAPI enforces JWT roles and caregiver-patient ownership; SQLAlchemy supports PostgreSQL with SQLite for local development.',
      boundaries: 'NeuroX is a prototype for supportive engagement, reminders, visibility, and safety. It does not diagnose, predict, or treat dementia or another medical condition.',
    },
    detail: 'Supportive engagement prototype · no diagnostic or treatment claims', visual: 'support',
  },
  {
    id: 'ledger', seoDescription: 'Ledger: a FastAPI and React finance application with Gemini receipt extraction, rules and LLM categorization, provider fallback and streamed chat.', title: 'Ledger', subtitle: 'AI personal finance application with receipt extraction', categoryDisplay: 'AI / data-driven software',
    problem: 'Transactions, receipts, budgets, and investments are fragmented across sources and difficult to interpret together.',
    system: 'FastAPI combines CSV and PDF imports, receipt OCR, rule-and-LLM categorization, portfolio records, and advisor responses. Core finance tools remain usable without an AI provider.',
    built: 'React PWA, finance APIs, receipt ingestion, multi-provider AI routing, budget and portfolio features, GST tools, and audit records.',
    techStack: ['React', 'Vite', 'Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'LLMs', 'OCR', 'PWA'],
    status: 'Iterating', githubLink: github('Leger'), liveLink: 'https://ledger-beta-two.vercel.app/',
    flow: ['Transactions', 'Receipt OCR', 'AI categorization', 'Investments', 'Insights'],
    notes: ['CSV / PDF import', 'Gemini receipt OCR', 'Rules + LLM categorization', 'GST export + audit log'],
    caseStudy: {
      challenge: 'Personal finance data is spread across transactions, accounts, receipts, budgets, and investments. AI features can help interpret that data, but core record-keeping should not disappear when a provider is unavailable.',
      approach: 'Ledger combines deterministic finance workflows with optional AI services. Categorization checks user overrides, keyword rules, and a normalized exact-match LRU cache before falling back to an LLM. Gemini image input extracts receipt details; provider fallback and streamed chat augment those workflows. The UI makes provider use explicit rather than treating generated advice as authoritative.',
      implementation: 'The React PWA calls a FastAPI and SQLAlchemy backend over REST and server-sent events. The backend covers accounts, transactions, CSV/PDF imports, receipt OCR, budgets and goals, investment records, credit-health views, and an AI provider router. A separate GST engine supports exports including Tally XML; append-only audit records and webhooks support traceability and integrations.',
      boundaries: 'AI-powered extraction and insights depend on configured providers and can involve cloud processing. Deterministic finance features remain available without AI; generated insights should be treated as assistance, not financial advice.',
    },
    detail: 'Core finance logic remains independent of AI providers', visual: 'finance',
  },
].sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id));
export const ARCHIVE_PROJECTS = [
  { id: 'coffee-n-me', title: "Coffee’n me", purpose: 'Editorial publishing with OAuth, a rich-text writer, searchable paginated archive, and role-based admin tools.', techStack: ['Next.js 15', 'TypeScript', 'Auth.js', 'Prisma', 'Neon Postgres', 'TipTap', 'Cloudinary'], githubLink: github('Coffee-n-me'), liveLink: 'https://coffee-n-me.vercel.app' },
  { id: 'arth-neeti-game', title: 'Arth-Neeti', purpose: 'A turn-based first-year-of-work simulation teaching financial literacy through income, expenses, investment choices, and contextual AI advice.', techStack: ['React', 'Vite', 'Django REST', 'Firebase Auth', 'Gemini', 'SQLite'], githubLink: github('arth-neeti-game') },
  { id: 'amadeus-chat', title: 'Amadeus-chat', purpose: 'Deterministic-first, one-shot CLI for tasks, BM25L knowledge-note search, Git help, web research, and system maintenance; local GGUF is optional.', techStack: ['Python 3.12', 'Rich', 'BM25L', 'Requests', 'llama.cpp (optional)'], githubLink: github('Amadeus-chat') },
  { id: 'system-32-inter-view-ai', title: 'InterView AI', purpose: 'Resume- and job-description-based interview practice with Gemini answer feedback, local transcription and speech playback; browser microphone capture is not implemented.', techStack: ['Python', 'FastAPI', 'Gemini', 'faster-whisper', 'pyttsx3', 'pypdf', 'JavaScript'], githubLink: github('System-32-Inter-View-AI') },
  { id: 'librarypro', title: 'LibraryPro', purpose: 'Java desktop library operations for catalog, members, issue and return workflows, overdue fines, audit history, and deduplicated CSV/XLSX imports.', techStack: ['Java 11+', 'Swing', 'SQLite', 'FlatLaf', 'CSV / XLSX'], githubLink: github('LibraryPro') },
  { id: 'datascraperviz', title: 'DataScraperViz', purpose: 'Market and job data collection with interactive analysis.', techStack: ['Python', 'Pandas', 'Plotly'], githubLink: null, sourceNote: 'Source unavailable' },
  { id: 'nexusarena', title: 'NexusArena', purpose: 'Frontend gaming and tournament prototype with DOM interactions, animation, and countdown logic.', techStack: ['HTML', 'JavaScript'], githubLink: github('NexusArena') },
  { id: 'crystalreadymades.com', title: 'CrystalReadymades', purpose: 'Fashion and décor catalog with account endpoints and a Django REST backend.', techStack: ['React', 'TypeScript', 'Django REST'], githubLink: github('crystalreadymades.com') },
  { id: 'queuebite', title: 'QueueBite', purpose: 'Canteen-ordering prototype with order models and registration/profile endpoints.', techStack: ['Django REST'], githubLink: github('QueueBite') },
];
export const SKILLS_DATA = [
  { title: 'AI / ML', badges: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF', 'LinearSVC', 'Random Forest', 'Cross-validation', 'Threshold tuning', 'SHAP', 'OpenCV', 'PyTorch'] },
  { title: 'LLM / GenAI', badges: ['LangGraph', 'RAG', 'BM25', 'Dense retrieval', 'Reciprocal rank fusion', 'llama.cpp', 'GGUF', 'Gemini', 'Groq'] },
  { title: 'Backend', badges: ['FastAPI', 'SQLAlchemy', 'REST APIs', 'Server-sent events', 'Django', 'Flask'] },
  { title: 'Data', badges: ['SQL', 'NumPy', 'Pandas', 'PostgreSQL', 'SQLite', 'Redis'] },
  { title: 'Frontend / Desktop', badges: ['React', 'TypeScript', 'JavaScript', 'Tauri', 'Rust', 'Streamlit', 'Vite', 'HTML', 'CSS'] },
  { title: 'Infrastructure', badges: ['Docker', 'Linux', 'Git', 'GitHub'] },
];
export const PROFESSIONAL_CERTIFICATION = {
  name: 'IBM Generative AI Engineering Professional Certificate',
  issuer: 'IBM / Coursera', date: 'July 2026', courses: 16,
};
export const CERTIFICATIONS = [
  ['Introduction to Artificial Intelligence (AI)', 'IBM'],
  ['Generative AI: Introduction and Applications', 'IBM'],
  ['Generative AI: Prompt Engineering Basics', 'IBM'],
  ['Python for Data Science, AI & Development', 'IBM'],
  ['Developing AI Applications with Python and Flask', 'IBM'],
  ['Building Generative AI-Powered Applications with Python', 'IBM'],
  ['Data Analysis with Python', 'IBM'],
  ['Machine Learning with Python', 'IBM'],
  ['Introduction to Deep Learning & Neural Networks with Keras', 'IBM'],
  ['Generative AI and LLMs: Architecture and Data Preparation', 'IBM'],
  ['Gen AI Foundational Models for NLP & Language Understanding', 'IBM'],
  ['Generative AI Language Modeling with Transformers', 'IBM'],
  ['Generative AI Engineering and Fine-Tuning Transformers', 'IBM'],
  ['Generative AI Advanced Fine-Tuning for LLMs', 'IBM'],
  ['Fundamentals of AI Agents Using RAG and LangChain', 'IBM'],
  ['Project: Generative AI Applications with RAG and LangChain', 'IBM'],
  ['Machine Learning Foundations: A Case Study Approach', 'University of Washington'],
  ['Programming with JavaScript', 'Meta'],
].map(([name, issuer]) => ({ name, issuer }));
export const ACTIVITIES = [
  { name: 'Printhub / Udyam Startup Pitching', date: '02 / 2026', detail: 'Presented Printhub at E-Summit, JNEC / MGM University; competition participation.' },
  { name: 'Concept2Code & Tech-Escape Room', date: '02 / 2026', detail: 'Participated at Swayambhu Technical Fest, JNEC.' },
  { name: 'Dreamflow Buildathon 2025', date: '2025', detail: 'Built and shipped a functional application; participation certificate.' },
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
