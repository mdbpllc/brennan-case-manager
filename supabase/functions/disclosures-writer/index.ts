// disclosures-writer — Supabase Edge Function entry point (AS-Q1, slice §7.5).
//
// Deploy:  supabase functions deploy disclosures-writer
// (Runs on Deno — this file is not part of the Vite/tsc build.)
//
// EVERY decision lives in ./handler.ts, which is free of Deno globals so the
// refusal can be unit-tested from vitest. This file does three things and
// nothing else: read the request's Authorization header, read ONE
// vendor-neutral secret, and return what the handler decides.
//
// ⚠ No vendor SDK, endpoint, key name or model name appears here or in the
// handler. The secret is never set in any environment this slice ships, so in
// practice this function's entire behaviour is a 401 or a plain-language
// refusal. That is the shape Michael authorized and the whole of it.

import { CREDENTIAL_SECRET_NAME, handleDisclosuresWriter } from './handler.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
};

// deno-lint-ignore no-explicit-any
declare const Deno: any;

Deno.serve((req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  const result = handleDisclosuresWriter({
    credential: Deno.env.get(CREDENTIAL_SECRET_NAME) ?? undefined,
    authorization: req.headers.get('Authorization') ?? undefined,
  });

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
});
