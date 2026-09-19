# PF-1 PREFLIGHT REPORT — the `#157` Dorsaneo corrections ruling sheet (2026-09-18)

**Status:** EVIDENCE (`CAP-2`). **Canonical repo path:** `docs/record/dorsaneo-corrections-ruling-sheet-2026-09-18/pf1-preflight-report-2026-09-18.md`. Written 2026-09-18 (Central, DT-1) by the Opus 5 design session in Cowork that prepared the sheet (CHAT-DISPATCH v6, Task 2). **Why PF-1 fired:** the sheet carries legal characterizations of the Texas Rules of Civil Procedure and proposes wording for two VERIFIED registry entries, which is the trigger ruled at `#105`.

## The evidence base the fleet read (read-only, a snapshot)
- **The rule source.** `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` was staged into the cloud container from Michael's machine. On arrival it measured 1,764,663 B with sha256 `5428d16d…d370d3d3`, identical to the on-device read. It was extracted with `pdftotext -enc UTF-8 -layout` to 999,517 B, the same byte count as the on-device extraction.
- **The repo files** were staged from HEAD `4940ed3`:
  - `BUILD-STATE.md`
  - `attorney-review-queue.md`
  - `legal-rule-registry-discovery-and-carrier-duties.md`
  - `trcp-deadline-skeleton-2026-03-01.md`
  - `deadline-engine-service-and-response-2026-08-14.md`
  - `deadline-engine-spec.md`
  - `fe-5-interrogatory-budget-spec-2026-08-15.md`
  - `docs/record/dorsaneo-pass-2026-09-13/dorsaneo-assessment-2026-09-13.md`

  `legal-rule-registry-discovery-enforcement-and-pleading.md` was **not** staged, and one lane says so.
- **Not staged, by design:** the Dorsaneo Guide was never opened or staged. The fleet read no treatise text.

## The fleet, four lanes plus two re-sweeps, every one of which RETURNED CONTENT
The dead-fleet check (`#104`) passed: each agent returned a substantive findings list, and none returned an empty or zero-token result.

| Lane | Scope | Result |
|---|---|---|
| (i) Quotations | every quoted span against the raw extraction and the repo files | 60 checked · 43 EXACT · 15 MINOR · **2 MISMATCH** |
| (ii) Characterizations | every non-quoted claim about what a rule says, hunting overstatement; the date arithmetic | **1 HIGH** · 7 MEDIUM · 12 LOW; every verbatim quote and every date correct |
| (iii) Repo facts | every claim about the register, registry, skeleton, memo, spec, BUILD-STATE | 52 checked · 39 SOUND · **5 WRONG · 8 UNSUPPORTED** |
| (iv) Client data and licensed text | names, dates and places; any treatise prose | **PASS**, 3 LOW; no real client data; no treatise prose |
| RE-SWEEP 1 | every passage the fixes touched | 45 checked · 37 SOUND · **8 DEFECT** |
| RE-SWEEP 2 | the eight re-fixed passages | 8 checked · 6 SOUND · **2 DEFECT (minor)** → fixed |

## What the fleet found, and what was done (the substance, not every line)

1. **Mismatched quotations (lanes i, iii, iv).**
   - A quote attributed to `deadline-engine-spec.md` §8.2 as *"IN DOUBT … THE HIGHEST-VALUE VERIFICATION TARGET."* is not in the spec. "IN DOUBT" is BUILD-STATE's word. **Fixed:** the spec's own words are quoted, and BUILD-STATE's bullet is quoted separately and whole.
   - `Q-FE5-9`'s second question was cut before *"before the engine is authorized"*. **Fixed.**
2. **HIGH (lane ii): the sheet leaned on unread case law.** The Rule 4 backward-count bullet said *"The Guide reports authority rejecting it,"* which gives the direction of case law nobody read. **Fixed:** the sheet now says only that `#157` records the Guide cites authority on the question, that the authority is neither named nor characterized, and that it is a locator. The closing section was conformed to match.
3. **Overstatements.** Each was fixed on the sheet.
   - **"Resolved" / "settled".** The `#157` assessment itself says *"One read of one PDF does not *resolve* a doubt."* The P-2 note and the §8.2 add-only line now read *"on the July 2026 PDF's text (currency not established)"*. The note states the 21a(b)(1) origin of the doubt as `#157`'s reading, not as fact.
   - **21a(e)** was paraphrased as mail-only. Its first limb covers any method.
   - **"Flat 30 days"** would have entered the skeleton. It now reads *"30 days, with no 50-day branch; 21a(c), Rule 4 and 191.1 still apply."*
   - **The receipt-versus-service ambiguity** now carries the bearing text on the service side (191.5; the 2021 comment to Rule 194; 21a(b); "provide" in 194.1(a) and 195.5(a)), without deciding it.
   - **Rule 4** is now quoted on both sides (*"any period of time"*; the roll sentence).
   - **The Rule 194 entry's content count** was corrected: six items in five clauses, at least three only partly, and (12) as "identity".
4. **Repo-fact defects.** Each was fixed on the sheet.
   - The Rule 194 row's runner note names six related rows, not four.
   - Two placement candidates for a new 194.2(a) entry are now given, not one.
   - `#108` already inserted 194.2(b)(9) and 194.5 as their own entries (`WS-2`), which is direct precedent for shape 2.
   - A **shape 3**, a second observation on the `Q-WS2-1(b)` precedent, is added. The recommendation changed to it: it detaches nothing, because by the file's own header *"an expanded restatement is an observation, never an extension of verified status."*
   - "The four propositions" in the chain are not registry entries. They exist, in part, as skeleton candidates and in the memo's `P-4`–`P-6`.
   - "The Guide surfaced every item" was corrected: three of the four were on the record before the Guide was read.
   - The CORPUS-HOME reference was corrected to what that ruling actually did.
   - The skeleton's own Scope line and the memo's `P-1` (*"supersedes the `trcp-deadline-skeleton` §5 rows if adopted"*) are now cited.
5. **Client data and licensed text (lane iv).** There was none. The realistic invented name was replaced with *"Driver D."* to remove any collision question.
6. **A NEW FINDING, carried on the sheet as a note for Michael, UNVERIFIED, not a proposal (RE-SWEEP 1).** In this PDF, **TRCP 192.2(a)(1)** reads: *"In a suit not governed by the Family Code, unless otherwise agreed to by the parties or ordered by the court, a party cannot serve discovery on another party until after the other party’s initial disclosures are due."* This narrows the practice consequence behind `[DL-memo Q1]`'s *"FLAT 30 DAYS"*, the row's *"Consequence if left"*, and BUILD-STATE's headline. The skeleton's 50-day error bites in a non-Family-Code case chiefly where early discovery is agreed or ordered, or where a defendant's own answer date runs past a disclosure date that a co-defendant's earlier answer set. **The record carries all three without that condition.** Block 1's proposal is unchanged, because the rows should still say what the text says.

## Disclosed breaches and limits
- **Lane (i) wrote two scratch scripts** (`check.py`, `spans.py`) into the design session's own cloud scratchpad. They are outside the repo and outside Michael's machine. It disclosed this itself; nothing else was written by any lane.
- **Every read is of one PDF whose currency is not established** (BUILD-STATE YOUR HAND item 23). **Nothing here is verification.**
- **Line-level wording nits that change no meaning were not all applied.** Examples: *"may respond at 50 days"* paraphrasing *"need not respond until 50 days"*, and nested markdown emphasis.

*End of report.*
