# MIGRATION RUN RECORD — the two `CCS-1` migrations — run by Michael's hand 2026-09-07 (evening, Central)

**EVIDENCE (CAP-2).** Recorded by the `#150` design session (the same Cowork chat as `#149`, continued after that packet shipped and after batch 91 and the `CCS-1` build landed) from Michael's reports in-session; the live Supabase project; the Supabase SQL editor. **The design session connected to no database.** No party name, UUID or field value from the live test record appears here; the only figures are counts and catalog names.

**Files run, in order, each pasted ALONE into an empty SQL buffer, both read whole by the session at HEAD `ea5675b` before he was pointed at them:**
1. `db/migrations/2026-09-07-address-model-schema.sql` (6,487 B, LF)
2. `db/migrations/2026-09-07-address-model-split.sql` (13,387 B, LF)

**Why they ran tonight rather than "before the first real record":** the session checked `src/data/supabaseAdapter.ts` at `ea5675b` — `case_providers` maps camelCase to snake_case 1:1 through the generic row helpers — so a location pick on the Medical tab at this HEAD writes `facility_location_id`, a column LIVE did not yet have. Reads were harmless; a write would have failed. The schema file therefore had to run before LIVE was opened at `ea5675b`.

## Part 1 — the schema file

| Step | What Michael did / saw | Verdict |
|---|---|---|
| The file, pasted alone | *"Success. No rows returned"* — the gate (`case_providers` exists) did not raise; both `alter` statements are `add column if not exists` | RAN |
| Check 1 — both columns exist, right types | Grid of TWO rows: `facility_location_id` / `text` / `YES`; `location_carried_from_case_id` / `uuid` / `YES` | PASS |
| Check 2 — no FK on `facility_location_id`, one on the other | ONE row: `case_providers_location_carried_from_case_id_fkey` / `f` / `location_carried_from_case_id`. No row names `facility_location_id` | PASS — the deliberate asymmetry is what is in the database |
| Check 3 — nothing else on the table moved | *"First one came back as true"* (`relrowsecurity`); one policy row — `authenticated full access case_providers` / `ALL` | PASS — RLS on, the amendment's single policy, unchanged |

## Part 2 — the split file

**STEP 0, taken by his hand BEFORE the run, four queries run singly** (the file asks for three; the session added the fourth because the file's check 4 compares the `parties` CHECK constraints against "before" without ever having him take the before-reading):

| STEP 0 | His result |
|---|---|
| (a) facility location items carrying a one-line address and no split | **0** |
| (b) non-facility parties carrying a top-level one-line address | **0** |
| (c) total parties | **2** |
| (d) `parties` CHECK constraints | ONE: `parties_kind_check` — `CHECK ((kind = ANY (ARRAY['individual'::text, 'organization'::text])))` |

So LIVE held two parties — the test record's — and neither carried a one-line address: the split had nothing to split. The file was run anyway, deliberately: its gate proves Part 1 from the data file's side, every existing location item gets its stable id, the scaffolding function is created and dropped, and the record can say both migrations ran rather than one. Predicted before the run, from STEP 0: check 1 → 0 / 0; check 2 → 0; check 3 → no rows; check 4 → the same one constraint; check 5 → 2; check 6 → NULL.

| Step | What Michael did / saw | Verdict |
|---|---|---|
| The file, pasted alone | *"Success. No rows returned."* — the gate (`parties` exists; `case_providers.facility_location_id` exists) did not raise; the editor shows only "Success" for `do` blocks, so the file's `raise notice` split-count line was not captured, as the session told him to expect | RAN |
| Check 1 — nothing left unsplit (two counts) | *"0 and 0"* — matches STEP 0 (a) and (b) | PASS |
| Check 2 — every location item has an id | *"0"* | PASS |
| Check 3 — what the rule could not split, by name | *"No rows returned"* — zero `'rule-unsplit'` records, and therefore ZERO "split by rule — confirm or edit" notices waiting on LIVE's Parties page | PASS |
| Check 4 — no `parties` CHECK constraint touched | ONE row, `parties_kind_check`, definition byte-identical to STEP 0 (d) | PASS |
| Check 5 — no row lost | *"2"* — matches STEP 0 (c) | PASS |
| Check 6 — the scaffolding is gone | *"null"* (`to_regprocedure('public.__cc1_split_address(text)')`) | PASS |
| Backup | Both files say back up first; Pro's daily backup stands; whether a fresh backup was taken tonight was not reported by him and not asked twice | not stated |

**Effect:** nine checks, nine passes, every predicted value landed exactly. **NO MIGRATION IS PENDING on the live database as of `ea5675b`** — the build entry's "TWO MIGRATIONS WRITTEN AND NOT RUN" and BUILD-STATE's "THE TWO THAT ARE PENDING" were true when written and are overtaken by this record; neither is edited (append-only log; BUILD-STATE refreshes at the batch that lands this). The `CCS-1` slice is now fully landed on LIVE: code at `ea5675b`, schema at Part 1, data at Part 2 (a no-op on two address-less parties). What the run did NOT do: it did not confirm any of the eleven provisional text acts, the nineteen `SD-` defaults, or the confirm-or-edit surface — those are the post-`CCS-1` walk's, with the product in front of him.
