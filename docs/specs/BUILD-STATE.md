# BUILD STATE — brennan-case-manager
Commit: c7118bd  |  Branch: master  |  Generated: 2026-08-09 (thirty-ninth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **NOTHING BUILT IN THE APP SINCE**
— 08-09 built a GPU environment OUTSIDE the repo. History: `archive-project-history-by-day.md`.

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items. **Check it before rebuilding anything absent. Never drop this line**

## NEXT SLICE IS OPEN; the one live authorization is now PARTLY SPENT (read this first)
- **"Next build slice" is OPEN.** Slice A (the provider-directory build) was **WITHDRAWN, not
  paused**, 2026-08-08. **The form engine cannot be named as the next slice until CD-1 resolves**
- **PHASE 0 + T3 (authorized 2026-08-07): PARTLY SPENT 2026-08-09 on the P1.** Environment STOOD UP
  (WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA proven on **sm_120**), **outside the repo**
  at `~/phase0`. **Stage 1 SCORING IS HELD, NO SCORECARD EXISTS**; Stage 2 untouched; **T4
  unauthorized**. Measurements + record: `phase0-environment-standup-2026-08-09.md`
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack. **NARROW
  EXCEPTION ruled 08-09**: environment proceeds, scoring holds, **no substitute audio**, row stays
  RED, preflight NOT passed. **His hand (H4): stage the 13 recordings into `..\data`**, outside the
  repo — then a session re-runs the row under the **ORIGINAL authorization**. **BUT THE KICKOFF DOC
  IS GONE (KICK-1):** the P1's `inbox/` is EMPTY and `KICKOFF-phase0-t3-p1-session_2026-08-08.md`
  was **never git-tracked**, so the loss cannot be dated. It is the **authoritative text of that
  authorization** — **until Michael locates it or re-issues, FURTHER T3 WORK IS UNAUTHORIZED.** Not
  a packet. **Memo §8:** weights fit (2924 of 8151 MiB) but that **does NOT retire sequential
  loading** (activations unmeasured)
- **Fixture rider was ALREADY SPENT** — the 13 pilot transcripts have been
  `src/routing/__tests__/pilot/` fixtures all along; Stage 1 owes the FULL-PRECISION comparison

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /diagnostics — database + RLS probe (Supabase only); probe output is evidence, not gospel
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges as child records
- /cases/:id — case detail; tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1)
- /notes — office notes, per-transcript detail w/ participants/tags; /parties — directory + new/edit forms, masked phones, combobox pickers
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
- **D-CL2-3 CLOSED 08-07 — the BILLING RATE IS PER CLIENT**, **effective-dated**, changes PROSPECTIVE. **No schema exists**; tracker unbuilt

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter
  interface — every feature works in both modes. Seeds are fictional; **store version v10**,
  and v9→v10 migrates **FORWARD in place** (a reseed wipes what the backfill derives from)
- **`npm run dev:demo`** runs demo mode while a real `.env` exists. **Demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then the CL-2 migration that night. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing
  by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is
  NOT set: every new table must carry its own GRANT or it is unreachable** — copy CL-2's migration
- **No case-event/CE table, no time_entries, no claims, no `case_links`, and no directory table of
  any kind — provider, contact, or otherwise.** Health: **232 tests, build + lint clean 2026-08-09**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths**
- **PRESENT BUT UNTESTED: every other policy-bearing table's write paths** — an inference, not coverage
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS
  result. Probe covers **34** tables; **keep it in step with the schema** or a missing GRANT hides

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND CL-2 — everything
  written 2026-07-28, live database included, was fictional. **All of `Go_Live_Gates.md` applies.**
  **Gate 9: production SMTP required before live use** — magic-link auth makes email load-bearing
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there.
  **/statutes in demo mode never touches Supabase** — fixture chapters only
- **Outlook push WORKS as of 2026-07-26.** **ONLY event CREATION is exercised** — edit/cancel
  unverified. Binding: **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage — EOB/report "links"
  are text. **Hand-keying itemized bills is a VIABILITY issue** (Michael). Playbook engine NOT
  built; generated docs and code mappings do NOT survive a reseed
- **"Mark disbursed" shows on criminal files — KNOWN CONSEQUENCE of the profiles carve-out,
  deliberately NOT fixed.** Hiding it by practice area = profile machinery by the back door
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED (own area, own
  ladder), **EXECUTION HELD** until the ladder pass names the destination. **Do not touch the
  case-type tree or ladder.** No probate tables or roles exist
- **NO MONEY MACHINERY:** no settlement ledger, disbursement statements, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built, identity source REFRAMED 2026-08-08.** **FE-1 (provider
  directory) is SUPERSEDED by CD-1** (global CONTACT directory; provider is a role, not a table);
  FE-1's mechanics survive **as PROPOSED inputs to CD-1 only**. FE-2 (document-name sweep) still
  CLOSED, **build home PARKED**. **Nothing authorized: no table, migration, UI.** FE-3 open
- Time tracker: draft only. Servpro deadline engine: DESIGN ONLY, gated on the meeting. Heartbeat:
  design docs only; captures e+f NOT folded; register H1–H83. **CE1 still NOT AUTHORIZED**
  (D-CL2-9) — must be **CLIENT-AWARE from the start**. CourtListener: design doc only, integration
  UNAUTHORIZED (Q-6). Registry: **ALL entries UNVERIFIED**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **PHASE 0 LEAVES ONE MICHAEL CALL OPEN — telemetry posture:** NeMo pulled `wandb`/`sentry-sdk`/
  OneLogger onto the machine that will process privileged audio. **Smoke test RULED AND RUN 08-09**
  (tone only, no quality claim). **Also filed: the capabilities memo is NOT in the repo** — route it
- **CD-1 ISSUED, UNRULED, NOT AUTHORIZED** (log #38): one global contact directory as the identity
  source for form engine and all case-linked people. **Own design session, schema on screen; LIVING**
- **CL2-AC-1 is DIRECTION-CONFIRMED, not closed** — auto-create on PI client-role link is policy;
  **link-removal, mixed-posture, backfill UNRULED**. Its two queue homes were consolidated 08-08
- **CORPUS-HOME CLOSED 2026-08-08: the ARCHIVE project.** Execution **Michael's hand**, never a repo action
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched
  in the **P15's** gitignored `inbox/`, not this machine's (verification: log #38)
- **PROBATE-LADDER PASS DEFERRED** pending Domser; unblock is the letters-issued arc capture.
  **PL-1..PL-4 UNRULED**; PL-1's proceeding-as-case-type pick is Claude's, **PROPOSED only**
- **RUNNER DISCIPLINE — QR-1/2/3 + MM-1 CLOSED; runner v5** (`docs/prompts/QUEUE-RUNNER.md`, the
  **ONLY full copy**). **Michael's hand: ONLY the P15 deletion remains** (P1 ABSENT); instr. **v9**
- **NEW, log #44 (T3/Phase 0 H series):** **H1** npm advisories · **H2** Fable-5-on-Max · **H4** stage
  recordings · **H5** supplied-material rule · **H6** raw capture. **IDs COLLIDE with heartbeat H1–H83**
- **PROPOSED, unruled (SAT-1** satellite pattern**)**, plus two sweeps, both Michael's: **queue-wide
  duplication** and **cross-document status drift** (do design-doc status rows lag the register?)
- **ID collision flagged, not renumbered:** §2's O1 (Prop. Code fees) ≠ O-series O1 (auto-file)
- **#36's routing is REVIEWED AND CLEARED design-side (log #37).** The carried **#31–#35 material
  is still UNREVIEWED**, as is **#37–#44's own routing** — do not copy the #36 clearance forward
- **Everything awaiting Michael's ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through #44. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`** (QuickBooks; new §3 Slack/Claude
  Tag is an OBSERVATION — the Slack decline and Teams preference are **Claude's**, not rulings)
- **Client model: design doc §10 is authoritative** for ruling detail; the queue governs
  completeness (QR-1). §10 was **NOT consolidated; the split stands.** Open: **D-CL2-3a**
  (affidavit rate), **CL2-CHECK-1** (deferred). Statutes resume: TDRPC 1.04, TRCP 204.1, Estates
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8. EXPORT: session-1 heartbeat voice
  capture. Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS PARTLY**, no
  canonical law-change ledger, Outlook slice unreviewed
