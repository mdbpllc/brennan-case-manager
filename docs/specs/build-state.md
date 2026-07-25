# Build State — what the software actually does right now

**Purpose:** the single doc a DESIGN-SIDE session (Fable/Opus in the Claude.ai
Project space) reads to know what is built, without walking 30 session-log
entries or the git history. The session log stays the narrative record;
this is the snapshot. **Updated at the end of every substantive Code
session** (same binding convention as the session-log append rule — see
`session-log.md` header and CLAUDE.md). If this doc and the session log
ever disagree, the session log's newest entry wins and this doc is stale —
say so rather than guessing.

**As of:** 2026-07-25, commit `c92278f` (after the statute-tracking build,
the Citizens handoff routing, and the time-tracker design draft).
**Design-side note:** statements below are Code-side ground truth at that
commit. Anything Michael changed later is in newer log entries.

---

## Delivered and walkthrough-level working (demo mode + Supabase adapter)

- **Core case management (slice v0.1):** case list/detail/new-case, Parties
  with role registry, masked phone inputs, filterable combobox pickers.
  Demo mode (localStorage, fictional seeds) and Supabase adapter both live;
  UI talks only to the DataAdapter interface.
- **Medical billing module Phase 1a** (walkthrough-APPROVED 2026-07-23):
  Medical tab + bill ledger, line-item entry with attorney-review table,
  chargemaster-memory fuzzy CPT mapping with confidence badges, light
  coding audit, claim-type detection with facility-bill disclaimers,
  Medicare PFS benchmark lookups (billed-to-Medicare ratios), EOB
  patient-responsibility typed field, reasonable-value report generator,
  AnalysisRun/ReviewLog entities. Only CONFIRMED runs feed settlement/lien
  math (`settlementEligibleRuns()`). Phase 1b (AI PDF ingestion) gated on
  GPU hardware — not started.
- **Legal Rule Registry (system-wide):** entries with cite/proposition/
  scope/status, attorney-only verification (binding rules 1–3 enforced in
  UI posture), review log, watch flags.
- **Outlook calendar push Phase 1** (2026-07-24): Calendar tab, CalendarEvent
  entity, Graph push layer behind VITE_MSAL_* env vars. Michael's Entra app
  registration still pending, so unexercised live. Phase 2 two-way sync
  backlogged.
- **Transcript sort & route T1+T2** (2026-07-25): staging inbox, Transcripts
  tab, routing engine (tag templates, spoken-number normalizer, fuzzy
  matching, confidence scoring) tested against the 13 pilot transcripts;
  vitest is the repo's test runner. T3 (local NeMo pipeline) gated on GPU
  hardware. Auto-file OFF per design D1.
- **OAA criminal intake Tier 1** (2026-07-25): /cases/new/oaa upload →
  draft review → Create Matter, charges as child records. Parser tuned
  against TWO REAL ORDERS (Medina scan → correctly fell to manual entry;
  Uvalde OCR layout extracts end-to-end incl. wrapped offense rows, dotted
  dates, docket-setting detection). Real documents stay out of the repo;
  fictionalized fixtures committed. Tier 2 (scanned/handwriting) gated on
  GPU hardware.
- **Statute Text & Legislative Tracking — ALL FOUR SLICES (2026-07-25):**
  - T1 cite parser/resolver (`src/cites/`): 28 live-verified code
    abbreviations, statutory/CCP/constitution/chapter/range forms,
    act-chain grammar; registry cites deep-link into the viewer. The .gov
    site is now an SPA — server-side fetch targets
    `tcss.legis.texas.gov/resources/…` (spec-feedback item).
  - T2 statute cache + viewer + A4 hash tripwire (`src/statutes/`):
    cache-on-demand chapters, per-section FNV-1a hashes over NORMALIZED
    text, Statutes page + viewer with deep links, Mark-verified pins
    snapshots, refresh diffs hashes and raises `text-changed-since-verified`;
    re-verify is the clearing act. **NEW 2026-07-25:** `section-removed`
    flag — a successfully refreshed chapter that no longer contains a
    pinned section (repeal/renumbering) raises this more-urgent flag;
    failed refreshes prove nothing and raise nothing.
  - T3 bill tracking (`src/bills/`, Bill tracking page): watch targets
    (registry-derived auto-sync + 20 manual seeds), bill-text statute-ref
    matcher, B3 lifecycle (pending-bill → enacted-change-pending /
    auto-clear on death), fictional demo poll fixtures, LegiScan CC BY
    attribution.
  - T4 unified worklist: due-now vs upcoming (effective-date join),
    section-removed rules listed first; full card on Legal Rules, compact
    card on the Cases landing page (the de facto dashboard, per O3).
  - Statute browse UX (Michael feedback, 2026-07-25): code→chapter
    cascading picker from TOC fixtures (12 working-set codes), all-words
    keyword search over chapter titles + cached section headings, exact
    cite box retained.
- **Office notes flow** (verified end-to-end 2026-07-25 per log).
- **Benchmarks page:** Medicare PFS CSV import (local `..\data\pfs\`).

## Built but NOT yet live-exercised (deploy steps pending on Michael)

- **Supabase Edge Functions:** `statute-fetch` and `legiscan-poller` are
  written but NOT deployed (one CLI step each, `docs/statute-cache-setup.md`).
  The poller has never touched the live LegiScan API; first deploy should
  be invoked once manually and its JSON log read. `LEGISCAN_API_KEY` is
  already a Supabase secret.
- **Outlook push:** awaiting Michael's Entra app registration
  (`docs/outlook-setup.md`).

## Design docs staged, NOT built

- `time-tracker-fee-basis-profiles-design.md` (2026-07-25, DRAFT authored
  Code-side, needs design-space adoption; all nine registry entries
  unverified; nothing enters the build queue until Michael rules on §8/§7).
- Form engine, transcript T3/T4, OAA Tier 2 + remaining tabs, billing
  Phase 1b/2+, CourtListener integration, email intake — statuses per
  their own docs; none started beyond what's listed above.

## Current test/build health

177 vitest tests green; `npm run build` (tsc + vite) and oxlint clean, as
of the "As of" commit above.

## Standing cross-session facts a design session should know

- Registry discipline binding everywhere: flags advisory, only Michael
  verifies, computed outputs stamp registry versions.
- Demo store reseeds on version bumps (currently v9) — PFS CSV re-import
  needed after a reseed.
- Real client documents (OAA orders, bills) never enter the repo;
  fictionalized fixtures stand in.
- Design-side spec snapshots can LAG the project-knowledge originals
  (statute design doc currently does — see spec-feedback 2026-07-25);
  refreshes come from the design space, never reconstructed Code-side.
- Michael's prompts can lag the repo by a session — Code sessions
  reconcile against this doc + session log + git log before building.
