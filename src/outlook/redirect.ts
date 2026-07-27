// Entry point for blank.html — the MSAL redirect target for the Outlook
// sign-in popup. Nothing else imports this file; it runs only in the popup.
//
// Why it exists: msal-browser v5 changed the popup contract. Older versions had
// the opener poll the popup's URL for the auth-response fragment, so a static
// redirect page worked. v5 instead requires the redirect page to parse the
// response itself and broadcast it back to the main frame — see
// PopupClient.waitForPopupResponse, which waits on that broadcast. Without this
// script the popup sits on blank.html with a valid `#code=...` in the URL that
// nobody reads, and sign-in never completes.
import { broadcastResponseToMainFrame } from '@azure/msal-browser/redirect-bridge';

broadcastResponseToMainFrame().catch((err: unknown) => {
  // The popup is about to be closed by MSAL in the success path, so this only
  // surfaces genuine failures (no response in the URL, malformed state).
  // Leave the message visible rather than closing silently — a popup that
  // vanishes with no explanation is the failure mode that cost a session.
  console.error('[outlook] MSAL redirect bridge failed:', err);
  const p = document.querySelector('p');
  if (p) p.textContent = 'Sign-in could not be completed. You can close this window.';
});
