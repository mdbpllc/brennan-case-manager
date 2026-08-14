# Repo docs lint sweep — 2026-08-13

**Status: CANDIDATE REPORT. Nothing here is a fix, and no fix was drafted.** Every item below is a
candidate for Michael's ruling. **Zero edits were made to any existing file** — this file is the
only thing the sweep wrote.

**Scope:** `docs/` (86 markdown files + 1 PDF), `CLAUDE.md`, `README.md`, `BUILD-SESSION-NOTES.md`,
at `b3e8c1e` (clean tree, on master, `HEAD == origin/master`).

**Method (so a later sweep can be compared against this one):** all 2,931 backticked tokens across
the in-scope files were extracted; the 276 unique path-shaped ones (ending `.md .sql .ts .tsx .json
.py .sh .pdf .html .csv`) were resolved against `git ls-files` by full path, then by basename. All 9
markdown-syntax links (`](...)`) were extracted separately. Version and superseded-ID hunts were run
by pattern over the same file set. Where a token did not resolve, the citing line was read in
context before it was called a candidate — most did not survive that read, and are recorded as
clean in §5 rather than dropped silently.

---

## 1. Contradiction between two live governing docs — highest value

| # | File | Line | Quoted text | Why it's a candidate |
|---|---|---|---|---|
| 1 | `docs/specs/Go_Live_Gates.md` | 81 | `and instructions v15 per trigger 1.` | The GL-1 go-live floor item (5). **`BUILD-STATE.md:18` states the same floor item as "re-check session + instructions **v17**"** and names `Go_Live_Gates.md` as the "Full text" authority for it. Two live docs give the floor a different version number, and the one BUILD-STATE defers to is the lower one. Instructions are **v17** at HEAD (`attorney-review-queue.md:400` carries the v17 paste as ⬜ open). Reading needed: does GL-1 require literally v15, or "the version current at the re-check"? Only Michael can say which — the ruling is his, 2026-08-11. |

## 2. Stale version references in live docs

| # | File | Line | Quoted text | Why it's a candidate |
|---|---|---|---|---|
| 2 | `README.md` | 64–66 | `**Known gap:** the schema's row-level-security policies only admit signed-in (`authenticated`) users, and the app has no sign-in screen yet — so Supabase mode will connect but every query will be refused until an auth flow is added.` | **Stale at HEAD.** `BUILD-STATE.md:7` records auth as landed 2026-07-28 and `:56` describes the built gate: "Sign-in gate — Supabase mode only. Magic link, no password." README is the orientation doc a new machine or a new reader hits first, and it currently tells them a shipped feature does not exist. The first clause (RLS admits `authenticated` only) is still accurate; only the "no sign-in screen yet" claim is stale. |
| 3 | `docs/specs/anti-resurrection-ledger.md` | 15 | `- **CLOSED — do not re-raise or carry these:** project instructions are **v4**` | Present tense in a live, standing document; instructions are **v17**. Mitigating and the reason this is a candidate rather than an error: the line is explicitly a **verbatim** move from BUILD-STATE dated 2026-07-27 (the file's own §"Moved from BUILD-STATE.md 2026-07-27 (verbatim)"), and the sentence's actual job is the closure of INSTR-3 and "stop calling them v2," not the version claim. A reader arriving cold still reads "are v4" as current. Whether verbatim-preserved history may carry a dated note is Michael's call — the file is append-mostly. |

## 3. Superseded status asserted in a repo-tracked capture

| # | File | Line | Quoted text | Why it's a candidate |
|---|---|---|---|---|
| 4 | `docs/specs/operational-blockers-capture-2026-07-26.md` | 110 | `\| **ENTRA-1** \| Entra registration, fictional-data-only scope \| **OPEN — Michael's 20 minutes; scope constraint recorded** \|` | `anti-resurrection-ledger.md:18` lists **ENTRA-1** as closed — "**ENTRA-1** (done, #20)" — under "do not re-raise or carry these." This file states it OPEN. The file is a dated RAW CAPTURE (2026-07-26) and CLAUDE.md describes it as such ("Nothing in it routes elsewhere"), so this is plausibly correct-as-history; it is listed because a superseded-ID hunt is exactly what would surface it, and because the ledger's language is "do not carry." |

## 4. `claude/` cite class (#15, closed in the ledger) — residual instances

Four instances survive in the tree. **Three are already annotated as the error class and are not
defects**; one is bare. All are listed because the sweep was asked to hunt this class.

| # | File | Line | Quoted text | Why it's a candidate |
|---|---|---|---|---|
| 5 | `docs/specs/session-log.md` | 6137 | `Michael's v0.1 feedback doc (claude/v0.1-feedback.md, complete) surfaced in project knowledge` | The one **bare, unannotated** instance — no adjacent note that `claude/` is a project-knowledge namespace and not a repo directory. **Already dispositioned:** the 2026-07-26 sweep recorded at `session-log.md:4464` deliberately left it — "**Left alone:** one `claude/v0.1-feedback.md` cite inside a historical `session-log.md` entry (append-only)". Re-raising it means re-opening that disposition against the append-only rule. Listed for completeness, not because a change is indicated. |
| 6 | `docs/specs/session-log.md` | 4464, 4546 | `— **that path does not exist; the repo has no `claude/` directory at all.**` | Not defects — these lines *are* the annotation of the error class. Recorded so a future sweep does not re-flag them. |
| 7 | `docs/specs/watch-targets-seed.md` | 3 | `it was written as the design-space filename `claude/Statute_Text_and_Bill_Tracking_Design_2026-07-25.md`, which is not a repo path` | Not a defect — corrected and annotated in place 2026-07-26. Recorded for the same reason. |

**Not hits, checked and excluded:** `.claude/commands/...` and `~/.claude/settings.json` (real
dotfile paths), `claude/new-session-*` (a git branch name, `new-machine-bootstrap.md:55`), and the
`claude_*` design-space filenames, which are correctly presented as project-knowledge items with no
repo path (`statute-text-and-bill-tracking-design.md:98`,
`transcript-sort-and-route-design.md:3`, and others).

## 5. References to files absent at HEAD — all three self-annotated, no action indicated

Recorded so the next sweep does not re-raise them. Each names its own absence at the citing line.

| # | File | Line | Absent target | Why it is NOT a candidate |
|---|---|---|---|---|
| 8 | `docs/specs/case-heartbeat-design.md` · `docs/spec-feedback.md` | 7 · 292 | `docs/specs/case-heartbeat-voice-capture-2026-07-25.md` | The citing line says so: "(session 1; **NOT yet in the repo** — design-side export pending, see spec-feedback)". `spec-feedback.md` §2026-07-25 carries the full finding. |
| 9 | `docs/specs/attorney-review-queue.md` · `docs/specs/contact-directory.md` | 216 · 11 | `docs/specs/cd-1-session-prep.md` | Annotated at both sites: "**Absorbs:** `docs/specs/cd-1-session-prep.md` (per that file's own delete-or-absorb line)" and "*was absorbed by the spec and deleted the same day*". |
| 10 | `docs/specs/attorney-review-queue.md` | 307 | `docs/specs/t3-kickoff-day-capture-2026-08-09.md` | HK-6's **adoption target**, ruled 2026-08-13 (#66) with execution gated on Michael. Absent by design until the gate opens. |

## 6. Low priority — names that read as repo paths but are not

| # | File | Line | Quoted text | Why it's a candidate |
|---|---|---|---|---|
| 11 | `docs/specs/form-engine.md` · `attorney-review-queue.md` · `REQ-CAPTURE_deficiency-handling_2026-08-11.md` | 365–368 · 198, 209 · 115–117 | `` `template_petition_udja-uim-carrier.md` ``, `` `template_deficiency-letter_written-discovery.md` ``, `` `template_motion-to-compel_written-discovery.md` ``, `` `template_deficiency-grid_columns.md` `` | Four filenames in backticks that do not exist. **Correct as written** — they are §13.4 distillation *candidates*, all `queued`, "none distilled, none format-authoritative," and the table's own column header is "Candidate." Flagged only because `docs/templates/discovery/` does exist and holds one real template (`template_definitions-instructions_requests.md`), so the naming convention is shared between real and not-yet-real files. No fix implied; a reader who checks the column header is not misled. |
| 12 | `docs/specs/case-heartbeat-design.md` | 7 | `` `…-2026-07-25c.md` (session 3, pre-service arming chain), `…-2026-07-25d.md` `` | Ellipsis shorthand. Both files exist under their full names; the cite resolves only if the reader carries the prefix forward from the preceding item in the same sentence. Cosmetic. |

## 7. Verified clean — hunts that returned nothing

- **Broken relative links:** none. The in-scope corpus contains only **9** markdown-syntax links, all
  in `medical-billing-analysis-module-synthesis.md:179–187`, all external `https://` URLs. The docs
  cite each other in backticks, not links — so the resolution pass in §5 is the real link check, and
  it came back with three absences, all annotated.
- **`CLAUDE.md`:** every path it cites resolves at HEAD. No absent-file reference, no stale version
  claim, no `claude/` cite.
- **Runner version consistency:** `docs/prompts/QUEUE-RUNNER.md` is **v7** at HEAD;
  `.claude/commands/queue-runner.md` is pointer-form per QR-2 and carries no version text to go
  stale; `BUILD-STATE.md:136` says v7. Consistent. Every other runner-version mention found
  (`attorney-review-queue.md:394`, the `rulings-capture-*` files, and ~20 in `session-log.md`) sits
  inside a dated or ✅-closed entry describing a past bump.
- **K-6 / K-7:** 30+ mentions across 12 files, and **every one is a citation of the retirement rule**
  ("per the K-6/K-7 standing rule," "the K-6/K-7 cheap insurance"). No file re-raises either ID as a
  live item, and none reconstructs question text. The ledger's bar is holding.
- **Other closed ledger items** — the `claude/` cite class (§4 above), the FLP promo clock, INSTR-3,
  BUILD-SESSION-NOTES (#13 R-3): no live doc carries them as open. ENTRA-1 is the single exception,
  at §3 item 4.
- **`BUILD-STATE.md` structural rules** (checked in passing, not part of the four hunts): **134
  non-blank lines** against the 150 cap (145 raw), and the anti-resurrection-ledger pointer is
  present at line 11.

---

**Nothing in this report has been acted on.** Items 1 and 2 are the two worth a ruling first: item 1
is two live docs disagreeing about a go-live floor requirement, and item 2 is the repo's front door
denying a feature that shipped 2026-07-28.
