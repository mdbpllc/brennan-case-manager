-- Brennan Case Manager — vertical slice schema (Cases + Parties)
-- Run this in the Supabase SQL editor (Database → SQL) on a fresh project.
-- Mirrors the settled data model: lean case record, party-once-link-many,
-- roles layered on top of party identity, YY-NNNN file numbers with a
-- January counter reset, generated server-side so numbers are gapless and
-- race-free with multiple users.

-- ============ FILE NUMBERS ============
create table if not exists file_counters (
  yy text primary key,        -- two-digit year
  counter integer not null default 0
);

-- SECURITY DEFINER so case inserts can bump the counter even though
-- file_counters itself has RLS on and no policies (API access denied).
create or replace function next_file_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_yy text := to_char(now(), 'YY');
  v_n integer;
begin
  insert into file_counters (yy, counter) values (v_yy, 1)
  on conflict (yy) do update set counter = file_counters.counter + 1
  returning counter into v_n;
  return v_yy || '-' || lpad(v_n::text, 4, '0');
end;
$$;

-- ============ CASES ============
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  file_number text not null unique default next_file_number(),
  legacy_ref text,                        -- Cloudlex identifier for migrated cases
  practice_area text not null,            -- Personal Injury / General Civil Litigation / Criminal
  case_type text not null,
  caption text,
  status text not null default 'Intake',
  representation_type text,               -- criminal only: Court-appointed / Private hire
  commercial_policy_involved boolean,     -- MVC rollup flag
  pi_flags text[] default '{}',           -- stackable overlay flags (settled: flags, not case types)
  date_of_incident date,
  date_opened date not null default current_date,
  statute_of_limitations date,
  date_closed date,
  court_name text,
  cause_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ PARTIES ============
-- Party identity entered ONCE; typed fields live in JSONB driven by the
-- front-end party-type registry (src/domain/partyRegistry.ts). Promote hot
-- fields to real columns later if reporting needs them.
create table if not exists parties (
  id uuid primary key default gen_random_uuid(),
  party_type text not null,               -- registry key: client, adjuster, attorney, ...
  kind text not null check (kind in ('individual','organization')),
  display_name text not null,
  fields jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists parties_type_idx on parties (party_type);
create index if not exists parties_name_idx on parties (display_name);
create index if not exists parties_fields_idx on parties using gin (fields);

-- ============ CASE <-> PARTY LINKS (roles) ============
create table if not exists case_parties (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  party_id uuid not null references parties (id) on delete cascade,
  role text not null,                     -- Plaintiff, Defendant, Witness, ...
  side text,                              -- Ours / Opposing / Neutral
  note text,
  created_at timestamptz not null default now(),
  unique (case_id, party_id, role)
);

create index if not exists case_parties_case_idx on case_parties (case_id);
create index if not exists case_parties_party_idx on case_parties (party_id);

-- ============ updated_at triggers ============
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists cases_touch on cases;
create trigger cases_touch before update on cases
  for each row execute function touch_updated_at();

drop trigger if exists parties_touch on parties;
create trigger parties_touch before update on parties
  for each row execute function touch_updated_at();

-- ============ ROW LEVEL SECURITY ============
-- Single-user phase: RLS is ON with an authenticated-only policy, so nothing is
-- publicly readable. When staff logins arrive, replace these with per-role policies.
-- NOTE (security review item): the anon key + these policies are NOT sufficient for
-- multi-user production; a professional security review is required before real
-- client data goes in (project instructions §15).
alter table cases enable row level security;
alter table parties enable row level security;
alter table case_parties enable row level security;
-- file_counters: RLS on with NO policies — never touched via the API,
-- only through next_file_number() (security definer).
alter table file_counters enable row level security;

create policy "authenticated full access cases" on cases
  for all to authenticated using (true) with check (true);
create policy "authenticated full access parties" on parties
  for all to authenticated using (true) with check (true);
create policy "authenticated full access links" on case_parties
  for all to authenticated using (true) with check (true);
