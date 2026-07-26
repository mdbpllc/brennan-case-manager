# Advanced Personal Injury Law 2025 (41st Annual) — Course Book Mining, PASS 2

**Status:** SOURCE MINING, **PASS 2 of 4** — design side, 2026-07-25 (second session same date as pass 1). NOT canonical, NOT a design doc, NOT in the build queue.
**Canonical repo path:** `docs/specs/apil-2025-course-book-mining-pass2.md` — route Code-side with the accompanying handoff.
**Predecessor:** `docs/specs/apil-2025-course-book-mining-pass1.md` (structural pass + five deep reads). This pass executes pass 1's §9 plan in full.
**Copyright note:** TexasBarCLE materials are copyrighted and single-user licensed. Everything below is paraphrase and issue-spotting for internal design use. No article text is reproduced. Do not paste article text into repo docs.
**Duplication guard:** `pi-case-playbooks.md` Part II already carries a playbook-oriented read of Kostura Ch. 21 (lien taxonomy, reduction levers, document demands). This pass reads the same chapter for the **heartbeat** — clocks, threads, arming events, and the never-walked disbursement stage — and cites the playbook doc rather than restating it.

**Registry discipline:** every legal proposition below is an **UNVERIFIED registry candidate**. A CLE paper is a secondary source and a model summarizing it is not verification. Nothing here gets hard-coded, and nothing computes a legal outcome, until Michael reads the primary authority and signs off entry by entry.

**Markers:** [BOOK] = stated in the course book. [ENGINE] = Claude's design implication, unruled. [CONFLICT] = tension with an existing project ruling. [CLOSES] = candidate resolution of an open item. [VERIFY] = pull the primary source before use.

**Open-item numbering:** the register ran H1–H58 entering this session. New items here are **H59–H67** (§8).

---

## 0. What pass 2 covered

Per pass 1 §9, in order:

1. **Ch. 21 — Subrogation & Liens (Kostura), 310 pp.** Full structure map; deep reads of the Medicare MSP recovery machinery (§§II.C.2–10), Medicaid (§III.A), workers' comp practice/SOL/disclosure (§IV.6–8), hospital-lien timing and remedies (§V.A.4, 7, 12–14), LOPs and assignments (§XVI), the Advice-to-Attorneys workflow chapter (§XVIII in full), and the appendix BCRC recovery-process flow (internal 265–270).
2. **Ch. 10 remainder** — Ways 8, 9, 12, 13, 15, 16, 17 (findings of fact, counsel-argument-as-evidence, finality, SJ orders, JNOV, substance-abuse records, third-party business records / *Duncan–Simien*).
3. **Ch. 25 — Pre-Suit Investigation** (Slack), read in full against the `presuit_investigation_checklist` entity.
4. **Ch. 13 remainder** — Rule 204 adverse exams (with Entry 10 open), mental-health record scope, LOP proportionality, surveillance films, corp-rep objection mechanics, 193.6.
5. **Ch. 24 — SCOTX Update** (March 2024–June 2025), scanned for registry-status movement; decided + granted sections read.

---

## 1. Findings that CHANGE or CLOSE work already ruled or open

### 1.1 [CLOSES → H21] The service-diligence cite exists, and it is a 2024 SCOTX opinion

[BOOK — Ch. 24] ***Texas State University v. Tanner*, 689 S.W.3d 292 (Tex. May 3, 2024).** Holdings as the update paper describes them: "bringing suit" within limitations includes **both filing the petition and achieving service**; if service is diligently effected after limitations expires, the service date **relates back** to filing; and against a governmental entity, diligence in service is a **statutory prerequisite to suit under Gov't Code §311.034 and therefore jurisdictional** — resolvable on a plea to the jurisdiction. Tanner served the university three and a half years after limitations ran and could not establish diligence. [VERIFY]

**[ENGINE]** H21 has carried "service-diligence registry entry — needs a case-law cite, not a rule cite" since capture b. *Tanner* is that cite, and it upgrades the thread's stakes: on a TTCA/governmental defendant (`PI_FLAGS` already carries this), a service-diligence lapse is not a limitations defense to beat — it is **jurisdictional death**. Candidate: the service thread's escalation profile sharpens when the government-defendant flag is set. Michael must read *Tanner* before the entry is drafted; the classic relation-back line (*Gant*, *Proulx* family) should be pulled alongside. → **H59**

### 1.2 [BOOK] Registry Entry 4's fatal-defect question gains three timing cases — and they all push the same design behavior

From Kostura §V.A.4 (all [VERIFY]):
- **Invalid notice:** a hospital lien carrying a wrong date of injury, wrong amount, and wrong liable party is *not valid notice* (*Methodist Hosps. of Dallas v. Mid-Century*, 259 S.W.3d 358 (Tex. App.—Dallas 2008)). This is directly on the Entry 4 fatal-defect-vs-substantial-compliance conflict.
- **Filing, not indexing, secures the lien** (*Memorial Hermann v. Progressive*, 1st Dist. 2011): a lien received by the clerk but unindexed attaches even though a diligent record search cannot find it. The clerk has **no indexing deadline**.
- **A lien filed after settlement but before the money moves attaches** (*Richards v. American National*, Beaumont 2006) — even where the defense itself prompted the filing. And under *Trinity Universal v. Bleeker*, 966 S.W.2d 489 (Tex. 1998), a release is not valid against the hospital unless charges were paid, paid to the extent of consideration, or the hospital joined the release.

**[ENGINE]** Together these mean a lien search at settlement is **not sufficient**: the exposure window runs to the moment of disbursement, and the record search itself can miss a received-but-unindexed lien. Kostura's practice answer is a **clerk-verification exchange protocol** — settlement conditioned on no lien on file; a clerk's verification letter obtained and checks exchanged at the clerk's office in the same visit. That is a *form-engine artifact plus a choreographed task sequence*, and it belongs to the pre-disbursement lien-clearance gate (PI spec §9). → **H62**

### 1.3 [BOOK] Registry Entry 2 (§18.001) is about to move: *Ortiz v. Nelapatla* is GRANTED

[Ch. 24] ***Ortiz v. Nelapatla*** (pet. granted Apr. 4, 2025, No. 23-0953, from 711 S.W.3d 1 (Tex. App.—Dallas 2023)): whether **partially controverted** §18.001 affidavits remain admissible as to the uncontested portions, and whether the counteraffidavits are themselves usable as party-opponent statements. [VERIFY current status — the grant is over a year old at today's date and the opinion may have issued.]

**[ENGINE]** This is exactly what the CourtListener citator layer exists for. Entry 2 (and the seeded §18.001 material) should carry a `review_flag` keyed to this docket number **now**, before sign-off, so the entry is never verified against a superseded posture. Also flags for the watch list from the same chapter: ***In re Greystar*** (No. 24-0293, granted — whether the $25M supersedeas cap applies per judgment debtor or per judgment; post-judgment module), ***In re Brenham Nursing*** (No. 24-0494, argument granted — Pandemic Liability Protection Act "specific facts" deadline), ***In re Pinnergy*** (No. 23-0777 — forum non conveniens). All are pending-decision watch items whose current status must be checked, since the book's window closed June 2025.

### 1.4 [BOOK] Registry Entry 5 (Ch. 146) has a federal twin, and the interplay is mapped

Kostura §II.C.10 + §V.A.10: providers generally must bill liability insurance during the **120-day "promptly" period** (42 C.F.R. §411.50 — running from the earlier of claim/lien filing or date of service/discharge), after which they may either bill Medicare and withdraw liens (keeping liens only for non-covered services and deductibles/coinsurance) or maintain the lien — but **not both**; and under ACA §6404 / 42 C.F.R. §424.44, Medicare claims must be filed within **one calendar year** of service, with untimely-filing preclusion of charging the beneficiary beyond deductible/co-insurance (provider manual §70.4). *Speegle* (Fort Worth 2009) read Medicare's manual to preempt §146.002(c)'s bill-the-insurer mandate, but Kostura flags it as superseded in part by the later federal enactments; current CMS guidance is the November 2023 MLN fact sheet. *Haygood*'s 42 U.S.C. §1395cc reading caps what the provider can charge the patient. [VERIFY all]

**[ENGINE]** The billing module's timely-billing analysis (Entry 5 / the Sheppard–§146.003–H.B. 4145 triangle) should model the **federal clock pair (120-day promptly / 1-year filing)** beside the state Ch. 146 clock — three different limits with three different consequences, and the practice hook is concrete: **calendar the 120th day from service** and, if the hospital has lien'd instead of billed, contact it on that day to push the Medicare election (Kostura's own tactic). That is a computable, per-bill thread.

### 1.5 [BOOK] Entry 10 (Rule 204) — confirmations plus the missing trigger event

Ch. 13's exam section confirms Entry 10's architecture (H.E.B. → Auburn Creek → Sherwin-Williams; "less intrusive means" diminished nearly to nothing) and adds the defensive-side case law the entry lacked: *In re Redbird Trails* (Dallas 2020 — bias, scope, time-limit, recording, and observer attacks all fail without an evidentiary showing specific to the examiner and exam), *In re Society of Our Lady* (Corpus Christi 2019) and *In re UV Logistics* (14th Dist. 2023) — **no recording or third-party observers absent special circumstances**. [VERIFY]

**[ENGINE] The trigger event that matters:** the chapter states that **designating a treating psychologist (or any treating physician) as a testifying expert places the condition in controversy** — for records scope (*Midkiff* rationale, via *Richardson Motorsports*) *and* for Rule 204 good cause. So the IME-anticipation task in Entry 10(d) should arm not only when a damages expert report is *served* but when **Michael's own designation act** occurs — a warning gate keyed to our own filing, which is the same pattern as pass 1's *Williams Brothers* finding (exposure created by pleadings) but on the plaintiff side. → **H64**

### 1.6 [BOOK] Corp-rep topic objections: the mechanism is a PRE-DEPOSITION PROTECTIVE ORDER

Sharpening pass 1 §1.2 / H39's other half: because TRCP 199.2 sets no objection deadline for corp-rep topics, the case law (e.g., *Kartagener v. Carnival* line, as cited in Ch. 13) treats a **motion for protection filed before the deposition** as the way the producing side preserves topic objections. For our side of the table, the mirror reading: if the defense serves objections late (the *Home Depot* two-days-before pattern), the fight happens on their protective-order motion, and Gold's 10-day / 15–20-day practice intervals govern only as norms. The registry provenance question (pass-1 Q7/H58) stands unchanged; this only fixes *which instrument* the thread's action drafts.

### 1.7 [BOOK] The *Duncan*/*Simien* split, in full — and it is a COURT-PROFILE attribute

Way 17: integrated third-party documents as business records. *Duncan Dev. v. Haney*, 634 S.W.2d 811 (Tex. 1982) requires personal knowledge of the third party's procedures or independent verification of accuracy. *Simien v. Unifund*, 321 S.W.3d 235 (Tex. App.—Houston [1st Dist.] 2010) adopted the three-part federal reliance test (incorporated and kept; typically relied upon; trustworthy circumstances), and most courts followed (Corpus Christi, Austin, 14th Dist.). **El Paso still follows *Duncan*** (*Riddle*, *Martinez*); **Dallas adhered to *Duncan*** via a two-path formulation (verify accuracy or qualified witness on the originator's recordkeeping — *Nat'l Health Resources*). No intervening SCOTX authority. [VERIFY per-court currency]

**[ENGINE]** This is the A1 billing-records affidavit chain's admissibility standard varying **by court of appeals district**. The court-profile layer (feature-intake item F) already exists for local rules; this adds a *legal-standard attribute* to the profile — a different kind of payload than a standing order, and worth ruling on whether the registry or the court profile owns it. → **H63**

### 1.8 [BOOK→LIVE] CMS enforcement dates have CROSSED from "upcoming" to "in force" since the book was written

Kostura §II.C.4.7–4.8: the Section 111 CMP regime — timely-reporting clock (within one year of settlement) began **October 11, 2024**; CMS random audit selection (250 records/quarter) began **April 1, 2026**. Daily penalties for non-group health plans at $250/$500/$1,000 by year of non-compliance, inflation-adjusted (2024: ~$357/$714/$1,428), capped per non-compliant record (~$521,220 as adjusted); five-year SOL under 28 U.S.C. §2462 running from actual report or CMS's reasonable discovery; RREs must document **three attempts** (writing, mail, phone) to obtain SSNs; a 30-day compliance-and-mitigation window precedes formal CMP notice. [VERIFY]

**[ENGINE — law-change ledger]** As of *today* (2026-07-25), the audit era is nearly four months old and every settlement since October 2024 sits in the auditable pool. The book (July 2025 snapshot) describes this as new; the engine should treat it as **current-practice risk**, same ledger family as the 166a and 239a flags. The beneficiary-side duty pairs with it: notice to BCRC **before negotiating settlement**, else the CPN path fires — 30 days to respond or a demand for the **full** amount with **no procurement-cost reduction** (Kostura flags the 30-day rule as possibly superseded by the 2024 rules — [VERIFY which text governs]).

### 1.9 [BOOK] *Verhalen* — a calendaring-software error held to be GOOD CAUSE, and what that means for the engine

[Ch. 24, discovery section] The Verhalens filed SJ responses one day late; counsel's verified motion explained the deadline was **entered wrongly in the firm's calendaring software** and that she acted immediately on discovering it. SCOTX held denial of leave an abuse of discretion — the **uncontroverted factual account of the calendaring error plus prompt corrective action established good cause**. [VERIFY — pull the opinion; the update paper is the source here and the full case name/cite must be confirmed.]

**[ENGINE]** Two implications. (a) The system's own deadline audit trail — who entered what date, from which rule, when it changed — is potentially **the evidence** that saves a missed deadline; H-register item 9.3's annoyance instrumentation should be joined by a *deadline provenance log* that can be reduced to an affidavit. (b) The flip side: an engine that silently computes a wrong date manufactures the *Verhalen* affidavit nobody can truthfully sign. This is the strongest outside validation yet of the registry's derive-don't-store rule and the flag-don't-verify principle. → **H67**

---

## 2. THE DISBURSEMENT STAGE — design proposal for the stage nobody has walked

Kostura's chapter *is* the disbursement stage's source material, and its structure yields the design directly. Everything here is [ENGINE — PROPOSED, unruled] resting on [BOOK] propositions marked above and below; nothing is walked until Michael walks it.

### 2.1 The founding structural finding: disbursement threads arm at INTAKE, not at settlement

Kostura §XVIII is organized as **at-file-open / during-the-claim / at-settlement** triads for each counterpart (client, liability carrier, subrogee). The at-file-open duties are not optional early starts — several are clock-backed:

- **Medicare:** determine beneficiary status *or expected eligibility within 30 months* at intake; open the BCRC file; Safe Harbor form if no Medicare, authorization + notice of representation if Medicare. Counsel is on **constructive notice** — no-actual-notice is no defense (§7.6).
- **Medicaid:** attorney notice to HHSC/TMHP within **45 days** of hire or of identifying the recovery target, with statutorily specified contents; intentional failure to give the statutory notice is a Class C misdemeanor (on the applicant per the statute — [VERIFY §32.033's exact allocation of the duty]); constructive notice again presumed.
- **Workers' comp:** the carrier's first-money right (*Ledbetter*) shapes case economics from day one; dual-representation disclosure/consent under Lab. Code §417.003(b) must be filed **before judgment** or the fee is lost (*Gray Law*, 5th Cir. 2009).
- **The intake coverage-inventory questions already in project-instructions §8 (phase 1) are therefore the arming event for the entire disbursement stage.** The stage is last in the lifecycle; its clocks start first. This inverts the assumption that stage packs arm when their stage begins, and it is the strongest argument yet for D3/H8's shared substrate: the same coverage answer arms threads in three different stages. → **H60**

### 2.2 The BCRC clock chain — the one fully hard-clocked federal sequence in the whole lifecycle

From §§II.C.2, 5, 7 and the appendix flow [all VERIFY against current CMS materials]:

1. **Report the case** to BCRC (pending claim = report now, not at settlement).
2. BCRC posts the MSP occurrence → **Rights and Responsibilities letter** (Consent to Release vs. Proof of Representation distinction — two different authorization instruments with different powers).
3. **Within 65 days of the RAR**, BCRC issues the Conditional Payment Letter + Payment Summary Form (interim amount; audit it against unrelated care).
4. **Dispute path:** submit documentation; allow **45 days** for BCRC review; denial is explained in writing.
5. **Final-CP path (SMART Act):** notice "once and only once" within **120 days** of expected settlement → portal updated within **65 days** → re-check within **3 days** of settlement → the figure is the reliable final conditional amount; discrepancies resolved within **11 business days** of documentation.
6. **Settlement:** report date, amount, and beneficiary-borne procurement costs (flag the cover letter NOTICE OF SETTLEMENT); if settled but **not yet funded**, say so explicitly to avoid triggering the payment clock early.
7. **Demand:** payment within **60 days**; interest accrues per 30-day period thereafter; if funds arrived after the demand date, document late receipt and run the 60 days from receipt, with a waiver request for the interest.
8. **Escalation:** Intent-to-Refer at 60 days post-ITR letter / 150 days post-demand → Treasury offset (Social Security benefits can be docked), double damages against primary payers, direct liability of counsel (*U.S. v. Harris*; *Humana v. Paris Blank*), MA plans with the same rights (*W. Heritage* double damages).
9. **Waiver lane** (parallel): BCRC cannot reduce beyond procurement pro-rata; CMS waiver under the hardship standards, SSA-632; >$100K waivers need DOJ.

**[ENGINE]** This is a **thread-template chain with derived dates at every hop** — the TRCP skeleton's "derive, never store" finding applies verbatim to a federal administrative sequence. Design question: does this live as a heartbeat thread family, or as its own sub-module the way the deficiency engine was parked (H35)? The chain has form artifacts (notice letters, final-settlement-detail, waiver requests), which pulls toward module; but its day-to-day behavior is pure heartbeat (quiet clocks, loud escalation). → **H61**

### 2.3 Per-payer thread templates (the catalog, seeded from the chapter)

Each is a candidate template in the T4 stage pack, arming off the intake coverage answers, with its own completion tests [all propositions VERIFY]:

- **Medicare (traditional):** the §2.2 chain, plus: wrongful-death vs. survival allocation (CMS's own manual concedes no claim against pure wrongful-death recoveries; *Bradley v. Sebelius* is narrow); *Hadden* — your pleadings bind your repayment posture (inconsistent 10%-liability arguments fail); judgment/contested-allocation exception; naming-Medicare-on-the-check dispute lane (*Zaleppa*, *Tomlinson*).
- **Medicare Advantage (Part C):** same rights, double damages (*W. Heritage*), private cause of action (Circuit split noted — *Humana v. Reale* vs. *In re Avandia* line); supplemental (Medigap-type) plans are **contract, not statute** — they fall under CPRC Ch. 140/140A analysis instead. The intake question must therefore distinguish traditional / Advantage / supplemental, which are three different threads.
- **Medicaid:** TMHP/portal contact protocol; **audit the computer printout** for unrelated care; 15% procuring-attorney fee + pro-rata expenses ≤10% (1 TAC §354.2332; no fee on waived portions, §354.2333 — Kostura's position: *Ahlborn* reductions stack on top); *Ahlborn* allocation preserved (repeal repealed, retroactive to 9/30/2017); minors' recoveries (*Torres v. Giacona*, 1st Dist. June 10, 2025 — parents cannot take their medical-expense reimbursement from funds allocated to the child; *City of Houston v. Manning*, 14th Dist. 2024 — children lack standing for medical expenses during minority); eligibility preservation (§142/Est. Code §541.004 trusts, Arc of Texas pooled trust); MERP on the estate side.
- **Workers' comp:** first money (*Ledbetter*); waiver-in-the-policy check (*Wedel*, *Exxon Mobil* — waiver endorsement reaches both subrogation and reimbursement; contract-only waivers may not bind the carrier); contested-hearing allocation strategy with the *Frans/Drilex/Norsworthy* line; close-out drafting that preserves future benefits (*Starkey*); **two 2-year SOLs** (third-party suit — carrier's rights derivative and relation-back per *Guillot v. Hix*; carrier vs. worker for unlawful distribution — runs from distribution, tolling must be pled, *Autry*); §417.003(b) disclosure filing.
- **Hospital lien:** the §1.2 timing trio + clerk-verification exchange; *Bleeker* release-validity gates; HB 2929 (§55.0015 ER-visit-as-admission, eff. 6/10/2019) and the 50%-of-recovery / first-100-days-of-**hospitalization** caps (100 days of hospitalization, not from accident date); HB 2064 pro-rata fee/expense deduction when a factfinder awards specific hospital bills (§55.004(b)(3), eff. 6/16/2021); Ch. 146 / Prop. Code prohibition on lien-instead-of-billing when health insurance or Medicare should pay; the hospital's own **120-day Medicare lien/bill election**; DTPA and dec-action remedies for improper liens with the North Cypress discovery playbook (already registry Entry 3's material).
- **ERISA self-funded:** plan-status proof burden; plan-document request with the **statutory daily penalty** for administrator non-production (~$110/day baseline, inflation-adjusted; the chapter collects awards including multi-year delinquencies) [VERIFY 29 U.S.C. §1132(c) + current DOL adjustment]; *Sereboff/Montanile* fork — **held-in-trust funds are reachable; dissipated funds are not, but dissipating is not a strategy** — the practice answer is segregate the disputed portion in trust; *Knudson* limits; made-whole/common-fund disclaimers per plan terms (playbook doc carries the taxonomy).
- **Child support lien:** priority order per Kostura §V.B — medical liens and attorney's fees/expenses **above** the child support lien; the child support lien **above** ERISA interests; and an LOP is *not* a medical lien for priority purposes — *Power v. Kilgore* imposed **personal liability on the attorney** who paid providers under LOPs ahead of a noticed child support lien. The disbursement waterfall must encode this ordering, and the LOP module must warn on it.
- **PIP / MedPay / UM-UIM property:** common-fund and made-whole application to MedPay; PIP preservation; UM/UIM consent-to-settle already gated in the PI spec — the chapter's §XIV adds the Stowers-and-UIM-carrier wrinkle to that gate's notes.

### 2.4 The pre-disbursement lien-clearance gate decomposes

The PI spec §9 gate is currently one gate. The chapter shows it is really **per-interest sub-gates with different proof standards**: a clerk verification (hospital), a final CP figure with a 3-day freshness window (Medicare), a TMHP statement audited against the printout (Medicaid), a plan-document-validated demand (ERISA), a §417.003 filing check (WC), an AG-payoff figure (child support). The gate should render as a checklist of sub-clearances, each with its own evidence artifact, and the serializer should refuse the disbursement action while any sub-gate is open. **[ENGINE — PROPOSED]**

### 2.5 Disbursement mechanics as engine affordances

Two-check and three-check splits (undisputed funds move; disputed portion held in trust or interpleaded), the settlement-breakdown disclaimer paragraphs for the client-refuses posture, the confidentiality carve-out for governmental/insurer disclosure, and the settlement-document language reserving post-settlement subrogation litigation — all are **form-engine payloads attached to disbursement threads**, exactly the "ask carries the action" pattern (§7.3 of the design doc).

### 2.6 The Stowers interlock runs UPSTREAM into the demand stage

[BOOK] A Stowers demand is "probably defective" if it fails to resolve statutory subrogation interests (Medicare, WC); and the Stowers-before-the-lien-files timing play (settle and distribute before a slow hospital records its lien) is legitimate but dies at *Bleeker* once a lien exists. **[ENGINE]** The demand-drafting stage (§8.6–8.7, already walked) needs a check it does not have: *does this demand resolve every statutory interest on the coverage inventory?* — a validity gate on the `stowers_demand` entity the playbooks already carry, fed by the same intake answers. Mediation gains the mirror item: pass 1 §4.3's proposal-window ↔ lien-work link is now concrete — the mediator's-proposal window cannot be set intelligently without the current BCRC/CP posture on screen.

### 2.7 MSA decision tree (future medicals)

LMSA rules withdrawn (again) October 2022; WCMSAs required where comp claimants have lifetime medicals; review thresholds ($25K current beneficiaries / $250K + eligibility-within-30-months) are **review, not compliance, thresholds**. Kostura's documented-exemption paths: insufficient coverage, disputed liability/causation compromise, physician certification of completed care (frees the settlement from future-medical set-aside per the CMS memo). The self-calc / fixed-25% / $750–$1,000 recovery options at the small end. **[ENGINE]** A decision-tree checklist keyed off (beneficiary? expected within 30 months? future medicals in the recovery? comp involved?) — four intake/settlement facts the record already holds or should.

---

## 3. Other new engine hooks (outside the disbursement stage)

**3.1 Findings-of-fact clock chain (Way 8)** [VERIFY]: Request due **20 days** after judgment signed (TRCP 296; premature filing deemed timely per 306c); court's findings due **20 days** after request (297); **Notice of Past Due Findings due within 30 days of the original request** — with the explicit trap that counting 10 days from the court's deadline mis-computes it — and failure waives the complaint (*AD Villarai*); amended/additional findings within **10 days after the court files** (not signs) its originals (298). Post-judgment module candidates alongside the capture-e TRAP 26.1/329b set. Family Code variants exist (already flagged in the skeleton's §8).

**3.2 JNOV vs. MNT preservation asymmetry (Way 15)** [VERIFY]: a motion for new trial preserves factual-sufficiency error without a ruling; a JNOV motion preserves error **only if denied by written order**. A "get the written ruling" thread item on the post-trial checklist.

**3.3 Finality ambiguity (Way 12)** [VERIFY]: *Lehmann/Elizondo/Vaughan* framework; the practice rule "when in doubt, file the appeal" (*Patel v. Nations Renovations*, 661 S.W.3d 151 (Tex. 2023)). Interacts with the capture-e 30/75/90-day clocks: an *ambiguous* judgment date is a hazard the engine can flag but never resolve.

**3.4 SJ order drafting (Way 13)** [VERIFY]: *B.C. v. Steak N Shake* — form-order language reciting that the court considered "the evidence submitted by the parties" displaces the presumption against late-filed evidence; and SJ evidentiary objections require a ruling to avoid waiver. Order-drafting checklist item.

**3.5 Substance-abuse treatment records (Way 16)** [VERIFY]: 42 C.F.R. Part 2 is a stricter-than-HIPAA regime — court-order prerequisites (§2.63–2.64), mandatory in camera review, mandated limiting/sealing provisions, controls over conflicting state law. The records-request machinery and any records-handling automation must treat Part 2 material as its own class.

**3.6 Pre-suit checklist enhancements (Ch. 25)**, against the existing `presuit_investigation_checklist` entity — the chapter's distinctive contribution is **time-criticality annotations**: wreckage sold to salvors within days (preserve by agreement or court order; restraint inspection before spoliation); NTSB takes scene control within ~24 hours in aviation; scene evidence on roadways dissipates fastest; weather-data ordering protocol (NWS, three nearest stations, ≥±1 hour); TPIA requests early with follow-up runway because lawful delays stretch response times; **TRCP 28** — sue in the assumed/common name with true-name substitution later (the Texas answer to no-John-Doe practice); Rule 202 available to *either* side. These slot as urgency metadata on checklist items, not new items.

**3.7 Counsel's uncontested statements as evidence (Way 9)** [VERIFY]: *Jackson v. Takara*, 675 S.W.3d 1 (Tex. 2023) — a 193.6 good-cause finding can rest on counsel's uncontested factual representations at a hearing. Pairs with 1.9: the engine's records may supply what counsel then represents.

**3.8 Surveillance films (Ch. 13)** [VERIFY]: *NOV v. Sanchez* (El Paso 2024) — under the pre-2020 rules impeachment evidence had to be disclosed; the 2020 rules exempt impeachment from *disclosure*, so the author's practice pointer is to **serve an explicit RFP for photographs/films depicting the plaintiff**, which arguably reaches impeachment material through the production route. Discovery-template item for the form engine.

**3.9 Mental-health record scope (Ch. 13, *Richardson Motorsports*)** [VERIFY]: bystander "shock" is a foreseeability/law element, not a jury fact, and does not alone open mental-health history; defendant pleadings (alternative cause) can place condition in issue (*R.K. v. Ramirez*); designation of a treating psychologist does (→ 1.5); and even then scope is condition-specific with court-directed redaction. Feeds the records-response side of the discovery machinery.

**3.10 LOP proportionality (Ch. 13)** [VERIFY]: *In re ExxonMobil*, 635 S.W.3d 631 (Tex. 2021) — LOPs give providers a financial stake that **offsets their nonparty protection** in the K&L/North Cypress discovery calculus. Belongs in the LOP decision-support notes (with §1.2's *Power v. Kilgore* priority warning and the Ch. 16 LOP-drafting principles: client authorization, injury-related debts only, reasonableness language, health-insurance-billing evaluation, *Advantage/Cruse* offer-acceptance formation, Op. 625 successor binding, *Ridgeway v. MedFin* (San Antonio Feb. 19, 2025) attorney-immunity split).

---

## 4. Registry candidates accumulated this pass

Every entry needs Michael's read of the primary source; provenance markers per pass-1 Q7/H58 (practice-derived vs. rule-derived) apply. **None are registry entries yet.**

**Service / limitations:**
- *Tex. State Univ. v. Tanner*, 689 S.W.3d 292 (Tex. 2024) — service diligence; relation-back; jurisdictional vs. governmental defendants (→ H21/H59)

**Post-judgment / trial:**
- TRCP 296 / 297 / 298 / 306c — the findings-of-fact chain (three clocks + waiver trap)
- JNOV written-ruling requirement (Way 15's authorities)
- *Patel*, *Lehmann/Elizondo* — finality
- *In re Greystar* [PENDING] — supersedeas $25M cap unit

**Medicare Secondary Payer family (federal; disbursement stage):**
- 42 U.S.C. §1395y(b)(2)(B) — conditional payment recovery; (b)(2)(B)(vi) 3-year claims-filing; (b)(3)(A) double damages; (b)(8) Section 111 reporting
- SMART Act final-CP process (120/65/3-day/11-business-day chain) + 3-year notice-based SOL
- 42 C.F.R. §411.24(d),(e),(g)–(i) — enforcement reach incl. attorneys; §411.50 promptly period (120 days); §424.44 1-year provider filing; §411.46–.47 (MSA allocation)
- CMP final rule (Oct. 11, 2024 reporting clock; Apr. 1, 2026 audits; daily-rate schedule; ~$521K/record cap; 5-yr SOL via 28 U.S.C. §2462)
- CPRC §41.014 (HB 658) — no post-judgment interest on the Medicare interest pre-demand-letter if paid within 30 days
- *Hadden*; *Haro v. Sebelius*; *Stricker*; *W. Heritage*; *Humana v. Paris Blank*; *Caris MPI* (5th Cir. 2024, MA exhaustion)

**Medicaid:**
- Hum. Res. Code §32.033 — assignment, 45-day attorney notice + contents, misdemeanor backing, (f) waiver
- 1 TAC §§354.2332–.2333 — 15% fee / ≤10% expenses / no fee on waived portions
- *Ahlborn* (restored by 2018 BBA §53102, retroactive 9/30/2017); *Torres v. Giacona* (2025); *City of Houston v. Manning* (2024); Est. Code §541.004 trusts

**Workers' comp:**
- Lab. Code §§417.001–.003 — first money (*Ledbetter*), fee structure, §417.003(b) disclosure/consent filing (*Gray Law*)
- Two 2-year SOLs (*Guillot v. Hix* relation-back; *Autry* distribution-clock + pled tolling)
- *Wedel* / *Exxon Mobil* — waiver-endorsement scope

**Hospital lien:**
- Prop. Code §55.0015 (HB 2929, eff. 6/10/2019); §55.004(b)(2)–(3) (50% cap; 100-days-of-hospitalization; HB 2064 pro-rata deduction, eff. 6/16/2021); §§55.006–.007 (*Bleeker* release gates); no-indexing-deadline holding (*Memorial Hermann*); invalid-notice defects (*Methodist v. Mid-Century*); post-settlement attachment (*Richards*); 72-hour admission rule incl. transfers (§55.002)

**ERISA / plans:**
- 29 U.S.C. §1132(c) plan-document penalty [confirm current daily rate]; *Sereboff*; *Montanile*; *Knudson*
- Child-support lien priority set (Fam. Code ch. 157 lien provisions; *Power v. Kilgore*)

**Evidence / discovery:**
- *Ortiz v. Nelapatla* [PENDING — Entry 2 watch]; *Jackson v. Takara*; *Duncan*/*Simien* per-court map; 42 C.F.R. Part 2 (§§2.63–2.64); *In re ExxonMobil* 635 S.W.3d 631; *Redbird Trails* / *UV Logistics* / *Our Lady* (exam conditions); *NOV v. Sanchez* (surveillance)

**Pre-suit:**
- TRCP 28 (assumed-name suit + substitution); TPIA ch. 552 response-clock family (already partially in pass 1)

---

## 5. Time-anchored items for the legislative-watch / citator layer

1. **CMP audit era live since 2026-04-01** — ledger item, current-practice exposure (§1.8).
2. ***Ortiz v. Nelapatla*** — granted 4/4/2025; decision may exist by now; Entry 2 must not be signed off without checking. 
3. ***In re Greystar***, ***In re Brenham Nursing***, ***In re Pinnergy*** — pending mandamus/argument grants as of the book's June 2025 window; check status.
4. **Kostura's 30-day CPN rule vs. the 2024 CMP rules** — the paper itself flags possible supersession; resolve which text governs before the CPN thread template is drafted.
5. *Sheppard* subsequent history (carried from Entry 1's checklist) — unchanged, still open.

---

## 6. What this pass deliberately did NOT do

- **No lien taxonomy restatement.** `pi-case-playbooks.md` Part II owns it; §2.3 above references, extends with clocks, and does not duplicate.
- **No walkthrough rulings.** The disbursement stage remains UNWALKED; §2 is a proposal package for that walkthrough, not a substitute for it.
- **No build items.** D3/H8 still gates T1. Nothing here enters the build queue.
- **No verification.** Including of the *Tanner* holding — the H21 resolution is a *candidate* until Michael reads the opinion.

---

## 7. Cross-references into the existing register (no renumbering)

- H21 → §1.1 (resolution candidate H59)
- H35 (deficiency submodule pattern) → §2.2's module-vs-thread question (H61)
- H50 (supplementation dormancy) — untouched; nothing in this pass bears on it
- H52 (*Texan Millwork* fork) — §1.6 adds the protective-order instrument to the same deposition-thread family
- H53 (mediation arming split) — §2.6 strengthens the lien-posture link into mediation
- Pass-1 Q3 (reporter's-notes 3-year fuse) — unaffected
- D3/H8 — §2.1 is additional evidence for the shared substrate decision

## 8. NEW open questions for Michael (H59–H67)

- **H59.** Adopt *Tanner* as the H21 service-diligence registry cite (after reading it), with the governmental-defendant jurisdictional escalation profile?
- **H60.** Confirm the disbursement-stage arming model: payer threads arm at intake off the coverage-inventory answers (three-way Medicare distinction: traditional / Advantage / supplemental), not at settlement?
- **H61.** BCRC clock chain: heartbeat thread family, or dedicated sub-module parked like the deficiency engine?
- **H62.** Clerk-verification exchange protocol: build as a form-engine artifact + choreographed task on the lien-clearance gate?
- **H63.** *Duncan*/*Simien* admissibility standard: does the court-profile layer carry per-district legal-standard attributes, or does the registry own jurisdiction-split entries?
- **H64.** Warning gate keyed to our own designation acts (treating psychologist/physician designation → records scope + Rule 204 exposure)?
- **H65.** Intake question set: add expected-Medicare-eligibility-within-30-months as a first-class field (drives MSA tree + BCRC arming), distinct from current-beneficiary status?
- **H66.** "Settled but not funded" as an explicit case sub-status (it changes which federal clocks are running)?
- **H67.** Deadline-provenance log as a first-class artifact (the *Verhalen* affidavit), joined to §9.3's instrumentation?

## 9. PASS 3 plan (updated)

Pass 1 §10's plan stands, with additions from this pass:
1. Ch. 22 Tilley/Tripartite (Michael's own) — automation constraints in tripartite postures.
2. Ch. 5 / Ch. 7 / Ch. 15 — damages-proof spine (drives medical/billing module outputs).
3. Ch. 3 Insurance Update + Ch. 19 Tax — settlement-structure and pre-release tax decisions (upstream of §2's disbursement catalog; the double-tax material gates release drafting).
4. Ch. 16/17 trucking broker + telematics — against vehicle/telematics extensions and preservation letters.
5. Ch. 2 / Ch. 9 / Ch. 18 / Ch. 26 — playbook-level mapping.
6. **NEW:** Ch. 24 SCOTX Update remaining sections (governmental immunity, negligence, TCPA) — playbook-level, lower priority.
7. **NEW:** Kostura sections not deep-read this pass — FEHBA (§II.E), FEWCA, ERISA case-law body (§§VII–XIII), choice of law (§XIX), indemnification/release drafting (§XX), and an **appendix forms inventory** (the appendix runs ~34 pages of flows, memos, and model language worth cataloguing for the form engine).
8. Cross-pass synthesis: the consolidated registry-candidate table with provenance markers for the sign-off queue (pass-1 plan item, now spanning both passes).

---

**Nothing in this document enters the build queue.** D3/H8 still gates T1. Every proposition above is unverified.
