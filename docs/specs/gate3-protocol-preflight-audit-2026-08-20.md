# GATE-3 PROTOCOL — ADVERSARIAL PRE-RUN AUDIT (Fable, 2026-08-20)

**Status:** dated single-run record; a later audit gets a later file.
Canonical repo path (PROPOSED): `docs/specs/gate3-protocol-preflight-audit-2026-08-20.md`
**Authored:** 2026-08-20 Central, design session, Cowork, **Fable 5** — the session was switched to
Fable by Michael's `/model` command mid-evening, and this audit is the §7.2 act that switch was for:
an adversarial audit, run where the repo can actually be checked (bridge at `2a6ae67`).

**SUBJECT:** `docs/specs/gate3-write-path-test-protocol.md` at HEAD, audited BEFORE its first run —
which Michael has now ruled will be against the **LIVE** database (`Q-G3-1`, 2026-08-20), making
this the last check before fixture rows touch the project that will hold client data.

**METHOD:** not prose review. The audit **derived every fixture the protocol's Step 1 will have to
derive**, by parsing `db/schema.sql` at HEAD — per table: NOT-NULL-no-default columns, their types,
inline and table-level CHECK constraints, UNIQUE constraints — and asked where the protocol's own
derivation rule breaks. Commands and parser inline in the session record; every finding below is
disconfirmable against the schema.

---

## §1 — THE MATERIAL FINDING: the derivation rule as written FAILS ON 16 OF 36 TABLES

Protocol §5.2: *"fill scalars with tagged fictional values and FK columns with the id of the parent
fixture."* **Sixteen policy-bearing tables carry a required column whose CHECK constraint is a
literal `IN (...)` list — a tagged fictional string in those columns fails SQLSTATE `23514` before
RLS is ever consulted:**

`parties` (`kind`) · `contact_edges` (`edge_type`) · `medical_bills` (`bill_type`) ·
`code_mappings` (`mapping_source`) · `analysis_result_lines` (`tier`) · `review_log` (`action`) ·
`legal_rules` (`scope`) · `fee_schedules` (`source_type`) · `generated_documents` (`doc_type`) ·
`transcripts` (`context_type`) · `routing_decisions` (`action`) · `oaa_intakes` (`tier`) ·
`watch_flags` (`kind`) · `watch_targets` (`kind`) · `tracked_bills` (`status`) ·
`bill_statute_refs` (`match_confidence`)

The protocol's S-5 classifies a `23514` correctly — *"a defect in the FIXTURE, not a result about
RLS"* — **but sixteen S-5 stops is a parade, not a sitting.**

**THE FIX IS MECHANICAL AND STAYS INSIDE §5.2's OWN PRINCIPLE** (derived by program from
`db/schema.sql`, nothing hand-typed): **for a CHECK-IN-LIST column, take the FIRST LITERAL from the
CHECK's own list.** The allowed values are part of the schema; reading them is derivation, not
invention. **This is an EXTENSION of the written rule and is marked as such** — the as-built-keys
precedent: the ruled text is not edited, the run session applies the extension on evidence and
labels it. The remaining tagged-string columns keep the tag so every row stays identifiable and
teardown-sweepable.

## §2 — THE GAP NOBODY HAD NAMED: how does a Code session get SIGNED IN?

The protocol tests signed-out vs signed-in. Signed-out is trivial (the anon key in `.env`).
**Signed-in is not: auth is MAGIC-LINK ONLY (AUTH-1) — there is no password to script, no
service-role key on the machine (checked 2026-08-20, and using one would bypass RLS and invalidate
the test anyway).** The signed-in half must run as the real `authenticated` role, i.e. with a real
user JWT.

**RESOLUTION, named as a Step 0 precondition rather than discovered mid-sitting:** Michael signs
into the app in his browser exactly as always, and hands the session's **access token** to the
driving script (visible in the browser session; the kickoff prompt says where). The script runs the
signed-in half under that token. **Two limits carried with it:** the token expires (~1 hour by
default), so the signed-in half runs inside one window or refreshes; and the token is a live
credential — **it goes into the script's environment for the sitting and into no file, no log entry,
no packet, nothing committed.**

## §3 — CHECKED AND CLEAN (so the run doesn't re-derive it)

- **UNIQUE constraints:** all satisfied by per-run random tags and one-fixture-per-table —
  `case_roster_flags unique(case_party_id)`, `case_client_flags unique(case_id)`,
  `case_clients unique(case_id, party_id)`, `statute_chapters unique(code, chapter)`,
  `contact_edges` four-column unique. **Idempotence rests on verified teardown plus per-run tags**,
  both already in the protocol.
- **FK graph:** the five-tier order in protocol §4 re-verified against the schema; no required-FK
  cycle; teardown 4→0 is consistent with every constraint.
- **`fee_schedule_rates.rate numeric(12,2)`** — flagged by the audit parser as an odd type; **the
  parser's own false positive** (its type list lacked parameterized numerics). Fills with a tagged
  number. Recorded because an audit that hides its instrument's misses invites trust it hasn't
  earned.
- **The deny control:** `file_counters` scoring by MESSAGE TEXT (privilege vs RLS wording) stands as
  the protocol amended it; nothing found against it.

## §4 — VERDICT

**RUN, with the kickoff prompt carrying §1's derivation extension and §2's token precondition.**
No protocol edit is required — the protocol's S-5 and Step 1 already route both classes correctly;
the kickoff makes them expected instead of discovered. **Nothing in this audit closes gate 3,
answers `Q-G3-3`–`Q-G3-5`, or substitutes for the run.**
