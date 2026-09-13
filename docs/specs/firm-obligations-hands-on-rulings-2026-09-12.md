# THE FIRM-OBLIGATIONS HANDS-ON SITTING AND THE POST-`CCS-1` WALK — RULINGS RECORD, 2026-09-12 (`#156`)

**Status:** RULING-class (`CAP-2`). Canonical repo path `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md`. Filed by the `#156` packet (batch 97). Every pick below is Michael's, quoted verbatim from the running ledger written within the exchange it was made (`docs/record/firm-obligations-hands-on-2026-09-12/ledger-2026-09-12.md`, EVIDENCE); the option text around each pick is Claude's and is never to be quoted as his (CC-1(a)). Where he answered outside the offered set, his words are given first and the narrower re-ask after. DT-1: the sitting ran on 2026-09-12 Central (opened 08:02 CDT; paused ~08:10–22:04; `FOS-2` ruled 23:55 CDT); packaging crossed midnight and the entry keeps the sitting's date.

## §0 — THE SITTING

Typed, Cowork, Fable 5.1 per the environment. Michael ran the app himself in his own Chrome — `npm run dev:demo` → `http://localhost:5175`, demo mode, the `FOD-21` fixture, today's real date driving the states — and ruled from what he saw; Claude gave the click path and put ONE question at a time through the answer widget. Every row on his screen was fiction. Nothing was built, no migration run, no tracked file written, no event created in his Outlook, nothing signed in to. The device bridge was granted on the checkout; the VM shell could not mount it (twice — the 2026-09-10 failure), so every repo read was a staged read-only copy and the packet is delivered by `device_commit_files`.

**Preconditions confirmed by widget:** the migration `db/migrations/2026-09-10-firm-obligations.sql` — *"Not run"*; the demo app — *"Up — Demo mode, Obligations in the nav"*.

## §1 — PART ONE: THE FIRM-OBLIGATIONS HANDS-ON SITTING (the five spec §11 items accepted at `#155`, `FO-6`, and everything the build handed back)

### Item 1 — what may unlight a lit occurrence (spec-feedback 2026-09-12 part C item 1; slice §8 against `FOD-4`)
Put with a lit-but-not-overdue fixture row in front of him and a lead edit that unlights it. First widget: *"I need to to explain this a bit more to me. I am not sure how to answer here."* Explained with one row — annual bar dues due Oct 15, a 30-day lead, an edit on Sep 20 from 30 to 5 — and three outcomes: (A) the edit goes through and the row goes quiet; (B) the edit is refused while the row is lit; (C) lead edits allowed, but a rule or weekend-rule edit that would push a lit row's due date later refused (the override excepted).
**RULED — *"(A) Yes — settings are editable any time"***: a lead, rule or override edit on a NOT-past-due occurrence may unlight or re-date it; only a past-due occurrence is protected from being moved later. **NO code change.** SPEC EDIT: the build slice's §8 first DO-NOT and §7 item 21 are amended to name `FOD-4`'s edits (this packet's exact-match orders); spec §12 `FOD-4` stands in substance. The `FOS-1` build's behaviour is the rule.

### Item 2 — the `/cases` card
Position below the statute-worklist card (`FOD-27`); title "Firm obligations — N due · M overdue", three lines then "and K more", "Open the register", "About these dates" (`FOD-26`, `FOD-24`); the horizon hard AND (overdue OR (lit AND target within 14 days)) (`FOM-13`, `FOD-14`); three departures for his eye — part C items 9 ("1 day" at N = 1), 2 (no day count on an `unknown`-weekend lit row), 10 (a hard past-date item stays on the card indefinitely).
**RULED — *"Confirm as built"***. All three departures ACCEPTED as built. SPEC EDIT: `FOD-14` and `FOD-26` reworded to what the build does (spec §16, this packet). Text acts in this group → CONFIRMED.

### Item 3 — the register
Nav label "Obligations" and page title "Firm obligations" (DECISION 0); "N open · M overdue"; the Overdue pin hard-first-then-most-overdue (`FOM-9`); twelve month groups by target month, "Nothing falls due this month" (`FOM-14`, `FOM-3`); Later; Inactive collapsed (`FOM-5`); "retired — stays until done" (`FOD-33`); the five strong-line states with the `FOD-1` note under `unknown` (`FOD-25`).
**RULED — *"Confirm as built"***. Text acts in this group → CONFIRMED, EXCEPT "Needs attention" (never on screen in demo — stays PROVISIONAL).

### Item 4a — the activation and edit forms
Rule-kind and weekend-rule labels; `FOD-30`'s typed rule date with the template's date as a hint (part B item 8); `FOM-4`'s "last period completed" and its day-precision refusal (part C item 4); "A missed period" — Stays owed / Collapses (DECISION 2); "The real due date for …" / "Set this date" — which sets R, the rule date (part C item 13, wording for his eye).
**RULED — *"Confirm both, override label stays "due date""***. Part C item 13 CLOSED (no rename). Text acts → CONFIRMED.

### Item 4b — the close form, re-activation, double activation
The close form and `FOD-18`'s reasons (Not applicable on the eight conditional rows only); re-activation's three readings (part C item 5: never reopens a closed period; a done one-time refused until re-dated; a first activation from Inactive takes "last period completed"); nothing stops a template being activated twice (part C item 11).
**RULED — *"Confirm all three as built"***. Part C item 5 RULED as built; item 11 CLOSED — double activation stays allowed, no warning, no block. Text acts → CONFIRMED.

### Item 5 — the catalog
All 35 offered (DECISION 9B); "suggested"; "Applies if:"; "Can lapse per period" / "Can lapse for a period (offers Not applicable)"; "Source:"; "Lead … · weight …"; "Nothing here is active until you activate it with your own date."; the BOI note row. No weekend default put (DECISION 8's act, PF-1 there).
**RULED — *"Confirm as built"***. Text acts → CONFIRMED.

### Item 6 — Outlook (DECISION 7, `FOD-22`, `FOD-28`, `FOD-29`, `FOM-8`)

**6(b) — the reminder at the lit moment (his own `FOM-8` question).** First widget (keep all / hard only / drop / closer): *"Let's talk this one through some more to tailor it. I do not want all of the events to carry a reminder."* Two levers put — WHICH events remind; WHEN. His answer, verbatim: ***"Most deadlines in a case need to remind at most 30 days out, except for important deadlines that we need more time to think about, like expert designation deadlines."*** — stated about CASE deadlines; carried as a standing DIRECTION for the matter-deadline engine (`FC-7`'s track, unbuilt; recorded in §4 below), not a build item. Translated for the firm module and put back as a composite: (1) the calendar event on "MDBP Firm" for every occurrence, as built; (2) a reminder rings on HARD items only — routine items get the event, no reminder; (3) the reminder fires 30 days before the target by default, or at the lead if the lead is shorter than 30 — no longer at the full lead; (4) a per-obligation "Outlook reminder days" field at activation and in Edit…, defaulting to 30, raised by hand on the long-think rows; register/card lighting stays at the full lead.
**RULED — *"That looks correct."*** DECISION 7's reminder limb AMENDED; `FOD-29` re-measured from the reminder day. → FIX (the fix slice, A1). The pre-fill-vs-cap reading of limbs (3) and (4) is `FXD-9` of the fix slice and was put inside the `FOS-2` question.

**6(a) — Done → the event.** As built: kept, retitled "Done — …", reminder still on (part B item 10).
**RULED — *"Keep it, retitled, but kill the reminder"***: `FOD-22` AMENDED — Done sets `isReminderOn: false`; Undo restores. → FIX (A2). Part B item 10 CLOSED.

**6(c) — the staleness limitation and the fallback (part B item 14; `FO-2`).**
**RULED — *"Register and card are enough"***: no second-event fallback, no late-push adjustment; the limitation RECORDED AND CLOSED. NO fix.

**6(d)** — the empty "MDBP Firm" calendar left in his Outlook: his hand to keep or delete; put as information only; not a ruling.

### Item 7 — `FO-6` and the leads

**`FO-6`** (row read at HEAD before putting: the calendar view — should a firm-wide calendar page exist; visible-but-filtered on a case tab).
**RULED — *"Firm-wide calendar page, later"***: a month/agenda view of firm occurrences inside the app is WANTED as a separate later slice, not a fix; nothing firm on a case's Calendar tab (`FOD-13` stands). `FO-6` → 🟡, annotated; nothing authorized.

**The leads.** First widget: *"Explain this a bit more for me."* Explained (the lead is the register/card window; after 6(b) the Outlook ring is separate; the shipped values by example — bar dues 60, MCLE 90, franchise tax 45, practice-time report 60, trust reconciliation 5, payroll/1099 filings 30, malpractice 60, domain 60, lease 90, backup heartbeat 3, restore tests 14, subscriptions 30; custom rows 30 by `FOD-2`).
**RULED — *"Stand as shipped"***. Spec §11 item 5 CLOSED.

### Item 8 — the thirty-three `FOD-` defaults
Screen-ruled under items 2–5 and 7: `FOD-1`, 2, 4, 5, 9, 12, 14, 15, 16, 17, 18, 21, 24, 25, 26, 27, 28, 30, 31, 32, 33. Amended by item 6: `FOD-22`, `FOD-29`. The eleven no screen shows, by list — `FOD-3`, 6, 7, 8, 10, 11, 13, 19, 20, 23, and 29-as-amended:
**RULED — *"All eleven stand"***. All thirty-three RULED.

### Item 9 — the design questions the build handed back (no screen)
- **Part B item 1** (the materialized-from link as a column) — **RULED *"Add the column (Recommended)"*** → FIX (A3).
- **Part B item 2** (the three-valued CHECK) — **RULED *"Tighten it (Recommended)"*** → FIX (A4).
- **Part C item 6** (Supabase-mode atomicity; log a failed activation; RPC) — **RULED *"Build the RPC functions now"*** → FIX (A5); the failed-activation log question dissolves (an atomic act has no half-state).
- **Part C item 7** (Undo's best-effort Outlook delete) — **RULED *"Retry on next sync (Recommended)"*** → FIX (A6).
- **Part C item 8** (two log lines on Activate-from-Inactive; folds part C item 14) — **RULED *"One act, one line (Recommended)"*** → FIX (A7).
- **Part C item 15** (a re-entry path for last-done) — **RULED *"Not needed once RPC lands (Recommended)"*** — closed by consequence.
- Part C items 3 and 12 — guards the build reported; NOT put; left as built.

### Item 10 — part C item 16 (the kickoff prompt's DO-NOT restatement)
No ruling. The prompt's own precedence rule decided it during the build; this packet corrects `docs/prompts/PROMPT-firm-obligations-slice-build-session.md`'s two "no delete" lines to §8's words (exact-match orders).

### Part One's fix routing
Put: fix list only, or draft the slice tonight. **RULED — *"Draft the fix slice tonight; put FOS-2 to me (Recommended)"***. Then, scope: **RULED — *"One slice, two groups (Recommended)"*** (group B being the six disclosures fixes of §2).

## §2 — PART TWO: THE POST-`CCS-1` WALK (called at `#150`)

### Screen 1 — the split address (`SD-5`, `SD-6`)
Two fields, "Split by rule — confirm or edit" + one-click Confirm, the legacy field hidden, formatted phones, the new-party locations group with no legacy box. **RULED — *"Confirm as built"***. The mark's wording CONFIRMED.

### Screen 2 — the Medical tab and the instrument
The location picker (`SD-7`, `SD-8`, `SD-10`); the Forms panel's three first lines (`SD-1`); "Generate — N must-fix items stand" (`SD-16`); line 7 (`SD-17`); `R6`'s two flag lines (`SD-18`); the rendered block (the selected campus, formatted phone, the custodian literal, a mid-level as name + credential); `HS-3`'s suffix set (`SD-9`). **RULED — *"Confirm all as built"***. `SD-1`, `SD-16`, `SD-17`, `SD-18` CONFIRMED as strings; `SD-2`, `SD-4`, `SD-7`, `SD-8`, `SD-9`, `SD-10`, `SD-13`, `SD-19` RULED as built.

### Screen 3 — the template editor and `SD-3`
**`SD-3` — RULED *"Instrument-wide stands"*** (veto declined). **`R8`'s strings — RULED *"Confirm as built"***: the subtitle, the corrected unknown-token warning, `SD-15`'s note format CONFIRMED. THIRD TRANCHE item 9 (the 14-token registry stub) not widened — stays recorded.

### The remaining text acts
`R1`'s must-fix route line and tier-3 panel line; `R10`'s pronoun line; `R15`'s title strings; `SD-12` (README); `SD-11` (the sign-in sentence, quoted). Widget: *"Confirm all but ones I haven't reached"*; on which were reached: **none**. → ALL FIVE STAY PROVISIONAL, by name. **`SD-14` / `HS-4` — *"Didn't reach it — hold"*** → PROVISIONAL; `HS-4` stays ⬜, annotated.

### The seven proposed items (amendment slice §15; `#148` §7)
- **D-18** — first *"Change the form"*; re-asked: **RULED *"No episode sentence at all"*** → FIX (B2).
- **D-8** — **RULED *"Don't add the sentence"*** → FIX (B1).
- **Per-paragraph regenerate** — **RULED *"Yes, later slice"*** → 🟡, a later slice; no durable ID (minting is his — the `R7` "register row, no durable ID" precedent).
- **`AS-Q14`** — **RULED *"(b) Re-designate the facility whole"*** — the default becomes the rule; (a) not built. CLOSED.
- **`AS-Q15`** — **RULED *"Stand as default"***. CLOSED.
- **`AS-Q16`** — **RULED *"Stand as default"***. CLOSED.
- **`AS-Q17`** — first *"Designate under the treating paragraph"* (an option that bundled two limbs); re-asked on the pause limb: **RULED *"Pause still fires, then designate"*** — the §5.1 hard pause fires on the marker as built; once cleared, the individual IS designated in the treating paragraph under its causation sentence and in its LEAD. → FIX (B3). CLOSED.

### THIRD TRANCHE items 8–11 (`docs/spec-feedback.md`, "THIRD TRANCHE — recorded by the `CCS-1` build session, 2026-09-07")
- **Item 8** (the duplicated "Custodian of Records" at N = 0) — **RULED *"Fix — print it once"*** → FIX (B4).
- **Item 10** (`R15`'s title cannot reach the static served heading) — **RULED *"Have Code tokenize the master"*** → FIX (B5): a Code session is AUTHORIZED to edit the master `.docx` at the two heading spots only.
- **Item 11** (the bill form's picker vs the Medical tab's list) — **RULED *"The Providers section's list (case_providers)"*** → FIX (B6).
- Item 9 — ruled at screen 3 (not widened). Item 12 — a walk note; no ruling.

### `CAP-2a` — the exemption wording
**RULED — *"Edit rows carry — (Recommended)"***: the class is a BIRTH rule for new files; an edit-in-place row inherits the edited file's class and carries `—`. A convention amended → **TRIGGER 3 FIRES**; instructions v33 delivered by this packet.

## §3 — `FOS-2` — THE FIX SLICE AUTHORIZATION — RULED YES

`docs/specs/firm-obligations-fix-slice.md` (RULING) and `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md` (RULING) were delivered as files BEFORE the question; two adversarial read-only lanes had run on the first draft (lane A fidelity-to-ledger 2 HIGH / 7 MEDIUM / 7 LOW; lane B HEAD facts 2 HIGH / 7 MEDIUM / 6 LOW — record at `docs/record/firm-obligations-hands-on-2026-09-12/adversarial-audit-2026-09-12.md`), every HIGH and MEDIUM fixed, and `FXD-9` (the reminder pre-fill-vs-cap reading) put inside the question. Put whole — *Yes* / *Yes, group A only* / *Break it down into limbs* / *Not tonight*.
**RULED YES, verbatim *"Yes"*, 23:55 CDT 2026-09-12**: both groups, as written, `FXD-1`–`FXD-11` as named, `FXD-9` included; a fresh Opus Code session fired from the prompt; the queue runner BARRED; fixture-only; the UNRUN migration amended in place and still not run by that session; the master `.docx` edited at exactly two spots.

## §4 — ADJACENT (CC-1(c)) — offered, not pressed

- `Q-API-14` and `Q-API-3`'s filing half — **RULED *"Keep both held (Recommended)"*** (CC-1(b) holds stand).
- `Q-API-18`'s two facts and `Q-API-19` — **RULED *"Not now — stay open"***.
- `Q-STAT-7` — **RULED *"Not yet — stays open"***.
- Wave 0 (b) not offered: he did not sign in to Outlook this sitting.
- **A DIRECTION for the matter-deadline engine (`FC-7`'s track; `docs/specs/deadline-engine-spec.md`, PROPOSED, unbuilt), in his words, recorded here and nowhere edited:** *"Most deadlines in a case need to remind at most 30 days out, except for important deadlines that we need more time to think about, like expert designation deadlines."* Not a build item; a later design act reads it.

## §5 — WHAT THIS SITTING DID NOT DO

Built nothing. Authorized nothing except `FOS-2`, in his quoted word. Proposed no registry entry and characterized no law — **PF-1 did not fire** (no weekend default, no cite string touched; the fix slice carries none). Asked for no real date, county or appointment list (H5; `FOD-9`). Ran the migration nowhere; connected to no database; touched Supabase mode nowhere. Wrote no tracked file. Signed in to nothing; created no Outlook event; deleted none (none existed). Swept nothing on his machine (the checkout only, by staged copies; no `git` command ran). Relocated no capture (the `#137` Voice2 pair's TRANSIT condition (2) is checkable at HEAD since batch 96 and was NOT verified tonight — a later sitting with his Chrome). Did not put `Q-STAT-7`. **One reading caught by audit before it bound:** the fix slice's first draft capped the Outlook reminder at the lead (`min(reminderDays, leadDays)`), which would have silently ignored a hand-raised value; rewritten as `FXD-9` and put inside `FOS-2`. **One form point:** every question this sitting went through the answer widget (the DECISION 0 slip of `#155` not repeated).

## §6 — TRIGGERS

Trigger 3 FIRED (`CAP-2a`) — v33 delivered. Triggers 1, 2, 5 did not fire. Trigger 4 did not fire (two capture files ENTER; none left). Trigger 6: BUILD-STATE at `e046906` read whole against v32 — no contradiction found; its FIRM OBLIGATIONS bullet, NEXT ACTS line and YOUR-HAND list are overtaken by this sitting's acts, which is staleness for the runner's refresh. Trigger 7: the last review pass was v28 (2026-08-31); a monthly pass is due by the end of September — offered, not taken tonight.
