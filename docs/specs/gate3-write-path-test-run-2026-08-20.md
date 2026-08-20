# GATE 3 — RLS WRITE-PATH TEST, RUN RECORD

**Status: PROPOSED — single-run record, ONE RUN, not a living document.** Dated on its face and not
to be updated in place; a later run gets a later file.
**It repairs nothing, adjudicates nothing, and authorizes nothing. It proposes no remedy (§7.3).**
**Canonical repo path:** `docs/specs/gate3-write-path-test-run-2026-08-20.md`
**Produced by:** Claude Code (Opus 5) on `mdb-pllc`, driving
`docs/specs/gate3-write-path-test-protocol.md` at HEAD, 2026-08-20 Central
(DT-1: Central clock read 14:10 before any stamp; the shell's UTC date was 2026-08-20 19:10 and was
NOT used as the stamp).
**Authorization:** Michael, in session, 2026-08-20 — *"Let's do the three things right now,"* with
`Q-G3-1` ruled **"Live Supabase project"** and `Q-G3-2` ruled **"Run as written."**
**Repo state at the run:** HEAD `6d90037`, equal to `origin/master` by live `git ls-remote`, working
tree clean, branch `master`, `inbox/` empty.

---

## 0. The verdict, in one line

**CLEAN RUN. 37/37 refused signed out, all at the PRIVILEGE layer; 36/36 policy-bearing tables
accepted signed in; the deny control refused with the privilege message.** No stop condition fired
on the database. **One S-5 fixture defect fired and was corrected in-run** (§6). **Gate 3 is NOT
recorded as closed — that is `Q-G3-4`, Michael's, at the gates re-check.**

---

## 1. The database, named

**`https://youmwwygwbwkpjygwujw.supabase.co`** — project ref **`youmwwygwbwkpjygwujw`**, read from
`.env`'s `VITE_SUPABASE_URL`, the address of record. This is the **LIVE** project, per `Q-G3-1` as
ruled. **S-6 did not fire:** the JWT's `iss` was checked against that ref before any write and
matched.

**Run tag:** `GATE3 067f8a (fictional)` — run id `067f8a`, random per run.
**Signed-in identity:** `michael@brennanstx.com`, `role: authenticated`, `aal1`, session
`b7439d12-667f-45f1-8cba-0188337dc720`, from a magic-link browser session handed to the script for
this sitting. **The token was held in the script's environment only — no file, no log entry, no
commit, and it is not in this report** (audit §2).

**Health baseline before any database work:** `npm test` 322 passed / 26 files; `npm run build`
(`tsc -b` + vite) clean; `npm run lint` (oxlint) exit 0. **No file under `src/` was touched by this
run.**

---

## 2. The 37 × 2 result grid

`†` = created by a migration carrying its own explicit `GRANT`. `*` = one of the four tables
`src/auth/rlsProbe.ts` already write-probed before this run.

| # | table | tier | signed OUT (`anon`) | signed IN (`authenticated`) |
|---:|---|:---:|---|---|
| 1 | `cases` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 2 | `parties` * | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 3 | `review_log` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 4 | `legal_rules` * | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 5 | `transcripts` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 6 | `tag_templates` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 7 | `statute_chapters` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 8 | `watch_targets` * | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 9 | `tracked_bills` | 0 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 10 | `case_parties` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 11 | `contact_edges` † | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 12 | `case_clients` † | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 13 | `case_client_flags` † | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 14 | `party_pii` † | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 15 | `code_mappings` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 16 | `provider_billing_profiles` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 17 | `fee_schedules` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 18 | `calendar_events` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 19 | `transcript_participants` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 20 | `staging_items` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 21 | `glossary_terms` * | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 22 | `charges` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 23 | `oaa_intakes` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 24 | `statute_sections` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 25 | `registry_verification_snapshots` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 26 | `watch_flags` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 27 | `bill_statute_refs` | 1 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 28 | `case_roster_flags` † | 2 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 29 | `medical_bills` | 2 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 30 | `fee_schedule_rates` | 2 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 31 | `routing_decisions` | 2 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 32 | `bill_line_items` | 3 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 33 | `eob_records` | 3 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 34 | `analysis_runs` | 3 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 35 | `analysis_result_lines` | 4 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 36 | `generated_documents` | 4 | DENY — privilege (42501) | **ALLOW** — row landed, deleted |
| 37 | `file_counters` **(deny control)** | 0 | DENY — privilege (42501) | **DENY — privilege (42501)**, as §3 requires |

**Counts:** signed out — `DENY-PRIVILEGE` 37, everything else 0. Signed in — `SUCCESS` 36 across the
36 policy-bearing tables, plus the deny control refusing. **Write coverage moves 5 → 37.**

---

## 3. Every message text, quoted exactly

The signed-out half produced **exactly one distinct message shape across all 37 tables**:

> `permission denied for table <table>`

SQLSTATE `42501`, HTTP 403, on every row. The deny control, signed in:

> `permission denied for table file_counters`

SQLSTATE `42501`, HTTP 403. The one in-run failure, before its fixture was corrected:

> `null value in column "user" of relation "review_log" violates not-null constraint`

SQLSTATE `23502`, HTTP 400. **No refusal anywhere in this run carried the RLS wording**
(*"new row violates row-level security policy for table …"*). Scoring was by MESSAGE TEXT
throughout, never by code alone (§3.1) — the classifier reads the message first and falls through to
the code only when no message pattern matches.

---

## 4. What the signed-out half actually proves — stated in the protocol's own words

`anon` is granted nothing by this repo. All 37 signed-out refusals are **privilege** refusals, and
**none of them is evidence that any RLS policy denies anything. The signed-out half is a control on
the GRANT layer, not on RLS.** That is §6 Step 2's requirement and it is met exactly: a signed-out
refusal carrying the RLS message would have been a finding, and none appeared.

---

## 5. Derived vs. hand-set

**37 of 37 tables derived mechanically. `Q-G3-3` did not fire — nothing was skipped, nothing was
guessed.** Provenance, by cell, from the derivation program's own log:

| source | cells | what it is |
|---|---:|---|
| run tag, by type (`text`) | 57 | `GATE3 067f8a (fictional)` |
| FK → parent fixture id | 29 | the tier-above fixture's returned id |
| **CHECK-IN-LIST → first literal** | **16** | **the audited extension** (audit §1), schema-derived |
| `timestamptz` / `integer` / `numeric` / `boolean` | 7 | tagged number `925870`, `925870.99`, `2099-12-31T00:00:00Z`, `false` |
| §5.1 tag columns (nullable) | 5 | `contact_edges.note`, `case_clients.notes`, `eob_records.document_link`, `analysis_result_lines.notes`, `routing_decisions.suggested_context_type` |
| §5.3 PII columns | 2 | `party_pii.ssn` = `SSN-GATE3-067f8a`, `drivers_license` = `DL-GATE3-067f8a` |
| §5.1 tag column (jsonb) | 1 | `provider_billing_profiles.common_flags` |
| `uuid`, no FK in schema | 1 | `analysis_result_lines.line_item_id` |

**The sixteen CHECK-IN-LIST cells matched the audit's §1 list exactly — same sixteen tables, same
sixteen columns, no more and no fewer.** The extension is labelled here as the audit required: the
ruled §5.2 text was not edited; the run applied the extension on evidence and says so.

**Three classes are NOT pure minimal-row derivation and are marked as such:**

1. **§5.1 tag columns (6 cells).** Six tables have no plain-text column in their required set, so a
   nullable column (or a jsonb one) was set **solely** to carry the run tag, satisfying §5.1's *"every
   row carries a run tag"* and making the row sweepable at teardown. Not part of the minimal row.
2. **§5.3 PII values (2 cells).** Protocol-directed, not derived. Visibly non-real by construction —
   **never a well-formed nine-digit string.**
3. **`analysis_result_lines.line_item_id` (1 cell).** `not null uuid` with **no foreign key in the
   schema**, so there is no parent to derive from. Set to the tier-3 `bill_line_items` fixture id,
   which is the column's semantic parent though nothing enforces it. Type-derived, anchor chosen.

**One support row, not a probe row:** a second `parties` row (`parties#B`) was created to satisfy a
constraint found this run (§7.1) and torn down with the rest. It is not scored in the grid.

---

## 6. The one S-5 event, and it was a fixture defect exactly as S-5 predicts

`review_log`, signed in, first attempt: **`23502`**, `null value in column "user"`. **Recorded as a
FIXTURE defect, never as a result about RLS** — which is S-5's whole point. Cause: the column is
**`"user"`** — a *quoted* identifier, because `user` is a SQL reserved word — and the derivation
parser's column-name pattern required an unquoted name, so the column was invisible to it.
**It is the only quoted column identifier in `db/schema.sql`** (verified by grep: one hit).

Per S-5 the fixture was corrected and **that table alone re-run**, signed in (**ALLOW**, row landed)
and re-probed signed out (**DENY — privilege**), so the grid row is built from a correct fixture on
both halves like every other. **No schema, policy, grant or default privilege was touched** (S-7).

---

## 7. Two schema facts the pre-run audit's parser did not surface

Recorded because an audit that hides its instrument's misses invites trust it has not earned — the
audit's own §3 standard, applied to the audit.

1. **`constraint contact_edges_not_self check (from_contact_id <> to_contact_id)`.** A *named*
   table-level CHECK. The audit's §1 sweep enumerated `IN (...)` lists and its §3 declared the FK
   graph clean, but a named constraint beginning `constraint …` rather than `check (…)` is missed by
   a pattern anchored on the latter. **Without the second `parties` fixture this would have been a
   sixteenth-plus-one `23514` S-5 stop.** The sibling in the same class,
   `case_parties_capacity_pointer_check`, is harmless here — a NULL `capacity_kind` satisfies it.
2. **Two required columns that never say `not null`.** `file_counters.yy` and `party_pii.party_id`
   are `primary key` with no default, hence required. A parser keyed to the literal words `not null`
   omits both. **This mattered most for the deny control:** an incomplete `file_counters` row could
   have refused with `23502` and been read as a refusal, a false control.

**Neither is a defect in the database.** Both are derivation-instrument findings, reported for
routing, not repaired here.

---

## 8. The one permanent mark this run leaves on the live database

**`cases.file_number` defaults to `next_file_number()`, a SECURITY DEFINER function that bumps
`file_counters`. The signed-in `cases` insert therefore consumed file number `26-0002`, and the
`yy='26'` counter is permanently incremented. Teardown deleted the case row and did NOT undo the
counter — and must not:** deleting or decrementing it would corrupt issuance for every later matter.

`db/schema.sql` already rules this harmless on its face — C-6, ruled 2026-08-18: numbers are **not
gapless**, *"holes are normal … and must never be read as missing files."* **So the burn is
anticipated by the design, not a surprise — but neither the protocol nor the pre-run audit names it,
and a run against the live project should not leave an unrecorded mark.** It is recorded here.

**Nothing else persists.** The `before insert … set_created_by` triggers stamped `created_by` with
Michael's user id on the six tables that carry them; all those rows are gone.

---

## 9. Teardown verification (§5.4)

**37 rows deleted, tiers 4 → 0** (36 probe rows + the `parties#B` support row). **Every delete was
verified by re-reading its primary key: 37 of 37 returned zero rows.**

**Then the run-tag sweep, every table re-read for `067f8a`:** 35 tables swept by their tagged text
column — **zero rows, every one.** Two tables cannot be swept that way and are accounted for
individually:

- **`provider_billing_profiles`** — no text column exists at all; its row was verified gone by
  primary key (`provider_party_id`), which is definitive.
- **`file_counters`** — the sweep read was **refused**, `permission denied`, because `select` is
  revoked on it. **Expected, and not a gap: nothing was ever written there** (both attempts refused),
  so there is nothing to sweep.

**S-4 did not fire. No fixture row survives in any table.**

---

## 10. What this run did NOT establish

The protocol's §8, unchanged, plus the one `Q-G3-2` leaves open:

1. **It did not test 36 policies. It tested ONE policy — `for all to authenticated using (true) with
   check (true)` — in force on 36 tables.** All 36 policy bodies are byte-identical; what varied per
   table, and what this run actually measured, is whether the GRANT + RLS pair is live on that table.
2. **`Q-G3-2`, as ruled: UPDATE and DELETE were NOT exercised against `using (true)`.** The run
   exercised INSERT (`with check`) and the implicit `using` on the teardown delete — the teardown
   deletes did succeed signed in, which is not the same as a designed `using`-clause test and is not
   offered as one. **The gap is NAMED here, not resolved.** Whether the gate closes anyway is
   `Q-G3-4`.
3. **It says nothing about `TRUNCATE`, `REFERENCES`, `TRIGGER` or `MAINTAIN`** — the residual
   privileges `anon` and `service_role` hold on all 37 tables. PostgREST cannot reach them, so no
   probe of this shape can see them. Those ride with `O-11`.
4. **It says nothing about column-level exposure.** A permissive `using (true)` returns every column
   to any authenticated user — `G10-2` / `O-1` territory. Note the sharpest instance: this run wrote
   and read back `party_pii.ssn` under that policy.
5. **It does not establish multi-user isolation.** `using (true)` grants every authenticated user
   every row, by design, in a solo practice. **Gate 2's professional security review is where that
   changes, and a clean gate-3 run must not be read as bearing on it.**
6. **It establishes nothing about the four tables' behaviour under the app's own code paths** beyond
   what was already known — this exercised PostgREST directly, not the adapter.

---

## 11. What is open, and whose it is

- **`Q-G3-4` — does a clean run CLOSE gate 3, or close `GL-1` item (4) with gate 3 open on its wider
  text? MICHAEL'S, at the gates re-check. Not answered here, and BUILD-STATE was not changed to say
  otherwise.**
- **`Q-G3-3`** — moot for this run (nothing was underivable); still unruled for future runs.
- **`Q-G3-5`** — whether `src/auth/rlsProbe.ts` should grow to all 37 write paths, retiring the
  FK-free restriction its own comment states. **A build act needing its own authorization.** This run
  demonstrates the fixture derivation is mechanical and that the FK-free restriction is not
  load-bearing; it does not authorize the change.
- **Two derivation-instrument findings (§7)** are reported for routing, unrepaired.
