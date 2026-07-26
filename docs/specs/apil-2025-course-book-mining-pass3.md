# Advanced Personal Injury Law 2025 (41st Annual) — Course Book Mining, PASS 3

**Status:** SOURCE MINING, **PASS 3 of 4** — design side, 2026-07-25 (third session same date). NOT canonical, NOT a design doc, NOT in the build queue.
**Canonical repo path:** `docs/specs/apil-2025-course-book-mining-pass3.md` — route Code-side with the accompanying handoff.
**Predecessors:** `apil-2025-course-book-mining-pass1.md` (structural + 5 deep reads), `apil-2025-course-book-mining-pass2.md` (Kostura, Ch. 10 remainder, pre-suit, Rule 204, SCOTX).
**Model:** Opus 5 throughout.
**Copyright note:** TexasBarCLE materials are copyrighted and single-user licensed. Everything below is paraphrase and issue-spotting for internal design use. No article text is reproduced. Do not paste article text into repo docs.

**Registry discipline:** every legal proposition below is an **UNVERIFIED registry candidate**. A CLE paper is a secondary source and a model summarizing it is not verification. Nothing here gets hard-coded, and nothing computes a legal outcome, until Michael reads the primary authority and signs off entry by entry.

**Markers:** [BOOK] = stated in the course book. [ENGINE] = Claude's design implication, unruled. [CONFLICT] = tension with an existing project ruling. [CLOSES] = candidate resolution of an open item. [ERRATUM] = correction to a prior pass. [VERIFY] = pull the primary source before use.

**Open-item register:** ran H1–H67 entering this session. New items here are **H68–H83** (§10).

---

## 0. ERRATUM FIRST — pass 1's article map was incomplete

**[ERRATUM] The book has 27 chapter-level articles, not 23.** Pass 1's article map — carried forward into pass 2 and into both pass plans — omitted **four chapters totalling roughly 230 pages**, about 19% of the book. This was found by systematically detecting chapter title pages rather than trusting the earlier map.

**Missed chapters:**

| PDF p. | Ch. | Title | Approx. pp. | Why it matters |
|---|---|---|---|---|
| 347 | **11** (11.1, 11.2) | Products Liability — *Is Your Car Crash a Product Liability Case?* + *Products Liability Update* (**David Bright**) | ~131 | Evidence-preservation playbook; **statutes of repose**; same author as the deficiency paper behind H35 |
| 479 | **12** | Jury Charge Update | ~8 | Charge-stage; unread |
| 675 | **20** | Uninsured & Underinsured Motorists (Kautz) | ~16 | Sits directly under the PI spec's existing UM/UIM consent-to-settle gate |
| 1017 | **23** (23.1, 23.2) | Estate & Probate for the Personal Injury Attorney | ~78 | **Owns the PR-appointment hard gate**; wrongful-death/survival clocks |

**Two labelling corrections to the map as well:** Ch. 2 (premises/Ch. 95) begins at PDF **95**, not 101; Ch. 18 (CPRC §72.051) is chapter **18**, which pass 1 recorded by its statute number.

**[ERRATUM] Heat-map false positive.** Pass 1 ranked "Specialization 14" among the top deadline-density targets. That article is a **slide deck about sitting for the board-certification exam**; its "deadline" hits are exam application dates. It carries nothing for the engine. Deprioritise it out of the pass-4 plan entirely.

**[ENGINE] Process lesson worth keeping.** The pass-1 map was built by scanning for article boundaries and was silently incomplete; nothing downstream flagged it, and two passes of planning inherited the gap. Any future source-mining pass should **derive its inventory mechanically and state the derived count**, then reconcile against the book's own table of contents (PDF pp. 3–6, never read in any pass — see §11). This is the same derive-don't-store discipline the registry already applies to dates, applied to source inventory. → **H68**

**Corrected full article map (PDF page → chapter):** 79 Ch.1 Evidence/Trial Notebook · 95 Ch.2 Premises & Ch. 95 · 109 Ch.3 Insurance Update · 139 Ch.4 Legislative · 171 Ch.5 Future Damages · 191 Ch.6 Jury Selection · 215 Ch.7 Noneconomic post-*Chohan* · 239 Ch.8 Mediation · 251 Ch.9 Nonsubscriber (9.1 at 257) · 325 Ch.10 Appellate/Preservation · **347 Ch.11 Products Liability (11.1 at 353, 11.2 at 427)** · **479 Ch.12 Jury Charge Update** · 487 Ch.13 Discovery Update · 537 Ch.14 AI · 547 Ch.15 Nuclear Verdicts · 577 Ch.16 Trucking Broker · 595 Ch.17 Telematics/Infotainment · 613 Ch.18 CPRC §72.051 · 625 Ch.19 Tax/Double Tax (19.1–19.7 at 633/639/645/651/657/665/671) · **675 Ch.20 UM/UIM** · 691 Ch.21 Subrogation & Liens (Kostura) · 1001 Ch.22 Tilley/Tripartite (Michael's own) · **1017 Ch.23 Estate & Probate (23.1 at 1027, 23.2 at 1039)** · 1095 Ch.24 SCOTX Update · 1137 Ch.25 Pre-Suit Investigation · 1153 Ch.26 Exemplary Damages · 1175 Bonus: Specialization Exam.

---

## 1. What pass 3 covered

Per pass 1 §10 / pass 2 §9, plus the newly-found chapters:

1. **Ch. 19 Tax/Double Tax** — all seven sub-chapters mapped; 19.1 (double taxation), 19.2 (QSFs and ethics), 19.6 (fee deferrals / the IRS GLAM) read in full.
2. **Ch. 3 Insurance Update** — discovery of coverage, conditions/notice, *Menchaca*, the Stowers line, construction coverage.
3. **Ch. 5 Future Damages · Ch. 7 Noneconomic post-*Chohan* · Ch. 15 Nuclear Verdicts** — the damages-proof spine.
4. **Ch. 16 Trucking Broker · Ch. 17 Telematics/Infotainment · Ch. 18 §72.051** — vehicle/preservation cluster.
5. **Ch. 22 Tilley/Tripartite** — read for automation constraints (revising my own earlier recommendation; see §8).
6. **Ch. 14 AI** — read in full this pass (pass 1 only skimmed).
7. **Ch. 26 Exemplary Damages** — net-worth discovery procedure.
8. **Ch. 1 Evidence/Trial Notebook** — damages-evidence section.
9. **NEWLY FOUND:** Ch. 20 UM/UIM (full), Ch. 23 Estate & Probate (23.1 full), Ch. 11 Products Liability (11.1 preservation + repose sections; **remainder deferred to pass 4**).

Not read this pass: Ch. 12 Jury Charge Update; Ch. 11.2 Products Update; Ch. 23.2; Ch. 2, 6, 9 (playbook-level).

---

## 2. THE NEWLY-FOUND CHAPTERS

### 2.1 Ch. 23 — Estate & Probate: the PR-appointment gate finally has its source

The PI spec carries "PR appointment" as a hard gate with no supporting material. This chapter is that material. All [VERIFY].

**Clocks [BOOK]:**
- **Three calendar months** — if no statutory wrongful-death beneficiary (surviving spouse, child, parent) has begun the action within three months of death, the executor/administrator **shall** bring it, unless all beneficiaries request otherwise. CPRC §71.004(c). *This is a duty-shifting clock running from the date of death, and it is the earliest death-case deadline in the project.*
- **Four years** from date of death to file an Application for Letters Testamentary or Letters of Administration. Est. Code §301.002(a). **Exception:** §301.002(b)(1) permits later administration where a PR is needed to pursue the estate's claim against the party responsible for the death — so a >4-year-old death is not automatically fatal.
- **Two-year PI limitations interacts with capacity:** *Austin Nursing Center v. Lovato*, 171 S.W.3d 845 (Tex. 2005) — a post-limitations amendment curing representative capacity can relate back where the petition consistently asserted the capacity. Practice guidance in the chapter is not to rely on it: open the estate *before* filing the survival action.

**Structural distinctions the data model needs [BOOK]:**
- **Wrongful death damages are NOT subject to the decedent's debts** (CPRC §71.011; *Harris Cty. v. White*). **Survival damages ARE** (Est. Code §101.051, subject also to delinquent court-ordered child support). This is a *disbursement-waterfall fork keyed to which cause of action produced the money* — and it connects straight to pass 2's §2.3 payer catalog and to Kostura's wrongful-death/survival Medicare allocation material. The chapter's own practice tip: in heavily indebted estates, beneficiaries may want to plead **wrongful death only**.
- **The estate is not a legal entity** and cannot sue or be sued (*Belt v. Oppenheimer*; *Henson v. Estate of Crow* — a take-nothing judgment resulted from naming the estate). Only the PR may generally sue for estate property (*Shepherd v. Ledford*), with exceptions: heirs may sue where no administration is pending and none necessary, or where the PR cannot/will not sue or is antagonistic (*Mayhew v. Dealey*). "Necessity" is absent where debts are paid and the family has agreed on distribution; a family settlement agreement supports that.
- **Rule 151 vs. Rule 152 asymmetry [BOOK, important].** Plaintiff dies → heirs/administrator may appear and be substituted; if no appearance within a reasonable time, the defendant may obtain scire facias and, on failure to appear, **have the suit dismissed**. Defendant dies → the court issues scire facias and the remedy is **substitution, not dismissal**; death divests personal, not subject-matter, jurisdiction (*In re Coats*). A suggestion of death for a defendant is **not** a general appearance, unlike the plaintiff-side rule.

**[ENGINE] Design implications.**
1. **Client death is a first-class case event with its own thread family**, not a status change. It arms: the three-month beneficiary clock, a probate-referral task, a capacity-cure check before any amended pleading, and a suspension of any thread whose action requires a client signature.
2. **A `cause_of_action_split` attribute (wrongful death / survival / both) becomes load-bearing at disbursement**, because it determines whether creditor claims and the Medicare interest reach the money at all. Pass 2 §2.3 already flagged the Medicare side; this adds the general-creditor side.
3. **A practical dependency worth surfacing:** the chapter notes that without letters of administration it is difficult even to *order medical and billing records*. So the probate track gates the medical-records track — a cross-stage dependency the heartbeat has no way to express today. → **H69**

### 2.2 Ch. 20 — UM/UIM: the consent-to-settle gate, and a limitations trap

[BOOK], all [VERIFY]:
- **Texas is an opt-out state.** UM/UIM must be included unless **expressly waived in writing**; oral rejection is ineffective *even if recorded*; an inaccurately completed form does not waive; and the insurer's failure to collect UM/UIM premiums does not show waiver absent a signed rejection. **[ENGINE]** These are *coverage-recovery arguments* — the intake coverage inventory should capture whether a written rejection exists, because its absence may create coverage the client believes they don't have.
- **Coverage runs with the insured, not the auto.** A claimant injured in a non-owned vehicle — taxi, rideshare, a friend's uninsured car — or **as a pedestrian** may still have UM/UIM. **[ENGINE]** The intake question "was the client in their own car?" is the wrong question; the right one is "what policies name the client or their household."
- **Stacking across policies.** A claimant may be covered under multiple policies (the chapter's example: a teenager insured under each divorced parent's policy) and may recover under **either or both** up to each policy's limits, capped only by damages. An insurer may not reduce its UIM exposure below its own limits merely because another policy paid.
- **The accrual split.** *Brainard* — no contractual duty to pay until a **judgment** establishes the other motorist's liability and underinsured status; neither requesting benefits nor suing the insurer triggers it; and **neither settlement nor an admission of liability establishes UIM coverage**. *Allstate v. Irwin* (2021) — an insured may obtain that determination via a **declaratory judgment action** against the carrier, and may recover attorney's fees. Post-*Irwin*, courts have found claims ripe on an unsuccessful demand without exhausting the tortfeasor coverage dispute. Bad-faith exposure survives (*Cook*, San Antonio 2019; *Burgess*, Austin 2021) where liability is reasonably clear.
- **[CONFLICT-adjacent] Limitations is FOUR years** for a UM/UIM claim, and it survives the expiry of limitations against the at-fault driver — the carrier simply takes an offset for the available liability limits. **[ENGINE] The engine must not derive a single "limitations" date per case.** A case can be dead against the tortfeasor and alive against the UM/UIM carrier for two more years. Any limitations display keyed to a single two-year clock is affirmatively misleading on these cases. → **H70**
- **Consent to settle [CLOSES a gap in the existing gate].** Because the carrier's subrogation right is defeated by the insured's release of the tortfeasor, consent must be obtained. Historically carriers had to show prejudice; *Gonzales* (5th Cir. 2016) shifted the burden to the insured to show the settlement did *not* prejudice the carrier. At least one Texas court has confined *Gonzales* to its facts. **The chapter's operative instruction: obtain consent to settle even when accepting the tortfeasor's full policy limits.** The existing PI-spec gate should be tightened to remove any policy-limits exception.
- **Severance/abatement is effectively mandatory** when UM/UIM and bad-faith claims are joined, and a joined at-fault driver can force severance because the jury would otherwise learn the insurance limits.

### 2.3 Ch. 11 — Products Liability (Bright): preservation clocks and a repose problem

Read: 11.1 Steps One and Five. **Remainder deferred to pass 4.**

- **[BOOK] Preservation letter contents are specific and non-obvious.** The letter to the carrier/adjuster must state that the vehicle *and tire/tread* are evidence of a potential products claim, that no part may be altered/removed/destroyed, **and must request relocation to indoor weatherproof storage** — because tarping does not prevent the rust and corrosion that can destroy a metallurgist's ability to reach conclusions. **[ENGINE]** The existing preservation-letter machinery should carry this as a distinct template variant with the weatherproof-storage clause, not as a generic hold letter.
- **[BOOK] The threat model is time-based and adversarial.** Insurers salvage or scrap vehicles; manufacturers run "first response" teams that dispatch investigators off news reports; vehicles sit in unsecured lots. Tires, treads, airbags, black boxes, seatbelts and whole vehicles go missing before counsel gains control. Where an adjuster will not cooperate, a **TRO** is the tool, and it should bind every party who might foreseeably seek possession, including drivers and insurers of the other vehicles.
- **[BOOK] STATUTES OF REPOSE — a clock family the engine does not model.** Repose differs from limitations in its **trigger**: it runs from an event such as first sale of the product, not from injury, and may bar a claim **before the cause of action even arises**. Roughly nineteen states have them; some are absolute bars, some carry fraud/misrepresentation exceptions, some create only rebuttable presumptions of non-defectiveness, and some states have none. **[ENGINE] Two consequences.** (a) On any case with the product-suspected flag, "how old is the product" and "which state's law applies" become **intake-stage questions with limitations consequences**. (b) Repose is a **choice-of-law-dependent clock** — the first one in the project — which means the engine cannot compute it from Texas rules alone and must at minimum *flag* rather than calculate. → **H71**
- Cross-reference: Ch. 17's telematics preservation (§5.1 below) and Ch. 25's wreckage-salvage urgency (pass 2 §3.6) are the same evidentiary race described from three directions. They should be **one preservation sub-thread with product/vehicle/telematics variants**, not three.

---

## 3. TAX — and the finding that tax is an UPSTREAM gate, not a disbursement step

Pass 2 §2 built the disbursement catalog. Ch. 19 shows part of it sits earlier than that.

### 3.1 [BOOK] What is taxable
§104(a)(2) excludes damages for personal physical injury or physical sickness. Outside that: **emotional distress is taxable unless it flows from physical injury or sickness**; mental anguish, reputational harm and humiliation do not qualify standing alone. **Always taxable:** punitive damages, treble damages, and pre- and post-judgment interest. **Gross-negligence damages are punitive by design and fully taxable** — and Texas has claims that permit *only* gross-negligence damages (the chapter names Labor Code §408.001, i.e. the workers'-comp carve-out death case). [VERIFY]

### 3.2 [BOOK] The double tax
In a taxable case the plaintiff is taxed on the **whole** recovery including the portion paid to counsel, and counsel is taxed on the fee — the "plaintiff double tax." Attorney fees are generally **not deductible** post-TCJA unless the claim involves unlawful discrimination under §62(a)(20). A lump sum in a taxable case concentrates the hit into one tax year and can push the client into higher brackets.

### 3.3 [ENGINE] Why this is a gate, not a step
Courts and the IRS look to the **language of the settlement agreement**; a vague or overbroad allocation risks the entire amount being treated as taxable, and **once signed, the agreement locks in the exposure**. Structured settlements can spread taxable income across years and, on physical-injury claims, exclude both principal and interest.

So the sequence is: *taxability is determined by drafting choices made before signature, and the disbursement engine inherits whatever was decided.* This converts the pass-2 disbursement design in one respect — **a settlement-allocation review is a blocking pre-release checkpoint**, alongside the lien sub-gates, and it must arm at the point a settlement is agreed, not at funding. Its inputs are known early: does the case plead gross negligence / exemplary damages? is there a non-physical-injury component? is there interest? → **H72**

### 3.4 [BOOK] QSFs and the ethics interlock
Qualified Settlement Funds let the defendant pay and take its deduction and release while preserving the plaintiff's planning window. Points with engine consequences:
- Funds paid **directly** by the defendant to a QSF are arguably neither "received" nor "held" by the attorney, so the IOLTA/CTA deposit rules are not triggered; if the check is made out to the QSF or to counsel, counsel should forward it immediately and **notify the client in writing**. Client consent to use a QSF is typically secured long before the check issues.
- **IOLTA interest goes to the bar or its charities — the client gets none.** CTA interest goes to the client but is taxable, sometimes before receipt, and is exposed to state income tax. Funds sitting in trust *while liens are negotiated* therefore cost the client — which ties the lien-clearance duration (pass 2 §2.4) to a quantifiable client cost.
- Where the attorney takes any QSF interest, the total must not be an unconscionable or illegal fee and requires the client's **informed written consent** (Rules 1.5, 1.8). Splitting interest per the fee agreement's shares may be permissible.

**[ENGINE]** A settlement-planning referral prompt and a QSF/structure decision point belong on the settlement-agreed event, with the client-consent artifact captured. This is squarely the "ask carries the action" pattern.

### 3.5 [BOOK] Attorney fee deferrals — a compliance checklist, not a feature
Ch. 19.6 analyses the IRS's December 2022 GLAM rejecting an aggressive deferral. The five failure modes it identifies are, in effect, a checklist: failing to **amend the fee agreement** before settlement (constructive receipt); the defendant promising a **lump sum** rather than a deferred payment; the **provider** rather than the defendant promising the future payment (anticipatory assignment of income); **terminating the client's obligation** so the lawyer is sole obligee (economic benefit doctrine, plus §409A exposure since the independent-contractor exception depends on payment being made on the client's behalf); and reserving the lawyer a **right to borrow** against the deferred amount (§83 / economic benefit). *Childs v. Commissioner* remains the foundation. [VERIFY]

**[ENGINE] This is firm-side financial structuring, not case management.** Recommendation: note it, do **not** build it, and do not let it become a module. Recorded so a future session doesn't rediscover it and mistake it for scope. → **H73** (confirm out of scope)

---

## 4. INSURANCE — coverage discovery and the Stowers apparatus

### 4.1 [BOOK] Discovering coverage is bounded
Insurance agreements and indemnity agreements are expressly discoverable (TRCP 194.2(g)). But *In re Dana Corp.*, 138 S.W.3d 298 (Tex. 2004): policies "need not be produced until they are shown to be applicable to a potential judgment," and **Rule 192.3(f) alone does not support discovery beyond existence and contents** — anything further (erosion of limits, number of competing claims, exhaustion) must be independently discoverable under the general scope rule. *In re Senior Living Props.* (Tyler 2002) had allowed an erosion deposition; *Dana* disagreed to the extent it rested on 192.3(f) alone. [VERIFY]

**[ENGINE]** The coverage-inventory feature should distinguish **what is discoverable as of right** from **what requires a relevance showing**, because that distinction determines whether the system's prompt is "request it" or "brief it."

### 4.2 [BOOK] Conditions are waivable — and often waived
Notice-of-loss conditions can be waived by conduct inconsistent with reliance on them: acknowledging the claim in writing without requesting further notice, beginning an investigation, making payment, recognising partial liability, or **denying on grounds other than late notice**. Substantial compliance generally suffices for conditions precedent, and there is authority that failure of a condition abates rather than bars. *Employers Casualty v. Scott Electric* supplies four categories of excuse for late notice: lack of knowledge of the occurrence; belief the occurrence was trivial; belief of non-coverage; and illness or incapacity. The chapter's practice note: consider **declining to sign a non-waiver agreement** and objecting to a unilateral reservation of rights. [VERIFY]

### 4.3 [BOOK] Stowers, assembled
*APIE v. Garcia*'s four requirements for an effective demand: **written demand within policy limits; on claims covered by the policy; offering a complete release of the insured; on terms a reasonable, prudent insurer would accept given the exposure**. Multi-claimant and multi-insured rules:
- *Soriano* — faced with multiple claims and inadequate proceeds, an insurer may make a **reasonable settlement with one claimant even though it exhausts or diminishes** what remains; unreasonableness is measured against the merits of *that* claim alone, not by comparison to more serious claims.
- *Travelers v. Citgo* and *Pride Transp.* (5th Cir.) — the same logic applies to partial settlement among **multiple insured defendants**; no cause of action for wrongfully accepting an offer to settle with some but not all.
- *OneBeacon v. T. Wade Welch* (5th Cir. 2016) rejected the argument that a demand must release **all** insureds to be a true Stowers demand, confining the contrary *Patterson* memorandum opinion to a very rare set of cases.
- *In re Farmers Texas County Mutual*, 621 S.W.3d 621 (Tex. 2021) — **no Stowers claim without a judgment or settlement in excess of limits**; Stowers is the *only* common-law tort duty a carrier owes its insured. But where the carrier refused to fund a within-limits settlement the insured had to top up, a **breach-of-contract** claim survived Rule 91a.
- *Kenyon v. Elephant Ins.* (San Antonio) — a carrier may owe a separate common-law duty of ordinary care arising from the special relationship, beyond Stowers.

**[ENGINE]** Pass 2 §2.6 flagged that a Stowers demand is probably defective if it fails to resolve statutory subrogation interests (Kostura). Ch. 3 supplies the rest of the validity checklist. Together these fully specify the `stowers_demand` validity gate the playbooks already carry: **within limits · covered claims · complete release · reasonable terms · statutory interests resolved**, with the *Soriano/Pride* multi-party caveats surfaced rather than computed. → **H74**

---

## 5. THE VEHICLE / PRESERVATION CLUSTER

### 5.1 [BOOK] Telematics — the data destroys itself
- **Black-box/EDR capture is ~5 seconds before and after a triggering event**, and is generally triggered by hard braking. **Later hard-braking events can overwrite the prior data.** The chapter's instruction is to download immediately. **[ENGINE] This is a preservation clock measured in days-to-weeks, and unlike a rule deadline the loss is silent and unrecoverable.** It belongs at the top of the preservation thread, above the litigation-hold letter.
- Non-wifi dash cams store only on the device — but footage is often recoverable even from a unit damaged in the crash if it can be powered on. Wifi cams store to cloud, so destruction of the unit is irrelevant.
- ELDs are federally mandated (49 U.S.C. §31137; 49 C.F.R. §395.30), drivers must certify accuracy, and **carriers must not alter or erase** original HOS information or source data streams (§395.30(f)).
- **The key document to obtain is the motor carrier's contract with its telematics provider** — that defines what plan was in effect and therefore what data should exist. The chapter lists common providers (Samsara, PeopleNet, Qualcomm, Bendix, Fleetmatics/Verizon Connect, Motive, Lytx/DriveCam, Fleetboard, Asset Works, Geotab, Janus). **[ENGINE] A provider-profile reference layer** — sibling to the mediator roster and the provider communication profiles — would convert "what should exist" from research into lookup.
- Passenger vehicles: ACM/EDR plus **infotainment**, with BERLA extraction producing vehicle events (door openings, ignition cycles, seatbelt use), location/track logs, connected-device data (call logs, contacts, messages, photos). The chapter calls a BERLA report the most cost-efficient way to prove or disprove how a crash occurred.
- **Discovery standard:** *In re Kuraray*, 656 S.W.3d 137 (Tex. 2022) sets the cell-phone-data test — allege or provide some evidence of use at a time it could have contributed — and the chapter argues telematics should follow the same rubric, with requests **tailored in temporal scope**. Intrusive measures (direct device access) require a showing that the responding party defaulted on its search-and-produce obligation (*Weekley Homes*; *In re Shipman*). An onboard unit installed at manufacture is **part of the vehicle** and inspectable with it (TRCP 196.7).
- **Spoliation:** *Brookshire Bros.* intent-to-conceal-or-destroy standard, including willful blindness; but a litigation hold does **not** automatically extend to disaster-recovery backups (*MRT v. Vounckx*, citing *Zubulake*).

→ **H75:** unify preservation into one sub-thread with variants (vehicle/product · telematics/ELD · scene · records), ordered by decay rate rather than by legal formality.

### 5.2 [BOOK] §72.051 — a hard defense-side clock the plaintiff must anticipate
On an employer defendant's motion, trial is **bifurcated** in commercial-motor-vehicle cases: compensatory liability and damages in phase one, exemplary in phase two. If the employer **stipulates** that the driver was its employee acting in the scope of employment, the claimant may not present ordinary-negligence claims against the employer (negligent entrustment etc.) in phase one.

**The motion is due the later of 120 days after the defendant's original answer, or 30 days after a pleading adds a new claim or cause of action** (§72.052(b)). [VERIFY]

Exceptions preserve first-phase admissibility of regulatory violations where the failure was a proximate cause and the regulation is specific and governs the defendant/employee/equipment (§72.053(b)), plus an enumerated list (out-of-service orders, licence restrictions, road-test certification, medical certification, HOS/drug-and-alcohol prohibitions). The Patterson rule does not eliminate direct claims where **gross negligence** is alleged. *In re Southwest Motor Transport* (1st Dist. Dec. 2024) held the trial court abused its discretion by admitting the **driver's** gross negligence in phase one.

**[ENGINE]** On the commercial-vehicle flag, the answer date arms an **anticipation clock** — not our deadline, but the window in which the case's whole trial shape may change. Since the pass-2/TRCP finding is that one anchor (the first answer) derives most of the case, this is a second consumer of that same anchor.

**[WATCH] *Werner Enterprises v. Blake*** (SCOTX, No. 23-04093, filed Aug. 30, 2024, from 672 S.W.3d 554) — whether direct-negligence theories survive an accepted vicarious-liability stipulation. Pending as of the book's window. The chapter also notes **there is no reported case law construing §72.051 et seq.** itself.

### 5.3 [BOOK] Broker liability — a live circuit split
FAAAA §14501(c)(1) preempts state laws "related to a price, route, or service of any motor carrier … broker, or freight forwarder." The **safety exception**, §14501(c)(2)(A), preserves state safety regulatory authority "with respect to motor vehicles"; *Miller v. C.H. Robinson* (9th Cir. 2020) held that power includes regulating safety through common-law tort claims. **SCOTUS denied certiorari in *Gauthier v. Total Quality Logistics* on January 13, 2025**, leaving the split unresolved — so viability of a claim against a broker turns on **where the case is filed**. The chapter also flags the "hidden motor carrier" theory where a broker's conduct transforms it into a carrier (49 C.F.R. §371.2(a) excludes motor carriers from the broker definition).

**[ENGINE]** This is a **forum-dependent viability question**, which is the same shape as pass 2's *Duncan*/*Simien* per-district admissibility finding (H63). Two instances now argue for the same mechanism: the court-profile layer carrying legal-standard attributes, not just local rules.

---

## 6. THE DAMAGES-PROOF SPINE

### 6.1 [BOOK] Future medical expenses — a low evidentiary bar, contested at the edges
The settled line: the award is primarily for the jury; **no precise evidence is required**; it may rest on the nature of the injuries, the medical care rendered in the past, and the plaintiff's condition at trial; **testimony to a reasonable medical probability is not a prerequisite**; expert testimony is preferable but not necessary. Some courts nonetheless require two elements — reasonable probability that future expenses will be incurred, and the reasonably probable amount. Post-*Haygood* and HB 4, defendants argue "paid or incurred" should govern future expenses too; the chapter's position is that this is literally unworkable but must be litigated with both trial and appellate courts in mind. [VERIFY]

**[ENGINE]** The billing module's outputs are aimed at *past* expenses (paid-or-incurred, benchmarks, chargemaster analysis). This says the **future**-damages case is built from different materials — life care plans (admissible as TRE 1006 summaries; safest practice is a physician validating the plan to a reasonable medical probability), and the plan may include home refurbishment and transportation costs. Worth ruling whether the module has any role here at all, or whether future damages is a distinct deliverable. → **H76**

Also: **CPRC §18.091 requires loss-of-earnings and earning-capacity evidence to be presented net of income tax.** A computational requirement with an obvious systems consequence.

Med-mal only: CPRC §74.503 periodic-payment regime where present value of future damages ≥ $100,000 (§74.502).

### 6.2 [BOOK] *Gregory v. Chohan* — and the precedential-status trap
**The plurality has no precedential value.** Three justices recused; of the remaining six, only three joined the plurality. Under *UT Medical Branch v. York*, 871 S.W.2d 175 (Tex. 1994), without majority agreement on the reasons, the opinion "is not authority for determination of other cases." *Kelly Custom Homes v. Hopper* (14th Dist. 2024) acknowledged this — **and, per the chapter, every other case citing *Gregory* treats it as if binding without noting it is a non-binding plurality.** Chief Justice Hecht's retirement further unsettles the count.

**[ENGINE — this is a registry-design finding, not just a damages finding.]** The registry's schema assumes a proposition is verified or not. *Gregory* is a third thing: **authority whose formal precedential status and practical operative force diverge**. If the registry records it as "good law," it overstates; as "not authority," it understates what courts are actually doing. Candidate: a **`precedential_status` field** (binding / plurality / persuasive / memorandum / superseded) distinct from the verification flag, plus a free-text practical-force note. → **H77**

**What *Gregory* rejects [BOOK]:** the "shocks the conscience" standard; **unsubstantiated anchors** (the fighter-jet and Rothko-painting analogies); per-unit arguments untethered to mental anguish (the "two cents per mile" argument, which the plurality characterises as punitive rather than compensatory); and any **required** ratio between economic and noneconomic damages — though economic damages may bear on noneconomic where, e.g., a lengthy hospital stay preceded death. **What it demands:** evidence rationally connecting the amount to the injury — and notably, even detailed *Parkway* "nature, duration, and severity" testimony was held insufficient to justify the **amount** under *Saenz*. Verdict comparison is left open in a footnote, apparently as an appellate rather than jury-argument tool.

### 6.3 [BOOK] Nuclear verdicts — the defense-side mirror
Definitions ($10M+; noneconomic wildly disproportionate to economic; or substantially above expectation for the case type). Contributing factors as the panel frames them: reptile theory, anchoring, publicity/social inflation, distrust of corporations, third-party litigation funding. **Texas ranks 12th per capita** despite being a top-four state by raw count. **Neither the Texas legislature nor the Texas courts require disclosure of third-party litigation funding agreements**, unlike a number of other states — a live legislative-watch item.

*Team Industrial Services v. Most* (1st Dist., May 16, 2024) reversed and remanded a wrongful-death nuclear verdict where counsel invoked an unrelated $350M painting, argued exemplary damages that had been abandoned at the charge conference, and emphasised the defendant's size and public listing to "send a message." [VERIFY]

**[ENGINE]** Combined with §6.2, the practical rule for any drafting assistance the system ever offers on damages argument: **anchors must be case-derived**. This is a content constraint on a future form/argument engine, and it is the kind of thing that should be written down before that engine exists rather than after.

### 6.4 [BOOK] Exemplary damages — net-worth discovery is a gated, two-step procedure
CPRC §41.0115: net-worth discovery requires a **motion, notice, hearing, and a written order finding a substantial likelihood of success on the merits** of the exemplary-damages claim. Legislative history (Reps. Clardy and King) establishes "substantial likelihood" is **less than** clear-and-convincing and less than preponderance — a prima facie case. But: on filing the motion, the court **shall presume adequate time for discovery has elapsed**, which means a **no-evidence summary judgment motion becomes immediately available to the defendant**. The order must authorise only the **least burdensome method** (§41.0115(b)); absent the written finding the court has no discretion to order it (*In re WTG Fuels*); and the order is mandamus-reviewable (*In re Juniper Ventures*). The claimant must also show substantial likelihood that the harm results from fraud, malice, or gross negligence (*In re Kimco*). [VERIFY]

**[ENGINE] This is a trap with a heartbeat shape:** filing the net-worth motion arms an immediate readiness obligation to defend a no-evidence MSJ. That is exactly a "one action arms a different thread" pattern (§8.4 of the design doc). Pass 1 §4.7 already placed the exemplary checklist at mediation-booked; this adds the procedural fork. → **H78**

### 6.5 [BOOK] From Ch. 1 — one squarely on-point billing case
*In re Allstate Indem. Co.*, 622 S.W.3d 870 (Tex. 2021): a §18.001 controverting affidavit **may be based on a nurse's review of charges**, and a controverting affidavit is **not the exclusive method** of challenging reasonableness and necessity. **[ENGINE]** This bears directly on registry Entry 2 and belongs in the same bundle as *Ortiz v. Nelapatla* (pass 2 §1.3). Note the citation distinction from *In re Allstate*, No. 20-0071 (Tex. 2021), which Kostura cites for the proposition that a non-compliant counteraffidavit does not preclude trial challenges — **[VERIFY] whether these are the same opinion or two different Allstate mandamus proceedings from the same year.** Entry 2 cannot be signed off until that is resolved.

---

## 7. AI — what the book says about the thing Michael is building

Ch. 14 read in full. Most of it is orientation, but four items have direct project consequences. All [BOOK].

1. **Rule 3.03 (candor) and its Comment 2 make every filing the attorney's responsibility regardless of how it was drafted.** The chapter is explicit that reliance on AI is no defence. **[ENGINE] This is the registry's flag-don't-verify principle stated from the ethics side**, and it is the strongest external support the project has for that design choice. Worth citing in `Go_Live_Gates` when gates 1–5 are exported.
2. **Hallucination is described as improved but not eliminated**, with citation fabrication the specific failure mode and sanctions the specific consequence. **[ENGINE] Direct support for the rule that no registry proposition drives engine behavior until Michael reads the primary authority.**
3. **Data security:** the chapter distinguishes business/enterprise tiers (no training on inputs, isolated sessions) from free tiers (training permitted — "unacceptable risk for confidential client information"). **[ENGINE] This maps onto the project's standing security posture** (no real client data in the repo, PHI processing local by design) and should be reconciled with it explicitly rather than assumed compatible. → **H79**
4. **Motion drafting is singled out as high-risk** even where routine; the chapter's framing is AI-as-drafting-aid, never as research substitute, treated like "a junior associate whose work requires supervision."

**[ENGINE] One thing the chapter does NOT address, and the project must:** it discusses AI as a *tool the lawyer operates*, not as a *system that computes deadlines and dates unattended*. The whole heartbeat design is the second thing. The professional-responsibility analysis for a system that silently derives a limitations date has no counterpart here — which is a gap worth naming in the go-live gates rather than assuming the CLE framing covers it. → **H80**

---

## 8. TILLEY / TRIPARTITE — revising my own recommendation

**I previously advised that Ch. 22 was not worth a reading pass** because Michael wrote it and knows the content. Having read it: that was **half right and half wrong**, and the wrong half matters.

Right: nothing in the doctrinal survey (Tilley → *Garcia* → *Bradt* → *Traver* → *American Home* → *Gilbert* → *In re XL Specialty*) is news to the author, and a walkthrough conversation would beat my inference.

**Wrong: the chapter contains a concrete constraint on features this project is actually building.** [BOOK]:

- **Texas Ethics Opinion 532 (May 2000)** holds that a defense lawyer may not, absent the client's informed consent, comply with an insurer's requirement to submit **detailed billing statements to an outside audit company** — because the insured is the only client and detailed billing disclosure can compromise confidences. **[ENGINE] The project is building automated reporting and billing analysis.** Any feature that ships case-level detail to a third party — an auditor, an analytics vendor, a shared benchmark pool, or a multi-user deployment where another firm's staff can see it — sits in exactly the territory Op. 532 governs. The **fee-schedule library and policy-language bank already carry confidentiality walls** for protective-order material; Op. 532 says the *client-confidence* wall is a separate and independent one. → **H81**
- **Texas Ethics Opinion 533 (June 2000)** — insurer litigation guidelines cannot override the lawyer's independent professional judgment; the lawyer must resist a restrictive guideline or seek informed consent. **[ENGINE] The generalised form:** a system that enforces a workflow can become the instrument by which an external party's guidelines constrain professional judgment. If the case manager is ever configured by anyone other than the lawyer, that configuration is the guideline. Design principle candidate: **the lawyer must always be able to override any gate the system imposes, and the override must be cheap.** This is a real constraint on the "gates block; the heartbeat nags" architecture (§7.4).
- ***In re XL Specialty Ins. Co.*** (Tex. 2012) — **"there is no general privilege between insurance companies and their insureds."** Communications between an insurer's attorney and the insured were not privileged where the attorney represented only the insurer. **[ENGINE]** Any feature that assumes a communication is privileged because of who the parties are is unsafe; privilege is a per-communication determination.
- **The confidentiality-vs-duty-to-inform scenario** (the chapter's two-beers hypothetical) is a case where **information must be recorded but must NOT flow along the default path**. **[ENGINE] The system needs a concept of client-confidential-restricted case information** — recorded, retrievable, but excluded from any automated report, summary, or export. A case-management system with no such concept forces the lawyer to keep it out of the system entirely, which is worse. → **H82**

**Revised recommendation:** the walkthrough conversation is still the right way to capture Michael's own view, but it is now a **conversation with a specific agenda** — Op. 532's audit-disclosure boundary, Op. 533's guideline-override principle, and the restricted-information concept — rather than an open-ended read.

---

## 9. REGISTRY CANDIDATES ACCUMULATED THIS PASS

All need Michael's read of the primary source; provenance markers per H58. **None are registry entries yet.**

**Estate / probate / capacity:**
- CPRC §71.004(c) — three-month beneficiary window, duty shifts to executor/administrator
- CPRC §71.011 — wrongful-death recovery not subject to decedent's debts (*Harris Cty. v. White*)
- Est. Code §101.051 — estate vests subject to debts and delinquent child support
- Est. Code §301.002(a),(b)(1) — four-year letters limitation + the PI-claim exception; §301.052; §301.153 (necessity); §§202.001, 202.009 (heirship, attorney ad litem); §256.052 (will probate)
- *Austin Nursing Center v. Lovato*, 171 S.W.3d 845 (Tex. 2005); *Belt v. Oppenheimer*, 192 S.W.3d 780 (Tex. 2006); *Shepherd v. Ledford*, 962 S.W.2d 28 (Tex. 1998); *Mayhew v. Dealey*; *Henson v. Estate of Crow*
- TRCP 151 / 152 / 154 — suggestion of death, scire facias, the dismissal/substitution asymmetry (*In re Coats*; *Estate of Pollack v. Murrey*; *Hegwer v. Edwards*)

**UM/UIM:**
- Ins. Code UM/UIM provisions — written-rejection requirement; minimum limits; burden on insurer as to uninsured status; venue
- *Brainard*; *Allstate Ins. Co. v. Irwin* (Tex. 2021); **four-year limitations**; PIP ($2,500 statutory minimum aggregate, written rejection) and MedPay offset rules; *Gonzales* (5th Cir. 2016) consent-to-settle burden; *State Farm v. Cook* (San Antonio 2019); *Burgess v. Allstate* (Austin 2021)

**Stowers / insurance:**
- *APIE v. Garcia*, 876 S.W.2d 842 (Tex. 1994) — the four elements; *Farmers v. Soriano*, 881 S.W.2d 312 (Tex. 1994); *Travelers v. Citgo*, 166 F.3d 761 (5th Cir. 1999); *Pride Transp.*, 511 F. App'x 347 (5th Cir. 2013); *OneBeacon v. T. Wade Welch*, 841 F.3d 669 (5th Cir. 2016); *In re Farmers Tex. Cty. Mut.*, 621 S.W.3d 621 (Tex. 2021); *USAA v. Menchaca* (2018 on rehearing); *In re Dana Corp.*, 138 S.W.3d 298 (Tex. 2004); *Employers Casualty v. Scott Electric*; *Employers Cas. Co. v. Tilley*, 496 S.W.2d 552 (Tex. 1973)

**Trucking / vehicle:**
- CPRC §§72.051–72.054 — **120-day/30-day bifurcation motion clock**; the regulation-violation exceptions list; *In re Southwest Motor Transport* (1st Dist. 2024); **[WATCH] *Werner v. Blake*** (SCOTX pending)
- 49 U.S.C. §31137; 49 C.F.R. §§395.30(a),(b),(f), 371.2(a); 49 U.S.C. §14501(c)(1),(c)(2)(A); *Miller v. C.H. Robinson* (9th Cir. 2020); **[WATCH] cert denied in *Gauthier*, Jan. 13, 2025**
- *In re Kuraray Am.*, 656 S.W.3d 137 (Tex. 2022); *In re Weekley Homes*, 295 S.W.3d 309 (Tex. 2009); *In re Shipman*, 540 S.W.3d 562 (Tex. 2018); *In re State Farm Lloyds*, 520 S.W.3d 595 (Tex. 2017); *Brookshire Bros.*, 438 S.W.3d 9 (Tex. 2014); *MRT v. Vounckx*, 299 S.W.3d 500 (Dallas 2009); TRCP 196.4, 196.7

**Damages:**
- *Gregory v. Chohan*, 670 S.W.3d 546 (Tex. 2023) — **with precedential-status caveat**; *UT Med. Branch v. York*, 871 S.W.2d 175 (Tex. 1994); *Kelly Custom Homes v. Hopper* (14th Dist. 2024); *Parkway v. Woodruff*; *Saenz*; *Bentley v. Bunton*; *Team Industrial Servs. v. Most* (1st Dist. 2024)
- CPRC §18.091 (net-of-tax earnings evidence); §§74.502–74.503 (periodic payments); TRE 1006 (life care plan as summary)
- CPRC §§41.0115, 41.003(a), 41.001(7-a) net worth definition; *In re Bella Corp.*; *In re WTG Fuels*; *In re Juniper Ventures*; *In re Kimco Devs.*; *Lunsford v. Morris*; *Owens-Corning v. Malone*; *Service Corp. Int'l v. Guerra*
- *In re Allstate Indem. Co.*, 622 S.W.3d 870 (Tex. 2021) — nurse-based §18.001 counteraffidavit; non-exclusivity **[VERIFY against the other 2021 Allstate opinion]**

**Products:**
- **Statutes of repose** — multi-state, choice-of-law dependent; trigger is first sale, not injury
- Preservation/TRO practice (Bright); NHTSA / SRS research sources

**Tax:**
- I.R.C. §104(a)(2); §62(a)(20); §409A; §83; *Childs v. Commissioner*; IRS GLAM (Dec. 2022); CPRC §41.001 (gross negligence as exemplary); Labor Code §408.001
- ABA Model Rule 1.15 / Texas equivalents; Texas Rules 1.5, 1.8 (QSF interest consent)

**Ethics / tripartite:**
- Tex. Ethics Op. **532** (May 2000) — outside billing audits require informed consent
- Tex. Ethics Op. **533** (June 2000) — insurer guidelines cannot override independent judgment
- *In re XL Specialty Ins. Co.* (Tex. 2012) — no general insurer-insured privilege
- Tex. Disciplinary R. 3.03 & cmt. 2 — candor; applies to AI-assisted work

---

## 10. NEW OPEN QUESTIONS (H68–H83)

- **H68.** Source-inventory discipline: require future mining passes to derive the article inventory mechanically, state the count, and reconcile against the book's own TOC?
- **H69.** Client-death thread family — arm the three-month clock, probate referral, capacity check, and signature-dependent thread suspension? And model the probate→records dependency?
- **H70.** Limitations display: replace any single per-case limitations date with a **per-defendant / per-coverage** set (tortfeasor 2yr · UM/UIM 4yr · repose · TTCA notice)?
- **H71.** Statutes of repose: intake-stage product-age and governing-law capture, flagged not computed?
- **H72.** Settlement-allocation tax review as a **blocking pre-release checkpoint**, arming at settlement-agreed rather than funding?
- **H73.** Confirm attorney fee deferrals are **out of scope** (firm financial structuring, not case management).
- **H74.** Adopt the assembled Stowers validity checklist (limits · covered · complete release · reasonable terms · statutory interests resolved) as the `stowers_demand` gate?
- **H75.** Unify preservation into one sub-thread with variants ordered by **decay rate** (telematics overwrite → wreckage salvage → scene → records)?
- **H76.** Does the medical/billing module have any role in **future** damages, or is that a separate deliverable built from life care plans?
- **H77.** Registry schema: add a **`precedential_status`** field distinct from verification status (binding / plurality / persuasive / memorandum / superseded) + practical-force note — driven by *Gregory*?
- **H78.** Net-worth motion arms a no-evidence-MSJ readiness thread?
- **H79.** Reconcile the book's AI data-security framing against the project's standing security posture explicitly, in the go-live gates?
- **H80.** Go-live gates: add a gate addressing the professional-responsibility posture of **unattended date derivation** — a question the CLE framing does not reach?
- **H81.** Op. 532 boundary: define which case-level detail may ever leave the system to a third party, and require informed consent where it does. Affects the fee-schedule library, benchmark pooling, and any multi-user deployment.
- **H82.** Add **client-confidential-restricted** as a first-class information class — recorded and retrievable, excluded from all automated reports/summaries/exports.
- **H83.** Op. 533 principle: adopt "the lawyer can always override any system-imposed gate, cheaply" as a stated design principle alongside P1–P6?

---

## 11. PASS 4 PLAN (final pass) — revised

**Priority 1 — close the map gap.** These are the only large unread bodies left.
1. **Ch. 11.1 remainder + Ch. 11.2 Products Liability Update (Bright)** — ~125 pp unread. Read against the vehicle/telematics data model, the preservation cluster, and the parked deficiency submodule (Bright is the same author; when that submodule is built, **both** his papers should be re-ingested).
2. **Ch. 23.2 Estate, Probate & Guardianship** (~55 pp unread) — guardianship of person/estate, minor-settlement interaction with the existing sub-workflow, §142/Est. Code §541.004 trusts (cross-ref Kostura's Medicaid eligibility material).
3. **Ch. 12 Jury Charge Update** (~8 pp) — charge stage; interacts with *Gregory* charge revision and §72.051 bifurcation.

**Priority 2 — remaining playbook-level chapters**, mapped against `pi-case-playbooks.md`: Ch. 2 Premises/Ch. 95 · Ch. 6 Jury Selection · Ch. 9 Nonsubscriber (incl. 9.1) · Ch. 24 SCOTX remaining sections (governmental immunity, negligence, products, TCPA).

**Priority 3 — Kostura sections still unread** (pass 2 §9.7 carried forward): FEHBA (§II.E), FECA, the ERISA case-law body (§§VII–XIII), choice of law (§XIX), indemnification and release drafting (§XX).

**Priority 4 — the deliverable that ends the mining:** the **consolidated registry-candidate table** across all four passes, with provenance markers (rule-derived / practice-derived / case-derived), precedential-status flags per H77, and pending-case watch flags — ready to drop into Michael's sign-off queue.

**Dropped from the plan:** the Specialization Exam bonus materials (§0 erratum).

**Also read the book's own table of contents (PDF pp. 3–6) at the start of pass 4** — never read in any pass, and it would have caught the map gap immediately.

---

## 12. TIME-ANCHORED WATCH ITEMS (cumulative, passes 2–3)

1. **CMS Section 111 CMP audit era live since 2026-04-01** (pass 2 §1.8) — current-practice exposure.
2. ***Ortiz v. Nelapatla*** — pet. granted 4/4/2025; may be decided. **Gates Entry 2 sign-off.**
3. ***Werner Enterprises v. Blake*** — SCOTX, filed 8/30/2024; reshapes §72.051 practice.
4. ***In re Greystar***, ***In re Brenham Nursing***, ***In re Pinnergy*** — pending as of the book's June 2025 window.
5. **Broker-liability circuit split** — cert denied in *Gauthier* 1/13/2025; forum-dependent viability persists.
6. **Third-party litigation funding disclosure** — not required in Texas as of the book; other states moving. Legislative-watch item.
7. **Kostura's 30-day CPN rule vs. the 2024 CMP rules** — possible supersession, unresolved.
8. ***Sheppard*** subsequent history — carried from Entry 1, still open.

---

**Nothing in this document enters the build queue.** D3/H8 still gates T1. Every proposition above is unverified.
