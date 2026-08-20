# GATE 3 — RLS WRITE-PATH TEST PROTOCOL

**Status:** PROPOSED. Canonical repo path: `docs/specs/gate3-write-path-test-protocol.md`.
**Authored:** 2026-08-19 Central (design session, Cowork, Opus 5), CHAT-DISPATCH v5 task T2.

**WHAT THIS DOCUMENT IS.** A test protocol for `GL-1` floor item **(4)** — *"gate 3 (RLS tested,
including the CD-1 slice's new tables)"* — extended to `party_pii`. It is a **procedure Michael runs
in one sitting with a Code session driving.**

**WHAT IT IS NOT, IN TERMS.** **It authorizes nothing. It is not the test, and running it is not
this document's act.** No schema change, no policy change, no `GRANT`, no `REVOKE`, no
`ALTER DEFAULT PRIVILEGES`, no remedy for anything it finds. **It adjudicates nothing**: every open
question below is PROPOSED and carries a packet-local ID. **Running it is Michael's floor-item
action**, on his authorization, at a time he picks.

**EVERY STRUCTURAL FIGURE BELOW WAS RE-DERIVED FROM `db/schema.sql` AND `db/migrations/*.sql` AT
`beb27f4` THIS SESSION**, by program, not carried from BUILD-STATE or from any prior entry.

---

## §1 — WHAT GATE 3 ASKS, AND WHAT IS ALREADY ESTABLISHED

**Gate 3, verbatim:** *"**RLS policies written and tested** for every exposed table (project was
provisioned 2026-07-25 with automatic RLS on + auto-expose off; default-deny until policies exist).
See gate 6 — policies cannot be meaningfully tested until a sign-in flow exists."*

**Gate 6 (the hard prerequisite) is met** — the auth slice is built and the probe runs signed in and
signed out. So gate 3 is reachable.

**WHAT IS ALREADY CONSULTED, and it is less than it sounds.** Per BUILD-STATE, and confirmed against
`src/auth/rlsProbe.ts` at HEAD:

- **READ probe: all 37 tables.**
- **WRITE probe: exactly 5** — `parties`, `legal_rules`, `glossary_terms`, `watch_targets`
  (expect **allow**) and `file_counters` (expect **deny**).
- Plus the app's own write path and CL-2's live paths.

**THE PROBE SAYS WHY IT STOPS AT FIVE.** Its own comment: *"Fictional probe rows. **Kept to tables
with no foreign-key prerequisites so the probe never has to build a dependency graph of demo
records.**"*

**A FIRST DRAFT OF THIS PARAGRAPH OVERSTATED THAT IN TWO DIRECTIONS AND IS CORRECTED HERE — the
correction matters because the fixture derivation in §6 would have been built on it.** It said *"all
four of its allow-tables are FK-free roots"* and that the untested set is *"everything relational."*
**Both are false against `db/schema.sql` at HEAD:**

- **`glossary_terms` is NOT FK-free** — it carries `case_id uuid references cases (id) on delete
  cascade`, and §4 places it in TIER 1. *(The probe's comment survives anyway, because `case_id` is
  **nullable** and its probe row is `{ term, scope, weight }` — it never supplies a parent. **The
  operative property is "has no REQUIRED parent," not "has no FK."** That distinction is what §5.2's
  derivation must actually implement.)*
- **Six of the 32 untested tables ARE FK-free roots** — `cases`, `review_log`, `transcripts`,
  `tag_templates`, `statute_chapters`, `tracked_bills`. **So the untested set is not "everything
  relational"**; it is 26 relational tables plus six roots the probe simply never added.

**The gap the protocol fills is therefore both wider and plainer than the first draft claimed:
32 of 36 policy-bearing tables have never had a write attempted against them, for no reason
stronger than that nobody extended the list.**

**AND THE PROBE'S OWN METHODOLOGY IS WHY A READ IS NOT ENOUGH:** *"A READ probe CANNOT prove a policy
grants access. Under RLS a denied SELECT returns an EMPTY SET, not an error."* BUILD-STATE puts the
consequence bluntly — *"'37 covered' overstates what is exercised more than sevenfold."*

---

## §2 — THE STRUCTURAL FINDING THAT SHAPES THIS PROTOCOL

**ALL 36 POLICIES ARE BYTE-IDENTICAL.** Extracted from `db/schema.sql` at HEAD, the distinct policy
body set has **exactly one member**:

```
for all to authenticated using (true) with check (true)
```

**So this test is NOT exercising 36 different rule sets.** There is one rule, repeated 36 times.
**What actually varies per table — and therefore what the test is really measuring — is whether the
GRANT + RLS pair is in force ON THAT TABLE in the live database.** The failure this can catch is a
table the privilege layer never reached, which is the **2026-07-28 "401 wall"** in its general form.

**THE REPO SIDE OF THAT RISK IS CLEAN, AND SAYING SO SHARPENS THE TEST RATHER THAN EXCUSING IT.**
Every table created by a migration carries **its own explicit `GRANT`** in the same file:

| migration | creates | grants |
|---|---|---|
| `2026-07-28-cl2-client-dimension.sql` | `case_clients`, `case_client_flags` | both, explicitly |
| `2026-08-12-cd1-contact-directory.sql` | `case_roster_flags`, `contact_edges` | both, explicitly |
| `2026-08-19-gate10-pii-columns.sql` | `party_pii` | explicitly |

The remaining 31 tables rely on `db/schema.sql`'s schema-wide
`grant select, insert, update, delete on all tables in schema public to authenticated`.

**THAT IS EXACTLY WHY THE TEST IS STILL WORTH RUNNING.** A schema-wide grant covers the tables that
**existed when it ran**. The repo asserts the live database matches; **nothing has read the live
database table-by-table to confirm it.** BUILD-STATE calls the current position what it is: *"PRESENT
BUT UNTESTED: every other policy-bearing write path — **an inference**."* **This protocol replaces an
inference with a reading.**

---

## §3 — THE DENY CONTROL, AND A CORRECTION TO HOW IT IS USUALLY DESCRIBED

**`file_counters` MUST REFUSE. It refuses at the PRIVILEGE layer, NOT by RLS, and the protocol must
score it that way or it will report a false pass.**

Evidence, from the schema at HEAD:

- `db/schema.sql`: `grant select, insert, update, delete on all tables in schema public to
  authenticated;` **followed by** `revoke all on file_counters from authenticated;`
- `db/migrations/2026-07-28-api-role-grants.sql` carries the same revoke, so the live database has it
  on the migration path too.
- `file_counters` also has **RLS enabled and zero policies** — but **the privilege check fires
  first**, so RLS never gets to speak.

BUILD-STATE states it: *"**`file_counters` is protected at the PRIVILEGE layer, not by RLS — its 403
is NOT an RLS result.**"* `src/auth/rlsProbe.ts` already encodes it as a typed `DenialLayer`:
`{ table: 'file_counters', expect: 'deny', expectLayer: 'privilege', … }`.

**CONSEQUENCES THE PROTOCOL MUST HONOR:**

1. **SCORE BY MESSAGE, NOT BY CODE.** Both denials return SQLSTATE **`42501`**. They differ in text:
   - RLS refusal → *"new row violates row-level security policy for table …"*
   - Privilege refusal → *"permission denied for table …"*
   **A test that reads only the code cannot tell them apart, and would score a privilege refusal as
   proof that RLS works.**
2. **`file_counters` PASSING PROVES NOTHING ABOUT RLS.** It proves the revoke is live. It is a
   control for *the harness* — evidence the test can observe a refusal at all — not evidence about
   any policy.
3. **CHAT-DISPATCH v5's T2 brief says *"`file_counters` is the deny control — the protocol must test
   that it REFUSES."* That is right, and this section is the qualification it needs:** it must
   refuse **with the privilege message**. A `file_counters` insert that failed with the *RLS* message
   would itself be a finding — it would mean the revoke is not live.

---

## §4 — THE ENUMERATION: 37 TABLES, PER-TABLE EXPECTED RESULT

**Re-derived at HEAD: 37 `create table` · 37 `enable row level security` · 36 `create policy`.**
The 37/36 gap is `file_counters` and is deliberate — **never "correct" 36 to 37 for symmetry.**

Each table is probed **twice**: once **signed out** (`anon`) and once **signed in**
(`authenticated`). **The pair is the evidence; neither half alone is.**

**EXPECTED RESULT, EVERY ROW:**

| | signed OUT (`anon`) | signed IN (`authenticated`) |
|---|---|---|
| **the 36 policy-bearing tables** | **DENY** — refusal, no row lands | **ALLOW** — row lands, then is deleted |
| **`file_counters`** | **DENY** | **DENY**, and **with the PRIVILEGE message** (§3) |

**The 36 policy-bearing tables, in FK-dependency tiers** (§6 explains why the tiers are the running
order). `†` = created by a migration and carrying its own explicit `GRANT`.

**TIER 0 — no FK prerequisites (9 policy-bearing, + the deny control):**
`cases` · `parties` \* · `review_log` · `legal_rules` \* · `transcripts` · `tag_templates` ·
`statute_chapters` · `watch_targets` \* · `tracked_bills` — and **`file_counters`** (deny control).

**TIER 1 — one level of parents (18):**
`case_parties` · `contact_edges` † · `case_clients` † · `case_client_flags` † · `party_pii` † ·
`code_mappings` · `provider_billing_profiles` · `fee_schedules` · `calendar_events` ·
`transcript_participants` · `staging_items` · `glossary_terms` \* · `charges` · `oaa_intakes` ·
`statute_sections` · `registry_verification_snapshots` · `watch_flags` · `bill_statute_refs`

**TIER 2 (4):** `case_roster_flags` † · `medical_bills` · `fee_schedule_rates` · `routing_decisions`

**TIER 3 (3):** `bill_line_items` · `eob_records` · `analysis_runs`

**TIER 4 (2):** `analysis_result_lines` · `generated_documents`

`\*` = one of the four the existing probe already write-tests. **Coverage moves 5 → 37.**

---

## §5 — THE FIXTURE-DATA-ONLY RULE (binding, and it is a gate rule, not a preference)

**Go_Live_Gates gate 5 and the standing project rule: no real client data, ever — including anything
created to exercise RLS.** `src/auth/rlsProbe.ts` already says it: *"Every row written is fictional
and is deleted immediately."*

1. **EVERY value is fictional.** No real name, case, provider, cite, phone, address, SSN or licence
   number — **not even a plausible-looking one**. Every row carries a run tag, e.g.
   `GATE3 <runid> (fictional)`, in its most human-visible text column.
2. **NOTHING IS TYPED BY HAND OR BY MODEL.** Minimal rows are **derived by program from
   `db/schema.sql` at HEAD**: for each table take the columns that are `not null` **without a
   default**, fill scalars with tagged fictional values and FK columns with the id of the parent
   fixture created in the tier above. The derivation script is part of the test artifact and its
   output is recorded. *(This is the house discipline — extracted by program, never retyped — and
   here it also removes the chance of a hand-typed value resembling a real record.)*
3. **`party_pii` GETS NO REAL-SHAPED SECRET.** Its `ssn` and `drivers_license` fixture values are
   visibly non-real (e.g. `SSN-GATE3-<runid>`), **never a well-formed nine-digit string.**
4. **TEARDOWN IS PART OF THE TEST, NOT AN AFTERTHOUGHT.** Rows are deleted in **reverse tier order**
   (4 → 0). **The teardown is then VERIFIED by re-reading**: a `select` per table for the run tag
   must return **zero rows**. **An unverified delete is not a deletion** — the QR-5(b) rule, applied
   here because the same failure shape applies.
5. **IF TEARDOWN CANNOT COMPLETE, THAT IS A STOP** (§7), not a cleanup task for later.
6. The test runs against **whatever database Michael points it at**. If that is the live project,
   items 1–5 are what keep gate 5 intact. **This protocol takes no position on which** — but it does
   not pretend the choice is symmetric either, and a first draft's *"does not prefer one"* was too
   comfortable given that §2's whole argument is that only a live run replaces an inference. **The
   honest statement: a live run is the only one that answers the question §2 poses, and it is also
   the one that writes fixture rows into the database that will hold real client matter. That trade
   is `Q-G3-1` and it is Michael's — the protocol argues the first half and does not decide the
   second.**

---

## §6 — EXECUTION ORDER (one sitting, a Code session driving)

**Why tiers.** A permissive `with check (true)` policy cannot be exercised by an insert that never
reaches it: a **missing FK parent fails at the constraint layer (`23503`) before RLS is consulted**,
and would be scored as a policy failure. **Building parents first is what makes the result mean
anything.**

**STEP 0 — PRECONDITIONS (all four, or stop).**
1. Michael has **authorized this run**, in session, and it is recorded.
2. **Which database** is named out loud and written down.
3. Checkout at origin HEAD, clean, on `master` — the QR-3 gate, unchanged and not overridden here.
   **A note for a bridge-driven session, and it is a FLAG, not a licence to proceed:** a
   `git status` read through the device bridge can report a large number of files modified on a
   clean tree — carriage-return-only differences arising from Windows `core.autocrlf` against a
   Linux-side git with it unset. **The count is not stable and no figure should be carried.** **This
   is a PROPOSED observation (post-sync verification §1.1, 2026-08-19) and Michael has not ruled it
   into the operational notes** — so it does not by itself clear a QR-3 stop. **Settle it by
   comparing each file's committed blob against its worktree bytes with CR stripped, or run this
   gate on Michael's own shell.** Anything short of that, the stop stands.
4. **`inbox/` is empty and no queue-runner session is running anywhere** (MM-1). This test is not the
   queue runner and never doubles as it.

**STEP 1 — DERIVE, DON'T DECIDE.** Generate the minimal fixture rows per §5.2 from `db/schema.sql` at
HEAD. **Print the derived rows and the tier assignment for Michael to see BEFORE anything is
written.** A table whose minimal row cannot be derived mechanically is **reported, not guessed at**
(`Q-G3-3`).

**STEP 2 — SIGNED OUT FIRST, ALL 37.** Attempt one insert per table as `anon`. **Expect 37
refusals.** Signed-out runs first because it **writes nothing when it passes** — the cheap half, and
the half whose failure is most serious. **Record the same four fields Step 3 records — outcome,
SQLSTATE, message text, any row id.** *(A first draft recorded nothing here, which would have made
the §6 Step 6 report impossible to write and would have thrown away the evidence for the point
below.)*

**AND SCORE THIS HALF FOR WHAT IT ACTUALLY PROVES — the §3 qualification applies to all 37 rows,
not just to `file_counters`.** `anon` is granted **nothing** by this repo: `db/schema.sql` grants
only to `authenticated`, so **all 37 signed-out refusals will be PRIVILEGE refusals** —
*"permission denied for table …"* — **and none of them is evidence that any RLS policy denies
anything.** The signed-out half proves the grants are absent. **It is a control on the grant layer,
not on RLS**, and the report must say so in exactly those words. *(A signed-out refusal carrying the
**RLS** message would itself be a finding — it would mean `anon` holds a grant this repo never
issued.)*

**STEP 3 — SIGNED IN, TIER BY TIER, 0 → 4.** Within a tier, order does not matter. Record per table:
outcome, SQLSTATE, **the message text**, and the id of any row that landed.

**STEP 4 — THE DENY CONTROL.** `file_counters`, signed in. **Expect refusal with the PRIVILEGE
message** (§3).

**STEP 5 — TEARDOWN, tiers 4 → 0, then VERIFY by re-reading** (§5.4).

**STEP 6 — REPORT.** A dated single-run record, on the C1 pattern — *not* a living document; a later
run gets a later file. It states: the database, the run tag, the 37×2 result grid, **every message
text quoted exactly**, what was derived vs. what was hand-set, teardown verification, and **an
explicit list of what the run did NOT establish** (§8). **The report proposes no remedy for anything
it finds** (§7.3).

**STEP 7 — CLOSE-OUT, because a Code session drives this inside the repo.** *(Absent from a first
draft, which defined a report file and stopped — leaving a Code session with no instruction on the
one series it must not mint.)*

1. **Append a session-log entry. Per TOC-6 the `#nn` series is DESIGN-ONLY — a Code session mints
   NO `#nn` and no runner ordinal; leave the entry unnumbered.**
2. **This is not the queue runner** and never doubles as it (MM-1, Step 0.4).
3. **BUILD-STATE:** the write-probe coverage figure — today *"probe READS all 37 … but WRITE-probes
   only 5"* — is the sentence this run bears on. **Rewrite in full under the 150-non-blank cap,
   displace don't append, preserve the anti-resurrection pointer, and RECOMPUTE every count from the
   files at HEAD** (OPEN-5(a)). **Do not record gate 3 as closed** — that is `Q-G3-4`, a ruling.
4. **Regenerate `docs/specs/session-log-toc.md`** in full over the log (`TOC-4`).
5. **Push, and VERIFY with a bare `git ls-remote origin refs/heads/master`.** An allowlist entry is
   necessary, not sufficient. **The log entry may assert no post-commit action** (QR-5(a)) — report
   the push result to Michael in session.

---

## §7 — STOP CONDITIONS (explicit; each stops the run and reports)

**S-1. ANY SIGNED-OUT INSERT SUCCEEDS.** Stop immediately — do not continue to signed-in. **An
`anon` write landing on any table is the most serious result this test can produce.** **CAPTURE THE
EVIDENCE FIRST, THEN REMOVE THE ROW:** record the table, the full returned row, the SQLSTATE-free
success response and the row id **into the report**, and only then delete the row — **and verify the
delete by re-reading.** *(A first draft said "delete the row before anything else," which would have
destroyed the artifact that is the entire finding. The row is fixture data, so removing it is right;
removing it unrecorded is not.)* **Do not diagnose. Do not remedy. Tell Michael the same hour.**

**S-2. A SIGNED-IN INSERT IS REFUSED ON A POLICY-BEARING TABLE.** Stop **that tier**, record the
message verbatim, and **do not "fix" it by adding a GRANT.** This is the 401-wall class and the
finding is the point of the test.

**S-3. `file_counters` ACCEPTS A SIGNED-IN INSERT** — or refuses with the **RLS** message rather than
the privilege message. Either is a finding about the live grant state (§3.3).

**S-4. TEARDOWN CANNOT COMPLETE, or the verification re-read returns rows.** Stop and report **which
rows survive, in which tables, by id.** **Do not leave the session without telling Michael exactly
what is still in the database.**

**S-5. AN INSERT FAILS WITH ANYTHING OTHER THAN `42501` OR A CLEAN SUCCESS** — a `23503` FK failure, a
`23502` not-null failure, a `22P02` type failure. **That is a defect in the FIXTURE, not a result
about RLS**, and it must never be recorded as one. Fix the fixture derivation, re-run that table.

**S-6. THE DATABASE IS NOT THE ONE NAMED AT STEP 0.2.** Stop.

**S-7. ANY IMPULSE TO CHANGE SCHEMA, POLICY, GRANT OR DEFAULT PRIVILEGES.** Stop and put it to
Michael. **This protocol writes fixture rows and deletes them. It changes nothing else, ever.**

---

## §8 — WHAT A CLEAN RUN DOES **NOT** ESTABLISH (so the gate is not overclaimed)

1. **It does not test 36 policies.** It tests one policy, in force on 36 tables (§2).
2. **It does not exercise UPDATE or DELETE against RLS** as written — only INSERT (`with check`) and
   the implicit `using` on the teardown delete. **A separate `using`-clause test is not in this
   protocol** (`Q-G3-2`).
3. **It says nothing about `TRUNCATE`, `REFERENCES`, `TRIGGER` or `MAINTAIN`** — the residual
   privileges `anon` and `service_role` hold on all 37 tables. **PostgREST cannot reach them, so no
   probe of this shape can see them** (the instrument problem, recorded twice on 2026-08-19). Those
   ride with `O-11` and are **not** what gate 3 asks about.
4. **It says nothing about column-level exposure** — a permissive `using (true)` returns every column
   to any authenticated user. That is `G10-2` / `O-1` territory.
5. **It does not establish multi-user isolation.** `using (true)` grants every authenticated user
   every row **by design, in a solo practice**. **Gate 2's professional security review is where that
   changes**, and a clean gate-3 run must not be read as bearing on it.

---

## §9 — OPEN QUESTIONS (packet-local IDs; all PROPOSED, none decided here)

- **`Q-G3-1`** — **Does this run against the LIVE Supabase project, or against a throwaway project
  restored from schema?** Live tests what is actually deployed, which is the whole point of §2 — but
  it writes fixture rows into the database that will hold real client data, under gate 5 and with
  gate 1's backups now in place. A throwaway proves the *repo* is correct and proves nothing about
  the live grant state. **Michael's, and it is the first question because everything else follows
  from it.**
  *(**RULED 2026-08-20 — "Live Supabase project."** Recorded at `#121`; the run is AUTHORIZED and the
  kickoff is `docs/prompts/PROMPT-gate3-write-path-test.md`. Fixture-only plus verified teardown is
  what keeps gate 5 intact; the Fable pre-run audit is
  `docs/specs/gate3-protocol-preflight-audit-2026-08-20.md`.)*
- **`Q-G3-2`** — **Does gate 3 close on INSERT alone, or must UPDATE and DELETE be exercised
  against `using (true)` too?** Gate 3's words are *"written and tested."* This protocol reads that
  as the write path; §8.2 names what that leaves. **Scope is Michael's.**
  *(**RULED 2026-08-20 — "Run as written."** Recorded at `#121`. The UPDATE/DELETE gap stays NAMED in
  the run report's did-NOT-establish list; whether the gate closes anyway is `Q-G3-4`, still OPEN,
  his, at the gates re-check.)*
- **`Q-G3-3`** — **What happens to a table whose minimal fixture row cannot be derived mechanically?**
  Options: hand-set the row and mark it as hand-set in the report; skip the table and record the skip
  with its reason; or stop the run. **A silent skip is not among them** — no silent caps.
- **`Q-G3-4`** — **Does a clean run CLOSE gate 3, or does it close GL-1 item (4) while gate 3 stays
  open on its wider text?** Gate 3 says *"every exposed table"*; this covers all 37 for INSERT.
  §8's five limits are what a closure would have to be read against. **Whether the gate closes is a
  ruling, not a test result.**
- **`Q-G3-5`** — **Should `src/auth/rlsProbe.ts` grow to cover all 37 write paths**, retiring the
  FK-free restriction its own comment states — so this is a standing instrument rather than a
  one-time protocol? That is **a build act needing its own authorization**, and it is named here only
  so the choice is visible.
