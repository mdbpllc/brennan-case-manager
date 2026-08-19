# Grok External Review — DB Schema + RLS: Trial, Reconciliation, and Rulings

**STATUS:** §3's twelve rulings are RULED (Michael, 2026-08-18 Central, item by item). Everything
else in this document is PROPOSED or OPEN exactly as marked. Canonical repo path:
`docs/specs/grok-external-review-2026-08-18.md`.

**DT-1 note:** the design session ran past 19:00 Central; the container clock read 2026-08-19
during authoring. All stamps here are Michael's Central date, 2026-08-18. Two hand-documents
produced earlier in the same conversation (the Grok prompt doc and the reconciliation doc, never
routed to the repo) carry container-clock 2026-08-19 stamps; they stand as delivered and this
line is the correction. Grok's own output file is named 2026-08-19 by Michael's hand — his
naming, unaltered.

---

## §1 Trial provenance

First use of an outside-vendor model as an adversarial reviewer. Protocol (designed this
session, hand-carry both ways): Michael pasted a scoped prompt into Grok with client-clean repo
files attached; Grok reviewed BLIND — no known-open items disclosed, so duplicates it re-found
independently count as corroboration of the inside record, not noise. Grok's output returned by
Michael's hand as EXTERNAL COMMENTARY (Grok's own closing line mislabeled it "REQ-CAPTURE" —
wrong channel; REQ-CAPTURE is the practice-project format. Recorded, not adopted). Under
registry discipline Grok is a model: its findings are flags/locators, never authority, never
verification.

**Files given:** `db/schema.sql`; `db/migrations/2026-07-28-api-role-grants.sql`;
`db/migrations/2026-08-12-cd1-contact-directory.sql`; `supabase/functions/statute-fetch/index.ts`;
`supabase/functions/legiscan-poller/index.ts`. **NOT given (upload failed / omitted):**
`db/migrations/2026-07-28-cl2-client-dimension.sql` — **the already-run CL-2 backfill is
UNSCORED by this review** (open item O-4).

**Output:** 30 findings (F-1…F-30), 7 challenges (C-1…C-7), a checked-and-clean section, and 8
uncertainties. Full text as carried: Appendix A. The 1,172-line original remains in Michael's
hands.

## §2 Reconciliation triage (design side, same day)

Verification statuses: **CONFIRMED-AT-SYNC** — quoted DDL matched the design side's synced repo
text verbatim (sync can lag HEAD; final confirmation is §V's job). **CONSISTENT** — plausible,
uncontradicted, not independently retrieved design-side; needs the §V HEAD read. **JUDGMENT** —
design position, not a DDL fact.

| ID | Sev | Class | Verification |
|----|-----|-------|--------------|
| F-1 file-number RPC PUBLIC-executable | HIGH | real+new | CONFIRMED-AT-SYNC |
| F-2 file_number mutable after issue | HIGH | real+new | CONFIRMED-AT-SYNC |
| F-3 year from UTC now() | HIGH | real+new | CONFIRMED-AT-SYNC |
| F-4 unique key vs capacity model | HIGH | real+new | CONFIRMED-AT-SYNC |
| F-5/F-6/F-7/F-11 cascade-retention cluster | HIGH | real+new | F-11 CONFIRMED-AT-SYNC; rest CONSISTENT |
| F-8 privilege audit gap / vocabularies | HIGH | split | audit half new; vocab half = Q-COM-10/WS-4 duplicate |
| F-9 verified legal_rules mutable | HIGH | real+new | CONSISTENT |
| F-10 code_mappings key | HIGH | real+new | CONSISTENT |
| F-12 CD-1 party_status no-op | HIGH | real+new | CONFIRMED-AT-SYNC (CD-1 unrun) |
| F-13 free-text practice_area | HIGH | duplicate of PR-3 record + new timing clause | CONFIRMED (both facts already on record) |
| F-14 poller service-role exposure | HIGH | half known (spec-feedback), cron-secret new; latent — functions undeployed | part known |
| F-15…F-26, F-28, F-30 | MED/LOW | real+new pending verification | CONSISTENT |
| F-27 stale grant-block counts | LOW | real+new | CONFIRMED in substance |
| F-29 statute-fetch open proxy | LOW | posture note | CONFIRMED-AT-SYNC |
| C-1…C-7 | — | challenges to documented/ruled choices | JUDGMENT |

**Class (d) — wrong: none established.** Final (d) verdicts belong to §V.

## §3 THE TWELVE RULINGS — Michael, 2026-08-18, each put independently

1. **F-1 — RULED: narrow fix now.** `revoke execute on function next_file_number() from public;`
   ships in this batch. The full trigger redesign (BEFORE INSERT issuance, revoke from
   authenticated) is DEFERRED as its own item (O-6). *Reason: closes the anon burn path with
   zero behavior change; the redesign changes the insert path and deserves its own tested slice.*
2. **F-2 — RULED: adopt the freeze.** BEFORE UPDATE trigger raising if `cases.file_number`
   changes. *Reason: issued numbers are on letters; no legitimate workflow relabels one.*
3. **F-3 — RULED: fix both to Central.** `next_file_number()` derives the year from
   `now() at time zone 'America/Chicago'`; `cases.date_opened`'s default likewise converted.
   *Reason: the same UTC-drift class the project has already paid for twice (v0.1 date-opened
   bug; DT-1's origin exhibit). The date_opened half was a Claude-added observation, adopted.*
4. **F-4 + F-18 — RULED: widen key + pointer CHECK, BEFORE CD-1 runs.**
   `unique nulls not distinct (case_id, party_id, role, capacity_kind, capacity_points_at_party_id)`
   — Code verifies Postgres major version ≥ 15 FIRST and stops if not — plus a CHECK that
   `next-friend-of` / `representative-of-estate-of` / `dba` require
   `capacity_points_at_party_id`. *Reason: the existing key and CD-1's own ruled capacity model
   cannot both operate; mother-as-next-friend is routine in this practice.*
5. **F-12 — RULED: write the value.** CD-1 step (d) becomes
   `party_status = coalesce(party_status, 'non-party-actor')`. *Reason: definitionally true for
   the function roles that UPDATE targets, per the migration's own comment — not a guess, so the
   never-guess principle is not offended.*
6. **F-27 — RULED: fix, recomputed at HEAD.** The executing Code session recounts tables and
   policies from the DDL at HEAD (never copies Grok's 36/35) and corrects the grant-block
   comment — or replaces literal counts with count-free wording so it cannot go stale again.
   *Reason: the recompute-never-copy convention (OPEN-5(a)'s logic applied to a comment).*
7. **F-25 — RULED: adopt, columns + trigger now.** `created_by uuid references auth.users` on
   the core operational tables (Grok's named five: `cases`, `parties`, `transcripts`,
   `medical_bills`, `generated_documents`), populated by an `auth.uid()` trigger. **NO per-user
   RLS** — that stays behind the security-review gate. *Reason: cheapest honest multi-user
   pre-positioning; one-value data today, provenance the day a second login exists.*
8. **C-1 — RULED as principle.** Retain-worthy children (bills, confirmed analysis runs,
   generated documents, charges, OAA intakes, roster history) must not physically cascade away;
   RESTRICT + soft-delete (`deleted_at`) is the target shape. **The Code verification pass maps
   exactly which FKs change; the specific DDL RETURNS FOR MICHAEL'S SIGN-OFF before executing**
   (O-7). *Reason: a today problem for the sole user, and a law practice's retention duties.*
9. **C-2 — RULED: keep current posture.** Explicit per-migration grants stand;
   `ALTER DEFAULT PRIVILEGES` stays unset. *Reason: chosen deliberately twice; has held since
   the #28 outage (CL-2 and CD-1 both shipped same-file grants). Grok's migrator-role middle
   path recorded as considered, not adopted.*
10. **C-4 — RULED: adopt pre-go-live.** DOB/SSN/DL promote from `parties.fields` jsonb to
    dedicated columns before any real client record enters; lands as a go-live-gate item so it
    cannot be forgotten. *Reason: promoted columns are excludable from API selects and
    auditable; the cheap moment is before real data.*
11. **C-6 — RULED: requirement restated.** The file-number requirement is **"unique,
    year-scoped, not client-assigned."** The "gapless" claim comes out of the schema header;
    holes are documented as normal. *Reason: the schema cannot keep the gapless promise
    (F-1-class burns, deleted cases) and operators would misread holes as missing files.*
12. **C-7 — RULED: declined. D-CL2-8 stands.** No existence constraint between `case_clients`
    and `case_parties`. *Reason: the orphan-bill harm is addressed by the C-1 cluster's RESTRICT
    on `medical_bills.client_id`; the parallel structure was ruled deliberately and is not
    amended. Grok's point recorded as considered and declined.*

## §4 Open and deferred (see the packet's §7 for the queue rows)

O-1 F-8a audit-integrity package (classifier columns, freeze, `REVOKE UPDATE, DELETE ON
review_log`) — sequenced after WS-4 list adoption · O-2 F-13's CHECK-now clause — rides the
PR-3 ruling · O-3 F-14 cron-secret + F-29 + Grok Uncertain #4 — fold into the edge-function
deploy work order · O-4 CL-2 backfill unscored — Grok follow-up or Code probe, Michael's choice ·
O-5 whether external review becomes a repeatable pattern — Claude's position is that it earned a
repeat (category-(a) yield below); PROPOSED, unruled · O-6 F-1 trigger redesign slice ·
O-7 C-1 cascade DDL sign-off, after §V's map.

## §5 Trial verdict (the question the run existed to answer)

Blind category-(a) yield from an outside model: F-1, F-2, F-3, F-4, F-12 confirmed at
sync-level; F-27 in substance; the retention cluster and F-9 pending only a HEAD read; plus
F-8's audit half and C-4. Blind re-finds of Q-COM-10 (as C-3) and PR-3's free-text facts (as
F-13) corroborate the inside record. The run found real defects the inside view had not written
down. Whether the pattern repeats is O-5 — Michael's ruling.

## §V VERIFICATION RESULTS — APPENDED BY THE EXECUTING CODE SESSION

*(Work order §5-B in the packet. Append below this line a table: finding ID | verdict
CONFIRMED/REFUTED/PARTIAL | the command that produced it, per QR-6(a) — a command that cannot
disconfirm is not a verification. Cover: F-5, F-6 [count the CASCADEs], F-7, F-9, F-10, F-15,
F-16, F-17, F-19, F-20, F-21, F-22, F-23, F-24, F-26, F-28, F-30; exact table/policy counts for
F-27; Postgres major version for ruling 4; constraint-name check for F-23. REFUTED rows are
class-(d) verdicts against Grok — state them plainly.)*

### Results — appended 2026-08-18 by the executing Code session

**Basis and its limits, stated first.** Every command below was run against the working tree at
**HEAD `33a6c74`, before this batch applied any of the §3 rulings** — so these verdicts describe
the schema Grok actually reviewed, not the schema as amended tonight. Read-only throughout; no
command in this table wrote anything. Per QR-6(a) each verdict names the command that produced
it, and each command could have returned a disconfirming answer.

**Method note that changed the results.** `db/schema.sql` is **CRLF**, and Git Bash's `grep`/`od`
silently strip `\r` — so an early line-ending check reported LF and was wrong. Every count below
was re-derived by reading the file in **binary** or through Python, not through shell text tools.
A check that cannot announce its own failure is not a verification, and this one nearly wasn't.

**Headline: of the seventeen findings §V put to a HEAD read, sixteen are CONFIRMED and one is
PARTIAL. There are no REFUTED rows — no class-(d) verdict was established against Grok.** The
single PARTIAL is a figure, not a defect claim: F-6's substance holds and its number was loose.

| ID | Verdict | Command / evidence at HEAD `33a6c74` |
|----|---------|--------------------------------------|
| F-5 | **CONFIRMED** | `grep -n -A30 'create table if not exists case_parties' db/schema.sql` — `party_id ... on delete cascade` (L103) sits four lines above `capacity_points_at_party_id ... on delete restrict` (L125). The RESTRICT on the pointer is indeed defeated by the CASCADE on the subject. |
| F-6 | **PARTIAL** | Substance CONFIRMED, figure loose. `grep -c 'references cases (id)'` = **12**, and `grep 'references cases (id)' \| grep -c 'on delete cascade'` = **12** — every direct child of `cases` cascades, including `medical_bills`, `analysis_runs`, `generated_documents`, `charges`, `oaa_intakes`, plus transitively `bill_line_items`, `eob_records`, `analysis_result_lines`. `grep -n 'deleted_at' db/schema.sql` returns nothing, so there is no soft-delete path. **But Grok's "29 child FKs CASCADE" is the file-wide CASCADE count (`grep -c 'on delete cascade'` = 29), not the count of children of `cases`, which is 12.** The shredder claim is right; the number describes a different set. |
| F-7 | **CONFIRMED** | `grep -n 'bill_id\|run_id' db/schema.sql \| grep references` — `analysis_runs.bill_id ... on delete cascade` (L413) and `generated_documents.run_id ... on delete set null` (L518). Confirmed analysis dies with the bill; the report detaches from its justifying run. |
| F-9 | **CONFIRMED** | `grep -n -A25 'create table if not exists legal_rules'` — `version integer not null default 1` with no trigger touching it; the only trigger on the table is `legal_rules_touch` (`touch_updated_at`), and `grep -n 'references legal_rules'` shows both `registry_verification_snapshots.rule_id` and `watch_flags.rule_id` are `on delete cascade`. Nothing bumps `version`, nothing blocks DELETE of a verified rule, and the snapshots go with it. |
| F-10 | **CONFIRMED** | `grep -n -A22 'create table if not exists code_mappings'` — no UNIQUE of any kind in the block; `provider_party_id ... on delete set null` (L363) beside `protective_order boolean not null default false` (L370). |
| F-11 | **CONFIRMED** | `grep -n 'client_id' db/schema.sql \| grep references` — `medical_bills.client_id` (L313) and `analysis_runs.client_id` (L416), both `on delete set null`, while `case_clients.party_id` is RESTRICT. |
| F-15 | **CONFIRMED** | `sed -n '432,448p'` — `line_item_id uuid not null` and `schedule_id uuid` are bare uuids; neither carries a `references` clause. |
| F-16 | **CONFIRMED** | The roster-history columns `story_role`, `caption_alignment`, `party_status`, `joined_by`, `active_state`, `slot_role` all lack DEFAULTs on the CREATE path; the only two `default`s in the block are `id`'s `gen_random_uuid()` and `created_at`'s `now()`. Rows inserted outside the CD-1 backfill get NULL. |
| F-17 | **CONFIRMED, exactly as stated** | `grep -c 'updated_at timestamptz'` = **10** declaring tables; `grep -c 'execute function touch_updated_at'` = **4** triggers (`cases`, `parties`, `case_clients`, `legal_rules`). 10 − 4 = **6** untriggered, matching Grok's figure precisely. |
| F-19 | **CONFIRMED** | `grep -n 'statute_sections'` — `statute_sections_lookup_idx on statute_sections (code, section_number)` (L832) is a plain index; the word `unique` does not appear on it. |
| F-20 | **CONFIRMED** | `grep -n 'uuid\[\]\|text\[\]'` — `transcripts.case_ids uuid[]` (L621) and `staging/routing chosen_case_ids uuid[]` (L700). Postgres cannot place a foreign key on an array element, so these matter links are unenforceable by the database. |
| F-21 | **CONFIRMED** | `grep -n -A14 'create table if not exists glossary_terms'` — `scope text not null default 'firm' check (scope in ('firm','case'))` and a nullable `case_id`, with no CHECK tying them. `scope='case'` with `case_id` NULL, and `scope='firm'` with a `case_id`, are both insertable. |
| F-22 | **CONFIRMED** | `sed -n '307,334p'` and `sed -n '380,396p'` — `insurer_payment` and `contractual_adjustment` are declared on **both** `medical_bills` and `eob_records`, with nothing constraining the two copies to agree. |
| F-23 | **CONFIRMED — and it is the sharper of the two halves** | `db/schema.sql` L173 declares `edge_type text not null check (edge_type in (...))` **inline and unnamed**, which Postgres auto-names `contact_edges_edge_type_check`. `db/migrations/2026-08-12-cd1-contact-directory.sql` L181–182 does `drop constraint if exists contact_edges_type_check` then adds `contact_edges_type_check`. **The names do not match, so the DROP is a silent no-op on a database built from schema.sql and the table ends up carrying both constraints.** (`contact_edges_not_self` is named identically in both files and is fine.) |
| F-24 | **CONFIRMED** | `grep -c 'drop policy if exists' db/schema.sql` = **0** against `grep -c '^create policy'` = **35**. `CREATE POLICY` has no `IF NOT EXISTS`, so re-running schema.sql on an existing database errors. The CD-1 migration *does* use the drop/create pattern (L203) — the defect is schema.sql's alone. |
| F-26 | **CONFIRMED** | `grep -n 'start_local\|end_local'` — `start_local text not null` (L589) with no CHECK, no format constraint, no parse guarantee. |
| F-28 | **CONFIRMED** | `grep -n 'watch_flags'` — a `watch_flags text` **column** on `legal_rules` (L475) and a `watch_flags` **table** (L847), both writable, with nothing reconciling them. |
| F-30 | **CONFIRMED, all six** | No UNIQUE on `fee_schedule_rates` or `watch_targets` (block greps return none, while the neighbouring `tracked_bills.legiscan_bill_id` **does** carry `unique` — the probe demonstrably finds them when present); `outlook_event_id text` (L595), `legacy_ref text` (L37), the glossary triple, and `audio_hash` (L623) all lack UNIQUE — the last despite its own comment reading "identity is hash+timestamp+duration". |

### Exact counts for F-27 (ruling 6 — recomputed at HEAD, never copied)

| Quantity | Count at HEAD | Command |
|---|---|---|
| Tables | **36** | `grep -c '^create table if not exists' db/schema.sql`, plus `grep -n '^create table' \| grep -v 'if not exists'` returning nothing, so no table is missed by the pattern |
| Policies | **35** | `grep -c '^create policy' db/schema.sql`, plus a check for non-line-initial `create policy` returning nothing |
| ON DELETE CASCADE | **29** | `grep -c 'on delete cascade' db/schema.sql` |
| ON DELETE RESTRICT | **2** | `grep -c 'on delete restrict' db/schema.sql` |
| ON DELETE SET NULL | **7** | `grep -c 'on delete set null' db/schema.sql` |

The recount **independently agrees** with Grok's 36 / 35 / 29 / 2. It was derived from the DDL
first and compared afterwards — per ruling 6 the figures are never copied from the review. The
grant-block comment said 32 / 31 in two places (L940–941, L953); both have been rewritten
**count-free** so they cannot go stale a second time.

### Postgres major version (the ruling-4 gate) — NOT REPO-DERIVABLE

**Reported by Michael in-session, 2026-08-18: the live database is on 14.5.** This is not a fact
the working tree can establish — nothing in `docs/`, `db/`, or `supabase/` records a server
version, and `.env` carries only the project URL and anon key. Per QR-6(a) it was asked rather
than asserted.

**The gate therefore FAILED and ruling 4 was STOPPED, not worked around.** `NULLS NOT DISTINCT`
does not exist before PG15; implementing the same intent another way (a COALESCE-based unique
index) would be a *different* DDL than the one ruled, and that is Michael's call to make, not the
executing session's. Both halves were stopped together — including the F-18 CHECK, which is
version-independent — because splitting a ruled item is also his call. Michael reported he can
upgrade to 17.6 in about an hour; that decision is open, and when the database is on 15+ the item
lands under the **existing** ruling with no fresh authorization needed.

### Constraint-name check for F-23 (ruling-4 companion, requested by §5-B item 3)

Confirmed as described above and generalized, because the same trap sits under the C-1 work:
**schema.sql declares CHECK and FOREIGN KEY constraints inline and unnamed, so their live names
are Postgres's auto-generated ones**, while migrations name theirs explicitly. Any future
`drop constraint if exists` that guesses the wrong name is a silent no-op followed by a duplicate
failure. The cascade-retention map
(`docs/specs/cascade-retention-map-2026-08-18.md` §5) carries this warning and the live
`pg_constraint` query needed to settle the real names before its DDL is ever run.


---

## Appendix A — Grok's output as carried (Michael's hand)

*(Preserved per the QR-1 principle — the rulings above bind to these IDs, and this appendix is
where the F-nn/C-nn text survives in the repo. Provenance, stated exactly: Michael carried a
write-up of the 1,172-line original into the design session; F-1 through F-14, F-27, F-29, and
the section heads below are substantially as carried, while F-15–F-26/F-28/F-30, the
challenges, Checked-and-clean, and Uncertain are FURTHER CONDENSED BY CLAUDE for this record.
The full output file remains in Michael's hands — `grok-review-output_db-schema_2026-08-19.md`,
his filename — and can be added to the repo by his hand if the full text is ever wanted.)*

Review is done. Packet reviewed as written — no deference to comments. CL-2 migration file was **not** in the packet; that backfill is unscored.
Counted from the DDL, not the comments: **36 tables**, **35 policies**, **29 ON DELETE CASCADE**, **2 RESTRICT**. The grant-block comment still says 32 / 31.

### F-1 — HIGH — `next_file_number()` is executable by `PUBLIC`
No `REVOKE … FROM PUBLIC`. Postgres grants `EXECUTE` on new functions to `PUBLIC`; `CREATE OR REPLACE` keeps that ACL. A `SECURITY DEFINER` writer of `file_counters` is callable by `anon` via PostgREST RPC (`POST /rest/v1/rpc/next_file_number`) — burns numbers without inserting a case. ASSUMPTION-DEPENDENT: PostgREST exposes `public` functions (default). Fix proposed: BEFORE INSERT trigger issuance; revoke from `public` and `authenticated`.

### F-2 — HIGH — `file_number` is writable after issue
`file_number text not null unique default next_file_number()` — uniqueness is "this string is unused right now." A PATCH relabels `26-0004` → `26-0007`; letters sent under the old number no longer resolve. Fix: BEFORE UPDATE trigger that raises on change.

### F-3 — HIGH — year taken from `now()` (UTC on Supabase)
`v_yy text := to_char(now(), 'YY')`. A case opened 2026-12-31 18:05 America/Chicago is 2027-01-01 UTC and gets `27-0001`. Same class as the recorded v0.1 UTC date-opened bug. Fix: `to_char((now() at time zone 'America/Chicago'), 'YY')`.

### F-4 — HIGH — `UNIQUE (case_id, party_id, role)` forbids the capacity model CD-1 just added
CD-1: "the same person appearing individually AND as next friend is two roster entries over one row" — but CD-1 does not widen the unique key. Mother as Plaintiff individually and as next friend of the minor: second insert fails; workarounds recreate the identity split CD-1 exists to kill. Fix: `UNIQUE NULLS NOT DISTINCT (case_id, party_id, role, capacity_kind, capacity_points_at_party_id)`.

### F-5 — HIGH — deleting a contact erases roster history
`case_parties.party_id … on delete cascade` while the capacity pointer is RESTRICT — restrict on the pointer is pointless if deleting the subject cascades the whole history row. Contradicts CD-1 §4.3 ("entries are HISTORY, not snapshot"). Fix: RESTRICT on `case_parties.party_id`; prefer merge/inactive over physical delete.

### F-6 — HIGH — `DELETE FROM cases` is a physical shredder
29 child FKs CASCADE, including `medical_bills`, `analysis_runs`, `generated_documents`, `charges`, `oaa_intakes`; `authenticated` has DELETE; RLS `using (true)`; no `deleted_at`. One row delete destroys the matter's ledger and audit. A current single-user failure, not a multi-user preview. Fix: RESTRICT from retain-worthy children; add `deleted_at`.

### F-7 — HIGH — confirmed analysis dies with the bill
`analysis_runs.bill_id … on delete cascade` though "only CONFIRMED runs may feed settlement/lien math"; `generated_documents.run_id` is SET NULL so the report detaches from its justifying run. Fix: RESTRICT.

### F-8 — HIGH — `privilege_tier` can change with no author, no time, no log
Two CHECK vocabularies (`privileged` vs `attorney-client` families). No `classified_by`/`classified_at`; `review_log` is fully UPDATE/DELETEable and not wired to these columns. A transcript classified `privileged` PATCHed to `non-privileged` with `discoverable_flag = true` — nobody recorded. Fix: classifier columns; freeze tier (and `generated_documents.content`) once set; `REVOKE UPDATE, DELETE ON review_log`. Vocabulary split acknowledged as Q-COM-10 (challenged as C-3, not counted an oversight).

### F-9 — HIGH — verified `legal_rules` mutate in place and can be deleted
Nothing increments `version`, archives the proposition, or blocks DELETE; snapshots cascade with the rule; `analysis_runs.registry_stamps` become unreliable. Fix: bump-and-unverify trigger; RESTRICT from snapshots; refuse DELETE of `status='verified'`.

### F-10 — HIGH — `code_mappings` is not keyed on what the comment says
No UNIQUE on (provider, description, chargemaster code); `provider_party_id … on delete set null` globalizes `protective_order = true` mappings on directory cleanup. Fix: NOT NULL + RESTRICT + partial unique WHERE is_active.

### F-11 — HIGH — deleting a `case_clients` row unhooks the body the bill "belongs to"
`medical_bills.client_id … on delete set null` (same on `analysis_runs.client_id`) though `case_clients.party_id` is RESTRICT precisely to protect the ledger. Bills pool at case level — the distortion CL-2 exists to prevent. Fix: RESTRICT (insert-nullability is not null-on-delete).

### F-12 — HIGH — CD-1 backfill never writes `party_status` for function roles
Unrun CD-1: `set caption_alignment = null, party_status = coalesce(party_status, null)` — a no-op. Every Witness/Adjuster/provider/expert/judge ends NULL though `'non-party-actor'` exists in the CHECK. Fix before run: write `'non-party-actor'`, or delete the no-op and document.

### F-13 — HIGH — CD-1 caption mapping is an exact string match on an unconstrained column
No CHECK on `practice_area`/`case_type`/`status`/`role`; the backfill's correctness is a function of whatever strings sit in live; probate absent from the IN-list. Fix: CHECK now, while no real data; add probate to CHECK and allowlist before run.

### F-14 — HIGH — `legiscan-poller` is an unauthenticated service-role writer
Handler ignores `Request`; no cron secret; service role bypasses RLS. Anyone reaching the URL (anon JWT, or none if `verify_jwt` off) runs the full poll — LegiScan budget burned, `tracked_bills` written under service role. Fix: require a non-public cron secret.

### F-15…F-26, F-28, F-30 (MED/LOW, condensed)
F-15 `analysis_result_lines` has no FK to line or schedule · F-16 roster history columns lack defaults on the CREATE path (future rows NULL) · F-17 `updated_at` untriggered on six declared tables · F-18 capacity pointer optional for kinds that require it · F-19 `statute_sections` lookup index not unique · F-20 `transcripts.case_ids uuid[]` (and routing arrays) unenforceable — junction table proposed · F-21 `glossary_terms.scope`/`case_id` can disagree · F-22 Type-2 bill amounts stored twice (bill vs EOB), unconstrained · F-23 `contact_edges` CHECK name differs between schema.sql and CD-1 · F-24 schema.sql policies not re-runnable (no drop/create pattern) · F-25 no actor columns (`created_by`) on operational tables — cheap now, expensive later · F-26 `calendar_events.start_local` unconstrained text · F-28 `legal_rules.watch_flags` column vs `watch_flags` table, two writable places · F-30 several documented keys not unique (fee_schedule_rates, watch_targets, outlook_event_id, legacy_ref, glossary triple, audio-hash identity).

### F-27 — LOW — grant-block comment stale: says 32/31; DDL counts 36/35.
### F-29 — LOW — `statute-fetch` open wildcard-CORS proxy; risk is hammering the .gov host, not disclosure.

### CHALLENGES
C-1 permissive DELETE is a today problem, not multi-user · C-2 `ALTER DEFAULT PRIVILEGES` unset forever — #28 is the existence proof comments aren't a control; middle path: migrator-role default grants · C-3 two privilege vocabularies shipped while Q-COM-10 unruled — pick one token before real rows · C-4 identity numbers in `parties.fields` jsonb — promote DOB/SSN/DL before a dump is interesting · C-5 `transcripts.case_ids uuid[]` as matter link — junction table does not violate CL-1 · C-6 "gapless" as requirement — implementation is race-free, not gapless; restate as unique/year-scoped/not-client-assigned · C-7 `case_clients`/`case_parties` with no existence constraint — an EXISTS trigger would not collapse the tables (challenges D-CL2-8).

### Checked and clean (condensed)
contact_edges self-check + unique match comment · case_clients.party_id RESTRICT right shape · eob_records.bill_id real 1:1 · counter upsert race-free in-transaction · search_path pinned · tracked_bills unique matches poller upsert · statute_chapters unique correct · no anon grants anywhere · REVOKE on file_counters ordered after the blanket GRANT · only one SECURITY DEFINER function · statute-fetch not open-SSRF · CD-1 guarded/idempotent, same-file grants · grants file idempotent · SOL correctly absent from cases · no case_links (CL-1 firewall holds). No lens skipped.

### Uncertain
CL-2 file not provided (backfill unscored) · live ACLs unverifiable · PostgREST function exposure config · edge verify_jwt/cron headers · Postgres version for NULLS NOT DISTINCT · pg_trgm availability · live practice_area/role distinct values · app-layer filters (protective-order, confirmed-runs-only, attorney-only verified).

*(End of carried output.)*
