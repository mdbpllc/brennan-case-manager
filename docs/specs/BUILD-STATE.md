# BUILD STATE — brennan-case-manager
Commit: 37732ce  |  Branch: master  |  Generated: 2026-08-06 (thirty-first refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT,
MIGRATED LIVE, AND WALKED (2026-07-28)** — the client dimension exists; auth (§5A) landed the
same day. **NOTHING BUILT SINCE** — the refreshes since are docs-only routing.
History: `archive-project-history-by-day.md`.

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
- `client_id` on `medical_bills` and `analysis_runs`; both adapters carry a bill's runs with
  it on reassignment
- **A case with no client-role party is FLAGGED, never guessed** (`case_client_flags`); its
  orphaned limitations date is **PRESERVED on the flag** and carries onto the client record
  on creation (Michael's ruling). New cases use the same mechanism
- `posture` admits `'mixed'`; **`fee_arrangement` does NOT close D-CL2-3**. Criminal clients
  are the nearly-empty row, posture **defendant**; clocks stay on `charges`

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only to the DataAdapter
  interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; **store version v10**. v9→v10 migrates
  **FORWARD in place**, not by reseeding — a reseed would wipe what the backfill derives from
- **`npm run dev:demo`** (port 5175, `.env.demo`) runs demo mode while a real `.env` exists.
  **Demo state does NOT travel** — localStorage is per-browser AND per-origin
- **`db/schema.sql` EXECUTED against the live project 2026-07-28** (first time ever), then
  **the CL-2 migration executed against it the same night**. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY; **`anon` gets
  nothing by design.** `db/migrations/2026-07-28-api-role-grants.sql`, appended to schema.sql
- **`ALTER DEFAULT PRIVILEGES` deliberately NOT set** (auto-expose stays off): **every new
  table must carry its own GRANT or it is unreachable.** CL-2 shipped both of its tables'
  grants in the same migration — that is the worked example to copy
- **No case-event/CE table, no time_entries, no claims table, no `case_links`**
- Health: **232 vitest tests, build + oxlint clean, 2026-07-28** — untouched since (docs only)

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on four
  (`parties`, `legal_rules`, `glossary_terms`, `watch_targets`); the app's own write path;
  and **CL-2's live paths — `case_clients` INSERT ×2, SOL UPDATE, disbursement toggle both
  directions, flag resolve — all against real RLS and grants**
- **PRESENT BUT UNTESTED: the write paths of the remaining policy-bearing tables.** All
  policies are textually identical, so the exercised ones are evidence — **an inference**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** (revoked on purpose,
  reached only via its SECURITY DEFINER function). Its 403 is NOT an RLS result
- The probe now covers **34** tables. **Keep that list in step with the schema** — a table
  missing from it is a table whose missing GRANT nothing would catch

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND after CL-2 —
  everything written on 2026-07-28, including in the live database, was fictional.
  **All of `Go_Live_Gates.md` still applies**
- **Gate 9: production SMTP is required before live use.** With magic-link auth the email
  sender is load-bearing for access itself. Gate note only — no SMTP work done
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked,
  but **that diagnosis is incomplete — `service_role` was never granted either**; start there
- **/statutes in demo mode never touches Supabase** — committed fixture chapters only
- **Outlook push WORKS as of 2026-07-26.** **ONLY event CREATION is exercised** — edit/cancel
  propagation unverified. Binding: **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only. OAA intake parses digital
  Uvalde-layout orders only; scans → manual
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage — EOB/report
  "links" are text. **Hand-keying itemized bills is a VIABILITY issue** (Michael); see queue
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built; code mappings and generated documents do NOT survive a reseed
- **"Mark disbursed" shows on criminal files — KNOWN CONSEQUENCE of the profiles carve-out,
  deliberately NOT fixed.** Hiding it by practice area = profile machinery by the back door
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`). Re-parenting gated on PR-3; do not touch
  the case-type tree or ladder.** No probate practice area, tables, roles, or design doc
- **NO MONEY MACHINERY:** no settlement ledger, disbursement statements, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built; the POC changed nothing** — §12 is findings, not machinery
- Time tracker: design draft only. Servpro deadline engine: DESIGN ONLY, gated on the meeting.
  Case heartbeat: design docs only; captures e+f NOT folded; register H1–H83
- **CE1 (case-event core): still NOT AUTHORIZED** (D-CL2-9). Must be **CLIENT-AWARE from the
  start**; CL-2 is now built, so the substrate it would sit on is settled
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6). Registry: ALL
  entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **THERE IS NO ASSIGNED NEXT SLICE.** CL-2 completed the authorized queue; auth and CL-2
  both ran 2026-07-28. The next build target is Michael's to name
- **NEW 2026-08-06 — form-engine POC routed, nothing built:** `form-engine.md` **§12** holds the
  method findings from the 2026-07-31 live drafting, DISTINCT from §8 (§8 = shell, §12 = method);
  `form-engine-helpers.md` is reference code, unbuilt. **The feared duplicate learnings section
  from a 2026-07-23 packet does not exist — that packet never landed.** New and Michael's:
  **FE-1** (chronologies lack provider addresses/phones/charges) and **FE-2** (entity discovery)
- **NEW: `docs/new-machine-bootstrap.md`** — Windows provisioning checklist. **Gap found running
  it: git identity was unset**, blocking the first commit; the checklist still lacks that step
- **QUEUE-RUNNER.md is v2 — Q-1 amended by Michael's ruling 2026-08-06.** Step 4 item 3 now
  carries BS-1 provenance, displace-don't-append, and ledger-pointer preservation. **The "stale
  120-line cap" flag was NEVER TRUE and is RETIRED** — the file has said 150 since 2026-07-28
- `future-modules-capture-2026-07-28.md` — QuickBooks proposal (link-don't-rebuild, read-only
  first, **sandbox-only until the gates**). **PROPOSED, unruled, authorizes nothing**
- **Six defects found by EXERCISING CL-2, five only because someone clicked** — worst:
  **clearing any field silently did nothing in Supabase mode** (`toRow`). Full list in log #29
- **Everything awaiting Michael's ruling lives in `docs/specs/attorney-review-queue.md`** —
  reconciled through #29; no second roster here. **K-6/K-7 RETIRED — reconstruct NOTHING**
- **UNRULED: `model-routing-plan.md`** — adopt nothing; the memo carries its own findings
- **Client-model decisions: design doc §10 is authoritative**; live openers D-CL2-3 and
  CL2-CHECK-1 (deferred, do not build), whose live sibling is Michael's auto-create-client-on-PI
- Statutes queue resume: TDRPC 1.04 (retained), TRCP 204.1, then the Estates Code territory
  probate needs (the probate chapters are the O6 stress test). Two Outlook Phase-2 items sit
  in spec-feedback; do not fix in isolation
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED: session-1
  heartbeat voice capture (never reached Code)
- Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS PARTLY satisfied**,
  no canonical law-change ledger (FOUR homeless families), Outlook slice unreviewed
