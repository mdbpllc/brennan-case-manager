# THE CC-1 HANDS-ON SITTING — RULINGS OF 2026-09-05

> **STATUS: RULING RECORD — sixteen rulings and one build authorization, every one in Michael's words, made with the running product in front of him.** Canonical repo path: `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` (CAP-2 class: RULING). Filed by packet `push-to-code_cc1-hands-on-sitting_2026-09-05`; session-log entry `#148`.
> **This document RECORDS rulings; the REQ-CAPTURE §18.F table, the slice's §10 table, and the review register are ANNOTATED to point here — none of their ratified text is edited.** Where a ruling supersedes a build DEFAULT, the default is named and the supersession is explicit.
> Cite by heading or quoted sentence, never by line number (CITE-STABILITY does not bind here — this file appends — but the convention is kept for uniformity).

## §0 — THE SITTING

Typed, Cowork, bridge granted (`C:\Users\Brennan\brennan-case-manager`), HEAD `5a85c31` throughout. Both dev servers on Michael's machine by his hand: DEMO on `:5175` (`vite --mode demo`; `resolveUsingSupabase` returns false whenever `MODE==='demo'` — local store, seeded fixtures, zero network) and LIVE on `:5173`. **Every walk and every ruling below was on DEMO.** LIVE was reached once through Michael's own signed-in Chrome; one matter exists there; it was not opened and nothing from it is recorded anywhere.

Model: **Opus 5** for the session-start reads and the first put of ND-7(c); Michael switched the chat to **Fable 5.1** with the instruction *"Make sure youre correct in what you're saying and proposing here"*; re-verification found three Opus 5 misstatements (§9); **every ruling below closed on Fable 5.1.** Packet assembled on Fable 5.1 at Michael's choice — *"let's use Fable for the assembly."*

Form: CC-1(a) throughout — options put as starting points, three of sixteen answers came from outside the offered set (R5(i), R9/UX-4, R14), two Claude recommendations were declined (R5(i), R5(iii)), and Michael's own instruction mid-sitting — *"Should I be running through the software myself to answer these questions?"* — moved the walk-dependent items (R5, R6, R9, R15) onto his own hand in his own Chrome. **The CC-1 hands-on queue at open: 21 accepted + 14 proposed. At close: 12 accepted remain (all gated on unbuilt modules, named in §7); 7 proposed remain (§7).**

## §1 — RULINGS ON THE FIVE §18.F ITEMS (REQ-CAPTURE `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` §18.F)

### R1 — ND-7(c): a billed provider with no designation paragraph — CLOSED
**Michael:** *"c"* → *"Take c1."*
**The rule, three tiers, keyed on the PARTY TYPE the firm already assigns (`partyRegistry.ts` `PARTY_TYPES`):**
1. Billed party typed `providerBusiness` ("Facility"), **on** the designation list, **unticked** → **PANEL** line (the current `tiers.ts` line-6 behaviour, unchanged).
2. Billed party typed `providerBusiness` with **no provider row** on the chronology → **MUST-FIX.** Clears two ways, both named in the stop's route line: add the facility on the Medical tab, or retype the party if it is not a treating facility.
3. Billed party typed anything other than `providerBusiness` (`business` — records vendor, funding/lien company) → **PANEL** line, informational: *has bills but is typed Business, not Facility — retype it if it treated the client.* (Silent was offered as c2 and **rejected**.)
**Reason (his premise, contradicted on screen):** the item was held on *"There is always a provider with a facility"*; the Garcia fixture rendered two billed-not-designated lines on the first case opened. **Reason for the party-type key:** the model has no bill-level notion of a non-treating biller, but the party model already distinguishes Facility from Business — no new concept, no migration, no new party type. **Supersedes** the PROVISIONAL default "a PANEL LINE, never a stop" for tier 2 only. **Build note:** `TierInput` gains one field (the unselected provider rows, or a caller-computed partition — it holds only `selected` and `billedFacilityPartyIds` today) and reads party type through the caller's `partyById`. The third ND-7(a) line ("a person rather than a facility") is untouched.

### R2 — the stop's SHAPE (§12.3) — CLOSED
**Michael:** *"I'll rule with youre recomendation."* — MARKED: the drawing is Claude's, the adoption is his.
**The rule:** keep the top-of-page **"Fix these first — N"** card (the D-1 provisional placement) as the reading surface; **the Generate button, while any must-fix stands, is DISABLED and STATES THE COUNT** (e.g. *"Generate — 2 must-fix items stand"*) instead of going silently gray; **no modal dialog; not merged into the HD-1 panel.**
**Reason:** neither held option was what the build did; a dialog adds a step in front of route lines that already say where to go; merging a stop into the "screen only, changes nothing" panel is the reflex-to-skip failure R1 was built against. **Consequences:** the card's "There are exactly three conditions that do this" becomes FOUR after R1; the "sits here provisionally" footnote comes off. R1's tier-2 must-fix renders in this card.

### R3 — Q5 + Q10, put as ONE question — CLOSED TOGETHER
**Michael:** *"Go with B"* — MARKED: drawn by Claude, adopted by him.
**The rule:** the custodian-only gap line (panel line 7) **carries the facility's billed total inline** — *"<Facility> ($<total> in charges) goes out under the custodian-only paragraph because no individual could be named"* — and gap lines **sort charge-descending** among themselves (Q4's "useful SORT for the gap flag"). **No threshold. Panel tier.** The number is the escalation.
**Reason:** the only option that does not ask him to legislate a figure in the abstract (CC-1(b)); (c) an attorney-set threshold can be layered on later without undoing (b). **The FE-22 "threshold" retires as a concept.** Pharmacy is never a gap (unchanged). **Residual, defaulted conservatively:** dollars only, as drawn; share-of-total was offered and not taken up. **Build note:** bill totals per facility party become one more `TierInput` field, scoped to the active client on a multi-client matter exactly as `billedFacilityPartyIds` already is.

### R4 — the rider's supervisor (§15.6) — CLOSED
**Michael:** *"Move with your recommendation."* — MARKED: drawn by Claude, adopted by him.
**The rule:** **GROUP FILL, always.** Beneath a collective paragraph `{supervising_provider}` names the group the rider rides — the paragraph above. No hand-designated supervisor; no per-rider override built.
**Reason:** the app-placed sentence since AS-Q8c is a SCOPE sentence (*"the testimony described above regarding …"*), not the old writer variant's supervision assertion; the group **is** the paragraph above, and naming one physician would narrow the PA's testimony to a subset of what she participated in. The PROVISIONAL default is now RULED; the assembly.ts comment inviting a hand-designated supervisor comes off. The `ctx.facilityName` fallback with nothing to ride is AS-Q15's (proposed, untouched).

## §2 — RULINGS ON FOUR ACCEPTED REGISTER ROWS (`docs/specs/attorney-review-queue.md`)

### R5 — CL2-AC-1, the three held edges — CLOSED (walked by Michael's own hand)
Direction confirmed 2026-08-08; edges ruled today after he unlinked and re-linked the Garcia client in demo and read the CL-2 backfill flag on 26-0003.
- **(i) Link removal — Michael: *"Nothing happens to the damages scope"*** → **PERSIST.** Unlink is a roster act only. (Claude's PROMPT recommendation was declined.)
- **(ii) Posture on auto-create — Michael: *"Default from practice area, editable"*** → Criminal → defendant, otherwise → claimant (the existing hand-path default), correctable on the row's Edit. `mixed` stays unoffered.
- **(iii) Existing gaps at ship — Michael: *"new links only, flag the gaps"*** → no retroactive create; an existing Client-role link with no damages record gets a flag in the CL-2 backfill-flag shape and waits for his hand. (Claude's BACKFILL recommendation was withdrawn in session on the precedent he read on screen: *"Not guessed and not placeholdered."*)
**Scope unchanged:** auto-create on PI Client-role link; UI workflow only; data model parallel (D-CL2-8).

### R6 — CL2-CHECK-1 — ADOPTED
**Michael:** *"Adopt"*. The advisory client-role ↔ client-record consistency check is adopted **FLAG-ONLY, never auto-fix**: (1) a damages-scope record whose party carries no Client/Plaintiff role on the case — the orphan R5(i) made a legal state; (2) a Client-role party with no damages record — the gap R5(iii) chose to flag. Renders in the top flag area (HS-1). **Supersedes** DEFERRED-do-not-build (2026-07-28) and KEEP PARKED (#66). **Reason:** it is what makes R5's three answers safe.

### R7 — the bill-label pre-fill (register row, no durable ID) — BUILD IT
**Michael:** *"Build it"*. Label defaults to the provider name on creation; editable to disambiguate. Display-only (July finding stands). Needs a durable ID at the runner's merge; none exists.

### R8 — FE-§11.4, the template-editor UX pass — CLOSED on four items (walked by Michael's own hand)
- **UX-1 the verb — Michael: *"'save as a new version' is what it should be changed to."*** Button label → **"Save as a new version"**; the edit→immutable-new-version model is UNCHANGED; the page subtitle (*"Saving publishes a new version"*) rewritten to match. He reached for Save and found "Publish new version"/"Discard changes".
- **UX-2 unknown tokens — Michael: *"Warn on save, dont block"*** → a token whose name is not in the seeded registry (`FormTokenDefinition`) produces a WARNING on save naming it and saying it will render empty, with save-anyway. Non-blocking; no inline marking (offered, not taken). Today the editor checks only the legacy `{{…}}` convention and an unknown token surfaces only at render as `unresolved`.
- **UX-3 what changed — Michael: *"per row expander"*** → each version row gets a "what changed" expander: lines removed / lines added against the immediately preceding version. Difficulty confirmed low (every version stores its full body). No compare-any-two.
- **UX-4 the note — Michael: *"If its going to do anything, I would like the changes made to be autogenerated instead of me having to explain what I just changed."* → *"mechanical, from the diff"*** → the Note column autogenerates from the diff, MECHANICALLY, no model call (*"2 lines changed · token {client} → {clint} · ¶3 edited"*); the hand-note field stays, optional, unprompted. **A model-written note was named and EXCLUDED** — no model path is wired until `H12-v` is ruled. Screenshot evidence: v2 and v3 saved 2026-09-05 with empty notes.

## §3 — RULINGS ON SEVEN PROPOSED ITEMS (slice `docs/specs/fe-d1-amendment-slice.md` §10) — each ACCEPTED onto the queue and RULED in one act

| Item | Michael's words | The rule | Supersedes the §10 default? |
|---|---|---|---|
| **D-21** twelve-name rendering | *"a - as built"* | Every member named in the sentence at any count; "Drs." surnames (no Oxford comma) only when every member is MD/DO/DC, else full names + credentials, no honorific. **No cap.** | No — the default STANDS as the rule. |
| **D-11** pronoun default | *"b"* | they/their still renders for an individual with no pronoun on record (unchanged) **AND the panel carries one line per such individual** — *"<Dr. X> has no pronoun on record — rendering as they/their"* — PANEL tier, fixed on the Medical tab. Mirrors the client's existing line. | **Yes** — the default's "no panel line for it" is superseded. |
| **D-64** custodian line | *"B, but make sure that we're also putting the address and phone number underneath the facility name as well."* | The LITERAL **"And/or Custodian(s) of Records"** at every N ≥ 1; N = 0 stays "Custodian of Records"; pharmacy stays §9.10's literal. **No inflection.** His Part 3 "number tracking the count" is superseded by his own pick. His second clause is a requirement restated — and verifying it found **HS-2 (F7)**, §5. | **Yes** — the inflecting default is superseded. |
| **D-49** DPT honorific | *"Leave it out"* | DPT stays OUT of `DOCTORAL_CREDENTIALS` (MD, DO, DC, DPM, DDS, DMD, PhD, PsyD). A PT renders full name + credential, never "Dr.". The "pending hands-on" note on the constant comes off. | No — the default STANDS. |
| **D-50** mid-level short name | *"Just call them '[doctor name], [suffix]' in the designation block."* → narrowed to the sentence: *"Yes"* | `{midlevel_short_name}` = full `display_name` + ", " + `credential_suffix` — *"Priya Natarajan, PA-C will testify consistent with …"*. **No courtesy title, no "Dr.", no inference from pronoun.** The Mr./Ms. table is RETIRED for mid-levels. `{midlevel_his_her}` unchanged. The block was already name + suffix per line. | **Yes** — the Mr./Ms. table is superseded. |
| **D-29** Medical-tab layout | *"I believe that this works."* (walked in his own Chrome) | Providers section (chronology drop zone, then one card per facility with its people table) ABOVE the unchanged bill ledger. Per-row Role dropdown stands. Nothing reported missing. | No — the default STANDS. |
| **D-61** multi-client title | *"c"* | The title names the responding plaintiff **only on a multi-client case** — *"Plaintiff Alba Quartzmoor's TRCP 194.2(b) and 195.5 Disclosures"* (amended/supplemental likewise). A one-client case keeps *"Plaintiff's …"* as served today. FE-15 ties certificate of service and footer to the title; they follow. | **Yes** — "title and caption as built" is superseded for the multi-client case. |

## §4 — A WALK FINDING, RULED

### HS-1 — the no-client flag's placement — **Michael: *"Move it up."***
On 26-0003 he read the top of the Parties page (the intake-roster "not yet seeded" message) and reported no flag; the *"FLAGGED — this case has no client record"* notice renders at the BOTTOM inside the damages-scope card (`ClientsCard.tsx` ≈188) while the caption-alignment flags render at the TOP (`RosterFlagsCard`). **Rule:** the no-client flag moves into the top flag area; the resolving control stays below and the flag points at it. **Reason, his own test:** he did not see it.

## §5 — A SERVED-DOCUMENT DEFECT, FOUND AND ITS FIX AUTHORIZED

### HS-2 — the 195.5 designation block renders NO address and NO phone (F7)
`src/pages/FormsTab.tsx` `blockItem()` (≈889–899) builds every `testifying_expert` region item with `facility_address_line_1: ''`, `facility_city_state_zip: ''`, `facility_phone: ''` — **hardcoded empty** — while the `treating_provider` region four lines below (≈367–371) reads the real values via `field(facilityParties[b.facilityPartyId], 'addressLine1')` etc. Introduced 2026-09-03, commit `4d9577c` ("§13 item 11: the Forms tab rebuilt"). **Consequence:** the block FE-18 ratifies as carrying the 195.5(a)(1) address and telephone carries neither; the persons-with-knowledge entry does; panel lines 1/2 describe a read that never happens. Found by Michael's D-64 instruction; verified by Claude at HEAD `5a85c31`.
**The fix, AUTHORIZED — Michael, shown the target block: *"The F7 block that you made there looks perfect."*** Read as authorization; the rendered block is the target. Scope: read the three fields in `blockItem()` exactly as the `treating_provider` region does; add a regression test asserting the three lines are present when the facility record carries them and absent-with-panel-line when it does not; nothing else. **A fresh Code session from `docs/prompts/PROMPT-f7-block-address-fix-build-session.md`, the queue runner BARRED, fixture-only.** The example address/phone in the drawing shown to him were illustration only and are never hardcoded. **PF-1 did not fire:** the packet proposes no registry entry and characterizes no law — 195.5(a)(1) is cited only as FE-18's existing ratified basis.

## §6 — TEXT ACTS FOR MICHAEL'S EYE AT BUILD (Claude drafts; he approves before any real record)
R1's must-fix route line and tier-3 panel line · R2's Generate-button count label · R3's line-7 wording · R6's two flag lines · UX-1's subtitle · UX-2's warning · UX-4's autogenerated-note format · D-11's panel line · D-61's exact title strings · **HS-4** the CL-2 backfill-flag wording (written for the July migration; once auto-create exists a fresh case reaches that state only when parties are linked without a Client role — needs a plain-language rewrite).

## §7 — WHAT REMAINS ON THE CC-1 HANDS-ON QUEUE, AND WHY
**12 accepted, all gated — not a deferral:** `CR-7`, `CR-CONSTRAINT`, `Q-FE6-5`, `Q-FE4-1`, `Q-FE5-3`, `Q-IN2-7`, `Q-IN1-1`, `Q-IN3-6` (behind unbuilt modules per the 2026-08-24 audit's own ripeness note); `DA-1`, `DA-3`, `DA-4` (document storage is gate 7, unbuilt); `FO-6` (no firm-obligations concept exists in the calendar code). **7 proposed, untouched:** D-18, D-8, per-paragraph regenerate, AS-Q14, AS-Q15, AS-Q16, AS-Q17 — text acts and behaviour rules that put as well typed.

## §8 — NEW ITEMS MINTED THIS SITTING (`HS-` prefix, collision-checked free repo-wide at HEAD)
| ID | Item | Status |
|---|---|---|
| HS-1 | No-client flag placement | RULED — move up (§4) |
| HS-2 | F7 block address/phone defect | DEFECT; fix AUTHORIZED (§5) |
| HS-3 | `lastToken` surname takes the last word — "Ray Caldwell Jr." → "Dr. Jr." | OPEN, unruled; small fix, separate |
| HS-4 | CL-2 backfill-flag wording rewrite | TEXT ACT, his eye |
| HS-5 | Operational note candidate: a magic-link sign-in always opens the OS default browser; the Claude built-in browser pane can never be signed in by clicking; two single-use links spent 2026-09-05 before the cause was named. Design sessions walking LIVE need Claude in Chrome on the browser Michael signs in to. | For the next instructions update; not a convention (trigger 3 does NOT fire) |
| HS-6 | README §"Known gap" says no sign-in screen; auth landed 2026-07-28 | DOC FIX |
| HS-7 | BUILD-STATE at HEAD contradicts itself: the banner says MIG-1 + amendment BOTH RAN (`#147`) and one is pending (the fix); a later paragraph says "TWO MIGRATIONS ARE NOW PENDING" naming those two as UNRUN; `fe-d1-amendment-fix` appears once. Batch 89's runner line corroborates the banner. | For the runner's BUILD-STATE rewrite: reconcile; the `#147`/batch-89 record governs; the stale paragraph pays |
| HS-8 | Probate is not a practice area in the app — the filter offers PI / General Civil Litigation / Criminal; probate exists only as case type "Probate companion" with a status ladder marked "pending design pass" (`caseTypes.ts:20`) | OPEN — Michael's; may be deliberate |

## §9 — CORRECTIONS MADE IN SESSION (required fields; none corrects an entry at HEAD — all were caught before any ruling relied on them)
1. **Asserted** (Opus 5): `RC-3`, `B1`, `B2`, `RC-5` were live queue items visible on the demo Forms tab. **True instead:** all four CLOSED (REQ-CAPTURE line 70). **Source:** `docs/prompts/PROMPT-rc1-voice-the-form-of-the-floor.md`, a PRE-sitting prompt for 2026-08-31, read as a current queue. **Failure class:** "AN ID IS NOT AN IDENTITY UNTIL THE ROW IS READ" (#133); "diagnose from the decisive check." **Changed:** the sitting opened on §18.F's actual rows.
2. **Asserted** (Opus 5): "both states are computable from data the tier function already holds"; "there is no concept in the model of a billing entity that is not a treating provider"; option (iii) "mints a new durable concept"; `ClaimTypeSource` "is 'detected' half the time." **True instead:** `TierInput` lacks the unselected provider rows (one added field); the PARTY model already has `providerBusiness` vs `business` — no new concept; the frequency claim was unfounded and withdrawn. **Failure class:** asserting from a partial grep. **Changed:** R1's narrowing was re-put on the corrected facts before closing.
3. **Asserted** (Fable 5.1): 26-0003 would show a client record defaulted to claimant. **True instead:** deliberately seeded with NO client (`seed.ts:222`). **Changed:** the screen he found was better for edge (iii) than the one he was sent for; recorded as HS-1's origin.

## §10 — WHAT THIS SITTING DID NOT DO
No trigger for an instructions update fired (no convention added, changed, or retired; the working set gained two `claude_` transit files, not a material change). Nothing was built. No registry entry was proposed. LIVE was not walked. The `#147` captures in project knowledge (`claude_FE-D1A_Continuation_Capture_2026-09-03.md`, `claude_Handoff_Session_Log_2026-09-03.md`) satisfy TRANSIT condition (1) at HEAD; condition (2) is unverified and their relocation is a separate act.
