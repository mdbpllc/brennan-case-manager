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
