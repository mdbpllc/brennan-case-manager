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

import { describe, it, expect, vi } from 'vitest';
import { buildDesignations, blockPreview, type GenerateInput } from '../generate';
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

  it('calls three times for a split plus a rider — treating, radiology, rider', async () => {
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
    // The lead is NOT inside the text — it is its own bold run at render time.
    expect(narratives[0].text.startsWith('Ines Vantwoud, M.D., OPENING.')).toBe(true);
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
