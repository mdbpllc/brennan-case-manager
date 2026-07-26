# TRCP Deadline Skeleton — Registry Candidates

**Date:** 2026-07-25. **Status:** UNVERIFIED registry candidates. Extracted design-side from the uploaded *Texas Rules of Civil Procedure*, text effective **March 1, 2026** (PDF created 2026-03-03, 370 pp.). **Verification is attorney-only** (registry rule 2) — nothing here is verified until Michael reads the rule text and signs off, entry by entry.

**Purpose:** give the deadline engine its rule-derived tier for the civil litigation spine, and give the case-heartbeat walkthrough real clocks for the post-filing stages. **This is not a substitute for the rule text**, and it deliberately omits anything requiring case law (service diligence) or local rules (court profiles).

**Scope:** suits *not* governed by the Family Code. Family Code variants exist in 190.2(b)(1)(B) and 190.3(b)(1)(B) and are omitted.

---

## 1. The anchor and the cascade

**Anchor event: the first answer or general appearance.**

```
first answer / general appearance
        │  + 30 days  (Rule 194.2(a))
        ▼
initial disclosures due  ◄── THE ANCHOR DATE
        │
        ├── Level 1: discovery period runs 180 days from here (190.2(b)(1)(A))
        │
        └── Level 2: discovery period runs until the EARLIER of (190.3(b)(1)(A))
                 (i)  30 days before trial setting
                 (ii) 9 months after the anchor
                              │
                              ├── expert designation, party seeking affirmative
                              │   relief: 90 days before end of period (195.2(a))
                              └── other experts: 60 days before end (195.2(b))
```

**Consequence — dates are DERIVED, never stored.** Under Level 2 the discovery cutoff is a function of the trial setting. When a trial date is set or reset, the cutoff can move *earlier*, and both expert deadlines move with it. A stored date silently goes wrong; a derived date recomputes.

**Consequence — schedule change is a cascade event.** One anchor change can move many downstream dates at once. Per the heartbeat design (§5), this is the one legitimate batched interruption: it is a single causal event with many consequences, not a pile of unrelated asks.

---

## 2. Discovery control plans (Rule 190)

| ID | Rule | Proposition | Notes |
|---|---|---|---|
| TRCP-190.1 | 190.1 | Every case is governed by a discovery control plan; plaintiff must allege Level 1, 2, or 3 in the **first numbered paragraph of the original petition** | Level becomes a required case attribute at filing |
| TRCP-190.2a | 190.2(a) | Level 1 applies to suits governed by the Rule 169 expedited process, and to certain divorces (marital estate > $0 but ≤ $250,000) absent agreement or a 190.4 order | |
| TRCP-190.2b1 | 190.2(b)(1)(A) | Level 1 discovery period begins when the first initial disclosures are due and runs **180 days** | |
| TRCP-190.2b2 | 190.2(b)(2) | Level 1: **20 hours** total oral deposition per **party**; court may modify to avoid unfair advantage | |
| TRCP-190.2b3-5 | 190.2(b)(3)–(5) | Level 1: **15** interrogatories, **15** requests for production, **15** requests for admission per party on any other party; discrete subparts count separately; identification/authentication interrogatories excluded from the count | Budget counters, not just clocks |
| TRCP-190.2c | 190.2(c) | If a suit is removed from the expedited process, the discovery period **reopens** under 190.3 or 190.4; previously deposed persons may be redeposed; court should continue trial if needed | Removal is a recompute event |
| TRCP-190.3a | 190.3(a) | Level 2 is the default where 190.2 and 190.4 don't apply | |
| TRCP-190.3b1 | 190.3(b)(1)(A) | Level 2 discovery period begins when first initial disclosures are due and continues until the **earlier of** 30 days before the trial setting **or** 9 months after the anchor | The cascade driver |
| TRCP-190.3b2 | 190.3(b)(2) | Level 2: **50 hours** oral deposition per **side**; +6 hours per additional expert if one side designates more than two; court must modify to prevent unfair advantage | "Side" per Rule 233 |
| TRCP-190.3b3 | 190.3(b)(3) | Level 2: **25** interrogatories per party on any other party; discrete subparts separate; identification/authentication excluded | No numeric cap stated for RFPs/RFAs at Level 2 |
| TRCP-190.4a | 190.4(a) | Level 3: court **must** order a tailored plan on a party's motion, **may** on its own initiative; parties may submit an agreed order | |
| TRCP-190.4b | 190.4(b) | The Level 3 plan may change any time or amount limit; **190.2 or 190.3 limits still apply unless specifically changed**; the plan must include (1) a trial date or setting conference, (2) a discovery period, (3) limits on amount of discovery, (4) deadlines for joining parties, amending/supplementing pleadings, and designating experts | **Engine: a Level 3 case is document-derived, with rule-derived fallback for anything the DCO is silent on** |
| TRCP-190.5 | 190.5 | Court may modify a plan at any time and must when justice requires; outside the expedited process the court **must** allow additional discovery for late pleadings/responses causing unfair prejudice, and for matters that changed materially after cutoff **if trial is reset more than three months after the discovery period ends** | Reset-driven reopen |
| TRCP-190.6 | 190.6 | Rule 190 limits don't apply to Rule 202 pre-suit depositions or Rule 621a post-judgment discovery; Rule 202 can't be used to circumvent them | |

---

## 3. Expedited actions (Rule 169)

| ID | Rule | Proposition |
|---|---|---|
| TRCP-169a | 169(a) | Applies where all claimants (other than counter-claimants) affirmatively plead they seek **only monetary relief aggregating $250,000 or less**, excluding interest, statutory/punitive damages and penalties, and attorney fees and costs |
| TRCP-169b | 169(b) | No judgment above $250,000 (same exclusions) may be recovered under the rule |
| TRCP-169c1 | 169(c)(1) | Court **must** remove on motion and good cause, or if a claimant pleads for relief beyond (a) |
| TRCP-169c2 | 169(c)(2) | A pleading that removes the suit may not be filed without leave unless filed before the **earlier of** 30 days after discovery closes **or** 30 days before trial; leave only if good cause outweighs prejudice |
| TRCP-169d2 | 169(d)(2) | On request, court **must** set trial within **90 days after the 190.2(b)(1) discovery period ends**; may continue twice, total not to exceed 60 days |
| TRCP-169d3 | 169(d)(3) | **8 hours per side** for voir dire, openings, evidence, examination, closings; extendable to **12** on motion and good cause; objections, bench conferences, bills, and challenges for cause excluded |
| TRCP-169d4 | 169(d)(4) | Court may refer to ADR once; procedure must not exceed a half day, must not cost more than twice the applicable civil filing fees, and must be **completed no later than 60 days before the initial trial setting** |
| TRCP-169d5 | 169(d)(5) | Expert admissibility may generally be challenged only as an objection to summary-judgment evidence or at trial; does not apply to a motion to strike for late designation |

---

## 4. Disclosures and experts (Rules 194, 195)

| ID | Rule | Proposition |
|---|---|---|
| TRCP-194.2a | 194.2(a) | Initial disclosures due **within 30 days after the filing of the first answer or general appearance**, unless changed by agreement or order; a party first served or joined later discloses within 30 days after being served or joined |
| TRCP-194.2b | 194.2(b) | Initial disclosure content, without awaiting request — including **(10)** in suits alleging physical or mental injury, **all medical records and bills reasonably related to the injuries or damages asserted, or an authorization**, and **(11)** records and bills obtained by authorization furnished by the requesting party |
| TRCP-194.2c | 194.2(c) | Exempt proceedings: administrative-record review, state forfeiture, habeas, domestic violence, appeal from justice court |
| TRCP-194.4b | 194.4(b) | Pretrial disclosures (trial witnesses; exhibit list) due **at least 30 days before trial** unless the court orders otherwise; must be provided **and promptly filed** |
| TRCP-194.5 | 194.5 | No objection or work-product assertion permitted to a Rule 194 disclosure |
| TRCP-195.2a | 195.2(a) | Experts for a party **seeking affirmative relief**: designate **90 days before the end of the discovery period** |
| TRCP-195.2b | 195.2(b) | All other experts: **60 days before the end of the discovery period** |
| TRCP-195.3a | 195.3(a) | Deposition availability: no report furnished → available reasonably promptly after designation, and if the deposition can't reasonably conclude more than **15 days** before the other side's designation deadline, that deadline extends for experts on the same subject; report furnished → not required until reasonably promptly after all other experts are designated |
| TRCP-193.5b | 193.5(b) | Amended/supplemental responses must be made **reasonably promptly**; **presumed not reasonably prompt if made less than 30 days before trial** |

**Note:** 195.2 deadlines are expressed *relative to the end of the discovery period*, which under Level 2 is itself derived. Two-hop derivation — the engine must recompute both hops on any anchor change.

---

## 5. Written discovery response clocks

| ID | Rule | Proposition |
|---|---|---|
| TRCP-196.2 | 196.2 | Requests for production: respond **within 30 days** after service; a defendant served before its answer is due need not respond until **50 days** after service |
| TRCP-197.2 | 197.2 | Interrogatories: same 30 / 50-day structure |
| TRCP-198.2 | 198.2 | Requests for admission: same 30 / 50-day structure |

*(Same structure also appears at 194a for Family Code suits — out of scope here.)*

---

## 6. Service, citation, and computation

| ID | Rule | Proposition |
|---|---|---|
| TRCP-99a | 99(a) | On filing, the clerk issues citation when requested; **the requesting party is responsible for obtaining service** |
| TRCP-99b | 99(b) | Citation directs the defendant to answer **by 10:00 a.m. on the Monday next after the expiration of 20 days after the date of service** |
| TRCP-107 | 107 | Return-of-service contents, including date/time process was received, date of service or attempted service, manner, and server identity; certified-mail returns must include the signed return receipt; unserved returns must show **diligence used** and where the defendant may be found |
| TRCP-4 | 4 | Day of the triggering act excluded; last day included unless Saturday, Sunday, or legal holiday, in which case the period runs to the next non-holiday weekday; **Saturdays, Sundays, and legal holidays are not counted in any period of five days or less**, except they are counted for the three-day mail extensions under Rules 21 and 21a |
| TRCP-5 | 5 | Enlargement of time; mailbox rule — first-class mail postmarked on or before the last day and received by the clerk within ten days is timely |

**Engine notes.**
- The Rule 99(b) answer date is not "service + 20 days." It is *the Monday following the expiration of 20 days, at 10:00 a.m.* No generic date library computes this; it needs its own function and its own tests.
- Rule 4 requires a **legal-holiday table**, and business-day math is not uniform: ≤5-day periods skip weekends and holidays, longer periods don't, and the 3-day mail extension counts them. Three different modes in one rule.
- **Deliberately absent: any deadline for obtaining service.** The TRCP sets none. The diligence requirement that can defeat a limitations-saving filing is case law, and belongs in the registry as its own entry with a case cite — **not** inferred from Rule 99 or 107. Flagged, not drafted.

---

## 7. Trial setting and dispositive motions

| ID | Rule | Proposition |
|---|---|---|
| TRCP-245 | 245 | Contested cases: **not less than 45 days' notice of a first trial setting**; a previously set case may be reset on any reasonable notice or by agreement. A request for setting represents that the party reasonably and in good faith expects to be ready |
| TRCP-166a-b3 | 166a(b)(3) | Traditional motion may be filed any time after the nonmovant has appeared or answered, absent a court-ordered deadline; no-evidence motion after adequate time for discovery |
| TRCP-166a-d1 | 166a(d)(1) | **Nonmovant must file a response within 21 days after the motion is filed**, absent leave or agreement |
| TRCP-166a-e1 | 166a(e)(1) | **Movant's reply due within 7 days after the response is filed**, absent leave or agreement |
| TRCP-166a-g1 | 166a(g)(1) | Hearing or submission **must not be set within 35 days** after filing; court must set within **60 days** after filing, or **90 days** if the docket requires, on good cause, or if the movant agrees |
| TRCP-166a-g3 | 166a(g)(3) | Each party must submit a proposed order before the hearing or submission date |

**⚠ Change flag.** The 166a timing above differs materially from the pre-amendment structure (notice of hearing 21 days out; response 7 days before hearing). Anything in the app, the playbooks, or Claude's unaided recollection that assumes the old scheme is **wrong** under this text. This entry should be verified early and marked as a 2026 change in the law-change ledger.

---

## 8. What is NOT here

- **Default-judgment and post-judgment rules** — TRCP 107(h) ten-day
  return-on-file gate, 239, 239a, 241, 243, 329b, TRAP 26.1, TRAP 30. Not
  extracted in this skeleton; walked 2026-07-25 and listed as registry
  candidates in `case-heartbeat-walkthrough-capture-2026-07-25e.md` Part 11.
  **⚠ Rule 239a change flag (law-change ledger, verified 2026-07-25):** this
  skeleton carries NO 239a text in either edition — nothing here needs
  correcting — but when the 239a entry is drafted it must use the **March
  2026** text (last known **email AND mailing** address; clerk notice under
  **Rule 21(f)(10)**; "shall" → "must"), not the May 2020 mailing-only /
  post-card text. A 2020-edition PDF was uploaded by mistake before the
  correct 2026 edition; anything assuming a mailing-address-only 239a
  certificate is **wrong** under this text. Same ledger family as the 166a
  flag in §7.
- **Service diligence** — case law, no rule cite. Registry entry needed.
- **Local rules and standing orders** — court-profile tier (feature-intake item F). Bexar Monitoring Court's hearing requirement for agreed orders and the noon-Monday trial announcement are examples.
- **Judge-specific requirements** — judge profile tier.
- **Level 3 DCO dates** — case-specific documents. Live example on file: the Curry agreed DCO (joinder, plaintiff and defendant expert designations with §18.001 affidavits, mediation, amended pleadings, discovery complete, Robinson challenges, dispositive motions, exhibit/witness lists, charge and limine, trial).
- **Family Code variants** of 190.2(b)(1)(B), 190.3(b)(1)(B), and Rule 194a.
- **Statutory (non-TRCP) deadlines** — TTCA notice, limitations, §18.001 counter-affidavit timing. Separate registry entries against the codes.

---

## 9. Sign-off queue

These are registry candidates in the same one-at-a-time queue as entries 1–10 and the nine from the fee-basis draft. Suggested priority if they interleave rather than queue behind:

1. **TRCP-194.2a** — the anchor. Everything else derives from it.
2. **TRCP-190.3b1** — the cascade rule; wrong here means wrong everywhere downstream.
3. **TRCP-195.2a/b** — expert deadlines, the most expensive thing to miss.
4. **TRCP-166a-d1/e1/g1** — the change flag; current-practice risk today, independent of the build.
5. **TRCP-99b** — the Monday rule; needed before any answer-date computation ships.
