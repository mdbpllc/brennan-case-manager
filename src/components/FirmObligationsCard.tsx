// The /cases dashboard card for FIRM OBLIGATIONS (docs/specs/firm-obligations-build-slice.md
// §3 item 6; FOS-1 RULED YES 2026-09-10).
//
// A second compact card beside the legal-watch WorklistCard (the O3 precedent), and
// like it, it RENDERS NOTHING when there is nothing to act on. It carries only `hard`
// items (DECISION 6 — routine items never reach it), and a hard item only when it is
// OVERDUE, or when the register has LIT it and its target is within 14 days
// (FOM-13's conjunctive reading) — so it never shows what the register has not lit,
// and never drops an overdue item however long overdue (FO-2).
//
// It draws what the domain's cardSummary decides — the two counts, the first three
// lines, "and N more" — and decides nothing itself, so a lit weekend-dated row under
// `unknown` carries no day count here either (slice §8).
//
// Every string here is PROVISIONAL (FOD-26 for the title and lines; FOD-24 for the
// holiday line); its position below the legal-watch card is FOD-27. Michael rules
// all three at THE FIRM-OBLIGATIONS HANDS-ON SITTING.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../data';
import { localISODate } from '../domain/dates';
import {
  HOLIDAY_LINE, cardItems, cardSummary,
  type FirmObligation, type FirmObligationOccurrence,
} from '../domain/firmObligations';

export default function FirmObligationsCard() {
  const [data, setData] = useState<{ obligations: FirmObligation[]; occurrences: FirmObligationOccurrence[] } | null>(null);

  useEffect(() => {
    (async () => {
      const [obligations, occurrences] = await Promise.all([
        db.listFirmObligations(), db.listFirmObligationOccurrences(),
      ]);
      setData({ obligations, occurrences });
    })().catch(() => setData(null));
  }, []);

  if (!data) return null;
  const today = localISODate();
  const items = cardItems(data.obligations, data.occurrences, today);
  if (items.length === 0) return null;
  const s = cardSummary(items, today);

  return (
    <div className="card" style={{ borderColor: s.overdue ? 'var(--warn, #b45309)' : undefined }}>
      <strong>Firm obligations — {s.due} due · {s.overdue} overdue</strong>{/* PROVISIONAL — FOD-26 */}
      <div className="small" style={{ marginTop: 4 }}>
        {s.lines.map((l) => (
          <div key={l.id} style={l.overdue ? { color: 'var(--warn)' } : undefined}>{l.text}</div>
        ))}
        {s.more > 0
          ? <div><Link to="/firm/obligations">and {s.more} more</Link></div> /* PROVISIONAL — FOD-26 */
          : <div><Link to="/firm/obligations">Open the register</Link></div> /* PROVISIONAL — slice §3 item 6 (a link to the register); FOD-26 */}
      </div>
      <details className="small muted" style={{ marginTop: 4 }}>
        <summary>About these dates</summary>{/* PROVISIONAL — FOD-24 expander */}
        {HOLIDAY_LINE}
      </details>
    </div>
  );
}
