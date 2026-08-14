# Registry Verification Workbook — the full UNVERIFIED backlog, one row per entry

**Canonical repo path (proposed):** `docs/specs/registry-verification-workbook-2026-08-13.md` — NEW file, rides the next packet on Michael's word.

**Status: PROPOSED design input — research support only. NOTHING in this workbook is verified.**
Under registry discipline, upgrading a cite, supplying a cite, confirming a proposition's currency,
or setting any status is Michael's verification act alone. A model asserting legal currency is never
verification. **No registry file was read-modified, and none was altered by this session.**

**Authored:** 2026-08-13 Central (design session, Opus 5, Cowork, CHAT-DISPATCH Task 1).
**DT-1 applied:** clock-checked 21:47 CDT before stamping. The container clock read 2026-08-14 UTC —
past the 19:00 CDT rollover. This file correctly stamps **2026-08-13 Central**.

**Tooling note (TOOLING ruling, 2026-08-13):** Descrybe is NOT used in this project. All case
retrieval below is Free Law Project / CourtListener (FLP), source named per item. Q-6 separately
bars wiring the CourtListener API into the app itself.

**Majority-opinion rule (CLAUDE.md, BINDING) honored throughout:** no opinion is characterized from a
cluster id. Every case below has its `sub_opinions` enumerated and its majority identified positively
by opinion-type marker, or is expressly marked UNRESOLVED where FLP's data does not permit it.

---

## §0 — How to read this workbook, and what it is not

This workbook is the **staging layer for V-2 and the registry backlog**, built so each verification is
**one look, not one hunt**. It does not verify, does not authorize, and does not rank the entries by
importance — it ranks the *looks* by cost.

**It supersedes nothing.** `docs/specs/registry-cite-check-2026-08-13.md` (#65) remains the canonical
evidence file for the six flagged WL/slip cites and the two cite-less criminal entries. Those six
resolved looks are **referenced here, not redone**, per the dispatch instruction. Where this workbook
adds to them, the addition is marked **NEW THIS SESSION**.

### The one honest gap, stated up front

**Rule- and statute-text retrieval was NOT RUN this session for the 20 rule/statute entries.**
Retrieval for those entries would mean reading each rule's operative text against an official source
(txcourts.gov for the TRCP; the official Texas statutes site for the codes). That was not run, for two
stated reasons: FLP throttles at **5 requests/minute**, and the session's context budget was spent on
the case half, which is what Task 2 consumes. **Those rows carry `RETRIEVAL: NOT RUN` — not
`resolves N`, and not a silent omission.** The distinction matters: nothing below asserts a rule text
is right or wrong. Each such row still names the one concrete look.

**Case-entry retrieval WAS run in full.** All ten case entries resolved or are expressly flagged.

---

## §1 — Count reconciliation: the backlog is 34, not 33

CHAT-DISPATCH v1 states "~33 UNVERIFIED entries." The record says **34**, and the workbook is built
to 34. The reconciliation, so nobody re-derives it:

| Source | Figure | Note |
|---|---|---|
| `legal-rule-registry-discovery-enforcement-and-pleading.md` header | 27 UNVERIFIED | 22 deficiency batch + 5 UIM batch |
| `legal-rule-registry-criminal-plea-and-costs.md` header | 7 UNVERIFIED | "six as filed," then entry 4 SPLIT |
| **Total** | **34** | |

The 33 → 34 move is **Michael's own ruling of 2026-08-13 (#66)**: former criminal entry 4 was split
into **4a** (separate criminal actions) and **4b** (single criminal action, art. 102.073). One
proposition became two. BUILD-STATE and queue item V-2 both carry **BACKLOG 34**. The dispatch's "~33"
is the pre-split figure, and its tilde makes it approximate rather than wrong.

**Not a correction entry.** No landed artifact states 33 as a current figure; the stale number lived
only in the dispatch prompt. Recorded here so the next session does not rediscover it.

**Coverage achieved this session: 34 of 34 entries retrieved verbatim** from synced project knowledge
(RAG). One partial: TRCP 47(b)–(c)'s **Rule** text was truncated in retrieval — its heading, cite, and
status are confirmed; its operative wording is marked `TEXT PARTIAL` below. The device-bridge
full-text read at HEAD was requested and **did not land this session** (no folder connected), so every
row is sourced to RAG rather than to HEAD. **RAG absence is not evidence of absence**; here RAG
absence did not occur, but the provenance distinction is recorded.

---

## §2 — `legal-rule-registry-discovery-enforcement-and-pleading.md` — 27 entries

### §2.1 Rule entries, deficiency batch (13)

| # | Proposition as written (abridged to its operative clause) | Cite as written | Retrieval | Resolves | The ONE look |
|---|---|---|---|---|---|
| 1 | Discovery may be had into any matter relevant to the subject matter, whether or not admissible, if reasonably calculated to lead to the discovery of admissible evidence. | Tex. R. Civ. P. 192.3(a) | NOT RUN | — | Read 192.3(a) at txcourts.gov; confirm the "reasonably calculated" formulation still appears in the current rule and was not amended out. **Highest-value of the rule looks** — it is the doctrinal preamble of every DE-1 letter. |
| 2 | A party may obtain discovery of the statement of any person with knowledge of relevant facts. | Tex. R. Civ. P. 192.3(h) | NOT RUN | — | Confirm subsection letter (h) is current; witness-statement discovery has moved subsections historically. |
| 3 | A party may obtain discovery of the other party's legal contentions and the factual bases for them. | Tex. R. Civ. P. 192.3(j) | NOT RUN | — | Confirm subsection letter (j) is current. Load-bearing for the whole contention-discovery line. |
| 4 | A party must respond to written discovery completely, based on all information reasonably available at the time the response is made. | Tex. R. Civ. P. 193.1 | NOT RUN | — | One read of 193.1; the wording is short and the entry tracks it closely. |
| 5 | Objections must state specifically the legal or factual basis and the extent of refusal; a party must comply to the extent no objection is made; an objection must have a good-faith basis; an objection obscuring a responsive answer waives the objection; prophylactic privilege objections are not permitted. | Tex. R. Civ. P. 193.2(a),(b),(c),(e),(f), with cmt. 3 | NOT RUN | — | **The linchpin of DE-1** and the single most consequential rule look in the file: five subsections plus a comment, verified as one wording. Read all five subsections and cmt. 3 together — verification attaches to the composite wording as stated, not to the rule generally. |
| 6 | A response to an RFP must state, for each item or category, one of the four permitted responses. | Tex. R. Civ. P. 196.2(b) | NOT RUN | — | Read 196.2(b) and confirm four permitted forms. **Also decide the consolidation question** (see §5 Q1). |
| 7 | Interrogatories may inquire into any matter within the scope of discovery except matters covered by TRCP 195, and may ask the responding party to state legal theories and describe in general the factual bases. | Tex. R. Civ. P. 197.1 | NOT RUN | — | One read; confirm the TRCP 195 carve-out is stated correctly. |
| 8 | Records-reference answers must specify the records in sufficient detail that the requesting party can locate and identify them as readily as the responding party can. | Tex. R. Civ. P. 197.2(c) | NOT RUN | — | One read. Note the sibling file's VERIFIED 197.2(a) is a different subsection — no conflict. |
| 9 | A party may serve requests to admit the truth of any matter within the scope of discovery, including opinion, fact, or application of law to fact. | Tex. R. Civ. P. 198.1 | NOT RUN | — | One read. Sibling file's VERIFIED 198.2 is a different proposition — no conflict. |
| 10 | For purposes of a motion to compel, an evasive or incomplete answer is treated as a failure to answer. | Tex. R. Civ. P. 215.1(c) | NOT RUN | — | One read. **The motion to compel's central lever** (DE-1, DE-2). |
| 11 | Expenses and attorney's fees may be awarded on a motion to compel. | Tex. R. Civ. P. 215.1(d) | NOT RUN | — | One read; confirm the permissive "may" and any good-cause qualifier the entry omits. |
| 12 | A party that fails to admit a matter later proved may be ordered to pay reasonable expenses, including attorney's fees, incurred in making that proof. | Tex. R. Civ. P. 215.4(b) | NOT RUN | — | One read; confirm the rule's exceptions are not load-bearing for IN-7's use. |
| 13 | Parties must make a reasonable effort to resolve discovery disputes without court intervention; a motion or response addressing a discovery dispute must contain a certificate to that effect. | Tex. R. Civ. P. 191.2 | NOT RUN | — | One read. **The legal substrate of the DE-2 escalation timeline** — if the certificate requirement is stated wrongly, DE-2's fuse is wrong. |

### §2.2 Case entries, deficiency batch (9 entries / 11 authorities)

Retrieval RUN. Full citator detail — sub-opinion enumeration, citing picture, treatment flags — is in
the companion deliverable, `docs/specs/registry-citator-pass-2026-08-13.md`. This table carries only
what a verification look needs.

| # | Proposition as written | Cite as written | Retrieval (FLP) | Resolves | Reporter-cite CANDIDATE | The ONE look |
|---|---|---|---|---|---|---|
| 14 | Boilerplate and prophylactic objections are prohibited; the party asserting privilege bears the burden. | In re Park Cities Bank, 409 S.W.3d 859 (Tex. App.—Tyler 2013, orig. proceeding) | **RESOLVED.** FLP cluster 5285666, opinion 5114040, type `020lead`, Worthen, C.J.; Tex. App. 12th (Tyler), No. 12-12-00325-CV, filed 2013-08-15, **Published**. Single opinion — no concurrence, no dissent. | **Y** | n/a — already a reporter cite | Confirm the pinpoints your drafting relies on. The memo separately identifies **868** (privilege-listing) and **876** (explain-each-deficiency) as the load-bearing pages. **No cite look needed.** |
| 15 | A party challenging discovery responses must explain each asserted deficiency. | In re Volt Power, LLC, 2023 WL 2804430 (Tex. App.—Tyler 2023, orig. proceeding) | Resolved at #65 — MEMORANDUM OPINION, no reporter cite exists or will. **Not redone.** | **Y** (as "no upgrade available") | **NONE — permanent WL cite.** Reported companion: *Park Cities Bank* at 876. | Per #65: confirm 2023 WL 2804430 maps to the **April 5, 2023** substantive opinion (not the April 20 mootness dismissal), then record the closure. Decide the subsequent-history parenthetical. **RR-1 ADDITION (from the citator pass, authored later this session): the April 5 substantive opinion is FLP opinion `9385744`** — found via the *Park Cities Bank* citation graph. That pins the opinion the WL number must map to, making this a one-click confirmation rather than a search. |
| 16 | A repeated global objection string is waived. | De Anda v. Jason C. Webster, P.C., 2018 WL 3580579 (Tex. App.—Houston [14th Dist.] 2018, pet. denied) | Resolved at #65 — MEMORANDUM OPINION, located on Justia, No. 14-17-00020-CV. Not in FLP. **Not redone.** | **Y** (as "no upgrade available") | **NONE — permanent WL cite.** | Per #65: confirm "pet. denied," then record the closure. |
| 17 | Contention discovery is permissible; where no evidence supports the objections, it is an abuse of discretion to sustain them. | In re Sting Soccer Group, LP, 2017 WL 5897454 (Tex. App.—Dallas 2017, orig. proceeding) | Located at #65 (Nov. 30, 2017); **designation unconfirmed**. Not redone. | **PARTIAL** | Unknown until designation confirmed | Per #65: confirm the Nov. 30, 2017 opinion's designation — memorandum or published. If published, a reporter cite may exist. |
| 18 | Contention discovery is not work product. | In re Ochoa, 2004 WL 1192444 (Tex. App.—Tyler 2004, orig. proceeding) | Resolved at #65 — carries a **"(PUBLISH)"** notation. Not redone. | **PARTIAL** | **A reporter cite plausibly EXISTS.** | **The single highest-value look of the whole backlog.** Pull 2004 WL 1192444 on Westlaw; the header shows the S.W.3d parallel cite if one exists. This is the one entry where the flagged check plausibly closes with an *upgrade* rather than a "no upgrade available." |
| 19 | It is an abuse of discretion to deny discovery going to the heart of a party's claim. | Ford Motor Co. v. Castillo, 279 S.W.3d 656 (Tex. 2009); Able Supply Co. v. Moye, 898 S.W.2d 766 (Tex. 1995) | **RESOLVED, both. NEW THIS SESSION.** *Castillo*: FLP cluster 895102 — **three sub-opinions**; majority is opinion **9513075**, type `020lead`, Johnson, J. **A concurrence exists** (9513076, Wainwright, J.). *Able Supply*: cluster 2432526, single `010combined`, Owen, J. Both **Published**, both Tex. Sup. Ct. | **Y** | n/a — both reporter cites | **Two looks, and the second is new.** (a) Confirm the proposition is the *majority's* holding in *Castillo* and not the Wainwright concurrence's — the entry attributes one proposition to two cases jointly and does not say which supplies which half. (b) Decide the split-entry question (§5 Q2). |
| 20 | A party resisting discovery must produce evidence supporting its objections, not conclusory allegations. | In re Alford Chevrolet-Geo, 997 S.W.2d 173 (Tex. 1999); Collins v. Kappa Sigma Fraternity, 2017 WL 218286 (Tex. App.—Fort Worth 2017) | *Alford*: **RESOLVED WITH A DUPLICATE-RECORD FLAG. NEW THIS SESSION.** FLP holds **two clusters carrying the same reporter cite** — 2419858 (filed 1999-08-26, single `010combined`, citation_count 207) and 5269700 "In re Chevroletgeo" (filed 1999-06-10, two sub-opinions, citation_count 3), same docket 97-1171. *Collins*: NOT LOCATED at #65; not redone. | *Alford* **Y**; *Collins* **N** | *Alford* n/a; *Collins* unknown | **Two looks.** (a) *Collins* — retrieve 2017 WL 218286; beware the 2010 sibling appeal No. 02-09-00305-CV in the same litigation (#65's caution). (b) **NEW:** *Alford* — confirm which of the two FLP records is the operative opinion; the June 10 record is almost certainly superseded, but a retrieval landing on it reports 3 citing cases instead of 207. Relevant to the CourtListener integration design, not just to this entry. |
| 21 | Merely listing a privilege proves nothing; the burden rests on the party asserting it. | In re Redman, 2023 WL 6760074 (Tex. App.—Tyler 2023, orig. proceeding); Peeples v. Fourth Supreme Judicial Dist., 701 S.W.2d 635 (Tex. 1985) | *Redman*: resolved at #65 — MEMORANDUM OPINION, No. 12-23-00212-CV. Not redone. *Peeples*: **RESOLVED. NEW THIS SESSION.** FLP cluster 2436879, single `010combined`, Wallace, J.; Tex. Sup. Ct., No. C-4010, filed 1985-10-16, **Published**. No separate opinions. | **Y** | *Redman* **NONE — permanent WL cite**; *Peeples* n/a. Reported companion for *Redman*'s proposition: *Park Cities Bank* at **868**. | Per #65 for *Redman*: confirm the WL number maps to the **October 11, 2023** substantive opinion (not the October 18 mootness dismissal); decide the parenthetical. **RR-1 ADDITION (from the citator pass, authored later this session): the October 11 substantive opinion is FLP opinion `9890720`**, same confirmation path. *Peeples* needs **no look** — clean reported Supreme Court authority, no separate opinions. |
| 22 | Overbroad, undifferentiated "fishing expedition" requests are improper — **cited by the OPPONENT**, recorded as anticipated counter-authority, distinguishable where requests are specific. | Dillard Dep't Stores v. Hall, 909 S.W.2d 491 (Tex. 1995) | **RESOLVED. NEW THIS SESSION.** FLP cluster 2452263, single `010combined`, **`per_curiam: true`** — no authoring justice. Tex. Sup. Ct., No. 95-0548, filed 1995-10-27, **Published**. | **Y** | n/a — reporter cite | **No cite look needed.** One substantive note: the opinion is **per curiam**, which the entry does not record. If H77's `precedential_status` field is built, this is a live exhibit for it alongside *Gregory v. Chohan*. **Entered as opposing authority; nothing in the registry takes sides** — that framing is undisturbed. |

### §2.3 Rule and statute entries, UIM/pleading batch (4)

| # | Proposition as written | Cite as written | Retrieval | Resolves | The ONE look |
|---|---|---|---|---|---|
| 23 | The UDJA is available as the vehicle for establishing an insured's UIM-coverage prerequisites against the insured's own carrier. | Tex. Civ. Prac. & Rem. Code § 37.001 et seq. | NOT RUN | — | This is the one UIM entry where the proposition is **doctrinal rather than textual** — § 37.001 et seq. does not say this in terms; the availability holding comes from case law (see entry 24). Decide whether the entry should cite the statute *and* *Irwin* jointly, or whether the statutory entry should be narrowed to what the text actually provides. **A wording act, not just a verification act.** |
| 25 | In a declaratory-judgment proceeding the court may award costs and reasonable and necessary attorney's fees as are equitable and just. | Tex. Civ. Prac. & Rem. Code § 37.009 | NOT RUN | — | One read; the entry tracks the statutory language closely. |
| 26 | Venue lies in the county in which all or a substantial part of the events or omissions giving rise to the claim occurred. | Tex. Civ. Prac. & Rem. Code § 15.002(a)(1) | NOT RUN | — | One read. |
| 27 | **TEXT PARTIAL** — the required relief-bracket statement. Operative wording was truncated in retrieval and is not restated here rather than guessed. | Tex. R. Civ. P. 47(b)–(c) | NOT RUN | — | **Read the entry's own wording at HEAD first**, then 47(b)–(c). **This entry BLOCKS FE-14**, whose picklist wording cannot be encoded until it is verified — so it is the highest-value *rule* look in the file by build impact. |

### §2.4 The UIM case entry (1)

| # | Proposition as written | Cite as written | Retrieval (FLP) | Resolves | The ONE look |
|---|---|---|---|---|---|
| 24 | The UDJA is a proper vehicle for a UIM-benefit determination and supports a fees award. | Allstate Ins. Co. v. Irwin, 627 S.W.3d 263 (Tex. 2021) | **UNRESOLVED — AND THE REASON IS NEW THIS SESSION.** A citation search for `627 S.W.3d 263` returns **zero hits** in FLP. The case is present — *Allstate Insurance Company v. Daniel Wes Irwin*, Tex. Sup. Ct., No. **19-0885**, filed **2021-05-21**, Published — but under **two separate clusters** (4885466 and 4885465), **each carrying an empty citation array**, each holding a single `010combined` opinion (4689245 and 4689244) with **no author and no opinion-type marker**. | **N** | **The majority cannot be identified from FLP's data.** Neither record is typed lead/concurrence/dissent, and neither carries the reporter cite. Read the two opinions and determine which is the Court's — then confirm `627 S.W.3d 263` maps to it. The registry file already anticipated the majority-opinion rule for this entry; what it could not anticipate is that FLP's typing offers no help. **Corroboration is not verification** — the existing entry records that name, docket, and date were corroborated against a public docket source, and that stands as a flag, not a verification. |

---

## §3 — `legal-rule-registry-criminal-plea-and-costs.md` — 7 entries

**All seven hard-gate CR-10** (the plea-paperwork signing checklist): no computed check runs while
they are UNVERIFIED. That is CLAUDE.md rule 1, restated in the queue.

| # | Proposition as written | Cite as written | Retrieval | Resolves | The ONE look |
|---|---|---|---|---|---|
| 28 | Unauthorized use of a vehicle is a state jail felony. | Tex. Penal Code § 31.07 | NOT RUN | — | One read of § 31.07's punishment subsection. Cheapest look in the file. |
| 29 | Possession of a Penalty Group 1 controlled substance in an amount under one gram is a state jail felony. | Tex. Health & Safety Code § 481.115(b) | NOT RUN | — | One read. **Check the current threshold language** — PG1 quantity tiers were amended in recent sessions and the entry states a bare "under one gram." |
| 30 | A third-degree felony cannot be punished by confinement in state jail; the degree of offense and the punishment assessed must correspond. | **NONE CARRIED** — cite supply is Michael's verification act | Candidates staged at #65, not redone | **N** (cite-less by construction) | Per #65: verify **Tex. Penal Code §§ 12.34 / 12.35** plus ***Mizell v. State*, 119 S.W.3d 804, 806** as the cite set. **NEW THIS SESSION:** *Mizell*'s majority is positively confirmed — FLP cluster 2170962, opinion **9730203**, type `020lead`, Cochran, J. **A dissent exists** (9730204, Johnson, J.). #65 read the majority correctly; this confirms it by opinion type rather than by inference. |
| 31 | Where causes are prosecuted as separate criminal actions, court costs are assessed in each cause; sentences running concurrently does not merge or offset the costs. **(4a)** | **NONE CARRIED** — cite supply is Michael's verification act | Candidates named, **UNREAD**: negative implication of art. 102.073; *LaPorte v. State*, 840 S.W.2d 412 (Tex. Crim. App. 1992); *Hurlburt v. State*, 506 S.W.3d 199 (Tex. App.—Waco 2016) | **N** (cite-less by construction) | Read *LaPorte* for the "single criminal action" definition, then decide whether 4a rests on the negative implication of art. 102.073 alone or needs case support. **Note the asymmetry:** 4a is the half of the split with *no* textual anchor — 4b has the statute. |
| 32 | Where a defendant is convicted of two or more offenses, or multiple counts of the same offense, in a single criminal action, each court cost or fee may be assessed only once, using the highest category of offense; fine-only actions excluded. **(4b)** | Tex. Code Crim. Proc. art. 102.073 (text read verbatim 2026-08-13 from a public source — **not verification**) | Text confirmed at #65 against texas.public.law; official-source verification is Michael's act | **PARTIAL** | Verify art. 102.073(a)–(c) against the **official** text. **CR-10's cost check must ask same-action-or-separate BEFORE totaling** — that ordering requirement is the practical output of the whole 4a/4b split and should be re-read alongside both entries, not either alone. |
| 33 | An affirmative criminal-street-gang finding is entered under art. 42.0197 (instrument family observed in plea paperwork). | Tex. Code Crim. Proc. art. 42.0197 | NOT RUN | — | One read. **Note the proposition's shape:** it is an *observation that an instrument family exists*, not a legal rule with an operative test. Consider at verification whether it belongs in the registry as a proposition at all, or whether CR-10's completeness check should reference the instrument list directly. **A scope question, flagged not resolved.** |
| 34 | A plea may be taken by videoconference with the written consent of the parties (instrument family observed in plea paperwork). | Tex. Code Crim. Proc. art. 27.18 | NOT RUN | — | One read; confirm the written-consent requirement and any post-2021 amendments. **Same scope question as entry 33.** |

---

## §4 — The case table (Task 2 input)

Ten case entries, thirteen authorities. This is the table the citator pass consumes. Rows marked
**NOT IN FLP** cannot receive a citator pass from this tooling and are flagged rather than skipped.

| Case | Cite as written | FLP cluster | Majority opinion id / type | Separate opinions | Status |
|---|---|---|---|---|---|
| In re Park Cities Bank | 409 S.W.3d 859 (Tex. App.—Tyler 2013) | 5285666 | 5114040 / `020lead` (Worthen, C.J.) | none | Published |
| In re Volt Power, LLC | 2023 WL 2804430 (Tyler 2023) | — (resolved at #65) | memorandum | — | Memorandum |
| De Anda v. Jason C. Webster, P.C. | 2018 WL 3580579 (Houston [14th] 2018) | **NOT IN FLP** | memorandum (Justia) | — | Memorandum |
| In re Sting Soccer Group, LP | 2017 WL 5897454 (Dallas 2017) | — (located at #65) | designation unconfirmed | — | **UNCONFIRMED** |
| In re Ochoa | 2004 WL 1192444 (Tyler 2004) | — (resolved at #65) | "(PUBLISH)" notation | — | **Plausibly published** |
| Ford Motor Co. v. Castillo | 279 S.W.3d 656 (Tex. 2009) | 895102 | **9513075** / `020lead` (Johnson, J.) | **concurrence** 9513076 (Wainwright, J.) | Published |
| Able Supply Co. v. Moye | 898 S.W.2d 766 (Tex. 1995) | 2432526 | 2432526 / `010combined` (Owen, J.) | none | Published |
| In re Alford Chevrolet-Geo | 997 S.W.2d 173 (Tex. 1999) | **2419858** (operative) | 2419858 / `010combined` | none in the operative record | Published — **DUPLICATE CLUSTER 5269700** |
| Collins v. Kappa Sigma Fraternity | 2017 WL 218286 (Fort Worth 2017) | **NOT IN FLP** | — | — | **NOT LOCATED** |
| In re Redman | 2023 WL 6760074 (Tyler 2023) | — (resolved at #65) | memorandum | — | Memorandum |
| Peeples v. Fourth Supreme Judicial Dist. | 701 S.W.2d 635 (Tex. 1985) | 2436879 | 2436879 / `010combined` (Wallace, J.) | none | Published |
| Dillard Dep't Stores v. Hall | 909 S.W.2d 491 (Tex. 1995) | 2452263 | 2452263 / `010combined`, **per curiam** | none | Published |
| Allstate Ins. Co. v. Irwin | 627 S.W.3d 263 (Tex. 2021) | **4885466 AND 4885465** | **UNRESOLVED** — both `010combined`, no author, no reporter cite | **two clusters, relationship unknown** | Published |
| *(criminal file)* Mizell v. State | 119 S.W.3d 804 (Tex. Crim. App. 2003) | 2170962 | **9730203** / `020lead` (Cochran, J.) | **dissent** 9730204 (Johnson, J.) | Published |

---

## §5 — Open questions for Michael (full text, per QR-1)

**Q1 — RFP response-form consolidation.** The sibling file carries a VERIFIED **TRCP 196.2** entry for
the 30-day response period; this file carries a separate UNVERIFIED **TRCP 196.2(b)** entry for the
four permitted response forms. The registry file flagged this for you in case you want them
consolidated. **The question: do you want 196.2 and 196.2(b) consolidated into one entry, or kept as
two propositions on one rule number?** The same question rides on **197.2(a) beside 197.2(c)** and
**198.2 beside 198.1**. One answer should govern all three pairs so they cannot drift apart.

**Q2 — Two-case entries.** Three entries cite two cases each for one proposition (Castillo/Able
Supply; Alford/Collins; Redman/Peeples). The registry file records that they are kept as one entry
because the originating capture relied on them jointly, and offers to split on your word. **The
question: split each into one entry per case, or keep them joint?** This has a practical consequence
now discovered: in entry 19 the joint framing makes it impossible to tell from the registry alone
which case supplies which half of the proposition, and *Castillo* has a concurrence — so a verifier
cannot confirm the attribution without reading both opinions.

**Q3 — Do entries 33 and 34 state legal rules at all?** Both are recorded as *observations that a
plea-paperwork instrument family exists* (street-gang finding under art. 42.0197; videoconference plea
under art. 27.18) rather than as propositions with an operative legal test. **The question: should
these remain registry entries, or should CR-10's completeness check reference an instrument list
directly and these two come out of the registry?** Raised because verification of a non-proposition is
an odd act, and because both currently sit inside CR-10's hard gate — meaning CR-10 stays blocked on
verifying something that may not need verifying.

**Q4 — Entry 23's shape.** CPRC § 37.001 et seq. is cited for the proposition that "the UDJA is
available as the vehicle for establishing an insured's UIM-coverage prerequisites against the
insured's own carrier." That availability holding is *Irwin*'s (entry 24), not the statute's text.
**The question: narrow entry 23 to what § 37.001 et seq. actually provides and let entry 24 carry the
availability holding, or restate entry 23 as a joint statute-plus-case proposition?** This is a
wording act, and verification attaches to wording.

**Q5 — The FLP duplicate-record class, beyond this entry.** *Alford Chevrolet-Geo* has two FLP
clusters on one reporter cite, and *Irwin* has two clusters with no reporter cite at all. Both are
retrieval hazards of the same family as the majority-opinion rule, and both were found in a sample of
ten cases. **The question: should `registry-courtlistener-integration-design.md` §0.1 record a
duplicate-cluster hazard alongside the existing cluster-vs-sub-opinion hazard?** Raised as a design
input; Q-6 still bars wiring the API into the app, so nothing is built either way.

---

## §6 — What this workbook does NOT do

It does not alter any registry entry, status, wording, or cite. It does not verify anything. It does
not authorize anything. It does not rank entries by legal importance. Every "resolved" above means
*textually resolved in the named source* — never legally verified. **Only Michael verifies.**
