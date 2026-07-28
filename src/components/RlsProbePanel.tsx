import { useState } from 'react';
import { probeReads, probeWrites, SCHEMA_TABLES, type ReadResult, type WriteResult } from '../auth/rlsProbe';

/**
 * Renders the RLS probe (see rlsProbe.ts for what the results do and do not prove).
 * Shown on the sign-in screen (signed-out baseline) and on /diagnostics (signed in).
 */
export default function RlsProbePanel({ context }: { context: 'signed-out' | 'signed-in' }) {
  const [reads, setReads] = useState<ReadResult[] | null>(null);
  const [writes, setWrites] = useState<WriteResult[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setErr(null);
    try {
      setReads(await probeReads());
      setWrites(await probeWrites());
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const missing = reads?.filter((r) => !r.ok) ?? [];
  const control = writes?.find((w) => w.table === 'file_counters');
  const grants = writes?.filter((w) => w.expect === 'allow') ?? [];
  const allowed = grants.filter((w) => w.outcome === 'inserted');

  return (
    <div className="card">
      <h3>Database &amp; RLS probe</h3>
      <p className="muted">
        Reads every table in <code>db/schema.sql</code>, then attempts a fictional write to five of
        them. A denied read looks identical to an empty table, so the read pass proves the schema
        executed — <strong>only the writes prove the policies</strong>.{' '}
        {context === 'signed-out'
          ? 'Run this before signing in to capture the blocked baseline.'
          : 'Run this signed in and compare against the signed-out baseline.'}
      </p>

      <button onClick={run} disabled={busy}>
        {busy ? 'Running…' : 'Run probe'}
      </button>
      {err && <p className="notice bad">{err}</p>}

      {reads && (
        <>
          <h4>Schema — {reads.filter((r) => r.ok).length} of {SCHEMA_TABLES.length} tables reachable</h4>
          {missing.length === 0 ? (
            <p className="muted">All {SCHEMA_TABLES.length} tables exist and are exposed through the API.</p>
          ) : (
            <table className="list">
              <thead><tr><th>Table</th><th>Error</th></tr></thead>
              <tbody>
                {missing.map((r) => (
                  <tr key={r.table}>
                    <td>{r.table}</td>
                    <td>{r.code} — {r.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {writes && (
        <>
          <h4>Policies — {allowed.length} of {grants.length} write probes admitted</h4>
          <table className="list">
            <thead>
              <tr><th>Table</th><th>Expected</th><th>Result</th><th>Detail</th></tr>
            </thead>
            <tbody>
              {writes.map((w) => (
                <tr key={w.table}>
                  <td>{w.table}{w.table === 'file_counters' && <span className="muted"> (control)</span>}</td>
                  <td>{w.expect === 'allow' ? 'admitted' : 'blocked'}</td>
                  <td>
                    {w.outcome === 'inserted' ? 'written' : w.outcome === 'denied' ? 'blocked by RLS' : 'error'}
                    {' '}{w.asExpected ? '✓' : '✗'}
                  </td>
                  <td className="muted">
                    {w.outcome === 'inserted'
                      ? (w.cleanedUp ? 'probe row deleted' : 'PROBE ROW NOT DELETED — remove by hand')
                      : `${w.code ?? ''} ${w.message ?? ''}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {control && control.outcome === 'inserted' && (
            <p className="notice bad">
              Negative control FAILED: file_counters has no policy and should never accept a write.
              Treat every other result on this panel as unproven.
            </p>
          )}
        </>
      )}
    </div>
  );
}
