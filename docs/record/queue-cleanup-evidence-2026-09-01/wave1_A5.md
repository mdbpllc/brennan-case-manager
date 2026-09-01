# WAVE-1 — verifier A5 report — SUPERSEDED slice (the other ten)

Read-only. Staged copies at HEAD `7f02131` (2026-09-01). Line numbers below are STAGED-copy line numbers
(register = `docs/specs/attorney-review-queue.md`; live = `docs/record/session-log.md`; BS = `docs/specs/BUILD-STATE.md`;
archive = `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`). Every quotation was copied from tool output
of the staged file, never retyped. Where a source line is hard-wrapped, the wrap is shown as a single space.

Collision check: none of the ten IDs appears in `id-collision-report.md` as a collision (`SK-v2` is listed there only as
"⬜ row exists (line 1241) — not a gap"). Positive controls for every zero-count are stated in each block.

**Standing note for the whole slice — what changed since the hardening (first ~600 lines of the live log = runner 85,
`#140`, runner 84, `#139`, runner 83, `#138`):** the only slice subjects touched are the v23/v28 instructions row and
`SK-v2`. `READ-A`, `Q-COM-10-E`, `TOC-3`/`GLR-2`, `RE-LOOK-3`, `Q-PR3-3`, `Q-STAT-3`, `Q-STAT-6` and the 2026-08-16
migration each return ZERO in lines 1–600 (control: `PF-1` → hits at lines 170 and 353; `v28` → lines 64, 228, 345).

**A provenance caveat used in two blocks (READ-A, v23):** the live project-instructions field is NOT a staged file.
Where the brief asks about v28's content I answer UNVERIFIABLE-HERE from the staged set, and then — clearly labelled —
report what the project-instructions text supplied to this verifier's own session context says (it is headed
`v28 — 2026-08-31`). The adjudicating design session can discharge that read itself in one look; I do not count it as
staged-file evidence.

---

### READ-A (L605)

**1. Row, whole (1,339 B, one line).** Interrogatives, verbatim:
> "**READ-A — NEW 2026-08-16 (#95). Michael's, expressly DEFERRED rather than answered: how far does Reading A reach?**"
> "**The open question is scope: does Reading A govern the whole 40-entry backlog *(figure conformed 2026-08-17 per `D-2` … OPEN-5(a))*, or only entries 1–3 where it was first applied?**"
Ruled text in the row: "**Ruled 2026-08-16: deferred — the conservative default continues to govern, so Reading A covers entries 1–3 only, and other entries' divergences wait for their own test.**" Stake stated in the row: "it decides how much of `Q-STAT-6`'s eighteen divergences ever need conforming wording."

**2. ID locations.** live 11 lines / 11 flat (5093, 5155, 5224, 5249, 5252, 5254, 5255, 5338, 5359, 5362, 5364 — all
2026-08-16/17, entries `#96`, runner 50, `#95`-era runners; NONE after `#98`); archive 0 / 0 (control: `Reading A` → 0 in
archive too; `SK-v2` → 17 in archive, so the archive greps work; the ID was minted 2026-08-16, after the archive cutoff);
BS 1 (L152, the hand list); register 6 lines / 9 flat (L603 V-2 annotation, L604 V-EXEC, L605 the row, L1004 Q-STAT-6,
plus two more mentions).

**3. Decisive sentences.**
- live L5386–5388, entry `## 2026-08-16 (#95) — WORDING ADJUDICATION: execute-then-verify RULED for Task 19, six registry`:
  > "- **READING A'S SCOPE: DEFERRED, expressly.** The conservative default continues to govern — Reading A covers entries 1–3 only; other entries' divergences wait for their own test. The row is annotated, not closed."
- live L5359, runner 50 (`## 2026-08-16 — QUEUE-RUNNER batch (runner line; FIFTIETH invocation)`):
  > "**Reading A's scope existed nowhere in the register at all.**"
- live L5338, entry `#96`: "`READ-A`'s deferred scope was NOT reopened;"
- BS L108 (the audit's own superseding ground, read in full):
  > "**It is a ruled DIRECTION, not a binding convention — putting it in the project instructions fires trigger #3, and that is yours.** **Applying it to any EXISTING entry is a per-entry ROUTE-C act and also yours**"
- live L3979–3982, entry `## 2026-08-18 (#108) — T-26 RUN LIVE: THREE GROUP A ENTRIES VERIFIED AND TWO CONFORMED VERBATIM AT`:
  > "- A STANDING DRAFTING DIRECTION RODE THE SAME EXCHANGE, RULED: registry Rule lines quote operative text VERBATIM where practicable; condensation only where the rule is too long or the entry deliberately states one limb, flagged as such. Direction, not a binding convention — if it is to enter the project instructions, trigger #3 fires then."
- BS L152 (hand list, at HEAD): "**`READ-A`**" is carried as Michael's.
- BS registry heading at HEAD: "## The registry — FOUR files, backlog 47, THIRTY-FIVE VERIFIED — and the ruled-wording tail is EMPTY" and "backlog **47 / 35 verified / 12 not**".

**4. Whose words.** The deferral is MICHAEL'S RULING as recorded by the `#95` Fable session ("DEFERRED, expressly"; the
register row: "Ruled 2026-08-16: deferred"). His verbatim deferral sentence is not quoted anywhere staged — the record
carries the ruling, not his words. The audit's superseding ground (the `#108` direction) is Michael's ruling too, but the
record says three times it is a DIRECTION not a convention, and that applying it to an existing entry is a per-entry
ROUTE-C act of his.

**5. Since the hardening.** NOTHING on `READ-A`/Reading A in live L1–600 (0 hits; control above). BUILD-STATE at HEAD
still carries `READ-A` on the hand list (L152). v28 check: UNVERIFIABLE-HERE from staged files. Context observation
(not staged evidence): the project-instructions text in this verifier's session context, headed `v28 — 2026-08-31`,
carries in its ROUTE-C bullet: "Reading A's SCOPE remains expressly DEFERRED (put #93, deferred #95): the conservative
default governs — it covers entries 1–3 only — and silence is not a ruling on the rest." — i.e. the deferral is carried
forward into v28 unchanged, exactly as the hardened audit found for v27.

**6. DISCONFIRM (strongest case the disposition — SUPERSEDED — is wrong).** (a) The deferral is a live binding-convention
sentence ("silence is not a ruling on the rest") — closing the row by supersession would contradict the instructions
text that governs the session doing the closing. (b) The audit's ground is false at HEAD: the `#108` direction does not
"govern every entry" — BS L108 says applying it to any EXISTING entry "is a per-entry ROUTE-C act and also yours".
(c) The stake the audit calls spent (Q-STAT-6's eighteen) IS spent — but the row's own question is the WHOLE backlog
("does Reading A govern the whole 40-entry backlog"), now 47 entries with 12 unverified (BS at HEAD); the question is
about future divergence tests, not the eighteen. (d) Unique text: "how far does Reading A reach" → register 1 / live 0;
"conservative default continues to govern" → register 1 / live 1 (`#95`); "wait for their own test" → register 1 / live 1.
The row is the ONLY register home of the scope question (runner 50: "existed nowhere in the register at all").
The strongest case FOR closing: the practical stake has shrunk to near zero (no flagged divergence is live; ROUTE-C
standing plus the `#108` direction now govern every future material divergence). That is an argument for putting the
question to Michael cheaply, not for closing it without him.

**7. PROPOSED: `MICHAEL-IN-WORDS` — confidence HIGH.** He deferred it expressly at `#95` and the deferral is carried as
binding text through v28; only his word moves it. Suggested framing for the sheet (CC-1(a)): "Reading A's scope — the
eighteen it was opened for are all dispositioned; backlog is 47 with 12 unverified; does the conservative default
(entries 1–3) stand, or is Reading A general?" — noting that a "general" answer changes the v28 ROUTE-C bullet and fires
trigger #3.

**8. Row line identity.** First (only) line begins:
`- ⬜ **READ-A — NEW 2026-08-16 (#95). Michael's, expressly DEFERRED rather than answered: how far does Reading A reach?**` — that opening string occurs exactly once (`grep -c -F` = 1); the full 1,339-byte line occurs exactly once (`grep -c -F -x` = 1).

---

### Q-COM-10-E (L767)

**1. Row, whole (622 B, one line).** Interrogative, verbatim:
> "**`Q-COM-10-E`** — **The fourth value's exact token.** Proposed `'witness-statement'` (matches the existing lowercase-hyphenated convention; names the 192.3(h) character rather than the 194.2(b)(9) consequence). Alternatives considered and rejected: `'initial-disclosure'`, `'witness-statement-disclosable'`, `'discoverable'` (collides with `transcripts.discoverable_flag`). **Confirm or substitute.**"
Trailing annotation (runner, 59th invocation): "*(**UNBLOCKED 2026-08-18 (#105)** by `Q-COM-10-A`'s ruling — the Option 2 shape, three values plus a `witness_statement` boolean, now governs the answer. Still OPEN; Opus lane.)*"

**2. ID locations.** `Q-COM-10-E`: live 0 / flat 0; archive 0 / 0; BS 0; register 1 (L767 only). Positive controls that
fired: `Q-COM-10-A` → live 8, BS 4, register 9; `Q-COM-10-B` → live 4 (L4177, L4213, L4363 …); `Q-COM-10` → live 28 / flat 32.
The log never names `-E` individually; it names the sub-series as "`Q-COM-10-B`–`F`" / "Q-COM-10-B through -F".
Collision report: no entry.

**3. Decisive sentences.**
- live L4207–4213, entry `## 2026-08-18 (#105) — FABLE SPEND-DOWN ADJUDICATION: two items put, four limbs ruled — Q-AUDIT-1`:
  > "(b) **Option 2 — three values + a `witness_statement` boolean** (pick verbatim: **"Option 2: 3 values + boolean"**); WS-4's direction — the fourth state in both vocabularies — is satisfied. **CONSEQUENCE FLAG: the authored, UNRUN migration was drafted to the FOUR-VALUE shape and must be REDRAFTED to Option 2 before anything executes; it remains NOT AUTHORIZED and the run is Michael's hand.** Q-COM-10-B through -F are unblocked (Opus work)."
- live L4177, runner 59 (`QUEUE-RUNNER batch … FIFTY-NINTH`): "**`Q-COM-10-B`–`F` were annotated add-only as unblocked; none closed.**"
- register L763 (`Q-COM-10-A`, ✅): "**(b) Option 2 — three values plus a `witness_statement` boolean**, which expresses 'work-product AND owed as an initial disclosure' without precedence gymnastics … Pick verbatim: 'Option 2: 3 values + boolean.'"
- register L832 (`Q-COM-10` umbrella, ⬜): "**It closes only when he adopts the drafted unified value list** — including whether `transcripts`' `'privileged'` conforms to `'attorney-client'`, and the fourth value's exact token".
- BS L79: "**and the target is Option 2: THREE values plus a `witness_statement` boolean.** **`Q-COM-10-B`–`F` are unblocked**".

**4. Whose words.** The Option-2 pick is MICHAEL'S, verbatim: "Option 2: 3 values + boolean". The column name
`witness_statement` is CLAUDE'S option text (the pick names no column). "none closed" and "now governs the answer. Still
OPEN" are RUNNER statements (59th invocation), not rulings.

**5. Since the hardening.** NOTHING — `Q-COM-10`, `privilege_tier`, `witness_statement`, `witness-statement` all return 0
in live L1–600. BS at HEAD (L79, L151) still carries `B`–`F` as unblocked/open; the Option-2 redraft of the migration is
not recorded as authored anywhere at HEAD.

**6. DISCONFIRM.** Against CLOSE: (a) the runner that had the `#105` ruling in hand expressly declined to close E ("none
closed") — a considered Code posture, but not a ruling to keep it open; (b) "governs ≠ answers" (hardened audit) — yet for
E specifically the ruling does more than govern: under Option 2 there is NO fourth enum value, so the token question as
written has no referent. (c) Unique text: "The fourth value's exact token" → register 1 / live 0; "initial-disclosure" →
1 / 0; "witness-statement-disclosable" → 1 / 0; "collides with `transcripts.discoverable_flag`" → 1 / 0. The naming
rationale (name the 192.3(h) CHARACTER, not the 194.2(b)(9) CONSEQUENCE; avoid colliding with `discoverable_flag`) exists
nowhere else in the register — and it transfers whole to the boolean's name. (d) The boolean's column name is at present
Claude's text riding a ruled option; the Option-2 migration "must be REDRAFTED" and is not yet drafted, so if nobody rules
the name the redraft's author will choose it silently — the silent-decision class this register exists to prevent.
Against KEEP-as-is: the row's title asserts a fourth value that the ruling abolished; a reader at HEAD is misled.

**7. PROPOSED: `CLOSE-SPLIT` — confidence MED.** The enum-token limb closes on Michael's verbatim pick ("Option 2: 3 values
+ boolean" — there is no fourth value to name). Surviving limb, to be RE-MINTED narrowly: *"The `witness_statement`
boolean's token — the name is Claude's option text at #105, not a ruled name; confirm `witness_statement` or substitute
before the Option-2 migration is redrafted. The row's naming rationale carries over: name the 192.3(h) character, not the
194.2(b)(9) consequence; do not collide with `transcripts.discoverable_flag`."* Conservative alternative: `ANNOTATE-KEEP`
with the same substance as the annotation.

**8. Row line identity.** `- ⬜ **`Q-COM-10-E`** — **The fourth value's exact token.**` — occurs once (`grep -c -F` = 1);
the full 622-byte line occurs once.

---

### TOC-3 (L807) — read with its twin GLR-2 (L800)

**1. Row, whole (702 B, one line).** Interrogative, verbatim:
> "**Does Michael confirm the stable path, or does he want the project's dated convention applied here too?** **OPEN — PROPOSED, unruled (2026-08-16).**"
Premise in the row: "Staged at `docs/specs/session-log-toc.md`: **stable and unversioned**, deliberately breaking the `docs/specs/<topic>-<YYYY-MM-DD>.md` pattern used by one-time passes".
Twin, register L800 (`GLR-2`, ⬜): "**This is the same question as `TOC-3`** (the session-log finding aid, entered one invocation earlier) — whether pointer/derived docs take stable paths while one-time passes keep the dated `docs/specs/<topic>-<YYYY-MM-DD>.md` convention — **and one ruling closes both.**"

**2. ID locations.** `TOC-3`: live 3 (L5813 runner 47, L5873 `#92`, L6008 `#91`); archive 0 (control: `SK-v2` 17); BS 0
by literal (the hand list at L152 carries "the Task 17 index's five, now three" and "**`GLR-2` and `GLR-3`**"); register
2 (L800, L807). `GLR-2`: live 3 (L5809, L5812, L5874); BS 1 (L152); register 1 (L800).

**3. Decisive sentences.**
- live L5812–5813, `## 2026-08-16 — QUEUE-RUNNER batch (runner line; FORTY-SEVENTH invocation)`:
  > "`GLR-2` is **the same question as `TOC-3`**, entered one invocation earlier, and **one ruling closes both.**"
- live L6006–6008, `## 2026-08-16 (#91) — CHAT-DISPATCH TASK 17: the session-log table of contents`:
  > "- **PROPOSED, both parts.** Canonical path `docs/specs/session-log-toc.md` — **stable and unversioned**, because the doc **regenerates rather than appends** and a dated filename would accumulate stale copies of a finding aid. Michael has not ruled either. `TOC-3`, `TOC-4`."
- live L1715, `## 2026-08-21 (#132) — THE THIN CONSTITUTION EXECUTED` (the audit's superseding ground, read whole):
  > "`TC-3` the index **splits** — existence rows cost ~116 B/entry, abstracts ~739 B/row and all the 25 KB/day, so the cheap half stays synced and the expensive half goes where the log went. `TC-4` **`docs/record/`**, a new excluded directory; canonical paths change once, deliberately, *and it was ruled expressly WITHOUT first checking whether per-file picker exclusion works, so that the answer stops mattering.*"
- BS L152: "**the Task 17 index's five, now three** · **`GLR-2` and `GLR-3`**" — both carried open at HEAD.

**4. Whose words.** `TC-3`/`TC-4` are MICHAEL'S rulings (twelve rulings "PUT ONE AT A TIME" at `#132`) — on the SPLIT and
the DIRECTORY. The stable-vs-dated naming question is a CLAUDE PROPOSAL ("PROPOSED, unruled"; "Michael has not ruled
either"). "one ruling closes both" is a RUNNER statement, repeated in the `GLR-2` row.

**5. Since the hardening.** NOTHING on `TOC-3`/`GLR-2` in live L1–600. Practice continues unruled: runner 85 (live L46)
regenerated `docs/record/session-log-toc.md` again (thirty-sixth edition) at its stable name.

**6. DISCONFIRM (that SUPERSEDED is wrong).** (a) `#132` rules a split and a directory; no sentence in `#132` or the
`thin-constitution` rulings puts the naming convention to Michael. The stable name is a consequence of the runner's
practice, not a ruling — the row-82 / `CR-1` "never-ruled-at-all" shape the hardened audit named. (b) The record ties
`TOC-3` to `GLR-2` twice ("one ruling closes both"); the runbook (`GLR-2`) has no TC-* coverage at all, so closing `TOC-3`
alone splits a pair the record says is one question. (c) The row's premise IS partly overtaken: the file is no longer at
`docs/specs/session-log-toc.md` — `TC-4` moved it to `docs/record/session-log-toc.md` (a change of ADDRESS by ruling) and
the derived head `docs/specs/session-log-head.md` joined it; both live at stable names. (d) Unique text: "Canonical path
for the finding aid" → register 1 / live 0; "would accumulate stale copies of a finding aid" → 1 / 0; "does he want the
project's dated convention applied here too" → register 2 (this row and `GLR-2`) / live 0. The best case FOR closing:
Michael ruled `TC-5` "one synced file, not two" and the runner reads the restructure spec every batch — the paths are
de-facto settled by ruled practice. That settles the ADDRESS, not the CONVENTION the row and its twin actually ask.

**7. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: "`TC-4` (2026-08-21, `#132`) moved the index to
`docs/record/session-log-toc.md`; the head file `docs/specs/session-log-head.md` was added at a stable name by the same
sitting; neither `TC-3` nor `TC-4` ruled the stable-vs-dated convention for derived/pointer docs, which remains PROPOSED
and unruled. Twin `GLR-2` — one ruling closes both." For the sheet: put `TOC-3`+`GLR-2` to Michael as ONE one-word
question; a "stable paths for derived docs" YES closes both rows and is the cheapest closure in the slice.

**8. Row line identity.** `- ⬜ **`TOC-3` — Canonical path for the finding aid — PROPOSED, unruled.**` — occurs once; full
702-byte line occurs once. (Twin: `- ⬜ **`GLR-2` — Canonical path for the runbook — PROPOSED, unruled.**` at L800.)

---

### RE-LOOK-3 (L882)

**1. Row, whole (363 B, one line).** Interrogative, verbatim:
> "**`RE-LOOK-3` — Should a clean-authority TDRPC PDF be added to `Documents\Knowledge Repo\`?** **NOT RUN — Michael's hand, permanently: Claude cannot fetch binaries.** This is the smallest change that would let a future session cite the professional-conduct layer at `[A]` instead of `[B]`, and it would answer half of `Q-RE-9` without amending anything."
An ACT row (Michael's hand), not a ruling question.

**2. ID locations.** live 1 (L6358, entry `#88` — the row's origin: "`RE-LOOK-3` is the cheapest fix and is"); archive 0
(control: `SK-v2` 17); BS 0 (control: `FC-14` → BS 3); register 4 (L879 Q-RE-9, L882 the row, +2 mentions).
Audit's Michael quote "I just updated the Knowledge Repo with additional rules, including the TDRPC": occurs ONLY in the
audit file itself among staged files (0 in live, archive, BS, register) — its source (`fc-adjudication-record-2026-08-18.md`)
is not staged → the verbatim is UNVERIFIABLE-HERE. The ACT is corroborated independently below.

**3. Decisive sentences.**
- live L4131–4137, `## 2026-08-18 (#106) — FABLE FC-BLOCK ADJUDICATION`:
  > "- **FC-14 / trigger #3: SOURCING gains a FOURTH NAMED CHANNEL** — State Bar / court-published Texas conduct-and-administration rules as clean-authority PDFs in `Documents\Knowledge Repo\`, cited by each PDF's own effective date. Michael acquired six documents by hand mid-session (TDRPC eff. 3/7/2025; Rules of Disciplinary Procedure amends. eff. 10/1/2024; Rules of Judicial Administration amends. eff. 7/1/2026; Code of Judicial Conduct; judicial-candidate disciplinary rules 04/01/2026; rules of judicial education). Q-RE-9's unverifiable-citation wall falls with it."
- live L3637, `## 2026-08-18 (#112) — THE OPUS-RUN PASTE EXECUTED` (a later session READ the PDF over the bridge):
  > "TDRPC 1.04(f) from the State Bar PDF, FC-14's fourth channel."
- register L879 (`Q-RE-9`, ✅): "**RESOLVED 2026-08-18 (#106) — not by a direct ruling on this row but as a side effect of FC-14: SOURCING GAINS A FOURTH NAMED CHANNEL.** … Michael acquired six documents by hand mid-session (TDRPC eff. 3/7/2025; …)".
- BS L144: "**The fourth: State Bar / court-published Texas conduct-and-administration rules as clean-authority PDFs in `Documents\Knowledge Repo\`, cited by each PDF's own effective date.** Michael acquired six by hand mid-session."

**4. Whose words.** The acquisition is MICHAEL'S ACT, recorded by the `#106` Fable session and corroborated by `#112`'s
read of the PDF; `FC-14` is MICHAEL'S RULING (the `#106` record: "Michael's word per item, verbatim"). His own sentence for
the act is not in any staged file.

**5. Since the hardening.** NOTHING — `RE-LOOK-3` 0 and `TDRPC` 0 in live L1–600; `Knowledge Repo` appears once (L55,
`#140` bridge grant), unrelated. BS at HEAD unchanged on FC-14.

**6. DISCONFIRM.** (a) Whether the TDRPC PDF is in `Documents\Knowledge Repo\` today is a fact on Michael's machine —
UNVERIFIABLE-HERE, and H5 bars a sweep; but the record has two independent statements (acquired at `#106`; read from it at
`#112`), which is the same evidence class the register accepts everywhere for his-hand acts. (b) The row's two stated
purposes are both spent: `Q-RE-9` is ✅ and the channel that makes the PDF citable at `[A]` is ruled (FC-14). (c) Unique
text: "Should a clean-authority TDRPC PDF be added" → register 1 / live 0; "at `[A]` instead of `[B]`" → 1 / 0; "would
answer half of `Q-RE-9`" → 1 / 0 — all describe the act's purpose, none an open question. (d) Shared subject, NOT duplicate:
`RE-LOOK-1` (L880, ⬜ — read TDRPC 1.04/7.03 in the clean copy and establish CURRENCY from the publisher's own statement)
is a different act and is untouched by this closure; the PDF now exists to run it against. Nothing cuts against closure.

**7. PROPOSED: `CLOSE` — confidence HIGH.** The act was performed by Michael's hand 2026-08-18 (`#106`) and the channel that
makes it citable was ruled (FC-14); closure sentence should cite `#106` and `#112` and note `RE-LOOK-1` stays open on its
own terms. (The hardened audit's "clean" stands.)

**8. Row line identity.** `- ⬜ **`RE-LOOK-3` — Should a clean-authority TDRPC PDF be added to `Documents\Knowledge Repo\`?**` — occurs once; full 363-byte line occurs once.

---

### Q-PR3-3 (L888)

**1. Row, whole (1,724 B, one line).** Interrogative, verbatim:
> "**The question: in what order do PR-3 and the CD-1 item-7 migration run?**"
Annotation on the row: "**ANNOTATED 2026-08-19 (`#113`), ADD-ONLY — THE BACKFILL LIMB IS SPENT, THE ROW STAYS OPEN.** The CD-1 migration ran 2026-08-19 with PR-3 unexecuted, which is the order this row warned about. **Backfill step (c) matched ZERO rows** … **so no row took the plaintiff-defendant derivation and the "quieter failure" did not occur.** Nothing was re-keyed and nothing was resolved. Whether the row retains substance beyond the backfill is Michael's."
Coupling limb in the row: "**the migration order and the code default have to be answered together or the fix leaks.**"

**2. ID locations.** live 10 lines / 10 flat (L3165, 3305, 3401, 3405, 3408, 3449, 3453, 3599 — batch 66/67 and `#113`;
L6725 — `#86`, the origin); archive 0 (control: `SK-v2` 17); BS 2 (L30, L150); register 4 lines / 5 flat (L74 PR-3 row
annotation, L887 `Q-PR3-2`, L888 the row, +1).

**3. Decisive sentences.**
- live L3449–3454, `## 2026-08-19 (#113) — EXECUTION SESSION: all three pending live migrations RUN AND VERIFIED by` (design session, Opus 5, typed, Michael executing):
  > "**CONSEQUENCE FOR `Q-PR3-3`, WHICH NOBODY HAD TO ACT ON BECAUSE THE DATA WAS NOT THERE.** That unruled item warned that running CD-1 before PR-3 lets mis-parented probate rows take the plaintiff-defendant derivation with nothing later revisiting them — "the quieter failure is the one scheduled." **Backfill step (c) matched zero rows, so no row took that derivation and the failure did not occur.** The backfill limb of `Q-PR3-3` is spent. Whether anything remains in it is Michael's; **the row is annotated, not closed.**"
- live L3401, runner 67 (`QUEUE-RUNNER batch … SIXTY-SEVENTH`): "`Q-PR3-3` **ANNOTATED ADD-ONLY** with the packet's text verbatim — the backfill limb spent, step (c) having matched zero rows, **the row itself left OPEN**".
- BS L30: "**The backfill limb is SPENT. The row is ANNOTATED, NOT CLOSED** — it stays coupled to the `sideSetFor()` defect below, **which is untouched and still fails open for a fourth practice area**"; BS L150: "*(**`Q-PR3-3` is ANNOTATED, NOT CLOSED**.)*".
- register L74 (inside the `PR-3` row's `#86` annotation — the residue's OTHER home): "**(2) `Q-PR3-3`** — the unrun CD-1 item-7 migration derives caption alignment from a literal two-value IN list (`db/migrations/2026-08-12-cd1-contact-directory.sql:100`), so **PR-3-first flags re-keyed probate rows** while **CD-1-first (the currently scheduled order) silently gives them plaintiff-defendant and nothing revisits it**; **(3) `Q-PR3-2`** — `sideSetFor()` falls through, below."

**4. Whose words.** "Whether anything remains in it is Michael's; the row is annotated, not closed" is the `#113` SESSION'S
sentence (Claude, Opus 5), reserving the residual to Michael — it is NOT Michael's own deferral; the hardened audit's
"deferred-in-words" label overstates it by one degree. The ORDER was settled by Michael's ACT (he ran CD-1 first), not by a
ruling in words; `#113` says the item was "unruled" and "NOBODY HAD TO ACT ON" it.

**5. Since the hardening.** NOTHING — `Q-PR3-3`, `PR-3`, `sideSetFor` all 0 in live L1–600. BS at HEAD (L30, L150) still
carries "ANNOTATED, NOT CLOSED" (runner posture, carried three refreshes).

**6. DISCONFIRM.** Against CLOSE: (a) the record reserved the closing word to Michael, twice; a runner-side close would
violate that reservation (QR-6(e)). (b) The coupling limb — "the migration order and the code default have to be answered
together" — is half live: the code default (`sideSetFor()` fall-through) is untouched (BS L30). But that half IS
`Q-PR3-2` (L887, ⬜, its own row) — shared blocker, not a duplicate — and the sequencing summary also lives in the `PR-3`
row at L74. (c) A future PR-3 execution will find CD-1's one-shot backfill already spent, so re-keyed probate rows get no
caption derivation from it — that is PR-3's own execution design (the proposal at `pr-3-reparenting-migration-proposal-2026-08-15.md`,
not staged: UNVERIFIABLE-HERE) and `Q-PR3-2`'s UI-layer default, not a live limb of THIS row. (d) Unique text: "in what
order do PR-3 and the CD-1" → register 1 / live 0; "quieter ordering" → 1 / 1; the `:135–146` flag-insert cite and the
two-branch analysis exist only here — but they describe a fork that events have collapsed; closing (✅) keeps the row body.
Nothing in the row states a question that events left standing.

**7. PROPOSED: `CLOSE` — confidence MED.** Spent by Michael's own act at `#113` (CD-1 ran first; zero rows took the
derivation); the residue is `Q-PR3-2` plus the `PR-3` row's own annotation. Because `#113` reserved "whether anything
remains" to him, the sheet should put this as a ONE-WORD CONFIRM ("nothing remains beyond `Q-PR3-2`?") rather than a
runner-closable item; if he says something remains, it is the coupling and belongs in `Q-PR3-2`'s text.

**8. Row line identity.** `- ⬜ **Q-PR3-3 — a LIVE sequencing conflict with the UNRUN CD-1 migration.**` — occurs once;
full 1,724-byte line occurs once.

---

### Q-STAT-3 (L1001)

**1. Row, whole (1,362 B, one line).** Interrogative, verbatim:
> "**Q-STAT-3 — Annotate the 2026-08-14 capture, or leave it.** … **Do you want the capture's §2 annotated as superseded, or left untouched with this file carrying the correction?**"
Premise: "`claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md` §2 publishes a normalizer this pass proved wrong (staged file §3). It is a RAW CAPTURE in project knowledge … the practical risk says a future session RAG-hits the capture, not this file, and silently corrupts a quotation of primary law."
Annotation: "**ANNOTATED add-only 2026-08-15 (#79), ROW NOT CLOSED — the Fable audit recommends ANNOTATE (audit doc §6)** … **A recommendation, not a ruling.**"

**2. ID locations.** live 3 (L7783, L7830 — `#79`; L8231 — `#76`); archive 0 (control: `SK-v2` 17); BS 0 by literal (BS L144
"**Q-STAT-2 through Q-STAT-6 stay OPEN**"; BS L152 hand list "**Q-STAT-2 – Q-STAT-6**"); register 2 (L1001, +1).
Capture filename `Authority_Corpus_and_eCFR`: live 0, BS 0, register 1 (this row only) — the record never names the file
individually.

**3. Decisive sentences.**
- live L4048–4056, `## 2026-08-18 (#107) — PROJECT-KNOWLEDGE PRUNE (44 docs)` (design, Fable 5):
  > "- RULED (Michael): retire all session captures dated ≤ 2026-08-16 (42 docs) plus both root REQ-CAPTUREs of 2026-08-11, the latter conditional on confirmed reconciliation — reconciliation confirmed at #49 (pushed 40bdd42/13e5c1e) BEFORE deletion. All 44 zipped losslessly with a manifest (brennan-case-manager_retired-captures_2026-08-18.zip), byte-verified against the pre-deletion inventory, and delivered to Michael BEFORE deletion; home is the ARCHIVE project or his machine, never the repo. Then deleted from project knowledge via the Projects tool … All 44 verified gone."
- live L8231, `#76` (the capture's own session): "and RAW; it was **not** rewritten, and whether to annotate it is Michael's (queue item Q-STAT-3)."
- live L7830, `#79`: "Q-STAT-3 — ANNOTATE the capture's §2 (and its §3 Insurance observation) as superseded, original" (the Fable audit's RECOMMENDATION).
- BS L144: "**Q-STAT-2 through Q-STAT-6 stay OPEN**".

**4. Whose words.** The retirement is MICHAEL'S RULING ("RULED (Michael): retire all session captures dated ≤ 2026-08-16")
— on the CLASS, not on this row; `Q-STAT-3` was never put to him. The annotate recommendation is CLAUDE'S (`#79`).
The 44 are not listed by name in any staged file → that this capture was among them is established by the ruling's own
class definition (a `claude_` session capture dated 2026-08-14 ≤ 2026-08-16), not by a named inventory:
UNVERIFIABLE-HERE by name. Context observation (not staged evidence): the project-docs list supplied to this verifier's
session (29 docs) carries no `claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md`.

**5. Since the hardening.** NOTHING — `Q-STAT-3` 0 in live L1–600; BS at HEAD unchanged ("stay OPEN", hand list).

**6. DISCONFIRM.** Against CLOSE: (a) the hardened point — relocated, never deleted; the retired zip on Michael's machine
(or the ARCHIVE project) still carries the wrong §2 normalizer and is bridge-reachable under corrected rule 4. True — but
a bridge read of a retired raw capture is a deliberate act against a file the record calls reference-only; the row's own
stated failure mode is a RAG hit from project knowledge, and that surface no longer exists. (b) The "annotate" branch is
no longer executable where the row placed it (project knowledge); a design session could in principle edit the zip on
his machine over the bridge, but that is a different act the row never contemplated and H5/TRANSIT discipline cut against
it. (c) The correction's home — `statute-pass-registry-retrieval-2026-08-14.md` §3 — is not staged (UNVERIFIABLE-HERE that
it carries the corrected normalizer today; the row and the SOURCING convention both say it does). (d) Unique text:
"Annotate the 2026-08-14 capture, or leave it" → register 1 / live 0; "silently corrupts a quotation of primary law" → 1 / 0;
"RAG-hits the capture" → 1 / 0 — the hazard description is unique to this row, but it describes a surface Michael removed.

**7. PROPOSED: `CLOSE` — confidence MED.** Spent by Michael's `#107` ruling retiring the capture class — the "annotate in
project knowledge" branch became impossible and the "left untouched with this file carrying the correction" branch
obtained de facto. Closure sentence should carry the residual pointer so nothing is lost: "the retired copy (his machine /
ARCHIVE) still carries the wrong §2 normalizer; the characterization and corrected normalizer live at
`statute-pass-registry-retrieval-2026-08-14.md` §3, named in the SOURCING convention." If the adjudicating session weighs
the bridge-reachable hazard as live, `ANNOTATE-KEEP` with that same sentence is the fallback.

**8. Row line identity.** `- ⬜ **Q-STAT-3 — Annotate the 2026-08-14 capture, or leave it.**` — occurs once; full 1,362-byte
line occurs once.

---

### Q-STAT-6 (L1004)

**1. Row, whole (4,662 B, one line — the largest in the slice).** Interrogatives/ruled text, verbatim:
> "**Q-STAT-6 — The divergence findings and what happens to them.** … **Correcting the wording is your act.** **RULED 2026-08-14: route (c)** — replacement wording drafted for the four material entries only (staged file §9), the other fourteen left as flags. **What stays open is the fourteen: they are resolved in your hand at verification, entry by entry.**"
Last annotation on the row (`#98`, via runner 53): "**ANNOTATED 2026-08-17 (#98), ADD-ONLY — THE WALK DISPOSITIONED ALL BUT FIVE OF THE EIGHTEEN, AND THE ROW STAYS OPEN** … **Adopted today under ROUTE-C and NOT yet resolved: 2, 12, 13, 29, 32** — their divergences close at post-execution verification, not before. **Nothing above changes the question this row asks**, which is what becomes of divergences generally; it records that the concrete eighteen are now five."
The row has NOT been annotated since `#98` — it does not carry the `#108`/`#109` verifications of 2, 12, 13, 29, 32.

**2. ID locations.** live 15 lines / 16 flat (L5094, 5151, 5155, 5207, 5219, 5250–5255, 5293, 5362, 5593, 6122, 8017, 8161,
8282 — none after runner 53 / `#98`); archive 0 (control: `SK-v2` 17); BS 3 (L108, L144, L152); register 6 lines / 13 flat.

**3. Decisive sentences.**
- BS L108 (the FULL sentence the audit halved, plus what follows):
  > "- **`Q-STAT-6`'s EIGHTEEN ARE NOW NONE LIVE, AND THE ROW STILL STAYS OPEN.** Adopted at #95 and **verified 08-17: 5, 6, 11, 27**. Flags **CURED**: **1, 23, 33, 34**. Divergences **RESOLVED as-is**: **4, 7, 8, 9, 26**. **The last two, 12 and 32, are VERIFIED as of #109** — and their divergence lists produced a STANDING DRAFTING DIRECTION (#108, your words: *"Why are we making these language changes in the first place instead of simply staying with the actual language of the rules?"*)"
- live L3968–3971, `#108`: "ENTRIES 13, 2 AND 29 VERIFIED — his word, dated 2026-08-18"; live L3874 heading `## 2026-08-18 (#109) — THE SUCCESSOR ACTS CLOSE THE SAME NIGHT: ENTRIES 12, 32, D AND E VERIFIED;` — so all five of the `#98` residue are verified at Michael's word.
- live L5094, runner 53: "Closed: **`Q-T19-2`** (ROUTE-C fired five times, each ruled independently, all five wordings adopted)" and "Annotated without changing a word of the original: `Q-STAT-6`".
- live L5389–5393, `#95` (the general answer, Michael's ruling): "- **ROUTE (c) RULED STANDING LAW — TRIGGER #3 FIRES → v21.** Whenever a retrieval or verification pass finds a divergence that CHANGES WHAT AN ENTRY MEANS, proposed conforming wording is drafted and queued for Michael's adopt/reject/edit — never adopted silently. Reason: it matches how the mechanism actually worked across #76/#93/#95."
- BS L144: "**Q-STAT-2 through Q-STAT-6 stay OPEN**"; BS L152 hand list: "**Q-STAT-2 – Q-STAT-6**".

**4. Whose words.** The dispositions of all eighteen are MICHAEL'S verification/adoption acts (`#95`, `#98`, `#108`, `#109`).
The general rule — material → ROUTE-C drafting, non-material → flags resolved at verification — is MICHAEL'S ruling (`#95`,
and the row's own "RULED 2026-08-14: route (c)"). "AND THE ROW STILL STAYS OPEN" and "Nothing above changes the question
this row asks" are RUNNER sentences (BS L108; runner 53's annotation); the `task-19-signoff-record-2026-08-17.md` §5 the
annotation cites is not staged (UNVERIFIABLE-HERE whether Michael himself said "stays open" at the walk; `#98`'s log
entry records no such word).

**5. Since the hardening.** NOTHING — `Q-STAT-6` 0 and "divergence" (registry sense) 0 in live L1–600; BS at HEAD still
carries "AND THE ROW STILL STAYS OPEN" (126th refresh) — a posture carried across many refreshes, not a new fact.

**6. DISCONFIRM.** Against CLOSE: (a) BUILD-STATE at HEAD instructs, in terms, that the row stays open, and the runner
with `#109` in hand wrote it so — a considered Code posture, but a runner cannot close a row without his word (QR-6(e)),
so "stays open" is what a runner MUST write, not evidence something remains. (b) The residual the row names — "what
becomes of divergences generally" — is answered by ROUTE-C standing (`#95`) for material divergences and by the row's own
ruled text for non-material ones ("resolved in your hand at verification"), plus the `#108` direction for future drafting;
`READ-A` (its own row) holds the only genuinely open piece (whose test governs an unflagged future divergence). (c) The
row is stale at HEAD by two of Michael's verification acts (`#108`, `#109`) — a reader of the register alone would think
five are still pending; an annotation is owed whether or not it closes. (d) Unique text: "The divergence findings and what
happens to them" → register 1 / live 0; "What stays open is the fourteen" → 1 / 0; "what becomes of divergences generally"
→ 1 / 0; "the concrete eighteen are now five" → 1 / 0. The per-entry tally exists in one place in the register (this row)
and in BS L108 (a rewritten file); closing (✅) keeps the row body. `Q-T19-2` (L610) is ✅ and carves nothing live.

**7. PROPOSED: `CLOSE` — confidence MED.** All eighteen are dispositioned at Michael's word (BS L108: "NONE LIVE"; 12 and
32 at `#109`, 2/13/29 at `#108`); the general question is answered by ROUTE-C standing and the row's own ruled text; the
scope residue is `READ-A`. Closure sentence must record the `#108`/`#109` completions the row lacks. Because BUILD-STATE's
own posture says "STILL STAYS OPEN" (a runner sentence), the sheet should present this as a ONE-WORD CONFIRM, as the audit
itself suggested — MED rather than HIGH only for that reason.

**8. Row line identity.** `- ⬜ **Q-STAT-6 — The divergence findings and what happens to them.**` — occurs once; full
4,662-byte line occurs once.

---

### SK-v2 (L1242) — now ✅: verify and report only that

**Verified at HEAD:** register L1242 begins `- ✅ **SK-v2 — the `drafting-disclosures` skill's v2 revision.**` (glyph ✅; the
opening string occurs once; full 2,543-byte line occurs once). The row ends with the batch-83 closure: "**CLOSED 2026-08-25.**
The remaining limb — "upload `docs/skills/drafting-disclosures/SKILL.md` (v2) as the claude.ai skill copy now that the
revision is at HEAD" — is DISCHARGED: … **Michael read the version line in his uploaded claude.ai copy on 2026-08-21 and
confirmed it reads v2.** … **This closure also discharges the standalone hand-upload item absorbed here from `#45`.**
Staged design-side at `#129`; packaged 2026-08-25."

**How it closed:** live L384, `## 2026-08-31 — QUEUE-RUNNER batch (runner line; EIGHTY-THIRD invocation)`: "- **ROW 3 —
`SK-v2` CLOSED, and the edit is arithmetic rather than assertion.** Found by its text, not by the line number the packet
gave (it was in fact still line 1241). Two acts on one line: the leading `⬜` flipped to `✅`, and the §4.3 closure sentence
**extracted from the manifest by line slice and never retyped** … **The row grew by exactly 884 bytes, which is the closure sentence plus one joining space** … It is ROUTED,
not decided: the evidence is Michael's from 2026-08-21 and the closure was staged design-side at `#129`." `#138` (live
L476–479): "**`SK-v2` CLOSED** — its remaining limb (upload `SKILL.md` v2 as the claude.ai skill copy) is discharged: v2
landed 2026-08-11 and Michael confirmed the version line in his uploaded copy on 2026-08-21." The row moved from L1241 to
L1242 when batch 85 inserted the `FE-D1A-1` row above it (runner 85, live L40).

**ID counts (for the record):** live 19 lines / 20 flat; archive 17 / 18; BS 1; register 3 lines / 5 flat.

**One thing the verification surfaced, reported not adjudicated:** BUILD-STATE at HEAD (126th refresh, batch 85) still
carries on Michael's hand list, BS L152: "**re-upload SKILL.md v2** (SK-v2)" — a stale carry three refreshes after the row
closed at batch 83. Not a register act; a BUILD-STATE rewrite item for the next batch.

**PROPOSED:** none — already ✅ at HEAD; nothing for the sheet.

---

### v23 INSTRUCTIONS row (L1248) — THE MOST IMPORTANT ITEM IN THIS SLICE

**1. Row, whole (3,966 B, one line).** What the row asks for, in its own words, through its three layers:
- Original (`#105`, entered by runner 59): "**The act in front of you is therefore TWO acts, and only the second is the paste:** (1) **assemble v23 design-side** — v22 plus this session's fragments — then (2) paste it into the project's instructions field, same day per trigger #3." and "v23 is **v22 plus the `PF-1` standing convention**, ruled this session under `Q-AUDIT-1`". Michael's own correction quoted in the row: "**Michael, 2026-08-18, correcting the fifty-ninth invocation's report: "There are no v23 instructions built."**"
- `#106` amendment: "**v23 now carries FOUR same-day trigger-#3 firings:** V-9 and TOC-4 (both resolved in v22), then **PF-1** (the standing adversarial preflight, `Q-AUDIT-1`) and **the FC-14 SOURCING fourth channel** (State Bar / court-published conduct-and-administration PDFs), both resolved in v23." … "**The row stays ⬜ until Michael confirms the paste.** — **OPEN, your hand, same day — ONE act: paste**"
- `#108` annotation: "**ANNOTATED 2026-08-18 (#108), ADD-ONLY — ACT (1) IS DONE, SO ONLY THE PASTE REMAINS.** … A Code session still cannot do it, and cannot read v23 to confirm its contents — this annotation carries the design side's report, not repo-verified evidence of the document."
**Precisely what the row asked for:** ONE act — that the project-instructions field come to carry `PF-1` and FC-14's
SOURCING fourth channel (the content assembled at `#106`), by a paste Michael confirms. "v23" was the VEHICLE named at the
time; the row's payload is the two conventions.

**2. ID locations.** `v23`: live 43 lines (all listed; the material ones quoted below); archive 0 (control: `v18` → archive
hits exist; v23 postdates the cutoff); BS 2 (L142, L144); register (this row plus `Q-RE-9` L879 "rides the v23 paste").
`PF-1`: live 43 / flat 52; BS 4 / 7; register 4 / 7. `FC-14`: live 11 / 12; BS 3 / 4; register 4. `v28`: live 3 (L64, L228,
L345 + L341–347 block); BS 3 (L142 ×2, L152).

**3. Decisive sentences — every relevant one, character-exact.**
- **`#139`**, live L341–347, `## 2026-08-31 (#139) — (Typed design session, Cowork, Fable 5 …: THE RC-1 SITTING`:
  > "- **INSTRUCTIONS TRIGGER #6 FIRED — and it is the v23 loss.** v27 contradicts BUILD-STATE: BUILD-STATE says `PF-1` (#105) and FC-14's SOURCING fourth channel (#106) "ride the v23 paste"; the live v27 carries neither, its trigger-3 history runs v22 → v24, and the record's own same-day note at #106 says "no v23 DOCUMENT exists — only the three verbatim fragments staged in the adjudication record's §3." v24 superseded v23 unpasted and did not carry them. Michael: "Yes" to a v28 draft. **v28 was assembled tonight from the verbatim fragments at `fable-adjudication-record-2026-08-18.md` §3 and `fc-adjudication-record-2026-08-18.md` FC-14, delivered to him as a .md to paste; the paste is his hand, and until it lands v27 remains in force.**"
  and `#139`'s close, live L366: "**Still open and still Michael's:** the v28 paste ·"
- **runner 84**, live L228, `## 2026-08-31 — QUEUE-RUNNER batch (runner line; EIGHTY-FOURTH invocation)`:
  > "**the v28 instructions paste** — drafted 2026-08-31 from the verbatim fragments at `fable-adjudication-record-2026-08-18.md` §3 and `fc-adjudication-record-2026-08-18.md` FC-14, restoring `PF-1` and FC-14's SOURCING fourth channel that v24 dropped when it superseded v23 unpasted; **until it lands v27 is in force**, and no Code session can tell him whether the paste has happened"
- **`#140`**, live L63–65, `## 2026-08-31 (#140) — (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED …`:
  > "The sitting opened on the bridge with HEAD `ed1ddf6` (batch 84) verified at origin by `git ls-remote`, `inbox/` empty, no index lock, the v28 instructions IN FORCE (read live in the project-instructions field — BUILD-STATE's "whether the paste happened is not observable from the repo" is answered design-side: it happened), the knowledge meter at 1,585,667 / 2,000,000 = 79.3% (Q-CAP-5(a) does not fire)"
  and `#140` applying PF-1 as a convention, live L170: "no registry entry drafted (PF-1's trigger did not fire — recorded, not silent)"; and L69–70: "Every ruling was written into a running ledger in the container within the exchange it was made (the v28 operational note)".
- **runner 85** (live L20–52): carries NO sentence about v28, the instructions, PF-1 or the paste — and its "Still open and
  still Michael's" list (L52) no longer contains the paste item that runner 84's list (L228) opened with. The item's absence
  from runner 85 is itself the evidence: it left the open list between batches 84 and 85.
- **BUILD-STATE INSTRUCTIONS line**, BS L142 (whole, in four exact pieces):
  > "**INSTRUCTIONS: `v28` IS NOW REPORTED IN FORCE, AND THAT REMAINS A REPORTED OBSERVATION RATHER THAN A REPO FACT — a Code session cannot see the instructions field at all.**"
  > "`#140`'s design session read the field live on 2026-08-31 and reports **the v28 paste HAPPENED**, which answers in the affirmative the question this file has carried unanswered: *"whether any paste has happened is NOT observable from the repo."*"
  > "What v28 restores is the two ruled conventions that had been in force on paper and absent from the instructions since v24 superseded v23 unpasted: **`PF-1`** (the multi-agent read-only preflight) and **FC-14's SOURCING fourth channel**, assembled from the verbatim fragments at `fable-adjudication-record-2026-08-18.md` §3 and `fc-adjudication-record-2026-08-18.md` FC-14."
  > "**THE HAND ITEM IS THEREFORE OFF THE LIST** — `#140` also records `PF-1` correctly NOT firing on its own packet, with the skip stated rather than silent."
- BS L152 (hand list): "**~~PASTE v28~~ — REPORTED DONE: `#140`'s design session read the instructions field live on 2026-08-31 and found v28 IN FORCE, so this long-carried hand item comes OFF your list on the design side's attributed read (a Code session still cannot see that field, and nothing here verifies it)**"
- BS L144 — STALE AT HEAD, and it contradicts L142 (flag for the next rewrite; it is the sentence both audits relied on):
  > "**SOURCING itself is NOT amended in any repo file: the convention lives in the project instructions and the amendment rides the v23 paste.**"
- The precedent the closure rests on — register L1244 (`v17` row, ✅, Michael's ruling at `#95`): "**CLOSED 2026-08-16 (#95) — RULED BY MICHAEL: overtaken by events, three versions stale.** … **The row closes as spent, not as wrong** — nothing in the v17 text is retracted, and every convention it carried reached force through the later versions."; and live L5410–5413, `#95`: "v20: CONFIRMED IN FORCE BY OBSERVATION — this running session read its own live instructions and they are v20 … the #82/A-1 mechanism, third consecutive use. The observation, not recall, is the evidence."

**Lineage of the loss (this verifier's reading, offered for the sheet):** live L2172–2174, `## 2026-08-20 (#123)`: "the
**v23 instructions draft** was delivered to Michael this sitting as its own file — v22 plus the two exclusions, the
archive's existence and closed status, and the disambiguation …" — i.e. `#123` built its own "v23" on v22, NOT on the
`#106` assembly; then live L1832–1833, `#126`: "The full instructions text — v23 plus exactly: the `#118` convention, the
`LE-1` operational note, …" built v24 on THAT v23. The `#106` assembly (v22 + PF-1 + FC-14) was never the base of any later
version. `#139`'s "v24 superseded v23 unpasted" is right in effect; the drop point on the record is `#123`.

**4. Whose words.** Michael: "There are no v23 instructions built." (`#105`-era, quoted in the row) and "Yes" to the v28
draft (`#139`). The "IN FORCE" finding is the `#140` design session's LIVE READ of the field (Fable 5) — a design-side
attributed observation, the `#82/A-1` mechanism, which is the evidence class that closed the v14 (`#51`), v18 (`#79`),
v19 (`#94`), v20 (`#95`) and v21 (`#96`) rows; BUILD-STATE labels it "A REPORTED OBSERVATION RATHER THAN A REPO FACT" and
takes the hand item off the list on it. The "spent, not wrong" closure form is Michael's own ruling at `#95` for v17.

**5. Since the hardening.** EVERYTHING that matters: `#139` (trigger #6 fired; Michael "Yes"; v28 drafted from the
verbatim fragments; delivered), runner 84 (paste still open, v27 in force), `#140` (v28 IN FORCE by live read), runner 85
(paste absent from the open list), BUILD-STATE L142/L152 (hand item OFF the list). BS L144 was NOT updated and still
says "rides the v23 paste".

**6. DISCONFIRM (strongest case against CLOSE).** (a) The field's content is UNVERIFIABLE-HERE from the staged files —
no staged document reproduces v28's text, and `#140`'s entry says "v28 IN FORCE", not "I read the PF-1 bullet and the
SOURCING fourth sub-bullet in the field". The v23 failure class was EXACTLY a version number standing in for a content
check (the audit's "v27 is in force" reasoning), so a version-only read is the one thing that should not close this row.
That is a real gap in the record's wording; the cure is one look by the adjudicating design session (see the labelled
context observation below). (b) The row names v23 and a same-day paste; neither happened as written — but `#95`'s v17
ruling ("spent, not wrong … every convention it carried reached force through the later versions") is the ruled form
for exactly this shape. (c) Surviving pointers that go stale on closure: the `Q-RE-9` row (L879, ✅) and BS L144 both say
the amendment "rides the v23 paste" — closed-row and BUILD-STATE text, not open questions; `WS-P4`'s "v27's trigger-4
history omits 2026-08-18" is its own row and is untouched. (d) Unique text: "THE v23 DOCUMENT DOES NOT EXIST" → register 1 /
live 0; "There are no v23 instructions built" → 1 / 1; "the register carries no v22 row" → 1 / 0 — history, no open
question. (e) Whether any v23 was ever pasted is left unresolved by v28's own header per `#139`'s reading — not a limb of
this row, which asked for the CONTENT to land.
**Labelled context observation (not staged-file evidence):** the project-instructions text supplied to this verifier's
session context is headed `v28 — 2026-08-31` and contains (i) a Binding-conventions bullet beginning "PF-1 (ruled
2026-08-18, #105; written into these instructions only in v28, 2026-08-31, having been lost with the unpasted v23 …): the
adversarial multi-agent read-only PREFLIGHT is STANDING." and (ii) a fourth SOURCING sub-bullet beginning "Texas
conduct-and-administration rules — the FOURTH NAMED CHANNEL (FC-14, ruled 2026-08-18, #106; Michael's pick verbatim: "Yes —
amend SOURCING")". If the adjudicating session's own field read agrees, limb (a) is discharged.

**7. PROPOSED: `CLOSE` — confidence HIGH.** Spent, not wrong, on the `#95` v17 form: the content the row existed to carry
— `PF-1` and FC-14's SOURCING fourth channel — reached force through v28, drafted at `#139` from the same verbatim fragments
the row points to and read IN FORCE at `#140` by the `#82/A-1` mechanism; BUILD-STATE at HEAD takes the hand item off the
list. The closure sentence should (1) name v28 and both conventions, (2) cite `#139`/`#140` and the design-side read as its
evidence (as every prior paste-row closure did), and (3) record that the adjudicating design session read the two bullets
in the live field — the content check the v23 loss demands. Separately for the next batch: BS L144's "rides the v23
paste" is stale and contradicts L142.

**8. Row line identity.** `- ⬜ **v23 INSTRUCTIONS — NEW 2026-08-18 (#105). NOT YET PASTEABLE: THE v23 DOCUMENT DOES NOT EXIST.**` — occurs once; full 3,966-byte line occurs once.

---

### 2026-08-16 privilege-tier migration row (L1249)

**1. Row, whole (1,037 B, one line).** The act, verbatim:
> "**MIGRATION — NEW 2026-08-16 (#94). Michael's hand: run `db/migrations/2026-08-16-privilege-tier-no-default.sql` against live Supabase.** The file was **authored this batch and deliberately NOT run**, per the CD-1 item-7 pattern — Code authors migrations, Michael executes them. It drops `DEFAULT` and `NOT NULL` from `privilege_tier` on both `generated_documents` and `transcripts`, executing the schema half of `Q-COM-11`'s ruling (A). … **Neither CHECK vocabulary is touched**, so `Q-COM-10` is untouched too. **Until this runs, the live database still defaults new rows to `'work-product'` while `db/schema.sql` at HEAD says otherwise**"
An ACT row; it carries no ruling question. It has NEVER been annotated — no closure text at HEAD.

**2. ID locations.** `privilege-tier-no-default`: live 3 (L3488 `#113`; L4173 runner 59; L5439 runner 49); archive 0
(control: `SK-v2` 17); BS 0 by filename (BS L78 carries the run by description, quoted below); register 3 (L763 Q-COM-10-A
runner note, L1249 the row, +1).

**3. Decisive sentences.**
- live L3488–3497, `## 2026-08-19 (#113) — EXECUTION SESSION: all three pending live migrations RUN AND VERIFIED by Michael's hand`:
  > "**3. `db/migrations/2026-08-16-privilege-tier-no-default.sql`** — ran clean, THIRD. Its checks:" — table: "C1 `generated_documents.privilege_tier` nullable / default | YES / none"; "C1 `transcripts.privilege_tier` nullable / default | YES / none"; "C2 existing values, both tables | **(no rows)** — neither table has any row"; "C3 `generated_documents` CHECK | `attorney-client`, `work-product`, `non-privileged`"; "C3 `transcripts` CHECK | `privileged`, `work-product`, `non-privileged`"; "C5 policies reading `privilege_tier` | 0".
  and L3499–3505: "**C3 is the one that was read deliberately: the two vocabularies still disagree and both CHECKs are untouched.** That is the CORRECT result — `Q-COM-10` stays open and unimplemented, which is the named failure the migration was written to avoid. **The file's check 4 (insert-a-null inside a transaction, then roll back) was NOT run**; C1's catalog read establishes the same fact and no fixture row was created."
- BS L78 (at HEAD): "**THE MIGRATION RAN 2026-08-19 (#113): both columns nullable, NO default, and BOTH CHECKs untouched — the two vocabularies still disagree, which is the CORRECT result and the named failure the file was written to avoid.** **No existing row was re-characterized** (all fiction; re-characterizing is a legal act and yours). Two honest limits: its C2 check is satisfied **TRIVIALLY** (both tables are empty), and **check 4 — insert-a-null inside a rolled-back transaction — was NOT run.**"
- BS L7: "EXACTLY ONE MIGRATION IS PENDING: FE-D1's `db/migrations/2026-08-20-fe-d1-form-engine.sql`" — consistent: this one is not pending.
- register L763 (runner note inside `Q-COM-10-A`): the `#105` Option-2 redraft consequence "does not reach" this file — "the latter's only DDL is four `drop default` / `drop not null` statements and it touches no CHECK and no vocabulary".

**4. Whose words.** The run is MICHAEL'S ACT ("RUN AND VERIFIED by Michael's hand", `#113` heading), recorded by the `#113`
design session (Opus 5) with the file's own checks answered; BUILD-STATE carries it at HEAD.

**5. Since the hardening.** NOTHING — `privilege-tier`, `no-default` 0 in live L1–600; BS L78 unchanged.

**6. DISCONFIRM.** (a) Check 4 was not run — the row did not ask for it; C1's catalog read establishes the same fact, and
BS carries the limit honestly. (b) C2 satisfied trivially (empty tables) — the row's own premise ("Existing rows keep their
current values and none is re-characterized") is satisfied a fortiori. (c) The row's interim warning ("the schema file and
the live database disagree in the interim") resolved on the run; unique text: "the live database still defaults new rows"
→ register 1 / live 0; "the schema file and the live database disagree in the interim" → 1 / 0 — both describe a state
that ended 2026-08-19. (d) Name-collision hazard checked: the `Q-COM-10-A` redraft consequence targets the PROPOSAL text's
four-value migration, not this file (register L763 runner note) — so nothing about this file is reopened by `#105`.
Nothing cuts against closure; the only defect is that the register was never annotated with the run.

**7. PROPOSED: `CLOSE` — confidence HIGH.** Ran clean 2026-08-19 by Michael's hand (`#113`), checks recorded, carried at
HEAD in BUILD-STATE; the closure sentence should carry the two honest limits (`C2` trivial; check 4 not run) so the row's
record matches `#113`. (The hardened audit's "clean" stands.)

**8. Row line identity.** `- ⬜ **MIGRATION — NEW 2026-08-16 (#94). Michael's hand: run `db/migrations/2026-08-16-privilege-tier-no-default.sql` against live Supabase.**` — occurs once; full 1,037-byte line occurs once.

---

## SUMMARY

| ID | audit class | hardened verdict | PROPOSED | confidence | destroys-unique-text? (Y/N) |
|---|---|---|---|---|---|
| `READ-A` (L605) | SUPERSEDED (cautious) | DEFERRED-NOT-SUPERSEDED | `MICHAEL-IN-WORDS` — expressly deferred `#95`; deferral carried as binding text into v28; put to him as one narrow question | HIGH | Y if closed by supersession (only register home of the scope question); N under the proposal |
| `Q-COM-10-E` (L767) | SUPERSEDED | PARTLY-DISSOLVED ("governs ≠ answers") | `CLOSE-SPLIT` — enum-token limb spent on "Option 2: 3 values + boolean"; re-mint the boolean's token (`witness_statement`, Claude's text) narrowly | MED | N (rationale carried into the re-minted limb) |
| `TOC-3` (L807) | SUPERSEDED (TC-3/TC-4) | PREMISE-INTACT | `ANNOTATE-KEEP` — TC-4 moved the file; naming convention never ruled; twin `GLR-2`, one ruling closes both | HIGH | Y if closed (convention question lives only in this pair); N under the proposal |
| `RE-LOOK-3` (L882) | SUPERSEDED | clean | `CLOSE` — act done by Michael's hand 2026-08-18 (`#106`; read at `#112`); channel ruled (FC-14) | HIGH | N |
| `Q-PR3-3` (L888) | SUPERSEDED | PARTLY-DISSOLVED + reserved to Michael | `CLOSE` — spent by his act at `#113`; residue is `Q-PR3-2` + PR-3 row L74; ONE-WORD CONFIRM because `#113` reserved it to him | MED | N |
| `Q-STAT-3` (L1001) | SUPERSEDED | PARTLY-DISSOLVED | `CLOSE` — capture retired by his `#107` class ruling; annotate branch impossible; closure sentence carries the §3 pointer (fallback `ANNOTATE-KEEP`) | MED | N (pointer carried in the closure sentence) |
| `Q-STAT-6` (L1004) | SUPERSEDED | PARTLY-DISSOLVED (half-sentence quote) | `CLOSE` — eighteen NONE LIVE at his word (`#98`/`#108`/`#109`); general question answered by ROUTE-C standing; scope residue is `READ-A`; ONE-WORD CONFIRM (BS says "STILL STAYS OPEN", a runner posture) | MED | N |
| `SK-v2` (L1242) | SUPERSEDED | clean | — already ✅ at HEAD (closed batch 83, +884 B); NOTE: BS L152 hand list still carries "re-upload SKILL.md v2 (SK-v2)" — stale | — | — |
| v23 INSTRUCTIONS (L1248) | SUPERSEDED (v27 in force) | ⛔ PREMISE-INTACT | `CLOSE` — spent-not-wrong (`#95` v17 form): PF-1 + SOURCING fourth channel reached force via v28 (`#139` drafted; `#140` live-read IN FORCE; BS L142/L152 hand item OFF); closure to record the design session's own read of the two bullets; BS L144 stale | HIGH | N |
| 2026-08-16 migration (L1249) | SUPERSEDED | clean | `CLOSE` — ran clean 2026-08-19 by his hand (`#113`), checks recorded; carry the two honest limits | HIGH | N |

**Could not process:** none. **UNVERIFIABLE-HERE items (stated in-block):** the live instructions field's content (v23,
READ-A — labelled context observation offered instead); the audit's Michael quote for `RE-LOOK-3` (source record not
staged; act corroborated at `#106`/`#112`); `task-19-signoff-record-2026-08-17.md` §5 (Q-STAT-6); the named 44-file
inventory of `#107` (Q-STAT-3); `statute-pass-registry-retrieval-2026-08-14.md` §3 (Q-STAT-3); the PR-3 proposal (Q-PR3-3).
