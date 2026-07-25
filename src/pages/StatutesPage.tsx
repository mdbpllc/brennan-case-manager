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
import {
  loadAllTocs, loadToc, searchChapterTitles, searchCachedSectionHeadings,
  TOC_CODES, type ChapterHit, type CodeToc, type SectionHit,
} from '../statutes/toc';

export default function StatutesPage() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<StatuteChapterMeta[]>([]);
  const [flags, setFlags] = useState<WatchFlag[]>([]);
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [lookup, setLookup] = useState('');
  const [lookupMsg, setLookupMsg] = useState<string | null>(null);
  const [browseCode, setBrowseCode] = useState('');
  const [browseToc, setBrowseToc] = useState<CodeToc | null>(null);
  const [browseChapter, setBrowseChapter] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [chapterHits, setChapterHits] = useState<ChapterHit[]>([]);
  const [sectionHits, setSectionHits] = useState<SectionHit[]>([]);
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

  const pickCode = async (code: string) => {
    setBrowseCode(code);
    setBrowseChapter('');
    setBrowseToc(code ? await loadToc(code) : null);
  };

  const openBrowse = () => {
    if (browseCode && browseChapter) navigate(`/statutes/${browseCode}/${browseChapter}`);
  };

  useEffect(() => {
    const q = searchQ.trim();
    if (q.length < 2) {
      setChapterHits([]);
      setSectionHits([]);
      return;
    }
    let stale = false;
    (async () => {
      const [tocs, sections] = await Promise.all([loadAllTocs(), searchCachedSectionHeadings(q)]);
      if (stale) return;
      setChapterHits(searchChapterTitles(tocs, q));
      setSectionHits(sections);
    })();
    return () => { stale = true; };
  }, [searchQ]);

  /** Chapters grouped by their TITLE/SUBTITLE path for the <optgroup>s. */
  const chapterGroups = (() => {
    if (!browseToc) return [];
    const groups: { path: string; chapters: CodeToc['chapters'] }[] = [];
    for (const ch of browseToc.chapters) {
      const last = groups[groups.length - 1];
      if (last && last.path === ch.path) last.chapters.push(ch);
      else groups.push({ path: ch.path, chapters: [ch] });
    }
    return groups;
  })();

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
        <strong>Find a statute</strong>

        <div className="small muted" style={{ marginTop: 8 }}>Browse — pick the code, then the chapter:</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <select value={browseCode} onChange={(e) => pickCode(e.target.value)} style={{ flex: 1 }}>
            <option value="">Choose a code…</option>
            {TOC_CODES.map((cd) => (
              <option key={cd} value={cd}>{codeByCd(cd)?.name ?? cd}</option>
            ))}
          </select>
          <select
            value={browseChapter}
            onChange={(e) => setBrowseChapter(e.target.value)}
            disabled={!browseToc}
            style={{ flex: 2 }}
          >
            <option value="">{browseToc ? `Choose a chapter… (${browseToc.chapters.length})` : 'Chapter'}</option>
            {chapterGroups.map((g, i) => (
              <optgroup key={i} label={g.path || browseToc?.name}>
                {g.chapters.map((ch) => (
                  <option key={ch.ch} value={ch.ch}>Ch. {ch.ch} — {ch.title}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <button className="btn" onClick={openBrowse} disabled={!browseCode || !browseChapter}>Open</button>
        </div>

        <div className="small muted" style={{ marginTop: 10 }}>Or search chapter titles by keyword:</div>
        <input
          style={{ width: '100%', marginTop: 4 }}
          placeholder='e.g. "damages", "hospital lien", "expunction", "custody"'
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        {(chapterHits.length > 0 || sectionHits.length > 0) && (
          <div className="small" style={{ marginTop: 6, maxHeight: 260, overflowY: 'auto' }}>
            {sectionHits.length > 0 && (
              <>
                <div className="muted">Sections (in cached chapters):</div>
                {sectionHits.map((h) => (
                  <div key={`${h.code}-${h.section}`}>
                    <Link to={`/statutes/${h.code}/${h.chapter}#${h.section}`}>
                      {codeByCd(h.code)?.name ?? h.code} §{h.section}
                    </Link>{' '}
                    — {h.heading}
                  </div>
                ))}
              </>
            )}
            {chapterHits.length > 0 && (
              <>
                <div className="muted" style={{ marginTop: sectionHits.length ? 6 : 0 }}>Chapters (all twelve codes):</div>
                {chapterHits.map((h) => (
                  <div key={`${h.code}-${h.ch}`}>
                    <Link to={`/statutes/${h.code}/${h.ch}`}>{h.codeName} Ch. {h.ch}</Link>
                    {' — '}{h.title} <span className="muted">({h.path})</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        {searchQ.trim().length >= 2 && chapterHits.length === 0 && sectionHits.length === 0 && (
          <div className="small muted" style={{ marginTop: 6 }}>
            No title matches. Section-level search covers cached chapters only — try the browse picker or an exact cite.
          </div>
        )}

        <div className="small muted" style={{ marginTop: 10 }}>Or paste an exact cite:</div>
        <form onSubmit={openCite} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <input
            style={{ flex: 1 }}
            placeholder='e.g. "CPRC 41.0105", "Tex. Prop. Code Ch. 55", "CCP art. 55A.053"'
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
