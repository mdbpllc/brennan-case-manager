#!/usr/bin/env python3
"""
split-review-queue.py — the ONE-TIME split ruled by CAP-3 (2026-09-02), specified at
docs/specs/capacity-pass-2026-09-02.md §3.3.

  docs/specs/attorney-review-queue.md            -> keeps ⬜ and 🟡 rows, the Status intro and the CURRENT
                                                    reconcile sentence
  docs/record/attorney-review-queue-closed.md    -> NEW; every top-level ✅ row block, text intact, under the
                                                    same section headings; the RECONCILE HISTORY at its head

Rules the script enforces (all from §3.3, decided there so the script never decides them):
  * a ROW is a line whose stripped form starts with "- ⬜", "- ✅" or "- 🟡" (leading-marker method);
  * a top-level row's BLOCK is the row line plus every immediately following INDENTED line (continuations,
    sub-rows), ending at the first blank line, heading, "---", or non-indented line;
  * only TOP-LEVEL ✅ blocks move; an indented ✅ beneath an open parent stays with the parent;
  * a top-level ✅ block containing an indented ⬜ or 🟡 line is FLAGGED and NOT moved;
  * the Status paragraph is split at every "**Reconciled " boundary: segment 0 (intro) and the LAST segment
    stay; every middle segment moves to the closed register's RECONCILE HISTORY, verbatim;
  * row text is never edited.

Verification before any write (the script REFUSES to write on any mismatch):
  * bytes conserved: live_after == live_before - removed_bytes  (removed = moved blocks + moved header text)
  * row counts conserved: (⬜,✅,🟡) before == (⬜,🟡 + flagged ✅) live-after + (✅) closed-after
  * no orphan: no indented line in the ORIGINAL file follows a blank line while the nearest non-indented line
    above it is a top-level ✅ row (a block ends at a blank line, so such a line would be silently left behind)
    — REFUSED if found
  * every flagged block listed by its first 80 characters

Usage:  python3 split-review-queue.py <repo-root> [--write]
        Without --write it is a dry run and prints the verification.  Exit code 0 only when every check passes.
"""
import re, sys, os, hashlib

OPEN, DONE, PART = "- ⬜", "- ✅", "- 🟡"
MARKS = (OPEN, DONE, PART)
LIVE_REL = "docs/specs/attorney-review-queue.md"
CLOSED_REL = "docs/record/attorney-review-queue-closed.md"

def sha(b): return hashlib.sha256(b).hexdigest()

def marker(line):
    s = line.lstrip()
    for m in MARKS:
        if s.startswith(m): return m
    return None

def count_rows(text):
    c = {OPEN: 0, DONE: 0, PART: 0}
    for l in text.split("\n"):
        m = marker(l)
        if m: c[m] += 1
    return c

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    root = sys.argv[1]; write = "--write" in sys.argv
    live_path = os.path.join(root, LIVE_REL); closed_path = os.path.join(root, CLOSED_REL)
    raw = open(live_path, "rb").read()
    if b"\r\n" in raw:
        print("REFUSED: the register is CRLF in the working tree; this script assumes LF (git ls-files --eol says i/lf w/lf at HEAD 2a85c99). Stop and report."); sys.exit(3)
    text = raw.decode("utf-8")
    before_counts = count_rows(text); before_bytes = len(raw)
    if os.path.exists(closed_path):
        print(f"REFUSED: {CLOSED_REL} already exists — the one-time split has run, or a file sits at that path. Stop and report."); sys.exit(3)

    lines = text.split("\n")
    # ---- 0. orphan check: an indented line after a blank line whose last non-blank predecessor is a ✅ row
    orphans = []
    in_done = False; saw_blank = False; row_line = None
    for i, l in enumerate(lines):
        if l.strip() == "":
            saw_blank = True; continue
        if l[0].isspace():
            if in_done and saw_blank:
                orphans.append((row_line + 1, lines[row_line][:60], i + 1, l[:60]))
            continue
        # a non-indented, non-blank line ends any block
        in_done = l.startswith(DONE); saw_blank = False; row_line = i if in_done else None
    if orphans:
        print("REFUSED: indented continuation(s) separated from a ✅ row by a blank line — the split would orphan them:")
        for o in orphans: print("   row line", o[0], repr(o[1]), "-> continuation line", o[2], repr(o[3]))
        sys.exit(3)
    # ---- 1. the Status paragraph -------------------------------------------------------------
    status_idx = next((i for i, l in enumerate(lines) if l.startswith("**Status:**")), None)
    if status_idx is None:
        print("REFUSED: no line starting with '**Status:**' — the register's shape has changed. Stop and report."); sys.exit(3)
    para = lines[status_idx]
    segs = re.split(r"(?=\*\*Reconciled )", para)
    if len(segs) < 3:
        print("REFUSED: fewer than three reconcile segments in the Status paragraph; nothing to move."); sys.exit(3)
    intro, current, history = segs[0], segs[-1], segs[1:-1]
    new_status = intro + current
    moved_header_text = "".join(history)
    assert intro + moved_header_text + current == para

    # ---- 2. row blocks ----------------------------------------------------------------------------
    out_live = []; moved = []; flagged = []; heading_chain = []
    i = 0
    while i < len(lines):
        l = lines[i]
        if i == status_idx:
            out_live.append(new_status); i += 1; continue
        if l.startswith("#"):
            level = len(l) - len(l.lstrip("#"))
            heading_chain = [h for h in heading_chain if h[0] < level] + ([(level, l)] if level > 1 else [])
            out_live.append(l); i += 1; continue
        if l and not l[0].isspace() and l.startswith(DONE):
            # collect the block
            j = i + 1
            while j < len(lines) and lines[j] and lines[j][0].isspace():
                j += 1
            block = lines[i:j]
            if any(marker(x) in (OPEN, PART) for x in block[1:]):
                flagged.append(block[0][:80])
                out_live.extend(block); i = j; continue
            moved.append((list(heading_chain), block)); i = j; continue
        out_live.append(l); i += 1

    live_after = "\n".join(out_live)
    removed_rows_bytes = sum(len(("\n".join(b) + "\n").encode("utf-8")) for _, b in moved)
    # each moved block took its trailing newline with it (the join drops one "\n" per removed line)
    expected_after = before_bytes - removed_rows_bytes - len(moved_header_text.encode("utf-8"))
    ok_bytes = (len(live_after.encode("utf-8")) == expected_after)

    # ---- 3. the closed register -------------------------------------------------------------------
    banner = (
        "# ATTORNEY REVIEW QUEUE — CLOSED REGISTER (repo-only, bridge-reachable, append-only)\n\n"
        "> **Created 2026-09-02 by the one-time split ruled at `CAP-3` (`docs/specs/capacity-pass-2026-09-02.md` §3.3).**\n"
        "> Every ✅ row of `docs/specs/attorney-review-queue.md` lives HERE, text intact, under the section heading it sat\n"
        "> under in the register; the register carries ⬜ and 🟡 rows only, plus any top-level ✅ parent held there with\n"
        "> an indented open child (eleven at the split — CAP-OPEN-2). The queue runner APPENDS a row here when it\n"
        "> flips it to ✅ (runner v13, Step 4 item 2, third act) and never edits or removes one. `docs/record/` is excluded\n"
        "> from the design-side sync by the standing `TC-4` exclusion — **absence from design-side retrieval is BY DESIGN and\n"
        "> is never evidence of absence.** Cite by heading or quoted sentence (CITE-STABILITY).\n\n"
        "## RECONCILE HISTORY — the register's superseded per-batch sentences, oldest first, moved verbatim\n\n"
        "> The register's Status paragraph carries only the CURRENT \"Reconciled again…\" sentence (`CAP-3`); when the runner\n"
        "> writes a new one it appends the superseded sentence at the END of this block.\n\n"
    )
    body = []
    last_chain = None
    for chain, block in moved:
        if chain != last_chain:
            body.append("")
            for lvl, h in chain:
                body.append(h)
            body.append("")
            last_chain = chain
        body.extend(block)
    closed_text = banner + "**Moved header text, verbatim, joined as it stood in the register:** " + moved_header_text + "\n\n" + \
                  "## CLOSED ROWS — under their register headings (level-2 and level-3 headings reproduced; the register's H1 is not)\n" + "\n".join(body) + "\n"

    # ---- 4. verification ---------------------------------------------------------------------------
    after_live_counts = count_rows(live_after); closed_counts = count_rows(closed_text)
    ok_counts = (before_counts[OPEN] == after_live_counts[OPEN]
                 and before_counts[PART] == after_live_counts[PART]
                 and before_counts[DONE] == after_live_counts[DONE] + closed_counts[DONE]
                 and closed_counts[OPEN] == 0 and closed_counts[PART] == 0)
    print("=== split-review-queue — verification ===")
    print(f"live before: {before_bytes} B  rows ⬜ {before_counts[OPEN]} ✅ {before_counts[DONE]} 🟡 {before_counts[PART]}")
    print(f"moved: {len(moved)} ✅ blocks ({removed_rows_bytes} B) + {len(history)} header sentences ({len(moved_header_text.encode('utf-8'))} B)")
    print(f"flagged, NOT moved (✅ parent with an open child): {len(flagged)}")
    for f in flagged: print("   ", f)
    print(f"live after:  {len(live_after.encode('utf-8'))} B  (expected {expected_after})  rows ⬜ {after_live_counts[OPEN]} ✅ {after_live_counts[DONE]} 🟡 {after_live_counts[PART]}")
    print(f"closed:      {len(closed_text.encode('utf-8'))} B  rows ⬜ {closed_counts[OPEN]} ✅ {closed_counts[DONE]} 🟡 {closed_counts[PART]}")
    print(f"bytes conserved: {'OK' if ok_bytes else 'MISMATCH'} | row counts conserved: {'OK' if ok_counts else 'MISMATCH'} | orphans: 0")
    if not (ok_bytes and ok_counts):
        print("REFUSED: verification failed; nothing written."); sys.exit(1)
    if write:
        os.makedirs(os.path.dirname(closed_path), exist_ok=True)
        open(live_path, "wb").write(live_after.encode("utf-8"))
        open(closed_path, "wb").write(closed_text.encode("utf-8"))
        print(f"WRITTEN: {LIVE_REL} ({len(live_after.encode('utf-8'))} B, sha256 {sha(live_after.encode('utf-8'))[:12]}…) and {CLOSED_REL} ({len(closed_text.encode('utf-8'))} B, sha256 {sha(closed_text.encode('utf-8'))[:12]}…)")
    else:
        print("DRY RUN — nothing written. Re-run with --write.")
    sys.exit(0)

if __name__ == "__main__":
    main()
