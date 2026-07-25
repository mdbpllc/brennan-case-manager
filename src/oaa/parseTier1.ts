// Tier 1 OAA parser — the Uvalde/Real digital appointment form (spec §1a).
// Label-anchored line parsing: every field is pulled by its printed label, so
// the parser tolerates the layout flattening PDF text extraction produces.
// IMPORTANT: built against the spec's field map and a fictional fixture — the
// real sample OAAs stay out of the repo. Tune against a real Uvalde order in
// a session with Michael before relying on it (noted in session log).

import type { ExtractedCharge, ExtractedField, OaaExtraction } from '../domain/oaa';

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7,
  august: 8, september: 9, october: 10, november: 11, december: 12,
};

/** "08/14/2026", "8-14-26", "August 14, 2026" → "2026-08-14" (null if unparseable). */
export function toIsoDate(raw: string): string | null {
  const s = raw.trim();
  let m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);
  if (m) {
    const [, mo, d, yRaw] = m;
    const y = yRaw.length === 2 ? Number(yRaw) + 2000 : Number(yRaw);
    if (Number(mo) < 1 || Number(mo) > 12 || Number(d) < 1 || Number(d) > 31) return null;
    return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  m = s.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/);
  if (m) {
    const mo = MONTHS[m[1].toLowerCase()];
    if (!mo) return null;
    return `${m[3]}-${String(mo).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
  }
  return null;
}

/** "9:05 AM" → "09:05" (24h), null if absent/unparseable. */
export function toLocalTime(raw: string): string | null {
  const m = raw.match(/(\d{1,2}):(\d{2})\s*([AaPp])\.?[Mm]?/);
  if (!m) return null;
  let h = Number(m[1]);
  const isPm = m[3].toLowerCase() === 'p';
  if (isPm && h < 12) h += 12;
  if (!isPm && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

function field(value: string, lineIdx: number, line: string, confidence: 'high' | 'low' = 'high'): ExtractedField {
  const snippet = line.length > 90 ? `${line.slice(0, 87)}…` : line;
  return { value: value.trim(), confidence, provenance: `line ${lineIdx + 1}: "${snippet}"` };
}

/** A labeled value on its own line: `LABEL: value`. Returns undefined when the
 *  label is missing or its value is blank (blank phone lines are normal). */
function labeled(lines: string[], labelRe: RegExp, opts?: { after?: number; before?: number }): ExtractedField | undefined {
  const start = opts?.after ?? 0;
  const end = opts?.before ?? lines.length;
  for (let i = start; i < end; i++) {
    const m = lines[i].match(labelRe);
    if (m) {
      const value = (m[1] ?? '').trim();
      if (value) return field(value, i, lines[i]);
      return undefined;
    }
  }
  return undefined;
}

const CHECKED = /\[\s*[Xx✓]\s*\]|(?:^|\s)(?:X|YES)(?:\s|$)/;

/** True/false for a checkbox cell; anything unreadable counts as unchecked
 *  (the review screen shows the raw row either way). */
function checkboxChecked(cell: string | undefined): boolean {
  return cell !== undefined && CHECKED.test(cell);
}

const DATE_START = /^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/;
const CAUSE_LIKE = /^[A-Z0-9][A-Z0-9-]*\d[A-Z0-9-]*$/i;

/** Parse the offense table between its header and the defendant block.
 *  Prefers positional mapping from the header's column order; falls back to
 *  per-cell heuristics (marked low confidence) when a row doesn't line up. */
function parseOffenseRows(lines: string[], headerIdx: number, endIdx: number): ExtractedCharge[] {
  const headerCells = lines[headerIdx].split(/\s{2,}/).map((c) => c.trim().toUpperCase());
  const col = (name: RegExp) => headerCells.findIndex((c) => name.test(c));
  const cols = {
    date: col(/^DATE/), offense: col(/OFFENSE/), court: col(/COURT/),
    cause: col(/CAUSE/), complaint: col(/COMPLAINT/), mtr: col(/MTR|MTA/), appeal: col(/APPEAL/),
  };

  const charges: ExtractedCharge[] = [];
  for (let i = headerIdx + 1; i < endIdx; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (!DATE_START.test(line.trim())) continue; // rows start with the offense date
    const cells = line.trim().split(/\s{2,}/).map((c) => c.trim());

    const positional = cols.offense >= 0 && cols.cause >= 0 && cells.length >= headerCells.length - 1;
    let charge: ExtractedCharge;
    if (positional) {
      const cell = (idx: number) => (idx >= 0 && idx < cells.length ? cells[idx] : undefined);
      const offenseRaw = cell(cols.offense) ?? '';
      const degreeMatch = offenseRaw.match(/\(([A-Z0-9]{1,4})\)\s*$/);
      charge = {
        offense: degreeMatch ? offenseRaw.slice(0, degreeMatch.index).trim() : offenseRaw,
        degree: degreeMatch?.[1],
        offenseDate: toIsoDate(cell(cols.date) ?? '') ?? undefined,
        court: cell(cols.court),
        causeNumber: cell(cols.cause),
        complaintNumber: cell(cols.complaint),
        mtrMta: checkboxChecked(cell(cols.mtr)),
        appeal: checkboxChecked(cell(cols.appeal)),
        confidence: 'high',
        provenance: `line ${i + 1}: "${line.trim()}"`,
      };
    } else {
      // Heuristic fallback: date first, cause = first dash-y token after the
      // offense text, checkboxes at the tail. Low confidence → review flags it.
      const dateCell = cells[0];
      const causeIdx = cells.findIndex((c, idx) => idx > 0 && CAUSE_LIKE.test(c) && /\d{3,}/.test(c));
      const offenseRaw = cells.slice(1, causeIdx > 0 ? causeIdx : undefined).join(' ');
      const degreeMatch = offenseRaw.match(/\(([A-Z0-9]{1,4})\)\s*$/);
      charge = {
        offense: degreeMatch ? offenseRaw.slice(0, degreeMatch.index).trim() : offenseRaw,
        degree: degreeMatch?.[1],
        offenseDate: toIsoDate(dateCell) ?? undefined,
        causeNumber: causeIdx > 0 ? cells[causeIdx] : undefined,
        mtrMta: CHECKED.test(cells.slice(causeIdx + 1).join('  ')),
        appeal: false,
        confidence: 'low',
        provenance: `line ${i + 1}: "${line.trim()}"`,
      };
    }
    if (charge.offense || charge.causeNumber) charges.push(charge);
  }
  return charges;
}

/** Parse a Tier 1 (Uvalde/Real-style) OAA from extracted text. */
export function parseTier1(text: string, templateKey: string): OaaExtraction {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+$/, ''));
  const upper = lines.map((l) => l.toUpperCase());
  const out: OaaExtraction = { templateKey, tier: 1, charges: [] };

  // Case header: "THE STATE OF TEXAS VS. <DEFENDANT>"
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/THE STATE OF TEXAS\s+(?:VS?\.?|V\.)\s+(.+)/i);
    if (m) {
      // Strip a trailing "IN THE …" clause if the header ran together on one line.
      const name = m[1].replace(/\s+IN THE .*$/i, '').replace(/[,;]\s*$/, '');
      out.defendantName = field(name, i, lines[i]);
      break;
    }
  }

  // Court + county: "IN THE 38TH JUDICIAL DISTRICT COURT, UVALDE COUNTY, TEXAS"
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/IN THE\s+(.+?COURT[^,]*)/i);
    if (m && !out.court) out.court = field(m[1].replace(/,\s*$/, ''), i, lines[i]);
    const cm = lines[i].match(/([A-Z][A-Za-z ]+?)\s+COUNTY\s*,?\s*TEXAS/i);
    if (cm && !out.county) out.county = field(cm[1], i, lines[i]);
    if (out.court && out.county) break;
  }

  // Offense table
  const headerIdx = upper.findIndex((l) => /OFFENSE/.test(l) && /CAUSE/.test(l));
  const defBlockIdx = upper.findIndex((l) => /DEFENDANT\s+INFORMATION|^DEFENDANT\b/.test(l));
  if (headerIdx >= 0) {
    out.charges = parseOffenseRows(lines, headerIdx, defBlockIdx > headerIdx ? defBlockIdx : lines.length);
  }

  // Defendant block (labels). Bounded below by the attorney block so the
  // defendant's blank PHONE line never grabs the attorney's number.
  const attyIdx = upper.findIndex((l) => /APPOINTED\s+ATTORNEY/.test(l));
  const defEnd = attyIdx > 0 ? attyIdx : lines.length;
  out.localId = labeled(lines, /LOCAL\s*ID\s*[:#]\s*(.*)/i, { before: defEnd });
  const dobRaw = labeled(lines, /(?:DOB|DATE OF BIRTH)\s*[:#]\s*(.*)/i, { before: defEnd });
  if (dobRaw) {
    const iso = toIsoDate(dobRaw.value);
    out.dob = iso ? { ...dobRaw, value: iso } : { ...dobRaw, confidence: 'low' };
  }
  out.phone = labeled(lines, /^\s*(?:PHONE|CELL)\s*[:#]\s*(.*)/i, { before: defEnd });
  out.address = labeled(lines, /^\s*ADDRESS\s*[:#]\s*(.*)/i, { before: defEnd });
  out.cityStateZip = labeled(lines, /CITY\/?STATE\/?ZIP\s*[:#]\s*(.*)/i, { before: defEnd });
  out.custodyLocation = labeled(lines, /CUSTODY\s+LOCATION\s*[:#]\s*(.*)/i, { before: defEnd });
  out.indigencyStatus = labeled(lines, /INDIGEN\w*\s*(?:STATUS)?\s*[:#]\s*(.*)/i, { before: defEnd });

  // Appointed-attorney block
  if (attyIdx >= 0) {
    const m = lines[attyIdx].match(/APPOINTED\s+ATTORNEY\s*[:#]\s*(.*)/i);
    if (m?.[1]?.trim()) out.attorneyName = field(m[1], attyIdx, lines[attyIdx]);
    out.attorneyPhone = labeled(lines, /^\s*PHONE\s*[:#]\s*(.*?)(?:\s{2,}|$)/i, { after: attyIdx + 1 });
    out.attorneyFax = labeled(lines, /FAX\s*[:#]\s*(.*)/i, { after: attyIdx });
  }

  // Scope paragraph → note only (spec: no field extraction)
  for (let i = 0; i < lines.length; i++) {
    if (/motion for new trial/i.test(lines[i]) || /notice of appeal/i.test(lines[i])) {
      out.scopeNote = field(lines[i].trim(), i, lines[i]);
      break;
    }
  }

  // Remarks: docket availability + custody remarks
  const remarks = labeled(lines, /^\s*REMARKS?\s*[:#]\s*(.*)/i);
  if (remarks) out.remarks = remarks;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/AVAILABLE\s+FOR\s+DOCKET\s+ON\s+([A-Za-z0-9/,. -]+)/i);
    if (m) {
      const iso = toIsoDate(m[1]);
      out.docketAvailability = iso
        ? field(iso, i, lines[i])
        : field(m[1], i, lines[i], 'low');
      break;
    }
  }

  // Designee footer
  out.appointmentDesignee = labeled(lines, /DESIGNEE\s*[:#]\s*(.*)/i);
  const appt = labeled(lines, /DATE\s+OF\s+APPOINTMENT\s*[:#]\s*(.*)/i);
  if (appt) {
    const iso = toIsoDate(appt.value);
    const time = toLocalTime(appt.value);
    out.appointmentDate = iso
      ? { ...appt, value: time ? `${iso}T${time}` : iso }
      : { ...appt, confidence: 'low' };
  }

  return out;
}
