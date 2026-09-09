# STATUTE-PASS §3 NORMALIZER — TWO NEW CONTEXTS CHARACTERIZED, AMENDMENT PROPOSED (2026-09-08)

**Status:** EVIDENCE (`CAP-2`) — a verification record with a PROPOSED amendment on its face. **Nothing in `docs/specs/statute-pass-registry-retrieval-2026-08-14.md` §3 is edited by this packet**: two published normalizers were already wrong, both silently (§3's own words), so a third change to the characterized set is put to Michael as its own adopt / reject / edit and applied only by a later packet citing his ruling. The register row that carries the question is in this packet's manifest. Authored 2026-09-08 (Central) by a typed design session (Cowork, Fable 5.1 per the environment) at HEAD `8f7467b`, closing the docs act the record names — `#151`: *"the `;AA` normalizer amendment (a later docs act)"*; BUILD-STATE at `8f7467b`: *"amending `statute-pass-registry-retrieval-2026-08-14.md` §3 is a later docs act."*
**Canonical repo path:** `docs/record/normalizer-semicolon-amendment-2026-09-08/normalizer-amendment-record-2026-09-08.md`. Beside it: `norm2.py` (the amended normalizer, runnable) and `changed-lines-2026-09-08.diff` (every line the amendment changes, all thirteen).
**Sources (SOURCING, each named):** the official bulk statute corpus in `Documents\Knowledge Repo\Statutes 26-08-14\` (downloaded 2026-08-14 by Michael's hand; currency per the source's own statement, the 89th 2nd Called Session (2025) — not inferred here) — the sixteen chapter extractions `#151` staged (`fo-sources-2026-09-07.zip`, `-b.zip`, read in the container), and, for the corroboration in §4, ten of the eleven chapters the 08-14 pass read (the nine §3 names plus CR.42, which its §1 names; the eleventh is not named in that document) and all fifty-six chapters of `TX.pdf.zip`, extracted with `pdftotext -layout` in the device VM's own `/tmp/aa/` (not a mounted path; nothing landed in a connected folder). **No proposition of law is stated or characterized here and nothing enters any registry.** The fragments shown below (`services;AAand`, `SOCIETY.AAAAAcooperative`, `PERMIT YEAR;AAFEES.` and the like) are the artifact's SHAPE at a heading or a list join — two of them from Tax Code chapters outside the sixteen (`tx.155`, `tx.162`), shown for the shape only and not on the record as quotations.

---

## §1 — What §3 characterizes today, and what it missed

§3 (ruled 2026-08-14) characterizes the Legislature's PDF artifact — a space encoded as a doubled literal `A` — *"after `)`, `.`, `:`, `"`, `,`, or between lowercase letters"*, plus the single-`A` section-number form, and states the design rule that matters more than the regex: **transform only what is characterized; REPORT anything else, never guess at it.** Its characterization was empirical over the eleven chapters that pass read (§3 names nine — CP.15/37/71, CR.27/102, PE.31, HS.481, IN.541/542 — and §1 names CR.42; the eleventh is unnamed in the document) and it reported *"residual `AA` = none"* across all eleven — a report whose detector lists every glued `AA`, so a `;AAand` in any of them would have been listed.

`#151` ran that normalizer VERBATIM over sixteen more chapters (Gov't, CCP, Estates, Tax, Bus. & Com., Health & Safety, Labor) and, following the design rule, REPORTED thirteen residual glued-`AA` sites instead of transforming them — twelve of one shape and one of another:

| Shape | Sites | Where | Example (raw extraction) |
|---|---|---|---|
| **`;AA`** — the artifact directly after a **semicolon** | 12 | `tx.151` ×6, `tx.171` ×5, `tx.31` ×1 | `routing services;AAand` · `customs broker;AAand` · `REFUNDS;AAINTEREST.` |
| **`.AAAAAcooperative`** — five `A`s after a period, before a lowercase letter | 1 | `tx.171` (§ 171.071's heading-to-text join) | `SOCIETY.AAAAAcooperative` |

**Why the sample missed them (§4 verifies this rather than assumes it):** none of the ten re-extracted 08-14 chapters contains either shape — zero `;AA`, zero five-`A` runs — and §3's own residual report over all eleven says the same. The Tax Code's drafting style (enumerated lists closed with `;` + `and`/`or`; section headings with `;` inside them) supplies the semicolon context; the five-`A` run is rarer still.

---

## §2 — The two contexts, characterized

1. **Semicolon.** In every one of the twelve sites the sequence is `;` + `AA` + a word (`and`, `or`, `INTEREST`). A semicolon immediately followed by two capital `A`s and a letter does not occur in real statutory text; the original is `; and` / `; or` / `; INTEREST`. Rule: `(?<=;)AA` → one space. Same family as the existing `comma` and `colon` rules.
2. **The article `A` between two artifact spaces.** `SOCIETY.AAAAAcooperative` decodes as `.` + `AA` (space) + `A` (the real article) + `AA` (space) + `cooperative` — five `A`s = two encoded spaces and one real letter. §3 already records that *"a three-`A` run is never a three-`A` artifact — it is the two-`A` artifact followed by a real word-initial `A`"* (`(b)AAAn offense`); the five-`A` run is the same fact one word later, when the real `A` is the whole word. The existing `period` rule consumes the first `AA` and leaves `AAAcooperative` glued (the `lower` rule needs a lowercase letter before the pair, and the character before it is the real `A`). Rule: `(?<=[.):,;"])AAAAA(?=[a-z])` → ` A ` (space, the article, space), run **before** the single-context rules so they cannot eat its leading pair. Narrow by design: a five-`A` run after a characterized context and before a lowercase letter, and nothing wider.

Both rules obey §3's own test: they transform a characterized context and leave everything else to the report.

---

## §3 — The PROPOSED amendment to §3 (text to INSERT beneath the design-rule paragraph, verbatim, if adopted)

> **§3.1 — Two contexts added 2026-09-08 (PROPOSED at `#152`; ruled ______).** The characterized set gains the artifact **after a semicolon** — `services;AAand`, `REFUNDS;AAINTEREST.` — and the **five-`A` run** that is two artifact spaces around the article `A` — `SOCIETY.AAAAAcooperative` → `SOCIETY. A cooperative`. Both were REPORTED, not transformed, by the `#151` pass under the design rule above, and characterized at `docs/record/normalizer-semicolon-amendment-2026-09-08/`: twelve semicolon sites and one article site across the sixteen chapters that pass read, none in the eleven chapters this section was first written on, twenty-eight semicolon sites across the whole Tax Code zip. The corrected normalizer keeps the block above in its shape — a list of `(name, regex)` pairs each replaced by one space, in list order — and adds ONE pre-pass ahead of the list, because the article rule's replacement is not a single space and it must run before the `period` rule can consume its leading pair:
>
> ```python
> ARTICLE_A = re.compile(r'(?<=[.):,;"])AAAAA(?=[a-z])')   # runs FIRST, replaced by ' A ' (space, the article, space)
> ARTIFACTS = [ …the seven pairs above unchanged…,
>     ("semicolon", re.compile(r'(?<=;)AA')),                # appended; replaced by one space like the rest
> ]
> t = ARTICLE_A.sub(' A ', t)
> for name, rx in ARTIFACTS:
>     t = rx.sub(' ', t)
> ```
>
> Re-run over the sixteen `#151` chapters the amended normalizer changes exactly thirteen lines — the thirteen sites — and nothing else; residual glued `AA` after the run is zero in every chapter. The design rule is unchanged: transform only what is characterized, report the rest. **Quotations already on the record are unaffected: none of the thirteen sites falls inside any passage quoted in `docs/record/firm-obligations-design-2026-09-07/source-read-record-2026-09-07.md` (the string `;AA` occurs there only in its residual-report table and in the finding paragraph beneath it).**

**What adoption changes:** §3's characterized set and its regex block; `norm.py` wherever a later pass copies it from §3. **What it does not change:** any quotation, any registry entry, any spec-feedback item; the raw `.txt` extractions; the rule that the TRCP/TRE/TRAP PDFs never take this normalizer (a different publisher, raw `AA` count 0 — BUILD-STATE's line).

---

## §4 — Verification, each with the command that produced it

1. **The sites are what `#151` said.** Over the sixteen `#151` extractions (`*.txt` in the two staged zips), `grep -c ';AA'` → `tx.151` 6, `tx.171` 5, `tx.31` 1, every other chapter 0; the five-`A` run → `tx.171` 1. Matches the source-read record's residual table cell for cell.
2. **The amendment changes exactly the thirteen sites.** `norm2.py` (this directory — the §3.1 shape exactly: the pre-pass and the appended pair) run over all sixteen chapters; `diff <chapter>.norm <chapter>.norm2` → changed lines: `tx.171` 6, `tx.31` 1, `tx.151` 6, **every other chapter 0**; the thirteen changed lines are in `changed-lines-2026-09-08.diff`. Per-rule counts reproduce `#151`'s for every existing rule, with two expected differences: `tx.171` `period` 282 → 281 (the article rule now takes that site first) and the two new rules' counts (semicolon 5/1/6; article-A 1).
3. **Residual after the run is zero everywhere.** The harness's own residual report (`\S{0,12}(?<!\s)AA(?!\s)\S{0,12}` over each `.norm2`) → `0 []` for all sixteen.
4. **The 08-14 sample genuinely lacked both contexts.** In the device VM: ten of the eleven chapters extracted from the corpus zips with `pdftotext -layout` into `/tmp/aa/`; `grep -o ';AA' | wc -l` → 0 for each of CP.15, CP.37, CP.71, CR.27, CR.102, CR.42, PE.31, HS.481, IN.541, IN.542; the five-`A` pattern `[.):,;"]AAAAA[a-z]` → 0 for each — while their ordinary artifact runs number 34–1,538 per chapter, so the extraction is the same kind. The eleventh chapter is not named in the 08-14 document and was not checked; §3's own residual report over all eleven (*"none"*) covers it.
5. **Corroboration across the Tax Code** (items 4 and 5 are device-VM reads and are not reproducible from the container's staged sixteen). All 56 chapter PDFs of `TX.pdf.zip` extracted the same way: **28 `;AA` sites in 12 chapters** (`tx.151` 6, `tx.171` 5, `tx.162` 5, `tx.25` 3, `tx.23` 2, and one each in `tx.34`, `tx.321`, `tx.352` and four more), the shapes being list items (`…;AAand`) and headings (`PERMIT YEAR;AAFEES.`, `BACKUP TAX;AALIABILITY.`); **1 article-A site** (the § 171.071 one). Corroboration only — the amendment is justified by the characterization, not by the count.
6. **No quoted passage is touched.** `grep -c ';AA'` over the source-read record → 4, all four inside its residual-report table (the `tx.171`, `tx.31`, `tx.151` rows and item 3 of its findings); over the spec, the sheet, the ledger → 0; over the PF-1 report → 1 (its finding sentence). The `source-excerpts-2026-09-07.txt` file carries the string on three lines (twelve occurrences), every one a copied residual-report line.

**Failure class, named for the record:** none of the record's — this is the §3 design rule working as designed (a context it did not know was REPORTED, and is now characterized before it is transformed). The two published-and-wrong normalizers §3 describes were the opposite failure; this record exists so the third change is ruled, not slipped in.

---

## §5 — What this record does not do

It edits no spec and no normalizer in the repo; it re-normalizes nothing that any document quotes; it characterizes no proposition of law; it verifies no currency; it mints no ID. The extraction scratch in the device VM's `/tmp/aa/` is the VM's own and not Michael's; nothing was written into a connected folder for this record.
