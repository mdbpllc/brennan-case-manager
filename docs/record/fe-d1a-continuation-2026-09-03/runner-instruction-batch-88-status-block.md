# In-session authorization for the batch-88 runner — 2026-09-03 (Michael's ruling, relayed from the design side)

Michael's ruling, verbatim from the option set put to him: **"Move it to the closed register now (Recommended)."** This is a packet-added act — in no routing row and no Step 4 item — so it runs on Michael's in-session authorization (QR-6(e)). It APPLIES `CAP-3` §3.3 as ruled; it changes no convention.

## The act

1. In `docs/specs/attorney-review-queue.md`, the Status paragraph keeps ONLY its intro (`**Status:** WORKING CHECKLIST. Compiled 2026-07-26 in the design space, then updated the same day as items closed.`) and the CURRENT reconcile sentence (the `#146` / batch-88 sentence you already wrote). Everything after that sentence in the same paragraph — the block whose opening text is given below, through the end of the paragraph — is CUT from the synced file.
   ```
   **This is the first batch under `CAP-3`, and the register is now TWO files:**
   ```
2. That block is APPENDED VERBATIM to the RECONCILE HISTORY at the head of `docs/record/attorney-review-queue-closed.md`, immediately after batch 87's superseded sentence you already appended there, so the history reads batch 87's sentence followed by its own block. Never deleted, never edited.
3. Verify by conservation: bytes cut from the synced paragraph == bytes appended to the closed register's history (allowing only the separator you add); the synced Status paragraph now contains exactly one `Reconciled` sentence; a grep for `first batch under` counts 0 in the synced file and 1 in the closed register.
4. Name the act in the batch-88 runner line: the ruling in Michael's words, that it ran on his in-session authorization under QR-6(e), and the before/after byte sizes of both files. Do NOT edit the committed-to-be `#146` entry text.

## Not authorized by this

Nothing else. The second question Michael answered — whether to queue the proposal that `CAP-4`'s displaced text should go to an EVIDENCE file instead of the runner line — was ruled **"Carry it to the next design packet (Recommended)"**: no row is minted this batch, and no runner behaviour changes. Proceed to commit, push, `git ls-remote` verification, and the delete-by-name once the verifiers report.
