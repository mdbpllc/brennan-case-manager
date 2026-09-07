# CC-1 RULINGS AND ADDRESS-MODEL SLICE — the sixteen hands-on rulings of 2026-09-05 and the facility/party address model of 2026-09-07, as one build — BUILD SLICE

**Status: BUILD-AUTHORIZED — `CCS-1` RULED YES by Michael, 2026-09-07 17:11 CDT, verbatim *"yes"*, with `HS-3` IN (session-log entry `#149`; the authorization was put whole, then broken into seven limbs at his instruction and each limb ruled in his words — see `#149` and the RULING-class record of the sitting).** Nothing in this document builds anything by itself; the session that produced it wrote no code and read `src/` only over the device bridge for verification, never to design from. **The kickoff prompt at `docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md` is filed and fires on the `#149` entry at HEAD and on nothing else; the queue runner is BARRED from this slice.**

- **Canonical repo path:** `docs/specs/cc1-rulings-and-address-model-slice.md` (CAP-2 class: RULING) — stable and unversioned, following `fe-d1-amendment-slice.md`.
- **Authority, in order:** `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` (the sixteen rulings, R1–R16, in Michael's words; session-log `#148`); **this document's §2.2 — the five address-model rulings of 2026-09-07 (`#149`)**, which live here first; `docs/specs/fe-d1-amendment-slice.md` (the built engine's design authority, §5–§10) and its §10 defaults as ANNOTATED at batch 90; `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` (third edition) §11–§18 with its §18.F annotations; `docs/specs/form-engine.md` §3, §9 (verbatim, never reworded), §10; `docs/specs/contact-directory.md` §5; `docs/spec-feedback.md` item 2 and its 2a addendum (the second-tranche section — find it by heading, never by number: four sections of that file open with an item "2"). On any conflict between this document and those authorities at HEAD, **the later ruling governs and the disagreement is named.**
- **Authored:** 2026-09-07 Central (typed, Cowork, Fable 5.1 per the environment; device bridge granted on the checkout), against HEAD `f5bbdf9` (the `HS-2`/F7 fix, corrected at `d46ff15`), verified at origin by `git ls-remote` from the bridge VM. Every `src/` statement below was READ AT HEAD over the bridge in this sitting (the model, not a grep — `partyRegistry.ts` whole, `context.ts`, `generate.ts`, `tiers.ts`, `caseProviders.ts`, `assembly.ts` by function name); cites are to FILE and FUNCTION, never to a line number.
- **PF-1: did NOT fire on the packet carrying this document, and the skip is recorded rather than silent.** This document proposes no registry entry and characterizes no law. TRCP 195.5(a)(1) appears only as FE-18's existing ratified basis (REQ-CAPTURE §1.6) and is never restated; every text act in a served document is drafted as PROVISIONAL and named for Michael's eye (§6, §7).
- **DT-1:** every stamp is 2026-09-07 Central.

---

## 0. HOW TO READ THIS DOCUMENT — four provenance classes, and the rule for each

| Class | Meaning | What a build session does with it |
|---|---|---|
| **RULED** | Michael's own words decide it (quoted, with cite) | Build it as stated. |
| **RULED-BY-SELECTION** | Michael picked among descriptions Claude wrote (the pick is his; the words around it are Claude's) | Build the selection; never quote the option text as his words. |
| **DEFAULT (PROVISIONAL)** | Nothing on the record decides it; a default is NAMED here (`SD-n`) so the build does not decide it silently | Build the default exactly as named; **report it in the session entry as a default taken**; never "improve" it. |
| **TEXT ACT** | A sentence or label that goes out in a served document or on a screen Michael reads from | Build the PROVISIONAL string named here, mark it provisional in code with the `SD-n` cite, and list it in the entry; Michael approves before any real record. |

**Two rules that bind every section below.** (1) Nothing in this slice inspects, parses or matches the WRITER's parts or the assembled paragraph (REQ-CAPTURE §11.6, §16.4). **The address split of §3 item 17 is a ONE-TIME RULE OVER A STORED RECORD FIELD, run by a migration step and marked, and it is not a render-time parser; the render path reads two fields and never splits anything** — D1(iii), `#149`. (2) `form-engine.md` §9's twelve paragraphs are Michael-approved VERBATIM and are not reworded, retired or edited by this slice.

---

## 1. THE STATE THIS SLICE IS SPECIFIED AGAINST (HEAD `f5bbdf9`)

- **The FE-D1 amendment slice is BUILT, both tranches (§13 items 1–14), walked on demo, fixture-only, EXCLUDED from the GL-1 floor.** `STORE_VERSION = 15`; `db/schema.sql` at 46 `create table`; tests 643 across 42 files (per BUILD-STATE at `d46ff15`, measured by the Code session that wrote it). `HS-2`/F7 is FIXED at `8625508` + `d46ff15`: the 195.5 block reads street, city/state/ZIP and phone through one shared `facilityContactLines()` in `src/forms/generate.ts`.
- **Every migration has RUN on the live database as of 2026-09-07:** `MIG-1` and the amendment on 2026-09-03 (`#147`); the fix migration `db/migrations/2026-09-03-fe-d1-amendment-fix.sql` on 2026-09-07 by Michael's hand, all three checks answered in words (`#149`). **`renders-care-at` is accepted live.** No migration is pending. This slice WRITES two and RUNS none (§5).
- **The registry (`src/domain/partyRegistry.ts`, read whole):** NO party type carries `addressLine1`, `addressLine2` or `cityStateZip`. The shared `CONTACT` block stores ONE `address` textarea ("Mailing address"); `providerBusiness` ("Facility") stores `locations[]` items of `{ label, address, phone, recordsContact }` with ONE `address` text ("Physical address"); `lawEnforcementAgency` and `court` carry their own single `address` textarea. **The instrument reads two-line keys in THREE regions** — `facilityContactLines()` (the 195.5 block), `person_address_line_1` / `person_address_line_2` (persons with knowledge, `context.ts`), `firm_address_line_1` / `firm_address_line_2` (the service list, `context.ts`) — **and only the fixtures write those keys** (`src/data/disclosureFixtures.ts` `facilityParty()`, `src/forms/fixtures.ts`). So a facility, witness or opposing counsel entered through the app's own party form renders addressless. That is `spec-feedback.md` item 2 + 2a, and the 2a addendum's two consequences: panel line 1 is FALSE for the app-entered shape, and the bare phone slides up unlabelled into the street's slot.
- **The R17 row (`src/domain/caseProviders.ts` `CaseProvider`)** carries `facilityPartyId`, `providerType`, treatment dates, `lop`, extraction pointers and `typeCarriedFromCaseId`. **No location field exists.**
- **`TierInput` (`src/forms/tiers.ts`)** holds `selected`, `individuals`, `facilityNames`, `facilityAddresses: { hasAddress, hasPhone }`, `chronologyVersions`, `billedFacilityPartyIds`, `billedIndividualPartyNames?`, `alreadyDesignated?`, `affiliationMismatches?`. It does NOT hold the unselected provider rows, party types, or bill totals — R1 and R3 add them.
- **`lastToken()` (`src/forms/assembly.ts`)** takes the last whitespace-separated word of `displayName` as the surname; `DOCTORAL_CREDENTIALS` is `['MD','DO','DC','DPM','DDS','DMD','PHD','PSYD']`.
- **The sign-in page (`src/pages/SignInPage.tsx`)** still says *"the sending limit is low"* — written 2026-07-28 for Supabase's default sender; gate 9 CLOSED 2026-09-07 on Postmark (`#149`).
- **Standing exclusions restated:** no real client data anywhere (the one LIVE matter is a TEST record — Michael's word, `#149`); the engine stays EXCLUDED from the GL-1 floor; no real record moves through the model-call path until a BAA is signed (`H12-v`); the fixture writer is the only writer in both modes.

---

## 2. THE RULINGS THIS SLICE BUILDS

### 2.1 The sixteen of 2026-09-05 (`#148`) — pointer table; the record is `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md`, cited by its own §

| # | Ruling (record §) | Michael's words | Build effect, in one line | Class |
|---|---|---|---|---|
| R1 | ND-7(c), §1 | *"c"* → *"Take c1."* | Three tiers keyed on `partyType`: billed `providerBusiness` on the list unticked → panel (unchanged); billed `providerBusiness` with NO provider row → **MUST-FIX**, clearing by Medical-tab add or retype; billed non-`providerBusiness` → informational panel line. `TierInput` gains the unselected rows (or a caller partition) and reads party type via the caller's `partyById`. | RULED |
| R2 | the stop's SHAPE, §1 | *"I'll rule with youre recomendation."* | Top "Fix these first — N" card stays; the Generate button, while any must-fix stands, is DISABLED and STATES THE COUNT; no dialog; not merged into the HD-1 panel; "exactly three conditions" → FOUR; the "sits here provisionally" footnote comes off. | RULED-BY-SELECTION |
| R3 | Q5 + Q10, §1 | *"Go with B"* | Panel line 7 carries the facility's billed total inline; gap lines sort charge-descending; no threshold; panel tier. `TierInput` gains bill totals per facility party, scoped to the active client as `billedFacilityPartyIds` is. FE-22's "threshold" retires as a concept. | RULED-BY-SELECTION |
| R4 | the rider's supervisor, §1 | *"Move with your recommendation."* | GROUP FILL always; the `assembly.ts` comment inviting a hand-designated supervisor comes off; no override built. | RULED-BY-SELECTION |
| R5 | CL2-AC-1, §2 | (i) *"Nothing happens to the damages scope"* (ii) *"Default from practice area, editable"* (iii) *"new links only, flag the gaps"* | Auto-create the damages-scope (`case_clients`) record on a PI Client-role link; unlink is a roster act only — the record PERSISTS; posture defaults Criminal → defendant, otherwise → claimant, editable on the row; NO retroactive create — an existing Client-role link with no damages record gets a flag in the CL-2 backfill-flag shape. | RULED |
| R6 | CL2-CHECK-1, §2 | *"Adopt"* | Flag-only consistency check, never auto-fix: (1) a damages-scope record whose party carries no Client/Plaintiff role on the case; (2) a Client-role party with no damages record. Renders in the TOP flag area (R16). | RULED |
| R7 | `BL-1`, §2 | *"Build it"* | Bill label defaults to the provider (facility) name on creation; editable; display-only. | RULED |
| R8 | FE-§11.4, §2 | UX-1 *"'save as a new version' is what it should be changed to."* · UX-2 *"Warn on save, dont block"* · UX-3 *"per row expander"* · UX-4 *"mechanical, from the diff"* | Button → "Save as a new version" (subtitle rewritten to match); a token not in the seeded registry WARNS on save naming it, save-anyway, non-blocking; each version row gets a "what changed" expander (lines removed / added vs the immediately preceding version; no compare-any-two); the Note column autogenerates MECHANICALLY from the diff, NO model call; the hand-note field stays optional. | RULED |
| R9 | D-21, §3 | *"a - as built"* | STANDS as built: every member named at any count, "Drs." surnames only when every member is MD/DO/DC, no cap. **Nothing to build; a test pins "no cap".** | RULED |
| R10 | D-11, §3 | *"b"* | they/their still renders for an individual with no pronoun on record AND the panel carries one line per such individual (PANEL tier, fixed on the Medical tab). | RULED |
| R11 | D-64, §3 | *"B, but make sure that we're also putting the address and phone number underneath the facility name as well."* | The LITERAL "And/or Custodian(s) of Records" at every N ≥ 1; N = 0 stays "Custodian of Records"; pharmacy keeps §9.10's literal; NO inflection. His second clause is §3 item 17 (the address model) — the requirement that found `HS-2`. | RULED |
| R12 | D-49, §3 | *"Leave it out"* | DPT stays OUT of `DOCTORAL_CREDENTIALS`; the "pending hands-on" note on the constant comes off. | RULED |
| R13 | D-50, §3 | *"Just call them '[doctor name], [suffix]' in the designation block."* → *"Yes"* | `{midlevel_short_name}` = `display_name` + ", " + `credential_suffix`; no courtesy title, no "Dr.", no pronoun inference; the Mr./Ms. table in `assembly.ts` is RETIRED for mid-levels; `{midlevel_his_her}` unchanged. | RULED |
| R14 | D-29, §3 | *"I believe that this works."* | Medical-tab layout STANDS. **Nothing to build.** | RULED |
| R15 | D-61, §3 | *"c"* | The title names the responding plaintiff ONLY on a multi-client case — *"Plaintiff <name>'s TRCP 194.2(b) and 195.5 Disclosures"* (amended/supplemental likewise); a one-client case keeps *"Plaintiff's …"*; certificate of service and footer follow the title (FE-15). | RULED |
| R16 | HS-1, §4 | *"Move it up."* | The *"FLAGGED — this case has no client record"* notice moves from the damages-scope card (`src/pages/ClientsCard.tsx`) into the top flag area beside the caption-alignment flags (`src/pages/RosterPanel.tsx`); the resolving control stays below and the flag points at it. | RULED |

### 2.2 The five address-model rulings of 2026-09-07 (`#149`) — stated in full here, because this is their first home; the RULING-class record of the sitting carries them too

The question was `spec-feedback.md` item 2 / 2a: *where does the 195.5 designation block get a facility's street, city/state/ZIP and telephone, for a facility entered through the app's own party form?* Rendered blocks for a fictional three-campus system were shown before each put; every alternative was named.

| ID | Put | Michael's words | The rule | Class |
|---|---|---|---|---|
| **D1** | The facility address model: (a) a designated PRIMARY location; (b) split each location's address into street + city/state/ZIP; (c) the case-scoped R17 row carries WHICH location treated the client; (d) composite (c)+(b) — Claude's lean | ***"d"*** | **(c) for the selection, (b) for the fields.** The R17 facility row carries the location that treated the client, chosen on the Medical-tab facility card and pre-filled from the last case the way the TYPE is (D-32's shape); each `locations[]` item's address is stored as street (+ suite) and city/state/ZIP so the block's two lines are honest. | RULED-BY-SELECTION |
| **D1(i)** | The telephone: formatted, hyphenated, or as stored; block only or instrument-wide | ***"formatted"*** | The block's phone renders in the app's display style — `(210) 555-0200` — never bare digits. **The scope limb was NOT answered** and is carried as **`SD-3`** (instrument-wide, one formatter at the render seam, every phone token), his veto open. Which phone: the selected location's, falling back to the facility's main phone — stated as `SD-2` and not objected to. | RULED (formatting) / DEFAULT (scope, which-phone) |
| **D1(ii)** | A location whose address was entered on ONE line before the split: render the one line + panel; must-fix; render silent | ***"I would like you to render what it has, but split the street and suite to one line and the city state zip on another line."*** | **A fourth answer, outside the offered set: the legacy one-line value renders as TWO lines — street (+ suite) / city, state ZIP.** VERIFIED before re-asking: the 2026-08-22 bar on a prose-parsing layer (REQ-CAPTURE §8 Q2; the amendment slice's DO-NOT) is about the CHRONOLOGY and does not reach an address string; the pre-sitting prompt's wider reading was Claude's gloss. | RULED |
| **D1(iii)** | WHERE the split happens and whose eye confirms it: (1) once, at the record, by the migration step, marked "by rule", confirm-or-edit on the party page, one panel line per unconfirmed split, the render path never parses; (2) at render, every time, write nothing back; (3) once, silently | ***"1"*** | **Split ONCE, at the record, by the store/DB step that adds the two fields**, by the stated rule — *the last two comma-separated parts are the city/state/ZIP line; everything before them is the street line (suite stays with the street); where the rule cannot split, the whole value stays on the street line* — each split row MARKED "split by rule" (the R17 provenance pattern), shown on the party page with confirm-or-edit, one panel line per unconfirmed split on the matter, mark and line gone once he touches it. **THE RENDER PATH NEVER PARSES.** | RULED-BY-SELECTION |
| **D1(iv)** | The persons-with-knowledge lines and the service list: (1) same treatment instrument-wide; (2) facility only; (3) persons yes, service list no | ***"1"*** | **ONE address shape in the whole registry:** the shared `CONTACT` "Mailing address" textarea on every person-type and organization-type party (and the two types with their own `address` — `lawEnforcementAgency`, `court`) becomes street + city/state/ZIP; existing one-line values split once by the same rule, marked, confirmable; all three regions read the split fields. | RULED-BY-SELECTION |
| **D1(v)** | The tokens: (1) rule under the current tokens; (2) hold the block half until RF-2 | ***"1"*** | Build to the current three tokens and their `person_*` / `firm_*` siblings; a later RF-2 hand-in with different address tokens changes the rendering, not the record shape ruled here. `RF-2` stays open and untouched. | RULED-BY-SELECTION |

**Consequences named at the put and carried as scope (§3 item 17):** panel line 1 rewritten to be true for the shape; `facilityParty()` and the person fixtures conform to the split fields so fixtures stop rendering something the app cannot hold; `spec-feedback.md` item 2 + 2a ANNOTATED (never edited) to point here.

---

## 3. SCOPE — IN (numbered)

1. **R1 — the ND-7(c) three tiers** (§2.1 R1). `TierInput` gains the unselected provider rows (or a caller-computed partition) and a party-type read through the caller's `partyById`; tier 2 is a MUST-FIX rendered in the R2 card with the route line naming BOTH clears; tier 3 is an informational panel line. The third ND-7(a) line ("a person rather than a facility") is untouched.
2. **R2 — the stop's shape.** Card stays at the top; Generate DISABLED with the count in its label; the four-condition wording; the provisional footnote removed; no dialog.
3. **R3 — line 7 with the billed total inline; charge-descending gap sort; no threshold.** `TierInput` gains per-facility bill totals scoped to the active client.
4. **R4 — GROUP FILL, always;** the inviting comment removed.
5. **R5 — CL2-AC-1's three edges** on the roster link path (`src/pages/RosterPanel.tsx` and the adapter's link method): auto-create on PI Client-role link; persist on unlink; posture default from practice area, editable; new links only, existing gaps FLAGGED in the CL-2 backfill-flag shape (no retroactive create — *"Not guessed and not placeholdered"*).
6. **R6 — CL2-CHECK-1**, flag-only, two lines, top flag area.
7. **R7 — `BL-1`**, the bill-label pre-fill on creation in `src/pages/MedicalTab.tsx`'s bill form; editable; display-only.
8. **R8 — the four template-editor UX items** in `src/pages/TemplatesPage.tsx`: the verb and subtitle; unknown-token WARN on save (checked against the seeded `FormTokenDefinition` registry, canonical `{token}` form — FC-1); the per-row "what changed" expander; the MECHANICAL autogenerated note. No model call anywhere in it.
9. **R10 — D-11's panel line** per pronoun-less individual.
10. **R11 — D-64's literals**, no inflection.
11. **R12 — D-49**, note off the constant; **R13 — D-50**, the mid-level short name and the retired Mr./Ms. table for mid-levels.
12. **R15 — D-61**, the multi-client title and its followers (certificate of service, footer).
13. **R16 — HS-1**, the no-client flag moved up.
14. **R9 and R14 — nothing to build;** one test pins D-21's "no cap" (invariant 9).
15. **`HS-3` — the generational suffix** (IN — ruled at `CCS-1` limb 5, *"IN"*, §11): `lastToken()` strips a trailing generational suffix from the closed set `SD-9` before taking the surname, so *"Ray Caldwell Jr."* renders *"Dr. Caldwell"*; the suffix is NOT rendered in the "Dr." form and IS kept in the full-name form. Every `lastToken` caller (the Dr. form, the surnames join, the Mr./Ms. form) gets it.
16. **Two text acts outside the instrument, both his eye:** (a) the sign-in page's stale *"the sending limit is low"* sentence → `SD-11`'s PROVISIONAL replacement; (b) `README.md`'s "Known gap" paragraph (HS-6) — auth landed 2026-07-28; the paragraph is rewritten to describe the magic-link sign-in and to keep its no-real-data warning (`SD-12`).
17. **THE ADDRESS MODEL (D1, D1(i)–(v))**, in seven parts:
    - **(a) Registry.** `providerBusiness.locations[]` items gain `addressLine1` ("Street address (and suite)") and `cityStateZip` ("City, State ZIP") and **an `id`** (`SD-4`); the single `address` sub-field stays in the type for the legacy value but is NOT rendered on the form once the split fields exist (`SD-5`). The shared `CONTACT` block's `address` textarea becomes `addressLine1` + `cityStateZip`; `lawEnforcementAgency.address` and `court.address` likewise. The stored keys are exactly the ones the three regions already read (D1(v)).
    - **(b) The one-time split**, in the local store step v15 → v16 AND in a SQL data migration over `parties.fields` (§5), by the D1(iii) rule, marking each touched record `addressSplitBy: 'rule'` (per location item, or per party for `CONTACT`); an unsplittable value goes whole into `addressLine1`, `cityStateZip` empty, marked `'rule-unsplit'`. The mark clears to `'hand'` on the first save that touches either field (`SD-6`). **The render path never splits.**
    - **(c) The R17 row** gains `facilityLocationId` (nullable) — a selector on the Medical-tab facility card listing the facility's locations by label + street; pre-filled from the last case where it was set for that facility (the D-32 mechanism, `typeCarriedFromCaseId`'s sibling `SD-7`); auto-selected when the facility has exactly ONE location (`SD-8`); NULL with two or more locations → panel line, never a stop (`SD-10`).
    - **(d) The block reads the SELECTED location's** `addressLine1`, `cityStateZip`, and phone (`SD-2`); `facilityContactLines()` takes the resolved location, not the party. A facility with no locations at all renders the block to the name and ends — the §17.6 posture, unchanged.
    - **(e) Phone formatting** at the render seam (`SD-3`), through the existing display formatter in `src/components/phone.tsx` (or its domain sibling in `src/domain/phone.ts`) — never a second formatter.
    - **(f) Panel line 1 rewritten** for the shape — three lines replace the one false sentence (`SD-1`), each PROVISIONAL; `hasAddress` in `FormsTab.tsx` is recomputed from the selected location.
    - **(g) Fixtures conform:** `facilityParty()` writes `locations[]` with split fields and ids; the person fixtures in `src/forms/fixtures.ts` write `addressLine1` / `cityStateZip` (the `addressLine2` key retires — `SD-13`); the Garcia seed's `p-hosp-ctrmc` and `p-prov-procare` keep their single-line `address` so the v16 split step is exercised on the seed itself.
18. **The migrations WRITTEN AND NOT RUN** (§5): one schema migration (`case_providers.facility_location_id`), one data migration (the `parties.fields` split), each with a gate, catalog-lookup drops where anything is dropped (nothing is), and verification checks at the foot answered in words.
19. **Tests** — every invariant of §7; the trio green.
20. **`spec-feedback.md` item 2 + 2a ANNOTATED** (one dated line beneath 2a pointing at §2.2; nothing above it edited).

---

## 4. SCOPE — OUT, each with its home (nothing here is silently dropped)

- **The seven remaining PROPOSED hands-on items** — D-18, D-8, per-paragraph regenerate, `AS-Q14`–`AS-Q17` → **THE POST-`CCS-1` WALK**, the sitting Michael named for them on 2026-09-07 (*"Name the sitting."*) — the hands-on sitting after this slice lands, which also takes the eleven `SD-` text acts and the confirm-or-edit marks; the build keeps the amendment slice's §10 defaults for each and reports them as carried.
- **The twelve GATED accepted items** — CR-7, CR-CONSTRAINT, Q-FE6-5, Q-FE4-1, Q-FE5-3, Q-IN2-7, Q-IN1-1, Q-IN3-6, DA-1, DA-3, DA-4, FO-6 → their unbuilt modules.
- **The vendor adapter, credential, endpoint** → `H12-v`; BAA a hard gate; nothing here.
- **`RF-2` (the master-skeleton hand-in)** → Michael's; D1(v) builds to the current tokens.
- **`TFI-1`** (FE-18's operative wording) → untouched; the block reads the SELECTED facility's SELECTED location, which is the D-8 reading, and the ratified sentence is not edited.
- **`HS-8`** (probate as a case type) → RULED *"Deliberate"* 2026-09-07 — held on PR-3, nothing moves; `HS-5` → instructions v30 (ruled in, *"Yes"*); `HS-4` (the CL-2 backfill-flag wording) → a TEXT ACT drafted by the build as `SD-14`, his eye.
- **`FE-SEED-1`, `CAP-OPEN-1`–`4`, `O-1`, `O-7`/`G10-2`, `Q-COM-10 B–F`** → untouched.
- **One-click PDF, OneDrive storage, a file store** → gate 7.
- **A 195.2 date, a registry entry, new rule text anywhere** → never.
- **`SKILL.md` v3** → Michael's hand.
- **A geocoding, address-validation or USPS lookup of any kind** → not offered, not built; the split is a comma rule and nothing more.
- **The `addressLine2` token** (`person_address_line_2`, `firm_address_line_2`) → renamed in the CONTEXT builder only; **no `form-engine.md` §9 token is touched** (none carries it).

---

## 5. THE DATA MODEL AND THE MIGRATIONS

### 5.1 `case_providers.facility_location_id`
`alter table public.case_providers add column if not exists facility_location_id text;` — nullable; NO FK (it keys a jsonb sub-record, not a row); a comment stating that. The adapter's `CaseProvider` type, both implementations, the probe list UNCHANGED (no new table). `db/schema.sql` in the same commit.

### 5.2 The `parties.fields` data migration
One guarded `do $$` block over every `public.parties` row: for `providerBusiness`, each `locations[]` element lacking `addressLine1` and carrying `address` is split by the D1(iii) rule and given an `id` (`gen_random_uuid()::text`) and `addressSplitBy`; for every other type with a top-level `fields.address` and no `addressLine1`, the same split at the top level. **Idempotent:** a second run finds nothing lacking `addressLine1` and reports zero. STEP 0 counts in the header (rows per type carrying `address`); checks at the foot answered in words: (1) zero remaining `address`-only records; (2) every `locations[]` element has an `id`; (3) the count of `'rule-unsplit'` marks, listed by party display name so Michael can fix them by hand; (4) `pg_get_constraintdef` shows no CHECK touched. **WRITTEN AND NOT RUN.** The local store's v16 step is the same rule in TypeScript, pinned to a literal `16`, backing up first, with a regression test that a v15 store carrying `p-hosp-ctrmc`'s one-line location comes through as two fields and a `'rule'` mark.

### 5.3 The split rule, stated once so both implementations can be tested against it
Trim; split on commas; if fewer than three parts → `'rule-unsplit'` (whole value to `addressLine1`); else `cityStateZip` = the last two parts joined by ", " and `addressLine1` = the remaining parts joined by ", ". So *"400 Tourmaline Way, Suite 210, Rockvale, TX 78200"* → `400 Tourmaline Way, Suite 210` / `Rockvale, TX 78200`; *"3100 S 31st St, Temple, TX"* → `3100 S 31st St` / `Temple, TX`; *"3100 S 31st St, Temple TX 76502"* → `'rule-unsplit'`. A test pins all three.

---

## 6. NAMED BUILD DEFAULTS — every one PROVISIONAL; each reported in the build's session entry as a default taken; none "improved"

| ID | Default | Why it is a default |
|---|---|---|
| **SD-1** | Panel line 1 becomes three PROVISIONAL lines: *"<Facility> has no location selected on this matter — pick one on the Medical tab."* · *"<Facility> has no locations on its contact record — add one on the Parties page."* · *"<Facility>'s <label> address was split by rule — confirm it on the Parties page."* Line 2 (no phone) unchanged in substance, reworded to the selected location. | TEXT ACT — Michael's eye. |
| **SD-2** | The block's phone is the selected location's `phone`, falling back to the facility's main `phone`. | Stated at D1(i), not objected to. |
| **SD-3** | Phone formatting is INSTRUMENT-WIDE: every phone token through one `formatPhone()` at the render seam. | D1(i)'s scope limb was not answered; his veto open. |
| **SD-4** | `locations[]` items gain a stable `id` (uuid string), assigned on save and by the migration. | A selector must survive reordering; an index is fragile. |
| **SD-5** | The legacy single `address` sub-field is retained in the type and hidden on the form once `addressLine1` exists on that record; never deleted by the migration. | Nothing is destroyed; the split is reversible by hand. |
| **SD-6** | `addressSplitBy` ∈ {`'rule'`, `'rule-unsplit'`, `'hand'`}; any save touching either field sets `'hand'`; the mark is shown on the party page as *"split by rule — confirm or edit"* with a one-click confirm that sets `'hand'` without changing the values. | D1(iii)'s confirm-or-edit surface. |
| **SD-7** | The location pre-fill reads the last case where the SAME facility had a location set, exactly as the type pre-fill does; the row records `locationCarriedFromCaseId`. | The D-32 shape, applied. |
| **SD-8** | A facility with exactly one location auto-selects it and records no carried-from case. | No question to ask. |
| **SD-9** | The generational-suffix set for `HS-3`: `Jr.`, `Jr`, `Sr.`, `Sr`, `II`, `III`, `IV` (case-insensitive, trailing only). | HS-3 was unruled; a closed set, reported. |
| **SD-10** | A facility with two or more locations and none selected is a PANEL line (SD-1's first), never a fourth stop. | R1/R2 fix the stop set at four; the amendment's DO-NOT bars a fifth. |
| **SD-11** | Sign-in page sentence → *"Links are single-use and expire. If nothing arrives within a few minutes, check your junk folder before requesting another."* | TEXT ACT — Michael's eye. |
| **SD-12** | README "Known gap" → a paragraph stating sign-in is magic-link (2026-07-28), Supabase mode requires it, demo mode is ungated, and real client data waits on `Go_Live_Gates.md`. | HS-6 DOC FIX; wording his eye. |
| **SD-13** | `person_address_line_2` and `firm_address_line_2` read `cityStateZip`; the `addressLine2` key is read nowhere after this slice. | One shape (D1(iv)). |
| **SD-14** | The CL-2 backfill-flag wording (`HS-4`) is redrafted as a PROVISIONAL string beside the existing one, the existing one kept until he picks. | TEXT ACT — his eye. |
| **SD-15** | R8's autogenerated note format: *"N lines changed · token {a} → {b} · ¶k edited"* — counts and token diffs only; no prose. | The mechanical form he asked for; the exact string is his eye. |
| **SD-16** | R2's Generate label while blocked: *"Generate — N must-fix items stand"*. | TEXT ACT — his eye. |
| **SD-17** | R3's line-7 wording: *"<Facility> ($<total> in charges) goes out under the custodian-only paragraph because no individual could be named."* | TEXT ACT — his eye; dollars only, no share-of-total. |
| **SD-18** | R6's two flag lines: *"<Party> has a damages record but no Client role on this case."* · *"<Party> is linked as Client but has no damages record — open the damages scope card to add one."* | TEXT ACT — his eye. |
| **SD-19** | R5(iii)'s gap flag reuses the CL-2 backfill-flag component and shape, not a new card. | *"in the CL-2 backfill-flag shape"* — applied. |

---

## 7. TESTS AND INVARIANTS — each traceable; the untestable named as such

1. `TierInput` carries the unselected rows and party types; tier 2 fires MUST-FIX for a billed `providerBusiness` with no row; tier 3 fires a panel line for a billed `business`; neither fires for a billed individual (R1).
2. With one must-fix standing, `canGenerate` is false, the Generate label carries the count, and nothing is transmitted (a call spy — the amendment's own test extended) (R2).
3. Line 7 carries the total; two gap lines sort by charge descending; the total is scoped to the active client on a two-client fixture (R3).
4. The rider's `{supervising_provider}` is the group above at every shape that has a rider (R4).
5. Linking a PI Client-role party creates a damages record with posture from practice area; unlinking leaves it; a pre-existing Client link with no record raises the gap flag and creates nothing (R5).
6. The two CL2-CHECK-1 flags fire on their two states and never write (R6).
7. A new bill's label defaults to the facility name and is editable (R7).
8. The editor: label text; an unknown token warns and saves; the expander lists removed/added lines against the prior version; the note is generated from the diff with no network call (R8).
9. Twelve credentialled members render "Drs. A, B, … and L" with no cap (R9, pins D-21).
10. A pronoun-less individual yields exactly one panel line (R10).
11. "And/or Custodian(s) of Records" at N=1, N=2, N=5; "Custodian of Records" at N=0; §9.10's literal at a pharmacy (R11).
12. `DPT` is not doctoral; a PA renders name + ", PA-C" and never "Mr."/"Ms." (R12, R13).
13. A two-client case titles each instrument with its plaintiff; a one-client case does not; certificate and footer follow (R15).
14. The no-client flag renders in the top flag area and points at the damages card (R16, over source per the repo's no-jsdom convention).
15. `lastToken("Ray Caldwell Jr.")` → `Caldwell`; `"Ray Caldwell"` unchanged; `"Jr."` alone is not stripped to nothing (HS-3, if IN).
16. **The split rule** — the three §5.3 cases; the v16 store step marks `'rule'` and `'rule-unsplit'`; a second run changes nothing (idempotent).
17. **The render path never parses**: a location carrying `address` and no `addressLine1` renders NO street line and raises SD-1's panel line — proving nothing splits at render.
18. The block reads the SELECTED location: two locations on one facility, the row selects the second, the block carries the second's street and phone; the first's never appears (D1).
19. The phone renders formatted in the block, the service list and the persons-with-knowledge lines from one formatter (SD-3).
20. Persons-with-knowledge and the service list read `addressLine1` / `cityStateZip` from a party created through the registry's field keys (D1(iv)).
21. `facilityContactLines()` given a facility with NO locations returns three empties and the document still generates (§17.6 unchanged).
22. The migration file's three §5.2 checks are asserted against a fixture jsonb set under vitest (the SQL is exercised only by Michael's hand — stated, not tested).

**Untestable by construction, acknowledged:** whether a rule-split address is CORRECT for a given record (that is what the confirm mark exists for); whether any provisional string reads right (his eye).

---

## 8. DO NOT — the record's do-not-rebuild list, gathered with its cites, plus this slice's own

- **Do not parse, split or normalise an address at render time** — D1(iii). The split is a migration step and a store step, once, marked.
- **Do not add a fifth stop; do not make any panel line block** — R1/R2 fix the stops at four.
- **Do not build a model-written change note** — R8 UX-4, *"mechanical, from the diff"*; no model path exists until `H12-v`.
- **Do not auto-fix either CL2-CHECK-1 state** — R6, flag-only.
- **Do not backfill damages records for existing links** — R5(iii), *"Not guessed and not placeholdered."*
- **Do not inflect the custodian literal** — R11.
- **Do not add DPT to the doctoral set** — R12.
- **Do not render "Mr."/"Ms." for a mid-level** — R13.
- **Do not name the plaintiff in a one-client title** — R15.
- **Do not designate a facility, ever; a designation names a person or the person-role** (ND-1, FE-18) — unchanged.
- **Do not inspect the writer's parts or the assembled paragraph** — unchanged.
- **Do not reword, retire or edit any `form-engine.md` §9 paragraph, or rename any token that appears in §9's text.**
- **Do not compute, display or propose a TRCP 195.2 date; do not draft or insert a registry entry; do not write new rule text.**
- **Do not wire a vendor; no real record through the model path until a BAA is signed.**
- **Do not run either migration; do not connect to any database; do not amend a migration that has run.**
- **Do not touch `case_parties`, `case_roster_flags`, `party_pii`, or gate-10 walked ground.** `case_clients` is touched ONLY by R5's auto-create and R6's read.
- **Do not delete the legacy `address` value from any record** — SD-5.
- **Do not add a geocoder, validator or lookup.**
- **Do not edit `docs/skills/drafting-disclosures/SKILL.md`, `Go_Live_Gates.md`, the REQ-CAPTURE, the rulings doc, or any spec in `docs/specs/`** (`BUILD-STATE.md` excepted); spec problems go to `docs/spec-feedback.md`; item 2 takes ONE dated annotation line and nothing else.
- **Do not regenerate `docs/record/session-log-toc.md`; do not write to `docs/specs/session-log-head.md`; do not mint an `#nn`, a queue row, or an ID; do not double as the queue runner.**
- **Do not read "walked" as "live."** Fixture-only; EXCLUDED from the GL-1 floor.

---

## 9. BUILD CHECKLIST — for the authorized session ONLY (`CCS-1` RULED YES), in this order

1. **Baseline health trio BEFORE any change** — expect GREEN (643/643, build 0, lint 0 at `f5bbdf9`); any red is a stop to report.
2. **The registry change** (§3 item 17(a)) + the local store v15 → v16 step with the split rule (§5.3), its literal `16`, its backup, its regression test; the party page's confirm-or-edit mark (SD-6). Trio green.
3. **The two migrations** (§5.1, §5.2), `db/schema.sql` in the same commit; the fixture jsonb test (§7 item 22).
4. **The R17 location selector** (§3 item 17(c)), the pre-fill (SD-7), auto-select (SD-8), `facilityLocationId` through both adapters.
5. **The block and the two other regions** read the split fields (§3 item 17(d), (g); SD-13); `facilityContactLines()` over the resolved location; the formatter at the seam (SD-3); the panel's three lines (SD-1); fixtures conformed. Tests 16–21.
6. **R1, R2, R3** — `TierInput`'s three new fields, the tiers, the card, the label. Tests 1–3.
7. **R4, R10, R11, R12, R13, R15** in `assembly.ts` / the title builder. Tests 4, 10–13; test 9 pins R9.
8. **`HS-3`** if IN. Test 15.
9. **R5, R6, R16** on the Parties tab and the roster link path. Tests 5, 6, 14.
10. **R7** on the Medical tab. Test 7.
11. **R8** in the template editor. Test 8.
12. **The two text acts outside the instrument** (§3 item 16): SD-11, SD-12.
13. **`spec-feedback.md` item 2 annotation** (one dated line beneath 2a; CRLF — that file is CRLF, re-measure by a raw bytes read).
14. **Health trio after**; report all three against the baseline.
15. **Exercise by clicking in demo mode**: a Facility with three locations entered through the party form → the Medical tab selector → a generated block; the split mark on `p-hosp-ctrmc` after the v16 step; the four R8 items; R16's flag; R2's disabled button. Record defects honestly; spec problems to `docs/spec-feedback.md`.
16. **Close-out** per the prompt: unnumbered session-log entry (TOC-6) recording every `SD-n` taken and every text act drafted; BUILD-STATE rewritten in full under BS-1a AND CAP-4, displacing verbatim; `docs/record/session-log-toc.md` NOT regenerated; the head file not written; push and VERIFY with `git ls-remote origin refs/heads/master`; the entry asserts no post-commit action (QR-5(a)).

---

## 10. ON LANDING — what BUILD-STATE says at each of three moments (every count recomputed, never carried)

1. **When the packet carrying this document lands (docs-only) — the authorization and the slice land in the SAME batch:** the Forms-tab row reads "CC-1 rulings + address-model slice at `docs/specs/cc1-rulings-and-address-model-slice.md` — BUILD-AUTHORIZED 2026-09-07 (`#149`, Michael's word *"yes"*, `HS-3` IN); kickoff prompt filed; NOT YET BUILT"; the launch-path line reads gate 9 CLOSED 2026-09-07, GL-1 four of five with (5) completing at the v30 paste, and NO migration pending; the `HS-2` row reads FIXED at `8625508` + `d46ff15`.
2. *(There is no separate "when Michael authorizes" moment for this slice — it was authorized in the sitting that wrote it, and moment 1 says so.)*
3. **When the build lands:** the Forms-tab row takes the block's location read, the formatted phone, the four-stop set, line 7's total; the Parties row takes R5/R6/R16; the Templates line takes R8; the Data-layer line takes store v16 and the new column; the header reads "TWO migrations WRITTEN AND NOT RUN, in order" until Michael runs them; every `SD-n` taken, by number; every text act listed as PROVISIONAL, his eye.

---

## 11. THE AUTHORIZATION — `CCS-1`, RULED YES 2026-09-07

**`CCS-1` — Does Michael authorize the CC-1 RULINGS AND ADDRESS-MODEL SLICE at `docs/specs/cc1-rulings-and-address-model-slice.md`, scope IN (§3) and OUT (§4) as written, defaults (§6) as named, to be built by a fresh Opus Code session fired from `docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md`, the queue runner BARRED, fixture-only, the two migrations written and not run — with `HS-3` (the generational suffix, §3 item 15) IN?**

**RULED YES — Michael, verbatim, 2026-09-07 17:11 CDT: *"yes"*.** Put whole first, then, on his instruction *"Break this down more for me and let's rule on it."*, broken into seven limbs and each ruled in his words: (1) one slice, all four groups — *"1"*; (2) the address model's seven build parts — *"Confirmed"*; (3) two migrations written and not run, schema then data, his hand, before go-live — *"Confirm the recommendation."* (marked: the drawing Claude's, the adoption his); (4) the text acts provisional now, ruled at the walk — *"1"*; (5) `HS-3` — *"IN"*; (6) the session shape — *"Confirmed."*; (7) the YES. **The prompt's Step 0 test is satisfied by the `#149` entry at HEAD and by nothing else.** What the YES does NOT do: it neither accepts nor declines the seven remaining proposed hands-on items (D-18, D-8, per-paragraph regenerate, `AS-Q14`–`AS-Q17`); it does not touch `RF-2`, `TFI-1` or `H12-v`; it authorizes no vendor, runs no migration, and does not put the engine inside the GL-1 floor. Every `SD-n` is reported as taken; every text act reaches him at the walk before any real record.

*End of the slice document. The rulings doc §1–§4 and this document's §2.2 are the authority for WHAT was ruled; this document is the authority for HOW the slice builds it.*
