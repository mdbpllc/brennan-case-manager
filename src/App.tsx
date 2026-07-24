import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import CaseListPage from './pages/CaseListPage';
import NewCasePage from './pages/NewCasePage';
import CaseDetailPage from './pages/CaseDetailPage';
import PartiesPage from './pages/PartiesPage';
import PartyDetailPage from './pages/PartyDetailPage';
import PartyFormPage from './pages/PartyFormPage';
import BillWorkspacePage from './pages/BillWorkspacePage';
import BenchmarksPage from './pages/BenchmarksPage';
import LegalRulesPage from './pages/LegalRulesPage';
import { usingSupabase } from './data';

export default function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Brennan Law</h1>
          <span>Case Manager</span>
        </div>
        <nav>
          <NavLink to="/cases" className={({ isActive }) => (isActive ? 'active' : '')}>Cases</NavLink>
          <NavLink to="/parties" className={({ isActive }) => (isActive ? 'active' : '')}>Parties</NavLink>
          <NavLink to="/benchmarks" className={({ isActive }) => (isActive ? 'active' : '')}>Benchmarks</NavLink>
          <NavLink to="/rules" className={({ isActive }) => (isActive ? 'active' : '')}>Legal rules</NavLink>
        </nav>
        <div className="mode">
          {usingSupabase ? 'Connected: central database' : 'Demo mode: data stays in this browser'}
        </div>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/cases" replace />} />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/cases/new" element={<NewCasePage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/cases/:id/parties" element={<CaseDetailPage />} />
          <Route path="/cases/:id/medical" element={<CaseDetailPage />} />
          <Route path="/cases/:id/calendar" element={<CaseDetailPage />} />
          <Route path="/cases/:caseId/bills/:billId" element={<BillWorkspacePage />} />
          <Route path="/benchmarks" element={<BenchmarksPage />} />
          <Route path="/rules" element={<LegalRulesPage />} />
          <Route path="/parties" element={<PartiesPage />} />
          <Route path="/parties/new" element={<PartyFormPage mode="new" />} />
          <Route path="/parties/:id" element={<PartyDetailPage />} />
          <Route path="/parties/:id/edit" element={<PartyFormPage mode="edit" />} />
        </Routes>
      </main>
    </div>
  );
}
