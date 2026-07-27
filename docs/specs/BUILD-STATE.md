# BUILD STATE — brennan-case-manager
Commit: bef4570  |  Branch: master  |  Generated: 2026-07-26 (fifteenth refresh; APP UNCHANGED ALL DAY — every commit today is docs-only)

## Screens live (what Michael can click)
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges created as child records
- /cases/:id — case detail; tabs are URL-driven routes (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging inbox: manual upload/import, routing-engine suggestions with confidence, confirm-to-file (auto-file OFF per design D1)
- /notes — office notes; per-transcript detail view with participants/tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files in ..\data\pfs\, outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, full statute-worklist card
- /statutes — cite box + browse picker + keyword search; chapter viewer with deep links, Mark-verified pins, refresh-and-diff (A4 tripwire)
- /bills — bill tracking: watch targets, tracked bills with B3 lifecycle, statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice |
| Parties | LIVE | link/unlink with role registry; bulk party fetch |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Practice areas
**PI / civil litigation / criminal defense / probate** — four, Michael's wording
2026-07-26. `caseTypes.ts` carries Personal Injury, General Civil Litigation,
Criminal; **probate has no practice area of its own** (see stubs). Family law
REMOVED as a practice line the same day (doc-only; none ever existed in source).

## 2026-07-26 — eleven Code sessions, ZERO app change
Every commit today is documentation.
- **Est. Code ch. 352 + CPRC ch. 71 read in full** → NEW
  `statutes-pass-est352-cprc71-2026-07-26.md`. **Fee-basis enum DECOMPOSED**
  into a record (O6). Probate row **reclassified**. §352.052 added. Probate
  export is **three** lanes (V14). NEW primitive **P7** (calendar-months from
  a DATE — must not share code with P1). §71.005 guardrail; L10 confirmed
- **S-1 / PR-1 / PR-2 CLOSED — probate is a mapped practice line**, spine =
  independent, uncontested administration, full build-out wanted
- **D3/H8 CLOSED — case-event core (CE), shape (c):** shared spine +
  per-consumer facets, four consumers, operational/evidentiary boundary
- **N-1 rename:** transcript T1–T4 UNCHANGED; substrate **CE1**; heartbeat
  **HB1–HB4**; time tracker **TT1–TT2**
- **Record reconciliation (#13):** three carried-file checks re-verified;
  BUILD-SESSION-NOTES carry closed as a copy-forward error
- **V17 CLOSED / CL-2 ruled IN (#15):** probate is its own practice area with
  its own ladder — "companion" goes away. **The case owns the occurrence and
  liability; the claimant owns the damages.** Conflicts check is ADVISORY.
  NEW `claimant-dimension-and-case-links-design.md` (DRAFT). `claude/` cite
  class fixed across 8 docs
- Earlier: Go_Live_Gates completed (redacted); statute doc forward-merged;
  migration + selective sync; QUEUE-RUNNER adopted; majority-opinion rule

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9; reseeds migrate imported schedules + confirmed runs, back up the old store
- Schema tables live (db/schema.sql, 32 — no changes): file_counters, cases, parties, case_parties, medical_bills, bill_line_items, code_mappings, eob_records, provider_billing_profiles, analysis_runs, analysis_result_lines, review_log, legal_rules, fee_schedules, fee_schedule_rates, generated_documents, calendar_events, transcripts, transcript_participants, staging_items, routing_decisions, glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters, statute_sections, registry_verification_snapshots, watch_flags, watch_targets, tracked_bills, bill_statute_refs
- **No case-event / CE table exists.** No time_entries, no claims table
- **No claimant dimension and no case-to-case links exist** — verified
  2026-07-26: no `case_claimants`, no `case_links`, no self-reference on
  `cases`, no `claimant_id` anywhere. Damages key on `case_id`. CL-2 is a
  ruled DIRECTION with an unsigned decision list, not a build authorization
- Health: 186 vitest tests green; npm run build (tsc + vite) and oxlint clean as of 88ff3e7 (every commit since is docs-only)

## Known stubs & fakes
- legiscan-poller + statute-fetch edge functions written, NOT deployed — no
  live legislative/statute fetches have ever run
- Calendar "Connect Outlook" dead until Michael's Entra registration
  (VITE_MSAL_* unset); nothing has ever reached Outlook
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage
  anywhere — EOB/report "links" are text descriptions
- OAA intake parses digital Uvalde-layout orders only; scans → manual
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built — classification edits show a notice only
- Code mappings and generated documents do NOT survive a reseed (open)
- **PROBATE: the only furniture is a `Probate companion` case type parented
  under Personal Injury with a knowingly wrong ladder (`_piDefault`) —
  MIS-PARENTED per S-1/V17. Re-parenting gated on PR-3; do not touch the
  case-type tree or ladder. No probate practice area, no estate/decedent
  tables, no probate roles, no probate design doc**
- Time tracker: design draft only — NOTHING in the app. Servpro deadline
  engine: DESIGN ONLY, gated on the meeting. Case heartbeat: design docs only
  — NOTHING in the app; captures e and f NOT folded; register H1–H83
- **CE1 (case-event core) is unblocked by D3/H8 but NOT AUTHORIZED. SEQUENCING
  WARNING (#15): if ever authorized it must be CLAIMANT-AWARE from the start**
  — built case-only with CL-2 after, the retrofit hits the shared substrate
  under both the heartbeat and the time tracker, not one module
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + §6)
- Registry: ALL entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md,
  BUILD-SESSION-NOTES.md; src/ EXCLUDED. This doc is the SOLE authority on
  what is built. Sync the NEW project after each push
- **Project instructions: LIVE VERSION IS STILL v2.** A **v4 draft awaits
  Michael's paste** (log #14) — fixes the v2 residual and covers INSTR-3
  (Q-1, Q-2) plus a delivery-destination convention; Code fact-checked every
  repo-facing claim in it and all verify clean. **INSTR-3 stays OPEN until he
  pastes v4 and says so.** Do not re-draft v3
- **BUILD-SESSION-NOTES.md is CLOSED and NOT carried** (log #13 R-3) — the
  2026-07-25 triage clearing stands; ~12 later carries were copy-forward
- **HALF-ANSWERED, needs a yes/no: O5** (`direction`/`conditionalDowngrade`
  substance — folded into O6's shape without ever being ruled)
- **NEW and largest open block: the §10 decision list in
  `claimant-dimension-and-case-links-design.md` — TWELVE decisions**
  (D-CL2-1..9, D-CL1-1..3) gating any claimant/case-link build. **D-CL2-4
  (shared-expense allocation across claimants) has the most direct
  net-to-client consequence**
- OPEN, Michael's: PR-3 (re-parent the probate case type — **direction now
  set by V17, execution still unauthorized**); V16; V14a; V15 survival half
  (V10 citator pass RUNNABLE — FLP done, connector live); V4; V10–V13;
  Entry 1(c-3); RE-1; INSTR-3 (paste v4); Q-5; Q-6; M-3; M-4; K-5–K-7;
  registry 1–10. **V17 is CLOSED — ruled (a), clean separation**
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the Estates
  Code territory the probate line needs. **The Family Code block is MOOT**;
  the probate chapters are the replacement O6 stress test
- `claude/` cite class FIXED (#15) — 8 docs. Two classes, not one: most hits
  pointed at files that DO live in `docs/specs/` and were repointed; only the
  LegiScan fixture and NVIDIA memo are project-knowledge-only and now say so
  without inventing a path. **Still no `claude/` directory in the repo**
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT
  NEEDED: session-1 heartbeat voice capture (never reached Code)
- Supabase auth (gate 6), edge-function deploys, Entra registration, Citizens
  MRF path, reseed survival, no canonical law-change ledger (FOUR homeless
  families), Outlook slice unreviewed — all carried
