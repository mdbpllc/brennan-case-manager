# PROJECT-KNOWLEDGE CAPACITY — measured 2026-08-20, and `WS-P2` corrected

**Status: PROPOSED (the §4 split), plus one CORRECTION (§2) that stands on measurement.**
Canonical repo path (PROPOSED): `docs/specs/knowledge-capacity-measurement-2026-08-20.md`
**Authored:** 2026-08-20 Central, design session (Cowork, Opus 5), bridge reads at `84437a8`.

**Every figure below was produced by a command against the checkout at HEAD or by the project's own
reported metric. Nothing is carried.** Method: the synced scope is `git ls-files` minus the live
sync-config exclusions; byte totals by `stat`; the token ratio is derived, not assumed (§1.2).

---

## §1 — WHERE IT ACTUALLY STANDS

### §1.1 — The reading

**`knowledge_size` 1,795,567 of `max_knowledge_size` 2,000,000 — 89.8%.** ~204,000 of headroom.

### §1.2 — The unit, derived rather than assumed

The synced scope is **163 files, 6,216,246 bytes**. Against the reported 1,795,567 that is
**3.46 characters per unit** — squarely in the range for markdown prose. **So the metric is tokens,
not megabytes, exactly as the instructions' operational note says**, and **the synced repo alone
accounts for essentially the whole figure.** Byte size and budget share are therefore proportional,
which is what makes §3's table actionable.

### §1.3 — THE GROWTH RATE IS THE FINDING, NOT THE LEVEL

Synced-scope bytes at successive HEADs:

| date | commit | synced bytes | ≈ tokens | % of budget |
|---|---|---|---|---|
| 2026-08-12 | `f72de66` | 2,716,073 | ~784K | 39% |
| 2026-08-15 | `4146a4c` | 3,669,540 | ~1,060K | 53% |
| 2026-08-19 | `f894640` | 5,450,998 | ~1,575K | 79% |
| 2026-08-19 | `beb27f4` | 5,943,339 | ~1,717K | 86% |
| 2026-08-20 | `84437a8` | 6,200,715 | ~1,792K | **90%** |

**+3.48 MB in eight days. +750 KB — about 217,000 tokens, roughly 11% of the entire budget — in
the last twenty-four hours alone.**

**RUNWAY, stated plainly: ~204K tokens remain. At the last-24h rate that is about ONE DAY. At the
eight-day average (~126K/day) it is about a day and a half.** **And two packets are already staged
in `inbox/` that will add to it, plus every runner batch appends a log entry and regenerates the
index.** *(A prediction, not a reading — it assumes the pace holds, and the pace is a function of
how much work gets done.)*

### §1.4 — THE MECHANISM IS THE CLOSE-OUT ITSELF, WHICH IS WHY IT COMPOUNDS

Every runner batch, by ruled design, **appends a dense session-log entry**, **regenerates
`session-log-toc.md` in full** (TOC-4), and **rewrites BUILD-STATE**. The log is APPEND-ONLY by
ruling and the entries are long by house style. **`session-log.md` went 549,427 → 1,421,039 bytes
between 2026-08-12 and 2026-08-20 — it nearly TRIPLED in eight days.** Nothing here is a defect;
it is the record-keeping working. **But the record-keeping is now the dominant consumer of the
budget that lets sessions read the record.**

---

## §2 — CORRECTION: `WS-P2` NAMES THE WRONG TARGET

**WHAT WAS ASSERTED.** Queue row **`WS-P2`**, OPEN: *"Sync picker: should `docs/authority/pdf/` be
excluded too? The directory holds **16 scanned opinion PDFs, ~194 pages**… It is the **probable home
of the sync's ~1.38M-token weight** — the single largest lever on project capacity now identified."*

**WHAT IS TRUE INSTEAD, by measurement at HEAD.** **`docs/authority/pdf/` holds exactly one tracked
file — `README.md`.** `git ls-files docs/authority/` returns two paths total
(`case-authority-index.md` and `pdf/README.md`); the directory on disk holds one file; **no opinion
PDF is tracked anywhere in the repo.** The whole of `docs/authority/` is **7,010 bytes ≈ 2,000
tokens ≈ 0.1% of the budget.**

**The README says so in its own words**, and explains the confusion: it is a *"Destination for the
16 case-opinion PDFs **currently in Claude project knowledge**… **Michael moves them, not Code**."*
**So the directory was a planned destination, not a current home.** And the PDFs are not on the
knowledge side either — **no PDF appears in the project's current document list.**

**WHICH ROW IT CORRECTS.** `WS-P2` in `attorney-review-queue.md`. **The row stands as written**
(house pattern); this document is the correction and the row should take a pointer to it.
**ACTOR:** unknown — the estimate predates this session and is not attributed by the record.
**FAILURE CLASS:** a figure attributed to a directory without measuring the directory — the same
class as the `109`-line correction of `#117` and the *"three weeks"* correction of batch 72.
**WHAT CHANGED:** nothing yet. **The row is still OPEN and answering it as written would free about
seven kilobytes.** **This matters practically: `WS-P2` is the row anyone would reach for to solve
exactly the problem in §1, and it is the wrong lever.**

**ONE TRACKED PDF DOES EXIST AND IT IS SOMEWHERE ELSE:** `docs/reference/CR3-code-sheet-2023.pdf`,
**268,359 bytes ≈ 78K tokens ≈ 3.9% of the budget** — §3 row 3.

---

## §3 — WHERE THE WEIGHT IS (top of the synced scope, measured)

| # | file | bytes | ≈ tokens | ≈ % of 2M budget |
|---|---|---|---|---|
| 1 | `docs/specs/session-log.md` | 1,421,039 | ~410K | **~21%** |
| 2 | `docs/specs/attorney-review-queue.md` | 610,133 | ~176K | **~9%** |
| 3 | `docs/reference/CR3-code-sheet-2023.pdf` | 268,359 | ~78K | ~3.9% |
| 4 | `docs/specs/pi-case-playbooks.md` | 227,273 | ~66K | ~3.3% |
| 5 | `docs/specs/session-log-toc.md` | 127,880 | ~37K | ~1.8% |
| 6 | `docs/specs/BUILD-STATE.md` | 109,843 | ~32K | ~1.6% |

**The top two are ~30% of the entire budget between them. `docs/specs/` as a directory is
5,478,242 bytes — 88% of the synced scope.**

---

## §4 — THE LEVERS, SPLIT BY WHOSE ACT THEY ARE

**THE CENTRAL MECHANICAL FACT, AND IT DECIDES THE SHAPE OF ANY FIX: moving content to another file
inside `docs/` SAVES NOTHING — it is still synced. A saving requires an EXCLUSION IN THE SYNC
PICKER, which is Michael's hand in the Claude project UI and which no code push can perform.**
So the real fix is a **pair of acts**, and neither works alone.

### §4.1 — MICHAEL'S HAND ALONE, available immediately, no code, no risk

- **Exclude `/docs/reference/` in the sync picker.** Frees **~78K tokens, ~3.9%** — roughly half a
  day of runway — at the cost of a **scanned** CR3 code sheet leaving RAG, where a scanned page
  image was never retrievable prose anyway. **This is the fastest available win and it needs
  nothing from Code.**
- **Prune stale `claude/` session captures** from project knowledge. They are RAW CAPTURE, reference
  only, never routed to the repo — **seventeen are currently filed.** Size not measured from the
  design side; named as a lever, not quantified.

### §4.2 — THE PAIR: a Code act that only pays off with a picker change

**PROPOSED, NOT RULED — and it touches an APPEND-ONLY canonical file, so it needs Michael's
explicit word.** Split `session-log.md`: entries older than a cutoff move **verbatim** to
`docs/archive/session-log-archive-<range>.md`; `session-log.md` keeps the preamble, the recent
entries, and a pointer stanza naming the archive; `session-log-toc.md` regenerates over **both** so
the index still covers all 256 entries. **Then Michael adds `/docs/archive/` to the picker.**

**The log's own header already sanctions this:** *"Do not let this file grow unbounded — if it gets
long, consider archiving older entries to a dated sub-file and keeping only the most recent months
here."*

**MEASURED OPTIONS — pick a cutoff (keep entries dated ON OR AFTER):**

| cutoff | entries kept | archived | `session-log.md` becomes | freed | ≈ % of budget |
|---|---|---|---|---|---|
| 2026-08-19 | 24 | 232 | 236,070 B | 1,172,470 B | **16.9%** |
| 2026-08-18 | 43 | 213 | 390,710 B | 1,017,830 B | **14.7%** |
| **2026-08-16** | **72** | **184** | **634,644 B** | **773,896 B** | **11.2%** |
| **2026-08-13** | **114** | **142** | **866,414 B** | **542,126 B** | **7.8%** |
| 2026-08-11 | 146 | 110 | 992,787 B | 415,753 B | 6.0% |
| 2026-08-07 | 164 | 92 | 1,074,570 B | 333,970 B | 4.8% |

**PROPOSED: 2026-08-13.** It keeps **114 entries** — the whole of the active gate-10, queue-runner
and FABLE-adjudication history that current work actually cites — and 08-13 is a real convention
watershed (instructions v17: SAT-1, Descrybe-out, H5, the §7.2 routing clause). **2026-08-16 is the
more aggressive defensible option** if runway matters more than reach. **2026-08-19 is not
recommended**: 24 entries is thinner than the work in flight reaches back.

**WHAT THE SPLIT COSTS, stated rather than buried.** Archived entries leave RAG. **A design session
WITH the bridge loses nothing** — it reads the archive at HEAD as a file, which is how this session
read everything tonight. **A session WITHOUT the bridge loses reach into older history** and must
work from the TOC plus Michael. **That is a real trade and it is his to make.** *(There is a
second-order gain the capacity number does not show: the instructions' own note is that the true
cost of oversized knowledge is **silent retrieval dilution**, not lockout. Cutting 184 stale entries
out of RAG should make retrieval over the remaining ones better, not merely cheaper.)*

### §4.3 — Not proposed, named so the choice is visible

- **`attorney-review-queue.md` (~9%).** Closed rows could archive the same way — **but QR-1's whole
  point is that full question text lives there**, and the file is the register of record. **Higher
  risk, lower yield than §4.2. Not proposed tonight.**
- **Excluding `docs/specs/` wholesale.** Would free most of the budget and would gut the design
  side's only view of the repo. **Named to be rejected, not considered.**

---

## §5 — OPEN QUESTIONS

- **`Q-CAP-1`** — **Does `session-log.md` split, and at what cutoff?** §4.2's table is the decision.
  **An append-only canonical file; Michael's word, and Code executes on it.**
- **`Q-CAP-2`** — **Does `/docs/reference/` leave the sync picker?** §4.1. His hand, no code, ~3.9%.
- **`Q-CAP-3`** — **Does `/docs/archive/` get added to the picker?** Only meaningful if `Q-CAP-1` is
  yes; **without it the split frees nothing.** The two must be ruled together or the work is wasted.
- **`Q-CAP-4`** — **What happens to `WS-P2`?** §2 corrects its premise. Close it as moot, or
  re-scope it to the one tracked PDF (`Q-CAP-2`'s subject). **His call; nothing here closes a row.**
- **`Q-CAP-5`** — **Is there a standing policy?** At the current rate this recurs within weeks.
  Options: a size tripwire in the runner's close-out; a scheduled archive cadence; or accept and
  re-measure. **Not proposed — raised because a one-off fix here buys days, not a solution.**
