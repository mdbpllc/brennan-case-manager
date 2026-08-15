# BUILD STATE — brennan-case-manager
Commit: 5af47a1  |  Branch: master  |  Generated: 2026-08-14 Central (sixty-fourth refresh)
*`5af47a1` is the batch commit this snapshot DESCRIBES; the refresh itself rides the commits after
it, so the pushed SHA you are told is expected to be higher. Nothing here is stale on that account.*
*Line counts in this record are NON-BLANK lines (ruled 08-13, #67; now also stated in CLAUDE.md);
raw counts are labeled "raw". This file's 150-line cap is a non-blank cap.*

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
  re-check session + instructions v17.** Then real matters enter. Full text: `Go_Live_Gates.md`
- **Gates 7 and 8 do NOT block the floor** (their triggers are the first real EOB / AnalysisRun) —
  **billing analysis on real data stays DEFERRED past go-live.** **The form engine is EXCLUDED from
  the floor** — drafting continues via the skill; the engine upgrades a live system
- **GATE 2 READS AS MULTI-USER ONLY** (ruled 08-11, clarified by appended note, original text
  untouched): the security review gates the multi-user phase. **Solo live use proceeds without it**
- **CD-1 BUILT 08-12 (log #61), items 1–6 — code complete, exercised, fixture data only.** Role
  tags (vocabulary DERIVED from the party registry so it cannot drift) · typed aliases + the
  multi-match FLAG · deceased · the four roster attributes · capacity on the LINK · roster history ·
  roster definitions as data with side sets · contact edges · directory + roster UI · **RLS, GRANTs,
  and probe extended in the SAME commit as the tables.** `party_type` **RETAINED**, not dropped
- **ITEM 7 IS YOURS AND IS UNRUN: `db/migrations/2026-08-12-cd1-contact-directory.sql`.** Back up,
  paste ALONE in an empty buffer, **answer its five verification checks IN WORDS.** One check
  **expects a HIGH flag count — a LOW number would mean something was guessed**
- **THE BACKFILL FLAGS MOST CASES, BY DESIGN.** Plaintiff/Defendant map only where the case type's
  side set defines them; function roles derive to null = non-party; **'Client' is FLAGGED** (our
  client is Plaintiff on a civil caption, Accused on a criminal one, and nothing in the record
  decides it). **Demo mode runs the same backfill**, so what you click is what a migration produces
- **Design authority stays `docs/specs/contact-directory.md`** (LIVING SPEC). **THE FORK RESOLVED TO
  THE SHAPE ALREADY BUILT:** `parties` **IS** the directory, `case_parties` stays the roster link,
  `case_clients` stays parallel, **D-CL2-8 UNTOUCHED.** Kickoff `docs/prompts/PROMPT-cd1-build-session.md`
- **OUT, and honored:** form engine · IN-2 fact table · merge tooling · **service-story fields**
  (slots carry an unconsumed `servicePathHint` label only) · probate beyond the reserved pattern ·
  `/rules` seed. **No registry change of any kind.** Slice A stays WITHDRAWN
- **`case_links` STILL DOES NOT EXIST — the CL-1 firewall held.** D-CL1 items stay unruled
- **TWO SPEC-VS-CODE GAPS, in `docs/spec-feedback.md`, built around under stated assumptions:** there
  is **no case-type tree to inherit on** (CASE_TYPE_DEFS is flat → inheritance runs practice area →
  case type), and **trucking and UIM/UM are PI FLAGS, not case types** (PR-3 holds the tree shut) →
  they seed as flag-keyed **overlays**. Slots are DATA; reversing is cheap. **Yours to redirect**

## Phase 0 / T3 — environment only, and still blocked
- **PARTLY SPENT 2026-08-09 on the P1**: WSL2, torch cu128, NeMo 3.0.0, both checkpoints, CUDA on **sm_120**, **outside the repo** at `~/phase0` — `phase0-environment-standup-2026-08-09.md`. **Stage 1 SCORING IS HELD, NO SCORECARD EXISTS**; Stage 2 untouched; **T4 unauthorized**. Weights fit but that **does NOT retire sequential loading**. The 13 pilot transcripts are `src/routing/__tests__/pilot/` fixtures; Stage 1 owes the full-precision compare
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack; **no substitute audio** (08-09 exception). **His hand (HK-4): stage the 13 recordings into `..\data`** — **re-checked this refresh against the declared paths only: `C:\Users\Brennan\data` DOES NOT EXIST here.** **AND THE KICKOFF DOC IS GONE (KICK-1)**, never git-tracked, and it is that authorization's **authoritative text**: **until he locates it or re-issues, T3 WORK IS UNAUTHORIZED**
- **TELEMETRY LOCKDOWN IS NOT IN PLACE — CONFIRMED NOT SET 08-13 (#66).** Michael ran the self-check; **both machine-scope variables came back EMPTY.** Recipe: `docs/gpu-telemetry-offline.md`. **Still his hand, on the GPU machine; closes only when he reports verification 3 passed. No privileged audio before then**

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
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice. **Limitations date is now CLIENT-scoped** |
| Parties | LIVE + CD-1 | **intake roster panel** (slots by expectancy tier, each labelled with the case type or overlay that contributed it; caption sides shown; "Link a contact" scopes the add form to that slot) · **roster-flag card** with Mark-handled · the four attributes shown separately · link/unlink · **Clients — damages scope card (CL-2)** |
| Medical | LIVE — **PI MATTERS ONLY (ruled 08-12)** | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator. **Per-client ledgers once a case has two clients** **Tab hidden on civil-lit and criminal files; `showsMedicalTab()` is the one enforcement point. §1983 civil-rights matters are the other half of that ruling and are NOT implementable — no such case type exists and PR-3 holds the tree shut. Safety valve: a matter that already HAS bills keeps its tab, so the rule narrows what is OFFERED, never what is REACHABLE.** |
| Calendar | LIVE + Outlook push WORKING, ONE DEFECT | create/edit/cancel all EXERCISED against live Graph 08-13. **Cancel deletes; edit patches — EXCEPT the FIRST edit of a connect-pushed event, which DUPLICATES it in Outlook and orphans the original.** Reproduced on two events; cause undetermined, no fix. `outlook-edit-cancel-exercise-2026-08-13.md` |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Client dimension (CL-2, built 2026-07-28 — migrated live, walked)
**The case owns the occurrence and liability; the CLIENT owns the damages.**
- `case_clients` is **PARALLEL to `case_parties`, not a promotion** (D-CL2-8); `client_id` sits on
  `medical_bills` and `analysis_runs`. **`cases.statute_of_limitations` IS DROPPED** — the case shows
  the earliest across clients **not yet disbursed**. **Single-client files click as before**
  (D-CL2-7): no selector, limitations **writes THROUGH**; two+ → read-only
- Medicare/Medicaid live on the client; occurrence flags (trucking, product, government defendant,
  death, **minor/incapacitated**) stay FILE-level **by ruling — do not "fix" minor/incapacitated to
  the client.** **No client-role party = FLAGGED** (`case_client_flags`), orphaned limitations date
  **PRESERVED on the flag**. **D-CL2-3: BILLING RATE IS PER CLIENT** — no schema. **D-CL2-3a RULED
  08-13: the fee affidavit carries the rate of the client whose claim carries the FEE DEMAND;
  multi-client demands get per-client exhibits. Design status — the time tracker stays parked**
- **CLAUDE.md's guard language on this slice is annotated as historical** (drift finding #9, #68).
  **This file is the authority on what is built — that is exactly why the sync excludes `src/`**

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter interface — every feature works in both modes. Seeds fictional; **store v11** (CD-1), v9→v10→v11 chains **FORWARD in place**, backing up at each step
- **`npm run dev:demo`** runs demo mode past a real `.env`; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then CL-2 that night. **36 tables in schema.sql — but the live database is still at 34**: CD-1's two are in the file and in the UNRUN migration
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is NOT set: every new table must carry its own GRANT or it is unreachable.** CD-1's two carry their own
- **No case-event/CE table, no time_entries, no claims, no `case_links`. Nothing exists for the DE
  series** — no response-set, response-item, or escalation-timeline table. **Nothing exists for a
  deadline engine either.** Health **last measured at #68: 278 tests pass (23 files), build + lint
  clean; the two refreshes since, this one included, changed DOCS ONLY**

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
- **Benchmarks import reads `..\data\pfs\` — NOT present on the machine that ran this refresh** (re-checked; it lives on the other machine). **Outlook push: creation, EDIT and CANCEL all exercised live 08-13** (Michael's hand, his browser, demo events only). **Cancel propagates; edit patches cleanly — but the FIRST edit after a connect-time push CREATES A DUPLICATE and strands the original, permanently (the app loses its id).** Systematic, reproduced on a clean control. **Cause undetermined and NOT guessed; no fix.** Repro: `outlook-edit-cancel-exercise-2026-08-13.md`
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual. Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying itemized bills is a VIABILITY issue** (Michael) — **and OBS-1 now asks whether that capture row folds into Phase 1b's scope; unruled**. Playbook engine NOT built; generated docs and code mappings do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN, NOT fixed**
- **NOTHING FROM THE 08-13 RULING RUN IS BUILT.** Demographics capture, the cause-number-pending flag, staged deposition threads, payer threads arming at intake, per-(case, party) deadlines, and the registry's `precedential_status` field are **DESIGN STATUS ONLY** — no field, no column, no code
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION HELD**
  until the ladder pass names the destination. **Do not touch the case-type tree or ladder.** No
  probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE — FE-D1 (DISCLOSURES ENGINE) NAMED, SCOPED, AND AUTHORIZED 08-12 (#63); NOT BUILT.** Scope `docs/specs/fe-d1-build-slice.md`; kickoff `docs/prompts/PROMPT-fe-d1-build-session.md`; **yours to fire, Opus, its own session** (the CD-1 pattern — the queue runner is barred). Slice 1 = §§1–6 wizard + §10 substrate + §11.3 skeleton; **NOT "FE-1"** (retired scout). **IN:** FE-10 + FE-12 from birth, FE-8 retention half, FE-15, a MINIMAL template editor. **OUT with homes:** FE-9 · FE-11 · FE-13 · **FE-14 (TRCP 47 gate — see below, its blocker CHANGED KIND this refresh)** · FE-16 · FE-17
- `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT, not code** — **now v2** (landed 08-11, authored design-side; **Code must still never edit it**)
- Time tracker: draft only — **its §5 export hold LIFTS on D-CL2-3a, but the tracker stays parked behind CE1**. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only (captures e+f NOT folded; register H1–H83). **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6). **Descrybe is OUT by ruling 08-13**

## The registry — FOUR files, and the count changed only here
- **THE FILE COUNT WAS WRONG AND IS CORRECTED HERE ONLY: there are FOUR `legal-rule-registry-*` files, not three.** The fourth, `legal-rule-registry-draft-entries-medical-billing.md`, is headed **ALL ENTRIES UNVERIFIED** and its entries are **outside the backlog of 34**. Whether that is deliberate is **Q-STAT-2, Michael's — no count was changed in any registry file, and the BACKLOG STAYS 34**
- **TWENTY VERIFIED** (Michael) in `legal-rule-registry-discovery-and-carrier-duties.md`; **three wording expansions there are FLAGGED, NOT ADOPTED** (TRCP 194's span, 193.3, 192.3(f)) — verification attaches to wording. **TWENTY-SEVEN UNVERIFIED** in `legal-rule-registry-discovery-enforcement-and-pleading.md` (**six WL/slip cites flagged, none corrected**). **SEVEN UNVERIFIED** in `legal-rule-registry-criminal-plea-and-costs.md` — six as filed, then **former entry 4 SPLIT by your ruling 08-13 into 4a** (per-cause costs, still CITE-LESS) **and 4b** (art. 102.073). Entry 3 and 4a carry NO CITE — supplying one is YOUR act. **`/rules` SEED ALL UNVERIFIED**
- **THE RETRIEVAL GAP IS CLOSED, AND THE FIGURE WAS WRONG TOO (#76).** The rows reading `RETRIEVAL: NOT RUN` numbered **21, not the 20 this file previously stated** — entries 1–13, 23, 25, 26, 27, 28, 29, 33, 34 — and **all 21 are now retrieved** against the official corpus, plus entry 32's official-source read: 22 looks owed, 22 run. **RETRIEVAL IS NOT VERIFICATION. No status moved and the BACKLOG STAYS 34**
- **EIGHTEEN OF THE TWENTY-ONE PROPOSITIONS DIVERGE from the operative text; FOUR CHANGE WHAT THE ENTRY MEANS** — **TRCP 193.2(e)** (the waiver limb is stated **backwards**, and that entry is DE-1's named linchpin), **196.2(b)** (a third permitted response that **does not exist in the rule**), **215.1(d)** (**"shall… unless," not "may"**, plus a reciprocal against a denied movant the entry omits), **47(b)–(c)** (the "all other relief" half is **47(d)**, and a clause **barring discovery until a non-complying pleading is amended** was absent). **PROPOSED replacement wording exists for those four ONLY (staged file §9), ADOPTED FOR NONE** — route (c), your ruling 08-14. The other fourteen stay as flags you resolve at verification (Q-STAT-6)
- **ENTRY 27 IS NO LONGER TEXT PARTIAL, so FE-14's blocker CHANGED KIND: it is a VERIFICATION act now, not a retrieval gap.** The picklist text exists — **five enumerable options, not "fixed brackets"** — and carries a requirement the form engine did not know about: non-compliance with 47(c) **bars discovery** until amendment. **Nothing built, nothing authorized**
- **INSURANCE: absence CONFIRMED by full-text read** — zero occurrences of "Insurance Code", "Tex. Ins.", "Chapter 541", "Chapter 542" or "prompt pay" across **all four** registry files ("carrier duties" in that filename means **motor** carrier). The sweep produced **20 CANDIDATES (C-1…C-20), NONE RULED, and NO FIFTH REGISTRY FILE WAS CREATED** (Q-STAT-5). **C-19 (61-day pre-suit notice) and C-20 (2-year limitations, extendable 180 days) are deadline material with a build consequence independent of the registry**
- **REGISTRY RESEARCH SUPPORT — FIVE DOCS, ALL PROPOSED, NOTHING VERIFIED, NO REGISTRY FILE TOUCHED BY ANY OF THEM:** `registry-cite-check-2026-08-13.md` · `registry-verification-workbook-2026-08-13.md` · `registry-citator-pass-2026-08-13.md` · **NEW `statute-pass-registry-retrieval-2026-08-14.md`** (574 non-blank; its §3 carries the **corrected A-for-space normalizer** and the rule that matters more — *transform only what is characterized; REPORT anything else, never guess* — after the published one proved wrong in both directions) · **NEW `deadline-engine-service-and-response-2026-08-14.md`** (below). **Net from the citator pass: 5 need a look** (Ochoa, Collins, Irwin, Alford, Castillo), **5 need none for cite or majority** (*each still needs a commercial citator; FLP is not one*)
- **V-4–V-8 ALL RULED 08-13 (#73) — AND NONE OF IT IS EXECUTED.** V-4 keep as two; V-5 split all three two-case entries — **BACKLOG BECOMES 37 WHEN EXECUTED; it is 34 in the files today**; V-6 both criminal entries stay, reworded; V-7 narrow entry 23; V-8 record all three FLP hazards. **V-9 OPEN and sharp: the *Irwin* class is a state in which CLAUDE.md's BINDING majority-opinion rule CANNOT RUN.** Amending a binding rule is YOURS

## The deadline memo (#75) — filed, contradicting the skeleton on purpose
- **`docs/specs/deadline-engine-service-and-response-2026-08-14.md`, 298 non-blank, PROPOSED, research support only, NOTHING VERIFIED.** Seven propositions (P-1..P-7), a per-defendant computation model, service-method effects, Level 1/2/3 interactions. **No deadline engine is in the build queue and nothing here is authorized**
- **RULE TEXT NOW HAS A CLEAN-AUTHORITY SOURCE — a first for this project.** Every quotation is from `Civil\texas-rules-of-civil-procedure July 2026.pdf` in **your** Knowledge Repo, read locally, not from RAG and not from amendment-order redlines whose text layer merges struck and inserted words. **The grant is design-side, your hand, and session-scoped exactly like HK-7**
- **THE HEADLINE IS A PRACTICE ITEM BEFORE IT IS A DESIGN ITEM: on the July 2026 text the 50-day discovery-response extension is FAMILY-CODE-ONLY**, and `trcp-deadline-skeleton-2026-03-01.md` §5 states the opposite relationship. **On that reading a PI or civil-lit defendant served before its answer is due has a FLAT 30 DAYS**, with 198.2(c) making deemed admission automatic. **The skeleton was NOT edited — the contradiction is left visible because resolving it is your verification act.** No verified registry entry is contradicted
- Also open from it: **no registry entry for TRCP 21a exists anywhere** though its added-days rule is per-party and per-method; **Rule 195.2's "30 days after the request is served" floor is GONE**, so a designation function built on the 2021 text computes too late a date; and **190.4(b)(2) now allows a Level 3 send-by period, phase-scoped** — a different computation SHAPE
- **Its five questions carry NO durable IDs.** Minting `DL-1` was forbidden by the packet, `V-1x` collides with the V10–V17 residuals, `DE` is the deficiency series — so they are filed packet-local and **ID-DL-1 asks you which series they belong to. Two words close it**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **v17 IS DRAFTED, DELIVERED, REVISED, AND NOT YET PASTED — YOUR HAND. PASTE THE REVISED FILE (08-13 evening); the earlier same-day download is SUPERSEDED.** It carries Descrybe-out, SAT-1, the §7.2 model-routing clause (closing **Q-5** and **HK-2**), the **HK-5** rule, and the **QR-3 v7 ahead-stop** + line-count convention. **If you rule Q-STAT-1, trigger #3 fires and v18 is owed the same day.** DT-1 remains in force
- **CHAT-DISPATCH: TASKS 1–6 COMPLETE, per both packets in this batch** — 1+2 reached Code at #72, 3 at #74, **Task 6 is the deadline memo at #75**; Tasks 4 and 5 are reported complete design-side (no separate packet reached Code for them). **TASKS 7–19 NOT STARTED — resume at Task 7.** **HK-7 STAYS OPEN: satisfied for one session again at #75/#76, NOT closed** — the grants are session-scoped, so every remaining task needing full-file reads (17 and 18 among them) needs them re-granted. **FLP throttles at 5 req/min**
- **BOTH STANDING SWEEPS ARE CLOSED (#68)** — a pass, not a standing guarantee; re-running after a ruling batch is yours to order. Open from them: **OBS-1**
- **CD-2 ROLE MINING PASS FILED (#74)** — `cd2-role-mining-pass-2026-08-13.md`, 350 non-blank, PROPOSED, DATA PREP ONLY. **CD-2 is NOT an open design question** — it is a coverage audit of a ruled taxonomy. **The honest gap: `src/domain/partyRegistry.ts` and `src/domain/roster.ts` were NOT read**, so ~60 rows carry `TAG-CHECK: NOT RUN`. **Ten questions became CD-4 – CD-13**
- **PRACTICE-PROJECT CHANNEL IS THREE: CIVIL LIT + CRIM DEFENSE + PROBATE** (V-3, 08-13). New probate matters are CHATS inside PROBATE; the two grandfathered matter workspaces reach the build side by ONE path: **PROBATE's client-clean REQ-CAPTUREs**
- **SIX REQ-1 CAPTURES ARE FILED** at `docs/specs/REQ-CAPTURE_*`. First three SPENT as CD-1 input; UIM + deficiency seeded the **DE series**. **No capture in the repo is unreconciled.** **CR SERIES CR-1–CR-11** plus a **binding black-and-white print constraint**; **CR-10 is HARD-GATED** on the criminal registry entries. **COLLISION FLAGGED, NOT RENAMED:** `CR-3` also means the TxDOT crash-report form at IN-2
- **YOUR HAND, THE LAUNCH PATH IN ORDER: run the CD-1 migration** (back up, paste alone, answer its five checks in words) → **gate 1 Supabase Pro** → **gate 9 production SMTP** → gate 3 RLS test **including the two new tables** → gates re-check + v17
- **ALSO YOURS: paste the revised v17** · **re-upload SKILL.md v2** (SK-v2) · **the sync-picker clicks** (Q-3) · **telemetry lockdown on the P1** · **HK-6** · **HK-7 re-grant each session** · **V-2, Ochoa first** · **V-9** · **OBS-1** · **CD-4 – CD-13** · **NEW: Q-STAT-1 – Q-STAT-6, the deadline memo's five questions + ID-DL-1** · **NEW: delete `Knowledge Repo\Statutes 26-08-14\_claude_extract\`** — a session cannot (`device_bash` has no `rm`) · **a fresh meter reading, requested at #68 and STILL not stated**. **V-4–V-8 are OFF this list — they need EXECUTION design-side, not a ruling**
- **DE SERIES** — deficiency enforcement. **DE-1** taxonomy-as-data and **DE-2** the conferral/escalation timeline, MANUAL triggers per Q-6. **The parked heartbeat Part-6 engine's HOME, not its green light. Nothing built** — and **193.2(e), DE-1's linchpin, is one of the four entries whose wording the statute pass says is backwards**
- **REQ-10 placeholder discipline: CONFIRMED AS CARRY.** **EMAIL-WORKFLOW DOC ADOPTED** (#63) — seven pipelines take **WF-2–WF-8**, every one gated. **CL2-AC-1 is DIRECTION-CONFIRMED**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched in the **P15's** gitignored `inbox/`; CORPUS-HOME closed to ARCHIVE, **your hand**. **LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v7** (`docs/prompts/QUEUE-RUNNER.md`, the **ONLY full copy**). **Your hand: the P15 user-level copy deletion.** **The v7 gate has now passed on its own terms four times** — #68, #72, #74, and this batch. **QR-3 CANNOT RUN THROUGH THE DEVICE BRIDGE and must stay native** (#74): the mount reads a false DIRTY of ~199 CRLF-only files, and `git fetch` fails there with `HTTP 403 from proxy`, so a local `HEAD == origin/master` is an **unfetched ref, not a pass**
- **THE H-STRING COLLISION IS ENDED:** the log-#44 housekeeping series re-lettered **H → HK**. **Heartbeat H1–H83 untouched — never rename them.** The naming caveat covers **IN / DE / CR / HK**
- **`docs/reference/` HOLDS A BINARY** — `CR3-code-sheet-2023.pdf` (blank public TxDOT code list, verified client-clean). Synthesis `cr3-field-code-map.md`, **PROPOSED input for IN-2 — nothing built**: crash-report code tables are **VERSIONED external vocabularies**, so extraction must store **(code, decoded label, code-sheet version)**
- **VERIFICATION STATUS: the #62/#63 and #64 batches were VERIFIED design-side FULL-TEXT on 08-13 (#65)**; **#67 verified landed at the top of #68.** Still UNREVIEWED: the carried **#31–#33** material, **#37–#61's own routing**, and now **#72–#76** — do not copy #36's clearance forward
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through **#76**. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `future-modules-capture-2026-07-28.md`.** Client model: design doc §10. FOLD PENDING: captures
  e+f into case-heartbeat-design.md §8. Carried: no law-change ledger, Outlook unreviewed
