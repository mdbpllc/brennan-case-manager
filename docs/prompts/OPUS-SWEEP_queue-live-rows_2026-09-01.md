# OPUS-SWEEP — wave 2 of the 2026-09-01 queue-audit pass: the LIVE-row evidence sweep (Opus, background)

**PASTE THIS WHOLE FILE as the first message of a FRESH Cowork chat in the "Project Management Software" (build) project, OPUS 5 selected, the chat linked to `mdb-pllc`.** It is NOT part of CHAT-DISPATCH v5 and does not touch v5's tasks; the two can run in any order or in parallel.

**What this is.** The Fable 5 design session running today (2026-09-01) completed WAVE 1 of the review-queue adversarial pass — the verification of the 2026-08-24 audit's 108 disposition candidates — and launched WAVE 2, the sweep of the ~247 open rows no closure-class audit ever tested. **The wave-2 fleet died at launch: all eight agents hit the Fable 5 weekly limit (HTTP 429), zero reports written** — the `#104` dead-fleet class, surfaced by the harness rather than worn as a clean bill. Per §7.2 this sweep is mechanical evidence-gathering — **execution, Opus's lane** — and the routing is now corrected rather than waited out. **This session gathers evidence and adjudicates NOTHING**; the adjudication belongs to the Fable session, and every disposition this sweep proposes is an INPUT to that sheet, not a candidate ruling in its own right. Michael rules last, row by row.

**The fence, so three concurrent sessions never collide:** this session is READ-ONLY on the repo — it ships NO packet, writes NOTHING into `inbox/`, edits NO queue row, deletes NOTHING from project knowledge, and reads no `src/`. Its ONLY outputs are one evidence file delivered in chat and a copy written to project knowledge. The Fable session owns the cleanup sheet and its packet; the CHAT-DISPATCH v5 chain owns its own eight tasks; neither is touched from here.

---

## STEP 0 — Setup and pin (STOP conditions live here)

1. Request the folder `C:\Users\Brennan\brennan-case-manager` over the bridge. (If the dialog times out, ask Michael in chat and wait; do not retry blind.)
2. Verify, lock-free: `git ls-remote origin refs/heads/master` equals `git rev-parse HEAD` (run in the checkout with `GIT_OPTIONAL_LOCKS=0`; never a bare `git status`). **This sweep is PINNED to HEAD `7f02131f215605b3062a8351c2b7ec96f46c004c` (batch 85).** If HEAD is anything else, a batch has landed (the v5 chain ships packets today) — **STOP, tell Michael which commit you found, and ask whether to proceed by re-deriving the row inventory at the new HEAD** (the method below is deterministic; only the pin changes). Do not proceed silently on a moved HEAD.
3. Stage these thirteen files into the container (then copy them to `/home/claude/work/ev/` preserving the `docs/...` layout, so every path below holds verbatim) and verify each against its sha256 prefix — **byte-identity or STOP**:

```
648029  5427b9012e864da5  docs/specs/attorney-review-queue.md
 27133  6ea18c7d666fff2a  docs/specs/attorney-review-queue-audit-2026-08-24.md      (UNTRACKED, working tree)
 36000  4b43fb42a27e4f74  docs/specs/attorney-review-queue-audit-HARDENED-2026-08-25.md
 54218  46e86a79ea4c6b4a  docs/specs/id-collision-report.md                          (UNTRACKED, working tree)
 22344  4e00f10df47a8c11  docs/specs/superseded-specs-candidates-2026-08-25.md
1294651 da6a722d2e6c6070  docs/record/session-log.md
228795  6b13a2de7e8df548  docs/record/session-log-toc.md
578892  508494a521126f70  docs/archive/session-log-archive-2026-07-21_2026-08-12.md
141688  f891897c935c2f5f  docs/specs/BUILD-STATE.md
141486  b9f8f5392903c28f  docs/specs/session-log-head.md
 20190  6a79079710842adb  docs/specs/Go_Live_Gates.md
  4084  dafd3f91644fd9af  docs/specs/anti-resurrection-ledger.md
 32123  f98806158d4494e6  docs/specs/record-integrity-audit-2026-08-15.md
```

4. Rebuild the row inventory and entry indexes with this script, saved as `/home/claude/work/ev/index_rows.py` and run from `/home/claude/work/ev/` — it is deterministic; **your outputs must match the checks below or STOP**:

```python
import re, json
Q = '/home/claude/work/ev/docs/specs/attorney-review-queue.md'
lines = open(Q, encoding='utf-8').read().split('\n')
rows = []; sect = ''
for i, ln in enumerate(lines, 1):
    if re.match(r'^#{2,3} ', ln): sect = ln.strip('# ').strip()
    m = re.match(r'^\s*- (⬜|✅|🟡)\s*(.*)', ln)
    if m:
        glyph, rest = m.group(1), m.group(2)
        idm = re.search(r'`([^`]+)`', rest[:120]) or re.search(r'\*\*([^*]+?)\*\*', rest[:160])
        rid = idm.group(1) if idm else ''
        j = i
        while j < len(lines) and not re.match(r'^\s*- (⬜|✅|🟡)', lines[j]) and not re.match(r'^#{2,3} ', lines[j]):
            j += 1
        size = sum(len(x.encode('utf-8')) + 1 for x in lines[i-1:j])
        rows.append({'line': i, 'glyph': glyph, 'id': rid[:60], 'section': sect[:70], 'bytes': size, 'head': rest[:140]})
open('/home/claude/work/ev/rows.json', 'w').write(json.dumps(rows, ensure_ascii=False, indent=0))
with open('/home/claude/work/ev/rows.tsv', 'w') as f:
    for r in rows:
        f.write(f"{r['line']}\t{r['glyph']}\t{r['id']}\t{r['bytes']}\t{r['section']}\t{r['head']}\n")
for name, path in [('live', '/home/claude/work/ev/docs/record/session-log.md'), ('arch', '/home/claude/work/ev/docs/archive/session-log-archive-2026-07-21_2026-08-12.md')]:
    out = []
    for i, ln in enumerate(open(path, encoding='utf-8').read().split('\n'), 1):
        if ln.startswith('## '): out.append(f"{i}\t{ln[:170]}")
    open(f'/home/claude/work/ev/{name}_entries.tsv', 'w').write('\n'.join(out))
```

**Checks:** 487 rows total — 356 `⬜`, 126 `✅`, 5 `🟡`; `live_entries.tsv` 156 headings; `arch_entries.tsv` 142.

5. Rebuild the eight slices with this script (the `covered_lines` set is the 108-candidate wave-1 coverage plus its satellite rows — copy it EXACTLY):

```python
import json
rows = json.load(open('/home/claude/work/ev/rows.json'))
covered_lines = {185,186,187,188,189,193,197,228,229,288,112,133,518,650,667,684,745,773,777,840,841,842,809,912,71,75,282,990,59,121,134,214,388,391,409,410,467,472,473,605,767,807,882,888,1001,1004,1242,1248,1249,432,606,613,761,832,878,946,952,960,975,978,170,171,201,1283,127,132,964,945,953,918,924,938,86,1013,900,349,377,390,470,471,1212,523,1241,522,1005,1240,1263,865,838,881,893,988,1264,94,95,96,98,540,835,836,837,864,866,867,907,908,880,27,60,62,63,1016,515,862,977}
open_rows = [r for r in rows if r['glyph'] != '✅' and r['line'] not in covered_lines]
target = sum(r['bytes'] for r in open_rows) / 8
slices = []; cur = []; acc = 0
for r in open_rows:
    cur.append(r); acc += r['bytes']
    if acc >= target and len(slices) < 7:
        slices.append(cur); cur = []; acc = 0
if cur: slices.append(cur)
with open('/home/claude/work/ev/slices_wave2.txt', 'w') as f:
    for i, s in enumerate(slices, 1):
        f.write(f"=== B{i} — {len(s)} rows, lines {s[0]['line']}–{s[-1]['line']}, {sum(r['bytes'] for r in s)} B ===\n")
        for r in s:
            f.write(f"L{r['line']} {r['glyph']} [{r['id'][:50]}] {r['bytes']}B | {r['head'][:90]}\n")
        f.write('\n')
```

**Checks (row counts · line ranges):** B1 55 · L18–L215 | B2 21 · L231–L269 | B3 39 · L275–L519 | B4 23 · L528–L775 | B5 25 · L778–L856 | B6 30 · L857–L915 | B7 37 · L916–L968 | B8 17 · L972–L1282. **247 rows, ~225,277 B.** Any mismatch: STOP and report.

6. Write the brief below to `/home/claude/work/ev/BRIEF_wave2.md` — it is the whole method; every processor follows it.

---

## THE BRIEF (write verbatim to `/home/claude/work/ev/BRIEF_wave2.md`)

```markdown
# WAVE-2 BRIEF — full sweep of the open rows no closure-class audit ever tested (read-only)

You are one sweeper in a read-only fleet. Wave 1 verified the 108 rows the 2026-08-24 audit classed as
not-open-rulings. **Your slice is the remainder — rows the audit left LIVE (or never named).** The audit's
own §9 says no auditor cross-checked another's slice; the hardened pass found 27 rows named nowhere. You
are the cross-check. **You adjudicate nothing, edit nothing, and write only your report file.**

## The files (staged byte-identical from HEAD `7f02131`, 2026-09-01)
- `/home/claude/work/ev/docs/specs/attorney-review-queue.md` — THE REGISTER; rows begin `- ⬜/✅/🟡` and run
  to the next such row or heading. Read the WHOLE row.
- `/home/claude/work/ev/docs/record/session-log.md` — LIVE log, newest first (`#65`–`#140` + runner lines);
  `/home/claude/work/ev/live_entries.tsv` = heading index. **Lines 1–~600 are `#138`, `#139`, `#140` and
  runners 83–85 — everything after both audits.** `#127`–`#137` (2026-08-20/22) were in the log at audit
  time but are the densest ruling stretch in the record and the likeliest place a LIVE call is wrong.
- `/home/claude/work/ev/docs/archive/session-log-archive-2026-07-21_2026-08-12.md` — CLOSED archive (before
  `#65`); `/home/claude/work/ev/arch_entries.tsv`.
- `/home/claude/work/ev/docs/record/session-log-toc.md` — one abstract per entry; grep it first to find
  which entries touch a subject, then read those entries.
- `/home/claude/work/ev/docs/specs/BUILD-STATE.md` — state at HEAD (what is built, ruled, deferred, open).
- The two audits (`attorney-review-queue-audit-2026-08-24.md`, `…-HARDENED-2026-08-25.md`) for what they
  said about your rows (if anything); `id-collision-report.md` for ID collisions; `Go_Live_Gates.md`;
  `anti-resurrection-ledger.md`; `record-integrity-audit-2026-08-15.md`.

## For EVERY row in your slice
1. Read the row whole. Identify its QUESTION (or note it carries none — a record line, a carry, a pointer).
2. Grep the row's ID (and, for rows without an ID, two distinctive phrases) across the live log, the archive,
   BUILD-STATE and the TOC. Flatten for wrapped headings when a count is zero; report zeros with a control.
   **AN ID IS NOT AN IDENTITY UNTIL THE ROW IS READ** — the register has known collisions (`H22`, `H43`,
   `H12`, `O-*`, `CR-3`, `T3`, `V7`, `OPEN-3`/`TC-OPEN-3` substring).
3. Read the surrounding paragraph of each hit. Decide which of these is true, quoting the decisive sentence
   character-exact (copy, never retype) with file + entry heading (first 80 chars) + staged line number:
   - **CLOSED-BY-LATER-RULING** — Michael answered the row's question, in his words, after the row was
     written (or before, and the row never noticed). Quote his words.
   - **MOOTED / PREMISE-STALE** — the thing the row asks about was built, retired, replaced or overtaken
     (BUILD-STATE at HEAD is the authority for "built"). Say what overtook it and whether a residue survives.
   - **WORLD-STATE-STALE** — the row's stated premise about the build is false at HEAD (e.g., "gated behind
     CD-1", "FE-D1 not built", "generated_documents has no status column") but its QUESTION is still open.
   - **DEFERRED / HELD IN MICHAEL'S WORDS** — quote the deferral; only he closes it.
   - **ACT, NOT RULING** — awaits a hand or a research act; say whose.
   - **DUPLICATE-CANDIDATE** — another row asks the same question (name it; quote both); shared blocker ≠
     duplicate.
   - **LIVE, UNCHANGED** — genuinely open, premise intact, nothing on the record answers it.
4. For anything other than LIVE-UNCHANGED, attempt to DISCONFIRM your own call: the limb the ruling does not
   reach; a later entry that reopens; unique text the row alone carries (grep 2 distinctive phrases across
   the register; report counts with a control).
5. Propose ONE disposition from: `CLOSE` · `CLOSE-SPLIT` (name the surviving limb) · `ANNOTATE-KEEP` (state
   the annotation's substance) · `KEEP` · `RECLASSIFY-ACT` (whose) · `MICHAEL-IN-WORDS`, with confidence
   HIGH/MED/LOW and one sentence why. For LIVE-UNCHANGED rows the disposition is `KEEP` and needs no essay —
   one line each, but the grep must have been run.
6. Copy the row's FIRST LINE exactly (the whole line) for every non-KEEP proposal, and report whether it
   occurs exactly once in the register (`grep -c -F`).

## Also record, per row, ONE dependency tag for the sheet's grouping (choose the nearest): `Q-STAT-5 stack` ·
`RE-1 pass` · `PR-3 / probate ladder` · `discovery slice (FE-9/11/13, Q-FE*)` · `Q-COM-10 list` · `Q-IN3-3
first-instrument consumer` · `T3 / KICK-1 / P1` · `Phase 1b GPU` · `CE1` · `Q-WF-4 server-side identity` ·
`money module (no row)` · `registry verification` · `free-standing` · `Michael's hand` · `hands-on`.

## Rules
- Read-only. Never paraphrase a ruling you can quote. Never infer a ruling from a glyph or a runner heading.
- A Claude "PROPOSED / RECOMMENDED / unruled" is not a ruling. A runner's "should close" is not a ruling.
- If a fact needs an unstaged file (registry files, specs other than those listed, `src/`, the live database,
  the instructions field), say UNVERIFIABLE-HERE.
- Do not skip rows. Do not sample. Every row in the slice gets a line in the SUMMARY table.

## Output
One `### <ID or first words> (L<line>)` block for every row with a non-KEEP proposal (fields 1–6), a
one-line list for KEEP rows (`L<line> ID — KEEP — <dependency tag> — greps run: <ids/phrases>`), then
`## SUMMARY`: `line | ID | call (from step 3) | PROPOSED | confidence | dependency tag |
unique-text-destroyed-if-closed? (Y/N/n-a)`.
```

---

## STEP 1 — Run the sweep

Process all eight slices, B1 through B8, per the brief — sequentially yourself, or fanned out to read-only
subagents (your call by context budget; **if you fan out, every agent must RETURN CONTENT — a fleet member
returning zero findings on zero tokens is a dead agent, not a clean slice (`#104`), and its slice re-runs**).
Per-slice steering notes, applied on top of the brief:

- **B1 (L18–L215):** registry residuals V1–V17 (read the `#65`/`#72`/`#95`/`#98`/`#108`–`#110` registry
  entries), the TRCP sign-off rows L84–L88 (note `#139`'s HD-10 sentence; TRCP 195.2 is R11's gate —
  Michael's verification act), the project-documents rows, the CR series (read `#62`/`#63` and BUILD-STATE's
  CR paragraph), the client-model rows, FE rows wave 1 did not take.
- **B2 (L231–L269):** CD-3…CD-13 (read `#74`, `#113`; check whether `CD-14` — minted `#139`/`#140` — or the
  amendment slice touches any); IN-1…IN-7 (read `#83`/`#84`, `#106`; test the hardened §5.3 claim that IN-3
  rests on a pre-FE-D1 schema fact).
- **B3 (L275–L519):** WF-1…WF-8 (test §5.3 on WF-3), DL/PL/HK rows, WS-P rows not covered, the O series
  (skip O-8/O-9 — wave 1), the FC13-Q and Q-WS3P series, G10 rows (read `#115`/`#118`/`#126`; edge (1) owed
  to `O-1`), TC series (read `#132`/`#133`/`#134`, `#138`).
- **B4 (L528–L775):** the registry-verification block — the backlog row, V-series rows not in wave 1,
  cite-check/workbook rows, `V5-ATTRIB`, `Q-T19-1/-3/-4`, `Q-COM-10-B/-C/-D/-F` (quote `#105`'s "annotated
  add-only as UNBLOCKED; none closed"), `Q-RL6-1/-2` (BUILD-STATE says Pharr AND Hurlburt were READ at
  `#117`; the row may still say otherwise), Q-DES rows other than Q-DES-5.
- **B5 (L778–L856):** `Q-AUTH-2` (read `#104` on *Whaley*'s DO-NOT-PUBLISH notation), TOC/GLR rows other
  than TOC-3/TOC-5 (GLR-2 is TOC-3's twin — wave 1 took TOC-3), Q-T3P rows (read `#90`), Q-COM-1…Q-COM-9 and
  P-COM-1/P-COM-5 (read `#89`, `#94`, `#105`; check the `H12-v`/AS-Q1 rulings at `#130`/`#140`).
- **B6 (L857–L915):** Q-QBO rows not in wave 1, Q-RE-2…Q-RE-7 (read `#88`, `#106`; test §5.3 on Q-RE-5),
  Q-PR3-1/-2/-4…-7 (read `#86`, `#113`), Q-WF-1…Q-WF-10 (read `#85`, `#94`, `#140`'s AS-Q1), Q-IN2-2…-6.
- **B7 (L916–L968):** the Task 8/9 spec question sets (Q-IN2-8/-9, Q-IN1-2…-8, Q-IN3-1…-8, Q-FE4-3…-6,
  Q-FE5-1/-4…-9, Q-FE6-2…-7). Read `#81`, `#83`, `#84`, the FE-D1 build entry, `#139`, `#140`. **Q-FE5-9:
  ANNOTATE-KEEP at most — the CHAT-DISPATCH v5 chain is drafting its ROUTE-C wording today; do not collide.**
  `Q-IN1-8` is "a one-word veto on the whole IN series" — say so.
- **B8 (L972–L1282):** Task 7 memo rows other than Q4, Q-STAT-2/-4/-5 (read `#108`'s "plain open" choice),
  the ID-DL-1 row (count how many packets' question sets it governs; the audit said sixteen), [DL-memo
  Q1]–[Q3]/[Q5] (Q4 is wave 1's), the CHAT-DISPATCH/OPUS-RUN process rows (BUILD-STATE: v4 COMPLETE; the
  OPUS-RUN paste HAS RUN), the KICKOFF/Q-3 neighbourhood, the 2026-07-28 captured items (BUILD-STATE:
  "UNRULED, adopt nothing").

## STEP 2 — Consolidate and deliver

Assemble ONE file, `claude_Queue_Sweep_Evidence_Opus_2026-09-01.md`, containing: a header stating what this
is (wave-2 EVIDENCE for the 2026-09-01 cleanup adjudication; Opus 5, execution class, adjudicates nothing;
pinned to `7f02131`; DT-1 Central date), the eight slice reports in order, and a MASTER SUMMARY table of
every non-KEEP row (line · ID · call · PROPOSED · confidence · dependency tag · unique-text Y/N) plus the
KEEP counts per slice. Mark it on its face: **LIVE WORKING DOCUMENT — data prep, reference only, never
routed to the repo; SPENT when the Fable session's cleanup sheet ships.**

Deliver it twice: (1) as a downloadable file in this chat — **Michael carries it to the Fable session's chat
by attaching it there**; (2) written into project knowledge via the Projects tool at
`claude_Queue_Sweep_Evidence_Opus_2026-09-01.md`, so the Fable session can also try a direct read. Then
report: rows processed per slice (must sum to 247), counts by call, any slice re-run for a dead agent, and
anything UNVERIFIABLE-HERE that recurred. **No packet, no zip, no `inbox/`, no repo write, no queue edit, no
project-knowledge deletion, no new chat, no ruling.**
