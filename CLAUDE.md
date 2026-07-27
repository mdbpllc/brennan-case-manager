# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A case management suite for a Texas personal injury / civil litigation /
criminal defense / probate practice — four practice areas, Michael's own
wording 2026-07-26 (probate added and family law removed by ruling that
date; see docs/specs/case-management-project-instructions.md §1).
Database-centric: React + TypeScript front-end,
data-adapter layer with a localStorage demo mode and a Supabase/Postgres
adapter (`db/schema.sql`), activated via `.env`. Built incrementally in
vertical slices; what is built right now lives in ONE place —
`docs/specs/BUILD-STATE.md`.

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

`npm test` runs the vitest suite (cite parser, routing engine, OAA parsing,
benchmark analysis). Run it plus `npm run build` and `npm run lint` before
ending a session.

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
- `statute-text-and-bill-tracking-design.md` — Statute Text & Legislative
  Tracking design pass (2026-07-25): Module A (current statute text from
  statutes.capitol.texas.gov — cache-on-demand, cite parser, viewer, hash
  tripwire feeding registry re-verification) + Module B (pending-bill
  tracking via the LegiScan API only, never crawling legiscan.com).
  §9 decisions all made 2026-07-25: O1 key registered (Supabase secret
  LEGISCAN_API_KEY); O2 working set = core nine + TX, LG, TN; O3 dashboard
  card (landed on the Cases landing page). ALL FOUR SLICES BUILT
  2026-07-25: T1 cite parser (src/cites/), T2 statute cache + viewer + A4
  tripwire (src/statutes/, Statutes pages), T3 bill tracking (src/bills/,
  Bill tracking page, fictional demo poll fixtures), T4 unified worklist
  + Cases-page card (src/statutes/worklist.ts, WorklistCard). Remaining:
  deploy + schedule the two edge functions (statute-fetch,
  legiscan-poller) per docs/statute-cache-setup.md — the poller is
  unexercised against the live API until then. Flags are advisory
  everywhere; verification stays attorney-only. Companions:
  `cite-parser-test-cases.md` (T1's 35-case fixture table, verbatim) and
  `watch-targets-seed.md` (T3's watch-target seed rows; §9-O4 answered —
  all sweep groups in). Build-time discovery: the .gov site is now an SPA —
  user deep links still work, but server-side fetch (A2/T2) must target
  tcss.legis.texas.gov/resources/ (see spec-feedback 2026-07-25).
  2026-07-25 addition: the A4 tripwire also raises `section-removed`
  (more urgent than text-changed) when a successfully refreshed chapter
  no longer contains a pinned section; re-verify clears both A4 kinds.
  NOTE: the repo snapshot of this design doc lags the project-knowledge
  version (see spec-feedback) — refresh from the design space, don't
  reconstruct here
- `time-tracker-fee-basis-profiles-design.md` — time-tracker fee-basis
  profiles design pass (2026-07-25). **DRAFT, not canonical:** authored in
  a Code session per Michael's session prompt, pending his review of its
  §8 decisions and design-space adoption. Every legal proposition in it
  is UNVERIFIED (its §7 lists the nine registry entries to open, for
  sign-off one at a time). NOT in the build queue; do not build from it
  until Michael rules on §8/§7
- `claimant-dimension-and-case-links-design.md` — **DRAFT — not in the
  build queue.** The **client** dimension (CL-2, ruled IN 2026-07-26: the
  case owns the occurrence and liability, the **client** owns the damages)
  plus case-to-case links (CL-1, PROPOSED and unruled). **The entity was
  renamed `claimant` → `client` on 2026-07-26 (D-CL2-1); the FILENAME
  deliberately keeps "claimant" so cross-references stay intact, and item
  IDs (CL-2, D-CL2-*) are unchanged.** Five decisions closed the same day —
  entity name + `posture`, practice-area profiles **derived** from the case
  (no per-client override; **the medical module belongs to the PI profile,
  not to cases generally**), case-level limitations retire in favor of a
  derived earliest, per-expense tagging with shared expenses split **evenly**,
  and shares locking at disbursement. **None of that authorizes a build** —
  no `case_clients`, no `posture` column, and `cases.statute_of_limitations`
  stays put until a migration is authorized. Its §10 still carries the open
  decisions plus CIV-1 (civil-litigation damages unspecified), PROB-1
  (probate profile unwritten), and PA-1. Sequencing note: **CE1 must be
  client-aware** if ever authorized, or the retrofit hits the shared
  substrate under both the heartbeat and the time tracker
- `model-routing-plan.md` — **DECISION MEMO — UNRULED; authorizes nothing.** How
  work should route across Fable 5 / Opus 5 / Sonnet 5 and across effort
  levels, argued from documented model strengths and from cost rather than
  from any capability ranking (§2 explains why no such ranking exists in
  Anthropic's docs). Drafts the **Q-5** model-usage clause at its §7.2 but
  **does not close Q-5** — that ruling is Michael's and fires instructions
  trigger #3. Also records: **effort has never been set in this project**;
  a queue defect (open items lose their question when packets are merged
  and deleted); and that the largest body of unexercised work is the
  registry, which no routing decision touches. **Do not adopt any part of
  it, set an effort level, or change model configuration from it**
- `cl2-authorization-brief.md` — **DECISION MEMO, not an authorization.** The
  CL-2 slice put to a decision: the six pieces, the three carve-outs, the
  honest risk (piece 3 repoints the foreign key under the built-and-walked
  medical module), two questions Code would otherwise default, and the
  walkthrough checklist. Michael reserved the authorization for a Fable
  session. Carries a bias disclosure — written by the instance that argued
  for the slice. **Do not act on it; it authorizes nothing**
- `operational-blockers-capture-2026-07-26.md` — RAW CAPTURE of the
  2026-07-26 session close (blockers re-analysis, auth-first sequencing).
  Nothing in it routes elsewhere; the client-model content of that same
  conversation is already folded into the design doc
- `BUILD-STATE.md` — the one-doc "what is built right now" snapshot,
  written for DESIGN-SIDE consumption (Fable/Opus in the Project space
  read this + the session log; they cannot see the local repo). **The
  second exception to read-only: REWRITE IT IN FULL (never append) at
  the end of every session that changes the app**, commit as
  `chore: refresh BUILD-STATE`. It reaches the design side through the
  repo's GitHub sync — after the verified push, the one-line reminder to
  Michael is: **"Pushed at `<sha>` — click Sync now on the repo in the
  Claude project"** (2026-07-25 correction: telling him to re-upload the
  file manually was never the mechanism). Hard rules: 120-line cap (cut detail, never add
  sections); describe what EXISTS, not what's planned; every claim
  verifiable from the working tree at its stated commit; generate
  mechanically where possible (routes from the router, tables from
  `db/schema.sql`, deltas from `git log`). If a design-side handoff
  arrives assuming a build state that isn't real, correct it in THIS
  file, not just in chat — chat never reaches the design side
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
5. **Majority-opinion rule (BINDING, ruled 2026-07-26; applies to any
   opinion retrieval, esp. CourtListener):** a citation lookup returns a
   CLUSTER id; clusters routinely contain several sub-opinions (majority,
   concurrence, dissent), and the cluster id collides with one
   sub-opinion id that is NOT reliably the majority. Never read or
   characterize an opinion from a cluster id alone — enumerate
   `sub_opinions` first; identify the majority positively by opinion-type
   marker and authoring language ("delivered the opinion of the Court"),
   never by position, id proximity, or assumption; state which
   sub-opinion was read whenever an opinion is characterized, and say so
   explicitly when separate opinions exist. A holding attributed to the
   wrong sub-opinion is the same class of error as an unverified
   proposition: a flag, never a verification. (Verified examples:
   Haygood cluster 2829381 resolves to the dissent, majority is 9810727;
   Cash America cluster 1576064, same collision — see
   registry-courtlistener-integration-design.md §0.1.)

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

## Build sequence and standing gates

**Status (what is built/pending) lives ONLY in `docs/specs/BUILD-STATE.md`
— do not restate it here.** This section records the ORDER of work and the
standing gates that survive any status change:

- Go-live gates are binding — see docs/specs/Go_Live_Gates.md before any
  live-mode or real-data work.

1. Data model (master spec §§7–11).
2. Slice v0.1: Case overview + Parties.
3. Billing module Phase 1a. Only CONFIRMED AnalysisRuns may feed
   settlement/lien math — enforced via settlementEligibleRuns() in
   src/domain/billing.ts. Phase 1b (local-AI PDF ingestion) is gated on
   the GPU arm — do not start it.
4. Outlook calendar push Phase 1 (setup steps in docs/outlook-setup.md).
   Phase 2 two-way sync is backlogged — do not start it.
5. Transcript sort & route T1+T2 (design pass in
   transcript-sort-and-route-design.md). T3 (Python/NeMo pipeline
   service) is gated on the P1 GPU hardware — do not start it; T4 wiring
   follows T3. Auto-file stays OFF (design D1) until Michael rules
   otherwise.
6. OAA criminal appointment intake Tier 1
   (criminal-appointment-intake-and-docket-enhancements.md §1–2). Tier 2
   (scanned packets: segmentation, OCR, handwriting) is gated on the P1
   GPU hardware — do not start it; the in-app fallback is manual entry.
   §3 docket cross-referencing rides with the docket-worksheet feature.
   Remaining tabs follow, with feedback each step.

## Working style

- Project knowledge is a working set, not an archive — see
  docs/project-knowledge-working-set-policy.md before adding large source
  documents.
- Small, reviewable increments; commit early and often with plain-language
  messages Michael can follow. **End every substantive session by
  rewriting `docs/specs/BUILD-STATE.md` in full, appending the
  session-log entry, pushing to origin, and VERIFYING the push landed**
  — confirm the remote ref actually moved (e.g. `git push` then check
  `git status`/`git ls-remote` shows origin at the new SHA); never
  report "pushed" from an unchecked command. A blocked push once left
  the design side ~32 commits behind (2026-07-25 root-cause). Then the
  one-line reminder to Michael is: **"Pushed at `<sha>` — click Sync
  now on the repo in the Claude project"** — stating the SHA lets him
  check it against BUILD-STATE's stated commit. The push + his Sync
  click are the only channels that reach the design side; if the push
  is blocked, tell Michael in the report.
- **Sync scope (revised 2026-07-26 at the new-build-project migration;
  supersedes the 2026-07-25 full sync):** the project-knowledge GitHub
  sync carries `docs/`, `db/`, `supabase/`, `CLAUDE.md`, `README.md`, and
  `BUILD-SESSION-NOTES.md`. `src/` and build tooling are deliberately
  EXCLUDED (~23% knowledge capacity vs. 42% full-repo). Consequence: the
  design side can no longer read source to verify claims —
  `docs/specs/BUILD-STATE.md` is its SOLE authority on what is built,
  which raises the stakes on BUILD-STATE accuracy (the 2026-07-25 scope
  carried src/ precisely for verification; that trade was re-made
  deliberately, session-log 2026-07-26 #4).
- `inbox/` (gitignored) holds queued push-to-code packets produced by
  design sessions; process the whole batch with
  docs/prompts/QUEUE-RUNNER.md; delete packets after execution — the
  session-log entries are the record. STANDING CONVENTION — ruled
  ADOPTED by Michael 2026-07-26 (Q-1). `docs/prompts/` is the canonical
  home for cross-interface prompts (prompts meant to be executed by
  Code sessions) — ruled 2026-07-26 (Q-2).
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
  `..\data\pilot-recordings\` holds the Phase 0 pilot audio + findings docs
  (all fictional content); the transcript JSONs are also committed at
  src/routing/__tests__/pilot/ as routing-engine fixtures. When the P1
  arrives, re-run the audio on full-precision NeMo and diff against those
  JSONs to measure the gain.
