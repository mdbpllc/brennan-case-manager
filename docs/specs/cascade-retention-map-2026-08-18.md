# Cascade / Retention Map — C-1 input for sign-off

**STATUS: PROPOSED — AWAITING MICHAEL'S SIGN-OFF (open item O-7). NOTHING IN THIS FILE HAS BEEN
EXECUTED.** No DDL below has been run against any database, and none of it appears in
`db/schema.sql` or in any migration. The C-1 *principle* is ruled (Grok external review record,
`docs/specs/grok-external-review-2026-08-18.md` §3 item 8: retain-worthy children must not
physically cascade away; RESTRICT + soft-delete is the target shape). **The specific DDL is
Michael's to sign off, edit, or reject before anything executes.**

Authored by the Code session that executed the Grok-review packet, 2026-08-18, under C-1's own
adopted wording — *"the Code verification pass then maps exactly which FKs change."* Basis: every
foreign key in `db/schema.sql` at the commit this file lands in, extracted mechanically from the
DDL (not read by eye), then classified.

---

## §1 How to read this

C-1 names six retain-worthy children: **bills, confirmed analysis runs, generated documents,
charges, OAA intakes, and roster history.** §2 covers exactly those and nothing else. §3 lists
FKs that are *adjacent* to the principle but were **not** named in C-1 — they are surfaced for a
decision, not proposed as ruled. §4 is the soft-delete column set. §5 is the honest cost.

Two mechanisms, and they only work together:

- **RESTRICT** stops the physical delete. On its own it does not delete anything — it makes
  `delete from cases where id = ...` *fail* when retain-worthy children exist.
- **`deleted_at`** is what "deleting" a matter then means: the row stays, the ledger stays, and
  the UI stops showing it.

RESTRICT without a soft-delete path makes deletion simply impossible, which is worse than
today. **They ship together or not at all.**

## §2 The six C-1 children — proposed changes

| # | Table.column | References | Current | Proposed | Why (C-1 / finding) |
|---|---|---|---|---|---|
| 1 | `medical_bills.case_id` | `cases` | CASCADE | **RESTRICT** | Bills are the ledger. F-6: one `delete from cases` physically destroys the matter's billing record. |
| 2 | `analysis_runs.case_id` | `cases` | CASCADE | **RESTRICT** | Confirmed runs are the only runs that may feed settlement/lien math; they must outlive a careless delete. |
| 3 | `analysis_runs.bill_id` | `medical_bills` | CASCADE | **RESTRICT** | F-7: the confirmed analysis currently dies with the bill it analysed. |
| 4 | `generated_documents.case_id` | `cases` | CASCADE | **RESTRICT** | Documents that went out the door are records of what was sent. |
| 5 | `generated_documents.run_id` | `analysis_runs` | SET NULL | **RESTRICT** | F-7: today the report silently detaches from the run that justifies its numbers. A detached report is worse than a blocked delete. |
| 6 | `charges.case_id` | `cases` | CASCADE | **RESTRICT** | Criminal charges are the matter's substance. |
| 7 | `oaa_intakes.case_id` | `cases` | CASCADE | **RESTRICT** | Appointment intake is the origin record of an appointed matter. |
| 8 | `case_parties.case_id` | `cases` | CASCADE | **RESTRICT** | Roster history. CD-1 §4.3 is explicit that entries are HISTORY, not snapshot. |
| 9 | `case_parties.party_id` | `parties` | CASCADE | **RESTRICT** | F-5: deleting one contact erases the roster history rows naming them — and the capacity pointer beside it is *already* RESTRICT, which is pointless while this one cascades. |
| 10 | `medical_bills.client_id` | `case_clients` | SET NULL | **RESTRICT** | F-11: the bill silently repools to case level — precisely the distortion CL-2 exists to prevent. `case_clients.party_id` is already RESTRICT for this reason. |
| 11 | `analysis_runs.client_id` | `case_clients` | SET NULL | **RESTRICT** | F-11, same shape: the run loses the body it was computed for. |

### Deliberately KEPT as CASCADE — components, not records

These are parts of a parent row, not independent records, and the parent is now protected by the
rows above. Cascading them is correct and changing them would only produce orphans.

| Table.column | References | Action | Why kept |
|---|---|---|---|
| `bill_line_items.bill_id` | `medical_bills` | keep CASCADE | Line items are the bill's own content. |
| `eob_records.bill_id` | `medical_bills` | keep CASCADE | Real 1:1 with the bill. |
| `analysis_result_lines.run_id` | `analysis_runs` | keep CASCADE | The run's own output rows. |
| `case_roster_flags.case_party_id` | `case_parties` | keep CASCADE | A flag about a roster row; meaningless without it. |

## §3 Adjacent, NOT named in C-1 — surfaced for a decision, not proposed

**These are outside C-1's ruled scope. Listed because the map would be dishonest without them,
not because anything authorizes changing them.**

| Table.column | References | Current | Observation |
|---|---|---|---|
| `code_mappings.provider_party_id` | `parties` | SET NULL | F-10: on directory cleanup a `protective_order = true` mapping becomes provider-less — i.e. globally applicable. Arguably worse than any row in §2, and not ruled. |
| `transcript_participants.party_id` | `parties` | SET NULL | A transcript loses who was speaking. Transcripts were not in C-1's six. |
| `calendar_events.case_id` | `cases` | CASCADE | Past events are arguably history; future ones arguably not. |
| `registry_verification_snapshots.rule_id` | `legal_rules` | CASCADE | F-9: deleting a rule destroys the snapshots that stamp what past outputs relied on. Registry-side, not case-side. |
| `watch_flags.rule_id` | `legal_rules` | CASCADE | Same cluster as above. |
| `contact_edges.*` | `parties` | CASCADE | World facts about a contact vanish with the contact. |

## §4 Proposed soft-delete columns

The RESTRICT rows above are only survivable if "delete" has somewhere to go.

```sql
-- PROPOSED — NOT RUN.
alter table cases         add column if not exists deleted_at timestamptz;
alter table parties       add column if not exists deleted_at timestamptz;
alter table case_clients  add column if not exists deleted_at timestamptz;
alter table medical_bills add column if not exists deleted_at timestamptz;

create index if not exists cases_live_idx         on cases (id)         where deleted_at is null;
create index if not exists parties_live_idx       on parties (id)       where deleted_at is null;
create index if not exists case_clients_live_idx  on case_clients (id)  where deleted_at is null;
create index if not exists medical_bills_live_idx on medical_bills (id) where deleted_at is null;
```

## §5 Proposed FK changes as DDL

```sql
-- PROPOSED — NOT RUN. Constraint names are stated explicitly rather than left to
-- Postgres to invent: that is the F-23 lesson (schema.sql's inline unnamed CHECK
-- auto-named itself contact_edges_edge_type_check while the CD-1 migration names
-- contact_edges_type_check, so CD-1's "drop constraint if exists" would not have
-- dropped it and the table could end up carrying both).

alter table medical_bills       drop constraint if exists medical_bills_case_id_fkey;
alter table medical_bills       add  constraint medical_bills_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table medical_bills       drop constraint if exists medical_bills_client_id_fkey;
alter table medical_bills       add  constraint medical_bills_client_id_fkey
  foreign key (client_id) references case_clients (id) on delete restrict;

alter table analysis_runs       drop constraint if exists analysis_runs_case_id_fkey;
alter table analysis_runs       add  constraint analysis_runs_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table analysis_runs       drop constraint if exists analysis_runs_bill_id_fkey;
alter table analysis_runs       add  constraint analysis_runs_bill_id_fkey
  foreign key (bill_id) references medical_bills (id) on delete restrict;

alter table analysis_runs       drop constraint if exists analysis_runs_client_id_fkey;
alter table analysis_runs       add  constraint analysis_runs_client_id_fkey
  foreign key (client_id) references case_clients (id) on delete restrict;

alter table generated_documents drop constraint if exists generated_documents_case_id_fkey;
alter table generated_documents add  constraint generated_documents_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table generated_documents drop constraint if exists generated_documents_run_id_fkey;
alter table generated_documents add  constraint generated_documents_run_id_fkey
  foreign key (run_id) references analysis_runs (id) on delete restrict;

alter table charges             drop constraint if exists charges_case_id_fkey;
alter table charges             add  constraint charges_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table oaa_intakes         drop constraint if exists oaa_intakes_case_id_fkey;
alter table oaa_intakes         add  constraint oaa_intakes_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table case_parties        drop constraint if exists case_parties_case_id_fkey;
alter table case_parties        add  constraint case_parties_case_id_fkey
  foreign key (case_id) references cases (id) on delete restrict;

alter table case_parties        drop constraint if exists case_parties_party_id_fkey;
alter table case_parties        add  constraint case_parties_party_id_fkey
  foreign key (party_id) references parties (id) on delete restrict;
```

**Constraint-name warning before any of this runs.** The names above are Postgres's default
`<table>_<column>_fkey` pattern, which is what an inline `references` clause produces. They have
**not** been verified against the live database — that needs a live read Michael can run:

```sql
select conrelid::regclass as tbl, conname, confdeltype
  from pg_constraint where contype = 'f' order by 1, 2;
```

`confdeltype` is `c` = cascade, `r` = restrict, `n` = set null, `a` = no action. If a name differs
from the assumption above, the matching `drop constraint if exists` silently does nothing and the
`add constraint` then fails on a duplicate — the F-23 failure mode exactly.

## §6 The honest cost

1. **This is not only a DDL change.** Once §5 runs, `delete from cases` on any matter with a bill
   fails with a foreign-key error. Something in the app must set `deleted_at` instead and filter
   on it, or the practical effect is "matters can no longer be deleted at all." **No app-layer
   work is proposed here and none was authorized** — this is the piece to weigh before signing.
2. **RLS and the API do not know about `deleted_at`.** Existing policies are `using (true)`;
   soft-deleted rows stay visible to every query that does not filter them out.
3. **Order matters.** Add the columns (§4) and the filtering, *then* the RESTRICTs (§5). Reversed,
   there is a window where deletion is blocked and no alternative exists.
4. **Existing data is unaffected.** Nothing above rewrites a row.
5. **§3 is unruled.** If those stay as they are, the F-9 and F-10 exposures remain open with the
   §2 work complete — worth stating so a completed §2 is not mistaken for a closed subject.
