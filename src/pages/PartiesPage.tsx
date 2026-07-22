import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { PartyRecord } from '../domain/types';
import { PARTY_TYPES, PARTY_TYPE_MAP } from '../domain/partyRegistry';
import { db } from '../data';

export default function PartiesPage() {
  const [parties, setParties] = useState<PartyRecord[]>([]);
  const [type, setType] = useState('');
  const [q, setQ] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    db.listParties().then(setParties);
  }, []);

  const filtered = parties.filter((p) => {
    if (type && p.partyType !== type) return false;
    if (q && !p.displayName.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Parties</h2>
          <div className="sub">One record per person or entity — linked across every case they touch.</div>
        </div>
        <Link className="btn" to="/parties/new">+ New party</Link>
      </div>

      <div className="filters">
        <input type="text" placeholder="Search name…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All party types</option>
          {PARTY_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
      </div>

      <div className="card">
        <table className="list">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Kind</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="rowlink" onClick={() => nav(`/parties/${p.id}`)}>
                <td><strong>{p.displayName}</strong></td>
                <td>{PARTY_TYPE_MAP[p.partyType]?.label ?? p.partyType}</td>
                <td className="muted">{p.kind}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={3} className="muted">No parties match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
