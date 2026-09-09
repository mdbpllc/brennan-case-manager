/* firm-obligations mock — DOMAIN LOGIC (spec: docs/specs/firm-obligations-module-spec.md §3–§4 at HEAD 8f7467b)
   Pure functions over naive local YYYY-MM-DD dates (FOD-3). No timers, no clock reads: `today` is always an argument.
   Every behaviour here is the spec AS WRITTEN unless a FOM- switch in `opts` selects a PROPOSED alternative
   (the companion doc names each). Runs in the browser and under node (see test/domain.test.js).
   Revised 2026-09-08 after the adversarial audit: undo gated on FOD-7's own condition and on the occurrence a close
   materialized; retire never hides a lit occurrence (FOD-8); FOD-1's weekend exemption; one-time retires itself;
   the card's horizon; quarterly labels by the rule's own order; interval kinds never serial. */
(function (root) {
  'use strict';
  var DAY = 86400000;
  function parseD(s) { var p = s.split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); }
  function fmtD(ms) { return new Date(ms).toISOString().slice(0, 10); }
  function addDays(s, n) { return fmtD(parseD(s) + n * DAY); }
  function daysBetween(a, b) { return Math.round((parseD(b) - parseD(a)) / DAY); }
  function ymd(s) { var p = s.split('-').map(Number); return { y: p[0], m: p[1], d: p[2] }; }
  function lastDay(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }            // m is 1-based
  function mk(y, m, d) { return fmtD(Date.UTC(y, m - 1, Math.min(d, lastDay(y, m)))); }  // clamps Feb 29 etc.
  function dow(s) { return new Date(parseD(s)).getUTCDay(); }                              // 0 = Sunday
  function cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
  function isDate(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(parseD(s)); }
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  function fmtLong(s) { var p = ymd(s); return DOW[dow(s)] + ' ' + MON[p.m - 1] + ' ' + p.d + ', ' + p.y; }
  function fmtShort(s) { var p = ymd(s); return MON[p.m - 1] + ' ' + p.d; }
  function fmtMonth(s) { var p = ymd(s); return MON[p.m - 1] + ' ' + p.y; }

  /* ---------- period labels (§3.3 `periodLabel` — "derived from the rule") ---------- */
  function quarterLabel(ob, due) { // by the RULE'S OWN list order: the i-th date in the list is "Q<i>"; a date that wraps into January belongs to the prior year
    var p = ymd(due), dates = ob.rule.dates, first = dates[0];
    for (var i = 0; i < dates.length; i++) {
      if (dates[i].month === p.m && dates[i].day === p.d) {
        var wrapped = dates[i].month < first.month || (dates[i].month === first.month && dates[i].day < first.day);
        return (wrapped ? p.y - 1 : p.y) + ' Q' + (i + 1);
      }
    }
    return String(p.y);
  }
  function periodLabel(ob, due) {
    var p = ymd(due), st = ob.periodStyle || defaultPeriodStyle(ob);
    switch (st) {
      case 'year': return String(p.y);
      case 'prior-year': return String(p.y - 1) + (ob.periodSuffix || '');
      case 'span': return p.y + '–' + String(p.y + (ob.rule.everyYears || 1)).slice(ob.rule.everyYears > 1 ? 0 : 2);
      case 'month': return p.y + '-' + String(p.m).padStart(2, '0');
      case 'quarter': return quarterLabel(ob, due);
      case 'due': return 'by ' + due;
      default: return String(p.y);
    }
  }
  function defaultPeriodStyle(ob) {
    switch (ob.kind) {
      case 'fixed-annual': return 'year';
      case 'fixed-quarterly': return 'quarter';
      case 'fixed-monthly': return 'month';
      case 'anniversary': return 'span';
      case 'interval-from-completion': return 'due';   // FOM-7: the spec gives no label for interval kinds
      case 'one-time': return 'year';
    }
    return 'year';
  }

  /* ---------- rule evaluation (§3.2) ---------- */
  // The first rule date strictly AFTER `after`, or on/after when `inclusive`.
  function nextRuleDate(ob, after, inclusive) {
    var r = ob.rule, a = ymd(after), c;
    switch (ob.kind) {
      case 'fixed-annual':
        c = mk(a.y, r.month, r.day);
        if (cmp(c, after) > 0 || (inclusive && c === after)) return c;
        return mk(a.y + 1, r.month, r.day);
      case 'fixed-quarterly': {
        var cands = [];
        for (var yy = a.y; yy <= a.y + 1; yy++) r.dates.forEach(function (dt) { cands.push(mk(yy, dt.month, dt.day)); });
        cands.sort();
        for (var i = 0; i < cands.length; i++) if (cmp(cands[i], after) > 0 || (inclusive && cands[i] === after)) return cands[i];
        return cands[cands.length - 1];
      }
      case 'fixed-monthly':
        c = mk(a.y, a.m, r.day);
        if (cmp(c, after) > 0 || (inclusive && c === after)) return c;
        return a.m === 12 ? mk(a.y + 1, 1, r.day) : mk(a.y, a.m + 1, r.day);
      case 'anniversary': {
        var an = ymd(r.anchorDate), step = r.everyYears || 1, y = an.y;
        c = mk(y, an.m, an.d);
        while (!(cmp(c, after) > 0 || (inclusive && c === after))) { y += step; c = mk(y, an.m, an.d); }
        return c;
      }
      case 'interval-from-completion':
        return addDays(after, r.days);
      case 'one-time':
        return r.dueOn || null;
    }
    return null;
  }
  function nextPeriodDate(ob, prevDue) { return nextRuleDate(ob, prevDue, false); }
  function isCadence(ob) { return ob.kind === 'fixed-monthly' || ob.kind === 'interval-from-completion'; }

  /* ---------- occurrences (§3.3) ---------- */
  var seq = 0;
  function newOccurrence(ob, due, precisionMonth) {
    var eff = due;
    if (precisionMonth) { var p = ymd(due); eff = mk(p.y, p.m, lastDay(p.y, p.m)); } // FOD-17: falls due on the last day
    return { id: ob.id + '#' + (++seq), obligationId: ob.id, periodLabel: periodLabel(ob, due), dueOn: eff,
      dueOnOverride: null, state: 'open', doneOn: null, outcome: null, outcomeReason: null, doneNote: null,
      filedAt: null, externalRef: null, delegatedTo: null, nextId: null, outlookEventId: null, syncStatus: 'pending', touched: false };
  }
  function effectiveDue(oc) { return oc.dueOnOverride || oc.dueOn; }

  // First occurrence on activation. Spec §4.1 states the anniversary case ("the first due date on or after today") and
  // FOD-16 the interval case; for the fixed kinds the spec is silent and "on or after today" is this mock's DEFAULT.
  // FOM-4 (PROPOSED): a serial kind may take a "last period completed" date, from which the first occurrence is the period after it.
  function firstOccurrence(ob, today, opts) {
    var pm = ob.precision === 'month';
    switch (ob.kind) {
      case 'interval-from-completion':
        return newOccurrence(ob, ob.lastDone ? addDays(ob.lastDone, ob.rule.days) : today, false);   // FOD-16
      case 'one-time':
        return ob.rule.dueOn ? newOccurrence(ob, ob.rule.dueOn, pm) : null;
      default:
        if (ob.lastPeriodDue && opts && opts.fomActivationLastCompleted) return newOccurrence(ob, nextPeriodDate(ob, ob.lastPeriodDue), pm);
        return newOccurrence(ob, nextRuleDate(ob, today, true), pm);
    }
  }

  // Derived states (§3.3: `state` is only open|done; lit/overdue/pending are computed, §4.3).
  function litFrom(ob, oc, opts) {
    var eff = effectiveDue(oc), byLead = addDays(eff, -(ob.leadDays || 0));
    if (ob.precision === 'month' && !oc.dueOnOverride) {
      var p = ymd(eff), first = mk(p.y, p.m, 1);
      if (opts && opts.fomPrecisionEarlier) return cmp(byLead, first) < 0 ? byLead : first;  // FOM-6: the earlier of the two
      return first;                                                                          // FOD-17 as written: lights on the 1st
    }
    return byLead;
  }
  // FOD-1: "no 'overdue' label printed on the weekend after a Saturday date" — the exemption covers the weekend the due date
  // falls in (a Saturday's Sunday; a Sunday itself); from Monday the label prints, which is FOM-12's point.
  function weekendHold(eff, today) {
    var d = dow(eff); if (d !== 6 && d !== 0) return false;
    var weekendEnd = d === 6 ? addDays(eff, 1) : eff;
    return cmp(today, eff) > 0 && cmp(today, weekendEnd) <= 0;
  }
  function status(ob, oc, today, opts) {
    if (oc.state === 'done') return 'done';
    var eff = effectiveDue(oc);
    if (cmp(today, eff) > 0 && !weekendHold(eff, today)) return 'overdue';
    if (cmp(today, litFrom(ob, oc, opts)) >= 0) return 'lit';
    return 'pending';
  }
  function daysTo(oc, today) { return daysBetween(today, effectiveDue(oc)); }

  /* ---------- the closes (§4.2), materialization of the next (§4.1) ---------- */
  function materializeNext(ob, closed, completionDate, opts) {
    if (ob.kind === 'one-time') return null;                       // retires itself when done (§3.2) — the caller flips `active`
    if (ob.active === false) return null;                          // FOD-8: retired → no next materializes (the closed one was the last)
    var pm = ob.precision === 'month', mp = isCadence(ob) ? (ob.kind === 'interval-from-completion' ? 'collapse' : (ob.missedPeriods || 'collapse')) : (ob.missedPeriods || 'serial'), due;
    if (ob.kind === 'interval-from-completion') due = addDays(completionDate, ob.rule.days);            // collapse by construction (§3.2)
    else if (mp === 'serial') due = nextPeriodDate(ob, closed.dueOn);                                      // the next PERIOD, even if already past (§4.1)
    else if (opts && opts.fomCollapsePeriod) {
      // FOM-1 (PROPOSED), two limbs: a cadence completion closes the PERIOD it falls in (next = first rule date in a later period);
      // a dated kind under collapse never re-materializes its own date (next = first rule date after max(closed due, completion)).
      if (ob.kind === 'fixed-monthly') { var c = ymd(completionDate), endOfClosed = mk(c.y, c.m, lastDay(c.y, c.m)); due = nextRuleDate(ob, endOfClosed, false); }
      else due = nextRuleDate(ob, cmp(completionDate, closed.dueOn) > 0 ? completionDate : closed.dueOn, false);
    } else due = nextRuleDate(ob, completionDate, false);            // spec as written: "the first rule date AFTER the completion date"
    return newOccurrence(ob, due, pm);
  }
  function defaultMissed(ob) { return isCadence(ob) ? 'collapse' : 'serial'; }

  // Mark done → { closed, next, retiresObligation, log }. Never mutates other rows.
  function markDone(ob, oc, input, opts) {
    if (oc.state !== 'open') throw new Error('only an open occurrence can be closed');
    var doneOn = input.doneOn || input.today;
    oc.state = 'done'; oc.doneOn = doneOn; oc.outcome = 'completed';
    oc.doneNote = input.doneNote || null; oc.filedAt = input.filedAt || null; oc.externalRef = input.externalRef || null;
    oc.delegatedTo = null; oc.touched = true;
    var next = materializeNext(ob, oc, doneOn, opts); oc.nextId = next ? next.id : null;
    return { closed: oc, next: next, retiresObligation: ob.kind === 'one-time', log: { entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'done', at: input.today, note: 'Done ' + doneOn + (oc.doneNote ? ' — ' + oc.doneNote : '') } };
  }
  // Not applicable this period — ONLY on conditionalPerPeriod obligations, reason REQUIRED (§4.2, FOD-18).
  function markNotApplicable(ob, oc, input, opts) {
    if (!ob.conditionalPerPeriod) throw new Error('not-applicable is not offered on this obligation (FOD-18)');
    if (!input.outcomeReason) throw new Error('outcomeReason is required');
    if (input.outcomeReason !== 'condition-not-met' && input.outcomeReason !== 'performed-elsewhere') throw new Error('unknown outcomeReason');
    var doneOn = input.doneOn || input.today;
    oc.state = 'done'; oc.doneOn = doneOn; oc.outcome = 'not-applicable'; oc.outcomeReason = input.outcomeReason;
    oc.doneNote = input.doneNote || null; oc.delegatedTo = null; oc.touched = true;
    var next = materializeNext(ob, oc, doneOn, opts); oc.nextId = next ? next.id : null;
    return { closed: oc, next: next, retiresObligation: ob.kind === 'one-time', log: { entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'not-applicable', at: input.today, note: 'Not applicable (' + input.outcomeReason + ')' + (oc.doneNote ? ' — ' + oc.doneNote : '') } };
  }
  // Undo (§4.2, FOD-7): allowed ONLY while the occurrence this close materialized is still untouched; it deletes that
  // occurrence and reopens this one. `next` must be the occurrence recorded at the close (`nextId`).
  function canUndo(oc, next, otherOpenExists) {
    if (oc.state !== 'done') return false;
    if (oc.nextId == null) return !next && !otherOpenExists;                     // a one-time or a retired row materialized nothing: undoable only while the obligation has NO open occurrence (FOD-5)
    return !!next && next.id === oc.nextId && next.state === 'open' && !next.touched && !next.dueOnOverride;
  }
  function undo(ob, oc, next, today, otherOpenExists) {
    if (!canUndo(oc, next, otherOpenExists)) throw new Error('undo is allowed only while the next occurrence is untouched and no other occurrence is open (FOD-7, FOD-5)');
    var deletedNext = !!next;
    oc.state = 'open'; oc.doneOn = null; oc.outcome = null; oc.outcomeReason = null; oc.doneNote = null; oc.filedAt = null; oc.externalRef = null; oc.nextId = null; oc.touched = true;
    return { reopened: oc, deletedNext: deletedNext, log: { entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'undone', at: today, note: 'Reopened' + (deletedNext ? '; the untouched next occurrence deleted' : '') } };
  }
  // An override / edit re-evaluates the OPEN occurrence and never moves an OVERDUE one later (FOD-4).
  function applyOverride(ob, oc, newDate, today) {
    if (oc.state !== 'open') throw new Error('only an open occurrence takes an override');
    if (!isDate(newDate)) return { applied: false, reason: 'a date is required' };
    var was = effectiveDue(oc);
    if (cmp(today, was) > 0 && cmp(newDate, was) > 0) return { applied: false, reason: 'never-later-when-overdue (FOD-4)' };
    oc.dueOnOverride = newDate; oc.touched = true;
    return { applied: true, log: { entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'edited', at: today, note: 'Due date set to ' + newDate + ' (was ' + was + ')' } };
  }

  /* ---------- the surfaces (§5) ---------- */
  // The dashboard card (FOD-14, FOD-11). Rendered default: overdue, or LIT and due within `horizonDays` — the reading on which
  // "nothing lit or overdue → the card renders NOTHING" (§4.3) holds. opts.cardWindowRegardlessOfLead renders FOD-14 literally
  // (due within 14 days even when the lead has not lit it) — the two sentences disagree; FOM-13.
  // Retired obligations' OPEN occurrences stay (FOD-8): only obligations with no open occurrence drop out.
  function cardItems(obs, occs, today, opts) {
    var horizon = (opts && opts.cardHorizonDays) || 14, out = [];
    occs.forEach(function (oc) {
      if (oc.state !== 'open') return;
      var ob = obs[oc.obligationId]; if (!ob) return;
      if (!(opts && opts.cardBothWeights) && ob.weight !== 'hard' && !(opts && opts.oneWeightClass)) return;
      var d = daysTo(oc, today), st = status(ob, oc, today, opts);
      var within = d <= horizon && (st === 'lit' || (d >= 0 && opts && opts.cardWindowRegardlessOfLead));   // a lit item with d < 0 is a weekend hold (FOD-1) and stays current
      if (st === 'overdue' || within) out.push({ oc: oc, ob: ob, days: d, status: st });
    });
    return sortForDisplay(out, opts);
  }
  // Display order: signed days ascending (the most overdue first, then the soonest due); weight breaks ties only (§4.4).
  function sortForDisplay(items, opts) {
    return items.sort(function (a, b) {
      if (a.days !== b.days) return a.days - b.days;
      if (!(opts && opts.oneWeightClass) && a.ob.weight !== b.ob.weight) return a.ob.weight === 'hard' ? -1 : 1;
      return cmp(a.ob.name, b.ob.name);
    });
  }
  // The register (§5.2): Overdue pinned, twelve month groups current-month-first, then Later (FOM-3). Every OPEN occurrence
  // renders (§5.2's "every active obligation's next occurrence"), retired ones included while open (FOD-8).
  function registerGroups(obs, occs, today, opts) {
    var overdue = [], months = {}, later = [], t = ymd(today), order = [];
    for (var i = 0; i < 12; i++) { var m = ((t.m - 1 + i) % 12) + 1, y = t.y + Math.floor((t.m - 1 + i) / 12); var key = y + '-' + String(m).padStart(2, '0'); order.push(key); months[key] = []; }
    occs.forEach(function (oc) {
      if (oc.state !== 'open') return;
      var ob = obs[oc.obligationId]; if (!ob) return;
      var item = { oc: oc, ob: ob, days: daysTo(oc, today), status: status(ob, oc, today, opts) };
      if (item.status === 'overdue') { overdue.push(item); return; }
      var key = effectiveDue(oc).slice(0, 7);
      if (months[key]) months[key].push(item); else if (cmp(key, order[0]) < 0) months[order[0]].push(item); /* a weekend hold from the month just ended stays current */ else later.push(item);
    });
    return { overdue: sortForDisplay(overdue, opts), months: order.map(function (k) { return { key: k, label: fmtMonth(k + '-01'), items: sortForDisplay(months[k], opts) }; }), later: sortForDisplay(later, opts) };
  }
  function weekendNote(due) { var d = dow(due); return (d === 0 || d === 6) ? 'a next-business-day rule may apply; not computed' : null; }

  /* ---------- the Outlook projection (§5.3) ---------- */
  // mode: 'event-separate' | 'todo' | 'event-same-category' | 'none' | 'both'. The reminder fires at the LIT moment (the same
  // computation the register uses, FOM-6 included), so the two surfaces never disagree. `word` is DECISION 0's word.
  function outlookItems(obs, occs, mode, opts, word) {
    var out = [], w = word || 'Firm obligation';
    var singular = /ies$/.test(w) ? w.slice(0, -3) + 'y' : /s$/.test(w) ? w.slice(0, -1) : w;
    if (mode === 'none') return out;
    occs.forEach(function (oc) {
      var ob = obs[oc.obligationId]; if (!ob) return;
      if (oc.state !== 'open' && !oc.touched) return;                       // fixture history predates the module and was never pushed
      var due = effectiveDue(oc), done = oc.state === 'done';
      var subj = singular + ': ' + ob.name + ' (' + oc.periodLabel + ')';
      var body = singular + ' — no matter' + (ob.precision === 'month' && !oc.dueOnOverride ? ' · the day is not known until the statement arrives' : '');
      var remAt = litFrom(ob, oc, opts);
      if (mode === 'event-separate' || mode === 'event-same-category' || mode === 'both') {
        out.push({ kind: 'event', calendar: mode === 'event-same-category' ? 'MDBP Cases' : 'MDBP Firm', category: 'MDBP Firm', subject: (done ? 'Done — ' : '') + subj,
          date: due, allDay: true, reminderOn: !done, reminderAt: remAt, leadDays: daysBetween(remAt, due), body: body, prop: 'FIRM|' + ob.id + '|' + oc.id, done: done, oc: oc, ob: ob });
      }
      if (mode === 'todo' || mode === 'both') {
        out.push({ kind: 'todo', list: 'MDBP Firm', subject: subj, date: due, reminderAt: remAt, leadDays: daysBetween(remAt, due), done: done, completedOn: done ? oc.doneOn : null, oc: oc, ob: ob });
      }
    });
    return out.sort(function (a, b) { return cmp(a.date, b.date) || cmp(a.subject, b.subject); });
  }

  root.FO = { parseD: parseD, fmtD: fmtD, addDays: addDays, daysBetween: daysBetween, ymd: ymd, lastDay: lastDay, mk: mk, dow: dow, cmp: cmp, isDate: isDate,
    fmtLong: fmtLong, fmtShort: fmtShort, fmtMonth: fmtMonth, MON: MON, DOW: DOW,
    periodLabel: periodLabel, nextRuleDate: nextRuleDate, nextPeriodDate: nextPeriodDate, isCadence: isCadence, newOccurrence: newOccurrence, effectiveDue: effectiveDue,
    firstOccurrence: firstOccurrence, litFrom: litFrom, weekendHold: weekendHold, status: status, daysTo: daysTo, materializeNext: materializeNext, defaultMissed: defaultMissed,
    markDone: markDone, markNotApplicable: markNotApplicable, canUndo: canUndo, undo: undo, applyOverride: applyOverride,
    cardItems: cardItems, registerGroups: registerGroups, weekendNote: weekendNote, outlookItems: outlookItems };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
