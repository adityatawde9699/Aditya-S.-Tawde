# Portfolio Redesign Roadmap

## Objective

Evolve Aditya S. Tawde's existing portfolio into a **Monochrome AI Engineering Lab** that communicates system thinking, AI engineering, software engineering, and research-to-product work.

Preserve the existing application architecture, working links, content management, contact functionality, SEO, and deployment compatibility. Implement the redesign within this repository rather than replacing it with a template.

## Phase status — 2026-10-02

- [x] Phase 1 — Audit and redesign architecture.
- [x] Phase 2 — Centralized monochrome design system.
- [x] Phase 3 — Section structure and content integration.
- [x] Phase 4 — Visual and responsive refinement.
- [x] Phase 5 — Local automated, browser, and asset verification.

All five phases are complete within the local redesign scope. Deployment and live database/email checks were not performed; remaining limits are recorded below.

## Current implementation

Phase 1 inspection is complete. No application files were changed during the audit.

| Area | Existing foundation |
| --- | --- |
| Frontend | React 19, Vite 7, JavaScript/JSX |
| Entry points | `client/index.html` → `client/src/main.jsx` → `client/src/App.jsx` |
| Public navigation | Single page with section navigation; no mounted client router |
| Styling | Component CSS Modules; global variables, utilities, and animations; Tailwind 4 configured |
| Backend | Hono, TypeScript, Drizzle ORM, Neon PostgreSQL |
| Content | Frontend fallback data plus aggregated `/api/portfolio/all/` CMS payload |
| Contact | Existing frontend form and backend persistence/email endpoint |
| Deployment | Vercel frontend, Render backend, Docker/Nginx alternative |
| Tests | Vitest with happy-dom; application composition, contact, and API hook tests |
| SEO | Canonical URL, Open Graph, Twitter metadata, Person structured data, sitemap, robots, and Google verification |

Current homepage: Header → Hero → About → Skills → Projects → Experience → Résumé → Contact → Footer.

### Audit findings to address

- Frontend fallback data lists six projects, while the backend seed lists nine different entries. API availability currently changes the visible catalog.
- LunaMatch, ClimaX, and NeuroX are absent from the current portfolio project data.
- Normalize the displayed project name from Cognote to Cognate.
- Ledger's current checkout uses React/Vite; existing portfolio descriptions also claim Next.js.
- The checked-in résumé documents eight certifications. Do not retain the existing `15+` claim without additional evidence.
- Remove unsupported capability percentages, zero-latency claims, and other unverified outcomes.
- Several section `aria-labelledby` attributes reference heading IDs that `SectionHeader` does not create.
- Improve mobile-menu focus handling and accessible form error associations.
- Apply reduced-motion preferences to JavaScript animations and smooth scrolling as well as CSS.
- Handle automatic API fetch failures without unhandled promise rejections.
- Keep CMS publication status separate from project development status.
- Current CI checks backend compilation and frontend tests, but omits frontend build and lint.
- Review large assets: `Amadeus.png` is approximately 1.9 MB and `AST.svg` approximately 5.4 MB.
- Existing mobile CSS places the profile and metrics before the name. Reorder the storytelling around identity and selected work.

## Non-negotiable constraints

- Use only black, white, and grayscale throughout the visual system, including loading, error, hover, focus, icons, diagrams, favicons, and social previews.
- Allowed palette: `#000000`, `#080808`, `#101010`, `#171717`, `#222222`, `#303030`, `#4A4A4A`, `#707070`, `#A0A0A0`, `#CFCFCF`, `#E8E8E8`, `#FFFFFF`.
- Prefer editorial typography, negative space, thin rules, technical metadata, and meaningful diagrams.
- Avoid dashboard layouts, excessive rounded cards, colored glows, particles, heavy 3D, scroll-jacking, and continuous decorative motion.
- Use repository implementation, the résumé, and supplied project information as evidence. Use neutral wording for unknown details.
- Do not invent metrics, achievements, employment, partnerships, performance results, demo URLs, or project capabilities.
- Preserve React/Vite, CSS Modules, the Hono backend, and deployment compatibility unless a demonstrated requirement justifies a change.
- Avoid unnecessary dependencies and client-side JavaScript.

## Phase 1 — Audit (complete)

- [x] Inspect project structure, package files, frontend entry points, and page composition.
- [x] Inspect components, global styles, CSS Modules, and responsive rules.
- [x] Inspect assets, résumé, social links, and SEO configuration.
- [x] Inspect backend schema, seed data, serialization, API loading, CMS, and contact flow.
- [x] Inspect deployment configuration and existing test coverage.
- [x] Review local README files and package manifests for the six selected systems.
- [x] Report audit findings and propose the redesign architecture.

**Limit:** Responsive findings are based on source inspection. Browser rendering, overflow checks, builds, lint, and tests have not yet been performed. Dependencies were not installed during the audit.

## Phase 2 — Design system and content foundation (implemented)

### Centralized visual system

- [x] Replace the existing colored tokens in `client/src/styles/variables.css` with semantic grayscale tokens.
- [x] Use Inter or an equivalent modern grotesk for primary typography and JetBrains Mono or an equivalent for technical metadata.
- [x] Define fluid editorial heading sizes, readable body text, and compact metadata styles.
- [x] Centralize a spacing scale, section spacing, container widths, and page gutters.
- [x] Define 1px borders, minimal corner radii, and restrained shadows without glows.
- [x] Establish consistent mobile, tablet, and desktop layout rules.
- [x] Define brief reveal and hover transitions, with static reduced-motion alternatives.
- [x] Replace the particle/WebGL backdrop with a subtle static technical grid.
- [x] Remove hardcoded colored styles, gradients, badges, emojis, and fallback colors from the public UI.
- [x] Update browser theme colors, favicons, and social previews while preserving their stable paths and SEO references.

### Verified content model

- [x] Extend the existing data layer with stable project identifiers, purpose, problem, implementation, architecture, stack, development status, links, and source references.
- [x] Define explicit CMS merge rules so older API records cannot erase verified selected-system metadata.
- [x] Preserve CMS publication visibility; never expose draft records through fallback merging.
- [x] Add the eight résumé-backed certifications with factual issuer names; omit dates absent from the latest résumé. Add credential links only when known.
- [x] Use documented achievements and activities without implying awards or wins.
- [x] Verify repository URLs for archive entries and preserve existing valid project links.
- [x] Derive any displayed metrics from documented data. Omit unsupported figures.
- [x] Treat `ONLINE` as an identity label rather than a live service-health measurement; avoid simulated logs or telemetry presented as real.

**Exit criteria:** A centralized monochrome system and consistent content model are ready for section implementation.

## Phase 3 — Page structure (implemented)

Reuse the existing section components where appropriate. Add focused components for case studies, architecture diagrams, engineering principles, current work, and the archive.

| Section | Implementation |
| --- | --- |
| Navigation | Small desktop navigation: work, about, stack, journey, contact, availability. Mobile: `> AST_` and accessible menu. |
| 00 / Hero | Asymmetric `ADITYA S. / TAWDE` heading, role, positioning statement, focus line, work/résumé links, education/location metadata, and monochrome workstation visual. |
| System profile | Lightweight role, focus, primary tools, building mode, location, and education metadata. |
| Metrics | Large type separated by rules; show only supported counts. |
| 01 / Selected Systems | Six editorial case studies; each answers problem, system, contribution, technology, and current status. |
| 02 / Engineering | `I BUILD SYSTEMS, NOT JUST INTERFACES.` with four numbered principles. |
| 03 / Stack | Technical matrix: AI/ML, LLM/GenAI, backend, data, frontend, infrastructure. Include only supported skills. |
| 04 / Currently Building | Compact rows using supplied building, experimenting, iterating, and learning labels. |
| 05 / Journey | 2024–2028 B.Tech timeline, JNEC/MGM University, certification archive, and documented activities. |
| 06 / Archive | Repository-style rows with name, purpose, technology, and verified source links. |
| 07 / Contact | `HAVE AN INTERESTING PROBLEM? LET'S BUILD IT.` plus GitHub, LinkedIn, email, résumé, and the restyled working contact form. |

### Selected systems

| Project | Engineering visual and content checks |
| --- | --- |
| Amadeus AI | Client/transport/runtime flow; planning, tool execution, memory, observation, reflection, response. Verify provider routing and distinguish current storage from optional or historical adapters. |
| LunaMatch | Source/reference imagery, extraction, matching, geometric verification, registration, refinement. Label illustrative correspondences; do not imply independently validated accuracy. |
| ClimaX | Environmental observation → risk → incident → dispatch → mitigation → resolution. Use a schematic grayscale map without fabricated operational data. |
| Cognate | Tasks → deterministic Rust planner → time blocks → auto-reflow → CRDT sync. Explain local storage and privacy boundaries. |
| NeuroX | Android and caregiver web connected through FastAPI and persistence. Describe supportive engagement, offline behavior, and personalization without clinical claims. |
| Ledger | Transactions, receipt OCR, categorization, investments, and insights. Reflect the current React/Vite and FastAPI implementation. |

Prefer semantic HTML and lightweight inline SVG for diagrams. Provide readable text equivalents. Project visuals should explain architecture rather than imitate live application dashboards.

### Archive content

- Coffee'n me
- Arth-Neeti
- Amadeus-chat
- InterView AI
- Fake Review Detector
- Industrial Equipment Failure Prediction
- LibraryPro

Confirm unknown links, technologies, and purposes before rendering them. Preserve other valid existing projects as secondary archive entries where appropriate.

- [x] Implement navigation, hero, profile, and supported metrics.
- [x] Implement the six selected-system case studies and distinct diagrams.
- [x] Implement engineering, stack, current work, journey, archive, and contact.
- [x] Preserve existing social environment overrides and `/Aditya_Portfolio.pdf`.
- [x] Preserve API/CMS/contact compatibility and handle unavailable-backend states.
- [x] Connect section headings, navigation anchors, and accessible labels correctly.

**Exit criteria:** All requested sections are implemented with verified content and working navigation.

## Phase 4 — Visual and responsive refinement (implemented)

- [x] Tune typography, hierarchy, line lengths, whitespace, and section rhythm.
- [x] Give selected systems the greatest visual prominence.
- [x] Keep metadata sparse and diagrams legible.
- [x] Use asymmetric desktop layouts, deliberate tablet collapse, and single-column mobile storytelling.
- [x] Lead mobile content with identity, positioning, and work navigation.
- [x] Reorganize diagrams for mobile instead of shrinking desktop labels.
- [x] Keep meaningful controls at least 44px in touch-target size.
- [x] Fix layout causes of overflow rather than masking them with global clipping.
- [x] Optimize and size raster assets; lazy-load below-the-fold imagery and split genuinely heavy code.
- [x] Provide visible grayscale focus states, keyboard menu operation, focus return, and accessible form feedback.
- [x] Ensure content remains visible and usable with reduced motion.

**Exit criteria:** Desktop, tablet, and mobile feel intentionally composed and meet the monochrome design constraints.

## Phase 5 — Verification (local checks passed)

### Automated checks

- [x] Verify available frontend dependencies and install backend dependencies using the existing lockfile.
- [x] Run frontend build: `cd client && npm run build`.
- [x] Run frontend lint: `cd client && npm run lint`.
- [x] Run existing tests: `cd client && npm test -- --run` — 20 tests passed across 5 files.
- [x] Run backend compilation: `cd server && npm run build`.
- [x] Fix failures and add targeted regression coverage for material behavior changes, including content merging and API failure handling.
- [x] Add frontend build and lint to the existing CI workflow.

Do not run database migrations, forced reseeding, or deployment as part of local UI verification.

### Browser and asset checks

- [x] Inspect at 320px, 375px, 390px, 768px, 1024px, and 1440px.
- [x] Check horizontal overflow, readable text, diagram labels, and mobile-menu behavior.
- [x] Inspect normal and reduced-motion modes.
- [x] Check browser console errors, failed network requests, and missing assets.
- [x] Verify internal anchors, résumé download, and public project/social URLs; record LinkedIn's inconclusive automated availability check.
- [x] Test keyboard navigation, focus visibility, heading hierarchy, contrast, and form feedback.
- [x] Exercise contact success, validation, and failure states using mocks; no real contact messages were sent.
- [x] Cover populated API content and unavailable-backend fallback behavior with mocked tests and local fallback inspection.
- [x] Confirm grayscale styling across the public UI and displayed assets.
- [x] Inspect preserved canonical, social metadata, structured data, sitemap, robots, and Google verification configuration.
- [x] Review Vercel and Render configuration for compatibility; no deployment performed.

**Exit criteria:** Required checks pass, observed issues are fixed, and any environment-dependent limitations are explicitly recorded.

## Completion report

Completed in the implementation record below:

1. What changed and how it supports the engineering-lab identity.
2. Files and components changed.
3. The centralized design system.
4. Major UX and responsive improvements.
5. Content corrections and evidence-backed metrics.
6. Build, lint, test, and browser verification results.
7. Remaining limitations and any unverified external links or deployment behavior.

The final quality bar is an AI engineer's personal systems lab: deliberate typography, clear engineering explanations, accurate content, and reliable behavior.

## Implementation record — 2026-10-02

Phases 2, 3, and 4 are implemented. Phase 5 local checks pass; deployment and live database/email validation remain outside this local redesign.

### Delivered

- Centralized monochrome tokens in `client/src/styles/variables.css`: grayscale surfaces and text, Inter/JetBrains Mono, fluid headings, spacing, borders, minimal radii, container widths, and reduced-motion rules.
- Small accessible desktop/mobile navigation, asymmetric hero, runtime study, lightweight system profile, and data-derived metrics: 17 documented projects, 8 résumé-backed certifications, 6 selected systems. Counts respond to explicit CMS publication visibility.
- Six editorial case studies with problem, system, contribution, verified stack, owner-supplied development status, repository, available demo, and distinct explanatory visuals.
- LunaMatch uses optimized grayscale TMC-2 science-window previews from the local project. Overlay points are labeled illustrative; no ground-truth accuracy is claimed.
- Engineering principles, technical stack matrix, current-work board, education timeline, certification archive, documented activities, repository archive, and editorial contact section.
- Updated the stable `/Aditya_Portfolio.pdf` download to the newly supplied résumé and the default LinkedIn URL to that résumé's URL. Environment overrides remain supported. The existing canonical deployment domain remains unchanged.
- Grayscale favicons, manifest/theme colors, social preview, and CMS styling. Removed obsolete particle and WebGL components from the source and public render path.
- Existing Hono/Drizzle/Neon API and contact endpoints remain in place. The aggregate payload now includes `projectVisibility` for known public catalog IDs, so a draft record can suppress a curated entry without exposing draft descriptions or private repository links. No schema migration is required.
- Automatic API rejections are consumed after setting error state. A missing API URL serves the curated portfolio and gives contact visitors a direct-email fallback. Contact POSTs are never automatically retried.
- Added frontend build and lint to the existing GitHub Actions workflow. No new application dependencies.

### Validation

| Check | Result |
| --- | --- |
| Frontend production build | Passed; final build output in `/tmp/ast-portfolio-build` to avoid altering tracked generated files |
| Frontend lint | Passed |
| Frontend tests | 20 passed across 5 files |
| Backend TypeScript build | Passed using locked dependencies |
| Browser widths | 320, 375, 390, 768, 1024, 1440px: no horizontal overflow |
| Internal anchors / section labels | All resolve |
| Grayscale computed styles | No colored UI styles found |
| Reduced motion | Reveal animation: none; scroll behavior: auto |
| Mobile navigation | Focus on opening, scroll lock, Escape closure, and focus return verified |
| Local résumé / icons / preview / lunar imagery | HTTP 200; no broken rendered images |
| Featured repository links | All 6 returned HTTP 200 |
| Demo links | All 5 returned HTTP 200 |
| Contact feedback | Required fields, focused validation, successful mocked submission, failed mocked submission, and retained message verified |
| API behavior | Populated payload, request coalescing, draft suppression, unavailable backend, cache recovery, and non-retried contact requests covered |

Browser console check: zero errors and zero warnings.

Browser screenshots are saved under `output/playwright/`, including desktop, mobile, and individual case-study views. These generated review artifacts are ignored by Git.

### Remaining limits and explicit decisions

- No deployment, database migration, reseeding, or real contact/email submission was performed. Production contact delivery and live CMS writes require the existing configured backend and credentials.
- Deploy the frontend and additive backend update together for draft suppression. An older backend without `projectVisibility` can still serve the curated site, but cannot control curated publication visibility.
- Curated case-study architecture and verified technology labels are maintained in `client/src/data/projectData.js`; they are intentionally not replaced by older CMS descriptions. The CMS continues to control publication and demo links, and supplies additional archive repositories and certifications.
- DataScraperViz's old GitHub URL returned HTTP 404. Its résumé-backed entry remains visible with “Source unavailable”; the dead link is not rendered.
- LinkedIn rejects automated HEAD requests (HTTP 405). Its newly supplied résumé URL is retained; automated availability verification is inconclusive.
- The industrial prediction repository has no accessible README at the tested default-branch paths. Its entry uses the supplied project title, neutral purpose, and GitHub-reported HTML language. No unverified ML capability or outcome is asserted.
- The pre-existing frontend lockfile changes were preserved. Existing dependency audit findings were not addressed through unrelated upgrades.

### Files and components changed

- Page composition: `client/src/App.jsx`, `App.css`, and `hooks/usePortfolio.js`.
- Shared styling: `index.css`, `styles/variables.css`, `styles/utilities.css`, and `styles/animations.css`.
- Adapted existing sections: `Header`, `Hero`, `About`, `Projects`, `Skills`, `Experience`, `Contact`, `Footer`, and their CSS Modules; simplified `SectionHeader`, `ErrorBoundary`, and `Resume`.
- New focused components: `SystemDiagram`, `Engineering`, `CurrentWork`, and `Archive`, with corresponding CSS Modules.
- Content and integration: `data/projectData.js`, `config/social.js`, `services/api.js`, `hooks/useApi.js`, and `.env.example`.
- Assets and SEO: latest public résumé, optimized lunar WebP files, favicons/icons, Open Graph image, manifest, sitemap, and `client/index.html`.
- Backend: `lib/queries.ts`, `routes/portfolio.ts`, and the CMS palette in `admin/cms.tsx`.
- Verification: API/content regression tests, updated composition/contact/hook tests, CI frontend build/lint steps, and ignored Playwright review artifacts.

## Client animation refinement — 2026-10-02 (complete)

- [x] Add staggered hero copy and a terminal cursor that stops after six cycles.
- [x] Reveal section headings and case-study copy once as they enter the viewport, including lazy-mounted content.
- [x] Animate runtime nodes, pipeline steps, lunar correspondences, planning blocks, and supporting system diagrams.
- [x] Add subtle arrow movement on button/link hover and keyboard focus.
- [x] Centralize motion durations, stagger timing, and shared keyframe names; add no dependencies.
- [x] Keep content visible without observer support and disable motion for reduced-motion and print modes.
- [x] Verify build, lint, and all 20 tests; browser confirms active keyframes and zero running diagram animations after enabling reduced motion.
- [x] Check 320px, 390px, 768px, and 1440px widths: no horizontal overflow.

Implementation: `hooks/useScrollMotion.js`, `App.jsx`, hero/project/system-diagram components, and shared animation/design tokens.

## Reference-inspired workstation hero — 2026-10-02 (image approach superseded)

- [x] Blend the supplied reference into the existing portfolio hero: large name, left-aligned identity, grayscale workstation backdrop, technical grid, slim system rail, and existing work/résumé links.
- [x] Keep all identity, metadata, navigation, and controls as semantic HTML; treat the generated scene as decorative, not a photograph of the owner's actual workstation.
- [x] Add a one-time scene entrance, staggered text/rail reveals, a subtle single scan, and a finite terminal cursor. Preserve reduced-motion support.
- [x] Adapt the rail into a compact mobile profile strip and use responsive image sources.
- [x] Optimize generated imagery to WebP: desktop 60,792 bytes; mobile 19,044 bytes. No additional application dependencies.
- [x] Pass frontend build, lint, and all 20 tests. Inspect desktop/mobile screenshots and widths 320, 375, 390, 640, 768, 1024, 1440px: images load and no horizontal overflow. Reduced motion leaves zero hero animations running.

Changed: `client/src/components/Hero.jsx`, `Hero.module.css`, and assets `client/public/images/workstation/hero.webp` / `hero-mobile.webp`.

### Generated asset provenance

Tool: built-in `image_gen.imagegen`. The generated scene was resized and encoded for web delivery; the reference's UI and text are implemented separately in HTML/CSS.

Final generation prompt:

> Create a wide cinematic website hero BACKGROUND photograph, landscape 2.7:1 composition, strictly black white and neutral grayscale, no tint. An AI engineer's personal research workstation at night. Desk and multiple realistic monitors are concentrated in the RIGHT HALF, one upper monitor showing grayscale lunar terrain and abstract correspondence lines, lower monitor showing lunar registration imagery, other monitors showing small indistinct code, understated keyboard, small potted plant, chair silhouette, precise industrial research studio. Very dark low-key illumination, crisp fine details, matte charcoal, no colored glow. LEFT HALF is nearly empty dark charcoal wall with no subjects so white HTML text can be layered there; seamless dark fade towards all edges. Use the uploaded reference only as a composition/style reference: do NOT reproduce its UI, text, names, buttons, labels, borders or sidebar. Output ONLY the background scene, absolutely NO website text, UI overlays, branding, watermarks, dashboard boxes or legible words. Photorealistic premium editorial monochrome, subtle analog grain, restrained engineering atmosphere.

## Code-built animated workstation — 2026-10-02 (complete)

The owner clarified that the desktop setup must be animated directly in the website. This implementation supersedes the generated-image approach above; the hero no longer references or loads those raster assets.

- [x] Build the workstation in HTML/CSS/SVG: three monitors, desk, keyboard, mouse, cup, plant, shelf, and chair.
- [x] Animate code focus, runtime pipeline nodes, lunar correspondence lines, and subtle screen scans in grayscale. Screen content is an illustrative architecture study, with no fabricated live metrics.
- [x] Blend the scene behind the existing semantic hero and system rail; preserve responsive storytelling and accessible controls.
- [x] Pause screen animations while the hero is offscreen and disable them for reduced-motion preferences.
- [x] Pass frontend build, lint, and all 20 tests. Browser confirms zero hero image elements, running screen animations, offscreen paused states, and zero animations under reduced motion.
- [x] Inspect desktop/mobile screenshots and widths 320, 390, 768, 1024, 1440px: no horizontal overflow or browser console errors.

Changed: `Hero.jsx`, `Hero.module.css`, new `WorkstationScene.jsx`, and `WorkstationScene.module.css`. No new dependencies or animation frame loops.

## Workstation depth and reference refinement — 2026-10-02 (complete)

- [x] Replace the wireframe treatment with shaded monitor casings, screen reflections, a perspective desktop, mesh chair with armrests, and dimensional keyboard/cup/plant details.
- [x] Match the reference's room composition more closely: stacked central screens, left code monitor, side display, window/city silhouettes, overhead light, and foreground chair.
- [x] Replace circular bubble-like lunar graphics with static procedural SVG terrain lighting, a curved lunar limb, and animated registration correspondences. Clearly label the imagery as a procedural/illustrative study.
- [x] Reduce the technical grid's prominence to preserve the room's visual depth.
- [x] Pass frontend lint, production build, and all 20 tests. Browser checks at 320, 375, 390, 640, 768, 1024, and 1440px show no horizontal overflow; no console errors observed.
- [x] Confirm the scene contains zero raster images, screen animations run, all scene animations pause offscreen, and reduced motion leaves zero hero animations.

Changed: `WorkstationScene.jsx`, `WorkstationScene.module.css`, and `Hero.module.css`. Review screenshots: `output/playwright/depth-workstation-desktop.png` and `depth-workstation-mobile.png`.

Visual limit: this is a code-built approximation of the photographic reference, not a pixel-identical reconstruction. The owner requested an animated website scene rather than an image backdrop; that constraint remains preserved.

## Workstation alignment polish — 2026-10-02 (complete)

- [x] Use a fixed aspect ratio for the entire code-built scene so monitors, desk, and chair keep consistent proportions across viewport sizes.
- [x] Align stacked central monitors, flanking code displays, keyboard, desk surface, lighting, and chair around the supplied reference composition.
- [x] Move system metadata below the workstation to keep all screens unobstructed.
- [x] Give mobile a dedicated scene area below the introduction rather than stretching the desktop backdrop behind the text.
- [x] Refine lunar orientation and terrain texture; soften scene boundaries.
- [x] Pass build, lint, whitespace checks, and browser checks at 320/390/768/1024/1440px. No horizontal overflow; reduced motion disables hero animations; the hero contains no raster image elements.

Review: `output/playwright/aligned-workstation.png` and `aligned-workstation-mobile.png`. The scene remains a procedural interpretation of the photographic reference.

## Workstation realism and depth refinement — 2026-10-02 (complete)

- [x] Rebuild the foreground chair and plant as detailed SVG illustrations with shaped frames, mesh, arms, seat, leaves, pot, and shadows.
- [x] Add a fifth diagnostic display, file-tree/code editor, monitor arms, layered lunar panels, a city-lit window, desk thickness, legs, books, cup, keyboard, and mouse.
- [x] Tighten every monitor into a single perspective cluster and tune reflection, bezel, terrain, and contact-shadow treatments.
- [x] Keep all visual elements procedural HTML/CSS/SVG; no hero raster image is rendered.
- [x] Pass build, lint, and all 20 tests. Browser checks confirm no horizontal overflow from 320px to 1440px and zero animations when reduced motion is enabled.

Review: `output/playwright/workstation-depth.png` and `workstation-depth-mobile.png`.

## Screen alignment — 2026-10-02 (complete)

- [x] Align the left display pair to one left/right edge and the central lunar pair to one left/right edge.
- [x] Place the three lower monitors on the same top and bottom baseline with uniform gaps; remove per-screen rotation.
- [x] Verify exact monitor rectangles at 1104px in Chromium and review mobile rendering.
- [x] Pass frontend lint and production build. Browser widths 320, 390, 768, 1104, and 1440px show no horizontal overflow.

Review: `output/playwright/aligned-screens-final-1104.png` and `aligned-screens-mobile.png`.

## Generated workstation image restored — 2026-10-02 (current)

The owner asked to use the generated workstation images. `Hero.jsx` now renders the optimized desktop and mobile WebP assets through a responsive `<picture>`; the code-built scene is retained in source but is no longer mounted or included in the client bundle.

- [x] Use `client/public/images/workstation/hero.webp` on desktop and `hero-mobile.webp` on narrow screens.
- [x] Preserve semantic hero copy and controls over the desktop image; place the mobile image in its dedicated scene area.
- [x] Keep the restrained image entrance and reduced-motion behavior.
- [x] Verify both images load in Chromium, are copied into the production build, and cause no horizontal overflow at 390, 768, 1104, and 1440px.
- [x] Pass frontend build, lint, and all 20 tests.

Review: `output/playwright/generated-hero-desktop.png` and `generated-hero-mobile.png`.

## Figma Make completion — 2026-10-02 (implemented locally)

Reference: [Intelligent Systems Overview](https://www.figma.com/make/AzV3YZPKPmdmf8GHMWb7Gz/Intelligent-Systems-Overview). The preview was inspected in a browser; the Figma node connector was unavailable. The generated workstation images remain in the hero as requested in the latest visual direction.

- [x] Match the prototype's editorial `Intelligence, engineered.` selected-work introduction and light grayscale engineering panel.
- [x] Add six dedicated `/systems/:id` case-study pages with a verified project problem, architecture diagram, flow, engineering focus, status, stack, source/demo links, and next-system navigation.
- [x] Add `/archive` with live search, technology-category filters, counts, project links, and an empty-results state. Keep seven requested projects in the homepage archive preview.
- [x] Make navigation and footer links work from every route; retain Vercel's existing history fallback rewrite.
- [x] Add route-specific document metadata and sitemap entries while preserving the original homepage SEO setup.
- [x] Check all six routes at 390px for overflow and missing images; inspect case-study and archive pages at desktop width and the light engineering section at 1440px.
- [x] Pass client build, lint, and 22 tests across six files, including route and archive-search coverage.

Content note: the Figma Make prototype includes placeholder metrics, capabilities, and links. The implementation keeps the repository and résumé-backed data instead of copying unverified claims. No production deployment or live backend/contact delivery check was made in this phase.

## System-study visual completion — 2026-10-03

- [x] Recompose selected-system rows to match the reference's left narrative / right study layout, with figure labels, rules, and captions aligned above the diagram.
- [x] Build six distinct monochrome study visuals: layered runtime flow, lunar image correspondences, contour-map response path, deterministic planner with illustrative time blocks, assistive-system flow, and finance pipeline.
- [x] Move verified implementation notes beside the project narrative and keep repository imagery and illustrative-data labels explicit.
- [x] Preserve concise process detail on case-study routes; support reduced motion and lazy-load lunar imagery.
- [x] Browser-check all six diagrams on mobile for overflow and image loading; desktop visual inspection completed. Build, lint, and all 22 tests pass.
