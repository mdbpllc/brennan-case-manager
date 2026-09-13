# ADVERSARIAL AUDIT RECORD — the `FOS-2` fix slice and its kickoff prompt, 2026-09-12

**Status:** EVIDENCE (`CAP-2`). Canonical repo path `docs/record/firm-obligations-hands-on-2026-09-12/adversarial-audit-2026-09-12.md`. Two read-only auditor lanes ran on the FIRST draft of `docs/specs/firm-obligations-fix-slice.md` and `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md`, each told to REFUTE, before the files were delivered to Michael and before `FOS-2` was put. Lane A checked fidelity to the running ledger; lane B checked HEAD facts (staged copies at `5781420`) and conventions. Every HIGH and MEDIUM finding was fixed in the text before delivery; LOWs were fixed where they touched a claim and are listed where not. A re-sweep of the fixed text was Claude's own read (RE-SWEEP AFTER FIX) — recorded honestly as a single-reader pass, not a third lane.

## Lane A — fidelity to the ledger (2 HIGH / 7 MEDIUM / 7 LOW)

| # | Sev | Finding (auditor's words, compressed) | Disposition |
|---|---|---|---|
| A1 | HIGH | The prompt's Step 1 and the slice cite `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md`, which the packet did not yet contain. | The rulings record was written and is in the packet (RULING). Slice status line names it as filed by the same packet. |
| A2 | HIGH | `reminderOn = T − min(outlookReminderDays, leadDays)` silently ignores a hand-raised value above the lead — the very thing the field is for ("raised by hand on the long-think rows"). | FIXED: the field fires exactly; the lead-cap is the PRE-FILL (`min(30, leadDays)`) — `FXD-9`; put inside the `FOS-2` question; Michael's "Yes" covers it. |
| A3 | MED | "three"/"five" columns claimed, two + two defined. | FIXED: two obligation columns + two occurrence columns = four, everywhere (§3 item 9, §5, §7 item 8, §10, prompt). |
| A4 | MED | The prompt renamed the `FOS-1` build's conflict test — a code act the slice and ledger call "no code change". | FIXED: prompt says no code change, the test may keep its name; slice §4 names it OUT. |
| A5 | MED | `FXD-2` gave up after three drains — narrows "retry on next sync". | FIXED: retrying never stops; an entry with `attempts ≥ 3` is ALSO named in "Needs attention". |
| A6 | MED | §1 claimed every part C item was "mapped below"; most were not; item 3 has no ledger disposition. | FIXED: §1 maps each item to its `#156` disposition; items 3 and 12 stated as NOT put, left as built. |
| A7 | MED | §11 said his `FOS-2` answer "is recorded" — a prediction written as a report (the QR-5(a) shape). | FIXED: "when given, is recorded"; "until that entry exists at HEAD, this document authorizes nothing"; the prompt's sentence likewise. |
| A8 | MED | AS-Q17 dropped "under its causation sentence" and attributed an `AS-Q5` limb to `#156`. | FIXED: the placement restored in B3, §3 item 14, §7 item 11; `AS-Q5` stated as ruled at `#146`, not put at `#156`. |
| A9 | MED | `FXD-6` offered "or the master's second spot" — a reading the ledger excludes ("the custodian line is suppressed"). | FIXED: the alternative removed; `FXD-6` is the mechanism for his suppression. |
| A10 | LOW | Not-applicable folded into A2's Done retitle without a label. | FIXED: `FXD-10`. |
| A11 | LOW | §8 added "weekend-rule" to `FOD-4`'s permitted edits. | FIXED: "a lead, rule or override edit … (a weekend-rule edit routes through the same re-evaluation, as built)". |
| A12 | LOW | The prompt's `FOS-2` quotation was not verbatim ("this prompt"). | FIXED: verbatim, with the `FXD-9` clause. |
| A13 | LOW | B5's heading string stated as if ruled. | FIXED: labelled FACT AT HEAD with its source (THIRD TRANCHE item 10). |
| A14 | LOW | Two byte-identity tests defeated by other items in the slice. | FIXED: qualified (no D-8 edge; no custodian-only shape). |
| A15 | LOW | `FXD-4` said the local adapter is "untouched in shape" while items 6–7 add a method. | FIXED. |
| A16 | LOW | `firm_reactivate` and `firm_activate_from_inactive` both listed after C8 made them one act. | FIXED: the two are different acts (a retired row's Re-activate vs the Inactive path); said so. |

## Lane B — HEAD facts and conventions (2 HIGH / 7 MEDIUM / 6 LOW)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| B1 | HIGH | The column count (same as A3). | FIXED (A3). |
| B2 | HIGH | §3 item 16 asserted the `R15` scalars already resolve to the static text on a one-client case; THIRD TRANCHE item 10 says they "resolve nothing today". | FIXED: §1 states the fact; §3 item 16 makes the resolution a BUILD ITEM (static text on one client; the ruled `R15` shape on multi-client); §7 item 13 tests both; the prompt's Step 2 re-verifies the current scalar value. |
| B3 | MED | "commit `5781420` at origin per the build's live `ls-remote`" — the build entry's `ls-remote` was of `cab3b1c`; `5781420` is a tracking ref. | FIXED: §1 says origin was NOT read; `5781420` is the local HEAD and tracking ref. |
| B4 | MED | The `FXD-` collision check named no command and could not be repo-wide. | FIXED: §6 names the command and its scope (fifteen staged files + a project-knowledge search), says NOT repo-wide, and orders the build to re-check. |
| B5 | MED | §5.4 ordered an edit to a header list that does not exist ("WHAT THIS DOES"); left the `Authorization:` line and the `STATED, NOT FIXED` comment to contradict the amended file. | FIXED: a WHAT THIS DOES list is ADDED above the existing NOT-DO list; the `Authorization:` line gains `FOS-2`; the comment is removed with the CHECK fix. |
| B6 | MED | B3 mis-cited D-65 as the marker "exclusion"; D-65(b) is an INCLUSION rule for the block; the exclusion lives at §8.3 / the `AS-Q17` default. | FIXED in the slice and the prompt. |
| B7 | MED | "The failure-injection fake's 67 tests" — 67 is the whole adapter test file. | FIXED: only the compensation-branch tests are replaced; unrelated pins kept. |
| B8 | MED | The prompt named a JSON key (`materialized-from`) no source names. | FIXED: "its key name as built — read it, do not assume it". |
| B9 | MED | The §2.1 cites "(B1)"/"(B2)" collided with the slice's own group-B labels. | FIXED: cites now read "spec-feedback part B item 1/2". |
| B10 | LOW | Same as A9. | FIXED. |
| B11 | LOW | Five `FOS-1` §8 phrases dropped without a home. | FIXED: restored in §8 (holiday list; the registry file; `externalRef`/`ledgerRef`; delegated marker / per-user fan-out; To Do task). |
| B12 | LOW | §1 omitted `7c68eb9`. | FIXED. |
| B13 | LOW | Head/foot placement unguarded. | FIXED: the STOP covers count AND placement. |
| B14 | LOW | `FOD-29`'s month-precision limb silently dropped. | FIXED: `FXD-11`. |
| B15 | LOW | "corrected by `#156`" — whether `#156` acted was not in the sources. | FIXED: "corrected by the `#156` packet's exact-match order, spec-feedback part C item 16" — which this packet carries. |

## Verified correct by the lanes (not listed above)
All fourteen quoted picks in §2.1/§2.2 match the ledger verbatim; nothing in §3 builds a held or later item; D-18 and D-8 are stated correctly; `STORE_VERSION = 17`, `SCHEMA_TABLES` 48, tests 1,081/56, the health trio, the 23,843 B migration, `dev:demo` on 5175, the Entra origin, the `outcome_reason` CHECK text, the triggers/policies/GRANTs/index, `CAP-2` classes, no line-number cites, no legal characterization, DT-1 stamps, the migration status carried as his word throughout.

## The re-sweep (single reader, Claude, after the fixes)
Re-read every changed claim against the ledger and the staged sources: the four-column count is consistent in eight places; `FXD-9` appears in §1 (by implication), §3 items 1–2 and 10, §6, §7 item 1, §11 and the prompt's header and Step 3; the `FOS-2` question in §11, in the prompt and in the widget as put are the same words. One residual, stated rather than hidden: the sitting could not re-read `src/` (no shell on the checkout), so every `src/`-level claim in the slice rests on the two CODE entries at HEAD and is marked for the build's Step 2 re-verification.
