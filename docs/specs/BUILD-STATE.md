# BUILD STATE — brennan-case-manager
Commit: 102384f  |  Branch: master  |  Generated: 2026-08-12 Central (fiftieth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **NOTHING BUILT IN THE APP SINCE**
— 08-09 built a GPU environment OUTSIDE the repo; 08-10 and 08-11 routed docs only. `archive-project-history-by-day.md`

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items. **Check it before rebuilding anything absent. Never drop this line**

## THE LAUNCH PATH — GL-1 go-live floor (RULED 2026-08-11) + CD-1 authorized
- **GO-LIVE MEANS: real case / party / client / SOL data hand-entered into the core app — NOTHING
  MORE.** Floor, in order: **(1) the CD-1 build landed and exercised · (2) gate 1 Supabase Pro ·
  (3) gate 9 production SMTP · (4) gate 3 RLS tested INCLUDING the slice's new tables · (5) gates
  re-check session + instructions v15.** Then real matters enter. Full text: `Go_Live_Gates.md`
- **Gates 7 and 8 do NOT block the floor** (their own triggers are the first real EOB / first real
  AnalysisRun) — **so billing analysis on real data stays DEFERRED past go-live.** **The form engine
  is EXCLUDED from the floor** — drafting continues via the skill; the engine upgrades a live system
- **GATE 2 READS AS MULTI-USER ONLY** (ruled 08-11, clarified by appended note, original text
  untouched): the security review gates the multi-user phase. **Solo live use proceeds without it**
- **THE NEXT BUILD SLICE IS NAMED AND AUTHORIZED: the CD-1 directory build** —
  **`docs/specs/cd1-build-slice.md`** (scope, OUTs, Michael's authorization). **NOT STARTED.** It is
  a separate, deliberate Code session; the queue runner is barred from beginning it
- **Design authority stays `docs/specs/contact-directory.md`** (LIVING SPEC, 08-11, every question
  ruled). **THE FORK RESOLVED TO THE SHAPE ALREADY BUILT:** `parties` **IS** the directory,
  `case_parties` stays the roster link, `case_clients` stays parallel, **D-CL2-8 UNTOUCHED**
- **IN (7):** parties evolution (role tags retiring `party_type`, aliases, deceased) · `case_parties`
  evolution (capacity + 4 attributes + history, **backfill FLAGS, never guesses**) · roster
  definitions as data, **bank-evidenced case types only** · contact-edges table (CL-1 firewall) ·
  directory UI + scope-label edit surface · **RLS + probe from birth** · **live migration by his hand**
- **OUT:** form engine · IN-2 fact table · merge tooling · **service-story fields** · probate beyond
  the reserved pattern · `/rules` seed. **Outside that scope NOTHING is authorized.** Slice A stays
  WITHDRAWN — this is not its return

## Phase 0 / T3 — environment only, and still blocked
- **PARTLY SPENT 2026-08-09 on the P1**: WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA on
  **sm_120**, **outside the repo** at `~/phase0` — `phase0-environment-standup-2026-08-09.md`.
  **Stage 1 SCORING IS HELD, NO SCORECARD EXISTS**; Stage 2 untouched; **T4 unauthorized**. Weights
  fit but that **does NOT retire sequential loading**. The 13 pilot transcripts are
  `src/routing/__tests__/pilot/` fixtures; Stage 1 owes the full-precision compare
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack; **no
  substitute audio** (08-09 exception). **His hand (H4): stage the 13 recordings into `..\data`** —
  **re-checked this refresh: `C:\Users\Brennan\data` DOES NOT EXIST here.** **AND THE KICKOFF DOC IS
  GONE (KICK-1)**, never git-tracked, and it is that authorization's **authoritative text**: **until
  Michael locates it or re-issues, T3 WORK IS UNAUTHORIZED**

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /cases — case list; compact statute-worklist card (the de facto dashboard); /cases/:id — case detail, tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /cases/new — new-case form (types, auto file numbers); /cases/new/oaa — OAA order upload → draft review → Create Matter, charges as child records
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1); /notes — office notes, per-transcript detail w/ participants/tags; /parties — directory + new/edit forms, masked phones, combobox pickers; /benchmarks — Medicare PFS CSV import
- /diagnostics — database + RLS probe (Supabase only), evidence not gospel; /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, worklist card
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
  `medical_bills` and `analysis_runs`. **`cases.statute_of_limitations` IS DROPPED** — the case shows
  the earliest across clients **not yet disbursed**; `disbursed_at` is a marker only. **Single-client
  files click as before** (D-CL2-7): no selector, limitations **writes THROUGH**; two+ → read-only
- Medicare/Medicaid live on the client; occurrence flags (trucking, product, government defendant,
  death, **minor/incapacitated**) stay FILE-level **by ruling — do not "fix" minor/incapacitated to
  the client.** **No client-role party = FLAGGED** (`case_client_flags`), orphaned limitations date
  **PRESERVED on the flag**. **D-CL2-3: BILLING RATE IS PER CLIENT** — no schema

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter interface — every feature works in both modes. Seeds fictional; **store v10**, v9→v10 migrates **FORWARD in place**
- **`npm run dev:demo`** runs demo mode past a real `.env`; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then the CL-2 migration that night. **34 tables**
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing by
  design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is NOT set: every new table must carry its own GRANT or it is unreachable** — copy CL-2's migration. **The CD-1 slice's new tables inherit this — it is why RLS+grants are IN from birth**
- **No case-event/CE table, no time_entries, no claims, no `case_links`, and no contact-directory
  table beyond `parties` itself.** Health **re-run this refresh: 232 tests pass, build + lint clean**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths. PRESENT
  BUT UNTESTED: every other policy-bearing write path** — an inference. **GL-1 item 4 makes it a gate**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS result.
  Probe covers **34** tables; **keep it in step with the schema** or a missing GRANT hides

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND CL-2 — everything
  written 2026-07-28, live database included, was fictional. **All of `Go_Live_Gates.md` applies**
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there.
  **/statutes in demo mode never touches Supabase** — fixture chapters only
- **Benchmarks import reads `..\data\pfs\` — NOT present on the machine that ran this refresh**
  (re-checked `C:\Users\Brennan\data`; it lives on the other machine). **Outlook push WORKS as of
  2026-07-26 but ONLY event CREATION is exercised** — edit/cancel unverified; demo events only
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual.
  Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying itemized
  bills is a VIABILITY issue** (Michael). Playbook engine NOT built; generated docs and code mappings
  do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN, NOT fixed**
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION HELD**
  until the ladder pass names the destination. **Do not touch the case-type tree or ladder.** No
  probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE: specified-not-built, NOT named, NOT authorized — and NOTHING GATES ITS NAMING.**
  **FE-4–FE-7 RULED 08-11 at `form-engine.md` §13** (versioned definitions · facial subpart
  detection · packaging with definitions repeated in full · §13.4 distillation queue, three
  candidates **queued**). FE-1 SUPERSEDED by CD-1; **FE-2 RE-PARKED to the INTAKE PIPELINE**;
  **FE-3 CLOSED 08-12** (§8 read in full; its example strings generalized, ruling content intact);
  **FE-8–FE-12 stay OPEN but NON-GATING (#54)**, ruled at the engine's slice-scoping session
- `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT, not code** — **now v2** (landed 08-11, authored design-side under the upgrade protocol; **Code must still never edit it**)
- Time tracker: draft only. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only
  (captures e+f NOT folded; register H1–H83). **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be
  **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6)
- **REGISTRY — read both halves.** **DOCS: TWENTY entries VERIFIED** (Michael) in
  `legal-rule-registry-discovery-and-carrier-duties.md` (TRCP discovery + Lab. Code § 406.033 + four
  FMCSR; TRCP 152, TRCP 194 expanded, CPRC §§ 17.024/.044/.062, TTCA § 101.106, FTCA, Prop. Code
  ch. 142). **`/rules` SEED ALL UNVERIFIED**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **DT-1 IS IN FORCE; instructions v15 pasted 08-11, v16 drafted 08-12 awaiting your paste.** Stamps use
  YOUR Central wall clock. The #49 batch's **08-12** stamps stay **LEFT ALONE**; **NOT retroactive**
- **PRACTICE-PROJECT CHANNEL IS NOW THREE: CIVIL LIT + CRIM DEFENSE + PROBATE** (probate ruled
  08-12 — every practice area now has a privileged home; REQ-1 extended to each). New probate matters
  are CHATS inside PROBATE; **two grandfathered matter workspaces** (generic by design, never named
  build-side) reach the build side by ONE path: **PROBATE's client-clean REQ-CAPTUREs**. **Your hand:
  create CRIM DEFENSE (v1 + the Uvalde instructions — K-5's home, never the repo) and PROBATE (v1 +
  the carry snippet into each workspace); paste v16 here**
- **YOUR HAND, THE LAUNCH PATH IN ORDER: fire the CD-1 build session** (spec + slice doc on screen)
  → **gate 1 Supabase Pro** → **gate 9 production SMTP** → gate 3 RLS test → gates re-check + v15
- **ALSO YOURS: re-upload SKILL.md v2** as the claude.ai skill copy (v2 is at HEAD; the #45
  hand-upload item was consolidated INTO SK-v2 per QR-1 — one home, text moved not deleted) · **the
  two sync-picker clicks**, `docs/skills/` (Q-3) and `docs/templates/` · **naming the form-engine
  slice** once the CD-1 build lands. **Both REQ-1 captures are filed and SPENT** as CD-1 input
- **STILL OPEN in the queue (all non-gating):** **FE-8** as-generated retention · **FE-9** family
  drift · **FE-10** format lint · **FE-11** caption-body integrity · **FE-12** provenance · **IN-4**
  (**block-finalized rides it**) · **IN-5** · **WF-1** · **IN-2's EXTRACTION HALF**, Phase-1b gated.
  **FE-8's cite** resolves to nothing — **NOT reconstructed**. **K-5 and FE-3 are CLOSED**
- **ONE MICHAEL CALL OPEN — telemetry posture:** NeMo pulled `wandb`/`sentry-sdk`/OneLogger onto the
  privileged-audio machine (**smoke test RUN 08-09**, tone only). **CL2-AC-1 is DIRECTION-CONFIRMED**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched in the **P15's** gitignored `inbox/`, not this machine's; CORPUS-HOME closed to ARCHIVE, **your hand**. **LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v6** (`docs/prompts/QUEUE-RUNNER.md`, the **ONLY full copy**). **Your hand: the P15 user-level copy deletion** (P1 ABSENT). **H-series (log #44) + SAT-1 / two-sweep open; H IDs COLLIDE with heartbeat H1–H83**
- **#36's routing is CLEARED design-side (log #37).** The carried **#31–#33 material is still UNREVIEWED**, as is **#37–#57's own routing** — do not copy the #36 clearance forward
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through #57 (**probate's home never had a row there** — #57 is its record; none was created). **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`.** Client model: design doc §10. FOLD PENDING: captures e+f into case-heartbeat-design.md §8. Carried: no law-change ledger, Outlook unreviewed
