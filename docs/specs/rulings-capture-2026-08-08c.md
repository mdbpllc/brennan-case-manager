# RULINGS CAPTURE — 2026-08-08c (QR-3 adopted: checkout gate, sync-and-proceed shape)

**Canonical repo path:** `docs/specs/rulings-capture-2026-08-08c.md` — NEW file. Same-date "a" and
"b" captures exist and are different session blocks; do not merge.
**Session:** design session, typed, believed Fable 5. One ruling, Michael's, CONFIRMED: "I rule
with your recommendation." **Nothing built; nothing authorized for build.**

## QR-3 CLOSED — ruled YES, sync-and-proceed shape

**The convention (CONFIRMED):** QUEUE-RUNNER's Step 0 gains a hard gate — before reading the rest
of the runner file or any packet, the session fetches origin and confirms the checkout is at
origin HEAD.

**The "if behind" behavior (CONFIRMED — Claude's recommended shape, ruled by adoption):**
- Behind but **clean, on master, and fast-forwardable** → fast-forward silently and continue.
- **Dirty, diverged, or not on master** → STOP and tell Michael before touching anything.

**Reason (load-bearing):** QR-2 closed copy-drift within a checkout but not checkout-drift. The
2026-08-08 cloud session demonstrated the gap: it ran v1 runner text from a tree 14 commits stale
with no signal anything was wrong — the pointer mechanism would have served the same stale file,
because the canonical copy in that tree WAS v1. The family is now complete: QR-1 protects the
question text, QR-2 the runner text, QR-3 the tree the runner text is read from.

**Why sync-and-proceed rather than stop-always:** it enforces the standing pull-at-session-start
convention at the moment that matters, using the same clean/dirty split git itself respects;
stop-always would add a ritual confirmation to every session for no information.

**Relation to standing conventions:** this does not replace "pull at session start, verified push
at session end" — it makes the pull structurally unskippable for queue runs specifically.

**Execution note:** the runner procedure text changes → the runner goes to **v4**. The
machine-local P15/P1 copies remain full-text v-something until Michael converts them to pointer
form (his hand, standing item) — after which QR-3's gate travels automatically, since pointers
read the canonical file in a tree the gate has just verified fresh.

**Instructions consequence:** a binding convention changed → **trigger #3 FIRED**. QR-3 folded
into the instructions draft the same day. Because the v7 paste was still on Michael's outstanding
list when QR-3 was ruled, the fold produces **v8**; if v7 was never pasted, Michael pastes v8
directly and skips v7 — the version history line records both.

## NOT COVERED

The stale cloud branch (`claude/new-session-wy2oej` at `01b1488`) — Michael's word still pending
(delete / fast-forward / leave; design lean: delete). Not part of this packet; the cloud session
that found it offered to execute and is the natural channel.

## RESUME POINT

Unchanged: CD-1 design session (schema on screen) is the highest-leverage next design act; FE-3
and O5 behind it. Michael's hand items: P15/P1 pointer conversions, instructions paste (v8),
CORPUS-HOME upload, branch word, Sync now.
