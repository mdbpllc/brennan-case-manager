# CODE-DISPATCH v3 — one paste into Claude Code on **mdb-pllc** (2026-08-17)

**Canonical repo path:** `docs/prompts/CODE-DISPATCH-v3.md` (docs/prompts/ per Q-2 and the 2026-08-17
D-1 ruling). Opus is Code's default (§7.2). Two tasks; each runs to FULL close-out before the next.
After each push: one-paragraph checkpoint, then WAIT for Michael's go-ahead.

## Common rules
Instructions v21; runner v10. DT-1 Central stamps (a runner line's date is the RUN date). MM-1: this
chain runs on mdb-pllc only; a non-fast-forward push rejection STOPS the chain — never force-push.
Never report "pushed" without verifying the remote ref moved (`git ls-remote`); the auto-mode
classifier can refuse even an allowlisted bare push — if stranded, say so plainly (QR-5(a) carries it
forward). Verify authorization and scope from the log + BUILD-STATE before acting; STOP on ambiguity.

## C-1 — Queue run
Run `docs/prompts/QUEUE-RUNNER.md` at HEAD (QR-2 — this pointer is deliberately bare). Expected
pending on this machine: `push-to-code_task19-signoff-walk_2026-08-17.zip` (the Task 19 sign-off
walk: 24 verifications, 5 adopted wordings, 5 directed edits, 6 housekeeping rulings — the work order
inside governs). Step 0 gate per QR-3 v7 behavior including the ahead-stop; deletion by explicit
filename against the Step 1-pinned identity (QR-6(c)); the queue merge is two acts (QR-6(b));
BUILD-STATE counts recomputed at HEAD (OPEN-5(a)). The batch is docs-only — if the health check is
skipped, record the skip and the reason (QR-6(f)).

## C-2 — Session-log TOC regeneration (Sonnet-eligible; docs only)
`docs/specs/session-log-toc.md` is stale by fourteen-plus (its basis row reads `a5a95a97`; BUILD-STATE
re-derived the figure at the fifty-second refresh). Regenerate it mechanically from
`docs/specs/session-log.md` at HEAD per the TOC file's own stated regeneration method; update its
basis row to the current commit. Derived file — no judgment columns. Full close-out: log entry
(format from the runner text's own Step 4 rules, never copied from an earlier line — QR-6(d)),
BUILD-STATE full rewrite under the 150 non-blank-line cap with the anti-resurrection-ledger pointer
preserved, verified push, "Pushed at `<sha>` — click Sync now" line.

## Chain-stop conditions
Record ambiguity at any gate; non-fast-forward rejection; anything client-data- or credential-shaped.
End with: tasks done/skipped, every hash pushed, flags for ruling.
