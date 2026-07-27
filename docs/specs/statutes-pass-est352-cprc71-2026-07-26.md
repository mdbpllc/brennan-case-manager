# Est. Code ch. 352 + CPRC ch. 71 — Statutes Pass Capture (2026-07-26)

**Status:** RAW CAPTURE — text design session, design space, Claude Opus 5. Not canonical, not a design doc,
**not in the build queue.**
**Canonical repo path:** `docs/specs/statutes-pass-est352-cprc71-2026-07-26.md` — filed 2026-07-26 (Code), with the
same-session later-rulings addendum folded into PARTS 10–12.
**Authority read this session:** Tex. Est. Code ch. 352 (full chapter, official text, uploaded by Michael);
Tex. Civ. Prac. & Rem. Code ch. 71 (full chapter, official text, uploaded by Michael).

**Provenance markers** (same convention as `prop-code-53-28-deadline-engine-design.md`):
`[STATUTE]` statutory text in front of us this session · `[C]` Michael ruled aloud · `[P]` proposed,
unobjected, not affirmed · `[D]` new here, never put to Michael · `[OPEN]` asked and unanswered ·
`[CORRECTION]` a prior statement in this project was wrong.

**Sign-off status:** every proposition below is **UNVERIFIED** for registry purposes. Reading the text in
session is not sign-off, per CLAUDE.md binding rule 2. No entry status changed.

---

## PART 0 — ORIGIN

Resumed the statutes queue at its recorded resume point, **Est. Code §352.051**, moved there by the
2026-07-26 session-2 ch. 53/28 pass. `attorney-review-queue.md` §2 posed two questions for it:

1. Is "on proof satisfactory to the court" the operative standard?
2. Does the two-lane separation from the personal representative's commission survive contact with the text?

Everything the repo held on §352.051 before this session originated in the **2026-07-25 voice session,
gathered without verification** (`time-tracker-fee-basis-profiles-design.md` §7 header: items 5–9 untouched;
item 7 is Est. Code ch. 352). Claude flagged at the outset that the last time a voice-session proposition was
tested against primary text — **O1, ch. 28 fee discretion** — the voice framing was wrong. That framing was
raised as a reason for caution, not as a prediction; in the event, the voice note was **right** on the
standard and **wrong** on the classification.

Michael then supplied Est. Code ch. 352. CPRC ch. 71 followed when the V15 question could not be closed from
ch. 352 alone.

---

## PART 1 — EST. CODE CH. 352: THE TWO QUEUE QUESTIONS

### 1.1 Q1 — the operative standard `[STATUTE]`

**Answered: yes, textual and exact.** §352.051 opens "On proof satisfactory to the court, a personal
representative of an estate is entitled to:" — then (1) necessary and reasonable expenses incurred in
(A) preserving, safekeeping, and managing the estate; (B) collecting or attempting to collect claims or
debts; (C) recovering or attempting to recover property to which the estate has a title or claim; and
(2) reasonable attorney's fees necessarily incurred in connection with the proceedings and management of
the estate.

The voice-session parenthetical was correct.

### 1.2 Q2 — the two-lane separation `[STATUTE]`

**Answered: yes, and more strongly than we framed it.** The lanes are separate **subchapters**, not a
practice caution:

- **Subchapter A — Compensation of Personal Representatives** (§§352.001–352.004): the commission.
- **Subchapter B — Expenses of Personal Representatives and Others** (§§352.051–352.053): expenses and
  attorney's fees.

Our docs treat the separation as an error-risk warning. It is an architectural feature of the chapter.

---

## PART 2 — THE MISCLASSIFICATION `[STATUTE]` `[D]`

`time-tracker-fee-basis-profiles-design.md` §6 carries: **Probate | `discretionary-equitable` |
Est. Code § 352.051**. Both halves fail against the text.

1. **The verb is entitlement, not permission.** §352.051 says the representative **"is entitled to."** Not
   "the court may award." The discretion sits in the proof condition ("on proof satisfactory to the court")
   and in the modifiers ("necessary and reasonable," "necessarily incurred") — not in the award verb.
2. **"Equitable and just" appears nowhere in ch. 352.** The measure is necessity and reasonableness. After
   this session, `discretionary-equitable`'s only live exemplar is Prop. Code §28.005(b).

### 2.1 Verb variance inside the single chapter

| Provision | Verb |
|---|---|
| §352.051 — expenses + attorney's fees | **is entitled to** |
| §352.052(a) — executor-designate defends will | **shall** be allowed |
| §352.052(b) — devisee/beneficiary defends will | **may** be allowed |
| §352.003 — alternate compensation | the court **may** allow |
| §352.004 — denial of commission | the court **may** deny |

Three distinct entitlement forms in adjacent sections. This is the **fourth shape** the ch. 53/28 doc §7.2
predicted would force the enum to decompose — arriving one session later rather than several statutes out.

---

## PART 3 — §352.052, MISSING FROM OUR DOCS ENTIRELY `[STATUTE]` `[D]`

Same failure mode as §28.0091 dropping out of the ch. 28 entry: a whole section absent, not merely
mis-stated.

**§352.052 — Allowance for Defense or Successful Contest of Will.**

| Subsec. | Who | Condition | Entitlement |
|---|---|---|---|
| (a) | person designated executor in a will/alleged will, or administrator with will annexed | defends the will, or prosecutes any proceeding, **in good faith and with just cause** — for the purpose of having the will admitted to probate — **whether or not successful** | **shall** be allowed out of the estate |
| (b) | person designated a devisee in or beneficiary of a will/alleged will | same conditions, **whether or not successful** | **may** be allowed out of the estate |
| (c) | "interested person," which **does not include a creditor or any other having a claim against the estate** | **successfully** prosecutes a proceeding to contest validity of a will offered for or admitted to probate, in good faith and with just cause | **may** be allowed out of the estate |

Allowance in each is "necessary expenses and disbursements in those proceedings, **including reasonable
attorney's fees**."

**The asymmetry:** defending a will is protected win-or-lose; contesting one is not. And the contest lane
excludes creditors and claimants from "interested person" outright.

**The orthogonality (this is what settled O6):** (a) vs. (b) vary the **entitlement verb** while holding the
success condition constant. (b) vs. (c) vary the **success condition** while holding the verb constant. One
section, three subsections, two axes moving independently.

---

## PART 4 — §352.053 AND MICHAEL'S RULING

### 4.1 The text `[STATUTE]`

**§352.053 — Expense Charges.** (a) The court shall act on expense charges in the same manner as other
claims against the estate. (b) All expense charges shall be: (1) made in writing, showing specifically each
item of expense and the date of the expense; (2) verified by the personal representative's affidavit;
(3) filed with the clerk; and (4) entered on the claim docket.

### 4.2 V14 — RULED `[C]`

**Michael, 2026-07-26, verbatim:** *"The 053 expenses are different than the 051(2) fees."*

**Reason recorded:** they are different things — §352.053 governs expense charges, not the attorney's-fee
item at §352.051(2).

**Consequence:** the fee lane does **not** inherit the §352.053 procedural shape. Warning 6's export
therefore separates **three** things, not two:

| Lane | Authority | Shape |
|---|---|---|
| Commission | Subchapter A (§352.002, §352.003) | 5% computation; not a time-ledger output |
| Expenses | §352.051(1), traveling as §352.053 charges | written, itemized, dated, affidavit-verified, clerk-filed, claim-docketed |
| Attorney's fees | §352.051(2) | on proof satisfactory to the court; *Rohrmoos*-shaped |

### 4.3 The gap the ruling opens — V14a `[D]` `[OPEN]`

Flagged by Claude as a downstream consequence, **not** as a challenge to the ruling: §352.053 is the only
procedure stated anywhere in ch. 352. Putting fees outside it leaves the chapter silent on what vehicle
carries a §352.051(2) fee request and how the court acts on it. That vehicle is what the probate export must
be shaped against. Needs practice knowledge or authority elsewhere in the Estates Code.

---

## PART 5 — THE COMMISSION, PRECISELY `[STATUTE]`

Our shorthand ("the separate ~5% statutory commission") flattens real structure.

**§352.002 — Standard Compensation.** An executor, administrator, or temporary administrator **a court finds
to have taken care of and managed an estate in compliance with the standards of this title** is entitled to
a five percent commission on all amounts **actually received or paid out in cash in the administration of
the estate**.

**Two five-percent figures, not one.** §352.002(b)(1): the commission may not exceed, in the aggregate, more
than five percent of the **gross fair market value of the estate subject to administration**. A rate and a
cap, on different bases.

**Three exclusions**, §352.002(b)(2) — no commission for:

- (A) receiving funds belonging to the testator or intestate that were, at death, on hand or held for them
  in a **financial institution or a brokerage firm**, including cash or a cash equivalent in a checking
  account, savings account, certificate of deposit, or money market account;
- (B) **collecting the proceeds of a life insurance policy**;
- (C) **paying out cash to an heir or legatee in that person's capacity as an heir or legatee**.

**§352.001** exists solely to define "financial institution" for exclusion (A) — bank, trust company,
savings bank, building and loan association, savings and loan company or association, credit union.

**§352.003 — Alternate Compensation.** The court **may** allow reasonable compensation, including for
unusual efforts to collect funds or life insurance, if (1) the representative manages a farm, ranch,
factory, or other business of the estate, or (2) the §352.002 figure is unreasonably low. (b) The county
court has jurisdiction to receive, consider, and act on applications from **independent executors** for this
purpose.

**§352.004 — Denial of Compensation.** The court may, on application of an interested person or its own
motion, **wholly or partly** deny a commission if (1) it finds the representative has not taken care of and
managed estate property prudently, or (2) the representative has been removed under §404.003 or Subchapter B,
Chapter 361.

**Two exclusions land on PI-adjacent facts:** (B) life insurance proceeds and (C) cash paid out to heirs.

---

## PART 6 — CPRC CH. 71: V15

### 6.1 WD proceeds are not estate funds — three independent hooks `[STATUTE]`

- **§71.004(a)** — a WD action is "for the **exclusive** benefit of the surviving spouse, children, and
  parents of the deceased." The estate is not among the beneficiaries.
- **§71.010(b)** — damages "shall be divided, in shares as found by the jury in its verdict, among the
  individuals who are entitled to recover **and who are alive at that time**." Apportionment happens in the
  verdict, not in administration.
- **§71.011** — WD damages "are **not subject to the debts of the deceased**." They bypass the estate's
  creditor machinery.

**Therefore** §352.002's commission base — amounts "actually receives or pays out in cash **in the
administration of the estate**" — has nothing to attach to on a WD-only file. The money is never estate
money, **even where the PR is the one who recovered it**.

**§71.004(c) is the PI-adjacent case and it does not change this.** If none of the individuals entitled to
bring the action have begun it within **three calendar months** after the death, "his executor or
administrator **shall** bring and prosecute the action **unless requested not to by all those individuals**."
A representative compelled to prosecute an action whose proceeds are not the estate's.

**Status:** WD half of V15 **closed against the commission — subject to Michael's sign-off.** Reading is not
verification.

**Incidental:** this confirms `pi-case-playbooks.md` row **L10** against text — the 3-month trigger and the
unless-all-request-otherwise carve-out both match as written.

### 6.2 CORRECTION — the survival lane `[CORRECTION]`

**Claude stated earlier in this same session that "a survival recovery is estate property." §71.021(b) does
not say that.** It says a personal injury action "survives to and in favor of the **heirs, legal
representatives, and estate** of the injured person." Three named takers, unranked; the chapter does not say
when the claim runs to heirs directly versus through an administration.

**Consequence:** the survival half of V15 is **live but unresolved**. Whether funds pass through the
representative's hands in administration cannot be closed from ch. 71. Same shape as **V4** — the statute
cannot close it; case law must.

**Even where survival funds do flow**, §352.002(b)(2)(C) excludes cash paid out to an heir or legatee as
such — so a survival recovery distributed to heirs would commission on the **receipt side only**, roughly
half the base the "5% of amounts received or paid out" shorthand implies.

### 6.3 V17 — the sharper problem `[D]` `[OPEN]`

§352.051(2) reimburses fees "necessarily incurred **in connection with the proceedings and management of the
estate**." Put beside §71.004(c): a representative **statutorily compelled** to prosecute a WD action incurs
fees on a proceeding whose recovery is, per §71.004(a) and §71.011, not the estate's at all.

Are those fees "in connection with … the estate" and reimbursable from estate assets? The text points both
ways — the duty is imposed on the representative *as* representative, but the benefit runs elsewhere.
Neither chapter answers it.

**This is the question that decides whether the probate fee profile touches the PI practice.**

### 6.4 A contingency interaction not previously in our docs `[D]` `[P]`

On a contingency survival file, the fee comes from the recovery under the fee contract. §352.051(2) is a
**reimbursement to the personal representative** for fees the representative necessarily incurred. Two
different routes to payment on the same matter. Whether both can be live, or one displaces the other,
changes what the time tracker is for on these files. Raised; not ruled.

---

## PART 7 — THE O6 DECOMPOSITION

### 7.1 The evidence table (text read across this session and 2026-07-26 session 2)

| Provision | Entitlement | Measure | Source of payment |
|---|---|---|---|
| DTPA §17.50(d) | shall be awarded | reasonable and necessary | opposing party |
| Prop. §53.156 | court **shall** award | "as are equitable and just" | opposing party |
| Prop. §28.005(b) | court **may** award | "as the court determines equitable and just" | opposing party |
| CPRC §38.001 | **may recover** | reasonable | opposing party |
| Est. §352.051 | **is entitled to**, on proof satisfactory | necessary / necessarily incurred | **the estate** |
| Est. §352.052(a) | **shall** be allowed, whether or not successful | necessary, incl. reasonable fees | the estate |
| Est. §352.052(b) | **may** be allowed, whether or not successful | same | the estate |
| Est. §352.052(c) | **may** be allowed, **success required** | same | the estate |

### 7.2 O6 — RULED `[C]`

Claude presented two paths: **decomposition** (recommended) or the conservative **fifth flat value**
(`conditional`), decomposing only if the Family Code block also broke the enum. Michael: *"I'll go with your
suggestion."* → **DECOMPOSITION ADOPTED.**

Claude confirmed the reading back explicitly and invited correction if the conservative path was meant.

**Reason recorded:** §352.052 demonstrates entitlement and success-condition varying **orthogonally inside a
single section** — which is different in kind from four statutes merely happening to differ. A flat enum
needs one value per combination. Nothing is built on the enum, so the change costs no migration; O4 said the
name could change freely "before anything is built on it," and that window is open now and closes when the
time tracker enters the queue.

### 7.3 The adopted shape `[C]` on structure, `[P]` on the specific field names and value lists

```ts
feeBasis: {
  entitlement: 'mandatory' | 'discretionary' | 'conditional'
  measure:     'reasonable-necessary'
             | 'equitable-just'
             | 'court-determined-equitable-just'
  source:      'opposing-party' | 'fund'      // fee-shifting vs. reimbursement
  direction:   ...                            // O5, unchanged in substance
  conditions:  Predicate[]                    // success-required, good-faith-and-just-cause,
                                              // proof-satisfactory, residential-downgrade
}
```

**Note the CONFIRMED/PROPOSED line:** Michael ruled the **decomposition**. The exact field names, the
enumerated values, and the predicate vocabulary are Claude's draft and remain **PROPOSED, unruled** — rename
freely.

### 7.4 What the ruling does to the existing open items

- **O4 (what to name `mandatory-equitable`) — DISSOLVED, not resolved.** No value remains to name. §53.156
  becomes `{entitlement: mandatory, measure: equitable-just, source: opposing-party}`. Michael's 2026-07-26
  "new value" ruling survives in substance; it is now expressed rather than labeled.
- **V16 — SPLIT.** The schema half is gone: "is entitled to, on proof satisfactory" needs no fourth shape,
  it is `{mandatory, reasonable-necessary, fund}` + a `proof-satisfactory` condition. **The legal half
  stands open and untouched:** does "is entitled to" actually bind the court, or is it looser than "shall
  award"? That is a reading of §352.051, not a modeling choice.
- **O5 — ABSORBED, pending confirmation.** `direction` survives as its own axis. `conditionalDowngrade`
  becomes a `conditions` predicate (`residential-downgrade`) rather than a standalone attribute. This
  changes O5's shape without Michael having ruled its substance.

### 7.5 The case against, as put to Michael before he ruled

Preserved because a rejection encodes a constraint: a record is harder to switch on than an enum — warnings,
export selection, and the profile picker currently branch on one value and would branch on a shape. And
there is real over-fitting risk across only eight provisions; if the Family Code block fits the flat enum
comfortably, the decomposition buys complexity for nothing.

---

## PART 8 — CROSS-CUTTING FINDINGS

### 8.1 A second month-based primitive `[D]`

§71.004(c) counts **"three calendar months after the death"** — a month-count forward from a specific date.
This is **not** ch. 53's P1 month-ordinal, which uses only the anchor's *month* and discards the day
(§53.052: "the 15th day of the fourth month after the month in which…").

Two distinct month shapes now in the project. The primitive library needs both; a single generalized "month"
function will silently mis-compute one of them. **Proposed as P7** in
`prop-code-53-28-deadline-engine-design.md` §3.

### 8.2 §71.005 — a trial-practice guardrail our WD playbook lacks `[STATUTE]` `[D]`

Evidence of the **actual ceremonial remarriage** of a surviving spouse is admissible if true, **but the
defense is prohibited from directly or indirectly mentioning or alluding to** a common-law marriage, an
extramarital relationship, or the marital prospects of the surviving spouse. Belongs in the WD playbook, not
in the fee work — it is the kind of thing discovered mid-trial.

### 8.3 Law-change ledger — the fourth homeless family `[STATUTE]`

Ch. 352 additions:

- **Whole chapter** added by Acts 2009, 81st Leg., R.S., Ch. 680 (H.B. 2502), §1, **eff. January 1, 2014**.
- **§352.004** amended: Acts 2011, 82nd Leg., R.S., Ch. 1338 (S.B. 1198), §2.45, eff. 1/1/2014; Acts 2013,
  83rd Leg., R.S., Ch. 161 (S.B. 1093), §6.013, eff. 1/1/2014.
- **§352.052** amended: Acts 2015, 84th Leg., R.S., Ch. 949 (S.B. 995), §34, eff. 9/1/2015; Acts 2019, 86th
  Leg., R.S., Ch. 1141 (H.B. 2782), §§24 **and** 25, both eff. 9/1/2019.

Ch. 71 additions: §71.012 and §71.022 added 1999 (Ch. 382 §§1–2, eff. 5/29/1999), each amended 2017
(S.B. 1488 §§22.005/22.006, eff. 9/1/2017) and 2019 (H.B. 2780 §1, eff. 9/1/2019). §71.001, §71.003 amended
2003 (Ch. 822 §§1.01–1.02); §71.0055 added 2003 (Ch. 822 §1.03).

**The trap `[D]`:** ch. 352's §352.004 was amended in **2011 and 2013** — amendments to a provision whose
own effective date was **1 January 2014**. Any ledger keyed on enactment year mis-sorts this. It is also a
**third applicability-anchor pattern**, alongside "commenced" (§38.001, §53.156) and "date of service"
(H.B. 4145).

Per `docs/spec-feedback.md` (2026-07-26), **no canonical law-change ledger file exists**. This session makes
that the **fourth** family of ledger entries with no home (166a, 239a, ch. 53/28 bills, and now
ch. 352 / ch. 71). Flagged; not resolved.

---

## PART 9 — WHAT WAS NOT COVERED

Read in the uploaded text but **not worked** this session. Recorded so a later pass does not assume the
chapter was mined:

- **§71.051 forum non conveniens** carries real deadline material the engine may want: a request is timely
  if filed **not later than 180 days after the time required for filing a motion to transfer venue**;
  hearing only after **not less than 21 days'** notice; hearing **not less than 30 days prior to trial**;
  §71.051(g) any time limit extendable by the court for good cause. Not analyzed.
- **§71.008(b)** — where a *defendant* dies, "a judgment in favor of the plaintiff shall be paid in due
  course of administration." A defendant-side estate touchpoint; unexamined.
- **§71.012 / §71.022** — foreign personal representative who has complied with Estates Code ch. 503 need
  not apply for ancillary letters under §501.006 to bring the action. Unexamined.
- **§71.003(c)** unborn-child claim exclusions; **§71.009** exemplary damages for wilful act, omission, or
  gross negligence; **§71.002(c)–(e)** the carrier/plant/receiver liability categories; **§71.031**
  out-of-state acts. All unexamined.
- **Est. Code §404.003 and Subchapter B, ch. 361** (removal, referenced by §352.004) — not pulled.
- **Est. Code ch. 503 / §501.006** — not pulled.
- The **Family Code block** — untouched; it is the next resume point.

---

## PART 10 — OPEN ITEMS

| ID | Item | Status | Owner |
|---|---|---|---|
| **V14** | §352.053 expenses vs. §352.051(2) fees | **CLOSED — ruled 2026-07-26: different things** | — |
| **V14a** | What procedural vehicle carries a §352.051(2) fee request, given fees sit outside §352.053? Ch. 352 is silent | **OPEN — new** | Michael |
| **V15** | Does the commission lane touch PI work? | **WD half CLOSED against the commission, pending sign-off. SURVIVAL half OPEN** — §71.021(b) names heirs, legal representatives, *and* estate; needs case law | Michael / citator pass |
| **V16** | Does "is entitled to" bind the court, or is it looser than "shall award"? (schema half dissolved by O6; legal half stands) | **OPEN — narrowed** | Michael |
| **V17** | Are a §71.004(c)-compelled representative's fees "in connection with … the estate" and reimbursable, where the WD recovery is not the estate's? | **OPEN — new; decides whether the probate profile touches PI at all** | Michael |
| **O4** | Name for `mandatory-equitable` | **DISSOLVED by O6** | — |
| **O5** | `direction` / `conditionalDowngrade` attributes | **ABSORBED into O6's shape — substance never ruled; confirm** | Michael |
| **O6** | Fee-basis enum decomposition | **CLOSED — RULED, decomposition adopted** | — |
| **S-1** | Is probate a real practice line, or only PI-adjacent heirship / PR-appointment work? | **CLOSED — RULED 2026-07-26: probate IS a mapped practice line, full build-out. See A1 below** | — |
| **PR-1** | Independent vs. dependent administration — what share? | **CLOSED — RULED 2026-07-26: independent administration is in scope; deadline machinery matters here. See A2** | — |
| **PR-2** | Contested vs. uncontested administration | **CLOSED — RULED 2026-07-26: will contests are a rare branch; §352.052 is secondary. See A3** | — |
| **D3 / H8** | Shared touch substrate | **CLOSED — RULED 2026-07-26: case-event core (CE), shape (c). See A4** | — |
| **N-1** | `T1` naming collision (transcript vs. heartbeat/time-tracker senses) | **CLOSED — RULED 2026-07-26: T-series unchanged; CE1 / HB<n> / TT<n>. See A5** | — |
| **RE-1** | Referral engine — triggers, logging, letter, conflicts interaction | **OPEN — new; ruled yes-eventually only. See A7** | Michael |
| **FAM-1** | Family furniture in `src`/`db` — does it exist, and is removal authorized? | **CLOSED by Code verification 2026-07-26 — none exists; nothing to remove. See A6 note** | — |
| — | Contingency fee contract vs. §352.051(2) reimbursement — can both be live? | **PROPOSED as a question, unruled** | Michael |

**Carried, unchanged by this session:** V10 (zero award despite "shall" — citator pass, now RUNNABLE per A8);
V11 (1½%/month simple or compound); V12 (public-entity prompt pay, gap flagged); V13 (bidirectional lien-fee
exposure); V4 (notice defects fatal? — still gates the disbursement checklist); Entry 1(c-3) qualified LOP;
Q-5 model-usage clause unruled; Q-6 FLP internal-tooling terms (research OK, app integration blocked).

*(Reconciled 2026-07-26 when the addendum folded in: the S-1 row, the D3/H8-blocks-T1 carry, and the FLP
promo carry as originally captured are all superseded by A1/A4/A5/A8 below. The FLP promo item was already
CLOSED repo-side earlier the same day at Michael's direction — session-log entry #5.)*

---

# ADDENDUM — Later-session rulings: probate scope, D3/H8, slice rename, family law (2026-07-26)

Same session, same day, later in the conversation. Folded in here per the packet routing; supersedes the
earlier S-1-only addendum, which was never filed. **Provenance markers:** `[C]` ruled aloud · `[P]` proposed,
unruled · `[OPEN]` asked, unanswered · `[D]` Claude analysis, unverified.

## A1 — S-1 CLOSED — probate is a practice line `[C]`

**Michael, 2026-07-26:** *"Probate is actually going to be a practice line. Not so many of these cases, but
enough to where I would like to have this built out fully."*

Probate is a **mapped practice line**, not PI-adjacent incidental work, and the desired depth is **full
build-out**, explicitly notwithstanding low volume. Consequences: **V15** (survival half) and **V17** become
load-bearing rather than scoping curiosities; **§352.052** becomes live litigation content rather than a
noticed omission; ch. 352 is the **compensation corner** of a line whose other chapters are entirely unread.

## A2 — PR-1 CLOSED — independent administration is in scope `[C]`

**Michael:** *"There will be enough independent administration to make it worthwhile to build it out."*

**Reason (load-bearing — do not "improve" this):** independent administration is a real share of the work, not
an edge case, so the probate line is built around it. Consequences: the **deadline machinery matters** on this
line (the open question was whether independent administration strips out enough court supervision to make the
deadline engine nearly irrelevant — it does not); **§352.003(b) is live**, not incidental, singling out
independent executors for county-court jurisdiction over alternate-compensation applications; the line's
**spine is independent administration**, with dependent administration not ruled out but not what it is
shaped around.

## A3 — PR-2 CLOSED — will contests are a rare branch `[C]`

**Michael:** *"Will contest is a rare branch. I'm not doing that that often."* **Reason:** low frequency in
the practice.

**§352.052 builds as a secondary branch, not a core module.** Its content is still recorded — the
defend-vs-contest asymmetry is a real case-selection fact — but it does not shape the spine. Combined with A2,
**the probate line's spine is independent, uncontested administration** — the bounding answer "built out
fully" needed. The asymmetry, preserved for the branch when it is built: an executor-designate defending a
will in good faith and with just cause is allowed fees **whether or not successful** (`shall`, subsec. a); a
devisee or beneficiary, same conditions (`may`, subsec. b); an **interested person contesting must succeed**
(`may`, subsec. c), and "interested person" **excludes creditors and other claimants**.

## A4 — D3/H8 CLOSED — the case-event core, shape (c) `[C]`

**Michael:** *"On the D3/H8, I'm going with your recommendation."* Read back in-session and not corrected.

The shared touch substrate is a **case-event core (CE)** — a shared spine plus **per-consumer facets** — owned
design-side. Heartbeat and time tracker are **consumers, not owners**.

- **Spine:** case, timestamp, actor, channel, note.
- **Heartbeat facet:** thread, outcome, next interval.
- **Time facet:** duration, timekeeper, claim tag, the four *Rohrmoos* elements.

**The evidentiary boundary, ruled as part of the same recommendation.** A facet is either **operational** or
**evidentiary**, and **only evidentiary facets are eligible for a sworn fee affidavit** — the wall that stops
an auto-logged "inbound email detected" event from surfacing in a *Rohrmoos* affidavit.

**Why shape (c) — the rejections encode the rule:** not two independent tables, because the heartbeat could
not then see a call logged as time and "when did this case last move" would have two answers; not one table
with a union of nullable columns, because **the sets do not nest** — a client phone call is both a touch and
a time entry, an inbound provider email that resets the heartbeat clock is a touch and not compensable time,
research on a brief is time and touches no thread. Any 1:1 table is wrong at both ends.

**Consumer count at the time of ruling is four**, not the two the design doc was written against: heartbeat
threads, time entries, the Servpro release thread (arms on payment), and — per S-1 — probate matter threads.

**Interaction to preserve `[D]`:** auto-generated touches carry machine-accurate timestamps while human time
entries may be back-logged and badged under the 2026-07-26 contemporaneity ruling; the
operational/evidentiary split is what keeps the badge's meaning intact.

**This UNBLOCKS the first slice (CE1). It does NOT authorize building it.**

## A5 — N-1 — slice naming collision resolved `[C]` on the grant, `[D]` on the scheme

`T1` was doing two unrelated jobs: the **transcript sort-and-route** slices (T1–T4, CLAUDE.md build sequence
item 5) and the **first build slice of the heartbeat and time tracker**. "D3/H8 blocks T1" was genuinely
ambiguous, and the wrong reading — that the shared-substrate question holds up transcript work — is the
plausible one for a Code session reading from the build sequence.

**Michael's grant `[C]`:** *"I'm giving you free range to rename this. Go ahead and tell me what you're gonna
rename it to."*

| Series | Meaning | Change |
|---|---|---|
| **T1–T4** | Transcript sort & route | **UNCHANGED** — anchored in CLAUDE.md's build sequence; T-for-transcript is a real mnemonic |
| **CE1** | The shared case-event core — the substrate D3/H8 gated | **NEW** — replaces "T1" in its heartbeat/time-tracker sense |
| **HB1, HB2…** | Heartbeat slices built on CE | **NEW** |
| **TT1, TT2…** | Time-tracker slices built on CE | **NEW** |

**In-session revision, recorded honestly.** Claude first ruled aloud an **S-series (S1, S2…)**, then caught
while assembling the packet that **S-1 is already in use in this same session** as the probate ruling ID —
`S1` and `S-1` one hyphen apart, the identical failure mode the rename exists to kill. The scheme above
replaces it under the same grant. Michael can override; nothing here is irreversible. CE/HB/TT additionally
**encodes the A4 ruling in the naming**: a shared core with two consumers on top.

**Execution constraint:** read-in-context correction, NOT a blind search-and-replace — the two `T1`s are
visually identical.

## A6 — Family law: no case type, ever `[C]`

**Michael, twice:** *"I am not going to be practicing family law."* / *"Delete it."* Then the refinement, in
his own words: *"If there's some family law considerations in probate or any my other matters that are worth
flagging and bringing up to me, like, telling me that there is a family law issue, you can still keep that
stuff, but I don't need family law as its own case type. I will not be creating any family law cases. Any
family law cases that I encounter, whether it's through my own clients or someone calling me, I refer those
out immediately."*

Three load-bearing parts: (1) **no family-law case type, ever** — the fee-basis family row, the family
profile, and **O2** (Fam. Code §156.005 mandatory-pocket check) come out as a practice line; (2) **family-law
*considerations* are RETAINED as cross-cutting flags**, load-bearing for probate specifically — heirship turns
on family relationships, a surviving spouse's homestead and share touch the estate, and common-law marriage
already drives the wrongful-death beneficiary set (CPRC §71.005 bars the defense from raising it at trial,
which presumes it can matter); the system should be able to say *"there is a family-law issue here — flag it,
refer it out"* inside a probate or PI matter without ever creating a family case; (3) **referral out is
first-class behavior** — see A7.

**What DELETE does not reach `[D]`:** the **fee-basis schema keeps its full shape** (the §156.005
mandatory-pocket lesson is already baked into the ruled O6 decomposition and stays, even though the row that
taught it is gone; the probate chapters inherit the same stress test), and **TDRPC 1.04 stays in the statutes
queue** — it is the fee-*reasonableness* rule, core to PI contingency work; only its divorce-contingency
subpart is mooted. Irreversibility was flagged in-session before Michael confirmed: delete is not park, and
the voice-session research behind §§106.002, 6.708, and 156.005 goes with it.

**Code verification 2026-07-26 (FAM-1, answering the packet's §4.3):** no family furniture exists in source
to remove — no family practice area or case type in `src/domain/caseTypes.ts`, no family-specific roles in
`src/domain/partyRegistry.ts`, no family tables, columns, or enum values in `db/schema.sql`. The removal is
doc-only in fact as well as in authorization; FAM-1 closes with nothing to do.

## A7 — RE-1 — referral engine, new open item `[C]` on "yes eventually", `[OPEN]` on everything else

**Michael:** *"There should be a referral engine built in, but that'll be an open piece."* Logged as its own
concept, **not** a sub-piece of the family ruling: a referral engine is not family-specific — conflicts,
matters outside the practice areas, and overflow are all inputs, family being one among several. **Ruled yes,
eventually. Everything else is OPEN** — trigger set, whether it logs referrals, whether it produces a referral
letter, whether it touches the conflicts check. Future design pass.

## A8 — FLP / CourtListener CLOSED `[C]`

**Michael:** *"Forget the promo. We can still use it after the promo and I already signed up during the promo
period."* The 30-day window **doubles access for members and non-members alike** — a **usage promotion, not a
signup window** — so the 2026-08-06 date carried on nine consecutive log entries was never a cliff. Account
done; access survives 8/6. **Connector confirmed live** in the claude.ai project.

**Consequence: the V10 citator pass is RUNNABLE.** Q-6 unchanged — research authorized, app integration
blocked. **Standing constraint, binding:** the **majority-opinion rule** governs opinion retrieval — cluster
IDs do not reliably resolve to the majority (the live *Haygood* near-miss returned the dissent), and every
retrieval is checked before an opinion is characterized.

## A9 — Process notes `[D]`

- **A half-answered question from this session: O5.** Claude listed it as needing only a yes; Michael answered
  the items around it and moved on. **Still OPEN** — recorded specifically because a smooth write-up would
  make it look settled.
- **Claude revised its own naming ruling mid-packet** (A5); the record carries the error and the correction.
- **Two heavy items deliberately NOT attempted at the end of a long session:** the registry sign-off queue
  (entries 1–10) and the billing gates (Entry 1(c-3), V4). Both need Michael reading primary text and ruling
  proposition by proposition, and a tired sign-off feeding a sworn-affidavit pipeline is the exact failure the
  registry discipline exists to prevent. Held by reasoning, not oversight.

## A10 — Documents now out of date `[D]`

- **`case-management-project-instructions.md`** was wrong in **two** directions — probate absent, family
  present. One amendment fixed both (applied 2026-07-26).
- **The claude.ai project instructions (v2)** describe the practice as *"PI, criminal defense, family."*
  **Michael's exact correction, 2026-07-26: the practice areas are "PI, civil litigation, criminal defense,
  probate"** — four, not three; civil litigation was dropped in the design side's paraphrase and again in
  Code's first pass at this line. Neither Claude nor Code can edit these — Michael's paste. Also
  carried for that revision: the stale line showing the three carried-file duplication checks as open when
  session-log entry #4 closed them.

---

*(End of addendum. The two sections below are the original capture's PARTS 11–12, written earlier in the same
session; the addendum above supersedes them where they conflict.)*

## PART 11 — PROCESS NOTES

- **Michael deferred sequencing to Claude** ("whichever you think is best"). Claude took O6 next and stated
  the reason: it needed no new primary text, and the enum window closes once anything is built on it. That
  was a Claude sequencing call, not a Michael ruling.
- **Claude declined to resolve S-1 unilaterally**, having raised it twice. It is a scope question about the
  practice, not a design question.
- **Claude flagged V14a as a consequence of Michael's own ruling** rather than treating it as a reason to
  revisit the ruling.
- **Claude corrected itself in-session** on §71.021(b) (see 6.2). Per the verify-before-criticizing
  convention, the correction goes in the record.
- **Q-3 and Q-4 answered incidentally at session start** — `docs/prompts/QUEUE-RUNNER.md` returned in
  project-knowledge search in a chat that began today, so it is indexed and `docs/prompts/` is inside the
  sync selection. Both can be struck from BUILD-STATE.
- **Instructions v2 carries one stale line** — the working-set section says the three carried files'
  repo-duplication checks are open; session-log #4 records a same-day Code note closing both. For Michael's
  next instruction revision; not a trigger on its own.

---

## PART 12 — RESUME POINT

**SUPERSEDED LATER THE SAME DAY — see A6 in the addendum above.** As originally captured, the resume point was
the Family Code block (Tex. Fam. Code §§106.002, 6.708, 6.502(a)(4), 156.005), expected to stress-test the O6
decomposition with §156.005's frivolous-modification mandatory pocket inside an otherwise discretionary
regime.

**The Family Code block is MOOT** — family law is out of scope by ruling and no family case type will ever
exist. **The probate chapters are the replacement O6 stress test.**

**Current resume point:** TDRPC 1.04 (retained — the fee-*reasonableness* rule, core to PI contingency work;
only its divorce-contingency subpart is mooted), TRCP 204.1, and the Estates Code territory the probate line
needs — will admission and letters, heirship, notices to beneficiaries and creditors,
inventory/appraisement/list of claims, claims presentation and allowance, independent administration.

**Also runnable independently:** the **V10 citator pass — now RUNNABLE** (FLP account done, connector live;
the promo was never a cliff — see A8), subject to the majority-opinion rule; L0/L1 of the ch. 53/28 build
sketch, subject to that doc's build gate.
