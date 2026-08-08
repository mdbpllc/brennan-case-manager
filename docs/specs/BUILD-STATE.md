# BUILD STATE — brennan-case-manager
Commit: 1728cae  |  Branch: master  |  Generated: 2026-08-07 (thirty-second refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT,
MIGRATED LIVE, AND WALKED (2026-07-28)** — the client dimension exists; auth (§5A) landed the
same day. **NOTHING BUILT SINCE** — every refresh since is docs-only routing.
History: `archive-project-history-by-day.md`.

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed,
  withdrawn, and deliberately-not-built items live there. Check it before proposing or
  rebuilding anything that appears absent from the repo. **Never drop this pointer line**

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link; no password anywhere. Demo mode is
  deliberately ungated and unchanged
- /diagnostics — database + RLS probe (Supabase only); probe output is evidence, not gospel
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
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice. **Limitations date is now CLIENT-scoped — see the client dimension below** |
| Parties | LIVE | link/unlink with role registry; bulk party fetch; **Clients — damages scope card (CL-2)** |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator. **Per-client ledgers once a case has two clients** |
| Calendar | LIVE + Outlook push WORKING | event CRUD works; push to "MDBP Cases" verified 2026-07-26 (creation only — edit/cancel unverified) |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Client dimension (CL-2, built 2026-07-28 — migrated live, walked)
**The case owns the occurrence and liability; the CLIENT owns the damages.**
- `case_clients` is **PARALLEL to `case_parties`, not a promotion of it** (D-CL2-8):
  `case_parties` stays authoritative for ROLES, `case_clients` for DAMAGES SCOPE
- **`cases.statute_of_limitations` IS DROPPED** (D-CL2-2, not dormant). The case DISPLAYS
  the earliest across clients **not yet disbursed** (D-CL2-2a); disbursement is the
  "resolved" test (D-CL2-4a). `disbursed_at` is a marker only — settlement records unbuilt
- **Single-client files look and click exactly as today** (D-CL2-7): no selector; Overview's
  limitations field **writes THROUGH to the one client record** (D-CL2-2 killed a writable
  second COPY; a pass-through is not one). Two+ clients → read-only derived, dates on Parties
- Medicare/Medicaid moved from `cases.pi_flags` to the client (D-CL2-5). Occurrence flags —
  trucking, product, government defendant, death, **minor/incapacitated** — stay FILE-level
  by ruling. **Do not "fix" minor/incapacitated to the client**
- `client_id` on `medical_bills` and `analysis_runs`; both adapters carry a bill's runs on reassign
- **A case with no client-role party is FLAGGED, never guessed** (`case_client_flags`); its
  orphaned limitations date is **PRESERVED on the flag** and carries onto the client record
- `posture` admits `'mixed'`. Criminal clients are the nearly-empty row (posture **defendant**);
  clocks stay on `charges`
- **D-CL2-3 CLOSED 2026-08-07 — the BILLING RATE IS PER CLIENT, not per case**, and
  **effective-dated**: a rate history on the client record, every hour valued at the rate in
  force when incurred, mid-case changes PROSPECTIVE only. **No schema exists for this** — the
  time tracker is unbuilt and unauthorized. **`fee_arrangement` did not close it; this did**

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only to the DataAdapter
  interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; **store version v10**. v9→v10 migrates
  **FORWARD in place** — a reseed would wipe what the backfill derives from
- **`npm run dev:demo`** (port 5175, `.env.demo`) runs demo mode while a real `.env` exists.
  **Demo state does NOT travel** — localStorage is per-browser AND per-origin
- **`db/schema.sql` EXECUTED against the live project 2026-07-28**, then **the CL-2 migration
  the same night**. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY; **`anon` gets
  nothing by design.** `db/migrations/2026-07-28-api-role-grants.sql`, appended to schema.sql
- **`ALTER DEFAULT PRIVILEGES` deliberately NOT set: every new table must carry its own GRANT
  or it is unreachable.** CL-2 shipped both tables' grants in its migration — copy that
- **No case-event/CE table, no time_entries, no claims table, no `case_links`, no provider
  directory table**
- Health: **232 vitest tests, build + oxlint clean, 2026-07-28** — untouched since (docs only)

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on four
  (`parties`, `legal_rules`, `glossary_terms`, `watch_targets`); the app's own write path; and
  **CL-2's live paths — `case_clients` INSERT ×2, SOL UPDATE, disbursement toggle both ways,
  flag resolve — all against real RLS and grants**
- **PRESENT BUT UNTESTED: the write paths of the remaining policy-bearing tables.** All
  policies are textually identical, so the exercised ones are evidence — **an inference**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS
  result. The probe covers **34** tables; **keep that list in step with the schema**, since a
  table missing from it is a table whose missing GRANT nothing would catch

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND after CL-2 —
  everything written on 2026-07-28, including in the live database, was fictional.
  **All of `Go_Live_Gates.md` still applies**
- **Gate 9: production SMTP is required before live use** — with magic-link auth the email
  sender is load-bearing for access itself. Gate note only; no SMTP work done
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked,
  but **that diagnosis is incomplete — `service_role` was never granted either**; start there
- **/statutes in demo mode never touches Supabase** — committed fixture chapters only
- **Outlook push WORKS as of 2026-07-26.** **ONLY event CREATION is exercised** — edit/cancel
  propagation unverified. Binding: **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO automatic ingestion (T3 GPU-gated); OAA intake parses digital Uvalde-layout
  orders only, scans → manual. Demo PFS schedule is fictional
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage — EOB/report
  "links" are text. **Hand-keying itemized bills is a VIABILITY issue** (Michael); see queue
- Playbook engine NOT built; generated documents and code mappings do NOT survive a reseed
- **"Mark disbursed" shows on criminal files — KNOWN CONSEQUENCE of the profiles carve-out,
  deliberately NOT fixed.** Hiding it by practice area = profile machinery by the back door
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED 2026-08-07
  (own practice area, own ladder) but **EXECUTION HELD** until the probate-ladder design pass
  names the destination. **Do not touch the case-type tree or ladder.** No probate tables/roles
- **NO MONEY MACHINERY:** no settlement ledger, disbursement statements, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built.** FE-1/FE-2 rulings (below) changed the SPEC only
- Time tracker: design draft only. Servpro deadline engine: DESIGN ONLY, gated on the meeting.
  Case heartbeat: design docs only; captures e+f NOT folded; register H1–H83
- **CE1 (case-event core): still NOT AUTHORIZED** (D-CL2-9). Must be **CLIENT-AWARE from the
  start**; CL-2 is now built, so the substrate it would sit on is settled
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6). Registry: ALL
  entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **THERE IS NO ASSIGNED NEXT SLICE.** CL-2 completed the authorized queue; the next build
  target is Michael's to name
- **NEW 2026-08-07 — seven rulings routed, nothing built** (`rulings-capture-2026-08-07.md`,
  log #34/#35). **FE-1 CLOSED: a persistent provider-directory table**, pointer model, identity
  in the directory and dollars on the case, silent trust, in-case edits propagating firm-wide.
  **FE-2 CLOSED: document-name entity sweep**, flags only, dismissals remembered per case.
  **Both SPEC ONLY — no table, migration, or UI authorized**
- **QUEUE-RUNNER.md is v3 (QR-1, 2026-08-07)** in both tracked copies. The runner now carries
  **full question text** into `attorney-review-queue.md`, and that step names the queue file as
  a destination for the first time — v2 merged open items into the log entry only
- **That file's "no second copy of the question text" rule is SUPERSEDED by QR-1**
- **The FE series was entirely missing from the review queue** until 2026-08-07 — all three
  added. FE-3 (§8 shell-content hygiene) is OPEN and Michael's
- **The probate corpus is NOT in the repo and never has been** (verified against every ref
  2026-08-07) — it sits one directory ABOVE the repo root. **The repo root is a SUBFOLDER of
  the project folder.** `Probate Corpus.zip` sits untouched in gitignored `inbox/`
- `future-modules-capture-2026-07-28.md` — QuickBooks proposal, **PROPOSED and unruled**
- **Everything awaiting Michael's ruling lives in `docs/specs/attorney-review-queue.md`** —
  reconciled through #34. **K-6/K-7 RETIRED — reconstruct NOTHING**
- **UNRULED: `model-routing-plan.md`** — adopt nothing
- **Client-model decisions: design doc §10 is authoritative.** Live openers: **D-CL2-3a**
  (affidavit rate under per-client rates), **CL2-AC-1** (auto-create client on PI — ID issued
  2026-08-07, substance unruled), **CL2-CHECK-1** (deferred, do not build)
- Statutes queue resume: TDRPC 1.04, TRCP 204.1, then the Estates Code territory probate needs
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED: session-1
  heartbeat voice capture (never reached Code). #31–#33 material still unreviewed
- Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS PARTLY satisfied**,
  no canonical law-change ledger, Outlook slice unreviewed
