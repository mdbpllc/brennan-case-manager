# BUILD STATE — brennan-case-manager
Commit: f9e30c8  |  Branch: master  |  Generated: 2026-08-12 Central (fifty-sixth refresh)

**Practice areas: PI / civil litigation / criminal defense / probate.** **CL-2 IS BUILT, MIGRATED
LIVE, AND WALKED (2026-07-28)**; auth (§5A) landed the same day. **CD-1 IS BUILT IN CODE 08-12 —
SIX OF SEVEN SLICE ITEMS, FIXTURE DATA ONLY; THE LIVE MIGRATION IS UNRUN AND IS YOURS.**
`archive-project-history-by-day.md`

- **Anti-resurrection ledger: `docs/specs/anti-resurrection-ledger.md`** — closed, withdrawn, and
  deliberately-not-built items. **Check it before rebuilding anything absent. Never drop this line**

## THE LAUNCH PATH — GL-1 go-live floor (RULED 2026-08-11) + CD-1 authorized
- **GO-LIVE MEANS: real case / party / client / SOL data hand-entered into the core app — NOTHING
  MORE.** Floor, in order: **(1) the CD-1 build landed and exercised · (2) gate 1 Supabase Pro ·
  (3) gate 9 production SMTP · (4) gate 3 RLS tested INCLUDING the slice's new tables · (5) gates
  re-check session + instructions v16.** Then real matters enter. Full text: `Go_Live_Gates.md`
- **Gates 7 and 8 do NOT block the floor** (their triggers are the first real EOB / AnalysisRun) —
  **billing analysis on real data stays DEFERRED past go-live.** **The form engine is EXCLUDED from
  the floor** — drafting continues via the skill; the engine upgrades a live system
- **GATE 2 READS AS MULTI-USER ONLY** (ruled 08-11, clarified by appended note, original text
  untouched): the security review gates the multi-user phase. **Solo live use proceeds without it**
- **CD-1 BUILT 08-12 (log #61), items 1–6 — code complete, exercised, fixture data only.** Role
  tags (vocabulary DERIVED from the party registry so it cannot drift) · typed aliases + the
  multi-match FLAG · deceased · the four roster attributes · capacity on the LINK · roster history ·
  roster definitions as data with side sets · contact edges · directory + roster UI · **RLS, GRANTs,
  and probe extended in the SAME commit as the tables.** `party_type` **RETAINED**, not dropped — it
  drives registry field rendering; `role_tags[0]` mirrors it
- **ITEM 7 IS YOURS AND IS UNRUN: `db/migrations/2026-08-12-cd1-contact-directory.sql`.** Back up,
  paste ALONE in an empty buffer, **answer its five verification checks IN WORDS.** One check
  **expects a HIGH flag count — a LOW number would mean something was guessed**
- **THE BACKFILL FLAGS MOST CASES, BY DESIGN.** Plaintiff/Defendant map only where the case type's
  side set defines them; function roles derive to null = non-party; **'Client' is FLAGGED** (our
  client is Plaintiff on a civil caption, Accused on a criminal one, and nothing in the record
  decides it). **Demo mode runs the same backfill**, so what you click is what a migration produces
- **Design authority stays `docs/specs/contact-directory.md`** (LIVING SPEC). **THE FORK RESOLVED TO
  THE SHAPE ALREADY BUILT:** `parties` **IS** the directory, `case_parties` stays the roster link,
  `case_clients` stays parallel, **D-CL2-8 UNTOUCHED.** Kickoff prompt kept at
  `docs/prompts/PROMPT-cd1-build-session.md`
- **OUT, and honored:** form engine · IN-2 fact table · merge tooling · **service-story fields**
  (slots carry an unconsumed `servicePathHint` label only) · probate beyond the reserved pattern ·
  `/rules` seed. **No registry change of any kind.** Slice A stays WITHDRAWN — this was not its return
- **`case_links` STILL DOES NOT EXIST — the CL-1 firewall held.** D-CL1 items stay unruled
- **TWO SPEC-VS-CODE GAPS, in `docs/spec-feedback.md`, built around under stated assumptions:** there
  is **no case-type tree to inherit on** (CASE_TYPE_DEFS is flat → inheritance runs practice area →
  case type), and **trucking and UIM/UM are PI FLAGS, not case types** (PR-3 holds the tree shut) →
  they seed as flag-keyed **overlays**. Slots are DATA; reversing is cheap. **Yours to redirect**

## Phase 0 / T3 — environment only, and still blocked
- **PARTLY SPENT 2026-08-09 on the P1**: WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA on **sm_120**, **outside the repo** at `~/phase0` — `phase0-environment-standup-2026-08-09.md`. **Stage 1 SCORING IS HELD, NO SCORECARD EXISTS**; Stage 2 untouched; **T4 unauthorized**. Weights fit but that **does NOT retire sequential loading**. The 13 pilot transcripts are `src/routing/__tests__/pilot/` fixtures; Stage 1 owes the full-precision compare
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack; **no substitute audio** (08-09 exception). **His hand (H4): stage the 13 recordings into `..\data`** — **re-checked this refresh: `C:\Users\Brennan\data` DOES NOT EXIST here.** **AND THE KICKOFF DOC IS GONE (KICK-1)**, never git-tracked, and it is that authorization's **authoritative text**: **until he locates it or re-issues, T3 WORK IS UNAUTHORIZED**

## Screens live (what Michael can click)
- **Sign-in gate — Supabase mode only.** Magic link, no password. Demo mode deliberately ungated
- /cases — case list; compact statute-worklist card (the de facto dashboard); /cases/:id — case detail, tabs URL-driven (/cases/:id/{parties,medical,calendar,transcripts})
- /cases/new — new-case form (types, auto file numbers); /cases/new/oaa — OAA order upload → draft review → Create Matter, charges as child records
- /inbox — transcript staging: upload/import, routing suggestions, confirm-to-file (auto-file OFF, D1); /notes — office notes, per-transcript detail w/ participants/tags; /parties — **contact directory**: role-tag filtering with live counts, alias display + **multi-match flag**, deceased marker, firm-wide edit scope with linked-case count; /benchmarks — Medicare PFS CSV import
- /diagnostics — database + RLS probe (Supabase only), evidence not gospel; /rules — Legal Rule Registry: entries, attorney-only verify, review log, watch flags, worklist card
- /statutes — cite box, browse, keyword search; chapter viewer, Mark-verified pins, refresh-and-diff (A4); /bills — watch targets, tracked bills with B3 lifecycle, statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice. **Limitations date is now CLIENT-scoped — see the client dimension below** |
| Parties | LIVE + CD-1 | **intake roster panel** (slots by expectancy tier, each labelled with the case type or overlay that contributed it; caption sides shown; "Link a contact" scopes the add form to that slot) · **roster-flag card** with Mark-handled · the four attributes shown separately · link/unlink · **Clients — damages scope card (CL-2)** |
| Medical | LIVE — **PI MATTERS ONLY (ruled 08-12)** | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator. **Per-client ledgers once a case has two clients** **Tab hidden on civil-lit and criminal files; `showsMedicalTab()` is the one enforcement point. §1983 civil-rights matters are the other half of that ruling and are NOT implementable — no such case type exists and PR-3 holds the tree shut (spec-feedback). Safety valve: a matter that already HAS bills keeps its tab, so the rule narrows what is OFFERED, never what is REACHABLE.** |
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
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter interface — every feature works in both modes. Seeds fictional; **store v11** (CD-1), v9→v10→v11 chains **FORWARD in place**, backing up at each step
- **`npm run dev:demo`** runs demo mode past a real `.env`; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then CL-2 that night. **36 tables in schema.sql — but the live database is still at 34**: CD-1's two are in the file and in the UNRUN migration
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is NOT set: every new table must carry its own GRANT or it is unreachable.** CD-1's two carry their own, written with the tables
- **No case-event/CE table, no time_entries, no claims, no `case_links`. Nothing exists for the DE
  series** — no response-set, response-item, or escalation-timeline table. Health **re-run this
  refresh: 274 tests pass, build + lint clean**

## RLS, exercised — the distinction matters
- **ACTUALLY CONSULTED:** authenticated SELECT on all API tables; INSERT+DELETE on `parties`,
  `legal_rules`, `glossary_terms`, `watch_targets`; the app's write path; **CL-2's live paths. PRESENT
  BUT UNTESTED: every other policy-bearing write path** — an inference. **GL-1 item 4 makes it a gate**
- **`file_counters` is protected at the PRIVILEGE layer, not by RLS** — its 403 is NOT an RLS result.
  Probe covers **36** tables (CD-1's two added with them); **keep it in step or a missing GRANT hides**

## Known stubs & fakes
- **NO REAL CLIENT DATA HAS EVER ENTERED THE APP.** Still true after auth AND CL-2 — everything
  written 2026-07-28, live database included, was fictional. **All of `Go_Live_Gates.md` applies**
- legiscan-poller + statute-fetch edge functions written, **NOT deployed**. Called auth-blocked, but
  **that diagnosis is incomplete — `service_role` was never granted either**; start there.
  **/statutes in demo mode never touches Supabase** — fixture chapters only
- **Benchmarks import reads `..\data\pfs\` — NOT present on the machine that ran this refresh** (re-checked `C:\Users\Brennan\data`; it lives on the other machine). **Outlook push WORKS as of 2026-07-26 but ONLY event CREATION is exercised** — edit/cancel unverified; demo events only
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual. Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying itemized bills is a VIABILITY issue** (Michael). Playbook engine NOT built; generated docs and code mappings do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN, NOT fixed**
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION HELD**
  until the ladder pass names the destination. **Do not touch the case-type tree or ladder.** No
  probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE — FE-D1 (DISCLOSURES ENGINE) NAMED, SCOPED, AND AUTHORIZED 08-12 (#63); NOT BUILT.** Scope `docs/specs/fe-d1-build-slice.md`; kickoff `docs/prompts/PROMPT-fe-d1-build-session.md`; **yours to fire, Opus, its own session** (the CD-1 pattern — the queue runner is barred). Slice 1 = §§1–6 wizard + §10 substrate + §11.3 skeleton; **NOT "FE-1"** (retired scout; ledger bars reuse). **IN:** FE-10 + FE-12 from birth, FE-8 retention half, FE-15 (disclosures posture), a MINIMAL template editor. **OUT with homes:** FE-9 · FE-11 (**FE-D1's lint does NOT absorb it**) · FE-13 · FE-14 (TRCP 47 gate) · FE-16 · **FE-17 (binding from-birth annotation: rides whichever slice creates the item table)**. **FE-GATING CLOSED** — FE-13–FE-17 took the #54 treatment. §14 placeholder discipline landed; four distillation candidates entered §13.4 (entering ≠ adopting)
- `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT, not code** — **now v2** (landed 08-11, authored design-side under the upgrade protocol; **Code must still never edit it**)
- Time tracker: draft only. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only
  (captures e+f NOT folded; register H1–H83). **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be
  **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6)
- **REGISTRY — THREE files now.** **TWENTY VERIFIED** (Michael) in `legal-rule-registry-discovery-and-carrier-duties.md`; five took **second observations** 08-12, and **three wording expansions there are FLAGGED, NOT ADOPTED** (TRCP 194's span, 193.3, 192.3(f)) — verification attaches to wording. **TWENTY-SEVEN UNVERIFIED** in `legal-rule-registry-discovery-enforcement-and-pleading.md` (discovery enforcement + UDJA/venue/pleading; **six WL/slip cites flagged for reporter-cite check, none corrected**). A new file, not a fold-in, because the verified file's status header would have broken — **PLACEMENT CONFIRMED by Michael 08-12; that flag is CLOSED.** **Count reconciled at HEAD 08-12 on commission: 27 entries = 22 deficiency + 5 UIM, one proposition each** (3 entries cite two cases, so 30 authorities). The sibling's third-pass note read "twenty-six" — **Code's own wrong figure, corrected in place with a dated note.** **SIX MORE UNVERIFIED 08-12** in `legal-rule-registry-criminal-plea-and-costs.md` (criminal classification/plea/costs) — **backlog 27 → 33**, and **two of those six carry NO CITE**: the capture stated them bare and supplying a cite is a verification act, so it is YOURS. They **hard-gate CR-10**. **`/rules` SEED ALL UNVERIFIED**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **DT-1 IS IN FORCE; v16 is the live instructions version** (verified in force design-side 08-12,
  first fresh session on it). Stamps use YOUR Central wall clock. The #49 batch's **08-12** stamps
  stay **LEFT ALONE**; **NOT retroactive**
- **PRACTICE-PROJECT CHANNEL IS NOW THREE: CIVIL LIT + CRIM DEFENSE + PROBATE** (probate ruled 08-12; REQ-1 extended to each). New probate matters are CHATS inside PROBATE; **two grandfathered matter workspaces** (generic by design, never named build-side) reach the build side by ONE path: **PROBATE's client-clean REQ-CAPTUREs**. **CRIM DEFENSE EVIDENTLY EXISTS** — the 08-12 Uvalde capture originates there. Whether v1 + the Uvalde instructions (K-5's home, never the repo) were pasted into it is **not visible to Code**, so that half stays open. **Your hand: confirm CRIM DEFENSE's paste-state; create PROBATE (v1 + the carry snippet into each workspace)**
- **SIX REQ-1 CAPTURES ARE NOW FILED** at `docs/specs/REQ-CAPTURE_*`: trucking, roster-mining, attorney-edit, **UIM-UDJA transform**, **deficiency-handling**, **Uvalde docket-worksheet** (last three new 08-12). First three SPENT as CD-1 input; UIM + deficiency seeded the **DE series** and eleven durable IDs
- **UVALDE CAPTURE RECONCILED 08-12 (#62) — no capture in the repo is unreconciled now.** Group ruling; the **CR series is CREATED** (criminal-side requirements, the WF-1/DE precedent): **CR-1–CR-11** plus a **binding black-and-white print constraint** governing all worksheet rendering. **CR-10 (plea-paperwork signing checklist) is HARD-GATED** on the six new registry entries. **COLLISION FLAGGED, NOT RENAMED:** `CR-3` also means the Texas crash-report form at IN-2 — you were asked and chose CR; cite as "CR-3 (criminal requirement)" vs "the CR-3 crash report"
- **YOUR HAND, THE LAUNCH PATH IN ORDER: run the CD-1 migration** (`db/migrations/2026-08-12-cd1-contact-directory.sql`; back up, paste alone, answer its five checks in words) → **gate 1 Supabase Pro** → **gate 9 production SMTP** → gate 3 RLS test **including the two new tables** → gates re-check + v16
- **ALSO YOURS: re-upload SKILL.md v2** (#45 consolidated INTO SK-v2 per QR-1) · **the two sync-picker clicks**, `docs/skills/` (Q-3) and `docs/templates/` · **name the form-engine slice — now unblocked**
- **DE SERIES EXISTS AS OF 08-12** — deficiency enforcement, ruled into existence by you (WF-1 precedent). **DE-1** taxonomy-as-data (absorbs one-store-many-renderers and Bates evidence refs) and **DE-2** the conferral/escalation timeline, MANUAL triggers per Q-6. **They are the parked heartbeat Part-6 engine's HOME, not its green light. Nothing built**
- **REQ-10 placeholder discipline: CONFIRMED AS CARRY 08-12** — the content route into `form-engine.md` rides whichever session next amends that spec (likely the engine's slice-scoping session). **Nothing owed now; the edit is design's, never Code's.** It now has the queue row it lacked
- **TELEMETRY RULED 08-12 (#63): OFFLINE LOCKDOWN.** `wandb`/`sentry-sdk`/OneLogger stay installed but are forced offline **machine-wide BEFORE any privileged audio is processed** — recipe at `docs/gpu-telemetry-offline.md`. **Your hand, on the GPU machine; closes when you report verification 3 passed.** **EMAIL-WORKFLOW DOC ADOPTED** (#63) at `docs/specs/email-workflow-requirements.md` — seven pipelines take **WF-2–WF-8**, every one gated (WF-5 doubly: money machinery unruled); that long-standing carry CLOSES. **CL2-AC-1 is DIRECTION-CONFIRMED**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched in the **P15's** gitignored `inbox/`, not this machine's; CORPUS-HOME closed to ARCHIVE, **your hand**. **LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v6** (`docs/prompts/QUEUE-RUNNER.md`, the **ONLY full copy**). **Your hand: the P15 user-level copy deletion** (P1 ABSENT). **H-series (log #44) + SAT-1 / two-sweep open; H IDs COLLIDE with heartbeat H1–H83**
- **NEW: `docs/reference/` EXISTS AND HOLDS A BINARY — the first in `docs/`.** `CR3-code-sheet-2023.pdf` (Form CR-3CS 4/1/2023, blank public TxDOT code list; verified client-clean by ToUnicode decode + a zero-hit scan for SSNs/dates/phones/VINs/cause numbers/addresses before it was committed). Synthesis at `docs/specs/cr3-field-code-map.md`, **PROPOSED input for IN-2/intake — nothing built.** Its load-bearing requirement: crash-report code tables are **VERSIONED external vocabularies**, so extraction must store **(code, decoded label, code-sheet version)**. **YOUR CLICK: exclude `docs/reference/` at the sync picker** — `docs/` syncs wholesale, and raw source in the working set is what that policy exists to prevent (ruled 08-12)
- **The carried #31–#33 material is still UNREVIEWED**, as is **#37–#64's own routing** — do not copy #36's clearance (log #37) forward. **#58 was VERIFIED design-side post-Sync, line by line**
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through **#64** (build entry #61 is Code's own). #58 added the DE heading, **CL-3 · CD-3 · FE-13–FE-17 · IN-6 · IN-7**, the
  **FE-gating** question, four distillation candidates, and a **27-entry registry verification
  backlog**; #59 added the Uvalde capture's row at §5; **#60 closed the placement flag and gave the
  REQ-10 carry the row it never had.** **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `model-routing-plan.md`; `future-modules-capture-2026-07-28.md`.** Client model: design doc §10. FOLD PENDING: captures e+f into case-heartbeat-design.md §8. Carried: no law-change ledger, Outlook unreviewed
