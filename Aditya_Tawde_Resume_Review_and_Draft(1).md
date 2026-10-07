# Aditya Tawde — Final ATS resume and evidence review

Completed September 19, 2026. This revision supersedes the provisional review.

**Scope:** All 18 supplied repositories were cloned successfully. The review compared available READMEs, source structure, representative implementation files, relevant tests/configuration, saved ML evaluation artifacts, and the latest commit in each downloaded snapshot. The six shortlisted projects received deeper inspection. This was a source audit, not an exhaustive line-by-line review or a production/security certification. The existing resume and all 11 certificate pages had already been inspected. LinkedIn's full contents remained inaccessible; no additional facts were inferred from its search snippet.

**Verification distinction:** “Implemented” below means supported by inspected code. ML results are recorded repository results, not newly reproduced training runs. Their headline arithmetic was independently checked against the saved confusion matrices. Deployment files and test definitions establish implementation intent, not successful deployment or passing CI.

## 1. Profile analysis

Your strongest positioning is **AI/ML engineering intern with full-stack application experience**. There is now concrete evidence for two complementary strengths: integrating LLMs into software systems and building supervised ML pipelines with evaluation artifacts. You should not present yourself only as someone who connects AI APIs.

Amadeus AI demonstrates orchestration, retrieval, state persistence, and provider handling. Fake Review Detection demonstrates a real NLP training/evaluation workflow. Industrial Equipment Failure Prediction supplies the tabular modeling, imbalance handling, threshold selection, and interpretability evidence missing from the old resume. Ledger shows how you connect AI services to an application with a database and web interface.

Cognate and NeuroX add substantial software-system breadth, but their scheduling/personalization logic should be described accurately as deterministic or rule-based. Neither should be used to imply a trained planning or clinical prediction model.

Your completed IBM Generative AI Engineering Professional Certificate is a useful supporting credential. Your projects should still occupy more space than course names. No employment or research publication has been established by the provided sources.

## 2. Project analysis and selection

The comparison below precedes the resume. Each source link is pinned to the exact commit inspected. Descriptions of complexity are comparative judgments based on those implementations, not numerical scores.

| Project | Technical depth | AI/ML relevance | Engineering complexity | Resume value | Evidence |
|---|---|---|---|---|---|
| Amadeus-AI | LangGraph execution graph, checkpointing, model routing, hybrid retrieval | Agent orchestration and RAG | Persistent state, provider fallback, tool permissions | Primary: lead AI engineering project | [Source](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/app/services/agent_loop.py) |
| fake-review-system | TF-IDF pipelines, classifier search, held-out evaluation | Direct supervised NLP | Training/inference artifacts and Streamlit app | Primary: clearest NLP evaluation evidence | [Source](https://github.com/adityatawde9699/fake-review-system/blob/901a5b7ea33065ca605ffbca403404d1f96f12a0/model_code/train_classical.py) |
| indus | Feature engineering, imbalance handling, CV and threshold selection | Direct tabular ML | Evaluation and interpretability pipeline | Primary: strongest complement for ML/data science | [Source](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/src/modeling.py) |
| Leger | Rule/cache/LLM categorization and receipt extraction | Applied generative AI | FastAPI, SQLAlchemy, React, streamed responses | Primary: full-stack AI product | [Source](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/services/auto_categorizer.py) |
| Cognate | Deterministic Rust scheduler, local persistence, operation-log sync | Optional AI assistance; scheduler is not ML | Tauri/React/TypeScript desktop architecture | Priority alternate: software engineering | [Source](https://github.com/adityatawde9699/Cognate/blob/d04dac5eb1472e34c22800b2dd315576aba6e7cc/src-tauri/src/planner.rs) |
| NeuroX | Patient/caregiver APIs, event sync, bounded personalization | Rule-based activity adaptation, not trained ML | Android/web/backend coordination and authorization | Priority alternate: backend/mobile systems | [Source](https://github.com/adityatawde9699/NeuroX/blob/6a3495840b21087a4bb6059c34361a19ba610c85/backend/app/services/sync.py) |
| System-32-Inter-View-AI | Interview orchestration, speech adapters, local audio calculations | Gemini generation/evaluation; Whisper integration | Separate API, application and adapter layers | Secondary: speech/LLM roles | [Source](https://github.com/adityatawde9699/System-32-Inter-View-AI/blob/22ba9306695eb54237dbdefcbdea3514449b96c1/src/app/coaching.py) |
| ClimaX | Environmental APIs, spatial persistence, risk/incident workflow | Gemini integration and external Vertex prediction adapter | PostGIS, Redis, events and cloud adapters | Secondary: geospatial/backend roles; forecast model not established | [Source](https://github.com/adityatawde9699/ClimaX/blob/a41cd74f12762914d74c7cd2506d9685b39b47b5/apps/api/services/prediction_service.py) |
| Amadeus-chat | Lazy local inference, notes search, Git/research commands | Local GGUF inference and BM25L search | Modular CLI with deterministic fallbacks | Secondary: useful, but old RAG description is stale | [Source](https://github.com/adityatawde9699/Amadeus-chat/blob/ebff64b5ebac300448b867c70247142088bb927f/amadeus/utils/llm.py) |
| arth-neeti-game | Django game logic and cached contextual advice | LLM-assisted financial-literacy scenarios | React client, authentication and simulation state | Secondary: application/hackathon portfolio | [Source](https://github.com/adityatawde9699/arth-neeti-game/blob/0901cb7b6c0727ed55fe7f82576abcd19d703cb6/backend/game_engine/advisor.py) |
| Coffee-n-me | Validated post actions, sanitization and cache invalidation | No AI implementation established in sampled code | Next.js/Auth.js/Prisma publishing workflows | Secondary: web engineering | [Source](https://github.com/adityatawde9699/Coffee-n-me/blob/1aa81e193f71d8d2d3e996b757231adcf153422c/lib/actions/post.ts) |
| home | Booking/payment services and transactional webhook handling | No AI implementation established in sampled code | NestJS/Prisma marketplace backend and clients | Secondary: backend engineering | [Source](https://github.com/adityatawde9699/home/blob/9d4f8b38bc1ef421ea8a3d1fe0d5034e6bf787f9/backend/src/payments/payments.service.ts) |
| LibraryPro | Book/member/circulation persistence and fine calculation | No AI implementation established | Java desktop data-access layer and SQLite | Secondary: foundational software work | [Source](https://github.com/adityatawde9699/LibraryPro/blob/b8d045daf9248bce286c3165fc9a31f54fa6967e/database/TransactionDAO.java) |
| crystalreadymades.com | Catalog/account endpoints; old and newer backends coexist | No AI implementation established | Django REST code plus React/TypeScript; README is stale | Secondary: clarify current architecture and contributions | [Source](https://github.com/adityatawde9699/crystalreadymades.com/blob/46915e5ec753ae5afe7743e1822b500f0fc73772/myproject/store/views.py) |
| interactive-portfolio-website | Canvas image sequencing and scroll animation | No AI implementation established | React/TypeScript and GSAP rendering | Keep as portfolio link; lower value as an AI project bullet | [Source](https://github.com/adityatawde9699/interactive-portfolio-website/blob/8dbba9c431e15b9a5b1541b666a9d907b8dd0ead/portfolio-v2/src/components/canvas/ImageSequence.tsx) |
| QueueBite | Order models and basic registration/profile endpoints | No AI implementation established | Reviewed backend is narrower than README claims | De-emphasize until full queue workflow is evidenced | [Source](https://github.com/adityatawde9699/QueueBite/blob/aea316fd314611038275e16a04728cd544409c38/backend/orders/views.py) |
| admission-system | Form/payment-link flow and Telegram webhook notification | No AI implementation established | Small Flask integration; signature check is a TODO | De-emphasize; do not claim secure payment verification | [Source](https://github.com/adityatawde9699/admission-system/blob/4fa7ae39bee469d6d6b45ec02de2dd6a41bd04cd/app.py) |
| NexusArena | DOM interactions, animation and countdown logic | No AI implementation established | Frontend prototype | De-emphasize for AI/ML applications | [Source](https://github.com/adityatawde9699/NexusArena/blob/e6bb7b11cfa969b360d504b422869913ce57df5a/script.js) |

### Primary shortlist and role selection

The six-project shortlist is **Amadeus AI, Fake Review Detection, Industrial Equipment Failure Prediction, Ledger, Cognate, and NeuroX**. Use the first four in the general AI/ML resume below. Cognate and NeuroX are alternatives, not additional entries to squeeze onto one page.

| Application focus | Suggested four-project lineup |
|---|---|
| AI/ML engineering | Amadeus AI, Fake Review Detection, Industrial Equipment Failure Prediction, Ledger |
| Generative AI / LLM engineering | Amadeus AI, Ledger, Fake Review Detection, Cognate |
| Software engineering with AI | Amadeus AI, Ledger, Cognate, NeuroX |
| Data science / ML | Industrial Equipment Failure Prediction, Fake Review Detection, Ledger, Amadeus AI |

Research-oriented applications should emphasize evaluation methodology and limitations. These repositories do not establish publications, novel research findings, or real-world experimental validation.

### Amadeus AI

**Problem and implementation:** A personal assistant that coordinates tools and retrieves workspace information. Its LangGraph state graph includes planning, tool execution, reflection, and synthesis; the application initializes SQLite-backed graph checkpoints. Model adapters and the routing implementation establish llama.cpp, Groq, and Gemini handling, Redis usage counters, and circuit breakers. The workspace indexer implements lexical BM25 and dense ranking with reciprocal rank fusion.

**Architecture and engineering value:** FastAPI/CLI/Telegram transport boundaries, application services, persistence, and infrastructure adapters are more substantial evidence than calling it an “AI operating system.” Tool policy checks and approval interrupts are concrete mechanisms; they do not establish universal safety or prompt-injection immunity.

**Current-state correction:** The active memory service is Turbovec with SQLite payload storage. Workspace search uses its own embedding matrix and BM25 index. Qdrant references remain elsewhere, but the old resume's Qdrant-based description should not stand in for the currently wired implementation. Do not turn comments listing Ollama/OpenAI into active provider claims: the reviewed router constructor registers llama.cpp, Groq, and Gemini.

**Deployment, tests, metrics:** Container/service configuration and a GitHub Actions workflow exist. The workflow defines linting, type checking, tests with PostgreSQL/Redis, and a coverage threshold. No actual coverage percentage, passing run, live deployment, response-time improvement, or hardware benchmark was verified.

**Evidence:** [src/app/services/agent_loop.py](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/app/services/agent_loop.py); [src/app/services/amadeus_service.py](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/app/services/amadeus_service.py); [src/infra/llm/router.py](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/infra/llm/router.py); [src/infra/workspace_indexer.py](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/infra/workspace_indexer.py); [src/infra/tools/policy.py](https://github.com/adityatawde9699/Amadeus-AI/blob/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee/src/infra/tools/policy.py).

### Fake Review Detection

**Problem and implementation:** Classifies hotel/app reviews as Fake or Genuine. Data preparation standardizes labels, drops empty/raw duplicate text, and applies NLTK cleaning. A scikit-learn pipeline searches TF-IDF settings and Logistic Regression/LinearSVC hyperparameters using five-fold CV with macro-F1. A stratified 80/20 split precedes model selection. The selected configuration is LinearSVC with unigrams/bigrams and a 10,000-feature cap.

**Recorded results:** The metrics file reports 5,710 usable reviews, 1,142 test examples, 94.746% accuracy, 0.945397 macro-F1, and 0.989731 ROC-AUC. The confusion matrix totals and derived accuracy/macro-F1 were checked independently. The dataset/domain limits matter: recorded accuracy is 97.62% on app reviews and 86.71% on hotel reviews. This is a mixed-domain random split, not a held-out-domain transfer experiment.

**Engineering value:** The Streamlit interface loads the model/vectorizer artifacts, and smoke tests check the label space. The training script evaluates the train-only estimator before refitting on all data and calibrating LinearSVC for application confidence output. Therefore the saved held-out scores describe the pre-refit evaluation, not a fresh independent evaluation of the final all-data fitted artifact.

**Limitations:** Training was not rerun. Raw-text deduplication does not by itself establish absence of normalized or near-duplicate overlap. A DistilBERT training script exists, but no completed transformer metrics/artifact were found in the inspected model directory; omit claims that transformers outperformed the baseline. A UI screenshot is not deployment evidence.

**Evidence:** [model_code/train_classical.py](https://github.com/adityatawde9699/fake-review-system/blob/901a5b7ea33065ca605ffbca403404d1f96f12a0/model_code/train_classical.py); [model_code/data_prep.py](https://github.com/adityatawde9699/fake-review-system/blob/901a5b7ea33065ca605ffbca403404d1f96f12a0/model_code/data_prep.py); [models/classical_metrics.json](https://github.com/adityatawde9699/fake-review-system/blob/901a5b7ea33065ca605ffbca403404d1f96f12a0/models/classical_metrics.json); [app.py](https://github.com/adityatawde9699/fake-review-system/blob/901a5b7ea33065ca605ffbca403404d1f96f12a0/app.py).

### Industrial Equipment Failure Prediction (`indus`)

**Problem and implementation:** Failure classification on the synthetic UCI AI4I 2020 dataset. The recorded data audit contains 10,000 rows with 339 failures. The code removes identifiers and failure-mode columns from model inputs and creates sensor-derived features such as temperature difference, mechanical power, and torque–wear interaction. Candidate estimators include Logistic Regression, Decision Tree, Random Forest, and XGBoost, with optional LightGBM/SMOTE paths.

**Model selection and evidence:** Stratified CV, class weighting, randomized hyperparameter search, and threshold selection from out-of-fold training predictions are implemented. The recorded selected model is Random Forest, with an operating threshold of 0.44. On 2,000 test samples, the saved results contain 58 true positives, 10 false negatives, 8 false positives, and 1,924 true negatives: 85.29% recall, 87.88% precision, 0.8657 F1, 0.8938 average precision (stored as `pr_auc`), and 0.9732 ROC-AUC. Accuracy is 99.1%, but failure recall and average precision are more informative for this imbalanced task. Confusion-count arithmetic was checked.

**Engineering value:** A modular training pipeline, saved evaluation, Streamlit/Plotly presentation code, and SHAP/permutation-importance implementations demonstrate more than a notebook-only model fit. The code also produces candidate comparisons on the test set after selecting the final model; do not claim the test set is literally touched only once. Final model/threshold selection in the inspected orchestration is based on training/CV.

**Limitations:** This is synthetic-data classification, not verified advance warning on a real factory time series. The monetary savings in the output are calculated from assumed costs; they are not business savings achieved. No new training run or live deployment was performed.

**Evidence:** [Industrial-Equipment-Failure-Prediction/main.py](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/main.py); [Industrial-Equipment-Failure-Prediction/src/preprocessing.py](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/src/preprocessing.py); [Industrial-Equipment-Failure-Prediction/src/modeling.py](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/src/modeling.py); [Industrial-Equipment-Failure-Prediction/outputs/metrics/final_model_test_metrics.json](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/outputs/metrics/final_model_test_metrics.json); [Industrial-Equipment-Failure-Prediction/src/explainability.py](https://github.com/adityatawde9699/indus/blob/eaf7ba210602b3f5e720fd4fac68e90758c65080/Industrial-Equipment-Failure-Prediction/src/explainability.py).

### Ledger (`Leger` repository)

**Problem and implementation:** Expense tracking with automatic categorization, receipt extraction, and AI chat. The FastAPI application wires SQLAlchemy persistence, categorization endpoints, receipt parsing, and SSE responses; React supplies the interface.

**Engineering decisions:** Categorization checks user overrides, keyword rules, a normalized exact-match LRU cache, and then an LLM. Despite the filename `embedding_cache.py` and some stale caller comments, the current cache performs string matching, not vector similarity. The router implements Groq → Cerebras → Gemini → Cohere → OpenRouter adapters and availability/error fallback. Receipt parsing uses Gemini image input, not PaddleOCR.

**Value and limitations:** This is a strong AI-application project because it combines deterministic handling with provider integrations and streaming. Render/Vercel configuration exists, but current deployment health and cold-start improvements were not verified. The README advertises a CI badge, but no workflow directory was present in this snapshot. Do not claim passing CI, a measured cost reduction, validated credit scoring, financial correctness, or production compliance.

**Evidence:** [backend/app/services/auto_categorizer.py](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/services/auto_categorizer.py); [backend/app/services/embedding_cache.py](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/services/embedding_cache.py); [backend/app/services/ai_router.py](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/services/ai_router.py); [backend/app/services/receipt_ocr.py](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/services/receipt_ocr.py); [backend/app/main.py](https://github.com/adityatawde9699/Leger/blob/dc7830b52381795711eba2a7ae90c1abfcca73cc/backend/app/main.py).

### Cognate — priority software-engineering alternate

**Problem and implementation:** A local desktop planner with React/TypeScript, Tauri, Rust, and SQLite. The scheduler merges occupied intervals, orders tasks by deadline/priority and related attributes, and greedily places them into available time windows, preferring energy-compatible slots. It returns explanations and unscheduled-task reasons. Tauri commands call this Rust planner. Separate AI adapters support local and cloud completion endpoints.

**Engineering value:** The distinction between deterministic scheduling and optional AI enrichment is a good architectural decision to explain in an interview. Operation-log import/export reconciles tasks into SQLite; encryption code uses WebCrypto AES-GCM. These mechanisms can be described without claiming security certification or guaranteed private networking.

**Deployment/metrics:** Desktop/web/release and test configuration exists; no released-binary validation, end-to-end sync test run, or performance measurement was performed.

**Resume-ready alternate bullets:**
- Developed a Tauri/React/TypeScript planner with SQLite persistence and a deterministic Rust scheduler that accounts for deadlines, priorities, durations, energy preferences, and calendar conflicts.
- Implemented operation-log import/export and task reconciliation, with separate local/cloud AI adapters for optional assistance.

**Evidence:** [src-tauri/src/planner.rs](https://github.com/adityatawde9699/Cognate/blob/d04dac5eb1472e34c22800b2dd315576aba6e7cc/src-tauri/src/planner.rs); [src-tauri/src/lib.rs](https://github.com/adityatawde9699/Cognate/blob/d04dac5eb1472e34c22800b2dd315576aba6e7cc/src-tauri/src/lib.rs); [src-tauri/src/ai.rs](https://github.com/adityatawde9699/Cognate/blob/d04dac5eb1472e34c22800b2dd315576aba6e7cc/src-tauri/src/ai.rs); [src/services/syncService.ts](https://github.com/adityatawde9699/Cognate/blob/d04dac5eb1472e34c22800b2dd315576aba6e7cc/src/services/syncService.ts).

### NeuroX — priority backend/mobile alternate

**Problem and implementation:** A supportive patient/caregiver application with FastAPI, a React/TypeScript dashboard, and Kotlin Android components. The event-sync service validates user/patient authorization, handles repeated event IDs, rejects conflicting payloads, and applies activity/reminder/location events. Android includes Room-backed storage and synchronization work.

**AI boundary:** Adaptive difficulty uses a weighted score from accuracy, response time, and completion rate, with bounded adjustments and a recent-history rule. That is heuristic personalization, not a trained neural network, diagnostic model, or clinically validated intervention.

**Engineering value and limits:** Multi-client synchronization, access revocation, migrations, and privacy workflows are strong software evidence. Test files cover duplicate-event handling and unauthorized access. Deployment configuration exists, but production operations, real-device reliability, medical benefit, and test-pass status were not verified.

**Resume-ready alternate bullets:**
- Built a FastAPI patient/caregiver backend with authorization checks and idempotent event synchronization for activity, reminder, and location updates.
- Implemented bounded rule-based activity personalization using recent performance history, with Android offline-storage/sync components and a React dashboard.

**Evidence:** [backend/app/services/sync.py](https://github.com/adityatawde9699/NeuroX/blob/6a3495840b21087a4bb6059c34361a19ba610c85/backend/app/services/sync.py); [backend/app/ai/personalization/adaptive_difficulty.py](https://github.com/adityatawde9699/NeuroX/blob/6a3495840b21087a4bb6059c34361a19ba610c85/backend/app/ai/personalization/adaptive_difficulty.py); [backend/tests/test_sync_events.py](https://github.com/adityatawde9699/NeuroX/blob/6a3495840b21087a4bb6059c34361a19ba610c85/backend/tests/test_sync_events.py).

### Secondary projects: important boundaries

InterView AI has actual Gemini interviewing and local RMS/pace/filler-analysis code; omit “zero latency,” full browser voice readiness, and successful deployment. ClimaX has environmental workflows, a Gemini copilot, and a Vertex endpoint adapter; that adapter does not establish that you trained or evaluated the remote forecast model. Its risk score is explicitly weighted arithmetic. Coffee-n-me and `home` provide useful web/backend evidence but are less relevant than evaluated ML for this resume. LibraryPro demonstrates Java/SQLite fundamentals. The portfolio belongs in the header.

QueueBite's reviewed backend endpoints do not substantiate all the real-time features in its README. The admission system's webhook contains a comment to implement signature verification; its README's secure-verification claim should not be repeated. Crystal Readymades has Django REST implementation alongside an `old_backend` FastAPI tree, so the README's stack is incomplete. NexusArena is a frontend prototype, not evidence of a functioning large competitive platform.

## 3. Resume content strategy

Lead with the four selected projects and keep each to two implementation/result bullets. Use the six-project shortlist to tailor applications, not to lengthen every resume. Retain concrete nouns—LangGraph, TF-IDF, cross-validation, threshold tuning, FastAPI—rather than adjectives such as “advanced” or “production-ready.”

The resume below is a compact, single-column master intended for a one-page template at a readable size. It contains no tables, icons, skill bars, or fabricated work experience. Page count depends on the destination template; if it overflows, shorten optional activities or use two pages rather than squeezing the text. Expected graduation and project dates are not inferred from commit timestamps. The user's previously stated 2028 graduation can be added after confirming it is still current; the supplied current PDF does not include it.

Consolidate the IBM courses under the completed professional certificate. Keep Meta and University of Washington as course certificates, and use “Hackathons and Activities” for participation. Retain only two compact event entries; keep the complete certificate audit below for reference.

### Certificate audit

These details were read from the images, not independently authenticated through the issuers' verification services.

| PDF page | Credential / event | Issuer or organizer shown | Date / year shown | Treatment |
|---|---|---|---|---|
| 1 | IBM Generative AI Engineering — Professional Certificate, 16 courses | IBM, via Coursera | July 17, 2026 | Include as the primary professional credential |
| 2 | Adobe India Hackathon, Round 1 online MCQ assessment and coding | Adobe; Unstop certificate | No visible date | Participation only; omit from compact draft |
| 3 | Udyam Startup Pitching Competition, E-Summit; Printhub | JNEC / MGM University | February 21, 2026 | Include as a pitch activity, not an award |
| 4 | Tech-Escape Room, Swayambhu | JNEC / MGM University | February 27–28, 2026 | Participation; omit from compact draft |
| 5 | Programming with JavaScript | Meta, via Coursera | November 16, 2025 | Include as a course certificate |
| 6 | Machine Learning Foundations: A Case Study Approach | University of Washington, via Coursera | July 6, 2025 | Include as a course certificate |
| 7 | Concept2Code, Swayambhu | JNEC / MGM University | February 27–28, 2026 | Participation; optional for expanded version |
| 8 | Dreamflow Buildathon 2025 | Dreamflow / Hack2skill; FlutterFlow branding | Event title says 2025; no separate issue date | Include; certificate supports building and shipping a functional application |
| 9 | Bharatiya Antariksh Hackathon 2026 | Presented by ISRO; powered by Hack2skill | Event title says 2026 | Participation and idea submission only; no affiliation or employment inferred |
| 10 | Data Detective Challenge, Swayambhu | JNEC / MGM University | February 27–28, 2026 | Relevant optional participation for a data-focused variant |
| 11 | Innovate4FinLit Game Challenge | NCFE branding; powered by Hack2skill | No explicit event date | Participation only; omit from compact draft |

The Dreamflow certificate ID begins with 2026, but that does not establish a completion date. Preserve the printed event name, “Dreamflow Buildathon 2025,” without inventing an issue month or changing its event year.

## 4. Final ATS resume

Copy the content between the dividers into your resume template. Metrics use the recorded repository evaluations; the audit above explains their scope.

---

# ADITYA TAWDE

**AI & Data Science Student | Generative AI and Machine Learning**

+91 9699880183 | adityatawde9699@gmail.com  
[LinkedIn](https://www.linkedin.com/in/aditya-s-tawde) | [GitHub](https://github.com/adityatawde9699) | [Portfolio](https://adityastawde.vercel.app/)

## PROFESSIONAL SUMMARY

B.Tech AI & Data Science student building LLM applications and supervised machine-learning systems. Project experience spans LangGraph orchestration, hybrid retrieval, NLP classification, predictive-maintenance modeling, and FastAPI applications. Completed IBM's Generative AI Engineering Professional Certificate.

## EDUCATION

**B.Tech in Artificial Intelligence & Data Science** | June 2024–Present  
MGM's Jawaharlal Nehru Engineering College (JNEC), Chh. Sambhajinagar, India

## TECHNICAL SKILLS

**Languages:** Python, JavaScript, SQL  
**Machine Learning:** scikit-learn, Pandas, NumPy, NLTK, TF-IDF, SVM, Random Forest, cross-validation, SHAP  
**Generative AI:** LangGraph, RAG, BM25, dense retrieval, reciprocal rank fusion, llama.cpp, Gemini, Groq  
**Applications and Tools:** FastAPI, React, Streamlit, SQLAlchemy, PostgreSQL, SQLite, Redis, Git, Docker

## SELECTED PROJECTS

**Amadeus AI — Local-First AI Assistant** | [GitHub](https://github.com/adityatawde9699/Amadeus-AI)

- Built a LangGraph agent workflow with SQLite checkpointing, tool-permission checks, and human approval interrupts for controlled task execution.
- Implemented BM25/dense retrieval with reciprocal rank fusion and local/cloud LLM routing with Redis-backed usage tracking and provider circuit breakers.

**Fake Review Detection — NLP Classification** | [GitHub](https://github.com/adityatawde9699/fake-review-system)

- Developed an NLTK/TF-IDF pipeline comparing Logistic Regression and LinearSVC through five-fold cross-validation on hotel and app reviews.
- Recorded 94.75% accuracy and 0.945 macro-F1 on a 1,142-review held-out set; integrated the saved classifier and vectorizer into a Streamlit interface.

**Industrial Equipment Failure Prediction — Machine Learning** | [GitHub](https://github.com/adityatawde9699/indus)

- Built a classification pipeline on the synthetic AI4I 2020 dataset with sensor-derived features, leakage-column removal, class-imbalance handling, and out-of-fold threshold tuning.
- Recorded 85.29% failure recall and 0.894 average precision on 2,000 held-out samples using Random Forest; added SHAP and permutation-importance analysis.

**Ledger — AI Personal Finance Application** | [GitHub](https://github.com/adityatawde9699/Leger)

- Developed transaction categorization using user overrides, keyword rules, an exact-match LRU cache, and LLM fallback in a FastAPI/React application.
- Integrated Gemini receipt extraction, multi-provider response fallback, and server-sent events for streamed advisor chat.

## CERTIFICATIONS

- **IBM Generative AI Engineering Professional Certificate** — IBM / Coursera, July 2026
- **Machine Learning Foundations: A Case Study Approach** — University of Washington / Coursera, July 2025
- **Programming with JavaScript** — Meta / Coursera, November 2025

## HACKATHONS AND ACTIVITIES

- **Dreamflow Buildathon 2025:** Built and shipped a functional application; participation certificate.
- **Udyam Startup Pitching Competition, JNEC:** Presented Printhub at E-Summit, February 2026.

---

## 5. Evidence-supported ATS keywords

**Primary resume:** Python, JavaScript, SQL, machine learning, natural language processing, scikit-learn, Pandas, NumPy, NLTK, TF-IDF, Logistic Regression, LinearSVC, support vector machines, Random Forest, class imbalance, cross-validation, hyperparameter tuning, threshold tuning, SHAP, permutation importance, generative AI, large language models, LangGraph, retrieval-augmented generation, BM25, dense retrieval, reciprocal rank fusion, llama.cpp, Gemini, Groq, FastAPI, React, Streamlit, SQLAlchemy, PostgreSQL, SQLite, Redis, REST APIs, server-sent events, Git, Docker.

**Optional for a tailored software version:** TypeScript, Rust, Tauri, Kotlin, Room, event synchronization, idempotency, role-based authorization, Next.js, NestJS, Prisma, Django, Flask, Java. These have repository evidence but should not all become an oversized core skills list.

**Do not promote without further evidence:** production MLOps, Kubernetes, model quantization research, completed transformer fine-tuning results, clinical ML, cloud deployment at scale, audited security, or measured cost/latency improvements. Coursework and training scripts can establish exposure; they do not prove completed benchmark runs or operational experience.

Use the vocabulary of each job description where it matches the actual work. No universal ATS score or interview-success prediction is warranted.

## 6. Issues in the original resume and corrections

| Issue | Correction |
|---|---|
| Two generic introductory paragraphs | Specific summary tying LLM systems to supervised ML and application engineering |
| Strongest project begins on page two | Lead with Amadeus AI, followed by evaluated NLP/ML projects |
| Full IBM professional certificate omitted | Replace the long component-course list with the completed credential |
| Amadeus-chat described using older hybrid RAG/reranker/compression features | Current code instead shows modular deterministic tools, BM25L notes search, lazy GGUF inference and research/Git assistance; moved to secondary |
| Ledger described as PaddleOCR and an older provider chain | Current receipt implementation is Gemini; provider adapters are Groq, Cerebras, Gemini, Cohere and OpenRouter |
| Cache filename suggests embeddings | Inspected implementation is normalized exact-match LRU caching; no vector-cache claim |
| Amadeus memory stack described as Qdrant-based | Current active memory is Turbovec/SQLite; resume emphasizes verified orchestration/retrieval instead |
| Cognate described as an AI scheduling engine | Core planner is deterministic Rust with optional AI adapters |
| Few meaningful model-evaluation results | Add saved Fake Review and `indus` results with dataset/test-set context |
| 70+ tools / 35+ endpoints used as impact | Replace counts with mechanisms; no unsupported performance outcomes |
| Broad security/privacy guarantees | Use scoped implementation claims such as permission checks or approval interrupts |
| “GGUF quantization” may imply developing quantization | Describe local inference using GGUF models |
| Frameworks, libraries, databases and spoken languages mixed | Use a smaller, logically grouped technical skills section |
| Participation placed under achievements | Use “Hackathons and Activities”; no awards or finalist claims |
| Project dates, team contributions and graduation date incomplete | Do not invent them or derive them from latest commits |

A recruiter can now see both **what you implemented** and **what was evaluated**. Your next evidence improvements would be reproducible benchmark commands, clearer contribution notes for team work, and short working demos. Those are portfolio improvements, not accomplishments added to this resume.

## 7. Final verification

**Completed:** fetched all 18 repositories; compared documentation with representative code; inspected the six shortlisted systems more deeply; checked model-training/evaluation logic and saved results; recomputed Fake Review accuracy/macro-F1 and `indus` accuracy/precision/recall from the stored confusion matrices; retained verified certificate details from all 11 pages; checked supplied names/contact links and corrected project stack conflicts.

**Not performed:** full retraining; loading/running every application; complete test suites; Android/desktop builds; paid API calls; current deployment checks; remote CI-run verification; full commit-history/contribution audit; issuer-side certificate authentication; full LinkedIn inspection. The source review verifies the presence of implementation, not runtime correctness of every path. A test file or CI threshold is not a passing result.

**Excluded:** invented employment, awards, GPA, project dates, unverified sole-authorship/team-size claims, hardware guarantees, security guarantees, actual financial savings, clinical effectiveness, transformer performance without result artifacts, and figures taken from sample/mock dialogue. The old InterView AI mock “60% improvement” is not a personal accomplishment.

**No repository-access blocker remains.** This is the completed source-based selection and resume rewrite. The remaining limitations above are deliberately excluded claims, not pending prerequisites to using the resume.

### Reviewed repository snapshots

Latest-commit dates below identify the downloaded snapshots, not project start/end dates. Shallow clones do not establish lifetime commit counts, productivity, or contribution ownership.

| Repository | Inspected commit | Latest commit date |
|---|---|---|
| Amadeus-AI | [a8f8792aaeb8](https://github.com/adityatawde9699/Amadeus-AI/commit/a8f8792aaeb8e73e4c2c78ea45dba57690bd00ee) | 2026-07-01T21:47:27+05:30 |
| Amadeus-chat | [ebff64b5ebac](https://github.com/adityatawde9699/Amadeus-chat/commit/ebff64b5ebac300448b867c70247142088bb927f) | 2026-08-31T11:07:41+05:30 |
| ClimaX | [a41cd74f1276](https://github.com/adityatawde9699/ClimaX/commit/a41cd74f12762914d74c7cd2506d9685b39b47b5) | 2026-09-19T11:02:50+05:30 |
| Coffee-n-me | [1aa81e193f71](https://github.com/adityatawde9699/Coffee-n-me/commit/1aa81e193f71d8d2d3e996b757231adcf153422c) | 2026-07-13T19:13:46+05:30 |
| Cognate | [d04dac5eb147](https://github.com/adityatawde9699/Cognate/commit/d04dac5eb1472e34c22800b2dd315576aba6e7cc) | 2026-08-27T00:36:04+05:30 |
| Leger | [dc7830b52381](https://github.com/adityatawde9699/Leger/commit/dc7830b52381795711eba2a7ae90c1abfcca73cc) | 2026-09-19T02:11:45+05:30 |
| LibraryPro | [b8d045daf924](https://github.com/adityatawde9699/LibraryPro/commit/b8d045daf9248bce286c3165fc9a31f54fa6967e) | 2026-04-15T00:09:37+05:30 |
| NeuroX | [6a3495840b21](https://github.com/adityatawde9699/NeuroX/commit/6a3495840b21087a4bb6059c34361a19ba610c85) | 2026-09-13T15:14:11+05:30 |
| NexusArena | [e6bb7b11cfa9](https://github.com/adityatawde9699/NexusArena/commit/e6bb7b11cfa969b360d504b422869913ce57df5a) | 2025-09-08T14:40:21+05:30 |
| QueueBite | [aea316fd3146](https://github.com/adityatawde9699/QueueBite/commit/aea316fd314611038275e16a04728cd544409c38) | 2026-04-01T06:32:18Z |
| System-32-Inter-View-AI | [22ba9306695e](https://github.com/adityatawde9699/System-32-Inter-View-AI/commit/22ba9306695eb54237dbdefcbdea3514449b96c1) | 2026-01-25T01:46:12+05:30 |
| admission-system | [4fa7ae39bee4](https://github.com/adityatawde9699/admission-system/commit/4fa7ae39bee469d6d6b45ec02de2dd6a41bd04cd) | 2025-05-21T13:58:34+05:30 |
| arth-neeti-game | [0901cb7b6c07](https://github.com/adityatawde9699/arth-neeti-game/commit/0901cb7b6c0727ed55fe7f82576abcd19d703cb6) | 2026-02-26T23:36:19+05:30 |
| crystalreadymades.com | [46915e5ec753](https://github.com/adityatawde9699/crystalreadymades.com/commit/46915e5ec753ae5afe7743e1822b500f0fc73772) | 2026-01-27T17:43:17+05:30 |
| fake-review-system | [901a5b7ea330](https://github.com/adityatawde9699/fake-review-system/commit/901a5b7ea33065ca605ffbca403404d1f96f12a0) | 2026-06-29T00:59:53+05:30 |
| home | [9d4f8b38bc1e](https://github.com/adityatawde9699/home/commit/9d4f8b38bc1ef421ea8a3d1fe0d5034e6bf787f9) | 2026-09-12T12:16:45+05:30 |
| indus | [eaf7ba210602](https://github.com/adityatawde9699/indus/commit/eaf7ba210602b3f5e720fd4fac68e90758c65080) | 2026-07-02T22:37:36+05:30 |
| interactive-portfolio-website | [8dbba9c431e1](https://github.com/adityatawde9699/interactive-portfolio-website/commit/8dbba9c431e15b9a5b1541b666a9d907b8dd0ead) | 2026-01-11T18:57:38+05:30 |
