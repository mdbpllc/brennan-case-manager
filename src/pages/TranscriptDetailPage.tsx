// Transcript record page — spec §2's Transcript object rendered whole:
// metadata, consent/privilege/PHI, participant (speaker→party) mapping,
// verified flag (attorney action ONLY — this button is the one thing that
// may set it), summary, and the full text.
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CaseRecord, PartyRecord } from '../domain/types';
import type {
  Transcript, TranscriptParticipant, ConsentStatus, PrivilegeTier, OutOfStateAnswer,
} from '../domain/transcripts';
import { CONTEXT_TYPE_LABELS } from '../domain/transcripts';
import { db } from '../data';
import { Combobox } from '../components/Combobox';

export default function TranscriptDetailPage() {
  const { caseId, transcriptId } = useParams<{ caseId: string; transcriptId: string }>();
  const [tr, setTr] = useState<Transcript | null>(null);
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [participants, setParticipants] = useState<TranscriptParticipant[]>([]);
  const [caseParties, setCaseParties] = useState<PartyRecord[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');

  const refresh = useCallback(async () => {
    if (!transcriptId) return;
    try {
      const rec = await db.getTranscript(transcriptId);
      if (!rec) { setLoadState('notfound'); return; }
      setTr(rec);
      setCases(await db.getCases(rec.caseIds));
      setParticipants(await db.listParticipants(rec.id));
      const linkLists = await Promise.all(rec.caseIds.map((cid) => db.listLinksForCase(cid)));
      const partyIds = [...new Set(linkLists.flat().map((l) => l.partyId))];
      setCaseParties(await db.getParties(partyIds));
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, [transcriptId]);

  useEffect(() => { refresh(); }, [refresh]);

  if (loadState === 'notfound') {
    return <div className="notice">Transcript not found. <Link to={`/cases/${caseId}/transcripts`}>Back to the case</Link></div>;
  }
  if (loadState === 'error') {
    return <div className="notice">Couldn't load this transcript. Check the database connection and refresh.</div>;
  }
  if (!tr) return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Transcript — {CONTEXT_TYPE_LABELS[tr.contextType]}</h2>
          <div className="sub">
            {tr.recordedAt ? tr.recordedAt.replace('T', ' ').slice(0, 16) : 'date unknown'}
            {tr.durationSeconds !== undefined && <> · {Math.floor(tr.durationSeconds / 60)}:{String(Math.round(tr.durationSeconds % 60)).padStart(2, '0')} min</>}
            {' · '}{tr.source} · engine {tr.engine}
          </div>
        </div>
        <div>
          {tr.verified
            ? <span className="badge conf-confirmed">verified</span>
            : <span className="badge conf-none">machine output</span>}
          {tr.phiFlag && <span className="badge phi" style={{ marginLeft: 4 }}>PHI</span>}
          {tr.discoverableFlag && <span className="badge discoverable" style={{ marginLeft: 4 }}>presumptively discoverable</span>}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        {cases.map((c) => (
          <Link key={c.id} to={`/cases/${c.id}/transcripts`} className="badge status" style={{ marginRight: 6 }}>
            {c.fileNumber} — {c.caption || c.caseType}
          </Link>
        ))}
      </div>

      <FlagsCard tr={tr} onChange={setTr} />
      <ParticipantsCard tr={tr} participants={participants} caseParties={caseParties} onSaved={refresh} />
      <SummaryCard tr={tr} onChange={setTr} />

      <div className="card">
        <h3>Transcript text</h3>
        {tr.text.includes('[unclear]') && (
          <div className="notice" style={{ marginBottom: 8 }}>
            [unclear] marks low-confidence spans — click-to-play arrives with the audio wiring (T4).
          </div>
        )}
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{tr.text}</p>
      </div>
    </div>
  );
}

function FlagsCard({ tr, onChange }: { tr: Transcript; onChange: (t: Transcript) => void }) {
  const [saving, setSaving] = useState(false);

  const patch = async (p: Partial<Transcript>) => {
    const updated = await db.updateTranscript(tr.id, p);
    await db.appendReviewLog({
      entityType: 'transcript', entityId: tr.id, action: 'edited', user: 'Michael',
      reason: `Updated ${Object.keys(p).join(', ')}`,
    });
    onChange(updated);
  };

  const verify = async () => {
    if (saving) return;
    setSaving(true);
    // The ONLY place verified gets set — an explicit attorney action.
    const updated = await db.updateTranscript(tr.id, { verified: true, status: 'attorney-reviewed' });
    await db.appendReviewLog({
      entityType: 'transcript', entityId: tr.id, action: 'confirmed', user: 'Michael',
      reason: 'Transcript verified against audio — safe to quote.',
    });
    onChange(updated);
    setSaving(false);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
        <h3>Consent, privilege & review</h3>
        {!tr.verified && (
          <button className="btn small" onClick={verify} disabled={saving}>
            Mark verified (checked against audio)
          </button>
        )}
      </div>
      <div className="form-grid">
        <label className="fld">
          <span className="lab">Consent status</span>
          <select value={tr.consentStatus} onChange={(e) => patch({ consentStatus: e.target.value as ConsentStatus })}>
            <option value="announced">Announced</option>
            <option value="written">Written</option>
            <option value="one-party">One-party</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="fld">
          <span className="lab">Out-of-state participant?</span>
          <select value={tr.outOfStateParticipant} onChange={(e) => patch({ outOfStateParticipant: e.target.value as OutOfStateAnswer })}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="fld">
          <span className="lab">Privilege tier</span>
          <select value={tr.privilegeTier} onChange={(e) => patch({ privilegeTier: e.target.value as PrivilegeTier })}>
            <option value="privileged">Privileged — attorney-client</option>
            <option value="work-product">Work product</option>
            <option value="non-privileged">Non-privileged</option>
          </select>
        </label>
        <div className="fld">
          <span className="lab">Flags</span>
          <label className="check">
            <input type="checkbox" checked={tr.phiFlag} onChange={(e) => patch({ phiFlag: e.target.checked })} />
            PHI
          </label>
          <label className="check">
            <input type="checkbox" checked={tr.discoverableFlag} onChange={(e) => patch({ discoverableFlag: e.target.checked })} />
            Presumptively discoverable
          </label>
        </div>
      </div>
      {(tr.contextType === 'deposition' || tr.contextType === 'client_call' || tr.contextType === 'client_meeting') && !tr.verified && (
        <div className="notice" style={{ marginTop: 8, marginBottom: 0 }}>
          High-stakes context type — before relying on exact wording, re-transcribe with this case's
          vocabulary (pass 2). That action arrives with the pipeline service (T4).
        </div>
      )}
    </div>
  );
}

function ParticipantsCard({ tr, participants, caseParties, onSaved }: {
  tr: Transcript; participants: TranscriptParticipant[];
  caseParties: PartyRecord[]; onSaved: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [rows, setRows] = useState<{ speakerLabel: string; partyId: string; displayName: string }[]>([]);

  const startEdit = () => {
    const existing = participants.map((p) => ({
      speakerLabel: p.speakerLabel, partyId: p.partyId ?? '', displayName: p.displayName ?? '',
    }));
    setRows(existing.length > 0 ? existing : [{ speakerLabel: 'SPEAKER_00', partyId: '', displayName: 'Michael' }]);
    setEditing(true);
  };

  const save = async () => {
    await db.saveParticipants(tr.id, rows
      .filter((r) => r.speakerLabel.trim())
      .map((r) => ({
        speakerLabel: r.speakerLabel.trim(),
        partyId: r.partyId || undefined,
        displayName: r.displayName.trim() || undefined,
      })));
    setEditing(false);
    onSaved();
  };

  const partyName = (id?: string) => caseParties.find((p) => p.id === id)?.displayName;
  const options = [
    ...caseParties.map((p) => ({ value: p.id, label: p.displayName })),
  ];

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>Participants (speaker → party)</h3>
        {!editing && <button className="btn small secondary" onClick={startEdit}>Edit mapping</button>}
      </div>
      {!editing ? (
        participants.length === 0
          ? <p className="muted">No speakers mapped yet. Mapping speakers to party records is what feeds each party's cross-case history.</p>
          : (
            <table className="list">
              <thead><tr><th>Speaker</th><th>Mapped to</th><th>Confidence</th></tr></thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id}>
                    <td>{p.speakerLabel}</td>
                    <td>
                      {p.partyId
                        ? <Link to={`/parties/${p.partyId}`}><strong>{partyName(p.partyId) ?? 'party'}</strong></Link>
                        : (p.displayName || <span className="muted">unmapped</span>)}
                    </td>
                    <td className="muted">{p.mappingConfidence !== undefined ? `${Math.round(p.mappingConfidence * 100)}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      ) : (
        <div>
          {rows.map((r, i) => (
            <div className="filters" key={i} style={{ marginBottom: 6 }}>
              <input
                type="text" value={r.speakerLabel} style={{ width: 130 }}
                onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, speakerLabel: e.target.value } : x))}
              />
              <Combobox
                options={options} value={r.partyId}
                onChange={(v) => setRows(rows.map((x, j) => j === i ? { ...x, partyId: v, displayName: v ? '' : x.displayName } : x))}
                placeholder="Case party…"
              />
              <input
                type="text" placeholder='or name (e.g. "Michael")' value={r.displayName}
                onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, displayName: e.target.value, partyId: e.target.value ? '' : x.partyId } : x))}
              />
              <button className="btn small danger" onClick={() => setRows(rows.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              className="btn small secondary"
              onClick={() => setRows([...rows, { speakerLabel: `SPEAKER_0${rows.length}`, partyId: '', displayName: '' }])}
            >
              + Speaker
            </button>
            <button className="btn small" onClick={save}>Save mapping</button>
            <button className="btn small secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ tr, onChange }: { tr: Transcript; onChange: (t: Transcript) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(tr.summary ?? '');

  const save = async () => {
    const updated = await db.updateTranscript(tr.id, { summary: draft || undefined });
    onChange(updated);
    setEditing(false);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>Summary (manual — Phase 1 has no auto-summary)</h3>
        {!editing && (
          <button className="btn small secondary" onClick={() => { setDraft(tr.summary ?? ''); setEditing(true); }}>
            {tr.summary ? 'Edit' : 'Add summary'}
          </button>
        )}
      </div>
      {editing ? (
        <div>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn small" onClick={save}>Save</button>
            <button className="btn small secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <p className="muted" style={{ whiteSpace: 'pre-wrap' }}>{tr.summary || 'No summary yet.'}</p>
      )}
    </div>
  );
}
