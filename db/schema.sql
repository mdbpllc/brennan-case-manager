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

-- ============================================================
-- BILLING MODULE — Phase 1a (spec: docs/specs/medical-billing-analysis-module-synthesis.md Part 4)
-- ============================================================

-- Trigram matching for chargemaster memory (client also computes trigram
-- similarity in TS so demo mode behaves identically; the index serves
-- server-side lookups as data grows).
create extension if not exists pg_trgm;

-- Medical bills: a small ledger, not one number (project instructions §10).
-- Type 1 = raw (provider unpaid); Type 2 = health-insurance-paid.
create table if not exists medical_bills (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  provider_party_id uuid references parties (id) on delete set null,
  label text not null,
  bill_type integer not null check (bill_type in (1, 2)),
  claim_type text not null default 'unknown' check (claim_type in ('professional','facility','unknown')),
  claim_type_source text not null default 'detected' check (claim_type_source in ('detected','attorney')),
  service_start date,
  service_end date,
  billed_amount numeric(12,2) not null default 0,
  negotiated_reduction numeric(12,2),
  insurer_payment numeric(12,2),
  contractual_adjustment numeric(12,2),
  patient_balance numeric(12,2),
  balance_reduction numeric(12,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists medical_bills_case_idx on medical_bills (case_id);

create table if not exists bill_line_items (
  id uuid primary key default gen_random_uuid(),
  bill_id uuid not null references medical_bills (id) on delete cascade,
  service_date date,
  raw_description text not null,
  revenue_code text,
  chargemaster_code text,
  qty numeric(10,2) not null default 1,
  unit_charge numeric(12,2) not null default 0,
  extended_charge numeric(12,2) not null default 0,
  cpt text,
  cpt_modifier text,
  mapping_status text not null default 'unmapped' check (mapping_status in ('unmapped','suggested','confirmed')),
  suggestion_confidence numeric(4,3),
  mapping_source text check (mapping_source in ('chargemaster_memory','attorney')),
  confirmed_by text,
  confirmed_date timestamptz,
  scenario_cpts jsonb,
  notes text
);

create index if not exists bill_line_items_bill_idx on bill_line_items (bill_id);

-- Chargemaster memory: confirmed description→CPT pairs. Keyed on
-- description+chargemaster code (hospitals reuse CPTs across lines — dry run).
-- protective_order rows never enter cross-case matching (guardrail 4).
create table if not exists code_mappings (
  id uuid primary key default gen_random_uuid(),
  provider_party_id uuid references parties (id) on delete set null,
  raw_description text not null,
  chargemaster_code text,
  cpt text not null,
  mapping_source text not null check (mapping_source in ('chargemaster_memory','attorney')),
  confirmed_by text not null,
  confirmed_date timestamptz not null default now(),
  protective_order boolean not null default false,
  is_active boolean not null default true,
  notes text
);

create index if not exists code_mappings_desc_trgm_idx on code_mappings using gin (raw_description gin_trgm_ops);
create index if not exists code_mappings_provider_idx on code_mappings (provider_party_id);

-- Light EOB record on Type 2 bills. patient_responsibility is the Ch. 146
-- lien-cap input — typed + source-pinned, one per bill.
create table if not exists eob_records (
  id uuid primary key default gen_random_uuid(),
  bill_id uuid not null unique references medical_bills (id) on delete cascade,
  document_link text,
  insurer_payment numeric(12,2),
  contractual_adjustment numeric(12,2),
  patient_responsibility numeric(12,2),
  source_pin text,
  updated_at timestamptz not null default now()
);

-- ProviderBillingProfile: aggregated billing-pattern analytics attached to the
-- provider-business party record (synthesis Part 4). A computed projection over
-- CONFIRMED runs — recomputed on run confirmation, never hand-edited. Stores
-- ratios and flags only, never client identities (guardrail 7).
-- historical_reduction_pct auto-feeds from settlement billed-vs-final outcomes
-- once the settlement module lands.
create table if not exists provider_billing_profiles (
  id uuid primary key default gen_random_uuid(),
  provider_party_id uuid not null unique references parties (id) on delete cascade,
  avg_billed_to_medicare_ratio numeric(8,2),
  historical_reduction_pct numeric(5,2),
  common_flags jsonb not null default '[]',
  last_analysis_date timestamptz,
  updated_at timestamptz not null default now()
);

-- Analysis runs: schedules used, assumptions, totals, provisional/confirmed,
-- disclaimer version, registry-version stamps. Only CONFIRMED runs may feed
-- settlement/lien math (decision-queue item 7).
create table if not exists analysis_runs (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  bill_id uuid not null references medical_bills (id) on delete cascade,
  run_date timestamptz not null default now(),
  schedule_ids jsonb not null default '[]',
  assumptions jsonb not null default '{}',
  totals jsonb not null default '{}',
  status text not null default 'provisional' check (status in ('provisional','confirmed')),
  reviewer text,
  reviewed_date timestamptz,
  disclaimer_version text not null,
  registry_stamps jsonb not null default '[]'
);

create index if not exists analysis_runs_case_idx on analysis_runs (case_id);
create index if not exists analysis_runs_bill_idx on analysis_runs (bill_id);

create table if not exists analysis_result_lines (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references analysis_runs (id) on delete cascade,
  line_item_id uuid not null,
  cpt_used text,
  tier text not null check (tier in ('confirmed','scenario','unanalyzed')),
  allowable numeric(12,2),
  schedule_id uuid,
  cite text,
  ratio numeric(8,2),
  notes text
);

create index if not exists analysis_result_lines_run_idx on analysis_result_lines (run_id);

-- Audit trail: every mapping confirmation, analysis review, and document
-- generation (who/when/what changed/why). Ordinary audit table, nothing exotic.
create table if not exists review_log (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  action text not null check (action in ('suggested','confirmed','edited','rejected','created','generated')),
  "user" text not null,
  timestamp timestamptz not null default now(),
  old_value text,
  new_value text,
  reason text
);

create index if not exists review_log_entity_idx on review_log (entity_type, entity_id);

-- Legal Rule Registry — SYSTEM-WIDE core infrastructure (promoted 2026-07-22).
-- No rule is hard-coded while unverified; verified requires attorney sign-off;
-- every computed output stamps the versions it relied on.
create table if not exists legal_rules (
  id uuid primary key default gen_random_uuid(),
  rule_key text not null unique,
  proposition text not null,
  cites jsonb not null default '[]',
  scope text not null check (scope in ('system','billing','liens','playbooks','deadlines')),
  status text not null default 'unverified' check (status in ('unverified','verified','watch')),
  last_verified_date date,
  verified_by text,
  watch_flags text,
  notes text,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists legal_rules_touch on legal_rules;
create trigger legal_rules_touch before update on legal_rules
  for each row execute function touch_updated_at();

-- Fee-schedule library (public + demo now; discovery/licensed/hospital_mrf in
-- later phases — source_type and confidentiality walls arrive with them).
create table if not exists fee_schedules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_type text not null check (source_type in ('public','demo','discovery','licensed','hospital_mrf')),
  year text,
  locality text,
  payer_party_id uuid references parties (id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists fee_schedule_rates (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references fee_schedules (id) on delete cascade,
  code text not null,
  modifier text,
  description text,
  rate numeric(12,2) not null,
  setting text check (setting in ('inpatient','outpatient')),
  source_locator text
);

create index if not exists fee_schedule_rates_sched_idx on fee_schedule_rates (schedule_id);
create index if not exists fee_schedule_rates_code_idx on fee_schedule_rates (code);

-- Generated documents (reports). Content stored inline until document storage
-- lands. Privilege vocabulary is the shared system-wide set.
create table if not exists generated_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  run_id uuid references analysis_runs (id) on delete set null,
  doc_type text not null check (doc_type in ('reasonable-value-report')),
  audience text not null default 'internal' check (audience in ('internal','lienholder','client','opposing')),
  privilege_tier text not null default 'work-product' check (privilege_tier in ('attorney-client','work-product','non-privileged')),
  title text not null,
  content text not null,
  disclaimer_version text not null,
  generated_by text not null,
  generated_at timestamptz not null default now()
);

create index if not exists generated_documents_case_idx on generated_documents (case_id);

-- RLS: same single-user authenticated-only posture as the core tables.
alter table medical_bills enable row level security;
alter table bill_line_items enable row level security;
alter table code_mappings enable row level security;
alter table eob_records enable row level security;
alter table analysis_runs enable row level security;
alter table analysis_result_lines enable row level security;
alter table review_log enable row level security;
alter table legal_rules enable row level security;
alter table fee_schedules enable row level security;
alter table fee_schedule_rates enable row level security;
alter table generated_documents enable row level security;
alter table provider_billing_profiles enable row level security;

create policy "authenticated full access provider_billing_profiles" on provider_billing_profiles
  for all to authenticated using (true) with check (true);
create policy "authenticated full access medical_bills" on medical_bills
  for all to authenticated using (true) with check (true);
create policy "authenticated full access bill_line_items" on bill_line_items
  for all to authenticated using (true) with check (true);
create policy "authenticated full access code_mappings" on code_mappings
  for all to authenticated using (true) with check (true);
create policy "authenticated full access eob_records" on eob_records
  for all to authenticated using (true) with check (true);
create policy "authenticated full access analysis_runs" on analysis_runs
  for all to authenticated using (true) with check (true);
create policy "authenticated full access analysis_result_lines" on analysis_result_lines
  for all to authenticated using (true) with check (true);
create policy "authenticated full access review_log" on review_log
  for all to authenticated using (true) with check (true);
create policy "authenticated full access legal_rules" on legal_rules
  for all to authenticated using (true) with check (true);
create policy "authenticated full access fee_schedules" on fee_schedules
  for all to authenticated using (true) with check (true);
create policy "authenticated full access fee_schedule_rates" on fee_schedule_rates
  for all to authenticated using (true) with check (true);
create policy "authenticated full access generated_documents" on generated_documents
  for all to authenticated using (true) with check (true);
