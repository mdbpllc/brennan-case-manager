/**
 * THE SIXTEEN HANDS-ON RULINGS OF 2026-09-05 — the slice's §7 items 1 to 3, 8,
 * 9 and 12, plus the R10 line.
 *
 * Authority: `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md`, which
 * records R1–R16 in Michael's own words, made with the running product in front
 * of him. Where a ruling SUPERSEDES a build default, the test says which.
 */

import { describe, it, expect } from 'vitest';
import { evaluateTiers, mustFixConditions, panelLines, type TierInput } from '../tiers';
import { autoChangeNote, diffBodies, unknownTokens } from '../versionDiff';
import { renderNames } from '../assembly';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual,
} from '../../domain/caseProviders';

const T = '2026-09-05T00:00:00.000Z';

function facility(over: Partial<CaseProvider> = {}): CaseProvider {
  return {
    id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', providerType: 'emergency-medicine',
    lop: false, createdAt: T, updatedAt: T, ...over,
  };
}

let seq = 0;
function person(over: Partial<CaseProviderIndividual> = {}): CaseProviderIndividual {
  seq += 1;
  return {
    id: `i${seq}`, caseProviderId: 'cp1', displayName: `Person ${seq}`,
    provenance: 'model', missingFromLatest: false, handEditedFields: [],
    createdAt: T, updatedAt: T, ...over,
  } as CaseProviderIndividual;
}

const version: CaseChronologyVersion = {
  id: 'v1', caseId: 'c1', versionNo: 1, droppedAt: T, sourceFilename: 'c.txt',
  sourceFormat: 'txt', extractedText: 'Care rendered.', readable: true, createdAt: T,
};

function input(over: Partial<TierInput> = {}): TierInput {
  return {
    incidentDateIso: '2025-03-14',
    selected: [facility()],
    individuals: [person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.', pronoun: 'she' })],
    facilityNames: { f1: 'Halite Regional Hospital' },
    facilityAddresses: { f1: { hasAddress: true, hasPhone: true, locationState: 'selected' } },
    chronologyVersions: [version],
    billedFacilityPartyIds: [],
    ...over,
  };
}

// ------------------------------------------------------------------- R1

describe('R1 — ND-7(c), the three tiers, keyed on the PARTY TYPE', () => {
  it('TIER 2 — a billed FACILITY with no provider row is a MUST-FIX', () => {
    // Michael: *"c"* → *"Take c1."* The PROVISIONAL default ("a panel line,
    // never a stop") is SUPERSEDED for this tier and this tier alone. He held
    // the item on "There is always a provider with a facility"; the Garcia
    // fixture rendered two billed-not-designated lines on the first case he
    // opened, which is what closed it.
    const out = evaluateTiers(input({
      billedFacilityPartyIds: ['f9'],
      facilityNames: { f1: 'Halite Regional Hospital', f9: 'Cobalt Ridge Imaging' },
      billedPartyTypes: { f9: 'providerBusiness' },
    }));
    const stop = out.stops.find((s) => /Cobalt Ridge Imaging/.test(s.text));
    expect(stop).toBeDefined();
    expect(out.canGenerate).toBe(false);
    // Both clears are NAMED in the route line — a stop that does not say how to
    // clear it is the reflex-to-skip failure R1 exists against.
    expect(stop!.route).toContain('Medical tab');
    expect(stop!.route).toContain('retype');
    // And it is not ALSO a panel line: one fact, one tier.
    expect(out.panel.some((f) => /Cobalt Ridge Imaging/.test(f.text))).toBe(false);
  });

  it('TIER 1 — a billed facility that HAS a row and is unticked is a PANEL line', () => {
    const out = evaluateTiers(input({
      unselected: [facility({ id: 'cp9', facilityPartyId: 'f9' })],
      billedFacilityPartyIds: ['f9'],
      facilityNames: { f1: 'Halite Regional Hospital', f9: 'Cobalt Ridge Imaging' },
      billedPartyTypes: { f9: 'providerBusiness' },
    }));
    expect(out.stops).toHaveLength(0);
    expect(out.canGenerate).toBe(true);
    expect(out.panel.some((f) => f.line === 6 && /not selected for designation/.test(f.text)))
      .toBe(true);
  });

  it('TIER 3 — a billed party typed Business is INFORMATIONAL, never a stop', () => {
    // Silent was offered as c2 and REJECTED.
    const out = evaluateTiers(input({
      billedFacilityPartyIds: ['f9'],
      facilityNames: { f1: 'Halite Regional Hospital', f9: 'Meridian Records Retrieval' },
      billedPartyTypes: { f9: 'business' },
    }));
    expect(out.stops).toHaveLength(0);
    expect(out.panel.some((f) => f.line === 6 && /typed Business, not Facility/.test(f.text)))
      .toBe(true);
  });

  it('a billed INDIVIDUAL still gets its own line and never a stop (ND-7(a), untouched)', () => {
    const out = evaluateTiers(input({ billedIndividualPartyNames: ['Dr. Ines Vantwoud'] }));
    expect(out.stops).toHaveLength(0);
    expect(out.panel.some((f) => /a person rather than a facility/.test(f.text))).toBe(true);
  });

  it('never stops on a billed party whose TYPE is unknown', () => {
    // Absence of information is not evidence, and a stop raised on it would be
    // one Michael cannot clear from the screen it points at.
    const out = evaluateTiers(input({
      billedFacilityPartyIds: ['f9'],
      facilityNames: { f1: 'Halite Regional Hospital', f9: 'Unknown Biller' },
    }));
    expect(out.stops).toHaveLength(0);
    expect(out.panel.some((f) => f.line === 6)).toBe(true);
  });
});

// ------------------------------------------------------------------- R2

describe('R2 — the stop\'s shape: the count, and FOUR conditions', () => {
  it('canGenerate is false while a must-fix stands, and the stops are countable', () => {
    // The button's label reads this count. What the surface says has to come
    // from the same evaluation the refusal does (D-31), not from a cache.
    const out = evaluateTiers(input({ incidentDateIso: undefined }));
    expect(out.canGenerate).toBe(false);
    expect(out.stops).toHaveLength(1);
  });

  it('the stop set is FOUR and no more — R1 added the only new one', () => {
    // Every stop this build can raise, raised at once: no incident date, an
    // unnamed facility, an untyped facility, and R1's billed-facility-no-row.
    const out = mustFixConditions(input({
      incidentDateIso: undefined,
      selected: [facility({ providerType: undefined })],
      facilityNames: { f1: '', f9: 'Cobalt Ridge Imaging' },
      billedFacilityPartyIds: ['f9'],
      billedPartyTypes: { f9: 'providerBusiness' },
    }));
    expect(out).toHaveLength(4);
    expect(out.every((s) => s.tier === 'must-fix')).toBe(true);
  });

  it('SD-10 — an unpicked location is a PANEL line and never a fifth stop', () => {
    const out = evaluateTiers(input({
      facilityAddresses: {
        f1: { hasAddress: false, hasPhone: false, locationState: 'unselected' },
      },
    }));
    expect(out.stops).toHaveLength(0);
    expect(out.canGenerate).toBe(true);
    expect(out.panel.some((f) => f.line === 1 && /no location selected/.test(f.text))).toBe(true);
  });
});

// ------------------------------------------------------------------- R3

describe('R3 — Q5 and Q10 ruled together: the total inline, descending, no threshold', () => {
  const gapInput = (totals: Record<string, number>) => input({
    // No individuals at all => the custodian-only FALLBACK, which is what
    // carries the gap flag.
    selected: [
      facility({ id: 'cp1', facilityPartyId: 'f1', lastExtractionVersionId: 'v1' }),
      facility({ id: 'cp2', facilityPartyId: 'f2', lastExtractionVersionId: 'v1' }),
    ],
    individuals: [],
    facilityNames: { f1: 'Halite Regional Hospital', f2: 'Cobalt Ridge Imaging' },
    facilityAddresses: {
      f1: { hasAddress: true, hasPhone: true, locationState: 'selected' },
      f2: { hasAddress: true, hasPhone: true, locationState: 'selected' },
    },
    billedTotals: totals,
  });

  it('carries the facility\'s billed total INLINE on line 7', () => {
    const out = panelLines(gapInput({ f1: 18450.5, f2: 900 }));
    const line = out.find((f) => f.line === 7 && /Halite/.test(f.text))!;
    expect(line.text).toContain('($18,450.50 in charges)');
    expect(line.text).toContain('because no individual could be named');
  });

  it('sorts the gap lines CHARGE-DESCENDING among themselves', () => {
    const out = panelLines(gapInput({ f1: 900, f2: 18450.5 }));
    const gaps = out.filter((f) => f.line === 7);
    expect(gaps).toHaveLength(2);
    expect(gaps[0].text).toMatch(/Cobalt Ridge Imaging/);
    expect(gaps[1].text).toMatch(/Halite Regional Hospital/);
  });

  it('NO threshold — a small total still gets its line', () => {
    // FE-22's "threshold" retires as a concept. The number is the escalation.
    const out = panelLines(gapInput({ f1: 12, f2: 0 }));
    expect(out.filter((f) => f.line === 7)).toHaveLength(2);
    expect(out.find((f) => f.line === 7 && /Halite/.test(f.text))!.text)
      .toContain('($12.00 in charges)');
  });

  it('with no total on file the line reads as it always did', () => {
    const out = panelLines(gapInput({}));
    expect(out.find((f) => f.line === 7)!.text).not.toContain('in charges');
  });

  it('is a PANEL tier — it never blocks', () => {
    expect(evaluateTiers(gapInput({ f1: 999999 })).canGenerate).toBe(true);
  });
});

// ------------------------------------------------------------------ R10

describe('R10 — D-11: the rendering is unchanged AND the panel says so', () => {
  it('one line per pronoun-less individual, and none for one with a pronoun', () => {
    // *"b"*: they/their still renders — the §10 default's "no panel line for
    // it" is what is SUPERSEDED, not the rendering.
    const out = panelLines(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', pronoun: 'she' }),
        person({ displayName: 'Tobias Skarsgaard' }),
        person({ displayName: 'Priya Natarajan', pronoun: '   ' }),
      ],
    }));
    const lines = out.filter((f) => f.line === 19);
    expect(lines).toHaveLength(2);
    expect(lines.map((l) => l.text).join(' ')).toContain('Tobias Skarsgaard has no pronoun on record');
    expect(lines.map((l) => l.text).join(' ')).toContain('rendering as they/their');
    expect(lines.map((l) => l.text).join(' ')).not.toContain('Ines Vantwoud');
  });
});

// ------------------------------------------------------------------- R9

describe('R9 — D-21 stands as built, and there is NO CAP', () => {
  it('names all twelve members, with "Drs." surnames when every one is MD/DO/DC', () => {
    // *"a - as built"*. This test exists to PIN the absence of a cap: nothing
    // truncates, elides, or says "and others".
    const twelve = Array.from({ length: 12 }, (_, i) =>
      person({ displayName: `Ada Surname${i}`, credentialSuffix: 'M.D.' }));
    const names = renderNames(twelve);
    expect(names.provider_name).toMatch(/^Drs\. /);
    for (let i = 0; i < 12; i += 1) expect(names.provider_name).toContain(`Surname${i}`);
    expect(names.provider_name).not.toMatch(/et al|and others|…|\.\.\./);
    // No Oxford comma — §15.3's own example form.
    expect(names.provider_name).toContain('Surname10 and Surname11');
  });

  it('mixed credentials drop the honorific entirely rather than sharing a wrong one', () => {
    const names = renderNames([
      person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
      person({ displayName: 'Priya Natarajan', credentialSuffix: 'PA-C' }),
    ]);
    expect(names.provider_name).not.toContain('Drs.');
    expect(names.provider_name).toContain('Priya Natarajan, PA-C');
  });
});

// ------------------------------------------------------------------- R8

describe('R8 — the template editor: the diff is MECHANICAL and makes no call', () => {
  it('lists lines removed and added against the preceding version', () => {
    const d = diffBodies('one\ntwo\nthree', 'one\ntwo point five\nthree');
    expect(d.removed).toEqual(['two']);
    expect(d.added).toEqual(['two point five']);
  });

  it('ignores blank lines, so a reflow is not reported as an edit', () => {
    expect(diffBodies('one\n\n\ntwo', 'one\ntwo').removed).toEqual([]);
    expect(diffBodies('one\n\n\ntwo', 'one\ntwo').added).toEqual([]);
  });

  it('SD-15 — the note is counts and token names, and no prose', () => {
    // *"mechanical, from the diff"*. A model-written note was NAMED at the
    // sitting and EXCLUDED; nothing in this path can call one.
    const note = autoChangeNote(diffBodies(
      'Dear {client},\n\nRegards.',
      'Dear {clint},\n\nRegards.',
    ));
    expect(note).toContain('token {client} → {clint}');
    expect(note).toContain('lines changed');
  });

  it('reports a rename as a rename ONLY when one left and one arrived', () => {
    const many = autoChangeNote(diffBodies('{a} {b}', '{c} {d}'));
    expect(many).not.toContain('→');
    expect(many).toContain('tokens removed');
    expect(many).toContain('tokens added');
  });

  it('an unchanged body yields an EMPTY note, not "0 lines changed"', () => {
    expect(autoChangeNote(diffBodies('same\ntext', 'same\ntext'))).toBe('');
  });

  it('UX-2 — an unknown token is NAMED, and a known one is not', () => {
    expect(unknownTokens('Dear {client}, re {cuase_number}.', ['client', 'cause_number']))
      .toEqual(['cuase_number']);
    expect(unknownTokens('Dear {client}.', ['client'])).toEqual([]);
  });
});
