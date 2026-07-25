# Case Heartbeat / Anti-Staleness Engine — Design Pass

**Date:** 2026-07-25 (revised same day after the second walkthrough block). **Status:** **DESIGN-PARTIAL.** The architecture (§§1–7, 9) is design-complete pending Michael's review of the decision list (§10). The **PI stage catalog (§8) is incomplete by design** — stages 1 through 9 are walked; the litigation spine from **suit filed** onward is not. **Resume point: the service chase at suit filed (H14).** Nothing here is in the build queue.

**Canonical repo path:** `docs/specs/case-heartbeat-design.md`.

**Source of record:** `docs/specs/case-heartbeat-voice-capture-2026-07-25.md` (RAW CAPTURE, 2026-07-25 voice session). Every ruling below is tagged with its provenance:

| Tag | Meaning |
|---|---|
| **[C]** | CONFIRMED by Michael out loud in the 2026-07-25 voice session |
| **[P]** | PROPOSED in that session; Michael did not object but did not rule |
| **[D]** | **New in this document** — design-side proposal, never put to Michael, unruled |
| **[H*n*]** | Open item, carried in the register at §11 |

**Peer, not child.** This is a peer of the time-tracker work, not a footnote to it [C]. The two share a spine — both are fundamentally *"log that a case got touched, on a clock"* — and §7.1 specifies the shared substrate so neither build forecloses the other.

**Caution:** design-side view lags repo state. Nothing in this document asserts build status; check the synced session log before treating any build claim as current.

---

## 1. What problem this solves

Michael started his own practice a year ago and has spent it playing catch-up. Recently he reached several cases that had been ready to move for a long time but that he had been too busy to touch — made the small remaining touches, and *like clockwork* offers came in from adjusters. The cases were not weak. They were quiet.

**The finding: a case's economic outcome degrades from inattention alone, and inattention is invisible from inside the case.** Nothing in a file announces that it has gone quiet. The signal only exists at the portfolio level, and only if something is watching.

So the system must contain, structurally, a mechanism that keeps cases from going stale. Not a reminders feature bolted on — a first-class subsystem, because the failure it prevents is the firm's dominant one.

**What it is not.** It is not a task manager (a task manager holds the tasks a human already decided to create — the problem is the tasks nobody remembered to create). It is not a calendar (a calendar holds dates someone knew about). It is not the deadline engine (see §7.2 — different job, and they must not be built twice).

---

## 2. Principles

**P1 — No case goes silent by accident. [C]**
A case going quiet must be a decision Michael made, never something that happened because he was buried. This is the acceptance test for the whole subsystem: every quiet case is quiet on purpose, and the system can say why.

**P2 — Silence is directional, and the direction comes from posture. [C]**
Silence is not uniformly good or bad.

| Posture | What silence does | Engine behavior |
|---|---|---|
| Plaintiff-side civil (prosecuting) | Silence is the enemy — a quiet file is one everyone forgets and a defendant who stops worrying | Stale = danger. Arm and escalate. Michael's posture on PI and most civil work |
| Civil defense | The other side benefits from quiet — DWOP, limitations | Stale = danger *to us* only in specific respects; the model differs and is not designed here |
| Criminal defense | Silence can be the friend — if nobody talks about it, it may go away | Stale ≠ danger. The engine must be capable of *not nagging*, deliberately |

The engine therefore cannot track *time since last touch* as a universal good. Posture is a required attribute, and every thread inherits which way stale cuts. **Scope note:** only the plaintiff-PI posture is designed in this pass (§3 scope decision). The other two are named here so the model has room for them, not built.

**P3 — Active, not passive. [C]**
Michael chose the heavier build explicitly. A passive radar merely *relocates* the work: it hands over a list, and the human still has to remember what each quiet case needs. His stated reason is the strongest one available — he intends to hire a very good paralegal, and does not want her brainpower spent on *remembering what to do*. Remembering is the mundane work the system absorbs; judgment is what the human is for.

**P4 — The noise constraint. A system that cries wolf gets muted, and a muted system is worse than none [C]**, because then silence is falsely trusted — the exact failure P1 exists to prevent, now wearing a green checkmark.

Therefore: **volume comes from the case — stakes and posture — never from a global user dial.** An adjuster sitting 40 days on a demand should blow up the phone. A pre-litigation matter 90 days out is a quiet line on a weekly report. Same engine, different volume.

**P5 — The list is the bug. [C — load-bearing UX finding]**
Michael's lived failure mode, from Outlook reminders and from a prior firm's case-management system: when many things come due at once, the system presents a scrolling list of green reminder items, and being busy, he dismisses the whole list without reading it. The list *causes* the behavior it exists to prevent. Showing N items and saying "deal with this" hands triage back to a human who is overwhelmed — and triage-while-overwhelmed produces bulk dismissal.

**Design consequence (binding):** the interruption is always singular. The batch survives only as a report Michael chooses to open on a calm Monday.

**P6 — Michael's real annoyance is the spec. [C]**
Tag posture by hand at first, run the engine live on real cases for roughly a month, and let the places where it annoys versus saves define what to automate next. **Design consequence [D]:** the engine must *instrument* its own annoyance from day one (§9.3) — snoozes, dismissals, and stale-armed threads are the tuning dataset, and they are unrecoverable if not captured while the annoyance is happening.

---

## 3. The object model

### 3.1 Thread — the unit [C]

The unit is **one thread on one clock**, not "the case." A single PI file can simultaneously have a demand follow-up armed and an outstanding records request; each deserves its own ping on its own schedule. A case carries several parallel threads; the notification layer serializes them (§5). **This is a small system, not a field on the case.**

Thread attributes:

| Field | Notes |
|---|---|
| `case_id`, `stage` | The stage that opened it (§8) |
| `posture` | Inherited from the case; sets stale direction (P2) |
| `kind` | `completion_driver` \| `response_driver` (§6.4) |
| `next_action` | The human-readable thing that must happen — the text of the ask |
| `due_at` | When it arms |
| `escalation_level` | 0..n (§4.3) |
| `stakes` | Feeds volume (P4) |
| `parent_thread_id` | Set on fan-out children (§6.1) |
| `entity_ref` | The per-X of a fan-out thread: insurer, witness, provider |
| `state` | `open` \| `armed` \| `snoozed` \| `waiting_until` \| `closed` \| `abandoned` |

`abandoned` is deliberate [D]: P1 says a case going quiet must be a *decision*, which means the model needs a state that records the decision to stop. A thread that is closed without completing is not the same object as one that was done, and the difference is exactly what a stale-case audit needs to see.

### 3.2 Touch and outcome — outcome sets the interval [C — key engine insight]

**A touch is not "done, reset." A touch has an OUTCOME drawn from a small closed set, and the logged outcome picks the next interval.** This is what kills the noise problem at the root, as against any fixed cadence.

Michael's own adjuster examples, which generated the rule:

| Logged outcome | Next-clock behavior |
|---|---|
| Called adjuster, **no news** | Short clock — nothing is moving, get back on it soon |
| Adjuster says **"give me two weeks"** | Clock set to that date; the system goes **completely silent** until then. A ping on day three isn't diligence, it's noise about something already known |
| **Demand sent**, 15-business-day response deadline | **One action arms TWO clocks:** a follow-up at the midpoint (confirm they have everything, slip in a supplement) and the deadline itself as a hard backstop |

**The outcome set is closed, not free text.** Shapes identified so far: `no_news` (short clock), `waiting_until_date` (silence until the date), `deadline_with_midpoint` (two clocks off one action). Free text lives in the note field attached to the touch; it never controls the clock.

**[D] Every outcome is a named rule with a default interval, and defaults are editable in one place.** The tuning loop of P6 is worthless if intervals are scattered as literals across stage definitions.

### 3.3 Fan-out — the count comes from the case [C]

Threads whose *count* derives from a fact about the case: one notice **per health insurer**, one contact thread **per witness**, one records-and-bills request **per provider**. A parent thread is not done until every child is. Enter-once discipline is preserved: capture the insurers (or witnesses, or providers) once, and the system derives how many actions are owed.

### 3.4 Per-entity communication profiles [C]

A profile on the *counterparty entity* (initially the provider) that sets **both the expected touch and the meaning of its absence**:

| Profile | The touch | Engine behavior | What silence means |
|---|---|---|---|
| **Silent** | Doesn't call, doesn't email — the only channel is the client | Generate the pressure itself: drive client check-in reminders on a cadence. Runs **loud** | Quiet means **blind**, not fine |
| **Email** | Reliably pushes updates ("client was seen today, scheduled for X") | Inbound email is the expected heartbeat; arm only when the rhythm **stops**. Runs **quiet** | A gap in the rhythm is the alarm |
| **Portal** | Michael logs into their site | Nudge a login — but an inbound email from them also counts and saves the login | Needs an active check unless an email beat it there |

**Universal floor: a phone call with the client always qualifies as a touch, under every profile. [C]**

This is the difference between a dumb timer and a system that knows a treating case has gone dark. The engine never asks "has this case been touched"; it asks *"given this entity's profile, has the expected channel produced a signal — and if not, fall back to the floor."*

**[D] The profile generalizes beyond providers.** Adjusters, carriers, opposing counsel, and courts all have a characteristic silence. Model the profile on a generic counterparty entity now rather than on `provider`, so the second use costs nothing.

---

## 4. The engine

### 4.1 Arming
A thread arms when `due_at` passes with no logged touch. Armed threads enter the serializer queue (§5). Arming is cheap and reversible; it is not an alarm, it is eligibility to be asked about.

### 4.2 What resets a clock — one clock or two? **[H1, unruled]**
The question posed and left open: does *doing something* reset the clock, or does *something coming back*?

- If **sending** resets it: Michael performs perfectly, the adjuster goes dark three weeks, and the system reports a healthy case — silent because *he* acted, while the case dies. This is the exact failure P1 targets.
- If only a **response** resets it: the clock keeps pressuring him while the ball is in their court — annoying, but honest.

**[P]** These are two different clocks, not one: a *did-I-do-my-part* clock and a *has-the-other-side-gone-dark* clock. The second is arguably the more valuable, because it is precisely the stale-case signal that started this. **[D] Recommendation for the ruling:** two clocks, but only the driver clock is allowed to interrupt (§6.4) — the other-side clock reports and escalates rather than pings, so the honest-but-annoying option doesn't reintroduce the noise problem P4 forbids.

### 4.3 Escalation ladder [D — mechanism was never specified in-session]
"Gets louder" needs a definition. Proposed ladder, per level: **(a) channel** — silent report line → in-app → push → repeat-push/SMS; **(b) frequency** — the interval shortens as level rises; **(c) copy** — the ask states elapsed time and consequence at higher levels.

Two constraints: escalation is a function of `stakes × posture × elapsed`, never of user mood (P4); and in a solo configuration escalation **cannot mean routing to a person**, so level is channel-and-frequency only. When staff exist, an assignee dimension slots in at the top of the ladder without changing the levels below it.

### 4.4 Volume from the case [C]
Stakes and posture set the ceiling of the ladder a thread may climb. A pre-suit investigation item cannot reach push-notification volume; a demand backstop starts near the top.

---

## 5. The serializer — the interaction contract

**One thing, one decision, at a time. Never a pile. [C]**

1. A single push: *"Your demand to the Progressive adjuster is eight days out. Did you follow up?"*
2. Two answers only: **Yes, done** / **No, not yet**.
3. **Yes** → log the touch → pick the outcome (§3.2) → the clock resets accordingly.
4. **No** → the only useful next question: **snooze** or **escalate**.
5. Then the next one surfaces.

The user never scrolls, never triages a pile, only answers one yes/no about one case. **The system does the filing.**

**Binding rules on this surface [C except as marked]:**

- **No bulk affordance exists anywhere in the interruption path [D].** Not "dismiss all," not multi-select, not a swipe-clear. P5 says the list causes bulk dismissal; a bulk control in a serialized UI reintroduces the bug through the back door.
- **Snooze requires a duration; dismissal requires an outcome [D].** A dismissal with no outcome is the mass-dismiss reflex wearing a different button. The cheapest legitimate answer must still be one tap — the durations offered are the design work here.
- **The batched list still exists — as a report Michael opens on a calm Monday, never as the interruption. [C]**
- **[D] Queue ordering is a design decision, not an accident** — the order armed threads surface in *is* the triage the system took over from the human. Proposed: escalation level, then stakes, then age; ties broken by same-case grouping so that two asks about one file arrive back-to-back while context is loaded. **New open item H10.**
- **[D] Quiet hours and a per-session interruption budget.** The serializer that asks eleven questions at 9:04 a.m. has rebuilt the list vertically.

### 5.1 The three parts (the summary Michael accepted) [C]
1. **Threads** — a case carries one or more open threads, each with posture, next-action, clock, escalation level.
2. **The engine** — when a clock runs out with no logged touch, the thread arms and gets louder by stakes, not by mood.
3. **The serializer** — never shows the pile; converts armed threads into one-at-a-time yes/no asks; *done* resets the clock; *not yet* offers snooze or escalate; the system does the filing.

---

## 6. Cross-cutting primitives

These recurred often enough across the walkthrough to be built once, as primitives, rather than three times as special cases.

1. **Fan-out threads ("one thread per X")** — per insurer (§8.1), per witness (§8.3), per provider (§8.5). Parent incomplete until every child closes. §3.3.
2. **Triggering question vs. triggering task** — some threads begin as a yes/no prompt that may dead-end or may spawn work; spawned work then behaves like the persistent kind. §8.3.
3. **One action arming two clocks** — demand sent → midpoint + backstop. §3.2.
4. **Completion-driver vs. response-driver** — intake letters are done when *sent*; adjuster threads are only done when something *comes back*. This is the `kind` field, and it is the same distinction H1 turns on.
5. **Declared vs. detected state transitions** — treatment complete is *declared* (§8.5). **[D] Every stage transition needs an explicit declared/detected classification**, because a detected transition that guesses wrong either fires work early or lets a case sit.
6. **Per-entity profiles that define the meaning of silence** — §3.4.
7. **User-extensible touch lists** — seeded, never closed; grows from live cases (§8.3). A checklist written from memory is always missing the item the actual file demanded.
8. **Urgency is per-stage, not global** — intake is flat-max (§8.1); pre-suit is explicitly gentler (§8.3); everything after is undetermined (**H3**).
9. **Delivery is not completion — the verification gate** (§8.6). An inbound artifact arriving trips a QC check, and only a declared pass closes the thread. Generalizes: any thread whose completion depends on the *quality* of what arrived needs a gate, not a delivery event. This is where cases rot invisibly, because a timer reads delivery as success.
10. **A known problem in hand outranks an unknown one in the world** (§8.6). The defective-affidavit loop runs at 2–3 days against a weekly chase. Concrete fixable defects get more heat than open waiting.
11. **The counterparty's own machinery sets the cadence** (§8.6). A retrieval vendor with its own follow-up process gets a slower, supervisory check-in rather than a chase. Same family as the provider profiles (§3.4) — the entity's behavior, not the task, picks the interval.
12. **Latent structure, split on demand** (§8.6). Records and billing ride as one coupled thread and separate only when reality forces it. Don't make the human declare structure up front that the case will reveal.
13. **The cheaper the action, the more license to hound** (§8.1, §8.7). Confirmed independently at both ends of the lifecycle. This is the standing justification for maximum urgency, and it is *conditional* — if the tooling doesn't actually collapse the effort, the license evaporates (§7.3).
14. **Interlocks on declared transitions** (§8.5). The surgical check is not a nag but a precondition — a question that must be answered before a state may be declared. Distinct from both gates (which block workflow) and clocks (which nag).
15. **Parallel tracks vs. spine stages** (§8.9). Negotiation runs alongside the entire lifecycle rather than occupying a position in it. The model needs both shapes; a stage-only model cannot express it.
16. **One-tap escape as a recorded decision** (§8.8). Turning off the daily demand nag *is* the decision to litigate. Escapes should write a decision, not merely silence a thread — this is what makes P1 auditable.

---

## 7. Boundaries with existing systems

### 7.1 The time tracker — shared touch substrate **[H8]**
Both subsystems are "log that a case got touched, on a clock." They must not be built twice.

**[D] Recommended direction — the same shape as the `claims` finding in the fee-basis review:** the case-event/touch record is a **core case-model entity owned by the design space**, and both the time tracker and the heartbeat are *consumers* of it. A touch logged for heartbeat purposes carries the fields the heartbeat needs (thread, outcome, next interval); a time entry carries the fields the fee affidavit needs (duration, timekeeper, claim tag). Shaped by whichever module gets built first, the table will be wrong-shaped for the second one.

Not designed here; flagged as the boundary that must be settled *before* either module's schema is built, not after.

### 7.2 The registry and the deadline engine — **legally-consequential intervals are registry entries, not constants [D]**
The 60-day insurer-notice backstop (§8.1) is not a preference; it is a legal rule with a cite, and CLAUDE.md's registry discipline governs it. **The heartbeat must not hardcode any interval that has legal consequence.** It consumes the rule; the registry owns it; the deadline engine computes the date.

Division of labor: **the deadline engine says when something is due. The heartbeat says how hard to push before then.** A missed statutory deadline is not a heartbeat failure mode — it is a deadline-engine failure mode that the heartbeat's nagging is meant to prevent.

**Consequence:** the 60-day figure needs a registry entry with a cite and verification status before it drives anything. Recorded here as unverified [C as Michael's practice; not verified].

### 7.3 The form engine — why relentless nagging is fair
Michael's second reason for flat-max intake urgency is that clearing the nag costs about two seconds with the form builders in place. **The heartbeat's ask should therefore carry the action, not just the reminder [D]** — "did you send the LOR?" with a *generate it now* affordance. A nag that requires navigating elsewhere to clear costs more than two seconds, and the fairness argument for maximum urgency weakens accordingly.

### 7.4 Hard gates **[H7, not raised in-session]**
The PI spec already settles several blocking gates: UM/UIM consent-to-settle, PR appointment, tax-allocation hard stop, pre-disbursement lien clearance, minor-settlement sub-workflow. **Gates block; the heartbeat nags.** The interaction is unmodeled, and the failure mode is obvious once named: a thread escalating toward a push notification about work that a gate forbids doing is precisely the cry-wolf event P4 forbids. Proposed shape to rule on: a gate *suppresses* the threads it blocks and *arms a thread on itself*.

### 7.5 PI flags and the status list
Conditional arming reads existing `PI_FLAGS` — litigation hold when there's a company or evidence-holder, TTCA notice on a government defendant. No new invention needed [C].

**Spec-feedback flag [H9]:** folding "Notice letters out" into intake (§8.1) affects `STATUSES._piDefault` in `caseTypes.ts` / project-instructions §8. Decide whether the *status* stays as-is while the heartbeat treats it as one stage, or whether the status list itself changes. **[D] Recommendation: leave the status list alone.** Statuses are the client-and-court-facing narrative of where a case is; heartbeat stages are an internal grouping of threads. Collapsing the former to serve the latter trades a visible artifact for an invisible convenience.

### 7.6 The TRCP deadline skeleton and the cascade exception

The litigation half of the lifecycle runs on court-imposed clocks, extracted design-side into `docs/specs/trcp-deadline-skeleton-2026-03-01.md` (registry candidates, **unverified**, from the rules text effective 2026-03-01). Three findings there bear directly on this design:

**1. One anchor computes most of the case.** Initial disclosures fall 30 days after the first answer or general appearance, and both the Level 1 and Level 2 discovery periods begin when those disclosures are due. So a single detected event — the first answer — derives the spine.

**2. Litigation dates are derived, never stored.** Under Level 2 the discovery period ends at the earlier of 30 days before trial or nine months after the anchor, and expert designations sit 90 and 60 days before that end. A trial setting can therefore pull the cutoff *earlier* and move both expert deadlines with it — a two-hop derivation. Any date the engine stores instead of computes goes quietly wrong.

**3. Discovery level determines where dates come from.** Levels 1 and 2 are rule-derived; Level 3 is **document**-derived, driven by the docket control order, with rule limits filling whatever the order leaves silent. Local rules and judge-specific requirements form a third tier, already spec'd as the court-profile feature.

**The cascade exception to "the list is the bug" [D, new — this is a genuine amendment to §5].** When a trial date is set or reset, many deadlines move at once. That is **one causal event with many consequences**, not a pile of unrelated asks — so a single interruption showing what moved together is correct, and the anti-list rule is not violated. The rule as amended: *never a pile of unrelated things; one event with many consequences is still one thing.* → **H18**, since this was never put to Michael.

**Division of labor restated:** the deadline engine computes court-imposed dates; the heartbeat covers what the rules leave uncomputed. The service chase (§8.10) is the clearest case — no rule states the deadline, so no calculator can produce it.

### 7.7 Inbound-signal dependencies
The email profile (§3.4) requires that inbound provider email be detectable, which makes it dependent on mail integration. **[D] The profiles must degrade cleanly:** absent integration, an email-profile provider behaves as a portal provider (active check nudged), never as a silent success. No build status is asserted here — check the synced session log for what exists.

---

## 8. PI stage catalog — **PARTIAL**

**Scope [C]:** PI first. Other case types are a later, separate conversation. PI is the live pain, it's where offers are landing, and it's the case type whose rhythms Michael can describe fluently — which matters, because the engine is only as good as the intervals taught to it.

**Method [C]:** walk every stage of the lifecycle in order, Michael describing at each what a touch looks like and what all the touches could be.

**Reference spine** (`caseTypes.ts` `STATUSES._piDefault` / project-instructions §8): Signed up/intake → Notice letters out → Pre-suit investigation → Treatment setup → Treatment in progress → Treatment complete → Records collection → Demand drafted → Demand sent → Demand outcome → Suit filed → Defendants served → Answer received → Disclosures sent → Experts designated → Discovery → Mediation → Trial prep → Trial → Settled (pre-disbursement) → Closed.

**Walked: Stages 1–5 below. Everything after Stage 5 is unwalked** (§8.6).

### 8.1 Intake / signed up — *including "Notice letters out"* [C in full]

Michael: *"I need you to be reaching out to me constantly… until those things are done, I need you to be hounding me."*

**Threads — the immediate outbound burst, all screaming equally, none going quiet until logged as sent:**

| Thread | Arms | Shape |
|---|---|---|
| Letter of representation | Every case | Unconditional, completion-driver |
| TTCA notice letter | Government-defendant flag | Conditional on flag |
| Litigation hold / preservation letters | Company party or any evidence-holder; expands per evidence type (vehicle/wreckage storage, telematics/ELD/dash-cam, infotainment, surveillance, premises CCTV) with a tracked recipient list | Conditional + fan-out |
| Subrogation/reimbursement notice | Client has health insurance | **Fan-out, one per insurer**, on a timed clock — see below |

**Structural finding: intake is a COMPLETION driver, not a response driver.** Nothing here waits on anyone else's clock. It is a set of things that must get out the door, and the pressure sits on Michael until each is sent.

**Flat maximum urgency — no consequence-based tiering [C, explicit ruling].** A proposal to escalate TTCA notice and preservation letters faster than the LOR was **rejected**. Michael's two reasons, both preserved because they generalize:

1. **Relationship stakes are real stakes.** The TTCA notice could be malpractice — but failing to get the LOR out *"could really harm the client-attorney relationship from the beginning."* If he makes a good impression signing the client up by phone and then waits a week and a half, *"that really shapes the whole attorney-client relationship going forward, and they're always gonna feel like they need to keep following up with me."* **The client who has to chase you at the start chases you forever.**
2. **The cost of compliance is near zero.** With the form builders, each letter takes *"like two seconds."* Because clearing the nag is trivial, relentless nagging is fair. (See §7.3 — this reason is conditional on the form engine being *in* the ask.)

**Scope limit [C, important]:** flat equal urgency is an **intake rule**. Michael explicitly did not rule that urgency scales this way at every stage — *"at the very least on intake, I need to get this thing cooking quick. And then we could talk about urgency scales on the other stages."* → **H3**.

**"Notice letters out" is folded into intake [C].** Not a separate touch-stage: *"it's more of a completion tracking… when I'm doing intake, I wanna get all that stuff done at the time."* It survives as the completion-tracking half of the intake burst. → status-list question at **H9**.

**The 60-day insurer-notice clock [C]** — the first *timed* touch, behaving differently from the screaming burst. Trigger: client has health insurance. Action: subrogation/reimbursement notice to **each** insurer. Backstop: within 60 days of signup (→ §7.2: registry entry required). Cadence: Michael wants **earlier nudges** toward doing it well before the backstop. Fan-out: one notice per insurer; the count comes from the insurers captured once at intake.

### 8.2 Treatment setup — *concurrent with intake, day one* [C]

Placed out of spine order because that is how it actually runs: *"runs concurrently… something I need to be working on on the first day anyways."*

**Opening routing fork:** does the client already have their own doctors / have they already been treating?
- **Yes** → capture those existing providers into the system. That is the touch.
- **No** → get the referral request to the chosen doctor **the same day as signup**, so the doctor's office reaches the client that day or the next.
- **Both branches land on one completion state:** treatment is "set up" once the client is actually connected to a provider.

**Urgency [C, explicit]:** the referral branch **screams same-day, exactly like the LOR**. Treatment setup joins the day-one maximum-urgency burst.

**Engine shape:** conditional routing, cleanest instance — two branches, different tasks, one shared completion state.

### 8.3 Pre-suit investigation [C, with an explicit "this list will grow" caveat]

**Different texture from intake.** Intake is "these things must go out, no questions." Pre-suit is mostly **conditional** — much of it isn't a task yet, it's a *question that might spawn a task*. This is where the **triggering QUESTION** primitive was identified (§6.2).

**Three thread shapes** (Michael: *"you basically got it right"*):

1. **Unconditional** — it just fires. Example: on a defendant-driver case, a mailed request to Texas DPS for the defendant's lifetime driving record. *(Is this truly automatic on every defendant-driver case, or a yes/no first? →* **H4***.)*
2. **Conditional-single** — a yes/no spawning at most one task. *"Do we need to go out to the scene?"* No → quiet, done. Yes → a task is born and followed until closed.
3. **Conditional-expanding (fan-out)** — a yes/no whose "yes" spawns a *list*. *"Are there witnesses?"* → yes → *"who are they?"* → capture the list → one contact thread per witness.

**Also named:** public information requests (TPIA ch. 552 — crash reports, agency records), *"in certain cases."*

**Nag intensity:** *"it doesn't have to be crazy reminders"* — notably quieter than intake, consistent with the §8.1 scope limit.

**The list is seeded, not closed [C, important].** Michael: *"when I start using the system… I'll be able to tell you, oh hey, I need you to remind me to look for this, this, and this as well. And that can be a list that I can develop."* **This is a property of the whole subsystem, not this stage** — touches are user-extensible, and real cases are the spec.

### 8.4 Treatment in progress — the staleness hotspot [C]

**Definition of a touch** (near-verbatim): *"any sort of communication — whether it be email, phone call, or accessing a website — that informs me that they have been treating, and they are continuing to treat. They are scheduled to keep going."*

**Structural finding — the completion test changes shape here.** It is not "a task got done." It is **"a fresh signal arrived that treatment is ongoing AND forward-scheduled."** The forward-scheduled half matters independently: a signal that they *were* seen is weaker than one showing they are scheduled next, because the next appointment is what proves the case is still moving.

**This is where provider communication profiles live** (§3.4) — and where the design answers the founding worry most directly, because the profile makes silence *legible*.

**Open [H5]:** should the clock here run off the **known next-appointment date** rather than a flat timer — quiet until around that date, arming only if it passes with no new signal? This is outcome-sets-the-interval applied to treatment. Michael did not answer directly; he responded by introducing the profiles. Compatible with them, not a substitute.

### 8.5 Treatment complete [C as far as it went — **walkthrough paused mid-stage**]

**A DECLARED state, never detected [C, explicit].** *"We're gonna know treatment is complete when we say it's complete."* The system never infers completion from a gap in activity: a silent week and a finished course of treatment look identical to a timer, and only Michael knows which is which.

**"Complete" does not mean healed.** It means **the record is ripe enough to build the demand** — *"treatment complete doesn't mean that the client's not gonna get any more treatment going forward."*

**Three shapes** (he said "at least two," then described three):
1. **Fully healed / done** — finished, not going back.
2. **Maxed out on conservative care with a permanent-limitations opinion** — PT and pain management exhausted, possible future follow-ups, but a future-impairment/limitations recommendation already in hand (*"going forward, indefinitely, you can't lift this much"*).
3. **Surgical recommendation on the table, not yet scheduled** — *"treatment could be basically complete right there."*

**The actual test — what all three share:** treatment has reached the point where he can request **medical bills with CPRC §18.001 affidavits** and **medical records with business-records affidavits**, i.e. in the form that makes them admissible. **Admissibility-ripeness is the real definition of the state.**

**The pressure INVERTS here (structural finding).** Through §§8.2–8.4 a touch was proof the client is *still treating* — inbound-signal-driven. The moment "complete" is declared, it flips to **outbound chase**: getting records and bills in proper affidavit form out of each provider. Fan-out again — one thread per provider.

**H6 — RESOLVED [C, 2026-07-25]: open the stage only.** Declaring treatment complete does **not** auto-fire the records-and-bills requests. It opens the stage, and Michael pulls the trigger on each provider's request by hand. Rationale: the same judgment that makes completion a declared state operates at the provider level too — ripeness can be true for four providers and false for the fifth who still owes a visit note.

**The pre-completion surgical check [C, raised by Michael from the demand stage and folded back here].** Before treatment can be marked complete, the system must prompt a check that **the client is not potentially surgical.** Michael's concern, in his own framing: a doctor releasing the client, or a client who simply stops going, both look like completion — and neither rules out surgery. Where there are **positive MRI findings that could support a surgical recommendation**, the case must not be declared complete and pushed toward demand.

This is a **safety interlock on a declared transition**, and it points the opposite direction from the rest of the subsystem: everywhere else the danger is a case dying in silence, but here the danger is a case dying *prematurely* — rushed to demand while it is secretly worth many times more. Worth noting as a general shape: declared transitions can need interlocks, and an interlock is not a nag.

### 8.6 Records collection [C]

**Opening fork — retrieval method sets the cadence.** Not just the task: the *interval*.

| Branch | Follow-up cadence | Character of the touch |
|---|---|---|
| **Self-sent** — request goes straight from Michael to the provider | **Weekly** until records are in — *"that's generally enough"* | A chase. Nothing moves unless he moves it |
| **Third-party retrieval vendor** | **Every ~2.5–3 weeks** | A **supervisory check-in**, not a chase: *"hey, just checking in, is everything cool, is the request going well?"* |

Michael's reasoning on the vendor branch [C]: *"the vendor's already got their systems in place to follow up on requests. So I don't wanna bug them too much."* The vendor has its own follow-up machinery; Michael's job is to confirm the machinery is turning, not to turn it. **This is the provider-profile insight (§3.4) generalizing to a new entity type** — an entity that carries its own follow-up behavior gets a quieter clock and a different question.

**Structural finding — arrival is NOT the close.** Records landing trips a **verification gate**, not a completion. This is where a case can silently rot: a dumb timer sees delivery and calls it done, while what actually arrived is an unauthenticable affidavit that surfaces as a problem at demand time or, worse, at trial.

**The verification checklist [C, four points, in Michael's terms]:**
1. **Copies are clean** — legible, usable.
2. **Business-records affidavit page count matches the attachment.** His example: the affidavit recites fifty-four pages, sixty-two are actually attached. *"That's not gonna work. That's not gonna be authenticable."*
3. **Billing affidavit amounts are correct** — wrong or garbled amounts fail.
4. **Both affidavits are actually notarized.**

Only after this passes clean does the provider get marked complete. **So the close is a declared QC pass, not a delivery event** — the same declared-vs-detected distinction as treatment complete (§6.5), applied to an inbound artifact rather than a case state.

**Defect → revision loop at a hotter cadence [C, explicit].** A failed check sends a corrected-affidavit request back to that provider, and it runs at **two to three days**, not the weekly chase cadence. Michael's reasoning generalizes into a rule worth naming: **a known problem in your hands deserves more heat than an unknown one still out in the world.** The work of getting the paper in is already done; what remains is a concrete, fixable defect blocking admissibility.

**Records vs. billing — a latent split.** Michael's own framing was *"it depends"*: sometimes he is in a rush and needs the records now while billing lags. **CONFIRMED behavior: the system asks** — mark the medical-records portion done and keep chasing billing, or hold the whole provider open?

**[P, unruled — Claude's refinement, Michael did not affirm]:** carry the provider as **one coupled thread with two internal components**, splitting only on demand, rather than pre-declaring two sub-threads on every provider. Rationale offered: the common case closes together, and the split is exactly the kind of structure the case itself reveals rather than something to guess at up front. → **H15.**

### 8.7 Demand drafted [C]

**Precondition:** damages are complete, known, and calculable, with the proofs in hand — which means §8.6 fully closed, every provider verified.

**Shape: a completion-driven assembly thread with named sub-components.** Like the intake burst, a set of things that must all get *done* — except the output is one document instead of several letters. Components named:

- **Medical chronology** — today a paid third-party software product; possibly a future in-system feature. *(Dependency fork, noted not ruled → **H16**.)*
- **Facts section** — Michael may use AI for a first pass and for ideas.
- The target: *"a really clean, flowing narrative that's easy to read for the adjuster,"* containing everything the adjuster needs to fully evaluate the case.

**The heartbeat stays LOUD on a half-drafted demand [C, explicit].** Asked whether a started-but-unfinished demand should be its own nagging thread, or whether he wants to be left alone once writing, Michael chose loud — *"keep the heartbeat up on it"* — with reasoning that is **the exact parallel of the intake ruling (§8.1)**: with the chronology assembled and the facts section drafted, *"I should be able to sit down, pump this thing out in, like, twenty, twenty five minutes."* The tools collapse the effort, so relentless nagging is fair.

**The generalized rule, now confirmed twice at opposite ends of the lifecycle: the cheaper the system makes the action, the more license it has to hound.** This is also the stage the whole subsystem exists for — a ready-to-move demand rotting for weeks is the founding failure (§1).

### 8.8 Demand sent [C]

**One action arms three touches, not two.** The earlier two-clock example (§3.2) was an incomplete picture of this stage.

1. **Five-day check-in** — confirm they received the demand, they have everything they need, nothing is missing. Same on every demand type.
   **Weekend/holiday rule [C]:** if day five lands on a Saturday, Sunday, or holiday, roll **back** to the business day before — *not* forward. The touch must land before the weekend.
2. **A deliberate silence window** — no follow-up between the check-in and expiration. Justified on the system's own logic: he has already confirmed they have everything, so a ping in between is noise about something already known.
3. **The expiration date as backstop** — if they haven't called by then, he calls them, and terms get discussed.

**Fork on demand type sets the deadline's unit [C]:**

| Demand type | Response deadline |
|---|---|
| Third-party insurance | **15 calendar days** |
| First-party insurance | **15 business days** |

The five-day check-in is identical across both; only the expiration unit changes. **Business-day computation is not a preference** — it requires a holiday table and must be computed properly, not approximated (see §7.7).

**Expiration branches three ways, each with its own rhythm [C]:**

| Response | What it means | Cadence |
|---|---|---|
| **An offer** | The demand thread closes and hands off to the negotiation track (§8.9) | Negotiation rhythm |
| **A "we need more information" letter** — generally with a list of what they claim is still missing | Splits into two clocks: **constant, loud nagging on Michael** to get the listed information out the door (completion-driven, the delay is now his), then **weekly follow-up on their status** once it's sent (response-driven) | Loud → weekly |
| **No answer at all** | **Daily reminder** to follow up — the highest cadence anywhere in the system. Justified because silence here is the adjuster betting he'll forget | Daily, with an escape (below) |

**The one-tap escape on the daily nag [C].** Michael asked for an option on the daily reminder to turn it off and mark the thread complete, *"because, really, the next stage from there, if they're not responding to me, is me filing a lawsuit."*

**This is P1 in its purest form.** Marking complete here does not mean resolved — it means *"I have decided to stop demanding and start litigating."* The case goes quiet **by decision**, not by neglect, and the decision is recorded. It is also a clean declared transition into suit filed.

**Note:** the five-day check-in exists precisely to prevent the "we need more information" branch — and some carriers send it anyway.

### 8.9 Negotiation — a PARALLEL TRACK, not a stage [C]

**Structural finding, and it reshapes the back half of the lifecycle.** Negotiation is not a stage in the spine. It is a **continuous track running underneath every stage from the first offer to the jury verdict.** Michael: negotiation continues after suit is filed, through discovery, through trial — *"we could have gone through, put our case on, the defense put their case on, and we all did closing statements, and the jury is in deliberation. We're still in negotiation phase."* There is room to negotiate until the verdict comes out.

It closes on exactly two events: **settlement, or verdict.**

**No prescribed workflow [C].** Michael could not describe steps and declined to invent them: *"it really depends. It's case by case."* Every other stage has a teachable rhythm; this one is pure judgment, and imposing a cadence would be inventing structure the case doesn't have — the same refusal the design makes everywhere else.

**Light state, confirmed [C]:** **last touched**, plus **current posture expressed as the spread** — the high demand from our side against the low offer from the carrier. Enough to see at a glance where the gap sits and how long since anyone moved it.

**Explicit placeholder track [C].** Michael: *"put that placeholder track in there, empty on purpose, so it'll pop up later, and the structure will be there to build out."* Seeded-not-closed, the same discipline as the pre-suit checklist (§8.3), against the day he cracks a real negotiation workflow.

**Why it still gets a pulse.** A live negotiation with no next-action is the single easiest thread to let go quiet, and the posture here is plaintiff-side with money on the table — silence is the enemy (P2). So the track carries a gentle "when did you last move this?" pulse even though it carries no workflow. *(Pulse cadence not specified → **H17**.)*

### 8.10 Stages not yet walked

Untouched: **suit filed · defendants served · answer received · disclosures sent · experts designated · discovery · mediation · trial prep · trial · settled (pre-disbursement) · closed.**

**Resume point (H14):** the service chase at suit filed. The question posed and not yet answered — what a touch looks like once suit is on file, the rhythm for chasing service per defendant, and how hard the system should lean when a defendant remains unserved.

**Why this stage is dangerous and belongs to the heartbeat rather than the deadline engine:** Rule 99(a) makes the requesting party responsible for obtaining service, and **the rules set no deadline for it.** The consequence — that a filing inside limitations may not be saved if service is not pursued with diligence — lives in case law, not in a computable rule. So the most catastrophic clock in the litigation phase is one the rulebook does not state, which is precisely the kind of gap a nagging engine covers and a deadline calculator cannot.

---

## 9. Build phasing

**Separate the engine from the intelligence [P — Michael did not object].** The engine (threads, clocks, escalation, serializer) is simple and gets built once. The intelligence (auto-detecting case state, so that a demand going out arms its own follow-up) is the expensive part and is deliberately deferred.

**T1 — Substrate.** Touch/case-event record, per §7.1's boundary decision. Blocked on H8; nothing else should be built first.
**T2 — Engine core.** Threads, clocks, closed outcome set with editable default intervals, arm/reset, escalation levels. No stage content.
**T3 — Serializer.** One-at-a-time ask surface, yes/no + outcome, snooze/escalate, no bulk affordance, queue ordering (H10), quiet hours. The batched report as a separate, opt-in view.
**T4 — PI stage pack.** The §8 catalog as data (thread templates, triggers, profiles), hand-tagged posture, reading `PI_FLAGS`. Extensible by Michael at runtime (§8.3).
**T5 — Intelligence, only after live tuning.** Auto-arming from detected events; inbound-email heartbeat detection.

**9.1 Live-tuning protocol.** Run T1–T4 on real cases for roughly a month. **9.2** The stage pack ships **seeded, not closed** — the add-a-touch path is a T4 requirement, not a later nicety. **9.3 [D] Instrument the annoyance from day one:** log every snooze (with duration), every dismissal, every thread that armed and stayed armed, and every case that went quiet with no open thread. P6 makes this data the spec for T5; it cannot be reconstructed after the fact.

---

## 10. Decision list — for Michael

| # | Decision | Recommendation |
|---|---|---|
| **D1** | **H1 — one clock or two** (§4.2). Does sending reset the clock, or only a response? | Two clocks; only the did-I-do-my-part clock may interrupt. The other-side clock escalates through the report and the ladder, not through pings |
| **D2** | **H2 — how much typing at log time** (§3.2). Pick an outcome from the closed set with default intervals, or set the next interval by hand every time? | Pick-an-outcome. Hand-setting puts the remembering back on the human, which is the thing P3 removes. Overriding a default stays available |
| **D3** | **H8 — shared touch substrate with the time tracker** (§7.1). One table or two? | One core case-event entity, owned design-side; heartbeat and time tracker are both consumers. Same reasoning as the `claims` ownership call in the fee-basis review. **This blocks T1 and should be ruled before either module's schema is built** |
| **D4** | **H9 — status list** (§7.5). Does folding "Notice letters out" into intake change `STATUSES._piDefault`, or only the heartbeat's view of it? | Only the heartbeat's view. Leave the status list alone |
| **D5** | **H7 — gates vs. clocks** (§7.4). What happens to a thread whose work a hard gate forbids? | Gate suppresses the threads it blocks and arms a thread on itself |
| **D6** | Registry treatment of the 60-day insurer-notice interval (§7.2) | It becomes a registry entry with a cite before it drives anything; the heartbeat hardcodes no legally-consequential interval |
| **D7** | ~~H6 — auto-fire records/bills on declaring treatment complete?~~ | **RESOLVED 2026-07-25 [C]: open the stage only; each provider's request triggered by hand (§8.5)** |
| **D8** | **H15 — records vs. billing** (§8.6). Coupled thread that splits on demand, or two sub-threads per provider from the start? | Coupled with a latent split. The asking behavior is already confirmed; only the default is open |
| **D9** | **H18 — the cascade exception** (§7.6). Does a schedule change get a single batched interruption showing everything that moved? | Yes. One causal event with many consequences is still one thing, and the anti-list rule survives intact |
| **D10** | **H16 — medical chronology** (§8.7). Third-party product indefinitely, or an in-system feature? | Not a design-side call. Affects whether "chronology done" is a manual check-off or a system-produced artifact, so it shapes the demand-assembly thread either way |

---

## 11. Open-item register

| ID | Item | Status |
|---|---|---|
| **H1** | Two clocks or one (§4.2) | → **D1** |
| **H2** | Outcome-with-defaults vs. set-interval-by-hand (§3.2) | → **D2** |
| **H3** | Urgency model for stages after intake (flat-max was intake-only) | Explicitly deferred by Michael; blocked on §8.6 |
| **H4** | DPS driving-record request — automatic, or yes/no first? (§8.3) | Asked, unanswered |
| **H5** | Treatment-in-progress clock driven off next-appointment date? (§8.4) | Proposed, unanswered |
| **H6** | Treatment complete → auto-fire records/bills per provider? (§8.5) | **RESOLVED 2026-07-25 — open the stage only** |
| **H7** | Heartbeat threads vs. settled hard gates (§7.4) | → **D5** |
| **H8** | Shared touch substrate with the time tracker (§7.1) | → **D3**; blocks T1 |
| **H9** | `STATUSES._piDefault` effect of folding notice letters into intake (§7.5) | → **D4** |
| **H10** | Serializer queue ordering policy (§5) | **New in this doc**, unruled |
| **H11** | Escalation ladder definition — channels, thresholds, solo-vs-staff (§4.3) | **New in this doc**, unruled |
| **H12** | Snooze duration set, and what a legitimate one-tap dismissal looks like (§5) | **New in this doc**, unruled |
| **H13** | Whether posture models beyond plaintiff-PI (civil defense, criminal defense) get designed now or at generalization time (§2 P2) | **New in this doc**, unruled |
| **H14** | **Suit filed / the service chase** — touch definition, per-defendant rhythm, escalation on an unserved defendant (§8.10) | **WALKTHROUGH RESUME POINT** |
| **H15** | Records vs. billing — coupled-with-latent-split, or two sub-threads from the start? (§8.6) | → **D8**; Claude's refinement, unaffirmed |
| **H16** | Medical chronology — third-party product or in-system feature? (§8.7) | Noted, not ruled |
| **H17** | Negotiation-track pulse cadence (§8.9) | Not specified |
| **H18** | The cascade exception to the anti-list rule (§7.6) | → **D9**; never put to Michael |
| **H19** | Does a stalled retrieval vendor ever escalate to direct-to-provider contact, or does the thread stay on the vendor? (§8.6) | Asked, unanswered |
| **H20** | Is the five-day post-demand check-in universal on every demand, or are there demands that skip it? (§8.8) | Asked, unanswered |
| **H21** | Service-diligence rule — needs its own registry entry with a **case-law** cite; deliberately not drafted from the TRCP (§8.10) | Flagged, undrafted |
| **H22** | Registry queue arithmetic — entries 1–10, plus nine from the fee-basis draft, plus the TRCP skeleton candidates. Queue behind, or interleave by build urgency? | Carried, undecided |

---

## 12. Process

1. **This document is design-side and unadopted.** Nothing enters the build queue until Michael rules on §10 — the same discipline that has the time-tracker fee-basis draft sitting as DRAFT-not-canonical.
2. **The stage catalog is partial by design.** Stages 1–9 are walked. Resume at **H14** (the service chase at suit filed) and continue through the litigation spine. **Fold results back into §8 rather than into a second document** — this doc was already revised once on 2026-07-25 to absorb stages 6–9, and that is the intended pattern.
3. **The capture file remains the source of record** for what was actually said. Where this document and the capture conflict on what Michael ruled, the capture governs.
4. **Carried, unrelated to this subsystem:** time-tracker fee-basis-profiles review (§3 schema-ownership call, D1–D4, the nine §7 registry entries); registry entries 1–10; edge-function deploys per `docs/statute-cache-setup.md`; Citizens MRF path into CLAUDE.md; OAA remaining tabs; FLP account + MCP connector setup (promo ends 8/6); `BUILD-SESSION-NOTES.md` review.
