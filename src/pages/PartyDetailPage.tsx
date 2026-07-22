import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { PartyRecord, CasePartyLink, CaseRecord } from '../domain/types';
import { PARTY_TYPE_MAP } from '../domain/partyRegistry';
import { FieldDisplay } from '../components/fieldWidgets';
import { db } from '../data';

export default function PartyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = useState<PartyRecord | null>(null);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [cases, setCases] = useState<Record<string, CaseRecord>>({});
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');

  useEffect(() => {
    if (!id) return;
    db.getParty(id)
      .then((p) => { setParty(p); setLoadState(p ? 'ready' : 'notfound'); })
      .catch(() => setLoadState('error'));
    db.listLinksForParty(id)
      .then(async (ls) => {
        setLinks(ls);
        const cs = await db.getCases(ls.map((l) => l.caseId));
        setCases(Object.fromEntries(cs.map((c) => [c.id, c])));
      })
      .catch(() => setLoadState('error'));
  }, [id]);

  if (loadState === 'notfound') {
    return <div className="notice">Party not found — it may have been removed. <Link to="/parties">Back to parties</Link></div>;
  }
  if (loadState === 'error') {
    return <div className="notice">Couldn't load this party. Check the database connection and refresh.</div>;
  }
  if (!party) return <div className="muted">Loading…</div>;
  const def = PARTY_TYPE_MAP[party.partyType];

  // Only show fields that have values, plus always-show basics
  const populated = def?.fields.filter((f) => {
    const v = party.fields[f.key];
    return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  }) ?? [];
  const empty = def?.fields.filter((f) => !populated.includes(f)) ?? [];

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>{party.displayName}</h2>
          <div className="sub">{def?.label ?? party.partyType} · {party.kind}</div>
        </div>
        <Link className="btn secondary" to={`/parties/${party.id}/edit`}>Edit</Link>
      </div>

      <div className="card">
        <h3>Cross-case history</h3>
        <table className="list">
          <thead>
            <tr><th>File #</th><th>Caption</th><th>Role</th><th>Side</th><th>Status</th></tr>
          </thead>
          <tbody>
            {links.map((l) => {
              const c = cases[l.caseId];
              return (
                <tr key={l.id}>
                  <td>{c ? <Link to={`/cases/${c.id}`}><strong>{c.fileNumber}</strong></Link> : '…'}</td>
                  <td>{c?.caption || c?.caseType || ''}</td>
                  <td><span className="badge role">{l.role}</span></td>
                  <td>{l.side ? <span className={`badge side-${l.side}`}>{l.side}</span> : <span className="muted">—</span>}</td>
                  <td>{c && <span className="badge status">{c.status}</span>}</td>
                </tr>
              );
            })}
            {links.length === 0 && (
              <tr><td colSpan={5} className="muted">Not linked to any case yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Details</h3>
        {populated.length === 0 && <div className="muted small">No details recorded yet.</div>}
        <dl className="kv">
          {populated.map((f) => (
            <div key={f.key} style={{ display: 'contents' }}>
              <dt>{f.label}</dt>
              <dd><FieldDisplay def={f} value={party.fields[f.key]} /></dd>
            </div>
          ))}
        </dl>
        {empty.length > 0 && (
          <details className="muted small" style={{ marginTop: 12 }}>
            <summary style={{ cursor: 'pointer' }}>
              Not yet filled in: {empty.length} field{empty.length === 1 ? '' : 's'}
            </summary>
            <div style={{ marginTop: 6 }}>{empty.map((f) => f.label).join(' · ')}</div>
          </details>
        )}
      </div>
    </div>
  );
}
