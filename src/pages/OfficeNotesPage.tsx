// Office notes — the personal store for not-case-related recordings
// (Michael's O3 decision, 2026-07-25): kept and searchable, never silently
// discarded. Attorney-only, like everything in the transcript layer.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Transcript } from '../domain/transcripts';
import { db } from '../data';

export default function OfficeNotesPage() {
  const [notes, setNotes] = useState<Transcript[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [query, setQuery] = useState('');

  useEffect(() => {
    db.listOfficeNotes()
      .then((ns) => { setNotes(ns); setLoadState('ready'); })
      .catch(() => setLoadState('error'));
  }, []);

  if (loadState === 'error') {
    return <div className="notice">Couldn't load office notes. Check the database connection and refresh.</div>;
  }
  if (loadState === 'loading') return <div className="muted">Loading…</div>;

  const q = query.trim().toLowerCase();
  const shown = q
    ? notes.filter((n) => n.text.toLowerCase().includes(q) || (n.summary ?? '').toLowerCase().includes(q))
    : notes;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Office notes</h2>
          <div className="sub">
            Recordings that belong to no matter — CLE reminders, office admin, notes to self.
            Kept and searchable, never discarded.
          </div>
        </div>
      </div>

      <div className="filters" style={{ marginBottom: 10 }}>
        <input
          type="search" placeholder="Search notes…" value={query}
          onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 280 }}
        />
        <span className="muted">{notes.length} note{notes.length === 1 ? '' : 's'}</span>
      </div>

      <div className="card">
        <table className="list">
          <thead><tr><th>Recorded</th><th>Length</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {shown.map((n) => (
              <tr key={n.id}>
                <td>{n.recordedAt ? n.recordedAt.replace('T', ' ').slice(0, 16) : '—'}</td>
                <td className="muted">
                  {n.durationSeconds !== undefined
                    ? `${Math.floor(n.durationSeconds / 60)}:${String(Math.round(n.durationSeconds % 60)).padStart(2, '0')}`
                    : '—'}
                </td>
                <td className="muted">
                  {n.summary || (n.text.length > 110 ? n.text.slice(0, 110) + '…' : n.text)}
                </td>
                <td><Link to={`/notes/${n.id}`}>open</Link></td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  {notes.length === 0
                    ? <>Nothing here yet. Marking an inbox item <em>Not case-related</em> files it here.</>
                    : 'No notes match the search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
