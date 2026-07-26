# BUILD STATE — brennan-case-manager
Commit: 59808ed  |  Branch: master  |  Generated: 2026-07-26 (eighth refresh this date; app unchanged all day)

## Screens live (what Michael can click)
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges
  created as child records
- /cases/:id — case detail; tabs are URL-driven routes
  (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging inbox: manual upload/import, routing engine
  suggestions with confidence, confirm-to-file (auto-file OFF per design D1)
- /notes — office notes; per-transcript detail view with participants/tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files live in ..\data\pfs\,
  outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log,
  watch flags, full statute-worklist card
- /statutes — cite box + browse picker + keyword search; chapter viewer
  with deep links, Mark-verified pins, refresh-and-diff (A4 tripwire)
- /bills — bill tracking: watch targets, tracked bills with B3 lifecycle,
  statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice |
| Parties | LIVE | link/unlink with role registry; bulk party fetch |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## 2026-07-26 session deltas (seven Code sessions, ALL DOCS ONLY)
- Session-7 (queue-runner batch, 59808ed): first QUEUE-RUNNER run, one
  packet (queue-mechanism bootstrap) — executed cleanly end to end. NEW
  docs/prompts/QUEUE-RUNNER.md (PROPOSED convention, unruled); inbox/
  created + gitignored at repo root (transient packet freight, never
  committed); CLAUDE.md inbox convention line. Same prompt installed as
  a slash command at .claude/commands/queue-runner.md (untracked;
  Michael's call). FLP promo clock also CLOSED per Michael this session
  block (entry #5) — not actionable, no longer carried
- Session-6 (post-migration, dc167f9): log entry #4 (migration COMPLETE);
  CLAUDE.md sync scope revised to selective; both carried-file
  repo-duplication checks CLOSED (NVIDIA memo + LegiScan fixture NOT in
  repo — knowledge carries warranted)
- Session-5 (pre-migration packet, 7f3dbf5): Go_Live_Gates.md COMPLETE
  (gates 1–5 folded in, redacted; gate-3 amendment; account/API facts);
  statute design doc forward-merged per spec-feedback preserving repo
  deltas — repo version CURRENT, PK copy historical; CLAUDE.md pointer
- Session-4: case-authority-index.md REPLACED with locator-only manifest
  (registry governs); A-3 WITHDRAWN, A-6/A-7 added; Ortiz PDF gap
- Session-3: NEW project-knowledge-working-set-policy.md + pointer;
  verified both v0_1-feedback items already built
- Session-2: NEW prop-code-53-28-deadline-engine-design.md ⛔ BUILD-GATED
  (Servpro meeting); §53.156 corrected to 2011; O1 CLOSED
- Session-1: registry Entry 2 v2; Entries 4/5/10 folded; Tanner draft
  UNADOPTED (V6); Rohrmoos corrected; NEW attorney-review-queue.md.
  NO registry entry status changed in any session

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only
  to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9;
  version-bump reseeds migrate imported schedules + confirmed runs and
  back up the whole old store (no more silent wipes)
- Schema tables live (db/schema.sql, 32): file_counters, cases, parties,
  case_parties, medical_bills, bill_line_items, code_mappings, eob_records,
  provider_billing_profiles, analysis_runs, analysis_result_lines,
  review_log, legal_rules, fee_schedules, fee_schedule_rates,
  generated_documents, calendar_events, transcripts,
  transcript_participants, staging_items, routing_decisions,
  glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters,
  statute_sections, registry_verification_snapshots, watch_flags,
  watch_targets, tracked_bills, bill_statute_refs (no schema changes)
- Health: 186 vitest tests green; npm run build (tsc + vite) and oxlint
  clean as of 88ff3e7 (every commit since is docs-only)

## Known stubs & fakes
- legiscan-poller + statute-fetch edge functions written, NOT deployed —
  no live legislative/statute fetches have ever run
- Calendar "Connect Outlook" dead until Michael's Entra registration
  (VITE_MSAL_* unset); nothing has ever reached Outlook
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document
  storage anywhere — EOB/report "links" are text descriptions
- OAA intake parses digital Uvalde-layout orders only; scans → manual
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built — classification edits show a "re-evaluate
  playbooks" notice; nothing recomputes automatically yet
- Attorney-created code mappings and generated documents do NOT survive a
  store reseed (open question for design)
- Time tracker: design draft only — NOTHING in the app; awaits design-side
  adoption. Servpro deadline engine: DESIGN ONLY, gated on the meeting
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled) —
  NOTHING exists in the app; captures e and f NOT folded (§8.12 carries
  the fold-queue notice); register runs H1–H83; H50 OPEN; TRCP skeleton
  and ALL course-book propositions UNVERIFIED; deficiency parked (H35)
- Registry: ALL entries remain UNVERIFIED. Entries 2/4/5/10 + fee-basis
  items 5/6 substantially advanced 2026-07-26 (primary text read) but
  wording sign-off pending; Tanner draft UNADOPTED (V6); V1–V13 open

## For design side
- SYNC (revised 2026-07-26): selective — docs/, db/, supabase/,
  CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; src/ EXCLUDED. This doc
  is the SOLE design-side authority on what is built. Sync the NEW
  project after each push (old project = archive)
- QUEUE (PROPOSED, unruled): Q-1 adopt inbox+QUEUE-RUNNER as standing
  convention? (blocks trigger #3 instructions revision); Q-2 confirm
  docs/prompts/ as canonical prompt home; Q-3 re-check the sync picker —
  docs/prompts/ is a NEW directory the selective sync may not auto-add
- PRUNING: K-1 executed/moot; K-2 open; K-3 CLOSED; K-5 Uvalde scope;
  K-6 re-pull N. Cypress 559 S.W.3d 128; K-7 Ortiz PDF
- attorney-review-queue.md is the one project-wide review queue; statutes
  resume point Est. Code §352.051, then the Family Code block
- M-4: LegiScan key rotation after T3 (key seen in transcripts);
  M-3: Medchron fictional-content check
- EXPORT NEEDED: session-1 heartbeat voice capture (never reached Code)
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8
- D3/H8 still blocks T1 for heartbeat AND time tracker; Entry 1(c-3) +
  V4 still gate billing LOP math and the disbursement checklist
- Registry sign-offs, Supabase auth (gate 6), edge-function deploys,
  Entra registration, Citizens MRF path, reseed-survival question,
  no canonical law-change ledger, Outlook slice + BUILD-SESSION-NOTES
  2026-07-21 audit unreviewed — all carried
