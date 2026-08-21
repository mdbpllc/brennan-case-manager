import { describe, it, expect } from 'vitest';
import {
  classifyDenial,
  expectedUnreachable,
  shouldWarnPrivilegeWall,
  SCHEMA_TABLES,
  type ReadResult,
} from '../rlsProbe';

const ok = (table: string, rows = 0): ReadResult => ({ table, ok: true, rows });
const refused = (table: string, layer: 'privilege' | 'rls' | 'other'): ReadResult => ({
  table,
  ok: false,
  rows: null,
  status: 403,
  code: '42501',
  message: layer === 'privilege' ? 'permission denied for table' : 'new row violates row-level security policy',
  layer,
});

describe('classifyDenial', () => {
  it('separates the two things Postgres both calls 42501', () => {
    expect(classifyDenial('42501', 'permission denied for table cases')).toBe('privilege');
    expect(classifyDenial('42501', 'new row violates row-level security policy for table "cases"')).toBe('rls');
  });

  it('treats anything that is not 42501 as other', () => {
    expect(classifyDenial('PGRST205', 'Could not find the table')).toBe('other');
    expect(classifyDenial(undefined, undefined)).toBe('other');
  });
});

describe('expectedUnreachable', () => {
  it('is exactly file_counters — the one deliberately policy-less table', () => {
    expect([...expectedUnreachable()]).toEqual(['file_counters']);
  });

  it('covers all 41 schema tables with one policy-less exception', () => {
    // 32 + the two CL-2 tables (case_clients, case_client_flags) + the two CD-1
    // tables (case_roster_flags, contact_edges) + gate 10's party_pii + FE-D1's
    // four form-engine tables. A table the probe does not list is a table whose
    // missing GRANT nothing would catch.
    //
    // The 37 this asserted until 2026-08-20 is the figure the gate-3 write-path
    // run measured; FE-D1's four arrive after that run and are outside its
    // 37x2 grid, carrying their own from-birth evidence instead.
    expect(SCHEMA_TABLES).toHaveLength(41);
    expect(SCHEMA_TABLES.filter((t) => t.policy)).toHaveLength(40);
  });

  it('lists the FE-D1 form-engine tables, probed from birth (slice item 11)', () => {
    const names = SCHEMA_TABLES.map((t) => t.name);
    expect(names).toContain('form_format_profiles');
    expect(names).toContain('form_templates');
    expect(names).toContain('form_template_versions');
    expect(names).toContain('form_token_definitions');
  });

  it('is sequence-identical to db/schema.sql\'s own create-table order', async () => {
    // The list documents this invariant in its own header ("so this list can be
    // diffed against `grep '^create table' db/schema.sql` without reconciling
    // two orderings"). Asserting it mechanically is what keeps that true: a
    // table added to the schema and forgotten here is exactly the table whose
    // missing GRANT nothing would catch.
    const { default: sql } = await import('../../../db/schema.sql?raw');
    const declared = [...sql.matchAll(/^create table if not exists (\w+)/gm)].map((m) => m[1]);
    expect(SCHEMA_TABLES.map((t) => t.name)).toEqual(declared);
  });

  it('lists the CD-1 tables, so their grants are probed from birth', () => {
    // Slice item 6: the #28 lesson applied proactively. These went into the
    // probe in the same commit as the tables, not after a defect.
    const names = SCHEMA_TABLES.map((t) => t.name);
    expect(names).toContain('contact_edges');
    expect(names).toContain('case_roster_flags');
  });

  it('lists the CL-2 tables, so their grants are actually probed', () => {
    const names = SCHEMA_TABLES.map((t) => t.name);
    expect(names).toContain('case_clients');
    expect(names).toContain('case_client_flags');
  });

  it('lists gate 10 party_pii, so a missing GRANT on the SSN table cannot hide', () => {
    // The gate 10 slice ships the table, its RLS, its policy and its GRANT in
    // one act; the probe row lands in the same commit for the same reason.
    const names = SCHEMA_TABLES.map((t) => t.name);
    expect(names).toContain('party_pii');
  });
});

describe('shouldWarnPrivilegeWall', () => {
  it('fires when every table is walled off — the 2026-07-28 pre-grants state', () => {
    const reads = SCHEMA_TABLES.map((t) => refused(t.name, 'privilege'));
    expect(shouldWarnPrivilegeWall(reads)).toBe(true);
  });

  it('DOES NOT fire on a healthy signed-in run where only the control is refused', () => {
    // The defect: 31 of 32 reachable, file_counters refused by design, and the
    // banner told Michael to re-run a migration that had already succeeded.
    const reads: ReadResult[] = SCHEMA_TABLES.map((t) =>
      t.policy ? ok(t.name) : refused(t.name, 'privilege'),
    );
    expect(shouldWarnPrivilegeWall(reads)).toBe(false);
  });

  it('does not fire when everything is reachable', () => {
    expect(shouldWarnPrivilegeWall(SCHEMA_TABLES.map((t) => ok(t.name)))).toBe(false);
  });

  it('still fires when a real table is walled off alongside the control', () => {
    const reads: ReadResult[] = [
      refused('file_counters', 'privilege'),
      refused('cases', 'privilege'),
      ok('parties'),
    ];
    expect(shouldWarnPrivilegeWall(reads)).toBe(true);
  });

  it('does not blame the privilege layer when the refusal came from elsewhere', () => {
    const reads: ReadResult[] = [
      refused('file_counters', 'privilege'),
      { table: 'cases', ok: false, rows: null, code: 'PGRST205', message: 'missing', layer: 'other' },
    ];
    expect(shouldWarnPrivilegeWall(reads)).toBe(false);
  });
});
