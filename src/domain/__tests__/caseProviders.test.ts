// R17 — the case-scoped provider record's domain rules.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §3.1, and the named defaults
// D-13 (the one sort key), D-32 (the only pre-fill), D-48, D-53, D-55, D-60.
//
// These are tested here rather than through the UI because this is where the
// rulings live: the component reads them. There is no jsdom in this repo, by
// deliberate choice, so component behaviour is asserted over source text
// elsewhere and LOGIC is asserted here.

import { describe, it, expect } from 'vitest';
import {
  activeIndividuals, carriedType, hasExtractionRun, newestReadableVersion,
  providerSortKey, providerTreatmentWindow, sortIndividuals,
  sortProvidersOldestFirst, validateCaseProvider,
  type CaseProvider, type CaseProviderIndividual, type CaseChronologyVersion,
} from '../caseProviders';

const T = '2026-09-03T00:00:00.000Z';

function provider(over: Partial<CaseProvider> = {}): CaseProvider {
  return {
    id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', lop: false,
    createdAt: T, updatedAt: T, ...over,
  };
}

function individual(over: Partial<CaseProviderIndividual> = {}): CaseProviderIndividual {
  return {
    id: 'i1', caseProviderId: 'cp1', displayName: 'Jane Doe', provenance: 'model',
    missingFromLatest: false, handEditedFields: [], createdAt: T, updatedAt: T, ...over,
  };
}

const NO_INPUTS = { individuals: [], visitDates: [], billServiceStarts: [] };

describe('D-13 — the ONE sort key, and the hand value that outranks it', () => {
  it("takes the facility's HAND-SET date before anything derived", () => {
    // This ordering is the whole point. R17's dates are part of the record
    // Michael keys, so a derivation that overwrote them would be the app
    // arguing with him about his own matter.
    const key = providerSortKey(provider({ treatmentFrom: '2025-06-01' }), {
      individuals: [individual({ treatmentFrom: '2025-01-01' })],
      visitDates: ['2024-01-01'],
      billServiceStarts: ['2023-01-01'],
    });
    expect(key).toBe('2025-06-01');
  });

  it('falls to the earliest individual, then the earliest visit, then the bill', () => {
    expect(providerSortKey(provider(), {
      individuals: [individual({ treatmentFrom: '2025-03-04' }), individual({ treatmentFrom: '2025-01-09' })],
      visitDates: ['2024-01-01'], billServiceStarts: ['2023-01-01'],
    })).toBe('2025-01-09');

    expect(providerSortKey(provider(), {
      individuals: [], visitDates: ['2024-07-07', '2024-02-02'], billServiceStarts: ['2023-01-01'],
    })).toBe('2024-02-02');

    expect(providerSortKey(provider(), {
      individuals: [], visitDates: [], billServiceStarts: ['2023-05-05', '2023-02-02'],
    })).toBe('2023-02-02');

    expect(providerSortKey(provider(), NO_INPUTS)).toBeUndefined();
  });

  it('ignores a REMOVED individual when deriving the date (D-55)', () => {
    const key = providerSortKey(provider(), {
      individuals: [
        individual({ id: 'gone', treatmentFrom: '2020-01-01', removedByHandAt: T }),
        individual({ treatmentFrom: '2025-01-01' }),
      ],
      visitDates: [], billServiceStarts: [],
    });
    expect(key).toBe('2025-01-01');
  });

  it('renders the same chain as the "dates of treatment" window', () => {
    const w = providerTreatmentWindow(provider(), {
      individuals: [individual({ treatmentFrom: '2025-01-01', treatmentTo: '2025-02-01' })],
      visitDates: ['2025-03-15'], billServiceStarts: [],
    });
    expect(w.from).toBe('2025-01-01');
    expect(w.to).toBe('2025-03-15');
  });
});

describe('§8.4 — ONE order, oldest treatment first, undated LAST', () => {
  it('sorts dated ascending and puts undated facilities at the END', () => {
    // Undated LAST is the part a naive ascending sort gets backwards, and it
    // is the visible half of the rule: the tab shows them with "no date".
    const rows = [
      { id: 'c', key: undefined as string | undefined, name: 'Zebra Clinic' },
      { id: 'a', key: '2025-03-01', name: 'Alpha' },
      { id: 'b', key: '2025-01-01', name: 'Beta' },
      { id: 'd', key: undefined as string | undefined, name: 'Apple Clinic' },
    ];
    const out = sortProvidersOldestFirst(rows, (r) => r.key, (r) => r.name);
    expect(out.map((r) => r.id)).toEqual(['b', 'a', 'd', 'c']);
  });

  it('breaks ties on facility name so the order is total and stable', () => {
    const rows = [
      { id: 'x', key: '2025-01-01', name: 'Whitestone' },
      { id: 'y', key: '2025-01-01', name: 'Ashford' },
    ];
    expect(sortProvidersOldestFirst(rows, (r) => r.key, (r) => r.name).map((r) => r.id))
      .toEqual(['y', 'x']);
  });

  it('orders individuals by chronology appearance, hand-added LAST', () => {
    const rows = [
      individual({ id: 'hand-b', displayName: 'Zed', sortOrder: undefined }),
      individual({ id: 'second', displayName: 'B', sortOrder: 2 }),
      individual({ id: 'hand-a', displayName: 'Abe', sortOrder: undefined }),
      individual({ id: 'first', displayName: 'A', sortOrder: 1 }),
    ];
    expect(sortIndividuals(rows).map((r) => r.id))
      .toEqual(['first', 'second', 'hand-a', 'hand-b']);
  });
});

describe('D-55 — his removal is a SOFT delete', () => {
  it('hides a removed row from every consumer that goes through activeIndividuals', () => {
    const rows = [individual({ id: 'keep' }), individual({ id: 'gone', removedByHandAt: T })];
    expect(activeIndividuals(rows).map((r) => r.id)).toEqual(['keep']);
  });
});

describe('D-48 — "pulled and found nothing" is not "never pulled"', () => {
  it('distinguishes the two, which three panel lines key on', () => {
    expect(hasExtractionRun(provider())).toBe(false);
    expect(hasExtractionRun(provider({ lastExtractionVersionId: 'v1' }))).toBe(true);
  });
});

describe('D-60 / D-62 — which chronology version goes to the model', () => {
  const v = (over: Partial<CaseChronologyVersion>): CaseChronologyVersion => ({
    id: 'v', caseId: 'c1', versionNo: 1, droppedAt: T, sourceFilename: 'f.pdf',
    sourceFormat: 'pdf', readable: true, createdAt: T, ...over,
  });

  it('takes the newest READABLE, NOT-REMOVED version and nothing else', () => {
    expect(newestReadableVersion([
      v({ id: 'v1', versionNo: 1 }),
      v({ id: 'v2', versionNo: 2 }),
    ])?.id).toBe('v2');

    // An unreadable scan is flagged at the drop and NEVER sent — so it is not
    // "newest" either, or a scanned page would silently starve the writer.
    expect(newestReadableVersion([
      v({ id: 'v1', versionNo: 1 }),
      v({ id: 'v2', versionNo: 2, readable: false }),
    ])?.id).toBe('v1');

    // A mis-dropped chronology is PHI in the wrong matter. Removing it must
    // take it out of "newest" as well as out of the list.
    expect(newestReadableVersion([
      v({ id: 'v1', versionNo: 1 }),
      v({ id: 'v2', versionNo: 2, removedAt: T }),
    ])?.id).toBe('v1');

    expect(newestReadableVersion([v({ readable: false })])).toBeUndefined();
    expect(newestReadableVersion([])).toBeUndefined();
  });
});

describe('D-32 — the ONLY pre-fill there is', () => {
  const prior = [
    provider({ id: 'old1', caseId: 'caseA', facilityPartyId: 'f1', providerType: 'chiropractic', updatedAt: '2026-01-01T00:00:00.000Z' }),
    provider({ id: 'old2', caseId: 'caseB', facilityPartyId: 'f1', providerType: 'orthopedic-surgery', updatedAt: '2026-06-01T00:00:00.000Z' }),
    provider({ id: 'old3', caseId: 'caseC', facilityPartyId: 'f2', providerType: 'pharmacy', updatedAt: '2026-08-01T00:00:00.000Z' }),
  ];

  it('carries the type from the MOST RECENT case where it was set, and says which', () => {
    expect(carriedType('f1', prior, 'newCase'))
      .toEqual({ providerType: 'orthopedic-surgery', fromCaseId: 'caseB' });
  });

  it('carries NOTHING for a facility never typed before — which is the must-fix stop', () => {
    expect(carriedType('never-seen', prior, 'newCase')).toBeUndefined();
  });

  it('never carries a type from the case being filled', () => {
    expect(carriedType('f2', prior, 'caseC')).toBeUndefined();
  });

  it('ignores a prior row whose type was left blank', () => {
    expect(carriedType('f9', [provider({ id: 'x', caseId: 'z', facilityPartyId: 'f9' })], 'newCase'))
      .toBeUndefined();
  });
});

describe('D-53 — a facility is an ORGANISATION, enforced in the adapter', () => {
  it('refuses a facility party that is an individual', () => {
    // FE-18: a designation names a PERSON or the person-role; the FACILITY is
    // the building. A row pointing at an individual would put a person where
    // the block expects an organisation.
    expect(() => validateCaseProvider(
      { caseId: 'c1', facilityPartyId: 'p1', providerType: undefined },
      'individual',
    )).toThrow(/organization/i);
  });

  it('accepts an organisation, and an unknown kind (the local seed path)', () => {
    expect(() => validateCaseProvider(
      { caseId: 'c1', facilityPartyId: 'p1', providerType: undefined }, 'organization',
    )).not.toThrow();
    expect(() => validateCaseProvider(
      { caseId: 'c1', facilityPartyId: 'p1', providerType: undefined }, undefined,
    )).not.toThrow();
  });

  it('refuses a row with no case or no facility', () => {
    expect(() => validateCaseProvider(
      { caseId: '', facilityPartyId: 'p1', providerType: undefined }, 'organization',
    )).toThrow(/case/i);
    expect(() => validateCaseProvider(
      { caseId: 'c1', facilityPartyId: '', providerType: undefined }, 'organization',
    )).toThrow(/facility/i);
  });
});
