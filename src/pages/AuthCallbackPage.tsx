import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

/**
 * Landing route for the emailed magic link.
 *
 * THE OUTLOOK LESSON (session-log #20) APPLIED. That slice failed because the
 * redirect landed somewhere the SPA router immediately re-navigated, destroying
 * the credential in the URL before the library read it. The same trap exists
 * here: with the implicit flow the tokens arrive in the hash fragment, and a
 * <Navigate ... replace> writes a new URL with no hash.
 *
 * Three things keep that from happening, in order of how much they matter:
 *
 *  1. This is a DEDICATED route. The link never lands on "/", which is the one
 *     route that redirects on sight (<Navigate to="/cases" replace/>).
 *  2. GoTrueClient reads window.location.href SYNCHRONOUSLY at the top of
 *     _initialize(), which runs when supabaseClient.ts is evaluated — before any
 *     component renders. main.tsx imports that module first for this reason.
 *     By the time React can touch the URL, the fragment has already been read.
 *  3. This page does not navigate away on its own until a session actually
 *     exists, or the URL says the attempt failed.
 *
 * Verified against @supabase/auth-js 2.110.8 as installed, not against the docs.
 */
export default function AuthCallbackPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase reports a rejected link in the fragment (expired, already used,
    // unknown user) rather than by failing the redirect.
    const frag = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const query = new URLSearchParams(window.location.search);
    const desc = query.get('error_description') ?? frag.get('error_description');
    const code = query.get('error_code') ?? frag.get('error_code');
    if (desc || code) setUrlError(desc ?? code);
  }, []);

  useEffect(() => {
    if (session) navigate('/cases', { replace: true });
  }, [session, navigate]);

  if (session) return <Navigate to="/cases" replace />;

  if (urlError) {
    return (
      <div className="signin">
        <div className="card">
          <h3>That link didn’t work</h3>
          <p className="notice bad">{urlError}</p>
          <p className="muted small">
            Sign-in links are single-use and time-limited. Ask for a fresh one.
          </p>
          <button onClick={() => navigate('/', { replace: true })}>Back to sign in</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="signin">
        <div className="card"><h3>Signing you in…</h3></div>
      </div>
    );
  }

  // Not loading, no session, no error in the URL: the fragment was absent or
  // already consumed. Say so plainly rather than looping.
  return (
    <div className="signin">
      <div className="card">
        <h3>Nothing to sign in with</h3>
        <p className="muted">
          This page had no sign-in credential in its address. That happens if the link was opened
          twice, or if the address was retyped rather than clicked.
        </p>
        <button onClick={() => navigate('/', { replace: true })}>Back to sign in</button>
      </div>
    </div>
  );
}
