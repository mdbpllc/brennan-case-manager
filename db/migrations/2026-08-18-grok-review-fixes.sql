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
-- The same changes are folded into db/schema.sql so a fresh project is correct.
-- Comment-only rulings (F-27 stale counts, C-6 gapless wording) live in
-- schema.sql alone and have no live-database effect.
--
-- DELIBERATELY ABSENT - READ THIS BEFORE ASSUMING IT WAS FORGOTTEN.
-- Ruling 4 (F-4 + F-18: widen the case_parties unique key to
--   unique nulls not distinct (case_id, party_id, role, capacity_kind,
--   capacity_points_at_party_id)
-- plus the capacity-pointer CHECK) is NOT in this file. The ruling makes
-- Postgres major >= 15 a hard gate and directs a STOP if it is not met. The live
-- database was reported by Michael at 14.5 on 2026-08-18, so the gate FAILED and
-- the item was stopped rather than worked around: NULLS NOT DISTINCT does not
-- exist before PG15, and substituting a different implementation would be a new
-- ruling, not this one. When the database is on 15+, that item lands in its own
-- migration under the existing ruling - it needs no fresh authorization, only
-- the gate passing. The F-18 CHECK half is version-independent and was stopped
-- with it, deliberately, because splitting a ruled item is Michael's call.
--
-- ORDERING. Michael chose (2026-08-18) that the F-4 constraint change would ride
-- in THIS file rather than in the unrun CD-1 migration, which would have made
-- "run this before CD-1" a hard requirement. Because ruling 4 is stopped, that
-- requirement does not arise: this file touches no case_parties constraint and
-- has NO ordering dependency on db/migrations/2026-08-12-cd1-contact-directory.sql.
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
-- ---------------------------------------------------------------------------
