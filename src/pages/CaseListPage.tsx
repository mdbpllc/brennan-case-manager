import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CaseRecord, PracticeArea } from '../domain/types';
import { CASE_TYPES } from '../domain/caseTypes';
import { db } from '../data';

const AREA_BADGE: Record<PracticeArea, string> = {
  'Personal Injury': 'pi',
  'General Civil Litigation': 'civil',
  Criminal: 'criminal',
};

export default function CaseListPage() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [area, setArea] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [q, setQ] = useState('');
  const [showClosed, setShowClosed] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    db.listCases().then(setCases);
  }, []);

  const filtered = cases.filter((c) => {
    if (area && c.practiceArea !== area) return false;
    if (type && c.caseType !== type) return false;
    if (!showClosed && c.status === 'Closed') return false;
    if (q) {
      const hay = `${c.fileNumber} ${c.caption ?? ''} ${c.caseType} ${c.legacyRef ?? ''}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Cases</h2>
          <div className="sub">{filtered.length} shown · {cases.length} total</div>
        </div>
        <Link className="btn" to="/cases/new">+ New case</Link>
      </div>

      <div className="filters">
        <input type="text" placeholder="Search file #, caption…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={area} onChange={(e) => { setArea(e.target.value); setType(''); }}>
          <option value="">All practice areas</option>
          {Object.keys(CASE_TYPES).map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} disabled={!area}>
          <option value="">All case types</option>
          {area && CASE_TYPES[area as PracticeArea].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <label className="check">
          <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} />
          Show closed
        </label>
      </div>

      <div className="card">
        <table className="list">
          <thead>
            <tr>
              <th>File #</th>
              <th>Caption</th>
              <th>Practice area</th>
              <th>Case type</th>
              <th>Status</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="rowlink" onClick={() => nav(`/cases/${c.id}`)}>
                <td><strong>{c.fileNumber}</strong></td>
                <td>{c.caption || <span className="muted">(no caption)</span>}</td>
                <td><span className={`badge ${AREA_BADGE[c.practiceArea]}`}>{c.practiceArea}</span></td>
                <td>{c.caseType}{c.representationType ? <span className="muted small"> · {c.representationType}</span> : null}</td>
                <td><span className="badge status">{c.status}</span></td>
                <td>{c.piFlags.map((f) => <span className="badge flag" key={f}>{f}</span>)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="muted">No cases match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
