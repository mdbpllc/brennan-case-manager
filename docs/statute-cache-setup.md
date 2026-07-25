# Statute cache — live-mode setup

Demo mode needs nothing: the five fixture chapters covering the seeded
registry cites are committed (src/statutes/fixtures/) and load on demand.

Live mode (Supabase) adds cache-any-chapter-on-demand via one edge function.

## One-time deploy (Michael or a Code session, with the Supabase CLI)

```bash
supabase functions deploy statute-fetch --no-verify-jwt
```

Notes:
- The function takes no secrets — Texas statute text is public domain. It
  only proxies `tcss.legis.texas.gov/resources/…` with a polite UA (the
  browser can't fetch the .gov host directly because of CORS).
- `--no-verify-jwt` is optional; the app sends the anon key either way.
  Leaving JWT verification ON is fine and slightly tighter.
- Run the updated `db/schema.sql` against the project first (it adds
  statute_chapters, statute_sections, registry_verification_snapshots,
  watch_flags).

## What uses it

- The Statutes pages (viewer, prefetch, refresh) — cache-on-demand.
- "Refresh cache + run tripwire" re-fetches every cached chapter and raises
  `text-changed-since-verified` flags on registry entries whose verified
  text hash moved (advisory only — verification stays attorney-only).

## legiscan-poller (bill tracking, T3)

The second function. Uses the `LEGISCAN_API_KEY` secret Michael stored in
Supabase (2026-07-25) — statute-fetch does NOT use that key.

```bash
supabase functions deploy legiscan-poller
```

Then schedule it: dashboard → Edge Functions → legiscan-poller → add a cron
trigger. Interim cadence (design §5) is monthly — `0 6 1 * *`. Tighten to
weekly when prefiling opens (Nov 2026) and 2×/week during the 2027 session.

Division of labor (deliberate): the poller only FETCHES AND STORES raw bill
rows. The app's tested matcher/lifecycle raises and clears watch flags when
the Bill-tracking page loads — legal-adjacent logic stays in one tested
codebase. Effective dates aren't a single LegiScan field; enter them on
passage (the app records them from imported bundles when present).

The poller has NOT been exercised against the live API yet (needs the
deploy + a session with real traffic). First deploy: invoke it once
manually from the dashboard and read its JSON log before trusting the cron.
