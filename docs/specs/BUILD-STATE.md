# BUILD STATE — brennan-case-manager
Commit: 4415f33  |  Branch: master  |  Generated: 2026-08-13 Central (sixty-second refresh)
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
- **The one RED preflight row is AUDIO** — no real speech has ever run on this stack; **no substitute audio** (08-09 exception). **His hand (HK-4, formerly H4): stage the 13 recordings into `..\data`** — **re-checked this refresh against the declared paths only: `C:\Users\Brennan\data` DOES NOT EXIST here.** **AND THE KICKOFF DOC IS GONE (KICK-1)**, never git-tracked, and it is that authorization's **authoritative text**: **until he locates it or re-issues, T3 WORK IS UNAUTHORIZED**
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
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice. **Limitations date is now CLIENT-scoped — see the client dimension below** |
| Parties | LIVE + CD-1 | **intake roster panel** (slots by expectancy tier, each labelled with the case type or overlay that contributed it; caption sides shown; "Link a contact" scopes the add form to that slot) · **roster-flag card** with Mark-handled · the four attributes shown separately · link/unlink · **Clients — damages scope card (CL-2)** |
| Medical | LIVE — **PI MATTERS ONLY (ruled 08-12)** | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator. **Per-client ledgers once a case has two clients** **Tab hidden on civil-lit and criminal files; `showsMedicalTab()` is the one enforcement point. §1983 civil-rights matters are the other half of that ruling and are NOT implementable — no such case type exists and PR-3 holds the tree shut (spec-feedback). Safety valve: a matter that already HAS bills keeps its tab, so the rule narrows what is OFFERED, never what is REACHABLE.** |
| Calendar | LIVE + Outlook push WORKING, ONE DEFECT | create/edit/cancel all EXERCISED against live Graph 08-13. **Cancel deletes; edit patches — EXCEPT the FIRST edit of a connect-pushed event, which DUPLICATES it in Outlook and orphans the original.** Reproduced on two events; cause undetermined, no fix. `outlook-edit-cancel-exercise-2026-08-13.md` |
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
  **PRESERVED on the flag**. **D-CL2-3: BILLING RATE IS PER CLIENT** — no schema. **D-CL2-3a RULED
  08-13: the fee affidavit carries the rate of the client whose claim carries the FEE DEMAND;
  multi-client demands get per-client exhibits. Design status — the time tracker stays parked**
- **CLAUDE.md's guard language on this slice was ~17 DAYS STALE and is now annotated as historical
  (drift finding #9, #68).** It still read "QUEUED BEHIND the auth slice." **This file is the
  authority on what is built — that is exactly why the sync excludes `src/`**

## Data layer
- Adapters: local (localStorage demo) AND supabase; the UI talks only to the DataAdapter interface — every feature works in both modes. Seeds fictional; **store v11** (CD-1), v9→v10→v11 chains **FORWARD in place**, backing up at each step
- **`npm run dev:demo`** runs demo mode past a real `.env`; **demo state does NOT travel**
- **`db/schema.sql` EXECUTED live 2026-07-28**, then CL-2 that night. **36 tables in schema.sql — but the live database is still at 34**: CD-1's two are in the file and in the UNRUN migration
- **GRANTS ARE PART OF THE SCHEMA — load-bearing.** `authenticated` ONLY, **`anon` gets nothing by design** (`db/migrations/2026-07-28-api-role-grants.sql`). **`ALTER DEFAULT PRIVILEGES` is NOT set: every new table must carry its own GRANT or it is unreachable.** CD-1's two carry their own, written with the tables
- **No case-event/CE table, no time_entries, no claims, no `case_links`. Nothing exists for the DE
  series** — no response-set, response-item, or escalation-timeline table. Health **last measured at
  #68: 278 tests pass (23 files), build + lint clean; this refresh changed docs only**

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
- **Benchmarks import reads `..\data\pfs\` — NOT present on the machine that ran this refresh** (re-checked; it lives on the other machine). **Outlook push: creation, EDIT and CANCEL all exercised live 08-13** (Michael's hand, his browser, demo events only). **Cancel propagates; edit patches cleanly — but the FIRST edit after a connect-time push CREATES A DUPLICATE and strands the original, permanently (the app loses its id).** Systematic, reproduced on a clean control. **Cause undetermined and NOT guessed; no fix.** Evidence needed + repro: `outlook-edit-cancel-exercise-2026-08-13.md`
- Inbox has NO auto ingestion (T3 unbuilt); OAA parses digital Uvalde orders only, scans → manual. Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying itemized bills is a VIABILITY issue** (Michael) — **and OBS-1 now asks whether that capture row folds into Phase 1b's scope; unruled**. Playbook engine NOT built; generated docs and code mappings do NOT survive a reseed. **"Mark disbursed" shows on criminal files — KNOWN, NOT fixed**
- **NOTHING FROM THE 08-13 RULING RUN IS BUILT.** Demographics capture (sex + race/ethnicity, both intake paths), the cause-number-pending flag, staged deposition threads, payer threads arming at intake, per-(case, party) deadlines, and the registry's `precedential_status` field are **DESIGN STATUS ONLY** — no field, no column, no code. Each waits for its own slice's authorization
- **PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
  Injury with a knowingly wrong ladder (`_piDefault`).** PR-3 direction CONFIRMED, **EXECUTION HELD**
  until the ladder pass names the destination. **Do not touch the case-type tree or ladder.** No
  probate tables or roles. **NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens
- **FORM ENGINE — FE-D1 (DISCLOSURES ENGINE) NAMED, SCOPED, AND AUTHORIZED 08-12 (#63); NOT BUILT.** Scope `docs/specs/fe-d1-build-slice.md`; kickoff `docs/prompts/PROMPT-fe-d1-build-session.md`; **yours to fire, Opus, its own session** (the CD-1 pattern — the queue runner is barred). Slice 1 = §§1–6 wizard + §10 substrate + §11.3 skeleton; **NOT "FE-1"** (retired scout; ledger bars reuse). **IN:** FE-10 + FE-12 from birth, FE-8 retention half, FE-15, a MINIMAL template editor. **OUT with homes:** FE-9 · FE-11 · FE-13 · FE-14 (TRCP 47 gate) · FE-16 · **FE-17**
- `docs/skills/drafting-disclosures/SKILL.md` is **a DOCUMENT, not code** — **now v2** (landed 08-11, authored design-side under the upgrade protocol; **Code must still never edit it**)
- Time tracker: draft only — **its §5 export hold LIFTS on D-CL2-3a, but the tracker stays parked behind CE1**. Servpro deadline engine: DESIGN ONLY. Heartbeat: design docs only (captures e+f NOT folded; register H1–H83; **H40/H50/H60/H77 are annotated in the design doc as of #68 but the substantive fold still rides the heartbeat pass**). **CE1 still NOT AUTHORIZED** (D-CL2-9) — must be **CLIENT-AWARE from the start**. CourtListener: design doc only, integration UNAUTHORIZED (Q-6). **Descrybe is OUT by ruling 08-13**
- **REGISTRY — THREE files, UNCHANGED THIS REFRESH.** **TWENTY VERIFIED** (Michael) in `legal-rule-registry-discovery-and-carrier-duties.md`; **three wording expansions there are FLAGGED, NOT ADOPTED** (TRCP 194's span, 193.3, 192.3(f)) — verification attaches to wording. **TWENTY-SEVEN UNVERIFIED** in `legal-rule-registry-discovery-enforcement-and-pleading.md` (**six WL/slip cites flagged, none corrected**). **SEVEN UNVERIFIED** in `legal-rule-registry-criminal-plea-and-costs.md` — six as filed, then **former entry 4 SPLIT by your ruling 08-13 into 4a** (separate criminal actions: per-cause costs, still CITE-LESS) **and 4b** (single criminal action: each cost once at the highest category, art. 102.073). **BACKLOG STAYS 34.** Entry 3 and 4a carry NO CITE — supplying one is YOUR act. **CR-10's cost check must ask same-action-or-separate BEFORE totaling.** **`/rules` SEED ALL UNVERIFIED**
- **REGISTRY RESEARCH SUPPORT — THREE DOCS, ALL PROPOSED, FLAGS-ONLY, NOTHING VERIFIED, NO REGISTRY
  FILE TOUCHED BY ANY OF THEM.** `registry-cite-check-2026-08-13.md` (#65: four slip cites are
  memoranda whose WL cite is PERMANENT; **Ochoa plausibly HAS a reporter cite ("(PUBLISH)")**;
  Collins needs retrieval) · **NEW #72:** `registry-verification-workbook-2026-08-13.md` — **all 34 entries, one row each, each reduced to ONE look** — and `registry-citator-pass-2026-08-13.md` (majority resolution + citing picture).
  **Net: 5 need a look** (Ochoa, Collins, Irwin, Alford, Castillo), **5 need none for cite or majority** (Able Supply, Peeples, Dillard, Park Cities Bank, Mizell — *each still needs a commercial citator before filing; FLP is not one*), 3 confirmation-only, 1 needs its designation.
  **RAG-sourced, not HEAD**; the 20 rule/statute rows read `RETRIEVAL: NOT RUN` **by design — not a Code gap.** Queued as **V-2 (annotated, NOT closed) + V-4–V-8**
- **THREE FLP RETRIEVAL HAZARDS, from a ten-case sample, DESIGN INPUT ONLY:** a **duplicate cluster on one reporter cite** (*Alford*: 2419858 vs 5269700, counts 207 vs 3); ***Irwin*** **twice, with no reporter cite and no opinion typing**; and **citing counts disagreeing across three FLP surfaces** (187/207/168, same case, same session) — **never show a citing count as precise or read it as currency.** Ruled INTO §0.1 at V-8, but `registry-courtlistener-integration-design.md` is **UNEDITED** and **Q-6 still bars the API**
- **V-4–V-8 ALL RULED 08-13 (#73), ONE AT A TIME — AND NONE OF IT IS EXECUTED. No registry file, no design doc, no CLAUDE.md was touched; specs are read-only here and every one of these is a wording act.** V-4 **keep as two, cross-referenced** (consolidating would have merged across a status line and dropped three banked verifications); V-5 **split all three two-case entries** — **BACKLOG BECOMES 37 WHEN EXECUTED; it is 34 in the files today** — because a joint entry verifies at the speed of its slowest case and *Alford* was hostage to the unlocated *Collins*; V-6 **both criminal entries stay, reworded to state operative tests** (removing them would NOT have unblocked CR-10, still gated on 30/31's missing cites and 32); V-7 **narrow entry 23**, *Irwin* carries the availability holding; V-8 **record all three hazards**
- **V-9 OPENED (#73), and it is the sharp one: the *Irwin* class is a state in which CLAUDE.md's BINDING majority-opinion rule CANNOT RUN** — no opinion typing, no author, and a probe of the stored text for "delivered the opinion of the Court" returns nothing, so the authoring-language fallback does not fire either. **The rule states no answer for that state.** Deliberately NOT written into CLAUDE.md — **amending a binding rule is YOURS**

## For design side
- SYNC: selective — docs/, db/, supabase/, CLAUDE.md, README.md, BUILD-SESSION-NOTES.md; **src/ EXCLUDED**, which makes this doc the SOLE authority on what is built
- **v17 IS DRAFTED, DELIVERED, REVISED, AND NOT YET PASTED — YOUR HAND. PASTE THE REVISED FILE (08-13 evening); the earlier same-day download is SUPERSEDED.** It carries Descrybe-out, SAT-1, the §7.2 model-routing clause with refreshed economics (closing **Q-5** and **HK-2**), the **HK-5** rule, the two touch-ups, and the **QR-3 v7 ahead-stop** + **line-count convention**. **Design-side #68 reports the revised v17 loaded in force; the paste itself is not visible to Code.** DT-1 remains in force
- **BOTH STANDING SWEEPS ARE CLOSED (#68).** Duplication: **NO DUPLICATE** across 171 ID-bearing rows; the three glyph-bearing pointer rows (PR-3, RE-1, registry 1–10 sign-off) lost their glyphs by ruling. Status-drift: **CLOSED AS A PASS** at findings #2–#9, all fixed by add-only annotation. **A pass, not a standing guarantee — re-running after a future ruling batch is yours to order.** New and open: **OBS-1**
- **CHAT-DISPATCH: Tasks 1+2 COMPLETE (#72, the atomic pair); Tasks 3–19 NOT STARTED — resume at
  Task 3.** **The device bridge did NOT connect**, so Tasks 5, 17, 18 still lack the full-file reads
  they need: **connecting the checkout is HK-7, your hand.** **FLP throttles at 5 req/min** — budget it
- **PRACTICE-PROJECT CHANNEL IS THREE: CIVIL LIT + CRIM DEFENSE + PROBATE — both hand-items CLOSED 08-13 (V-3):** PROBATE created with v1 + carry snippets; CRIM DEFENSE carries v1 + the Uvalde worksheet instructions. New probate matters are CHATS inside PROBATE; the two grandfathered matter workspaces reach the build side by ONE path: **PROBATE's client-clean REQ-CAPTUREs**
- **SIX REQ-1 CAPTURES ARE FILED** at `docs/specs/REQ-CAPTURE_*`: trucking, roster-mining, attorney-edit, **UIM-UDJA transform**, **deficiency-handling**, **Uvalde docket-worksheet**. First three SPENT as CD-1 input; UIM + deficiency seeded the **DE series** and eleven durable IDs. **No capture in the repo is unreconciled**
- **CR SERIES CR-1–CR-11** plus a **binding black-and-white print constraint** governing all worksheet rendering. **CR-10 is HARD-GATED** on the criminal registry entries. **COLLISION FLAGGED, NOT RENAMED:** `CR-3` also means the Texas crash-report form at IN-2 — cite as "CR-3 (criminal requirement)" vs "the CR-3 crash report"
- **YOUR HAND, THE LAUNCH PATH IN ORDER: run the CD-1 migration** (`db/migrations/2026-08-12-cd1-contact-directory.sql`; back up, paste alone, answer its five checks in words) → **gate 1 Supabase Pro** → **gate 9 production SMTP** → gate 3 RLS test **including the two new tables** → gates re-check + v17
- **ALSO YOURS: paste the revised v17** · **re-upload SKILL.md v2** (SK-v2) · **the sync-picker clicks** — `docs/skills/` (Q-3), `docs/templates/`, and the `docs/reference/` exclusion · **telemetry lockdown on the P1** (confirmed NOT set) · **HK-6: locate the T3 kickoff-day capture** (adoption RULED; execution gated on you supplying the file) · **HK-7: connect the checkout** · **V-2, the one-look list, Ochoa first** · **V-9, the binding-rule gap** · **OBS-1** · **a fresh meter reading — requested at #68 and still not stated**. **V-4–V-8 are OFF this list — ruled 08-13; what they now need is EXECUTION design-side, not a ruling**
- **DE SERIES** — deficiency enforcement (WF-1 precedent). **DE-1** taxonomy-as-data and **DE-2** the conferral/escalation timeline, MANUAL triggers per Q-6. **They are the parked heartbeat Part-6 engine's HOME, not its green light. Nothing built**
- **REQ-10 placeholder discipline: CONFIRMED AS CARRY** — the content route into `form-engine.md` rides whichever session next amends that spec. **Nothing owed now; the edit is design's, never Code's**
- **EMAIL-WORKFLOW DOC ADOPTED** (#63) at `docs/specs/email-workflow-requirements.md` — seven pipelines take **WF-2–WF-8**, every one gated (WF-5 doubly: money machinery unruled). **CL2-AC-1 is DIRECTION-CONFIRMED**
- **The probate corpus is NOT in the repo and never has been** — `Probate Corpus.zip` sits untouched in the **P15's** gitignored `inbox/`; CORPUS-HOME closed to ARCHIVE, **your hand**. **LADDER PASS DEFERRED** pending Domser; **PL-1..PL-4 UNRULED**
- **RUNNER DISCIPLINE — QR-1..QR-4 + MM-1 CLOSED; runner v7** (`docs/prompts/QUEUE-RUNNER.md`, the **ONLY full copy**). **Your hand: the P15 user-level copy deletion** (P1 ABSENT). **Step 0 STOPS when HEAD is AHEAD of origin/master** (#67) — **the v7 gate has now passed on its own terms twice**, at #68 and at #72
- **THE H-STRING COLLISION IS ENDED:** the log-#44 housekeeping series re-lettered **H → HK** (HK-1, HK-2, HK-4, HK-5, HK-6, **and HK-7 as of #72**). **Heartbeat H1–H83 untouched — never rename them.** The naming caveat covers **IN / DE / CR / HK**
- **`docs/reference/` HOLDS A BINARY — the first in `docs/`.** `CR3-code-sheet-2023.pdf` (blank public TxDOT code list; verified client-clean before it was committed). Synthesis at `docs/specs/cr3-field-code-map.md`, **PROPOSED input for IN-2 — nothing built.** Its requirement: crash-report code tables are **VERSIONED external vocabularies**, so extraction must store **(code, decoded label, code-sheet version)**
- **VERIFICATION STATUS: the #62/#63 and #64 batches were VERIFIED design-side FULL-TEXT on 08-13 (#65)**; **#67 was verified landed at the top of #68.** Still UNREVIEWED: the carried **#31–#33** material and **#37–#61's own routing** — do not copy #36's clearance forward. **#58 was VERIFIED post-Sync, line by line**
- **Everything awaiting your ruling is in `docs/specs/attorney-review-queue.md`** — reconciled
  through **#73**. **K-6/K-7 RETIRED — reconstruct NOTHING.** **UNRULED, adopt nothing:
  `future-modules-capture-2026-07-28.md`** (`model-routing-plan.md`'s §7.2 clause is adopted via
  v17; the rest of that memo stays unruled, and its header now says so). Client model: design doc
  §10. FOLD PENDING: captures e+f into case-heartbeat-design.md §8. Carried: no law-change ledger,
  Outlook unreviewed
