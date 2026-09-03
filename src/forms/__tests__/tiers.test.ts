// THE THREE TIERS — the three stops, HD-22's warn, and the panel's line set.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §8 and §11 invariants 5, 6
// and 26.
//
// The two things most worth holding shut here are the ONES THAT ARE NOT THERE:
// there is no fourth stop, and no panel line blocks. §12.3 closed the stop list
// by ruling, and HD-1/HD-22 are flags by ruling — a build that "helpfully"
// promoted one would be overriding him, quietly, in the direction of doing less
// work for the user and more arguing with him.

import { describe, it, expect } from 'vitest';
import { evaluateTiers, mustFixConditions, panelLines, type TierInput } from '../tiers';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual,
} from '../../domain/caseProviders';
import type { ProviderTypeKey } from '../providerTypes';

const T = '2026-09-03T00:00:00.000Z';

function facility(providerType?: ProviderTypeKey, over: Partial<CaseProvider> = {}): CaseProvider {
  return {
    id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', providerType,
    lop: false, createdAt: T, updatedAt: T, ...over,
  };
}

let seq = 0;
function person(over: Partial<CaseProviderIndividual> = {}): CaseProviderIndividual {
  seq += 1;
  return {
    id: `i${seq}`, caseProviderId: 'cp1', displayName: `Person ${seq}`,
    provenance: 'model', missingFromLatest: false, handEditedFields: [],
    sortOrder: seq, createdAt: T, updatedAt: T, ...over,
  };
}

const version: CaseChronologyVersion = {
  id: 'v1', caseId: 'c1', versionNo: 1, droppedAt: T, sourceFilename: 'c.pdf',
  sourceFormat: 'pdf', readable: true, createdAt: T,
};

function input(over: Partial<TierInput> = {}): TierInput {
  return {
    incidentDateIso: '2025-03-14',
    selected: [facility('emergency-medicine', { lastExtractionVersionId: 'v1' })],
    individuals: [person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' })],
    facilityNames: { f1: 'Halite Regional Hospital' },
    facilityAddresses: { f1: { hasAddress: true, hasPhone: true } },
    chronologyVersions: [version],
    billedFacilityPartyIds: [],
    ...over,
  };
}

const lines = (i: TierInput) => panelLines(i).map((f) => f.line);

describe('§8.1 — the three must-fix stops, and there are only three', () => {
  it('stops on no incident date, and says where it is fixed', () => {
    const out = mustFixConditions(input({ incidentDateIso: undefined }));
    expect(out).toHaveLength(1);
    expect(out[0].text).toMatch(/no date of incident/i);
    expect(out[0].route).toMatch(/matter record/i);
  });

  it('stops on a selected facility with no NAME and with no TYPE', () => {
    const noName = mustFixConditions(input({ facilityNames: { f1: '   ' } }));
    expect(noName.some((f) => /no name/i.test(f.text))).toBe(true);

    const noType = mustFixConditions(input({ selected: [facility(undefined)] }));
    expect(noType.some((f) => /has no type/i.test(f.text))).toBe(true);
    expect(noType[0].route).toMatch(/Medical tab/i);
  });

  it('DESELECTING a facility removes its two conditions — his visible act', () => {
    expect(mustFixConditions(input({ selected: [facility(undefined)] }))).toHaveLength(1);
    expect(mustFixConditions(input({ selected: [] }))).toHaveLength(0);
  });

  it('adds NO fourth stop — an address, a phone or a missing physician never stops', () => {
    // §12.3 closed the list by ruling. These three are the conditions most
    // likely to feel like they should stop a generate, and none of them does.
    const out = evaluateTiers(input({
      facilityAddresses: { f1: { hasAddress: false, hasPhone: false } },
      individuals: [],
    }));
    expect(out.stops).toHaveLength(0);
    expect(out.canGenerate).toBe(true);
    expect(out.panel.length).toBeGreaterThan(0);
  });

  it('lets nothing in the panel or the warn tier block a generate', () => {
    const out = evaluateTiers(input({
      individuals: [person({ displayName: 'Vantwoud Imaging Associates PLLC' })],
    }));
    expect(out.warnings.length).toBeGreaterThan(0);
    expect(out.canGenerate).toBe(true);
  });
});

describe('§8.2 — the panel, and the lines that are gated so they mean something', () => {
  it('flags a missing address and a missing phone, and still generates', () => {
    const out = evaluateTiers(input({
      facilityAddresses: { f1: { hasAddress: false, hasPhone: false } },
    }));
    expect(out.panel.map((f) => f.line)).toEqual(expect.arrayContaining([1, 2]));
    expect(out.canGenerate).toBe(true);
  });

  it('invariant 26 — line 13 BEFORE any pull, line 3 only AFTER one (D-25)', () => {
    // A missing-physician line on every facility before anything was ever
    // pulled is the case §11.5 calls "just teaches him to ignore warnings".
    const never = input({
      selected: [facility('emergency-medicine')],       // no lastExtractionVersionId
      individuals: [],
    });
    expect(lines(never)).toContain(13);
    expect(lines(never)).not.toContain(3);

    const pulled = input({
      selected: [facility('emergency-medicine', { lastExtractionVersionId: 'v1' })],
      individuals: [],
    });
    expect(lines(pulled)).toContain(3);
    expect(lines(pulled)).not.toContain(13);
  });

  it('gives ONE line 13 for the client, never one per facility', () => {
    const many = input({
      selected: [
        facility('emergency-medicine', { id: 'a', facilityPartyId: 'f1' }),
        facility('chiropractic', { id: 'b', facilityPartyId: 'f2' }),
        facility('neurosurgery', { id: 'c', facilityPartyId: 'f3' }),
      ],
      individuals: [],
      facilityNames: { f1: 'A', f2: 'B', f3: 'C' },
      facilityAddresses: {},
    });
    expect(lines(many).filter((l) => l === 13)).toHaveLength(1);
  });

  it('fires line 7 for the custodian-only FALLBACK and its gap flag', () => {
    const out = panelLines(input({
      selected: [facility('emergency-medicine', { lastExtractionVersionId: 'v1' })],
      individuals: [],
    }));
    expect(out.map((f) => f.line)).toContain(7);
  });

  it('warns on an entity suffix in a PERSON name only, never a facility name (D-26)', () => {
    const withSuffix = panelLines(input({
      individuals: [person({ displayName: 'Ines Vantwoud PLLC' })],
    }));
    expect(withSuffix.find((f) => f.line === 4)?.tier).toBe('warn');

    // The facility is called "Halite Regional Hospital" in every case here and
    // must never trip line 4 or 5 — under R17 a facility never lands in the
    // designee slot, which is why D-26 narrowed the object.
    const clean = panelLines(input());
    expect(clean.map((f) => f.line)).not.toContain(4);
  });

  it('flags a facility noun inside an individual name as a backstop', () => {
    expect(lines(input({ individuals: [person({ displayName: 'Cobalt Imaging Center' })] })))
      .toContain(5);
  });

  it('asks the imaging-entity question for an imaging-TYPED facility (§12.7)', () => {
    expect(lines(input({
      selected: [facility('radiologist', { lastExtractionVersionId: 'v1' })],
      individuals: [person({ provenance: 'model' })],
    }))).toContain(8);
  });

  it('names a mental-health facility AND a mental-health marker (line 11)', () => {
    expect(lines(input({ selected: [facility('mental-health')] }))).toContain(11);
    expect(lines(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Neriah Halvorsen', roleMarker: 'mental-health' }),
      ],
    }))).toContain(11);
  });

  it('names the other-non-physician degrade rule (line 12)', () => {
    expect(lines(input({ selected: [facility('other-non-physician')] }))).toContain(12);
  });

  it('names a mid-level with nothing to ride (line 14, AS-Q15s default)', () => {
    const out = input({
      selected: [facility('emergency-medicine', { lastExtractionVersionId: 'v1' })],
      individuals: [
        person({ displayName: 'Tobias Skarsgaard', roleMarker: 'radiologist' }),
        person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level' }),
      ],
    });
    expect(lines(out)).toContain(14);
  });

  it('names individuals on a pharmacy or custodian-only facility (line 15, AS-Q16s default)', () => {
    expect(lines(input({
      selected: [facility('pharmacy')],
      individuals: [person({ displayName: 'Osvaldo Quillane', provenance: 'hand' })],
    }))).toContain(15);
  });

  it('flags an individual missing from the latest chronology, and a removed version', () => {
    expect(lines(input({
      individuals: [person({ missingFromLatest: true })],
    }))).toContain(9);

    expect(lines(input({
      chronologyVersions: [version, { ...version, id: 'v0', versionNo: 0, removedAt: T }],
      individuals: [person({ chronologyVersionId: 'v0' })],
    }))).toContain(18);
  });

  it('says so per facility AND once for the client when no chronology is readable', () => {
    const out = lines(input({ chronologyVersions: [{ ...version, readable: false }] }));
    expect(out.filter((l) => l === 10).length).toBeGreaterThanOrEqual(2);
  });

  it('ND-7(a) — a billed facility that is not designated is a LINE, never a stop', () => {
    const out = evaluateTiers(input({
      billedFacilityPartyIds: ['f1', 'f9'],
      facilityNames: { f1: 'Halite Regional Hospital', f9: 'Cobalt Imaging' },
    }));
    expect(out.panel.some((f) => f.line === 6 && /Cobalt Imaging/.test(f.text))).toBe(true);
    // The one already selected does NOT fire.
    expect(out.panel.filter((f) => f.line === 6)).toHaveLength(1);
    expect(out.canGenerate).toBe(true);
  });

  it('flags a bill linked to a PERSON rather than a facility', () => {
    expect(panelLines(input({ billedIndividualPartyNames: ['Dr. Ines Vantwoud'] }))
      .some((f) => f.line === 6 && /link the bill to the facility/i.test(f.text))).toBe(true);
  });

  it('D-8 — an edge that disagrees FLAGS and never substitutes (line 17)', () => {
    const ind = person({ displayName: 'Ines Vantwoud', partyId: 'p9' });
    const out = panelLines(input({
      individuals: [ind],
      affiliationMismatches: [{ individualId: ind.id, otherFacilityName: 'Cobalt Imaging' }],
    }));
    const line = out.find((f) => f.line === 17)!;
    expect(line.text).toContain('Cobalt Imaging');
    // The block STILL reads the selected facility — the line says so, because
    // a silent substitution is the thing D-8 forbids.
    expect(line.text).toContain('Halite Regional Hospital');
  });

  it('supplemental posture names an already-designated facility (line 16)', () => {
    expect(lines(input({
      alreadyDesignated: [{ facilityPartyId: 'f1', date: '2026-08-01', posture: 'original' }],
    }))).toContain(16);
  });

  it('builds NO "affiliation unverified" line and NO LOP line', () => {
    // CD-14 limb (i) is OPEN, so signal 5 is not built; provenance is recorded
    // from birth so it can be lit later. The LOP flag is the §5.2 gate beside
    // the checkbox, not a panel line (D-15).
    const text = panelLines(input({
      selected: [facility('emergency-medicine', { lop: true, lastExtractionVersionId: 'v1' })],
      individuals: [person({ provenance: 'model', partyId: 'p9' })],
    })).map((f) => f.text).join(' ');
    expect(text).not.toMatch(/affiliation unverified/i);
    expect(text).not.toMatch(/letter of protection|\bLOP\b/i);
  });
});

// ------------------------------------------------- §8.3, the gates re-keyed

describe('§8.3 — the §5 gates, re-keyed onto the typed record', () => {
  it('fires the hard pause on the TYPE, not on a word in a party record', async () => {
    const { evaluateTypedGates, blockingGates } = await import('../gates');
    const out = evaluateTypedGates({
      selected: [facility('mental-health')],
      individuals: [],
      facilityNames: { f1: 'Serpentine Behavioral Health' },
    });
    expect(out).toHaveLength(1);
    expect(out[0].severity).toBe('hard-pause');
    expect(blockingGates(out)).toHaveLength(1);
    expect(out[0].authority).toMatch(/UNVERIFIED/);
  });

  it('fires it on a MARKER at a facility of another type (AS-Q17s default)', async () => {
    const { evaluateTypedGates } = await import('../gates');
    const out = evaluateTypedGates({
      selected: [facility('emergency-medicine')],
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Neriah Halvorsen', roleMarker: 'mental-health' }),
      ],
      facilityNames: { f1: 'Halite Regional Hospital' },
    });
    expect(out).toHaveLength(1);
    expect(out[0].title).toContain('Neriah Halvorsen');
    expect(out[0].body).toMatch(/left OUT of the generated paragraph/);
  });

  it('ignores a REMOVED individual when deciding whether to pause', async () => {
    const { evaluateTypedGates } = await import('../gates');
    expect(evaluateTypedGates({
      selected: [facility('emergency-medicine')],
      individuals: [person({ roleMarker: 'mental-health', removedByHandAt: T })],
      facilityNames: { f1: 'Halite Regional Hospital' },
    })).toEqual([]);
  });

  it('reads the LOP flag off the typed column, not an untyped fields bag (D-15)', async () => {
    const { evaluateTypedGates } = await import('../gates');
    const on = evaluateTypedGates({
      selected: [facility('chiropractic', { lop: true })],
      individuals: [],
      facilityNames: { f1: 'Serpentine Chiropractic' },
    });
    expect(on).toHaveLength(1);
    expect(on[0].severity).toBe('click-through');

    expect(evaluateTypedGates({
      selected: [facility('chiropractic', { lop: false })],
      individuals: [],
      facilityNames: { f1: 'Serpentine Chiropractic' },
    })).toEqual([]);
  });

  it('nudges on ortho + neuro as two SELECTED facility types', async () => {
    const { evaluateTypedGates } = await import('../gates');
    const both = evaluateTypedGates({
      selected: [
        facility('orthopedic-surgery', { id: 'a', facilityPartyId: 'f1' }),
        facility('neurosurgery', { id: 'b', facilityPartyId: 'f2' }),
      ],
      individuals: [],
      facilityNames: { f1: 'A', f2: 'B' },
    });
    expect(both.some((g) => g.id === 'cumulative-expert')).toBe(true);

    const one = evaluateTypedGates({
      selected: [facility('orthopedic-surgery')],
      individuals: [],
      facilityNames: { f1: 'A' },
    });
    expect(one.some((g) => g.id === 'cumulative-expert')).toBe(false);
  });

  it('renders NO PCP-baseline nudge — D-40, a default taken', async () => {
    // AS-Q9 retired the card that asked the question, so the gate has no input.
    // §5.4's spec text is untouched; the gate is simply not rendered, which is
    // named rather than inferred.
    const gates = await import('../gates');
    const out = gates.evaluateTypedGates({
      selected: [facility('primary-care')],
      individuals: [person()],
      facilityNames: { f1: 'Whitestone Family Practice' },
    });
    expect(out.some((g) => g.id.startsWith('baseline:'))).toBe(false);
  });
});
