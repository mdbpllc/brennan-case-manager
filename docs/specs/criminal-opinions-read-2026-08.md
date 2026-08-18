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

---

## 0. THE HEADLINE, IN FOUR LINES

1. **THE ENTRY-31 BRIDGE IS NOT BUILT BY ANY OF THE NINE — but one comes close and it is
   *Middleton*.** Eight of the nine never mention art. 102.073 at all. *Middleton v. State*, 634
   S.W.3d 46, quotes art. 102.073(a) in **footnote 36** and discusses it in **footnote 37**, both
   at **[\*53]** — but as the **State's** parallel-statute argument, answered hypothetically
   ("even assuming the State is correct") and expressly **not decided.** §3.
2. **A SUPERSESSION NOBODY FLAGGED: LaPorte's "void sentence" holding at 840 S.W.2d 415 IS
   OVERRULED.** *Ex parte Carter*, 521 S.W.3d 344, 347 (2017) overrules it — with **five votes**,
   stated on the face of the copy. *Ex parte Simmons* (2015) independently disavows the same
   language. **LaPorte's *definitional* holding at 414 survives and is expressly reaffirmed.**
   Entry 4a (=31) carries LaPorte as a candidate authority; **which half is cited now matters.** §4.
3. **V-9 FIRED ON FOUR OF THE NINE, THE DAY AFTER IT WAS RULED.** Three are per curiam with no
   author and no panel on the face of the copy; a fourth has **no majority opinion at all** — it
   is a plurality. Under V-9 these are **flagged and NOT staged for verification.** §5.
4. **FIVE OF THE NINE ARE MARKED "DO NOT PUBLISH."** §5.

---

## 1. Method, named per QR-6(a)

- **Source:** the nine PDFs in `Documents\Knowledge Repo\Opinions\`, on Michael's per-path grant
  (H5 — only the named folder was listed; a sibling `PI\` subfolder was **not** opened).
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
MCCORMICK"* and *"Judges: En Banc. McCormick"* — V-9 satisfied). Its operative holding, verbatim
at 414–15:

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
In *Bonilla*, *Williams*, *Schmitt*, *Green* and *Simmons 2014* the phrase appears only inside
quoted statutory text or descriptive recitals, and the LaPorte cites are overwhelmingly to page
**415** — the *void-sentence* holding — not to page **414** where the definition lives. *Williams*
(2008) predates art. 102.073's enactment, so its silence carries no interpretive weight.

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

## 4. THE SUPERSESSION — LaPorte at 415 IS OVERRULED, LaPorte at 414 IS REAFFIRMED

This was not asked for and is the most consequential thing the read turned up.

***Ex parte Carter***, 521 S.W.3d 344, 347 (Tex. Crim. App. 2017), **published**, verbatim:

> "While we reaffirm LaPorte's statutory interpretation of 'a single criminal action,' we overrule
> the opinion's holding that sentences subject to an improper cumulation order are themselves
> 'void.' LaPorte arrived at this conclusion by mistakenly conflating the sentences with the
> cumulation order."

**The vote is stated on the face of the copy** — Yeary, J., concurring, n.1: *"Although Judge
Newell does not expressly join all of the plurality's opinion, he does expressly join in its
overruling of LaPorte. … **That makes a majority of five votes to overrule LaPorte.**"*

***Ex parte Simmons*** (2015) reaches the same place independently: *"we disavow the language in
LaPorte that holds that the sentences were void. The sentences were lawfully assessed within the
statutory limits and were neither void nor voidable."*

**Why this matters here, in three places:**

1. **Entry 4a (=31) lists LaPorte as a candidate authority without distinguishing its two
   holdings.** Cited at **414** for the definition, LaPorte is good and expressly reaffirmed.
   Cited at **415** for "void sentence / may be raised at any time," it is **overruled.**
2. **The registry's reporter-cite and currency machinery would not have caught this** — the cite
   is valid, the case is real, and only the *pinpoint* distinguishes live law from overruled law.
   This is precisely the defect class `FE-16` would have to catch.
3. **CR-10 is hard-gated on these entries**, so an entry citing the overruled half would carry
   into a completeness check.

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
V-9 was ruled on 2026-08-17 and its floor ("cannot identify — stop") fired four times the next
working pass. **Per V-9 these four are flagged and none is staged for verification.**

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
- **`C-LAP-1` — *LaPorte*, 840 S.W.2d at 414.** The definition itself, **expressly reaffirmed by
  *Carter*** in 2017. **Never cite 415.**
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
| `Q-RL6-1` | **Entry 31 (`4a`) cite supply — YOURS, and the read does not select.** The nine produced **no** authority for art. 102.073's *negative implication* (that separate criminal actions mean per-cause costs). The only costs-adjacent candidate is `C-MID-1`, and it bears on the **positive** term (entry `4b`), not the negative implication. **Do you want (a) entry 31 to remain cite-less; (b) *Middleton* cited on 4b with 31 resting on the negative implication expressly labelled as inference; or (c) `Hurlburt v. State`, 506 S.W.3d 199 (Waco 2016) — the remaining recorded candidate — pulled and read? *Hurlburt is NOT in the `Opinions\` folder and was not read.*** | **OPEN — your act** |
| `Q-RL6-2` | **Entry 30 (`[NO CITE CARRIED]` — degree of offense must correspond to punishment assessed) — the nine produced NOTHING for it.** No opinion read addresses degree-of-offense/punishment correspondence. **Do you want a separate targeted search, or does entry 30 stay cite-less?** | **OPEN — your act** |
| `Q-RL6-3` | **THE SUPERSESSION, and it needs a ruling rather than a note.** LaPorte's void-sentence holding at **840 S.W.2d 415** is **overruled** by *Ex parte Carter* (five votes) and disavowed by *Simmons 2015*; its definition at **414** is expressly reaffirmed. Entry `4a` lists "LaPorte v. State, 840 S.W.2d 412" as a candidate **with no pinpoint.** **Do you want the candidate line pinpointed to 414 and annotated that 415 is overruled?** *(This is a change to a registry entry's candidate-authority line and is therefore ROUTE-C-adjacent — flagged as its own act, never done silently.)* | **OPEN** |
| `Q-RL6-4` | **Four of the nine are author-unidentifiable under V-9** (*Bailey*, *Simmons 2014*, *Green* — per curiam; *Carter* — plurality, no majority exists). They are flagged and not staged for verification. **Do you want any of them pulled in a form that would identify the majority** — the court's own document, or a paginated copy stating authorship on its face — **or do they stay flagged?** *Carter* may be unresolvable in principle: **there is no majority to identify.** | **OPEN — your hand** |
| `Q-RL6-5` | **Five of the nine are marked "DO NOT PUBLISH."** Registry entries built on unpublished CCA opinions carry a citation limit under the appellate rules. **Do you want a standing rule on whether unpublished opinions may support a registry entry at all**, or is that judged per entry? | **OPEN** |
| `Q-RL6-6` | **The *Simmons 2015* vendor copy is incomplete** — it omits the Keasler dissent its own `Judges:` line announces. **Do you want a complete copy obtained**, or is the majority sufficient for any use contemplated? | **OPEN — your hand** |

**Nothing here is verified. No cite was selected. No registry entry was created or changed.**
