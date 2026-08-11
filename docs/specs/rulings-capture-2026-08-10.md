# Rulings capture — advisory session alongside the eighth queue run (2026-08-10, design session, Fable 5)

Canonical repo path: `docs/specs/rulings-capture-2026-08-10.md`. Reasoning record for the
QR-4 packet and for the advisory calls made in real time during the eighth queue-runner
invocation (P1). The run itself is logged by the Code session (runner entry, #44, KICK-1
correction addendum); this file preserves the design-side reasoning that is otherwise only
in the chat.

## 1. The ordering disagreement and why filename-date won (batch ruling, CONFIRMED)

Two packets: `push-to-code_t3-kickoff-advisory-log_2026-08-10.zip` (mtime Aug 9, 20:43) and
`push-to-code_slack-claude-tag_2026-08-09.zip` (mtime Aug 9, 21:36). Mtime order and
filename-date order disagreed. The resolution rested on three points:

- Inbox mtimes record when Michael SAVED each zip, not when the design session happened;
  save order had inverted authoring order.
- The filename dates are coherent under UTC stamping: a cloud design session running past
  17:00 Central stamps the next UTC date. 20:43 local on Aug 9 is already Aug 10 UTC —
  which is exactly why the later-authored packet carries the 08-10 name. The 08-09-named
  packet was authored earlier that day and merely downloaded later.
- "LATER packet wins" is justified in the runner text by "design thinking evolved across
  the interim sessions" — later means later-AUTHORED by definition, and Step 4's append
  order keeps the log chronological only if the run order is authoring order.

Michael ruled filename-date for the batch; the Code session verified the order against each
manifest's §3 entry date before executing. QR-4 proposes making this standing; the batch
ruling alone does not.

## 2. Working-practice lessons from the run (recorded by Code as practice notes; reasoning here)

- **Amend guards.** A mangled commit message is amendable only while unpushed and with a
  clean index: `--amend` rewrites the sha (MM-1's no-force-push backstop trips on a pushed
  amend) and silently folds in anything staged.
- **Reachability, not resolvability.** An amended-away commit still resolves —
  `git cat-file -t` prints `commit` for a reflog-live dangling object. The discriminating
  test for a sha cited in BUILD-STATE is `git merge-base --is-ancestor <sha> HEAD`.
- **Absence claims need enumerated searches.** A `$USERPROFILE`-style check prints "absent"
  identically for a missing file and an unset variable. An absence claim is only as strong
  as the named list of paths actually searched. (This re-established, rather than corrected,
  the pushed "P1 copy verified absent" line.)
- **Carried lines are re-verified, not inherited.** The kickoff-file line rode two refreshes
  unverified before the emptied inbox exposed it — same failure class as #13 R-3.

## 3. What this session did NOT decide

QR-4 is PROPOSED. Michael's "Yes, draft the packet" authorized drafting, not adoption.
No build work was discussed or authorized. The T3 gate (KICK-1) and the H-series items are
untouched by this packet.
