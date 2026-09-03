# Project Knowledge Working-Set Policy

**Canonical repo path:** `docs/project-knowledge-working-set-policy.md`
**Status:** LANDED in repo 2026-07-26 (drafted same day, design session, Opus 5; routed by Code). A one-line pointer to this doc lives in `CLAUDE.md` under working style/conventions. Amended 2026-08-18 (ruled same day): execution-capability line and capture-pruning caveat — see the two sections below. Amended 2026-09-02 (ruled same day, the capacity pass): the unit calibration, the retired-spec home, the born-unsynced class rule, the register split and the BUILD-STATE ceiling — see the last section.
**Applies to:** the Claude project knowledge base for brennan-case-manager. Not to the repo, which has no equivalent constraint.

---

## The rule

**Project knowledge is a working set, not an archive. The repo is the archive.**

When a doc's canonical copy lands in the repo, it comes **out** of project knowledge unless it is on the pinned working-set list below. Reference material that a session reads occasionally lives in the repo and is pulled on demand; it does not sit in project knowledge permanently.

## Why (do not "improve" this away)

Project knowledge capacity is measured against the **context window in tokens**, not disk megabytes. Two consequences drive this policy:

1. **Retrieval dilution is the real cost, and it fails silently.** Above the context threshold the project switches to RAG, and every search competes against everything loaded. When reference corpora outweigh working docs by 30:1, a search for a spec decision runs against a haystack that is almost entirely something else. There is no error message — just a session that misses the doc that mattered.
2. **Raw source material is the heaviest thing in the project and the least often needed.** As measured 2026-07-26: two secondary sources plus 16 case opinions accounted for ~97% of the token load; all twelve `claude_*` design docs together were ~3%.

## Pinned working set (stays in project knowledge)

- Project instructions
- `Go_Live_Gates.md`
- Active spec and design docs for the current and next phase
- Current fixtures and seed data in active use
- The **index** for any reference corpus (not the corpus)

Everything else routes to the repo.

## Standing behaviors

- **On adding a large source document:** ask whether an index or synthesis would serve the working set better than the raw source. If yes, the raw source goes to the repo and the synthesis stays.
- **On a doc reaching canonical status in the repo:** it comes out of project knowledge at the next handoff, unless pinned. The handoff should say so explicitly.
- **Claude raises this unprompted** when a session adds material that would push the working set past the pinned list, and at any session where project capacity is discussed.
- **Never prune design docs to save space.** They are a rounding error in the token budget and the highest-value content in the project. If space is the problem, the problem is a corpus, not a spec. Caveat (2026-08-18, ruled): this line was written when the twelve claude_* docs were ~3% of the load. SESSION CAPTURES are a distinct class from specs and design docs — they are RAW CAPTURE whose canonical content lands in the repo through the queue, and by 2026-08-18 they had grown to ~14% of usage (44 were retired that day by ruling, archived losslessly first). Specs and design docs remain never-pruned. Captures whose sessions' durable content is confirmed on the repo record are prunable — by Michael's ruling per instance, never by default, and always archive-before-delete.

## Pruning runbook (execution: Michael's hand, or — since 2026-08-18 — a Cowork design session via the Projects tool. A session deletes ONLY on Michael's explicit in-session ruling, and ONLY after delivering him a lossless, byte-verified archive of everything being removed. A deletion that times out is verified against the re-read doc list, never assumed either way.)

Ordered by value per unit of effort. Steps 1 and 2 are lossless.

| Step | Action | Rationale |
|---|---|---|
| 1 | Delete `McMillan_v__Hearne_584_S_W_3d_505_**_1**.Pdf` | Confirmed content-identical duplicate (extracted text matches character-for-character) |
| 2 | Delete `claude_v0_1-feedback.md` | Marked COMPLETE in its own status line; both change items **verified built by Code 2026-07-26** (phone masking: `src/domain/phone.ts` + `src/components/phone.tsx`; searchable combobox: `src/components/Combobox.tsx`, in use across seven pages) |
| 3 | Move all 16 case PDFs to `docs/authority/pdf/` in the repo; keep only `case-authority-index.md` in project knowledge | ~225K tokens of OCR text plus 194 pages of scanned images, replaced by a ~3K-token finding aid |
| 4 | Move `Subrogation_and_Liens_in_Personal_Injury_Cases.pdf` (Kostura) and `Nondisclosure_Expunction_Clemency_Statutes.txt` to the repo | Single largest and second-largest items (~400K and ~164K tokens). Both are corpora already mined — the synthesis products live in the repo |
| 5 | Confirm `Uvalde_Docket_Worksheet_Project_Instructions.md` still belongs to this project | Possible scope bleed from an unrelated matter; small, but check |

**Steps 3–5 are PROPOSED, not ruled.** They are staged for Michael's decision, not for automatic execution.

## Open question — project splitting

Whether to stand up a **second Claude project for legal authority / research**, separate from this build project, is **OPEN**. Recorded reasoning so it is not relitigated from scratch:

- **Do not split by build phase.** Each Claude project has its own separate memory space. A per-phase split would fragment conventions, session-log continuity, and accumulated decisions across a workflow that is genuinely continuous.
- **A research/authority split is defensible** — it follows a real seam (occasionally-consulted reference vs. daily working set), and the research side does not need the build side's memory.
- **Sequence:** execute steps 1–4 first. If the project drops back under the in-context threshold, a second project may be unnecessary.

## Amendment 2026-09-02 — the capacity pass (ruled; `docs/specs/capacity-pass-2026-09-02.md` governs)

- **The unit is exact.** The knowledge meter is the sum of each project document's `estimated_token_count` as the platform reports it (a deletion of 114,570 units moved the meter by 114,570). Measured ratios: repo markdown 3.70 B/unit; capture prose 3.65; table-heavy notes 2.96; JSON 2.59. One point of the 2,000,000 budget is 20,000 units ≈ 74 KB of repo markdown.
- **The synced repo is the meter** — 72.6 points at HEAD `2a85c99`, of which `docs/specs/` is 88.6% by bytes. Project documents were 17.7 points before the pass and 9.2 after it.
- **Retired specs have a home (`CAP-1`):** `docs/record/specs/<name>.md` by `git mv`, a three-line stub left at the old path. Retirement stays a per-file ruling.
- **Evidence is born unsynced (`CAP-2`):** every packet routing row carries a CLASS — `RULING` (born in `docs/specs/`) or `EVIDENCE` (born in `docs/record/<slug>-<date>/`). The synced side always gets what a ruling needs.
- **The register is two files (`CAP-3`):** ✅ rows and the superseded reconcile sentences live in `docs/record/attorney-review-queue-closed.md`; the synced register carries ⬜ and 🟡 rows (plus flagged ✅ parents with open children — `CAP-OPEN-2`) and the current sentence only.
- **BUILD-STATE has a byte ceiling (`CAP-4`):** 100,000 bytes beside the 150-line cap; the shortfall is named in its banner.
- **The pinned line "the index for any reference corpus" is read as a SMALL index.** The probate corpus manifest JSON (54,722 units, 2.7 points) left for Michael's machine on 2026-09-02 (`CAP-5`); `probate_system_prompt.md` and the README remain the probate index set.
- **Never prune design docs** still stands for design docs. The 2026-08-18 caveat stands for captures; `TC-8` (2026-08-21) made captures TRANSIT, and the relocation method is now the project docs API read in Michael's own browser — byte-exact, manifest-hashed, verified on disk before deletion.
