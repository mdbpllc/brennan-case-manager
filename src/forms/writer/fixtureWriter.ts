/**
 * The FIXTURE writer — the only `ParagraphWriter` this slice ships, in BOTH
 * modes (§7.5, D-35).
 *
 * It is **the permanent demo-mode writer, not a stopgap.** Demo mode is
 * zero-setup and fictional by design; a vendor call from it would be neither.
 *
 * ⚠ **ZERO NETWORK CALLS.** Not "no calls today" — no code path here can make
 * one, and a test spies on `fetch` across a full extract-and-generate to prove
 * it. That is what keeps CLAUDE.md's data-hygiene bullet true while the BAA
 * (`H12-v`) is unsigned: nothing leaves the machine because there is nothing
 * here that could send it.
 *
 * Everything it returns is FICTIONAL and reads in the register of
 * `form-engine.md` §9 — close enough to exercise the assembly, the shapes and
 * the panel honestly, and never mistakable for a real record.
 */

import type {
  ExtractionInput, ExtractionResult, ParagraphWriter, WriteInput, WriterParts,
} from './types';

/** Deterministic per facility name, so a walk-through is repeatable and a test
 *  can assert on it. Not random: a fixture that changed between runs would make
 *  every assertion about assembly flaky for no gain. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const FIRST = ['Ines', 'Tobias', 'Marguerite', 'Devin', 'Priya', 'Callum', 'Neriah', 'Osvaldo'];
const LAST = ['Vantwoud', 'Skarsgaard', 'Okonjo-Rell', 'Petrossian', 'Natarajan', 'Halvorsen',
  'Ferreira-Baptiste', 'Quillane'];

/**
 * A summary spliced mid-sentence after a name reads wrong carrying its own
 * capital — "Sorrel Adeyemi-Rusk Responded to the scene" — which the first
 * walk-through showed plainly. This is the FIXTURE's own prose being tidied,
 * NOT a check over a real writer's output: nothing in this build reads inside
 * a returned part, and this function runs before there is a part to read.
 */
function lowerFirst(text: string | undefined): string {
  if (!text) return '';
  const trimmed = text.replace(/\.$/, '');
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

function name(seed: number, i: number): string {
  return `${FIRST[(seed + i) % FIRST.length]} ${LAST[(seed + i * 3) % LAST.length]}`;
}

export class FixtureParagraphWriter implements ParagraphWriter {
  readonly kind = 'fixture' as const;

  /**
   * Canned individuals per facility.
   *
   * It returns names for the facilities it was GIVEN and never invents a
   * facility — the OBGYN rule (§14.4) holds in the fixture too, so a walk
   * exercises the real constraint rather than a relaxed one. A chronology
   * naming an unselected facility yields nothing for it, which is invariant 8.
   */
  async extract(input: ExtractionInput): Promise<ExtractionResult> {
    return {
      perFacility: input.facilities.map((f) => {
        const seed = hash(f.name);
        // A facility the fixture text does not mention returns NOTHING — which
        // is how "pulled, and none found" gets exercised (D-48) rather than
        // every facility conveniently having someone.
        const mentioned = input.chronologyText.toLowerCase().includes(f.name.toLowerCase())
          || f.aliases.some((a) => a && input.chronologyText.toLowerCase().includes(a.toLowerCase()));
        if (!mentioned) return { caseProviderId: f.caseProviderId, individuals: [] };

        const count = 1 + (seed % 3);
        return {
          caseProviderId: f.caseProviderId,
          individuals: Array.from({ length: count }, (_, i) => ({
            displayName: name(seed, i),
            credentialSuffix: ['M.D.', 'D.O.', 'D.C.', 'PA-C', 'PT'][(seed + i) % 5],
            treatmentFrom: `2025-0${1 + ((seed + i) % 6)}-1${(seed + i) % 9}`,
            treatmentTo: `2025-0${2 + ((seed + i) % 6)}-2${(seed + i) % 8}`,
            summary:
              `Evaluated and treated the patient at ${f.name}, reviewed the imaging and `
              + `records available, and directed the course of care.`,
            visits: [
              {
                visitDate: `2025-0${1 + ((seed + i) % 6)}-1${(seed + i) % 9}`,
                description: 'Initial evaluation; history taken and examination performed.',
              },
              {
                visitDate: `2025-0${2 + ((seed + i) % 6)}-0${1 + ((seed + i) % 8)}`,
                description: 'Follow-up; response to treatment reviewed.',
              },
            ],
          })),
        };
      }),
    };
  }

  /**
   * Canned parts per SHAPE.
   *
   * The parts deliberately do NOT restate the fixed sentences — the app places
   * those — and the opening deliberately CONTINUES the sentence the LEAD began
   * (D-59, writer instruction (j)), because that is what a real writer is told
   * to do and the walk should show what a correct return looks like.
   */
  async write(input: WriteInput): Promise<WriterParts> {
    const plural = input.individuals.length > 1;
    const facility = input.facility.name;
    const client = input.client.name;

    switch (input.shape) {
      case 'midlevel-rider':
        return {
          opening:
            `saw ${client} at ${facility} during the course of treatment, took the history, `
            + `performed the examination, and carried out the treatment plan under supervision.`,
        };

      case 'pharmacy':
        return {
          body:
            `by and through its pharmacist(s) and custodian of records, will testify regarding `
            + `the prescriptions dispensed to ${client}, that the records of those prescriptions `
            + `and the associated billing are true and correct, and that the charges reflected in `
            + `them are reasonable and necessary. Those records were made and kept in the regular `
            + `course of business, by persons with knowledge of the acts and events recorded, at `
            + `or near the time of those acts and events, and they reflect the charges and their `
            + `reasonableness.`,
        };

      case 'other-non-physician':
        return {
          body:
            `${plural ? 'are' : 'is'} a licensed provider who treated ${client} at ${facility} `
            + `following the ${input.incidentNoun} of ${input.incidentDateLong}. `
            + `${plural ? 'They' : input.client.pronounSubject === 'they' ? 'They' : 'The provider'} `
            + `will testify regarding the care provided, the records of that care, and the charges `
            + `for it. Those records were made and kept in the regular course of business, by `
            + `persons with knowledge of the acts and events recorded, at or near the time of `
            + `those acts and events, and they reflect the charges and their reasonableness.`,
        };

      case 'custodian-only':
        return {
          care_episode_clause:
            `The records reflect an episode of care at ${facility} beginning `
            + `${input.individuals[0]?.treatmentFrom ?? input.incidentDateLong}.`,
        };

      case 'retained':
        return {};

      default: {
        // The treating shapes and the imaging facility: opening + middle.
        const who = plural
          ? `are providers at ${facility} who evaluated and treated ${client}`
          : `is a provider at ${facility} who evaluated and treated ${client}`;
        const each = plural
          ? ` Each of them saw ${client} in the course of that treatment: `
            + `${input.individuals.map((i) => `${i.displayName} ${lowerFirst(i.summary) || 'participated in the care'}`).join('; ')}.`
          : '';
        return {
          opening:
            `${who} for the injuries ${input.client.pronounSubject} sustained in the `
            + `${input.incidentNoun} of ${input.incidentDateLong}.${each}`,
          middle:
            `${plural ? 'They' : 'The provider'} will testify regarding the presentation and `
            + `complaints recorded, the examination findings, the course of treatment provided, `
            + `and the reasonableness and necessity of that treatment and its cost, including `
            + `the need for future medical care and its reasonable cost where the records support `
            + `it. The records of ${facility} were made and kept in the regular course of `
            + `business, by persons with knowledge of the acts and events recorded, at or near `
            + `the time of those acts and events, and they reflect the charges and their `
            + `reasonableness.`,
        };
      }
    }
  }
}
