// The firm-obligations register's act plumbing: where a landed act's words go, the
// Outlook half that runs after it lands, and where a failed act's error goes. Kept out
// of FirmObligationsPage.tsx so its behaviour is tested without a DOM
// (src/components/__tests__/firmObligationsSurfaces.test.ts).
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 items 5, 7 and 10; DECISION 7
// (the Outlook push). Every sentence here is a PROVISIONAL TEXT ACT, marked on its own
// line with its cite; Michael rules the wording at THE FIRM-OBLIGATIONS HANDS-ON SITTING.

import type { FirmObligation, FirmObligationOccurrence } from '../domain/firmObligations';

/** A message at the top of the register. 'warn': the act LANDED, but something after it
 *  did not go through — an Outlook push, or an Outlook event Undo could not delete. */
export interface Notice { tone: 'ok' | 'warn' | 'bad'; text: string }

export function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

// ------------------------------------------------------------ the Outlook half of an act

/** What deleting the Outlook event of an occurrence Undo removed came to. */
export type RemoveResult = 'deleted' | 'not-connected' | 'failed';

/** The real pushes, lent by the page: syncFirmOccurrence and removeFirmOccurrenceFromOutlook. */
export interface OutlookDeps {
  sync: (occ: FirmObligationOccurrence, ob: FirmObligation) => Promise<FirmObligationOccurrence>;
  remove: (outlookEventId: string) => Promise<RemoveResult>;
}

/**
 * The Outlook half of ONE act, handed to it by the page's run(). An act reaches it only
 * AFTER its adapter write has resolved — the act has LANDED by then — and nothing in it
 * ever fails the act. A push that throws (syncFirmOccurrence rethrows when writing its
 * own error back fails) or comes back 'error' is kept, and the act says it was saved
 * but not pushed. The row stays queued; "Sync now" retries it.
 */
export interface OutlookPushes {
  /** Push one occurrence to Outlook. */
  sync(occ: FirmObligationOccurrence, ob: FirmObligation): Promise<void>;
  /** Delete the Outlook event of an occurrence Undo removed. A throw comes back 'failed'. */
  remove(outlookEventId: string): Promise<RemoveResult>;
  /** A landed act's warning that is not a failed push: the event Undo could not delete. */
  warn(text: string): void;
}

/** One act's collector. run() hands the act the OutlookPushes half and, once the act has
 *  resolved to its success sentence, asks `notice` what the top of the page says. */
export function outlookPushes(deps: OutlookDeps): OutlookPushes & { notice(text: string): Notice } {
  const failures: string[] = [];
  const warnings: string[] = [];
  return {
    async sync(occ, ob) {
      try {
        const pushed = await deps.sync(occ, ob);
        if (pushed.syncStatus === 'error') failures.push(pushed.syncError || 'the push failed'); // PROVISIONAL — DECISION 7
      } catch (e) {
        failures.push(msg(e));
      }
    },
    async remove(outlookEventId) {
      try {
        return await deps.remove(outlookEventId);
      } catch {
        return 'failed';
      }
    },
    warn(text) {
      warnings.push(text);
    },
    notice(text) {
      return landedNotice(text, failures, warnings);
    },
  };
}

/** What a LANDED act says at the top of the page: its success sentence; when a push after
 *  it failed, that sentence "— saved, but not pushed to Outlook: <why>"; then any other
 *  warning. Either kind makes the notice a warning, never a success. */
export function landedNotice(text: string, failures: readonly string[], warnings: readonly string[]): Notice {
  const why = [...new Set(failures)].join('; ');
  const head = why
    ? sentence(`${text.replace(/\.$/, '')} — saved, but not pushed to Outlook: ${why}`) // PROVISIONAL — DECISION 7
    : text;
  const warned = why !== '' || warnings.length > 0;
  return { tone: warned ? 'warn' : 'ok', text: [head, ...warnings].join(' ') };
}

/** Ends a clause with a full stop unless it has one, so a warning after it reads apart. */
function sentence(s: string): string {
  return /[.!?]$/.test(s) ? s : `${s}.`;
}

// ------------------------------------------------------------ where a failed act's error goes

/**
 * Where a failed act's error goes (review L5-05): to the row or form that started the
 * act while that row or form is there, else to the top of the page. It can be gone two
 * ways. Before run() returns: the act closed its form as it landed, then failed. Or in
 * the very render that would have shown the error: run() reloads the register before it
 * returns, React commits that reload only AFTER run() has returned, and the reload can
 * remove the row. So an error handed to the row or form is held as unshown until it
 * commits (`shown`); an unmount that finds it still unshown says it at the top.
 */
export interface ErrorRoute {
  /** An act failed with this error. */
  failed(text: string): void;
  /** The row or form committed its error: it is on screen. */
  shown(): void;
  /** Effect body and cleanup: whether the row or form is still there. */
  mounted(): void;
  unmounted(): void;
}

export function errorRoute(show: (text: string) => void, notify: (text: string) => void): ErrorRoute {
  let mounted = true;
  let unshown = '';
  return {
    failed(text) {
      if (mounted) {
        unshown = text;
        show(text);
      } else {
        notify(text);
      }
    },
    shown() {
      unshown = '';
    },
    mounted() {
      mounted = true;
    },
    unmounted() {
      mounted = false;
      if (unshown) notify(unshown);
      unshown = '';
    },
  };
}
