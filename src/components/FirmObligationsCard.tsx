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
// Every string here is PROVISIONAL (FOD-26 for the title and lines; FOD-24 for the
// holiday line); its position below the legal-watch card is FOD-27. Michael rules
// all three at THE FIRM-OBLIGATIONS HANDS-ON SITTING.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../data';
import { localISODate } from '../domain/dates';
import {
  HOLIDAY_LINE, cardCounts, cardItems, cardLine,
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
  const { due, overdue } = cardCounts(items);

  return (
    <div className="card" style={{ borderColor: overdue ? 'var(--warn, #b45309)' : undefined }}>
      <strong>Firm obligations — {due} due · {overdue} overdue</strong>{/* PROVISIONAL — FOD-26 */}
      <div className="small" style={{ marginTop: 4 }}>
        {items.slice(0, 3).map((it) => (
          <div key={it.occurrence.id} style={it.state === 'overdue' ? { color: 'var(--warn)' } : undefined}>
            {cardLine(it, today)}
          </div>
        ))}
        {items.length > 3 && (
          <div><Link to="/firm/obligations">and {items.length - 3} more</Link></div> /* PROVISIONAL — FOD-26 */
        )}
        {items.length <= 3 && (
          <div><Link to="/firm/obligations">Open the register</Link></div> /* PROVISIONAL — FOD-26 */
        )}
      </div>
      <details className="small muted" style={{ marginTop: 4 }}>
        <summary>About these dates</summary>{/* PROVISIONAL — FOD-24 expander */}
        {HOLIDAY_LINE}
      </details>
    </div>
  );
}
