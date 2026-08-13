import { supabase } from '../data/supabaseClient';

/**
 * RLS probe — the instrument for the auth slice's third unexercised thing:
 * the first real test of the schema's 31 policies against an authenticated user.
 *
 * METHODOLOGY, stated because the honest reading of the results depends on it:
 *
 *  - A READ probe CANNOT prove a policy grants access. Under RLS a denied SELECT
 *    returns an EMPTY SET, not an error — indistinguishable from an empty table.
 *    What the read probe actually proves is that the table EXISTS and is exposed
 *    through the API (i.e. db/schema.sql really executed). That is worth knowing
 *    on its own, since the schema had never been run before this slice.
 *  - A WRITE probe DOES prove it. A denied INSERT raises Postgres 42501,
 *    "new row violates row-level security policy". Signed out it must fail;
 *    signed in it must succeed. That before/after pair is the only evidence that
 *    the `authenticated` role is what is doing the work.
 *  - file_counters is the NEGATIVE CONTROL. It has RLS on and, deliberately, no
 *    policy at all. An authenticated insert into it MUST still fail with 42501.
 *    If it ever succeeds, the probe is not measuring what it claims to and every
 *    other result here is worthless.
 *
 * Every row written is fictional and is deleted immediately (Go_Live_Gates: no
 * real client data, ever — including anything created to exercise RLS).
 */

/** All 36 tables in db/schema.sql. `policy: false` marks the deliberate omission.
 *
 *  KEEP THIS IN STEP WITH THE SCHEMA. A table missing here is not probed, so a
 *  missing GRANT on it stays invisible to the one instrument built to catch
 *  that — the 2026-07-28 401 wall in a quieter form. CL-2 added the two
 *  case_client* tables below; CD-1 added case_roster_flags and contact_edges
 *  IN THE SAME COMMIT as the tables themselves, which is the point of the
 *  slice's "RLS + probe from birth" item. Do the same for every table you add. */
export const SCHEMA_TABLES: { name: string; policy: boolean }[] = [
  { name: 'file_counters', policy: false },
  { name: 'cases', policy: true },
  { name: 'parties', policy: true },
  { name: 'case_parties', policy: true },
  { name: 'case_roster_flags', policy: true },
  { name: 'contact_edges', policy: true },
  { name: 'case_clients', policy: true },
  { name: 'case_client_flags', policy: true },
  { name: 'medical_bills', policy: true },
  { name: 'bill_line_items', policy: true },
  { name: 'code_mappings', policy: true },
  { name: 'eob_records', policy: true },
  { name: 'provider_billing_profiles', policy: true },
  { name: 'analysis_runs', policy: true },
  { name: 'analysis_result_lines', policy: true },
  { name: 'review_log', policy: true },
  { name: 'legal_rules', policy: true },
  { name: 'fee_schedules', policy: true },
  { name: 'fee_schedule_rates', policy: true },
  { name: 'generated_documents', policy: true },
  { name: 'calendar_events', policy: true },
  { name: 'transcripts', policy: true },
  { name: 'transcript_participants', policy: true },
  { name: 'staging_items', policy: true },
  { name: 'routing_decisions', policy: true },
  { name: 'glossary_terms', policy: true },
  { name: 'tag_templates', policy: true },
  { name: 'charges', policy: true },
  { name: 'oaa_intakes', policy: true },
  { name: 'statute_chapters', policy: true },
  { name: 'statute_sections', policy: true },
  { name: 'registry_verification_snapshots', policy: true },
  { name: 'watch_flags', policy: true },
  { name: 'watch_targets', policy: true },
  { name: 'tracked_bills', policy: true },
  { name: 'bill_statute_refs', policy: true },
];

/**
 * Which gate refused the request. Postgres reports BOTH "permission denied for
 * table" and "new row violates row-level security policy" as 42501, so the code
 * alone cannot tell them apart — and they mean very different things. The
 * 2026-07-28 first live run was refused entirely at `privilege`, which is why no
 * policy was exercised despite 31 of them existing.
 */
export type DenialLayer = 'privilege' | 'rls' | 'other';

export function classifyDenial(code?: string, message?: string): DenialLayer {
  if (code !== '42501') return 'other';
  return /permission denied/i.test(message ?? '') ? 'privilege' : 'rls';
}

export interface ReadResult {
  table: string;
  /** Query returned without error — table exists and is API-exposed. */
  ok: boolean;
  rows: number | null;
  status?: number;
  code?: string;
  message?: string;
  layer?: DenialLayer;
}

export interface WriteResult {
  table: string;
  /** What this table is supposed to do when authenticated. */
  expect: 'allow' | 'deny';
  outcome: 'inserted' | 'denied' | 'other-error';
  /** True when outcome matched `expect`. */
  asExpected: boolean;
  /** Whether the probe row was cleaned up (only meaningful for 'inserted'). */
  cleanedUp?: boolean;
  status?: number;
  code?: string;
  message?: string;
  layer?: DenialLayer;
}

/** Tables that are SUPPOSED to be unreachable through the API. Exactly the
 *  policy-less ones — file_counters is policy-less and revoked for the same
 *  reason: it is reached only through the SECURITY DEFINER function. */
export function expectedUnreachable(): Set<string> {
  return new Set(SCHEMA_TABLES.filter((t) => !t.policy).map((t) => t.name));
}

/**
 * Should the panel raise the "refused below RLS" alarm?
 *
 * ONLY when a table that is supposed to be reachable was refused at the
 * privilege layer. The first version asked "was every refused table refused at
 * the privilege layer", which is vacuously true when the ONLY refusal is the
 * deliberately-revoked control — so it fired on a healthy signed-in run, telling
 * Michael to re-run a migration that had already succeeded. Third instrument
 * defect of the 2026-07-28 session and the first one caught by a person rather
 * than by the probe's own controls; hence this is a pure function with tests.
 */
export function shouldWarnPrivilegeWall(reads: ReadResult[]): boolean {
  const byDesign = expectedUnreachable();
  const unexpected = reads.filter((r) => !r.ok && !byDesign.has(r.table));
  return unexpected.length > 0 && unexpected.every((r) => r.layer === 'privilege');
}

/** Reads every table. See methodology: proves existence, not grant.
 *
 *  "No error" is NOT accepted as success. Anything that answers 200 with a body
 *  PostgREST did not produce — a dev server's SPA fallback, a proxy, a captive
 *  portal — yields error:null and would otherwise be reported as a healthy table.
 *  An exact-count HEAD always comes back with a numeric count from PostgREST, so
 *  a null count means we did not actually reach the database. This was a real
 *  false positive during the build, not a hypothetical. */
export async function probeReads(): Promise<ReadResult[]> {
  if (!supabase) throw new Error('Not connected to Supabase (demo mode).');
  const out: ReadResult[] = [];
  for (const { name } of SCHEMA_TABLES) {
    // NOT head:true. A HEAD response carries no body by HTTP spec, so PostgREST's
    // {code, message, hint} never arrives and supabase-js hands back an error
    // object with nothing in it — which is exactly how the 2026-07-28 run showed
    // a bare "—" in the error column while every request was failing 401. A GET
    // with limit(0) is just as cheap, still returns the exact count, and carries
    // a real error body when it fails.
    const { count, error, status } = await supabase
      .from(name)
      .select('*', { count: 'exact' })
      .limit(0);
    if (error) {
      out.push({
        table: name,
        ok: false,
        rows: null,
        status,
        code: error.code,
        message: error.message,
        layer: classifyDenial(error.code, error.message),
      });
    } else if (typeof count !== 'number') {
      out.push({
        table: name,
        ok: false,
        rows: null,
        code: 'NO-COUNT',
        message: 'Responded without a row count — this is not a PostgREST response. Check VITE_SUPABASE_URL.',
      });
    } else {
      out.push({ table: name, ok: true, rows: count });
    }
  }
  return out;
}

/** Fictional probe rows. Kept to tables with no foreign-key prerequisites so the
 *  probe never has to build a dependency graph of demo records. */
function probeRows(tag: string): {
  table: string;
  expect: 'allow' | 'deny';
  /** For deny rows: which gate is supposed to do the refusing. */
  expectLayer?: DenialLayer;
  row: Record<string, unknown>;
}[] {
  return [
    {
      table: 'parties',
      expect: 'allow',
      row: { party_type: 'client', kind: 'individual', display_name: `RLS probe ${tag} (fictional)` },
    },
    {
      table: 'legal_rules',
      expect: 'allow',
      row: {
        rule_key: `rls-probe-${tag}`,
        proposition: 'RLS write probe — fictional, not a legal proposition.',
        scope: 'system',
        status: 'unverified',
      },
    },
    {
      table: 'glossary_terms',
      expect: 'allow',
      row: { term: `RLS probe ${tag}`, scope: 'firm', weight: 1 },
    },
    {
      table: 'watch_targets',
      expect: 'allow',
      row: { kind: 'manual', cite_or_query: `"RLS probe ${tag}"`, note: 'fictional', active: false },
    },
    // Negative control — see the methodology note above. It is refused at the
    // PRIVILEGE layer, not by RLS: the grants migration explicitly revokes
    // file_counters from `authenticated`, because file numbers are issued only
    // through the SECURITY DEFINER function.
    { table: 'file_counters', expect: 'deny', expectLayer: 'privilege', row: { yy: 'ZZ', counter: 0 } },
  ];
}

/**
 * Attempts one insert per probe table, then deletes what landed.
 * Run it signed OUT and signed IN — the pair is the evidence.
 */
export async function probeWrites(): Promise<WriteResult[]> {
  if (!supabase) throw new Error('Not connected to Supabase (demo mode).');
  const tag = Math.random().toString(36).slice(2, 8);
  const out: WriteResult[] = [];

  for (const { table, expect, expectLayer, row } of probeRows(tag)) {
    const { data, error, status } = await supabase.from(table).insert(row).select();

    if (error) {
      const layer = classifyDenial(error.code, error.message);
      const denied = layer === 'privilege' || layer === 'rls';
      out.push({
        table,
        expect,
        outcome: denied ? 'denied' : 'other-error',
        // Denial alone is not enough — the LAYER has to match too. file_counters
        // is expected to be refused at `privilege` (we revoke it), so a refusal
        // there is correct; an `rls` refusal on a table we granted would mean
        // something else entirely. Scoring only on "was it refused" is what let
        // the first live run look like an RLS result when nothing had reached RLS.
        asExpected: expect === 'deny' && layer === expectLayer,
        status,
        code: error.code,
        message: error.message,
        layer,
      });
      continue;
    }

    // No error, but also no row echoed back: same forgery problem as the read
    // pass. An insert...select that really hit PostgREST returns the row.
    const id = (data?.[0] as { id?: string } | undefined)?.id;
    if (!id) {
      out.push({
        table,
        expect,
        outcome: 'other-error',
        asExpected: false,
        code: 'NO-ROW',
        message: 'Accepted without returning a row — not a PostgREST response. Check VITE_SUPABASE_URL.',
      });
      continue;
    }

    // Landed. Clean up immediately — no probe row survives the run.
    const { error: delErr } = await supabase.from(table).delete().eq('id', id);
    out.push({
      table,
      expect,
      outcome: 'inserted',
      asExpected: expect === 'allow',
      cleanedUp: !delErr,
    });
  }

  return out;
}
