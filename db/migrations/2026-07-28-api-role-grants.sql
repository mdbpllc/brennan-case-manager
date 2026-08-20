-- Migration — 2026-07-28, auth slice §5A
-- Applied to the live "Brennan Management System" project after the first-ever
-- execution of db/schema.sql left every table unreachable.
--
-- SYMPTOM: every REST call returned 401 with
--   42501  "permission denied for table cases"
--   hint:  "GRANT SELECT ON public.cases TO anon;"
-- under both the sb_publishable_ and the legacy eyJ key. The key was never at
-- fault (/auth/v1/health accepted it, 200), and no client code was implicated.
--
-- CAUSE: db/schema.sql created 32 tables, enabled RLS on all 32, and created 31
-- policies — but issued no GRANTs. RLS decides which ROWS a role may touch; it
-- does not grant access to the table itself. PostgREST hits the SQL privilege
-- layer first, so no policy was ever evaluated. Normally Supabase masks this by
-- exposing new public tables automatically; this project was created with
-- "auto-expose new tables" OFF (Go_Live_Gates.md), so nothing did.
--
-- This block is also appended to db/schema.sql so a fresh project is correct.
-- Safe to re-run: GRANT and REVOKE are idempotent.

grant usage on schema public to authenticated;

-- authenticated ONLY. anon is deliberately granted nothing — all 31 policies are
-- `to authenticated`, so a signed-out caller is refused at the privilege layer.
grant select, insert, update, delete
  on all tables in schema public to authenticated;

-- Intentional exception: RLS on, no policy, no API access. File numbers are
-- issued only through next_file_number(), which is SECURITY DEFINER.
revoke all on file_counters from authenticated;

grant execute on function next_file_number() to authenticated;

-- ---------------------------------------------------------------------------
-- CORRECTION — appended 2026-08-19 (Central) by Michael's ruling. Everything
-- above stands untouched as the record of the text that ran.
-- The comment above reads "anon is deliberately granted nothing." True of this
-- project's grants; false as a statement about the database.
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
