# Determining official Texas opinion designations — a source-method research note

**Canonical repo path:** `docs/specs/designation-source-method-research-2026-08-17.md`
**Status: PROPOSED. NO METHOD IS ADOPTED — adoption is Michael's.** Nothing here is verified and
nothing is built. Drafted 2026-08-17 Central (design session, Opus 5, Cowork) under
CHAT-DISPATCH v4 **T-31**, commissioned in Michael's own words at `V-8` §C-3: *"possibly we should
seek another way of determining the official texas designations."*

---

## 1. THE DIAGNOSIS — the question has been asked of the wrong instrument

The premise behind the search for "another way" is that FLP's `precedential_status` is failing.
**It is not failing. It is answering a different question, correctly.**

**Texas has TWO independent designation axes, and the record has been treating them as one.**
Source: **TRAP 47**, read this session from the clean-authority PDF
`Documents\Knowledge Repo\Civil\texas-rules-of-appellate-procedure-02062026.pdf` (the PDF's own
filename carries its 02-06-2026 date; raw `AA` artifact count 0, so the statute-pass normalizer
does not apply here either).

- **AXIS 1 — "Opinion" vs "Memorandum Opinion." Civil AND criminal.** TRAP 47.2(a): *"Each opinion
  of the court must be designated either an 'Opinion' or a 'Memorandum Opinion.'"* The choice is
  made by *"a majority of the justices who participate in considering the case"* — and TRAP 47.4
  makes **memorandum the DEFAULT**: *"An opinion must be designated a memorandum opinion unless it
  does any of the following"* (new/altered rule of law; constitutional or jurisprudentially
  important issues; criticizes existing law; resolves a conflict of authority). TRAP 47.6 lets an
  en banc court change a panel's designation.
- **AXIS 2 — "publish" vs "do not publish." CRIMINAL ONLY.** TRAP 47.2(b): *"each opinion and
  memorandum opinion in a criminal case must bear the notation 'publish' or 'do not publish'"* —
  determined before hand-down by majority of the participating justices.

**And the two axes have different consequences:**

- **Civil, on or after 1 Jan 2003:** TRAP 47.7(b) — a memorandum opinion **has precedential
  value**, and *"[i]f an opinion or memorandum opinion issued on or after that date is erroneously
  designated 'do not publish,' the erroneous designation will not affect the precedential value of
  the decision."* So in modern Texas civil practice **the designation controls citation FORM, not
  authority.**
- **Criminal:** TRAP 47.7(a) — opinions *"not designated for publication … have no precedential
  value but may be cited with the notation, '(not designated for publication).'"* Here the
  notation **does** control authority. *(This is why the T-27 read found five of nine criminal
  opinions stamped "DO NOT PUBLISH" — Axis 2, doing real work.)*

**Therefore:** FLP's `precedential_status` models the **federal** published/unpublished
distinction, which is an authority question. For post-2003 Texas **civil** opinions the answer to
that question is "precedential" **whatever the designation says** — so FLP marking a memorandum
opinion "Published" is not an error. **It is the right answer to a question nobody was asking.**

**No amount of querying FLP will ever yield Axis 1, and the reason is a model mismatch rather than
a data gap.** That is worth stating plainly, because it retires "find better coverage" as a
strategy.

### 1.1 The empirical proof, run this session

FLP/CourtListener, `type=o`, `court=texapp`, `q="memorandum opinion"`:

| Filter | Result count |
|---|---|
| `stat_Unpublished=true`, `stat_Published=false` | **1** |
| `stat_Published=true` | **174,292** |

And the top three of the 174,292 have case names that **begin with the words "Memorandum
Opinion"** — *"Memorandum Opinion DLA Piper US, LLP v. Linegar"*; *"Memorandum Opinion Weeks
Marine, Inc. v. Garza"*; *"Memorandum Opinion City of Denton v. Paper"* — every one returned with
`status: "Published"`.

**A document whose own title says "Memorandum Opinion," returned as "Published," 174,292 to 1.**
Ruled hazard **0.1.6** is confirmed empirically rather than by assertion, and the ratio shows it is
systematic rather than a sampling artifact.

**A second FLP hazard, seen repeatedly today and worth its own line:** FLP frequently carries
**multiple clusters for one Texas opinion.** *W.W. Collins, Jr. v. Kappa Sigma Fraternity*
(02-09-00305-CV, 22 Apr 2010) returns **three** clusters, identical caption, date and docket. The
*Franklin Ctr.* and *Kona Coast* leads at T-28 each returned **two**. This is the same hazard V-9
was written for, and it compounds the designation problem: a cluster ID does not reliably resolve
to *the* opinion, let alone to its designation.

---

## 2. WHERE THE ANSWER ACTUALLY LIVES

**On the face of the opinion, put there by the court, at hand-down.** TRAP 47.2(a) requires the
designation to be *on* the opinion; there is no separate register to consult. Any "source" for the
designation is therefore a source *for the document*, and the designation is read off it.

This has a consequence worth naming: **there is no such thing as a designation lookup that is
cheaper than obtaining the document.** Every candidate below is really a document-acquisition
channel, and they differ in authority, coverage, and whether a machine may touch them.

**A useful side-finding for V-9:** the same TRAP 47.2(a) provides that *"[t]he names of the
participating justices must be noted on all written opinions or orders of the court or a panel of
the court."* So for Texas courts of appeals, **the court's own document should always name the
participating justices** — which means V-9's first fallback is, by rule, available for every COA
opinion obtained in the court's own form. It does not follow that the *author* is always named
(per curiam opinions name none), but the panel always is.

---

## 3. CANDIDATE SOURCES — evaluated, each named, none adopted

**Method note, stated because it limits §3.** Per the absolute standing instruction that **TAMES
blocks automated retrieval and no workaround fetching is permitted**, this session **attempted no
fetch against TAMES or against any `txcourts.gov` page.** The assessments of rows A and B below are
reasoned from their known properties and from TRAP 47, **not** from a retrieval this session
performed, and they are flagged accordingly. Rows C–E rest on evidence in hand.

| # | Source | Authority for the designation | Coverage | Machine-usable? |
|---|---|---|---|---|
| **A** | **The court's own opinion PDF**, from that court of appeals' opinion-release page | **HIGHEST — the designation is printed on it by the court, per TRAP 47.2(a). This is the thing itself.** | Complete for that court, generally back some years | **Case-by-case only.** Not attempted this session; assess before relying |
| **B** | **TAMES** (the Texas appellate case-management system) | **HIGHEST — official docket of record** | Complete, all 15 COAs + CCA + SCOTX | **NO — blocked, absolutely. Manual use by Michael only. No automated retrieval, ever** |
| **C** | **FLP / CourtListener** | **NONE for Axis 1.** `precedential_status` cannot express it — §1.1 | Broad but with citation-ingestion lag and **multi-cluster duplicates** | Yes, and free — but **not for this question** |
| **D** | **Justia and similar free vendor renderings** | **LOW–MODERATE, and honestly stated: they typically reproduce the opinion PDF, so the designation is visible *if the reproduction is faithful*. The vendor's own metadata is editorial and is not authority.** Read the *document*, never the vendor's label | Broad for recent years | Fetchable in principle; **evidence value depends entirely on faithfulness of reproduction**, which must be spot-checked per item |
| **E** | **Michael's vendor subscriptions (Lexis / Westlaw)** | **HIGHEST PRACTICAL — and this is the finding of §3.** Both vendors carry the designation in the citation parenthetical as standard editorial practice, and both reproduce the opinion's own face | Complete and current | **Michael's hand only.** *(And note the registry-discipline clarification of 2026-08-17: a vendor's AI assistant is a MODEL — a locator, never authority. This row means the vendor's paginated document, not its chatbot.)* |
| **F** | **The clerk of the court** | **HIGHEST — definitive** | Complete | **No. Per-case, by hand, slow. The backstop, not the method** |

---

## 4. WHAT THIS SUGGESTS — options, not a recommendation adopted

**Option 1 — RETIRE THE QUESTION FOR CIVIL MATTERS.** Per TRAP 47.7(b), a post-2003 Texas civil
memorandum opinion **has precedential value**. If the registry's need is *"may I rely on this,"*
the designation is **irrelevant** in civil cases and the effort is misallocated. The designation
would then matter only for **citation form** (the Greenbook "(mem. op.)" parenthetical), which is a
drafting concern, not a registry-authority concern. **Cheapest option by a wide margin.**

**Option 2 — SPLIT THE FIELD IN TWO, matching the two axes.** Record `designation` (Opinion /
Memorandum Opinion / unknown) separately from `precedential` (yes / no / unknown), instead of one
field trying to be both. Criminal entries then carry Axis 2 — where "do not publish" genuinely
destroys precedential value — and civil entries carry Axis 1 for form only. **This is a data-model
change and is a design act, not a research finding.**

**Option 3 — SOURCE OF RECORD = the opinion document itself, per entry.** Adopt row A/E as the
only acceptable sources, record the designation **only** when a copy stating it on its face has
been read, and leave it **"unknown"** otherwise — the same shape V-9 gives majority identification,
and consistent with the existing "cannot identify — stop" floor.

**Not recommended, and named so it is not proposed later:** deriving the designation from FLP,
from a vendor's metadata label, or from any AI assistant's assertion. §1.1 disposes of the first;
the registry-discipline rule disposes of the third; and the second is a label about a document
rather than the document.

---

## 5. Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-DES-1` | **Is the designation needed at all for civil entries?** TRAP 47.7(b) gives post-2003 civil memorandum opinions full precedential value, so the designation affects citation FORM only. **Do you want it tracked for civil entries anyway (drafting correctness), or dropped there and kept only for criminal entries, where "do not publish" actually destroys precedential value?** | **OPEN** |
| `Q-DES-2` | **Option 2 — split `designation` from `precedential` into two fields?** The record currently has one notion doing two jobs, which is what produced hazard 0.1.6. **This is a data-model act and is yours.** | **OPEN** |
| `Q-DES-3` | **Adopt a source of record?** Proposed: the opinion document itself, from the court's own release page or your Lexis/Westlaw copy — designation recorded **only** from a copy stating it on its face, "unknown" otherwise. **Adopt, reject, or edit.** | **OPEN** |
| `Q-DES-4` | **Row A was NOT tested.** No fetch was attempted against any `txcourts.gov` page, per the absolute no-workaround rule around TAMES. **Do you want a court opinion-release page assessed as a retrieval candidate** — and if so, does the TAMES bar extend to the courts' public opinion pages on the same domain, or stop at the TAMES search interface? **That boundary is yours and this session did not assume it.** | **OPEN — needs your ruling before any test** |
| `Q-DES-5` | **The FLP multi-cluster hazard is broader than designations** (three clusters for one *Collins* opinion; two each for *Franklin Ctr.* and *Kona Coast*). **Do you want this recorded as a standing FLP caveat** alongside the `precedential_status` hazard at §0.1, since it bears on every FLP retrieval and not just this question? | **OPEN** |

**No method is adopted. Nothing is verified. Nothing is built.**
