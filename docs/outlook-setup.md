# Outlook calendar push — one-time setup (Michael)

The app pushes every case event to Outlook (spec: `docs/specs/outlook-calendar-sync.md`,
Phase 1). Until this setup is done, events still work — they queue as
"pending" and all push automatically the first time you connect.

Takes about five minutes. You need to be signed in to the firm's Microsoft 365.

## 1. Register the app in Microsoft Entra

1. Go to https://entra.microsoft.com → **App registrations** → **New registration**.
2. Name: `Brennan Case Manager` (anything works).
3. Supported account types: **Accounts in this organizational directory only**.
4. Redirect URI: choose platform **Single-page application (SPA)** and enter
   `http://localhost:5173`
   (add the real URL later if the app ever runs somewhere else).
5. Click **Register**.

## 2. Grant the calendar permission

1. In the new registration: **API permissions** → **Add a permission** →
   **Microsoft Graph** → **Delegated permissions**.
2. Add **Calendars.ReadWrite**. (No admin consent needed for your own mailbox
   in most tenants; if the tenant requires it, click "Grant admin consent".)

## 3. Copy two values into `.env`

From the registration's **Overview** page:

- **Application (client) ID** → `VITE_MSAL_CLIENT_ID`
- **Directory (tenant) ID** → `VITE_MSAL_TENANT_ID`

Copy `.env.example` to `.env` if you don't have one, fill those two lines in,
and restart the dev server.

## 4. Connect

Open any case → **Calendar** tab → **Connect Outlook** → sign in with your
M365 account in the popup. Everything queued pushes immediately, and a
calendar named **MDBP Cases** appears in Outlook (change the name via
`VITE_OUTLOOK_CALENDAR_NAME` before first connect if you prefer another).

## Notes

- Direction of authority is software → Outlook. Edit or cancel an event in
  the app and the Outlook copy updates or disappears. Events you edit
  directly in Outlook will be overwritten the next time that event is pushed
  — make changes in the app. (Two-way sync is Phase 2, backlogged.)
- Each pushed event carries the matter reference (file number + case id) in
  a hidden extended property and a "Matter:" line in the body — the Phase 2
  matching hook.
- Claude never signs in or handles credentials; the popup sign-in is always
  your action.
