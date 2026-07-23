// Fee-schedule library (Phase 1a slice: Medicare PFS via CSV import + the
// demo schedule). Discovery/licensed/hospital-MRF sources arrive in Phase 2
// with their confidentiality walls.

import { useCallback, useEffect, useState } from 'react';
import type { FeeSchedule } from '../domain/billing';
import { ATTORNEY_USER } from '../domain/billing';
import { parseRateCsv, toScheduleRates } from '../analysis/pfsCsv';
import { db } from '../data';

export default function BenchmarksPage() {
  const [schedules, setSchedules] = useState<FeeSchedule[]>([]);
  const [rateCounts, setRateCounts] = useState<Record<string, number>>({});
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [importing, setImporting] = useState(false);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [locality, setLocality] = useState('');
  const [csvText, setCsvText] = useState('');
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const ss = await db.listFeeSchedules();
      setSchedules(ss);
      const rates = await db.listRates(ss.map((s) => s.id));
      const counts: Record<string, number> = {};
      for (const r of rates) counts[r.scheduleId] = (counts[r.scheduleId] ?? 0) + 1;
      setRateCounts(counts);
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const onFile = (f: File | null) => {
    if (!f) return;
    f.text().then(setCsvText);
    if (!name) setName(f.name.replace(/\.csv$/i, ''));
  };

  const doImport = async () => {
    setImportMsg(null);
    const parsed = parseRateCsv(csvText);
    if (parsed.rows.length === 0) {
      setImportMsg(`Nothing imported. ${parsed.errors.join(' ')}`);
      return;
    }
    const schedule = await db.createFeeSchedule(
      {
        name: name.trim() || 'Imported schedule',
        sourceType: 'public',
        year: year.trim() || undefined,
        locality: locality.trim() || undefined,
        notes: `Imported from CSV (${parsed.rows.length} rates${parsed.skipped ? `, ${parsed.skipped} rows skipped` : ''}).`,
      },
      toScheduleRates('', parsed.rows, () => crypto.randomUUID()).map(({ id: _id, scheduleId: _sid, ...rest }) => rest),
    );
    await db.appendReviewLog({
      entityType: 'fee_schedule', entityId: schedule.id, action: 'created', user: ATTORNEY_USER,
      newValue: `${schedule.name} — ${parsed.rows.length} rates imported`,
    });
    setImporting(false); setName(''); setYear(''); setLocality(''); setCsvText('');
    setImportMsg(`Imported ${parsed.rows.length} rates into "${schedule.name}"${parsed.skipped ? ` (${parsed.skipped} rows skipped)` : ''}.`);
    refresh();
  };

  const remove = async (s: FeeSchedule) => {
    if (!window.confirm(`Delete schedule "${s.name}" and its rates? Analysis runs that cited it keep their stored cites.`)) return;
    await db.deleteFeeSchedule(s.id);
    refresh();
  };

  if (loadState === 'error') {
    return <div className="notice">Couldn't load fee schedules. Check the database connection and refresh.</div>;
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Benchmark fee schedules</h2>
          <div className="sub">Schedules the analysis engine cites. Public sources only in this phase.</div>
        </div>
        <button className="btn small" onClick={() => setImporting((v) => !v)}>{importing ? 'Cancel' : '+ Import CSV'}</button>
      </div>

      {importMsg && <div className="notice">{importMsg}</div>}

      {importing && (
        <div className="card">
          <h3>Import a fee schedule (CSV)</h3>
          <p className="small muted" style={{ marginTop: 0 }}>
            Export from the CMS Physician Fee Schedule Look-Up Tool (or any CSV with a <code>code</code> column and a{' '}
            <code>rate</code>/<code>price</code> column). Rates should be the payment amounts for the Texas locality
            you practice in. The demo schedule stays until you delete it — its rates are fictional.
          </p>
          <div className="form-grid">
            <label className="fld"><span className="lab">Schedule name</span>
              <input type="text" value={name} placeholder="e.g. Medicare PFS 2026 — TX locality" onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="fld"><span className="lab">Year</span>
              <input type="text" value={year} placeholder="2026" onChange={(e) => setYear(e.target.value)} />
            </label>
            <label className="fld"><span className="lab">Locality</span>
              <input type="text" value={locality} placeholder="e.g. TX — rest of state" onChange={(e) => setLocality(e.target.value)} />
            </label>
            <label className="fld full"><span className="lab">CSV file</span>
              <input type="file" accept=".csv,text/csv" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
            </label>
            <label className="fld full"><span className="lab">…or paste CSV content</span>
              <textarea value={csvText} style={{ minHeight: 120, fontFamily: 'Consolas, monospace' }} onChange={(e) => setCsvText(e.target.value)} placeholder={'code,description,rate\n99213,Office visit est level 3,92.47'} />
            </label>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={doImport} disabled={csvText.trim() === ''}>Import</button>
          </div>
        </div>
      )}

      <div className="card">
        <table className="list">
          <thead><tr><th>Schedule</th><th>Source</th><th>Year</th><th>Locality</th><th className="num">Rates</th><th></th></tr></thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong>{s.name}</strong>
                  {s.notes && <div className="small muted">{s.notes}</div>}
                </td>
                <td><span className={`badge src-${s.sourceType}`}>{s.sourceType}</span></td>
                <td className="muted">{s.year ?? '—'}</td>
                <td className="muted">{s.locality ?? '—'}</td>
                <td className="num">{rateCounts[s.id] ?? 0}</td>
                <td><button className="btn small danger" onClick={() => remove(s)}>Delete</button></td>
              </tr>
            ))}
            {schedules.length === 0 && loadState === 'ready' && (
              <tr><td colSpan={6} className="muted">No schedules loaded — import one to enable benchmark analysis.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="notice">
        Analyses pin to the schedule data loaded at run time and cite it per line. When schedules change,
        re-run the analysis — staleness handling deepens in Phase 2 (effective-date discipline).
      </div>
    </div>
  );
}
