import { describe, expect, it } from 'vitest';
import { buildWorklist } from '../worklist';
import type { LegalRule } from '../../domain/billing';
import type { WatchFlag } from '../../domain/statutes';

const rule = (id: string): LegalRule => ({
  id, ruleKey: id, proposition: 'p', cites: [], scope: 'billing',
  status: 'verified', version: 1, createdAt: 't', updatedAt: 't',
});
const RULES = [rule('r1'), rule('r2'), rule('r3')];

const flag = (ruleId: string, kind: WatchFlag['kind'], extra?: Partial<WatchFlag>): WatchFlag => ({
  id: `f-${ruleId}-${kind}-${extra?.effectiveDate ?? ''}`, ruleId, kind,
  sourceRef: kind === 'text-changed-since-verified' ? 'CP 41.0105' : 'HB 9901',
  raisedAt: '2027-06-01T00:00:00Z', ...extra,
});

const TODAY = '2027-09-01';

describe('buildWorklist', () => {
  it('text-changed flags are due immediately', () => {
    const w = buildWorklist(RULES, [flag('r1', 'text-changed-since-verified')], TODAY);
    expect(w.due.map((i) => i.rule.id)).toEqual(['r1']);
    expect(w.upcoming).toEqual([]);
  });

  it('enacted changes join the worklist ON the effective date, not before', () => {
    const before = buildWorklist(RULES, [flag('r1', 'enacted-change-pending', { effectiveDate: '2027-09-01' })], '2027-08-31');
    expect(before.due).toEqual([]);
    expect(before.upcoming.map((i) => i.rule.id)).toEqual(['r1']);

    const onDay = buildWorklist(RULES, [flag('r1', 'enacted-change-pending', { effectiveDate: '2027-09-01' })], TODAY);
    expect(onDay.due.map((i) => i.rule.id)).toEqual(['r1']);
  });

  it('enacted change with no recorded effective date stays upcoming (surfaced, not due)', () => {
    const w = buildWorklist(RULES, [flag('r2', 'enacted-change-pending')], TODAY);
    expect(w.due).toEqual([]);
    expect(w.upcoming.map((i) => i.rule.id)).toEqual(['r2']);
  });

  it('pending-bill flags never enter the worklist — counted as context only', () => {
    const w = buildWorklist(RULES, [flag('r1', 'pending-bill'), flag('r2', 'pending-bill')], TODAY);
    expect(w.due).toEqual([]);
    expect(w.upcoming).toEqual([]);
    expect(w.pendingBills).toBe(1); // same bill (HB 9901) on two rules = one bill
  });

  it('section-removed flags are due immediately and outrank text-changed rules', () => {
    const w = buildWorklist(RULES, [
      flag('r1', 'text-changed-since-verified'),
      flag('r3', 'section-removed', { sourceRef: 'CR 55.02' }),
    ], TODAY);
    // r3 sorts before r1 despite ruleKey order: its cite points at nothing.
    expect(w.due.map((i) => i.rule.id)).toEqual(['r3', 'r1']);
    expect(w.upcoming).toEqual([]);
  });

  it('a rule due now does not double-list under upcoming; cleared flags ignored', () => {
    const w = buildWorklist(RULES, [
      flag('r1', 'text-changed-since-verified'),
      flag('r1', 'enacted-change-pending', { effectiveDate: '2028-01-01' }),
      flag('r3', 'text-changed-since-verified', { clearedAt: '2027-07-01T00:00:00Z' }),
    ], TODAY);
    expect(w.due.map((i) => i.rule.id)).toEqual(['r1']);
    expect(w.due[0].flags).toHaveLength(1);
    expect(w.upcoming).toEqual([]);
  });
});
