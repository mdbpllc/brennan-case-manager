# BUILD STATE — brennan-case-manager
Commit: b73dc74  |  Branch: master  |  Generated: 2026-07-28 (twenty-sixth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** The only code
change since 2026-07-24 is the 2026-07-26 Outlook sign-in fix (4 files, log #20), which
gave the Calendar tab a **working "Connect Outlook."** **The 2026-07-28 queue batch
changed NO source files** — docs only. Day-by-day history:
`archive-project-history-by-day.md`. This file is live state only.

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed,
  withdrawn, and deliberately-not-built items live there. Check it before proposing or
  rebuilding anything that appears absent from the repo. **Never drop this pointer line**

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
| Calendar | LIVE + Outlook push WORKING | event CRUD works; push to the "MDBP Cases" calendar verified 2026-07-26 (creation only — edit/cancel unverified) |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9; reseeds migrate imported schedules + confirmed runs, back up the old store
- Schema tables live (db/schema.sql, 32): file_counters, cases, parties, case_parties, medical_bills, bill_line_items, code_mappings, eob_records, provider_billing_profiles, analysis_runs, analysis_result_lines, review_log, legal_rules, fee_schedules, fee_schedule_rates, generated_documents, calendar_events, transcripts, transcript_participants, staging_items, routing_decisions, glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters, statute_sections, registry_verification_snapshots, watch_flags, watch_targets, tracked_bills, bill_statute_refs
- **No case-event/CE table, no time_entries, no claims table**
- **No client dimension yet** — no `case_clients`, no `case_links`, no
  `client_id`/`posture`. Damages key on `case_id`. `cases.statute_of_limitations`
  EXISTS. **All three are now AUTHORIZED to change by the CL-2 slice (#27) — but
  the slice has NOT run.** Nothing here has moved
- Health: **186 vitest tests green, build + oxlint clean, re-run 2026-07-26 after the Outlook code change** (not re-run 07-28 — no code delta)

## Known stubs & fakes
- **NO REAL DATA HAS EVER ENTERED THE APP.** Supabase mode is unusable — anon key +
  authenticated-only RLS, and there is no sign-in flow
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Both are
  **auth-blocked**, for the same root reason one step apart: the poller writes to
  tables nothing can read; statute-fetch's own call would pass on the anon key but
  its cache WRITE hits the same RLS. Deploying either before auth accomplishes
  nothing (log #18, Q-CODE-1)
- **/statutes in demo mode never touches Supabase** — it serves committed fixture
  chapters and reports "not in the demo set" for anything else
- **Outlook push WORKS as of 2026-07-26 — the first push ever reached Outlook.** Entra
  registered, `.env` set, and a demo event landed on the dedicated "MDBP Cases" calendar
  with title, time, and location intact. Two blocking defects were fixed to get there
  (redirect URI hit the router; the slice was written against an MSAL popup contract v5
  no longer honors — see log #20 / spec-feedback). **ONLY event CREATION is exercised —
  edit- and cancel-propagation are still unverified.** Binding: **fictional demo events
  only** until Go_Live_Gates clears
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only. OAA intake parses
  digital Uvalde-layout orders only; scans → manual
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage
  anywhere — EOB/report "links" are text descriptions
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built; code mappings and generated documents do NOT survive a
  reseed (open for design)
- **PROBATE: the only furniture is a `Probate companion` case type parented under
  Personal Injury with a knowingly wrong ladder (`_piDefault`) — MIS-PARENTED.
  Re-parenting gated on PR-3; do not touch the case-type tree or ladder.** No probate
  practice area, no estate/decedent tables, no probate roles, no probate design doc
- Time tracker: design draft only — NOTHING in the app. Servpro deadline engine:
  DESIGN ONLY, gated on the meeting. Case heartbeat: design docs only — NOTHING in
  the app; captures e+f NOT folded; register H1–H83
- **CE1 (case-event core): still NOT AUTHORIZED and behind CL-2** (D-CL2-9, reaffirmed
  by Fable #26). It must be **CLIENT-AWARE from the start**, or the retrofit hits the
  substrate under both the heartbeat and the time tracker
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6).
  Registry: ALL entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md,
  BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority
  on what is built. Sync the project after each push
- **THE SEQUENCE IS RULED AND UNSEALED: AUTH FIRST, CL-2 SECOND** (Michael, sealed
  07-27, confirmed at reconciliation 07-28, #27). Both seals expired; the dual-track
  protocol is EXPIRED and is spent history. Fable and Opus had both held CL-2-first;
  the attorney ruled otherwise and Fable conceded on the merits — the two run
  BACK-TO-BACK, which collapses the time-asymmetry argument
- **CL-2 IS AUTHORIZED (#27), QUEUED BEHIND THE AUTH SLICE — neither has been built.**
  Scope: `cl2-authorization-brief.md` §1's six pieces exactly, three carve-outs as
  DO-NOTs. Reconciliation deltas: **the limitations column DROPS, not dormant** (a
  retained-but-unwritten column answers queries plausibly and wrongly); because auth
  runs first this piece now includes a **live-DB ALTER/DROP migration** under the
  backup-and-review-log pattern; the brief's two §4 questions run as **stated
  defaults** (backfill never touches `case_parties`; the criminal case's nearly-empty
  client record is created) — defaults, not attorney rulings; keep `posture`'s
  constraint admissive of a future mixed-posture value
- **THE RESUME POINT: the auth slice — BLOCKED ON ONE ANSWER.** **AUTH-1, the sign-in
  METHOD, is PROPOSED (magic link) and NOT confirmed. Code must not start §5A without
  Michael's word.** Slice scope: first-ever execution of `db/schema.sql` against the
  live project, sign-in, first real test of the 31 RLS policies against an
  authenticated user. Single-user, Michael only (multi-user is instructions trigger
  #2, gated on the security review). **Accepted cost, named so it isn't
  rediscovered:** some RLS work may need revisiting after CL-2 restructures the
  schema — rework, not loss. **Auth alone unlocks no real data** — all of
  Go_Live_Gates.md still applies
- **The CL-2 walkthrough is specified: the brief's §5 checklist PLUS a two-client case
  with one client settled**, settled meaning DISBURSED (D-CL2-2a / D-CL2-4a) — the
  derivation rule is invisible with a single client. Michael re-walks the medical tab
  afterward on the v0.1/Phase 1a model; not a glance
- **SUPA-1 CLOSED (#23): the live Supabase project is EMPTY — `db/schema.sql` has
  NEVER been executed there.** The FILE is complete: 32 tables, RLS on all 32, 31
  policies, `file_counters` deliberately policy-less
- **BS-1's split under-delivered — the length question is LIVE (BS-1a, Michael's).**
  BUILD-STATE had no ledger *section*, only a five-line bullet; moving it verbatim
  bought ONE line (149 → 148). Cap stands at 150. Candidates for the ledger are listed
  in the ledger file, not moved — designating them is Michael's call
- **NEW, UNRULED: `model-routing-plan.md`** — **adopt nothing from it.** Records that
  **effort has NEVER been set in this project**, and a **QUEUE-RUNNER defect** (merged
  open items keep ID and label but lose the *question*; Q-5's substance was lost that
  way). The 07-28 runner entry worked around it by carrying full question text
- Client-model §10: **D-CL2-8 is now Michael's own ruling** (parallel, not promotion).
  **CL2-CHECK-1** (advisory client-role ↔ client-record consistency check) is
  **EXPLICITLY DEFERRED — do not build.** Still open: **D-CL2-3** (NOT closed by CL-2's
  `fee_arrangement` field), D-CL1-1..3 (**D-CL1-3 gated on PR-3 ALONE**), **UM-1, UM-2,
  PR-GATE-1, MIN-1**, and **CIV-1 (civil-litigation damages entirely UNSPECIFIED — own
  design session), PROB-1, PA-1**
- **HALF-ANSWERED, needs a yes/no: O5** (`direction`/`conditionalDowngrade`)
- OPEN, Michael's: **AUTH-1 (blocking)**; BS-1a; PR-3; V16; V14a; V15 survival half
  (V10 citator pass RUNNABLE); V4; V10–V13; Entry 1(c-3); RE-1; Q-6; M-3; M-4; K-5–K-7;
  registry 1–10
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the Estates Code
  territory probate needs. The probate chapters are the O6 stress test
- **Two Outlook design items, both in spec-feedback, neither built:** event notes are a
  single-line `<input>` needing multi-line + structure; and **deleting an event in
  Outlook is never observed**, so the next push 404s and **deliberately re-creates it**
  — stale belief, then silent resurrection. Do NOT fix in isolation — Phase 2 evidence
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED:
  session-1 heartbeat voice capture (never reached Code)
- Supabase Pro upgrade (gate 1), security review (gate 2), RLS policies (gate 3),
  no canonical law-change ledger (FOUR homeless families), Outlook slice unreviewed
  — all carried
