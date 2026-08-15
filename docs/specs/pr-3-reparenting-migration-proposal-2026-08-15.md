# PR-3 — RE-PARENTING THE `Probate companion` CASE TYPE: MIGRATION PROPOSAL

**PROPOSED — NOT AUTHORIZED TO BUILD.**

Nothing in this document re-parents anything, changes any ladder, edits any repo file, opens or
verifies any registry entry, mints any durable ID, or closes any queue row. PR-3 is Michael's, it is
open, and its execution is HELD. This document exists so that when the hold lifts, the act is
already scoped — and so that the size and shape of the act are visible before it is authorized.

**Status:** PROPOSED design input · CHAT-DISPATCH Task 12 · design session, Opus 5, Cowork,
2026-08-15 Central (DT-1 clock-checked 17:20 CDT; container read 22:20 UTC, Central date agreed).
**Michael did not participate and made no rulings.**

**Canonical repo path:** `docs/specs/pr-3-reparenting-migration-proposal-2026-08-15.md`
Duplicate-routing check run at authoring: `docs/specs/` carries no prior PR-3, re-parenting, or
probate-migration document; the path was free at HEAD.

**Provenance.** Repo read at HEAD through the device bridge, commit `9eb6317` on `master`
(*"chore: refresh BUILD-STATE (seventy-fourth refresh, at a7d854d)"*, 2026-08-15 17:10 Central).
Every file:line cite below was read in full text at that commit, not retrieved by RAG.
**This session read `src/`** — see §9, `Q-PR3-1`, which asks whether it should have.

---

## 1. THE GATE — PR-3 IS OPEN, AND IT RESOLVES DIFFERENTLY FROM EVERY PRIOR TASK IN THIS CHAIN

**Confirmed OPEN at HEAD.** `docs/specs/attorney-review-queue.md:69` carries PR-3 with a `⬜` glyph
and the words *"NEW, OPEN"*; its two annotation rows sit at `:70` and `:71`. The pointer row at
`:333` carries no glyph (stripped 2026-08-13, #68, pointer-row convention). `BUILD-STATE.md:115–118`
agrees: *"PROBATE: the only furniture is a `Probate companion` case type MIS-PARENTED under Personal
Injury with a knowingly wrong ladder (`_piDefault`). PR-3 direction CONFIRMED, EXECUTION HELD until
the ladder pass names the destination. Do not touch the case-type tree or ladder."* No session-log
entry closes it; the eight most recent word-bounded `PR-3` mentions in `session-log.md` are all
carries, annotations, or explicit statements that execution stays held.

**The gate's shape is new for this chain.** Tasks 8's specs elaborated rulings while the build was
gated. Tasks 9, 10 and 11 mapped design space that had no ruling to elaborate. **Task 12 is neither:
the DIRECTION is ruled and the DESTINATION is not.**

- **Ruled, 2026-08-07, per V17** (`attorney-review-queue.md:70`): probate gets **its own practice
  area, its own ladder(s), and the companion concept goes away**.
- **Not ruled:** what the destination ladder(s) *are*. The gating probate-ladder design pass is
  **DEFERRED pending the Domser matter** (`:71`) — its concrete unblock condition is the
  **letters-issued arc capture**, plus a rescheduled pass. `PL-1` through `PL-4`
  (`attorney-review-queue.md:282–285`) are all `⬜` and all deferred with it.

**So the honest output of this task is a migration proposal whose destination section is a
question.** §3 is written that way deliberately. A migration document that invented a destination
ladder would be committing exactly the error PR-3 exists to correct — and the queue says so in
terms: *"a placeholder ladder is how the current wrong one happened"* (`:70`).

**What this document CAN do without the destination:** bound the act. The blast radius, the
data-treatment question, the rollback posture, and the sequencing conflict with the unrun CD-1
migration are all determinable now, and none of them depends on which ladder wins.

---

## 2. CURRENT STATE

### 2.1 The structural finding, stated first

**The "case-type hierarchy" is not a hierarchy, and it is almost entirely absent from the database.**

Both halves are already on the record and both are confirmed at HEAD. `BUILD-STATE.md:50–53` carries
them as two spec-vs-code gaps: *"there is no case-type tree to inherit on (CASE_TYPE_DEFS is flat →
inheritance runs practice area → case type), and trucking and UIM/UM are PI FLAGS, not case types."*
`src/domain/roster.ts:329–333` says the same from the code side.

The consequence for **this** task is the part not yet written down anywhere:

- There is **no parent/child case-type relation** to re-parent *within*. `CASE_TYPE_DEFS`
  (`src/domain/caseTypes.ts:10`) is a flat `Record<PracticeArea, {name, ladder}[]>`. "Re-parenting"
  therefore means **moving a string literal from one array to another and giving it a different
  ladder key** — plus adding a fourth member to a three-member union type.
- The database knows nothing about any of it. `cases.practice_area` and `cases.case_type` are
  **free text with no CHECK constraint, no enum, no foreign key, no index, and no view**
  (`db/schema.sql:38–39`). A word-bounded sweep of `practice_area|case_type` across `db/` and
  `supabase/` returns **five occurrences total**, listed exhaustively in §2.2.

**Read together: this is not a schema migration. It is a source change plus a two-column value
backfill.** That is good news for rollback (§6) and bad news for anyone who assumes the type system
or the database will catch a mistake — mostly, they will not (§2.3).

### 2.2 Database layer — exhaustive

| # | Location | Text at HEAD | Bearing on PR-3 |
|---|---|---|---|
| 1 | `db/schema.sql:38` | `practice_area text not null,` + comment `-- Personal Injury / General Civil Litigation / Criminal` | The column accepts any string. **The comment is a three-value list that would become wrong** — a doc-level edit inside a schema file, not a DDL change |
| 2 | `db/schema.sql:39` | `case_type text not null,` | Accepts any string. No constraint to alter |
| 3 | `db/migrations/2026-07-28-cl2-client-dimension.sql:143` | `case when c.practice_area = 'Criminal' then 'defendant' else 'claimant' end,` | **ALREADY RUN** (2026-07-28). Historical: rows it wrote are on disk. A probate case would have taken `'claimant'` from the `else` limb |
| 4 | `db/migrations/2026-08-12-cd1-contact-directory.sql:100` | `and c.practice_area in ('Personal Injury','General Civil Litigation');` | **UNRUN — this is CD-1 item 7, Michael's hand.** A two-value IN list. See §8: this is the one real sequencing hazard in the whole task |
| 5 | `db/migrations/2026-08-12-cd1-contact-directory.sql:138` | `\|\| c.case_type \|\| '". Set it by hand — nothing was guessed.',` | **UNRUN.** Interpolates the case-type string into a flag message. Behaviour-neutral to a rename; the message just reads differently |

**Nothing else.** No table, view, index, trigger, function, or RLS policy in `db/schema.sql`, the
three migrations, or `supabase/functions/` references either column. The two edge functions
(`legiscan-poller`, `statute-fetch`) do not touch cases at all.

### 2.3 Code layer — and the two opposite defaults

Adding `'Probate'` to the `PracticeArea` union (`src/domain/types.ts:3`, currently
`'Personal Injury' | 'General Civil Litigation' | 'Criminal'`) is the single change that propagates.
What it hits divides into three classes, and **the classes matter more than the list**:

**Class A — compile-time catches (loud, safe).** A total `Record<PracticeArea, …>` fails to build
until the new member is supplied.

| Location | What it is | What the build says |
|---|---|---|
| `src/domain/caseTypes.ts:10` | `CASE_TYPE_DEFS: Record<PracticeArea, {name, ladder}[]>` | Missing `Probate` key → type error. **The destination ladder must be named here or nothing compiles** |
| `src/pages/CaseListPage.tsx:8` | `AREA_BADGE: Record<PracticeArea, string>` | Missing badge → type error. A one-word decision, but a forced one |
| `src/domain/caseTypes.ts:41–43` | `CASE_TYPES` | Derived from `CASE_TYPE_DEFS` via `Object.fromEntries(...) as Record<…>`. **The `as` cast means this one does NOT independently error** — it follows whatever `CASE_TYPE_DEFS` says |

**Class B — loud runtime failure by deliberate design.**

| Location | Behaviour |
|---|---|
| `src/domain/caseTypes.ts:122–131` | `statusesFor()` **throws** on an undeclared `(practiceArea, caseType)` pair, with a message naming the file to edit. The comment at `:6–9` records why: *"assignment by declaration, not by name-matching, so a missing mapping fails loudly … instead of silently falling through to a wrong-but-plausible ladder (2026-07-21 audit item 4)"* |
| `src/pages/CaseDetailPage.tsx:107–110` | The one call site that can meet a stored bad pair wraps it: `try { return statusesFor(...) } catch { return null }` → the `:231` notice *"Unknown case type."* Degrades honestly |
| `src/pages/NewCasePage.tsx:47` | `statusesFor(area, caseType)[0]` is **unwrapped** — but it can only be reached through the two pickers, which are populated from `CASE_TYPES`, so it cannot be handed an undeclared pair |
| `src/pages/OaaIntakePage.tsx:222,225` | Hard-codes `'Criminal'`. Unaffected |

**Class C — silent wrong defaults. This is the hazard, and it is the finding of this pass.**

| Location | Behaviour on a new `'Probate'` practice area | Why it matters |
|---|---|---|
| `src/domain/roster.ts:195–202` | **`sideSetFor()` falls through: any practice area that is not `'Criminal'` returns `SIDE_SETS['plaintiff-defendant']`.** A probate matter would silently take **Plaintiff / Defendant** caption alignments | The file's own header at `:7` states the binding constraint it satisfies *"BY CONSTRUCTION"* — **roster capture REQ-14, ruled 2026-08-12: SIDES ARE A PROPERTY OF THE CASE TYPE, NOT A CONSTANT.** The construction holds for the three areas that existed when it was written and **fails open for the fourth.** `SIDE_SETS` already defines `petitioner-only` (`:167`) and `stakeholder-claimants` (`:175`), so the vocabulary a probate caption needs is largely present and merely unassigned |
| `src/data/localAdapter.ts:168` · `src/pages/ClientsCard.tsx:69` | `practiceArea === 'Criminal' ? 'defendant' : 'claimant'` → probate silently takes `'claimant'` | Same shape as DB item 3. Whether an estate's representative is a "claimant" posture is a design question nobody has been asked |
| `src/domain/roster.ts:264` | `PRACTICE_AREA_SLOTS` is `Partial<Record<PracticeArea, …>>` → **no compile error**; a probate area contributes zero practice-area slots | Degrades honestly in the UI via `hasSeededRoster()` (`:391`), which exists so the panel can say *"no roster defined for this case type yet"* rather than look broken. **Silent to the compiler, honest to the user** — worth distinguishing from the two rows above, which are silent to both |
| `src/domain/caseTypes.ts:150–152` | `showsMedicalTab()` returns `practiceArea === 'Personal Injury'` → a re-parented probate matter **loses the Medical tab** | Correct per the 2026-08-12 ruling, and the call site at `CaseDetailPage.tsx:55` carries the safety valve — `showsMedicalTab(rec.practiceArea) \|\| hasBills` — so a matter that already has bills keeps it. **A probate-companion matter with no bills loses the tab; one with bills does not.** Stated so it is a choice, not a surprise |
| `src/pages/CaseDetailPage.tsx:86,168,170` · `src/pages/NewCasePage.tsx:25–26` | `isPI` / `isCriminal` booleans; `ChargesCard` on criminal only | Probate falls into the "neither" branch everywhere. Mostly correct by accident; each is a one-line read at build time |

**Also in the code layer, unaffected but worth naming so nobody re-derives it:**
`src/domain/client.ts:99` `showsClientLayer()` keys on client *count*, not practice area — untouched.
`src/domain/__tests__/caseTypes.test.ts` iterates `CASE_TYPES` and asserts the throw behaviour
(`:13`, `:26–27`); it follows the data and needs no edit beyond whatever the new ladder requires.

### 2.4 Data population at risk

- **Seeds/fixtures: zero.** `src/data/seed.ts` defines three cases — `c-garcia-mvc` (PI, `:157`),
  `c-boyd-dwi` (Criminal, `:168`), `c-servpro-lien` (Civil, `:176`). A case-insensitive `probate`
  sweep across `src/data/` returns **nothing**. No fixture uses the type.
- **Live Supabase database: unknown, and knowable in one query.** `BUILD-STATE.md:107–108` is
  unambiguous that **no real client data has ever entered the app** and that everything written
  2026-07-28 was fictional — but that does not tell us whether any fictional row carries
  `case_type = 'Probate companion'`. See `PR3-LOOK-1` (§10).
- **`localStorage` demo stores: unknown and per-browser.** `STORE_VERSION = 11`
  (`src/data/localAdapter.ts:35`), with a forward migration chain that backs up at each step
  (`:281`, `:290`, `:311`, `:331`, `:356`). Any demo store a browser happens to hold could contain
  a hand-created probate-companion case.

### 2.5 Document layer — every spec/playbook reference

| File:line | What it says about the hierarchy | Treatment if PR-3 executes |
|---|---|---|
| `docs/specs/case-management-project-instructions.md:94` | §7's settled case-type list: *"Probate companion (SETTLED — new lightweight linked case type)"* — the PI-linked companion definition | **This is the definition V17 supersedes.** Edit or annotate; it is the design authority the code implements |
| `docs/specs/case-management-project-instructions.md:15,18` | Probate-is-a-practice-line amendment + the mis-parenting note pointing at PR-3 | The `:18` paragraph becomes historical the moment the act lands |
| `docs/spec-feedback.md:128–150` | **Item 1**, the gating design pass, with its 2026-07-24 addendum: *"Proceeding type is the threshold structure, not a single ladder"* | The item this migration is downstream of. Not resolved by this document |
| `docs/spec-feedback.md:171` | *"Existing code anchor: `Probate companion` is already a case type … Whether the practice area extends it or supersedes it with linked-matter support is a design decision"* | **That decision is V17's — "companion concept gone." Recorded here because the file still poses it as open** |
| `docs/specs/attorney-review-queue.md:69–71` | PR-3 itself + both annotations | Rows close only by Michael's ruling |
| `docs/specs/attorney-review-queue.md:282–285` | `PL-1` … `PL-4` | See §7 |
| `docs/specs/attorney-review-queue.md:168` | *"D-CL1-3 is gated on PR-3 alone"* | See §7 |
| `docs/specs/claimant-dimension-and-case-links-design.md:211,429` | CL-1's only real consumer is probate; D-CL1-3 gated on PR-3 alone | Unblocked *as a question*, not as a build, if PR-3 executes |
| `docs/specs/case-heartbeat-design.md:252,279,535,557` | The heartbeat's **reference spine is `STATUSES._piDefault` by name**; H9/D4 decided *"leave the status list alone"* | **A probate ladder does not disturb this** — the heartbeat references the PI ladder specifically. Named so a build session does not "helpfully" generalize it |
| `docs/specs/pi-case-playbooks.md:951` | *"Build a lightweight 'probate companion matter' case type linked to the PI case, or track probate steps as tasks inside the PI case?"* | **A superseded question still written as open.** The playbook engine keys off *"case type + flags"* (`:5`, `:15`), so its probate paragraphs assume the companion type exists |
| `docs/specs/pi-case-playbooks.md:947` | Case-type-vs-flag architecture recommendation (flags won) | Precedent for the shape of the decision, not affected by it |
| `docs/specs/rulings-capture-2026-08-07.md:82–115` · `-08-07b.md` | Where the direction was confirmed and the deferral reasoned | Historical record; append-only, not edited |
| `docs/specs/BUILD-STATE.md:115–118` | The hold, in terms | Rewritten by the queue runner, not by hand |
| `docs/specs/cd2-role-mining-pass-2026-08-13.md` · `cl2-authorization-brief.md` · `model-routing-plan.md` · `operational-blockers-capture-2026-07-26.md` · `archive-project-history-by-day.md` · `session-log.md` | Word-bounded `PR-3` carries | **Do not edit.** The log is append-only; the rest are captures |

---

## 3. TARGET STATE — DELIBERATELY A QUESTION

**What is ruled** (V17 / 2026-08-07, `attorney-review-queue.md:70`): probate becomes **its own
practice area**, with **its own ladder(s)**, and **the companion concept goes away**. Estates link to
PI matters through CL-1 rather than living underneath them.

**What is not ruled: the destination.** `PL-1` asks the shape question that decides this document's
entire §4 — *proceeding-as-case-type* (each probate proceeding its own type and ladder) versus *one
"Decedent's Estate" case type with a proceeding ATTRIBUTE keying the ladder*. Both are live. The
queue records that **Claude's preference for the first is PROPOSED ONLY and "must not be built
from"** (`:282`).

So the target state has a **fixed frame and a variable interior**:

**Fixed by V17, whatever PL-1 decides:**
1. `PracticeArea` gains a fourth member.
2. `'Probate companion'` no longer appears under `'Personal Injury'` in `CASE_TYPE_DEFS`.
3. No probate case type declares `_piDefault`.
4. Every Class-C site in §2.3 has an explicit probate answer rather than a fall-through.

**Variable, and PL-1's to fix:** how many case types, how many `LadderKey`s, and whether a
proceeding is a type or an attribute. **The second shape would need a `cases` column that does not
exist**, which is the one branch where this stops being a source-only change and acquires actual
DDL — a fact worth having before PL-1 is answered, and the reason it is stated here rather than
after.

**This document proposes neither shape and recommends neither.** Pointing at the fork is the whole
of its job here.

---

## 4. THE ACT, AS FAR AS IT CAN BE SCOPED TODAY

Ordered, with the destination-dependent steps marked. **Not a plan to execute — an estimate of size.**

| # | Step | Depends on PL-1? | Notes |
|---|---|---|---|
| 1 | Add `'Probate'` to `PracticeArea` (`types.ts:3`) | No | One line. Cascades to Class A |
| 2 | Declare probate case type(s) + ladder key(s) in `CASE_TYPE_DEFS`; remove `'Probate companion'` from the PI array | **YES — this is the destination** | `caseTypes.ts:10–22` |
| 3 | Add the ladder body/bodies to `STATUSES` | **YES** | `caseTypes.ts:59` |
| 4 | Add the `AREA_BADGE` entry | No | `CaseListPage.tsx:8`. Compile-forced |
| 5 | Give `sideSetFor()` an explicit probate branch | No — the *branch* is required either way; its *value* is a design call | `roster.ts:195`. **Class C, item 1** |
| 6 | Decide the `'claimant'` posture default for probate | No | `localAdapter.ts:168`, `ClientsCard.tsx:69` |
| 7 | Decide whether probate seeds practice-area roster slots | No | `roster.ts:264`. Absence is honest, not broken |
| 8 | Data backfill: re-key existing `('Personal Injury','Probate companion')` rows | Partly — the target values are PL-1's | §5 |
| 9 | Demo-store migration `v11 → v12` doing the same | Partly | §5 |
| 10 | Update `schema.sql:38`'s practice-area comment | No | Comment only, no DDL |
| 11 | Doc edits: project-instructions §7 (`:94`), the `:18` paragraph, `spec-feedback` item 1's code anchor, the `pi-case-playbooks.md:951` superseded question | No | Documents, not code |
| 12 | Tests | Partly | `caseTypes.test.ts` follows the data; `sideSetFor` gains a probate case |

**Steps 1 and 4–7 and 10–11 are determinable now. Steps 2, 3, 8 and 9 are not.** That ratio is the
answer to "how much of PR-3 is blocked on the ladder pass": **most of the volume is unblocked and
most of the risk is in the blocked part.**

---

## 5. TREATMENT OF EXISTING RECORDS

**Three populations, three different answers.**

**(a) Fixtures — nothing to do.** No seed record uses the type (§2.4).

**(b) Live Supabase rows — a backfill, if any exist.** The shape:

```
update cases
   set practice_area = 'Probate',
       case_type     = '<destination type — PL-1's>'
 where practice_area = 'Personal Injury'
   and case_type     = 'Probate companion';
```

Free-text columns with no CHECK means **the update is trivially available and trivially reversible**.
`cases.status` is the complication, not `case_type`: a row re-keyed to a probate ladder keeps
whatever PI status string it was carrying (`'Treatment in progress'`, say), which will not be a
member of the new ladder. **The status value must be decided per row, not derived** — there is no
mapping from the PI arc to a probate arc, and inventing one is the `_piDefault` error again in
miniature. For a handful of fictional rows the right answer is probably "set them by hand, or delete
them"; the population is small enough that this is a question and not a project. **The `case_roster_flags`
precedent (`2026-08-12-cd1-contact-directory.sql:116–146` — table at `:116`, flag insert at `:135`)
is the house pattern if it ever isn't: flag the row, preserve the unmapped value verbatim, never
guess.**

**(c) What happens if NO backfill runs.** Worth stating, because it is the actual fallback posture
and it is benign:

- `CaseDetailPage` shows *"Unknown case type."* (`:231`) via the `try/catch` at `:107–110`. **No
  crash.** The case is still reachable, still editable, and the Overview's case-type picker can
  re-key it by hand.
- `CaseListPage` renders it under a PI badge until re-keyed.
- The Medical tab persists if the matter has bills (`CaseDetailPage.tsx:55`), disappears if not.
- `sideSetFor()` keeps returning plaintiff-defendant, since the row still reads as PI.

**So the un-backfilled state is visible and self-announcing rather than silently wrong** — which is
what makes the ordering in §8 a real choice rather than a trap.

**(d) Demo stores.** A `v11 → v12` migration doing (b)'s work, following the existing
forward-in-place-with-backup chain (`localAdapter.ts:281–356`). Each browser migrates on next load.
Demo state does not travel between machines (`BUILD-STATE.md:90`), so there is no coordination
problem — only a per-browser one.

---

## 6. ROLLBACK POSTURE

**Cheap, and cheaper than it looks — with one exception that is not reversible by reverting code.**

**What makes it cheap:**
- **No DDL** in the base case → nothing to un-migrate. Both columns are free text with no CHECK, no
  enum, no FK, no index, no view (§2.2). Reverting the source is a `git revert`; reverting the data
  is the §5 update with the operands swapped.
- **Roster slots are DATA, not schema** (`roster.ts:333`, and `BUILD-STATE.md:53`: *"Slots are DATA;
  reversing is cheap"*).
- **The demo store already backs up at each migration step** (`localAdapter.ts:281–356`).
- **`statusesFor()`'s loud throw is a rollback asset**: a reverted code base meeting a
  still-re-keyed row produces the *"Unknown case type"* notice, not a crash — the same benign state
  as §5(c), in the other direction.

**What is NOT cheap, and is the one thing worth guarding:**
**Status values written under a probate ladder do not un-write.** Once a matter has been clicked
through `'Letters issued'` (or whatever PL-3 lands on), reverting `caseTypes.ts` leaves that string
in `cases.status` with no ladder that contains it. Recoverable by hand, but it is real data loss of
a kind the rest of this act does not carry. **Consequence: the reversibility of PR-3 decays the
moment a probate matter is actually worked in the app** — which argues for executing it before
go-live rather than after, and is one input to `Q-PR3-4`.

**Not a rollback question but adjacent:** if `PL-1` resolves to the *proceeding-attribute* shape,
step 2 acquires a real column and the DDL-free property above stops holding. Rollback posture is
therefore **shape-dependent**, and the cheap version is the one this section describes.

---

## 7. PL-SERIES INTERACTION — POINT, DON'T DESIGN

Nothing below designs, recommends, or narrows any PL question. Each row states only **what that
question decides about this document**.

| Question (verbatim pointer) | What it decides here |
|---|---|
| **`PL-1`** (`attorney-review-queue.md:282`) — proceeding-as-case-type vs. one "Decedent's Estate" type with a proceeding attribute | **Steps 2, 3, 8 and 9 of §4, and whether §6's DDL-free rollback property survives.** The single highest-leverage input to this proposal |
| **`PL-2`** (`:283`) — which proceedings get DRAFTED ladders vs. stubs | How many `LadderKey`s and `STATUSES` bodies step 3 adds. Volume, not shape |
| **`PL-3`** (`:284`) — which Ch. 7 stations are LADDER STATUSES vs. checklist/tracked-object material | The content of the ladder(s), and therefore §5(b)'s per-row status decision |
| **`PL-4`** (`:285`) — ladder / deadline-engine boundary; probate deadlines entering the registry UNVERIFIED as their own batch | Nothing structural here. Named so the boundary is not quietly crossed by a build session reading this document |

**All four are `⬜` and all four are deferred with the gating pass, pending the Domser letters-issued
arc capture** (`:71`).

**`D-CL1-3` — gated on PR-3 alone** (`attorney-review-queue.md:168`;
`claimant-dimension-and-case-links-design.md:429`). Probate is CL-1's only real consumer (`:211`).
**If PR-3 executes, D-CL1-3 becomes answerable — it does not become answered, and `case_links` still
does not exist** (`BUILD-STATE.md:49`). Pointed at, not designed.

---

## 8. THE SEQUENCING HAZARD — PR-3 vs. THE UNRUN CD-1 MIGRATION

**This is the one finding in this pass with an operational consequence today, and it is live because
CD-1 item 7 is still unrun and still Michael's hand** (`BUILD-STATE.md:36–38`).

`db/migrations/2026-08-12-cd1-contact-directory.sql:100` derives caption alignment only
`where … c.practice_area in ('Personal Injury','General Civil Litigation')`. The IN list is a
literal.

- **If PR-3 executes BEFORE the CD-1 migration runs:** any re-keyed probate row falls outside that
  IN list, so its `case_parties` links get **no derived alignment** — and are therefore **flagged**
  by the `case_roster_flags` insert at `:135–146` rather than mis-derived. **That is the migration
  working as designed**, not a defect: `BUILD-STATE.md:39–42` says the backfill flags most cases by
  design and that one check *"expects a HIGH flag count."* The only cost is a slightly higher count
  than the check's author anticipated.
- **If the CD-1 migration runs FIRST** (the current launch-path order, `BUILD-STATE.md:150`): probate
  rows are still PI at that moment, so they take the plaintiff-defendant derivation — and the later
  re-key **does not revisit it**. The alignment silently persists as Plaintiff/Defendant on an estate
  matter.

**The second ordering is the quieter of the two, and quiet is the failure mode this project keeps
catching late.** Neither ordering is proposed here; the point is that **the order has a consequence
and nothing on the record currently records that it does.** `Q-PR3-3`.

**Note the coupling to Class C, item 1:** even with the right ordering, `sideSetFor()`'s fall-through
(`roster.ts:195`) would re-supply Plaintiff/Defendant at the UI layer for every probate matter
created after the act. **The migration ordering and the code default have to be answered together or
the fix leaks.**

---

## 9. OPEN QUESTIONS — FULL TEXT (packet-local IDs; nothing minted)

`Q-PR3-` and `PR3-LOOK-` were checked word-bounded across `docs/`, `db/`, `supabase/`, `src/`,
`CLAUDE.md` and `README.md` at HEAD: **zero hits, both free, both deliberately NOT minted as durable
IDs.** `PR` is a live durable series (PR-1, PR-2, PR-3) and minting into it is Michael's act. Per the
established pattern this makes **`ID-DL-1` govern a seventh packet.**

**`Q-PR3-1` — Did this session read source it should not have, and is a design-side `src/` read
through the device bridge sanctioned or not?** The working-set policy states that design sessions do
not read source and that `BUILD-STATE.md` is the sole authority on what is built
(`BUILD-STATE.md:142`; project instructions, knowledge working set). That sentence predates the
device bridge. CHAT-DISPATCH's own session-start line asks for the repo checkout to be granted
"preferred: full-text HEAD reads for the verification-heavy tasks," and this task's subject —
a case-type hierarchy — lives entirely in `src/domain/caseTypes.ts`, `src/domain/types.ts` and
`src/domain/roster.ts`, none of which is synced. This session **read those files at HEAD** and every
Class-A/B/C finding in §2.3 comes from them; §8's coupling finding is not derivable without them.
The precedent cuts the other way too: the CD-2 role-mining pass recorded **not** reading
`partyRegistry.ts` and `roster.ts` as *"the honest gap"* leaving ~60 rows `TAG-CHECK: NOT RUN`
(`BUILD-STATE.md:147`). **Question: is a bridge-mediated, read-only `src/` read by a design session
permitted (and if so, is it a standing convention or per-instance), or is the correct discipline to
ask you to paste the file? If not permitted, §2.3, §2.4 and §8 of this document should be treated as
having been obtained irregularly, and the document re-derived from BUILD-STATE alone.** Nothing from
`src/` was written into project knowledge, and no source file was edited.

**`Q-PR3-2` — `sideSetFor()`'s fall-through: flag, or fix as part of PR-3?** `src/domain/roster.ts:195–202`
returns `SIDE_SETS['plaintiff-defendant']` for every practice area that is not `'Criminal'`. The
file's header (`:7`) states it satisfies roster capture REQ-14 — *"SIDES ARE A PROPERTY OF THE CASE
TYPE, NOT A CONSTANT"* — *"BY CONSTRUCTION."* The construction is exhaustive over the three practice
areas that existed on 2026-08-12 and fails open for any fourth. **This is a defect in a ruled
constraint that exists today, independent of probate: it is currently unreachable only because no
fourth practice area exists.** It was found in passing and **has been changed nowhere.** Question:
does it get repaired as part of PR-3's act, repaired separately and sooner as a REQ-14 conformance
fix, or left as a flag? Related, and yours: the probate side set itself — `petitioner-only`
(`:170`) and `stakeholder-claimants` (`:177`) already exist unassigned, and whether either fits a
probate caption is a legal question, not a coding one.

**`Q-PR3-3` — In what order do PR-3 and the unrun CD-1 item-7 migration run?** Full reasoning at §8.
Both orderings are defensible and they fail differently: PR-3-first produces extra roster flags (the
migration's designed behaviour, visible); CD-1-first produces persisted Plaintiff/Defendant caption
alignments on estate matters that nothing later revisits (silent). The current launch path
(`BUILD-STATE.md:150`) puts the CD-1 migration first. **Question: is that order deliberate with
respect to PR-3, and if PR-3 is executed after it, what re-derives the alignments on re-keyed rows?**

**`Q-PR3-4` — Does PR-3 execute before or after go-live?** §6 establishes that rollback is cheap
until a probate matter is actually worked in the app, at which point status strings written under a
probate ladder become hand-recoverable data rather than a `git revert`. GL-1's floor is *"real case /
party / client / SOL data hand-entered into the core app"* (`BUILD-STATE.md:22–25`) and probate is
not named in it either way. **Question: is probate in or out of the go-live population, and does the
decaying-reversibility argument change the sequencing?** This is a scheduling question, not a design
one, and it does not require PL-1 to be answered.

**`Q-PR3-5` — The superseded questions still written as open: annotate in place, or leave?** Three
files pose as open a question V17 closed on 2026-08-07. `docs/spec-feedback.md:171` — *"Whether the
practice area extends it or supersedes it with linked-matter support is a design decision."*
`docs/specs/pi-case-playbooks.md:951` — *"Build a lightweight 'probate companion matter' case type
linked to the PI case, or track probate steps as tasks inside the PI case?"*
`docs/specs/case-management-project-instructions.md:94` — the settled-case-type entry defining the
companion type. **None was edited.** This is the `Q-IN2-2` class exactly: a file whose text a later
ruling overtook. **Question: annotate each in place with a pointer to V17, leave them until PR-3
executes and fix them all in one pass, or leave them alone?**

**`Q-PR3-6` — Does the `'claimant'` posture default get a probate answer, and is it one answer or
three?** The ternary `practiceArea === 'Criminal' ? 'defendant' : 'claimant'` appears in three
places — `src/data/localAdapter.ts:168`, `src/pages/ClientsCard.tsx:69`, and already-executed SQL at
`db/migrations/2026-07-28-cl2-client-dimension.sql:143`. The first two would silently assign
`'claimant'` to a probate client. **Question: what posture does an estate's client carry, and — the
structural half — should these three sites be consolidated to one enforcement point the way
`showsMedicalTab()` and `showsClientLayer()` were, so the next practice area does not have to find
all three?** The consolidation is a code question, but it is the same drift class those two
functions were written to kill, so it is raised rather than assumed.

**`Q-PR3-7` — Does a probate matter get practice-area roster slots at all?** `PRACTICE_AREA_SLOTS`
(`roster.ts:264`) is `Partial<Record<PracticeArea, …>>`, so omission compiles and
`hasSeededRoster()` (`:391`) makes the UI say *"no roster defined for this case type yet"* honestly.
Criminal has one practice-area slot; PI has none (its slots are case-type and overlay keyed).
**Question: does probate seed an applicant/representative slot at the practice-area level, seed
nothing and rely on case-type slots once PL-1 names the types, or seed nothing at all for now?**
Slots are DATA and reversing is cheap, so this is deliberately a small question — raised only
because omission is invisible to the compiler.

---

## 10. NAMED LOOKS — YOURS

**`PR3-LOOK-1` — how many rows are actually at stake?** One query against the live Supabase
database:

```
select id, file_number, practice_area, case_type, status
  from cases
 where case_type = 'Probate companion'
    or practice_area = 'Probate';
```

Everything in §5 is written for an unknown population. **If the answer is zero rows — which is
plausible, since no fixture uses the type and the app's fictional data was written 2026-07-28 —
then §5(b) drops out of PR-3 entirely and the act becomes source-only.** That is a materially
smaller authorization than the one this document is scoped against, and it costs one query to find
out. Cheapest move on the whole task.

---

## 11. WHAT THIS DOCUMENT DOES NOT DO

- Does not authorize any build. **PROPOSED — NOT AUTHORIZED TO BUILD.**
- Does not re-parent anything, change any ladder, or touch the case-type tree.
- Does not answer, narrow, or recommend on `PL-1` … `PL-4`, and does not propose a destination
  ladder. §3's interior is deliberately empty.
- Does not answer `D-CL1-3` or design `case_links`.
- Does not edit `src/domain/caseTypes.ts`, `types.ts`, `roster.ts`, `db/schema.sql`, either unrun
  migration, `spec-feedback.md`, `pi-case-playbooks.md`,
  `case-management-project-instructions.md`, `attorney-review-queue.md`, or any registry file.
- Does not open, enter, or verify any legal proposition — **no registry entry of any kind is created
  or touched by this pass**, and there is no legal-authority research in it.
- Does not mint a durable ID. `Q-PR3-1..7` and `PR3-LOOK-1` are packet-local.
- Does not repair the `sideSetFor()` fall-through, the three-way `'claimant'` ternary, or the three
  superseded document passages. All flagged, none changed.

---

*Filed 2026-08-15 Central. CHAT-DISPATCH Task 12. Repo read at HEAD `9eb6317` through the device
bridge. Everything above is PROPOSED until Michael rules.*
