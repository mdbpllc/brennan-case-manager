# RULINGS CAPTURE — 2026-08-08d (MM-1 adopted: concurrent two-machine conventions)

**Canonical repo path:** `docs/specs/rulings-capture-2026-08-08d.md` — NEW file. Same-date "a",
"b", "c" captures exist and are different session blocks; do not merge.
**Session:** design session, typed, believed Fable 5. One ruling, Michael's, CONFIRMED: "I am
ruling with your recommendation." **Nothing built; nothing authorized for build.**

## MM-1 CLOSED — ruled YES (all four parts, as recommended)

**Context (CONFIRMED intent, Michael's words):** design on Fable in chat and build with Opus in
Code on BOTH machines — the P15 and the P1 Gen 8 — used CONCURRENTLY, not a migration from one
to the other. Most cross-machine discipline already existed (`docs/new-machine-bootstrap.md`,
permanent rules; P1 provisioned and verified 2026-08-06). MM-1 adds what concurrency itself
requires:

**(1) One runner at a time.** Queue-runner sessions never run simultaneously on two machines.
Sequential runs are already safe — QR-3's checkout gate fast-forwards each runner to origin HEAD
before it reads anything; simultaneity is the only unprotected case (both rewrite BUILD-STATE,
both append the log, second push loses). **Backstop inside the rule:** if any push is rejected
non-fast-forward, the session STOPS and reconciles — fetch, report, tell Michael — and NEVER
force-pushes. The backstop protects the record even when the first clause is accidentally
violated. *Reason: BUILD-STATE and the session log are single-writer documents; concurrency has
no merge story and should not pretend to.*

**(2) Packet destination names the machine.** The standing delivery-destination convention gains
a clause for inbox-bound artifacts: the closing destination paragraph states that the zip goes to
`inbox/` on whichever machine will run it, and reminds that a pending queue on the OTHER machine
means run there or move the zips consciously. *Reason: inboxes never sync; the Probate Corpus
zip's one-machine existence already showed items silently splitting across inboxes.*

**(3) User-level runner copies: DELETE, not convert.** On both machines, the
`%USERPROFILE%\.claude\commands\queue-runner.md` user-level copy is deleted outright — a
user-level copy can SHADOW the repo pointer and feed stale runner text (Code's live flag,
2026-08-08). The repo-tracked pointer travels with every clone and is all any machine needs.
**This sharpens the standing P15/P1 hand item from "convert to pointers" to "delete."** Still
Michael's hand — the files are outside the repo.

**(4) Bootstrap doc addendum.** Two verified gaps fold into `docs/new-machine-bootstrap.md`:
the git-identity step (#33: first commit on the second machine FAILED on unset
`user.name`/`user.email` — the one step the verification session never hit because it never
committed), and the user-level-copy deletion from (3), so no future provision or re-provision
rediscovers either.

**Unchanged, no new rule:** transcription/T3 is P1-only by measured fact (4 GB VRAM on the P15
against T3's 8 GB floor — preflight failure, not preference); all other work runs on either
machine. The design side is account-level and machine-agnostic.

**Instructions consequence:** binding conventions changed (queue discipline + delivery
destinations) → **trigger #3 FIRED**, third time today. Folded same-day into **v9** (supersedes
unpasted v8/v7; Michael pastes v9 directly and skips both if neither landed).

**Runner consequence:** the runner gains the non-FF-stop line at its push step and a concurrency
line — **v4 → v5** if QR-3's amendment has landed; see the work order's sequencing note, since
the QR-3 packet may sit unprocessed in the same queue.

## MOOTED BY FACTS — the stale-branch item is CLOSED, no ruling needed

The pending delete/fast-forward/leave word is moot: `git ls-remote` (Code, 2026-08-08) proved
the remote branch was ALREADY deleted on GitHub after its work merged; only a stale LOCAL
tracking ref existed, and Code pruned it as hygiene. Nothing remains to rule. The queue's entry
for it closes as mooted, not ruled.

## RESUME POINT

Unchanged: CD-1 design session (schema on screen) is the highest-leverage next design act; FE-3
and O5 behind it. Michael's hand items after this packet: delete both user-level runner copies,
paste v9, CORPUS-HOME upload, Sync now after the run.
