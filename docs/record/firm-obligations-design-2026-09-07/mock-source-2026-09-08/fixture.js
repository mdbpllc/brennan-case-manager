/* firm-obligations mock — FIXTURE. A FICTIONAL firm's register. Every date, every "firm fact" (payroll, a lease, a
   notary commission, which counties) is INVENTED for the example and asserts nothing about Michael D. Brennan, PLLC.
   Template names, kinds, leads, weights and source strings are copied from the spec's §7 catalog (FOT- rows) at HEAD
   8f7467b; the `sourceNote` strings are the spec's own cite-and-status strings and characterize nothing new. */
(function (root) {
  'use strict';
  var FO = root.FO;

  function ob(o) { // fill the spec's defaults (§3.1, §12)
    o.leadDays = o.leadDays == null ? 30 : o.leadDays;                       // FOD-2
    o.missedPeriods = o.missedPeriods || FO.defaultMissed(o);                  // §3.2 defaults
    o.ownerScope = o.ownerScope || 'firm';
    o.active = o.active !== false;
    o.conditionalPerPeriod = !!o.conditionalPerPeriod;
    o.weight = o.weight || 'hard';
    return o;
  }

  // The catalog as the register OFFERS it (spec §7; the DECISION 9 Part B table on the sheet). `fixture` marks the rows
  // the fictional firm has ACTIVATED with an invented date; the rest are offered only.
  var CATALOG = [
    ob({ id: 'FOT-1',  name: 'State Bar membership fee', category: 'licensing', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '2026-06-01', everyYears: 1 }, precision: 'month', periodStyle: 'span', leadDays: 45, weight: 'hard',
         sourceNote: 'Tex. Gov’t Code § 81.054(a), (e)–(k) — official corpus 2026-08-14 — UNVERIFIED; the due date itself is in the State Bar Rules — NOT HELD', notes: 'The $65 legal services fee is billed with the dues (fixture note).', sheetWeight: 'hard', weightSource: 'his #137 set (bar dues)' }),
    ob({ id: 'FOT-2',  name: 'MCLE compliance', category: 'licensing', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '2026-11-30', everyYears: 1 }, periodStyle: 'year', leadDays: 90, weight: 'hard',
         sourceNote: 'Tex. Gov’t Code § 81.113(b)–(c) — UNVERIFIED (statute) + NOT HELD (the State Bar Rules / MCLE Regulations)', notes: 'Compliance year ends Nov 30 (fixture).', sheetWeight: 'hard', weightSource: 'his #137 set (CLE hours)' }),
    ob({ id: 'FOT-3',  name: 'Guardianship certification (2 yrs, then 4)', category: 'licensing', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '', everyYears: 2 }, leadDays: 60, weight: 'hard',
         sourceNote: 'Tex. Estates Code §§ 1054.201(a)–(b), 1054.202(a)–(b), 1054.203; Tex. Gov’t Code § 81.114(a) — UNVERIFIED', conditionalOn: 'he represents interests in guardianship proceedings or takes guardianship ad litem appointments — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call (conditional row)' }),
    ob({ id: 'FOT-4',  name: 'TIDC Attorney Practice Time Report', category: 'court-appointments', ownerScope: 'attorney', kind: 'fixed-annual', rule: { month: 10, day: 15 }, periodStyle: 'year', leadDays: 30, weight: 'hard',
         sourceNote: 'Tex. Code Crim. Proc. art. 26.04(j)(4) — official corpus 2026-08-14 — UNVERIFIED; corroborated by Tex. Gov’t Code § 79.036(a-1)', notes: 'Per-county checklist (fixture): County A · County B.', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-5',  name: 'Appointment-list eligibility (per the county plan)', category: 'court-appointments', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '', everyYears: 1 }, leadDays: 60, weight: 'hard',
         sourceNote: 'the county’s indigent-defense plan — NOT READ (plan) / HIS TO STATE (counties)', conditionalOn: 'per county', sheetWeight: 'hard', weightSource: 'Claude’s call (conditional row)' }),
    ob({ id: 'FOT-6',  name: 'Trust-account reconciliation', category: 'practice-rules', kind: 'fixed-monthly', rule: { day: 5 }, missedPeriods: 'collapse', leadDays: 5, weight: 'hard',
         sourceNote: 'PRACTICE — no cadence in the rule read (TDRPC 1.15(a), eff. 3/7/2025); the module must NEVER present it as a rule requirement', notes: 'A practice cadence — his day of the month (fixture: the 5th).', sheetWeight: 'hard', weightSource: 'his #137 set (IOLTA reconciliation) — his to settle' }),
    ob({ id: 'FOT-7', seededInactive: true,  name: 'IOLTA certification', category: 'practice-rules', kind: 'anniversary', rule: { anchorDate: '', everyYears: 1 }, active: false, leadDays: 30, weight: 'hard',
         sourceNote: 'Rules Governing the Operation of the Texas Access to Justice Foundation — NOT HELD', notes: 'Seeded INACTIVE until the rules are read; nothing asserted about what they require.', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-8',  name: 'Texas franchise tax annual report', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 5, day: 15 }, conditionalPerPeriod: true, leadDays: 45, weight: 'hard',
         sourceNote: 'Tex. Tax Code § 171.202(b); § 171.2022; § 171.002(d)(2); § 171.204(b) — UNVERIFIED', conditionalOn: 'whether the PLLC owes tax in the period — HIS FACT, per period', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-9',  name: 'Public Information Report', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 5, day: 15 }, leadDays: 45, weight: 'hard',
         sourceNote: 'Tex. Tax Code § 171.203(a)–(c); § 171.2515(a) — UNVERIFIED (statute); NOT READ (the date; the forfeiture grounds)', sheetWeight: 'hard', weightSource: 'Claude’s call (on the forfeiture power)' }),
    ob({ id: 'FOT-10', name: 'Business personal property rendition', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 4, day: 15 }, leadDays: 45, weight: 'hard',
         sourceNote: 'Tex. Tax Code §§ 22.01(a), 22.23(a)–(b), 22.28(a) — official corpus 2026-08-14 — UNVERIFIED', conditionalOn: 'the firm owns income-producing tangible personal property on January 1 — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-11', name: 'Property tax payment', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 1, day: 31 }, periodStyle: 'prior-year', periodSuffix: ' tax', leadDays: 30, weight: 'hard',
         sourceNote: 'Tex. Tax Code § 31.02(a) — UNVERIFIED', conditionalOn: 'a tax bill issued — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-12', name: 'Assumed-name certificate renewal (10 yrs)', category: 'tax-entity-and-employment', kind: 'anniversary', rule: { anchorDate: '2031-08-01', everyYears: 10 }, leadDays: 180, weight: 'hard',
         sourceNote: 'Tex. Bus. & Com. Code §§ 71.103(a), 71.151(a)–(c) — UNVERIFIED', conditionalOn: 'the firm holds an assumed-name certificate — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call (conditional row)' }),
    ob({ id: 'FOT-13', name: 'Forms W-2 to employees and W-2/W-3 to SSA', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 1, day: 31 }, periodStyle: 'prior-year', periodSuffix: ' wages', conditionalPerPeriod: true, leadDays: 30, weight: 'hard',
         sourceNote: '26 CFR 31.6051-1(d)(1)(i); 26 CFR 31.6071(a)-1(a)(3)(i) — eCFR pages through the fetch layer, request 2026-09-07, up_to_date_as_of 2026-09-03 — TIER B', conditionalOn: 'wages paid in the year', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-14', name: 'Form 941 quarterly', category: 'tax-entity-and-employment', kind: 'fixed-quarterly', rule: { dates: [{ month: 4, day: 30 }, { month: 7, day: 31 }, { month: 10, day: 31 }, { month: 1, day: 31 }] }, conditionalPerPeriod: true, leadDays: 14, weight: 'hard',
         sourceNote: '26 CFR 31.6071(a)-1(a)(1) — eCFR page through the fetch layer, request 2026-09-07, up_to_date_as_of 2026-09-03 — TIER B', conditionalOn: 'wages paid in the quarter', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-15', name: 'Form 940 (FUTA) annual return', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 1, day: 31 }, leadDays: 30, weight: 'hard',
         sourceNote: '26 CFR 31.6071(a)-1 (the FUTA paragraph) — TIER B (summary only)', conditionalOn: 'wages paid', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-16', name: 'TWC quarterly wage report and unemployment contribution', category: 'tax-entity-and-employment', kind: 'fixed-quarterly', rule: { dates: [{ month: 4, day: 30 }, { month: 7, day: 31 }, { month: 10, day: 31 }, { month: 1, day: 31 }] }, leadDays: 14, weight: 'hard',
         sourceNote: 'Tex. Labor Code ch. 204, ch. 213; 40 TAC § 815.106 — NOT READ (date)', conditionalOn: 'wages paid', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-17', name: 'Form 1099-NEC', category: 'tax-entity-and-employment', kind: 'fixed-annual', rule: { month: 1, day: 31 }, periodStyle: 'prior-year', periodSuffix: ' payments', conditionalPerPeriod: true, leadDays: 30, weight: 'hard',
         sourceNote: '26 CFR 1.6041-6 — TIER B', conditionalOn: 'reportable nonemployee compensation paid in the year — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-18', name: 'Federal income-tax return(s) and quarterly estimates', category: 'tax-entity-and-employment', kind: 'fixed-quarterly', rule: { dates: [{ month: 4, day: 15 }, { month: 6, day: 15 }, { month: 9, day: 15 }, { month: 1, day: 15 }] }, leadDays: 30, weight: 'hard',
         sourceNote: '26 U.S.C. §§ 6654(c)(2), 6072(a)–(b); 26 CFR 1.6072-1/-2 — NOT READ (no named channel)', conditionalOn: 'entity election and estimated-tax posture — HIS FACT; his accountant’s dates at activation', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-19', name: 'Professional-liability (malpractice) policy renewal', category: 'insurance', kind: 'anniversary', rule: { anchorDate: '2026-11-20', everyYears: 1 }, periodStyle: 'span', leadDays: 60, weight: 'hard',
         sourceNote: 'none (the policy) — HIS FACT', sheetWeight: 'hard', weightSource: 'his #137 set (malpractice renewal)' }),
    ob({ id: 'FOT-20', name: 'Other coverage renewals', category: 'insurance', kind: 'anniversary', rule: { anchorDate: '', everyYears: 1 }, leadDays: 60, weight: 'hard',
         sourceNote: 'none (the policy) — HIS FACT', conditionalOn: 'coverage held — HIS FACT', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-21', name: 'Notary public commission renewal (4 yrs)', category: 'insurance', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '2028-03-14', everyYears: 4 }, leadDays: 60, weight: 'routine',
         sourceNote: 'Tex. Gov’t Code §§ 406.002, 406.010(a) — official corpus 2026-08-14 — UNVERIFIED', conditionalOn: 'he holds a notary commission — HIS FACT', sheetWeight: 'routine', weightSource: 'Claude’s call (conditional row)' }),
    ob({ id: 'FOT-22', name: 'Backup restore test — documents', category: 'infrastructure', kind: 'interval-from-completion', rule: { days: 91 }, leadDays: 14, weight: 'routine',
         sourceNote: 'PRACTICE — BR-3’s origin case', notes: 'Pull a handful of files from the third copy and confirm they open (fixture: last run July 10).', sheetWeight: 'routine', weightSource: 'Claude’s call (BR-3)' }),
    ob({ id: 'FOT-23', name: 'Database restore test — the case data', category: 'infrastructure', kind: 'interval-from-completion', rule: { days: 91 }, leadDays: 14, weight: 'routine',
         sourceNote: 'PRACTICE — BR-3’s sibling', notes: 'Prove a Supabase backup actually restores (fixture: never run).', sheetWeight: 'routine', weightSource: 'Claude’s call (BR-3)' }),
    ob({ id: 'FOT-24', name: 'Backup heartbeat reviewed', category: 'infrastructure', kind: 'fixed-monthly', rule: { day: 1 }, missedPeriods: 'collapse', leadDays: 3, weight: 'routine',
         sourceNote: 'PRACTICE — carries #137’s requirement that monitoring applies to the VENDOR too', sheetWeight: 'routine', weightSource: 'Claude’s call (BR-3)' }),
    ob({ id: 'FOT-25', name: 'Firm payment card expiry', category: 'infrastructure', kind: 'anniversary', rule: { anchorDate: '2027-03-01', everyYears: 1 }, precision: 'month', periodStyle: 'year', leadDays: 60, weight: 'hard',
         sourceNote: 'HIS FACT', notes: 'Every auto-renewing subscription rides on it (fixture expiry: March 2027).', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-26', name: 'Annual closed-file and records review', category: 'practice-rules', kind: 'anniversary', rule: { anchorDate: '2026-12-15', everyYears: 1 }, periodStyle: 'year', leadDays: 30, weight: 'routine',
         sourceNote: 'PRACTICE — the proxy for the event-driven duties (trust records five years after termination; retention; the website check)', sheetWeight: 'routine', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-27', name: 'Domain renewal', category: 'infrastructure', kind: 'anniversary', rule: { anchorDate: '2026-11-15', everyYears: 1 }, periodStyle: 'span', leadDays: 60, weight: 'hard',
         sourceNote: 'HIS FACT (the date) — the sign-in sender and the firm’s mail ride on it', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-28', name: 'Subscription renewal — Microsoft 365', category: 'infrastructure', kind: 'anniversary', rule: { anchorDate: '2027-02-10', everyYears: 1 }, periodStyle: 'span', leadDays: 30, weight: 'routine',
         sourceNote: 'HIS FACT (the dates) — they bill automatically; the dated risk is FOT-25', sheetWeight: 'routine', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-29', name: 'Legal-research subscription — the auto-renewal notice window', category: 'infrastructure', kind: 'one-time', rule: { dueOn: '' }, leadDays: 60, weight: 'hard',
         sourceNote: 'HIS FACT (the date) — the contract governs', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-30', name: 'Office lease — renewal or notice deadline', category: 'infrastructure', kind: 'one-time', rule: { dueOn: '2027-02-28' }, leadDays: 90, weight: 'hard',
         sourceNote: 'if leased — HIS FACT', notes: 'Fixture: notice due Feb 28, 2027.', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-31', name: 'County / specialty bar memberships', category: 'licensing', ownerScope: 'attorney', kind: 'anniversary', rule: { anchorDate: '2027-01-01', everyYears: 1 }, periodStyle: 'year', leadDays: 30, weight: 'routine',
         sourceNote: 'optional; register-only', sheetWeight: 'routine', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-32', seededInactive: true, name: 'LegiScan API key rotation', category: 'infrastructure', kind: 'one-time', rule: { dueOn: '' }, active: false, leadDays: 14, weight: 'hard',
         sourceNote: 'M-4: after the LegiScan poller tier’s T3 build — HIS FACT (the date); created inactive', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-33', seededInactive: true, name: 'Model-call credential rotation', category: 'infrastructure', kind: 'one-time', rule: { dueOn: '' }, active: false, leadDays: 14, weight: 'hard',
         sourceNote: 'HIS FACT (the date, once a vendor is ruled) — created inactive; nothing about the credential’s home is decided', sheetWeight: 'hard', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-34', seededInactive: true, name: 'DMARC', category: 'infrastructure', kind: 'one-time', rule: { dueOn: '' }, active: false, leadDays: 14, weight: 'routine',
         sourceNote: 'PRACTICE — deferred past go-live (#126); created inactive', sheetWeight: 'routine', weightSource: 'Claude’s call' }),
    ob({ id: 'FOT-35', name: 'Security risk analysis', category: 'practice-rules', kind: 'anniversary', rule: { anchorDate: '', everyYears: 1 }, leadDays: 30, weight: 'routine',
         sourceNote: '45 CFR 164.308 returned 503 and was NOT READ; no source text is claimed', sheetWeight: 'routine', weightSource: 'Claude’s call' }),
    ob({ id: 'BOI', seededInactive: true,    name: 'Beneficial-ownership (BOI) report', category: 'tax-entity-and-employment', kind: 'one-time', rule: { dueOn: '' }, active: false, leadDays: 30, weight: 'hard',
         sourceNote: '31 CFR 1010.380(c)(1)(ii), (c)(2)(xxiv) — TIER B — his read of the section decides', notes: 'Seeded INACTIVE with the note: on the TIER B read a Texas PLLC is a domestic entity and exempt; the register remembers the question if the rule moves.', sheetWeight: '—', weightSource: 'inactive with the note' })
  ];

  // History rows and the open occurrence for each ACTIVATED template, all invented. `done` rows are written straight into
  // history; the OPEN occurrence is materialized by the domain (so serial/collapse is real, not typed in).
  function hist(obl, due, doneOn, extra) {
    var oc = FO.newOccurrence(obl, due, obl.precision === 'month');
    oc.state = 'done'; oc.doneOn = doneOn; oc.outcome = (extra && extra.outcome) || 'completed';
    oc.outcomeReason = (extra && extra.outcomeReason) || null; oc.doneNote = (extra && extra.doneNote) || null; oc.filedAt = (extra && extra.filedAt) || null; oc.touched = false; // history predates the module: never projected to Outlook
    return oc;
  }
  function open(obl, due) { return FO.newOccurrence(obl, due, obl.precision === 'month'); }

  var FIXTURES = {
    'backlog': {
      label: 'Fixture A — a register with a backlog',
      today: '2026-10-02',
      note: 'Two hard items overdue (the 2025 practice-time report, the September reconciliation), two routine ones overdue, three lit inside their lead windows.',
      activated: ['FOT-1','FOT-2','FOT-4','FOT-6','FOT-8','FOT-9','FOT-10','FOT-11','FOT-13','FOT-14','FOT-17','FOT-19','FOT-21','FOT-22','FOT-23','FOT-24','FOT-25','FOT-26','FOT-27','FOT-28','FOT-30','FOT-31','FOT-12'],
      build: function (obs) {
        var occ = [];
        occ.push(hist(obs['FOT-1'], '2025-06-01', '2025-05-20', { doneNote: 'paid on the bar portal (fixture)', filedAt: 'OneDrive/Firm/Bar/2025 receipt.pdf (fixture)' }));
        occ.push(hist(obs['FOT-1'], '2026-06-01', '2026-05-29', { doneNote: 'paid (fixture)', filedAt: 'OneDrive/Firm/Bar/2026 receipt.pdf (fixture)' }));
        occ.push(open(obs['FOT-1'], '2027-06-01'));
        occ.push(hist(obs['FOT-2'], '2025-11-30', '2025-11-12', { doneNote: '15 hours reported (fixture)' }));
        occ.push(open(obs['FOT-2'], '2026-11-30'));
        occ.push(hist(obs['FOT-4'], '2024-10-15', '2024-10-10', { doneNote: 'submitted on the TIDC form (fixture)' }));
        occ.push(open(obs['FOT-4'], '2025-10-15'));                      // the 2024 report is the last one done → the 2025 report is open and long overdue (serial)
        occ.push(hist(obs['FOT-6'], '2026-08-05', '2026-08-04', { doneNote: 'reconciled to the July statement (fixture)' }));
        occ.push(open(obs['FOT-6'], '2026-09-05'));                      // September never done → overdue; DONE collapses to the next future rule date
        occ.push(hist(obs['FOT-8'], '2026-05-15', '2026-04-30', { outcome: 'not-applicable', outcomeReason: 'condition-not-met', doneNote: 'no tax due for the period (fixture)' }));
        occ.push(open(obs['FOT-8'], '2027-05-15'));
        occ.push(hist(obs['FOT-9'], '2026-05-15', '2026-05-12', { doneNote: 'filed on the comptroller’s portal (fixture)', filedAt: 'OneDrive/Firm/2026/PIR.pdf (fixture)' }));
        occ.push(open(obs['FOT-9'], '2027-05-15'));
        occ.push(hist(obs['FOT-10'], '2026-04-15', '2026-04-02', { doneNote: 'rendition filed (fixture)' }));
        occ.push(open(obs['FOT-10'], '2027-04-15'));
        occ.push(hist(obs['FOT-11'], '2026-01-31', '2026-01-20', { doneNote: 'paid (fixture)' }));
        occ.push(open(obs['FOT-11'], '2027-01-31'));                     // a Sunday — FOD-1's display
        occ.push(hist(obs['FOT-13'], '2026-01-31', '2026-01-25', { doneNote: 'filed (fixture)' }));
        occ.push(open(obs['FOT-13'], '2027-01-31'));
        occ.push(hist(obs['FOT-14'], '2026-07-31', '2026-07-28', { doneNote: 'filed (fixture)' }));
        occ.push(open(obs['FOT-14'], '2026-10-31'));
        occ.push(hist(obs['FOT-17'], '2026-01-31', '2026-01-27', { doneNote: 'filed (fixture)' }));
        occ.push(open(obs['FOT-17'], '2027-01-31'));
        occ.push(hist(obs['FOT-19'], '2025-11-20', '2025-11-10', { doneNote: 'renewed (fixture)', filedAt: 'OneDrive/Firm/Insurance/2025-26 policy.pdf (fixture)' }));
        occ.push(open(obs['FOT-19'], '2026-11-20'));
        occ.push(open(obs['FOT-21'], '2028-03-14'));
        occ.push(hist(obs['FOT-22'], '2026-07-10', '2026-07-10', { doneNote: 'six files opened from the third copy (fixture)' }));
        occ.push(open(obs['FOT-22'], '2026-10-09'));                      // lastDone + 91
        occ.push(open(obs['FOT-23'], '2026-09-01'));                      // never run → due on the day it was activated (FOD-16)
        occ.push(hist(obs['FOT-24'], '2026-09-01', '2026-09-02', { doneNote: 'last copy 6 h old (fixture)' }));
        occ.push(open(obs['FOT-24'], '2026-10-01'));
        occ.push(open(obs['FOT-25'], '2027-03-01'));
        occ.push(hist(obs['FOT-26'], '2025-12-15', '2025-12-18', { doneNote: 'review done (fixture)' }));
        occ.push(open(obs['FOT-26'], '2026-12-15'));
        occ.push(hist(obs['FOT-27'], '2025-11-15', '2025-11-01', { doneNote: 'renewed two years (fixture)' }));
        occ.push(open(obs['FOT-27'], '2026-11-15'));
        occ.push(open(obs['FOT-28'], '2027-02-10'));
        occ.push(open(obs['FOT-30'], '2027-02-28'));
        occ.push(open(obs['FOT-31'], '2027-01-01'));
        occ.push(open(obs['FOT-12'], '2031-08-01'));
        return occ;
      }
    },
    'current': {
      label: 'Fixture B — everything current',
      today: '2026-09-20',
      note: 'Nothing overdue and nothing hard due within 14 days — the dashboard card renders NOTHING (the WorklistCard precedent); the register still shows the lit items.',
      activated: ['FOT-1','FOT-2','FOT-4','FOT-6','FOT-9','FOT-19','FOT-22','FOT-24','FOT-27'],
      build: function (obs) {
        var occ = [];
        occ.push(hist(obs['FOT-1'], '2026-06-01', '2026-05-29', { doneNote: 'paid (fixture)' }));
        occ.push(open(obs['FOT-1'], '2027-06-01'));
        occ.push(hist(obs['FOT-2'], '2025-11-30', '2025-11-12', { doneNote: '15 hours reported (fixture)' }));
        occ.push(open(obs['FOT-2'], '2026-11-30'));
        occ.push(hist(obs['FOT-4'], '2025-10-15', '2025-10-14', { doneNote: 'submitted (fixture)' }));
        occ.push(open(obs['FOT-4'], '2026-10-15'));                      // 25 days out: LIT (lead 30) but outside the card's 14-day horizon
        occ.push(hist(obs['FOT-6'], '2026-09-05', '2026-09-04', { doneNote: 'reconciled (fixture)' }));
        occ.push(open(obs['FOT-6'], '2026-10-05'));
        occ.push(hist(obs['FOT-9'], '2026-05-15', '2026-05-12', { doneNote: 'filed (fixture)' }));
        occ.push(open(obs['FOT-9'], '2027-05-15'));
        occ.push(open(obs['FOT-19'], '2026-11-20'));
        occ.push(hist(obs['FOT-22'], '2026-08-30', '2026-08-30', { doneNote: 'six files opened (fixture)' }));
        occ.push(open(obs['FOT-22'], '2026-11-29'));
        occ.push(hist(obs['FOT-24'], '2026-09-01', '2026-09-01', { doneNote: 'fresh (fixture)' }));
        occ.push(open(obs['FOT-24'], '2026-10-01'));
        occ.push(open(obs['FOT-27'], '2026-11-15'));
        return occ;
      }
    }
  };

  function buildFixture(name) {
    var fx = FIXTURES[name] || FIXTURES.backlog, obs = {}, order = [];
    CATALOG.forEach(function (c) { var copy = JSON.parse(JSON.stringify(c)); copy.activatedInFixture = fx.activated.indexOf(copy.id) >= 0; if (!copy.activatedInFixture && copy.active) copy.active = false; if (copy.activatedInFixture) copy.active = true; obs[copy.id] = copy; order.push(copy.id); });
    var occ = fx.build(obs);
    return { name: name, label: fx.label, note: fx.note, today: fx.today, obligations: obs, order: order, occurrences: occ, reviewLog: [] };
  }

  root.FO_FIXTURE = { CATALOG: CATALOG, FIXTURES: FIXTURES, buildFixture: buildFixture };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
