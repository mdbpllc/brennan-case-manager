-- ============================================================
-- CL-2 — THE CLIENT DIMENSION AND THE MEDICAL REPOINT
-- Authorized by Michael 2026-07-28 (session-log #27, "2. yes."),
-- executed 2026-07-28 (#29). Scope: cl2-authorization-brief.md §1's six pieces.
-- Design: docs/specs/claimant-dimension-and-case-links-design.md.
--
-- The case owns the occurrence and liability; the CLIENT owns the damages.
--
-- BEFORE RUNNING THIS: take a Supabase backup. This migration DROPS a column
-- (`cases.statute_of_limitations`) after moving its data. The drop is
-- deliberate and ruled (#27): a retained-but-unwritten column still holds
-- stale dates and answers queries plausibly and wrongly.
--
-- Idempotent: safe to re-run. Every step guards on existence.
-- Run the whole file as ONE statement batch in the SQL editor, with NOTHING
-- else pasted around it (the 2026-07-28 grants run failed at line 747 because
-- prompt prose was pasted beneath the SQL).
-- ============================================================

begin;

-- ------------------------------------------------------------
-- 1. case_clients — parallel to case_parties, NOT a promotion of it
--    (D-CL2-8, adopted by Michael 2026-07-28).
-- ------------------------------------------------------------
create table if not exists case_clients (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  -- `on delete restrict` is deliberate: deleting a party who is a client must
  -- NOT silently cascade away their bills, runs, and (later) liens.
  party_id uuid not null references parties (id) on delete restrict,
  -- 'mixed' is admitted NOW so a future mixed-posture value needs no constraint
  -- migration (D-CL2-1 schema note, #26). Nothing writes it yet.
  posture text not null default 'claimant'
    check (posture in ('claimant', 'defendant', 'mixed')),
  display_order integer not null default 0,
  statute_of_limitations date,
  sol_basis text check (sol_basis in ('standard','minor-tolled','survival-tolled','manual')),
  -- Medicare/Medicaid ONLY (D-CL2-5). The occurrence flags stay on cases.pi_flags.
  client_flags text[] not null default '{}',
  fee_arrangement jsonb not null default '{}',
  -- Shape driven by the DERIVED practice-area profile, never an override (§3.0.1).
  profile_fields jsonb not null default '{}',
  -- D-CL2-4a: shares lock at disbursement. D-CL2-2a: a disbursed client is
  -- "resolved" and drops out of the derived earliest-limitations calculation.
  -- Settlement/disbursement RECORDS are not built — this is the marker only.
  disbursed_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, party_id)
);

create index if not exists case_clients_case_idx on case_clients (case_id);
create index if not exists case_clients_party_idx on case_clients (party_id);

drop trigger if exists case_clients_touch on case_clients;
create trigger case_clients_touch before update on case_clients
  for each row execute function touch_updated_at();

-- ------------------------------------------------------------
-- 2. case_client_flags — cases the backfill could NOT derive a client for.
--    NEVER guessed, NEVER given a placeholder (design §5; brief §1 piece 2).
--
--    `preserved_statute_of_limitations` holds the date that was on
--    cases.statute_of_limitations when the column dropped, so a flagged case
--    does not lose an attorney-entered date it had nowhere to put.
--    RULED by Michael 2026-07-28: preserve on the flag, carry on resolve.
-- ------------------------------------------------------------
create table if not exists case_client_flags (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  reason text not null,
  preserved_statute_of_limitations date,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_id)
);

create index if not exists case_client_flags_case_idx on case_client_flags (case_id);

-- ------------------------------------------------------------
-- 3. Repoint the medical stack. client_id is NULLABLE on purpose: a flagged
--    case has no client, and its bills must not be blocked or invented.
--    Denormalized onto analysis_runs so per-client queries do not join
--    through bills (§3.1).
-- ------------------------------------------------------------
alter table medical_bills
  add column if not exists client_id uuid references case_clients (id) on delete set null;
alter table analysis_runs
  add column if not exists client_id uuid references case_clients (id) on delete set null;

create index if not exists medical_bills_client_idx on medical_bills (client_id);
create index if not exists analysis_runs_client_idx on analysis_runs (client_id);

-- ------------------------------------------------------------
-- 4. RLS — same authenticated-only pattern as all 31 existing policies.
-- ------------------------------------------------------------
alter table case_clients enable row level security;
alter table case_client_flags enable row level security;

drop policy if exists "authenticated full access case_clients" on case_clients;
create policy "authenticated full access case_clients" on case_clients
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access case_client_flags" on case_client_flags;
create policy "authenticated full access case_client_flags" on case_client_flags
  for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- 5. PRIVILEGES — the trap this slice was explicitly warned about.
--    RLS is not access control on its own. With "auto-expose new tables" OFF
--    and ALTER DEFAULT PRIVILEGES deliberately unset, BOTH tables above are
--    unreachable (401 / 42501) until granted here, no matter how correct their
--    policies are. See db/schema.sql's grants block and the 2026-07-28
--    spec-feedback entry. `authenticated` ONLY; `anon` gets nothing.
-- ------------------------------------------------------------
grant select, insert, update, delete on case_clients to authenticated;
grant select, insert, update, delete on case_client_flags to authenticated;

-- ------------------------------------------------------------
-- 6. BACKFILL — one client per client-role party on each case.
--    D-CL2-8: case_parties is NOT touched. The client-role row stays exactly
--    where it is; case_clients is purely additive. Stated so nobody "tidies."
--    (Brief §4 question 1, run as Michael's stated default, #27.)
--
--    Criminal cases DO get a record — a nearly-empty row, the future anchor
--    for representation type (brief §4 question 2, stated default, #27).
--    Clocks stay on `charges`; criminal never used cases.statute_of_limitations.
--
--    sol_basis is 'manual' where a date carried: the case-level date was typed
--    by hand and its true basis is unknown. Asserting 'standard' would be a
--    guess about a legal deadline.
-- ------------------------------------------------------------
insert into case_clients (case_id, party_id, posture, display_order,
                          statute_of_limitations, sol_basis, client_flags, notes)
select
  cp.case_id,
  cp.party_id,
  'claimant',
  row_number() over (partition by cp.case_id order by cp.created_at, cp.id) - 1,
  c.statute_of_limitations,
  case when c.statute_of_limitations is not null then 'manual' end,
  case when 'Medicare/Medicaid beneficiary' = any(coalesce(c.pi_flags, '{}'))
       then array['Medicare/Medicaid beneficiary']
       else '{}'::text[] end,
  'Derived by the CL-2 backfill, 2026-07-28.'
from case_parties cp
join cases c on c.id = cp.case_id
where cp.role in ('Client', 'Plaintiff')
on conflict (case_id, party_id) do nothing;

-- 6b. Flag every case left without a client, PRESERVING its limitations date.
insert into case_client_flags (case_id, reason, preserved_statute_of_limitations)
select
  c.id,
  'CL-2 backfill: no party on this case carries a Client or Plaintiff role, so no '
    || 'client record could be derived. Not guessed and not placeholdered. Link a '
    || 'client-role party and create the client record; any preserved limitations '
    || 'date carries over to it.',
  c.statute_of_limitations
from cases c
where not exists (select 1 from case_clients cc where cc.case_id = c.id)
on conflict (case_id) do nothing;

-- 6c. Point bills and runs at their case's client. Unambiguous only where the
--     case has exactly ONE client — which is every case in existence today.
--     Multi-client cases are assigned by hand in the UI; a wrong body on a bill
--     is worse than an unassigned one.
update medical_bills b
set client_id = sole.client_id
from (
  select case_id, min(id::text)::uuid as client_id
  from case_clients group by case_id having count(*) = 1
) sole
where b.case_id = sole.case_id and b.client_id is null;

update analysis_runs r
set client_id = sole.client_id
from (
  select case_id, min(id::text)::uuid as client_id
  from case_clients group by case_id having count(*) = 1
) sole
where r.case_id = sole.case_id and r.client_id is null;

-- ------------------------------------------------------------
-- 7. Strip Medicare/Medicaid from the case-level flags. It is now carried on
--    the client records created above (step 6), so this is a move, not a loss.
--    D-CL2-5: the other occurrence flags stay exactly where they are.
-- ------------------------------------------------------------
update cases
set pi_flags = array_remove(pi_flags, 'Medicare/Medicaid beneficiary')
where 'Medicare/Medicaid beneficiary' = any(coalesce(pi_flags, '{}'));

-- ------------------------------------------------------------
-- 8. REVIEW LOG — the migration says what it did, per the
--    backup-and-review-log pattern (the reseed-wipe lesson).
-- ------------------------------------------------------------
insert into review_log (entity_type, entity_id, action, "user", reason)
select 'case_client', cc.id::text, 'created', 'system (CL-2 backfill)',
       'Client derived from the case''s ' || cp.role || '-role party during the CL-2 '
         || 'migration. Limitations date carried from cases.statute_of_limitations '
         || 'before that column was dropped.'
from case_clients cc
join case_parties cp on cp.case_id = cc.case_id and cp.party_id = cc.party_id
                    and cp.role in ('Client', 'Plaintiff')
where cc.notes = 'Derived by the CL-2 backfill, 2026-07-28.'
  and not exists (
    select 1 from review_log rl
    where rl.entity_type = 'case_client' and rl.entity_id = cc.id::text
  );

insert into review_log (entity_type, entity_id, action, "user", old_value, reason)
select 'case', f.case_id::text, 'edited', 'system (CL-2 backfill)',
       coalesce(f.preserved_statute_of_limitations::text, '(no date)'),
       'FLAGGED FOR MICHAEL: no client-role party, so no client record was derived. '
         || 'Limitations date preserved on the flag and carries to the client record '
         || 'when one is created.'
from case_client_flags f
where not exists (
  select 1 from review_log rl
  where rl.entity_type = 'case' and rl.entity_id = f.case_id::text
    and rl."user" = 'system (CL-2 backfill)'
);

-- ------------------------------------------------------------
-- 9. RETIRE cases.statute_of_limitations (piece 4, DROP not dormant, #27).
--    Every date is now either on a client record (step 6) or preserved on a
--    flag (step 6b). Run LAST so a failure above leaves the source intact.
-- ------------------------------------------------------------
alter table cases drop column if exists statute_of_limitations;

commit;

-- ------------------------------------------------------------
-- VERIFY (run separately, after the commit):
--   select count(*) from case_clients;
--   select case_id, preserved_statute_of_limitations from case_client_flags
--     where resolved_at is null;
--   select entity_type, action, reason from review_log
--     where "user" = 'system (CL-2 backfill)';
--   -- must return zero rows: the column is gone
--   select column_name from information_schema.columns
--     where table_name = 'cases' and column_name = 'statute_of_limitations';
-- ------------------------------------------------------------
