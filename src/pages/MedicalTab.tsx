// Medical tab (Phase 1a): bill ledger, case roll-up, batch analyze, reports.
// Bills attach at the provider-business level (§10); each bill opens its own
// workspace for line items, mapping, EOB, and analysis.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CaseRecord, PartyRecord } from '../domain/types';
import type { AnalysisRun, BillType, FeeSchedule, GeneratedDocument, LegalRule, MedicalBill } from '../domain/billing';
import { ATTORNEY_USER, DISCLAIMER_TEXT, outstandingAmount, settlementEligibleRuns } from '../domain/billing';
import type { CaseClient } from '../domain/client';
import { isResolved, showsClientLayer, sortClients } from '../domain/client';
import { computeAnalysis, runScheduleSelection } from '../analysis/benchmark';
import { runStalenessReasons } from '../analysis/staleness';
import { db } from '../data';
import ProvidersSection from '../components/ProvidersSection';
import MarkdownLite from '../components/MarkdownLite';
import { Combobox } from '../components/Combobox';

function money(n: number | undefined): string {
  if (n === undefined) return '—';
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function MedicalTab({ caseRec }: { caseRec: CaseRecord }) {
  const [allBills, setAllBills] = useState<MedicalBill[]>([]);
  const [clients, setClients] = useState<CaseClient[]>([]);
  const [clientParties, setClientParties] = useState<Record<string, string>>({});
  /** null = "All clients" (the roll-up view). Only ever offered when a second
   *  client exists — D-CL2-7: a single-client case looks exactly as today. */
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [runs, setRuns] = useState<AnalysisRun[]>([]);
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [providers, setProviders] = useState<PartyRecord[]>([]);
  const [schedules, setSchedules] = useState<FeeSchedule[]>([]);
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [bs, rs, ds, links, scheds, lrs, cls] = await Promise.all([
      db.listBillsForCase(caseRec.id),
      db.listRunsForCase(caseRec.id),
      db.listDocumentsForCase(caseRec.id),
      db.listLinksForCase(caseRec.id),
      db.listFeeSchedules(),
      db.listLegalRules(),
      db.listClientsForCase(caseRec.id),
    ]);
    setAllBills(bs);
    setRuns(rs);
    setDocs(ds);
    setSchedules(scheds);
    setRules(lrs);
    setClients(sortClients(cls));
    const parties = await db.getParties([
      ...links.map((l) => l.partyId),
      ...cls.map((c) => c.partyId),
    ]);
    setProviders(parties.filter((p) => p.partyType === 'providerBusiness'));
    setClientParties(Object.fromEntries(parties.map((p) => [p.id, p.displayName])));
  }, [caseRec.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const multiClient = showsClientLayer(clients);
  const clientName = useCallback(
    (c: CaseClient) => clientParties[c.partyId] ?? '(party not found)',
    [clientParties],
  );

  /** The ledger below this line is per-client whenever a client is selected.
   *  Pooling bills across bodies distorts paid-or-incurred and the Ch. 146 cap
   *  input, which is why the bill carries a client at all (§3.1). */
  const bills = useMemo(
    () => (selectedClientId ? allBills.filter((b) => b.clientId === selectedClientId) : allBills),
    [allBills, selectedClientId],
  );

  /** Bills the backfill could not assign — only possible on a flagged case or
   *  after a second client arrives. Surfaced rather than silently pooled. */
  const unassignedCount = useMemo(
    () => (multiClient ? allBills.filter((b) => !b.clientId).length : 0),
    [allBills, multiClient],
  );

  const providerName = useCallback(
    (id?: string) => providers.find((p) => p.id === id)?.displayName,
    [providers],
  );

  /** Latest run per bill — provisional or confirmed — for the list badges. */
  const latestRunByBill = useMemo(() => {
    const map = new Map<string, AnalysisRun>();
    for (const r of runs) if (!map.has(r.billId)) map.set(r.billId, r); // runs sorted newest first
    return map;
  }, [runs]);

  /** run id → staleness reasons (empty = current inputs). */
  const staleness = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const r of runs) m.set(r.id, runStalenessReasons(r, schedules, rules));
    return m;
  }, [runs, schedules, rules]);

  // Roll-up follows the selection: with a client picked it is THAT client's
  // ledger, so each client's totals stand independently.
  const rollup = useMemo(() => {
    const billed = bills.reduce((s, b) => s + b.billedAmount, 0);
    const outstanding = bills.reduce((s, b) => s + outstandingAmount(b), 0);
    const eligible = settlementEligibleRuns(runs); // newest first, confirmed only
    const confirmedRuns = bills
      .map((b) => eligible.find((r) => r.billId === b.id))
      .filter((r): r is AnalysisRun => Boolean(r));
    const confBilled = confirmedRuns.reduce((s, r) => s + r.totals.confirmedBilled, 0);
    const confBench = confirmedRuns.reduce((s, r) => s + r.totals.confirmedBenchmark, 0);
    return {
      billed, outstanding,
      confirmedRunCount: confirmedRuns.length,
      confirmedRatio: confBench > 0 ? confBilled / confBench : undefined,
      staleConfirmedCount: confirmedRuns.filter((r) => (staleness.get(r.id) ?? []).length > 0).length,
    };
  }, [bills, runs, staleness]);

  const analyzeAll = async () => {
    setBusy(true);
    try {
      const [schedules, rules] = await Promise.all([db.listFeeSchedules(), db.listLegalRules()]);
      const rates = await db.listRates(schedules.map((s) => s.id));
      for (const bill of bills) {
        const lines = await db.listLineItems(bill.id);
        if (lines.length === 0) continue;
        const { run, resultLines } = computeAnalysis({
          bill, lines, schedules, rates, registryRules: rules, makeId: () => crypto.randomUUID(),
        });
        await db.createRun(run, resultLines);
        await db.appendReviewLog({
          entityType: 'analysis_run', entityId: run.id, action: 'created', user: ATTORNEY_USER,
          reason: 'Batch analyze all bills', newValue: `provisional run for ${bill.label}`,
        });
      }
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {/* D-CL2-7: this whole block is absent on a single-client case. */}
      {multiClient && (
        <div className="card">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <strong>Client:</strong>
            <button
              className={`btn small ${selectedClientId === null ? '' : 'secondary'}`}
              onClick={() => setSelectedClientId(null)}
            >All clients</button>
            {clients.map((c) => (
              <button
                key={c.id}
                className={`btn small ${selectedClientId === c.id ? '' : 'secondary'}`}
                onClick={() => setSelectedClientId(c.id)}
              >
                {clientName(c)}{isResolved(c) ? ' — disbursed' : ''}
              </button>
            ))}
          </div>
          <div className="muted" style={{ marginTop: 6, fontSize: '0.85em' }}>
            This case has {clients.length} clients, so bills and totals are kept per client — a bill
            belongs to a body, and pooling them would distort paid-or-incurred and the Ch. 146 cap input.
          </div>
          {unassignedCount > 0 && (
            <div className="notice" style={{ marginTop: 8 }}>
              <strong>{unassignedCount} bill(s) are not assigned to a client.</strong> They appear under
              "All clients" only and are excluded from every per-client total. Open each bill and set its
              client — nothing here will guess whose body a bill belongs to.
            </div>
          )}
        </div>
      )}

      {/* R17 (AS-Q3). ABOVE the ledger by DEFAULT (D-29) — §17.1 rules the
          record and the tab's layout is nowhere ruled, so the placement is
          carried to the hands-on sitting rather than settled here. The ledger
          below is UNCHANGED: no restructuring. */}
      <ProvidersSection
        caseRec={caseRec}
        clients={clients}
        selectedClientId={selectedClientId}
        multiClient={multiClient}
        bills={allBills}
      />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>
            Medical bills
            {selectedClientId && (
              <span className="muted" style={{ fontWeight: 'normal' }}>
                {' '}— {clientName(clients.find((c) => c.id === selectedClientId)!)}
              </span>
            )}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn small secondary" disabled={busy || bills.length === 0} onClick={analyzeAll}>
              {busy ? 'Analyzing…' : 'Analyze all bills'}
            </button>
            <button className="btn small" onClick={() => setAdding((a) => !a)}>{adding ? 'Cancel' : '+ New bill'}</button>
          </div>
        </div>

        {adding && (
          <NewBillForm
            caseId={caseRec.id}
            providers={providers}
            clients={clients}
            clientName={clientName}
            // Single-client case: the one client is implicit, exactly as today.
            // Multi-client: whichever client is selected, or an explicit pick.
            defaultClientId={clients.length === 1 ? clients[0].id : selectedClientId}
            onDone={() => { setAdding(false); refresh(); }}
          />
        )}

        <table className="list" style={{ marginTop: 10 }}>
          <thead>
            <tr><th>Bill</th><th>Provider</th><th>Type</th><th>Claim</th><th className="num">Billed</th><th className="num">Outstanding</th><th>Latest analysis</th></tr>
          </thead>
          <tbody>
            {bills.map((b) => {
              const run = latestRunByBill.get(b.id);
              return (
                <tr key={b.id}>
                  <td><Link to={`/cases/${caseRec.id}/bills/${b.id}`}><strong>{b.label}</strong></Link></td>
                  <td className="muted">{providerName(b.facilityPartyId) ?? '—'}</td>
                  <td><span className="badge status">Type {b.billType}</span></td>
                  <td>
                    <span className={`badge claim-${b.claimType}`}>{b.claimType}</span>
                  </td>
                  <td className="num">{money(b.billedAmount)}</td>
                  <td className="num">{money(outstandingAmount(b))}</td>
                  <td>
                    {run ? (
                      <>
                        <span className={`badge run-${run.status}`}>{run.status}</span>{' '}
                        {(staleness.get(run.id) ?? []).length > 0 && (
                          <span className="badge run-stale" title={staleness.get(run.id)!.join(' ')}>stale</span>
                        )}{' '}
                        {runScheduleSelection(run)?.demoUsed && (
                          <span className="badge src-demo" title="Computed against the seeded demo schedule (fictional rates) — placeholder only.">DEMO schedule</span>
                        )}{' '}
                        {run.totals.confirmedRatio !== undefined && <span className="small">{run.totals.confirmedRatio.toFixed(2)}× benchmark</span>}
                      </>
                    ) : <span className="muted small">none yet</span>}
                  </td>
                </tr>
              );
            })}
            {bills.length === 0 && (
              <tr><td colSpan={7} className="muted">No bills yet. Add the first bill to open the ledger.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Case roll-up</h3>
        <dl className="kv">
          <dt>Total billed</dt><dd>{money(rollup.billed)}</dd>
          <dt>Total outstanding (settlement-relevant per §10)</dt><dd><strong>{money(rollup.outstanding)}</strong></dd>
          <dt>Confirmed benchmark ratio</dt>
          <dd>
            {rollup.confirmedRatio !== undefined
              ? <><strong>{rollup.confirmedRatio.toFixed(2)}×</strong> <span className="muted small">(across {rollup.confirmedRunCount} confirmed run{rollup.confirmedRunCount === 1 ? '' : 's'})</span></>
              : <span className="muted">No confirmed analysis runs yet — provisional runs never feed this number.</span>}
          </dd>
        </dl>
        {rollup.staleConfirmedCount > 0 && (
          <div className="notice" style={{ marginTop: 10 }}>
            {rollup.staleConfirmedCount === rollup.confirmedRunCount
              ? (rollup.confirmedRunCount === 1 ? 'The confirmed run feeding this ratio is' : 'All confirmed runs feeding this ratio are')
              : `${rollup.staleConfirmedCount} of the ${rollup.confirmedRunCount} confirmed runs feeding this ratio ${rollup.staleConfirmedCount === 1 ? 'is' : 'are'}`}{' '}
            stale — schedules or registry entries have changed since the analysis ran. Re-run from the bill
            workspace and confirm the fresh run.
          </div>
        )}
      </div>

      {docs.length > 0 && (
        <div className="card">
          <h3>Generated reports</h3>
          <table className="list">
            <thead><tr><th>Title</th><th>Audience</th><th>Privilege</th><th>Generated</th><th></th></tr></thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id}>
                  <td><strong>{d.title}</strong></td>
                  <td><span className="badge status">{d.audience}</span></td>
                  <td className="muted small">{d.privilegeTier}</td>
                  <td className="muted small">{new Date(d.generatedAt).toLocaleString()}</td>
                  <td>
                    <button className="btn small secondary" onClick={() => setOpenDoc(openDoc === d.id ? null : d.id)}>
                      {openDoc === d.id ? 'Close' : 'View'}
                    </button>{' '}
                    <button
                      className="btn small secondary"
                      onClick={() => {
                        const blob = new Blob([d.content], { type: 'text/markdown' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = `${d.title.replace(/[^\w-]+/g, '_')}.md`;
                        a.click();
                        URL.revokeObjectURL(a.href);
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {openDoc && (() => {
            const d = docs.find((x) => x.id === openDoc);
            return d ? <div className="report-frame"><MarkdownLite text={d.content} /></div> : null;
          })()}
        </div>
      )}

      <div className="notice">{DISCLAIMER_TEXT}</div>
    </div>
  );
}

function NewBillForm({
  caseId, providers, clients, clientName, defaultClientId, onDone,
}: {
  caseId: string;
  providers: PartyRecord[];
  clients: CaseClient[];
  clientName: (c: CaseClient) => string;
  defaultClientId: string | null;
  onDone: () => void;
}) {
  const [label, setLabel] = useState('');
  const [providerId, setProviderId] = useState('');
  const [billType, setBillType] = useState<BillType>(1);
  const [serviceStart, setServiceStart] = useState('');
  const [serviceEnd, setServiceEnd] = useState('');
  const [billedAmount, setBilledAmount] = useState('');
  const [clientId, setClientId] = useState(defaultClientId ?? '');

  const create = async () => {
    if (!label.trim()) return;
    const bill = await db.createBill({
      caseId, facilityPartyId: providerId || undefined, label: label.trim(), billType,
      claimType: 'unknown', claimTypeSource: 'detected',
      clientId: clientId || undefined,
      serviceStart: serviceStart || undefined, serviceEnd: serviceEnd || undefined,
      billedAmount: Number(billedAmount) || 0,
    });
    await db.appendReviewLog({
      entityType: 'medical_bill', entityId: bill.id, action: 'created', user: ATTORNEY_USER, newValue: bill.label,
    });
    onDone();
  };

  return (
    <div className="filters" style={{ marginTop: 8, padding: 10, background: '#f7f8fa', borderRadius: 6, alignItems: 'flex-end' }}>
      <label className="fld"><span className="lab">Bill label</span>
        <input type="text" value={label} placeholder="e.g. ProCare — chiropractic care" onChange={(e) => setLabel(e.target.value)} />
      </label>
      <label className="fld"><span className="lab">Provider</span>
        <Combobox
          options={providers.map((p) => ({ value: p.id, label: p.displayName }))}
          value={providerId}
          onChange={setProviderId}
          placeholder="— (link provider party later)"
        />
      </label>
      {/* Only asked when there is a real choice — D-CL2-7. */}
      {clients.length > 1 && (
        <label className="fld"><span className="lab">Client (whose bill)</span>
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
            <option value="">— unassigned</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{clientName(c)}</option>)}
          </select>
        </label>
      )}
      <label className="fld"><span className="lab">Type</span>
        <select value={billType} onChange={(e) => setBillType(Number(e.target.value) as BillType)}>
          <option value={1}>Type 1 — raw (provider unpaid)</option>
          <option value={2}>Type 2 — health-insurance-paid</option>
        </select>
      </label>
      <label className="fld"><span className="lab">Service start</span>
        <input type="date" value={serviceStart} onChange={(e) => setServiceStart(e.target.value)} />
      </label>
      <label className="fld"><span className="lab">Service end</span>
        <input type="date" value={serviceEnd} onChange={(e) => setServiceEnd(e.target.value)} />
      </label>
      <label className="fld"><span className="lab">Total billed ($)</span>
        <input type="text" inputMode="decimal" value={billedAmount} onChange={(e) => setBilledAmount(e.target.value)} />
      </label>
      <button className="btn small" onClick={create} disabled={!label.trim()}>Add bill</button>
    </div>
  );
}
