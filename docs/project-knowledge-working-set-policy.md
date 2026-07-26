# Project Knowledge Working-Set Policy

**Canonical repo path:** `docs/project-knowledge-working-set-policy.md`
**Status:** LANDED in repo 2026-07-26 (drafted same day, design session, Opus 5; routed by Code). A one-line pointer to this doc lives in `CLAUDE.md` under working style/conventions.
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
- **Never prune design docs to save space.** They are a rounding error in the token budget and the highest-value content in the project. If space is the problem, the problem is a corpus, not a spec.

## Pruning runbook (Michael executes — Claude cannot delete project files)

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
