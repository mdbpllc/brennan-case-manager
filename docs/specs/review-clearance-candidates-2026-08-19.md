# Review-clearance CANDIDATES — evidence table for the unreviewed-range adjudication

> **This table adjudicates nothing; whether any clearance type COUNTS is Michael's ruling with a
> Fable pass; produced by a Code session as data prep.**

**Status: PROPOSED — data prep, ONE RUN. Every row is a CANDIDATE.** Nothing here is a finding of
review, nothing here moves any entry out of the unreviewed range, and nothing here changes
BUILD-STATE's derivation.
**Canonical repo path:** `docs/specs/review-clearance-candidates-2026-08-19.md`
**Produced by:** Claude Code (Opus 5) on `mdb-pllc`, CODE-DISPATCH v4 task **C3**, 2026-08-19 Central.
**SOURCE: `docs/specs/session-log.md` at HEAD `eb40513`, AND NOTHING ELSE.** BUILD-STATE was read
once for the framing of the question — the two derivation bases and the nine-entry undetermined set —
and is quoted nowhere as evidence. No other file contributed a row.

---

## 1. Method — how the rows were produced

The log was parsed into entries on its `## ` headings (**248 entries; 115 carry a `(#nn)` number,
range `#2`–`#116`**) and searched three ways:

1. **Positive-sentence clearances** — every occurrence of `REVIEWED`, `verified design-side`,
   `design-side VERIFIED`, `is LANDED` and `cleared` within 130 characters of an `#nn` reference,
   read individually. **Every quotation below was extracted by program and asserted to match the log
   EXACTLY ONCE; none was retyped.**
2. **Round-trip chain** — all **186** `Awaiting/Returned from Code, unreviewed:` lines captured with
   their owning entry, then, for each entry `#n`, a search for `#n` in every LATER line.
   **Bracketed runner notes and Code notes were truncated off each line before that search**, because
   they cite entry numbers for renumbering reasons and would otherwise read as carries. *(That
   correction matters: before it, `#74` appeared to be carried at `#76`; it is not — `#76`'s runner
   note mentions it as the high-water mark.)*
3. **Summary-line mentions** — the entries a later summary names as cleared.

---

## 2. Table A — POSITIVE-SENTENCE clearances (11 assertions, all CANDIDATE)

| # | Entry/range | Clearing entry | Type | Exact quoted words |
|---|---|---|---|---|
| A1 | `#36` | `#37` | positive sentence | **#36's ROUTING IS REVIEWED AND CLEARED.** |
| A2 | `#51` | `#52` | positive sentence | the #51/thirteenth-invocation batch is REVIEWED (design-side post-sync verification, this session) |
| A3 | `#52` | `#53` | positive sentence | the #52/fourteenth-invocation batch is REVIEWED (design-side post-sync verification, this session) |
| A4 | `#54` | `#55` | positive sentence — **names an INVOCATION, not an entry number** | The sixteenth-invocation batch is REVIEWED (design-side post-sync verification, this session) |
| A5 | `#54`, `#55` | `#56` | positive sentence | The #54/sixteenth and #55/seventeenth batches are both REVIEWED (design-side post-sync verification, this session) |
| A6 | `#54`, `#55`, `#56` | `#57` | positive sentence | The #54/#55/#56 batches are all REVIEWED (design-side post-sync verification, this session) |
| A7 | `#58` | `#60` | positive sentence | #58 BATCH VERIFIED DESIGN-SIDE (post-Sync, line by line against the landed docs) |
| A8 | `#60` | `#62` | positive sentence | #60 BATCH VERIFIED DESIGN-SIDE (post-Sync, line by line) |
| A9 | `#61` | `#62` | positive sentence — **qualified on its face** | #61 REVIEWED DESIGN-SIDE (on the handback's own account; landed-doc line-by-line rode this session's synced view) |
| A10 | `#62`, `#63`, `#64` | `#65` | positive sentence — **states its instrument** | #62/#63 AND #64 BATCHES VERIFIED DESIGN-SIDE, FULL-TEXT (device-bridge checkout at HEAD f72de66 — not RAG) |
| A11 | `#67` | `#68` | **"LANDED", not "reviewed"** — see §5 | the #67 batch is LANDED (twenty-sixth runner line + #67 at `9ac12c8`, gate passed cleanly) |

**A12 — a twelfth assertion of a different shape, recorded so the Fable pass can decide whether it is
a clearance at all.** `#29`'s own round-trip line clears itself rather than a prior entry:

> the capture doc is now in the repo; nothing needs design-side review beyond the §7 rulings above

---

## 3. Table B — ROUND-TRIP-CHAIN evidence, `#62`–`#79` (measured, not carried)

"Carried later" = the entry number appears in a LATER round-trip line, runner notes stripped.

| # | Entry | Its own round-trip line reads | Carried later in | Type |
|---|---|---|---|---|
| B1 | `#62` | the twenty-second invocation's handback; the #61 landed code itself | `#64` | carried, then positively cleared at `#65` (A10) |
| B2 | `#63` | the twenty-second invocation's handback (both packets). | `#64` | carried, then positively cleared at `#65` (A10) |
| B3 | `#64` | this batch's handback; the #62/#63 batch remains design-unverified pending Michael's Sync click | **NONE** | positively cleared at `#65` (A10) |
| B4 | `#65` | this batch's handback. | **NONE** | **DROP — no clearance sentence anywhere** |
| B5 | `#66` | this batch's handback. v17 paste pending Michael; next fresh design session verifies it in force. | **NONE** | **DROP — no clearance sentence anywhere** |
| B6 | `#67` | this batch's handback. v17 paste (revised file) pending Michael… | **NONE** | see A11 — the only clearance says LANDED |
| B7 | `#68` | this batch's handback (the twenty-seventh invocation). | **NONE** | **DROP — no clearance sentence anywhere** |
| B8 | `#69` | the twelve candidates in `docs-lint-sweep-2026-08-13.md` … Nothing acted on. | **NONE** | **DROP — no clearance sentence anywhere** |
| B9 | `#70` | the WSL2 recipe gap in `spec-feedback.md`. **Unchanged and still Michael's**… | **NONE** | **DROP — no clearance sentence anywhere** |
| B10 | `#71` | the duplicate-on-first-edit CANDIDATE — needs the Network-tab evidence, then a fix ruling. | **NONE** | **DROP — no clearance sentence anywhere** |
| B11 | `#72` | this batch's handback. | `#74`, `#75` | **carried TWICE, then dropped** |
| B12 | `#73` | this entry, the twenty-eighth batch's handback, and the two new research files it filed. | `#74`, `#75` | **carried TWICE, then dropped** |
| B13 | `#74` | this batch's handback; the #72–#73 batch handback still unreviewed design-side. | **NONE** | **DROP — no clearance sentence anywhere** |
| B14 | `#75` | this batch's handback; the #72–#73 batch handback still unreviewed design-side. | `#79`–`#108` (13 later lines) | carried continuously — the floor BUILD-STATE inherits |
| B15 | `#76` | **none.** | `#79`, `#80` | see §6 — an affirmative "none" |
| B16 | `#77` | **none.** | `#79`, `#80` | see §6 — an affirmative "none" |
| B17 | `#78` | **none.** | `#79`, `#80` | see §6 — an affirmative "none" |
| B18 | `#79` | #75, #76, #77, #78 and the four runner lines (carried); this audit's own routing once pushed. | `#80` | the accumulating carry RESUMES here |

**The nine-entry undetermined set reproduces exactly, from the log alone and by measurement:**
**`#65`, `#66`, `#68`, `#69`, `#70`, `#71`, `#72`, `#73`, `#74`** — nine entries with **no positive
clearance sentence and no later carry**. That is an independent corroboration of BUILD-STATE's
figure, derived without reading it.

---

## 4. Table C — SUMMARY-LINE mentions

| # | Named as cleared | Where | Type |
|---|---|---|---|
| C1 | `#36` (at `#37`), `#62`/`#63`/`#64` (at `#65`), `#67` (at `#68`) | the summary line's enumeration of what "the log positively records" | summary-line mention |

---

## 5. Two things data prep can state without ruling anything

### 5.1 The summary line omits EIGHT positive clearances, not six

The dispatch that commissioned this table names six (`#51`, `#52`, `#54`–`#56`, `#61`). The
extraction finds those six **and two more that neither the summary line nor the dispatch names**:

- **`#58`, cleared at `#60`** (A7)
- **`#60`, cleared at `#62`** (A8)

Both are entry-level, both say `VERIFIED DESIGN-SIDE` in terms, and both appear in their clearing
entry's **heading** as well as its body. **Whether they count is the same open question as the other
six — but the count that goes into any adjudication is eight.**

### 5.2 `#67`'s clearance is the one that does not say "reviewed"

Every other assertion in Table A says `REVIEWED` or `VERIFIED DESIGN-SIDE`. A11 says the batch **`is
LANDED`**, and it sits under a heading reading `SESSION-START VERIFICATION` — a check that the code
session's output reached the repo, which is a different act from the design side reading what it
contains. **The summary line counts it with the positive clearances.** Whether "landed" is a
clearance at all is a ruling, not a measurement, and it is the row most likely to move the arithmetic.

---

## 6. Three evidentiary distinctions the Fable pass will need, recorded not resolved

1. **A drop by silence is not the same as an affirmative "none."** `#72` and `#73` were named
   unreviewed at `#74` and again at `#75`; at `#76` the line reads **`none.`** — an assertion that
   nothing awaited review, made with no clearance sentence in between. `#65`, `#66`, `#68`–`#71` and
   `#74` were never carried at all. **Two different silences, and they may not deserve the same
   ruling.**
2. **The carry RESUMES at `#79` naming `#75`–`#78`** — which were the very entries whose own lines
   had said `none.` **The chain contradicts itself across three entries**, and `#75` is the floor
   BUILD-STATE inherits from it.
3. **A4 names an INVOCATION, not an entry number** ("the sixteenth-invocation batch"). It is readable
   as `#54` only because `#56` later pairs the two ("#54/sixteenth"). **A clearance that identifies
   its subject by a different numbering series is weaker evidence than one that names the entry**,
   and it is the only row of that shape.

---

## 7. What this document is not

- **Not an adjudication.** No row is a finding of review. No entry leaves the unreviewed range here.
- **Not a BUILD-STATE change.** BUILD-STATE was NOT edited for this file — the task's own condition
  permitted a pointer line only if the C1 rewrite were still open, and it had already been committed
  and pushed, so a pointer now would be a BUILD-STATE edit made solely for this table.
- **Not a claim about item-level clearances.** The round-trip lines repeatedly say *"do not copy
  forward items cleared in #13/#22/#23/#24"* — that is a **carried-item** clearance class, distinct
  from entry review, and it is named here only so the Fable pass knows it exists and is not in scope
  of Tables A–C.
- **Not complete as to `#2`–`#35`.** The scan covered the whole log, and outside `#36` no
  entry-level clearance assertion was found below `#37`; **absence of a hit is reported as absence of
  a hit, not as proof that none exists.**
