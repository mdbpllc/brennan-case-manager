import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("/home/claude/.npm-global/lib/node_modules/playwright");
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1480, height: 1000 } });
const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await pg.goto('file:///home/claude/mock/dist/firm-obligations-mock-2026-09-08.html'); await pg.waitForTimeout(200);
const setToday = async d => { await pg.fill('#today', d); await pg.$eval('#today', e => e.dispatchEvent(new Event('change', { bubbles: true }))); await pg.waitForTimeout(80); };
const rowBtn = async (prefix, act) => { for (const r of await pg.$$('tr.oc')) { const nm = await r.$eval('td.name .nm', e => e.textContent).catch(() => ''); if (nm.startsWith(prefix)) { const bt = await r.$(`button[data-act="${act}"]`); if (bt) { await bt.click(); return true; } } } return false; };
// H-1: Sunday Nov 1 — 941 on the card and in the current month
await setToday('2026-11-01');
const grp = await pg.$$eval('.reg-group', gs => gs.filter(g => g.textContent.includes('Form 941')).map(g => g.querySelector('h4').textContent.slice(0, 10)));
await pg.click('button[data-screen="cases"]'); await pg.waitForTimeout(60);
const card = await pg.$eval('#fo-card', e => e.textContent);
console.log('H-1: 941 group', JSON.stringify(grp), '| on card:', card.includes('Form 941'));
await pg.click('button[data-screen="register"]'); await setToday('2026-10-02');
// H-2: retire trust → Done → Re-activate → Undo must be refused
await rowBtn('Trust-account', 'exp'); await pg.waitForTimeout(50); await pg.click('button[data-act="retire"]'); await pg.waitForTimeout(60);
await rowBtn('Trust-account', 'done'); await pg.click('button[data-act="submit"]'); await pg.waitForTimeout(60);
// re-activate from Inactive (the form), then look at the history's undo control
for (const r of await pg.$$('tr.oc')) { const nm = await r.$eval('td.name .nm', e => e.textContent).catch(() => ''); if (nm.startsWith('Trust-account')) { const bt = await r.$('button[data-act="activate"]'); if (bt) { await bt.click(); break; } } }
await pg.waitForTimeout(60); await pg.click('button[data-act="submit-activate"]'); await pg.waitForTimeout(80);
await rowBtn('Trust-account', 'exp'); await pg.waitForTimeout(60);
const undoBtns = await pg.$$eval('button[data-act="undo"]', els => els.length); const closedNote = await pg.$$eval('.hist .small.muted', els => els.filter(e => e.textContent.includes('undo closed')).length);
const openTrust = await pg.$$eval('tr.oc td.name .nm', els => els.map(e => e.textContent).filter(t => t.startsWith('Trust-account')).length);
console.log('H-2: after Retire→Done→Re-activate: Undo buttons', undoBtns, '| undo-closed notes', closedNote, '| open trust rows', openTrust);
// M-2: option 3 fans out every row under the preview
await pg.click('button[data-dec="4"]'); const rad = await pg.$$('.opts input'); await rad[2].click(); await pg.waitForTimeout(50); await pg.click('#mu'); await pg.waitForTimeout(80);
const pir = await pg.$$eval('tr.oc td.name .nm', els => els.map(e => e.textContent).filter(t => t.startsWith('Public Information')).length);
console.log('M-2: PIR rows under option 3 + preview:', pir);
await pg.click('#mu'); await rad[0].click(); await pg.waitForTimeout(50);
const solo = await pg.$$eval('.badge.owner', els => els.length); console.log('L-5: owner badges at solo:', solo);
console.log('errors:', errs.length ? errs : 'none'); await b.close();
