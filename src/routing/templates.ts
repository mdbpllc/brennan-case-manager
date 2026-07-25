// Spoken-tag template matching (design §3) — template-first, slots-fuzzy.
// Pilot evidence: tag TEMPLATES survive transcription even when slot
// entities garble, so we anchor on the literal phrasing and capture the
// noisy slot text between anchors for fuzzy resolution downstream.
import type { TagTemplate } from '../domain/transcripts';
import { tokenize, tokensMatch } from './text';

/** How much of the transcript opening the tag can live in (~20 seconds of speech). */
const OPENING_TOKENS = 55;
/** A slot may capture at most this many tokens (matter names, carrier names). */
const MAX_SLOT_TOKENS = 7;

/** Seed library from Michael's own scripted phrasings (design §3). Rows, not
 *  code: stored per-adapter and extendable in the UI; these seed the store. */
export const SEED_TAG_TEMPLATES: Omit<TagTemplate, 'id'>[] = [
  { pattern: 'this is a dictation for the {matter} matter', contextType: 'dictation', appliesDiscoverable: false },
  { pattern: 'adjuster call {carrier} the {matter} case', contextType: 'adjuster_call', appliesDiscoverable: false },
  { pattern: 'this is a call with the adjuster for {carrier} on the {matter} matter', contextType: 'adjuster_call', appliesDiscoverable: false },
  { pattern: 'witness interview {matter} versus {opposing}', contextType: 'witness_interview', appliesDiscoverable: true },
  { pattern: 'note to file on cause number {cause}', contextType: 'dictation', appliesDiscoverable: false },
  { pattern: 'intake call new pnc {client}', contextType: 'intake_call', appliesDiscoverable: false },
  { pattern: 'note for the {matter} matter', contextType: 'dictation', appliesDiscoverable: false },
  { pattern: 'note for later', contextType: 'dictation', appliesDiscoverable: false },
];

interface Segment { kind: 'literal' | 'slot'; tokens: string[]; name?: string }

function parsePattern(pattern: string): Segment[] {
  const segments: Segment[] = [];
  const parts = pattern.split(/(\{[a-z]+\})/i).filter(Boolean);
  for (const part of parts) {
    const slot = /^\{([a-z]+)\}$/i.exec(part);
    if (slot) segments.push({ kind: 'slot', tokens: [], name: slot[1].toLowerCase() });
    else {
      const toks = tokenize(part);
      if (toks.length > 0) segments.push({ kind: 'literal', tokens: toks });
    }
  }
  return segments;
}

/** Fraction of a literal segment's tokens that must fuzzy-match in sequence. */
function literalMatchesAt(literal: string[], tokens: string[], start: number): boolean {
  if (start + literal.length > tokens.length) return false;
  let hits = 0;
  for (let i = 0; i < literal.length; i++) {
    if (tokensMatch(literal[i], tokens[start + i])) hits++;
  }
  // Single-token literals must hit; longer literals tolerate one miss per 4 tokens.
  const needed = literal.length - Math.floor(literal.length / 4);
  return hits >= needed;
}

function findLiteral(literal: string[], tokens: string[], from: number, maxSkip: number): number {
  const limit = Math.min(tokens.length - literal.length, from + maxSkip);
  for (let i = from; i <= limit; i++) {
    if (literalMatchesAt(literal, tokens, i)) return i;
  }
  return -1;
}

export interface TemplateMatch {
  template: TagTemplate;
  /** Captured slot text by slot name, as spoken (still noisy — resolve fuzzily). */
  slots: Record<string, string>;
  /** The raw opening tokens the template consumed — for signal highlighting. */
  matchedText: string;
}

/**
 * Try each template against the transcript opening; first-anchored, leftmost
 * match wins. Returns null when no template resolves — content inference
 * (design §4) takes over.
 */
export function matchTagTemplate(text: string, templates: TagTemplate[]): TemplateMatch | null {
  const tokens = tokenize(text).slice(0, OPENING_TOKENS);
  let best: { match: TemplateMatch; at: number; literalTokens: number } | null = null;

  for (const template of templates) {
    const segments = parsePattern(template.pattern);
    const firstLiteral = segments.find((s) => s.kind === 'literal');
    if (!firstLiteral) continue;

    // The tag opens the recording — the first anchor must appear early.
    const anchorAt = findLiteral(firstLiteral.tokens, tokens, 0, 12);
    if (anchorAt === -1) continue;

    const slots: Record<string, string> = {};
    let pos = anchorAt;
    let ok = true;
    let literalTokens = 0;
    for (let s = 0; s < segments.length; s++) {
      const seg = segments[s];
      if (seg.kind === 'literal') {
        const skip = s === 0 ? 12 : MAX_SLOT_TOKENS;
        const at = findLiteral(seg.tokens, tokens, pos, skip);
        if (at === -1) { ok = false; break; }
        // Tokens skipped before this literal belong to the preceding slot.
        const prev = segments[s - 1];
        if (prev?.kind === 'slot' && prev.name) {
          slots[prev.name] = tokens.slice(pos, at).join(' ');
          if (!slots[prev.name]) { ok = false; break; }
        }
        pos = at + seg.tokens.length;
        literalTokens += seg.tokens.length;
      } else if (s === segments.length - 1 && seg.name) {
        // Trailing slot: capture up to MAX_SLOT_TOKENS after the last literal.
        const captured = tokens.slice(pos, pos + MAX_SLOT_TOKENS).join(' ');
        if (!captured) { ok = false; break; }
        slots[seg.name] = captured;
        pos += Math.min(MAX_SLOT_TOKENS, tokens.length - pos);
      }
    }
    if (!ok) continue;
    const match: TemplateMatch = {
      template,
      slots,
      matchedText: tokens.slice(anchorAt, pos).join(' '),
    };
    // Prefer the earliest anchor; break ties on more literal tokens (more specific template).
    if (!best || anchorAt < best.at || (anchorAt === best.at && literalTokens > best.literalTokens)) {
      best = { match, at: anchorAt, literalTokens };
    }
  }
  return best?.match ?? null;
}
