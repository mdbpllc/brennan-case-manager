# VERIFY-V3 — ADVERSARIAL RE-VERIFICATION OF EVERY CLOSE / CLOSE-SPLIT ROW
**Target:** `/home/claude/work/sheet/attorney-review-queue-cleanup-adjudication-2026-09-01.md`
**Verifier:** Opus 5, read-only. Adjudicates nothing. Sources staged byte-identical from HEAD `7f02131`.
**Scope listed from the sheet itself:** Block A (A-1 … A-20), Block B (B-1 … B-9, B-4 being three rows),
Block C (C-1 … C-6) = **35 disposition entries over 37 register rows**. Block D (D-1 … D-3) tested the
OPPOSITE way (is there a later Michael word RELEASING the deferral?).

**Method per row:** (1) DESTROY-AN-OPEN-QUESTION — row read WHOLE at its line, every interrogative and
banked limb enumerated mechanically (`qmarks.py`, sentence-split on `?` over the full row body), each
limb's "other home" confirmed to exist at the stated place, plus a 2-phrase distinctive-string grep with
a positive control. (2) HIS-WORDS ATTRIBUTION — the entry containing the ruling read in the surrounding
paragraph, attribution sentence quoted.

**Independent control on the sheet's own arithmetic:** re-counted the register at `7f02131` —
`{'✅': 126, '⬜': 356, '🟡': 5}`, total **487**. The sheet's §0 figure is exact.

---

## VERDICT TABLE

| # | Row | Verdict |
|---|---|---|
| A-1 | `FE-7` L188 | SURVIVES |
| A-2 | `DL-INPUT` L288 | SURVIVES |
| A-3 | `H22` heartbeat L112 | SURVIVES |
| A-4 | OAA demographics L133 | SURVIVES |
| A-5 | `PF-2` L518 | SURVIVES |
| A-6 | `V-5` L650 🟡 | SURVIVES |
| A-7 | `V-6` L667 🟡 | SURVIVES |
| A-8 | `T-26` L745 | SURVIVES |
| A-9 | `Q-AUTH-1` L777 | SURVIVES (evidentiary note) |
| A-10 | Tex. Fam. Code L59 | SURVIVES |
| A-11 | Placeholder carry L214 | SURVIVES — **FINDING 2 (MED)** |
| A-12 | `WS-P1` L388 | SURVIVES — **FINDING 2 (MED) + FINDING 8 (LOW)** |
| A-13 | `O-8` L409 | SURVIVES — **FINDING 2 (MED)** |
| A-14 | `O-9` L410 | SURVIVES — **FINDING 2 (MED)** |
| A-15 | `TC-OPEN-5` L467 | SURVIVES — **FINDING 2 (MED)** |
| A-16 | `TC-OPEN-6` L472 | SURVIVES — **FINDING 2 (MED) + FINDING 7b (LOW)** |
| A-17 | `TC-OPEN-7` L473 | SURVIVES — **FINDING 2 (MED)** |
| A-18 | `RE-LOOK-3` L882 | SURVIVES — **FINDING 2 (MED)** |
| A-19 | privilege-tier migration L1249 | SURVIVES — **FINDING 2 (MED)** |
| A-20 | v23 INSTRUCTIONS L1248 | SURVIVES (independently corroborated) |
| B-1 | `FE-4` L185 | SURVIVES |
| B-2 | `FE-6` L187 | SURVIVES |
| B-3 | `CD-1` L228 | SURVIVES |
| B-4 | `P-COM-2/-3/-4` L840–842 | SURVIVES (sheet's own UNVERIFIABLE-HERE caveat holds) |
| B-5 | `TOC-5` L809 | **FINDING 4 (MED)** |
| B-6 | `Q-PR3-3` L888 | SURVIVES |
| B-7 | `Q-STAT-6` L1004 | SURVIVES |
| B-8 | `Q-STAT-3` L1001 | SURVIVES |
| B-9 | email constraints L282 | **FINDING 3 (MED)** |
| C-1 | `FE-5` L186 | SURVIVES — subject to **FINDING 5 (LOW-MED)** |
| C-2 | `CD-2` L229 | **FINDING 6 (MED)** on limb (b); limb (e) re-mint SURVIVES |
| C-3 | `V-7` L684 🟡 | SURVIVES — subject to **FINDING 5** |
| C-4 | `OPEN-5` L990 | **FINDING 1 (HIGH)** |
| C-5 | `Q-COM-10-E` L767 | SURVIVES — subject to **FINDING 5** |
| C-6 | `WESTLAW-5` L613 | SURVIVES — **FINDING 7a (LOW)** |
| D-1 | `WS-P4` L391 | DEFERRAL HOLDS — zero-with-control |
| D-2 | `READ-A` L605 | DEFERRAL HOLDS — zero-with-control |
| D-3 | `PR-3` L71 | HOLD HOLDS — zero-with-control, re-asserted at HEAD |

**No row FAILS outright.** Eight findings, one HIGH.

---

# FINDINGS IN FULL

## FINDING 1 — HIGH — C-4 (`OPEN-5`, L990): a third open limb is closed on a compressed ground, and the sheet's own quotation elides it

**What the sheet does.** C-4 is CLOSE-SPLIT. Its "Closes on" cell reads: *"limb (a) — ruled #82 (A-2,
anchor form) and #94 ('Yes — ride the v9 amendment'); the five stale pointers were removed by the 37th
invocation."* Its "surviving limb" cell re-mints **only limb (b)**, and supports that with a quotation:
*"#94's own words: 'OPEN-5(b)… REMAIN OPEN'."*

**What the row actually carries — three limbs, not two.** Read whole at L990:
> *"**This row also carries the one-word "apply" for the `AUD-5..9` recounts** — the five stale figures
> are carried in BUILD-STATE unchanged until you give it."*
> … *"**(b) and the `AUD-5..9` one-word "apply" were deliberately NOT put to him this session and REMAIN
> OPEN**."*

**The ellipsis sits exactly on the elided limb.** #94's sentence in the live log at line 5475 reads, in
full and character-exact:
> `OPEN-5(b) and the AUD-5..9 one-word apply were deliberately NOT put and REMAIN OPEN.`

The sheet renders this as *"OPEN-5(b)… REMAIN OPEN"* — the ellipsis replaces **"and the AUD-5..9
one-word apply"**, i.e. precisely the limb the sheet does not re-mint.

**The record says the limb is open THREE times, all AFTER the #82 ground the sheet relies on.**
- #82 is dated **2026-08-15** (`## 2026-08-15 (#82) — BUILD-STATE DISPOSITIONS RULED: A-1–A-6 …`).
- #94 is **2026-08-16** — one day later — and says REMAIN OPEN (above).
- The **fifty-first invocation, 2026-08-17**, lists under "Carried untouched": *"**`OPEN-5(b)`** and the
  **`AUD-5..9`** one-word apply"*.
- **BUILD-STATE at HEAD (batch 85, 2026-09-01)**, in the your-hand open-items list:
  *"· **`OPEN-5(b)` and the `AUD-5..9` one-word apply** ·"*.

None of the three was written in ignorance of #82. The sheet's ground — pointer removal at the 37th
invocation — is a real event (#82's execution removed the `AUD-1, AUD-5, AUD-6, AUD-7, AUD-8, AUD-9`
stopgap pointers), but pointer removal is not the "apply," and the record declined to treat it as
closing the limb on the very next day.

**Destruction test — the row is the only register home.**
`grep -c -F 'AUD-5..9'` across the four staged sources:
| pattern | register | live log | archive | BUILD-STATE |
|---|---|---|---|---|
| `AUD-5..9` | **2** | 7 | 0 | 1 |
| `AUD-9` | 0 | 2 | 0 | 0 |
| control `OPEN-5` | 9 | 39 | 0 | 5 |

Both register hits are the same item: L990 (the row) and L3 (the header's own reconcile note *about*
L990). Confirmed by `grep -n | cut -d: -f1` → `3`, `990`. So **the AUD-5..9 "apply" has no other
register home**, and the sheet's disposition for it is a plain close inside a CLOSE-SPLIT that re-mints
something else.

**Why HIGH.** If Michael says "Adopt Block C," an item that BUILD-STATE at HEAD lists as open and his
loses its only row, on a ground the record contradicts three times — the hardening's own
"would-destroy-an-open-question" class. Note also that the sheet's own wave-1 verifier (`wave1_A3.md`)
marked `OPEN-5` **destroys-unique-text = Y** and disposed of the AUD limb only by the inference
*"overtaken by #82 A-2–A-6"*; the sheet compressed that inference to a clause and dropped the Y flag.

**Minimum repair:** either re-mint the AUD-5..9 one-word apply as its own narrow row alongside limb
(b), or state the "overtaken by #82" reasoning explicitly, reconcile it against #94 / the 51st / HEAD
BUILD-STATE, and put it to Michael as its own word.

---

## FINDING 2 — MED — Block A's heading and preamble assert a ruling basis that ELEVEN of its twenty rows do not have

**The claim.** *"BLOCK A — CLEAN CLOSES ON MICHAEL'S OWN RULING"*, preamble: *"The row's whole question
is answered in a ruling of his."* One word ("Adopt Block A") moves all twenty.

**Mechanical test.** Sentence-split each Block A row body on `?`:

| row | interrogatives in the row | what actually closes it |
|---|---|---|
| A-8 `T-26` | 0 | an ACT (the five looks, run #108) |
| A-10 Fam. Code | 0 | a ruling ✓ |
| A-11 placeholder | 0 | an ACT (REQ-10 fold executed #63) |
| A-12 `WS-P1` | 0 | an ACT (the click) + a session's API read |
| A-15 `TC-OPEN-5` | 0 | an ACT (the click) |
| A-16 `TC-OPEN-6` | 0 | an ACT (the relocation) |
| A-17 `TC-OPEN-7` | 0 | an ACT (the paste) |
| A-19 migration | 0 | an ACT (migration run) |
| A-20 v23 | 0 | EVENTS (v28 in force) |
| A-13 `O-8` | 1 | an ACT (he upgraded the DB) |
| A-14 `O-9` | 1 | MOOTNESS by events |

**Eleven of twenty close on an ACT or on EVENTS, not on a ruling.** The sheet's individual cells are
honest about this — they say "done," "executed," "run clean," "dissolved by events." The **block label
and preamble are not**, and the block is designed to be adopted with one word.

**Why it matters, on the record's own line.** The register's scope line, ruled #114 (register L11):
> *"**They await Michael's ACTION, not his RULING** — and that is the line this register is drawn on …
> **it is the complete inventory of open RULINGS.**"*

The sheet invokes exactly this line twice — in B-1's tiebreak and as Block G's whole premise (G-Q1
proposes an "AWAITING AN ACT — not a ruling" marking for 37 rows). And `WS-P1` was **DELIBERATELY NOT
CLOSED** on 2026-08-20 for that very reason (live log, the unnumbered 2026-08-20 direct-ruling entry):
> *"**`WS-P1` IS ANNOTATED AND DELIBERATELY NOT CLOSED.** A row closes on a ruling; this row's substance
> is an **ACTION** — the `#114` boundary, applied the same way the go-live gates are."*

So the sheet applies the ruling/act distinction rigorously in Blocks B and G and drops it in Block A's
label. The dispositions themselves are defensible (a done act closes); the **framing is not**, and
CC-1(a) makes a mislabelled bundle exactly the kind of thing that gets nodded through.

**Minimum repair:** split Block A, or retitle it ("CLEAN CLOSES — his ruling, or an act of his that is
done and verified") and say per row which of the two it is.

---

## FINDING 3 — MED — B-9 (cross-cutting email constraints, L282): the closure's named home does not carry three of the four constraints, and a wave-1 verdict was overridden silently

**What the sheet says.** *"Tiebreak: close only WITH the closure sentence naming where the constraints
continue to live (**the adopted doc + the #63 entry**), or convert to a glyph-less record line … Three of
four constraints exist nowhere else in the staged record."*

**Uniqueness test (register / live log / archive / BUILD-STATE), `grep -ci -F`:**
| phrase | reg | log | arch | BS |
|---|---|---|---|---|
| `deadline extraction` | **1** | 0 | 0 | 0 |
| `envelope number` | **1** | 0 | 0 | 0 |
| `hard ignore layer` | **1** | 0 | 0 | 0 |
| `human routing` | **1** | 0 | 0 | 0 |
| `NEVER templated` | 1 | 0 | **1** | 0 |
| control `dedupe keys` | 1 | 0 | 0 | — |

**So the "#63 entry" home is real for exactly ONE of the four.** Reading #63 whole (archive L268–L325),
the only relevant sentence is:
> *"Cross-cutting constraints recorded, **including**: client emails get human routing, never templated
> automation."*

Nothing in #63 carries deadline-extraction-leads-T3-scoping, the three dedupe keys, or the hard-ignore
layer. The other named home — `docs/specs/email-workflow-requirements.md`'s adoption addendum — **is not
staged**, so whether it carries them is UNVERIFIABLE-HERE. The sheet does not mark it so, although §7
adopts exactly that discipline for the registry files.

**Undisclosed override.** The sheet's own wave-1 verifier (`wave1_A3.md`) proposed **`RECLASSIFY-ACT`**
for this row — *"a session's act: verify/give the four constraints a design-doc home at HEAD (adoption
addendum — UNVERIFIABLE-HERE), then convert to a glyph-less record line"* — and marked
**destroys-unique-text = Y**. The sheet escalates it to a Block B CLOSE without saying it is departing
from its own evidence layer. §0 promises this transparency for the 08-24 audit and the 08-25 hardening;
it makes no such promise for wave 1, and here the gap shows.

**Mitigation that keeps this MED, not HIGH:** the sheet does say the closure sentence carries all four
verbatim either way, and CLOSE is append-only, so no text is lost. What is lost is the row's ⬜ status
while three constraints have no verified home outside it.

---

## FINDING 4 — MED — B-5 (`TOC-5`, L809): the closure has a self-renewing contradiction its own wave-1 verifier named as a co-requisite, and the sheet does not stage it

**The row's question:** *"Does the index earn its keep at 53 KB?"* — plus the sync limb, *"Michael may
want it excluded from sync and kept repo-only."* The sync limb is answered by events (TC-4 excluded
`/docs/record/`, where the toc now lives). The sheet's disposition: CLOSE on supersession-by-events,
with the honest tiebreak that *"the toc's own footer still says 'remains Michael's and unruled' and
regenerates every batch."*

**The footer at HEAD, read directly** (`docs/record/session-log-toc.md`, L517–L521):
> *"**`TOC-5`** — whether a file this size should sync into project knowledge at all — **remains
> Michael's and unruled, and the split changes its terms rather than answering it.**"*
> … *"**`TOC-5` itself is untouched by that** — the archive leaving the picker says nothing about
> whether THIS file should sync, which remains Michael's and unruled."*

Two independent assertions, both current at HEAD, both saying the opposite of the proposed closure.
And per TOC-4 / TC-3 the runner **regenerates this file in full every batch** — so unless the
regeneration text itself changes, the register would say ✅ while the toc re-asserts "unruled" on every
subsequent batch, in perpetuity. That is a new, self-renewing register/record contradiction created by
the closure — the trigger-#6 class.

**The sheet's own wave-1 verifier named the fix and the sheet dropped it.** `wave1_A3.md`:
*"`CLOSE` by supersession … annotation says TOC-5 was never named; **regenerate the toc footer in the
same batch**."* The sheet's B-5 cell mentions the footer as a *reason for hesitation* but stages no
footer act, and §4 stages nothing at all.

**Minimum repair:** make the toc-footer rewrite an explicit co-requisite of B-5's closure in the
executing packet's routing table (and note it is a `docs/record/` write, bridge-reachable, outside the
sync).

---

## FINDING 5 — LOW-MED — §4 contradicts §1 and Block C's own header: no CLOSE-SPLIT surviving-limb text is staged verbatim, so the QR-1 claim is unmet on this sheet

§1 defines the vocabulary: *"**CLOSE-SPLIT** closes the answered question and RE-MINTS the surviving limb
as its own narrow row **with full text (QR-1)**. The surviving limb's text is **staged verbatim in §4**."*
Block C's header repeats it: *"(its text staged in §4)"*.

§4 says the opposite:
> *"[This section is assembled after his rulings — the per-row substance is fully specified in §2;
> duplicating it here before the sitting would be copy-forward surface. The six CLOSE-SPLIT
> surviving-limb question texts are staged verbatim in Blocks C's own cells …]"*

The Block C cells carry **descriptions**, not question text. C-3's surviving limb, for example, is given
as *"re-minted as a narrow ACT row (a session's proposition-location read; verification his)"* — a
characterisation of an act, not the QR-1 full text of a question. C-6's cell says *"Nothing re-mints."*

QR-1's whole point is that the deleted packet was the only other home, so the register entry must carry
the full question. A sheet that claims verbatim staging in two places and delivers paraphrase in a third
is asserting compliance it does not have. Nothing executes until the packet, so this is a staging
defect rather than a destruction — hence LOW-MED — but it should be repaired before the sitting, not
after, because §1's promise is what makes "Adopt Block C" safe to say in one word.

---

## FINDING 6 — MED — C-2 (`CD-2`, L229) limb (b): "banking" a register-unique open want inside a ✅ row removes its only OPEN-status home

The sheet: *"Limb (b) (verification-officer tracking, 'someday') is **BANKED in the closure sentence,
not re-minted**."*

**The row's own words about limb (b)** (L229): *"(b) is carried at full length **deliberately**: it is
the K-6/K-7 cheap insurance."*

**Uniqueness:**
| phrase | reg | log | arch | BS |
|---|---|---|---|---|
| `verification-officer` | **1** | 0 | 1 | 0 |
| `who verified which response set` | **1** | 0 | 0 | 0 |
| control `K-6/K-7` | 13 | 7 | 12 | 3 |

The single register hit is L229 itself. The one archive hit is the #58 entry that put it there; the
archive is CLOSED and outside the design-side sync.

§1's safety claim is *"row text is never deleted, so **nothing unique is destroyed**."* That is true of
TEXT and false of STATUS: the register is a checklist of open items, and a want that exists only inside
a ✅ row is no longer on it. The sheet itself draws the distinction everywhere else — re-minting
preserves open status, banking does not, and Block E exists precisely for rows that must stay ⬜.

Limb (b) is not an interrogative (mechanical scan: CD-2's row has exactly **1** interrogative, the
ruled one), so this is a judgment call rather than an outright destruction — hence MED, not HIGH. But
the row says "deliberately" and the sheet's justification for burying it is one word ("someday").

**Minimum repair:** either re-mint (b) alongside (e), or put the bank/re-mint choice to Michael as its
own word rather than deciding it inside C-2's cell.

---

## FINDING 7 — LOW — two classification defects

**7a — C-6 (`WESTLAW-5`) is filed under CLOSE-SPLIT and re-mints nothing.** Its own cell: *"Nothing
re-mints."* Under §1's vocabulary that is a plain CLOSE. It survives on the merits (see below), but a
row in the CLOSE-SPLIT block that produces no new row will not be looked for in the executing packet's
re-mint list.

**7b — A-16 (`TC-OPEN-6`) sits in a block labelled "HIGH confidence" on a MED wave-1 verdict.** Every
other Block A row was rated HIGH by wave 1; `wave1_A4.md` rates `TC-OPEN-6` **MED** and lists *"the
fifteen captures' removal step (TC-OPEN-6)"* among its UNVERIFIABLE-HERE items. (Independent
corroboration available and worth recording: the live project-doc list in this session's own
instructions field carries **29** docs and none of the fifteen — the only surviving pre-2026-08-21
`claude_` files are three live working documents that TRANSIT expressly exempts. Non-staged observation,
labelled as such, offered as support rather than as verification.)

---

## FINDING 8 — LOW — A-12 (`WS-P1`, L388): the cell quotes the earlier closing condition and omits the later, stronger deliberate non-closure

The sheet cites the row's **2026-08-18** condition — *"STAYS OPEN until a design session verifies it
from the live config"* — and shows it met at #123. Correct: #123's opening reads
> *"**`Q-CAP-2` — EXECUTED, his hand, ~11:45 Central:** *"I excluded docs/reference."* **Verified by
> measurement, not report:** the project's sync filters, read via the API after his change, now carry
> `/docs/reference/": "exclude"` — they did not an hour earlier."*

But the row carries a **later, 2026-08-20** annotation that the sheet's cell does not mention:
> *"**THE ROW IS NOT CLOSED AND THAT IS DELIBERATE: its substance is an ACTION — the click — not a
> ruling, the `#114` boundary applied as written. Closing it on a ruling it already had would destroy
> the only record that the click may never have been made.**"*

**Sequencing check (the log is newest-first):** the deliberate-non-closure entry sits at live-log line
2354 (the unnumbered 2026-08-20 direct-ruling Code session); #123 sits at line 2130, i.e. **later** the
same day. So the ground IS spent — the click is now recorded as made and API-verified, and CLOSE is
append-only so the record of the doubt survives on the ✅ row. **The disposition is right.** The defect
is only that a reader of the sheet cannot see that a second, more emphatic non-closure exists and why
it no longer bites.

---

# PER-ROW BLOCKS — tests run, evidence, verdicts

## BLOCK A

### A-1 `FE-7` (L188) — SURVIVES
(1) Row read whole (1,504 B, single line). Mechanical scan: **1 interrogative** — *"What does the queue
look like pre-engine, and what does adoption look like?"* Both halves ruled. Guardrail residue confirmed
to survive verbatim at the ✅ row L213: *"**Entering is not adopting:** each is `queued`, none distilled,
none format-authoritative, and FE-7's guardrails hold."*
(2) Attribution: #53 (archive L1171) — *"Michael ruled each item with the recommendation"*; #63 (archive
L268) — *"**All rulings Michael's**, 2026-08-12 Central, by widget"*, whose body reads *"DISTILLATION
(RULED): all four candidates ENTER §13.4 … Entering ≠ adopting; FE-7 guardrails hold."* HIS WORDS ✓.

### A-2 `DL-INPUT` (L288) — SURVIVES
(1) **1 interrogative** — *"Is the deadline model per-(case, party), not per-case?"* Answered. No banked
limb; the pass's open questions are rowed at `[DL-memo Q1]–[Q5]` / `ID-DL-1` (L1009 confirmed present).
(2) #66 body: *"**DL-INPUT RULED:** the deadline model is PER-(CASE, PARTY) — each party's response clock
computes from its own service date."* Heading attribution: *"**all rulings Michael's**, 2026-08-13
Central, by widget or direct words."* HIS WORDS ✓.

### A-3 `H22` heartbeat (L112) — SURVIVES
(1) **1 interrogative**, answered. Collision test: `HD-22` → register 2 hits, **0 row-starts**
(`grep -c '^- .*HD-22'` = 0); both hits are header/notes at L3 and L314. The disclosures `H22` is an ID,
not a row — the sheet's statement is exact.
(2) #66: *"**H22 RULED:** registry verification interleaves BY BUILD URGENCY — whatever a ruled slice
needs is verified first, regardless of series."* HIS WORDS ✓ (via #66's blanket attribution).

### A-4 OAA demographics (L133) — SURVIVES
(1) **1 interrogative**, both halves. Row's own text closes it: *"the question CLOSES."*
(2) #66: *"**DEMOGRAPHICS RULED** (closes the 2026-07-25 spec-feedback question, both halves): the
software **CAPTURES BOTH** sex and race/ethnicity on both intake paths … **Cause-number-pending reminder
RULED YES**."* HIS WORDS ✓.

### A-5 `PF-2` (L518) — SURVIVES (cleanest in the block)
(1) **1 interrogative** (counted twice by the scanner because the row states it and then repeats it as
"Full text"). No other limb.
(2) #126 item 4: *"**The `#118` proposal — "Adopt as standing."** New binding convention, RR-1 family."*
Heading: *"every ruling that does not depend on tomorrow's §4.5 evidence was put to Michael."* And the
runner's own note at live-log 1784: *"**For Michael:** the register currently carries an open row whose
question was answered tonight; **one word closes it in the next batch.**"* HIS WORDS ✓.

### A-6 `V-5` (L650 🟡) — SURVIVES
(1) **1 interrogative** — *"split each into one entry per case, or keep them joint?"* Ruled and
EXECUTED: live log L5170 — *"fifty-first (`49ffe8f`, 00:19 Central) executed V-5, V-6 and V-7 as #96 …
six V-5 split notes present"*; L5282 — *"**V-5 EXECUTED** — three joint entries became six."* Residue
rowed: `V5-IDS` L606, `V5-ATTRIB` L607 (both present, `⬜`).
(2) #73 heading: *"RULING RUN, V-4 THROUGH V-8, ONE AT A TIME … (**Michael ruled every one**)"*; body:
*"**V-5 — SPLIT ALL THREE two-case entries**, one entry per case."* HIS WORDS ✓.
*Note (LOW, not a finding):* the row still states *"16 REMAIN UNVERIFIED after the 2026-08-17 walk"*
where BUILD-STATE at HEAD says **12**. Stale figure riding onto a ✅ row; worth a line in the closure.

### A-7 `V-6` (L667 🟡) — SURVIVES
(1) **2 interrogatives**, both ruled (*"BOTH STAY IN THE REGISTRY, REWORDED"*). Executed as #96 (same
line as A-6). Entries 33/34 verified: #98 — *"**24 ENTRIES VERIFIED** (verified-by Michael, 2026-08-17)
… criminal 28, **33, 34**."* Residue home `Q-T19-4` present at L612 and squarely on art. 27.18.
(2) #73, *"Michael ruled every one"*. HIS WORDS ✓.

### A-8 `T-26` (L745) — SURVIVES
(1) **0 interrogatives** — an act row. Act done: #108 body — *"T-26 RAN, LIVE, AND CLOSED … **ENTRIES 13,
2 AND 29 VERIFIED — his word, dated 2026-08-18**."* Successor act's own row closed at #110 (live log
L3799: *"the five-entry one-look verification — is **CLOSED, completed at #110**"*).
(2) HIS WORD ✓ ("his word, dated 2026-08-18"). Basis is an ACT, not a ruling → contributes to FINDING 2.

### A-9 `Q-AUTH-1` (L777) — SURVIVES (evidentiary note)
(1) **1 interrogative** — *"Do you authorize the read?"* Row's own hold: *"the row stays ⬜ **until the
read actually lands**."* Landed: #117 — *"**`Q-AUTH-1` IS EXECUTED: *EX PARTE PHARR* AND *HURLBURT v.
STATE*, BOTH READ IN FULL, BOTH POSITIVELY IDENTIFIED UNDER V-9's SECOND LIMB**."* Residue homes read
whole and confirmed: `Q-RL6-1` (L757, 4,103 B — *"Your selection is unchanged and still yours"*) and
`Q-RL6-2` (L758 — *"Do you want a separate targeted search, or does entry 30 stay cite-less?"*).
`Q-PH-1..5` rowless by ruling — register L3: *"took **NO durable IDs and NO rows, on his ruling**."*
(2) **Evidentiary note:** #106's BODY does not contain the Q-AUTH-1 ruling text; only its heading names
it (*"four adjacent rows ruled (Q-RE-1, Q-COM-2, Q-AUTH-1, Q-IN2-1)"*), pointing at
`fc-adjudication-record-2026-08-18.md` — **not staged**. The verbatim *"Yes — both limbs"* the register
row attributes to him is therefore UNVERIFIABLE-HERE (grep for the string across all four sources: 0).
The sheet does not rely on that quote — it cites #117's execution text — so the verdict stands, but the
closure sentence should say the #106 words live in an unstaged record.

### A-10 Tex. Fam. Code (L59, struck) — SURVIVES
(1) **0 interrogatives**; row already struck through. The one carried lesson is expressly homed
elsewhere (*"already baked into the ruled O6 decomposition"*).
(2) Archive L4516, character-exact: *"**Family law REMOVED as a practice line.** Michael: *"I am not
going to be practicing family law… Delete it."*"* — followed by the operative refinement, quoted in full
in #9. HIS WORDS ✓, and the #9 caveats (family considerations RETAINED as cross-cutting flags) live in
#9, not on this row.

### A-11 Placeholder-discipline carry (L214) — SURVIVES; FINDING 2
(1) **0 interrogatives** — a carry with a condition: *"it rides whichever future session next amends
`form-engine.md`."* Condition met: #63 heading — *"**REQ-10 fold EXECUTED (form-engine §14)**"*; body —
*"REQ-10 FOLD EXECUTED (the carry confirmed 08-12 closes): placeholder discipline enters form-engine.md
as new §14."*
(2) Basis is an ACT. BUILD-STATE stale line confirmed at HEAD, exactly as the sheet says:
*"**REQ-10 placeholder discipline: CONFIRMED AS CARRY.**"* (1 occurrence.)

### A-12 `WS-P1` (L388) — SURVIVES; FINDING 2 + FINDING 8
See FINDING 8 for the full evidence and sequencing.

### A-13 `O-8` (L409) — SURVIVES; FINDING 2
(1) **1 interrogative**, answered by an act; the row already reads *"~~OPEN~~ **CLOSED 2026-08-19:
Michael upgraded the database the same night.**"* Its one forward pointer (*"see `O-10`"`*) resolves —
`O-10` present in the register (5 hits).
(2) Basis: **Michael's ACT**, not his ruling.

### A-14 `O-9` (L410) — SURVIVES; FINDING 2
(1) **1 interrogative**, expressly MOOT on the row's face; *"Recorded rather than deleted: the question
was real for about an hour."* Nothing unique.
(2) Basis: MOOTNESS BY EVENTS.

### A-15 `TC-OPEN-5` (L467) — SURVIVES; FINDING 2
(1) **0 interrogatives** — an act with a sequence and a reporting duty (*"Report the real reading — a
large miss is itself a finding"*). Both discharged: #133 Correction 2 heading — *"the picker-order note
now has an origin exhibit, written by the session that wrote the rule"* — and its body records the
mis-ordered click and *"took it to **72.6%**"*.
(2) Basis: an ACT of his + a recorded measurement.

### A-16 `TC-OPEN-6` (L472) — SURVIVES; FINDING 2 + FINDING 7b
(1) **0 interrogatives.** Destination correction confirmed: #133 Correction 4 heading — *"the fifteen
captures' ruled destination is **Michael's machine, not the ARCHIVE project**"* — quoting #107's second
limb, *"the ARCHIVE project **or his machine**, never the repo."* The row's own method line named ARCHIVE;
the correction is on the record and the sheet carries it.
(2) Basis: an ACT. Removal step UNVERIFIABLE from the staged files (see 7b for the live-field
corroboration, labelled non-staged).

### A-17 `TC-OPEN-7` (L473) — SURVIVES; FINDING 2
(1) **0 interrogatives.** v26 paste corroborated indirectly but decisively: #133 (2026-08-22) quotes
v26's live text four separate times as then-in-force — *"instructions **v26's operational note** states
only that picker-exclusion order…"*, *"instructions **v26**, MODEL USAGE, practical notes: …"*,
*"makes instructions **v26's start-of-session rule 4** wrong"*. A session cannot quote an unpasted
edition's live text. Superseded by v27 then v28 (#140).
(2) Basis: an ACT of his.

### A-18 `RE-LOOK-3` (L882) — SURVIVES; FINDING 2
(1) **1 interrogative** — *"Should a clean-authority TDRPC PDF be added to `Documents\Knowledge Repo\`?"*
Mooted by the act: #106 — *"Michael acquired six documents by hand mid-session (**TDRPC eff. 3/7/2025**;
…)."* The row's stated dividend also landed: BUILD-STATE — *"**`Q-RE-9` — the convention's first proven
gap — CLOSES with it.**"*
(2) Basis: an ACT of his.

### A-19 privilege-tier migration (L1249) — SURVIVES; FINDING 2
(1) **0 interrogatives** — Michael's-hand act. Run: #113 §"3. `db/migrations/2026-08-16-privilege-tier-
no-default.sql` — **ran clean, THIRD**", with the C1–C5 check table. Both honest limits verified present
in #113 and correctly carried by the sheet: *"**C2 IS SATISFIED TRIVIALLY, NOT MEANINGFULLY**"* (neither
table has any row) and *"**The file's check 4** (insert-a-null …)"* not run.
(2) #113 heading: *"all three pending live migrations RUN AND VERIFIED by **Michael's hand**"*. Basis is
an ACT.

### A-20 v23 INSTRUCTIONS (L1248) — SURVIVES (strongest independent corroboration in the sheet)
(1) **0 interrogatives** — one act, restated three times across the row's annotations as "the paste."
(2) Every leg checked at HEAD:
- #140 (newest design entry, live log L64): *"the **v28 instructions IN FORCE** (read live in the
  project-instructions field — BUILD-STATE's 'whether the paste happened is not observable from the
  repo' is answered design-side: **it happened**)."*
- BUILD-STATE at HEAD, 1 occurrence: *"**~~PASTE v28~~ — REPORTED DONE:** `#140`'s design session read
  the instructions field live on 2026-08-31 and found v28 IN FORCE, so this long-carried hand item comes
  OFF your list on the design side's attributed read"* … *"**THE HAND ITEM IS THEREFORE OFF THE LIST**."*
- The one stale contrary line the sheet names, confirmed at 1 occurrence: *"the convention lives in the
  project instructions and **the amendment rides the v23 paste**."*
- **Independent, outside the staged set:** the v28 text is readable in this session's own
  project-instructions field, and it carries **both** restored items — `PF-1` as a Binding-conventions
  bullet after ROUTE-C, and SOURCING's fourth named channel (FC-14). The row's entire ask is
  discharged. (Non-staged observation, labelled as such.)
- **Superseded-by-newer check:** the 84th invocation (live log L228) still reads *"until it lands v27 is
  in force."* Heading order confirms #140 (L54) is NEWER than the 84th (L200); the sheet is reading the
  newest word, not the stalest.

---

## BLOCK B

### B-1 `FE-4` (L185) — SURVIVES
(1) **1 interrogative**, ruled at `form-engine.md` §13.1. All six residue rows exist and are `⬜`:
`Q-FE4-1` … `Q-FE4-6` (row-start counts 2,1,2,3,1,1; `Q-FE4-7` = 0, i.e. the series ends at 6 as the
row states). Build home rowed at `Q-FE4-2` (L946).
(2) Ruling attribution: #53, *"Michael ruled each item with the recommendation."* HIS WORDS ✓.
**Re-attribution independently confirmed:** the "row stays ⬜" posture is **Claude's, not his** —
`a spec is not a closure` occurs 5× register / **2× live log**, and both log hits (L7058, L7466) sit in
Code/design-session text; #81's heading is *"(design session, **Opus 5**, Cowork)"* and its body reads
*"They are open **because the BUILD is gated**, not because the design question is unanswered."* No
Michael attribution anywhere. The sheet's tiebreak framing is exact.

### B-2 `FE-6` (L187) — SURVIVES
(1) **1 interrogative** (the never-asked sub-question), answered in terms at §13.3 — *"each standalone
instrument **REPEATS** the definitions block in full, no incorporation by reference."* All seven
`Q-FE6-1..7` rows present.
(2) #53, same attribution as B-1. HIS WORDS ✓. Same Claude-posture tiebreak, correctly identified.

### B-3 `CD-1` (L228) — SURVIVES
(1) **1 interrogative** — the fork — ruled at #51 (*"`parties` **IS** the contact directory … SEPARATE
TABLES WITH LINKS"*), built #61, complete #113.
**Destruction test on the pointer sentence, the sheet's whole tiebreak:**
| phrase | reg | log | arch | BS |
|---|---|---|---|---|
| `stays open as the living-spec pointer` | **1** | **0** | **0** | 0 |
| `living-spec pointer` | **1** | 0 | 0 | 0 |
| control `living spec` (-i) | 5 | 1 | 3 | — |
Confirmed: the sentence exists **only** in the register row and is **not** in #51 — the hardening's
"part of the same #51 ruling" is literally false at HEAD, exactly as the sheet says. Revisit-IDs
confirmed live: `CD-13` (3 reg / 3 log / 2 BS), `CD-14` (2 reg / **15** log / 2 BS).
(2) #51 heading: *"**Michael ruled every part** with the recommendation, one by one."* HIS WORDS ✓.

### B-4 `P-COM-2` / `-3` / `-4` (L840–842) — SURVIVES, with the sheet's own caveat intact
(1) **0 interrogatives in all three** — they are registry-proposition status lines, exactly as the sheet
says. ID test:
| ID | reg | log | arch | BS |
|---|---|---|---|---|
| `P-COM-2` | 1 | **1** | 0 | 0 |
| `P-COM-3` | 2 | 0 | 0 | 0 |
| `P-COM-4` | 2 | 0 | 0 | 0 |
| control `P-COM-1` | 3 | 3 | — | — |
The single `P-COM-2` log hit is **the hardening's own report of the zero**, quoted inside a recent entry
(live log L511: *"`P-COM-2`/`-3`/`-4` return ZERO in both logs"*). Substantive hits: zero. The sheet's
claim is correct; the control is worth stating because a naive count reads 1, not 0.
(2) Substance confirmed. #94: *"Michael ruled **the three TRCP propositions** (192.5(d)
assertion-is-privilege; 192.5(c)(1) witness-statement exception; 192.3(h) substantially-verbatim
definition, notes are not a statement) into `legal-rule-registry-discovery-enforcement-and-pleading.md`,
**ALL UNVERIFIED**."* #98: *"**24 ENTRIES VERIFIED (verified-by Michael, 2026-08-17)** … work-product
**WP-1/2/3** (labels packet-local — numbering DEFERRED, D-6)."* Rule-for-rule the three match the three
register rows. HIS VERIFICATION ✓.
**Residual risk the sheet already names and should keep naming:** verification attaches to WORDING
(ROUTE-C). Closing an `UNVERIFIED`-marked row on the ground that a differently-labelled registry entry
is VERIFIED asserts that the row's quoted rule text IS the verified wording. The registry files are not
staged, so that identity is UNVERIFIABLE-HERE — which the sheet says in terms.

### B-5 `TOC-5` (L809) — **FINDING 4 (MED)**
Evidence in the finding above. Attribution leg is clean and honest: the sheet says *"never ruled by
name — superseded by events"*, which the toc's own footer confirms twice at HEAD.

### B-6 `Q-PR3-3` (L888) — SURVIVES
(1) **1 interrogative** — *"in what order do PR-3 and the CD-1 item-7 migration run?"* Spent by an act
of his: #113 ran CD-1 with PR-3 unexecuted and *"**Backfill step (c) matched zero rows**, so no row took
that derivation and **the failure did not occur**."* The row's one coupling (`Q-PR3-2`, the
`sideSetFor()` fall-through) has its own row at L887, `⬜`.
(2) **Attribution, checked because the sheet stakes its tiebreak on it.** The reserving sentence is at
live-log L3453–3454, character-exact: *"The backfill limb of `Q-PR3-3` is spent. **Whether anything
remains in it is Michael's; the row is annotated, not closed.**"* Its entry is #113, heading *"(design
session, **Opus 5**, Cowork, typed)"* — a SESSION's sentence, not his word. The sheet says exactly this.
✓ Corroborated at HEAD: BUILD-STATE — *"**THAT ORDER HAPPENED, AND THE FAILURE IT WARNED OF DID NOT
(#86 → #113; `Q-PR3-3` ANNOTATED, STILL OPEN)**."* The "STILL OPEN" is likewise a runner posture.

### B-7 `Q-STAT-6` (L1004) — SURVIVES
(1) **0 interrogatives** in a 4,663 B row; its question is stated declaratively (*"The divergence
findings and what happens to them"*), and the row's last sentence is the disconfirmation to beat:
*"**Nothing above changes the question this row asks**, which is what becomes of divergences generally."*
Test: does the general question have another home? **Yes, and the row itself names it** — *"the scope
question that governs them is now its own row, `READ-A`, deferred with the conservative default."*
`READ-A` is L605 and stays open under D-2. The second cross-reference (`Q-T19-2`, *"the two rows should
be read together"*) is spent: #98 closed `Q-T19-2` (*"ROUTE-C fired five times, each ruled
independently, all five wordings adopted"*).
(2) BUILD-STATE quote verified character-exact, 1 occurrence: *"**`Q-STAT-6`'s EIGHTEEN ARE NOW NONE
LIVE, AND THE ROW STILL STAYS OPEN.**"* The "STAYS OPEN" is a runner sentence — the sheet says so.
**Flag for the closure sentence, not a finding:** BUILD-STATE's own hand list at HEAD still carries
*"**`Q-STAT-2` – `Q-STAT-6`**"* among items awaiting him. Belongs on the §3.7 stale-line list.

### B-8 `Q-STAT-3` (L1001) — SURVIVES
(1) **1 interrogative** — *"Do you want the capture's §2 annotated as superseded, or left untouched…?"*
Premise dissolved: the capture (`claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md`, dated
2026-08-14) fell inside #107's class ruling — *"**RULED (Michael):** retire all session captures dated
**≤ 2026-08-16** (42 docs) … **home is the ARCHIVE project or his machine, never the repo** … All 44
verified gone."* Confirmed absent from the live project-doc list (non-staged observation). The
"annotate" branch is therefore no longer executable by a design session.
(2) HIS RULING ✓ (#107, *"RULED (Michael)"*). The sheet's narrowing — *"RELOCATED, not deleted … so the
stated hazard is narrowed, not zero"* — is correct and is the honest reading.

### B-9 email constraints (L282) — **FINDING 3 (MED)**
Evidence in the finding above. Attribution leg is clean: #63, *"All rulings Michael's."*

---

## BLOCK C

### C-1 `FE-5` (L186) — SURVIVES (subject to FINDING 5)
(1) **1 interrogative**, and the sheet quotes the ruled middle path with the clause the 08-24 audit
truncated intact — verified character-exact against L186: *"escalates to a warning **only when the
worst-case crosses the cap while the numbered count does not**."*
**Destruction test on the two limbs the sheet re-mints:**
| phrase | reg | log | arch |
|---|---|---|---|
| `pairwise and cumulative` | **1** | **0** | **0** |
| `no cap to look up` | **1** | **0** | **0** |
| `cap = f(level)` | 1 | 1 | 0 |
| control `WESTLAW-5` | 5 | 7 | — |
Both register hits are L186 itself (`grep -n | cut -d: -f1` → `186`). So the CLOSE-SPLIT is **necessary**,
not decorative — a plain CLOSE here would destroy two register-unique findings. `Q-FE5-1` (L951) and
`Q-FE5-9` (L959) confirmed present and staying.
(2) #53, *"Michael ruled each item."* HIS WORDS ✓.

### C-2 `CD-2` (L229) — **FINDING 6 (MED)** on limb (b); limb (e) SURVIVES
(1) **1 interrogative**, ruled into `contact-directory.md` §4/§5 at #51, built #61.
Limb (e) uniqueness: `carrier-ID and financial-responsibility` → reg **1** / log 1 / arch 1 — the
register hit is L229; re-minting is right, and #64's *"PROPOSED only … nothing was added"* confirms it
was never put.
Limb (b): see FINDING 6.
(2) #51, *"Michael ruled every part with the recommendation, one by one."* HIS WORDS ✓.

### C-3 `V-7` (L684 🟡) — SURVIVES (subject to FINDING 5)
(1) **1 interrogative**, ruled and executed as #96. The surviving limb is on the row's own face and is
the only open home: *"**The operative blocker is now PROPOSITION-LOCATION: entry 24's proposition has
never been located inside the Devine opinion**, so the next act on that entry is not verification."*
The sheet re-mints it as a narrow ACT row — correct, and CLOSE without the split would destroy it.
(2) #73, *"Michael ruled every one"*; body: *"Rejected: V7-23-CITE — entry 23's cite stays § 37.001 et
seq."* HIS WORDS ✓.

### C-4 `OPEN-5` (L990) — **FINDING 1 (HIGH)**
Evidence in the finding above. Limb (a)'s closure and limb (b)'s re-mint are both correct and verified:
#82 (2026-08-15, *"rulings Michael's … item by item"*) ruled A-1–A-6 (= AUD-1, 5, 6, 7, 8, 9) and #94
recorded his *"Yes — ride the v9 amendment."* The defect is confined to the third limb.

### C-5 `Q-COM-10-E` (L767) — SURVIVES (subject to FINDING 5)
(1) **0 interrogatives** in the scanner's sense; the row's ask is the imperative *"**Confirm or
substitute**."* Premise spent: `Q-COM-10-A` ruled Option 2, three values, so **there is no fourth
value**. The surviving half is the boolean's TOKEN, which the sheet re-mints.
(2) **Attribution is exactly right and is the reason the split is needed.** #105, Michael's verbatim
picks are quoted in the log: *"(pick verbatim: **"Purpose-scoped + precedence"**)"* and *"(pick verbatim:
**"Option 2: 3 values + boolean"**)."* **He never named the token.** `witness_statement` is the session's
option text. HIS WORDS ✓ for the closure; correctly withheld for the re-mint.
*Detail worth carrying into the re-mint:* the row proposes `'witness-statement'` (hyphenated, a CHECK
enum value) while the ruled artefact is a `witness_statement` **boolean column** — different objects,
which is precisely why the naming question survives.

### C-6 `WESTLAW-5` (L613) — SURVIVES; **FINDING 7a (LOW)**
(1) **0 interrogatives** — an act row (five named pulls). Act done and over-delivered at #99, on the
row's own face. Its stated non-closure ground — *"**THE ROW DOES NOT CLOSE:** its consumers 30 and 31
still need your cite supply"*, repeated at #100 and #102 — is homed: `Q-RL6-1` (L757) is entry 31's cite
supply, *"OPEN, your act"*; `Q-RL6-2` (L758) is entry 30's, *"OPEN, your act"*. Both read whole.
**Unique-text test on the two V-9 provenance facts the sheet says the closure retains:**
| phrase | reg | log | arch | BS |
|---|---|---|---|---|
| `MEMORANDUM OPINION, Nov. 30, 2017` | **1** | 0 | 0 | 0 |
| `no public source could reach` | **1** | 0 | 0 | 0 |
| `Lang, J` | 1 | 1 | 0 | 0 |
| control `WESTLAW-5` | 5 | 7 | — | 0 |
Register-unique, and preserved by the append-only closure. The audit's proposed merge into `Q-RL6-*` is
correctly REJECTED.
(2) Basis is an ACT (#99). Classification defect only — see 7a.

---

## BLOCK D — THE OPPOSITE TEST: is there a later Michael word RELEASING the deferral?

### D-1 `WS-P4` (L391) — **DEFERRAL HOLDS. Zero later release, with control.**
Every `WS-P4` occurrence in the live log, by line: **3807, 3869, 3939, 3947, 4008, 4037, 4039** — seven
hits, all inside the 2026-08-18 block (the row was minted at L4037: *"FOUR NEW, all OPEN, all
Michael's — `WS-P1`, `WS-P2`, `WS-P3`, `WS-P4`"*). The latest is L4008: *"WS-P3 'Not stored yet' — still
open; **WS-P4 deferred**."* **Nothing above line 3807** — i.e. nothing after 2026-08-18 in a
newest-first log — mentions it. `grep -c 'WS-P4'` in BUILD-STATE = **0**.
Control: `WS-P1` returns 13 log hits over a wider span, so the grep reaches. **No release exists.**
Substance independently confirmed live: v28's trigger-#4 history lists firings on 2026-08-07,
2026-08-20 and 2026-08-21 and **omits 2026-08-18**, exactly as D-1 states. (Non-staged observation, read
from this session's own instructions field, labelled as such.)

### D-2 `READ-A` (L605) — **DEFERRAL HOLDS. Zero later release, with control.**
Every `READ-A` occurrence in the live log, by line: **5093, 5155, 5224, 5249, 5252, 5254, 5255, 5338,
5359, 5362, 5364** — all inside the #96–#98 block (2026-08-16/17). **Nothing newer.** BUILD-STATE
carries it once, on the hand list. `Reading A` = 5 log hits, 0 in BUILD-STATE; same window.
**The deferral is current binding law, verified two ways:**
- v28's ROUTE-C bullet, read live: *"Reading A's SCOPE remains expressly DEFERRED (put #93, deferred
  #95): the conservative default governs — it covers entries 1–3 only — and silence is not a ruling on
  the rest."* (Non-staged, labelled.)
- BUILD-STATE at HEAD refutes the audit's superseding ground in terms: the #108 direction *"**is a ruled
  DIRECTION, not a binding convention** … applying it to any EXISTING entry is a per-entry ROUTE-C act
  and **also yours**."*
**Sheet's stake numbers verified against BUILD-STATE at HEAD:** *"**Backlog 47 entries; 35 verified, 12
not.**"* The sheet's "backlog 47, 12 unverified" is exact.

### D-3 `PR-3` (L71) — **HOLD HOLDS. Zero later release, and re-asserted at HEAD.**
Latest substantive `PR-3` log mentions are #113 (L3450, the `Q-PR3-3` consequence) and #86 (L6681ff);
nothing releases the hold. **BUILD-STATE at HEAD re-asserts it verbatim:**
> *"PR-3 direction CONFIRMED (V17: own practice area, own ladder(s), companion concept gone),
> **EXECUTION HELD** until the ladder pass names the destination; that pass is **DEFERRED pending the
> Domser matter** and **PL-1..PL-4 are all UNRULED. Do not touch the case-type tree or ladder.**"*
**Orphaning test confirmed by reading both dependants whole:**
- `D-CL1-3` (L172): *"**D-CL1-3 is gated on PR-3 alone.**"*
- `O-2` (L400): *"**Rides the PR-3 ruling already in this queue.** — **OPEN, rides PR-3**"*
Both name PR-3 explicitly; the unblock condition (*"the **letters-issued arc capture** from the Domser
matter, plus a rescheduled pass"*) exists nowhere else. The sheet's disposition — stays, annotated with
the #113 events, CLOSE-SPLIT available but HIS to choose — is correct and is the conservative reading.

---

## WHAT THIS PASS DID NOT ESTABLISH
Registry files, `form-engine.md`, `contact-directory.md`, `email-workflow-requirements.md`,
`fc-adjudication-record-2026-08-18.md`, `fable-adjudication-record-2026-08-18.md` and
`thin-constitution-restructure-2026-08-21.md` §4.1 are **not staged**; every claim depending on them is
marked UNVERIFIABLE-HERE above and was not counted for or against any verdict. Three observations are
drawn from this session's own live project-instructions field (v28 text; the 29-doc project list) and
are labelled non-staged throughout — offered as corroboration, never as verification. Blocks E, F, G and
H were outside this pass's scope and were not tested.
