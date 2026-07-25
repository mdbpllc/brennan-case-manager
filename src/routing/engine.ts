// Route inference (design §§3–4): weighted signals over transcript text,
// never auto-committing on weak evidence. Pure functions over plain data —
// no adapter access, so this runs identically in the app, in tests, and
// (later) re-implemented behind the pipeline service.
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type {
  ConfidenceBucket, RoutingSignal, RoutingSuggestion, TagTemplate, TranscriptContextType,
} from '../domain/transcripts';
import { matchIdentifiers, matchPhones } from './normalizer';
import { matchTagTemplate } from './templates';
import { STOPWORDS, tokenize, tokensMatch } from './text';

/** An identifier the router should recognize beyond case cause numbers —
 *  carrier claim numbers, docket numbers, etc. — mapped to its case. */
export interface KnownIdentifier {
  value: string;
  caseId: string;
  label?: string;
}

export interface RoutingContext {
  cases: CaseRecord[];
  parties: PartyRecord[];
  links: CasePartyLink[];
  templates: TagTemplate[];
  /** Extra known identifiers (claim numbers live outside the case record). */
  identifiers?: KnownIdentifier[];
}

export interface RoutingInput {
  text: string;
  /** Distinct diarization speaker count, when known. */
  speakerCount?: number;
}

/** Signal weights → numeric scores backing the confidence buckets. Tunable;
 *  the routing_decisions log is the tuning data (design §4). */
const SCORE = { strong: 3, medium: 1.5, weak: 0.5 } as const;

/** Lexical cues suggest a context TYPE only, never a case (design §4). */
const LEXICAL_CUES: { phrase: string; contextType: TranscriptContextType }[] = [
  { phrase: 'adjuster', contextType: 'adjuster_call' },
  { phrase: 'deposition', contextType: 'deposition' },
  { phrase: 'your honor', contextType: 'hearing' },
  { phrase: 'witness interview', contextType: 'witness_interview' },
  { phrase: 'intake', contextType: 'intake_call' },
  { phrase: 'new client', contextType: 'intake_call' },
  { phrase: 'note to file', contextType: 'dictation' },
  { phrase: 'dictation', contextType: 'dictation' },
  { phrase: 'voicemail', contextType: 'voicemail' },
  { phrase: 'mediation', contextType: 'mediation_dictation' },
];

interface CaseIndexEntry {
  rec: CaseRecord;
  partyIds: Set<string>;
}

/** Distinctive tokens of a display name / caption — what we fuzzy-hunt for. */
function distinctiveTokens(name: string): string[] {
  return tokenize(name).filter((t) => t.length >= 4 && !STOPWORDS.has(t));
}

function textContainsToken(textTokens: string[], token: string): string | null {
  for (const t of textTokens) if (tokensMatch(token, t)) return t;
  return null;
}

/** A name "matches" when its distinctive tokens appear (fuzzily) in the text —
 *  both for a two-token name, at least two for longer names/captions. */
function nameMatch(textTokens: string[], name: string): string | null {
  const toks = distinctiveTokens(name);
  if (toks.length === 0) return null;
  const hits: string[] = [];
  for (const nt of toks) {
    const hit = textContainsToken(textTokens, nt);
    if (hit) hits.push(hit);
  }
  const needed = Math.min(toks.length, 2);
  return hits.length >= needed ? hits.join(' ') : null;
}

/** Individuals are usually referenced by surname alone ("the Garcia matter") —
 *  pilot evidence: names transcribe near-universally correctly. */
function individualMatch(textTokens: string[], p: PartyRecord): string | null {
  const full = nameMatch(textTokens, p.displayName);
  if (full || p.kind !== 'individual') return full;
  const toks = distinctiveTokens(p.displayName);
  const surname = toks[toks.length - 1];
  if (!surname || surname.length < 5) return null; // short surnames too collision-prone alone
  return textContainsToken(textTokens, surname);
}

/** Strong signals are independent only when they rest on different transcript
 *  words — "Terrence Boyd" and caption "State v. Boyd" are ONE piece of evidence. */
function countIndependentStrong(signals: RoutingSignal[]): number {
  const strong = [...signals.filter((s) => s.weight === 'strong')]
    .sort((a, b) => b.matchedText.length - a.matchedText.length);
  const used = new Set<string>();
  let count = 0;
  for (const s of strong) {
    const toks = tokenize(s.matchedText);
    if (toks.some((t) => used.has(t))) continue;
    for (const t of toks) used.add(t);
    count++;
  }
  return count;
}

export function inferRouting(input: RoutingInput, ctx: RoutingContext): RoutingSuggestion[] {
  const textTokens = tokenize(input.text);
  const caseIndex = new Map<string, CaseIndexEntry>();
  for (const c of ctx.cases) caseIndex.set(c.id, { rec: c, partyIds: new Set() });
  for (const l of ctx.links) caseIndex.get(l.caseId)?.partyIds.add(l.partyId);
  const partiesById = new Map(ctx.parties.map((p) => [p.id, p]));
  const casesForParty = (partyId: string): string[] =>
    [...caseIndex.values()].filter((e) => e.partyIds.has(partyId)).map((e) => e.rec.id);

  const caseSignals = new Map<string, RoutingSignal[]>();
  const typeSignals: RoutingSignal[] = [];
  // A signal shared across N candidate cases (same adjuster on two files) is
  // 1/N as discriminating — its score is split, never double-counted.
  const divisors = new WeakMap<RoutingSignal, number>();
  const add = (sig: RoutingSignal, sharedAcross = 1) => {
    if (sig.caseId) {
      divisors.set(sig, Math.max(1, sharedAcross));
      const list = caseSignals.get(sig.caseId) ?? [];
      list.push(sig);
      caseSignals.set(sig.caseId, list);
    } else {
      typeSignals.push(sig);
    }
  };

  // --- Tag template (design §3): template-first, slots resolved fuzzily ---
  const tag = matchTagTemplate(input.text, ctx.templates);
  let tagResolvedCaseId: string | null = null;
  let tagContextType: TranscriptContextType | undefined;
  if (tag) {
    tagContextType = tag.template.contextType;
    // Resolve matter-ish slots against captions/case types and client names;
    // carrier/client slots against party names.
    const slotText = Object.values(tag.slots).join(' ');
    if (slotText) {
      const slotTokens = tokenize(slotText);
      for (const entry of caseIndex.values()) {
        const label = `${entry.rec.caption ?? ''} ${entry.rec.caseType}`;
        const capTokens = distinctiveTokens(label);
        const hit = capTokens.find((ct) => slotTokens.some((st) => tokensMatch(ct, st)));
        if (hit) { tagResolvedCaseId = entry.rec.id; break; }
        // Client name in the slot ("the Garcia matter") also resolves the case.
        for (const pid of entry.partyIds) {
          const p = partiesById.get(pid);
          if (p && distinctiveTokens(p.displayName).some((pt) => slotTokens.some((st) => tokensMatch(pt, st)))) {
            tagResolvedCaseId = entry.rec.id;
            break;
          }
        }
        if (tagResolvedCaseId) break;
      }
      // Cause-number slot resolution rides on the identifier matcher below.
    }
    add({
      kind: 'tag_template',
      weight: 'strong',
      matchedText: tag.matchedText,
      resolvedTo: tagResolvedCaseId
        ? `template "${tag.template.pattern}" → ${caseIndex.get(tagResolvedCaseId)?.rec.caption ?? tagResolvedCaseId}`
        : `template "${tag.template.pattern}" (matter not resolved)`,
      caseId: tagResolvedCaseId ?? undefined,
      contextType: tag.template.contextType,
    });
  }

  // --- Strong: party/matter/counsel/provider names against the case DB ---
  for (const p of ctx.parties) {
    const hit = individualMatch(textTokens, p);
    if (!hit) continue;
    const caseIds = casesForParty(p.id);
    for (const caseId of caseIds) {
      add({
        kind: 'name_match', weight: 'strong', matchedText: hit,
        resolvedTo: p.displayName, caseId,
      }, caseIds.length);
    }
  }
  for (const entry of caseIndex.values()) {
    if (!entry.rec.caption) continue;
    const hit = nameMatch(textTokens, entry.rec.caption);
    if (hit) {
      add({
        kind: 'name_match', weight: 'strong', matchedText: hit,
        resolvedTo: `caption: ${entry.rec.caption}`, caseId: entry.rec.id,
      });
    }
  }

  // --- Strong: cause/claim numbers via normalizer + edit distance ---
  const knownIds: KnownIdentifier[] = [
    ...ctx.cases.filter((c) => c.causeNumber).map((c) => ({
      value: c.causeNumber as string, caseId: c.id, label: `cause no. ${c.causeNumber}`,
    })),
    ...(ctx.identifiers ?? []),
  ];
  for (const m of matchIdentifiers(input.text, knownIds.map((k) => k.value))) {
    const k = knownIds.find((x) => x.value === m.known);
    if (!k) continue;
    add({
      kind: 'identifier_match', weight: 'strong', matchedText: m.spoken,
      resolvedTo: k.label ?? k.value, caseId: k.caseId,
    });
    if (tag && !tagResolvedCaseId && tag.slots.cause) tagResolvedCaseId = k.caseId;
  }

  // --- Medium: carrier + adjuster co-occurrence on the same case ---
  for (const entry of caseIndex.values()) {
    const sigs = caseSignals.get(entry.rec.id) ?? [];
    const matched = new Set(sigs.filter((s) => s.kind === 'name_match').map((s) => s.resolvedTo));
    const carrier = [...entry.partyIds].map((id) => partiesById.get(id))
      .find((p) => p?.partyType === 'insuranceCompany' && matched.has(p.displayName));
    const adjuster = [...entry.partyIds].map((id) => partiesById.get(id))
      .find((p) => p?.partyType === 'adjuster' && matched.has(p.displayName));
    if (carrier && adjuster) {
      add({
        kind: 'carrier_adjuster_cooccurrence', weight: 'medium',
        matchedText: `${adjuster.displayName} + ${carrier.displayName}`,
        resolvedTo: 'carrier and adjuster on the same claim', caseId: entry.rec.id,
      });
    }
  }

  // --- Medium: spoken phone number → contact match ---
  const phoneOwners: { phone: string; party: PartyRecord }[] = [];
  for (const p of ctx.parties) {
    const phone = p.fields['phone'];
    if (typeof phone === 'string' && phone) phoneOwners.push({ phone, party: p });
  }
  for (const m of matchPhones(input.text, phoneOwners.map((o) => o.phone))) {
    const owner = phoneOwners.find((o) => o.phone === m.known);
    if (!owner) continue;
    const caseIds = casesForParty(owner.party.id);
    for (const caseId of caseIds) {
      add({
        kind: 'phone_match', weight: 'medium', matchedText: m.spoken,
        resolvedTo: `${owner.party.displayName}'s number`, caseId,
      }, caseIds.length);
    }
  }

  // --- Type-only signals ---
  const lower = input.text.toLowerCase();
  for (const cue of LEXICAL_CUES) {
    if (lower.includes(cue.phrase)) {
      add({
        kind: 'lexical_cue', weight: 'medium', matchedText: cue.phrase,
        resolvedTo: `suggests ${cue.contextType}`, contextType: cue.contextType,
      });
      break; // one cue is enough; first (most specific ordering) wins
    }
  }
  if (input.speakerCount !== undefined) {
    add({
      kind: 'speaker_count', weight: 'weak',
      matchedText: `${input.speakerCount} speaker${input.speakerCount === 1 ? '' : 's'}`,
      resolvedTo: input.speakerCount === 1 ? 'suggests dictation' : 'suggests call/meeting',
      contextType: input.speakerCount === 1 ? 'dictation' : undefined,
    });
  }

  // --- Score and bucket per case (design §4 confidence rules) ---
  const scored = [...caseSignals.entries()].map(([caseId, signals]) => ({
    caseId, signals,
    score: signals.reduce((s, sig) => s + SCORE[sig.weight] / (divisors.get(sig) ?? 1), 0),
  })).sort((a, b) => b.score - a.score);

  const ranked = scored.map((entry, idx) => {
    const { caseId, signals, score } = entry;
    const strongCount = countIndependentStrong(signals);
    const templateResolvedHere = tagResolvedCaseId === caseId
      && signals.some((s) => s.kind === 'tag_template');
    // High needs corroboration AND dominance: ≥2 independent strong signals
    // isn't enough if the runner-up case carries the same evidence.
    const runnerUp = idx === 0 ? scored[1] : scored[0];
    const dominant = !runnerUp || score - runnerUp.score >= SCORE.medium;
    let confidence: ConfidenceBucket;
    if (templateResolvedHere || (strongCount >= 2 && dominant)) confidence = 'high';
    else if (strongCount >= 1 || score >= 2 * SCORE.medium) confidence = 'medium';
    else confidence = 'low';
    return { caseId, signals, score, confidence };
  });

  const contextType = tagContextType
    ?? typeSignals.find((s) => s.kind === 'lexical_cue')?.contextType
    ?? typeSignals.find((s) => s.kind === 'speaker_count')?.contextType;

  if (ranked.length === 0) {
    // Unroutable — no case candidate; the inbox asks for manual assignment.
    return [{ contextType, confidence: 'low', score: 0, signals: typeSignals }];
  }

  return ranked.slice(0, 3).map((r, i) => ({
    caseId: r.caseId,
    contextType,
    confidence: i === 0 ? r.confidence : (r.confidence === 'high' ? 'medium' : 'low'),
    score: r.score,
    signals: i === 0 ? [...r.signals, ...typeSignals] : r.signals,
  }));
}
