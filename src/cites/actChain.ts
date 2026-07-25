// Source-credit act-chain grammar — design §9 W1, riding in T1.
// Parses the "Added by Acts 2023, 88th Leg., R.S., Ch. 765 (H.B. 4504),
// Sec. 1.001, eff. January 1, 2025." lines that close every statute section,
// including the "Amended by:" header form whose credits are bare "Acts …"
// lines, and the pre-bill-number era ("Acts 1973, 63rd Leg., p. 883, ch. 399").
// The ordered chain IS the amendment history (test #35) — all credits kept.

export interface ActCredit {
  action: 'added' | 'amended' | 'redesignated' | 'repealed';
  year: number;
  leg: number;
  /** 'RS' for regular session, '1CS'/'2CS'… for called sessions. */
  sess: string;
  chapter?: number;
  /** Normalized "HB 4504" / "SB 456"; absent pre-bill-number era. */
  bill?: string;
  sec?: string;
  /** Session-laws page cite (pre-bill-number era). */
  page?: number;
  /** ISO effective date when parseable. */
  eff?: string;
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function effToIso(raw: string): string | undefined {
  const m = raw.match(/([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/);
  if (!m) return undefined;
  const mo = MONTHS[m[1].slice(0, 3).toLowerCase()];
  if (!mo) return undefined;
  return `${m[3]}-${String(mo).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
}

function sessToken(raw: string): string {
  if (/R\.?\s?S\.?/i.test(raw)) return 'RS';
  const cs = raw.match(/(\d+)(?:st|nd|rd|th)\s*C\.?\s?S\.?/i);
  return cs ? `${cs[1]}CS` : raw.trim();
}

/** One credit line body: everything after the "Acts" keyword. */
const CREDIT_BODY = new RegExp(
  'Acts\\s+(\\d{4}),\\s*(\\d+)(?:st|nd|rd|th)\\s+Leg\\.,\\s*' + // year, leg
  '(R\\.?\\s?S\\.?|\\d+(?:st|nd|rd|th)\\s*C\\.?\\s?S\\.?)?,?\\s*' + // session
  '(?:p\\.\\s*(\\d+),\\s*)?' + // page (pre-bill era)
  '[Cc]h\\.\\s*(\\d+)' + // chapter
  '(?:\\s*\\(([HS])\\.?\\s?B\\.?\\s*(\\d+)\\))?' + // (H.B. 4504)
  ',\\s*Sec\\.\\s*([\\d.]+(?:\\([a-z0-9]+\\))*)' + // Sec. 1.001 / 5.028(a)
  '(?:,\\s*eff\\.\\s*([^.]+(?:\\.\\s?\\d+)?[^.]*))?', // eff. January 1, 2025 / Jan. 1, 1974
);

const ACTION_WORDS: Record<string, ActCredit['action']> = {
  added: 'added', amended: 'amended', redesignated: 'redesignated', repealed: 'repealed',
};

/** Parse every source credit in a block of statute text, in order. */
export function parseActCredits(text: string): ActCredit[] {
  const out: ActCredit[] = [];
  let pendingAction: ActCredit['action'] | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // "Amended by:" header — following bare "Acts …" lines carry this action.
    const header = line.match(/^(Added|Amended|Redesignated|Repealed)\s+by:\s*$/i);
    if (header) {
      pendingAction = ACTION_WORDS[header[1].toLowerCase()];
      continue;
    }

    // Inline form: "Added by Acts 2023, …" — or a bare "Acts 2025, …" line
    // under a pending header.
    const inline = line.match(/^(Added|Amended|Redesignated(?:\s+and\s+amended)?|Repealed)\s+by\s+(Acts\s.*)$/i);
    const body = inline ? inline[2] : /^Acts\s/.test(line) ? line : null;
    if (!body) continue;
    // A bare "Acts …" line with no header is the old-style enacting credit
    // (pre-1990s codification prints it with no "Added by" — test #34).
    const action: ActCredit['action'] | null = inline
      ? ACTION_WORDS[inline[1].toLowerCase().split(/\s/)[0]] ?? null
      : pendingAction ?? 'added';
    if (!action) continue;

    const m = body.match(CREDIT_BODY);
    if (!m) continue;
    const credit: ActCredit = {
      action,
      year: Number(m[1]),
      leg: Number(m[2]),
      sess: m[3] ? sessToken(m[3]) : 'RS',
    };
    if (m[4]) credit.page = Number(m[4]);
    credit.chapter = Number(m[5]);
    if (m[6] && m[7]) credit.bill = `${m[6].toUpperCase()}B ${m[7]}`;
    credit.sec = m[8];
    if (m[9]) credit.eff = effToIso(m[9]);
    out.push(credit);
  }
  return out;
}
