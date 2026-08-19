# Spec feedback — for Michael to take back to the design space

Per CLAUDE.md: coding sessions never rewrite the specs; problems the build
reveals get noted here instead. Each item needs a decision or a spec update
in the Claude.ai Project space, after which a refreshed snapshot comes back
to `docs/specs/`.

## Telemetry lockdown recipe, 2026-08-13 — the recipe targets Windows; the stack runs in WSL2

**Nothing was executed and nothing was changed. This is a flag.** Raised by a Code session
(chain task 3) that was asked to complete only what the record authorizes on the telemetry item,
and found that **the record authorizes a Code session to do nothing** — the variables are
Michael's hand on the GPU machine, "never from a Code session"
(`attorney-review-queue.md:321`). While restating that, the gap below surfaced.

**The gap:** `docs/gpu-telemetry-offline.md` gives the lockdown as **Windows** machine-scope
environment variables — System Properties, plus a PowerShell
`[Environment]::SetEnvironmentVariable(...,'Machine')` one-liner. It contains **no WSL, Linux,
`.bashrc`, `WSLENV`, or venv-activate instruction anywhere** (checked at HEAD). But the
transcription stack runs **entirely inside WSL2**: `phase0-environment-standup-2026-08-09.md`
§2 records "all inside the WSL filesystem, per the WSL2 I/O rule," Ubuntu 24.04.4 LTS on WSL 2,
with the run command `wsl -d Ubuntu-24.04` → `cd ~/phase0` → `./venv/bin/python`.

**Why it matters, concretely:** Windows `Machine`-scope variables **do not propagate into a WSL2
distro** unless they are exported through `WSLENV` or set in the distro's shell profile or the
venv activation script. So the two checks can disagree in the dangerous direction — the Windows
self-check can come back **set**, and the Python process that actually loads `wandb` can still
see **nothing**. The doc's one hedge ("or the activation script of the Python environment the
stack runs in — set them in BOTH if unsure") gestures at this but names no WSL path, and the
self-check Michael ran on 2026-08-13 (#66) was the **machine-scope** one — which is also how
BUILD-STATE frames the finding ("both machine-scope variables came back EMPTY").

**The consequence worth the design side's attention:** a "verification 3 passed" report resting
on the Windows half alone would close the item **without the lockdown being in force where the
audio is processed** — and the standing rule gated on that report is *no privileged audio until
verification 3 passes*.

**Corroborating detail:** session-log #66 records the recipe as "re-supplied with **the WSL2 half
emphasized**" on 2026-08-13. **That WSL2 half is not in the repo copy of the doc** — the note was
filed verbatim 2026-08-12 (#63) and has not been refreshed since. So the repo snapshot lags the
design-side guidance on exactly the point that decides whether the lockdown works.

**Not fixed here on purpose:** `docs/gpu-telemetry-offline.md` is a design-side deliverable filed
verbatim, the ruling is Michael's, and the recipe is his hand — a Code session editing it would
be rewriting a spec. **A refreshed snapshot carrying the WSL2 half is the fix.**

## Medical tab scope, 2026-08-12 — half built, half BLOCKED on PR-3

**Michael's ruling, 2026-08-12:** *"the only cases that should have a medical tab
should be the personal injury or 1983 civil rights cases."* Prompted by a Servpro
mechanic's lien matter, which has no medical damages to work up and where the tab
invited a workflow that does not exist on that line.

**BUILT:** `showsMedicalTab()` in `src/domain/caseTypes.ts` — one enforcement
point, the `showsClientLayer()` pattern, so the rule cannot drift between the tab
strip and the router. Personal Injury only. Verified live: the tab is present on
the PI matter and gone from the Servpro and criminal matters.

**BLOCKED, and this is the item for the design side: §1983 civil-rights matters
have NO CASE TYPE.** `CASE_TYPE_DEFS` carries Personal Injury, General Civil
Litigation (debt, DTPA, mechanic's lien, Servpro mechanic's lien, bailment,
breach of contract), and Criminal. There is no civil-rights type anywhere, so
half of the ruling **cannot be expressed in code today**. Adding one touches the
**case-type tree, which PR-3 holds shut** (direction confirmed 2026-08-07,
EXECUTION HELD until the probate-ladder pass names its destination). Rather than
add a type under a hold, the §1983 half is recorded here.
**Questions this raises for the design side:**
- Does a §1983 civil-rights line belong under Personal Injury, under General
  Civil Litigation, or as its own practice area? It carries medical damages like
  PI but a wholly different liability theory, fee statute, and defendant class.
- Does it wait for PR-3's hold to lift, or is it a separate, narrower change?

**Safety valve built in, stated because it is a judgment call and not in the
ruling:** a matter that already HAS medical bills keeps its Medical tab whatever
its practice area. Hiding a tab must never make attorney-entered data
unreachable, so the rule narrows what is *offered*, never what is *reachable*.
If Michael would rather the rule be absolute, it is a one-line change.

**Also deferred by Michael the same day:** the Servpro mechanic's lien line gets
a fuller build-out **after a meeting with the Servpro people and another attorney
who handles these matters regularly.** Nothing on that line should be designed or
built from inference before that meeting.

## CD-1 build, 2026-08-12 — two spec-vs-code gaps, built around under stated assumptions

Raised by the CD-1 directory build (`docs/specs/cd1-build-slice.md`). Neither
blocked the slice; both were worked around in a way that is cheap to reverse,
because roster slots are DATA. **Michael's to redirect.**

1. **There is no case-type tree to inherit on.** `contact-directory.md` §4.1 says
   roster definitions attach "to the case-type tree, with inheritance — a child
   case type inherits its parent's slots and adds its own (MVA baseline pair
   under trucking's carrier/lessor/... extensions)." The code's
   `CASE_TYPE_DEFS` is **flat**: practice area → case type, one level, no
   parent/child relation between case types. There is no node for a child to
   inherit from.
   **Built as:** inheritance runs **practice area → case type**, which is the
   only real parent in the structure. Criminal's client-as-defendant slot lives
   at the practice-area level and is inherited by Misdemeanor, Felony, and the
   ex parte relief types; the State-as-adverse slot is added only by the
   adversarial types. That is a genuine, evidenced use of inheritance — it just
   is not the axis the spec assumed.

2. **Two of the seven seeds the authorization names are not case types.** The
   slice says to seed "MVA, trucking, premises, UIM/UM, TTCA-type, criminal,
   insurance/DTPA." **Trucking and UIM/UM are PI overlay FLAGS** (`PI_FLAGS`),
   not entries in the case-type tree — and **PR-3 holds the tree shut**
   ("do not touch the case-type tree or ladder"), so they could not be added
   as types.
   **Built as:** flag-keyed **overlay slot sets** layered on top of the case
   type's slots. A trucking MVA resolves the MVA baseline pair plus the
   seven-role trucking defendant side; a UIM MVA gets the first-party insurer
   and the non-party at-fault driver. Verified in the browser on the seeded
   trucking case: 4 expected slots, correctly sourced and labelled.
   **The question for the design side:** are overlays the right shape, or should
   trucking and UIM/UM become case types when PR-3's hold lifts? The answer
   changes nothing structurally today — `resolveRosterSlots()` takes the flags
   as an argument and the seeds are a literal.

3. **Smaller, noted not worked around:** §6.2's service-story fields are
   Scope-OUT for this slice, so slot definitions carry a `servicePathHint`
   string that **nothing consumes yet.** It is a label awaiting its first
   instrument consumer, as the spec intends — flagged so it is not mistaken for
   a half-built feature.

## Open items (as of 2026-07-21)

1. **Probate companion has no status ladder of its own.** The code gives every
   PI case type the litigation ladder (treatment → demand → suit → trial). A
   probate companion file doesn't follow that arc. Needs a settled ladder in
   the master spec (§8) — or a decision that it intentionally shares the PI
   ladder.

   **Addendum 2026-07-24 — the "standalone probate" trigger has fired; this
   item is now a full design pass, not just a ladder decision.** The master
   spec's §7 probate-companion decision was scoped to the probate side of PI
   death/incapacity cases, "reusable if standalone probate work ever comes
   in." It has: Michael now has an active standalone decedent's-estate matter
   and wants probate built into the software as a practice area. He is
   working the matter itself, and the probate design, in the design space —
   this addendum routes what the design pass should weigh, from the probate
   practice materials assembled 2026-07-24 (a Texas probate assistant
   configuration + a ~1.8 MB knowledge corpus of treatise excerpts and
   matter documents; see the session-log entry of this date for where those
   live — they stay OUT of the repo):
   - **Proceeding type is the threshold structure, not a single ladder.**
     Texas probate is a family of distinct proceedings (probate of will with
     letters testamentary; independent vs. dependent administration;
     muniment of title; heirship determination; small-estate affidavit;
     temporary administration), each with its own lifecycle, and the
     proceeding-selection decision itself is a modeled step (it can change
     mid-matter, e.g. lost-will proof falling back to intestacy). One
     status ladder per proceeding type, or a two-level model
     (proceeding type × phase), is the design question.
   - **Probate is deadline-dense, and every deadline is a legal
     proposition.** Four-year will-probate bar, two-year contest window,
     qualification/oath windows, 90-day inventory, published creditor notice
     within one month of letters, certified-mail secured-creditor notice
     within two months, 60/90-day beneficiary-notice pair, 120-day claim
     bar, etc. Under the Legal Rule Registry discipline these all enter as
     UNVERIFIED registry entries and cannot drive computed deadlines until
     Michael signs off — the probate spec should plan the registry batch as
     part of the design, not as an afterthought.
   - **Probate-specific tracked objects** with no PI analogue: letters
     (issued/status), bond, non-resident representative's resident agent,
     inventory/affidavit-in-lieu, creditor claims with statutory
     classification/priority, notices with proof-of-compliance filings.
   - **Forms:** probate applications, notices, and orders are natural
     form-engine deliverables (form-engine.md) once the practice area
     exists; sequencing is the design space's call.
   - Existing code anchor: `Probate companion` is already a case type in
     `src/domain/caseTypes.ts` (inheriting the PI ladder). Whether the
     practice area extends it or supersedes it with linked-matter support
     is a design decision.

2. **Supabase auth approach (blocks central-database mode).** The schema's RLS
   policies admit only `authenticated` users; the app connects with the anon
   key and has no sign-in. Until this is decided, Supabase mode connects but
   every query is refused (the app now shows a visible error notice instead
   of loading forever). Options to weigh in the design space: a single
   shared Supabase Auth login for the solo phase (smallest change, works with
   current policies), vs. designing the eventual per-staff-member model now.
   Related nuances: (a) server-side `next_file_number()` uses the database
   clock, so the January counter reset follows the DB timezone, not Texas
   time; (b) 2026-07-21 code pass hardened `db/schema.sql` — RLS is now
   enabled on `file_counters` (no policies) and `next_file_number()` runs as
   SECURITY DEFINER; no live database exists yet, so no migration was needed,
   but the schema should be re-reviewed in the design space before first
   deployment.

3. **Mistake-case handling: archive/void vs. delete.** Nothing can be deleted
   in the app (probably right for a legal system), but a fat-fingered case
   currently lives in the list forever. Spec question: add a "Void/Archived"
   terminal status (excluded from lists like Closed), allow true delete for
   never-served-on-anything records, or something else?

4. **Party-type promotion path.** Party type is frozen after creation by
   design, but the Person type's intake-funnel fields (PNC → Client) imply a
   promotion path that doesn't exist — re-entering a person as a new Client
   party would split their cross-case history. Needs a settled mechanism
   (e.g. type conversion with field mapping, or a link between records).

5. **Citizens MRF local path** — still undecided (CLAUDE.md open decision).
   Needed before Phase 2 billing work; record it in CLAUDE.md once chosen.

6. **EOB acquisition workflow (new wanted-later item, Michael, 2026-07-23
   Phase 1a walkthrough).** The EOB record is load-bearing (Type 2
   reconciliation now; Ch. 146 lien-cap and the Phase 2 balance-billing audit
   later), but in practice getting EOBs from clients is slow and unreliable.
   Michael wants a design-space session later on the most streamlined
   acquisition path. Raw material to weigh when it comes up:
   - HIPAA authorization → request the claims/EOB history directly from the
     health insurer (mirrors the provider records-request flow; the client
     signs once at intake — pairs with the standard coverage inventory
     already captured at every PI intake).
   - Per-insurer client one-pagers ("how to download your EOBs from the
     UnitedHealthcare portal") generated from the insurer party record.
   - Client intake form / portal upload (banked feature: fillable intake
     link) — a phone-photo upload path for EOBs as they arrive in the mail.
   - Subrogation/lien correspondence often contains the insurer's own claims
     ledger — same numbers, already flowing in; could feed the EOB record.
   - Medicare beneficiaries: BCRC conditional-payment summaries already
     tracked in the liens module carry paid amounts (synthesis §2.2 join).
   - Interacts with: outlook-email-intake.md (EXPLORATORY — HIPAA
     first-class), the paralegal-workflow flip at multi-user, and Phase 1b
     AI ingestion (an EOB is a parseable document once the GPU arm exists).
   Not sequenced into any build phase — capture only, per Michael.
   **Multi-EOB requirement (added same walkthrough):** one bill routinely has
   several EOBs — per-claim adjudication across a course of treatment,
   primary + secondary coverage (COB), corrected/reprocessed EOBs, interim
   hospital billing. Phase 1a's single light EOB record per bill handles this
   as attorney-entered totals with a plural source pin ("EOBs dated 5/2,
   5/30, 6/14 — sum of patient-responsibility boxes"); the Phase 2
   reconciliation-audit design should model EOBs as multiple records per
   bill (per claim, with payer role primary/secondary and a
   supersedes/corrected link) rolling up to the bill-level figures the
   Ch. 146 cap and settlement math consume.

7. **Registry proposition needs enrichment: negotiated-rate discovery
   (Michael, 2026-07-23 walkthrough).** The seeded North Cypress / K&L Auto
   Crushers entry ("Negotiated-rate and reimbursement-rate discovery is
   available against providers, including LOP providers, on reasonableness
   of charges") is true as stated but oversimplified — there are real
   limitations on the exact discovery available and the extent to which
   certain things are discoverable, and Michael wants more law fed into
   this area. Design-space work: (a) decide whether this becomes one
   enriched entry or splits into sub-rules (baseline discoverability +
   separate entries for its limits), each with its own cite and
   verification status; (b) generally, settle the workflow for enriching /
   amending registry propositions, since coding sessions deliberately
   cannot edit proposition text in-app (only notes and status) and
   propositions changing silently would orphan past runs' version stamps.
   Interim: Michael can carry the qualification in the rule's Notes field.

8. **Disclaimer authority research (Michael, 2026-07-23 walkthrough).** The
   estimates-not-adjudication disclaimer wording is approved as v1
   (`DISCLAIMER_VERSION = v1-2026-07-23`), but Michael wants a later pass to
   find on-point legal authority informing the language — what the
   disclaimer should say (and avoid saying) given how benchmark analyses
   could surface in discovery, §18.001 practice, or a reasonableness fight.
   Any authority found goes through the registry (entered unverified,
   attorney sign-off); a revised disclaimer bumps the version string, and
   every run/report already records which version it carried.

### 2026-07-23 — Ch. 146 mischaracterized in specs (correction needed)

**Where:** case-management-project-instructions.md (liens section: "Ch. 146 EOB balance-billing check: the patient-responsibility amount on the EOB is the maximum permissible lien") and any downstream references.

**Problem:** (a) The statute is Civil Practice & Remedies Code Ch. 146, not Insurance Code Ch. 146. (b) It is a timely-billing statute: §146.002 sets billing deadlines (11-month default), §146.003 bars recovery from the patient of plan-covered/not-otherwise-owed amounts only when the provider blew the deadline. It is not an EOB-based lien ceiling. EOB-as-ceiling concepts belong to the surprise-billing framework (Ins. Code Ch. 1467 / SB 1264) — unverified, see registry Entry 8.

**Also fold in:** (a) H.B. 4145 (eff. 9/1/2025) added §146.002(c-1): billing the PI claimant's attorney within the 11-month window satisfies the patient-billing deadline. (b) External draft asserts Prop. Code §55.004(d)(5) excludes §146.003-barred charges from hospital liens — if confirmed against Ch. 55 text, wire into the lien-clearance gate. (c) External draft asserts §55.004(b) has a third cap prong (trier-of-fact-specified amount less pro-rata fees) missing from the spec's two-prong formula — confirm against statute. (d) Spec's "naming plaintiff as liable party is a fatal defect" conflicts with external draft's substantial-compliance reading of §55.005 — Michael to resolve; affects pre-disbursement gate.

**Status:** All corrections pending Michael's review; nothing changed in canonical spec yet. (Code-side note, same date: the seeded `ch146-eob-cap` registry proposition in `src/data/billingSeed.ts` carries the wrong framing too — deliberately left untouched pending the proposition-amendment workflow ruling in item 7(b) above.)

### 2026-07-25 — Design doc §4 example cell overstates a pilot result (cosmetic)

**Where:** transcript-sort-and-route-design.md §4, signal table, cause/claim-number row: `"twenty twenty five CI zero four nine six two" → 2025-CI-08841`.

**Problem:** That spoken string normalizes to 2025-CI-04962, which is edit distance 4 from 2025-CI-08841 — outside the design's own ≤2 threshold, and rec_10 (unscripted, ground truth unknown) shouldn't be cited as a successful match. The MECHANISM is validated by the other pilot data (script 1's cause number came through perfectly; the claim number "Harty three eight eight one two K seven nine" matches 43-8812-K79 at distance 1), and the committed pilot-fixture tests encode rec_10 as correctly matching nothing. Design space should fix the cell on the next spec revision — no behavior change requested.

**Status:** Cosmetic; build follows the ≤2 threshold as written.

### 2026-07-25 — OAA intake findings from the first real order (Medina County)

**Where:** criminal-appointment-intake-and-docket-enhancements.md §1, from Michael dropping a real scanned Medina County OAA into the new intake page (behavior was correct — pure image scan → Tier 2 manual entry; the document itself stays OUT of the repo).

**Findings for the design space:**

1. **Tier is document quality, not county.** The Medina order is the SAME standard form family as Uvalde/Real (§1a's regions match exactly) — Medina just prints and scans it. The build now detects the form family structurally and treats county as extracted data; the per-county registry mechanism stays for genuinely different layouts (DeWitt packets). Spec §1's county→tier table may deserve a note: a Tier 1-county form arriving as a scan is still a Tier 2 *document*, and post-P1 OCR output can feed the same Tier 1 parser.

2. **[DECIDE — attorney check] The real order appoints an OFFICE, not Michael:** "Hill Country Regional Public Defender Office" (HCRPDO appointment per Medina County's policy). The §1c attorney check as specced (extracted attorney must be Michael, else hard stop) would hard-stop every such appointment. If Michael takes appointments through HCRPDO, the accepted-appointee list needs to include the office name(s) — and possibly a per-county nuance. Currently the check accepts only Brennan variants; the office name would land as a hard stop. Michael to rule: which appointee names are "mine"?

3. **Cause number can be "NOT FILED"** (pre-filing appointment). The parser now treats that as no-cause-yet; the duplicate check skips it. BUT the operative case number on the real order exists only as a HANDWRITTEN number top-right (#38076) — the Tier 2 handwriting lesson again, now on a Tier 1-family form. The eventual cause number arrives later; consider a follow-up prompt/reminder pattern ("cause number pending — update when filed") in the design.

4. **Fields on the real form not in the spec §1a map:** Gender, Race (defendant block). Not extracted, not stored — the client party registry has no such fields. Flag in case the design space wants them (they matter for some county reporting).

**Status:** 1, 3-parser, and structural detection are implemented; 2 and the cause-pending reminder pattern need Michael's ruling / a design pass.

**RULED 2026-08-13 (#66):** capture BOTH sex and race/ethnicity, on both intake paths (OAA + CR-3), one answer governing both; cause-number-pending reminder YES (flag until filled). Question closed. *(Add-only annotation; the original text above stands as written. Item 2 — which appointee names are "mine" — is NOT covered by this ruling and remains open.)*

### 2026-07-25 — Statute-tracking design §2 source facts: the .gov site is now a client-side app

**Where:** statute-text-and-bill-tracking-design.md §2 ("Chapter files at `https://statutes.capitol.texas.gov/docs/{CD}/{fmt}/{CD}.{ch}.{ext}` … static between effective dates") and A2's fetch design.

**Finding (T1 build, live-verified 2026-07-25):** statutes.capitol.texas.gov has been rebuilt as an Angular SPA. Every `/docs/...` URL serves the same app shell; the content loads client-side from a backend at `tcss.legis.texas.gov`. Consequences, all verified live:
- **User-facing deep links still work exactly as designed** — the app client-routes `/docs/FA/htm/FA.153.htm#153.002`, honors the anchor, and even preselects the section in its navigation. A1's URLs stay as specced.
- **A2's server-side fetch must target the backing file host instead:** `https://tcss.legis.texas.gov/resources/{CD}/htm/{CD}.{ch}.htm` serves the ORIGINAL static chapter files (same naming, same `name="153.002"` anchors, Constitution as `CN.{art}.htm` with `{art}.{sec}` anchors). The edge function should fetch there; robots/UA courtesy per design §2 still applies. There are also JSON APIs (`tcss.legis.texas.gov/api/GetStatuteArray/...`) if structured data ever beats HTML parsing.
- **V1–V3 all resolved:** 28 two-letter code abbreviations live-verified (fixture in `src/cites/codes.ts`); CCP letter-suffix chapters confirmed as `CR.55A.htm`; Estates=ES and Business & Commerce=BC confirmed. Vernon's Civil Statutes (CV) did NOT resolve on the guessed pattern — left classified-but-unlinked pending a real URL pattern.
- Site banner says statutes are current through the 89th 2nd Called Session (2025) — two specials have already happened, relevant to §5's cadence assumptions.

**Status:** T1 built against the corrected facts; design doc §2 should be updated at next revision. No decision needed unless the design space prefers the JSON API over static-file fetching for A2.

### 2026-07-25 — Statute-tracking design snapshot lags the project-knowledge version

**Where:** `docs/specs/statute-text-and-bill-tracking-design.md` (repo snapshot filed at `02da677`).

**Finding:** Per the 2026-07-25 session prompt, the design-space (project-knowledge) version of this doc is AHEAD of the repo snapshot: §9 open items O1–O4 marked resolved in the doc itself (LegiScan key issued 7/24, validated 7/25), W1 banked, A2 carries the .gov redirect implementation note, and B4 is hardened with the LegiScan suspension triggers. The repo copy still shows §9 as open (the RESOLUTIONS are recorded in session-log.md and CLAUDE.md, so no information is lost — but the doc text itself is stale). The Code session applied only the three 2026-07-25 deltas Michael's prompt specified (A4 `section-removed`, A2 normalized-hash note, canonical-path status line) rather than reconstructing the rest.

**Status:** No decision needed — next time the design space touches this doc, export a full refreshed snapshot to replace the repo copy.

### 2026-07-25 — Go_Live_Gates.md routed into the repo WITHOUT gates 1–5 (export needed)

**Where:** new `docs/specs/Go_Live_Gates.md`, created per the 2026-07-25 medical-walkthrough handoff (Item 0).

**Finding:** the handoff routed the design-space-only Go-Live Gates document into the repo and supplied gates 6–8 verbatim — but the verbatim text of **gates 1–5 exists only in the project-knowledge copy** and has never reached a Code session (confirmed: no copy anywhere on disk). The repo file carries gates 6–8 plus an explicit placeholder for 1–5, and stages the gate-3 in-place amendment ("See gate 6 — policies cannot be meaningfully tested until a sign-in flow exists") to be applied when the text arrives. Nothing was reconstructed from memory.

**Status:** Next design session should export gates 1–5 verbatim (with the gate-3 amendment applied) so the repo copy becomes complete and canonical under the GitHub sync.

### 2026-07-25 — Session-1 heartbeat voice capture never reached Code (export needed)

**Where:** `docs/specs/case-heartbeat-voice-capture-2026-07-25.md` — referenced as the **source of record** by `case-heartbeat-design.md` and listed in the 2026-07-25b handoff's routing table ("should already exist if that handoff was applied; if not, apply it too").

**Finding:** the 2026-07-25b and 2026-07-25c handoffs were both applied together on 2026-07-25 (this Code session) — the session-1 handoff never reached a Code session, and the session-1 voice capture file is not in the repo, not in either zip, and nowhere on disk. Nothing was reconstructed. The design doc, captures "b" and "c", and the TRCP skeleton are all filed; only the session-1 capture is missing. The superseded mid-session addendum (`case-heartbeat-suit-filed-addendum-2026-07-25c.md`) was correctly NOT routed, per the "c" handoff.

**Status:** Next design session should export the session-1 voice capture (and the session-1 handoff's log entry, if one was written — the synced session log has no session-1 heartbeat entry) so provenance is complete.

### 2026-07-25 — Heartbeat handoff e applied; two notes back to the design space

**Where:** the 2026-07-25 voice-session PUSH-TO-CODE work order ("Downstream
Branches" — capture e). Applied in full: capture e filed, session-log entry
appended, H28/H31/H32 markers updated in place in `case-heartbeat-design.md`,
Rule 239a verified in the TRCP skeleton.

1. **Rule 239a verification result:** the deadline skeleton carries NO 239a
   text at all — neither the 2020 nor the 2026 edition. The skeleton was
   extracted for the discovery/litigation spine and never included the
   default-judgment or post-judgment rules. Nothing needed correcting; a
   change-flag entry was added to the skeleton's §8 (law-change ledger
   family, next to the 166a flag) so the eventual 239a registry entry is
   drafted from the March-2026 text.

2. **`case-heartbeat-design.md` §8.12 now lags capture e.** Per the work
   order, this Code session updated only the H28/H31/H32 markers — no fold.
   §8.12 still lists discovery and depositions as unwalked with a resume
   point at "the discovery phase proper," but capture e walked the
   default-judgment thread, post-judgment clocks, no-answer fork, discovery
   phase, and the deposition timing model; the real resume point is **H39**
   (defendant-driver vs. corporate-rep deposition fork), and the open-item
   register now runs H1–H41 (H35–H41 live only in capture e Part 10). Next
   design-side pass on the doc should fold capture e Parts 1–7 into §8 and
   extend the register, per the doc's own §12.2 pattern.

**Status:** No decision needed on 1 (flag placed). 2 is the standing fold
queue — capture e is the source of record until folded.

### 2026-07-25 — Heartbeat handoff f applied; fold queue now two captures deep

**Where:** the 2026-07-25 mixed voice/text PUSH-TO-CODE work order (capture f
+ APIL 2025 course-book mining pass 1). Applied in full: capture f filed,
mining doc filed (every proposition UNVERIFIED), session-log entry appended,
"Follint" → **"Foland"** corrected in place in capture d and
`case-heartbeat-design.md` §8.10, and the design doc's stale resume point
corrected (header, §8 intro, §8.12, §12.2) — it had cost session time twice.

1. **No repo contradiction found.** The handoff's assumptions (nothing
   heartbeat-related built, D3/H8 still gating T1, capture e unfolded)
   all match the working tree.
2. **§8.12 now carries an explicit two-capture fold-queue notice** (e AND f)
   with the corrected resume point — pass 2 of the course-book mining — and
   the register range H1–H58 (§11's table still stops at H34; H35–H41 live
   in capture e, H42–H58 in capture f and the mining doc). The full fold of
   captures e + f into §8 and the register extension remain design-side work
   per §12.2's pattern.
3. **One "Follint" instance deliberately left:** the session-log's e-session
   entry (service-chase line) is history and the log is append-only; the new
   f-session entry records the correction, so the record is self-correcting
   downstream.

**Status:** Fold queue is the only carried item; captures e and f are the
source of record until folded.

### 2026-07-26 — Prop. Code 53/28 packet applied (session 2); three reconcile answers for the design side

**Where:** the 2026-07-26 session-2 PUSH-TO-CODE work order (Servpro deadline-engine
design pass). Applied in full: design doc filed, fee-basis amendments 1–5 folded,
review queue updated (amendment 6), session-log entry appended.

1. **The 2011/2021 correction was genuinely applied here** — the working tree
   still said "2021 may→shall" in all three places (`time-tracker-fee-basis-
   profiles-design.md` §6 table and §7 item 5, and `attorney-review-queue.md`
   §2). No prior correction existed. Also fixed for consistency: the fee doc's
   §5 Prompt Payment companion bullet carried the same "18%/yr" annualization
   and the stale VERIFY framing — the annual figure is removed there too (per
   the work order's do-not-annualize rule) and the bullet now cites §28.005(b)
   / O1-closed / V11.
2. **No doc existed at `docs/specs/prop-code-53-28-deadline-engine-design.md`
   or any equivalent** — no ch. 53, lien-deadline, or Servpro doc under any
   name. Filed as a new file, verbatim, ⛔ BUILD GATE intact at the top.
3. **No canonical law-change ledger file exists.** The TRCP skeleton's "law-
   change ledger" is a flag convention inside §7/§8 of that doc, not a ledger
   file, and `watch-targets-seed.md` is bill-tracking seed data (a different
   mechanism — LegiScan watch targets, not enacted-change history). The four
   bills (S.B. 929 2025, H.B. 2237 2021, H.B. 3485 2023, S.B. 1768 2023)
   therefore stay in `prop-code-53-28-deadline-engine-design.md` §9 as the
   work order directs. If the design space wants a standing ledger file, that
   is a design decision — flagging that this is now the third "law-change
   ledger family" reference (166a, 239a, ch. 53/28 bills) with no single home.

**Status:** No repo contradictions found — nothing heartbeat-, time-tracker-,
or lien-related is built; D3/H8 still gates T1, matching the work order's
assumptions.

### 2026-07-26 — Law-change ledger: a FOURTH homeless family, with a mis-sort trap

**Where:** no canonical file exists — that is the point.

**Finding:** the Est. Code ch. 352 / CPRC ch. 71 statutes pass adds a **fourth** family of law-change entries with nowhere to live (after TRCP 166a, TRCP 239a, and the ch. 53/28 bills). It also surfaces a trap that any naive ledger will fall into:

- **Ch. 352 was added by H.B. 2502 (Acts 2009, 81st Leg., R.S., Ch. 680), effective 1 January 2014** — a four-year gap between enactment and effect.
- **§352.004 was then amended in 2011 (S.B. 1198) and 2013 (S.B. 1093)** — amendments to a provision **not yet in effect**. Any ledger keyed on enactment year mis-files these; any ledger keyed on effective date collapses three distinct legislative events onto one date.
- This is also a **third applicability-anchor pattern**, alongside "commenced" (§38.001 / H.B. 1578; §53.156 / S.B. 539) and "date of service" (H.B. 4145).
- Ch. 71 adds its own: §71.012 and §71.022 added 1999, each amended 2017 and 2019; §71.001 and §71.003 amended 2003; §71.0055 added 2003.

**Status:** flag only. **No ledger file was created** — that is a design decision Michael has not made. Recorded so the fourth family is not lost, and so whoever designs the ledger designs it against the enactment-vs-effective-date split and the three anchor patterns rather than discovering them later.

### 2026-07-26 — Outlook Phase 2: two concrete arguments surfaced within the first hour of real use

**Where:** `src/outlook/graph.ts`, `src/outlook/sync.ts`, `src/pages/CalendarTab.tsx`, and
`docs/specs/outlook-calendar-sync.md` §Phase 2.

**Why this is worth recording:** the Phase 2 spec sets its own pickup criteria as *"revisit
after Phase 1 has run in daily use for a while and the higher-priority queue is clear."*
Phase 1 reached real use for the first time on 2026-07-26 (log #20). **Michael hit the
one-way seam within the hour, unprompted**, first asking whether deleting in Outlook would
delete in the app, then whether the software would push it back. That is the daily-use
signal the criteria were waiting for, arriving immediately rather than after a while.

**Finding 1 — the one-way limitation is genuinely surprising in use.** Michael's words:
*"I thought that I was supposed to be able to delete the event in outlook and it would
delete in the case management software."* The behaviour is correct per spec — Phase 1 is
one-way, Phase 2 is backlogged — and the UI does say *"Outlook remains the complete picture
of the schedule."* But the expectation still formed. Contributing factor worth noting for
whoever writes the Phase 2 pass: the spec's own gloss that *"'One-way' means direction of
authority (software → Outlook), not create-only"* means edit and cancel DO propagate, so
the feature behaves bidirectionally in three of four operations. The one that doesn't —
delete-in-Outlook — is the one a user is most likely to try casually.

**Finding 2 — deleting in Outlook produces a stale belief, then a silent resurrection.**
This is the concrete failure mode, verified in code:
- Nothing reads from Outlook. Every Graph call is a write (`POST`/`PATCH`/`DELETE`); there
  is no poll, no webhook, no read path. So a delete made in Outlook is **never observed**,
  and the app goes on showing the event as pushed.
- When the app next pushes that event, `PATCH /me/events/{id}` 404s and
  `graph.ts:129-131` deliberately falls through to `POST` — *"Deleted directly in Outlook —
  recreate (software is the authority)."* **The event silently reappears in Outlook with a
  new id.**
- The trigger is not immediate: `CalendarTab`'s mount effect does **not** sync, and
  `syncAllPending` only sweeps events still marked pending. It takes an **edit or cancel of
  that specific event in the app** to resurrect it — which can be days later, and will feel
  arbitrary when it happens.

**Assessment `[D]`:** the recreate-on-404 branch is coherent for a one-way design and
should not be "fixed" in isolation — silently dropping the event instead would be worse,
since the app would then hold an event it believes exists nowhere. **The real answer is
Phase 2**, or, if Phase 2 stays backlogged, a narrower affordance: notice the 404 and
*ask* rather than recreate, and/or surface "this event is no longer in Outlook" on the tab.
Both are design decisions, not Code's.

**Status:** OPEN — routed to design, nothing built and nothing changed. **This is not a bug
report; Phase 1 works as specified.** It is the daily-use evidence Phase 2's own pickup
criteria asked for, logged while it is fresh so the sequencing decision has it. Sequencing
remains Michael's.

### 2026-07-26 — DESIGN REQUEST (Michael): calendar event notes need to be multi-line and structured

**Where:** `src/pages/CalendarTab.tsx` (the event form), `EventRecord.notes` in
`src/domain/types.ts`, and the Graph mapping in `src/outlook/graph.ts`.

**Michael, 2026-07-26, on first use of the calendar event form:** *"on the notes section
for calendar event creation, I want to be able to put a longer description than one line
and want to be able to indent and go to another paragraph or bullet point."*

**Current state, verified in code — the request is well founded:**
- The form renders notes as **`<input type="text">`** (`CalendarTab.tsx:256`) — a
  single-line control. It cannot accept a newline at all; Enter submits rather than
  breaking the line. There is no paragraph, indent, or bullet affordance.
- `EventRecord.notes` is a plain `string?` — the data model itself imposes no limit, so
  this is a UI constraint, not a schema one.
- The Outlook side is **already better than the form**: `graph.ts:96` sends
  `body: { contentType: 'text', content: [matterLine, ev.notes].join('\n\n') }` — it
  already joins with a blank line and Graph accepts multi-line text. So longer structured
  notes would survive the push today if the form could capture them.

**Not designed here — the questions the design pass has to answer:**
1. **Plain multi-line, or formatted?** A `<textarea>` gets paragraphs and manual
   indentation immediately and is a near-trivial change. Real bullets and indent levels
   mean either a markdown convention or a rich-text editor, which is a much larger
   commitment (sanitization, storage format, a new dependency).
2. **What reaches Outlook?** Graph accepts `contentType: 'html'` as well as `'text'`. If
   notes become structured, the push should probably send HTML so bullets survive — but
   that changes what `graph.ts` sends and wants deciding, not assuming.
3. **Does this generalize?** The same one-line-input limitation likely affects other notes
   fields in the app (office notes, party notes, the docket worksheet's special-notes
   line). Worth auditing as one pass rather than fixing the calendar in isolation.

**Status:** OPEN — routed to design, **nothing built**. Flagged as probably cheap in its
minimal form (single-line input → textarea) and genuinely not cheap in its full form
(rich text). Michael should be told which he is buying before it is built.

### 2026-07-26 — Outlook push: TWO defects found on first exercise, both fixed

**Where:** `src/outlook/auth.ts`, and the absence of a redirect page.

**Context:** BUILD-STATE had said for weeks that the Outlook push "has never been
exercised." Michael registered the Entra app and connected for the first time on
2026-07-26. It failed twice, for two independent reasons — neither of which any amount of
correct configuration on his side could have overcome. **Both are now fixed and the push
is verified working end to end.**

**Defect 1 — the redirect URI pointed at the app root, where the router destroyed the auth
response.** `auth.ts` set `redirectUri: window.location.origin`. The sign-in popup landed
on `/`, the React app booted inside the popup, and `App.tsx`'s
`<Route path="/" element={<Navigate to="/cases" replace />} />` immediately rewrote the
URL — discarding the `#code=…` fragment before MSAL could read it. The popup hung
displaying the app. **Fix:** a dedicated redirect page (`blank.html`) that does not boot
the router.

**Defect 2 — the slice was written against an MSAL popup contract this version no longer
honors.** `@azure/msal-browser` v5 (v5.17.1 installed) removed opener-side URL polling.
`PopupClient.waitForPopupResponse` now waits on a broadcast that **the redirect page itself
must send** via `broadcastResponseToMainFrame()`, exported at
`@azure/msal-browser/redirect-bridge`. A static redirect page can therefore never complete
sign-in — the popup sits on a valid `#code=…` that nobody reads. **This is the more
important finding:** it means the Outlook code was authored against older MSAL semantics
and could not have worked as written with the installed dependency.

**Fix applied (four files):** `blank.html` at the project root (not `public/`, which is
copied verbatim and would leave its module script unresolvable); `src/outlook/redirect.ts`
calling the bridge with a visible-failure fallback; `vite.config.ts` declaring the second
rollup input so the page survives production builds; and the one-line `redirectUri` change.
Verified: `dist/blank.html` emitted, lint clean, 186/186 tests green, and a demo event
pushed successfully to the dedicated "MDBP Cases" calendar with title, time, and location
intact.

**Still unverified, deliberately:** edit- and cancel-propagation to Outlook. Only event
creation has been exercised. The event pushed was fictional demo data, per the
2026-07-26 constraint that live push carries **fictional events only** until
`Go_Live_Gates.md` clears.

**Status:** no decision needed — defects fixed. The generalizable lesson for the design
side: **"written but never exercised" is not a neutral state.** Two independent
blocking defects sat in this slice from the day it was written, and both surfaced within
minutes of the first real attempt. Other never-exercised code in the tree — the two edge
functions especially — should be assumed to carry the same class of risk.

## 2026-07-28 — RLS is not access control on its own; the schema was missing every GRANT (auth slice §5A)

**Fixed in code; recorded because it corrects a load-bearing assumption the design side
has been carrying, and because the next slice walks straight into it.**

First-ever live execution of `db/schema.sql` succeeded — 32 tables, RLS on all 32, 31
policies — and then **every single API request was refused 401**, signed out and with two
different key formats. The key was never at fault. The error was
`42501 permission denied for table`, a **PostgreSQL table-privilege** error raised one
layer *below* RLS.

**The distinction, stated plainly because it has been conflated throughout this project's
docs:** RLS decides WHICH ROWS a role may touch. It does not grant access to the table at
all — that is a separate SQL privilege layer, and PostgREST hits it FIRST. A table can have
RLS enabled and a perfect policy and still be totally unreachable. `db/schema.sql` contained
**zero GRANT statements**; on most Supabase projects that is invisible because new public
tables are exposed automatically, but this project was deliberately created with
**"auto-expose new tables" OFF** (`Go_Live_Gates.md`). Nothing granted them.

**Consequences for the record:**

1. **Gate 3 ("RLS policies written and tested") was even further from satisfiable than gate
   6 suggested.** Gate 6 correctly said policies could not be tested without a sign-in flow.
   It did not anticipate that they could not be *reached* either. Both were true at once.
2. **CL-2 INHERITS THIS.** `case_clients` — and any other table that slice adds — will be
   unreachable the moment it is created unless its GRANT is written with it. `ALTER DEFAULT
   PRIVILEGES` was deliberately NOT set, because silently exposing future tables is exactly
   the posture this project rejected. The cost is that every new table needs an explicit
   grant. `db/schema.sql` carries a *** READ THIS BEFORE ADDING A TABLE *** note at the
   grants block.
3. **The two undeployed edge functions probably share this root cause.** BUILD-STATE
   describes them as auth-blocked because "the poller writes to tables nothing can read."
   That diagnosis is likely incomplete — `service_role` grants were never issued either.
   NOT investigated this session (the functions are not deployed and are out of slice
   scope); flagged so the deploy session starts from the right hypothesis rather than
   re-deriving it.
4. **No client upgrade is required.** The new `sb_publishable_` key format and the legacy
   `eyJ` JWT both work with the installed `@supabase/supabase-js` 2.110.8. The key-format
   theory was tested and eliminated; either value may stay in `.env`.

**The generalizable lesson, and it is the #21 lesson again one layer down:** the schema had
been read, reviewed, and described accurately in three documents for weeks. Every
description was *true* — 32 tables, RLS on, 31 policies — and the system was still
completely non-functional, because the true statements did not cover the thing that was
missing. Reviewing an artifact confirms what is present; only executing it finds what was
never there.

## 2026-07-28 — magic-link tokens are single-use and effectively single-device

**For any future auth documentation; no decision needed.** Observed live during the §5A
walkthrough: the first sign-in link was opened on Michael's **phone**. The token was
consumed there, and the desktop — the machine actually running the app — was left with an
expired link. The second attempt (open the email on the computer, put the link into the
browser running the app) worked.

Worth naming because the instinct is to open email wherever it lands. Two properties combine:
the token is **single-use**, and a session is established in **the browser that opens it**.
Signing in on a phone therefore signs in the *phone*, not the desktop.

The implicit flow (chosen at AUTH-1 — see the session log) is what kept this benign: it
degraded to a plainly-worded expired-token page. Under PKCE the same click would have failed
with a code-verifier mismatch, which reads as a broken app rather than a stale link. Any
user-facing sign-in instructions should say: **open the link in the browser where you want
to be signed in.**

## 2026-08-08 — `new-machine-bootstrap.md` has no `npm install` step

Found on the P1 Gen 8 while closing the QR3/MM1 queue batch: the machine is
provisioned per the bootstrap checklist and the clone is present, but
`node_modules` does not exist, so `npm test`, `npm run build`, and
`npm run lint` all fail with "'vitest' is not recognized". The checklist
covers git, Claude Code, the clone, `inbox/`, and (as of MM-1) git identity —
but never installs dependencies.

Consequence, and why it matters now: **a freshly provisioned machine cannot
run the verification suite CLAUDE.md requires before ending a session.** The
Phase 0 + T3 kickoff targets this machine, and a build session there will hit
this on its first `npm run build`.

Suggested fix is one line in §4 after the clone (`npm install`), but the
bootstrap doc was only amended today under MM-1's routed work order, so this
is left for a routed instruction rather than added here. **Michael's call.**

## 2026-08-09 — the capabilities memo is not in the repo, but Stage 2 is specified against it

Found on the P1 Gen 8 during the Phase 0 environment stand-up. Both the Part 8
authorization and `transcript-sort-and-route-design.md` §12 specify Stage 2 (T3)
"per §11-T3 and **the capabilities memo §9** shape", and cite **memo §8** for the
8 GB sequential-loading rule and **memo §2** for the engine default. **That memo
exists only in the design space — there is no copy anywhere under `docs/`.**

Consequence: the sync scope carries `docs/` but excludes `src/`, so a Code session
executing Stage 2 can read the *pointer* to §9 and not §9 itself. Part 8 and §12
between them carry enough to have done the environment work (FastAPI,
OpenAI-compatible surface, NeMo-not-ONNX, sequential loading, CPU/int8 fallback),
but "the memo §9 shape" is doing real specification work that the executing session
cannot see.

Suggested fix: route the capabilities memo (or at least §§2, 8, 9) into `docs/specs/`
before Stage 2 is authorized. **Michael's call** — it is a design-space document and
routing it is a design-side action, not a repo edit.

## 2026-08-09 — memo §8's sequential-loading rule now has measurements under it

Not a defect; evidence the design side does not have. Measured on the P1 Gen 8
(full detail in `phase0-environment-standup-2026-08-09.md` §3.1): Parakeet fp32
weights occupy **2433 MiB**, Sortformer fp32 **491 MiB**, both concurrently
**2924 MiB** of live tensors over a 1137 MiB idle desktop — so on 8151 MiB,
**weight residency is not the binding constraint** and roughly 3.5 GB stays clear.

This does **not** retire sequential loading: peak *activation* memory during decode
is unmeasured and is the figure that decides it, and measuring it needs audio, which
is held. Flagged so §8 can be revisited **with data** when Stage 1 produces it,
rather than being either kept or dropped on assumption.

Also worth folding into the memo when it is next revised: NeMo's `[cu12]` extra pins
`torch==2.12.0+cu126`, and **CUDA 12.6 has no sm_120 kernels** — on Blackwell it
installs a stack that imports cleanly and fails at device time. The working pairing
is plain `nemo_toolkit[asr]` over a pinned cu128 torch.

## 2026-08-13 — npm advisories on fresh install (filed by ruling, #66; HK-1, formerly H1)

npm advisories on fresh install (P1, 2026-08-08): 5 advisories (1 moderate, 4 high), all in
dev-dependency chains of a lockfile green at 232 tests on 07-28. Triage as a routed task on a
machine that can test the result — NOT auto-fixed via `npm audit fix`, which can silently desync
the machine from the tested lockfile. Filed by ruling 2026-08-13 (#66).

## 2026-08-19 — "gapless" file-number claim survives in the master spec (C-6 fallout)

Michael ruled C-6 on 2026-08-18 (Grok external review, record doc section 3 item 11): the
file-number requirement is **"unique, year-scoped, not client-assigned"**, and the "gapless"
claim comes out. The ruling names the SCHEMA HEADER, and the executing Code session removed it
there (db/schema.sql) - holes are now documented as normal.

**The same claim also sits in a canonical spec, which a coding session may not edit:**
docs/specs/case-management-project-instructions.md line 55 reads "server-side gapless file
numbers" in the v0.1 slice description. That doc is design-space canonical and read-only here,
and the packet routed no change to it. Left exactly as it is.

For the design space: the schema can no longer keep a gapless promise and now says so, so the
spec sentence is the last place the retired claim survives. Michael may want it conformed on the
next refresh of that document.

## 2026-08-19 - gate 10 slice: the ruled key list cannot find the app's own driver's-licence keys

Raised by the gate 10 build session, which is the first session with authority to read `src/` on
this question. Nothing in the spec was edited; the migration handles it and says so.

**The slice's §5 pre-flight report scans `parties.fields` for keys that look like DOB / SSN / DL,
using this ruled list:**

    'dob','date_of_birth','ssn','social_security',
    'dl','drivers_license','driver_license','license_number'

**Two of those are right and four are misses.** `src/domain/partyRegistry.ts` declares, on the
`client` party type (lines 94-97), the field keys `dob`, `ssn`, `dlNumber` and `dlState` - and
`dob` again on the `person` type (line 255). So `dob` and `ssn` are covered, and NONE of `dl`,
`drivers_license`, `driver_license` or `license_number` matches either `dlNumber` or `dlState`.
**On the ruled list alone, a stored driver's licence number and its issuing state would have come
back CLEAN.**

This is not a defect in the slice's reasoning - §5 states in terms that the list is a heuristic and
cannot be exhaustive, and it was written design-side where `src/` is outside the sync and
`Q-PR3-1` is unruled. It is that stated limit turning out to be load-bearing on the first run.

**What the build session did, and what it deliberately did not do.** The migration
`db/migrations/2026-08-19-gate10-pii-columns.sql` probes BOTH lists, labelled separately: the ruled
eight carried verbatim, and the four as-built keys marked as the build session's addition on
evidence, with the file naming the source line. The ruled list was not edited, extended in place,
or quietly replaced - a reader of that file can still see exactly what the slice said.

**The larger finding behind it, which is the part for the design space.** G10-3 asked whether the
front end writes these values into `fields` today. **It does, on all three, and the app has no
other home for them:** the party form renders every registry field with no filter and saves the
whole blob; the OAA importer writes an extracted `dob` on party creation; the demo seed plants
`dob` on two fixtures. The `sensitive: true` flag on `ssn` masks the DISPLAY in list views
(`src/components/fieldWidgets.tsx`) and has no effect on storage. `listParties()`, `getParty()`
and `getParties()` all `select('*')`.

**Consequence for how gate 10 should be read: the migration delivers the exclusion limb in the
SCHEMA and does not put it in EFFECT.** Until a front-end half writes SSN and licence numbers to
`party_pii` instead of to `fields`, the values keep riding every party read exactly as they do
today. No front-end work was built - the slice is report-only on this point by its own terms and
the kickoff prompt's DO-NOT list is explicit - but the gate cannot be read as closed by the
migration alone, and **authorizing that front-end half is now the named next act on this gate.**

**One operational consequence Michael should expect.** The migration's pre-flight STOPS the whole
file if any `parties` row already carries one of the ten keys, per the slice's flag-rather-than-guess
rule. Whether the two live rows carry `fields.dob` is not determinable from the repo - the seed is
localStorage-only and never reaches Supabase, and the RLS probe inserts no `fields` at all. So a
STOP on first run is a real possibility and is the design working, not a failure; the exception
names the keys it found.

## 2026-08-19 - `anon` and `service_role` hold three privileges on all 37 tables that nothing in this repo granted

Found by the gate 10 build session, from a query it ran only because "no mechanism I know of"
is not evidence. **Nothing was changed. No remedy was run. Every option below is Michael's.**

**UPDATED THE SAME EVENING: FOUR OF THE EIGHT DIAGNOSTICS BELOW WERE RUN BY MICHAEL'S HAND, AND
THEY IDENTIFY THE MECHANISM, CLOSE THE READ-EXPOSURE LIMB AND FALSIFY C-2'S PREMISE.** The entry is
kept in its original order with the answers folded in where they land, so the reasoning that led to
the queries is still legible next to what the queries returned.

**THE OBSERVATION, his own query output, live:**

    grantee       privilege_type   tables
    anon          REFERENCES       37
    anon          TRIGGER          37
    anon          TRUNCATE         37
    service_role  REFERENCES       37
    service_role  TRIGGER          37
    service_role  TRUNCATE         37

and separately `has_table_privilege('anon','party_pii', <select|insert|update|delete>)` FALSE on
all four, against TRUE on all four for `authenticated`.

**WHAT IS PROVEN, AND WHAT IS NOT - THE DISTINCTION IS THE WHOLE FINDING.**

- PROVEN: the privileges exist, on every table, for both roles.
- PROVEN: nothing in this repository granted them. Across `db/schema.sql` and all six migrations
  there are **17 executable grant/revoke statements and ZERO executable lines naming `anon` or
  `service_role`** - every occurrence of either string in `db/` is inside a `--` comment.
- **PROVEN, AND BY CATALOG READ RATHER THAN INFERENCE: THERE IS NO READ EXPOSURE.** `anon` holds
  none of the four DML privileges, and a `pg_class.relacl` sweep for an empty-grantee entry across
  every table in `public` returned **ZERO ROWS** — so there is no `PUBLIC` grant anywhere either,
  which was the one way a read could have hidden from the first sweep. *(An earlier draft of this
  line kept the universal claim open and blamed `information_schema` for not displaying PUBLIC
  grants. That was wrong twice over: the view does surface PUBLIC when the grantor is an enabled
  role, and what actually hid them was the grantee filter in the sweep's own WHERE clause. The fix
  was one more query, not a permanent limit.)*
- **PROVEN: `anon` holds FOUR privileges, not three.** `pg_class.relacl` reads `anon=Dxtm/postgres` —
  TRUNCATE, REFERENCES, TRIGGER and **MAINTAIN**. `MAINTAIN` is a PostgreSQL 17 addition and
  `information_schema` follows the SQL standard, which has no such privilege, so the first sweep
  silently truncated the answer.
  Three limits, because the reassuring version is the one that would be wrong: *"writes nothing"*
  would be FALSE, since `TRUNCATE` is a destructive write and `anon` holds it; the
  `has_table_privilege` test covered **`party_pii` only** and the other 36 rest on the
  `information_schema` listing (see 3b: a direct `relacl` sweep has since confirmed no PUBLIC grant exists on any of them); and reachability is open in either direction.
- **NOT ESTABLISHED, IN EITHER DIRECTION: whether the three are REACHABLE by an unauthenticated
  caller.** Holding a privilege and being able to fire it are different facts and only the first is
  proven. Every draft assertion of "not reachable today" was refuted in review for substituting the
  repo for the live database. TRUNCATE is destructive and, as engine behaviour, is not filtered by
  RLS - but whether PostgREST will ever emit it for a role holding only these three is not
  answerable from any file here.

**THE RECORD DAMAGE.** The sentence *"`anon` gets nothing, by design"* and its variants appear
**16 times across 13 files** at `f44b3ec`, measured WRAP-AWARE - a line-anchored sweep returns 15
across 12 and is wrong, because `in-1`'s copy wraps across a line break. The tally moves with the pattern, so no single sweep can be trusted to have found them
all. *(An earlier draft of this entry claimed one variant was reached by no `anon`-anchored
pattern at all; that was FALSE - `anon` sits on the same physical line, thirteen characters
before the predicate - and is retracted here.)* The reason this cannot be grep-and-replaced
does not rest on that: it rests on the sentence being true in the sense each file meant it.
The sites are including `db/schema.sql`, four migrations, BUILD-STATE, the gate 10
slice, the gate 10 kickoff prompt, three forward-looking specs that would carry it into unbuilt
slices, two append-only session-log entries, and `src/components/RlsProbePanel.tsx:73`, which
renders it to the screen on a signed-out probe run. **It cannot be fixed by grep-and-replace**: it
is true in the sense each file meant it - the project grants `anon` nothing - and false as written.
Blurring those back together while repairing them would lose the finding. Two sites are append-only
history and several are design-space canonical, so the routing is Michael's. **BUILD-STATE's copy
is corrected in this batch; nothing else was touched.**

**C-2 IS TWO CLAIMS FUSED, AND ONLY ONE WAS EVER ESTABLISHED.** The ruling (grok review section 3
item 9, 2026-08-18) reads *"`ALTER DEFAULT PRIVILEGES` stays unset"*, reasoned from *"chosen
deliberately twice; has held since the #28 outage."*

1. *This project never issued it* - **TRUE**, and checkable: six occurrences across `db/schema.sql` **plus** `db/migrations/*.sql`, all six
   inside comments, zero executable. (Counting note: one of the six **wraps across a comment break**
   at `db/schema.sql:504-505`, so a line-anchored grep under-reports it at five. The build session's
   own first count made exactly that error and was corrected.)
2. *It is not set on the database* - **FALSE, AND NOW READ RATHER THAN ASSUMED.** It had never been
   checked by anyone; it has now. `pg_default_acl` carries
   `postgres | public | r | anon=Dxtm/postgres, authenticated=Dxtm/postgres, service_role=Dxtm/postgres`,
   so **`ALTER DEFAULT PRIVILEGES` IS SET** — by Supabase's own bootstrap, before this project's first
   table existed. `party_pii`'s `relacl` matches it character-for-character, with `relowner = postgres`.
   No file in `db/`, `docs/`, `src/` or `supabase/` had ever read `pg_default_acl`. The stated reason is a record of the project's own
   conduct, not a catalog read. The grok review even flagged it - its Uncertain list carries
   *"live ACLs unverifiable"* - while its clean-bill line *"no anon grants anywhere"* is true of the
   repo's SQL and reads as a statement about the database.

**We didn't do it, therefore it isn't there. That is F-1's exact shape, one level up** — named at
16:00 and disproven by 17:00 the same afternoon, by one catalog read. **C-2's operative conclusion -
*a new table without its own GRANT is unreachable* - SURVIVES, ON A WARRANT NOBODY HAD:** it is true
because the vendor's default withholds exactly the four DML privileges, not because no default
exists. **So the posture has been held by Supabase's bootstrap, not by this project's discipline, and
it would change silently if that default changed.**

**AND A SHARPER CONDITION SURFACED THAT NO VERSION OF C-2 CONTEMPLATED.** A *second* default-privileges
rule, `supabase_admin | public | r`, grants **`anon=arwdDxtm` — SELECT INCLUDED** — to tables created by
THAT role. Default privileges are per-creating-role, so it does not touch the 37, all of which are owned
by `postgres`. **But "unreachable by default" now depends on WHICH ROLE CREATES THE TABLE, and whether
anything in Supabase's tooling ever creates a `public` table as `supabase_admin` is OPEN.**

**THE INSTRUMENT PROBLEM.** `src/auth/rlsProbe.ts` drives PostgREST, so it can only ever observe
read and write privileges. `REFERENCES`, `TRIGGER` and `TRUNCATE` are invisible to it on every role.
**An unexpected grant hides from it exactly as well as a missing one — and it fired a second time,
subtly: `information_schema` reported THREE privileges where the catalog shows FOUR, `MAINTAIN` being
a PG17 addition the SQL standard has no name for.** The tempting next
sentence is NOT available: that they sat there through every probe run ever made is UNESTABLISHED.
The sweep is one reading, taken 2026-08-19; an ACL carries no timestamp, the granting mechanism is
unidentified, and a blanket GRANT issued last week would return the same 37 rows as a default in
force since July. How long they have been held is OPEN. BUILD-STATE already reasons to within one step of this
("only a WRITE proves a policy grants access"); the step further is that a probe which only reads
cannot see privileges that are not read privileges.

**EIGHT READ-ONLY DIAGNOSTICS. FOUR HAVE NOW BEEN RUN — Michael's hand, 2026-08-19, writing
nothing. The remaining four stay staged.**

1. **RUN — ANSWERED: YES, IT IS SET.** The query that answers C-2 literally:
   `select defaclrole::regrole, defaclnamespace::regnamespace, defaclobjtype, defaclacl from pg_default_acl;`
   **Returned `postgres | public | r | anon=Dxtm/postgres, ...` plus a second rule from
   `supabase_admin` granting `anon=arwdDxtm`. C-2's premise is FALSE.**
2. **RUN — ANSWERED: `postgres`, via the default above.** The ACL carries the grantor, which
   `information_schema` discards:
   `select relname, relowner::regrole, relacl from pg_class where oid = 'public.party_pii'::regclass;`
   `anon=xtD/postgres` vs `anon=xtD/supabase_admin` discriminates an inherited default from a
   vendor-role grant. An entry with an EMPTY grantee is a grant to PUBLIC, which the
   `information_schema` view does not display at all.
3. ~~Per-table scope~~ - **RUN — ANSWERED: all 37, both roles.**
3b. **RUN — ANSWERED: NO `PUBLIC` GRANT ANYWHERE.** A `pg_class.relacl` sweep for an empty-grantee
   entry across every table in `public` returned ZERO ROWS, which closes the read-exposure limb for
   all 37 rather than for the one directly tested:
   `select c.relname, a.acl::text from pg_class c join pg_namespace n on n.oid = c.relnamespace cross join lateral unnest(coalesce(c.relacl,'{}')) as a(acl) where n.nspname='public' and c.relkind='r' and a.acl::text like '=%';`
4. Is there a DDL event trigger - the creation-time mechanism invisible to (1):
   `select evtname, evtevent, evtenabled, evtowner::regrole, evtfoid::regproc from pg_event_trigger;`
5. Does `anon` hold USAGE on schema public - the gate under every reachability question, and the
   repo grants USAGE to `authenticated` only:
   `select has_schema_privilege('anon','public','usage'), has_schema_privilege('anon','public','create');`
   FALSE on the first would make all three privileges inert.
6. Does `service_role` really lack DML - only `anon` was tested with `has_table_privilege`; the
   `service_role` claim rests on the weaker `information_schema` listing.
7. What functions the live database actually holds and who may execute them - the repo's
   four-function inventory is not the database's:
   `select n.nspname, p.proname, p.prosecdef, p.proacl from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname not in ('pg_catalog','information_schema');`
8. Not a query - **the dashboard.** What Supabase's "auto-expose new tables OFF" actually does at
   the SQL level. The repo has assumed since 2026-07-28 that it is why nothing was exposed; this
   observation shows something did. That answer is in the vendor's documentation, not here.

**REMEDIES, NONE RECOMMENDED AS URGENT AND NONE RUN.** A revoke on one table, or across all tables,
would not stop recurrence - the next table created gets them again - so the real question the
diagnostics decide is whether any fix is a one-off or has to become a standing step in every future
migration. An `ALTER DEFAULT PRIVILEGES ... REVOKE` standing rule **collides with C-2 as ruled and
is Michael's to re-rule, not a coding session's to implement.** A revoke of `service_role`'s
TRUNCATE would also remove a privilege a future statute-cache refresh might want, failing later and
far from here. **Capture `relacl` before any revoke** so the restore is byte-exact rather than
reconstructed. The go-live gates today contain **no privilege step at all**.

**Not urgent: no real client data exists anywhere in this database — and after the four diagnostics
the only limb still open is REACHABILITY, holding `TRUNCATE` and being able to fire it being different
facts.** **THE REMEDY QUESTION IS NOW SHARPER, NOT SOFTER: the rule producing these grants is
SUPABASE'S, so any `ALTER DEFAULT PRIVILEGES ... REVOKE` is a divergence from the vendor baseline
rather than a correction of this project's own act — squarely Michael's to rule, and not something a
coding session should implement.**

## 2026-08-19 - gate 1's backup rationale is half wrong, and one limb of it can never be settled

Found the same session, from Michael's own Supabase dashboard, read before pasting gate 10's
migration. **Nothing was edited in `Go_Live_Gates.md` - it is append-only and design-space
canonical.**

`Go_Live_Gates.md` gate 1 (2026-07-25) reads: *"The free tier has no automatic backups and pauses
after inactivity; neither is acceptable once real case data exists."* Session log `#114` reasoned
from it: *"Every schema act until today ran against a database with no automatic backup - the three
migrations this morning included, on a manual-dump-or-nothing footing. Gate 10's migration will be
the first schema act with a backup behind it."*

**The dashboard shows ELEVEN PHYSICAL backups spanning 12-19 August** - a week before the Pro
purchase of 2026-08-19 - **and each row carries a Restore button.** The eleven decompose exactly:
eight days, one per day at ~10:30 UTC (~05:30 Central), plus **two extra on 15 August and one on
19 August**. **So gate 10's migration was the FOURTH live schema act with a backup artifact behind
it** - the three of 2026-08-19 morning (session log #113), then this one - **and the seventh ever.**
*(An earlier draft said "at least the EIGHTH" and derived it from nothing: eight is the number of
DAYS in the window, not a count of schema acts. Corrected before filing, because a correction that
repeats the error class it exists to fix is worse than no correction.)* Retention appears to be about seven
days; had backups begun only at the upgrade there would be one or two, not eleven spanning a week.

**THE LIMB THAT CANNOT CLOSE, RECORDED AS UNCLOSEABLE RATHER THAN SMOOTHED.** Michael is reading
that Restore button **from a Pro account**. Whether it was there on 18 August, from a free account,
is a different question and is now permanently unanswerable - the upgrade changed the only state
that could have answered it. It remains possible that Supabase retained physical backups on the free
tier and exposed restore only on paid, in which case `#114`'s *operational* framing was right even
though its factual claim was wrong. **The distinction between "the artifacts existed" and "you could
have restored from them" is the one the finding turns on, and it is left open.**

**What this does and does not change.** It does not unmake the decision: gate 1 is bought, `GL-1`
floor item (2) stays closed, and Pro's other purchases - no pausing, 8 GB, whatever retention and
PITR terms attach - are untouched. What was wrong is the gate's stated REASON, which gave backups as
a co-equal ground. **For the design space: gate 1's text may want a correcting append, and `#114`'s
reasoning should not be cited forward as written.** The gate 10 migration's own run instructions
carried the same claim and were corrected in place before it was pasted (commit `f44b3ec`,
comment-only, executable lines verified identical before and after).

## Resolved

- ~~Data-hygiene check on feature-intake-2026-07-24.md~~ — the Code session
  filing the 2026-07-24 intake handoff flagged two spots as possible
  live-matter data (item D's Cigna/Rawlings/Machinify lien amounts; item A's
  "the Curry matter" example) and held the commit local. Michael resolved
  same day: the amounts carry no other identifiers, no HIPAA conflict —
  pushed as-is.

- ~~Spec-list drift~~ — the conventions block's `docs/specs/` list was missing
  `medical-billing-analysis-module-prompt.md` and `session-log.md`; corrected
  in CLAUDE.md on 2026-07-21.
- ~~Repo hosting~~ — decided 2026-07-21: private GitHub
  (`mdbpllc/brennan-case-manager`).
