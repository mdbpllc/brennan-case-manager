# RL-6 — the nine unnamed criminal opinions, read in full

**Canonical repo path:** `docs/specs/criminal-opinions-read-2026-08.md`
**Status: PROPOSED / staging. Everything below is a CANDIDATE. Nothing is verified, no cite is
selected, no registry entry is created or changed by this document. Retrieval is not
verification — ONLY MICHAEL VERIFIES.**
Read 2026-08-17 Central (design session, Opus 5, Cowork) under CHAT-DISPATCH v4 **T-27**,
executing `RL-6` as ruled 2026-08-17.

**THE CITE SUPPLY FOR ENTRIES 30 AND 31 IS MICHAEL'S. This document stages findings; it does not
select.** Where a case could serve an entry, it is presented with its limits attached and the
choice left open — including the option of choosing none.

> ## ⚠ CORRECTED IN PLACE 2026-08-18 — READ THIS FIRST
> Audited adversarially 2026-08-18. **The supersession finding is TRUE IN SUBSTANCE and was WRONG
> IN ARTICULATION in three ways that would each have caused a concrete mistake** — it split LaPorte
> by page when the pages do not split that way, it bundled a holding into the overruling that was
> only **narrowed**, and it presented a 4-judge plurality dictum as symmetrical with a 5-vote
> majority act. **A headline count was wrong in four places.** Corrections in place; each recorded
> at session-log **`#103`**. Original text stands at commit `a25c484`.

---

## 0. THE HEADLINE, IN FOUR LINES

1. **THE ENTRY-31 BRIDGE IS NOT BUILT BY ANY OF THE NINE — but one comes close and it is
   *Middleton*.** Eight of the nine never mention art. 102.073 at all. *Middleton v. State*, 634
   S.W.3d 46, quotes art. 102.073(a) in **footnote 36** and discusses it in **footnote 37**, both
   at **[\*53]** — but as the **State's** parallel-statute argument, answered hypothetically
   ("even assuming the State is correct") and expressly **not decided.** §3.
   **⚠ ADDED 2026-08-18: a published bridge case exists OUTSIDE the nine.** ***Whaley v. State***
   (Tex. App.—Dallas Jan. 21, 2020) applies LaPorte's definition **and** art. 102.073 in one
   opinion — *"because the cases were tried in the same proceeding, the court should only have
   assessed costs for the higher category offense."* **LOCATOR ONLY — not read, not V-9-identified,
   designation unconfirmed.** It changes `Q-RL6-1`, which offered three options and did not include
   "published intermediate authority doing exactly this exists and was not in the folder."
2. **LaPorte IS OVERRULED IN PART — and the original statement of it was wrong.**
   ~~"A SUPERSESSION NOBODY FLAGGED … LaPorte's *definitional* holding at 414 survives … which half
   is cited now matters."~~ **Corrected: the "NOBODY FLAGGED" framing is withdrawn** (*Carter* is a
   published 2017 CCA opinion; any commercial citator would flag it — the defensible claim is that
   *this project's record* had not distinguished LaPorte's two holdings), **and the page split is
   wrong.** See §4 as rewritten. The accurate statement: **the void-sentence holding is overruled
   by five votes; the definition survives and is secured by *Middleton*, not by *Carter*; and
   "may be raised at any time" was NARROWED, not overruled.**
3. **V-9 FIRED ON FOUR OF THE NINE, HOURS AFTER IT WAS RULED THE SAME EVENING.** *(Corrected: the
   original said "THE DAY AFTER IT WAS RULED," which contradicts this packet's own T-32 correction
   — V-9 was ruled 2026-08-17 evening and this read ran 2026-08-17, roughly an hour later. The
   original also said it two incompatible ways in one file.)* Three are per curiam with no author
   and no panel on the face of the copy; a fourth has **no majority opinion at all** — it is a
   plurality. Under V-9 these are **flagged and NOT staged for verification.** §5.
4. **FOUR OF THE NINE ARE MARKED "DO NOT PUBLISH"** — *Schmitt*, *Bailey*, *Simmons 2014*,
   *Simmons 2015*. *(Corrected from "FIVE," which was wrong here and propagated to three other
   places. §5's own table listed four and five PUBLISH; re-derived from the source PDFs.)*
   **⚠ AND THE CONSEQUENCE IS WORSE THAN THIS MEMO ORIGINALLY STATED.** All nine are **Court of
   Criminal Appeals** opinions, so **TRAP 77 governs them, not TRAP 47.** **TRAP 77.3:**
   *"Unpublished opinions have no precedential value **and must not be cited as authority by counsel
   or by a court.**"* **That is a bar, not a "citation limit"** — see `Q-RL6-5`, rewritten. §5.

---

## 1. Method, named per QR-6(a)

- **Source (corrected 2026-08-18):** the granted folder `Documents\Knowledge Repo\Opinions\` holds
  **fifteen** PDFs, of which **ten were read** — the nine named in T-27 **plus *LaPorte v. State*,
  840 S.W.2d 412**, read for the entry-31 bridge test at §2. *(The original said "the nine PDFs in
  `Opinions\`," which was wrong about its own corpus in the section that exists to state
  provenance, and left the tenth opinion's source unnamed under a heading reading "named per
  QR-6(a)." LaPorte's V-9 identification is confirmed: `Judges: En Banc` / `Opinion by: MCCORMICK`.
  The original also referred to a sibling `PI\` subfolder as not opened — **no subdirectory of any
  kind exists under `Opinions\`**; the `PI\` folder is under `Knowledge Repo\Civil\`, a different
  grant, and was not opened there either.)* H5 honored: only granted paths were listed.
- **Extraction:** `pdftotext -layout` into the device VM's own `/tmp` — **nothing written into any
  connected folder**, nothing staged, no scratch left on Michael's disk. **No `git` command was
  run against the checkout during this task and no `.git/index.lock` was stranded.**
- **Reading:** the nine were read in full by three parallel readers, each given the V-9 rule, the
  bridge test, and an instruction that a negative result is a finding rather than a failure.
- **One method defect, caught and corrected rather than absorbed:** the concatenated hand-off
  file **truncated at 262,144 characters**, cutting *Simmons 2014* mid-opinion and omitting
  *Simmons 2015* entirely. The reader detected the truncation, **re-extracted both from the
  source PDFs**, and verified its *Green* text matched the truncated copy line-for-line. Recorded
  because an undetected truncation would have produced a confident report on an opinion nobody
  read. A second, related trap: a line-based search reported "no match" for *single criminal
  action* in *Green* because the phrase **wraps across a line break** — all phrase searches were
  re-run whitespace-normalized. **Both traps are the same class as the TRCP extraction-mode
  artifact recorded at T-29.**
- **These are paginated vendor (Lexis) copies.** Under V-9 that is an acceptable identification
  source **only where the copy states authorship on its face** — which is exactly what §5
  reports, case by case.

---

## 2. WHAT ENTRY 31 NEEDED, AND WHAT THE READ RETURNED

Entry `4a` (global **31**) is cite-less and reads: *"Where causes are prosecuted as separate
criminal actions, court costs are assessed in each cause; sentences running concurrently does not
merge or offset the costs."* Its recorded candidates are *"negative implication of Tex. Code Crim.
Proc. art. 102.073; **LaPorte** …; **Hurlburt** …"* — both marked **UNREAD**.

**LaPorte is now READ** (840 S.W.2d 412, Tex. Crim. App. 1992; the copy states *"Opinion by:
MCCORMICK"* and *"Judges: En Banc. McCormick"* — V-9 satisfied). Its operative holding, verbatim —
and **the `[*415]` marker falls BEFORE this sentence, so the holding itself is at 415**, a fact §4
originally got backwards:

> "Therefore, we hold that a defendant is prosecuted in 'a single criminal action' whenever
> allegations and evidence of more than one offense arising out of the same criminal episode, as
> that term is defined in Chapter 3, are presented in a single trial or plea proceeding, whether
> pursuant to one charging instrument or several, and the provisions of Section 3.03 then apply."

**`Hurlburt v. State`, 506 S.W.3d 199 (Tex. App.—Waco 2016), is NOT in the `Opinions\` folder and
remains UNREAD.** Named here so the gap is not mistaken for a negative finding.

**What LaPorte does and does not supply for entry 31.** It defines "a single criminal action" —
and it does so **for Penal Code Chapter 3**, in terms that expressly end *"and the provisions of
Section 3.03 then apply."* It says nothing about costs. Entry 31 needs the definition to travel
into art. 102.073, and **LaPorte itself does not carry it there.**

---

## 3. THE BRIDGE TEST — the answer, case by case

| Opinion | Mentions art. 102.073? | Uses "single criminal action"? | LaPorte pin cite | Bridges to costs? |
|---|---|---|---|---|
| *Bonilla*, 452 S.W.3d 811 (2014) | **NO** | ×2, both quoting statutes | **415 only** (×5) | **NO** |
| ***Middleton*, 634 S.W.3d 46 (2021)** | **YES — fnn. 36–37 at [\*53]** | ×8, incl. the Court's own definition | **414** (×2) | **DICTA ONLY** |
| *Williams*, 253 S.W.3d 673 (2008) | **NO** | ×2, both statutory | no pin cite; reciting appellant | **NO** |
| *Schmitt*, 2012 Unpub. LEXIS 887 | **NO** | **zero occurrences** | 415 | **NO** |
| *Ex parte Bailey*, 2011 Unpub. LEXIS 388 | **NO** | ×5 | **414** | **NO** |
| *Ex parte Carter*, 521 S.W.3d 344 (2017) | **NO** | ×4 | **414–15**, 415 | **NO** |
| *Ex parte Green*, 457 S.W.3d 90 (2015) | **NO** | ×1, descriptive | 415 | **NO** |
| *Ex parte Simmons*, 2014 Unpub. LEXIS 501 | **NO** | **zero occurrences** | 415 | **NO** |
| *Ex parte Simmons*, 2015 Unpub. LEXIS 776 | **NO** | ×8 (+9 "single action") | 414, 414–15, 415 | **NO** |

**Eight of nine: clean negative.** No mention of art. 102.073, no court-costs content of any kind.
In *Bonilla*, *Williams* and *Green* the phrase appears only inside quoted statutory text or
descriptive recitals; **in *Schmitt* and *Simmons 2014* it does not appear at all.** *(Corrected
2026-08-18: the original listed all five together as places the phrase "appears only inside quoted
statutory text," contradicting its own table two lines above, which records zero occurrences for
those two.)* *Williams* (2008) predates art. 102.073's enactment, so its silence carries no
interpretive weight.

> ⚠ **The "LaPorte pin cite" column above is corrected at §4 and should be read with it.** The
> original's framing — 415 is the void-sentence page, 414 is where "the definition lives" — **is
> wrong. Both sit on 415.** Two table cells are also off: *Middleton*'s "single criminal action"
> count is **×9**, not ×8 (the ninth is inside fn. 36's quotation of art. 102.073(a)), and
> *Simmons 2015* carries no `414–15` pin-cite form (its forms are `at 414` ×3, `at 415` ×1,
> `412, 415` ×1). *Carter*'s `414–15, 415` is exact.

### 3.1 *Middleton* — the only one that touches the bridge, and it stops short

*Middleton v. State*, 634 S.W.3d 46 (Tex. Crim. App. 2021). **Published.** *"Judges: KELLER, P.J.,
delivered the opinion for a unanimous Court."* / *"Opinion by: KELLER."* **V-9 satisfied; no
separate opinions.** Disposition: affirmed.

**Its holding, at [\*50], adopting LaPorte at 414:** *"The phrase 'a single criminal action' refers
to a single trial or plea proceeding."* And: *"A plea proceeding is not complete until the
punishment is assessed, so even if pleas are taken separately, a consolidated punishment hearing
on two separate offenses will cause them to be prosecuted in a single criminal action."* Also:
notice of consolidation is **not** a prerequisite — *"if the offenses were in fact disposed of in a
consolidated punishment hearing, then they were prosecuted in a single criminal action."*

**Where art. 102.073 enters — body text at [\*53]:**

> "The State points to other statutes containing language that parallels Section 3.03—a
> counterpart in the Controlled Substances Act[35] and a court-costs statute prohibiting
> duplicate costs.[36] The State seems to contend that its proposed construction of 3.03 could be
> applied consistently to these other statutes. But the State does not contend that we have
> construed these other statutes in a way that conflicts with how we construe Section 3.03 today.
> And if it turns out that these other statutes must be construed consistent with today's holding,
> the State has not shown that this would give rise to illogical or absurd results.[37]"

**Footnote 36, verbatim:** *"See Tex. Code Crim. Proc. art. 102.073(a) ('In a single criminal
action in which a defendant is convicted of two or more offenses or of multiple counts of the same
offense, the court may assess each court cost or fee only once against the defendant.')."*

**Footnote 37, verbatim — and it cuts both ways, which is why it is quoted whole:**

> "The State does not seem to contend that the language of the court-cost statute could somehow be
> construed to prevent the assessment of costs both at the time adjudication is deferred and at the
> time sentencing occurs (upon adjudication), nor do we think our holding today would require such
> a construction. The State does seem to suggest that our holding today might affect what costs can
> be imposed on sentencing when adjudication and new offenses are combined in the same sentencing
> hearing, but even assuming the State is correct, that result—preventing duplicate costs when two
> cases are resolved in the same proceeding—seems perfectly consistent with the policy reasons
> behind the concurrent sentencing statute. And the cost statute's focus on 'each court cost or
> fee' does not appear to preclude the possibility of assessing any fees unique to adjudicating
> guilt in a deferred-adjudication case, if such fees exist."

**Characterized precisely, because the temptation to overstate is the whole risk here:**

- ✅ **Supportable:** the CCA has **noticed** that art. 102.073(a) uses language parallel to
  § 3.03, has **not disclaimed** a consistent construction, and has said no absurdity was shown
  if one were required.
- ✅ **Supportable:** the CCA's § 3.03 definition of "a single criminal action" is *a single trial
  or plea proceeding*, including a **consolidated punishment hearing** — the exact posture of the
  multi-cause consolidated plea that is entry 4b's live exhibit.
- ❌ **NOT supportable:** that *Middleton* **applies** LaPorte's test to art. 102.073. It does not.
  The connection is the **State's argument**, addressed in a footnote that reasons
  "even assuming," and the Court **expressly reserved** two limits — costs may be assessable both
  at deferral **and** at post-adjudication sentencing, and fees unique to adjudicating guilt are
  not necessarily precluded.

**For entry 31 specifically, note the direction it points.** Entry 31 is the *separate*-actions
proposition resting on art. 102.073's **negative implication**. *Middleton* supplies no support for
the negative implication at all; what it supplies is a well-sourced definition of the *positive*
term, which is entry **4b**'s territory. **A candidate for 31 by way of 4b's boundary, not a
candidate for 31 directly** — and saying so is the finding.

---

## 4. LaPorte IS OVERRULED IN PART — rewritten 2026-08-18

> ⚠ **THIS SECTION WAS REWRITTEN. The original was headed *"LaPorte at 415 IS OVERRULED, LaPorte at
> 414 IS REAFFIRMED"* and instructed "Never cite 415" at §6. Both are wrong, and following them
> would bar counsel from the very sentence stating the rule he wants.** The substance — LaPorte is
> half-overruled — survives.

**THE ACCURATE STATEMENT, in one paragraph.** *LaPorte v. State*, 840 S.W.2d 412, is **overruled in
part**. Its holding that sentences under an improper cumulation order are *"void"* was overruled by
***Ex parte Carter***, 521 S.W.3d 344, 347 (Tex. Crim. App. 2017), **by five votes**, in a
**PLURALITY** opinion. Its definition of *"a single criminal action"* **survives** — reaffirmed in
passing by the *Carter* plurality and, decisively, **adopted and applied by a UNANIMOUS Court in
*Middleton v. State*, 634 S.W.3d 46, 50 & n.11 (Tex. Crim. App. 2021).** Its *"may be raised at any
time"* holding was **NARROWED, not overruled**. The signal later courts use is **"overruled on
other grounds by *Ex parte Carter*."**

**(a) THE PAGES DO NOT SPLIT THE WAY THE ORIGINAL SAID.** The `[*415]` marker falls **before**
LaPorte's holding sentence, so **page 415 carries the reaffirmed definitional holding AND the
overruled void-sentence language, in adjacent paragraphs.** *Carter*'s own footnote pin-cites the
definition to **"840 S.W.2d 412, 414-15"**; *Simmons 2015* uses "414-15"; and ***Whaley v. State***
(Dallas 2020) cites **"840 S.W.2d 412, 415"** for the definition as good law, with the parenthetical
*"overruled on other grounds by Ex parte Carter."* **"Never cite 415" is withdrawn.** Cite **414**
for the compressed *"single trial or plea proceeding"* formulation (as *Middleton* n.11 does);
**414–15** for the full holding. **Page number alone cannot distinguish live law from dead law
here — the parenthetical must do it**, which makes the `FE-16` defect class *harder* than this memo
originally said, not easier.

**(b) THE TWO ACTS ARE NOT SYMMETRICAL, AND THE ORIGINAL NEVER SAID "PLURALITY" HERE.**
*Carter*'s lead opinion is a plurality — *"delivered the **judgment** of the Court and **an**
opinion,"* joined in full by three (Keller, P.J., Hervey, Yeary) and **in part** by Newell.

| Half of LaPorte | Votes | Basis |
|---|---|---|
| Void-sentence holding **OVERRULED** | **5** | Yeary n.1 — *"That makes a majority of five votes to overrule LaPorte"* — **and independently corroborated by Newell's own text:** *"the Court expressly overrules that portion of LaPorte today. **I join these aspects of the Court's opinion.**"* Four full adherents + Newell on this point = 5 of 9 |
| Definition **REAFFIRMED** | **4** | Plurality only. **No fifth vote anywhere**, and the reaffirmation was **unnecessary to the judgment** — *Carter* was decided on non-cognizability and never reached whether a single criminal action existed |

*(The original cited only Yeary's count. Yeary's arithmetic is correct and checkable, but Newell's
own join is the stronger evidence and sat in the same PDF.)*

**(c) "MAY BE RAISED AT ANY TIME" WAS NARROWED, NOT OVERRULED — and the original's bundling of it
runs AGAINST THE CLIENT.** *Carter* treats the two propositions differently in consecutive
paragraphs: it **overrules** the "void" holding, then **separately** concludes that LaPorte's "may
be raised at any time" holding *"does not control an improper-cumulation claim's cognizability **in
the habeas corpus context**."* That is a limitation to one posture. On **direct appeal**, § 3.03
remains a **Marin category-two waiver-only right** and no contemporaneous objection is required —
and courts still cite LaPorte at **415** for exactly that: ***Stiger v. State*** (Tex. App.—
Texarkana Nov. 19, 2024). **A defense attorney reading the original would have concluded an
unpreserved stacking complaint is waived on direct appeal. It is not.**

**(d) *Simmons 2015*'s corroboration is real but NOT CITABLE.** It disavows the same language, by a
**five-judge majority**, two years before *Carter* — but it is marked **DO NOT PUBLISH**, and under
**TRAP 77.3** unpublished CCA opinions *"must not be cited as authority by counsel or by a court."*
**Treat it as confirmation that the Court's thinking had already moved, not as authority. The
citable act is *Carter*.** *(The original disclosed the unpublished status at §3/§5/§6 but not at
§0 or §4, the two places it was used as corroboration.)*

**Why this matters here:**

1. **Entry 4a (=31) lists LaPorte as a candidate authority with NO pinpoint and no parenthetical.**
   That is the defect to fix — not by choosing a page, but by adding **"overruled on other grounds
   by *Ex parte Carter*, 521 S.W.3d 344 (Tex. Crim. App. 2017)."**
2. **The registry's reporter-cite and currency machinery would not have caught this** — the cite is
   valid, the case is real, and **not even the pinpoint separates live from dead law.** Precisely
   the defect class `FE-16` would have to catch.
3. **CR-10 is hard-gated on these entries**, so an entry citing the overruled half would carry into
   a completeness check.
4. **The survival of the definition should rest on *Middleton*, not *Carter*** — unanimous vs.
   4-judge plurality, holding vs. dictum, 2021 vs. 2017, and *Middleton* cites LaPorte with **no
   negative-treatment signal at all**. This memo read *Middleton* and did not deploy it here.

**A second, narrower tension, flagged and not resolved:** *Schmitt* (2012, unpublished) holds a
judgment nunc pro tunc **unavailable** to undo a cumulation order, because the error is judicial
rather than clerical. *Carter* (2017, published) says an improper cumulation order *"may be
remedied by reformation on appeal or, in the proper circumstance, a judgment nunc pro tunc."* The
qualifier is doing real work and should never be quoted without it.

---

## 5. V-9 APPLIED — identity and authorship, opinion by opinion

| Opinion | Published? | Authorship on the face of the copy | V-9 outcome |
|---|---|---|---|
| *Bonilla*, 452 S.W.3d 811 | **PUBLISH** | *"Judges: COCHRAN, J., delivered the opinion of the Court in which KELLER, P.J., and MEYERS, KEASLER and HERVEY, JJ., joined…"*; *"Opinion by: COCHRAN"* | **IDENTIFIED — Cochran, J.** (5-judge majority; Alcala concurring, Price dissenting) |
| *Middleton*, 634 S.W.3d 46 | **PUBLISH** | *"KELLER, P.J., delivered the opinion for a unanimous Court"*; *"Opinion by: KELLER"* | **IDENTIFIED — Keller, P.J.**, unanimous |
| *Williams*, 253 S.W.3d 673 | **PUBLISH** | *"Judges: MEYERS, J., delivered the opinion of the Court…"*; *"Opinion by: MEYERS"* | **IDENTIFIED — Meyers, J.** (Price concurring; Keller, P.J. dissented **without opinion**) |
| *Schmitt*, 2012 Unpub. LEXIS 887 | **DO NOT PUBLISH** | *"Judges: KEASLER, J., delivered the opinion of the Court…"*; *"Opinion by: KEASLER"* | **IDENTIFIED — Keasler, J.** |
| *Ex parte Simmons*, 2015 Unpub. LEXIS 776 | **DO NOT PUBLISH** (×3) | *"Judges: JOHNSON, J., delivered the opinion of the Court…"*; *"Opinion by: JOHNSON"* | **IDENTIFIED — Johnson, J.** (5–4) |
| *Ex parte Bailey*, 2011 Unpub. LEXIS 388 | **DO NOT PUBLISH** | **No `Judges:` line. No `Opinion by:` line. Only *"Per curiam."*** | **⚠ CANNOT IDENTIFY — FLAGGED, NOT STAGED FOR VERIFICATION** |
| *Ex parte Simmons*, 2014 Unpub. LEXIS 501 | **DO NOT PUBLISH** | **No `Judges:` line. No `Opinion by:` line. Only *"Per curiam."*** | **⚠ CANNOT IDENTIFY — FLAGGED, NOT STAGED FOR VERIFICATION** |
| *Ex parte Green*, 457 S.W.3d 90 | **PUBLISH** | **Only *"Dissent by: YEARY, J."*** — what is published at 457 S.W.3d 90 is **the DISSENT ALONE**; the majority is an **unpublished per curiam** (2015 Unpub. LEXIS 246) whose text is **not in this copy** | **⚠ CANNOT IDENTIFY — FLAGGED, NOT STAGED FOR VERIFICATION** |
| *Ex parte Carter*, 521 S.W.3d 344 | **PUBLISH** | *"Judges: KEASLER, J., delivered the **judgment** of the Court and **an** opinion…"* — 4 full joins of 9, **no `Opinion by:` line** | **⚠ NO MAJORITY EXISTS — it is a PLURALITY.** Plurality author identifiable (Keasler, J.); recording him as "majority author" would be **wrong** |

**Four of nine could not be identified as majority-authored — three per curiam, one plurality.**
V-9 was ruled on 2026-08-17 and its floor ("cannot identify — stop") fired four times **hours
later the same evening** *(corrected 2026-08-18 from "the next working pass" / "the day after";
see §0 item 3)*. **Per V-9 these four are flagged and none is staged for verification.**

**Two further copy defects, reported rather than worked around:**

1. **The *Simmons 2015* vendor copy is INCOMPLETE.** Its own `Judges:` line announces that
   *"KEASLER, J., filed a dissenting opinion in which KELLER, P.J., HERVEY, and YEARY, JJ.,
   joined"* — and **the Keasler dissent's text is not in the PDF.** (9 pages; the only `Dissent
   by:` line is Yeary's.) If anything ever turns on Keasler's reasoning, **this copy cannot
   support it and a complete copy is needed.**
2. **The *Green* copy contains no majority text at all**, only Yeary's dissent — so the "holding"
   is knowable from that copy only through the dissent's description of it.

---

## 6. STAGED CANDIDATES — per opinion, nothing selected

**Every item below is a CANDIDATE. None is adopted, none is a cite selection, and the four flagged
opinions above are not staged for verification whatever their content.**

**For the costs entries (30 / 31 / 4b) — the honest tally: one candidate, correctly limited.**

- **`C-MID-1` — *Middleton*, 634 S.W.3d 46, 50 & nn.36–37 at [\*53].** *"The phrase 'a single
  criminal action' refers to a single trial or plea proceeding"* (adopting LaPorte at 414),
  including a **consolidated punishment hearing**; and the CCA has noted art. 102.073(a)'s
  parallel language without construing it or foreclosing consistent construction. **Limit that
  must ride with it:** fn 37 reserves assessment both at deferral and at post-adjudication
  sentencing, and fees unique to adjudicating guilt.
- **`C-LAP-1` — *LaPorte*, 840 S.W.2d at 414–15** *(CORRECTED 2026-08-18; the original read "at
  414 … **Never cite 415**," which is withdrawn — see §4(a))*. The definition itself. **Its
  survival rests best on *Middleton v. State*, 634 S.W.3d 46, 50 & n.11 (Tex. Crim. App. 2021) —
  unanimous, and the definition was necessary to its judgment** — with *Carter*'s reaffirmation as
  plurality corroboration only. **Any cite to LaPorte must carry the parenthetical "overruled on
  other grounds by *Ex parte Carter*, 521 S.W.3d 344 (Tex. Crim. App. 2017)."**
- **NOTHING ELSE.** *Bonilla*, *Williams*, *Schmitt*, *Bailey*, *Carter*, *Green* and both
  *Simmons* contribute **no costs proposition**. That is a clean negative and is the finding.

**For CR-10's adjacent checks and criminal practice generally (candidates, unadopted):**

- **`C-CAR-1` — *Carter*, 521 S.W.3d at 347, 349–50 (PLURALITY; treat accordingly).** A bare
  § 3.03(a) improper-cumulation claim is **not cognizable** on art. 11.07 habeas — record-based
  and available on direct appeal (*Townsend*), and a bare statutory violation. **And:** LaPorte's
  void-sentence holding is overruled (five votes).
- **`C-SIM-1` — *Simmons 2015* (UNPUBLISHED).** Where only the stacking order is defective and the
  sentences are lawful, the remedy is **reformation to delete the cumulation order**, not remand
  for resentencing. *In tension with `C-CAR-1` on cognizability; Carter is later and published.*
- **`C-BON-1` — *Bonilla*, 452 S.W.3d at 819.** An "on or about" pleading date does not fix the
  actual offense date for statutory-consequence purposes. **Possible cross-use** for cost statutes
  keyed to offense dates — **but *Bonilla* says nothing about costs; that is an analogy, not a
  holding.**
- **`C-SCH-1` — *Schmitt* (UNPUBLISHED).** A judgment nunc pro tunc reaches only **clerical**
  error; a cumulation order entered in the exercise of perceived discretion is judicial.
- **`C-BAI-1` — *Bailey* (UNPUBLISHED; ⚠ author unidentifiable).** The four-item remand checklist
  an improper-cumulation habeas record must contain: evidentiary basis for the single-criminal-
  action finding, counsel's response, waiver credibility (*McJunkins*), laches (*Carrio*).
  **Staged as workflow value only — NOT for verification.**
- **`C-WIL-1` — *Williams*, 253 S.W.3d at 678.** Where all convictions are for offenses listed in
  Health & Safety Code § 481.134, § 481.134(h) does not apply and § 481.132(d) requires concurrent
  sentences. **Structural note only:** the CCA has read a "single criminal action" concurrent-
  sentencing provision located **outside the Penal Code** on its own terms — **but *Williams* did
  not construe the phrase**, and must not be cited as authority that it means the same thing
  across codes.
- **`C-GRE-1` — *Green* (⚠ published document is the DISSENT alone).** § 3.03(b)(2)(A) permits
  stacking for § 22.011 offenses only where the victim was under 17. **One judge's dissenting
  view. NOT staged for verification.**

---

## 7. Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-RL6-1` | **Entry 31 (`4a`) cite supply — YOURS, and the read does not select. A FOURTH OPTION WAS ADDED 2026-08-18.** The nine produced **no** authority for art. 102.073's *negative implication*. **Do you want (a) entry 31 to remain cite-less; (b) *Middleton* cited on 4b with 31 resting on the negative implication expressly labelled as inference; (c) `Hurlburt v. State`, 506 S.W.3d 199 (Waco 2016) pulled and read — **NOT in the `Opinions\` folder, not read**; or **(d) NEW — *Whaley v. State* (Tex. App.—Dallas Jan. 21, 2020) pulled and read?** *Whaley* applies **LaPorte's definition and art. 102.073 in one opinion** — *"because the cases were tried in the same proceeding, the court should only have assessed costs for the higher category offense"* — which is the bridge this task was commissioned to look for. **LOCATOR ONLY: not read, not V-9-identified, designation unconfirmed, and it is an intermediate-court opinion rather than a CCA one.** The original offered three options and none of them was "the case you're looking for exists and wasn't in the folder." | **OPEN — your act; option (d) is new** |
| `Q-RL6-2` | **Entry 30 (`[NO CITE CARRIED]` — degree of offense must correspond to punishment assessed) — the nine produced NOTHING for it.** No opinion read addresses degree-of-offense/punishment correspondence. **Do you want a separate targeted search, or does entry 30 stay cite-less?** | **OPEN — your act** |
| `Q-RL6-3` | **REWRITTEN 2026-08-18 — the original asked the wrong remedy.** It proposed pinpointing entry `4a`'s LaPorte candidate line **to 414 and annotating that 415 is overruled.** **That would have been wrong: both halves sit on 415** (§4(a)), so a pinpoint cannot separate them. **The correct remedy is a PARENTHETICAL.** Entry `4a` lists *"LaPorte v. State, 840 S.W.2d 412"* with no pinpoint and no treatment signal. **Do you want the candidate line to read "*LaPorte v. State*, 840 S.W.2d 412, 414–15 (Tex. Crim. App. 1992), overruled on other grounds by *Ex parte Carter*, 521 S.W.3d 344 (Tex. Crim. App. 2017)"** — and do you want *Middleton* added as the current authority for the definition? *(A change to a registry entry's candidate-authority line, ROUTE-C-adjacent — flagged as its own act, never done silently.)* | **OPEN — remedy corrected** |
| `Q-RL6-4` | **Four of the nine are author-unidentifiable under V-9** (*Bailey*, *Simmons 2014*, *Green* — per curiam; *Carter* — plurality, no majority exists). They are flagged and not staged for verification. **Do you want any of them pulled in a form that would identify the majority** — the court's own document, or a paginated copy stating authorship on its face — **or do they stay flagged?** *Carter* may be unresolvable in principle: **there is no majority to identify.** | **OPEN — your hand** |
| `Q-RL6-5` | **REWRITTEN 2026-08-18 — the count was wrong and the constraint was understated.** **FOUR** of the nine are marked "DO NOT PUBLISH" (*Schmitt*, *Bailey*, *Simmons 2014*, *Simmons 2015*), not five. And the constraint is **not** a "citation limit": all nine are **Court of Criminal Appeals** opinions, governed by **TRAP 77, not TRAP 47**, and **TRAP 77.3** provides that unpublished opinions *"have no precedential value **and must not be cited as authority by counsel or by a court.**"* **That is a bar.** It reaches four staged candidates — `C-SIM-1`, `C-SCH-1`, `C-BAI-1` and (as a dissent) `C-GRE-1`. **Do you want a standing rule that no unpublished CCA opinion may support a registry entry at all, or is it judged per entry?** | **OPEN — count and constraint corrected** |
| `Q-RL6-6` | **The *Simmons 2015* vendor copy is incomplete** — it omits the Keasler dissent its own `Judges:` line announces. **Do you want a complete copy obtained**, or is the majority sufficient for any use contemplated? | **OPEN — your hand** |

**Nothing here is verified. No cite was selected. No registry entry was created or changed.**
