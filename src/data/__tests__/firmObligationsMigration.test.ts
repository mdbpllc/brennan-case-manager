// FIRM OBLIGATIONS — the migration and db/schema.sql, asserted as TEXT (slice
// §7 item 22, and the schema half of item 19).
//
// Authority: docs/specs/firm-obligations-build-slice.md §5 (the two tables, the
// review_log.action CHECK, the file's shape) and §3 item 2. FOS-1 RULED YES by
// Michael 2026-09-10 ("Yes"), FOD-20 IN; session log #155.
//
// WHAT THIS PROVES, AND WHAT IT CANNOT. It proves the migration NAMES every
// object §5 requires — each column with its exact type, default and CHECK —
// that no statement in it names what §5 and §8 forbid, and that db/schema.sql
// carries the same two tables and the same ten-value CHECK in the same commit.
// It does NOT prove the SQL runs, or that Postgres reads it as written. The SQL
// itself is exercised only by Michael's hand, after a backup, with the checks
// at the foot answered in words — stated, not tested.
//
// `?raw` imports are this repo's convention for reading source in a test
// (cc1Surfaces.test.ts): no node:fs, no new dependency.

import { describe, it, expect } from 'vitest';
import migrationSql from '../../../db/migrations/2026-09-10-firm-obligations.sql?raw';
import schemaSql from '../../../db/schema.sql?raw';

// ------------------------------------------------------------------ helpers

/** SQL with `--` comments removed. Claims about what a file DOES read this:
 *  the migration's "WHAT THIS DOES NOT DO" block names calendar_events and
 *  cases on purpose, and an absence assertion over raw text would be answered
 *  by the very comment recording the absence (cc1Surfaces.test.ts's lesson).
 *  A plain regex is safe because no string literal in either file carries `--`
 *  (checked by grep when this suite was written). */
const code = (src: string) => src.replace(/--[^\n]*/g, '');

/** Comment markers and line wrapping removed, so a phrase broken across two
 *  `--` lines is still findable (cc1Surfaces.test.ts's `sqlProse`). */
const sqlProse = (src: string) =>
  src.split('\n').map((l) => l.replace(/^\s*--\s?/, '')).join(' ').replace(/\s+/g, ' ');

/** A whitespace-blind comparison form: runs collapse, and none survives beside
 *  a parenthesis or a comma — so a CHECK list wrapped over two lines compares
 *  equal to the same list on one. Lower-cased, like the SQL it compares. */
const compact = (s: string) =>
  s.replace(/\s+/g, ' ').replace(/\s*([(),])\s*/g, '$1').trim().toLowerCase();

/** The quoted values of an `in (...)` list, in order. */
const quoted = (s: string) => [...s.matchAll(/'([^']+)'/g)].map((m) => m[1]);

/** `create table if not exists <table> ( ... );` split at its TOP-LEVEL commas:
 *  one compact entry per column or table constraint, comments stripped first.
 *  Counting parenthesis depth is safe because no string literal in these tables
 *  holds a comma or a parenthesis. Empty when the table is not created at all,
 *  so the column assertion fails with the whole expected list as its diff. */
function tableEntries(src: string, table: string): string[] {
  const m = new RegExp(String.raw`create table if not exists (?:public\.)?${table} \(([\s\S]*?)\r?\n\);`).exec(src);
  if (!m) return [];
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of code(m[1])) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  return parts.map(compact).filter(Boolean);
}

const isTableConstraint = (entry: string) =>
  /^(check|constraint|unique|primary key|foreign key)\b/.test(entry);

// ------------------------------------------------------------ what §5 states

/** Slice §5.1, column for column, in its order. */
const OBLIGATION_COLUMNS = [
  'id uuid primary key default gen_random_uuid()',
  'name text not null',
  "category text not null check (category in ('licensing','court-appointments','practice-rules','tax-entity-and-employment','insurance','infrastructure','custom'))",
  "owner_scope text not null default 'firm' check (owner_scope in ('firm','attorney'))",
  'owner_user_id uuid references auth.users (id)',
  'template_key text',
  'recurrence jsonb not null',
  "precision text not null default 'day' check (precision in ('day','month'))",
  "missed_periods text not null check (missed_periods in ('serial','collapse'))",
  'conditional_per_period boolean not null default false',
  "weekend_rule text not null default 'unknown' check (weekend_rule in ('rolls-forward','no-roll','unknown'))",
  'lead_days integer not null default 30 check (lead_days >= 0)',
  "weight text not null default 'routine' check (weight in ('hard','routine'))",
  'last_period_completed date',
  'source_note text',
  'applies_if text',
  'notes text',
  'active boolean not null default true',
  'created_by uuid references auth.users (id)',
  'created_at timestamptz not null default now()',
  'updated_at timestamptz not null default now()',
];

/** Slice §5.2, column for column, in its order. */
const OCCURRENCE_COLUMNS = [
  'id uuid primary key default gen_random_uuid()',
  'obligation_id uuid not null references firm_obligations (id) on delete restrict',
  'period_label text not null',
  'due_on date not null',
  'due_on_override date',
  "state text not null default 'open' check (state in ('open','done'))",
  'done_on date',
  'done_by uuid references auth.users (id)',
  "outcome text check (outcome in ('completed','not-applicable'))",
  "outcome_reason text check (outcome_reason in ('condition-not-met','performed-elsewhere'))",
  'done_note text',
  'filed_at text',
  'outlook_event_id text',
  "sync_status text not null default 'pending' check (sync_status in ('pending','synced','error'))",
  'sync_error text',
  'last_sync_at timestamptz',
  'created_at timestamptz not null default now()',
  'updated_at timestamptz not null default now()',
];

/** Slice §5.2's three row-level CHECKs, in its order. */
const OCCURRENCE_ROW_CHECKS = [
  "check ((state = 'done') = (done_on is not null))",
  "check ((state = 'done') = (outcome is not null))",
  "check ((outcome = 'not-applicable') = (outcome_reason is not null))",
];

/** Slice §5.3: today's six, FOD-6's three, FOD-20's one. Ten, because FOS-1
 *  put FOD-20 IN. */
const ACTIONS = [
  'suggested', 'confirmed', 'edited', 'rejected', 'created', 'generated',
  'done', 'not-applicable', 'undone', 'cancelled',
];

const TRIGGERS: [name: string, table: string, when: string, fn: string][] = [
  ['firm_obligations_touch', 'firm_obligations', 'before update', 'touch_updated_at()'],
  ['firm_obligations_set_created_by', 'firm_obligations', 'before insert', 'set_created_by()'],
  ['firm_obligation_occurrences_touch', 'firm_obligation_occurrences', 'before update', 'touch_updated_at()'],
];

const TABLES = ['firm_obligations', 'firm_obligation_occurrences'];

const STEP_0_QUERY = 'select action, count(*) from review_log group by action order by action';

/** db/schema.sql's FIRM OBLIGATIONS section, heading to the privileges heading.
 *  Empty if either heading is missing or out of order, so every assertion over
 *  it fails loudly instead of reading the wrong part of the file. */
const SECTION_HEADING = '-- ============ FIRM OBLIGATIONS (FOS-1, 2026-09-10) ============';
const PRIVILEGES_HEADING = '-- ============ API ROLE PRIVILEGES ============';
const schemaSection = (() => {
  const start = schemaSql.indexOf(SECTION_HEADING);
  const end = schemaSql.indexOf(PRIVILEGES_HEADING);
  return start < 0 || end < start ? '' : schemaSql.slice(start, end);
})();

// ------------------------------------------------------ §5.1 and §5.2, twice

describe.each([
  { label: 'the migration', src: migrationSql },
  { label: "db/schema.sql's FIRM OBLIGATIONS section", src: schemaSection },
])('$label — the objects of slice §5.1 and §5.2', ({ src }) => {
  const stmts = compact(code(src));

  it('creates firm_obligations with EXACTLY the §5.1 columns — types, defaults, CHECKs — and no other', () => {
    const entries = tableEntries(src, 'firm_obligations');
    expect(entries.filter((e) => !isTableConstraint(e))).toEqual(OBLIGATION_COLUMNS.map(compact));
    expect(entries.filter(isTableConstraint)).toEqual([]);
  });

  it('creates firm_obligation_occurrences with EXACTLY the §5.2 columns and its three row CHECKs', () => {
    const entries = tableEntries(src, 'firm_obligation_occurrences');
    expect(entries.filter((e) => !isTableConstraint(e))).toEqual(OCCURRENCE_COLUMNS.map(compact));
    expect(entries.filter(isTableConstraint)).toEqual(OCCURRENCE_ROW_CHECKS.map(compact));
  });

  it('carries ONE index: the partial unique one-open index (FOD-5 at the database)', () => {
    expect(stmts.match(/create (unique )?index/g)).toHaveLength(1);
    expect(stmts).toContain(compact(
      "create unique index if not exists firm_obligation_occurrences_one_open_idx on firm_obligation_occurrences (obligation_id) where state = 'open'",
    ));
  });

  it('creates the three triggers, each after its drop-if-exists (F-25 on the obligations table)', () => {
    expect(stmts.match(/create trigger/g)).toHaveLength(3);
    for (const [name, table, when, fn] of TRIGGERS) {
      const drop = stmts.indexOf(compact(`drop trigger if exists ${name} on ${table}`));
      const create = stmts.indexOf(
        compact(`create trigger ${name} ${when} on ${table} for each row execute function ${fn}`),
      );
      expect(drop, `no drop for ${name}`).toBeGreaterThan(-1);
      expect(create, `no create after the drop for ${name}`).toBeGreaterThan(drop);
    }
  });

  it('enables RLS on both, with ONE policy each: for all to authenticated using (true) with check (true)', () => {
    expect(stmts.match(/create policy/g)).toHaveLength(2);
    for (const table of TABLES) {
      expect(stmts).toContain(compact(`alter table ${table} enable row level security`));
      const policy = `"authenticated full access ${table}"`;
      const drop = stmts.indexOf(compact(`drop policy if exists ${policy} on ${table}`));
      const create = stmts.indexOf(compact(
        `create policy ${policy} on ${table} for all to authenticated using (true) with check (true)`,
      ));
      expect(drop, `no drop for ${policy}`).toBeGreaterThan(-1);
      expect(create, `no create after the drop for ${policy}`).toBeGreaterThan(drop);
    }
  });
});

// ------------------------------------------------------- the migration's shape

describe('the migration — its shape (slice §5.3, §5.4)', () => {
  const exec = code(migrationSql);
  const stmts = compact(exec);
  const gateAt = migrationSql.indexOf('do $$');
  const header = gateAt > 0 ? migrationSql.slice(0, gateAt) : '';

  it('opens with THE GATE, which raises if firm_obligations already exists — before any other statement', () => {
    expect(exec.trim().startsWith('do $$')).toBe(true);
    const gate = compact(exec.slice(0, exec.indexOf('end $$;')));
    expect(gate).toContain(compact("if to_regclass('public.firm_obligations') is not null then raise exception"));
    // And it refuses a review_log without its action CHECK: the file widens a
    // vocabulary, it never invents one.
    expect(gate).toContain(compact("if to_regclass('public.review_log') is null then raise exception"));
    expect(gate).toContain(compact(
      "if not exists (select 1 from pg_constraint c where c.conrelid = 'public.review_log'::regclass and c.contype = 'c' and pg_get_constraintdef(c.oid) like '%action%') then raise exception",
    ));
    // The gate itself changes nothing.
    expect(gate).not.toMatch(/\b(create (unique )?(table|index|trigger|policy)|alter table|drop|grant)\b/);
  });

  it('carries STEP 0 in the header, BEFORE the gate: review_log rows counted by action', () => {
    expect(header).toContain('STEP 0 — BEFORE YOU RUN ANYTHING');
    expect(compact(sqlProse(header))).toContain(compact(STEP_0_QUERY));
  });

  it("says it is RUN BY MICHAEL'S HAND, cites its authorization, and was not run by the session that wrote it", () => {
    const prose = sqlProse(header);
    for (const phrase of [
      "RUN BY MICHAEL'S HAND", 'BACK UP FIRST', 'ALONE', 'IN WORDS',
      'did not run it and connected to no database',
      'FOS-1', '"Yes"', 'FOD-20', '#155', 'docs/specs/firm-obligations-build-slice.md',
      'WHAT THIS DOES NOT DO',
    ]) {
      expect(prose, phrase).toContain(phrase);
    }
  });

  it('grants the four DML privileges to authenticated on both tables — and no statement names anon', () => {
    for (const table of TABLES) {
      expect(stmts).toContain(compact(`grant select, insert, update, delete on ${table} to authenticated`));
    }
    expect(stmts.match(/\bgrant\b/g)).toHaveLength(2);
    expect(exec).not.toMatch(/\banon\b/i);
  });

  it("drops review_log's action CHECK BY CATALOG LOOKUP — never by a guessed literal name", () => {
    const lookup = stmts.indexOf(compact(
      "select c.conname, pg_get_constraintdef(c.oid) as def from pg_constraint c where c.conrelid = 'public.review_log'::regclass and c.contype = 'c' and pg_get_constraintdef(c.oid) like '%action%'",
    ));
    expect(lookup).toBeGreaterThan(-1);
    expect(stmts).toContain(compact("raise notice 'Dropping review_log action CHECK %: %', r.conname, r.def"));
    expect(stmts).toContain(compact("execute format('alter table public.review_log drop constraint %I', r.conname)"));
    // The file's ONE `drop constraint` is the catalog-fed one. A literal name
    // dropped `if exists` is the silent no-op 2026-09-03-fe-d1-amendment-fix.sql
    // was written to repair.
    expect(exec.match(/drop\s+constraint/gi)).toHaveLength(1);
    expect(exec).not.toMatch(/drop\s+constraint\s+(if\s+exists\s+)?"?(public\.)?review_log\w*/i);
    expect(lookup).toBeLessThan(stmts.indexOf('add constraint review_log_action_check'));
  });

  it('re-adds review_log_action_check with all TEN values, in order — FOD-20 IN', () => {
    const m = /add constraint review_log_action_check check\(action in\(([^)]*)\)\)/.exec(stmts);
    expect(m).not.toBeNull();
    expect(quoted(m![1])).toEqual(ACTIONS);
  });

  it('touches no matter table: no statement names calendar_events, cases or a case_id', () => {
    expect(exec).not.toMatch(/calendar_events/i);
    expect(exec).not.toMatch(/\bcases\b/i);
    expect(exec).not.toMatch(/\bcase_id\b/i);
    // And no ALTER of cases anywhere in the file, comments included.
    expect(migrationSql).not.toMatch(/alter\s+table\s+(public\.)?cases\b/i);
  });

  it('writes no row, drops no table, and adds nothing slice §8 forbids', () => {
    expect(exec).not.toMatch(/\binsert\s+into\b/i);
    expect(exec).not.toMatch(/\bupdate\s+(public\.)?\w+\s+set\b/i);
    expect(exec).not.toMatch(/\bdelete\s+from\b/i);
    expect(exec).not.toMatch(/\bdrop\s+table\b/i);
    expect(exec).not.toMatch(/legal_rules/i);
    expect(exec).not.toMatch(/snooze|dismiss|holiday|external_?ref|ledger_?ref|quickbooks|\bqbo\b|intuit|amount|payee|assignee/i);
  });

  it('asks checks (1)–(7) at the foot, each with an EXPECT, and executes nothing there', () => {
    const heading = migrationSql.indexOf('VERIFICATION — ANSWER THESE IN WORDS');
    expect(heading).toBeGreaterThan(migrationSql.indexOf('add constraint review_log_action_check'));
    // From the START of the heading's line, so the heading's own `--` comes
    // along — sliced mid-line, the heading text reads as a statement.
    const foot = migrationSql.slice(migrationSql.lastIndexOf('\n', heading) + 1);
    // Every line after the heading is a comment: the checks are for his hand.
    expect(code(foot).trim()).toBe('');

    const starts = [1, 2, 3, 4, 5, 6, 7].map((n) => foot.search(new RegExp(String.raw`^--\s+${n}\.\s`, 'm')));
    starts.forEach((s, i) => expect(s, `check ${i + 1} out of place`).toBeGreaterThan(i === 0 ? 0 : starts[i - 1]));
    const check = starts.map((s, i) => sqlProse(foot.slice(s, i < 6 ? starts[i + 1] : undefined)));
    for (const [i, text] of check.entries()) expect(text, `check ${i + 1}`).toContain('EXPECT');

    const asks = (n: number, needles: string[]) => {
      for (const needle of needles) expect(check[n - 1], `check ${n}: ${needle}`).toContain(needle);
    };
    // (1) both tables exist, RLS on, exactly one policy each
    asks(1, ['pg_policies', 'relrowsecurity', 'firm_obligations', 'firm_obligation_occurrences']);
    // (2) the one-open index exists and is partial
    asks(2, ['pg_indexes', 'firm_obligation_occurrences_one_open_idx', 'WHERE']);
    // (3) exactly one action CHECK, listing all ten
    asks(3, ['pg_get_constraintdef', 'review_log', 'exactly ONE row', ...ACTIONS]);
    // (4) authenticated true x4 and anon false x4, on each table
    asks(4, [
      "has_table_privilege('authenticated'", "has_table_privilege('anon'",
      "'SELECT'", "'INSERT'", "'UPDATE'", "'DELETE'",
      "'public.firm_obligations'", "'public.firm_obligation_occurrences'", 'TRUE', 'FALSE',
    ]);
    // (5) both tables empty
    asks(5, ['count(*) from firm_obligations', 'count(*) from firm_obligation_occurrences', '0 and 0']);
    // (6) the three triggers, the foreign key's system triggers excluded
    asks(6, ['pg_trigger', 'tgisinternal', ...TRIGGERS.map(([name]) => name)]);
    // (7) STEP 0 re-run and compared
    asks(7, ['STEP 0']);
    expect(compact(check[6])).toContain(compact(STEP_0_QUERY));
  });
});

// ------------------------------------------------------ db/schema.sql, same commit

describe('db/schema.sql — the same commit (slice §5.3, §3 item 2)', () => {
  it("widens review_log's inline action CHECK to the same ten values", () => {
    const action = tableEntries(schemaSql, 'review_log').find((e) => e.startsWith('action '));
    expect(action).toBe(compact(
      `action text not null check (action in (${ACTIONS.map((a) => `'${a}'`).join(',')}))`,
    ));
  });

  it('creates both tables as its LAST two create-table statements, after the amendment block and before the privileges block', () => {
    // The RLS probe's sequence test pins SCHEMA_TABLES to this order; this pins
    // the placement the slice names.
    const declared = [...schemaSql.matchAll(/^create table if not exists (\w+)/gm)].map((m) => m[1]);
    expect(declared.slice(-2)).toEqual(TABLES);
    const amendmentPolicy = schemaSql.indexOf(
      'create policy "authenticated full access generated_document_paragraphs"',
    );
    const section = schemaSql.indexOf(SECTION_HEADING);
    expect(amendmentPolicy).toBeGreaterThan(-1);
    expect(section).toBeGreaterThan(amendmentPolicy);
    expect(schemaSql.indexOf(PRIVILEGES_HEADING)).toBeGreaterThan(section);
  });

  it('lets the grants ride the all-tables statement, which runs AFTER both tables exist', () => {
    // A fresh run grants only the tables that exist when that statement runs,
    // which is why the section sits above it and carries no grant of its own.
    const allTables = schemaSql.search(
      /grant select, insert, update, delete\s+on all tables in schema public to authenticated/,
    );
    expect(allTables).toBeGreaterThan(schemaSql.indexOf('create table if not exists firm_obligation_occurrences'));
    expect(code(schemaSection)).not.toMatch(/\bgrant\b|\banon\b/i);
  });

  it('names no matter table in the section, and writes no row', () => {
    expect(code(schemaSection)).not.toMatch(/calendar_events|\bcases\b|\bcase_id\b|\binsert\s+into\b/i);
  });
});
