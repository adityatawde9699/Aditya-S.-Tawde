# Aditya — Profile

## Identity

- **GitHub:** `adityatawde9699`
- **Location:** Ahilyanagar, Maharashtra, India
- **Education:** B.Tech in AI & Data Science, MGM University (currently Semester IV)

---

## Technical Stack

**Languages:** Python, TypeScript, JavaScript, C++, Rust (via Tauri 2)

**Frontend:** React, Next.js, Tailwind CSS, custom CSS design systems

**Backend:** FastAPI, Django

**AI/ML:** llama-cpp-python, `transformers`, `peft` (LoRA), FAISS, PaddleOCR, OpenCV

**Desktop:** Tauri 2 (Rust + React)

**Databases:** PostgreSQL (Neon), FAISS (vector)

**Deployment:** Vercel, Render, UptimeRobot

**Hardware:** Intel i3 10th Gen, 4GB RAM, Linux Mint XFCE — heavily constrained, RAM optimization is a recurring concern

---

## Active Projects

### Amadeus AI (v4.0.0 — in planning/early development)
A production-grade personal AI assistant. Architectural highlights:
- Request-scoped dependency injection
- Unified embedding singleton
- Plugin-based tool packs
- `RamInspector` — automatic quantization selection based on available RAM
- Full JWT auth
- Optional screen vision module
- Multi-LLM fallback routing (local-first)
- Semantic tool routing
- HITL (Human-in-the-Loop) gates
- Voice pipeline
- Integrations: Telegram, WhatsApp, Email

Clean Architecture throughout. Designed to run on constrained hardware.

### DocMind AI
Local-first document intelligence app targeting the same constrained hardware.
- Stack: PaddleOCR, FAISS, llama-cpp-python
- Phase 1 (OCR prototype) ✅
- Phase 2 (PDF processing pipeline) ✅
- Phase 3 (embedding + FAISS indexing) — next up
- Planned Android support via Termux / Chaquopy

### Ledger (Finance Management Website)
- Frontend: React / Next.js on Vercel
- Backend: FastAPI on Render
- Free-tier LLM fallback chain: Groq → Gemini → Cerebras → Mistral
- Migrated away from paid LLM APIs

### Personal Finance Analytics Dashboard
- React + Recharts
- Analyzes personal bank transaction data

### Cognote (Entrepreneurship Course Project)
- Concept: local-first task & time management desktop app
- Stack: Tauri 2 + React + Phi-3-mini via llama.cpp
- Privacy-first design targeting DPDP / GDPR compliance
- Built as a business plan presentation for an entrepreneurship course

### Nano Banana
- Tauri desktop app
- Custom CSS design system

### Pathfinding Visualizer
- Built in React (BFS, DFS, A\*, Greedy)
- Later ported to Python / pygame

---

## Past Work & Experiments

- **GPT-2 Fine-tuning:** Fine-tuned GPT-2 Small using LoRA (r=16) on WikiText-103, Google Colab
- **Django + React Portfolio Site:** Received a production audit (rated ~4.5/10); recommended free stack: Vercel + Render + Neon PostgreSQL + UptimeRobot
- **Amadeus AI gap analysis:** Compared against Open Interpreter and Perplexity Computer. Key gaps identified: no sandboxed code executor with stdout feedback, no screen vision loop, incomplete browser automation. Backend infrastructure rated ~60–65% toward Open Interpreter capability.
- **Amadeus AI GitHub wiki rewrite:** Full rewrite of documentation including README architecture diagrams.
- **OOP C++ coursework:** Multiple formatted DOCX/PPTX academic deliverables.
- **Median filter / OpenCV pipelines:** Prior computer vision work.

---

## Academic

- **University:** MGM University
- **Degree:** B.Tech — AI & Data Science
- **Current Semester:** IV
- Coursework includes: OOP (C++), Entrepreneurship Development, AI/ML subjects

---

## Hardware & Environment

| Component | Details |
|-----------|---------|
| CPU | Intel i3 10th Gen |
| RAM | 4 GB |
| OS | Linux Mint XFCE |
| GPU | None (CPU-only inference) |

**Future upgrade target:** Lenovo LOQ with RTX 4060 (8GB VRAM) — top pick for CUDA/GGUF workloads in the India market.

---

## Interests & Style

- **Anime:** Strong interest; worked on a detailed Naruto arc rewrite project
- **Creative Writing:** Active, especially in the anime/fiction space
- **Communication style:** Prefers directness and blunt feedback — no hedging, no vague encouragement, high signal-to-noise
- **Response preference:** Concise, dense, actionable

---

## LLM / Inference Focus Areas

- llama-cpp-python tuning for 4GB RAM
- GGUF quantization selection (`RamInspector` concept)
- Local-first AI pipelines (no cloud dependency where avoidable)
- Free-tier cloud LLM fallback chains as a secondary option
- Semantic routing between models/tools
