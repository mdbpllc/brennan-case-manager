// Regenerates the statute TOC fixtures (src/statutes/fixtures/toc/*.json)
// from the official site's headings API — the same tcss.legis.texas.gov
// backing host the chapter fetcher uses (public domain; polite UA;
// sequential with a delay). Run when the Legislature reorganizes chapters
// (effectively biennially, alongside the cache refresh):
//
//   node scripts/build-toc-fixtures.mjs
//
// Output shape per code: { code, name, fetchedAt, chapters: [{ ch, title, path }] }
// where `path` is the TITLE/SUBTITLE ancestry and `ch` matches the chapter
// file naming ('41', '55A').

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WORKING_SET = ['FA', 'PE', 'CR', 'CP', 'GV', 'HS', 'IN', 'PR', 'ES', 'TX', 'LG', 'TN'];
const UA = { 'User-Agent': 'BrennanCaseManager/0.1 (statute cache; michael@brennanstx.com)' };
const OUT_DIR = path.join(import.meta.dirname, '..', 'src', 'statutes', 'fixtures', 'toc');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  // The API serves a UTF-8 BOM; strip before parsing.
  return JSON.parse((await res.text()).replace(/^﻿/, ''));
}

function collectChapters(nodes, ancestry, out) {
  for (const node of nodes ?? []) {
    const name = (node.name ?? '').trim();
    const chMatch = node.htmLink?.match(/\/htm\/[A-Z]{2}\.([0-9]+[A-Z]?)\.htm$/);
    if (chMatch) {
      out.push({
        ch: chMatch[1],
        title: name.replace(/^CHAPTER\s+[0-9]+[A-Z]?\.\s*/i, ''),
        path: ancestry.join(' — '),
      });
    } else {
      collectChapters(node.children, [...ancestry, name], out);
    }
    if (chMatch && node.children) collectChapters(node.children, ancestry, out);
  }
}

const codesTree = await getJson('https://statutes.capitol.texas.gov/assets/StatuteCodesForHomepageTree.json');
const byCode = new Map(codesTree.StatuteCode.map((c) => [c.code, c]));
await mkdir(OUT_DIR, { recursive: true });

for (const code of WORKING_SET) {
  const def = byCode.get(code);
  if (!def) throw new Error(`code ${code} not in the site's codes tree`);
  const headings = await getJson(
    `https://tcss.legis.texas.gov/api/StatuteCode/GetTopLevelHeadings/S%2F${def.codeID}/${code}/1/true/false`,
  );
  const chapters = [];
  collectChapters(headings, [], chapters);
  if (chapters.length === 0) throw new Error(`${code}: no chapters extracted — API shape changed?`);
  const fixture = {
    code,
    name: def.CodeName.replace(/&/g, 'and'),
    fetchedAt: new Date().toISOString().slice(0, 10),
    chapters,
  };
  await writeFile(path.join(OUT_DIR, `${code}.json`), JSON.stringify(fixture));
  console.log(`${code}: ${chapters.length} chapters`);
  await sleep(1000);
}
console.log(`written to ${OUT_DIR}`);
