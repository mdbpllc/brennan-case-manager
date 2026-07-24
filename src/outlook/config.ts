// Outlook push configuration — activates like the Supabase adapter: set the
// env vars and the feature turns on; absent, the app runs unchanged and
// events queue locally as 'pending'. Setup steps: docs/outlook-setup.md.

export const MSAL_CLIENT_ID = import.meta.env.VITE_MSAL_CLIENT_ID as string | undefined;

/** Entra tenant: the firm's Directory (tenant) ID, or 'common' as a fallback. */
export const MSAL_TENANT_ID = (import.meta.env.VITE_MSAL_TENANT_ID as string | undefined) || 'common';

/** Dedicated calendar per the spec's recommendation — clean separation from
 *  the personal calendar and safer sync semantics. Override via env. */
export const OUTLOOK_CALENDAR_NAME =
  (import.meta.env.VITE_OUTLOOK_CALENDAR_NAME as string | undefined) || 'MDBP Cases';

export const outlookConfigured = Boolean(MSAL_CLIENT_ID);
