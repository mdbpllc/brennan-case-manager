# FIRM OBLIGATIONS — MODULE SPEC (the design pass for the firm-obligations sitting)

**Status:** PROPOSED — a design pass, NOT a build authorization. Authored 2026-09-07 (evening, Central) by a typed design session (Cowork, Fable 5.1 per the environment) at HEAD `ea5675b`, on Michael's instruction to run the next step in the record (*"Run the next step that you see fit … Make it a very productive run and then let's package to Code"*). **It elaborates three rulings (`FO-1`, `FO-2`, `FO-3`), verifies the two facts `FO-7` waits on, answers nothing that is Michael's, and puts the module's open decisions on the ruling sheet at `docs/specs/firm-obligations-ruling-sheet-2026-09-07.md` for the sitting where he rules.** Nothing here enters the build queue until he rules; every legal proposition in §7 is UNVERIFIED with its source named; no ID is minted. **Revised twice before shipping — on the PF-1 preflight's findings and then on the RE-SWEEP's** (`docs/record/firm-obligations-design-2026-09-07/pf1-preflight-report-2026-09-07.md`): a second round of source reads, the missed-period and not-applicable holes closed, the Outlook question re-put, the catalog roughly doubled, and the fix pass's own wrong turn on `T3` caught.
**Canonical repo path:** `docs/specs/firm-obligations-module-spec.md` (RULING class, `CAP-2`).
**Prior art, all of it:** the `#137` log entry (2026-08-22, the voice session finished typed — `FO-1`, `FO-2`, `FO-3` ruled there) and the `#137` capture in project knowledge (`claude_Backup_Redundancy_and_Firm_Obligations_Capture_2026-08-22_Voice2.md` — the ONLY place `FO-4`, `FO-5`, `BR-2`, `BR-3`, `BR-4` and `DA-2` are defined; `docs/specs/id-collision-report.md` records their ABSENCE from the repo, and `#137` itself says *"FO-, BR- and DA- are PROPOSED IDs, not minted ones"*); `#149` DECISION 6 (*"Firm obligations first"*); the `#150` packet's next-acts line ("(3) the firm-obligations design sitting") — that packet sat in `inbox/` unrun when this session opened, so `#150` is not yet at HEAD and is cited as a packet, not as the record.
**Evidence for this document:** `docs/record/firm-obligations-design-2026-09-07/` — the source-read record (every primary-source read, TIER-marked), the design-pass ledger (every HEAD fact and the command that produced it), and the PF-1 preflight report (every finding and its disposition).
**Cite this file by section heading.** It will be revised at the sitting.

---

## §0 — READ ME FIRST: what is ruled, what this adds, what it does not touch

**Ruled (his words — the log entry `#137`, and where marked, the `#137` capture):**
- **`FO-1`** — *"The software should probably carry firm level recurring obligations."* The entry's gloss, recorded with the ruling: *a firm-level obligation HAS NO MATTER TO HANG ON … This is a new SCOPE for obligations, not a new type — that is the substance of the ruling.*
- **`FO-2`** — *"it should stay lit till it's done"*; on the heavy set named back to him — *"bar dues, malpractice renewal, IOLTA reconciliation, CLE hours"* — *"those are hard deadlines... those are, like, do or die."* No snooze.
- **`FO-3`** — thin by default: the entry records *"Michael ruled thin"*; the capture (PART 8) has his words, *"let's lean towards the thin version"* — the entry's statement, confirmed by him (*"Yeah. So it's right."*): *a firm obligation is a date, a name, and it stays lit until done*; the QuickBooks limb is **CONDITIONAL, NOT RULED**, on a fact to be *"VERIFIED AT HEAD BEFORE ANYONE BUILDS ON IT"* (that verification is §9).

**This document adds:** the vocabulary (§2), the object model (§3), the behaviour (§4), the surfaces (§5), the storage shape as a recommendation for his confirmation (§6), the seed catalog with sources (§7), the registry-boundary question (§8), the `FO-7` verification (§9), the owner question `FO-5` (§10), the calendar question `FO-6` and the items held for the product (§11), the named defaults (§12), the questions for ruling (§13), what a build slice would contain once ruled (§14), and what this pass did not do (§15). **Where §4 goes beyond the three rulings — no dismiss, no bulk action, the two closes, the missed-period rule — it is a DEFAULT numbered in §12, not a consequence of the rulings.**

**It does not touch:** the deadline engine (`FC-7`/`FC-8`/`FC-9` — direction only, unbuilt), the case heartbeat (design docs only), document storage and mobile access (`DA-1`–`DA-4`), the third-copy vendor (`BR-1`, `BR-2`, `BR-4`, `BR-5`), `H12-v`, the go-live floor (`GL-1` — complete per the `#150` packet, which is not yet at HEAD; at `ea5675b` the floor stands *"COMPLETE BUT FOR HIS OWN PASTE"* with two migrations written-not-run; go-live is his act either way), or any registry file. **It authorizes no schema act, no migration, no build.**

---

## §1 — RECONCILE FIRST: the facts at HEAD `ea5675b` this design rests on

Each was READ at HEAD over the bridge this session (commands in the ledger), not carried:

1. **The calendar is matter-keyed, exactly as `FO-1` presumed.** `db/schema.sql`: `calendar_events.case_id uuid not null references cases (id) on delete cascade` — `NOT NULL` since the 2026-07-24 Outlook build (live since the 2026-07-28 first schema run). The adapter exposes `listEventsForCase(caseId)` and `listEventsPendingSync()` (the sync-retry read, *"across cases"*); there is no firm-wide list method.
2. **There is NO firm-wide calendar view.** `src/App.tsx` routes `/cases/:id/calendar` (the per-case tab) and no `/calendar`. Cross-matter pages exist (`/inbox`, `/notes`, `/parties`, `/rules`, `/statutes`, `/bills`, `/templates`, `/benchmarks`, `/diagnostics`), but the only DASHBOARD-shaped surface is `/cases` (the case list, with the compact `WorklistCard` — *"the de facto dashboard"* in BUILD-STATE's words), and the only calendar that sees everything is Outlook.
3. **No snooze exists anywhere in the built product.** `snooze` occurs in ZERO files under `src/`, `db/` and `supabase/`. In the docs it belongs to `docs/specs/case-heartbeat-design.md` (the serializer: *"No → the only useful next question: snooze or escalate"*; *"Snooze requires a duration; dismissal requires an outcome"*) and to the register rows and log entries that discuss that design — all DESIGN, unbuilt. So the `#137` entry's *"BEHAVIOURALLY DISTINCT from case reminders, which are snoozable"* contrasts with the heartbeat DESIGN, not with anything built — and the distinction still governs, because that design (unbuilt, unauthorized) is where the record has matter reminders going.
4. **No deadline engine exists** (BUILD-STATE: *"Nothing for a deadline engine (FC-7/FC-9 are direction only)"*), and `FC-7`'s TWO tracks are both MATTER-scoped — see the vocabulary collision in §2.
5. **No QuickBooks integration exists in the build.** `quickbooks`, `qbo`, `intuit` occur in ZERO files under `src/`, `db/`, `supabase/` (checked with and without a word boundary). `docs/specs/qbo-integration-research-memo-2026-08-15.md` EXISTS and is *"PROPOSED — RESEARCH ONLY"* (`#87`; BUILD-STATE: *"none of #87's QBO memo … changes that: all three are RESEARCH/INPUTS ONLY"*). This is `FO-7`'s pair of facts, both read at THIS head (§9).
6. **Outlook push is one-way, software → Outlook, and it needs a matter.** `src/outlook/graph.ts`'s `toGraphEvent(ev, caseRec)` REQUIRES a `CaseRecord`: a `Matter: <fileNumber> — <caption>` body line, the category `MDBP Case`, and the extended property `MATTER_PROP_ID` carrying `<fileNumber>|<caseId>|<eventId>`; events go to the dedicated calendar `OUTLOOK_CALENDAR_NAME` (`'MDBP Cases'` unless the env overrides it). The auth surface is one delegated scope, `Calendars.ReadWrite`, and no server-side identity (`#85`'s finding; `Q-WF-4` is the open question on whether the app ever acquires one, and `AS-Q1` — ruled 2026-08-31, unbuilt — is its first instance, a server-side function for the model call). A firm obligation pushed through this path needs a variant that has no case (§5.3). **The known defect stands:** the FIRST edit of a connect-pushed event duplicates it in Outlook (`outlook-edit-cancel-exercise-2026-08-13.md`); nothing here fixes it.
7. **There is no obligations table and no settings table, and one firm-scoped precedent exists.** Reference and configuration tables keyed to neither a case nor a party already exist (`file_counters`, `review_log`, `legal_rules`, `tag_templates`, `statute_chapters`, `watch_targets`, `form_format_profiles` …), and `glossary_terms` already carries `scope text not null default 'firm' check (scope in ('firm','case'))` with a nullable `case_id` — the one place the schema already knows the word "firm". The register would be the first table about the FIRM'S OWN DATED ARRANGEMENTS. (Consequence for RLS: the one rule on 45 tables — `for all to authenticated using (true) with check (true)` — is what a new table would take, and at the solo stage it is exactly right; §10 names the multi-user edge.)
8. **The audit-trail primitive already exists:** `appendReviewLog(entry)` / `listReviewLog(entityType, entityId)` on the adapter (`ReviewLogEntry` in `src/domain/billing.ts`), written from ten pages under `src/pages/` including `CalendarTab.tsx`. **Its `action` column carries a CHECK — `('suggested','confirmed','edited','rejected','created','generated')` — that no migration widens**, so a new action value is a schema act (§12, `FOD-6`). *(A pre-existing mismatch found on the way — `CalendarTab.tsx` writes `action: 'cancelled'`, which the CHECK does not admit and the Supabase adapter passes straight through — is reported in this packet's session-log entry and a `spec-feedback.md` section, not here; `Q-RE-6` already records the sibling gap for "decided".)*
9. **The demo/local adapter runs a versioned store** (`STORE_VERSION = 16` at HEAD; the literal-pinned forward chain) — a new collection lands as v17 with a seed, the CD-1/R17 pattern. **The register — `docs/specs/attorney-review-queue.md` — has NO row and no mention of any `FO-`, `BR-` or `DA-` id.** The closed register's Status header (runner 82's sentence) reads: *"WHAT IS GENUINELY OPEN AND HAS NO ROW ANYWHERE … `FO-1`/`FO-2`/`FO-3`, `BR-1`–`BR-5` and `RC-1`–`RC-3` living in the log entries alone. Minting any of them is Michael's act, not a runner's."* BUILD-STATE's own phrase for the same set is *"OPEN AND ROOMLESS, surviving nowhere else"*. This spec mints nothing and asks (§13, `Q-FO-10`) whether he wants rows.

---

## §2 — VOCABULARY, and a collision named before it bites (PROPOSED; `Q-FO-0`)

- **FIRM OBLIGATION** — a duty of the firm, or of an attorney as a licensee or filer, that attaches to NO matter and recurs (or falls once) on a date: bar dues, MCLE, the TIDC practice-time report, the franchise/public-information filings, insurance renewals, the backup restore test. This is `FO-1`'s new SCOPE.
- **FIRM DEADLINE** — **already taken.** `FC-7` (ruled 2026-08-18, his words) uses "firm deadlines" for the MATTER-scoped track *"set by the firm"* — e.g., the internal expert-designation date *"weeks in advance"* of the court date. `docs/specs/deadline-engine-spec.md` §2 elaborates that meaning. **PROPOSED: the two phrases are kept apart** — this spec, and the UI, code and register once he rules, say **"firm obligation"** for `FO-1`'s scope and leave **"firm deadline"** to `FC-7`. Put as `Q-FO-0` because a word he prefers — "practice obligation", "office obligation" — is cheaper to take now than after a page carries the label.
- **OCCURRENCE** — one dated instance of an obligation: *the 2026 practice-time report*, *the 2027 Q1 quarterly return*. The obligation is the standing duty; the occurrence is what gets done.
- **LIT** — an occurrence that has entered its lead window and is not done. **OVERDUE** — lit and past its due date. Both are the same "lit" in `FO-2`'s sense; overdue changes emphasis and order, never behaviour.
- **DONE** — the one act that unlights an occurrence: Michael's hand, with a date and an outcome (§4.2). There is no dismiss, no snooze, no bulk action.
- **LEAD WINDOW** — how far ahead of the due date an occurrence lights. A per-obligation number of days (§12, `FOD-2`); not the `FC-7` *lead* (which derives a matter date from a court date).

---

## §3 — THE OBJECT MODEL (thin, per `FO-3`)

### 3.1 `FirmObligation` — the standing duty
| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `name` | text | e.g., *State Bar membership fee* |
| `category` | enum | `licensing` · `court-appointments` · `practice-rules` · `tax-entity-and-employment` · `insurance` · `infrastructure` · `custom` — for grouping and the seed catalog; no behaviour hangs on it |
| `ownerScope` | enum | `firm` \| `attorney` — `FO-5`, §10. At the solo stage both resolve to Michael; the field exists so the multi-user phase does not have to retrofit it |
| `ownerUserId` | uuid, nullable | filled only when `ownerScope = attorney` AND more than one licensed user exists; NULL means "the firm's one attorney" |
| `recurrence` | jsonb | one of the rule kinds in §3.2; declarative, re-evaluated, never resolved once (the `FC-9` / deadline-engine §3.3 principle) |
| `missedPeriods` | enum | `serial` \| `collapse` — what happens when a period is missed (§4.1); defaulted from the rule kind, overridable |
| `conditionalPerPeriod` | boolean | TRUE only for obligations whose duty can lapse for a period (no payroll this year; no tax owed) — the ONLY rows on which "not applicable" is offered (§4.2) |
| `leadDays` | integer | the lead window; default per §12 `FOD-2` (30) |
| `weight` | enum | `hard` \| `routine` — emphasis and ordering ONLY (§4.4); `Q-FO-6` |
| `sourceNote` | text, nullable | the authority behind the obligation as a display string, e.g., *Tex. Gov't Code § 81.054(j) — UNVERIFIED*; whether this becomes a registry pointer instead is `Q-FO-7` (§8) |
| `notes` | text, nullable | free text — where to file, the portal, the account, a per-county checklist |
| `active` | boolean | retire without deleting; history stays (§4.5) |
| `createdAt` / `updatedAt` / `createdBy` | | the `F-25` pattern (`created_by uuid references auth.users (id)` with the `set_created_by` trigger) |

**Deliberately absent (`FO-3`, thin — thin was about MONEY: the three levels he chose between were amount / payee / the books):** no amount, no payee, no account, no ledger link. See §9 for the reserved-hook question. **Not excluded by "thin":** a note, and on a done occurrence a `filedAt` pointer (a confirmation number, a URL, "the PIR PDF is in OneDrive/Firm/2026") — the software still never knows the money.

### 3.2 Recurrence rule kinds — declarative, all re-evaluated from the rule
| Kind | Shape | Default `missedPeriods` | Seed examples |
|---|---|---|---|
| `fixed-annual` | `{ month, day }` — the same calendar date every year | `serial` | TIDC practice-time report (Oct 15); W-2/1099-NEC (Jan 31); the franchise annual report (May 15, the day before "before May 16"); the rendition (Apr 15) |
| `fixed-quarterly` | `{ dates: [{month, day} ×4] }` | `serial` | Form 941 (Apr 30 · Jul 31 · Oct 31 · Jan 31, computed from the rule sentence) |
| `fixed-monthly` | `{ day }` | `collapse` | trust-account reconciliation (a PRACTICE cadence, §7.3); the backup heartbeat review |
| `anniversary` | `{ anchorDate, everyYears }` — `everyYears` defaults to 1; the next due is the anchor's month/day `everyYears` after the last; the anchor is HIS date, entered once | `serial` | bar dues (his dues-statement date); malpractice renewal; MCLE compliance-year end; domain, M365, CloudLex, Supabase renewals; the notary commission (`everyYears: 4`); the guardianship certificate (2, then 4); the assumed-name certificate (10) |
| `interval-from-completion` | `{ days }` — next due = last completion + days; **the FIRST occurrence is due NOW unless he enters a last-done date** (`FOD-16`) | `collapse` (by construction) | backup restore test (quarterly, `BR-3`); the database restore test |
| `one-time` | `{ dueOn }` — a single dated occurrence; the obligation retires itself when done | — | the LegiScan key rotation (`M-4`, *"after the T3 build"* — the LegiScan poller tier's `T3`, a `T` series `Q-WF-2` flags as ambiguous; `FOT-32`) once it has a date; DMARC after go-live |

**A `precision` flag on any dated kind** (`FOD-17`): `day` (the default) or `month` — for an obligation whose exact day is unknown until the bill arrives (a subscription renewal, the dues statement): `month` lights on the 1st and falls due on the last day of the month; the occurrence's `dueOnOverride` (§3.3) takes the real date when it is known.

**Rules the kinds share (all defaults, §12):** no automatic weekend/holiday roll (`FOD-1`); dates are stored as naive local `YYYY-MM-DD` like `calendar_events.start_local` (`FOD-3`); a rule change re-evaluates the OPEN occurrence's due date, touches no DONE occurrence, and **never moves an OVERDUE occurrence later** (`FOD-4`).

### 3.3 `FirmObligationOccurrence` — the dated instance
| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `obligationId` | uuid → `firm_obligations` | |
| `periodLabel` | text | `2026` · `2026 Q3` · `2026-10` · `2026–27` (a membership year) — derived from the rule, stored for display and for the Outlook subject |
| `dueOn` | date (naive local) | computed from the rule when the occurrence is materialized (§4.1) |
| `dueOnOverride` | date, nullable | THIS occurrence's real date when it differs from the rule's (the carrier's invoice date, the bar's statement); logged (`FOD-6`); the effective due date is `dueOnOverride ?? dueOn` |
| `state` | enum | `open` \| `done` — **that is all that is stored.** "Pending" (not yet in the window), "lit" (in the window) and "overdue" (past the effective due date) are DERIVED from `leadDays`, the effective due date and `today` at render time; nothing flips them, because nothing runs on a timer (§4.1) |
| `doneOn` | date, nullable | HIS date, defaults to today |
| `doneBy` | uuid, nullable | `auth.uid()` at completion |
| `outcome` | enum, nullable | `completed` \| `not-applicable` — the second only on a `conditionalPerPeriod` obligation, with a required `outcomeReason` (§4.2) |
| `outcomeReason` | enum, nullable | `condition-not-met` \| `performed-elsewhere` — required with `not-applicable` |
| `doneNote` | text, nullable | a confirmation number, "filed on the portal", "no wages paid this year" |
| `filedAt` | text, nullable | where the proof lives (a URL, a folder, a document name) — a pointer, never a stored file (`DA-*` is open) |
| `outlookEventId` / `syncStatus` / `syncError` / `lastSyncAt` | | the SAME four sync fields `calendar_events` carries, so the push queue can drain both (§5.3) — present if `Q-FO-5` rules a push |
| `createdAt` / `updatedAt` | | |

**Exactly ONE occurrence per obligation is ever `open`** (`FOD-5`). The next one is materialized when the current one is done (§4.1). History is the list of `done` occurrences.

---

## §4 — BEHAVIOUR (`FO-2`: lit until done; no snooze)

### 4.1 Materialization, and what a missed period does
- Creating an obligation materializes its FIRST occurrence from the rule (for `anniversary`, the first due date on or after today; for `interval-from-completion`, TODAY unless he enters a last-done date, in which case `lastDone + days` — `FOD-16`; for `one-time`, `dueOn`).
- Marking an occurrence done materializes the NEXT one from the rule. **What "next" means depends on `missedPeriods`:**
  - **`serial`** (filings and dated duties — `fixed-annual`, `fixed-quarterly`, `anniversary` by default): the next PERIOD's occurrence, **even if its due date is already past** — a report completed two years late produces the next year's occurrence immediately overdue, because each missed period was a real missed return. A missed period is never skipped silently.
  - **`collapse`** (cadences — `fixed-monthly`, `interval-from-completion` by default): the next occurrence is the first rule date AFTER the completion date — a reconciliation done in September reconciles to date; there is no separate "March reconciliation" owed, and the module does not manufacture a backlog of six overdue rows for one duty. `FO-2` says the current duty stays lit; it does not say the software invents past ones.
- Nothing materializes on a timer. There is no background job (the app has no server-side identity — `#85`; `Q-WF-4` is the open question), so occurrences exist from the moment the obligation exists and "lit" / "overdue" are computed from `today` at render time.
- **Early completion is allowed** (`FOD-15`): a not-yet-lit occurrence can be marked done (malpractice paid four months early on the carrier's invoice; MCLE finished in January for a July compliance month); the next materializes as usual.

### 4.2 The closes: DONE, and — only where the duty can lapse — NOT APPLICABLE
- **Done** → `state = done`, `doneOn` (defaults to today, editable), `outcome = completed`, optional `doneNote` and `filedAt` → the next occurrence materializes → a `review_log` entry (`FOD-6`).
- **Not applicable this period** — offered ONLY on obligations flagged `conditionalPerPeriod` (no wages paid this year → no W-2; no tax owed for the period → no franchise report). `state = done`, `outcome = not-applicable`, **`outcomeReason` REQUIRED** (`condition-not-met` | `performed-elsewhere`) with a note → the next occurrence materializes. It closes the period for good; it is the recorded-decision shape the heartbeat design names (*"Escapes should write a decision, not merely silence a thread"*, `case-heartbeat-design.md` §6 item 16). **On every other obligation it does not exist**: bar dues, MCLE, the practice-time report, the PIR, insurance — the exits are Done or Retire (§4.5), so "not applicable" can never become a twelve-month snooze on a *"do or die"* item (`FOD-18`).
- **Undo** — within the same period, "mark not done" reopens the occurrence, deletes the materialized next one if it is still untouched, reverts the Outlook event (§5.3) and writes a second `review_log` entry recording the reversal (`FOD-7`).
- **There is no "later", no "remind me", no dismiss, and no bulk action anywhere on the surface** (`FOD-19`; the heartbeat's *"No bulk affordance exists anywhere in the interruption path"* applies here with more force, because the whole point of `FO-2` is that these cannot be waved away). §13's `Q-FO-2` asks whether a THIRD state he uses in practice — "delegated to <person>, waiting" — is missing; if so it is a marker on an OPEN occurrence, never a close.

### 4.3 Lit, overdue, quiet — and the two horizons
- `open` and `today ≥ effectiveDue − leadDays` → the occurrence is LIT and renders on the register (§5.2) until done.
- `today > effectiveDue` → **overdue**: rendered first, in the warning colour the `WorklistCard` already uses, with the day count. It stays that way for months if that is what happens; nothing ages it out.
- **The dashboard card has its OWN, shorter horizon** (`FOD-14`): overdue items and items due within 14 days — so that a January with W-2s, 1099s, a 941 and two monthly cadences lit does not make the un-waveable signal into wallpaper. The lead window is the register's horizon; the card's is the week or two ahead. Nothing lit or overdue → the card renders NOTHING (the `WorklistCard compact` precedent: *"renders nothing when there's nothing to do"*). The register always renders.
- **No automatic weekend/holiday roll** (`FOD-1`) — and the display never prints a legal conclusion about it: an occurrence due on a Saturday reads *"due Sat Jan 31 — a next-business-day rule may apply; not computed"* rather than "overdue" on the Sunday.

### 4.4 Weight (`Q-FO-6`)
`hard` (licence, filing, insurance, and whatever he names *"do or die"* — the heavy set named back to him at `#137`, *"bar dues, malpractice renewal, IOLTA reconciliation, CLE hours"*, is the entry's enumeration; his words were about that set) sorts above `routine` (infrastructure cadences, memberships) at equal due proximity. **Claude's lean (`FOD-11`, `Q-FO-6`): routine items live on the REGISTER only and never on the dashboard card, so the card carries only what is *"do or die"*; the alternative is both classes on the card with the stronger emphasis on `hard`.** **Weight never changes behaviour**: a routine item is as lit-until-done as a hard one.

### 4.5 Retire, edit, history
- Retiring an obligation (`active = false`) closes nothing retroactively: an OPEN occurrence stays lit until done or (where offered) not-applicable, then no next one materializes (`FOD-8`). This keeps *"stays lit until done"* from having a back door.
- Editing the rule, the lead, or an occurrence's `dueOnOverride` re-evaluates the open occurrence (§3.2's rules, including "never later when overdue") and writes a `review_log` entry.
- History is read-only: done occurrences are never edited except through undo (§4.2).

### 4.6 What this is NOT
Not the heartbeat serializer (matter threads; one-at-a-time asks; snooze with a duration). Not the deadline engine (court- and firm-track matter dates computed from rules and orders). Not a task list. Not a ledger. A firm obligation is *"a date, a name, and it stays lit until done"* — the `#137` entry's statement of `FO-3`, which he confirmed (*"Yeah. So it's right."*) — with a place to record that it was done and where the proof is.

---

## §5 — SURFACES

### 5.1 The dashboard card on `/cases`
A second compact card beside the existing `WorklistCard` (the `O3` precedent, as `CaseListPage.tsx`'s own comment records it: *"O3 (Michael, 2026-07-25): the re-verification worklist surfaces on the landing page, not just the registry screen"*), rendered only when a `hard` item is overdue or due within the card horizon (`FOD-14`; routine items stay on the register, `FOD-11`): **"Firm obligations — N due · M overdue"**, then the first three lines by due date (*"TIDC practice-time report · due Oct 15 · 12 days"*), linking to the register. **Its wording, its position above or below the legal-watch card, whether three lines is the right number, and the 14-day horizon itself are hands-on items (§11) — the card must be looked at, not described.**

### 5.2 The register page — `/firm/obligations` (nav label **"Obligations"**; both PROPOSED, `FOD-12`)
**A twelve-month view**, every active obligation's next occurrence grouped by month, the current month first, with **Overdue** pinned at the top: each line name · effective due date · period · owner (only when it is not the firm) · weight glyph · **[Done]** · **[Not applicable…]** (only on `conditionalPerPeriod` rows; opens the reason and note) · an expander with the source note, the notes, `filedAt`, and the history of done occurrences. Done is allowed on a not-yet-lit occurrence (`FOD-15`). Above the months: **[Add obligation]** — from the seed catalog (§7) or blank — and, per row, edit (rule, lead, weight, `dueOnOverride`) / retire. The seed catalog offers templates; **it never creates an active obligation without his hand and his date** (`FOD-9`). *(Why twelve months and not "next 90 days": a solo wants the year at a glance — when the renewals land — and a 90-day list hides the occurrence he wants to mark done early.)*

### 5.3 Outlook (`Q-FO-5`) — the object, the calendar, and the reminder are one question
The Outlook requirement statement: *"Every calendar event created in the case management software is pushed to Michael's Outlook calendar automatically. Outlook is always the complete picture of his schedule"* (`outlook-calendar-sync.md`). **Three facts shape the choice:** (i) the app has no channel of its own — nothing reaches him unless he opens a page, so Outlook is the only surface that can make a lead window FELT; (ii) an all-day event on `dueOn` fires Outlook's default reminder the evening before and then scrolls silently into the past — the one thing `FO-2` forbids; (iii) the app's only Graph scope is `Calendars.ReadWrite` — a To Do task (`/me/todo/lists/{id}/tasks`: a due date, a reminder, stays overdue until completed, on every Outlook surface including the phone) is the object whose semantics match "lit until done", **at the cost of a new delegated-consent act (`Tasks.ReadWrite`) on the SPA registration**.
**Claude's lean (`FOD-10`):** an all-day event on the effective due date in a SEPARATE dedicated calendar (**"MDBP Firm"** beside `MDBP Cases` — Outlook, and Outlook mobile above all, toggles CALENDARS cleanly and filters CATEGORIES poorly, which is `FO-1`'s *"DISTINGUISHABLE and filterable out"* answered where he will actually look), subject **"Firm obligation: <name> (<period>)"**, body line **"Firm obligation — no matter"**, category `MDBP Firm`, the existing extended property carrying **`FIRM|<obligationId>|<occurrenceId>`**, and **`isReminderOn` with `reminderMinutesBeforeStart` = the lead window** so the lit moment reaches him; pushed on materialize, PATCHed on any due-date change, reverted on undo. The To Do route is named as the better semantic match if he will grant the scope. Whether a done event is kept with a "Done — " prefix or deleted is a hands-on item (§11) — it is seen in his Outlook, not described. **The push path needs a no-case variant of `toGraphEvent`** — a build item, not a design question — and inherits the first-edit duplication defect until that is fixed elsewhere.

### 5.4 The per-case Calendar tab — firm obligations do not appear there (`FOD-13`; `FO-6` stays on the queue)
`FO-1`'s own consequence: *"the calendar view must make firm obligations and matter deadlines DISTINGUISHABLE and filterable out when looking at one case."* At HEAD there is no firm-wide calendar to distinguish them IN, and the per-case tab is by definition one case — **so the DEFAULT this spec takes is that they never render on a case's tab** (`FOD-13`; his veto open — `FO-1`'s wording contemplated presence-with-a-filter, and if he wants them visible-but-filtered on the tab, that is a one-line change). Whether a firm-wide calendar page should exist, and how the two kinds would read on it, is exactly the kind of question that waits for the product (`CC-1(b)`); it is `FO-6` and stays on the hands-on queue.

---

## §6 — STORAGE SHAPE — Claude's recommendation, for his confirmation (`Q-FO-1`); NOT a schema act

**Recommended — two new tables.** `firm_obligations` and `firm_obligation_occurrences` as in §3, each with RLS, the standard policy, the GRANT and a probe entry **in the same commit as the table** (the CD-1 precedent and the test that pins `SCHEMA_TABLES` sequence-identical to `db/schema.sql`); `created_by` + trigger on `firm_obligations` (`F-25`); the demo adapter's store to **v17** with the same two collections and the seed-catalog templates inactive. Why: `calendar_events` is matter-keyed by a `NOT NULL` that every reader relies on, and an occurrence has semantics (`done`, outcome, next-materialization, the one-open rule, `missedPeriods`) that a calendar event does not; the Outlook projection (§5.3) is where the two kinds meet, and that projection already keys on an id rather than on a table. **This chooses AGAINST the literal reading of `FO-1`'s "a new SCOPE, not a new type"** — one obligation model with `scope ∈ {matter, firm}` — because the matter side of that model is the unbuilt deadline engine, and building the firm side into `calendar_events` now would put done/outcome/recurrence columns on a table whose other rows never use them, with a null check on every existing reader.

**The alternative, stated so the choice is visible:** widen `calendar_events` — `case_id` nullable, a `scope` column, the occurrence fields. Cheaper by one table; the costs are the ones above. **A third shape:** two tables now, and a read-only projection into a firm-wide calendar list later, if one is ever built (§11).

**Either way, NO MIGRATION IS AUTHORIZED BY THIS DOCUMENT.** A confirmed shape becomes a build slice with its migration written-not-run under the standing pattern (`CCS-1`'s: written by the build session, run by Michael's hand, checks answered in words).

---

## §7 — THE SEED CATALOG — obligation templates, each with its source and its status

**How to read this table.** Every row is a TEMPLATE the register offers; nothing is created until Michael activates it with his own date, in the product, at activation (`FOD-9`) — **the sitting rules which templates are OFFERED and which are ACTIVE at go-live, not the dates** (sheet, DECISION 9). *Source* names the primary-source read behind the row; the source-read record (`docs/record/firm-obligations-design-2026-09-07/source-read-record-2026-09-07.md`) carries the verbatim text. *Status* vocabulary, all of it: **UNVERIFIED** (read at source by this pass; only Michael verifies), **TIER B** (read through a summarizing fetch layer — `#80`'s provenance term — not quotable as rule text; eCFR pages, request date 2026-09-07, `up_to_date_as_of` 2026-09-03), **NOT HELD** (the source is not in the Knowledge Repo — an acquisition ask, §7.8), **NOT READ** (the source exists and was not read this pass, or sits outside every SOURCING channel), **HIS FACT / HIS TO STATE** (no law, or a fact about his firm — never inferred here), **PRACTICE** (a cadence he sets; no rule requires it), **EVENT-DRIVEN** (real, but not a recurring obligation — recorded so nobody seeds it as one), **DO NOT SEED** (read at source; no obligation exists). **CONDITIONAL** rows apply only if a stated fact about the firm is true; the fact is his to state, and this pass did not ask, sweep or infer it. Catalog rows carry packet-local `FOT-` labels (§15), never bare `T`-numbers — the record already carries two colliding `T` series.
**Leads are starting values, and every one of them is a hands-on item** (§11 item 6) — a lead is right when he has felt one light too early or too late.

### 7.1 Licensing (attorney-scoped)
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Conditional on |
|---|---|---|---|---|---|---|---|
| `FOT-1` | **State Bar membership fee** (annual dues) — **with the $65 legal services fee as a NOTE on the same row** — it is assessed annually on each active member (§ 81.054(j)); whether it is billed with the dues is HIS FACT | `anniversary` — the due date on his dues statement (the statute leaves the date to bar rule, § 81.054(e)–(f)); `precision: month` until the statement arrives; period label his membership year (*"2026–27"*) | 45 d | hard | Tex. Gov't Code § 81.054(a), (e)–(k) — official corpus 2026-08-14 (the (g)/(h) late-renewal multipliers and the (i) 30-day expiration notice are quoted in the record) | UNVERIFIED; the due date itself is in the State Bar Rules — **NOT HELD** | — |
| `FOT-2` | **MCLE compliance** | `anniversary` — the end of his MCLE compliance year (his MCLE record) | 90 d (a hands-on lead; may want more) | hard | Tex. Gov't Code § 81.113(b)–(c) (participation *"to the extent required by the supreme court to maintain the person’s state bar membership"*; an ethics/professional-responsibility component is presupposed by (b)); the hours, the size of the ethics component and the compliance month are in the State Bar Rules / MCLE Regulations | UNVERIFIED (statute) + **NOT HELD** (rules) | — |
| `FOT-3` | **Guardianship certification** (the State Bar course; four hours incl. one on alternatives to guardianship) — the certificate **expires on the second anniversary** of issuance, or the **fourth** for a renewal after four consecutive certified years; an expired certificate ends eligibility for appointment | `anniversary` — the certificate's issue date, `everyYears: 2` (4 once the (b) condition holds) | 60 d | hard | Tex. Estates Code §§ 1054.201(a)–(b), 1054.202(a)–(b), 1054.203; the course itself, Tex. Gov't Code § 81.114(a) — official corpus 2026-08-14 | UNVERIFIED | he represents interests in guardianship proceedings or takes guardianship ad litem appointments — HIS FACT |

### 7.2 Court appointments (attorney-scoped)
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Conditional on |
|---|---|---|---|---|---|---|---|
| `FOT-4` | **TIDC Attorney Practice Time Report** — ONE obligation, with a per-county checklist in the note (the statute's duty runs *"to the county"* for each county in which appointments were accepted; how many submissions that is in practice is TIDC's form's to say) — on TIDC's form, for *"the preceding fiscal year"* (which fiscal year is the form's to say; Gov't Code § 79.036(a-1) pairs it with the county's own November 1 report for the preceding fiscal year) | `fixed-annual` — **October 15** | 30 d (a hands-on lead) | hard | Tex. Code Crim. Proc. art. 26.04(j)(4) — official corpus 2026-08-14 (verbatim in the record); corroborated by Tex. Gov't Code § 79.036(a-1) | UNVERIFIED | — (which counties: HIS FACT) |
| `FOT-5` | **Appointment-list eligibility — whatever the county's indigent-defense plan requires annually** (CLE hours in criminal law, a re-application) | `anniversary` — per the plan | 60 d | hard | the county's indigent-defense plan — a PUBLIC document (TIDC publishes county plans), **not a named SOURCING channel; not read**; which counties' lists he is on is HIS TO STATE | NOT READ (plan) / HIS TO STATE (counties) | per county |
| — | **Family Code Title 5 (child-protection) appointments — practitioner knowledge, NOT READ, says a second practice-time report and an annual CLE requirement exist for those** | — | — | — | Tex. Family Code §§ 107.0042, 107.004 — **the FA code zip is ABSENT from the corpus** (the acquisition list already names *"AL and FA"* as the recommended minimum) | **NOT HELD** | he takes Title 5 appointments — HIS FACT; seeded only if he does, after the FA read |
| — | **Juvenile (Family Code Title 3) appointment-list CLE** (the juvenile board's plan) — Title 3 appointments are counted in the county's own report (Gov't Code § 79.036(a-1), read) | — | — | — | Tex. Family Code § 51.102 — FA ABSENT | NOT HELD | Title 3 appointments — HIS FACT |

### 7.3 Practice rules
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Note |
|---|---|---|---|---|---|---|---|
| `FOT-6` | **Trust-account reconciliation** | `fixed-monthly` — a day he picks; `collapse` | 5 d | **hard** — his `#137` set names *"IOLTA reconciliation"* among the *"do or die"* items; the weight follows his words, not the rule text | **no cadence in the rule read** — TDRPC 1.15(a) (eff. 3/7/2025) states the record-keeping duty and no reconciliation cadence (and `reconcil` occurs nowhere else in the TDRPC text in that sense); the IOLTA and State Bar Rules are NOT HELD and may say otherwise | PRACTICE | the module must NEVER present it as a rule requirement |
| — | *Trust records preserved five years after termination of the representation* — TDRPC 1.15(a) | **EVENT-DRIVEN** per matter, not a recurring firm obligation | — | — | TDRPC 1.15(a), verbatim in the record | UNVERIFIED | recorded here so nobody seeds it as a calendar item; it belongs to the matter-closing checklist when one exists — `FOT-26`'s annual review is the practice proxy |
| `FOT-7` | **IOLTA program — any annual certification or account notice the program requires** | `anniversary`, undated, **seeded INACTIVE** | — | hard | Rules Governing the Operation of the Texas Access to Justice Foundation — **NOT HELD** | NOT HELD | nothing asserted about what the IOLTA rules require; dated when they are read |
| — | **Attorney advertising / website filings with the State Bar** | **EVENT-DRIVEN** (on dissemination), not recurring | — | — | TDRPC 7.0x — **not read this pass** | NOT READ | a checklist item, not a register row; an annual "website vs the rule" review is optional (`FOT-26`) |
| — | **Successor / custodian attorney designation** (the solo's cessation-of-practice plan) | one-time, then a periodic review | — | — | Texas Rules of Disciplinary Procedure Part XIII — the TRDP PDF IS in `Documents\Knowledge Repo\`; **not read this pass** | NOT READ | offered as a `custom` row if he wants it; strongly advisable for a solo, but nothing here says it is required |

### 7.4 Entity and tax — Texas
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Conditional on |
|---|---|---|---|---|---|---|---|
| `FOT-8` | **Texas franchise tax annual report** | `fixed-annual` — **May 15** (the statute says *"before May 16"*); `conditionalPerPeriod` | 45 d | hard | Tex. Tax Code § 171.202(b); § 171.2022 (no report for a period in which no tax is due); § 171.002(d)(2) (no tax when total revenue ≤ $2.47 million or the § 171.006 figure); § 171.204(b) (the comptroller may not require an information report of such an entity) | UNVERIFIED | whether the PLLC owes tax in the period — HIS FACT, per period |
| `FOT-9` | **Public Information Report** — owed *"regardless of whether the entity is required to pay any tax"*, *"once a year"*; the comptroller forwards it to the secretary of state; the comptroller holds a forfeiture power over a taxable entity's right to transact business (§ 171.2515(a), read — the GROUNDS are in § 171.251, NOT READ) | `fixed-annual` — the statute is silent on the date; **May 15 is the comptroller's form date in practice** (practitioner knowledge — NOT READ; the form's instructions / 34 TAC are outside every channel) | 45 d | **hard** (Claude's call on the consequence class; his to settle) | Tex. Tax Code § 171.203(a)–(c); § 171.2515(a) | UNVERIFIED (statute); NOT READ (the date; the forfeiture grounds) | — |
| `FOT-10` | **Business personal property rendition** — tangible personal property used for the production of income and owned on January 1 (a law office's furniture, computers) is rendered to the chief appraiser *"after January 1 and not later than April 15"*; extension to May 15 on written request; a 10 percent penalty for a late rendition | `fixed-annual` — **April 15** | 45 d | hard | Tex. Tax Code §§ 22.01(a), 22.23(a)–(b), 22.28(a) — official corpus 2026-08-14 | UNVERIFIED | the firm owns income-producing tangible personal property on January 1 — HIS FACT |
| `FOT-11` | **Property tax payment on rendered property** — *"due on receipt of the tax bill and … delinquent if not paid before February 1"* | `fixed-annual` — January 31 | 30 d | hard | Tex. Tax Code § 31.02(a) | UNVERIFIED | a tax bill issued — HIS FACT |
| `FOT-12` | **Assumed-name certificate renewal** — an LLC files with the secretary of state only (§ 71.103(a); the county-clerk limbs were repealed 2019); a ≤ 10-year term, renewable within the six months before expiry *"for any number of successive terms"* | `anniversary` — the certificate's filing date, `everyYears: 10` (renewal window = the lead) | 180 d | hard | Tex. Bus. & Com. Code §§ 71.103(a), 71.151(a)–(c) | UNVERIFIED | the firm holds an assumed-name certificate — HIS FACT |
| — | **Sales tax** | **DO NOT SEED** — legal services are not among the sixteen enumerated *"taxable services"* | — | — | Tex. Tax Code § 151.0101(a), the whole list read | UNVERIFIED (a negative read) | — |
| — | **Attorney occupation tax** | **DO NOT SEED** — Tax Code ch. 191 as downloaded 2026-08-14 holds only subchapters E, F and G; no attorney occupation tax | — | — | Tex. Tax Code ch. 191, whole chapter read | UNVERIFIED (a negative read) | — |
| — | **A separate secretary-of-state annual report** | not seeded — none was found in the sources read (§ 171.203(c) has the comptroller forward the PIR to the secretary of state); the Business Organizations Code was NOT READ | — | — | — | NOT READ | if one exists for a PLLC it is his to add |
| — | **Registered agent** | EVENT-DRIVEN (a change), not recurring; a commercial agent's annual fee is HIS FACT | — | — | Bus. Org. Code ch. 5 — NOT READ | NOT READ | — |

### 7.5 Federal and employment — every row CONDITIONAL on the same fact, asked once: **does the PLLC pay wages to anyone — including Michael himself under an S-corporation election?**
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Conditional on |
|---|---|---|---|---|---|---|---|
| `FOT-13` | **Forms W-2 to employees and W-2/W-3 to SSA** | `fixed-annual` — **January 31**; `conditionalPerPeriod` | 30 d | hard | 26 CFR 31.6051-1(d)(1)(i); 26 CFR 31.6071(a)-1(a)(3)(i) — eCFR pages through the fetch layer, request 2026-09-07, up_to_date_as_of 2026-09-03 | **TIER B** | wages paid in the year |
| `FOT-14` | **Form 941 quarterly** | `fixed-quarterly` — Apr 30 · Jul 31 · Oct 31 · Jan 31 (*the last day of the first calendar month following the period* — the fetch layer's wording; the dates are the module's arithmetic for calendar quarters); `conditionalPerPeriod` | 14 d | hard | 26 CFR 31.6071(a)-1(a)(1) — eCFR page through the fetch layer, request 2026-09-07, up_to_date_as_of 2026-09-03 | **TIER B** | wages paid in the quarter |
| `FOT-15` | **Form 940 (FUTA) annual return** | `fixed-annual` — January 31 (the fetch layer summarized the FUTA paragraph as *due the last day of the first month*; the section itself was not read for it) | 30 d | hard | 26 CFR 31.6071(a)-1 (the FUTA paragraph) — same fetch, same dates | **TIER B (summary only)** | wages paid |
| `FOT-16` | **Texas Workforce Commission quarterly wage report and unemployment contribution** | `fixed-quarterly` — the quarter-end-plus-one-month dates in practice (NOT READ: the report deadline is in 40 TAC, outside every channel; Labor Code chs. 204 and 213 were extracted and searched for a quarterly-report date — the hits are the contribution scheme's quarter references, and no report deadline was found; not a full read) | 14 d | hard | Tex. Labor Code ch. 204 (contributions), ch. 213 (enforcement); 40 TAC § 815.106 | NOT READ (date) | wages paid |
| — | **Workers'-compensation non-subscriber notice to the Division** — *"in the time and as prescribed by commissioner rule"* — and the notice to each new employee *"at the time the employee is hired"* | the Division's schedule is in commissioner rule (28 TAC — NOT READ); the employee notice is EVENT-DRIVEN (at hire) | — | — | Tex. Labor Code §§ 406.004(a), 406.005(a)–(b) — official corpus 2026-08-14 | UNVERIFIED (statute); NOT READ (the schedule) | employees and no workers'-comp policy — HIS FACT |
| — | **PHI training under Texas H.B. 300** — training *"as necessary and appropriate"*, **not later than the 90th day after hire**, and within a year of a material change in the law; the signed completion statement kept six years | **EVENT-DRIVEN** (hire; a change in law) — the once-thought biennial cadence is NOT in the text as downloaded 2026-08-14 | — | — | Tex. Health & Safety Code § 181.101(a)–(d) — official corpus 2026-08-14 | UNVERIFIED | the firm is a "covered entity" under ch. 181 (a broad definition) and has employees — HIS FACT; recorded so the module does not seed a biennial row the section as downloaded does not carry |
| `FOT-17` | **Form 1099-NEC** (and other 1099s: Feb 28 / Mar 31 electronic) | `fixed-annual` — **January 31**; `conditionalPerPeriod` | 30 d | hard | 26 CFR 1.6041-6 — same fetch, same dates | **TIER B** | reportable nonemployee compensation paid in the year (experts, investigators, a contract paralegal) — HIS FACT, likely yes for a PI practice |
| `FOT-18` | **Federal income-tax return(s) and quarterly estimates** | `fixed-annual` / `fixed-quarterly` — **dates seeded from practitioner knowledge and marked NOT READ**: estimates Apr 15 · Jun 15 · Sep 15 · Jan 15; the entity return Mar 15 (S corporation / partnership) or Apr 15 | 30 d | hard | 26 U.S.C. §§ 6654(c)(2), 6072(a)–(b); 26 CFR 1.6072-1/-2 — the U.S. Code has an official online publisher (the Office of the Law Revision Counsel; govinfo.gov) that is NOT a named SOURCING channel — a channel question (`Q-FO-9`) | NOT READ | entity election and estimated-tax posture — HIS FACT; his accountant's dates at activation |
| — | **Form 8300** (cash over $10,000 — criminal-defense fees) | **EVENT-DRIVEN** (within 15 days) | — | — | 26 U.S.C. § 6050I; 26 CFR 1.6050I-1 — NOT READ | NOT READ | a note for the intake checklist, not a register row |
| — | **Beneficial-ownership (BOI) report** | **seeded INACTIVE with the note** — on the TIER B read a Texas PLLC is a domestic entity and exempt; the register remembers the question if the rule moves (an interim rule can be withdrawn) | — | — | 31 CFR 1010.380(c)(1)(ii), (c)(2)(xxiv) — eCFR page through the fetch layer, request 2026-09-07, up_to_date_as_of 2026-09-03 | **TIER B** — his read of the section decides | — |

### 7.6 Insurance, and the notary commission (the insurance rows are firm facts with no law read; the notary row is a source read)
| # | Template | Kind / anchor | Lead | Weight | Source | Status | Conditional on |
|---|---|---|---|---|---|---|---|
| `FOT-19` | **Professional-liability (malpractice) policy renewal** | `anniversary` — the policy's renewal date | 60 d | hard | none (the policy) | HIS FACT | — |
| `FOT-20` | **Other coverage renewals** (cyber, general liability, if held) | `anniversary` | 60 d | hard | none (the policy) | HIS FACT | coverage held — HIS FACT |
| `FOT-21` | **Notary public commission renewal** (four-year term from qualification; a $10,000 bond at appointment) | `anniversary` — his qualification date, `everyYears: 4` | 60 d | routine | Tex. Gov't Code §§ 406.002, 406.010(a) — official corpus 2026-08-14 | UNVERIFIED | he holds a notary commission — HIS FACT |

*(Nothing here asserts that Texas requires malpractice coverage or its disclosure; no rule was read on the point and none is cited.)*

### 7.7 Infrastructure and administration (from `#137` and the record; no law)
| # | Template | Kind / anchor | Lead | Weight | Status / note |
|---|---|---|---|---|---|
| `FOT-22` | **Backup RESTORE TEST — documents** (pull a handful of files from the third copy and confirm they open; `#137`: *"roughly 20 minutes quarterly at 7 GB"*) | `interval-from-completion` — 91 days; **the first occurrence is due NOW** (`FOD-16`) | 14 d | routine | PRACTICE — `BR-3`'s origin case, the reason `FO-1` exists |
| `FOT-23` | **Database RESTORE TEST — the case data** (prove a Supabase backup actually restores) | `interval-from-completion` — 91 days; first due NOW | 14 d | routine | PRACTICE — `BR-3`'s sibling; the documents' third copy is not the database's |
| `FOT-24` | **Backup HEARTBEAT reviewed** — confirm the last successful copy is recent (`#137`: the heartbeat *"shout[s] if that is more than a few days ago"*; a human check until a monitor exists) | `fixed-monthly`; `collapse` | 3 d | routine | PRACTICE — carries `#137`'s hard requirement that monitoring applies to the VENDOR too |
| `FOT-25` | **Firm payment card expiry** — every auto-renewing subscription (Supabase Pro, Postmark, Microsoft 365, CloudLex) rides on it | `anniversary` — the card's expiry, `precision: month` | 60 d | **hard** | HIS FACT |
| `FOT-26` | **Annual closed-file and records review** — the practice proxy for the event-driven duties (trust records five years after termination; file retention/destruction; the website-vs-advertising-rule check) | `anniversary` | 30 d | routine | PRACTICE |
| `FOT-27` | **Domain renewal — `brennanstx.com`** (and any other domain the firm holds) | `anniversary` — HIS DATE | 60 d | **hard** | HIS FACT (the date) — the sign-in sender and the firm's mail ride on it |
| `FOT-28` | **Subscription renewals — Supabase Pro, Postmark, Microsoft 365, CloudLex** (one row each, or one row with a checklist) | `anniversary` — HIS DATE | 30 d | routine (they bill automatically; the dated risk is `FOT-25`) | HIS FACT (the dates) — Supabase Pro: gate 1 depends on it staying Pro; Postmark: gate 9's sender; the token's home is unchanged and never appears here |
| `FOT-29` | **Legal-research subscription — the auto-renewal NOTICE window** (the record names Lexis+ / Protégé) | `one-time` per term — HIS DATE | 60 d | **hard** | HIS FACT (the date) — the classic missed window; the contract governs |
| `FOT-30` | **Office lease — renewal or notice deadline** | `one-time` per term — HIS DATE | 90 d | hard | if leased — HIS FACT |
| `FOT-31` | **County / specialty bar memberships** (SABA, TCDLA, TTLA, sections — whatever he holds) | `anniversary` — HIS DATE | 30 d | routine | optional; register-only |
| `FOT-32` | **LegiScan API key rotation** (`M-4`: *"Rotation after the T3 build is firm"* — the LegiScan poller tier's `T3` build, not the transcription tier; `Q-WF-2` flags the two `T` series as ambiguous) | `one-time` — undated until that build lands | — | hard | HIS FACT (the date); created inactive |
| `FOT-33` | **Model-call credential rotation** (the `H12-v` vendor credential, once a vendor is ruled) | `one-time` — undated | — | hard | HIS FACT (the date, once a vendor is ruled) — created inactive; nothing about the credential's home is decided |
| `FOT-34` | **DMARC** (deferred past go-live, `#126`) | `one-time` — undated | — | routine | PRACTICE — created inactive |
| `FOT-35` | **Security risk analysis** (HIPAA) | `anniversary` — annual by practice | 30 d | routine | 45 CFR 164.308 returned 503 and was NOT READ; the regulation's own word is reported to be "periodic", not annual (practitioner knowledge); applicability is his call; no source text is claimed |
| — | **TBLS board-certification recertification and annual fee** | `anniversary` (5 years) + annual | — | — | HIS FACT — only if certified; not seeded unless he says |
| — | **Federal-court admission renewals** (Fifth Circuit; the Western District) | — | — | — | speculative; local rules NOT READ; HIS FACT |
| — | **New-hire reporting**; **attorney profile / address changes** | EVENT-DRIVEN | — | — | not register rows |

### 7.8 Custom, and the acquisition asks this catalog produces (SOURCING — his hand, permanently)
Anything he adds — name, kind, date, lead. The catalog is a starting list, not a closed set (the heartbeat's *"seeded, never closed"* primitive).
1. **The State Bar Rules** (Supreme Court-promulgated) — Art. III (membership, the dues due date) and Art. XII (MCLE) — and the **MCLE Regulations**. Unblocks `FOT-1`'s date and `FOT-2`'s specifics as rule text. FC-14 class.
2. **The Rules Governing the Operation of the Texas Access to Justice Foundation** (IOLTA). Unblocks `FOT-7`. FC-14 class (a Supreme Court order).
3. **The Family Code zip (`FA`)** — already the acquisition list's recommended minimum; unblocks the two appointment rows in §7.2. Statutes channel.
4. **The county indigent-defense plan(s)** for each list he is on — PUBLIC documents, outside the four channels; whether a fifth channel (TIDC-published county plans) or a per-instance acquisition is wanted is part of `Q-FO-9`. Unblocks `FOT-5`.
5. **A federal-statute channel** (the Office of the Law Revision Counsel / govinfo.gov) — for `FOT-18`, Form 8300 and the like; a SOURCING amendment if he wants it (trigger 3 territory, his call).

---

## §8 — THE REGISTRY BOUNDARY (`Q-FO-7`) — the question this module raises that no earlier module did

BUILD-STATE records, in its own words: *"Registry: the firm's CASES, not its PRACTICE. FOUR research passes stack behind `Q-STAT-5`"*, and, of the `FC-13` ruling, *"the cases-vs-practice boundary stays UNDECIDED."* The one practice-of-law proposition drafted so far is TDRPC 1.04(f) (`FC-13`, *"the registry's FIRST practice-of-law proposition"*), drafted and not inserted.

**This module's seed catalog rests on practice-of-law and practice-administration propositions** — Gov't Code §§ 81.054, 81.113, 81.114, 79.036(a-1); Estates Code §§ 1054.201–.203; CCP art. 26.04(j)(4); TDRPC 1.15(a); Tax Code §§ 171.002(d), 171.202, 171.2022, 171.203, 171.204(b), 171.2515, 22.01, 22.23, 22.28, 31.02, 151.0101; Bus. & Com. Code §§ 71.103, 71.151; Gov't Code §§ 406.002, 406.010; Labor Code §§ 406.004–.005; Health & Safety Code § 181.101. Registry discipline says *"every legal proposition any module relies on is a registry entry with a cite and a verification status."* Two honest readings:
- **(a) They are registry entries** — a NEW file, `docs/specs/legal-rule-registry-firm-obligations.md`, each entry UNVERIFIED with its source named, the obligation's `sourceNote` pointing at the entry, and `Q-STAT-5`'s practice-side research pass folded into it. This makes the boundary a decision by act.
- **(b) They are source notes, not registry entries** — the module presents *"per Tex. Gov't Code § 81.054(j) — UNVERIFIED"* on the template, the registry stays the law of the firm's CASES, and the practice side gets its own register later or never.
**Claude's lean: (a)**, because the module will put a date on Michael's screen with a statute behind it, and `Q-DE-6`'s second limb (packet-local at `deadline-engine-spec.md` §9.2 — whether an unverified proposition may drive a rendered date) has the same answer here as there: it may drive a template and a warning; the date he enters is HIS; the module never computes a legal outcome. **Nothing is inserted by this pass; the drafts are not written until he rules (a).**

---

## §9 — `FO-7`'S TWO FACTS, VERIFIED AT HEAD — and what they do to `FO-3`'s conditional limb

`FO-3`'s conditional limb, in the entry's words: *"IF a QuickBooks integration is genuinely in the build or spec'd, THEN the firm-obligation record carries whatever hook makes the expense side trivial rather than staying deliberately ignorant of it — and THE CONDITION IS VERIFIED AT HEAD BEFORE ANYONE BUILDS ON IT."*

**The two facts, read at `ea5675b` this session (commands in the ledger):**
1. **NOT in the build.** `grep -rli 'quickbooks\|qbo\b\|intuit' src db supabase` → no files (and no substring hit either). BUILD-STATE's line stands: *"none of the 37 tables is a money table"* (now 46, none of them money).
2. **A research memo EXISTS.** `docs/specs/qbo-integration-research-memo-2026-08-15.md` is present at HEAD, status *"PROPOSED — RESEARCH ONLY"*; its questions `Q-QBO-1`–`Q-QBO-8` are register rows; `Q-QBO-2` records that Intuit offers **no read-only OAuth scope**, and `Q-QBO-4` that on the multi-user-only reading gate 2 would not gate a live OAuth connection — two findings that make "make it as easy as possible" a heavier act than the voice ruling assumed.

**Whether a research memo counts as "spec'd" is his call** (runner 82's words: *"being his call"*; the closed register's Status header). **This pass's proposal: thin now, no hook.** The occurrence's `doneNote` and `filedAt` are where a confirmation number and a receipt pointer go; no amount, no payee, no account, no `externalRef`. If a QuickBooks slice is ever authorized, THAT slice adds a nullable `ledgerRef` to the occurrence — a one-column migration — and nothing built now has to be undone. `Q-FO-4` asks him to close `FO-7` on these facts.

---

## §10 — `FO-5`: PER-FIRM OR PER-USER (`Q-FO-3`), and the second axis it hides

The `#137` capture, PART 10: *"Whether firm obligations are per-firm or per-user — never raised. Noted here because a paralegal hire is on the horizon and CLE is per-person."* Facts: gate 2 reads multi-user only; the paralegal-in-the-software design (`HD-12`) is the named second-user event; today there is one user.

**Proposal:** the `ownerScope` field exists from the first migration (`firm` \| `attorney`), the seed catalog marks §7.1–§7.2 `attorney` and everything else `firm`, and at the solo stage the distinction changes NOTHING on screen. At the multi-user phase, an `attorney`-scoped obligation fans out one occurrence per licensed user (the heartbeat's *"one thread per X"* primitive), a `firm` one stays single, and a paralegal never owns a licensing obligation. **Two things named for that phase and not built now:** (i) WHOSE DUTY it is (`ownerScope`) is not WHO DOES IT — a future paralegal might be the one who files the PIR; an `assignee` / "delegated to <person>, waiting" marker on an open occurrence is the second axis (`Q-FO-2`'s third state); (ii) under the one permissive policy a paralegal could mark bar dues Done — Done on an `attorney`-scoped obligation should require the owner or the attorney role once a second user exists, which is a gate-2 item, not a solo-stage one. Alternatives: (2) no field until multi-user (cheaper now, a backfill later); (3) per-user for everything (wrong for insurance and the PIR). **Claude's lean: the field now.**

---

## §11 — `FO-6` AND THE HANDS-ON ITEMS HELD FOR THE PRODUCT (`CC-1(b)`)

`FO-6` is already on the CC-1 hands-on queue (ACCEPTED at `#139`, 2026-08-31, gated *"no firm-obligations concept exists in the calendar code"*). This pass PROPOSES the following for the SAME queue — joining the seven proposed items, PROPOSED until he accepts them — rather than pressing for answers in the abstract; each is better answered looking at a screen:
1. The dashboard card: wording, position relative to the legal-watch card, how many lines before "and N more", and the 14-day card horizon (`FOD-14`).
2. The register page: whether the twelve-month view reads right; the Overdue pin; the Done / Not-applicable affordances' shape (one click with a confirm, or a small form every time).
3. Outlook, seen in his Outlook: the separate calendar vs the same one; the subject; whether a done event is kept with a "Done — " prefix or deleted; the reminder at the lead window; the To Do route if he grants the scope.
4. Whether a firm-wide calendar page should exist at all (the real content of `FO-6`), and whether firm obligations should be visible-but-filtered on a case's Calendar tab (`FOD-13`'s veto).
5. Lead-window defaults, once he has felt one light too early or too late (`FOT-2`'s 90 days and `FOT-4`'s 30 are the first two to watch).
**Gate for all five: the module built on fixtures in demo mode — the same gate as `FO-6`'s.** They join the queue statement at the top of the next typed session, marked PROPOSED.

---

## §12 — NAMED DEFAULTS (packet-local `FOD-` labels; no series minted; each is a decision the record did not make, reported so his veto is open)

| # | Default | Why |
|---|---|---|
| `FOD-1` | **No automatic weekend/holiday roll**, and no "overdue" label printed on the weekend after a Saturday date — the display says a next-business-day rule may apply and is not computed. | the deadline-engine principle *"the engine computes; it does not extend"* (`deadline-engine-spec.md` §5.3); a rolled date on a lawyer's screen is a computed legal outcome, and so is "overdue" |
| `FOD-2` | **Lead window default 30 days**, per-obligation override; the catalog's per-row leads (§7) are starting values and hands-on items. | a round number to be felt, not a rule |
| `FOD-3` | Dates stored as naive local `YYYY-MM-DD`, like `calendar_events.start_local`. | the v0.1 UTC date-opened bug and `F-3`'s `America/Chicago` rulings |
| `FOD-4` | A rule/lead/override edit re-evaluates the OPEN occurrence, never touches a DONE one, and never moves an OVERDUE occurrence LATER. | history is a record; a rule edit must not be a back door out of `FO-2` |
| `FOD-5` | Exactly one `open` occurrence per obligation; the next materializes on DONE — serially (already past if need be) for filing kinds, collapsed to the next future date for cadence kinds (`missedPeriods`, §4.1). | *"stays lit until done"* has no skipped periods and no manufactured backlog |
| `FOD-6` | DONE / not-applicable / undo / rule, lead and override edits each write a `review_log` entry (`entityType = 'firm_obligation_occurrence'` or `'firm_obligation'`) — **and the slice's migration widens `review_log.action`'s CHECK for the new values** (`done`, `not-applicable`, `undone`), because the CHECK admits six values today and no migration has widened it. | the existing audit primitive; the CHECK is a schema fact (§1 item 8) |
| `FOD-7` | Undo is allowed while the next occurrence is untouched; it deletes that next occurrence, reopens this one, and reverts the Outlook event. | mistakes happen; the trail survives |
| `FOD-8` | Retiring an obligation never closes an open occurrence. | no back door out of `FO-2` |
| `FOD-9` | The seed catalog creates nothing active; every activation takes his date, in the product. | the software never guesses a date (`FO-3`: a date, a name) |
| `FOD-10` | If `Q-FO-5` rules a push: all-day events in a SEPARATE dedicated calendar ("MDBP Firm"), category `MDBP Firm`, the `FIRM\|…` extended property, a reminder at the lead window. | §5.3; Outlook stays the complete picture and the lit moment reaches him |
| `FOD-11` | `weight` has two values; `routine` items live on the register only and never on the dashboard card; weight never changes behaviour. | §4.4; `Q-FO-6` |
| `FOD-12` | The register page is `/firm/obligations`, nav label "Obligations". | `/firm` is left free for firm settings and users at multi-user; `Q-FO-0` may rename |
| `FOD-13` | Firm obligations never render on a case's Calendar tab. | §5.4; `FO-1`'s wording contemplated a filter — his veto open |
| `FOD-14` | The dashboard card's horizon is `hard` items overdue + due within 14 days; the register's is the lead window. | §4.3; the un-waveable signal must not become wallpaper |
| `FOD-15` | Done is allowed on a not-yet-lit occurrence. | early completion is real (a carrier's invoice, MCLE done early) |
| `FOD-16` | An `interval-from-completion` obligation's first occurrence is due NOW unless a last-done date is entered. | a restore test never run is overdue by definition |
| `FOD-17` | A `precision: month` rule lights on the 1st and falls due on the last day; the occurrence's `dueOnOverride` takes the real date. | bill-driven dates are unknown until the bill arrives |
| `FOD-18` | "Not applicable" exists only on `conditionalPerPeriod` obligations and requires a reason. | otherwise it is a twelve-month snooze in disguise |
| `FOD-19` | No dismiss, no "later", no bulk action anywhere on the surface. | `FO-2` made concrete — a DEFAULT, not a consequence the ruling states |

---

## §13 — QUESTIONS FOR MICHAEL (full text; packet-local `Q-FO-` labels, no series minted — the `Q-DE-1`–`Q-DE-6` precedent; the ruling sheet puts them in dependency order with options AS A WAY OF ASKING, never a menu — `CC-1(a)`; every lean is Claude's)

- **`Q-FO-0` — Vocabulary.** Does the software call `FO-1`'s scope **"firm obligations"** (keeping "firm deadline" for `FC-7`'s matter track), or does he prefer another word — "practice obligations", "office obligations", or one of his own — before a page carries the label?
- **`Q-FO-1` — Storage shape (a recommendation for confirmation).** Two new tables (§6), a widened `calendar_events`, or two tables plus a later projection? Nothing is migrated by the answer; the answer shapes the slice.
- **`Q-FO-2` — The closes.** (a) Are DONE and — only where the duty can lapse for a period — NOT APPLICABLE with a reason the only closes, with Undo within the period and no snooze, dismiss or bulk action (§4.2)? (b) Do filings behave serially when a period is missed (the next occurrence already overdue) while cadences collapse to the next future date (§4.1)? (c) Is there a THIRD state he uses in practice — "delegated to <person>, waiting" — that should mark an open occurrence without closing it?
- **`Q-FO-3` — `FO-5`, owner scope.** The `ownerScope` field now with fan-out at multi-user (§10), no field until multi-user, or per-user for everything — and does he want the delegated/assignee axis (§10(i)) modelled now or at multi-user?
- **`Q-FO-4` — `FO-7` closure.** On the two facts at `ea5675b` (§9) — no QuickBooks code or table; a PROPOSED research memo only — does `FO-3`'s conditional limb NOT fire, so the register is built thin with no hook, a `ledgerRef` being any later QuickBooks slice's own one-column act?
- **`Q-FO-5` — Outlook.** Push occurrences at all? If so: an all-day event in a SEPARATE "MDBP Firm" calendar with a reminder at the lead window (the lean), the same calendar with a category, or a To Do task (a new `Tasks.ReadWrite` consent on the registration)? Keep-vs-delete on done is held for his Outlook (§11).
- **`Q-FO-6` — Weight.** Two values (`hard` / `routine`) with routine items on the register only, never on the card (the lean); two values with both on the card; one class and date order alone; or his own line?
- **`Q-FO-7` — The registry boundary (§8).** Do the practice-side propositions behind the seed catalog enter the registry as UNVERIFIED entries in a NEW file (`legal-rule-registry-firm-obligations.md`), or stay as source notes on the templates? If entries: the drafts are a later Opus act, each entering UNVERIFIED, on the `FC-13` drafting precedent.
- **`Q-FO-8` — The seed catalog.** Which templates are OFFERED, which are ACTIVE at go-live, and — for the rows where the spec's weight departs from or extends his `#137` words (`FOT-6` hard; the subscriptions routine; the PIR hard) — the weight; **dates and per-period conditions are entered at activation in the product, not at the sitting** (`FOD-9`; `CC-1(b)`).
- **`Q-FO-9` — Acquisitions and channels (§7.8).** The State Bar Rules + MCLE Regulations; the TAJF IOLTA rules; the `FA` zip; the county plan(s) — and whether he wants a federal-statute channel and a county-plan channel named in SOURCING (each a trigger-3 amendment if so).
- **`Q-FO-10` — Rows.** Does he want `FO-1`–`FO-7` and `BR-3` minted as register rows (`FO-1`–`FO-3` born ✅ in the closed register (`CAP-3`) with their ruling text, `FO-4` closed by this spec's existence once ruled, `FO-5`, `FO-6`, `FO-7` ⬜ with the full question text or ✅ if `Q-FO-3`/`Q-FO-4` close them, `BR-3` ⬜ pointing at `FOT-22`) — the minting being his act, per the record?

---

## §14 — WHAT A BUILD SLICE WOULD CONTAIN, ONCE THE QUESTIONS ARE RULED (not authorized; the shape only)

It would be drafted AFTER the sitting, on the `CCS-1` pattern (the slice and its kickoff prompt drafted before the authorization question is put, then put whole and broken into limbs at his instruction), and it would contain: the two tables + RLS/policy/GRANT/probe in one commit, and the `review_log.action` CHECK widened in the same migration; store v17 with the seed templates inactive; the domain module (`src/domain/firmObligations.ts`: rule kinds, `everyYears`, `precision`, `missedPeriods`, materialization, the derived lit/overdue predicates, the one-open invariant, the never-later rule); the adapter methods on BOTH adapters; the register page and the dashboard card; the no-case Outlook variant with the separate calendar and the reminder; `review_log` writes; tests pinning the one-open invariant, serial vs collapsed materialization including the already-past case, no-roll, undo (including the Outlook revert), retire-never-closes, not-applicable refused off a conditional row, never-later; ONE migration written and not run, with STEP 0 counts and checks answered in words; the text acts PROVISIONAL for the walk. It would be fixture-only, outside the GL-1 floor, built by a fresh Opus Code session with the runner barred — the standing shape, not a plan. Smaller than `CCS-1` (no existing-record split, no instrument seams).

---

## §15 — WHAT THIS PASS DID NOT DO, each because a rule bars it or because it is his

Nothing built; no `src/` edited (read over the bridge for verification only, each file named in the ledger); no schema act, no migration written; no ID minted — `FO-`, `BR-`, `DA-` are carried from `#137` as PROPOSED ids, and `Q-FO-`, `FOD-`, `FOT-` are packet-local handles declared here and collision-checked free repo-wide at `ea5675b` (each 0 hits; the record's two existing `T` series — the transcription tier and the LegiScan poller tier — are why the catalog does not use bare `T`-numbers); no registry file touched and no entry drafted; no fact about the firm asserted (payroll, entity election, an assumed name, a notary commission, guardianship work, which appointment lists, subscription dates, insurance — all HIS FACTS, none asked, none swept, none inferred); nothing about the third-copy vendor (`BR-1`), the mobile document view (`DA-*`), or `H12-v`; no legal currency verified; no ruling recorded — Michael made none in this sitting, and every proposal above is PROPOSED until he does.
