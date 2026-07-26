# BUILD STATE — brennan-case-manager
Commit: dc167f9  |  Branch: master  |  Generated: 2026-07-26 (sixth refresh this date)

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

## 2026-07-26 session deltas (six Code sessions, ALL DOCS ONLY — zero app change)
- Session-6 (post-migration, dc167f9): design log entry #4 appended
  (migration COMPLETE; new build project live at BUILD-STATE 7f3dbf5).
  CLAUDE.md sync scope REVISED to the selective new-project sync (see
  For design side). Both carried-file repo-duplication checks RUN and
  CLOSED: NVIDIA memo NOT in repo (design doc cites it externally),
  LegiScan getSessionList fixture NOT in repo — both knowledge carries
  warranted
- Session-5 (pre-migration packet, 7f3dbf5): Go_Live_Gates.md COMPLETE —
  gates 1–5 imported verbatim into docs/specs/Go_Live_Gates.md (fold-in;
  no second file), gate-3 sign-in amendment applied, account/API facts
  landed, LegiScan key value REDACTED (full copy in the archive project;
  rotation after T3 firm). Statute design doc forward-merged from the PK
  copy per spec-feedback (O1–O4 in-text, W1 banked, A2 redirect note +
  SPA cross-ref, B4 hard requirements), preserving repo deltas (A4
  section-removed, normalized hashes, canonical path) — repo version
  CURRENT, PK copy historical. CLAUDE.md gates pointer
- Session-4: case-authority-index.md REPLACED with locator-only manifest
  (no holdings; registry governs); A-3 WITHDRAWN (Huntress belongs), A-6
  (McMillan dropped from Entry 1), A-7 (Primoris posture); Ortiz PDF gap
- Session-3: NEW project-knowledge-working-set-policy.md + CLAUDE.md
  pointer; verified both v0_1-feedback items already built
- Session-2: NEW prop-code-53-28-deadline-engine-design.md, ⛔ BUILD-GATED
  on the Servpro meeting; §53.156 may→shall corrected to 2011 (S.B. 539);
  fee-basis enum gains mandatory-equitable; O1 CLOSED; review queue
  resume Est. Code §352.051
- Session-1: registry Entry 2 REPLACED (v2, post-Ortiz); Entries 4/5/10
  folded; Tanner draft UNADOPTED (V6); Rohrmoos four proof elements
  corrected; NEW attorney-review-queue.md. NO entry status changed in
  any session

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
  is the SOLE design-side authority on what is built. Old project =
  archive; sync the NEW project after each push
- PRUNING: K-1 executed/moot; K-2 open; K-3 CLOSED (archive designation);
  K-5 Uvalde scope; K-6 re-pull N. Cypress 559 S.W.3d 128; K-7 Ortiz PDF
- attorney-review-queue.md is the one project-wide review queue; statutes
  resume point Est. Code §352.051, then the Family Code block
- FLP/CourtListener promo ends 2026-08-06 (ELEVEN days; carried 10+
  entries). M-4: LegiScan key rotation after T3 (key seen in transcripts)
- EXPORT NEEDED: session-1 heartbeat voice capture (never reached Code)
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8
- D3/H8 still blocks T1 for heartbeat AND time tracker; Entry 1(c-3) +
  V4 still gate billing LOP math and the disbursement checklist
- Registry sign-offs, Supabase auth (gate 6), edge-function deploys,
  Entra registration, Citizens MRF path, reseed-survival question,
  no canonical law-change ledger, Outlook slice + BUILD-SESSION-NOTES
  2026-07-21 audit unreviewed — all carried
