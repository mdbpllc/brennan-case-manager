import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * The ONE Supabase client for the whole app — data access AND auth.
 *
 * Why a singleton in its own module: auth-js keys the session off a single
 * localStorage entry and warns (and contends on its lock) if two GoTrueClient
 * instances share it. Before the auth slice the adapter built its own client in
 * its constructor; if the sign-in code had built a second one, the adapter's
 * queries would have run on a client that did not necessarily hold the session.
 * Everything now goes through this instance.
 *
 * Flow type — IMPLICIT, chosen deliberately, verified against the installed
 * @supabase/auth-js 2.110.8 source rather than the docs (the Outlook lesson,
 * session-log #20: the documented contract was not what the installed library
 * actually did):
 *
 *  - Implicit is auth-js's own default (lib/constants: flowType 'implicit',
 *    detectSessionInUrl true). Tokens come back in the URL HASH FRAGMENT and
 *    need no pre-existing browser state.
 *  - PKCE would be the other option, but GoTrueClient#_isPKCECallback requires
 *    a `<storageKey>-code-verifier` entry in the SAME browser's localStorage,
 *    written when the link was requested. A magic link clicked from a mail
 *    client that opens a different browser than the one that asked for it would
 *    hard-fail. Implicit survives that; for a single-user sign-in it is the
 *    robust choice.
 *
 * The fragment hazard that comes with implicit is handled two ways: the callback
 * lands on its own route (/auth/callback) so no <Navigate replace> can strip the
 * hash, and GoTrueClient captures window.location.href SYNCHRONOUSLY at the top
 * of _initialize(), i.e. at the moment this module is evaluated — which is why
 * main.tsx imports this module first.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * The adapter-selection rule, as a pure function so it is testable without a
 * live environment. This is the ONE seam: `db`, the sign-in gate, the footer
 * banner and the statute fetcher all derive from the `usingSupabase` below.
 *
 * DEMO MODE MUST MEAN DEMO, whatever `.env` happens to hold. Vite loads `.env`
 * in EVERY mode — `--mode demo` only layers an ADDITIONAL `.env.demo` on top —
 * so when this rule was `Boolean(url && key)` alone, filling `.env` with real
 * values (2026-08-20) made `npm run dev:demo` serve the SIGN-IN GATE instead of
 * the demo app. The zero-setup demo path is a binding architecture rule, and it
 * had been surviving only via a gitignored `.env.demo` that no fresh clone has.
 * Mode therefore wins over env: an explicit `--mode demo` forces the local
 * adapter. See docs/spec-feedback.md (the FE-D1 build's finding 1).
 */
export function resolveUsingSupabase(
  envUrl: string | undefined,
  envKey: string | undefined,
  mode: string,
): boolean {
  return Boolean(envUrl && envKey) && mode !== 'demo';
}

/** True when we are NOT in demo mode: `.env` carries both Supabase values AND
 *  the server/build was not started with `--mode demo`. */
export const usingSupabase = resolveUsingSupabase(url, key, import.meta.env.MODE);

/** Null in localStorage demo mode. Demo mode must keep working with zero setup. */
export const supabase: SupabaseClient | null = usingSupabase
  ? createClient(url!, key!, {
      auth: {
        flowType: 'implicit',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/** Where Supabase sends the browser after the emailed link is clicked. This exact
 *  string must be on the Redirect URLs allowlist in the Supabase dashboard. */
export function authRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}
