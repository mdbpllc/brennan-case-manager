# VERIFY V2 — read-only mechanical verification

**Target:** `/home/claude/work/sheet/attorney-review-queue-cleanup-adjudication-2026-09-01.md`
**Scope:** §2 Blocks E, F, G, H and §3, §5, §6, §7 ONLY. Dispositions are NOT assessed — only whether quoted text is verbatim, whether cites resolve, and whether counts re-derive.
**Sources (all staged, HEAD `7f02131`):** register `docs/specs/attorney-review-queue.md` · live log `docs/record/session-log.md` (+ `live_entries.tsv`) · archive `docs/archive/session-log-archive-2026-07-21_2026-08-12.md` · `docs/specs/BUILD-STATE.md` · `attorney-review-queue-audit-2026-08-24.md` · `attorney-review-queue-audit-HARDENED-2026-08-25.md` · `id-collision-report.md` · `out/wave1_A1.md`…`A8.md`.
**Method:** every `*…*`/`"…"` fragment searched literally AND whitespace-normalized (so hard-wrapped quotes are found); every count and cite re-run; zero-results reported only with a firing control.

---

## Verdict counts

One row per checked fragment or claim. Where a row carries a compound verdict (e.g. "VERBATIM + MATCH", or "VERBATIM fragment, MISMATCH on location"), it is counted once, under the more serious verdict.

| Verdict | n |
|---|---|
| VERBATIM | 24 |
| VERBATIM-VIA-ANNEX | 1 |
| MATCH (count / cite / re-derivation) | 81 |
| PARAPHRASE | 4 |
| NOT-FOUND | 0 |
| MISMATCH | 10 |
| UNVERIFIABLE-HERE | 5 |
| **Total rows** | **125** |

---

## §2 — BLOCK E

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| E-1 | `FE-8` (L189) | MATCH | register L189 = `- ⬜ **FE-8 — Attorney-edit round-trip diffing…` |
| E-1 | *"R13 RETIRED … RECON-1 is not its consumer after all"* (#135) | VERBATIM | log L983–984, inside `#135` (heading L943, next entry L1084). Ellipsis elides `not answered.** FE-8's diff half stays deferred;`. Both halves character-exact. |
| E-1 | §5.6 sub-question (content-addressed retention) NEVER PUT — "0 hits, both logs" | MATCH | `content-addressed`: live log 0, archive 0; register 1. Control: `FE-8` fires in both logs. |
| E-2 | `FE-10` (L193) | MATCH | register L193 = `- ⬜ **FE-10 — Render-time format lint…` |
| E-2 | *"from birth (incl. numbering pass)"* (#63) | VERBATIM | archive L291; quoted at audit L70. |
| E-2 | "#63 cite ruled SCOPE, not the row's two sub-questions, both unruled with no other home" | MATCH | hardened L87: *"The quote rules **scope inclusion**, not the row's design questions. **Two surviving limbs, neither with any other row.**"* Re-derived: `Q-FE10-*` = 0 rows and 0 mentions in the register. |
| E-2 | "numbering pass's build state UNSTATED anywhere at HEAD" | MATCH | `numbering pass`: live log 0, BUILD-STATE 0 (register 2, archive 1 — the #63 ruling). |
| E-3 | `FE-12` (L197) | MATCH | register L197 = `- ⬜ **FE-12 — Template/exemplar provenance attribute…` |
| E-3 | "known-bad, kept for reference" limb NEVER PUT (0 hits), unique to this row | MATCH | 0 hits in both logs; controls fire (`FE-12` = 2 live / 22 archive). Register: exactly 1 (L197). |
| E-3 | *"built and exercised"* — the fragment | VERBATIM | audit L70; hardened L177. |
| E-3 | …attributed to the audit's **FE-12** treatment | **MISMATCH** | The phrase is in the audit's **FE-10** row (L70). The audit's **FE-12** row (L71) reads *"provenance flag built with render-time enforcement"* — it does not contain "built and exercised". The FE-12 attribution traces only to hardened L177 (*"`FE-10` and `FE-12`, which the audit put in §2 as 'built and exercised'"*), i.e. to the hardening's characterization, not to the audit's own FE-12 row. |
| E-3 | "the build entry and BUILD-STATE name neither FE-12 nor provenance" | **MISMATCH** | `FE-12` in BUILD-STATE = **0** ✓, but `provenance` occurs **3×** in BUILD-STATE: L2 (FE-D1 amendment slice, *"four provenance classes"*), L24 (*"`G10-1` was ruled provenance-only"*), L39 (t3-pilot protocol, *"`R`/`K`/`I` provenance marks intact"*). None is the FE-12 flag, so the intended sense holds — but the sentence as written is false on its face. |
| E-4 | `Q-DES-5` (L773) | MATCH | register L773 = `- ⬜ **\`Q-DES-5\`** — **FLP multi-cluster duplication is systemic…` |
| E-4 | the audit's #100 quote returns ZERO | MATCH | *"the three hazards (0.1.1 duplicate records"*, *"GO INTO §0.1"*, *"the Irwin cannot-type class"* — each present ONLY in the audit (L82) and annex A2 (L200); **0** in both logs. Hardened L99 supplies the firing control: *"`0.1.1` → 0 hits, `0.1.3` → 0 hits, both logs (control: `0.1.2` → 2)"*. |
| E-4 | "the #100 sentence rules `V-8` (already ✅)" | MATCH | register L701 = `- ✅ **V-8 — RULED 2026-08-13 (#73)…`; hardened L99 same. |
| E-5 | BUILD-SESSION-NOTES classification row (L134) | MATCH | register L134 = `- ⬜ **\`BUILD-SESSION-NOTES.md\`** — 2026-07-21 audit, unreviewed across ~10 log entries…` |
| E-5 | "hardening: EVIDENCE-IS-A-CLAUDE-ASSERTION" | VERBATIM | hardened L110 (verdict vocabulary) and L123 (applied to row 82). |
| E-5 | first limb DISCHARGED at #13; "no Michael ruling exists anywhere"; predates the convention | MATCH | hardened L123: *"**No Michael ruling appears anywhere in the log or archive** — and all of it predates the 2026-07-26 rule…"* and *"(The row's FIRST limb … IS discharged, cleared at `#13`.)"* |
| E-6 | `TOC-3` (L807) | MATCH | register L807 = `- ⬜ **\`TOC-3\` — Canonical path for the finding aid — PROPOSED, unruled.**` |
| E-6 | *"one ruling closes both"* — "the record says twice" | VERBATIM + MATCH | Exactly 2 occurrences in the record: register L800 (twin `GLR-2`) and live log L5813 (47th runner line). Hardened L119 repeats it. |
| E-6 | "TC-3 ruled the SPLIT, TC-4 the DIRECTORY; neither ruled stable-vs-dated naming" | MATCH | hardened L119, near-verbatim. |
| E-7 | `CR-1` (L121) | MATCH | register L121 = `- ⬜ **CR-1 — Hearing-date extraction with attorney confirmation at matter creation.**` |
| E-7 | *"records as a second observation on the covering section"* | VERBATIM | register L121; hardened L124. |
| E-7 | intake-spec §2 confirmation is UNVERIFIABLE-HERE | MATCH | hardened L124: *"the *'§2'* cite is unverifiable from the staged set"*; the intake spec is not in the staged set. |
| E-8 | the twelve register line numbers | **MATCH 12/12** | L170 `CL2-AC-1` · L171 `CL2-CHECK-1` · L201 `FE-§11.4` · L1283 bill-label · L127 `CR-7` · L132 `CR-CONSTRAINT` · L964 `Q-FE6-5` · L945 `Q-FE4-1` · L953 `Q-FE5-3` · L918 `Q-IN2-7` · L924 `Q-IN1-1` · L938 `Q-IN3-6`. Every line's leading ID matches the sheet's label. |
| E-8 | *"Accept all of them onto the queue"* (#139) | VERBATIM | live log L335, inside `#139` (heading L230). |
| E-8 | "TWENTY-ONE accepted"; "the 2026-08-24 audit's twelve"; "full text also at REQ-CAPTURE §18.F" | MATCH | log L335–340: *"THE CC-1 HANDS-ON QUEUE — 'Accept all of them onto the queue' — TWENTY-ONE"*; names `#137`'s four, *"the 2026-08-24 audit's twelve"* (listing exactly the sheet's twelve, with "the bill-label pre-fill"), and *"each carried with its full question at the REQ-CAPTURE's §18.F"*. |
| E-8 | batch-84 header says the accepted items are *"none of them a row in this register"* — false for these twelve | VERBATIM + MATCH | register L3 reads *"**none of them a row in this register, all of them Michael's**"*; the twelve are rows (verified above). |
| E-8 | cross-reference "(§6)" for the register-header defect | **MISMATCH** | The defect list is **§3** (item 5). §6 is the wave-2 placeholder. |
| E-9 | `Q-WF-4` (L900) | MATCH | register L900 = `- ⬜ **Q-WF-4.** The single auth surface is a single-tenant public-client browser SPA…` |
| E-9 | *"Yes — server-side function + secret; fixture writer only now; note CLAUDE.md"* (#140 AS-Q1) | VERBATIM | live log L82–83, inside `#140` (heading L54). Not found by a plain literal grep because the source wraps between `note` and `CLAUDE.md`; character-exact once soft breaks are joined. |
| E-9 | recorded as "the question's FIRST INSTANCE" | MATCH | log L83: *"(the LegiScan pattern; `Q-WF-4`'s first instance)"*. |
| E-10 | `V5-IDS` (L606) + `Q-T19-1` (L609) | MATCH | both register lines carry those IDs as their leading token. |
| E-10 | "both deferred via `D-6` at #98 (the deferral names `Q-T19-1`; `V5-IDS` by extension)" | MATCH | `#98` spans log L5098–5139: L5108 *"(labels packet-local — numbering DEFERRED, D-6)"*; L5122 *"Q-T19-1 numbering DEFERRED."* `V5-IDS` = **0** in `#98` (control `Q-T19-1` = 1). Annex A6 §4 says the same: *"the 'DEFERRED AT THE WALK BY MICHAEL'S WORD' sentence on the V5-IDS row is the runner's extension of `D-6` to the 'other half'."* |
| E-10 | *"the two registry files are now shaped two different ways"* | VERBATIM | register L606; hardened L151. |
| E-11 | `Q-RL6-5` (L761) + `Q-DES-6` (L774) | MATCH | both leading IDs correct. |
| E-11 | reciprocal self-identification verified; per-entry alternative + non-CCA/TRAP-47 branch live via *Whaley* | MATCH | hardened L152, near-verbatim: *"Reciprocal self-identification verified. Residue: the 'or is that judged **per entry**?' alternative, and the **non-CCA / TRAP 47** scope … the TRAP 47 branch is live via *Whaley*."* |
| E-12 | `Q-COM-10` umbrella (L832) | MATCH | register L832 leading ID correct. |
| E-12 | *"does the answer come before a third consumer picks one by implementation?"* | VERBATIM | register L832; hardened L153. |
| E-12 | "`-A` RULED #105 (the umbrella does not say so)" | MATCH | BUILD-STATE L14 and L151 (*"`Q-COM-10-A` IS RULED AND CLOSED (#105)"*). Register L832 mentions `Q-COM-10-A` once, only as *"Put as `Q-COM-10-A` with two options"*, and contains `#105` **0** times. |
| E-12 | "closes at list adoption per #100's own terms" | MATCH | register L832's own #100 annotation: *"**ANNOTATED add-only 2026-08-18 (#100), NOT CLOSED — but its DIRECTION is now RULED** … directs this row toward **ONE SHARED** [list]"*; BUILD-STATE L151: *"which closes the moment you adopt the unified `privilege_tier` list"*. |
| E-13 | `Q-FE4-2` (L946) · `Q-FE5-2` (L952) · `Q-FE6-1` (L960) | MATCH | all three leading IDs correct. |
| E-13 | "one shared limb of three, NOT verbatim duplicates; `Q-FE6-1` adds the 'slice 2' naming limb; `FE-7` has no disposition row at all" | MATCH | hardened L153: *"OVERLAPPING (1 shared limb of 3) … `Q-FE5-2` is **not a verbatim restatement** … plus the 'is "slice 2" the same as "the discovery slice"' limb … **`FE-7` has no disposition question at all and no `Q-FE7-*` row exists.**"* Re-derived: `Q-FE7-*` = 0 rows, 0 mentions. |
| E-14 | `[Task 7 memo Q4]` (L975) + `H43` (L978) | MATCH | both leading IDs correct. |
| E-14 | *"FC-8 ruled it"* | VERBATIM | hardened L165. |
| E-14 | "REFUTED: `H43` occurs nowhere in #106" | **MATCH — control fires** | `#106` = log L4102–4160. `H43` = **0** in that span; controls in the same span: `FC-8` = 1, `FC-` = 16. `H43` = 6 in the whole live log, 0 in the archive. Hardened §4.1 states the same. |

---

## §2 — BLOCK F

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| F-1 | `RE-1` (L75) | MATCH | register L75 = `- ⬜ **RE-1 — referral engine.**` |
| F-1 | *"Ruled yes-eventually; everything else OPEN"* (#9) | VERBATIM | archive L4532, inside `#9` (heading L4480; newest-first ordering, `#10` at L4387). |
| F-1 | *"the row stays ⬜ … RE-1 has NO design-doc home"* (#88) | VERBATIM | Both fragments at register L76, inside that row's own *"**Annotation added 2026-08-16 (#88), ADD-ONLY — the row stays ⬜ and nothing is closed**"* and *"**(1) RE-1 has NO design-doc home**"*. Note: the home is the **register's** #88 annotation — neither string appears in either log. |
| F-1 | "the audit's quote was from the WRONG RULING (limb (3) of the family-law deletion)" | MATCH | hardened L96, verbatim: *"**The quote is from the wrong ruling.** Byte-offset verified: 'referral out is first-class behavior' is **limb (3) of the family-law deletion ruling**…"* |
| F-1 | "'overflow' occurs nowhere else in the register" | MATCH | Exactly **2** occurrences register-wide, both inside RE-1's own block: L75 (the row) and L76 (its #88 annotation). Nothing outside RE-1. (Aside, not a sheet claim: log L510 asserts "exactly once", which is off by one.) |
| F-2 | `FC13-Q-5` (L432); "neither names the other"; "not in the `Q-STAT-5` stack" | MATCH | register L432 leading ID correct. `Q-RE-8` in L432 = **0**; `FC13-Q-5` in L878 = **0**; control `Q-RE-8` = 6 register-wide. Hardened L150 same, with *"`Q-RE-8` names the stack as four and it is not one of them."* |
| F-3 | `Q-RE-8` (L878); "shared BLOCKER, not shared question"; boundary interrogative | MATCH | hardened L149: *"**A shared blocker is not a shared question.**"* L878 carries the interrogative *"Is that scope the intended one … or is the registry the home for any proposition the software relies on…"* and *"All four now stack behind `Q-STAT-5`."* |
| F-4 | `Q-QBO-7` (L862) + twin `[Task 7 memo Q6]` (L977) | MATCH | both leading IDs correct. |
| F-4 | "the audit classed it a standing bar" | **PARAPHRASE** | The audit's ONLY mention of `Q-QBO-7` is L163: *"**Standing bars, not questions (2):** `Q-6` (CourtListener/FLP terms) · `Q-QBO-7`-adjacent EFSP bar."* It names a bar **adjacent to** `Q-QBO-7`, not the row itself. |
| F-4 | "it is a yes/no RULING question, unruled" | MATCH | register L862: *"**Do you want a standing constraint recorded in the Q-6 family for QBO?**"* |

---

## §2 — BLOCK G

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| G header | *"the complete inventory of open RULINGS"* (#114) | VERBATIM | register L3 and L11; live log L3354; audit L34 and L143. |
| G | "Wave 1 verified all **38** of the audit's action rows" | MATCH | audit §5 heading L141: *"## §5 — ACTION-NOT-RULING (38)."*; annex A8 title: *"ACTION-NOT-RULING (38 rows)"*. |
| G | "not one act has been recorded as happened since" | MATCH | annex A8 L387: *"**Not one act in the 38 has been recorded as HAPPENED since the audits.**"* |
| G | nearest partials — `RE-LOOK-1` half run (1.04 read, 7.03 outstanding) · `V-2` items 2–4 researched pending his word, item 6 discharged · `Q-3` evidenced, never clicked | MATCH | A8 L387 names the same three with the same substance; audit L157 independently: *"`RE-LOOK-1` (**half run** — … only 7.03 outstanding)"*. |
| G | `KICK-1`'s "12,041 B" was an extraction artifact; the row is **1,887 B**; the figure "swallowed eight following ✅ rows" | **MATCH — independently re-derived** | I measured the staged register directly: L1212–1231 = **1,887 B**; L1212–1239 = **12,041 B**; L1232–1239 = **10,154 B**, and that span contains **exactly eight** `✅` rows — K-5, GH-1, QR-1, QR-2, QR-3, QR-4, MM-1, QR-5. All three figures reproduce exactly. |
| G | "`Q-QBO-7` is not an action row (Block F)" | MATCH | consistent with audit L163 (see F-4). |
| G | **Actor spot-check 1 — `HK-4` → his hand** | MATCH | register L349: *"stage the 13 pilot recordings into `..\data`"* — a physical staging act on his machine. |
| G | **Actor spot-check 2 — `WS-P3` → his hand** | MATCH | register L390: *"Where does the 44-document retirement zip live? … Until it is stored somewhere durable…"* |
| G | **Actor spot-check 3 — `M-4` → his hand** | MATCH | register L522: *"**M-4** — **LegiScan key rotation after the T3 build (firm).**"* |
| G | **Actor spot-check 4 — `PR3-LOOK-1` → his hand** | MATCH | register L893: *"**YOURS**, and the cheapest move on the whole task. One query against the live database…"* — explicit. |
| G | **Actor spot-check 5 — `COM-LOOK-4` → his hand** | MATCH | register L838: *"A one-line fact question only Michael can answer … *(Michael's to answer per H5 — never a machine sweep.)*"* |
| G | **Actor spot-check 6 — `OPEN-3` → his hand** | MATCH | register L988: *"Is mdb-pllc the P15 or the P1? If the P15: where is Probate Corpus.zip…"* — a fact only he holds. |
| G | Actor spot-check 7 — `RE-LOOK-2` → his hand | MATCH | register L881: *"**Michael's to answer per H5 — never a machine sweep.**"* |
| G | Actor spot-check 8 — `WF-LOOK-1` → a session's research act | MATCH | register L907: *"Three propositions in §6.5, none verified, one (P-3, Tex. Health & Safety Code ch. 181) not even retrieved"* — a retrieval/research act. |
| G-Q1 | `HD-10` quoted as *"Close it by pointing at them — the two register rows ARE the verification act"* | **PARAPHRASE** | Live log L331 reads: **`HD-10` "Close it by pointing at them"** — the two register rows ARE the verification act; no new item. Only the first half is quoted matter in the source (Michael's words); the sheet's quotation marks enclose Michael's words **plus the entry's own narration**, joined by an em dash the source does not have inside the quote. Both halves are verbatim as text; the quotation boundary is not. |
| G-Q1 | `TRCP 195.2(a)/(b)` (L86) and `[DL-memo Q4]` (L1013) | MATCH | register L86 and L1013 leading IDs correct. |
| G-Q1 | "so the open-RULING count stops carrying these **37**" | **MISMATCH** | The block's own enumeration sums to **38**: his hand (18) + research act (17) + standing bar (1) = 36, **plus the R11 pair (2)** = 38. Separately, the "his hand" list as printed contains **19** items — `HK-4`, `HK-6`, `WS-P3`, `TC-OPEN-3`, `TC-OPEN-4`/`RF-2`, `KICK-1`, GPU-telemetry, `Q-3 RE-CHECK`, `M-3`, `M-4`, `_claude_extract\`, P15, Domser, `QBO-LOOK-2`, `COM-LOOK-4`, `RE-LOOK-2`, `PR3-LOOK-1`, `OPEN-3`, Tascam — so "18" holds only if Tascam (which IS listed) is silently excluded. The research-act list does re-derive to exactly 17. |
| G-Q1 | `RF-2` cited as a row (as `TC-OPEN-4`/`RF-2`) | MATCH (as an alias, not a row) | `RF-2` has **0** occurrences in the register; the audit L149 names it the same way (*"`TC-OPEN-4` handing in the master-skeleton REQ-CAPTURE (also `RF-2`)"*). Consistent with §3 item 4 listing `RF-2` among the no-row items. |

---

## §2 — BLOCK H

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| H | "All ten audit 'duplicates' re-verified in both directions" | MATCH | hardened §4 heading L144: *"## §4 — DUPLICATE (10)"*; annex A6 header: *"Each pair below was tested in BOTH directions."* |
| H | "not one is one question in two rows" | **PARAPHRASE** | The source phrase is *"**not one is a true duplicate**"* (hardened L52 and L144; A6 L360 quotes it in that form). The sheet's wording restates it; no source uses "one question in two rows". |
| H | "every proposed fold deletes at least one register-unique interrogative (counts with controls in annex A6)" | VERBATIM-VIA-ANNEX — **control re-derived** | A6 L360: *"for every pair the audit's fold would delete at least one interrogative phrase that occurs exactly once in the register (control `QR-1` fires 54/102 times)."* I re-ran the stated control on the staged register: `QR-1` = **54** line-hits and **102** flattened occurrences. Exact. |
| H | two DIFFERENT-QUESTIONS pairs (`WESTLAW-5`→`Q-RL6-*`; `Q-RE-8`→`Q-STAT-5`) and eight OVERLAPPING | MATCH | hardened §4 marks exactly those two ⛔ DIFFERENT-QUESTIONS; 10 − 2 = 8. |
| H | the eight overlapping pairs "take cross-reference annotations and rule-together notes **(E-10…E-14)**" | **MISMATCH** | One of the eight — `FC13-Q-5` → `Q-RE-8` (hardened L150, OVERLAPPING) — is dispositioned in **Block F** (F-2 and F-3) as KEEP, not in E-10…E-14 and not as a cross-reference annotation. The pointer covers at most seven of the eight. |
| H | "(§6 defect list)" | **MISMATCH** | §6 of this sheet is the wave-2 placeholder. The defect list is **§3**. (Same mis-pointer as E-8's "(§6)".) |
| H | "the collision report's own H43 clearance is WRONG" | MATCH | `id-collision-report.md` L278 clears `H43`: *"…same subject, not a collision"*. Hardened §4.1 splits it into H43-α (register row, **⬜ OPEN**) and H43-β (**RULED at `#106` via FC-8**), and states *"the string `H43` appears nowhere in `#106`"* — which I confirmed above with a firing control. |

---

## §3 — REGISTER DEFECTS

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| §3.1 | "`O-12`'s question text is TRUNCATED mid-sentence" — CONFIRMED | **MATCH — re-derived** | register L418 ends at *"a second default rule, `supabase_admin — **public**"* with an unclosed italic and an unclosed backtick; L419 begins a new row (`O-13`). Hardened L229 confirms with the identical terminal string. |
| §3.1 | fix source "UNVERIFIABLE-HERE (unstaged)" | MATCH | `spec-feedback.md` and any Grok review are absent from the staged set. |
| §3.2 | "five rows carry [🟡]" — **required re-derivation** | **MATCH — listed independently** | Row-anchored `^\s*- 🟡` returns exactly five: **L377 `HK-6`** · **L523 GPU-telemetry posture** · **L650 `V-5`** · **L667 `V-6`** · **L684 `V-7`**. Independently corroborated by BUILD-STATE L164, which names the same five. Sheet's own line cites for V-5/V-6/V-7 (L650/L667/L684) all match. |
| §3.2 | "the Convention line documents two glyphs" | MATCH | register L9: *"**Convention:** ✅ = closed (2026-07-26 unless a later date is stated) · ⬜ = open."* No 🟡. Hardened item 7 (L235) same. |
| §3.2 | header count "487 marked rows = 356 ⬜ + 126 ✅ + 5 🟡" | MATCH | Re-ran the stated regex `^\s*- (⬜\|✅\|🟡)`: total **487**; ⬜ **356**, ✅ **126**, 🟡 **5**. BUILD-STATE L164 independently states *"355 → 356 ⬜, 126 → 126 ✅, 5 → 5 🟡, 486 → 487 marked rows."* |
| §3.3 | "The Outlook edit/cancel defect has NO ROW" | MATCH | register: `edit/cancel` = 0, `outlook-edit-cancel` = 0. Control: `outlook` = 4, all unrelated (`outlook-email-intake.md` ×2, `outlook-setup.md`). Hardened item 8 (L236) same. |
| §3.3 | "BUILD-STATE carries it as live-with-no-fix" | MATCH | BUILD-STATE L93: *"the FIRST edit after a connect-time push CREATES A DUPLICATE and strands the original, permanently. Systematic, reproduced on a clean control. **Cause undetermined and NOT guessed; no fix.** Repro: `outlook-edit-cancel-exercise-2026-08-13.md`."* |
| §3.3 | "full text staged in §4" | **MISMATCH** | §4 contains **no staged text at all**. Its own body reads: *"[This section is assembled after his rulings … duplicating it here before the sitting would be copy-forward surface.]"* The same broken pointer applies to Block E's header (*"Each annotation is a dated sentence staged in §4"*) and Block C's header (*"its text staged in §4"* — §4 redirects that one back to Block C's cells, but E's and §3.3's have no home). |
| §3.4 | "**The 24 no-row items**" — count | **MATCH — re-derived** | FO (5: 1,2,3,6,7) + BR (5) + DA (4) + RC (3) + RF (4: 2,3,5,7) + INS-1 + MIG-1 + R11 = **24**. |
| §3.4 | each has no register row — **required re-derivation** | **MATCH — 24/24** | Word-bounded grep per ID against row-anchored lines: **zero** rows for all 24. Total register hits are only mentions inside other text: header L3 (`FO-1`/`FO-2`/`FO-3`, `BR-1`–`BR-5`, `RC-1`–`RC-3`, `DA-1`, `DA-4`, `R11`), the `FE-D1A-1` row L215 (`RC-1`, `MIG-1`), the `RECON-1` row L474 (`RC-1`). `RC-2`, `DA-2`, `RF-2`, `RF-3`, `RF-5`, `RF-7`, `INS-1` return 0 hits of any kind. |
| §3.4 | "`BR-2/3/4` … with no item text anywhere" — **control that fires** | **MATCH — CONTROL FIRES** | `BR-2`, `BR-3`, `BR-4` = **0** hits in the register, the live log, the closed archive **and** BUILD-STATE. The only occurrences anywhere in the staged set are the two documents that make the same finding: hardened L215 (*"`BR-2`, `BR-3`, `BR-4` have zero literal hits anywhere"*) and id-collision-report L12. Control: `BR-1` and `BR-5` each fire once in the register header. |
| §3.4 | "existing only as **range endpoints**" | **PARAPHRASE** | `BR-2/3/4` are the *interior* of the range `BR-1`–`BR-5`; `BR-1` and `BR-5` are the endpoints. The collision report's own wording (L12) is *"exist only inside range/slash notation"*, which is the accurate form. |
| §3.4 | "`RC-1..3` [since CLOSED at #139]" | MATCH | register header L3: *"`RC-1`–`RC-3` … are **CLOSED** at the 2026-08-31 sitting — the no-minting rule over those IDs stands; their openness does not."* (#139 is the 2026-08-31 typed sitting, log heading L230.) |
| §3.4 | "minting any is HIS act (the register header says so itself)" | MATCH | register L3: *"**Minting any of them is Michael's act.**"* |
| §3.5 | batch-84 header sentence contradicts the register's own rows | VERBATIM + MATCH | see E-8 above; register L3. |
| §3.6 | "Line-cite decay (**4 rows, 5 cites**)" — CONFIRMED | MATCH | hardened L231: *"**Four rows, FIVE cites — `Q-PR3-1` carries two** (`BUILD-STATE.md:142` and `:147`)."* |
| §3.6 | "**9 oversize rows (~62 KB)** CONFIRMED" | **MISMATCH** | Hardened L233 does read *"Nine rows over 2,000 bytes, ~62 KB \| **CONFIRMED.**"* — but (a) the sheet's own annex A8 L391 says the opposite: *"The nine-row/62 KB condensation figure **should be re-derived before it is acted on**"*; (b) the sheet's own Block G removes **10,154 B** from that total by correcting `KICK-1` to 1,887 B; and (c) the audit's nine stated figures (L251–253) actually sum to **69,933 B** (≈68 KB), not ~62 KB — and to **59,779 B** once KICK-1 is corrected. Labelling the figure "CONFIRMED" contradicts the sheet's own correction two blocks earlier. |
| §3.7(a) | *"re-upload SKILL.md v2 (SK-v2)"* still on the hand-list | VERBATIM + MATCH | BUILD-STATE L152, inside the *"STILL YOURS AND ALL SMALL"* hand-list. `SK-v2` closed at runner 83 (log L371 heading), so batches 83/84/85 = three refreshes since. |
| §3.7(b) | *"rides the v23 paste"* contradicts its own v28 line | VERBATIM | BUILD-STATE L144 (also register L879; hardened L118). |
| §3.7(c) | "`Q-RL6-1`'s row still says *Pharr* WAS NOT READ against #117" | VERBATIM fragment, **MISMATCH on location** | The stale sentence is real and verbatim — but it lives in the **REGISTER** at L757 (*"**Two cautions travel with it: *Pharr* WAS NOT READ (`Q-AUTH-1`)**"*), **not in BUILD-STATE**, and the item sits under the heading *"BUILD-STATE stale lines found by wave 1"*. BUILD-STATE L109 is in fact **current** on this point: *"`Q-AUTH-1` IS NOW EXECUTED (2026-08-19…)"* and *"opinions read in full and BOTH POSITIVELY IDENTIFIED UNDER V-9's SECOND LIMB"*. Five of the six items in §3.7 are BUILD-STATE lines; this one is not. |
| §3.7(d) | "the five 🟡 rows called *'execution-pending'*" | VERBATIM fragment; **characterization incomplete** | BUILD-STATE L164 reads *"are ruled-but-execution-pending **or awaiting your confirmation**"* — a disjunction. The sheet's gloss drops the second disjunct, which is precisely the one that fits `HK-6` and the GPU-telemetry row, and (for V-5/V-6/V-7) the reading the sheet is arguing against. The underlying point stands: register L604's `V-EXEC` row (✅) records *"**CLOSED 2026-08-17 (#96): all three landed.** V-5 executed — entries 19/20/21 split into 19a/19b/20a/20b/21a/21b"*, so execution is verifiable from staged sources without the registry files. |
| §3.7(e) | "`Q-WF-4` called *'ON NO ROW AT ALL'* beside a cite to its row" | VERBATIM + MATCH | BUILD-STATE L130 carries **both** in the same bullet: *"**THE HARDEST GATE IS ON NO ROW AT ALL (Q-WF-4)**"* and *"**ITS ROW NAMES ALL THREE CONSUMERS (#94)**"*. Annex A7 L228 flags the same internal contradiction. The row does exist, at register L900. |
| §3.7(f) | *"Rule 195.2's 30-day floor is GONE"* stated flat | VERBATIM + MATCH | BUILD-STATE L125, in a flat *"Also open:"* list. The same finding is an open `⬜` register row at L1013 (`[DL-memo Q4]`), and BUILD-STATE L125 itself notes the five are filed as `[DL-memo Q1]`–`[DL-memo Q5]` — so it is a memo finding awaiting his verification, as the sheet says. |

---

## §5 — THE QUESTIONS PUT BEYOND THE BLOCKS

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| Q-1 | "= G-Q1" | MATCH | internal pointer resolves to Block G's G-Q1. |
| Q-2 | "= **D-4/D-5/D-6/D-7**" as labels for the four register-defect fixes | **MISMATCH — ID collision** | Three of the four are already live decision IDs from the 2026-08-17 sign-off walk (`task-19-signoff-record-2026-08-17.md` §4): **`D-4`** = the keep-separate ruling on the three pairs (register L649, log L5091); **`D-5`** = the commissioned witness-statement research note (register L834 and L1250); **`D-6`** = the WP-numbering deferral (register L606/L608/L609, log L5095/L5108, BUILD-STATE, id-collision-report). Only `D-7` is free. **The sheet uses `D-6` in both senses at once** — E-10 cites it as the #98 deferral, §3.3/§5 mint it as the Outlook-defect label. This is the register's own "AN ID IS NOT AN IDENTITY UNTIL THE ROW IS READ" failure class. |
| Q-3 | `TOC-3` + `GLR-2` as ONE, "per the record's own 'one ruling closes both'" | MATCH | register L800 and live log L5813 — see E-6. |
| Q-4 | "the `Q-STAT-5` stack (**five rows**…)" | MATCH — derivable | The register rows citing `Q-STAT-5` are L861 `Q-QBO-6`, L878 `Q-RE-8`, L902 `Q-WF-6`, L957 `Q-FE5-7`, plus the anchor L1003 `Q-STAT-5` = **5** (`FC13-Q-5` at L432 excluded per hardened L150 and F-2). Worth noting for the record: the audit L200 says the stack is **(6)**, and `Q-RE-8`'s own row says *"All four now stack behind `Q-STAT-5`"* — the sheet's 5 is the anchor + the four, and is the only figure consistent with F-2's exclusion. |
| Q-4 | "hardening + wave 1 both confirm the rows differ" | MATCH | hardened L149; A6 L360. |
| Q-5 | "the weekly bar reset at 3:59 PM Central today" | MATCH | 2026-09-01 **is a Tuesday**; the standing terms are a Tuesday 3:59 PM Central reset. |
| Q-5 | "Fable is the ruled model class for adjudication sittings" | MATCH | MODEL USAGE / §7.2 routing: Fable adjudicates and audits. |

---

## §6 — WAVE-2 PLACEHOLDER

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| §6 | "the **~247** LIVE rows" | MATCH (approx., derivable) | 356 `⬜` at HEAD − 108 closure-class candidates = **248**. Within the stated tilde. |
| §6 | delegation to `OPUS-SWEEP_queue-live-rows_2026-09-01.md` | **UNVERIFIABLE-HERE** | No wave-2 output exists in the staged evidence set (`out/` holds only `wave1_A1`…`A8`). A file of that name exists at `/home/claude/work/OPUS-SWEEP_queue-live-rows_2026-09-01.md`, outside the staged sources, so it is out of this pass's reach. |
| §6 | "eight agents, zero output" (today's Fable death) | **UNVERIFIABLE-HERE** | A this-session event; nothing in the staged record can confirm or disconfirm it. |
| §6 | "the `#104` class" | MATCH | BUILD-STATE L159: *"**OPERATIONAL WARNING THAT SURVIVES: at #104 the agent fleet DIED — seven agents, twice, all on `API Error: 529 Overloaded`, zero tokens — and the harness returned `{"surviving_defects":[]}`, a TOTAL FAILURE WEARING THE COSTUME OF A CLEAN BILL OF HEALTH.**"* Live log L3677 carries the same image. Note the class matches; the **#104 instance** was seven agents on 529s, today's is eight at a weekly limit — the sheet says "class", which is correct. |
| §6 | "surfaced by the harness and recorded rather than worn" | MATCH (shape) | the check is routine in the record — live log L76: *"and returned (the `#104` dead-fleet caveat did not apply)."* |

---

## §7 — WHAT THIS SHEET DOES NOT ESTABLISH

| Location | Fragment / claim | Verdict | Detail |
|---|---|---|---|
| §7 | "the 2026-08-24 audit fleet — **Fable 5** (consolidation **Opus 5**)" | **VERBATIM — matches the audit's own header** | audit header: *"**Model routing:** the eleven-agent audit fleet ran on **Fable 5** (adjudication/audit class, §7.2, run where the repo can actually be checked); this consolidation is **Opus 5** (execution class)."* |
| §7 | "the hardening — **Opus 5**" | **VERBATIM — matches the hardening's own header** | hardened header: *"**Produced by:** Cowork design session, **2026-08-25 Central** … **Opus 5, execution class.**"* |
| §7 | "wave-1 verification … — **Fable 5**" | **UNVERIFIABLE-HERE** | **None of the eight wave-1 reports states its own model.** A1–A8 headers give slice, staged files, HEAD and method only. Every `Fable 5`/`Opus 5` string inside them names a *cited historical session* (e.g. A1 L52 "#53 is Fable 5 typed"; A2 L176 "(design session, Fable 5, Cowork)"; A6 L216 "(design session, Opus 5)"), never the report's own run. `wave1_A8.md` contains **neither** string. |
| §7 | "this adjudication — **Fable 5**" | **UNVERIFIABLE-HERE** | Self-asserted in the sheet's own header (*"Cowork, **Fable 5** per the environment"*); no staged source bears on it. |
| §7 | "wave 2 — **Opus 5** (pending)" | **UNVERIFIABLE-HERE** | No wave-2 artifact is staged (see §6). |
| §7 | "the registry files were NOT staged — every claim about them above is marked and carried as UNVERIFIABLE-HERE" | MATCH | No `legal-rule-registry-*` file is in the staged specs directory. The sheet carries 5 `UNVERIFIABLE-HERE` markings. Within my scope the registry-dependent claims are marked (E-7 intake spec, E-13 amendment slice); §3.7(d)'s V-5/V-6/V-7 execution claim is unmarked but does **not** need the registry — it is verifiable from register L604 (`V-EXEC`, ✅) and the 51st-invocation runner record (log L5238–5255). |
| §7 | "no live-database fact (`MIG-1` carried unverified)" | MATCH | `MIG-1` has no register row (§3.4) and is named only as a gate (register L215; BUILD-STATE L2/L93 area). Nothing staged asserts a database state for it. |
| §7 | PF-1 skip: "it carries no legal characterization and no proposed registry entry" — the trigger as stated | **VERBATIM** | BUILD-STATE L159: *"**Trigger: any packet carrying a legal characterization or a proposed registry entry. Run by the DESIGN SESSION before shipping, pre-`inbox/`.**"* The sheet's trigger wording is character-exact against the record's own statement of PF-1. |
| §7 | "the QR-6(f)-shaped skip, recorded here rather than silent" | MATCH | QR-6(f) is the record-the-skip-and-name-the-reason rule; the sheet records it. |

---

## Cross-cutting notes (not verdicts)

- **`docs/record/` sources behaved as expected.** The live log and the archive were read full-text from the staged copies; every "zero hits" above was paired with a control that fired in the same file and span.
- **Wrapped quotes.** Two fragments (E-9's AS-Q1 quote; E-1's `#135` pair) are invisible to a plain literal grep because the log hard-wraps mid-quote. Both are verbatim once soft breaks are joined. Any downstream execution matching on exact strings must normalize whitespace or it will report false NOT-FOUNDs.
- **A6's stated control re-ran exactly** (`QR-1` = 54 line-hits / 102 flattened), and A8's `KICK-1` arithmetic re-derived to the byte. The annexes' mechanical work held everywhere I tested it.
- **The one place the sheet and its own annex disagree** is §3.6's "~62 KB CONFIRMED" against A8 L391's "should be re-derived before it is acted on" — flagged above as a MISMATCH.
