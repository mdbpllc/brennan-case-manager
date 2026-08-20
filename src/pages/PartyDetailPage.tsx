import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { PartyRecord, CasePartyLink, CaseRecord } from '../domain/types';
import type { ProviderBillingProfile } from '../domain/billing';
import { PARTY_TYPE_MAP } from '../domain/partyRegistry';
import { ALIAS_KIND_LABELS } from '../domain/directory';
import { FieldDisplay } from '../components/fieldWidgets';
import { mergePartyFields, piiFieldKeys, type PartyPii } from '../domain/partyPii';
import { db } from '../data';

export default function PartyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = useState<PartyRecord | null>(null);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [cases, setCases] = useState<Record<string, CaseRecord>>({});
  const [profile, setProfile] = useState<ProviderBillingProfile | null>(null);
  /** Gate 10 §4 — the child row is fetched ONLY when Michael asks. Opening a
   *  contact does not pull an SSN across the wire on the chance he might look. */
  const [pii, setPii] = useState<PartyPii | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');

  useEffect(() => {
    if (!id) return;
    db.getParty(id)
      .then(async (p) => {
        setParty(p);
        if (p?.partyType === 'providerBusiness') setProfile(await db.getProviderProfile(p.id));
        setLoadState(p ? 'ready' : 'notfound');
      })
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
  const piiKeys = piiFieldKeys();

  // Gate 10 §2 — the flat field set the registry renders is REASSEMBLED from
  // the blob plus the typed DOB (and, once revealed, the child row). The split
  // is a storage fact and is deliberately invisible above this line.
  const shown = mergePartyFields(party.fields, party.dateOfBirth, revealed ? pii : null);

  const reveal = async () => {
    if (!id) return;
    setRevealing(true);
    try {
      setPii(await db.getPartyPii(id));
      setRevealed(true);
    } finally {
      setRevealing(false);
    }
  };

  // Only show fields that have values, plus always-show basics. PII fields are
  // partitioned out entirely: they get their own block behind the reveal, so an
  // un-revealed contact shows no trace of them either way.
  const visibleDefs = def?.fields.filter((f) => !piiKeys.includes(f.key)) ?? [];
  const populated = visibleDefs.filter((f) => {
    const v = shown[f.key];
    return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  });
  const empty = visibleDefs.filter((f) => !populated.includes(f));
  const piiDefs = def?.fields.filter((f) => piiKeys.includes(f.key)) ?? [];

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>
            {party.displayName}
            {party.deceased && <span className="muted"> — deceased{party.deceasedDate ? ` ${party.deceasedDate}` : ''}</span>}
          </h2>
          <div className="sub">
            {party.roleTags.length > 0
              ? party.roleTags.map((t) => PARTY_TYPE_MAP[t]?.label ?? t).join(' · ')
              : (def?.label ?? party.partyType)}
            {' · '}{party.kind}
          </div>
          {party.aliases.length > 0 && (
            <div className="sub">
              {party.aliases.map((a) => `${ALIAS_KIND_LABELS[a.kind]} ${a.name}`).join(' · ')}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <Link className="btn secondary" to={`/parties/${party.id}/edit`}>Edit</Link>
          {/* CD-1 §8 adopted mechanic 3: the edit surface STATES firm-wide scope
              with a linked-case count. Labelling, not a confirm click —
              Michael's own load-bearing requirement, and it only works because
              case records point at this row rather than copying it. */}
          <div className="muted" style={{ fontSize: '0.85em', marginTop: '0.25rem', maxWidth: '18rem' }}>
            Edits here apply firm-wide — this contact is linked to{' '}
            <strong>{links.length}</strong> {links.length === 1 ? 'case' : 'cases'}.
          </div>
        </div>
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

      {party.partyType === 'providerBusiness' && (
        <div className="card">
          <h3>Billing profile</h3>
          <p className="small muted" style={{ margin: '0 0 8px' }}>
            Aggregated from this provider's bills across cases — confirmed analysis runs only.
            Ratios and flags, no client identities. Estimates, not adjudication.
          </p>
          <dl className="kv">
            <dt>Avg billed-to-benchmark ratio</dt>
            <dd>
              {profile?.avgBilledToMedicareRatio !== undefined
                ? <strong>{profile.avgBilledToMedicareRatio.toFixed(2)}×</strong>
                : <span className="muted">No confirmed analysis runs yet.</span>}
            </dd>
            <dt>Historical reduction %</dt>
            <dd>
              {profile?.historicalReductionPct !== undefined
                ? `${profile.historicalReductionPct.toFixed(1)}%`
                : <span className="muted">Auto-feeds from settlement billed-vs-final outcomes once the settlement module lands.</span>}
            </dd>
            <dt>Common coding-audit flags</dt>
            <dd>
              {profile && profile.commonFlags.length > 0
                ? profile.commonFlags.map((f) => <span key={f} className="badge audit-flag" style={{ marginRight: 4 }}>{f}</span>)
                : <span className="muted">None recorded.</span>}
            </dd>
            <dt>Last confirmed analysis</dt>
            <dd>{profile?.lastAnalysisDate ? new Date(profile.lastAnalysisDate).toLocaleString() : <span className="muted">—</span>}</dd>
          </dl>
        </div>
      )}

      <div className="card">
        <h3>Details</h3>
        {populated.length === 0 && <div className="muted small">No details recorded yet.</div>}
        <dl className="kv">
          {populated.map((f) => (
            <div key={f.key} style={{ display: 'contents' }}>
              <dt>{f.label}</dt>
              <dd><FieldDisplay def={f} value={shown[f.key]} /></dd>
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

      {piiDefs.length > 0 && (
        <div className="card">
          <h3>Identifying numbers</h3>
          <div className="muted small">
            Stored apart from the rest of the contact record and never loaded with a
            list. Masked by default; showing them is a deliberate step.
          </div>
          {!revealed ? (
            <button className="btn secondary" type="button" onClick={reveal} disabled={revealing}
              style={{ marginTop: 8 }}>
              {revealing ? 'Loading…' : 'Show identifying numbers'}
            </button>
          ) : (
            <dl className="kv" style={{ marginTop: 8 }}>
              {piiDefs.map((f) => (
                <div key={f.key} style={{ display: 'contents' }}>
                  <dt>{f.label}</dt>
                  <dd><FieldDisplay def={f} value={shown[f.key]} /></dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
