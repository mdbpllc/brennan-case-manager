# BUILD STATE — brennan-case-manager
Commit: 369f778  |  Branch: master  |  Generated: 2026-07-26 (ninth refresh this date; app unchanged all day)

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

## 2026-07-26 session deltas (eight Code sessions, ALL DOCS ONLY)
- Session-8 (queue-runner batch 2, 369f778): Q-1/Q-2 rulings landed —
  inbox+QUEUE-RUNNER is a STANDING CONVENTION (status lines flipped in
  docs/prompts/QUEUE-RUNNER.md, CLAUDE.md, both slash-command copies);
  docs/prompts/ ruled the canonical cross-interface prompt home. NEW
  binding MAJORITY-OPINION RULE filed: CLAUDE.md registry discipline
  rule 5 + courtlistener design doc §0.1 (cluster id ≠ majority; the
  live Haygood near-miss returned the DISSENT). CourtListener doc
  corrected in place: free-tier rates 5/min-50/hr-125/day rolling
  (hourly binds), measured Layer-B budget model, parallel-cite caveat
  [RE-CHECK], §4 FLP-terms gate — app integration UNAUTHORIZED pending
  Q-6. Q-7 resolved (slash-command file was in the repo subfolder;
  Code sessions launch from the parent; fixed by copying up). v3
  project instructions approved design-side (settings text, not repo)
- Session-7 (queue-runner batch 1, 59808ed): first QUEUE-RUNNER run —
  NEW docs/prompts/QUEUE-RUNNER.md; inbox/ + .gitignore + CLAUDE.md
  line. FLP promo clock CLOSED per Michael (entry #5, not carried)
- Session-6 (dc167f9): migration COMPLETE (entry #4); CLAUDE.md sync
  scope revised to selective; NVIDIA memo + LegiScan fixture confirmed
  NOT in repo (knowledge carries warranted)
- Session-5 (7f3dbf5): Go_Live_Gates.md COMPLETE (gates 1–5 folded in,
  redacted); statute design doc forward-merged per spec-feedback,
  repo version CURRENT
- Session-4: case-authority-index.md → locator-only manifest; A-3
  withdrawn, A-6/A-7 added
- Session-3: NEW project-knowledge-working-set-policy.md; v0_1-feedback
  items verified built
- Session-2: NEW prop-code-53-28 deadline-engine design ⛔ BUILD-GATED;
  §53.156 corrected to 2011
- Session-1: registry Entry 2 v2; Entries 4/5/10 folded; Tanner draft
  UNADOPTED; NEW attorney-review-queue.md. NO registry entry status
  changed in any session

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
- Playbook engine NOT built; classification edits show a notice only
- Attorney-created code mappings and generated documents do NOT survive a
  store reseed (open question for design)
- Time tracker: design draft only; Servpro deadline engine: DESIGN ONLY,
  gated on the meeting — NOTHING in the app for either
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled) —
  NOTHING in the app; captures e and f NOT folded; register runs H1–H83;
  H50 OPEN; TRCP skeleton + ALL course-book propositions UNVERIFIED
- CourtListener: design doc only — NOTHING in the app; app integration
  UNAUTHORIZED (FLP terms gate Q-6 + unruled §6 sequencing)
- Registry: ALL entries remain UNVERIFIED. Entries 2/4/5/10 + fee-basis
  items 5/6 substantially advanced 2026-07-26 but wording sign-off
  pending; Tanner draft UNADOPTED (V6); V1–V13 open

## For design side
- SYNC (revised 2026-07-26): selective — docs/, db/, supabase/,
  CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; src/ EXCLUDED. This doc
  is the SOLE design-side authority on what is built. Sync the NEW
  project after each push (old project = archive)
- QUEUE: STANDING convention (Q-1/Q-2 ruled 2026-07-26). Still open:
  Q-3 verify docs/prompts/QUEUE-RUNNER.md visible in a FRESH design
  chat; Q-4 sync picker includes docs/prompts/?; Q-5 model-usage
  clarifying clause unruled; Q-6 FLP internal-tooling terms (research
  OK now, app integration blocked); Q-7 RESOLVED
- MAJORITY-OPINION RULE is binding for all opinion retrieval —
  CLAUDE.md registry rule 5 / courtlistener doc §0.1
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
