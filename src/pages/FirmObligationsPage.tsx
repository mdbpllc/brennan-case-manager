// /firm/obligations — THE FIRM-OBLIGATIONS REGISTER.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 5 (FOS-1 RULED YES
// 2026-09-10); the rulings record docs/specs/firm-obligations-rulings-2026-09-10.md.
// DECISION 0: "firm obligation" is the word; the nav label is "Obligations".
//
// The register shows EVERY open occurrence (FOM-14): Overdue pinned at the top, hard
// first then most overdue (FOM-9); then the twelve months from this one; then Later
// (FOM-3); then Inactive, collapsed (FOM-5).
//
// THE ONLY THINGS THAT UNLIGHT AN OCCURRENCE ARE Done; Not applicable, only on a row
// that can lapse for a period and only with a reason (FOD-18); and Undo, only while
// the next occurrence is untouched (FOD-7). There is no snooze, no later, no dismiss
// and no bulk action anywhere on this page (FO-2). Retire closes nothing (FOD-8).
// There is no owner badge at the solo stage (FOM-15).
//
// EVERY LABEL AND SENTENCE ON THIS PAGE IS A PROVISIONAL TEXT ACT, cited beside it.
// Michael rules the wording at THE FIRM-OBLIGATIONS HANDS-ON SITTING; none of it is
// approved text.

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AccountInfo } from '@azure/msal-browser';
import { db, usingSupabase } from '../data';
import { localISODate } from '../domain/dates';
import type { ReviewLogEntry } from '../domain/billing';
import {
  DEFAULT_LEAD_DAYS, HOLIDAY_LINE, RULE_KINDS, WEEKEND_RULES,
  canUndo, defaultMissedPeriods, dueDate, formatDate, lightsOn, registerView, ruleDate, strongLine, targetDate,
  validateRule,
  type DisplayState, type FirmObligation, type FirmObligationOccurrence, type MissedPeriods, type OutcomeReason,
  type RecurrenceRule, type RuleKind, type ViewItem, type Weight, type WeekendRule,
} from '../domain/firmObligations';
import { FIRM_OBLIGATION_TEMPLATES, type FirmObligationTemplate } from '../domain/firmObligationTemplates';
import { activationFromTemplate, WEIGHT_WHEN_TEMPLATE_NAMES_NONE } from '../domain/firmObligationActivation';
import { outlookConfigured, OUTLOOK_FIRM_CALENDAR_NAME } from '../outlook/config';
import { getSignedInAccount, signIn } from '../outlook/auth';
import { removeFirmOccurrenceFromOutlook, syncAllPending, syncFirmOccurrence } from '../outlook/sync';

// ------------------------------------------------------------ provisional labels

const WEEKEND_RULE_LABEL: Record<WeekendRule, string> = {
  'rolls-forward': 'Rolls to the next business day', // PROVISIONAL — §2.3 / FOD-30
  'no-roll': 'Does not roll', // PROVISIONAL — §2.3 / FOD-30
  unknown: 'Unknown — not computed', // PROVISIONAL — §2.3 / FOD-30
};

const KIND_LABEL: Record<RuleKind, string> = {
  'fixed-annual': 'Every year, on a date', // PROVISIONAL — FOD-30
  'fixed-quarterly': 'Four dates a year', // PROVISIONAL — FOD-30
  'fixed-monthly': 'Every month, on a day', // PROVISIONAL — FOD-30
  anniversary: 'On an anniversary', // PROVISIONAL — FOD-30
  'interval-from-completion': 'A number of days after the last completion', // PROVISIONAL — FOD-30
  'one-time': 'Once', // PROVISIONAL — FOD-30
};

const REASON_LABEL: Record<OutcomeReason, string> = {
  'condition-not-met': 'The condition did not apply this period', // PROVISIONAL — FOD-18
  'performed-elsewhere': 'Performed elsewhere', // PROVISIONAL — FOD-18
};

const WEIGHT_GLYPH: Record<Weight, { glyph: string; title: string }> = {
  hard: { glyph: '◆', title: 'Hard' }, // PROVISIONAL — DECISION 6 weight glyph
  routine: { glyph: '◇', title: 'Routine' }, // PROVISIONAL — DECISION 6 weight glyph
};

const STATE_STYLE: Partial<Record<DisplayState, React.CSSProperties>> = {
  lit: { fontWeight: 600 },
  'target-passed': { color: 'var(--warn)', fontWeight: 600 },
  'past-date-unknown': { color: 'var(--warn)', fontWeight: 600 },
  overdue: { color: 'var(--warn)', fontWeight: 700 },
};

const PANEL: React.CSSProperties = { marginTop: 8, padding: 10, background: '#f7f8fa', borderRadius: 6 };

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

// ------------------------------------------------------------ the page

interface Notice { tone: 'ok' | 'bad'; text: string }

interface RegisterCtx {
  today: string;
  obligations: FirmObligation[];
  occurrences: FirmObligationOccurrence[];
  log: ReviewLogEntry[];
  run: (what: () => Promise<string | void>) => Promise<void>;
}

export default function FirmObligationsPage() {
  const [obligations, setObligations] = useState<FirmObligation[]>([]);
  const [occurrences, setOccurrences] = useState<FirmObligationOccurrence[]>([]);
  const [log, setLog] = useState<ReviewLogEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [adding, setAdding] = useState<null | 'catalog' | { template: FirmObligationTemplate | null }>(null);
  const today = localISODate();

  const refresh = useCallback(async () => {
    const [obs, occs, lines] = await Promise.all([
      db.listFirmObligations(), db.listFirmObligationOccurrences(), db.listFirmObligationReviewLog(),
    ]);
    setObligations(obs);
    setOccurrences(occs);
    setLog(lines);
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh().catch((e) => setNotice({
      tone: 'bad',
      text: usingSupabase
        // The two tables exist only once db/migrations/2026-09-10-firm-obligations.sql has run by Michael's hand.
        ? `Couldn't load firm obligations from the central database — if its migration (2026-09-10-firm-obligations.sql) has not been run yet, that is expected. (${msg(e)})` // PROVISIONAL
        : `Couldn't load firm obligations: ${msg(e)}`, // PROVISIONAL
    }));
  }, [refresh]);

  const run = useCallback(async (what: () => Promise<string | void>) => {
    setNotice(null);
    try {
      const text = await what();
      await refresh();
      if (text) setNotice({ tone: 'ok', text });
    } catch (e) {
      setNotice({ tone: 'bad', text: msg(e) });
      await refresh().catch(() => undefined);
    }
  }, [refresh]);

  const view = useMemo(() => registerView(obligations, occurrences, today), [obligations, occurrences, today]);
  const ctx: RegisterCtx = { today, obligations, occurrences, log, run };
  const openCount = view.overdue.length + view.months.reduce((n, m) => n + m.items.length, 0) + view.later.length;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Firm obligations</h2>{/* PROVISIONAL — DECISION 0 page title */}
          <div className="sub">
            {openCount} open · {view.overdue.length} overdue{/* PROVISIONAL — slice §3 item 10 */}
          </div>
        </div>
        <button className="btn" onClick={() => setAdding(adding ? null : 'catalog')}>
          {adding ? 'Close' : '+ Add obligation'}{/* PROVISIONAL — slice §3 item 5 */}
        </button>
      </div>

      {!usingSupabase && (
        <div className="notice">
          Demo fixture — every date and every activation on this page is invented. Nothing here is a fact about the firm.
          {/* PROVISIONAL — FOD-21 */}
        </div>
      )}

      {notice && <div className={`notice${notice.tone === 'bad' ? ' bad' : ''}`}>{notice.text}</div>}

      {adding === 'catalog' && (
        <Catalog
          obligations={obligations}
          onActivate={(template) => setAdding({ template })}
          onCustom={() => setAdding({ template: null })}
          onAddInactive={(template) => run(async () => {
            await db.createFirmObligation(activationFromTemplate(template, {
              recurrence: undatedRule(template), weekendRule: 'unknown', active: false,
            }));
            setAdding(null);
            return `Added inactive: ${template.name}.`; // PROVISIONAL
          })}
        />
      )}

      {adding && adding !== 'catalog' && (
        <div className="card">
          <ActivationForm
            template={adding.template}
            today={today}
            onCancel={() => setAdding(null)}
            onSubmit={(input) => run(async () => {
              const { obligation, occurrence } = await db.createFirmObligation(input);
              if (occurrence) await syncFirmOccurrence(db, occurrence, obligation);
              setAdding(null);
              return occurrence
                ? `Activated: ${obligation.name} — first occurrence ${occurrence.periodLabel}, ${strongLine(obligation, occurrence, today, { withYear: true }).text}.` // PROVISIONAL
                : `Added inactive: ${obligation.name}.`; // PROVISIONAL
            })}
          />
        </div>
      )}

      {!loaded ? null : (
        <>
          {view.overdue.length > 0 && (
            <div className="card" style={{ borderColor: 'var(--warn)' }}>
              <h3 style={{ color: 'var(--warn)' }}>Overdue</h3>{/* PROVISIONAL — FOM-9 */}
              {view.overdue.map((it) => <RegisterRow key={it.occurrence.id} item={it} ctx={ctx} withYear />)}
            </div>
          )}

          {view.months.map((m) => (
            <div className="card" key={m.key}>
              <h3>{m.label}</h3>
              {m.items.length === 0
                ? <div className="small muted">Nothing falls due this month.</div> /* PROVISIONAL — FOM-14 */
                : m.items.map((it) => <RegisterRow key={it.occurrence.id} item={it} ctx={ctx} />)}
            </div>
          ))}

          {view.later.length > 0 && (
            <div className="card">
              <h3>Later</h3>{/* PROVISIONAL — FOM-3 */}
              {view.later.map((it) => <RegisterRow key={it.occurrence.id} item={it} ctx={ctx} withYear />)}
            </div>
          )}

          <div className="card">
            <details>
              <summary><strong>Inactive ({view.inactive.length})</strong>{/* PROVISIONAL — FOM-5 */}</summary>
              {view.inactive.length === 0 && <div className="small muted" style={{ marginTop: 6 }}>No inactive obligations.</div>}
              {view.inactive.map((entry) => (
                <InactiveRow key={entry.obligation.id} entry={entry} ctx={ctx} />
              ))}
            </details>
          </div>

          <div className="small muted" style={{ margin: '4px 2px 12px' }}>{HOLIDAY_LINE}</div>
          <OutlookLine onSynced={() => refresh()} />
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------ one register row

/** The close Undo would reverse for this obligation — the most recent close line
 *  whose occurrence is still closed — and whether FOD-7's test allows it. */
function undoableClose(ob: FirmObligation, ctx: RegisterCtx): FirmObligationOccurrence | null {
  const mine = ctx.occurrences.filter((o) => o.obligationId === ob.id);
  const ids = new Set([ob.id, ...mine.map((o) => o.id)]);
  const lines = ctx.log.filter((l) => ids.has(l.entityId));
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i];
    if (l.action !== 'done' && l.action !== 'not-applicable') continue;
    const occ = mine.find((o) => o.id === l.entityId && o.state === 'done');
    if (!occ) return null;
    return canUndo(ob, occ, mine, lines).ok ? occ : null;
  }
  return null;
}

function RegisterRow({ item, ctx, withYear }: { item: ViewItem; ctx: RegisterCtx; withYear?: boolean }) {
  const { obligation: ob, occurrence: occ } = item;
  const [form, setForm] = useState<null | 'done' | 'na' | 'edit'>(null);
  const [open, setOpen] = useState(false);
  const line = strongLine(ob, occ, ctx.today, { withYear });
  const undoTarget = undoableClose(ob, ctx);
  const weight = WEIGHT_GLYPH[ob.weight];

  const close = (kind: 'done' | 'na', input: CloseInput) => ctx.run(async () => {
    const res = kind === 'done'
      ? await db.markOccurrenceDone(occ.id, { doneOn: input.doneOn, doneNote: input.note, filedAt: input.filedAt })
      : await db.markOccurrenceNotApplicable(occ.id, { doneOn: input.doneOn, note: input.note, reason: input.reason || undefined });
    await syncFirmOccurrence(db, res.closed, res.obligation);
    if (res.next) await syncFirmOccurrence(db, res.next, res.obligation);
    setForm(null);
    const what = kind === 'done' ? 'Done' : 'Not applicable'; // PROVISIONAL — slice §3 item 10
    return `${what}: ${ob.name} (${res.closed.periodLabel})${res.next ? ` — next: ${res.next.periodLabel}, ${strongLine(res.obligation, res.next, ctx.today, { withYear: true }).text}` : ''}.`; // PROVISIONAL
  });

  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span title={weight.title} aria-label={weight.title}>{weight.glyph}</span>
        <strong>{ob.name}</strong>
        <span style={STATE_STYLE[item.state]}>{line.text}</span>
        <span className="small muted">{occ.periodLabel}</span>
        {!ob.active && <span className="badge flag">retired — stays until done</span>/* PROVISIONAL — FOD-33 */}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn small" onClick={() => setForm(form === 'done' ? null : 'done')}>Done</button>{/* PROVISIONAL */}
        {ob.conditionalPerPeriod && (
          <button className="btn small secondary" onClick={() => setForm(form === 'na' ? null : 'na')}>Not applicable…</button> /* PROVISIONAL — FOD-18 */
        )}
        {undoTarget && (
          <button className="btn small secondary" onClick={() => undo(ob, undoTarget, ctx)}>
            Undo {undoTarget.outcome === 'not-applicable' ? 'not applicable' : 'done'} ({undoTarget.periodLabel}){/* PROVISIONAL — FOD-7 */}
          </button>
        )}
        <button className="btn small secondary" onClick={() => setForm(form === 'edit' ? null : 'edit')}>Edit…</button>{/* PROVISIONAL */}
        {ob.active && (
          <button className="btn small secondary" onClick={() => ctx.run(async () => {
            await db.retireFirmObligation(ob.id);
            return `Retired: ${ob.name}. Its open occurrence stays until done.`; // PROVISIONAL — FOD-8
          })}>Retire</button>
        )}
        <button className="linky small" onClick={() => setOpen(!open)}>{open ? 'Hide details' : 'Details'}</button>{/* PROVISIONAL */}
      </div>
      {form === 'done' && <CloseForm kind="done" today={ctx.today} onCancel={() => setForm(null)} onSubmit={(i) => close('done', i)} />}
      {form === 'na' && <CloseForm kind="na" today={ctx.today} onCancel={() => setForm(null)} onSubmit={(i) => close('na', i)} />}
      {form === 'edit' && <EditForm ob={ob} occ={occ} ctx={ctx} onClose={() => setForm(null)} />}
      {open && <Details ob={ob} occ={occ} ctx={ctx} />}
    </div>
  );
}

function undo(ob: FirmObligation, target: FirmObligationOccurrence, ctx: RegisterCtx) {
  return ctx.run(async () => {
    const res = await db.undoOccurrence(target.id);
    let outlookNote = '';
    if (res.removed?.outlookEventId) {
      const result = await removeFirmOccurrenceFromOutlook(res.removed.outlookEventId);
      if (result !== 'deleted') {
        outlookNote = ` Its removed next occurrence's Outlook event ("Firm obligation: ${ob.name} (${res.removed.periodLabel})") was NOT deleted — ${result === 'not-connected' ? 'Outlook is not connected here' : 'the delete failed'}; delete it in Outlook.`; // PROVISIONAL
      }
    }
    await syncFirmOccurrence(db, res.reopened, res.obligation);
    return `Reopened: ${ob.name} (${res.reopened.periodLabel}).${outlookNote}`; // PROVISIONAL — FOD-7
  });
}

// ------------------------------------------------------------ Inactive (FOM-5, FOD-33)

function InactiveRow({ entry, ctx }: {
  entry: { obligation: FirmObligation; lastDone: FirmObligationOccurrence | null; open: FirmObligationOccurrence | null };
  ctx: RegisterCtx;
}) {
  const { obligation: ob, lastDone, open } = entry;
  const [activating, setActivating] = useState(false);
  const undoTarget = undoableClose(ob, ctx);
  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <strong>{ob.name}</strong>
        <span className="small muted">
          {lastDone
            ? `last ${lastDone.outcome === 'not-applicable' ? 'not applicable' : 'done'} ${formatDate(lastDone.doneOn!)} (${lastDone.periodLabel})` // PROVISIONAL — FOD-33
            : 'never done here'}{/* PROVISIONAL — FOD-33 */}
        </span>
        {open && <span className="small">· its {open.periodLabel} occurrence is still open above, until done</span>/* PROVISIONAL — FOD-33 */}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <button className="btn small secondary" onClick={() => setActivating(!activating)}>Activate…</button>{/* PROVISIONAL — FOM-5 */}
        {undoTarget && !open && (
          <button className="btn small secondary" onClick={() => undo(ob, undoTarget, ctx)}>
            Undo {undoTarget.outcome === 'not-applicable' ? 'not applicable' : 'done'} ({undoTarget.periodLabel}){/* PROVISIONAL — FOD-7 */}
          </button>
        )}
      </div>
      {activating && (
        <div style={PANEL}>
          <ActivationForm
            existing={ob}
            template={FIRM_OBLIGATION_TEMPLATES.find((t) => t.key === ob.templateKey) ?? null}
            today={ctx.today}
            onCancel={() => setActivating(false)}
            onSubmit={(input) => ctx.run(async () => {
              await db.updateFirmObligation(ob.id, {
                recurrence: input.recurrence, weekendRule: input.weekendRule, leadDays: input.leadDays, weight: input.weight,
              });
              const { obligation, occurrence } = await db.reactivateFirmObligation(ob.id);
              if (occurrence) await syncFirmOccurrence(db, occurrence, obligation);
              setActivating(false);
              return `Activated: ${obligation.name}${occurrence ? ` — ${occurrence.periodLabel}, ${strongLine(obligation, occurrence, ctx.today, { withYear: true }).text}` : ''}.`; // PROVISIONAL
            })}
          />
        </div>
      )}
      {!activating && lastDone && <Details ob={ob} occ={null} ctx={ctx} />}
    </div>
  );
}

// ------------------------------------------------------------ Done / Not applicable

interface CloseInput { doneOn: string; note: string; filedAt: string; reason: OutcomeReason | '' }

function CloseForm({ kind, today, onSubmit, onCancel }: {
  kind: 'done' | 'na'; today: string; onSubmit: (input: CloseInput) => void; onCancel: () => void;
}) {
  const [doneOn, setDoneOn] = useState(today);
  const [note, setNote] = useState('');
  const [filedAt, setFiledAt] = useState('');
  const [reason, setReason] = useState<OutcomeReason | ''>('');
  return (
    <div className="filters" style={{ ...PANEL, alignItems: 'flex-end' }}>
      <label className="fld"><span className="lab">{kind === 'done' ? 'Done on' : 'Decided on'}</span>{/* PROVISIONAL */}
        <input type="date" value={doneOn} max={today} onChange={(e) => setDoneOn(e.target.value)} />
      </label>
      {kind === 'na' && (
        <label className="fld"><span className="lab">Reason (required)</span>{/* PROVISIONAL — FOD-18 */}
          <select value={reason} onChange={(e) => setReason(e.target.value as OutcomeReason | '')}>
            <option value="">Choose…</option>
            {(Object.keys(REASON_LABEL) as OutcomeReason[]).map((r) => <option key={r} value={r}>{REASON_LABEL[r]}</option>)}
          </select>
        </label>
      )}
      <label className="fld" style={{ minWidth: 220 }}><span className="lab">Note</span>{/* PROVISIONAL */}
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
          placeholder={kind === 'done' ? 'a confirmation number, "filed on the portal"' : 'e.g. no wages paid this year'} />{/* PROVISIONAL */}
      </label>
      {kind === 'done' && (
        <label className="fld" style={{ minWidth: 220 }}><span className="lab">Where the proof is</span>{/* PROVISIONAL — filedAt */}
          <input type="text" value={filedAt} onChange={(e) => setFiledAt(e.target.value)} placeholder="a folder, a link, a document name" />{/* PROVISIONAL */}
        </label>
      )}
      <button className="btn small" disabled={kind === 'na' && !reason}
        onClick={() => onSubmit({ doneOn, note, filedAt, reason })}>
        {kind === 'done' ? 'Mark done' : 'Mark not applicable'}{/* PROVISIONAL */}
      </button>
      <button className="btn small secondary" onClick={onCancel}>Cancel</button>
    </div>
  );
}

// ------------------------------------------------------------ the rule inputs

interface RuleDraft {
  kind: RuleKind;
  date: string;
  dates: string[];
  day: string;
  everyYears: string;
  days: string;
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function draftFromRule(rule: RecurrenceRule | Partial<RecurrenceRule>, kind: RuleKind, year: number): RuleDraft {
  const md = (m?: number, d?: number) => (m && d ? `${year}-${pad2(m)}-${pad2(d)}` : '');
  return {
    kind,
    date: kind === 'fixed-annual' ? md(rule.month, rule.day)
      : kind === 'anniversary' ? rule.anchorDate ?? ''
        : kind === 'one-time' ? rule.dueOn ?? '' : '',
    dates: kind === 'fixed-quarterly' && rule.dates ? rule.dates.map((x) => md(x.month, x.day)) : ['', '', '', ''],
    day: kind === 'fixed-monthly' && rule.day ? String(rule.day) : '',
    everyYears: String(rule.everyYears ?? 1),
    days: rule.days ? String(rule.days) : '',
  };
}

function ruleFromDraft(d: RuleDraft): { rule: RecurrenceRule } | { error: string } {
  const toMd = (s: string) => { const [, m, day] = s.split('-').map(Number); return { month: m, day }; };
  let rule: RecurrenceRule;
  switch (d.kind) {
    case 'fixed-annual':
      if (!d.date) return { error: 'Enter the due date — its month and day repeat every year.' }; // PROVISIONAL — FOD-9
      rule = { kind: d.kind, ...toMd(d.date) };
      break;
    case 'fixed-quarterly':
      if (d.dates.some((x) => !x)) return { error: 'Enter all four due dates, in period order.' }; // PROVISIONAL — FOD-9
      rule = { kind: d.kind, dates: d.dates.map(toMd) };
      break;
    case 'fixed-monthly':
      rule = { kind: d.kind, day: Number(d.day) };
      break;
    case 'anniversary':
      if (!d.date) return { error: 'Enter the anniversary date.' }; // PROVISIONAL — FOD-9
      rule = { kind: d.kind, anchorDate: d.date, everyYears: Number(d.everyYears || 1) };
      break;
    case 'interval-from-completion':
      rule = { kind: d.kind, days: Number(d.days) };
      break;
    case 'one-time':
      if (!d.date) return { error: 'Enter the due date.' }; // PROVISIONAL — FOD-9
      rule = { kind: d.kind, dueOn: d.date };
      break;
  }
  const errs = validateRule(rule);
  return errs.length ? { error: errs.join('; ') } : { rule };
}

/** The template's rule with its non-date parameters only — for "Add as inactive". */
function undatedRule(t: FirmObligationTemplate): RecurrenceRule {
  const r = t.templateRule;
  return {
    kind: t.kind,
    ...(r.everyYears !== undefined ? { everyYears: r.everyYears } : {}),
    ...(r.days !== undefined ? { days: r.days } : {}),
  };
}

function RuleInputs({ draft, onChange }: { draft: RuleDraft; onChange: (d: RuleDraft) => void }) {
  const set = (patch: Partial<RuleDraft>) => onChange({ ...draft, ...patch });
  switch (draft.kind) {
    case 'fixed-annual':
      return (
        <label className="fld"><span className="lab">Due date (month and day repeat)</span>{/* PROVISIONAL — FOD-30 */}
          <input type="date" value={draft.date} onChange={(e) => set({ date: e.target.value })} />
        </label>
      );
    case 'fixed-quarterly':
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <label className="fld" key={i}><span className="lab">Due date {i + 1} of 4</span>{/* PROVISIONAL — FOD-30 */}
              <input type="date" value={draft.dates[i] ?? ''}
                onChange={(e) => { const dates = [...draft.dates]; dates[i] = e.target.value; set({ dates }); }} />
            </label>
          ))}
        </>
      );
    case 'fixed-monthly':
      return (
        <label className="fld"><span className="lab">Day of the month</span>{/* PROVISIONAL — FOD-30 */}
          <input type="number" min={1} max={31} value={draft.day} onChange={(e) => set({ day: e.target.value })} style={{ width: 80 }} />
        </label>
      );
    case 'anniversary':
      return (
        <>
          <label className="fld"><span className="lab">Anniversary date</span>{/* PROVISIONAL — FOD-30 */}
            <input type="date" value={draft.date} onChange={(e) => set({ date: e.target.value })} />
          </label>
          <label className="fld"><span className="lab">Every (years)</span>{/* PROVISIONAL */}
            <input type="number" min={1} value={draft.everyYears} onChange={(e) => set({ everyYears: e.target.value })} style={{ width: 80 }} />
          </label>
        </>
      );
    case 'interval-from-completion':
      return (
        <label className="fld"><span className="lab">Days after each completion</span>{/* PROVISIONAL */}
          <input type="number" min={1} value={draft.days} onChange={(e) => set({ days: e.target.value })} style={{ width: 90 }} />
        </label>
      );
    case 'one-time':
      return (
        <label className="fld"><span className="lab">Due date</span>{/* PROVISIONAL — FOD-30 */}
          <input type="date" value={draft.date} onChange={(e) => set({ date: e.target.value })} />
        </label>
      );
  }
}

function WeekendRuleRadios({ value, onChange }: { value: WeekendRule; onChange: (w: WeekendRule) => void }) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <span className="lab small">If the date falls on a weekend</span>{/* PROVISIONAL — §2.3 / FOD-30 */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {WEEKEND_RULES.map((w) => (
          <label key={w} className="check">
            <input type="radio" checked={value === w} onChange={() => onChange(w)} /> {WEEKEND_RULE_LABEL[w]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ------------------------------------------------------------ Activate… / Custom

interface ActivationSubmit {
  recurrence: RecurrenceRule;
  weekendRule: WeekendRule;
  leadDays: number;
  weight: Weight;
}

function ActivationForm({ template, existing, today, onSubmit, onCancel }: {
  template: FirmObligationTemplate | null;
  existing?: FirmObligation;
  today: string;
  onSubmit: (input: ReturnType<typeof activationFromTemplate> & ActivationSubmit) => void;
  onCancel: () => void;
}) {
  const year = Number(today.slice(0, 4));
  const startKind: RuleKind = existing?.recurrence.kind ?? template?.kind ?? 'fixed-annual';
  const [draft, setDraft] = useState<RuleDraft>(
    existing ? draftFromRule(existing.recurrence, startKind, year)
      // A template's non-date parameters only (every N years, the interval) — never its dates (FOD-9, FOD-30).
      : draftFromRule({ everyYears: template?.templateRule.everyYears, days: template?.templateRule.days }, startKind, year),
  );
  const [weekendRule, setWeekendRule] = useState<WeekendRule>(existing?.weekendRule ?? 'unknown');
  const [lead, setLead] = useState(String(existing?.leadDays ?? template?.leadDays ?? DEFAULT_LEAD_DAYS));
  const [weight, setWeight] = useState<Weight>(existing?.weight ?? template?.weight ?? WEIGHT_WHEN_TEMPLATE_NAMES_NONE);
  const [lastPeriodCompleted, setLastPeriodCompleted] = useState('');
  const [lastDone, setLastDone] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [conditional, setConditional] = useState(false);
  const [error, setError] = useState('');

  const kinds: RuleKind[] = existing ? [startKind] : template ? (template.kindOptions ?? [template.kind]) : RULE_KINDS;
  const missed: MissedPeriods = template && draft.kind === template.kind ? template.missedPeriods : defaultMissedPeriods(draft.kind);
  const serial = !existing && missed === 'serial' && draft.kind !== 'one-time';

  const submit = () => {
    setError('');
    const built = ruleFromDraft(draft);
    if ('error' in built) { setError(built.error); return; }
    const leadDays = Number(lead);
    if (!Number.isInteger(leadDays) || leadDays < 0) { setError('The lead must be a whole number of days.'); return; } // PROVISIONAL
    const base = template
      ? activationFromTemplate(template, {
        recurrence: built.rule, weekendRule, leadDays, weight,
        lastPeriodCompleted: serial && lastPeriodCompleted ? lastPeriodCompleted : undefined,
        lastDone: !existing && draft.kind === 'interval-from-completion' && lastDone ? lastDone : undefined,
        notes: notes.trim() || undefined,
      })
      : {
        name: existing?.name ?? name.trim(), category: 'custom' as const, ownerScope: 'firm' as const,
        recurrence: built.rule, precision: 'day' as const, missedPeriods: defaultMissedPeriods(draft.kind),
        conditionalPerPeriod: conditional, weekendRule, leadDays, weight,
        lastPeriodCompleted: serial && lastPeriodCompleted ? lastPeriodCompleted : undefined,
        lastDone: !existing && draft.kind === 'interval-from-completion' && lastDone ? lastDone : undefined,
        notes: notes.trim() || undefined, active: true,
      };
    if (!template && !existing && !name.trim()) { setError('A name is required.'); return; } // PROVISIONAL
    onSubmit({ ...base, recurrence: built.rule, weekendRule, leadDays, weight });
  };

  return (
    <div>
      <h3 style={{ marginBottom: 6 }}>
        {existing ? `Activate: ${existing.name}` : template ? `Activate: ${template.name}` : 'Custom obligation'}{/* PROVISIONAL — slice §3 item 5 */}
      </h3>
      {template && (
        <div className="small muted" style={{ marginBottom: 6 }}>
          From the catalog: {template.kindAnchorText}{/* the SPEC §7 cell, verbatim — a hint only; the date is yours (FOD-9) */}
        </div>
      )}
      <div className="filters" style={{ alignItems: 'flex-end' }}>
        {!template && !existing && (
          <label className="fld" style={{ minWidth: 240 }}><span className="lab">Name</span>{/* PROVISIONAL */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        {kinds.length > 1 && (
          <label className="fld"><span className="lab">Kind</span>{/* PROVISIONAL */}
            <select value={draft.kind} onChange={(e) => setDraft(draftFromRule({}, e.target.value as RuleKind, year))}>
              {kinds.map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}
            </select>
          </label>
        )}
        <RuleInputs draft={draft} onChange={setDraft} />
        {serial && (
          <label className="fld"><span className="lab">Last period completed — its due date (optional)</span>{/* PROVISIONAL — FOM-4 */}
            <input type="date" value={lastPeriodCompleted} max={today} onChange={(e) => setLastPeriodCompleted(e.target.value)} />
          </label>
        )}
        {!existing && draft.kind === 'interval-from-completion' && (
          <label className="fld"><span className="lab">Last done (optional — blank means due now)</span>{/* PROVISIONAL — FOD-16 */}
            <input type="date" value={lastDone} max={today} onChange={(e) => setLastDone(e.target.value)} />
          </label>
        )}
        <label className="fld"><span className="lab">Lead (days)</span>{/* PROVISIONAL — FOD-2 */}
          <input type="number" min={0} value={lead} onChange={(e) => setLead(e.target.value)} style={{ width: 80 }} />
        </label>
        <label className="fld"><span className="lab">Weight</span>{/* PROVISIONAL — DECISION 6 */}
          <select value={weight} onChange={(e) => setWeight(e.target.value as Weight)}>
            <option value="hard">Hard</option>
            <option value="routine">Routine</option>
          </select>
        </label>
        {!template && !existing && (
          <label className="check" style={{ paddingBottom: 8 }}>
            <input type="checkbox" checked={conditional} onChange={(e) => setConditional(e.target.checked)} />
            <span>Can lapse for a period (offers Not applicable)</span>{/* PROVISIONAL — FOM-2 */}
          </label>
        )}
      </div>
      <div style={{ margin: '8px 0' }}><WeekendRuleRadios value={weekendRule} onChange={setWeekendRule} /></div>
      {!existing && (
        <label className="fld" style={{ display: 'block', maxWidth: 520 }}><span className="lab">Notes</span>{/* PROVISIONAL */}
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="where to file, the portal, a checklist" />
        </label>
      )}
      {error && <div className="notice bad" style={{ marginTop: 6 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button className="btn small" onClick={submit}>{existing ? 'Activate' : 'Activate'}</button>{/* PROVISIONAL */}
        <button className="btn small secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------ Edit… (FOD-4)

function EditForm({ ob, occ, ctx, onClose }: {
  ob: FirmObligation; occ: FirmObligationOccurrence; ctx: RegisterCtx; onClose: () => void;
}) {
  const year = Number(ctx.today.slice(0, 4));
  const [draft, setDraft] = useState<RuleDraft>(draftFromRule(ob.recurrence, ob.recurrence.kind, year));
  const [lead, setLead] = useState(String(ob.leadDays));
  const [weight, setWeight] = useState<Weight>(ob.weight);
  const [weekendRule, setWeekendRule] = useState<WeekendRule>(ob.weekendRule);
  const [missed, setMissed] = useState<MissedPeriods>(ob.missedPeriods);
  const [notes, setNotes] = useState(ob.notes ?? '');
  const [override, setOverride] = useState(occ.dueOnOverride ?? '');
  const [error, setError] = useState('');

  const save = () => {
    setError('');
    const built = ruleFromDraft(draft);
    if ('error' in built) { setError(built.error); return; }
    const leadDays = Number(lead);
    if (!Number.isInteger(leadDays) || leadDays < 0) { setError('The lead must be a whole number of days.'); return; } // PROVISIONAL
    void ctx.run(async () => {
      const res = await db.updateFirmObligation(ob.id, {
        recurrence: built.rule, leadDays, weight, weekendRule,
        ...(ob.recurrence.kind !== 'interval-from-completion' ? { missedPeriods: missed } : {}),
        notes: notes.trim() || undefined,
      });
      if (res.occurrence) await syncFirmOccurrence(db, res.occurrence, res.obligation);
      onClose();
      return `Saved: ${ob.name}.${res.kept ? ` ${res.kept}` : ''}`; // PROVISIONAL — FOD-4
    });
  };

  const saveOverride = () => {
    setError('');
    if (!override) { setError('Enter the date.'); return; } // PROVISIONAL
    void ctx.run(async () => {
      const updated = await db.setOccurrenceDueOverride(occ.id, override);
      await syncFirmOccurrence(db, updated, ob);
      onClose();
      return `Due date for ${occ.periodLabel} set to ${formatDate(override)}.`; // PROVISIONAL — FOD-4
    });
  };

  return (
    <div style={PANEL}>
      <div className="filters" style={{ alignItems: 'flex-end' }}>
        <RuleInputs draft={draft} onChange={setDraft} />
        <label className="fld"><span className="lab">Lead (days)</span>
          <input type="number" min={0} value={lead} onChange={(e) => setLead(e.target.value)} style={{ width: 80 }} />
        </label>
        <label className="fld"><span className="lab">Weight</span>
          <select value={weight} onChange={(e) => setWeight(e.target.value as Weight)}>
            <option value="hard">Hard</option>
            <option value="routine">Routine</option>
          </select>
        </label>
        {ob.recurrence.kind !== 'interval-from-completion' && ob.recurrence.kind !== 'one-time' && (
          <label className="fld"><span className="lab">A missed period</span>{/* PROVISIONAL — DECISION 2 override */}
            <select value={missed} onChange={(e) => setMissed(e.target.value as MissedPeriods)}>
              <option value="serial">Stays owed (the next period follows, even if past)</option>{/* PROVISIONAL */}
              <option value="collapse">Collapses to the next date</option>{/* PROVISIONAL */}
            </select>
          </label>
        )}
      </div>
      <div style={{ margin: '8px 0' }}><WeekendRuleRadios value={weekendRule} onChange={setWeekendRule} /></div>
      <label className="fld" style={{ display: 'block', maxWidth: 520 }}><span className="lab">Notes</span>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button className="btn small" onClick={save}>Save changes</button>{/* PROVISIONAL */}
        <button className="btn small secondary" onClick={onClose}>Cancel</button>
      </div>
      <div className="filters" style={{ alignItems: 'flex-end', marginTop: 10, borderTop: '1px solid var(--line)', paddingTop: 8 }}>
        <label className="fld"><span className="lab">The real due date for {occ.periodLabel}</span>{/* PROVISIONAL — FOD-4 dueOnOverride */}
          <input type="date" value={override} onChange={(e) => setOverride(e.target.value)} />
        </label>
        <button className="btn small secondary" onClick={saveOverride}>Set this date</button>{/* PROVISIONAL */}
      </div>
      {error && <div className="notice bad" style={{ marginTop: 6 }}>{error}</div>}
    </div>
  );
}

// ------------------------------------------------------------ Details

function Details({ ob, occ, ctx }: { ob: FirmObligation; occ: FirmObligationOccurrence | null; ctx: RegisterCtx }) {
  const mine = ctx.occurrences.filter((o) => o.obligationId === ob.id);
  const history = mine.filter((o) => o.state === 'done').sort((a, b) => (b.doneOn ?? '').localeCompare(a.doneOn ?? ''));
  const ids = new Set([ob.id, ...mine.map((o) => o.id)]);
  const lines = ctx.log.filter((l) => ids.has(l.entityId)).slice().reverse();
  return (
    <div className="small" style={PANEL}>
      {occ && (
        <div>
          Rule date {formatDate(ruleDate(occ))} · aim for {formatDate(targetDate(occ))} · due {formatDate(dueDate(ob, occ))} · lights {formatDate(lightsOn(ob, occ))}{/* PROVISIONAL */}
        </div>
      )}
      <div>
        Weekend: {WEEKEND_RULE_LABEL[ob.weekendRule]} · lead {ob.leadDays} days · {WEIGHT_GLYPH[ob.weight].title.toLowerCase()}{/* PROVISIONAL */}
      </div>
      {ob.sourceNote && <div><span className="muted">Source:</span> {ob.sourceNote}</div>}{/* the SPEC §7 string, verbatim */}
      {ob.appliesIf && <div><span className="muted">Applies if:</span> {ob.appliesIf}</div>}{/* PROVISIONAL label — FOM-2 */}
      {ob.notes && <div><span className="muted">Notes:</span> {ob.notes}</div>}
      {occ && outlookConfigured && (
        <div className="muted">
          Outlook: {occ.syncStatus === 'synced' ? `in the “${OUTLOOK_FIRM_CALENDAR_NAME}” calendar` : occ.syncStatus === 'error' ? `push failed — ${occ.syncError ?? ''}` : 'queued'}{/* PROVISIONAL */}
        </div>
      )}
      {history.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <strong>History</strong>{/* PROVISIONAL */}
          {history.map((h) => (
            <div key={h.id}>
              {h.periodLabel} — {h.outcome === 'not-applicable' ? `not applicable (${REASON_LABEL[h.outcomeReason!]})` : 'done'} {formatDate(h.doneOn!)}
              {h.doneNote ? ` — ${h.doneNote}` : ''}{h.filedAt ? ` · proof: ${h.filedAt}` : ''}
            </div>
          ))}
        </div>
      )}
      {lines.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <strong>Review log</strong>{/* PROVISIONAL — FOD-6 */}
          {lines.map((l) => (
            <div key={l.id} className="muted">{new Date(l.timestamp).toLocaleString()} · {l.action} · {l.reason ?? ''}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------ the catalog

function Catalog({ obligations, onActivate, onCustom, onAddInactive }: {
  obligations: FirmObligation[];
  onActivate: (t: FirmObligationTemplate) => void;
  onCustom: () => void;
  onAddInactive: (t: FirmObligationTemplate) => void;
}) {
  const added = new Set(obligations.map((o) => o.templateKey).filter(Boolean));
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3>Add obligation</h3>{/* PROVISIONAL */}
        <button className="btn small secondary" onClick={onCustom}>Custom obligation</button>{/* PROVISIONAL */}
      </div>
      <div className="small muted" style={{ marginBottom: 6 }}>
        Nothing here is active until you activate it with your own date.{/* PROVISIONAL — FOD-9 */}
      </div>
      {FIRM_OBLIGATION_TEMPLATES.map((t) => (
        <div key={t.key} style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <strong>{t.name}</strong>
            {t.suggestedAtGoLive && <span className="badge status">suggested</span>}{/* PROVISIONAL — DECISION 9B mark; activates nothing */}
            {added.has(t.key) && <span className="small muted">already added</span>}{/* PROVISIONAL */}
            <span className="small muted">{t.category}</span>
          </div>
          <div className="small">{t.kindAnchorText}</div>
          <div className="small muted">Lead {t.leadText} · weight {t.weightText}</div>
          <div className="small"><span className="muted">Source:</span> {t.sourceNote}</div>
          {t.appliesIf && <div className="small"><span className="muted">Applies if:</span> {t.appliesIf}</div>}
          {t.conditionalPerPeriod && <div className="small muted">Can lapse per period</div>}{/* PROVISIONAL — FOM-2 */}
          {t.catalogNote && <div className="small muted">{t.catalogNote}</div>}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <button className="btn small" onClick={() => onActivate(t)}>Activate…</button>{/* PROVISIONAL */}
            {t.createdInactive && (
              <button className="btn small secondary" onClick={() => onAddInactive(t)}>Add as inactive</button> /* PROVISIONAL — FOM-5 */
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------------------ Outlook (DECISION 7)

function OutlookLine({ onSynced }: { onSynced: () => void }) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    getSignedInAccount().then(setAccount).catch(() => undefined);
  }, []);

  if (!outlookConfigured) {
    return (
      <div className="small muted" style={{ marginBottom: 12 }}>
        Outlook is not configured — firm obligations queue here and push once it is (docs/outlook-setup.md).{/* PROVISIONAL */}
      </div>
    );
  }

  const push = async (connect: boolean) => {
    setBusy(true);
    try {
      if (connect) setAccount(await signIn());
      const { synced, failed } = await syncAllPending(db);
      setNote(`Pushed ${synced}${failed ? `, ${failed} failed` : ''}.`); // PROVISIONAL
      onSynced();
    } catch (e) {
      setNote(msg(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="small" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
      <span className="muted">Outlook: occurrences push to the “{OUTLOOK_FIRM_CALENDAR_NAME}” calendar.</span>{/* PROVISIONAL — DECISION 7 */}
      {!account && <button className="btn small secondary" onClick={() => push(true)} disabled={busy}>Connect Outlook</button>}
      {account && <button className="btn small secondary" onClick={() => push(false)} disabled={busy}>Sync now</button>}
      {note && <span className="muted">{note}</span>}
    </div>
  );
}
