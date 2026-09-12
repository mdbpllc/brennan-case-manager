// /firm/obligations — THE FIRM-OBLIGATIONS REGISTER.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 5 (FOS-1 RULED YES
// 2026-09-10); the rulings record docs/specs/firm-obligations-rulings-2026-09-10.md.
// DECISION 0: "firm obligation" is the word; the nav label is "Obligations".
//
// The register shows EVERY open occurrence (FOM-14): Overdue pinned at the top, hard
// first then most overdue (FOM-9); then Needs attention, only when an active
// obligation has no open occurrence (only a save to the central database that stopped
// part-way leaves one); then the twelve months from this one; then Later (FOM-3); then
// Inactive, collapsed (FOM-5), where a row activated from the catalog shows its
// catalog text, its note and its source (FOD-33; slice §3 item 3).
//
// THE ONLY THINGS THAT UNLIGHT AN OCCURRENCE ARE Done; Not applicable, only on a row
// that can lapse for a period and only with a reason (FOD-18); and Undo, only while
// the next occurrence is untouched (FOD-7). There is no snooze, no later, no dismiss,
// no bulk action and no delete control anywhere on this page (FO-2; slice §8). Retire
// closes nothing, and Re-activate on a retired row's open occurrence opens nothing
// (FOD-8). There is no owner badge at the solo stage (FOM-15).
//
// An act's error shows in the row or form that started it, and a form stays open on
// it. While an act runs, its buttons are disabled, and so is every control on its row
// that would start another act or open or close a form — on the add panel, the toggle
// and the catalog's buttons. An act has LANDED once its adapter write resolves: its
// form closes then, and an Outlook push that fails after it never makes it look failed
// (src/pages/firmObligationsActs.ts). Every act reloads the register, whether it landed
// or not.
//
// The top of the page says what has no row or form to say it in: a landed act's
// success message; a landed act's warning — saved but not pushed to Outlook, or an
// Outlook event Undo could not delete; the note that a Save changed nothing; a failed
// load, or a failed reload after a landed act; and the error of an act whose row or
// form was gone by the time the error could show.
//
// SPEC §7's cells — names, source notes, "Applies if", the catalog text — are stored
// byte for byte, markdown included. This page shows them through plainText() and never
// changes the stored strings.
//
// EVERY LABEL AND SENTENCE ON THIS PAGE IS A PROVISIONAL TEXT ACT, marked on its own
// line with its cite: the FOD-n, FOM-n or DECISION that names it, else slice §3 item
// 10. Michael rules the wording at THE FIRM-OBLIGATIONS HANDS-ON SITTING; none of it is
// approved text.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AccountInfo } from '@azure/msal-browser';
import { db, usingSupabase } from '../data';
import { localISODate } from '../domain/dates';
import type { ReviewLogEntry } from '../domain/billing';
import {
  DEFAULT_LEAD_DAYS, FOD1_NOTE, HOLIDAY_LINE, RULE_KINDS, WEEKEND_RULES,
  canUndo, changedFields, defaultMissedPeriods, dueDate, effectiveMissedPeriods, formatDate, isUnknownWeekend,
  lightsOn, plainText, reactivationProblem, registerView, ruleDate, strongLine, targetDate, validateRule,
  type DisplayState, type FirmObligation, type FirmObligationCategory, type FirmObligationOccurrence,
  type FirmObligationPatch, type MissedPeriods, type OutcomeReason, type RecurrenceRule, type RuleKind,
  type ViewItem, type Weight, type WeekendRule,
} from '../domain/firmObligations';
import { FIRM_OBLIGATION_TEMPLATES, type FirmObligationTemplate } from '../domain/firmObligationTemplates';
import { activationFromTemplate, WEIGHT_WHEN_TEMPLATE_NAMES_NONE } from '../domain/firmObligationActivation';
import { outlookConfigured, OUTLOOK_FIRM_CALENDAR_NAME } from '../outlook/config';
import { getSignedInAccount, signIn } from '../outlook/auth';
import { removeFirmOccurrenceFromOutlook, syncAllPending, syncFirmOccurrence } from '../outlook/sync';
import {
  errorRoute, msg, outlookPushes, type Notice, type OutlookDeps, type OutlookPushes,
} from './firmObligationsActs';

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

/** Spec §3.1's category slugs, in words for the catalog line (review L5-08). */
const CATEGORY_LABEL: Record<FirmObligationCategory, string> = {
  licensing: 'Licensing', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  'court-appointments': 'Court appointments', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  'practice-rules': 'Practice rules', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  'tax-entity-and-employment': 'Tax, entity and employment', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  insurance: 'Insurance', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  infrastructure: 'Infrastructure', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
  custom: 'Custom', // PROVISIONAL — slice §3 item 10 (spec §3.1 category)
};

/** The review-log actions a firm line carries (slice §3 item 8), in words for the
 *  expander (review L5-08). */
type FirmLogAction = Extract<ReviewLogEntry['action'], 'created' | 'edited' | 'done' | 'not-applicable' | 'undone'>;
const LOG_ACTION_LABEL: Record<FirmLogAction, string> = {
  created: 'Created', // PROVISIONAL — FOD-6
  edited: 'Edited', // PROVISIONAL — FOD-6
  done: 'Done', // PROVISIONAL — FOD-6
  'not-applicable': 'Not applicable', // PROVISIONAL — FOD-6
  undone: 'Undone', // PROVISIONAL — FOD-6
};

/** No other action is written on a firm line; were one ever to appear, it shows as
 *  stored rather than vanish from the record. */
function logActionLabel(action: ReviewLogEntry['action']): string {
  return LOG_ACTION_LABEL[action as FirmLogAction] ?? action;
}

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

/** A landed act's warning at the top of the page: the plain notice, with the warning
 *  edge the Overdue card carries, so it never reads as a success. */
const WARN_NOTICE: React.CSSProperties = { borderColor: 'var(--warn)', borderLeftWidth: 4 };

// ------------------------------------------------------------ the acts

/** The page's ONE way to Outlook after an act. run() wraps these in outlookPushes, which
 *  catches and reports, and hands that to the act; no act calls either directly. */
const OUTLOOK: OutlookDeps = {
  sync: (occ, ob) => syncFirmOccurrence(db, occ, ob),
  remove: removeFirmOccurrenceFromOutlook,
};

/** One act: its adapter write, then its Outlook half through `outlook`. It resolves to
 *  the sentence said at the top of the page once it has landed. */
type Act = (outlook: OutlookPushes) => Promise<string>;

/** What an act came to. A failure goes back to the row or form that started it. */
type ActResult = { ok: true } | { ok: false; error: string };

/** What the page lends every row and form: the act runner, and the top of the page —
 *  for an act whose row or form is gone by the time its error could show. */
interface Acts {
  run: (what: Act) => Promise<ActResult>;
  notify: (notice: Notice) => void;
}

interface RegisterCtx extends Acts {
  today: string;
  obligations: FirmObligation[];
  occurrences: FirmObligationOccurrence[];
  log: ReviewLogEntry[];
}

/** One act's running flag and its error, held by the row or form that started it
 *  (review L5-05): the error shows there, a form stays open on it, and the act's
 *  buttons are disabled while it runs. A second click while it runs does nothing.
 *  `onBusy` tells the row or panel above that an act is running, so its controls wait
 *  too — and says it has stopped even when this form closed as its act landed. An error
 *  whose row or form is gone by the time it could show goes to the top of the page
 *  instead (errorRoute): `route` holds whether this component is still mounted, cleared
 *  in the effect cleanup below. */
function useAct(acts: Acts, onBusy?: (on: boolean) => void) {
  const [busy, setBusy] = useState(false);
  // A fresh object on every set, so the effect below sees each error commit — a repeat of the last one too.
  const [shown, setShown] = useState({ text: '' });
  const { notify } = acts;
  // `notify` is the page's setNotice, the same function for the page's whole life.
  const [route] = useState(() => errorRoute(
    (text) => setShown({ text }),
    (text) => notify({ tone: 'bad', text }),
  ));
  const running = useRef(false);
  useEffect(() => {
    if (shown.text) route.shown();
  }, [shown, route]);
  useEffect(() => {
    route.mounted();
    return () => route.unmounted();
  }, [route]);
  const setError = useCallback((text: string) => setShown({ text }), []);
  const act = async (what: Act): Promise<boolean> => {
    if (running.current) return false;
    running.current = true;
    setBusy(true);
    onBusy?.(true);
    setShown((s) => (s.text ? { text: '' } : s));
    try {
      const res = await acts.run(what);
      if (!res.ok) route.failed(res.error);
      return res.ok;
    } finally {
      running.current = false;
      setBusy(false);
      onBusy?.(false);
    }
  };
  return { busy, error: shown.text, setError, act };
}

/** Whether any act on a row, or on the add panel, is running — reported up by useAct's
 *  `onBusy`. A count, so one act finishing never frees a control another still holds. */
function useRunning(): [boolean, (on: boolean) => void] {
  const [count, setCount] = useState(0);
  const report = useCallback((on: boolean) => setCount((n) => Math.max(0, n + (on ? 1 : -1))), []);
  return [count > 0, report];
}

/** A form opened from far down the page (the catalog's Activate… renders at its top)
 *  is scrolled into view as it opens, so it never opens off-screen. */
function useScrollIntoViewOnOpen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'start' });
  }, []);
  return ref;
}

/** An act's error, in the row or form that started it. The text is the error's own. */
function ActError({ text }: { text: string }) {
  return text ? <div className="notice bad" role="alert" style={{ marginTop: 6 }}>{text}</div> : null;
}

// ------------------------------------------------------------ the page

export default function FirmObligationsPage() {
  const [obligations, setObligations] = useState<FirmObligation[]>([]);
  const [occurrences, setOccurrences] = useState<FirmObligationOccurrence[]>([]);
  const [log, setLog] = useState<ReviewLogEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [adding, setAdding] = useState<null | 'catalog' | { template: FirmObligationTemplate | null }>(null);
  // The catalog's acts and the activation form report here: while one runs, nothing on
  // the add panel starts another act or closes or swaps the panel under it (PAGE-3).
  const [addBusy, reportAddBusy] = useRunning();
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
        ? `Couldn't load firm obligations from the central database — if its migration (2026-09-10-firm-obligations.sql) has not been run yet, that is expected. (${msg(e)})` // PROVISIONAL — slice §3 item 10
        : `Couldn't load firm obligations: ${msg(e)}`, // PROVISIONAL — slice §3 item 10
    }));
  }, [refresh]);

  // Runs one act, then reloads the register whether it landed or not. The act gets its
  // own Outlook half (outlookPushes), which never fails it. A failure goes back to the
  // caller, to show in the row or form that started it (review L5-05); a landed act's
  // success message, or its warning when a push after it failed, is said at the top.
  const run = useCallback(async (what: Act): Promise<ActResult> => {
    setNotice(null);
    const outlook = outlookPushes(OUTLOOK);
    let text: string;
    try {
      text = await what(outlook);
    } catch (e) {
      await refresh().catch(() => undefined);
      return { ok: false, error: msg(e) };
    }
    const said = outlook.notice(text);
    try {
      await refresh();
      setNotice(said);
    } catch (e) {
      // The act landed and its form has closed; only the reload failed, so it is said here.
      setNotice({ tone: 'bad', text: `${said.text} The register did not reload: ${msg(e)}` }); // PROVISIONAL — slice §3 item 10
    }
    return { ok: true };
  }, [refresh]);

  const view = useMemo(() => registerView(obligations, occurrences, today), [obligations, occurrences, today]);
  const ctx: RegisterCtx = { today, obligations, occurrences, log, run, notify: setNotice };
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
        {/* Dead until the register has loaded: before its migration has run, the central database has nothing to add to (review L5-11). Held while an add act runs (PAGE-3). */}
        <button className="btn" disabled={!loaded || addBusy} onClick={() => setAdding(adding ? null : 'catalog')}>
          {adding ? 'Close' : '+ Add obligation'}{/* PROVISIONAL — slice §3 items 5, 10 */}
        </button>
      </div>

      {!usingSupabase && (
        <div className="notice">
          Demo fixture — every date and every activation on this page is invented. Nothing here is a fact about the firm.{/* PROVISIONAL — FOD-21 */}
        </div>
      )}

      {notice && (
        <div className={`notice${notice.tone === 'bad' ? ' bad' : ''}`} role={notice.tone === 'ok' ? 'status' : 'alert'}
          style={notice.tone === 'warn' ? WARN_NOTICE : undefined}>{notice.text}</div>
      )}

      {loaded && adding === 'catalog' && (
        <Catalog
          obligations={obligations}
          acts={ctx}
          busy={addBusy}
          onBusy={reportAddBusy}
          onActivate={(template) => setAdding({ template })}
          onCustom={() => setAdding({ template: null })}
          onAddInactive={async (template) => {
            await db.createFirmObligation(activationFromTemplate(template, {
              recurrence: undatedRule(template), weekendRule: 'unknown', active: false,
            }));
            setAdding(null);
            return `Added inactive: ${plainText(template.name)}.`; // PROVISIONAL — FOM-5
          }}
        />
      )}

      {loaded && adding && adding !== 'catalog' && (
        <div className="card">
          <ActivationForm
            key={adding.template?.key ?? 'custom'}
            template={adding.template}
            today={today}
            acts={ctx}
            onBusy={reportAddBusy}
            onCancel={() => setAdding(null)}
            onSubmit={async (input, outlook) => {
              const { obligation, occurrence } = await db.createFirmObligation(input);
              // Landed: the form closes at once, so a second click cannot create a second
              // obligation while the push runs (PAGE-5). A failed push is a warning, not a failure.
              setAdding(null);
              if (occurrence) await outlook.sync(occurrence, obligation);
              return occurrence
                ? `Activated: ${plainText(obligation.name)} — first occurrence ${occurrence.periodLabel}, ${strongLine(obligation, occurrence, today, { withYear: true }).text}.` // PROVISIONAL — FOD-30 with FOD-25
                : `Added inactive: ${plainText(obligation.name)}.`; // PROVISIONAL — FOM-5
            }}
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

          {view.stranded.length > 0 && (
            <div className="card" style={{ borderColor: 'var(--warn)' }}>
              <h3 style={{ color: 'var(--warn)' }}>Needs attention</h3>{/* PROVISIONAL — slice §3 item 10 */}
              {view.stranded.map((ob) => <StrandedRow key={ob.id} ob={ob} ctx={ctx} />)}
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
              {view.inactive.length === 0 && <div className="small muted" style={{ marginTop: 6 }}>No inactive obligations.</div>}{/* PROVISIONAL — FOM-5 */}
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
  // Every act on this row reports here — Undo, Retire and Re-activate below, Done, Not
  // applicable and Edit in their forms. While one runs, no control on the row starts
  // another act or opens or closes a form under it (PAGE-3).
  const [busy, reportBusy] = useRunning();
  // Undo, Retire and Re-activate: one act at a time on this row, its error shown here.
  const rowAct = useAct(ctx, reportBusy);
  const line = strongLine(ob, occ, ctx.today, { withYear });
  const undoTarget = undoableClose(ob, ctx);
  const weight = WEIGHT_GLYPH[ob.weight];
  const name = plainText(ob.name);

  const close = async (kind: 'done' | 'na', input: CloseInput, outlook: OutlookPushes) => {
    const res = kind === 'done'
      ? await db.markOccurrenceDone(occ.id, { doneOn: input.doneOn, doneNote: input.note, filedAt: input.filedAt })
      : await db.markOccurrenceNotApplicable(occ.id, { doneOn: input.doneOn, note: input.note, reason: input.reason || undefined });
    // Landed: the form closes now. A push after this is a warning at most, never a failure.
    setForm(null);
    await outlook.sync(res.closed, res.obligation);
    if (res.next) await outlook.sync(res.next, res.obligation);
    const what = kind === 'done' ? 'Done' : 'Not applicable'; // PROVISIONAL — slice §3 item 10
    return `${what}: ${name} (${res.closed.periodLabel})${res.next ? ` — next: ${res.next.periodLabel}, ${strongLine(res.obligation, res.next, ctx.today, { withYear: true }).text}` : ''}.`; // PROVISIONAL — slice §3 item 10 with FOD-25
  };

  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span title={weight.title} aria-label={weight.title}>{weight.glyph}</span>
        <strong>{name}</strong>
        <span style={STATE_STYLE[item.state]}>{line.text}</span>
        <span className="small muted">{occ.periodLabel}</span>
        {!ob.active && <span className="badge flag">retired — stays until done</span>/* PROVISIONAL — FOD-33 */}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn small" disabled={busy} onClick={() => setForm(form === 'done' ? null : 'done')}>Done</button>{/* PROVISIONAL — slice §3 items 5, 10 */}
        {ob.conditionalPerPeriod && (
          <button className="btn small secondary" disabled={busy} onClick={() => setForm(form === 'na' ? null : 'na')}>Not applicable…</button> /* PROVISIONAL — FOD-18 */
        )}
        {undoTarget && (
          <button className="btn small secondary" disabled={busy} onClick={() => rowAct.act((outlook) => undo(ob, undoTarget, outlook))}>
            Undo {undoTarget.outcome === 'not-applicable' ? 'not applicable' : 'done'} ({undoTarget.periodLabel}){/* PROVISIONAL — FOD-7 */}
          </button>
        )}
        <button className="btn small secondary" disabled={busy} onClick={() => setForm(form === 'edit' ? null : 'edit')}>Edit…</button>{/* PROVISIONAL — FOD-4; slice §3 item 5 */}
        {ob.active ? (
          <button className="btn small secondary" disabled={busy} onClick={() => rowAct.act(async () => {
            await db.retireFirmObligation(ob.id);
            return `Retired: ${name}. Its open occurrence stays until done.`; // PROVISIONAL — FOD-8
          })}>Retire</button> /* PROVISIONAL — FOD-8 */
        ) : (
          // A retired obligation's open occurrence stays in its month (FOD-33). Re-activation
          // opens no occurrence while this one is open (FOD-8), so it only lifts the retirement.
          <button className="btn small secondary" disabled={busy} onClick={() => rowAct.act(async () => {
            await db.reactivateFirmObligation(ob.id);
            return `Re-activated: ${name}. Its ${occ.periodLabel} occurrence is unchanged.`; // PROVISIONAL — FOD-8
          })}>Re-activate</button> /* PROVISIONAL — FOD-8; slice §3 item 5 */
        )}
        <button className="linky small" onClick={() => setOpen(!open)}>{open ? 'Hide details' : 'Details'}</button>{/* PROVISIONAL — slice §3 items 5, 10 (the expander) */}
      </div>
      <ActError text={rowAct.error} />
      {form === 'done' && <CloseForm kind="done" today={ctx.today} acts={ctx} onBusy={reportBusy} onCancel={() => setForm(null)} onSubmit={(i, outlook) => close('done', i, outlook)} />}
      {form === 'na' && <CloseForm kind="na" today={ctx.today} acts={ctx} onBusy={reportBusy} onCancel={() => setForm(null)} onSubmit={(i, outlook) => close('na', i, outlook)} />}
      {form === 'edit' && <EditForm ob={ob} occ={occ} ctx={ctx} onBusy={reportBusy} onClose={() => setForm(null)} />}
      {open && <Details ob={ob} occ={occ} ctx={ctx} />}
    </div>
  );
}

/** Undo's work: reopen, remove the untouched next occurrence's Outlook event, re-push
 *  the reopened one (FOD-7). Run through the row's own act, so an error stays on the row.
 *  An event it could not delete is said as a WARNING at the top, never inside the
 *  success message (PAGE-7). */
async function undo(ob: FirmObligation, target: FirmObligationOccurrence, outlook: OutlookPushes): Promise<string> {
  const name = plainText(ob.name);
  const res = await db.undoOccurrence(target.id);
  if (res.removed?.outlookEventId) {
    const result = await outlook.remove(res.removed.outlookEventId);
    if (result !== 'deleted') {
      outlook.warn(`Its removed next occurrence's Outlook event ("Firm obligation: ${name} (${res.removed.periodLabel})") was NOT deleted — ${result === 'not-connected' ? 'Outlook is not connected here' : 'the delete failed'}; delete it in Outlook.`); // PROVISIONAL — FOD-7 with DECISION 7
    }
  }
  await outlook.sync(res.reopened, res.obligation);
  return `Reopened: ${name} (${res.reopened.periodLabel}).`; // PROVISIONAL — FOD-7
}

// ------------------------------------------------------------ Inactive (FOM-5, FOD-33)

function InactiveRow({ entry, ctx }: {
  entry: { obligation: FirmObligation; lastDone: FirmObligationOccurrence | null; open: FirmObligationOccurrence | null };
  ctx: RegisterCtx;
}) {
  const { obligation: ob, lastDone, open } = entry;
  const [activating, setActivating] = useState(false);
  // Its Undo and its Activate… form report here: while either runs, neither the toggle
  // nor Undo starts, opens or closes anything (PAGE-3).
  const [busy, reportBusy] = useRunning();
  const rowAct = useAct(ctx, reportBusy);
  const undoTarget = undoableClose(ob, ctx);
  const template = ob.templateKey ? FIRM_OBLIGATION_TEMPLATES.find((t) => t.key === ob.templateKey) ?? null : null;
  // FOM-4's "last period completed" belongs to a FIRST activation only: a row with no
  // occurrence at all, like a seeded-inactive template (review L2-F4).
  const firstActivation = !ctx.occurrences.some((o) => o.obligationId === ob.id);
  const name = plainText(ob.name);
  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <strong>{name}</strong>
        <span className="small muted">
          {lastDone
            ? `last ${lastDone.outcome === 'not-applicable' ? 'not applicable' : 'done'} ${formatDate(lastDone.doneOn!)} (${lastDone.periodLabel})` // PROVISIONAL — FOD-33
            : 'never done here'}{/* PROVISIONAL — FOD-33 */}
        </span>
        {open && <span className="small">· its {open.periodLabel} occurrence is still open above, until done</span>/* PROVISIONAL — FOD-33 */}
      </div>
      {ob.templateKey && (
        // Slice §3 item 3 and spec §7.5: a seeded-inactive row sits "inactive with its
        // note". Shown on every catalog row here, done or never done (review L5-06).
        <div style={{ marginTop: 4 }}>
          {template && <div className="small">{plainText(template.kindAnchorText)}</div>}
          {template?.catalogNote && <div className="small muted">{plainText(template.catalogNote)}</div>}
          {ob.sourceNote && <div className="small"><span className="muted">Source:</span> {plainText(ob.sourceNote)}</div>}{/* PROVISIONAL — slice §3 item 5 (its source string); slice §3 item 10 */}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <button className="btn small secondary" disabled={busy} onClick={() => setActivating(!activating)}>Activate…</button>{/* PROVISIONAL — FOM-5 */}
        {undoTarget && !open && (
          <button className="btn small secondary" disabled={busy} onClick={() => rowAct.act((outlook) => undo(ob, undoTarget, outlook))}>
            Undo {undoTarget.outcome === 'not-applicable' ? 'not applicable' : 'done'} ({undoTarget.periodLabel}){/* PROVISIONAL — FOD-7 */}
          </button>
        )}
      </div>
      <ActError text={rowAct.error} />
      {activating && (
        <div style={PANEL}>
          <ActivationForm
            existing={ob}
            template={template}
            firstActivation={firstActivation}
            today={ctx.today}
            acts={ctx}
            onBusy={reportBusy}
            onCancel={() => setActivating(false)}
            onSubmit={async (input, outlook) => {
              const patch: FirmObligationPatch = {
                recurrence: input.recurrence, weekendRule: input.weekendRule, leadDays: input.leadDays, weight: input.weight,
              };
              // Asked BEFORE anything is written (PAGE-2): a re-activation the domain would
              // refuse — a "last period completed" that names no period, a one-time already
              // done, an undated row — says why in this form and writes nothing, so no edit
              // and no "Edited" line is left behind on a row that stays inactive.
              const mine = ctx.occurrences.filter((o) => o.obligationId === ob.id);
              const problem = reactivationProblem(ob, patch, mine, ctx.today, { lastPeriodCompleted: input.lastPeriodCompleted });
              if (problem) throw new Error(problem);
              // One on-screen act that changes nothing writes no "nothing changed" edit line (review L5-09).
              if (changedFields(ob, patch).length > 0) {
                const res = await db.updateFirmObligation(ob.id, patch);
                // The edit may have re-evaluated a retired row's open occurrence: push it.
                if (res.occurrence) await outlook.sync(res.occurrence, res.obligation);
              }
              const { obligation, occurrence } = await db.reactivateFirmObligation(ob.id, { lastPeriodCompleted: input.lastPeriodCompleted });
              // Landed: the form closes now.
              setActivating(false);
              if (occurrence) await outlook.sync(occurrence, obligation);
              return `Activated: ${plainText(obligation.name)}${occurrence ? ` — ${occurrence.periodLabel}, ${strongLine(obligation, occurrence, ctx.today, { withYear: true }).text}` : ''}.`; // PROVISIONAL — FOM-5 with FOD-25
            }}
          />
        </div>
      )}
      {/* Every Inactive row carries its Details, done or never done, so the review log a
          could-not-restore message sends him to is always there. */}
      {!activating && <Details ob={ob} occ={null} ctx={ctx} omitSource={!!ob.templateKey} />}
    </div>
  );
}

// ------------------------------------------------------------ Needs attention

/** An ACTIVE obligation with no open occurrence (registerView's `stranded`). No act
 *  leaves one; only a save to the central database that stopped part-way can, because
 *  PostgREST gives no transaction. It is listed so it never falls off every surface,
 *  and the way back is the ordinary one: Retire, then Activate… from Inactive. */
function StrandedRow({ ob, ctx }: { ob: FirmObligation; ctx: RegisterCtx }) {
  const retire = useAct(ctx);
  const name = plainText(ob.name);
  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <strong>{name}</strong>
      <div className="small" style={{ marginTop: 2 }}>
        Active, but it has no open occurrence — a save to the central database did not finish. Retire it, then Activate… it from Inactive to open its next occurrence.{/* PROVISIONAL — slice §3 item 10 */}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <button className="btn small secondary" disabled={retire.busy} onClick={() => retire.act(async () => {
          await db.retireFirmObligation(ob.id);
          return `Retired: ${name}. Activate… it from Inactive to open its next occurrence.`; // PROVISIONAL — slice §3 item 10 with FOD-8
        })}>Retire</button>{/* PROVISIONAL — FOD-8 */}
      </div>
      <ActError text={retire.error} />
    </div>
  );
}

// ------------------------------------------------------------ Done / Not applicable

interface CloseInput { doneOn: string; note: string; filedAt: string; reason: OutcomeReason | '' }

function CloseForm({ kind, today, acts, onBusy, onSubmit, onCancel }: {
  kind: 'done' | 'na'; today: string; acts: Acts; onBusy?: (on: boolean) => void;
  onSubmit: (input: CloseInput, outlook: OutlookPushes) => Promise<string>; onCancel: () => void;
}) {
  const [doneOn, setDoneOn] = useState(today);
  const [note, setNote] = useState('');
  const [filedAt, setFiledAt] = useState('');
  const [reason, setReason] = useState<OutcomeReason | ''>('');
  const { busy, error, act } = useAct(acts, onBusy);
  return (
    <div style={PANEL}>
      <div className="filters" style={{ alignItems: 'flex-end' }}>
        <label className="fld"><span className="lab">{kind === 'done' ? 'Done on' : 'Decided on'}</span>{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
          <input type="date" value={doneOn} max={today} onChange={(e) => setDoneOn(e.target.value)} />
        </label>
        {kind === 'na' && (
          <label className="fld"><span className="lab">Reason (required)</span>{/* PROVISIONAL — FOD-18 */}
            <select value={reason} onChange={(e) => setReason(e.target.value as OutcomeReason | '')}>
              <option value="">Choose…</option>{/* PROVISIONAL — FOD-18 */}
              {(Object.keys(REASON_LABEL) as OutcomeReason[]).map((r) => <option key={r} value={r}>{REASON_LABEL[r]}</option>)}
            </select>
          </label>
        )}
        <label className="fld" style={{ minWidth: 220 }}><span className="lab">Note</span>{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
            placeholder={kind === 'done' ? 'a confirmation number, "filed on the portal"' : 'e.g. no wages paid this year'} />{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
        </label>
        {kind === 'done' && (
          <label className="fld" style={{ minWidth: 220 }}><span className="lab">Where the proof is</span>{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
            <input type="text" value={filedAt} onChange={(e) => setFiledAt(e.target.value)} placeholder="a folder, a link, a document name" />{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
          </label>
        )}
        <button className="btn small" disabled={busy || (kind === 'na' && !reason)}
          onClick={() => act((outlook) => onSubmit({ doneOn, note, filedAt, reason }, outlook))}>
          {kind === 'done' ? 'Mark done' : 'Mark not applicable'}{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
        </button>
        <button className="btn small secondary" disabled={busy} onClick={onCancel}>Cancel</button>{/* PROVISIONAL — slice §3 item 10 (close-form labels) */}
      </div>
      <ActError text={error} />
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
          <label className="fld"><span className="lab">Every (years)</span>{/* PROVISIONAL — FOD-30 */}
            <input type="number" min={1} value={draft.everyYears} onChange={(e) => set({ everyYears: e.target.value })} style={{ width: 80 }} />
          </label>
        </>
      );
    case 'interval-from-completion':
      return (
        <label className="fld"><span className="lab">Days after each completion</span>{/* PROVISIONAL — FOD-30 */}
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

function ActivationForm({ template, existing, firstActivation, today, acts, onBusy, onSubmit, onCancel }: {
  template: FirmObligationTemplate | null;
  existing?: FirmObligation;
  /** From Inactive: the obligation has no occurrence at all yet (FOM-4 can still apply). */
  firstActivation?: boolean;
  today: string;
  acts: Acts;
  onBusy?: (on: boolean) => void;
  onSubmit: (input: ReturnType<typeof activationFromTemplate> & ActivationSubmit, outlook: OutlookPushes) => Promise<string>;
  onCancel: () => void;
}) {
  const ref = useScrollIntoViewOnOpen<HTMLDivElement>();
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
  const { busy, error, setError, act } = useAct(acts, onBusy);

  const kinds: RuleKind[] = existing ? [startKind] : template ? (template.kindOptions ?? [template.kind]) : RULE_KINDS;
  const missed: MissedPeriods = template && draft.kind === template.kind ? template.missedPeriods : defaultMissedPeriods(draft.kind);
  // FOM-4's optional field, on a serial kind that is neither one-time nor an interval.
  // From the catalog, the kind's setting decides; from Inactive, only on a FIRST
  // activation, and the obligation's own effective setting decides (review L2-F4).
  const serial = draft.kind !== 'one-time' && draft.kind !== 'interval-from-completion' && (existing
    ? !!firstActivation && effectiveMissedPeriods(existing) === 'serial'
    : missed === 'serial');

  const submit = () => {
    const built = ruleFromDraft(draft);
    if ('error' in built) { setError(built.error); return; }
    const leadDays = Number(lead);
    if (!Number.isInteger(leadDays) || leadDays < 0) { setError('The lead must be a whole number of days.'); return; } // PROVISIONAL — FOD-2
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
    if (!template && !existing && !name.trim()) { setError('A name is required.'); return; } // PROVISIONAL — slice §3 item 10
    void act((outlook) => onSubmit({ ...base, recurrence: built.rule, weekendRule, leadDays, weight }, outlook));
  };

  return (
    <div ref={ref}>
      <h3 style={{ marginBottom: 6 }}>
        {existing ? `Activate: ${plainText(existing.name)}` : template ? `Activate: ${plainText(template.name)}` : 'Custom obligation'}{/* PROVISIONAL — slice §3 items 5, 10 */}
      </h3>
      {template && (
        <div className="small muted" style={{ marginBottom: 6 }}>
          From the catalog: {plainText(template.kindAnchorText)}{/* PROVISIONAL — FOD-9 (the label; the cell is SPEC §7's, a hint only — the date is yours) */}
        </div>
      )}
      <div className="filters" style={{ alignItems: 'flex-end' }}>
        {!template && !existing && (
          <label className="fld" style={{ minWidth: 240 }}><span className="lab">Name</span>{/* PROVISIONAL — slice §3 items 5, 10 */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        {kinds.length > 1 && (
          <label className="fld"><span className="lab">Kind</span>{/* PROVISIONAL — slice §3 items 5, 10 */}
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
            <option value="hard">Hard</option>{/* PROVISIONAL — DECISION 6 */}
            <option value="routine">Routine</option>{/* PROVISIONAL — DECISION 6 */}
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
        <label className="fld" style={{ display: 'block', maxWidth: 520 }}><span className="lab">Notes</span>{/* PROVISIONAL — slice §3 item 10 */}
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="where to file, the portal, a checklist" />{/* PROVISIONAL — slice §3 item 10 */}
        </label>
      )}
      <ActError text={error} />
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button className="btn small" disabled={busy} onClick={submit}>Activate</button>{/* PROVISIONAL — FOD-30; slice §3 item 5 */}
        <button className="btn small secondary" disabled={busy} onClick={onCancel}>Cancel</button>{/* PROVISIONAL — slice §3 item 10 */}
      </div>
    </div>
  );
}

// ------------------------------------------------------------ Edit… (FOD-4)

function EditForm({ ob, occ, ctx, onBusy, onClose }: {
  ob: FirmObligation; occ: FirmObligationOccurrence; ctx: RegisterCtx; onBusy?: (on: boolean) => void; onClose: () => void;
}) {
  const ref = useScrollIntoViewOnOpen<HTMLDivElement>();
  const year = Number(ctx.today.slice(0, 4));
  const [draft, setDraft] = useState<RuleDraft>(draftFromRule(ob.recurrence, ob.recurrence.kind, year));
  const [lead, setLead] = useState(String(ob.leadDays));
  const [weight, setWeight] = useState<Weight>(ob.weight);
  const [weekendRule, setWeekendRule] = useState<WeekendRule>(ob.weekendRule);
  const [missed, setMissed] = useState<MissedPeriods>(ob.missedPeriods);
  const [notes, setNotes] = useState(ob.notes ?? '');
  const [override, setOverride] = useState(occ.dueOnOverride ?? '');
  // Two acts, each with its error beside its own button; both buttons wait while either
  // runs, since both write to the same obligation.
  const saveAct = useAct(ctx, onBusy);
  const overrideAct = useAct(ctx, onBusy);
  const busy = saveAct.busy || overrideAct.busy;

  const save = () => {
    const built = ruleFromDraft(draft);
    if ('error' in built) { saveAct.setError(built.error); return; }
    const leadDays = Number(lead);
    if (!Number.isInteger(leadDays) || leadDays < 0) { saveAct.setError('The lead must be a whole number of days.'); return; } // PROVISIONAL — FOD-2
    const patch: FirmObligationPatch = {
      recurrence: built.rule, leadDays, weight, weekendRule,
      ...(ob.recurrence.kind !== 'interval-from-completion' ? { missedPeriods: missed } : {}),
      notes: notes.trim() || undefined,
    };
    // A Save that changes nothing writes nothing: no update, and no "Edited: nothing
    // changed" line (PAGE-6; review L5-09's rule for Activate…). The form closes and says so.
    if (changedFields(ob, patch).length === 0) {
      onClose();
      ctx.notify({ tone: 'ok', text: 'Nothing changed.' }); // PROVISIONAL — slice §3 item 10 (FOD-4's Save with nothing changed)
      return;
    }
    void saveAct.act(async (outlook) => {
      const res = await db.updateFirmObligation(ob.id, patch);
      // Landed: the form closes now.
      onClose();
      if (res.occurrence) await outlook.sync(res.occurrence, res.obligation);
      return `Saved: ${plainText(ob.name)}.${res.kept ? ` ${res.kept}` : ''}`; // PROVISIONAL — FOD-4
    });
  };

  const saveOverride = () => {
    if (!override) { overrideAct.setError('Enter the date.'); return; } // PROVISIONAL — FOD-4
    // The date already in force writes nothing (PAGE-6's rule for Save). On a month-precision
    // row with no override yet, setting its own month-end is NOT nothing: it makes the
    // occurrence day-precise and changes when it lights (FOM-6), so that still writes.
    if (override === (occ.dueOnOverride ?? (ob.precision === 'day' ? occ.dueOn : undefined))) {
      onClose();
      ctx.notify({ tone: 'ok', text: 'Nothing changed.' }); // PROVISIONAL — slice §3 item 10 (FOD-4's override with the date already in force)
      return;
    }
    void overrideAct.act(async (outlook) => {
      const updated = await db.setOccurrenceDueOverride(occ.id, override);
      // Landed: the form closes now.
      onClose();
      await outlook.sync(updated, ob);
      return `Due date for ${occ.periodLabel} set to ${formatDate(override)}.`; // PROVISIONAL — FOD-4
    });
  };

  return (
    <div ref={ref} style={PANEL}>
      <div className="filters" style={{ alignItems: 'flex-end' }}>
        <RuleInputs draft={draft} onChange={setDraft} />
        <label className="fld"><span className="lab">Lead (days)</span>{/* PROVISIONAL — FOD-2 */}
          <input type="number" min={0} value={lead} onChange={(e) => setLead(e.target.value)} style={{ width: 80 }} />
        </label>
        <label className="fld"><span className="lab">Weight</span>{/* PROVISIONAL — DECISION 6 */}
          <select value={weight} onChange={(e) => setWeight(e.target.value as Weight)}>
            <option value="hard">Hard</option>{/* PROVISIONAL — DECISION 6 */}
            <option value="routine">Routine</option>{/* PROVISIONAL — DECISION 6 */}
          </select>
        </label>
        {ob.recurrence.kind !== 'interval-from-completion' && ob.recurrence.kind !== 'one-time' && (
          <label className="fld"><span className="lab">A missed period</span>{/* PROVISIONAL — DECISION 2 override */}
            <select value={missed} onChange={(e) => setMissed(e.target.value as MissedPeriods)}>
              <option value="serial">Stays owed (the next period follows, even if past)</option>{/* PROVISIONAL — DECISION 2 */}
              <option value="collapse">Collapses to the next date</option>{/* PROVISIONAL — DECISION 2 */}
            </select>
          </label>
        )}
      </div>
      <div style={{ margin: '8px 0' }}><WeekendRuleRadios value={weekendRule} onChange={setWeekendRule} /></div>
      <label className="fld" style={{ display: 'block', maxWidth: 520 }}><span className="lab">Notes</span>{/* PROVISIONAL — slice §3 item 10 */}
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button className="btn small" disabled={busy} onClick={save}>Save changes</button>{/* PROVISIONAL — FOD-4 */}
        <button className="btn small secondary" disabled={busy} onClick={onClose}>Cancel</button>{/* PROVISIONAL — slice §3 item 10 */}
      </div>
      <ActError text={saveAct.error} />
      <div className="filters" style={{ alignItems: 'flex-end', marginTop: 10, borderTop: '1px solid var(--line)', paddingTop: 8 }}>
        <label className="fld"><span className="lab">The real due date for {occ.periodLabel}</span>{/* PROVISIONAL — FOD-4 (the due-date override) */}
          <input type="date" value={override} onChange={(e) => setOverride(e.target.value)} />
        </label>
        <button className="btn small secondary" disabled={busy} onClick={saveOverride}>Set this date</button>{/* PROVISIONAL — FOD-4 */}
      </div>
      <ActError text={overrideAct.error} />
    </div>
  );
}

// ------------------------------------------------------------ Details

function Details({ ob, occ, ctx, omitSource }: {
  ob: FirmObligation; occ: FirmObligationOccurrence | null; ctx: RegisterCtx;
  /** The Inactive row already shows the source line above. */
  omitSource?: boolean;
}) {
  const mine = ctx.occurrences.filter((o) => o.obligationId === ob.id);
  const history = mine.filter((o) => o.state === 'done').sort((a, b) => (b.doneOn ?? '').localeCompare(a.doneOn ?? ''));
  const ids = new Set([ob.id, ...mine.map((o) => o.id)]);
  const lines = ctx.log.filter((l) => ids.has(l.entityId)).slice().reverse();
  return (
    <div className="small" style={PANEL}>
      {occ && (isUnknownWeekend(ob, occ)
        // Under `unknown` on a weekend rule date no due date is stated at all (slice §8): the FOD-1 note stands in its place.
        ? (
          <div>
            Rule date {formatDate(ruleDate(occ))} — {FOD1_NOTE} · aim for {formatDate(targetDate(occ))} · lights {formatDate(lightsOn(ob, occ))}{/* PROVISIONAL — FOD-25's unknown-weekend shape, no due date stated (slice §8) */}
          </div>
        ) : (
          <div>
            Rule date {formatDate(ruleDate(occ))} · aim for {formatDate(targetDate(occ))} · due {formatDate(dueDate(ob, occ))} · lights {formatDate(lightsOn(ob, occ))}{/* PROVISIONAL — slice §3 item 10 (§2.3's R, T, D and the lit day) */}
          </div>
        ))}
      <div>
        Weekend: {WEEKEND_RULE_LABEL[ob.weekendRule]} · lead {ob.leadDays} days · {WEIGHT_GLYPH[ob.weight].title.toLowerCase()}{/* PROVISIONAL — slice §3 item 10 */}
      </div>
      {!omitSource && ob.sourceNote && <div><span className="muted">Source:</span> {plainText(ob.sourceNote)}</div>}{/* PROVISIONAL — slice §3 item 5 (the expander's source); slice §3 item 10 */}
      {ob.appliesIf && <div><span className="muted">Applies if:</span> {plainText(ob.appliesIf)}</div>}{/* PROVISIONAL — FOM-2 */}
      {ob.notes && <div><span className="muted">Notes:</span> {ob.notes}</div>}{/* PROVISIONAL — slice §3 item 5 (the expander's notes); slice §3 item 10 */}
      {occ && outlookConfigured && (
        <div className="muted">
          Outlook: {occ.syncStatus === 'synced' ? `in the “${OUTLOOK_FIRM_CALENDAR_NAME}” calendar` : occ.syncStatus === 'error' ? `push failed — ${occ.syncError ?? ''}` : 'queued'}{/* PROVISIONAL — DECISION 7 */}
        </div>
      )}
      {history.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <strong>History</strong>{/* PROVISIONAL — slice §3 item 5 (the history of done occurrences) */}
          {history.map((h) => (
            <div key={h.id}>
              {h.periodLabel} — {h.outcome === 'not-applicable' ? `not applicable (${REASON_LABEL[h.outcomeReason!]})` : 'done'} {formatDate(h.doneOn!)}{/* PROVISIONAL — FOD-18 (the reason); slice §3 item 10 */}
              {h.doneNote ? ` — ${h.doneNote}` : ''}{h.filedAt ? ` · proof: ${h.filedAt}` : ''}{/* PROVISIONAL — slice §3 item 10 (where the proof is, slice §3 item 5) */}
            </div>
          ))}
        </div>
      )}
      {lines.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <strong>Review log</strong>{/* PROVISIONAL — FOD-6 */}
          {lines.map((l) => (
            <div key={l.id} className="muted">{new Date(l.timestamp).toLocaleString()} · {logActionLabel(l.action)} · {l.reason ?? ''}</div>
          ))}{/* PROVISIONAL — FOD-6 */}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------ the catalog

function Catalog({ obligations, acts, busy, onBusy, onActivate, onCustom, onAddInactive }: {
  obligations: FirmObligation[];
  acts: Acts;
  /** An act on the add panel is running (PAGE-3): nothing here starts another act or
   *  swaps the panel from under it. */
  busy: boolean;
  onBusy: (on: boolean) => void;
  onActivate: (t: FirmObligationTemplate) => void;
  onCustom: () => void;
  onAddInactive: (t: FirmObligationTemplate) => Promise<string>;
}) {
  const added = new Set(obligations.map((o) => o.templateKey).filter(Boolean));
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3>Add obligation</h3>{/* PROVISIONAL — slice §3 items 5, 10 */}
        <button className="btn small secondary" disabled={busy} onClick={onCustom}>Custom obligation</button>{/* PROVISIONAL — slice §3 items 5, 10 */}
      </div>
      <div className="small muted" style={{ marginBottom: 6 }}>
        Nothing here is active until you activate it with your own date.{/* PROVISIONAL — FOD-9 */}
      </div>
      {FIRM_OBLIGATION_TEMPLATES.map((t) => (
        <CatalogRow key={t.key} t={t} added={added.has(t.key)} acts={acts} busy={busy} onBusy={onBusy}
          onActivate={() => onActivate(t)} onAddInactive={() => onAddInactive(t)} />
      ))}
    </div>
  );
}

function CatalogRow({ t, added, acts, busy, onBusy, onActivate, onAddInactive }: {
  t: FirmObligationTemplate;
  added: boolean;
  acts: Acts;
  busy: boolean;
  onBusy: (on: boolean) => void;
  onActivate: () => void;
  onAddInactive: () => Promise<string>;
}) {
  // "Add as inactive" is an act on this row: its error shows here, not at the top. It
  // reports to the add panel, whose `busy` holds every button in the catalog (PAGE-3).
  const addInactive = useAct(acts, onBusy);
  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <strong>{plainText(t.name)}</strong>
        {t.suggestedAtGoLive && <span className="badge status">suggested</span>}{/* PROVISIONAL — DECISION 9B mark; activates nothing */}
        {added && <span className="small muted">already added</span>}{/* PROVISIONAL — slice §3 item 10 */}
        <span className="small muted">{CATEGORY_LABEL[t.category]}</span>
      </div>
      <div className="small">{plainText(t.kindAnchorText)}</div>
      <div className="small muted">Lead {plainText(t.leadText)} · weight {plainText(t.weightText)}</div>{/* PROVISIONAL — slice §3 item 10 (the labels; the cells are SPEC §7's) */}
      <div className="small"><span className="muted">Source:</span> {plainText(t.sourceNote)}</div>{/* PROVISIONAL — slice §3 item 5 (its source string); slice §3 item 10 */}
      {t.appliesIf && <div className="small"><span className="muted">Applies if:</span> {plainText(t.appliesIf)}</div>}{/* PROVISIONAL — FOM-2 */}
      {t.conditionalPerPeriod && <div className="small muted">Can lapse per period</div>}{/* PROVISIONAL — FOM-2 */}
      {t.catalogNote && <div className="small muted">{plainText(t.catalogNote)}</div>}
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <button className="btn small" disabled={busy} onClick={onActivate}>Activate…</button>{/* PROVISIONAL — FOD-30; slice §3 item 5 */}
        {t.createdInactive && (
          <button className="btn small secondary" disabled={busy} onClick={() => addInactive.act(onAddInactive)}>Add as inactive</button> /* PROVISIONAL — FOM-5 */
        )}
      </div>
      <ActError text={addInactive.error} />
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
        Outlook is not configured — firm obligations queue here and push once it is (docs/outlook-setup.md).{/* PROVISIONAL — DECISION 7 */}
      </div>
    );
  }

  const push = async (connect: boolean) => {
    setBusy(true);
    try {
      if (connect) setAccount(await signIn());
      const { synced, failed } = await syncAllPending(db);
      setNote(`Pushed ${synced}${failed ? `, ${failed} failed` : ''}.`); // PROVISIONAL — DECISION 7
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
      {!account && <button className="btn small secondary" onClick={() => push(true)} disabled={busy}>Connect Outlook</button>}{/* PROVISIONAL — DECISION 7 */}
      {account && <button className="btn small secondary" onClick={() => push(false)} disabled={busy}>Sync now</button>}{/* PROVISIONAL — DECISION 7 */}
      {note && <span className="muted">{note}</span>}
    </div>
  );
}
