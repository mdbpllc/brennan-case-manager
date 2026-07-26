# Case Heartbeat — Depositions, Mediation, DCO Ingest & Expert Cadence Capture (2026-07-25)

**Status:** RAW CAPTURE — mixed voice/text session, design side. Not canonical, not a design doc, not in the build queue.
**Canonical repo path:** `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25f.md` — routed Code-side per the accompanying handoff.
**Sequence note:** follows `-2026-07-25b`, `-c`, `-d`, `-e`. This is the **f** capture — sixth in sequence. **Source of record for Parts 1–5 until folded into `case-heartbeat-design.md` §8.**
**Session type:** Mixed voice and text, design side, **Opus 5**. Voice sessions write nothing to disk on their own — before this file, none of the below existed anywhere but the transcript.
**Provenance markers:** [CONFIRMED] ruled aloud · [PROPOSED] Claude suggested, unobjected, not affirmed · [OPEN] asked and unanswered · [CLAUDE] analysis/inference, unverified.

---

## HOW TO USE THIS IN THE NEXT CHAT

Paste the handoff (`claude_Handoff_Session_Log_2026-07-25f.md`) first. Paste this file only if the next session needs granular detail. Then say:

> *"Resuming the case-heartbeat work. Depositions and mediation are walked end to end. The DCO ingester, the software-wide audit log, and the expert-disclosure cadence are new this session. I uploaded the Advanced PI Law 2025 course book and pass 1 of the mining is done — run pass 2."*

**RESUME POINT:** **Pass 2 of the course-book mining**, per §9 of `apil-2025-course-book-mining-pass1.md` — Kostura's subrogation and liens chapter first (highest deadline density in the book, and it owns the disbursement stage, which has never been walked), then the remainder of the appellate/preservation chapter including the *Duncan*/*Simien* business-records split, then pre-suit investigation, then the Rule 204 adverse-exam material.

**Secondary resume options if Michael would rather rule than read:** the seven pass-1 questions (H52–H58 below) and the four unanswered forks from this session (H42–H45).

**Also still pending from before this thread:** D3/H8 (shared touch substrate — still gates T1 and blocks all builds); registry entries 1–10 sign-off (Entry 1(c-3) qualified-LOP, Entry 4 fatal-defect conflict); FLP/CourtListener account + MCP connector setup (**promo ends 2026-08-06 — 12 days out**); §10 decision list D1–D10; H21, H24–H27, H29, H30, H33, H35–H41; the session-1 heartbeat voice capture that never reached Code; `Go_Live_Gates` gates 1–5 verbatim; the standing fold queue — `case-heartbeat-design.md` §8.12 still lags capture e.

---

## PART 0 — TWO CORRECTIONS MICHAEL MADE, BOTH OF WHICH TOUCH THE REPO

1. **The process server is KELLY FOLAND**, not "Follint." [CONFIRMED — Michael's correction, unprompted, framed as a "kind note."] The misspelling is in the repo: capture d and `case-heartbeat-design.md` §8.10 both carry "Follint." **This is a repo correction work order, not just a note.**
2. **Bexar County** — spelled out by Michael after Claude's transcription rendered it "Bear County." No repo impact known, but a Code session searching local rules for "Bear County" would find nothing.

**Process note:** Claude opened this session by asking what *arms* the deposition thread. That question had already been answered in capture e §7.1 — Claude proposed declared-intent arming ("Michael says I want to depose this person") and Michael rejected it outright, establishing that deposition alerting is prompted by case events at fixed checkpoints. Claude checked capture e mid-session and retracted. **Root cause: `case-heartbeat-design.md` §8.12 still names "the discovery phase proper" as the resume point, which is two captures stale.** This is the second time the stale fold has cost session time. The fold queue is not cosmetic.

---

## PART 1 — DEPOSITIONS: THE NO-DATES LADDER (H39 territory, defendant-driver branch)

Claude proposed walking the plain defendant-driver deposition before the corporate-rep branch, on the reasoning that the corp rep is the plain deposition plus a designation layer, and building the exception first means back-deriving the rule. Michael did not object and proceeded. [PROPOSED framing, effectively adopted by conduct.]

### 1.1 The ladder [CONFIRMED — Michael's own enumeration]

| # | Rung | Detail |
|---|---|---|
| 1 | **First request** | Email asking opposing counsel for deposition dates |
| 2 | **Second request** | On silence. Subject line reads literally **"Second Request"** |
| 3 | **Third request** | After a further wait. Subject line reads **"Third Request"** |
| 4 | **Notice it** | No response to the third → stop asking. Michael picks **the date, the time, and the place** and serves the deposition notice |

**Intervals [CONFIRMED]:** **one week between each rung.** First request → wait a week → Second Request → wait a week → Third Request. Michael's words: *"I think that's more than generous."*

[CLAUDE] The "generous" framing matters for the build: this is not a floor Michael is anxious about, so the gradient here is not about tightening the week under ordinary conditions.

### 1.2 What the labeled subject lines are actually for [CONFIRMED — the session's best find]

The "Second Request" / "Third Request" labels are **not** a nagging device. They are a **paper trail being built for a specific downstream use**: they become **Exhibit 1** to the response to a motion to quash (§1.4).

**Consequence [CONFIRMED]:** the engine **tags those emails as exhibit-eligible at the moment it sends them** — it does not go hunting through thread history when the quash lands. Michael: *"Yeah. It should tag them."*

[CLAUDE] This is the proof-in-the-record pattern appearing on the **input** side. Everywhere else the system proves its own completion; here the thread is quietly assembling proof of the **counterparty's non-response** the entire time it nags. And it settles a build-order question the same way the deficiency submodule did (H35): the exhibit-assembly capability must exist for the alert to mean anything, or the alert degrades to "go do it by hand."

[PROPOSED, unruled] The engine should **generate** the "Second Request" / "Third Request" subject-line labels rather than merely remind Michael to send another email.

### 1.3 The escalation is a ladder, not a volume knob [PROPOSED — unobjected, not affirmed]

Claude's framing: every gradient walked before this one modulates **volume** (the service chase gets louder at Michael, never harder on the clerk; the demand check-in nags more insistently but the action stays the same). This one modulates **the action itself** — ask, ask again, notice unilaterally, move to compel are different moves, not louder versions of one move. The engine must know it is recommending a *different thing* at rung four than at rung one.

Michael did not respond to the framing directly but the walkthrough that followed is consistent with it.

### 1.4 After the notice goes out — the fork [CONFIRMED]

**Branch A — no response, they appear.** Happens *"every now and then."* Clean path; the date holds.

**Branch B — motion to quash.** Michael files:
- a **response to the motion to quash**, and
- a **notice of hearing** on it.

**The response is boilerplate [CONFIRMED].** Michael: it *"is really simple"* — it recites the procedure, states that dates were requested and that he tried to confer and got no response, and then **"Please see Exhibit 1."** Exhibit 1 is the deposition-scheduling emails **pulled into an exhibit**. Michael's phrasing: *"I would like to just pull those emails from the deposition scheduling. It just pulls it into an exhibit."*

**Consequence:** when a quash lands, the system already holds the entire record it needs. One click assembles the exhibit and drops it behind a standard response.

### 1.5 The hearing-date conferral gate [CONFIRMED]

Setting the hearing on the quash response is **jurisdiction-dependent**:

- **Courts with no conferral rule:** Michael *"will still confer, but it's not… I could choose to confer or I could choose not to."* → **optional**.
- **Bexar County:** local rules **require** conferring on the date of the hearing. → **mandatory**. *"And there, I have to confer."*

**[CONFIRMED] Same action, requirement dialed up or down by jurisdiction.** Not two different actions.

[CLAUDE] This is the first point in the deposition thread where a local rule changes **what the software will let you do**, not merely what it reminds you about — a soft nudge in one court, a hard gate in another.

**Where the jurisdiction knowledge comes from [CONFIRMED — Michael's answer, and it consolidates the design]:** *"that information is actually going to come from… the local rules, and those local rules are gonna be accessed from the court that's logged in for this case."* The deposition thread does not need to know Bexar. It asks the local-rules layer whether this court requires hearing-date conferral.

[CLAUDE] Therefore the conferral gate is **not deposition-specific**. Any thread that files something needing a hearing asks the same question; depositions are just the first customer. This also creates a **hard dependency on the local-rules layer** being real and populated — tying this work to the statute-and-bill-tracking design and the watch-targets seed.

### 1.6 The cutoff override — the ladder collapses but never to zero [CONFIRMED]

Claude asked what happens when there is not enough runway to walk a three-week ladder before the discovery cutoff.

**First answer [CONFIRMED]:** *"if we don't have that time, then we just do it."*

**Then the correction that matters [CONFIRMED — Michael volunteered it]:** the conferral obligation does **not** evaporate under time pressure. *"the local rule still there says you have to confer. And so if we're running out of time, it's just gonna be one request, and that email's gonna be like, hey. Look. We don't have time. This is the time we have left, and there's really no time left. We gotta do this. Give me some dates. We gotta get this done. And then if they don't give it to you, then we just go ahead and notice it."*

**The rule:** the ladder **collapses from three rungs to one**, and the single rung carries a different, urgent tone naming the remaining runway. **The number of rungs flexes; "you asked before you noticed" never goes to zero.** Exhibit 1 gets thinner but always exists.

[PROPOSED, unruled] The runway calculation — cutoff minus buffer, minus the time the full ladder would consume — happens **at arming**, not partway through, so the engine picks weekly-vs-collapsed once rather than switching mid-ladder.

### 1.7 Read-back Michael accepted

Claude read the whole deposition thread back and asked whether anything should move before staging. Michael: *"No. Let's move to the next stage."* [CONFIRMED — the read-back stands as recorded.]

---

## PART 2 — MEDIATION, END TO END

### 2.1 Arming: scarcity, not readiness [CONFIRMED]

Mediation does **not** arm on case readiness. It arms on **calendar scarcity**: *"mediators have calendars with availability, and those calendars fill up. And if you want to get a good mediator, a good mediator is picked up. So their calendars fill up quicker. So we need to be asking for mediation dates ahead of time."*

**The trigger [CONFIRMED]:** the first time to ask for available mediation dates is **after taking the first deposition of the other side.**

[CLAUDE] Two consequences. First, this is a **hand-off**: the first defense deposition being taken is the event that arms the mediation thread, the same shape as answer-received arming the disclosure clocks. Second, it inverts the usual logic — you reach for the date before you are ready, because the date is the scarce thing, not the preparation.

### 2.2 Cadence — corrected mid-session, take the second number [CONFIRMED]

Michael first said **weekly**, then revised. **The confirmed value is the revision:**

| Phase | Anchor | Cadence |
|---|---|---|
| **Baseline / simmer** | From first defense deposition until 6 months before the mediation deadline | **Once every ~20 days** (he offered "once a month… or once every twenty days, let's say that") |
| **Ramp begins** | **6 months before the mediation deadline** | Gradient starts and intensifies — *"that's when the gradient needs to start and needs to intensify"* |
| **Peak** | **3 months before the mediation deadline** | *"super intense"* |

**Anchor note [CLAUDE]:** the baseline starts at the first defense depo, but the **ramp is keyed to the mediation deadline**, not to the deposition. If the first depo lands inside the six-month window, the simmer is skipped and the thread starts already climbing. Two anchors; whichever you are past governs.

**Horizon [CONFIRMED]:** aim to be reaching out roughly **three months ahead**, because that is the booking window for a good mediator.

### 2.3 The "too early" bounce does not close the thread [CONFIRMED]

Michael's live example: this week (July 2026) he tried to get ahead and requested 2027 mediation dates; the mediator's scheduler said they are not scheduling 2027 yet. His ruling: let them know you will reach out again — and **keep the reminder running.** *"Sometimes you can't book it out that far, but it's worth reminding me."*

[CLAUDE] Worth pinning because it is the opposite of how the other threads treat a non-answer. A "not scheduling that far out yet" is a **legitimate answer that still leaves the thread open** — not silence to escalate against, not completion. The engine must hold "asked, told too early, keep the cadence running."

### 2.4 Manual escalate override [CONFIRMED]

The deadline-anchored ramp is the default, but Michael wants to be able to overrule it: some cases are ripe immediately after that first deposition and should not wait for the deadline to generate heat.

**Mechanic [CONFIRMED]:** whenever Michael reports that he has reached out for dates, the engine **offers an escalate option** — *"maybe like a button that I push or a box I click or something like that. Whatever works the best."* Clicking it runs the thread hot regardless of where the deadline sits.

[CLAUDE] This is the counterpart to the deposition ramp's "are you sure? I won't remind you again" gate. That one is a manual override to go **quiet**; this is a manual override to go **loud**. The gradient is the default, not the boss — Michael gets the last word in both directions. Trigger point is well chosen: the option surfaces at the moment he reports contact, which is exactly when he would have just formed the opinion that the case is ripe.

### 2.5 The mediator roster — a named side project [CONFIRMED]

You must **agree on a mediator first**; Michael proposes mediators; he generally prefers mediators **in the area**.

**Roster design [CONFIRMED]:**
- A compiled **full list of mediators**.
- A **score / scale** for each — whether they are good or bad, whether he wants them. *"we could figure out a way to do that scale"* → the scale's definition is deferred (H51).
- **Jurisdictions** per mediator — the areas in which he would want to use them.

**Outbound use [CONFIRMED]:** when it is time to give the other side a list, the email pulls from the roster, filtered to the case's area, and offers **his top-scored names** — *"We don't have to tell them they're our highest scores, but just… they'll pick from our highest score list."*

**Inbound use [CONFIRMED]:** if opposing counsel comes back with their own list, Michael runs their names against the same roster and picks *"the best ones from that or… the least worst."*

[CLAUDE] So the roster is a **standing valuation**, not a mail-merge convenience — it sorts his proposals outbound and scores theirs inbound. And a name can *enter* the roster from their side, which is a prompt to score a new mediator; the roster compounds.

### 2.6 Completion of the scheduling thread, and the hand-off to payment [CONFIRMED]

**Completion condition [CONFIRMED]:** **mediator booked, date on the calendar.** Michael: *"Oh, mediator booked date on the calendar."*

**But the thread does not simply die — it arms the next one [CONFIRMED]:** *"once we get the mediator booked date on the calendar, then we've gotta pay them… we gotta make sure that they get paid ahead of time."*

**Payment thread [CONFIRMED]:** a reminder to get the check out, **on a gradient anchored between the two dates** — from the booking date to the mediation date. Gentle at first, climbing as mediation approaches, because the hard requirement is payment **ahead of time**, not the morning of.

[CLAUDE] Third instance of the completion-arms-the-next-thread chain: answer → disclosures; first depo → mediation; mediation booked → mediation payment.

### 2.7 The mediator's report branch [CONFIRMED]

Some jurisdictions require a **mediator's report to be filed**.

- The engine **asks at scheduling time**: is a mediator's report required to be filed?
- If yes, that arms a **post-mediation reminder** with the filing deadline: *"Hey. Make sure you get this mediator's report. Here's the deadline."*

[CLAUDE] Same local-rules dependency as the Bexar conferral gate — the court on the case determines whether the branch exists at all.

### 2.8 End-of-mediation-day debrief and the outcome fan-out [CONFIRMED]

On the day of the mediation the engine runs a debrief. **One question forks everything: did it settle?**

**Settled → kill the thread.** [CONFIRMED, Michael's word: *"then you can kill the thread"*]

**Not settled → fan-out, and the branches are not mutually exclusive:**

| Branch | Behavior |
|---|---|
| **Reschedule** | Ask: *"are you gonna reschedule my mediation?"* If yes and there is no date yet → **remind every 10 days** until a date lands |
| **Mediator's proposal** | Ask whether the mediation produced one. If so, capture **the deadline** *and* **the amount** |
| **Mediator's report** | (from §2.7) if the jurisdiction requires it, chase it with its deadline |

**The proposal sub-branch has its own follow-up [CONFIRMED]:** sometimes Michael knows the proposed amount that day, sometimes not until the next day. If the amount is unknown, the engine **follows up until he has it**. Once he supplies it, the engine **logs it into the settlement section** as a mediator's proposal with its deadline, *"on the history of negotiations on the settlement tab."*

### 2.9 The negotiations tab is a shared publishing surface [CONFIRMED, with one Claude extension]

Michael, unprompted, made this a condition of considering mediation walked: *"so long as you remember about… creating this dynamic data, creating the data where if there's a mediator proposal that you log that into the negotiations."*

**[CONFIRMED]** "Settlement tab" and "negotiations tab" are **the same tab**; the name is undecided (H49). Its content: *"it's the tab where all the moves — my demand, their offers over time — are logged in, and they all run up to eventual settlement or trial verdict."*

**[PROPOSED, unruled — Claude's extension]** Multiple threads publish into that one tab — the demand thread, ongoing negotiation, mediation. That gives it the **same many-threads-one-record shape as D3/H8**, the shared touch substrate already gating T1. It should not be designed in isolation.

---

## PART 3 — DISCOVERY LEVELS AND THE DCO INGESTER

### 3.1 Level 2 / Level 3 [CONFIRMED]

Michael: *"level three is generally level two… The only difference in level three, obviously, is that we can change it by agreement."*

Claude's framing, accepted: **Level 2 is the default rule set; Level 3 is Level 2 with a trapdoor.** A Level 3 plan may change any time or amount limit, but the Level 2 limits still apply unless specifically changed in the docket control order.

**[CONFIRMED] The engine rule: the DCO overrides Level 2; Level 2 fills every gap.** Michael: *"Yes. The DCO overrides level two."* → a Level 3 case is **document-derived with rule-derived fallback**. One system, not two.

### 3.2 The DCO ingester — a named sub-module [CONFIRMED]

Michael named the real cost: *"our time sink is having to get someone to find time to be able to create all those calendar entries."* Knowing the deadlines is not the work; transcribing them is.

**Intake [CONFIRMED]:** *"there could be something in the system to where we can be the box where you can click to go upload, or you can drag or drop."* A **manual-entry version stays available** as an option.

**Extraction reality [CONFIRMED]:** the uploaded DCO may be *"computer generated where it's very clear to see"* or *"like a weird scan, and you're gonna have to OCR it, just so you know."*

**Human review is required before anything lands [CONFIRMED]:** *"The attorney or the paralegal need to sign off on this."* Michael's stated reason is accountability, and it is what led him into the audit-log discussion: *"if something messed up, I could see who did it. Is it me or was it someone else?"*

**The review screen design [CONFIRMED — Michael's specification, given in detail]:**
- **Split screen.** The actual DCO document on one half.
- The **extracted deadlines on the other half**, each **positioned in line with the date it came from on the DCO page**.
- So the reviewer runs straight down the page — *"back and forth, back and forth, back and forth all the way down the page and confirm"* — with no clicking between tabs.
- *"It shouldn't be difficult. It should be very easy."*

[CLAUDE] The spatial alignment is load-bearing, not decorative: it drives verification cost toward zero on a clean document, which is what makes people actually verify rather than blind-accept. The moment you have to hunt for the source line, checking stops happening.

**[PROPOSED, unruled]** Never write a DCO date silently; show confidence and flag the low-confidence OCR fields specifically so the eye goes to the two dates that need a hard look rather than re-checking all fifteen.

**Sub-module scope [CLAUDE summary, accepted by conduct]:** four pieces — drag-and-drop-or-manual intake · extract with OCR fallback · aligned split-screen verify with confidence flags · signed-off write that creates calendar entries **and** marks each date as a Level 2 override, stamping who confirmed it.

---

## PART 4 — SOFTWARE-WIDE AUDIT LOG (new, Michael-initiated side piece)

Michael opened this himself mid-DCO: *"here's the side piece."*

**[CONFIRMED] Requirements as stated:**
- A log kept in the case-management software recording **when someone changes or enters something of substance**.
- **Not every single click.** *"maybe it could be only certain things."*
- Records **who did it and when**.
- **Explicitly: it must not become bloat.** *"I need it to be designed in such a way where it doesn't become bloat. I don't want this log to become so huge that it's unmanageable over time."*
- The "of substance" list is **to be defined later** (H47).
- Other useful data points welcome if Claude proposes them.
- **Scope: software-wide.** *"That's, like, a software wide feature."*

**[CLAUDE] Connection Michael did not make:** the repo already has a **review-log** recording case-record changes with old/new values — it fired when classification editing was built. This request is that feature **promoted from a feature to a software-wide capability**, not a new invention.

**[PROPOSED, unruled] Additional fields:** the **entity** the change happened on (which case, party, deadline) so the log is filterable; and whether the actor was a **person or the engine**, since "the DCO ingester created twelve deadlines" and "a paralegal corrected deadline three" are different facts.

**[PROPOSED, unruled] Bloat control, two disciplines:** (1) Michael's own — an "of-substance" allow-list, curated deliberately, which stops bloat at the source; (2) **tiering** — some events kept permanently (classification changes, deadline edits, verification sign-offs, the DCO approval — the legally defensible spine), others compressed or rolled off after a window (H48).

**[CLAUDE] Why this is load-bearing for the DCO work:** the attorney/paralegal sign-off on extracted DCO dates **is itself an audit-log event** — a keep-forever one. The verify screen gates the calendar write, and the act of verifying is what gets logged. The two pieces are one piece.

---

## PART 5 — EXPERT DISCLOSURES AND THE DESIGNATION RAMP

### 5.1 Michael's actual practice [CONFIRMED]

He serves **one document titled "194.2(b) and 195.5 Disclosures"** at the initial disclosure deadline, and designates whatever experts he can right then — usually his treating providers, because he generally knows who they are by the time he files suit.

**Two reasons, both stated:**
1. **Historical/defensive:** no heartbeat system existed, so designating early was how he kept from forgetting later. *"That's why I do that really to save myself so I don't forget later."*
2. **Tactical, and he wants to keep it even once the system removes reason 1:** early disclosure can leave the defense complacent — *"sometimes the defense either forgets about it or doesn't know that you did it first… and they can get complacent, and they can blow their deadline, which is good for us."*

### 5.2 The two-phase cadence [CONFIRMED]

| Phase | Trigger | Behavior |
|---|---|---|
| **Supplementation ask** | From the disclosure deadline forward | **Every 30 days**: do we need to update disclosures? |
| **Designation ramp** | **120 days before the expert-designation deadline** | Starts **soft** — *"do you need to expedite experts… do we need to retain someone"* — and climbs |
| **Red alert** | **30 days before the expert-designation deadline** | Red at 30, **not** at the deadline, because *"at thirty days before deadline, I still got time to make a bunch of moves here"* |

**[CONFIRMED] The 30-day supplementation ask does NOT stop when the ramp starts.** Both run concurrently. Michael: *"30 day update does not stop - keeps going."*

**[CONFIRMED] Killing it takes the two-click opt-out** — the same decline-then-confirm gate as the deposition ladder and the mediation alert.

### 5.3 The trial-date cascade is loud [CONFIRMED]

Claude laid out the two-hop derivation: the expert deadline sits 90 days before the discovery-period end (60 for the other side), and the period end is itself the earlier of 30 days before trial or nine months after the anchor. Moving the trial date therefore walks the expert deadline backward silently.

Michael: **"Yeah. It's a loud event."** [CONFIRMED]

[CLAUDE] Filed as the legitimate batched cascade — one causal event shown with all its consequences together, not six separate pings. This is H28's move-your-date alarm with teeth: the trial date is not merely threatening the setting, it is dragging hard deadlines behind it.

### 5.4 Claude's dormancy proposal — RAISED, NOT ANSWERED

Claude flagged that the supplementation opt-out is a different animal from the other two: "no more depositions" and "stop chasing mediation dates" are **tactical** decisions where the lever is spent, but supplementation is a **continuing duty** whose penalty is automatic exclusion. Proposed that the opt-out be **dormant rather than dead** — silenced until a wake event: new records or testing on a case with a designated expert; an expert's opinions changing; or the case crossing **30 days before trial**.

**Michael did not respond.** → **H50, OPEN.** Do not let a future session treat a hard kill or a dormancy model as settled.

---

## PART 6 — THE COURSE BOOK (uploaded this session)

Michael uploaded the **State Bar of Texas 41st Annual Advanced Personal Injury Law (2025)** course book — 1,202 pp., 23 substantive articles, MCLE 174274303. Michael is chapter 22 (Tilley/tripartite). Instruction: let it guide the remaining stages, flag unique ideas bearing on parts already walked, and **loop through it three more times, deeper each time.**

**Pass 1 is complete and lives in its own deliverable:** `apil-2025-course-book-mining-pass1.md`. Structural read of all 1,202 pages plus deep reads of five articles (mediation · appellate/preservation · discovery update · legislative · AI).

**The four findings that bear on rulings already made** — recorded here so they are not lost if the mining doc is separated:

1. **[CONFLICT] Deposition control is measured at noticing.** *In re Texan Millwork*, 631 S.W.3d 706 (Tex. 2021) reads TRCP 199.3 to mean notice on counsel carries subpoena force only if the witness is a party or under that party's control **at the time of noticing**. The Part 1 ladder assumes the deponent is theirs to produce; for a driver who has since quit, three emails and a unilateral notice compel nobody, and Rule 176 subpoena practice is required instead. Needs a routing fork at arming. → **H52 / pass-1 Q1**
2. **[BOOK] The corporate-rep protocol (H39's other half).** *In re Home Depot USA* (Beaumont 2023). Topics are discovery requests and must be tailored to the pleadings. Critically, **TRCP 199.2 sets no deadline for objecting to corp-rep topics** — neither does FRCP 30(b)(6). Gold's proposed practice: object with proposed modifications ~10 days after service; court intervention if no agreement within 15–20 days. **These intervals are practice-derived, not rule-derived**, and the registry must mark them as such.
3. **[CONFLICT] Mediation arming.** Steward advises raising mediation and naming three candidate mediators **soon after the answer is filed** — earlier than §2.1's first-defense-deposition anchor. Candidate reconciliation (Claude's, unruled): split the thread, roster/naming at answer, date-chasing at first depo. → **H53 / pass-1 Q2**
4. **[BOOK] Bexar gates trial on mediation.** Per Steward, a Bexar case cannot reach trial without mediating unless both sides agree not to. That is a **gate on the trial setting**, and a second Bexar entry for the local-rules layer alongside hearing-date conferral.

**And the find with no current owner:** Gov't Code §52.046(a)(4) requires a court reporter to keep notes only **three years from the date taken** — not from judgment. *Piotrowski v. Minns* holds an appellant who does nothing in that window is not "without fault," so no new trial for a lost record. Any evidentiary pretrial hearing in a long-running case lights a silent three-year fuse on the appellate record. Invisible clock, cheap action, unrecoverable failure. → **H54 / pass-1 Q3**

**Security check:** Michael asked whether the conversation raised security concerns. Answer given: no — the session is design talk sourced from Michael and the project's own documents. The standing posture was restated (no real client data in the repo; PHI processing local by design; professional security review required before multi-user or live use). The 2027 mediation-scheduling example carries no client identifiers.

---

## PART 7 — WHAT WAS NOT COVERED

Explicit, so a future session does not assume it was handled:

- **Corporate-representative deposition mechanics** — pass 1 supplied a proposed protocol from the book, but **Michael has not walked or ruled it.** H39 remains open.
- **Deposition mechanics generally** — subpoenas, cross-noticing, remote vs. in-person, prep, non-party witnesses.
- **Motion to compel** — named as the rung past unilateral notice; never designed.
- **The whole settlement / disbursement flow** — mediation's "settled" branch kills the mediation thread but nothing was designed for what it hands off to.
- **Trial prep, trial, verdict, post-trial.** Pass 1 argues the trial stage is a checklist surface rather than a nag engine; unruled → H55 / pass-1 Q4.
- **Expert designation content** — the retained vs. non-retained package fork, and the mental-health / Rule 204 warning gates, were laid out by Claude and **not ruled on**; Michael redirected to cadence.
- **Findings of fact, judgment finality, JNOV, summary-judgment order drafting** — pass-2 targets.
- **The deficiency submodule build** — still parked pending H35.

---

## PART 8 — CROSS-CUTTING PATTERNS

1. **A thread can build its own evidence while it nags.** The labeled-request emails are simultaneously an escalation device and an exhibit under construction. First appearance of proof-in-the-record on the **input** side — proving the counterparty's non-response rather than one's own completion.
2. **Escalation ladders vs. volume gradients are different mechanisms.** Volume gradients repeat one action louder; ladders substitute a different action at each rung. The engine must know which it is running. [PROPOSED framing]
3. **Manual override runs in both directions.** Deposition "are you sure, I won't remind you again" = override to silence. Mediation escalate-button = override to loud. The computed gradient is a default, never the boss.
4. **A non-answer is not always silence.** The mediator's "not booking that far out yet" is a legitimate answer that leaves the thread open — neither escalation fuel nor completion.
5. **Jurisdiction flips soft to hard.** Conferral is optional in most courts and mandatory in Bexar; mediation is elective in most courts and a trial gate in Bexar. The local-rules layer is load-bearing for the heartbeat, not a nicety.
6. **Completion chains.** Answer → disclosures. First defense depo → mediation. Mediation booked → mediation payment. Threads hand off rather than merely retiring.
7. **Extraction requires a human gate, and the gate is a logged event.** The DCO sign-off is both the safety mechanism and the audit record; designing either without the other loses half the value.

---

## PART 9 — OPEN ITEMS

Existing register runs **H1–H41** (H35–H41 live only in capture e). New this session: **H42–H58**. Note **H40** (deposition thread completion condition) was re-asked this session and again went unanswered — it stays open under its original ID rather than getting a new one.

| ID | Item | Status |
|---|---|---|
| H40 | Deposition thread completion — dead on notice served, depo on calendar, or depo taken with transcript in file? Re-asked 07-25f, unanswered again | OPEN (carried) |
| H42 | Does the quash-response branch run its **own** ladder if opposing counsel stalls on conferring about the *hearing* date? | OPEN — asked, unanswered |
| H43 | Can a hearing be set unilaterally in Bexar if they will not confer, or does the local rule genuinely trap you? If it traps, the same stall that fails at depo-dates **succeeds** at the quash stage | OPEN — asked, unanswered |
| H44 | Is the motion-to-quash branch a gradient, or a fixed-deadline document checklist (default-packet pattern)? | OPEN — asked, unanswered |
| H45 | Mediation payment thread completion — dies on check confirmed sent/paid, or rides to the mediation itself? | OPEN — asked, unanswered |
| H46 | Mediation "settled" kills the thread — what does it hand off to? Settlement/disbursement flow undesigned | OPEN |
| H47 | The audit log's **"of substance" list** — explicitly deferred by Michael | OPEN — deferred by ruling |
| H48 | Audit log retention/tiering — permanent spine vs. roll-off window | OPEN — Claude proposed, unanswered |
| H49 | Name for the settlement/negotiations tab | OPEN — Michael: "we'll figure out the best thing to call it" |
| H50 | 30-day supplementation opt-out: hard kill matching the other two, or **dormant** with wake events (new records/testing, expert opinion change, 30-days-before-trial cliff)? | OPEN — Claude proposed, unanswered |
| H51 | Mediator roster scoring scale — how the good/bad scale is actually defined. Michael: *"we could figure out a way to do that scale"* | OPEN — deferred |
| H52 | Deposition thread: add a party/control routing fork at arming per *Texan Millwork*? (= pass-1 Q1) | OPEN |
| H53 | Mediation arming: split into roster-naming at answer + date-chasing at first depo, or hold the single anchor? (= pass-1 Q2) | OPEN |
| H54 | Reporter's-notes 3-year fuse: build as a thread? Does every hearing get an evidentiary flag, or only named types? (= pass-1 Q3) | OPEN |
| H55 | Rule that the trial stage is a checklist surface, not a nag engine? (= pass-1 Q4) | OPEN |
| H56 | Adjuster reserve-setting: own sub-thread off mediation-booked, or a checklist item on the readiness gate? (= pass-1 Q5) | OPEN |
| H57 | Criminal-charge flag on a defendant as a first-class case attribute? (= pass-1 Q6) | OPEN |
| H58 | Does the registry accept **practice-derived** entries with a provenance marker (corp-rep objection intervals), or do they live elsewhere? (= pass-1 Q7) | OPEN |

---

## PART 10 — WHAT MUST HAPPEN NEXT (process, not content)

1. **Move the handoff**, not this file, first. This capture is the granular backup.
2. **Repo correction: "Follint" → "Foland"** in capture d and `case-heartbeat-design.md` §8.10. This is the only item in this session that edits existing repo content.
3. **The fold queue is now two captures deep.** `case-heartbeat-design.md` §8.12 lags capture e *and* this one. It has already cost session time twice. Fold, or at minimum correct the stale resume point.
4. **Nothing enters the build queue.** D3/H8 still gates T1. The DCO ingester, the audit log, and the mediator roster are all newly specified and all sit behind that gate.
5. **FLP/CourtListener promo ends 2026-08-06.** Twelve days. This has now been carried on five consecutive entries.
