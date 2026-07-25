// statute-fetch — Supabase Edge Function (design A2 / D4).
// The browser can't fetch the .gov statute files directly (CORS), so this
// function proxies ONE chapter per call from the backing static file host:
//   https://tcss.legis.texas.gov/resources/{CD}/htm/{CD}.{ch}.htm
// (statutes.capitol.texas.gov itself is an SPA now — the resources host
// serves the original files; see spec-feedback 2026-07-25.)
//
// Texas statutes are public domain; courtesy still applies: the client
// caches aggressively (cache-on-demand + biennial refresh), fetches are
// sequential, and we identify ourselves with a UA.
//
// Deploy:  supabase functions deploy statute-fetch
// (Runs on Deno — this file is not part of the Vite/tsc build.)

const CODE_RE = /^[A-Z]{2}$/;
const CHAPTER_RE = /^\d{1,4}[A-Z]?$/;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  const url = new URL(req.url);
  const code = (url.searchParams.get('code') ?? '').toUpperCase();
  const chapter = (url.searchParams.get('chapter') ?? '').toUpperCase();

  if (!CODE_RE.test(code) || !CHAPTER_RE.test(chapter)) {
    return new Response(JSON.stringify({ error: 'code must be two letters, chapter like 41 or 55A' }), {
      status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const sourceUrl = `https://tcss.legis.texas.gov/resources/${code}/htm/${code}.${chapter}.htm`;
  const upstream = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'BrennanCaseManager/0.1 (statute cache; michael@brennanstx.com)' },
  });

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: `source returned ${upstream.status}`, sourceUrl }), {
      status: upstream.status === 404 ? 404 : 502,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const html = await upstream.text();
  return new Response(JSON.stringify({ html, sourceUrl, fetchedAt: new Date().toISOString() }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
});
