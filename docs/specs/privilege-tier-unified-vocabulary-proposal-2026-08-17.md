# WS-4 / Q-COM-10 — the unified `privilege_tier` vocabulary, and an authored-UNRUN migration

**Canonical repo path:** `docs/specs/privilege-tier-unified-vocabulary-proposal-2026-08-17.md`
**Status: PROPOSAL ONLY. NOTHING EXECUTES UNTIL MICHAEL ADOPTS THE LIST. The migration is
authored and UNRUN and is his to run. No existing row is re-characterized by anything here.
`Q-COM-10` closes only at his adoption — not at this document.**
Drafted 2026-08-17 Central (design session, Opus 5, Cowork) under CHAT-DISPATCH v4 **T-30**,
executing the direction ruled at `WS-4` on 2026-08-17.

---

## 0. THE FINDING THAT SHOULD BE READ BEFORE THE LIST

`WS-4` ruled a **fourth state** — *"witness statement — owed as an initial disclosure"* — into
both vocabularies. Drafting it against the actual schema surfaced a problem the ruling could not
have seen, because it only appears when you try to write the value down:

**THE FOURTH STATE IS NOT MUTUALLY EXCLUSIVE WITH THE OTHER THREE, AND A SINGLE-VALUED COLUMN
FORCES A FALSE CHOICE.**

`privilege_tier` is one `text` column under one `CHECK`. It holds exactly one value. But the
authority read at **T-28** holds precisely that a document can be **both** a witness statement
**and** attorney-client privileged:

> *"a witness statement contained within a confidential communication between attorney and client
> is privileged and protected from discovery."* — *In re ExxonMobil Corp.*, 97 S.W.3d 353, applying
> *In re Fontenot*, 13 S.W.3d 111, 114.

So for a recording of a client interview that is also a 192.3(h) witness statement, the schema
would force a choice between `'attorney-client'` and the new fourth value — and **either choice
records something false.** Worse, the choice is consequential in opposite directions: the
attorney-client value asserts protection, the witness-statement value asserts a disclosure
obligation under 194.2(b)(9) against which 194.5 permits no work-product assertion.

**A second, smaller version of the same mismatch:** the column is named `privilege_tier`, and the
fourth value is not a privilege tier — it is a **disclosure obligation.** The other three name a
privilege posture; this one names what is owed.

**This is put to Michael as `Q-COM-10-A` below rather than solved here**, because every available
fix is a design act: keep one column and accept the flattening, add a separate boolean or column
for the disclosure obligation, or rename the concept. **The ruling's direction is honored either
way — the fourth state enters both vocabularies. The question is whether it should enter as a
fourth *value* or as a second *dimension*.**

---

## 1. What exists today, read at HEAD `d30f2ab`

**Four homes, exactly as recorded — two in `db/`, two in `src/`:**

| Home | Vocabulary |
|---|---|
| `db/schema.sql` — `generated_documents.privilege_tier` (line ~526) | `('attorney-client','work-product','non-privileged')` |
| `db/schema.sql` — `transcripts.privilege_tier` (line ~647) | `('privileged','work-product','non-privileged')` |
| `src/domain/billing.ts` — `export type PrivilegeTier` | matches `generated_documents` *(per BUILD-STATE; **not read** — see §5)* |
| `src/domain/transcripts.ts` — `export type PrivilegeTier` | matches `transcripts` *(per BUILD-STATE; **not read** — see §5)* |

And the contradiction that makes this a defect rather than a preference — `db/schema.sql` line
514, immediately above `generated_documents`:

> `-- lands. Privilege vocabulary is the shared system-wide set.`

**The file asserts a shared system-wide set and then defines a second, different one 120 lines
later.** Both columns already carry Q-COM-11's comment noting the divergence is left open on
purpose, so nothing here is a surprise — but the "shared system-wide set" sentence is now simply
untrue and should not survive whatever is adopted.

**Neither CHECK has ever been touched.** Q-COM-11 dropped the defaults and the `not null`, and
expressly did not reconcile the lists.

---

## 2. DOES `transcripts`' `'privileged'` CONFORM TO `'attorney-client'`? — the analysis, put as a question

**The case for conforming, and it is stronger than a tidiness argument:**

**The `transcripts` list is internally incoherent as it stands.** It offers `'privileged'` and
`'work-product'` as siblings — but **work product *is* an assertion of privilege.** That is not a
drafting quibble; it is the project's own recorded position, in the registry (`TRCP 192.5(d) — an
assertion of work product is an assertion of privilege`) and in the Q-COM-11 migration's own
rationale: *"Writing 'work-product' into a privilege_tier column is not a filing label; by TRCP
192.5(d) it is an assertion of privilege."* A list that opposes a genus to one of its species
cannot be applied consistently — a work-product transcript is `'privileged'` **and**
`'work-product'`, and the column admits one value.

`'attorney-client'` does not have this problem: it names a **specific** privilege (TRE 503),
parallel in kind to `'work-product'`. The three-value `generated_documents` list is therefore
coherent where the `transcripts` list is not.

**The case against conforming, stated fairly:** `'privileged'` is broader and could absorb
privileges the narrower token cannot — physician-patient, spousal, clergy, § 5.05 mediation
confidentiality. Conforming **narrows** what a transcript can be marked, and a transcript is
exactly the artifact most likely to catch one of those. If that breadth was intended, conforming
loses it, and the honest fix would be to add the missing specific values rather than collapse to
one.

**PROPOSED, NOT ADOPTED:** conform `'privileged'` → `'attorney-client'`, on the coherence
argument, **and** treat the breadth objection as a separate question (`Q-COM-10-C`) rather than a
reason to keep an incoherent list.

---

## 3. THE PROPOSED UNIFIED LIST — put to Michael for adoption

**Option 1 — FOUR VALUES, ONE SHARED LIST (the direct reading of `WS-4`):**

```
('attorney-client', 'work-product', 'witness-statement', 'non-privileged')
```

applied identically to `generated_documents.privilege_tier` and `transcripts.privilege_tier`.

**The fourth value's exact token — `'witness-statement'`.** Reasons, so the choice is reviewable:
it matches the existing convention exactly (lowercase, hyphenated, no underscores — as
`attorney-client`, `work-product`, `non-privileged` all are); it names the artifact's **character
under TRCP 192.3(h)**, which is what actually drives the consequence, rather than naming the
obligation; and 192.3(h) is where the definition lives, so the token points at its own authority.

Tokens considered and not proposed: `'initial-disclosure'` (names the obligation, and the
obligation is a *consequence* of the character — it would put the effect in the column and leave
the cause unrecorded); `'witness-statement-disclosable'` (redundant — the disclosability is what
the first two words already imply); `'discoverable'` (over-broad, and `transcripts` already
carries a separate `discoverable_flag boolean`, so the token would collide with an existing
field).

**Option 2 — THREE VALUES PLUS A SECOND DIMENSION (the answer to §0):**

```
privilege_tier   ('attorney-client', 'work-product', 'non-privileged')   -- unchanged, both tables
witness_statement boolean not null default false                          -- NEW, both tables
```

This lets a record be attorney-client **and** a witness statement — the *Fontenot* posture — which
Option 1 cannot express. It costs one column on two tables and leaves the ruled fourth state fully
represented, just not as a fourth enum value.

**Which option is Michael's, and `WS-4`'s direction is satisfied by either.** The ruling said the
fourth state enters both vocabularies and pointed toward one shared vocabulary; it did not say the
fourth state must be a fourth *enum value*, because the exclusivity problem had not surfaced yet.

---

## 4. THE AUTHORED-UNRUN MIGRATION — proposal text

**Written on the `db/migrations/2026-08-16-privilege-tier-no-default.sql` precedent** — same
header shape, same run-by-hand instruction, same "WHAT THIS DOES NOT DO" section, same numbered
verification checks answered **in words**. **It is presented as OPTION 1's migration; if Michael
adopts Option 2 the file is re-drafted, not edited.**

**The one structural difference from the precedent, and it is deliberate:** the precedent was
purely additive in effect (dropping a default cannot invalidate a row). **This one is not.**
Conforming `'privileged'` → `'attorney-client'` cannot be done by a CHECK change alone if any row
currently holds `'privileged'` — the rows would have to be rewritten, and **rewriting a row's
privilege tier is a re-characterization, which is a legal act and is Michael's alone.** So the
migration **stops rather than backfills**: Step 0 counts those rows, and if the count is not zero
it aborts and reports. Given that no real client data has ever entered the application and every
row is fiction, the expected count is zero — but **expected is not verified**, and the migration
checks rather than assumes.

```sql
-- Migration — PROPOSED, Q-COM-10 / WS-4: one shared privilege_tier vocabulary
--
-- ============================================================================
-- NOT AUTHORIZED TO RUN. This file is a PROPOSAL staged for Michael's adoption
-- of the unified value list. Q-COM-10 closes at that adoption and not before.
-- If you are reading this in the repo and no adoption is recorded on the
-- Q-COM-10 row of docs/specs/attorney-review-queue.md, DO NOT RUN IT.
-- ============================================================================
--
-- RUN BY MICHAEL'S HAND, per the CL-2/CD-1 precedent (slice item 7):
--   1. BACK UP FIRST.
--   2. Paste this file ALONE into an empty SQL buffer — nothing else in it.
--   3. Answer the verification checks at the bottom IN WORDS before moving on.
-- Once adopted and run, fold into db/schema.sql so a fresh project is correct,
-- and DELETE the stale line-514 comment ("Privilege vocabulary is the shared
-- system-wide set"), which is false today and would become misleading.
--
-- WHY. Two tables carry privilege_tier under two different CHECK lists, and
-- db/schema.sql calls one of them "the shared system-wide set" while defining
-- the other 120 lines later. The divergence is duplicated in TypeScript, so the
-- question has four homes. WS-4 additionally ruled a fourth state — a witness
-- statement owed as an initial disclosure — into both vocabularies.
--
-- WHY 'privileged' BECOMES 'attorney-client'. Work product IS an assertion of
-- privilege (TRCP 192.5(d); registry entry UNVERIFIED). A list offering
-- 'privileged' and 'work-product' as alternatives opposes a genus to its own
-- species and cannot be applied consistently. 'attorney-client' names a specific
-- privilege (TRE 503) and is parallel in kind to 'work-product'.
--
-- WHY 'witness-statement' EXISTS. TRCP 192.3(h) defines the artifact;
-- 194.2(b)(9) makes it an initial disclosure owed without a request (194.1(a));
-- and 194.5 permits no objection or assertion of work product against a Rule 194
-- disclosure. All UNVERIFIED — see the T-29 drafts and the WS-3 read.
--
-- WHAT THIS DOES NOT DO, deliberately:
--   * It does not re-characterize any row. If any row holds 'privileged', this
--     migration ABORTS at Step 0 rather than rewriting it. Rewriting a privilege
--     tier is a legal act and is reserved to Michael.
--   * It does not backfill NULLs. NULL still means unclassified-must-classify,
--     exactly as Q-COM-11 ruled.
--   * It does not add a creation-time classification UI. Still the recorded
--     follow-on act, still not authorized.
--   * It does not resolve whether a record can be BOTH attorney-client and a
--     witness statement. On this option it cannot — see Q-COM-10-A.
--
-- Safe to re-run: each step is guarded and idempotent.

-- ============ STEP 0 — ABORT IF ANY ROW WOULD BE RE-CHARACTERIZED ============
-- This must return zero. If it does not, STOP and report the count to Michael.
do $$
declare n integer;
begin
  select count(*) into n from transcripts where privilege_tier = 'privileged';
  if n > 0 then
    raise exception
      'ABORT: % transcripts row(s) hold ''privileged''. Rewriting them is a re-characterization and is Michael''s act, not this migration''s.', n;
  end if;
end $$;

-- ============ STEP 1 — GENERATED DOCUMENTS: add the fourth value ============
-- The CHECK is unnamed in schema.sql, so Postgres auto-named it. Look the name
-- up rather than assuming it; drop by the name found.
do $$
declare c text;
begin
  select con.conname into c
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
   where con.contype = 'c' and rel.relname = 'generated_documents'
     and pg_get_constraintdef(con.oid) like '%privilege_tier%';
  if c is not null then
    execute format('alter table generated_documents drop constraint %I', c);
  end if;
end $$;

alter table generated_documents
  add constraint generated_documents_privilege_tier_check
  check (privilege_tier in ('attorney-client','work-product','witness-statement','non-privileged'));

-- ============ STEP 2 — TRANSCRIPTS: conform and add ============
do $$
declare c text;
begin
  select con.conname into c
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
   where con.contype = 'c' and rel.relname = 'transcripts'
     and pg_get_constraintdef(con.oid) like '%privilege_tier%';
  if c is not null then
    execute format('alter table transcripts drop constraint %I', c);
  end if;
end $$;

alter table transcripts
  add constraint transcripts_privilege_tier_check
  check (privilege_tier in ('attorney-client','work-product','witness-statement','non-privileged'));

-- ============ VERIFICATION — ANSWER THESE IN WORDS ============
-- Run each and read the result out loud before continuing. If any answer is not
-- what the comment says it should be, STOP and report it rather than proceeding.
--
-- 1. Both CHECK lists are now IDENTICAL and carry four values:
--      select rel.relname as table_name, pg_get_constraintdef(con.oid) as check_def
--        from pg_constraint con
--        join pg_class rel on rel.oid = con.conrelid
--       where con.contype = 'c'
--         and pg_get_constraintdef(con.oid) like '%privilege_tier%'
--       order by rel.relname;
--    EXPECT: two rows, and the two check_def strings list the SAME four values —
--    'attorney-client', 'work-product', 'witness-statement', 'non-privileged'.
--    If they still differ, one of the two steps did not run. Unlike the 2026-08-16
--    migration, where two different lists was the CORRECT result, here two
--    different lists means FAILURE. Note that reversal explicitly.
--
-- 2. NOTHING was re-characterized — every existing value survived intact:
--      select privilege_tier, count(*) from generated_documents group by 1 order by 1;
--      select privilege_tier, count(*) from transcripts group by 1 order by 1;
--    EXPECT: exactly the counts you had before, including the NULL bucket. ZERO
--    rows reading 'privileged' (Step 0 guaranteed this or aborted), and ZERO rows
--    reading 'witness-statement' — nothing is classified into the new value by
--    this migration. A 'witness-statement' row here means something else wrote it.
--
-- 3. Both columns are still nullable and still carry no default — Q-COM-11's
--    ruling is undisturbed:
--      select table_name, is_nullable, column_default
--        from information_schema.columns
--       where column_name = 'privilege_tier'
--         and table_name in ('generated_documents','transcripts')
--       order by table_name;
--    EXPECT: two rows, is_nullable = 'YES' on both, column_default null on both.
--    If a default reappeared, this migration did something it was not meant to.
--
-- 4. The new value is actually accepted, and the retired one is actually
--    rejected. Run inside a transaction and roll back so no fixture row is made:
--      begin;
--        insert into transcripts (case_ids, context_type, privilege_tier)
--             values ('{}', 'witness_interview', 'witness-statement')
--          returning id, privilege_tier;
--      rollback;
--    EXPECT: the insert succeeds and returns 'witness-statement'.
--      begin;
--        insert into transcripts (case_ids, context_type, privilege_tier)
--             values ('{}', 'witness_interview', 'privileged');
--      rollback;
--    EXPECT: this one FAILS on the check constraint. A success here means Step 2
--    did not run. If either fails on some OTHER not-null column, that is fine —
--    what matters is which constraint the error names. Read the error text.
--
-- 5. Row-level security is still unaffected — no policy reads this column:
--      select tablename, policyname
--        from pg_policies
--       where schemaname = 'public'
--         and tablename in ('generated_documents','transcripts')
--         and (qual like '%privilege_tier%' or with_check like '%privilege_tier%');
--    EXPECT: zero rows, same as the 2026-08-16 migration found. A row here means a
--    policy DOES read the column and the vocabulary change needs a look before any
--    real data lands.
```

---

## 5. THE `src/` HALF — described, NOT drafted, and here is why

`WS-4`'s reach includes `src/domain/billing.ts` and `src/domain/transcripts.ts`, each of which
exports a `PrivilegeTier` union matching its own CHECK. **This session did not read either file,
and did not draft a patch to either.**

**The reason is a binding convention, not an oversight.** The working-set policy states design
sessions do not read source; `src/` is deliberately excluded from the project's sync; and
**`Q-PR3-1` — whether a design-side `src/` read through the device bridge is sanctioned at all —
is expressly UNRULED and sits in the queue.** Reading two source files to draft a patch would
answer `Q-PR3-1` by doing it, which is the same failure the Q-COM-11 migration named when it
refused to settle Q-COM-10 by implementation.

**So the src edit is specified in words, for Code to apply against the actual files:**

- In **`src/domain/transcripts.ts`**: the `PrivilegeTier` union must be changed from the
  transcripts vocabulary to the adopted unified list — i.e. `'privileged'` **replaced by**
  `'attorney-client'`, and `'witness-statement'` **added**.
- In **`src/domain/billing.ts`**: the `PrivilegeTier` union must gain `'witness-statement'`; its
  other three members already match Option 1's list and need no change.
- **Both unions must end up identical.** If the two files are meant to share one type, saying so
  is a further design act (one canonical export, imported by both) and is **not proposed here** —
  it is `Q-COM-10-D`.
- **A build session must confirm the actual union members before editing.** BUILD-STATE's account
  of what these files contain is a report, not a read, and this document does not upgrade it.

---

## 6. Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-COM-10-A` | **The exclusivity problem — read §0 first.** `privilege_tier` holds one value, but *Fontenot*/*ExxonMobil* hold that a witness statement inside a confidential attorney-client communication **is** privileged — so a record can be both, and a fourth enum value forces a false choice with opposite consequences. **Do you want Option 1 (four values, one column, accept the flattening) or Option 2 (three values plus a `witness_statement boolean`, which can express both)?** `WS-4`'s direction is satisfied either way. | **OPEN — blocks the migration** |
| `Q-COM-10-B` | **Does `transcripts`' `'privileged'` conform to `'attorney-client'`?** Proposed YES, on the ground that the current list opposes a genus (`privileged`) to its own species (`work-product`), which the project's own registry position (TRCP 192.5(d)) makes incoherent. **Adopt, reject, or edit.** | **OPEN** |
| `Q-COM-10-C` | **The breadth objection, separated out so it is not lost inside B.** `'privileged'` could have been carrying non-attorney-client privileges a transcript is uniquely likely to catch — physician-patient, spousal, clergy, mediation confidentiality. **If you conform to `'attorney-client'`, do you also want specific values added for any of those, or is `'attorney-client'` the only privilege this system will record?** | **OPEN** |
| `Q-COM-10-D` | **One type or two?** `src/domain/billing.ts` and `src/domain/transcripts.ts` each declare their own `PrivilegeTier`. Even with identical members, two declarations can drift again. **Do you want one canonical exported type imported by both — and if so, where does it live?** | **OPEN** |
| `Q-COM-10-E` | **The fourth value's exact token.** Proposed `'witness-statement'` (matches the existing lowercase-hyphenated convention; names the 192.3(h) character rather than the 194.2(b)(9) consequence). Alternatives considered and rejected: `'initial-disclosure'`, `'witness-statement-disclosable'`, `'discoverable'` (collides with `transcripts.discoverable_flag`). **Confirm or substitute.** | **OPEN** |
| `Q-COM-10-F` | **`db/schema.sql` line 514 says "Privilege vocabulary is the shared system-wide set" and that is false today.** The migration's header directs deleting it on execution. **Confirm that deletion rides the migration, or direct it as its own act.** | **OPEN** |
| `Q-PR3-1` *(existing row, touched here)* | This task could not draft the `src/` patch without reading source, which `Q-PR3-1` leaves unruled. **The row is not amended by this document** — noted only because T-30 is the second task to run into it, after the #86 proposal. | **carried, unamended** |

**Nothing above is adopted. `Q-COM-10` stays OPEN and closes only when Michael adopts a list.
The migration is authored, UNRUN, and NOT AUTHORIZED. No row was re-characterized.**
