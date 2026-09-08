/**
 * THE ADDRESS MODEL, AT THE RENDER PATH — the slice's §7 items 17 to 21.
 *
 * Michael ruled five limbs on 2026-09-07 (`#149`). The load-bearing one for
 * this file is `D1(iii)`, where he was offered three places to split a one-line
 * address and answered ***"1"***: once, at the record, marked — and **THE
 * RENDER PATH NEVER PARSES**.
 *
 * A negative like that cannot be proved by reading code, so item 17 turns it
 * into an observable: a location carrying ONLY the pre-split one-line `address`
 * renders NO street line and raises a panel line instead. If a comma-splitter
 * ever appears in `context.ts`, `generate.ts` or `FormsTab.tsx`, that test goes
 * red — which is the point of writing the invariant as an absence at the output
 * rather than as a grep over the source.
 */

import { describe, it, expect } from 'vitest';
import type { PartyRecord } from '../../domain/types';
import type {
  CaseProvider, CaseProviderIndividual, CaseChronologyVersion,
} from '../../domain/caseProviders';
import { buildDesignations, blockItem, facilityContactLines } from '../generate';
import { evaluateTiers } from '../tiers';
import { formatPhonesInContext, type RenderContext } from '../renderer';
import type { ParagraphWriter } from '../writer';
import { buildRenderContext } from '../context';
import { FIXTURE_BUNDLE, FIXTURE_ANSWERS } from '../fixtures';
import contextSrc from '../context.ts?raw';
import formsTabSrc from '../../pages/FormsTab.tsx?raw';

/** The fixture writer, as every other test in this tree builds one. */
function fixtureWriter(): ParagraphWriter {
  return {
    kind: 'fixture',
    async extract() { return { perFacility: [] }; },
    async write() {
      return { opening: 'OPENING.', middle: 'MIDDLE.', body: 'BODY.', care_episode_clause: 'CLAUSE.' };
    },
  };
}

const T = '2026-09-07T00:00:00.000Z';
const NAME = 'Sandstone Regional Medical Center';

/** Invented for this test. Never a fixture address, never a real one. */
const MAIN = {
  id: 'l-main', label: 'Main campus',
  addressLine1: '4200 Sandstone Row', cityStateZip: 'Halite, TX 77042',
  phone: '3615550142', addressSplitBy: 'hand',
};
const SOUTH = {
  id: 'l-south', label: 'South campus',
  addressLine1: '88 Feldspar Way', cityStateZip: 'Halite, TX 77049',
  phone: '3615550199', addressSplitBy: 'hand',
};

function facilityParty(fields: Record<string, unknown>): PartyRecord {
  return {
    id: 'f1', partyType: 'providerBusiness', kind: 'organization', displayName: NAME,
    roleTags: ['providerBusiness'], aliases: [], deceased: false,
    fields, createdAt: T, updatedAt: T,
  } as unknown as PartyRecord;
}

function provider(over: Partial<CaseProvider> = {}): CaseProvider {
  return {
    id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', providerType: 'emergency-medicine',
    lop: false, createdAt: T, updatedAt: T, ...over,
  };
}

function individual(): CaseProviderIndividual {
  return {
    id: 'i1', caseProviderId: 'cp1', displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.',
    provenance: 'model', missingFromLatest: false, handEditedFields: [],
    createdAt: T, updatedAt: T,
  } as CaseProviderIndividual;
}

const version: CaseChronologyVersion = {
  id: 'v1', caseId: 'c1', versionNo: 1, droppedAt: T, sourceFilename: 'c.txt',
  sourceFormat: 'txt', extractedText: 'Care rendered.', readable: true, createdAt: T,
};

async function blockFor(party: PartyRecord, row: CaseProvider) {
  const parties = { f1: party };
  const out = await buildDesignations({
    writer: fixtureWriter(),
    selected: [row],
    individuals: [individual()],
    visits: [],
    chronologyVersions: [version],
    facilityParties: parties,
    clientName: 'Alba Quartzmoor',
    incidentDateIso: '2025-03-14',
    caseType: 'Motor vehicle collision',
    writerInstructions: '',
  });
  return blockItem(out.blocks[0], parties);
}

// ---------------------------------------------------------------- item 17

describe('§7.17 — the render path NEVER parses an address (D1(iii))', () => {
  const unsplit = facilityParty({
    locations: [{ id: 'l-legacy', label: 'Main', address: '4200 Sandstone Row, Halite, TX 77042' }],
  });

  it('a location carrying ONLY the one-line value renders NO street line', async () => {
    // If anything downstream split the value, this would carry
    // "4200 Sandstone Row". It carries nothing, and that absence is the proof.
    const item = await blockFor(unsplit, provider());
    expect(item.facility_address_line_1).toBe('');
    expect(item.facility_city_state_zip).toBe('');
    // The block still names the facility, and the document still generates.
    expect(item.facility_name_caps).toBe(NAME.toUpperCase());
  });

  it('and the panel says so — SD-1, so the silence on the page is not silent', () => {
    const out = evaluateTiers({
      incidentDateIso: '2025-03-14',
      selected: [provider()],
      individuals: [individual()],
      facilityNames: { f1: NAME },
      // What FormsTab computes for this record: one location, so it RESOLVES,
      // but it has no split fields, so there is no address to render.
      facilityAddresses: {
        f1: { hasAddress: false, hasPhone: false, locationState: 'selected' },
      },
      chronologyVersions: [version],
      billedFacilityPartyIds: [],
    });
    expect(out.panel.some((f) => f.line === 1)).toBe(true);
    // A panel line, never a stop: SD-10, and the stop set is closed at four.
    expect(out.canGenerate).toBe(true);
    expect(out.stops).toHaveLength(0);
  });
});

// ---------------------------------------------------------------- item 18

describe('§7.18 — the block reads the SELECTED location, and only that one', () => {
  const twoCampuses = facilityParty({ phone: '3615550100', locations: [MAIN, SOUTH] });

  it('picking the second carries the second\'s street and phone, never the first\'s', async () => {
    const item = await blockFor(twoCampuses, provider({ facilityLocationId: 'l-south' }));
    expect(item.facility_address_line_1).toBe(SOUTH.addressLine1);
    expect(item.facility_city_state_zip).toBe(SOUTH.cityStateZip);
    expect(item.facility_phone).toBe(SOUTH.phone);
    // The first campus appears NOWHERE in the block. A records request sent to
    // the wrong campus of the right hospital is the failure this pins.
    expect(Object.values(item).join('|')).not.toContain(MAIN.addressLine1);
    expect(Object.values(item).join('|')).not.toContain(MAIN.phone);
  });

  it('SD-10 — two campuses and no pick renders three empties, never a guess', async () => {
    const item = await blockFor(twoCampuses, provider());
    expect(item.facility_address_line_1).toBe('');
    expect(item.facility_city_state_zip).toBe('');
    expect(item.facility_phone).toBe('');
  });

  it('SD-8 — ONE campus resolves without a pick', async () => {
    const item = await blockFor(facilityParty({ locations: [MAIN] }), provider());
    expect(item.facility_address_line_1).toBe(MAIN.addressLine1);
  });

  it('SD-2 — a location with no phone falls back to the facility\'s main phone', async () => {
    const noPhone = facilityParty({
      phone: '3615550100',
      locations: [{ ...MAIN, phone: undefined }],
    });
    expect(facilityContactLines(noPhone, 'l-main').facility_phone).toBe('3615550100');
  });
});

// ---------------------------------------------------------------- item 19

describe('§7.19 — SD-3: one formatter, at the render seam, instrument-wide', () => {
  it('formats every phone token in scalars and in every region', () => {
    const ctx = {
      scalars: { firm_phone: '2545550500', cause_number: '2026-1234' },
      regions: {
        testifying_expert: [{ facility_phone: '3615550142', facility_name: 'X' }],
        service_list: [{ firm_phone: '5125550110', firm_fax: '5125550111' }],
        person_with_knowledge: [{ person_phone: '8005550177x214' }],
      },
    } as unknown as RenderContext;

    const out = formatPhonesInContext(ctx);
    expect(out.scalars.firm_phone).toBe('(254) 555-0500');
    expect(out.regions.testifying_expert[0].facility_phone).toBe('(361) 555-0142');
    expect(out.regions.service_list[0].firm_phone).toBe('(512) 555-0110');
    expect(out.regions.service_list[0].firm_fax).toBe('(512) 555-0111');
    expect(out.regions.person_with_knowledge[0].person_phone).toBe('(800) 555-0177 x214');

    // Only phone-named tokens. A cause number that happens to be digits is not
    // a telephone, and formatting it would be a served-document defect of its
    // own.
    expect(out.scalars.cause_number).toBe('2026-1234');
    expect(out.regions.testifying_expert[0].facility_name).toBe('X');
  });

  it('leaves an already-formatted value formatted, and an empty one empty', () => {
    const ctx = {
      scalars: { facility_phone: '(361) 555-0142', person_phone: '' },
      regions: {},
    } as unknown as RenderContext;
    const out = formatPhonesInContext(ctx);
    expect(out.scalars.facility_phone).toBe('(361) 555-0142');
    expect(out.scalars.person_phone).toBe('');
  });
});

// ---------------------------------------------------------------- item 21

describe('§7.21 — a facility with NO locations still generates (§17.6 unchanged)', () => {
  it('returns three empties rather than throwing or inventing', () => {
    const bare = facilityParty({ phone: '3615550100' });
    expect(facilityContactLines(bare, undefined)).toEqual({
      facility_address_line_1: '',
      facility_city_state_zip: '',
      facility_phone: '',
    });
  });

  it('and so does an undefined party — the block ends at the name', () => {
    expect(facilityContactLines(undefined, 'l-main')).toEqual({
      facility_address_line_1: '',
      facility_city_state_zip: '',
      facility_phone: '',
    });
  });
});

// ---------------------------------------------------------------- item 20

describe('§7.20 — D1(iv): the persons-with-knowledge lines and the service list read the split fields', () => {
  it('reads `addressLine1` / `cityStateZip` off a party created through the REGISTRY keys', () => {
    // The point of the test is the KEYS. Before D1(iv) these two regions read
    // `addressLine1` / `addressLine2`, and `addressLine2` was a key no party
    // form ever offered — so a witness or an opposing firm entered through the
    // app rendered its city/state/ZIP line blank. `SD-13` retires that key; the
    // TOKEN names are unchanged, because renaming a token in the master's text
    // is not this slice's act.
    const { context } = buildRenderContext(FIXTURE_BUNDLE, FIXTURE_ANSWERS);

    const service = context.regions.service_recipient ?? [];
    expect(service.length).toBeGreaterThan(0);
    expect(service[0].firm_address_line_1).toBe('400 Tourmaline Way, Suite 210');
    expect(service[0].firm_address_line_2).toBe('Rockvale, TX 70001');

    const pwk = context.regions.person_with_knowledge ?? [];
    const witness = pwk.find((p) => p.person_name === 'Nolan Pyrite');
    expect(witness).toBeDefined();
    expect(witness!.person_address_line_1).toBe('12 Pyrite Lane');
    expect(witness!.person_address_line_2).toBe('Rockvale, TX 70006');
  });

  it('SD-13 — nothing anywhere reads the retired `addressLine2` key', () => {
    // Asserted over the two files that used to, rather than over the whole
    // tree: a stray occurrence in a test fixture would say nothing about the
    // render path, and this is a claim about the render path.
    for (const src of [contextSrc, formsTabSrc]) {
      expect(src).not.toContain("'addressLine2'");
    }
  });
});
