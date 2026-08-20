# DEADLINE ENGINE — SPEC

**Status: PROPOSED. NOT BUILD AUTHORIZED. NOTHING HERE IS A SCHEMA ACT.**
Canonical repo path (PROPOSED): `docs/specs/deadline-engine-spec.md`.
**Authored:** 2026-08-19 Central, design session (Cowork, Opus 5), CHAT-DISPATCH v5 task T6,
against repo state `beb27f4`. **DT-1 honored** — the container clock read 2026-08-20 UTC while
Michael's read 2026-08-19 CDT.

**WHAT THIS DOCUMENT IS.** The elaboration of ruled direction, on the pattern `fe-4` / `fe-5` /
`fe-6` used for the 2026-08-11 rulings: **it takes what Michael ruled and works out what it
implies, without deciding anything he did not.** `FC-7` (two-track deadlines, his definitions) and
`FC-9` (both rule kinds + a holiday calendar) are RULED DIRECTION; the `#75` memo maps the legal
terrain. This spec joins them.

**WHAT IT IS NOT — and, like `fe-4`/`fe-5`/`fe-6`, it adjudicates nothing.**

- **No schema act.** `FC-8` ruled the *direction* — a court-keyed deadline profile, and structured
  county/court/district fields on `cases` **"when a schema act is next authorized"** — and **no
  migration was authorized.** **Those columns remain unauthorized and this document does not
  propose one.** §7 says what the profile is *for*; it defines no table.
- **No build.** Nothing here is in the build queue. `BUILD-STATE` at HEAD: *"Nothing exists for the
  DE series… Nothing for a deadline engine (FC-7/FC-9 are direction only)."*
- **No verification.** Every legal proposition below is carried **UNVERIFIED**, with its source
  named per item. **Only Michael verifies.**
- **No edit to the TRCP skeleton.** §8.1 is the sharpest conflict on the record in this area and it
  is **flagged, not resolved** — `trcp-deadline-skeleton-2026-03-01.md` **is not touched.**

---

## §0 — WHAT IS RULED (verbatim), AND WHAT THAT LEAVES OPEN

**`FC-7` — Two-track deadlines. RULED, his words:**

> "This will likely be two track. The reason is that 'court deadlines' are those defined by the
> rules of procedure and any docket control order or scheduling order entered by the court. 'Firm
> deadlines' are those that are set by the firm. For example, the court deadline for expert
> designations may be set for one day, but the firm deadline would be weeks in advance to account
> for any time needed in the event of a problem or surprise."

*(He was offered a direction-confirmed downgrade on the word "likely" and did not take it; recorded
as RULED. **His definitions ride with the ruling** — §2 elaborates them and does not restate them
in other words.)*

**`FC-9` — Two deadline rule kinds + holiday calendar. RULED, his pick verbatim: "Yes — both +
holidays"** — `offset(anchor, N, business_days)` and `weekdayBefore(anchor, DOW, time)` as distinct
rule types, plus a **Texas court-holiday calendar as a first-class input.**

**`FC-8` — County/court deadline profile + geography on `cases`. RULED, his pick verbatim: "Yes to
both"** — deadline rules are a **court-keyed** profile (court → county → state-default fallback),
and `cases` gains structured county/court/district fields **when a schema act is next authorized.**
**Direction ruled; no migration authorized.**

**`DL-INPUT` (ruled `#66`, 2026-08-13), verbatim:** *"the deadline model is PER-(CASE, PARTY) —
each party's response clock computes from its own service date. The deadline-engine pass builds on
this."*

**WHAT REMAINS OPEN AFTER ALL FOUR.** The rulings fix the *shape*: two tracks, two rule kinds,
holidays as data, court-keyed profiles, per-(case, party) scoping. **They fix none of the legal
propositions the engine would compute from**, and §8 is why that matters more than it sounds.

---

## §1 — RECONCILE FIRST

**What exists in the repo, at `beb27f4`:**

- `docs/specs/deadline-engine-service-and-response-2026-08-14.md` (`#75`) — the research memo.
  **7 propositions, 5 open questions, all UNVERIFIED.**
- `docs/specs/trcp-deadline-skeleton-2026-03-01.md` — registry **candidates**, its own header
  marking them `UNVERIFIED` and `Verification is attorney-only`.
- `docs/specs/prop-code-53-28-deadline-engine-design.md` — the lien-engine design, whose **§3
  primitives are the vocabulary this document reuses** (§6).

**What does NOT exist, stated so nothing here reads as building on it:** no case-event / CE table ·
no `case_links` · no deadline table of any kind · no geography beyond `cases.county text` (added by
the OAA criminal-intake block; `court_name` and `cause_number` are free text; `venue`, `district`
and `jurisdiction` are absent) · **no registry entry for TRCP 21a anywhere in the repo.**

**Standing posture, unchanged and repeated because it is the thing most easily lost:**
***Ruled ≠ authorized.***

---

## §2 — THE TWO TRACKS (`FC-7`), ELABORATED

**His definitions govern. This section works out what follows from them; it does not restate them.**

### §2.1 — What each track *is*

- **COURT DEADLINE** — "defined by the rules of procedure and any docket control order or
  scheduling order entered by the court." **Two sources, and they are not the same kind of thing:**
  a *rule* is general and derivable; a *DCO or scheduling order* is a document entered in one case
  and is authority only there. **A court deadline is therefore either rule-derived or
  document-derived**, and the engine must know which, because a document-derived date **displaces**
  the rule-derived one rather than competing with it (the Rule 190.4 pattern, §5.4).
- **FIRM DEADLINE** — "set by the firm," and his example is the load-bearing part: the firm date
  for expert designations sits **weeks in advance** of the court date "to account for any time
  needed in the event of a problem or surprise."

### §2.2 — Six properties that follow, each traceable to his words

1. **THE FIRM DEADLINE IS DERIVED FROM THE COURT DEADLINE, NOT ENTERED BESIDE IT.** His example is
   a *lead time* — "weeks in advance" of a court date. So the firm track is a **function of** the
   court track: `firm = courtDate − lead`, and **when the court date moves, the firm date moves
   with it.** A firm date entered as a free-standing date would silently go stale the first time a
   trial setting moved, which is the failure the cascade model exists to prevent.
2. **BUT NOT EVERY FIRM DEADLINE HAS A COURT PARENT.** "Deadlines that are set by the firm" is
   broader than "offsets from court dates" — a follow-up date, an internal review, a call-the-client
   date have no rule behind them. **So the model needs both:** a **derived** firm deadline with a
   court parent and a lead, and a **standalone** firm deadline with its own anchor. *(Which of the
   two he means as the default is `Q-DE-1`.)*
3. **MISSING A FIRM DEADLINE IS NOT MISSING A DEADLINE.** The consequences differ absolutely — a
   blown court deadline can be a deemed admission (TRCP 198.2(c), §8.2) or a struck expert; a blown
   firm deadline consumes cushion. **The two tracks must never be summed, ranked together, or
   rendered in one undifferentiated list**, because a UI that shows twelve "overdue" items without
   the distinction trains the reader to ignore all twelve.
4. **THE FIRM TRACK IS THE ONLY ONE THE FIRM MAY EDIT.** A court deadline is what the rule or the
   order says. **A user "adjusting" a court deadline is not adjusting anything — it is recording a
   different belief about the law**, and the engine should refuse it rather than store it. The lead
   time is the adjustable quantity.
5. **THE LEAD IS A POLICY, NOT A NUMBER TYPED PER CASE.** "Weeks in advance" for expert
   designation is a firm practice, not a one-off. Leads belong to a **profile keyed by deadline
   type**, with a per-case override. *(Whether leads are firm-wide, per-practice-area, or
   per-case-type is `Q-DE-2`.)*
6. **A FIRM DEADLINE CAN FALL IN THE PAST WHEN A COURT DATE IS SET LATE**, and that is information,
   not an error. Setting a trial date six weeks out can produce a firm expert date already gone.
   **The engine surfaces it; it does not clamp it to today or suppress it.**

### §2.3 — What the two tracks do NOT change

**Both tracks compute on the same anchors and the same calendar.** `FC-7` is a classification of
deadlines, not a second computation engine. Everything in §§3–5 applies to both.

---

## §3 — THE TWO RULE KINDS (`FC-9`)

**RULED: both, as distinct rule types.**

### §3.1 — `offset(anchor, N, business_days)`

Count `N` units from an anchor date; the `business_days` flag selects the counting mode.

- **Calendar-day mode** counts every day and then applies the roll rule if the result lands on a
  non-business day. **Business-day mode skips non-business days while counting.** These give
  different answers and **the difference is not a rounding detail** — 30 business days lands roughly
  **42 calendar days** out, so the two results sit about **twelve days** apart before any holiday is
  counted. *(A first draft said "about six weeks apart," which is where the business-day count
  LANDS, not the gap between them — off by roughly 3.5×, in the one sentence whose job is to
  establish that the distinction is material. A build session sizing a cushion from it would have
  been wrong.)*
- **The roll rule is chapter-scoped, not global** — this is **`P5`** from the lien engine, already a
  named primitive, and it is reused rather than re-invented. Different bodies of law roll
  differently; a single global "if weekend, go to Monday" is wrong on its face.
- **Added days are NOT part of the offset.** TRCP 21a(c)'s three mail days attach to *the party and
  the method*, not to the rule (§5.2, §8.3). Folding them into `N` would make one rule produce
  different `N`s per recipient.

### §3.2 — `weekdayBefore(anchor, DOW, time)`

Locate a named weekday relative to an anchor, at a stated hour.

- **The exemplar is Rule 99(b)**, and the skeleton already flags it: *"The Rule 99(b) answer date is
  not 'service + 20 days.' It is the Monday following the expiration of 20 days, at 10:00 a.m. No
  generic date library computes this; it needs its own function."* **`FC-9`'s ruling is what makes
  that function a rule TYPE rather than a special case — as direction. It authorizes no build:
  *Ruled ≠ authorized*, and a first draft of this line used the word "authorizes," which is the one
  word this document is not entitled to.**
- **THE RULE KIND CARRIES A TIME OF DAY, AND THAT IS NOT DECORATION.** 10:00 a.m. Monday is a
  different deadline from end-of-day Monday. **A deadline value is therefore a timestamp with a
  stated zone, not a bare date**, wherever the rule states an hour. *(The `#75` memo finds one other
  hour-dependent rule — fax service time-of-day under 21a — and no more.)*
- **Rule 99(b) is not "weekdayBefore" in the sense of "the Monday before."** It is *the Monday
  next after the expiration of twenty days.* **The type name is his; the semantics must follow the
  rule, and this document flags the mismatch rather than renaming his type** (`Q-DE-3`).

### §3.3 — Both kinds are declarative and re-evaluated, never resolved once

**Dates are DERIVED, never stored** — the skeleton's standing rule, and §5.5 is the mechanism.

---

## §4 — THE HOLIDAY CALENDAR AS DATA (`FC-9`)

**RULED: "a Texas court-holiday calendar as a first-class input."** Elaborated:

1. **DATA, NOT CODE.** Holidays change by year and by court. A hard-coded list is wrong the first
   January after it ships, and wrong silently.
2. **IT IS NOT ONE CALENDAR.** State holidays, federal holidays, county-courthouse closures and
   one-off closures (weather, emergency order) are different sets. **A court-keyed profile
   (`FC-8`) is what makes "which calendar applies" answerable** — court → county → state default.
3. **A CLOSURE IS AN EVENT WITH A DATE RANGE, NOT A FLAG ON A DAY.** A courthouse closed for two
   days by weather order needs a record with a reason and a source, because it will be argued about
   later.
4. **THE CALENDAR IS AN INPUT TO COUNTING AND TO ROLLING, AND THE TWO USES ARE SEPARATE.**
   Business-day counting skips holidays *while counting*; the roll rule moves a landed date *off* a
   holiday. **A rule may use one, both, or neither**, and which it uses is a property of the rule.
5. **A MISSING CALENDAR YEAR IS A STOP, NOT A DEFAULT.** If the engine is asked to count business
   days through a year it has no holiday data for, **it must refuse and say so** rather than count
   as if there were no holidays. *(This is the "a check that cannot disconfirm is not a check"
   discipline applied to arithmetic.)*
6. **THE CALENDAR'S PROVENANCE IS PART OF THE DATA.** Each entry names where it came from and when
   it was read. **A holiday list is legal-adjacent data and it goes stale**, and nothing in this
   project treats a date as authority because it is in a table.

---

## §5 — THE COMPUTATION MODEL

**Taken from the `#75` memo's per-defendant findings. Nothing here is re-derived from rule text;
every legal claim is a §8 proposition, UNVERIFIED.**

### §5.1 — The scope table (the memo's §4, carried)

| Clock | Scope | Anchor | Authority (UNVERIFIED) |
|---|---|---|---|
| Answer due | **PER-DEFENDANT** | that defendant's own service date | TRCP 99(b) |
| Written-discovery response | **PER-DEFENDANT** | service of the request on that party | 196.2(a), 197.2(a), 198.2(a) |
| Added days for mail | **PER-DEFENDANT, PER-METHOD** | how *that* party was served | 21a(c) |
| Initial disclosures | **CASE-WIDE**, with a carve-out | first answer or general appearance | 194.2(a) |
| Discovery period | **CASE-WIDE** | when the first initial disclosures are due | 190.3(b)(1)(A) |
| Expert designation | **PER-SIDE**, on a case-wide anchor | end of the discovery period | 195.2 |

**THE MODEL IN ONE SENTENCE: the chain is per-defendant at both ends and case-wide in the middle.**
`DL-INPUT`'s per-(case, party) ruling is satisfied by making the *party* dimension available
throughout — **not by making every clock per-party**, which the table shows would be wrong.

### §5.2 — A rule's predicate belongs to the rule, not to the case

The memo's own principle, and it is the design rule that most changes the shape:

> "The Family Code flag is not a case-level `isFamilyCode` boolean that switches everything; it is a
> predicate that four specific provisions evaluate."

**Same for service method:** mail is a property of a service event, evaluated by 21a(c) alone.
**Same for discovery level:** it selects which period rule applies, not a global mode.

### §5.3 — The engine computes; it does not extend

Where relief requires a motion — TRCP 190.5, *"The court may modify a discovery control plan at any
time and must do so when the interest of justice requires"* — **the output is a PROMPT, never a
computed extension.** A late-added defendant's remedy is a motion, not arithmetic. **The engine has
no authority to grant time and must not render one.**

### §5.4 — Document-derived displaces rule-derived, and only where it speaks

A Level 3 plan *"displaces the limits it addresses and only those."* So a case is
**document-derived with rule-derived fallback**, per-item — never wholesale. **`FC-7`'s "any docket
control order or scheduling order entered by the court" is the same mechanism** and is why the court
track needs a document source as a first-class thing.

### §5.5 — Recompute events (cascade, not notes)

**Every one of these re-evaluates the derived set:** a trial setting entered or moved · the first
answer filed · a party served or joined · a Level 3 plan entered or modified · the discovery level
changed · **a service date corrected** · a court-holiday calendar updated · a firm lead-time policy
changed.

**Setting or moving a trial date is a recompute on the discovery period, which is a recompute on
both expert deadlines — the skeleton's two-hop derivation** — **and, under `FC-7`, a third hop onto
every firm deadline derived from those.** *(A service-date correction is listed deliberately: it is
the commonest real-world edit and the one most likely to be treated as a typo fix rather than a
cascade trigger.)*

---

## §6 — VOCABULARY: REUSED, NOT MINTED

**`prop-code-53-28-deadline-engine-design.md` §3 already names the primitives, and this document
uses those names rather than parallel ones** — the `#75` memo's rule, kept:

**`P1`** month-ordinal deadlines · **`P2`** multi-anchor reduction (later-of / earlier-of /
earliest-of) · **`P3`** anchor swap · **`P4`** backward constraints ("no earlier than") · **`P5`**
chapter-scoped roll rules · **`P6`** provisional dates that resolve retroactively · **`P7`**
calendar-month count from a date.

**Two of them are load-bearing here and are named so the reuse is visible.** The Level 2 discovery
period's end — the earlier of a trial-relative date and an anchor-relative date — **is `P2`,
exactly**: hold all candidate anchors and recompute the reduction when any changes, rather than
storing a resolved date. And **`FC-7`'s firm track is `P4`-adjacent but is NOT `P4`**: a firm lead
is a *self-imposed* backward offset, not a rule-imposed floor, and collapsing the two would let a
firm policy render with the authority of a rule.

**`FC-9`'s two rule kinds sit BESIDE these primitives, not inside them** — `offset` and
`weekdayBefore` are how a single rule computes; `P1`–`P7` are how rules combine and relocate.
*(Whether the two vocabularies should be unified is `Q-DE-4`, and it is a real question, not
housekeeping.)*

---

## §7 — THE COURT-KEYED PROFILE (`FC-8`) — DIRECTION ONLY

**RULED: court-keyed, with court → county → state-default fallback.** What that profile is *for*:

- **which holiday calendar applies** (§4.2);
- **which local rules and standing orders modify a rule-derived date** — the skeleton's
  court-profile tier; Bexar Monitoring Court's agreed-order hearing requirement and its noon-Monday
  trial announcement are the named exemplars;
- **which firm lead-time policy applies**, where the firm's cushion differs by court.

**Court-keyed, NOT county-keyed** — two courts in one county can run differently, and a county-keyed
profile cannot represent that.

***`H43` IS FLAGGED HERE, NOT RIDDEN.*** The `FC-8` adjudication record annotates that ruling
*"(court-keyed, not county-keyed)"* and attaches `H43` to it — **but the `H43` row in
`attorney-review-queue.md` asks something else entirely: *"Can a hearing be set unilaterally in
Bexar if the opponent will not confer?"*, carried and open.** **One ID, two propositions, already in
the record.** Per the project's flag-don't-rename rule this spec **renames nothing and resolves
nothing**; it records the double use so a later reader asking "was `H43` ruled?" is not told yes by
a citation to the wrong question.

**AND HERE THE SPEC STOPS.** `FC-8`'s second limb — structured county/court/district fields on
`cases` — is ruled **"when a schema act is next authorized,"** and **no schema act is authorized.**
`cases` today carries `county text`, with `court_name` and `cause_number` free text and `venue` /
`district` / `jurisdiction` absent. **This document proposes no column, no table and no migration.**
The profile cannot be keyed to a court the schema cannot name — **that is a dependency, stated, not
a request.**

---

## §8 — LEGAL PROPOSITIONS (registry-style, ALL UNVERIFIED)

**Carried from the `#75` memo, which sourced them to the July 2026 consolidated TRCP in Michael's
Knowledge Repo. Not re-retrieved this session, not re-worded, not verified.** Their `P-n` numbering
is the memo's and is preserved so the two documents can be read side by side. **Only Michael
verifies.**

### §8.1 — THE CONFLICT, RESTATED AND *NOT* RESOLVED

**`P-1` — the 50-day exception is Family-Code-limited.**
*Proposition:* In a suit not governed by the Family Code, a defendant served with written discovery
before its answer is due must respond within 30 days after service; the 50-day extension applies
only to a defendant in a suit governed by the Family Code.
*Cite:* Tex. R. Civ. P. 196.2(a), 196.7(c)(1), 197.2(a), 198.2(a); cf. Tex. R. Civ. P. 194a.3(a).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 consolidated text, Michael's Knowledge Repo copy.

**`trcp-deadline-skeleton-2026-03-01.md` §5 STATES THE OPPOSITE RELATIONSHIP** — three rows plus a
parenthetical presenting the 30/50 structure as general with a Family Code parallel.

**THE SKELETON IS NOT EDITED BY THIS DOCUMENT.** Its header marks its contents UNVERIFIED
candidates, so **no landed assertion is being corrected and no correction entry is owed.** The edit
is Michael's act. **Both readings stay on the record, in conflict, until he rules** — and the
conflict is stated here rather than quietly resolved in the engine's favour, because **an engine
built on either reading while the other stands in a repo document is the exact shape this project
keeps catching.**

**Why it is first:** on the memo's reading, a PI or civil-litigation defendant served before its
answer is due has a flat 30 days, and **TRCP 198.2(c) makes the consequence automatic — *"If a
response is not timely served, the request is considered admitted without the necessity of a court
order."*** **It is a live practice question before it is a design question.**

### §8.2 — The remaining propositions, carried

- **`P-2`** — added days attach to the method used on the individual party, and **only to mail**;
  three days under TRCP 21a(c); electronic service carries none. **UNVERIFIED — AND FLAGGED AS THE
  HIGHEST-VALUE VERIFICATION TARGET IN THIS SECTION.** TRCP 21a(c) has long read that the three days
  are added where the paper is served *"by mail **or by commercial delivery service**."* **If the
  July 2026 text still carries the commercial-delivery limb, `P-2`'s "only to mail" is wrong on a
  proposition §8.3 calls load-bearing for every response clock; if it does not, that is a
  significant change nothing in the record notes.** **This session did not re-retrieve the rule text
  and cannot tell which** (§10) — and the memo's own Q3, filed as `[DL-memo Q3]`, already names
  commercial delivery as *"deposit-complete but uncushioned,"* which is a third position again.
  **Put to Michael rather than resolved.**
- **`P-3`** — the answer date is per-defendant: citation directs the defendant to answer by 10:00
  a.m. on the Monday next after the expiration of twenty days after **the date of service on that
  defendant**. TRCP 99(b), 99(c). **UNVERIFIED.** *(Already a skeleton candidate and on the queue;
  restated because it is the root of the per-defendant chain.)*
- **`P-4`** — the initial-disclosure anchor is case-wide with a service-timing carve-out; TRCP
  194.2(a). **UNVERIFIED.** *The dividing line is service or joinder timing, not answer timing.*
- **`P-5`** — the discovery period is case-wide and its trigger chains to `P-4`; TRCP
  190.3(b)(1)(A). **UNVERIFIED.** *Rewritten by the 2021 amendments — anything computed on the old
  formulation is wrong now.*
- **`P-6`** — expert designation has **no request-service floor** in the current text; TRCP 195.2(a),
  (b). **UNVERIFIED.** *A function built on the 2021 "later of" formulation would compute a later
  date than the rule now allows.*
- **`P-7`** — a Level 3 plan must contain four enumerated things, and its discovery-period clause
  permits **"all discovery requests must be sent"** as an alternative to "conducted"; TRCP 190.4(b).
  **UNVERIFIED.** *A different computation shape, not merely a different date.*

**VERIFIED and carried as CONTEXT ONLY, not re-proposed** (Michael, 2026-08-11): TRCP 197.2(a),
196.2, 198.2 (the 30-day periods and deemed admission), 190.3(b)(3), 190.4. **None is contradicted
by anything above** — §8.1 concerns a proposition no verified entry carries.

### §8.3 — The gap that is not a duplicate

**THE REGISTRY GAP IS REAL. THE "NO QUEUE ITEM" HALF OF IT IS NOT, AND A FIRST DRAFT OF THIS SECTION
CARRIED THE FALSE HALF FORWARD.**

- **TRUE, and checked at HEAD:** no registry file carries a TRCP 21a proposition. The only `21a`
  strings in `legal-rule-registry-discovery-enforcement-and-pleading.md` are entry numbers
  (`entry 21a` / `entry 21b`), which are a different thing entirely.
- **FALSE:** *"no queue item."* **`docs/specs/attorney-review-queue.md` carries an OPEN row —
  `[DL-memo Q3]`, entered 2026-08-14** at the thirtieth queue-runner invocation, asking exactly this
  question at exactly this scope.
- **The sentence is false in an instructive way: the queue row itself says "no queue item," because
  the runner filed the memo's question verbatim under QR-1. The row asserting that no row exists IS
  the row.** A sentence true when authored, made false by the act of filing it, and then carried
  forward by a session that read the memo and not the register. **RECONCILE FIRST is what catches
  that, and it caught it here only at the preflight.**

**What survives, and it is still load-bearing:** the added-days provision is per-party and
per-method, **this spec cannot compute a response date without it**, and the proposition behind
`P-2` remains **UNVERIFIED and unentered in any registry file.**

---

## §9 — OPEN QUESTIONS

### §9.1 — The `#75` memo's five — ALREADY FILED, and restated IN FULL (QR-1) rather than re-minted

**RECONCILE FIRST, and it corrects a first draft of this section.** These five are **not homeless
questions this spec is raising.** The thirtieth queue-runner invocation filed all five into
`docs/specs/attorney-review-queue.md` on **2026-08-14**, with their full text, as
**`[DL-memo Q1]`–`[DL-memo Q5]`** — **all five still ⬜ OPEN at `beb27f4`**, and all five carrying
**NO DURABLE IDs** (the bracketed form is the register's own marker that the packet asked for IDs
and none was minted). **They are restated below because QR-1's full-text rule is what keeps a
question alive when its source document is deleted — not because they need filing.** Nothing here
mints an ID for them; **whether they take durable IDs is itself an open call in the register.**

**Q1.** The July 2026 text limits the 50-day discovery-response extension to defendants **in suits
governed by the Family Code** (196.2(a), 196.7(c)(1), 197.2(a), 198.2(a)), while the unqualified
50-day rule appears only at 194a.3(a) inside the Family-Code-only rule.
`trcp-deadline-skeleton-2026-03-01.md` §5 states the opposite relationship. **Do you verify that
reading, and do you want the three skeleton rows edited to match? This is a live practice question
before it is a design question: on this reading a PI or civil-litigation defendant served before its
answer is due has a flat 30 days, and Rule 198.2(c) makes the consequence of missing it automatic.**

**Q2.** Rule 99(c)'s citation notice tells the defendant that disclosures *"generally must be made
no later than 30 days after you file your answer,"* while 194.2(a) sets the deadline at 30 days
after **the first** answer or general appearance. For any defendant other than the first to answer,
the notice and the rule give different dates. **Does this change your answer to V2 (the
staggered-answer anchor gap), and should the engine surface the discrepancy to the defendant-side
user rather than silently applying 194.2(a)?**

**Q3.** No registry entry for **TRCP 21a** exists anywhere in the repo — no proposition, no ruling,
no queue item — yet its added-days provision is per-party and per-method and therefore load-bearing
for every response clock. **Do you want a 21a entry opened, and at what scope: the added-days
provision alone (21a(c)), or 21a(b)'s completion rules as well, given that fax carries a
time-of-day rule and commercial delivery is deposit-complete but uncushioned?**

**Q4.** Rule 195.2 in the July 2026 text states expert designation as fixed dates — 90 and 60 days
before the end of the discovery period — with **no** *"later of … 30 days after the request is
served"* floor, which the 2021 text carried. **Do you verify that the floor is gone? A designation
function built on the 2021 formulation would compute a later date than the current rule allows**,
and the 195.2 sign-off is already on the queue.

**Q5.** Rule 190.4(b)(2) now permits a Level 3 plan to set a period during which *"either all
discovery must be conducted **or all discovery requests must be sent**, for the entire case or an
appropriate phase of it."* That is a different computation shape, not merely a different date, and
it can be phase-scoped. **Should the engine model a Level 3 period as a typed choice between
complete-by and send-by, with phase scoping, or should Level 3 remain wholly document-derived with
no structured representation?**

### §9.2 — New, from this elaboration (packet-local IDs; no series minted)

**`Q-DE-1`** — **Is a firm deadline DERIVED from a court deadline by default, or entered
standalone by default?** `FC-7`'s example is a derived one ("weeks in advance" of the court date),
but "deadlines that are set by the firm" is broader and plainly covers dates with no court parent.
**Both must exist (§2.2 item 2); which is the default shapes the whole UI.** A derived-by-default
model makes standalone dates feel like an exception; a standalone-by-default model loses the
cascade unless the user opts in — **and losing the cascade is how a firm date goes stale silently.**

**`Q-DE-2`** — **At what scope do firm lead times live: firm-wide, per practice area, per case
type, or per court?** §2.2 item 5 says a lead is a policy rather than a per-case number, but not
whose policy. **A per-court answer would fold leads into `FC-8`'s profile; the others would not**,
and that changes where they are stored.

**`Q-DE-3`** — **`weekdayBefore(anchor, DOW, time)` is your ruled type name, and Rule 99(b) — the
exemplar — computes the Monday *next after the expiration of twenty days*, which is a weekday
AFTER a derived point, not before an anchor.** Should the type be read as "locate a named weekday
relative to an anchor, in a stated direction" (one type, a direction parameter), or are there two
types? **Flagged rather than renamed, because the name is yours.**

**`Q-DE-4`** — **Should `FC-9`'s rule kinds and the lien engine's `P1`–`P7` primitives be one
vocabulary or two?** §6 keeps them separate — the rule kinds say how one rule computes, the
primitives say how rules combine and relocate — **but a reader meeting both for the first time will
reasonably ask why `P5` (roll rules) is not a third rule kind.** Unifying is a real option; so is
documenting the split.

**`Q-DE-5`** — **What happens when a court deadline moves to EARLIER than its derived firm
deadline, or into the past?** §2.2 item 6 says the engine surfaces it rather than clamping. **Is
that right, and does a firm deadline that has been overtaken get a distinct state** — "cushion
gone" rather than "overdue" — **so it does not read as a missed obligation?**

**`Q-DE-6`** — **Does the engine ever compute a deadline it will not show, and vice versa?** §5.3
requires a *prompt* rather than a computed extension where relief needs a motion (190.5).
**Symmetrically: should a court deadline whose predicate is unverified (every one in §8) render at
all**, or render marked, or be withheld until the underlying proposition is verified? **Under
registry discipline an unverified proposition may drive warnings and placeholders but may not drive
a computed legal outcome — and a rendered date on a lawyer's screen is arguably a computed legal
outcome.** *(This is the question that most affects when any of this can ship.)*

---

## §10 — WHAT THIS SPEC DID NOT DO

- **No schema act, no column, no table, no migration.** `FC-8`'s second limb stays unauthorized.
- **No verification, no cite supplied or upgraded, no registry file touched.** All propositions
  carried at the `#75` memo's stated status.
- **The TRCP skeleton was NOT edited**, including the three §5 rows §8.1 conflicts with.
- **No rule text re-retrieved.** Every proposition is carried from `#75`; **nothing was re-read
  from the Knowledge Repo TRCP copy this session**, so no new sourcing claim is made and none of
  `#75`'s sourcing is re-asserted as independently checked.
- **No case law.** The service-diligence question stays with open item **V6** (*Tex. State Univ. v.
  Tanner*, unadopted), untouched — re-deriving it would duplicate V6 and pre-empt Michael's routing.
- **No ID series minted.** `Q-DE-1`–`Q-DE-6` are **packet-local**; the runner assigns durable IDs.
  *(The DE series has no numbered member; `DL-INPUT` is a word, not a number, and minting `DL-1`
  would be an unruled act — the `#75` memo's reasoning, followed.)*
- **The 2026 amendment climate is not surveyed.** A Rule 166a rewrite takes effect 2026-03-01 and
  the skeleton carries a change flag on it; that is a separate pass.
