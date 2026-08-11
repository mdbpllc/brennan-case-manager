# BUILD STATE — brennan-case-manager
Commit: 157e792  |  Branch: master  |  Generated: 2026-08-11 (forty-first refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **NOTHING BUILT IN THE APP SINCE**
— 08-09 built a GPU environment OUTSIDE the repo; 08-10 and 08-11 routed docs only. `archive-project-history-by-day.md`

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items. **Check it before rebuilding anything absent. Never drop this line**

## NEXT SLICE IS OPEN; the one live authorization is now PARTLY SPENT (read this first)
- **"Next build slice" is OPEN.** Slice A (the provider-directory build) was **WITHDRAWN, not
  paused**, 2026-08-08. **The form engine cannot be named as the next slice until CD-1 resolves**
- **CD-1's PATH IS NOW RULED (08-11), and it is not "wait for evidence":** opportunistic
  REQ-CAPTUREs continue, PLUS **one deliberate roster-mining pass** over the document bank (run in
  PI DISCOVERY, **Michael's hand**; prompt shipped to him, never a repo doc) — **then the typed
  schema session fires.** Prep scaffold: `cd-1-session-prep.md`. The roster capture is the gate
- **PHASE 0 + T3 (authorized 2026-08-07): PARTLY SPENT 2026-08-09 on the P1.** Environment STOOD UP
  (WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA on **sm_120**), **outside the repo** at
  `~/phase0`. **Stage 1 SCORING IS HELD, NO SCORECARD EXISTS**; Stage 2 untouched; **T4 unauthorized**.
  Record: `phase0-environment-standup-2026-08-09.md`. Weights fit (2924 of 8151 MiB) but that **does
  NOT retire sequential loading**. The fixture rider was ALREADY SPENT — the 13 pilot transcripts are
  `src/routing/__tests__/pilot/` fixtures; Stage 1 owes the full-precision comparison
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack. **NARROW
  EXCEPTION ruled 08-09**: environment proceeds, scoring holds, **no substitute audio**, row stays
  RED, preflight NOT passed. **His hand (H4): stage the 13 recordings into `..\data`**, outside the
  repo. **BUT THE KICKOFF DOC IS GONE (KICK-1)** — never git-tracked, so the loss cannot be dated,
  and it is the **authoritative text of that authorization**: **until Michael locates it or
  re-issues, FURTHER T3 WORK IS UNAUTHORIZED.** Not a packet

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (types, auto file numbers); /cases/new/oaa — OAA order upload → draft review → Create Matter, charges as child records
- /cases/:id — case detail; tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1)
- /notes — office notes, per-transcript detail w/ participants/tags; /parties — directory + new/edit forms, masked phones, combobox pickers; /benchmarks — Medicare PFS CSV import (sources in ..\data\pfs\, outside the repo)
- /diagnostics — database + RLS probe (Supabase only), output is evidence not gospel
- /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, worklist card
- /statutes — cite box, browse, keyword search; chapter viewer, Mark-verified pins, refresh-and-diff (A4); /bills — watch targets, tracked bills with B3 lifecycle, statute-ref matcher

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
- `case_clients` is **PARALLEL to `case_parties`, not a promotion** (D-CL2-8); `client_id` sits on
  `medical_bills` and `analysis_runs`. **`cases.statute_of_limitations` IS DROPPED** — the case
  displays the earliest across clients **not yet disbursed**; `disbursed_at` is a marker only.
  **Single-client files click exactly as before** (D-CL2-7): no selector, limitations **writes
  THROUGH**; two+ → read-only
- Medicare/Medicaid live on the client; occurrence flags (trucking, product, government defendant,
  death, **minor/incapacitated**) stay FILE-level **by ruling — do not "fix" minor/incapacitated to
  the client.** `posture` admits `'mixed'`. **No client-role party = FLAGGED, never guessed**
  (`case_client_flags`), orphaned limitations date **PRESERVED on the flag**. **D-CL2-3: the BILLING
  RATE IS PER CLIENT**, effective-dated, prospective — **no schema exists**; tracker unbuilt

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter
  interface — every feature works in both modes. Seeds are fictional; **store version v10**,
  and v9→v10 migrates **FORWARD in place** (a reseed wipes what the backfill derives from).
  **`npm run dev:demo`** runs demo mode while a real `.env` exists; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then the CL-2 migration that night. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing
  by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is
  NOT set: every new table must carry its own GRANT or it is unreachable** — copy CL-2's migration
- **No case-event/CE table, no time_entries, no claims, no `case_links`, and no directory table of
  any kind — provider, contact, or otherwise.** Health: **232 tests, build + lint clean 2026-08-11**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths.**
  **PRESENT BUT UNTESTED: every other policy-bearing table's write path** — an inference, not coverage
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS
  result. Probe covers **34** tables; **keep it in step with the schema** or a missing GRANT hides

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND CL-2 — everything
  written 2026-07-28, live database included, was fictional. **All of `Go_Live_Gates.md` applies.**
  **Gate 9: production SMTP required before live use** — magic-link auth makes email load-bearing
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there.
  **/statutes in demo mode never touches Supabase** — fixture chapters only
- **Outlook push WORKS as of 2026-07-26**, but **ONLY event CREATION is exercised** — edit/cancel
  unverified; **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual.
  Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying
  itemized bills is a VIABILITY issue** (Michael). Playbook engine NOT built; generated docs and
  code mappings do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN
  CONSEQUENCE of the profiles carve-out, deliberately NOT fixed**
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION
  HELD** until the ladder pass names the destination. **Do not touch the case-type tree or ladder.**
  No probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built.** **FE-1 SUPERSEDED by CD-1** (global CONTACT directory;
  provider is a role, not a table), its mechanics surviving **as PROPOSED CD-1 inputs**; FE-2 CLOSED,
  build home PARKED; FE-3 open. **FE-4–FE-7 entered 08-11** — definitions-as-objects, interrogatory
  count budget, packaging modes, distillation queue — **all spec-only, gated behind CD-1. Nothing
  authorized: no table, migration, UI.** `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT,
  not code**; §12 gained **§§12.7–12.13** from its first live run (medchron attributions unverified,
  operator-local service dates, style-by-role, keep-together blocks). **Skill v2 is SK-v2, a design
  task — Code must not edit the skill**
- Time tracker: draft only. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only;
  captures e+f NOT folded; register H1–H83. **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be
  **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6)
- **REGISTRY — the status line changed 08-11; read both halves.** **DOCS: thirteen entries are now
  VERIFIED** (Michael) — TRCP discovery procedure, Lab. Code § 406.033, four FMCSR — in the NEW
  `legal-rule-registry-discovery-and-carrier-duties.md`. **THE APP's `/rules` SEED IS UNTOUCHED AND
  REMAINS ALL UNVERIFIED**: no build was authorized, the verified propositions live in docs only,
  and Code set nothing — verification is yours alone

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **TWO SYNC-PICKER RE-CHECKS, ONE CLICK EACH, BOTH YOURS:** `docs/skills/` (Q-3 — evidence says it
  IS syncing, since the skill ran design-side from HEAD; you close it) and **NEW `docs/templates/`**
  (08-11, the first house template). **If the picker excludes new nested dirs, neither reaches you**
- **CD-1 UNRULED and NOT AUTHORIZED, but its PATH is ruled** (above). **CD-2 ENTERED 08-11, framing
  RULED:** case-type party rosters + typed contact edges are ONE structure across practice areas
  (trucking corporate = probate family); rosters are intake SLOTS, never auto-created records.
  Design unruled; distinct from CL-1 (`case_links` links cases, CD-2 links contacts)
- **NEW IN SERIES (intake pipeline), 08-11:** IN-1 answer-mining · IN-2 crash-report extraction +
  per-field SOURCE ATTRIBUTION (CD-1-adjacent) · IN-3 HOLD sets with MANUAL-only service triggers
  (docket-watch stays behind Q-6). **Naming rode inside "Yes on 1" — a one-word veto renames them to
  FE numbers before they get load-bearing.** **NEW DL SERIES:** DL-INPUT asks whether the deadline
  model is per-(case, party) rather than per-case
- **ONE MICHAEL CALL OPEN — telemetry posture:** NeMo pulled `wandb`/`sentry-sdk`/OneLogger onto the
  machine that will process privileged audio; **smoke test RULED AND RUN 08-09** (tone only). **The
  capabilities memo is NOT in the repo** — route it. **CL2-AC-1 is DIRECTION-CONFIRMED, not closed**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched
  in the **P15's** gitignored `inbox/`, not this machine's; CORPUS-HOME closed to ARCHIVE, **your
  hand**. **PROBATE-LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v6** (`docs/prompts/QUEUE-RUNNER.md`, the
  **ONLY full copy**); the 10th invocation was the first where filename-date and mtime order AGREED.
  **Your hand: the P15 user-level copy deletion** (P1 ABSENT). instr. **v10**. **H-series (log #44)
  and the SAT-1 / two-sweep proposals are open in the queue; H IDs COLLIDE with heartbeat H1–H83**
- **#36's routing is CLEARED design-side (log #37).** The carried **#31–#33 material is still
  UNREVIEWED**, as is **#37–#48's own routing** — do not copy the #36 clearance forward
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through #48. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`; `cd-1-session-prep.md`** (a
  scaffold — delete it when the CD-1 spec exists). Client-model detail: design doc §10 (**D-CL2-3a**,
  **CL2-CHECK-1** open there)
- FOLD PENDING: captures e+f into case-heartbeat-design.md §8. Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS PARTLY**, no canonical law-change ledger, Outlook unreviewed
