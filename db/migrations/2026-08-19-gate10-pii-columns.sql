-- Migration — 2026-08-19, GATE 10: PII promotion out of `parties.fields`
-- =============================================================================
-- WHAT THIS DOES. Two things and nothing else:
--   1. adds `parties.date_of_birth date` (nullable, no index);
--   2. creates `party_pii` — a one-row-per-contact child table holding full SSN,
--      driver's licence number and issuing state — with its `_touch` and
--      `set_created_by` triggers, RLS, its `authenticated` policy, and its OWN
--      GRANT, all from birth.
-- It moves NO data. See the PRE-FLIGHT REPORT below.
--
-- SOURCE OF AUTHORITY: docs/specs/gate10-pii-slice.md (BUILD AUTHORIZED by
-- Michael 2026-08-19, in its own session, on the CD-1 / FE-D1 pattern). The gate
-- itself is Go_Live_Gates.md gate 10, appended 2026-08-18; the ruling record is
-- docs/specs/grok-external-review-2026-08-18.md §3 item 10 (C-4). Three rulings
-- of 2026-08-19 shape it: SPLIT BY SENSITIVITY (DOB on `parties`, SSN and licence
-- in the child table), FULL SSN STORED (over a last-4-by-default alternative that
-- was put and declined), and G10-1 — PROVENANCE ONLY. Nothing here is Claude's
-- choice.
--
-- NOT RUN BY THE AUTHORING SESSION. Running migrations against live is Michael's
-- hand (CL-2 / CD-1 / grok-fixes precedent):
--   1. BACK UP FIRST. (Supabase Pro since 2026-08-19, so this is the first
--      schema act on this database with an automatic backup behind it — that is
--      a reason to check the backup exists, not a reason to skip the step.)
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS before moving on.
-- The same changes are folded into db/schema.sql so a fresh project is correct.
--
-- Guarded and idempotent: safe to re-run.
--
-- WHY THE TIMING MATTERS. Gate 10's trigger is BEFORE THE FIRST REAL CLIENT
-- RECORD ENTERS THE DATABASE, and it sits AHEAD of GL-1's floor rather than
-- behind it. The whole reason this is cheap right now is that no real client
-- record has ever entered this database, so `parties.fields` holds nothing
-- privileged YET -- the app can already write these values, see G10-3 below.
-- After go-live the identical change is a migration over privileged records.
--
-- G10-3, ANSWERED BY THE BUILD SESSION FROM `src/` AND IT CHANGES WHAT THIS FILE
-- HAS TO CHECK FOR. The design side could not answer whether the front end writes
-- these values into `fields`, because `src/` is outside the project-knowledge
-- sync. It does. `src/domain/partyRegistry.ts` declares, on the `client` party
-- type, the field keys `dob`, `ssn`, `dlNumber` and `dlState` (lines 94-97), and
-- `dob` again on the `person` type (line 255); `src/pages/PartyFormPage.tsx`
-- renders every declared field and saves the whole blob; `src/pages/OaaIntakePage.tsx`
-- writes an extracted `dob` on party creation.
--
-- TWO CONSEQUENCES FOR THIS FILE, both handled below rather than noted and passed
-- over:
--   (a) THE RULED KEY LIST WOULD HAVE MISSED THE DRIVER'S LICENCE. The slice's §5
--       list contains `dob` and `ssn`, so those are covered — but the application's
--       keys are `dlNumber` and `dlState`, and neither `dl`, `drivers_license`,
--       `driver_license` nor `license_number` matches either of them. The §5 list
--       is expressly a heuristic; this is that heuristic missing a real key, found
--       by the one read the design side could not do. The pre-flight below probes
--       the ruled list AND the as-built keys, labelled separately.
--   (b) THE PRE-FLIGHT MAY WELL STOP THIS FILE, AND THAT IS THE DESIGN WORKING.
--       If any `parties` row already carries one of these keys, nothing lands and
--       the exception names the keys it found. That is not a failure to work
--       around: where a value lives is Michael's decision, not this file's.
--
-- WHAT IS NOT DELIVERED, SO NOBODY READS THIS FILE AS MORE THAN IT IS. This
-- migration moves the STORAGE. It does not change the application, and no
-- front-end half is authorized. Until one is, the party form keeps writing SSN
-- and licence numbers into `parties.fields`, and the adapter's `listParties()`,
-- `getParty()` and `getParties()` all `select('*')` — so those values still ride
-- every party read. GATE 10'S EXCLUSION LIMB IS DELIVERED IN THE SCHEMA AND IS
-- NOT YET IN EFFECT IN THE APP.
--
-- =============================================================================
-- ORDERING — READ THIS BEFORE RUNNING ANYTHING.
--
-- THERE IS NO PENDING MIGRATION THAT MUST RUN FIRST. All three that were pending
-- ran 2026-08-19 by Michael's hand and verified clean (session log #113):
--   2026-08-12-cd1-contact-directory.sql, 2026-08-18-grok-review-fixes.sql,
--   2026-08-16-privilege-tier-no-default.sql.
-- So the required order is: THIS FILE, on its own, at any time.
--
-- AND THE DDL BELOW IS MADE TO MATCH THAT SENTENCE RATHER THAN ASKED TO BE
-- TRUSTED WITH IT. This file's triggers call two functions it does not create:
--     touch_updated_at()   — in db/schema.sql since v0.1
--     set_created_by()     — created by 2026-08-18-grok-review-fixes.sql (F-25),
--                            which has RUN
-- On a database where those are absent, `create trigger ... execute function`
-- raises 42883, and because this file is wrapped in a single transaction the
-- table and the column would ROLL BACK WITH IT. So the existence of both is
-- CHECKED below rather than assumed, and the check names what to run if it fires.
--
-- This block exists because the last file to state an order it could not execute
-- came within one paste of costing two working live fixes:
-- 2026-08-18-grok-review-fixes.sql named `capacity_kind` and
-- `capacity_points_at_party_id`, columns the CD-1 migration alone creates, while
-- instructing that it run FIRST. On that order it raises 42703, and being wrapped
-- in one transaction it would have rolled back F-1's revoke and F-3's Central-time
-- fix with it.
--
-- TWO CORRECTIONS TO THE RECORD THIS FILE INHERITED, both checked at HEAD rather
-- than carried, because a near-miss and a loss teach different lessons:
--   * THE ROLLBACK DID NOT HAPPEN. This file's own kickoff prompt says the defect
--     "cost a transaction rollback of two live fixes." Session-log #113 says the
--     opposite in its own words — the ordering was "CONFIRMED AGAINST THE LIVE
--     DATABASE BEFORE ANYTHING WAS PASTED," a catalog read returning seven columns
--     and neither capacity column; both files then ran in the corrected order and
--     verified clean, and #113 records "The hazard is spent." It was CAUGHT, not
--     suffered.
--   * IT WAS NOT "THREE DAYS AGO." Both the slice (§8 item 4, and §5's "it has
--     already been three days once") and the kickoff prompt say three days. The
--     grok file LANDED 2026-08-19 (commit d6f97e6) and its ordering header was
--     corrected 2026-08-19 (commit 3773e6d); #113 is dated 2026-08-19. Its
--     filename carries 2026-08-18; its life is one day, and the write-find-fix
--     cycle was SAME-DAY. The 2026-08-18 filename is what the three-day figure
--     appears to have been counted from.
-- Neither correction weakens the reason for the guard below — it strengthens it.
-- A defect that was written and found inside one day is exactly why a file may not
-- assume that what was true when it was authored is true when it is run.
--
-- The lesson taken from #113 was not "write a better sentence" — it was "make the
-- DDL enforce the sentence."
-- =============================================================================

begin;

-- ---------------------------------------------------------------------------
-- GUARD 0 — the two functions this file's triggers depend on.
-- Looked up in the catalog rather than assumed; `to_regprocedure` returns NULL
-- for an absent function instead of raising, which is what makes it usable here.
-- RAISE EXCEPTION, not RAISE NOTICE: the Supabase SQL editor does not reliably
-- surface NOTICE, and a check that cannot produce a disconfirmation is not a
-- check (the #113 lesson, second half).
-- ---------------------------------------------------------------------------
do $$
begin
  if to_regprocedure('public.touch_updated_at()') is null then
    raise exception
      'touch_updated_at() does not exist. Run db/schema.sql (or the migration that creates it) before this file.';
  end if;
  if to_regprocedure('public.set_created_by()') is null then
    raise exception
      'set_created_by() does not exist. Run db/migrations/2026-08-18-grok-review-fixes.sql (F-25) before this file.';
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- GUARD 1 / §5 PRE-FLIGHT REPORT — REPORT, NEVER MOVE.
--
-- THERE IS NO DATA TO MIGRATE — AND THAT IS SOMEBODY'S REPORT, NOT THIS FILE'S
-- OBSERVATION. The live database was reported at two `parties` rows, both
-- fictional, at #113; that is Michael's own query output and NO REPO CHECK
-- REACHES IT, this session having connected to no database. What the repo does
-- establish is narrower and worth stating: the demo seed that plants a `dob` is
-- `localAdapter`-only and never reaches Supabase, and the RLS probe inserts no
-- `fields` at all. So this file does not assume the answer — it MEASURES it, on
-- the database, at run time, below.
--
-- IF ANY ROW MATCHES, THIS MIGRATION STOPS AND REPORTS. It does not move the
-- value. Moving a value from one home to another is a decision about where a
-- fact lives, and this project's standing pattern is to FLAG rather than guess
-- (the CD-1 roster-flag precedent, where the 'Client' role was flagged rather
-- than forced to a nearest-looking caption alignment). Michael decides; then a
-- later, separate act carries the value across.
--
-- THE KEY LIST IS A HEURISTIC AND CANNOT BE EXHAUSTIVE. A value stored under an
-- unguessed key would not be found. That is a limit of the check, stated rather
-- than papered over — and it is not hypothetical: the slice's ruled list covers
-- `dob` and `ssn`, which ARE the application's keys, but its four licence guesses
-- (`dl`, `drivers_license`, `driver_license`, `license_number`) match NEITHER of
-- the two the application actually writes, which are `dlNumber` and `dlState`.
--
-- SO THIS PROBES TWO LISTS AND KEEPS THEM LABELLED:
--   RULED   — the slice §5 list, carried verbatim, eight keys.
--   AS-BUILT — the keys `src/domain/partyRegistry.ts` actually declares, read at
--             HEAD by this build session under G10-3. This is an ADDITION by the
--             build session on evidence, not part of the ruled list, and it is
--             marked as such so nobody later reads it as something the slice said.
-- Even together they are still a heuristic. A clean result means none of these
-- ten keys is present — not that no identity number exists anywhere in `fields`.
--
-- The exception NAMES THE KEYS IT FOUND rather than only counting rows, because a
-- count alone would leave the reader unable to tell a fictional demo `dob` from a
-- real SSN without going and looking.
-- ---------------------------------------------------------------------------
do $$
declare
  -- RULED — the slice §5 list, verbatim, eight keys.
  v_ruled   text[] := array['dob','date_of_birth','ssn','social_security',
                            'dl','drivers_license','driver_license','license_number'];
  -- AS-BUILT — src/domain/partyRegistry.ts at HEAD (G10-3). `dob` and `ssn`
  -- repeat harmlessly; `dlNumber` and `dlState` are the two the ruled list
  -- does not reach.
  v_asbuilt text[] := array['dob','ssn','dlNumber','dlState'];
  v_all     text[] := v_ruled || v_asbuilt;
  v_rows integer;
  v_keys text;
begin
  -- THE DECISION IS MADE WITH `?|`, THE RULED OPERATOR, AND DELIBERATELY NOT WITH
  -- jsonb_object_keys(). `?|` answers false on a jsonb that is not an object;
  -- jsonb_object_keys() RAISES 22023 on one. `fields` is `jsonb not null` with no
  -- CHECK that it is an object, so a scalar or array value there would turn a
  -- report into an error — the check failing in the one direction a check must
  -- never fail.
  select count(*) into v_rows from parties where fields ?| v_all;

  if v_rows > 0 then
    -- Only now name the keys, and only over rows `?|` already matched — a row
    -- that matched `?|` is necessarily an object, so this cannot raise.
    select string_agg(distinct t.k, ', ' order by t.k) into v_keys
      from parties p
      cross join lateral jsonb_object_keys(p.fields) as t(k)
     where p.fields ?| v_all and t.k = any (v_all);

    raise exception
      'STOP — % parties row(s) already carry an identity key in fields (keys found: %). NOTHING WAS CHANGED. Where those values live is Michael''s decision, not this migration''s: take the §5 report at the foot of this file to him, and do not re-run this until he has ruled.',
      v_rows, v_keys;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- §3.1 — DATE OF BIRTH, promoted to a typed column on `parties`.
--
-- Typed, and that is half the point independent of privacy: a `date` column
-- cannot hold "3/4/80", "March 4 1980" and "1980-03-04" as three different
-- strings for the same fact, which `fields jsonb` can and eventually would.
-- Nullable: most contacts have no DOB and none is invented.
-- NO INDEX. DOB is displayed, not searched. Add one when a query needs it.
--
-- DOB is HERE and not in `party_pii` deliberately: it appears on pleadings,
-- drives conflicts checks and the minor/incapacitated determination, and is read
-- constantly. Putting it in the child table would cost a join on the common case
-- in order to protect the rare one.
-- ---------------------------------------------------------------------------
alter table parties add column if not exists date_of_birth date;

-- ---------------------------------------------------------------------------
-- §3.2 — `party_pii`: SSN and driver's licence, in a table the app's default
-- `parties` reads do not join.
--
-- WHY A CHILD TABLE. Gate 10 asks for values "excludable from API selects."
-- Column-level REVOKE is the textbook mechanism and PostgREST honours it — but
-- `authenticated` is the ONLY role on this database and the application IS
-- `authenticated`, so revoking a column from it breaks the app. Column exclusion
-- becomes real when a second role exists: that is the multi-user phase, gate 2,
-- deliberately outside this slice. TABLE-level exclusion works TODAY, at one
-- role, because a `select *` on `parties` cannot return a value that is not in
-- `parties`.
--
-- THIS IS NOT A SECOND IDENTITY TABLE (slice §2). db/schema.sql states above
-- `parties` that there is deliberately no second identity table, because a second
-- one recreates the wrong-level defect class CL-2 was built to kill. This table
-- is argued past that firewall rather than slipped past it: it has no
-- display_name, no party_type, no kind, no role_tags and no aliases — nothing in
-- it identifies anyone — its PRIMARY KEY IS ITS FOREIGN KEY so it cannot exist
-- without a `parties` row and cannot create a person, and nothing references it.
-- ---------------------------------------------------------------------------
create table if not exists party_pii (
  -- The PK IS the FK: one row per contact, enforced structurally rather than by a
  -- `unique` constraint. No separate `id` — a PII record has no identity of its
  -- own, and a separate id would permit two PII rows per contact, which this
  -- shape makes unrepresentable.
  --
  -- `on delete cascade`, and it is a DELIBERATE REVERSAL of this project's
  -- current direction — flagged, not ridden past. O-7's cascade/retention map
  -- proposes moving children from CASCADE to RESTRICT — eleven FKs across six
  -- named children, with four component FKs argued for KEEPING cascade, so not
  -- literally every one. PII is
  -- the case that runs the other way: a person's SSN must not survive the
  -- deletion of that person's record. RESTRICT here would mean a contact cannot
  -- be deleted until their SSN row is deleted first — friction with no benefit,
  -- and a state in which an orphaned SSN outlives a deletion attempt. Recorded
  -- as G10-2: an O-7 interaction, to be ruled inside O-7 rather than settled
  -- here by default. It does not block this build.
  party_id uuid primary key references parties (id) on delete cascade,

  -- FULL SSN, ruled 2026-08-19 over a last-4-by-default alternative that was put
  -- and declined. `text`, NOT a formatted or constrained type, and NO CHECK on
  -- format: ITINs and legitimate edge cases exist, and a constraint that rejected
  -- a valid ITIN would be worse than no constraint. Format validation belongs in
  -- the UI, where it can warn rather than refuse.
  ssn text,

  -- A licence number is meaningless without its issuing state.
  drivers_license text,
  drivers_license_state text,

  -- PROVENANCE, NOT AN AUDIT LOG. Matching F-25's pattern on the five core
  -- tables: who wrote the row, and when it last changed. It does NOT give a
  -- history of prior values, a record of reads, or any freeze against silent
  -- modification.
  --
  -- G10-1 RULED 2026-08-19: PROVENANCE ONLY. The audit limb rides with O-1 (the
  -- F-8a audit-integrity package: classifier columns, freeze, REVOKE UPDATE and
  -- DELETE), and O-1 is OPEN. Reason given: at one user and one role the audit
  -- limb protects against a second actor who does not yet exist, and settling
  -- part of O-1's design by implementation here would decide it in pieces rather
  -- than as a whole.
  --
  -- SO GATE 10 CLOSES ON ITS EXCLUSION LIMB AND LEAVES ITS AUDIT LIMB EXPLICITLY
  -- OWED. That is a real, named gap and not an oversight. Nobody may read gate 10
  -- as having delivered auditability: F-8's finding — that a classified value can
  -- change with no author, no time and no log — is true of the SSN column below
  -- the day it exists.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- No index, deliberately. Nothing searches by SSN or licence number.

-- ---------------------------------------------------------------------------
-- §3.3 — TRIGGERS, RLS, POLICY AND GRANT, FROM BIRTH.
-- The CD-1 slice-item-6 pattern applied proactively rather than caught at defect
-- time (the #28 lesson: a table shipped without its grant is simply unreachable,
-- and the failure surfaces as a 401 wall rather than as anything that names the
-- cause).
-- ---------------------------------------------------------------------------
drop trigger if exists party_pii_touch on party_pii;
create trigger party_pii_touch before update on party_pii
  for each row execute function touch_updated_at();

drop trigger if exists party_pii_set_created_by on party_pii;
create trigger party_pii_set_created_by before insert on party_pii
  for each row execute function set_created_by();

alter table party_pii enable row level security;

drop policy if exists "authenticated full access party_pii" on party_pii;
create policy "authenticated full access party_pii" on party_pii
  for all to authenticated using (true) with check (true);

-- BE HONEST ABOUT WHAT THAT POLICY DOES: nothing that the other policies on this
-- database do not. It is permissive — `using (true) with check (true)` — exactly
-- like every other one. THE PROTECTION THIS SLICE DELIVERS IS THAT THE APP'S
-- `parties` READS DO NOT JOIN THIS TABLE, so a `select *` on `parties` cannot
-- return a value stored HERE.
--
-- AND THAT IS NOT THE SAME SENTENCE AS "no SSN rides a party read." Today it
-- still does: the party form writes `ssn`, `dlNumber` and `dlState` into
-- `parties.fields`, and the adapter's party reads are `select('*')` (G10-3, in
-- the header). Two things would therefore be false to say — that the RLS policy
-- protects the SSN, and that this table existing has taken the SSN out of
-- `parties`. A later reader acting on either belief would be worse off than one
-- who knows the truth.

-- ALTER DEFAULT PRIVILEGES is NOT set on this database (C-2, ruled 2026-08-18:
-- keep the current posture). A new table without its own GRANT is UNREACHABLE, so
-- this file ships its grant alongside the table it grants — the CL-2 and CD-1
-- precedent. `authenticated` ONLY. `anon` gets NOTHING, by design, and nothing
-- below widens it.
grant select, insert, update, delete on party_pii to authenticated;

commit;

-- ---------------------------------------------------------------------------
-- VERIFICATION — ANSWER THESE IN WORDS (Michael, by hand)
--
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. The DOB column exists and is a real date, not text:
--      select data_type, is_nullable
--        from information_schema.columns
--       where table_name = 'parties' and column_name = 'date_of_birth';
--    EXPECT: exactly one row, data_type = 'date', is_nullable = 'YES'.
--    A zero-row answer means the column did not land. A data_type of 'text'
--    would mean the typing half of this slice did not happen.
--
-- 2. The table exists, `party_id` IS the primary key, and there is NO separate
--    `id` column — the shape that makes two PII rows per contact impossible:
--      select a.attname as column_name, format_type(a.atttypid, a.atttypmod) as type
--        from pg_attribute a
--       where a.attrelid = 'party_pii'::regclass
--         and a.attnum > 0 and not a.attisdropped
--       order by a.attnum;
--      select conname, pg_get_constraintdef(oid)
--        from pg_constraint
--       where conrelid = 'party_pii'::regclass and contype = 'p';
--    EXPECT: SEVEN columns, in this order — party_id, ssn, drivers_license,
--    drivers_license_state, created_by, created_at, updated_at — and NONE of them
--    named `id`. And exactly one primary-key constraint, reading
--    PRIMARY KEY (party_id).
--    If an `id` column is listed, this is not the ruled shape — stop.
--
-- 3. The app can reach it AT THE PRIVILEGE LAYER — which is what #28 caught late,
--    and what a missing GRANT looks like before it becomes a 401 wall. Note the
--    limit: this tests the GRANT, not RLS. PostgREST hits the privilege layer
--    first, so a false here means the table is unreachable whatever RLS says; a
--    true does not by itself prove a policy lets a row through:
--      select has_table_privilege('authenticated','party_pii','select') as sel,
--             has_table_privilege('authenticated','party_pii','insert') as ins,
--             has_table_privilege('authenticated','party_pii','update') as upd,
--             has_table_privilege('authenticated','party_pii','delete') as del;
--    EXPECT: all four true.
--
-- 4. `anon` has NOTHING on it — the posture, checked rather than assumed:
--      select has_table_privilege('anon','party_pii','select') as sel,
--             has_table_privilege('anon','party_pii','insert') as ins,
--             has_table_privilege('anon','party_pii','update') as upd,
--             has_table_privilege('anon','party_pii','delete') as del;
--    EXPECT: all four FALSE. Any true is a live exposure — stop and report it.
--    These are the four DML privileges; TRUNCATE, REFERENCES and TRIGGER are not
--    read here, so "NOTHING" is shorthand for "nothing the API can act through."
--
-- 5. The §5 report — nothing is sitting in `fields` under a key that looks like
--    one of these values.
--    READ THIS ONE KNOWING WHAT IT CAN AND CANNOT TELL YOU: if the migration ran,
--    GUARD 1 already found zero, so a zero here is guaranteed rather than
--    discovered. Its value is as the RECORD the slice asks for, not as a test that
--    could have failed. It becomes a real test only when run LATER, against a
--    database that has since been written to.
--
-- Does anything already sit in fields under a key that looks like these values?
-- select id, display_name, jsonb_object_keys(fields) as key
--   from parties
--  where fields ?| array['dob','date_of_birth','ssn','social_security',
--                        'dl','drivers_license','driver_license','license_number'];
--
--    EXPECT: ZERO ROWS.
--    Note what a returned row would show: `jsonb_object_keys` expands EVERY key
--    of a matching row, not only the matching one, so a hit prints the whole
--    blob's key list for that contact. That is useful — it shows the context the
--    value sits in — but do not read the extra keys as themselves suspect.
--
-- 5b. THE SAME QUESTION ASKED WITH THE KEYS THE APPLICATION ACTUALLY WRITES.
--    Added by the build session under G10-3, NOT part of the slice's ruled §5
--    list. The ruled list's four licence guesses match neither key the party form
--    uses, so on the ruled list alone a stored driver's licence number would come
--    back clean:
--      select id, display_name, jsonb_object_keys(fields) as key
--        from parties
--       where fields ?| array['dob','ssn','dlNumber','dlState'];
--    EXPECT: ZERO ROWS.
--    And the limit again, because it matters most when the answer is clean: both
--    lists are HEURISTICS. Zero rows across both means none of those ten keys is
--    present. It does not mean no identity number exists anywhere in `fields`.
--
-- 6. (Beyond the five above.) Both triggers exist on the table, by name.
--    The reason is not that `create trigger` can fail silently — it cannot; it
--    raises or it works. It is that `create table if not exists` DOES no-op
--    silently, so on a database where some earlier `party_pii` already existed
--    this file would report success having built round it. Checks 2 and 6 together
--    are what distinguish "created" from "was already there in some other shape":
--      select tgname from pg_trigger
--       where tgrelid = 'party_pii'::regclass and not tgisinternal
--       order by tgname;
--    EXPECT: exactly two — party_pii_set_created_by and party_pii_touch.
-- ---------------------------------------------------------------------------
