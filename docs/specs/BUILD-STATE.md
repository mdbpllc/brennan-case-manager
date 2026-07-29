# BUILD STATE — brennan-case-manager
Commit: 3b099c3  |  Branch: master  |  Generated: 2026-07-28 (twenty-seventh refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **2026-07-28: the AUTH
SLICE (§5A) IS BUILT AND EXERCISED — Michael signed in and wrote to the live database**;
Supabase mode went from unusable to working. History: `archive-project-history-by-day.md`.

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed,
  withdrawn, and deliberately-not-built items live there. Check it before proposing or
  rebuilding anything that appears absent from the repo. **Never drop this pointer line**

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link; no password anywhere. Demo mode is
  deliberately ungated and unchanged
- /diagnostics — database + RLS probe (Supabase mode only); see "RLS, exercised" below;
  treat probe output as evidence, not gospel
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges as child records
- /cases/:id — case detail; tabs are URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging inbox: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1)
- /notes — office notes; per-transcript detail with participants/tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files in ..\data\pfs\, outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, worklist card
- /statutes — cite box + browse + keyword search; chapter viewer, Mark-verified pins, refresh-and-diff (A4)
- /bills — bill tracking: watch targets, tracked bills with B3 lifecycle, statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice |
| Parties | LIVE | link/unlink with role registry; bulk party fetch |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE + Outlook push WORKING | event CRUD works; push to "MDBP Cases" verified 2026-07-26 (creation only — edit/cancel unverified) |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Auth (NEW 2026-07-28)
- **Magic link (AUTH-1, ruled by Michael 2026-07-28).** Single-user, Michael only. Sign-in,
  session persistence, sign-out (scoped `local`) all work and were used. The form **cannot
  create an account** (`shouldCreateUser: false`) — his user was made by hand in the
  dashboard, so nobody can self-provision. One shared client serves data + auth
- Implicit flow, chosen from the installed auth-js source; rationale in log #28
- **Tokens are single-browser: open the link in the browser you want signed in**

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only to the DataAdapter
  interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9; reseeds migrate
  imported schedules + confirmed runs, back up the old store
- **`db/schema.sql` EXECUTED against the live project 2026-07-28** (first time ever). 32
  tables, RLS on all 32, 31 policies, `file_counters` deliberately policy-less
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY; **`anon` gets
  nothing by design.** `db/migrations/2026-07-28-api-role-grants.sql`, also appended to
  `db/schema.sql`
- **`ALTER DEFAULT PRIVILEGES` deliberately NOT set** (auto-expose stays off): **every new
  table must carry its own GRANT or it is unreachable — CL-2's `case_clients` INHERITS THIS**
- **No case-event/CE table, no time_entries, no claims table**
- **No client dimension yet** — no `case_clients`, no `case_links`, no `client_id`/`posture`.
  Damages key on `case_id`. `cases.statute_of_limitations` EXISTS. All three are AUTHORIZED
  to change by CL-2 (#27) — **the slice has NOT run.** Nothing here has moved
- Health: **195 vitest tests green (186 + 9 new probe tests), build + oxlint clean, 2026-07-28**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all 31 API tables; INSERT+DELETE on **four**
  (`parties`, `legal_rules`, `glossary_terms`, `watch_targets`); and the app's own write path —
  one fictional case via the UI, exercising `cases` INSERT and SECURITY DEFINER `next_file_number()`
- **PRESENT BUT UNTESTED: the write paths of the other 26 policy-bearing tables.** All 31
  policies are textually identical (`for all to authenticated using (true) with check (true)`),
  so the four are strong evidence for the pattern — **an inference, not a test**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** (revoked on purpose,
  reached only via the SECURITY DEFINER function). Its 403 is NOT an RLS result. The
  signed-out baseline is likewise a privilege refusal, not an RLS empty set

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth — everything
  written on 2026-07-28 was fictional, probe rows included, and those were deleted.
  **Auth unlocks no real data: all of `Go_Live_Gates.md` still applies**
- **Gate 9 (NEW): production SMTP is required before live use.** With magic-link auth the
  email sender is load-bearing for access itself, and Supabase's built-in sender is
  rate-limited and development-grade. Gate note only — no SMTP work done
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Previously called
  auth-blocked; **that diagnosis is probably incomplete — `service_role` was never granted
  either** (same root cause as the 401 wall). NOT investigated; the deploy session should
  start from that hypothesis rather than re-derive it
- **/statutes in demo mode never touches Supabase** — committed fixture chapters only
- **Outlook push WORKS as of 2026-07-26.** Entra registered, `.env` set, demo event landed on
  "MDBP Cases". **ONLY event CREATION is exercised** — edit/cancel propagation unverified.
  Binding: **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only. OAA intake parses digital
  Uvalde-layout orders only; scans → manual
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage anywhere —
  EOB/report "links" are text descriptions
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built; code mappings and generated documents do NOT survive a reseed
- **PROBATE: the only furniture is a `Probate companion` case type parented under Personal
  Injury with a knowingly wrong ladder (`_piDefault`) — MIS-PARENTED. Re-parenting gated on
  PR-3; do not touch the case-type tree or ladder.** No probate practice area, no
  estate/decedent tables, no probate roles, no probate design doc
- Time tracker: design draft only. Servpro deadline engine: DESIGN ONLY, gated on the meeting.
  Case heartbeat: design docs only; captures e+f NOT folded; register H1–H83
- **CE1 (case-event core): still NOT AUTHORIZED and behind CL-2** (D-CL2-9). Must be
  **CLIENT-AWARE from the start** or the retrofit hits the substrate under both the heartbeat
  and the time tracker
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6). Registry: ALL
  entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **THE RESUME POINT IS NOW CL-2 (§5B) — authorized (#27), scope `cl2-authorization-brief.md`
  §1's six pieces exactly, three carve-outs as DO-NOTs.** The auth slice that was blocking it
  is DONE. Deltas: **the limitations column DROPS, not dormant**; because auth ran first this
  includes a **live-DB ALTER/DROP migration** under the backup-and-review-log pattern; the
  brief's two §4 questions run as **stated defaults** (backfill never touches `case_parties`;
  the criminal case's nearly-empty client record is created); keep `posture`'s constraint
  admissive of a future mixed-posture value. **And it must grant privileges on any table it
  creates** — see the data layer above
- **CL-2 TEST MATERIAL EXISTS:** the fictional case created 2026-07-28 has a **case-level SOL
  and no linked party**, on purpose. The SOL must carry to the derived client record, and the
  no-client-role-party backfill should **flag** this case rather than guess
- **The CL-2 walkthrough is specified: the brief's §5 checklist PLUS a two-client case with
  one client settled**, settled meaning DISBURSED (D-CL2-2a / D-CL2-4a). Michael re-walks the
  medical tab afterward on the v0.1/Phase 1a model; not a glance
- Accepted cost, now realized in part: some RLS work may need revisiting after CL-2
  restructures the schema — rework, not loss
- **UNRULED: `model-routing-plan.md`** — adopt nothing; the memo carries its own findings
- **Client-model decisions: design doc §10 is authoritative**; live openers are D-CL2-3 and
  CL2-CHECK-1 (deferred, do not build)
- **Everything awaiting Michael's ruling lives in `docs/specs/attorney-review-queue.md`** —
  reconciled to log #28. Do not maintain a second roster here
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the Estates Code territory
  probate needs. The probate chapters are the O6 stress test
- Two Outlook Phase-2 design items in spec-feedback; do not fix in isolation
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED: session-1
  heartbeat voice capture (never reached Code)
- Supabase Pro upgrade (gate 1), security review (gate 2), **gate 3 RLS now PARTLY satisfied —
  see "RLS, exercised"**, no canonical law-change ledger (FOUR homeless families), Outlook
  slice unreviewed — all carried
