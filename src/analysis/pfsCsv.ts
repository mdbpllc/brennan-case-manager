// Fee-schedule CSV import (B1-start). Accepts the simple export shape from the
// CMS Physician Fee Schedule Look-Up Tool (or any code,rate CSV): a header row
// naming at least a code column and a rate/price column; description, modifier,
// and setting columns are picked up when present.
//
// Real CMS data gets pulled with Michael in the loop — this module only parses.

import type { FeeScheduleRate } from '../domain/billing';

export interface ParsedRateRow {
  code: string;
  modifier?: string;
  description?: string;
  rate: number;
  setting?: 'inpatient' | 'outpatient';
  sourceLocator: string;
}

export interface CsvParseResult {
  rows: ParsedRateRow[];
  skipped: number;
  errors: string[];
}

function splitCsvLine(line: string): string[] {
  // Minimal quoted-field CSV split — handles "a,b",c without a dependency.
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cur += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      out.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

const CODE_HEADERS = ['code', 'cpt', 'hcpcs', 'hcpcs code', 'procedure code'];
const RATE_HEADERS = ['rate', 'price', 'amount', 'non-facility price', 'nonfacility price', 'payment', 'allowed amount'];
const DESC_HEADERS = ['description', 'short description', 'desc'];
const MOD_HEADERS = ['modifier', 'mod'];
const SETTING_HEADERS = ['setting'];

function findColumn(headers: string[], wanted: string[]): number {
  const lower = headers.map((h) => h.toLowerCase());
  for (const w of wanted) {
    const idx = lower.indexOf(w);
    if (idx !== -1) return idx;
  }
  // fall back to contains-match ("2026 non-facility price")
  for (const w of wanted) {
    const idx = lower.findIndex((h) => h.includes(w));
    if (idx !== -1) return idx;
  }
  return -1;
}

export function parseRateCsv(text: string): CsvParseResult {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length < 2) return { rows: [], skipped: 0, errors: ['File needs a header row plus at least one data row.'] };

  const headers = splitCsvLine(lines[0]);
  const codeIdx = findColumn(headers, CODE_HEADERS);
  const rateIdx = findColumn(headers, RATE_HEADERS);
  if (codeIdx === -1 || rateIdx === -1) {
    return {
      rows: [], skipped: 0,
      errors: [`Couldn't find code and rate columns. Headers seen: ${headers.join(', ')}. Expected something like "code" and "rate"/"price".`],
    };
  }
  const descIdx = findColumn(headers, DESC_HEADERS);
  const modIdx = findColumn(headers, MOD_HEADERS);
  const settingIdx = findColumn(headers, SETTING_HEADERS);

  const rows: ParsedRateRow[] = [];
  let skipped = 0;
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const code = (cells[codeIdx] ?? '').toUpperCase();
    const rateRaw = (cells[rateIdx] ?? '').replace(/[$,\s]/g, '');
    const rate = Number(rateRaw);
    if (!/^[A-Z0-9]{4,5}$/.test(code) || !Number.isFinite(rate) || rate < 0) {
      skipped++;
      if (errors.length < 5) errors.push(`Row ${i + 1} skipped (code "${cells[codeIdx] ?? ''}", rate "${cells[rateIdx] ?? ''}").`);
      continue;
    }
    const settingRaw = settingIdx !== -1 ? cells[settingIdx]?.toLowerCase() : undefined;
    rows.push({
      code,
      modifier: modIdx !== -1 && cells[modIdx] ? cells[modIdx] : undefined,
      description: descIdx !== -1 && cells[descIdx] ? cells[descIdx] : undefined,
      rate,
      setting: settingRaw === 'inpatient' || settingRaw === 'outpatient' ? settingRaw : undefined,
      sourceLocator: `import row ${i + 1}`,
    });
  }
  return { rows, skipped, errors };
}

export function toScheduleRates(scheduleId: string, rows: ParsedRateRow[], makeId: () => string): FeeScheduleRate[] {
  return rows.map((r) => ({
    id: makeId(), scheduleId, code: r.code, modifier: r.modifier, description: r.description,
    rate: r.rate, setting: r.setting, sourceLocator: r.sourceLocator,
  }));
}
