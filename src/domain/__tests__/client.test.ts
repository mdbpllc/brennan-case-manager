import { describe, it, expect } from 'vitest';
import type { CaseClient } from '../client';
import { earliestLimitations, isResolved, showsClientLayer, sortClients } from '../client';

const t = '2026-07-28T00:00:00.000Z';

function client(over: Partial<CaseClient> = {}): CaseClient {
  return {
    id: 'cc-1', caseId: 'c-1', partyId: 'p-1', posture: 'claimant', displayOrder: 0,
    clientFlags: [], feeArrangement: {}, profileFields: {}, createdAt: t, updatedAt: t,
    ...over,
  };
}

describe('earliestLimitations (D-CL2-2, D-CL2-2a)', () => {
  it('returns undefined when there are no clients at all', () => {
    // A flagged case: the date lives on the backfill flag, not here.
    expect(earliestLimitations([])).toBeUndefined();
  });

  it('returns undefined when no client carries a date', () => {
    expect(earliestLimitations([client(), client({ id: 'cc-2' })])).toBeUndefined();
  });

  it('takes the earliest date across clients', () => {
    const cs = [
      client({ id: 'a', statuteOfLimitations: '2028-03-14' }),
      client({ id: 'b', statuteOfLimitations: '2027-11-02' }),
      client({ id: 'c', statuteOfLimitations: '2029-01-01' }),
    ];
    expect(earliestLimitations(cs)).toBe('2027-11-02');
  });

  it('EXCLUDES disbursed clients — a settled client must not keep a live matter showing false urgency', () => {
    // This is D-CL2-2a and it is the reason the two-client-one-settled
    // walkthrough scenario exists: without it the rule is invisible.
    const cs = [
      client({ id: 'settled', statuteOfLimitations: '2027-01-01', disbursedAt: '2026-07-01' }),
      client({ id: 'live', statuteOfLimitations: '2028-03-14' }),
    ];
    expect(earliestLimitations(cs)).toBe('2028-03-14');
  });

  it('returns undefined when every client carrying a date has disbursed', () => {
    const cs = [client({ statuteOfLimitations: '2027-01-01', disbursedAt: '2026-07-01' })];
    expect(earliestLimitations(cs)).toBeUndefined();
  });

  it('treats "resolved" as DISBURSED, not as any other status (D-CL2-4a)', () => {
    expect(isResolved(client())).toBe(false);
    expect(isResolved(client({ disbursedAt: '2026-07-01' }))).toBe(true);
  });
});

describe('showsClientLayer (D-CL2-7)', () => {
  it('stays hidden on a single-client case — it must click exactly as it does today', () => {
    expect(showsClientLayer([])).toBe(false);
    expect(showsClientLayer([client()])).toBe(false);
  });

  it('appears the moment a second client exists', () => {
    expect(showsClientLayer([client(), client({ id: 'cc-2' })])).toBe(true);
  });

  it('stays visible even when one of the two has disbursed', () => {
    // The ledger still has to separate by body after one client settles.
    expect(showsClientLayer([client(), client({ id: 'cc-2', disbursedAt: '2026-07-01' })])).toBe(true);
  });
});

describe('sortClients', () => {
  it('orders by displayOrder, then creation time', () => {
    const cs = [
      client({ id: 'b', displayOrder: 1 }),
      client({ id: 'a', displayOrder: 0 }),
      client({ id: 'c', displayOrder: 1, createdAt: '2026-07-29T00:00:00.000Z' }),
    ];
    expect(sortClients(cs).map((c) => c.id)).toEqual(['a', 'b', 'c']);
  });

  it('does not mutate its input', () => {
    const cs = [client({ id: 'b', displayOrder: 1 }), client({ id: 'a', displayOrder: 0 })];
    sortClients(cs);
    expect(cs.map((c) => c.id)).toEqual(['b', 'a']);
  });
});
