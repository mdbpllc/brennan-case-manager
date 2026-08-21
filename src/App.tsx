import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import CaseListPage from './pages/CaseListPage';
import NewCasePage from './pages/NewCasePage';
import OaaIntakePage from './pages/OaaIntakePage';
import CaseDetailPage from './pages/CaseDetailPage';
import PartiesPage from './pages/PartiesPage';
import PartyDetailPage from './pages/PartyDetailPage';
import PartyFormPage from './pages/PartyFormPage';
import BillWorkspacePage from './pages/BillWorkspacePage';
import BenchmarksPage from './pages/BenchmarksPage';
import LegalRulesPage from './pages/LegalRulesPage';
import StatutesPage from './pages/StatutesPage';
import StatuteViewerPage from './pages/StatuteViewerPage';
import BillTrackingPage from './pages/BillTrackingPage';
import InboxPage from './pages/InboxPage';
import OfficeNotesPage from './pages/OfficeNotesPage';
import TranscriptDetailPage from './pages/TranscriptDetailPage';
import SignInPage from './pages/SignInPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import TemplatesPage from './pages/TemplatesPage';
import { usingSupabase } from './data';
import { useAuth } from './auth/useAuth';

export default function App() {
  const { session, loading, email, signOut } = useAuth();

  // The magic-link landing page renders outside the shell and outside the gate —
  // it IS the thing that produces a session, so it cannot require one.
  if (window.location.pathname === '/auth/callback') {
    return (
      <main className="main">
        <Routes>
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </main>
    );
  }

  // Demo mode has no sign-in: there is nothing to authenticate against and the
  // zero-setup localStorage mode must keep working untouched.
  if (usingSupabase && !session) {
    return (
      <main className="main">
        {loading ? <div className="signin"><div className="card"><h3>Loading…</h3></div></div> : <SignInPage />}
      </main>
    );
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Brennan Law</h1>
          <span>Case Manager</span>
        </div>
        <nav>
          <NavLink to="/cases" className={({ isActive }) => (isActive ? 'active' : '')}>Cases</NavLink>
          <NavLink to="/inbox" className={({ isActive }) => (isActive ? 'active' : '')}>Inbox</NavLink>
          <NavLink to="/notes" className={({ isActive }) => (isActive ? 'active' : '')}>Office notes</NavLink>
          <NavLink to="/parties" className={({ isActive }) => (isActive ? 'active' : '')}>Parties</NavLink>
          <NavLink to="/benchmarks" className={({ isActive }) => (isActive ? 'active' : '')}>Benchmarks</NavLink>
          <NavLink to="/rules" className={({ isActive }) => (isActive ? 'active' : '')}>Legal rules</NavLink>
          <NavLink to="/statutes" className={({ isActive }) => (isActive ? 'active' : '')}>Statutes</NavLink>
          <NavLink to="/bills" className={({ isActive }) => (isActive ? 'active' : '')}>Bill tracking</NavLink>
          <NavLink to="/templates" className={({ isActive }) => (isActive ? 'active' : '')}>Templates</NavLink>
          {usingSupabase && (
            <NavLink to="/diagnostics" className={({ isActive }) => (isActive ? 'active' : '')}>Diagnostics</NavLink>
          )}
        </nav>
        <div className="mode">
          {usingSupabase ? 'Connected: central database' : 'Demo mode: data stays in this browser'}
          {usingSupabase && session && (
            <div className="whoami">
              <span title={email ?? ''}>{email}</span>
              <button className="linky" onClick={signOut}>Sign out</button>
            </div>
          )}
        </div>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/cases" replace />} />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/cases/new" element={<NewCasePage />} />
          <Route path="/cases/new/oaa" element={<OaaIntakePage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/cases/:id/parties" element={<CaseDetailPage />} />
          <Route path="/cases/:id/medical" element={<CaseDetailPage />} />
          <Route path="/cases/:id/calendar" element={<CaseDetailPage />} />
          <Route path="/cases/:id/transcripts" element={<CaseDetailPage />} />
          <Route path="/cases/:id/forms" element={<CaseDetailPage />} />
          <Route path="/cases/:caseId/transcripts/:transcriptId" element={<TranscriptDetailPage />} />
          <Route path="/cases/:caseId/bills/:billId" element={<BillWorkspacePage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/notes" element={<OfficeNotesPage />} />
          <Route path="/notes/:transcriptId" element={<TranscriptDetailPage />} />
          <Route path="/benchmarks" element={<BenchmarksPage />} />
          <Route path="/rules" element={<LegalRulesPage />} />
          <Route path="/statutes" element={<StatutesPage />} />
          <Route path="/statutes/:code/:chapter" element={<StatuteViewerPage />} />
          <Route path="/bills" element={<BillTrackingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/parties" element={<PartiesPage />} />
          <Route path="/parties/new" element={<PartyFormPage mode="new" />} />
          <Route path="/parties/:id" element={<PartyDetailPage />} />
          <Route path="/parties/:id/edit" element={<PartyFormPage mode="edit" />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </main>
    </div>
  );
}
