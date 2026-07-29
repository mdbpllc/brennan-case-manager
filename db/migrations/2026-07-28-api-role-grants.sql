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
