-- Migration — 2026-09-07, THE CC-1 ADDRESS MODEL, PART 2 OF 2: THE ONE-TIME SPLIT
--
-- Authorization: docs/specs/cc1-rulings-and-address-model-slice.md, `CCS-1`
-- RULED YES by Michael 2026-09-07 17:11 CDT (verbatim "yes"), session log #149.
-- Design authority: that slice's §2.2 D1(iii) and §5.2-§5.3.
--
-- ⛔ RUN `2026-09-07-address-model-schema.sql` FIRST. This file REFUSES to run
-- before it — see the gate below.
--
-- WHAT MICHAEL RULED, and why this file exists at all. Asked WHERE a one-line
-- address gets split and whose eye confirms it, he chose option (1) of three:
--
--   "1"  -- split ONCE, at the record, by the step that adds the two fields,
--          by a stated rule, each split row MARKED, shown on the party page
--          with confirm-or-edit. THE RENDER PATH NEVER PARSES.
--
-- So the split runs exactly twice in this system and never again: here, over
-- the live rows, and in `migrateV15ToV16` in src/data/localAdapter.ts over the
-- demo store. Both implement §5.3's rule, and both are tested against the same
-- three cases. NOTHING in src/forms/ or src/pages/ splits an address.
--
-- THE RULE (§5.3), stated once so this file and the TypeScript agree:
--   trim; split on commas; FEWER THAN THREE parts -> 'rule-unsplit', the WHOLE
--   value on the street line; otherwise the LAST TWO parts joined by ", " are
--   the city/state/ZIP line and everything before them, joined by ", ", is the
--   street line -- so a suite stays with the street.
--
--     "400 Tourmaline Way, Suite 210, Rockvale, TX 78200"
--        -> "400 Tourmaline Way, Suite 210" / "Rockvale, TX 78200"
--     "3100 S 31st St, Temple, TX"      -> "3100 S 31st St" / "Temple, TX"
--     "3100 S 31st St, Temple TX 76502" -> 'rule-unsplit', whole value line 1
--
-- RUN BY MICHAEL'S HAND. The Code session that WROTE this file did not run it
-- and connected to no database:
--   1. BACK UP FIRST. This file WRITES to `parties.fields` on every row it
--      touches. It is the only migration in this project that edits a jsonb
--      blob in place, and a backup is the whole of the undo.
--   2. Run the SCHEMA file first (above), alone, and answer its three checks.
--   3. Run the STEP 0 counts below and WRITE THEM DOWN BY HAND.
--   4. Paste this file ALONE into an empty SQL buffer -- nothing else in it.
--   5. Answer the verification checks at the bottom IN WORDS.
--
-- ============ STEP 0 — BEFORE YOU RUN ANYTHING ============
-- Run these THREE counts and WRITE THEM DOWN. Checks 1 and 3 at the foot
-- compare against them, and a count taken only after the fact is a count taken
-- after the fact:
--
--      -- (a) facility LOCATION items carrying a one-line address and no split:
--      select count(*)
--        from public.parties p,
--             jsonb_array_elements(p.fields->'locations') loc
--       where p.party_type = 'providerBusiness'
--         and jsonb_typeof(p.fields->'locations') = 'array'
--         and coalesce(loc->>'address','') <> ''
--         and coalesce(loc->>'addressLine1','') = '';
--
--      -- (b) NON-facility parties carrying a top-level one-line address:
--      select count(*) from public.parties p
--       where p.party_type <> 'providerBusiness'
--         and coalesce(p.fields->>'address','') <> ''
--         and coalesce(p.fields->>'addressLine1','') = '';
--
--      -- (c) total parties, so a botched update is visible as a lost row:
--      select count(*) from public.parties;
--
--   (a) location items to split ....... __________
--   (b) parties to split .............. __________
--   (c) total parties ................. __________
--
-- ============ WHAT THIS DOES NOT DO, deliberately ============
--   * It NEVER DELETES the one-line `address` value (SD-5, and the slice's
--     DO-NOT list in terms). The split is reversible by hand precisely because
--     the source is still on the record.
--   * It never touches a record that already has an `addressLine1`, and never
--     overwrites an `addressSplitBy` of 'hand'. Re-running it reports zero.
--   * It adds NO geocoder, validator or USPS lookup (the slice's §4). The rule
--     is a comma rule and nothing more.
--   * It touches `case_clients`, `case_parties`, `case_roster_flags` and
--     `party_pii` not at all, and reads no PII column. `parties.fields` never
--     held SSN or licence after gate 10; this file reads only `address`,
--     `addressLine1` and `locations`.
--   * It creates no table and no constraint, so no RLS policy, GRANT or probe
--     entry is owed.
--   * It writes no legal rule, no registry entry and no TRCP 195.2 date.

-- ============ THE GATE — FIRST STATEMENT ============
-- The schema file must have run: the checks at the foot read
-- `case_providers.facility_location_id`, and a split with nowhere to select a
-- location from is half the ruling.
do $$
begin
  if to_regclass('public.parties') is null then
    raise exception 'public.parties does not exist. This is not the brennan-case-manager database.';
  end if;
  if not exists (
    select 1 from information_schema.columns
     where table_schema = 'public'
       and table_name   = 'case_providers'
       and column_name  = 'facility_location_id'
  ) then
    raise exception
      'Part 1 has not run. Run `2026-09-07-address-model-schema.sql` first, alone, then re-run this file.';
  end if;
end $$;

-- ============ THE RULE, AS A FUNCTION ============
-- Written as a function rather than inline so the two call sites below cannot
-- drift from each other, and so a reader can test the rule by itself before
-- letting it near a row. It is created in `public` and DROPPED at the end of
-- this file: it is migration scaffolding, not part of the schema.
create or replace function public.__cc1_split_address(raw text)
returns jsonb
language plpgsql
immutable
as $fn$
declare
  v      text := btrim(coalesce(raw, ''));
  parts  text[];
  kept   text[] := '{}';
  piece  text;
begin
  if v = '' then
    return jsonb_build_object('addressLine1','', 'cityStateZip','', 'mark','rule-unsplit');
  end if;

  -- Split on commas, trim each piece, and DROP empty pieces -- "A,, B" is two
  -- parts, not three, exactly as the TypeScript's filter does.
  foreach piece in array string_to_array(v, ',') loop
    if btrim(piece) <> '' then
      kept := kept || btrim(piece);
    end if;
  end loop;
  parts := kept;

  if array_length(parts, 1) is null or array_length(parts, 1) < 3 then
    return jsonb_build_object('addressLine1', v, 'cityStateZip','', 'mark','rule-unsplit');
  end if;

  return jsonb_build_object(
    'addressLine1', array_to_string(parts[1:array_length(parts,1)-2], ', '),
    'cityStateZip', array_to_string(parts[array_length(parts,1)-1:array_length(parts,1)], ', '),
    'mark',         'rule'
  );
end;
$fn$;

-- ============ THE SPLIT — the two call sites ============
do $$
declare
  r            record;
  loc          jsonb;
  rebuilt      jsonb;
  split        jsonb;
  loc_touched  int := 0;
  loc_ids      int := 0;
  party_split  int := 0;
begin
  ------------------------------------------------------------------ facilities
  -- Every `locations[]` item gains a stable id (SD-4) whether or not it needs
  -- splitting: the R17 row selects a location BY id, and an array index does
  -- not survive a reorder. An item that already has one keeps it.
  for r in
    select p.id, p.fields
      from public.parties p
     where p.party_type = 'providerBusiness'
       and jsonb_typeof(p.fields->'locations') = 'array'
  loop
    rebuilt := '[]'::jsonb;
    for loc in select * from jsonb_array_elements(r.fields->'locations') loop

      if coalesce(loc->>'id','') = '' then
        loc     := loc || jsonb_build_object('id', gen_random_uuid()::text);
        loc_ids := loc_ids + 1;
      end if;

      if coalesce(loc->>'address','') <> '' and coalesce(loc->>'addressLine1','') = '' then
        split := public.__cc1_split_address(loc->>'address');
        loc := loc || jsonb_build_object(
          'addressLine1',   split->>'addressLine1',
          'cityStateZip',   split->>'cityStateZip',
          'addressSplitBy', split->>'mark'
        );
        loc_touched := loc_touched + 1;
      end if;

      rebuilt := rebuilt || jsonb_build_array(loc);
    end loop;

    if rebuilt is distinct from (r.fields->'locations') then
      update public.parties
         set fields = jsonb_set(fields, '{locations}', rebuilt)
       where id = r.id;
    end if;
  end loop;

  --------------------------------------------------------------- every other type
  -- D1(iv), Michael: "1" -- ONE address shape in the whole registry. The
  -- shared CONTACT block, `lawEnforcementAgency` and `court` all land here.
  for r in
    select p.id, p.fields
      from public.parties p
     where p.party_type <> 'providerBusiness'
       and coalesce(p.fields->>'address','') <> ''
       and coalesce(p.fields->>'addressLine1','') = ''
  loop
    split := public.__cc1_split_address(r.fields->>'address');
    update public.parties
       set fields = fields || jsonb_build_object(
             'addressLine1',   split->>'addressLine1',
             'cityStateZip',   split->>'cityStateZip',
             'addressSplitBy', split->>'mark'
           )
     where id = r.id;
    party_split := party_split + 1;
  end loop;

  raise notice 'CC-1 address split: % location item(s) split, % location id(s) assigned, % part(y/ies) split.',
    loc_touched, loc_ids, party_split;
end $$;

-- Scaffolding out. The rule lives in this file and in the TypeScript, and a
-- function left behind in `public` would be a third home for it.
drop function if exists public.__cc1_split_address(text);

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
--
-- 1. NOTHING IS LEFT UNSPLIT. Compare against your STEP 0 (a) and (b).
--
--      select count(*)
--        from public.parties p,
--             jsonb_array_elements(p.fields->'locations') loc
--       where p.party_type = 'providerBusiness'
--         and jsonb_typeof(p.fields->'locations') = 'array'
--         and coalesce(loc->>'address','') <> ''
--         and coalesce(loc->>'addressLine1','') = '';
--
--      select count(*) from public.parties p
--       where p.party_type <> 'providerBusiness'
--         and coalesce(p.fields->>'address','') <> ''
--         and coalesce(p.fields->>'addressLine1','') = '';
--
--    EXPECT: ZERO and ZERO. Any other number means rows were skipped -- read it
--    out and stop rather than re-running.
--
-- 2. EVERY LOCATION ITEM HAS AN ID.
--
--      select count(*)
--        from public.parties p,
--             jsonb_array_elements(p.fields->'locations') loc
--       where p.party_type = 'providerBusiness'
--         and jsonb_typeof(p.fields->'locations') = 'array'
--         and coalesce(loc->>'id','') = '';
--
--    EXPECT: ZERO. A location without an id cannot be selected on the Medical
--    tab, so the R17 half of D1 would silently not work for that facility.
--
-- 3. WHAT THE RULE COULD NOT SPLIT — BY NAME, so you can fix them by hand.
--    These are the records where the address had fewer than three comma parts,
--    so the WHOLE value sits on the street line and the city/state/ZIP line is
--    empty. Nothing is wrong with the data; the rule declined to guess.
--
--      select p.display_name, loc->>'label' as location, loc->>'addressLine1' as line1
--        from public.parties p,
--             jsonb_array_elements(p.fields->'locations') loc
--       where p.party_type = 'providerBusiness'
--         and jsonb_typeof(p.fields->'locations') = 'array'
--         and loc->>'addressSplitBy' = 'rule-unsplit'
--       union all
--      select p.display_name, '(mailing address)', p.fields->>'addressLine1'
--        from public.parties p
--       where p.party_type <> 'providerBusiness'
--         and p.fields->>'addressSplitBy' = 'rule-unsplit'
--       order by 1, 2;
--
--    EXPECT: the rows to READ OUT, however many. Each one is a party page visit
--    with a "split by rule — confirm or edit" notice waiting on it. Count them
--    and write the number down; every row split 'rule' rather than
--    'rule-unsplit' also carries that notice until you confirm it.
--
-- 4. NO CHECK CONSTRAINT WAS TOUCHED. `parties` carries its constraints from
--    the CD-1 and gate-10 migrations; a jsonb update must not have disturbed
--    one, and this proves it rather than assuming it (the check-8 lesson from
--    2026-09-03: db/schema.sql is not the live database's authority on
--    constraint names -- the migration history is).
--
--      select conname, pg_get_constraintdef(oid)
--        from pg_constraint
--       where conrelid = 'public.parties'::regclass
--         and contype  = 'c'
--       order by conname;
--
--    EXPECT: exactly the constraints that were there before, definitions
--    unchanged. Read out how many came back.
--
-- 5. NO ROW WAS LOST. Compare against STEP 0 (c).
--
--      select count(*) from public.parties;
--
--    EXPECT: identical to STEP 0 (c).
--
-- 6. THE SCAFFOLDING IS GONE.
--
--      select to_regprocedure('public.__cc1_split_address(text)');
--
--    EXPECT: NULL.
--
-- AFTER THIS FILE: open the Parties page and work through the "split by rule —
-- confirm or edit" notices. Confirm changes nothing but the mark; edit changes
-- the address. Until you touch a record, its mark says a machine did it.
