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

/** True when .env carries both Supabase values — i.e. we are NOT in demo mode. */
export const usingSupabase = Boolean(url && key);

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
