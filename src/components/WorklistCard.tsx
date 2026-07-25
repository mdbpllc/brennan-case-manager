// Re-verification worklist card (T4; O3 decided 2026-07-25: surface beyond
// the registry screen). compact = the dashboard card on the Cases landing
// page (renders nothing when there's nothing to do); full = the unified
// worklist block on the Legal Rules screen.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../data';
import { flagKindLabel } from '../domain/statutes';
import { buildWorklist, type Worklist } from '../statutes/worklist';

export default function WorklistCard({ compact = false }: { compact?: boolean }) {
  const [worklist, setWorklist] = useState<Worklist | null>(null);

  useEffect(() => {
    (async () => {
      const [rules, flags] = await Promise.all([db.listLegalRules(), db.listWatchFlags(true)]);
      setWorklist(buildWorklist(rules, flags, new Date().toISOString()));
    })();
  }, []);

  if (!worklist) return null;
  const { due, upcoming, pendingBills } = worklist;
  if (due.length === 0 && upcoming.length === 0 && pendingBills === 0) return null;

  if (compact) {
    return (
      <div className="card" style={{ borderColor: due.length ? 'var(--warn, #b45309)' : undefined }}>
        <strong>Legal watch</strong>
        <div className="small" style={{ marginTop: 4 }}>
          {due.length > 0 && (
            <span>⚠ <Link to="/rules">{due.length} rule{due.length === 1 ? '' : 's'} due for re-verification</Link> · </span>
          )}
          {upcoming.length > 0 && (
            <span><Link to="/rules">{upcoming.length} enacted change{upcoming.length === 1 ? '' : 's'} taking effect later</Link> · </span>
          )}
          {pendingBills > 0 && (
            <span><Link to="/bills">{pendingBills} pending bill{pendingBills === 1 ? '' : 's'} watched</Link></span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ borderColor: due.length ? 'var(--warn, #b45309)' : undefined }}>
      <strong>Re-verification worklist</strong>
      <div className="small muted">
        Statute text moved (or an enacted change took effect) under these rules. Advisory only — your re-sign-off
        is what resolves each item.
      </div>
      {due.length > 0 && (
        <table className="list" style={{ marginTop: 6 }}>
          <thead><tr><th>Due now</th><th>Why</th></tr></thead>
          <tbody>
            {due.map((item) => (
              <tr key={item.rule.id}>
                <td><strong>{item.rule.ruleKey}</strong></td>
                <td className="small">
                  {item.flags.map((f) => (
                    <div key={f.id}>{flagKindLabel(f.kind)}: {f.sourceRef}{f.detail ? ` — ${f.detail}` : ''}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {upcoming.length > 0 && (
        <div className="small" style={{ marginTop: 6 }}>
          <strong>Upcoming:</strong>{' '}
          {upcoming.map((item) => (
            <span key={item.rule.id}>
              {item.rule.ruleKey} ({item.flags.map((f) => f.effectiveDate ? `effective ${f.effectiveDate}` : 'effective date TBD').join(', ')}){' '}
            </span>
          ))}
        </div>
      )}
      {pendingBills > 0 && (
        <div className="small muted" style={{ marginTop: 6 }}>
          Also watching {pendingBills} pending bill{pendingBills === 1 ? '' : 's'} — see <Link to="/bills">Bill tracking</Link>.
        </div>
      )}
    </div>
  );
}
