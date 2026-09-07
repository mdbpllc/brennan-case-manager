# RULING LEDGER — THE FORWARD SITTING — 2026-09-07 (EVIDENCE, CAP-2)

> Canonical repo path: `docs/record/forward-sitting-2026-09-07/ruling-ledger-2026-09-07.md`. The running ledger of session-log entry `#149`, kept in the container within each exchange and copied here VERBATIM at close (the v28 operational note). The RULING record derived from it is `docs/specs/forward-sitting-rulings-2026-09-07.md`; where the two differ, this ledger is the earlier and rawer text and the rulings record is the ruled statement. One outside address that appeared in Michael's own words was redacted to "[a Proton Mail address he controls]" at the time of writing; nothing else is edited.

# RUNNING LEDGER — THE FORWARD SITTING — 2026-09-07 (Central; DT-1)

Typed design sitting, Cowork, Fable 5.1 (claude-fable-5-1 per the environment). Bridge granted on
`C:\Users\Brennan\brennan-case-manager` at 16:0x CDT. Every ruling is written here in Michael's words
within the exchange it is made; the capture at close is a copy of this file.

## §0 — SESSION START, VERIFIED (not carried)

- HEAD `f5bbdf9ba978c26041659c12910e737f8c481b3c` = local `origin/master` = `git ls-remote origin refs/heads/master`
  (the live remote read, run from the bridge VM, which had network) — 0 ahead / 0 behind, on `master`, no
  `.git/index.lock`. Lock-free (`GIT_OPTIONAL_LOCKS=0`). Untracked, DO NOTHING: `Claude outputs/`,
  `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md`.
- `inbox/` holds NO zip — only the leftover unzipped folder `push-to-code_fe-d1-amendment-slice_2026-08-31/`.
- Read whole: `docs/specs/session-log-head.md` (190,370 B; §1 reaches back to `#146`, ceiling bound, shortfall
  named); `docs/specs/BUILD-STATE.md` (99,936 B / 134 non-blank; CAP-4 bound); the 2026-09-07 Code entry at the top
  of `docs/record/session-log.md` (line 20; identical text in the head file); `docs/spec-feedback.md` item 2 + 2a by
  heading (lines 1240–1317 at this HEAD); `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` whole;
  `docs/specs/Go_Live_Gates.md` whole (GL-1 at its foot); `src/domain/partyRegistry.ts` whole (the model, not a
  grep); `src/forms/context.ts` 195–290; `src/forms/generate.ts` 60–110; `src/forms/tiers.ts` line-1 wording;
  `src/domain/caseProviders.ts` `CaseProvider`; `src/data/seed.ts` `p-hosp-ctrmc`; `src/data/disclosureFixtures.ts`
  `facilityParty()`; `src/pages/SignInPage.tsx` 40–52; `docs/smtp-setup.md` §4 + Completion;
  `docs/specs/h12-v-vendor-route-research-memo-2026-09-01.md` §3.1, §4, §5, §7, §8.
- Live log: 172 `## ` headings, 1 `## ARCHIVED:` marker → 171 entries. Newest design entry `#148` (live log, not
  the head file). THIS SITTING MINTS `#149`.
- Knowledge meter at open: 1,582,076 / 2,000,000 = 79.1%. Q-CAP-5(a) did NOT fire.
- CC-1 hands-on queue at open: 12 accepted, all gated — CR-7, CR-CONSTRAINT, Q-FE6-5, Q-FE4-1, Q-FE5-3, Q-IN2-7,
  Q-IN1-1, Q-IN3-6 (unbuilt modules); DA-1, DA-3, DA-4 (document storage, gate 7); FO-6 (no firm-obligations
  concept in the calendar code). 7 proposed — D-18, D-8, per-paragraph regenerate, AS-Q14, AS-Q15, AS-Q16, AS-Q17.
- STALE LINE FLAGGED for the next runner refresh (not acted on): BUILD-STATE "For design side" bullet — *"NEXT ACTS,
  IN ORDER: (1) open a FRESH Opus Code session on the corrected kickoff prompt … (2) run the FIX migration"* — item
  (1) was done by the 2026-09-03 second-tranche session; (2) is still pending. The same bullet later says "THE NEXT
  ACT IS NOW the slice authorization sitting for R1–R16", so the bullet contradicts itself.
- ALSO FOUND AT HEAD, for the packet: the `HS-2` register row is still ⬜ ("AUTHORIZED AND NOT RUN as of this batch —
  the row stays OPEN until that session lands"); the fix landed at `8625508` + `d46ff15` by a session barred from
  the runner, so the flip is owed to the next batch (a routed act in this packet).
- TRANSIT verified at HEAD for FOUR project-knowledge files: `#147` pair (`claude_FE-D1A_Continuation_Capture_
  2026-09-03.md`, `claude_Handoff_Session_Log_2026-09-03.md`) — condition (1) `#147` at live log; condition (2) every
  routing-table path exists: the prompt, the slice, the three EVIDENCE files under
  `docs/record/fe-d1a-continuation-2026-09-03/`, the spec-feedback section (line 1207), `FE-SEED-1`/`CAP-OPEN-4`/
  `HD-23` rows in the synced register. `#148` pair (`claude_CC1_HandsOn_Sitting_Capture_2026-09-05.md`,
  `claude_Handoff_Session_Log_2026-09-05.md`) — (1) `#148` at live log; (2) rulings doc 20,801 B, prompt 5,586 B,
  REQ-CAPTURE §18.F annotated (6 cites), slice §10 annotated (7 cites), HS-1…HS-8 rows present (HS-1, HS-7 ✅ in
  the closed register). BOTH PAIRS ELIGIBLE; step 2 (his save) and a named folder are his; step 3 never before 2.
- FACT FOR DECISION 1, read from the model: NO party type in `PARTY_TYPES` carries `addressLine1`, `addressLine2`
  or `cityStateZip`. `CONTACT` (client, person, attorney, business, lawFirm, expert, adjuster …) stores ONE
  `address` textarea ("Mailing address"); `providerBusiness` stores `locations[]` items with ONE `address` text
  ("Physical address") + `phone` + `label` + `recordsContact`. The instrument reads the flat two-line keys for the
  facility block (`facilityContactLines`), for persons-with-knowledge (`person_address_line_1/_2`) and for the
  service list (`firm_address_line_1/_2`). Only fixtures write those keys. So the mismatch is instrument-wide,
  not facility-only — named to Michael before Decision 1 is put; the facility question is put first.
- `CaseProvider` (R17 row) carries `facilityPartyId`, `providerType`, dates, `lop`, extraction pointers — NO
  location field today.
- Gate 9 facts at HEAD: BUILD-STATE says Postmark custom SMTP ON, sender `signin@brennanstx.com`, round trip one
  passed 2026-08-20 (#122); still owed — §4.4's outside-mailbox half (provider + folder named), §4.5's two later-day
  repeats, and the re-check that records the close. The sign-in page's "the sending limit is low" is app copy in
  `SignInPage.tsx:47` (2026-07-28 vintage), NOT evidence about the configured sender.

## §1 — RULINGS (in Michael's words, within the exchange)

### D1 — THE FACILITY ADDRESS MODEL (spec-feedback item 2 / 2a) — RULED
**Michael:** *"d"* — the composite: (c) the case-scoped R17 facility row carries WHICH location treated the client
(a Location selector on the Medical-tab facility card, pre-filled from the last case as the type is), and (b) each
`locations[]` item's address is split into street + city/state/ZIP in the registry so the block's two lines are
honest. Put with (a) primary-location, (b) alone, (c) alone as the alternatives and (d) as Claude's lean; the
rendered blocks for a fictional three-campus system were shown before the question. Prose-parsing stays barred.
Consequences named at the put and carried into the slice: panel line 1 rewritten to be true for the shape;
`facilityParty()` conforms to the ruled shape; phone formatting put as its OWN text act (next); RF-2/token shape put
as its own question; the persons-with-knowledge and service-list address keys put narrower after.
Time: 2026-09-07 ~16:2x CDT.

### D1(i) — THE TELEPHONE LINE — RULED (text act)
**Michael:** *"formatted"* — the block's phone renders in the app's display style, `(210) 555-0200`, never bare
digits. Alternatives put: hyphenated; as stored. **Scope limb NOT answered** ("every phone in the instrument or only
the block") — carried as a BUILD DEFAULT, flagged for his veto: instrument-wide, one `formatPhone()` at the render
seam for every phone token, so the block and the service list agree. Which-phone read order, stated as a default
and not objected to: the selected location's phone, falling back to the facility's main phone.

### D1(ii) — A LOCATION WHOSE ADDRESS WAS ENTERED ON ONE LINE (pre-split) — RULED, OUTSIDE THE OFFERED SET
**Michael:** *"I would like you to render what it has, but split the street and suite to one line and the city
state zip on another line."* Put with (1) render the one line + panel line, (2) must-fix, (3) render silent; his
answer is a fourth: the legacy one-line value renders as TWO lines — street (+ suite) / city, state ZIP.
VERIFIED BEFORE RE-ASKING: the 2026-08-22 "prose-PARSING layer stays barred" (REQ-CAPTURE §8 Q2; slice DO-NOT
list) is about the CHRONOLOGY — "a prose-parsing layer over the chronology" — not about splitting an address
string; the pre-sitting prompt's wider reading ("do not offer parse the single address field") was Claude's
gloss, not ruled text. Named to him. A comma-split is still a rule over free text in a served document, so the
narrower question put next is WHERE the split happens and WHOSE eye confirms it.

### D1(iii) — WHERE THE SPLIT HAPPENS — RULED
**Michael:** *"1"* — split ONCE, at the record, by the store/DB step that adds the two location fields; the rule
stated so it can be checked: the last two comma-separated parts are the city/state/ZIP line, everything before
them is the street line (suite stays with the street); where the rule cannot split, the whole value stays on the
street line. Each split row is marked "split by rule" (the R17 provenance pattern) — shown on the party page with
confirm-or-edit, one panel line per unconfirmed split on the matter, mark and line gone once he touches it. THE
RENDER PATH NEVER PARSES. Alternatives put: (2) split at render every time, write nothing back; (3) split once,
silently. Claude's lean was (1).

### D1(iv) — THE PERSONS-WITH-KNOWLEDGE LINES AND THE SERVICE LIST — RULED
**Michael:** *"1"* — same treatment, INSTRUMENT-WIDE: the shared `CONTACT` "Mailing address" textarea on every
person-type and organization-type party becomes street + city/state/ZIP; existing one-line values split once by
the same rule, marked, confirmable; all three regions (facility block, persons-with-knowledge, service list) read
the split fields. ONE address shape in the whole registry. Alternatives put: (2) facility only; (3) persons yes,
service list no. Claude's lean was (1).

### D1(v) — THE TOKENS — RULED
**Michael:** *"1"* — rule under the CURRENT tokens (`facility_address_line_1`, `facility_city_state_zip`,
`facility_phone`, and their `person_*` / `firm_*` siblings); the slice builds to them as they stand; a later RF-2
hand-in with different address tokens changes the rendering, not the record shape ruled today. Alternative put:
(2) hold the block half until RF-2. Claude's lean was (1). RF-2 stays open and is not touched by this.

**DECISION 1 CLOSED — five rulings, one of them from outside the offered set.** Consequences carried into the
Decision 4 slice: panel line 1 rewritten to be true for the shape ("no location selected on this matter" /
"no locations on its contact record" / "split by rule — confirm"); `facilityParty()` and the person fixtures
conform to the ruled split fields; item 2 + 2a annotated (never edited) to point here; HS-2's register row flips
✅ at the next batch with the fix commits named. Trigger 3 does NOT fire on Decision 1 — module design, not a
convention.

### D2 — REAL CLIENT DATA IN THE LIVE DATABASE? — ANSWERED
**Michael:** *"test record"* — the one matter on LIVE (`:5173`) is a TEST record. Asked plainly; the matter was
NOT opened and nothing from it is recorded. Consequence: go-live has NOT happened; trigger 1 has NOT fired;
BUILD-STATE's "NO REAL CLIENT DATA HAS EVER ENTERED THE APP" remains TRUE at this HEAD on his word (the repo
cannot establish it; recorded as his statement, the F-12 precedent). Decision 3 proceeds in its planned order.
Asked three times before (per the pre-sitting prompt) and answered here for the first time.

### D3 — WHEN THE FLOOR SITTING HAPPENS — RULED
**Michael:** *"1"* — NOW, inside this sitting: the SMTP dashboard read, the outside-mailbox round trip by his hand,
the gates re-check one gate at a time against `Go_Live_Gates.md`, and instructions v30 (the trigger-1 edition)
drafted tonight. Alternatives put: (2) its own sitting next (Claude's lean); (3) after the slice lands. The
pre-sitting prompt's "do not run the re-check inside Decision 3 unless he says so" is satisfied by this pick.
Context at HEAD: the re-check was HELD ONCE at `#126` (2026-08-20, v24 delivered, "SATISFIED IN SUBSTANCE;
completes at gate 9's close") — tonight is the COMPLETING pass. Gate 9 evidence owed: §4.4 outside-mailbox
(provider + folder), §4.5 two later-day repeats, the close recorded by this sitting.

### D3 step 1 — THE SMTP SETTINGS, READ BY HIS HAND (Supabase dashboard, Authentication → Emails)
**Michael:** *"1. Custom SMTP on; 2. signin@brennanstx.com; 3. smtp.postmarkapp.com"* — Custom SMTP ON, sender
`signin@brennanstx.com`, host `smtp.postmarkapp.com` (Postmark). Gate 9's SETUP half is confirmed on a live
dashboard read 2026-09-07, consistent with `#122`. The Outlook From line on Saturday's email was asked and not
yet reported — folded into step 2. The "sending limit is low" sentence in `SignInPage.tsx:47` is a stale text act
(built for the 2026-07-28 default sender) → the text-act list.

### D3 step 2a — SATURDAY'S EMAILS, THE FROM LINE
**Michael:** *"Saturday emails are coming from signin@brennanstx.com."* — the 2026-09-05 magic-link emails were
sent by the custom sender. That is one of §4.5's two later-day repeats (setup 2026-08-20 → repeat 2026-09-05, a
fresh sign-in on a later day). The outside-mailbox round trip (§4.4) is pending as this is written.

### D3 step 2b — THE OUTSIDE-MAILBOX ROUND TRIP HIT THE SIGNUP GATE (a finding)
**Michael:** *"I tried sending an email to an outside address [a Proton Mail address he controls], and it tells me
'Signups are not allowed for the otp.'"* — the app's own sign-in box refused the non-user address. That message is
Supabase Auth's response when "Allow new users to sign up" is OFF and the address is not an existing user.
CONSEQUENCE, worth its own line: BUILD-STATE's open act (1) — *"turn 'Allow new users to sign up' OFF (measured
ON 2026-08-20)"* — reads as DONE on this live evidence (the #125 security finding closed; when he flipped it is his
to say). And the §4.4 outside-mailbox test cannot run through the sign-in box by design: a non-user cannot
request a link. The #122 flag — "the invite-for-magic-link substitution FLAGGED for the re-check" — is therefore
the live question, put next with the alternatives.

### D3 step 2c — THE OUTSIDE-MAILBOX ROUND TRIP, RUN BY INVITE — DONE, USER DELETED
**Michael:** *"(1) Sent invite and email arrived from signin@brennanstx.com. I then deleted the user."* — the
invite-for-magic-link substitution taken (Claude's lean), the invite email reached the outside Proton Mail
mailbox from `signin@brennanstx.com` (Supabase → Postmark → Proton, the whole chain), and the temporary user was
deleted from Authentication → Users the same sitting, so no outside address holds a sign-in. *"On (2), I cannot
find where to send a test."* — (2) not needed once (1) ran; not pursued. STILL OWED for §4.4's own words: the
FOLDER (Inbox vs Spam) and arrival time — asked next. The when-did-signups-go-off question not yet answered.

**Michael:** *"1. Landed in inbox; 2. seconds"* — Proton Mail INBOX (not Spam), arrival in seconds. §4.4's
outside half is now stated in the runbook's own terms: provider Postmark, sender `signin@brennanstx.com`, outside
mailbox Proton Mail, folder Inbox, arrival seconds, 2026-09-07, by invite (the substitution). GATE 9 EVIDENCE
ASSEMBLED: setup confirmed live (step 1); round trip one 2026-08-20 (#122); later-day repeat #1 = 2026-09-05
magic links (Saturday); later-day repeat #2 + outside mailbox = tonight's invite. Remaining limb of the
Completion test: the credential stored nowhere but Postmark and the Supabase dashboard — asked with the close.
The signup-toggle date is still unanswered (three asks); carried as "off as of 2026-09-07, date not stated".

**Michael, on the signup toggle:** *"As far as the carry over, I believe that we turned that off on Claude's
instruction in about July."* — RECORDED WITH THE DISCREPANCY NAMED, NOT RESOLVED: `#125` (2026-08-20) MEASURED
the toggle ON; tonight the sign-in box's "Signups are not allowed for the otp" shows it OFF; his recollection is
July. Either it was re-enabled between July and 08-20 and turned off again since, or one of the two readings is
of something else. Unresolvable from the repo; what matters for the floor is the live state tonight: OFF. Noted
for the gate-9 append and for BUILD-STATE's open act (1): CLOSED on live evidence 2026-09-07, date of the flip
uncertain.

### D3 step 2d — GATE 9 CLOSED — RULED
**Michael:** *"(a) No, it is nowhere else."* — the Postmark SMTP token lives only in Postmark's dashboard and
Supabase's; the Completion test's last limb is satisfied on his word. *"(b) sure."* — GATE 9 IS CLOSED on
tonight's evidence, and THE INVITE-FOR-MAGIC-LINK SUBSTITUTION IS RULED TO COUNT as the outside round trip
(identical path: Supabase Auth → the same custom SMTP → the recipient; only the template differs). EDGE recorded
with the close: the magic-link TEMPLATE itself was never delivered to an outside mailbox — only the invite
template was; the magic-link template is proven to the firm's own tenant (2026-08-20, 2026-09-05). GL-1 item (3)
DONE. Repo act: an appended closure note beneath gate 9 in `Go_Live_Gates.md` (append-only; a work order in this
packet, exact text in the manifest); BUILD-STATE's launch-path line at the next refresh. Text act queued: the
stale "the sending limit is low" sentence in `SignInPage.tsx:47`.

### D3 step 3 — THE GATES RE-CHECK (completing pass over #126) — one at a time at his direction
**Michael:** *"Run the confirmations by me one by one."* — a FORM instruction, consistent with 2026-09-05's "Run me
through each one step by step." The four confirmations (gates 1, 2, 4, 7/8) put singly from here. Gates 3, 5, 6,
10 need no ruling and are read as confirmed at HEAD; gate 9 closed above.
- **Gate 1 — Michael:** *"Still on Pro."* — CONFIRMED 2026-09-07. GL-1 item (2) stands.
- **Gate 2 — Michael:** *"Yes"* — the multi-user-only reading (2026-08-11 clarification) STANDS for the solo
  go-live; the paralegal-in-the-software design (`HD-12`) is named as the second-user event that fires gate 2 and
  the GH-1 tripwire.
- **Gate 4 — Michael:** *"I do not believe that there has been any other exposure. When it comes to API keys, I have
  taken great care to follow your directions exactly."* — NO EXPOSURE of the LegiScan key value since 2026-07-25
  on his word; no rotation due on the gate's trigger; M-4's post-T3 rotation stands (T3 unbuilt). Gate 4 CONFIRMED.
- **Gates 7 / 8 — Michael:** *"Confirmed"* — billing analysis on real data stays DEFERRED until gates 7 and 8
  pass; no real EOB figure into a bill, no AnalysisRun confirmed on a real bill, until then. The Medical tab's
  providers/chronology/ledger are usable on a real matter within that limit. OBS-1 (hand-keying viability) is
  separate and untouched.
- Gates 3, 5, 6, 10: read as confirmed at HEAD, no ruling needed (3's edge (3) now met by the signup toggle OFF;
  5 by tonight's "test record"; 6 exercised Saturday and tonight; 10's edge (1) stays owed to `O-1`).
- **THE GATES RE-CHECK IS COMPLETE.** GL-1: (1) done · (2) done · (3) done tonight · (4) done · (5) this pass +
  v30 drafted at close — the floor is COMPLETE when v30 is pasted. Trigger 1 FIRES on this sitting (the
  go-live transition's re-check has now been run to completion); v30 is the trigger-1 edition.

### D8 — THE FIX MIGRATION (pulled forward into the floor for sequencing) — IN PROGRESS
**Michael:** *"I don't believe it has been run. If you point me to it I will go and run it."* — NOT RUN as of
tonight. Pointed to `C:\Users\Brennan\brennan-case-manager\db\migrations\2026-09-03-fe-d1-amendment-fix.sql`
(12,001 B at HEAD; read whole by this session before pointing: gate first, catalog-lookup drop, three verification
checks — check 1 exactly-one-CHECK, check 2 = the amendment's check 8 in both halves inside a rolled-back
transaction, check 3 = check 6's third limb filtered). Sequencing named: run BEFORE the first real record. Backup
first, paste ALONE, answer the checks in words. Awaiting his report.
**Michael:** *"I got through step 3 here and it returned 'Success. No rows returned.'"* — the file RAN (the gate
did not raise, so the amendment's CHECK was present); the notice line was not reported (the SQL editor's result
pane shows only "Success" for DO blocks). Whether the drop TOOK is decided by check 1, not by the notice — put next.
**Check 1 — PASSED (his paste of the result grid):** exactly ONE row, `contact_edges_edge_type_check`, definition
an ARRAY of TWENTY values (counted from his paste) ending `'renders-care-at'`. The stale
`contact_edges_type_check` is GONE. The drop took.
**Check 2 (the amendment's check 8, BOTH halves) — PASSED (his paste):** `ERROR: 23514: new row for relation
"contact_edges" violates check constraint "contact_edges_edge_type_check"` with the failing row carrying
`renders-care-at ` (TRAILING SPACE) and null effective dates — i.e. the SECOND insert was refused by the
amendment's own CHECK, which means the FIRST insert (`renders-care-at`, effective_from 2025-03-14) SUCCEEDED to
reach it. On 2026-09-03 the first insert failed on `contact_edges_type_check`; tonight it passes. The
transaction aborted on the second insert; a persistence sanity read is put with check 3. Party UUIDs in the
failing row are the LIVE test record's and are NOT copied into the record.
**Sanity — PASSED:** `count(*)` of `edge_type like 'renders-care-at%'` = **0**; nothing persisted from check 2.
**Check 3 — three queries pasted together returned "Success. No rows returned."** — that is the LAST query's
(policies) result; the editor shows one result set. The constraint and index limbs are re-run singly next so the
zero is measured for each (QR-6(a): a read that cannot disconfirm is not a verification).
**Michael:** *"Success. No rows returned on both"* — constraints limb ZERO, indexes limb ZERO, policies limb ZERO
(from the prior run). Check 3 PASSED on all three limbs. Check 6's third limb, rewritten, is answered 0 / 0 / 0.

**D8 CLOSED — THE FIX MIGRATION RAN BY MICHAEL'S HAND 2026-09-07 (~16:5x CDT), ALL THREE CHECKS PASSED IN WORDS:**
check 1 exactly one CHECK (twenty values); check 2 = the amendment's check 8 BOTH HALVES (first insert accepted,
trailing-space insert refused by `contact_edges_edge_type_check`), sanity 0 persisted; check 3 = 0/0/0. The
amendment's TEN checks are now ten of ten across the two runs (2026-09-03 nine; 2026-09-07 the tenth, plus the
rewritten sixth). NO MIGRATION IS PENDING on the live database as of tonight. `renders-care-at` is accepted
live. Backup: the file says back up first; whether a fresh backup was taken tonight was not reported (Pro's
daily backup stands regardless). BUILD-STATE's banner and launch-path line, the `#147`/batch-89 "one pending"
state, and the stale NEXT-ACTS bullet all refresh at the next batch on this record; the run itself is HIS act, not
a Code act, and is recorded here (the `#147` migration-run-record precedent → an EVIDENCE file in this packet).

### D4 — THE SLICE AUTHORIZATION (`CCS-1`) — put whole, then BROKEN DOWN at his instruction
The slice `docs/specs/cc1-rulings-and-address-model-slice.md` (41,194 B draft) and the kickoff prompt
`docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md` (13,615 B draft) were drafted BEFORE the
question and delivered to him as files. `CCS-1` collision-checked FREE repo-wide at HEAD; `SD-` free.
**Michael:** *"Break this down more for me and let's rule on it."* — a FORM instruction: the authorization is
decomposed into limbs and ruled one at a time; the composite of the limbs is `CCS-1`'s answer. Limbs put in
order: (1) one slice or two; (2) the address model's seven build parts; (3) the two migrations written-not-run;
(4) the text acts — provisional now or ruled now; (5) HS-3 in/out; (6) the session shape; (7) the YES.
- **Limb 1 — one slice or two — Michael:** *"1"* — ONE slice, all four groups (A engine, B registry/Medical tab,
  C Parties tab, D template editor), one Code session. Alternatives put: (2) A+B now, C+D second; (3) three.
- **Limb 2 — the address model's seven build parts (a)–(g) — Michael:** *"Confirmed"* — all seven as the build
  shape (slice §3 item 17(a)–(g)); no letter changed.
- **Limb 3 — the two migrations — Michael:** *"What do you recommend and why?"* — recommendation given with the
  alternatives named (one combined file; a lazy in-app split at first live read); answer pending.
  **Michael:** *"Confirm the recommendation."* — MARKED: the drawing is Claude's, the adoption is his. TWO files,
  written and not run; schema (`case_providers.facility_location_id`) first, data (the `parties.fields` split,
  idempotent, unsplit list by name at its foot) second; each pasted alone after a backup; his hand; BEFORE the
  first real record.
- **Limb 4 — the text acts — Michael:** *"1"* — PROVISIONAL NOW; ruled at the walk after the build lands, on the
  screen each lives on, in his own Chrome (CC-1(b)). None of the eleven is a served-instrument sentence — the
  block prints his record's values and the custodian literal is already ruled. Alternatives put: (3) rule all
  eleven now; a subset now.
- **Limb 5 — `HS-3` — Michael:** *"IN"* — the generational-suffix fix is IN the slice (§3 item 15; `SD-9`'s closed
  set; suffix dropped in the "Dr." form, kept in the full-name form). `HS-3`'s register row closes at the build's
  landing, not at this packet.
- **Limb 6 — the session shape — Michael:** *"Confirmed."* — a fresh Opus Code session (`/usage` first), fired
  from the prompt, the queue runner BARRED, fixture-only, migrations written not run; the continuation pattern
  applies without a new authorization if a session stops at a green boundary.
- **Limb 7 — THE AUTHORIZATION — Michael, verbatim, 2026-09-07 17:11 CDT: *"yes"*** — on the one text: *"`CCS-1`
  — Does Michael authorize the CC-1 RULINGS AND ADDRESS-MODEL SLICE at
  `docs/specs/cc1-rulings-and-address-model-slice.md`, scope IN (§3) and OUT (§4) as written, defaults (§6) as
  named, to be built by a fresh Opus Code session fired from
  `docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md`, the queue runner BARRED,
  fixture-only, the two migrations written and not run — with `HS-3` IN?"* Options put: YES as written; YES with
  an edit; NO / hold. **`CCS-1` IS RULED AFFIRMATIVELY — THE SLICE IS BUILD-AUTHORIZED AS WRITTEN, `HS-3` IN.**
  EFFECT: the prompt's Step 0 test is satisfied by the `#149` entry at HEAD and by nothing else; the slice's §11
  is edited before the packet closes to record HS-3 IN (RR-1); the register takes `CCS-1` as a row RULED YES
  (flipped ✅ and moved to the closed register at the runner's merge, its full text carried); `HS-3`'s row is
  ANNOTATED "IN the CCS-1 slice; closes at the build's landing", not flipped. What the YES does NOT do: it does
  not accept or decline the seven remaining proposed hands-on items; it does not touch `RF-2`, `TFI-1`, `H12-v`;
  it authorizes no vendor, runs no migration, and does not put the engine inside the GL-1 floor.

**DECISION 4 CLOSED.**

### D5 — `H12-v`, WHAT HE ASKS AND OF WHOM THIS WEEK — RULED
**Michael:** *"1"* — BOTH asks this week, in parallel: (a) he reads the AWS BAA in AWS Artifact himself (the memo
§4/§8 gap 4 — self-service acceptance by any account's root/admin user; no page states a size minimum and none
affirms a solo may accept) and, if anything is unclear for a single-attorney firm, an email to AWS support,
drafted tonight; (b) an email to the malpractice carrier/broker carrying the memo §7's corrected frame and its
thirteen questions verbatim, ending with the request to confirm in writing — drafted tonight. Alternatives put:
(2) carrier first; (3) AWS first. The addressee question (carrier direct or broker; a name) was NOT answered —
both drafts carry placeholders. Both are DRAFTS for his review, never sent by Claude (his standing rule), ending
in his standard signature block; project-knowledge files, never the repo. Nothing about a credential's home is
decided. Drafts delivered: `claude_Draft_Email_Malpractice_Carrier_AI_Drafting_2026-09-07.md` (memo §7's frame
and thirteen questions verbatim + the in-writing request) and `claude_Draft_Email_AWS_BAA_Solo_Firm_2026-09-07.md`
(contingent on his Artifact read; six questions). Outlook drafts offered, not yet answered.

### D6 — THE NEXT MODULE — RULED
**Michael:** *"Firm obligations first - also, the cr-3 and versioned manual are in the knowledge repo."* — FIRM
OBLIGATIONS is the next module (Claude's lean; the alternatives put in his practice's terms: intake — a design pass
before a build; the crash report; document storage — gate 7, the long pole). ORDER BEYOND "FIRST" NOT STATED and
not inferred. AND A FACT ANSWERED: `Q-IN2-1`'s "Yes — both" (2026-08-18) has LANDED — the blank CR-3 form and the
versioned instruction manual are in `Documents\Knowledge Repo` on his machine (his hand; bridge-reachable; H5 —
read when he directs). They are NOT in the repo, which holds only the code sheet at `docs/reference/`. Effect:
the crash-report module (`IN-2`) is buildable at the design level whenever it is called. NEXT ACT on the module
track: a firm-obligations DESIGN sitting — an open design pass with no prior art beyond the 2026-08-22 voice
rulings (`#137`: firm-level recurring obligations, stay lit until done, no snooze, thin by default — date +
name) and the roomless `FO-1`–`FO-7` rows living in log entries — producing a spec and the CC-1 questions that
`FO-6` and `FO-4` wait on. Nothing is authorized to build by this ruling.

### D7 — HOUSEKEEPING, SEVEN ROWS — one at a time at his instruction
**Michael:** *"Run through them one by one."* — FORM instruction; rows put singly.
- **Row 1 — `spec-feedback.md` renumbering — Michael:** *"leave and cite by heading"* — NOT renumbered; the
  convention for that file is cite by section date and heading, never by bare item number (an operational note
  for v30, not a trigger-3 convention). Alternative put: renumber by a later docs packet.
- **Row 2 — TRANSIT, the `#148` pair — Michael:** *"(a), and create the Session Captures folder in the knowledge
  repo folder."* — a PERMANENT HOME named: `Documents\Knowledge Repo\Session Captures\` (to be created by this
  session over the bridge). The `#148` pair leaves for it by the three-step act, the lossless step-1 method (the
  docs API read in his own Chrome), permission asked before the download, sha256 verified over the bridge, step 3
  never before step 2 is confirmed. The earlier zips in `Downloads\` may be moved there by his hand when
  convenient (not asked, not done).
- **Row 3 — TRANSIT, the `#147` pair — Michael:** *"Put them in the same zip if its not a problem."* — same
  folder, same zip: FOUR files leave tonight (`#147` pair + `#148` pair). Condition (2) for `#147` verified at
  HEAD tonight (six work orders in the prompt and slice; three EVIDENCE files under
  `docs/record/fe-d1a-continuation-2026-09-03/`; the three register rows; the spec-feedback section).
- **Row 4 — `HS-8` probate — Michael:** *"Deliberate"* — probate as a case type under PI with the PI ladder is
  the KNOWN, HELD state: PR-3 direction confirmed, execution held pending the Domser matter, `PL-1`–`PL-4`
  unruled. `HS-8` CLOSES as "deliberate — held on PR-3" (flip ✅ at the runner's merge with this text). Nothing
  moves. Alternative put: a gap — schedule the ladder pass now.
- **Row 5 — `HS-5` into v30 — Michael:** *"Yes"* — the magic-link / built-in-pane operational note goes into v30
  as drafted (with the 2026-09-07 signup-OFF and invite-substitution facts appended); riding with it as
  operational notes, not conventions: the CRLF-after-checkout note (batch 88) and row 1's cite-by-heading note.
  `HS-5` CLOSES at the v30 paste (annotated in the packet; flips when v30 is reported in force).
- **Row 6 — the leftover `inbox/` folder — Michael:** *"Deleted"* — VERIFIED over the bridge at 17:26 CDT:
  `inbox/` is EMPTY (the `push-to-code_fe-d1-amendment-slice_2026-08-31/` folder is gone). Off every carried
  list from this batch forward.
- **Row 7 — the seven remaining proposed items — Michael:** *"Name the sitting."* — the sitting is NAMED: **THE
  POST-`CCS-1` WALK** — the hands-on sitting after the CC-1 rulings + address-model slice lands, on the screens
  that build changes (the R17 card with its location selector; the tiers R1–R3; the block). It takes: D-18, D-8,
  per-paragraph regenerate, `AS-Q14`–`AS-Q17` (the seven proposed, each with its amendment default meanwhile), the
  eleven `SD-` text acts of the slice (limb 4), the confirm-or-edit marks on any rule-split address, and anything
  adjacent that is ripe. CC-1(c): Claude calls it unprompted when the build has landed and synced. The CC-1
  hands-on queue after tonight: 12 accepted (all gated, unchanged) + 7 proposed (unchanged) + the slice's eleven
  text acts and its confirm marks as the walk's agenda.

**DECISION 7 CLOSED (rows 1–7).** The TRANSIT act for the four files (rows 2–3) is executed next, before the
close, with permission asked before the download.

### TRANSIT — STEP 1 BUILT (17:3x CDT), download permission PENDING
Bridge: `~/Documents/Knowledge Repo` and `~/Downloads` granted; `Knowledge Repo\Session Captures\` CREATED
(empty). Chrome (his session, fresh tab 820381016): org `4a335e51-…`, project `019f9fc8-cb72-770d-a0f5-4a6405e7650b`;
the docs API lists 15 docs, 71,989 units in project docs. The four selected by exact name; a STORE zip built
in-page with `MANIFEST.json` + `MANIFEST.md` (bytes, sha256, uuid, tokens per file; the `claude/` folder mirrors
the namespace, not a repo path), name `brennan-case-manager_transit-0903-and-0905-pairs_2026-09-07.zip`,
**80,074 B, sha256 `0cd420cc3dd320d41b87b4cee83cbd8b2884d35213a6d016f2262b96173669ba`.** Files: CC1 capture
38,958 B / 11,834 units / `850a9595…`; 09-05 handoff 10,427 / 3,040 / `682fa079…`; FE-D1A continuation capture
8,522 / 2,550 / `77764c4b…`; 09-03 handoff 18,538 / 5,588 / `8bdd3570…`. Total 76,445 B, **23,012 units ≈ 1.15
points** (predicted meter after step 3: 1,582,076 − 23,012 = 1,559,064 = 78.0%).
**Michael:** *"permission granted."* — DOWNLOAD TRIGGERED on the fresh tab's first attempt (a fallback button
was injected and not needed). Step 2 VERIFIED over the bridge at 17:31–17:32 CDT: the zip in `Downloads\` is
80,074 B, sha256 `0cd420cc…3669ba` (equal to the in-page figure); `testzip` clean; all four entries byte- and
sha256-identical to the manifest. COPIED over the bridge to `Documents\Knowledge Repo\Session Captures\` and
re-verified there: 80,074 B, same sha256, `testzip` clean, entries match. The `Downloads\` copy is left in place
(his hand; the three 09-02 zips sit beside it). STEP 3 (delete from project knowledge) awaits his word.
**Michael:** *"go"* — STEP 3 RUN at 17:34 CDT: four `project_delete` calls, each `deleted: true`. Meter after:
**1,559,064 / 2,000,000 = 78.0% — a drop of EXACTLY 23,012 = the four files' `estimated_token_count` sum. The unit
calibration holds to the unit a FOURTH time.** Eleven project docs remain.
**A FIFTH AND SIXTH TRANSIT CANDIDATE FOUND on the post-delete listing, verified at HEAD, not in the pre-sitting
list: the `#146` pair** — `claude/claude_FE-D1A-1_Authorization_and_Transit_Capture_2026-09-02_Late.md` and
`claude/claude_Handoff_Session_Log_2026-09-02_Late.md`. Condition (1): `#146` at the live log (batch 88).
Condition (2): every routing-table path exists — `docs/record/fe-d1a-1-authorization-2026-09-02/` holds the
ruling ledger (9,453 B) and both relocation manifests; `FE-D1A-1`, `CAP-CARRY-1`, `CAP-CARRY-2` are in the closed
register; BUILD-STATE's lines landed. ELIGIBLE; offered to him for the same folder. The `#137` Voice2 pair stays:
its FO/BR/DA content has no design-doc home (condition (2) fails) — and it is now the prior art for the
firm-obligations design sitting (D6).
**Michael:** *"Yes, relocate."* — the `#146` pair leaves tonight, same folder. Step 1 built on a FRESH tab
(820381018): `brennan-case-manager_transit-0902-late-pair_2026-09-07.zip`, **39,746 B, sha256
`95fb51082734f1ac0a78f5a6c44da0d283aa2293d6853760db218c27e42ac9b0`**; the capture 17,253 B / 5,161 units /
`0914ae26…`; the handoff 19,887 B / 6,085 units / `faa30ba8…`; total 37,140 B, **11,246 units ≈ 0.56 points**
(predicted meter after step 3: 1,559,064 − 11,246 = 1,547,818 = 77.4%). Download permission asked with file,
source and size.
**Michael:** *"Permission granted."* — DOWNLOADED on the fresh tab's first attempt (17:35 CDT). Step 2 VERIFIED:
`Downloads\` copy 39,746 B, sha256 `95fb5108…2ac9b0`, `testzip` clean, entries match; COPIED to
`Documents\Knowledge Repo\Session Captures\` and re-verified there identically. `Session Captures\` now holds
both tonight's zips (80,074 B + 39,746 B). Step 3 awaits his word.
**Michael:** *"Go"* — STEP 3 RUN at 17:36 CDT: two `project_delete` calls, each `deleted: true`. Meter after:
**1,547,818 / 2,000,000 = 77.4% — a drop of EXACTLY 11,246. The unit calibration holds to the unit a FIFTH
time.** NINE project docs remain (the docs API in his session lists nine: the `#137` Voice2 pair, the
acquisition list, the form-corpus capture, README, `probate_system_prompt.md`, the three carried files; project
docs total 37,731 units = 1.9 points; the synced repo is the other ~75.5 points). Both Chrome tabs closed,
in-page state cleared. SIX files left project knowledge tonight by TRANSIT — 34,258 units ≈ 1.7 points
(79.1% → 77.4%). TRIGGER 4 FIRES (six files left; a permanent capture home was named) — resolved in v30.

## §2 — CLOSE (17:46 CDT)
- All eight decisions closed. Triggers: 1 FIRED (v30 drafted from the v29 file in `Downloads\` by exact-string
  edits, 82,874 B); 3 did not fire; 4 FIRED; 5 read as not firing (the SMTP token's home recorded for the first
  time — his read if otherwise); 6 did not fire (BUILD-STATE-vs-itself, flagged).
- RR-1 run: the slice (§4 OUT, §10, §11), the prompt (header, Step 0), and both email drafts re-read against
  every later ruling; conformed. RE-SWEEP after the conforming edits: the "IN or OUT" strings gone from both
  files; §10 moment 1 states the same-batch authorization.
- PF-1 did not fire — no legal characterization, no registry entry (the email drafts are questions).
- Packet: `push-to-code_forward-sitting_2026-09-07.zip` → `inbox/` on `mdb-pllc` over the bridge; contents per
  the manifest's §2; `CHECKSUMS.txt` inside.
- Delivered to Michael as files: the slice + prompt (drafts, then conformed), the two email drafts, v30, and
  the packet zip; the capture + handoff + drafts written to project knowledge; v30 committed to `Downloads\`
  beside v29.
- Bridge scratch left on his machine: NONE beyond the two relocation zips in `Session Captures\` (deliverables)
  and their originals in `Downloads\`; no lock stranded; `git status` never run.
