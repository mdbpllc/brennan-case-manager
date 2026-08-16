# QUEUE-RUNNER Step 1 audit — findings for a ruling pass

**PROPOSED — PROCESS FINDINGS ONLY. NOTHING RULED, NOTHING BUILT, NOTHING AUTHORIZED.**

Authored 2026-08-16 by the **forty-fourth** queue-runner invocation (Claude Code, Opus 5),
at HEAD `ab3a61d`, **before** that batch executed. Michael confirmed the queue order, MM-1
concurrency, and the §8.1 lock deletion; he ruled nothing in this document.

**Why this file exists.** Michael asked that the audit be saved for a Fable 5 session. It is
here because the design side cannot read chat and cannot read `src/` — a finding that lives
only in a session report never reaches the ruling seat. **Six of these are convention
questions in the `QR-` class and are Michael's alone.** None was acted on beyond the two
places the runner was already obliged to act.

---

## 1. What was audited, and why it was not taken on trust

The runner's Step 1 ends in a hard STOP for Michael's confirmation. The first pass produced a
five-claim inventory report. Rather than proceed on it, five independent read-only auditors
re-derived it from the repo: one on carry-forward obligations, one on the packet's routing
table, one on literal Step 0/Step 1 compliance, one tasked adversarially with **refuting** the
absence claim, and a completeness critic over all four. 65 findings, 23 non-confirmed.

**The go/no-go conclusion survived unchanged.** What did not survive was the *evidence* for it.
That distinction is the point of the exercise and is the reason this file is worth a read.

### 1.1 Two claims that were right for the wrong reason

- **The checkout gate.** The report cited `git rev-parse origin/master`. That reads the **local
  remote-tracking ref**, which is only as fresh as the last fetch — it cannot distinguish
  "origin is here" from "origin was here whenever we last looked." Re-grounded on a live
  `git ls-remote origin master` → `ab3a61d`. The gate genuinely passes. **This is the exact
  blind spot QR-5 was ruled to close**, reappearing one invocation later in the verification
  rather than in the close-out.
- **The already-executed check.** The report's evidence included `git log --grep`, which
  searches **commit messages, not paths** — it could never have found the file and proved
  nothing. Re-grounded on all-history path scans, dangling-commit checks, and verbatim
  content greps for the memo's own headings. Absence confirmed, and **positively
  corroborated**: the log lists Task 15 as the next unstarted task.

### 1.2 The generalizable lesson

Both failures share one shape: **a check whose output looks like confirmation but whose
mechanism cannot produce a disconfirmation.** A stale tracking ref returns a plausible SHA
whether or not it fetched; a message-grep returns empty whether or not the path exists. Neither
can fail in a way that announces itself.

**Proposed as a candidate convention, NOT ruled — `QR-6(a)`:** where a runner step states a
verification, it names the command that produced it, and a command that cannot distinguish
"absent" from "not looked for" does not count as one.

---

## 2. Findings against this packet, all reported and none repaired

The Task 15 packet's §6 item 14 and §4.1 both bind the K-6/K-7 rule — *report it, change
nothing*. Each of these was reported and left as written.

1. **`§4.1` names a source path that does not exist in the packet.** It reads
   `docs/specs/communications-log-ingest-research-2026-08-16.md` as the *source file in packet*;
   the zip is **flat** and has no `docs/specs/` tree. A runner scripting the copy from that path
   hits file-not-found. The runner copied from the real flat path and reported the defect.
   Same class as #81's title-less FE-5 spec.
2. **`§7`'s table does not carry the full question text QR-1 requires** — and says so itself:
   *"The full text of each is in the memo's §11 and §12; carry it, not the label."* A runner
   merging §7 verbatim would have destroyed twenty-one questions, **the precise failure that
   retired K-6/K-7**. The merge was sourced from the memo's §11, §12 and §9.1 instead.
3. **The item count in `§0` and `§3` understates the merge.** Both say *"twelve questions and
   four looks"* — sixteen. Row 17 of §7 collapses `P-COM-1..5` into one label, so the true
   merge is **twenty-one items**. Not a defect in the memo; a defect in the packet's own
   summary of it.
4. **The memo's five `session-log.md:` line cites go stale on insertion.** They were verified
   accurate at `ab3a61d` and are wrong the moment the `#89` entry is prepended to that same
   file — **true when written, false when committed**, structurally identical to the QR-5
   defect. Proven empirically rather than asserted: #88 cites `session-log.md:7170` for
   "out-of-area matters"; the phrase now sits at **7404**, off by exactly the 234 lines #88's
   own commit added. Two further prior self-cites are already stale on the same mechanism.
   **Reported, not repaired** — §6 item 14 forbids the repair, and the repair is arguably
   worse than the drift.

---

## 3. Process gaps the runner text does not currently cover

**All six are PROPOSED. Michael's, one at a time.**

- **`QR-6(a)` — verification names its command.** §1.2 above.
- **`QR-6(b)` — the queue merge is TWO acts, and the second is undocumented.**
  `attorney-review-queue.md`'s Status header carries a per-batch *"Reconciled again to
  session-log #NN"* sentence and closes *"keep it current or the pointer lies."* Runner Step 4
  item 2 and the packet's §8 item 2 both mention only the row merge. **The omission has already
  happened once and is recorded inside that same header** — the #84 sentence was missing while
  its rows landed normally. Should the header sentence be named in the runner text?
- **`QR-6(c)` — the allowlisted deletion is a glob, and Step 1's STOP is an open window.**
  `Bash(rm -f inbox/*)` destroys anything in `inbox/`, and the STOP can last hours. **A packet
  was in fact swapped mid-STOP one invocation ago.** This batch deleted by explicit filename
  (the allowlist still matches) and pinned the packet's identity first — 37,195 bytes, mtime
  `2026-08-16 14:38:58`, sha256 `eb0e2981ca43651d4710a05ddf3ff922eed83fc127be0752c1311fa70584382a`.
  Should delete-by-name and identity-pinning become the rule?
- **`QR-6(d)` — the only v8-compliant format model is the forty-third entry.** The forty-first
  and forty-second both close with *"Packet deleted after execution per Step 4.5,"* which v8
  Step 4 item 1 now bans in terms. A runner copying a recent entry as a template has **two
  chances in three of reproducing the banned sentence**. Should the runner name its own format
  exemplar?
- **`QR-6(e)` — a packet may request acts outside the runner's checklist.** This packet's §8.1
  asked for a deletion inside `.git/`, which appears in **no routing-table row and no Step 4
  item**. It was inert and authorized here by Michael in-session. Should packet-added acts be
  named as requiring in-session authorization?
- **`QR-6(f)` — the health-check gate on a docs-only batch.** CLAUDE.md standing instruction is
  `npm test` + `npm run build` + `npm run lint` before ending a session. §5 was NONE and no
  `src/` or build-tooling path was routed, so the gate proves nothing here. **Stated rather
  than silently skipped**, which is the whole of the proposal: should a docs-only batch record
  the skip explicitly?

---

## 4. One auditor claim corrected, recorded because the correction is the useful part

An auditor framed the stale `.git/index.lock.claude-stale-2026-08-16` as a **live hazard
blocking git**. It was not. Git blocks only on the literal `.git/index.lock`, which did not
exist, and `.git/index` had an mtime four minutes **after** the rename — proving
index-modifying commands were already running fine. The disclosure was right; the hazard
framing was wrong, and it would have justified a `.git/` mutation on a false premise.

A second auditor proposed that this batch's runner line report whether the forty-third
invocation's *second* deletion prompted for permission. **Downgraded and not asserted:** the
outcome is verifiable (the zip is absent), but whether a prompt fired in a prior session is
not recoverable from the repo, and asserting an unobservable prior-session event is the same
class of unchecked claim QR-5 exists to prevent.

**Both corrections point the same way:** an adversarial pass produces false positives too, and
the ones that survive are the ones with quoted evidence attached.

---

## 5. What this audit did NOT do

- **Ruled nothing.** `QR-6(a)`–`(f)` are proposals; the runner text was not edited.
- **Repaired nothing in the packet** — the §4.1 path defect, the §0/§3 count, and the stale
  line cites were all reported and left as written, per §6 item 14.
- **Touched no registry file, no schema file, and no `src/`.**
- **Did not re-run the batch's own work** — this is a check on the Step 1 report, not a second
  execution.
