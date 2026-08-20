# Gate 10 — the FRONT-END half: PII writes leave `parties.fields` — BUILD SLICE

**Status: PROPOSED — NOT BUILD AUTHORIZED.** Authorizing this build is Michael's own act, in its
own ruling, on the CD-1 / FE-D1 / gate-10 pattern (**`G10-5`**, attorney-review queue). Nothing in
this document builds anything, and nothing in the dispatch that produced it wrote code.

**One ruling is already made and is carried here rather than left open:** the SSN visibility model —
**masked everywhere by default, explicit per-view reveal, NO reveal logging in this slice** — ruled
by Michael 2026-08-19 (Central), in the design session that authored this document. Reveal logging
is named as `O-1` material in §6 so it is not lost.

- **Canonical repo path (PROPOSED):** `docs/specs/gate10-pii-frontend-slice.md` — stable and
  unversioned, following the `gate10-pii-slice.md` / `cd1-build-slice.md` precedent.
- **Authority:** `Go_Live_Gates.md` gate 10; `docs/specs/gate10-pii-slice.md` (the schema half —
  read its §6 before proposing anything; every row there is a design already rejected and §6 binds
  this half identically); the `G10-3` answer (session log, gate 10 build entry, 2026-08-19).
- **Authored:** 2026-08-19 (Central), design session (Cowork, Fable 5), against repo state
  `f5e4ab4`. **The `src/` facts in §1 are the BUILD session's read, quoted from the record — this
  design session read no source** (`Q-PR3-1` unruled; the working-set policy governs).
- **Trigger context:** gate 10's schema half is BUILT, RUN AND VERIFIED LIVE (2026-08-19). The
  exclusion limb is delivered IN THE SCHEMA and NOT YET IN EFFECT IN THE APP. This slice is the
  named next act on the gate; the gate does not close without it.

---

## 1. The state this slice is specified against (the `G10-3` answer, quoted)

From the build session's `src/` read, 2026-08-19 — none of it re-verified design-side, all of it
verifiable by the authorized build session at its own HEAD:

- `src/domain/partyRegistry.ts` declares `dob`, `ssn` (flagged `sensitive: true`), `dlNumber` and
  `dlState` on the **client** party type (lines 94–97 at the build session's read) and `dob` again
  on the **person** type (line 255).
- `src/pages/PartyFormPage.tsx` renders **every** declared field with no filter and saves the whole
  blob; `client` is the form's default selection, so the SSN and licence inputs are on screen at
  page load.
- `src/pages/OaaIntakePage.tsx` writes a machine-extracted `dob` into `fields` on party creation.
- `src/data/seed.ts` plants `dob` on two demo fixtures.
- The Supabase adapter's `listParties()`, `getParty()` and `getParties()` are all `select('*')`.
- The `sensitive` flag masks the **display** in list views only (`src/components/fieldWidgets.tsx`,
  `•••–••–` + last four). It has no effect on storage.
- `src/components/RlsProbePanel.tsx:73` renders *"anon is granted nothing by design"* to the screen
  on a signed-out probe run — the false sentence of the 2026-08-19 privilege finding, standing in
  the UI because repairing it is a build act. **It is repaired in this slice** (§7 item 6).

**So SSN and licence numbers go into `parties.fields` today and ride every party read.** The child
table is only excluded while nothing joins it — and while nothing keeps writing the values into the
blob beside it.

## 2. Where each value writes from now on — and what happens to the registry

**The registry keeps all four field definitions and gains a notion of a field whose home is a
column rather than the blob.** Of the three options the dispatch names (lose them / keep with a
different destination / add a column-home concept), the third is proposed, because it keeps one
registry as the single source of what a party form renders — the property that made the `G10-3`
read possible at all — while changing only where a value lands:

- Each affected field definition gains a declared **storage destination**:
  `dob` → `parties.date_of_birth` (both party types that declare it) · `ssn` → `party_pii.ssn` ·
  `dlNumber` → `party_pii.drivers_license` · `dlState` → `party_pii.drivers_license_state`.
- Fields with no declared destination keep today's behavior (the blob). Nothing else moves.
- **The save path routes by destination, and the blob NEVER receives the four keys again:** the
  party save strips/blocks `dob`, `ssn`, `dlNumber`, `dlState` from the `fields` object it writes,
  whatever the UI hands it — belt and braces against a future widget writing the old shape.
- The OAA importer's extracted `dob` writes to `parties.date_of_birth`. The demo seed plants its
  two `dob` values on the typed field. Neither writes the blob key.

**DOB is not SSN, and this slice keeps the split the schema ruled (§5 of the schema slice):**
`dob` is an ordinary typed column on `parties` — read constantly, rendered inline, riding every
party read **by design**. `ssn` / `dlNumber` / `dlState` live in the child table and are fetched
only on demand (§3). Nothing here re-flattens that distinction, in either direction.

## 3. What the adapter stops doing, and what it gains

**`select('*')` on `parties` is the mechanism by which blob contents ride every read. It stops.**

- `listParties()`, `getParty()`, `getParties()` move from `select('*')` to an **explicit column
  list** (which now includes `date_of_birth`). A `select *` on `parties` cannot return a `party_pii`
  column — that is the schema half's protection — but explicit columns close the remaining path:
  the blob itself, which today still carries any values written before this slice lands, and
  whatever a future regression writes into it.
- **`party_pii` is NEVER joined into any list read.** The adapter gains two methods on the
  `DataAdapter` interface, so both modes keep working (binding architecture rule):
  `getPartyPii(partyId)` and `savePartyPii(partyId, patch)` — fetched on demand by the detail-view
  reveal and the edit form only. The Supabase adapter targets `party_pii`; the local adapter keeps
  an equivalent structure in its own store (store version bump, forward-in-place with backup, the
  v9→v10→v11 chain pattern).
- Deleting a party in local mode removes its PII record with it — mirroring the schema's
  `on delete cascade`, which stands as built while `G10-2` is ruled inside `O-7`.

## 4. Who may see an SSN, and where — RULED 2026-08-19

**Masked everywhere by default; explicit reveal; no log.** As ruled: every rendering of `ssn` (and
`drivers_license`) is masked (`•••–••–` + last four for SSN; licence analog) in lists AND detail
views; the party detail carries a deliberate per-view reveal control that fetches the child row on
demand; the edit form shows the stored value only behind the same reveal step. **No reveal event is
recorded in this slice** — reveal logging is audit machinery and rides `O-1`, for the same reason
`G10-1` went provenance-only: building it here would decide part of `O-1` by implementation.

The `sensitive` flag keeps its display-mask meaning and stops being the only protection.

## 5. Existing values — report, never move (the standing pattern, third application)

The migration's pre-flight found **zero rows** live on 2026-08-19 — but the app can write these
keys again tomorrow, and keeps doing so until this slice lands. So:

- **The authorized build session re-runs the schema slice's §5 report (both key lists, labelled —
  the ruled eight AND the four as-built keys) immediately before the write path flips.** Expect
  zero. **If any row returns: STOP, report the keys found, and put the disposition to Michael** —
  moving a value between homes is a decision, never a default (the CD-1 roster-flag precedent, the
  gate 10 pre-flight's own rule).
- The write-guard (§2) prevents new blob copies from the moment the slice lands. No backfill, no
  deletion of blob keys, and no data migration is specified or authorized by this document.

## 6. What this slice does NOT deliver — deferred, each with its home

- **Column-level `REVOKE`** becomes real only when a second role exists — **gate 2**, unchanged.
- **The audit limb** (history, freeze, `REVOKE UPDATE, DELETE`) rides **`O-1`**, unchanged — and
  **reveal logging is expressly parked there** (§4).
- **`G10-2`** (the `on delete cascade` reversal of `O-7`'s direction) is ruled inside `O-7`, not
  here; §3 merely mirrors the schema as built.
- **`G10-4`** (whether the gate's shape may rest on the unentered ch. 521 proposition) is its own
  queue row and is NOT folded into this slice; this document adds no legal characterization and
  proposes no registry entry.
- Encryption, last-4 storage, SSN format CHECKs, a separate `party_pii.id`, DOB in the child
  table: **all remain rejected per the schema slice's §6**, which binds this half identically.

## 7. Build checklist — for the authorized session ONLY (`G10-5`)

1. `src/domain/partyRegistry.ts` — storage destinations on the four field definitions (§2); no
   field removed, no key renamed.
2. Party save path (form + `updateParty`/`createParty` callers) — route by destination; strip the
   four keys from every `fields` write (§2). OAA importer and demo seed follow (§2).
3. `DataAdapter` + both adapters — explicit column lists on the three party reads;
   `getPartyPii` / `savePartyPii`; local-store version bump with backup (§3).
4. Visibility per §4 as ruled. No reveal log.
5. Pre-flip §5 report, both lists, labelled; STOP-and-flag on any hit.
6. `src/components/RlsProbePanel.tsx:73` — the signed-out message becomes the surviving sentence:
   *"anon holds none of the four DML privileges"* (adopted wording, 2026-08-19); it must not say
   "granted nothing."
7. Tests: registry destination routing, write-guard (a `fields` object carrying `ssn` never
   persists it), adapter parity in both modes, masked-by-default rendering, probe-panel text.
8. Health per CLAUDE.md (`npm test` / `build` / `lint` — a build session never takes the
   `QR-6(f)` skip limb). BUILD-STATE full rewrite; unnumbered session-log entry (TOC-6); verified
   push (`git ls-remote`).

**DESIGN-COMPLETE (proposed):** §§2, 3, 5, 6, 7 as written. **RULED:** §4. **AWAITING MICHAEL:**
the build authorization itself (`G10-5`) — and nothing else in this document.
