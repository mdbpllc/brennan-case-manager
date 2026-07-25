# Case Heartbeat — Walkthrough Continuation Capture (2026-07-25, session 2)

**Status:** RAW CAPTURE — mixed voice/text session, design side. **Not canonical, not a design doc, not in the build queue.**
This file records what was actually said in the second 2026-07-25 session. The material has **already been folded into**
`claude_Case_Heartbeat_Design_2026-07-25.md` (revised same day); this capture exists so the raw reasoning survives
independently of the write-up.

**Canonical repo path (when adopted):** `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25b.md`.

---

## HOW TO USE THIS IN THE NEXT CHAT

Upload the **design doc** (not this file) and say: *"pick up the case-heartbeat PI walkthrough — we stopped at suit filed
and the service chase."* Use this capture only to check what Michael actually said versus what Claude inferred.

### RESUME POINT — H14

> **Suit filed / the service chase.** Asked and not answered: at suit filed, what does a touch look like? What is the
> rhythm for chasing service, per defendant? And how hard should the system lean when a defendant remains unserved?

Context that makes it urgent: **Rule 99(a) makes the requesting party responsible for obtaining service, and the rules
set no deadline for it.** The diligence requirement that can defeat a limitations-saving filing is case law. So the most
catastrophic clock in the litigation phase is one no rule states — a heartbeat problem by definition, not a
deadline-engine problem.

**Also still pending from before this thread:** time-tracker fee-basis-profiles review (§3 schema-ownership call, D1–D4,
the nine §7 registry entries); registry entries 1–10 (Entry 1 qualified-LOP, Entry 4 fatal-defect conflict as
priorities); FLP account + MCP connector setup (promo ends 8/6); `BUILD-SESSION-NOTES.md` review; edge-function deploys
per `docs/statute-cache-setup.md`; Citizens MRF path into CLAUDE.md; OAA remaining tabs.

---

## PART 0 — WHAT THIS SESSION DID

1. Wrote the case-heartbeat **design doc** from the first 2026-07-25 voice capture (stages 1–5 architecture).
2. Resumed the PI walkthrough, resolving **H6** and walking **stages 6 through 9** (records collection, demand drafted,
   demand sent, negotiation).
3. Michael uploaded the **Texas Rules of Civil Procedure, text effective 2026-03-01** (370 pp.), which produced a
   **deadline skeleton** of registry candidates for the litigation spine.
4. Revised the design doc same-day to absorb items 2 and 3.

All design-side. Nothing entered the build queue.

---

## PART 1 — STAGE 5 CORRECTIONS

### 1A. H6 RESOLVED [C]
**Question:** does declaring "treatment complete" auto-fire records-and-bills requests to every provider, or open the
stage only?

**Michael:** *"Open the stage, pull the trigger on each provider's request by hand."*

Claude's read, offered and not contradicted: this extends the declared-state logic down to the provider level — ripeness
can be true for four providers and false for a fifth who still owes a visit note.

### 1B. The pre-completion surgical check [C — raised by Michael himself, unprompted]
Michael interrupted the move to the demand stage to add a gate **upstream**:

> Before treatment is marked complete, make sure the client **is not surgical**. Sometimes a doctor releases the client,
> or the client just stops going. Sometimes a client has **positive MRI findings that show they could possibly need a
> surgical recommendation.**

So: a **safety interlock on a declared transition.** A release and a stoppage both look like completion, and neither
rules out surgery.

Claude's framing, offered and not contradicted: this points the *opposite* direction from the rest of the subsystem.
Everywhere else the fear is a case dying in silence; here it's a case dying **prematurely** — rushed to demand while
secretly worth many times more.

---

## PART 2 — STAGE 6: RECORDS COLLECTION [C]

### 2A. Two request types, two cadences
Michael: *"there's two different types of records requests."*

| Branch | Cadence | Michael's words |
|---|---|---|
| **He sends it himself, straight to the provider** | **Weekly** until records are in | *"I'm gonna wanna follow up once a week until I get those records in. And that's generally enough."* |
| **Third-party retrieval vendor** | **Every ~2.5–3 weeks** | *"I'll wanna maybe follow up every two and a half, three weeks."* |

### 2B. Why the vendor is quieter [C]
> *"The vendor's already got their systems in place to follow up on requests. So I don't wanna bug them too much, but if
> it's been three weeks, I might reach out to them, say, hey, just checking in. Is everything cool? Like, is the request
> going well?"*

Claude's characterization, accepted in substance: on the vendor branch he is **supervising the chase, not doing it.**
Claude noted this generalizes the provider-profile idea — an entity with its own follow-up machinery earns a slower,
different question.

**OPEN (H19):** whether a stalled vendor thread ever escalates to contacting the provider directly was asked and
**never answered**. Michael's answer described reaching out to *the vendor*.

### 2C. Arrival is not the close — the verification gate [C]
Asked whether "records in" closes the thread. Michael's answer, near-verbatim in substance:

1. **Copies must be clean** — *"that I can read them, that we can use them."*
2. **Business-records affidavit page count must match the attachment.** His example: the affidavit says *"attached are
   fifty-four pages of medical records of so-and-so,"* and *"there's actually sixty-two pages attached. That's not gonna
   work. That's not gonna be authenticable. I can't authenticate that."*
3. **Billing affidavit amounts must be correct** — *"sometimes the billing affidavit is gonna have the wrong billing
   amounts on there or it's gonna be messed up."*
4. **Both affidavits must actually be notarized** — *"maybe either one of the affidavits won't actually be notarized."*

> *"So, yeah, I need to do a quick revision when they come in. And once we revise them or once we go through and check
> them and make sure they're good, then we can mark them complete."*

Claude's structural framing, offered and not contradicted: the close is a **declared QC pass, not a delivery event** —
same declared-vs-detected distinction as treatment complete, applied to an inbound artifact. And this is a silent-rot
hotspot: a timer reads delivery as success while an unauthenticable affidavit sits waiting to surface at demand or trial.

### 2D. Defective affidavit → hotter cadence [C, explicit]
**Question:** does the revision chase run at the same weekly cadence, or hotter, since it's a known problem in hand
rather than an unknown one out in the world?

**Michael:** *"I would say it would have a little bit more urgency than the one before. I'd say reach out to them in,
like, two to three days."*

### 2E. Records vs. billing — the split [C on the behavior, P on the default]
**Michael's answer, verbatim in substance:** *"Classic lawyer answer. It depends."* — maybe he's in a rush and
absolutely needs the records now. *"You could ask me if I wanna mark the medical records portion done and just follow up
with the billing, or ask me if I wanna just keep the whole thing open. What do you think?"*

- **CONFIRMED:** the system **asks** at that moment.
- **PROPOSED (Claude, unaffirmed — Michael moved to the demand stage next):** default to **one coupled thread with two
  internal components**, splitting only on demand, rather than pre-declaring two sub-threads on every provider.
  Rationale offered: the common case closes together, and the split is structure the case reveals rather than something
  to guess at up front. → **H15.**

---

## PART 3 — STAGE 7: DEMAND DRAFTED [C]

### 3A. The precondition
Michael: he drafts *"because I have now confirmed that I have all the damages, so I know what all the damages are, I can
calculate them, I've got the proofs."* Which means Stage 6 fully closed.

### 3B. Named sub-components
- **Medical chronology.** *"I pay for this one software that puts together medical chronologies."* He notes there has
  been prior discussion of possibly building this in-system. Either way, *"we need to get a medical chronology put
  together."* → dependency fork, **H16**.
- **Facts section.** *"I may just use AI to put some stuff together on that, give me some ideas."*
- **The target:** *"a really clean, flowing narrative that's easy to read for the adjuster, and that includes everything
  that the adjuster needs to know to fully evaluate the case."*

### 3C. Heartbeat stays LOUD on a half-drafted demand [C, explicit]
**Question:** should a started-but-unfinished demand be its own nagging thread, or does he want to be left alone once
writing?

**Michael:** *"Yeah. I want the heartbeat there because I should have the tools in place to where it's not gonna take me
that long to put this together… with aids to help me with putting the facts together and the medical chronology… It
should not be hard at all. I should be able to sit down, pump this thing out in, like, twenty, twenty five minutes. So,
yeah, keep the heartbeat up on it."*

Claude's observation, offered and not contradicted: **this is the intake argument again, at the far end of the
lifecycle.** The tools collapse the effort, so relentless nagging is fair — now confirmed independently at both ends.
And this is the stage the whole subsystem exists for: a ready-to-move demand rotting for weeks is the founding failure.

---

## PART 4 — STAGE 8: DEMAND SENT [C]

### 4A. One action arms THREE touches (the earlier two-clock example was incomplete)

1. **Five-day check-in.** *"After I send the demand out, I'm gonna follow up with them in, like, five days… I just check,
   make sure that they receive the demand, make sure that they've got everything they need, and just do a basic check-in
   with them."*
   **Weekend/holiday rule [C]:** *"they could land on a Saturday or a Sunday or a holiday. So if that's the case, choose
   the day before that to reach out to them."* → roll **back**, never forward.
2. **Deliberate silence.** *"After that, I don't really follow up until the demand expiration date."*
3. **Expiration backstop.** *"I'll call them on the demand expiration date if they haven't called me yet, and then we'll
   talk about it."*

### 4B. Demand type sets the deadline unit [C]

| Type | Deadline |
|---|---|
| **Third-party** insurance demand | **15 calendar days** — *"I give them fifteen days, period. Fifteen calendar days."* |
| **First-party** insurance demand | **15 business days** — *"the follow-up is basically the same except it's not fifteen calendar days, it's fifteen business days."* |

The five-day check-in is identical on both.

**OPEN (H20):** whether the five-day check-in is universal on every demand was asked and never answered — Michael moved
to describing response types.

### 4C. Expiration branches three ways [C]

Michael: *"there's two different communications they can come back to me with"* — then described a third (no response).

| Branch | What happens |
|---|---|
| **An offer** | *"If we get an offer, then we've got negotiating from there."* → hands off to the negotiation track |
| **"We need more information"** | A letter saying *"we are evaluating your claim, and we still don't have everything we need to fully evaluate it,"* generally with a list. *"That's why I called them at five days to try to make sure I prevent that from happening. But some insurance companies, that still happens."* → **"I need you to constantly nag me until we get that information out to them. And then from that point forward, we'll follow up weekly on the status."** Two clocks: loud on him, then weekly on them |
| **No answer at all** | *"Give me a daily reminder to follow up with them until either I resolve it or not."* Plus a one-tap escape: *"you can have an option on there where I can just turn it off and don't get reminders on this anymore. Just mark it complete because, really, the next stage from there, if they're not responding to me, is me filing a lawsuit."* |

Claude's framing of the escape, offered and not contradicted: marking complete here does **not** mean resolved — it
means *"I have decided to stop demanding and start litigating."* The case goes quiet **by decision**. That is P1 in its
purest form, and a clean declared transition into suit filed.

---

## PART 5 — STAGE 9: NEGOTIATION IS A PARALLEL TRACK [C]

### 5A. Michael's own framing
> *"Negotiation phase keeps going even when we file a lawsuit. There's still negotiation phase. They're still
> negotiating, we're still negotiating even if we go to trial. We could be at trial, we could have gone through, put our
> case on, the defense put their case on, and we all did closing statements, and the jury is in deliberation. We're
> still in negotiation phase. There's always room to negotiate until the jury verdict comes out."*

So: **not a stage. A continuous track running underneath the entire spine**, closing only on settlement or verdict.

### 5B. No prescribed workflow [C]
> *"I can't really think of what would be the different steps on that because it really depends. It's case by case. And
> who knows? Maybe in the future, I'll come up with a really good idea… but that's something I just do on my own for
> now."*

Claude's position, offered and not contradicted: every other stage has a teachable rhythm; imposing one here would be
inventing structure the case doesn't have.

### 5C. What the track carries [C — Michael: *"I do like what you say"*]
**Last touched**, plus **current posture as the spread** — Michael's own correction to Claude's phrasing: *"more like a
high demand from us, low offer from the insurance company."*

### 5D. Placeholder track [C, explicit]
> *"Put that placeholder track in there, empty on purpose, so it'll pop up later, and the structure will be there to
> build out."*

Seeded-not-closed, same discipline as the pre-suit checklist.

### 5E. Why it still gets a pulse (Claude, not contradicted)
A live negotiation with no next-action is the easiest thread to let go quiet, and the posture is plaintiff-side with
money on the table — silence is the enemy. → **pulse cadence unspecified, H17.**

---

## PART 6 — THE TRCP UPLOAD

### 6A. What Michael provided and said
He uploaded the **Texas Rules of Civil Procedure, text effective 2026-03-01** (370 pp., clean text layer). His words:
*"Everything you need to know about deadlines is in here, except for specific local rules. The specific local rules will
be located in the specific court and judge contact profiles that we spoke about in an earlier project."*

### 6B. Michael's own framing of the discovery levels [C, his statement, before extraction]
- **Level 1** — hard deadlines, **more constrained** than Level 2.
- **Level 2** — hard deadlines, **less constrained** than Level 1.
- **Level 3** — *"basically it defaults to all of the Level 2 statutory deadlines. However, if you go Level 3, that means
  that you can change those hard statutory deadlines by agreement in a scheduling order or docket control order or
  docket control plan."*

Extraction confirmed this: Rule 190.4(b) provides that 190.2 or 190.3 limits apply **unless specifically changed** in
the court-ordered plan.

### 6C. What extraction produced
A registry-candidate skeleton, **unverified**, delivered as `claude_TRCP_Deadline_Skeleton_2026-07-25.md`. Headline
findings:

- **The anchor:** initial disclosures due 30 days after the first answer or general appearance (194.2(a)); both the
  Level 1 and Level 2 discovery periods begin there.
- **The cascade:** Level 2's period ends at the earlier of 30 days before trial or nine months after the anchor
  (190.3(b)(1)(A)); expert designations sit 90 and 60 days before that end (195.2). A trial setting can pull the cutoff
  earlier and move both expert deadlines with it — **two-hop derivation.**
- **Rule 166a is RESTRUCTURED** in this text versus the pre-amendment scheme Claude would have recited from memory:
  response 21 days after the motion is **filed**; reply 7 days after the response; hearing/submission not within 35 days
  of filing and required to be set within 60 (or 90 on docket/good cause/movant agreement). **Flagged as a
  current-practice risk independent of the build.**
- **Rule 99(b)** answer date is not service + 20 days — it is 10:00 a.m. on the **Monday next after** 20 days expire.
  Needs its own function and its own tests.
- **Rule 4** carries three different day-counting modes in one paragraph (≤5-day periods skip weekends and holidays;
  longer ones don't; the 3-day mail extension counts them). Needs a legal-holiday table.
- **Service diligence deliberately NOT drafted** — the TRCP sets no service deadline; the consequence lives in case law
  and needs its own registry entry with a case cite (**H21**).

### 6D. Design consequences [D — Claude's, unruled]
- Litigation dates are **derived, never stored.**
- Discovery level determines the **source tier**: rule-derived (1, 2), document-derived (3, from the DCO), and
  local/judge-derived (court profiles). Live Level 3 example already on file: the Curry agreed DCO.
- **The cascade exception to "the list is the bug" (H18):** a schedule change is one causal event with many
  consequences, so a single batched interruption showing what moved is correct. Amended rule: *never a pile of unrelated
  things; one event with many consequences is still one thing.*

### 6E. Filing decision [Claude's recommendation; Michael asked and did not object]
Save as `docs/specs/trcp-deadline-skeleton-2026-03-01.md` — **dated by rules edition, not session date**, because every
entry is true only for that text and the next Supreme Court order supersedes rather than amends it. PDF itself suggested
for `docs/reference/` rather than `docs/specs/`, since it will never diff usefully.

---

## PART 7 — WHAT WAS NOT COVERED

- **The entire litigation spine:** suit filed · defendants served · answer received · disclosures sent · experts
  designated · discovery · mediation · trial prep · trial · settled (pre-disbursement) · closed.
- **Hard gates vs. clocks (H7)** — still unmodeled.
- **The time-tracker fee-basis review** — untouched this session, still deferred.
- **Non-PI case types** — still explicitly out of scope.

---

## PART 8 — OPEN ITEMS ADDED THIS SESSION

| ID | Item | Status |
|---|---|---|
| **H14** | Suit filed / the service chase — touch, per-defendant rhythm, escalation on an unserved defendant | **RESUME POINT** |
| **H15** | Records vs. billing — coupled-with-latent-split, or two sub-threads from the start? | Claude's refinement, unaffirmed |
| **H16** | Medical chronology — third-party product or in-system feature? | Noted, not ruled |
| **H17** | Negotiation-track pulse cadence | Not specified |
| **H18** | The cascade exception to the anti-list rule | Never put to Michael |
| **H19** | Does a stalled retrieval vendor escalate to direct-to-provider contact? | Asked, unanswered |
| **H20** | Is the five-day post-demand check-in universal? | Asked, unanswered |
| **H21** | Service-diligence registry entry (needs a case-law cite, not a rule cite) | Flagged, undrafted |
| **H22** | Registry queue arithmetic — entries 1–10, plus nine from the fee-basis draft, plus TRCP candidates | Carried, undecided |

**H6 is RESOLVED** (open the stage only). H1–H13 carry forward unchanged from the design doc.

---

## PART 9 — PROCESS NOTES

1. **Nothing here was written to the repo.** The project mount is read-only; all three files sit in the outputs
   directory awaiting Michael.
2. **Manual filing was declined in favor of the handoff convention.** Michael asked where to save the skeleton and
   whether that meant local or GitHub; the answer given was that `docs/specs/` exists in both (local clone is the
   working copy, GitHub is post-push), but that he should hold the file rather than file it by hand, so Code can apply
   it with the session-log entry and run the duplicate-routing check against real repo state.
3. **The design doc was revised mid-session rather than superseded.** Stages 6–9, the surgical interlock, and the H6
   resolution were folded into `claude_Case_Heartbeat_Design_2026-07-25.md` so it would not reach the repo already
   stale. That fold-in-rather-than-branch pattern is the intended one for future walkthrough blocks.
4. **The TRCP extraction is design-side reading, not verification.** Registry rule 2 is untouched — every candidate is
   unverified until Michael reads the rule text.
5. **Model:** Opus 5 throughout.
