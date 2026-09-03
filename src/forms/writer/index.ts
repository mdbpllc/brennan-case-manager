/**
 * Writer selection — through the ONE existing mode seam, never a second one.
 *
 * `resolveUsingSupabase` already decides which data adapter the app talks to.
 * The writer rides that same decision (§7.5) rather than introducing an env
 * variable of its own, which is the class of defect spec-feedback finding 1
 * recorded: a second seam is a second thing that can disagree with the first,
 * and the disagreement is invisible until something behaves oddly in one mode.
 *
 * ⚠ **THE REGISTRY IS `['fixture']` IN BOTH MODES, TODAY AND UNTIL `H12-v`.**
 * That is not an accident of configuration and no env value can change it —
 * there is no other implementation in the tree to select. It is the BAA gate
 * expressed as a build fact, and invariants 18 and 19 assert every limb of it.
 */

import { FixtureParagraphWriter } from './fixtureWriter';
import type { ParagraphWriter } from './types';

export * from './types';
export { FixtureParagraphWriter } from './fixtureWriter';

/**
 * Every writer this build can select. ONE entry, deliberately.
 *
 * When `H12-v` is ruled and a BAA is signed, a server-backed writer joins this
 * list and the Edge Function stub gains its vendor call — one place, named
 * here, so the change is visible rather than diffuse.
 */
export const WRITER_REGISTRY = ['fixture'] as const;
export type WriterKind = (typeof WRITER_REGISTRY)[number];

/**
 * The writer for the current mode.
 *
 * `usingSupabase` is accepted as an argument rather than imported so this stays
 * testable in both directions without touching `import.meta.env` — and so the
 * fact that it currently makes NO difference is visible in the signature
 * instead of hidden behind a branch that does not exist.
 */
export function resolveParagraphWriter(_usingSupabase: boolean): ParagraphWriter {
  // Both modes, one answer. The parameter is real and will matter when a
  // server-backed writer exists; until then returning the fixture in live mode
  // is the ONLY safe behaviour, because the alternative is a PHI-bearing call
  // to a vendor nobody has chosen under a BAA nobody has signed.
  return new FixtureParagraphWriter();
}
