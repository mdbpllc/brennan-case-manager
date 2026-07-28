// FIRST import, deliberately. Evaluating this module constructs the Supabase
// client, and GoTrueClient reads window.location.href synchronously at the top of
// its _initialize() — so the magic-link fragment is captured before any router or
// component can rewrite the URL. This ordering is the structural guard against the
// Outlook failure mode (session-log #20); see supabaseClient.ts and
// AuthCallbackPage.tsx.
import './data/supabaseClient';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './auth/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
