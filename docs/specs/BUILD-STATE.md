# BUILD STATE — brennan-case-manager
Commit: 8015e9c  |  Branch: master  |  Generated: 2026-07-27 (twenty-fourth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** The only code
change since 2026-07-24 is the 2026-07-26 Outlook sign-in fix (4 files, log #20), which
gave the Calendar tab a **working "Connect Outlook."** Day-by-day history:
`archive-project-history-by-day.md`. This file is live state only.

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
- **No client dimension, no case-to-case links** — no `case_clients`, no
  `case_links`, no self-reference on `cases`, no `client_id`/`posture`. Damages key
  on `case_id`. **`cases.statute_of_limitations` EXISTS and stays** — its retirement
  is ruled direction with NO migration authorized
- Health: **186 vitest tests green, build + oxlint clean, re-run 2026-07-26 after the Outlook code change**

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
- **CE1 (case-event core): unblocked by D3/H8 but NOT AUTHORIZED, and now behind TWO
  gates** — CL-2 must be built and walked first (D-CL2-9). If ever authorized it must
  be **CLIENT-AWARE from the start**, or the retrofit hits the substrate under both
  the heartbeat and the time tracker
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6).
  Registry: ALL entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md,
  BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority
  on what is built. Sync the NEW project after each push
- **Fable returns 2026-07-28 21:00 UTC (Tuesday AFTERNOON Central, not morning).**
  `weekly_scoped` measured 100% — exhausted; `weekly_all` 67%, so ~33% of the pool
  remains and **expires at the same reset**, usable on Opus/Sonnet until then
- **NEW, UNRULED: `model-routing-plan.md`** — routes work by model and effort;
  drafts the Q-5 clause without closing it. **Adopt nothing from it.** Three facts
  it records: **effort has NEVER been set in this project** (no `effort` key in any
  settings file — it introduces a dial nobody has used); a **QUEUE-RUNNER defect**
  (merging a packet's open items keeps each ID and label but loses its *question*,
  and the packet is then deleted — Q-5's substance is unrecoverable because of it);
  and **no routing decision touches the registry**, the largest unexercised body,
  since only Michael can verify
- **SUPA-1 CLOSED (#23): the live Supabase project is EMPTY — `db/schema.sql` has
  NEVER been executed there.** Michael checked the dashboard: project "Brennan
  Management System", free tier, schema public, **no tables**. Gate 3's future tense
  was accurate. **Consequence: the auth branch starts with three unexercised things
  stacked** — first schema execution, first sign-in, first real test of the 31 RLS
  policies against an authenticated user. *(Superseded detail: the FILE is complete —
  32 tables, RLS on all 32, 31 policies, `file_counters` deliberately policy-less.)*
- **CL-2 remains UNAUTHORIZED.** A **sealed dual-track run** is set for 2026-07-28:
  Fable rules the sequence and the authorization blind, reconsiders the ten closed
  D-CL2 rulings under unbounded latitude, then seals open and Michael reconciles.
  Protocol at `docs/prompts/CL2-dual-track-protocol_2026-07-27.md`. **A sequence
  ruling exists and is sealed outside the repo — do not state, infer, or search for
  its direction; it enters the log at reconciliation.** One-off, not precedent
- **D-CL2-2a CLOSED (#23):** earliest-limitations derives from **unresolved clients
  only**; "resolved" means **disbursement** (D-CL2-4a). **The CL-2 walkthrough must
  include a two-client case with one client settled** — the rule is invisible with a
  single client
- **THE RESUME POINT: Tuesday's sealed dual-track run** (above). Its inputs:
  `cl2-authorization-brief.md` (DECISION MEMO, authorizes nothing, carries a bias
  disclosure), the client-model design doc, and the protocol. **Four of the
  most-designed modules stand behind that one decision** — the medical rework, CE1,
  the heartbeat, the time tracker
- **Blocker chain, corrected (#18): auth decision → auth slice → THEN edge
  functions.** Not four parallel errands. Magic link is the PROPOSED default
  (AUTH-1); the auth slice is UNAUTHORIZED (AUTH-2). **Auth alone unlocks no real
  data — all of Go_Live_Gates.md still applies.** Entra is independent (ENTRA-1);
  the MRF path blocks nothing. **ENTRA-1 is now DONE** — Outlook push verified working
- **CLOSED — do not re-raise or carry these:** project instructions are **v4**
  (pasted; INSTR-3 closed, #19 — stop calling them v2); **BUILD-SESSION-NOTES.md**
  (#13 R-3); the **`claude/` cite class** (#15); the **FLP promo clock** (#5);
  **ENTRA-1** (done, #20). Each was previously copy-forwarded after closure
- **Two Outlook design items, both in spec-feedback, neither built:** event notes are
  a single-line `<input>` and need multi-line + structure; and **deleting an event in
  Outlook is never observed** (no read path), so the next push 404s and
  **deliberately re-creates it** — stale belief, then silent resurrection. The latter
  is coherent for a one-way design; do NOT fix in isolation — it is Phase 2 evidence
- Client-model §10: **ten decisions closed**; still open — **D-CL2-3** (fee
  arrangement per client; was dropped from the design side's running list and
  restored), D-CL2-2a, D-CL1-1..3 (**D-CL1-3 gated on PR-3 ALONE** — probate is
  CL-1's only consumer), the four new proposals **UM-1, UM-2, PR-GATE-1, MIN-1**, and
  **CIV-1 (civil-litigation damages entirely UNSPECIFIED — own design session),
  PROB-1, PA-1**
- **HALF-ANSWERED, needs a yes/no: O5** (`direction`/`conditionalDowngrade`)
- OPEN, Michael's: PR-3; V16; V14a; V15 survival half (V10 citator pass RUNNABLE);
  V4; V10–V13; Entry 1(c-3); RE-1; Q-5; Q-6; M-3; M-4; K-5–K-7; registry 1–10
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the Estates Code
  territory probate needs. **Family Code block is MOOT**; the probate chapters are
  the replacement O6 stress test
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED:
  session-1 heartbeat voice capture (never reached Code)
- Supabase Pro upgrade (gate 1), security review (gate 2), RLS policies (gate 3),
  no canonical law-change ledger (FOUR homeless families), Outlook slice unreviewed
  — all carried
