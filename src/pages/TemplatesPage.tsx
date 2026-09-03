/**
 * The minimal in-app template editor — slice item 10.
 *
 * §1 makes Michael's ownership of routine wording changes a settled principle:
 * "Claude builds the engine, new complex templates, and new merge-field wiring;
 * Michael owns routine wording changes." A slice with no editor breaks that, so
 * this is deliberately in scope and deliberately small.
 *
 * WHAT IT IS: plain text with tokens, and a Save that PUBLISHES A NEW VERSION.
 * WHAT IT IS NOT: a styling UI. §11.4's UX pass is a later item, and per-spot
 * formatting belongs in template settings rather than in token text (FC-2).
 *
 * Editing NEVER overwrites a version. That is the contract the whole retention
 * story rests on: a served document names the version that produced it, and
 * that text has to stay recoverable afterwards.
 */

import { useEffect, useState } from 'react';
import { db } from '../data';
import type { FormTemplate, FormTemplateVersion } from '../forms/types';
import { parseTokens, toCanonical, tokenNames } from '../forms/tokens';
import { DISCLOSURE_VARIANTS } from '../forms/variants';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [versions, setVersions] = useState<FormTemplateVersion[]>([]);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.listFormTemplates()
      .then((ts) => { setTemplates(ts); setLoading(false); })
      .catch(() => { setStatus('Could not load the template bank.'); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!selectedId) { setVersions([]); setDraft(''); return; }
    db.listTemplateVersions(selectedId).then((vs) => {
      setVersions(vs);
      setDraft(vs[0]?.body ?? '');
      setNote('');
      setStatus('');
    });
  }, [selectedId]);

  const selected = templates.find((t) => t.id === selectedId) ?? null;
  const current = versions.find((v) => v.id === selected?.currentVersionId) ?? versions[0] ?? null;
  const dirty = current !== null && draft !== current.body;

  // §9's approved paragraphs carry a do-not-rewrite bar. The editor SHOWS them
  // and will publish an edit — Michael may overrule his own approved text — but
  // it says plainly what the text is, so nobody edits it without knowing.
  const isApprovedVariant = selected
    ? DISCLOSURE_VARIANTS.some((v) => v.key === selected.key)
    : false;

  const legacy = parseTokens(draft).filter((t) => t.convention === 'legacy-double-brace');

  async function publish() {
    if (!selected) return;
    try {
      // FC-1: whatever convention was typed, what gets STORED is canonical, and
      // any legacy |filter becomes a settings entry rather than being lost.
      const { text, settings } = toCanonical(draft);
      const merged = { ...(current?.settings ?? {}), ...settings };
      const published = await db.publishTemplateVersion(selected.id, text, merged, note || undefined);
      const [ts, vs] = await Promise.all([
        db.listFormTemplates(),
        db.listTemplateVersions(selected.id),
      ]);
      setTemplates(ts);
      setVersions(vs);
      setDraft(published.body);
      setNote('');
      setStatus(`Published version ${published.versionNo}. Version ${published.versionNo - 1} is unchanged and still readable below.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Publish failed.');
    }
  }

  if (loading) return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Templates</h2>
          <div className="sub">
            Plain text with tokens. Saving publishes a new version — it never overwrites one.
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Template bank — {templates.length}</h3>
        <table className="list">
          <thead>
            <tr><th>Name</th><th>Family</th><th>Format provenance</th><th>Version</th></tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr
                key={t.id}
                className="rowlink"
                onClick={() => setSelectedId(t.id)}
                style={t.id === selectedId ? { background: '#eef1f5' } : undefined}
              >
                <td>{t.name}</td>
                <td className="muted">{t.family}</td>
                <td>
                  <span className={`badge ${t.provenance === 'format-authoritative' ? 'pi' : 'status'}`}>
                    {t.provenance}
                  </span>
                </td>
                <td className="muted">
                  {versions.length && t.id === selectedId ? `v${versions[0].versionNo}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small muted" style={{ marginTop: 10 }}>
          <strong>Format provenance (FE-12):</strong> <em>format-authoritative</em> means the
          geometry came from an artifact the firm actually served. <em>proposed</em> means it has
          not been through adoption. It says nothing about whether the TEXT is approved.
        </p>
      </div>

      {selected && (
        <div className="card">
          <h3>{selected.name}</h3>

          {isApprovedVariant && (
            <p className="notice">
              <strong>This is an approved §9 paragraph.</strong> The variant library is approved
              verbatim and the build copies it rather than rewording it. You can still publish a
              change — it is your text — but a regression test compares the seeded bodies against
              the spec, so an edit here will show up as a difference from
              <code> docs/specs/form-engine.md</code> until the spec is updated in the design space.
            </p>
          )}

          {selected.family === 'fixed-sentence' && (
            <p className="notice">
              <strong>The app places this sentence itself.</strong> It is one of the two
              sentences — basis and causation — that go into every designation paragraph for
              this provider type, and the writer is shown them so its prose reads into them.
              The text was sliced out of <code>docs/specs/form-engine.md</code> §
              {String(selected.name).replace(/^§/, '').split(' ')[0]} rather than retyped.
              You can publish a change and the app will place what you publish; the drift test
              compares the spec against the generated table, not against this row, so your edit
              will not break the suite — it will simply differ from the spec until the spec is
              updated in the design space.
            </p>
          )}

          {selected.family === 'writer-instructions' && (
            <p className="notice">
              <strong>These are the instructions handed to the paragraph writer, and the
              wording is Claude’s, not yours yet.</strong> The version current when a document
              is generated is stamped on every paragraph it produced, so a served paragraph can
              always be traced to the exact instruction behind it. Nothing in the app checks
              that the writer followed any of it — that was ruled deliberately, because a
              phrase-match over returned prose just teaches you to ignore warnings. A miss shows
              on the page and is fixed in Word.
            </p>
          )}

          {selected.family === 'instrument' && (
            <p className="notice">
              <strong>This template’s body is a pointer, not the document.</strong> The instrument
              renders against the bundled .docx skeleton, which is what preserves its formatting.
              Editing the geometry is not a text edit and is not done here.
            </p>
          )}

          {selected.notes && <p className="small muted">{selected.notes}</p>}

          <label className="fld">
            <span className="lab">Body</span>
            <textarea
              rows={14}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 }}
            />
            <span className="hint">
              Tokens are written <code>{'{token}'}</code> — single brace, bare name. Legacy
              <code>{' {{token}} '}</code> is accepted and stored as canonical.
            </span>
          </label>

          <div className="small" style={{ margin: '10px 0' }}>
            <strong>Tokens in this body ({tokenNames(draft).length}):</strong>{' '}
            {tokenNames(draft).length === 0
              ? <span className="muted">none</span>
              : tokenNames(draft).map((n) => (
                <span className="badge status" key={n} style={{ marginRight: 4 }}>{n}</span>
              ))}
          </div>

          {legacy.length > 0 && (
            <p className="small muted">
              {legacy.length} legacy double-brace token{legacy.length === 1 ? '' : 's'} will be
              stored in canonical form on save; any <code>|filter</code> becomes a template setting
              rather than being dropped.
            </p>
          )}

          <label className="fld">
            <span className="lab">What changed</span>
            <input
              type="text" value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Optional — recorded against the new version"
            />
          </label>

          <div style={{ marginTop: 12 }}>
            <button className="btn" disabled={!dirty} onClick={publish}>
              Publish new version
            </button>
            {dirty && (
              <button
                className="btn secondary" style={{ marginLeft: 8 }}
                onClick={() => setDraft(current?.body ?? '')}
              >
                Discard changes
              </button>
            )}
          </div>

          {status && <p className="notice" style={{ marginTop: 10 }}>{status}</p>}

          <h3 style={{ marginTop: 20 }}>Version history</h3>
          <table className="list">
            <thead><tr><th>Version</th><th>Published</th><th>Note</th></tr></thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id}>
                  <td>
                    v{v.versionNo}
                    {v.id === selected.currentVersionId && <span className="badge pi" style={{ marginLeft: 6 }}>current</span>}
                  </td>
                  <td className="muted">{new Date(v.createdAt).toLocaleString()}</td>
                  <td className="muted">{v.changeNote ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
