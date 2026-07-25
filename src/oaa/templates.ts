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

/** Structural anchors of the Uvalde/Real digital form family. */
function looksLikeTier1Form(text: string): boolean {
  const t = text.toUpperCase();
  return (
    /THE STATE OF TEXAS\s+(?:VS?\.?|V\.)/.test(t) &&
    /APPOINTED\s+ATTORNEY/.test(t)
  );
}

export const OAA_TEMPLATES: OaaTemplate[] = [
  {
    key: 'uvalde-real-v1',
    label: 'Uvalde / Real County digital OAA',
    tier: 1,
    // Real County is assumed to match the Uvalde form family — spec §5 open
    // item says CONFIRM with a real sample before trusting the Real match.
    detect: (text) => looksLikeTier1Form(text) && /(UVALDE|REAL)\s+COUNTY/i.test(text),
    parse: (text) => parseTier1(text, 'uvalde-real-v1'),
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
