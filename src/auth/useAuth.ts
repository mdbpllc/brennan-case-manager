import { createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

/** Split out of AuthContext.tsx so that file exports only a component
 *  (react-refresh requirement). */
export interface AuthState {
  /** null while still initialising, or when signed out. */
  session: Session | null;
  /** True until the client has finished reading storage / the callback URL. */
  loading: boolean;
  email: string | null;
  sendMagicLink(email: string): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthCtx = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
