# RENDERED-EXAMPLES AUDIT — two adversarial read-only passes and the disposition of every finding (2026-09-08)

**Status:** EVIDENCE (`CAP-2`). The audit record for the `#152` packet's mock and companion documents. `PF-1` did not fire on this packet (no legal characterization, no registry entry — the companion doc's §6 says why); these two passes were run anyway, in `RE-SWEEP AFTER FIX`'s family, because a rendering that misstates a spec would mislead the sitting it exists to serve. Both auditors were told to REFUTE. Every HIGH was real. The fix pass was re-run through the harness (108/108) and re-clicked headless (zero errors) — the fixes' own check.
**Canonical repo path:** `docs/record/firm-obligations-design-2026-09-07/rendered-examples-audit-2026-09-08.md`.
**Basis:** HEAD `8f7467b`; the mock and the companion as they stood at ~02:05 CDT; the normalizer record as it stood then. Findings are quoted in the auditors' words (condensed where marked); dispositions are this session's.

## A — the documents against HEAD (companion doc, normalizer record, fixture strings, regexes)

Verified true and not faulted (the auditor's list, condensed): the sheet's sha256; the DECISION↔`Q-FO` map; all eleven DECISION texts verbatim by programmatic compare; 26 worksheet rows; 91/91 at the time; `FOM-` free repo-wide; every Fixture A figure the companion states (352/27 hard overdue, 31/1 routine, 59/49/44 lit, 7 of 14, Later ×2, 23 activated, 5 seeded inactive); Fixture B's empty card; the `;AA` site counts, the 13 changed lines, the zero residual, the per-rule counts cell for cell; that no quoted passage contains `;AA`; all 36 `sourceNote` strings trace to spec §7 cells; every firm-fact string is labelled fixture; neither document states a proposition or a firm fact; the regexes have no false positive in any provided text.

| # | Sev | Finding (condensed) | Disposition |
|---|---|---|---|
| A-1 | HIGH | Retire hides the open occurrence: `registerGroups`/`cardItems` skip `active === false`; the Inactive row offers Activate… — the back door §4.5 forbids; the harness pinned only "no next after retire". | **FIXED.** Retired obligations' open occurrences render in their group marked *retired — stays until done*; no next materializes on Done; the Inactive section lists retired obligations only once nothing is open; Un-retire reverses; a test pins the open occurrence on the register and the card after retire. |
| A-2 | MEDIUM | `FOM-4` quoted "the first rule date on or after today" and "finishing the 2025 practice-time report in 2027" as the spec's; §4.1 states the anniversary case only and the example is the sheet's. | **FIXED** in the companion: attributions corrected; the fixed kinds' first-occurrence rule named as the mock's default and proposed for the spec. |
| A-3 | MEDIUM | The fixture set `conditionalPerPeriod` on FOT-15/16 beyond the spec's four, silently applying half of `FOM-2`. | **FIXED.** The fixture renders the spec's four; `FOM-2` gained a switch that adds 10/11/15/16 as the proposal. |
| A-4 | MEDIUM | The record's proposed code block did not fit §3's 2-tuple loop (3-tuples; list order would let `period` eat the article pair). | **FIXED.** The amendment is restated in §3's own shape — a pre-pass for the article rule plus one appended pair — and `norm2.py` is that exact shape; outputs re-verified identical (16/16). |
| A-5 | MEDIUM | "Eleven chapters" vs nine named; CR.42 named in the pass's §1 but unchecked; header said nine. | **FIXED.** CR.42 extracted and checked (0/0); the record now says ten of the eleven checked, the eleventh unnamed, and cites §3's own residual report over all eleven. |
| A-6 | LOW | The January-pile-up sentence named the Q4 941 and "two cadences" that are not January items at that clock. | **FIXED** (rewritten to what the clock actually shows). |
| A-7 | LOW | Record: "only inside its residual-report table" vs item 3 of its findings. | **FIXED** ("…and in the finding paragraph beneath it"). |
| A-8 | LOW | Excerpts file: three lines / twelve occurrences, not "two lines". | **FIXED.** |
| A-9 | LOW | The "later docs act" sentence is BUILD-STATE's; `#151` said "(a later docs act)". | **FIXED** (both quoted, each attributed). |
| A-10 | LOW | `FOM-10` "never stated" overstates (the sheet's "and so on until he is current"; §4.1's "never skipped silently"). | **FIXED** ("stated obliquely"). |
| A-11 | LOW | `FOM-9` presented most-overdue-first as the spec's consequence; the spec fixes no within-pin order. | **FIXED** (rewritten: the mock's choice, put for his eye). |
| A-12 | LOW | "converts only bold/italic/code marks" omits the HTML escape and the blank rendering. | **FIXED.** |
| A-13 | LOW | `FOM-3`'s "fall outside every group" is true after a Done / a far anchor, not always. | **FIXED** (qualified). |
| A-14 | LOW | `FOD-7` quoted as "while the next is untouched"; the text is "while the next occurrence is untouched". | **FIXED.** |
| A-15 | LOW | "No quotation of law is made here" while artifact-shape fragments from two chapters outside the sixteen are shown. | **FIXED** (the fragments named as artifact SHAPE, two from `tx.155`/`tx.162`, not quotations on the record). |

## B — the mock's behaviour against the spec (line by line, with headless clicking)

Also reported and not faulted: `nextRuleDate` matched an independent reference on 124,538 (rule, date) pairs — Feb 29 anchors, day-31 monthly chains, every-4-year stepping, quarterly at year end — with zero mismatches; no JavaScript error path reachable by clicking.

| # | Sev | Finding (condensed) | Disposition |
|---|---|---|---|
| B-H1 | HIGH | Undo with a touched next left TWO open occurrences (`FOD-5` broken); the test pinned it as intended. | **FIXED.** `canUndo` requires the materialized next to be open and untouched (`FOD-7`'s own condition); otherwise undo is refused and the row says why; tests pin the refusal. |
| B-H2 | HIGH | Undo on the older of two done rows deleted the wrong occurrence (the obligation's first open one) and later duplicated a period — silent corruption. | **FIXED.** Each close records the id of the occurrence it materialized (`nextId`); undo acts only on that occurrence, and is offered only on the close whose next is the current open one; a test pins that only the latest close can be undone. |
| B-H3 | HIGH | Retire hid the open occurrence on both surfaces, and Activate then materialized a second first occurrence. | **FIXED** (as A-1; Activate never materializes when an open occurrence exists). |
| B-H4 | HIGH | "overdue" printed on the Sunday after a Saturday due date (`FOD-1`), and the card printed it with no note. | **FIXED** in the mock (the weekend exemption: *past its date · weekend* with the note; Monday prints overdue) — and the Monday question became **`FOM-12`**, a finding about the spec. |
| B-M1 | MEDIUM | One-time obligations did not retire themselves; the row vanished with its history unreachable. | **FIXED.** Done on a one-time obligation retires it (§3.2); it rests in Inactive with its history count. |
| B-M2 | MEDIUM | `quarterOf` assumed the 941 shape; the estimates row (Apr/Jun/Sep/Jan 15) got duplicate labels and colliding Outlook subjects. | **FIXED.** Quarterly labels follow the rule's own list order, the January date belonging to the prior year; a test pins Q1–Q4. |
| B-M3 | MEDIUM | The card carried a pending (not lit) hard item within 14 days, against §4.3's "nothing lit or overdue → nothing". | **FIXED** in the mock (the conjunctive reading is the default; a switch renders `FOD-14` literally) — and the disagreement became **`FOM-13`**. |
| B-M4 | MEDIUM | DECISION 2 option 2 made interval kinds serial; §3.2 says collapse by construction. | **FIXED.** Interval kinds are collapse whatever the switch or the field says; a test pins completion + 91 under `serial`. |
| B-M5 | MEDIUM | The `FOM-1` switch covered only monthly rows; annual/anniversary rows under collapse re-materialized their own date too. | **FIXED.** `FOM-1` gained a second limb (never the row's own date for dated kinds) and the switch covers every kind; a test pins the annual case both ways. |
| B-M6 | MEDIUM | The To Do projection showed a done occurrence as an open, overdue task. | **FIXED.** A done occurrence renders as a completed task with its completion date. |
| B-M7 | MEDIUM | The Outlook reminder (due − lead) and the register's lit moment (the 1st) disagreed on month-precision rows; " · day TBD" was in the subject. | **FIXED.** The reminder fires at the register's own lit moment (`FOM-6`'s switch included); the day-unknown note moved to the body; a test pins the equality. |
| B-M8 | MEDIUM | Rule / lead / weight edit omitted, unmentioned. | **PART-FIXED.** Lead and weight edit added (re-evaluates the open occurrence, `FOD-4`); rule edits stay unrendered and §5 now says so. |
| B-M9 | MEDIUM | The register's horizon is stated two ways in the spec; the mock picked §5.2 silently. | **Became `FOM-14`** (the mock's choice is now stated). |
| B-L1 | LOW | A blank override date was accepted. | **FIXED** (validated; refused with a reason). |
| B-L2 | LOW | DECISION 0's word did not reach the Outlook subject/body; its "Look at" list omitted Outlook. | **FIXED** (both). |
| B-L3 | LOW | The multi-user preview rendered one occurrence twice. | **Labelled**: the duplicate row now reads as a preview of the per-licensee occurrence §10 describes; the companion §5 states the simplification. |
| B-L4 | LOW | Seeded-inactive rows appeared in both the catalog and the Inactive section. | **FIXED** (the catalog excludes them). |
| B-L5 | LOW | DECISION 8(a) rendered a badge that read as an existing registry entry. | **FIXED** (*would link a registry entry · none drafted*). |
| B-L6 | LOW | The "Custom obligation — Add…" control is disabled; unmentioned. | **Named** in the companion §5. |
| B-L7 | LOW | §5.2's owner column vs §10's "changes nothing": the mock followed §10 silently. | **Became `FOM-15`.** |
| B-L8 | LOW | The card jumped above/below the legal-watch card with the selected decision. | **FIXED** (a labelled toggle, never a decision effect). |
| B-L9 | LOW | "1 days overdue" on the card. | **FIXED.** |
| B-L10 | LOW | `FOM-4`'s "last period completed" field was hidden for anniversary kinds. | **FIXED** (offered on every serial kind). |

**Declined:** none. **Tally:** A — HIGH 1 / MEDIUM 4 / LOW 10; B — HIGH 4 / MEDIUM 9 / LOW 10; every item above is fixed, part-fixed and named, or converted into a `FOM-` finding for Michael.

## C — RE-SWEEP AFTER FIX: a third auditor over the changed claims (the rule's own exhibit, twice)

Verified and not faulted: 108/108 at the time; the built page embeds the sources verbatim; the sheet's sha256; zero errors in every headless run; the normalizer's thirteen lines, per-rule counts, site counts and zero residual reproduce exactly with the reshaped `norm2.py`; the §3.1 block fits §3's shape and IS `norm2.py` with the seven pairs filled in; the pre-pass ordering is necessary; the `#151`/BUILD-STATE quotes, the ten-of-eleven statement and "no quoted passage touched" all hold; 34 of the 37 dispositions above verified as real.

| # | Sev | Finding (condensed) | Disposition |
|---|---|---|---|
| C-H1 | HIGH | The `FOD-1` fix made a weekend-held item (status lit, days −1) VANISH from the card (`cardItems` required `d ≥ 0`) and, on the Sunday after an October 31 due date, filed it under **Later** (grouping by due month against a window starting in November). | **FIXED.** A lit item with a negative day count is a weekend hold and stays on the card; an occurrence whose month has just ended and is not overdue joins the current month group. Tests pin both. |
| C-H2 | HIGH | A second open occurrence was reachable again: a close that materialized nothing (a retired row; a one-time) was undoable regardless of whether a Re-activate had since opened a new occurrence. | **FIXED.** `canUndo` refuses when the obligation has any open occurrence and nothing was materialized by the close; Undo on a one-time close restores the obligation to active. Tests pin the refusal. |
| C-M1 | MEDIUM | Companion §5 still described the card position as tied to the selected decision (the B-L8 fix had made it a toggle). | **FIXED** (the text). |
| C-M2 | MEDIUM | Companion §3 said DECISION 4 option 3 fans out insurance and the PIR too; the mock fanned out attorney-scoped rows only. | **FIXED** in the mock: under option 3 the preview fans out EVERY row — which is the point the sheet makes about (3). |
| C-L1 | LOW | `FOM-12` quoted Monday as "1 day overdue"; for a Saturday due date Monday is two days. | **FIXED** (text, in the companion and the mock). |
| C-L2 | LOW | The §6 coverage sentence overstated in three places (one-open "after every close"; DECISION 6's third reading untested; Outlook mode `both` untested). | **FIXED** — tests added for all three; the sentence now says what is tested. |
| C-L3 | LOW | "no further look was taken" while a fourth screenshot had been written. | **FIXED** (stated; the screenshot is not reviewed and does not ship). |
| C-L4 | LOW | The January sentence placed the bar membership in the January group; at Jan 20 it is in the Overdue pin. | **FIXED** (text). |
| C-L5 | LOW | A "you" owner badge rendered at the solo stage under option 3, against `FOM-15`'s own text; the `sortPin` comment said `FOM-10`; a custom word ending in "-ies" singularized wrongly. | **FIXED** (all three). |
| C-L6 | LOW | The changed-lines diff had its run-length spaces collapsed, so its lines were not byte-exact; §4 items 4–5 are VM-side reads not reproducible from the container. | **FIXED** (regenerated byte-exact; the record now says which items are VM-side). |

**Tally C:** HIGH 2 / MEDIUM 2 / LOW 6 — all fixed. **The check on this second fix pass** was programmatic, not a fourth fleet: the harness at 124/124, and a headless script re-driving exactly these scenarios (the Sunday card and month group; Retire → Done → Re-activate → Undo refused; option 3's full fan-out; no owner badge at solo; a custom word in the Outlook subject) with zero errors.
