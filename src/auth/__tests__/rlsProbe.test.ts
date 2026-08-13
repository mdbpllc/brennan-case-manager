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

  it('covers all 36 schema tables with one policy-less exception', () => {
    // 32 + the two CL-2 tables (case_clients, case_client_flags) + the two CD-1
    // tables (case_roster_flags, contact_edges). A table the probe does not
    // list is a table whose missing GRANT nothing would catch.
    expect(SCHEMA_TABLES).toHaveLength(36);
    expect(SCHEMA_TABLES.filter((t) => t.policy)).toHaveLength(35);
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
