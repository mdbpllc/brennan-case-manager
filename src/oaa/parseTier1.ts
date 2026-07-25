// Tier 1 OAA parser — the standard Texas appointment form family
// (Uvalde / Real digital; Medina prints the same form, spec §1a).
// Label-anchored line parsing: every field is pulled by its printed label, so
// the parser tolerates the layout flattening PDF text extraction produces.
// Tuned 2026-07-25 against a real (scanned) Medina County order: the real form
// uses two-column label rows WITHOUT colons ("Cell Phone  210-…"), a boxed
// "STATE OF TEXAS & <court>" header, an "Appointed Attorney" block with
// Name/Phone/Fax rows, a "Court Appointed Designee  Date  Time" table, and a
// cause column that can read "NOT FILED" (pre-filing appointment).
// The real document stays OUT of the repo; the committed fixture is a
// fictionalized replica of its layout.

import type { ExtractedCharge, ExtractedField, OaaExtraction } from '../domain/oaa';

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7,
  august: 8, september: 9, october: 10, november: 11, december: 12,
};

/** "08/14/2026", "8-14-26", "August 14, 2026" → "2026-08-14" (null if unparseable). */
export function toIsoDate(raw: string): string | null {
  const s = raw.trim();
  // Separators seen on real orders: slashes, dashes, and dots ("07.08.2026").
  let m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/);
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
  return { value: value.trim(), confidence, provenance: `line ${lineIdx + 1}: "${snippet.trim()}"` };
}

/** Value of a labeled row. Two printed styles are accepted:
 *  `LABEL: value` (colon) and `LABEL  value` (two-column, 2+ spaces).
 *  Returns null when the line isn't this label; '' when the label is present
 *  but its value is blank (blank Phone/Fax rows are normal on the form). */
function valueOnLine(line: string, label: RegExp): string | null {
  let m = line.match(new RegExp(`^\\s*(?:${label.source})\\s*(?:[:#]\\s*|\\s{2,}|$)(.*)$`, 'i'));
  // Colon-style pairs can share a line ("PHONE: …   FAX: …") — a mid-line
  // label counts only with an explicit colon, to avoid false hits.
  if (!m) m = line.match(new RegExp(`(?:^|\\s)(?:${label.source})\\s*[:#]\\s*(.*)$`, 'i'));
  // OCR text can separate label and value with a SINGLE space
  // ("Name SHANE PARKER ELLIS") — accepted last, with a word boundary.
  if (!m) m = line.match(new RegExp(`^\\s*(?:${label.source})\\b (.*)$`, 'i'));
  if (!m) return null;
  // Keep only the first column of the value: on the printed form a right-hand
  // column can share the row ("Cell Phone  210-…  Indigency Status:"), and
  // column boundaries survive extraction as runs of 2+ spaces.
  return (m[1] ?? '').trim().split(/\s{2,}/)[0].trim();
}

/** First line in range carrying the label WITH a non-blank value.
 *  (The real form lists a blank "Phone" row above a filled "Cell Phone" row —
 *  stopping at the first label hit would lose the number.) */
function labeled(
  lines: string[], label: RegExp, opts?: { after?: number; before?: number },
): ExtractedField | undefined {
  const start = opts?.after ?? 0;
  const end = Math.min(opts?.before ?? lines.length, lines.length);
  for (let i = start; i < end; i++) {
    const v = valueOnLine(lines[i], label);
    if (v) return field(v, i, lines[i]);
  }
  return undefined;
}

const CHECKED = /\[\s*[Xx✓]\s*\]|[☑☒✗]|(?:^|\s)(?:X|YES)(?:\s|$)/;
/** A cell that is only checkbox furniture ("[ ]", "[X]", "☐ ☐", "X") — used
 *  to keep checkbox marks from being read as cause/complaint numbers. */
const CHECKBOX_CELL = /^[[\]☐☑☒✓✗Xx\s]+$/;
/** Cause column values that mean "no cause number yet" (pre-filing appointment). */
const NO_CAUSE = /NOT\s*FILED|NONE|N\/?A|PENDING/i;

function checkboxChecked(cell: string | undefined): boolean {
  return cell !== undefined && CHECKED.test(cell);
}

const DATE_START = /^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/;
const CAUSE_LIKE = /^[A-Z0-9][A-Z0-9-]*\d[A-Z0-9-]*$/i;

const COURT_CELL = /COURT|DISTRICT|COUNTY|CCL/i;

/** Append a wrapped-row tail cell to its column's base value. A base ending
 *  in "-" means the identifier wrapped mid-token ("2026-05-17658-" + "CR"),
 *  so those join without a space. */
function joinWrapped(base: string | undefined, tail: string): string {
  if (!base) return tail;
  return base.endsWith('-') ? base + tail : `${base} ${tail}`;
}

/** Parse the offense table between its header and the defendant block.
 *  Prefers positional mapping from the header's column order; falls back to
 *  per-cell heuristics (marked low confidence) when a row doesn't line up.
 *  Real orders wrap long rows onto a continuation line whose cells carry the
 *  tails of the offense/court/cause/complaint columns — those are merged. */
function parseOffenseRows(lines: string[], headerIdx: number, endIdx: number): ExtractedCharge[] {
  const headerCells = lines[headerIdx].split(/\s{2,}/).map((c) => c.trim().toUpperCase());
  const col = (name: RegExp) => headerCells.findIndex((c) => name.test(c));
  const cols = {
    date: col(/^DATE/), offense: col(/OFFENSE/), court: col(/COURT/),
    cause: col(/CAUSE/), complaint: col(/COMPLAINT/), mtr: col(/MTR|MTA/), appeal: col(/APPEAL/),
  };
  // Positional mapping needs a genuinely columned header; single-space OCR
  // headers collapse to one or two cells and must use the heuristic path.
  const positionalOk = headerCells.length >= 5 && cols.offense >= 0 && cols.cause >= 0
    && cols.offense !== cols.cause;

  // Group data rows (start with a date) with their continuation lines.
  interface RowGroup { main: string; mainIdx: number; tails: string[][] }
  const groups: RowGroup[] = [];
  for (let i = headerIdx + 1; i < endIdx; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (DATE_START.test(line)) {
      groups.push({ main: line, mainIdx: i, tails: [] });
    } else if (groups.length > 0) {
      const cells = line.split(/\s{2,}/).map((c) => c.trim()).filter(Boolean);
      if (cells.length) groups[groups.length - 1].tails.push(cells);
    }
    // Non-date lines before the first data row (a wrapped header word like
    // "MTA") are ignored.
  }

  const charges: ExtractedCharge[] = [];
  for (const g of groups) {
    const cells = g.main.split(/\s{2,}/).map((c) => c.trim());
    let charge: ExtractedCharge;

    if (positionalOk && cells.length >= 4) {
      const cell = (idx: number) => (idx >= 0 && idx < cells.length ? cells[idx] : undefined);
      let mtr = checkboxChecked(cell(cols.mtr));
      let cause = cell(cols.cause);
      let complaint = cell(cols.complaint);
      // Guard: with blank middle columns, a checkbox mark can slide into the
      // cause/complaint slot — reinterpret rather than store "[X]" as a number.
      if (cause && CHECKBOX_CELL.test(cause)) { mtr = mtr || CHECKED.test(cause); cause = undefined; }
      if (complaint && CHECKBOX_CELL.test(complaint)) { mtr = mtr || CHECKED.test(complaint); complaint = undefined; }
      charge = {
        offense: cell(cols.offense) ?? '',
        offenseDate: toIsoDate(cell(cols.date) ?? '') ?? undefined,
        court: cell(cols.court),
        causeNumber: cause,
        complaintNumber: complaint,
        mtrMta: mtr,
        appeal: checkboxChecked(cell(cols.appeal)),
        confidence: cells.length >= headerCells.length - 1 ? 'high' : 'low',
        provenance: `line ${g.mainIdx + 1}: "${g.main}"`,
      };
    } else {
      // Heuristic path: the date may be fused to the offense text
      // ("11/14/25 POSS CS PG 1/1-B >=1G<4G" in one cell). Identify the court
      // cell by its wording and the cause/complaint cells by shape.
      const dateMatch = cells[0].match(/^(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})\s*(.*)$/);
      const offenseSeed = dateMatch?.[2] ?? '';
      const rest = cells.slice(1);
      const courtCell = rest.find((c) => COURT_CELL.test(c) && !CAUSE_LIKE.test(c));
      const idCells = rest.filter((c) => c !== courtCell && CAUSE_LIKE.test(c) && /\d{3,}/.test(c));
      const extraOffense = rest.filter((c) =>
        c !== courtCell && !idCells.includes(c) && !CHECKBOX_CELL.test(c));
      charge = {
        offense: [offenseSeed, ...extraOffense].filter(Boolean).join(' '),
        offenseDate: dateMatch ? toIsoDate(dateMatch[1]) ?? undefined : undefined,
        court: courtCell,
        causeNumber: idCells[0],
        complaintNumber: idCells[1],
        mtrMta: CHECKED.test(rest.filter((c) => CHECKBOX_CELL.test(c)).join('  ')),
        appeal: false,
        confidence: 'low',
        provenance: `line ${g.mainIdx + 1}: "${g.main}"`,
      };
    }

    // Merge continuation-line cells: they carry the wrapped tails of the
    // offense / court / cause / complaint columns, in that order.
    for (const tail of g.tails) {
      const slots: (keyof Pick<ExtractedCharge, 'offense' | 'court' | 'causeNumber' | 'complaintNumber'>)[] =
        ['offense', 'court', 'causeNumber', 'complaintNumber'];
      tail.slice(0, slots.length).forEach((cellVal, k) => {
        if (CHECKBOX_CELL.test(cellVal)) return;
        charge[slots[k]] = joinWrapped(charge[slots[k]], cellVal);
      });
      charge.confidence = 'low'; // wrapped rows always get a review glance
    }

    // Degree rides at the end of the (possibly merged) offense text: "… (F3)".
    const degreeMatch = charge.offense.match(/\(([A-Z0-9]{1,4})\)\s*$/);
    if (degreeMatch) {
      charge.degree = degreeMatch[1];
      charge.offense = charge.offense.slice(0, degreeMatch.index).trim();
    }
    if (charge.causeNumber && NO_CAUSE.test(charge.causeNumber)) charge.causeNumber = undefined;

    if (charge.offense || charge.causeNumber) charges.push(charge);
  }
  return charges;
}

/** Left cell of a boxed-header line: "STATE OF TEXAS  &  CCL Courthouse" → both sides. */
function boxCells(line: string): string[] {
  return line.split(/\s+&\s+|\s{2,}/).map((c) => c.trim()).filter(Boolean);
}

/** Parse a Tier 1 (standard-form) OAA from extracted text. */
export function parseTier1(text: string, templateKey: string): OaaExtraction {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+$/, ''));
  const upper = lines.map((l) => l.toUpperCase());
  const out: OaaExtraction = { templateKey, tier: 1, charges: [] };

  // Section anchors first — they bound every block search below.
  const offenseHeaderIdx = upper.findIndex((l) => /OFFENSE/.test(l) && /CAUSE/.test(l));
  const defBlockIdx = upper.findIndex((l) => /DEFENDANT\s+INFORMATION|^\s*DEFENDANT\b/.test(l));
  const attyIdx = upper.findIndex((l) => /APPOINTED\s+ATTORNEY/.test(l));

  // ---- Case header ----
  // Style A (one line): "THE STATE OF TEXAS VS. DANIEL R. OKAFOR"
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/THE STATE OF TEXAS\s+(?:VS?\.?|V\.)\s+(.+)/i);
    if (m) {
      const name = m[1].replace(/\s+IN THE .*$/i, '').replace(/[,;]\s*$/, '');
      out.defendantName = field(name, i, lines[i]);
      break;
    }
  }
  // Style B (boxed): "STATE OF TEXAS  &  CCL Courthouse" / "VS  &  OF" /
  // "<DEFENDANT>  &  <County> County, TEXAS"
  if (!out.defendantName) {
    const stIdx = upper.findIndex((l) => /^\s*(?:THE\s+)?STATE OF TEXAS\b/.test(l));
    if (stIdx >= 0) {
      const stCells = boxCells(lines[stIdx]);
      if (stCells.length > 1 && !out.court) out.court = field(stCells[1], stIdx, lines[stIdx]);
      for (let i = stIdx + 1; i < Math.min(stIdx + 5, lines.length); i++) {
        if (/^\s*VS?\.?\b/i.test(lines[i])) {
          for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
            const cells = boxCells(lines[j]);
            if (cells.length && !/^(OF|&)$/i.test(cells[0])) {
              out.defendantName = field(cells[0], j, lines[j]);
              break;
            }
          }
          break;
        }
      }
    }
  }
  // Fallback: the defendant block's own "Name" row.
  if (!out.defendantName && defBlockIdx >= 0) {
    const named = labeled(lines, /NAME/, { after: defBlockIdx + 1, before: attyIdx > defBlockIdx ? attyIdx : undefined });
    if (named) out.defendantName = named;
  }

  // ---- Court + county ----
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/IN THE\s+(.+?COURT[^,]*)/i);
    if (m && !out.court) out.court = field(m[1].replace(/,\s*$/, ''), i, lines[i]);
    const cm = lines[i].match(/([A-Z][A-Za-z ]+?)\s+COUNTY\s*,?\s*TEXAS/i);
    if (cm && !out.county) out.county = field(cm[1], i, lines[i]);
    if (out.court && out.county) break;
  }
  // Last resort for court: the offense table's court column.
  if (!out.court && offenseHeaderIdx >= 0 && out.charges.length === 0) {
    // (charges parsed below — court fallback resolved after parsing)
  }

  // ---- Offense table ----
  if (offenseHeaderIdx >= 0) {
    const end = defBlockIdx > offenseHeaderIdx ? defBlockIdx : lines.length;
    out.charges = parseOffenseRows(lines, offenseHeaderIdx, end);
  }
  if (!out.court && out.charges[0]?.court) {
    out.court = { value: out.charges[0].court, confidence: 'low', provenance: out.charges[0].provenance };
  }

  // ---- Defendant block (labels; bounded by the attorney block so the
  // defendant's blank Phone row never grabs the attorney's number) ----
  const defStart = defBlockIdx >= 0 ? defBlockIdx : 0;
  const defEnd = attyIdx > defStart ? attyIdx : lines.length;
  const defOpts = { after: defStart, before: defEnd };
  out.localId = labeled(lines, /LOCAL\s*ID/, defOpts);
  const dobRaw = labeled(lines, /DOB|DATE\s+OF\s+BIRTH/, defOpts);
  if (dobRaw) {
    const iso = toIsoDate(dobRaw.value);
    out.dob = iso ? { ...dobRaw, value: iso } : { ...dobRaw, confidence: 'low' };
  }
  const phoneRaw = labeled(lines, /CELL\s*(?:PHONE)?|PHONE/, defOpts);
  if (phoneRaw) {
    // Single-space rows can carry right-column bleed — keep just the number.
    const num = phoneRaw.value.match(/[\d(][\d()\-. ]{6,}\d/);
    out.phone = num ? { ...phoneRaw, value: num[0].trim() } : { ...phoneRaw, confidence: 'low' };
  }
  const addressRaw = labeled(lines, /ADDRESS/, defOpts);
  if (addressRaw) {
    // The Indigency Status value ("Full"/"Partial"/"None") from the right
    // column can bleed onto the address row — strip a trailing one.
    out.address = { ...addressRaw, value: addressRaw.value.replace(/\s+(Full|Partial|None)\s*$/i, '') };
  }
  out.cityStateZip = labeled(lines, /CITY\s*[/,]?\s*STATE\s*[/,]?\s*ZIP/, defOpts);
  out.custodyLocation = labeled(lines, /CUSTODY\s+LOCATION/, defOpts);
  out.indigencyStatus = labeled(lines, /INDIGEN\w*\s*(?:STATUS)?/, { after: defStart });

  // ---- Appointed-attorney block ----
  if (attyIdx >= 0) {
    // Style A: "APPOINTED ATTORNEY: MICHAEL BRENNAN" on one line.
    const inline = valueOnLine(lines[attyIdx], /APPOINTED\s+ATTORNEY/);
    if (inline) {
      out.attorneyName = field(inline, attyIdx, lines[attyIdx]);
    } else {
      // Style B: "Appointed Attorney" heading, then Name / Phone / Fax rows.
      out.attorneyName = labeled(lines, /NAME/, { after: attyIdx + 1, before: attyIdx + 9 });
    }
    out.attorneyPhone = labeled(lines, /(?:CELL\s+)?PHONE/, { after: attyIdx + 1, before: attyIdx + 9 });
    out.attorneyFax = labeled(lines, /FAX/, { after: attyIdx });
  }

  // ---- Scope paragraph → note only (spec: no field extraction). The
  // paragraph wraps across printed lines, so capture the whole blank-line-
  // bounded block around the first matching line. ----
  const scopeIdx = lines.findIndex((l) => /motion for new|notice of appeal|appointed to represent/i.test(l));
  if (scopeIdx >= 0) {
    let start = scopeIdx;
    while (start > 0 && lines[start - 1].trim()) start--;
    let end = scopeIdx;
    while (end + 1 < lines.length && lines[end + 1].trim()) end++;
    const para = lines.slice(start, end + 1).map((l) => l.trim()).join(' ');
    out.scopeNote = field(para.length > 400 ? `${para.slice(0, 397)}…` : para, scopeIdx, lines[scopeIdx]);
  }

  // ---- Remarks: docket availability, docket settings, custody remarks ----
  const remarks = labeled(lines, /REMARKS?/);
  if (remarks) out.remarks = remarks;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/AVAILABLE\s+FOR\s+DOCKET\s+ON\s+([A-Za-z0-9/,. -]+)/i);
    if (m) {
      const iso = toIsoDate(m[1]);
      out.docketAvailability = iso ? field(iso, i, lines[i]) : field(m[1], i, lines[i], 'low');
      break;
    }
  }
  // Free-text "DOCKET SETTING 07.08.2026 --XFERRED FR. …" line (real Uvalde
  // order): an actual setting, plus transfer/custody notes worth keeping.
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/DOCKET\s+SETTING\s+(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})/i);
    if (m) {
      const iso = toIsoDate(m[1]);
      if (iso) out.docketSetting = field(iso, i, lines[i]);
      if (!out.remarks) {
        // The whole line (with its wrap) is remark material.
        const next = lines[i + 1]?.trim();
        const wrapped = next && !/COURT\s+APPOINTED\s+DESIGNEE/i.test(next) ? ` ${next}` : '';
        out.remarks = field(lines[i].trim() + wrapped, i, lines[i]);
      }
      break;
    }
  }

  // ---- Designee footer ----
  // Style A: "APPOINTMENT MADE BY DESIGNEE: LINDA SAENZ" + "DATE OF APPOINTMENT: …"
  out.appointmentDesignee = labeled(lines, /(?:APPOINTMENT\s+)?(?:MADE\s+BY\s+)?DESIGNEE/);
  const appt = labeled(lines, /DATE\s+OF\s+APPOINTMENT/);
  if (appt) {
    const iso = toIsoDate(appt.value);
    const time = toLocalTime(appt.value);
    out.appointmentDate = iso ? { ...appt, value: time ? `${iso}T${time}` : iso } : { ...appt, confidence: 'low' };
  }
  // Style B: "Court Appointed Designee  Date  Time" header row, values beneath
  // (possibly on the next page — a page break inserts a blank line). The row
  // may be single-spaced ("Michelle Camacho 7/9/2026 3:59 PM"), so the date
  // and time are found by pattern anywhere in the row, name = what precedes.
  if (!out.appointmentDate) {
    const hdr = upper.findIndex((l) => /COURT\s+APPOINTED\s+DESIGNEE/.test(l) && /DATE/.test(l));
    if (hdr >= 0) {
      for (let i = hdr + 1; i < Math.min(hdr + 5, lines.length); i++) {
        const row = lines[i].trim();
        if (!row) continue;
        const dm = row.match(/(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})/);
        if (!dm) continue;
        const iso = toIsoDate(dm[1]);
        if (!iso) continue;
        const time = toLocalTime(row.slice(dm.index! + dm[1].length));
        out.appointmentDate = field(time ? `${iso}T${time}` : iso, i, lines[i]);
        const name = row.slice(0, dm.index!).trim();
        if (name && !out.appointmentDesignee) out.appointmentDesignee = field(name, i, lines[i]);
        break;
      }
    }
  }

  return out;
}
