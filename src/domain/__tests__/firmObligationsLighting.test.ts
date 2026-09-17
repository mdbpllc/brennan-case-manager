// FIRM OBLIGATIONS — the lighting snapshot: the register and the card are UNCHANGED
// by the fix slice.
//
// Authority: docs/specs/firm-obligations-fix-slice.md §7 item 1 — "the register/card
// states unchanged for every fixture row (a snapshot of `stateOf(today)` before and
// after the slice is byte-equal)". FOS-2 RULED YES 2026-09-12 (#156). #156 A1 amended
// only the Outlook reminder limb; `lightsOn`, every display state, the card and the
// register still key off the lead (§3 item 2), and this pins that they do.
//
// The text below is generated from the FOD-21 demo fixture — every date invented — on
// every creation day of a year (created and read the same day), and on a weekly
// creation day read 1, 6, 19, 47 and 120 days later, so the states move as real days
// pass. Each line carries every row's display state, the card (counts, lines, "and N
// more") and the register's groups. The digest was captured at HEAD f626f4d BEFORE any
// FOS-2 edit; the pre-slice text is kept outside the repo
// (C:\fos2\evidence\fos2-lighting-before.txt) for diffing if this ever fails.
//
// Node's modules are loaded by a runtime specifier and typed by hand here, as
// firmObligationTemplates.test.ts does for node:child_process: this file compiles under
// the APP tsconfig, whose `types` carry no Node globals.

import { describe, it, expect } from 'vitest';
import {
  addDays, cardItems, cardSummary, registerView, stateOf,
  type DisplayState, type ViewItem,
} from '../firmObligations';
import { firmObligationsDemoSeed } from '../../data/firmObligationsSeed';

/** sha256 of the 630 lines below ('\n'-joined, trailing '\n', UTF-8) at f626f4d. */
const BEFORE_SHA256 = '4ba6d7ceb940046ab98bc909e94047433145c9c900f26e79ab73a31180dfe4a2';
const BEFORE_LINES = 630;

const LETTER: Record<DisplayState, string> = {
  pending: 'p', lit: 'l', 'target-passed': 't', overdue: 'o', 'past-date-unknown': 'u', done: 'd',
};

function lightingLine(created: string, today: string): string {
  let n = 0;
  const seed = firmObligationsDemoSeed(created, `${created}T12:00:00.000Z`, () => `id-${++n}`);
  const keyOf = new Map(seed.obligations.map((ob) => [ob.id, ob.templateKey ?? 'custom']));
  const states = seed.obligations.map((ob) => {
    const open = seed.occurrences.find((o) => o.obligationId === ob.id && o.state === 'open');
    return `${ob.templateKey}:${open ? LETTER[stateOf(ob, open, today)] : '-'}`;
  }).join(',');
  const items = cardItems(seed.obligations, seed.occurrences, today);
  const card = cardSummary(items, today);
  const cardText = `${card.due}/${card.overdue}/${card.more}/${card.lines
    .map((l) => `${keyOf.get(seed.occurrences.find((o) => o.id === l.id)!.obligationId)}=${l.text}${l.overdue ? '!' : ''}`)
    .join('~')}`;
  const view = registerView(seed.obligations, seed.occurrences, today);
  const k = (it: ViewItem) => it.obligation.templateKey ?? 'custom';
  const reg = [
    `O=${view.overdue.map(k).join('.')}`,
    `M=${view.months.map((m) => `${m.key}:${m.items.map(k).join('.')}`).join(';')}`,
    `L=${view.later.map(k).join('.')}`,
    `I=${view.inactive.map((e) => e.obligation.templateKey).join('.')}`,
    `S=${view.stranded.map((o) => o.templateKey).join('.')}`,
  ].join('|');
  return `${created}>${today}|${states}|${cardText}|${reg}`;
}

function lightingText(): { text: string; lines: number } {
  const lines: string[] = [];
  for (let c = '2026-09-01'; c <= '2027-08-31'; c = addDays(c, 1)) lines.push(lightingLine(c, c));
  for (let c = '2026-09-06'; c <= '2027-09-05'; c = addDays(c, 7)) {
    for (const k of [1, 6, 19, 47, 120]) lines.push(lightingLine(c, addDays(c, k)));
  }
  return { text: `${lines.join('\n')}\n`, lines: lines.length };
}

interface NodeCrypto { createHash: (alg: string) => { update: (s: string, enc: 'utf8') => { digest: (enc: 'hex') => string } } }
interface NodeOs { tmpdir: () => string }
interface NodeFs { writeFileSync: (path: string, data: string, enc: 'utf8') => void }
interface NodePath { join: (...parts: string[]) => string }

describe('§7 item 1 — the register and the card light exactly as before the fix slice', () => {
  it('the FOD-21 fixture over a year of creation days hashes to the pre-slice digest', async () => {
    const load = async <T,>(specifier: string) => (await import(/* @vite-ignore */ specifier)) as T;
    const { createHash } = await load<NodeCrypto>('node:crypto');
    const { text, lines } = lightingText();
    const digest = createHash('sha256').update(text, 'utf8').digest('hex');
    let where = '';
    if (digest !== BEFORE_SHA256 || lines !== BEFORE_LINES) {
      const { tmpdir } = await load<NodeOs>('node:os');
      const { writeFileSync } = await load<NodeFs>('node:fs');
      const { join } = await load<NodePath>('node:path');
      where = join(tmpdir(), `fos2-lighting-after-${digest.slice(0, 12)}.txt`);
      writeFileSync(where, text, 'utf8');
    }
    expect(lines, `line count — the computed text was written to ${where}`).toBe(BEFORE_LINES);
    expect(digest, `the lighting changed — the computed text was written to ${where}; diff it against C:\\fos2\\evidence\\fos2-lighting-before.txt`).toBe(BEFORE_SHA256);
  }, 60_000);
});
