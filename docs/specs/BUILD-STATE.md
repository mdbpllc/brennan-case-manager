# BUILD STATE — brennan-case-manager
Commit: abcbee6  |  Branch: master  |  Generated: 2026-08-08 (thirty-fifth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **NOTHING BUILT SINCE** — every
refresh since is docs-only routing. History: `archive-project-history-by-day.md`.

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items live there. Check it before proposing or rebuilding anything that
  looks absent from the repo. **Never drop this pointer line**

## NEXT SLICE IS OPEN; the one live authorization is hardware-bound (read this first)
- **"Next build slice" is OPEN.** Slice A (the provider-directory build) was **WITHDRAWN, not
  paused**, on 2026-08-08 before it was ever packaged; nothing entered the build queue. **The
  form engine cannot be named as the next slice until CD-1 resolves**
- **PHASE 0 + T3: AUTHORIZED 2026-08-07, stage-gated, NOT BUILT, AUTHORIZATION UNSPENT.** The
  2026-08-07 evening runner **did not build it — preflight FAILED, wrong machine**
- Measured, not assumed: **Quadro P620 with 4 GB VRAM against T3's 8 GB design floor**, and **no WSL
  distribution installed at all**. Driver 582.41 passes; pilot audio is reachable. **4 GB is a
  different constraint class, not a slower P1.** **No scorecard exists; the stage-1 checkpoint was
  never reached, let alone self-certified.** T4 stays unauthorized
- **Needs a session ON THE P1 GEN 8, not a new packet.** 13 pilot transcripts never supplied

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /diagnostics — database + RLS probe (Supabase only); probe output is evidence, not gospel
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges as child records
- /cases/:id — case detail; tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1)
- /notes — office notes; per-transcript detail with participants/tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files in ..\data\pfs\, outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, worklist card
- /statutes — cite box, browse, keyword search; chapter viewer, Mark-verified pins, refresh-and-diff (A4)
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
- `case_clients` is **PARALLEL to `case_parties`, not a promotion** (D-CL2-8): parties own ROLES
- **`cases.statute_of_limitations` IS DROPPED** (D-CL2-2, not dormant). The case DISPLAYS the
  earliest across clients **not yet disbursed** (D-CL2-2a); disbursement is the "resolved" test
  (D-CL2-4a). `disbursed_at` is a marker only — settlement records unbuilt
- **Single-client files look and click exactly as today** (D-CL2-7): no selector; Overview's
  limitations field **writes THROUGH** (not the writable COPY D-CL2-2 killed). Two+ → read-only
- Medicare/Medicaid moved from `cases.pi_flags` to the client (D-CL2-5). Occurrence flags —
  trucking, product, government defendant, death, **minor/incapacitated** — stay FILE-level by
  ruling. **Do not "fix" minor/incapacitated to the client.** `posture` admits `'mixed'`
- `client_id` on `medical_bills` and `analysis_runs`; both adapters carry a bill's runs on reassign.
  **No client-role party = FLAGGED, never guessed** (`case_client_flags`), orphaned limitations
  date **PRESERVED on the flag** and carried onto the client record
- **D-CL2-3 CLOSED 2026-08-07 — the BILLING RATE IS PER CLIENT**, **effective-dated** (hours valued
  at the rate in force when incurred; changes PROSPECTIVE). **No schema exists**; tracker unbuilt

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter
  interface — every feature works in both modes. Seeds are fictional; **store version v10**,
  and v9→v10 migrates **FORWARD in place** (a reseed wipes what the backfill derives from)
- **`npm run dev:demo`** (5175, `.env.demo`) runs demo mode while a real `.env` exists. **Demo
  state does NOT travel** — localStorage is per-browser AND per-origin
- **`db/schema.sql` EXECUTED live 2026-07-28**, then the CL-2 migration that night. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing
  by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is
  NOT set: every new table must carry its own GRANT or it is unreachable** — copy CL-2's migration
- **No case-event/CE table, no time_entries, no claims, no `case_links`, and no directory table of
  any kind — provider, contact, or otherwise.** Health: **232 tests, build + lint clean 2026-07-28**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths**
- **PRESENT BUT UNTESTED: the write paths of every other policy-bearing table.** Policies are
  textually identical, so the exercised ones are **an inference, not coverage**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS
  result. Probe covers **34** tables; **keep it in step with the schema** or a missing GRANT hides

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND after CL-2 —
  everything written 2026-07-28, live database included, was fictional. **All of
  `Go_Live_Gates.md` still applies.** **Gate 9: production SMTP is required before live use** —
  magic-link auth makes the email sender load-bearing for access itself; no SMTP work done
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there
- **/statutes in demo mode never touches Supabase** — committed fixture chapters only
- **Outlook push WORKS as of 2026-07-26.** **ONLY event CREATION is exercised** — edit/cancel
  unverified. Binding: **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO automatic ingestion (T3 unbuilt); OAA intake parses digital Uvalde-layout orders only,
  scans → manual. Demo PFS schedule is fictional
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage — EOB/report "links"
  are text. **Hand-keying itemized bills is a VIABILITY issue** (Michael); see queue. Playbook
  engine NOT built; generated docs and code mappings do NOT survive a reseed
- **"Mark disbursed" shows on criminal files — KNOWN CONSEQUENCE of the profiles carve-out,
  deliberately NOT fixed.** Hiding it by practice area = profile machinery by the back door
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED (own area, own
  ladder), **EXECUTION HELD** until the ladder pass names the destination. **Do not touch the
  case-type tree or ladder.** No probate tables or roles exist
- **NO MONEY MACHINERY:** no settlement ledger, disbursement statements, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built, identity source REFRAMED 2026-08-08.** **FE-1 (provider
  directory) is SUPERSEDED by CD-1** — a global CONTACT directory, provider being a role on a
  contact rather than a table. FE-1's mechanics (pointer model, enter-once write-back, firm-wide
  propagation with scope label) survive **as PROPOSED inputs to CD-1 only**. FE-2 (document-name
  sweep, flags only) still CLOSED, **build home PARKED**. **Nothing authorized: no table,
  migration, or UI.** FE-3 open, Michael's
- Time tracker: design draft only. Servpro deadline engine: DESIGN ONLY, gated on the meeting. Case
  heartbeat: design docs only; captures e+f NOT folded; register H1–H83. **CE1 (case-event core)
  still NOT AUTHORIZED** (D-CL2-9) — must be **CLIENT-AWARE from the start**
- CourtListener: design doc only — app integration UNAUTHORIZED (Q-6 + its §6). Registry: ALL
  entries UNVERIFIED; entries 1–10 sign-off is Michael's

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **NEW 2026-08-08 (log #38)** — `rulings-capture-2026-08-08.md` routed. **CD-1 ISSUED, UNRULED,
  NOT AUTHORIZED:** one global contact directory as the identity source for the form engine and all
  case-linked people/entities — views over one directory, or tables linked to
  `case_parties`/`case_clients`? **Own design session, schema on screen. LIVING SPEC**
- **CL2-AC-1 is DIRECTION-CONFIRMED, not closed** — auto-create on PI client-role link is policy;
  **link-removal, mixed-posture, and backfill are explicitly UNRULED**, doc-on-screen required
- **CORPUS-HOME CLOSED 2026-08-08: the ARCHIVE project** (the DOMSER proposal was not adopted).
  Execution is **Michael's hand** — an upload, never a repo action
- **The probate corpus is NOT in the repo and never has been** — one directory ABOVE the repo root;
  **the repo root is a SUBFOLDER of the project folder.** Re-verified 2026-08-08: untracked, in no
  commit. `Probate Corpus.zip` sits untouched in gitignored `inbox/`
- **PROBATE-LADDER PASS DEFERRED** pending Domser; unblock is the letters-issued arc capture.
  **PL-1..PL-4 UNRULED**; PL-1's proceeding-as-case-type pick is Claude's, **PROPOSED only**
- **PROPOSED, unruled: SAT-1** (satellite pattern + one-ruling-space) and **QR-2** (make the
  machine-local runner copies POINTERS to the repo file). QR-2's evidence is now **three
  consecutive runs** stale — #38 loaded v1 against repo v3, self-caught again
- **QUEUE-RUNNER.md is v3 (QR-1)** in both tracked copies. **ID collision flagged, not
  renumbered:** §2's O1 (Prop. Code fees) ≠ the transcript O-series O1 (auto-file)
- **#36's routing is REVIEWED AND CLEARED design-side (log #37).** The carried **#31–#35 material
  is still UNREVIEWED**, as is **#37–#38's own routing** — do not copy the #36 clearance forward
- **Everything awaiting Michael's ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through #38. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`** (QuickBooks)
- **Client model: design doc §10 is authoritative.** Open: **D-CL2-3a** (affidavit rate),
  **CL2-CHECK-1** (deferred). Statutes resume: TDRPC 1.04, TRCP 204.1, then Estates Code
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT NEEDED: session-1
  heartbeat voice capture. Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS
  PARTLY satisfied**, no canonical law-change ledger, Outlook slice unreviewed
