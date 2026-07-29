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
  // The 2026-07-28 failure, made self-identifying: tables present, RLS on,
  // policies written, and every request refused one layer BELOW the policies.
  const privilegeWall = missing.length > 0 && missing.every((r) => r.layer === 'privilege');
  const control = writes?.find((w) => w.table === 'file_counters');
  const grants = writes?.filter((w) => w.expect === 'allow') ?? [];
  const allowed = grants.filter((w) => w.outcome === 'inserted');

  return (
    <div className="card">
      <h3>Database &amp; RLS probe</h3>
      <p className="muted">
        Reads every table in <code>db/schema.sql</code>, then attempts a fictional write to five of
        them. A read denied <em>by RLS</em> looks identical to an empty table, so the read pass
        proves the schema executed — <strong>only the writes prove the policies</strong>. Refusals
        report which gate stopped them: a table-privilege refusal happens one layer below RLS and
        proves nothing about policies.{' '}
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
          {privilegeWall && (
            <p className="notice bad">
              Every table was refused at the <strong>table-privilege</strong> layer, not by RLS —
              the policies were never reached, so nothing here says anything about them. The
              role has no SQL privilege on these tables. Run{' '}
              <code>db/migrations/2026-07-28-api-role-grants.sql</code> in the Supabase SQL editor.
              {context === 'signed-out' && ' (Signed out, this is also the expected result: anon is granted nothing by design.)'}
            </p>
          )}
          {missing.length === 0 ? (
            <p className="muted">All {SCHEMA_TABLES.length} tables exist and are exposed through the API.</p>
          ) : (
            <table className="list">
              <thead><tr><th>Table</th><th>Status</th><th>Refused at</th><th>Error</th></tr></thead>
              <tbody>
                {missing.map((r) => (
                  <tr key={r.table}>
                    <td>{r.table}</td>
                    <td>{r.status ?? '—'}</td>
                    <td>{r.layer === 'privilege' ? 'table privilege' : r.layer === 'rls' ? 'RLS policy' : '—'}</td>
                    <td>{[r.code, r.message].filter(Boolean).join(' — ') || 'no detail returned'}</td>
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
              <tr><th>Table</th><th>Expected</th><th>Result</th><th>Refused at</th><th>Detail</th></tr>
            </thead>
            <tbody>
              {writes.map((w) => (
                <tr key={w.table}>
                  <td>{w.table}{w.table === 'file_counters' && <span className="muted"> (control)</span>}</td>
                  <td>{w.expect === 'allow' ? 'admitted' : 'blocked'}</td>
                  <td>
                    {w.outcome === 'inserted' ? 'written' : w.outcome === 'denied' ? 'blocked' : 'error'}
                    {' '}{w.asExpected ? '✓' : '✗'}
                  </td>
                  <td>
                    {w.layer === 'privilege'
                      ? 'table privilege'
                      : w.layer === 'rls'
                        ? 'RLS policy'
                        : '—'}
                  </td>
                  <td className="muted">
                    {w.outcome === 'inserted'
                      ? (w.cleanedUp ? 'probe row deleted' : 'PROBE ROW NOT DELETED — remove by hand')
                      : [w.status, w.code, w.message].filter(Boolean).join(' — ') || 'no detail returned'}
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
