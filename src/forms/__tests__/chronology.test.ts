// THE CHRONOLOGY — the six readers, the readable threshold, and the merge that
// has to leave Michael's hand-work alone.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §7.1, AS-Q4, and the defaults
// D-12 (additive re-extraction), D-43 (the closed format list), D-44 (the two
// triggers), D-46 (extraction scope by type), D-48 (the run marker), D-51
// (per-field provenance), D-55 (the soft delete), D-58 (shape validation) and
// D-62 (the readable threshold).
//
// The .docx and .xlsx fixtures are BUILT HERE with the repo's own zip writer
// rather than committed as binaries, so the readers are tested against real
// packages and nothing new lands in the tree.

import { describe, it, expect } from 'vitest';
import { writeZip, type ZipEntry } from '../zip';
import {
  UnsupportedChronologyFormat, excelSerialToIso, extensionOf, formatFor,
  isReadable, readDocxText, readTextual, readXlsxText,
} from '../chronology/readers';
import { runExtraction, validateExtracted } from '../chronology/extraction';
import type { DataAdapter } from '../../data/adapter';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual, CaseProviderVisit,
} from '../../domain/caseProviders';
import type { ExtractionInput, ExtractionResult, ParagraphWriter, WriterParts } from '../writer';

const T = '2026-09-03T00:00:00.000Z';

function entry(name: string, text: string): ZipEntry {
  return {
    name, data: new TextEncoder().encode(text), method: 8,
    dosTime: 0, dosDate: 0, externalAttrs: 0,
  };
}

// ------------------------------------------------------------- the formats

describe('D-43 — a CLOSED format list, and every other extension refused', () => {
  it('accepts exactly the six', () => {
    for (const ext of ['pdf', 'docx', 'xlsx', 'csv', 'json', 'txt']) {
      expect(formatFor(`chronology.${ext}`)).toBe(ext);
    }
    expect(formatFor('CHRONOLOGY.PDF')).toBe('pdf');
  });

  it('refuses the old binary Office formats BY NAME, since those are what get tried', () => {
    for (const ext of ['doc', 'xls', 'ppt']) {
      expect(() => formatFor(`notes.${ext}`)).toThrow(UnsupportedChronologyFormat);
    }
  });

  it('refuses anything else, and the message names what IS accepted', () => {
    try {
      formatFor('scan.tiff');
      expect.unreachable('should have thrown');
    } catch (e) {
      const msg = (e as Error).message;
      expect(msg).toContain('pdf');
      expect(msg).toContain('xlsx');
      expect(msg).toContain('nothing was stored');
    }
    expect(() => formatFor('noextension')).toThrow(UnsupportedChronologyFormat);
    expect(extensionOf('noextension')).toBe('');
  });
});

describe('D-62 — the readable threshold, which a scan has to fail', () => {
  it('passes a real text layer and fails a scan with an OCR-d header', () => {
    // The whole reason a threshold exists: a scanned PDF is not empty, it just
    // has almost nothing, and "has text" would call it readable.
    expect(isReadable('PATIENT CHART', 'pdf', 12)).toBe(false);
    expect(isReadable('x'.repeat(500), 'pdf', 40)).toBe(true);
    expect(isReadable('x'.repeat(80), 'pdf', 2)).toBe(true);
    expect(isReadable('x'.repeat(60), 'pdf', 2)).toBe(false);
  });

  it('treats any non-empty text as readable for the non-PDF formats', () => {
    expect(isReadable('a', 'txt')).toBe(true);
    expect(isReadable('   \n\t ', 'txt')).toBe(false);
    expect(isReadable('', 'csv')).toBe(false);
  });
});

// --------------------------------------------------------------- the readers

describe('the .docx reader, over a real package', () => {
  it('pulls the visible text out of word/document.xml', async () => {
    const bytes = await writeZip([
      entry('[Content_Types].xml', '<Types/>'),
      entry('word/document.xml',
        '<w:document><w:body>'
        + '<w:p><w:r><w:t>Seen at Halite Regional Hospital</w:t></w:r></w:p>'
        + '<w:p><w:r><w:t>on March 14, 2025.</w:t></w:r></w:p>'
        + '</w:body></w:document>'),
    ]);
    const text = await readDocxText(bytes);
    expect(text).toContain('Halite Regional Hospital');
    expect(text).toContain('March 14, 2025');
    expect(text).not.toContain('<w:t>');
  });
});

describe('the hand-rolled .xlsx reader (D-43 — no new dependency)', () => {
  async function workbook(sheet: string, extras: ZipEntry[] = []): Promise<Uint8Array> {
    return writeZip([
      entry('[Content_Types].xml', '<Types/>'),
      entry('xl/worksheets/sheet1.xml', `<worksheet><sheetData>${sheet}</sheetData></worksheet>`),
      ...extras,
    ]);
  }

  it('resolves SHARED strings, inline strings and raw numbers', async () => {
    const bytes = await workbook(
      '<row r="1">'
      + '<c r="A1" t="s"><v>0</v></c>'
      + '<c r="B1" t="inlineStr"><is><t>Ines Vantwoud</t></is></c>'
      + '<c r="C1"><v>1250.5</v></c>'
      + '</row>',
      [entry('xl/sharedStrings.xml', '<sst><si><t>Emergency department</t></si></sst>')],
    );
    expect(await readXlsxText(bytes))
      .toBe('Emergency department\tInes Vantwoud\t1250.5');
  });

  it('holds COLUMN POSITION so an empty cell does not shift the row', async () => {
    // A chronology's columns mean something; a shifted row would silently put
    // a date under a description.
    const bytes = await workbook(
      '<row r="1"><c r="A1" t="inlineStr"><is><t>first</t></is></c>'
      + '<c r="C1" t="inlineStr"><is><t>third</t></is></c></row>',
    );
    expect(await readXlsxText(bytes)).toBe('first\t\tthird');
  });

  it('renders a DATE-styled serial as ISO and leaves a plain number alone', async () => {
    const bytes = await workbook(
      '<row r="1"><c r="A1" s="0"><v>45730</v></c><c r="B1" s="1"><v>45730</v></c></row>',
      [entry('xl/styles.xml',
        '<styleSheet><cellXfs><xf numFmtId="14"/><xf numFmtId="0"/></cellXfs></styleSheet>')],
    );
    const out = await readXlsxText(bytes);
    expect(out.split('\t')[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(out.split('\t')[1]).toBe('45730');
  });

  it('converts serials against the 1900 system, leap-year bug and all', () => {
    // Serial 60 is Excel's 29 February 1900, a day that never existed. Every
    // date a medical chronology carries is after that, which is why anchoring
    // on 1899-12-30 is correct for the range that matters.
    expect(excelSerialToIso(61)).toBe('1900-03-01');
    expect(excelSerialToIso(45730)).toBe('2025-03-14');
    expect(excelSerialToIso(0)).toBeNull();
    expect(excelSerialToIso(Number.NaN)).toBeNull();
  });

  it('drops rows that are entirely empty and decodes XML entities', async () => {
    const bytes = await workbook(
      '<row r="1"><c r="A1" t="inlineStr"><is><t>Ram &amp; Sons &lt;Ltd&gt;</t></is></c></row>'
      + '<row r="2"><c r="A2" t="inlineStr"><is><t></t></is></c></row>',
    );
    expect(await readXlsxText(bytes)).toBe('Ram & Sons <Ltd>');
  });
});

describe('the textual readers', () => {
  it('pretty-prints JSON so a minified export is not one enormous line', () => {
    expect(readTextual('{"a":1}', 'json')).toBe('{\n  "a": 1\n}');
  });

  it('passes MALFORMED json through rather than losing it', () => {
    // A malformed file is still evidence. Refusing it would drop content.
    expect(readTextual('{not json', 'json')).toBe('{not json');
  });

  it('leaves csv and txt exactly as they are', () => {
    expect(readTextual('a,b\n1,2', 'csv')).toBe('a,b\n1,2');
  });
});

// -------------------------------------------------------------- the merge

describe('D-58 — validation of SHAPE, never of content', () => {
  it('lands an unparseable date NULL and carries the raw string into the summary', () => {
    const out = validateExtracted({
      displayName: 'Ines Vantwoud',
      treatmentFrom: 'March 2025',
      summary: 'Treated the patient.',
    })!;
    expect(out.treatmentFrom).toBeUndefined();
    expect(out.summary).toContain('Treated the patient.');
    expect(out.summary).toContain('[treatment from: March 2025]');
  });

  it('drops a row with no name — there is nothing to designate', () => {
    expect(validateExtracted({ displayName: '   ' })).toBeNull();
  });

  it('stores everything else exactly as returned', () => {
    const out = validateExtracted({
      displayName: 'Tobias Skarsgaard', credentialSuffix: 'D.O.',
      treatmentFrom: '2025-03-14', summary: 'whatever the model said',
    })!;
    expect(out.summary).toBe('whatever the model said');
    expect(out.treatmentFrom).toBe('2025-03-14');
  });
});

/** A fake adapter that records what the merge actually did. */
function fakeDb(individuals: CaseProviderIndividual[]) {
  const created: CaseProviderIndividual[] = [];
  const updates: { id: string; patch: Partial<CaseProviderIndividual> }[] = [];
  const providerUpdates: { id: string; patch: Partial<CaseProvider> }[] = [];
  const visitWrites: { individualId: string; count: number }[] = [];
  let n = 0;

  const db = {
    async createProviderIndividual(data: Omit<CaseProviderIndividual, 'id' | 'createdAt' | 'updatedAt'>) {
      n += 1;
      const row = { ...data, id: `new-${n}`, createdAt: T, updatedAt: T };
      created.push(row);
      return row;
    },
    async updateProviderIndividual(id: string, patch: Partial<CaseProviderIndividual>) {
      updates.push({ id, patch });
      const base = individuals.find((i) => i.id === id)!;
      return { ...base, ...patch };
    },
    async updateCaseProvider(id: string, patch: Partial<CaseProvider>) {
      providerUpdates.push({ id, patch });
      return { id } as CaseProvider;
    },
    async replaceProviderVisits(individualId: string, visits: unknown[]) {
      visitWrites.push({ individualId, count: visits.length });
      return [] as CaseProviderVisit[];
    },
  } as unknown as DataAdapter;

  return { db, created, updates, providerUpdates, visitWrites };
}

function writerReturning(names: string[]): ParagraphWriter {
  return {
    kind: 'fixture',
    async extract(input: ExtractionInput): Promise<ExtractionResult> {
      return {
        perFacility: input.facilities.map((f) => ({
          caseProviderId: f.caseProviderId,
          individuals: names.map((displayName) => ({
            displayName, credentialSuffix: 'M.D.', treatmentFrom: '2025-03-14',
            summary: 'model summary', visits: [{ visitDate: '2025-03-14', description: 'visit' }],
          })),
        })),
      };
    },
    async write(): Promise<WriterParts> { return {}; },
  };
}

const version: CaseChronologyVersion = {
  id: 'v2', caseId: 'c1', versionNo: 2, droppedAt: T, sourceFilename: 'chron.pdf',
  sourceFormat: 'pdf', extractedText: 'text', readable: true, createdAt: T,
};

const facility: CaseProvider = {
  id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', providerType: 'emergency-medicine',
  lop: false, createdAt: T, updatedAt: T,
};

const NAMES = { f1: { name: 'Halite Regional Hospital', aliases: [] } };

function ind(over: Partial<CaseProviderIndividual>): CaseProviderIndividual {
  return {
    id: 'i1', caseProviderId: 'cp1', displayName: 'Ines Vantwoud', provenance: 'model',
    missingFromLatest: false, handEditedFields: [], createdAt: T, updatedAt: T, ...over,
  };
}

describe('D-12 / D-51 / D-55 — what a RE-PULL is not allowed to undo', () => {
  it('NEVER overwrites a field Michael edited by hand (D-51)', async () => {
    const rows = [ind({ credentialSuffix: 'D.C.', handEditedFields: ['credentialSuffix'] })];
    const { db, updates } = fakeDb(rows);
    await runExtraction(db, writerReturning(['Ines Vantwoud']), version, [facility], rows, NAMES);

    const patch = updates.find((u) => u.id === 'i1')!.patch;
    expect(patch).not.toHaveProperty('credentialSuffix');
    expect(patch.summary).toBe('model summary');       // untouched fields DO update
  });

  it('NEVER resurrects a row he removed (D-55) — the point of the soft delete', async () => {
    // His ruled act, "I can go through and delete anyone that I wanna delete",
    // has to survive the next drop, or a hard delete would have been the same
    // thing and this whole mechanism means nothing.
    const rows = [ind({ removedByHandAt: T })];
    const { db, updates, created } = fakeDb(rows);
    const out = await runExtraction(
      db, writerReturning(['Ines Vantwoud']), version, [facility], rows, NAMES,
    );

    expect(created).toHaveLength(0);
    expect(updates.filter((u) => u.id === 'i1')).toHaveLength(0);
    expect(out.skippedRemoved).toBe(1);
  });

  it('NEVER touches a hand-ADDED individual at all (D-12)', async () => {
    const rows = [ind({ provenance: 'hand', summary: 'what Michael typed' })];
    const { db, updates } = fakeDb(rows);
    await runExtraction(db, writerReturning(['Ines Vantwoud']), version, [facility], rows, NAMES);
    expect(updates.filter((u) => u.id === 'i1')).toHaveLength(0);
  });

  it('KEEPS and FLAGS an individual the newer chronology does not name', async () => {
    // Deleting them would quietly drop a designation. The flag is a panel line;
    // the summary and visits stay as the version that named them left them.
    const rows = [ind({ id: 'gone', displayName: 'Marguerite Okonjo-Rell' })];
    const { db, updates } = fakeDb(rows);
    const out = await runExtraction(
      db, writerReturning(['Ines Vantwoud']), version, [facility], rows, NAMES,
    );
    expect(out.markedMissing).toBe(1);
    expect(updates.find((u) => u.id === 'gone')!.patch.missingFromLatest).toBe(true);
    expect(out.added).toBe(1);
  });

  it('suppresses within-facility duplicates by exact name', async () => {
    const { db, created } = fakeDb([]);
    await runExtraction(
      db, writerReturning(['Ines Vantwoud', 'Ines Vantwoud']), version, [facility], [], NAMES,
    );
    expect(created).toHaveLength(1);
  });

  it('never writes a role marker — the model does not assign one (§17.1a)', async () => {
    const { db, created } = fakeDb([]);
    await runExtraction(db, writerReturning(['Ines Vantwoud']), version, [facility], [], NAMES);
    expect(created[0].roleMarker).toBeUndefined();
    expect(created[0].provenance).toBe('model');
  });
});

describe('D-46 / D-48 / D-62 — when an extraction runs at all', () => {
  it('does NOT run for a pharmacy or a custodian-only facility (D-46)', async () => {
    for (const providerType of ['pharmacy', 'custodian-only'] as const) {
      const { db, created } = fakeDb([]);
      const out = await runExtraction(
        db, writerReturning(['Ines Vantwoud']), version,
        [{ ...facility, providerType }], [], NAMES,
      );
      expect(out.facilitiesPulled).toBe(0);
      expect(created).toHaveLength(0);
    }
  });

  it('does NOT run against an UNREADABLE or a REMOVED version', async () => {
    for (const bad of [{ ...version, readable: false }, { ...version, removedAt: T }]) {
      const { db, created } = fakeDb([]);
      const out = await runExtraction(
        db, writerReturning(['Ines Vantwoud']), bad, [facility], [], NAMES,
      );
      expect(out.facilitiesPulled).toBe(0);
      expect(created).toHaveLength(0);
    }
  });

  it('records the RUN marker so "found nobody" is not "never pulled" (D-48)', async () => {
    const { db, providerUpdates } = fakeDb([]);
    await runExtraction(db, writerReturning([]), version, [facility], [], NAMES);
    const patch = providerUpdates.find((u) => u.id === 'cp1')!.patch;
    expect(patch.lastExtractionVersionId).toBe('v2');
    expect(patch.lastExtractedAt).toBeTruthy();
  });
});
