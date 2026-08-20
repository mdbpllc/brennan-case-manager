# PROMPT — Gate 10 PII Promotion Build Session

**Canonical repo path:** `docs/prompts/PROMPT-gate10-pii-build-session.md`
**Routed:** 2026-08-19 Central (packet `push-to-code_gate10-slice-and-authorization_2026-08-19`).
**What this is:** the kickoff prompt for the gate 10 build session — the authorized PII-promotion
slice. It is a **POINTER, not a spec copy** (QR-2 principle): every scope statement lives in the
authorities read at Step 1. **If anything here conflicts with those docs at HEAD, the docs win and
this prompt gets a correction.**

Michael: open a fresh Claude Code session (Opus by default per the standing model routing; check
`/usage` first and state the reading), then say
"run docs/prompts/PROMPT-gate10-pii-build-session.md".

**Sequencing:** nothing blocks this. All three previously-pending migrations ran 2026-08-19 and the
live database is at 36 tables on PostgreSQL 17.6. **Fire it before gate 3 (the RLS write-path test)**
— this slice adds a table that test would otherwise have to cover twice.

---

You are running the **gate 10 PII promotion build** for brennan-case-manager. The shape, the SSN
scope and the audit limb were all ruled by Michael on 2026-08-19 (session log `#115`), and **the
build was authorized the same day, in its own session, on the CD-1 / FE-D1 pattern.**

**This is a go-live gate, and it sits AHEAD of GL-1's floor.** Its trigger is *before the first real
client record enters the database*. The whole reason it is cheap right now is that
`parties.fields` holds nothing real; after go-live the identical change is a migration over
privileged records.

## Step 0 — Checkout gate (QR-3 pattern)

`git fetch origin`, then confirm: clean working tree, on `master`, HEAD == `origin/master`.
Behind-but-clean fast-forwards and continues. **Dirty, diverged, off-master, or AHEAD of origin
STOPS — tell Michael.** Then check `inbox/`: **if any packet zip is present, STOP — the queue runs
first (MM-1), and this build session never doubles as the queue runner.**

## Step 1 — Read, in this order, all at HEAD

1. **`docs/specs/gate10-pii-slice.md`** — the slice spec. **This is the authority.** Read all of it,
   including §6 (considered-and-not-adopted) and §7 (still open). §6 is a list of rules in disguise:
   every row is something already rejected, and "improving" the design into one of them is the
   failure mode this step exists to prevent.
2. **`docs/specs/Go_Live_Gates.md`**, gate 10 — the gate's own text and trigger.
3. **`docs/specs/grok-external-review-2026-08-18.md`** §3 item 10 (C-4) — the ruling record and its
   stated reason.
4. **`CLAUDE.md`** — binding build conventions.
5. **`docs/specs/BUILD-STATE.md`** — current state. Note it is at the 150-non-blank cap.

## Step 2 — `db/schema.sql`

So a fresh project is correct. Per slice §3:

- `parties` gains `date_of_birth date` (nullable, no index).
- A new `party_pii` block: `party_id uuid primary key references parties (id) on delete cascade`,
  `ssn text`, `drivers_license text`, `drivers_license_state text`, `created_by uuid references
  auth.users (id)`, `created_at`, `updated_at`.
- Its `_touch` and `set_created_by` triggers, `enable row level security`, the `authenticated`
  policy, **and its own explicit GRANT** — an ungranted table is unreachable because Supabase's own
  default ACL withholds the four DML privileges (C-2 as RESTATED 2026-08-19), so each table ships
  its grant.
- **Carry the slice's §3.3 comment about what the policy does NOT do.** It is permissive like every
  other policy here; the protection is that default `parties` reads do not join this table. A later
  reader who believes the policy protects the SSN is worse off than one who knows it does not.

## Step 3 — `db/migrations/2026-08-19-gate10-pii-columns.sql`

The live half. **Guarded and idempotent. YOU DO NOT RUN IT — Michael's hand**, per the CL-2 / CD-1 /
grok-fixes precedent.

- Header states what it does, its authority, and **the order it expects.** There is no prerequisite
  among the migrations — none are pending — **but state that explicitly and make sure the DDL matches
  the sentence.** The `2026-08-18-grok-review-fixes.sql` header stated an order its own DDL could not
  execute; `#113` records that hazard as CAUGHT before the paste, not suffered, and the defect was
  written and found the SAME DAY (this sentence corrected 2026-08-19 — the gate 10 build entry
  names this prompt as the source of the false "rollback" and "three days" claims).
- **Verification checks at the bottom, ANSWERED IN WORDS**, house pattern: `parties.date_of_birth`
  exists and is `date` · `party_pii` exists with `party_id` as PRIMARY KEY and no separate `id` ·
  `has_table_privilege('authenticated','party_pii','select')` is true · **`anon` holds none of the four DML privileges** ·
  the §5 report below returns zero rows.
- **The §5 REPORT, not a backfill.** Query `parties.fields` for keys that look like DOB / SSN / DL.
  **Expect zero rows. If any row returns, the migration STOPS and reports** — moving a value between
  homes is a decision, and this project flags rather than guesses (the CD-1 roster-flag precedent).
  **State in the file that the key list is a heuristic and cannot be exhaustive.**

## Step 4 — Answer `G10-3` and REPORT it

**Does the front end write DOB (or SSN, or DL) into `parties.fields` today?** This was unanswerable
design-side because `src/` is out of the sync and `Q-PR3-1` is unruled — **but `Q-PR3-1` governs
DESIGN sessions, not Code. You may read `src/` freely.**

Check `src/domain/partyRegistry.ts` and the party/intake write paths. **REPORT what you find in the
session-log entry and to Michael. BUILD NO FRONT-END HALF** — see the DO-NOT list.

## Step 5 — `/diagnostics` probe

The probe covered **36** tables; this makes **37**. Keep it in step or a missing GRANT hides.
**`file_counters` is protected at the privilege layer, not by RLS — its 403 is not an RLS result.**

## Step 6 — Health check

Run it. This batch touches `db/` and possibly `src/`, so `QR-6(f)`'s skip limb does not apply.
Report the three figures.

---

## DO NOT

- **Do not run the migration.** Michael's hand, always. Do not connect to the database.
- **Do not build any audit machinery.** `G10-1` was RULED provenance-only: `created_by` /
  `created_at` / `updated_at` and nothing further. The audit limb rides with `O-1`. **Do not add
  `REVOKE UPDATE, DELETE`, history tables, or classifier columns.**
- **Do not build a front-end half.** Step 4 is REPORT ONLY. If the UI writes DOB into `fields`, say
  so and stop — the front-end work needs its own authorization.
- **Do not add a `CHECK` constraint on SSN format.** ITINs and legitimate edge cases exist; a
  constraint that rejects a valid ITIN is worse than none (slice §6).
- **Do not give `party_pii` a separate `id`.** The PK-is-FK shape is what makes two PII rows per
  contact unrepresentable (slice §2).
- **Do not add column-level `REVOKE`s.** They break the app while `authenticated` is the only role;
  that work belongs with gate 2 (slice §1).
- **Do not backfill anything out of `fields`.** Report only (Step 3).
- **Do not store last-4 instead of full SSN.** Ruled 2026-08-19: full SSN stored.
- **Do not widen `anon`.** It holds none of the four DML privileges, and nothing here changes that.
  *(Wording conformed 2026-08-19; the original "It gets nothing, by design" was falsified by the
  2026-08-19 catalog read — O-11.)*
- **Do not touch `case_clients`, `case_parties`, or anything CL-2/CD-1 walked.**
- **Do not double as the queue runner** (Step 0).

## Before you end the session

1. Append a session-log entry. **Per TOC-6, Code sessions never mint `#nn`** — leave it unnumbered.
2. Rewrite `docs/specs/BUILD-STATE.md` in full. **It is at the 150-non-blank cap: displace, do not
   append.** Record that gate 10's **exclusion limb is delivered and its audit limb is explicitly
   owed to `O-1`** — do not let gate 10 read as having delivered auditability.
3. Regenerate `docs/specs/session-log-toc.md` (`TOC-4`).
4. **Push and VERIFY with `git ls-remote`.** Never report "pushed" from an unchecked command; an
   allowlist entry is necessary, not sufficient.
5. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the repo in the Claude project."
   **Then tell him the migration is his to paste**, and where it is.
