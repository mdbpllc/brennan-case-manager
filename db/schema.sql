-- Brennan Case Manager — vertical slice schema (Cases + Parties)
-- Run this in the Supabase SQL editor (Database → SQL) on a fresh project.
-- Mirrors the settled data model: lean case record, party-once-link-many,
-- roles layered on top of party identity, YY-NNNN file numbers with a
-- January counter reset, generated server-side so ISSUANCE is race-free with
-- multiple users. THE REQUIREMENT IS: unique, year-scoped, not client-assigned.
-- Numbers are NOT gapless: holes are normal (deleted matters, burned calls) and
-- must never be read as missing files. (C-6, ruled 2026-08-18 - Grok external
-- review; docs/specs/grok-external-review-2026-08-18.md section 3 item 11.)

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
  -- F-3, ruled 2026-08-18: the year is CENTRAL, never UTC. On Supabase now()
  -- is UTC, so a case opened 2026-12-31 18:05 Central would have been issued a
  -- '27-' number. Same class as the v0.1 date_opened bug.
  v_yy text := to_char((now() at time zone 'America/Chicago'), 'YY');
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
  -- F-3, ruled 2026-08-18: current_date is UTC on Supabase. Central, always.
  date_opened date not null default (now() at time zone 'America/Chicago')::date,
  -- NO statute_of_limitations HERE — RETIRED by CL-2 (D-CL2-2), dropped from the
  -- live database 2026-07-28 by db/migrations/2026-07-28-cl2-client-dimension.sql.
  -- The date lives on case_clients; the case DISPLAYS the earliest across
  -- unresolved clients, derived and non-writable. Do not re-add it: a writable
  -- column meant to mirror derived data stops mirroring it silently. Criminal
  -- matters never used it — per-offense clocks live on `charges`.
  date_closed date,
  court_name text,
  cause_number text,
  notes text,
  -- F-25, ruled 2026-08-18: actor provenance - cheap now, expensive later.
  -- Nullable: pre-existing rows have no actor and are never invented one.
  -- NO per-user RLS rides with this; that stays behind the security gate.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ PARTIES ============
-- Party identity entered ONCE; typed fields live in JSONB driven by the
-- front-end party-type registry (src/domain/partyRegistry.ts). Promote hot
-- fields to real columns later if reporting needs them.
-- CD-1 (2026-08-12): `parties` IS the contact directory (contact-directory.md
-- §1). There is deliberately no second identity table — a second one recreates
-- the wrong-level defect class CL-2 was built to kill.
create table if not exists parties (
  id uuid primary key default gen_random_uuid(),
  -- RETAINED, not dropped, by CD-1: role_tags supersedes it as the thing the
  -- app filters on, but this still drives which fields the registry renders.
  -- role_tags[1] is kept equal to it.
  party_type text not null,               -- registry key: client, adjuster, attorney, ...
  kind text not null check (kind in ('individual','organization')),
  display_name text not null,
  fields jsonb not null default '{}',
  -- CD-1 §3.4 — multi-valued directory role tags.
  role_tags text[] not null default '{}',
  -- CD-1 §3.2 — typed alias set: [{kind:'dba'|'fka'|'suffix-variant', name, note?}].
  -- One trade name may front two distinct corporations; the app FLAGS that
  -- rather than resolving it (§3.2, mined-caption evidence).
  aliases jsonb not null default '[]',
  -- CD-1 §3.1 — a fact of the PERSON, true on every case at once.
  deceased boolean not null default false,
  deceased_date date,
  -- F-25, ruled 2026-08-18: actor provenance - cheap now, expensive later.
  -- Nullable: pre-existing rows have no actor and are never invented one.
  -- NO per-user RLS rides with this; that stays behind the security gate.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists parties_type_idx on parties (party_type);
create index if not exists parties_name_idx on parties (display_name);
create index if not exists parties_fields_idx on parties using gin (fields);
create index if not exists parties_role_tags_idx on parties using gin (role_tags);
create index if not exists parties_aliases_idx on parties using gin (aliases);

-- ============ CASE <-> PARTY LINKS (roles) ============
-- CD-1 §4: the roster link decomposes into four SEPARABLE attributes. The UIM
-- at-fault driver is why all four are needed at once: driver role, no caption
-- alignment, non-party status, unmistakably opposing.
create table if not exists case_parties (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  party_id uuid not null references parties (id) on delete cascade,
  role text not null,                     -- Plaintiff, Defendant, Witness, ...
  side text,                              -- Ours / Opposing / Neutral
  note text,
  -- ── CD-1 §4.2, attributes 1–3. `side` above ALREADY IS attribute 4 (firm
  -- perspective) and is deliberately not renamed or migrated away.
  story_role text,
  -- NULL means NON-PARTY — a value, not an absence. "Not yet decided" is
  -- carried by case_roster_flags below, never by writing a guess here. Sides
  -- are a property of the CASE TYPE, not a constant (REQ-14), so this column
  -- is deliberately unconstrained: the legal set differs per case type and
  -- lives in src/domain/roster.ts SIDE_SETS.
  caption_alignment text,
  party_status text
    check (party_status is null or party_status in
      ('caption-party','non-party-actor','court-appointed','intervenor','unnamed-reserved')),
  -- ── CD-1 §3.1: capacity is a property of the LINK, never the directory.
  capacity_kind text
    check (capacity_kind is null or capacity_kind in
      ('individually','next-friend-of','representative-of-estate-of','dba')),
  -- restrict, not cascade: deleting a contact must not silently erase the fact
  -- that someone appeared on their behalf.
  capacity_points_at_party_id uuid references parties (id) on delete restrict,
  -- ── CD-1 §4.3: entries are HISTORY, not snapshot (FE-8 and IN-4 both need
  -- "who was in this case when this instrument went out").
  joined_by text
    check (joined_by is null or joined_by in
      ('intake-slot','amendment','court-action','substitution')),
  active_state text
    check (active_state is null or active_state in ('active','withdrawn','substituted-out')),
  slot_role text,
  created_at timestamptz not null default now(),
  -- F-4 + F-18, ruled 2026-08-18, landed 2026-08-19 once the Postgres 15+ gate
  -- passed. The OLD key was `unique (case_id, party_id, role)`, which cannot
  -- coexist with CD-1's own capacity model: a mother appearing individually AND
  -- as next friend of her minor child is TWO roster entries over one contact and
  -- one role, and the old key rejected the second insert. NULLS NOT DISTINCT is
  -- required because capacity_kind and the pointer are NULL on ordinary rows, and
  -- under default NULL semantics those rows would stop colliding with each other
  -- entirely - which would silently allow true duplicates.
  constraint case_parties_roster_identity_key
    unique nulls not distinct
      (case_id, party_id, role, capacity_kind, capacity_points_at_party_id),
  -- F-18: a representative capacity has to say who it represents. 'individually'
  -- is deliberately exempt - it points at nobody by definition.
  constraint case_parties_capacity_pointer_check check (
    capacity_kind is null
    or capacity_kind not in ('next-friend-of','representative-of-estate-of','dba')
    or capacity_points_at_party_id is not null
  )
);

create index if not exists case_parties_case_idx on case_parties (case_id);
create index if not exists case_parties_party_idx on case_parties (party_id);
create index if not exists case_parties_capacity_points_idx
  on case_parties (capacity_points_at_party_id);

-- Roster facts the CD-1 backfill could not derive. NEVER guessed, never
-- placeholdered — the `case_client_flags` precedent applied to the roster. A
-- flag is an ADDITION, not an abort: the link still gets what was derivable.
create table if not exists case_roster_flags (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  case_party_id uuid not null references case_parties (id) on delete cascade,
  reason text not null,
  unmapped_value text,                    -- preserved verbatim; nothing is lost
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_party_id)
);

create index if not exists case_roster_flags_case_idx on case_roster_flags (case_id);

-- CD-1 §5 — one directional typed edge structure with OPTIONAL case scope.
-- No case_id = a WORLD FACT (employer-of, spouse). A case_id = true for that
-- case (attorney-of-record-for, insurer of the adverse party here).
--
-- THE CL-1 FIREWALL (§5.3): this links CONTACTS to CONTACTS. It never holds a
-- case-to-case link, and `case_links` (CL-1, unruled, not built) never holds
-- one of these. They never merge and never share a structure.
create table if not exists contact_edges (
  id uuid primary key default gen_random_uuid(),
  from_contact_id uuid not null references parties (id) on delete cascade,
  to_contact_id uuid not null references parties (id) on delete cascade,
  -- Controlled and extensible; adding a type is a SPEC-LEVEL act. Enforced so
  -- free text cannot yield "employer", "Employer", and "works for" as three
  -- relationships. Keep in step with src/domain/contactEdges.ts.
  edge_type text not null check (edge_type in (
    'employer-of','owner-entrustor-of','lessor-of','parent-of','affiliate-of',
    'insurer-of','insurer-of-adverse-party','principal-of','registered-agent-of',
    'heir-of','representative-of-estate-of','next-of-kin-of','spouse-of',
    'contractor-for','manufacturer-of-goods-sold-by','platform-for','attorney-for',
    'bailee-of','joint-enterprise-with'
  )),
  case_id uuid references cases (id) on delete cascade,   -- NULL = world fact
  note text,
  created_at timestamptz not null default now(),
  constraint contact_edges_not_self check (from_contact_id <> to_contact_id),
  unique nulls not distinct (from_contact_id, to_contact_id, edge_type, case_id)
);

create index if not exists contact_edges_from_idx on contact_edges (from_contact_id);
create index if not exists contact_edges_to_idx on contact_edges (to_contact_id);
create index if not exists contact_edges_case_idx on contact_edges (case_id);

-- ============ CLIENT DIMENSION (CL-2) ============
-- The case owns the occurrence and liability; the CLIENT owns the damages.
-- `case_clients` sits PARALLEL to case_parties, not as a promotion of it
-- (D-CL2-8): case_parties stays authoritative for ROLES, case_clients for
-- DAMAGES SCOPE. Design: docs/specs/claimant-dimension-and-case-links-design.md.
create table if not exists case_clients (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  -- restrict, not cascade: deleting a client party must not silently take
  -- their bills, runs, and (later) liens with it.
  party_id uuid not null references parties (id) on delete restrict,
  -- 'mixed' admitted now so a future mixed-posture value needs no constraint
  -- migration (D-CL2-1). Nothing writes it yet.
  posture text not null default 'claimant'
    check (posture in ('claimant', 'defendant', 'mixed')),
  display_order integer not null default 0,
  statute_of_limitations date,
  sol_basis text check (sol_basis in ('standard','minor-tolled','survival-tolled','manual')),
  client_flags text[] not null default '{}',   -- Medicare/Medicaid ONLY (D-CL2-5)
  fee_arrangement jsonb not null default '{}', -- does NOT close D-CL2-3
  profile_fields jsonb not null default '{}',  -- shape DERIVED from practice area
  disbursed_at date,                           -- D-CL2-4a; "resolved" per D-CL2-2a
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, party_id)
);

create index if not exists case_clients_case_idx on case_clients (case_id);
create index if not exists case_clients_party_idx on case_clients (party_id);

-- Cases the CL-2 backfill could not derive a client for. Never guessed, never
-- placeholdered. Holds the limitations date the dropped case column carried, so
-- a flagged case loses nothing; it carries to the client record on resolve.
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

drop trigger if exists case_clients_touch on case_clients;
create trigger case_clients_touch before update on case_clients
  for each row execute function touch_updated_at();

-- ============ FILE-NUMBER FREEZE (F-2, ruled 2026-08-18) ============
-- An issued file number is on letters, pleadings and the client's file. No
-- legitimate workflow relabels one, and UNIQUE only promises "unused right
-- now" - it does not stop a PATCH from renaming 26-0004 to 26-0007. This
-- refuses the change outright rather than logging it after the fact.
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

-- ============ ACTOR PROVENANCE (F-25, ruled 2026-08-18) ============
-- Stamps the authenticated caller on insert. Columns only - NO per-user RLS.
-- Left NULL when there is no JWT (SQL editor, service role, seeds): a NULL
-- actor is honest, an invented one is not.
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

alter table case_clients enable row level security;
alter table case_client_flags enable row level security;
create policy "authenticated full access case_clients" on case_clients
  for all to authenticated using (true) with check (true);
create policy "authenticated full access case_client_flags" on case_client_flags
  for all to authenticated using (true) with check (true);

-- CD-1 (2026-08-12) — RLS from birth for the two new tables, per slice item 6.
-- This is the #28/CL-2 lesson applied PROACTIVELY rather than caught at defect
-- time. Note that RLS alone is not enough: the GRANT block at the end of this
-- file is what makes them reachable at all.
alter table case_roster_flags enable row level security;
alter table contact_edges enable row level security;
create policy "authenticated full access case_roster_flags" on case_roster_flags
  for all to authenticated using (true) with check (true);
create policy "authenticated full access contact_edges" on contact_edges
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
  -- CL-2: a bill belongs to a BODY. Pooling distorts paid-or-incurred and the
  -- Ch. 146 cap input. Nullable because a flagged case has no client yet and
  -- its bills must not be blocked or invented.
  client_id uuid references case_clients (id) on delete set null,
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
  -- F-25, ruled 2026-08-18: actor provenance - cheap now, expensive later.
  -- Nullable: pre-existing rows have no actor and are never invented one.
  -- NO per-user RLS rides with this; that stays behind the security gate.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists medical_bills_case_idx on medical_bills (case_id);
create index if not exists medical_bills_client_idx on medical_bills (client_id);

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
  -- CL-2: follows the bill, carried DENORMALIZED so per-client queries do not
  -- have to join through medical_bills (§3.1).
  client_id uuid references case_clients (id) on delete set null,
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
create index if not exists analysis_runs_client_idx on analysis_runs (client_id);

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
  -- Q-COM-11 ruled (A) 2026-08-16: no default, classify at creation. NULL means
  -- unclassified-must-classify. Writing 'work-product' is an assertion of privilege
  -- (TRCP 192.5(d), registry UNVERIFIED), so no row asserts a stance nobody chose.
  -- The CHECK list is deliberately unchanged: the two vocabularies disagree and
  -- reconciling them is Q-COM-10, unruled.
  privilege_tier text check (privilege_tier in ('attorney-client','work-product','non-privileged')),
  title text not null,
  content text not null,
  disclaimer_version text not null,
  generated_by text not null,
  -- F-25, ruled 2026-08-18: actor provenance - cheap now, expensive later.
  -- Nullable: pre-existing rows have no actor and are never invented one.
  -- NO per-user RLS rides with this; that stays behind the security gate.
  created_by uuid references auth.users (id),
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

-- ============================================================
-- Calendar events — Outlook push Phase 1 (outlook-calendar-sync.md).
-- start_local / end_local are naive local datetimes stored as text
-- ("YYYY-MM-DDTHH:mm", or "YYYY-MM-DD" for all-day) — deliberately
-- timezone-free (v0.1 UTC date-opened bug lesson); the Graph layer
-- attaches the browser timezone at push time.
-- ============================================================

create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  title text not null,
  event_type text not null default 'other'
    check (event_type in ('hearing','deadline','appointment','reminder','other')),
  start_local text not null,
  end_local text,
  all_day boolean not null default false,
  location text,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled','cancelled')),
  outlook_event_id text,
  sync_status text not null default 'pending' check (sync_status in ('pending','synced','error')),
  sync_error text,
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists calendar_events_case_idx on calendar_events (case_id);
create index if not exists calendar_events_sync_idx on calendar_events (sync_status) where sync_status <> 'synced';

alter table calendar_events enable row level security;
create policy "authenticated full access calendar_events" on calendar_events
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Transcript sort & route — feature-intake item A
-- (docs/specs/transcript-sort-and-route-design.md §7, extending the
-- Transcript object in transcript-workflows.md §2).
-- recorded_at is a naive local datetime stored as text, same posture as
-- calendar_events (timezone-free by design). verified is attorney-only:
-- nothing programmatic ever sets it (registry rule 2 discipline).
-- ============================================================

create table if not exists transcripts (
  id uuid primary key default gen_random_uuid(),
  case_ids uuid[] not null default '{}',  -- one or more matters; empty while in staging
  audio_ref text,
  audio_hash text,                        -- SHA-256; identity is hash+timestamp+duration
  duration_seconds numeric,
  recorded_at text,
  source text not null default 'manual' check (source in ('recorder','phone','manual')),
  engine text not null,
  text text not null,
  words jsonb,                            -- word+timestamp array from the pipeline
  status text not null default 'unprocessed'
    check (status in ('unprocessed','auto-summarized','attorney-reviewed')),
  verified boolean not null default false,
  context_type text not null check (context_type in (
    'client_meeting','client_call','intake_call','adjuster_call',
    'opposing_counsel_call','witness_interview','deposition','hearing',
    'mediation_dictation','voicemail','dictation')),
  consent_status text not null default 'unknown'
    check (consent_status in ('announced','written','one-party','unknown')),
  out_of_state_participant text not null default 'unknown'
    check (out_of_state_participant in ('yes','no','unknown')),
  -- Q-COM-11 ruled (A) 2026-08-16: no default, classify at creation. NULL means
  -- unclassified-must-classify. §1 item 3 of transcript-workflows.md flags
  -- witness-interview transcripts presumptively discoverable, and defaulting them
  -- to 'work-product' contradicted that (TRCP 192.5(c)(1), registry UNVERIFIED);
  -- that flag now drives a SUGGESTED value at the creation-time decision point,
  -- which is a recorded follow-on act and is NOT built. CHECK list unchanged: Q-COM-10.
  privilege_tier text
    check (privilege_tier in ('privileged','work-product','non-privileged')),
  phi_flag boolean not null default false,
  discoverable_flag boolean not null default false,
  -- Not-case-related recordings are kept in the Office notes store (O3).
  office_note boolean not null default false,
  summary text,
  -- F-25, ruled 2026-08-18: actor provenance - cheap now, expensive later.
  -- Nullable: pre-existing rows have no actor and are never invented one.
  -- NO per-user RLS rides with this; that stays behind the security gate.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transcripts_case_ids_idx on transcripts using gin (case_ids);
-- Full-text search over transcript text (design §6; scoping happens in queries).
create index if not exists transcripts_text_fts_idx on transcripts
  using gin (to_tsvector('english', text));

create table if not exists transcript_participants (
  id uuid primary key default gen_random_uuid(),
  transcript_id uuid not null references transcripts (id) on delete cascade,
  speaker_label text not null,
  party_id uuid references parties (id) on delete set null,
  display_name text,                      -- non-party speakers ("Michael")
  mapping_confidence numeric
);

create index if not exists transcript_participants_tr_idx on transcript_participants (transcript_id);
create index if not exists transcript_participants_party_idx on transcript_participants (party_id);

create table if not exists staging_items (
  id uuid primary key default gen_random_uuid(),
  audio_hash text not null,
  audio_ref text,
  source text not null default 'manual' check (source in ('recorder','phone','manual')),
  duration_seconds numeric,
  recorded_at text,
  transcript_id uuid not null references transcripts (id) on delete cascade,
  suggestions jsonb not null default '[]', -- ranked case+type+confidence+signals
  advisories text[] not null default '{}',
  status text not null default 'pending'
    check (status in ('pending','confirmed','dismissed','held')),
  created_at timestamptz not null default now()
);

create index if not exists staging_items_status_idx on staging_items (status) where status = 'pending';

-- The tuning log: suggested vs. chosen on every routing decision (design §5).
-- This is the evidence base for ever enabling auto-file (D1).
create table if not exists routing_decisions (
  id uuid primary key default gen_random_uuid(),
  staging_item_id uuid not null references staging_items (id) on delete cascade,
  suggested_case_id uuid,
  suggested_context_type text,
  suggested_confidence text,
  chosen_case_ids uuid[] not null default '{}',
  chosen_context_type text,
  action text not null
    check (action in ('confirmed','reassigned','split','not-case-related','held')),
  was_suggestion_accepted boolean not null,
  decided_at timestamptz not null default now()
);

create index if not exists routing_decisions_item_idx on routing_decisions (staging_item_id);

-- Firm/case glossary terms feed the vocabulary boost lists (design D3).
create table if not exists glossary_terms (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  scope text not null default 'firm' check (scope in ('firm','case')),
  case_id uuid references cases (id) on delete cascade,
  weight numeric not null default 1
);

-- Spoken-tag templates are rows, not code (design §3).
create table if not exists tag_templates (
  id uuid primary key default gen_random_uuid(),
  pattern text not null,
  context_type text not null,
  applies_discoverable boolean not null default false
);

-- RLS: same single-user authenticated-only posture as the rest of the schema.
-- The staging inbox is attorney-only (spec 8.5); per-role policies arrive
-- with the multi-user phase.
alter table transcripts enable row level security;
alter table transcript_participants enable row level security;
alter table staging_items enable row level security;
alter table routing_decisions enable row level security;
alter table glossary_terms enable row level security;
alter table tag_templates enable row level security;

create policy "authenticated full access transcripts" on transcripts
  for all to authenticated using (true) with check (true);
create policy "authenticated full access transcript_participants" on transcript_participants
  for all to authenticated using (true) with check (true);
create policy "authenticated full access staging_items" on staging_items
  for all to authenticated using (true) with check (true);
create policy "authenticated full access routing_decisions" on routing_decisions
  for all to authenticated using (true) with check (true);
create policy "authenticated full access glossary_terms" on glossary_terms
  for all to authenticated using (true) with check (true);
create policy "authenticated full access tag_templates" on tag_templates
  for all to authenticated using (true) with check (true);

-- ============ OAA CRIMINAL INTAKE ============
-- criminal-appointment-intake-and-docket-enhancements.md §1.
-- Criminal/OAA fields on cases (idempotent adds so an existing database
-- upgrades in place; new databases get them from these statements too).
alter table cases add column if not exists county text;
alter table cases add column if not exists in_custody boolean;
alter table cases add column if not exists custody_location text;
alter table cases add column if not exists appointment_date date;

-- One charged offense per row — the Tier 1 form's offense table repeats
-- (multi-cause support), so charges are child records of the case.
create table if not exists charges (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  offense text not null,
  degree text,                 -- as printed (FS/F3/MA…) — no legal outcome computed from it
  offense_date date,
  court text,
  cause_number text,
  complaint_number text,
  mtr_mta boolean not null default false,  -- checked → revocation-adjudication track
  appeal boolean not null default false,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists charges_case_idx on charges (case_id);
create index if not exists charges_cause_idx on charges (cause_number);

-- Audit record of an OAA intake: which template ran, on what text, what it
-- extracted (fields_json carries value/confidence/provenance per field).
create table if not exists oaa_intakes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  template_key text not null,
  tier int not null check (tier in (1, 2)),
  county text,
  source_file_name text,
  extracted_text text not null,
  fields_json text not null,
  created_at timestamptz not null default now()
);

create index if not exists oaa_intakes_case_idx on oaa_intakes (case_id);

alter table charges enable row level security;
alter table oaa_intakes enable row level security;

create policy "authenticated full access charges" on charges
  for all to authenticated using (true) with check (true);
create policy "authenticated full access oaa_intakes" on oaa_intakes
  for all to authenticated using (true) with check (true);

-- ---- Statute cache (T2, statute-text-and-bill-tracking-design.md §6) ----
-- Current-codification chapter text from statutes.capitol.texas.gov (public
-- domain). Cache-on-demand; refreshed by the biennial refresh job. Sections
-- carry content hashes feeding the A4 re-verification tripwire.

create table if not exists statute_chapters (
  id uuid primary key default gen_random_uuid(),
  code text not null,          -- two-letter site code: CP, PR, HS, ...
  chapter text not null,       -- as in the file name: '41', '55A'
  title text,
  source_url text not null,
  html text not null,          -- raw file as served, so parses can re-run
  fetched_at timestamptz not null,
  unique (code, chapter)
);

create table if not exists statute_sections (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references statute_chapters (id) on delete cascade,
  code text not null,
  chapter text not null,
  section_number text not null,  -- '41.0105', '55A.053'
  heading text,
  text text not null,
  content_hash text not null     -- tripwire change signal
);

create index if not exists statute_sections_chapter_idx on statute_sections (chapter_id);
create index if not exists statute_sections_lookup_idx on statute_sections (code, section_number);

-- A4: pins the section text a verification actually saw. Advisory layer —
-- verified status itself stays attorney-only on legal_rules.
create table if not exists registry_verification_snapshots (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references legal_rules (id) on delete cascade,
  section_ref text not null,     -- 'CP 41.0105' or 'PR ch. 55'
  content_hash text not null,
  verified_at timestamptz not null
);

create index if not exists reg_ver_snapshots_rule_idx on registry_verification_snapshots (rule_id);

-- Advisory watch flags on registry entries. Never touch verified status.
create table if not exists watch_flags (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references legal_rules (id) on delete cascade,
  kind text not null check (kind in ('text-changed-since-verified', 'section-removed', 'pending-bill', 'enacted-change-pending')),
  source_ref text not null,      -- sectionRef (A4) or bill ref (T3)
  detail text,
  effective_date date,           -- enacted-change-pending: worklist join date (B3)
  raised_at timestamptz not null default now(),
  cleared_at timestamptz,
  cleared_by text
);

-- Idempotent upgrade for databases created from the pre-T3 schema.
alter table watch_flags add column if not exists effective_date date;

-- Idempotent upgrade: admit the A4 'section-removed' kind (2026-07-25).
alter table watch_flags drop constraint if exists watch_flags_kind_check;
alter table watch_flags add constraint watch_flags_kind_check
  check (kind in ('text-changed-since-verified', 'section-removed', 'pending-bill', 'enacted-change-pending'));

create index if not exists watch_flags_rule_idx on watch_flags (rule_id);
create index if not exists watch_flags_active_idx on watch_flags (rule_id) where cleared_at is null;

alter table statute_chapters enable row level security;
alter table statute_sections enable row level security;
alter table registry_verification_snapshots enable row level security;
alter table watch_flags enable row level security;

create policy "authenticated full access statute_chapters" on statute_chapters
  for all to authenticated using (true) with check (true);
create policy "authenticated full access statute_sections" on statute_sections
  for all to authenticated using (true) with check (true);
create policy "authenticated full access registry_verification_snapshots" on registry_verification_snapshots
  for all to authenticated using (true) with check (true);
create policy "authenticated full access watch_flags" on watch_flags
  for all to authenticated using (true) with check (true);

-- ---- Bill tracking (T3, statute-text-and-bill-tracking-design.md §6) ----
-- Source: LegiScan API only (CC BY 4.0, attribution in tracking views;
-- never crawl legiscan.com). All rows are advisory inputs to watch flags.

create table if not exists watch_targets (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('registry-derived', 'manual')),
  cite_or_query text not null,   -- cite for derived; quoted search phrase for manual
  note text,
  active boolean not null default true
);

create table if not exists tracked_bills (
  id uuid primary key default gen_random_uuid(),
  legiscan_bill_id bigint not null unique,
  session_id bigint not null,
  session_name text,
  bill_number text not null,     -- 'HB 9901'
  title text not null,
  status text not null check (status in ('introduced', 'engrossed', 'enrolled', 'passed', 'vetoed', 'dead')),
  status_date date,
  effective_date date,           -- drives when B3 flags join the worklist
  change_hash text not null,     -- LegiScan change_hash: cheap poll diffing
  last_polled timestamptz not null,
  url text,
  raw_json text not null         -- full payload kept so the matcher can re-run
);

create index if not exists tracked_bills_status_idx on tracked_bills (status);

create table if not exists bill_statute_refs (
  id uuid primary key default gen_random_uuid(),
  tracked_bill_id uuid not null references tracked_bills (id) on delete cascade,
  code text not null,
  chapter text not null,
  section text,                  -- null = chapter-level reference
  match_confidence text not null check (match_confidence in ('exact', 'chapter')),
  matched_text_excerpt text not null
);

create index if not exists bill_statute_refs_bill_idx on bill_statute_refs (tracked_bill_id);
create index if not exists bill_statute_refs_lookup_idx on bill_statute_refs (code, chapter);

alter table watch_targets enable row level security;
alter table tracked_bills enable row level security;
alter table bill_statute_refs enable row level security;

create policy "authenticated full access watch_targets" on watch_targets
  for all to authenticated using (true) with check (true);
create policy "authenticated full access tracked_bills" on tracked_bills
  for all to authenticated using (true) with check (true);
create policy "authenticated full access bill_statute_refs" on bill_statute_refs
  for all to authenticated using (true) with check (true);

-- ============ API ROLE PRIVILEGES ============
-- ADDED 2026-07-28, auth slice §5A, after the first live run of this file found
-- every request refused 401 / 42501 "permission denied for table": every table
-- in the schema had RLS on and a policy defined, and not one of them was ever
-- evaluated. (Counts deliberately not stated here - they go stale, which is
-- exactly what F-27 caught. Ruled 2026-08-18.)
--
-- RLS decides WHICH ROWS a role may touch. It does NOT grant access to the table
-- itself; that is a separate SQL privilege layer and PostgREST hits it FIRST.
-- Everything below was missing, so requests never reached the policies.
--
-- Most Supabase projects mask this because new public tables are exposed
-- automatically. THIS project was deliberately created with "auto-expose new
-- tables" OFF (Go_Live_Gates.md, Supabase account facts), so nothing granted
-- these for us. That posture is correct and is being kept — the grants are
-- simply made explicit here.
--
-- `authenticated` ONLY. `anon` is deliberately granted NOTHING: EVERY policy in
-- this file is `to authenticated`, so a signed-out caller is refused at the privilege
-- layer and never reaches RLS at all.
--
-- *** READ THIS BEFORE ADDING A TABLE ***  With auto-expose off, a new table is
-- unreachable until it is granted. The statement below is written as ALL TABLES
-- so a fresh run of this file is complete, but it is point-in-time, not a
-- standing rule — ALTER DEFAULT PRIVILEGES is deliberately NOT set, because
-- silently exposing future tables is the posture this project rejected. Any
-- migration adding a table must add its own grant.
--
-- WORKED EXAMPLE, 2026-07-28: the CL-2 slice added `case_clients` and
-- `case_client_flags` and shipped their grants in the SAME migration
-- (db/migrations/2026-07-28-cl2-client-dimension.sql, step 5). The
-- `all tables` statement below covers them on a fresh run of this file; the
-- migration covers them on an existing database. Both paths are required —
-- neither one alone is enough. Do the same for every table you add.

grant usage on schema public to authenticated;

grant select, insert, update, delete
  on all tables in schema public to authenticated;

-- file_counters is the one exception, and it is intentional: RLS on, no policy,
-- no API access. File numbers are issued ONLY through next_file_number(), which
-- is SECURITY DEFINER and so bumps the counter without the caller needing any
-- privilege of their own. Granting here would defeat that design.
revoke all on file_counters from authenticated;

-- F-1, ruled 2026-08-18 (narrow fix; the full trigger redesign is O-6, deferred).
-- Postgres grants EXECUTE on new functions to PUBLIC, and CREATE OR REPLACE keeps
-- that ACL - so this SECURITY DEFINER writer was callable by `anon` over PostgREST
-- RPC, burning file numbers without inserting a case. REVOKE runs BEFORE the grant.
revoke execute on function next_file_number() from public;
grant execute on function next_file_number() to authenticated;
