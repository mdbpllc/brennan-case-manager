# Determining official Texas opinion designations — a source-method research note

**Canonical repo path:** `docs/specs/designation-source-method-research-2026-08-17.md`
**Status: PROPOSED. NO METHOD IS ADOPTED — adoption is Michael's.** Nothing here is verified and
nothing is built. Drafted 2026-08-17 Central (design session, Opus 5, Cowork) under
CHAT-DISPATCH v4 **T-31**, commissioned in Michael's own words at `V-8` §C-3: *"possibly we should
seek another way of determining the official texas designations."*

> ## ⚠ CORRECTED IN PLACE 2026-08-18 — READ THIS FIRST
> This memo was audited adversarially on 2026-08-18 and **seven findings were confirmed defects,
> including its headline measurement, which had NO CONTROL ARM and collapses when the control is
> run.** Corrections are made in place and each is recorded at session-log **`#103`**. The original
> text stands in the repo history at commit `a25c484`. **The memo's practical conclusions largely
> survive; its stated evidence for them did not.**

---

## 1. THE DIAGNOSIS — the question has been asked of the wrong instrument

The premise behind the search for "another way" is that FLP's `precedential_status` is failing.
**The accurate statement is narrower than the one this memo originally made:** no
`precedential_status` value exists for the Texas Opinion/Memorandum-Opinion designation, **and** on
`texapp` the field is not reliably populated for the one axis it could express.

> *Corrected. The original read: "**It is not failing. It is answering a different question,
> correctly.**" That exculpation was reached without consulting FLP's documentation of the field
> and without testing the criminal limb — and it is refuted at §1.2.*

**Texas has TWO independent designation axes, and the record has been treating them as one.**
Source: **TRAP 47**, read from the clean-authority PDF
`Documents\Knowledge Repo\Civil\texas-rules-of-appellate-procedure-02062026.pdf`, whose **title
page states its own currency: "Updated with Amendments Effective February 6, 2026."**

> *Corrected. The original cited the PDF's **filename** as its currency designation, importing the
> `WP-1/2/3` caveat from the TRCP PDF — which genuinely needs it, having no such line — into a
> document that states its currency on its face. SOURCING requires the source's own statement
> where one exists.* Raw `AA` artifact count 0, so the statute-pass normalizer does not apply here.

### ⚠ 1.0 SCOPE — TRAP 47 GOVERNS THE COURTS OF APPEALS. THE CCA IS GOVERNED BY TRAP 77.

**This is the correction with the most practical reach, and the original memo did not make it.**
TRAP 47.1 opens: *"**The court of appeals** must hand down a written opinion…"*. The Court of
Criminal Appeals is governed by **TRAP 77**, which sits immediately before Rule 78, *"Judgments in
the Court of Criminal Appeals."* Verbatim from the same PDF:

> **77.3. Unpublished Opinions** — *"Unpublished opinions have no precedential value **and must not
> be cited as authority by counsel or by a court.**"*

Three consequences:

1. **All nine opinions in the T-27 read are Court of Criminal Appeals opinions.** Their "DO NOT
   PUBLISH" stamps are **TRAP 77.2's** doing, not 47.2(b)'s.
2. **The consequence is a BAR, not a limit.** The original memo stated it as 47.7(a) — *"may be
   cited with the notation, '(not designated for publication)'"* — which is the **courts of
   appeals** rule and **understates the restriction in the permissive direction.** For CCA
   opinions, 77.3 forbids citation as authority outright.
3. **The CCA has no memorandum-opinion axis at all.** "Axis 1 — civil AND criminal" is true
   *within the courts of appeals*; it does not describe the CCA.

**This changes `Q-RL6-5` in the T-27 memo, which asked about a "citation limit."** It is a bar, and
four candidates staged there rest on opinions that cannot be cited as authority.

### 1.1 The two axes, within the courts of appeals

- **AXIS 1 — "Opinion" vs "Memorandum Opinion."** TRAP 47.2(a): *"Each opinion of the court must be
  designated either an 'Opinion' or a 'Memorandum Opinion.'"* Determined by *"a majority of the
  justices who participate in considering the case."* **TRAP 47.4 makes memorandum the DEFAULT** —
  *"An opinion must be designated a memorandum opinion unless it does any of the following"* (new
  or altered rule of law; constitutional or jurisprudentially important issues; criticizes existing
  law; resolves a conflict of authority) — **subject to a constraint the original memo omitted:**
  an opinion *"may not be designated a memorandum opinion if the author of a concurrence"* or
  dissent opposes that designation. TRAP 47.6 lets an en banc court change a panel's designation.
- **AXIS 2 — "publish" vs "do not publish," criminal only.** TRAP 47.2(b): *"each opinion and
  memorandum opinion in a criminal case must bear the notation 'publish' or 'do not publish'"* —
  fixed before hand-down by a majority of the participating justices.

**The two axes have different consequences.** In **civil** cases on or after 1 Jan 2003, TRAP
47.7(b) provides that a pre-2003 "do not publish" designation destroys precedential value, and that
a post-2003 **erroneous** "do not publish" designation *"will not affect the precedential value of
the decision."* In **criminal** cases in the courts of appeals, 47.7(a) provides that opinions not
designated for publication *"have no precedential value but may be cited with the notation."*

> ⚠ *Corrected, and the correction matters for §4's Option 1.* The original memo said TRAP 47.7(b)
> gives post-2003 civil memorandum opinions **"full precedential value."** **The phrase "full
> precedential" appears ZERO times in the TRAP PDF, and 47.7(b) does not affirmatively confer
> precedential value at all** — it is entirely negative and preservative. The affirmative
> proposition (*"…cases issued after the 2003 amendment have precedential value"*) sits in an
> **amendment comment to Rule 47, not in the rule.** **The comment's exact year could not be
> resolved from this two-column extraction and should be confirmed from the PDF page before the
> proposition is relied on.** This memo elsewhere praises exactly this discipline — the WS-3 memo's
> *"no located case says it in those terms"* — and did not apply it here.

### 1.2 THE MEASUREMENT — RETRACTED. It had no control arm, and the control voids it.

**The original headline read:**

> ~~FLP/CourtListener, `type=o`, `court=texapp`, `q="memorandum opinion"`: `stat_Unpublished` → **1**;
> `stat_Published` → **174,292**. A document whose own title says "Memorandum Opinion," returned as
> "Published," **174,292 to 1**. Ruled hazard 0.1.6 is confirmed empirically rather than by
> assertion, and the ratio shows it is systematic rather than a sampling artifact.~~

**RETRACTED. Re-run 2026-08-18, with the control the original never ran:**

| query | Unpublished | Published |
|---|---|---|
| `court=texapp`, `q="memorandum opinion"` | **1** | ~165,570 *(originally recorded as 174,292; does not reproduce)* |
| `court=texapp`, **no `q` at all** | **1** | ~495,559 |

**Removing the search phrase entirely leaves the denominator unchanged at 1 — the same single
record** (*Progressive Child Care Systems … v. Kids 'R' Kids International*, `opinion_id 2852841`).
**CourtListener's entire Texas Court of Appeals corpus contains exactly one opinion marked
"Unpublished."** The phrase query therefore did no work. The ratio is not a fact about memorandum
opinions; it is a fact about FLP's ingestion of `texapp` as a whole, and it would come out the same
for any subset — **including subsets that are definitionally not memorandum opinions.** The
original's *"the ratio shows it is systematic rather than a sampling artifact"* inverts the correct
reading: it is systematic **about the corpus**, and a one-armed design cannot tell the two apart.

**The "top three" observation is also retracted as evidence.** The three records are real and
reproduce exactly — but (a) CourtListener's default ordering is `score desc`, so caption-field
matches rank first **by construction**, making "the top three" the least informative possible
sample; and (b) the document's own title is *DLA Piper US, LLP v. Linegar* — **"Memorandum Opinion"
is an opinion header that FLP's scraper absorbed into the `caseName` field.** That is a *different*
FLP hazard, worth recording on its own, and it is not evidence about `precedential_status`.

**What CAN be said, and it is enough:** `precedential_status` has **no value** expressing Axis 1
(established from FLP's documented choices, not from a count), and on `texapp` it is a near-constant
that does not express Axis 2 either. **Both statements are established without the retracted
measurement.**

### 1.3 The field is documented, and measured against its own subject it is wrong at scale

CourtListener documents `precedential_status` with display names **`Published` → "Precedential"**
and **`Unpublished` → "Non-Precedential"**, plus an **`Unknown` → "Unknown Status"** value. So the
field's declared subject *is* precedential authority — which is why the original's "answering a
different question, correctly" does not hold. In the one class where the memo agrees authority
turns on the notation, the audit found **≈37,152 `texapp` opinions whose text carries the court's
own "Do not publish. Tex. R. App. P. 47.2(b)." notation, all marked `Published`.**

**Therefore the diagnosis is corrected too.** The original said the failure is *"a model mismatch
rather than a data gap,"* and used that to retire "find better coverage" as a strategy. **Half of
that is backwards:** Axis 1 is genuinely outside the field's model (no such value exists), but the
vocabulary *does* contain `Unpublished` and `Unknown` and the `texapp` data uses neither — **which
is a data gap, and a data gap does not license retiring the search.**

### 1.4 A second FLP hazard, and this one survives intact

FLP frequently carries **multiple clusters for one Texas opinion.** *W.W. Collins, Jr. v. Kappa
Sigma Fraternity* (02-09-00305-CV, 22 Apr 2010) returns **three** clusters — identical caption,
date and docket, all "Published." *Franklin Ctr.* and *Kona Coast* each returned **two**, and the
audit found **two clusters for *In re ExxonMobil* itself**, a load-bearing case in the WS-3 memo.
This is the hazard V-9 was written for, and it compounds the designation problem: a cluster ID does
not reliably resolve to *the* opinion. *(The word "frequently" is a frequency claim from a handful
of exhibits; the observation is confirmed, the frequency is not measured.)*

---

## 2. WHERE THE ANSWER ACTUALLY LIVES

**On the face of the opinion, put there by the court, at hand-down.** TRAP 47.2(a) requires each
opinion to *be designated*, and the designation appears on the document.

> *Corrected. The original added two categorical sentences — "**there is no separate register to
> consult**" and "**there is no such thing as a designation lookup that is cheaper than obtaining
> the document**" — which §3 contradicts one section later: TAMES is rated "the official docket of
> record" covering every court, and vendor citation parentheticals report the designation. Both are
> registers, and both are cheaper than obtaining the document.*

**The accurate framing:** the designation is made by the court and appears on the opinion.
Secondary registers exist — TAMES, and vendor citation parentheticals — but **each is a report
*about* the document, and its reliability is a separate question from the document's own face.**

**A useful side-finding for V-9, which survives:** TRAP 47.2(a) also provides that *"[t]he names of
the participating justices must be noted on all written opinions or orders of the court or a panel
of the court."* So for Texas **courts of appeals**, the court's own document should always name the
participating justices — V-9's first fallback is, by rule, available for every COA opinion obtained
in the court's own form. The *author* is not always named (per curiam opinions name none), but the
panel is. **Note this does not extend to the CCA, which TRAP 77 governs.**

---

## 3. CANDIDATE SOURCES — evaluated, each named, none adopted

**Method note.** Per the absolute standing instruction that **TAMES blocks automated retrieval and
no workaround fetching is permitted**, this session **attempted no fetch against TAMES or against
any `txcourts.gov` page.**

> ⚠ *Corrected. The original said "Rows C–E rest on evidence in hand." **Only row C does.*** Rows
> D and E were **not retrieved either** — row E asserts the editorial practice of two paywalled
> commercial products that were never examined, and row D asserts that free vendors "typically
> reproduce the opinion PDF" on no fetch at all. The original then elevated the unretrieved row E
> to *"the finding of §3."* **A finding whose sole support is an untested assumption about a
> third-party product is exactly what the flagging convention exists to prevent.**

| # | Source | Authority for the designation | Coverage | Machine-usable? |
|---|---|---|---|---|
| **A** | **The court's own opinion PDF**, from that court's opinion-release page | **HIGHEST — the designation is printed on it by the court. This is the thing itself.** | Complete for that court | **Case-by-case only. NOT TESTED this session** |
| **B** | **TAMES** | **HIGHEST — official docket of record** | Complete, all 15 COAs + CCA + SCOTX | **NO — blocked, absolutely. Michael's hand only. NOT TESTED** |
| **C** | **FLP / CourtListener** | **NONE for Axis 1** (no such value exists); **unreliable for Axis 2 on `texapp`** — §1.2, §1.3 | Broad; citation-ingestion lag; **multi-cluster duplicates**; caption-field scraping artifacts | Yes and free — **but not for this question.** *The only row resting on evidence in hand* |
| **D** | **Justia and similar free vendor renderings** | **UNTESTED.** *Expectation* is that they reproduce the opinion PDF so the designation is visible — **not verified this session.** Vendor metadata is editorial and is never authority | Broad for recent years | Fetchable in principle; **faithfulness must be spot-checked per item before any reliance** |
| **E** | **Michael's vendor subscriptions (Lexis / Westlaw)** | **MOST PROMISING ON EXPECTATION, UNTESTED.** The expectation is that both carry the designation in the citation parenthetical and reproduce the opinion's face. **No vendor material was examined.** Confirming the parenthetical practice is Michael's | Complete and current | **Michael's hand only.** *(A vendor's AI assistant is a MODEL — a locator, never authority. This row means the paginated document, not the chatbot.)* |
| **F** | **The clerk of the court** | **HIGHEST — definitive** | Complete | **No. Per-case, by hand, slow. The backstop, not the method. NOT TESTED** |

---

## 4. WHAT THIS SUGGESTS — options, not a recommendation adopted

**Option 1 — NARROW THE QUESTION FOR CIVIL MATTERS.** If the registry's need is *"may I rely on
this,"* the designation may be irrelevant for post-2003 civil courts-of-appeals opinions, leaving
it to matter only for **citation form** (the Greenbook "(mem. op.)" parenthetical).

> ⚠ *Corrected. The original asserted this on TRAP 47.7(b) giving "full precedential value," which
> the rule does not say (§1.1), and closed with "**Cheapest option by a wide margin**" — a cost
> claim with no cost model, no comparison and no unit of cost anywhere in the memo. **Both are
> withdrawn.** The option stands or falls on the amendment comment, whose year is unconfirmed.*

**Option 2 — SPLIT THE FIELD IN TWO, matching the two axes.** Record `designation` (Opinion /
Memorandum Opinion / unknown) separately from `precedential` (yes / no / unknown). **A data-model
change and a design act, not a research finding.**

**Option 3 — SOURCE OF RECORD = the opinion document itself, per entry.** Record the designation
**only** from a copy stating it on its face, "unknown" otherwise — the shape V-9 gives majority
identification, consistent with the "cannot identify — stop" floor.

**Not recommended, and named so it is not proposed later:** deriving the designation from FLP's
`precedential_status`, from a vendor's metadata label, or from any AI assistant's assertion.

---

## 5. Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-DES-1` | **Is the designation needed at all for civil entries?** **REPHRASED after correction:** TRAP 47.7(b) does **not** confer precedential value; it destroys it for pre-2003 "do not publish" designations and immunises post-2003 decisions against an *erroneous* one. The affirmative proposition is in an **amendment comment**, whose year is unconfirmed. **On that footing — do you want the designation tracked for civil entries (drafting correctness), or dropped there and kept only where publication actually controls authority?** | **OPEN — premise corrected** |
| `Q-DES-2` | **Split `designation` from `precedential` into two fields?** A data-model act and yours. | **OPEN** |
| `Q-DES-3` | **Adopt a source of record?** Proposed: the opinion document itself — designation recorded only from a copy stating it on its face, "unknown" otherwise. | **OPEN** |
| `Q-DES-4` | **Rows A, B, D, E and F were NOT tested.** No fetch was attempted against TAMES or any `txcourts.gov` page, and no vendor material was examined. **Do you want a court opinion-release page assessed as a retrieval candidate — and does the TAMES bar extend to the courts' public opinion pages on the same domain, or stop at the TAMES search interface?** The boundary is yours and was not assumed. | **OPEN — needed before any test** |
| `Q-DES-5` | **Record FLP multi-cluster duplication as a standing caveat** alongside the `precedential_status` hazard at §0.1? It bears on every FLP retrieval — including *In re ExxonMobil*, a load-bearing case in the WS-3 memo. | **OPEN** |
| `Q-DES-6` | **NEW, from the 2026-08-18 audit.** **TRAP 77, not TRAP 47, governs the Court of Criminal Appeals**, and 77.3 provides that unpublished opinions *"must not be cited as authority by counsel or by a court."* **Do you want a registry rule that no CCA opinion marked "do not publish" may support an entry at all** — which would reach four of the candidates staged at T-27 — **or is that judged per entry?** *(This supersedes the "citation limit" framing in `Q-RL6-5`.)* | **OPEN** |
| `Q-DES-7` | **NEW.** FLP's caption-field scraping artifact — opinion headers absorbed into `caseName` (e.g. *"Memorandum Opinion DLA Piper US, LLP v. Linegar"*). **Record as a standing FLP caveat?** It is a distinct hazard from both `precedential_status` and cluster multiplicity. | **OPEN** |

**No method is adopted. Nothing is verified. Nothing is built.**
