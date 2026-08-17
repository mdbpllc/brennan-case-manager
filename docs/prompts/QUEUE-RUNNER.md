> STATUS: STANDING CONVENTION — ruled ADOPTED by Michael 2026-07-26 (Q-1). Canonical path: docs/prompts/QUEUE-RUNNER.md
> QR-2 (ruled 2026-08-08): this file is the ONLY full copy; all skill/command copies are pointers to it at HEAD.

# QUEUE-RUNNER — batch-process the push-packet inbox
<!-- Paste everything below this line into a Claude Code session. -->
<!-- v9, 2026-08-16. STATUS: STANDING CONVENTION — ruled ADOPTED by Michael 2026-07-26 (Q-1);
     Step 4 item 3 amended by Michael's ruling 2026-08-06; Step 4 item 2 amended by
     Michael's ruling 2026-08-07 (QR-1); Step 0 checkout gate added by Michael's ruling
     2026-08-08 (QR-3, v4); concurrency + non-FF-stop lines added by Michael's ruling
     2026-08-08 (MM-1, v5); Step 1 ordering amended by Michael's ruling 2026-08-10
     (QR-4, v6); ahead-stop added by Michael's ruling 2026-08-13 (QR-3 amendment, v7);
     Step 0 item 4, Step 1 item 3, Step 4 item 1 and Step 4 item 5 amended by Michael's
     ruling 2026-08-16 (QR-5, v8) — the entry may assert no post-commit action, the
     deletion is verified and carried forward if it fails, an already-executed check is
     added, and the deletion has a permission precondition; evidence rule, merge-second-act,
     identity pinning + delete-by-name, dynamic format rule, packet-added-act authorization,
     health-check-skip recording, and the BUILD-STATE recompute rule added by Michael's ruling
     2026-08-16 (QR-6(a)–(f) + OPEN-5(a), v9). -->

**Concurrency (MM-1, ruled 2026-08-08):** never run this queue on two machines at
the same time. One runner, anywhere, at a time.

You are processing a QUEUE of push-to-code packets accumulated while Fable
tokens were exhausted. Each packet is a standard push-to-code zip (manifest
with §0–§8, plus staged deliverables). Follow the house conventions in
CLAUDE.md throughout.

## Step 0 — One-time setup (skip if already done)

**Checkout gate (QR-3, ruled 2026-08-08) — do this before reading the rest of
this file or any packet.** `git fetch origin`, then compare HEAD to
`origin/master`:
- Behind but clean, on master, and fast-forwardable → fast-forward and continue.
- Dirty, diverged, or not on master → STOP and tell Michael before touching
  anything.
- **If HEAD is AHEAD of `origin/master` (unpushed local commits): STOP and tell Michael — a
  prior close-out's push did not land, and the design side has not seen those commits. Proceed
  only on his word; never build on an unpushed tree silently. (v7, ruled 2026-08-13 after the
  twenty-fifth invocation demonstrated the gap.)**

**Evidence rule, governing every step of this file (QR-6(a), ruled 2026-08-16): where a step
states a verification, name the command that produced it — and the command must be one that
could have produced a disconfirmation. `git rev-parse origin/master` reads the LOCAL tracking
ref and is not evidence about origin (a live `git fetch` plus `git ls-remote` is);
`git log --grep` searches messages, not paths, and proves no absence. A check whose output
looks like confirmation but whose mechanism cannot fail in a way that announces itself is not
a verification. Where a fact is genuinely unverifiable from the repo (another session's
permission prompt, another machine's inbox), say so and ask — never assert it.**

A stale checkout serves stale runner text with no warning (demonstrated
2026-08-08: v1 read as current from a tree 14 commits behind). Never run the
queue from an unverified tree.

1. If `inbox/` does not exist at the repo root, create it.
2. Ensure `.gitignore` contains a line `inbox/` (packets are transient
   freight; they are never committed).
3. Add a one-line note to CLAUDE.md under the design-side visibility
   conventions: "`inbox/` (gitignored) holds queued push-to-code packets;
   process with the QUEUE-RUNNER prompt; delete packets after execution."
4. **Ensure the Step 4 item 5 deletion can run WITHOUT a prompt.** `.claude/settings.local.json`
   (untracked, machine-local) must contain `Bash(rm -f inbox/*)` in its `permissions.allow`
   array. Add it if absent; do not widen it further and do not `git add` the file.
   **Reason (QR-5, ruled 2026-08-16): the deletion is the only Step 4 action that was never
   allowlisted, so it prompts on every invocation. A session driven remotely — from a phone —
   cannot answer that prompt. Scope is deliberately narrow: `rm -f` under `inbox/` only,
   which Q-1 already rules is transient freight.**

## Step 1 — Inventory and confirm order
1. List every `*.zip` in `inbox/`, sorted by the date embedded in the filename,
   oldest first. Break ties — and place any filename with no parseable date,
   flagging it explicitly — by file modification time. Filename dates track the
   authoring design session; mtimes are inbox save times and can invert
   authoring order (demonstrated 2026-08-09/10; QR-4).
2. Also compute the pure-mtime order. If the two orders disagree, print BOTH and
   name the difference — never silently pick one.
3. **For each packet, check whether its staged deliverable already exists in the repo at the
   size the packet states. If it does, mark that packet "POSSIBLY ALREADY EXECUTED — verify
   before running" and name the file and size you found.** A packet can survive its own
   execution, so a zip in `inbox/` is NOT proof of a pending packet. **Read this together with
   the Step 0 gate: "already executed" can mean COMMITTED BUT UNPUSHED, which is what the
   forty-second invocation turned out to be — the deliverable was at HEAD and absent from
   `origin/master`. Say which of the two you found.** (QR-5, ruled 2026-08-16.)
4. **Pin each packet's identity (QR-6(c), ruled 2026-08-16): record filename, byte size, mtime,
   and sha256 for every zip listed. The Step 1 STOP can last hours and a packet has in fact
   been swapped mid-STOP; the pinned identity is what Step 4 item 5 deletes against.**
5. Print the inferred queue order (filename + date), carrying any such marks, and STOP. Ask
   Michael to confirm or reorder before executing anything. Do not proceed on silence.

## Step 2 — Read everything before executing anything
1. Unzip all packets to a temp location.
2. Read every manifest's §0 (READ ME FIRST), §1 (RECONCILE FIRST), and
   §2 (routing table) across ALL packets before acting on any.
   Cross-check the confirmed order against each manifest's §3 entry date; if the
   manifests contradict the confirmed order, STOP and ask before executing.
3. Conflict rule: where packets disagree (same canonical path, same
   design question, contradictory instructions), the LATER packet wins —
   design thinking evolved across the interim sessions. Note each
   superseded instruction explicitly in the session log rather than
   silently dropping it.
4. Reconcile ONCE against actual repo state per the packets' §1 sections
   (check every canonical path in every routing table). Design-side views
   in these packets may lag the repo by the entire interim period; act
   only on genuine deltas and say so.

## Step 3 — Execute in confirmed order
For each packet, oldest first:
1. Execute its §4 doc work orders (as modified by the conflict rule and
   reconciliation above).
2. Execute §5 build work orders ONLY where the manifest quotes Michael's
   explicit authorization. Everything else stays PROPOSED — route it to
   design docs, never to code. If any §5 authorization looks ambiguous,
   stop and ask.
3. Honor every §6 DO-NOT list cumulatively — a DO-NOT in an early packet
   still binds while processing later ones unless a later packet
   explicitly lifts it.
4. **A packet-added act that appears in NO routing-table row and NO Step 4 item requires
   Michael's in-session authorization (QR-6(e), ruled 2026-08-16): skip it and report it unless
   he authorizes. Exhibit: a packet's §8.1 asked for a deletion inside `.git/` — inert, and
   authorized in-session; the next such act may not be inert.**
5. Collect its §3 session-log entry (do not append yet).

## Step 4 — Close out ONCE for the whole batch

**Health check first (QR-6(f), ruled 2026-08-16): on a docs-only batch — §5 NONE in every
packet and no `src/`, `db/`, `supabase/` or build-tooling path routed — the CLAUDE.md health
check (`npm test` / `npm run build` / `npm run lint`) proves nothing about the batch: SKIP IT
AND RECORD THE SKIP EXPLICITLY in the runner line, naming the reason. On any other batch, run
it now and record the result. Never skip silently.**

1. Append all collected session-log entries to the TOP of
   docs/specs/session-log.md, ordered so the NEWEST packet's entry ends
   up on top. Add one short runner entry above them all: which packets
   ran, in what order, what was superseded, what was skipped as already
   built.
   **THE ENTRY MUST NOT ASSERT ANY POST-COMMIT ACTION (QR-5, ruled 2026-08-16).** It is
   committed at item 3; the push is item 4 and the deletion is item 5, so any sentence about
   either is a PREDICTION, not a report. **Do not write "packet deleted after execution," or
   that the push landed, or any equivalent.** Report both to Michael in-session per items 4–6,
   and if either failed, carry it into the NEXT batch's runner line, where it can be stated
   truthfully. **Origin exhibit: "Packet deleted after execution per Step 4.5" was boilerplate
   in this template, true for the forty-first invocation and FALSE for the forty-second, whose
   close-out was interrupted at the push — and the false sentence is permanently in the record
   because it was committed before the action it describes.**
   **Format comes from THIS file's Step 4 rules — never copy format from a runner line authored
   under an earlier runner version (QR-6(d), ruled 2026-08-16 in dynamic form; a named static
   exemplar was proposed and rejected because it goes stale — the QR-5 shape).**
2. Merge the packets' §7 open-items tables into the runner entry so the
   top of the log stays truthful — Michael's items remain Michael's — AND
   into `docs/specs/attorney-review-queue.md`, which is the standing
   register of what awaits Michael's ruling. **When merging a packet's
   open items into `attorney-review-queue.md`, carry the FULL question
   text into the queue entry — the actual question, in bold, per that
   file's stated convention — never ID + label alone. The packet is
   deleted after processing, so the queue entry is the only place the
   question survives.** (QR-1, ruled 2026-08-07. Failure class this
   prevents: Q-5's original wording destroyed; K-6/K-7 retired because
   their text existed nowhere.)
   **The queue merge is TWO acts (QR-6(b), ruled 2026-08-16): the rows AND the Status header's
   per-batch "Reconciled again to session-log #NN" sentence — update both. The omission has
   happened once (#84) and is recorded in that header, whose own words are "keep it current or
   the pointer lies."**
3. Rewrite docs/specs/BUILD-STATE.md IN FULL — never append. **150-line
   hard cap** (Michael's ruling 2026-07-27, BS-1, raised from 120; the cap
   exists for READABILITY, not token cost). At the cap, **displace — cut
   detail, never add sections**. Preserve the pointer line to
   `docs/specs/anti-resurrection-ledger.md`; the cap applies to BUILD-STATE
   only, not the ledger. Describe what EXISTS, verifiable from the working
   tree at the stated commit.
   **Recompute at every refresh, never copy from a packet (OPEN-5(a), ruled 2026-08-16): the
   unreviewed-entries range comes from the log at HEAD (A-4) and the queue-reconciled-through
   pointer from that file's own header at HEAD (A-5); every count BUILD-STATE states is
   re-derived, not carried.**
4. Push to origin and VERIFY the remote ref moved. Never report "pushed"
   from an unchecked command. **If the push is rejected non-fast-forward
   (MM-1):** STOP — fetch, report the divergence to Michael, and reconcile.
   NEVER force-push. A rejected push means another session moved the record;
   the record wins.
5. Delete the processed zips from `inbox/` (the session-log entries are now the
   record) — **and VERIFY it, the way item 4 verifies the push: re-list `inbox/`
   afterwards and confirm each processed zip is gone. NEVER treat an unchecked delete
   command as a deletion.** Report the result to Michael in item 6. **If a zip
   survives, do NOT edit this batch's entry to say so — it is already committed. Put
   the removal on Michael's hand list and CARRY IT INTO THE NEXT BATCH'S RUNNER LINE.**
   (QR-5, ruled 2026-08-16.) Note the ordering that makes this necessary: a close-out
   interrupted at item 4 never reaches item 5 at all, so a surviving zip is evidence
   about the PUSH as much as about the delete — check the Step 0 gate before concluding
   which failed.
6. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the
   repo in the Claude project."

## Hard limits
- No real client data in anything you write, ever.
- No registry entry gets set to verified; automation flags, only Michael
  verifies.
- If any packet contradicts BUILD-STATE.md or CLAUDE.md, flag the
  contradiction to Michael; do not silently obey either side.
