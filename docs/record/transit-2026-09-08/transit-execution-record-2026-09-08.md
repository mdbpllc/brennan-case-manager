# TRANSIT EXECUTION RECORD — 2026-09-08 (#153)

**Status:** EVIDENCE (CAP-2) — the record of a completed act, cited by path from `#153`; nothing in it is a ruling. Canonical path: `docs/record/transit-2026-09-08/transit-execution-record-2026-09-08.md`. Written by the design session that ran the act (typed, Cowork, Fable 5.1), stamped by Michael's Central wall clock (DT-1; the container read 03:51 UTC = 22:51 CDT at open).

**What this records:** the third execution of the TC-8 three-step TRANSIT act by the `#149` lossless method — six project-knowledge files relocated to `Documents\Knowledge Repo\Session Captures\` in one zip and deleted from project knowledge — plus three acts of the PRIOR session of 2026-09-08 that had no entry of their own, filed here in Michael's words.

---

## 1. State at open, verified before anything was said

Every check names its command (QR-6(a)). All bridge reads were lock-free (`GIT_OPTIONAL_LOCKS=0`); `git status` was never run.

| Fact | Command | Result |
|---|---|---|
| HEAD | `git rev-parse HEAD` / `--abbrev-ref HEAD` | `44409ef8ac58bb21bd817ec75e133ec86c6c367b`, `master` |
| HEAD commit | `git log -1 --format='%H %ci %s'` | 2026-09-08 22:21:34 −0500 — *queue-runner batch 93: the firm-obligations rendered examples (#152)* |
| Tracking ref | `git rev-parse origin/master`; `git rev-list --left-right --count origin/master...HEAD` | same sha; `0 0`. **A local read, not evidence about origin** — the origin evidence is Michael's own live `ls-remote` stated in his resume instruction ("verified by live ls-remote"); this session did not repeat it. |
| Stranded lock | `ls -la .git/index.lock` | none |
| Inbox | `ls -la inbox/` | EMPTY |
| Destination | `ls -la "Documents/Knowledge Repo/Session Captures/"` | the two 09-07 zips only (39,746 B and 80,074 B) |
| Top design ordinal | `grep -o '^## [0-9-]* (#[0-9]*)' docs/record/session-log.md \| head -1` | `#152`; `(#153)` headings: 0; the two `#153` strings in `docs/` are statute anchors (`FA.153.htm#153.002`), not the series |
| Entries at HEAD | `grep -n -o '^## 2026-09-0[78] (#1[45][0-9])'` | `#152` L142 · `#151` L289 · `#150` L308 · `#149` L514 (line numbers are a bridge read of an append-only-by-prepend file, cited here only as evidence of presence, never as a stable cite) |
| Diff shape since `#152`'s reads | `git diff --name-status 8f7467b 44409ef \| cut -c1 \| sort \| uniq -c` | 21 A · 7 M · **0 D** — so the `#152` handoff's full-text eligibility reads at `8f7467b` (batch 92) carry to `44409ef` |
| `#152` pair's own routing docs | `ls -la` / `find … -type f \| wc -l` / `grep -n -o` | `docs/specs/firm-obligations-rendered-examples-2026-09-08.md` 27,666 B · the mock 148,146 B · `rendered-examples-audit-2026-09-08.md` 14,204 B · `rendered-examples-ledger-2026-09-08.md` 13,667 B · `mock-source-2026-09-08/` **14 files** (recursive) · `normalizer-semicolon-amendment-2026-09-08/` 3 files · `Q-FO-11` and `Q-STAT-7` present in `docs/specs/attorney-review-queue.md` · the three firm-obligations specs present in `docs/specs/` · `docs/record/ccs1-migrations-run-2026-09-07/migration-run-record-ccs1-2026-09-07.md` and `docs/specs/cc1-rulings-and-address-model-slice.md` present |
| Knowledge meter | `project_info` → `knowledge_size` | **1,654,674 / 2,000,000 = 82.7%**; seventeen docs |
| Docs-API sum | in-page: `Σ estimated_token_count` over all seventeen | **82,903 units** → synced repo's share 1,571,771 = 78.6 points; project docs 4.1 points |
| Sync state (inference) | arithmetic | `#152` opened at 1,643,637; the two 09-08 docs are 5,117 + 5,920 = 11,037; 1,643,637 + 11,037 = **1,654,674 exactly** — the synced share had not moved since before batch 93, i.e. Sync had not been clicked after batch 93. A design-side inference from the meter, stated as such; Michael clicked Sync during this sitting (§7). |

The CC-1 hands-on queue was NOT stated at the top of this session as start-of-session rule 6 requires; it is stated here and in `#153` instead — twelve accepted (all gated) + seven proposed + five PROPOSED by `#151` + the post-`CCS-1` walk's agenda, unchanged by this session, which put no question and made no ruling. The omission is owned, not excused.

## 2. Eligibility (TC-8, both conditions)

- **The `#149`/`#150` pair** (`claude/claude_Forward_Sitting_Capture_2026-09-07.md`, `claude/claude_Handoff_Session_Log_2026-09-07.md`) and **the `#151` pair** (`claude/claude_Firm_Obligations_Design_Pass_Capture_2026-09-07_Late.md`, `claude/claude_Handoff_Session_Log_2026-09-07_Late.md`): both entries at HEAD; every routing document verified present by `#152`'s full-text reads at `8f7467b`, which carry to `44409ef` because the diff between them deletes nothing (§1).
- **The `#152` pair** (`claude/claude_Rendered_Examples_Capture_2026-09-08.md`, `claude/claude_Handoff_Session_Log_2026-09-08.md`): the entry at HEAD (batch 93 filed it, L142 by heading grep); every routing document present at its canonical path by this session's own reads at `44409ef` (§1, the routing-docs row).
- **NOT relocated, by design:** the `#137` Voice2 pair (`BR-2`, `BR-4`, `DA-2` are defined only there and the sheet cites it as prior art — `#152`'s finding, unchanged); the two `H12-v` email drafts (live working documents); the acquisition list and the form-corpus mining record (live working documents); the probate index pair and the three carried files (residents).

## 3. Step 1 — the export (the `#149` lossless method, in Michael's Chrome)

1. A new tab in the session's Chrome group was navigated to the project page (`claude.ai/project/019f9fc8-…`). In-page JavaScript read `/api/organizations` and the project docs endpoint in **his** session; the org and the seventeen documents' metadata were read first — names, uuids, byte lengths (`TextEncoder`), `estimated_token_count`, `created_at` — with **no document content returned to the chat**.
2. The six targets matched Michael's resume instruction **to the byte and to the unit**: 43,127 / 13,735 · 21,615 / 6,622 · 15,702 / 5,141 · 20,443 / 6,094 · 15,860 / 5,117 · 20,386 / 5,920 — **137,133 B / 42,629 units** — and their in-page sha256 prefixes `266a9b2d`, `081618b5`, `38448c8b`, `c4c8aedc`, `dedca7a7`, `629abee8` matched the ones he stated.
3. A STORE zip was built in the page — eight entries, each entry's DOS timestamp pinned to **2026-09-08 22:40** (`0x5D28` / `0xB500`), CRC-32 by table, no extra fields — with `MANIFEST.json` (2,230 B) and `MANIFEST.md` (1,785 B) in the 09-07 shape (name, uuid, bytes, sha256, estimated_token_count, created_at per file; totals; the TC-8 verification sentence). File order: Michael's, oldest pair first, capture before handoff. Zip: **`brennan-case-manager_transit-0907-0907late-0908-pairs_2026-09-08.zip`, 142,464 B, sha256 `ef22399591cfc86f419e6b536f10fef63eb74177f14995b5e1b798d035edaec0`.**
4. **The prior session's figure was not reproduced and could not be:** his instruction recorded that session's build as 142,037 B, sha256 `d01deee6…`. The 427-byte difference is manifest prose that session wrote in its own words; the six content files are hash-identical across both builds, so nothing of substance differs. The hash of record is this zip's.
5. A **visible button** was injected on the page (a fixed banner naming the file, its size and its hash prefix); the download was stated to Michael in chat before he clicked — file, source (his own project's documents as the docs API returned them in his session), size, method, hash. **He clicked** ("It's in Downloads."). No script-triggered download was attempted.
6. Two tool behaviours seen, neither the safety check: the Chrome tool's RETURN of the manifest text was blocked as `[BLOCKED: Cookie/query string data]` (an output filter matching the UUIDs and sha256 strings — short returns such as a lone hash passed), so the manifests were read back from the zip on disk (§4); and the export itself ran **first try**, where the prior session's had been refused (§7).

## 4. Step 2 — landing, verified twice

| Where | Commands | Result |
|---|---|---|
| `Downloads\` | `stat -c '%s %y'`; `sha256sum`; `unzip -tq`; `unzip -l`; python over the extracted entries vs `MANIFEST.json` | 142,464 B, mtime 03:58:59 UTC (22:58 CDT); sha256 `ef223995…daec0` = the in-page hash; *No errors detected*; eight entries at 22:40; **every content entry byte- and sha256-identical to its manifest row — ALL MATCH**; totals 137,133 B / 42,629 units; `head` 44409ef; `date_central` 2026-09-08 |
| `Documents\Knowledge Repo\Session Captures\` | `cp -p` (guarded: refuses if the name exists); `stat`; `sha256sum`; `unzip -tq`; `cmp` against the Downloads copy | 142,464 B; sha256 `ef223995…daec0`; *No errors detected*; **IDENTICAL to Downloads copy**; the folder now holds three zips (the two 09-07 zips unchanged) |
| Manifests | `sha256sum MANIFEST.json MANIFEST.md` on the extracted entries vs the workspace copies filed beside this record | `07580d34…4051a` (2,230 B) and `657dd94e…c617d2` (1,785 B) — identical both sides |

The `Downloads\` copy remains; the Session Captures copy is the one of record. The VM's `/tmp/transit-verify/` extraction is the VM's own scratch, not a mounted path.

## 5. Step 3 — deletion, then the meter

On Michael's instruction in the resume message ("then delete the six and read the meter"), after §4 was complete: `project_delete` on each of the six paths, each returning `deleted: true`, at **23:00 CDT**. Then `project_info`: **`knowledge_size` 1,612,045 / 2,000,000 = 80.6%**, eleven docs listed. **1,654,674 − 42,629 = 1,612,045 — the drop is the manifest's unit total exactly, the calibration's sixth confirmation** (the 114,570 calibration on 09-02 and its two same-day readings, then 23,012 and 11,246 on 09-07 as the fourth and fifth — v30's count, continued). Eleven docs remain: 82,903 − 42,629 = **40,274 units = 2.0 points**.

## 6. The prior session's acts, filed here in Michael's words (no entry of their own)

From his resume instruction, verbatim as to the facts: *"Already done 2026-09-08 by the prior session and not yet filed: the three scratch zips in `Claude outputs\` (`repo-snapshot-8f7467b_2026-09-08.zip`, `fo-sources-2026-09-07.zip`, `fo-sources-2026-09-07-b.zip`) deleted by name and verified gone; `repo-snapshot-ea5675b_2026-09-07.zip` was not there."* The folder is `Documents\Knowledge Repo\Claude outputs\` (the one `#150`, `#152` and BUILD-STATE's YOUR-HAND item (3) name). **Observed this session** (`ls -la`): it holds **no zip**; three non-zip files dated 09-02/09-03 remain, not this act's and deliberately not named here (one filename carries a party name — H5). BUILD-STATE's "FOUR scratch zips" in that folder is therefore overtaken: the four are gone — three by the prior session's deletion, the fourth (`ea5675b`) already absent when it looked.

And the refusal, his words: *"the auto-mode safety check refused the export mid-session, content-triggered for the rest of that conversation, and a fresh session was the path."* This session is that fresh session; the same method ran first try (§3). Recorded as an operational note in instructions v31 — a note, not a rule.

## 7. Other facts of the sitting

- **The checkout's own `Claude outputs\`** (`brennan-case-manager\Claude outputs\`, the folder BUILD-STATE's YOUR-HAND item (3) counted at seventeen stale files) was observed **EMPTY** at open (folder mtime 03:48 UTC = 22:48 CDT, three minutes before this session opened). Asked, Michael answered: *"the Claude outputs were cleared by Code by my hand."* Both `Claude outputs\` folders are therefore clear of everything BUILD-STATE listed; item (3) is spent.
- **Sync:** Michael clicked Sync during this sitting (*"just hit sync right now"*, ~23:05 CDT), after the deletion reading. The sync endpoint (`/api/organizations/<org>/projects/<project>/syncs`, read in his Chrome) reported `last_synced_at` 2026-09-09T04:01:35Z = **23:01:35 CDT** and the synced source's own `current_token_count` **1,577,097** (194 files, 5,552,623 B) — up 5,326 from the 1,571,771 inferred at open, batch 93's net (the companion spec added; BUILD-STATE, the register and the head file rewritten). `project_info` then read **1,617,371 / 2,000,000 = 80.9%** — and 1,577,097 + 40,274 = 1,617,371 exactly: **the meter is the sync count plus the docs' unit sum, and both halves are now directly readable**, as is the time Sync last ran. A capability finding, recorded in v31's capacity note.
- **Instructions v31** was drafted as the trigger-4 edition — twelve exact-match edits applied by program to the byte-exact v30 (the live field's sha256 `2a59cda4…` equals `docs/record/forward-sitting-2026-09-07/project-instructions-v30-as-delivered-2026-09-07.md`, checked in-page and over the bridge), nothing retyped — and delivered to Michael as a `.md`; the as-delivered text is filed beside this record. Whether and when it is pasted is his; a later session's live read of the field is the evidence.
- **PF-1 did not fire and the skip is recorded:** this packet carries no legal characterization and no registry entry. No adversarial preflight was run; RR-1 ran (every document re-read against every later fact of the sitting — the Sync click, the `Claude outputs\` answer, the post-sync meter — before the zip closed).

## 8. What did not happen, each because a rule bars it or because it is his

No ruling was made and none recorded; nothing built; no `src/` read or edited; no schema act; no ID minted (`#153` is the log ordinal, taken on the heading grep in §1); no registry file touched; no legal content characterized, no quotation of law; no fact about the firm asserted; no real client data touched — the six relocated files are captures and handoffs of design sessions; no web fetch; no live database touched; `git status` not run, no `.git/index.lock` stranded (checked at open and at close); nothing written into the repo's tracked tree — the packet zip in `inbox/` is gitignored, and the transit zip is in Session Captures where Michael put it by the button. Bridge scratch left on his machine: **none** in any connected folder beyond the two deliverables (the transit zip in `Downloads\` and Session Captures, the packet zip in `inbox/`); the VM's `/tmp/transit-verify/` is the VM's own.

## 9. Files filed with this record (all EVIDENCE, `docs/record/transit-2026-09-08/`)

- `transit-execution-record-2026-09-08.md` — this file.
- `transit-relocation-manifest-2026-09-08.md` — the zip's `MANIFEST.md` verbatim, with the landing paragraph appended in the 09-07 shape.
- `transit-relocation-manifest-2026-09-08.json` — the zip's `MANIFEST.json` verbatim (sha256 `07580d34…4051a`).
- `project-instructions-v31-as-delivered-2026-09-08.md` — v31 as delivered to Michael; evidence of what was delivered, never a claim that it was pasted.
