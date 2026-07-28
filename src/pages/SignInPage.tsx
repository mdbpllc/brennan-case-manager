import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import RlsProbePanel from '../components/RlsProbePanel';

/**
 * Magic-link sign-in (AUTH-1, ruled 2026-07-28). No passwords are stored or
 * accepted anywhere in this flow.
 *
 * The form cannot create an account — sendMagicLink passes shouldCreateUser:false.
 * An unknown address comes back as an error, which is the intended behaviour for
 * a single-user system.
 */
export default function SignInPage() {
  const { sendMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showProbe, setShowProbe] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await sendMagicLink(email.trim());
      setSent(true);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : String(e2));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="signin">
      <div className="card">
        <h3>Sign in</h3>
        {sent ? (
          <>
            <p>
              A sign-in link is on its way to <strong>{email}</strong>. Open it in this browser —
              the link signs you in and returns you to the case list.
            </p>
            <p className="muted small">
              Links are single-use and expire. If nothing arrives, check junk mail before asking
              for another — the sending limit is low.
            </p>
            <button onClick={() => { setSent(false); setErr(null); }}>Use a different address</button>
          </>
        ) : (
          <form onSubmit={submit}>
            <label className="fld">
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
              <span className="hint">
                We email you a link instead of asking for a password — nothing to remember, nothing
                stored.
              </span>
            </label>
            <button type="submit" disabled={busy || !email.trim()}>
              {busy ? 'Sending…' : 'Email me a sign-in link'}
            </button>
            {err && <p className="notice bad">{err}</p>}
          </form>
        )}
      </div>

      <p className="muted small">
        {showProbe ? (
          <button className="linky" onClick={() => setShowProbe(false)}>Hide connection check</button>
        ) : (
          <button className="linky" onClick={() => setShowProbe(true)}>Check the database connection</button>
        )}
      </p>
      {showProbe && <RlsProbePanel context="signed-out" />}
    </div>
  );
}
