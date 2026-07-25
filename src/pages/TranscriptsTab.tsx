// Transcripts tab on case detail — filed transcripts for this matter.
// New recordings arrive via the inbox (nothing files silently).
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CaseRecord } from '../domain/types';
import type { Transcript } from '../domain/transcripts';
import { CONTEXT_TYPE_LABELS } from '../domain/transcripts';
import { db } from '../data';

export default function TranscriptsTab({ caseRec }: { caseRec: CaseRecord }) {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    db.listTranscriptsForCase(caseRec.id).then((ts) => { setTranscripts(ts); setLoaded(true); });
  }, [caseRec.id]);

  const q = query.trim().toLowerCase();
  const shown = q
    ? transcripts.filter((t) => t.text.toLowerCase().includes(q) || (t.summary ?? '').toLowerCase().includes(q))
    : transcripts;

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
          <h3>Transcripts</h3>
          <Link className="btn small secondary" to="/inbox">Open inbox</Link>
        </div>
        {transcripts.length > 3 && (
          <div className="filters" style={{ marginBottom: 8 }}>
            <input
              type="search" placeholder="Search this case's transcripts…"
              value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 260 }}
            />
          </div>
        )}
        <table className="list">
          <thead>
            <tr><th>Recorded</th><th>Type</th><th>Flags</th><th>Status</th><th>Summary</th><th></th></tr>
          </thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t.id}>
                <td>{t.recordedAt ? t.recordedAt.replace('T', ' ').slice(0, 16) : '—'}</td>
                <td>{CONTEXT_TYPE_LABELS[t.contextType]}</td>
                <td>
                  <span className={`badge priv-${t.privilegeTier}`}>{t.privilegeTier}</span>
                  {t.phiFlag && <span className="badge phi" style={{ marginLeft: 4 }}>PHI</span>}
                  {t.discoverableFlag && <span className="badge discoverable" style={{ marginLeft: 4 }}>discoverable</span>}
                </td>
                <td>
                  {t.verified
                    ? <span className="badge conf-confirmed">verified</span>
                    : <span className="badge conf-none">machine output</span>}
                </td>
                <td className="muted">{t.summary ? (t.summary.length > 80 ? t.summary.slice(0, 80) + '…' : t.summary) : '—'}</td>
                <td><Link to={`/cases/${caseRec.id}/transcripts/${t.id}`}>open</Link></td>
              </tr>
            ))}
            {loaded && shown.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">
                  {transcripts.length === 0
                    ? <>No transcripts on this matter yet. Recordings route here from the <Link to="/inbox">inbox</Link> once you confirm them.</>
                    : 'No transcripts match the search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="notice">
        Transcripts are machine output until you verify them — don't quote in a filing from an
        unverified transcript. Privilege and PHI flags drive export warnings and, later, staff permissions.
      </div>
    </div>
  );
}
