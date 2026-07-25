// legiscan-poller — Supabase Edge Function (design B1 / D4 / §7).
// Cron-invoked fetch-and-store: LegiScan API → tracked_bills rows (raw
// payloads). Deliberately NO matching or flag logic here — the app's
// tested matcher/lifecycle (src/bills/) processes stored rows, so legal-
// adjacent logic lives in ONE place and can re-run over history.
//
// Uses the LEGISCAN_API_KEY secret (set by Michael, 2026-07-25). API only,
// per TOS — never crawls legiscan.com. Budget: masterlist diff + sweeps is
// a few dozen queries per run against the 30k/month Public-tier cap.
//
// Deploy:   supabase functions deploy legiscan-poller
// Schedule: dashboard → Edge Functions → legiscan-poller → cron
//           (interim cadence per design §5: monthly, e.g. "0 6 1 * *";
//           tighten to weekly at prefiling Nov 2026, 2×/week in session).

import { createClient } from 'npm:@supabase/supabase-js@2';

const API = 'https://api.legiscan.com/';
const RELEVANCE_CUTOFF = 50; // design sweep hygiene: tune from decision log

const key = Deno.env.get('LEGISCAN_API_KEY');
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

async function legiscan(op: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams({ key: key!, op, ...params });
  const res = await fetch(`${API}?${qs}`);
  if (!res.ok) throw new Error(`LegiScan ${op} HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(`LegiScan ${op}: ${JSON.stringify(json.alert ?? json).slice(0, 200)}`);
  return json;
}

/** Latest bill text, base64-decoded and tag-stripped, for the app matcher. */
async function fetchBillText(texts: { doc_id: number; date: string }[]): Promise<string> {
  if (!texts?.length) return '';
  const latest = [...texts].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  try {
    const res = await legiscan('getBillText', { id: String(latest.doc_id) });
    const doc = (res.text as { doc: string }).doc;
    const raw = atob(doc);
    return raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 200_000);
  } catch {
    return ''; // text unavailable — status tracking still works
  }
}

async function upsertBill(bill: Record<string, unknown>, text: string, polledAt: string): Promise<void> {
  const statusCode = Number(bill.status ?? 1);
  const statusMap: Record<number, string> = { 1: 'introduced', 2: 'engrossed', 3: 'enrolled', 4: 'passed', 5: 'vetoed', 6: 'dead' };
  const row = {
    legiscan_bill_id: bill.bill_id,
    session_id: (bill.session as { session_id: number })?.session_id ?? 0,
    session_name: (bill.session as { session_name?: string })?.session_name ?? null,
    bill_number: bill.bill_number,
    title: bill.title ?? '',
    status: statusMap[statusCode] ?? 'introduced',
    status_date: bill.status_date || null,
    effective_date: null, // filled by Michael/app once known — LegiScan has no single effective-date field
    change_hash: bill.change_hash ?? '',
    last_polled: polledAt,
    url: bill.state_link ?? bill.url ?? null,
    raw_json: JSON.stringify({
      billId: bill.bill_id,
      sessionId: (bill.session as { session_id: number })?.session_id ?? 0,
      session: (bill.session as { session_name?: string })?.session_name,
      number: bill.bill_number, title: bill.title,
      statusCode, statusDate: bill.status_date,
      changeHash: bill.change_hash, url: bill.state_link ?? bill.url,
      text,
    }),
  };
  const { error } = await supabase.from('tracked_bills').upsert(row, { onConflict: 'legiscan_bill_id' });
  if (error) throw new Error(error.message);
}

Deno.serve(async () => {
  if (!key) {
    return new Response(JSON.stringify({ error: 'LEGISCAN_API_KEY secret not set' }), { status: 500 });
  }
  const polledAt = new Date().toISOString();
  const log: string[] = [];

  try {
    // 1. Current TX session (specials auto-detected — first non-sine-die,
    //    else most recent).
    const sessions = (await legiscan('getSessionList', { state: 'TX' })).sessions as Record<string, unknown>[];
    const active = sessions.find((s) => !s.sine_die) ?? sessions[0];
    const sessionId = String(active.session_id);
    log.push(`session: ${active.session_name}`);

    // 2. Masterlist change-hash diff for bills we already track.
    const master = (await legiscan('getMasterListRaw', { id: sessionId })).masterlist as Record<string, { bill_id: number; change_hash: string }>;
    const { data: tracked, error } = await supabase.from('tracked_bills').select('legiscan_bill_id, change_hash');
    if (error) throw new Error(error.message);
    const knownHash = new Map((tracked ?? []).map((t) => [t.legiscan_bill_id as number, t.change_hash as string]));

    const changed: number[] = [];
    for (const entry of Object.values(master)) {
      if (!entry?.bill_id) continue;
      const known = knownHash.get(entry.bill_id);
      if (known !== undefined && known !== entry.change_hash) changed.push(entry.bill_id);
    }
    log.push(`masterlist: ${changed.length} tracked bill(s) changed`);

    // 3. Discovery sweeps over active watch targets (derived + manual).
    const { data: targets } = await supabase.from('watch_targets').select('cite_or_query').eq('active', true);
    const discovered = new Set<number>();
    for (const t of targets ?? []) {
      const res = await legiscan('getSearchRaw', { state: 'TX', query: t.cite_or_query as string, year: '2' });
      const results = ((res.searchresult as Record<string, unknown>).results ?? []) as { bill_id: number; relevance: number }[];
      for (const r of results) {
        if (r.relevance >= RELEVANCE_CUTOFF && !knownHash.has(r.bill_id)) discovered.add(r.bill_id);
      }
    }
    log.push(`sweeps: ${discovered.size} new candidate bill(s)`);

    // 4. getBill + text for changed and discovered bills (sequential; tiny volumes).
    for (const billId of [...changed, ...discovered]) {
      const detail = (await legiscan('getBill', { id: String(billId) })).bill as Record<string, unknown>;
      const text = await fetchBillText(detail.texts as { doc_id: number; date: string }[]);
      await upsertBill(detail, text, polledAt);
    }
    log.push(`stored ${changed.length + discovered.size} bill(s); app processes flags on next Bill-tracking visit`);

    return new Response(JSON.stringify({ ok: true, polledAt, log }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    log.push(e instanceof Error ? e.message : 'unknown error');
    return new Response(JSON.stringify({ ok: false, polledAt, log }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
});
