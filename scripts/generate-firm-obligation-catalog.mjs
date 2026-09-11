/**
 * GENERATOR — `firm-obligations-module-spec.md` §7 (the seed catalog) into
 * TypeScript, by program.
 *
 * WHY THIS EXISTS. The firm-obligations slice (FOS-1, RULED YES by Michael
 * 2026-09-10) seeds all thirty-five `FOT-` templates and the BOI note row as
 * code data, each carrying the SPEC §7 cite-and-status string as its
 * `sourceNote` — "copied, never reworded" (build slice §3 item 3) — pinned by
 * "a drift test over a generated constant, the `D-63` shape" (slice §7 item
 * 18); the kickoff prompt's reading list puts it at the byte: "copy every
 * Source cell string byte-for-byte". A cell retyped by hand is exactly where a
 * curly apostrophe or an em dash drifts without anyone seeing it.
 *
 * So no session types these strings. This reads §7 and writes every cell of
 * every template row through unchanged (JSON.stringify, so the escaping is
 * exact), and `src/domain/__tests__/firmObligationTemplates.test.ts` re-reads
 * the spec with its OWN parser and fails the suite on any divergence.
 *
 * WHAT IT DOES NOT DO. It interprets nothing. The rule kinds, the date hints,
 * the eight lapse rows, the twelve suggested rows and the inactive five are
 * built over these cells in `src/domain/firmObligationTemplates.ts`, each with
 * its ruling cite. The "—" rows that are EVENT-DRIVEN, DO NOT SEED, NOT HELD or
 * speculative are not templates and are not carried; the one exception is the
 * BOI row, which the slice seeds inactive with its note (slice §3 item 3).
 *
 * Run:  node scripts/generate-firm-obligation-catalog.mjs          (writes the file)
 *       node scripts/generate-firm-obligation-catalog.mjs --check  (writes nothing;
 *                                                                   exits 1 if stale)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const SPEC = join(REPO, 'docs', 'specs', 'firm-obligations-module-spec.md');
const OUT = join(REPO, 'src', 'domain', 'firmObligationCatalog.generated.ts');
const OUT_LABEL = 'src/domain/firmObligationCatalog.generated.ts';

const CHECK_ONLY = process.argv.includes('--check');

// --------------------------------------------------------------- failure

class GeneratorError extends Error {}

function assert(condition, message) {
  if (!condition) throw new GeneratorError(message);
}

// ---------------------------------------------------------------- parse

/** U+2014, the spec's empty cell — built from its code point, so the matcher cannot be a typed look-alike dash. */
const EM_DASH = String.fromCodePoint(0x2014);
const HEADER_ROW = '| # |';
const FOT_ROW = '| `FOT-';
const DASH_ROW = `| ${EM_DASH} |`;
/** The one "—" row the slice carries — seeded inactive, with its note (slice §3 item 3). */
const BOI_MARK = 'Beneficial-ownership (BOI) report';
const BOI_KEY = 'boi-note';
const FOT_COUNT = 35;

/**
 * Strip a cell's table padding: ASCII spaces and tabs ONLY, so no character of
 * the cell itself can be eaten. If String.prototype.trim would have removed
 * more (a no-break space at a cell's edge, say), which reading is right is not
 * this program's to decide — it stops.
 */
function trimCell(raw, where) {
  const cell = raw.replace(/^[ \t]+|[ \t]+$/g, '');
  assert(cell === raw.trim(), `${where}: a cell edge carries non-ASCII whitespace — ${JSON.stringify(raw)}`);
  return cell;
}

/** A table row's cells, split on UNESCAPED pipes. An escaped `\|` stays in its cell as written. */
function splitRow(line, where) {
  const row = line.replace(/[ \t]+$/, '');
  assert(row.length >= 2 && row.startsWith('|') && row.endsWith('|') && !row.endsWith('\\|'), `${where}: not a table row`);
  return row.slice(1, -1).split(/(?<!\\)\|/).map((c) => trimCell(c, where));
}

/**
 * Read §7's template rows.
 *
 * The shape §7 actually uses, verified against the file: `### 7.N Title`
 * headings, each over ONE table whose header row opens `| # |`. §7.1–§7.6 carry
 * # | Template | Kind / anchor | Lead | Weight | Source | Status | and then
 * `Conditional on` (or, in §7.3 only, `Note`); §7.7 carries # | Template |
 * Kind / anchor | Lead | Weight | Status / note. Template rows open with a
 * backticked `FOT-n` in the # cell; the "—" rows are not templates, save the BOI
 * row. §7.8 has no table. The headers are READ per table, never assumed.
 */
function parseSection7(spec) {
  const lines = spec.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith('## §7 '));
  assert(start >= 0, 'firm-obligations-module-spec.md: could not find the "## §7" heading');
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## §8 '));
  assert(end > start, 'firm-obligations-module-spec.md: could not find the "## §8" heading after §7');

  const rows = [];
  let section = null;
  let headers = null;

  for (let i = start + 1; i < end; i++) {
    const line = lines[i];
    const where = `spec line ${i + 1}`;

    const heading = line.match(/^### (7\.\d+) /);
    if (heading) {
      section = heading[1];
      headers = null;
      continue;
    }

    if (line.startsWith(HEADER_ROW)) {
      assert(section !== null, `${where}: a table header before any "### 7.x" heading`);
      assert(headers === null, `${where}: a second table header inside §${section}`);
      headers = splitRow(line, where);
      assert(new Set(headers).size === headers.length, `${where}: a repeated column header in §${section}`);
      continue;
    }

    const isFot = line.startsWith(FOT_ROW);
    const isDash = line.startsWith(DASH_ROW);
    if (!isFot && !isDash) continue;

    assert(section !== null && headers !== null, `${where}: a catalog row outside a §7.x table`);
    const cells = splitRow(line, where);
    assert(
      cells.length === headers.length,
      `${where}: ${cells.length} cells under §${section}'s ${headers.length} column headers`,
    );
    const byHeader = {};
    headers.forEach((h, j) => { byHeader[h] = cells[j]; });

    if (isFot) {
      const key = cells[0].match(/^`(FOT-\d+)`$/);
      assert(key, `${where}: the # cell ${JSON.stringify(cells[0])} is not a bare \`FOT-n\``);
      rows.push({ key: key[1], section, cells: byHeader });
    } else if ((byHeader.Template ?? '').includes(BOI_MARK)) {
      rows.push({ key: BOI_KEY, section, cells: byHeader });
    }
  }

  const fotKeys = rows.filter((r) => r.key !== BOI_KEY).map((r) => r.key);
  const expected = Array.from({ length: FOT_COUNT }, (_, i) => `FOT-${i + 1}`);
  assert(
    JSON.stringify(fotKeys) === JSON.stringify(expected),
    `§7 should carry FOT-1..FOT-${FOT_COUNT} once each, in order; parsed ${JSON.stringify(fotKeys)}`,
  );
  const boi = rows.filter((r) => r.key === BOI_KEY);
  assert(boi.length === 1, `§7 should carry exactly one BOI row; parsed ${boi.length}`);

  // The templates module slices each name from the Template cell's first bold
  // span; a row without one would reach the register nameless.
  for (const r of rows) {
    const t = r.cells.Template;
    assert(typeof t === 'string', `${r.key}: §${r.section} has no Template column`);
    const open = t.indexOf('**');
    const close = open < 0 ? -1 : t.indexOf('**', open + 2);
    assert(close > open + 2, `${r.key}: the Template cell carries no bold name`);
  }

  return rows;
}

// ----------------------------------------------------------------- emit

function union(values) {
  return values.map((v) => `  | ${JSON.stringify(v)}`).join('\n');
}

function emit(rows) {
  const keys = rows.map((r) => r.key);
  const sections = [...new Set(rows.map((r) => r.section))];
  const headers = [...new Set(rows.flatMap((r) => Object.keys(r.cells)))];

  const entries = rows.map((r) => {
    const cells = Object.entries(r.cells)
      .map(([h, c]) => `      ${JSON.stringify(h)}: ${JSON.stringify(c)},`)
      .join('\n');
    return `  {
    key: ${JSON.stringify(r.key)},
    section: ${JSON.stringify(r.section)},
    cells: {
${cells}
    },
  },`;
  }).join('\n');

  return `/**
 * THE FIRM-OBLIGATIONS SEED CATALOG — SPEC §7's template rows, cell by cell.
 *
 * GENERATED BY \`scripts/generate-firm-obligation-catalog.mjs\` — DO NOT EDIT BY HAND.
 * Every string below was read out of \`docs/specs/firm-obligations-module-spec.md\`
 * §7 by program and written through unchanged. The slice carries each row's
 * cite-and-status string "copied, never reworded" (build slice §3 item 3),
 * pinned by "a drift test over a generated constant, the \`D-63\` shape" (§7
 * item 18), and bars rewording any SPEC §7 cite string (§8). Correct the spec in
 * the design space and re-run the generator;
 * \`src/domain/__tests__/firmObligationTemplates.test.ts\` re-reads the spec and
 * fails the suite rather than let a divergence reach the register.
 *
 * Nothing here is interpreted. What a row MEANS — its kind, its date hint, its
 * lapse flag, its suggested mark — is built over these cells in
 * \`./firmObligationTemplates\`, each with the ruling behind it.
 */

/** \`FOT-n\` in spec order, and \`boi-note\` for the one "—" row the slice carries. */
export type FirmObligationCatalogKey =
${union(keys)};

/** The \`### 7.x\` table a row sits in. */
export type FirmObligationCatalogSection =
${union(sections)};

/** Every column header §7's tables use, in first-seen order. */
export type FirmObligationCatalogHeader =
${union(headers)};

export interface FirmObligationCatalogRow {
  readonly key: FirmObligationCatalogKey;
  readonly section: FirmObligationCatalogSection;
  /** Header → cell, in the table's own column order; each cell VERBATIM, its
   *  table padding trimmed. A header absent from the row's table is absent here. */
  readonly cells: Readonly<Partial<Record<FirmObligationCatalogHeader, string>>>;
}

export const FIRM_OBLIGATION_CATALOG_ROWS: readonly FirmObligationCatalogRow[] = [
${entries}
];

/** One row, by key. Throws rather than hand back undefined. */
export function catalogRow(key: FirmObligationCatalogKey): FirmObligationCatalogRow {
  const row = FIRM_OBLIGATION_CATALOG_ROWS.find((r) => r.key === key);
  if (!row) throw new Error(\`firm-obligation catalog: no row \${key}\`);
  return row;
}

/** One cell, by row key and column header. Throws when the row's table has no
 *  such column — a §7.7 row has no Source column, and a silent undefined there
 *  would render as an empty cite. */
export function catalogCell(key: FirmObligationCatalogKey, header: FirmObligationCatalogHeader): string {
  const row = catalogRow(key);
  const cell = row.cells[header];
  if (cell === undefined) {
    throw new Error(\`firm-obligation catalog: \${key} (§\${row.section}) has no "\${header}" column\`);
  }
  return cell;
}
`;
}

// ----------------------------------------------------------------- main

function main() {
  const spec = readFileSync(SPEC, 'utf8');
  const rows = parseSection7(spec);
  const text = emit(rows);

  let existing = null;
  try { existing = readFileSync(OUT, 'utf8'); } catch { existing = null; }

  const fot = rows.filter((r) => r.key !== BOI_KEY).length;
  const summary = `\n§7 → ${fot} FOT rows + the BOI note row (${rows.length} rows).`;

  // Line endings are normalized before comparing. This machine checks out with
  // core.autocrlf=true and the repo has no .gitattributes, so a fresh checkout can
  // write the committed file back with CRLF — and the drift test runs --check, so an
  // exact compare would turn the suite red with nothing drifted. What must not drift
  // is the COPIED STRINGS, and no generated cell carries a line break.
  if (existing !== null && existing.replace(/\r\n/g, '\n') === text) {
    console.log(`  up to date  ${OUT_LABEL}`);
    console.log(summary);
    return;
  }
  if (CHECK_ONLY) {
    console.error(`  STALE       ${OUT_LABEL}`);
    console.log(summary);
    console.error('\nRe-run `node scripts/generate-firm-obligation-catalog.mjs` and commit the result.');
    process.exit(1);
  }
  writeFileSync(OUT, text);
  console.log(`  written     ${OUT_LABEL}`);
  console.log(summary);
}

try {
  main();
} catch (err) {
  if (err instanceof GeneratorError) {
    console.error(`\ngenerate-firm-obligation-catalog: ${err.message}\n`);
    process.exit(1);
  }
  throw err;
}
