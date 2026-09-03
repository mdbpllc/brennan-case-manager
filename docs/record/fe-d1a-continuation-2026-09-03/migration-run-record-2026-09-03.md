# MIGRATION RUN RECORD — 2026-09-03 (Central) — `MIG-1` and the FE-D1 amendment migration, run by Michael's hand

**Class:** EVIDENCE (`CAP-2`). **Canonical path:** `docs/record/fe-d1a-continuation-2026-09-03/migration-run-record-2026-09-03.md`. **Recorded by:** the design session (`#147`) from Michael's pasted results, in the order they happened. **The live Supabase project; the Supabase SQL editor; every statement pasted by Michael.** No session other than his hand touched the database. The files run are the ones at HEAD `aa132f2`: `db/migrations/2026-08-20-fe-d1-form-engine.sql` (13,171 B) and `db/migrations/2026-09-03-fe-d1-amendment.sql` (31,587 B), staged from his checkout over the bridge and handed to him as files after his first paste turned out to be the file's PATH rather than its contents (Postgres: `42601 syntax error at or near "db"` — nothing ran).

## Order of events

1. `MIG-1` pasted whole and run — "Success". (STEP 0 counts had NOT been taken first.)
2. STEP 0 counts taken AFTER `MIG-1` and BEFORE the amendment — equivalent, because `MIG-1` never mentions `medical_bills`, `code_mappings` or `provider_billing_profiles` (verified from the file; it creates the four `form_*` tables and alters `generated_documents`). Michael: **"Count 0"** — recorded as **0 / 0 / 0**.
3. `MIG-1`'s eight checks (below).
4. The amendment file pasted whole and run — "Success" (the gate passed: check 1).
5. The amendment's checks (below); check 8 FAILED; the run STOPPED there per the file's own rule; check 9 run to complete the picture.

## `MIG-1` — eight of eight

Checks 1, 2, 3, 4, 5, 7 and 8 were run as ONE read-only statement (the file's own queries combined with `union all`, expected value beside each; check 4 given `relkind = 'r'` so indexes and sequences named `form_*` do not pad the rows). The grid Michael pasted:

| chk | result | expect |
|---|---|---|
| 1 tables exist | form_format_profiles, form_templates, form_template_versions, form_token_definitions | four names, no NULL |
| 2 authenticated can insert | true, true, true, true | true, true, true, true |
| 3 anon can insert | false, false, false, false | false, false, false, false (a true = STOP) |
| 4 rls on + one policy each | (cell truncated by the editor after two entries) — re-run as four rows: Michael: **"True and one on four rows"** | four entries, rls=true, policies=1 on every one |
| 5 generated_documents new columns | 7 | 7 |
| 7 no item table | NULL, NULL | NULL, NULL |
| 8 public table count | 41 | 41 |

Check 6 (the `doc_type` probe inside a rolled-back transaction): Michael ran the `begin; insert … select … from cases limit 1; rollback;` block — "Success. No rows returned." — then `select count(*) from cases` = **1**, so the probe row was inserted and rolled back with no constraint error: **a real pass, not vacuous.**

## The amendment — nine of ten; check 8 FAILED

Checks 2, 3, 4, 5, 6 (four limbs), 7 and 10 as one read-only statement. The grid Michael pasted:

| chk | result | expect |
|---|---|---|
| 2a five tables exist | case_chronology_versions, case_providers, case_provider_individuals, case_provider_visits, generated_document_paragraphs | five names, no NULL |
| 2b generated_documents.client_id | 1 | 1 |
| 3 authenticated can insert (five) | true, true, true, true, true | true ×5 |
| 4 anon can insert (five) | false, false, false, false, false | false ×5 |
| 5 rls on + one policy each (five) | case_chronology_versions rls=true pol=1, case_provider_individuals rls=true pol=1, case_provider_visits rls=true pol=1, case_providers rls=true pol=1, generated_document_paragraphs rls=true pol=1 | five entries, rls=true, pol=1 |
| 6a old table / new table | NULL / facility_billing_profiles | NULL / facility_billing_profiles |
| 6b tables with facility_party_id | case_providers, code_mappings, facility_billing_profiles, medical_bills | exactly four |
| 6c tables with provider_party_id | NONE | NONE |
| 6d constraints / indexes / policies named provider | **47 / 11 / 3** | 0 / 0 / 0 |
| 7 row counts vs STEP 0 | 0 / 0 / 0 | 0 / 0 / 0 (STEP 0 read 0, 0, 0) |
| 10 public table count | 46 | 46 |

**6d, decisive form** (the same three catalogs, names NOT on `case_providers`, `case_provider_individuals`, `case_provider_visits`, `generated_document_paragraphs`): **27 rows, every one a CONSTRAINT in Supabase's `auth` schema** — `custom_oauth_providers` ×20, `identities_provider_id_provider_unique`, `saml_providers` ×3, `saml_relay_states_sso_provider_id_fkey`, `sso_domains_sso_provider_id_fkey`, `sso_providers_pkey` — and ZERO indexes, ZERO policies. In `public`, nothing on the three renamed tables still says "provider". **Check 6 passes in substance; its third limb's TEXT has two defects** (no schema filter on the constraint limb; `'%provider%'` catches the file's own new tables).

**Check 8, part one** (`renders-care-at` with a period, inside a rollback) — **FAILED:**

```
ERROR:  23514: new row for relation "contact_edges" violates check constraint "contact_edges_type_check"
DETAIL:  Failing row contains (f590a36e-…, cc50c47c-…, 24df7134-…, renders-care-at, null, null, 2026-09-03 16:36:42.811727+00, 2025-03-14, null).
```

(The row's last two columns are `effective_from` = 2025-03-14 and `effective_to` = null: the two date columns landed.) `select count(*) from parties` = **2**, so the check was not vacuous.

**Diagnosis, confirmed on the live catalog** — `select conname, pg_get_constraintdef(oid) from pg_constraint where conrelid = 'public.contact_edges'::regclass and contype = 'c'`:

| conname | definition |
|---|---|
| contact_edges_edge_type_check | CHECK (edge_type = ANY (… nineteen values …, 'renders-care-at')) — the amendment's, twenty values |
| contact_edges_not_self | CHECK (from_contact_id <> to_contact_id) |
| contact_edges_type_check | CHECK (edge_type = ANY (… nineteen values …)) — the CD-1 migration's, NO `renders-care-at` |

Cause: `db/migrations/2026-08-12-cd1-contact-directory.sql` lines 188–190 NAMED the CHECK `contact_edges_type_check`; the amendment (line 430) ran `alter table contact_edges drop constraint if exists contact_edges_edge_type_check` — a silent no-op — then added its own CHECK under that name. Both stand; the old one rejects the new value. `db/schema.sql` carries the CHECK inline and unnamed, which is why the slice (§5.2) and the migration assumed the auto-name. **Check 8 part two: MOOT until the old CHECK is gone.** Ruled 2026-09-03: a follow-up migration file, written by the continuation build and run by Michael's hand; check 8 re-runs after it.

**Check 9** (`form_templates` accepts `fixed-sentence` and `writer-instructions`, inside a rollback): "Success. No rows returned." — both inserts accepted, no family CHECK error: **PASS.**

## Net state of the live schema at the end of the sitting

`MIG-1` applied and verified. The amendment applied: five new tables with RLS/policy/GRANT; `generated_documents.client_id`; the rename complete in `public` (three tables, `facility_billing_profiles`, no `provider_party_id`, no provider-named constraint/index/policy on the renamed tables); `contact_edges.effective_from` / `effective_to` present; the new period unique key; `form_templates` accepts the two new families; public table count 46. **One defect standing:** `contact_edges` carries the old `contact_edges_type_check` beside the new CHECK, so `renders-care-at` cannot yet be inserted — no code path does so until §13 item 6 is built. The §5 window (the app selecting `facility_party_id` against a database that lacked it) is CLOSED.
