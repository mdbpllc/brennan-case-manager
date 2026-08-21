-- Migration — 2026-08-20, FE-D1 disclosures engine build slice
--
-- Authorization: docs/specs/fe-d1-build-slice.md (RULED by Michael 2026-08-12,
-- session log #63). Design authority: docs/specs/form-engine.md. On any
-- conflict, the spec wins and the slice doc gets a correction.
--
-- RUN BY MICHAEL'S HAND, per the CL-2 / CD-1 / gate-10 precedent:
--   1. BACK UP FIRST.
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS before moving on.
-- This file is also folded into db/schema.sql so a fresh project is correct.
-- Safe to re-run: every statement is guarded.
--
-- WHAT THIS DOES NOT DO, deliberately:
--   * It creates NO ITEM TABLE. The §13 item model is slice 2's core and
--     nothing in FE-D1 creates items. FE-17's internal/outbound hard flag is
--     annotated to ride whichever slice creates that table, IN THE SAME COMMIT
--     as the table. Do not add either here.
--   * It does not touch `privilege_tier` on any table. The two vocabularies in
--     this schema disagree (`generated_documents` vs `transcripts`), Q-COM-10 is
--     OPEN, and its convergence shape is ruled but unexecuted. This slice writes
--     to `generated_documents` and therefore uses THAT table's vocabulary,
--     resolving nothing. The engine leaves the column NULL — Q-COM-11 ruled (A):
--     NULL means unclassified-must-classify, and writing 'work-product' asserts
--     a privilege nobody chose.
--   * It builds NO DOCUMENT STORAGE. `docx_path` / `pdf_path` are metadata.
--     Storage is gate-7 territory and stays there.
--   * It touches no registry table and changes no legal rule's status.
--   * It does not alter `parties`, and it reads no PII column. This engine never
--     touches `party_pii`.

-- ============ §10 SUBSTRATE ============

-- FE-10 — format profiles. Own record, not columns on a template: a profile
-- describes an instrument CLASS and several instruments share one.
-- The format-profile / instrument-definition boundary is OPEN (2026-08-20
-- REQ-CAPTURE §5 Q3, unruled). This split is the reversible choice.
create table if not exists form_format_profiles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  spec jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists form_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  family text not null check (family in ('instrument', 'expert-narrative-variant', 'stock-answer')),
  -- FE-12 from birth. FE-7 adoption is what flips 'proposed'; nothing else may.
  provenance text not null default 'proposed'
    check (provenance in ('format-authoritative', 'proposed')),
  skeleton_key text,
  format_profile_id uuid references form_format_profiles (id) on delete set null,
  current_version_id uuid,
  notes text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The editor writes a NEW ROW; it never edits one. An overwrite would make
-- "which text went out the door" unanswerable, which is the question a served
-- disclosure eventually raises.
create table if not exists form_template_versions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references form_templates (id) on delete cascade,
  version_no integer not null,
  body text not null,
  settings jsonb not null default '{}'::jsonb,
  change_note text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (template_id, version_no)
);

create index if not exists form_template_versions_template_idx
  on form_template_versions (template_id);

create table if not exists form_token_definitions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references form_templates (id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('static', 'inflected', 'computed')),
  description text not null default '',
  source_path text,
  variant_checklist jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (template_id, name)
);

-- ============ TRIGGERS ============

drop trigger if exists form_format_profiles_touch on form_format_profiles;
create trigger form_format_profiles_touch before update on form_format_profiles
  for each row execute function touch_updated_at();

drop trigger if exists form_templates_touch on form_templates;
create trigger form_templates_touch before update on form_templates
  for each row execute function touch_updated_at();

drop trigger if exists form_templates_set_created_by on form_templates;
create trigger form_templates_set_created_by before insert on form_templates
  for each row execute function set_created_by();

drop trigger if exists form_template_versions_set_created_by on form_template_versions;
create trigger form_template_versions_set_created_by before insert on form_template_versions
  for each row execute function set_created_by();

drop trigger if exists form_token_definitions_touch on form_token_definitions;
create trigger form_token_definitions_touch before update on form_token_definitions
  for each row execute function touch_updated_at();

-- ============ RLS + GRANTS — SAME MIGRATION AS THE TABLES ============
-- Slice item 11, binding. This is the #28 / CL-2 / CD-1 lesson: a table that
-- arrives without its policy and its grant is either unreachable or unguarded,
-- and which one it is gets discovered late.

alter table form_format_profiles enable row level security;
alter table form_templates enable row level security;
alter table form_template_versions enable row level security;
alter table form_token_definitions enable row level security;

drop policy if exists "authenticated full access form_format_profiles" on form_format_profiles;
create policy "authenticated full access form_format_profiles" on form_format_profiles
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access form_templates" on form_templates;
create policy "authenticated full access form_templates" on form_templates
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access form_template_versions" on form_template_versions;
create policy "authenticated full access form_template_versions" on form_template_versions
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access form_token_definitions" on form_token_definitions;
create policy "authenticated full access form_token_definitions" on form_token_definitions
  for all to authenticated using (true) with check (true);

-- BE HONEST ABOUT WHAT THOSE POLICIES DO: nothing the other policies in this
-- schema do not. They are permissive — `using (true) with check (true)` — and
-- byte-identical to the other 36. They gate on AUTHENTICATION, not on identity.
grant select, insert, update, delete on form_format_profiles to authenticated;
grant select, insert, update, delete on form_templates to authenticated;
grant select, insert, update, delete on form_template_versions to authenticated;
grant select, insert, update, delete on form_token_definitions to authenticated;

-- ============ §10 GENERATED-DOCUMENT RECORD ============
-- EXTENDED, not forked. §10 says "generated-document record", singular, and the
-- slice says the as-generated retention IS that record. Every column added here
-- is nullable: the billing module's existing rows have none of them and are
-- never invented one.

alter table generated_documents
  add column if not exists template_version_id uuid
    references form_template_versions (id) on delete set null;
alter table generated_documents add column if not exists skeleton_key text;
alter table generated_documents add column if not exists docx_path text;
alter table generated_documents add column if not exists pdf_path text;

-- The full wizard-answer snapshot — what makes §2 item 9's supplementation
-- replay possible.
alter table generated_documents add column if not exists answers jsonb;

-- FE-15, scoped to disclosures.
alter table generated_documents add column if not exists instrument_posture text;
alter table generated_documents drop constraint if exists generated_documents_instrument_posture_check;
alter table generated_documents add constraint generated_documents_instrument_posture_check
  check (instrument_posture is null
         or instrument_posture in ('original', 'amended', 'supplemental'));

alter table generated_documents
  add column if not exists supersedes_document_id uuid
    references generated_documents (id) on delete set null;

-- doc_type widens to admit the disclosures instrument. The existing value is
-- carried through unchanged — this ADDS, it does not restate.
alter table generated_documents drop constraint if exists generated_documents_doc_type_check;
alter table generated_documents add constraint generated_documents_doc_type_check
  check (doc_type in ('reasonable-value-report', 'trcp-194-2b-195-5-disclosures'));

create index if not exists generated_documents_template_version_idx
  on generated_documents (template_version_id);

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. All four tables exist:
--      select to_regclass('public.form_format_profiles')   as profiles,
--             to_regclass('public.form_templates')         as templates,
--             to_regclass('public.form_template_versions') as versions,
--             to_regclass('public.form_token_definitions') as tokens;
--    EXPECT: four non-null names. A null means that table did not get created.
--
-- 2. All four are reachable by the app's role (this is what #28 caught late):
--      select has_table_privilege('authenticated','form_templates','insert')         as t_ok,
--             has_table_privilege('authenticated','form_template_versions','insert') as v_ok,
--             has_table_privilege('authenticated','form_token_definitions','insert') as k_ok,
--             has_table_privilege('authenticated','form_format_profiles','insert')   as p_ok;
--    EXPECT: all four true.
--
-- 3. And `anon` reaches NONE of them:
--      select has_table_privilege('anon','form_templates','insert')         as t_anon,
--             has_table_privilege('anon','form_template_versions','insert') as v_anon,
--             has_table_privilege('anon','form_token_definitions','insert') as k_anon,
--             has_table_privilege('anon','form_format_profiles','insert')   as p_anon;
--    EXPECT: all four FALSE. If any is true, STOP — that is a live exposure.
--
-- 4. RLS is on and each table has exactly one policy:
--      select c.relname, c.relrowsecurity, count(p.polname) as policies
--        from pg_class c
--        left join pg_policy p on p.polrelid = c.oid
--       where c.relname like 'form\\_%'
--       group by c.relname, c.relrowsecurity
--       order by c.relname;
--    EXPECT: four rows, relrowsecurity true on every one, policies = 1 on every one.
--
-- 5. The generated-document record took its new columns:
--      select count(*) from information_schema.columns
--       where table_name = 'generated_documents'
--         and column_name in ('template_version_id','skeleton_key','docx_path',
--                             'pdf_path','answers','instrument_posture',
--                             'supersedes_document_id');
--    EXPECT: 7.
--
-- 6. The widened doc_type accepts the new value and still accepts the old one.
--    Run INSIDE a transaction you roll back — this writes rows:
--      begin;
--      insert into generated_documents (case_id, doc_type, audience, title, content,
--                                       disclaimer_version, generated_by)
--        select id, 'trcp-194-2b-195-5-disclosures', 'internal', 'probe', 'probe',
--               'v0', 'migration probe' from cases limit 1;
--      rollback;
--    EXPECT: INSERT 0 1, then ROLLBACK. A check-constraint violation means the
--    constraint did not widen. If there are no rows in `cases`, this check is
--    vacuous — say so rather than recording it as passed.
--
-- 7. NOTHING ELSE MOVED. No item table was created by this migration:
--      select to_regclass('public.form_items'), to_regclass('public.items');
--    EXPECT: both null. FE-D1 creates no items — that is slice 2's core.
--
-- 8. The table count moved by exactly four:
--      select count(*) from pg_tables where schemaname = 'public';
--    EXPECT: 41, against the 37 measured by the 2026-08-20 gate-3 run.
--    NOTE: these four tables arrive AFTER that run, so they carry their own
--    from-birth evidence (checks 2-4 above) and are OUTSIDE that run's 37x2 grid.
