# THE `#137` VOICE2 DEFINITIONS, CARRIED INTO THE REPO — `FO-`, `BR-`, `DA-`, `INS-1` (2026-09-10)

**Status:** EVIDENCE (CAP-2) — a verbatim carry, not a design document. Canonical repo path: `docs/record/firm-obligations-sitting-2026-09-10/voice2-definitions-carried-2026-09-10.md`. Ordered by Michael at DECISION 10 of the firm-obligations ruling sitting (2026-09-10, `#155`): *"Mint all, and carry the three definitions (Recommended)"* — the three being `BR-2`, `BR-4` and `DA-2`, which `#152` found to be defined ONLY in the project-knowledge capture `claude_Backup_Redundancy_and_Firm_Obligations_Capture_2026-08-22_Voice2.md`; the whole PART 12 table is carried so the pair's every id has a definition in the repo, and PART 8 is carried because it is the three rulings' text in his words.

**Provenance and limits.** Source: the capture named above, read this sitting through the Projects tool's inline read (`project_read`), which the record notes is NOT a byte-exact export (the transit method's docs-API read is); the text below is copied from that read and is believed faithful, but the capture file itself remains the authority until it transits by the TC-8 act, and the relocated zip is the byte-exact record thereafter. **Nothing in the capture is edited, re-characterized or ruled by this carry.** Model attribution in the source: Opus 5 (voice session finished in typed mode, 2026-08-22 Central).

**Why this file exists:** the `#137` capture/handoff pair could not leave project knowledge (`#152`, `#153`, `#154`) because `BR-2`, `BR-4` and `DA-2` — and, per `docs/specs/id-collision-report.md`, `FO-4`, `FO-5`, `BR-3`, `INS-1` — had no definition anywhere in the repo. With this file at HEAD and the rows DECISION 10 minted (`FO-1`–`FO-7`, `BR-3`), the pair's TRANSIT condition (2) can be verified at a later sitting; condition (1) — `#137` at HEAD — has held since batch 82.

---

## A. PART 8 OF THE CAPTURE — THE RULINGS: FIRM-LEVEL RECURRING OBLIGATIONS (verbatim)

Claude put the fork: **does the software carry firm-level recurring obligations, or is it strictly matter-scoped?** Backup verification attaches to no case; neither does bar dues, insurance renewal, or CLE.

### FO-1 — CONFIRMED

> *"The software should probably carry firm level recurring obligations."*

**The software carries firm-level recurring obligations, not just matter-scoped ones. Backup verification is the origin case.**

**What it costs, named at ruling time so it is not discovered later:**
- **A firm-level obligation has no matter to hang on.** The existing deadline machinery presumably keys off a matter (client, court, docket). **This is a new SCOPE for obligations, not a new type — that is the substance of the ruling.**
- **Calendar-view consequence:** firm obligations and matter deadlines sharing a list means they must be **distinguishable**, and **filterable out** when looking at a single case.
- **Flagged hardest:** firm obligations are the natural home for the heavy items — **bar dues, malpractice renewal, IOLTA reconciliation, CLE hours.** That is a much weightier set than backup checks, and it is the door this ruling opens.

### FO-2 — CONFIRMED

Michael, on whether these should be dismissible the way a case reminder is:

> *"it should stay lit till it's done"*

and, when the set was named back to him:

> *"those are hard deadlines. Like, those are, yeah, those are, like, do or die."*

**The firm-obligations register is for things with real consequences — bar dues, malpractice renewal, IOLTA, CLE — and they STAY LIT UNTIL DONE. No snooze.** This makes them **behaviourally distinct from case reminders**, which are snoozable.

**Design edge Claude named — PROPOSED, unruled:** a court deadline and a bar-dues deadline **fail differently**. Miss a filing date and there is a sanction or a dead claim in **one matter**. Miss your dues and **every matter stops at once**, because you cannot practise. Arguably the firm-level ones are the **more** consequential class, not the lesser one — *which is the opposite of how they would get built if nobody said this out loud.*

### FO-3 — CONFIRMED, WITH AN EXPRESS CONDITION

The question Claude asked badly the first time and then unpacked: **some of these obligations are money leaving the account on a date.** Three levels were laid out:

| Level | Shape | Character |
|---|---|---|
| Thin | Date + name. Reminds; you pay elsewhere; you mark it done. Software never knows the amount. | A nag that cannot be ignored |
| Middle | Also carries expected amount and payee — "twelve hundred due in March" | Cashflow visibility, not accounting |
| Heavy | Connects to the books; paying it reconciles | Genuine accounting integration |

Michael:

> *"let's lean towards the thin version, but… I saw something about… wanting access to QuickBooks online, their development material… So it looks like part of the software has some QuickBooks integration worked into it, or at least planned to be worked into it. I know you can't see that right now, but just make a ruling here that I'm gonna lean towards thin. But if a software is leaning towards being built out for QuickBooks, let's go ahead and just dive into that integration and make it as easy as possible."*

**Claude SPLIT the ruling rather than recording it whole, and Michael confirmed the split — *"Yeah. So it's right."***

- **RULED FIRMLY: thin is the default.** A firm obligation is a date, a name, and it stays lit until done.
- **RECORDED AS CONDITIONAL, NOT AS RULED:** the QuickBooks limb rests on a premise **neither party could see in session**. Michael saw a QuickBooks reference in a build slice; **that is a BUILD-STATE fact and this session could not read BUILD-STATE.** The honest form, which Michael accepted:

> **Thin by default. IF a QuickBooks integration is genuinely in the build or spec'd, THEN the firm-obligation record carries whatever hook makes the expense side trivial rather than staying deliberately ignorant of it. The condition is VERIFIED AT HEAD before anyone builds on it.**

**Recorded because the reasoning is the point:** this is not hedging Michael's ruling — it is keeping the ruling from resting on an unverified premise, **which is the exact thing that bit the record two days ago.** Michael's recollection of a screen is not the state of the build.

**PROPOSED ID SERIES CAUTION:** `FO-`, `BR-`, and `DA-` are **proposed IDs, not minted ones.** Per the #133 lesson — *an ID is not an identity until the row is read*, and *when an ID series is found to collide, enumerate the WHOLE series before scoping the fix* — **each series must be collision-checked repo-wide before filing.**

---

## B. PART 12 OF THE CAPTURE — OPEN ITEMS (verbatim)

**All IDs below are PROPOSED. Each series requires a repo-wide collision check before filing (#133 lesson).**

| ID | Item | Status |
|---|---|---|
| `FO-4` | The heavy firm-obligations set — bar dues, malpractice renewal, IOLTA reconciliation, CLE hours. Wants its own design sitting. | OPEN — flagged, not designed |
| `FO-5` | Are firm obligations per-firm or per-user? CLE is per-person and a paralegal hire is on the horizon. | OPEN — never raised in session |
| `FO-6` | Calendar-view design: how firm obligations and matter deadlines are distinguished and filtered. | OPEN — consequence of FO-1 |
| `FO-7` | Verify at HEAD whether a QuickBooks integration exists or is spec'd. **FO-3's conditional limb turns on this.** | OPEN — blocks the conditional |
| `BR-1` | Third-copy vendor selection. Prompt written; research not yet run. | OPEN — prompt delivered |
| `BR-2` | Verify all vendor facts against vendors' own pages. Everything discussed was search-derived. | OPEN |
| `BR-3` | Backup verification as a firm-level obligation record — the origin case for FO-1. Not spec'd. | OPEN |
| `BR-4` | Self-hosted server as the eventual third copy. **RECORDED INTENT, expressly not a ruling.** Reason preserved: attention, not money. | RECORDED INTENT |
| `BR-5` | AWS overlap — the Bedrock BAA question and the backup BAA question could ride one vendor relationship. | OPEN — noted, not pursued |
| `DA-1` | Mobile document access: every document for the matter, from the phone. **Requirement CONFIRMED; nothing designed.** | OPEN |
| `DA-2` | Document lifecycle ownership — if brennan-case-manager is the case manager, documents are created there and it does the pushing. | PROPOSED, unruled |
| `DA-3` | **PHI boundary on the mobile document view** — does the mirror show everything, or stop at the boundary? Sharpened by phone-in-public. | **OPEN — asked twice, never answered** |
| `DA-4` | Document readability on a phone (e.g. 50-page scanned PDF over cell signal). Named as the hard problem. | OPEN |
| `INS-1` | Amend the voice-sessions operational note: refresh-chat cannot be RUN from voice; the wrap requires a typed mode switch. **Not a trigger-3 fire by itself** — it is an operational note, not a binding convention. Carry to the next instructions update. | PROPOSED, unruled |

**Carried in unchanged from before this session, untouched:** RF-2, RF-3, RF-5, RC-2, SK-v2 closure, RF-7, the RECON-1 open list, and the `H12-v` vendor-route queue row.

**CC-1 hands-on queue at close:** `DA-1`, `DA-3`, `DA-4` and `FO-6` are all better answered with a running product in front of Michael than in the abstract. **Proposed for the hands-on queue — unruled.** The queue was EMPTY at open; if these are accepted it is no longer empty, and that must be stated at the top of the next typed session.

---

## C. THE STATUS OF EACH ID AS OF 2026-09-10 (`#155`) — a pointer table, not a re-ruling

| ID | Where it stands now | Row? |
|---|---|---|
| `FO-1`, `FO-2`, `FO-3` | Ruled `#137`; elaborated `#151`; ruled through `#155`. | ✅ born closed (batch 96) |
| `FO-4` | Closed by act — `#151` + `#152` + `#155` are the sitting it asked for. | ✅ born closed |
| `FO-5` | RULED `#155` DECISION 4. | ✅ born closed |
| `FO-6` | ACCEPTED on the hands-on queue (`#139`); its content is item 4 of THE FIRM-OBLIGATIONS HANDS-ON SITTING (`#155`). | ⬜ born open |
| `FO-7` | Verified `#151`; RULED `#155` DECISION 5 (limb does not fire). | ✅ born closed |
| `BR-3` | Spec'd as `FOT-22`–`FOT-24` (`#151`), built by `FOS-1`'s slice. | ⬜ born open |
| `BR-1`, `BR-2`, `BR-4`, `BR-5` | Unchanged — the backup vendor one-pager is Wave 0 (d) (`#154`), authorized, not written; nothing ruled since `#137`. | roomless (defined here) |
| `DA-1`, `DA-3`, `DA-4` | ACCEPTED on the hands-on queue (`#139`), gated on document storage (gate 7). `DA-2` PROPOSED, unruled. `Q-API-14` (`#154`) is held beside them. | roomless (defined here) |
| `INS-1` | PROPOSED, unruled; the instructions' voice-session note has since been extended by other sittings but not on this item. | roomless (defined here) |
