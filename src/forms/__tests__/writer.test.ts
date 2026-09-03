// THE WRITER — the interface, the fixture, and the BAA gate as a BUILD FACT.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §7.5 and §11 invariants 18 and
// 19. These are the tests that hold shut a promise made to Michael and to the
// data-hygiene rule in CLAUDE.md: no vendor is wired, no real record can move
// through a model path, and the demo writer cannot reach the network.
//
// The vendor-name sweep below is deliberately over SOURCE TEXT rather than over
// behaviour, because the thing being prevented is not a call at runtime — it is
// a NAME entering the tree at all, which is what would make wiring one a small
// edit rather than an authorized act.

import { describe, it, expect, vi, afterEach } from 'vitest';
import pkgJson from '../../../package.json';
import {
  FixtureParagraphWriter, WRITER_REGISTRY, resolveParagraphWriter,
} from '../writer';
import {
  CREDENTIAL_SECRET_NAME, handleDisclosuresWriter,
} from '../../../supabase/functions/disclosures-writer/handler';
import type { WriteInput } from '../writer/types';

// Vite's own glob rather than node:fs — this repo installs no @types/node and
// adds no dependency for a test (D-43's posture, and the rlsProbePanel test's
// `?raw` precedent). Paths come back repo-root-relative and forward-slashed on
// every platform, which is also what makes the assertions below readable.
const SOURCES = import.meta.glob('/src/**/*.{ts,tsx}', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;
const FUNCTIONS = import.meta.glob('/supabase/**/*.ts', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;
const ENV_EXAMPLE = import.meta.glob('/.env.example', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

/** Everything the sweeps read, minus this file — which necessarily carries the
 *  vendor names it is searching for and would otherwise fail its own sweep. */
function scannable(): [string, string][] {
  return [...Object.entries(SOURCES), ...Object.entries(FUNCTIONS)]
    .filter(([path]) => !path.endsWith('writer.test.ts'));
}

const baseWrite = (over: Partial<WriteInput> = {}): WriteInput => ({
  shape: 'treating-single',
  chronologyText: 'Halite Regional Hospital. Patient seen in the emergency department.',
  client: { name: 'Alba Quartzmoor', pronounSubject: 'she', pronounPossessive: 'her' },
  incidentDateLong: 'March 14, 2025',
  incidentNoun: 'collision',
  facility: { name: 'Halite Regional Hospital', type: 'emergency-medicine' },
  individuals: [{
    displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.',
    visits: [], missingFromLatest: false,
  }],
  fixedSentences: [{ slot: 'basis', text: 'Fixed basis sentence.' }],
  voiceExamples: [],
  writerInstructions: 'instructions',
  ...over,
});

afterEach(() => vi.restoreAllMocks());

describe('invariant 18 — the fixture writer, in BOTH modes, with no network', () => {
  it('is the writer in demo mode AND in Supabase mode', () => {
    // Not a branch that happens to agree today: there IS no other
    // implementation to select, which is the point.
    expect(resolveParagraphWriter(false).kind).toBe('fixture');
    expect(resolveParagraphWriter(true).kind).toBe('fixture');
  });

  it('makes ZERO network calls across a full extract and generate', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const w = new FixtureParagraphWriter();

    await w.extract({
      chronologyText: 'Seen at Halite Regional Hospital on March 14, 2025.',
      chronologyVersionId: 'v1',
      facilities: [{ caseProviderId: 'cp1', name: 'Halite Regional Hospital', aliases: [] }],
    });
    for (const shape of ['treating-single', 'treating-group', 'radiology-split',
      'imaging-facility', 'midlevel-rider', 'pharmacy', 'custodian-only',
      'other-non-physician', 'retained'] as const) {
      await w.write(baseWrite({ shape }));
    }

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe('the fixture writer honours the rules a real writer is held to', () => {
  const w = new FixtureParagraphWriter();

  it('returns individuals ONLY for the facilities it was given (§14.4, the OBGYN rule)', async () => {
    const out = await w.extract({
      chronologyText:
        'Patient seen at Halite Regional Hospital. Also treated at Cobalt OBGYN Associates.',
      chronologyVersionId: 'v1',
      facilities: [{ caseProviderId: 'cp1', name: 'Halite Regional Hospital', aliases: [] }],
    });
    // One entry, for the one facility on the list. The OBGYN in the text gets
    // nothing — not a facility, not a name, not a row.
    expect(out.perFacility).toHaveLength(1);
    expect(out.perFacility[0].caseProviderId).toBe('cp1');
    expect(JSON.stringify(out)).not.toMatch(/obgyn/i);
  });

  it('returns NOTHING for a facility the chronology does not mention', async () => {
    // "Pulled and found nobody" has to be reachable, or the custodian-only
    // fallback and D-48's distinction are never exercised by the walk.
    const out = await w.extract({
      chronologyText: 'Patient seen at Halite Regional Hospital.',
      chronologyVersionId: 'v1',
      facilities: [{ caseProviderId: 'cp2', name: 'Sunken Meadow Pharmacy', aliases: [] }],
    });
    expect(out.perFacility[0].individuals).toEqual([]);
  });

  it('never returns a type, a role marker, or a facility (AS-Q2)', async () => {
    const out = await w.extract({
      chronologyText: 'Seen at Halite Regional Hospital.',
      chronologyVersionId: 'v1',
      facilities: [{ caseProviderId: 'cp1', name: 'Halite Regional Hospital', aliases: [] }],
    });
    for (const ind of out.perFacility[0].individuals) {
      const keys = Object.keys(ind);
      expect(keys).not.toContain('providerType');
      expect(keys).not.toContain('roleMarker');
      expect(keys).not.toContain('type');
      expect(keys).not.toContain('facility');
    }
  });

  it('returns the parts each SHAPE asks for, and no others', async () => {
    const w2 = new FixtureParagraphWriter();
    expect(Object.keys(await w2.write(baseWrite({ shape: 'treating-single' }))).sort())
      .toEqual(['middle', 'opening']);
    expect(Object.keys(await w2.write(baseWrite({ shape: 'midlevel-rider' }))))
      .toEqual(['opening']);
    expect(Object.keys(await w2.write(baseWrite({ shape: 'pharmacy' })))).toEqual(['body']);
    expect(Object.keys(await w2.write(baseWrite({ shape: 'other-non-physician' }))))
      .toEqual(['body']);
    expect(Object.keys(await w2.write(baseWrite({ shape: 'custodian-only' }))))
      .toEqual(['care_episode_clause']);
    // Retained is hand-typed by Michael — the writer is not called for it at
    // all, and returns nothing if it somehow is.
    expect(await w2.write(baseWrite({ shape: 'retained' }))).toEqual({});
  });

  it('does not restate the fixed sentence it was shown', async () => {
    // The app places those. This is a property of the FIXTURE, asserted so the
    // walk shows what a correct return looks like — it is NOT a check over a
    // real writer's output, which nothing in this build ever inspects.
    const parts = await w.write(baseWrite());
    expect(JSON.stringify(parts)).not.toContain('Fixed basis sentence.');
  });
});

describe('invariant 19 — the BAA gate as a build fact', () => {
  it('actually reads the tree it claims to sweep', () => {
    // Without this, a glob that silently matched nothing would make every
    // sweep below pass vacuously — a clean bill of health from a search that
    // never ran, which is the worst possible failure mode for this particular
    // set of assertions.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(50);
    expect(Object.keys(FUNCTIONS)).toContain(
      '/supabase/functions/disclosures-writer/handler.ts',
    );
    expect(scannable().some(([p]) => p === '/src/forms/writer/fixtureWriter.ts')).toBe(true);
    // And the sweep would catch a vendor name if one were there.
    expect('const key = process.env.ANTHROPIC_API_KEY;')
      .toMatch(/ANTHROPIC_API_KEY/i);
  });

  it('has exactly ONE writer in the registry, and it is the fixture', () => {
    expect([...WRITER_REGISTRY]).toEqual(['fixture']);
  });

  it('refuses when the credential is absent — which is its state everywhere', () => {
    const out = handleDisclosuresWriter({ authorization: 'Bearer a-real-jwt' });
    expect(out.status).toBe(503);
    expect(out.body.error).toMatch(/not configured/i);
    expect(out.body.detail).toContain(CREDENTIAL_SECRET_NAME);
    expect(out.body.detail).toMatch(/business associate agreement/i);
    expect(out.body.detail).toMatch(/nothing was transmitted/i);
  });

  it('authenticates BEFORE it reports configuration', () => {
    // A function that told an unauthenticated caller "not configured" would be
    // describing the firm's server-side setup to anyone who asked.
    for (const authorization of [undefined, '', 'Basic abc', 'Bearer ']) {
      const out = handleDisclosuresWriter({ authorization });
      expect(out.status).toBe(401);
      expect(JSON.stringify(out.body)).not.toContain(CREDENTIAL_SECRET_NAME);
    }
  });

  it('still calls no vendor even WITH a credential set', () => {
    const out = handleDisclosuresWriter({
      authorization: 'Bearer a-real-jwt', credential: 'anything',
    });
    expect(out.status).toBe(501);
    expect(out.body.error).toMatch(/no writer implementation is wired/i);
  });

  it('carries exactly ONE credential slot, and it names no vendor', () => {
    expect(CREDENTIAL_SECRET_NAME).toBe('DISCLOSURES_WRITER_CREDENTIAL');
    expect(CREDENTIAL_SECRET_NAME).not.toMatch(
      /anthropic|openai|claude|gpt|gemini|azure|bedrock|cohere|mistral|llama|ollama/i,
    );
  });

  it('has NO vendor SDK in package.json', () => {
    const pkg = pkgJson as {
      dependencies?: Record<string, string>; devDependencies?: Record<string, string>;
    };
    const names = [
      ...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {}),
    ].join(' ');
    expect(names).not.toMatch(
      /anthropic|openai|google\/generative|google-generativeai|cohere|mistral|replicate|ollama|langchain|bedrock/i,
    );
  });

  it('has NO vendor name and NO vendor key name in src/, supabase/ or .env.example', () => {
    const VENDOR = new RegExp(
      [
        'ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'GOOGLE_API_KEY', 'AZURE_OPENAI',
        'api[.]anthropic[.]com', 'api[.]openai[.]com', 'generativelanguage[.]googleapis',
        'claude-3', 'claude-opus', 'gpt-4', 'gpt-5', 'gemini-1',
      ].join('|'),
      'i',
    );
    const offenders: string[] = [];
    for (const [path, text] of [...scannable(), ...Object.entries(ENV_EXAMPLE)]) {
      const hit = text.match(VENDOR);
      if (hit) offenders.push(`${path}: ${hit[0]}`);
    }
    expect(offenders).toEqual([]);
  });

  it('names the vendor-neutral secret in exactly the places it belongs', () => {
    // ONE credential slot in the tree (D-38), and the LITERAL appears exactly
    // once: the Deno entry point imports the constant rather than repeating
    // the string, so there is a single place a secret name can be changed and
    // no second copy to fall out of step with it.
    const carrying = scannable()
      .filter(([, text]) => text.includes("'DISCLOSURES_WRITER_CREDENTIAL'"))
      .map(([path]) => path);
    expect(carrying).toEqual(['/supabase/functions/disclosures-writer/handler.ts']);

    const entry = FUNCTIONS['/supabase/functions/disclosures-writer/index.ts'];
    expect(entry).toContain('CREDENTIAL_SECRET_NAME');
    expect(entry).not.toContain("'DISCLOSURES_WRITER_CREDENTIAL'");

    // It is a Supabase SECRET, not a client env value, so it must not appear
    // in .env.example at all (D-38 says so in terms).
    for (const text of Object.values(ENV_EXAMPLE)) {
      expect(text).not.toContain('DISCLOSURES_WRITER_CREDENTIAL');
    }
  });
});
