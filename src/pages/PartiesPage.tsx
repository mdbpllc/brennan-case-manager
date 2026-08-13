import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { PartyRecord } from '../domain/types';
import { PARTY_TYPES, PARTY_TYPE_MAP } from '../domain/partyRegistry';
import { ALIAS_KIND_LABELS, findAliasMultiMatches, hasAnyRoleTag } from '../domain/directory';
import { db } from '../data';

export default function PartiesPage() {
  const [parties, setParties] = useState<PartyRecord[]>([]);
  // CD-1 §3.4: filtering is on ROLE TAGS, not the single party type. Multi-select,
  // because a contact can be several things at once — that is the point of tags.
  const [tags, setTags] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const [loadError, setLoadError] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    db.listParties().then(setParties).catch(() => setLoadError(true));
  }, []);

  /** §3.2 — one name resolving to two directory entries is a FLAG, never a
   *  merge. The answer ("which one?") is the attorney's. */
  const multiMatches = useMemo(() => findAliasMultiMatches(parties), [parties]);
  const flaggedIds = useMemo(
    () => new Set(multiMatches.flatMap((m) => m.contactIds)),
    [multiMatches],
  );

  const filtered = parties.filter((p) => {
    if (!hasAnyRoleTag(p.roleTags, tags)) return false;
    if (q) {
      const needle = q.toLowerCase();
      // Search covers aliases too — a contact known by a trade name should be
      // findable by it (§3.2).
      const hay = [p.displayName, ...p.aliases.map((a) => a.name)].join(' ').toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const toggleTag = (key: string) => {
    setTags((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]));
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Contact directory</h2>
          <div className="sub">
            One record per person or entity — linked across every case they touch.
            A contact can carry several role tags at once.
          </div>
        </div>
        <Link className="btn" to="/parties/new">+ New contact</Link>
      </div>

      {loadError && (
        <div className="notice">
          Couldn't load contacts from the database. If the sidebar says "Connected: central database",
          the connection or sign-in may not be set up yet — see README.
        </div>
      )}

      {multiMatches.length > 0 && (
        <div className="notice">
          <strong>
            {multiMatches.length === 1 ? 'One name resolves' : `${multiMatches.length} names resolve`}
            {' '}to more than one contact.
          </strong>{' '}
          Two separate legal entities can sit behind one storefront, so this is flagged, not merged —
          which one applies is your call.
          <ul>
            {multiMatches.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong> —{' '}
                {m.contactIds.map((id, i) => {
                  const c = parties.find((p) => p.id === id);
                  return (
                    <span key={id}>
                      {i > 0 && ', '}
                      <Link to={`/parties/${id}`}>{c?.displayName ?? id}</Link>
                    </span>
                  );
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search name or alias…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {tags.length > 0 && (
          <button type="button" className="btn-link" onClick={() => setTags([])}>
            Clear {tags.length} tag filter{tags.length === 1 ? '' : 's'}
          </button>
        )}
      </div>

      <div className="card" style={{ marginBottom: '0.75rem' }}>
        <div className="sub" style={{ marginBottom: '0.4rem' }}>Filter by role tag</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {PARTY_TYPES.map((t) => {
            const on = tags.includes(t.key);
            const count = parties.filter((p) => p.roleTags.includes(t.key)).length;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => toggleTag(t.key)}
                className={on ? 'btn' : 'btn-secondary'}
                disabled={count === 0 && !on}
                title={count === 0 ? 'No contacts carry this tag' : undefined}
              >
                {t.label} <span className="muted">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <table className="list">
          <thead>
            <tr><th>Name</th><th>Role tags</th><th>Kind</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="rowlink" onClick={() => nav(`/parties/${p.id}`)}>
                <td>
                  <Link to={`/parties/${p.id}`} onClick={(e) => e.stopPropagation()}>
                    <strong>{p.displayName}</strong>
                  </Link>
                  {p.deceased && <span className="muted"> — deceased{p.deceasedDate ? ` ${p.deceasedDate}` : ''}</span>}
                  {flaggedIds.has(p.id) && <span title="Shares a name with another contact"> ⚑</span>}
                  {p.aliases.length > 0 && (
                    <div className="muted" style={{ fontSize: '0.85em' }}>
                      {p.aliases.map((a) => `${ALIAS_KIND_LABELS[a.kind]} ${a.name}`).join(' · ')}
                    </div>
                  )}
                </td>
                <td>
                  {p.roleTags.length === 0
                    ? <span className="muted">—</span>
                    : p.roleTags.map((t) => PARTY_TYPE_MAP[t]?.label ?? t).join(', ')}
                </td>
                <td className="muted">{p.kind}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={3} className="muted">No contacts match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
