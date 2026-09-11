-- Migration — 2026-09-10, FIRM OBLIGATIONS: THE TWO TABLES, AND review_log.action WIDENED
--
-- Authorization: docs/specs/firm-obligations-build-slice.md, `FOS-1` RULED YES
-- by Michael 2026-09-10 ~23:03 CDT (verbatim "Yes"), put whole — so `FOD-20`
-- (the `cancelled` value below) is IN. Session log #155. Design authority: that
-- slice's §5 (this file, object by object) and
-- docs/specs/firm-obligations-module-spec.md §3 as amended by its §16. On any
-- conflict, the later ruling wins and the disagreement is named.
--
-- RUN BY MICHAEL'S HAND, per the CL-2 / CD-1 / gate-10 / FE-D1 / CCS-1 precedent.
-- The Code session that WROTE this file did not run it and connected to no database:
--   1. BACK UP FIRST.
--   2. Run STEP 0 below ON ITS OWN, and write the result down.
--   3. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   4. Answer the verification checks at the bottom IN WORDS.
-- This file is also folded into db/schema.sql so a fresh project is correct.
--
-- A SECOND RUN STOPS AT THE GATE, before any statement: the gate refuses when
-- `firm_obligations` already exists. Every statement after the gate is guarded
-- anyway — `if not exists` on the tables and the index, `drop ... if exists`
-- before each trigger and policy, the catalog drop before the CHECK's re-add —
-- the address-model precedent.
--
-- ============ STEP 0 — BEFORE YOU RUN ANYTHING ============
-- Run this ONE query ON ITS OWN and WRITE THE RESULT DOWN BY HAND. Check 7 at
-- the foot re-runs it: widening a CHECK moves no row, and a count recorded only
-- at the foot of a file pasted whole is a count taken after the fact. Keep the
-- app closed until check 7 — the app writes review_log rows, and one it writes
-- in between is not this file's.
--
--      select action, count(*) from review_log group by action order by action;
--
--   (an action with no rows does not appear — that is a zero, not a missing line)
--   confirmed ........ __________
--   created .......... __________
--   edited ........... __________
--   generated ........ __________
--   rejected ......... __________
--   suggested ........ __________
--   anything else .... __________  <- expect NONE. Today's CHECK admits only the
--                                     six above. A `cancelled` row here would mean
--                                     the live CHECK is not the one db/schema.sql
--                                     states — STOP and report it.
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It touches NO matter table. calendar_events, cases, case_parties,
--     case_clients and party_pii are not named by any statement below, and
--     neither new table carries a case_id: a firm obligation is never a
--     matter's (DECISION 3, FOD-13).
--   * It writes NO ROW anywhere — no seed, no template, no activation. The
--     thirty-five templates are code data (slice §3 item 3); nothing is active
--     in Supabase mode until Michael activates it with his own date, in the
--     product (FOD-9). The demo seed (FOD-21) lives in localStorage only.
--   * It drafts NO registry entry and touches no legal_rules row. The fifth
--     registry file is a later drafting act (DECISION 8). No template's weekend
--     rule is set here; the column's default is 'unknown' (slice §2.3).
--   * It computes NO holiday and carries no holiday list (FOM-12(b)).
--   * It adds NO money field, no externalRef, no ledgerRef and no QuickBooks
--     reference (DECISION 5, FO-7 closed), and no assignee or delegated column
--     (DECISIONS 1 and 4).
--   * It changes NO existing review_log row. Widening a CHECK moves nothing,
--     which STEP 0 and check 7 exist to show rather than assert.
--   * It amends NO migration that has already run (HD-18).
--   * NOTHING IN IT WAS RUN BY CODE. The first execution of any line below is
--     Michael's.

-- ============ THE GATE — FIRST STATEMENT ============
-- Two conditions, and the file never no-ops past either:
--   * `firm_obligations` must NOT exist. If it does, this file has run before
--     (or something else made the table), and running the rest again would
--     only re-assert what is there — so it stops and says so instead.
--   * `review_log` must exist AND carry a CHECK on `action`. This file WIDENS
--     that vocabulary; it does not invent one. If no such CHECK stands, the live
--     database is not what db/schema.sql and the #151 read say it is, and the
--     honest move is to stop and look, not to create one.
do $$
begin
  if to_regclass('public.firm_obligations') is not null then
    raise exception
      '`firm_obligations` already exists, so this file has already run (or something else created the table). Nothing was applied on this run. Answer the checks at the foot of the file and report what they show; do not edit the file to force it.';
  end if;

  if to_regclass('public.review_log') is null then
    raise exception
      '`review_log` does not exist. This project has not run db/schema.sql. Nothing in this file applies.';
  end if;

  if not exists (
    select 1
      from pg_constraint c
     where c.conrelid = 'public.review_log'::regclass
       and c.contype  = 'c'
       and pg_get_constraintdef(c.oid) like '%action%'
  ) then
    raise exception
      '`review_log` carries no CHECK on `action`. This file widens that CHECK and will not create one where none stood. Nothing was applied; report what pg_constraint shows for review_log.';
  end if;
end $$;

-- ============ firm_obligations — THE STANDING DUTY (slice §5.1) ============
-- Deliberately absent, each by ruling: any money field, externalRef or ledgerRef
-- (DECISION 5); any case_id (DECISION 3, FOD-13). The rule is stored, never the
-- dates it yields: TARGET and DUE are derived at render (slice §2.3).
create table if not exists firm_obligations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- Grouping and the catalog only; no behaviour hangs on it (spec §3.1).
  category text not null check (category in ('licensing','court-appointments','practice-rules','tax-entity-and-employment','insurance','infrastructure','custom')),
  -- DECISION 4 (FO-5 closed): from the first migration, so multi-user does not
  -- retrofit it. Changes nothing on screen at the solo stage (FOM-15).
  owner_scope text not null default 'firm' check (owner_scope in ('firm','attorney')),
  -- NULL = the firm's one attorney.
  owner_user_id uuid references auth.users (id),
  -- The FOT- label a row was activated from; NULL on a custom obligation.
  template_key text,
  -- The declarative rule (spec §3.2): { kind, month, day, dates, anchorDate,
  -- everyYears, days, dueOn } per kind — re-evaluated from the rule, never
  -- resolved once. Its per-kind shape is the domain module's to validate.
  recurrence jsonb not null,
  -- FOD-17 / FOD-31 / FOM-6. `precision` is a Postgres keyword of the
  -- column-name class — legal unquoted as a column, as review_log's
  -- `timestamp` already is.
  precision text not null default 'day' check (precision in ('day','month')),
  -- DECISION 2. No column default: the domain defaults it FROM THE RULE KIND
  -- (filings serial, cadences collapse), and a database default would pick one
  -- answer for all six kinds.
  missed_periods text not null check (missed_periods in ('serial','collapse')),
  -- FOM-2 / FOD-18: the ONLY rows on which Not applicable exists. That rule
  -- crosses tables, so the domain module and both adapters enforce it (§5.2's
  -- note), not a CHECK here.
  conditional_per_period boolean not null default false,
  -- FOM-12, Michael's composite (slice §2.3). 'unknown' on every template at
  -- seed; set or confirmed by him at activation. The default is the same value,
  -- so a row written without one never silently claims a roll.
  weekend_rule text not null default 'unknown' check (weekend_rule in ('rolls-forward','no-roll','unknown')),
  -- FOD-2: 30 days, per-obligation override.
  lead_days integer not null default 30 check (lead_days >= 0),
  -- DECISION 6: order and emphasis ONLY — weight never changes behaviour.
  weight text not null default 'routine' check (weight in ('hard','routine')),
  -- FOM-4's optional activation input on a serial obligation, kept for the record.
  last_period_completed date,
  -- The SPEC §7 cite-and-status string, copied and never reworded; it points
  -- at the registry entry once DECISION 8's file exists.
  source_note text,
  -- FOM-2: the activation fact, split from the per-period lapse flag.
  applies_if text,
  notes text,
  -- FOD-8: retire, never delete. History stays.
  active boolean not null default true,
  -- F-25: stamped by set_created_by() below; NULL when there is no JWT.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ firm_obligation_occurrences — THE DATED INSTANCE (slice §5.2) ============
create table if not exists firm_obligation_occurrences (
  id uuid primary key default gen_random_uuid(),
  -- FOD-23: restrict. The app never deletes an obligation, and a hand deletion
  -- with history behind it should fail loudly rather than take the history.
  obligation_id uuid not null references firm_obligations (id) on delete restrict,
  -- Derived from the rule at materialization; stored for display and the
  -- Outlook subject (FOM-7).
  period_label text not null,
  -- The RULE date R for the period, a naive local date (FOD-3).
  due_on date not null,
  -- THIS occurrence's real date when it differs from the rule's. Guarded in the
  -- domain: never later than the current due date on an overdue occurrence (FOD-4).
  due_on_override date,
  -- THAT IS ALL THAT IS STORED. Pending / lit / target-passed / overdue /
  -- past-date-unknown are derived at render from `today` (slice §2.3).
  state text not null default 'open' check (state in ('open','done')),
  done_on date,
  done_by uuid references auth.users (id),
  outcome text check (outcome in ('completed','not-applicable')),
  outcome_reason text check (outcome_reason in ('condition-not-met','performed-elsewhere')),
  done_note text,
  -- A pointer (a URL, a folder, a confirmation number), never a stored file —
  -- document storage is gate 7 (DA-* open).
  filed_at text,
  -- The same four sync fields calendar events carry, so the one push queue can
  -- drain both kinds (slice §3 item 7).
  outlook_event_id text,
  sync_status text not null default 'pending' check (sync_status in ('pending','synced','error')),
  sync_error text,
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- The three row-level CHECKs, as §5.2 states them: done means dated, done
  -- means an outcome, and Not applicable means a reason.
  --
  -- STATED, NOT FIXED: the third is three-valued. On a row whose `outcome` is
  -- NULL the left side is NULL, the comparison is NULL, and a CHECK passes on
  -- NULL — so an OPEN row carrying an `outcome_reason` is not refused here. The
  -- domain module and the adapters never write one; this is recorded for the
  -- slice's authors rather than tightened silently.
  check ((state = 'done') = (done_on is not null)),
  check ((state = 'done') = (outcome is not null)),
  check ((outcome = 'not-applicable') = (outcome_reason is not null))
);

-- FOD-5 AT THE DATABASE: exactly one OPEN occurrence per obligation. PARTIAL,
-- so the done history is unlimited — a plain unique index here would allow one
-- occurrence per obligation EVER, and refuse the first Done's next occurrence.
create unique index if not exists firm_obligation_occurrences_one_open_idx
  on firm_obligation_occurrences (obligation_id) where state = 'open';

-- ============ TRIGGERS ============
-- touch_updated_at() and set_created_by() already exist: db/schema.sql, and on
-- the live project 2026-08-18-grok-review-fixes.sql (F-25).

drop trigger if exists firm_obligations_touch on firm_obligations;
create trigger firm_obligations_touch before update on firm_obligations
  for each row execute function touch_updated_at();

drop trigger if exists firm_obligations_set_created_by on firm_obligations;
create trigger firm_obligations_set_created_by before insert on firm_obligations
  for each row execute function set_created_by();

drop trigger if exists firm_obligation_occurrences_touch on firm_obligation_occurrences;
create trigger firm_obligation_occurrences_touch before update on firm_obligation_occurrences
  for each row execute function touch_updated_at();

-- ============ RLS + GRANTS — SAME MIGRATION AS THE TABLES ============
-- Slice §3 item 2: the #28 / CL-2 / CD-1 lesson. A table that arrives without
-- its policy and its grant is either unreachable or unguarded, and which one
-- it is gets discovered late. Both carry both from birth, in this commit, with
-- their RLS-probe entries.
--
-- The one policy is the one rule on every table — `using (true) with check
-- (true)`, gating on AUTHENTICATION, not identity. Right at the solo stage;
-- the multi-user edge is gate 2's. Neither table holds client data.

alter table firm_obligations enable row level security;
alter table firm_obligation_occurrences enable row level security;

drop policy if exists "authenticated full access firm_obligations" on firm_obligations;
create policy "authenticated full access firm_obligations" on firm_obligations
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access firm_obligation_occurrences" on firm_obligation_occurrences;
create policy "authenticated full access firm_obligation_occurrences" on firm_obligation_occurrences
  for all to authenticated using (true) with check (true);

-- `authenticated` only. The signed-out role is granted nothing by this file.
grant select, insert, update, delete on firm_obligations to authenticated;
grant select, insert, update, delete on firm_obligation_occurrences to authenticated;

-- ============ review_log.action — THE CHECK WIDENED, BY CATALOG LOOKUP (slice §5.3) ============
-- Four new values, each for a reason:
--   * done, not-applicable, undone — FOD-6. Every firm-obligation close, and
--     its reversal, writes a review_log line (entity_type
--     'firm_obligation_occurrence'). Without these, the audit insert behind a
--     Done click is refused in Supabase mode (SQLSTATE 23514).
--   * cancelled — FOD-20, IN by FOS-1. It closes the #151 live-write mismatch:
--     src/pages/CalendarTab.tsx's cancel ALREADY writes action 'cancelled',
--     which the six-value CHECK refuses, so a Supabase-mode cancel updates the
--     event and fails at its audit line, before the Outlook deletion that
--     follows it (docs/spec-feedback.md, 2026-09-07 section, item 1 — read from
--     the code, not observed live).
--
-- BY CATALOG LOOKUP, never by a guessed name — the lesson of
-- 2026-09-03-fe-d1-amendment-fix.sql: a guessed name dropped `if exists` is a
-- silent no-op, and the old CHECK went on refusing beside the new one.
-- db/schema.sql's inline CHECK would be auto-named `review_log_action_check`
-- on a fresh project, but schema.sql is not the live database's authority on
-- constraint NAMES; the catalog is.
--
-- The predicate is a PROPERTY of the definition, not a name: `contype = 'c'`
-- keeps it to CHECKs, and `like '%action%'` matches the vocabulary CHECK. No
-- other review_log column contains the word (entity_type, entity_id, user,
-- timestamp, old_value, new_value, reason), so nothing else can match.
do $$
declare
  r       record;
  dropped integer := 0;
begin
  for r in
    select c.conname, pg_get_constraintdef(c.oid) as def
      from pg_constraint c
     where c.conrelid = 'public.review_log'::regclass
       and c.contype  = 'c'
       and pg_get_constraintdef(c.oid) like '%action%'
     order by c.conname
  loop
    raise notice 'Dropping review_log action CHECK %: %', r.conname, r.def;
    execute format('alter table public.review_log drop constraint %I', r.conname);
    dropped := dropped + 1;
  end loop;

  if dropped = 0 then
    raise notice 'No action CHECK found on review_log to drop. In a whole-file run the gate makes this impossible; the ten-value CHECK is added next regardless, and check 3 shows what stands.';
  else
    raise notice 'Dropped % action CHECK(s) on review_log. The ten-value CHECK is added next.', dropped;
  end if;
end $$;

-- Re-added under the name Postgres gives schema.sql's inline CHECK, so a
-- migrated project and a fresh one carry the SAME name, and the next widening's
-- catalog lookup finds it either way. The DO block above is this statement's
-- guard: whatever action CHECK stood — one of this very name included — is gone
-- before it runs. Adding a CHECK scans every existing row; each already
-- satisfies the six-value list, and these ten are a superset, so the scan
-- refuses nothing. The first six are today's values, in today's order.
alter table public.review_log
  add constraint review_log_action_check
  check (action in ('suggested','confirmed','edited','rejected','created','generated',
                    'done','not-applicable','undone','cancelled'));

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
-- (That the file reached this point without raising is itself the gate's
-- answer: `firm_obligations` did not exist and review_log's action CHECK did.)
--
-- 1. BOTH TABLES EXIST, RLS IS ON, AND EACH HAS EXACTLY ONE POLICY.
--
--      select c.relname, c.relrowsecurity,
--             (select count(*) from pg_policies p
--               where p.schemaname = 'public' and p.tablename = c.relname) as policies
--        from pg_class c
--        join pg_namespace n on n.oid = c.relnamespace
--       where n.nspname = 'public'
--         and c.relname in ('firm_obligations','firm_obligation_occurrences')
--       order by c.relname;
--
--      select tablename, policyname, cmd, roles
--        from pg_policies
--       where schemaname = 'public'
--         and tablename in ('firm_obligations','firm_obligation_occurrences')
--       order by tablename;
--
--    EXPECT: the first query returns exactly TWO rows, with relrowsecurity =
--    true and policies = 1 on both. ONE row means a table was not created —
--    STOP. The second returns the two policies, "authenticated full access
--    firm_obligations" and "authenticated full access
--    firm_obligation_occurrences", each with cmd ALL and roles {authenticated}.
--    Read both row counts out.
--
-- 2. THE ONE-OPEN INDEX EXISTS AND IS PARTIAL (FOD-5 at the database).
--
--      select indexname, indexdef
--        from pg_indexes
--       where schemaname = 'public'
--         and tablename  = 'firm_obligation_occurrences'
--       order by indexname;
--
--    EXPECT: exactly TWO rows — the primary key's
--    `firm_obligation_occurrences_pkey`, and
--    `firm_obligation_occurrences_one_open_idx`, whose indexdef begins
--    CREATE UNIQUE INDEX and ends, in Postgres's own spelling,
--    (obligation_id) WHERE (state = 'open'::text). Say whether the word WHERE
--    is there. If it is NOT, the index is not partial and would refuse the
--    first Done's next occurrence — STOP.
--
-- 3. EXACTLY ONE action CHECK STANDS ON review_log, AND IT LISTS ALL TEN VALUES.
--
--      select c.conname, pg_get_constraintdef(c.oid) as definition
--        from pg_constraint c
--       where c.conrelid = 'public.review_log'::regclass
--         and c.contype  = 'c'
--         and pg_get_constraintdef(c.oid) like '%action%'
--       order by c.conname;
--
--    EXPECT: exactly ONE row, named `review_log_action_check`. Postgres prints
--    the list as action = ANY (ARRAY['suggested'::text, ...]). Read the values
--    out and count them — TEN: suggested, confirmed, edited, rejected, created,
--    generated, done, not-applicable, undone, cancelled. TWO rows means a drop
--    did not take and the old six-value CHECK still refuses the new values (the
--    2026-09-03 failure class) — STOP. ZERO rows means the vocabulary is no
--    longer enforced at all — STOP. NINE values means `cancelled` was taken out
--    of this copy of the file, though FOS-1 put FOD-20 IN — say so.
--
-- 4. THE APP'S ROLE REACHES BOTH TABLES FOUR WAYS, AND THE SIGNED-OUT ROLE NONE.
--
--      select t.name,
--             has_table_privilege('authenticated', t.name, 'SELECT') as auth_select,
--             has_table_privilege('authenticated', t.name, 'INSERT') as auth_insert,
--             has_table_privilege('authenticated', t.name, 'UPDATE') as auth_update,
--             has_table_privilege('authenticated', t.name, 'DELETE') as auth_delete,
--             has_table_privilege('anon', t.name, 'SELECT')          as anon_select,
--             has_table_privilege('anon', t.name, 'INSERT')          as anon_insert,
--             has_table_privilege('anon', t.name, 'UPDATE')          as anon_update,
--             has_table_privilege('anon', t.name, 'DELETE')          as anon_delete
--        from (values ('public.firm_obligations'),
--                     ('public.firm_obligation_occurrences')) as t(name);
--
--    EXPECT: TWO rows. On both, the four auth_ columns are TRUE and the four
--    anon_ columns are FALSE — eight answers per row, sixteen in all; read
--    them out. A FALSE auth_ answer is the #28 wall (the table exists and the
--    app cannot reach it). A TRUE anon_ answer — STOP: this file grants `anon`
--    nothing, so a default privilege has changed under the project (C-2,
--    O-11). Only the four DML privileges are asked; the vendor default ACL's
--    TRUNCATE / REFERENCES / TRIGGER / MAINTAIN on `anon` is O-11's, not this
--    check's.
--
-- 5. BOTH TABLES ARE EMPTY — this file writes no row.
--
--      select (select count(*) from firm_obligations)            as obligations,
--             (select count(*) from firm_obligation_occurrences) as occurrences;
--
--    EXPECT: 0 and 0. Nothing is seeded in Supabase mode (FOD-9); any other
--    number means something other than this file wrote to them — STOP.
--
-- 6. THE THREE TRIGGERS ARE IN PLACE.
--
--      select c.relname as on_table, t.tgname, pg_get_triggerdef(t.oid) as definition
--        from pg_trigger t
--        join pg_class c     on c.oid = t.tgrelid
--        join pg_namespace n on n.oid = c.relnamespace
--       where n.nspname = 'public'
--         and c.relname in ('firm_obligations','firm_obligation_occurrences')
--         and not t.tgisinternal
--       order by c.relname, t.tgname;
--
--    EXPECT: exactly THREE rows — on firm_obligations,
--    `firm_obligations_set_created_by` (BEFORE INSERT ... set_created_by()) and
--    `firm_obligations_touch` (BEFORE UPDATE ... touch_updated_at()); on
--    firm_obligation_occurrences, `firm_obligation_occurrences_touch` (BEFORE
--    UPDATE ... touch_updated_at()). `not t.tgisinternal` hides the foreign
--    key's own system triggers, which would otherwise add rows. Read the count out.
--
-- 7. NOTHING IN review_log MOVED. Re-run STEP 0 exactly as written:
--
--      select action, count(*) from review_log group by action order by action;
--
--    EXPECT: identical to what you wrote down at STEP 0, action for action, and
--    still no `done`, `not-applicable`, `undone` or `cancelled` row — the
--    widening admits those values; it writes none. Any difference means
--    something other than this file wrote to review_log in between (the app,
--    if it was open) — say which action moved and by how much.
