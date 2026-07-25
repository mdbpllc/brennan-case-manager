import { describe, expect, it } from 'vitest';
import { processBill } from '../lifecycle';
import type { LegalRule } from '../../domain/billing';
import type { TrackedBill } from '../../domain/bills';
import type { WatchFlag } from '../../domain/statutes';

const rule18001: LegalRule = {
  id: 'r-18001', ruleKey: 'cprc-18-001', proposition: 'p',
  cites: ['Tex. Civ. Prac. & Rem. Code §18.001'], scope: 'billing',
  status: 'verified', version: 1, createdAt: 't', updatedAt: 't',
};

const bill = (status: TrackedBill['status'], effectiveDate?: string): TrackedBill => ({
  id: 'b1', legiscanBillId: 99001, sessionId: 2172, billNumber: 'HB 9901',
  title: 'Relating to affidavits concerning cost and necessity of services.',
  status, effectiveDate, changeHash: 'h1', lastPolled: 't', rawJson: '{}',
});

const REFS = [{ code: 'CP', chapter: '18', section: '18.001' }];

const pendingFlag: WatchFlag = {
  id: 'f-pending', ruleId: 'r-18001', kind: 'pending-bill',
  sourceRef: 'HB 9901', raisedAt: 't',
};

describe('processBill lifecycle', () => {
  it('active bill raises pending-bill flags on touched rules', () => {
    const a = processBill(bill('introduced'), REFS, [rule18001], []);
    expect(a.raise).toHaveLength(1);
    expect(a.raise[0]).toMatchObject({ ruleId: 'r-18001', kind: 'pending-bill', sourceRef: 'HB 9901' });
    expect(a.raise[0].detail).toContain('CP 18.001');
    expect(a.clear).toEqual([]);
  });

  it('does not duplicate an existing active pending flag', () => {
    const a = processBill(bill('engrossed'), REFS, [rule18001], [pendingFlag]);
    expect(a.raise).toEqual([]);
  });

  it('passage hardens: clears pending, raises enacted-change-pending with effective date', () => {
    const a = processBill(bill('passed', '2027-09-01'), REFS, [rule18001], [pendingFlag]);
    expect(a.clear).toHaveLength(1);
    expect(a.clear[0].reason).toContain('hardened');
    expect(a.raise).toHaveLength(1);
    expect(a.raise[0]).toMatchObject({ kind: 'enacted-change-pending', effectiveDate: '2027-09-01' });
    expect(a.log[0]).toContain('HB 9901 passed');
  });

  it('death auto-clears every flag the bill raised, attributed to the system', () => {
    const enacted: WatchFlag = { ...pendingFlag, id: 'f-enacted', kind: 'enacted-change-pending' };
    const a = processBill(bill('dead'), REFS, [rule18001], [pendingFlag, enacted]);
    expect(a.raise).toEqual([]);
    expect(a.clear.map((c) => c.flagId).sort()).toEqual(['f-enacted', 'f-pending']);
    expect(a.clear[0].reason).toContain('died');
    expect(a.log[0]).toContain('2 flag(s) auto-cleared');
  });

  it('veto clears with a veto reason', () => {
    const a = processBill(bill('vetoed'), REFS, [rule18001], [pendingFlag]);
    expect(a.clear[0].reason).toContain('vetoed');
  });

  it('a bill touching nothing does nothing', () => {
    const a = processBill(bill('introduced'), [{ code: 'ED', chapter: '1001', section: '1001.056' }], [rule18001], []);
    expect(a.raise).toEqual([]);
    expect(a.clear).toEqual([]);
  });
});
