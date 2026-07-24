// Delegated-permission auth against Michael's M365 account via MSAL.
// The popup sign-in is always a human action — nothing here stores or
// handles credentials; MSAL keeps tokens in its own cache.
// msal-browser is dynamically imported so the (large) library never loads
// in demo sessions that don't touch Outlook.
import type { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_CLIENT_ID, MSAL_TENANT_ID, outlookConfigured } from './config';

const SCOPES = ['Calendars.ReadWrite'];

let appPromise: Promise<{
  pca: PublicClientApplication;
  InteractionRequiredAuthError: typeof import('@azure/msal-browser').InteractionRequiredAuthError;
}> | null = null;

function app() {
  if (!outlookConfigured) throw new Error('Outlook is not configured (VITE_MSAL_CLIENT_ID is unset).');
  if (!appPromise) {
    appPromise = import('@azure/msal-browser').then(async (msal) => {
      const pca = new msal.PublicClientApplication({
        auth: {
          clientId: MSAL_CLIENT_ID!,
          authority: `https://login.microsoftonline.com/${MSAL_TENANT_ID}`,
          redirectUri: window.location.origin,
        },
        cache: { cacheLocation: 'localStorage' },
      });
      await pca.initialize();
      return { pca, InteractionRequiredAuthError: msal.InteractionRequiredAuthError };
    });
  }
  return appPromise;
}

/** The signed-in account, or null (also null when the feature is unconfigured). */
export async function getSignedInAccount(): Promise<AccountInfo | null> {
  if (!outlookConfigured) return null;
  const { pca } = await app();
  return pca.getAllAccounts()[0] ?? null;
}

/** Interactive sign-in (popup). Call only from a user gesture. */
export async function signIn(): Promise<AccountInfo> {
  const { pca } = await app();
  const res = await pca.loginPopup({ scopes: SCOPES });
  return res.account;
}

/** Forget the local session (does not sign the account out of Microsoft globally). */
export async function disconnect(): Promise<void> {
  const { pca } = await app();
  await pca.clearCache();
}

export async function getToken(): Promise<string> {
  const { pca, InteractionRequiredAuthError } = await app();
  const account = pca.getAllAccounts()[0];
  if (!account) throw new Error('Not signed in to Outlook.');
  try {
    const res = await pca.acquireTokenSilent({ scopes: SCOPES, account });
    return res.accessToken;
  } catch (e) {
    if (e instanceof InteractionRequiredAuthError) {
      const res = await pca.acquireTokenPopup({ scopes: SCOPES, account });
      return res.accessToken;
    }
    throw e;
  }
}
