// FOS-2 — the text acts the fix build added OUTSIDE the register page, the card and
// firmObligationsActs.ts: every one marked PROVISIONAL, with its cite, on its own line.
//
// Authority: docs/specs/firm-obligations-fix-slice.md §7 item 17 ("Text-act marker test
// extended to every string this slice adds") with §3 items 10 and 14 (FOS-2 RULED YES
// 2026-09-12, #156). The register page's own added strings are pinned by the walker in
// firmObligationsSurfaces.test.ts ("§7 item 17: every string the fix slice adds to the
// register …"); the card and firmObligationsActs.ts by that file's marker blocks. The fix
// build's review found nothing pinned the rest (review L3-1): a later edit could drop the
// marker on the one "not saved" message class (A5), FXD-5's sentence or canUndo's new
// refusal and every suite would stay green — and the hands-on sitting's text-act
// inventory, which is built from the markers, would lose the string.
//
// THE TABLE was built by program-assisted inspection of
// `git diff f626f4d -- src/data/supabaseAdapter.ts src/domain/firmObligations.ts
// src/forms/tiers.ts src/forms/gates.ts src/domain/caseProviders.ts src/data/localAdapter.ts
// src/forms/generate.ts src/forms/assembly.ts src/pages/MedicalTab.tsx src/pages/FormsTab.tsx
// src/outlook/graph.ts src/outlook/sync.ts`: every ADDED line holding a string literal a
// person reads — on screen, in an error, or in the review log. Rows whose wording is
// FOS-1's (the act names, "Firm obligation not found") are here because FOS-2 rewrote the
// lines they sit on: they are the `<act>` of A5's message class, or a sentence the new
// Outlook-queue methods reuse. What the diff added that is NOT a row, and why:
//   - localAdapter.ts, the v17 → v18 `demo_store` summary and its `system (…, v18)` user:
//     a store-migration summary line. No step's summary, v9 → v10 through v16 → v17, is
//     marked; it is the store's own account of an upgrade, not a text act.
//   - firmObligations.ts, planActivateFromInactive's `— ${kept}`: a separator carrying
//     planEdit's FOD-4 sentence, which is marked where it is written.
//   - generate.ts, the two WriterCallError sentences ("The writer failed for …", "The
//     writer returned nothing usable for …"): re-indented under B2's custodian-only guard,
//     wording byte-identical to f626f4d — not added by this build.
//   - FormsTab.tsx, MASTER_STATIC_HEADING: the master .docx's own static heading, carried
//     verbatim so a one-client instrument serves exactly what it served before (B5;
//     masterTitleTokens.test.ts pins it byte-identical) — not a new text act.
//   - assembly.ts, MedicalTab.tsx, graph.ts, sync.ts: no added string a person reads
//     (comments and code only; the bill picker's placeholder is unchanged).
//
// Each row finds its phrase by an exact substring of the raw source, asserts how many
// lines carry it, and asserts on each line that a `PROVISIONAL — <cite>` comment FOLLOWS
// the literal (so a comment quoting the phrase cannot stand in for the literal's own
// marker), that the cite leads with an accepted form, and that it is the cite named here.
// Lines are split on /\r?\n/: a checkout under core.autocrlf turns these files CRLF.

import { describe, it, expect } from 'vitest';
import supabaseSource from '../../data/supabaseAdapter.ts?raw';
import localSource from '../../data/localAdapter.ts?raw';
import domainSource from '../../domain/firmObligations.ts?raw';
import caseProvidersSource from '../../domain/caseProviders.ts?raw';
import tiersSource from '../../forms/tiers.ts?raw';
import gatesSource from '../../forms/gates.ts?raw';

/** The marker comment and the cite forms the house accepts (the surfaces test's regex). */
const MARKER = /(?:\/\/|\/\*)\s*PROVISIONAL — (FOD-\d+|FOM-\d+|DECISION \d+|slice §\d|§\d|#\d+|FXD-\d+)/;

interface Row {
  file: string;
  source: string;
  /** An exact substring of the literal as it sits in the source. */
  phrase: string;
  /** The cite each line carries, in source order — one per line the phrase is on. */
  cites: string[];
  why: string;
}

const A5 = '#156 §1 item 9 (A5)';
const ACT = 'slice §3 item 10';
const A7 = '#156 §1 item 9 (A7)';
const FXD5 = 'FXD-5 (#156 §2, AS-Q17)';

const ROWS: Row[] = [
  // ---- supabaseAdapter.ts — A5: one function per act, ONE message class
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: 'was not saved: ${res.error.message}`', cites: [A5],
    why: 'the one "not saved" message class (A5)' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: '`Activating ${', cites: [ACT, ACT, A7],
    why: 'the <act> of activate, re-activate and Activate… from Inactive (A7)' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: '`The edit to ${', cites: [ACT], why: 'the <act> of Edit…' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: '`Retiring ${', cites: [ACT], why: 'the <act> of Retire' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: "'Not applicable' : 'Done'} for ${", cites: [ACT],
    why: 'the <act> of Done / Not applicable' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: '`Undo for ${', cites: [ACT], why: 'the <act> of Undo' },
  { file: 'supabaseAdapter.ts', source: supabaseSource, phrase: '`The due-date change for ${', cites: [ACT],
    why: 'the <act> of a due-date override' },

  // ---- localAdapter.ts — the Outlook-delete queue's read of its obligation (A6)
  { file: 'localAdapter.ts', source: localSource, phrase: "throw new Error('Firm obligation not found')", cites: [ACT, ACT],
    why: 'the refusal the queue/settle writes reuse' },

  // ---- domain/firmObligations.ts — A1, A3, A7
  { file: 'firmObligations.ts', source: domainSource, phrase: "outlookReminderDays: 'Outlook reminder',",
    cites: ['#156 §1 item 6(b) (A1; FXD-9)'], why: 'the FIELD_LABEL entry the edit log reason names' },
  { file: 'firmObligations.ts', source: domainSource, phrase: "'Outlook reminder days must be a whole number ≥ 0'",
    cites: ['#156 §1 item 6(b) (A1)'], why: 'the validation refusal' },
  { file: 'firmObligations.ts', source: domainSource,
    phrase: "'A later occurrence has been opened since — undo is no longer available (FOD-7).'",
    cites: ['#156 §1 item 9 (A3); FOD-7'], why: 'canUndo\'s new refusal' },
  { file: 'firmObligations.ts', source: domainSource, phrase: "'Activated from Inactive',", cites: [A7],
    why: 'the A7 log reason\'s lead' },
  { file: 'firmObligations.ts', source: domainSource, phrase: '`· edited: ${', cites: [A7], why: 'the A7 log reason\'s edit limb' },
  { file: 'firmObligations.ts', source: domainSource, phrase: '`· occurrence ${re.occurrence.periodLabel} opened, rule date ${',
    cites: [A7], why: 'the A7 log reason\'s opened limb' },

  // ---- forms — FXD-5's sentence, on panel line 11 and on the hard pause (B3)
  { file: 'tiers.ts', source: tiersSource, phrase: '— designated in the treating paragraph once this pause is cleared.`',
    cites: [FXD5], why: 'panel line 11\'s marker limb (FXD-5)' },
  { file: 'gates.ts', source: gatesSource, phrase: '— designated in the treating paragraph once this pause is cleared.`',
    cites: [FXD5], why: 'the marker hard pause\'s body (FXD-5)' },

  // ---- domain/caseProviders.ts — the bill picker's fallback label (B6)
  { file: 'caseProviders.ts', source: caseProvidersSource, phrase: "?? '(contact not found)'",
    cites: ['#156 §2 (B6), new on the bill form'], why: 'the new-bill picker\'s fallback label' },
];

describe('FOS-2 text acts outside the register page, card and acts module — each marked PROVISIONAL with its cite on its own line (fix slice §7 item 17; review L3-1)', () => {
  for (const row of ROWS) {
    it(`${row.file}: ${row.why} — ${row.cites.length} line(s), each marked`, () => {
      const hits = row.source.split(/\r?\n/)
        .map((text, i) => ({ line: i + 1, text }))
        .filter((l) => l.text.includes(row.phrase));
      expect(hits.map((h) => h.line), row.phrase).toHaveLength(row.cites.length);
      hits.forEach((h, k) => {
        const where = `${row.file}:${h.line} ${row.phrase}`;
        const at = h.text.search(MARKER);
        expect(at, `${where} — no PROVISIONAL marker with an accepted cite on this line`).toBeGreaterThan(-1);
        expect(h.text.indexOf(row.phrase), `${where} — the marker must follow the literal`).toBeLessThan(at);
        expect(h.text.slice(at), where).toContain(`PROVISIONAL — ${row.cites[k]}`);
      });
    });
  }

  it('the table reaches every file this build added such a string to, and every cite it names is an accepted form', () => {
    expect(new Set(ROWS.map((r) => r.file))).toEqual(new Set([
      'supabaseAdapter.ts', 'localAdapter.ts', 'firmObligations.ts', 'tiers.ts', 'gates.ts', 'caseProviders.ts',
    ]));
    for (const r of ROWS) for (const c of r.cites) expect(`// PROVISIONAL — ${c}`, r.phrase).toMatch(MARKER);
  });
});
