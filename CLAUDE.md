# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A case management suite for a Texas personal injury / civil litigation /
criminal law practice. Database-centric: React + TypeScript front-end,
data-adapter layer with a localStorage demo mode and a Supabase/Postgres
adapter (`db/schema.sql`), activated via `.env`. Built incrementally in
vertical slices. Slice v0.1 (Case overview + Parties) is delivered; the
second slice is the medical billing analysis module, Phase 1a.

The user (Michael) is an attorney, not a developer. Claude does the heavy
lifting; Michael directs, reviews, and decides. Readability for Michael is
secondary to build speed and quality — but decisions still route through him.

## Commands

```bash
npm install        # install dependencies
npm run dev        # Vite dev server (localStorage demo mode unless .env is set)
npm run build      # type-check (tsc -b) + production build
npm run lint       # oxlint
npm run preview    # serve the production build locally
```

There is no test runner configured yet.

## Structure and architecture

- `src/domain/` — entity types (`types.ts`), case-type definitions
  (`caseTypes.ts`), party role registry (`partyRegistry.ts`).
- `src/data/` — the data-adapter layer. `adapter.ts` defines the
  `DataAdapter` interface; `localAdapter.ts` (browser localStorage, seeded
  from `seed.ts` — fictional demo data) and `supabaseAdapter.ts` implement
  it. `index.ts` picks the backend: if `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` are set (copy `.env.example` to `.env`), it uses
  Supabase; otherwise localStorage. **The UI only ever talks to the
  `DataAdapter` interface** — new features must work in both modes.
- `src/pages/` — route-level pages (case list/detail, new case, parties);
  `src/components/` — shared widgets. Routing via react-router-dom in
  `src/App.tsx`.
- `db/schema.sql` — the Postgres/Supabase schema. Keep it in sync with the
  domain types and both adapters when the data model changes.
- `docs/specs/` — spec snapshots from the design space (see below).

## Spec canonicity — do not edit specs here

Design and specification are done in the Claude.ai Project space, not in
coding sessions. The spec documents committed under `docs/specs/` are
**snapshots** of that canonical source:

- `case-management-project-instructions.md` — master spec (data model,
  decisions, build sequence)
- `medical-billing-analysis-module-synthesis.md` — billing module spec
  (Phase 1a is the current build target)
- `medical-billing-analysis-module-prompt.md` — the design-exploration
  prompt that produced the synthesis doc (reference input, not a build spec)
- `pi-case-playbooks.md`, `criminal-offense-playbooks.md` — playbook engines
- `transcript-workflows.md`, `plea-hearing-eligibility-reminder.md`,
  `citizens-mrf-dry-run.md` — subsystem specs and reference findings
- `criminal-appointment-intake-and-docket-enhancements.md` — OAA-based
  criminal matter intake, hearing auto-detect, docket cross-referencing
  (queued after billing 1a and the Outlook calendar push; the sample OAA
  documents it was derived from are real case data and stay OUT of the repo)
- `outlook-calendar-sync.md` — Outlook calendar integration; Phase 1
  one-way push (software → Outlook via Graph) is committed and queued
  after billing 1a; Phase 2 two-way sync is backlogged
- `outlook-email-intake.md` — EXPLORATORY only, no build commitment;
  HIPAA compliance is a first-class constraint when it activates
- `registry-courtlistener-integration-design.md` — CourtListener/FLP
  citation-graph integration design (2026-07-24): alert/API/MCP layers for
  citation-currency flags and cite validation. NOT built; sequencing awaits
  Michael (its §6). Governing principle: automation flags, only Michael
  verifies — no API result ever sets verified status
- `legal-rule-registry-draft-entries-medical-billing.md` — design-space draft registry
  entries on medical damages, billing, liens, and compelled exams (all
  UNVERIFIED; per-proposition source flags; Michael's sign-off checklist at
  the end). Supersedes-in-detail the nine short seeded propositions, but
  seeded proposition text is NOT to be rewritten from this doc until Michael
  settles the proposition-amendment workflow (spec-feedback item 7)
- `form-engine.md` — Forms & Document Automation Engine (fully specified
  2026-07-23; §9 variant library is Michael-approved VERBATIM — never
  rewrite it; no mental-health variant exists BY DESIGN, do not add one;
  build position follows billing 1a and the Outlook push)
- `feature-intake-2026-07-24.md` — feature-intake capture from the
  2026-07-24 design dictation session (INTAKE, not spec-final; NOTHING in
  it is built; every item needs a design pass before build). Item A
  (recorder → local transcription → sort & route) is Michael's designated
  next build target — its design pass landed 2026-07-25 as
  transcript-sort-and-route-design.md
- `transcript-sort-and-route-design.md` — feature-intake item A design pass
  (2026-07-25): hands-off ingestion + the sort/route staging inbox, extending
  transcript-workflows.md Phase 1. DESIGN-COMPLETE pending Michael's review
  of its §10 decision list (D1 auto-file posture, O2–O4). T1 (data model +
  inbox UI) and T2 (routing engine) are the hardware-free build slices; T3
  (Python/NeMo pipeline service) is gated on the P1 GPU machine
- `session-log.md` — dated session-to-session log. **The one exception to
  read-only:** coding sessions should skim the latest entries at session
  start and append a short dated entry at the top after substantive work,
  per the instructions inside that file. Append entries; don't rewrite
  history.

**Read them; never rewrite them in a coding session** (except the
session-log append rule above). If the build reveals a spec problem, note
it in a `docs/spec-feedback.md` file for Michael to take back to the design
space. Refreshed snapshots come from there.

## Legal Rule Registry discipline (BINDING, system-wide)

Every legal proposition any module relies on (statute, case, rule) must be
an entry in the Legal Rule Registry: cite, plain-language statement, scope,
status (unverified / verified / watch), last-verified date, verified-by,
watch flags. Entity definition: synthesis doc, Part 4. Rules:

1. **No legal rule is hard-coded while its registry status is unverified.**
   Unverified rules may exist in the registry and drive warnings/placeholders,
   never computed legal outcomes.
2. **A model asserting legal currency never counts as verification.**
   Verified status requires attorney sign-off (Michael). Claude must never
   set a rule to verified.
3. **Every computed output stamps the registry versions it relied on.**
4. All 2025 Texas legislation referenced in the playbook docs is from
   pre-/immediately-post-session snapshots and is **unverified** until
   post-session confirmation — deadline rules from it must not be hard-coded.
   (Exception: the record-clearing statutes file already reflects the
   Sept. 1, 2025 amendments per the master spec.)

## Data hygiene (privileged legal data)

- **No real client data in this repo, ever.** Seed/demo data is fictional
  (v0.1's seeds are; keep it that way). No client documents, medical bills,
  EOBs, or case files get committed.
- The Citizens Medical Center MRF (public hospital pricing file, ~55 MB) is
  the Phase 2 reference fixture. Reference it by local path outside the repo;
  do not commit it.
- PHI-touching AI processing (transcription, bill/EOB ingestion) runs
  **locally** on Michael's GPU machine by design — this is a privilege/PHI
  posture, not a hosting shortcut. Do not introduce cloud AI processing of
  case documents without an explicit decision from Michael.
- A professional security review is required before multi-user / live use.
  Claude is not a substitute for it. Do not represent any build as
  production-ready for privileged data.

## Build sequence and current state

1. Data model — complete (master spec §§7–11).
2. Slice v0.1 (Case overview + Parties) — built; Michael's feedback
   implemented 2026-07-23 (masked phone inputs, filterable combobox pickers).
3. Billing module Phase 1a — BUILT, gap-closed, and walkthrough-APPROVED by
   Michael (2026-07-23). Only CONFIRMED AnalysisRuns may feed settlement/
   lien math — enforced via settlementEligibleRuns() in src/domain/billing.ts.
   Phase 1b (local-AI PDF ingestion) is gated on the GPU arm — do not start it.
4. Outlook calendar push Phase 1 — BUILT 2026-07-24 (Calendar tab on case
   detail, CalendarEvent entity in both adapters, Graph push layer in
   src/outlook/ activated by VITE_MSAL_* env vars; setup steps in
   docs/outlook-setup.md; Michael's Entra app registration pending). Phase 2
   two-way sync is backlogged — do not start it.
5. Transcript sort & route (feature-intake item A, design pass in
   transcript-sort-and-route-design.md): T1 (data model, staging inbox,
   Transcripts tab) + T2 (routing engine + the repo's first test runner,
   vitest) BUILT 2026-07-25. T3 (Python/NeMo pipeline service) is gated on
   the P1 GPU hardware — do not start it; T4 wiring follows T3. Auto-file
   stays OFF (design D1) until Michael rules otherwise. OAA-based criminal
   appointment intake (criminal-appointment-intake-and-docket-enhancements.md)
   follows, then remaining tabs with feedback each step.

## Working style

- Small, reviewable increments; commit early and often with plain-language
  messages Michael can follow.
- Decisions with legal, cost, data-model, or scope implications go to
  Michael — don't resolve them silently in code.
- Preserve the data-adapter architecture: everything must keep working in
  zero-setup localStorage demo mode as well as against Supabase.

## Repo hosting and open decisions

- Hosting: **private GitHub** (decided 2026-07-21). The repo is pushed to a
  private GitHub repository as backup; keep it private — specs and code
  only, never client data.
- Open decision for Michael: the Citizens MRF's local path once chosen —
  record it here when decided.
- Local data directory (public benchmark data, kept out of the repo like the
  MRF fixture): `..\data\` — currently `..\data\pfs\` holds the 2026 Medicare
  PFS extract for TX Rest of State (locality 0441299) plus a provenance
  README (source files, method, license note). Import via the Benchmarks page.
