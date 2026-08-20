# PROMPT — Gate 3 RLS Write-Path Test Session

**Canonical repo path (PROPOSED):** `docs/prompts/PROMPT-gate3-write-path-test.md`
**Authored:** 2026-08-20 Central, design session (Cowork, Fable 5), against `2a6ae67`.

**THIS RUN IS AUTHORIZED.** Michael, 2026-08-20, in session: *"Let's do the three things right
now,"* and he ruled the two questions the protocol gates on, both quoted here so this prompt is
self-verifying: **`Q-G3-1` — "Live Supabase project"** and **`Q-G3-2` — "Run as written."**
**What is NOT authorized:** closing gate 3 (`Q-G3-4`, his, at the gates re-check), any remedy for
anything found, and any act in the protocol's §7 STOP list. **The AUTHORITY is
`docs/specs/gate3-write-path-test-protocol.md` at HEAD — read it in full before anything; where
this prompt and that protocol disagree, the protocol wins and this prompt gets a correction.**

Michael: fresh Claude Code session on `mdb-pllc` — **Opus by default** (§7.2: Code sessions are
Opus; the Fable work, the pre-run audit, is already done and filed). Stay in the sitting: the run
needs your token at Step 0 and your eyes at every STOP.

## Step 0 — Preconditions (all of them, or stop)

1. **QR-3 gate:** fetch; clean tree, on `master`, HEAD == origin via `git ls-remote origin
   refs/heads/master`. Dirty / diverged / off-master / AHEAD stops.
2. **`inbox/` is empty** — if a packet is present the queue runs first (MM-1); this session never
   doubles as the runner.
3. **The database is the LIVE project, named out loud and written down** — that is `Q-G3-1` as
   ruled, and `.env`'s `VITE_SUPABASE_URL` is the address of record.
4. **THE TOKEN HANDOFF (audit §2 — the step nobody had named).** Auth is magic-link only and no
   service-role key exists on this machine (correct — a service-role run would bypass RLS and prove
   nothing). **Michael signs into the app in his browser as always, then hands you the session's
   ACCESS TOKEN** (Application → Local Storage → the `sb-…-auth-token` entry's `access_token`, or
   the copy surfaced on `/diagnostics` if present). **It lives in the script's environment for this
   sitting only — never in a file, a log entry, a commit, or this prompt's session report.** It
   expires in about an hour: run the signed-in half inside one window, and if it lapses, he signs
   in again — do not scavenge for another credential.
5. **Health baseline** (`npm test` / `build` / `lint`) — this session will touch no `src/`, but a
   red baseline stops before any database work.

## Step 1 — Derive, print, hold

Derive the fixtures per protocol §5.2 **with the audited extension**: NOT-NULL-no-default columns
filled with per-run-tagged fictional values; FK columns from the parent fixture by tier; **and for
the SIXTEEN CHECK-IN-LIST columns the audit enumerates
(`docs/specs/gate3-protocol-preflight-audit-2026-08-20.md` §1), take the FIRST LITERAL from the
CHECK's own list** — schema-derived, labelled in the report as the audited extension, ruled text
untouched. `numeric` columns fill with tagged numbers. **Print every derived row and the tier
assignment BEFORE anything is written; Michael sees it first.** A table that still cannot be derived
is **REPORTED and skipped, never guessed** (`Q-G3-3` is unruled; report-don't-guess is the
protocol's own floor).

## Step 2 → Step 5 — exactly the protocol's §6

Signed out first, all 37, **recording outcome / SQLSTATE / message text per row** — expect 37
refusals, **all with the PRIVILEGE message** (anon holds no grant; an RLS-message refusal signed
out is itself a finding). Then signed in under the token, tiers 0→4. Then the deny control:
`file_counters` signed in must refuse **with the privilege message** — score by MESSAGE, never by
code alone. Then teardown 4→0, **verified by re-reading for the run tag — zero rows or S-4.**
**Every §7 STOP is live; S-1's capture-then-delete order is binding.**

## Step 6 — Report + close-out

Dated single-run report per protocol §6 Step 6 (the 37×2 grid, messages quoted, derived-vs-hand-set,
teardown verification, the did-NOT-establish list — including `Q-G3-2`-as-ruled: UPDATE/DELETE
against `using` was not exercised, by ruling, and the gap is named not resolved). Then the
protocol's own Step 7 close-out: **unnumbered log entry (TOC-6)**, BUILD-STATE full rewrite with
every count recomputed (the write-probe coverage sentence is the one this run moves — 5 → what the
grid shows), TOC regeneration, **push verified by bare `git ls-remote`**, and the one-line report.
**Do not mark gate 3 closed — that is `Q-G3-4`, Michael's, at the gates re-check.**
