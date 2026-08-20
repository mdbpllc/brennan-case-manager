# `anon` / `ALTER DEFAULT PRIVILEGES` falsehood-family re-sweep — verification record

**Status: PROPOSED — verification record, ONE RUN, not a living document.** It is dated on its face
and is not to be updated in place; a later sweep gets a later file.
**It repairs nothing, adjudicates nothing, and authorizes nothing.**
**Canonical repo path:** `docs/specs/anon-adp-sweep-verification-2026-08-19.md`
**Produced by:** Claude Code (Opus 5) on `mdb-pllc`, CODE-DISPATCH v4 task **C1**, 2026-08-19 Central
(DT-1: Central clock read 20:33 before any stamp; the shell's UTC date was 2026-08-20 and was NOT used).
**Repo state at the sweep:** HEAD `20d1a0f`, equal to `origin/master` by live `git ls-remote`,
working tree clean, branch `master`, `inbox/` empty.

---

## 0. The verdict, in one line

**THREE carriers, not one.** The expected one — `src/components/RlsProbePanel.tsx`:73, knowingly left
behind `G10-5` — plus **two previously unlisted family-(b) carriers**:
`docs/spec-feedback.md`:591 and `docs/specs/attorney-review-queue.md`:793.
**Neither was repaired. Both are reported for your routing.**

---

## 1. Why this sweep exists

The `anon` / ADP repair inventory has now missed a site **twice**, each time because the pattern was
narrower than the text:

1. **The wrap trap.** A line-anchored grep cannot span a phrase broken across a line break. It
   under-counted `ALTER DEFAULT PRIVILEGES` at five when the true figure was six
   (`db/schema.sql`:504–505), and under-counted the `anon` family at 15/12 against a true 16/13.
2. **The emphasis trap.** `fe-4` writes the phrase as `is **not** set`, with the emphasis *inside*
   the phrase, so no pattern that treats the words as adjacent could reach it. It was found only on
   an emphasis-stripped re-sweep, as a **fifth** carrier after the first four had been called
   complete.

This sweep was built to defeat both at once, over the whole tracked tree including `src/`, and to
settle by reading — not by pattern — whether the repair set is complete.

---

## 2. The matching definition — exactly what was run

Every tracked file was read as bytes, decoded UTF-8, and **normalized** before any match:

| Step | Rule | The trap it defeats |
|---|---|---|
| 1 | Delete every `*`, `_` and backtick | emphasis inside the phrase (`is **not** set`) |
| 2 | Collapse every run of whitespace — spaces, tabs, **newlines** — to a single space | wrap across a line break |
| 3 | Lowercase | case variance |

Matching then ran over that single normalized string per file, so a phrase split across two lines and
a phrase split by emphasis markers are both contiguous by the time the pattern sees them.

- **Family (a):** anchor `anon`, co-terms `nothing` / `widen`, **gap ≤ 120 characters**.
- **Family (b):** anchor `alter default privileges`, co-terms `not set` / `unset` / `stays unset` /
  `never set` / `deliberately`, **gap ≤ 200 characters**.

**"Gap" is edge-to-edge**, not centre-to-centre: the count of normalized characters between the end
of the earlier span and the start of the later one, zero if they overlap. Edge-to-edge is the more
inclusive of the two measures for a long anchor, and the anchor here is 24 characters.

Each hit reports the **closest** qualifying co-term. Line numbers are the anchor's line in the
**original** file, recovered through an index map from the normalized offset — the normalization is
for matching only, never for citing.

---

## 3. Coverage

- **313 tracked files** enumerated with `git ls-files`. **`src/` was read** — a Code-session
  privilege the design side does not have.
- **2 skipped, both binary and both named:** `docs/reference/CR3-code-sheet-2023.pdf`,
  `src/assets/hero.png`. No text file was skipped; nothing was sampled; nothing was truncated.
- Untracked and ignored paths (`inbox/`, `node_modules/`, `.env`) were **not** read. `inbox/` was
  empty at session start.

---

## 4. The tally

**116 hits: 89 family (a), 27 family (b).**

| Verdict | Count | Meaning |
|---|---:|---|
| **CARRIER** | **3** | still asserts a falsehood |
| ANNOTATED | 11 | a run migration's original comment, standing above its dated correction block |
| RETRACTION / CORRECTION | 41 | quotes the sentence in order to deny it, or states the true fact in place — **never to be "fixed"** |
| FROZEN | 21 | append-only history (the session log; carried external output) — 17 of them deny, 4 assert |
| FALSE POSITIVE | 40 | 36 are the substring `anon` inside **`canonical`**; 4 are the `anon` **key** or a true abstention statement |

Split by family: family (a) = 1 carrier, 6 annotated, 27 retraction/correction, 16 frozen, 39 false
positive. Family (b) = 2 carriers, 5 annotated, 14 retraction/correction, 5 frozen, 1 false positive.

---

## 5. The three carriers

### 5.1 `src/components/RlsProbePanel.tsx`:73 — EXPECTED, and confirmed present

Renders on a signed-out probe run:

> ` (Signed out, this is also the expected result: anon is granted nothing by design.)`

Deliberately left. Repairing it is a build act and it is item 6 of
`docs/specs/gate10-pii-frontend-slice.md`'s checklist, behind `G10-5`. **Nothing here touches it.**

**But see §6.3 — the same paragraph carries a second false sentence that item 6 does not name.**

### 5.2 `docs/spec-feedback.md`:591 — NEW. Never in any inventory, and the wrap trap is why

In the **2026-07-28** entry, consequence 2:

> `ALTER DEFAULT PRIVILEGES` was deliberately NOT set, because silently exposing future tables is
> exactly the posture this project rejected.

Same fused shape as every site repaired on 2026-08-19: **true** as a statement of this project's own
conduct, **false** as a statement about the database, where Supabase's bootstrap set a default before
this project's first table existed.

**Why no inventory ever listed it.** The phrase **wraps across the 591/592 line break** — the file
reads `` `ALTER DEFAULT `` at the end of 591 and `` PRIVILEGES` `` at the start of 592. A
line-anchored, case-insensitive grep for the phrase in this file returns **four** hits (828, 838,
906, 915) and **does not return 591 at all.** The wrap trap, firing a third time, on the one file
whose own 2026-08-19 entry documents the wrap trap.

**A second reason it could hide.** BUILD-STATE puts this file in the retraction class **by filename**:

> The retraction class is NOT counted and must never be "fixed": `spec-feedback.md`, this file, the
> gate 10 run entry, the TOC row and every conformance note above quote the sentence in order to deny
> it, and the log's entries are append-only.

That is true of the file's **2026-08-19** entry and false of its **2026-07-28** entry, which asserts.
**A file-level exemption cannot be trusted where a file holds passages of both kinds** — and this
file holds both, 237 lines apart.

**One thing this sweep does not decide:** whether `docs/spec-feedback.md`'s dated entries are
append-only history (which would make this FROZEN, like the log) or an editable working file (which
would make it repairable). CLAUDE.md states no freeze convention for it, and the file is
chronologically mixed rather than strictly prepended. **That is a routing question and it is yours.**

### 5.3 `docs/specs/attorney-review-queue.md`:793 — NEW. The repaired sentence's unrepaired twin

Queue row `Q-RE-3`, clause (b):

> (b) A new table — which under `ALTER DEFAULT PRIVILEGES` being unset must carry its own GRANT, and
> which would be the schema's first money-adjacent structure.

**The identical sentence in its source memo was repaired on 2026-08-19.**
`docs/specs/re-1-referral-engine-inputs-2026-08-16.md`:726 now reads:

> (b) A new table — which must carry its own GRANT because the vendor's default ACL withholds the four
> DML privileges (C-2 as RESTATED 2026-08-19; conformed here from "under `ALTER DEFAULT PRIVILEGES`
> being unset"), and which would be the schema's first money-adjacent structure.

The memo's own conformance note **quotes verbatim the phrase that still stands in the queue.** The
queue row is not a summary — it is the memo's question copied in full under QR-1, because the packet
was deleted and the row is the only place the question lives. **Repairing one copy of a duplicated
sentence and not the other is the durable lesson here**, and it is a different failure mode from
either the wrap trap or the emphasis trap: not a pattern that was too narrow, but a **routing table
that named the file the text came from and not the file it had been copied into.**

---

## 6. Three findings that are not carriers

### 6.1 BUILD-STATE carries a stale claim about this very repair — and it is false at HEAD

`docs/specs/BUILD-STATE.md`, in the `PR-3 · QBO MEMO · RE-1 MEMO` bullet:

> *(Both memos also carry the falsified ADP claim — three sites between them, in no routing row, NOT repaired.)*

**Both memos WERE repaired**, in commit `20d1a0f`, at exactly those three sites — `qbo-integration-research-memo`
(1) and `re-1-referral-engine-inputs` (2). That commit edited **two** BUILD-STATE lines (the
`anon gets nothing` repair bullet and the FE-4/5/6 bullet) and left this parenthetical untouched.

This matters more than an ordinary staleness: under the 2026-07-26 sync scope, `src/` does not reach
the design space, so **BUILD-STATE is the design side's sole authority on what is built.** A design
session reading it today is told that two repairs which have landed have not.
**Not corrected here** — this chain repairs nothing, and a BUILD-STATE change is a full rewrite under
the 150-non-blank cap. **Flagged for your instruction.**
*(Related and also not acted on: BUILD-STATE's header still reads `Commit: f5e4ab4 (session start)`,
and it was last changed by a targeted two-line edit rather than the full rewrite the convention asks
for.)*

### 6.2 The grok record's annotation names an item ID, not every line carrying it

`docs/specs/grok-external-review-2026-08-18.md` is carried external output and is expressly not
edited; its appended annotation falsifies **"§3 item 9 (C-2)'s factual premise."** The CHALLENGES
section at :287 carries the same claim in the reviewer's own compressed words
(`C-2 ALTER DEFAULT PRIVILEGES unset forever`), 186 lines above the annotation. A reader landing in
CHALLENGES has no local pointer to the falsification. **Classified FROZEN, not carrier** — it is a
record of what an outside reviewer wrote, and editing it would destroy the thing it is for.
Recorded only so the annotation's reach is known rather than assumed.

### 6.3 The `src/` carrier's paragraph holds a second false sentence, and item 6 names only the first

The signed-out clause at :73 is appended to a `<p>` that already reads, at :70–71:

> The role has no SQL privilege on these tables.

That is false in the same way and by the same catalog read: `anon` holds `TRUNCATE`, `REFERENCES`,
`TRIGGER` and `MAINTAIN` on all 37 tables. It is **out of pattern for both families** — no co-term
within range — so no `anon`-anchored sweep of this shape will ever return it.
`gate10-pii-frontend-slice.md` item 6 specifies replacing the :73 sentence only. **As written, the
G10-5 build would repair one false sentence and leave the other one two lines above it, in the same
rendered paragraph.** Reported, not repaired: `src/` edits are a build act.

---

## 7. The full classified table

Every one of the 116 hits, classified **by reading**. Sites are cited `file:line`; the log and this
file's other prepending/rewritten neighbours are cited by heading in prose per #94, and line numbers
appear here only as sweep output for a dated, single-run record.

### 7.1 Family (a) - real-`anon` anchors (53 of 89)

| ID | Site | co-term (gap) | Verdict | Why - read, not pattern-matched |
|---|---|---|---|---|
| A01 | `db/migrations/2026-07-28-api-role-grants.sql`:23 | nothing (25) | ANNOTATED | Original grants-file comment. Correction block at :37. |
| A02 | `db/migrations/2026-07-28-api-role-grants.sql`:37 | nothing (25) | CORRECTION | Appended correction block quoting the comment above. |
| A03 | `db/migrations/2026-07-28-cl2-client-dimension.sql`:116 | nothing (6) | ANNOTATED | Original CL-2 comment. Correction block at :257. |
| A04 | `db/migrations/2026-07-28-cl2-client-dimension.sql`:257 | nothing (6) | CORRECTION | Appended correction block. |
| A05 | `db/migrations/2026-08-12-cd1-contact-directory.sql`:215 | nothing (6) | ANNOTATED | Original CD-1 comment. Correction block at :254. |
| A06 | `db/migrations/2026-08-12-cd1-contact-directory.sql`:254 | nothing (6) | CORRECTION | Appended correction block. |
| A07 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:356 | nothing (6) | ANNOTATED | Original gate 10 comment. Correction block at :461. |
| A08 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:403 | nothing (5) | ANNOTATED | Check-4 label ("`anon` has nothing on it"). The correction block at :462 names this label expressly and scopes it to the four DML privileges. |
| A09 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:404 | nothing (80) | ANNOTATED | Second anchor in the same check-4 block; same disposition as A08. |
| A10 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:461 | nothing (6) | CORRECTION | Appended correction block. |
| A11 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:462 | nothing (5) | CORRECTION | Same block, second anchor. |
| A12 | `db/schema.sql`:511 | nothing (1) | CORRECTION | Conformed in place: the claim is scoped to what *this file* grants, and the surviving database sentence follows in the same comment. |
| A13 | `db/schema.sql`:512 | nothing (87) | CORRECTION | Same comment, second anchor ("Do not widen it" follows the true statement). |
| A14 | `db/schema.sql`:1188 | nothing (1) | CORRECTION | Conformed in place - "Stated precisely (2026-08-19 catalog read)" follows immediately. |
| A15 | `docs/prompts/PROMPT-gate10-pii-build-session.md`:121 | widen (1) | CORRECTION | Kickoff prompt, conformed 2026-08-19; quotes the falsified original. |
| A16 | `docs/spec-feedback.md`:759 | nothing (61) | RETRACTION | The 2026-08-19 finding entry - quotes the sentence in order to deny it. |
| A17 | `docs/spec-feedback.md`:801 | nothing (60) | RETRACTION | Same entry, the "writes nothing would be false" limb. |
| A18 | `docs/spec-feedback.md`:811 | nothing (6) | RETRACTION | Same entry, the record-damage inventory. |
| A19 | `docs/spec-feedback.md`:822 | nothing (1) | RETRACTION | Same entry, the "true in the sense each file meant it" limb. |
| A20 | `docs/specs/BUILD-STATE.md`:76 | nothing (93) | RETRACTION | BUILD-STATE data-layer paragraph - states the true catalog reading. |
| A21 | `docs/specs/BUILD-STATE.md`:76 | nothing (99) | RETRACTION | Same paragraph, second anchor. |
| A22 | `docs/specs/BUILD-STATE.md`:77 | nothing (6) | RETRACTION | BUILD-STATE repair-status bullet. |
| A23 | `docs/specs/BUILD-STATE.md`:88 | nothing (12) | RETRACTION | BUILD-STATE RLS section - names the `src/` carrier as still standing. |
| A24 | `docs/specs/gate10-pii-frontend-slice.md`:42 | nothing (12) | RETRACTION | Front-end slice list naming the `src/` carrier by file and line. |
| A25 | `docs/specs/gate10-pii-frontend-slice.md`:139 | nothing (96) | RETRACTION | Front-end slice checklist item 6 - the adopted replacement wording. |
| A26 | `docs/specs/gate10-pii-slice.md`:176 | nothing (58) | CORRECTION | Conformed 2026-08-19; the true sentence, with the old wording quoted after it. |
| A27 | `docs/specs/gate10-pii-slice.md`:177 | nothing (6) | CORRECTION | Same conformance note, second anchor. |
| A28 | `docs/specs/gate10-pii-slice.md`:178 | nothing (75) | CORRECTION | Same conformance note, third anchor. |
| A29 | `docs/specs/grok-external-review-2026-08-18.md`:201 | nothing (97) | FALSE POSITIVE | Reads ".env carries only the project url and anon key" - the API key, not the role privileges. |
| A30 | `docs/specs/operational-blockers-capture-2026-07-26.md`:39 | nothing (89) | FALSE POSITIVE | anon-key plus authenticated-only RLS reachability statement (2026-07-26 capture). Different claim, different family. |
| A31 | `docs/specs/session-log-toc.md`:188 | nothing (8) | RETRACTION | TOC row for #116 - records the finding. |
| A32 | `docs/specs/session-log-toc.md`:188 | nothing (74) | RETRACTION | Same row, second anchor. |
| A33 | `docs/specs/session-log-toc.md`:188 | nothing (6) | RETRACTION | Same row: quotes "`anon` gets nothing, by design" expressly to say it is false as written. |
| A34 | `docs/specs/session-log-toc.md`:188 | nothing (91) | RETRACTION | Same row, fourth anchor. |
| A35 | `docs/specs/session-log.md`:70 | nothing (5) | FROZEN (denies) | 2026-08-19 runner entry - the sweep-count discussion. |
| A36 | `docs/specs/session-log.md`:149 | nothing (90) | FROZEN (denies) | 2026-08-19 gate 10 entry - the query that settled it. |
| A37 | `docs/specs/session-log.md`:149 | nothing (8) | FROZEN (denies) | Same entry, second anchor. |
| A38 | `docs/specs/session-log.md`:150 | nothing (109) | FROZEN (denies) | Same entry - the wider query finding. |
| A39 | `docs/specs/session-log.md`:150 | nothing (1) | FROZEN (denies) | Same entry - "the migration granted `anon` nothing", true of the migration. |
| A40 | `docs/specs/session-log.md`:151 | nothing (59) | FROZEN (denies) | Same entry - the "writes nothing would be false" limb. |
| A41 | `docs/specs/session-log.md`:152 | nothing (6) | FROZEN (denies) | Same entry - the 16-across-13 inventory. |
| A42 | `docs/specs/session-log.md`:152 | widen (35) | FROZEN (denies) | Same entry - the retracted "reached by no anon-anchored pattern" claim. |
| A43 | `docs/specs/session-log.md`:152 | widen (1) | FROZEN (denies) | Same entry, the quoted variant inside that retraction. |
| A44 | `docs/specs/session-log.md`:152 | nothing (53) | FROZEN (denies) | Same entry, same retraction. |
| A45 | `docs/specs/session-log.md`:152 | nothing (1) | FROZEN (denies) | Same entry - "the project grants `anon` nothing" limb. |
| A46 | `docs/specs/session-log.md`:152 | nothing (90) | FROZEN (denies) | Same entry - the surviving sentence. |
| A47 | `docs/specs/session-log.md`:169 | nothing (6) | FROZEN (denies) | 2026-08-19 entry describing the gate 10 migration; scoped to this project grants. |
| A48 | `docs/specs/session-log.md`:184 | widen (5) | FROZEN (denies) | 2026-08-19 entry - "`anon` not widened", a statement about what the slice did. |
| A49 | `docs/specs/session-log.md`:766 | nothing (83) | FROZEN (denies) | Log entry on the Postgres-version gate; ".env carries only URL and anon key". |
| A50 | `docs/specs/session-log.md`:9378 | nothing (6) | FROZEN (asserts) | 2026-07-28 entry. Asserts the falsehood; append-only by rule, never repaired. |
| A51 | `docs/specs/session-log.md`:10047 | nothing (78) | FALSE POSITIVE | anon-key deployment-sequencing entry. Different claim. |
| A52 | `docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md`:745 | nothing (6) | CORRECTION | Dated conformance note quoting the falsified BUILD-STATE snapshot. |
| A53 | `src/components/RlsProbePanel.tsx`:73 | nothing (12) | **CARRIER** | **The known, deliberately-unrepaired site.** Renders `anon is granted nothing by design.` to the screen on a signed-out probe run. Repairing it is a build act; it is item 6 of the front-end slice checklist, behind `G10-5`. |

### 7.2 Family (a) - FALSE POSITIVE class: the anchor is `canonical` (36 of 89)

Every row below matched because the literal `anon` is a substring of **`canonical`** (also `canonical-path`, `spec-canonical`). None concerns the database role. Listed in full so the count reconciles and so the next sweep is not surprised by them:

- `docs/prompts/CHAT-DISPATCH-v3.md`:93 - anchor word `canonical`
- `docs/spec-feedback.md`:273 - anchor word `canonical`
- `docs/spec-feedback.md`:824 - anchor word `canonical`
- `docs/spec-feedback.md`:923 - anchor word `canonical`
- `docs/specs/attorney-review-queue.md`:727 - anchor word `canonical`
- `docs/specs/attorney-review-queue.md`:888 - anchor word `canonical-path`
- `docs/specs/attorney-review-queue.md`:888 - anchor word `canonical`
- `docs/specs/attorney-review-queue.md`:905 - anchor word `canonical`
- `docs/specs/case-heartbeat-design.md`:5 - anchor word `canonical`
- `docs/specs/communications-log-ingest-research-2026-08-16.md`:5 - anchor word `canonical`
- `docs/specs/communications-log-ingest-research-2026-08-16.md`:501 - anchor word `canonical`
- `docs/specs/fe-4-definitions-sets-spec-2026-08-15.md`:7 - anchor word `canonical`
- `docs/specs/go-live-runbook.md`:4 - anchor word `canonical`
- `docs/specs/in-1-answer-mining-spec-2026-08-15.md`:7 - anchor word `canonical`
- `docs/specs/in-3-held-sets-service-triggers-spec-2026-08-15.md`:7 - anchor word `canonical`
- `docs/specs/operational-blockers-capture-2026-07-26.md`:9 - anchor word `canonical`
- `docs/specs/privilege-tier-unified-vocabulary-proposal-2026-08-17.md`:3 - anchor word `canonical`
- `docs/specs/qbo-integration-research-memo-2026-08-15.md`:4 - anchor word `canonical`
- `docs/specs/re-1-referral-engine-inputs-2026-08-16.md`:4 - anchor word `canonical`
- `docs/specs/record-integrity-audit-2026-08-15.md`:4 - anchor word `canonical`
- `docs/specs/registry-verification-workbook-2026-08-13.md`:32 - anchor word `canonical`
- `docs/specs/session-log.md`:78 - anchor word `canonical`
- `docs/specs/session-log.md`:152 - anchor word `canonical`
- `docs/specs/session-log.md`:199 - anchor word `canonical`
- `docs/specs/session-log.md`:3529 - anchor word `canonical-path`
- `docs/specs/session-log.md`:5180 - anchor word `canonical`
- `docs/specs/session-log.md`:6824 - anchor word `spec-canonical`
- `docs/specs/session-log.md`:7766 - anchor word `canonical`
- `docs/specs/session-log.md`:7925 - anchor word `canonical`
- `docs/specs/session-log.md`:8049 - anchor word `canonical`
- `docs/specs/session-log.md`:9104 - anchor word `canonical`
- `docs/specs/session-log.md`:11257 - anchor word `canonical`
- `docs/specs/session-log.md`:11391 - anchor word `canonical`
- `docs/specs/session-log.md`:11480 - anchor word `canonical`
- `docs/specs/session-log.md`:12046 - anchor word `canonical`
- `docs/specs/ws3-privilege-authority-read-2026-08-17.md`:7 - anchor word `canonical`

### 7.3 Family (b) - all 27 hits

| ID | Site | co-term (gap) | Verdict | Why - read, not pattern-matched |
|---|---|---|---|---|
| b01 | `db/migrations/2026-07-28-cl2-client-dimension.sql`:113 | deliberately (1) | ANNOTATED | Original migration comment (`ALTER DEFAULT PRIVILEGES deliberately unset`). Its dated correction block stands below at :256. This file ran; the original is the record of the text that ran. |
| b02 | `db/migrations/2026-07-28-cl2-client-dimension.sql`:256 | deliberately (1) | CORRECTION | The appended 2026-08-19 correction block. Quotes the comment above in order to deny it. |
| b03 | `db/migrations/2026-08-12-cd1-contact-directory.sql`:214 | not set (4) | ANNOTATED | Original CD-1 comment. Correction block at :253. |
| b04 | `db/migrations/2026-08-12-cd1-contact-directory.sql`:253 | not set (4) | CORRECTION | The appended correction block; names the false half and the true half separately. |
| b05 | `db/migrations/2026-08-18-grok-review-fixes.sql`:181 | stays unset (1) | ANNOTATED | Original grok-fixes comment (C-2 posture, ruling 9). Correction block at :264. |
| b06 | `db/migrations/2026-08-18-grok-review-fixes.sql`:264 | stays unset (1) | CORRECTION | The appended correction block. |
| b07 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:353 | not set (4) | ANNOTATED | Original gate 10 comment. Correction block at :460. |
| b08 | `db/migrations/2026-08-19-gate10-pii-columns.sql`:460 | not set (4) | CORRECTION | The appended correction block; also scopes the check-4 label. |
| b09 | `docs/spec-feedback.md`:591 | deliberately (5) | **CARRIER** | **Live, unannotated assertion** in the 2026-07-28 entry. False as a database statement. In no repair inventory, and invisible to a line-anchored grep because the phrase wraps across the 591/592 break. |
| b10 | `docs/spec-feedback.md`:828 | stays unset (1) | RETRACTION | The 2026-08-19 entry quotes the C-2 ruling in order to falsify it. |
| b11 | `docs/specs/attorney-review-queue.md`:391 | stays unset (1) | RETRACTION | Queue row `O-13` quotes the 2026-08-18 ruling to record that its premise fell. |
| b12 | `docs/specs/attorney-review-queue.md`:793 | unset (7) | **CARRIER** | **Live, unannotated assertion** in queue row `Q-RE-3` clause (b). The same sentence in its source memo (`re-1`:726) WAS repaired 2026-08-19; this copy was not. |
| b13 | `docs/specs/fe-4-definitions-sets-spec-2026-08-15.md`:128 | not set (4) | CORRECTION | Dated conformance note quoting the prior wording (repaired at `20d1a0f`). |
| b14 | `docs/specs/fe-5-interrogatory-budget-spec-2026-08-15.md`:240 | not set (1) | CORRECTION | Dated conformance note quoting the prior wording (repaired at `20d1a0f`). |
| b15 | `docs/specs/fe-6-instrument-packaging-spec-2026-08-15.md`:135 | not set (1) | CORRECTION | Dated conformance note quoting the prior wording (repaired at `20d1a0f`). |
| b16 | `docs/specs/grok-external-review-2026-08-18.md`:101 | stays unset (1) | ANNOTATED | Section 3 item 9, the carried ruling text. The appended annotation names this item by ID and falsifies its premise; nothing above it is edited. |
| b17 | `docs/specs/grok-external-review-2026-08-18.md`:287 | unset (1) | FROZEN | CHALLENGES line, carried external-review output, expressly not edited. Asserts, but as a record of what the external reviewer wrote. See section 6.2 on the annotation scope. |
| b18 | `docs/specs/grok-external-review-2026-08-18.md`:302 | stays unset (1) | CORRECTION | The appended annotation itself. |
| b19 | `docs/specs/qbo-integration-research-memo-2026-08-15.md`:140 | not set (4) | CORRECTION | Dated conformance note (repaired at `20d1a0f`). |
| b20 | `docs/specs/re-1-referral-engine-inputs-2026-08-16.md`:213 | not set (4) | CORRECTION | Dated conformance note (repaired at `20d1a0f`). |
| b21 | `docs/specs/re-1-referral-engine-inputs-2026-08-16.md`:727 | unset (7) | CORRECTION | Dated conformance note quoting the exact phrase that still stands, unrepaired, at `attorney-review-queue.md`:793. |
| b22 | `docs/specs/session-log.md`:153 | not set (120) | FROZEN (denies) | 2026-08-19 log entry recording the falsification. Append-only. |
| b23 | `docs/specs/session-log.md`:158 | deliberately (127) | FALSE POSITIVE | Reads "no ALTER DEFAULT PRIVILEGES was issued" - a true statement about what the session abstained from doing, not a claim about the database default. |
| b24 | `docs/specs/session-log.md`:4002 | not set (4) | FROZEN (asserts) | Historical log entry. Asserts the falsehood; append-only by rule, never repaired. |
| b25 | `docs/specs/session-log.md`:9209 | deliberately (4) | FROZEN (asserts) | Historical log entry (CL-2 slice). Append-only. |
| b26 | `docs/specs/session-log.md`:9378 | deliberately (1) | FROZEN (asserts) | Historical log entry (2026-07-28 grants outage). Append-only. |
| b27 | `docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md`:745 | not set (4) | CORRECTION | Dated conformance note quoting the prior BUILD-STATE snapshot wording. |

---

## 8. What this sweep cannot catch — stated so the next one is not surprised

1. **Paraphrase.** Both families are anchored on a literal string. A sentence saying the same false
   thing in other words (*"no default privileges exist on this database"*, *"the role holds no
   privileges"* — §6.3 is exactly this case) is invisible to it.
2. **Distance.** 120 and 200 characters are the dispatch's figures. A true assertion and its
   falsifying context sitting further apart than that would be classified from a context window that
   does not contain the correction.
3. **Split anchors.** Normalization defeats emphasis and wrapping *inside* the anchor, but an anchor
   interrupted by other words (`ALTER DEFAULT ... PRIVILEGES`) is still unreachable.
4. **A cross-check was run against both blind spots:** every word-bounded `anon` (**161** tree-wide)
   and every `alter default privileges` (**47**) was enumerated and the out-of-pattern remainder read
   — 84 `anon` occurrences outside the log, and all 20 out-of-window ADP occurrences. **No further
   carrier was found there**; the out-of-pattern text is diagnostics, `anon`-key references, and the
   conformed *"this project issues no ALTER DEFAULT PRIVILEGES — but the database carries one anyway"*
   wording in `in-1`, `in-3`, `fe-5`, `fe-6` and the five migration annotation blocks.
5. **This file is now itself a retraction-class site.** It quotes all three carriers in order to deny
   them. A future sweep will hit it several times. **It must never be "fixed."**

---

## 9. Reproduction

The sweep is 60 lines of Python and was run from the scratchpad, not committed — it has no home in
`src/` and is not a build artifact. It is fully specified by §2 above; the operative parts are:

```python
STRIP = set('*_`')
def normalize(text):                      # returns (normalized, index_map)
    out, idx, prev_ws = [], [], False
    for i, ch in enumerate(text):
        if ch in STRIP:      continue                       # emphasis-stripped
        if ch.isspace():                                    # wrap-aware
            if not prev_ws: out.append(' '); idx.append(i); prev_ws = True
            continue
        prev_ws = False; out.append(ch.lower()); idx.append(i)   # case-insensitive
    return ''.join(out), idx

def gap(a, b):                            # edge-to-edge, 0 if overlapping
    if a[1] <= b[0]: return b[0] - a[1]
    if b[1] <= a[0]: return a[0] - b[1]
    return 0

FAMILIES = [('a', 'anon', ['nothing', 'widen'], 120),
            ('b', 'alter default privileges',
                  ['not set', 'unset', 'stays unset', 'never set', 'deliberately'], 200)]
```

Files from `git ls-files`; binaries skipped by extension and by a null-byte check; line numbers
recovered from the index map.

---

## 10. What this document is not

- **Not a repair.** No file was edited by the session that produced it. The three carriers stand.
- **Not an adjudication.** Whether `spec-feedback.md`'s dated entries are append-only, whether the
  queue row is repaired, whether the src carrier's second sentence joins item 6, whether BUILD-STATE's
  stale parenthetical is corrected now or at the next runner batch — **all four are yours.**
- **Not a verification of any legal proposition.** Nothing here touches the registry.
- **Not a claim about the live database.** Every fact about privileges cited here is quoted from the
  record of your own 2026-08-19 catalog reads. **No database was connected to.**

---

## 11. ADDENDUM — appended 2026-08-19 (Central) by Michael's ruling; nothing above is edited

**Two of the three carriers were REPAIRED after this record was filed and pushed.** The tables and
verdicts above stand as written — they are the state at `82be555`, which is what a dated one-run
record is for — and this section is the only place that state is superseded.

- **`docs/spec-feedback.md`:591 (§5.2) — REPAIRED.** The passage now states the true warrant (this
  project never issued it; the database carries a vendor default that withholds the four DML
  privileges) and carries a dated conformance note quoting what it used to say. **It remains a
  hit on any future sweep, now in the RETRACTION class** — the note quotes the sentence in order
  to deny it, and must never be "fixed."
- **`docs/specs/attorney-review-queue.md`:793 (§5.3) — REPAIRED**, and taking the same corrected
  wording its source memo already carried, so the two copies read alike again.
- **`src/components/RlsProbePanel.tsx`:73 (§5.1) — STILL STANDS**, deliberately, behind `G10-5`.
  So does the second sentence at :70–71 that §6.3 named. **The carrier count at HEAD is ONE.**

**A line-ending trap fired during the repair and is recorded because it will fire again:**
`docs/spec-feedback.md` is **CRLF** (983 CR / 983 LF by raw byte read) while the queue, BUILD-STATE
and the session log are all **LF**. A multi-line block authored in LF matched ZERO times against it;
the single-line queue edit was unaffected. **The editor was made line-ending-aware — convention
detected from a raw byte read, block translated before matching, file written as bytes** — and each
replacement asserted exactly one occurrence or aborted. **No file's convention was changed.**
