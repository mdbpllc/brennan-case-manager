# FIRM OBLIGATIONS — THE RULING SHEET for the firm-obligations sitting

**Status:** RULING-class sheet (`CAP-2`) — the sheet Michael rules from. PROPOSED in every line; nothing on it is ruled until he speaks. Drafted 2026-09-07 (evening, Central) by the design pass that wrote `docs/specs/firm-obligations-module-spec.md` (the SPEC) and revised on the PF-1 preflight's findings and again on the re-sweep's; every decision here points at the spec section that carries the reasoning. **Options are a way of asking, never a menu (`CC-1(a)`): the expected answer is often outside them — a composite, or something adjacent that changes other things — and every decision below ends with room for that. The session running this sheet takes what he actually says, works out what it means for the build, and re-asks narrower. Every lean below is CLAUDE'S lean, labelled so.**
**Canonical repo path:** `docs/specs/firm-obligations-ruling-sheet-2026-09-07.md`
**Labels:** "DECISION 0" … "DECISION 10" are this sheet's own section numbers, local to it (the record's bare `D`-series means other things); each carries its packet-local `Q-FO-` label from the spec §13. Catalog rows are the spec's packet-local `FOT-` labels.
**Session shape (his stated preferences):** ONE decision at a time, in the order below, waiting for his reaction before the next (*"Run through them one by one"*, `#149` DECISION 7; his 2026-09-05 *"Run me through each one step by step"* as the `#149` ledger records it); each answer written into a running ledger in his words within the exchange (the 2026-08-31 practice); the sitting may be typed or voice — a voice sitting runs on a supported model and its wrap is run in typed mode (`INS-1`, proposed at `#137`). **Hands-on items are NOT on this sheet** — they wait for the product (`CC-1(b)`) and are listed at the foot.
**Before the first decision:** the session reads `session-log-head.md` and `BUILD-STATE.md` whole at HEAD, confirms the SPEC is at its canonical path unchanged, states the CC-1 hands-on queue, and re-reads the SPEC's §1 facts at THAT head — `ea5675b` is this sheet's basis and the build may have moved.
**Rendered examples (added 2026-09-08, `#152`; PROPOSED, nothing ruled):** `docs/specs/firm-obligations-rendered-examples-2026-09-08.md` maps every DECISION below to a panel of an interactive mock of the module — the claude.ai artifact "Firm Obligations Mock", filed as `docs/record/firm-obligations-design-2026-09-07/firm-obligations-mock-2026-09-08.html` — and carries fifteen findings (`FOM-1`–`FOM-15`) the rendering exposed, each attached to a decision and put right after it. Open it beside this sheet; where the two differ, this sheet governs.

**RULED 2026-09-10 (`#155`) — every decision on this sheet is ruled.** The answers, in Michael's words, are in `docs/specs/firm-obligations-rulings-2026-09-10.md` §1–§2 (DECISION 0–10 and `FOM-1`–`FOM-15`); the slice is authorized at its §3 (`FOS-1`); the sheet stands as authored — the option text was his to select from, not to edit, and the `**Michael:** ______` lines are left blank on purpose so the record shows the sheet as put.

---

## THE ORDER, AND WHY

Vocabulary first because a label is cheap now and expensive after a page carries it. Then the behaviour (DECISIONS 1 and 2), because everything else serves it. Then the storage recommendation, because it follows the behaviour. Then the three that close open `FO-` items (`FO-5`, `FO-7`, weight). Then Outlook. Then the registry boundary and the acquisitions, which need nothing above but are heavier. Then the catalog — which templates are offered and active, never their dates. Then rows. **The slice authorization is NOT on this sheet** — the slice is drafted after the rulings and put whole in its own act (the `CCS-1` pattern).

---

## DECISION 0 — `Q-FO-0` — THE WORD (SPEC §2)

**Question.** The record already uses "firm deadline" for `FC-7`'s MATTER-scoped internal-buffer track (*"'Firm deadlines' are those that are set by the firm"*, his words 2026-08-18). `FO-1`'s scope — bar dues, MCLE, the TIDC report, the restore test — is something else. The spec proposes **"firm obligation"** for the new scope and never "firm deadline". **Is "firm obligation" the word, or does he prefer another?**
**Starting points (Claude's lean first).** (1) "Firm obligations" — it is the phrase he used at `#137`; (2) "Practice obligations"; (3) "Office obligations"; (4) a word of his own, or "obligations" alone with the firm/matter split carried by the page.
**What the answer changes.** The nav label (`FOD-12`, `/firm/obligations` → "Obligations"), the card title, the table names' prefix, every heading in the spec.
**Michael:** ______

## DECISION 1 — `Q-FO-2`(a) and (c) — THE CLOSES (SPEC §3.3, §4.2)

**Question.** Each obligation has exactly ONE current occurrence, and it closes in only two ways: **Done** (date + optional note + where the proof is), or — ONLY on obligations whose duty can lapse for a period (no wages this year → no W-2; no tax owed → no franchise report) — **Not applicable this period**, with a required reason. Undo within the period. On bar dues, MCLE, the practice-time report, the PIR, insurance, there is no "not applicable" at all: Done or Retire. No snooze, no "later", no dismiss, no bulk action. **Is that the behaviour he wants — and is there a THIRD state he uses in practice (*"delegated to <person>, waiting"*) that should mark an open occurrence without closing it?**
**Starting points (Claude's lean first).** (1) As drafted — two closes, "not applicable" only where the duty can lapse; (2) as drafted PLUS a "delegated — waiting on <person>" marker that is NOT a close and stays lit, showing who has it (a future paralegal might be the one who files the PIR); (3) something adjacent — e.g., "Done" should always ask for a confirmation number on filings; or he never wants "not applicable" and would rather retire and re-add; or another shape of his.
**What the answer changes.** The `outcome`/`outcomeReason` enums and the `conditionalPerPeriod` flag (SPEC §3.3), `FOD-18`, `FOD-19`, the register's buttons; option (2) adds an `assignee` axis (SPEC §10).
**Michael:** ______

## DECISION 2 — `Q-FO-2`(b) — WHAT A MISSED PERIOD DOES (SPEC §4.1)

**Question.** A filing missed for a period stays a real missed filing: finishing the 2025 practice-time report in 2027 produces the 2026 occurrence already overdue, and so on until he is current (**serial**). A cadence — the monthly trust reconciliation, the backup heartbeat review — does NOT manufacture a backlog: a reconciliation done in September reconciles to date, and the next occurrence is the next future month (**collapse**). `FO-2` says the current duty stays lit; the spec reads it as not saying the software invents past ones. **Is that split right, and is the default assignment (filings serial; cadences collapse) right?**
**Starting points (Claude's lean first).** (1) As drafted; (2) serial for everything — every missed period is a row until he clears it; (3) collapse for everything — only the current period is ever lit; (4) a per-obligation choice with a different default than the spec's, or a composite of his.
**What the answer changes.** `missedPeriods` and its defaults; `FOD-5`.
**Michael:** ______

## DECISION 3 — `Q-FO-1` — WHERE IT LIVES — Claude's recommendation, for confirmation (SPEC §6)

**Recommendation.** Two new tables — `firm_obligations` and `firm_obligation_occurrences`, RLS/policy/GRANT/probe in the same commit, store v17 on the demo side — rather than widening `calendar_events` (making `case_id` nullable and adding a `scope`). **Nothing is migrated by the answer; it shapes the slice.** Reason: `calendar_events.case_id` has been `NOT NULL` since the 2026-07-24 Outlook build and every reader relies on it; an occurrence has done/outcome/next-materialization semantics a calendar event does not; and this chooses against the literal reading of `FO-1`'s *"a new SCOPE, not a new type"* because the matter side of that one-model reading is the unbuilt deadline engine. **Does he confirm the recommendation, or does he see the storage the other way?** (This is an engineering call put for his confirmation — the `#149` limb-3 shape — not a workflow question.)
**Starting points (Claude's lean first).** (1) Two tables (the recommendation); (2) widen `calendar_events`; (3) two tables now, a read-only projection into a firm-wide calendar list later, if one is built; (4) his own shape.
**Michael:** ______

## DECISION 4 — `Q-FO-3` — `FO-5`: PER-FIRM OR PER-ATTORNEY, AND WHO DOES THE WORK (SPEC §10)

**Question.** CLE, dues and the practice-time report are per licensee; the PIR, insurance and the backups are the firm's. Today both are him. **Does the register carry an owner scope from the first migration (`firm` / `attorney`, changing nothing on screen at the solo stage, fanning out per licensed user at multi-user), or wait until there is a second user?** And, if DECISION 1 took the delegated marker: **is WHO DOES IT (an assignee — a future paralegal filing the PIR) modelled now, or at multi-user?**
**Starting points (Claude's lean first).** (1) The owner-scope field now; the assignee axis at multi-user; (2) no field until the multi-user phase; (3) per-user for everything (rejected as the lean because insurance and the PIR are not per-user); (4) both axes now, or his own split.
**What the answer changes.** Two columns now or later; at multi-user, that Done on an `attorney`-scoped obligation needs the owner or the attorney role (a gate-2 item either way).
**Michael:** ______

## DECISION 5 — `Q-FO-4` — `FO-7`: DOES `FO-3`'S QUICKBOOKS LIMB FIRE? (SPEC §9)

**Question.** The limb fires only *"IF a QuickBooks integration is genuinely in the build or spec'd"*, verified at HEAD. At `ea5675b`: **no QuickBooks code or table exists in `src/`, `db/` or `supabase/`; a research memo exists** (`qbo-integration-research-memo-2026-08-15.md`, PROPOSED — RESEARCH ONLY) and records that Intuit offers no read-only scope. **On those two facts, is the register built THIN with no hook — a confirmation number and a "filed at" pointer being the only money-adjacent fields — with any later QuickBooks slice adding its own `ledgerRef` column?** Whether a research memo is "spec'd" in the sense he meant is his call (runner 82's words: *"being his call"*).
**Starting points (Claude's lean first).** (1) Thin, no hook; `FO-7` closes on the two facts; (2) thin, but reserve a nullable `externalRef` column now; (3) the memo counts as "spec'd" — the limb fires and the slice carries an expense-side hook designed against the memo (heavier; `Q-QBO-2`'s no-read-only-scope finding applies); (4) his own reading of the condition.
**What the answer changes.** One nullable column, and whether `FO-7` closes.
**Michael:** ______

## DECISION 6 — `Q-FO-6` — WEIGHT (SPEC §4.4)

**Question.** Two classes — `hard` (licence, filing, insurance, and whatever he calls *"do or die"*) and `routine` (cadences, memberships) — affecting ORDER and EMPHASIS only, never behaviour; or one class and date order alone? **And a composite worth naming: routine items live on the register only and never on the dashboard card.**
**Starting points (Claude's lean first).** (1) Two classes, routine on the register only (the composite); (2) two classes, both on the card; (3) one class; (4) his own line.
**What the answer changes.** One enum column; the card's sort and contents; nothing else. (Which ROWS are hard is DECISION 9's business — his `#137` words named four items; every other weight in the catalog is Claude's call, and DECISION 9 Part B says so row by row.)
**Michael:** ______

## DECISION 7 — `Q-FO-5` — OUTLOOK: THE OBJECT, THE CALENDAR, THE REMINDER (SPEC §5.3)

**Question.** The app has no channel of its own — nothing reaches him unless he opens a page — so Outlook is the only surface that can make a lead window FELT. An all-day event on the due date fires the evening before and then scrolls into the past; a To Do task stays overdue until completed on every Outlook surface including the phone, but needs a new consent (`Tasks.ReadWrite`) on the registration, which today holds `Calendars.ReadWrite` alone. Outlook mobile toggles CALENDARS cleanly and filters CATEGORIES poorly. **Does he want occurrences pushed at all, and if so as what, where, with what reminder?**
**Starting points (Claude's lean first).** (1) An all-day event on the due date in a SEPARATE dedicated calendar ("MDBP Firm"), subject *"Firm obligation: <name> (<period>)"*, with `isReminderOn` and the reminder set to the lead window; (2) a To Do task, granting the new scope; (3) the same "MDBP Cases" calendar with a `MDBP Firm` category; (4) no push — the register and the card are enough; (5) a composite — e.g., event AND task, or a separate calendar with the reminder at seven days rather than the lead — or his own.
**What the answer changes.** The no-case `toGraphEvent` variant; whether the occurrence table carries the four sync fields; a consent act if (2). Keep-vs-delete on done is HELD for his Outlook (foot of this sheet).
**Michael:** ______

## DECISION 8 — `Q-FO-7` — THE REGISTRY BOUNDARY (SPEC §8)

**Question.** The seed catalog rests on practice-of-law and practice-administration propositions (Tex. Gov't Code §§ 81.054, 81.113, 81.114, 79.036(a-1), 406.002, 406.010; Estates Code §§ 1054.201–.203; Code Crim. Proc. art. 26.04(j)(4); TDRPC 1.15(a); Tax Code §§ 171.002(d), 171.202, 171.2022, 171.203, 171.204(b), 171.2515, 22.01, 22.23, 22.28, 31.02, 151.0101; Bus. & Com. Code §§ 71.103, 71.151; Labor Code §§ 406.004–.005; Health & Safety Code § 181.101). The registry has, in BUILD-STATE's words, carried *"the firm's CASES, not its PRACTICE"*, and *"the cases-vs-practice boundary stays UNDECIDED"*. **Do these enter the registry as UNVERIFIED entries in a NEW file, `legal-rule-registry-firm-obligations.md`, with each template's source note pointing at its entry — or stay as source notes on the templates and out of the registry?**
**Starting points (Claude's lean first).** (a) Registry entries, new file, drafts by a later Opus act, each entering UNVERIFIED — the module puts a statute-backed date on his screen; (b) source notes only; (c) entries in an existing file rather than a new one (which one is then a second question); (d) his own boundary.
**What the answer changes.** Whether a drafting act is queued; the `sourceNote` field's meaning.
**Michael:** ______

## DECISION 9 — `Q-FO-9` and `Q-FO-8` — ACQUISITIONS, CHANNELS, AND WHICH TEMPLATES (SPEC §7, §7.8)

**Part A — acquisitions and channels (his hand, permanently).** Five things the catalog wants and the Knowledge Repo does not hold: **(1) the State Bar Rules** (Art. III membership/dues; Art. XII MCLE) with the **MCLE Regulations**; **(2) the Rules Governing the Operation of the Texas Access to Justice Foundation** (IOLTA); **(3) the Family Code zip** (already the acquisition list's recommended minimum); **(4) the indigent-defense plan(s)** for the counties whose lists he is on — public documents outside the four channels; **(5) a federal-statute channel** (the Office of the Law Revision Counsel / govinfo.gov) for the estimated-tax and return dates. **Which does he want, and are (4) and (5) new SOURCING channels (a trigger-3 amendment each) or per-instance reads?**
**Starting points (Claude's lean first).** (1) All five, with (4) and (5) as named channels; (2) the State Bar Rules and the FA zip now, the rest when their rows are activated; (3) none yet; (4) his own set.
**Michael:** ______

**Part B — the catalog, one question, not thirty.** *"Which of these are OFFERED in the register, and which are ACTIVE at go-live?"* — dates, per-period conditions and the firm facts (payroll — including himself under an S election; an assumed name; a notary commission; guardianship work; which counties' lists; which subscriptions) are entered **at activation, in the product** (`FOD-9`; `CC-1(b)`), never here. The only per-row question at the sitting is the WEIGHT: four rows carry his own `#137` words; every other weight is Claude's call, marked so, and any of them is his to change in a word. His answer can be a list, a rule ("everything statutory active, everything infrastructure offered"), or a composite.

| Row | Template | Spec's weight | Weight source | Offered / Active / Neither (his) |
|---|---|---|---|---|
| `FOT-1` | State Bar membership fee (+ the $65 legal services fee as a note) | hard | his `#137` set (bar dues) | |
| `FOT-2` | MCLE compliance | hard | his `#137` set (CLE hours) | |
| `FOT-3` | Guardianship certification (2 yrs, then 4) | hard | Claude's call (conditional row) | |
| `FOT-4` | TIDC practice-time report — Oct 15 | hard | Claude's call | |
| `FOT-5` | Appointment-list eligibility (per the county plan) | hard | Claude's call (conditional row) | |
| `FOT-6` | Trust-account reconciliation (monthly, a practice cadence) | **hard** | his `#137` set (IOLTA reconciliation) — the spec first drafted `routine` on the source-of-law ground and moved it to `hard` on his words; his to settle | |
| `FOT-7` | IOLTA certification (inactive until the rules are read) | hard | Claude's call | |
| `FOT-8` | Franchise tax annual report — May 15 (per-period condition) | hard | Claude's call | |
| `FOT-9` | Public Information Report — May 15 in practice | hard | Claude's call (on the forfeiture power, § 171.2515(a); the grounds NOT READ) | |
| `FOT-10` | Business personal property rendition — Apr 15 | hard | Claude's call | |
| `FOT-11` | Property tax payment — Jan 31 | hard | Claude's call | |
| `FOT-12` | Assumed-name certificate renewal (10 yrs) | hard | Claude's call (conditional row) | |
| `FOT-13`–`FOT-18` | W-2/W-3 · 941 · 940 · TWC · 1099-NEC · returns and estimates — all conditional on wages/payments | hard | Claude's call | |
| `FOT-19` | Malpractice renewal | hard | his `#137` set (malpractice renewal) | |
| `FOT-20` | Other coverage renewals | hard | Claude's call | |
| `FOT-21` | Notary commission (4 yrs) | routine | Claude's call (conditional row) | |
| `FOT-22`–`FOT-24` | Documents restore test · database restore test · backup heartbeat review | routine | Claude's call (`BR-3`, the origin case) | |
| `FOT-25` | Firm payment card expiry | **hard** | Claude's call | |
| `FOT-26` | Annual closed-file and records review | routine | Claude's call | |
| `FOT-27` | Domain renewal | hard | Claude's call | |
| `FOT-28` | Subscription renewals (Supabase, Postmark, M365, CloudLex) | **routine** | Claude's call (they bill automatically) | |
| `FOT-29`–`FOT-30` | Legal-research renewal notice window · office lease notice | hard | Claude's call | |
| `FOT-31` | County / specialty bar memberships | routine | Claude's call | |
| `FOT-32`–`FOT-34` | LegiScan key rotation · model-credential rotation · DMARC (all inactive, undated) | hard / hard / routine | Claude's call | |
| `FOT-35` | Security risk analysis | routine | Claude's call | |
| — | BOI report | inactive with the note | — | |

**Michael:** ______ (a list, a rule, or a composite)

## DECISION 10 — `Q-FO-10` — ROWS (SPEC §1 item 9)

**Question.** `FO-1`–`FO-7` and `BR-3` have no register row; the closed register's own header says minting them is his act. **Mint them now** — `FO-1`–`FO-3` born ✅ in the closed register (`CAP-3`) with their ruling text, `FO-4` closed by the spec once DECISIONS 0–9 are ruled, `FO-5`/`FO-6`/`FO-7` ⬜ with the full question text (or ✅ if DECISIONS 4/5 close them), `BR-3` ⬜ pointing at `FOT-22` — **or leave them roomless?**
**Starting points (Claude's lean first).** (1) Mint — `QR-1` exists because a question with no row is a question that disappears; (2) mint only the ones still open after this sitting; (3) leave roomless; (4) his own subset.
**Michael:** ______

---

## NOT ON THIS SHEET — HELD FOR THE PRODUCT (`CC-1(b)`; PROPOSED for the HANDS-ON QUEUE)

`FO-6` (already accepted onto the queue) plus the five the spec §11 proposes: the dashboard card's wording, position, line count and 14-day horizon; the register's twelve-month view and the shape of the Done / Not-applicable affordances; Outlook as seen in his Outlook — separate calendar vs the same, the subject, keep-with-"Done — "-prefix vs delete, the reminder at the lead window, the To Do route if he grants the scope; whether a firm-wide calendar page should exist and whether firm obligations should be visible-but-filtered on a case's Calendar tab; lead-window defaults once he has felt one. **Gate: the module on fixtures in demo mode.** Claude calls the sitting unprompted when that gate opens (`CC-1(c)`).

## NOT ON THIS SHEET — THE SLICE

The build slice and its kickoff prompt are drafted AFTER DECISIONS 0–10, put whole, broken into limbs at his instruction, and authorized (or not) in their own act. Nothing on this sheet is a build authorization.
