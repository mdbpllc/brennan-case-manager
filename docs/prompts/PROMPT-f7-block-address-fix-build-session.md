> **STATUS: PROMPT IN FORCE — the kickoff for ONE scoped Code session.** Canonical repo path: `docs/prompts/PROMPT-f7-block-address-fix-build-session.md` (CAP-2 class: RULING). Authorized 2026-09-05 by Michael on the rendered target block — *"The F7 block that you made there looks perfect."* — recorded at `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` §5 and session-log entry `#148`. **The queue runner is BARRED from this session. This session does exactly the two things below and nothing else.**

<!-- Paste everything below this line into a fresh Claude Code session on the machine holding the checkout. -->

# BUILD SESSION — HS-2 (F7): the 195.5 designation block's address and phone lines

## 0. Gate
Fetch origin. Confirm the checkout is at origin HEAD on `master`, clean. If dirty, diverged, off-master, or AHEAD of origin (unpushed local commits), STOP and tell Michael — do not build on a stranded push. Confirm `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` exists at HEAD; if it does not, the `#148` packet has not run — STOP.

## 1. The defect (verified at `5a85c31`, 2026-09-05)
`src/pages/FormsTab.tsx`, function `blockItem(b: DesignationBlock): RegionItem` (≈889–899) returns the `testifying_expert` region item with
```
facility_address_line_1: '',
facility_city_state_zip: '',
facility_phone: '',
```
hardcoded empty. The `treating_provider` region built a few lines above the call site (≈367–371) reads the same three values correctly:
```
facility_address_line_1: field(facilityParties[b.facilityPartyId], 'addressLine1'),
facility_city_state_zip: field(facilityParties[b.facilityPartyId], 'cityStateZip'),
facility_phone: field(facilityParties[b.facilityPartyId], 'phone'),
```
Consequence: every served 195.5 block carries the designee's name line, the custodian line, and the facility name — and no street, no city/state/ZIP, no phone — regardless of what the facility's contact record holds. FE-18's ratified text (REQ-CAPTURE §1.6) says the block reads the 195.5(a)(1) address and telephone from the facility. Panel lines 1 and 2 in `src/forms/tiers.ts` ("has no address on its contact record — the block needs one") describe a read that never happens. Introduced 2026-09-03 in `4d9577c`.

## 2. The fix — scope IN
1. Make `blockItem` read the three fields from the facility party exactly as the `treating_provider` region does. `blockItem` currently takes only the `DesignationBlock`; pass it what it needs (`facilityParties`, or the resolved `PartyRecord`) — the smallest change that keeps the two regions reading the SAME three fields from the SAME record. Do not duplicate the field-reading logic; if a one-line helper makes both regions share it, do that.
2. **Regression test**, in the existing `src/forms/__tests__/` or the Forms-tab test file if one exists — never a new test harness: (a) a facility whose record carries `addressLine1`, `cityStateZip`, `phone` renders all three lines in its `testifying_expert` item, in Part 3's order (name lines · custodian line · facility name · street · city/state/ZIP · phone); (b) a facility whose record lacks them renders the block WITHOUT those lines and the tier panel carries lines 1/2 — the ruled §17.6 posture ("flag it and allow the user to still create the document") is unchanged. Assert the strings come from the record, not from constants.
3. Run the full test suite and the health trio the repo's CLAUDE.md names. All green or STOP.
4. Regenerate a demo-mode designation on the Garcia fixture and confirm by eye in the `.docx` that Central Texas Regional Medical Center's block now carries its fixture address and phone. Record what you saw in the entry (§4). Do not paste the fixture address into code anywhere.

## 3. Scope OUT — do not touch
Nothing else from the 2026-09-05 sitting (R1–R16 are DESIGN, awaiting a slice). No `tiers.ts` change. No wording change to any panel line. No migration. No `src/forms/assembly.ts` change. No wizard, no Medical tab, no template editor. If the fix appears to need any of these, STOP and tell Michael.

## 4. Close-out (this is a Code entry — it does NOT mint a design `#nn`; TOC-6)
1. One commit: `fix(forms): HS-2 — the 195.5 designation block reads the facility's address and phone (F7)` with the two files (source + test). Attribution per the repo's CLAUDE.md.
2. **Prepend** a Code-session entry at the top of `docs/record/session-log.md` (never the derived head file): what was wrong, what changed, the test's two cases, what you saw in the regenerated fixture document. The entry may NOT assert the push — that is a prediction until verified.
3. Rewrite `docs/specs/BUILD-STATE.md` under BS-1a (150 non-blank lines) AND CAP-4 (100,000 bytes by `wc -c`); displace verbatim into your entry under `DISPLACED FROM BUILD-STATE (CAP-4)` if either binds, and name the shortfall in the banner. Re-derive every count (OPEN-5(a)). Move the HS-2 row's state to FIXED with the commit sha. Preserve the anti-resurrection-ledger pointer line.
4. Regenerate `docs/specs/session-log-head.md` and `docs/record/session-log-toc.md` per `docs/specs/thin-constitution-restructure-2026-08-21.md` §3.
5. Push. **Verify with `git ls-remote origin master`** that the remote ref moved to your sha. If the push is refused (the auto-mode classifier has refused a bare push before), say so plainly — Michael's hand-push is the designed path.
6. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the repo in the Claude project." Or: "Committed at `<sha>`, NOT pushed — push by hand."
