# Case Heartbeat — PI Walkthrough Capture, Service Chase + Answer Received (2026-07-25d)

**Status:** RAW CAPTURE — design-side voice/text session, Fable 5. Not canonical, not a design doc, not in the build queue.
**Canonical repo path (when adopted):** `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25d.md`
**Folds into:** `docs/specs/case-heartbeat-design.md` §8 (suit-filed subsection completed; answer-received subsection new). Fold in — do not branch.
**Supersedes:** nothing. Continues the series after `-2026-07-25c.md`.
**Sync caution:** the design side's view of repo state is as of the last synced session-log entry. Section numbers below (§8.10 etc.) are as-of-last-sync and must be verified before folding.

**How to use this in the next chat:** this closes H14 (suit filed / service chase) and opens the litigation spine at answer-received. The next design session resumes at the **discovery phase proper** — initial disclosures, Michael's first set of written discovery, their responses, then depositions, experts, mediation, trial prep.

---

## PART 0 — WHERE THIS PICKS UP

Prior session ended mid-H14 with three questions on the table: (a) what a service-chase touch actually looks like once citation is in hand; (b) per-defendant fan-out; (c) how limitations mechanically modulates the ladder. All three are closed here, plus two items Michael added (the service-completion gate and the Rule 99(b) read), plus a full walk of the answer-received stage.

Carried in as already CONFIRMED from prior sessions: limitations is the cross-cutting master clock (H23), watched from intake, and is met on **service**, not filing. The hard six-month filing buffer (H24) is a registry candidate. The pre-service arming chain runs file → e-filing acceptance email (the one detection hop) → request citation issuance → citation issues. Clerk-relations constraint: escalation gets louder *at* Michael, never harder *on* the clerk.

---

## PART 1 — THE SERVICE-CHASE TOUCH (family of §3.4 email profile)

**[CONFIRMED] The touch is a handoff, not a chase.** Michael uses one process server: **Kelly Foland**, who has **two email addresses** (both used). The touch is a single well-formed email carrying the citation, the petition, and any other context helpful for her downstream server. In Michael's words, "she generally gets the job done. I generally don't have to follow up on her."

Consequence for the heartbeat: silence from Kelly means *working on it*, not *blind*. This is the reliable end of the §3.4 communication-profile spectrum, and the thread should stay quiet by default.

**[CONFIRMED] The rush flag is the critical field, and it is the thread's entire personality.** One flag drives three separate things at once:

| What the rush flag drives | No rush | Rush / super rush |
|---|---|---|
| Subject-line tone | softer text, "no rush" | "RUSH" in caps |
| Email body | plain handoff | seeded with the statute date |
| Follow-up interval | ~every 2 weeks | down to ~every 2 days |

Michael's real example from this week: *"Hey, it's a rush. Statute runs in fifteen days, on August fifth."* — so Kelly knows the date.

**[CONFIRMED] Do not hardcode the example.** Michael interrupted specifically to say this: "make sure you don't get stuck on August fifth. When I'm saying August fifth, I'm talking about the statute of limitations." August 5 is this week's value standing in for whatever the limitations date is on a given case. The interval scales off the real date.

**[CONFIRMED] Pre-fill the rush line.** When the limitations clock is inside some window, the drafted email should already carry "RUSH — statute runs on <date>." This is H23 doing real mechanical work rather than modulating urgency in the background. Michael added a reason worth keeping: it is *good* for Kelly to get conditioned to seeing a particular subject-line shape from him, so the signal reads instantly.

**[CONFIRMED] Cadence is a continuous gradient, not a switch.** Two weeks at no-rush, tightening continuously to two days at super-rush as the statute closes. Not a two-state toggle.

**[CONFIRMED] All escalation aims inward at Michael. The system never sends to a counterparty.** Michael: "the escalation here is aimed entirely at me. I should be the one following up... and any follow-up emails should come directly from me, drafted from me. So there's no mistake in sending some email that might look ugly just because maybe you just didn't know what tone to send it out in."

Generalizes past Kelly into a principle: **the system drafts, the human sends.** Tone with a real person is exactly the thing an automated push gets wrong. Same family as the clerk-relations constraint, but for a different reason — the clerk constraint protects institutional relationships; this one protects tone.

**[CONFIRMED] At the close end, the nudge stops being a nudge.** Michael, unprompted and emphatic: "it needs to be more than a nudge to me. It needs to be like a slap of the face to me." Loudest register the system has, because unserved-at-limitations is the failure mode that voids the whole case.

---

## PART 2 — PER-DEFENDANT FAN-OUT AND DIFFICULTY PROFILES

**[CONFIRMED] One handoff, N watched clocks.** Michael often sends Kelly a single email listing all defendants. The handoff is one action; the tracking is per-defendant. The system watches a separate return-of-service clock per defendant. The parent "get everyone served" thread is not done until all children are, but it goes silent on the served ones and escalates only on whoever is still out. Family resemblance to the §3.3 per-provider records-request fan-out.

**[CONFIRMED] Each defendant thread carries a difficulty profile.** Michael volunteered the taxonomy:

| Profile | What it is | Expected friction | Thread behavior |
|---|---|---|---|
| **Registered-agent corporation** | Agent on file with the TX Secretary of State / comptroller; known physical address | Low, essentially deterministic — "someone's gotta go, take it over there, drop it off, and fill out the return of service" | Stays quiet unless the drop-off simply doesn't happen |
| **Out-of-state / no TX registered agent company** | Alternate service methods, extra steps (Michael explicitly declined to parse the methods out in this session) | Higher, more places to stall | Runs warmer; watches intermediate steps |
| **Individual** | "Sometimes easy and sometimes difficult to find out or to locate" | Wildcard | Starts normal; **trapdoor to hard** on a failed locate |

**[CONFIRMED] The profile is set at filing, with a trapdoor to hard for individuals only.** Michael asked "what do you think?"; Claude argued for set-at-filing; Michael answered "I like your suggestion. Let's keep moving." The reasoning, preserved because it is the part that can't be reconstructed:

- Which bucket a corporate defendant falls into is a **fact Michael looks up before serving**, not something discovered by failing. Making the system wait to discover it throws away information already in hand.
- The individual is the genuine exception: an attempt that comes back unable-to-locate promotes the thread to hard, turning on locate / skip-trace behavior, warmer cadence, and prompts about alternate service.
- **Not "easy until proven hard," because limitations is ticking.** Waiting for an out-of-state company to reveal its difficulty by stalling burns two weeks of buffer that may not exist.

A single case can run all three profiles at once — calm about the registered-agent corp, leaning on the unlocated individual — with the same limitations modulator squeezing all of them off different baseline temperatures.

---

## PART 3 — LIMITATIONS MODULATION AND THE PEACE-OF-MIND BOARD

**[CONFIRMED] Limitations only bites on threads still open.** Once a defendant's return of service is filed, that thread is done and there is nothing left to squeeze. An unserved or unlocated defendant with the statute closing goes to full alarm. The master clock tightens whatever is still out and goes quiet on whatever is home.

**[CONFIRMED need, mechanism OPEN — H27] The limitations peace-of-mind board.** Claude asked whether limitations closing in ever makes Michael want to see the *whole* service picture, including the done ones. Michael: yes — "even done ones for peace of mind. So I can actually sleep at night and not wake up at three in the morning in a cold sweat thinking about it."

This is a genuine, principled **exception to the anti-list rule**. Normally the system suppresses closed threads and shows only what's live. Inside some limitations window, the service fan-out surfaces as one consolidated board — every defendant, served and unserved together — precisely so the brain can confirm the served ones are put to bed and stop gnawing. Close cousin of the cascade exception (H18): one causal event (the closing statute) justifies one consolidated view instead of scattered pings.

**Open sub-questions:** what window triggers the board, what it displays, and whether it is pushed or pulled. None of this was ruled on.

---

## PART 4 — THE SERVICE-COMPLETION GATE

**[CONFIRMED] A defendant thread does not die on "served."** Michael raised this himself, in two passes. The thread dies on three things in hand:

1. The **file-stamped return of service** is received;
2. It is **saved/filed into the file system**;
3. The **date of service is logged**.

Kelly saying it's done is not the completion condition. The proof is.

**Why the logged date of service is legally loaded, not bookkeeping:** it is the thing that satisfies limitations (met on service, not filing); it drives the Rule 99(b) answer-date computation; and on a governmental defendant, service diligence is jurisdictional, so the diligence record hangs off that date.

Same interlock family as **primitive #14** (the surgical-check precondition): a state that cannot be declared without the artifact. Generalizes with the DCO gate in Part 6 into a **proof-in-the-record completion pattern** — the thread dies on the filed artifact, not on the action.

---

## PART 5 — TRCP RULE 99(b) ANSWER-DATE READ

Michael asked whether the twentieth day landing on a Saturday or Sunday pushes the answer date to the following Monday, and what the general computation rule does. Claude pulled the rule text from `docs/specs/trcp-deadline-skeleton-2026-03-01.md` §6 rather than working from memory.

**The read:** Rule 99(b) does not say "answer within twenty days." It says the defendant must answer by **10:00 a.m. on the Monday next after the expiration of twenty days after the date of service**. The answer date is therefore *always* a Monday by the rule's own terms. Day twenty landing on a Saturday does not *trigger* the Monday — it merely coincides with what the rule already does for every answer date. Rule 4 (general computation: day of service excluded, weekend/holiday rollover, ≤5-day periods skipping weekends) governs generic deadlines but is superseded here by 99(b)'s own explicit Monday rule.

**[CONFIRMED] The holiday edge case is deprioritized.** If that Monday is itself a legal holiday, Rule 4 would push to the next non-holiday weekday. Michael: "it's so rare that I need to worry about it... it never affects anything I'm doing." His practice when unsure is to check the *following* Monday — always the conservative direction, since erring late only gives the defendant a hair more time before being treated as in default.

**[CONFIRMED] For the build:** compute to the Monday; treat answer-received as a **soft** "go see if they answered" check, not a slap-in-the-face alarm; do not burn tests on the holiday edge. This still needs its own tested function — no generic date library computes "the Monday next after twenty days expire at 10 a.m." — but the stakes are low.

---

## PART 6 — THE ANSWER-RECEIVED STAGE

**[CONFIRMED] Answer received is not a passive unlock. It is the starting gun on Michael's single most important strategic lever.**

Michael's strategy, in his own framing: get a trial date as soon as possible and *keep* it. Don't move it. Push the defense, keep the pressure on, force settle-or-try. "If I have the option and I'm ready to go to trial, I got the option between going to trial in ten months or in two years, I'm gonna take ten months every day of the week, because if I'm just as prepared, defense may not be just as prepared."

**[CONFIRMED] The touch: outreach to opposing counsel within three days of the answer, ideally same day.**

The aspirational form is a **form letter** Michael had at a prior firm and cannot run solo now — "I'm just entirely too busy, and I don't have help to do this." The letter does double duty:

- **Half one, always:** request trial dates so the parties can agree a **Docket Control Order (DCO)** and get it filed — locking the march to trial.
- **Half two, on an MVC:** request **defendant-driver deposition dates** in the same letter, to start calendaring out further. **Gated:** Michael will not take a depo date landing before the defendant's response window on his first set of written discovery, so he walks into the deposition with their answers in hand.

**[CONFIRMED deferral — H29] Letter content is deferred.** Michael: "we're doing so many dynamic things with our data that when it comes time to build that form out... we can really think about what would be the most productive use of our dynamic data that we've created." Flag it as a **form-engine dependency, content TBD**, to be designed after the system is built and the full palette of dynamic data is visible. The letter is a real artifact the answer-received thread hands Michael; only its contents are unresolved.

**[CONFIRMED] The thread stays loud until the DCO is FILED.** Not "letter sent." Not "they replied." Michael, in the clearest statement of the founding failure mode this project has produced:

> "It happens so many times where defendant files an answer, and I'm like, ugh, we've gotta get the DCO entered. And I've got all the best intentions in the world of getting this DCO entered. And then three, two, one, something else comes up, and then boom, I forget about it. And I just don't come back to it. So that's part of the heartbeat deal... it needs to stay alive until it gets done."

This is the ready-to-move demand rotting for weeks, restated in a different stage: the intention is there, something else comes up, and the case goes quiet and stops asking. The completion condition is **DCO filed in the record** — the same proof-in-the-record pattern as the service return.

**[PROPOSED, unruled — H31] The DCO thread should run *warm*, not merely alive-but-quiet.** Claude's argument: dropping the DCO is *self-inflicted* delay that sabotages Michael's own core strategy — every week the DCO sits unentered is a week he is not racing, which is the one thing he said he never wants to give the defense. Michael did not respond to this before moving to wrap. **Not a ruling.**

**[CONFIRMED] Answer received separately arms the disclosure and discovery clocks.** Initial disclosures due 30 days after the first answer/appearance (TRCP 194.2(a) anchor, per the deadline skeleton).

**[CONFIRMED need, mechanism OPEN — H30] The calendar-horizon push.** Michael named the gap himself: "right now, I'm only calendaring things within two months, where I should really be calendaring things in a case up to five months out." That's bandwidth setting the horizon instead of the case setting it. A heartbeat job: push him to place the farther-out markers — depo dates, DCO deadlines, discovery response dates — so the calendar reflects the case's real horizon.

**[PROPOSED, unruled — H28] Trial date as a second master clock.** Claude proposed that the trial date is structurally like limitations but drives the case's *value* rather than its survival: everything downstream (discovery, experts, mediation) hangs off it, and a defense request to move it should fire a loud "they're trying to move your date" alarm because defending the date *is* the strategy. Michael responded by adding the MVC deposition half of the letter rather than affirming the framing. It fits everything else he said and is very likely right — **but he did not rule on it.** Treat as PROPOSED.

---

## PART 7 — WHAT WAS NOT COVERED

- **The discovery phase proper** — initial disclosures, Michael's first set of written discovery, their responses. This is the resume point.
- Depositions beyond the initial defendant-driver date request; experts; mediation; trial prep.
- **Alternate service methods** for out-of-state / no-registered-agent companies. Michael explicitly declined to parse these out: "I don't really wanna parse that out right now."
- **The no-answer fork.** Claude asked a two-part question and Michael answered only the first part. See H32.
- **Work performed *on* the answer document itself.** Also asked, also unanswered. See H33.

---

## PART 8 — CROSS-CUTTING PATTERNS SURFACED

1. **One flag as thread personality.** The rush flag drives subject-line tone, body content, and cadence together. Look for other single fields doing multi-axis work rather than modeling each axis separately.
2. **The system drafts; the human sends to counterparties.** All automated escalation aims inward. Outward tone with a real person stays human. (Distinct from, and additional to, the clerk-relations constraint.)
3. **Difficulty profile set at filing with a trapdoor.** Prefer mostly-knowable-up-front over easy-until-proven-hard whenever a master clock is running, because discovery-by-failure burns buffer.
4. **Peace-of-mind board: an anti-list exception under a closing master clock.** Cousin of the H18 cascade exception. One causal event justifies one consolidated view including closed items.
5. **Proof-in-the-record completion gate.** The thread dies on the filed artifact, not the action — the file-stamped return of service, the filed DCO. Same family as primitive #14.
6. **Second master clock (proposed).** Limitations protects the case's survival; the trial date drives its value.
7. **Continuous gradients over state switches.** Rush cadence scales continuously with proximity rather than flipping between modes.

---

## PART 9 — OPEN ITEMS

| ID | Item | Status | Owner |
|---|---|---|---|
| H27 | Limitations peace-of-mind board: what window triggers it, what it shows, push or pull | Need CONFIRMED; mechanism OPEN | Design |
| H28 | Trial date as second master clock + "they're trying to move your date" alarm | **PROPOSED, unruled** | Michael |
| H29 | Answer-received form letter — content | Deferral CONFIRMED; content TBD post-build (form-engine dependency) | Deferred |
| H30 | Calendar-horizon push (2 months → 5 months) | Need CONFIRMED; mechanism OPEN | Design |
| H31 | Should the DCO thread run *warm* rather than alive-but-quiet? | **PROPOSED, unruled** | Michael |
| H32 | No answer by the Monday — is default judgment a live heartbeat thread, or does Michael give grace / call opposing counsel first? | **OPEN — asked, never answered** | Michael |
| H33 | Is there work done *on* the answer itself (affirmative defenses, counterclaims, responsible-third-party designation) that the thread should prompt? | **OPEN — asked, never answered** | Michael |
| H34 | Rule 99(b) Monday falling on a legal holiday | CLOSED — deferred by explicit ruling; do not test | — |
| H14 | Suit filed / service chase | **CLOSED by this session** | — |
| H25 | Acceptance → citation: separate armed threads, or one thread with checkpoints? | OPEN, carried | Design |
| H26 | Does limitations own its own backstop thread that can override quiet hours, or is it purely a modulator? | OPEN, carried | Design |
| H21 | Service-diligence case-law cite | OPEN, carried | Michael |
| H24 | File ≥6 months before limitations — draft as registry candidate; needs cite + attorney sign-off | OPEN, carried | Michael |
| D3/H8 | Shared touch substrate with the time tracker — one core case-event entity owned design-side. **Blocks T1.** Settle before either module's schema is built | OPEN, carried, **blocking** | Design |

---

## PART 10 — WHAT MUST HAPPEN NEXT

1. Route this capture and the work order per the routing table in `PUSH-TO-CODE_Case_Heartbeat_2026-07-25.md`.
2. Fold Parts 1–4 into the suit-filed subsection of `docs/specs/case-heartbeat-design.md` §8, closing H14. Fold Parts 5–6 in as a new answer-received subsection.
3. Add the Part 8 patterns to §3 as cross-cutting material; add H27–H33 to the open-items register.
4. **Next design session resumes at the discovery phase proper** — initial disclosures, first set of written discovery, their responses — then onward down the litigation spine.
5. Nothing here enters the build queue.
