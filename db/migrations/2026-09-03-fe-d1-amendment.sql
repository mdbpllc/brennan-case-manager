-- Migration — 2026-09-03, FE-D1 AMENDMENT SLICE (the disclosures generator as ruled)
--
-- Authorization: docs/specs/fe-d1-amendment-slice.md, RULED by Michael
-- 2026-09-02 23:44 CDT ("YES — as written"), session log #146. Design
-- authority: docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md
-- §§11-18 and the slice's §2 (the eighteen rulings of the 2026-08-31 late
-- sitting). On any conflict, the later ruling wins and the disagreement is named.
--
-- RUN BY MICHAEL'S HAND, per the CL-2 / CD-1 / gate-10 / FE-D1 precedent:
--   1. BACK UP FIRST.
--   2. RUN `2026-08-20-fe-d1-form-engine.sql` FIRST, UNCHANGED (HD-18). This
--      file REFUSES to run before it — see the gate below.
--   3. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   4. Answer the verification checks at the bottom IN WORDS before moving on.
-- This file is also folded into db/schema.sql so a fresh project is correct.
-- Every statement after the gate is guarded and safe to re-run.
--
-- ============ STEP 0 — BEFORE YOU RUN ANYTHING ============
-- Run these THREE counts and WRITE THEM DOWN BY HAND. Check 7 at the foot
-- compares against them, and a count recorded only at the foot of a file you
-- pasted whole is a count taken after the fact:
--
--      select count(*) from medical_bills;
--      select count(*) from code_mappings;
--      select count(*) from provider_billing_profiles;
--
--   medical_bills ............ __________
--   code_mappings ............ __________
--   provider_billing_profiles  __________
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It runs NO part of MIG-1 and amends nothing in it (HD-18; AS-Q11 ruled
--     ONE file, gated). If the gate below raises, run that file — do not edit
--     either one.
--   * It writes NO SEED ROWS. The template bank is seeded in TypeScript
--     (src/forms/seed.ts) and reaches only the localStorage store today; there
--     is no SQL seed path in this repo and this file does not mint the first
--     one, which would give the fixed sentences a second, forkable source of
--     truth. Recorded in docs/spec-feedback.md.
--   * It writes no `privilege_tier` value anywhere (Q-COM-11 (A) — NULL means
--     unclassified-must-classify).
--   * It builds NO document or chronology FILE STORAGE. Chronology BYTES ARE
--     NOT STORED AT ALL (AS-Q4) — only extracted text. Storage is gate-7.
--   * It touches no registry table and changes no legal rule's status. It
--     computes, displays and proposes NO TRCP 195.2 date (R11 gated).
--   * It does not alter `case_clients`, `case_parties`, `case_roster_flags` or
--     `party_pii`, and it reads no PII column.
--   * It adds NO `verified` column to `contact_edges` (CD-14 limb (i) is OPEN).

-- ============ THE GATE — FIRST STATEMENT, BY RULING (AS-Q11, D-37) ============
-- This file's `form_templates` CHECK widening below presupposes that table.
-- It never no-ops past this condition: an amendment that silently skipped its
-- own precondition is how a half-migrated schema is discovered late.
do $$
begin
  if to_regclass('public.form_templates') is null then
    raise exception
      'FE-D1 migration `2026-08-20-fe-d1-form-engine.sql` has not run. Run it first, unchanged (HD-18), then re-run this file.';
  end if;
end $$;

-- ============ NEW TABLES — IN FK ORDER ============
-- The order matters beyond FKs: the RLS probe asserts its table list is
-- sequence-identical to db/schema.sql's create-table order, so these five are
-- appended to that file in exactly this order and nowhere else.

-- The versioned TEXT chronology (AS-Q4, RC-7). The dropped FILE IS NOT KEPT:
-- Michael ruled extracted text per version, bytes not retained, a file store at
-- gate 7. `readable = false` is flagged at the drop and NEVER sent to a model.
create table if not exists case_chronology_versions (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  -- Per CLIENT (AS-Q10). Nullable exactly as medical_bills.client_id is, and
  -- with the same meaning: on a one-client case NULL reads as that client.
  client_id uuid references case_clients (id) on delete set null,
  version_no integer not null,
  dropped_at timestamptz not null default now(),
  dropped_by uuid references auth.users (id),
  source_filename text not null,
  -- A CLOSED list, and named as a DEFAULT rather than a ruling (D-43): RC-7's
  -- "anything the model can read" is open-ended, so the readable set is the
  -- build's and every other extension is refused at the drop.
  source_format text not null check (source_format in ('pdf','docx','xlsx','csv','json','txt')),
  extracted_text text,
  -- D-62's threshold. False = no usable text layer: flagged at the drop, never
  -- sent, excluded from "newest".
  readable boolean not null,
  char_count integer,
  -- D-60: a mis-dropped chronology is PHI in the wrong matter, so there is a
  -- way out. A removed version is never sent again and never counts as newest.
  removed_at timestamptz,
  created_at timestamptz not null default now(),
  unique nulls not distinct (case_id, client_id, version_no)
);

create index if not exists case_chronology_versions_case_idx
  on case_chronology_versions (case_id);
create index if not exists case_chronology_versions_client_idx
  on case_chronology_versions (client_id);

-- R17 — the FACILITY row, CASE-SCOPED (AS-Q3). The facility is the existing
-- directory contact; its TYPE is set for THIS case. The individuals are rows
-- beneath it. A name becomes a firm-wide contact only when Michael promotes it.
create table if not exists case_providers (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  client_id uuid references case_clients (id) on delete set null,
  -- restrict, not cascade (D-53): a party a designated facility points at is
  -- not deletable — the case_clients.party_id precedent. Must be
  -- kind = 'organization'; enforced in the adapter (D-53).
  facility_party_id uuid not null references parties (id) on delete restrict,
  -- NULLABLE, AND NULL IS THE MUST-FIX CONDITION (§12.3). Never defaulted:
  -- §17.1a says the type is "always assigned by a person", and D-32's last-case
  -- query is the ONLY pre-fill. Never derived from a specialty string or a
  -- role tag. `mid-level` is excluded — a mid-level is a person, not a facility.
  provider_type text check (provider_type in (
    'emergency-medicine','pain-management','orthopedic-surgery','neurosurgery',
    'primary-care','chiropractic','physical-therapy','prehospital-ems',
    'radiologist','pharmacy','custodian-only',
    'mental-health','other-physician','other-non-physician'
  )),
  -- HAND-SET values are never overwritten by the D-13 derivation chain.
  treatment_from date,
  treatment_to date,
  -- D-15: the §5.2 LOP gate moves here from an untyped party.fields string.
  lop boolean not null default false,
  -- D-48: "extraction has run for this facility" is exactly
  -- `last_extraction_version_id is not null`. Without it, a facility with zero
  -- individuals cannot be told apart from one never pulled — which three panel
  -- lines and the custodian-only fallback all key on.
  last_extraction_version_id uuid references case_chronology_versions (id) on delete set null,
  last_extracted_at timestamptz,
  -- D-32: the pre-fill WRITES the type, and the row says where it came from.
  type_carried_from_case_id uuid references cases (id) on delete set null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (case_id, client_id, facility_party_id)
);

create index if not exists case_providers_case_idx on case_providers (case_id);
create index if not exists case_providers_client_idx on case_providers (client_id);
create index if not exists case_providers_facility_idx on case_providers (facility_party_id);

-- The individuals beneath a facility (AS-Q2, AS-Q3). The model populates names,
-- credentials, dates, visit rows and a summary — never a type, a role marker or
-- which facilities are in the case.
create table if not exists case_provider_individuals (
  id uuid primary key default gen_random_uuid(),
  case_provider_id uuid not null references case_providers (id) on delete cascade,
  display_name text not null,
  -- Part 3: credential is NULLABLE. D-42 handles the LEAD's comma when it is.
  credential_suffix text,
  -- NULL reads as the facility's type (§17.1a). `pharmacy` and `custodian-only`
  -- are excluded — neither describes a person's role.
  role_marker text check (role_marker in (
    'emergency-medicine','pain-management','orthopedic-surgery','neurosurgery',
    'primary-care','chiropractic','physical-therapy','prehospital-ems',
    'radiologist','mid-level','mental-health','other-physician','other-non-physician'
  )),
  -- D-11: they/their when NULL. Pronouns are DATA, never guessed (defect D-7).
  pronoun text,
  treatment_from date,
  treatment_to date,
  summary text,
  -- AS-Q13a: provenance on every extracted individual FROM BIRTH, so the
  -- "affiliation unverified" line can be lit later without a backfill.
  provenance text not null check (provenance in ('model','hand')),
  chronology_version_id uuid references case_chronology_versions (id) on delete set null,
  -- Set at PROMOTION and never by the model (D-56). Once set, the block and the
  -- LEAD read `parties` through it and the case row's name/credential are
  -- extraction provenance only.
  party_id uuid references parties (id) on delete set null,
  -- D-12: kept and flagged, never deleted, when a newer chronology omits them.
  missing_from_latest boolean not null default false,
  -- D-55: Michael's delete is a SOFT delete. No later pull resurrects it.
  removed_by_hand_at timestamptz,
  -- D-51: per-field provenance. A field named here is never overwritten by
  -- re-extraction.
  hand_edited_fields text[] not null default '{}',
  sort_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_provider_individuals_provider_idx
  on case_provider_individuals (case_provider_id);
create index if not exists case_provider_individuals_party_idx
  on case_provider_individuals (party_id);

-- Per-visit rows, ONLY from a chronology (§17.7). `provenance` is always
-- 'model' because no hand path exists, by ruling — the CHECK says so rather
-- than leaving a column that looks like it takes two values.
create table if not exists case_provider_visits (
  id uuid primary key default gen_random_uuid(),
  individual_id uuid not null references case_provider_individuals (id) on delete cascade,
  visit_date date,
  description text,
  provenance text not null default 'model' check (provenance = 'model'),
  chronology_version_id uuid references case_chronology_versions (id) on delete set null,
  sort_order integer,
  created_at timestamptz not null default now()
);

create index if not exists case_provider_visits_individual_idx
  on case_provider_visits (individual_id);

-- The per-designation PARAGRAPH RECORD (AS-Q13a, AS-Q6). One row per
-- PARAGRAPH: a radiologist split writes two, each rider its own, a
-- mental-health facility writes none (a block is not a paragraph).
-- FE-21's 194.2(b) subsection objects stay OUT — only this record is IN.
create table if not exists generated_document_paragraphs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references generated_documents (id) on delete cascade,
  -- set null, not cascade (D-53): a SERVED record outlives its facility row,
  -- which is why the rendered name is kept beside it.
  case_provider_id uuid references case_providers (id) on delete set null,
  facility_name_as_rendered text,
  client_id uuid references case_clients (id) on delete set null,
  -- The ordered individuals this paragraph covered — what AS-Q14 will need if
  -- Michael rules that a new individual at a designated facility gets its own
  -- block, and what makes that buildable later without a backfill.
  individual_ids jsonb not null default '[]',
  shape text not null check (shape in (
    'treating-single','treating-group','treating-mixed','radiology-split',
    'imaging-facility','midlevel-rider','pharmacy','custodian-only',
    'other-non-physician','retained'
  )),
  lead_text text,
  -- The writer's named plain-text parts, OPAQUE. Nothing inspects, byte-matches,
  -- lints or parses them — §11.6 "Option 1", and the slice's §12 twice.
  parts jsonb,
  assembled_text text,
  fixed_sentence_version_ids jsonb not null default '[]',
  writer_instructions_version_id uuid references form_template_versions (id) on delete set null,
  chronology_version_id uuid references case_chronology_versions (id) on delete set null,
  -- The AUTOMATIC limb only (AS-Q13a). No charge weighting — Q5 stays HELD.
  gap_flag boolean not null default false,
  sort_order integer,
  created_at timestamptz not null default now()
);

create index if not exists generated_document_paragraphs_document_idx
  on generated_document_paragraphs (document_id);
create index if not exists generated_document_paragraphs_provider_idx
  on generated_document_paragraphs (case_provider_id);

-- ============ TRIGGERS ============

drop trigger if exists case_providers_touch on case_providers;
create trigger case_providers_touch before update on case_providers
  for each row execute function touch_updated_at();

drop trigger if exists case_providers_set_created_by on case_providers;
create trigger case_providers_set_created_by before insert on case_providers
  for each row execute function set_created_by();

drop trigger if exists case_provider_individuals_touch on case_provider_individuals;
create trigger case_provider_individuals_touch before update on case_provider_individuals
  for each row execute function touch_updated_at();

-- ============ RLS + GRANTS — SAME MIGRATION AS THE TABLES ============
-- FE-D1 slice item 11, binding, and restated by the amendment slice §5. The
-- #28 / CL-2 / CD-1 lesson: a table that arrives without its policy and its
-- grant is either unreachable or unguarded, and which one it is gets
-- discovered late. These five carry BOTH from birth, in this commit.

alter table case_chronology_versions enable row level security;
alter table case_providers enable row level security;
alter table case_provider_individuals enable row level security;
alter table case_provider_visits enable row level security;
alter table generated_document_paragraphs enable row level security;

drop policy if exists "authenticated full access case_chronology_versions" on case_chronology_versions;
create policy "authenticated full access case_chronology_versions" on case_chronology_versions
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access case_providers" on case_providers;
create policy "authenticated full access case_providers" on case_providers
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access case_provider_individuals" on case_provider_individuals;
create policy "authenticated full access case_provider_individuals" on case_provider_individuals
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access case_provider_visits" on case_provider_visits;
create policy "authenticated full access case_provider_visits" on case_provider_visits
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access generated_document_paragraphs" on generated_document_paragraphs;
create policy "authenticated full access generated_document_paragraphs" on generated_document_paragraphs
  for all to authenticated using (true) with check (true);

-- BE HONEST ABOUT WHAT THOSE POLICIES DO: nothing the other policies in this
-- schema do not. They are permissive — `using (true) with check (true)` — and
-- byte-identical to the other 41. They gate on AUTHENTICATION, not on identity.
-- These five tables carry PHI (a chronology's extracted text above all), and a
-- permissive policy is NOT the access control that fact eventually needs. The
-- professional security review before multi-user use is where that is decided.
grant select, insert, update, delete on case_chronology_versions to authenticated;
grant select, insert, update, delete on case_providers to authenticated;
grant select, insert, update, delete on case_provider_individuals to authenticated;
grant select, insert, update, delete on case_provider_visits to authenticated;
grant select, insert, update, delete on generated_document_paragraphs to authenticated;

-- ============ generated_documents — ONE new column (D-39) ============
-- The per-plaintiff instrument (AS-Q10) and the per-client supplement base
-- (AS-Q6) need the document keyed by client. The answer snapshot is
-- unqueryable and an all-mental-health instrument has no child row to infer
-- from, so the column is the only honest route.
alter table generated_documents
  add column if not exists client_id uuid references case_clients (id) on delete set null;

create index if not exists generated_documents_client_idx on generated_documents (client_id);

-- ============ THE RENAME (AS-Q11, B5) ============
-- PROVIDER means the PERSON now (FE-18); the business is the FACILITY. Three
-- columns and one table take the new word.
--
-- `alter ... rename` PRESERVES DATA — no row is copied, nothing is recreated.
-- Check 7 proves the row counts did not move.
--
-- AND EVERY AUTO-GENERATED CONSTRAINT AND INDEX NAME GOES WITH THEM: renaming a
-- column leaves `*_provider_party_id_fkey` and friends behind, so the schema
-- would still say "provider" in a dozen places that no longer mean it. Each is
-- renamed explicitly and check 6 proves none survived.
--
-- §9 TOKEN NAMES ARE UNCHANGED. They already mean the person; only their
-- bindings move. Renaming one would edit approved text.

do $$
begin
  -- medical_bills.provider_party_id -> facility_party_id
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'medical_bills'
                and column_name = 'provider_party_id') then
    alter table medical_bills rename column provider_party_id to facility_party_id;
  end if;

  -- code_mappings.provider_party_id -> facility_party_id
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'code_mappings'
                and column_name = 'provider_party_id') then
    alter table code_mappings rename column provider_party_id to facility_party_id;
  end if;

  -- provider_billing_profiles -> facility_billing_profiles, then its column.
  if to_regclass('public.provider_billing_profiles') is not null then
    alter table provider_billing_profiles rename to facility_billing_profiles;
  end if;
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'facility_billing_profiles'
                and column_name = 'provider_party_id') then
    alter table facility_billing_profiles rename column provider_party_id to facility_party_id;
  end if;
end $$;

-- The index on code_mappings, renamed with its column.
do $$
begin
  if exists (select 1 from pg_indexes
              where schemaname = 'public' and indexname = 'code_mappings_provider_idx') then
    alter index code_mappings_provider_idx rename to code_mappings_facility_idx;
  end if;
end $$;

-- Every constraint whose auto-generated NAME still carries "provider", renamed
-- by CATALOG LOOKUP rather than by a guessed literal: these names were minted
-- by Postgres and a guess that misses fails silently, leaving the old word in
-- the schema while every visible thing looks renamed.
do $$
declare
  r record;
  new_name text;
begin
  for r in
    select c.conname, c.conrelid::regclass::text as tbl
      from pg_constraint c
      join pg_class t on t.oid = c.conrelid
      join pg_namespace n on n.oid = t.relnamespace
     where n.nspname = 'public'
       and c.conname like '%provider%'
       and t.relname in ('medical_bills','code_mappings','facility_billing_profiles')
  loop
    new_name := replace(r.conname, 'provider', 'facility');
    execute format('alter table %s rename constraint %I to %I', r.tbl, r.conname, new_name);
  end loop;
end $$;

-- The unique constraint on facility_billing_profiles is backed by an index of
-- the same name, which the rename above carries. Any REMAINING provider-named
-- index on the three tables is renamed here.
do $$
declare
  r record;
begin
  for r in
    select indexname from pg_indexes
     where schemaname = 'public'
       and indexname like '%provider%'
       and tablename in ('medical_bills','code_mappings','facility_billing_profiles')
  loop
    execute format('alter index %I rename to %I', r.indexname, replace(r.indexname, 'provider', 'facility'));
  end loop;
end $$;

-- The POLICY travels with its table but keeps its old name. `pg_constraint` and
-- `pg_indexes` cannot see a policy, which is why check 6 asks about it
-- separately.
do $$
begin
  if exists (select 1 from pg_policies
              where schemaname = 'public' and tablename = 'facility_billing_profiles'
                and policyname = 'authenticated full access provider_billing_profiles') then
    alter policy "authenticated full access provider_billing_profiles"
      on facility_billing_profiles rename to "authenticated full access facility_billing_profiles";
  end if;
end $$;

-- ============ contact_edges — `renders-care-at` AND ITS PERIOD (CD-14) ============
-- The edge is created ONLY at promotion or by hand, as a WORLD FACT whose dates
-- are whatever Michael confirms (D-56). THE MODEL NEVER CREATES ONE.
-- No `verified` column is added — CD-14 limb (i) is OPEN (AS-Q13a).

alter table contact_edges add column if not exists effective_from date;
alter table contact_edges add column if not exists effective_to date;   -- blank = current

-- The CHECK is dropped by its auto-generated name and re-added with the new
-- value. Keep in step with src/domain/contactEdges.ts.
alter table contact_edges drop constraint if exists contact_edges_edge_type_check;
alter table contact_edges add constraint contact_edges_edge_type_check check (edge_type in (
  'employer-of','owner-entrustor-of','lessor-of','parent-of','affiliate-of',
  'insurer-of','insurer-of-adverse-party','principal-of','registered-agent-of',
  'heir-of','representative-of-estate-of','next-of-kin-of','spouse-of',
  'contractor-for','manufacturer-of-goods-sold-by','platform-for','attorney-for',
  'bailee-of','joint-enterprise-with','renders-care-at'
));

-- The EXISTING unique key is INLINE and therefore UNNAMED in db/schema.sql, so
-- it is dropped BY CATALOG LOOKUP and never by a guessed name (D-7). The new
-- key is NAMED, so the next migration does not have to do this again.
-- A doctor who left a practice and returned needs two periods, which is why
-- effective_from joins the key.
do $$
declare
  r record;
begin
  for r in
    select conname from pg_constraint
     where conrelid = 'public.contact_edges'::regclass
       and contype = 'u'
       and conname <> 'contact_edges_edge_period_key'
  loop
    execute format('alter table contact_edges drop constraint %I', r.conname);
  end loop;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint
                  where conrelid = 'public.contact_edges'::regclass
                    and conname = 'contact_edges_edge_period_key') then
    alter table contact_edges add constraint contact_edges_edge_period_key
      unique nulls not distinct (from_contact_id, to_contact_id, edge_type, case_id, effective_from);
  end if;
end $$;

-- ============ form_templates — TWO NEW FAMILIES (D-6) ============
-- This is the statement that depends on MIG-1 and the reason this file is
-- gated. `fixed-sentence` holds the BASIS and CAUSATION sentences the app
-- places; `writer-instructions` holds the writer's prose instructions, which
-- AS-Q12(d) made versioned template data Michael can edit.
-- The three EXISTING values are carried through unchanged — this ADDS, it does
-- not restate. Dropping and re-adding with a guessed list would orphan every
-- row already carrying 'expert-narrative-variant' or 'stock-answer'.
alter table form_templates drop constraint if exists form_templates_family_check;
alter table form_templates add constraint form_templates_family_check
  check (family in ('instrument', 'expert-narrative-variant', 'stock-answer',
                    'fixed-sentence', 'writer-instructions'));

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- AFTER THE FACT (2026-09-03, #147): this file RAN and answered nine of ten. Check 8 FAILED and check 6's third limb CANNOT PASS as written — both are re-put, corrected, in `2026-09-03-fe-d1-amendment-fix.sql`; run that file and answer them there. Nothing executable in THIS file changed.
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. THE GATE PASSED — i.e. this file did not raise. That itself proves
--    `form_templates` exists and therefore that MIG-1 has run.
--    EXPECT: you got here. If instead you saw
--    "FE-D1 migration ... has not run", NOTHING in this file was applied —
--    run MIG-1 unchanged and start again.
--
-- 2. All five new tables exist, and generated_documents took its column:
--      select to_regclass('public.case_chronology_versions')      as chronology,
--             to_regclass('public.case_providers')                as providers,
--             to_regclass('public.case_provider_individuals')     as individuals,
--             to_regclass('public.case_provider_visits')          as visits,
--             to_regclass('public.generated_document_paragraphs') as paragraphs;
--      select count(*) from information_schema.columns
--       where table_name = 'generated_documents' and column_name = 'client_id';
--    EXPECT: five non-null names, then 1.
--
-- 3. The app's role reaches all five (this is what #28 caught late):
--      select has_table_privilege('authenticated','case_chronology_versions','insert')      as c_ok,
--             has_table_privilege('authenticated','case_providers','insert')                as p_ok,
--             has_table_privilege('authenticated','case_provider_individuals','insert')     as i_ok,
--             has_table_privilege('authenticated','case_provider_visits','insert')          as v_ok,
--             has_table_privilege('authenticated','generated_document_paragraphs','insert') as g_ok;
--    EXPECT: all five true.
--
-- 4. And `anon` reaches NONE of them:
--      select has_table_privilege('anon','case_chronology_versions','insert')      as c_anon,
--             has_table_privilege('anon','case_providers','insert')                as p_anon,
--             has_table_privilege('anon','case_provider_individuals','insert')     as i_anon,
--             has_table_privilege('anon','case_provider_visits','insert')          as v_anon,
--             has_table_privilege('anon','generated_document_paragraphs','insert') as g_anon;
--    EXPECT: all five FALSE. If any is true, STOP — that is a live exposure,
--    and these tables hold a chronology's extracted text.
--
-- 5. RLS is on and each has exactly one policy:
--      select c.relname, c.relrowsecurity, count(p.polname) as policies
--        from pg_class c
--        left join pg_policy p on p.polrelid = c.oid
--       where c.relname in ('case_chronology_versions','case_providers',
--                           'case_provider_individuals','case_provider_visits',
--                           'generated_document_paragraphs')
--       group by c.relname, c.relrowsecurity
--       order by c.relname;
--    EXPECT: five rows, relrowsecurity true on every one, policies = 1 on every one.
--
-- 6. THE RENAME IS COMPLETE — nothing anywhere still says "provider":
--      select to_regclass('public.provider_billing_profiles') as old_table,
--             to_regclass('public.facility_billing_profiles') as new_table;
--    EXPECT: old_table NULL, new_table non-null.
--
--      select table_name, column_name from information_schema.columns
--       where table_schema = 'public' and column_name = 'facility_party_id'
--       order by table_name;
--    EXPECT: exactly FOUR rows — medical_bills, code_mappings and
--    facility_billing_profiles (the three renamed), plus case_providers, which
--    was born with the new name in this file.
--
--      select table_name, column_name from information_schema.columns
--       where table_schema = 'public' and column_name = 'provider_party_id';
--    EXPECT: ZERO rows.
--
--      select conname from pg_constraint where conname like '%provider%';
--      select indexname from pg_indexes
--       where schemaname = 'public' and indexname like '%provider%';
--      select policyname from pg_policies
--       where schemaname = 'public' and policyname like '%provider%';
--    EXPECT: ZERO rows from each of the three. A policy is invisible to
--    pg_constraint and pg_indexes, which is why it is asked separately.
--
-- 7. NOTHING WAS LOST. Compare against the STEP 0 counts you wrote down:
--      select count(*) from medical_bills;
--      select count(*) from code_mappings;
--      select count(*) from facility_billing_profiles;
--    EXPECT: identical to STEP 0, table for table. `alter ... rename` copies no
--    rows, so any difference means something other than this file ran.
--
-- 8. The widened edge CHECK accepts the new type WITH a period, and is EXACT.
--    Run INSIDE a transaction you roll back — this writes a row:
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
--    EXPECT: the FIRST insert succeeds (INSERT 0 1); the SECOND raises a
--    check-constraint violation. If the second SUCCEEDS the CHECK is not exact
--    and free text can enter the vocabulary — STOP. If there are fewer than two
--    rows in `parties`, this check is vacuous — say so rather than recording it
--    as passed. Roll back either way.
--
-- 9. form_templates accepts the two new families. Again inside a rollback:
--      begin;
--      insert into form_templates (key, family, name)
--        values ('probe:fixed', 'fixed-sentence', 'migration probe');
--      insert into form_templates (key, family, name)
--        values ('probe:writer', 'writer-instructions', 'migration probe');
--      rollback;
--    EXPECT: both succeed, then ROLLBACK. A check violation means the family
--    CHECK did not widen.
--
-- 10. The table count moved by exactly five:
--      select count(*) from pg_tables where schemaname = 'public';
--     EXPECT: 46 — that is 41 after MIG-1, plus these five. If you read 37,
--     MIG-1 has not run and you should not be here; if you read 41, this
--     file's tables did not get created. The count is stated RELATIVE to
--     MIG-1 having run, which check 1 already established.
