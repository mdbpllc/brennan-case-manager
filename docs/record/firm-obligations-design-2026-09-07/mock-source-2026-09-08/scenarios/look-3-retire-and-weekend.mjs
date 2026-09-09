import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("/home/claude/.npm-global/lib/node_modules/playwright");
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1480, height: 1000 } });
const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await pg.goto('file:///home/claude/mock/dist/firm-obligations-mock-2026-09-08.html'); await pg.waitForTimeout(200);
// expand the trust row, click Retire in its expander
const rows = await pg.$$('tr.oc'); for (const r of rows) { const nm = await r.$eval('td.name .nm', e => e.textContent).catch(() => ''); if (nm.startsWith('Trust-account')) { await (await r.$('button[data-act="exp"]')).click(); break; } }
await pg.waitForTimeout(60); await pg.click('button[data-act="retire"]'); await pg.waitForTimeout(80);
const trust = await pg.$$eval('tr.oc td.name', els => els.map(e => e.textContent).filter(t => t.startsWith('Trust-account'))); console.log('trust after retire:', JSON.stringify(trust));
const grp = await pg.$$eval('.reg-group', gs => gs.filter(g => g.textContent.includes('Trust-account')).map(g => g.querySelector('h4').textContent.slice(0, 12))); console.log('in groups:', JSON.stringify(grp));
// Done on the retired row → no next; then it appears in Inactive
const rows2 = await pg.$$('tr.oc'); for (const r of rows2) { const nm = await r.$eval('td.name .nm', e => e.textContent).catch(() => ''); if (nm.startsWith('Trust-account')) { await (await r.$('button[data-act="done"]')).click(); break; } }
await pg.waitForTimeout(60); await pg.click('button[data-act="submit"]'); await pg.waitForTimeout(80);
const trust2 = await pg.$$eval('tr.oc td.name', els => els.map(e => e.textContent).filter(t => t.startsWith('Trust-account'))); console.log('trust after Done on the retired row:', JSON.stringify(trust2));
await pg.fill('#today', '2026-11-01'); await pg.$eval('#today', e => e.dispatchEvent(new Event('change', { bubbles: true }))); await pg.waitForTimeout(80);
const f941 = await pg.$$eval('tr.oc', rs => rs.filter(r => r.textContent.includes('Form 941')).map(r => r.querySelector('.badge').textContent)); console.log('941 badge on Sunday:', JSON.stringify(f941));
console.log('errors:', errs.length ? errs : 'none'); await b.close();
