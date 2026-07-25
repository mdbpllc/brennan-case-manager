# Case Heartbeat — Suit-Filed Walkthrough, Voice Capture (2026-07-25, session 3 "c")

**Status:** RAW CAPTURE — voice session, design-side. Not canonical, not a design doc, not in the build queue.
**Canonical repo path (when adopted):** `docs/specs/case-heartbeat-walkthrough-capture-2026-07-25c.md` — does not exist yet.
**Supersedes:** `case-heartbeat-suit-filed-addendum-2026-07-25c.md` (written mid-session to outputs; its full content is folded in here — do NOT route both).

**HOW TO USE THIS IN THE NEXT CHAT:** Upload this file (or the handoff pointing to it) and say "resume the heartbeat walkthrough at the H14 resume point." Claude should re-read PART 3 and PART 6, then pick up with the exact question in **RESUME POINT** below. Fold this capture into `docs/specs/case-heartbeat-design.md` §8 (fold-in-not-branch pattern) — a new §8.10 "Suit filed" section replacing the "not yet walked" placeholder for that stage only.

**RESUME POINT (mid-H14):** The pre-service arming chain (file → acceptance → request citation → citation issued) is walked. The actual **service chase after citation is in hand** is NOT: (a) what a *touch* looks like — process-server follow-up? checking the court record for the return of service? — and (b) whether service is a **fan-out, one thread per defendant** each on its own clock. Both were asked; Michael answered with the filing/citation process instead, so both remain open. Ask them again, in that order.

**Also still pending from before this thread:** Michael's rulings on §10 (D1–D10, D3/H8 blocks T1); Claude's two session-start observations (fold primitives #14/#15 into §3 before ruling D3; possible H4+H20 collapse into one ruling); confirmation whether Code already applied the 2026-07-25b artifacts; registry entries 1–10 sign-off; FLP/MCP setup (promo ends 8/6).

---

## PART 0 — SESSION SHAPE

Mixed voice/text. Resumed the PI walkthrough at H14 (suit filed / service chase) after processing the 4-file zip from session 2. Michael cut the session when the system got slow ("wrap this up, push it to code, and give instructions to have us continue on this"). Everything below is from the live voice stretch; the mid-session addendum written to outputs covered only the first half (H23/H24) — this capture is complete.

## PART 1 — LIMITATIONS AS A CROSS-CUTTING MASTER CLOCK [CONFIRMED, H23]

Raised by Michael unprompted the moment suit-filed opened. In substance, verbatim where quoted:

- Statute of limitations "is something that we should be looking at from day one from client intake." Not a suit-filed concern that appears late.
- "We blow statute of limitations… it doesn't matter if we're not done with medical treatment. There's no case anymore." It overrides everything, including treatment status — the one failure that voids the whole case regardless of upstream health.
- At suit filed, limitations "is going to affect the urgency of getting service on defendants." Same unserved defendant = gentle nudge with two years of runway, five-alarm with 60 days left, because **limitations is satisfied on service, not on filing the petition**.
- Explicit instruction: "put a note in this file that Code needs to think about that, and it needs to go into consideration when we go back through and do a run-through on the system." → wire into BOTH intake (§8.1) and suit-filed stages.

Structurally: runs underneath the whole lifecycle like the negotiation track (parallel, not a stage) — but where negotiation is judgment-only, limitations is a **hard computed clock**. [Claude's framing, unobjected — PROPOSED as phrasing, the substance is CONFIRMED.]

## PART 2 — HARD RULE: FILE ≥ SIX MONTHS BEFORE LIMITATIONS [CONFIRMED, H24]

"We need to not wait to file a lawsuit for any time after six months until statute of limitations… it needs to be a hard deadline." Not a nudge. Michael has pushed filings to the last minute before ("I've handled it before, it is possible") but three reasons forbid it:

1. **Citation issuance is out of your hands** — "sometimes it takes the court a long time to get your citation issued."
2. **Service takes time** — tracking down defendants is slow, and "you only meet the statute of limitations not when you file the petition, but when you serve the defendant."
3. **The late-discovered defendant** — you file, serve, litigate, limitations passes, "and then you find out later… there was another defendant that was the one that's really involved, and trying to get them involved at that point is basically impossible."

**Unconditional-buffer ruling [CONFIRMED]:** Claude asked whether the buffer flexes with how complete the defendant picture looks. Michael: "It really should be the buffer either way because there's no way to know if we've gotten all the defendants." His example: get into the lawsuit, defendant claims brake failure, proof surfaces, "now we need to sue whoever did their brakes." → **Six months, flat, regardless of how clean the defendant list looks on filing day. "Just leave it as a hard rule."**

**Registry candidate [CONFIRMED — Michael: "Yes."]:** a hard interval with legal consequence → registry entry with cite before it drives anything (design §7.2 discipline, same as the 60-day insurer notice). UNVERIFIED, attorney-only sign-off. Reason 3 implies the buffer protects the ability to *name* new defendants, not just serve known ones — note this in the registry entry's rationale.

## PART 3 — THE PRE-SERVICE ARMING CHAIN [CONFIRMED]

Michael gave the process before answering the touch/fan-out questions (which therefore remain open — see PART 6):

1. **File the petition.** Sometimes citation is requested simultaneously with filing; sometimes the request for issuance comes later. (Two variants of the same chain — do not smooth into one.)
2. **Wait for acceptance.** Filing accepted-or-not arrives "via an email from the e-filing system." Michael raised, unprompted: "we already know the email address that this is gonna come from… maybe [the system] could auto-trigger the next steps once it gets that email in." → the ONE detection-worthy hop in the chain (see PART 5).
3. **If accepted → file the request for issuance of citation** (if not already requested at filing).
4. **Wait for citation to issue.** "This can have a same-day turnaround, or this could be three weeks." Large variance. **Follow up weekly until it issues.**

### The clerk-relations constraint [CONFIRMED — a real design constraint]

"You really don't want to annoy these clerks… the clerk's office realizes that Michael Brennan is a huge pain, they're gonna remember that in the future, and when they see my filings come across their desk, they might not be as gracious. So it'll be delicate with them, but I do need to be reminded."

→ The escalation ladder during the citation wait can get **louder at Michael** but must **never translate into leaning harder on the clerk**. [Claude's framing that this is near-inverse of the demand-expiration daily-nag case — PROPOSED, unobjected.] The counterparty's institutional memory is a first-class constraint on outward cadence; inward cadence (reminding Michael) is unconstrained by it.

### Citation arrival — four channels [CONFIRMED]

Citation can arrive by: (1) **mail**, (2) **pickup at the clerk's office**, (3) **email from the clerk's office**, (4) **e-filed by the clerk** (copy arrives via e-file email). No single place to check.

## PART 4 — WHOSE PROBLEM IS "DID IT COME IN" [CONFIRMED]

"For right now, it's a me-remembering problem, but when I have a paralegal, that'll be a them problem. That's a workflow they're gonna follow up. It's gonna be a human-following-up problem."

→ The system's job is not to detect citation arrival; it is to reliably surface the "go check" nudge to whoever is the human that day (Michael now, paralegal later). Citation arrival is a **declared** state — somebody says it came in; the system never tries to sense it across four channels.

## PART 5 — THE ONE DETECTION EXCEPTION [CONFIRMED]

Claude put it directly: the acceptance email (known sender) is the one place worth wiring for detection, everything downstream stays a remembering problem the system refuses to let you forget. Michael: **"Yeah."**

→ Maps onto the declared-vs-detected primitive (§6.2 #5): one detected transition (e-filing acceptance email → auto-arm next step) at the head of the chain; all subsequent transitions declared. Implementation scope for the auto-trigger is a Code-side consideration, not a design ruling beyond this scope line.

## PART 6 — WHAT WAS NOT COVERED (the unwalked remainder of H14 and beyond)

- **The service chase proper** — touch definition after citation in hand (process server follow-up? checking court record for return of service?). ASKED, UNANSWERED.
- **Per-defendant fan-out** — one thread per defendant, each on its own clock (3 defendants, 2 served, 1 open → hound only about the one)? ASKED, UNANSWERED.
- Per-defendant rhythm and how hard to lean on an unserved defendant (the original H14 framing).
- How the limitations clock (PART 1) mechanically modulates the service ladder — established as the modulator, mechanics unwalked.
- Everything after suit filed: defendants served · answer received · disclosures sent · experts designated · discovery · mediation · trial prep · trial · settled · closed.

## PART 7 — CROSS-CUTTING PATTERNS SURFACED THIS SESSION

1. **Counterparty institutional memory constrains outward cadence** (clerk case) — extends primitive #11 (counterparty's machinery sets cadence): here the counterparty's *memory of you* caps escalation outward while leaving inward escalation free. Candidate primitive #17 for §6.
2. **Master clocks vs stage clocks** — limitations is the first clock that belongs to no stage, computed from intake, and *modulates* other threads' urgency rather than owning a thread of its own (or does it own one? unruled — see H26).
3. **Arming chains** — suit-filed opens with a strict sequence (file → accept → request → issue) where each step arms the next; first appearance of a multi-hop chain with one detected hop and the rest declared.

## PART 8 — OPEN ITEMS (new + touched)

| ID | Item | Status |
|---|---|---|
| **H23** | Limitations as cross-cutting master clock: computed from intake, modulates service-chase urgency. Wire into §8.1 AND suit-filed. Explicit note for Code's system run-through. | **NEW — CONFIRMED design, for Code run-through** |
| **H24** | Hard rule: file ≥ 6 months before limitations, unconditional buffer, three-part rationale. | **NEW — CONFIRMED; registry candidate (cite needed, attorney sign-off)** |
| **H25** | Is the acceptance→citation chain two (or more) separate armed threads, or ONE thread advancing through checkpoints? | **NEW — asked, unanswered** |
| **H26** | Does limitations own its own thread (a case-level backstop that can override quiet hours when close), or is it purely a modulator on other threads? Claude proposed the backstop framing early; Michael redirected to the six-month rule without ruling. | **NEW — PROPOSED, redirected, unruled** |
| H14 | Suit-filed walkthrough | **MID-STREAM — resume point above** |
| H21 | Service-diligence registry entry (case-law cite) — reinforced: H24's buffer is what protects the diligence gap | Carried, undrafted |
| H22 | Registry queue arithmetic — grows again with H24's candidate | Carried |

## PART 9 — WHAT MUST HAPPEN NEXT (process)

1. Code applies the handoff (session-log entry + this capture to its canonical path; run duplicate-routing checks — note the superseded addendum).
2. Next design session: **first task** — review synced session-log top entries (standing convention), then resume at the RESUME POINT questions, in order.
3. Fold this capture into design doc §8 as the suit-filed section (partial, mid-stream flagged).
4. H24 → draft registry candidate entry (unverified) when the registry queue is next worked; H21 alongside it.
