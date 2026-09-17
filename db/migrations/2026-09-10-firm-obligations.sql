-- Migration — 2026-09-10, FIRM OBLIGATIONS: THE TWO TABLES, review_log.action WIDENED, AND THE NINE ACT FUNCTIONS
--
-- Authorization: docs/specs/firm-obligations-build-slice.md, `FOS-1` RULED YES
-- by Michael 2026-09-10 ~23:03 CDT (verbatim "Yes"), put whole — so `FOD-20`
-- (the `cancelled` value below) is IN. Session log #155. Design authority: that
-- slice's §5 (this file, object by object) and
-- docs/specs/firm-obligations-module-spec.md §3 as amended by its §16. On any
-- conflict, the later ruling wins and the disagreement is named.
-- AMENDED IN PLACE, STILL UNRUN, under `FOS-2` RULED YES by Michael 2026-09-12
-- 23:55 CDT (verbatim "Yes"), session log #156: docs/specs/firm-obligations-fix-slice.md
-- §5 (the four columns, the replaced CHECK, the nine functions, checks 8–10).
-- Amending it is allowed only because it has not run; the gate below is
-- unchanged, so a second run still stops before any statement.
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
-- before each trigger and policy, the catalog drop before the CHECK's re-add,
-- `create or replace` on each function and a revoke before each grant — the
-- address-model precedent.
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
-- ============ WHAT THIS DOES ============
-- FOS-1's objects — the two tables, the one-open index, the three triggers, RLS
-- with one policy each, the table grants, and review_log.action widened to ten
-- values — and, added by FOS-2 (#156 §1 item 9; fix slice §5):
--   * FOUR COLUMNS, two on each table:
--       firm_obligations.outlook_reminder_days — integer, not null, default 30,
--         never below 0 (A1, FXD-9);
--       firm_obligations.pending_outlook_deletes — jsonb, not null, default '[]'
--         (A6, FXD-2);
--       firm_obligation_occurrences.materialized_from — uuid, the close that
--         materialized the occurrence, on delete set null (A3);
--       firm_obligation_occurrences.touched — boolean, not null, default false (A3).
--   * ONE CHECK REPLACED (A4): the occurrences' third row CHECK now reads
--       (outcome is not distinct from 'not-applicable') = (outcome_reason is not null)
--     so an OPEN row, whose outcome is NULL, can no longer carry a reason.
--   * NINE FUNCTIONS, one per act (A5, FXD-4), each `security invoker`, each
--     with EXECUTE revoked from public and anon and granted to authenticated:
--       firm_activate, firm_activate_from_inactive, firm_update, firm_retire,
--       firm_reactivate, firm_mark_done, firm_mark_not_applicable, firm_undo,
--       firm_set_due_override.
--   * TEN CHECKS at the foot, answered in words: 1–7 as FOS-1 wrote them, and
--     8–10 for the columns, the functions and the replaced CHECK.
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It touches NO matter table. calendar_events, cases, case_parties,
--     case_clients and party_pii are not named by any statement below, and
--     neither new table carries a case_id: a firm obligation is never a
--     matter's (DECISION 3, FOD-13).
--   * It writes NO ROW anywhere — no seed, no template, no activation. The
--     thirty-five templates are code data (slice §3 item 3); nothing is active
--     in Supabase mode until Michael activates it with his own date, in the
--     product (FOD-9). The demo seed (FOD-21) lives in localStorage only. The
--     nine functions DEFINE writes; this file calls none of them, so it
--     performs none.
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
  -- FOS-2, #156 A1: the Outlook reminder fires this many days before the
  -- TARGET, on a hard obligation only; the value stored is the value that fires
  -- (FXD-9). Where no one typed a value the app writes min(30, lead) (the fix
  -- build's stop ruling, 2026-09-16); the column default stays 30. The lead
  -- remains the register's window.
  outlook_reminder_days integer not null default 30 check (outlook_reminder_days >= 0),
  -- FOS-2, #156 A6 (FXD-2): the Outlook events an Undo could not delete, as an
  -- array of { eventId, occurrenceId, recordedAt, attempts }, retried by the
  -- sync drain. Written by the drain's own update; no act function below
  -- writes it.
  pending_outlook_deletes jsonb not null default '[]'::jsonb,
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
  -- FOS-2, #156 A3: the occurrence whose close materialized THIS one (the
  -- "next"); NULL on an occurrence an activation or a re-activation opened.
  -- Undo reads it, not the close line's record (FOD-7, FOM-11).
  materialized_from uuid references firm_obligation_occurrences (id) on delete set null,
  -- FOS-2, #156 A3, as Michael ruled at the fix build's stop 2026-09-16 ("Same
  -- as today"): true once a re-dating rule or precision edit, a due-date
  -- override, or a close has reached this occurrence. A re-push alone never
  -- sets it. Undo removes a next only while it is false.
  touched boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- The three row-level CHECKs: done means dated, done means an outcome, and
  -- Not applicable — and only Not applicable — means a reason. The third is
  -- written `is not distinct from` (FOS-2, #156 A4): with `=`, a row whose
  -- outcome is NULL compared NULL, a CHECK passes on NULL, and an OPEN row
  -- could carry a reason. Now it cannot.
  check ((state = 'done') = (done_on is not null)),
  check ((state = 'done') = (outcome is not null)),
  check ((outcome is not distinct from 'not-applicable') = (outcome_reason is not null))
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

-- ============ THE NINE ACT FUNCTIONS (FOS-2; fix slice §3 item 6, §5.3) ============
-- #156 §1 item 9, A5 ("Build the RPC functions now"); FXD-4. ONE FUNCTION PER
-- ACT. The domain module stays the decider: the Supabase adapter reads the rows
-- a plan needs, runs the domain's plan, and makes ONE rpc() call. The function
-- APPLIES that plan — its rows and its ONE review_log line (FOD-6) — inside the
-- call's own transaction, so an act lands whole or not at all. That is what
-- retires the adapter's compensation code: a failed act is "not saved", with
-- the function's message, and nothing else.
--
-- THE CALL. `p` is one jsonb object, keyed as each function's note says.
--   * A ROW is the adapter's insert mapping (snake_case, an absent field left
--     out). It is read through jsonb_populate_record(null::<table>, row) and
--     inserted under an EXPLICIT column list; a not-null column with a default
--     takes that default (coalesce) where the row carries no value.
--   * A PATCH is the adapter's update mapping (an absent field untouched, a
--     cleared field null). The row is locked and read (`for update`), the patch
--     is laid over it with jsonb_populate_record, and only the columns the
--     update names are written back — the table's mutable columns.
--     pending_outlook_deletes is never among them: the sync drain's own update
--     writes that queue, outside these acts.
--   * The review_log line takes its id and timestamp defaults.
--   * Each returns a jsonb object of to_jsonb(row) values — null where the act
--     wrote no such row.
--
-- THE REFUSALS. Each guard below is a state the plan was built on that the
-- database no longer holds (a second tab, a stale register). It raises, and
-- nothing the act wrote stands. The one-open index and the CHECKs refuse in
-- Postgres's own words. Every message is a PROVISIONAL text act: it reaches the
-- screen as "<act> was not saved: <message>".
--
-- `security invoker`: each runs as its caller, so RLS and the table grants
-- apply inside it exactly as they apply to a PostgREST write.
-- `set search_path = public` fixes what every unqualified name resolves to.
--
-- EXECUTE follows the F-1 precedent (db/schema.sql, next_file_number()):
-- Postgres grants EXECUTE on a new function to PUBLIC and CREATE OR REPLACE
-- keeps that ACL, so each function's EXECUTE is revoked FIRST — from public,
-- and from anon by name, because no function ACL on the live project has been
-- read and a default privilege could grant anon directly — and only then
-- granted to authenticated.

-- firm_activate — Activate… from the catalog or as a custom row, and Add as
-- inactive.
--   p: { obligation: row, occurrence: row | null, log }
--   The obligation inserted; its first occurrence inserted when there is one;
--   the line. Returns { obligation, occurrence }.
create or replace function public.firm_activate(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  r_ob  firm_obligations%rowtype;
  r_occ firm_obligation_occurrences%rowtype;
  j_occ jsonb := null;
begin
  r_ob := jsonb_populate_record(null::firm_obligations, p->'obligation');
  insert into firm_obligations (
    id, name, category, owner_scope, owner_user_id, template_key, recurrence,
    precision, missed_periods, conditional_per_period, weekend_rule, lead_days,
    weight, outlook_reminder_days, pending_outlook_deletes, last_period_completed,
    source_note, applies_if, notes, active, created_by, created_at, updated_at
  ) values (
    coalesce(r_ob.id, gen_random_uuid()),
    r_ob.name,
    r_ob.category,
    coalesce(r_ob.owner_scope, 'firm'),
    r_ob.owner_user_id,
    r_ob.template_key,
    r_ob.recurrence,
    coalesce(r_ob.precision, 'day'),
    r_ob.missed_periods,
    coalesce(r_ob.conditional_per_period, false),
    coalesce(r_ob.weekend_rule, 'unknown'),
    coalesce(r_ob.lead_days, 30),
    coalesce(r_ob.weight, 'routine'),
    coalesce(r_ob.outlook_reminder_days, 30),
    coalesce(r_ob.pending_outlook_deletes, '[]'::jsonb),
    r_ob.last_period_completed,
    r_ob.source_note,
    r_ob.applies_if,
    r_ob.notes,
    coalesce(r_ob.active, true),
    r_ob.created_by,
    coalesce(r_ob.created_at, now()),
    coalesce(r_ob.updated_at, now())
  )
  returning * into r_ob;

  if jsonb_typeof(p->'occurrence') = 'object' then
    r_occ := jsonb_populate_record(null::firm_obligation_occurrences, p->'occurrence');
    insert into firm_obligation_occurrences (
      id, obligation_id, period_label, due_on, due_on_override, state, done_on,
      done_by, outcome, outcome_reason, done_note, filed_at, outlook_event_id,
      sync_status, sync_error, last_sync_at, materialized_from, touched,
      created_at, updated_at
    ) values (
      coalesce(r_occ.id, gen_random_uuid()),
      r_occ.obligation_id,
      r_occ.period_label,
      r_occ.due_on,
      r_occ.due_on_override,
      coalesce(r_occ.state, 'open'),
      r_occ.done_on,
      r_occ.done_by,
      r_occ.outcome,
      r_occ.outcome_reason,
      r_occ.done_note,
      r_occ.filed_at,
      r_occ.outlook_event_id,
      coalesce(r_occ.sync_status, 'pending'),
      r_occ.sync_error,
      r_occ.last_sync_at,
      r_occ.materialized_from,
      coalesce(r_occ.touched, false),
      coalesce(r_occ.created_at, now()),
      coalesce(r_occ.updated_at, now())
    )
    returning * into r_occ;
    j_occ := to_jsonb(r_occ);
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('obligation', to_jsonb(r_ob), 'occurrence', j_occ);
end;
$$;

revoke execute on function public.firm_activate(jsonb) from public, anon;
grant execute on function public.firm_activate(jsonb) to authenticated;

-- firm_activate_from_inactive — the Inactive row's Activate…: its edit and its
-- re-activation as ONE act and ONE line (#156 A7).
--   p: { obligation_id, obligation_patch, occurrence_update: { id, patch } | null,
--        occurrence_insert: row | null, log }
--   Refused when the obligation is already active. The patch; the open
--   occurrence the edit re-dated or re-queued, updated only while it is still
--   open; the occurrence the re-activation opened, inserted; the line.
--   Returns { obligation, occurrence } — the updated or inserted occurrence, or
--   null.
create or replace function public.firm_activate_from_inactive(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_ob_id  uuid := (p->>'obligation_id')::uuid;
  v_occ_id uuid;
  r_ob     firm_obligations%rowtype;
  r_occ    firm_obligation_occurrences%rowtype;
  j_occ    jsonb := null;
begin
  select * into r_ob from firm_obligations where id = v_ob_id for update;
  if not found then
    raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  if r_ob.active then
    raise exception 'This obligation is already active — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
  update firm_obligations
     set recurrence            = r_ob.recurrence,
         precision             = r_ob.precision,
         missed_periods        = r_ob.missed_periods,
         weekend_rule          = r_ob.weekend_rule,
         lead_days             = r_ob.lead_days,
         weight                = r_ob.weight,
         notes                 = r_ob.notes,
         outlook_reminder_days = r_ob.outlook_reminder_days,
         last_period_completed = r_ob.last_period_completed,
         active                = r_ob.active,
         updated_at            = r_ob.updated_at
   where id = v_ob_id
  returning * into r_ob;

  if jsonb_typeof(p->'occurrence_update') = 'object' then
    v_occ_id := (p->'occurrence_update'->>'id')::uuid;
    select * into r_occ from firm_obligation_occurrences where id = v_occ_id for update;
    if not found then
      raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    r_occ := jsonb_populate_record(r_occ, p->'occurrence_update'->'patch');
    update firm_obligation_occurrences
       set period_label    = r_occ.period_label,
           due_on          = r_occ.due_on,
           due_on_override = r_occ.due_on_override,
           state           = r_occ.state,
           done_on         = r_occ.done_on,
           done_by         = r_occ.done_by,
           outcome         = r_occ.outcome,
           outcome_reason  = r_occ.outcome_reason,
           done_note       = r_occ.done_note,
           filed_at        = r_occ.filed_at,
           sync_status     = r_occ.sync_status,
           touched         = r_occ.touched,
           updated_at      = r_occ.updated_at
     where id = v_occ_id
       and state = 'open'
    returning * into r_occ;
    if not found then
      raise exception 'This occurrence is no longer open — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    j_occ := to_jsonb(r_occ);
  end if;

  if jsonb_typeof(p->'occurrence_insert') = 'object' then
    r_occ := jsonb_populate_record(null::firm_obligation_occurrences, p->'occurrence_insert');
    insert into firm_obligation_occurrences (
      id, obligation_id, period_label, due_on, due_on_override, state, done_on,
      done_by, outcome, outcome_reason, done_note, filed_at, outlook_event_id,
      sync_status, sync_error, last_sync_at, materialized_from, touched,
      created_at, updated_at
    ) values (
      coalesce(r_occ.id, gen_random_uuid()),
      r_occ.obligation_id,
      r_occ.period_label,
      r_occ.due_on,
      r_occ.due_on_override,
      coalesce(r_occ.state, 'open'),
      r_occ.done_on,
      r_occ.done_by,
      r_occ.outcome,
      r_occ.outcome_reason,
      r_occ.done_note,
      r_occ.filed_at,
      r_occ.outlook_event_id,
      coalesce(r_occ.sync_status, 'pending'),
      r_occ.sync_error,
      r_occ.last_sync_at,
      r_occ.materialized_from,
      coalesce(r_occ.touched, false),
      coalesce(r_occ.created_at, now()),
      coalesce(r_occ.updated_at, now())
    )
    returning * into r_occ;
    j_occ := to_jsonb(r_occ);
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('obligation', to_jsonb(r_ob), 'occurrence', j_occ);
end;
$$;

revoke execute on function public.firm_activate_from_inactive(jsonb) from public, anon;
grant execute on function public.firm_activate_from_inactive(jsonb) to authenticated;

-- firm_update — Edit… on an obligation (FOD-4).
--   p: { obligation_id, obligation_patch, occurrence: { id, patch } | null, log }
--   The patch; the open occurrence the edit re-dated or re-queued, updated only
--   while it is still open; the line. Returns { obligation, occurrence }.
create or replace function public.firm_update(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_ob_id  uuid := (p->>'obligation_id')::uuid;
  v_occ_id uuid;
  r_ob     firm_obligations%rowtype;
  r_occ    firm_obligation_occurrences%rowtype;
  j_occ    jsonb := null;
begin
  select * into r_ob from firm_obligations where id = v_ob_id for update;
  if not found then
    raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
  update firm_obligations
     set recurrence            = r_ob.recurrence,
         precision             = r_ob.precision,
         missed_periods        = r_ob.missed_periods,
         weekend_rule          = r_ob.weekend_rule,
         lead_days             = r_ob.lead_days,
         weight                = r_ob.weight,
         notes                 = r_ob.notes,
         outlook_reminder_days = r_ob.outlook_reminder_days,
         last_period_completed = r_ob.last_period_completed,
         active                = r_ob.active,
         updated_at            = r_ob.updated_at
   where id = v_ob_id
  returning * into r_ob;

  if jsonb_typeof(p->'occurrence') = 'object' then
    v_occ_id := (p->'occurrence'->>'id')::uuid;
    select * into r_occ from firm_obligation_occurrences where id = v_occ_id for update;
    if not found then
      raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    r_occ := jsonb_populate_record(r_occ, p->'occurrence'->'patch');
    update firm_obligation_occurrences
       set period_label    = r_occ.period_label,
           due_on          = r_occ.due_on,
           due_on_override = r_occ.due_on_override,
           state           = r_occ.state,
           done_on         = r_occ.done_on,
           done_by         = r_occ.done_by,
           outcome         = r_occ.outcome,
           outcome_reason  = r_occ.outcome_reason,
           done_note       = r_occ.done_note,
           filed_at        = r_occ.filed_at,
           sync_status     = r_occ.sync_status,
           touched         = r_occ.touched,
           updated_at      = r_occ.updated_at
     where id = v_occ_id
       and state = 'open'
    returning * into r_occ;
    if not found then
      raise exception 'This occurrence is no longer open — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    j_occ := to_jsonb(r_occ);
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('obligation', to_jsonb(r_ob), 'occurrence', j_occ);
end;
$$;

revoke execute on function public.firm_update(jsonb) from public, anon;
grant execute on function public.firm_update(jsonb) to authenticated;

-- firm_retire — Retire (FOD-8). It touches no occurrence.
--   p: { obligation_id, obligation_patch, log }
--   Refused when the obligation is already retired. The patch; the line.
--   Returns { obligation }.
create or replace function public.firm_retire(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_ob_id uuid := (p->>'obligation_id')::uuid;
  r_ob    firm_obligations%rowtype;
begin
  select * into r_ob from firm_obligations where id = v_ob_id for update;
  if not found then
    raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  if not r_ob.active then
    raise exception 'This obligation is already retired — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
  update firm_obligations
     set recurrence            = r_ob.recurrence,
         precision             = r_ob.precision,
         missed_periods        = r_ob.missed_periods,
         weekend_rule          = r_ob.weekend_rule,
         lead_days             = r_ob.lead_days,
         weight                = r_ob.weight,
         notes                 = r_ob.notes,
         outlook_reminder_days = r_ob.outlook_reminder_days,
         last_period_completed = r_ob.last_period_completed,
         active                = r_ob.active,
         updated_at            = r_ob.updated_at
   where id = v_ob_id
  returning * into r_ob;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('obligation', to_jsonb(r_ob));
end;
$$;

revoke execute on function public.firm_retire(jsonb) from public, anon;
grant execute on function public.firm_retire(jsonb) to authenticated;

-- firm_reactivate — Re-activate on a retired row (FOD-8, FOM-4). Not the
-- Inactive row's Activate…, which is firm_activate_from_inactive.
--   p: { obligation_id, obligation_patch, occurrence: row | null, log }
--   Refused when the obligation is already active. The patch; the occurrence
--   it opened, inserted when there is one; the line.
--   Returns { obligation, occurrence }.
create or replace function public.firm_reactivate(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_ob_id uuid := (p->>'obligation_id')::uuid;
  r_ob    firm_obligations%rowtype;
  r_occ   firm_obligation_occurrences%rowtype;
  j_occ   jsonb := null;
begin
  select * into r_ob from firm_obligations where id = v_ob_id for update;
  if not found then
    raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  if r_ob.active then
    raise exception 'This obligation is already active — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
  update firm_obligations
     set recurrence            = r_ob.recurrence,
         precision             = r_ob.precision,
         missed_periods        = r_ob.missed_periods,
         weekend_rule          = r_ob.weekend_rule,
         lead_days             = r_ob.lead_days,
         weight                = r_ob.weight,
         notes                 = r_ob.notes,
         outlook_reminder_days = r_ob.outlook_reminder_days,
         last_period_completed = r_ob.last_period_completed,
         active                = r_ob.active,
         updated_at            = r_ob.updated_at
   where id = v_ob_id
  returning * into r_ob;

  if jsonb_typeof(p->'occurrence') = 'object' then
    r_occ := jsonb_populate_record(null::firm_obligation_occurrences, p->'occurrence');
    insert into firm_obligation_occurrences (
      id, obligation_id, period_label, due_on, due_on_override, state, done_on,
      done_by, outcome, outcome_reason, done_note, filed_at, outlook_event_id,
      sync_status, sync_error, last_sync_at, materialized_from, touched,
      created_at, updated_at
    ) values (
      coalesce(r_occ.id, gen_random_uuid()),
      r_occ.obligation_id,
      r_occ.period_label,
      r_occ.due_on,
      r_occ.due_on_override,
      coalesce(r_occ.state, 'open'),
      r_occ.done_on,
      r_occ.done_by,
      r_occ.outcome,
      r_occ.outcome_reason,
      r_occ.done_note,
      r_occ.filed_at,
      r_occ.outlook_event_id,
      coalesce(r_occ.sync_status, 'pending'),
      r_occ.sync_error,
      r_occ.last_sync_at,
      r_occ.materialized_from,
      coalesce(r_occ.touched, false),
      coalesce(r_occ.created_at, now()),
      coalesce(r_occ.updated_at, now())
    )
    returning * into r_occ;
    j_occ := to_jsonb(r_occ);
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('obligation', to_jsonb(r_ob), 'occurrence', j_occ);
end;
$$;

revoke execute on function public.firm_reactivate(jsonb) from public, anon;
grant execute on function public.firm_reactivate(jsonb) to authenticated;

-- firm_mark_done — Done on an open occurrence.
--   p: { occurrence_id, occurrence_patch, next: row | null, obligation_id,
--        obligation_patch: patch | null, log }
--   Refused unless the patch's outcome is 'completed'. The close, applied only
--   while the occurrence is still open, and BEFORE the next is inserted — the
--   one-open index would refuse the next beside it (FOD-5); the next; the
--   obligation patch when there is one (a one-time close retires it, FOD-32);
--   the line. Returns { closed, next, obligation } — the obligation as
--   patched, or as read.
create or replace function public.firm_mark_done(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_occ_id uuid := (p->>'occurrence_id')::uuid;
  v_ob_id  uuid := (p->>'obligation_id')::uuid;
  r_closed firm_obligation_occurrences%rowtype;
  r_next   firm_obligation_occurrences%rowtype;
  r_ob     firm_obligations%rowtype;
  j_next   jsonb := null;
begin
  if (p->'occurrence_patch'->>'outcome') is distinct from 'completed' then
    raise exception 'A Done must carry the outcome completed.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  select * into r_closed from firm_obligation_occurrences where id = v_occ_id for update;
  if not found then
    raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_closed := jsonb_populate_record(r_closed, p->'occurrence_patch');
  update firm_obligation_occurrences
     set period_label    = r_closed.period_label,
         due_on          = r_closed.due_on,
         due_on_override = r_closed.due_on_override,
         state           = r_closed.state,
         done_on         = r_closed.done_on,
         done_by         = r_closed.done_by,
         outcome         = r_closed.outcome,
         outcome_reason  = r_closed.outcome_reason,
         done_note       = r_closed.done_note,
         filed_at        = r_closed.filed_at,
         sync_status     = r_closed.sync_status,
         touched         = r_closed.touched,
         updated_at      = r_closed.updated_at
   where id = v_occ_id
     and state = 'open'
  returning * into r_closed;
  if not found then
    raise exception 'This occurrence is no longer open — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  if jsonb_typeof(p->'next') = 'object' then
    r_next := jsonb_populate_record(null::firm_obligation_occurrences, p->'next');
    insert into firm_obligation_occurrences (
      id, obligation_id, period_label, due_on, due_on_override, state, done_on,
      done_by, outcome, outcome_reason, done_note, filed_at, outlook_event_id,
      sync_status, sync_error, last_sync_at, materialized_from, touched,
      created_at, updated_at
    ) values (
      coalesce(r_next.id, gen_random_uuid()),
      r_next.obligation_id,
      r_next.period_label,
      r_next.due_on,
      r_next.due_on_override,
      coalesce(r_next.state, 'open'),
      r_next.done_on,
      r_next.done_by,
      r_next.outcome,
      r_next.outcome_reason,
      r_next.done_note,
      r_next.filed_at,
      r_next.outlook_event_id,
      coalesce(r_next.sync_status, 'pending'),
      r_next.sync_error,
      r_next.last_sync_at,
      r_next.materialized_from,
      coalesce(r_next.touched, false),
      coalesce(r_next.created_at, now()),
      coalesce(r_next.updated_at, now())
    )
    returning * into r_next;
    j_next := to_jsonb(r_next);
  end if;

  if jsonb_typeof(p->'obligation_patch') = 'object' then
    select * into r_ob from firm_obligations where id = v_ob_id for update;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
    update firm_obligations
       set recurrence            = r_ob.recurrence,
           precision             = r_ob.precision,
           missed_periods        = r_ob.missed_periods,
           weekend_rule          = r_ob.weekend_rule,
           lead_days             = r_ob.lead_days,
           weight                = r_ob.weight,
           notes                 = r_ob.notes,
           outlook_reminder_days = r_ob.outlook_reminder_days,
           last_period_completed = r_ob.last_period_completed,
           active                = r_ob.active,
           updated_at            = r_ob.updated_at
     where id = v_ob_id
    returning * into r_ob;
  else
    select * into r_ob from firm_obligations where id = v_ob_id;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('closed', to_jsonb(r_closed), 'next', j_next, 'obligation', to_jsonb(r_ob));
end;
$$;

revoke execute on function public.firm_mark_done(jsonb) from public, anon;
grant execute on function public.firm_mark_done(jsonb) to authenticated;

-- firm_mark_not_applicable — Not applicable on an open occurrence of a row that
-- can lapse for a period (FOD-18). Shaped exactly as firm_mark_done.
--   p: { occurrence_id, occurrence_patch, next: row | null, obligation_id,
--        obligation_patch: patch | null, log }
--   Refused unless the patch's outcome is 'not-applicable'. The close, applied
--   only while the occurrence is still open, and BEFORE the next is inserted
--   (FOD-5); the next; the obligation patch when there is one; the line.
--   Returns { closed, next, obligation } — the obligation as patched, or as
--   read.
create or replace function public.firm_mark_not_applicable(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_occ_id uuid := (p->>'occurrence_id')::uuid;
  v_ob_id  uuid := (p->>'obligation_id')::uuid;
  r_closed firm_obligation_occurrences%rowtype;
  r_next   firm_obligation_occurrences%rowtype;
  r_ob     firm_obligations%rowtype;
  j_next   jsonb := null;
begin
  if (p->'occurrence_patch'->>'outcome') is distinct from 'not-applicable' then
    raise exception 'A Not applicable must carry the outcome not-applicable.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  select * into r_closed from firm_obligation_occurrences where id = v_occ_id for update;
  if not found then
    raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_closed := jsonb_populate_record(r_closed, p->'occurrence_patch');
  update firm_obligation_occurrences
     set period_label    = r_closed.period_label,
         due_on          = r_closed.due_on,
         due_on_override = r_closed.due_on_override,
         state           = r_closed.state,
         done_on         = r_closed.done_on,
         done_by         = r_closed.done_by,
         outcome         = r_closed.outcome,
         outcome_reason  = r_closed.outcome_reason,
         done_note       = r_closed.done_note,
         filed_at        = r_closed.filed_at,
         sync_status     = r_closed.sync_status,
         touched         = r_closed.touched,
         updated_at      = r_closed.updated_at
   where id = v_occ_id
     and state = 'open'
  returning * into r_closed;
  if not found then
    raise exception 'This occurrence is no longer open — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  if jsonb_typeof(p->'next') = 'object' then
    r_next := jsonb_populate_record(null::firm_obligation_occurrences, p->'next');
    insert into firm_obligation_occurrences (
      id, obligation_id, period_label, due_on, due_on_override, state, done_on,
      done_by, outcome, outcome_reason, done_note, filed_at, outlook_event_id,
      sync_status, sync_error, last_sync_at, materialized_from, touched,
      created_at, updated_at
    ) values (
      coalesce(r_next.id, gen_random_uuid()),
      r_next.obligation_id,
      r_next.period_label,
      r_next.due_on,
      r_next.due_on_override,
      coalesce(r_next.state, 'open'),
      r_next.done_on,
      r_next.done_by,
      r_next.outcome,
      r_next.outcome_reason,
      r_next.done_note,
      r_next.filed_at,
      r_next.outlook_event_id,
      coalesce(r_next.sync_status, 'pending'),
      r_next.sync_error,
      r_next.last_sync_at,
      r_next.materialized_from,
      coalesce(r_next.touched, false),
      coalesce(r_next.created_at, now()),
      coalesce(r_next.updated_at, now())
    )
    returning * into r_next;
    j_next := to_jsonb(r_next);
  end if;

  if jsonb_typeof(p->'obligation_patch') = 'object' then
    select * into r_ob from firm_obligations where id = v_ob_id for update;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
    update firm_obligations
       set recurrence            = r_ob.recurrence,
           precision             = r_ob.precision,
           missed_periods        = r_ob.missed_periods,
           weekend_rule          = r_ob.weekend_rule,
           lead_days             = r_ob.lead_days,
           weight                = r_ob.weight,
           notes                 = r_ob.notes,
           outlook_reminder_days = r_ob.outlook_reminder_days,
           last_period_completed = r_ob.last_period_completed,
           active                = r_ob.active,
           updated_at            = r_ob.updated_at
     where id = v_ob_id
    returning * into r_ob;
  else
    select * into r_ob from firm_obligations where id = v_ob_id;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('closed', to_jsonb(r_closed), 'next', j_next, 'obligation', to_jsonb(r_ob));
end;
$$;

revoke execute on function public.firm_mark_not_applicable(jsonb) from public, anon;
grant execute on function public.firm_mark_not_applicable(jsonb) to authenticated;

-- firm_undo — Undo a close (FOD-7, FOM-11), decided from the columns (#156 A3).
--   p: { occurrence_id, reopen_patch, remove_occurrence_id: uuid | null,
--        obligation_id, obligation_patch: patch | null, log }
--   The untouched next removed FIRST — only while it is still open, untouched,
--   and materialized by this very close — because the one-open index would
--   refuse the reopen beside it (FOD-5); the reopen, applied only while the
--   occurrence is still done; the obligation patch when there is one (a
--   one-time close's retirement put back); the line.
--   Returns { reopened, removed, obligation } — removed is the deleted row, or
--   null; the obligation as patched, or as read.
create or replace function public.firm_undo(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_occ_id    uuid := (p->>'occurrence_id')::uuid;
  v_remove_id uuid := (p->>'remove_occurrence_id')::uuid;
  v_ob_id     uuid := (p->>'obligation_id')::uuid;
  r_reopened  firm_obligation_occurrences%rowtype;
  r_removed   firm_obligation_occurrences%rowtype;
  r_ob        firm_obligations%rowtype;
  j_removed   jsonb := null;
begin
  if v_remove_id is not null then
    delete from firm_obligation_occurrences
     where id = v_remove_id
       and state = 'open'
       and touched = false
       and materialized_from = v_occ_id
    returning * into r_removed;
    if not found then
      raise exception 'The next occurrence is no longer untouched — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    j_removed := to_jsonb(r_removed);
  end if;

  select * into r_reopened from firm_obligation_occurrences where id = v_occ_id for update;
  if not found then
    raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_reopened := jsonb_populate_record(r_reopened, p->'reopen_patch');
  update firm_obligation_occurrences
     set period_label    = r_reopened.period_label,
         due_on          = r_reopened.due_on,
         due_on_override = r_reopened.due_on_override,
         state           = r_reopened.state,
         done_on         = r_reopened.done_on,
         done_by         = r_reopened.done_by,
         outcome         = r_reopened.outcome,
         outcome_reason  = r_reopened.outcome_reason,
         done_note       = r_reopened.done_note,
         filed_at        = r_reopened.filed_at,
         sync_status     = r_reopened.sync_status,
         touched         = r_reopened.touched,
         updated_at      = r_reopened.updated_at
   where id = v_occ_id
     and state = 'done'
  returning * into r_reopened;
  if not found then
    raise exception 'This occurrence is no longer closed — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  if jsonb_typeof(p->'obligation_patch') = 'object' then
    select * into r_ob from firm_obligations where id = v_ob_id for update;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
    r_ob := jsonb_populate_record(r_ob, p->'obligation_patch');
    update firm_obligations
       set recurrence            = r_ob.recurrence,
           precision             = r_ob.precision,
           missed_periods        = r_ob.missed_periods,
           weekend_rule          = r_ob.weekend_rule,
           lead_days             = r_ob.lead_days,
           weight                = r_ob.weight,
           notes                 = r_ob.notes,
           outlook_reminder_days = r_ob.outlook_reminder_days,
           last_period_completed = r_ob.last_period_completed,
           active                = r_ob.active,
           updated_at            = r_ob.updated_at
     where id = v_ob_id
    returning * into r_ob;
  else
    select * into r_ob from firm_obligations where id = v_ob_id;
    if not found then
      raise exception 'Firm obligation not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
    end if;
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('reopened', to_jsonb(r_reopened), 'removed', j_removed, 'obligation', to_jsonb(r_ob));
end;
$$;

revoke execute on function public.firm_undo(jsonb) from public, anon;
grant execute on function public.firm_undo(jsonb) to authenticated;

-- firm_set_due_override — the due-date override on an open occurrence (FOD-4).
--   p: { occurrence_id, patch, log }
--   The patch, applied only while the occurrence is still open; the line.
--   Returns { occurrence }.
create or replace function public.firm_set_due_override(p jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_occ_id uuid := (p->>'occurrence_id')::uuid;
  r_occ    firm_obligation_occurrences%rowtype;
begin
  select * into r_occ from firm_obligation_occurrences where id = v_occ_id for update;
  if not found then
    raise exception 'Occurrence not found.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;
  r_occ := jsonb_populate_record(r_occ, p->'patch');
  update firm_obligation_occurrences
     set period_label    = r_occ.period_label,
         due_on          = r_occ.due_on,
         due_on_override = r_occ.due_on_override,
         state           = r_occ.state,
         done_on         = r_occ.done_on,
         done_by         = r_occ.done_by,
         outcome         = r_occ.outcome,
         outcome_reason  = r_occ.outcome_reason,
         done_note       = r_occ.done_note,
         filed_at        = r_occ.filed_at,
         sync_status     = r_occ.sync_status,
         touched         = r_occ.touched,
         updated_at      = r_occ.updated_at
   where id = v_occ_id
     and state = 'open'
  returning * into r_occ;
  if not found then
    raise exception 'This occurrence is no longer open — reload the register.'; -- PROVISIONAL — #156 §1 item 9 (A5)
  end if;

  insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
  values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action',
          p->'log'->>'user', p->'log'->>'old_value', p->'log'->>'new_value',
          p->'log'->>'reason');

  return jsonb_build_object('occurrence', to_jsonb(r_occ));
end;
$$;

revoke execute on function public.firm_set_due_override(jsonb) from public, anon;
grant execute on function public.firm_set_due_override(jsonb) to authenticated;

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
--
-- 8. THE FOUR FOS-2 COLUMNS EXIST, WITH THEIR TYPES AND DEFAULTS.
--
--      select table_name, column_name, data_type, is_nullable, column_default
--        from information_schema.columns
--       where table_schema = 'public'
--         and table_name  in ('firm_obligations','firm_obligation_occurrences')
--         and column_name in ('outlook_reminder_days','pending_outlook_deletes',
--                             'materialized_from','touched')
--       order by table_name, column_name;
--
--    EXPECT: exactly FOUR rows, in whatever order the database sorts them —
--    on firm_obligations, outlook_reminder_days (data_type integer, is_nullable
--    NO, column_default 30) and pending_outlook_deletes (jsonb, NO,
--    '[]'::jsonb); on firm_obligation_occurrences, materialized_from (uuid,
--    YES, no default — NULL) and touched (boolean, NO, false). Read each row's
--    table, type and default out. FEWER than four rows means a column was not
--    created, and a column on the other table means it landed in the wrong
--    place — STOP either way. A default other than these — say which.
--
-- 9. THE NINE FUNCTIONS EXIST, RUN AS THEIR CALLER, AND ONLY THE APP'S ROLE
--    MAY CALL THEM.
--
--      select p.proname,
--             pg_get_function_identity_arguments(p.oid) as args,
--             p.prosecdef as security_definer
--        from pg_proc p
--        join pg_namespace n on n.oid = p.pronamespace
--       where n.nspname = 'public'
--         and p.proname in ('firm_activate','firm_activate_from_inactive',
--                           'firm_update','firm_retire','firm_reactivate',
--                           'firm_mark_done','firm_mark_not_applicable',
--                           'firm_undo','firm_set_due_override')
--       order by p.proname;
--
--      select t.sig,
--             has_function_privilege('authenticated', t.sig, 'EXECUTE') as auth_execute,
--             has_function_privilege('anon', t.sig, 'EXECUTE')          as anon_execute
--        from (values ('public.firm_activate(jsonb)'),
--                     ('public.firm_activate_from_inactive(jsonb)'),
--                     ('public.firm_update(jsonb)'),
--                     ('public.firm_retire(jsonb)'),
--                     ('public.firm_reactivate(jsonb)'),
--                     ('public.firm_mark_done(jsonb)'),
--                     ('public.firm_mark_not_applicable(jsonb)'),
--                     ('public.firm_undo(jsonb)'),
--                     ('public.firm_set_due_override(jsonb)')) as t(sig);
--
--    EXPECT: the first query returns exactly NINE rows, each with args
--    `p jsonb` and security_definer FALSE — each is security invoker, so RLS
--    applies inside it. FEWER than nine rows means a function was not created
--    — STOP. The second returns NINE rows with auth_execute TRUE and
--    anon_execute FALSE on every one — eighteen answers; read them out. An
--    error saying a function does not exist is the same STOP as a missing row.
--    A FALSE auth_ answer means the app cannot call that act — STOP. A TRUE
--    anon_ answer means the signed-out role can call it, so the revoke did not
--    take or something granted it again — STOP.
--
-- 10. THE OUTCOME-REASON CHECK IS THE TIGHTENED ONE (#156 A4).
--
--      select c.conname, pg_get_constraintdef(c.oid) as definition
--        from pg_constraint c
--       where c.conrelid = 'public.firm_obligation_occurrences'::regclass
--         and c.contype  = 'c'
--         and pg_get_constraintdef(c.oid) like '%outcome_reason IS NOT NULL%'
--       order by c.conname;
--
--    EXPECT: exactly ONE row. This file writes that CHECK as
--    (outcome is not distinct from 'not-applicable') = (outcome_reason is not null).
--    Read the definition out and say how it spells the left side. Postgres may
--    print it as IS NOT DISTINCT FROM, or — because it stores IS NOT DISTINCT
--    FROM as a NOT over IS DISTINCT FROM — as
--    NOT (outcome IS DISTINCT FROM 'not-applicable'::text). Either spelling is
--    the tightened CHECK. If it reads (outcome = 'not-applicable'::text), with
--    no DISTINCT in it, the old three-valued CHECK stands and an open row can
--    still carry a reason — STOP. ZERO rows — STOP.
