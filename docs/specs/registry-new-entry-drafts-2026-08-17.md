# Registry — the six ruled new entry texts (RL-4 ×2, WS-1, WS-2 ×3)

**Canonical repo path:** `docs/specs/registry-new-entry-drafts-2026-08-17.md`
**Status: PROPOSED / DRAFT. Every entry below enters UNVERIFIED. Nothing here is verified, and
retrieval is not verification — ONLY MICHAEL VERIFIES.**
Drafted 2026-08-17 Central (design session, Opus 5, Cowork) under CHAT-DISPATCH v4 **T-29**,
executing `RL-4`, `WS-1` and `WS-2` as ruled 2026-08-17 (recorded at
`docs/specs/fable-adjudication-record-2026-08-18.md`; on that file's date see session-log `#101`).

> ## ⚠ CORRECTED IN PLACE 2026-08-18 — READ THIS FIRST
> Audited adversarially 2026-08-18. **The forensic layer held completely** — the extraction
> reproduces byte-for-byte, every labeled verbatim quotation returns exactly one hit in two
> extraction modes, the page-header artifact is exactly where §1 says, the counts re-derive, and
> all six insertion points are valid. **Two things did not.** §3 claimed a check *"against both
> files"* that it did not run against the **destination** file, where a **VERIFIED** overlapping
> entry sits; and §3's decision sentence contradicted five other passages about entry D inside the
> paragraph Michael is meant to rule from. **Entry F carried an affirmative legal proposition
> contradicted by rule text the drafter had already read.** Four entries carried wording-fidelity
> defects, now conformed. Each correction is recorded at session-log **`#103`**; the original text
> stands at commit `a25c484`.

---

## 1. Source, named per item (SOURCING, Q-STAT-1)

**Source for all six:** the clean-authority PDF
`Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (1,764,663 bytes),
read through the device bridge on Michael's per-path grant.

- **Currency caveat, carried not cured:** *"July 2026"* is **the filename's designation**. The
  PDF's opening pages carry no separate effective-date line. This is the same caveat Michael
  **accepted rather than smoothed** at `WP-1/2/3`, and it is recorded here on the same footing.
  **Currency is not inferred from the document** (SOURCING).
- **Retrieval method:** `pdftotext -layout` into the device VM's own `/tmp` — **nothing was
  written into any connected folder**, and nothing was staged. 17,396 lines / 999,517 bytes.
- **The statute-pass §3 normalizer was NOT applied, and that was checked rather than assumed:**
  raw doubled-`A` count in this extraction is **0** (`grep -o 'AA' | wc -l`). Different
  publisher; the standing limit at BUILD-STATE holds.
- **One characterized extraction artifact, transformed and reported (never guessed):** the
  extraction carries **351** page-header lines matching `^ *Page [0-9]+ *$`, one of which falls
  **inside** the text of Rule 193.4(a), between *"…support the objection or privilege. The"* and
  *"evidence may be testimony…"*. That is a characterized context (a bare page header on its own
  line) and is removed from the quotation below. **No other transformation was applied to any
  quoted text.**
- **Every quotation was spot-checked against raw extraction, in two independent extraction
  modes** — `pdftotext -layout` and `pdftotext` (no `-layout`) — each compared on a
  whitespace-normalized stream so that line-wrapping differences between the modes could not
  masquerade as text differences. **All eight checked strings returned exactly 1 hit in both
  modes.** (The naive single-line check returned four false zeroes; the cause was characterized
  as mode-dependent line wrapping and corrected, not worked around.)

---

## 2. What the derived count is

**Re-derived at HEAD `d30f2ab` this session, never carried** — by counting per-entry
`**Status:**` lines, anchored on `^**Status:** VERIFIED` because `grep 'VERIFIED —'` also
matches `UNVERIFIED —` (the trap recorded in BUILD-STATE):

| File | Status lines | VERIFIED | UNVERIFIED |
|---|---|---|---|
| `legal-rule-registry-discovery-enforcement-and-pleading.md` | 33 | 20 | 13 |
| `legal-rule-registry-criminal-plea-and-costs.md` | 7 | 3 | 4 |
| **Backlog at HEAD** | **40** | **23** | **17** |

**⚠ SCOPE OF THAT FIGURE, added 2026-08-18.** *"Backlog"* means **these two named files only.** Two
further registry files sit **outside** the backlog basis: `legal-rule-registry-discovery-and-
carrier-duties.md` (22 status lines, all VERIFIED — **the file §3 relies on**) and
`legal-rule-registry-draft-entries-medical-billing.md` (5, all DRAFT; whether that exclusion is
deliberate is `Q-STAT-2`, open). **A count over `docs/specs/*registry*` returns a different and
wrong figure.** BUILD-STATE records this as the sharper of the two counting traps — *"THE BASIS IS
TWO NAMED FILES, NOT A GLOB"* — and the original carried the older trap forward while dropping this
one, in a document whose §3 turns on the excluded carrier-duties file.

**On execution of the six below: 46 entries — 23 VERIFIED, 23 UNVERIFIED**, all six new ones
UNVERIFIED. The enforcement file goes 33 → 39 status lines (20 V / 19 U). **The VERIFIED count
does not move: creating an entry is not verifying one.** *(`WS-3`'s entry, drafted at T-28,
would take it to 47 — not counted here.)*

*(**Superseded 2026-08-18, #108 — FIVE entries executed, not six.** Entry C became a second observation, so the enforcement file went 33 → 38 status lines; and three verifications Michael gave the same day (TRCP 191.2, TRCP 192.3(h) discoverability, HS § 481.115(b)) moved independently of these insertions. The executed figures are re-derived at HEAD in that batch's runner line and in BUILD-STATE — never read them from this paragraph.)*

---

## 3. THE COLLISION THAT MUST BE RULED BEFORE `WS-2` EXECUTES

**This is the finding of T-29 and it is put to Michael, not resolved here.**

`WS-2` ruled that "the Rule 194 machinery enters as THREE entries," and BUILD-STATE describes
them as *"the DUTY the registry never carried."* **The registry does already carry the duty.**
`legal-rule-registry-discovery-and-carrier-duties.md` holds:

> `## TRCP 194 — initial disclosures (post-2021), EXPANDED wording`
> **Rule.** Initial disclosures are required without awaiting a discovery request. Required
> content includes: correct names of the parties; name, address, and phone of persons with
> knowledge of relevant facts, and of potential parties; the identity of persons who may be
> designated as responsible third parties; insuring agreements…; and identification/production
> of the documents the disclosing party may use to support its claims or defenses.
> **Status:** VERIFIED — Michael, 2026-08-12.

> ## ⚠ CORRECTED 2026-08-18 — §3 CLAIMED A CHECK IT DID NOT RUN
> The sentence below originally read *"Three consequences, **each checked against both files at
> HEAD**."* **It was checked against the sibling file for Rule 194. It was NOT checked against the
> DESTINATION file for the overlapping proposition — and there is one.** Eight headings above entry
> E's own insertion point, `legal-rule-registry-discovery-enforcement-and-pleading.md` already
> carries:
>
> > `## TRCP 192.5(c)(1) — witness statements excepted from work-product protection`
> > **Rule.** *"…information discoverable under Rule 192.3 concerning experts, trial witnesses,
> > **witness statements**, and contentions is **not work product protected from discovery**."*
> > **Status: VERIFIED — Michael, 2026-08-17.**
> > **Relied on for:** *the `privilege_tier` classification questions (**Q-COM-11**; **Q-COM-12**)…*
>
> **That is entry E's own stated reliance, on a VERIFIED entry, in the file entry E is being
> inserted into.** The two are not identical — 192.5(c)(1) says a witness statement **is not work
> product at all**; 194.5 says **no objection or work-product assertion is permitted against a Rule
> 194 disclosure**, which is procedural and narrower. But they overlap on exactly the downstream
> consumers entry E names, and the one-proposition-one-home analysis §3 spends four paragraphs on
> applies to this overlap too. **See `Q-WS2-1(e)`, new.**

Three consequences, checked against the sibling carrier-duties file at HEAD *(and see the
correction above for what that check did not cover)*:

1. **Entry C (194.1(a)) substantially duplicates it.** That entry's first sentence *is*
   194.1(a)'s duty, and it is **VERIFIED**. The enforcement file's own header, moreover, records
   **TRCP 194** by name in its already-applied dedupe list — *"each took a second observation
   there under the one-proposition-one-home rule (the TRCP 193.7 precedent) instead of a
   duplicate entry here."*
2. **Entries D (194.2(b)(9)) and E (194.5) do NOT duplicate it.** Witness statements appear
   **nowhere** in that entry's four-category content list, and 194.5's bar on objections and
   work-product assertions is **absent from it entirely**. Both are genuinely new propositions.
3. **The unresolved SPAN flag decides which of these is true**, and it is already on the record
   in that file, unresolved: the entry is headed **"TRCP 194"** while a capture cites the span
   **"TRCP 194.1–194.4."** *Whether the verified entry's scope is the whole rule or the
   enumerated span is "his read at the next verification pass."* **On the whole-rule reading, 194.5
   falls within that entry's scope and entries C and E become duplicate candidates. On the span
   reading, 194.5 sits outside the enumerated span and is clearly new.** *(Corrected 2026-08-18.
   The original ended "**all three drafts are duplicates**," which contradicts five other passages
   in this same document — §3 consequence 2, `Q-WS2-1(d)`, entry D's dedupe note, §6's table, and
   the closing line — every one of which says **entry D is new on either reading**. The
   contradiction sat inside the very paragraph Michael is meant to rule from. **Entry D is not
   affected by the span question.**)*

**This is NOT a ROUTE-C divergence** — ROUTE-C governs a registry proposition against operative
text. This is a **dedupe/scope collision between a newly ruled entry and an existing VERIFIED
entry**, and creating a duplicate would break the one-proposition-one-home rule the enforcement
file's header says it already applied to this exact rule.

**All three are drafted below as ruled** — a session does not narrow a ruling to two — **each
carrying an explicit dedupe note**, and the question is put whole (QR-1):

> **OPEN — `Q-WS2-1` (full question text):** `WS-2` ruled TRCP 194.1(a), 194.2(9) and 194.5 into
> existence as three new entries in `legal-rule-registry-discovery-enforcement-and-pleading.md`.
> But `legal-rule-registry-discovery-and-carrier-duties.md` already carries a **VERIFIED** entry
> headed **"TRCP 194 — initial disclosures (post-2021), EXPANDED wording"** (Michael, 2026-08-12)
> whose own wording states the disclosure duty, and that file also carries an **unresolved span
> flag** — is that entry's scope the whole of Rule 194, or the enumerated span 194.1–194.4?
> **(a)** Does the span question resolve to the whole rule or to 194.1–194.4? **(b)** On your
> answer: should **194.1(a)** enter as its own entry here, or instead as a **second observation**
> on the existing verified TRCP 194 entry (the TRCP 193.7 / one-proposition-one-home precedent)?
> **(c)** Same question for **194.5**, which is outside the enumerated span but inside the whole
> rule. **(d)** 194.2(b)(9) appears to be new on either reading — confirm. **Nothing executes
> until you answer; the three texts below are drafted and held.**

> **OPEN — `Q-WS2-2` (cite conformation, flagged as its own act, never done silently — ROUTE-C):**
> The ruling records the second entry as **"194.2(9)."** The operative rule has **no such
> subdivision**: item (9) sits under subdivision **(b) Content**, and the rule cites its own
> subdivisions through the (b) level (`194.2(b)(3) and (4)` appears twice in the rule text; a
> bare `194.2(9)` appears **0 times**). *(Count corrected 2026-08-18: the string `194.2(b)(3) and
> (4)` appears **once**, not twice. There are two such citations in two different forms — Rule
> 194.6's `"Rule 194.2(b)(3) and (4)"` and Rule 197.3's `"Rule 194.2(b)(3) and (b)(4)"` — both
> routing through the (b) level, so the conclusion is strengthened, not weakened. Note also that
> `194.2(b)(9)` itself appears **0 times**: the conformed cite is drawn from the rule's citation
> convention, not from a form the rule uses.)* The draft below is written as **TRCP 194.2(b)(9)**.
> **Confirm the cite conformation, or direct the ruling's shorthand to be carried as written.**

---

## 4. THE SIX DRAFTED ENTRY TEXTS

Format follows the enforcement file's own convention exactly (heading = cite + short subject;
`**Cite:**` / `**Rule.**` / `**Status:**` / `**Relied on for:**` / `**Source:**`). **Placement is
subject order — rules before the cases that support them**, matching that file's stated Structure
paragraph and the placement precedent set for the three work-product entries.

### A — `WS-1` · insert AFTER `## TRCP 192.3(h) — what a witness statement is`, BEFORE `## TRCP 192.3(j)`

```markdown
## TRCP 192.3(h) — a person's right to his or her own statement

**Cite:** Tex. R. Civ. P. 192.3(h); enforcement at Tex. R. Civ. P. 215.1(e).
**Rule.** Any person may obtain, upon written request, his or her own statement concerning the lawsuit, which is in the possession, custody or control of any party. The right runs to **any person**, not only to a party to the suit, and it is not conditioned on a pending discovery request. Its teeth are in TRCP 215.1(e): if a party fails to comply with such a written request, **the person who made the request** may move for an order compelling compliance, and on a granted motion may recover the expenses incurred in obtaining the order, including attorney fees reasonable in relation to the work reasonably expended. **Rule 215.1's preamble conditions any application under it on "reasonable notice to other parties and all other persons affected thereby," and 215.1(a) directs non-deposition applications to the court in which the action is pending. FLAGGED, NOT RESOLVED: that preamble grants the application right to "A party," while (e) grants the motion to "the person who made the request," who under 192.3(h) need not be a party.**
**Status:** UNVERIFIED.
**Relied on for:** the witness-statement conversion boundary (the T-22 memo's §3 territory) — a person recorded by this firm may demand the recording or its substantially verbatim transcript back, on written request alone; and the intake/adjuster-call posture, where the recorded person is typically not a party.
**Dedupe note.** 215.1(e) is cited **within this entry as its enforcement limb** rather than taking an entry of its own — the conservative default recorded at the ruling. The file's existing 215.1(c) and 215.1(d) entries are separate propositions (evasive answers; expenses on a motion to compel) and are untouched.
**Source:** clean-authority PDF, `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` ("July 2026" is the filename's designation; no separate effective-date line — caveat accepted at WP-1/2/3). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, quotations spot-checked in two extraction modes; the statute-pass §3 normalizer NOT applied (different publisher; raw `AA` count 0).
```

*Verbatim basis, 192.3(h) final sentence:* "Any person may obtain, upon written request, his or
her own statement concerning the lawsuit, which is in the possession, custody or control of any
party." *Verbatim basis, 215.1(e):* "If a party fails to comply with any person's written request
for the person's own statement as provided in Rule 192.3(h), the person who made the request may
move for an order compelling compliance. If the motion is granted, the movant may recover the
expenses incurred in obtaining the order, including attorney fees, which are reasonable in
relation to the amount of work reasonably expended in obtaining the order."

**No collision:** the file's two existing 192.3(h) entries carry *discoverability* and *what a
witness statement is*. **Neither carries the own-statement right.** This is a genuinely third
proposition on the same subdivision — the shape `WS-1` ruled.

### B — `RL-4` · insert AFTER `## TRCP 193.2(a),(b),(c),(e),(f) and comment 3`, BEFORE entry C

```markdown
## TRCP 193.4(a) — hearing on objections; the objecting party carries the evidentiary burden

**Cite:** Tex. R. Civ. P. 193.4(a).
**Rule.** Any party may at any reasonable time request a hearing on an objection or claim of privilege asserted under this rule (i.e. Rule 193 — the construction is stated rather than substituted). **The party making the objection or asserting the privilege must present any evidence necessary to support it** — by testimony at the hearing or by affidavits served at least seven days before the hearing, or at such other reasonable time as the court permits. If the court determines that in camera review of some or all of the requested discovery or required disclosure is necessary, that **material or information** must be segregated and produced to the court in a sealed wrapper within a reasonable time following the hearing.
**Status:** UNVERIFIED.
**Relied on for:** the evidence-burden limb of the deficiency letter and motion to compel (DE-1) — an objection or privilege claim asserted in a response is not self-proving, and the burden of coming forward with supporting evidence is the objecting party's, not the movant's. Pairs with TRCP 199.6 for the deposition-side equivalent.
**Dedupe note.** Distinct from the existing TRCP 193.2 entry, which covers **objection specificity and waiver**. This entry covers the **hearing and the evidentiary burden**, which 193.2 does not reach. No entry for 193.4(b) or (c) is created by this ruling.
**Source:** clean-authority PDF, `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (currency caveat as above). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, spot-checked in two extraction modes. One characterized page-header artifact (`Page 125`) falls inside this rule's text in the extraction and was removed; no other transformation applied.
```

### C — `WS-2` (1 of 3) · insert AFTER entry B — **HELD ON `Q-WS2-1`**

*(**Resolved 2026-08-18, #108, Q-WS2-1(b): entry C is NOT inserted.** Its substance enters as a SECOND OBSERVATION on the VERIFIED "TRCP 194 — initial disclosures (post-2021), EXPANDED wording" entry in `legal-rule-registry-discovery-and-carrier-duties.md`, under the one-proposition-one-home rule. The block below is retained as the drafted text of record; it does not execute.)*

```markdown
## TRCP 194.1(a) — initial disclosures are owed without awaiting a request

**Cite:** Tex. R. Civ. P. 194.1(a).
**Rule.** Except in a suit governed by the Family Code, as exempted by Rule 194.2(c), or as otherwise agreed by the parties or ordered by the court, a party must — **without awaiting a discovery request** — provide to the other parties the information or material described in Rule 194.2, 194.3, and 194.4.
**Status:** UNVERIFIED.
**Relied on for:** the "owed anyway" limb of the witness-statement posture — a Rule 194.2(b)(9) witness statement is owed as an initial disclosure whether or not anyone requests it, so a deficiency analysis that looks only at propounded discovery misses it entirely.
**Dedupe note — READ `Q-WS2-1` BEFORE EXECUTING.** `legal-rule-registry-discovery-and-carrier-duties.md` carries a **VERIFIED** entry headed "TRCP 194 — initial disclosures (post-2021), EXPANDED wording" (Michael, 2026-08-12) whose own first sentence states this duty, and that file carries an **unresolved span flag** (whole rule vs. 194.1–194.4). On the whole-rule reading this entry is a duplicate and should instead be a **second observation** there under the one-proposition-one-home rule (TRCP 193.7 precedent). **Michael's ruling governs; this entry does not execute until he answers.**
**Source:** clean-authority PDF, `…\texas-rules-of-civil-procedure July 2026.pdf` (currency caveat as above). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, spot-checked in two extraction modes.
```

**Note worth carrying to the deadline memo, not adopted here:** the Family Code carve-out sits in
this subdivision's own words. The deadline memo's headline already reads that **the 50-day
discovery-response extension is FAMILY-CODE-ONLY** on the July 2026 text. **The two are
consistent and this entry does not resolve the memo's open item** — flagged only so nobody reads
the carve-out as new.

### D — `WS-2` (2 of 3) · insert AFTER entry C — **cite conformed, see `Q-WS2-2`**

*(**Resolved 2026-08-18, #108: Q-WS2-2 RULED — the 194.2(b)(9) conformation is confirmed** and stays flagged on the entry as its own act. Entry D executed 2026-08-18; because entry C is not inserted, D was placed immediately after entry B.)*

```markdown
## TRCP 194.2(b)(9) — a witness statement is an initial disclosure

**Cite:** Tex. R. Civ. P. 194.2(b)(9).
**Rule.** Among the initial disclosures a party must provide to the other parties without awaiting a discovery request are **"any witness statements described in Rule 192.3(h)."** The obligation is content-based and automatic: it attaches to the artifact's character under 192.3(h), not to whether an opposing party has asked for it.
**Status:** UNVERIFIED.
**Relied on for:** the witness-statement conversion pipeline (T-22 memo; `Q-COM-12`) — the disclosure duty is the reason a recording's classification at capture has consequences that a later privilege decision cannot undo; and the deficiency taxonomy's PRIV category, where a withheld witness statement is not merely un-produced but un-disclosed.
**Dedupe note.** New on either reading of the span flag — witness statements appear **nowhere** in the four-category content list of the VERIFIED "TRCP 194" entry in `legal-rule-registry-discovery-and-carrier-duties.md`. See `Q-WS2-1(d)`.
**Cite note (`Q-WS2-2`).** The ruling records this as "194.2(9)." The operative rule has no such subdivision: item (9) sits under **(b) Content**, and the rule cites its own subdivisions through the (b) level. Conformed to **194.2(b)(9)** and flagged as its own act — never conformed silently (ROUTE-C).
**Source:** clean-authority PDF, `…\texas-rules-of-civil-procedure July 2026.pdf` (currency caveat as above). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, spot-checked in two extraction modes.
```

### E — `WS-2` (3 of 3) · insert AFTER entry D, BEFORE `## TRCP 196.2(b)` — **HELD ON `Q-WS2-1(c)`**

*(**Resolved 2026-08-18, #108, Q-WS2-1(c)+(e): entry E IS inserted — its own entry, with an express cross-reference** to the VERIFIED `## TRCP 192.5(c)(1)` entry in the destination file. Executed 2026-08-18; the cross-reference line was added on insertion and is not in the block below.)*

```markdown
## TRCP 194.5 — no objection and no work-product assertion against a Rule 194 disclosure

**Cite:** Tex. R. Civ. P. 194.5.
**Rule.** **"No objection or assertion of work product is permitted to a disclosure under this rule."** The bar is unqualified **as to what it names** — objections and work-product assertions — and reaches the whole of Rule 194, including the Rule 194.2(b)(9) witness-statement disclosure. A work-product designation applied to a witness statement therefore does not withhold it from the initial-disclosure obligation, whatever it may do elsewhere.
**Scope note (`Q-WS2-3`, OPEN — added 2026-08-18).** The bar does **not** name the attorney-client privilege, and no located authority decides whether that privilege excuses a Rule 194.2(b)(9) disclosure. **Nothing in this entry asserts an answer.** Note also that this is a **1999** provision, not a 2021 one — the 2021 amendments changed the *timing* of disclosure, not the work-product bar.
**Status:** UNVERIFIED.
**Relied on for:** the load-bearing limb of the witness-statement memo — the reason a `privilege_tier` of `'work-product'` on a recording or transcript is not a shield against the disclosure duty; and the DE-1 PRIV deficiency category, where an objection lodged against a Rule 194 disclosure is facially impermissible rather than merely unsupported.
**Dedupe note — READ `Q-WS2-1(c)`.** Absent entirely from the VERIFIED "TRCP 194" entry in `legal-rule-registry-discovery-and-carrier-duties.md`. **But the span flag reaches it:** on the whole-rule reading of that entry's scope, this proposition sits inside an already-VERIFIED entry; on the 194.1–194.4 reading it plainly does not. **Michael's ruling governs.**
**Source:** clean-authority PDF, `…\texas-rules-of-civil-procedure July 2026.pdf` (currency caveat as above). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, spot-checked in two extraction modes. The quoted sentence is the entire text of Rule 194.5 and was verified character-for-character in both modes.
```

### F — `RL-4` · insert AFTER `## TRCP 198.1`, BEFORE `## TRCP 215.1(c)`

```markdown
## TRCP 199.6 — hearing on deposition objections; the party avoiding discovery carries the burden

**Cite:** Tex. R. Civ. P. 199.6.
**Rule.** Any party may at any reasonable time request a hearing on an objection or privilege asserted by an instruction not to answer or a suspension of the deposition; **a party's failure to obtain a ruling prior to trial does not waive any objection or privilege.** **The party seeking to avoid discovery must present any evidence necessary to support the objection or privilege** — by testimony at the hearing or by affidavits served on opposing parties at least seven days before the hearing. If in camera review is necessary to rule, answers may be made in camera, transcribed and sealed if the privilege is sustained, or made in an affidavit produced to the court in a sealed wrapper.
**Status:** UNVERIFIED.
**Relied on for:** the deposition-side evidence burden, the counterpart to TRCP 193.4(a) for written discovery — an instruction not to answer is not self-proving, and the burden of supporting it rests on the party resisting. **NO ASYMMETRY IS ASSERTED (corrected 2026-08-18).** Both rules preserve the objection notwithstanding the absence of a pre-trial ruling, in different words and different subdivisions: 199.6 by proviso inside the hearing sentence, and **TRCP 193.4(b) by a standalone sentence — *"A party need not request a ruling on that party's own objection or assertion of privilege to preserve the objection or privilege."*** *(The original stated an asymmetry here and told the reader to carry it "into any deadline or waiver logic." It was the only sentence in this document directing downstream build logic to treat two rules differently, and the difference does not exist — 193.4(b) had been read, as entry B's own dedupe note shows.)*
**Dedupe note.** No existing entry covers Rule 199. Distinct from the TRCP 215.1(c)/(d) entries, which address evasive answers and expenses rather than the evidentiary burden at a hearing.
**Source:** clean-authority PDF, `…\texas-rules-of-civil-procedure July 2026.pdf` (currency caveat as above). Retrieval: RUN 2026-08-17, raw pdftotext in the device VM, spot-checked in two extraction modes.
```

---

## 4a. RR-1 CROSS-REFERENCE — added after the T-28 read, to a document drafted before it

**This section was added by the RR-1 pass**, because the WS-3 authority read (T-28) was completed
*after* §4 was drafted and it bears directly on entries D and E.

*In re Fontenot*, 13 S.W.3d 111, and *In re ExxonMobil Corp.*, 97 S.W.3d 353, hold — on Rule 192
comment 9 — that **192.3(h)'s discovery of witness statements is limited by privilege**, and that a
witness statement inside a confidential attorney-client communication is protected. Entries D and
E state the Rule 194 **disclosure** obligation. **The two have an interaction that neither entry
states, and no located authority resolves it:**

> **OPEN — `Q-WS2-3` (full question text):** TRCP 194.5 bars *"[n]o objection or assertion of work
> product"* against a Rule 194 disclosure. It does **not** name the attorney-client privilege.
> TRCP 192.3(h)'s *discovery* of witness statements is limited by privilege (*Fontenot*;
> *ExxonMobil*, on comment 9). **Does the attorney-client privilege excuse a Rule 194.2(b)(9)
> initial disclosure, or does 194.5's silence about it mean only work-product assertions are
> barred and privilege assertions survive?** The question matters most for the artifact this firm
> actually creates — a recorded client interview that is both privileged and a witness statement.
> **No authority located in the T-28 pass decides it.** Entries D and E are drafted without
> resolving it and neither asserts an answer.

Entries D and E are **not reworded** by this note — the interaction is flagged, not smoothed, and
resolving it is Michael's. See `docs/specs/ws3-privilege-authority-read-2026-08-17.md` §4, which
raises the mirror-image question (`Q-WS3-1`) from the case-law side. **One question, two entry
points, deliberately cross-referenced rather than recorded twice** (the no-second-row discipline).

## 5. Header edit required by execution

`legal-rule-registry-discovery-enforcement-and-pleading.md`'s Status header is **re-derived at
execution, never copied from this document** (the standing rule). On full execution of all six it
reads **39 status lines — 20 VERIFIED, 19 UNVERIFIED**; if `Q-WS2-1` removes entries C and/or E
in favour of second observations, the runner derives the actual figure and states it. The
header's **dedupe paragraph** must also gain the Rule 194 cross-reference, since that paragraph
currently names TRCP 194 as deduped-away and the execution of `WS-2` changes that description.

## 6. Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-WS2-1` | The Rule 194 collision question, stated in full at §3 above — now **FIVE** parts. **(a)** Does the span flag resolve to the whole rule or to 194.1–194.4? **(b)** Should 194.1(a) be its own entry or a **second observation** on the existing VERIFIED TRCP 194 entry? **(c)** Same question for 194.5. **(d)** Confirm 194.2(b)(9) is new on either reading. **(e) NEW 2026-08-18 — the overlap §3 missed:** the **destination** file already carries `## TRCP 192.5(c)(1) — witness statements excepted from work-product protection`, **VERIFIED — Michael, 2026-08-17**, whose own *"Relied on for"* names the same `privilege_tier` consumers entry E names. 192.5(c)(1) says a witness statement **is not work product at all**; 194.5 says **no objection or work-product assertion is permitted against a Rule 194 disclosure** — narrower and procedural. **Does 194.5 earn its own entry, or take a second observation on the verified 192.5(c)(1) entry?** | **OPEN — blocks entries C and E** — **RESOLVED 2026-08-18, #108: RULED on all five limbs; entries A, B, D, E, F inserted, C became a second observation. See `t26-signoff-and-adjudication-record-2026-08-18.md` §2.** |
| `Q-WS2-2` | Cite conformation `194.2(9)` → `194.2(b)(9)`, stated in full at §3 above. | **OPEN — entry D drafted conformed, flagged** — **RESOLVED 2026-08-18, #108: RULED — the 194.2(b)(9) conformation is confirmed and stays flagged on the entry as its own act.** |
| `Q-WS2-3` | Whether attorney-client privilege excuses a Rule 194.2(b)(9) initial disclosure, given that 194.5 bars only objections and work-product assertions while *Fontenot*/*ExxonMobil* limit 192.3(h) discovery by privilege. **Full question text at §4a above.** Cross-referenced with `Q-WS3-1`; one question, not two rows. | **OPEN — flagged, entries D/E not reworded** |
| `Q-WS1-1` | `WS-1`'s entry cites 215.1(e) *within* the entry as its enforcement limb rather than minting a separate 215.1(e) entry, per the conservative default. **Confirm that placement, or direct 215.1(e) to take its own entry** — the file already carries 215.1(c) and 215.1(d) as separate entries, which cuts the other way. | **OPEN — entry A drafted on the conservative default** |

**Nothing in this document is verified. Nothing is built. Entries A, B, D and F are ready to
execute on Michael's word; C and E are drafted and HELD on `Q-WS2-1`.**

*(**Superseded 2026-08-18, #108.** `Q-WS2-1` is RULED on all five limbs and `Q-WS2-2` is RULED. Entries A, B, D, E and F were inserted into `legal-rule-registry-discovery-enforcement-and-pleading.md` on 2026-08-18, all UNVERIFIED; entry C was not, becoming a second observation instead. Nothing in this document is verified — that has not changed.)*
