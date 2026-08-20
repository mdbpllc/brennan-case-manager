-- Gate 10 section 5 PRE-FLIP REPORT - run against the LIVE database, READ-ONLY.
--
-- Authority: docs/specs/gate10-pii-frontend-slice.md section 5, under Michael's
-- G10-5 build authorization 2026-08-19. The build session that landed the
-- front-end half could NOT run this: the same authority's DO-NOT list bars it
-- from connecting to the database. So the query is filed here for Michael's
-- hand, and the live half of the report is UNRUN.
--
-- Expect ZERO rows.
--
-- IF ANY ROW RETURNS: STOP. Report the keys and the row count. Do not move the
-- values, do not delete them, do not build past it. Where a value lives is a
-- decision and it is Michael's - the CD-1 roster-flag precedent and the gate 10
-- pre-flight's own rule.
--
-- BOTH KEY LISTS, LABELLED, and the distinction is load-bearing rather than
-- pedantry: on the RULED EIGHT alone a stored driver's licence number comes back
-- CLEAN, because none of that list's four licence guesses matches this app's
-- actual keys (dlNumber / dlState). That is the schema slice's stated heuristic
-- limit turning out to be real on first contact. Both arrays below are EXTRACTED
-- from db/migrations/2026-08-19-gate10-pii-columns.sql, not retyped, so this asks
-- the same question the ruled pre-flight asked.
--
-- WHY THE FILTER IS IN A SUBQUERY AND NOT BESIDE THE LATERAL. `fields` is
-- `jsonb not null` with no CHECK that it is an OBJECT. `?|` answers false on a
-- non-object; jsonb_object_keys() RAISES 22023 on one. Written flat, the planner
-- may expand the lateral before applying the filter, and the report would ERROR
-- on exactly the malformed row it exists to find - a check failing in the one
-- direction a check must never fail. The migration documents this trap; the
-- subquery is how this query avoids it.

with ruled as (
  select id, display_name, fields from parties
   where fields ?| array['dob','date_of_birth','ssn','social_security',
                         'dl','drivers_license','driver_license','license_number']
), as_built as (
  select id, display_name, fields from parties
   where fields ?| array['dob','ssn','dlNumber','dlState']
)
select 'ruled-eight' as list, r.id, r.display_name, k.key
  from ruled r
  cross join lateral jsonb_object_keys(r.fields) as k(key)
 where k.key = any (array['dob','date_of_birth','ssn','social_security',
                          'dl','drivers_license','driver_license','license_number'])
union all
select 'as-built' as list, b.id, b.display_name, k.key
  from as_built b
  cross join lateral jsonb_object_keys(b.fields) as k(key)
 where k.key = any (array['dob','ssn','dlNumber','dlState'])
 order by list, id, key;
