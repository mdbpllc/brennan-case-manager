-- Migration — 2026-09-03, FE-D1 AMENDMENT SLICE: THE CHECK-8 FIX
--
-- Authorization: the same one the amendment file runs under —
-- docs/specs/fe-d1-amendment-slice.md, RULED by Michael 2026-09-02 23:44 CDT
-- ("YES — as written"), session log #146 — continued by the CONTINUATION box at
-- the head of docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md, which
-- makes this file the build session's FIRST commit. No new authorization is
-- needed and none is claimed.
--
-- WHY THIS FILE EXISTS. `2026-09-03-fe-d1-amendment.sql` ran on 2026-09-03 and
-- answered NINE of its ten checks. Check 8 FAILED: `contact_edges` still
-- rejects `renders-care-at`. The cause is a NAME, not a vocabulary.
--
--   * The CD-1 migration of 2026-08-12 (lines 188-190) created the edge_type
--     vocabulary CHECK with an EXPLICIT name: `contact_edges_type_check`.
--   * The amendment file dropped `contact_edges_edge_type_check` — the name
--     Postgres would auto-generate for the INLINE check in db/schema.sql — with
--     `if exists`, so the drop was a SILENT NO-OP on the live project.
--   * It then ADDED its own widened CHECK under that auto-name.
--
-- So the live table now carries BOTH: the new one (which permits
-- `renders-care-at`) and the old one (which does not). A row must satisfy every
-- CHECK, so the old one still refuses. On a FRESH project built from
-- db/schema.sql the auto-name is right and only one CHECK ever exists — which
-- is why this went unseen until Michael ran it.
--
-- THE LESSON, recorded in docs/spec-feedback.md rather than acted on here:
-- db/schema.sql is NOT the live database's authority on constraint NAMES. The
-- migration history is. The amendment file applied that rule correctly to the
-- unnamed unique key (D-7, by catalog lookup) and to the provider-named
-- constraints, and made the CHECK its one exception. This file does not repeat
-- the mistake: it drops BY CATALOG LOOKUP and never by a guessed name.
--
-- RUN BY MICHAEL'S HAND, like every migration in this project:
--   1. BACK UP FIRST.
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS.
--
-- There is no STEP 0 count: this file adds, drops and alters NO table, NO
-- column and NO row of data. It removes one stale constraint and nothing else.
-- Every statement is guarded and safe to re-run; a second run finds nothing to
-- do and says so.
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It runs no part of MIG-1 or of the amendment file, and amends neither
--     (HD-18). A file that has already RUN is not edited — the amendment's
--     VERIFICATION block takes a POINTER COMMENT to this file for checks 6 and
--     8, and not one executable statement in it changes.
--   * It adds NO `verified` column to `contact_edges` (CD-14 limb (i) is OPEN).
--   * It re-adds no CHECK. The widened vocabulary the amendment installed as
--     `contact_edges_edge_type_check` is correct and complete, including
--     `renders-care-at`; the only problem is the second CHECK standing beside
--     it. Dropping the stale one is the whole fix.
--   * It writes no seed rows, no `privilege_tier`, and no TRCP 195.2 date.
--   * It touches no other table.

-- ============ THE GATE — FIRST STATEMENT ============
-- This file is meaningless unless the amendment has run: it exists to remove a
-- constraint the amendment's own drop MISSED. Proving the amendment ran is
-- exactly proving that `contact_edges_edge_type_check` exists, because that
-- file is what created it under that name. It never no-ops past this condition.
do $$
begin
  if to_regclass('public.contact_edges') is null then
    raise exception
      '`contact_edges` does not exist. This project has not run the CD-1 migration `2026-08-12-cd1-contact-directory.sql`. Nothing in this file applies.';
  end if;

  if not exists (
    select 1
      from pg_constraint
     where conrelid = 'public.contact_edges'::regclass
       and conname  = 'contact_edges_edge_type_check'
  ) then
    raise exception
      'FE-D1 amendment migration `2026-09-03-fe-d1-amendment.sql` has not run — its `contact_edges_edge_type_check` is absent. Run that file first (after `2026-08-20-fe-d1-form-engine.sql`, unchanged, per HD-18), then re-run this one.';
  end if;
end $$;

-- ============ THE FIX — DROP EVERY STALE edge_type CHECK, BY CATALOG ============
-- BY CATALOG LOOKUP, never by a guessed name (D-7, the rule this whole file
-- exists because the amendment did not apply here). The predicate is a
-- PROPERTY, not a name: any CHECK on public.contact_edges whose DEFINITION
-- constrains `edge_type` and which is not the one the amendment installed. That
-- catches `contact_edges_type_check` on the live project and would catch any
-- other name a future project happened to give it.
--
-- `contact_edges_not_self` is untouched: its definition is
-- (from_contact_id <> to_contact_id) and names no `edge_type`. It is the reason
-- the filter reads the DEFINITION rather than dropping every CHECK on the table.
do $$
declare
  r       record;
  dropped integer := 0;
begin
  for r in
    select c.conname, pg_get_constraintdef(c.oid) as def
      from pg_constraint c
     where c.conrelid = 'public.contact_edges'::regclass
       and c.contype  = 'c'
       and pg_get_constraintdef(c.oid) like '%edge_type%'
       and c.conname <> 'contact_edges_edge_type_check'
     order by c.conname
  loop
    raise notice 'Dropping stale edge_type CHECK %: %', r.conname, r.def;
    execute format('alter table public.contact_edges drop constraint %I', r.conname);
    dropped := dropped + 1;
  end loop;

  if dropped = 0 then
    raise notice 'No stale edge_type CHECK on contact_edges — nothing to drop. (Either this file has already run, or this project was built fresh from db/schema.sql, where only one CHECK ever existed.)';
  else
    raise notice 'Dropped % stale edge_type CHECK(s). `renders-care-at` is now accepted.', dropped;
  end if;
end $$;

-- db/schema.sql needs NO edit for this fix and takes none: it carries the
-- edge_type CHECK INLINE and UNNAMED (so a fresh project auto-names it
-- `contact_edges_edge_type_check`, which is what the gate above tests for), it
-- already lists `renders-care-at` in that CHECK, and it has never carried the
-- name `contact_edges_type_check`. Verified by grep in the same commit as this
-- file rather than asserted.

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. EXACTLY ONE edge_type CHECK now stands, and it is the amendment's:
--      select c.conname, pg_get_constraintdef(c.oid) as definition
--        from pg_constraint c
--       where c.conrelid = 'public.contact_edges'::regclass
--         and c.contype  = 'c'
--         and pg_get_constraintdef(c.oid) like '%edge_type%'
--       order by c.conname;
--    EXPECT: exactly ONE row, named `contact_edges_edge_type_check`, whose
--    definition lists twenty values ending in 'renders-care-at'. TWO rows means
--    the drop did not take — STOP. ZERO rows means the vocabulary is no longer
--    enforced at all, which is worse than the bug — STOP.
--
--    (Sanity, same table: `contact_edges_not_self` must still be there.
--      select conname from pg_constraint
--       where conrelid = 'public.contact_edges'::regclass and contype = 'c'
--       order by conname;
--     EXPECT: two rows — contact_edges_edge_type_check and
--     contact_edges_not_self. This file drops only vocabulary CHECKs.)
--
-- 2. THE AMENDMENT'S CHECK 8, RE-RUN IN BOTH HALVES — the check that failed.
--    This is the point of the file, so run it whole and read BOTH results.
--    Run INSIDE a transaction you roll back — the first half writes a row:
--      begin;
--      insert into contact_edges (from_contact_id, to_contact_id, edge_type,
--                                 effective_from, effective_to)
--        select p1.id, p2.id, 'renders-care-at', date '2025-03-14', null
--          from parties p1, parties p2 where p1.id <> p2.id limit 1;
--      -- now the trailing-space form, which MUST be refused:
--      insert into contact_edges (from_contact_id, to_contact_id, edge_type)
--        select p1.id, p2.id, 'renders-care-at ' from parties p1, parties p2
--         where p1.id <> p2.id limit 1;
--      rollback;
--    EXPECT: the FIRST insert SUCCEEDS (INSERT 0 1) — on 2026-09-03 it did not,
--    and that failure is why this file exists. The SECOND must raise a
--    check-constraint violation: if it SUCCEEDS the CHECK is not exact and free
--    text can enter the vocabulary — STOP. If there are fewer than two rows in
--    `parties`, this check is vacuous — say so rather than recording it as
--    passed. Roll back either way.
--
--    NOTE: if the first insert fails with a violation of a constraint named
--    anything OTHER than contact_edges_edge_type_check, read the name out — a
--    THIRD CHECK exists that check 1 above should have caught.
--
-- 3. THE AMENDMENT'S CHECK 6, THIRD LIMB, REWRITTEN SO IT CAN PASS.
--    As shipped, that limb asked for every constraint, index and policy whose
--    NAME contains "provider" and expected ZERO. It cannot return zero, and the
--    fault is the check's, not the migration's:
--      (a) the amendment itself CREATES `case_providers`,
--          `case_provider_individuals`, `case_provider_visits` and a
--          `case_provider_id` column on `generated_document_paragraphs`, whose
--          auto-named constraints, indexes and policies all contain the word; and
--      (b) the constraint limb never filtered by SCHEMA, so Supabase's own
--          `auth` schema answered too (`custom_oauth_providers`,
--          `saml_providers`, `sso_providers`).
--    That is why it read 47 / 11 / 3 on the live project. The RENAME it was
--    written to prove is verified by the OTHER limbs of check 6, which passed:
--    `provider_billing_profiles` is gone, `facility_billing_profiles` is there,
--    and no `provider_party_id` column survives anywhere in `public`.
--
--    Filtered to `public` and excluding the four tables BORN with the word:
--      select c.conname, t.relname as on_table
--        from pg_constraint c
--        join pg_class     t on t.oid = c.conrelid
--        join pg_namespace n on n.oid = t.relnamespace
--       where n.nspname = 'public'
--         and c.conname like '%provider%'
--         and t.relname not in ('case_providers','case_provider_individuals',
--                               'case_provider_visits','generated_document_paragraphs')
--       order by t.relname, c.conname;
--
--      select indexname, tablename from pg_indexes
--       where schemaname = 'public'
--         and indexname like '%provider%'
--         and tablename not in ('case_providers','case_provider_individuals',
--                               'case_provider_visits','generated_document_paragraphs')
--       order by tablename, indexname;
--
--      select policyname, tablename from pg_policies
--       where schemaname = 'public'
--         and policyname like '%provider%'
--         and tablename not in ('case_providers','case_provider_individuals',
--                               'case_provider_visits','generated_document_paragraphs')
--       order by tablename, policyname;
--
--    EXPECT: ZERO rows from each of the three. A policy is invisible to
--    pg_constraint and pg_indexes, which is why it is asked separately. Any row
--    that DOES come back is a real leftover of the rename — read it out.
--
-- Nothing else in the amendment file's ten checks is re-run here. Checks 1-5, 7,
-- 9 and 10 passed on 2026-09-03 and this file changes nothing they measured: it
-- creates no table, grants no privilege, alters no policy and moves no row.
