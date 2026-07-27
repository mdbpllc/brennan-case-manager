# BUILD STATE — brennan-case-manager
Commit: 6887eb4  |  Branch: master  |  Generated: 2026-07-26 (tenth refresh this date; APP UNCHANGED ALL DAY — every commit today is docs-only)

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

## 2026-07-26 — nine Code sessions, ZERO app change
Every commit today is documentation. Latest (87e1f44) applied a two-packet
QUEUE-RUNNER batch:
- **Est. Code ch. 352 + CPRC ch. 71 read in full** → NEW
  `statutes-pass-est352-cprc71-2026-07-26.md`. **Fee-basis enum DECOMPOSED**
  into a record (O6; nothing built on it, so no migration). Probate row
  **reclassified** — was `discretionary-equitable`, wrong on both halves.
  §352.052 added (was missing). Probate export is **three** lanes (V14).
  NEW primitive **P7** (calendar-months from a DATE — must not share code
  with P1). §71.005 WD guardrail; L10 confirmed against official text
- **S-1 / PR-1 / PR-2 CLOSED — probate is a mapped practice line**, spine =
  independent, uncontested administration, full build-out wanted
- **D3/H8 CLOSED — case-event core (CE), shape (c):** shared spine +
  per-consumer facets, four consumers, operational/evidentiary boundary.
  **CE1 is UNBLOCKED but NOT AUTHORIZED**
- **N-1 rename:** transcript T1–T4 UNCHANGED; substrate is **CE1**;
  heartbeat **HB1–HB4**; time tracker **TT1–TT2**
- **Family law REMOVED as a practice line** (doc-only — Code verified no
  family furniture in source). Family *considerations* survive as
  cross-cutting flags in probate/PI. TDRPC 1.04 stays in the queue
- Earlier today: Go_Live_Gates completed (redacted); statute design doc
  forward-merged; migration to the new build project + selective sync;
  QUEUE-RUNNER adopted; majority-opinion rule filed; FLP clock closed

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only
  to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9;
  reseeds migrate imported schedules + confirmed runs, back up the old store
- Schema tables live (db/schema.sql, 32 — no changes): file_counters, cases, parties, case_parties, medical_bills, bill_line_items, code_mappings, eob_records, provider_billing_profiles, analysis_runs, analysis_result_lines, review_log, legal_rules, fee_schedules, fee_schedule_rates, generated_documents, calendar_events, transcripts, transcript_participants, staging_items, routing_decisions, glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters, statute_sections, registry_verification_snapshots, watch_flags, watch_targets, tracked_bills, bill_statute_refs
- **No case-event / CE table exists.** No time_entries, no claims table
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
- Playbook engine NOT built — classification edits show a notice only
- Attorney-created code mappings and generated documents do NOT survive a
  reseed (open question for design)
- **PROBATE: only furniture is a `Probate companion` case type parented
  under Personal Injury with a knowingly wrong ladder (`_piDefault`, see the
  comment in caseTypes.ts) — MIS-PARENTED per S-1, which makes probate a
  line in its own right. Re-parenting is gated on PR-3 (new, Michael's); do
  not touch the case-type tree or ladder. No probate practice area, no
  estate/decedent tables, no probate roles, no probate design doc**
- Time tracker: design draft only — NOTHING in the app. Servpro deadline
  engine: DESIGN ONLY, gated on the meeting. Case heartbeat: design docs
  only — NOTHING in the app; captures e and f still NOT folded; register
  runs H1–H83; TRCP skeleton and ALL course-book propositions UNVERIFIED
- **CE1 (case-event core) is unblocked by the D3/H8 ruling but NOT
  authorized — no build authorization exists for it or anything on it**
- CourtListener: design doc only — app integration UNAUTHORIZED (FLP terms
  gate Q-6 + unruled §6 sequencing)
- Registry: ALL entries remain UNVERIFIED; entries 1–10 sign-off is
  Michael's homework, deliberately not attempted at the end of a long
  session

## For design side
- SYNC (2026-07-26): selective — docs/, db/, supabase/, CLAUDE.md,
  README.md, BUILD-SESSION-NOTES.md; src/ EXCLUDED. This doc is the SOLE
  authority on what is built. Sync the NEW project after each push.
  **Q-3/Q-4 STRUCK** — docs/prompts/ is indexed and inside the selection
- **HALF-ANSWERED, needs a yes/no: O5** (`direction` /
  `conditionalDowngrade` substance — folded into O6's shape without ever
  being ruled; a smooth write-up makes it look settled)
- OPEN, Michael's: V14a (vehicle for a §352.051(2) fee request); V15
  survival half (V10 citator pass now RUNNABLE — FLP done, connector live);
  V16 narrowed; V17 (decides whether probate touches PI); V4; V11–V13;
  Entry 1(c-3); **PR-3 (new — re-parent the mis-filed probate case type?)**;
  RE-1 (referral engine, new); Q-5; Q-6; M-3; M-4; K-5–K-7; registry 1–10
- **claude.ai project instructions v2 are wrong in BOTH directions** —
  they say "PI, criminal defense, family"; the truth is PI, criminal
  defense, **probate**. Plus a stale carried-file line closed in log #4.
  Michael's paste; neither Claude nor Code can edit them
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the
  Estates Code territory the probate line needs. **The Family Code block is
  MOOT**; the probate chapters are the replacement O6 stress test
- KNOWN STALE, left deliberately: prop-code-53-28-deadline-engine-design.md
  still says "D3/H8 still gates T1" — packet 1's DO-NOT barred touching that
  doc beyond adding P7. Fix in a future packet
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT
  NEEDED: session-1 heartbeat voice capture (never reached Code)
- Supabase auth (gate 6), edge-function deploys, Entra registration,
  Citizens MRF path, reseed survival, no canonical law-change ledger (now
  FOUR homeless families), Outlook slice + BUILD-SESSION-NOTES audit
  unreviewed — all carried
