# Gate 10 — PII promotion out of `parties.fields` — BUILD SLICE

**Status: BUILD AUTHORIZED 2026-08-19 — shape, SSN scope and audit limb all RULED the same day.**
Michael authorized the build in its own Code session, on the CD-1 / FE-D1 pattern: **the queue
runner is BARRED from it**, and the live migration is his hand to paste. Kickoff prompt:
`docs/prompts/PROMPT-gate10-pii-build-session.md`.

**Three rulings, 2026-08-19, each with its reason:** the SHAPE — split by sensitivity, DOB on
`parties` and SSN/DL in a child table, because table-level exclusion works at one role where
column-level does not (§1); **SSN SCOPE — full SSN stored**, over a last-4-by-default alternative;
and **G10-1 — provenance only, the audit limb rides with `O-1`** (§4).

- **Canonical repo path (PROPOSED):** `docs/specs/gate10-pii-slice.md` — stable and unversioned,
  following the `cd1-build-slice.md` / `fe-d1-build-slice.md` precedent. (`GLR-2` / `TOC-3` remain
  open on the general question; this follows the existing build-slice practice rather than deciding
  it.)
- **Authority:** `Go_Live_Gates.md` gate 10, appended 2026-08-18. Ruling record:
  `docs/specs/grok-external-review-2026-08-18.md` §3 item 10 (C-4).
- **Shape ruled:** 2026-08-19, session log `#115`. **Read against:** `db/schema.sql` at `b752fcc`.
- **Trigger:** before the first real client record enters the database. **This gate sits AHEAD of
  GL-1's floor, not behind it.**

---

## 1. What the gate actually asks for, and what delivers it

C-4's reason is the design brief in one sentence: *"promoted columns are excludable from API selects
and auditable."* Three properties of this schema decide how that is delivered, and two of them cut
against the obvious answer.

**RLS gives nothing here.** `parties` carries
`create policy "authenticated full access parties" on parties for all to authenticated using (true)
with check (true)`. No row filter, no column filter. It is not a lever.

**Column-level `REVOKE` — the textbook answer — buys nothing today.** It is the correct mechanism
for excluding a column from a PostgREST select, and PostgREST honours it. But `authenticated` is the
only role and the application *is* `authenticated`. Revoking a column from the only role that reads
it breaks the app. **Column exclusion becomes real when a second role exists, which is the
multi-user phase — gate 2 territory, deliberately outside this slice.**

**Table-level exclusion works today, with one role, because the app's default reads do not join.**
That is the whole argument for the ruled shape: a `select *` on `parties` cannot return a value that
is not in `parties`.

**Second decision-relevant fact: the three values are not alike.** DOB appears on pleadings, drives
conflicts checks and the minor/incapacitated determination, and is read constantly. SSN surfaces for
liens, MSP reporting, 1099s and probate — rarely, and by one person. Driver's licence sits between.
**Lumping them because gate 10's sentence lists them together is the error this slice avoids.**

**Ruled shape (2026-08-19):** DOB becomes a typed column on `parties`; SSN and driver's licence move
to a `party_pii` child table with its own RLS and its own GRANT. **Full SSN is stored** — ruled the
same day, over a last-4-by-default alternative.

---

## 2. The CD-1 firewall, addressed rather than assumed

`db/schema.sql` states above `parties`: *"There is deliberately no second identity table — a second
one recreates the wrong-level defect class CL-2 was built to kill."* A child table has to be argued
past that, not slipped past it.

**`party_pii` is not an identity table, by construction:**

- It has **no `display_name`, no `party_type`, no `kind`, no `role_tags`, no `aliases`.** Nothing in
  it identifies anyone; it holds attributes *of* an identity established elsewhere.
- Its **primary key IS the foreign key** (`party_id uuid primary key references parties (id)`). It
  has no independent identity of its own and cannot exist without a `parties` row.
- **Nothing can link to it.** No other table references it, and none may.

The defect CL-2 killed was a second place a *person* could be created, so the same human existed
twice at two levels. **This table cannot create a person.** It is the same relationship
`case_clients` has to `case_parties` — parallel attributes on one identity, not a second identity.

**One-to-one is enforced by the PK, not by a `unique` constraint.** There is no shape in which two
PII rows attach to one contact.

---

## 3. DDL

### 3.1 — `parties.date_of_birth`

```sql
alter table parties add column if not exists date_of_birth date;
```

**Typed, and that is half the point independent of privacy.** A `date` column cannot hold
`"3/4/80"`, `"March 4 1980"` and `"1980-03-04"` as three different strings for the same fact, which
`fields jsonb` can and eventually would. Nullable: most contacts have no DOB and none is invented.

**No index.** DOB is displayed, not searched. Add one when a query needs it.

### 3.2 — `party_pii`

```sql
create table if not exists party_pii (
  -- The PK IS the FK: one row per contact, enforced structurally. No separate id,
  -- because a PII record has no identity of its own (§2).
  party_id uuid primary key references parties (id) on delete cascade,

  -- Full SSN, ruled 2026-08-19 over a last-4-by-default alternative.
  -- text, NOT a formatted/constrained type: ITINs and legitimate edge cases exist
  -- and a CHECK that rejected a valid ITIN would be worse than no CHECK (§6).
  ssn text,

  -- A licence number is meaningless without its issuing state.
  drivers_license text,
  drivers_license_state text,

  -- Provenance, matching F-25's pattern on the five core tables. This is
  -- PROVENANCE, NOT AN AUDIT LOG — see §4.
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

**`on delete cascade`, and it is a deliberate reversal of this project's current direction —
flag it, do not let it ride.** `O-7`'s cascade/retention map proposes moving children from CASCADE
to RESTRICT across the board. **PII is the case that runs the other way: a person's SSN must not
survive the deletion of that person's record.** RESTRICT here would mean a contact cannot be deleted
until their SSN row is deleted first — friction with no benefit, and a state in which an orphaned
SSN outlives a deletion attempt. **This is an `O-7` interaction and should be ruled consciously as
part of it, not settled here by default.**

### 3.3 — Triggers, RLS and GRANT, from birth

The CD-1 slice-item-6 pattern applied proactively rather than caught at defect time (the `#28`
lesson).

```sql
drop trigger if exists party_pii_touch on party_pii;
create trigger party_pii_touch before update on party_pii
  for each row execute function <the existing touch function>;

drop trigger if exists party_pii_set_created_by on party_pii;
create trigger party_pii_set_created_by before insert on party_pii
  for each row execute function set_created_by();

alter table party_pii enable row level security;

drop policy if exists "authenticated full access party_pii" on party_pii;
create policy "authenticated full access party_pii" on party_pii
  for all to authenticated using (true) with check (true);

-- ALTER DEFAULT PRIVILEGES is NOT set on this database (C-2, ruled: keep).
-- A new table without its own GRANT is UNREACHABLE. This one carries its own.
grant select, insert, update, delete on party_pii to authenticated;
```

**Be honest about what the policy does: nothing.** It is permissive, exactly like every other policy
in this schema. **The protection this slice delivers is that the app's `parties` reads do not join
this table**, so no accidental `select *` can return an SSN. Saying the RLS policy protects the SSN
would be false, and a later reader acting on that belief would be worse off than one who knows the
truth.

**A note the build session must not skip:** `anon` gets nothing, by design. Do not widen.

---

## 4. What this slice does NOT deliver — the audit half

Gate 10's reason has two limbs: *excludable from API selects* **and** *auditable*. **This slice
delivers the first cleanly and the second only partially, and the gap has a name.**

`created_by` / `created_at` / `updated_at` give **provenance**: who wrote the row and when it last
changed. They do not give an audit *log* — no history of prior values, no record of reads, no
freeze against silent modification.

**The audit machinery is `O-1` (the F-8a audit-integrity package: classifier columns, freeze,
`REVOKE UPDATE, DELETE`), and `O-1` is OPEN.** F-8 is the finding that `privilege_tier` can change
with no author, no time and no log; the same is true of an SSN column the day it exists.

**RULED 2026-08-19 (`G10-1`): PROVENANCE ONLY. The audit limb rides with `O-1`.**

**Reason:** at one user and one role, the audit limb protects against a second actor who does not
yet exist, and settling part of `O-1`'s design by implementation here would decide it in pieces
rather than as a whole.

**So gate 10 closes on its exclusion limb and leaves its audit limb explicitly owed to `O-1`.**
That is a real, named gap and not an oversight — recorded here so that nobody later reads gate 10 as
having delivered auditability. **Considered and not adopted:** pulling `O-1`'s
`REVOKE UPDATE, DELETE` pattern forward for this one table — small and contained, and this was the
cheapest moment, but it would have required defining a privileged correction path that does not
exist yet.

**Do not build any audit machinery in this slice.** `created_by` / `created_at` / `updated_at` and
nothing further.

---

## 5. Migration behaviour — report, never move

**There is no data to migrate.** The live database holds two `parties` rows, both fictional, and no
DOB / SSN / DL exists in `fields` today. **The migration must not assume that stays true between
authoring and running** — it has already been three days once.

**The migration REPORTS rather than backfills:**

```sql
-- Does anything already sit in fields under a key that looks like these values?
select id, display_name, jsonb_object_keys(fields) as key
  from parties
 where fields ?| array['dob','date_of_birth','ssn','social_security',
                       'dl','drivers_license','driver_license','license_number'];
```

**Expect zero rows.** If any row returns, **STOP and report it.** Moving a value from one home to
another is a decision about where a fact lives, and this project's standing pattern is to flag
rather than guess (the CD-1 roster-flag precedent, where 'Client' was flagged rather than forced to
a nearest-looking value). **The key list above is a heuristic and cannot be exhaustive** — a value
stored under an unguessed key would not be found, which is a limit of the check and is stated rather
than papered over.

**The GIN index needs no action.** `parties_fields_idx` indexes `fields`; once these values are not
in `fields`, they are not in the index. Nothing to drop, nothing to rebuild.

---

## 6. Considered and NOT adopted

Each of these is a rule in disguise — recorded so a later session does not "improve" the design into
something already rejected.

| Rejected | Why |
|---|---|
| **All three as columns on `parties`** | Smallest migration, but SSN then rides every `select *` the app makes, and the column-level `REVOKE` that would fix it breaks the app while `authenticated` is the only role. Delivers typed storage; does not deliver exclusion. |
| **All three in the child table** | Cleanest exclusion, but costs a join for DOB — the one value read constantly. Optimises the rare case at the expense of the common one. |
| **Columns now, revisit at multi-user** | Defers the design rather than settling it, and the cheap moment is now: after go-live the same change is a migration over privileged records. |
| **Last-4 SSN by default** | Smaller liability surface for most of the practical utility. **Ruled against 2026-08-19** — full SSN stored. |
| **A `CHECK` constraint on SSN format** | ITINs and legitimate edge cases exist. A constraint that rejects a valid ITIN is worse than no constraint, and format validation belongs in the UI where it can warn rather than refuse. |
| **Column encryption (pgsodium / Vault)** | Real key-management burden for a single-user system whose realistic threat is accidental over-selection, which table separation already addresses. Recorded as considered; revisit at multi-user with gate 2. |
| **A separate `id` on `party_pii`** | Would permit two PII rows per contact. The PK-is-FK shape makes that unrepresentable. |

---

## 7. Open, and NOT resolved by this slice

| ID | Item |
|---|---|
| ~~**G10-1**~~ | **RULED 2026-08-19 — provenance only, audit rides with `O-1`.** See §4. Closed. |
| **G10-2** | **`on delete cascade` on `party_pii.party_id` reverses `O-7`'s direction for this one table.** Correct here for the reason at §3.2, but it is an `O-7` interaction and should be ruled inside it rather than by default. **Does not block the build.** |
| **G10-3** | **Does the UI write DOB into `fields` today?** Unanswerable design-side — `src/` is excluded from the sync and `Q-PR3-1` is UNRULED. **RESOLVED PROCEDURALLY, NOT SUBSTANTIVELY: the BUILD session can read `src/` freely** (`Q-PR3-1` governs *design* sessions, not Code), so the answer is taken there. **The build session REPORTS what it finds and builds no front-end half without a fresh authorization** — see the kickoff prompt's DO-NOT list. |
| **G10-4** | **Does the shape of this gate depend on a privacy proposition nobody has entered?** Texas Bus. & Com. Code ch. 521 keys breach-notification obligations specifically on SSN and driver's licence numbers. **UNVERIFIED, a locator only, and Claude does not verify.** `Q-WF-6` already records that the registry holds **not one privacy proposition**; this would be the first, and gate 10 is the first design act to run into that gap. |

---

## 8. Build-session checklist — AUTHORIZED 2026-08-19

1. `db/schema.sql` — add `date_of_birth` to `parties`; add the `party_pii` block with its triggers,
   RLS, policy and GRANT in the same place, so a fresh project is correct.
2. `db/migrations/<date>-gate10-pii-columns.sql` — the live half. **Guarded and idempotent. NOT RUN
   by the authoring session — Michael's hand, per the CL-2 / CD-1 / grok-fixes precedent.**
3. The migration carries **verification checks answered IN WORDS**, in the house pattern: the column
   exists and is `date`; the table exists with `party_id` as PK; `authenticated` reaches it
   (`has_table_privilege`); `anon` does not; the §5 report returns zero rows.
4. **ORDERING: this file has no prerequisite among the unrun migrations — there are none left.** All
   three pending migrations ran 2026-08-19. **State the order the file expects anyway, and make the
   DDL match the sentence** — the `2026-08-18-grok-review-fixes.sql` header stated an order its own
   DDL could not execute (`#113`), and that failure is three days old.
5. Update the `/diagnostics` probe's table list — it covered 36 and this makes 37. **`file_counters`
   is protected at the privilege layer, not by RLS; keep the probe in step or a missing GRANT
   hides.**
6. No front-end work is specified here. See `G10-3`.
