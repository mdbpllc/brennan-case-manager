import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, usingSupabase, authRedirectUrl } from '../data/supabaseClient';
import { AuthCtx, type AuthState } from './useAuth';

/**
 * Single-user sign-in (auth slice §5A, AUTH-1 ruled magic link 2026-07-28).
 *
 * Demo mode is deliberately NOT gated: with no Supabase config there is nothing
 * to authenticate against and the zero-setup localStorage mode must keep working
 * exactly as before (CLAUDE.md — everything works in both modes).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  // Demo mode has nothing to wait for.
  const [loading, setLoading] = useState(usingSupabase);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    // getSession() awaits the client's own initialise promise, which is where the
    // magic-link fragment is consumed — so this resolves AFTER the callback URL
    // has been processed, not before.
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (cancelled) return;
      setSession(next);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value: AuthState = {
    session,
    loading,
    email: session?.user?.email ?? null,

    async sendMagicLink(email: string) {
      if (!supabase) throw new Error('Not connected to Supabase (demo mode).');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: authRedirectUrl(),
          // Single-user lockdown: the sign-in form must never provision an
          // account. Michael's user is created by hand in the dashboard.
          // Multi-user is out of scope for this slice.
          shouldCreateUser: false,
        },
      });
      if (error) throw new Error(error.message);
    },

    async signOut() {
      if (!supabase) return;
      // 'local' — sign out this browser only, not every device. auth-js defaults
      // to 'global', which is not what a sign-out button should mean.
      await supabase.auth.signOut({ scope: 'local' });
      setSession(null);
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
