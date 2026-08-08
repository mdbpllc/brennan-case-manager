# RULINGS CAPTURE — 2026-08-08b (QR-2 adopted; CL2-AC-1 consolidated)

**Canonical repo path:** `docs/specs/rulings-capture-2026-08-08b.md` — NEW file. The same-date "a"
capture (`rulings-capture-2026-08-08.md`) is a different session block; do not merge.
**Session:** design session, typed, believed Fable 5. Two rulings, both Michael's, both CONFIRMED
in one line: "QR-2 - yes, CL2-AC-1 dedup - consolidate." Context: delivered immediately after
reviewing the #38 queue-runner report, which supplied the evidence for both.
**Nothing was built. Nothing is authorized for build.**

## PART 1 — QR-2 CLOSED: ruled YES (pointers, not copies)

**Ruling (CONFIRMED):** machine-local queue-runner skill/command copies stop carrying the runner's
full text and become POINTERS — "read `docs/prompts/QUEUE-RUNNER.md` at HEAD and follow it" — so
a stale local copy is structurally impossible.

**Reason (load-bearing):** the #38 run was the **third consecutive stale-skill run** (local v1
against repo v3). It cost nothing only because the packet's §4.2 and the design-side reply
independently supplied both deltas (QR-1 full-text merges; the 120→150 cap). Luck stood in for
process; QR-2 replaces the luck.

**Execution split:**
- The repo-tracked command copy (`.claude/commands/queue-runner.md`) → rewritten to pointer form
  by Code. Canonical full text remains ONLY at `docs/prompts/QUEUE-RUNNER.md`.
- Machine-local copies outside the repo (P15 and P1 user-skill copies) → **Michael's hand**;
  convert each to the same pointer form. This SUPERSEDES the outstanding interim mitigation
  ("re-sync the P15 copy, check the P1's") — do not re-sync full text anywhere; convert instead.

**Consequence:** QR-2 is a binding convention change → **instructions trigger #3 FIRED**. v7
drafted and handed to Michael the same day (one-line addition to the queue paragraph).

## PART 2 — CL2-AC-1 CONSOLIDATED: one home per question

**Ruling (CONFIRMED):** the queue's two CL2-AC-1 locations consolidate under the **ID-bearing
entry** (Client model section). The full question text, the 2026-07-28 captured framing worth
keeping, the DIRECTION-CONFIRMED status, and the three UNRULED edges (link-removal, mixed-posture,
backfill) all live there. The "Captured 2026-07-28" block reduces to a **dated pointer line**.

**Reason (load-bearing):** question text living in two places drifts — the same disease QR-1
treats. One register, one home per question. The #38 run had annotated both locations defensively
("nothing struck, nothing shrunk") because no ruling authorized the shrink; this ruling is that
authorization. Text is MOVED, not deleted — nothing informative is lost, per QR-1's principle
that the text must outlive its container.

**Scope guard:** this consolidates the REGISTER only. It does not close CL2-AC-1 (edges still
unruled, doc-on-screen required) and does not touch the session log or any capture doc —
append-only history stands everywhere it applies.

## PART 3 — NOT COVERED / STANDING

BUILD-STATE sits at exactly 150 (zero headroom) — the next session touching it must displace
before adding; noted, not ruled. The pre-existing duplication *pattern* in the queue (whether any
OTHER item lives twice) was not swept — only CL2-AC-1 was ruled. CORPUS-HOME execution (upload to
ARCHIVE) remains Michael's hand, outstanding.

## RESUME POINT

Unchanged from the 08-08a capture: CD-1 design session (schema on screen), FE-3 with §8 on
screen, O5 with the fee-profile doc, #31–#33 review. Plus Michael's two hand-items: the corpus
upload and the P15/P1 pointer conversions.
