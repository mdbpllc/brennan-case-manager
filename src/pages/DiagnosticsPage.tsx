import RlsProbePanel from '../components/RlsProbePanel';
import { usingSupabase } from '../data';
import { useAuth } from '../auth/useAuth';

/** Signed-in half of the RLS evidence pair. Supabase mode only — there is no
 *  database to probe in localStorage demo mode. */
export default function DiagnosticsPage() {
  const { email } = useAuth();

  if (!usingSupabase) {
    return (
      <div>
        <h2>Diagnostics</h2>
        <p className="notice">
          Demo mode — data lives in this browser and there is no database to probe. Set
          VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in <code>.env</code> to connect.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Diagnostics</h2>
      <p className="muted">Signed in as {email}.</p>
      <RlsProbePanel context="signed-in" />
    </div>
  );
}
