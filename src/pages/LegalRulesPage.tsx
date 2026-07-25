// Legal Rule Registry — system-wide core infrastructure (promoted 2026-07-22).
// Every legal proposition any module relies on lives here with cite, status,
// and verification trail. Registry discipline (binding):
//  - unverified rules drive warnings/placeholders, never computed outcomes;
//  - verified status requires attorney sign-off — the "Mark verified" action
//    below IS that sign-off and is the only path to verified;
//  - computed outputs stamp the rule versions they relied on.

import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LegalRule } from '../domain/billing';
import { ATTORNEY_USER } from '../domain/billing';
import type { WatchFlag } from '../domain/statutes';
import { flagKindLabel } from '../domain/statutes';
import { db } from '../data';
import { parseCite } from '../cites/parser';
import { clearTextChangedFlags, snapshotRuleCites } from '../statutes/tripwire';
import WorklistCard from '../components/WorklistCard';

/** Statutory cites deep-link into the in-app statute viewer (T2, design A3);
 *  the viewer carries the open-at-source link. Case cites, rules, and
 *  federal cites render as plain text: the parser classifies them but only
 *  live-verified TX code cites get a link. */
function CiteList({ cites }: { cites: string[] }) {
  return (
    <>
      {cites.map((c, i) => {
        const parsed = parseCite(c);
        const linkable = parsed.url && parsed.code && parsed.chapter;
        return (
          <span key={i}>
            {i > 0 && '; '}
            {linkable
              ? <Link
                  to={`/statutes/${parsed.code}/${parsed.chapter}${parsed.section ? `#${parsed.section}` : ''}`}
                  title="Open in the statute viewer"
                >{c}</Link>
              : c}
          </span>
        );
      })}
    </>
  );
}

export default function LegalRulesPage() {
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [flagsByRule, setFlagsByRule] = useState<Map<string, WatchFlag[]>>(new Map());
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [openId, setOpenId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [snapshotNote, setSnapshotNote] = useState<string | null>(null);
  // Remounts the worklist card after verify/flag actions so it re-queries.
  const [worklistNonce, setWorklistNonce] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [ruleList, activeFlags] = await Promise.all([db.listLegalRules(), db.listWatchFlags(true)]);
      setRules(ruleList);
      const grouped = new Map<string, WatchFlag[]>();
      for (const f of activeFlags) {
        const list = grouped.get(f.ruleId);
        if (list) list.push(f); else grouped.set(f.ruleId, [f]);
      }
      setFlagsByRule(grouped);
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const markVerified = async (rule: LegalRule) => {
    const confirmed = window.confirm(
      `Attorney sign-off: mark this rule VERIFIED as of today?\n\n"${rule.proposition}"\n\n` +
      'This records that you have personally confirmed the rule is current. Computed outputs will show it as verified from the next run.',
    );
    if (!confirmed) return;
    await db.updateLegalRule(rule.id, {
      status: 'verified',
      lastVerifiedDate: new Date().toISOString().slice(0, 10),
      verifiedBy: ATTORNEY_USER,
    });
    await db.appendReviewLog({
      entityType: 'legal_rule', entityId: rule.id, action: 'confirmed', user: ATTORNEY_USER,
      oldValue: rule.status, newValue: 'verified (attorney sign-off)',
    });
    // A4: pin the statute text this verification saw, and clear any tripwire
    // flags — the re-sign-off IS the act that resolves them.
    const snap = await snapshotRuleCites(rule);
    const clearedCount = await clearTextChangedFlags(rule.id, ATTORNEY_USER);
    const parts: string[] = [];
    if (snap.saved.length) parts.push(`text pinned for ${snap.saved.map((s) => s.sectionRef).join(', ')}`);
    if (snap.skipped.length) parts.push(`not pinned (${snap.skipped.map((s) => s.ref).join(', ')} — chapter unavailable)`);
    if (clearedCount) parts.push(`${clearedCount} change flag${clearedCount === 1 ? '' : 's'} cleared`);
    setSnapshotNote(parts.length ? `${rule.ruleKey}: ${parts.join(' · ')}` : null);
    setWorklistNonce((n) => n + 1);
    refresh();
  };

  const setStatus = async (rule: LegalRule, status: 'unverified' | 'watch') => {
    await db.updateLegalRule(rule.id, { status });
    await db.appendReviewLog({
      entityType: 'legal_rule', entityId: rule.id, action: 'edited', user: ATTORNEY_USER,
      oldValue: rule.status, newValue: status,
    });
    refresh();
  };

  const saveNotes = async (rule: LegalRule) => {
    await db.updateLegalRule(rule.id, { notes: notesDraft });
    setOpenId(null);
    refresh();
  };

  if (loadState === 'error') {
    return <div className="notice">Couldn't load the registry. Check the database connection and refresh.</div>;
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Legal Rule Registry</h2>
          <div className="sub">System-wide register of every legal proposition the software relies on.</div>
        </div>
      </div>

      <div className="notice">
        Rules enter <strong>unverified</strong> and stay that way until you personally confirm currency and mark
        them verified — a model's statement about the law never counts as verification. Unverified rules drive
        warnings and placeholders only; nothing computes a legal outcome from them.
      </div>

      {snapshotNote && <div className="notice">{snapshotNote}</div>}

      <WorklistCard key={worklistNonce} />

      <div className="card">
        <table className="list">
          <thead><tr><th>Rule</th><th>Cites</th><th>Scope</th><th>Status</th><th>Verified</th><th></th></tr></thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id}>
                <td style={{ maxWidth: 380 }}>
                  <strong>{r.ruleKey}</strong> <span className="muted small">v{r.version}</span>
                  <div className="small">{r.proposition}</div>
                  {r.watchFlags && <div className="small" style={{ color: 'var(--warn)' }}>⚠ {r.watchFlags}</div>}
                  {(flagsByRule.get(r.id) ?? []).map((f) => (
                    <div key={f.id} className="small" style={{ color: 'var(--warn)' }}>
                      ⚠ {flagKindLabel(f.kind)}: {f.sourceRef} ({f.raisedAt.slice(0, 10)})
                      {f.kind === 'text-changed-since-verified' && ' — re-verify to clear.'}
                      {f.detail && f.kind !== 'text-changed-since-verified' && ` — ${f.detail}`}
                    </div>
                  ))}
                  {openId === r.id ? (
                    <div style={{ marginTop: 6 }}>
                      <textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
                      <div style={{ marginTop: 4 }}>
                        <button className="btn small" onClick={() => saveNotes(r)}>Save notes</button>{' '}
                        <button className="btn small secondary" onClick={() => setOpenId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    r.notes && <div className="small muted" style={{ marginTop: 4 }}>{r.notes}</div>
                  )}
                </td>
                <td className="small muted" style={{ maxWidth: 220 }}><CiteList cites={r.cites} /></td>
                <td><span className="badge status">{r.scope}</span></td>
                <td><span className={`badge rule-${r.status}`}>{r.status}</span></td>
                <td className="small muted">
                  {r.lastVerifiedDate ? <>{r.lastVerifiedDate}<br />{r.verifiedBy}</> : '—'}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {r.status !== 'verified' && (
                    <button className="btn small" onClick={() => markVerified(r)}>Mark verified</button>
                  )}{' '}
                  {r.status === 'verified' && (flagsByRule.get(r.id)?.length ?? 0) > 0 && (
                    <button className="btn small" onClick={() => markVerified(r)} title="Re-confirm currency against the changed text — clears the flag and re-pins the snapshot">
                      Re-verify
                    </button>
                  )}{' '}
                  {r.status !== 'watch' && (
                    <button className="btn small secondary" onClick={() => setStatus(r, 'watch')}>Watch</button>
                  )}{' '}
                  {r.status === 'verified' && (
                    <button className="btn small secondary" onClick={() => setStatus(r, 'unverified')}>Revoke</button>
                  )}{' '}
                  <button className="btn small secondary" onClick={() => { setOpenId(r.id); setNotesDraft(r.notes ?? ''); }}>Notes</button>
                </td>
              </tr>
            ))}
            {rules.length === 0 && loadState === 'ready' && (
              <tr><td colSpan={6} className="muted">Registry is empty.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
