# MIGRATION RUN RECORD — `db/migrations/2026-09-03-fe-d1-amendment-fix.sql` — run by Michael's hand 2026-09-07

**EVIDENCE (CAP-2).** Recorded by the Forward Sitting (`#149`) from Michael's reports in-session; the live Supabase project; the Supabase SQL editor. The design session connected to no database. Party UUIDs from the check-2 failing row are the LIVE test record's and are deliberately NOT copied here.

| Step | What Michael did / saw | Verdict |
|---|---|---|
| Pointed to | `C:\Users\Brennan\brennan-case-manager\db\migrations\2026-09-03-fe-d1-amendment-fix.sql` (12,001 B at HEAD `f5bbdf9`), read whole by the session first | — |
| His state before | *"I don't believe it has been run. If you point me to it I will go and run it."* | NOT RUN before tonight |
| The file, pasted alone | *"I got through step 3 here and it returned 'Success. No rows returned.'"* — the gate did not raise (the amendment's `contact_edges_edge_type_check` was present); the editor's result pane shows only "Success" for `do` blocks, so the notice line was not captured | RAN |
| Check 1 — exactly one `edge_type` CHECK | His paste of the grid: ONE row, `contact_edges_edge_type_check`, an ARRAY of TWENTY values ending `'renders-care-at'` | PASS — the stale `contact_edges_type_check` is GONE |
| Check 2 — the amendment's check 8, both halves, in a rolled-back transaction | `ERROR: 23514: new row for relation "contact_edges" violates check constraint "contact_edges_edge_type_check"` with the failing row carrying `renders-care-at ` (TRAILING SPACE) and null effective dates — the SECOND insert refused by the amendment's own CHECK, which proves the FIRST insert (`renders-care-at`, effective_from 2025-03-14) was accepted | PASS, both halves (on 2026-09-03 the first insert had failed on `contact_edges_type_check`) |
| Sanity — nothing persisted | `select count(*) from contact_edges where edge_type like 'renders-care-at%'` → **0** | PASS |
| Check 3 — check 6's third limb, rewritten (constraints / indexes / policies filtered to `public`, the four provider-born tables excluded) | Three-together paste: *"Success. No rows returned."* (the editor shows only the last result); then the constraint and index queries run SINGLY: *"Success. No rows returned on both"* | PASS — 0 / 0 / 0 |
| Backup | The file says back up first; Pro's daily backup stands; whether a fresh backup was taken tonight was not reported | not stated |

**Effect:** the amendment's ten checks are ten of ten across the two runs (2026-09-03: nine; 2026-09-07: the tenth plus the rewritten sixth). `renders-care-at` is accepted live. **NO MIGRATION IS PENDING on the live database as of 2026-09-07.** BUILD-STATE's banner, launch-path line and NEXT-ACTS bullet refresh on this record at the next batch.
