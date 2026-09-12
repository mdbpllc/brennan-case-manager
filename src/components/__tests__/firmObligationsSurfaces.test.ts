// FIRM OBLIGATIONS — the surfaces: the register page, the /cases card, the route.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 items 5, 6 and 10, §7 items
// 9, 11, 12, 13 and 21, and §8. FOS-1 RULED YES 2026-09-10. Where a test pins a
// finding of the adversarial whole-build review, its L-number is named beside it.
//
// The domain rules behind these surfaces are pinned in
// src/domain/__tests__/firmObligations.test.ts; this suite pins what the SCREENS may
// and may not offer. It reads the component sources with whitespace collapsed (the
// wrap trap: a phrase broken across a source line is invisible to a raw substring
// search) and asserts ABSENCES as well as presences, because a presence-only suite
// passes on a page that also rendered the forbidden control. Where a check must not
// trip on a comment, or must find a literal on screen by what it is rather than by how
// its line looks, it parses the source with the TypeScript compiler.

import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import pageSource from '../../pages/FirmObligationsPage.tsx?raw';
import cardSource from '../FirmObligationsCard.tsx?raw';
import caseListSource from '../../pages/CaseListPage.tsx?raw';
import appSource from '../../App.tsx?raw';
import actsSource from '../../pages/firmObligationsActs.ts?raw';
import type { FirmObligation, FirmObligationOccurrence, ViewItem } from '../../domain/firmObligations';
import {
  CARD_LINES, cardLine, cardSummary, daysOverdue, dueDate, stateOf, targetDate,
} from '../../domain/firmObligations';
import { errorRoute, landedNotice, outlookPushes, type RemoveResult } from '../../pages/firmObligationsActs';

const flat = (s: string) => s.replace(/\s+/g, ' ');

const parse = (src: string) =>
  ts.createSourceFile('surface.tsx', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

/** The source with every comment removed and whitespace collapsed — for checks that
 *  must not trip on a comment (the header's own "no snooze" sentence, a marker). */
const code = (src: string) => flat(ts.createPrinter({ removeComments: true }).printFile(parse(src)));

/** One top-level function's source, from its declaration to the next declaration or
 *  section divider. */
function fnRaw(src: string, name: string): string {
  const lines = src.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^(export default |async )?function ${name}\\b`).test(l));
  if (start < 0) throw new Error(`function ${name} not found`);
  const rest = lines.slice(start + 1).findIndex((l) => /^(export default |async )?function |^\/\/ -{4,}/.test(l));
  return lines.slice(start, rest < 0 ? lines.length : start + 1 + rest).join('\n');
}

/** Visible button labels: the text between a <button …> and its </button>. */
function buttonLabels(src: string): string[] {
  return [...flat(src).matchAll(/<button\b[^>]*>(.*?)<\/button>/g)].map((m) => m[1]);
}

/** Each whole <button …>…</button>, opening tag included. */
function buttons(src: string): string[] {
  const out: string[] = [];
  for (let at = src.indexOf('<button'); at > -1; at = src.indexOf('<button', at + 1)) {
    const end = src.indexOf('</button>', at);
    out.push(src.slice(at, end + '</button>'.length));
  }
  return out;
}

interface Jsx { attrs: Record<string, string>; body: string }

/** Each <tag …> element, found by the parser rather than by a pattern (an attribute's
 *  `=>` would end a `[^>]*`): its attributes as source text, and its children's source. */
function jsxElements(src: string, tag: string): Jsx[] {
  const sf = parse(src);
  const out: Jsx[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(sf) === tag) {
      const attrs: Record<string, string> = {};
      for (const p of node.attributes.properties) {
        if (ts.isJsxAttribute(p)) attrs[p.name.getText(sf)] = p.initializer ? flat(p.initializer.getText(sf)) : 'true';
      }
      const body = ts.isJsxOpeningElement(node) ? node.parent.children.map((c) => c.getText(sf)).join('') : '';
      out.push({ attrs, body: flat(body).trim() });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

interface Literal { line: number; text: string }

/**
 * Every literal a source puts on screen, with its 1-based line: JSX text; a
 * placeholder, title or aria-label; a string or template a JSX child expression renders
 * (through a conditional's branches, `&&`, `||` or `??` — never a condition's
 * operands); a message returned from an act, passed to setError / setNote / setNotice
 * or to an act's notify / warn, or set as an `error`, `text` or `title` field; and the
 * words in a `*_LABEL` map.
 * A floor, not a ceiling: a literal held in a local first is not traced.
 */
function visibleLiterals(src: string): Literal[] {
  const sf = parse(src);
  const out: Literal[] = [];
  const lineAt = (pos: number) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  const hasWords = (s: string) => /[A-Za-z]{2,}/.test(s);

  const shown = (e: ts.Expression | undefined): void => {
    if (!e) return;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) {
      if (hasWords(e.text)) out.push({ line: lineAt(e.getStart(sf)), text: e.text });
    } else if (ts.isTemplateExpression(e)) {
      const parts = [e.head.text, ...e.templateSpans.map((s) => s.literal.text)];
      if (parts.some(hasWords)) out.push({ line: lineAt(e.getStart(sf)), text: parts.join('…') });
      for (const s of e.templateSpans) shown(s.expression);
    } else if (ts.isConditionalExpression(e)) {
      shown(e.whenTrue);
      shown(e.whenFalse);
    } else if (ts.isParenthesizedExpression(e)) {
      shown(e.expression);
    } else if (ts.isBinaryExpression(e)) {
      const op = e.operatorToken.kind;
      if (op === ts.SyntaxKind.AmpersandAmpersandToken) shown(e.right);
      if (op === ts.SyntaxKind.BarBarToken || op === ts.SyntaxKind.QuestionQuestionToken) {
        shown(e.left);
        shown(e.right);
      }
    }
  };

  const visit = (node: ts.Node): void => {
    if (ts.isJsxText(node)) {
      // One JSX text can run across lines; each line that carries words is checked on its own.
      let at = node.pos;
      for (const segment of src.slice(node.pos, node.end).split('\n')) {
        if (hasWords(segment)) out.push({ line: lineAt(at + segment.search(/\S/)), text: segment.trim() });
        at += segment.length + 1;
      }
    } else if (ts.isJsxAttribute(node) && ['placeholder', 'title', 'aria-label'].includes(node.name.getText(sf))) {
      const init = node.initializer;
      if (init && ts.isStringLiteral(init)) shown(init);
      else if (init && ts.isJsxExpression(init)) shown(init.expression);
    } else if (ts.isJsxExpression(node) && (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))) {
      shown(node.expression);
    } else if (ts.isReturnStatement(node)) {
      shown(node.expression);
    } else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : '';
      if (/^(set(Error|Note|Notice)|notify|warn)$/.test(name)) for (const a of node.arguments) shown(a);
    } else if (ts.isPropertyAssignment(node) && ['error', 'text', 'title'].includes(node.name.getText(sf))) {
      shown(node.initializer);
    } else if (ts.isVariableDeclaration(node) && /_LABEL$/.test(node.name.getText(sf))
      && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      for (const p of node.initializer.properties) if (ts.isPropertyAssignment(p)) shown(p.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

describe('the register offers no back door out of FO-2 (§7 item 21; slice §8)', () => {
  it('has no snooze, later, remind-me, dismiss, bulk or delete control', () => {
    for (const label of [...buttonLabels(pageSource), ...buttonLabels(cardSource)]) {
      expect(label).not.toMatch(/snooze|remind|dismiss|bulk|delete|select all|\blater\b/i);
    }
  });

  it('names no snooze, dismiss or bulk act anywhere in its code, and calls no delete', () => {
    for (const src of [code(pageSource), code(cardSource)]) {
      expect(src).not.toMatch(/snooze|dismiss|bulk|select ?all|remind ?me/i);
      expect(src).not.toMatch(/\bdb\.delete\w*|\bdelete\w*(Obligation|Occurrence)\w*\s*\(/i);
    }
  });

  it('calls only the ruled acts on the adapter — Done and Not applicable close, Undo reopens, nothing else unlights (FOD-18, FOD-7)', () => {
    const called = (src: string) => [...new Set([...code(src).matchAll(/\bdb\.(\w+)\(/g)].map((m) => m[1]))].sort();
    expect(called(pageSource)).toEqual([
      'createFirmObligation', 'listFirmObligationOccurrences', 'listFirmObligationReviewLog', 'listFirmObligations',
      'markOccurrenceDone', 'markOccurrenceNotApplicable', 'reactivateFirmObligation', 'retireFirmObligation',
      'setOccurrenceDueOverride', 'undoOccurrence', 'updateFirmObligation',
    ]);
    expect(called(cardSource)).toEqual(['listFirmObligationOccurrences', 'listFirmObligations']);
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

describe('the text acts — every one marked, every marker cited (slice §3 item 10; review L5-07, L1-F9)', () => {
  const surfaces: [string, string, number][] = [['the register', pageSource, 100], ['the card', cardSource, 5]];
  for (const [label, src, least] of surfaces) {
    it(`${label}: every literal on screen carries a PROVISIONAL marker on its own line`, () => {
      const lines = src.split(/\r?\n/);
      const found = visibleLiterals(src);
      // A sanity floor, so a walker that found nothing cannot pass.
      expect(found.length).toBeGreaterThanOrEqual(least);
      const unmarked = found.filter((l) => !/PROVISIONAL — /.test(lines[l.line - 1])).map((l) => `${l.line}: ${l.text}`);
      expect(unmarked).toEqual([]);
    });

    it(`${label}: every PROVISIONAL marker names its cite — a FOD-, FOM-, DECISION or slice section, never a field name`, () => {
      const rests = [...src.matchAll(/(?:\/\/|\/\*)\s*PROVISIONAL\b([^\n]*)/g)].map((m) => m[1]);
      expect(rests.length).toBeGreaterThan(0);
      expect(rests.filter((r) => !/^ — (FOD-\d+|FOM-\d+|DECISION \d+|slice §\d|§\d)/.test(r))).toEqual([]);
    });
  }
});

describe('the register\'s groups (§7 items 12 and 13)', () => {
  it('pins Overdue, then Needs attention, then the months, then Later, then Inactive collapsed', () => {
    const src = flat(pageSource);
    const order = ['>Overdue</h3>', '>Needs attention</h3>', 'view.months.map', '>Later</h3>', '<details> <summary><strong>Inactive']
      .map((s) => src.indexOf(s));
    for (const at of order) expect(at).toBeGreaterThan(-1);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('Activate… takes his date: no template date is ever copied into the input (FOD-9, FOD-30)', () => {
    const src = flat(pageSource);
    // Only the non-date template parameters seed the draft.
    expect(src).toContain('draftFromRule({ everyYears: template?.templateRule.everyYears, days: template?.templateRule.days }');
    expect(src).not.toMatch(/templateRule\.(month|day|dates|anchorDate|dueOn)\b/);
  });
});

describe('Needs attention — an active obligation with no open occurrence (review L1-F4)', () => {
  it('renders view.stranded when there is any: each obligation\'s name, the sentence, and a Retire', () => {
    const page = flat(pageSource);
    expect(page).toContain('{view.stranded.length > 0 && (');
    expect(page).toContain('{view.stranded.map((ob) => <StrandedRow key={ob.id} ob={ob} ctx={ctx} />)}');
    const row = flat(fnRaw(pageSource, 'StrandedRow'));
    expect(row).toContain('const name = plainText(ob.name);');
    expect(row).toContain('<strong>{name}</strong>');
    expect(row).toContain('Active, but it has no open occurrence — a save to the central database did not finish. Retire it, then Activate… it from Inactive to open its next occurrence.');
    expect(row).toContain('await db.retireFirmObligation(ob.id);');
    expect(row).toContain('>Retire</button>');
    // Retire is its only act.
    expect(code(fnRaw(pageSource, 'StrandedRow'))).not.toMatch(/reactivate|markOccurrence|undoOccurrence|createFirmObligation|updateFirmObligation/);
  });
});

describe('where an act happens (review click-through, L5-05, L5-11)', () => {
  it('scrolls a form into view as it opens — Activate… from the catalog and from Inactive, and Edit…', () => {
    expect(code(pageSource)).toContain("ref.current?.scrollIntoView({ block: 'start' });");
    for (const fn of ['ActivationForm', 'EditForm']) {
      const body = code(fnRaw(pageSource, fn));
      expect(body, fn).toContain('const ref = useScrollIntoViewOnOpen<HTMLDivElement>();');
      expect(body, fn).toMatch(/<div ref=\{ref\}/);
    }
    // Both Activate… paths render that one form.
    expect(code(fnRaw(pageSource, 'FirmObligationsPage'))).toContain('<ActivationForm');
    expect(code(fnRaw(pageSource, 'InactiveRow'))).toContain('<ActivationForm');
  });

  it('an act\'s failure shows in the row or form that started it, and its buttons wait while it runs', () => {
    const page = code(pageSource);
    // No row or form hands its act straight to the page-level run any more.
    expect(page).not.toContain('ctx.run(');
    expect(code(fnRaw(pageSource, 'FirmObligationsPage'))).toContain('return { ok: false, error: msg(e) };');
    // Each place an act starts renders that act's error.
    for (const fn of ['CloseForm', 'ActivationForm', 'EditForm', 'RegisterRow', 'InactiveRow', 'CatalogRow', 'StrandedRow']) {
      expect(code(fnRaw(pageSource, fn)), fn).toMatch(/<ActError text=\{[\w.]+\}\s*\/>/);
    }
    // Every button that starts an act on a row is disabled while that act runs:
    // Undo twice, Retire twice, Re-activate, and Add as inactive. On a register row, an
    // Inactive row and the catalog that is the row's (or panel's) `busy`, which every act
    // there reports into (PAGE-3); on a Needs-attention row, its one act's own.
    const rowActs = buttons(page).filter((b) => /\.act\(/.test(b));
    expect(rowActs).toHaveLength(6);
    for (const b of rowActs) expect(b).toMatch(/disabled=\{(retire\.)?busy\}/);
    // And every form's submit.
    expect(code(fnRaw(pageSource, 'CloseForm'))).toMatch(/<button className="btn small" disabled=\{busy \|\| /);
    expect(code(fnRaw(pageSource, 'ActivationForm'))).toMatch(/disabled=\{busy\} onClick=\{submit\}>Activate<\/button>/);
    const edit = code(fnRaw(pageSource, 'EditForm'));
    expect(edit).toMatch(/disabled=\{busy\} onClick=\{save\}>Save changes<\/button>/);
    expect(edit).toMatch(/disabled=\{busy\} onClick=\{saveOverride\}>Set this date<\/button>/);
  });

  it('offers nothing to add until the register has loaded (L5-11)', () => {
    const page = flat(fnRaw(pageSource, 'FirmObligationsPage'));
    expect(page).toContain('<button className="btn" disabled={!loaded || addBusy} onClick={() => setAdding(adding ? null : \'catalog\')}>');
    expect(page).toContain("{loaded && adding === 'catalog' && (");
    expect(page).toContain("{loaded && adding && adding !== 'catalog' && (");
    const printed = code(fnRaw(pageSource, 'FirmObligationsPage'));
    expect(printed.match(/<Catalog\b/g)).toHaveLength(1);
    expect(printed.match(/<ActivationForm\b/g)).toHaveLength(1);
  });
});

describe('what a row shows (review L5-03, L5-06, L5-08, L5-09, L2-F4)', () => {
  it('Details states no due date on a weekend-dated row under unknown — the FOD-1 note stands in its place (L5-03)', () => {
    const d = flat(fnRaw(pageSource, 'Details'));
    const guard = d.indexOf('isUnknownWeekend(ob, occ)');
    const unknownLine = d.indexOf('Rule date {formatDate(ruleDate(occ))} — {FOD1_NOTE} · aim for {formatDate(targetDate(occ))} · lights {formatDate(lightsOn(ob, occ))}');
    const otherLine = d.indexOf('Rule date {formatDate(ruleDate(occ))} · aim for {formatDate(targetDate(occ))} · due {formatDate(dueDate(ob, occ))} · lights {formatDate(lightsOn(ob, occ))}');
    expect(guard).toBeGreaterThan(-1);
    expect(unknownLine).toBeGreaterThan(guard);
    expect(otherLine).toBeGreaterThan(unknownLine);
    expect(d.slice(guard, otherLine)).not.toMatch(/\bdue \{/);
  });

  it('an Inactive row from the catalog shows its catalog text, its note and its source — done or never done (L5-06)', () => {
    const row = flat(fnRaw(pageSource, 'InactiveRow'));
    const block = row.slice(row.indexOf('{ob.templateKey && ('), row.indexOf('<button'));
    expect(block).toContain('{template && <div className="small">{plainText(template.kindAnchorText)}</div>}');
    expect(block).toContain('{template?.catalogNote && <div className="small muted">{plainText(template.catalogNote)}</div>}');
    expect(block).toContain('<span className="muted">Source:</span> {plainText(ob.sourceNote)}');
    // Not gated on a done occurrence.
    expect(block).not.toContain('lastDone');
    // Details, below it, does not say the source a second time — and it is there on EVERY Inactive
    // row, never-done ones included, because a could-not-restore message sends him to its review log.
    expect(row).toContain('<Details ob={ob} occ={null} ctx={ctx} omitSource={!!ob.templateKey} />');
    expect(row).toContain('{!activating && <Details ob={ob}');
    expect(row).not.toMatch(/lastDone && <Details/);
    expect(flat(fnRaw(pageSource, 'Details'))).toContain('{!omitSource && ob.sourceNote &&');
  });

  it('Activate… from Inactive asks first, edits only what changed, pushes the edited open occurrence, and passes FOM-4\'s input (PAGE-2, L5-09, L2-F4)', () => {
    const row = code(fnRaw(pageSource, 'InactiveRow'));
    const ask = row.indexOf('const problem = reactivationProblem(ob, patch, mine, ctx.today, { lastPeriodCompleted: input.lastPeriodCompleted });');
    const stop = row.indexOf('if (problem) throw new Error(problem);');
    const guard = row.indexOf('if (changedFields(ob, patch).length > 0) {');
    const update = row.indexOf('const res = await db.updateFirmObligation(ob.id, patch);');
    const push = row.indexOf('if (res.occurrence) await outlook.sync(res.occurrence, res.obligation);');
    const reactivate = row.indexOf('await db.reactivateFirmObligation(ob.id, { lastPeriodCompleted: input.lastPeriodCompleted });');
    // PAGE-2: the dry run comes BEFORE any write, over this obligation's own occurrences, and a refusal stops the act there.
    expect(row).toContain('const mine = ctx.occurrences.filter((o) => o.obligationId === ob.id);');
    expect(ask).toBeGreaterThan(row.indexOf('const mine = ctx.occurrences.filter('));
    expect(stop).toBeGreaterThan(ask);
    expect(guard).toBeGreaterThan(stop);
    expect(row.slice(0, ask)).not.toMatch(/\bdb\.\w+\(|outlook\.sync\(/);
    expect(row.split('reactivationProblem(').length - 1).toBe(1);
    expect(update).toBeGreaterThan(guard);
    expect(push).toBeGreaterThan(update);
    expect(reactivate).toBeGreaterThan(push);
    expect(row.split('db.updateFirmObligation(').length - 1).toBe(1);
    // The guard's block closes before the re-activation, which runs either way.
    expect(row.slice(push, reactivate)).toMatch(/^[^{]*\}/);
    // FOM-4's field: a FIRST activation only, on a serial kind that is neither one-time nor an interval.
    expect(row).toContain('const firstActivation = !ctx.occurrences.some((o) => o.obligationId === ob.id);');
    expect(row).toContain('firstActivation={firstActivation}');
    const form = flat(fnRaw(pageSource, 'ActivationForm'));
    expect(form).toContain("const serial = draft.kind !== 'one-time' && draft.kind !== 'interval-from-completion' && (existing ? !!firstActivation && effectiveMissedPeriods(existing) === 'serial' : missed === 'serial');");
    expect(form).toMatch(/\{serial && \( <label className="fld"><span className="lab">Last period completed — its due date \(optional\)<\/span>/);
  });

  it('a retired obligation\'s open occurrence offers Re-activate beside its badge, which opens nothing (FOD-8, FOD-33)', () => {
    const row = code(fnRaw(pageSource, 'RegisterRow'));
    expect(row).toContain('retired — stays until done');
    const reactivate = buttons(row).filter((b) => b.includes('>Re-activate</button>'));
    expect(reactivate).toHaveLength(1);
    expect(reactivate[0]).toContain('await db.reactivateFirmObligation(ob.id);');
    // Only where the obligation is retired: the Retire button is the other branch.
    expect(row).toMatch(/\{ob\.active \? \(<button[^]*>Retire<\/button>\) : \(<button[^]*>Re-activate<\/button>\)\}/);
  });

  it('puts no raw slug on screen: a category and a review-log action go through label maps (L5-08)', () => {
    const page = flat(pageSource);
    expect(page).toContain('<span className="small muted">{CATEGORY_LABEL[t.category]}</span>');
    expect(page).toContain('· {logActionLabel(l.action)} ·');
    expect(code(pageSource)).not.toMatch(/\{(t|ob)\.category\}|\{l\.action\}|\{occ\.syncStatus\}|\{ob\.weight\}|\{ob\.weekendRule\}|\{ob\.recurrence\.kind\}|\{h\.outcome(Reason)?\}/);
  });

  it('shows every SPEC §7 cell through plainText — on the rows, in the catalog, and in its messages (L5-08)', () => {
    const FIELDS = 'name|kindAnchorText|leadText|weightText|sourceNote|appliesIf|catalogNote';
    const bare = [...code(pageSource).matchAll(new RegExp(`(.{0,12})\\b(ob|t|template|obligation|existing)(\\?)?\\.(${FIELDS})\\b(.{0,6})`, 'g'))]
      // A condition (`x.sourceNote && …`) or the custom form's fallback (`existing?.name ?? …`) shows nothing.
      .filter((m) => !m[1].endsWith('plainText(') && !/^\s*(&&|\?\?)/.test(m[5]))
      .map((m) => m[0]);
    expect(bare).toEqual([]);
  });
});

describe('the /cases card (§7 item 11; FOD-26, FOD-27)', () => {
  it('sits BELOW the legal-watch card on /cases (FOD-27)', () => {
    const src = flat(caseListSource);
    expect(src.indexOf('<WorklistCard compact />')).toBeGreaterThan(-1);
    expect(src.indexOf('<WorklistCard compact />')).toBeLessThan(src.indexOf('<FirmObligationsCard />'));
  });

  const ob = (over: Partial<FirmObligation> = {}): FirmObligation => ({
    id: 'ob', name: 'State Bar membership fee', category: 'licensing', ownerScope: 'attorney',
    recurrence: { kind: 'fixed-annual', month: 1, day: 30 }, precision: 'day', missedPeriods: 'serial',
    conditionalPerPeriod: false, weekendRule: 'unknown', leadDays: 30, weight: 'hard', active: true,
    createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', ...over,
  });
  const occ = (dueOn: string, over: Partial<FirmObligationOccurrence> = {}): FirmObligationOccurrence => ({
    id: 'o', obligationId: 'ob', periodLabel: '2027', dueOn, state: 'open', syncStatus: 'pending',
    createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', ...over,
  });
  const item = (o: FirmObligation, x: FirmObligationOccurrence, today: string): ViewItem => ({
    obligation: o, occurrence: x, state: stateOf(o, x, today), target: targetDate(x), due: dueDate(o, x), daysOverdue: daysOverdue(o, x, today),
  });
  /** R = Fri Jan 29 2027, a weekday: T = D = R. */
  const jan29 = { kind: 'fixed-annual', month: 1, day: 29 } as const;

  it('a lit line reads "<name> · aim for <T> · N days" on a weekday row and on a rolls-forward weekend row (FOD-26)', () => {
    expect(cardLine(item(ob({ recurrence: jan29 }), occ('2027-01-29'), '2027-01-20'), '2027-01-20'))
      .toBe('State Bar membership fee · aim for Fri Jan 29 · 9 days');
    expect(cardLine(item(ob({ recurrence: jan29 }), occ('2027-01-29'), '2027-01-28'), '2027-01-28'))
      .toBe('State Bar membership fee · aim for Fri Jan 29 · 1 day');
    // R = Sat Jan 30 2027 under rolls-forward: T = Fri Jan 29, and the count is to T.
    expect(cardLine(item(ob({ weekendRule: 'rolls-forward' }), occ('2027-01-30'), '2027-01-20'), '2027-01-20'))
      .toBe('State Bar membership fee · aim for Fri Jan 29 · 9 days');
  });

  it('a LIT weekend row under unknown carries NO day count — slice §8 outranks FOD-26\'s shape', () => {
    const lit = item(ob(), occ('2027-01-30'), '2027-01-20');
    expect(lit.state).toBe('lit');
    const line = cardLine(lit, '2027-01-20');
    expect(line).toBe('State Bar membership fee · aim for Fri Jan 29');
    expect(line).not.toMatch(/\d+\s+days?/);
    expect(line).not.toMatch(/overdue/i);
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

  it('cardSummary: up to three items "more" is 0; past three it is n − 3, and the lines are the first three', () => {
    expect(CARD_LINES).toBe(3);
    const today = '2027-01-20';
    const items = (n: number) => Array.from({ length: n }, (_, i) =>
      item(ob({ id: `ob${i}`, name: `Obligation ${i}`, recurrence: jan29 }), occ('2027-01-29', { id: `o${i}`, obligationId: `ob${i}` }), today));
    for (let n = 1; n <= 7; n++) {
      const s = cardSummary(items(n), today);
      expect(s.more, `n = ${n}`).toBe(n <= 3 ? 0 : n - 3);
      expect(s.lines.map((l) => l.id), `n = ${n}`).toEqual(items(n).slice(0, 3).map((x) => x.occurrence.id));
      expect(s.due + s.overdue, `n = ${n}`).toBe(n);
    }
  });

  it('cardSummary counts the overdue items and flags their lines', () => {
    const today = '2027-01-20';
    // R = Fri Jan 15 2027: five days overdue on Jan 20.
    const late = item(ob({ id: 'b', name: 'Filing B', recurrence: { kind: 'fixed-annual', month: 1, day: 15 } }), occ('2027-01-15', { id: 'ob-late', obligationId: 'b' }), today);
    const lit = item(ob({ id: 'a', name: 'Filing A', recurrence: jan29 }), occ('2027-01-29', { id: 'ob-lit', obligationId: 'a' }), today);
    expect(cardSummary([late, lit], today)).toEqual({
      due: 1, overdue: 1, more: 0,
      lines: [
        { id: 'ob-late', text: 'Filing B · overdue · 5 days', overdue: true },
        { id: 'ob-lit', text: 'Filing A · aim for Fri Jan 29 · 9 days', overdue: false },
      ],
    });
  });

  it('the card draws what cardSummary decides, and renders nothing with nothing to act on (FOD-26)', () => {
    const src = flat(cardSource);
    expect(src).toContain('if (items.length === 0) return null;');
    expect(src).toContain('const s = cardSummary(items, today);');
    expect(src).toContain('Firm obligations — {s.due} due · {s.overdue} overdue');
    expect(src).toContain('{s.lines.map((l) => (');
    expect(src).toContain('{l.text}');
    expect(src).toContain('{s.more > 0');
    expect(src).toContain('and {s.more} more');
    expect(src).toContain('Open the register');
    // It decides nothing itself: no slicing, no line-building, no counting.
    expect(code(cardSource)).not.toMatch(/items\.slice\(|cardLine\(|cardCounts\(|items\.length - 3/);
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

describe('the act plumbing: a landed act is not a failed one, and no error is lost (src/pages/firmObligationsActs.ts)', () => {
  const ob = { id: 'ob1', name: 'Filing A' } as FirmObligation;
  const occ = (over: Partial<FirmObligationOccurrence> = {}) =>
    ({ id: 'o1', obligationId: 'ob1', syncStatus: 'pending', ...over }) as FirmObligationOccurrence;
  const deleted = async (): Promise<RemoveResult> => 'deleted';

  it('a push that throws after the act landed never fails the act: it resolves, and the notice is a warning (PAGE-1a)', async () => {
    const outlook = outlookPushes({
      sync: async () => { throw new Error('writing the sync error back failed'); },
      remove: deleted,
    });
    await expect(outlook.sync(occ(), ob)).resolves.toBeUndefined();
    expect(outlook.notice('Done: Filing A (2026).')).toEqual({
      tone: 'warn',
      text: 'Done: Filing A (2026) — saved, but not pushed to Outlook: writing the sync error back failed.',
    });
  });

  it('a push that comes back "error" warns with its own error; one left queued (Outlook not connected) or synced says only the success', async () => {
    const failed = outlookPushes({ sync: async (o) => ({ ...o, syncStatus: 'error', syncError: 'Graph 503' }), remove: deleted });
    await failed.sync(occ(), ob);
    expect(failed.notice('Saved: Filing A.')).toEqual({ tone: 'warn', text: 'Saved: Filing A — saved, but not pushed to Outlook: Graph 503.' });
    for (const syncStatus of ['pending', 'synced'] as const) {
      const fine = outlookPushes({ sync: async (o) => ({ ...o, syncStatus }), remove: deleted });
      await fine.sync(occ(), ob);
      expect(fine.notice('Saved: Filing A.'), syncStatus).toEqual({ tone: 'ok', text: 'Saved: Filing A.' });
    }
  });

  it('says each distinct push failure once, and adds no second full stop to one that has its own', async () => {
    const errs = ['token expired', 'token expired', 'Graph 503'];
    const many = outlookPushes({ sync: async () => { throw new Error(errs.shift()); }, remove: deleted });
    for (let i = 0; i < 3; i++) await many.sync(occ(), ob);
    expect(many.notice('Done: Filing A (2026).').text).toBe('Done: Filing A (2026) — saved, but not pushed to Outlook: token expired; Graph 503.');
    const stopped = outlookPushes({ sync: async () => { throw new Error('token expired.'); }, remove: deleted });
    await stopped.sync(occ(), ob);
    expect(stopped.notice('Done: Filing A (2026).').text).toBe('Done: Filing A (2026) — saved, but not pushed to Outlook: token expired.');
  });

  it('a delete that throws comes back "failed" rather than failing Undo, and Undo\'s warning makes the notice a warning (PAGE-7)', async () => {
    const outlook = outlookPushes({ sync: async (o) => o, remove: async () => { throw new Error('no network'); } });
    await expect(outlook.remove('evt-1')).resolves.toBe('failed');
    expect(outlook.notice('Reopened: Filing A (2026).')).toEqual({ tone: 'ok', text: 'Reopened: Filing A (2026).' });
    outlook.warn('Its removed next occurrence\'s Outlook event was NOT deleted.');
    expect(outlook.notice('Reopened: Filing A (2026).')).toEqual({
      tone: 'warn', text: 'Reopened: Filing A (2026). Its removed next occurrence\'s Outlook event was NOT deleted.',
    });
    for (const r of ['deleted', 'not-connected', 'failed'] as const) {
      expect(await outlookPushes({ sync: async (o) => o, remove: async () => r }).remove('evt-1')).toBe(r);
    }
  });

  it('landedNotice: a success alone is "ok"; a push failure and a warning both show, the failure clause first', () => {
    expect(landedNotice('Done: A.', [], [])).toEqual({ tone: 'ok', text: 'Done: A.' });
    expect(landedNotice('Reopened: A (2026).', ['Graph 503'], ['The event was NOT deleted.'])).toEqual({
      tone: 'warn', text: 'Reopened: A (2026) — saved, but not pushed to Outlook: Graph 503. The event was NOT deleted.',
    });
  });

  it('errorRoute: an error while its row or form is there shows there, and once shown, leaving says nothing at the top (PAGE-1b)', () => {
    const shown: string[] = [];
    const top: string[] = [];
    const route = errorRoute((t) => shown.push(t), (t) => top.push(t));
    route.mounted();
    route.failed('refused');
    expect(shown).toEqual(['refused']);
    route.shown();
    route.unmounted();
    expect(top).toEqual([]);
  });

  it('errorRoute: the reload removed the row or form before its error could commit — the error goes to the top, once (PAGE-1b)', () => {
    const shown: string[] = [];
    const top: string[] = [];
    const route = errorRoute((t) => shown.push(t), (t) => top.push(t));
    route.mounted();
    // run() has returned { ok: false }; React has not yet committed the reload that removes the row.
    route.failed('the write-back failed');
    route.unmounted();
    expect(top).toEqual(['the write-back failed']);
    route.unmounted();
    expect(top).toEqual(['the write-back failed']);
  });

  it('errorRoute: an error that arrives after its row or form is gone goes straight to the top; a remount shows in place again', () => {
    const shown: string[] = [];
    const top: string[] = [];
    const route = errorRoute((t) => shown.push(t), (t) => top.push(t));
    route.mounted();
    route.unmounted();
    route.failed('late');
    expect(shown).toEqual([]);
    expect(top).toEqual(['late']);
    // StrictMode's mount, unmount, mount: back in place, an error shows there.
    route.mounted();
    route.failed('again');
    expect(shown).toEqual(['again']);
    expect(top).toEqual(['late']);
  });

  it('marks its sentences PROVISIONAL with a cite, and names no FO-2 back door', () => {
    const lines = actsSource.split(/\r?\n/);
    for (const phrase of ['saved, but not pushed to Outlook', 'the push failed']) {
      const at = lines.filter((l) => l.includes(phrase) && !/^\s*(\/\/|\*|\/\*\*)/.test(l));
      expect(at, phrase).toHaveLength(1);
      expect(at[0], phrase).toMatch(/\/\/ PROVISIONAL — DECISION 7$/);
    }
    const rests = [...actsSource.matchAll(/(?:\/\/|\/\*)\s*PROVISIONAL\b([^\n]*)/g)].map((m) => m[1]);
    expect(rests.length).toBeGreaterThan(1);
    expect(rests.filter((r) => !/^ — (FOD-\d+|FOM-\d+|DECISION \d+|slice §\d|§\d)/.test(r))).toEqual([]);
    expect(code(actsSource)).not.toMatch(/snooze|dismiss|bulk|select ?all|remind ?me/i);
    expect(code(actsSource)).not.toMatch(/\bdb\.|\bdelete\w*(Obligation|Occurrence)\w*\s*\(/i);
  });
});

describe('the register page after its verifier round (PAGE-1 to PAGE-7)', () => {
  /** The one <button> in a function whose visible text starts with `starts`. */
  const button = (fn: string, starts: string): Jsx => {
    const found = jsxElements(fnRaw(pageSource, fn), 'button').filter((b) => b.body.startsWith(starts));
    expect(found, `${fn}: ${starts}`).toHaveLength(1);
    return found[0];
  };

  it('PAGE-1a: every Outlook push and delete after an act goes through the one catching helper; no act calls either directly', () => {
    const page = code(pageSource);
    const wiring = page.match(/const OUTLOOK: OutlookDeps = \{.*?\};/)?.[0] ?? '';
    expect(wiring).toContain('sync: (occ, ob) => syncFirmOccurrence(db, occ, ob)');
    expect(wiring).toContain('remove: removeFirmOccurrenceFromOutlook');
    const imported = page.match(/import \{[^}]*\} from '\.\.\/outlook\/sync';/)?.[0] ?? '';
    expect(imported).toContain('syncFirmOccurrence');
    // Outside that wiring and its import neither name appears: no bare await syncFirmOccurrence in any act body.
    expect(page.replace(wiring, '').replace(imported, '')).not.toMatch(/\bsyncFirmOccurrence\b|\bremoveFirmOccurrenceFromOutlook\b/);
    // run() gives each act its own collector, and says what that collector says once the act has landed.
    const run = code(fnRaw(pageSource, 'FirmObligationsPage'));
    expect(run).toContain('const outlook = outlookPushes(OUTLOOK);');
    expect(run).toContain('text = await what(outlook);');
    expect(run).toContain('const said = outlook.notice(text);');
    expect(run).toContain('setNotice(said);');
    // Every act that pushes, pushes through it.
    for (const fn of ['FirmObligationsPage', 'RegisterRow', 'undo', 'InactiveRow', 'EditForm']) {
      expect(code(fnRaw(pageSource, fn)), fn).toContain('outlook.sync(');
    }
    // No act reaches the raw deps around the collector: OUTLOOK is named exactly twice, at its
    // declaration and where run() wraps it (an act calling OUTLOOK.sync would fail a landed act again).
    expect(page.match(/\bOUTLOOK\b/g)).toHaveLength(2);
    // A warning renders as a warning, never as a success — its border and its announced role.
    expect(run).toContain("style={notice.tone === 'warn' ? WARN_NOTICE : undefined}");
    expect(page).toContain("const WARN_NOTICE: React.CSSProperties = { borderColor: 'var(--warn)', borderLeftWidth: 4 };");
    expect(run).toContain("role={notice.tone === 'ok' ? 'status' : 'alert'}");
  });

  it('"Set this date" with the date already in force writes nothing, and a month-precision row\'s own date still counts as a change (FOM-6)', () => {
    const edit = code(fnRaw(pageSource, 'EditForm'));
    expect(edit).toContain("override === (occ.dueOnOverride ?? (ob.precision === 'day' ? occ.dueOn : undefined))");
    const guard = edit.indexOf("override === (occ.dueOnOverride ??");
    const write = edit.indexOf('db.setOccurrenceDueOverride(');
    expect(guard).toBeGreaterThan(-1);
    expect(write).toBeGreaterThan(guard);
  });

  it('PAGE-1b: useAct knows whether its row or form is still mounted, and an error it can no longer show goes to the top of the page, tone bad', () => {
    const hook = code(fnRaw(pageSource, 'useAct'));
    expect(hook).toContain('useState(() => errorRoute(');
    expect(hook).toContain("(text) => notify({ tone: 'bad', text })");
    // The mounted flag is cleared in an effect cleanup, which also hands over an error that never committed.
    expect(hook).toContain('useEffect(() => { route.mounted(); return () => route.unmounted(); }, [route]);');
    expect(hook).toContain('useEffect(() => { if (shown.text) route.shown(); }, [shown, route]);');
    // A failure goes through the route, never straight into local state.
    expect(hook).toContain('if (!res.ok) route.failed(res.error);');
    expect(hook).not.toMatch(/setError\(res\.error\)|setShown\(\{ text: res\.error \}\)/);
    // The row above is freed even when this form closed as its act landed: onBusy(false) sits in the finally, ungated.
    const on = hook.indexOf('onBusy?.(true);');
    expect(on).toBeGreaterThan(-1);
    expect(on).toBeLessThan(hook.indexOf('await acts.run(what)'));
    const fin = hook.slice(hook.indexOf('} finally {'));
    expect(fin).toContain('onBusy?.(false);');
    expect(fin).not.toMatch(/mounted|if \(/);
    // No row or form hands its act a bare runner any more.
    expect(code(pageSource)).not.toMatch(/useAct\(\w+\.run\b/);
  });

  it('PAGE-3: while any act on a register row runs, its Done, Not applicable…, Undo, Edit…, Retire and Re-activate all wait', () => {
    const row = code(fnRaw(pageSource, 'RegisterRow'));
    expect(row).toContain('const [busy, reportBusy] = useRunning();');
    expect(row).toContain('const rowAct = useAct(ctx, reportBusy);');
    for (const label of ['Done', 'Not applicable…', 'Undo', 'Edit…', 'Retire', 'Re-activate']) {
      expect(button('RegisterRow', label).attrs.disabled, label).toBe('{busy}');
    }
    // Every form on the row reports into that same count.
    const forms = [...jsxElements(fnRaw(pageSource, 'RegisterRow'), 'CloseForm'), ...jsxElements(fnRaw(pageSource, 'RegisterRow'), 'EditForm')];
    expect(forms).toHaveLength(3);
    for (const f of forms) expect(f.attrs.onBusy).toBe('{reportBusy}');
    expect(code(fnRaw(pageSource, 'CloseForm'))).toContain('useAct(acts, onBusy)');
    expect(code(fnRaw(pageSource, 'EditForm')).match(/useAct\(ctx, onBusy\)/g)).toHaveLength(2);
  });

  it('PAGE-3: an Inactive row\'s Activate… and Undo wait while its act runs; the add toggle and the catalog wait while an add act runs', () => {
    const inactive = code(fnRaw(pageSource, 'InactiveRow'));
    expect(inactive).toContain('const [busy, reportBusy] = useRunning();');
    expect(inactive).toContain('const rowAct = useAct(ctx, reportBusy);');
    expect(button('InactiveRow', 'Activate…').attrs.disabled).toBe('{busy}');
    expect(button('InactiveRow', 'Undo').attrs.disabled).toBe('{busy}');
    expect(jsxElements(fnRaw(pageSource, 'InactiveRow'), 'ActivationForm')[0].attrs.onBusy).toBe('{reportBusy}');
    expect(code(fnRaw(pageSource, 'ActivationForm'))).toContain('useAct(acts, onBusy)');

    const page = fnRaw(pageSource, 'FirmObligationsPage');
    expect(code(page)).toContain('const [addBusy, reportAddBusy] = useRunning();');
    const toggle = jsxElements(page, 'button').filter((b) => b.body.includes("'+ Add obligation'"));
    expect(toggle).toHaveLength(1);
    expect(toggle[0].attrs.disabled).toBe('{!loaded || addBusy}');
    const [catalog] = jsxElements(page, 'Catalog');
    expect([catalog.attrs.busy, catalog.attrs.onBusy]).toEqual(['{addBusy}', '{reportAddBusy}']);
    expect(jsxElements(page, 'ActivationForm')[0].attrs.onBusy).toBe('{reportAddBusy}');
    expect(button('Catalog', 'Custom obligation').attrs.disabled).toBe('{busy}');
    const [catalogRow] = jsxElements(fnRaw(pageSource, 'Catalog'), 'CatalogRow');
    expect([catalogRow.attrs.busy, catalogRow.attrs.onBusy]).toEqual(['{busy}', '{onBusy}']);
    expect(button('CatalogRow', 'Activate…').attrs.disabled).toBe('{busy}');
    expect(button('CatalogRow', 'Add as inactive').attrs.disabled).toBe('{busy}');
    expect(code(fnRaw(pageSource, 'CatalogRow'))).toContain('const addInactive = useAct(acts, onBusy);');
    // A count, so one act finishing never frees what another still holds.
    const running = code(fnRaw(pageSource, 'useRunning'));
    expect(running).toContain('setCount((n) => Math.max(0, n + (on ? 1 : -1)))');
    expect(running).toContain('return [count > 0, report];');
  });

  it('PAGE-4: the page header says everything the top of the page carries, not only a success message', () => {
    const header = flat(pageSource.slice(0, pageSource.indexOf('\nimport ')).split(/\r?\n/).map((l) => l.replace(/^\/\/ ?/, '')).join(' '));
    expect(header).not.toMatch(/only a success message/i);
    for (const said of [
      "a landed act's success message", 'saved but not pushed to Outlook', 'an Outlook event Undo could not delete',
      'a Save changed nothing', 'a failed load, or a failed reload after a landed act', 'the error of an act whose row or form was gone',
    ]) {
      expect(header, said).toContain(said);
    }
    expect(flat(fnRaw(pageSource, 'FirmObligationsPage'))).not.toMatch(/only a success message/i);
  });

  it('PAGE-5: catalog activation closes its form the moment createFirmObligation resolves, before the push; so does every form as its act lands', () => {
    const page = code(fnRaw(pageSource, 'FirmObligationsPage'));
    const write = 'const { obligation, occurrence } = await db.createFirmObligation(input);';
    const create = page.indexOf(write);
    const close = page.indexOf('setAdding(null);', create);
    const push = page.indexOf('if (occurrence) await outlook.sync(occurrence, obligation);', create);
    expect(create).toBeGreaterThan(-1);
    expect(close).toBeGreaterThan(create);
    expect(push).toBeGreaterThan(close);
    expect(page.slice(create + write.length, close)).not.toContain('await');
    for (const [fn, landed, closes] of [
      ['RegisterRow', 'await db.markOccurrenceNotApplicable(', 'setForm(null);'],
      ['InactiveRow', 'await db.reactivateFirmObligation(ob.id, {', 'setActivating(false);'],
      ['EditForm', 'await db.updateFirmObligation(ob.id, patch);', 'onClose();'],
      ['EditForm', 'await db.setOccurrenceDueOverride(occ.id, override);', 'onClose();'],
    ] as const) {
      const body = code(fnRaw(pageSource, fn));
      const w = body.indexOf(landed);
      const c = body.indexOf(closes, w);
      expect(w, `${fn}: ${landed}`).toBeGreaterThan(-1);
      expect(c, `${fn}: ${landed}`).toBeGreaterThan(w);
      expect(body.indexOf('outlook.sync(', w), `${fn}: ${landed}`).toBeGreaterThan(c);
      expect(body.slice(w + landed.length, c), `${fn}: ${landed}`).not.toContain('await');
    }
  });

  it('PAGE-6: Edit\'s "Save changes" with nothing changed writes nothing — it closes and says so', () => {
    const edit = code(fnRaw(pageSource, 'EditForm'));
    const guard = edit.indexOf("if (changedFields(ob, patch).length === 0) { onClose(); ctx.notify({ tone: 'ok', text: 'Nothing changed.' }); return; }");
    const update = edit.indexOf('await db.updateFirmObligation(ob.id, patch);');
    expect(edit.indexOf('const patch: FirmObligationPatch = {')).toBeGreaterThan(-1);
    expect(guard).toBeGreaterThan(edit.indexOf('const patch: FirmObligationPatch = {'));
    expect(update).toBeGreaterThan(guard);
    // The patch it checks is the one patch it writes.
    expect(edit.split('db.updateFirmObligation(').length - 1).toBe(1);
  });

  it('PAGE-7: Undo\'s "Outlook event was NOT deleted" is a warning through the act\'s Outlook half, never part of its success message', () => {
    const undo = code(fnRaw(pageSource, 'undo'));
    expect(undo).toContain('const result = await outlook.remove(res.removed.outlookEventId);');
    expect(undo).toMatch(/if \(result !== 'deleted'\) \{ outlook\.warn\(`Its removed next occurrence's Outlook event \(.*\) was NOT deleted — /);
    expect(undo).toContain('return `Reopened: ${name} (${res.reopened.periodLabel}).`;');
    expect(undo).not.toMatch(/outlookNote|return `[^`]*NOT deleted/);
  });
});
