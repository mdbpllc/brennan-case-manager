// Statute viewer (design A3) — one cached chapter, section anchors, copy-cite,
// open-at-source. Cache-on-demand: landing here fetches the chapter if needed
// (fixtures in demo mode, the statute-fetch edge function in live mode).

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { chapterUrl, codeByCd } from '../cites/codes';
import type { StatuteChapterMeta, StatuteSection } from '../domain/statutes';
import { formatCite } from '../domain/statutes';
import { db } from '../data';
import { getOrFetchChapter, StatuteFetchError } from '../statutes/fetcher';

export default function StatuteViewerPage() {
  const { code = '', chapter = '' } = useParams();
  const location = useLocation();
  const [meta, setMeta] = useState<StatuteChapterMeta | null>(null);
  const [sections, setSections] = useState<StatuteSection[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<{ message: string; notInDemoSet: boolean } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const scrolledTo = useRef<string | null>(null);

  const codeDef = codeByCd(code);
  const target = location.hash.replace(/^#/, '');

  const load = async (force = false) => {
    try {
      const ch = await getOrFetchChapter(code.toUpperCase(), chapter.toUpperCase(), force);
      const { html: _html, ...rest } = ch;
      setMeta(rest);
      setSections(await db.listSectionsForChapter(ch.code, ch.chapter));
      setState('ready');
      setError(null);
    } catch (e) {
      setError({
        message: e instanceof Error ? e.message : 'Failed to load the chapter.',
        notInDemoSet: e instanceof StatuteFetchError && e.notInDemoSet,
      });
      setState('error');
    }
  };

  useEffect(() => {
    setState('loading');
    scrolledTo.current = null;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, chapter]);

  useEffect(() => {
    if (state !== 'ready' || !target || scrolledTo.current === target) return;
    const el = document.getElementById(`sec-${target}`);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      scrolledTo.current = target;
    }
  }, [state, target, sections]);

  /** The source line runs heading and body together ("Sec. 41.0105.
   *  EVIDENCE….  In addition…") — strip the part the card header already
   *  shows. Display only; hashes stay over the full text. */
  const bodyText = (s: StatuteSection): string => {
    let t = s.text.replace(/^(?:Sec|Art)\.\s*/, '');
    if (t.startsWith(`${s.sectionNumber}.`)) t = t.slice(s.sectionNumber.length + 1).trimStart();
    if (s.heading && t.startsWith(s.heading)) t = t.slice(s.heading.length).trimStart();
    return t;
  };

  const copyCite = async (sectionNumber: string) => {
    await navigator.clipboard.writeText(formatCite(code.toUpperCase(), sectionNumber));
    setCopied(sectionNumber);
    setTimeout(() => setCopied(null), 1500);
  };

  const refresh = async () => {
    setRefreshing(true);
    try { await load(true); } finally { setRefreshing(false); }
  };

  if (state === 'error') {
    return (
      <div>
        <div className="page-head"><div><h2>{codeDef?.name ?? code} — Chapter {chapter}</h2></div></div>
        <div className="notice">
          {error?.message}{' '}
          {error?.notInDemoSet && (
            <a href={chapterUrl(code.toUpperCase(), chapter.toUpperCase())} target="_blank" rel="noreferrer">
              Open this chapter at statutes.capitol.texas.gov instead.
            </a>
          )}
        </div>
        <Link to="/statutes">← Statute cache</Link>
      </div>
    );
  }

  if (state === 'loading') return <div className="muted">Loading chapter…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>{meta?.title ?? `${codeDef?.name ?? code} — Chapter ${chapter}`}</h2>
          <div className="sub">
            Cached {meta?.fetchedAt.slice(0, 10)} · current codification as of that date ·{' '}
            <a href={chapterUrl(code.toUpperCase(), chapter.toUpperCase())} target="_blank" rel="noreferrer">
              open at source
            </a>
          </div>
        </div>
        <div>
          <button className="btn secondary" onClick={refresh} disabled={refreshing}>
            {refreshing ? 'Refreshing…' : 'Refresh from source'}
          </button>{' '}
          <Link className="btn secondary" to="/statutes">All chapters</Link>
        </div>
      </div>

      {sections.map((s) => (
        <div
          key={s.id}
          id={`sec-${s.sectionNumber}`}
          className="card"
          style={target === s.sectionNumber ? { borderColor: 'var(--accent, #2563eb)' } : undefined}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
            <strong>
              {codeDef?.kind === 'ccp' ? 'Art.' : 'Sec.'} {s.sectionNumber}.{s.heading ? ` ${s.heading}` : ''}
            </strong>
            <span style={{ whiteSpace: 'nowrap' }}>
              <button className="btn small secondary" onClick={() => copyCite(s.sectionNumber)}>
                {copied === s.sectionNumber ? 'Copied' : 'Copy cite'}
              </button>{' '}
              <a
                className="btn small secondary"
                href={chapterUrl(code.toUpperCase(), chapter.toUpperCase(), s.sectionNumber)}
                target="_blank" rel="noreferrer"
              >
                Source
              </a>
            </span>
          </div>
          <div className="small" style={{ whiteSpace: 'pre-line', marginTop: 6 }}>{bodyText(s)}</div>
        </div>
      ))}
    </div>
  );
}
