---
description: Batch-process the push-to-code packet inbox (QUEUE-RUNNER)
---
<!-- QUEUE-RUNNER — batch-process the push-packet inbox -->
<!-- v3, 2026-08-07 (QR-1). STATUS: STANDING CONVENTION — ruled ADOPTED by Michael 2026-07-26 (Q-1); Step 4 item 3 amended by Michael's ruling 2026-08-06; Step 4 item 2 amended by Michael's ruling 2026-08-07 (QR-1). -->

You are processing a QUEUE of push-to-code packets accumulated while Fable tokens were exhausted. Each packet is a standard push-to-code zip (manifest with §0–§8, plus staged deliverables). Follow the house conventions in CLAUDE.md throughout.

## Step 0 — One-time setup (skip if already done)

1. If `inbox/` does not exist at the repo root, create it.
2. Ensure `.gitignore` contains a line `inbox/` (packets are transient freight; they are never committed).
3. Add a one-line note to CLAUDE.md under the design-side visibility conventions: "`inbox/` (gitignored) holds queued push-to-code packets; process with the QUEUE-RUNNER prompt; delete packets after execution."

## Step 1 — Inventory and confirm order

1. List every `*.zip` in `inbox/`, sorted by file modification time, oldest first.
2. Print the inferred queue order (filename + date) and STOP. Ask Michael to confirm or reorder before executing anything. Do not proceed on silence.

## Step 2 — Read everything before executing anything

1. Unzip all packets to a temp location.
2. Read every manifest's §0 (READ ME FIRST), §1 (RECONCILE FIRST), and §2 (routing table) across ALL packets before acting on any.
3. Conflict rule: where packets disagree (same canonical path, same design question, contradictory instructions), the LATER packet wins — design thinking evolved across the interim sessions. Note each superseded instruction explicitly in the session log rather than silently dropping it.
4. Reconcile ONCE against actual repo state per the packets' §1 sections (check every canonical path in every routing table). Design-side views in these packets may lag the repo by the entire interim period; act only on genuine deltas and say so.

## Step 3 — Execute in confirmed order

For each packet, oldest first:

1. Execute its §4 doc work orders (as modified by the conflict rule and reconciliation above).
2. Execute §5 build work orders ONLY where the manifest quotes Michael's explicit authorization. Everything else stays PROPOSED — route it to design docs, never to code. If any §5 authorization looks ambiguous, stop and ask.
3. Honor every §6 DO-NOT list cumulatively — a DO-NOT in an early packet still binds while processing later ones unless a later packet explicitly lifts it.
4. Collect its §3 session-log entry (do not append yet).

## Step 4 — Close out ONCE for the whole batch

1. Append all collected session-log entries to the TOP of docs/specs/session-log.md, ordered so the NEWEST packet's entry ends up on top. Add one short runner entry above them all: which packets ran, in what order, what was superseded, what was skipped as already built.
2. Merge the packets' §7 open-items tables into the runner entry so the top of the log stays truthful — Michael's items remain Michael's — AND into `docs/specs/attorney-review-queue.md`, which is the standing register of what awaits Michael's ruling. **When merging a packet's open items into `attorney-review-queue.md`, carry the FULL question text into the queue entry — the actual question, in bold, per that file's stated convention — never ID + label alone. The packet is deleted after processing, so the queue entry is the only place the question survives.** (QR-1, ruled 2026-08-07. Failure class this prevents: Q-5's original wording destroyed; K-6/K-7 retired because their text existed nowhere.)
3. Rewrite docs/specs/BUILD-STATE.md IN FULL — never append. **150-line hard cap** (Michael's ruling 2026-07-27, BS-1, raised from 120; the cap exists for READABILITY, not token cost). At the cap, **displace — cut detail, never add sections**. Preserve the pointer line to `docs/specs/anti-resurrection-ledger.md`; the cap applies to BUILD-STATE only, not the ledger. Describe what EXISTS, verifiable from the working tree at the stated commit.
4. Push to origin and VERIFY the remote ref moved. Never report "pushed" from an unchecked command.
5. Delete the processed zips from `inbox/` (the session-log entries are now the record).
6. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the repo in the Claude project."

## Hard limits

- No real client data in anything you write, ever.
- No registry entry gets set to verified; automation flags, only Michael verifies.
- If any packet contradicts BUILD-STATE.md or CLAUDE.md, flag the contradiction to Michael; do not silently obey either side.
