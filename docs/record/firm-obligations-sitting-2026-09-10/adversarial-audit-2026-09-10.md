# ADVERSARIAL AUDIT OF THE `#155` PACKET — two lanes and a re-sweep (2026-09-10)

**Status:** EVIDENCE (CAP-2). Canonical repo path: `docs/record/firm-obligations-sitting-2026-09-10/adversarial-audit-2026-09-10.md`. Three read-only Opus subagents were run over the packet BEFORE the zip closed, each told to REFUTE rather than confirm: **lane A — fidelity to the running ledger** (does every document state the rulings exactly as the ledger records them; are the documents consistent with each other); **lane B — HEAD facts and conventions** (is every factual claim about the repo true of the staged copies at `357ca8e`; can every ordered edit execute as written; are the house conventions honoured); then, after the fix pass, **a third auditor as RE-SWEEP AFTER FIX** over every claim the fixes touched. Not a PF-1 fleet — no legal characterization travels in this packet — but the `RE-SWEEP AFTER FIX` family, discretionary. Every finding below is disposed; none was softened.

## Lane A — fidelity: 20 findings (2 HIGH / 6 MEDIUM / 12 LOW)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| A1 | HIGH | The closed register's ✅ baseline was written as 154 (the batch-95 line's TOTAL) when the closed file holds 143; the predictions were 11 too high. | FIXED — closed 143 → 163, total 154 → 174, in the register-rows file and the manifest §4.4; measured by the alternation matcher over the staged closed register. |
| A2 | HIGH | The card horizon was stated two ways: §3 item 6 "overdue OR (lit AND target within 14 days)" against §2.2 / the rulings record / §16 "lit (or overdue) AND target within 14 days" — the second would drop a hard item overdue more than 14 days, against `FO-2`. | FIXED — every statement conformed to the disjunctive rule (an overdue item is never dropped); the option description's literal wording is disclosed in the slice §2.2, the rulings record §2 and §16 §5.1 as read as the mock's rendering (`FOM-13`'s own words: *"the card never shows what the register has not lit"*), flagged for Michael's eye; §7 item 11 gained the case "hard overdue 40 days IS on the card". |
| A3 | MED | §7 item 5's fixture said "Sat Jan 31 2027" — 2027-01-31 is a Sunday; §2.3's example used a different year's dates. | FIXED — fixture R = Sat Jan 30 2027 (T Fri Jan 29; rolls-forward D Mon Feb 1; no-roll D Sat Jan 30, Sun Jan 31 overdue count 1; `lightsOn` Dec 30 2026 for a 30-day lead); pinned for R = Sun Jan 31 2027 too; §2.3's example aligned. |
| A4 | MED | "0 hits by the alternation matcher" for `FO-1`–`FO-7`/`BR-3`/`FOS-1` — the bare matcher finds those strings INSIDE `Q-FO-` row text; only an ID-anchored match returns zero. | FIXED — the ID-anchored matcher named in the register-rows header and the manifest fact 6, with the reason (an ID is not an identity until the row is read). |
| A5 | MED | `src/outlook/config.ts` was read for the slice but absent from the ledger's and the entry's read lists. | FIXED — added to the ledger (an "additional staged reads" section) and the entry ("four read … plus two migration files"); the slice's Authored bullet names all six. |
| A6 | MED | The manifest §5 attributed *"the queue runner is BARRED from this slice"* to the prompt; it is the slice's status line. | FIXED — attributed to the slice; the prompt's Step 0 sentence quoted for the runner bar. |
| A7 | MED | The entry reported "a two-lane audit … every finding disposed" before the audit had run and before its record existed. | FIXED — the entry's audit sentence rewritten after the re-sweep with the real tallies; this record filed. |
| A8 | MED | The rulings record put `INS-1` inside Michael's DECISION 10 words; the ledger records `BR-2`, `BR-4`, `DA-2` (and `FO-4`, `FO-5`, `BR-3`). | FIXED — `INS-1` separated as a packet act on the id-collision report's finding. |
| A9 | LOW | The `FOS-1` option-set label drifted ("Yes with `FOD-20` OUT" vs the widget's "Yes, `FOD-20` OUT"). | FIXED — the widget's label used everywhere; the ledger's line corrected with a note. |
| A10 | LOW | The `FOM-8` fallback event's day named three ways (lit day / `lightsOn` date / lead day). | FIXED — "the `lightsOn` day (the lead day)" everywhere; the ledger bracketed. |
| A11 | LOW | `FOD-31` said "`FOD-17` unchanged" beside a preamble saying it was amended by `FOM-6`. | FIXED — "`FOD-17`'s last-day-of-month limb unchanged; its lighting limb amended by `FOM-6`". |
| A12 | LOW | §2.3 item 4 enumerated four states; §7 and §16 named a fifth, `past-date-unknown`. | FIXED — five states named in §2.3, with a precedence clause (re-sweep item 8). |
| A13 | LOW | The slice's filed size differed from the size put to him with no note. | FIXED — the rulings record §3 states 49,838 B as put and points at `CHECKSUMS.txt` for the filed size, naming what changed. |
| A14 | LOW | The `FO-2` row's quote elided the carried text. | FIXED — the carry's text used verbatim. |
| A15 | LOW | "Nine" born rows against DECISION 10's eight — the ninth (`FOS-1`) unattributed. | FIXED — attributed to the authorization act on the `CCS-1` precedent, under its own series heading (re-sweep item 12). |
| A16 | LOW | Routing rows named the audit record and `CHECKSUMS.txt`, which were not yet in the packet. | FIXED — both produced at packaging; the ledger copied in. |
| A17 | LOW | The manifest §6's date clause forbade what the slice deliberately does (fictional fixture dates). | FIXED — reworded: no example date is a real firm date. |
| A18 | LOW | The entry's "RE-SWEEP AFTER FIX ran on the fix pass (below)" pointed at nothing. | FIXED — the entry names the fleets and this record. |
| A19 | LOW | The `Q-FO-2` row's sentence omitted that `FOM-12` (DECISION 1's) is on the `Q-FO-11` row. | FIXED — the pointer added. |
| A20 | LOW | "lines 484–497" — the rows are 486–497; 484 is the heading. | FIXED — "the heading at 484, the rows at 486–497; locators only; cite by ID". |

## Lane B — HEAD facts and conventions: 15 findings (2 HIGH / 6 MEDIUM / 7 LOW)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| B1 | HIGH | The same closed-register baseline error as A1, measured: `grep -cP '^\s*- ✅'` → 143. | FIXED (with A1). |
| B2 | HIGH | v32's header said "additions have never counted as a trigger-4 firing" — false: the 2026-08-07 probate-index-set firing WAS an addition. | FIXED — reworded to the standing practice for TRANSIT files since v26 (the `#151`, `#152` and `#154` pairs entered without a firing; the 2026-08-07 firing was an addition of RESIDENTS). |
| B3 | MED | The entry claimed the sitting "ran past midnight" before it had, and cited `#152` (which stamps the LATER date) for stamping the earlier one. | FIXED — the straddle claim removed; the entry is stamped the Central date of the sitting's work; the `#153` precedent cited for a next-day commit. |
| B4 | MED | "No file in `db/migrations/` widens the CHECK" presented as re-read when only two of eleven migrations were staged. | FIXED — re-read in the two staged files; the other nine CARRIED from `#151`; the prompt's Step 2 re-verifies. |
| B5 | MED | "build 0, lint 0 per BUILD-STATE" — BUILD-STATE carries only the test count; the build/lint/`tsc` figures live in the unnumbered `CCS-1` build entry. | FIXED — sourced correctly in the slice §1 and §9 and the prompt (re-sweep item 3 caught §9). |
| B6 | MED | The routes list in the slice §1 was partial (14 of 27 distinct) presented as the list. | FIXED — 28 route paths (27 distinct) listed in full; the load-bearing negative (`grep -n firm` → 0) named. |
| B7 | MED | "12:23 CDT fetch" conflated the commit time (reflog) with `FETCH_HEAD`'s mtime (`device_list_dir`). | FIXED — both named with their sources. |
| B8 | MED | Three routed files absent from the packet directory (the ledger sat one level up; the audit record and `CHECKSUMS.txt` did not exist). | FIXED at packaging — all three present. |
| B9 | LOW | "The reflog's last three" listed two. | FIXED — `b2dc222` (01:27:20 CDT) added. |
| B10 | LOW | `Q-STAT-5` located "under the statute heading" — no such heading; it sits under `### Process, tooling, and housekeeping`. | FIXED. |
| B11 | LOW | The sheet's duplicate-watch drew a distinction that did not exist (the batch-93 pointer IS the "Rendered examples" line). | FIXED. |
| B12 | LOW | The §16 append instruction said "one blank line, then the block" while the block begins with its own blank line. | FIXED — "the block begins with its own blank line, so add no other". |
| B13 | LOW | The reconcile sentence's "through its closing `)`" — the sentence holds two nested parentheticals. | FIXED — "match by balance". |
| B14 | LOW | The `BR-3` row said "at `#155` it is spec'd" — spec'd at `#151`; offered and intended-active at `#155`. | FIXED. |
| B15 | LOW | The v32 scratch file's exact path in `Claude outputs\` not named. | FIXED — named in the entry. |

## The re-sweep (third auditor, over the fixed passages): 15 findings (2 HIGH / 5 MEDIUM / 8 LOW)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| R1 | HIGH | The entry's v32 size and sha256 were stale after the trigger-4 rewording. | FIXED — the entry's figures are written LAST, from the final files, and `CHECKSUMS.txt` is generated after them (v32 final: 89,737 B, sha256 `dbed828b…`). |
| R2 | HIGH | The entry's slice size (50,462 B) was a mid-fix snapshot. | FIXED — the final filed size written last (see `CHECKSUMS.txt`); "49,838 B as put to him" kept. |
| R3 | MED | Slice §9 item 1 still sourced build/lint to BUILD-STATE. | FIXED. |
| R4 | MED | The routed ledger's line 54 stated the pre-fix card rule as the rule. | FIXED — a bracketed correction beside it (the ledger's own convention). |
| R5 | MED | v32's header and the rulings §6 named a `#153` capture pair that never existed. | FIXED — "the `#151`, `#152` and `#154` pairs". |
| R6 | MED | The ID-anchored regex was wrapped in single backticks while containing a backtick — the inline span closed early. | FIXED — double-backtick spans in the register-rows file and the manifest. |
| R7 | MED | "opened 21:34 CDT" appeared twice in the entry's heading. | FIXED. |
| R8 | LOW | The five render states overlap with no stated precedence. | FIXED — `past-date-unknown` takes precedence over `target-passed` and `overdue`; `done` over everything. |
| R9 | LOW | §16's card bullets did not disclose the option text's literal wording. | FIXED — the disclosure half-sentence added to §16 §5.1. |
| R10 | LOW | The slice's Authored bullet omitted the two staged migration files. | FIXED. |
| R11 | LOW | The manifest's "packaging crosses midnight (the `#153` precedent)" over-extended the precedent (its COMMIT crossed, not its packaging). | FIXED — "if this batch commits on a later date the stamp stands". |
| R12 | LOW | `FOS-1` placed under the FIRM OBLIGATIONS heading, while `CCS-1` took its own series heading. | FIXED — `FOS-1` under `### Firm-obligations slice (FOS series) — ADDED 2026-09-10 (#155)`. |
| R13 | LOW | The ledger's "on the lead day" residue. | FIXED — bracketed "(= the `lightsOn` day)". |
| R14 | LOW | One ragged 124-char line in v32's hand-wrapped header. | FIXED — re-wrapped (max 111). |
| R15 | LOW | The audit record and `CHECKSUMS.txt` still absent at re-sweep time. | FIXED at packaging. |

**Verified and held by every lane (no findings):** every pick label character-for-character against the ledger; the DECISION↔`Q-FO` map; every `FOM` attached to the decision the companion attaches it to; the twelve activations and the eight `conditionalPerPeriod` rows as one set everywhere; the 535-character `FOS-1` text identical in four places; `FOD-20`–`FOD-33` each defined once; every §3/§7 cross-reference; all four exact-match anchors occurring exactly once, both target files LF; the twelve `Q-FO-` rows, `Q-API-20` and `Q-STAT-5` located in the stated forms; the FIRM OBLIGATIONS heading byte-identical; the counts 386 / 7 / 11 / 143; every slice §1 schema and source fact (the `NOT NULL`, the six-value CHECK, `MATTER_PROP_ID`, the calendar name, 46 tables, 0 `firm_obligation`); every byte figure the entry states for the record's files; QR-5(a) clean; TOC-6 (`#154` top, `#155` free in the staged set); CAP-2 classes; CAP-3 moves; CITE-STABILITY; DT-1; PF-1's premise (no statement of law in the new channel bullets); no firm fact asserted; §5 NONE with the boundary quoted; §8 present.

**What the fleet cannot verify, said plainly:** the four new canonical paths' absence and `FOS-`'s absence repo-wide rest on the sitting's `device_list_dir` and its staged subset — the runner's Step 1 is the full check; the live instructions field's byte-equality with the v31 EVIDENCE copy was not read this sitting (no docs-API read); origin's state is unknown beyond the local tracking ref.
