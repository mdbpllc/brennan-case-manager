import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CaseRecord, CasePartyLink, PartyRecord, CaseRole, Side, PiFlag, RepresentationType } from '../domain/types';
import { CASE_ROLES, SIDES } from '../domain/types';
import { PI_FLAGS, statusesFor } from '../domain/caseTypes';
import { PARTY_TYPE_MAP } from '../domain/partyRegistry';
import { db } from '../data';
import { Combobox } from '../components/Combobox';
import MedicalTab from './MedicalTab';

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [rec, setRec] = useState<CaseRecord | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');
  const nav = useNavigate();
  // Tab lives in the URL so it survives navigation (e.g. returning from
  // "+ New party") and can be bookmarked.
  const path = useLocation().pathname;
  const tab: 'overview' | 'parties' | 'medical' =
    path.endsWith('/parties') ? 'parties' : path.endsWith('/medical') ? 'medical' : 'overview';

  useEffect(() => {
    if (!id) return;
    db.getCase(id)
      .then((c) => { setRec(c); setLoadState(c ? 'ready' : 'notfound'); })
      .catch(() => setLoadState('error'));
  }, [id]);

  if (loadState === 'notfound') {
    return <div className="notice">Case not found — it may have been removed. <Link to="/cases">Back to cases</Link></div>;
  }
  if (loadState === 'error') {
    return <div className="notice">Couldn't load this case. Check the database connection and refresh.</div>;
  }
  if (!rec) return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>{rec.fileNumber} — {rec.caption || rec.caseType}</h2>
          <div className="sub">
            {rec.practiceArea} · {rec.caseType}
            {rec.representationType ? ` · ${rec.representationType}` : ''}
            {rec.legacyRef ? ` · Cloudlex ${rec.legacyRef}` : ''}
          </div>
        </div>
        <div>
          {rec.piFlags.map((f) => <span className="badge flag" key={f}>{f}</span>)}
        </div>
      </div>

      <div className="tabs">
        <button className={tab === 'overview' ? 'active' : ''} onClick={() => nav(`/cases/${rec.id}`)}>Overview</button>
        <button className={tab === 'parties' ? 'active' : ''} onClick={() => nav(`/cases/${rec.id}/parties`)}>Parties</button>
        <button className={tab === 'medical' ? 'active' : ''} onClick={() => nav(`/cases/${rec.id}/medical`)}>Medical</button>
      </div>

      {tab === 'overview' && <OverviewTab rec={rec} onChange={setRec} />}
      {tab === 'parties' && <PartiesTab caseId={rec.id} />}
      {tab === 'medical' && <MedicalTab caseRec={rec} />}
    </div>
  );
}

/* ================= OVERVIEW ================= */

function OverviewTab({ rec, onChange }: { rec: CaseRecord; onChange: (c: CaseRecord) => void }) {
  const statuses = statusesFor(rec.practiceArea, rec.caseType);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(rec);

  useEffect(() => setDraft(rec), [rec]);

  const isPI = rec.practiceArea === 'Personal Injury';
  const isMVC = isPI && rec.caseType === 'Motor vehicle collision';
  const isCriminal = rec.practiceArea === 'Criminal';

  const toggleFlag = (f: PiFlag) =>
    setDraft((d) => ({
      ...d,
      piFlags: d.piFlags.includes(f) ? d.piFlags.filter((x) => x !== f) : [...d.piFlags, f],
    }));

  const save = async () => {
    const updated = await db.updateCase(rec.id, {
      caption: draft.caption, status: draft.status, dateOfIncident: draft.dateOfIncident,
      dateOpened: draft.dateOpened, statuteOfLimitations: draft.statuteOfLimitations,
      dateClosed: draft.dateClosed, courtName: draft.courtName, causeNumber: draft.causeNumber,
      notes: draft.notes, legacyRef: draft.legacyRef,
      piFlags: draft.piFlags,
      commercialPolicyInvolved: isMVC ? draft.commercialPolicyInvolved ?? false : draft.commercialPolicyInvolved,
      representationType: draft.representationType,
    });
    onChange(updated);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>Case overview</h3>
          <button className="btn small secondary" onClick={() => setEditing(true)}>Edit</button>
        </div>
        <dl className="kv">
          <dt>File number</dt><dd><strong>{rec.fileNumber}</strong></dd>
          <dt>Status</dt><dd><span className="badge status">{rec.status}</span></dd>
          <dt>Caption</dt><dd>{rec.caption || <span className="empty">—</span>}</dd>
          <dt>Date of incident</dt><dd>{rec.dateOfIncident || <span className="empty">—</span>}</dd>
          <dt>Date opened</dt><dd>{rec.dateOpened}</dd>
          <dt>Statute of limitations</dt><dd>{rec.statuteOfLimitations || <span className="empty">—</span>}</dd>
          <dt>Date closed</dt><dd>{rec.dateClosed || <span className="empty">—</span>}</dd>
          <dt>Court</dt><dd>{rec.courtName || <span className="empty">—</span>}</dd>
          <dt>Cause number</dt><dd>{rec.causeNumber || <span className="empty">—</span>}</dd>
          {rec.commercialPolicyInvolved !== undefined && (
            <><dt>Commercial policy involved</dt><dd>{rec.commercialPolicyInvolved ? 'Yes' : 'No'}</dd></>
          )}
          <dt>Notes</dt><dd style={{ whiteSpace: 'pre-wrap' }}>{rec.notes || <span className="empty">—</span>}</dd>
        </dl>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Edit overview</h3>
      <div className="form-grid">
        <label className="fld full">
          <span className="lab">Caption</span>
          <input type="text" value={draft.caption ?? ''} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Status</span>
          <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            {!statuses.includes(draft.status) && <option value={draft.status}>{draft.status}</option>}
          </select>
        </label>
        <label className="fld">
          <span className="lab">Date of incident</span>
          <input type="date" value={draft.dateOfIncident ?? ''} onChange={(e) => setDraft({ ...draft, dateOfIncident: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Date opened</span>
          <input type="date" value={draft.dateOpened} onChange={(e) => setDraft({ ...draft, dateOpened: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Statute of limitations</span>
          <input type="date" value={draft.statuteOfLimitations ?? ''} onChange={(e) => setDraft({ ...draft, statuteOfLimitations: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Date closed</span>
          <input type="date" value={draft.dateClosed ?? ''} onChange={(e) => setDraft({ ...draft, dateClosed: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Court</span>
          <input type="text" value={draft.courtName ?? ''} onChange={(e) => setDraft({ ...draft, courtName: e.target.value })} />
        </label>
        <label className="fld">
          <span className="lab">Cause number</span>
          <input type="text" value={draft.causeNumber ?? ''} onChange={(e) => setDraft({ ...draft, causeNumber: e.target.value })} />
        </label>
        {isCriminal && (
          <label className="fld">
            <span className="lab">Representation type</span>
            <select
              value={draft.representationType ?? ''}
              onChange={(e) => setDraft({ ...draft, representationType: (e.target.value || undefined) as RepresentationType | undefined })}
            >
              <option value="">—</option>
              <option>Court-appointed</option>
              <option>Private hire</option>
            </select>
          </label>
        )}
        <label className="fld full">
          <span className="lab">Notes</span>
          <textarea value={draft.notes ?? ''} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </label>
      </div>

      {isPI && (
        <div style={{ marginTop: 14 }}>
          <span className="lab" style={{ fontWeight: 600, fontSize: 13, color: 'var(--navy)' }}>
            Overlay flags (stackable — each opens its playbook)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginTop: 8 }}>
            {PI_FLAGS.map((f) => (
              <label className="check" key={f}>
                <input type="checkbox" checked={draft.piFlags.includes(f)} onChange={() => toggleFlag(f)} />
                {f}
              </label>
            ))}
          </div>
        </div>
      )}

      {isMVC && (
        <div style={{ marginTop: 14 }}>
          <label className="check">
            <input
              type="checkbox"
              checked={Boolean(draft.commercialPolicyInvolved)}
              onChange={(e) => setDraft({ ...draft, commercialPolicyInvolved: e.target.checked })}
            />
            Commercial policy involved
          </label>
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={save}>Save</button>
        <button className="btn secondary" onClick={() => { setDraft(rec); setEditing(false); }}>Cancel</button>
      </div>
    </div>
  );
}

/* ================= PARTIES ================= */

function PartiesTab({ caseId }: { caseId: string }) {
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [parties, setParties] = useState<Record<string, PartyRecord>>({});
  const [allParties, setAllParties] = useState<PartyRecord[]>([]);
  const [adding, setAdding] = useState(false);
  const [selParty, setSelParty] = useState('');
  const [selRole, setSelRole] = useState<CaseRole>('Client');
  const [selSide, setSelSide] = useState<Side | ''>('');

  const refresh = useCallback(async () => {
    const ls = await db.listLinksForCase(caseId);
    setLinks(ls);
    const ps = await db.getParties(ls.map((l) => l.partyId));
    setParties(Object.fromEntries(ps.map((p) => [p.id, p])));
    setAllParties(await db.listParties());
  }, [caseId]);

  useEffect(() => { refresh(); }, [refresh]);

  const addLink = async () => {
    if (!selParty) return;
    await db.createLink({ caseId, partyId: selParty, role: selRole, side: selSide || undefined });
    setAdding(false);
    setSelParty('');
    refresh();
  };

  const unlink = async (linkId: string) => {
    await db.deleteLink(linkId);
    refresh();
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>Linked parties</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn small secondary" onClick={() => setAdding((a) => !a)}>
              {adding ? 'Cancel' : '+ Link existing party'}
            </button>
            <Link className="btn small" to={`/parties/new?caseId=${caseId}`}>+ New party</Link>
          </div>
        </div>

        {adding && (
          <div className="filters" style={{ marginTop: 8, padding: 10, background: '#f7f8fa', borderRadius: 6 }}>
            <Combobox
              options={allParties.map((p) => ({
                value: p.id,
                label: p.displayName,
                sublabel: PARTY_TYPE_MAP[p.partyType]?.label ?? p.partyType,
              }))}
              value={selParty}
              onChange={setSelParty}
              placeholder="Choose a party…"
            />
            <select value={selRole} onChange={(e) => setSelRole(e.target.value as CaseRole)}>
              {CASE_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={selSide} onChange={(e) => setSelSide(e.target.value as Side | '')}>
              <option value="">Side —</option>
              {SIDES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn small" onClick={addLink} disabled={!selParty}>Link</button>
          </div>
        )}

        <table className="list" style={{ marginTop: 10 }}>
          <thead>
            <tr><th>Party</th><th>Type</th><th>Role on this case</th><th>Side</th><th></th></tr>
          </thead>
          <tbody>
            {links.map((l) => {
              const p = parties[l.partyId];
              return (
                <tr key={l.id}>
                  <td>{p ? <Link to={`/parties/${p.id}`}><strong>{p.displayName}</strong></Link> : '…'}</td>
                  <td className="muted">{p ? PARTY_TYPE_MAP[p.partyType]?.label ?? p.partyType : ''}</td>
                  <td><span className="badge role">{l.role}</span></td>
                  <td>{l.side ? <span className={`badge side-${l.side}`}>{l.side}</span> : <span className="muted">—</span>}</td>
                  <td><button className="btn small danger" onClick={() => unlink(l.id)}>Unlink</button></td>
                </tr>
              );
            })}
            {links.length === 0 && (
              <tr><td colSpan={5} className="muted">No parties linked yet. Link an existing party or create a new one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="notice">
        Enter a party once, link it to as many cases as needed — roles (what a party <em>does</em> here) sit on top of
        identity (what it <em>is</em>). Open any party to see its full cross-case history.
      </div>
    </div>
  );
}
