// Statute cache index — cached chapters, cite lookup, prefetch, and the
// refresh-and-tripwire action (design A2–A4). Cache-on-demand posture (D1):
// nothing is mirrored; chapters land here when first opened or prefetched.

import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { codeByCd } from '../cites/codes';
import type { LegalRule } from '../domain/billing';
import type { StatuteChapterMeta, WatchFlag } from '../domain/statutes';
import { WORKING_SET_CODES } from '../domain/statutes';
import { db, usingSupabase } from '../data';
import { parseCite } from '../cites/parser';
import { getOrFetchChapter } from '../statutes/fetcher';
import { refreshCacheAndRunTripwire, snapshotTargetsForRule } from '../statutes/tripwire';

export default function StatutesPage() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<StatuteChapterMeta[]>([]);
  const [flags, setFlags] = useState<WatchFlag[]>([]);
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [lookup, setLookup] = useState('');
  const [lookupMsg, setLookupMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [ch, fl, lr] = await Promise.all([
      db.listStatuteChapters(), db.listWatchFlags(true), db.listLegalRules(),
    ]);
    setChapters(ch);
    setFlags(fl);
    setRules(lr);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const ruleKey = (ruleId: string) => rules.find((r) => r.id === ruleId)?.ruleKey ?? ruleId;

  const openCite = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseCite(lookup);
    if ((parsed.kind === 'statute' || parsed.kind === 'ccp-article') && parsed.code && parsed.chapter) {
      navigate(`/statutes/${parsed.code}/${parsed.chapter}${parsed.section ? `#${parsed.section}` : ''}`);
      return;
    }
    if (parsed.kind === 'ambiguous') {
      setLookupMsg('Ambiguous cite — say which code it belongs to (e.g. "CCP art. 55A.053").');
    } else {
      setLookupMsg('Not a Texas statutory cite this cache can open (case law, rules, and federal cites live elsewhere).');
    }
  };

  /** Warm the cache with every chapter the registry actually cites. */
  const prefetchRegistryChapters = async () => {
    setBusy('prefetch');
    setActionMsg(null);
    const wanted = new Map<string, { code: string; chapter: string }>();
    for (const rule of rules) {
      for (const t of snapshotTargetsForRule(rule)) {
        wanted.set(`${t.code}.${t.chapter}`, { code: t.code, chapter: t.chapter });
      }
    }
    let ok = 0;
    const failed: string[] = [];
    for (const { code, chapter } of wanted.values()) {
      try { await getOrFetchChapter(code, chapter); ok++; }
      catch { failed.push(`${code} ch. ${chapter}`); }
    }
    setActionMsg(`Registry-cited chapters cached: ${ok}${failed.length ? ` · unavailable: ${failed.join(', ')}` : ''}`);
    setBusy(null);
    refresh();
  };

  const runRefresh = async () => {
    setBusy('refresh');
    setActionMsg(null);
    const result = await refreshCacheAndRunTripwire();
    const parts = [`${result.refreshed} chapter${result.refreshed === 1 ? '' : 's'} refreshed`];
    parts.push(result.raised.length
      ? `⚠ ${result.raised.length} re-verification flag${result.raised.length === 1 ? '' : 's'} raised`
      : 'no verified text changed');
    if (result.failed.length) {
      parts.push(`failed: ${result.failed.map((f) => `${f.code} ch. ${f.chapter}`).join(', ')} (stale cache kept)`);
    }
    setActionMsg(parts.join(' · '));
    setBusy(null);
    refresh();
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Statute cache</h2>
          <div className="sub">
            Current statute text from statutes.capitol.texas.gov — cached on demand, hash-watched for the registry.
          </div>
        </div>
      </div>

      {!usingSupabase && (
        <div className="notice">
          Demo mode carries the five fixture chapters the seeded registry cites. Live mode (central database +
          the statute-fetch function, docs/statute-cache-setup.md) caches any chapter on demand.
        </div>
      )}

      <div className="card">
        <form onSubmit={openCite} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            style={{ flex: 1 }}
            placeholder='Open a cite — e.g. "CPRC §41.0105", "Tex. Prop. Code Ch. 55", "CCP art. 55A.053"'
            value={lookup}
            onChange={(e) => { setLookup(e.target.value); setLookupMsg(null); }}
          />
          <button className="btn" type="submit">Open</button>
        </form>
        {lookupMsg && <div className="small muted" style={{ marginTop: 6 }}>{lookupMsg}</div>}
      </div>

      {flags.length > 0 && (
        <div className="card" style={{ borderColor: 'var(--warn, #b45309)' }}>
          <strong>Re-verification worklist</strong>
          <div className="small muted">
            Statute text moved under these verified rules. Advisory only — re-verify on the{' '}
            <Link to="/rules">Legal rules</Link> screen; your re-sign-off clears the flag.
          </div>
          <table className="list" style={{ marginTop: 6 }}>
            <thead><tr><th>Rule</th><th>What moved</th><th>Raised</th><th>Detail</th></tr></thead>
            <tbody>
              {flags.map((f) => (
                <tr key={f.id}>
                  <td><Link to="/rules">{ruleKey(f.ruleId)}</Link></td>
                  <td>{f.sourceRef}</td>
                  <td className="small muted">{f.raisedAt.slice(0, 10)}</td>
                  <td className="small muted">{f.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <strong>Cached chapters</strong>
          <span>
            <button className="btn small secondary" onClick={prefetchRegistryChapters} disabled={busy !== null}>
              {busy === 'prefetch' ? 'Caching…' : 'Cache registry-cited chapters'}
            </button>{' '}
            <button className="btn small" onClick={runRefresh} disabled={busy !== null || chapters.length === 0}>
              {busy === 'refresh' ? 'Refreshing…' : 'Refresh cache + run tripwire'}
            </button>
          </span>
        </div>
        {actionMsg && <div className="small" style={{ marginTop: 6 }}>{actionMsg}</div>}
        <table className="list" style={{ marginTop: 6 }}>
          <thead><tr><th>Code</th><th>Chapter</th><th>Title</th><th>Cached</th></tr></thead>
          <tbody>
            {chapters.map((c) => (
              <tr key={c.id}>
                <td>{codeByCd(c.code)?.name ?? c.code}</td>
                <td><Link to={`/statutes/${c.code}/${c.chapter}`}>Ch. {c.chapter}</Link></td>
                <td className="small muted">{c.title}</td>
                <td className="small muted">{c.fetchedAt.slice(0, 10)}</td>
              </tr>
            ))}
            {chapters.length === 0 && (
              <tr><td colSpan={4} className="muted">
                Nothing cached yet — open a cite above or cache the registry-cited chapters.
              </td></tr>
            )}
          </tbody>
        </table>
        <div className="small muted" style={{ marginTop: 6 }}>
          Working set (decided 2026-07-25): {WORKING_SET_CODES.map((cd) => codeByCd(cd)?.name ?? cd).join(', ')}.
          The biennial refresh (post-session Sept. 1 / Jan. 1) is when "Refresh cache + run tripwire" matters most.
        </div>
      </div>
    </div>
  );
}
