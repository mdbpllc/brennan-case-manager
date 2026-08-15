# Deadline Engine Research Memo — per-defendant service and response deadlines in one discovery wave

**Canonical repo path (proposed):** `docs/specs/deadline-engine-service-and-response-2026-08-14.md` — NEW
file, rides the next packet on Michael's word.

**Status: PROPOSED design input — research support only. NOTHING here is verified.** Under registry
discipline, confirming a rule's currency, supplying or upgrading a cite, or setting any status is Michael's
verification act alone. A model asserting legal currency is never verification. **No registry file was read-
modified and none was altered by this session.**

**Authored:** 2026-08-14 Central (design session, Opus 5, Cowork, CHAT-DISPATCH Task 6).
**DT-1 applied:** clock-checked **21:50 CDT** before stamping — past the 19:00 CDT container rollover; the
container read 2026-08-15 UTC. **This file correctly stamps 2026-08-14 Central.** Recorded because a
sub-retrieval in this same session stamped "retrieved 2026-08-15" from the container clock before the check
ran; that stamp is corrected to 2026-08-14 throughout.

## Sources, named per item

**PRIMARY, and it changed the outcome: Michael's own copy of the rules.** Mid-session he connected
`Documents\Knowledge Repo`, containing **`Civil\texas-rules-of-civil-procedure July 2026.pdf`**. Every rule
quotation below is from that file's clean consolidated text, extracted locally and read directly.

**Why that matters more than a footnote.** The web retrieval that preceded it could not reach clean text:
txcourts.gov's consolidated PDF truncates on fetch around Rule 21, so Rules 99 and 190–198 were reachable
only as Supreme Court **amendment-order redlines**, whose text layer merges struck and inserted words
(`$50,000250,000`, `six20 hours`, `194.2(f)195.5(a)`). Three rules had to be sourced to the **1998** adopting
order. That pass named four items needing clean-text confirmation before use. **All four are now resolved
against Michael's copy, and two of them came out differently than the redline reading suggested.** The
practice consequence of one of them is in §2.

**Tooling:** per the 2026-08-13 TOOLING ruling, Descrybe was not used. No case-law retrieval was run this
session — see §9 for why that is a deliberate scope limit rather than a gap.

---

## §1 — RECONCILE FIRST

**The scoping question this memo would otherwise open with is already ruled.** Session-log **#66**
(2026-08-13), verbatim:

> `DL-INPUT RULED: the deadline model is PER-(CASE, PARTY) — each party's response clock computes from its
> own service date. The deadline-engine pass builds on this.`

So the memo does not argue toward per-party scoping. It **starts there** and asks the question the ruling
leaves open: *given per-(case, party), which clocks are actually per-party, which are case-wide, and what
happens where they meet?* The answer is not uniform, and the non-uniformity is the finding.

**Already VERIFIED by Michael 2026-08-11 — restated as context, NOT re-proposed:** TRCP 197.2(a) (30-day
interrogatory response), TRCP 196.2 (30-day RFP response), TRCP 198.2 (30-day RFA response + deemed
admission), TRCP 190.3(b)(3) (25 interrogatories, discrete subparts), TRCP 190.4 (Level 3 only on order).
**None of those four verified propositions is contradicted by anything below** — they state the 30-day
period and the level structure, and both survive. §2 concerns a *different* proposition that no verified
entry carries.

**Already on file and not restated:** the anchor/cascade model, the "dates are DERIVED, never stored" rule,
and the Rule 99(b) Monday formulation all live in `trcp-deadline-skeleton-2026-03-01.md` §§1, 5, 6. The
engine vocabulary — anchor events, **P2** multi-anchor reduction, **P3** anchor swap, **P5** chapter-scoped
roll rules, and "role selects the deadline set" — comes from `prop-code-53-28-deadline-engine-design.md` §3.
**This memo uses those terms rather than minting parallel ones.**

**Standing posture, unchanged:** *Ruled ≠ authorized.* No deadline engine is in the build queue, and
per-(case, party) deadlines are DESIGN STATUS ONLY — no field, no column, no code.

---

## §2 — THE FINDING: the 50-day cushion does not exist in a PI or civil-litigation case

**This is a live practice item, not a design item, and it is stated first for that reason.**

`trcp-deadline-skeleton-2026-03-01.md` §5 currently reads:

> `| TRCP-196.2 | 196.2 | Requests for production: respond within 30 days after service; a defendant served
> before its answer is due need not respond until 50 days after service |`
> `| TRCP-197.2 | 197.2 | Interrogatories: same 30 / 50-day structure |`
> `| TRCP-198.2 | 198.2 | Requests for admission: same 30 / 50-day structure |`
> `*(Same structure also appears at 194a for Family Code suits — out of scope here.)*`

**The July 2026 text inverts that.** Rule 196.2(a), verbatim:

> "Time for response. The responding party must serve a written response on the requesting party **within 30
> days after service of the request, except that a defendant in a suit governed by the Family Code** served
> with a request before the defendant's answer is due need not respond until 50 days after service of the
> request."

Rules **197.2(a)**, **198.2(a)**, and **196.7(c)(1)** (entry on land) carry the identical Family-Code
limitation — **four provisions**. The **unqualified** 50-day rule appears exactly once, at **194a.3(a)**,
which sits inside Rule 194a, the Family-Code-only rule, and therefore needs no qualifier:

> "a defendant served with a request before the defendant's answer is due is not required to respond until
> 50 days after service of the request"

**So the skeleton has the relationship backwards.** The 50-day cushion is the *Family Code* rule, not the
general rule with a Family Code parallel.

**What that means in practice, and why it is worth Michael's attention today rather than at build time:** in
a PI or civil-litigation case, **a defendant served with written discovery before its answer is due has a
flat 30 days from service.** There is no 50-day cushion. Under Rule 198.2(c) — *"If a response is not timely
served, the request is considered admitted without the necessity of a court order"* — the consequence of
relying on a remembered 50 days is automatic and requires no motion by anyone.

**Scope of what this does and does not disturb:**

- **It does not contradict any VERIFIED registry entry.** The three verified entries state the 30-day period
  and the deemed-admission consequence. None of them carries the 50-day proposition. **The verified set
  stands untouched.**
- **It does contradict an UNVERIFIED skeleton candidate** (`trcp-deadline-skeleton` §5, all three rows plus
  the parenthetical).
- **It is not a correction to any landed assertion**, because the skeleton's own header marks it
  `UNVERIFIED registry candidates` and `Verification is attorney-only`. Under the correction-entry rules,
  no correction entry is owed. **The skeleton row needs an edit, and the edit is Michael's act, not Code's.**

**Confidence, stated honestly:** this reading is from clean consolidated text in Michael's own July 2026
copy, cross-checked across four separate provisions plus the 194a.3 counterexample. It is the strongest-
sourced item in this memo. **It is still UNVERIFIED and Michael verifies it.**

---

## §3 — Registry-style propositions

Format per the common rules: proposition · cite as written · status · source named. **All UNVERIFIED.**
Deduped against the three registry files and the skeleton — anything already VERIFIED is in §1 as context
and is *not* repeated here. **New or changed only.**

**P-1 — the 50-day exception is Family-Code-limited.**
*Proposition:* In a suit not governed by the Family Code, a defendant served with written discovery before
its answer is due must respond within 30 days after service; the 50-day extension applies only to a
defendant in a suit governed by the Family Code.
*Cite:* Tex. R. Civ. P. 196.2(a), 196.7(c)(1), 197.2(a), 198.2(a); cf. Tex. R. Civ. P. 194a.3(a).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 consolidated text, Michael's Knowledge Repo copy.
*Note:* supersedes the `trcp-deadline-skeleton` §5 rows if adopted. Highest-priority verification in this memo.

**P-2 — added days attach to the method used on the individual party, and only to mail.**
*Proposition:* Where a party must act within a prescribed period after service and the paper was served on
that party **by mail**, three days are added to that party's period. No other service method carries added
days; electronic service carries none.
*Cite:* Tex. R. Civ. P. 21a(c); Tex. R. Civ. P. 4.
*Status:* **UNVERIFIED.** *Source:* July 2026 text, 21a(c) verbatim: *"and the notice or paper is served upon
him by mail, three days shall be added to the prescribed period."* Rule 4 independently: *"extending other
periods by three days when service is made by mail."*
*Note:* **No registry entry for TRCP 21a exists anywhere in the repo** — this is a genuine gap, not a
duplicate. Two co-defendants served the same day by different methods hold different deadlines.

**P-3 — the answer date is per-defendant.**
*Proposition:* Citation directs the defendant to answer by 10:00 a.m. on the Monday next after the
expiration of twenty days after **the date of service on that defendant**.
*Cite:* Tex. R. Civ. P. 99(b), 99(c).
*Status:* **UNVERIFIED.** *Source:* July 2026 text. 99(c) is second-person throughout — *"twenty days after
**you** were served this citation and petition."*
*Note:* already a skeleton candidate (`TRCP-99b`) and already on the queue. **Restated only because it is
the root of the per-defendant chain**, not proposed as new.

**P-4 — the initial-disclosure anchor is case-wide, with a service-timing carve-out.**
*Proposition:* Initial disclosures are due 30 days after **the filing of the first answer or general
appearance**. A party **first served or otherwise joined after** that filing discloses within 30 days after
being served or joined.
*Cite:* Tex. R. Civ. P. 194.2(a).
*Status:* **UNVERIFIED.** *Source:* July 2026 text, both sentences verbatim.
*Note:* **The dividing line is service or joinder timing, not answer timing.** A defendant served early that
answers late does not get a fresh 30 days — its disclosure date was already fixed by someone else's answer.

**P-5 — the discovery period is case-wide, and its trigger chains to P-4.**
*Proposition:* In a suit not governed by the Family Code, the Level 2 discovery period begins when the
**first initial disclosures are due** and continues until the earlier of (i) 30 days before trial or
(ii) nine months after the first initial disclosures are due.
*Cite:* Tex. R. Civ. P. 190.3(b)(1)(A).
*Status:* **UNVERIFIED.** *Source:* July 2026 text.
*Note:* **This trigger was rewritten by the 2021 amendments** — the prior text ran from filing of suit and
ended by reference to the first deposition or first written-discovery response. Anything computed on the old
formulation is wrong now. The Family Code variant, 190.3(b)(1)(B), is materially different and out of scope.

**P-6 — expert designation has no request-service floor in the current text.**
*Proposition:* A party must designate experts by 90 days before the end of the discovery period (party
seeking affirmative relief) or 60 days before the end (all others). **The current text states these as fixed
dates, not as "the later of" a request-service date and the backward count.**
*Cite:* Tex. R. Civ. P. 195.2(a), (b).
*Status:* **UNVERIFIED.** *Source:* July 2026 text: *"a party must designate experts … by the following
dates."*
*Note:* the 2021 redline carried a *"by the later of … 30 days after the request is served"* structure that
**is not in the July 2026 text.** Flagged because a function built on the 2021 formulation would compute a
later date than the rule now allows. Already a queue item (TRCP 195.2(a)/(b) sign-off).

**P-7 — the Level 3 plan must now contain four enumerated things, and the discovery-period clause is
broader than the older text.**
*Proposition:* A Level 3 plan must include (1) a trial date or a date for a conference to set trial;
(2) **a discovery period during which either all discovery must be conducted or all discovery requests must
be sent**, for the entire case or an appropriate phase; (3) limits on the amount of discovery; and
(4) deadlines for joining parties, amending pleadings, and designating experts.
*Cite:* Tex. R. Civ. P. 190.4(b).
*Status:* **UNVERIFIED.** *Source:* July 2026 text.
*Note:* the *"or all discovery requests must be sent"* alternative and the phase-scoping do **not** appear in
the 1998 text the web pass had to fall back on. **A Level 3 case can therefore have a send-by period rather
than a complete-by period** — a different computation shape, not merely a different date.

---

## §4 — Per-defendant computation, and where it stops being per-defendant

**The chain is per-defendant at both ends and case-wide in the middle.** That is the whole model.

| Clock | Scope | Anchor | Authority |
|---|---|---|---|
| Answer due | **PER-DEFENDANT** | that defendant's own service date | 99(b) |
| Written-discovery response | **PER-DEFENDANT** | service of the request on that party | 196.2(a), 197.2(a), 198.2(a) |
| Added days for mail | **PER-DEFENDANT, PER-METHOD** | how *that* party was served | 21a(c) |
| Initial disclosures | **CASE-WIDE**, with a carve-out | first answer or general appearance | 194.2(a) |
| Discovery period | **CASE-WIDE** | when the first initial disclosures are due | 190.3(b)(1)(A) |
| Expert designation | **PER-SIDE**, on a case-wide anchor | end of the discovery period | 195.2 |

**The worked case the model has to survive.** Plaintiff serves identical production requests on D1 and D2 on
the same day. D1 was served with citation three weeks earlier and its answer is already due; D2 was served
last week and its answer is not. Under P-1, **in a PI case neither gets 50 days** — both owe responses 30
days from service. Now vary it: same facts, but D2 was served **by mail** and D1 electronically. Under P-2,
D2 gets three added days and D1 gets none. **Same requests, same service date, different deadlines — and the
difference comes from service method, not from case posture.**

**Where the case-wide middle bites.** D2, served six months into the case, does **not** get a fresh
nine-month discovery period; it inherits the running one (P-5). And if D2 was served *after* the first answer
was filed, it gets its own 30 days for disclosures (P-4's second sentence); if it was served *before* that
answer but simply answered later, it does not. **Answer timing and service timing pull in different
directions here, and only service timing controls.**

**The relief valve is Rule 190.5, not a fresh period** — *"The court may modify a discovery control plan at
any time and must do so when the interest of justice requires."* A late-added defendant's remedy is a motion,
not arithmetic. The engine should surface that as a **prompt**, never compute an extension it has no
authority for.

**An internal tension worth flagging, and it is new.** Rule 99(c)'s citation notice now tells the defendant:
*"These disclosures generally must be made no later than 30 days after **you file your answer** with the
clerk."* Rule 194.2(a) sets the deadline at 30 days after *the filing of the **first** answer or general
appearance.* **For any defendant other than the first to answer, the citation the defendant actually receives
and the rule that actually governs give different dates.** The notice says "generally," which is doing real
work. This is the same territory as open item **V2** (the staggered-answer anchor gap) and is offered as
evidence for it, not as a resolution of it.

---

## §5 — Service-method effects

**Only mail moves a deadline.** 21a(c) adds three days for mail and names no other method. 21a(b) governs
*completion*, which is a different question and is where the other methods differ:

- **Mail or commercial delivery:** complete on deposit, properly addressed and postpaid.
- **Fax:** complete on receipt; **after 5:00 p.m. local time of the recipient, deemed served the following
  day.**
- **Electronic:** complete on **transmission to the serving party's** electronic filing service provider.

**Design consequence:** completion and extension are two separate fields, not one. Fax carries a **time-of-day
rule** that no other method has — the only clock in this memo that depends on the hour rather than the date,
and on the *recipient's* local time. Commercial delivery is complete on deposit like mail but, on the face of
21a(c), **gets no added days** — a deposit-based method without the deposit-based cushion.

This aligns with **P5** from the property-lien engine (*roll rules are registry-sourced, never globally
hardcoded*). Extending "mail +3" to electronic service would silently invent an extension the rule does not
grant — the same failure P5 was written to prevent.

---

## §6 — Level 1 / 2 / 3 interactions

- **Level 2 is the default** — it governs *"unless a suit is governed by a discovery control plan under
  Rules 190.2 or 190.4."*
- **Level 1 and Level 2 share the same anchor** (initial disclosures due) but differ in length: 180 days flat
  at Level 1; earlier-of-two at Level 2.
- **Level 2's end is a multi-anchor reduction** — the earlier of a trial-relative date and an
  anchor-relative date. This is exactly **P2** from the lien engine: *hold all candidate anchors and recompute
  the reduction when any one changes, rather than storing a resolved date.* **Setting or moving a trial date
  is therefore a recompute event on the discovery period**, which is in turn a recompute event on both expert
  deadlines — the skeleton's two-hop derivation.
- **Level 3 displaces the limits it addresses and only those** — *"the discovery limitations of Rule 190.2,
  if applicable, or otherwise of Rule 190.3 apply unless specifically changed in the discovery control plan."*
  So a Level 3 case is **document-derived with rule-derived fallback**, per the skeleton's engine note.
- **Level 3 can change the computation's shape, not just its dates** (P-7): a plan may set a period in which
  *requests must be sent* rather than one in which discovery must be *completed*.
- **Nothing about levels is per-defendant.** Level selection, the period, and any Level 3 plan are attributes
  of the suit. Per-party structure enters only through the response and answer clocks.

---

## §7 — Inputs / outputs sketch

**PROPOSED design input. Not a schema, not authorized, nothing to build from.** Vocabulary deliberately
matches `prop-code-53-28-deadline-engine-design.md` §3.

**Inputs the engine cannot compute and must be given:**

| Input | Scope | Why it cannot be derived |
|---|---|---|
| Service date | **per party** | An external event. Comes from the return of service |
| Service method | **per party** | Decides P-2's added days and 21a(b) completion |
| Fax service time-of-day + recipient's local timezone | **per service event** | The only hour-dependent rule here |
| Date of first answer or general appearance | **case** | The disclosure anchor; a filing event |
| Whether a party was served or joined after that filing | **per party** | Selects which sentence of 194.2(a) applies |
| Family Code suit? | **case** | **Selects whether the 50-day exception exists at all** (P-1) |
| Discovery level, and any Level 3 plan document | **case** | Level 3 displaces rule-derived values |
| Trial setting | **case** | One arm of the P2 reduction |
| Request service date, per instrument, per recipient | **per (instrument, party)** | The response-clock anchor; ties to IN-4's service-event binding |

**Outputs, all derived and none stored:**

- Per-defendant: answer due date; per-instrument response due dates; disclosure due date.
- Case-wide: discovery period start and end; expert designation dates by side.
- **Recompute events:** trial setting set or moved · first answer filed · a party served or joined · Level 3
  plan entered or modified · level changed · a service date corrected. Each is a **cascade**, not a note.

**Three properties the sketch asserts, each traceable above:**

1. **Dates are derived, never stored** — already the skeleton's rule; P-5's two-hop chain is why.
2. **A rule's predicate belongs to the rule, not to the case.** The Family Code flag is not a case-level
   `isFamilyCode` boolean that switches everything; it is a predicate that four specific provisions
   evaluate. This is the lien engine's §2.3 ruling applied to a different body of law.
3. **The engine computes; it does not extend.** Where relief requires a motion (190.5), the output is a
   prompt, not a date.

---

## §8 — Open questions, full text (QR-1)

**Packet-local Q1–Q5. No durable IDs assigned and no series minted** — the DL series has exactly one member
and it is a word (`DL-INPUT`), not a number, so minting `DL-1` would be an unruled act. The runner assigns.

**Q1.** The July 2026 text limits the 50-day discovery-response extension to defendants **in suits governed
by the Family Code** (196.2(a), 196.7(c)(1), 197.2(a), 198.2(a)), while the unqualified 50-day rule appears
only at 194a.3(a) inside the Family-Code-only rule. `trcp-deadline-skeleton-2026-03-01.md` §5 states the
opposite relationship. **Do you verify that reading, and do you want the three skeleton rows edited to match?
This is a live practice question before it is a design question: on this reading a PI or civil-litigation
defendant served before its answer is due has a flat 30 days, and Rule 198.2(c) makes the consequence of
missing it automatic.**

**Q2.** Rule 99(c)'s citation notice tells the defendant that disclosures *"generally must be made no later
than 30 days after you file your answer,"* while 194.2(a) sets the deadline at 30 days after **the first**
answer or general appearance. For any defendant other than the first to answer, the notice and the rule give
different dates. **Does this change your answer to V2 (the staggered-answer anchor gap), and should the
engine surface the discrepancy to the defendant-side user rather than silently applying 194.2(a)?**

**Q3.** No registry entry for **TRCP 21a** exists anywhere in the repo — no proposition, no ruling, no queue
item — yet its added-days provision is per-party and per-method and therefore load-bearing for every response
clock. **Do you want a 21a entry opened, and at what scope: the added-days provision alone (21a(c)), or
21a(b)'s completion rules as well, given that fax carries a time-of-day rule and commercial delivery is
deposit-complete but uncushioned?**

**Q4.** Rule 195.2 in the July 2026 text states expert designation as fixed dates — 90 and 60 days before the
end of the discovery period — with **no** *"later of … 30 days after the request is served"* floor, which the
2021 text carried. **Do you verify that the floor is gone? A designation function built on the 2021
formulation would compute a later date than the current rule allows**, and the 195.2 sign-off is already on
the queue.

**Q5.** Rule 190.4(b)(2) now permits a Level 3 plan to set a period during which *"either all discovery must
be conducted **or all discovery requests must be sent**, for the entire case or an appropriate phase of it."*
That is a different computation shape, not merely a different date, and it can be phase-scoped. **Should the
engine model a Level 3 period as a typed choice between complete-by and send-by, with phase scoping, or
should Level 3 remain wholly document-derived with no structured representation?**

---

## §9 — What this memo did NOT do

- **No case-law retrieval was run, deliberately.** The service-diligence question already lives on the record
  as an UNADOPTED draft entry (*Tex. State Univ. v. Tanner*, open item **V6**), and the reconcile pass
  confirmed the rules themselves set **no deadline for obtaining service** — that is case law, and the
  skeleton says twice that it belongs in the registry as its own entry with a case cite rather than being
  inferred from Rules 99 or 107. **Re-deriving it here would duplicate V6 and pre-empt Michael's routing
  decision.** Everything this memo needed was rule text, and rule text is now sourced to clean authority.
- **Nothing verified, no cite supplied or upgraded, no registry file touched.**
- **No ID series minted.** Q1–Q5 are packet-local.
- **No correction entry filed for the skeleton's 50-day rows** — the skeleton's own header marks its contents
  UNVERIFIED candidates, so no landed assertion is being corrected. The edit is Michael's.
- **Family Code variants are out of scope** by the skeleton's standing scope line, except where a Family Code
  qualifier *decides a non-Family-Code question* — which is precisely §2.
- **The 2026 amendment climate is not surveyed.** A Rule 166a rewrite takes effect 2026-03-01 and the
  skeleton already carries a change flag on it; that is a separate pass.

---

*7 propositions · 5 open questions · rule text sourced to the July 2026 consolidated TRCP in Michael's
Knowledge Repo. Authored 2026-08-14 Central under DT-1. PROPOSED design input; nothing ruled, nothing built,
nothing verified.*
