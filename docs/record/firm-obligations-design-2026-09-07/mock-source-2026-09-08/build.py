#!/usr/bin/env python3
"""Assemble the firm-obligations mock: one self-contained HTML file.
The ruling sheet's DECISION texts and its Part B table are extracted VERBATIM from the sheet at HEAD (path below) and
injected as data, so the mock quotes the sheet rather than paraphrasing it. Two outputs: the artifact body (no document
skeleton — the Artifact tool wraps it) and a standalone file (complete document) for the repo and the download."""
import re, json, html, hashlib, sys, os
ROOT = os.path.dirname(os.path.abspath(__file__))
SHEET_PATH = '/home/claude/repo/docs/specs/firm-obligations-ruling-sheet-2026-09-07.md'
sheet = open(SHEET_PATH, encoding='utf-8').read()
sheet_sha = hashlib.sha256(sheet.encode('utf-8')).hexdigest()

def inline(md):
    s = html.escape(md, quote=False)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', s)
    s = s.replace('______', '<span style="display:inline-block;min-width:120px;border-bottom:1px solid #999">&nbsp;</span>')
    return s

# split into sections on level-2 headings
secs = re.split(r'(?m)^(?=## )', sheet)
decisions, ws_rows, held = {}, [], []
for sec in secs:
    m = re.match(r'## DECISION (\d+) — (.*)', sec)
    if m:
        n = int(m.group(1)); body_lines = sec.split('\n')[1:]
        paras, table = [], []
        for ln in body_lines:
            if ln.startswith('|'):
                table.append(ln)
            elif ln.strip():
                paras.append(ln.strip())
        heading = inline(sec.split('\n')[0][3:])
        out = ['<p><b>' + heading + '</b></p>']
        for p in paras:
            if p.startswith('**Michael:**'):
                out.append('<p class="small muted">' + inline(p) + '</p>')
            else:
                out.append('<p>' + inline(p) + '</p>')
        if table and n == 9:
            rows = [r for r in table if not re.match(r'^\|\s*-', r)][1:]  # drop the header and the rule row
            for r in rows:
                cells = [c.strip() for c in r.strip().strip('|').split('|')]
                if len(cells) >= 4:
                    ws_rows.append({'id': html.unescape(re.sub(r'`', '', cells[0])), 'template': inline(cells[1]), 'weight': inline(cells[2]), 'source': inline(cells[3])})
            out.append('<p class="small muted">(The Part B table is rendered as the worksheet below, row for row.)</p>')
        decisions['d%d' % n] = {'html': '\n'.join(out)}
    elif sec.startswith('## NOT ON THIS SHEET'):
        heading = inline(sec.split('\n')[0][3:])
        paras = [ln.strip() for ln in sec.split('\n')[1:] if ln.strip()]
        held.append('<p><b>' + heading + '</b></p>' + ''.join('<p>' + inline(p) + '</p>' for p in paras))
decisions['held'] = {'html': '\n'.join(held)}
assert len(decisions) == 12, len(decisions)
assert len(ws_rows) == 26, len(ws_rows)

css = open(os.path.join(ROOT, 'src/styles.css'), encoding='utf-8').read()
domain = open(os.path.join(ROOT, 'src/domain.js'), encoding='utf-8').read()
fixture = open(os.path.join(ROOT, 'src/fixture.js'), encoding='utf-8').read()
ui = open(os.path.join(ROOT, 'src/ui.js'), encoding='utf-8').read()
data = 'window.SHEET = ' + json.dumps(decisions, ensure_ascii=False) + ';\nwindow.WS_ROWS = ' + json.dumps(ws_rows, ensure_ascii=False) + ';\nwindow.SHEET_META = ' + json.dumps({'path': 'docs/specs/firm-obligations-ruling-sheet-2026-09-07.md', 'head': '8f7467b', 'sha256': sheet_sha}) + ';'

rail = ''.join('<button data-dec="%d"><span class="n">DECISION %d</span>%s<span class="q">%s</span></button>' % (n, n, t, q) for n, t, q in [
    (0, 'The word', 'Q-FO-0'), (1, 'The closes', 'Q-FO-2 (a),(c)'), (2, 'What a missed period does', 'Q-FO-2 (b)'), (3, 'Where it lives', 'Q-FO-1'),
    (4, 'Per-firm or per-attorney', 'Q-FO-3'), (5, 'The QuickBooks limb', 'Q-FO-4'), (6, 'Weight', 'Q-FO-6'), (7, 'Outlook', 'Q-FO-5'),
    (8, 'The registry boundary', 'Q-FO-7'), (9, 'Acquisitions and templates', 'Q-FO-9 · Q-FO-8'), (10, 'Rows', 'Q-FO-10')])
rail += '<div class="lab" style="margin-top:14px">Also</div><button data-dec="11"><span class="n">HELD</span>Not on the sheet — for the product</button><button data-dec="12"><span class="n">FOM</span>Everything building it exposed</button>'

body = f'''<title>Firm Obligations Mock</title>
<style>{css}</style>
<div class="wb">
  <header class="wb-head">
    <h1>Firm obligations — rendered examples for the ruling sitting</h1>
    <span class="fix">Fixture</span>
    <div class="ctl"><label for="fixture">Register</label><select id="fixture"><option value="backlog">A — with a backlog</option><option value="current">B — everything current</option></select></div>
    <div class="ctl"><label for="today">Today (fixture clock)</label><input type="date" id="today"></div>
    <div class="ctl quick"><button data-quick="fixture">fixture default</button><button data-quick="2026-10-20">Oct 20, 2026</button><button data-quick="2026-12-28">Dec 28, 2026</button><button data-quick="2027-01-20">Jan 20, 2027</button></div>
    <span class="spacer"></span>
    <span class="meta">spec + sheet at HEAD <code>8f7467b</code> · the sheet governs · nothing here is ruled</span>
  </header>
  <aside class="wb-rail"><div class="lab">The sheet, in its order</div>{rail}</aside>
  <main class="wb-stage" id="stage"></main>
  <section class="wb-panel" id="panel"></section>
</div>
<script>{domain}</script>
<script>{fixture}</script>
<script>{data}</script>
<script>{ui}</script>
'''
out_body = os.path.join(ROOT, 'dist/firm-obligations-mock-2026-09-08.artifact.html')
out_full = os.path.join(ROOT, 'dist/firm-obligations-mock-2026-09-08.html')
os.makedirs(os.path.dirname(out_body), exist_ok=True)
open(out_body, 'w', encoding='utf-8').write(body)
full = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' + body.split('<style>')[0] + '</head>\n<body>\n<style>' + body.split('<style>', 1)[1] + '\n</body>\n</html>\n'
open(out_full, 'w', encoding='utf-8').write(full)
print('sheet sha256', sheet_sha)
print('decisions', sorted(decisions.keys()), 'ws_rows', len(ws_rows))
print('artifact body', os.path.getsize(out_body), 'B; standalone', os.path.getsize(out_full), 'B')
