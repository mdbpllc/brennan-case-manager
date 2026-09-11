// FIRM OBLIGATIONS — the surfaces: the register page, the /cases card, the route.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 items 5–6, §7 items 9,
// 11, 12, 13 and 21, and §8. FOS-1 RULED YES 2026-09-10.
//
// The domain rules behind these surfaces are pinned in
// src/domain/__tests__/firmObligations.test.ts; this suite pins what the SCREENS may
// and may not offer. It reads the component sources with whitespace collapsed (the
// wrap trap: a phrase broken across a source line is invisible to a raw substring
// search) and asserts ABSENCES as well as presences, because a presence-only suite
// passes on a page that also rendered the forbidden control.

import { describe, it, expect } from 'vitest';
import pageSource from '../../pages/FirmObligationsPage.tsx?raw';
import cardSource from '../FirmObligationsCard.tsx?raw';
import caseListSource from '../../pages/CaseListPage.tsx?raw';
import appSource from '../../App.tsx?raw';
import type { FirmObligation, FirmObligationOccurrence, ViewItem } from '../../domain/firmObligations';
import { cardLine, stateOf, targetDate, dueDate, daysOverdue } from '../../domain/firmObligations';

const flat = (s: string) => s.replace(/\s+/g, ' ');

/** Visible button labels: the text between a <button …> and its </button>. */
function buttonLabels(src: string): string[] {
  return [...flat(src).matchAll(/<button\b[^>]*>(.*?)<\/button>/g)].map((m) => m[1]);
}

describe('the register offers no back door out of FO-2 (§7 item 21; slice §8)', () => {
  it('has no snooze, later, remind-me, dismiss, bulk or delete control', () => {
    for (const label of [...buttonLabels(pageSource), ...buttonLabels(cardSource)]) {
      expect(label).not.toMatch(/snooze|remind|dismiss|bulk|delete|select all|\blater\b/i);
    }
  });

  it('offers Not applicable only on a conditionalPerPeriod row (FOD-18, §7 item 9)', () => {
    const src = flat(pageSource);
    const at = src.indexOf('Not applicable…</button>');
    expect(at).toBeGreaterThan(-1);
    // The one render of the button sits inside the conditionalPerPeriod guard.
    expect(src.slice(Math.max(0, at - 260), at)).toContain('ob.conditionalPerPeriod &&');
    expect(src.split('Not applicable…</button>').length - 1).toBe(1);
  });

  it('offers Undo only where FOD-7\'s test holds', () => {
    const src = flat(pageSource);
    expect(src).toContain('canUndo(ob, occ, mine, lines).ok');
    expect(src).toMatch(/\{undoTarget && \( <button/);
  });

  it('shows no owner badge at the solo stage (FOM-15)', () => {
    // A custom obligation is CREATED with ownerScope 'firm' (the field exists from the
    // first migration, DECISION 4) — but nothing on either surface READS an owner.
    expect(pageSource).not.toMatch(/\.ownerScope\b|ownerUserId/);
    expect(cardSource).not.toMatch(/ownerScope|ownerUserId/);
  });

  it('never reads or writes calendar events, and never renders on a case (FOD-13)', () => {
    for (const src of [pageSource, cardSource]) {
      expect(src).not.toMatch(/listEventsForCase|createEvent|updateEvent|calendar_events|caseId/);
    }
  });

  it('carries the standing holiday line (FOD-24) on the register and in the card', () => {
    expect(pageSource).toContain('HOLIDAY_LINE');
    expect(cardSource).toContain('HOLIDAY_LINE');
  });

  it('marks its text acts PROVISIONAL', () => {
    expect((pageSource.match(/PROVISIONAL/g) ?? []).length).toBeGreaterThan(40);
    expect((cardSource.match(/PROVISIONAL/g) ?? []).length).toBeGreaterThan(4);
  });
});

describe('the register\'s groups (§7 items 12 and 13)', () => {
  it('pins Overdue, then the months, then Later, then Inactive collapsed', () => {
    const src = flat(pageSource);
    const overdue = src.indexOf('>Overdue</h3>');
    const months = src.indexOf('view.months.map');
    const later = src.indexOf('>Later</h3>');
    const inactive = src.indexOf('<details> <summary><strong>Inactive');
    expect(overdue).toBeGreaterThan(-1);
    expect(overdue).toBeLessThan(months);
    expect(months).toBeLessThan(later);
    expect(later).toBeLessThan(inactive);
  });

  it('Activate… takes his date: no template date is ever copied into the input (FOD-9, FOD-30)', () => {
    const src = flat(pageSource);
    // Only the non-date template parameters seed the draft.
    expect(src).toContain('draftFromRule({ everyYears: template?.templateRule.everyYears, days: template?.templateRule.days }');
    expect(src).not.toMatch(/templateRule\.(month|day|dates|anchorDate|dueOn)\b/);
  });
});

describe('the /cases card (§7 item 11; FOD-26, FOD-27)', () => {
  it('sits BELOW the legal-watch card on /cases (FOD-27)', () => {
    const src = flat(caseListSource);
    expect(src.indexOf('<WorklistCard compact />')).toBeGreaterThan(-1);
    expect(src.indexOf('<WorklistCard compact />')).toBeLessThan(src.indexOf('<FirmObligationsCard />'));
  });

  it('renders nothing when there is nothing to act on, carries the FOD-26 title, three lines then "and K more"', () => {
    const src = flat(cardSource);
    expect(src).toContain('if (items.length === 0) return null;');
    expect(src).toContain('Firm obligations — {due} due · {overdue} overdue');
    expect(src).toContain('items.slice(0, 3)');
    expect(src).toContain('and {items.length - 3} more');
  });

  const ob = (over: Partial<FirmObligation> = {}): FirmObligation => ({
    id: 'ob', name: 'State Bar membership fee', category: 'licensing', ownerScope: 'attorney',
    recurrence: { kind: 'fixed-annual', month: 1, day: 30 }, precision: 'day', missedPeriods: 'serial',
    conditionalPerPeriod: false, weekendRule: 'unknown', leadDays: 30, weight: 'hard', active: true,
    createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', ...over,
  });
  const occ = (dueOn: string): FirmObligationOccurrence => ({
    id: 'o', obligationId: 'ob', periodLabel: '2027', dueOn, state: 'open', syncStatus: 'pending',
    createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
  });
  const item = (o: FirmObligation, x: FirmObligationOccurrence, today: string): ViewItem => ({
    obligation: o, occurrence: x, state: stateOf(o, x, today), target: targetDate(x), due: dueDate(o, x), daysOverdue: daysOverdue(o, x, today),
  });

  it('a lit line reads "<name> · aim for <T> · N days" (FOD-26)', () => {
    expect(cardLine(item(ob(), occ('2027-01-30'), '2027-01-20'), '2027-01-20'))
      .toBe('State Bar membership fee · aim for Fri Jan 29 · 9 days');
  });

  it('a weekend row under unknown never reads "overdue" or a day count on the card either', () => {
    const line = cardLine(item(ob(), occ('2027-01-30'), '2027-03-01'), '2027-03-01');
    expect(line).not.toMatch(/overdue/i);
    expect(line).not.toMatch(/\d+\s+days?/);
  });

  it('an overdue line reads "overdue · N days"', () => {
    expect(cardLine(item(ob(), occ('2027-01-29'), '2027-02-08'), '2027-02-08'))
      .toBe('State Bar membership fee · overdue · 10 days');
  });
});

describe('the route (DECISION 0; FOD-12)', () => {
  it('serves the register at /firm/obligations under the nav label "Obligations", and adds no firm-wide calendar page', () => {
    const src = flat(appSource);
    expect(src).toContain('<Route path="/firm/obligations" element={<FirmObligationsPage />} />');
    expect(src).toContain('>Obligations</NavLink>');
    expect(src).not.toMatch(/path="\/calendar"|path="\/firm\/calendar"/);
  });
});
