-- Grok external review - ruled fixes (2026-08-18)
-- =============================================================================
-- SOURCE OF AUTHORITY: docs/specs/grok-external-review-2026-08-18.md section 3,
-- Michael's twelve rulings, 2026-08-18 Central. Nothing here is Claude's choice.
--
-- NOT RUN BY THE AUTHORING SESSION. Running migrations against live is Michael's
-- hand (CL-2 / CD-1 precedent). Guarded and idempotent: safe to re-run.
--
-- SCOPE. This file carries the rulings that change the LIVE database:
--   F-1  (item 1)  revoke execute on next_file_number() from PUBLIC
--   F-3  (item 3)  file-number year and cases.date_opened default -> Central
--   F-2  (item 2)  freeze cases.file_number once issued
--   F-25 (item 7)  created_by columns + auth.uid() trigger, five core tables
--   F-4 + F-18 (item 4)  widened case_parties roster key + capacity-pointer
--                        CHECK - ADDED 2026-08-19, see the note below
-- The same changes are folded into db/schema.sql so a fresh project is correct.
-- Comment-only rulings (F-27 stale counts, C-6 gapless wording) live in
-- schema.sql alone and have no live-database effect.
--
-- RULING 4 IS NOW INCLUDED - IT WAS NOT, AND THE HISTORY MATTERS.
-- When this file was first authored (2026-08-18) the live database was on 14.5.
-- Ruling 4 makes Postgres major >= 15 a hard gate and directs a STOP if unmet, so
-- BOTH halves were stopped - including the F-18 CHECK, which is version-independent
-- - because splitting a ruled item is Michael's call and not the executing
-- session's. Nothing was substituted: a COALESCE-based unique index expressing the
-- same intent would have been a DIFFERENT DDL than the one ruled.
-- Michael upgraded the database on 2026-08-19 and the item landed under the
-- EXISTING ruling - no fresh authorization, only the gate passing.
-- The version is not derivable from the repo, so it is not taken on trust here
-- either: the guard below refuses to run this file on anything under 15.

-- ORDERING - CORRECTED 2026-08-19. READ THIS BEFORE RUNNING ANYTHING.
-- Michael chose (2026-08-18) that the F-4 constraint change would ride in THIS
-- file rather than in the CD-1 migration. That choice stands. The ORDER this
-- block previously stated does not.
--
-- THE REQUIRED ORDER IS:
--     1. db/migrations/2026-08-12-cd1-contact-directory.sql
--     2. THIS FILE (2026-08-18-grok-review-fixes.sql)
--
-- WHAT THIS BLOCK SAID BEFORE, AND WHY IT WAS WRONG. It stated the opposite
-- order - this file first - reasoning that "CD-1's capacity model cannot operate
-- under the old key." That reasoning describes a DATA limitation between the two
-- runs. The ordering constraint is a DDL one and it runs the other way: ruling
-- 4's two statements below name `capacity_kind` and
-- `capacity_points_at_party_id`, and those columns are created by the CD-1
-- migration. On a database where CD-1 has not run they do not exist, so
--     alter table case_parties add constraint case_parties_roster_identity_key
--       unique nulls not distinct (case_id, party_id, role, capacity_kind, ...)
-- raises 42703 - and because this file is wrapped in a single transaction,
-- F-1's revoke and F-3's Central-time fix ROLL BACK WITH IT. The stated order
-- could not execute, and would have silently cost the two fixes this file exists
-- to deliver while reporting nothing but an error on one line.
--
-- HOW IT WAS FOUND AND SETTLED. Found 2026-08-19 in a design session and
-- confirmed against the LIVE database before either file was run: a query on
-- information_schema.columns for case_parties returned seven columns
-- (id, case_id, party_id, role, side, note, created_at) and neither capacity
-- column. Michael ruled the same day: correct the header, leave the DDL alone -
-- THE DDL WAS ALWAYS RIGHT; ONLY THE INSTRUCTION WAS WRONG. Both files were then
-- run in the corrected order and verified clean (session log #113).
--
-- NOTE FOR ANY FUTURE READER. Nothing below this block was changed by that
-- ruling. The file remains guarded and idempotent and is safe to re-run; on a
-- database where CD-1 has already run, the order question is moot.
-- =============================================================================

begin;

-- ---------------------------------------------------------------------------
-- F-3 (ruling 3) - the file-number year comes from CENTRAL time, never UTC.
-- On Supabase now() is UTC: a case opened 2026-12-31 18:05 Central is already
-- 2027-01-01 UTC and would have been issued a '27-' number. This is the same
-- class as the recorded v0.1 date_opened bug.
-- ---------------------------------------------------------------------------
create or replace function next_file_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_yy text := to_char((now() at time zone 'America/Chicago'), 'YY');
  v_n integer;
begin
  insert into file_counters (yy, counter) values (v_yy, 1)
  on conflict (yy) do update set counter = file_counters.counter + 1
  returning counter into v_n;
  return v_yy || '-' || lpad(v_n::text, 4, '0');
end;
$$;

-- ---------------------------------------------------------------------------
-- F-1 (ruling 1) - narrow fix: close the anon burn path, no behaviour change.
-- Postgres grants EXECUTE on new functions to PUBLIC and CREATE OR REPLACE
-- keeps that ACL, so this SECURITY DEFINER writer of file_counters was callable
-- by anon over PostgREST RPC - burning file numbers without inserting a case.
-- MUST come after the CREATE OR REPLACE above, not before it.
-- The full trigger redesign (BEFORE INSERT issuance, revoke from authenticated
-- too) is DEFERRED as its own slice - open item O-6.
-- ---------------------------------------------------------------------------
revoke execute on function next_file_number() from public;
grant execute on function next_file_number() to authenticated;

-- ---------------------------------------------------------------------------
-- F-3 (ruling 3), second half - cases.date_opened default likewise Central.
-- current_date is UTC on Supabase. Existing rows are NOT rewritten: a stored
-- date is what it was, and back-dating history is not what was ruled.
-- ---------------------------------------------------------------------------
alter table cases
  alter column date_opened set default (now() at time zone 'America/Chicago')::date;

-- ---------------------------------------------------------------------------
-- F-2 (ruling 2) - an issued file number is immutable.
-- UNIQUE only promises "this string is unused right now"; it does not stop a
-- PATCH from relabelling 26-0004 to 26-0007, after which letters sent under the
-- old number no longer resolve. Refused outright rather than logged after.
-- ---------------------------------------------------------------------------
create or replace function freeze_file_number()
returns trigger language plpgsql as $$
begin
  if new.file_number is distinct from old.file_number then
    raise exception
      'file_number is immutable once issued (case %, % -> %)',
      old.id, old.file_number, new.file_number
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists cases_freeze_file_number on cases;
create trigger cases_freeze_file_number before update on cases
  for each row execute function freeze_file_number();

-- ---------------------------------------------------------------------------
-- F-25 (ruling 7) - actor provenance on the five core operational tables.
-- Columns and a trigger ONLY. NO per-user RLS: that stays behind the
-- professional security review gate, and this ruling did not touch it.
-- Nullable by design - rows that predate the column have no actor, and an
-- invented one would be worse than an absent one.
-- ---------------------------------------------------------------------------
alter table cases               add column if not exists created_by uuid references auth.users (id);
alter table parties             add column if not exists created_by uuid references auth.users (id);
alter table transcripts         add column if not exists created_by uuid references auth.users (id);
alter table medical_bills       add column if not exists created_by uuid references auth.users (id);
alter table generated_documents add column if not exists created_by uuid references auth.users (id);

create or replace function set_created_by()
returns trigger language plpgsql as $$
begin
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists cases_set_created_by on cases;
create trigger cases_set_created_by before insert on cases
  for each row execute function set_created_by();

drop trigger if exists parties_set_created_by on parties;
create trigger parties_set_created_by before insert on parties
  for each row execute function set_created_by();

drop trigger if exists transcripts_set_created_by on transcripts;
create trigger transcripts_set_created_by before insert on transcripts
  for each row execute function set_created_by();

drop trigger if exists medical_bills_set_created_by on medical_bills;
create trigger medical_bills_set_created_by before insert on medical_bills
  for each row execute function set_created_by();

drop trigger if exists generated_documents_set_created_by on generated_documents;
create trigger generated_documents_set_created_by before insert on generated_documents
  for each row execute function set_created_by();

-- No new tables, so no new grants are required: the existing table-level grants
-- to authenticated already cover these columns. (C-2 posture kept, ruling 9 -
-- ALTER DEFAULT PRIVILEGES stays unset; any migration adding a TABLE must still
-- ship its own grant in the same file.)

-- ---------------------------------------------------------------------------
-- F-4 + F-18 (ruling 4) - the roster identity key, widened, and the capacity
-- pointer made mandatory for the capacities that point at someone.
--
-- HARD GATE, enforced rather than assumed: NULLS NOT DISTINCT is PG15+. On an
-- older server this raises instead of silently doing something else.
-- ---------------------------------------------------------------------------
do $$
begin
  if current_setting('server_version_num')::int < 150000 then
    raise exception
      'Ruling 4 requires PostgreSQL 15 or later (NULLS NOT DISTINCT). This server is %.',
      current_setting('server_version');
  end if;
end $$;

-- The OLD constraint was declared INLINE and UNNAMED in schema.sql, so its live
-- name is whatever Postgres generated. Guessing it is the F-23 failure mode
-- exactly - a "drop constraint if exists" on a guessed name is a silent no-op.
-- So it is looked up by DEFINITION rather than by name.
do $$
declare
  v_name text;
begin
  select conname into v_name
    from pg_constraint
   where conrelid = 'case_parties'::regclass
     and contype = 'u'
     and pg_get_constraintdef(oid) = 'UNIQUE (case_id, party_id, role)';

  if v_name is not null then
    execute format('alter table case_parties drop constraint %I', v_name);
    raise notice 'Dropped old roster unique constraint: %', v_name;
  else
    raise notice 'No UNIQUE (case_id, party_id, role) constraint found - already widened, or named differently. Check pg_constraint before assuming this was a no-op.';
  end if;
end $$;

alter table case_parties drop constraint if exists case_parties_roster_identity_key;
alter table case_parties add constraint case_parties_roster_identity_key
  unique nulls not distinct
    (case_id, party_id, role, capacity_kind, capacity_points_at_party_id);

-- F-18. 'individually' is exempt by design: it points at nobody. Existing rows
-- all carry capacity_kind NULL (CD-1 is unrun), so nothing can violate this yet.
alter table case_parties drop constraint if exists case_parties_capacity_pointer_check;
alter table case_parties add constraint case_parties_capacity_pointer_check
  check (
    capacity_kind is null
    or capacity_kind not in ('next-friend-of','representative-of-estate-of','dba')
    or capacity_points_at_party_id is not null
  );

commit;

-- ---------------------------------------------------------------------------
-- VERIFY AFTER RUNNING (Michael, by hand):
--   select prosecdef, proacl from pg_proc where proname = 'next_file_number';
--     -- proacl must NOT contain an entry with nothing before the '=' (that is
--     -- PUBLIC); it should show only the authenticated grant.
--   select pg_get_functiondef(oid) from pg_proc where proname = 'next_file_number';
--     -- must contain 'America/Chicago'
--   select column_default from information_schema.columns
--    where table_name = 'cases' and column_name = 'date_opened';
--   select tgname from pg_trigger where tgname in
--     ('cases_freeze_file_number','cases_set_created_by');
--   select table_name from information_schema.columns
--    where column_name = 'created_by' order by table_name;   -- expect the five
--   select conname, pg_get_constraintdef(oid) from pg_constraint
--    where conrelid = 'case_parties'::regclass and contype in ('u','c');
--     -- expect case_parties_roster_identity_key as UNIQUE NULLS NOT DISTINCT
--     -- over the five columns, and case_parties_capacity_pointer_check present.
--     -- There must be exactly ONE unique constraint on this table: if the old
--     -- three-column one is still listed, the lookup above did not match it and
--     -- it must be dropped by hand before CD-1 runs.
-- ---------------------------------------------------------------------------
