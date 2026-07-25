// The staging inbox (design §5): every recording lands here; NOTHING files
// silently. Confirm/reassign/split/hold are the only paths to a filed
// transcript, and every decision is logged (suggested vs. chosen) — the
// tuning data for ever enabling auto-file (D1: OFF in v1).
// Attorney-only until the multi-user phase (spec 8.5).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type {
  StagingItem, Transcript, TagTemplate, GlossaryTerm, RoutingDecision,
  RoutingSuggestion, TranscriptContextType, ConsentStatus, PrivilegeTier,
  OutOfStateAnswer, RecordingSource,
} from '../domain/transcripts';
import { CONTEXT_TYPE_LABELS, confirmDefaults } from '../domain/transcripts';
import { inferRouting } from '../routing/engine';
import { db } from '../data';
import { Combobox } from '../components/Combobox';

const CONTEXT_TYPES = Object.keys(CONTEXT_TYPE_LABELS) as TranscriptContextType[];

function fmtDuration(sec?: number): string {
  if (sec === undefined) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function fmtRecordedAt(v?: string): string {
  if (!v) return 'date unknown';
  return v.replace('T', ' ').slice(0, 16);
}

const SOURCE_LABELS: Record<RecordingSource, string> = {
  recorder: 'Recorder', phone: 'Phone', manual: 'Manual upload',
};

/** Transcript preview with the matched signal spans highlighted. */
function HighlightedPreview({ text, terms }: { text: string; terms: string[] }) {
  const preview = text.length > 420 ? text.slice(0, 420) + '…' : text;
  const cleaned = terms.map((t) => t.trim()).filter((t) => t.length >= 3);
  if (cleaned.length === 0) return <p className="muted" style={{ whiteSpace: 'pre-wrap' }}>{preview}</p>;
  const pattern = new RegExp(`(${cleaned.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = preview.split(pattern);
  const lowered = new Set(cleaned.map((t) => t.toLowerCase()));
  return (
    <p className="muted" style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part, i) =>
        lowered.has(part.toLowerCase()) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>)}
    </p>
  );
}

export default function InboxPage() {
  const [items, setItems] = useState<StagingItem[]>([]);
  const [transcripts, setTranscripts] = useState<Record<string, Transcript>>({});
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [parties, setParties] = useState<PartyRecord[]>([]);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [templates, setTemplates] = useState<TagTemplate[]>([]);
  const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
  const [decisions, setDecisions] = useState<RoutingDecision[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [showSettings, setShowSettings] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState('');

  const refresh = useCallback(async () => {
    try {
      const [its, cs, ps, tpls, gts, decs] = await Promise.all([
        db.listStagingItems(), db.listCases(), db.listParties(),
        db.listTagTemplates(), db.listGlossaryTerms(), db.listRoutingDecisions(),
      ]);
      const trs = await Promise.all(its.map((i) => db.getTranscript(i.transcriptId)));
      const linkLists = await Promise.all(cs.map((c) => db.listLinksForCase(c.id)));
      setItems(its);
      setTranscripts(Object.fromEntries(trs.filter(Boolean).map((tr) => [(tr as Transcript).id, tr as Transcript])));
      setCases(cs);
      setParties(ps);
      setLinks(linkLists.flat());
      setTemplates(tpls);
      setGlossary(gts);
      setDecisions(decs);
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const caseById = useMemo(() => new Map(cases.map((c) => [c.id, c])), [cases]);
  const q = search.trim().toLowerCase();
  const matchesSearch = (item: StagingItem) =>
    !q || (transcripts[item.transcriptId]?.text.toLowerCase().includes(q) ?? false);
  const pending = items.filter((i) => i.status === 'pending' && matchesSearch(i));
  const held = items.filter((i) => i.status === 'held' && matchesSearch(i));
  const processed = items.filter((i) => i.status === 'confirmed' || i.status === 'dismissed');

  if (loadState === 'error') {
    return <div className="notice">Couldn't load the inbox. Check the database connection and refresh.</div>;
  }
  if (loadState === 'loading') return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Transcript inbox</h2>
          <div className="sub">
            Nothing files itself — every recording waits here for your confirmation. Auto-file is off (design D1).
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn small secondary" onClick={() => setShowImport((v) => !v)}>
            {showImport ? 'Close import' : 'Import pipeline output'}
          </button>
          <button className="btn small secondary" onClick={() => setShowSettings((v) => !v)}>
            {showSettings ? 'Hide routing settings' : 'Routing settings'}
          </button>
        </div>
      </div>

      {showImport && <ImportCard cases={cases} parties={parties} links={links} templates={templates} onDone={() => { setShowImport(false); refresh(); }} />}
      {showSettings && (
        <RoutingSettings
          templates={templates} glossary={glossary} decisions={decisions}
          caseById={caseById} onChange={refresh}
        />
      )}

      <div className="filters" style={{ marginBottom: 10 }}>
        <input
          type="search" placeholder="Search inbox transcripts…" value={search}
          onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 280 }}
        />
        <span className="muted">{pending.length} pending{held.length > 0 ? ` · ${held.length} on hold` : ''}</span>
      </div>

      {pending.length === 0 && held.length === 0 && (
        <div className="notice">Inbox is clear. New recordings land here after transcription.</div>
      )}

      {pending.map((item) => (
        <StagingCard
          key={item.id} item={item} transcript={transcripts[item.transcriptId]}
          cases={cases} caseById={caseById} onDone={refresh}
        />
      ))}

      {held.length > 0 && (
        <>
          <h3 style={{ margin: '18px 0 8px' }}>On hold</h3>
          {held.map((item) => (
            <StagingCard
              key={item.id} item={item} transcript={transcripts[item.transcriptId]}
              cases={cases} caseById={caseById} onDone={refresh}
            />
          ))}
        </>
      )}

      {processed.length > 0 && (
        <details style={{ marginTop: 18 }}>
          <summary className="muted" style={{ cursor: 'pointer' }}>
            Processed items ({processed.length})
          </summary>
          <table className="list" style={{ marginTop: 8 }}>
            <thead><tr><th>Recorded</th><th>Status</th><th>Filed to</th><th>Transcript</th></tr></thead>
            <tbody>
              {processed.map((i) => {
                const tr = transcripts[i.transcriptId];
                return (
                  <tr key={i.id}>
                    <td>{fmtRecordedAt(i.recordedAt)}</td>
                    <td><span className={`badge ${i.status === 'confirmed' ? 'conf-confirmed' : 'conf-none'}`}>{i.status}</span></td>
                    <td>{tr && tr.caseIds.length > 0
                      ? tr.caseIds.map((cid) => caseById.get(cid)?.fileNumber ?? '?').join(', ')
                      : <span className="muted">—</span>}</td>
                    <td>{tr && tr.caseIds.length > 0
                      ? <Link to={`/cases/${tr.caseIds[0]}/transcripts/${tr.id}`}>open</Link>
                      : <span className="muted">not filed</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </details>
      )}
    </div>
  );
}

/* ================= Staging item card ================= */

function StagingCard({ item, transcript, cases, caseById, onDone }: {
  item: StagingItem;
  transcript?: Transcript;
  cases: CaseRecord[];
  caseById: Map<string, CaseRecord>;
  onDone: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const best: RoutingSuggestion | undefined = item.suggestions[0];
  const alternatives = item.suggestions.slice(1);
  const signalTexts = (best?.signals ?? []).map((s) => s.matchedText);

  const hold = async () => {
    await db.updateStagingItem(item.id, { status: item.status === 'held' ? 'pending' : 'held' });
    await db.appendRoutingDecision({
      stagingItemId: item.id, suggestedCaseId: best?.caseId,
      suggestedContextType: best?.contextType, suggestedConfidence: best?.confidence,
      chosenCaseIds: [], action: 'held', wasSuggestionAccepted: false,
    });
    onDone();
  };

  const notCaseRelated = async () => {
    // Disposition of non-case recordings is open item O3 — until Michael
    // decides, the item is kept (dismissed) with its decision logged.
    await db.updateStagingItem(item.id, { status: 'dismissed' });
    await db.appendRoutingDecision({
      stagingItemId: item.id, suggestedCaseId: best?.caseId,
      suggestedContextType: best?.contextType, suggestedConfidence: best?.confidence,
      chosenCaseIds: [], action: 'not-case-related', wasSuggestionAccepted: !best?.caseId,
    });
    await db.appendReviewLog({
      entityType: 'staging_item', entityId: item.id, action: 'rejected',
      user: 'Michael', reason: 'Not case-related — kept unfiled pending the O3 disposition decision.',
    });
    onDone();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
        <div>
          <strong>{fmtRecordedAt(item.recordedAt)}</strong>
          <span className="muted"> · {fmtDuration(item.durationSeconds)} min</span>
          <span className={`badge source-${item.source}`} style={{ marginLeft: 8 }}>{SOURCE_LABELS[item.source]}</span>
          {best && <span className={`badge conf-${best.confidence}`} style={{ marginLeft: 4 }}>{best.confidence} confidence</span>}
        </div>
        {!confirming && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button className="btn small" onClick={() => setConfirming(true)}>
              {best?.caseId ? 'Confirm…' : 'Assign…'}
            </button>
            <button className="btn small secondary" onClick={hold}>
              {item.status === 'held' ? 'Resume' : 'Hold'}
            </button>
            <button className="btn small secondary" onClick={notCaseRelated}>Not case-related</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        {best?.caseId ? (
          <div>
            Best guess:{' '}
            <strong>{caseById.get(best.caseId)?.fileNumber} — {caseById.get(best.caseId)?.caption || caseById.get(best.caseId)?.caseType}</strong>
            {best.contextType && <> · {CONTEXT_TYPE_LABELS[best.contextType]}</>}
            {alternatives.length > 0 && (
              <span className="muted">
                {' '}(alternatives: {alternatives.map((a) => a.caseId ? caseById.get(a.caseId)?.fileNumber : '—').filter(Boolean).join(', ')})
              </span>
            )}
          </div>
        ) : (
          <div className="muted">
            No case candidate — needs manual assignment.
            {best?.contextType && <> Looks like: {CONTEXT_TYPE_LABELS[best.contextType]}.</>}
          </div>
        )}
      </div>

      {best && best.signals.length > 0 && (
        <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {best.signals.map((s, i) => (
            <span className="badge signal" key={i} title={s.resolvedTo}>
              {s.kind === 'tag_template' ? 'spoken tag' : `"${s.matchedText}"`} → {s.resolvedTo}
            </span>
          ))}
        </div>
      )}

      {item.advisories.map((a, i) => (
        <div className="notice" key={i} style={{ marginTop: 8, marginBottom: 0 }}>{a}</div>
      ))}

      {transcript && (
        <div style={{ marginTop: 8 }}>
          <HighlightedPreview text={transcript.text} terms={signalTexts} />
        </div>
      )}

      {confirming && transcript && (
        <ConfirmPanel
          item={item} transcript={transcript} cases={cases} best={best}
          onCancel={() => setConfirming(false)}
          onDone={() => { setConfirming(false); onDone(); }}
        />
      )}
    </div>
  );
}

/* ================= Confirm panel — the three quick fields ================= */

function ConfirmPanel({ item, transcript, cases, best, onCancel, onDone }: {
  item: StagingItem;
  transcript: Transcript;
  cases: CaseRecord[];
  best?: RoutingSuggestion;
  onCancel: () => void;
  onDone: () => void;
}) {
  const [caseIds, setCaseIds] = useState<string[]>(best?.caseId ? [best.caseId] : []);
  const [splitting, setSplitting] = useState(false);
  const [contextType, setContextType] = useState<TranscriptContextType>(best?.contextType ?? 'dictation');
  const defaults = confirmDefaults(contextType);
  // The three quick fields (design §5) — pre-filled, correctable.
  const [consent, setConsent] = useState<ConsentStatus>('one-party');
  const [outOfState, setOutOfState] = useState<OutOfStateAnswer>('unknown');
  const [privilege, setPrivilege] = useState<PrivilegeTier>(defaults.privilegeTier);
  const [phi, setPhi] = useState(defaults.phiFlag);
  const [discoverable, setDiscoverable] = useState(defaults.discoverableFlag);
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  // Re-derive pre-fills when the context type changes, unless Michael already overrode them.
  const onTypeChange = (ct: TranscriptContextType) => {
    setContextType(ct);
    if (!touched) {
      const d = confirmDefaults(ct);
      setPrivilege(d.privilegeTier);
      setPhi(d.phiFlag);
      setDiscoverable(d.discoverableFlag);
    }
  };

  const caseOptions = cases.map((c) => ({
    value: c.id, label: `${c.fileNumber} — ${c.caption || c.caseType}`, sublabel: c.practiceArea,
  }));

  const file = async () => {
    if (caseIds.length === 0 || saving) return;
    setSaving(true);
    const accepted = Boolean(best?.caseId && caseIds.length === 1 && caseIds[0] === best.caseId);
    const action = caseIds.length > 1 ? 'split' : accepted ? 'confirmed' : 'reassigned';
    await db.updateTranscript(transcript.id, {
      caseIds, contextType, consentStatus: consent, outOfStateParticipant: outOfState,
      privilegeTier: privilege, phiFlag: phi, discoverableFlag: discoverable,
      status: 'unprocessed',
    });
    await db.updateStagingItem(item.id, { status: 'confirmed' });
    await db.appendRoutingDecision({
      stagingItemId: item.id,
      suggestedCaseId: best?.caseId, suggestedContextType: best?.contextType,
      suggestedConfidence: best?.confidence,
      chosenCaseIds: caseIds, chosenContextType: contextType,
      action, wasSuggestionAccepted: accepted,
    });
    await db.appendReviewLog({
      entityType: 'transcript', entityId: transcript.id, action: 'confirmed',
      user: 'Michael',
      reason: `Filed from inbox (${action}): ${CONTEXT_TYPE_LABELS[contextType]}; consent ${consent}; out-of-state ${outOfState}; ${privilege}${phi ? '; PHI' : ''}${discoverable ? '; presumptively discoverable' : ''}`,
    });
    onDone();
  };

  return (
    <div style={{ marginTop: 10, padding: 12, background: '#f7f8fa', borderRadius: 6 }}>
      <div className="form-grid">
        <div className="fld full">
          <span className="lab">{splitting ? 'Matters (this recording touches more than one)' : 'Matter'}</span>
          {splitting ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {caseOptions.map((o) => (
                <label className="check" key={o.value}>
                  <input
                    type="checkbox" checked={caseIds.includes(o.value)}
                    onChange={(e) => setCaseIds((ids) =>
                      e.target.checked ? [...ids, o.value] : ids.filter((x) => x !== o.value))}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          ) : (
            <Combobox
              options={caseOptions} value={caseIds[0] ?? ''}
              onChange={(v) => setCaseIds(v ? [v] : [])} placeholder="Choose the matter…"
            />
          )}
          <button
            className="btn small secondary" style={{ marginTop: 6, alignSelf: 'flex-start' }}
            onClick={() => setSplitting((s) => !s)}
          >
            {splitting ? 'Single matter' : 'Split across matters…'}
          </button>
        </div>
        <label className="fld">
          <span className="lab">Context type</span>
          <select value={contextType} onChange={(e) => onTypeChange(e.target.value as TranscriptContextType)}>
            {CONTEXT_TYPES.map((ct) => <option key={ct} value={ct}>{CONTEXT_TYPE_LABELS[ct]}</option>)}
          </select>
        </label>
        <label className="fld">
          <span className="lab">Consent status</span>
          <select value={consent} onChange={(e) => setConsent(e.target.value as ConsentStatus)}>
            <option value="announced">Announced</option>
            <option value="written">Written</option>
            <option value="one-party">One-party</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="fld">
          <span className="lab">Out-of-state participant?</span>
          <select value={outOfState} onChange={(e) => setOutOfState(e.target.value as OutOfStateAnswer)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="fld">
          <span className="lab">Privilege tier</span>
          <select value={privilege} onChange={(e) => { setPrivilege(e.target.value as PrivilegeTier); setTouched(true); }}>
            <option value="privileged">Privileged — attorney-client</option>
            <option value="work-product">Work product</option>
            <option value="non-privileged">Non-privileged</option>
          </select>
        </label>
        <div className="fld">
          <span className="lab">Flags</span>
          <label className="check">
            <input type="checkbox" checked={phi} onChange={(e) => { setPhi(e.target.checked); setTouched(true); }} />
            PHI
          </label>
          <label className="check">
            <input type="checkbox" checked={discoverable} onChange={(e) => { setDiscoverable(e.target.checked); setTouched(true); }} />
            Presumptively discoverable
          </label>
        </div>
      </div>
      {outOfState !== 'no' && (
        <div className="notice" style={{ marginTop: 8, marginBottom: 0 }}>
          Out-of-state participants can mean all-party-consent exposure (potentially criminal, not just
          ethical). Rule status: unverified — this is a warning, not a legal determination.
        </div>
      )}
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={file} disabled={caseIds.length === 0 || saving}>
          {saving ? 'Filing…' : caseIds.length > 1 ? `File to ${caseIds.length} matters` : 'File transcript'}
        </button>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ================= Import pipeline output (demo-mode handoff, design §8) ================= */

function ImportCard({ cases, parties, links, templates, onDone }: {
  cases: CaseRecord[]; parties: PartyRecord[]; links: CasePartyLink[];
  templates: TagTemplate[]; onDone: () => void;
}) {
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');

  const runImport = async () => {
    setError('');
    let bundle: {
      text?: string; recordedAt?: string; durationSeconds?: number;
      audioHash?: string; source?: string; speakerCount?: number;
      words?: Transcript['words'];
    };
    try {
      bundle = JSON.parse(raw);
    } catch {
      setError('Not valid JSON. Paste the /process endpoint output (or a {"text": "..."} object).');
      return;
    }
    if (!bundle.text || typeof bundle.text !== 'string') {
      setError('The bundle needs a "text" field with the transcript text.');
      return;
    }
    const source: RecordingSource =
      bundle.source === 'recorder' || bundle.source === 'phone' ? bundle.source : 'manual';
    const suggestions = inferRouting(
      { text: bundle.text, speakerCount: bundle.speakerCount },
      { cases, parties, links, templates },
    );
    const best = suggestions[0];
    const transcript = await db.createTranscript({
      caseIds: [], audioHash: bundle.audioHash, durationSeconds: bundle.durationSeconds,
      recordedAt: bundle.recordedAt, source, engine: 'parakeet-tdt-0.6b-v3',
      text: bundle.text, words: bundle.words, status: 'unprocessed', verified: false,
      contextType: best?.contextType ?? 'dictation', consentStatus: 'unknown',
      outOfStateParticipant: 'unknown', privilegeTier: 'work-product',
      phiFlag: false, discoverableFlag: false,
    });
    await db.createStagingItem({
      audioHash: bundle.audioHash ?? `manual-${Date.now()}`, source,
      durationSeconds: bundle.durationSeconds, recordedAt: bundle.recordedAt,
      transcriptId: transcript.id, suggestions,
      advisories: best?.signals.some((s) => s.kind === 'tag_template')
        ? [] : ['No spoken tag detected — routed by content inference.'],
      status: 'pending',
    });
    setRaw('');
    onDone();
  };

  return (
    <div className="card">
      <h3>Import pipeline output</h3>
      <p className="muted">
        Paste the JSON bundle from the local pipeline's /process endpoint (demo-mode handoff —
        with the central database connected, the service writes staging rows itself).
        Minimum: <code>{'{"text": "…"}'}</code>; also honored: recordedAt, durationSeconds,
        audioHash, source, speakerCount, words.
      </p>
      <textarea
        value={raw} onChange={(e) => setRaw(e.target.value)} rows={6}
        style={{ width: '100%' }} placeholder='{"text": "This is a dictation for the …"}'
      />
      {error && <div className="notice" style={{ marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 8 }}>
        <button className="btn small" onClick={runImport} disabled={!raw.trim()}>Run routing & stage</button>
      </div>
    </div>
  );
}

/* ================= Routing settings: templates, glossary, decision log ================= */

function RoutingSettings({ templates, glossary, decisions, caseById, onChange }: {
  templates: TagTemplate[]; glossary: GlossaryTerm[]; decisions: RoutingDecision[];
  caseById: Map<string, CaseRecord>; onChange: () => void;
}) {
  const [newPattern, setNewPattern] = useState('');
  const [newType, setNewType] = useState<TranscriptContextType>('dictation');
  const [newTerm, setNewTerm] = useState('');

  const accepted = decisions.filter((d) => d.wasSuggestionAccepted).length;

  return (
    <div className="card">
      <h3>Routing settings</h3>

      <h4 style={{ margin: '4px 0 6px' }}>Spoken-tag templates</h4>
      <p className="muted" style={{ marginTop: 0 }}>
        Say one of these at the start of a recording and routing is (near-)automatic. Slots in
        braces: <code>{'{matter}'}</code>, <code>{'{carrier}'}</code>, <code>{'{cause}'}</code>,
        <code>{'{client}'}</code>, <code>{'{opposing}'}</code>. New phrasings are rows, not rebuilds.
      </p>
      <table className="list">
        <thead><tr><th>Pattern</th><th>Context type</th><th>Discoverable flag</th><th></th></tr></thead>
        <tbody>
          {templates.map((tpl) => (
            <tr key={tpl.id}>
              <td>“{tpl.pattern}”</td>
              <td>{CONTEXT_TYPE_LABELS[tpl.contextType]}</td>
              <td>{tpl.appliesDiscoverable ? 'auto-applies' : '—'}</td>
              <td>
                <button
                  className="btn small danger"
                  onClick={async () => { await db.deleteTagTemplate(tpl.id); onChange(); }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="filters" style={{ marginTop: 8 }}>
        <input
          type="text" placeholder='New pattern, e.g. "client call {matter} matter"'
          value={newPattern} onChange={(e) => setNewPattern(e.target.value)} style={{ minWidth: 320 }}
        />
        <select value={newType} onChange={(e) => setNewType(e.target.value as TranscriptContextType)}>
          {CONTEXT_TYPES.map((ct) => <option key={ct} value={ct}>{CONTEXT_TYPE_LABELS[ct]}</option>)}
        </select>
        <button
          className="btn small" disabled={!newPattern.trim()}
          onClick={async () => {
            await db.createTagTemplate({
              pattern: newPattern.trim().toLowerCase(), contextType: newType,
              appliesDiscoverable: newType === 'witness_interview',
            });
            setNewPattern('');
            onChange();
          }}
        >
          Add template
        </button>
      </div>

      <h4 style={{ margin: '16px 0 6px' }}>Firm glossary (vocabulary boosting)</h4>
      <p className="muted" style={{ marginTop: 0 }}>
        Legal terms-of-art the transcription engine should favor. Party and case names are boosted
        automatically — no rows needed for names.
      </p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {glossary.map((g) => (
          <span className="badge status" key={g.id}>
            {g.term}{g.scope === 'case' ? ' (case)' : ''}
            <button
              style={{ marginLeft: 6, border: 'none', background: 'none', cursor: 'pointer', color: 'inherit' }}
              title="Remove" onClick={async () => { await db.deleteGlossaryTerm(g.id); onChange(); }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="filters" style={{ marginTop: 8 }}>
        <input
          type="text" placeholder="New term…" value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
        />
        <button
          className="btn small" disabled={!newTerm.trim()}
          onClick={async () => {
            await db.createGlossaryTerm({ term: newTerm.trim(), scope: 'firm', weight: 1 });
            setNewTerm('');
            onChange();
          }}
        >
          Add term
        </button>
      </div>

      <h4 style={{ margin: '16px 0 6px' }}>Routing decision log</h4>
      <p className="muted" style={{ marginTop: 0 }}>
        Suggested vs. chosen on every decision — the evidence for ever turning on auto-file.
        {decisions.length > 0 && <> Suggestion accepted {accepted} of {decisions.length}.</>}
      </p>
      {decisions.length === 0 ? (
        <p className="muted">No decisions logged yet.</p>
      ) : (
        <table className="list">
          <thead><tr><th>When</th><th>Suggested</th><th>Chosen</th><th>Action</th><th>Accepted?</th></tr></thead>
          <tbody>
            {decisions.slice(0, 25).map((d) => (
              <tr key={d.id}>
                <td>{d.decidedAt.slice(0, 16).replace('T', ' ')}</td>
                <td>{d.suggestedCaseId ? caseById.get(d.suggestedCaseId)?.fileNumber ?? '?' : '—'}
                  {d.suggestedConfidence && <span className={`badge conf-${d.suggestedConfidence}`} style={{ marginLeft: 4 }}>{d.suggestedConfidence}</span>}</td>
                <td>{d.chosenCaseIds.length > 0 ? d.chosenCaseIds.map((c) => caseById.get(c)?.fileNumber ?? '?').join(', ') : '—'}</td>
                <td>{d.action}</td>
                <td>{d.wasSuggestionAccepted ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
