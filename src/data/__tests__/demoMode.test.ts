import { describe, it, expect } from 'vitest';
import { resolveUsingSupabase } from '../supabaseClient';

/**
 * REGRESSION TEST for the spec-feedback finding raised by the FE-D1 build
 * (docs/spec-feedback.md, finding 1): `npm run dev:demo` stopped reaching demo
 * mode once `.env` carried real Supabase values.
 *
 * The cause was not in the adapters — it was the selection rule. Vite loads
 * `.env` in EVERY mode (`--mode demo` only layers an additional `.env.demo` on
 * top), so a rule of `Boolean(url && key)` alone let a filled `.env` defeat the
 * `--mode demo` flag and serve the sign-in gate. Zero-setup demo mode is a
 * binding architecture rule, so the mode flag must win.
 *
 * These cases pin the rule itself. `true` means the Supabase adapter is
 * selected (and with it the sign-in gate); `false` means the localStorage
 * demo adapter.
 */

const URL = 'https://example.supabase.co';
const KEY = 'anon-key';

describe('resolveUsingSupabase — demo mode must mean demo', () => {
  it('forces the local adapter in demo mode even with a filled .env', () => {
    // The exact condition that broke on 2026-08-20.
    expect(resolveUsingSupabase(URL, KEY, 'demo')).toBe(false);
  });

  it('selects Supabase in development with a filled .env', () => {
    expect(resolveUsingSupabase(URL, KEY, 'development')).toBe(true);
  });

  it('selects Supabase in production with a filled .env', () => {
    expect(resolveUsingSupabase(URL, KEY, 'production')).toBe(true);
  });

  it('selects the local adapter with an empty .env in any mode', () => {
    for (const mode of ['demo', 'development', 'production', 'test']) {
      expect(resolveUsingSupabase(undefined, undefined, mode)).toBe(false);
      expect(resolveUsingSupabase('', '', mode)).toBe(false);
    }
  });

  it('selects the local adapter when only one of the two values is present', () => {
    // The pre-2026-08-20 state of this machine: keys present, values never
    // filled. A half-filled .env must not be treated as configured.
    expect(resolveUsingSupabase(URL, undefined, 'development')).toBe(false);
    expect(resolveUsingSupabase(undefined, KEY, 'development')).toBe(false);
    expect(resolveUsingSupabase(URL, '', 'development')).toBe(false);
    expect(resolveUsingSupabase('', KEY, 'development')).toBe(false);
  });

  it('treats only the exact mode name "demo" as demo mode', () => {
    // Guard against a near-miss mode name silently selecting Supabase.
    expect(resolveUsingSupabase(URL, KEY, 'Demo')).toBe(true);
    expect(resolveUsingSupabase(URL, KEY, 'demo-mode')).toBe(true);
  });
});
