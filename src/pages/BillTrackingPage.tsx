// Pending-bill tracking (design Module B, T3). Advisory throughout: matched
// bills raise watch flags on registry entries; nothing here states what a
// bill "does" as fact, and verified status is untouchable (§8).

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LegalRule } from '../domain/billing';
import type { BillStatuteRef, TrackedBill, WatchTarget } from '../domain/bills';
import type { WatchFlag } from '../domain/statutes';
import { db, usingSupabase } from '../data';
import { importPollResults, parseBundle, reprocessTrackedBills, type ImportSummary } from '../bills/importPoll';
import { syncDerivedWatchTargets } from '../bills/watchTargets';

const STATUS_LABEL: Record<TrackedBill['status'], string> = {
  introduced: 'Introduced', engrossed: 'Engrossed', enrolled: 'Enrolled',
  passed: 'PASSED', vetoed: 'Vetoed', dead: 'Died',
};

export default function BillTrackingPage() {
  const [bills, setBills] = useState<TrackedBill[]>([]);
  const [refsByBill, setRefsByBill] = useState<Map<string, BillStatuteRef[]>>(new Map());
  const [targets, setTargets] = useState<WatchTarget[]>([]);
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [flags, setFlags] = useState<WatchFlag[]>([]);
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [newPhrase, setNewPhrase] = useState('');
  const [newNote, setNewNote] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    const [billList, allRefs, targetList, ruleList, flagList] = await Promise.all([
      db.listTrackedBills(), db.listAllBillRefs(), db.listWatchTargets(),
      db.listLegalRules(), db.listWatchFlags(true),
    ]);
    setBills(billList);
    const grouped = new Map<string, BillStatuteRef[]>();
    for (const r of allRefs) {
      const list = grouped.get(r.trackedBillId);
      if (list) list.push(r); else grouped.set(r.trackedBillId, [r]);
    }
    setRefsByBill(grouped);
    setTargets(targetList);
    setRules(ruleList);
    setFlags(flagList);
  }, []);

  useEffect(() => {
    // Keep derived targets in sync with the registry on every visit (design
    // B: the live list regenerates from registry cites).
    syncDerivedWatchTargets().then(refresh);
  }, [refresh]);

  const showSummary = (label: string, s: ImportSummary) => {
    setReport([
      `${label}: ${s.billsImported} bill(s) processed · ${s.flagsRaised} flag(s) raised · ${s.flagsCleared} cleared.`,
      ...s.log,
    ]);
  };

  const runDemoRound = async (round: 1 | 2) => {
    setBusy(true);
    try {
      const bundle = round === 1
        ? (await import('../bills/fixtures/demo-poll-round1.json')).default
        : (await import('../bills/fixtures/demo-poll-round2.json')).default;
      showSummary(`Demo poll round ${round}`, await importPollResults(bundle));
    } finally {
      setBusy(false);
      refresh();
    }
  };

  const importFile = async (file: File) => {
    setBusy(true);
    try {
      showSummary(`Imported ${file.name}`, await importPollResults(parseBundle(await file.text())));
    } catch (e) {
      setReport([e instanceof Error ? e.message : 'Import failed.']);
    } finally {
      setBusy(false);
      refresh();
    }
  };

  const rerunMatcher = async () => {
    setBusy(true);
    try {
      showSummary('Matcher re-run over tracked bills', await reprocessTrackedBills());
    } finally {
      setBusy(false);
      refresh();
    }
  };

  const addManualTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhrase.trim()) return;
    await db.createWatchTarget({ kind: 'manual', citeOrQuery: newPhrase.trim(), note: newNote.trim() || undefined, active: true });
    setNewPhrase('');
    setNewNote('');
    refresh();
  };

  const affectedRules = (billNumber: string): string[] =>
    [...new Set(flags.filter((f) => f.sourceRef === billNumber)
      .map((f) => rules.find((r) => r.id === f.ruleId)?.ruleKey ?? f.ruleId))];

  const refLabel = (r: BillStatuteRef) => `${r.code} ${r.section ?? `ch. ${r.chapter}`}`;
  const derived = targets.filter((t) => t.kind === 'registry-derived');
  const manual = targets.filter((t) => t.kind === 'manual');

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Bill tracking</h2>
          <div className="sub">
            Pending Texas legislation touching registry-cited statutes — advisory flags only; you decide what a bill means.
          </div>
        </div>
      </div>

      <div className="notice">
        {usingSupabase
          ? 'Live polling runs on a schedule via the legiscan-poller function (docs/statute-cache-setup.md); this page also accepts manual poll-result imports.'
          : 'Demo mode: no LegiScan API calls are made. Run the fictional demo poll rounds below, or import a poll-result JSON.'}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <strong>Tracked bills</strong>
          <span>
            {!usingSupabase && (
              <>
                <button className="btn small" onClick={() => runDemoRound(1)} disabled={busy}>Demo poll — round 1 (introductions)</button>{' '}
                <button className="btn small" onClick={() => runDemoRound(2)} disabled={busy}>Round 2 (outcomes)</button>{' '}
              </>
            )}
            <button className="btn small secondary" onClick={() => fileInput.current?.click()} disabled={busy}>Import poll results…</button>{' '}
            <button className="btn small secondary" onClick={rerunMatcher} disabled={busy || bills.length === 0}>Re-run matcher</button>
            <input
              ref={fileInput} type="file" accept=".json,application/json" style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = ''; }}
            />
          </span>
        </div>
        {report.length > 0 && (
          <div className="small" style={{ marginTop: 6 }}>
            {report.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        )}
        <table className="list" style={{ marginTop: 6 }}>
          <thead><tr><th>Bill</th><th>Title</th><th>Status</th><th>Effective</th><th>Touches</th><th>Flagged rules</th><th>Last polled</th></tr></thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b.id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {b.url ? <a href={b.url} target="_blank" rel="noreferrer">{b.billNumber}</a> : b.billNumber}
                  {b.sessionName && <div className="small muted">{b.sessionName}</div>}
                </td>
                <td className="small" style={{ maxWidth: 300 }}>{b.title}</td>
                <td><span className="badge status">{STATUS_LABEL[b.status]}</span></td>
                <td className="small muted">{b.effectiveDate ?? '—'}</td>
                <td className="small muted">{(refsByBill.get(b.id) ?? []).map(refLabel).join(', ') || '—'}</td>
                <td className="small">
                  {affectedRules(b.billNumber).map((k) => <div key={k}><Link to="/rules">{k}</Link></div>)}
                  {affectedRules(b.billNumber).length === 0 && <span className="muted">—</span>}
                </td>
                <td className="small muted">{b.lastPolled.slice(0, 10)}</td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr><td colSpan={7} className="muted">No bills tracked yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <strong>Watch targets</strong>
        <div className="small muted">
          Derived targets regenerate from Legal Rule Registry cites automatically; manual sweeps are yours to curate
          (seeded from the design-space watch-targets doc).
        </div>
        <div className="small" style={{ marginTop: 6 }}>
          <strong>Registry-derived ({derived.length}):</strong>{' '}
          {derived.map((t) => t.citeOrQuery).join(' · ') || '—'}
        </div>
        <table className="list" style={{ marginTop: 6 }}>
          <thead><tr><th>Manual sweep phrase</th><th>Group</th><th>Active</th><th></th></tr></thead>
          <tbody>
            {manual.map((t) => (
              <tr key={t.id}>
                <td>{t.citeOrQuery}</td>
                <td className="small muted">{t.note}</td>
                <td>
                  <input
                    type="checkbox" checked={t.active}
                    onChange={async (e) => { await db.updateWatchTarget(t.id, { active: e.target.checked }); refresh(); }}
                  />
                </td>
                <td>
                  <button className="btn small secondary" onClick={async () => { await db.deleteWatchTarget(t.id); refresh(); }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={addManualTarget} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input style={{ flex: 2 }} placeholder='New sweep phrase, e.g. "letter of protection"' value={newPhrase} onChange={(e) => setNewPhrase(e.target.value)} />
          <input style={{ flex: 1 }} placeholder="Note / group (optional)" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          <button className="btn small" type="submit">Add</button>
        </form>
      </div>

      <div className="small muted" style={{ marginTop: 8 }}>
        Legislative data: LegiScan (CC BY 4.0). Accessed via the LegiScan API only; no content redistributed outside this app.
      </div>
    </div>
  );
}
