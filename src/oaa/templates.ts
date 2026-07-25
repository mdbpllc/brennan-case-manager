// Per-county OAA template registry (spec §1 architecture note).
// county → known layout(s) → parser. Anything unmatched falls back to Tier 2,
// which is gated on the local AI hardware (P1) — the UI offers manual entry.
// New counties are added by registering a template here, not by new code paths.

import type { OaaExtraction } from '../domain/oaa';
import { parseTier1 } from './parseTier1';

export interface OaaTemplate {
  key: string;
  label: string;
  tier: 1 | 2;
  /** Does this document text match the template's form family? */
  detect: (text: string) => boolean;
  parse: (text: string) => OaaExtraction;
}

/** Structural anchors of the standard Texas OAA form family. Confirmed against
 *  a real Medina County order (2026-07-25): the same form is used across
 *  counties — Uvalde/Real file it digitally, Medina prints and scans it — so
 *  detection keys on the form's structure and the county is extracted data,
 *  not a whitelist. (A scan with no text layer still lands in Tier 2 first.) */
function looksLikeTier1Form(text: string): boolean {
  const t = text.toUpperCase();
  const hasCaption =
    /THE STATE OF TEXAS\s+(?:VS?\.?|V\.)/.test(t) || // one-line caption style
    (/ORDER OF ATTORNEY APPOINTMENT/.test(t) && /STATE OF TEXAS/.test(t)); // boxed style
  return hasCaption && /APPOINTED\s+ATTORNEY/.test(t);
}

export const OAA_TEMPLATES: OaaTemplate[] = [
  {
    key: 'oaa-standard-v1',
    label: 'Standard Texas OAA form (Uvalde / Real / Medina)',
    tier: 1,
    detect: (text) => looksLikeTier1Form(text),
    parse: (text) => parseTier1(text, 'oaa-standard-v1'),
  },
];

/** First matching template, or null → Tier 2 fallback (unrecognized format). */
export function matchOaaTemplate(text: string): OaaTemplate | null {
  return OAA_TEMPLATES.find((t) => t.detect(text)) ?? null;
}

/** A scan with no text layer (or nearly none) is a Tier 2 packet by definition. */
export function hasUsableTextLayer(text: string): boolean {
  return text.replace(/\s+/g, ' ').trim().length >= 120;
}
