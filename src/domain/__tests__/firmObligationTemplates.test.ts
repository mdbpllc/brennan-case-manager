// INVARIANT 18 — the seed catalog (firm-obligations-build-slice.md §7 item 18).
//
// Slice §3 item 3 seeds all thirty-five FOT- templates and the BOI note row with
// the SPEC §7 cite-and-status string as `sourceNote`, "copied, never reworded".
// A copied string lives in two places at once — the spec and the generated
// constant — and that is the condition that produces drift. This holds them
// together: the spec is re-read here with THIS FILE'S OWN parser (never the
// generator's, so one parsing bug cannot pass itself) and every generated cell
// must still be byte-equal to the spec cell it was copied from.
//
// The rows compared are the GENERATED CONSTANT, never a store row — D-63. An
// obligation Michael activates and edits is his; what this guards is the
// catalog's fidelity to the spec.
//
// The sets are asserted twice where the spec allows: once as the literal the
// ruling names, and once against the spec's own text — §16's §7 bullet for the
// eight lapse rows and the twelve go-live rows, each row's own cell for the
// inactive five, the month-precision pair, the kinds and the date hints — so a
// later amendment fails here instead of passing silently.

import { describe, it, expect } from 'vitest';
import specText from '../../../docs/specs/firm-obligations-module-spec.md?raw';
import { FIRM_OBLIGATION_CATALOG_ROWS } from '../firmObligationCatalog.generated';
import { FIRM_OBLIGATION_TEMPLATES, templateByKey } from '../firmObligationTemplates';
import { defaultMissedPeriods, RULE_KINDS } from '../firmObligations';

// ------------------------------------------------- this file's own §7 parser

// Built from code points, never typed — a typed dash can be a look-alike. U+2014
// is the spec's empty cell; U+00B7 separates FOT-14's and FOT-18's quarter dates.
const EM_DASH = String.fromCodePoint(0x2014);
const MIDDLE_DOT = String.fromCodePoint(0x00b7);
const BOI_MARK = 'Beneficial-ownership (BOI) report';

interface SpecRow {
  key: string;
  section: string;
  headers: string[];
  cells: Record<string, string>;
}

const SPEC_LINES = specText.split(/\r?\n/);

function linesBetween(open: string, close: string): string[] {
  const from = SPEC_LINES.findIndex((l) => l.startsWith(open));
  const to = SPEC_LINES.findIndex((l, i) => i > from && l.startsWith(close));
  if (from < 0 || to < 0) throw new Error(`spec: could not isolate "${open}" … "${close}"`);
  return SPEC_LINES.slice(from + 1, to);
}

const SECTION_7 = linesBetween('## §7 ', '## §8 ');

function cellsOf(line: string): string[] {
  const row = line.trimEnd();
  return row.slice(1, -1).split(/(?<!\\)\|/).map((c) => c.trim());
}

function parseSpecCatalog(): SpecRow[] {
  const out: SpecRow[] = [];
  let section = '';
  let headers: string[] = [];
  for (const line of SECTION_7) {
    const h = /^### (7\.\d) /.exec(line);
    if (h) { section = h[1]; headers = []; continue; }
    if (line.startsWith('| # |')) { headers = cellsOf(line); continue; }
    const fot = /^\| `(FOT-\d+)` \|/.exec(line);
    if (!fot && !line.startsWith(`| ${EM_DASH} |`)) continue;
    const cells = cellsOf(line);
    if (cells.length !== headers.length) throw new Error(`spec: ${cells.length} cells under ${headers.length} headers — ${line.slice(0, 60)}`);
    const byHeader = Object.fromEntries(headers.map((name, i) => [name, cells[i]]));
    if (fot) out.push({ key: fot[1], section, headers, cells: byHeader });
    else if (byHeader.Template.includes(BOI_MARK)) out.push({ key: 'boi-note', section, headers, cells: byHeader });
  }
  return out;
}

const SPEC_ROWS = parseSpecCatalog();

function specRow(key: string): SpecRow {
  const row = SPEC_ROWS.find((r) => r.key === key);
  if (!row) throw new Error(`spec: no row ${key}`);
  return row;
}

const utf8Length = (s: string) => new TextEncoder().encode(s).length;

function expectByteEqual(actual: string | undefined, expected: string, label: string) {
  expect(actual, label).toBe(expected);
  expect(utf8Length(actual ?? ''), `${label} — UTF-8 byte length`).toBe(utf8Length(expected));
}

const FOT_KEYS = Array.from({ length: 35 }, (_, i) => `FOT-${i + 1}`);
const keysWhere = (pred: (t: (typeof FIRM_OBLIGATION_TEMPLATES)[number]) => boolean) =>
  FIRM_OBLIGATION_TEMPLATES.filter(pred).map((t) => t.key);

// §16's §7 bullet — the governing text for the lapse rows and the go-live rows.
const SECTION_16_BULLET = (() => {
  const from = SPEC_LINES.findIndex((l) => l.startsWith('## §16 '));
  const line = SPEC_LINES.slice(from).find((l) => l.startsWith('- **§7** '));
  if (from < 0 || !line) throw new Error('spec: §16\'s §7 bullet not found');
  return line;
})();
const fotKeysIn = (s: string) => [...s.matchAll(/`(FOT-\d+)`/g)].map((m) => m[1]);

// ------------------------------------------------------------------ the spec

describe('SPEC §7, as this test reads it', () => {
  it('carries exactly thirty-five FOT rows and the one BOI row', () => {
    expect(SECTION_7.filter((l) => l.startsWith('| `FOT-'))).toHaveLength(35);
    expect(SPEC_ROWS.filter((r) => r.key !== 'boi-note').map((r) => r.key)).toEqual(FOT_KEYS);
    expect(SPEC_ROWS.filter((r) => r.key === 'boi-note')).toHaveLength(1);
    expect(SECTION_7.filter((l) => l.startsWith(`| ${EM_DASH} |`) && l.includes(BOI_MARK))).toHaveLength(1);
  });
});

// ---------------------------------------------------- the generated constant

describe('the generated constant is SPEC §7, byte for byte', () => {
  it('carries the same rows, in spec order, in the same tables', () => {
    expect(FIRM_OBLIGATION_CATALOG_ROWS.map((r) => [r.key, r.section]))
      .toEqual(SPEC_ROWS.map((r) => [r.key, r.section]));
  });

  it('carries every cell of every row byte-equal to the spec cell', () => {
    for (const spec of SPEC_ROWS) {
      const row = FIRM_OBLIGATION_CATALOG_ROWS.find((r) => r.key === spec.key)!;
      expect(Object.keys(row.cells), `${spec.key} columns`).toEqual(spec.headers);
      for (const header of spec.headers) {
        expectByteEqual((row.cells as Record<string, string>)[header], spec.cells[header], `${spec.key} · ${header}`);
      }
    }
  });
});

// ------------------------------------------------------------- the templates

describe('the templates — every string sliced or joined from the spec, never typed', () => {
  it('offers FOT-1 through FOT-35 in order, then the BOI note', () => {
    expect(FIRM_OBLIGATION_TEMPLATES.map((t) => t.key)).toEqual([...FOT_KEYS, 'boi-note']);
    expect(templateByKey('FOT-22')?.key).toBe('FOT-22');
    expect(templateByKey('FOT-36')).toBeUndefined();
  });

  it('carries the four display cells byte-equal to the spec', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const cells = specRow(t.key).cells;
      expectByteEqual(t.templateText, cells.Template, `${t.key} · Template`);
      expectByteEqual(t.kindAnchorText, cells['Kind / anchor'], `${t.key} · Kind / anchor`);
      expectByteEqual(t.leadText, cells.Lead, `${t.key} · Lead`);
      expectByteEqual(t.weightText, cells.Weight, `${t.key} · Weight`);
    }
  });

  it('names each template by the first bold span of its Template cell', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const bold = /\*\*(.+?)\*\*/.exec(specRow(t.key).cells.Template);
      expect(bold, `${t.key} has a bold span`).not.toBeNull();
      expectByteEqual(t.name, bold![1], `${t.key} · name`);
    }
  });

  // The join is the build's (reported): two byte-equal cells around " — ".
  it('composes sourceNote from the byte-equal Source and Status cells; §7.7 from its Status / note cell', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const cells = specRow(t.key).cells;
      if (t.section === '7.7') {
        expectByteEqual(t.sourceNote, cells['Status / note'], `${t.key} · sourceNote`);
      } else {
        expectByteEqual(t.sourceNote, `${cells.Source} ${EM_DASH} ${cells.Status}`, `${t.key} · sourceNote`);
        expect(t.sourceNote.startsWith(cells.Source)).toBe(true);
        expect(t.sourceNote.endsWith(cells.Status)).toBe(true);
      }
    }
  });

  it('carries "Applies if" only where the Conditional on cell says more than "—", and §7.3\'s Note', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const cells = specRow(t.key).cells;
      const cond = cells['Conditional on'];
      if (cond === undefined || cond === EM_DASH) expect(t, t.key).not.toHaveProperty('appliesIf');
      else expectByteEqual(t.appliesIf, cond, `${t.key} · appliesIf`);
      if (cells.Note === undefined) expect(t, t.key).not.toHaveProperty('catalogNote');
      else expectByteEqual(t.catalogNote, cells.Note, `${t.key} · catalogNote`);
    }
    expect(keysWhere((t) => t.catalogNote !== undefined)).toEqual(['FOT-6', 'FOT-7']);
  });
});

// --------------------------------------------------------------- the rulings

describe('the rulings — as literals, and against the spec text', () => {
  it('weekendRule is unknown on EVERY template (slice §2.3; no roll default ships)', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) expect(t.weekendRule, t.key).toBe('unknown');
  });

  it('conditionalPerPeriod is exactly FOM-2\'s eight (SPEC §16 governs)', () => {
    const eight = ['FOT-8', 'FOT-10', 'FOT-11', 'FOT-13', 'FOT-14', 'FOT-15', 'FOT-16', 'FOT-17'];
    expect(keysWhere((t) => t.conditionalPerPeriod)).toEqual(eight);
    const m = /`conditionalPerPeriod` on EIGHT rows \(([^)]*)\)/.exec(SECTION_16_BULLET);
    expect(m, 'the §16 eight-rows clause').not.toBeNull();
    expect(fotKeysIn(m![1])).toEqual(eight);
  });

  it('suggestedAtGoLive is exactly DECISION 9B\'s twelve (SPEC §16) — and activates nothing', () => {
    const twelve = ['FOT-1', 'FOT-2', 'FOT-4', 'FOT-6', 'FOT-8', 'FOT-9', 'FOT-19', 'FOT-22', 'FOT-23', 'FOT-24', 'FOT-25', 'FOT-27'];
    expect(keysWhere((t) => t.suggestedAtGoLive)).toEqual(twelve);
    const m = /go-live activations are (.*?) \(DECISION 9B/.exec(SECTION_16_BULLET);
    expect(m, 'the §16 go-live clause').not.toBeNull();
    expect(fotKeysIn(m![1])).toEqual(twelve);
    // No template carries anything an activation could read as a date.
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      expect(t.templateRule, t.key).not.toHaveProperty('anchorDate');
      expect(t.templateRule, t.key).not.toHaveProperty('dueOn');
    }
  });

  it('ownerScope attorney is exactly §7.1–§7.2, FOT-1 to FOT-5 (DECISION 4)', () => {
    expect(keysWhere((t) => t.ownerScope === 'attorney')).toEqual(['FOT-1', 'FOT-2', 'FOT-3', 'FOT-4', 'FOT-5']);
    expect(SPEC_ROWS.filter((r) => r.section === '7.1' || r.section === '7.2').map((r) => r.key))
      .toEqual(['FOT-1', 'FOT-2', 'FOT-3', 'FOT-4', 'FOT-5']);
    for (const t of FIRM_OBLIGATION_TEMPLATES) expect(['firm', 'attorney']).toContain(t.ownerScope);
  });

  it('createdInactive is exactly the five rows whose own cell says seeded or created inactive', () => {
    const five = ['FOT-7', 'FOT-32', 'FOT-33', 'FOT-34', 'boi-note'];
    expect(keysWhere((t) => t.createdInactive)).toEqual(five);
    const saysSo = SPEC_ROWS
      .filter((r) => Object.values(r.cells).some((c) => /\b(seeded|created) inactive\b/i.test(c)))
      .map((r) => r.key);
    expect([...saysSo].sort()).toEqual([...five].sort());
  });

  it('category follows the table', () => {
    const bySection: Record<string, string> = {
      '7.1': 'licensing', '7.2': 'court-appointments', '7.3': 'practice-rules',
      '7.4': 'tax-entity-and-employment', '7.5': 'tax-entity-and-employment',
      '7.6': 'insurance', '7.7': 'infrastructure',
    };
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      expect(t.section, t.key).toBe(specRow(t.key).section);
      expect(t.category, t.key).toBe(bySection[t.section]);
    }
  });
});

// ------------------------------------------------ the readings of each cell

const KIND_TOKEN = new RegExp('`(' + RULE_KINDS.join('|') + ')`', 'g');
const LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_DATE = new RegExp(`\\b(${LONG.join('|')}) (\\d{1,2})\\b`);
const SHORT_ONE = `(?:${SHORT.join('|')}) \\d{1,2}`;
const SHORT_FOUR = new RegExp(`(${SHORT_ONE}(?: ${MIDDLE_DOT} ${SHORT_ONE}){3})`);

describe('the readings of each Kind / anchor, Lead and Weight cell', () => {
  it('kind is the kind the cell names — FOT-18 names two, the BOI row none', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const named = [...new Set([...specRow(t.key).cells['Kind / anchor'].matchAll(KIND_TOKEN)].map((m) => m[1]))].sort();
      if (t.key === 'boi-note') {
        expect(named).toEqual([]);
        expect(t.kind).toBe('one-time');
        continue;
      }
      const options = t.kindOptions ?? [t.kind];
      expect([...options].sort(), t.key).toEqual(named);
      expect(options[0], t.key).toBe(t.kind);
    }
    expect(keysWhere((t) => t.kindOptions !== undefined)).toEqual(['FOT-18']);
    expect(templateByKey('FOT-18')!.kind).toBe('fixed-quarterly');
    expect(templateByKey('FOT-18')!.kindOptions).toEqual(['fixed-quarterly', 'fixed-annual']);
  });

  it('month precision is exactly the rows whose cell writes `precision: month`', () => {
    expect(keysWhere((t) => t.precision === 'month')).toEqual(['FOT-1', 'FOT-25']);
    expect(SPEC_ROWS.filter((r) => r.cells['Kind / anchor'].includes('`precision: month`')).map((r) => r.key))
      .toEqual(['FOT-1', 'FOT-25']);
    for (const t of FIRM_OBLIGATION_TEMPLATES) expect(['day', 'month']).toContain(t.precision);
  });

  it('templateRule states only what the cell states — dates, intervals and everyYears, never a date to file on', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const cell = specRow(t.key).cells['Kind / anchor'];
      const r = t.templateRule;
      for (const k of Object.keys(r)) expect(['month', 'day', 'dates', 'everyYears', 'days'], `${t.key} · ${k}`).toContain(k);

      const long = LONG_DATE.exec(cell);
      if (t.kind === 'fixed-annual') {
        expect(r.month, `${t.key} month`).toBe(long ? LONG.indexOf(long[1]) + 1 : undefined);
        expect(r.day, `${t.key} day`).toBe(long ? Number(long[2]) : undefined);
      } else {
        expect(r.month, `${t.key} month`).toBeUndefined();
        expect(r.day, `${t.key} day`).toBeUndefined();
      }

      const four = SHORT_FOUR.exec(cell);
      if (t.kind === 'fixed-quarterly') {
        const written = r.dates?.map((d) => `${SHORT[d.month - 1]} ${d.day}`).join(` ${MIDDLE_DOT} `);
        expect(written, `${t.key} dates`).toBe(four ? four[1] : undefined);
      } else {
        expect(r.dates, `${t.key} dates`).toBeUndefined();
      }

      const every = /`everyYears: (\d+)`/.exec(cell);
      expect(r.everyYears, `${t.key} everyYears`).toBe(every ? Number(every[1]) : undefined);

      const days = /\b(\d+) days\b/.exec(cell);
      expect(r.days, `${t.key} days`).toBe(t.kind === 'interval-from-completion' && days ? Number(days[1]) : undefined);
    }
    // The hints the slice's own examples name.
    expect(templateByKey('FOT-4')!.templateRule).toEqual({ month: 10, day: 15 });
    expect(templateByKey('FOT-8')!.templateRule).toEqual({ month: 5, day: 15 });
    expect(templateByKey('FOT-14')!.templateRule).toEqual({
      dates: [{ month: 4, day: 30 }, { month: 7, day: 31 }, { month: 10, day: 31 }, { month: 1, day: 31 }],
    });
    expect(templateByKey('FOT-22')!.templateRule).toEqual({ days: 91 });
    expect(templateByKey('FOT-23')!.templateRule).toEqual({ days: 91 });
    expect(templateByKey('FOT-3')!.templateRule).toEqual({ everyYears: 2 });
    expect(templateByKey('FOT-12')!.templateRule).toEqual({ everyYears: 10 });
    expect(templateByKey('FOT-21')!.templateRule).toEqual({ everyYears: 4 });
  });

  it('missedPeriods is the kind\'s default, and the rows whose cell says `collapse` collapse', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      expect(t.missedPeriods, t.key).toBe(defaultMissedPeriods(t.kind));
      if (specRow(t.key).cells['Kind / anchor'].includes('`collapse`')) expect(t.missedPeriods, t.key).toBe('collapse');
    }
  });

  it('leadDays is the Lead cell\'s "<n> d", null only where the cell is "—"', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const lead = specRow(t.key).cells.Lead;
      const m = /^(\d+) d\b/.exec(lead);
      expect(t.leadDays, t.key).toBe(m ? Number(m[1]) : null);
      if (!m) expect(lead, t.key).toBe(EM_DASH);
    }
    expect(keysWhere((t) => t.leadDays === null)).toEqual(['FOT-7', 'FOT-32', 'FOT-33', 'FOT-34', 'boi-note']);
  });

  it('weight is the Weight cell\'s first hard or routine, null only on the BOI row', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const m = /\b(hard|routine)\b/.exec(specRow(t.key).cells.Weight);
      expect(t.weight, t.key).toBe(m ? m[1] : null);
    }
    expect(keysWhere((t) => t.weight === null)).toEqual(['boi-note']);
  });
});

// ---------------------------------------------------- nothing the slice bars

describe('nothing the slice bars', () => {
  const ALLOWED = new Set([
    'key', 'name', 'section', 'category', 'ownerScope', 'kind', 'kindOptions', 'templateRule',
    'precision', 'missedPeriods', 'conditionalPerPeriod', 'weekendRule', 'leadDays', 'weight',
    'suggestedAtGoLive', 'createdInactive', 'sourceNote', 'appliesIf', 'catalogNote',
    'templateText', 'kindAnchorText', 'leadText', 'weightText',
  ]);
  const OPTIONAL = new Set(['kindOptions', 'appliesIf', 'catalogNote']);

  // DECISION 5 (no money, externalRef, ledgerRef); slice §8 (no roll, no holiday,
  // no snooze or dismiss); DECISIONS 1 and 4 (no assignee, no owner id at solo).
  it('carries no field outside the allow-list — no money, externalRef, ledgerRef, roll or holiday', () => {
    for (const t of FIRM_OBLIGATION_TEMPLATES) {
      const keys = Object.keys(t);
      for (const k of keys) expect(ALLOWED.has(k), `${t.key} carries "${k}"`).toBe(true);
      for (const k of ALLOWED) if (!OPTIONAL.has(k)) expect(keys, `${t.key} lacks "${k}"`).toContain(k);
      for (const k of [...keys, ...Object.keys(t.templateRule)]) {
        expect(k, t.key).not.toMatch(/money|amount|payee|account|external|ledger|quickbooks|roll|holiday|snooze|dismiss|assignee|ownerUser|anchorDate|dueOn/i);
      }
    }
  });
});

// ------------------------------------------------------------- the generator

// The generator's own --check, run as a child process. Node's module is loaded by
// a runtime specifier and typed by hand here because this file compiles under the
// APP tsconfig, whose `types` carry no Node globals — and referencing them for one
// test would put `process` in scope for every browser file in the build.
interface SpawnResult { status: number | null; stdout: string; stderr: string; error?: Error }
type SpawnSync = (command: string, args: string[], options: { cwd: URL; encoding: 'utf8' }) => SpawnResult;

describe('the generator', () => {
  it('reports the generated file up to date (--check exits 0)', async () => {
    const childProcess = 'node:child_process';
    const { spawnSync } = (await import(/* @vite-ignore */ childProcess)) as { spawnSync: SpawnSync };
    const { execPath } = (globalThis as unknown as { process: { execPath: string } }).process;
    const run = spawnSync(execPath, ['scripts/generate-firm-obligation-catalog.mjs', '--check'], {
      cwd: new URL('../../../', import.meta.url),
      encoding: 'utf8',
    });
    expect(run.error).toBeUndefined();
    expect(run.status, `${run.stdout}\n${run.stderr}`).toBe(0);
  }, 30_000);
});
