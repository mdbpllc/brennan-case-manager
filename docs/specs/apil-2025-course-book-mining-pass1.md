# Advanced Personal Injury Law 2025 (41st Annual) — Course Book Mining, PASS 1

**Status:** SOURCE MINING, **PASS 1 of 4** — design side, 2026-07-25. NOT canonical, NOT a design doc, NOT in the build queue.

> **⚠ ERRATUM (added 2026-07-25, per `apil-2025-course-book-mining-pass3.md` §0):** the article map and heat map
> below are **materially incomplete**. This book has **27 chapter-level articles, not 23**. Four chapters
> totalling ~233 pp. were omitted: **Ch. 11 Products Liability (PDF 347; 11.1 at 353, 11.2 at 427)**,
> **Ch. 12 Jury Charge Update (PDF 479)**, **Ch. 20 UM/UIM (PDF 675)**, and **Ch. 23 Estate & Probate
> (PDF 1017; 23.1 at 1027, 23.2 at 1039)**. Two label corrections also apply: Ch. 2 (premises/Ch. 95) begins at
> PDF **95**, not 101; and the chapter recorded as "613 CPRC Ch. 72.051" is **chapter 18**. **Use the corrected
> full article map in pass 3 §0 — not the one below.**
**Canonical repo path:** `docs/specs/apil-2025-course-book-mining-pass1.md` — routed Code-side per the accompanying handoff.
**Legislative caveat:** the legislative chapter is a **June 6, 2025 snapshot taken before the June 22 veto deadline** and its outcomes are not final (see §6 below).
**Source:** State Bar of Texas, 41st Annual Advanced Personal Injury Law (San Antonio July 23–25, 2025 / Houston Sept 3–5, 2025), MCLE 174274303. 1,202 pp., 23 substantive articles. Uploaded by Michael 2026-07-25.
**Copyright note:** TexasBarCLE materials are copyrighted and single-user licensed. Everything below is paraphrase and issue-spotting for internal design use. No article text is reproduced. Do not paste article text into repo docs.

**Registry discipline:** every legal proposition below is an **UNVERIFIED registry candidate**. A CLE paper is a secondary source and a model summarizing it is not verification. Nothing here gets hard-coded, and nothing computes a legal outcome, until Michael reads the primary authority and signs off entry by entry.

**Markers:** [BOOK] = stated in the course book. [ENGINE] = Claude's design implication, unruled. [CONFLICT] = tension with an existing project ruling. [VERIFY] = pull the primary source before use.

---

## 0. What pass 1 covered

**Structural pass:** whole book — article map, boundary detection, automated harvest of deadline-bearing language across all 1,202 pages (heat map below).

**Deep reads (5 of 23 articles):**
- Ch. 8 — *Things I Wish My Mediator Had Told Me Before…* (Steward / Laughlin) — mediation
- Ch. 10 — *Twenty Ways to Make Your Appellate Lawyer Happy* (Baruch / Forbes) — trial + error preservation
- Ch. 13 — *Rooting for Acorns Discovery Update 2025* (Gold) — discovery, depositions, corporate reps
- Ch. 4 — *News From the Legislative Front: Sine Die Edition* (Bullard) — 2025 session outcomes
- Ch. 14 — *The Changing Landscape of Artificial Intelligence* (Hardy / Hon. Rodriguez) — skimmed

**Article map (PDF page → chapter):** 79 Evidence/Trial Notebook · 101 Premises & Ch. 95 · 109 Insurance Update · 139 Legislative · 171 Future Damages · 191 Jury Selection · 215 Noneconomic Damages post-*Chohan* · 239 Mediation · 251 Nonsubscriber · 325 Appellate/Preservation · 487 Discovery Update · 537 AI · 547 Nuclear Verdicts · 577 Trucking Broker · 595 Telematics/Infotainment · 613 CPRC Ch. 72.051 · 625 Tax/Double Tax · 691 Subrogation & Liens (Kostura — already in project knowledge) · 1001 Tilley/Tripartite (Michael's own) · 1095 SCOTX Update · 1137 Pre-Suit Investigation · 1153 Exemplary Damages · 1175 Specialization Exam.

**Deadline-language heat map** (crude line-count, two-column layout undercounts): Subrogation/Liens 111 · Legislative 30 · Tilley 20 · Appellate/Preservation 18 · Specialization 14 · Discovery Update 13 · Tax 10. These are the density targets for passes 2 and 3.

**[ERRATUM 2026-07-25]** The "Specialization 14" entry is a **false positive** — that article is a slide deck
about sitting for the board-certification exam and its hits are exam application dates. It carries nothing for
the engine. The heat map also could not rank the four chapters omitted from the article map above.

---

## 1. Findings that CHANGE work already ruled on

### 1.1 [CONFLICT] Deposition control is measured at NOTICING — the ladder has a hole

[BOOK] *In re Texan Millwork*, 631 S.W.3d 706, 713–14 (Tex. 2021) construes TRCP 199.3: serving the deposition notice on a party's attorney carries the same force as a subpoena on the witness **only if the witness is a party, or is retained/employed/otherwise under that party's control at the time the deposition is noticed** — not at the time of the incident. Where the record showed no contemporaneous control, the trial court abused its discretion by ordering the party to produce the witness. Retained experts are presumptively under the retaining party's control (*In re Reaud* cited for the point). [VERIFY]

**[ENGINE] Why this breaks the H39 ladder as designed.** The three-request-then-unilaterally-notice ladder (2026-07-25 rulings) implicitly assumes the deponent is the defendant's to produce. For a defendant-driver who has since left the employer, that assumption fails: three emails then a notice on counsel compels nobody, and the runway burned is unrecoverable.

**[ENGINE] Proposed fix, unruled:** before the deposition thread arms, the engine asks a routing question — *is this deponent a party, or still employed/controlled by a party?* Yes → the existing ladder runs unchanged. No → the thread routes to **Rule 176 subpoena practice** instead, which is a different action with different mechanics (service on the witness, witness fees, geographic limits). This is a fork at the top of the thread, not a warning at the bottom.

**[ENGINE] Secondary:** employment status is not static. A driver employed at noticing may be gone by the time you re-notice after a quash. Candidate: a deponent-status field on the party record with a staleness prompt.

### 1.2 [BOOK] Corporate-representative protocol — H39's missing half

*In re Home Depot USA*, 2023 WL 4943328 (Tex. App.—Beaumont 2023, orig. proceeding). Non-subscriber claim; plaintiff's corp-rep topics were broader than the pleadings; Home Depot served scope objections two days before the deposition and the court declined to treat that as waiver. [VERIFY — the paper notes this opinion had no Westlaw citation assigned and had not been cited by other courts at publication.]

Two propositions worth registry entries:

**(a) Topics are discovery requests.** Corp-rep topics must be drafted with reasonable particularity and tailored to the claims and defenses actually pled; discovery may not exceed the bounds of the claims at issue (*In re USAA Gen. Indem. Co.*, 624 S.W.3d 782 (Tex. 2021) cited for the principle). [VERIFY]

**(b) There is NO rule-set objection deadline.** [BOOK] TRCP 199.2 does not say how or when a party objects to the scope of corp-rep topics. Neither does FRCP 30(b)(6). Federal practice generally expects a protective order before the deposition. This silence is the design problem.

**[BOOK] Gold's proposed better practice** (his recommendation, expressly not a rule):
1. Serve topics far enough ahead to allow conferral.
2. Objecting party states objections **and proposed modifications** — he suggests no more than ~10 days after service of the notice.
3. If no agreement within ~15–20 days of service, either side seeks court intervention.
4. Usually better to get the ruling before taking the deposition; sometimes better to take it subject to objections and reserve the right to resume.

**[ENGINE] Implication.** The corp-rep thread is the plain deposition ladder **plus a topic-negotiation sub-ladder** that runs in parallel. Its intervals are *practice-derived, not rule-derived* — that distinction must be stamped on the registry entry, because the engine's usual "the rule says X" provenance doesn't exist here. Also note FRCP 30(b)(6) does impose a duty to confer about matters for examination; the Texas rule does not. Do not let a Code session import the federal duty as though it were Texas law.

### 1.3 [CONFLICT] Mediation arming — the book says answer-filed, we ruled first-deposition

[BOOK] Steward suggests raising mediation and identifying candidate mediators **soon after the answer is filed**, on the reasoning that you can tell whether a case needs mediating long before you can value it. He specifically frames it as naming *three* potential mediators.

**[CONFLICT]** The 2026-07-25 ruling arms the mediation thread on **the first deposition of the defense**, with a 20-day baseline nudge.

**[ENGINE] Not necessarily wrong — but now a deliberate fork rather than a default.** Both anchors chase the same scarcity problem. Candidate reconciliation: split the thread. A **naming/roster** sub-thread arms at answer (cheap, no scheduling commitment, and it front-loads the agree-on-a-mediator negotiation that currently sits *before* date-chasing). A **date-chasing** sub-thread arms at first-defense-deposition as ruled. That preserves your ruling while capturing his point. Michael's call.

Note the roster idea you designed independently matches his practice exactly — a slate of candidate names proposed to the other side.

### 1.4 [BOOK] Bexar County: mediation gates the trial setting

Steward states that in Bexar County a case cannot proceed to trial without mediation unless the parties agree not to mediate, and that courts commonly put a mediate-or-report-by-a-date-certain provision in the scheduling or docket control order. [VERIFY against Bexar local rules — this is a CLE assertion, and it is exactly the kind of local-rules fact the registry exists to pin.]

**[ENGINE]** Two consequences. (1) The local-rules layer needs a second Bexar entry alongside hearing-date conferral: *mediation required before trial*. (2) This is a **gate on the trial setting**, not a nag — same class as the conferral gate, where the jurisdiction flips a soft nudge into a hard block. (3) It reinforces the DCO ingester: the mediate-by date is one of the dates the extractor must pull and mark as a DCO override.

---

## 2. The find with no current owner: the three-year reporter's-notes fuse

[BOOK] Tex. Gov't Code § 52.046(a)(4) requires an official court reporter to preserve notes for **three years from the date the notes were taken** — not from judgment, not from disposition. TRAP 34.6(f) entitles an appellant to a new trial for a lost or destroyed record only if the request was timely and the appellant was **without fault**; TRAP 34.6(b)(1) makes a request timely if made at or before the deadline to perfect appeal. *Piotrowski v. Minns*, 873 S.W.2d 368 (Tex. 1994): an appellant who does nothing to preserve the notes within the three-year window is **not without fault**, and gets no new trial. [VERIFY all three.]

[BOOK] Two scenarios where this bites: an evidentiary pretrial hearing early in a case that then litigates past three years (venue hearings are the given example), and a case tried but with entry of judgment delayed past three years (post-verdict bankruptcy, long mandamus).

**[ENGINE] This is the purest heartbeat thread found so far.** Invisible clock, cheap action (order/secure the transcript), catastrophic and unrecoverable failure mode, and no human on earth is tracking it. Proposed shape, unruled:
- Every hearing logged on a case carries an **evidentiary? y/n/maybe** flag.
- Any hearing flagged evidentiary-or-maybe starts a **3-year clock from the hearing date**.
- Thread runs cold for roughly the first two years, then wakes: *this hearing's record can be destroyed on [date]; order the transcript.*
- Dies on proof in the record — transcript in the file — consistent with the house completion pattern.
- Companion rule from the same article: **if anyone could conceivably argue on appeal that a pretrial hearing was evidentiary, ask the reporter to make a record.** That's a checklist item attached to hearing-setting, not a deadline.

**[ENGINE]** Note the interaction with your own hearing threads: the quash-response notice of hearing, the default-judgment prove-up, and any Rule 204 exam fight all generate hearings that could be evidentiary. The fuse is lit by threads we've already designed.

---

## 3. Trial stage — the preservation spine (Ch. 10)

The trial stage of the heartbeat is not a set of clocks. It is a **checklist executed under time pressure, where every miss is permanent**. That is a different engine shape than everything upstream and worth naming before it gets designed as more countdowns.

[BOOK] Preservation propositions, all [VERIFY]:
- Complaint must be timely and state specific grounds (TRAP 33.1); a non-specific objection preserves nothing.
- The trial objection must **match** the appellate complaint — an objection preserves only the ground actually asserted.
- **Premature objections preserve nothing.**
- The record must show a ruling, or a refusal to rule (TRAP 33.1(a)(2)).
- You generally cannot rely on another party's objection.
- **Object every time the evidence is offered**; an unobjected-to offer of the same evidence waives. Running objections are risky and must be renewed **witness by witness** — they do not carry across witnesses.
- To complain of exclusion, make an **offer of proof** (testimony outside the jury's presence or a concise description; exhibits tendered as excluded exhibits). No formal offer needed where substance is apparent from context (TRE 103(a)(2)).
- Constitutional claims must be raised below; **as-applied** challenges must be preserved, **facial** challenges may be raised first on appeal.
- **Continuances: TRCP 251 requires written and verified.** Texas courts repeatedly hold that denying an *oral* motion for continuance is not an abuse of discretion. [ENGINE] This is a form-engine + hard-gate item: the system should never let a continuance go out unverified, and should refuse to treat an oral request as a filed one.
- **Charge error:** objection must be made **before the charge is read to the jury**; objections after are waived (*King Fisher Marine v. Tamez*, 443 S.W.3d 838 (Tex. 2014)). Trial courts may set an earlier deadline for charge objections so long as counsel gets reasonable time. Objections in writing or dictated to the reporter in the judge's and opposing counsel's presence; specific; ruled on. **Separately**, a written request is required where the charge omits a question you bear the burden on, or omits an instruction/definition you want — tendered in writing, in substantially correct wording, **signed as refused** (TRCP 272, 273, 274, 276, 278). Oral objection alone may waive.
- Time limits imposed by the court must be objected to **at the time imposed**, with a due-process allegation, a ruling, and an offer of proof.
- Attorney's fees: a general prayer supports an award; the opponent must **specially except** to a fee pleading with no stated basis.

**[ENGINE] Design implication.** The trial-stage heartbeat is probably not a nag engine at all — it is a **live checklist surface** (charge conference, offers of proof, running-objection renewals) plus a small number of pre-trial arming events. Worth ruling explicitly before anyone builds trial-stage threads on the discovery-thread pattern.

Sections not yet read in Ch. 10 (pass 2 targets): Way 8 findings of fact — request timing (TRCP 296/297 family); Way 12 judgment finality; Way 13 summary-judgment order drafting; Way 15 written ruling on JNOV; Way 17 third-party business records (a genuine split: *Duncan* vs. *Simien* standards, El Paso and formerly Dallas following *Duncan*, most courts now following *Simien*) — this one matters for your billing-records affidavit practice.

---

## 4. Mediation — readiness gates and post-impasse (Ch. 8)

### 4.1 [BOOK] Pre-mediation readiness checklist
Steward's list of what must be true before mediating: parties prepared; the information the defense needs has been provided; a settlement demand has been made; all medical records and bills provided; **reports written to the adjuster so reserves can be set**; discovery responses exchanged that show the case's strengths and weaknesses.

**[ENGINE] The reserve-setting item is the one nobody has named in this project.** If the carrier has not set reserves, the money to settle does not exist in the room on mediation day, regardless of how well the mediation goes. That is a **readiness gate with a lead time of its own**, and it should arm well before the mediation date — it is upstream work, not day-of work. Strong candidate for a sub-thread hanging off mediation-booked.

### 4.2 [BOOK] Mediator submission requirements vary per mediator
Some mediators want a short position summary; others want a detailed memorandum with pleadings and documentary evidence. Submissions are pre-conference.

**[ENGINE] Roster enhancement.** The mediator roster you designed (score + jurisdictions) should carry a third attribute: **what this mediator requires and how far ahead**. That converts a recurring scramble into a pre-armed task the moment a mediator is agreed.

### 4.3 [BOOK] Mediator's proposal — open period is a judgment call
Steward ties the length of time a mediator's settlement proposal stays open to the work the plaintiff must do in the interim — **including lien reductions** — and to the carrier's ability to secure additional funds.

**[ENGINE]** This connects the mediated-proposal deadline you ruled (captured amount + deadline, logged to the negotiations tab) directly to the **lien/subrogation module**. The proposal window should be set with knowledge of outstanding lien work, not picked blind. Cross-reference Kostura Ch. 21 (already in project knowledge).

### 4.4 [BOOK] Post-impasse: keep the mediator warm
Ask the mediator to stay involved, and start that conversation **before the mediation concludes**. The mechanism he names: sending the mediator discovery supplements, later settlement demands, and orders on dispositive motions as signals the case is still live.

**[ENGINE] This is a thread we did not design.** Our impasse branch forks to reschedule / proposal / report. It does not include a **keep-the-mediator-warm** touch cadence. Cheap to build (it reuses the negotiations-tab events as triggers) and it is exactly the "system drafts, human sends" pattern already established.

### 4.5 [BOOK] Second mediations are normal
Nothing requires the first mediation to fail before scheduling another; second mediations are commonplace on significant cases; if you expect the first to fail, tell the client and the mediator. Second mediation requires a full file update to the mediator.

**[ENGINE]** Supports the reschedule branch already ruled, and adds a payload: the reschedule action should carry a **mediator re-briefing package**, not just a new date.

### 4.6 [BOOK] Stowers gating at mediation
Steward's estimate is that a large majority of the cases he mediates involve an asserted Stowers demand and that a substantial share do not satisfy the doctrine's requirements. The three elements as he states them: the claim within the scope of coverage; demand within policy limits; terms such that an ordinarily prudent insurer would accept given the exposure to an excess judgment. A demand exceeding limits does not trigger the duty, however reasonable. [VERIFY — *Stowers* line, and note Michael's playbooks already carry a `stowers_demand` entity with a validity checklist.]

**[ENGINE]** Two mediation "no-no" items convert cleanly into engine gates: **do not mediate without knowing the applicable policies**, and **do not open with a demand exceeding limits**. Both are pre-mediation blocking checks, not reminders.

### 4.7 [BOOK] Exemplary-damages pre-mediation checklist
If exemplary damages are in play: actual damages established; punitive damages properly pled under CPRC ch. 41; sufficient gross-negligence evidence; whose conduct is attributable to the corporation; **net-worth discovery conducted**; statutory cap pled. [VERIFY]

**[ENGINE]** Net-worth discovery has its own lead time and its own discovery fight (Ch. 13 has a section on it). If exemplary damages are flagged on the case, that checklist should arm off the *mediation-booked* event, because assembling it after the mediation is scheduled is too late.

---

## 5. Discovery — items not yet walked into the heartbeat (Ch. 13)

All [VERIFY]; listed as registry candidates with engine hooks.

- **Rule 202 pre-suit depositions are being read narrowly.** *In re Acclarent* (Fort Worth 2024) plus *In re Wolfe* (Tex. 2011): courts must strictly limit and carefully supervise pre-suit discovery. Petitions that merely track the rule's language are conclusory; the petitioner must plead with factual specificity why the benefit outweighs the burden, and having already obtained other evidence cuts against the showing. [ENGINE] Your pre-suit checklist already tracks Rule 202 states; add a **pleading-specificity gate** — the engine should not treat a Rule 202 petition as a routine form.
- **Disclosures are automatic, not requested** (since the 2021 amendments, cases filed on/after 1/1/2022). Scope is Rule 194; discovery requests are governed by Rule 192, and the two are not the same thing. The old records-or-authorization *election* question is largely mooted by the 194.2(b)(6) obligation to produce or describe what you may use to support your claims.
- **Surveillance is contested ground.** *In re Weeks Marine* (San Antonio 2000) is cited by defendants to withhold surveillance as work product; Gold's long-standing critique is that it never addressed TRCP 192.5(c)(4), which makes photographs/images a party intends to offer discoverable notwithstanding work product. [ENGINE] Pair this with the 193.6 exclusion war story already in your playbooks — surveillance is both a thing you demand and a thing that gets excluded when late.
- **Medical authorizations must be tailored** (*Mutter v. Wood*); blanket authorizations are an abuse of discretion.
- **Mental-health records:** *In re Richardson Motorsports*, 690 S.W.3d 42 (Tex. 2024) — pleading ordinary mental anguish alone does not put mental condition in controversy, but consulting or treating with a professional and relying on it can, and designating a treating psychologist as a testifying expert does. *In re Williams Brothers Construction* (Houston [14th] 2024) extends the exposure: **the defense can invoke the patient-litigant exception** by asserting the anguish had pre-existing causes, even where the plaintiff disclaims the prior diagnosis. [ENGINE] Your form-engine already has a HARD PAUSE on designating a mental-health treater. *Williams Brothers* means the pause is **not sufficient** — the exposure can be created by the defense's pleading, not only by your designation. The warning gate needs a second trigger.
- **Proportionality analysis is the court's job once raised.** *In re Central Oregon Truck* (Tex. 2022) remanded for the *K&L Auto Crushers* analysis. [ENGINE] Practice hook: make sure the record reflects the analysis. Already in project knowledge as a PDF.
- **Deemed admissions:** *Wheeler*, *Marino*, *Hayward v. Gomez*, *In re Euless Pizza*, 702 S.W.3d 543 (Tex. 2024) — good cause is a low bar and mistake usually satisfies it, but merit-preclusive deemed admissions require the opponent to show flagrant bad faith or callous disregard; withdrawal was denied where conscious indifference was shown. [ENGINE] The RFA deemed-admission trap already flagged in capture e now has its case line.
- **Work product needs a log; attorney-client does not.** Ordinary work product being withheld should be identified with a privilege log on request (*In re Scherer*, Eastland 2024).
- **Fifth Amendment / parallel litigation.** Texas does not favor abating civil cases for parallel criminal proceedings, and blanket discovery prohibitions are inappropriate (*In re Economic Development Corp. of Weslaco*); adverse inference is available to the civil jury (*Wilz v. Flournoy*; TRE 513(c)); waiver by scene statements turns on voluntariness (*In re Peters*, 699 S.W.3d 307 (Tex. 2024)). [ENGINE] **A criminal-charge flag on a defendant is a case-shaping attribute** — it changes deposition strategy, timing, and settlement posture. Worth a first-class flag rather than a note.

---

## 6. Legislative — 2025 session outcomes (Ch. 4)

**Snapshot caveat, important:** this article is dated **June 6, 2025**, four days after sine die and **before the June 22 veto deadline**. The author expressly says he will issue a final update after that deadline and will re-check whether failed provisions were amended into other bills. **Do not treat these as final outcomes.** [VERIFY against enrolled bills / final session records.]

**Passed (per the snapshot):** SB 29 (business entities, eff. 5/14/2025) · HB 40 (business court expansion, eff. 9/1/2025, with changes applying to actions commenced on/after 9/1/2024) · SB 293 (judicial discipline/transparency) · SB 2878 (omnibus courts bill) · HB 4081 (sealing documents alleged to contain trade secrets) · SJR 27.

**Failed (per the snapshot):** **SB 30 (recovery of damages in civil actions)** · HB 939 and HB 1419 (noneconomic damages caps) · **HB 2446 (affidavits concerning cost and necessity of services — the §18.001 family)** · HB 4036 (health care liability limits) · **SB 39 (commercial vehicle owner/operator liability)** · **SB 953 (eligibility for pre-suit depositions)** · a long list of appellate-jurisdiction and TCPA bills.

**[ENGINE] Direct registry hits.** The medical-billing registry draft carries "SB 30 fate" as an open [NEG]/[EXT] item. This is a secondary-source answer, not verification, and it predates the veto deadline — but it tells the legislative-watch module exactly what to confirm. Same for HB 2446: §18.001 practice was **not** amended this session per the snapshot. SB 293 and HB 4081 are already named in `pi-case-playbooks.md` as `effective_date_range` versioning events, which is consistent.

---

## 7. Cross-cutting patterns this book surfaces

1. **Some obligations have no rule-set deadline at all** (corp-rep topic objections). The engine's provenance model must distinguish rule-derived from practice-derived intervals, and display which it is. Otherwise a practice-derived number acquires false authority.
2. **Some clocks run from an event nobody logs** (reporter's notes, from the hearing date). The engine only sees clocks whose anchor it records — so the *hearing* becomes a first-class logged entity, not a calendar entry.
3. **Exposure can be created by the opponent's pleading, not your action** (*Williams Brothers* mental-health). Warning gates keyed only to your own moves will miss these.
4. **Jurisdiction flips soft to hard in more places than we found** (Bexar conferral; Bexar mediation-before-trial). The local-rules layer is load-bearing for the heartbeat, not a nicety.
5. **Trial-stage failure is instantaneous and permanent**, unlike upstream deadlines where a miss is usually recoverable. Different engine shape: live checklist, not countdown.

---

## 8. Open questions for Michael (new, from this pass)

- **Q1.** Deposition thread: add the party/control routing fork at arming (§1.1)? Yes/no.
- **Q2.** Mediation arming: split into a roster/naming sub-thread at answer-filed plus date-chasing at first-defense-depo (§1.3)? Or hold the single first-depo anchor as ruled?
- **Q3.** Reporter's-notes 3-year fuse (§2): build as a thread? If yes, does every hearing get an evidentiary flag, or only hearings of named types?
- **Q4.** Trial stage: rule now that it is a checklist surface rather than a nag engine (§3)?
- **Q5.** Adjuster reserve-setting (§4.1): its own sub-thread off mediation-booked, or a checklist item on the existing readiness gate?
- **Q6.** Criminal-charge flag on a defendant (§5): first-class case attribute?
- **Q7.** Corp-rep topic-objection intervals are practice-derived. Does the registry accept practice-derived entries with a provenance marker, or do they live somewhere else?

---

## 9. PASS 2 plan (deeper)

**[SUPERSEDED 2026-07-25]** Executed. See `apil-2025-course-book-mining-pass2.md` / `-pass3.md`. The forward
plan now lives in pass 3 §11, which is re-prioritised around the four chapters this map omitted.

Targets, in priority order:
1. **Ch. 21 Subrogation & Liens (Kostura)** — highest deadline density in the book (111 hits) and it owns the disbursement stage, which is entirely unwalked. Already in project knowledge as a PDF; read against the course-book version.
2. **Ch. 10 remainder** — findings of fact timing, judgment finality, JNOV written ruling, and especially **Way 17 third-party business records** (*Duncan*/*Simien* split) — bears directly on billing-records affidavits and the A1 affidavit chain.
3. **Ch. 25 Pre-Suit Investigation** (Slack) — against the existing `presuit_investigation_checklist` entity.
4. **Ch. 13 remainder** — adverse medical/psychological exams (Rule 204 family, alongside registry Entry 10), non-party discovery, motions for protection, and the full 193.6 treatment.
5. **Ch. 24 SCOTX Update** — March 2024 through June 2025, for registry entries whose status may have moved.

## 10. PASS 3 plan (deepest)

**[SUPERSEDED 2026-07-25]** Executed. See `apil-2025-course-book-mining-pass2.md` / `-pass3.md`. The forward
plan now lives in pass 3 §11, which is re-prioritised around the four chapters this map omitted.

1. **Ch. 22 Tilley/Tripartite (Michael's own)** — read for what the *system* must not do in a tripartite posture; conflicts rules constrain automation.
2. **Ch. 5 Future Damages / Ch. 7 Noneconomic post-*Chohan* / Ch. 15 Nuclear Verdicts** — the damages-proof spine, which drives what the medical/billing module must be able to produce and when.
3. **Ch. 3 Insurance Update, Ch. 19 Tax** — settlement-structure and disbursement consequences (double-tax planning is a *pre-release* decision, so it belongs upstream of disbursement).
4. **Ch. 16/17 Trucking broker + telematics** — against the existing vehicle/telematics data-model extensions and preservation-letter machinery.
5. **Ch. 2 Premises/Ch. 95, Ch. 9 Nonsubscriber, Ch. 18 Ch. 72.051, Ch. 26 Exemplary** — playbook-level, mapped to the existing PI playbook sections.
6. Cross-pass synthesis: a single consolidated **registry-candidate table** with provenance markers, ready for Michael's sign-off queue.

---

**Nothing in this document enters the build queue.** D3/H8 still gates T1. Every proposition above is unverified.
