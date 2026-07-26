# Case Heartbeat — Downstream Branches Walkthrough Capture (2026-07-25)

**Status:** RAW CAPTURE — voice walkthrough session, design side. Not canonical, not a design doc, not in the build queue.
**Canonical repo path:** `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25e.md` — routed Code-side 2026-07-25 per the PUSH-TO-CODE work order.
**Sequence note:** follows `-2026-07-25b`, `-2026-07-25c`, `-2026-07-25d`. This is the `e` capture.
**Session type:** Voice, design side. Voice sessions write nothing to disk on their own — before this file, none of the below existed anywhere but the transcript.
**Provenance:** voice session 2026-07-25. Markers: [CONFIRMED] ruled aloud, [PROPOSED] suggested and unobjected but not affirmed, [OPEN] asked and unanswered, [ANALYSIS]/[INFERENCE] Claude's, unverified.

**How to use this in the next chat:** Paste the handoff (`claude_Handoff_Session_Log_2026-07-25_Voice.md`) first, then this file if the next session needs the granular detail. Say: *"Resuming the case-heartbeat walkthrough. We closed the default-judgment thread, the no-answer fork, the discovery phase, and the deposition timing model. Resume at the deposition fork — defendant-driver mechanics vs. corporate-representative deposition."*

**RESUME POINT:** Depositions, specifically the fork Claude raised and Michael never answered: **walk the plain defendant-driver deposition first, or the corporate-representative deposition (with its own notice-and-objection protocol)?** Michael explicitly said he wanted to keep going and paused only to run the handoff.

**Also still pending from before this thread:** D3/H8 (shared touch substrate with the time tracker — still blocking all builds, gates T1); registry entries 1–10 sign-off; FLP/CourtListener account + MCP connector setup (promo ends 2026-08-06); BUILD-SESSION-NOTES.md review; §10 decision list D1–D10; H21, H24–H27, H29, H30, H33; session-1 heartbeat voice capture never reached Code; Go_Live_Gates gates 1–5 verbatim.

---

## PART 0 — ORIGIN AND PREMISE

This session picked up the case-heartbeat walkthrough at the answer-received stage and pushed down three branches that had been named but never walked: what happens when **no answer** arrives, what happens **after** a default judgment is signed, and what the **discovery phase** actually looks like as a set of threads. It ended on depositions, which turned out not to be a stage at all.

Two structural things recurred and are worth stating up front, because they explain most of the rulings below:

1. **Silence must never become a decision.** Every fork this session ends either in an explicit Michael-made choice or in a loop that keeps asking. Nothing dies by neglect.
2. **The heartbeat is only as good as the action underneath it.** An alert that says "go do this manually" is the mundane work the software exists to eliminate. This surfaced explicitly in the build-order discussion (Part 6) but shaped the deposition model too.

---

## PART 1 — THE DEFAULT-JUDGMENT THREAD (the "yes, move for default" branch)

### 1.1 Rule-edition problem, resolved

**[FACT — worth preserving.]** Michael first uploaded the **May 2020** edition of the TRCP by mistake, then the correct **March 2026** edition. **Rule 239a changed materially between the two.**

| | May 2020 text | March 2026 text |
|---|---|---|
| Address required | Last known **mailing** address only | Last known **email AND mailing** address |
| Clerk notice mechanism | Post-card notice | Notice under **Rule 21(f)(10)** |
| Verb | "shall" | "must" |

**The registry uses the 2026 text.** Anything in the app, the playbooks, or Claude's unaided recollection that assumes a mailing-address-only 239a certificate is **wrong**. This belongs in the law-change ledger alongside the 166a change flag already noted in the deadline skeleton.

### 1.2 Precondition 1 — the Rule 107(h) ten-day gate [CONFIRMED]

The return of service must have been **on file with the clerk for ten days** — exclusive of the day of filing and the day of judgment — before a default may be taken.

**Build behavior:** this maps onto the service-completion gate that already exists. Critically, **the engine's first check is not "did they answer."** It is *"has the return been on file long enough?"* If it hasn't, the thread does not offer default at all; it tells Michael the **earliest permissible date**.

### 1.3 Precondition 2 — Rule 239 confirmation [CONFIRMED]

Default requires **no answer AND no appearance**. Any contact, letter, or call that smells like an appearance defeats the default.

**Build behavior:** the engine cannot decide this. It surfaces the question and flags it for Michael's eyeball.

### 1.4 The packet is ONE step [CONFIRMED — Michael's reframe]

Claude initially walked the military affidavit and the 239a certificate as sequential steps. **Michael corrected this and it is the key structural ruling of the branch:** they are not steps, they are *documents that ride inside the motion*. Everything filed with the motion is a single packet-assembly step.

**Packet contents:**

| Item | Source | Note |
|---|---|---|
| Motion for default judgment | Michael's standard PI form | Carries the **statement of unliquidated nature** — already part of his form |
| Proposed order | — | |
| Military affidavit | **Federal SCRA — not TRCP** | Includes the DoD SCRA database check plus a sworn affidavit. **Kept as ONE item** — Michael briefly split it, then reversed |
| Rule 239a certificate | TRCP 239a (2026 text) | Last known **email and mailing** address |
| Notice of hearing on file | — | |

**Build behavior:** the packet is Michael's grab-list. The thread **does not die until each exhibit is in the file.** Same proof-in-the-record completion pattern as the service return and the DCO.

### 1.5 Damages close — Rule 243 [CONFIRMED]

In a PI default the damages are unliquidated, so **filing is not done.** The thread closes on a **prove-up hearing with damages evidence**.

The engine asks one quick routing question early — **"any liquidated damages here?"** Usually no in PI. If yes, it routes to the Rule 241 liquidated path (no evidentiary hearing needed).

### 1.6 Parking-lot note — the liquidated/unliquidated fork goes first-class later [CONFIRMED as a note]

When the heartbeat extends beyond PI into general civil work, **liquidated vs. unliquidated becomes a first-class branch**, not a routing question. Michael's worked example from February 2026: a couple out **$20,000** on a check for goods never received — a clean liquidated number, provable from the instrument, no evidentiary hearing.

---

## PART 2 — POST-JUDGMENT: THE SIGNED ORDER IS NOT THE FINISH LINE

### 2.1 Clock 1 — the 30-day window [CONFIRMED]

**TRAP 26.1 / TRCP 329b.** The defendant may file a motion for new trial or a notice of appeal within **30 days of signing**. An MNT the court never rules on is **overruled by operation of law at 75 days**, which stretches the appellate deadline to **90**.

**Build behavior:** the engine holds the case in a *"signed, watching for attack"* state. Nothing by day 30 → the biggest threats have passed. Something lands → the thread flips to responding.

### 2.2 Clock 2 — the six-month restricted appeal [CONFIRMED]

**TRAP 30.** A defaulted, non-participating defendant has up to **six months from signing** to bring a restricted appeal. The judgment is not bulletproof until that runs.

**Build behavior:** after day 30 the case drops to a **quiet, low-intensity watch** until the six-month line, then the thread retires. That same window is where the collection work happens.

### 2.3 Restricted-appeal elements [ANALYSIS — Claude explained, Michael did not rule]

Narrow, not a do-over. Four elements: filed within six months; was a party; **did not participate** at the hearing and filed no timely post-judgment motion or appeal; and **error apparent on the face of the record** — no new evidence, the reviewing court looks only at what is already there.

What actually sinks defaults is a defect visible in the papers: **bad service, a defective return, the return not on file the full ten days, or a damages award with no supporting evidence in an unliquidated case.**

### 2.4 The linkage [CONFIRMED]

**The front-end precondition checklist IS the restricted-appeal defense.** Clean service, a proper return, the ten-day gate honored, real damages evidence at the prove-up — a clean record starves the appeal. This is why Part 1's checklist is load-bearing rather than ceremonial.

### 2.5 Registry behavior — six months, then roll [CONFIRMED]

Count **six months from signing** under TRAP 30, **then** roll a weekend or legal-holiday endpoint forward to the next business day. This is a deadline-engine computation, not something eyeballed.

**Worked example (computed this session):** judgment signed **Feb 12, 2026** → restricted-appeal deadline **Aug 12, 2026**, a Wednesday. No roll needed in this instance, but the roll behavior must be registered.

### 2.6 The abstract-of-judgment branch [CONFIRMED]

After signing, the thread **offers — does not auto-run** — filing an abstract of judgment in whatever county Michael believes the defendant has reachable property, creating a judgment lien.

**Two Michael-controlled decision points:**

| When | The question | If yes |
|---|---|---|
| At day 30 | "Wait the 30 days out?" | Thread goes quiet |
| At 30-days-up | "Keep waiting the full six months until it's buttoned up, or move now?" | Michael decides on his confidence in the judgment |

### 2.7 Active collection [ANALYSIS — walked, not deep-ruled]

Michael said **"far enough"** here. Captured for later: the abstract is a *passive* lien; the active tools are the **writ of execution** (constable seizes and sells non-exempt property), **post-judgment discovery** (find the assets), and a **turnover order**. Not designed this session.

---

## PART 3 — THE NO-ANSWER FORK (H32 — CLOSED, BOTH BRANCHES)

### 3.1 The fork itself [CONFIRMED]

The moment the Rule 99(b) Monday passes with no answer on file, the engine surfaces a **dead-simple binary**: *"No answer's in. Move for default, or not?"*

### 3.2 YES → the default-judgment thread [CONFIRMED]

Opens everything in Parts 1–2.

### 3.3 NO → the ten-day re-ask loop [CONFIRMED]

**The thread does not die.** Every ~10 days it comes back, states **how long the defendant has been in default — counted from the answer date** — and offers two doors:

- **(a) Close it out** for good → thread retires.
- **(b) Remind me in another ten days** → loop continues, indefinitely, until Michael actively picks (a).

Michael's own framing of the two doors: *"no, this is good, close it out — or, yeah, remind me in another ten days. Then you could just indefinitely keep following up until I say no."*

**The mechanism's whole point is making the number stare at him.** Silence never becomes the default.

**[PARKED]** Michael flagged that a **fuller flowchart** might be worth building here later. Keep it simple for now.

---

## PART 4 — THE ANSWER-IN-HAND BRANCH: TWO PARKED ITEMS NOW RULED

### 4.1 Course correction [worth preserving]

Claude started drifting toward affirmative defenses, counterclaims, and responsible-third-party designations. **Michael corrected it:** the real answer-received touch is the **opposing-counsel letter**, already specified in `case-heartbeat-design.md` §8.11 — outreach within three days, ideally same day; always requests trial dates to agree and file a **DCO**; on an MVC also requests defendant-driver depo dates, gated so no depo lands before the defendant's response window on the first written discovery.

**Consequence:** **H33** (work done *on* the answer itself — affirmative defenses, counterclaims, RTP designation) **remains OPEN.** It was approached and set aside, not resolved.

### 4.2 H28 — RULED IN [CONFIRMED]

**The trial date is a second master clock**, running alongside limitations. It carries a dedicated **"they're trying to move your date" alarm**, firing on any agreed continuance, reset notice, or defense motion that threatens the setting.

This was Claude's proposal in a prior session, explicitly marked *not a ruling*. It is now a ruling.

### 4.3 H31 — RULED [CONFIRMED]

**The DCO thread runs WARM** — a low simmer keeping gentle pressure — until the **DCO is filed in the record**, then retires. Not alive-and-loud, not quiet.

### 4.4 H29 — unchanged

Letter **content** remains deferred as a form-engine dependency. Still open.

---

## PART 5 — THE DISCOVERY PHASE (§8.12)

### 5.1 The disclosure clock and its cadence [CONFIRMED]

**TRCP 194.2(a):** initial disclosures due **30 days after the first answer or general appearance**, automatic.

**Michael's specified cadence, in his own words:**

> *"Fifteen days, that's when you start giving me a soft reminder. And give me a daily soft reminder. And it shouldn't drone out. It shouldn't layer on top of anything else that's more important, but it should be something there that I see daily."*

| Window | Behavior |
|---|---|
| Day 15 out → day 3 out | **Daily SOFT reminder.** Always in eyeline. Must not drone. Must not stack on top of anything more important. |
| Day 3 out → deadline | **Escalates** — firmer, "a little more than warm." Danger zone. |

### 5.2 The drafting nudge rides the same reminder [CONFIRMED]

The same day-15 daily nudge also tells Michael to get his **discovery requests DRAFTED** — drafted, not sent — on the identical 15→3 escalation.

### 5.3 Two lanes, and the question that sets case tempo [CONFIRMED]

The engine asks **early**: *"standard-push or hold-for-disclosures?"* That single answer sets the tempo of the whole case.

**Lane A — hold-for-disclosures (the default):**
Michael serves **his** disclosures on the 30-day deadline. But his discovery **requests** draft at day 15 and then **HOLD** — not sent until the defendant's disclosures are in hand and absorbed. Reason: those disclosures may hand him **new documents** (which generate new questions) or a **responsible-third-party designation** (which opens a whole new line of inquiry). Draft early, hold, send once informed.

**Lane B — low-energy / no-surprises (the exception):**
Classic MVC, clear facts, known minimum policy limits, known carrier, known defense counsel. Michael: *"there's really not gonna be anything artful about this. This is just a standard — let's push this case through as fast as we can to trial and settle as quick as we can."* Here discovery goes out **immediately**, with everything else, because nothing in their disclosures will change the questions.

**The speed chain in Lane B:** faster requests → faster responses → faster defendant deposition → force mediation → settle → client paid → Michael paid.

### 5.4 Mission statement — worth pinning [CONFIRMED]

Michael, on why the artful lane matters and what the software is actually for:

> *"So I don't have to spend time doing mundane tasks that could just be coded and run on themselves. And I can spend time actually doing art, legal art."*

The reframe: **the fast lane is the machine running a case almost on rails; the artful lane is the machine clearing the runway** so there is bandwidth to be creative where creativity moves outcomes. Same engine, two purposes. This is the clearest articulation of the product thesis captured so far.

### 5.5 Discovery-response asymmetry — opposite postures by direction [CONFIRMED]

This is strategic, not administrative, and the engine must treat the two directions completely differently.

**INCOMING — their responses to Michael's requests:**
30-day baseline. Michael **grants defendant extensions almost as a matter of course**, deliberately:

> *"I will normally grant those as a matter of course, just to garner goodwill in the future in the event that I need some sort of agreement from them. It's horse trading, if you will."*

**BUILD CONSEQUENCE — this is the important part.** Granting an extension is a **live recompute/cascade event.** Their response clock moves, and everything hanging off it moves with it: the deposition, the read-and-react window, mediation timing. **The thread must slide the downstream markers, not merely note the extension.**

**OUTGOING — Michael's responses to their requests:**
He essentially **never** requests extensions; only true extenuating circumstances.

> *"I do not ever wanna be beholden to defense counsel. I don't wanna give them a reason to where if I wanna stand firm in the future on a deadline, I don't want them to be able to come back and say, well, you know, we gave you that extension that time. I don't want that. I wanna be in a position to where I can ask for something from them, but I don't wanna be in the position to where the other side can ask for something from me."*

**Build behavior:** on the incoming side, make granting-and-logging their extension easy and almost expected. On the outgoing side, treat his clock as **rigid and fixed** and push him to hit it clean.

### 5.6 H30 raised again — calendar horizon [CONFIRMED as a need, mechanism still OPEN]

Michael calendars roughly **two months** out but should be marking up to **five** — deposition dates, DCO deadlines, discovery response dates. The heartbeat should push the farther-out markers onto the calendar so it reflects the case's real horizon rather than his current bandwidth. **Named again; still needs a build mechanism.**

### 5.7 Responses received = the review-and-react window [ANALYSIS]

Not deep-ruled, but walked: high-severity check for the **deemed-admission trap on RFAs** (TRCP 198 — deemed admissions can support summary judgment); scan for deficiencies; if they are dodging, spin up the meet-and-confer → motion-to-compel thread, which stays alive until clean answers or a ruling. **Responses in — clean or compelled — is the green light that unlocks defendant-depo scheduling**, which forces mediation, which drives settlement.

---

## PART 6 — THE DISCOVERY-DEFICIENCY ENGINE (parked as its own buildout)

### 6.1 Source document

Michael uploaded **David Bright, "Dealing With Objections to Written Discovery" (State Bar of Texas, 48th Annual Advanced Civil Trial Law Course, 2025)**. Bright is Sico Hoelscher Harris, Corpus Christi; a Texas Legal Legend award recipient. Michael's framing: *"attorney David Bright who's brilliant."*

**Why it matters for the build:** the paper makes deficiency review nearly **mechanical**. It is not a judgment call on each objection's merits — it is pattern-matching against a **closed list** of things that are flatly improper under the rules.

### 6.2 The closed list (the build backbone)

| Improper practice | Authority |
|---|---|
| "General Objections" preamble | TRCP 193.2(c),(f); Rule 193 cmt. 3 |
| Boilerplate that does not explain why **this specific request** is deficient | TRCP 193.2(a),(c) |
| Objecting on privilege instead of producing a privilege log | TRCP 193.2(f) → 193.3 |
| Answering "subject to and without waiving" | TRCP 193.2(a),(c) |
| Producing part and dribbling the rest | **TRCP 196.2(b)** — only four permissible RFP responses ("anti-dribbling" rule) |
| Evasive or incomplete answers | **TRCP 215.1(c)** — treated as a failure to answer |

**THE LINCHPIN — TRCP 193.2(e):** a valid objection **obscured by numerous unfounded objections is WAIVED** unless the court excuses the waiver for good cause. This is what permits moving to overrule **everything wholesale** rather than litigating request by request. The more they carpet-bomb, the more they lose.

### 6.3 Bright's workflow — already thread-shaped

1. Responses land → **scan** against the closed list.
2. **Meet-and-confer letter out immediately.** Gives them **ten days**. Doubles as the **TRCP 191.2 certificate predicate** for the motion.
3. No agreement → **file the motion to compel.**

**Hearing tactics (Bright's, captured for the later build):** move on small batches (~10 requests at a time, not 60); hand the judge a **sustain/overrule chart**; hand the judge a **caselaw cheat sheet**; stay civil and do not vilify opposing counsel; rarely seek sanctions unless the behavior is repeated. His exhibits: **1** meet-and-confer letter, **2** motion-to-compel form, **3** hearing chart, **4** three-page rules/caselaw summary.

### 6.4 The ruling [CONFIRMED]

**The discovery-deficiency engine is its own dedicated buildout, parked for later.** When responses land, the thread:

- **scans** them against Bright's closed list,
- **flags** what it finds,
- hands Michael a **ready-to-review deliverable**, and
- gives **one-click access to pull up the actual responses** so he can eyeball them himself.

This requires document parsing plus a review interface. Michael: *"that should be a whole deal in itself, like a whole buildout, and we could flag that for later to really build that out."*

### 6.5 The document hook [CONFIRMED — explicit]

**When this build starts, the thread MUST prompt Michael to pull David Bright's paper back in.** It is the substantive backbone — the improper-objection list and the forms. The build cannot start without re-ingesting it.

### 6.6 Rejected [CONFIRMED rejection — preserve]

Claude offered to note **where Bright's forms (Exhibits 1–4) live** so the future build could find them. **Michael declined: *"No. I know where the document's at."*** Do not add a forms-location note to the parked item. The document hook alone is sufficient.

### 6.7 Build order [PROPOSED — acknowledged, not ruled → H35]

Michael asked directly: *"Should I build out that submodule on deficiencies and deficiency letters and motion to compel? Should I build that out first before we do the alert or the heartbeat layer on that?"*

**Claude's answer — submodule first.** The reasoning, which is the part worth keeping: the heartbeat's whole job is to nag toward an action and then die on the proof in the record. If the action it nags toward — run the scan, generate the letter, tee up the motion — **does not exist yet**, the alert reduces to *"go do the thing manually,"* which is precisely the mundane work being coded away. **The heartbeat is only as good as the action sitting underneath it.** So: build the artifact-producing submodule first, then wrap the heartbeat around it, at which point the thread can actually deliver the deliverable, watch for the meet-and-confer letter to go out, and stay warm until the motion is filed or clean responses arrive.

**Status discipline:** Michael responded *"Okay. Alright. Let's move to depositions."* That is acknowledgment plus a subject change, **not an explicit ruling.** Claude also asked whether to record the build-order dependency in the handoff and **never got an answer.** Recorded here as **PROPOSED** and flagged as **H35**. Do not let a future session treat this as settled.

---

## PART 7 — DEPOSITIONS: A CAPABILITY, NOT A STAGE

### 7.1 Rejected model [preserve — the rejection encodes the rule]

Claude proposed: *declared intent arms the thread* — Michael says "I want to depose this person," which arms an alert that runs **warm** until the notice is out and the depo is on calendar.

**Michael rejected this outright: *"No."*** and redirected to alert timing and severity.

**The rule the rejection encodes:** deposition alerting is **not armed by Michael's declared intent.** It is **prompted by case events at fixed checkpoints**, with a gradient on the last one. The engine asks; Michael does not have to remember to declare.

### 7.2 Three trigger points [CONFIRMED — Michael's own enumeration]

Depositions can be requested at many different points in a case:

| # | Trigger | Detail |
|---|---|---|
| 1 | **Day one of the answer** | On MVCs the first opposing-counsel letter already requests defendant-driver depo dates — the request is live from the start, in the cases he already knows he wants |
| 2 | **Off the disclosures** | Their disclosures may identify individuals he did not know about, driving a depo request for those people |
| 3 | **Off the discovery responses** | The responses will likely identify more individuals worth deposing. **Gated** behind actually getting the responses he wants — *"whether they just give them to us, or they give them to us after we force them to give them to us after we go through the whole deficiency deal"* |

So the deposition thread is a **capability the engine can spin up at any of those moments**, each time triggered by a different event: an answer, a disclosure, a set of responses.

### 7.3 The three-checkpoint prompt model [CONFIRMED]

| Checkpoint | Trigger | Behavior | If Michael says no |
|---|---|---|---|
| **CP1** | Defendant answers | A box surfaces: *"Do we want to ask for any depositions right now?"* | Rests — not dead, resting until the next trigger |
| **CP2** | Disclosures come in | Same prompt, now informed by any new people they named | Rests again |
| **CP3** | Discovery responses land | **Character changes.** Becomes a **recurring follow-up roughly every ten days** | Enters the ramp — see 7.4 and 7.6 |

CP3 changes character because this is the point where he actually has the responses identifying who is worth deposing, and the pressure is on.

### 7.4 The CP3 intensity gradient [CONFIRMED]

Starts **affirmative but soft** — Michael's exact calibration: *"kind of soft right there, or, you know, affirmative but soft — not like super soft, but affirmative, soft."*

**Both frequency and intensity scale up** as the deadline approaches.

### 7.5 The gradient's peak is NOT the discovery cutoff [CONFIRMED — critical]

Claude asked whether the ramp should anchor on the discovery deadline or the trial date. Michael answered with a correction that moved the peak:

> *"Scheduling can take anywhere from one to two months from notice of the deposition to actually taking the deposition. And if I end up taking someone's deposition outside of the discovery period — uh-oh, maybe I wanna bring some impeachment evidence in that I did not produce. There's arguably... I might not be able to bring that in. So we don't wanna make the most intense iteration of that reminder right at the discovery period. We want it two months before discovery — that's when it's red alert."*

**The math:**

```
anchor       = end of the discovery period
buffer       = ~2 months (notice-to-taken scheduling lag)
RED ALERT    = anchor − buffer
```

The ramp climbs toward the **buffered** date, not the cutoff itself. Past that buffered date, noticing a depo is still possible but Michael is knowingly risking the outside-the-period problems — so **the thread should warn rather than merely nag.** *(That last sentence is Claude's proposed behavior, unruled.)*

### 7.6 The are-you-sure safeguard [CONFIRMED]

At any point during the ramp Michael can say **"no more depositions."** But before the thread goes quiet, a **confirmation must fire**:

> *"Are you sure? I'm not gonna remind you again about this, and this is all up to you."*

Only on confirm does the deposition thread retire. Michael's framing: *"once I tell you no and I click it and enter it, I need something else to pop up."*

**Pattern note:** this is the same anti-staleness instinct as the no-answer fork — silence never happens by accident — but a **different mechanism**. The no-answer fork uses an indefinite ten-day loop; this uses a **hard stop behind a confirmation gate**, because Michael has affirmatively decided the lever is spent.

### 7.7 Registry candidate — LOGGED [CONFIRMED]

Claude proposed logging the buffer as a registry value rather than a hardcoded number. **Michael: *"Yeah. Go ahead. Log it as a registry candidate."***

> **Deposition scheduling buffer** — default **~2 months**, tunable. Reasoning attached: it is the notice-to-taken scheduling lag, and blowing it risks taking the deposition outside the discovery period and losing unproduced impeachment evidence. The gradient peaks at *discovery cutoff minus this buffer*.

**[PROPOSED, unruled]** Claude added that because this buffer gates a red alert with real evidentiary stakes, the entry should carry a cite or at least a practice-basis note rather than living as a bare number. Michael did not respond to this specifically.

**[CLAUDE INFERENCE — NOT VERIFIED THIS SESSION]** The "unproduced impeachment evidence may not come in" consequence probably maps to **TRCP 193.6** (exclusion of evidence not timely disclosed or supplemented) and the Rule 190 discovery-period mechanics. **No rule text was pulled and no case was checked.** Treat as a research item, not as law. → **H37**

---

## PART 8 — WHAT WAS NOT COVERED

Explicitly untouched territory, so a future session does not assume it was handled:

- **Corporate-representative depositions** — Claude raised the defendant-driver vs. corporate-rep fork and it was never answered. Notice-and-objection protocol untouched. → **H39**
- **Deposition thread completion condition** — is the thread dead on *notice served*, *depo on calendar*, or *depo taken with transcript in the file*? The house proof-in-the-record pattern points to the last, but this was never asked. → **H40**
- **Deposition mechanics generally** — noticing, subpoenas, cross-noticing, remote vs. in-person, prep, non-party witnesses.
- **Mediation** — named repeatedly as the thing depositions force, never designed.
- **Expert designation clocks** — TRCP 195.2(a)/(b) sit in the deadline skeleton; never walked into the heartbeat.
- **Summary judgment** — the RFA deemed-admission trap points at it; not walked.
- **The deficiency submodule's actual build** — parked by explicit ruling.
- **Active collection design** — Michael said "far enough."
- **H33** — work done *on* the answer itself. Approached and set aside.

---

## PART 9 — CROSS-CUTTING PATTERNS

**1. Silence is never a decision.** Every terminal state this session is either an explicit Michael choice or a loop that keeps asking. Two distinct mechanisms emerged:

| Mechanism | Where | Shape |
|---|---|---|
| **Indefinite re-ask loop** | No-answer fork | Every ~10 days, two doors, loops until "close it out" |
| **Hard stop behind a confirmation gate** | Deposition ramp | "Are you sure? I won't remind you again" |

These are siblings, not the same thing. Which one applies depends on whether the decision is *deferrable* (loop) or *spent* (gate).

**2. Proof-in-the-record completion, again.** The default packet does not die on "filed" — it dies when each exhibit is in the file. The default judgment does not die on "signed" — it dies when the appellate clocks run. The DCO thread dies on the DCO *filed*. Consistent across every branch walked.

**3. Deadlines with a scheduling reality behind them peak early.** The deposition buffer is the first instance of a rule-derived deadline whose *operative* alert date is earlier than the rule date because of real-world lead time. Worth watching for others — expert designation and mediation likely have the same shape.

**4. Asymmetry by direction.** The extension posture (generous incoming, rigid outgoing) is the clearest case, but the same instinct shows up in how the engine treats his clocks vs. theirs generally.

**5. Cascade events are first-class.** Granting a defense extension is not a note, it is a recompute that slides everything downstream. Same family as the H18 cascade exception.

**6. The engine asks one early question that sets tempo.** "Standard-push or hold-for-disclosures?" is a small prompt with case-wide consequences. Watch for other single questions with this leverage.

---

## PART 10 — OPEN ITEMS

New this session. Existing register runs H1–H34; H32 and H34 are now closed, H33 remains open.

| ID | Item | Status | Owner |
|---|---|---|---|
| **H32** | No answer by the Monday — the fork | **CLOSED this session** — both branches ruled (Part 3) | — |
| **H33** | Work done *on* the answer itself (affirmative defenses, counterclaims, RTP designation) | **STILL OPEN** — approached this session, redirected, not resolved | Michael |
| **H35** | Build order: deficiency submodule before its heartbeat/alert layer? | **PROPOSED, unruled.** Claude argued yes; Michael acknowledged and changed subject | Michael |
| **H36** | Deposition scheduling buffer registry entry (~2 months, tunable) | **OPEN** — logged as a candidate; needs the entry drafted, a practice-basis note, and attorney sign-off | Michael |
| **H37** | Verify the evidentiary consequence behind H36 — is it TRCP 193.6, and what does the case law actually hold about unproduced impeachment evidence? | **OPEN — research.** Claude's mapping is an unverified guess | Claude, then Michael |
| **H38** | The CP3 gradient anchors on the end of the discovery period, which on a Level 3 case is **DCO-derived**. What happens when there is no DCO yet, or the DCO moves? | **OPEN** — cascade behavior unruled. Claude-identified gap, not raised aloud | Design side |
| **H39** | Corporate-representative deposition — separate thread, separate notice-and-objection protocol | **OPEN** — raised by Claude, never answered. **This is the resume point** | Michael |
| **H40** | Deposition thread completion condition — notice served, on calendar, or taken-with-transcript? | **OPEN** — Claude-identified gap | Michael |
| **H41** | Deficiency scanner scope — Bright's paper covers Texas state **and** federal. Michael's practice is state. Does the scanner carry the federal list too? | **OPEN** — Claude-identified gap | Michael |

**Carried, unchanged:** D3/H8 (shared touch substrate — still gates T1 and blocks all builds); H21 (service-diligence case-law cite); H24 (file ≥6 months before limitations); H25; H26; H27 (peace-of-mind board mechanism); H29 (letter content / form-engine dependency); H30 (calendar-horizon push — named again this session, still no mechanism).

---

## PART 11 — REGISTRY CANDIDATES ACCUMULATED

Every one of these needs an entry with a cite before it can drive engine behavior. **None of them are registry entries yet.**

**From the default-judgment branch:**
- TRCP 107(h) — ten-day return-on-file gate (exclusive of filing day and judgment day)
- TRCP 239 — default requires no answer **and** no appearance
- TRCP 239a — **2026 text**: last known email **and** mailing address; clerk notice under Rule 21(f)(10). **Law-change ledger item** — differs from 2020
- TRCP 243 — unliquidated damages require a prove-up hearing
- TRCP 241 — liquidated damages path
- **Federal SCRA military affidavit** — non-TRCP; DoD database check plus sworn affidavit. Needs its own federal cite

**From the post-judgment branch:**
- TRAP 26.1 / TRCP 329b — 30-day window; MNT overruled by operation of law at 75; appeal stretches to 90
- TRAP 30 — six-month restricted appeal, **plus** the roll-forward-to-next-business-day behavior

**From the discovery branch:**
- TRCP 194.2(a) — initial disclosures 30 days after first answer/appearance
- TRCP 198 — RFA deemed admissions
- TRCP 193.2(a),(c),(f) — specificity, good-faith basis, no prophylactic privilege objection
- **TRCP 193.2(e)** — waiver by obscuring (the linchpin)
- TRCP 196.2(b) — four permissible RFP responses (anti-dribbling)
- TRCP 215.1(c) — evasive or incomplete = failure to answer
- TRCP 191.2 — meet-and-confer certificate predicate

**New, practice-derived rather than rule-derived:**
- **Deposition scheduling buffer** — ~2 months, tunable (H36); evidentiary basis unverified (H37)

---

## PART 12 — WHAT MUST HAPPEN NEXT (process, not content)

1. **Move the handoff.** Claude cannot write to the repo — the project mount is read-only. Nothing below has been written anywhere.
2. **Append** the session-log entry to `docs/specs/session-log.md`. Never rewrite history.
3. **Add** this capture as `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25e.md`.
4. **Do not fold into `case-heartbeat-design.md` yet.** The design doc gets the confirmed rulings only after a Code session reconciles them against what is already in §8.11–8.12 — several items here (H28, H31) *close* things the design doc currently carries as open, and duplicate routing is the failure mode.
5. **Nothing enters the build queue.** D3/H8 still gates T1. The deficiency submodule is parked pending H35. No build items from this session.
6. **Resume** at H39 — the deposition fork.

**Standing caution:** the design-side view lags repo state. Nothing in this capture should be read as a statement about what is currently built. Check the synced session log first.
