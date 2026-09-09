import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("/home/claude/.npm-global/lib/node_modules/playwright");
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1480, height: 1000 } });
const errs = []; pg.on('pageerror', e => errs.push('pageerror: ' + e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await pg.goto('file:///home/claude/mock/dist/firm-obligations-mock-2026-09-08.html'); await pg.waitForTimeout(200);
const names = async () => pg.$$eval('tr.oc td.name .nm', els => els.map(e => e.textContent));
const clickRowBtn = async (prefix, act) => { const rows = await pg.$$('tr.oc'); for (const r of rows) { const nm = await r.$eval('td.name .nm', e => e.textContent).catch(() => ''); if (nm.startsWith(prefix)) { const bt = await r.$(`button[data-act="${act}"]`); if (bt) { await bt.click(); return true; } } } return false; };
// 1) Done on TIDC twice → then Undo only on the latest
await clickRowBtn('TIDC', 'done'); await pg.click('button[data-act="submit"]'); await pg.waitForTimeout(80);
await clickRowBtn('TIDC', 'done'); await pg.click('button[data-act="submit"]'); await pg.waitForTimeout(80);
await clickRowBtn('TIDC', 'exp'); await pg.waitForTimeout(80);
const undos = await pg.$$eval('button[data-act="undo"]', els => els.length); const closed = await pg.$$eval('.hist .small.muted', els => els.filter(e => e.textContent.includes('undo closed')).length);
console.log('after two Dones: Undo buttons', undos, '| "undo closed" notes', closed);
await pg.click('button[data-act="undo"]'); await pg.waitForTimeout(80);
const tidcOpen = (await pg.$$eval('tr.oc td.name', els => els.map(e => e.textContent).filter(t => t.startsWith('TIDC')))); console.log('TIDC open rows after undo:', JSON.stringify(tidcOpen));
// 2) Retire the trust reconciliation: stays in Overdue, marked
await clickRowBtn('Trust-account', 'exp'); await pg.waitForTimeout(50); await clickRowBtn('Trust-account', 'retire'); await pg.waitForTimeout(80);
const trust = await pg.$$eval('tr.oc td.name', els => els.map(e => e.textContent).filter(t => t.startsWith('Trust-account'))); console.log('trust after retire:', JSON.stringify(trust));
// 3) one-time Done: lease → Inactive with history
await pg.click('button[data-quick="2026-12-28"]'); await pg.waitForTimeout(80);
await clickRowBtn('Office lease', 'done'); await pg.click('button[data-act="submit"]'); await pg.waitForTimeout(80);
const inactive = await pg.$$eval('.reg-group:last-of-type tr.oc td.name', els => els.map(e => e.textContent)); console.log('inactive section:', JSON.stringify(inactive));
// 4) FOD-1 Sunday: 941 due Sat Oct 31 → Nov 1
await pg.fill('#today', '2026-11-01'); await pg.$eval('#today', e => e.dispatchEvent(new Event('change', { bubbles: true }))); await pg.waitForTimeout(80);
const f941 = await pg.$$eval('tr.oc', rows => rows.filter(r => r.textContent.includes('Form 941')).map(r => r.querySelector('.badge').textContent + ' | ' + (r.textContent.includes('weekend exemption') ? 'note' : 'no note')));
console.log('941 on Sunday Nov 1:', JSON.stringify(f941));
// 5) edit form + multi-user + worksheet + outlook todo done
await pg.click('button[data-dec="4"]'); await pg.click('#mu'); await pg.waitForTimeout(80);
const owners = await pg.$$eval('.badge.owner', els => els.length); console.log('owner badges under multi-user preview:', owners);
await pg.click('button[data-dec="7"]'); await pg.click('label.opts input[value="2"], .opts input[value="2"]').catch(async () => { const r = await pg.$$('.opts input'); await r[1].click(); }); await pg.waitForTimeout(80);
await pg.click('button[data-screen="outlook"]'); await pg.waitForTimeout(80);
const todos = await pg.$$eval('.ol .todo', els => els.length), doneTodos = await pg.$$eval('.ol .todo.done', els => els.length); console.log('todos', todos, 'completed', doneTodos);
await pg.screenshot({ path: 'dist/look-4-after-fixes.png' });
console.log('errors:', errs.length ? errs : 'none');
await b.close();
