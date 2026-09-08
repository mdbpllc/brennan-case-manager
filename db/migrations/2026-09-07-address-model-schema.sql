-- Migration — 2026-09-07, THE CC-1 ADDRESS MODEL, PART 1 OF 2: THE SCHEMA
--
-- Authorization: docs/specs/cc1-rulings-and-address-model-slice.md, `CCS-1`
-- RULED YES by Michael 2026-09-07 17:11 CDT (verbatim "yes"), session log #149.
-- Design authority: that slice's §2.2 (the five address-model rulings, D1 and
-- D1(i)-(v), in his own words) and §5.1. On any conflict, the later ruling wins
-- and the disagreement is named.
--
-- ⛔ RUN THIS FILE FIRST, THEN `2026-09-07-address-model-split.sql`. The order
-- is not cosmetic: the data file's checks read the column this file adds.
--
-- RUN BY MICHAEL'S HAND, per the CL-2 / CD-1 / gate-10 / FE-D1 precedent. The
-- Code session that WROTE this file did not run it and connected to no database:
--   1. BACK UP FIRST.
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS.
--   4. Then, and only then, run the data file.
-- This file is also folded into db/schema.sql so a fresh project is correct.
-- Every statement after the gate is guarded and safe to re-run.
--
-- ============ THERE IS NO STEP 0 COUNT ============
-- This file adds two NULLABLE columns and nothing else. It creates no table,
-- drops nothing, and moves no row of data, so there is no before-count for a
-- check at the foot to compare against. The DATA file has one.
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It adds NO foreign key on `facility_location_id`. That column names a
--     jsonb sub-record's id inside `parties.fields->'locations'`, not a row in
--     any table, so there is nothing to reference. Writing one would require
--     promoting locations to a table, which no ruling authorizes.
--   * It creates NO new table, so no RLS policy, GRANT or probe entry is owed.
--     `case_providers` already carries all three from the amendment migration.
--   * It touches `case_clients`, `case_parties`, `case_roster_flags` and
--     `party_pii` not at all, and reads no PII column.
--   * It changes no legal rule's status, drafts no registry entry, and computes,
--     displays or proposes NO TRCP 195.2 date (R11 gated).
--   * It amends NO migration that has already run (HD-18, and the slice's §8).

-- ============ THE GATE — FIRST STATEMENT ============
-- `case_providers` is created by `2026-09-03-fe-d1-amendment.sql`. This file
-- never no-ops past that condition: a column silently not added is how a
-- half-migrated schema is discovered late, and the amendment file's own gate
-- exists for the same reason.
do $$
begin
  if to_regclass('public.case_providers') is null then
    raise exception
      'FE-D1 amendment migration `2026-09-03-fe-d1-amendment.sql` has not run. Run it first, unchanged, then re-run this file.';
  end if;
end $$;

-- ============ THE TWO COLUMNS ============

-- D1 (RULED 2026-09-07, Michael: "d") — the composite answer: the case-scoped
-- R17 row carries WHICH location treated the client, and each location's
-- address is stored split. This column is the first half of that.
alter table public.case_providers
  add column if not exists facility_location_id text;

comment on column public.case_providers.facility_location_id is
  'D1 (#149): the id of the parties.fields->''locations'' item that treated this '
  'client on this matter. NOT a foreign key -- it names a jsonb sub-record, not a '
  'row. NULL is never a must-fix stop (SD-10): a single-location facility '
  'resolves without it (SD-8), and two-or-more with none selected raises a panel '
  'line.';

-- SD-7 — the D-32 pre-fill shape applied to the location, so the surface can
-- say "location carried from <case> — change if wrong" exactly as it already
-- does for the provider TYPE.
alter table public.case_providers
  add column if not exists location_carried_from_case_id uuid
  references public.cases (id) on delete set null;

comment on column public.case_providers.location_carried_from_case_id is
  'SD-7 (#149): the case the location pre-fill read from, mirroring '
  'type_carried_from_case_id. Set only by the pre-fill; cleared when Michael '
  'picks a location by hand.';

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
--
-- 1. BOTH COLUMNS EXIST, WITH THE RIGHT TYPES.
--
--      select column_name, data_type, is_nullable
--        from information_schema.columns
--       where table_schema = 'public'
--         and table_name   = 'case_providers'
--         and column_name in ('facility_location_id','location_carried_from_case_id')
--       order by column_name;
--
--    EXPECT: exactly TWO rows —
--      facility_location_id ............. text  YES
--      location_carried_from_case_id .... uuid  YES
--    Read the count out. ONE row means one `alter` did not take.
--
-- 2. `facility_location_id` CARRIES NO FOREIGN KEY, AND THE OTHER ONE DOES.
--    This is the check that proves the deliberate asymmetry above is what is
--    actually in the database, rather than what the file says it intended.
--
--      select c.conname, c.contype, a.attname
--        from pg_constraint c
--        join pg_class      t on t.oid = c.conrelid
--        join pg_namespace  n on n.oid = t.relnamespace
--        join unnest(c.conkey) k(attnum) on true
--        join pg_attribute  a on a.attrelid = t.oid and a.attnum = k.attnum
--       where n.nspname = 'public'
--         and t.relname = 'case_providers'
--         and c.contype = 'f'
--         and a.attname in ('facility_location_id','location_carried_from_case_id')
--       order by a.attname;
--
--    EXPECT: exactly ONE row, on `location_carried_from_case_id`. A row naming
--    `facility_location_id` means a foreign key was created that should not
--    exist — say so rather than dropping it, and stop.
--
-- 3. NOTHING ELSE ON THE TABLE MOVED. The amendment migration left
--    `case_providers` with RLS on and one `authenticated` policy; two added
--    columns do not change that, and this proves it rather than assuming it.
--
--      select relrowsecurity from pg_class
--       where oid = 'public.case_providers'::regclass;
--
--      select policyname, cmd from pg_policies
--       where schemaname = 'public' and tablename = 'case_providers';
--
--    EXPECT: `relrowsecurity` = true, and the SAME policy row(s) that were there
--    before this file ran. Read out how many policies came back.
--
-- Then run `2026-09-07-address-model-split.sql`, alone, after answering these.
