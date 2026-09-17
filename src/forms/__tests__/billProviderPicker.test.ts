// THE NEW-BILL FORM'S PROVIDER PICKER — `#156` §2 (B6).
//
// Authority: docs/specs/firm-obligations-fix-slice.md §3 item 17 and §7 item 14.
// Michael: "The Providers section's list (case_providers)". The picker reads the
// case's `case_providers` rows — the list the Medical tab shows above the ledger
// — instead of the `providerBusiness` parties linked to the case, which on the
// seeded Garcia matter offered none of its nine facilities (spec-feedback THIRD
// TRANCHE item 11).
//
// The option builder is a PURE function so it can be tested without a screen;
// the page's wiring to it is asserted over source in `cc1Surfaces.test.ts`.

import { describe, it, expect } from 'vitest';
import { seedData } from '../../data/seed';
import {
  billProviderOptions, providerSortKey, sortProvidersOldestFirst,
  type CaseProvider,
} from '../../domain/caseProviders';

const seed = seedData();
const nameOf = (id: string) => seed.parties.find((p) => p.id === id)?.displayName;
const sources = {
  individuals: seed.caseProviderIndividuals,
  visits: seed.caseProviderVisits,
  bills: seed.bills,
};
const rowsFor = (caseId: string) => seed.caseProviders.filter((p) => p.caseId === caseId);

describe('B6 — the picker on the seeded Garcia matter', () => {
  const garcia = rowsFor('c-garcia-mvc');
  const options = billProviderOptions(garcia, sources, nameOf);

  it('lists the NINE case_providers facilities, and only those', () => {
    expect(garcia).toHaveLength(9);
    expect(options).toHaveLength(9);
    expect(options.map((o) => o.value).sort())
      .toEqual([...new Set(garcia.map((r) => r.facilityPartyId))].sort());
    // ProCare is LINKED to the case as a providerBusiness party (the old source)
    // but has no case_providers row, so it is no longer offered.
    expect(options.map((o) => o.value)).not.toContain('p-prov-procare');
  });

  it('keys each option on the FACILITY PARTY id and labels it with that party\'s name', () => {
    for (const o of options) {
      expect(garcia.some((r) => r.facilityPartyId === o.value)).toBe(true);
      expect(garcia.some((r) => r.id === o.value)).toBe(false);   // never a row id
      expect(o.label).toBe(nameOf(o.value));
    }
    expect(options.find((o) => o.value === 'p-hosp-ctrmc')?.label)
      .toBe('Central Texas Regional Medical Center');
  });

  it('is in the Providers section\'s order — oldest treatment first, undated last', () => {
    // The Providers section's own chain, recomputed here from the same three
    // sources, so the two lists cannot quietly disagree about order.
    const keyOf = (row: CaseProvider) => {
      const mine = sources.individuals.filter((i) => i.caseProviderId === row.id);
      const ids = new Set(mine.map((i) => i.id));
      return providerSortKey(row, {
        individuals: mine,
        visitDates: sources.visits.filter((v) => ids.has(v.individualId)).map((v) => v.visitDate),
        billServiceStarts: sources.bills
          .filter((b) => b.facilityPartyId === row.facilityPartyId).map((b) => b.serviceStart),
      });
    };
    const expected = sortProvidersOldestFirst(garcia, keyOf, (r) => nameOf(r.facilityPartyId) ?? '')
      .map((r) => r.facilityPartyId);
    expect(options.map((o) => o.value)).toEqual(expected);
    expect(options[0].label).toBe('Bell County Emergency Medical Services');
    expect(options[1].label).toBe('Central Texas Regional Medical Center');
    expect(options[options.length - 1].label).toBe('Sunken Meadow Pharmacy');
  });

  it('R7 — picking an option pre-fills the label from THAT row\'s label', () => {
    // The form's own expression (pinned over source in cc1Surfaces.test.ts):
    // `providerOptions.find((o) => o.value === id)?.label ?? ''`.
    const prefill = (id: string) => options.find((o) => o.value === id)?.label ?? '';
    expect(prefill('p-fx-chiro')).toBe('Serpentine Chiropractic & Wellness');
    expect(prefill('p-fx-pharm')).toBe('Sunken Meadow Pharmacy');
    expect(prefill('')).toBe('');
  });
});

describe('B6 — the two-client PREMISES matter', () => {
  it('lists a facility shared by two clients ONCE — the build\'s de-duplication reading', () => {
    const premises = rowsFor('c-fx-premises');
    // Two rows, one per client, on the SAME facility party.
    expect(premises).toHaveLength(2);
    expect(new Set(premises.map((r) => r.facilityPartyId)).size).toBe(1);

    const options = billProviderOptions(premises, sources, nameOf);
    expect(options).toEqual([
      { value: 'p-fx-premises-clinic', label: 'Ironbark Occupational Clinic' },
    ]);
  });
});

describe('B6 — edge cases', () => {
  const T = '2026-09-16T00:00:00.000Z';
  const row = (id: string, facilityPartyId: string, over: Partial<CaseProvider> = {}): CaseProvider => ({
    id, caseId: 'c1', facilityPartyId, lop: false, createdAt: T, updatedAt: T, ...over,
  });

  it('a case with no case_providers rows offers nothing', () => {
    expect(billProviderOptions([], { individuals: [], visits: [], bills: [] }, () => 'X')).toEqual([]);
  });

  it('keeps the FIRST appearance in sorted order when a facility repeats', () => {
    const rows = [
      row('r-late', 'f-shared', { treatmentFrom: '2026-05-01' }),
      row('r-mid', 'f-other', { treatmentFrom: '2026-03-01' }),
      row('r-early', 'f-shared', { treatmentFrom: '2026-01-01' }),
    ];
    const names: Record<string, string> = { 'f-shared': 'Shared Clinic', 'f-other': 'Other Clinic' };
    expect(billProviderOptions(rows, { individuals: [], visits: [], bills: [] }, (id) => names[id])
      .map((o) => o.value)).toEqual(['f-shared', 'f-other']);
  });

  it('labels an unreadable facility party as the Providers section does', () => {
    expect(billProviderOptions([row('r1', 'f-gone')], { individuals: [], visits: [], bills: [] }, () => undefined))
      .toEqual([{ value: 'f-gone', label: '(contact not found)' }]);
  });
});
