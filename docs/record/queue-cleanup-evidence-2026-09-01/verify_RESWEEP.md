# RE-SWEEP AFTER FIX — verification of the touched material only
**Target:** `/home/claude/work/sheet/attorney-review-queue-cleanup-adjudication-2026-09-01.md` (post-fix, 43,214 B)
**Verifier:** Opus 5, read-only. **Adjudicates nothing.** Sources staged at HEAD `7f02131` under `/home/claude/work/ev/`.
**Method per location:** (1) every quotation re-located character-exact against its NAMED source, whitespace-normalized
(harness at `scratchpad/find.py`; emphasis markers, curly quotes and dashes normalized, **case NOT normalized**, so a
case change inside quotation marks is visible); (2) every count and every arithmetic claim re-run from the files;
(3) the whole sheet read once for internal consistency against UNTOUCHED text; (4) each fix read against the finding
in `verify_V1.md` / `verify_V2.md` / `verify_V3.md` it answers.

**Locations checked: 38. OK: 27. DEFECT: 11.**

---

## Per-location verdicts

| # | Touched location | Verdict |
|---|---|---|
| 1 | §0.3 wave-count sentence (114 / 247 / 361) | **DEFECT** |
| 2 | §0 annex paragraph — A1 cite typo + eleven-vs-nine note | OK |
| 3 | §1 whitespace-normalization sentence | **DEFECT** |
| 4 | Block A rewritten header — two-shapes split and row lists | **DEFECT** |
| 5 | A-1 `FE-7` | OK |
| 6 | A-11 placeholder carry | OK |
| 7 | A-12 `WS-P1` | OK |
| 8 | A-14 `O-9` | OK |
| 9 | A-16 `TC-OPEN-6` | OK |
| 10 | A-20 v23 INSTRUCTIONS | OK |
| 11 | B-1 `FE-4` | OK |
| 12 | B-4 `P-COM-2/-3/-4` | OK |
| 13 | B-5 `TOC-5` (co-requisite) | OK |
| 14 | B-9 email constraints | **DEFECT** (against Block B's untouched header) |
| 15 | Block C header (two-shapes / five texts) | **DEFECT** (against §1's untouched bullet) |
| 16 | C-1 `FE-5` + re-mint text | OK |
| 17 | C-2 `CD-2` + re-mint text | **DEFECT** |
| 18 | C-3 `V-7` + re-mint text | OK |
| 19 | C-4 `OPEN-5` + re-mint text | OK |
| 20 | C-5 `Q-COM-10-E` + re-mint text | **DEFECT** |
| 21 | C-6 `WESTLAW-5` | OK |
| 22 | E-3 `FE-12` | **DEFECT** |
| 23 | E-8 §-pointer | OK |
| 24 | Block E header | OK |
| 25 | F-4 `Q-QBO-7` | OK |
| 26 | Block G — G-Q1 recounts + HD-10 quote boundary | **DEFECT** |
| 27 | Block H | OK |
| 28 | §3 item 1 (`O-12` truncation) | OK |
| 29 | §3 item 2 (🟡 legend, five rows with lines) | OK |
| 30 | §3 item 3 (Outlook defect) | OK |
| 31 | §3 item 4 (24 no-row items) | OK |
| 32 | §3 item 5 (batch-84 header) | OK |
| 33 | §3 item 6 (69,933 / 59,779 / 1,887 / 12,041 / 10,154) | OK |
| 34 | §3 item 7 (register-vs-BUILD-STATE split) | **DEFECT** |
| 35 | §3 item 8 (collision report's H43 clearance) | OK |
| 36 | §4 rewritten policy | OK |
| 37 | §5 Q-2 relabel note | **DEFECT** |
| 38 | §7 model-attribution sentence | OK |

---

# DEFECTS IN FULL

## DEFECT 1 — §0.3, "114 open rows in all … 361 open at HEAD less wave 1's 114" → **112 and 249**

The repair of V1's MISMATCH 1 made the arithmetic self-consistent (361 = 356 ⬜ + 5 🟡, re-derived; 114 = 108 + 6;
361 − 114 = 247, all confirmed) but two of the 114 are **not open rows at HEAD**, and the sheet says so itself
elsewhere:

- **`SK-v2` (REG L1242) is `✅`** — one of the 21 SUPERSEDED candidates (`slices_wave1.txt` A5: *"SK-v2 | L1242
  (now ✅) … VERIFY it is now ✅ at HEAD (closed batch 83)"*). §1 of this sheet cites *"the `SK-v2` / `RECON-1`
  closure shape, batches 83/84"*; Block A's closing note excludes it for the same reason.
- **`FO-7` has no register row at all** — it is one of the six satellites (A7 slice: *"FO-7 | NO ROW"*) and the
  sheet's own §3 item 4 lists `FO-7` among the 24 no-row items.

Re-derived: of the 108 candidates exactly one (`SK-v2`) has closed since `edea20b` → 107 open; of the six
satellites (`FE-8`, `H43`, TRCP 195.2 L86, `[DL-memo Q4]` L1013, `Q-WF-4` L900, `FO-7`) five are open rows →
**112 open rows**. Independent control: the 114 distinct register lines named across the wave-1 slices score
`{'⬜': 107, '🟡': 5, '✅': 2}` — the two `✅` being L1242 (`SK-v2`) and L763 (`Q-COM-10-A`, a locator line in the
A6 slice, not a candidate).

**Correction:** *"— 114 items in all, the 108 candidates plus six satellites verified beside them, **112 of them
open rows at `7f02131`** (`SK-v2` closed at batch 83; `FO-7` has no row). Wave 2 (the remaining **249** open rows
— 361 open at HEAD less wave 1's 112 open rows)…"* — and §6's heading figure moves with it (`~247` → `~249`).

## DEFECT 2 — §1, "(two of this sheet's verified quotes are wrap-split at HEAD)" → **at least eight**

The "two" is V2's cross-cutting note, whose scope was Blocks E–H and §3/§5–§7 only; generalized here to the whole
sheet it is wrong. Mechanically re-derived over every quoted fragment in the sheet (ellipsis-split, normalized),
**eight** fragments are found flattened in the live log or the closed archive but appear on **no single line**
there — i.e. a plain literal `grep -F` against the record returns 0 for each:

1. `BOTH READ IN FULL, BOTH POSITIVELY IDENTIFIED UNDER V-9's SECOND LIMB` — LOG (A-9)
2. `placeholder discipline enters form-engine.md as new §14` — ARCH (A-11)
3. `the deadline model is PER-(CASE, PARTY) — each party's response clock computes from its own service date.` — LOG (A-2)
4. `Whether anything remains in it is Michael's; the row is annotated, not closed` — LOG (B-6)
5. `the failure did not occur` — LOG (B-6)
6. `client emails get human routing, never templated automation` — ARCH (B-9)
7. `escalates to a warning ONLY when worst-case crosses the cap while the numbered count does not` — ARCH (C-1)
8. `Yes — server-side function + secret; fixture writer only now; note CLAUDE.md` — LOG (E-9)

Spot-verified with literal grep: items 3, 4, 5 and 1 each return **0** in `session-log.md`.

**Correction:** "(two of this sheet's verified quotes are wrap-split at HEAD" → "**at least eight** of this sheet's
verified quotes are wrap-split at HEAD" — or drop the figure and keep the class. The rule the sentence states is
unaffected and is right.

## DEFECT 3 — Block A rewritten header: **`A-10` is in the wrong shape**, contradicting its own untouched cell

The two-shapes split answers V3's FINDING 2, but its row lists cross the two rows V3 actually classified.
Shape 2 ("**Closed on a DONE ACT OR EVENT**") is given as `A-10…A-20`. **`A-10`'s own cell reads
*"— **ruled #9** in his words (*'I am not going to be practicing family law… Delete it.'*)"*** — a ruling, and
V3's FINDING-2 table marks `A-10` as the one row of its eleven that closes on *"a ruling ✓"*. (`A-8`, which V3
classed as an ACT, is placed in shape 1 — but that placement is *disclosed* on its face as *"A-8's 'his word'
verification"*, so it is a stated sub-case rather than a silent mis-assignment. `A-10` carries no such flag.)

**Correction:** shape 1 → *"A-1…A-7, A-9, **A-10** (and A-8's 'his word' verification)"*; shape 2 → *"**A-11**…A-20
(A-13/A-14 by mootness)"*.

## DEFECT 4 — Block C header / §4 landed; **§1's CLOSE-SPLIT bullet was not fixed and now contradicts both**

Block C's header now says the re-mint texts are *"IN the cells below, verbatim (QR-1) — five texts"* and §4 says
*"staged VERBATIM in Block C's own cells (QR-1)"* — both confirmed (five `Re-minted row text (QR-1)` blocks at
C-1…C-5; C-6 states *"Nothing re-mints"*). But §1's untouched vocabulary bullet still reads:

> **CLOSE-SPLIT** … RE-MINTS the surviving limb as its own narrow row with full text (QR-1). **The surviving limb's
> text is staged verbatim in §4.**

§4 no longer stages any such text. This is the exact broken pointer V3's FINDING 5 raised, repaired at two of its
three sites. (Block E's header and §3 item 3 were both repaired correctly and are OK.)

**Correction:** §1's bullet → *"The surviving limb's text is staged verbatim in Block C's own cells."*

## DEFECT 5 — B-9 rewritten as CONDITIONAL/ANNOTATE-KEEP, contradicting Block B's untouched header

B-9's rewrite answers V3's FINDING 3 on its own evidence — the #63 home carries only one of the four constraints
(`client emails get human routing, never templated automation`, ARCH L309–310, verbatim), and the other three are
register-unique (re-derived: `highest-value function`, `envelope number, claim number, document name`,
`hard ignore layer` each 1 REG / 0 LOG / 0 ARCH / 0 BS / 0 TOC; control `dedupe` 10/13/7). But the rewritten cell
ends *"Not a question at all … Until (1) runs: ANNOTATE-KEEP"*, while Block B's untouched header is titled
**"CLOSES THAT NEED HIS TIEBREAK"** and its preamble says *"The question is answered in his ruling … 'Adopt Block B'
takes the sheet's reading; rejecting any row leaves it ANNOTATE-KEEP with the same evidence."* For B-9 the adopt
branch and the reject branch are now the same outcome, and the block title is false of it.

**Correction:** add an exception clause to Block B's header — e.g. *"…(B-9 excepted: a two-step
RECLASSIFY-ACT that stays ANNOTATE-KEEP until the verification act runs)"* — or move B-9 to Block E.

## DEFECT 6 — C-2 re-mint text: `contact-directory.md` **§5/§6** is unsupported at HEAD

The re-mint (QR-1 text that becomes a register row verbatim) asks whether the codes *"enter `contact-directory.md`
**§5/§6** controlled vocabulary"*. The source limb names **no section at all**: REG L229 (e) reads *"carrier-ID and
financial-responsibility TYPE codes from the CR-3 code sheet are directory-vocabulary CANDIDATES — PROPOSED only,
pointer at `docs/specs/cr3-field-code-map.md`"*, and #64 (ARCH L184–186) reads *"carrier-ID and
financial-responsibility types → CD directory vocabulary candidates (CD-3 pattern, spec-level acts, Michael's
ruling)"*. The only sectioned facts in the staged record are **§4** = the roster layer, **§5** = the typed-edge
*"controlled extensible vocabulary seeded from REQ-11"* (REG L229, #51), and **§6.2** = the **service story**
(REG L937; LOG L7260 — *"The shape itself is RULED at `contact-directory.md` §6.2"*). Nothing connects §6 to
directory vocabulary, and `contact-directory.md` is not staged. The cite is inherited from annex A1 §7's suggested
row text, but it ships here as the sheet's own re-mint.

**Correction:** drop `§6` and mark the remainder — *"enter `contact-directory.md`'s controlled vocabulary (§5 is the
only sectioned home the record names; the section is UNVERIFIABLE-HERE — `contact-directory.md` is unstaged)"*.

## DEFECT 7 — C-5: the quotation attributed to "#105's runner" is the **hardening's** rendering, case-altered

The cell reads: *"#105's runner expressly declined to close the row — **its words**: '`Q-COM-10-B`–`F` were
annotated add-only as **UNBLOCKED**; none closed'"*. The runner's actual words at **LOG L4177** are
*"`Q-COM-10-B`–`F` were annotated add-only as **unblocked**; none closed."* The upper-cased form occurs in exactly
one staged file — **HARD L125**, the same line the sheet correctly credits for *"Governs ≠ answers."* So the fix
separated the epigram but left the remaining quotation sourced to the hardening while attributing it to the runner.
Normalized search (case-preserving) returns HARD 1 / LOG 0 for the quoted form.

**Correction:** lower-case `unblocked` to match LOG L4177, or attribute the rendering: *"its words (as the hardening
renders them at its §4)"*.

## DEFECT 8 — E-3: BUILD-STATE's "three 'provenance' uses" is **seven occurrences over five subjects**

The repair of V2's second E-3 MISMATCH names three uses. Re-derived: `provenance` (case-insensitive) occurs
**7 times on 5 lines** of `BUILD-STATE.md` — L2 (×1), L24 (×3), L39 (×1), L40 (×1), L126 (×1) — over at least five
distinct subjects. The sheet names three and omits:

- **L40** — the HK-4 pilot recordings *"already archived at `..\data\pilot-recordings\` WITH A PROVENANCE README"*;
- **L126** — the #80 Bexar local-rules *"**PROVENANCE MARKED AND MUST NOT BE STRIPPED: TIER A** = clean-authority
  PDFs read locally"*.

The point the parenthetical makes survives — none of the five is the FE-12 flag, and `FE-12` in BUILD-STATE is
still **0** — but the count as printed is wrong.

**Correction:** *"(its **seven** `provenance` uses, across five subjects, are all other things: the slice's
ruling-provenance classes, gate 10's provenance-only ruling, the T3 R/K/I marks, the pilot-recordings provenance
README, and #80's TIER A/B provenance marking)"* — or drop the count.

## DEFECT 9 — G-Q1: `HK-7` is dropped from the enumeration; **37 acts on 36 rows → 38 on 37**

The audit's §5 heading is `ACTION-NOT-RULING (38)` and its own list enumerates **39 items on 38 rows**
(hand 19 items / 18 rows because `M-3`/`M-4` share REG L522 — confirmed; research act 18; standing bars 2).
The sheet's hand list re-derives to 19 exactly, and its bar list to 1 — but its research list is **17** because it
omits **`HK-7` (REG L1016, ⬜)**, which the audit places in that group (*"`HK-7` **the device-bridge grant, now a
20,102-byte running log**"*) and which annex A8 processed in full at its own section (*"a RECURRING per-session ACT,
Michael's"*; BUILD-STATE L152 carries *"HK-7 re-grant each session"*). `HK-7` appears **nowhere in the sheet**
(`grep` → 0 hits). This also puts G-Q1 at odds with Block G's own untouched preamble, *"Wave 1 verified all 38 of
the audit's action rows"*: 38 rows less `Q-QBO-7` is 37 rows, not 36.

Everything else in G-Q1 verifies: `M-3`/`M-4` share L522 ✔; L86 and L1013 are the R11 pair ✔; the HD-10 quote
boundary is now exact — LOG L331 reads **`HD-10` "Close it by pointing at them"** — the two register rows ARE the
verification act, and only the quoted half now sits inside quotation marks ✔.

**Correction:** *"— **38** audit-classed acts on **37** rows (`M-3`/`M-4` share L522; the audit's 38th row,
`Q-QBO-7`, reclassified to Block F)"*, and the research-act list → **(18)** adding **`HK-7`** (the per-session
device-bridge grant; the audit files it as a research act, A8 and BUILD-STATE L152 as his hand — say which).

## DEFECT 10 — §5 Q-2: the maxim is attributed to the register, which does not carry it

The relabel itself is right and re-verified: **`D-4`** (REG L649; LOG L1759/L5091 — the keep-separate ruling,
`task-19-signoff-record-2026-08-17.md` §4), **`D-5`** (REG L834 and L1250 — the commissioned witness-statement
research note), **`D-6`** (REG L606/608/609; LOG L4968/L5095/L5108 — WP numbering deferred at the walk) are live
IDs; **`D-7`** returns 0 everywhere; and the E-10 double-use of `D-6` is gone. But the sheet calls the class
*"the **register's own** 'AN ID IS NOT AN IDENTITY UNTIL THE ROW IS READ' class"*. That string occurs **nowhere in
`attorney-review-queue.md`** (0 hits, case-insensitive; control `QR-1` = 102). It is the **project instructions'**
v28 operational note, derived from `#133`, and appears in staged files only at **LOG L803** (echoing the
instructions) and **AUD L265** (the audit's own method note).

**Correction:** *"— the instructions' own 'an ID is not an identity until the row is read' class (v28, from `#133`;
carried at LOG L803 and in the 08-24 audit's method note), caught at verification."*

## DEFECT 11 — §3 item 7 still drops BUILD-STATE's second disjunct on the five 🟡 rows

The register-vs-BUILD-STATE split answers V2's §3.7(c) cleanly (the `Q-RL6-1` *Pharr* item is now filed under
REGISTER stale lines; REG L757 confirmed, and BUILD-STATE L109 is current on that point) and the added `V-5`
"16 REMAIN UNVERIFIED" item verifies (REG L651 vs BUILD-STATE L102's 47 / 35 / 12). Every other item in the list
verifies: `re-upload SKILL.md v2` (SK-v2) and `Q-STAT-2 – Q-STAT-6` both on the BS L152 hand list ✔; `rides the
v23 paste` = 1 occurrence in BS (L144) against BS L152's v28 line ✔; `THE HARDEST GATE IS ON NO ROW AT ALL
(Q-WF-4)` beside `ITS ROW NAMES ALL THREE CONSUMERS (#94)`, both on BS L130 ✔; `Rule 195.2's 30-day floor is GONE`
flat in BS L125's *"Also open:"* list ✔.

The one item V2 flagged and the fix did not repair: *"the five 🟡 rows called 'execution-pending'"*. BUILD-STATE
L164 reads *"The five `🟡` rows — `HK-6`, the GPU-telemetry posture item, `V-5`, `V-6`, `V-7` — are
ruled-but-execution-pending **or awaiting your confirmation**"* — a disjunction, and the dropped disjunct is the one
that would make the sentence non-stale for `V-5`/`V-6`/`V-7`. The sheet quotes the disjunction in full two items
earlier (§3 item 2's proposed Convention line), so it is internally inconsistent as well as incomplete.

**Correction:** *"the five 🟡 rows called 'ruled-but-execution-pending or awaiting your confirmation' where
`V-5`/`V-6`/`V-7`'s execution is DONE, so only the second disjunct can be doing any work for them"*.

---

# WHAT THE OK VERDICTS REST ON (evidence, compressed)

- **§0 annexes.** A1 L142 does cite the `#63` distillation ruling at *"ARCH L1303–1304"*; the text is at
  **ARCH L303–304** and ARCH L1303–1304 holds the FE-2 re-parking / SK-v2 authoring lines. AUD L15 says
  *"the **eleven-agent** audit fleet"*; HARD L12 says *"nine auditors"*; the sheet cites the audit's eleven at §0.1
  and the hardening's *"Five independent checkers"* at §0.2 — each file's own words, as claimed.
- **A-1.** `#53` (ARCH L1192–1195) reads *"seeded with the three named candidates"* ✔; REG L213 carries
  *"Entering is not adopting"* and *"FE-7's guardrails hold"* ✔; "survive in substance" replaces the overstated
  "verbatim" ✔; `distill*` = 0 LOG / 0 BS (control `FE-7` = 2 LOG) ✔.
- **A-11.** "future" restored — REG L214 verbatim ✔.
- **A-12.** Both row quotes at REG L388 ✔; sequencing confirmed — `#123` at LOG L2130 sits **above** the 2026-08-20
  direct-ruling entry at LOG L2354 in a newest-first log ✔.
- **A-14.** Split attribution now correct: *"the split never had to be decided"* = REG L410; *"answered by never
  having to be decided"* = LOG L3741, inside the 65th runner line (heading L3715) ✔.
- **A-16.** `wave1_A4.md` L215 rates `TC-OPEN-6` **MED** and L218 lists *"the fifteen captures' removal step
  (TC-OPEN-6)"* among its UNVERIFIABLE-HERE items ✔.
- **A-20.** LOG L64 verbatim to the point the ellipsis begins ✔; BS L152 and BS L142 verbatim ✔;
  `rides the v23 paste` = exactly 1 in BUILD-STATE (L144) ✔.
- **B-1.** *"All three rows stay ⬜"* = BS L127 ✔; the `#53` quote = ARCH L1179–1180 ✔; A1 §S-2 exists and
  re-attributes to runner 36 (LOG L7465–7466) and `#81` (LOG L7491–7492) ✔.
- **B-4.** `P-COM-2` at `7f02131`: LOG = **1** (L511, inside `#138`, heading L394 — the hardening's own zero-finding
  quoted), ARCH = **0**, REG = 1 (L840) ✔ exactly as the corrected text says.
- **B-5.** The toc footer says *"remains Michael's and unruled"* **twice** at HEAD (TOC L517, L521) ✔; the
  co-requisite footer reconcile is now staged in the cell (V3 FINDING 4 answered).
- **C-1.** ARCH L1184–1185 verbatim ✔; the re-mint's rule quotations are already in the record —
  *"Any party may serve on any other party"* at REG L959 and LOG L7499/L7509 (`#81`), `190.4(b)(2)` + `phase scoping`
  at LOG L7520 ✔ (this is also what keeps §7's PF-1 skip true); `pairwise and cumulative` / `no cap to look up` = 1
  register hit each, both at L186 ✔; `Q-FE5-1` L951 and `Q-FE5-9` L959 present ✔.
- **C-3.** `#73`'s narrowing at LOG L8539 ✔; the cite-stays ruling at **LOG L5245**, inside the FIFTY-FIRST
  invocation (heading L5238, 2026-08-17), whose own text reads *"ELEVEN ITEMS WERE PUT TO MICHAEL AT THE STEP 1 STOP
  AND ALL ELEVEN WERE RULED"* ✔ — V1's MISMATCH 4 fully answered; `#73` (L8511–…) contains neither `V7-23` nor
  `Rejected` ✔. *"entry 24's proposition has never been located inside the Devine opinion"* = 3 register hits
  (L700 → `V-7` 🟡; L738 → `V-9` ✅; L795 → `WB2-2` ✅) — `V-7` is the only open home ✔.
- **C-4.** `#94`'s full sentence at LOG L5475, no ellipsis ✔; `AUD-5..9` = REG 2 (L3 header note + L990 row),
  LOG 7, BS 1 (L152 hand list) ✔ — the row is the only register home; both surviving limbs now re-minted
  (V3 FINDING 1, HIGH, answered).
- **C-6.** *"MEMORANDUM OPINION, Nov. 30, 2017, Lang, J."* and *"no public source could reach"* = 1 register hit
  each, both at L613 ✔; the "five texts, not six" statement squares with the block header and §4 ✔ (V3 7a answered).
- **E-8 / Block E header / §3 item 3.** All three §4-pointer repairs land: E-8 now cites **§3 item 5** (resolves),
  Block E's header points at *"§4's rule"* (which §4 states), §3 item 3 points at the executing packet ✔.
- **F-4.** AUD L163, inside §5 (heading L141): *"**Standing bars, not questions (2):** `Q-6` … · `Q-QBO-7`-adjacent
  EFSP bar."* ✔ — "a bar ADJACENT to the row, not the row" is exact; REG L862 is a yes/no ruling question ✔.
- **Block H.** HARD L144 / L52 both carry *"not one is a true duplicate"* ✔; the hardening's §4 covers **10 register
  rows**, 2 ⛔ DIFFERENT-QUESTIONS and 8 OVERLAPPING; 7 of the 8 sit in E-10…E-14 (`V5-IDS`, `Q-RL6-5`, `Q-COM-10`,
  `Q-FE4-2`, `Q-FE5-2`, `Q-FE6-1`, `[Task 7 memo Q4]`) and the eighth (`FC13-Q-5`) in F-2/F-3 ✔ — the arithmetic is
  right; "pairs" is being used loosely for rows, which is the only imprecision and does not move a number.
- **§3 item 1.** REG L418 is `O-12` and ends *"a second default rule, `supabase_admin — **public**"* with an
  unclosed backtick and unclosed emphasis; L419 begins `O-13` ✔.
- **§3 item 2.** Row-anchored `^\s*- 🟡` returns **exactly five**: L377 `HK-6`, L523 GPU-telemetry, L650 `V-5`,
  L667 `V-6`, L684 `V-7` — the sheet's list and line numbers match one-for-one ✔; REG L9's Convention line documents
  two glyphs ✔; and the "four batches" claim is verbatim-supported — LOG L40 (85th invocation):
  *"The Convention line was again NOT repaired — unrouted, and `QR-6(e)` reserves it to Michael … **named for the
  fourth time** rather than carried silently."* ✔
- **§3 item 4.** 24 IDs, all distinct; **none** is the leading ID of any marked row (re-derived on row-anchored
  lines) ✔; COLL L12's own words are *"exist only inside range/slash notation"* ✔.
- **§3 item 6.** The audit's nine figures (L251–253) sum to **69,933 B** = 68.3 KB, against its stated ~62 KB ✔;
  69,933 − 10,154 = **59,779** ✔. Re-derived from the register to the byte: L1212–1231 = **1,887**;
  L1212–1239 = **12,041**; L1232–1239 = **10,154**, containing **exactly eight** `✅` rows ✔.
- **§3 item 8.** COLL L278 clears `H43` as *"same subject, not a collision"* ✔; COLL L331's disclosures-vs-heartbeat
  H list omits `H43` ✔; LOG L2701 records *"one ID, two propositions, already in the record"* ✔; and the
  UNTRACKED/DO-NOTHING framing is exact — LOG L387: *"`attorney-review-queue-audit-2026-08-24.md` (27,133 B) and
  `id-collision-report.md` (54,218 B) **are in the working tree and are not in git**"*, left where they are on
  Michael's answer ✔.
- **§7.** No wave-1 annex header self-states a model (A1–A8 checked; A7's only `Fable 5` string is a quotation of
  `#139`'s heading), so *"the annex reports do not self-state a model"* is exact ✔; the audit's and the hardening's
  self-stated models match their own headers ✔. The PF-1 skip survives the fix pass: every quoted rule fragment
  introduced by the new re-mint texts is already inside a recorded register row or ruling (see C-1 above) ✔.
- **All 36 register line cites in the touched material resolve** to the named row at `7f02131`; zero drift.
