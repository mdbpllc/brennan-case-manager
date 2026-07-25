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

The LegiScan poller (T3) is a SEPARATE future edge function; the
`LEGISCAN_API_KEY` secret Michael stored in Supabase (2026-07-25) is for
that one, not statute-fetch.
