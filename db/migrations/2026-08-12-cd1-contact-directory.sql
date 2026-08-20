-- Migration — 2026-08-12, CD-1 contact directory build slice
--
-- Authorization: docs/specs/cd1-build-slice.md (RULED by Michael 2026-08-11).
-- Design authority: docs/specs/contact-directory.md. On any conflict, the spec
-- wins and the slice doc gets a correction.
--
-- RUN BY MICHAEL'S HAND, per the CL-2 precedent (slice item 7):
--   1. BACK UP FIRST.
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS before moving on.
-- This file is also folded into db/schema.sql so a fresh project is correct.
--
-- WHAT THIS DOES NOT DO, deliberately:
--   * It does not create a second identity table. `parties` IS the directory
--     (spec §1) — a second one would recreate the wrong-level defect class CL-2
--     was built to kill. Everything below evolves what exists.
--   * It does not drop `party_type`. Role tags SUPERSEDE it as the thing the app
--     filters on, but the column still drives which fields the registry renders.
--     `role_tags[1]` is kept equal to it instead. Nothing is destroyed here.
--   * It does not touch `case_clients`, `case_client_flags`, or anything CL-2
--     walked (D-CL2-8 stands untouched).
--   * It does not create `case_links`. Contact edges and case-to-case links
--     never merge — the CL-1 firewall (spec §5.3). The D-CL1 items stay unruled.
--   * It adds NO service-story columns. They are explicitly Scope-OUT: the shape
--     stands in the spec, but unconsumed columns invite drift, so they land with
--     the first instrument consumer.
--
-- Safe to re-run: every statement is guarded.

-- ============ §3 DIRECTORY-LEVEL IDENTITY ============

-- §3.4 — multi-valued role tags supersede the single party_type.
alter table parties add column if not exists role_tags text[] not null default '{}';
-- §3.2 — typed alias set: [{kind: 'dba'|'fka'|'suffix-variant', name, note?}].
-- JSONB rather than a child table: aliases are read with the contact every time
-- and never queried independently.
alter table parties add column if not exists aliases jsonb not null default '[]';
-- §3.1 — living/deceased is a fact of the PERSON, true on every case at once.
alter table parties add column if not exists deceased boolean not null default false;
alter table parties add column if not exists deceased_date date;

-- Backfill: the existing single type becomes tag zero. Mechanical, lossless,
-- and reversible — party_type is still there to re-derive from.
update parties
   set role_tags = array[party_type]
 where role_tags = '{}' and party_type is not null;

create index if not exists parties_role_tags_idx on parties using gin (role_tags);
create index if not exists parties_aliases_idx on parties using gin (aliases);

-- ============ §4 ROSTER LAYER ON case_parties ============

-- §4.2 — the four separable attributes. `side` ALREADY IS attribute four (firm
-- perspective); it is deliberately not renamed or migrated away.
alter table case_parties add column if not exists story_role text;
-- NULL means NON-PARTY (the UIM at-fault driver), which is a VALUE, not an
-- absence. "Not yet decided" is represented by the roster flag table below, not
-- by this column — that is why the backfill flags instead of writing a guess.
alter table case_parties add column if not exists caption_alignment text;
alter table case_parties add column if not exists party_status text
  check (party_status is null or party_status in
    ('caption-party','non-party-actor','court-appointed','intervenor','unnamed-reserved'));

-- §3.1 — capacity is a property of the LINK, never the directory. One human =
-- one directory row; the same person appearing individually AND as next friend
-- is two roster entries over one row.
alter table case_parties add column if not exists capacity_kind text
  check (capacity_kind is null or capacity_kind in
    ('individually','next-friend-of','representative-of-estate-of','dba'));
-- Points at the minor / the decedent. restrict, not cascade: deleting a contact
-- must not silently erase the fact that someone appeared on their behalf.
alter table case_parties add column if not exists capacity_points_at_party_id uuid
  references parties (id) on delete restrict;

-- §4.3 — roster entries are HISTORY, not snapshot. FE-8 and IN-4 both need
-- "who was in this case when this instrument went out."
alter table case_parties add column if not exists joined_by text
  check (joined_by is null or joined_by in
    ('intake-slot','amendment','court-action','substitution'));
alter table case_parties add column if not exists active_state text
  check (active_state is null or active_state in ('active','withdrawn','substituted-out'));
alter table case_parties add column if not exists slot_role text;

-- Backfill, matching src/domain/rosterBackfill.ts step for step so a defect is a
-- defect in both modes (the CL-2 test precedent).
--   a. story_role carries the existing role VERBATIM. Lossless.
update case_parties set story_role = role where story_role is null;
--   b. §4.3 defaults, so nothing extra is typed.
update case_parties set joined_by = 'intake-slot' where joined_by is null;
update case_parties set active_state = 'active' where active_state is null;
--   c. Plaintiff/Defendant map ONLY where the case type's side set defines that
--      alignment. A 'Defendant' link on a felony (State/Accused) does NOT map —
--      it gets flagged below rather than forced to the nearest-looking value.
update case_parties cp
   set caption_alignment = cp.role, party_status = 'caption-party'
  from cases c
 where cp.case_id = c.id
   and cp.caption_alignment is null
   and cp.role in ('Plaintiff','Defendant')
   and c.practice_area in ('Personal Injury','General Civil Litigation');
--   d. Roles that name a FUNCTION are never caption parties on any case type
--      this practice files. NULL here is the value "non-party".
--   F-12, ruled 2026-08-18 (Grok external review, record doc section 3 item 5):
--   `coalesce(party_status, null)` was a NO-OP - every Witness / Adjuster /
--   provider / expert / judge would have ended NULL though 'non-party-actor'
--   exists in the CHECK. The value is definitionally true for exactly the roles
--   this UPDATE targets, per this block's own comment above, so writing it is
--   not a guess and the never-guess principle is not offended.
update case_parties
   set caption_alignment = null,
       party_status = coalesce(party_status, 'non-party-actor')
 where caption_alignment is null
   and role in ('Witness','Opposing counsel','Co-counsel','Adjuster on claim',
                'Treating provider','Expert — ours','Expert — opposing',
                'Judge assigned','Court of record');

create index if not exists case_parties_capacity_points_idx
  on case_parties (capacity_points_at_party_id);

-- ============ ROSTER BACKFILL FLAGS — never guessed ============
-- The `case_client_flags` precedent (CL-2) applied to the roster. A flag is an
-- ADDITION, not an abort: the link still gets everything that was derivable.
create table if not exists case_roster_flags (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  case_party_id uuid not null references case_parties (id) on delete cascade,
  reason text not null,
  -- The value that could not be mapped, preserved verbatim so nothing is lost.
  unmapped_value text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_party_id)
);

create index if not exists case_roster_flags_case_idx on case_roster_flags (case_id);

-- Flag every link whose alignment is still underived. 'Client' is the common
-- one and it is genuinely ambiguous: our client is the Plaintiff on a civil
-- caption and the Accused on a criminal one, and nothing in the record says
-- whether the firm sued or defended (representation_type is criminal-only).
-- Two defensible answers means no mechanical answer.
insert into case_roster_flags (case_id, case_party_id, reason, unmapped_value)
select cp.case_id, cp.id,
       'Role "' || cp.role || '" does not determine a caption alignment on its own for case type "'
         || c.case_type || '". Set it by hand — nothing was guessed.',
       cp.role
  from case_parties cp
  join cases c on c.id = cp.case_id
 where cp.caption_alignment is null
   and cp.role not in ('Witness','Opposing counsel','Co-counsel','Adjuster on claim',
                       'Treating provider','Expert — ours','Expert — opposing',
                       'Judge assigned','Court of record')
on conflict (case_party_id) do nothing;

-- ============ §5 RELATIONSHIP LAYER ============
-- One directional typed edge structure with OPTIONAL case scope: no case_id
-- means a WORLD FACT (employer-of, spouse); a case_id means true for that case
-- (attorney-of-record-for, insurer of the adverse party here). REQ-11's
-- inventory contains both kinds, which is why scope is optional rather than
-- required or absent.
--
-- THE CL-1 FIREWALL: this table links CONTACTS to CONTACTS. It never holds a
-- case-to-case link, and `case_links` (CL-1, unruled) never holds one of these.
create table if not exists contact_edges (
  id uuid primary key default gen_random_uuid(),
  from_contact_id uuid not null references parties (id) on delete cascade,
  to_contact_id uuid not null references parties (id) on delete cascade,
  edge_type text not null,
  -- NULL = world fact.
  case_id uuid references cases (id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  -- A contact cannot be linked to itself.
  constraint contact_edges_not_self check (from_contact_id <> to_contact_id),
  -- The same relationship is not recorded twice in the same scope. NULLS NOT
  -- DISTINCT so two world facts of the same type collide as intended.
  unique nulls not distinct (from_contact_id, to_contact_id, edge_type, case_id)
);

create index if not exists contact_edges_from_idx on contact_edges (from_contact_id);
create index if not exists contact_edges_to_idx on contact_edges (to_contact_id);
create index if not exists contact_edges_case_idx on contact_edges (case_id);

-- Vocabulary is controlled and extensible (spec §5.2); adding a type is a
-- SPEC-LEVEL ACT. Enforced as a check so free text cannot yield "employer",
-- "Employer", and "works for" as three relationships. Keep in step with
-- src/domain/contactEdges.ts.
alter table contact_edges drop constraint if exists contact_edges_type_check;
alter table contact_edges add constraint contact_edges_type_check
  check (edge_type in (
    'employer-of','owner-entrustor-of','lessor-of','parent-of','affiliate-of',
    'insurer-of','insurer-of-adverse-party','principal-of','registered-agent-of',
    'heir-of','representative-of-estate-of','next-of-kin-of','spouse-of',
    'contractor-for','manufacturer-of-goods-sold-by','platform-for','attorney-for',
    'bailee-of','joint-enterprise-with'
  ));

-- ============ RLS + GRANTS FROM BIRTH ============
-- Slice item 6, the #28/CL-2 lesson applied PROACTIVELY rather than caught at
-- defect time. RLS decides which ROWS a role may touch; it does not grant access
-- to the table itself, and this project has "auto-expose new tables" OFF, so a
-- new table without its own GRANT is simply unreachable.
alter table case_roster_flags enable row level security;
alter table contact_edges enable row level security;

drop policy if exists "authenticated full access case_roster_flags" on case_roster_flags;
create policy "authenticated full access case_roster_flags" on case_roster_flags
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full access contact_edges" on contact_edges;
create policy "authenticated full access contact_edges" on contact_edges
  for all to authenticated using (true) with check (true);

-- ALTER DEFAULT PRIVILEGES is NOT set on this database, so each new table must
-- carry its own GRANT. authenticated only; anon gets nothing, by design.
grant select, insert, update, delete on case_roster_flags to authenticated;
grant select, insert, update, delete on contact_edges to authenticated;

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. Every contact carries at least one role tag, and tag zero is its old type:
--      select count(*) filter (where role_tags = '{}')                as untagged,
--             count(*) filter (where role_tags[1] is distinct from party_type) as mismatched
--        from parties;
--    EXPECT: untagged = 0, mismatched = 0.
--
-- 2. Nothing lost its role, and every link has its history defaults:
--      select count(*) filter (where story_role is distinct from role) as role_drift,
--             count(*) filter (where joined_by is null)                as no_joined_by,
--             count(*) filter (where active_state is null)             as no_state
--        from case_parties;
--    EXPECT: all three = 0.
--
-- 3. The flag count is the honest one — read it, do not "fix" it:
--      select count(*) from case_roster_flags where resolved_at is null;
--    EXPECT: roughly one per Client-role link plus any Other. These are for you
--    to set by hand. A LOW number here would mean something guessed.
--
-- 4. Both new tables are actually reachable (this is what #28 caught late):
--      select has_table_privilege('authenticated','contact_edges','select')     as edges_ok,
--             has_table_privilege('authenticated','case_roster_flags','select') as flags_ok;
--    EXPECT: both true.
--
-- 5. The firewall holds — there is still no case-to-case link table:
--      select to_regclass('public.case_links');
--    EXPECT: null.

-- ---------------------------------------------------------------------------
-- CORRECTION — appended 2026-08-19 (Central) by Michael's ruling. Everything
-- above stands untouched as the record of the text that ran.
-- The comment above reads "ALTER DEFAULT PRIVILEGES is NOT set on this
-- database" (false as written) and "anon gets nothing, by design" (true of this
-- project's grants; false of the database).
-- What is true, read from the catalog by Michael's hand 2026-08-19: `anon` and
-- `service_role` hold TRUNCATE, REFERENCES, TRIGGER and MAINTAIN on every table
-- in public, granted by Supabase's own default ACL (pg_default_acl:
-- postgres | public | r), not by anything in this repository — and
-- `ALTER DEFAULT PRIVILEGES` IS set on this database, by that vendor bootstrap,
-- though this project has never issued it. The sentence that survives: `anon`
-- holds none of the four DML privileges. C-2 RESTATED 2026-08-19 (see the dated
-- annotation in docs/specs/grok-external-review-2026-08-18.md); remedy open and
-- Michael's (O-11); enforce-vs-inherit deferred pending diagnostics (O-12).
-- ---------------------------------------------------------------------------
