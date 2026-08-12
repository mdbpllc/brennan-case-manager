# BUILD STATE — brennan-case-manager
Commit: 9f96115  |  Branch: master  |  Generated: 2026-08-11 Central (forty-fourth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **NOTHING BUILT IN THE APP SINCE**
— 08-09 built a GPU environment OUTSIDE the repo; 08-10 and 08-11 routed docs only. `archive-project-history-by-day.md`

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items. **Check it before rebuilding anything absent. Never drop this line**

## CD-1 IS RULED AND SPEC'D — AND STILL NOT BUILT (read this first)
- **`docs/specs/contact-directory.md` LANDED 2026-08-11** — the CD-1 living spec, every question
  ruled item by item. **THE FORK RESOLVED TO THE SHAPE ALREADY BUILT:** `parties` **IS** the
  directory, `case_parties` stays the roster link, `case_clients` stays parallel, **D-CL2-8
  UNTOUCHED**; no new identity table, no views. **NOT ONE LINE IS AUTHORIZED TO BUILD** — no table,
  no migration, no UI, **no `party_type` migration** (role tags supersede it on paper only)
- Also ruled there: **scope** (non-parties in, attorney-is-a-role, probate reserves only the
  PI-proven estate pattern) · **identity** (capacity on the roster link, typed alias sets w/
  multi-match flags, NO resolution machinery) · **CD-2's two layers** (roster slots as case-type data
  w/ tiers; directional typed edges) · **the CL-1 firewall** · **the §6 selector contract** ·
  **IN-2's home** (case-scoped fact table; promotion ONLY by attorney verification)
- **`cd-1-session-prep.md` is GONE** — absorbed and deleted the same commit. Don't look for it
- **"Next build slice" is STILL OPEN, and naming it is DEFERRED BY RULING** to a later design
  session citing the spec at HEAD. **The form engine is now NAMEABLE** (FE-4–FE-7 unblock for spec
  completion; FE-2's parked build home can be raced) — nameable is not named. Slice A stays WITHDRAWN
- **PHASE 0 + T3 (authorized 2026-08-07): PARTLY SPENT 2026-08-09 on the P1.** Environment STOOD UP
  (WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA on **sm_120**), **outside the repo** at
  `~/phase0` — `phase0-environment-standup-2026-08-09.md`. **Stage 1 SCORING IS HELD, NO SCORECARD
  EXISTS**; Stage 2 untouched; **T4 unauthorized**. Weights fit but that **does NOT retire sequential
  loading**. Fixture rider SPENT — the 13 pilot transcripts are `src/routing/__tests__/pilot/`
  fixtures; Stage 1 owes the full-precision comparison
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack. **NARROW
  EXCEPTION ruled 08-09**: environment proceeds, scoring holds, **no substitute audio**, row stays
  RED. **His hand (H4): stage the 13 recordings into `..\data`** — **checked this refresh:
  `C:\Users\Brennan\data` DOES NOT EXIST on the machine that ran it.** **AND THE KICKOFF DOC IS GONE
  (KICK-1)** — never git-tracked, so the loss cannot be dated, and it is that authorization's
  **authoritative text**: **until Michael locates it or re-issues, T3 WORK IS UNAUTHORIZED**

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (types, auto file numbers); /cases/new/oaa — OAA order upload → draft review → Create Matter, charges as child records
- /cases/:id — case detail; tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1)
- /notes — office notes, per-transcript detail w/ participants/tags; /parties — directory + new/edit forms, masked phones, combobox pickers; /benchmarks — Medicare PFS CSV import
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
  (`case_client_flags`), orphaned limitations date **PRESERVED on the flag**. **D-CL2-3: BILLING RATE
  IS PER CLIENT**, effective-dated — **no schema exists**; tracker unbuilt

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter interface —
  every feature works in both modes. Seeds fictional; **store v10**, and v9→v10 migrates **FORWARD in
  place**. **`npm run dev:demo`** runs demo mode past a real `.env`; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then the CL-2 migration that night. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing by
  design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is NOT set: every new table must carry its own GRANT or it is unreachable** — copy CL-2's migration
- **No case-event/CE table, no time_entries, no claims, no `case_links`, and no contact-directory
  table beyond `parties` itself.** Health **re-run this refresh: 232 tests pass, build + lint clean**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths. PRESENT
  BUT UNTESTED: every other policy-bearing write path** — an inference, not coverage
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS
  result. Probe covers **34** tables; **keep it in step with the schema** or a missing GRANT hides

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND CL-2 — everything
  written 2026-07-28, live database included, was fictional. **All of `Go_Live_Gates.md` applies.**
  **Gate 9: production SMTP required before live use** — magic-link auth makes email load-bearing
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there.
  **/statutes in demo mode never touches Supabase** — fixture chapters only
- **Benchmarks import reads `..\data\pfs\` — NOT present on the machine that ran this refresh**
  (checked `C:\Users\Brennan\data`; it lives on the other machine)
- **Outlook push WORKS as of 2026-07-26**, but **ONLY event CREATION is exercised** — edit/cancel
  unverified; **fictional demo events only** until Go_Live_Gates clears
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual.
  Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying
  itemized bills is a VIABILITY issue** (Michael). Playbook engine NOT built; generated docs and code
  mappings do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN, NOT fixed**
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION
  HELD** until the ladder pass names the destination. **Do not touch the case-type tree or ladder.**
  No probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built**; CD-1 landing changes only its SPEC status. FE-1 stays
  SUPERSEDED (its five mechanics now RULED in the contact-directory spec §8); FE-2 CLOSED, build home
  PARKED; FE-3 open; **FE-4–FE-12 spec-only. Nothing authorized.**
  `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT, not code** (§12 gained §§12.7–12.13
  from its first live run). **v2 is SK-v2, a design task — Code must not edit it**
- Time tracker: draft only. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only;
  captures e+f NOT folded; register H1–H83. **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be
  **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6)
- **REGISTRY — read both halves.** **DOCS: TWENTY entries VERIFIED** (Michael) in
  `legal-rule-registry-discovery-and-carrier-duties.md` — thirteen (TRCP discovery, Lab. Code
  § 406.033, four FMCSR) plus **seven** (TRCP 152, TRCP 194 expanded, CPRC §§ 17.044/17.062/17.024,
  TTCA incl. § 101.106, FTCA, Prop. Code ch. 142 / TRCP 44 & 173) — **the seven are the substrate the
  spec's §6 service picker CITES.** **THE APP's `/rules` SEED IS UNTOUCHED AND ALL UNVERIFIED**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md;
  **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **DT-1 IS NOW IN FORCE** — v14 pasted, verified design-side 2026-08-11; the queue item is CLOSED on
  that verification. Stamps use YOUR Central wall clock. The #49 batch's **08-12** stamps stay
  **DELIBERATELY LEFT ALONE**; #50 records the truth. **NOT retroactive**
- **TWO SYNC-PICKER RE-CHECKS, ONE CLICK EACH, BOTH YOURS:** `docs/skills/` (Q-3) and
  `docs/templates/`. **If the picker excludes new nested dirs, neither reaches you**
- **BOTH REQ-1 CAPTURES ARE FILED AND NOW SPENT** as CD-1 input:
  `REQ-CAPTURE_attorney-edit-roundtrip_2026-08-11.md`, `REQ-CAPTURE_roster-mining-pass_2026-08-11.md`
- **QUEUE ENTRIES FROM #49, all substance still OPEN:** **FE-8** as-generated retention · **FE-9**
  family drift · **FE-10** format lint · **FE-11** caption-body integrity · **FE-12** template
  provenance · **IN-4** lifecycle (**block-finalized now rides it**) · **IN-5** · **WF-1**. **IN-2's
  EXTRACTION HALF stays OPEN, Phase-1b gated. FE-8's cite** resolves to nothing — **NOT reconstructed**
- **NEWLY REGISTERED 2026-08-11: the next-build-slice question** — it rode session-log tables since
  #31 and was **never in the queue**; entered with full text (QR-1) before it could be lost
- **ONE MICHAEL CALL OPEN — telemetry posture:** NeMo pulled `wandb`/`sentry-sdk`/OneLogger onto the
  privileged-audio machine; **smoke test RULED AND RUN 08-09** (tone only). **The capabilities memo is
  NOT in the repo** — route it. **CL2-AC-1 is DIRECTION-CONFIRMED, not closed**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched in the **P15's** gitignored `inbox/`, not this machine's; CORPUS-HOME closed to ARCHIVE, **your hand**.
  **LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v6** (`docs/prompts/QUEUE-RUNNER.md`, the **ONLY full copy**). **Your hand: the P15 user-level copy deletion** (P1 ABSENT).
  Instructions **v14 IN FORCE**. **H-series (log #44) + SAT-1 / two-sweep open; H IDs COLLIDE with heartbeat H1–H83**
- **#36's routing is CLEARED design-side (log #37).** The carried **#31–#33 material is still UNREVIEWED**, as is **#37–#51's own routing** — do not copy the #36 clearance forward
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through #51. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`.** Client model: design doc §10
  (**D-CL2-3a**, **CL2-CHECK-1**)
- FOLD PENDING: captures e+f into case-heartbeat-design.md §8. Carried: Supabase Pro (gate 1), security review (gate 2), **gate 3 RLS PARTLY**, no canonical law-change ledger, Outlook unreviewed
