/* firm-obligations mock — UI. Renders the three surfaces (spec §5) under the spec's defaults, with the eleven DECISIONS
   of the ruling sheet as switches. SHEET and WS_ROWS are injected at build time, verbatim from the sheet at HEAD. */
(function () {
  'use strict';
  var FO = window.FO, FX = window.FO_FIXTURE, SHEET = window.SHEET || {}, WS_ROWS = window.WS_ROWS || [];
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function store(k, v) { try { if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  /* ---------- state ---------- */
  var S = {
    fixture: 'backlog', today: null, screen: 'register', decision: 0, multiUser: false, hl: null, expanded: {}, form: null,
    d: { d0: 1, d0custom: '', d1: 1, d2: 1, d3: 1, d4: 1, d5: 1, d6: 1, d7: 1, d8: 'a', d10: 1 },
    fom: { collapsePeriod: false, precisionEarlier: false, pinHardFirst: false, perPeriodFlags: false, cardWindowLiteral: false },
    cardAbove: false,
    ws: {}, data: null
  };
  var saved = store('fo-mock-state-v1'); if (saved && saved.d) { S.d = Object.assign(S.d, saved.d); S.fom = Object.assign(S.fom, saved.fom || {}); S.ws = saved.ws || {}; }
  function persist() { store('fo-mock-state-v1', { d: S.d, fom: S.fom, ws: S.ws }); }

  function loadFixture(name, keepToday) { S.fixture = name; S.data = FX.buildFixture(name); if (!keepToday) S.today = S.data.today; S.expanded = {}; S.form = null; }
  loadFixture('backlog');

  /* ---------- decision effects ---------- */
  function word() { var m = { 1: 'Firm obligations', 2: 'Practice obligations', 3: 'Office obligations' }; return S.d.d0 == 4 ? (S.d.d0custom || 'Obligations') : m[S.d.d0]; }
  function navLabel() { var w = word().trim().split(/\s+/); var last = w[w.length - 1]; return last.charAt(0).toUpperCase() + last.slice(1); }
  function opts() {
    return { cardBothWeights: S.d.d6 == 2, oneWeightClass: S.d.d6 == 3, fomCollapsePeriod: S.fom.collapsePeriod, fomPrecisionEarlier: S.fom.precisionEarlier, cardWindowRegardlessOfLead: S.fom.cardWindowLiteral, cardHorizonDays: 14 };
  }
  function effMissed(ob) { if (ob.kind === 'interval-from-completion') return 'collapse'; /* by construction (§3.2) */ if (S.d.d2 == 2) return 'serial'; if (S.d.d2 == 3) return 'collapse'; return ob.missedPeriods; }
  function withEff(ob) { var c = Object.create(ob); c.missedPeriods = effMissed(ob); c.conditionalPerPeriod = ob.conditionalPerPeriod || (S.fom.perPeriodFlags && ['FOT-10','FOT-11','FOT-15','FOT-16'].indexOf(ob.id) >= 0); return c; }
  function outlookMode() { return { 1: 'event-separate', 2: 'todo', 3: 'event-same-category', 4: 'none', 5: 'both' }[S.d.d7]; }
  function showsNA(ob) { return ob.conditionalPerPeriod && S.d.d1 != '3b'; }
  function hasDelegate() { return S.d.d1 == 2 || S.d.d4 == 4; }
  function isFiling(ob) { return ob.category === 'court-appointments' || ob.category === 'tax-entity-and-employment'; }
  function ownerScopeModelled() { return S.d.d4 != 2; }
  function licensees() { return S.multiUser ? ['Attorney A', 'Attorney B'] : ['(the firm’s one attorney)']; }
  function openOccs() { return S.data.occurrences.filter(function (o) { return o.state === 'open'; }); }
  function occsOf(id) { return S.data.occurrences.filter(function (o) { return o.obligationId === id; }); }
  function log(entry) { S.data.reviewLog.unshift(entry); }

  /* ---------- sorting override (FOM-9) ---------- */
  function sortPin(items) {
    if (!S.fom.pinHardFirst) return items;
    return items.slice().sort(function (a, b) { if (a.ob.weight !== b.ob.weight && S.d.d6 != 3) return a.ob.weight === 'hard' ? -1 : 1; return a.days - b.days; });
  }

  /* ---------- rendering: shell ---------- */
  function renderShell(inner, url, active) {
    var nav = [['/cases', 'Cases'], ['/inbox', 'Inbox'], ['/notes', 'Office notes'], ['/parties', 'Parties'], ['/benchmarks', 'Benchmarks'], ['/rules', 'Legal rules'], ['/statutes', 'Statutes'], ['/bills', 'Bill tracking'], ['/templates', 'Templates'], ['/firm/obligations', navLabel()]];
    return '<div class="browser"><div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="url">localhost:5173' + h(url) + '</span><span>demo mode</span></div>' +
      '<div class="fixbar">FIXTURE — a fictional firm’s register. Every date and every “firm fact” here is invented for the example; nothing on this screen is a fact about Michael D. Brennan, PLLC.</div>' +
      '<div class="shell"><aside class="sidebar"><div class="brand"><h1>Brennan Law</h1><span>Case Manager</span></div><nav>' +
      nav.map(function (n) { return '<a data-go="' + h(n[0]) + '" class="' + (n[0] === active ? 'active' : '') + (n[0] === '/firm/obligations' ? ' new' : '') + '">' + h(n[1]) + '</a>'; }).join('') +
      '</nav><div class="mode">Demo mode: data stays in this browser</div></aside><main class="main">' + inner + '</main></div></div>';
  }

  /* ---------- /cases ---------- */
  function renderCases() {
    var obsE = {}; Object.keys(S.data.obligations).forEach(function (k) { obsE[k] = withEff(S.data.obligations[k]); });
    var items = sortPin(FO.cardItems(obsE, S.data.occurrences, S.today, opts()));
    var due = items.filter(function (i) { return i.days >= 0; }).length, over = items.length - due;
    var card;
    if (!items.length) card = '<div class="card ghost" id="fo-card">(the ' + h(word().toLowerCase()) + ' card renders NOTHING — no ' + (S.d.d6 == 2 || S.d.d6 == 3 ? '' : 'hard ') + 'item is overdue or due within 14 days; the WorklistCard precedent)</div>';
    else {
      var lines = items.slice(0, 3).map(function (i) {
        var oc = i.oc, d = i.days;
        return '<div>' + (S.d.d6 == 3 ? '' : '<span class="wt ' + h(i.ob.weight) + '" title="' + h(i.ob.weight) + '"></span>') + h(i.ob.name) + ' <span class="muted">· ' + h(oc.periodLabel) + '</span> · due ' + h(FO.fmtShort(FO.effectiveDue(oc))) + ' · <span class="days">' + (d < 0 ? '<span style="color:var(--warn);font-weight:600">' + (-d) + (d === -1 ? ' day' : ' days') + ' overdue</span>' : d === 0 ? 'today' : d + (d === 1 ? ' day' : ' days')) + '</span></div>';
      }).join('');
      var more = items.length > 3 ? '<div class="muted">and ' + (items.length - 3) + ' more</div>' : '';
      card = '<div class="card' + (over ? ' warnline' : '') + '" id="fo-card"><strong>' + h(word()) + ' — ' + due + ' due · ' + over + ' overdue</strong><div class="small" style="margin-top:4px">' + lines + more + '<div style="margin-top:4px"><a data-go="/firm/obligations">Open the register</a></div></div></div>';
    }
    var legal = '<div class="card warnline"><strong>Legal watch</strong><div class="small" style="margin-top:4px"><span>⚠ <a>2 rules due for re-verification</a> · </span><span><a>1 enacted change taking effect later</a> · </span><span><a>3 pending bills watched</a></span></div></div>';
    var order = S.cardAbove ? card + legal : legal + card; // §11 item 1: position is a hands-on item — a toggle in the panel, never a decision effect
    var inner = order + '<div class="page-head"><div><h2>Cases</h2><div class="sub">2 matters · demo data</div></div><a class="btn">New case</a></div>' +
      '<table class="list"><thead><tr><th>File</th><th>Caption</th><th>Practice area</th><th>Status</th></tr></thead><tbody>' +
      '<tr class="rowlink"><td>26-0001</td><td>Demo matter A (fixture)</td><td><span class="badge pi">PI</span></td><td><span class="badge status">Pre-suit</span></td></tr>' +
      '<tr class="rowlink"><td>26-0002</td><td>Demo matter B (fixture)</td><td><span class="badge pi">PI</span></td><td><span class="badge status">Litigation</span></td></tr></tbody></table>';
    return renderShell(inner, '/cases', '/cases');
  }

  /* ---------- /firm/obligations ---------- */
  function statusBadge(st, days) {
    if (st === 'overdue') return '<span class="badge st-overdue">' + (-days) + (days === -1 ? ' day' : ' days') + ' overdue</span>';
    if (st === 'lit') return '<span class="badge st-lit">' + (days < 0 ? 'past its date · weekend' : 'lit · ' + (days === 0 ? 'due today' : days + (days === 1 ? ' day' : ' days'))) + '</span>';
    return '<span class="badge st-pending">' + days + ' days</span>';
  }
  function ownerCell(ob) {
    if (!S.multiUser) return '';                                   // the solo stage: nothing on screen under any reading (§10)
    if (S.d.d4 == 3) return '<span class="badge owner">Attorney A</span>';
    if (!ownerScopeModelled()) return '<span class="badge owner" title="no owner field (DECISION 4 option 2)">—</span>';
    return ob.ownerScope === 'attorney' ? '<span class="badge owner">Attorney A</span>' : '<span class="badge owner" style="opacity:.6">firm</span>';
  }
  function rowHTML(item, group) {
    var oc = item.oc, ob = item.ob, eff = FO.effectiveDue(oc), wk = FO.weekendNote(eff), key = oc.id, ex = !!S.expanded[key];
    var pm = ob.precision === 'month' && !oc.dueOnOverride;
    var dueTxt = pm ? '<span class="dt">' + h(FO.MON[FO.ymd(eff).m - 1] + ' ' + FO.ymd(eff).y) + '</span><span class="wk">day unknown until the statement — set the real date when known</span>' : '<span class="dt">' + h(FO.fmtLong(eff)) + '</span>' + (wk ? '<span class="wk">' + h(wk) + '</span>' : '');
    var acts = '<button class="btn small" data-act="done" data-oc="' + h(key) + '">Done</button>';
    if (showsNA(ob)) acts += '<button class="btn small secondary" data-act="na" data-oc="' + h(key) + '">Not applicable…</button>';
    if (hasDelegate() && !oc.delegatedTo) acts += '<button class="btn small secondary" data-act="delegate" data-oc="' + h(key) + '">Delegate…</button>';
    var deleg = (oc.delegatedTo ? ' <span class="badge deleg">waiting on ' + h(oc.delegatedTo) + '</span>' : '') + (ob.active === false ? ' <span class="badge flag" title="FOD-8: retiring closes nothing; this occurrence stays lit until done and no next one materializes">retired — stays until done</span>' : '');
    var fan = (S.multiUser && S.d.d4 != 2 && (ob.ownerScope === 'attorney' || S.d.d4 == 3)) ? licensees() : [null];
    var rows = fan.map(function (who, ix) {
      var own = who && S.multiUser ? (S.d.d4 == 3 || ownerScopeModelled() ? '<span class="badge owner">' + h(who) + '</span>' : '') : ownerCell(ob);
      return '<tr class="oc' + (S.hl === ob.id ? ' hl-target' : '') + '"><td class="name"><span class="nm">' + h(ob.name) + '</span><span class="per">' + h(oc.periodLabel) + '</span>' + (own ? ' ' + own : '') + deleg + '</td>' +
        '<td class="due">' + dueTxt + '</td><td>' + (S.d.d6 == 3 ? '' : '<span class="wt ' + h(ob.weight) + '" title="' + h(ob.weight) + '"></span><span class="small muted">' + h(ob.weight) + '</span>') + '</td>' +
        '<td>' + statusBadge(item.status, item.days) + (item.status !== 'overdue' && FO.weekendHold(eff, S.today) ? ' <span class="small muted">past its date; the weekend exemption (FOD-1)</span>' : '') + '</td><td class="acts">' + (ix === 0 ? acts : '<span class="muted small">(preview: at multi-user, ' + h(who) + '’s own occurrence)</span>') + ' <button class="linky small" data-act="exp" data-oc="' + h(key) + '">' + (ex ? 'less' : 'more') + '</button></td></tr>';
    }).join('');
    if (ex) rows += expanderHTML(ob, oc);
    return rows;
  }
  function sourceLine(ob) {
    var s = h(ob.sourceNote);
    if (S.d.d8 === 'a') return '<a title="would point at a registry entry in legal-rule-registry-firm-obligations.md — none is drafted (DECISION 8 option a)">' + s + '</a> <span class="badge flag">would link a registry entry · none drafted</span>';
    if (S.d.d8 === 'c') return '<a title="would point at an entry in an existing registry file (option c) — none drafted">' + s + '</a> <span class="badge flag">would link an entry in an existing file · none drafted</span>';
    return s + ' <span class="muted small">(source note on the template — not a registry entry)</span>';
  }
  function expanderHTML(ob, oc) {
    var hist = occsOf(ob.id).filter(function (o) { return o.state === 'done'; }).sort(function (a, b) { return FO.cmp(b.doneOn, a.doneOn); });
    var trail = S.data.reviewLog.filter(function (e) { return e.entityId === oc.id || (e.entityType === 'firm_obligation' && e.entityId === ob.id) || hist.some(function (x) { return x.id === e.entityId; }); });
    var html = '<tr class="exp"><td colspan="5"><dl class="kv">' +
      '<dt>Source</dt><dd>' + sourceLine(ob) + '</dd>' +
      (ob.conditionalOn ? '<dt>Applies if</dt><dd>' + h(ob.conditionalOn) + '</dd>' : '') +
      '<dt>Rule</dt><dd>' + h(ruleText(ob)) + ' · lead ' + ob.leadDays + ' days · missed periods: ' + h(effMissed(ob)) + (ob.conditionalPerPeriod ? ' · not-applicable offered (the duty can lapse for a period)' : '') + '</dd>' +
      (ob.notes ? '<dt>Notes</dt><dd>' + h(ob.notes) + '</dd>' : '') +
      (ownerScopeModelled() ? '<dt>Owner scope</dt><dd>' + h(ob.ownerScope) + (S.multiUser ? '' : ' <span class="muted">(changes nothing on screen at the solo stage)</span>') + '</dd>' : '') +
      '</dl>';
    if (S.d.d5 == 3) html += '<div class="notice" style="margin-top:8px">Expense hook (DECISION 5 option 3): amount · payee · ledger reference — <i>designed later against the QBO memo; greyed here</i></div>';
    html += '<div class="hist"><strong class="small">History</strong>' + (hist.length ? hist.map(function (o) {
      return '<div>' + (o.outcome === 'not-applicable' ? '<span class="badge st-na">not applicable</span> ' : '<span class="badge st-done">done</span> ') + h(o.periodLabel) + ' · ' + h(o.doneOn) + (o.outcomeReason ? ' · ' + h(o.outcomeReason) : '') + (o.doneNote ? ' · ' + h(o.doneNote) : '') + (o.filedAt ? ' · <span class="muted">filed at:</span> ' + h(o.filedAt) : '') + (o.externalRef ? ' · ref ' + h(o.externalRef) : '') +
        (o.touched && FO.canUndo(o, nextFor(o), !!nextOf(o)) ? ' <button class="linky small" data-act="undo" data-oc="' + h(o.id) + '">Undo</button>' : (o.touched ? ' <span class="small muted">(undo closed — the next occurrence was touched, FOD-7)</span>' : '')) + '</div>';
    }).join('') : '<div class="muted">none yet</div>') + '</div>';
    if (trail.length) html += '<div class="hist"><strong class="small">Audit trail (review_log)</strong>' + trail.map(function (e) { return '<div class="small muted"><code>' + h(e.action) + '</code> · ' + h(e.at) + ' · ' + h(e.note) + '</div>'; }).join('') + '</div>';
    html += '<div style="margin-top:8px"><button class="btn small secondary" data-act="override" data-oc="' + h(oc.id) + '">Set the real due date…</button> <button class="btn small secondary" data-act="edit" data-oc="' + h(oc.id) + '">Edit lead / weight…</button> ' + (ob.active === false ? '<button class="btn small secondary" data-act="activate" data-ob="' + h(ob.id) + '">Un-retire</button>' : '<button class="btn small danger" data-act="retire" data-ob="' + h(ob.id) + '">Retire</button>') + '</div>';
    if (S.form && S.form.oc === oc.id) html += formHTML(ob, oc);
    return html + '</td></tr>';
  }
  function ruleText(ob) {
    var r = ob.rule;
    switch (ob.kind) {
      case 'fixed-annual': return 'every year on ' + FO.MON[r.month - 1] + ' ' + r.day;
      case 'fixed-quarterly': return 'quarterly — ' + r.dates.map(function (d) { return FO.MON[d.month - 1] + ' ' + d.day; }).join(' · ');
      case 'fixed-monthly': return 'monthly on the ' + r.day + (r.day === 1 ? 'st' : r.day === 2 ? 'nd' : r.day === 3 ? 'rd' : 'th');
      case 'anniversary': return 'every ' + (r.everyYears > 1 ? r.everyYears + ' years' : 'year') + ' from ' + (r.anchorDate || '(his date, at activation)') + (ob.precision === 'month' ? ' (month precision)' : '');
      case 'interval-from-completion': return r.days + ' days after the last completion';
      case 'one-time': return 'once, on ' + (r.dueOn || '(undated)');
    }
    return '';
  }
  function formHTML(ob, oc) {
    var f = S.form, html = '<div class="form">';
    if (f.kind === 'done') {
      html += '<strong class="small">Mark done — ' + h(ob.name) + ' · ' + h(oc.periodLabel) + '</strong><div class="form-grid" style="margin-top:8px">' +
        '<label class="fld"><span class="lab">Done on</span><input type="date" name="doneOn" value="' + h(S.today) + '"></label>' +
        '<label class="fld"><span class="lab">Note</span><input type="text" name="doneNote" placeholder="a confirmation number, “filed on the portal”"></label>' +
        '<label class="fld"><span class="lab">Filed at</span><input type="text" name="filedAt" placeholder="a URL, a folder, a document name — a pointer, never a file"></label>';
      if (S.d.d1 == '3a' && isFiling(ob)) html += '<label class="fld"><span class="lab">Confirmation number <span class="muted">(required on filings — DECISION 1 option 3)</span></span><input type="text" name="confirmation" required></label>';
      if (S.d.d5 == 2) html += '<label class="fld"><span class="lab">External ref <span class="muted">(reserved column — DECISION 5 option 2)</span></span><input type="text" name="externalRef"></label>';
      html += '</div>';
    } else if (f.kind === 'na') {
      html += '<strong class="small">Not applicable this period — ' + h(ob.name) + ' · ' + h(oc.periodLabel) + '</strong><div class="form-grid" style="margin-top:8px">' +
        '<label class="fld"><span class="lab">Reason <span class="muted">(required)</span></span><select name="outcomeReason"><option value="">— choose —</option><option value="condition-not-met">condition not met (e.g. no wages this period)</option><option value="performed-elsewhere">performed elsewhere</option></select></label>' +
        '<label class="fld"><span class="lab">Note</span><input type="text" name="doneNote" placeholder="no wages paid this year"></label></div>';
    } else if (f.kind === 'delegate') {
      html += '<strong class="small">Delegate — ' + h(ob.name) + '</strong><div class="form-grid" style="margin-top:8px"><label class="fld"><span class="lab">Waiting on</span><input type="text" name="delegatedTo" placeholder="Paralegal P (fixture)"><span class="hint">a marker on the OPEN occurrence — it stays lit; only Done closes it</span></label></div>';
    } else if (f.kind === 'edit') {
      html += '<strong class="small">Edit — ' + h(ob.name) + '</strong><div class="form-grid" style="margin-top:8px"><label class="fld"><span class="lab">Lead window (days)</span><input type="text" name="leadDays" value="' + h(ob.leadDays) + '"><span class="hint">re-evaluates the open occurrence’s lit moment; FOD-4</span></label><label class="fld"><span class="lab">Weight</span><select name="weight"><option value="hard"' + (ob.weight === 'hard' ? ' selected' : '') + '>hard</option><option value="routine"' + (ob.weight === 'routine' ? ' selected' : '') + '>routine</option></select><span class="hint">emphasis and order only, never behaviour (§4.4)</span></label></div><div class="note small">Rule edits (the date, the kind) are not rendered in this mock — §5 of the companion names the omission.</div>';
    } else if (f.kind === 'override') {
      html += '<strong class="small">Set the real due date — ' + h(ob.name) + ' · ' + h(oc.periodLabel) + '</strong><div class="form-grid" style="margin-top:8px"><label class="fld"><span class="lab">Due on</span><input type="date" name="newDate" value="' + h(FO.effectiveDue(oc)) + '"><span class="hint">FOD-4: an overdue occurrence is never moved later</span></label></div>';
    }
    html += '<div class="row"><button class="btn small" data-act="submit">Confirm</button><button class="btn small secondary" data-act="cancel">Cancel</button>' + (f.error ? '<span class="small" style="color:#a03030;align-self:center">' + h(f.error) + '</span>' : '') + '</div></div>';
    return html;
  }
  function tableWrap(rows) { return '<table class="list reg"><thead><tr><th>Obligation</th><th>Due</th><th>Weight</th><th>State</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>'; }
  function renderRegister() {
    var obs = {}; Object.keys(S.data.obligations).forEach(function (k) { obs[k] = withEff(S.data.obligations[k]); });
    var g = FO.registerGroups(obs, S.data.occurrences, S.today, opts());
    var active = S.data.order.filter(function (id) { return obs[id].active; }).length;
    var lit = 0; openOccs().forEach(function (o) { var st = FO.status(obs[o.obligationId], o, S.today, opts()); if (obs[o.obligationId].active && (st === 'lit')) lit++; });
    var html = '<div class="page-head"><div><h2>' + h(word()) + '</h2><div class="sub">' + active + ' active · ' + g.overdue.length + ' overdue · ' + lit + ' lit in their lead window · today is ' + h(FO.fmtLong(S.today)) + ' (fixture)</div></div><div><button class="btn" data-act="catalog">Add obligation</button></div></div>';
    if (S.d.d1 == '3b') html += '<div class="notice">DECISION 1 option 3(b): no “not applicable” anywhere — a duty that lapses is RETIRED and re-added when it returns.</div>';
    html += '<div class="reg-group"><h4 class="overdue">Overdue <span class="cnt">' + g.overdue.length + '</span></h4>' + (g.overdue.length ? tableWrap(sortPin(g.overdue).map(function (i) { return rowHTML(i, 'overdue'); }).join('')) : '<div class="empty">nothing overdue</div>') + '</div>';
    g.months.forEach(function (m) { html += '<div class="reg-group"><h4>' + h(m.label) + ' <span class="cnt">' + m.items.length + '</span></h4>' + (m.items.length ? tableWrap(m.items.map(function (i) { return rowHTML(i, m.key); }).join('')) : '<div class="empty">—</div>') + '</div>'; });
    html += '<div class="reg-group"><h4>Later <span class="cnt">' + g.later.length + ' · beyond twelve months (FOM-3)</span></h4>' + (g.later.length ? tableWrap(g.later.map(function (i) { return rowHTML(i, 'later'); }).join('')) : '<div class="empty">—</div>') + '</div>';
    var hasOpen = function (id) { return S.data.occurrences.some(function (o) { return o.obligationId === id && o.state === 'open'; }); };
    var inactive = S.data.order.filter(function (id) { return obs[id].seededInactive && !obs[id].activatedInFixture; });
    var retired = S.data.order.filter(function (id) { return !obs[id].active && obs[id].activatedInFixture && !hasOpen(id); });
    html += '<div class="reg-group"><h4>Inactive <span class="cnt">' + (inactive.length + retired.length) + ' · created inactive, or retired with nothing open (FOM-5); a retired obligation whose occurrence is still open stays in its month above, marked</span></h4><table class="list"><tbody>' +
      inactive.concat(retired).map(function (id) { var ob = obs[id]; var doneRows = occsOf(id).filter(function (o) { return o.state === 'done'; }).length; return '<tr class="oc"><td class="name"><span class="nm">' + h(ob.name) + '</span><span class="per">' + h(ruleText(ob)) + '</span>' + (ob.activatedInFixture ? ' <span class="badge flag">retired</span>' : '') + '</td><td colspan="3" class="small muted">' + h(ob.notes || ob.sourceNote) + (doneRows ? ' · history: ' + doneRows + ' done' : '') + '</td><td class="acts"><button class="btn small secondary" data-act="activate" data-ob="' + h(id) + '">' + (ob.activatedInFixture ? 'Re-activate…' : 'Activate…') + '</button></td></tr>'; }).join('') + '</tbody></table></div>';
    if (S.form && S.form.kind === 'catalog') html += catalogHTML(obs);
    if (S.form && S.form.kind === 'activate') html += activateHTML(obs[S.form.ob]);
    return renderShell(html, '/firm/obligations', '/firm/obligations');
  }
  function catalogHTML(obs) {
    var html = '<div class="card" id="catalog"><h3>Add obligation — from the seed catalog, or blank</h3><div class="small muted">Templates only. Nothing is created until you activate it with your own date (FOD-9). “Offered / Active at go-live” is DECISION 9 Part B — use the worksheet in the panel.</div><table class="list" style="margin-top:8px"><thead><tr><th>Template</th><th>Rule</th><th>Weight</th><th>Source status</th><th></th></tr></thead><tbody>' +
      S.data.order.map(function (id) { var ob = obs[id]; if (ob.activatedInFixture || ob.seededInactive) return ''; return '<tr class="oc"><td class="name"><span class="nm">' + h(ob.name) + '</span><span class="per">' + h(id) + '</span></td><td class="small">' + h(ruleText(ob)) + '</td><td><span class="wt ' + h(ob.weight) + '"></span>' + h(ob.weight) + '</td><td class="small muted">' + h(ob.sourceNote) + '</td><td class="acts"><button class="btn small secondary" data-act="activate" data-ob="' + h(id) + '">Activate…</button></td></tr>'; }).join('') +
      '<tr class="oc"><td class="name"><span class="nm">Custom obligation</span></td><td class="small muted" colspan="3">name · kind · date · lead — anything he adds</td><td class="acts"><button class="btn small secondary" disabled>Add…</button></td></tr></tbody></table><div style="margin-top:8px"><button class="btn small secondary" data-act="cancel">Close</button></div></div>';
    return html;
  }
  function activateHTML(ob) {
    var serial = effMissed(ob) === 'serial' && ob.kind !== 'one-time';
    return '<div class="card" id="activate"><h3>Activate — ' + h(ob.name) + '</h3><div class="form-grid">' +
      (ob.kind === 'anniversary' ? '<label class="fld"><span class="lab">Anchor date (yours)</span><input type="date" name="anchorDate" value="' + h(ob.rule.anchorDate || '') + '"><span class="hint">the statement date, the policy date, the commission date</span></label>' : '') +
      (ob.kind === 'one-time' ? '<label class="fld"><span class="lab">Due on</span><input type="date" name="dueOn" value="' + h(ob.rule.dueOn || '') + '"></label>' : '') +
      (ob.kind === 'interval-from-completion' ? '<label class="fld"><span class="lab">Last done (optional)</span><input type="date" name="lastDone"><span class="hint">FOD-16: left blank, the first occurrence is due NOW</span></label>' : '') +
      (serial ? '<label class="fld"><span class="lab">Last period completed (optional) <span class="muted">— FOM-4, PROPOSED</span></span><input type="date" name="lastPeriodDue" placeholder="the due date of the last one you did"><span class="hint">if given, the first occurrence is the period AFTER it — possibly already overdue; left blank, the next future date</span></label>' : '') +
      (ob.conditionalOn ? '<label class="fld full"><span class="lab">Applies if</span><span class="hint">' + h(ob.conditionalOn) + ' — your fact, stated here, never inferred</span></label>' : '') +
      '</div><div class="row" style="margin-top:10px;display:flex;gap:8px"><button class="btn small" data-act="submit-activate" data-ob="' + h(ob.id) + '">Activate</button><button class="btn small secondary" data-act="cancel">Cancel</button>' + (S.form.error ? '<span class="small" style="color:#a03030;align-self:center">' + h(S.form.error) + '</span>' : '') + '</div></div>';
  }

  /* ---------- Outlook projection ---------- */
  function renderOutlook() {
    var obs = {}; Object.keys(S.data.obligations).forEach(function (k) { obs[k] = withEff(S.data.obligations[k]); });
    var mode = outlookMode(), items = FO.outlookItems(obs, S.data.occurrences, mode, opts(), word());
    var side = '<div class="olside"><h5>My calendars</h5><label><span class="sw" style="background:#0f6cbd"></span> Calendar</label><label><span class="sw" style="background:#0f6cbd;opacity:.7"></span> MDBP Cases</label>' + (mode === 'event-separate' || mode === 'both' ? '<label><input type="checkbox" checked disabled><span class="sw" style="background:var(--accent)"></span> MDBP Firm <span class="muted">(new)</span></label>' : '') +
      (mode === 'todo' || mode === 'both' ? '<h5 style="margin-top:14px">To Do</h5><label><span class="sw" style="background:var(--accent)"></span> MDBP Firm</label>' : '') + '<div class="muted" style="margin-top:14px;font-size:11px">Outlook mobile toggles CALENDARS cleanly and filters CATEGORIES poorly (spec §5.3).</div></div>';
    var main = '<div class="olmain"><h3>' + (mode === 'todo' ? 'To Do — MDBP Firm' : 'Agenda') + '</h3><div class="sub">what the app would push as of ' + h(FO.fmtLong(S.today)) + ' · ' + { 'event-separate': 'all-day events in a separate “MDBP Firm” calendar, reminder at the lead window (the lean, FOD-10)', 'todo': 'To Do tasks — needs a new Tasks.ReadWrite consent on the registration', 'event-same-category': 'all-day events in the same “MDBP Cases” calendar, category “MDBP Firm”', 'none': 'nothing is pushed — the register and the card are the only surfaces', 'both': 'an event AND a task per occurrence' }[mode] + '</div>';
    if (mode === 'none') main += '<div class="none">Nothing pushed. The only way the lead window is FELT is opening the register.</div>';
    else {
      var events = items.filter(function (i) { return i.kind === 'event'; }), todos = items.filter(function (i) { return i.kind === 'todo'; });
      if (events.length) {
        var byDay = {}; events.forEach(function (e) { (byDay[e.date] = byDay[e.date] || []).push(e); });
        var caseEv = { '2026-10-06': 'Hearing — Demo matter A (MDBP Cases, fixture)', '2026-10-14': 'Deadline — Demo matter B response due (MDBP Cases, fixture)' };
        Object.keys(caseEv).forEach(function (d) { (byDay[d] = byDay[d] || []).push({ kind: 'case', subject: caseEv[d], date: d }); });
        var days = Object.keys(byDay).sort();
        main += days.map(function (d) {
          var past = FO.cmp(d, S.today) < 0;
          return '<div class="day"><div class="d">' + h(FO.fmtLong(d)) + (past ? '<br><span class="small" style="color:#a4262c">scrolled into the past</span>' : '') + '</div><div>' + byDay[d].map(function (e) {
            if (e.kind === 'case') return '<div class="ev">' + h(e.subject) + '</div>';
            return '<div class="ev firm' + (e.done ? ' done' : '') + '"><div><b>All day</b> · ' + h(e.subject) + '<span class="rem">' + h(e.calendar) + ' · category ' + h(e.category) + ' · ' + h(e.body) + ' · ' + (e.reminderOn ? 'reminder ' + h(FO.fmtLong(e.reminderAt)) + ' (' + e.leadDays + ' days before)' : 'no reminder') + '</span></div></div>';
          }).join('') + '</div></div>';
        }).join('');
      }
      if (todos.length) main += '<div style="margin-top:14px">' + todos.map(function (t) { var od = !t.done && FO.cmp(t.date, S.today) < 0; return '<div class="todo' + (od ? ' overdue' : '') + (t.done ? ' done' : '') + '"><span class="cb' + (t.done ? ' on' : '') + '"></span><div>' + (t.done ? '<s>' + h(t.subject) + '</s>' : h(t.subject)) + '<span class="meta">' + (t.done ? 'completed ' + h(FO.fmtLong(t.completedOn)) + ' — moves to Outlook’s Completed list' : 'due ' + h(FO.fmtLong(t.date)) + (od ? ' — overdue, stays on every Outlook surface until completed' : '') + ' · reminder ' + h(FO.fmtLong(t.reminderAt))) + '</span></div></div>'; }).join('') + '</div>';
      main += '<div class="muted" style="margin-top:14px;font-size:11.5px">Keep-with-“Done — ”-prefix vs delete on done is HELD for your Outlook (spec §11 item 3); the mock shows the prefix. Whether Graph honours a reminder 30–180 days before an all-day event is a build-time check (FOM-8).</div>';
    }
    return '<div class="browser"><div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="url">outlook.office.com — projection (not a screenshot)</span></div><div class="fixbar">FIXTURE — the projection of what the app would push; every date invented.</div><div class="ol">' + side + main + '</div></div>';
  }

  /* ---------- the decision panel ---------- */
  var DEC = [
    { n: 0, q: 'Q-FO-0', title: 'The word', opts: [[1, '“Firm obligations” (the phrase he used at #137)', true], [2, '“Practice obligations”'], [3, '“Office obligations”'], [4, 'a word of his own']], key: 'd0', look: [['/cases', 'the card title'], ['/firm/obligations', 'the nav label and page title'], ['outlook', 'the event subject and body line']] },
    { n: 1, q: 'Q-FO-2(a),(c)', title: 'The closes', opts: [[1, 'As drafted — Done, and Not-applicable only where the duty can lapse', true], [2, 'As drafted PLUS a “delegated — waiting on <person>” marker (not a close)'], ['3a', 'Adjacent: Done always asks for a confirmation number on filings'], ['3b', 'Adjacent: no “not applicable” at all — retire and re-add']], key: 'd1', look: [['/firm/obligations', 'the Done / Not-applicable / Delegate buttons and the forms']], fom: ['FOM-11', 'FOM-12'] },
    { n: 2, q: 'Q-FO-2(b)', title: 'What a missed period does', opts: [[1, 'As drafted — filings serial, cadences collapse', true], [2, 'Serial for everything'], [3, 'Collapse for everything'], [4, 'A per-obligation choice with a different default, or a composite']], key: 'd2', look: [['/firm/obligations', 'mark the 2025 practice-time report Done: the 2026 report materializes at once (serial); mark the September reconciliation Done: one next occurrence (collapse)']], fom: ['FOM-1', 'FOM-4', 'FOM-10'] },
    { n: 3, q: 'Q-FO-1', title: 'Where it lives', opts: [[1, 'Two tables (the recommendation)', true], [2, 'Widen calendar_events'], [3, 'Two tables now, a read-only projection later'], [4, 'His own shape']], key: 'd3', look: [] },
    { n: 4, q: 'Q-FO-3', title: 'FO-5: per-firm or per-attorney, and who does the work', opts: [[1, 'The owner-scope field now; the assignee axis at multi-user', true], [2, 'No field until the multi-user phase'], [3, 'Per-user for everything (rejected as the lean)'], [4, 'Both axes now, or his own split']], key: 'd4', look: [['/firm/obligations', 'the owner badge — toggle the multi-user preview below to see the fan-out']], fom: ['FOM-15'] },
    { n: 5, q: 'Q-FO-4', title: 'FO-7: does FO-3’s QuickBooks limb fire?', opts: [[1, 'Thin, no hook; FO-7 closes on the two facts', true], [2, 'Thin, but reserve a nullable externalRef column now'], [3, 'The memo counts as “spec’d” — the slice carries an expense-side hook'], [4, 'His own reading of the condition']], key: 'd5', look: [['/firm/obligations', 'open a row’s Done form and its expander: the fields that exist under each reading']] },
    { n: 6, q: 'Q-FO-6', title: 'Weight', opts: [[1, 'Two classes; routine on the register only, never on the card (the composite)', true], [2, 'Two classes, both on the card'], [3, 'One class — date order alone'], [4, 'His own line']], key: 'd6', look: [['/cases', 'the card: which rows reach it'], ['/firm/obligations', 'the weight glyphs and the Overdue pin’s order']], fom: ['FOM-9', 'FOM-13', 'FOM-14'] },
    { n: 7, q: 'Q-FO-5', title: 'Outlook: the object, the calendar, the reminder', opts: [[1, 'An all-day event on the due date in a separate “MDBP Firm” calendar, reminder at the lead window', true], [2, 'A To Do task (new Tasks.ReadWrite consent)'], [3, 'The same “MDBP Cases” calendar with an “MDBP Firm” category'], [4, 'No push'], [5, 'A composite — event AND task, or his own']], key: 'd7', look: [['outlook', 'the projection under each option']], fom: ['FOM-8'] },
    { n: 8, q: 'Q-FO-7', title: 'The registry boundary', opts: [['a', 'Registry entries, a new file, drafts by a later Opus act, each UNVERIFIED', true], ['b', 'Source notes only'], ['c', 'Entries in an existing file'], ['d', 'His own boundary']], key: 'd8', look: [['/firm/obligations', 'open a row’s expander: the Source line under each reading']] },
    { n: 9, q: 'Q-FO-9 · Q-FO-8', title: 'Acquisitions, channels, and which templates', opts: null, key: null, look: [['/firm/obligations', 'the Add-obligation catalog (the templates as offered)']], fom: ['FOM-2', 'FOM-3', 'FOM-5', 'FOM-6', 'FOM-7'] },
    { n: 10, q: 'Q-FO-10', title: 'Rows', opts: [[1, 'Mint — FO-1–FO-7 and BR-3', true], [2, 'Mint only the ones still open after this sitting'], [3, 'Leave roomless'], [4, 'His own subset']], key: 'd10', look: [] }
  ];
  var FOM = {
    'FOM-1': { t: 'Collapse re-materializes too soon — and, completed early, the SAME date.', d: 'Spec §4.1 as written: the next occurrence is “the first rule date AFTER the completion date.” The September 5 reconciliation done October 2 → next October 5, three days away, lit at once (lead 5). Done EARLY on September 3 (FOD-15 allows it) → next is September 5 AGAIN; the same re-materialization happens to any annual or anniversary row under DECISION 2 option 3. PROPOSED, two limbs: a cadence completion closes the PERIOD it falls in (next = the first rule date in a later period); a dated kind under collapse never re-materializes its own date (next = the first rule date after the later of its due date and the completion). Interval kinds unaffected.', sw: 'collapsePeriod', swl: 'Render the PROPOSED rule instead of the spec as written' },
    'FOM-2': { t: '“Conditional on” mixes activation facts with per-period lapse.', d: 'The catalog marks conditionalPerPeriod on four rows (FOT-8, 13, 14, 17) — the mock renders exactly those four — yet the duty can lapse for a period on FOT-10 (property owned on January 1), FOT-11 (a bill issued), FOT-15 and FOT-16 (wages) too. PROPOSED: mark per-period lapse explicitly on every row where it can occur, and keep activation conditions (his facts) as a separate column.', sw: 'perPeriodFlags', swl: 'Render the PROPOSED flags (Not-applicable offered on FOT-10, 11, 15, 16 as well)' },
    'FOM-3': { t: 'A twelve-month view has no home for an occurrence beyond twelve months.', d: 'The notary commission (4 years), the assumed-name certificate (10) and the guardianship certificate (2) have next occurrences outside any month group. PROPOSED (rendered): a “Later” group at the foot, Done still allowed there (FOD-15).' },
    'FOM-4': { t: 'Activation cannot know a period missed BEFORE activation.', d: 'Spec §4.1 states the first occurrence for anniversary kinds (“the first due date on or after today”) and is silent for the fixed kinds; the mock applies the same rule to them as its own default. Either way a report never filed for 2025 and activated in September 2026 materializes 2026 and never knows about 2025 — the sheet’s example (“finishing the 2025 practice-time report in 2027”) can only arise for a period missed AFTER activation. PROPOSED (rendered in Activate…): an optional “last period completed” at activation; if given, the first occurrence is the period after it, possibly already overdue.' },
    'FOM-5': { t: 'Where inactive obligations live is unstated.', d: 'Rows “created inactive” (IOLTA certification, the two key rotations, DMARC, BOI) and retired rows need a place. PROPOSED (rendered): an Inactive section at the foot of the register with [Activate…] taking his date (FOD-9); templates never added live only in the catalog picker.' },
    'FOM-6': { t: 'Month precision and the lead window interact, and the spec picks the 1st regardless.', d: 'FOD-17: a month-precision row “lights on the 1st.” For bar dues with a 45-day lead that is LATER than the lead would give (June 1 vs May 16); for a 5-day lead it is earlier. PROPOSED: the earlier of the 1st and due − lead — imprecision never shortens a lead.', sw: 'precisionEarlier', swl: 'Render the PROPOSED rule (the earlier of the two)' },
    'FOM-7': { t: 'periodLabel is undefined for interval and one-time kinds.', d: 'PROPOSED: “by <due date>” for interval-from-completion; the year for one-time.' },
    'FOM-8': { t: 'Build-time verification, not a design change: the reminder beyond two weeks.', d: 'Outlook’s reminder presets for events stop at two weeks; whether Graph honours reminderMinutesBeforeStart of 30–180 days on an all-day event must be proved in the slice’s tests before FOD-10 is relied on. If it does not, the lit moment needs another carrier (a To Do task, or a second “lead” event).' },
    'FOM-9': { t: 'The spec fixes no order INSIDE the Overdue pin; the mock chose most-overdue-first.', d: 'Spec §4.3 says overdue items are “rendered first … with the day count” and §4.4 that hard sorts above routine “at equal due proximity” — nothing orders the pin itself. The mock renders most-overdue-first, weight breaking ties, so a routine item 31 days overdue sits above a hard item 27 days overdue. Put for his eye; the alternative is hard-first inside the pin, then by days.', sw: 'pinHardFirst', swl: 'Render hard-first inside the Overdue pin' },
    'FOM-10': { t: 'Clarification: a backlog under serial is cleared one Done at a time.', d: 'Stated obliquely — the sheet’s “and so on until he is current”, §4.1’s “never skipped silently” — and implied by the one-open invariant (FOD-5): each Done materializes the next already-overdue period; two years behind is two clicks. PROPOSED: one plain sentence in §4.1, so the walk does not read it as a defect.' },
    'FOM-11': { t: 'Undo “within the same period” (§4.2) vs FOD-7’s “while the next occurrence is untouched.”', d: 'The second is the operable test and the one rendered here (Undo appears only on the close whose materialized next is still untouched; otherwise the row says so). PROPOSED: drop the period phrase.' },
    'FOM-12': { t: 'FOD-1 exempts only the weekend; Monday prints “overdue” though a roll may make Monday the due day.', d: 'FOD-1: “no ‘overdue’ label printed on the weekend after a Saturday date … the display says a next-business-day rule may apply and is not computed.” Rendered as written: on the Sunday after a Saturday due date the row stays lit with the note; on Monday “2 days overdue” prints — which is itself a conclusion the display was told not to draw. PROPOSED: either the exemption runs through the next business day, or the label on a weekend-dated occurrence reads “past its date — a next-business-day rule may apply; not computed” until done, never “overdue”. (Found by the adversarial audit of the mock.)' },
    'FOM-13': { t: 'The card’s horizon: “due within 14 days” or “lit and due within 14 days”?', d: 'FOD-14 says the card carries hard items “overdue + due within 14 days”; §4.3 says “Nothing lit or overdue → the card renders NOTHING.” The two disagree for a short-lead row: the trust reconciliation (lead 5) is due within 14 days for nine days before it lights. The mock renders the conjunctive reading (the card never shows what the register has not lit); the switch renders FOD-14 literally. PROPOSED: the conjunctive reading, stated in FOD-14. (Found by the adversarial audit of the mock.)', sw: 'cardWindowLiteral', swl: 'Render FOD-14 literally (within 14 days even before the lead lights it)' },
    'FOM-14': { t: 'The register’s horizon is stated two ways.', d: '§4.3: “The lead window is the register’s horizon”; §5.2: “a twelve-month view, every active obligation’s next occurrence grouped by month.” The mock renders §5.2 (every open occurrence, pending rows in grey). PROPOSED: reword §4.3 — the register shows every open occurrence; lit and overdue are what it emphasizes. (Found by the adversarial audit of the mock.)' },
    'FOM-15': { t: 'The owner column at the solo stage is stated two ways.', d: '§5.2 lists “owner (only when it is not the firm)” on every register line; §10 says the field “changes NOTHING on screen” at the solo stage. The mock follows §10 (no owner badge at the solo stage under any reading; badges appear only in the multi-user preview). PROPOSED: §5.2’s parenthetical becomes “only once more than one licensed user exists”. (Found by the adversarial audit of the mock.)' }
  };
  function decisionPanel() {
    if (S.decision === 11) return '<div class="qid">HELD · CC-1(b)</div><h2>Not on the sheet — held for the product</h2><div class="sheet"><div class="cap">The sheet’s foot, verbatim at HEAD 8f7467b</div>' + (SHEET.held ? SHEET.held.html : '') + '</div><div class="note">The mock renders DEFAULTS for these (the card’s wording and position, the register’s shape, the Outlook subject, the leads) so the eleven decisions can be seen in context — it does not put them. They wait for the module on fixtures in demo mode, the same gate as FO-6.</div>';
    if (S.decision === 12) return '<div class="qid">FOM-1 … FOM-15 · PROPOSED</div><h2>Everything building the mock exposed</h2><div class="note">Each is a spec ambiguity or defect the rendering forced into the open. All PROPOSED — his adopt / reject / edit, one at a time, attached to the decision it belongs to (the companion doc §4 maps them). Switches marked “Render the PROPOSED rule” change what the register does.</div><div class="fom">' + Object.keys(FOM).map(fomItem).join('') + '</div>';
    var dec = DEC[S.decision], sh = SHEET['d' + dec.n] || {};
    var html = '<div class="qid">DECISION ' + dec.n + ' · ' + h(dec.q) + '</div><h2>' + h(dec.title) + '</h2>';
    if (sh.html) html += '<div class="sheet"><div class="cap">The sheet’s text, verbatim at HEAD 8f7467b — the sheet governs</div>' + sh.html + '</div>';
    if (dec.opts) {
      html += '<div class="cap small muted" style="text-transform:uppercase;letter-spacing:.6px;font-size:10.5px">Render each starting point — options are a way of asking, never a menu (CC-1(a))</div><div class="opts">' + dec.opts.map(function (o) {
        var on = String(S.d[dec.key]) === String(o[0]);
        return '<label class="' + (on ? 'on' : '') + '"><input type="radio" name="dec" value="' + h(o[0]) + '"' + (on ? ' checked' : '') + '><span>(' + h(o[0]) + ') ' + h(o[1]) + (o[2] ? '<span class="lean">Claude’s lean</span>' : '') + '</span></label>';
      }).join('') + '</div>';
      if (dec.n === 0 && S.d.d0 == 4) html += '<div class="custom"><input type="text" id="d0custom" placeholder="his word" value="' + h(S.d.d0custom) + '"></div>';
      if (dec.n === 3) html += schematic();
      if (dec.n === 6 || dec.n === 0) html += '<label class="small" style="display:flex;gap:8px;align-items:center;margin:6px 0 10px"><input type="checkbox" id="cardAbove"' + (S.cardAbove ? ' checked' : '') + '> Show the card ABOVE the legal-watch card <span class="muted">(position is a hands-on item — both are shown for context, neither is proposed)</span></label>';
      if (dec.n === 4) html += '<label class="small" style="display:flex;gap:8px;align-items:center;margin:6px 0 10px"><input type="checkbox" id="mu"' + (S.multiUser ? ' checked' : '') + '> Multi-user preview — two fictional licensees, “Attorney A” and “Attorney B”</label>';
      if (dec.n === 10) html += '<div class="note">Nothing renders for this decision — it is a register act. The eleven Q-FO rows exist since batch 92; FO-1–FO-7 and BR-3 have none.</div>';
    }
    if (dec.n === 9) html += worksheetHTML();
    if (dec.look && dec.look.length) html += '<div class="see"><span class="small muted">Look at: </span>' + dec.look.map(function (l) { return '<button data-look="' + h(l[0]) + '" title="' + h(l[1]) + '">' + h(l[0] === 'outlook' ? 'Outlook' : l[0]) + '</button><span class="small muted">' + h(l[1]) + '</span><br>'; }).join('') + '</div>';
    if (dec.fom && dec.fom.length) html += '<div class="fom"><h3>What building the mock exposed — PROPOSED, his adopt / reject / edit</h3>' + dec.fom.map(fomItem).join('') + '</div>';
    return html;
  }
  function fomItem(id) {
    var f = FOM[id]; if (!f) return '';
    return '<div class="it"><b>' + h(id) + '</b> ' + h(f.t) + '<div class="small muted" style="margin-top:4px">' + h(f.d) + '</div>' + (f.sw ? '<label><input type="checkbox" data-fom="' + h(f.sw) + '"' + (S.fom[f.sw] ? ' checked' : '') + '> ' + h(f.swl) + '</label>' : '') + '</div>';
  }
  function schematic() {
    var two = S.d.d3 == 1 || S.d.d3 == 3;
    return '<div class="schem"><div class="tbl' + (two ? '' : ' dim') + '"><b>firm_obligations</b>id · name · category · owner_scope · owner_user_id · recurrence jsonb · missed_periods · conditional_per_period · lead_days · weight · source_note · notes · active · created_by …</div><div class="tbl' + (two ? '' : ' dim') + '"><b>firm_obligation_occurrences</b>id · obligation_id → · period_label · due_on · due_on_override · state open|done · done_on · done_by · outcome · outcome_reason · done_note · filed_at' + (S.d.d5 == 2 ? ' · external_ref' : '') + ' · outlook_event_id · sync_status · sync_error · last_sync_at</div>' +
      '<div class="tbl' + (two ? ' dim' : '') + '" style="grid-column:1/-1"><b>calendar_events (widened — option 2)</b>… case_id <i>nullable</i> · scope matter|firm · + every occurrence column above, unused by every existing row; a null check on every existing reader</div>' + (S.d.d3 == 3 ? '<div class="tbl" style="grid-column:1/-1"><b>+ a read-only projection</b> into a firm-wide calendar list, later, if one is built</div>' : '') + '</div><div class="note">Nothing is migrated by the answer; it shapes the slice. The review_log.action CHECK is widened in the same migration (FOD-6).</div>';
  }
  function worksheetHTML() {
    var html = '<div class="note">Part B, on the sheet: “Which of these are OFFERED in the register, and which are ACTIVE at go-live?” — a list, a rule, or a composite. Tick here; the summary below is yours to paste into the ledger. Dates are never asked (FOD-9). Weight overrides only where you disagree.</div><div style="max-height:360px;overflow:auto;border:1px solid var(--wb-line);background:#fff;border-radius:6px"><table class="ws"><thead><tr><th>Row</th><th>Template</th><th>Spec’s weight</th><th>Source of weight</th><th>Offered / Active / Neither</th><th>Weight</th></tr></thead><tbody>' +
      WS_ROWS.map(function (r) {
        var w = S.ws[r.id] || {}; var v = w.v || '';
        return '<tr><td class="id">' + h(r.id) + '</td><td>' + r.template + '</td><td>' + r.weight + '</td><td class="small muted">' + r.source + '</td><td class="ch">' + ['O', 'A', 'N'].map(function (x) { return '<label><input type="radio" name="ws-' + h(r.id) + '" value="' + x + '"' + (v === x ? ' checked' : '') + '> ' + ({ O: 'offered', A: 'active', N: 'neither' })[x] + '</label>'; }).join('') + '</td><td><select data-wsw="' + h(r.id) + '"><option value=""' + (!w.w ? ' selected' : '') + '>as spec’d</option><option value="hard"' + (w.w === 'hard' ? ' selected' : '') + '>hard</option><option value="routine"' + (w.w === 'routine' ? ' selected' : '') + '>routine</option></select></td></tr>';
      }).join('') + '</tbody></table></div><div style="margin-top:8px"><textarea class="sum" id="wssum" readonly>' + h(wsSummary()) + '</textarea><div style="margin-top:6px;display:flex;gap:6px"><button class="btn small secondary" id="wscopy">Copy summary</button><button class="btn small secondary" id="wsreset">Reset</button></div></div>';
    return html;
  }
  function wsSummary() {
    var off = [], act = [], nei = [], wc = [];
    WS_ROWS.forEach(function (r) { var w = S.ws[r.id] || {}; if (w.v === 'O') off.push(r.id); if (w.v === 'A') act.push(r.id); if (w.v === 'N') nei.push(r.id); if (w.w) wc.push(r.id + ' → ' + w.w); });
    return 'DECISION 9 Part B — worksheet (' + S.today + ' fixture clock; typed by Michael in the mock)\nOffered (register only): ' + (off.join(', ') || '—') + '\nActive at go-live: ' + (act.join(', ') || '—') + '\nNeither: ' + (nei.join(', ') || '—') + '\nWeight changes: ' + (wc.join('; ') || 'none') + '\nDates and per-period conditions: entered at activation, in the product (FOD-9).';
  }

  /* ---------- actions ---------- */
  function occ(id) { return S.data.occurrences.filter(function (o) { return o.id === id; })[0]; }
  function nextOf(oc) { return S.data.occurrences.filter(function (o) { return o.obligationId === oc.obligationId && o.state === 'open'; })[0]; }
  function nextFor(oc) { return oc.nextId ? S.data.occurrences.filter(function (o) { return o.id === oc.nextId; })[0] : undefined; }
  function act(name, el) {
    var id = el.getAttribute('data-oc'), obId = el.getAttribute('data-ob'), oc = id ? occ(id) : null, ob = oc ? withEff(S.data.obligations[oc.obligationId]) : (obId ? withEff(S.data.obligations[obId]) : null);
    switch (name) {
      case 'exp': S.expanded[id] = !S.expanded[id]; if (!S.expanded[id] && S.form && S.form.oc === id) S.form = null; break;
      case 'done': case 'na': case 'delegate': case 'override': S.expanded[id] = true; S.form = { kind: name, oc: id }; break;
      case 'cancel': S.form = null; break;
      case 'catalog': S.form = { kind: 'catalog' }; break;
      case 'activate': {
        var oba = S.data.obligations[obId];
        if (oba.activatedInFixture && S.data.occurrences.some(function (o) { return o.obligationId === obId && o.state === 'open'; })) { oba.active = true; log({ entityType: 'firm_obligation', entityId: obId, action: 'edited', at: S.today, note: 'Un-retired — the open occurrence was never closed by the retirement (FOD-8)' }); break; }
        S.form = { kind: 'activate', ob: obId }; break;
      }
      case 'retire': { var o2 = S.data.obligations[obId]; o2.active = false; log({ entityType: 'firm_obligation', entityId: obId, action: 'edited', at: S.today, note: 'Retired — the open occurrence stays lit until done (FOD-8); no next materializes' }); break; }
      case 'undo': {
        var nx = nextFor(oc);
        try { var r = FO.undo(ob, oc, nx, S.today, !!nextOf(oc)); if (r.deletedNext && nx) S.data.occurrences = S.data.occurrences.filter(function (o) { return o.id !== nx.id; }); if (S.data.obligations[oc.obligationId].kind === 'one-time') { S.data.obligations[oc.obligationId].active = true; } log(r.log); syncNote(oc, 'reverted'); }
        catch (e) { log({ entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'refused', at: S.today, note: e.message }); }
        break;
      }
      case 'submit': submitForm(); break;
      case 'submit-activate': submitActivate(obId); break;
    }
    render();
  }
  function syncNote(oc, what) { oc.syncStatus = what; }
  function submitForm() {
    var f = S.form, root = $('.exp .form') || $('#activate'); if (!f || !root) return;
    var oc = occ(f.oc), ob = withEff(S.data.obligations[oc.obligationId]); var v = function (n) { var e = root.querySelector('[name="' + n + '"]'); return e ? e.value.trim() : ''; };
    try {
      if (f.kind === 'done') {
        if (S.d.d1 == '3a' && isFiling(ob) && !v('confirmation')) throw new Error('a confirmation number is required on a filing (DECISION 1 option 3)');
        var r = FO.markDone(ob, oc, { today: S.today, doneOn: v('doneOn') || S.today, doneNote: [v('doneNote'), v('confirmation') ? 'conf. ' + v('confirmation') : ''].filter(Boolean).join(' · '), filedAt: v('filedAt'), externalRef: v('externalRef') }, opts());
        if (r.next) { S.data.occurrences.push(r.next); log({ entityType: 'firm_obligation_occurrence', entityId: r.next.id, action: 'created', at: S.today, note: 'Next occurrence materialized: ' + r.next.periodLabel + ', due ' + r.next.dueOn + ' (' + ob.missedPeriods + ')' }); }
        if (r.retiresObligation) { S.data.obligations[oc.obligationId].active = false; log({ entityType: 'firm_obligation', entityId: oc.obligationId, action: 'edited', at: S.today, note: 'One-time obligation done — retires itself (§3.2); history stays in Inactive' }); }
        log(r.log);
      } else if (f.kind === 'na') {
        var r2 = FO.markNotApplicable(ob, oc, { today: S.today, outcomeReason: v('outcomeReason'), doneNote: v('doneNote') }, opts());
        if (r2.next) { S.data.occurrences.push(r2.next); log({ entityType: 'firm_obligation_occurrence', entityId: r2.next.id, action: 'created', at: S.today, note: 'Next occurrence materialized: ' + r2.next.periodLabel + ', due ' + r2.next.dueOn }); }
        if (r2.retiresObligation) { S.data.obligations[oc.obligationId].active = false; }
        log(r2.log);
      } else if (f.kind === 'delegate') {
        if (!v('delegatedTo')) throw new Error('name who has it');
        oc.delegatedTo = v('delegatedTo'); log({ entityType: 'firm_obligation_occurrence', entityId: oc.id, action: 'edited', at: S.today, note: 'Delegated to ' + oc.delegatedTo + ' — still open, still lit' });
      } else if (f.kind === 'edit') {
        var base = S.data.obligations[oc.obligationId], lead = parseInt(v('leadDays'), 10);
        if (isNaN(lead) || lead < 0) throw new Error('the lead is a number of days');
        var wasLead = base.leadDays, wasW = base.weight; base.leadDays = lead; base.weight = v('weight') || base.weight;
        log({ entityType: 'firm_obligation', entityId: base.id, action: 'edited', at: S.today, note: 'Lead ' + wasLead + ' → ' + lead + ' days; weight ' + wasW + ' → ' + base.weight + ' — the open occurrence re-evaluated (FOD-4)' });
      } else if (f.kind === 'override') {
        var r3 = FO.applyOverride(ob, oc, v('newDate'), S.today);
        if (!r3.applied) throw new Error('refused — ' + r3.reason);
        log(r3.log);
      }
      S.form = null;
    } catch (e) { f.error = e.message; }
  }
  function submitActivate(obId) {
    var ob = S.data.obligations[obId], root = $('#activate'); var v = function (n) { var e = root.querySelector('[name="' + n + '"]'); return e ? e.value.trim() : ''; };
    try {
      if (ob.kind === 'anniversary') { if (!v('anchorDate')) throw new Error('the anchor date is yours — enter it (FOD-9)'); ob.rule.anchorDate = v('anchorDate'); }
      if (ob.kind === 'one-time') { if (!v('dueOn')) throw new Error('the date is yours — enter it (FOD-9)'); ob.rule.dueOn = v('dueOn'); }
      if (ob.kind === 'interval-from-completion') ob.lastDone = v('lastDone') || null;
      if (v('lastPeriodDue')) ob.lastPeriodDue = v('lastPeriodDue');
      ob.active = true; ob.activatedInFixture = true;
      if (S.data.occurrences.some(function (o) { return o.obligationId === obId && o.state === 'open'; })) { S.form = null; return; }   // an open occurrence already exists: nothing materializes
      var first = FO.firstOccurrence(withEff(ob), S.today, { fomActivationLastCompleted: !!ob.lastPeriodDue });
      if (first) { S.data.occurrences.push(first); log({ entityType: 'firm_obligation', entityId: obId, action: 'created', at: S.today, note: 'Activated; first occurrence ' + first.periodLabel + ' due ' + first.dueOn }); }
      S.form = null;
    } catch (e) { S.form.error = e.message; }
  }

  /* ---------- render ---------- */
  function render() {
    var stage = $('#stage'), panel = $('#panel');
    var tabs = '<div class="stage-tabs">' + [['cases', '/cases'], ['register', '/firm/obligations'], ['outlook', 'Outlook']].map(function (t) { return '<button data-screen="' + t[0] + '" class="' + (S.screen === t[0] ? 'on' : '') + '">' + h(t[1]) + '</button>'; }).join('') + '<span class="hint">' + h(S.data.label) + ' · ' + h(S.data.note) + '</span></div>';
    stage.innerHTML = tabs + (S.screen === 'cases' ? renderCases() : S.screen === 'register' ? renderRegister() : renderOutlook());
    panel.innerHTML = decisionPanel();
    $$('.wb-rail button[data-dec]').forEach(function (b) { b.classList.toggle('on', Number(b.getAttribute('data-dec')) === S.decision); });
    $('#today').value = S.today; $('#fixture').value = S.fixture;
    if (S.hl) { var t = $('.hl-target'); if (t && t.scrollIntoView) t.scrollIntoView({ block: 'center' }); S.hl = null; }
    persist();
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act],[data-go],[data-screen],[data-dec],[data-look],#wscopy,#wsreset'); if (!el) return;
    if (el.hasAttribute('data-act')) { e.preventDefault(); act(el.getAttribute('data-act'), el); return; }
    if (el.hasAttribute('data-go')) { e.preventDefault(); var g = el.getAttribute('data-go'); S.screen = g === '/firm/obligations' ? 'register' : g === '/cases' ? 'cases' : S.screen; render(); return; }
    if (el.hasAttribute('data-screen')) { S.screen = el.getAttribute('data-screen'); render(); return; }
    if (el.hasAttribute('data-dec')) { S.decision = Number(el.getAttribute('data-dec')); render(); return; }
    if (el.hasAttribute('data-look')) { var l = el.getAttribute('data-look'); S.screen = l === 'outlook' ? 'outlook' : l === '/cases' ? 'cases' : 'register'; render(); return; }
    if (el.id === 'wscopy') { var ta = $('#wssum'); ta.select(); try { navigator.clipboard.writeText(ta.value); } catch (x) {} return; }
    if (el.id === 'wsreset') { S.ws = {}; render(); return; }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'dec') { var dec = DEC[S.decision]; if (dec.key) { S.d[dec.key] = isNaN(Number(t.value)) ? t.value : Number(t.value); if (dec.n === 1 && t.value === '3b') { S.data.occurrences.forEach(function () {}); } render(); } return; }
    if (t.id === 'd0custom') { S.d.d0custom = t.value; render(); return; }
    if (t.id === 'mu') { S.multiUser = t.checked; render(); return; }
    if (t.id === 'cardAbove') { S.cardAbove = t.checked; S.screen = 'cases'; render(); return; }
    if (t.hasAttribute('data-fom')) { S.fom[t.getAttribute('data-fom')] = t.checked; render(); return; }
    if (t.id === 'today') { if (/^\d{4}-\d{2}-\d{2}$/.test(t.value)) { S.today = t.value; render(); } return; }
    if (t.id === 'fixture') { loadFixture(t.value); render(); return; }
    if (t.name && t.name.indexOf('ws-') === 0) { var id = t.name.slice(3); S.ws[id] = S.ws[id] || {}; S.ws[id].v = t.value; $('#wssum').value = wsSummary(); persist(); return; }
    if (t.hasAttribute('data-wsw')) { var id2 = t.getAttribute('data-wsw'); S.ws[id2] = S.ws[id2] || {}; S.ws[id2].w = t.value || null; $('#wssum').value = wsSummary(); persist(); return; }
  });
  document.addEventListener('input', function (e) { if (e.target.id === 'd0custom') { S.d.d0custom = e.target.value; $$('.sidebar nav a[data-go="/firm/obligations"]').forEach(function (a) { a.textContent = navLabel(); }); } });
  $$('[data-quick]').forEach(function (b) { b.addEventListener('click', function () { var q = b.getAttribute('data-quick'); S.today = q === 'fixture' ? S.data.today : q; render(); }); });
  render();
})();
