/**
 * The chronology readers — six formats, NO NEW DEPENDENCY (D-43).
 *
 * `RC-7` says "anything the model can read", which is open-ended; the readable
 * set is therefore the BUILD's and is named as a DEFAULT rather than a ruling.
 * Every other extension is REFUSED at the drop with a message naming these six,
 * so the narrowing is visible to Michael rather than silent.
 *
 * ⚠ **THE ORIGINAL BYTES ARE NEVER RETAINED** (`AS-Q4`). These functions turn a
 * dropped file into TEXT and the text is what is stored. Nothing here writes a
 * blob, a base64 string or a file handle anywhere, and a file store is gate-7
 * work. The reduction to text is a FORMAT CHANGE, not the scrubbing Michael
 * abandoned (§16.2) — no content is removed, thinned or de-identified.
 *
 * The xlsx reader is hand-rolled over the existing zero-dependency ZIP layer,
 * which is the FE-D1 build's posture and the reason no package is added for it.
 */

import { readZip, entryText, type ZipEntry } from '../zip';
import { visibleText } from '../docx';
import { CHRONOLOGY_FORMATS, type ChronologyFormat } from '../../domain/caseProviders';

/** What a reader produces. `readable` is decided separately, by D-62. */
export interface ReadResult {
  text: string;
  format: ChronologyFormat;
}

export class UnsupportedChronologyFormat extends Error {
  extension: string;

  constructor(extension: string) {
    super(
      `This build reads ${CHRONOLOGY_FORMATS.join(', ')} files. "${extension || '(no extension)'}" `
      + 'is not one of them, so nothing was stored. Convert it and drop it again.',
    );
    this.name = 'UnsupportedChronologyFormat';
    this.extension = extension;
  }
}

/** The extension, lower-cased, without the dot. */
export function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot + 1).toLowerCase();
}

/**
 * Which format a filename declares — or a refusal.
 *
 * `.doc` and `.xls` are named in the message rather than silently lumped with
 * everything else, because they are the two a person is most likely to try and
 * the old binary formats are genuinely not readable here.
 */
export function formatFor(filename: string): ChronologyFormat {
  const ext = extensionOf(filename);
  if (ext === 'doc' || ext === 'xls' || ext === 'ppt') {
    throw new UnsupportedChronologyFormat(ext);
  }
  if ((CHRONOLOGY_FORMATS as readonly string[]).includes(ext)) return ext as ChronologyFormat;
  throw new UnsupportedChronologyFormat(ext);
}

// ------------------------------------------------------------------- docx

/** A .docx is an OPC package; its words live in `word/document.xml`. The
 *  existing renderer already knows how to pull visible text out of that XML,
 *  so this reuses it rather than writing a second, subtly different parser. */
export async function readDocxText(bytes: Uint8Array): Promise<string> {
  const entries = await readZip(bytes);
  return visibleText(entryText(entries, 'word/document.xml'));
}

// ------------------------------------------------------------------- xlsx

/** Excel stores most strings once in a shared table and refers to them by
 *  index; inline strings and raw numbers also occur. All three are handled,
 *  because a chronology exported as a spreadsheet routinely uses all three. */
function sharedStrings(entries: ZipEntry[]): string[] {
  let xml: string;
  try {
    xml = entryText(entries, 'xl/sharedStrings.xml');
  } catch {
    return [];                       // a workbook of pure numbers has no table
  }
  return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((m) => textOfNode(m[1]));
}

/** Every `<t>` in a node, concatenated. A single cell's string can be split
 *  across several runs when part of it is formatted differently. */
function textOfNode(xml: string): string {
  return [...xml.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)]
    .map((m) => decodeXml(m[1]))
    .join('');
}

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&');         // last, or an escaped &amp;lt; double-decodes
}

/**
 * Excel serial date → ISO.
 *
 * The 1900 system with its deliberate leap-year bug: serial 1 is 1900-01-01 and
 * serial 60 is the 29th of February 1900, a day that did not exist. Anchoring
 * on 1899-12-30 absorbs it for every date from 1900-03-01 on, which is every
 * date a medical chronology will ever carry. Computed in UTC arithmetic and
 * formatted from the parts, never through a local Date — the FE-D1 build's
 * defect (2) was exactly a date moved by a timezone.
 */
export function excelSerialToIso(serial: number): string | null {
  if (!Number.isFinite(serial) || serial < 1 || serial > 2958465) return null;
  const ms = Math.round(serial) * 86400000;
  const epoch = Date.UTC(1899, 11, 30);
  const d = new Date(epoch + ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * A spreadsheet reduced to text, one row per line, cells tab-separated.
 *
 * Cells whose style marks them as a date are rendered ISO; everything else is
 * rendered as it is stored. Column positions are honoured so an empty cell does
 * not shift the row — a chronology's columns mean something.
 */
export async function readXlsxText(bytes: Uint8Array): Promise<string> {
  const entries = await readZip(bytes);
  const strings = sharedStrings(entries);
  const dateStyles = dateStyleIndexes(entries);

  const sheets = entries
    .filter((e) => /^xl\/worksheets\/sheet\d+\.xml$/.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const out: string[] = [];
  for (const sheet of sheets) {
    const xml = new TextDecoder().decode(sheet.data);
    for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const cells: string[] = [];
      for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cellMatch[1];
        const inner = cellMatch[2];
        const ref = /r="([A-Z]+)\d+"/.exec(attrs)?.[1];
        const col = ref ? columnIndex(ref) : cells.length;
        while (cells.length < col) cells.push('');

        const type = /t="([^"]+)"/.exec(attrs)?.[1];
        const styleId = Number(/s="(\d+)"/.exec(attrs)?.[1] ?? NaN);
        const raw = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1];

        let value: string;
        if (type === 's') {
          value = strings[Number(raw)] ?? '';
        } else if (type === 'inlineStr') {
          value = textOfNode(inner);
        } else if (type === 'str') {
          value = decodeXml(raw ?? '');
        } else if (raw != null && dateStyles.has(styleId)) {
          value = excelSerialToIso(Number(raw)) ?? decodeXml(raw);
        } else {
          value = decodeXml(raw ?? '');
        }
        cells.push(value);
      }
      // A row of nothing but empty cells carries no information and only makes
      // the text longer, which for a model payload is a real cost.
      if (cells.some((c) => c.trim() !== '')) out.push(cells.join('\t'));
    }
  }
  return out.join('\n');
}

/** Style ids whose number format is a date or a time. The built-in numeric
 *  formats 14-22 and 45-47 are dates/times by definition; a custom format is a
 *  date when its code carries y, d, or a month/minute token. */
function dateStyleIndexes(entries: ZipEntry[]): Set<number> {
  let xml: string;
  try {
    xml = entryText(entries, 'xl/styles.xml');
  } catch {
    return new Set();
  }
  const builtin = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 45, 46, 47]);
  const customDate = new Set<number>();
  for (const m of xml.matchAll(/<numFmt\b[^>]*numFmtId="(\d+)"[^>]*formatCode="([^"]*)"/g)) {
    if (/[yd]|mm?m|h/i.test(m[2])) customDate.add(Number(m[1]));
  }

  const out = new Set<number>();
  const cellXfs = /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/.exec(xml)?.[1] ?? '';
  let index = 0;
  for (const xf of cellXfs.matchAll(/<xf\b([^>]*)\/?>/g)) {
    const id = Number(/numFmtId="(\d+)"/.exec(xf[1])?.[1] ?? NaN);
    if (builtin.has(id) || customDate.has(id)) out.add(index);
    index += 1;
  }
  return out;
}

/** "A" -> 0, "B" -> 1, "AA" -> 26. */
function columnIndex(ref: string): number {
  let n = 0;
  for (const ch of ref) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

// ------------------------------------------------------------------- other

/** CSV and plain text go through as they are: the model reads them. JSON is
 *  pretty-printed when it parses, so a minified export does not arrive as one
 *  enormous line, and passed through untouched when it does not — a malformed
 *  file is still evidence and refusing it would lose content. */
export function readTextual(text: string, format: ChronologyFormat): string {
  if (format !== 'json') return text;
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

// ---------------------------------------------------------------- readable

/**
 * D-62 — the READABLE threshold.
 *
 * A scanned PDF with one OCR'd header has SOME text, so "has a text layer" is
 * not a usable test and a threshold is needed. For a PDF: at least 40
 * non-whitespace characters per page, OR 500 in total. For everything else: any
 * non-empty text.
 *
 * `readable = false` is FLAGGED at the drop and the version is NEVER SENT to a
 * model and never counts as "newest" — a page of scanned images would otherwise
 * silently starve the writer while looking like a chronology.
 */
export function isReadable(text: string, format: ChronologyFormat, pageCount?: number): boolean {
  const dense = text.replace(/\s+/g, '').length;
  if (format !== 'pdf') return dense > 0;
  if (dense >= 500) return true;
  const pages = pageCount && pageCount > 0 ? pageCount : 1;
  return dense >= 40 * pages;
}
