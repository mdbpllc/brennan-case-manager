#!/usr/bin/env python3
"""
apply-work-orders.py — the exact-string repo edits of the 2026-09-02 capacity-pass packet
(WO-1 … WO-12b), applied by program so every OLD string is asserted UNIQUE before anything is written
and line endings are preserved per file (the policy file is CRLF in the working tree — LE-1).

Usage:  python3 apply-work-orders.py <repo-root> [--write]
        Dry run by default: reports, for every edit, whether OLD occurs exactly once. Exit 0 only when all do.
        With --write, applies all edits (all-or-nothing: nothing is written unless every OLD is unique).

The edits are the single source of truth for WO-1 … WO-12b; the packet manifest's §4.2 describes them for the
human reader and points here. Fourteen edits: WO-11 and WO-12 are two edits each.
"""
import sys, os

EDITS = []
def E(wo, path, old, new): EDITS.append((wo, path, old, new))

# ---------------------------------------------------------------- QUEUE-RUNNER.md  v12 → v13
R = "docs/prompts/QUEUE-RUNNER.md"

E("WO-1 runner version line", R,
  "<!-- v12, 2026-08-21. STATUS: STANDING CONVENTION",
  "<!-- v13, 2026-09-02. STATUS: STANDING CONVENTION")

E("WO-2 runner amendment history", R,
  "     (TC-2 through TC-5 and TC-12, v12). -->",
  "     (TC-2 through TC-5 and TC-12, v12); THE CAPACITY PASS — the routing-table CLASS column and the\n"
  "     born-unsynced rule (CAP-2), the RETIRE act (CAP-1), the closed register and the current-sentence header\n"
  "     rule (CAP-3), and the BUILD-STATE 100,000-byte ceiling (CAP-4) — added by Michael's rulings 2026-09-02;\n"
  "     spec docs/specs/capacity-pass-2026-09-02.md §3, which governs where this summary disagrees (v13). -->")

E("WO-3 runner: where the register lives", R,
  "The live log is repo-only and bridge-reachable, exactly as the archive already is. **Nothing about\n"
  "the append-only rule changed — only where the file sits and who can read it without the bridge.**\n",
  "The live log is repo-only and bridge-reachable, exactly as the archive already is. **Nothing about\n"
  "the append-only rule changed — only where the file sits and who can read it without the bridge.**\n"
  "\n"
  "**WHERE THE REVIEW REGISTER LIVES (CAP-3, ruled 2026-09-02) — read this before Step 4 item 2.** Two files:\n"
  "`docs/specs/attorney-review-queue.md` (SYNCED; ⬜ and 🟡 rows only, plus any top-level ✅ parent held with an\n"
  "indented open child — eleven at the split, CAP-OPEN-2; its Status paragraph carries the CURRENT per-batch\n"
  "reconcile sentence only) and `docs/record/attorney-review-queue-closed.md` (REPO-ONLY, append-only,\n"
  "bridge-reachable; every ✅ row, text intact, under its register section heading; the RECONCILE HISTORY at its\n"
  "head). Spec: `docs/specs/capacity-pass-2026-09-02.md` §3.3. **And `docs/record/specs/` holds RETIRED specs\n"
  "(CAP-1, spec §3.1): a retired file moves there by `git mv` and leaves a three-line stub at its old path.**\n")

E("WO-4 runner Step 2: the CLASS column", R,
  "2. Read every manifest's §0 (READ ME FIRST), §1 (RECONCILE FIRST), and\n"
  "   §2 (routing table) across ALL packets before acting on any.\n",
  "2. Read every manifest's §0 (READ ME FIRST), §1 (RECONCILE FIRST), and\n"
  "   §2 (routing table) across ALL packets before acting on any.\n"
  "   **Every routing row carries a CLASS — `RULING` or `EVIDENCE` (CAP-2, ruled 2026-09-02; spec\n"
  "   `docs/specs/capacity-pass-2026-09-02.md` §3.2). `EVIDENCE` rows route under `docs/record/` and are\n"
  "   NEVER placed in `docs/specs/`; `RULING` rows route to their canonical home as before. A row with no\n"
  "   CLASS is a QR-6(e) act — skipped and reported — for the first two batches after v13, and a STOP\n"
  "   thereafter. Rows that place no file in the repo — the manifest, the session-log entry, the merge acts,\n"
  "   project-knowledge files, the instructions field — carry `—` and are outside this rule. The packet\n"
  "   author names the class; this runner never decides it.**\n")

E("WO-5 runner Step 3: the RETIRE act", R,
  "5. Collect its §3 session-log entry (do not append yet).\n",
  "5. Collect its §3 session-log entry (do not append yet).\n"
  "6. **A routing row whose Action is `RETIRE` (CAP-1, ruled 2026-09-02; spec §3.1) requires a ruling cite\n"
  "   in the row.** With it: `git mv docs/specs/<name>.md docs/record/specs/<name>.md`, then write the\n"
  "   three-line stub at the old path EXACTLY as spec §3.1 item 2 gives it, then VERIFY — the file at its\n"
  "   new path carries its pre-move sha256, the stub is exactly three lines, and `git diff --cached -M\n"
  "   --name-status` shows the rename (`R100`). Without a ruling cite it is a QR-6(e) act: skip and report.\n")

E("WO-6 runner Step 4 item 2: the queue merge is three acts", R,
  "   happened once (#84) and is recorded in that header, whose own words are \"keep it current or\n"
  "   the pointer lies.\"**\n",
  "   happened once (#84) and is recorded in that header, whose own words are \"keep it current or\n"
  "   the pointer lies.\"**\n"
  "   **The queue merge is THREE acts since v13 (CAP-3, ruled 2026-09-02; spec §3.3): (i) the rows; (ii) the\n"
  "   Status paragraph's CURRENT reconcile sentence — and the sentence it supersedes is APPENDED, verbatim, at\n"
  "   the END of the RECONCILE HISTORY block at the head of `docs/record/attorney-review-queue-closed.md`,\n"
  "   never deleted; (iii) every row this batch flips to ✅ MOVES — its whole block, the marker line plus its\n"
  "   indented continuation lines, text intact — to the closed register under its register section heading,\n"
  "   created there if absent. An indented ✅ beneath an open parent stays with the parent; a top-level ✅\n"
  "   with an indented open child is FLAGGED to Michael by ID and not moved. The synced register carries\n"
  "   ⬜ and 🟡 rows only, plus those flagged ✅ parents (eleven at the split — CAP-OPEN-2).**\n")

E("WO-7 runner Step 4 item 3: the byte ceiling", R,
  "   exists for READABILITY, not token cost). At the cap, **displace — cut\n"
  "   detail, never add sections**.",
  "   exists for READABILITY, not token cost). At the cap, **displace — cut\n"
  "   detail, never add sections**. **AND A 100,000-BYTE CEILING (CAP-4, ruled 2026-09-02; spec §3.4),\n"
  "   measured by `wc -c` on the working tree — never `git show`, which returns the LF-normalized blob —\n"
  "   after the rewrite and before the commit: over the ceiling, displace until under it, write the\n"
  "   displaced text VERBATIM into this batch's runner line under the heading `DISPLACED FROM BUILD-STATE\n"
  "   (CAP-4)`, and NAME THE SHORTFALL in BUILD-STATE's banner — bytes before, bytes after, which\n"
  "   paragraphs. Under the ceiling, the banner says so in one clause.**")

E("WO-8 runner Step 4 item 3: register counts from both files", R,
  "   re-derived, not carried.** **The log is now at `docs/record/session-log.md` — recompute\n"
  "   from there (TC-4).**\n",
  "   re-derived, not carried.** **The log is now at `docs/record/session-log.md` — recompute\n"
  "   from there (TC-4).** **Register counts come from BOTH files since v13 (CAP-3): ⬜ and 🟡 from\n"
  "   `docs/specs/attorney-review-queue.md`; ✅ from `docs/record/attorney-review-queue-closed.md` PLUS any\n"
  "   top-level ✅ parent still in the synced file (eleven at the split — CAP-OPEN-2); the method named\n"
  "   (leading marker, `^\\s*- (⬜|✅|🟡)`) and both file sizes stated.**\n")

E("WO-9 runner hard limits", R,
  "- **Never append a session-log entry to `docs/specs/session-log-head.md`.**",
  "- **Never place an `EVIDENCE`-class file in `docs/specs/`, and never execute a `RETIRE` row that carries no\n"
  "  ruling cite (CAP-1, CAP-2, ruled 2026-09-02).**\n"
  "- **Never append a session-log entry to `docs/specs/session-log-head.md`.**")

# ---------------------------------------------------------------- the register's Convention line (CAP-3a)
Q = "docs/specs/attorney-review-queue.md"
E("WO-10 the Convention line (CAP-3a)", Q,
  "**Convention:** ✅ = closed (2026-07-26 unless a later date is stated) · ⬜ = open. Each open item carries **the actual question in bold**.",
  "**Convention:** ⬜ = open · 🟡 = ruled-but-execution-pending, or awaiting Michael's confirmation · ✅ = closed (dated in the closure sentence; 2026-07-26 where none is stated). Each open item carries **the actual question in bold**. **Since 2026-09-02 (`CAP-3`): this file carries ⬜ and 🟡 rows only — plus any top-level ✅ parent held here because an indented open child sits beneath it (eleven at the split; `CAP-OPEN-2`) — and every other ✅ row lives, text intact, in `docs/record/attorney-review-queue-closed.md` — repo-only, bridge-reachable, append-only — under the same section heading, and the Status paragraph above carries only the CURRENT reconcile sentence, its predecessors living at the closed register's head.** A row is counted by its LEADING marker (`^\\s*- (⬜|✅|🟡)`); an indented sub-row belongs to the row above it.")

# ---------------------------------------------------------------- CLAUDE.md
C = "CLAUDE.md"
E("WO-11a CLAUDE.md: the record directory gains two residents", C,
  "  inside that file. Append entries; don't rewrite history.\n",
  "  inside that file. Append entries; don't rewrite history.\n"
  "- `docs/record/attorney-review-queue-closed.md` — the review register's CLOSED half:\n"
  "  every ✅ row, text intact, under its register heading, with the RECONCILE HISTORY at\n"
  "  its head. Repo-only, append-only, bridge-reachable (`CAP-3`, ruled 2026-09-02);\n"
  "  `docs/specs/attorney-review-queue.md` carries ⬜ and 🟡 rows only (plus flagged ✅\n"
  "  parents with open children — `CAP-OPEN-2`). **And\n"
  "  `docs/record/specs/` holds RETIRED specs (`CAP-1`): a retired file moves there by\n"
  "  `git mv` and leaves a three-line stub at its old path so cites resolve.** Spec:\n"
  "  `docs/specs/capacity-pass-2026-09-02.md` §3.\n")

E("WO-11b CLAUDE.md: the CLASS rule under Working style", C,
  "  home for cross-interface prompts (prompts meant to be executed by\n"
  "  Code sessions) — ruled 2026-07-26 (Q-2).\n",
  "  home for cross-interface prompts (prompts meant to be executed by\n"
  "  Code sessions) — ruled 2026-07-26 (Q-2).\n"
  "- **Every packet routing row carries a CLASS — `RULING` or `EVIDENCE` (`CAP-2`, ruled\n"
  "  2026-09-02).** `EVIDENCE` — audits, verifier reports, sweeps, research memos and fetch\n"
  "  records, mining passes, walkthrough captures, entry-draft staging, folded adjudication\n"
  "  records — is BORN in `docs/record/<slug>-<date>/`, unsynced and bridge-reachable;\n"
  "  `RULING` — specs, slices, REQ-CAPTUREs, registries, prompts in force, the sheet Michael\n"
  "  rules from — is born in `docs/specs/`. The synced side always gets what a ruling needs;\n"
  "  evidence is cited by path. `BUILD-STATE.md` has a 100,000-byte ceiling beside its\n"
  "  150-line cap, the shortfall named in its banner (`CAP-4`). Spec:\n"
  "  `docs/specs/capacity-pass-2026-09-02.md` §3.\n")

# ---------------------------------------------------------------- the working-set policy (CRLF in the working tree)
P = "docs/project-knowledge-working-set-policy.md"
E("WO-12a policy status line", P,
  "Amended 2026-08-18 (ruled same day): execution-capability line and capture-pruning caveat — see the two sections below.",
  "Amended 2026-08-18 (ruled same day): execution-capability line and capture-pruning caveat — see the two sections below. Amended 2026-09-02 (ruled same day, the capacity pass): the unit calibration, the retired-spec home, the born-unsynced class rule, the register split and the BUILD-STATE ceiling — see the last section.")

E("WO-12b policy amendment section", P,
  "- **Sequence:** execute steps 1–4 first. If the project drops back under the in-context threshold, a second project may be unnecessary.\n",
  "- **Sequence:** execute steps 1–4 first. If the project drops back under the in-context threshold, a second project may be unnecessary.\n"
  "\n"
  "## Amendment 2026-09-02 — the capacity pass (ruled; `docs/specs/capacity-pass-2026-09-02.md` governs)\n"
  "\n"
  "- **The unit is exact.** The knowledge meter is the sum of each project document's `estimated_token_count` as the platform reports it (a deletion of 114,570 units moved the meter by 114,570). Measured ratios: repo markdown 3.70 B/unit; capture prose 3.65; table-heavy notes 2.96; JSON 2.59. One point of the 2,000,000 budget is 20,000 units ≈ 74 KB of repo markdown.\n"
  "- **The synced repo is the meter** — 72.6 points at HEAD `2a85c99`, of which `docs/specs/` is 88.6% by bytes. Project documents were 17.7 points before the pass and 9.2 after it.\n"
  "- **Retired specs have a home (`CAP-1`):** `docs/record/specs/<name>.md` by `git mv`, a three-line stub left at the old path. Retirement stays a per-file ruling.\n"
  "- **Evidence is born unsynced (`CAP-2`):** every packet routing row carries a CLASS — `RULING` (born in `docs/specs/`) or `EVIDENCE` (born in `docs/record/<slug>-<date>/`). The synced side always gets what a ruling needs.\n"
  "- **The register is two files (`CAP-3`):** ✅ rows and the superseded reconcile sentences live in `docs/record/attorney-review-queue-closed.md`; the synced register carries ⬜ and 🟡 rows (plus flagged ✅ parents with open children — `CAP-OPEN-2`) and the current sentence only.\n"
  "- **BUILD-STATE has a byte ceiling (`CAP-4`):** 100,000 bytes beside the 150-line cap; the shortfall is named in its banner.\n"
  "- **The pinned line \"the index for any reference corpus\" is read as a SMALL index.** The probate corpus manifest JSON (54,722 units, 2.7 points) left for Michael's machine on 2026-09-02 (`CAP-5`); `probate_system_prompt.md` and the README remain the probate index set.\n"
  "- **Never prune design docs** still stands for design docs. The 2026-08-18 caveat stands for captures; `TC-8` (2026-08-21) made captures TRANSIT, and the relocation method is now the project docs API read in Michael's own browser — byte-exact, manifest-hashed, verified on disk before deletion.\n")

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    root = sys.argv[1]; write = "--write" in sys.argv
    files = {}; ok = True
    for wo, path, old, new in EDITS:
        full = os.path.join(root, path)
        if path not in files:
            raw = open(full, "rb").read()
            crlf = b"\r\n" in raw
            files[path] = [raw.decode("utf-8"), crlf]
        text, crlf = files[path]
        o = old.replace("\n", "\r\n") if crlf else old
        n = new.replace("\n", "\r\n") if crlf else new
        c = text.count(o)
        print(f"{'OK ' if c == 1 else 'FAIL'} {wo:58s} {path}  occurrences={c}{'  [CRLF]' if crlf else ''}")
        if c != 1: ok = False; continue
        files[path][0] = text.replace(o, n)
    if not ok:
        print("REFUSED: at least one OLD string is not unique; nothing written."); sys.exit(1)
    if write:
        for path, (text, crlf) in files.items():
            open(os.path.join(root, path), "wb").write(text.encode("utf-8"))
            print(f"WRITTEN {path} ({len(text.encode('utf-8'))} B)")
    else:
        print("DRY RUN — all OLD strings unique; nothing written. Re-run with --write.")
    sys.exit(0)

if __name__ == "__main__":
    main()
