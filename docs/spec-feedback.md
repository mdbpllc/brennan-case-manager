# Spec feedback — for Michael to take back to the design space

Per CLAUDE.md: coding sessions never rewrite the specs; problems the build
reveals get noted here instead. Each item needs a decision or a spec update
in the Claude.ai Project space, after which a refreshed snapshot comes back
to `docs/specs/`.

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
