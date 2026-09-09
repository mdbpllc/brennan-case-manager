// node test/domain.test.js — pins the mock's domain logic to the spec's stated behaviours (and the FOM- alternatives).
require('../src/domain.js'); require('../src/fixture.js');
const FO = globalThis.FO, FX = globalThis.FO_FIXTURE;
let n = 0, failed = 0;
function eq(a, b, msg) { n++; const ok = JSON.stringify(a) === JSON.stringify(b); if (!ok) { failed++; console.log('FAIL', msg, '\n   got', JSON.stringify(a), '\n   want', JSON.stringify(b)); } else console.log('ok  ', msg); }
function throws(fn, msg) { n++; try { fn(); failed++; console.log('FAIL (no throw)', msg); } catch (e) { console.log('ok  ', msg, '→', e.message); } }
function openOf(st, id) { return st.occurrences.filter(o => o.obligationId === id && o.state === 'open'); }

// --- fixture A at its own today
let st = FX.buildFixture('backlog'); const T = st.today; const obs = st.obligations;
eq(T, '2026-10-02', 'fixture A today');
// one-open invariant holds at load for every activated obligation
st.order.filter(id => obs[id].activatedInFixture).forEach(id => eq(openOf(st, id).length, 1, 'one open occurrence at load: ' + id));

// statuses
const S = id => FO.status(obs[id], openOf(st, id)[0], T);
eq(S('FOT-4'), 'overdue', 'TIDC 2025 report overdue'); eq(FO.daysTo(openOf(st,'FOT-4')[0], T), -352, 'TIDC 352 days overdue');
eq(S('FOT-6'), 'overdue', 'trust reconciliation Sept overdue'); eq(S('FOT-2'), 'lit', 'MCLE lit (59 days, lead 90)');
eq(S('FOT-19'), 'lit', 'malpractice lit (49 days, lead 60)'); eq(S('FOT-27'), 'lit', 'domain lit (44 days, lead 60)');
eq(S('FOT-14'), 'pending', '941 Q3 pending (29 days, lead 14)'); eq(S('FOT-22'), 'lit', 'doc restore lit (7 days, lead 14)');
eq(S('FOT-23'), 'overdue', 'db restore never run → overdue'); eq(S('FOT-24'), 'overdue', 'heartbeat Oct 1 overdue by 1');
eq(S('FOT-1'), 'pending', 'bar dues 2027 pending');
eq(openOf(st,'FOT-1')[0].dueOn, '2027-06-30', 'precision month → due on the last day (FOD-17)');
eq(FO.litFrom(obs['FOT-1'], openOf(st,'FOT-1')[0]), '2027-06-01', 'precision month lights on the 1st (spec as written)');
eq(FO.litFrom(obs['FOT-1'], openOf(st,'FOT-1')[0], { fomPrecisionEarlier: true }), '2027-05-16', 'FOM-6: the earlier of the 1st and due−lead (45)');
eq(openOf(st,'FOT-1')[0].periodLabel, '2027–28', 'membership-year span label');
eq(openOf(st,'FOT-14')[0].periodLabel, '2026 Q3', '941 due Oct 31 covers Q3');
eq(openOf(st,'FOT-13')[0].periodLabel, '2026 wages', 'W-2 due Jan 31 2027 covers 2026 wages');
eq(FO.weekendNote('2027-01-31'), 'a next-business-day rule may apply; not computed', 'FOD-1: Sunday due date carries the note');
eq(FO.weekendNote('2026-10-15'), null, 'a Thursday carries no note');

// card (FOD-14 / FOD-11): hard only, overdue + ≤14 days
let card = FO.cardItems(obs, st.occurrences, T);
eq(card.map(i => i.ob.id), ['FOT-4', 'FOT-6'], 'card at Oct 2: the two hard overdue items only');
eq(FO.cardItems(obs, st.occurrences, T, { cardBothWeights: true }).map(i => i.ob.id), ['FOT-4','FOT-23','FOT-6','FOT-24','FOT-22'], 'DECISION 6 option 2: routine items join the card, sorted by proximity then weight');
eq(FO.cardItems(obs, st.occurrences, '2026-10-20').map(i => i.ob.id), ['FOT-4','FOT-6','FOT-14'], 'at Oct 20 the 941 (11 days) joins the card');

// register grouping
let g = FO.registerGroups(obs, st.occurrences, T);
eq(g.overdue.map(i => i.ob.id), ['FOT-4','FOT-23','FOT-6','FOT-24'], 'Overdue pin: most-overdue first; weight breaks ties only at equal proximity (§4.4)');
eq(g.months[0].label, 'Oct 2026', 'current month first'); eq(g.months[11].label, 'Sep 2027', 'twelve months');
eq(g.later.map(i => i.ob.id), ['FOT-21','FOT-12'], 'beyond twelve months → Later');
eq(g.months.find(m => m.key === '2027-01').items.map(i => i.ob.id), ['FOT-31','FOT-17','FOT-13','FOT-11'], 'the January pile-up (Jan 1, then the three Jan 31 rows by name)');

// SERIAL: TIDC 2025 done today → 2026 materializes, due Oct 15 2026 (already inside the lead → lit)
let r = FO.markDone(obs['FOT-4'], openOf(st,'FOT-4')[0], { today: T, doneNote: 'submitted' });
eq(r.next.dueOn, '2026-10-15', 'serial: the next PERIOD materializes on done'); eq(r.next.periodLabel, '2026', 'its label');
st.occurrences.push(r.next); eq(openOf(st,'FOT-4').length, 1, 'still exactly one open');
eq(FO.status(obs['FOT-4'], r.next, T), 'lit', 'the 2026 report is lit at once (13 days, lead 30)');
// and if he is two years behind, done again → 2027 materializes with a future date
let r2 = FO.markDone(obs['FOT-4'], r.next, { today: T }); eq(r2.next.dueOn, '2027-10-15', 'serial again → 2027');
// serial on an already-past period: a 2025 W-2 style — done in 2028 for the 2026 wages → next is 2028-01-31 (past) not 2029
let w2 = FO.newOccurrence(obs['FOT-13'], '2027-01-31'); let rw = FO.markDone(obs['FOT-13'], w2, { today: '2028-06-01' });
eq(rw.next.dueOn, '2028-01-31', 'serial: a filing done late produces the next period already overdue, never skipped');

// COLLAPSE, spec as written: Sept reconciliation done Oct 2 → next Oct 5 (three days away)
st = FX.buildFixture('backlog');
let rc = FO.markDone(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], { today: T });
eq(rc.next.dueOn, '2026-10-05', 'collapse (spec literal): first rule date after the completion date — Oct 5, three days later');
eq(FO.status(st.obligations['FOT-6'], rc.next, T), 'lit', '…and it is lit at once (lead 5) — FOM-1');
// COLLAPSE, FOM-1 proposal: the completion closes its own period; next is the first rule date in a later period
st = FX.buildFixture('backlog');
let rc2 = FO.markDone(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], { today: T }, { fomCollapsePeriod: true });
eq(rc2.next.dueOn, '2026-11-05', 'collapse (FOM-1): Oct 2 completion closes October → next Nov 5');
// done inside its own month, early: Sept 3 for the Sept 5 occurrence → next Oct 5 under both readings
st = FX.buildFixture('backlog');
eq(FO.markDone(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], { today: '2026-09-03', doneOn: '2026-09-03' }).next.dueOn, '2026-09-05', 'DEFECT PINNED (FOM-1): collapse as written + early completion (FOD-15) re-materializes the SAME date — Sept 5 again');
st = FX.buildFixture('backlog');
eq(FO.markDone(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], { today: '2026-09-03', doneOn: '2026-09-03' }, { fomCollapsePeriod: true }).next.dueOn, '2026-10-05', 'collapse FOM-1, done early in-month → Oct 5 (identical)');
// heartbeat: monthly on the 1st, four periods missed → collapse never manufactures a backlog
st = FX.buildFixture('backlog');
let hb = FO.markDone(st.obligations['FOT-24'], openOf(st,'FOT-24')[0], { today: '2027-02-10' });
eq(hb.next.dueOn, '2027-03-01', 'collapse: four missed months → one next occurrence (Mar 1), no backlog');
// but under DECISION 2 option 2 (serial for everything) the same cadence steps one period at a time
st.obligations['FOT-24'].missedPeriods = 'serial'; st = FX.buildFixture('backlog'); st.obligations['FOT-24'].missedPeriods = 'serial';
let hs = FO.markDone(st.obligations['FOT-24'], openOf(st,'FOT-24')[0], { today: '2027-02-10' });
eq(hs.next.dueOn, '2026-11-01', 'DECISION 2 option 2: serial cadence → Nov 1 materializes, already overdue, one at a time');

// INTERVAL-FROM-COMPLETION
st = FX.buildFixture('backlog');
let ri = FO.markDone(st.obligations['FOT-22'], openOf(st,'FOT-22')[0], { today: '2026-10-03' });
eq(ri.next.dueOn, '2027-01-02', 'interval: next = completion + 91');
eq(FO.firstOccurrence(st.obligations['FOT-23'], '2026-09-01').dueOn, '2026-09-01', 'FOD-16: first occurrence due NOW when no last-done date');
st.obligations['FOT-23'].lastDone = '2026-08-01'; eq(FO.firstOccurrence(st.obligations['FOT-23'], '2026-09-01').dueOn, '2026-10-31', 'FOD-16: with a last-done date → last + 91');

// FOM-4: activation of a serial kind with a last-completed period
st = FX.buildFixture('backlog'); let tidc = st.obligations['FOT-4'];
eq(FO.firstOccurrence(tidc, '2026-09-01').dueOn, '2026-10-15', 'activation, spec as written: first rule date on/after today');
tidc.lastPeriodDue = '2024-10-15';
eq(FO.firstOccurrence(tidc, '2026-09-01', { fomActivationLastCompleted: true }).dueOn, '2025-10-15', 'FOM-4: with “last completed: the 2024 report” → the 2025 report materializes, already overdue');

// QUARTERLY and multi-year ANNIVERSARY
st = FX.buildFixture('backlog');
let rq = FO.markDone(st.obligations['FOT-14'], openOf(st,'FOT-14')[0], { today: '2026-10-20' });
eq([rq.next.dueOn, rq.next.periodLabel], ['2027-01-31', '2026 Q4'], 'quarterly: Oct 31 done → Jan 31 for Q4');
let rn = FO.markDone(st.obligations['FOT-21'], openOf(st,'FOT-21')[0], { today: '2028-03-01' });
eq(rn.next.dueOn, '2032-03-14', 'anniversary everyYears 4 → 2032');
let rb = FO.markDone(st.obligations['FOT-1'], openOf(st,'FOT-1')[0], { today: '2027-06-10' });
eq([rb.next.dueOn, rb.next.periodLabel], ['2028-06-30', '2028–29'], 'precision-month anniversary steps a year and lands on the last day again');

// NOT APPLICABLE: only on conditionalPerPeriod rows; reason required
st = FX.buildFixture('backlog');
throws(() => FO.markNotApplicable(st.obligations['FOT-4'], openOf(st,'FOT-4')[0], { today: T, outcomeReason: 'condition-not-met' }), 'not-applicable refused on the practice-time report (FOD-18)');
throws(() => FO.markNotApplicable(st.obligations['FOT-14'], openOf(st,'FOT-14')[0], { today: T }), 'not-applicable without a reason refused');
let na = FO.markNotApplicable(st.obligations['FOT-14'], openOf(st,'FOT-14')[0], { today: T, outcomeReason: 'condition-not-met', doneNote: 'no wages this quarter' });
eq([na.closed.outcome, na.closed.outcomeReason, na.next.dueOn], ['not-applicable', 'condition-not-met', '2027-01-31'], 'not-applicable closes the period and the next materializes');

// UNDO (FOD-7): deletes the untouched next; keeps a touched one
st = FX.buildFixture('backlog');
let d1 = FO.markDone(st.obligations['FOT-19'], openOf(st,'FOT-19')[0], { today: T });
let u1 = FO.undo(st.obligations['FOT-19'], d1.closed, d1.next, T);
eq([u1.reopened.state, u1.deletedNext], ['open', true], 'undo reopens and deletes the untouched next');
let d2 = FO.markDone(st.obligations['FOT-19'], u1.reopened, { today: T }); d2.next.dueOnOverride = '2027-12-01'; d2.next.touched = true;
eq(FO.canUndo(d2.closed, d2.next), false, 'FOD-7: undo is NOT allowed once the next occurrence was touched');
throws(() => FO.undo(st.obligations['FOT-19'], d2.closed, d2.next, T), 'undo refused when the next was touched — never two open occurrences (FOD-5)');
// undo is offered only on the close whose materialized next is the current open one
st = FX.buildFixture('backlog');
let t1 = FO.markDone(st.obligations['FOT-4'], openOf(st,'FOT-4')[0], { today: T }); st.occurrences.push(t1.next);
let t2 = FO.markDone(st.obligations['FOT-4'], t1.next, { today: T }); st.occurrences.push(t2.next);
eq([FO.canUndo(t1.closed, t2.next), FO.canUndo(t1.closed, t1.next), FO.canUndo(t2.closed, t2.next)], [false, false, true], 'only the latest close can be undone; the older one’s next is itself done');
// RETIRE never hides a lit occurrence (FOD-8)
st = FX.buildFixture('backlog'); st.obligations['FOT-4'].active = false;
eq(FO.registerGroups(st.obligations, st.occurrences, T).overdue.some(i => i.ob.id === 'FOT-4'), true, 'a retired obligation’s open occurrence stays in the Overdue pin');
eq(FO.cardItems(st.obligations, st.occurrences, T).some(i => i.ob.id === 'FOT-4'), true, '…and on the card');
// FOD-1: the weekend exemption — the 941 is due Sat Oct 31, 2026
st = FX.buildFixture('backlog');
eq(FO.status(st.obligations['FOT-14'], openOf(st,'FOT-14')[0], '2026-11-01'), 'lit', 'Sunday after a Saturday due date: lit with the note, not overdue (FOD-1)');
eq(FO.status(st.obligations['FOT-14'], openOf(st,'FOT-14')[0], '2026-11-02'), 'overdue', 'Monday: “overdue” prints (FOM-12’s point)');
// ONE-TIME retires itself
eq(FO.markDone(st.obligations['FOT-30'], openOf(st,'FOT-30')[0], { today: T }).retiresObligation, true, 'one-time done → the obligation retires itself');
// quarterly labels follow the rule’s own order (estimates: Apr 15 = Q1 … Jan 15 = Q4 of the prior year)
let est = { id: 'X', kind: 'fixed-quarterly', rule: { dates: [{ month: 4, day: 15 }, { month: 6, day: 15 }, { month: 9, day: 15 }, { month: 1, day: 15 }] } };
eq(['2026-04-15','2026-06-15','2026-09-15','2027-01-15'].map(d => FO.periodLabel(est, d)), ['2026 Q1','2026 Q2','2026 Q3','2026 Q4'], 'quarterly labels by the rule’s list order');
// the card’s horizon: conjunctive by default (FOM-13), literal on the switch
st = FX.buildFixture('current');
eq(FO.cardItems(st.obligations, st.occurrences, '2026-09-22').length, 0, 'fixture B at Sep 22: the reconciliation (13 days, lead 5) is not lit → not on the card');
eq(FO.cardItems(st.obligations, st.occurrences, '2026-09-22', { cardWindowRegardlessOfLead: true }).map(i => i.ob.id), ['FOT-6'], '…FOD-14 literally: it is');
// FOM-1 second limb: a dated kind under collapse never re-materializes its own date
st = FX.buildFixture('backlog'); st.obligations['FOT-4'].missedPeriods = 'collapse';
let o26 = FO.newOccurrence(st.obligations['FOT-4'], '2026-10-15');
eq(FO.markDone(st.obligations['FOT-4'], o26, { today: '2026-09-20', doneOn: '2026-09-20' }).next.dueOn, '2026-10-15', 'DEFECT PINNED: collapse as written + early completion on an annual row → Oct 15, 2026 again');
let o26b = FO.newOccurrence(st.obligations['FOT-4'], '2026-10-15');
eq(FO.markDone(st.obligations['FOT-4'], o26b, { today: '2026-09-20', doneOn: '2026-09-20' }, { fomCollapsePeriod: true }).next.dueOn, '2027-10-15', 'FOM-1 limb 2: never its own date → Oct 15, 2027');
// interval kinds are collapse by construction whatever missedPeriods says
st = FX.buildFixture('backlog'); st.obligations['FOT-22'].missedPeriods = 'serial';
eq(FO.markDone(st.obligations['FOT-22'], openOf(st,'FOT-22')[0], { today: '2026-11-15', doneOn: '2026-11-15' }).next.dueOn, '2027-02-14', 'interval: completion + 91 even when marked serial');
// override validation
st = FX.buildFixture('backlog');
eq(FO.applyOverride(st.obligations['FOT-19'], openOf(st,'FOT-19')[0], '', T).applied, false, 'a blank override is refused');

// NEVER LATER WHEN OVERDUE (FOD-4)
st = FX.buildFixture('backlog');
eq(FO.applyOverride(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], '2026-10-20', T).applied, false, 'an overdue occurrence cannot be moved later');
eq(FO.applyOverride(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], '2026-09-01', T).applied, true, '…but can be moved earlier (a correction)');
eq(FO.applyOverride(st.obligations['FOT-19'], openOf(st,'FOT-19')[0], '2026-12-05', T).applied, true, 'a pending/lit occurrence takes a later real date (the carrier’s invoice)');

// RETIRE (FOD-8) and ONE-TIME
st = FX.buildFixture('backlog'); st.obligations['FOT-27'].active = false;
eq(FO.markDone(st.obligations['FOT-27'], openOf(st,'FOT-27')[0], { today: T }).next, null, 'retired: the open occurrence closes and no next materializes');
eq(FO.markDone(st.obligations['FOT-30'], openOf(st,'FOT-30')[0], { today: T }).next, null, 'one-time: retires itself when done');

// OUTLOOK projection
st = FX.buildFixture('backlog');
let ev = FO.outlookItems(st.obligations, st.occurrences, 'event-separate');
eq(ev[0].calendar, 'MDBP Firm', 'separate calendar'); eq(ev.every(e => e.allDay), true, 'all-day events');
let e4 = ev.find(e => e.ob.id === 'FOT-4' && !e.done); eq([e4.subject, e4.reminderAt, e4.leadDays], ['Firm obligation: TIDC Attorney Practice Time Report (2025)', '2025-09-15', 30], 'subject, reminder at the lead window');
let e1 = ev.find(e => e.ob.id === 'FOT-1'); eq(e1.reminderAt, FO.litFrom(st.obligations['FOT-1'], e1.oc), 'precision-month row: the reminder fires at the register’s own lit moment');
eq(FO.outlookItems(st.obligations, st.occurrences, 'event-separate', null, 'Practice obligations')[0].subject.indexOf('Practice obligation:'), 0, 'DECISION 0’s word reaches the subject');
let dn = FO.markDone(st.obligations['FOT-27'], openOf(st,'FOT-27')[0], { today: T }); st.occurrences.push(dn.next);
let td = FO.outlookItems(st.obligations, st.occurrences, 'todo').find(t => t.ob.id === 'FOT-27' && t.done); eq([!!td, td && td.completedOn], [true, T], 'a done occurrence is a COMPLETED task, not an open overdue one');
eq(FO.outlookItems(st.obligations, st.occurrences, 'none').length, 0, 'option 4: nothing pushed');
eq(FO.outlookItems(st.obligations, st.occurrences, 'event-same-category')[0].calendar, 'MDBP Cases', 'option 3: same calendar');
eq(FO.outlookItems(st.obligations, st.occurrences, 'todo').every(t => t.kind === 'todo'), true, 'option 2: tasks');

// fixture B: the card renders nothing
st = FX.buildFixture('current');
eq(FO.cardItems(st.obligations, st.occurrences, st.today).length, 0, 'fixture B: nothing on the card at Sep 20');
eq(FO.registerGroups(st.obligations, st.occurrences, st.today).overdue.length, 0, 'fixture B: nothing overdue');
eq(FO.status(st.obligations['FOT-4'], openOf(st,'FOT-4')[0], st.today), 'lit', 'fixture B: TIDC lit on the register (25 days, lead 30) though absent from the card');

// RE-SWEEP fixes: a weekend-held item stays current (card + current month), never 'Later'
st = FX.buildFixture('backlog');
eq(FO.cardItems(st.obligations, st.occurrences, '2026-11-01').some(i => i.ob.id === 'FOT-14'), true, 'Sunday after a Saturday due date: the lit 941 stays on the card');
let gN = FO.registerGroups(st.obligations, st.occurrences, '2026-11-01');
eq([gN.months[0].items.some(i => i.ob.id === 'FOT-14'), gN.later.some(i => i.ob.id === 'FOT-14')], [true, false], '…and sits in the current month group, not Later');
// a close that materialized nothing is undoable only while the obligation has NO open occurrence
st = FX.buildFixture('backlog'); st.obligations['FOT-6'].active = false;
let rr = FO.markDone(st.obligations['FOT-6'], openOf(st,'FOT-6')[0], { today: T }); eq(rr.next, null, 'retired: no next');
eq(FO.canUndo(rr.closed, undefined, false), true, 'undo allowed while nothing else is open');
let reAct = FO.firstOccurrence(st.obligations['FOT-6'], T); st.occurrences.push(reAct);
eq(FO.canUndo(rr.closed, undefined, true), false, 'after a re-activation opened a new occurrence, undo is refused (FOD-5)');
throws(() => FO.undo(st.obligations['FOT-6'], rr.closed, undefined, T, true), 'undo refused: another occurrence is open');
// coverage: DECISION 6 option 3 on the card; Outlook mode both
st = FX.buildFixture('backlog');
eq(FO.cardItems(st.obligations, st.occurrences, T, { oneWeightClass: true }).map(i => i.ob.id), ['FOT-4','FOT-23','FOT-6','FOT-24','FOT-22'], 'DECISION 6 option 3: one class, date order alone');
eq(FO.outlookItems(st.obligations, st.occurrences, 'both').length, 2 * FO.outlookItems(st.obligations, st.occurrences, 'event-separate').length, 'DECISION 7 option 5: an event AND a task per occurrence');
eq(FO.outlookItems(st.obligations, st.occurrences, 'event-separate', null, 'Duties')[0].subject.indexOf('Duty:'), 0, 'a custom word singularizes safely');
// the one-open invariant after every close in this file's own sequence
st = FX.buildFixture('backlog');
['FOT-2','FOT-8','FOT-9','FOT-14','FOT-19','FOT-22','FOT-24'].forEach(id => { const r = FO.markDone(st.obligations[id], openOf(st,id)[0], { today: T }); if (r.next) st.occurrences.push(r.next); eq(openOf(st,id).length, 1, 'exactly one open after Done: ' + id); });

console.log('\n' + (n - failed) + '/' + n + ' assertions passed' + (failed ? ' — ' + failed + ' FAILED' : ''));
process.exit(failed ? 1 : 0);
