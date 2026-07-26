# Prop. Code ch. 53 + ch. 28 — Deadline Engine Design (Servpro Line)

**Status:** DESIGN — first full pass. **NOT canonical. NOT in the build queue.**
**Canonical repo path:** `docs/specs/prop-code-53-28-deadline-engine-design.md`
**Session:** 2026-07-26, design space, Claude Opus 5. Text session.
**Authority read this session:** Tex. Prop. Code ch. 53 (full chapter, official text, uploaded by Michael); Tex. Prop. Code ch. 28 (full chapter, official text, uploaded by Michael); enrolled S.B. 539, 82nd Leg., R.S. (2011) (retrieved by Claude from Texas Legislature Online).

**Provenance markers:** `[READ]` Michael read the primary text this session · `[STATUTE]` statutory text in front of us · `[CLAUDE-RETRIEVED]` Claude pulled it, Michael has not read it · `[C]` Michael ruled aloud · `[P]` proposed, unobjected, not affirmed · `[D]` new here, never put to Michael · `[OPEN]` asked and unanswered.

---

## ⛔ BUILD GATE — READ BEFORE ANY CODE SESSION TOUCHES THIS

**Michael's ruling, 2026-07-26 `[C]`:** do the full deadline-engine design, **but this will not be completely built out until after an in-person meeting with the staff of Servpro.** After that meeting he will supply new notes from it and re-feed whatever statutes are needed for a further processing pass.

Consequences, binding:

1. **Nothing in this document enters the build queue.** Not T-items, not schema, not the primitives.
2. **This document is expected to change** after the Servpro meeting. Treat every workflow assumption here as provisional — the operational reality of how Servpro actually delivers packets, dates jobs, and defines "completion" is precisely what the meeting will settle, and it drives the anchors.
3. **Do not resolve the open items in §11 unilaterally.** Several are questions *for the Servpro staff*, not for a Code session or for Claude.
4. Every legal proposition here is **UNVERIFIED** for registry purposes until Michael signs off entry by entry, per CLAUDE.md binding rule 2 — including the ones where the statutory text was read in this session. Reading is not sign-off.

---

## 1. Why this chapter pair, and why now

Ch. 53 and ch. 28 were on the fee-basis registry queue as two of the nine entries behind the time tracker. That framing understated them. Per `case-management-project-instructions.md`, the **Servpro line is a mapped case type with its own lifecycle**, and its defining feature is that *perfection-and-filing is the main event, not a preliminary step*: the client (a Servpro restoration operator) sends a packet — unpaid invoice plus property-code data, critically the **last date service was provided / job completion date** — and that date drives the filing deadline. The filed lien clouds title and pressures the carrier that owes the homeowner; roughly 98% of the client's money comes from insurers, and most matters settle once the lien attaches. Suit to foreclose is the rarer tail.

So this is not a fee-basis footnote. **It is the one practice area in the project where a missed statutory deadline destroys the entire matter on the primary path**, and where the software's core job — compute the date from the packet, drive the perfection sequence, prove it happened — is the whole product.

Ch. 28 rides alongside: same client, same jobs, a separate and stackable payment-timing regime. §28.007(b) `[STATUTE]` says nothing in ch. 28 changes rights or obligations under ch. 53, and §28.009(f) says its remedies are in addition to others. **The two chapters are siblings, not alternatives**, and the registry entries must say so explicitly.

---

## 2. Threshold gates — these run BEFORE any deadline computes

The design's most important structural finding. A deadline engine that starts by computing dates has already failed on this practice area, because on a residential restoration job **the lien may not be available at all**, and the reason is knowable at intake.

### 2.1 The homestead gate `[D]` — the highest-consequence item in this document

§53.254 `[STATUTE]`. To fix a lien on a homestead, **all** of the following must be true:

| # | Requirement | § |
|---|---|---|
| 1 | A **written contract** setting out the terms | 53.254(a) |
| 2 | Executed **before** material is furnished or labor performed | 53.254(b) |
| 3 | Signed by **both spouses** if the owner is married | 53.254(c) |
| 4 | **Filed with the county clerk** of the county where the homestead is located | 53.254(e) |
| 5 | The lien affidavit carries the conspicuous ≥10-pt boldface legend: "NOTICE: THIS IS NOT A LIEN. THIS IS ONLY AN AFFIDAVIT CLAIMING A LIEN." | 53.254(f) |
| 6 | The Subchapter C notice to the owner includes or attaches the §53.254(g) statutory warning statement | 53.254(g) |

Items 1–4 are **retrospective and unfixable at intake**. By the time the packet reaches Michael, the work is done and the contract either was or was not executed, both-signed, and filed beforehand. Nothing downstream cures it.

A typical emergency water-mitigation authorization — signed at the door, often by one spouse, while the water is still running, and never filed with the county clerk — is the fact pattern this gate exists to catch. Whether Servpro's actual paperwork satisfies §53.254 is **the single most valuable question to bring to the in-person meeting**, and the answer may determine whether the lien path is available on a majority of their residential files or a minority of them.

**Engine posture `[P]`:** the homestead gate is a **hard blocking checklist at intake**, evaluated before any date is computed. If it fails, the engine should say so plainly and route to the alternative theories (ch. 28 prompt-pay, breach of contract, unjust enrichment) rather than computing a filing deadline for a lien that cannot attach. Failure here is also an enumerated ground for summary removal under §53.160(b)(6) `[STATUTE]` — so a defective homestead lien is not merely weak, it is removable on an expedited motion.

**⚠ This is Claude's structural reading of the statute, not a verified legal conclusion, and Michael has not ruled on it.** It is flagged this prominently because of consequence, not confidence.

### 2.2 The party-role gate

§53.001(7) `[STATUTE]`: an **original contractor** is a person contracting with an owner directly or through the owner's agent. Servpro contracting directly with the homeowner is an original contractor. This matters enormously, because it **switches off an entire notice regime**:

- §53.056 derivative-claimant notice to owner and original contractor — **applies only to "a claimant other than an original contractor."** Not Servpro's problem on a direct-contract job.
- §53.057 retainage notice — same limitation.
- §53.054(a)(3), (a)(8) — the per-month statement and the notice-dates statement are required only of non-original contractors.

**So the common Servpro path is dramatically simpler than the chapter's bulk suggests: file the affidavit, send the copy, done.** The engine should not present derivative-claimant machinery on a direct-contract file.

**But the role is not automatic.** If Servpro was engaged by a general contractor or a restoration TPA rather than by the homeowner, it is a subcontractor and the full §53.056 notice ladder arms — with the shortest deadlines in the chapter. **`[OPEN — for the Servpro meeting]`: what fraction of jobs are direct-to-homeowner versus routed through a GC, a TPA, or the carrier's managed-repair program?** This single fact selects between two very different deadline sets, and it must be captured on the packet.

Note also §53.026 `[STATUTE]` — the sham-contract rule deems a claimant under a *purported* original contractor to be an original contractor itself. Relevant if a carrier-affiliated entity sits between Servpro and the owner. Parked, not designed.

### 2.3 The residential gate — and why it cannot be one boolean `[D]`

This is the finding that resolves the "conditional field" question raised earlier in the session. Across these two chapters the legislature uses **four different formulations** of "residential":

| Formulation | Where | Reaches |
|---|---|---|
| **"Residence"** — single-family house, duplex, triplex, quadruplex, **or a condominium/cooperative unit**; owned by ≥1 adult; used or intended as a dwelling by an owner | §53.001(8) | condo units **included** |
| **"Residential construction contract" / "residential construction project"** — owner + contractor, to construct or repair the owner's *residence* | §53.001(9), (10) | inherits (8), condos included |
| **"detached single-family residence, duplex, triplex, or quadruplex"** | §28.003(a), (b); §28.009(e)(1) | condo units **excluded** — not detached single-family, not a duplex/triplex/quadruplex |
| **"single-family residence"** | §28.006(b) | narrower again — no duplex/triplex/quadruplex |
| *(adjacent)* **"single-family house, townhouse, or duplex"** | §53.282(a)(3) | a fifth shape, in the waiver provision |

**Worked consequence.** A water-mitigation job on a condominium unit:

- Under ch. 53 → **residential**. Shorter filing deadlines (3rd month, not 4th). Homestead rules likely engaged.
- Under §28.003 → **not** within (a). The good-faith withholding cap is **100%**, not 110%.
- Under §28.009(e)(1) → the exclusion does **not** apply. The **right to suspend work exists** — which it would not on a detached single-family house.

Same job, same client, opposite answers, three times over.

**Design ruling requested `[OPEN → D-A]`:** the engine must **not** carry a single `isResidential` case flag. Each rule carries its **own predicate**, evaluated against structured property facts captured once at intake (structure type; detached or attached; titled unit in a multiunit structure; number of dwelling units; owner-occupied; homestead claimed; marital status of owner). This is enter-once discipline applied to a legal predicate rather than to a contact.

---

## 3. Deadline primitives the engine does not currently have

Every deadline in the project to date is **anchor + day-count** (30 days after answer, 60-day insurer notice, 5-day post-demand check-in). Ch. 53 breaks that model four ways and ch. 28 adds a fifth. These are the primitives, stated as engine requirements.

### P1 — Month-ordinal deadlines `[D]`
Ch. 53's signature form: *"the 15th day of the fourth month after the month in which..."* This is **not** representable as a day count. 

```
monthOrdinal(anchorDate, n, dayOfMonth = 15):
    targetMonth = monthOf(anchorDate) + n
    date        = dayOfMonth of targetMonth
    return roll(date)            // §53.003(e), see P5
```

Only the anchor's **month** is used; the day within the anchor month is discarded entirely. A job completed 1 April and one completed 30 April share a deadline. Any day-count approximation is wrong by up to a month — in the fatal direction.

### P2 — Multi-anchor reduction (later-of / earlier-of / earliest-of) `[D]`
Several deadlines take more than one candidate anchor and reduce:

- **later of** — §53.052(b), (c) (last labor/materials month vs. normal specially-fabricated delivery month); §53.106(b) (3 days from filing vs. 10 days from receipt of notice)
- **earlier of** — §53.057(a-1) (30 days from claimant's contract ending vs. 30 days from original contract terminating/abandoning)
- **earliest of** — §53.103(2) (completion / termination / abandonment); §28.004(c) (delivery / mailing / judgment)

The engine must hold **all** candidate anchors and recompute the reduction when any one of them changes, rather than storing a single resolved date.

### P3 — Anchor swap `[D]` — second sighting, therefore a primitive
Not an extension of a deadline; a **relocation of its reference event**.

- **§53.158(a-2)** — the one-year foreclosure clock runs from *the last day the affidavit could have been filed*. A recorded written agreement with the **then-current record owner** moves it to *the second anniversary of the date the affidavit was actually filed*. Different reference date, not merely a longer one.
- **§28.008** — the owner's 35-day payment clock runs from receipt of the payment request. On a lender-failure-to-disburse fact pattern it becomes **5 days from the owner's receipt of loan proceeds**.

Two independent instances in two chapters is enough to model this as a first-class transition rather than a per-rule special case.

### P4 — Backward constraints ("no earlier than") `[D]`
§53.160(c): a motion to remove **may not be heard before the 30th day after** the claimant answers or appears, and requires ≥30 days' notice. The engine models "due by"; this is a floor, not a ceiling. Same shape as the deposition-buffer finding in the heartbeat work — a scheduling constraint that is not a deadline.

### P5 — Chapter-scoped roll rules `[D]`
§53.003(e): under **this chapter**, if a deadline or the last day of a period falls on a Saturday, Sunday, or legal holiday, it extends to the next day that is none of those. Ch. 28 contains **no equivalent provision**.

This confirms a principle already reached on the heartbeat side: **roll rules are registry-sourced per chapter, never globally hardcoded.** A single global weekend-roll applied to ch. 28 would silently invent an extension the statute does not grant.

**Worked example — the roll rule is not cosmetic.** Last service date 2026-04-20 (the seed Servpro file):
- Residential, original contractor → §53.052(a)(2), 3rd month → **15 July 2026**, a Wednesday. No roll.
- If the same job were non-residential → §53.052(a)(1), 4th month → 15 August 2026, a **Saturday** → rolls to **Monday 17 August 2026**.

### P6 — Provisional dates that resolve retroactively `[D]`
§28.004(c)(2): interest stops on the **date of mailing** — *but only if* delivery occurs within three days. At the moment of mailing the stop date is unknowable; a later fact confirms or defeats it. The engine must be able to hold a **provisional** value pending confirmation, which is the declared-versus-detected distinction from the heartbeat design appearing inside an interest calculation.

---

## 4. Ch. 53 deadline register

Engine-shaped. `OC` = original contractor, `DC` = derivative claimant (non-OC). **R** marks rules with a residential variant.

| Rule | § | Form | Anchor(s) | Applies to |
|---|---|---|---|---|
| Lien affidavit — OC, non-res | 53.052(a)(1) | P1: 15th / 4th mo. | month work completed, terminated, or abandoned | OC |
| **Lien affidavit — OC, residential** ⭐ **R** | 53.052(a)(2) | P1: 15th / **3rd** mo. | same | OC |
| Lien affidavit — DC, non-res | 53.052(b) | P1: 15th / 4th mo., P2 later-of | last labor/materials month **/** normal delivery month | DC |
| Lien affidavit — DC, residential **R** | 53.052(c) | P1: 15th / **3rd** mo., P2 later-of | same | DC |
| Lien affidavit — retainage | 53.052(d) | P1: 15th / 3rd mo. | month original contract completed/terminated/abandoned | DC |
| Venue of filing | 53.052(e) | constraint | county where improvements located | all |
| **Copy of affidavit to owner** ⭐ | 53.055(a) | 5 days | affidavit filed with county clerk | all |
| Copy of affidavit to OC | 53.055(b) | 5 days | affidavit filed | DC |
| DC notice of claim — non-res | 53.056(a-1)(1) | P1: 15th / 3rd mo. | month labor/materials provided or delivery due | DC |
| DC notice of claim — residential **R** | 53.056(a-1)(2) | P1: 15th / **2nd** mo. | same | DC |
| Retainage notice | 53.057(a-1) | P2 **earlier-of** two 30-days | claimant's contract complete/terminated/abandoned **/** original contract terminated/abandoned | DC |
| Owner's 10% reserve window | 53.101(a) | 30 days | work under original contract completed | owner |
| Reserved-funds lien affidavit | 53.103(2) | 30 days, P2 **earliest-of** | completion / termination / abandonment | claimant |
| Affidavit of completion — copies out | 53.106(b) | P2 later-of 3 / 10 days | filing **/** owner's receipt of lien notice | owner |
| Affidavit of completion — copies on request | 53.106(c) | P2 later-of | filing date **/** 10 days from request | owner |
| Termination/abandonment notice (**not residential** — 53.107(e)) **R** | 53.107(a) | 10 days | termination or abandonment | owner |
| Affidavit of commencement | 53.124(c) | 30 days | actual commencement or delivery of materials | owner + OC jointly |
| **Release after payment** ⭐ | 53.152(a) | 10 days | written request received | claimant |
| **Suit to foreclose** ⭐ | 53.158(a) | 1 year | **last day affidavit could be filed** under 53.052 | claimant |
| Foreclosure limitations extension | 53.158(a-2) | **P3 anchor swap** → 2nd anniversary of **actual filing** | recorded written agreement with then-current record owner | claimant |
| Info request response | 53.159(a)–(c) | 10 days | written request received | owner / OC / sub |
| Claimant document production | 53.159(d) | 30 days | written request received | claimant |
| Removal-motion hearing floor | 53.160(c) | **P4** ≥30 days notice; not before 30th day | claimant answers or appears | movant |
| Bond to stay removal | 53.161(b) | 30 days | order entered (court may extend for good cause) | claimant |
| Suit on indemnity bond | 53.175(a) | 1 year, P2 | notice served **/** underlying claim unenforceable under 53.158 | claimant |
| Public-works bond suit | 53.208(d) | 1 yr if bond recorded at lien filing; **2 yrs if not** | perfection | claimant |
| Public-works suit precondition | 53.208(a) | 60 days unpaid | perfection | claimant |
| Public-works notice | 53.234 | P1: 15th / 2nd mo. | month labor performed / material furnished | claimant |
| Public-works bond suit (subch. J) | 53.239(a) | 6 months | bond filed | claimant |
| Updated sub/supplier list **R** | 53.256(a)(2) | 15 days | sub or supplier added or deleted | OC |
| Loan closing documents **R** | 53.257(a) | 1 **business** day | closing | lender |
| Release-or-face-§12.002 demand | 53.282(b)(2) | 14 days | owner/OC sends explanation + waiver evidence + release request | claimant |

⭐ = on the Servpro primary path.

**Two register notes.**

*§53.106(d) is a moving anchor with a scope trap.* An affidavit of completion is prima facie evidence of the completion date **"for purposes of this chapter"** — but the late-filing substitution (filed after the 10th day after completion ⇒ completion date *becomes* the filing date) is expressed **"for purposes of this subchapter."** Subchapter E, reserved funds. A rule engine that flattens chapter-scope and subchapter-scope into one field will over-apply the substitution. §53.107(c) has the same prima-facie shape for termination. Both are **cascade events** in the heartbeat sense: a recompute, not a note.

*§53.157(2) makes the foreclosure deadline doubly fatal.* Failing to sue within §53.158's period does not merely bar the suit — it **discharges the lien of record**. The consequence is not "you lose your remedy," it is "the cloud on title, which is the entire commercial point, evaporates."

---

## 5. Ch. 28 deadline register

| Rule | § | Form | Anchor |
|---|---|---|---|
| Owner → contractor payment | 28.002(a) | 35 days | owner's receipt of written payment request |
| Contractor → subs | 28.002(b) | 7 days | contractor's receipt of owner's payment |
| Sub → its subs | 28.002(c) | 7 days | sub's receipt of contractor's payment |
| Interest begins | 28.004(a) | day after | payment becomes due |
| Interest rate | 28.004(b) | 1½% **per month** | — |
| Interest stops | 28.004(c) | **P2 earliest-of**, **P6 provisional** | delivery / mailing (only if delivered ≤3 days) / judgment entered |
| Residential payment extension **R** | 28.006(b) | up to <61 days, by written contract only | owner's receipt of payment request |
| **Lender-failure anchor swap** | 28.008 | **P3** → 5 days | owner's receipt of loan proceeds |
| Right to suspend (**not residential** — 28.009(e)(1)) **R** | 28.009(a) | 10th day after notice | written notice to owner **and** lender |
| Lender sign posted / notices out | 28.009(b)(4)(A), (5) | 10 days | construction commences |
| Notice copy to sub/supplier | 28.009(b)(6) | 10 days | that sub's first labor or materials |
| Unsigned change order — right to decline | 28.0091 | threshold, not a clock: aggregate unsigned additional work **> 10%** of original contract amount | — |

**No roll rule in ch. 28.** See P5. Do not borrow §53.003(e).

---

## 6. The Servpro primary path, as the engine should run it

Assuming direct-to-homeowner contract, residential, homestead — the modal case pending confirmation at the meeting.

```
PACKET RECEIVED
  ├─ GATE 0  Party role: contracted with owner directly?          → OC track / DC track
  ├─ GATE 1  Property predicates captured (§2.3 structured facts)
  ├─ GATE 2  HOMESTEAD (§53.254 items 1–4, retrospective)         → PASS / FAIL-HARD
  │            FAIL ⇒ no lien path. Route: ch. 28 prompt-pay, contract, quantum meruit.
  │                   Do NOT compute a filing deadline.
  └─ GATE 3  Last-service / completion date present and defensible → else BLOCK, request from client

PERFECTION (deadline-bearing)
  ├─ D1  Affidavit filing deadline   §53.052(a)(2)  P1(3, 15) + P5 roll
  │        └─ affidavit contents §53.054; homestead legend §53.254(f)
  │        └─ venue: county of the improvements §53.052(e)
  ├─ D2  Copy to owner               §53.055(a)     D1_actual + 5 days
  │        └─ delivery per §53.003(b): in person / certified mail / traceable w/ proof of receipt
  └─ LIEN PERFECTED  ─── proof-in-the-record: recorded affidavit + proof of service of the copy

PRESSURE  (primary — ~98% of recovery, per master spec)
  ├─ carrier / homeowner settlement track
  ├─ parallel: ch. 28 interest accruing from §28.002(a) + 1 day, at 1½%/mo
  └─ WATCH: §53.160 summary motion to remove (defense move) → P4 hearing floor,
            §53.161 bond-to-stay 30 days if removal ordered

TAIL (rare)
  └─ D3  Suit to foreclose           §53.158(a)  1 yr from D1's *deadline* (not filing date)
           └─ optional P3 swap via §53.158(a-2) recorded agreement
           └─ MISS ⇒ §53.157(2) discharges the lien of record

CLOSE
  └─ D4  Release on request          §53.152(a)  10 days from written request
           └─ escalation: §53.282(b)(2) 14-day demand ⇒ CPRC §12.002 exposure
```

**The close is a liability surface, not an afterthought `[D]`.** Once paid, Servpro has a 10-day statutory duty to release, and an owner who sends the §53.282(b)(1) package starts a 14-day fuse ending in CPRC §12.002 exposure — a fraudulent-lien claim, with its own damages. A lien practice that tracks perfection meticulously and then forgets releases has moved the malpractice risk rather than removed it. **The release thread should arm automatically on payment**, the same proof-in-the-record shape as the DCO thread in the heartbeat design.

---

## 7. Fee-basis entries — corrections and the new enum value

### 7.1 §53.156 — corrected and verified to text

**Date correction, three places.** `time-tracker-fee-basis-profiles-design.md` §6 (profile table), §7 item 5, and `attorney-review-queue.md` all say **"2021 may→shall."** It is **2011**. §53.156's amendment history: added 1984; amended 1989 (ch. 1138 §22); amended **Acts 2011, 82nd Leg., R.S., Ch. 51 (S.B. 539), §1, eff. 9/1/2011**. The 2021 overhaul (H.B. 2237, 87th Leg., Ch. 690) swept ~30 sections of ch. 53 and **did not touch §53.156**.

**Enrolled S.B. 539 `[CLAUDE-RETRIEVED — Michael has not read it]`** confirms the swap on its face, bracketed strike-text intact:

> "the court shall [may] award costs and reasonable attorney's fees as are equitable and just."

Two findings from the enrolled text:

1. **May→shall was the *only* change.** The residential carve-out sentence is unbracketed and therefore predates 2011. Interpretively this cuts in favor of the carve-out being deliberate and operative: before 2011 it was near-surplusage (nothing was required of anyone), and the amendment making the award mandatory is exactly what gave it work to do.
2. **Applicability: "a proceeding commenced on or after" 9/1/2011**, with former law continued for earlier proceedings. Same anchor family as §38.001/H.B. 1578 ("commenced"), **not** H.B. 4145 ("date of service"). And the same practical conclusion as **V8**: any proceeding commenced before 9/1/2011 is now ~15 years old, so a capture field for it is almost certainly not worth building.

**Scope, from the text.** The mandatory verb reaches three proceeding types: (1) to foreclose a lien; (2) to enforce a claim against a Subchapter H, I, or J bond; (3) **to declare any lien or claim invalid or unenforceable in whole or in part**. The third makes the fee-shifting **bidirectional** — an owner who defeats a lien is inside the statute. A bare suit on the underlying debt seeking neither foreclosure nor invalidation falls **outside** §53.156 and routes to §38.001.

**Residential carve-out, precisely.** Second sentence: for a lien or claim arising out of a *residential construction contract*, the court "is not required to order **the property owner** to pay." A **one-directional downgrade** — mandatory→permissive only where the owner is the payor; where the owner is the payee the "shall" still binds. It does not prohibit the award.

**Mid-case relevance.** §53.161 hooks §53.156 into a bond calculation: the court, on ordering removal, sets security as a reasonable estimate of the fees the movant is likely to incur, and §53.161(c)(2) conditions the bond on payment of fees "to the movant under Section 53.156." So the fee exposure gets **priced by the court mid-case** — a third instance of the point-in-time fee-ledger requirement, after the DTPA's three date-anchored cuts and the family-law temporary-orders affidavit.

### 7.2 The new enum value `[C — Michael ruled 2026-07-26: "new value"]`

The minimal pair that forced this, both read this session:

| | Verb | Measure |
|---|---|---|
| **§53.156** | the court **shall** award | "as are equitable and just" |
| **§28.005(b)** | the court **may** award | "as **the court determines** equitable and just" |

Same code, adjacent subject matter, same measure language — different verb, and ch. 28 adds "as the court determines," explicitly committing the measure to the court where §53.156 does not. If "shall … equitable and just" collapsed into pure discretion the two provisions would be functionally identical and the verb choice surplusage.

**Ruling implemented:**

```ts
basis: 'mandatory'                  // §17.50(d) — "shall be awarded," unqualified
     | 'mandatory-equitable'        // NEW — §53.156: entitlement mandatory,
                                    //   amount measured by "equitable and just"
     | 'discretionary-equitable'    // §28.005(b), §352.051
     | 'permissive'                 // §38.001 — "may recover"
     | 'none'
```

**Two attributes must accompany it, because the value alone under-describes §53.156 `[P]`:**

- `direction` — who may be ordered to pay. §53.156 is bidirectional by its third proceeding-type.
- `conditionalDowngrade` — the residential/property-owner relaxation, expressed as a predicate over the §2.3 structured facts, **not** as prose.

**Honest note on the ruling `[D]`.** A new enum value solves §53.156 cleanly today. But the §28.005(b) comparison shows the legislature varies **entitlement** and **measure** independently, which means the enum grows multiplicatively as statutes land — a fourth or fifth shape will force the decomposition anyway. Recording this as a predicted future refactor, not as a challenge to the ruling.

### 7.3 §28.005(b) — O1 CLOSED

> "In an action brought under this chapter, the court **may** award costs and reasonable attorney's fees as the court determines equitable and just."

**Discretionary, confirmed.** `basis: discretionary-equitable` holds; the "(VERIFY)" flag comes off. This closes **O1**, and it closes **against** the voice-session framing that had implied mandatory — the drafted design doc was right and the voice note was wrong.

### 7.4 Three further corrections to the ch. 28 entry

1. **"1.5%/month, 18%/yr"** — §28.004(b) states only *1½ percent each month*. It states no annual rate and does not specify simple versus compound accrual. The 18% is the design doc's own annualization; a compounding reading yields ≈19.6%. **Drop it or mark it derived.** → **V11**
2. **"§28.010 oilfield/pipeline exemption" under-describes it.** It covers mineral development **and well-or-mine services generally** — mines, mine shafts, drifts included — and reaches leases, royalty, joint-interest, production, operating, farmout, and area-of-mutual-interest agreements. §28.010(b)(1) defines "agreement" to include **oral** agreements, so it is not a written-contract screen.
3. **§28.0091 is absent from the entry entirely.** Added by **Acts 2023, 88th Leg., R.S., Ch. 533 (H.B. 3485), §2, eff. 9/1/2023**. A contractor or subcontractor may decline owner-directed additional work where there is no fully executed written change order and the aggregate unsigned additional work exceeds **10% of the original contract amount**, without damages exposure. A computable threshold and a 2023 law-change-ledger entry.

### 7.5 V10 — Michael's working position `[C, but NOT verified]`

**Michael, 2026-07-26:** *"I believe zero could be equitable and just given extenuating circumstances, so technically yes."*

Recorded as the attorney's **working position**, marked `[JUDGMENT — Michael]`. **V10 does not close.** No case law was read this session, and the position is a reading of the phrase rather than a holding. It converts from *open question* to *attorney's provisional answer pending citator work*.

**Design consequence, and it is not small.** If a zero award is available under "equitable and just," then `mandatory-equitable` must never be surfaced as a promise of recovery. What the mandatory verb actually buys is that **the court must engage and make an award determination** — it cannot decline to consider — and that a zero award presumably requires justification on equitable-and-just grounds rather than resting on unreviewable discretion. Export language must say *"fee award required; amount, which may be zero, measured by 'equitable and just'"* and nothing stronger. **→ V10 stays open for the citator pass; the FLP/CourtListener account is what unblocks it (promo ends 8/6).**

---

## 8. Cascade and recompute events

Events that move dates already computed. Same family as the granted-defense-extension cascade in heartbeat capture e — these are recomputes, not notes.

| Event | Effect | § |
|---|---|---|
| Affidavit of completion **filed late** (>10 days after completion) | completion date **becomes the filing date** — *Subchapter E only* | 53.106(d) |
| Affidavit of completion filed timely | prima facie completion date, chapter-wide | 53.106(d) |
| Termination/abandonment notice sent ≤10 days | prima facie termination date, *Subchapter E* | 53.107(c) |
| Owner **fails** to send termination notice | subcontractor relieved of §53.057 retainage notice; may claim by §53.052 affidavit alone | 53.107(d) |
| §53.158(a-2) agreement recorded | **P3 anchor swap** — foreclosure clock relocates to actual filing date + 2 yrs | 53.158(a-2) |
| Removal order entered | 30-day bond clock arms; failure ⇒ lien extinguished as to later purchasers/creditors | 53.161(b), (g) |
| Final judgment establishing lien, filed | **revives** a removed lien — void as to intervening purchasers | 53.162 |
| Lender fails to disburse | **P3 anchor swap** — 35 days → 5 days from loan proceeds | 28.008 |
| Delivery confirmed ≤3 days after mailing | **P6** provisional interest-stop date **confirms** | 28.004(c)(2) |
| Delivery >3 days after mailing | provisional stop date **defeated**; interest ran to actual delivery | 28.004(c)(2) |

**§53.158(a-1) is a rule about other rules.** It provides that notwithstanding **CPRC §16.069** or any other law, a suit pursued solely to discharge a lien on expired limitations does not revive the claimant's foreclosure rights. The registry must be able to express **one rule displacing another**, not merely state rules independently. First instance in the project of an express statutory override of a general limitations provision.

---

## 9. Registry entries to open

All **UNVERIFIED**. Sign-off one at a time, per binding rule 2.

| # | Entry | Cite | Notes |
|---|---|---|---|
| **53-A** | Lien affidavit deadlines — OC and DC, residential and non-residential | §53.052(a)–(e) | P1 month-ordinal; the residential split is the whole entry |
| **53-B** | Notice of filed affidavit | §53.055 | 5 days; delivery methods per §53.003(b) |
| **53-C** | Homestead lien prerequisites | §53.254 | **Threshold gate.** Retrospective; unfixable at intake |
| **53-D** | Suit to foreclose + extension | §53.158 | 1 yr; P3 swap; (a-1) §16.069 override; §53.157(2) discharge consequence |
| **53-E** | Release obligations and §12.002 exposure | §53.152, §53.282 | Post-payment liability surface |
| **53-F** | Summary removal grounds and procedure | §53.160, §53.161 | Defense playbook; P4 hearing floor; bond hooks §53.156 |
| **53-G** | Chapter roll rule | §53.003(e) | **Chapter-scoped.** Must not generalize |
| **53-H** | Costs and attorney's fees | §53.156 | `mandatory-equitable`; bidirectional; residential downgrade; S.B. 539 (2011), proceedings commenced on/after 9/1/2011 |
| **53-I** | DC notice ladder | §53.056, §53.057 | Arms only on the subcontractor track |
| **28-A** | Prompt-pay deadlines | §28.002 | 35 / 7 / 7 |
| **28-B** | Interest on overdue payment | §28.004 | 1½%/mo; P2 earliest-of; P6 provisional stop |
| **28-C** | Good-faith-dispute withholding caps | §28.003 | 110% / 100% — **different residential predicate than ch. 53** |
| **28-D** | Right to suspend work | §28.009 | Residential and governmental exclusions; lender-notice preconditions |
| **28-E** | Costs and attorney's fees | §28.005(b) | `discretionary-equitable` — **O1 closed** |
| **28-F** | Waiver and residential payment extension | §28.006 | Waiver void except (b) |
| **28-G** | Unsigned change orders | §28.0091 | 10% threshold; H.B. 3485 (2023) |
| **28-H** | Mineral / well-or-mine exemption | §28.010 | Includes oral agreements |
| **28-I** | Chapter relationship | §28.007(b), §28.009(f) | Siblings, remedies stack |

**Law-change ledger additions:**
- **S.B. 929, 89th Leg., R.S. (2025), Ch. 98** — amended §53.003 and §53.124, **eff. 21 May 2025** (immediate effect, not 9/1)
- **H.B. 2237, 87th Leg., R.S. (2021), Ch. 690** — the structural overhaul; repealed subsections throughout; **did not touch §53.156**
- **H.B. 3485, 88th Leg., R.S. (2023), Ch. 533** — added §28.0091, eff. 9/1/2023
- **S.B. 1768, 88th Leg., R.S. (2023), Ch. 291** — amended §53.172, eff. 5/29/2023

---

## 10. Build sketch — NOT COMMITTED (see the gate)

| # | Slice | Depends on |
|---|---|---|
| **L0** | Property-fact capture at intake (§2.3 structured predicates) + party-role determination | — |
| **L1** | Deadline primitives P1–P6 as a tested library, no legal content | — |
| **L2** | Threshold gates: homestead checklist, role gate, completion-date gate | L0, **53-C signed off** |
| **L3** | Ch. 53 perfection sequence — D1/D2 computed, notices generated | L1, L2, **53-A/B signed off** |
| **L4** | Cascade/recompute engine (§8) | L3 |
| **L5** | Ch. 28 clocks + interest accrual (placeholder until 28-B verified) | L1 |
| **L6** | Close-out: release thread + §12.002 fuse | L3 |

**L1 is buildable before any verification** — it is arithmetic, not law, and the same is true of L0. Everything from L2 up is gated on registry sign-off **and** on the Servpro meeting.

Sequencing against the rest of the project is Michael's call and is **not** decided here. Note the standing constraint: **D3/H8 (shared touch substrate) still gates T1** for both the heartbeat and the time tracker, and any thread-shaped work here inherits that dependency.

---

## 11. Open items

New items use an **L-prefix** (lien/prompt-pay). Renumber into the H- or V-series at Michael's discretion.

| ID | Item | Status | Owner |
|---|---|---|---|
| **L1** | Does Servpro's actual customer paperwork satisfy §53.254(a)–(e) — written, pre-work, both spouses, **filed with the county clerk**? | **OPEN — the single highest-value question for the meeting** | Servpro staff |
| **L2** | What share of jobs are direct-to-homeowner vs. through a GC, TPA, or carrier managed-repair program? Selects OC vs. DC track | **OPEN — for the meeting** | Servpro staff |
| **L3** | How does Servpro define and date "completion" operationally? Final walkthrough, equipment pickup, last tech visit, final invoice? Drives every P1 anchor | **OPEN — for the meeting** | Servpro staff |
| **L4** | Do jobs ever get terminated or abandoned mid-stream, and is that dated distinctly from completion? §53.052 anchors on all three | **OPEN — for the meeting** | Servpro staff |
| **L5** | Condo / townhouse / attached-unit volume — how often does the §2.3 definitional mismatch actually bite? | **OPEN — for the meeting** | Servpro staff |
| **L6** | Are payment requests written and dated? §28.002(a)'s 35-day clock has no anchor without them | **OPEN — for the meeting** | Servpro staff |
| **L7** | Does Servpro ever want the §28.009 suspension right, or is it dead letter given the residential exclusion? | **OPEN — for the meeting** | Michael + Servpro |
| **D-A** | Per-rule residential predicates over structured property facts, rather than one `isResidential` flag (§2.3) | **PROPOSED, unruled** | Michael |
| **D-B** | Homestead gate as a hard intake block that suppresses deadline computation entirely (§2.1) | **PROPOSED, unruled** | Michael |
| **D-C** | Release thread arms automatically on payment (§6 close) | **PROPOSED, unruled** | Michael |
| **V10** | Does "equitable and just" permit a **zero** award despite "shall"? Michael's working position: yes. **No case law read** | **OPEN — citator pass** | Michael |
| **V11** | 1½%/month — simple or compound? Statute is silent. Affects any annualized figure | **OPEN** | Michael |
| **V12** | Public-entity prompt payment: governmental owners are written out of ch. 28 (§28.001(4), §28.009(e)(2)). Texas handles this elsewhere (Gov't Code). **Not in this project at all** | **OPEN — gap flagged, content not asserted** | Michael |
| **V13** | Is §53.156's third proceeding-type (declaring a lien invalid) a live **exposure** for Servpro — i.e. has Michael ever had a lien attacked and fees sought against the client? | **OPEN** | Michael |

---

## 12. What changed elsewhere because of this session

Documents that now contain a known error or omission, for the Code work order:

1. **`time-tracker-fee-basis-profiles-design.md` §6 table** — §53.156 row: "2021 may→shall" → **2011**; `basis` → `mandatory-equitable`
2. **`time-tracker-fee-basis-profiles-design.md` §7 item 5** — same date correction; add scope, bidirectionality, S.B. 539 applicability
3. **`time-tracker-fee-basis-profiles-design.md` §7 item 6** — ch. 28: **O1 CLOSED, discretionary confirmed**; 18%/yr flagged as derived; §28.010 scope widened; **§28.0091 added**
4. **`time-tracker-fee-basis-profiles-design.md` §2** — `basis` enum gains `mandatory-equitable`; `direction` and `conditionalDowngrade` attributes proposed
5. **`time-tracker-fee-basis-profiles-design.md` §8** — **O1 struck** (closed)
6. **`attorney-review-queue.md`** — §53.156 and ch. 28 move from "still to pull" to read; date correction; V10 recorded as working position, not closed
7. **Law-change ledger** — four bills added (§9)

---

## 13. Resume point

**After the Servpro in-person meeting.** Michael supplies the meeting notes and re-feeds whatever statutes are needed; this document is then revised against operational reality — principally L1–L7, which between them determine whether the modal Servpro file is a lien case at all.

**Before then, three things can proceed independently:** the V10 citator pass (needs FLP/CourtListener — **promo ends 8/6**); the remaining fee-basis queue (Est. Code §352.051, then the Family Code block); and L0/L1, which are law-free.
