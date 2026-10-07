# Aditya Tawde — Resume review and ATS draft

Reviewed September 19, 2026.

**Status: attachment-supported draft; full repository verification remains incomplete.** The existing resume was read in full and both pages inspected visually. All 11 certificate pages were inspected visually. Public access exposed InterView AI's README, entry-point implementation, and dependency file; the other 17 supplied repository pages could not be retrieved. GitHub connection was confirmed during the task, but its repository-reading capabilities did not become callable in this running session. LinkedIn exposed a limited search result; its full page was rate-limited. These access failures do not imply that the repositories are private, missing, or technically weak.

The draft below retains restrained project statements supported by your supplied resume, which you authorized as a factual source. Those statements are **self-reported, not independently code-verified**. Consequently, this is not the fully verified final resume you requested. No employment, award, performance improvement, or deployment result has been invented.

## 1. Profile analysis

Your available material supports positioning you as a **B.Tech AI & Data Science student focused on applied generative AI and software development**. The existing project descriptions emphasize retrieval, local inference, LLM integrations, and application architecture. That is a more specific narrative than the current broad introduction about interest in AI.

On the evidence available, your portfolio narrative aligns more directly with AI engineering internships than with research or statistical data science. The supplied resume does not provide controlled model evaluations, dataset descriptions, experimental comparisons, or research outputs. This is an evidence gap, not a conclusion that you lack those abilities.

Your strongest newly identified credential is the completed **IBM Generative AI Engineering Professional Certificate**, dated **July 17, 2026**. The certificate lists 16 courses. Lead with that full credential rather than using eight lines for individual courses and abbreviated titles.

The most useful improvements are a shorter summary, earlier project evidence, a selective skills list, and precise distinctions between implemented features, measured results, and participation.

## 2. Project analysis

This comparison precedes the resume as requested. For the four projects in the existing PDF, all technical descriptions below are attributed to that PDF. Their relative priority is provisional. “Unassessed” means insufficient retrieved evidence; it is not a negative evaluation.

| Project | Technical depth | AI/ML relevance | Engineering complexity | Resume value | Evidence |
|---|---|---|---|---|---|
| Amadeus AI | Resume describes layered architecture, LLM routing, retrieval, and voice components | Direct LLM and RAG relevance | Claimed orchestration across model providers, storage, and tools | Provisional lead project for AI engineering | Existing resume p. 2; repository unavailable |
| Amadeus-chat | Resume describes retrieval fusion, reranking, and context management | Direct local-inference and retrieval relevance | Claimed document ingestion and token-budget handling | Provisional second project for LLM roles; overlaps with Amadeus AI | Existing resume p. 2; repository unavailable |
| Ledger / `Leger` | Resume describes provider fallback, OCR, and transaction features | Applied AI integration | Claimed API, streaming, and application integration | Provisional inclusion to demonstrate a distinct application domain | Existing resume p. 2; supplied repository slug is `Leger` |
| Cognate | Resume describes Tauri, React, TypeScript, and SQLite | AI planning is asserted; model integration unverified | Claimed desktop application and local persistence | Provisional inclusion for software breadth | Existing resume p. 1; repository unavailable |
| System-32 InterView AI | Public README documents interview orchestration and local audio processing | Gemini question generation/evaluation and Whisper transcription are documented | Entry point launches FastAPI and contains orchestration demo calls; some paths remain incomplete | Useful alternate after deeper source review | [README](https://github.com/adityatawde9699/System-32-Inter-View-AI), [main.py](https://github.com/adityatawde9699/System-32-Inter-View-AI/blob/main/main.py) |
| NeuroX | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| fake-review-system | Unassessed | Cannot infer actual methods from its name | Unassessed | Inspect for model-training/evaluation evidence before selecting | Supplied URL only; content unavailable |
| arth-neeti-game | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| Coffee-n-me | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| QueueBite | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| ClimaX | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| interactive-portfolio-website | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| home | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| NexusArena | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| indus | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| LibraryPro | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| crystalreadymades.com | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |
| admission-system | Unassessed | Unassessed | Unassessed | Decision deferred | Supplied URL only; content unavailable |

### Provisional primary selection

**Amadeus AI:** The strongest resume-reported evidence is combining local/cloud model access with retrieval and application orchestration. It addresses personal assistance and document access. Retain routing and retrieval descriptions; omit claims of 70+ sandboxed tools, prompt-injection resistance, guaranteed privacy, and operation on 4 GB RAM until implementation and benchmark evidence are available. No verified latency, accuracy, deployment, or user metric was obtained.

**Amadeus-chat:** The distinctive contribution is document retrieval and context management for a local command-line interface. Its reported BM25/dense fusion, reranking, and memory compression provide better technical substance than repeating “100% local.” Local inference with an already quantized model does not establish that you implemented quantization. Hardware performance and retrieval quality remain unverified.

**Ledger:** This adds application breadth through receipt processing and expense categorization. The old resume identifies provider fallback and streamed chat, but does not identify every underlying framework beside the project. Do not transfer frameworks from the general skills list into its project stack without evidence. Deployment and cold-start claims need configuration plus runtime evidence; endpoint count alone is not an impact measure. Use “Ledger” as the supplied display name and preserve `Leger` in its URL.

**Cognate:** This adds desktop and persistence experience through the reported Tauri/React/TypeScript/SQLite implementation. Local data storage is a concrete statement; “secure,” “fast,” and “without cloud dependency” require separate evidence. The reported planning feature lacks model, algorithm, and evaluation detail, so its wording is deliberately restrained.

These four provide a coherent provisional narrative: AI assistant, retrieval-focused CLI, an applied AI product, and a desktop productivity application. This is not a verified ranking against the inaccessible repositories.

### InterView AI: evidence and limitations

The README distinguishes implemented components from partial features. It documents a FastAPI backend, Gemini-based interviewing, local faster-whisper transcription, and audio feedback. It explicitly marks browser microphone recording as not wired and Docker configuration as requiring updates. The readable entry point corroborates the FastAPI launch and contains calls to session orchestration, coaching, and answer evaluation; it does not prove those imported implementations work. Its mock answer contains a 60% database-performance claim, which is sample dialogue, **not your achievement**. The `--cli` argument is declared, but the visible `main()` calls the server directly. No complete runtime, test-pass, deployment, or zero-latency claim is warranted. Sources: [repository](https://github.com/adityatawde9699/System-32-Inter-View-AI), [entry point](https://github.com/adityatawde9699/System-32-Inter-View-AI/blob/main/main.py).

## 3. Resume content strategy

- Lead with student status and applied AI specialization. Avoid presenting “AI Engineer” as an employment position.
- Put selected projects before certifications. Keep the full IBM credential prominent but compact.
- Use four projects with two concise bullets each in a one-page-oriented draft. If a template cannot fit this comfortably at roughly 10.5–11 pt, use two pages or remove the least relevant project; do not shrink it excessively.
- Keep a small skills list linked to described work. Distinguish coursework exposure from project implementation.
- For a later ML-focused version, inspect NeuroX and Fake Review System before deciding whether either should replace an overlapping assistant project. Look for preprocessing, baseline comparison, train/test methodology, leakage controls, and reproducible evaluation.
- Label events as participation or activities. No supplied event certificate establishes a win or finalist ranking.
- Include only genuine, contextualized metrics. No model accuracy, speedup, user count, or resource benchmark is retained here.

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

## 4. ATS resume content — provisional draft

The following section is ready to copy into a single-column template. Its project statements are supported by your existing resume, but still require the requested source-code verification. The notice is editorial and is not part of the resume.

---

# ADITYA TAWDE

**AI & Data Science Student | Generative AI and Software Development**

+91 9699880183 | adityatawde9699@gmail.com  
[LinkedIn](https://www.linkedin.com/in/aditya-s-tawde) | [GitHub](https://github.com/adityatawde9699) | [Portfolio](https://adityastawde.vercel.app/)

## PROFESSIONAL SUMMARY

B.Tech Artificial Intelligence & Data Science student with project experience in local LLM applications, retrieval-augmented generation, and AI application integration. Built assistant, command-line, and desktop applications; completed IBM's Generative AI Engineering Professional Certificate.

## EDUCATION

**B.Tech in Artificial Intelligence & Data Science** | June 2024–Present  
MGM's Jawaharlal Nehru Engineering College (JNEC), Chh. Sambhajinagar, India

## TECHNICAL SKILLS

**Languages:** Python, JavaScript, TypeScript  
**Generative AI:** LLM integration, retrieval-augmented generation (RAG), BM25, dense retrieval, reciprocal rank fusion, cross-encoder reranking, llama.cpp, GGUF models  
**Application Development:** React, Tauri, REST APIs, server-sent events (SSE)  
**Data Stores:** SQLite, Redis, Qdrant

## SELECTED PROJECTS

**Amadeus AI — Personal AI Assistant** | [GitHub](https://github.com/adityatawde9699/Amadeus-AI)

- Integrated local GGUF inference through llama.cpp with Groq and Gemini model access, using Redis-backed quota tracking to manage provider usage.
- Combined BM25 and Qdrant-based dense retrieval for document access, with Whisper speech recognition and text-to-speech components for voice interaction.

**Amadeus-chat — Local LLM Command-Line Application** | [GitHub](https://github.com/adityatawde9699/Amadeus-chat)

- Built a command-line interface for local GGUF model inference and document retrieval, combining BM25 and dense retrieval through reciprocal rank fusion and cross-encoder reranking.
- Added document deduplication, sliding-window context management, and LLM-based memory compression to manage retrieved content and conversation context.

**Ledger — AI Personal Finance Application** | [GitHub](https://github.com/adityatawde9699/Leger)

- Integrated PaddleOCR receipt processing and AI-assisted transaction categorization into a personal finance application.
- Added multi-provider LLM fallback and SSE-streamed chat for an interactive finance assistant.

**Cognate — Desktop Productivity Application** | [GitHub](https://github.com/adityatawde9699/Cognate)

- Developed a desktop productivity application using Tauri, React, TypeScript, and SQLite for local data storage.
- Added AI-assisted task planning and scheduling features for organizing priorities and deadlines.

## CERTIFICATIONS

- **IBM Generative AI Engineering Professional Certificate** — IBM / Coursera, July 2026
- **Machine Learning Foundations: A Case Study Approach** — University of Washington / Coursera, July 2025
- **Programming with JavaScript** — Meta / Coursera, November 2025

## HACKATHONS AND ACTIVITIES

- **Dreamflow Buildathon 2025:** Built and shipped a functional application; participation certificate.
- **Udyam Startup Pitching Competition, JNEC:** Presented Printhub at E-Summit, February 2026.

---

## 5. ATS keywords

**Supported by project descriptions in the existing resume, pending code verification:** Python, JavaScript, TypeScript, generative AI, large language models, LLM integration, RAG, BM25, dense retrieval, Qdrant, reciprocal rank fusion, cross-encoder reranking, llama.cpp, GGUF, Redis, React, Tauri, SQLite, REST APIs, SSE, OCR, PaddleOCR, Whisper, context management.

**Supported as learning topics by the IBM credential, not independently demonstrated production expertise:** machine learning, deep learning, NLP, transformers, prompt engineering, PyTorch, Keras, fine-tuning, LangChain, AI agents. Keep these in a coursework discussion unless implementation evidence supports adding them to the core skills section.

**Partially supported by publicly readable InterView AI material:** FastAPI, Gemini, faster-whisper, Pydantic, pytest, NumPy. A dependency entry or README mention is not a proficiency assessment, and test tooling does not prove tests pass.

Keywords should follow the specific internship description and the evidence you can explain in an interview. There is no defensible universal ATS score for this resume without a particular job description and parser.

## 6. Issues in the current resume

1. **The summary takes too much space and gives little project evidence.** Replace the two generic paragraphs with the short specialization statement above. The heading should be “Professional Summary,” not “Professional Summaries.”
2. **The strongest AI project starts on page two.** Amadeus AI should appear earlier in the reading order for LLM-oriented applications.
3. **The certifications section is outdated relative to the supplied certificate.** The completed IBM professional credential is stronger and more compact than a list of its individual courses.
4. **Skills mix different categories.** NumPy and Pandas are not web frameworks; SQLAlchemy is not a database; Groq and Gemini are not interchangeable with llama.cpp as a runtime. The repeated “Languages” heading also mixes programming and spoken languages.
5. **Several claims are stronger than the supplied evidence can establish.** “100% on-device privacy,” “secure local data storage,” “safe shell execution,” and “prompt-injection resistance” need scope, implementation review, and testing. Local execution by itself is not a security guarantee.
6. **Some numbers describe configuration or scope rather than impact.** Tool counts, endpoint counts, scoring ranges, and token thresholds do not show model quality or improved user outcomes. Preserve them only when verified and relevant.
7. **Model use and model development are blurred.** Loading GGUF-quantized weights does not establish experience implementing or evaluating quantization.
8. **Deployment claims lack context.** Hosting configuration, current service availability, and measured cold-start improvement are different claims. The present draft omits them.
9. **Project dates and personal contribution boundaries are missing.** No dates, team size, sole-authorship claim, or percentage ownership has been added.
10. **Expected graduation is absent from the current PDF.** Add the confirmed expected date when available; do not infer it solely from enrollment date. No GPA has been invented.
11. **Participation is placed under “Achievements.”** “Hackathons and Activities” is clearer when no award or ranking is documented.
12. **The formatting is already mostly simple, but prioritization is weak.** The issue is not a need for more decoration. Descriptive project links, fewer generic sentences, and better allocation of space will make it easier to review. No ATS parser was run, so parsing success is not guaranteed.

## 7. Final verification and exclusions

**Checked against supplied material:** name, phone, email, institution, degree, enrollment month/year, supplied profile links, existing project wording, all 11 certificate pages, credential titles, visible dates, and participation wording. The certificate images support the stated credentials; issuer-side authenticity checks were not completed.

**Partially inspected online:** InterView AI README, entry-point source, and dependency file. No repository was executed and no tests were run. The LinkedIn search snippet was insufficient for education dates, experience, or achievement verification; no additional facts were taken from it.

**Not verified:** current implementation of the other 17 projects; individual code contributions; model/dataset details for NeuroX and Fake Review System; evaluation metrics; test results and coverage; CI success; deployment health; hardware benchmarks; security controls; expected graduation date from the current supplied documents; GPA; paid employment or internship history; LinkedIn's complete contents.

**Intentionally excluded:** invented employment, awards or finalist claims, unsupported accuracy/speed/resource numbers, the sample 60% improvement in InterView AI's mock dialogue, 70+ tool and 35+ endpoint counts, guaranteed privacy/security, production-readiness claims, current deployment claims, and unverified project technologies inferred from repository names.

**Remaining completion step:** inspect the actual source and tests for the primary projects, compare the remaining repositories, and replace this provisional selection with an evidence-backed final ranking. GitHub is already connected; another installation is not required. Repository archives would also provide the missing implementation evidence if the connected capabilities remain unavailable.
