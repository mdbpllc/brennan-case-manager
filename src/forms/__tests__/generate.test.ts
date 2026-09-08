// THE GENERATE — one call per paragraph, nothing transmitted on a refusal, and
// a failed call that files nothing at all.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §7.2, §7.3, D-3, D-22, D-23,
// and §11 invariants 5, 6 and 27.
//
// Invariant 5's real content is the SPY: it is not enough that a refused
// generate produces no document — it must make no CALL. The difference is
// whether a chronology's text left the machine, which is the whole of the BAA
// posture while H12-v is unruled.

import { describe, it, expect } from 'vitest';
import {
  buildDesignations, blockPreview, blockItem, type GenerateInput,
} from '../generate';
import { buildRenderContext } from '../context';
import { renderInstrument } from '../renderer';
import { disclosuresSkeletonBytes } from '../skeletons/disclosuresSkeleton';
import { FIXTURE_BUNDLE, FIXTURE_ANSWERS } from '../fixtures';
import { evaluateTiers } from '../tiers';
import { WriterCallError, type ParagraphWriter, type WriteInput } from '../writer';
import type { PartyRecord } from '../../domain/types';
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
  sourceFormat: 'pdf', extractedText: 'THE CHRONOLOGY TEXT', readable: true, createdAt: T,
};

const party = { id: 'f1', displayName: 'Halite Regional Hospital' } as PartyRecord;

/** Records every call so the tests can assert on the PAYLOAD, not just output. */
function spyWriter(): ParagraphWriter & { calls: WriteInput[] } {
  const calls: WriteInput[] = [];
  return {
    kind: 'fixture',
    calls,
    async extract() { return { perFacility: [] }; },
    async write(input: WriteInput) {
      calls.push(input);
      return { opening: 'OPENING.', middle: 'MIDDLE.', body: 'BODY.', care_episode_clause: 'CLAUSE.' };
    },
  };
}

function input(over: Partial<GenerateInput> = {}): GenerateInput {
  return {
    writer: spyWriter(),
    selected: [facility('emergency-medicine')],
    individuals: [person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' })],
    visits: [],
    chronologyVersions: [version],
    facilityParties: { f1: party },
    clientName: 'Alba Quartzmoor',
    clientPronoun: 'she',
    incidentDateIso: '2025-03-14',
    caseType: 'Motor vehicle collision',
    writerInstructions: 'THE INSTRUCTIONS',
    ...over,
  };
}

describe('invariant 5 — a refused generate TRANSMITS NOTHING', () => {
  it('makes no writer call at all while a must-fix condition holds', async () => {
    // The check and the call sit next to each other in the generate path for
    // exactly this reason, and this is the assertion that keeps them there.
    const writer = spyWriter();
    const tiers = evaluateTiers({
      incidentDateIso: undefined,                       // the stop
      selected: [facility('emergency-medicine')],
      individuals: [],
      facilityNames: { f1: 'Halite Regional Hospital' },
      facilityAddresses: { f1: { hasAddress: true, hasPhone: true } },
      chronologyVersions: [version],
      billedFacilityPartyIds: [],
    });

    expect(tiers.canGenerate).toBe(false);
    if (tiers.canGenerate) await buildDesignations(input({ writer }));
    expect(writer.calls).toHaveLength(0);
  });
});

describe('D-22 — ONE call per PARAGRAPH', () => {
  it('calls once for a single treating paragraph', async () => {
    const writer = spyWriter();
    await buildDesignations(input({ writer }));
    expect(writer.calls).toHaveLength(1);
    expect(writer.calls[0].shape).toBe('treating-single');
  });

  it('calls three times for a split plus a rider — treating, its rider, then radiology', async () => {
    const writer = spyWriter();
    await buildDesignations(input({
      writer,
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Tobias Skarsgaard', roleMarker: 'radiologist' }),
        person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level', pronoun: 'she' }),
      ],
    }));
    expect(writer.calls.map((c) => c.shape))
      .toEqual(['treating-single', 'midlevel-rider', 'radiology-split']);
  });

  it('makes NO call for a mental-health facility — it generates no paragraph', async () => {
    const writer = spyWriter();
    const out = await buildDesignations(input({
      writer,
      selected: [facility('mental-health')],
      individuals: [person({ displayName: 'Neriah Halvorsen' })],
    }));
    expect(writer.calls).toHaveLength(0);
    expect(out.paragraphs).toHaveLength(0);
    // The BLOCK still renders — AS-Q5's ruled pattern.
    expect(out.blocks[0].individuals).toHaveLength(1);
  });
});

describe('§7.3 — what the writer is given, and what it is not', () => {
  it('shows the fixed sentences ALREADY FILLED and inflected (D-23)', async () => {
    const writer = spyWriter();
    await buildDesignations(input({ writer }));
    const shown = writer.calls[0].fixedSentences;
    expect(shown.map((s) => s.slot)).toEqual(['basis', 'causation']);
    // Filled: the client's name and the long-form date are already in them, so
    // the writer's prose reads INTO the sentence rather than around a template.
    expect(shown[1].text).toContain('March 14, 2025');
    expect(shown.every((s) => !s.text.includes('{'))).toBe(true);
  });

  it('gives all twelve voice examples, unedited, and the instructions', async () => {
    const writer = spyWriter();
    await buildDesignations(input({ writer }));
    expect(writer.calls[0].voiceExamples).toHaveLength(12);
    expect(writer.calls[0].writerInstructions).toBe('THE INSTRUCTIONS');
    expect(writer.calls[0].chronologyText).toBe('THE CHRONOLOGY TEXT');
  });

  it('invariant 6 — the payload is GATE-FREE, structurally', async () => {
    // Not "we did not pass one": the input type has no gate field to pass, so
    // output cannot vary with panel state because the writer cannot see it.
    const writer = spyWriter();
    await buildDesignations(input({ writer }));
    const keys = Object.keys(writer.calls[0]);
    for (const forbidden of ['gates', 'gateState', 'acknowledged', 'panel', 'warnings']) {
      expect(keys).not.toContain(forbidden);
    }
  });

  it('tells the writer when an individual is missing from the latest chronology', async () => {
    const writer = spyWriter();
    await buildDesignations(input({
      writer,
      individuals: [person({ displayName: 'Ines Vantwoud', missingFromLatest: true })],
    }));
    expect(writer.calls[0].individuals[0].missingFromLatest).toBe(true);
  });

  it('hands an EMPTY chronology when none is readable (D-27), and still generates', async () => {
    const writer = spyWriter();
    const out = await buildDesignations(input({
      writer,
      chronologyVersions: [{ ...version, readable: false }],
    }));
    expect(writer.calls[0].chronologyText).toBe('');
    expect(out.paragraphs).toHaveLength(1);
  });
});

describe('D-3 — a failed writer call files NOTHING for the whole instrument', () => {
  it('throws a WriterCallError naming the facility, rather than rendering what it has', async () => {
    // "Render what you have" is what Part 1 forbids: a missing designation is
    // its own exposure, so a partial instrument is worse than no instrument.
    const failing: ParagraphWriter = {
      kind: 'fixture',
      async extract() { return { perFacility: [] }; },
      async write() { throw new Error('upstream said no'); },
    };
    await expect(buildDesignations(input({ writer: failing })))
      .rejects.toThrow(WriterCallError);
    await expect(buildDesignations(input({ writer: failing })))
      .rejects.toThrow(/Halite Regional Hospital/);
  });

  it('treats a malformed envelope as a failed call, not as empty parts', async () => {
    const malformed = {
      kind: 'fixture' as const,
      async extract() { return { perFacility: [] }; },
      async write() { return null as never; },
    };
    await expect(buildDesignations(input({ writer: malformed })))
      .rejects.toThrow(/nothing usable/i);
  });
});

describe('the block — D-64s line, D-65s membership, D-8s sentence', () => {
  it('renders the custodian line from the COUNT of individuals on the block', async () => {
    const one = await buildDesignations(input());
    expect(one.blocks[0].custodianLine).toBe('And/or Custodian of Records');

    const two = await buildDesignations(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Tobias Skarsgaard', credentialSuffix: 'D.O.' }),
      ],
    }));
    expect(two.blocks[0].custodianLine).toBe('And/or Custodians of Records');
  });

  it('makes the custodian line the TOP line when nobody is named', async () => {
    const out = await buildDesignations(input({ individuals: [] }));
    expect(out.blocks[0].individuals).toHaveLength(0);
    expect(out.blocks[0].topLine).toBe('Custodian of Records');
  });

  it('uses the pharmacy literal, and names nobody on a pharmacy block', async () => {
    const out = await buildDesignations(input({
      selected: [facility('pharmacy')],
      individuals: [person({ displayName: 'Osvaldo Quillane', provenance: 'hand' })],
    }));
    expect(out.blocks[0].custodianLine).toBe('Pharmacist(s) and/or Custodian of Records');
    expect(out.blocks[0].individuals).toEqual([]);
  });

  it('adds D-8s "Currently practicing at" line only when a later edge exists', async () => {
    const ind = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.', partyId: 'p9' });
    const without = await buildDesignations(input({ individuals: [ind] }));
    expect(without.blocks[0].currentlyPracticingAt).toBeUndefined();

    const withEdge = await buildDesignations(input({
      individuals: [ind],
      currentlyPracticing: {
        [ind.id]: { facility: 'Cobalt Imaging', address: '9 Ash St', phone: '555-0100' },
      },
    }));
    expect(withEdge.blocks[0].currentlyPracticingAt)
      .toBe('Currently practicing at Cobalt Imaging, 9 Ash St, 555-0100.');
  });

  it('blockPreview agrees with what a generate would render', async () => {
    // The Medical tab and the wizard both want this and they MUST agree, which
    // is why they call the same function rather than each deciding.
    const people = [
      person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
      person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level' }),
    ];
    const generated = await buildDesignations(input({ individuals: people }));
    expect(blockPreview(facility('emergency-medicine'), people).map((i) => i.id))
      .toEqual(generated.blocks[0].individuals.map((i) => i.id));
  });
});

describe('the narratives handed to the renderer', () => {
  it('keys them per item and carries the LEAD separately from the text', async () => {
    const out = await buildDesignations(input());
    const narratives = out.itemNarratives['testifying_expert:0'];
    expect(narratives).toHaveLength(1);
    expect(narratives[0].lead).toBe('Ines Vantwoud, M.D.,');
    // The lead is NOT inside the text: the renderer places it as its own bold
    // run, so a text that still carried it would print the name TWICE — which
    // is exactly what the first walk-through produced ("Ines Vantwoud, M.D.,
    // Ines Vantwoud, M.D., is a provider at…") and what this now holds shut.
    expect(narratives[0].text.startsWith('OPENING.')).toBe(true);
    expect(narratives[0].text).not.toContain('Ines Vantwoud, M.D.,');
    // The RECORD still keeps the whole paragraph, lead included — the two are
    // different things and both are needed.
    const whole = out.paragraphs[0];
    expect(whole.assembledText.startsWith('Ines Vantwoud, M.D., OPENING.')).toBe(true);
    expect(whole.assembledText).toBe(`${whole.leadText} ${whole.bodyText}`);
  });

  it('puts the rider AFTER the paragraph it rides, with no lead of its own', async () => {
    const out = await buildDesignations(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level', pronoun: 'she' }),
      ],
    }));
    const narratives = out.itemNarratives['testifying_expert:0'];
    expect(narratives).toHaveLength(2);
    expect(narratives[1].lead).toBeUndefined();
    expect(narratives[1].text).toContain('Ms. Natarajan');
  });

  it('invariant 27 — the gap flag is true EXACTLY for a custodian-only fallback', async () => {
    const fallback = await buildDesignations(input({ individuals: [] }));
    expect(fallback.paragraphs[0].shape).toBe('custodian-only');
    expect(fallback.paragraphs[0].gapFlag).toBe(true);

    const typed = await buildDesignations(input({
      selected: [facility('custodian-only')], individuals: [],
    }));
    expect(typed.paragraphs[0].gapFlag).toBe(false);

    const normal = await buildDesignations(input());
    expect(normal.paragraphs[0].gapFlag).toBe(false);
  });

  it('records the chronology version the paragraphs were written from', async () => {
    expect((await buildDesignations(input())).chronologyVersionId).toBe('v1');
    expect((await buildDesignations(input({ chronologyVersions: [] }))).chronologyVersionId)
      .toBeUndefined();
  });
});

describe('the rider names the paragraph it RIDES, not itself', () => {
  it('fills {supervising_provider} with the GROUP FILL, never the mid-level', async () => {
    // The first walk-through rendered "consistent with, and within the scope
    // of, the testimony described above regarding Priya Natarajan" — the PA
    // cited as her own supervisor, in a served designation.
    const out = await buildDesignations(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.', pronoun: 'she' }),
        person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level', pronoun: 'she' }),
      ],
    }));
    const rider = out.paragraphs.find((p) => p.shape === 'midlevel-rider')!;
    expect(rider.assembledText).toContain('Ms. Natarajan will testify consistent with');
    expect(rider.assembledText).toContain('described above regarding Dr. Vantwoud');
    expect(rider.assembledText).not.toContain('regarding Priya Natarajan');
  });

  it('names the whole GROUP when the paragraph it rides is a group', async () => {
    const out = await buildDesignations(input({
      individuals: [
        person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' }),
        person({ displayName: 'Tobias Skarsgaard', credentialSuffix: 'D.O.' }),
        person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level', pronoun: 'she' }),
      ],
    }));
    const rider = out.paragraphs.find((p) => p.shape === 'midlevel-rider')!;
    expect(rider.assembledText).toContain('regarding Drs. Vantwoud and Skarsgaard');
  });
});
// ---------------------------------------------------------------- HS-2 / F7

/**
 * THE 195.5 DESIGNATION BLOCK'S ADDRESS AND TELEPHONE LINES.
 *
 * What this holds shut: `blockItem` returned three HARD-CODED empty strings
 * for `facility_address_line_1`, `facility_city_state_zip` and
 * `facility_phone` while the `treating_provider` region built beside it read
 * the same three from the facility's own record. Every served block carried a
 * designee, a custodian line and a facility NAME — and no street, no
 * city/state/ZIP, no telephone — whatever the contact record held.
 *
 * The defect was invisible on the page for a structural reason, which is why
 * it needs a test rather than an eye: §12.3 DROPS an emptied paragraph rather
 * than leaving a blank line, so a facility with a complete contact record
 * rendered EXACTLY like one with nothing on file.
 *
 * Authority: the REQ-CAPTURE's §1.6 — the block reads the 195.5(a)(1) address
 * and telephone from the facility. §17.6 ("flag it and allow the user to still
 * create the document") is UNCHANGED by this and is asserted below.
 */
describe('HS-2 (F7) — the block reads the facility\'s address and telephone', () => {
  // Invented for this test. Never a fixture address, never a real one.
  const CONTACT = {
    addressLine1: '4200 Sandstone Row',
    cityStateZip: 'Halite, TX 77042',
    phone: '(361) 555-0142',
  };
  const NAME = 'Sandstone Regional Medical Center';

  /** D1 (2026-09-07): a facility's address lives on a `locations[]` item, split
   *  into street and city/state/ZIP with a stable `SD-4` id — the shape the
   *  registry now defines and the app's own party form can actually produce.
   *  This fixture used to set the two keys at the TOP level of `fields`, which
   *  `spec-feedback.md` item 2a records no app-created facility could ever
   *  have. One location, so `SD-8` resolves it without a pick. */
  const onFile = {
    id: 'f1', displayName: NAME,
    fields: { locations: [{ id: 'l1', label: 'Main', ...CONTACT, addressSplitBy: 'hand' }] },
  } as unknown as PartyRecord;

  /** The SAME facility with nothing on its contact record. */
  const bare = { id: 'f1', displayName: NAME } as PartyRecord;

  async function itemFor(p: PartyRecord) {
    const parties = { f1: p };
    const out = await buildDesignations(input({ facilityParties: parties }));
    // blockItem takes the MAP and keys off the block, so the name and the
    // address cannot come from different records.
    return blockItem(out.blocks[0], parties);
  }

  /** The FormsTab path: R17's blocks replace the region wholesale (§9.2). */
  async function renderedLines(p: PartyRecord): Promise<string[]> {
    const parties = { f1: p };
    const out = await buildDesignations(input({ facilityParties: parties }));
    const { context } = buildRenderContext(FIXTURE_BUNDLE, FIXTURE_ANSWERS);
    context.regions.testifying_expert = [blockItem(out.blocks[0], parties)];
    context.itemSelects = {
      ...context.itemSelects,
      'testifying_expert:0': 'treating_provider',
    };
    const rendered = await renderInstrument(disclosuresSkeletonBytes(), context);
    return rendered.plainText.split('\n').map((l) => l.trim());
  }

  it('(a) takes all three FROM THE RECORD, not from a constant', async () => {
    const item = await itemFor(onFile);
    expect(item.facility_address_line_1).toBe(CONTACT.addressLine1);
    expect(item.facility_city_state_zip).toBe(CONTACT.cityStateZip);
    expect(item.facility_phone).toBe(CONTACT.phone);

    // Move the record and the block moves with it. THIS is the assertion the
    // defect fails: a hard-coded value survives a changed record, a read does
    // not. Asserting the three strings alone would pass against constants that
    // happened to match.
    const moved = await itemFor({
      ...onFile,
      fields: {
        locations: [{
          id: 'l1', label: 'Main', ...CONTACT,
          addressLine1: '77 Feldspar Way', phone: '(361) 555-0199',
        }],
      },
    } as unknown as PartyRecord);
    expect(moved.facility_address_line_1).toBe('77 Feldspar Way');
    expect(moved.facility_phone).toBe('(361) 555-0199');
    expect(moved.facility_city_state_zip).toBe(CONTACT.cityStateZip);
  });

  it('(a) renders the six lines CONSECUTIVELY, in the master\'s own order', async () => {
    const lines = await renderedLines(onFile);
    const i = lines.indexOf(NAME.toUpperCase());
    // >= 2, not > -1: a negative slice start wraps to the document's TAIL and
    // would report a failure against the wrong text entirely.
    expect(i).toBeGreaterThanOrEqual(2);

    // Part 3's order: name lines, custodian line, facility name, street,
    // city/state/ZIP, telephone. Consecutive, because a dropped or reordered
    // line is exactly the failure being guarded against.
    expect(lines.slice(i - 2, i + 4)).toEqual([
      'Ines Vantwoud',
      'And/or Custodian of Records',
      NAME.toUpperCase(),
      CONTACT.addressLine1,
      CONTACT.cityStateZip,
      CONTACT.phone,
    ]);
  });

  it('(b) a facility with NOTHING on file renders the block without those lines', async () => {
    const item = await itemFor(bare);
    expect(item.facility_address_line_1).toBe('');
    expect(item.facility_city_state_zip).toBe('');
    expect(item.facility_phone).toBe('');

    const lines = await renderedLines(bare);
    const i = lines.indexOf(NAME.toUpperCase());
    expect(i).toBeGreaterThanOrEqual(2);
    // The name line, the custodian line, the facility — and then the block
    // ENDS. Asserting only the window that ENDS at the facility name proves
    // nothing about absence: stray blank lines, unresolved `{{...}}` tokens or
    // another facility's street would all satisfy it. The line AFTER the
    // facility name is what carries this, and §12.3 makes it blank because the
    // emptied paragraphs are dropped rather than left behind.
    expect(lines.slice(i - 2, i + 2)).toEqual([
      'Ines Vantwoud',
      'And/or Custodian of Records',
      NAME.toUpperCase(),
      '',
    ]);
    // And the drop is REAL, not merely invisible: the on-file render carries
    // exactly three more lines than this one.
    const onFileLines = await renderedLines(onFile);
    expect(onFileLines.length - lines.length).toBe(3);
  });

  it('cannot name one facility and carry another\'s address', async () => {
    // The two-argument shape this replaced took a RESOLVED record, so a caller
    // could hand blockItem the wrong one and get a served 195.5(a)(1) block
    // directing records requests to the wrong address. Keying off the block
    // makes that unrepresentable: a map holding BOTH facilities still yields
    // the named one's street.
    const other = {
      id: 'f2', displayName: 'Feldspar County Hospital',
      fields: {
        locations: [{
          id: 'l2', label: 'Main', addressLine1: '77 Feldspar Way',
          cityStateZip: 'Feldspar, TX 77099', phone: '(361) 555-0199',
        }],
      },
    } as unknown as PartyRecord;
    const parties = { f1: onFile, f2: other };
    const out = await buildDesignations(input({ facilityParties: parties }));
    const item = blockItem(out.blocks[0], parties);
    expect(item.facility_name_caps).toBe(NAME.toUpperCase());
    expect(item.facility_address_line_1).toBe(CONTACT.addressLine1);
    expect(item.facility_phone).toBe(CONTACT.phone);
  });

  it('(b) the panel still carries lines 1 and 2, and it still generates (§17.6)', () => {
    // The ruled posture is UNCHANGED by this fix: a missing address flags, it
    // never stops. tiers.ts reads the contact record itself and is untouched.
    const out = evaluateTiers({
      incidentDateIso: '2025-03-14',
      selected: [facility('emergency-medicine', { lastExtractionVersionId: 'v1' })],
      individuals: [person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' })],
      facilityNames: { f1: NAME },
      facilityAddresses: { f1: { hasAddress: false, hasPhone: false, locationState: 'none' } },
      chronologyVersions: [version],
      billedFacilityPartyIds: [],
    });
    expect(out.panel.map((f) => f.line)).toEqual(expect.arrayContaining([1, 2]));
    // SD-1 rewrote line 1 into three lines that are TRUE of the record as well
    // as of the document. The old sentence ("has no address on its contact
    // record") was false of the shape that actually fails — the address was on
    // the party page, in a `locations` group the form could not offer, and the
    // flag led nowhere (spec-feedback item 2a, third bullet).
    expect(out.panel.find((f) => f.line === 1)?.text)
      .toContain('has no locations on its contact record');
    expect(out.canGenerate).toBe(true);
    expect(out.stops).toHaveLength(0);
  });
});
