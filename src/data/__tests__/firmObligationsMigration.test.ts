// FIRM OBLIGATIONS — the migration and db/schema.sql, asserted as TEXT (slice
// §7 item 22, and the schema half of item 19; fix slice §7 items 4, 5 and 15).
//
// Authority: docs/specs/firm-obligations-build-slice.md §5 (the two tables, the
// review_log.action CHECK, the file's shape) and §3 item 2. FOS-1 RULED YES by
// Michael 2026-09-10 ("Yes"), FOD-20 IN; session log #155. AMENDED by
// docs/specs/firm-obligations-fix-slice.md §5 — the four columns, the tightened
// CHECK, the nine act functions and checks 8–10 — FOS-2 RULED YES by Michael
// 2026-09-12 ("Yes"); session log #156. The unrun migration is amended in place.
//
// WHAT THIS PROVES, AND WHAT IT CANNOT. It proves the migration NAMES every
// object §5 requires — each column with its exact type, default and CHECK, each
// function with its header, its writes in order, its guards and its EXECUTE
// pair — that no statement in it names what §5 and §8 forbid, and that
// db/schema.sql carries the same objects in the same commit. It does NOT prove
// the SQL runs, or that Postgres reads it as written. The SQL itself is
// exercised only by Michael's hand, after a backup, with the checks at the foot
// answered in words — stated, not tested.
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
 *  (checked by grep when this suite was written, and again when FOS-2 added the
 *  functions' messages). */
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

/** `s` split at its TOP-LEVEL commas; a comma inside parentheses stays put.
 *  Counting depth is safe because no string literal in these lists holds a
 *  comma or a parenthesis. */
function splitTop(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  return parts;
}

/** `create table if not exists <table> ( ... );` split at its TOP-LEVEL commas:
 *  one compact entry per column or table constraint, comments stripped first.
 *  Empty when the table is not created at all, so the column assertion fails
 *  with the whole expected list as its diff. */
function tableEntries(src: string, table: string): string[] {
  const m = new RegExp(String.raw`create table if not exists (?:public\.)?${table} \(([\s\S]*?)\r?\n\);`).exec(src);
  if (!m) return [];
  return splitTop(code(m[1])).map(compact).filter(Boolean);
}

const isTableConstraint = (entry: string) =>
  /^(check|constraint|unique|primary key|foreign key)\b/.test(entry);

interface SqlFunction { name: string; preamble: string; body: string; at: number; end: number }

/** Every `create or replace function public.<name>(p jsonb) <preamble> $$ <body> $$;`
 *  in `src`, in file order. Read RAW text when the same-line PROVISIONAL markers
 *  matter; read code(src) for what the SQL does. No body holds a `$$`. */
function functionsIn(src: string): SqlFunction[] {
  return [...src.matchAll(/create or replace function public\.(\w+)\(p jsonb\)([\s\S]*?)\$\$([\s\S]*?)\$\$;/g)]
    .map((m) => ({ name: m[1], preamble: m[2], body: m[3], at: m.index!, end: m.index! + m[0].length }));
}

/** The table writes a compacted body makes, in order. */
const writesIn = (body: string) =>
  [...body.matchAll(/\b(insert into|update|delete from) (\w+)/g)].map((m) => `${m[1]} ${m[2]}`);

// ------------------------------------------------------------ what §5 states

/** Build slice §5.1 as the fix slice §5.1 amends it, column for column, in file
 *  order — FOS-2's two columns after `weight`. */
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
  'outlook_reminder_days integer not null default 30 check (outlook_reminder_days >= 0)',
  "pending_outlook_deletes jsonb not null default '[]'::jsonb",
  'last_period_completed date',
  'source_note text',
  'applies_if text',
  'notes text',
  'active boolean not null default true',
  'created_by uuid references auth.users (id)',
  'created_at timestamptz not null default now()',
  'updated_at timestamptz not null default now()',
];

/** Build slice §5.2 as the fix slice §5.2 amends it, column for column, in file
 *  order — FOS-2's two columns after `last_sync_at`. */
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
  'materialized_from uuid references firm_obligation_occurrences (id) on delete set null',
  'touched boolean not null default false',
  'created_at timestamptz not null default now()',
  'updated_at timestamptz not null default now()',
];

/** §5.2's three row-level CHECKs, in order — the third tightened by #156 A4. */
const TIGHTENED_CHECK = "check ((outcome is not distinct from 'not-applicable') = (outcome_reason is not null))";
const OCCURRENCE_ROW_CHECKS = [
  "check ((state = 'done') = (done_on is not null))",
  "check ((state = 'done') = (outcome is not null))",
  TIGHTENED_CHECK,
];

/** The four columns FOS-2 adds, table-qualified. */
const FOS2_COLUMNS = [
  'firm_obligations.outlook_reminder_days',
  'firm_obligations.pending_outlook_deletes',
  'firm_obligation_occurrences.materialized_from',
  'firm_obligation_occurrences.touched',
];

/** Build slice §5.3: today's six, FOD-6's three, FOD-20's one. Ten, because FOS-1
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

/** Fix slice §3 item 6 / §5.3 — the nine, in the call contract's order. */
const FUNCTIONS = [
  'firm_activate', 'firm_activate_from_inactive', 'firm_update', 'firm_retire', 'firm_reactivate',
  'firm_mark_done', 'firm_mark_not_applicable', 'firm_undo', 'firm_set_due_override',
];

/** Each function's header, exactly (A5; FXD-4). */
const PREAMBLE = compact('returns jsonb language plpgsql security invoker set search_path = public as');

/** What a PATCH may write back — the call contract's mutable lists, in order.
 *  pending_outlook_deletes is deliberately absent: the drain writes it. */
const OBLIGATION_MUTABLE = [
  'recurrence', 'precision', 'missed_periods', 'weekend_rule', 'lead_days', 'weight', 'notes',
  'outlook_reminder_days', 'last_period_completed', 'active', 'updated_at',
];
const OCCURRENCE_MUTABLE = [
  'period_label', 'due_on', 'due_on_override', 'state', 'done_on', 'done_by', 'outcome',
  'outcome_reason', 'done_note', 'filed_at', 'sync_status', 'touched', 'updated_at',
];

/** The call contract, function by function: the keys of `p` it reads, the table
 *  writes it makes IN ORDER, and the keys it returns. */
const CONTRACT: Record<string, { p: string[]; writes: string[]; returns: string[] }> = {
  firm_activate: {
    p: ['obligation', 'occurrence', 'log'],
    writes: ['insert into firm_obligations', 'insert into firm_obligation_occurrences', 'insert into review_log'],
    returns: ['obligation', 'occurrence'],
  },
  firm_activate_from_inactive: {
    p: ['obligation_id', 'obligation_patch', 'occurrence_update', 'occurrence_insert', 'log'],
    writes: ['update firm_obligations', 'update firm_obligation_occurrences', 'insert into firm_obligation_occurrences', 'insert into review_log'],
    returns: ['obligation', 'occurrence'],
  },
  firm_update: {
    p: ['obligation_id', 'obligation_patch', 'occurrence', 'log'],
    writes: ['update firm_obligations', 'update firm_obligation_occurrences', 'insert into review_log'],
    returns: ['obligation', 'occurrence'],
  },
  firm_retire: {
    p: ['obligation_id', 'obligation_patch', 'log'],
    writes: ['update firm_obligations', 'insert into review_log'],
    returns: ['obligation'],
  },
  firm_reactivate: {
    p: ['obligation_id', 'obligation_patch', 'occurrence', 'log'],
    writes: ['update firm_obligations', 'insert into firm_obligation_occurrences', 'insert into review_log'],
    returns: ['obligation', 'occurrence'],
  },
  // The close BEFORE the next: the one-open index refuses the next beside it.
  firm_mark_done: {
    p: ['occurrence_id', 'occurrence_patch', 'next', 'obligation_id', 'obligation_patch', 'log'],
    writes: ['update firm_obligation_occurrences', 'insert into firm_obligation_occurrences', 'update firm_obligations', 'insert into review_log'],
    returns: ['closed', 'next', 'obligation'],
  },
  firm_mark_not_applicable: {
    p: ['occurrence_id', 'occurrence_patch', 'next', 'obligation_id', 'obligation_patch', 'log'],
    writes: ['update firm_obligation_occurrences', 'insert into firm_obligation_occurrences', 'update firm_obligations', 'insert into review_log'],
    returns: ['closed', 'next', 'obligation'],
  },
  // The untouched next removed BEFORE the reopen, for the same index.
  firm_undo: {
    p: ['occurrence_id', 'reopen_patch', 'remove_occurrence_id', 'obligation_id', 'obligation_patch', 'log'],
    writes: ['delete from firm_obligation_occurrences', 'update firm_obligation_occurrences', 'update firm_obligations', 'insert into review_log'],
    returns: ['reopened', 'removed', 'obligation'],
  },
  firm_set_due_override: {
    p: ['occurrence_id', 'patch', 'log'],
    writes: ['update firm_obligation_occurrences', 'insert into review_log'],
    returns: ['occurrence'],
  },
};

const REVIEW_LOG_INSERT = compact(
  `insert into review_log (entity_type, entity_id, action, "user", old_value, new_value, reason)
   values (p->'log'->>'entity_type', p->'log'->>'entity_id', p->'log'->>'action', p->'log'->>'user',
           p->'log'->>'old_value', p->'log'->>'new_value', p->'log'->>'reason')`,
);

const PROVISIONAL_MARK = '-- PROVISIONAL — #156 §1 item 9 (A5)';

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

/** The nine functions' own sections: the migration's, from its heading to the
 *  VERIFICATION heading; db/schema.sql's, from its heading to the end of the file. */
const MIGRATION_FN_HEADING = '-- ============ THE NINE ACT FUNCTIONS (FOS-2; fix slice §3 item 6, §5.3) ============';
const VERIFICATION_HEADING = '-- ============ VERIFICATION — ANSWER THESE IN WORDS ============';
const SCHEMA_FN_HEADING = '-- ============ FIRM OBLIGATIONS — THE NINE ACT FUNCTIONS (FOS-2) ============';
const F1_GRANT = 'grant execute on function next_file_number() to authenticated;';
const migrationFnSection = (() => {
  const start = migrationSql.indexOf(MIGRATION_FN_HEADING);
  const end = migrationSql.indexOf(VERIFICATION_HEADING);
  return start < 0 || end < start ? '' : migrationSql.slice(start, end);
})();
const schemaFnSection = (() => {
  const start = schemaSql.indexOf(SCHEMA_FN_HEADING);
  return start < 0 ? '' : schemaSql.slice(start);
})();

// ------------------------------------------------------ §5.1 and §5.2, twice

describe.each([
  { label: 'the migration', src: migrationSql },
  { label: "db/schema.sql's FIRM OBLIGATIONS section", src: schemaSection },
])('$label — the objects of slice §5.1 and §5.2', ({ src }) => {
  const stmts = compact(code(src));

  it('creates firm_obligations with EXACTLY the 23 columns — types, defaults, CHECKs — and no other', () => {
    const entries = tableEntries(src, 'firm_obligations');
    expect(OBLIGATION_COLUMNS).toHaveLength(23);
    expect(entries.filter((e) => !isTableConstraint(e))).toEqual(OBLIGATION_COLUMNS.map(compact));
    expect(entries.filter(isTableConstraint)).toEqual([]);
  });

  it('creates firm_obligation_occurrences with EXACTLY the 20 columns and its three row CHECKs, the third tightened (A4)', () => {
    const entries = tableEntries(src, 'firm_obligation_occurrences');
    expect(OCCURRENCE_COLUMNS).toHaveLength(20);
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

describe('the migration — its shape (slice §5.3, §5.4; fix slice §5.4)', () => {
  const exec = code(migrationSql);
  const stmts = compact(exec);
  const gateAt = migrationSql.indexOf('do $$');
  const header = gateAt > 0 ? migrationSql.slice(0, gateAt) : '';
  /** The executable text with every `$$ … $$` body blanked: the two DO blocks
   *  and the nine functions. What the FILE performs is what remains. */
  const outsideBodies = exec.replace(/\$\$[\s\S]*?\$\$/g, () => '$$ $$');

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

  it("says it is RUN BY MICHAEL'S HAND, cites BOTH authorizations, and was not run by the session that wrote it", () => {
    const prose = sqlProse(header);
    for (const phrase of [
      "RUN BY MICHAEL'S HAND", 'BACK UP FIRST', 'ALONE', 'IN WORDS',
      'did not run it and connected to no database',
      'FOS-1', '"Yes"', 'FOD-20', '#155', 'docs/specs/firm-obligations-build-slice.md',
      'FOS-2', '#156', 'docs/specs/firm-obligations-fix-slice.md', 'AMENDED IN PLACE',
      'WHAT THIS DOES', 'WHAT THIS DOES NOT DO',
    ]) {
      expect(prose, phrase).toContain(phrase);
    }
  });

  it('lists WHAT THIS DOES above WHAT THIS DOES NOT DO: the four columns, the replaced CHECK and the nine functions by name', () => {
    const does = header.indexOf('============ WHAT THIS DOES ============');
    const doesNot = header.indexOf('============ WHAT THIS DOES NOT DO, deliberately ============');
    expect(does).toBeGreaterThan(-1);
    expect(doesNot).toBeGreaterThan(does);
    const list = sqlProse(header.slice(does, doesNot));
    for (const column of FOS2_COLUMNS) expect(list, column).toContain(column);
    expect(list).toContain("(outcome is not distinct from 'not-applicable') = (outcome_reason is not null)");
    for (const fn of FUNCTIONS) expect(list, fn).toContain(fn);
    // The "does not do" list stays true: the functions define writes, the file performs none.
    expect(sqlProse(header.slice(doesNot))).toContain('The nine functions DEFINE writes; this file calls none of them');
    // The STATED, NOT FIXED note went with the fix (fix slice §3 item 5).
    expect(migrationSql).not.toContain('STATED, NOT FIXED');
  });

  it('grants the four DML privileges on both tables and EXECUTE on each of the nine — naming anon ONLY in the nine revokes', () => {
    for (const table of TABLES) {
      expect(stmts).toContain(compact(`grant select, insert, update, delete on ${table} to authenticated`));
    }
    // Table grants: still exactly the two.
    expect(stmts.match(/\bgrant select,insert,update,delete on\b/g)).toHaveLength(2);
    // Function EXECUTE: one revoke and one grant per function, and no other.
    expect(stmts.match(/\bgrant\b/g)).toHaveLength(2 + FUNCTIONS.length);
    expect(stmts.match(/\brevoke\b/g)).toHaveLength(FUNCTIONS.length);
    const revokes = FUNCTIONS.map((fn) => compact(`revoke execute on function public.${fn}(jsonb) from public, anon`));
    for (const r of revokes) expect(stmts.split(r)).toHaveLength(2);
    expect(exec.match(/\banon\b/gi)).toHaveLength(FUNCTIONS.length);
    expect(revokes.reduce((s, r) => s.replace(r, ''), stmts)).not.toMatch(/\banon\b/);
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

  it('writes no row OUTSIDE the function bodies, drops no table, and adds nothing slice §8 forbids', () => {
    // Two DO blocks and nine functions: eleven bodies, so twenty-two `$$`.
    expect(exec.match(/\$\$/g)).toHaveLength(2 * (2 + FUNCTIONS.length));
    expect(outsideBodies).not.toMatch(/\binsert\s+into\b/i);
    expect(outsideBodies).not.toMatch(/\bupdate\s+(public\.)?\w+\s+set\b/i);
    expect(outsideBodies).not.toMatch(/\bdelete\s+from\b/i);
    // Nor does anything outside a body CALL one of the functions.
    for (const fn of FUNCTIONS) {
      expect(outsideBodies.replace(new RegExp(String.raw`function public\.${fn}\(`, 'g'), '')).not.toMatch(new RegExp(String.raw`\b${fn}\b`));
    }
    expect(exec).not.toMatch(/\bdrop\s+table\b/i);
    expect(exec).not.toMatch(/legal_rules/i);
    expect(exec).not.toMatch(/snooze|dismiss|holiday|external_?ref|ledger_?ref|quickbooks|\bqbo\b|intuit|amount|payee|assignee/i);
  });

  it('reads the tightened outcome-reason CHECK in code, and not the old one (fix slice §7 item 4)', () => {
    expect(stmts).toContain(compact(TIGHTENED_CHECK));
    expect(stmts).toContain('is not distinct from');
    expect(stmts).not.toContain(compact("(outcome = 'not-applicable')"));
  });

  it('asks checks (1)–(10) at the foot, each with an EXPECT, and executes nothing there', () => {
    const heading = migrationSql.indexOf('VERIFICATION — ANSWER THESE IN WORDS');
    expect(heading).toBeGreaterThan(migrationSql.indexOf('add constraint review_log_action_check'));
    expect(heading).toBeGreaterThan(migrationSql.lastIndexOf('create or replace function'));
    // From the START of the heading's line, so the heading's own `--` comes
    // along — sliced mid-line, the heading text reads as a statement.
    const foot = migrationSql.slice(migrationSql.lastIndexOf('\n', heading) + 1);
    // Every line after the heading is a comment: the checks are for his hand.
    expect(code(foot).trim()).toBe('');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const starts = numbers.map((n) => foot.search(new RegExp(String.raw`^--\s+${n}\.\s`, 'm')));
    starts.forEach((s, i) => expect(s, `check ${i + 1} out of place`).toBeGreaterThan(i === 0 ? 0 : starts[i - 1]));
    const check = starts.map((s, i) => sqlProse(foot.slice(s, i < starts.length - 1 ? starts[i + 1] : undefined)));
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
    // (8) the four FOS-2 columns, with their types and defaults
    asks(8, [
      'information_schema.columns', 'column_default', 'is_nullable', 'exactly FOUR rows',
      'outlook_reminder_days', 'pending_outlook_deletes', 'materialized_from', "'touched'",
      "'[]'::jsonb", 'STOP',
    ]);
    // (9) the nine exist, security invoker, authenticated TRUE x9 and anon FALSE x9
    asks(9, [
      'pg_proc', 'prosecdef', 'exactly NINE rows', 'p jsonb',
      "has_function_privilege('authenticated'", "has_function_privilege('anon'", "'EXECUTE'",
      ...FUNCTIONS.map((fn) => `'public.${fn}(jsonb)'`), ...FUNCTIONS.map((fn) => `'${fn}'`),
      'TRUE', 'FALSE', 'STOP',
    ]);
    // (10) the outcome-reason CHECK reads IS NOT DISTINCT FROM
    asks(10, [
      'pg_get_constraintdef', "'public.firm_obligation_occurrences'::regclass",
      'outcome_reason IS NOT NULL', 'IS NOT DISTINCT FROM', 'exactly ONE row', 'STOP',
    ]);
  });
});

// ------------------------------------------------------ the nine act functions

describe('the migration — the nine act functions (fix slice §3 item 6, §5.3; A5, FXD-4)', () => {
  const exec = code(migrationSql);
  const fns = functionsIn(exec);
  const rawFns = functionsIn(migrationSql);

  it('defines exactly the nine, in order, each `security invoker` with its pinned search_path — and nothing security definer', () => {
    expect(fns.map((f) => f.name)).toEqual(FUNCTIONS);
    for (const f of fns) expect(compact(f.preamble), f.name).toBe(PREAMBLE);
    expect(exec).not.toMatch(/security\s+definer/i);
    expect(migrationSql.match(/create or replace function/g)).toHaveLength(FUNCTIONS.length);
  });

  it('places them after the review_log CHECK widening and before the VERIFICATION block', () => {
    expect(migrationFnSection).not.toBe('');
    expect(migrationSql.indexOf(MIGRATION_FN_HEADING)).toBeGreaterThan(migrationSql.indexOf('add constraint review_log_action_check'));
    expect(fns[0].at).toBeGreaterThan(exec.indexOf('add constraint review_log_action_check'));
  });

  it('follows each function with its revoke, THEN its grant, before the next function (the F-1 precedent)', () => {
    fns.forEach((f, i) => {
      const revoke = exec.indexOf(`revoke execute on function public.${f.name}(jsonb) from public, anon;`);
      const grant = exec.indexOf(`grant execute on function public.${f.name}(jsonb) to authenticated;`);
      expect(revoke, `${f.name}: revoke`).toBeGreaterThan(f.end);
      expect(grant, `${f.name}: grant after its revoke`).toBeGreaterThan(revoke);
      if (i < fns.length - 1) expect(fns[i + 1].at, `${f.name}: pair before the next function`).toBeGreaterThan(grant);
    });
  });

  it('reads exactly the keys of `p` the call contract names, function by function', () => {
    for (const f of fns) {
      const keys = [...new Set([...compact(f.body).matchAll(/\bp->>?'(\w+)'/g)].map((m) => m[1]))];
      expect(keys.sort(), f.name).toEqual([...CONTRACT[f.name].p].sort());
    }
  });

  it("makes exactly the contract's table writes, IN ORDER — the close before the next, the delete before the reopen", () => {
    for (const f of fns) expect(writesIn(compact(f.body)), f.name).toEqual(CONTRACT[f.name].writes);
  });

  it('writes ONE review_log line per act, its id and timestamp left to their defaults, "user" quoted (FOD-6)', () => {
    for (const f of fns) {
      const body = compact(f.body);
      expect(body.split(REVIEW_LOG_INSERT), f.name).toHaveLength(2);
      expect(body.match(/insert into review_log/g), f.name).toHaveLength(1);
    }
  });

  it('never names a matter table, cases, a case_id or the registry — and never deletes an obligation or a log line', () => {
    for (const f of fns) {
      expect(f.body, f.name).not.toMatch(/calendar_events|\bcases\b|\bcase_id\b|legal_rules/i);
      expect(f.body, f.name).not.toMatch(/delete\s+from\s+(public\.)?(firm_obligations|review_log)\b/i);
      expect(f.body, f.name).not.toMatch(/update\s+(public\.)?review_log\b/i);
    }
  });

  it('applies every PATCH by lock, read, jsonb_populate_record and an update of the MUTABLE columns only — never pending_outlook_deletes', () => {
    for (const f of fns) {
      const body = compact(f.body);
      for (const [table, mutable] of [
        ['firm_obligations', OBLIGATION_MUTABLE], ['firm_obligation_occurrences', OCCURRENCE_MUTABLE],
      ] as const) {
        const updates = [...body.matchAll(new RegExp(String.raw`update ${table} set (.*?) where (.*?) returning \* into (\w+);`, 'g'))];
        // Every update the contract names is read here — none slips past unparsed.
        expect(updates, `${f.name}: ${table} updates read`).toHaveLength(
          CONTRACT[f.name].writes.filter((w) => w === `update ${table}`).length,
        );
        for (const m of updates) {
          const [, set, where, v] = m;
          const cols = splitTop(set).map((item) => {
            const pair = /^(\w+) = (\w+)\.(\w+)$/.exec(item.trim());
            expect(pair, `${f.name}: unreadable set item "${item}"`).not.toBeNull();
            expect(pair![2], `${f.name}: ${pair![1]} set from another variable`).toBe(v);
            expect(pair![3], `${f.name}: ${pair![1]} set from another field`).toBe(pair![1]);
            return pair![1];
          });
          expect(cols, `${f.name}: ${table}`).toEqual([...mutable]);
          // The row is locked and read, then the patch laid over it.
          const lock = body.indexOf(`select * into ${v} from ${table} where id = `);
          const lay = body.indexOf(`${v} := jsonb_populate_record(${v},p->`);
          expect(lock, `${f.name}: ${v} locked`).toBeGreaterThan(-1);
          expect(body.slice(lock).split(';')[0], `${f.name}: ${v} read for update`).toMatch(/ for update$/);
          expect(body.slice(lock), `${f.name}: not-found guard`).toMatch(/^[^;]*; if not found then raise exception '/);
          expect(lay, `${f.name}: patch laid over ${v}`).toBeGreaterThan(lock);
          expect(body.indexOf(m[0]), `${f.name}: update after the patch`).toBeGreaterThan(lay);
          if (table === 'firm_obligations') {
            expect(where, f.name).toMatch(/^id = \w+$/);
          } else {
            // An occurrence moves only from the state the plan was built on — raise if none.
            expect(where, f.name).toMatch(f.name === 'firm_undo' ? /^id = \w+ and state = 'done'$/ : /^id = \w+ and state = 'open'$/);
            expect(body.slice(body.indexOf(m[0]) + m[0].length), f.name).toMatch(/^ if not found then raise exception '/);
          }
        }
        expect(body, f.name).not.toMatch(/pending_outlook_deletes =/);
      }
    }
  });

  it('inserts every ROW under an explicit column list in table order, a default standing in (coalesce) wherever the column has one', () => {
    const colName = (spec: string) => compact(spec).split(' ')[0];
    const colDefault = (spec: string) => / default (.*?)(?: check\(.*)?$/.exec(compact(spec))?.[1] ?? null;
    for (const f of fns) {
      const body = compact(f.body);
      for (const [table, columns] of [
        ['firm_obligations', OBLIGATION_COLUMNS], ['firm_obligation_occurrences', OCCURRENCE_COLUMNS],
      ] as const) {
        const inserts = [...body.matchAll(new RegExp(String.raw`insert into ${table}\(([^)]*)\)values\(`, 'g'))];
        // Every insert the contract names is read here — none slips past unparsed.
        expect(inserts, `${f.name}: ${table} inserts read`).toHaveLength(
          CONTRACT[f.name].writes.filter((w) => w === `insert into ${table}`).length,
        );
        for (const m of inserts) {
          expect(m[1].split(','), `${f.name}: ${table} columns`).toEqual(columns.map(colName));
          let depth = 1;
          let i = m.index! + m[0].length;
          const open = i;
          for (; i < body.length && depth > 0; i++) {
            if (body[i] === '(') depth++;
            else if (body[i] === ')') depth--;
          }
          const vals = splitTop(body.slice(open, i - 1));
          const v = /^coalesce\((\w+)\.id,/.exec(vals[0])?.[1];
          expect(v, `${f.name}: ${table} row variable`).toBeTruthy();
          expect(vals, `${f.name}: ${table} values`).toEqual(columns.map((spec) => {
            const d = colDefault(spec);
            return d === null ? `${v}.${colName(spec)}` : `coalesce(${v}.${colName(spec)},${d})`;
          }));
          expect(body.slice(i), `${f.name}: returning`).toMatch(new RegExp(String.raw`^returning \* into ${v};`));
          expect(body.slice(0, m.index!), `${f.name}: ${v} read from its row`).toContain(`${v} := jsonb_populate_record(null::${table},p->`);
        }
      }
    }
  });

  it('refuses what the call contract refuses, before anything is written', () => {
    const at = (f: SqlFunction, re: RegExp) => compact(f.body).search(re);
    const firstWrite = (f: SqlFunction) => compact(f.body).search(/\b(insert into|update|delete from) \w+/);
    const byName = Object.fromEntries(fns.map((f) => [f.name, f]));
    // A re-activation refuses an obligation already active; Retire one already retired.
    for (const name of ['firm_activate_from_inactive', 'firm_reactivate']) {
      const guard = at(byName[name], /if \w+\.active then raise exception '/);
      expect(guard, name).toBeGreaterThan(-1);
      expect(guard, name).toBeLessThan(firstWrite(byName[name]));
    }
    const retire = at(byName.firm_retire, /if not \w+\.active then raise exception '/);
    expect(retire).toBeGreaterThan(-1);
    expect(retire).toBeLessThan(firstWrite(byName.firm_retire));
    // Done carries 'completed' and Not applicable carries 'not-applicable', or nothing moves.
    for (const [name, outcome] of [['firm_mark_done', 'completed'], ['firm_mark_not_applicable', 'not-applicable']]) {
      const body = compact(byName[name].body);
      const guard = body.indexOf(compact(`if (p->'occurrence_patch'->>'outcome') is distinct from '${outcome}' then raise exception '`));
      expect(guard, name).toBeGreaterThan(-1);
      expect(guard, name).toBeLessThan(firstWrite(byName[name]));
    }
    // Undo removes the next only while it is open, untouched, and this close's own.
    const undo = compact(byName.firm_undo.body);
    const removeVar = /(\w+) uuid :=\(p->>'remove_occurrence_id'\)::uuid;/.exec(undo)?.[1];
    const closedVar = /(\w+) uuid :=\(p->>'occurrence_id'\)::uuid;/.exec(undo)?.[1];
    expect(removeVar).toBeTruthy();
    expect(closedVar).toBeTruthy();
    expect(undo).toMatch(new RegExp(
      String.raw`if ${removeVar} is not null then delete from firm_obligation_occurrences where id = ${removeVar} and state = 'open' and touched = false and materialized_from = ${closedVar} returning \* into \w+; if not found then raise exception '`,
    ));
  });

  it('returns a jsonb object of to_jsonb rows under the contract keys', () => {
    for (const f of fns) {
      const m = /return jsonb_build_object\(([^;]*)\);/.exec(compact(f.body));
      expect(m, f.name).not.toBeNull();
      const args = splitTop(m![1]);
      expect(quoted(args.filter((_, i) => i % 2 === 0).join(',')), f.name).toEqual(CONTRACT[f.name].returns);
      for (const value of args.filter((_, i) => i % 2 === 1)) expect(value, f.name).toMatch(/^(to_jsonb\(\w+\)|j_\w+)$/);
    }
  });

  it('marks every refusal message PROVISIONAL on its own line (#156 §1 item 9, A5)', () => {
    let messages = 0;
    for (const f of rawFns) {
      for (const line of f.body.split('\n').filter((l) => /raise exception/.test(l))) {
        messages++;
        expect(line, f.name).toMatch(/raise exception '[^']+';/);
        expect(line, f.name).toContain(PROVISIONAL_MARK);
      }
    }
    expect(messages).toBeGreaterThan(0);
  });
});

// ------------------------------------------------------ db/schema.sql, same commit

describe('db/schema.sql — the same commit (slice §5.3, §3 item 2; fix slice §5.4)', () => {
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

  it('reads the tightened outcome-reason CHECK in code, and not the old one (fix slice §7 item 4)', () => {
    const stmts = compact(code(schemaSection));
    expect(stmts).toContain(compact(TIGHTENED_CHECK));
    expect(stmts).toContain('is not distinct from');
    expect(compact(code(schemaSql))).not.toContain(compact("(outcome = 'not-applicable')"));
    expect(schemaSql).not.toContain('why the third is weaker than it reads');
  });

  it('carries the nine functions in a section APPENDED at the end, after the F-1 lines — the same code as the migration', () => {
    expect(schemaFnSection).not.toBe('');
    expect(schemaSql.indexOf(SCHEMA_FN_HEADING)).toBeGreaterThan(schemaSql.indexOf(F1_GRANT));
    expect(schemaSql.match(/create or replace function public\.firm_/g)).toHaveLength(FUNCTIONS.length);
    const schemaFns = functionsIn(code(schemaFnSection));
    expect(schemaFns.map((f) => f.name)).toEqual(FUNCTIONS);
    // Function for function, header and body: the migration's code, not a paraphrase of it.
    const shape = (f: SqlFunction) => ({ name: f.name, preamble: compact(f.preamble), body: compact(f.body) });
    expect(schemaFns.map(shape)).toEqual(functionsIn(code(migrationFnSection)).map(shape));
    // And the whole section, statement for statement, pairs included.
    expect(compact(code(schemaFnSection))).toBe(compact(code(migrationFnSection)));
  });

  it("gives each function its revoke THEN its grant, naming anon only in those nine revokes, and leaves nothing else in the section", () => {
    const stmts = compact(code(schemaFnSection));
    for (const fn of FUNCTIONS) {
      const revoke = stmts.indexOf(compact(`revoke execute on function public.${fn}(jsonb) from public, anon`));
      const grant = stmts.indexOf(compact(`grant execute on function public.${fn}(jsonb) to authenticated`));
      expect(revoke, fn).toBeGreaterThan(stmts.indexOf(`create or replace function public.${fn}(`));
      expect(grant, fn).toBeGreaterThan(revoke);
    }
    expect(stmts.match(/\bgrant\b/g)).toHaveLength(FUNCTIONS.length);
    expect(stmts.match(/\brevoke\b/g)).toHaveLength(FUNCTIONS.length);
    expect(stmts.match(/\banon\b/g)).toHaveLength(FUNCTIONS.length);
    // Strip the nine definitions and their pairs: nothing may remain.
    let rest = code(schemaFnSection).replace(/create or replace function public\.\w+\(p jsonb\)[\s\S]*?\$\$[\s\S]*?\$\$;/g, '');
    for (const fn of FUNCTIONS) {
      rest = rest
        .replace(`revoke execute on function public.${fn}(jsonb) from public, anon;`, '')
        .replace(`grant execute on function public.${fn}(jsonb) to authenticated;`, '');
    }
    expect(rest.trim()).toBe('');
  });
});
