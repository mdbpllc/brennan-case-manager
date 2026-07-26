# Session Log

Purpose: a dated, running record of what happened session to session in this project — decisions made, progress, and open threads — separate from `case-management-project-instructions.md` (which stays the single canonical, always-current spec for the case management build).

**How to use this doc (for any Claude session working in this project):**
- At the **start** of a session touching this project's work, skim the most recent 2-3 entries below to pick up where things left off, especially "Next" items.
- At the **end** of a substantive session (design decisions made, work completed, open questions raised), add a new dated entry at the top of the log below, in the format shown.
- Keep entries short — a few lines each. This is a pointer/recap layer, not a duplicate of the full spec. Detailed specs live in their own docs (`case-management-project-instructions.md`, `pi-case-playbooks.md`, `criminal-offense-playbooks.md`, etc.) — link to those rather than repeating their content here.
- Do not let this file grow unbounded — if it gets long, consider archiving older entries to a dated sub-file and keeping only the most recent months here.
- Each entry ends with two round-trip state lines so the Code handoff status is always visible at the top of the log: **"Staged for Code:"** (what this session prepared for a coding session) and **"Awaiting/Returned from Code, unreviewed:"** (what a coding session produced that the design space hasn't reviewed yet). Write "none" rather than omitting them. When a design session reviews returned material, the next entry clears it.
- **Design-side visibility rule (added 2026-07-25, BINDING for Code sessions):** design-side sessions (Fable/Opus in the Project space) only see what reaches them — they cannot read the local repo. At the end of every substantive Code session: (1) append the log entry here, (2) rewrite `BUILD-STATE.md` in full (the one-doc "what is built now" snapshot design sessions read first; template + hard rules in CLAUDE.md), (3) **push to origin and VERIFY the push landed** (confirm the remote ref moved — never report "pushed" from an unchecked command); if the push is blocked, say so explicitly in the session report so Michael can run it — and (4) remind Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude project"** (wording corrected 2026-07-25; the old "re-upload BUILD-STATE.md" instruction was never the mechanism).

---

## 2026-07-25 (APIL 2025 course-book mining, passes 2 and 3 — design space)

**What happened (text session, Opus 5):** Michael re-uploaded the 41st Annual Advanced Personal Injury Law course book (1,202 pp.) and directed the deepest available analysis. Pass 2 executed the pass-1 §9 plan in full: Kostura's subrogation/liens chapter (310 pp., the never-walked disbursement stage), the remainder of the appellate/preservation chapter including the Duncan/Simien business-records split, pre-suit investigation, the Rule 204 adverse-exam material, and the SCOTX update. Michael then asked whether a further pass was worth it; the answer given was yes but scoped — tax, insurance, the damages spine, and the appendix forms inventory — with the caveat that the project's bottleneck is now the ruling queue, not mining. Michael authorized the full pass ("do your best recommended pass or passes... don't skimp"). Pass 3 covered tax/double-tax, the insurance update, future damages, noneconomic damages post-Chohan, nuclear verdicts, the trucking-broker/telematics/§72.051 cluster, exemplary damages, the evidence chapter's damages section, the AI chapter, and Michael's own Tilley/tripartite chapter.

**The finding that changes the remaining work:** pass 1's article map was materially incomplete. Systematic detection of chapter title pages shows the book has **27 chapter-level articles, not 23** — four chapters totalling ~233 pages were never mapped: **Ch. 11 Products Liability (Bright, ~131 pp.)**, **Ch. 12 Jury Charge Update**, **Ch. 20 UM/UIM**, and **Ch. 23 Estate & Probate (~78 pp.)**. Three of the four bear directly on existing gates: Ch. 23 owns the PR-appointment gate, Ch. 20 sits under the UM/UIM consent-to-settle gate, and Ch. 11 is by the same author as the discovery-deficiency paper behind the parked submodule (H35). Pass 1's heat map also carried a false positive: the Specialization chapter's 14 "deadline" hits are board-exam application dates and carry nothing for the engine. Both errata are recorded in pass 3 §0 with a corrected full article map; pass 1 is annotated in place rather than rewritten.

**Substantive highlights (all UNVERIFIED, all unruled):** H21's missing service-diligence cite is likely *Tex. State Univ. v. Tanner*, 689 S.W.3d 292 (Tex. 2024), which also makes diligence **jurisdictional** against governmental defendants. The disbursement stage's threads **arm at intake, not at settlement** — Medicare constructive notice, the Medicaid 45-day attorney-notice duty, and the workers'-comp first-money rule all run from file-open, which is fresh evidence for the D3/H8 shared-substrate decision. The BCRC recovery chain is the most fully hard-clocked sequence in the project (65-day CPL, 30-day CPN with no procurement reduction on default, the SMART Act 120/65/3-day/11-business-day final-CP dance, 60-day demand with interest per 30-day period). Registry Entry 2 is gated by *Ortiz v. Nelapatla* (pet. granted 4/4/2025) and by an unresolved question whether the two 2021 *In re Allstate* opinions are the same case. Three findings bear on project architecture rather than doctrine: (1) a **single per-case limitations date is affirmatively misleading** — UM/UIM runs four years and survives the tortfeasor claim, and product statutes of repose run from first sale and can bar a claim before accrual; (2) ***Gregory v. Chohan* has no precedential value** as a plurality under *York*, yet is cited as binding by every case but one, which the registry schema cannot currently express; (3) Michael's own chapter carries **Ethics Op. 532** (no detailed billing to outside auditors without informed consent) and **Op. 533** (insurer guidelines cannot override independent judgment), both of which constrain automated reporting, benchmark pooling, and any multi-user deployment.

**Process note:** Claude had earlier recommended skipping Ch. 22 on the grounds that Michael wrote it. That recommendation was revised on reading — the doctrinal survey is indeed nothing new to the author, but the ethics-opinion material is a live constraint on features in scope. The Ch. 22 walkthrough is still the right capture mechanism, but now with a specific agenda rather than open-ended.

**Deliverables:** `apil-2025-course-book-mining-pass2.md` and `apil-2025-course-book-mining-pass3.md`. Register extended H1–H58 → **H1–H83** (H59–H67 in pass 2 §8; H68–H83 in pass 3 §10).

**Next:** **PASS 4** — priority 1 is closing the map gap (Ch. 11 remainder ~125 pp., Ch. 23.2 ~55 pp., Ch. 12), then the remaining playbook-level chapters, then the unread Kostura sections (FEHBA, FECA, the ERISA case-law body, choice of law, indemnification/release drafting), then the deliverable that ends the mining: a **consolidated registry-candidate table across all four passes** with provenance and precedential-status markers, ready for the sign-off queue. Read the book's own table of contents (PDF pp. 3–6) first — never read in any pass, and it would have caught the map gap. Carried: **D3/H8 still gates T1 and blocks every build**; registry entries 1–10 sign-off (Entry 1(c-3) qualified-LOP, Entry 4 fatal-defect conflict, Entry 2 now additionally gated by *Ortiz*); **FLP/CourtListener account + MCP connector setup — promo ends 2026-08-06, eleven days out, carried on six consecutive entries**; §10 decision list D1–D10; H21, H24–H27, H29, H30, H33, H35–H58 and the new H59–H83; the standing fold queue (captures e and f into `case-heartbeat-design.md` §8 — **unchanged by this session**); the session-1 heartbeat voice capture that never reached Code; `Go_Live_Gates` gates 1–5 verbatim.

**Staged for Code:** this session-log entry (append); `apil-2025-course-book-mining-pass2.md` (new file, source mining, all propositions unverified); `apil-2025-course-book-mining-pass3.md` (new file, same status); an **erratum banner inserted in place** in `apil-2025-course-book-mining-pass1.md`; and a **resume-point + register-range correction in place** in `case-heartbeat-design.md`. **No build items.**

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21 overnight audit) — still unreviewed; Outlook push Phase 1 — needs Michael's Entra setup and first-connect verification; prior Code-side entries.

## 2026-07-25 (Mixed voice/text, Opus 5: deposition no-dates ladder end to end; mediation walked in full; DCO ingester and software-wide audit log specified; expert-disclosure cadence ruled; Advanced PI Law 2025 course book ingested, pass 1 complete)

Design-side throughout. **Nothing entered the build queue** — D3/H8 still gates T1. Four blocks of territory closed and two new sub-modules named. Michael also uploaded the State Bar's 41st Annual Advanced Personal Injury Law course book (1,202 pp., 23 articles) with instructions to mine it across three further passes; pass 1 is complete and produced four findings that bear directly on rulings already made.

- **Deposition no-dates ladder [CONFIRMED — Michael's own enumeration].** First request → **"Second Request"** in the subject line → **"Third Request"** in the subject line → no response, and Michael notices the deposition himself, picking date, time, and place. **One week between each rung**; his words, *"more than generous."*
- **The labeled subject lines are Exhibit 1, not a nagging device [CONFIRMED — the session's best find].** The response to a motion to quash is boilerplate: recite the procedure, state that dates were requested and conferral attempted with no response, "see Exhibit 1" — and Exhibit 1 is those scheduling emails pulled into an exhibit. **The engine tags each email as exhibit-eligible at send**, not by hunting thread history when the quash lands. Michael: *"Yeah. It should tag them."* This is proof-in-the-record appearing on the **input** side — the thread quietly assembles proof of the counterparty's non-response the whole time it nags — and it settles a build-order question the same way the deficiency submodule did: the exhibit-assembly capability must exist or the alert degrades into "go do it by hand."
- **The ladder collapses under cutoff pressure but never to zero [CONFIRMED].** Out of runway, Michael skips to one urgent request naming the remaining time, then notices. He volunteered the constraint that matters: *"the local rule still there says you have to confer"* — the conferral obligation survives the rush. **The number of rungs flexes from three to one; "you asked before you noticed" never goes to zero.** Exhibit 1 gets thinner, but it exists.
- **Hearing-date conferral is a jurisdiction-flipped gate [CONFIRMED].** In courts with no rule Michael still confers but may choose not to; **in Bexar County the local rules require it**. Same action, requirement dialed from soft nudge to hard block. And the mechanism is general: *"those local rules are gonna be accessed from the court that's logged in for this case."* The deposition thread never learns about Bexar — it asks the local-rules layer. That makes the conferral gate reusable by any thread that files something needing a hearing, and creates a hard dependency on the local-rules layer being real and populated.
- **Mediation arms on scarcity, not readiness [CONFIRMED].** Good mediators book out, so the trigger is **taking the first deposition of the other side** — you reach for the date before you are ready, because the date is the scarce thing. Cadence, corrected mid-session to the second value: **every ~20 days** from that first depo until **six months before the mediation deadline**, where the gradient starts and intensifies, reaching *"super intense"* at **three months out** — which is the booking window itself. A mediator's scheduler saying *not booking that far yet* (his live 2027 example) is **a legitimate answer that leaves the thread open** — neither escalation fuel nor completion.
- **Manual escalate override [CONFIRMED].** Whenever Michael reports reaching out, the engine offers an escalate control — *"a button that I push or a box I click"* — that runs the thread hot regardless of the deadline. Counterpart to the deposition ramp's are-you-sure gate: that one overrides to **silence**, this one overrides to **loud**. The computed gradient is a default, never the boss.
- **Mediator roster — new named side project [CONFIRMED].** A full list of mediators, each carrying a **score** (good/bad, want/don't — scale undefined, H51) and **jurisdictions**. Outbound, the email pulls his **top-scored names for that area** without telling the other side they are ranked. Inbound, if they propose their own list, he scores it against the same roster and takes *"the best ones from that or the least worst."* A standing valuation working both directions, not a mail-merge.
- **Mediation completion chains into payment [CONFIRMED].** The date-chasing thread's completion condition is **mediator booked, date on the calendar** — and that arms a **payment thread** on a gradient running from booking date to mediation date, because the mediator must be paid **ahead of time**.
- **Post-mediation fan-out [CONFIRMED].** End-of-day debrief asks one question: did it settle? Yes → kill the thread. No → non-exclusive branches: **reschedule** (if yes and no date, remind every **10 days**); **mediator's proposal** (capture deadline *and* amount; if the amount is not known that day, follow up until it is, then log it to the settlement section as a proposal with its deadline); and **mediator's report** where the jurisdiction requires filing — a question the engine asks at **scheduling** time, arming a post-mediation reminder with its deadline.
- **The negotiations tab is a shared publishing surface [CONFIRMED, with a Claude extension].** Michael made this a condition of calling mediation walked. Settlement tab and negotiations tab are the same tab, name undecided (H49): the ledger of every move — his demand, their offers over time, now mediator's proposals — running up to settlement or trial verdict. **[PROPOSED]** multiple threads publish into it, giving it the same many-threads-one-record shape as D3/H8, so it must not be designed in isolation.
- **Level 3 is Level 2 with a trapdoor [CONFIRMED].** *"Level three is generally level two… the only difference is that we can change it by agreement."* Engine rule: **the DCO overrides Level 2; Level 2 fills every gap** — a Level 3 case is document-derived with rule-derived fallback. One system, not two.
- **DCO ingester — new named sub-module [CONFIRMED].** Michael named the real cost: knowing the deadlines is not the work, *"our time sink is having to get someone to find time to create all those calendar entries."* Drag-and-drop or upload, with manual entry retained as an option. Uploads may be clean PDFs or **weird scans requiring OCR**. **The attorney or paralegal must sign off before anything lands** — his stated reason being accountability, *"if something messed up, I could see who did it."* His review-screen specification, given in detail: **split screen, DCO on one half, extracted deadlines on the other, each positioned in line with the date it came from on the page**, so the reviewer runs straight down without clicking. *"It shouldn't be difficult. It should be very easy."* That spatial alignment is load-bearing — it drives verification cost toward zero on a clean document, which is what makes verification actually happen instead of blind-accept.
- **Software-wide audit log — new, Michael-initiated [CONFIRMED].** A log of **substantive** changes only, never every click, recording **who and when**, with an "of-substance" allow-list to be defined later (H47), and an explicit design constraint: *"I don't want this log to become so huge that it's unmanageable over time."* **[CLAUDE, connection Michael did not make]** the repo already holds a review-log recording case-record changes with old/new values; this is that feature promoted to software-wide, not a new invention. **[PROPOSED]** add the entity touched and whether the actor was a person or the engine; and tier retention so a permanent spine (classification changes, deadline edits, verification sign-offs, DCO approvals) survives while lower-value events roll off (H48). The DCO sign-off **is** an audit-log event, which makes these two pieces one piece.
- **Expert disclosure practice and cadence [CONFIRMED].** Michael serves one document titled **"194.2(b) and 195.5 Disclosures"** and designates whatever experts he can — usually treaters — at the initial disclosure deadline, because he generally knows his providers by filing. Historically defensive (no heartbeat, so early designation prevented forgetting), but he wants to keep it for a tactical reason: early disclosure can leave the defense complacent enough to blow their own deadline. Cadence: **every 30 days** from the disclosure deadline, asking whether disclosures need updating — and this **does not stop** when the ramp begins; both run concurrently, and killing it takes the **same two-click opt-out** as the deposition and mediation alerts. The designation ramp starts **soft at 120 days** before the expert-designation deadline (*expedite? do we need to retain someone?*) and reaches **red alert at 30 days** — red there rather than at the deadline because *"at thirty days before deadline, I still got time to make a bunch of moves."*
- **A trial-date move that recomputes the expert deadline is a LOUD event [CONFIRMED].** Filed as the legitimate batched cascade: one causal event, all consequences shown together. This is H28's move-your-date alarm with teeth — the trial date is not merely threatening the setting, it drags hard deadlines behind it via the two-hop derivation (expert deadline ← discovery-period end ← trial setting).

**Course book ingested.** Michael uploaded the State Bar's 41st Annual Advanced Personal Injury Law (2025) — 1,202 pp., 23 substantive articles, MCLE 174274303; he is chapter 22. Instruction: guide the remaining stages from it, flag unique ideas bearing on parts already walked, and loop three more times going deeper. **Pass 1 complete** — full structural read plus deep reads of five articles. Four findings bear on existing rulings: (1) ***In re Texan Millwork*** reads TRCP 199.3 to measure control **at noticing**, so the no-dates ladder silently assumes the deponent is theirs to produce and does nothing against a driver who has since quit — Rule 176 subpoena practice is the real path there; (2) the **corporate-rep protocol** (H39's other half) exists in the book off *In re Home Depot USA*, with the critical observation that **TRCP 199.2 sets no deadline for objecting to corp-rep topics** — the suggested 10-day/15–20-day intervals are practice-derived, not rule-derived, and the registry must mark them as such; (3) mediation is advised to be raised **soon after the answer**, earlier than the first-depo anchor ruled this session; (4) **Bexar gates trial on mediation** unless both sides agree not to. Plus the find with no current owner: **Gov't Code §52.046(a)(4)** keeps reporter's notes only **three years from the date taken**, and *Piotrowski v. Minns* denies a new trial to an appellant who let them lapse — a silent three-year fuse on the appellate record of any long-running case with an evidentiary pretrial hearing. **Every proposition from the book is an UNVERIFIED registry candidate**; a CLE paper is a secondary source and a model summarizing it is not verification.

**Process notes.** Claude opened the session asking what *arms* the deposition thread — a question capture e had already answered, where Michael rejected declared-intent arming outright. Claude checked capture e mid-session and retracted. **Root cause: `case-heartbeat-design.md` §8.12 still names "the discovery phase proper" as the resume point, two captures stale.** That is the second time the unfolded design doc has cost session time; the fold queue is not cosmetic. Separately, Michael corrected the process server's name — **Kelly Foland**, not "Follint," which is wrong in capture d and in `case-heartbeat-design.md` §8.10 and needs correcting in place. Michael also asked whether the session raised security concerns; answer given was no, with the standing posture restated (no real client data in the repo, PHI processing local by design, professional security review required before multi-user or live use). One item is recorded as proposed rather than settled deliberately: Claude argued the 30-day supplementation opt-out should be **dormant rather than dead** — waking on new records or testing, an expert's opinions changing, or the case crossing 30 days before trial — because supplementation is a continuing duty whose penalty is automatic exclusion, unlike the tactical opt-outs it resembles. **Michael did not respond. Logged as H50, OPEN. A future session must not treat either a hard kill or a dormancy model as decided.**

**Next:** **run PASS 2 of the course-book mining**, per §9 of the mining doc — Kostura's subrogation and liens chapter first (highest deadline density in the book, and it owns the disbursement stage, which has never been walked), then the remainder of the appellate/preservation chapter including the *Duncan*/*Simien* business-records split that bears on billing affidavits, then pre-suit investigation, then the Rule 204 adverse-exam material, then the SCOTX update. If Michael would rather rule than read, the alternates are the seven pass-1 questions (H52–H58) and the four unanswered forks from this session (H42–H45). Carried: **D3/H8 still gates T1 and blocks every build**, including the three sub-modules newly specified this session; registry entries 1–10 sign-off (Entry 1(c-3) qualified-LOP, Entry 4 fatal-defect conflict); **FLP/CourtListener account and MCP connector setup — promo ends 2026-08-06, now twelve days out and carried on five consecutive entries**; §10 decision list D1–D10; H21, H24–H27, H29, H30, H33, H35–H41; the session-1 heartbeat voice capture that never reached Code; `Go_Live_Gates` gates 1–5 verbatim.

**Staged for Code:** this session-log entry (append); `case-heartbeat-walkthrough-capture-2026-07-25f.md` (new file, RAW CAPTURE); `apil-2025-course-book-mining-pass1.md` (new file, source mining, all propositions unverified); and **one in-place correction — "Follint" → "Foland"** in capture d and `case-heartbeat-design.md` §8.10. **No build items.**

**Awaiting/Returned from Code, unreviewed:** the Outlook push slice (built, still never seen design-side); the standing fold queue — `case-heartbeat-design.md` §8.12 now lags captures e **and** f.

## 2026-07-25 (Voice walkthrough, Fable 5 → Opus 5: default-judgment thread end to end; post-judgment appellate clocks; no-answer fork closed both ways; discovery phase; deficiency engine parked; deposition timing model)

Continuation of the case-heartbeat walkthrough, picking up the branches that hang off answer-received. Four blocks of territory closed: the default-judgment thread with its post-judgment tail, the no-answer fork (H32), the discovery phase proper (§8.12), and the deposition timing model. Two long-open proposals (H28, H31) were ruled. One substantial sub-module was identified, scoped, and deliberately parked. The session ended mid-walkthrough at the deposition fork; Michael wanted to continue and paused only for this capture.

- **Rule 239a is a law-change item [CONFIRMED].** The May-2020 and March-2026 editions differ materially: 2020 requires the last known **mailing address** only with post-card notice; 2026 requires last known **email and mailing address** with clerk notice under Rule 21(f)(10), and changes "shall" to "must." Michael uploaded the 2020 edition first by mistake. **The registry uses the 2026 text.** Anything assuming a mailing-only 239a certificate is wrong.
- **The default packet is one step, not five [CONFIRMED — Michael's reframe].** The military affidavit and the 239a certificate are not sequential steps; they are documents that ride inside the motion. Packet: motion for default judgment (carrying the statement of unliquidated nature, already in Michael's standard PI form), proposed order, federal SCRA military affidavit (DoD database check plus sworn affidavit — kept as one item after Michael briefly split it and reversed), Rule 239a certificate, and notice of hearing on file. The thread does not die until every exhibit is in the file.
- **The engine's first default check is the ten-day gate, not the answer [CONFIRMED].** Rule 107(h) requires the return on file with the clerk ten days, exclusive of filing day and judgment day. If the gate is not met the thread does not offer default at all — it states the earliest permissible date. Rule 239's no-answer-and-no-appearance confirmation is a separate check, and anything that smells like an appearance gets flagged for Michael's eyeball rather than decided by the engine.
- **Damages close on a prove-up, not a filing [CONFIRMED].** Rule 243 unliquidated is the PI default. The engine asks one routing question early — "any liquidated damages here?" — and routes to Rule 241 if yes. **Parking-lot note:** when the heartbeat extends past PI into general civil, liquidated vs. unliquidated becomes a first-class branch rather than a routing question. Michael's February 2026 example: a couple out $20,000 on a check for goods never received.
- **The signed order is not the finish line [CONFIRMED].** Two clocks. Clock 1: TRAP 26.1 / TRCP 329b — 30 days for a motion for new trial or notice of appeal, an unruled MNT overruled by operation of law at 75, appeal stretching to 90. The case sits in a "signed, watching for attack" state. Clock 2: TRAP 30 — a non-participating defendant has six months for a restricted appeal, so the case drops to a quiet low-intensity watch from day 30 to the six-month line, then retires. That window is also where collection happens.
- **Registry behavior on TRAP 30 [CONFIRMED]:** count six months from signing, **then** roll a weekend or legal-holiday endpoint to the next business day — deadline engine, not eyeballed. Worked example computed this session: signed February 12, 2026 → deadline August 12, 2026, a Wednesday, no roll needed.
- **The front-end checklist is the restricted-appeal defense [CONFIRMED].** A restricted appeal is narrow — party, non-participation, filed within six months, and error apparent on the face of the record, with no new evidence. What sinks defaults is a record defect: bad service, a defective return, the return not on file the full ten days, or a damages award unsupported in an unliquidated case. Clean service, a proper return, the ten-day gate honored, and real prove-up evidence starve the appeal. The precondition checklist is therefore load-bearing, not ceremonial.
- **Abstract of judgment is offered, never auto-run [CONFIRMED],** in whatever county Michael believes the defendant has reachable property. Two Michael-controlled decision points: at day 30, "wait the thirty days out?"; at thirty-days-up, "keep waiting the full six months until it's buttoned up, or move now?" He decides each time on his confidence in the judgment. Active collection — writ of execution, post-judgment discovery, turnover order — was walked but not designed; Michael said "far enough."

**H32 is closed, both branches.** The moment the Rule 99(b) Monday passes with no answer, the engine surfaces a dead-simple binary: no answer's in, move for default or not. Yes opens the default thread above. **No opens a ten-day re-ask loop that does not die** — every ten days it returns, states how long the defendant has been in default counted from the answer date, and offers exactly two doors: close it out for good, or remind me in another ten days. The loop runs indefinitely until Michael actively picks "close out." The mechanism's whole point is making the number stare at him; silence never becomes the default. Michael flagged that a fuller flowchart might be worth building here later — parked, keep it simple for now.

**Two long-open proposals ruled.** Claude drifted toward affirmative defenses and counterclaims at answer-received; Michael corrected — the real touch is the opposing-counsel letter already specified at §8.11, so **H33 remains open and unresolved**. But two items did close. **H28 is RULED IN [CONFIRMED]:** the trial date is a second master clock alongside limitations, carrying a dedicated "they're trying to move your date" alarm that fires on any agreed continuance, reset notice, or defense motion threatening the setting. **H31 is RULED [CONFIRMED]:** the DCO thread runs *warm* — a low simmer keeping gentle pressure — until the DCO is filed in the record, then retires. H29 (letter content, form-engine dependency) is unchanged.

**The discovery phase (§8.12).** Initial disclosures under TRCP 194.2(a) are due 30 days after the first answer or appearance, automatic. Michael specified the cadence himself: a **daily soft reminder starting fifteen days out** that "shouldn't drone out, shouldn't layer on top of anything else that's more important, but should be something there that I see daily," **escalating to firmer at three days out.** The same day-fifteen nudge carries the instruction to get his discovery requests *drafted* — drafted, not sent — on the identical 15-to-3 escalation.

**Sequencing runs in two lanes, and one early question sets the tempo of the whole case [CONFIRMED].** The engine asks up front: standard-push, or hold-for-disclosures? In the **default hold lane**, Michael serves his own disclosures on the 30-day deadline but drafts his requests at day fifteen and then *holds* them until the defendant's disclosures are in hand — because those disclosures may produce new documents, which generate new questions, or a responsible-third-party designation, which opens a whole new line of inquiry. In the **low-energy lane** — classic MVC, clear facts, known minimum policy limits, known carrier, known defense counsel, "nothing artful about this" — discovery goes out immediately with everything else, because nothing in their disclosures will change the questions and speed is the entire strategy: faster requests, faster responses, faster defendant depo, force mediation, settle, client paid, Michael paid.

That fork produced the clearest statement of the product thesis so far, and it is worth pinning. Michael, on why the artful lane matters: *"So I don't have to spend time doing mundane tasks that could just be coded and run on themselves. And I can spend time actually doing art, legal art."* The fast lane is the machine running a case almost on rails; the artful lane is the machine clearing the runway so there is bandwidth to be creative where creativity moves outcomes. Same engine, two purposes.

**Discovery responses run opposite postures by direction [CONFIRMED], and this is strategic rather than administrative.** Incoming — their responses to his requests — runs a 30-day baseline, and Michael grants defense extensions almost as a matter of course, deliberately: *"just to garner goodwill in the future in the event that I need some sort of agreement from them. It's horse trading, if you will."* **The build consequence is the important half: granting an extension is a live recompute event.** Their response clock moves and everything hanging off it moves too — the deposition, the read-and-react window, mediation timing. The thread must *slide* the downstream markers, not merely note the extension. Outgoing — his responses to their requests — is the mirror image. He essentially never asks for extensions: *"I do not ever wanna be beholden to defense counsel... if I wanna stand firm in the future on a deadline, I don't want them to be able to come back and say, well, we gave you that extension that time."* His own clock is treated as rigid and fixed, and the engine pushes him to hit it clean. H30 (calendar horizon — he calendars two months out, should be marking five) was raised again and still has no build mechanism.

**The discovery-deficiency engine is its own buildout, parked by explicit ruling [CONFIRMED].** Michael brought in David Bright's 2025 State Bar paper, "Dealing With Objections to Written Discovery." Its value for the build is that it makes deficiency review nearly mechanical — not a judgment call per objection, but pattern-matching against a closed list of things that are flatly improper: General Objections preambles, boilerplate that never explains why *this* request is deficient, privilege objections in place of a privilege log, and "subject to and without waiving," plus TRCP 196.2(b)'s four permissible RFP responses (the anti-dribbling rule) and 215.1(c) treating evasive as no answer at all. The linchpin is **TRCP 193.2(e)** — a valid objection obscured by numerous unfounded ones is waived — which is what permits moving to overrule everything wholesale instead of litigating request by request. Bright's workflow is already thread-shaped: responses land, scan, meet-and-confer letter out immediately with a ten-day deadline (it doubles as the Rule 191.2 certificate predicate), no agreement, file the motion. **The ruling:** when responses land the thread scans against the closed list, flags findings, hands Michael a ready-to-review deliverable, and gives one-click access to pull up the actual responses. That needs document parsing plus a review interface, so it is a dedicated build, parked. **Hard hook, at Michael's explicit instruction: when that build starts, the thread must prompt him to pull Bright's paper back in — it is the substantive backbone and the build cannot start without re-ingesting it.** Claude offered to record where Bright's forms live; Michael declined — "I know where the document's at" — so no forms-location note.

**Depositions are a capability, not a stage [CONFIRMED].** Claude proposed a declared-intent model — Michael says he wants a depo, that arms a warm alert until it is noticed — and **Michael rejected it outright.** The rejection encodes the rule: deposition alerting is not armed by his declared intent, it is prompted by case events at fixed checkpoints. He enumerated three trigger points himself: **day one of the answer** (on MVCs the first opposing-counsel letter already requests defendant-driver depo dates), **off the disclosures** (which may identify people he did not know about), and **off the discovery responses** (which will likely identify more, gated behind actually getting the responses he wants — "whether they just give them to us, or they give them to us after we force them... after we go through the whole deficiency deal"). So the model is three checkpoints: at answer, a box asking whether to notice any depositions now — no means *resting*, not dead; at disclosures, the same prompt informed by any new names; and at discovery responses, the character changes into a **recurring follow-up roughly every ten days.**

**That third checkpoint runs a gradient, and its peak is deliberately not the discovery cutoff [CONFIRMED].** It opens "affirmative but soft — not like super soft, but affirmative, soft," and both frequency and intensity scale up as the deadline approaches. But Michael moved the peak: scheduling from notice to actually taking a deposition runs one to two months, and a depo taken outside the discovery period creates an evidentiary problem — *"maybe I wanna bring some impeachment evidence in that I did not produce. There's arguably... I might not be able to bring that in."* So **red alert lands roughly two months before the end of the discovery period, not at it.** The ramp climbs toward the buffered date. Past it, noticing is still possible but knowingly risky, so the thread should warn rather than nag — that last behavior is Claude's proposal, unruled.

**The ramp has an escape hatch with a confirmation gate [CONFIRMED].** At any point Michael can say no more depositions, but before the thread goes quiet a confirmation must fire — *"are you sure? I'm not gonna remind you again about this, and this is all up to you."* Only on confirm does the thread retire. This is the same anti-staleness instinct as the no-answer fork but a different mechanism: the no-answer fork uses an indefinite ten-day loop because the decision is deferrable; the deposition ramp uses a hard stop behind a gate because Michael has affirmatively decided the lever is spent. Worth treating the two as siblings in the primitives list rather than one pattern.

**Registry candidate logged at Michael's direction [CONFIRMED]:** the **deposition scheduling buffer**, default around two months, tunable, with his reasoning attached — it is the notice-to-taken lag, and blowing it risks losing unproduced impeachment evidence. Claude proposed the entry should carry a cite or practice-basis note rather than living as a bare number, since it gates a red alert with evidentiary stakes; unruled. Claude also guessed the underlying consequence maps to TRCP 193.6 and the Rule 190 discovery-period mechanics — **no rule text was pulled and no case was checked, so that is an unverified inference, not law** (H37).

**Process note — one item is being recorded as proposed rather than settled, deliberately.** Michael asked whether to build the deficiency submodule before the heartbeat layer that wraps it. Claude argued yes, on the ground that the heartbeat's job is to nag toward an action and die on the proof in the record, so if the action does not exist the alert degrades into "go do it manually" — which is exactly the mundane work being coded away. Michael's response was "okay, alright, let's move to depositions." That is acknowledgment plus a subject change, not a ruling, and Claude's follow-up question about recording the dependency was never answered. **Logged as H35, PROPOSED.** A future session must not treat the build order as decided.

**Next:** resume at **H39** — the deposition fork Claude raised and Michael never answered: walk the plain defendant-driver deposition, or the corporate-representative deposition with its own notice-and-objection protocol. Then carried items: D3/H8 (shared touch substrate) still gates T1 and blocks all builds; registry entries 1–10 sign-off (Entry 1(c-3) qualified-LOP, Entry 4 fatal-defect conflict); FLP/CourtListener account and MCP connector setup, promo ends 2026-08-06; BUILD-SESSION-NOTES.md review; §10 decision list D1–D10; H21, H24–H27, H29, H30, H33.

**Staged for Code:** this session-log entry (append) and `case-heartbeat-walkthrough-capture-2026-07-25e.md` (new file). **No build items** — D3/H8 still gates T1, and the deficiency submodule is parked pending H35. Do not fold confirmed rulings into `case-heartbeat-design.md` until the duplicate-routing check above is worked, since H28, H31, and H32 *close* items that doc currently carries as open.

**Awaiting/Returned from Code, unreviewed:** the Outlook push slice (built, never seen design-side). Design-side exports still outstanding from prior spec feedback: the session-1 heartbeat voice capture, which never reached Code, and Go_Live_Gates gates 1–5 verbatim.

---

## 2026-07-25 (Design-side walkthrough, voice + text, Fable 5: closed H14 service chase; per-defendant fan-out with difficulty profiles; service-completion gate; Rule 99(b) read; answer-received stage walked)

Continued the PI case-heartbeat walkthrough from the H14 resume point. Closed out the suit-filed /
service-chase stage in full, then walked the first litigation-spine stage past service. Nothing was
built and nothing entered the build queue. Output: one capture file plus fold-ins to the canonical
design doc.

- **Service-chase touch is a handoff, not a chase [CONFIRMED].** One process server, Kelly Follint
  (two email addresses). The touch is a single well-formed email: citation, petition, context for her
  downstream server. She is reliable, so silence means working-on-it, not blind — the thread stays
  quiet by default. Reliable end of the §3.4 communication-profile spectrum.
- **The rush flag is the thread's whole personality [CONFIRMED].** One field drives three axes at
  once: subject-line tone ("RUSH" in caps vs. a softer no-rush line), body content (seeded with the
  statute date), and follow-up cadence. Pre-fill it when limitations is inside a window — H23 doing
  real mechanical work. Michael noted the side benefit of conditioning Kelly to recognize the shape.
- **Cadence is a continuous gradient [CONFIRMED]:** ~2 weeks at no-rush, tightening to ~2 days at
  super-rush, scaling off the actual limitations date. The example date given in session was this
  week's real case and must not be hardcoded.
- **All escalation aims inward; the system never sends to a counterparty [CONFIRMED].** It drafts
  every follow-up; Michael sends in his own voice, so automated tone never lands wrong on a real
  person. Generalizes past Kelly into a standing principle. At the close end the nudge is not a nag —
  Michael's words, "a slap in the face" — because unserved-at-limitations voids the case.
- **Per-defendant fan-out [CONFIRMED]:** one handoff, N watched clocks. One email may list every
  defendant, but a separate return-of-service clock runs per defendant; the parent thread goes silent
  on the served and escalates only on whoever is still out.
- **Difficulty profile per defendant, set at filing, with a trapdoor [CONFIRMED].** Three buckets:
  registered-agent corporation (deterministic, known address, thread stays quiet); out-of-state or
  no-TX-registered-agent company (harder, alternate methods, runs warmer); individual (wildcard,
  starts normal, promoted to hard on a failed locate). Set at filing rather than easy-until-proven-hard
  because the corporate buckets are facts Michael looks up before serving, and limitations is ticking —
  discovering difficulty by stalling burns buffer that may not exist.
- **Limitations only bites on open threads [CONFIRMED],** with one exception: the peace-of-mind board.
- **Service-completion gate [CONFIRMED].** A defendant thread does not die on "served." It dies on
  three things: file-stamped return of service received, saved into the file system, and date of
  service logged. That date is legally loaded — it satisfies limitations, drives the Rule 99(b)
  computation, and on a governmental defendant carries the jurisdictional diligence record.

Michael raised the TRCP Rule 99(b) answer-date question; rule text was pulled from the deadline
skeleton rather than answered from memory. The read: 99(b) sets the answer date at 10:00 a.m. on the
Monday next after twenty days expire, so **every** answer date is a Monday by the rule's own terms —
day twenty landing on a weekend does not trigger the Monday, it merely coincides with what the rule
always does. Rule 4's generic computation is superseded here. The holiday-Monday edge was explicitly
deprioritized: rare enough that it never bites in practice, and Michael's habit of checking the
following Monday errs conservative. For the build: compute to the Monday, treat answer-received as a
soft check rather than an alarm, and do not burn tests on the edge case. Still needs its own tested
function — no generic date library computes it.

The answer-received stage turned out not to be a passive unlock but the starting gun on Michael's
central strategic lever: earliest possible trial date, then hold it and never move it, on the theory
that between equally prepared parties the one racing the clock wins and an early setting forces
settle-or-try. The touch is outreach to opposing counsel within three days of an answer, ideally same
day, via a form letter he ran at a prior firm and cannot run solo now. The letter requests trial dates
to agree a docket control order and get it filed, and on an MVC also requests defendant-driver
deposition dates — gated so no depo lands before the defendant's response window on the first set of
written discovery. Letter *content* is deferred by explicit ruling: it is a form-engine dependency to
be designed once the system is built and the full palette of dynamic data is visible.

The thread stays loud until the **DCO is filed** — not "letter sent," not "they replied." This is the
founding failure mode restated in a new stage: the intention is there, something else comes up, and it
silently falls off. Same proof-in-the-record completion pattern as the service return: the thread dies
on the filed artifact, not the action. Answer received separately arms the disclosure clocks (initial
disclosures 30 days after first appearance, TRCP 194.2(a) anchor per the skeleton).

Cross-cutting patterns surfaced: one flag as thread personality; system-drafts / human-sends to
counterparties; difficulty profile set at filing with a trapdoor; the peace-of-mind board as an
anti-list exception under a closing master clock (cousin of the H18 cascade exception); the
proof-in-the-record completion gate (family of primitive #14); continuous gradients over state
switches.

Side threads opened and left open: the no-answer fork (default judgment vs. grace and a phone call)
was asked and never answered — H32. Whether the thread should prompt work *on* the answer itself
(affirmative defenses, counterclaims, responsible-third-party designation) was asked and never
answered — H33. Alternate service methods for out-of-state companies were explicitly declined this
session. Two Claude proposals are recorded as unruled and must not be treated as design: trial date
as a second master clock with a "they're trying to move your date" alarm (H28), and the DCO thread
running warm rather than alive-but-quiet (H31). Michael also named a real workflow gap — he calendars
about two months out when cases need five (H30).

**Next:** next design session resumes at the **discovery phase proper** — initial disclosures, first
set of written discovery, their responses — then depositions, experts, mediation, trial prep. Carried:
D1–D10, with D3/H8 (shared touch substrate / one core case-event entity) still blocking T1 and needing
settlement before either module's schema is built; H24 registry candidate (file ≥6 months before
limitations) with H21's service-diligence cite alongside; H25 and H26; registry entries 1–10 sign-off
(Entry 1(c-3) qualified-LOP and Entry 4 fatal-defect conflict as priorities); Michael's FLP account and
MCP connector setup (promo ends 2026-08-06); BUILD-SESSION-NOTES.md review.

**Staged for Code:** `case-heartbeat-walkthrough-capture-2026-07-25d.md` (new file), plus fold-ins to
`case-heartbeat-design.md` §8 (suit-filed completed, answer-received added), §3 (cross-cutting
patterns), and §10 (open items H27–H34). No build items — nothing enters the queue until the affected
open items are ruled on.

**Awaiting/Returned from Code, unreviewed:** Outlook push slice (still unreviewed design-side);
BUILD-SESSION-NOTES.md.
*[Code-session routing note, 2026-07-25, added when this entry was applied: the work order's reconcile step found the design doc's suit-filed section did NOT yet exist — handoff "c" had deferred that fold-in to a design session, but design sessions cannot write to the repo — so §8.10 (suit filed / service chase) was built Code-side from captures c + d together, followed by §8.11 (answer received) and §8.12 (stages not yet walked). Register rows H23–H26 (from capture c) were added alongside H27–H34 for the same reason. Fold targets resolved by name per the work order's own §1 rule: cross-cutting patterns → §6 (primitives 17–26); open items → §11. Capture d placed at its canonical path. Nothing was built; nothing entered the build queue.]*

## 2026-07-25 (Voice/mixed, session 3, Fable 5: resumed heartbeat walkthrough at H14 suit-filed; limitations master clock + hard 6-month filing rule confirmed; pre-service arming chain walked; session cut mid-H14, resume point recorded)

Third session of the day on the case-heartbeat design. Processed the session-2 zip (design doc, capture "b", TRCP skeleton, handoff "b"), summarized back, then resumed the PI walkthrough at H14 (suit filed / service chase). Session ended early on system slowness; the service chase proper is still unwalked — precise resume point captured.

- **H23 — Limitations master clock [CONFIRMED]:** watched from day one at intake, not a suit-filed concern. Blowing it voids the case regardless of treatment status. At suit filed it becomes the modulator on service-chase urgency (limitations is met on SERVICE, not filing). Michael's explicit instruction: note for Code to consider in the system run-through; wire into both intake and suit-filed stages.
- **H24 — Hard rule, file ≥ 6 months before limitations [CONFIRMED]:** unconditional buffer regardless of how complete the defendant picture looks ("just leave it as a hard rule"). Three-part rationale: slow citation issuance (out of your hands); service takes time and limitations is met on service; the late-discovered defendant (his brakes example — you can't know the defendant list is closed). **Registry candidate, confirmed** — cite needed, attorney-only sign-off, rationale should note the buffer protects *naming* new defendants, not just serving known ones.
- **Pre-service arming chain [CONFIRMED]:** file petition (citation request sometimes simultaneous, sometimes later) → acceptance via e-filing email → request issuance → citation issues (same-day to three weeks; weekly follow-up until issued). Citation arrives by any of four channels (mail / clerk pickup / clerk email / e-file copy).
- **Clerk-relations constraint [CONFIRMED]:** never annoy the clerks — they remember, and future filings suffer. Escalation may get louder AT Michael but never pushes harder ON the clerk. Candidate primitive: counterparty institutional memory caps outward cadence while inward cadence stays free.
- **Declared vs detected at this stage [CONFIRMED]:** "did citation come in" is a human-remembering problem (Michael now, paralegal later); citation arrival is a DECLARED state. The ONE detection exception: the e-filing acceptance email (known sender) may auto-arm the next step.

New open items: **H25** (acceptance→citation chain — separate armed threads or one thread with checkpoints? asked, unanswered), **H26** (does limitations own its own backstop thread that can override quiet hours, or is it purely a modulator? proposed, redirected, unruled). H21 (service-diligence case-law cite) reinforced — H24's buffer is what protects that gap. H22 registry arithmetic grows by one.

Side note: Claude's two session-start observations remain pending Michael's response — (1) fold primitives #14/#15 into §3 before ruling D3; (2) H4+H20 may collapse into one ruling. Also unconfirmed whether Code applied the "b" artifacts.

**Next:** FIRST review synced session-log top entries (standing convention), then resume mid-H14 at the recorded resume point: (a) what a *touch* looks like once citation is in hand (process-server follow-up / checking court record for the return), then (b) per-defendant fan-out and rhythm, then (c) mechanics of how the limitations clock modulates the service ladder. Then continue the litigation spine. Carried: §10 rulings D1–D10 (D3/H8 blocks T1); registry sign-offs (entries 1–10 priorities unchanged, plus H24 candidate); FLP/MCP setup (promo ends 8/6); BUILD-SESSION-NOTES.md review.

**Staged for Code:** session-log entry (this); capture "c" → `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25c.md` (RAW CAPTURE, fold into design doc §8 suit-filed section, mid-stream flagged); H23 note for the system run-through. Nothing enters the build queue — no §10 rulings were made this session.

**Awaiting/Returned from Code, unreviewed:** Outlook push slice (carried); confirmation whether 2026-07-25b artifacts were applied; BUILD-SESSION-NOTES.md.

## 2026-07-25 (Session 2, mixed voice/text, Opus 5: case-heartbeat design doc written; PI walkthrough resumed and stages 6–9 walked; TRCP deadline skeleton extracted from the 2026-03-01 rules text)

**Design-side throughout. Nothing entered the build queue.** Three artifacts produced: the case-heartbeat design doc
(written from session 1's voice capture, then revised same-day to absorb this session's walkthrough), a walkthrough
capture, and a TRCP deadline skeleton of unverified registry candidates.

**The design doc now exists** at `docs/specs/case-heartbeat-design.md`, status **DESIGN-PARTIAL** — architecture
design-complete pending Michael's review of its §10 decision list, PI stage catalog covering stages 1 through 9, with
the litigation spine unwalked. Provenance is tagged throughout: **[C]** confirmed by Michael out loud, **[P]** proposed
and not objected to, **[D]** new in the document and never put to him. Design-side additions worth flagging: legally
consequential intervals must be registry entries rather than hardcoded constants (the deadline engine says *when*, the
heartbeat says *how hard to push before then*); the escalation ladder needed defining and in a solo configuration
resolves to channel-and-frequency only; the serializer needs a no-bulk-affordance rule, an outcome-required dismissal,
and an explicit queue-ordering policy; and gates-versus-clocks is a cry-wolf risk, not merely unmodeled.

**H6 RESOLVED [C]: declaring treatment complete opens the stage only.** Each provider's records-and-bills request is
triggered by hand. The declared-state judgment extends to the provider level — ripeness can be true for four providers
and false for a fifth still owing a visit note.

**New upstream interlock [C, raised by Michael unprompted]: the pre-completion surgical check.** Before treatment may be
marked complete, the system must prompt a check that the client is not potentially surgical — positive MRI findings
supporting a possible surgical recommendation block the declaration. His reasoning: a doctor's release and a client who
simply stops going both look identical to completion, and neither rules out surgery. **This points the opposite
direction from the rest of the subsystem** — everywhere else the fear is a case dying in silence; here it is a case
dying *prematurely*, rushed to demand while secretly worth many times more. Recorded as a new primitive: interlocks on
declared transitions, distinct from both gates (which block) and clocks (which nag).

**Stage 6, records collection [C].** Opening fork is the retrieval method, and it sets the *cadence*, not just the task:
self-sent requests get a **weekly** chase; a third-party retrieval vendor gets a **2.5–3 week supervisory check-in**,
because the vendor already runs its own follow-up machinery — Michael's job there is confirming the machinery turns, not
turning it. **Arrival is not the close**: records landing trips a verification gate with a four-point authenticability
checklist — legible copies; business-records affidavit page count matching the actual attachment (his example: affidavit
recites fifty-four pages, sixty-two attached, *"that's not gonna be authenticable"*); correct billing-affidavit amounts;
and both affidavits actually notarized. Only a declared QC pass closes the provider. A defect spawns a corrected-
affidavit loop at **two to three days** — hotter than the weekly chase, on the reasoning that a known problem in hand
outranks an unknown one still out in the world. Records versus billing: **CONFIRMED that the system asks** whether to
mark the records portion done and keep chasing billing, or hold the provider open; the coupled-thread-with-latent-split
default is **Claude's refinement and unaffirmed** (H15).

**Stage 7, demand drafted [C].** A completion-driven assembly thread with named sub-components — damages confirmed and
calculable with proofs in hand (requires Stage 6 closed), medical chronology, facts section, exhibits. The chronology is
a dependency fork: third-party paid software today, possibly an in-system feature later (H16). **The heartbeat stays
loud on a half-drafted demand [C, explicit]** — *"keep the heartbeat up on it"* — justified by the same logic as the
intake ruling: with the tools in place a demand is a twenty-to-twenty-five-minute sit-down. **The cheaper the system
makes the action, the more license it has to hound** is now confirmed independently at both ends of the lifecycle, and
this is the stage the whole subsystem was founded on.

**Stage 8, demand sent [C].** One action arms **three** touches, not the two previously recorded: a five-day check-in
(confirm receipt, confirm they have everything), a deliberate silence window, and the expiration backstop. Weekend rule:
if day five lands on a Saturday, Sunday, or holiday, roll **back** to the business day before, never forward. Demand
type sets the deadline unit — **third-party gets 15 calendar days, first-party gets 15 business days** — with an
identical check-in on both. Expiration branches three ways: an **offer** hands off to negotiation; a **"we need more
information" letter** splits into constant loud nagging on Michael to get the listed items out, then weekly follow-up on
their status; **total silence** triggers a **daily** reminder — the highest cadence anywhere in the system — carrying a
one-tap escape to turn it off and mark complete, *"because really, the next stage from there, if they're not responding
to me, is me filing a lawsuit."* That escape is P1 in its purest form: marking complete means *"I have decided to stop
demanding and start litigating,"* a recorded decision rather than neglect, and a clean declared transition into suit
filed.

**Stage 9, negotiation, is a PARALLEL TRACK, not a stage [C] — this reshapes the back half of the lifecycle.** Michael:
negotiation continues through suit, through discovery, through trial, *"we could be at trial… and the jury is in
deliberation. We're still in negotiation phase. There's always room to negotiate until the jury verdict comes out."* It
runs underneath the entire spine and closes only on settlement or verdict. **No prescribed workflow** — case by case,
and he declined to invent steps, so the design refuses to impose a cadence it hasn't been taught. The track carries
**last-touched plus the spread** (his correction: high demand from us against low offer from the carrier), and goes in
as an **explicit placeholder, empty on purpose**, seeded-not-closed so the structure is there when he cracks a real
negotiation workflow. It still gets a gentle pulse, because a live negotiation with no next-action is the easiest thread
to let rot (cadence unspecified, H17).

**TRCP extraction — Michael uploaded the rules text effective 2026-03-01 (370 pp.)**, noting local rules live in the
court and judge profiles rather than the rulebook. Extracted design-side into a skeleton of **unverified registry
candidates**; verification remains attorney-only (registry rule 2). Structural findings: **one anchor computes most of
the case** — initial disclosures fall 30 days after the first answer, and both the Level 1 and Level 2 discovery periods
begin there; **litigation dates are derived, never stored**, because Level 2's period ends at the earlier of 30 days
before trial or nine months after the anchor, with expert designations 90 and 60 days before that end, making a trial
setting a two-hop cascade; and **discovery level determines the source tier** — rule-derived at Levels 1–2,
document-derived at Level 3 from the DCO (live example: the Curry agreed DCO), local- and judge-derived from the court
profiles. **Rule 166a is restructured in this text** versus the pre-amendment scheme — response 21 days after the motion
is filed, reply 7 days after the response, hearing not set within 35 days of filing and required within 60 or 90 —
flagged as a current-practice risk independent of the build, and as the clearest possible demonstration of why intervals
are registry entries rather than anything recited from memory. Also noted: Rule 99(b)'s answer date is not service plus
twenty days but 10:00 a.m. on the Monday next after twenty days expire, needing its own tested function; Rule 4 carries
three different day-counting modes and requires a legal-holiday table; and **service diligence was deliberately not
drafted**, since the TRCP sets no service deadline and the consequence lives in case law (H21).

**One amendment to a settled design rule, proposed and unruled (H18).** "The list is the bug" acquires a narrow
exception: when a trial date moves and many deadlines shift, that is *one causal event with many consequences*, not a
pile of unrelated asks, so a single interruption showing what moved together is correct. Amended formulation: never a
pile of unrelated things; one event with many consequences is still one thing.

**Process notes.** The design doc was **revised mid-session rather than superseded**, folding in stages 6–9 and the
surgical interlock so it would not reach the repo already stale — that fold-in-rather-than-branch pattern is the
intended one for future walkthrough blocks. Manual filing of the skeleton was declined in favor of this handoff, so Code
can run the duplicate-routing check against real repo state rather than the design side's lagging view. The skeleton is
named by **rules edition, not session date**, because the next Supreme Court order supersedes rather than amends it.

**Next:** resume the PI walkthrough at **H14 — the service chase at suit filed** (what a touch is, the per-defendant
rhythm, and escalation on an unserved defendant), then continue through the litigation spine, folding results back into
§8 of the design doc. Rule on the design doc's §10 decision list, where **D3 (shared touch substrate with the time
tracker) blocks T1** and should be settled before either module's schema is built. Return to the time-tracker fee-basis
draft (§3 schema-ownership call, D1–D4). Carried: registry entries 1–10 (Entry 1 qualified-LOP, Entry 4 fatal-defect
conflict as priorities) plus the nine from the fee-basis draft plus the TRCP candidates — the queue arithmetic itself
needs a decision (H22); edge-function deploys per `docs/statute-cache-setup.md`; Citizens MRF path into CLAUDE.md; OAA
remaining tabs; FLP account + MCP connector setup (promo ends 8/6); `BUILD-SESSION-NOTES.md` review.

**Staged for Code:** none — this session produced no build work. All three artifacts are design-side documents to be
filed, not built from. Nothing enters the queue until Michael rules on the design doc's §10.

**Awaiting/Returned from Code, unreviewed:** the time-tracker fee-basis-profiles DRAFT (still unadopted — review opened
2026-07-25 session 1, deferred, and not resumed this session); everything previously listed.

## 2026-07-25 (second handoff APPLIED: sync-scope recorded + audit triage built — Code session)

**What happened:** Applied `HANDOFF-2026-07-25b-sync-scope-and-audit-triage.md`. Repo was exactly at the expected `7ff8860`, clean. Per the handoff's own instruction, verified before building — **much of Part 2 already existed** in the tree; the audit predates four days of building. Already done, not re-implemented: Item F entirely (case/party list rows have real links on the name cell with middle-click/keyboard reach; the "Not yet filled in" footer is already behind a `<details>` disclosure; "Show closed" already runs through `isClosedStatus()`; the case Parties tab and party detail page already use bulk `getParties`/`getCases`); Item D's mechanism + the three named offenders (`itemLabel` exists on priorInjuries → "prior injury", priorProviders → "provider", priorCriminal → "prior charge"); Item B's flag-editing half (PI overlay flags, commercial-policy, representation type were already editable on the Overview edit form); Item A entirely (built at `3b2b19e` as Item 4 of the first handoff: version-bump reseed migrates imported schedules + confirmed runs + result lines forward, backs up the whole old store to a versioned localStorage key, and records a review-log entry naming what carried and where the backup lives).

**Built this session:**
- **Item B (the missing half):** practice area + case type now editable on the Overview edit form (case type must be re-picked when the practice area changes — Save disabled until then); conditional flag sections follow the draft; classification/flag changes write a `case_record` review-log entry (old/new JSON) and surface a "playbooks may need re-evaluation" notice — the notice half of the handoff's fallback, since the playbook engine itself is not built. Verified live: flag added mid-case → badge, review-log entry, notice.
- **Item C:** ladders now declared per case type in `CASE_TYPE_DEFS` (`src/domain/caseTypes.ts`); `statusesFor()` throws on an undeclared type instead of falling through to the criminal ladder; the case Overview surfaces an "Unknown case type" warning for stored records with undeclared types instead of crashing. Probate companion still declares the PI ladder with the spec-feedback note. 3 new tests.
- **Item D (remainder):** explicit `itemLabel` added to the four repeating fields still relying on naive singularization (priorFalls, locations, priorChallenges — the one that actually broke ("+ Add prior challenges / exclusion") — and filingProfiles).
- **Item E:** shared `assertPartyPatchKeys` guard in `adapter.ts`; BOTH adapters now throw on a patch key outside displayName/fields instead of local applying it and Supabase silently dropping it. (The interface type was already narrowed to the two keys; this closes the runtime half.)
- **Part 1:** sync-scope ruling recorded in CLAUDE.md verbatim, appended to the design-side visibility conventions.

**Answer to the design-side question:** **yes, case-detail tabs are URL-driven** — `/cases/:id/{parties|medical|calendar|transcripts}` are real routes (`App.tsx`), the tab is derived from the path, and the code comments the "+ New party" return trip as the reason. The audit's return-to-Overview complaint is fixed; do not rebuild.

**Health:** 186 vitest tests green (3 new), build + oxlint clean; classification editing exercised live in the browser.

**Deferred per the handoff:** bulk-fetch work (already done anyway); Item A's remaining nuance for design: attorney-created **code mappings** (chargemaster memory) and **generated documents** do NOT carry across a reseed — the handoff scoped migration to schedules + confirmed runs, so this is flagged as a question, not built.

**Staged for Code:** none — Part 2 fully dispatched.

**Awaiting/Returned from Code, unreviewed:** this build (Items B/C/D/E + sync-scope amendment); the time-tracker fee-basis profiles DRAFT design doc; the Outlook push slice. (`BUILD-SESSION-NOTES.md` cleared per the triage — not carried forward.)

## 2026-07-25 (design session: BUILD-SESSION-NOTES triage + sync-scope ruling)

**BUILD-SESSION-NOTES.md reviewed** — first review since it was written 2026-07-21, after carrying "still unreviewed" on the state line of roughly seven consecutive entries. Triaged: five items closed as already done or withdrawn; six carried forward (Part 2 of the handoff). **Cleared from the Awaiting/Returned line — do not carry forward again.**

**Elevated:** audit item 2 (case classification frozen at creation) is now the top still-open item from that document. Rationale: the PI playbook engine opens off case type + overlay flags and the deadline engine takes its clocks from the playbooks, so a flag that can't be set mid-case means the playbook never opens and its deadlines never calendar — a silent failure.

**Reframed:** audit item 8 (localStorage version/migration) and the reseed-wipe defect from the first 07-25 handoff are the same item at two stages. The version number shipped; the migration path didn't, which is why the v7→v9 bump destroyed the imported PFS schedule and the confirmed AnalysisRuns. The ask is finishing item 8.

**Sync-scope ruling (settled):** the specs-only trim proposed by the prior Code session is rejected as too deep. Sync carries `src/`, `db/schema.sql`, `docs/`, `CLAUDE.md`, `README.md`; excludes `package-lock.json`, `node_modules/`, `dist/`, and large test-fixture data files. Rationale: BUILD-STATE.md is a self-certified summary, and source visibility is what makes it auditable — three logged incidents (07-23, 07-24, 07-25 gate 8) all trace to design-side asking for work that already existed. Recorded in CLAUDE.md.

**Staged for Code:** Part 2 items A–F; the CLAUDE.md sync-scope amendment. (Applied by the Code session logged above.)

**Awaiting/Returned from Code, unreviewed:** the time-tracker fee-basis profiles DRAFT design doc (authored Code-side, design space has not reviewed it); the Outlook push slice.

## 2026-07-25 (medical-walkthrough handoff APPLIED: schedule-selection defect + gates routed — Code session)

**What happened:** Applied the full 2026-07-25 design handoff (`HANDOFF-2026-07-25-medical-walkthrough.md`), Items 0–8. Repo had moved two metadata-only commits past the handoff's expected `9dc280f` — reconciled, no conflicts.

- **Item 3 (HIGH) fixed in `src/analysis/benchmark.ts`:** root cause confirmed — rate lookup was first-schedule-wins over ALL loaded rates, and demo seeds first. Now: attorney can pick the schedule per run (new selector on the Benchmark analysis card); auto mode excludes demo rates entirely whenever any non-demo schedule has rates. Every run stamps a `scheduleSelection` block (mode, used schedule ids + names, `demoUsed`) in its assumptions. Stale-marking untouched (regression target 2).
- **Gate-8 visibility:** report headline now names the benchmark schedule; a boxed PLACEHOLDER banner appears in the report, the bill workspace, and as a badge on Medical-tab/workspace run rows whenever a ratio priced against a `demo`-source schedule.
- **Item 4:** store reseed no longer silently destroys work — on version bump the whole old store is backed up to a versioned localStorage key, and imported (non-demo) schedules + rates + confirmed runs + their result lines carry forward; demo schedule is NOT re-seeded when a real schedule was carried. A review-log entry records the migration. (No version bump this session — Michael's current v9 store is untouched.)
- **Item 5:** report now discloses "N lines / $X in billed charges excluded" bolded, directly under the headline ratio.
- **Item 6:** registry stamps carry an `implicated` flag (driven off claimType, billType, emergency-care signals: 045x revenue codes, 9928x E/M codes, EMERG descriptions); the report splits "Implicated by this analysis" from "General background". The always-on "No unverified rule drives any computed legal outcome" line is unchanged. ProCare/Central Texas pair encoded as regression tests.
- **Items 7, 8:** "Caption" → "Style" on the case Overview card (display + edit; data model field unchanged); scenario-vs-confirmed inversion explained in the workspace explainer and the report's scenario line.
- **Items 0–1:** `docs/specs/Go_Live_Gates.md` created with gates 6–8 verbatim + the gate-3 amendment staged — **gates 1–5 exist only in project knowledge and never reached Code; placeholder + spec-feedback entry filed for a design-side export.**
- **Item 2:** CLAUDE.md end-of-session routine now requires verifying the push landed and stating the SHA; reminder wording corrected to "Pushed at `<sha>` — click Sync now on the repo in the Claude project" (here and in this file's header rule).
- **Tests:** new `src/analysis/__tests__/benchmark.test.ts` (6 tests: shadowing fix, attorney selection, demoUsed flag, unanalyzed dollars, ProCare/CTRMC registry pair). Full suite 183 passing; build + oxlint clean. CLAUDE.md's stale "no test runner" line corrected (vitest was added with the routing/OAA slices).

**Staged for Code:** none — Items 0–8 all applied this session.

**Awaiting/Returned from Code, unreviewed:** this build (Items 0–8 above; design should eyeball the implicated-rule mapping in `benchmark.ts` and the Go_Live_Gates placeholder); the gates 1–5 export request in spec-feedback; the Outlook push slice (still unreviewed design-side, carried).

## 2026-07-25 (design-side Medical-tab walkthrough — Garcia case, demo mode)

**What happened:** First full attorney walkthrough of the billing module against the **real** TX Rest-of-State PFS data. Michael re-imported the schedule (7,740 codes, Novitas 04412 / locality 99) after discovering the 07-23 import had been wiped by the v7→v9 demo-store reseed. Spot-check validated: 99203 = $114.05, matching the CMS look-up for locality 0441299.

**ProCare bill (Type 1, professional chiropractic).** Ran the full loop: line-item review → coding confirmation → Set CPT on the unmapped traction line (`97012`) → re-run → confirm run → generate report. Final confirmed ratio **3.98×** ($1,280.00 billed vs $321.56 benchmark across 5 confirmed lines), 5/0/0. Report math verified line by line design-side. Per-line inflation is non-uniform and legally more useful than the headline: office visit 3.07×, therapeutic exercise 3.35×, manipulation 7.09×, traction 10.34× — the E/M is billed near market and the modalities carry the multiple.

**Central Texas Regional bill (Type 2, facility/UB-04, ER visit).** Confirmed **21.77×**, scenario 18.83×. The **facility hard caveat fired as designed**, boxed under the headline. Number is not a finding — both lines would price under OPPS/APC, not the PFS, so the professional-schedule comparison is doubly inapt. Phase 2 MRF remains the fix. Type 2 reconciliation clean ($4,120 − $1,150 − $2,120 = $850).

**Defects found (staged for Code):** (1) HIGH — engine selected the seeded DEMO schedule over the real import on every coded line, fabricating a 3.23× headline; the error biased *toward* flattering the bill. (2) Store reseed silently destroyed the imported schedule and confirmed AnalysisRuns. (3) Uncoded lines drop out of the ratio with no dollar disclosure. (4) Reports stamp all nine registry entries regardless of relevance — ProCare/Central Texas are the before/after test pair. (5) "Caption" → "Style" on Overview. (6) Explainer note on scenario-vs-confirmed ratio inversion.

**Design-side correction logged:** an earlier draft of go-live gate 8 asked Code to build AnalysisRun schedule provenance. Provenance already exists per line in the report cites. Gate 8 was narrowed to schedule *selection*, headline visibility, and reseed survival.

**Go-Live Gates:** `Go_Live_Gates.md` identified as design-space-only and never folded into the repo; routed to `docs/specs/Go_Live_Gates.md`. New gates 6 (authentication — hard prerequisite to gate 3), 7 (document storage + EOB source-document pin), 8 (fee-schedule selection/visibility) appended.

**Convention:** end-of-session routine now requires verifying the push landed and reporting the SHA; the sync reminder wording corrected from "re-upload BUILD-STATE.md" to "click Sync now on the repo in the Claude project."

**Next:** registry entries 1–10 sign-off remains Michael's homework and is the last thing between these reports and something leanable. Supabase auth decision is on the critical path. Outlook push slice still unreviewed design-side.

**Staged for Code:** Items 0–8 of `HANDOFF-2026-07-25-medical-walkthrough.md` (applied by the Code session logged above).

**Awaiting/Returned from Code, unreviewed:** the Outlook push slice (referenced in the 07-23/07-24 logs, never seen design-side).

## 2026-07-25 (sync-channel diagnosis: project knowledge is a stale, over-broad GitHub sync — same Code session)

**What happened:** Design ran three definitive checks after the four-file surgery: no BUILD-STATE.md content indexed (verbatim-heading queries missed), CLAUDE.md still pre-`5087899`, newest visible session-log entry 07-22 — while RAW SOURCE FILES (`src/data/supabaseAdapter.ts`, `src/domain/partyRegistry.ts`, `package-lock.json`) surface in its searches. Code-side reading: all commits through `82d88b1` are confirmed on origin, so the gap is between GitHub and project knowledge — the evidence fits a wholesale repo sync that (a) snapshotted days ago and hasn't refreshed, and (b) includes junk (`package-lock.json` is pure token cost). **For Michael, in the claude.ai project's knowledge settings:** check what the GitHub source includes and when it last synced; trim it to `docs/specs/*` + `CLAUDE.md` + `README.md` (drop `src/`, lockfiles); force a re-sync, or fall back to manually uploading the four files. Interim unblock: BUILD-STATE.md was pasted verbatim into the Code chat for Michael to relay. Push discipline was never the problem this round — the repo side of the bridge works; the knowledge-side refresh is the broken half.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** unchanged (the four re-upload files).

## 2026-07-25 (design-side follow-up: status claims stripped from master spec + README — Code session)

**What happened:** Design side reviewed the BUILD-STATE bridge and found the two remaining places build status could drift: the master spec (`case-management-project-instructions.md` — §5's "v0.1 BUILT AND DELIVERED / Remaining" blocks, §6's "Built so far", the open-action-items entry) and `README.md` (v0.1 title/framing, stale "next slices" list). Same surgery applied to both, **at design's explicit direction** (the one authorized exception to the never-edit-specs-Code-side rule; design-side claims like FULLY SPECIFIED / decisions resolved were left untouched — the master spec still owns what is DESIGNED). A PRECEDENCE note now sits at the top of the master spec: master spec = authoritative for designed; BUILD-STATE.md = authoritative for built. Note the flow reversal this creates: the repo copy of the master spec now LEADS the project-knowledge original until Michael re-uploads — do not "refresh" it from project knowledge in the meantime or the surgery gets undone.

**Michael's re-upload list (four files, each REPLACING its project-knowledge copy):** `BUILD-STATE.md`, `CLAUDE.md`, `case-management-project-instructions.md`, `README.md`.

**Also confirmed for design:** no live data has ever entered the app; both edge functions undeployed — the Supabase Pro gate has not tripped.

**Next:** unchanged carried items (time-tracker §8/§7, edge-function deploys, Entra registration, MRF path, registry sign-offs; OAA remaining tabs).

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** the four re-upload files above; design should confirm the master-spec surgery matches its intent once the re-upload lands.

## 2026-07-25 (build-state bridge: template adoption + CLAUDE.md single-source status — Code session)

**What happened:** Michael's `PROMPT-build-state-bridge.md` processed. Prompt-lag reconciliation first, per standing practice: the entry below shows this same date's earlier session had already invented the snapshot (`build-state.md`, prose form) and the push convention — so nothing was rebuilt. Instead the existing snapshot was **converged to the prompt's stricter spec**: renamed `BUILD-STATE.md`; mechanical template (screens live / case-tab status table / data layer / **Known stubs & fakes** / git-log deltas / max-5 design-side asks); 120-line cap; overwrite-in-full, never append. CLAUDE.md de-duplicated: the build-sequence section's per-item built/awaiting claims stripped (order + do-not-start gates kept); status now has ONE source of truth, BUILD-STATE.md. Convention extended: refresh commits as `chore: refresh BUILD-STATE`; Michael gets a one-line reminder to re-upload the file to project knowledge (REPLACING the old build-state copy, not duplicating); stale design-side assumptions get corrected in BUILD-STATE.md itself, never only in chat.

**Next:** unchanged carried items — time-tracker §8/§7 rulings, the two edge-function deploys, Entra app registration, Citizens MRF path, registry sign-offs; OAA remaining tabs.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** `BUILD-STATE.md` (template form) — for Michael to re-upload to project knowledge as the replacement for the old build-state artifact.

## 2026-07-25 (design-side visibility fix: build-state.md + push convention — same Code session)

**What happened:** Michael reported the design side (Opus 5 today) doesn't know the software's current state — it works from the synced spec docs + session log. Root cause found Code-side: the design side's last confirmed repo view was `bf89eca` (7/24 afternoon), **32 commits behind** — everything since (statute tracking T1–T4, OAA real-order tuning, browse UX, today's work) was committed locally but the session's push had been blocked, and there was no compact "what is built now" doc even when the log did sync.

**Fix, three parts:** (1) **`build-state.md`** — new one-doc snapshot of what the software actually does, written for design-side consumption, refreshed at the end of every substantive Code session (now a stated exception to spec read-only in CLAUDE.md); (2) **binding end-of-session rule** added to this log's header and CLAUDE.md's working style: log entry + build-state refresh + **push to origin**, with any blocked push reported to Michael explicitly; (3) this session's backlog pushed.

**For design-side sessions reading this:** start with `build-state.md`, then the entries above it in this log. If build-state's "As of" commit looks old, the repo is ahead of your view — ask Michael for a fresh sync rather than assuming.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus build-state.md itself.

## 2026-07-25 (two prompts processed: statute deltas built, time-tracker design drafted, Citizens handoff routed — Code session)

**What happened:** Michael dropped two documents — the 2026-07-25 session prompt (statute-tracking finish + time-tracker design pass) and the Citizens-negotiation handoff. Reconciled against the repo first, per standing practice:

- **Prompt-lag collision (expected pattern):** the session prompt's Item 1d stages T1/T2/T3 as "push-ready slices" — but T1–T4 were all built earlier this same date (through `6a1c9ba`). Only the genuinely new deltas were acted on; nothing was rebuilt. Its "supporting deliverables" (`getSessionList` fixture, `Go_Live_Gates`) never arrived in any handoff and don't exist in the repo — likely mooted by the builds, for design-side confirmation.
- **A4 `section-removed` BUILT (the one new code delta):** a refreshed chapter that no longer contains a pinned section now raises the distinct, more urgent `section-removed` flag (repeal/renumbering, e.g. CCP art. 55A recodification); a chapter that failed to refresh still proves nothing and raises nothing. Re-verify clears both A4 kinds; worklist lists removed-section rules first; schema check-constraint upgraded idempotently. **Verified live in demo mode full-loop** (pin → simulated repeal → refresh raises → worklist "Due now" + rule-row ⚠ + Re-verify clears, attributed); demo state restored after the walkthrough; no console errors. **177 tests green (7 new).**
- **A2 normalization delta:** already true in the built code (hashes run over normalized extracted text, not raw HTML) — design doc now says so explicitly. Design doc also got the A4 addition, the canonical-path status line, and the §6 flag-kind update. **Spec-feedback filed:** the repo's design-doc snapshot lags the project-knowledge version (O1–O4 resolutions in-doc, W1, B4 hardening) — export a refreshed snapshot next time the design space touches it.
- **Item 2 — time-tracker fee-basis profiles:** design pass drafted as `time-tracker-fee-basis-profiles-design.md` — **DRAFT, not canonical**: executed in a Code session at Michael's direction, needs design-space review. Profile structure over uniform capture; *Chapa* segregation moved into the SCHEMA (claims table + multi-tag join, single-claim cases auto-tag); per-profile warnings (advisory, never blocking) and exports (mid-case affidavit readiness, ch. 28 interest placeholder); §8 decisions D1–D4/O1–O3 and §7's nine registry entries — **all UNVERIFIED, for Michael's sign-off one at a time.** Nothing enters the build queue until he rules.
- **Citizens handoff routed** (duplicate-routing check clean): log entry below, two Phase 2 additions into the billing synthesis spec, postscript onto the dry-run doc.
- Tooling: vite now honors an assigned PORT (parallel Claude sessions); second launch config `dev-b`.

**Next:** Michael's review of the time-tracker draft (§8 + §7 sign-offs); the carried items (edge-function deploys per `docs/statute-cache-setup.md`, Citizens MRF path into CLAUDE.md, registry entries 1–10); OAA remaining tabs.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this session — especially the time-tracker DRAFT design doc, which the design space has not seen.

## 2026-07-25 (Design session, Fable 5: Citizens negotiation resolved; two Phase 2 spec additions staged)

**Real-world event (closed):** The Citizens Medical Center account (V00505135029, DOS 02/03–02/04/26, $8,975.00 billed, BCBS Commercial PPO) — the account that originally sparked the billing module — was settled by Michael this session. Sequence:

1. An earlier Claude-generated analysis (`BCBS_Reimbursement_Analysis.pdf`, pre-module) had been emailed to Citizens. It priced the **facility** bill against a **professional** fee schedule (BCBS 2026 Other Codes Fee Schedule), producing an indefensibly low headline of 4.1%–5.0% of billed ($367.83–$449.29). Wrong-schedule error; would not have survived contact with Citizens' own published MRF rates.
2. Citizens' billing manager responded that BCBS reimbursement would be ≈ **$4,392.55**. Design-side reverse-engineering: $4,392.55 = **48.94% of $8,975** — almost certainly the ~49% **inpatient percent-of-billed** methodology applied to what is an **outpatient** ER visit. Under the correct outpatient contract fee schedule (per `docs/specs/citizens-mrf-dry-run.md`), just CT head 70450 ($487.55) + BNP 83880 ($135.05) + 2× troponin 84484 ($42.90 ea) + Level-5 ED 99285 ($3,800, above-gross) ≈ **$4,508**, with CT thorax and 4 other lines still unpriced — i.e., honest outpatient pricing likely EXCEEDS $4,392.55. ED level confirmed as 99285 (bill's $1,410 ED gross exactly matches the 99285 chargemaster line; L3 $624 / L4 $983).
3. **Decision (Michael):** Do not contest the figure. Offered Citizens **$5,000 full-and-final** on the account — above their own BCBS number (easy yes), covers the collections firm's interest, client saves ~$4,000 vs. billed. Offer drafted and sent by Michael this session. Advice on record: obtain written full-and-final satisfaction so neither hospital nor collections firm can pursue a balance.

**Lessons driving spec changes:** The wrong-schedule error (professional vs. facility, inpatient vs. outpatient methodology, plan-level rate variance $103–$488 for the same CT across BCBS-family plans) is exactly the failure class Phase 2 must prevent. Two spec additions staged (routed on arrival — see the Code entry above this one).

**Model logistics (design-side, FYI only):** Claude Opus 5 released 2026-07-24 (near-Fable at half price). New standing convention in design-space memory: Fable sessions proactively flag Opus-5-suitable work to conserve Fable tokens; work completed on Opus 5 stands without Fable re-review. No repo impact.

**Staged for Code:**
- Two Phase 2 additions to the billing synthesis spec (insurance-card capture; missing-dataset/no-silent-guess guardrail) → fold into `docs/specs/medical-billing-analysis-module-synthesis.md`.
- Citizens negotiation outcome note → append to `docs/specs/citizens-mrf-dry-run.md` as a real-world validation postscript.

**Awaiting / Returned from Code, unreviewed:**
- "Outlook push slice" — exists per Code report, still not seen design-side.
- BUILD-SESSION-NOTES.md — review still pending design-side.
- Repo last known ~6 commits ahead of design-side view (through bf89eca per last report); design-side statements about build status remain provisional until next log sync.

**Still open (carried):**
- Michael's FLP account + MCP connector setup (promo ends 8/6).
- Registry entries 1–10 sign-off (priorities: Entry 1(c-3) qualified-LOP; Entry 4 fatal-defect conflict). Registry item #6 (attested v3.0.0 file with empty median columns vs. upgraded MRF requirements) bears directly on the compliance-leverage argument — reserve for a Fable session.
- Record Citizens MRF fixture local path in `CLAUDE.md`.

## 2026-07-25 (statute browse UX: cascading picker + title keyword search — Michael feedback, same Code session)

**What happened:** Michael's first hands-on feedback on the Statutes page: the free-text cite box demands formatting he shouldn't have to know. He asked for (a) a dropdown flow — code first, then chapters populate — and (b) keyword search over the titles of the code's parts. Built both this sitting:

- **Discovery:** the .gov SPA's tree data comes from a JSON API on the SAME backing host as the chapter files — `tcss.legis.texas.gov/api/StatuteCode/GetTopLevelHeadings/…` (the /Docs/*.toc.htm files are gone; every one now returns the SPA shell). Full title→subtitle→chapter hierarchy with names. Filed here as the record; consistent with the SPA spec-feedback item.
- **TOC fixtures:** `scripts/build-toc-fixtures.mjs` (committed; rerun biennially with the cache refresh) pulls the headings API for the twelve working-set codes → compact JSON under `src/statutes/fixtures/toc/` (~376 KB total, lazy-loaded per code; 81–493 chapters per code, real data, public domain).
- **"Find a statute" card** (replaces the bare cite box, which stays as the third option): (1) **Browse** — code dropdown (working set) → chapter dropdown grouped by TITLE/SUBTITLE with chapter names → Open; non-fixture chapters in demo mode degrade to a clear message + official-site link. (2) **Keyword search** — chapter titles across all twelve codes plus section HEADINGS within cached chapters (labeled as such), live as you type. (3) exact cite.
- **Bug caught by walking Michael's own example:** "hospital lien" found nothing against "HOSPITAL AND EMERGENCY MEDICAL SERVICES LIENS" — substring search replaced with all-words matching; regression test pins it.
- **Verified live:** FA → 81 grouped chapters → Ch. 153 opens (demo fallback message + source link, correct); "hospital lien" → PR Ch. 55; "exemplary" → three CP §41 section hits deep-linking into the viewer. 170 tests green. No console errors.

**Design-space note:** subchapter-level browse (Michael mentioned it) is NOT in — the site's tree API stops at chapters; subchapter headings exist inside chapter files and could group the viewer's section list later if Michael wants it. Section-title search beyond cached chapters would need bulk TOC-with-sections fetching — deliberately out, per D1 cache-on-demand.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this entry.

## 2026-07-25 (bill tracking T3 + unified worklist T4 BUILT — statute-tracking design COMPLETE in-app — Code session)

**What happened (same session, continued):** Michael said keep going, so Module B and the worklist landed. Every in-app slice of the statute-tracking design is now built (T1–T4); only the two edge-function deploys remain (Michael + CLI, docs/statute-cache-setup.md).

- **T3 engines (`src/bills/`):** bill-text statute-reference matcher (drafting-order conventions incl. enumerations, CCP articles, chapter and subchapter forms — resolver-gated, classify-don't-guess) and the B3 lifecycle (active bill → `pending-bill` flags on touched rules; passage → clears pending with "hardened" attribution + raises `enacted-change-pending` with effective date; veto/sine-die → auto-clears, attributed and logged). All pure functions; flags advisory throughout (§8).
- **T3 data:** watch_targets / tracked_bills / bill_statute_refs in schema + both adapters; store v9 (reseeds — PFS CSV needs re-import). Manual sweep targets SEEDED verbatim from watch-targets-seed.md (all 20 phrases, 4 groups). **Registry-derived targets regenerate from registry cites automatically** (`syncDerivedWatchTargets`, drafting-order phrases) so the poller reads rows and needs zero cite logic.
- **T3 UI:** Bill tracking nav page — tracked-bills table (status, effective date, touched refs, flagged rules), watch-target management (derived display + manual add/toggle/remove), "Import poll results" JSON action, matcher re-run over stored raw payloads, LegiScan CC BY 4.0 attribution footer (B4). Demo mode ships two FICTIONAL poll rounds (99xx bill numbers, provenance headers in the fixtures).
- **T3 poller (`supabase/functions/legiscan-poller/`):** fetch-and-store only (masterlist change-hash diff + target sweeps ≥50 relevance + getBill/getBillText) — the app's tested matcher/lifecycle does all flag logic, so it re-runs over history without re-spending queries. Uses Michael's `LEGISCAN_API_KEY` secret. **NOT yet deployed or exercised against the live API** — first deploy should be invoked once manually and its JSON log read (doc says so).
- **T4 (`src/statutes/worklist.ts` + `WorklistCard`):** unified worklist — A4 text-changed items due immediately; B3 enacted items join ON their effective date (before that: "upcoming"; unknown date: surfaced as upcoming, never silently due); pending-bill flags are context counts, never worklist items. Full card on Legal Rules; **compact card on the Cases landing page = O3's "dashboard card"** (the app has no dashboard page yet — the landing page is the de facto dashboard; revisit if a real dashboard ever exists). Renders nothing when there's nothing to act on.
- **Verified live in demo mode:** derived targets (5) + manual seeds (20) on first visit; round 1 → HB 9901 flags cprc-18-001, SB 9902 flags hospital-lien-ch55, control bill matches ED but flags nothing; Cases card "2 pending bills watched"; round 2 → HB 9901 passes (pending cleared-as-hardened, enacted flag effective 2027-09-01), SB 9902 dies (auto-cleared, logged); worklist + Cases card show the upcoming enacted change. No console errors. **162 tests green (21 new).** One real bug caught live: React dev-mode double-effect duplicated derived targets → sync is now single-flight + self-healing. Same honesty note as T2: JS-dispatched clicks on real elements (hidden-pane limitation).
- **CLAUDE.md build-state updated.**

**Next:** deploy statute-fetch + legiscan-poller and schedule the poller (monthly interim cadence per §5); enter effective dates on real passage events; the OAA remaining tabs / next queue item per Michael.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this build.

## 2026-07-25 (statute cache + viewer + hash tripwire: T2 BUILT — Code session)

**What happened (same session, continued):** Michael said go on T2, so Module A is now complete end-to-end (design §3, A2–A4):

- **Engine (`src/statutes/`):** chapter-HTML→sections parser with per-section FNV-1a content hashes, verified against REAL chapter files; fetch orchestration (cache-on-demand through the DataAdapter; fixtures in demo mode, `statute-fetch` Supabase Edge Function in live mode — targeting `tcss.legis.texas.gov/resources/…` per the SPA discovery); the A4 tripwire (pure `diffSnapshots` + `buildHashIndex` with chapter aggregates for chapter-level cites like "Prop. Code Ch. 55").
- **Data:** four new tables in schema + both adapters (statute_chapters, statute_sections, registry_verification_snapshots, watch_flags); local store v7→v8 (demo store reseeds — re-import the PFS CSV if needed).
- **Fixtures (D3):** the five real chapters the seeded registry cites (CP.18, CP.41, CP.146, PR.55, HS.327) committed under `src/statutes/fixtures/` with provenance README — public domain, lazy-chunked out of the main bundle.
- **UI:** Statutes nav page (cite lookup box, cached-chapters table, "Cache registry-cited chapters", "Refresh cache + run tripwire", re-verification worklist card) + statute viewer (`/statutes/:code/:chapter#section` — section cards, copy-cite, open-at-source, refresh). Legal-rules cites now deep-link INTO the viewer (T1's external links upgraded per A3). **Mark verified now pins snapshots** (per-section hash; chapter aggregate for chapter-level cites), reports what it pinned/skipped, and **clears tripwire flags — re-sign-off is the clearing act**; flagged verified rules get a "Re-verify" button.
- **Verified live in demo mode, full loop:** prefetch 5 chapters → lookup "CPRC 41.0105" lands at the highlighted section → Mark verified pins `CP 41.0105` → simulated pre-amendment snapshot → refresh raises the flag (worklist card + rule-row ⚠, rule STAYS verified) → Re-verify clears it (attributed) and re-pins. No console errors; cases page regression clean. 141 tests green (21 new). Honesty note: in-browser buttons fired via JS click on the real elements (hidden-pane limitation, same as prior sessions); confirm() stubbed to accept during the walkthrough.

**Not in this slice (by design):** O3's dashboard card is T4 (there's no dashboard page yet — T4 should create the surface); full working-set prefetch by code needs TOC/chapter enumeration — current prefetch covers registry-cited chapters, which is what the tripwire actually protects; live-mode edge function is written but NOT deployed (one CLI command, docs/statute-cache-setup.md).

**Next:** T3 (LegiScan poller + matcher — key is in place as Supabase secret `LEGISCAN_API_KEY`; demo mode with fictional bills first per design), then T4 (unified re-verification worklist + the O3 dashboard card).

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this build.

## 2026-07-25 (crash recovery; statute-tracking §9 decisions made — Code session)

**What happened:** The Claude Desktop app crashed at the end of the cite-parser session below (~00:25) and Michael reinstalled it (00:29) — the app's chat list was wiped but all transcripts, code, and pushes survived (last push 00:17, nothing lost). The crashed session's final exchange was recovered from its transcript: Michael had answered the three §9 questions with "Q1: how do I register the API key; Q2/Q3: in sequence after." Resolved this session:

- **O1 — LegiScan API key: RESOLVED (Michael, 2026-07-25).** Michael registered the key and stored it in Supabase as a custom secret named `LEGISCAN_API_KEY` (server-side secret — correct posture: never in the repo, never in a `VITE_`-prefixed var that would ship to the browser). **T3 (LegiScan poller) is now unblocked**; when built, it should run server-side (e.g. Supabase Edge Function / scheduled job) reading that secret, since the front-end can't and shouldn't touch it. Key value itself lives only in Supabase + Michael's password manager.
- **O2 — Working-set code list DECIDED (Michael, 2026-07-25):** the design's core nine (FA, PE, CR, CP, GV, HS, IN, PR, ES) **plus TX (Tax), LG (Local Government), and TN (Transportation** — Michael's own addition**)**. Occupations excluded. All twelve are already live-verified entries in `src/cites/codes.ts`.
- **O3 — Worklist surfacing DECIDED (Michael, 2026-07-25):** re-verification worklist gets a **dashboard card** in addition to the registry screen — visible each post-session Sept. 1 without going looking.

**Next:** T2 (statute cache + viewer + hash tripwire) is fully unblocked — build against the twelve-code working set and remember the SPA discovery (fetch from `tcss.legis.texas.gov/resources/…`). T3 is unblocked too (key in place); design sequencing still puts T2 first.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this entry's three §9 decisions.

## 2026-07-25 (statute-tracking design filed; cite parser T1 BUILT + live-verified — Code session)

**What happened (same Claude Code session):** Michael dropped the new design-space handoff — the Statute Text & Legislative Tracking design pass plus its two companions (the 35-case cite-parser test table and the watch-targets seed; the third attachment was the transcript design again, byte-identical to the committed copy → already fully applied, nothing done). All three filed verbatim (`02da677`): `statute-text-and-bill-tracking-design.md`, `cite-parser-test-cases.md`, `watch-targets-seed.md`.

**T1 (cite parser/resolver) built** per the design's own sequencing (zero dependencies, immediate value):

- **Live-site verification first (the design asked for it):** all V1–V3 flags resolved against statutes.capitol.texas.gov — 28 code abbreviations confirmed by fetching real chapters; `CR.55A.htm` confirmed; ES/BC confirmed; CV (Vernon's) failed the guessed pattern → classified-but-unlinked. **Major discovery:** the .gov site is now a client-side app — user deep links still work (client-routed, anchors honored), but server-side fetch (A2/T2) must use `tcss.legis.texas.gov/resources/…`, where the original static files live. Spec-feedback entry filed with the details.
- **`src/cites/`** — `codes.ts` (live-verified registry, user + machine URL builders), `parser.ts` (statutory forms incl. bill-drafting order, CCP articles, constitution, chapter-level, ranges; classifies-never-links rules/federal/bill-numbers; bare articles return candidates, never a silent guess), `actChain.ts` (source-credit grammar incl. "Amended by:" chains and the pre-bill-number era). **The design table's 35 cases pass verbatim**, plus registry-cite forms (name-first chapters, no-space §, bills-with-year) and act-credit strings harvested from the real statute-text file. 120 tests green repo-wide.
- **Registry wiring (T1's deliverable):** statutory cites on the Legal rules screen are now deep links into the official site (5 of the seeded rules' cites link; case cites/federal/rules stay plain text). Verified live, no console errors.

**Gates/next per the design §10:** T2 (statute cache + viewer + hash tripwire) buildable next; **T3 (LegiScan poller) is gated on Michael registering the API key (§9-O1)** — the watch-targets seed is ready for it, and its doc records §9-O4 as answered (all sweep groups in). O2 (working-set code list) and O3 (worklist surfacing) still open for Michael.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this entry, the new specs, and the spec-feedback SPA-discovery item.

## 2026-07-25 (second real order: OCR-layer Uvalde OAA now extracts END-TO-END — Code session)

**What happened (same session, continued):** Michael clarified the Medina scan was the PRIOR attorney's order (so the §1c hard stop would have been doing its job there — the office-appointment question in spec-feedback stays open but is less urgent), and provided a real **Uvalde** order WITH an OCR text layer that "didn't do anything" when he dropped it. Diagnosis: his app was on pre-tuning code for the template match, and beyond that the parser couldn't read this layout — single-space label rows ("Name SHANE …"), a wrapped offense row (degree/court/cause/complaint tails on a continuation line), "☐" checkbox glyphs, dotted dates ("07.08.2026"), a free-text "DOCKET SETTING" line, and the designee row on page 2.

**All fixed and proven against the real document** (run locally through the actual engine — never committed): every field extracts high-confidence, the wrapped cause merges to "…-CR", the attorney check passes on "Michael Brennan", and the past docket setting trips the stale-date guard. New extraction field `docketSetting` → confirmed-setting candidate (future ones auto-detect; past ones are history). Third fictionalized fixture (Uvalde-OCR layout) committed; **81 tests green**; verified live in demo mode end-to-end (caption "State v. Cole" fills, charge row complete, docket setting auto-detected).

**For Michael:** re-drop the same OAA — the running app picks the fixes up via hot reload (hard-refresh the tab if not). The parser has now been tuned against two real orders; more variety (Real County, a felony multi-charge order) will keep sharpening it.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this entry.

## 2026-07-25 (OAA parser tuned against the FIRST REAL ORDER — Code session)

**What happened (same session, continued):** Michael added drag-and-drop to the upload card (built, `7f6ed57`), then dropped a real scanned Medina County OAA (#38076). The app behaved as designed — pure image scan, zero text layer → Tier 2 manual entry — but reading the document visually showed it is the SAME standard form family as Uvalde/Real, so the "tune against a real order" pass happened immediately:

- **Parser retuned to the real layout** (the real doc stays out of the repo; a fictionalized replica is the committed fixture): boxed "STATE OF TEXAS & <court>" caption, two-column label rows WITHOUT colons, blank-Phone-above-Cell-Phone, right-column bleed ("Indigency Status:" sharing a printed row), "Appointed Attorney" heading block, "Court Appointed Designee  Date  Time" footer table, cause column "NOT FILED" → no-cause-yet (duplicate check skips it). Template detection is now structural (form-family anchors), county is extracted data — key renamed `oaa-standard-v1`. Both fixtures pass; **72 tests green**; verified live (Medina-layout text → full correct pre-fill, administrative-only dates → "is a hearing already set?" prompt).
- **Spec-feedback (new 2026-07-25 OAA item, 4 findings):** tier is document quality, not county; **[DECIDE] the real order appoints "Hill Country Regional Public Defender Office," not Michael by name — the §1c attorney check would hard-stop every HCRPDO appointment; Michael to rule which appointee names count as his**; operative case number was handwritten only (#38076) — cause-pending reminder pattern worth designing; Gender/Race fields exist on the form but not in the spec map.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything below plus this entry and the spec-feedback OAA item.

## 2026-07-25 (OAA criminal intake Tier 1 BUILT — Code session)

**What happened (same Claude Code session as the verification entry below):** Michael said go on the next queue item, so the OAA intake slice (criminal-appointment-intake spec §1–2) was built end-to-end. **Tier 1 only by hardware reality:** the Uvalde/Real digital form is deterministic text extraction and ships now; Tier 2 (DeWitt scanned packets — segmentation, OCR, handwriting-overrides) needs the local AI arm and is gated on the P1, same as billing 1b and transcript T3. The in-app Tier 2 fallback is manual entry through the same review screen (never auto-accepts anything, trivially satisfying the §1 hard rule).

- **Engine** (`src/oaa/`, commit `6b9d242`): label-anchored Tier 1 parser with per-field provenance ("line 14: …"), per-county template registry (unmatched → Tier 2 fallback), hearing auto-detect with semantic date kinds (confirmed setting / docket availability / administrative) incl. the stale-date guard, attorney hard-stop check (surname-anchored variants), normalized duplicate-cause check. Charges are child records (multi-cause support); cases gain county/custody/appointment fields. Local store v6→v7; 23 new tests (66 total green).
- **UI** (`bb3cc0c`): `/cases/new/oaa` — upload (PDF via lazy pdf.js chunk, or .txt) → full draft review (matter, editable offense table with low-confidence row highlighting, defendant client record with existing-party linking, settings with pre-checked auto-detected docket availability) → Create Matter commits case + party/link + charges + calendar events (through the standard layer → Outlook push) + an `oaa_intakes` audit record + review log. Criminal case detail shows a Charges card + custody/county/appointment.

**Verified live in demo mode:** fictional Uvalde-style fixture → Tier 1 match, every field pre-filled correctly with provenance, created matter 26-0004 State v. Okafor (2 charges incl. MTR/MTA revocation-track badge, client party linked Ours, docket-availability reminder pending Outlook sync); re-upload of same causes → duplicate banner links the existing matter and blocks create until override, existing-party link offer fires; substituted-attorney fixture → red hard stop, create disabled; unrecognized document → Tier 2 manual path with gating note. No console errors; regression pages clean. (Same JS-dispatched-click caveat as the entry below — hidden-pane limitation.)

**For Michael / the design space:** (1) The Tier 1 parser was built against a FICTIONAL fixture matching the spec §1a field map — the real sample OAAs stay out of the repo. Before first real use, run a real Uvalde order through it in a session and tune; expect a small layout-tolerance pass. (2) Real County sample still outstanding (spec §5) — the template accepts Uvalde OR Real, flagged in code. (3) §3 docket cross-referencing awaits the docket-worksheet feature itself coming in-app. (4) Store v7 reseeds the browser demo store (same class as v5/v6 — re-import the PFS CSV if needed).

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything in the entries below, plus this build.

## 2026-07-25 (Office-notes verification caveat closed — Code session)

**What happened (follow-up Claude Code session):** Closed the verification caveat from the entry below. In demo mode: marked the "note for later" inbox item Not case-related → inbox dropped 5→4 pending, processed count incremented, the note appeared on the Office notes page (1 note, kept-never-discarded copy intact), and its record page rendered caseless at `/notes/tr-stage-note-later` with the "Office note — no matter" badge, consent/privilege panel, and full transcript. No console errors. One honesty note: the hidden-pane click limitation recurred, so the button was fired programmatically on the real element (same React handler) rather than by pointer — the pointer layer is the identical button pattern already click-verified in the confirm flow. Michael's two-second check is now optional, not required.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** unchanged from the entry below, plus this entry.

## 2026-07-25 (§10 decisions made; pilot fixtures wired; Office notes built — Code session)

**What happened (same Claude Code session as the T1/T2 build entry below):** Michael walked the design doc's §10 decision list one-by-one, then handed over the Phase 0 recordings.

**Decisions (Michael, 2026-07-25):**
- **O1 — D1 CONFIRMED:** confirm-only in v1; auto-file revisited only when the routing-decision log shows real precision. (The one pending veto is now closed.)
- **O2 — P1 OS: Windows + WSL2** (familiar Windows PC on top, pipeline in the Linux layer; affects T3 setup docs only).
- **O3 — Not-case-related recordings → personal store.** Built this sitting: Office notes nav page (searchable, kept-never-discarded), `officeNote` flag on transcripts, record page works caseless at /notes/:id. The inbox's "Not case-related" now files there.
- **O4 — Phone→PC channel: stay manual** until the Tascam/P1 arrive and real phone volume exists.

**Pilot fixtures (design's T2 requirement, closed):** Michael provided `phase0-test-recordings.zip` — 13 recordings, both transcript JSONs (Parakeet int8/CPU floor), ground-truth scripts, scorecard, findings. All fictional (verified). Audio + docs archived at `..\data\pilot-recordings\` (provenance README; outside repo per convention); transcripts committed as fixtures under `src/routing/__tests__/pilot/` with the fictional universe rebuilt from the scripts. **All 13 recordings behave as the design predicts — 43 tests green** — including "the Jester for Stot on the Hernandez matter" routing to Hernandez at high confidence and script 2's eaten-opening take still landing on Ramirez via the fuzzy claim number. Engine addition: optional known-identifiers list (claim numbers live outside the case record). One build stumble caught and fixed: the first fixture commit (`f46d7b4`) type-errored under tsc; fixed in `9a54237` (JSON imports via resolveJsonModule), exit codes checked explicitly since.

**Spec-feedback item added (cosmetic):** the design doc's §4 example cell cites rec_10's "twenty twenty five CI zero four nine six two" as matching 2025-CI-08841 — actually distance 4, outside the doc's own ≤2 threshold; mechanism validated by the other recordings. Design space to fix the cell on next revision.

**Verification caveat:** the Office-notes click-through couldn't be re-verified in-browser late in the session (the in-app browser stops accepting synthetic clicks while its pane is hidden); page rendering verified, build/lint/tests green, and the wiring pattern is identical to the click-verified confirm flow. Michael: two-second check — mark the "note for later" inbox item Not case-related and see it appear under Office notes.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** everything in the probate and T1/T2 entries below, plus spec-feedback's new 2026-07-25 item and this entry.

## 2026-07-24 (late — probate practice area routed to design space — Code session)

**What happened (Claude Code session):** Michael assembled his Texas probate practice materials — a probate-assistant system prompt (v1.0) plus its knowledge corpus (~1.8 MB: James Publishing *Texas Probate Forms & Procedures* chapters, Dorsaneo *Texas Litigation Guide* Unit IX, and active-matter documents for a standalone decedent's-estate matter). Purpose clarified: these are inputs for **building probate into the case management software as a practice area**; the matter itself is worked in the design space, not here. No code written.

**Code-side steps taken:** (1) **Data hygiene:** the corpus contains copyrighted treatise text AND real client matter data — it stays OUT of the repo, parked at `..\probate_knowledge_corpus.md` (v0.1 folder root, outside git, same posture as the OAA samples and MRF fixture). Never commit it. (2) **Spec-feedback item 1 upgraded** (addendum): the §7 probate-companion decision's "reusable if standalone probate work ever comes in" premise has fired — item 1 is now a full probate-practice-area design pass (proceeding-type-driven lifecycles, the deadline batch as Legal Rule Registry entries requiring Michael's sign-off, probate-specific tracked objects, form-engine tie-in), not just a ladder choice. Details in the addendum.

**For the design space:** run the probate design pass against the corpus + system prompt (both live outside the repo on Michael's machine); output a spec snapshot for `docs/specs/` in the usual discipline. Registry note: probate statutory deadlines are exactly rule-registry material — plan the unverified-entry batch into the spec.

**Staged for Code:** none (awaiting the design pass).

**Awaiting/Returned from Code, unreviewed:** everything listed in the 2026-07-25 entry below, plus the spec-feedback item 1 addendum and this entry.

## 2026-07-25 (transcript sort & route: design filed + T1/T2 BUILT — Code session)

**What happened (Claude Code session):** Received the design-space handoff for feature-intake item A (`transcript-sort-and-route-design.md`, committed verbatim `9bc00a6`) and built its two hardware-free slices the same sitting, per the doc's §11 and the standing queue (item A was already Michael's designated next target):

- **T1 — data model + inbox** (`d1b755e`, `964ddc5`): transcripts / participants / staging items / routing decisions / glossary terms / tag templates in both adapters + schema (GIN full-text index included); local store bumps v5→v6. New **Inbox** nav page: pending cards with matched-signal highlighting, best-guess + alternatives + confidence badges, confirm panel with the three quick fields (consent, out-of-state, privilege/PHI) pre-filled by context type, split/hold/not-case-related actions, routing settings (templates + glossary as editable rows), suggested-vs-chosen decision log, and a demo-mode "import pipeline output" action that runs the real routing engine. **Transcripts tab** on case detail + transcript record page (speaker→party mapping, attorney-only verify action). Auto-file OFF per D1.
- **T2 — routing engine** (`cd19207`): pure-TS template matcher (template-first, slots-fuzzy), spoken-number normalizer (digit words → canonical IDs, edit distance ≤2 vs. the known list), fuzzy name/caption matchers with surname support, weighted scoring with ambiguity discounting (a shared adjuster is 1/N as discriminating) and a signal-independence check ("Terrence Boyd" + caption "State v. Boyd" count once). **vitest added — the repo's first test runner; 30 tests green** (`npm test`).

**Verified live in demo mode:** all five seed staging items land at the designed confidence levels (tagged dictation high; Servpro adjuster call high by content inference with Garcia shown as the shared-adjuster alternative; witness interview high with discoverable pre-fill; Boyd cause number spoken with one garbled digit → medium via the normalizer; "note for later" unroutable); full confirm flow filed the adjuster call to the Servpro case (decision log: accepted 1 of 1); participant mapping and verify on the record page; pipeline-output import staged a new item through the live engine. Build + oxlint + tests clean; regression pages (Medical, Parties, Rules, Calendar routes) clean, no console errors.

**Fixture gap for the design space:** T2's spec calls for the 13 real pilot transcripts as test fixtures — they live in the project space, not the repo. Tests currently use synthetic stand-ins (noted in `src/routing/__tests__/fixtures.ts`); route the pilot bundle to a Code session to upgrade the fixtures.

**Demo-store consequence:** store v6 reseeds Michael's browser demo data (same class as the v5 bump — re-import `..\data\pfs\PFS-2026-TX-RestOfState-nonQPP.csv` via Benchmarks if needed).

**Open for Michael (design doc §10):** O1 confirm/veto D1 (auto-file posture — build is confirm-only either way for now); O2 P1 OS; O3 where not-case-related recordings go (currently kept as dismissed with a logged decision, nothing deleted); O4 phone→PC sync channel. T3 (Python/NeMo pipeline service) stays gated on the P1 hardware; T4 wiring follows.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (needs Michael's Entra setup + first-connect verification); this entry and the T1/T2 build for design-space review.

## 2026-07-24 (feature-intake handoff filed — Code session)

**What happened (Claude Code session):** Filed the second 2026-07-24 design handoff (feature intake — distinct from the CourtListener handoff applied earlier today, `bf89eca`). The design entry below is appended verbatim; the staged deliverable is committed as `feature-intake-2026-07-24.md`; cross-references added to master spec §14 and CLAUDE.md (spec list + build queue). No code written. Reconciliations (the design entry predates repo sync): (1) the intake says items are "sequenced behind current Phase 1a work" — Phase 1a was already built and walkthrough-approved 2026-07-23, so item A (recorder → local transcription → sort & route) is the effective next build target per Michael's "do this tonight" call; CLAUDE.md's queue updated (OAA criminal appointment intake moves to second, not dropped). (2) Item A overlaps the transcript integration layer already fully specified in `transcript-workflows.md` (same local NVIDIA pipeline, phases 0–3 defined, hardware roadmap in its §9) — item A's design pass should extend that spec, not re-derive it. (3) Item B overlaps `outlook-email-intake.md` (EXPLORATORY, HIPAA first-class) — same coordinate-don't-duplicate note. (4) Data-hygiene flag raised in `docs/spec-feedback.md` (new item 9): item D's "real example" carries live-matter lien amounts and item A's spoken-tag example names "the Curry matter"; the doc was filed verbatim as directed, but the commit is being held LOCAL (not pushed to GitHub) pending Michael's call on genericizing.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (needs Michael's Entra setup + first-connect verification); spec-feedback item 9 (data-hygiene call + push decision); the Code-side entries below; this entry.

## 2026-07-24 (design session — feature intake, no build)

**What happened:** Design-space dictation session with Michael capturing new feature ideas and one immediate next-build target. No code written. All items below are intake, not spec-final — they need a design-space pass to reach registry/spec discipline before build.

**Immediate next target (Michael's call — "do this tonight"):** the **recorder → local-transcription → sort/route workflow** (item A below). Start here next session.

**Decisions / framing:**
- CourtListener / Free Law Project API ($10/mo) worth adopting for in-session case-law retrieval — speeds the *retrieval* loop (Haygood-line verification last night required Michael to pull PDFs by hand), not the interpretation. Attorney interpretation stays with Michael; API text is a source, not a verification (consistent with Legal Rule Registry rule 2). Ties to the dictation workflow: Michael reads cases, dictates his read, system cross-checks against retrieved opinion text.
- **Reusable pattern identified and named** (item C): "upload a document → extract structured data → do something meaningful with it (populate records, create contacts, track change over time)." Subrogation is the first concrete instance; the pattern is cross-cutting (court docs, insurance, medical). Build subrogation as the reference implementation of the pattern.
- **Standing design lens:** proactively surface good dictation-capture opportunities as features get built (origin: old-school tape-dictation workflow). Flag to Michael when a build step would benefit from dictation rather than typing.
- Email intake/routing (item B) kept as its own project, separate from the Outlook calendar-push slice — but watch for advantageous linkage points as both develop; flag rather than silently merge.
- Scope/sequencing note: Michael working ~20 hrs/week. Feature set is deep but each item is a contained slice. Discipline = finish one before starting the next; these are intake, sequenced behind current Phase 1a work.

**Staged for Code:** `feature-intake-2026-07-24.md` (this handoff, Part 2) → canonical path `docs/specs/feature-intake-2026-07-24.md`.

**Awaiting/Returned from Code, unreviewed:** none from this session.

**Next:** Start item A (recorder ingestion + transcription sorting). Before building, Michael to provide the NVIDIA transcription model's docs/API so capability (speaker separation, timestamps, batch, structured output) can be confirmed against the sort/route design.

## 2026-07-24 (Code handoff applied + reconciled — Code session)

**What happened (Claude Code session):** Applied the 2026-07-24 design-space handoff. Reconciliations, since that design session couldn't yet see the repo sync: (1) its §2 doc had already been committed this same day (`f9825b3`) from an earlier routing of identical content (byte-diff confirmed) — renamed via git mv to the handoff's canonical `registry-courtlistener-integration-design.md`, references in CLAUDE.md and the master spec's registry section updated; no duplicate commit. (2) The 2026-07-23 handoff was re-verified as fully applied (`fb62d9e`). (3) The design entry below predates repo events it stages as future work: the two v0.1 UI primitives (phone masking, comboboxes) were BUILT 2026-07-23 (`d2f493e`) as shared components, and Phase 1a was built AND walkthrough-approved 2026-07-23 — "Phase 1a build session" in its Next list is already satisfied. (4) Since that entry was drafted, Outlook calendar push Phase 1 was also built (`8a1752b`, entry below).

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (needs Michael's Entra setup + first-connect verification); the Code-side entries below; this entry.

## 2026-07-24 (CourtListener integration designed; v0.1 feedback landed)

**What happened (chat session):** Confirmed Michael pushed the 2026-07-23 handoff (registry draft entries + log append + header amendment + spec-feedback note) — sync back to project knowledge not yet visible; verify at next session start. Michael's v0.1 feedback doc (claude/v0.1-feedback.md, complete) surfaced in project knowledge: all v0.1 features approved, two UI change items (phone masking, searchable comboboxes) as shared components at top of Phase 1a; **Phase 1a UNBLOCKED.** Decided the 17 case-law files stay in the project through registry sign-off (they are the [READ] verification sources); after sign-off, optionally archive to `docs/authorities/` (public opinions — no client-data concern; note they are Lexis Word exports misnamed .Pdf; one duplicate McMillan).

**Research/decisions:** Case-law database question resolved. Human layer: vLex Fastcase (free State Bar of Texas member benefit — includes citator + Texas case-law alerts) + Lexis for high-stakes Shepardizing. Machine layer: **CourtListener (Free Law Project)** — REST API v4 (search incl. semantic, citation graph, cite-validation endpoint), free daily search alerts, webhooks, and an **MCP connector** usable from chat and Claude Code sessions. FLP membership Tier 1 ($10/mo, https://free.law/membership/) fits; small-firm eligibility explicit; API promo doubles rates through 2026-08-06 but all budgets specced against standard limits.

**Deliverable:** `registry-courtlistener-integration-design.md` — three-layer design (alerts / budgeted API / MCP), registry schema additions (opinion_id, cite_validated, alert_id, forward_citation_baseline, review_flag + flag_history), config hygiene (token in .env; no client data in queries), flag-don't-verify principle restated as governing. Two [DECIDE] items for Michael: webhook-vs-email pending hosting posture; whether cite-validation pulls forward into the registry table build.

**Next:** (1) Michael: FLP account + Tier 1 (before 8/6 for promo) + MCP connector setup; (2) registry sign-off checklist (priorities unchanged: Entry 1(c-3) qualified-LOP ruling; Entry 4 fatal-defect conflict); (3) Phase 1a build session (two UI primitives first, per v0.1-feedback disposition); (4) review BUILD-SESSION-NOTES.md.

**Staged for Code:** `registry-courtlistener-integration-design.md` (commit under docs/specs/; reference from registry section of master spec); this log entry.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21 overnight audit) — still unreviewed; 2026-07-23 handoff push — confirm synced back.

## 2026-07-24 (spec snapshot: CourtListener registry integration — Code session)

**What happened (Claude Code session, design-space-directed):** Committed the design addition `legal-rule-registry-courtlistener-integration.md` (CourtListener/FLP citation-graph integration: Layer A saved-search alerts for citation-currency flags, Layer B budgeted API for cite validation + flag investigation, Layer C MCP connector for verification sessions; governing principle — automation flags, only Michael verifies). Per the doc's own staging instruction, added the cross-reference to the master spec's registry section (§2) and to CLAUDE.md's spec list. Nothing built; the doc's §6 sequencing question ([Michael: approve or pull cite-validation forward]) and §4 webhook-vs-email decision ([DECIDE]) are Michael's.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (entry below — needs Michael's Entra setup + first-connect verification); the earlier Code-side entries; this entry.

## 2026-07-24 (Outlook calendar push Phase 1 BUILT — Code session)

**What happened (Claude Code session, same sitting as the v0.1-feedback entry below):** Michael cleared the gate ("go") and asked for a full autonomous run. Built Outlook push Phase 1 per `outlook-calendar-sync.md`, end to end:

- **CalendarEvent entity** (`src/domain/calendar.ts`): type (hearing/deadline/appointment/reminder/other), naive-LOCAL start/end storage (deliberately timezone-free — UTC-bug lesson; the Graph layer attaches the browser IANA timezone at push time), all-day support, scheduled/cancelled status (cancelled = tombstone + Outlook deletion), and sync state (pending/synced/error + outlookEventId + last error). Both adapters (local store v5, Supabase + `calendar_events` table with matching RLS), seeds (two Garcia events).
- **Graph push layer** (`src/outlook/`): config-activated like Supabase (`VITE_MSAL_CLIENT_ID` / `VITE_MSAL_TENANT_ID` / `VITE_OUTLOOK_CALENDAR_NAME`); delegated MSAL popup auth (lazy-loaded chunk — demo sessions never fetch it); find-or-create dedicated **"MDBP Cases"** calendar (spec's recommended default; stale-calendar-id self-heal); push on create/edit/cancel with PATCH→recreate fallback if the Outlook copy was deleted (software is the authority); every event carries the matter reference (fileNumber|caseId|eventId) in a GUID-namespaced extended property + a "Matter:" body line — the Phase 2 matching hook. Retry queue: everything non-synced pushes on connect and via "Sync now".
- **Calendar tab** on case detail: event list with type/sync badges, create/edit/cancel forms, connection card, cancelled-tombstone section. ReviewLog wired (created/edited/cancelled).
- **Spec's two [CONFIRM at build time] items** resolved as config-driven defaults rather than blockers: dedicated calendar per spec recommendation (name overridable), delegated auth via an Entra app registration **Michael creates himself** — 5-minute steps in `docs/outlook-setup.md`. Until then events queue as "pending" and drain on first connect.

**Verified live:** create (timed + stored naive-local), edit (times updated, re-queued), cancel (tombstone + audit trail), seeded events render, all regression pages clean (Medical incl. batch analyze + bill workspace, parties incl. phone formats with extension, Benchmarks, Legal rules ×9, New case date-opened local-today). Build + oxlint clean.

**Demo-store consequence:** the localStorage store version bumped (v3→v5; 5 because a mid-edit HMR reload could have left a half-seeded v4). Michael's browser demo store WILL reseed on next load — his walkthrough-era imported PFS schedule, confirmed runs, and in-app rule notes are demo-mode data and will be wiped. Re-import `..\data\pfs\PFS-2026-TX-RestOfState-nonQPP.csv` via Benchmarks. This wipe class ends once the Supabase auth decision lands.

**Open for Michael:** run `docs/outlook-setup.md` (Entra registration + two `.env` lines), then Connect Outlook on any case's Calendar tab. Live Graph push could not be exercised in-session (needs his registration + his sign-in — credentials are never Claude's to handle); first real connect is the remaining verification step.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; the Code-side entries below; this entry.

## 2026-07-23 (v0.1 feedback: phone masking + filterable combobox — Code session)

**What happened (Claude Code session):** The prompt asked for the full Phase 1a build plus two v0.1 feedback fixes — but Phase 1a was already built, gap-closed, and **walkthrough-APPROVED by Michael** (entries below), so per the standing resolution from the 2026-07-23 collision session (verify + close gaps, never rebuild), only the genuinely new work was done:

- **Phone masking (feedback item a), as shared infrastructure:** new `phone` field type in the party registry — every phone/fax field (12 across all party types, incl. repeating location sub-fields) now uses a masked input that formats live to (XXX) XXX-XXXX with extension support ("x214"), strips a leading 1, and stores bare digits (`domain/phone.ts` holds the storage/format rules; `components/phone.tsx` the input). Legacy formatted values already in localStorage display correctly without migration (normalize-on-format) and re-normalize whenever edited. Seed data updated to the stored-digit form.
- **Filterable combobox (feedback item b), as the standard long-list picker:** new `components/Combobox.tsx` (type-to-filter on name + party type, keyboard navigation, clear button). Replaced all three long-list `<select>`s: Linked-parties picker on case detail, provider picker on the Medical tab's new-bill form, and the registry's `partyLink` field widget (used by every party form). Short fixed vocabularies (roles, sides, statuses) stay native selects. Status lists untouched per instruction (user-tunable config).
- **Phase 1a audit delta closed:** the prompt's "only CONFIRMED AnalysisRuns may feed settlement/lien math — enforce at the data layer" was previously enforced by inline status checks at each consumer. Added `settlementEligibleRuns()` in `domain/billing.ts` as the single documented gate and rewired both existing consumers (Medical-tab roll-up, provider billing profile) through it, so future settlement/lien modules inherit one enforcement point.

Verified live in demo mode against the running dev server (mask typing incl. extension + leading-1, stored-form normalization on save, combobox filter/select/clear on all three sites); build + oxlint clean. Everything else in the prompt's Phase 1a scope list was confirmed already present from the approved build.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; the two Code-side entries below (registry snapshot + round trip); this entry. Note for the design space: the Phase 1a build prompt lagged repo state (second occurrence) — worth checking session-log.md before drafting build prompts.

## 2026-07-23 (design-space round trip executed — Code session)

**What happened (Claude Code session):** Executed the three items routed from the design space: the round-trip state-line rule added to this file's header; the design-space registry-verification entry appended below; the Ch. 146 correction appended to `docs/spec-feedback.md`. Reconciliation: the registry draft-entries doc had already been committed by the Code side earlier tonight (`f3c1f21`, as `legal-rule-registry-draft-entries.md`) before the routing instructions were drafted — content identical, so it was renamed (git mv, history preserved) to the design space's canonical `legal-rule-registry-draft-entries-medical-billing.md` and CLAUDE.md's spec list updated. Nothing else was needed on that staged item.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21 app walkthrough + structure audit) — still unreviewed; plus tonight's two Code-side entries below this one (the registry snapshot commit, including the deliberately deferred `ch146-eob-cap` seed correction, and this round-trip entry).

## 2026-07-23 (registry verification session — design space)

**What happened (chat session):** Worked the Part 7 verification list. Michael pulled official CPRC Ch. 146 text (confirms H.B. 4145, eff. 9/1/2025: new §146.002(c-1) attorney-billing route + (d)(1) conforming change). An external model response to all nine verification prompts was received — treated as proposal text only, per registry discipline. Michael then loaded 16 full opinions into project knowledge (Haygood through Christus Santa Rosa, 2011–2026) plus uploaded In re Club Car (Fort Worth, Nov. 2025); all 17 read in full, chronologically, with a confirmation pass.

**Key findings:** (1) Spec mischaracterizes Ch. 146 — it's a timely-billing bar, not an EOB lien ceiling (see spec-feedback). (2) External response mis-cited McMillan v. Hearne (nonsubscriber offset case) for paid-or-incurred/LOP propositions. (3) K&L qualified-LOP tension identified: reasonableness-conditioned LOPs (our Kostura template) arguably cap the "incurred" amount — attorney ruling needed before billing module encodes either reading. (4) In re United Healthcare (San Antonio 2022) is a Fourth Court limit on K&L discovery the external draft missed. (5) Sheppard (2025) ↔ §146.003 ↔ H.B. 4145 triangle yields a dated per-bill exposure-window flag candidate (services billed only to counsel pre-9/1/2025). (6) In re Allstate itself is NOT in the collection — Entry 2 remains wholly unverified.

**Deliverable:** `legal-rule-registry-draft-entries-medical-billing.md` — ten draft registry entries (nine original + new Rule 204.1/IME entry) with per-proposition source flags ([READ]/[STATUTE]/[EXT]/[NEG]/[JUDGMENT]) and a sequenced sign-off checklist. All entries remain UNVERIFIED pending Michael's per-proposition sign-off.

**Next:** Michael works the sign-off checklist (priorities: Entry 1(c-3) qualified-LOP ruling; Entry 4 fatal-defect conflict — gates disbursement checklist). Pull In re Allstate, Sherwin-Williams, Auburn Creek, HEB Grocery, current Ch. 55 + §18.001 texts, H.B. 4145 enrolled bill.

**Staged for Code:** this file (log append + spec-feedback note + header amendment); `legal-rule-registry-draft-entries-medical-billing.md` (commit under docs/specs/ as the registry working draft — all entries unverified).

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (overnight app walkthrough + structure audit, from 2026-07-21 task) — still unreviewed in the design space.

## 2026-07-23 (registry draft entries — spec snapshot committed)

**What happened (Claude Code session):** Committed the design-space deliverable `legal-rule-registry-draft-entries.md` — ten detailed draft registry entries (medical damages/paid-or-incurred, §18.001, negotiated-rate discovery, Ch. 55 liens, Ch. 146 timely billing incl. H.B. 4145, price transparency, fee schedules, NSA/SB 1264, legislative sweep, and a NEW compelled-exam entry) with per-proposition source flags ([READ]/[STATUTE]/[EXT]/[NEG]/[JUDGMENT]) and Michael's per-entry sign-off checklist. This answers spec-feedback item 7's enrichment request for the North Cypress / K&L entry (now Entry 3 with limits (e)–(f)). Added to CLAUDE.md's spec list.

**Deliberately NOT done:** no edits to the nine seeded registry propositions in `src/data/billingSeed.ts`, even though Entry 5 corrects the seeded `ch146-eob-cap` proposition as wrong (Ch. 146 is a timely-billing statute, not an EOB lien ceiling) — the proposition-amendment workflow is exactly the open design question in spec-feedback item 7(b), and silent text changes would orphan past runs' version stamps. The seed correction waits for Michael's ruling on that workflow. Interim: the wrong framing is unverified, drives no computed outcomes, and Michael can note the correction in the rule's in-app Notes field.

**Next:** Michael works the sign-off checklist at his pace (three items marked ATTORNEY RULING NEEDED: Entry 1(c-3) qualified-LOP incurred amount, Entry 4(c) lien fatal-defect conflict — priority, gates the disbursement checklist — and Entry 5(c) §146.003-as-Haygood-bar posture). Build queue unchanged: Outlook one-way calendar push is the next slice.

## 2026-07-23 (Phase 1a walkthrough — APPROVED)

**What happened:** Michael walked through Phase 1a live (same session as the gap-closing and PFS-pull entries below) and **approved the slice**. He imported the real TX Rest-of-State PFS schedule himself via the Benchmarks page, worked the full loop (line-item confirm flows, EOB card, analysis run → attorney confirmation → provider billing profile, registry, report generation, batch analyze), and the facility-bill hard caveat did its job when the batch run showed 27.20× on the facility bill (professional benchmark distortion — understood, Phase 2 MRF is the fix).

**Fixed during the walkthrough (committed):** line-item Edit/Delete tucked behind a per-row "⋯" menu; benchmark-analysis intro rewritten in plain English for non-builders; "Extended" relabeled "Line total" (footer sum renamed to avoid collision). **Approved:** disclaimer wording → `v1-2026-07-23` (was v1-draft). **Settled:** EOB source-pin stays a warning, not a hard stop; facility ratio in the bill-list stays uncaveated (caveat lives on the bill page and reports); "pin" label stays.

**Captured for the design space (spec-feedback items 6–8):** streamlined EOB acquisition workflow (client EOBs are slow to get in practice); multi-EOB-per-bill modeling requirement for Phase 2 reconciliation; enrichment of the North Cypress / K&L negotiated-rate-discovery registry entry (true but oversimplified — limits on discovery scope need feeding in) plus the general proposition-amendment workflow; disclaimer authority research.

**Next:** registry verifications at Michael's pace (his homework, no code); Supabase auth decision before any real client data; **Outlook one-way calendar push is the next build slice** (gate cleared).

## 2026-07-23 (real Medicare PFS data pulled — TX Rest of State)

**What happened (Claude Code session, same session as the gap-closing entry below):** Pulled real 2026 Medicare PFS data from CMS with Michael in the loop. Michael authorized: (1) accepting the AMA CPT click-through license on the CMS PFS look-up tool on the firm's behalf, (2) locality = **Rest of Texas** (Novitas 04412 / locality 99 = MAC locality 0441299, confirmed against CMS's own locality key), (3) **codes + rates only, no CPT descriptions** — conservative reading of the CPT license, which limits use to "Medicare, Medicaid or other programs administered by CMS." That license reading is new input for registry item 7 (PFS licensing) — still unverified pending Michael's sign-off; he should note the decision there when he verifies.

**Result:** `..\data\pfs\PFS-2026-TX-RestOfState-nonQPP.csv` (outside the repo, same convention as the MRF fixture) — 7,740 codes, non-facility amounts, built from PFALL26AR + REV26B + REV26C (July-current), global-modifier rows only. Full provenance README beside it. **Validated end-to-end:** 99203 → $114.05 matches the CMS look-up tool result for locality 0441299 exactly. CLAUDE.md records the data directory.

**Next:** Michael's Phase 1a walkthrough, importing this CSV via the Benchmarks page as part of it (suggested metadata in the data README). Facility-side and 26/TC component pricing deliberately deferred (Phase 2 / when a bill needs it).

## 2026-07-23 (Phase 1a audit + gap-closing session)

**What happened (Claude Code session):** Michael's prompt asked to "begin the Phase 1a build" — but the repo showed it was already built in the overnight session (entry below). Flagged the collision to Michael before writing code; he chose **verify + close the gaps**. Audit result: the overnight build matches his six-point instruction list except three deltas — (1) ProviderBillingProfile not built (had been deferred to Phase 4), (2) no stale-analysis flag (manual re-run only), (3) real Medicare PFS data still needs Michael (importer ready). Closed 1 and 2 in two commits, verified live in demo mode, build + oxlint clean:

- **ProviderBillingProfile** (synthesis Part 4) attached to the provider-business party record: domain type, both adapters (local store v3, Supabase upsert), schema table with RLS, and a Billing profile card on provider-business party pages. Recomputed deterministically on run confirmation from CONFIRMED runs only (aggregate confirmed billed ÷ benchmark across the latest confirmed run per bill, cross-case), plus distinct coding-audit flags and last-analysis date; ratios/flags only, no client identities (guardrail 7). `historical_reduction_pct` column reserved for the settlement-outcome auto-feed.
- **Stale-analysis flag + re-run action:** deterministic — a run is stale when the loaded fee-schedule set changed or a stamped registry-rule version bumped since it ran. Badges with reasons in the bill workspace and Medical tab; latest-run stale notice with one-click re-run; roll-up warns when stale confirmed runs feed the headline ratio. Full date-of-service pinning still lands with effective-dated schedules in Phase 2.

**Also noted:** BUILD-SESSION-NOTES.md is the 2026-07-21 v0.1 audit (not an overnight Phase 1a walkthrough); its one still-open item affecting this slice is the Supabase auth gap — billing, like v0.1, is demo-mode-only until the auth decision.

**Next:** Michael walks through Phase 1a (now gap-closed); import real TX-locality Medicare PFS data together; Supabase auth decision before any real central-database use; then Outlook one-way push per the settled sequence.

## 2026-07-23 (spec capture: Forms & Document Automation Engine)

**What happened (Claude Code session, design-space-directed):** Captured the fully-designed form engine into `docs/specs/form-engine.md` — wizard-driven document generation (first deliverable: TRCP 194.2(b)/195.5 PI disclosures), token substitution against a real .docx skeleton (never regeneration), Michael-approved verbatim variant library (12 variants; mental-health variant deliberately absent — hard-pause gate), enter-once interview cards with write-back, wizard-only warning gates, supplementation replay, and the formatting-skeleton findings from Michael's actual disclosures form (incl. the 9900→9360 twip table-width bug and the contamination ruling: skeleton only, never its text). Per the design space's instructions, §14 of `case-management-project-instructions.md` was updated — note: no prior "wanted later" forms item actually existed there, so the form engine was added as a new FULLY SPECIFIED entry rather than upgrading one, plus the document production / Bates-stamping module as a new banked item (separate module, form engine reads only, dedicated design session needed). CLAUDE.md spec list updated. Next build slice UNCHANGED: billing Phase 1a walkthrough → Outlook push. (Phase 1a was built overnight this same date — see entry below.)

**Next:** unchanged; form-engine build waits its turn in the queue. First build task when its slice begins: extract the clean master .docx skeleton (form-engine.md §11.3).

## 2026-07-23 (spec snapshot added: criminal appointment intake + docket enhancements)

**What happened (Claude Code session):** Committed the revised design-space spec `criminal-appointment-intake-and-docket-enhancements.md` (OAA-based matter creation with the two-tier Uvalde/DeWitt extraction model, hearing auto-detect with semantic date labels and the stale-date guard, docket-worksheet cross-referencing). Repo filename drops the `-v2` suffix — git history tracks revisions; the doc's own status line carries the revision date. Added to CLAUDE.md's spec list. Per the doc's data-hygiene note, the sample OAA documents stay out of the repo. Merged with Michael's same-day GitHub web upload of the earlier draft plus `outlook-calendar-sync.md` and `outlook-email-intake.md` (both now listed in CLAUDE.md; the v2 spec kept over the draft per its own supersedes line); his uploaded session-log entry file folded into this log below (dictation-session entry) and the standalone file removed per its own paste-me instruction. Going forward Michael hands documents to the Code session rather than uploading via GitHub, so uploads and local commits don't collide.

**Next:** unchanged — Michael's Phase 1a walkthrough, then Outlook calendar push, then OAA intake per the doc's §4 sequencing.

## 2026-07-23 (billing module Phase 1a BUILT — overnight session)

**What happened (Claude Code session):** Phase 1a built end-to-end per the synthesis doc (Part 3 1a scope, Part 4 data model, Part 5 guardrails) in two commits, verified live in demo mode, build + oxlint clean. Delivered: Medical tab on case detail (bill list, §10 Type 1/2 ledger math in the case roll-up, batch analyze, report list); per-bill workspace (editable ledger with Type 2 reconciliation check, claim-type detection + attorney override + hard facility caveat, EOB card with source-pinned patient-responsibility field, line-item table with chargemaster-memory trigram suggestions and confidence badges, attorney confirm/reject/manual-CPT flows, deterministic coding audit, provisional→confirmed analysis runs, ratio-led internal report generator with registry stamps and disclaimer v1); **Legal Rule Registry as system-wide infrastructure** (all nine Part 7 propositions seeded UNVERIFIED; verify action = attorney sign-off in the UI, nothing programmatic sets verified); Benchmarks page (fee-schedule library + CSV import for real CMS PFS data — demo schedule with fictional rates ships so the flow is clickable). Supabase schema + adapter extended in parallel (pg_trgm, RLS matching existing posture); trigram matching implemented in TS so demo and Supabase modes behave identically.

**Implementation decisions (in-code, no spec impact):** disclaimer text shipped as v1-draft pending Michael's review; scenario tier = unconfirmed suggested mappings computed separately and clearly labeled (B2-light); confirmed-only totals feed the headline ratio and roll-up.

**Deferred/open:** real Medicare PFS data import (CSV importer ready — needs Michael in the loop to pull the TX-locality export); backlog items 3–4 (structured addresses, health-insurer party type) NOT folded in — left for Michael's call; ProviderBillingProfile is Phase 4; no run archival/deletion yet.

**Next:** Michael walks through Phase 1a and gives feedback; import real PFS data together; then Phase 2 (lien war chest / MRF loader) or backlog per Michael's priorities.

## 2026-07-23 (phone dictation → three new specs: OAA intake, Outlook sync, email intake)

**What happened:** Michael used the 2026-07-22 docket worksheet in court — content correct, but some of his cases showed only the prosecutor because the docket printed before his appointment was entered. Phone dictation session captured fixes + a suite-wide requirement; specs drafted same day at the desktop.

**New specs (committed under docs/specs/):**
- `criminal-appointment-intake-and-docket-enhancements.md` — OAA-upload matter creation (Uvalde/Real = clean digital; DeWitt = scan/OCR tier; per-county template registry), hearing auto-detect with confidence-gated calendar creation, and docket-worksheet cross-referencing against existing matters (+ email, later) before prompting Michael.
- `outlook-calendar-sync.md` — Outlook connectivity is **non-negotiable**. Phase 1 committed: one-way push, software → Outlook (incl. edits/cancels), via Graph. Phase 2 (two-way) explicitly BACKLOGGED — doable, negligible runtime cost, real engineering complexity; must not delay Phase 1.
- `outlook-email-intake.md` — EXPLORATORY only. Email flows into the system, type-driven actions; HIPAA compliance is a first-class constraint (PHI in PI-case mail). No build commitment; future brainstorming loop in the billing-module-prompt style.

**Sequencing decided:** (1) BUILD-SESSION-NOTES.md review + v0.1 feedback → (2) billing Phase 1a (unchanged) → (3) Outlook one-way push → (4) OAA intake → (5) docket cross-ref rides with docket-worksheet feature → backlog: two-way sync, email intake.

**Open:** Michael to upload sample OAAs (Uvalde/Real form + DeWitt scan; no live client data) so the field map can be finalized. *(Resolved same day — samples analyzed, field maps in the v2 spec.)*

**Next:** unchanged near-term — review BUILD-SESSION-NOTES.md and Michael's v0.1 feedback, then billing Phase 1a.

## 2026-07-22 (v0.1 walkthrough — SIGNED OFF + feedback captured)

**What happened:** Michael ran the v0.1 slice (Case overview + Parties) and walked through it live. Verdict: v0.1 approved as-is — layout and structure match how he works; the only surprise was scope (he expected more built out), which is expected for a first vertical slice. The v0.1-feedback gate on billing Phase 1a is now CLEARED.

**Confirmed working as intended:** the `priorRecordVerified` DPS/background-check checkbox on party intake — the unverified-until-checked flag on eligibility readouts (advisory flag, not a hard stop) is the behavior Michael wants. No change.

**New backlog items (deferred — do NOT build now, capture only):**

1. Texas district court directory — map and store all Texas district courts in the system so courts are selected from a canonical list rather than typed freehand. Feeds deadline engine and filing logic downstream.
2. Client detail / intake section — deeper buildout. Current fields work but are too shallow. Expand beyond the existing list (prior motor vehicle collisions, falls, injuries, medical providers seen, driving history, prior tickets, prior criminal history). Add gating logic — e.g. a yes/no "has the client ever been arrested?" that collapses follow-up fields when No — with the caveat Michael flagged: a conviction can exist without an arrest, so the gate logic must not be naive. Before building, find a real intake form/source to model the field set on rather than inventing it. Note: interacts with the existing structured prior-history requirements in `plea-hearing-eligibility-reminder.md` §3 — don't design in isolation from that.
3. Structured address fields — replace single free-text mailing address with discrete fields: address line 1, address line 2 (suite/apt), city, state, ZIP (three separate boxes for city/state/ZIP). Rationale: addresses must be reassembled into multiple output formats (signature blocks, recipient headers on demand letters), which is impossible from one mushed field. Painful to retrofit — do this before address data accumulates.
4. New party type: Health Insurance Company — currently missing from the party-type dropdown in `partyRegistry.ts`. Prerequisite for item 5.
5. Type-ahead lookup on health insurer field — typing "unit" surfaces a dropdown of insurers already saved in the system (e.g. UnitedHealthcare) for selection rather than re-entry. Keeps names consistent across cases. Same fuzzy-match-from-memory pattern already specced for chargemaster lookups in the billing module. Depends on item 4.

**Open (unchanged):** Citizens MRF median-column compliance sub-question still requires attorney sign-off (synthesis Part 7). Michael's direction: don't over-invest in that single dataset — broaden the MRF corpus instead, starting with all San Antonio hospitals, then scaling to Texas statewide. Target-list assembly (systems + transparency-page URLs) not yet done.

**Next:** billing module Phase 1a build (gate cleared) — re-attach current codebase in a fresh build chat. Backlog items 1–5 are post-1a unless Michael reprioritizes; items 3 and 4 are cheap and schema-adjacent, so consider folding them into the 1a branch if they don't expand scope.

## 2026-07-21 (second review pass: robustness + schema hardening)

**What happened (Claude Code session):** Re-reviewed the whole codebase after the cleanup pass and fixed the stragglers: bad-URL/missing-record pages now show "not found" notices instead of loading forever; list and detail pages surface a visible error when the database can't be reached (this is what a user will see in Supabase mode until auth lands); role/side pickers now share one `CASE_ROLES`/`SIDES` source in `types.ts`; `db/schema.sql` hardened — RLS enabled on `file_counters` (it was the one table exposed to any key-holder) with `next_file_number()` made SECURITY DEFINER (no live DB yet, so no migration needed). Retested the "Enter doesn't submit the party form" observation — withdrawn as a test-harness artifact; notes corrected. Verified index.css is complete (no missing badge classes). Build + oxlint clean; not-found pages verified live.

**Next:** Michael takes docs/spec-feedback.md to the design space; then billing module Phase 1a.

## 2026-07-21 (cleanup + improvements pass)

**What happened (Claude Code session):** Fixed everything actionable from the review: the UTC "date opened" bug (new `src/domain/dates.ts` local-date helper); repeating-group button labels (new `itemLabel` on field defs); tabs are now URL-driven (`/cases/:id/parties`) so creating a party returns you to the Parties tab; list rows expose real links; the "not yet filled in" footer collapses; `isClosedStatus()` centralizes the closed check; localStorage store is versioned (stale stores reseed); `updateParty` narrowed to displayName+fields in the adapter interface; bulk `getCases`/`getParties` added to kill N+1 fetches; **PI flags, commercial policy, and representation type are now editable on the case Overview tab** (practice area / case type stay frozen pending a spec decision). README: Supabase auth gap noted, docs/specs pointer added. Created `docs/spec-feedback.md` with the five open design-space items (probate ladder, Supabase auth, archive/void, party-type promotion, MRF path). Two corrections to BUILD-SESSION-NOTES (file-number year is local, not UTC; README was already app-specific). Build + oxlint clean; all changes verified live in the browser.

**Next:** Michael takes the spec-feedback items to the design space (hand-back prompt provided in session); then billing module Phase 1a.

## 2026-07-21 (v0.1 test drive + codebase review)

**What happened (Claude Code session):** Installed Node.js LTS 24.18.0 (machine had none — v0.1 had never run here), ran the app, and did a hands-on click-through in demo mode plus a full codebase read. Findings written up in `BUILD-SESSION-NOTES.md` (repo root): structure summary, what works, and a gaps list. Headliners: a UTC bug makes "date opened" default to tomorrow every evening; Supabase mode can't work yet (RLS policies require `authenticated` but there's no login); case classification/flags can't be edited after creation. No console errors; no broken imports or TODOs.

**Next:** Michael reviews BUILD-SESSION-NOTES.md alongside his v0.1 feedback; fix the UTC date bug; then billing module Phase 1a.

## 2026-07-21 (build environment stood up)

**What happened (Claude Code session):** Build environment stood up. Repo initialized under git with `.env` protection in `.gitignore` and moved to its permanent home. Spec docs committed under `docs/specs/`. CLAUDE.md created by merging the conventions block into the repo-generated structural half — block wins on rules; spec list corrected (it was missing `medical-billing-analysis-module-prompt.md` and this session log, now documented as the one append-allowed exception to the read-only-specs rule); transport file deleted after the merge (original preserved in git history). Pushed to private GitHub at `mdbpllc/brennan-case-manager`.

**Open item:** record the Citizens MRF local path in CLAUDE.md once chosen.

**Next:** Michael's v0.1 feedback, then billing module Phase 1a.

## 2026-07-21 (build moves to Claude Code; conventions block drafted)

**What happened:** Assessed whether the build should move to Claude Code — yes: design/spec work stays in this Project space (canonical), coding happens in Claude Code against the repo on Michael's machine. Rather than drafting a full CLAUDE.md blind, drafted only the **project-conventions block** (spec canonicity, Legal Rule Registry discipline incl. the unverified-2025-legislation rule, data hygiene for privileged data, build sequence with Phase 1a as current target and 1b gated, working style). Structural half comes from Claude Code's `/init` reading the real tree; conventions block wins on conflicts of discipline, generated half wins on paths/commands.

**Decisions:**
- Repo goes under git before any Claude Code session edits it (first task).
- Spec snapshots committed under `docs/specs/`; coding sessions read but never rewrite them — build-revealed spec issues go to `docs/spec-feedback.md` and come back here.
- No real client data ever committed; Citizens MRF fixture referenced by local path, not committed.
- Project-knowledge housekeeping: the six docs formerly grouped in the "claude" folder are re-uploaded as individual files (folder grouping blocked single-file replacement); session log consolidated to this single file.

**Open (for Michael, parked in the block's footer comment):** (1) local-only vs. private GitHub — private GitHub recommended; (2) confirm the committed spec list; (3) record the MRF local path in the generated CLAUDE.md half.

**Next:** Michael: git init + commit code, specs, and conventions block → run `/init` in Claude Code → merge. Then (unchanged) v0.1 feedback, then Phase 1a build in Claude Code.

---

## 2026-07-22 (billing module decisions + MRF dry run COMPLETED)

**What happened:** Worked through the billing-module synthesis doc's Part 6 decision queue and Part 8 discussion items with Michael — all resolved. Ran the Citizens Medical Center MRF dry run **to completion**: remote fetches first hit a stale cached v2.0.0 copy; Michael then downloaded the live 55 MB file (chat upload timed out — worked around by zipping it and staging via the desktop folder bridge from his Downloads folder), and the full per-code analysis ran on the real file.

**Decisions:**
- All eight decision-queue defaults ACCEPTED, with refinements: Phase 1 reports lead with billed-to-Medicare ratios; only CONFIRMED AnalysisRuns feed settlement/lien math; paralegal flip at multi-user is manual per-workflow; OPPS Addendum B noted as Phase 2 outpatient-facility fallback. Details: synthesis doc Part 6.
- **Legal Rule Registry PROMOTED to system-wide core infrastructure now** — project instructions §2 updated; banked feature #13 (citation-currency alerts) folded in.
- **Billing-module Phase 1a is the SECOND vertical slice** (after Michael's v0.1 feedback). Phase 1 split into 1a (deterministic — minimal Medical tab, manual/assisted line-item entry, chargemaster fuzzy match, Medicare PFS benchmarks, report generator) and 1b (local-AI PDF ingestion, gated on the GPU arm).

**Dry-run outcome (`claude/citizens-mrf-dry-run.md`, v2):** Citizens' current file is **CMS v3.0.0, dated 2026-05-11, attested, with BCBS negotiated dollar rates for the exact exercise codes** (70450 CT head: $487.55 BCBS PPO outpatient vs $3,166 gross); median/percentile columns essentially unpopulated (5 of ~33k rows) → usable evidence tier = negotiated dollar, not attested median. Facility rates ran 4–10× the professional-schedule estimate from the original exercise (claim-type disclaimer empirically vindicated) while still ~20–50% of billed. Anomalies found and specced into the Phase 2 loader: setting-split rates, above-gross outpatient ED E/M rates, CPT reuse across chargemaster lines, stale CDN caching, defective CMS TXT indicator. The Citizens file is the Phase 2 reference fixture (copy staged this session; Michael has the original in Downloads).

**Docs updated:** `claude/medical-billing-analysis-module-synthesis.md` (v2.1 — decisions + dry-run corrections), `case-management-project-instructions.md` (registry promotion, second slice, billing hooks), `claude/citizens-mrf-dry-run.md` (v2, completed).

**Next:** (1) Michael runs slice v0.1 + feedback; (2) billing Phase 1a build chat (re-attach current codebase first); (3) registry verification items remain open per synthesis Part 7 — attorney sign-off required, incl. the new sub-question whether an attested v3.0.0 file with empty median columns is compliant.

---

## 2026-07-22

**What happened:** Michael asked whether Claude uses "Memory" in this project, prompting a discussion of Anthropic's memory tool (a client-side API feature for developers) versus what's actually available here — the Project's persistent docs. Set up this session log as the practical equivalent. Discussed reliability (a new session isn't guaranteed to check/update it — it's instruction-driven, not automatic) and token cost of making that more reliable. Decided against backfilling history from old chats (not worth it — `case-management-project-instructions.md` already captures the substance, and old chat transcripts aren't accessible to a session anyway). Added a short pointer line to the top of `case-management-project-instructions.md` referencing this log, to raise the odds a session checks it (that doc already gets read reliably every session) without merging the log's growing content into it (which would add token cost to every read).

**Decisions:**
- This log lives at `claude/session-log.md`, is checked at the start of relevant sessions, and updated at the end of substantive ones.
- It complements, not replaces, `case-management-project-instructions.md` as the master spec.
- `case-management-project-instructions.md` now carries a one-line pointer to this log (added under its opening paragraph) rather than having log entries merged into it — keeps the reliability benefit without the token cost of the log's history being re-read every time the instructions doc is read.
- No backfill of past chat history into this log — start clean from today; pull forward specific gaps only if they surface later.

**Note:** mid-edit, a `project_write` to `case-management-project-instructions.md` accidentally replaced the full document with just the new opening lines (project_write overwrites the whole doc, not a patch) — caught immediately and restored from the content still held in context. No data lost, but a reminder that edits to that doc need the complete file resent each time, not a snippet.

**Next:** No open build item from this conversation. Resume from `case-management-project-instructions.md` §14 "Open action items" for the actual case-management-software build status (vertical slice v0.1 awaiting Michael's feedback; three Bar consult items pending; etc.).

---
