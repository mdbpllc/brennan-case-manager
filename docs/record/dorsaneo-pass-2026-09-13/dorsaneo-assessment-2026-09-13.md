# Dorsaneo's *Texas Litigation Guide* against the build — what it can do, and what it corrects

**2026-09-13 (Central; DT-1) · typed design session, Cowork · opened on Fable 5.1, completed on Opus 5 · PROPOSED THROUGHOUT — nothing here is ruled, and nothing has been staged for Code.**

**Status:** working document, design side. Not canonical. Every proposition below is UNVERIFIED; only Michael verifies.

---

## 1. What this pass is, and the four rules it ran under

You said you had the entire *Texas Litigation Guide* available and asked what could be done with it in the context of what has been built — and what in the project could be rebuilt, corrected, or improved. You then ruled the pass **"Start now, scoped"**: read and draft now, but mint no `#nn`, ship no packet, and put no ruling sheet until the firm-obligations sitting has packaged.

Four constraints governed, and they shape what this document is:

**The Guide never enters project knowledge or the repo.** It is licensed LexisNexis material — the same class as the probate corpus's Part II, whose ruled home is the ARCHIVE project. It stays in `Documents\Knowledge Repo\Civil\Dorsaneo\` and was read over the bridge. What follows is synthesis, with short attributed quotation only.

**Dorsaneo is a LOCATOR, never authority.** This is the status the record already gave a vendor AI research assistant at `WS-3`, and a treatise sits in the same place: it tells you where the law is, it does not establish what the law is. So every finding below that matters was carried through to the **primary source** — in practice, the clean-authority TRCP PDF that SOURCING already names as the channel for Texas rules.

**Retrieval is not verification.** Nothing here is verified. The corrections in §3 are reads of operative rule text with the command that produced them named; they enter as UNVERIFIED propositions for your adopt/reject/edit.

**ROUTE-C governs the divergences.** Where a finding changes what a registry entry *means*, proposed conforming wording is drafted and put to you independently — never adopted silently, never as a package, and a cite change implied by adopted wording is its own act.

### Method, stated so the evidence can be checked

The 68 Lexis batch zips (458 MB) were staged into the session container and text-extracted with `pdftotext -enc UTF-8`. That yielded **4,814 PDFs, 4,617 unique by normalized text** (197 were re-downloads of the same batch), **6,798,563 words**, across **10 units and 138 chapters**. Every document carries its own breadcrumb, so the set indexed cleanly into a per-chapter manifest.

Thirty-six chapters were then read end to end by fourteen extraction agents against a fixed schema — deadlines, encodable rule statements, procedural checklists, form structures, research locators, flags. About 3.6 MB of structured extract. The chapters read: **1, 1A, 2, 3, 4, 30, 31, 61, 62, 63, 64, 72, 90, 90A, 91, 92, 97, 98, 102, 103, 110, 110A, 120, 120A, 290, 291, 300, 301, 302, 310, 340, 341, 342, 343, 344, 345.**

Two operational notes for the record. The device VM's shell again could not mount a granted folder — the third sitting in a row; the desktop app now names the cause (a Windows update of September 8). Everything was read through staged read-only copies, so no git command ran on your machine, no lock could be stranded, and no live `ls-remote` was possible. And the pass **exhausted the week's Fable allowance** in its first fifteen minutes; the reading was completed on Opus 5, which is where the MODEL USAGE routing sends execution work anyway.

---

## 2. The first finding: the export is about half the Guide

Delivered separately this sitting as `Dorsaneo_Export_Inventory_and_Gaps_2026-09-13.md`, and repeated here because everything downstream depends on it.

The export holds 138 chapters. Aggregating the Guide's own `Ch. N, Title` cross-references across all 4,617 documents finds 114 chapter numbers referenced-but-absent, of which **at least 75 are *Texas Litigation Guide* chapters** (the remainder belong to other Matthew Bender titles by their subjects and are filtered out in the companion note) — and they are disproportionately the ones a litigation case manager leans on:

- **Pleadings:** 11 (Plaintiff's Original Petition), 12 (Pleading the Parties), 13 (Class Actions), 14 (Sanctions for Improper Pleading), 70 (Answer), 71 (Cross-Claim and Counterclaim)
- **Damages and fees:** 20 (Damages in Tort), 21 (Damages in Contract), 22 (Attorney's Fees) — Ch. 20 is the single largest hole; it is where the exemplary-damages formula, mitigation, and every damages measure live
- **The four discovery instruments:** 93 (Requests for Production; Subpoenas), 94 (Depositions), 95 (Written Interrogatories), 96 (Requests for Admissions)
- **Dispositions and judgment:** 100 (Default Judgment), 101 (Summary Judgment), 131 (Judgment), 132 (Enforcement of Judgments), 133 (Contempt), 140 (Motions for New Trial), 141 (Findings of Fact)
- **Appellate:** 145–148 (overview, analysis, perfecting and docketing, suspending enforcement)
- **PI substance:** 292 (Death Actions), 293 (Claims Against Governmental Entities), 320 (Products Liability), 321 (Medical Malpractice), 330–332 (assault, false imprisonment, malicious prosecution)
- **Other practice lines:** 250, 251, 252, 255, 256, 257 (title — note that **253 and 254 ARE present**, so the range is not continuous), 271 (Mechanic's and Materialmen's Liens — the Servpro line), 362 (Divorce), 380–382 (paternity, adoption)

Acquisition is your hand, permanently, under SOURCING. The tier list in the companion note is the suggested download order. Tell me when new zips land and I stage only the new ones.

**One consequence worth naming now, because it disciplines everything below.** Ch. 1A, Texas Claims and Defenses, is a *routing layer*: it gives elements and points at a detail chapter for the forms and the depth. Roughly half the chapters it indexes are absent. So the claims taxonomy this pass can seed is real but shallow in exactly the places the practice is deepest — death actions, governmental claims, med mal, products.

---

## 3. CORRECTIONS — four items, each carried to the operative rule text

This is the section that earns the pass. In each case Dorsaneo surfaced the question and the **clean-authority TRCP PDF** answered it: `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf`, extracted with `pdftotext -enc UTF-8 -layout` and read by rule.

**A provenance caution first, and it is a real one.** SOURCING says Texas rules are cited "with the PDF's own effective date." **This PDF states no effective or currency date on its face** — its first page is the table of contents. It carries two "Comment to 2026" markers, so it reflects at least some 2026 amendments, but under SOURCING's own rule that *currency is never inferred from a document*, the currency of this PDF is **not established**. The reads below are therefore reads of *this document's text*, cited as such. Establishing the PDF's currency is a separate act and it is yours.

### 3.1 The 50-day discovery-response branch is Family-Code-only, and it says so in the rule's own words

**What the build says.** BUILD-STATE's deadline-memo headline: *"on the July 2026 text the 50-day discovery-response extension is FAMILY-CODE-ONLY,"* and `docs/specs/trcp-deadline-skeleton-2026-03-01.md` §5 *"states the opposite."* The record adds: *"The skeleton was NOT edited; resolving it is your verification act."* The conflict has been carried, unresolved, since the memo.

**What the skeleton actually says.** Its §5 rows read:

> `TRCP-196.2 | 196.2 | Requests for production: respond within 30 days after service; a defendant served before its answer is due need not respond until 50 days after service`
> `TRCP-197.2 | 197.2 | Interrogatories: same 30 / 50-day structure`
> `TRCP-198.2 | 198.2 | Requests for admission: same 30 / 50-day structure`

followed by the footnote that does the damage:

> `*(Same structure also appears at 194a for Family Code suits — out of scope here.)*`

That footnote asserts the 50-day branch is the *general* rule and that Rule 194a merely mirrors it for family cases.

**What the operative text says.** The limitation is **inside the rule**, in the rule's own words, in **all four** request-based instruments — one more than the skeleton covers:

- **196.2(a)** (production): "The responding party must serve a written response on the requesting party within 30 days after service of the request, **except that a defendant in a suit governed by the Family Code** served with a request before the defendant's answer is due need not respond until 50 days after service of the request."
- **196.7(c)(1)** (entry on property): same clause, verbatim. **The skeleton does not cover Rule 196.7 at all** — zero occurrences.
- **197.2(a)** (interrogatories): same clause.
- **198.2(a)** (admissions): same clause.

And the two disclosure rules are split by title, which is the cleanest evidence there is: **Rule 194 is "REQUIRED DISCLOSURES IN SUITS NOT GOVERNED BY THE FAMILY CODE"** and contains no 50-day branch anywhere; **Rule 194a is "REQUESTS FOR DISCLOSURE IN SUITS GOVERNED BY THE FAMILY CODE"**, and its 194a.3 carries the 50-day branch *without* needing the qualifying clause, because the rule's title already supplies it.

**Disposition, in the UNVERIFIED register these findings actually sit in.** On this document's text the deadline memo reads right and the skeleton reads wrong, with the footnote as the load-bearing error. **PROPOSED:** the three §5 rows are rewritten to carry the Family-Code limitation in the rule's own words; a fourth row is added for **196.7(c)(1)**, which the skeleton omits; and the footnote is struck and replaced with its inverse. This is a ROUTE-C act on a spec, not a registry entry, so it needs your adopt/reject/edit but not a re-verification.

**Why it matters in practice, stated concretely.** A PI or civil-litigation defendant served with written discovery before its answer is due has a **flat 30 days**. An engine carrying the skeleton's branch would show twenty days of slack that does not exist — and it would do so on requests for admission, where Rule 198.2(c) makes the default **automatic and merits-dispositive**. That is the worst instrument on which to be wrong.

**A note on why the error is forgivable, and where it probably came from.** Dorsaneo itself carries the same mistake. The Master Trial Guide's own checklist `CL-1.05.3(1)` (§ 1.05[3]) states the 30/50 structure **generally**, across requests for disclosure, RFPs, entry requests, interrogatories and admissions. That checklist was never conformed to the 2021 Rule 194 amendment — you can see the seam in the same document, whose narrative text *does* describe required disclosures and Rule 194.2(b) while the checklist below still says "requests for disclosure." Ch. 91 § 91.03, the updated treatment, gets it right: requests for disclosure "have generally been replaced by the required disclosure procedure," and the 50-day branch survives only in Family Code suits under Fam. Code ch. 301 and Rule 194a, for actions filed on or after September 1, 2023.

**Carry this forward as a class, not an instance:** a treatise checklist can lag the treatise's own narrative by a full rule amendment. Anything sourced from a `CL-` checklist needs the narrative section checked beside it.

### 3.2 TRCP 21a(c) adds three days for mail only — the doubt resolves in favor of the entry as written

**What the build says.** BUILD-STATE: *"`P-2`'s 'only to mail' is IN DOUBT — TRCP 21a(c) has long read 'by mail **or by commercial delivery service**' — not re-retrieved, and the highest-value verification target in the section."*

**What the operative text says.** Rule 21a(c), in full:

> "**Time for Action After Service.** Whenever a party has the right or is required to do some act within a prescribed period after the service of a notice or other paper upon him and the notice or paper is **served upon him by mail, three days shall be added** to the prescribed period."

Mail only. Not commercial delivery service, not fax, not email, not electronic service through the filing manager. Rule 4 says the same thing from the other side: "Saturdays, Sundays, and legal holidays shall be counted for purpose of the three-day periods in Rules 21 and 21a, **extending other periods by three days when service is made by mail**."

The confusion has a source, and it is worth recording so it does not recur: **21a(b)(1) does treat mail and commercial delivery alike** — "Service by mail or commercial delivery service shall be complete upon deposit." But that is the *completion* rule, not the *added-days* rule. Subsection (b) pairs them; subsection (c) does not.

**Disposition.** **PROPOSED:** `P-2` stands as written on this document's text, and the row carries a note naming the (b)/(c) distinction as the reason the doubt arose. One read of one PDF does not *resolve* a doubt under this project's own rules — it supplies a proposition for you to verify. Since almost all service is now electronic through the filing manager, the practical reading is that **the three-day extension almost never applies** in a modern case — which is the opposite of the instinct a deadline engine would encode from habit.

### 3.3 The interrogatory cap is PAIRWISE, and a VERIFIED registry entry says otherwise

**What the build says.** `Q-FE5-9`, carried in BUILD-STATE as a divergence *inside a verified entry*: *"the TRCP 190.3(b)(3) entry says 'each party,' the operative rule says 'any other party' — 25 interrogatories vs. 125 in a five-defendant posture, so an engine built to the entry's wording would refuse discovery the rule permits, silently. FLAGGED, NOT REWORDED."*

**The entry, verbatim,** in `docs/specs/legal-rule-registry-discovery-and-carrier-duties.md`:

> **Rule.** Level 2 discovery limits **each party to 25 interrogatories**; discrete subparts count as separate interrogatories; interrogatories asking a party only to identify or authenticate specific documents do not count against the limit.
> **Status:** VERIFIED — Michael Brennan, 2026-08-11.

**What the operative text says.** Rule 190.3(b)(3): "**Any party may serve on any other party** no more than 25 written interrogatories, excluding interrogatories asking a party only to identify or authenticate specific documents. Each discrete subpart of an interrogatory is considered a separate interrogatory."

**Disposition.** The flag reads correct against this document's text. **PROPOSED conforming wording**, put on its own, ROUTE-C:

> **Rule.** At Level 2, any party may serve **on any other party** no more than 25 written interrogatories — a pairwise limit, not a case-wide budget; discrete subparts count as separate interrogatories; interrogatories asking a party only to identify or authenticate specific documents do not count against the limit.

**Adopting this detaches the entry's verification** — verification attaches to wording — so the entry returns to UNVERIFIED until you verify the new text. That is the #95 sequencing rule, and it is why this is put to you rather than done.

**While you are in that file — and this is a restatement, not a discovery.** The **Level 1** figures are absent from the registry: Rule 190.2(b) caps at **15** interrogatories, **15** requests for production and **15** requests for admissions, with **20 hours** of deposition per *party*; Level 2 gives **50 hours per side** and states **no numeric cap for RFPs or RFAs at all**. `docs/specs/fe-5-interrogatory-budget-spec-2026-08-15.md` already carries these as P-1/P-2/P-3 and already records the gap in its own words — *"Genuinely absent from all four files: Rule 190.2 in its entirety (all three Level 1 caps)."* Its P-1/P-2/P-3 rows already carry the rule text at TIER A provenance, UNVERIFIED. This pass confirms that finding at the rule text; it does not add to it.

### 3.4 The verified Rule 194 entry has no timing in it, and the timing is what the discovery calendar hangs on

**What the entry says.** `docs/specs/legal-rule-registry-discovery-and-carrier-duties.md` carries "TRCP 194 — initial disclosures (post-2021), EXPANDED wording," VERIFIED 2026-08-12, its scope ruled at `#108` (`Q-WS2-1(a)`) to be **the whole of Rule 194**. Its wording states that initial disclosures are required without awaiting a request, and enumerates **five categories** of content — while the entry's own prose twice calls it "the four-category working list." That internal contradiction is flagged, not resolved; it is a second reason the entry needs your eye.

**What Rule 194 actually contains.** Twelve enumerated content items in 194.2(b) — including two PI-specific medical-records items and the responsible-third-party item — plus the timing rule the entry does not state:

> **194.2(a) Time for Initial Disclosures.** "A party must make the initial disclosures **within 30 days after the filing of the first answer or general appearance** unless a different time is set by the parties' agreement or court order. A party that is **first served or otherwise joined after** the filing of the first answer or general appearance must make the initial disclosures **within 30 days after being served or joined**."

**Why this is the most consequential item in the section.** That date is not just a disclosure deadline. It is the **anchor of the entire discovery calendar**:

> **190.3(b)(1)(A)** — the Level 2 discovery period "begins **when the first initial disclosures are due**" and continues until the earlier of 30 days before trial or nine months after that anchor.
> **190.2(b)(1)(A)** — the Level 1 period begins at the same anchor and runs 180 days.
> **195.2** — experts for a party seeking affirmative relief are designated **90 days before the end of the discovery period**; all other experts **60 days before**.

So: **first answer or general appearance → +30 days → discovery period start → period end → −90/−60 → expert designation.** Four rules, one chain, anchored on a single case event the app already stores. The built disclosures generator sits at the far end of that chain and the chain is not currently modeled.

**Disposition. PROPOSED, three separate acts, each put on its own:**
1. The Rule 194 entry gains **194.2(a)'s timing** in the rule's own words. (Adoption detaches verification.)
2. The entry's content list is reconciled against the **twelve** enumerated items — or, if you prefer one-proposition-one-home, the timing becomes its own entry and the content entry keeps its scope. **Which of those two shapes is yours to rule**; I am not choosing it.
3. The **chain itself** — the four-rule computation above — is drafted as a deadline-engine specification rather than a registry entry, because it is an arithmetic composition of four verified-or-to-be-verified propositions, not a proposition of its own.

**Two live ambiguities Dorsaneo names under that chain, neither resolvable from the rule text, both surfaced rather than encoded:**
- **Does Rule 4's weekend/holiday roll-forward apply to a deadline counted BACKWARD from a fixed date?** Dorsaneo advises designating *earlier* and cites authority rejecting Rule 4 for backward counts. Every deadline in the chain after the period-end is counted backward.
- **"Furnish" and "disclose" are not "serve."** Because Rules 194.3 and 195.2 use those verbs, Dorsaneo reads the designation as needing to be *actually received* by the deadline — the opposite of every other written-discovery deadline, which turns on service.

---

## 4. GAPS — what Dorsaneo maps that the build has nothing for

Ordered by what it would cost you to be wrong.

### 4.1 The post-judgment and appellate tree — the build has none of it

BUILD-STATE's screens list ends at the trial court. Dorsaneo's Master Trial Guide supplies the whole downstream tree as a closed date computation off one input, **the date the judgment was signed**: motion for new trial or to modify within 30 days → overruled by operation of law at 75 → plenary power for 30 days after the earlier of the signed ruling or the operation-of-law date → then the appellate deadlines, the record, the briefing schedule, the supreme-court petition window, and the enforcement track (abstract, execution on one of three triggers).

For a solo practice this is the highest-consequence unbuilt calendar in the system: every deadline in it is jurisdictional or close to it, and the plenary-power computation is the one that ends the trial court's ability to fix anything.

### 4.2 The DWOP spec — and a correction to my own first draft of this section

**I had this wrong and the verification pass caught it.** My first draft said `case-heartbeat-design.md` "treats staleness and DWOP risk as first-class signals." It does not. DWOP appears **once** in that file, in a civil-defense row whose engine column reads *"the model differs and **is not designed here**,"* and the file scopes itself to the plaintiff-PI posture. Staleness is first-class there; DWOP is not modeled at all. I carried the phrase from an extract's own summary line and asserted it about the build without opening the build file — the failure the verify-before-criticizing rule exists to prevent, recorded here rather than quietly fixed.

The gap is therefore **larger** than I first wrote, not smaller. Ch. 103 is the specification the heartbeat does not yet have: three independent dismissal grounds, the Rules of Judicial Administration time standards (**18 months jury / 12 months non-jury**, both running **from the appearance date** — itself a Monday-snap computation, so the anchor has to be modeled before the standard can be), the notice requirement — and the reinstatement chain as a closed jurisdictional computation off the **date the dismissal order was signed**: +30 days to file a *verified* motion → +75 to a signed ruling or automatic overruling → +30 of plenary power.

Two traps the extract flags for any UI that offers "nonsuit this case": **limitations does not toll on nonsuit**, so the refiling date is the operative limitations date; and it is *reinstatement*, not refiling, that preserves the original filing date.

### 4.3 The hospital-lien lifecycle, and settlement money generally

BUILD-STATE: *"NO MONEY MACHINERY: no settlement ledger, trust/IOLTA, liens."* Ch. 102 supplies a complete and encodable lien module — six date-and-amount rules, of which four are windows (the 72-hour admission window, the 100-day charge window, the 7-day physician emergency-care window, and an EMS window that **probably does not reach this practice at all** — Prop. Code § 55.002(c) gives the EMS lien only in a county of 800,000 or less, and Bexar is well over, so it is flagged rather than encoded), the perfection requirements, and the priority rules. Beside it: prejudgment interest, which accrues from **the earlier of (a) the date suit is filed or (b) the 180th day after the defendant receives written notice of a claim**, and ends the day before judgment. Both limbs matter — suit is usually filed first, so an engine built on the 180-day limb alone computes a later start and understates the interest on most files. Two intake-captured dates, one money number on every PI file — and the Chapter 42 / Rule 167 offer-of-settlement clock, which is a court-keyed deadline profile in miniature.

And from Ch. 291, the settlement-credit arithmetic with an explicit, sourced order of operations: §§ 33.012 and 33.013 as independent caps, the >50% bar applied *before* exemplary analysis, comparative reduction *before* the TTCA cap.

One adjacency that pays for itself: **Lab. Code § 417.001(b)** — a finding of employer responsibility reduces the comp carrier's subrogation interest by the amount of the corresponding judgment reduction. A recurring dollar recovery the software could flag.

### 4.4 The responsible-third-party pipeline

Ch. 291 gives it almost verbatim as a deadline-plus-workflow: a motion due **60 days before trial** that resets on continuance but not after expiry, with a **disclosure prerequisite** — and here is the interlock that makes it a software problem rather than a calendar entry: a missed or late Rule 194.2(b)(12) disclosure can **forfeit the proportionate-responsibility defense** once limitations runs on that person. The disclosure item and the designation deadline are the same fact appearing in two modules.

Two counterintuitive rules that have to be encoded together: an RTP can be designated **even where liability is impossible** — bankrupt, immune, repose-barred, an unknown criminal, a comp employer — and the RTP's percentage does **not** reduce the plaintiff's recovery; it only changes the odds of joint-and-several exposure.

### 4.5 Limitations modeled as a property of the claim, not the matter

Ch. 72's own checklist says "categorize **all potential claims**." The build carries a limitations date **per client**. One MVC file routinely carries a 2-year PI claim, a 4-year UM/UIM *contract* claim that does not start until the carrier denies, and a 2-year bad-faith claim — three dates, three claims, one client.

The extract names **diligence in service** as the highest-value unbuilt feature in the chapter: it is the only place where a *timely* case is lost by *inaction after filing*, and the case law fails plaintiffs at intervals measured in weeks. And **repose is a separate, untollable track** — the extract counts nine distinct periods and names eight (§§ 16.008, 16.009, 16.011, 16.012 current and former, 74.251(b), TUFTA § 24.010(a), GARA), a discrepancy to resolve before encoding — each running from readily ascertainable events, which is precisely what makes them computable.

### 4.6 Practice-of-law obligations: eight rows, not thirty-five

The firm-obligations catalog seeds 35 templates. Ch. 3 yields **eight** recurring or retention rows — and the interesting part is which ones:

- The **IOLTA triple**: the annual compliance statement, the 30-day *opening* notice, and the **30-day closing notice** that catalogs usually omit.
- A **five-year trust-records retention that runs per matter from termination of the representation** — not per calendar year. That is a different data shape from every other row in the catalog: it is a per-matter obligation masquerading as a firm-level one.
- **Rule 1.18** (effective 10/1/2024) makes the intake conflict check a rule-governed *record*, with a cure path requiring a declined-intake log of what information was received.

Ch. 3 gives the *consequence* of unpaid bar dues and lapsed MCLE — administrative suspension — but **no amount, no due date, no hour count, no grace period**, and nothing at all on malpractice renewal or appointment-list eligibility. Those rows must come from the State Bar Rules and the TIDC county plans. That is exactly what DECISION 9A's fifth and sixth SOURCING channels were opened for, and this pass confirms they are load-bearing rather than nice-to-have.

**One flag with teeth:** **seven** disciplinary rules changed in a single October 2024 package — 1.08, 1.09, 1.10, 1.18, 3.09(f), 5.01, 5.05(d). (The extract this came from said "six" over seven bullets; the miscount is corrected here, in the section that warns about exactly this.) Any registry entry on conflicts, imputation, screening, prospective clients or supervision drafted from older material is **presumptively stale**. The DECISION 8 drafting act should carry that as a precondition.

### 4.7 Bexar County as a computed input, twice

Two independent chapters landed on the same point. **"Legal holiday" includes days the courthouse is closed by direction of the commissioners court.** So the holiday set your firm-obligations weekend rule flags is not a fixed list — it is a county calendar, and it is a legal input to Rule 4 counting.

Compounding it: **short periods branch on their SOURCE.** Rule 4 skips weekends and holidays for periods of five days or less *in these rules* — but authority holds that provision does not reach *statutory* periods, because the Code Construction Act was never amended to match. A five-day rule deadline and a five-day statutory deadline count differently.

Separately, Ch. 2 names Bexar as its worked example of a county whose statutory county court statute says very little, forcing reliance on the general grants — so a flat court-selection table would be wrong in an unknown number of the 94 counties with statutory county courts.

---

## 5. IMPROVEMENTS — three shape changes, not new features

### 5.1 Ch. 1 is a treatise-authored phase ladder, and it is a better comparator than anything the build has

The build models case status as a per-case-type ladder — for PI today, treatment → demand → suit → trial. Dorsaneo's Master Trial Guide is the same object written by the treatise: **eleven sections (§§ 1.01–1.11) carrying 31 distinct `CL-1.xx` checklist ids**, each pinned and each routed to a detail chapter. Preliminary determinations → petition → filing and service → responsive pleadings → discovery (four sub-stages) → pretrial disposition (three exits) → pretrial arrangements → trial → judgment → court of appeals → supreme court → enforcement.

The value is not that you should adopt it — your ladder is tuned to a PI practice and his is a general civil map. The value is as a **completeness check**: it is the only artifact in reach that enumerates the whole arc, and the build's ladder stops at "trial" while the treatise's continues through four more phases that carry the most jurisdictional deadlines in the system.

**PROPOSED:** the ladder is drafted as a comparison table — Dorsaneo's phase, the build's status value if one exists, and the gap — for a hands-on sitting rather than a typed ruling. It is a shape question, and CC-1(b) says shape questions wait for the product.

### 5.2 The claims-and-defenses catalog as a playbook seed, with its limits stated on its face

Ch. 1A gives roughly **95 distinct claims and defense sets**, each with a closed element list, a defense list, and a form pointer. Alongside: Rule 93's fourteen verified pleas and Rule 94's affirmative defenses — **non-exclusive, and waived if not pleaded** — which is an answer-generator specification.

Two limits have to travel with it or it will mislead. **Ch. 1A almost never states a limitations period** — it names the statute and stops, some two dozen times. And the detail chapters behind its PI entries are largely absent from the export. So it seeds a *taxonomy*, not a body of law.

### 5.3 Registry entries should carry three dates, not one

Ch. 4 supplies the discipline the registry has been approximating: enactment/adjournment, the stated effective date, and the applicability clause — which is frequently *not* the effective date and is the thing that actually decides which version governs a given case. Ch. 1A demonstrates why it matters: proportionate responsibility alone has **three regimes on two different date axes**, some keyed to filing date and some to accrual date. Chs. 290 and 291 add roughly two dozen immunity and cap chapters, each with its own applicability date.

**PROPOSED:** the registry's entry format gains an applicability line distinct from the effective date. Whether that is worth the churn is a real cost question and it is yours — and the churn is larger than the headline figure suggests: BUILD-STATE's "backlog 47" counts **two named files only**, and its own line warns that a `legal-rule-registry*` glob over-counts. Across all four registry files there are **74** `**Status:**` lines.

---

## 6. What the Guide can do, by module — the short version

| Module | What Dorsaneo supplies | State |
|---|---|---|
| **Deadline engine** | The four-rule discovery chain (§3.4); the post-judgment/appellate tree; the DWOP and reinstatement chains; the RTP pipeline; the Rule 4 counting layer with its source-branching; 1,462 bullets carrying a `[DEADLINE…]` tag across the chapters read | Design only today; this is the largest single beneficiary |
| **Disclosures (BUILT — fixture-only)** | The twelve-item 194.2(b) content spec; the 195.5 retained/non-retained branch that the generator already turns on; four disclosure clocks and their anchors; the RTP/limitations interlock; the fact that **no objection is permitted at all** | Two corrections (§3.1, §3.4) and two ambiguities land directly on it |
| **Case heartbeat** | Ch. 1's twelve-phase ladder; Ch. 103's DWOP spec with the judicial-administration time standards | Design only |
| **Form engine** | Form *structures* only — captions, paragraph order, conditional paragraphs, verification and certificate blocks — never body text, which is what `FC-12`'s "structure only" ruling already requires | Complements the four libraries as a non-lineage comparison set, subordinate to MDB PLLC |
| **Registry** | Several hundred cited propositions, all UNVERIFIED; four confirmed corrections; the three-date currency discipline | ROUTE-C items in §3 are ready to put |
| **PI playbooks** | Defendant-generation checklists (Ch. 290's seven categories, Ch. 302's eleven defendant slots); the premises entrant-status branch; the trucking overlay's fourteen-item statutory checklist with three hire-date-keyed items | Design only |
| **Stowers demands** | A pre-send validation checklist: four activation elements, and the rule that a demand omitting **hospital and provider lien releases** does not activate the duty at all | Directly usable against your canonical templates |
| **UIM** | The judgment-predicate shape — demand → carrier declines consent → suit → judgment — which is *not* the claim-then-demand-then-suit ladder the build gives PI cases; two limitations clocks per UIM client; the offset arithmetic | Bears on a live matter and on the UIM overlay flag |
| **Firm obligations (BUILT — fixture-only; its migration written, not run)** | Eight recurring/retention rows, the per-matter trust retention shape, Rule 1.18's intake record, and the October 2024 staleness flag | Feeds the queued DECISION 8 registry act |
| **Probate** | Unit IX (Chs. 390–394, 400–402, 410–411, 415) appears complete in the export — and the probate corpus already indexes 390–392 | The deferred ladder pass has a source when it opens |

---

## 7. What I propose, and what is yours

**Nothing below is staged.** The firm-obligations fix slice (`FOS-2`) is authorized and unbuilt, batch 97 is pending in `inbox/`, and by your own sequencing ruling nothing from this pass moves until that lands and you give me the number.

> **[FILING NOTE, added 2026-09-16 — the paragraph above stands as written on 2026-09-13 and is not edited to be true today.]** Batch 97 ran on 2026-09-13; `inbox/` is empty and HEAD is `5579ab1`, so `#156` is filed and the sequencing gate is satisfied. This document is now routed into the record as EVIDENCE at `docs/record/dorsaneo-pass-2026-09-13/` by the `#157` packet. **The five ruling items below remain PROPOSED and unstaged** — they travel as register rows carrying their full question text (QR-1), labels only, with durable IDs yours to mint. The per-chapter extracts this document cites are at `Documents\Knowledge Repo\Civil\Dorsaneo\Dorsaneo_Chapter_Extracts_2026-09-13.zip` on your machine, ruled there 2026-09-16 and deliberately not in the repo.

**Ready to put as ruling items when you want them:**

1. The `trcp-deadline-skeleton` §5 correction (§3.1) — three rows and a footnote.
2. `P-2`'s doubt resolved, with the (b)/(c) note (§3.2).
3. The 190.3(b)(3) ROUTE-C rewording (§3.3) — which detaches a verification.
4. The Rule 194 timing, put as the three separate acts in §3.4, including the one-proposition-one-home shape question that is yours.
5. Whether Dorsaneo becomes a **named secondary channel** — my own read is that it should *not*, because it is a locator and SOURCING's channels are for primary law; the cleaner treatment is a standing note that treatise reads are cited per item and never entered as propositions. But it is a convention question, so it is yours, and it would fire trigger 3.

**Held for a hands-on sitting (CC-1(b)):** the phase-ladder comparison (§5.1), because it is a shape question best answered with the product in front of you.

**Yours alone:** the Tier 1 Lexis download (§2); establishing the TRCP PDF's currency (§3 preamble); and the October 2024 disciplinary-package staleness precondition on the DECISION 8 drafting act (§4.6).

---

## 8. Verification record

This document was checked by an adversarial pass told to refute it, reading against the TRCP text, the Dorsaneo source files, the extracts, and the staged build files. **Three HIGH findings, six MEDIUM and six LOW were returned; every one was independently re-confirmed before being acted on, and all were fixed in place.** The three HIGH ones are worth naming, because two are errors about *your* repo rather than about the treatise:

1. **Chs. 253 and 254 were listed as absent from the export. They are present.** The range notation "250–257" swallowed them. This is the second instance in this sitting of a chapter-range error — the same class was caught and corrected inside the Ch. 1 extract — and it is the class that costs you a wasted Lexis download.
2. **The claim that `case-heartbeat-design.md` treats DWOP as a first-class signal was false.** It appears once there and is expressly not modeled. Recorded in §4.2 rather than silently repaired.
3. **Prejudgment interest was stated with one of its two accrual limbs missing** — it runs from the *earlier* of suit-filing or the 180th day, and the omission would have understated the number on most files.

Also corrected: two "(BUILT)" labels that omitted *fixture-only*; a Level-1 registry gap framed as new when `FE-5` recorded it on 2026-08-15; an EMS-lien window that probably does not reach Bexar at all; a seven-item list counted as six; the "47 entries" churn figure, which counts two of four registry files; the Ch. 1 ladder counts; and three dispositions whose "resolved"/"confirmed" wording overstated what one read of one PDF can do.

**What the pass did not shake:** every TRCP quotation in §3, the skeleton and registry quotations, the four BUILD-STATE quotations, and the corpus counts. The four §3 corrections each survived on their text.

---

*Dorsaneo is a locator. Nothing in this document is verified law, and the primary-source reads above are reads of a document whose own currency is not established. Every proposition enters UNVERIFIED, with its source named, for your adopt/reject/edit.*
