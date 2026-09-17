# FOS-2 B5 — the master `.docx` byte diff (2026-09-16)

**Class:** EVIDENCE (`CAP-2`). Born in `docs/record/`, unsynced, bridge-reachable; cited by path. It rules nothing.

**What this is.** The record of the ONE edit the FOS-2 fix build made to Michael's master skeleton, `src/forms/skeletons/disclosures-plaintiff-v1.docx`, under fix-slice item B5 (`docs/specs/firm-obligations-fix-slice.md` §3 item 16, §7 item 13): the before and after of the package, every member, the exact bytes that changed inside `word/document.xml`, and the programmatic proof that nothing else in that part changed. Written by the FOS-2 B5 build lane. Every hash, size and offset below was computed by a script reading `git show HEAD:src/forms/skeletons/disclosures-plaintiff-v1.docx` (before) and the working tree (after) at HEAD `f626f4df072108c3ff4715943582e4d855003014`; none is typed by hand.

## The ruling

Michael, 2026-09-16, at the FOS-2 build's first stop: **"Tokenize both headings (Recommended)"** — put to him with options through the answer widget when the slice's own STOP condition fired, and recorded under THE STOPS in this build's session-log CODE entry; it supersedes the slice's head/foot wording. The heading `PLAINTIFF’S 194.2(b) & 195.5 DISCLOSURES` (U+2019) appears exactly twice in `word/document.xml`: paragraph 39 (counted from 0 over `<w:p>` elements in document order — under the caption, inside the second table) → `{instrument_title}`; paragraph 83 (heading the responses section, after the certificate of service) → `{footer_title}`. **Neither is the footer.** The real footer part, `word/footer1.xml` (text `PLAINTIFF’S TRCP 194.2(B) AND 195.5 DISCLOSURES`), is NOT touched.

Preconditions re-verified at HEAD `f626f4df072108c3ff4715943582e4d855003014` immediately before the edit, all held: exactly two occurrences of `PLAINTIFF’S 194.2(b) &amp; 195.5 DISCLOSURES` in the decompressed part; each the WHOLE content of one `<w:t xml:space="preserve">` node, each the only run of its paragraph; the first before the second; and `C:\fos2\b5-baseline.json`'s shas (docx `fefc4d07…`, 16,937 bytes; `document.xml` `ebcf45d2…`, 94,056 bytes, captured by lane B at the same HEAD) matching the file.

## The tooling and the script

The repo's own layer, not a persisted `mergeRuns`: `readZip` / `entryText` / `setEntryText` / `writeZip` / `partsDiff` (`src/forms/zip.ts`) and `replaceInXml` (`src/forms/docx.ts`) with a node-delimited anchor (`>HEADING</w:t>`) and count assertions — `expect: 2, which: [1]` for `{instrument_title}`, then `expect: 1` for `{footer_title}`. It ran ONCE as a temporary vitest file (`npx vitest run src/forms/__tests__/b5TokenizeMaster.tmp.test.ts` → exit 0, 1 test passed), which wrote the new `.docx` with `node:fs`; the file was then DELETED (verified absent). Its console line was not captured (the run's output was tailed), so its render-probe hashes are not reproduced here; what it ASSERTED — before writing — is in the source: the baseline shas, the preconditions, the splice-back, `partsDiff` = `[word/document.xml]` before and after re-reading, and a one-client render of the renderer fixture producing identical plain text and identical `.docx` bytes from the pre-edit master and the tokenized one. Full source:

```ts
// @ts-nocheck — TEMPORARY. FOS-2 B5 (#156 §2, THIRD TRANCHE item 10), Michael's
// ruling 2026-09-16: "Tokenize both headings". This file performs the ONE edit
// to the master .docx through the repo's own tooling, writes it with node:fs
// (which the app tsconfig carries no types for — hence the nocheck), and is
// DELETED after its single run. Its full source is filed in
// docs/record/firm-obligations-fix-build-2026-09-16/master-docx-byte-diff-2026-09-16.md.

import { it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { readZip, writeZip, entryText, setEntryText, partsDiff } from '../zip';
import { replaceInXml } from '../docx';
import { renderInstrument } from '../renderer';
import { buildRenderContext } from '../context';
import { FIXTURE_BUNDLE, FIXTURE_ANSWERS } from '../fixtures';

const PATH = 'src/forms/skeletons/disclosures-plaintiff-v1.docx';
// C:\fos2\b5-baseline.json, captured at HEAD f626f4d before any edit.
const BASE_DOCX_SHA = 'fefc4d0709a9615a8eb243712a6932a45958e863e6e651e50d89998f3da451ad';
const BASE_DOCX_BYTES = 16937;
const BASE_DOC_XML_SHA = 'ebcf45d2a41528e774931fad98f3fd735863cf027401ceab49395d9f60b1712a';
const BASE_DOC_XML_BYTES = 94056;

const HEADING_XML = 'PLAINTIFF\u2019S 194.2(b) &amp; 195.5 DISCLOSURES';
const HEADING_TEXT = 'PLAINTIFF\u2019S 194.2(b) & 195.5 DISCLOSURES';
/** Node-delimited (§12.2): the heading must be the WHOLE content of a <w:t>. */
const ANCHOR = `>${HEADING_XML}</w:t>`;

const sha = (b: Uint8Array | string) => createHash('sha256').update(b).digest('hex');
const count = (s: string, needle: string) => s.split(needle).length - 1;

it('B5 — tokenizes the master at exactly the two heading text nodes, and nothing else', async () => {
  const before = new Uint8Array(readFileSync(PATH));
  expect(sha(before)).toBe(BASE_DOCX_SHA);
  expect(before.length).toBe(BASE_DOCX_BYTES);

  const entries = await readZip(before);
  const xml = entryText(entries, 'word/document.xml');
  const xmlBytes = new TextEncoder().encode(xml);
  // The decode/encode round trip is lossless on this part (no BOM, valid UTF-8):
  // the string's bytes ARE the baseline member.
  expect(sha(xmlBytes)).toBe(BASE_DOC_XML_SHA);
  expect(xmlBytes.length).toBe(BASE_DOC_XML_BYTES);

  // Re-verified preconditions: exactly two, each a whole text node, no token yet.
  expect(count(xml, HEADING_XML)).toBe(2);
  expect(count(xml, ANCHOR)).toBe(2);
  expect(count(xml, `<w:t xml:space="preserve">${HEADING_XML}</w:t>`)).toBe(2);
  expect(count(xml, '{instrument_title}')).toBe(0);
  expect(count(xml, '{footer_title}')).toBe(0);
  const first = xml.indexOf(ANCHOR);
  const second = xml.indexOf(ANCHOR, first + ANCHOR.length);
  expect(first).toBeGreaterThan(-1);
  expect(second).toBeGreaterThan(first);
  // The first sits under the caption; the second after the certificate of service.
  expect(xml.lastIndexOf('{{county_name_caps}} COUNTY, TEXAS', first)).toBeGreaterThan(-1);
  expect(xml.indexOf('CERTIFICATE OF SERVICE')).toBeGreaterThan(first);
  expect(xml.indexOf('CERTIFICATE OF SERVICE')).toBeLessThan(second);

  // THE EDIT — ¶39 (under the caption) → {instrument_title}; then ¶83 (heading
  // the responses after the certificate of service) → {footer_title}.
  const step1 = replaceInXml(xml, ANCHOR, '>{instrument_title}</w:t>', { expect: 2, which: [1] });
  const step2 = replaceInXml(step1, ANCHOR, '>{footer_title}</w:t>', { expect: 1 });

  expect(count(step2, '{instrument_title}')).toBe(1);
  expect(count(step2, '{footer_title}')).toBe(1);
  expect(count(step2, HEADING_XML)).toBe(0);
  expect(step2.indexOf('{instrument_title}')).toBe(first + 1);
  expect(step2.indexOf('{instrument_title}')).toBeLessThan(step2.indexOf('{footer_title}'));

  // Splice back: the edit is exactly the two replacements and nothing else.
  const restored = step2
    .replace('>{instrument_title}</w:t>', ANCHOR)
    .replace('>{footer_title}</w:t>', ANCHOR);
  expect(restored).toBe(xml);

  const out = setEntryText(entries, 'word/document.xml', step2);
  expect(partsDiff(entries, out)).toEqual(['word/document.xml']);
  const bytes = await writeZip(out);

  const reread = await readZip(bytes);
  expect(reread.map((e) => e.name)).toEqual(entries.map((e) => e.name));
  expect(reread.map((e) => e.method)).toEqual(entries.map((e) => e.method));
  expect(partsDiff(entries, reread)).toEqual(['word/document.xml']);
  expect(entryText(reread, 'word/document.xml')).toBe(step2);

  // Render probe on the renderer fixture with the one-client heading scalars:
  // the pre-edit master and the tokenized master serve the same bytes.
  const { context } = buildRenderContext(FIXTURE_BUNDLE, FIXTURE_ANSWERS);
  const ctx = {
    ...context,
    scalars: { ...context.scalars, instrument_title: HEADING_TEXT, footer_title: HEADING_TEXT },
  };
  const a = await renderInstrument(before, ctx);
  const b = await renderInstrument(bytes, ctx);
  expect(b.plainText).toBe(a.plainText);
  expect(b.changedParts).toEqual(['word/document.xml']);
  expect(sha(b.docx)).toBe(sha(a.docx));
  expect(b.lint.unresolvedTokens).toEqual(a.lint.unresolvedTokens);

  writeFileSync(PATH, bytes);
  const written = new Uint8Array(readFileSync(PATH));
  expect(sha(written)).toBe(sha(bytes));

  console.log('B5-RESULT ' + JSON.stringify({
    beforeSha: sha(before), beforeBytes: before.length,
    afterSha: sha(bytes), afterBytes: bytes.length,
    docXmlBeforeSha: sha(xmlBytes), docXmlAfterSha: sha(new TextEncoder().encode(step2)),
    docXmlAfterBytes: new TextEncoder().encode(step2).length,
    renderProbe: {
      oneClientDocxShaPreEditMaster: sha(a.docx), oneClientDocxShaTokenizedMaster: sha(b.docx),
      plainTextSha: sha(a.plainText), unresolvedTokens: a.lint.unresolvedTokens,
    },
  }));
});
```

## The package, before and after

| | sha256 | bytes |
|---|---|---|
| before (`HEAD:src/forms/skeletons/disclosures-plaintiff-v1.docx`) | `fefc4d0709a9615a8eb243712a6932a45958e863e6e651e50d89998f3da451ad` | 16,937 |
| after (working tree) | `62017ca71b42882bb25311f107f0a47103c7cf8ecb5c097d2c61f2c75cb8e894` | 16,898 |

## Every member — method and decompressed sha256, before / after

Exactly one member differs once decompressed: **`word/document.xml`**. (Method: 0 = stored, 8 = deflate. The directory entries are stored and empty — their sha256 is the empty string's.)

| # | member | method before/after | decompressed bytes before/after | sha256 before | sha256 after | same |
|---|---|---|---|---|---|---|
| 1 | `word/` | 0 / 0 | 0 / 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | yes |
| 2 | `word/_rels/` | 0 / 0 | 0 / 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | yes |
| 3 | `word/_rels/document.xml.rels` | 8 / 8 | 1,313 / 1,313 | `8e6401aa31ceadb1dea1bf102fe2b7c7110d8959734ed7b119caafc36a0bd1fd` | `8e6401aa31ceadb1dea1bf102fe2b7c7110d8959734ed7b119caafc36a0bd1fd` | yes |
| 4 | `word/document.xml` | 8 / 8 | 94,056 / 93,996 | `ebcf45d2a41528e774931fad98f3fd735863cf027401ceab49395d9f60b1712a` | `c31edece950b9d6c35c8c14877d1ec727f52f7b5ed40694b0846a92dc91cf970` | **NO** |
| 5 | `word/styles.xml` | 8 / 8 | 4,441 / 4,441 | `bdcc0ad40968665f717fea5d7f3b08ccbf2fcde8c95224ea31c7dcba5008fb98` | `bdcc0ad40968665f717fea5d7f3b08ccbf2fcde8c95224ea31c7dcba5008fb98` | yes |
| 6 | `docProps/` | 0 / 0 | 0 / 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | yes |
| 7 | `docProps/core.xml` | 8 / 8 | 643 / 643 | `65a9ff8acd0bd610f6798c78278aecd0a9b9bf2f064c334b312f0a2f0e6d5f64` | `65a9ff8acd0bd610f6798c78278aecd0a9b9bf2f064c334b312f0a2f0e6d5f64` | yes |
| 8 | `word/numbering.xml` | 8 / 8 | 3,172 / 3,172 | `aae067c32dd80d876358a0cc5ecef7f7442662e3648c0ecd9f1888677ddb4a6e` | `aae067c32dd80d876358a0cc5ecef7f7442662e3648c0ecd9f1888677ddb4a6e` | yes |
| 9 | `_rels/` | 0 / 0 | 0 / 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | yes |
| 10 | `_rels/.rels` | 8 / 8 | 718 / 718 | `641d22a23aa9eb550103a7a01471eaeda5e84c69413e6e03e7fd290b4811a756` | `641d22a23aa9eb550103a7a01471eaeda5e84c69413e6e03e7fd290b4811a756` | yes |
| 11 | `word/_rels/footer1.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |
| 12 | `word/_rels/footer2.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |
| 13 | `word/footer1.xml` | 8 / 8 | 2,572 / 2,572 | `938adf7ded479c582d93232c331f5f6a2717a7731e1046f186f0beab0b3e4e45` | `938adf7ded479c582d93232c331f5f6a2717a7731e1046f186f0beab0b3e4e45` | yes |
| 14 | `word/footer2.xml` | 8 / 8 | 1,373 / 1,373 | `fc8ce6a3378d8fdf08ed496ff7c7bea24fa4703f0b9b4577975715ca90cfa472` | `fc8ce6a3378d8fdf08ed496ff7c7bea24fa4703f0b9b4577975715ca90cfa472` | yes |
| 15 | `[Content_Types].xml` | 8 / 8 | 2,360 / 2,360 | `70b5413aede9c9356107988b2ed2de5008be1d476fcd13ecf9b23028bbc39b17` | `70b5413aede9c9356107988b2ed2de5008be1d476fcd13ecf9b23028bbc39b17` | yes |
| 16 | `docProps/custom.xml` | 8 / 8 | 228 / 228 | `8ec73cc7ce297e42cc652a1d1884d4ffb18ffa0ba7a6502a36f8da90d1be61a1` | `8ec73cc7ce297e42cc652a1d1884d4ffb18ffa0ba7a6502a36f8da90d1be61a1` | yes |
| 17 | `docProps/app.xml` | 8 / 8 | 230 / 230 | `579eba9a8d602575736c3880cf5b529aabbadee0e8cc0e4df8573db0ceadbd4b` | `579eba9a8d602575736c3880cf5b529aabbadee0e8cc0e4df8573db0ceadbd4b` | yes |
| 18 | `word/footnotes.xml` | 8 / 8 | 1,709 / 1,709 | `774ce254f01cde1079d43e81a0db30ac82b3b2bae875b07c4fe28403ba30b6a9` | `774ce254f01cde1079d43e81a0db30ac82b3b2bae875b07c4fe28403ba30b6a9` | yes |
| 19 | `word/_rels/footnotes.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |
| 20 | `word/endnotes.xml` | 8 / 8 | 1,682 / 1,682 | `52f6c33e62c233e0d9f9c41ec259ffd943ea9cdc413293d43e6ffb213682a5cf` | `52f6c33e62c233e0d9f9c41ec259ffd943ea9cdc413293d43e6ffb213682a5cf` | yes |
| 21 | `word/_rels/endnotes.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |
| 22 | `word/settings.xml` | 8 / 8 | 1,395 / 1,395 | `36b68f012adfd6d2f8faaebc8d101632d3529e9d9fd57d6ef92198841e96f09e` | `36b68f012adfd6d2f8faaebc8d101632d3529e9d9fd57d6ef92198841e96f09e` | yes |
| 23 | `word/comments.xml` | 8 / 8 | 2,246 / 2,246 | `dd2d62f68c6fd01fc4d7d44081587af54ea3e135b9486cc44fa3c62d087adfec` | `dd2d62f68c6fd01fc4d7d44081587af54ea3e135b9486cc44fa3c62d087adfec` | yes |
| 24 | `word/_rels/comments.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |
| 25 | `word/fontTable.xml` | 8 / 8 | 835 / 835 | `a746dbb577ec5d68983d659707c0750ca89d40b9d3316e31af331d5e1c736bad` | `a746dbb577ec5d68983d659707c0750ca89d40b9d3316e31af331d5e1c736bad` | yes |
| 26 | `word/_rels/fontTable.xml.rels` | 8 / 8 | 123 / 123 | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | `bf64631f0bc7bd46712fef822bcfb22e069fa5779e133980ca0c9d81f00efc09` | yes |

Members: 26. Differing once decompressed: 1 (`word/document.xml`).

## Inside `word/document.xml` — the two changed text nodes

`document.xml` before: 94,056 bytes, sha256 `ebcf45d2a41528e774931fad98f3fd735863cf027401ceab49395d9f60b1712a`. After: 93,996 bytes, sha256 `c31edece950b9d6c35c8c14877d1ec727f52f7b5ed40694b0846a92dc91cf970`. Offsets are 0-based BYTE offsets into the decompressed part (UTF-8; U+2019 is three bytes). The heading node content is 46 bytes; `{instrument_title}` is 18, `{footer_title}` is 14.

### Change 1 — paragraph 39, under the caption

- before: bytes 15012–15057 (46 bytes)
- after: bytes 15012–15029 (18 bytes)

Before, bytes 14952–15117 (±60 around the node content, which is marked `⟦…⟧`):

```xml
"24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">⟦PLAINTIFF’S 194.2(b) &amp; 195.5 DISCLOSURES⟧</w:t></w:r></w:p><w:p><w:r><w:rPr><w:rFonts w:ascii="Times 
```

After, bytes 14952–15089:

```xml
"24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">⟦{instrument_title}⟧</w:t></w:r></w:p><w:p><w:r><w:rPr><w:rFonts w:ascii="Times 
```

### Change 2 — paragraph 83, over the responses after the certificate of service

- before: bytes 29392–29437 (46 bytes)
- after: bytes 29364–29377 (14 bytes)

Before, bytes 29332–29497 (±60 around the node content, which is marked `⟦…⟧`):

```xml
24"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">⟦PLAINTIFF’S 194.2(b) &amp; 195.5 DISCLOSURES⟧</w:t></w:r></w:p><w:p><w:r><w:rPr><w:rFonts w:ascii="Times 
```

After, bytes 29304–29437:

```xml
24"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">⟦{footer_title}⟧</w:t></w:r></w:p><w:p><w:r><w:rPr><w:rFonts w:ascii="Times 
```

### Nothing else in `document.xml` changed — proved by program

- A byte-level `difflib.SequenceMatcher(None, before, after, autojunk=False)` over the whole part yields exactly 3 non-equal opcode(s):
  - `replace` before[15012:15037] `PLAINTIFF’S 194.2(b) &a` → after[15012:15019] `{instru`
  - `replace` before[15038:15058] `p; 195.5 DISCLOSURES` → after[15020:15030] `ent_title}`
  - `replace` before[29392:29438] `PLAINTIFF’S 194.2(b) &amp; 195.5 DISCLOSURES` → after[29364:29378] `{footer_title}`
  (the matcher reports the minimal differing bytes, so a hunk can be shorter than the whole node where the heading and the token happen to share a byte.)
- **Splice back:** the after part with the heading written over `{instrument_title}` at byte 15012 and over `{footer_title}` at byte 29364 equals the before part byte for byte: **True**.
- **Splice forward:** the before part with `{instrument_title}` written over the heading at byte 15012 and `{footer_title}` over the heading at byte 29392 equals the after part byte for byte: **True**.
- **Segment by segment:** the three stretches outside the two node contents (before the first, between the two, after the second) are byte-identical: **True**.

## The raw container

`writeZip` re-deflates every deflate member with the platform `CompressionStream('deflate-raw')` and rewrites every local and central header in its own shape — version-needed 20 on every member where the supplied file carried 10, no local extra fields — keeping each member's method (same on 26 of 26), MS-DOS time/date (same on 26 of 26), external attributes (same on 26 of 26) and the member order. So the RAW bytes differ across the package — compressed payloads re-deflated, headers rewritten, total size 16,937 → 16,898 — while every decompressed member except `word/document.xml` is identical (table above). Raw compressed payload identical before/after: 4 of 26 members (`word/`, `word/_rels/`, `docProps/`, `_rels/` — the stored, empty directory entries); the rest differ in raw bytes only.

| member | compressed bytes before → after | raw payload identical |
|---|---|---|
| `word/` | 0 → 0 | yes |
| `word/_rels/` | 0 → 0 | yes |
| `word/_rels/document.xml.rels` | 267 → 267 | no |
| `word/document.xml` | 7,376 → 7,310 | no |
| `word/styles.xml` | 791 → 792 | no |
| `docProps/` | 0 → 0 | yes |
| `docProps/core.xml` | 315 → 315 | no |
| `word/numbering.xml` | 624 → 628 | no |
| `_rels/` | 0 → 0 | yes |
| `_rels/.rels` | 230 → 231 | no |
| `word/_rels/footer1.xml.rels` | 109 → 108 | no |
| `word/_rels/footer2.xml.rels` | 109 → 108 | no |
| `word/footer1.xml` | 550 → 553 | no |
| `word/footer2.xml` | 394 → 400 | no |
| `[Content_Types].xml` | 423 → 428 | no |
| `docProps/custom.xml` | 146 → 145 | no |
| `docProps/app.xml` | 147 → 146 | no |
| `word/footnotes.xml` | 462 → 466 | no |
| `word/_rels/footnotes.xml.rels` | 109 → 108 | no |
| `word/endnotes.xml` | 449 → 453 | no |
| `word/_rels/endnotes.xml.rels` | 109 → 108 | no |
| `word/settings.xml` | 417 → 420 | no |
| `word/comments.xml` | 453 → 454 | no |
| `word/_rels/comments.xml.rels` | 109 → 108 | no |
| `word/fontTable.xml` | 285 → 288 | no |
| `word/_rels/fontTable.xml.rels` | 109 → 108 | no |

## The regenerated module

`src/forms/skeletons/disclosuresSkeleton.ts` — its `BASE64` array regenerated by program from the new `.docx` in the module's existing layout (100-character chunks, one per line, two-space indent, double quotes, trailing comma, LF; the same layout was first confirmed to reproduce the HEAD module's array from the HEAD `.docx` exactly), `DISCLOSURES_SKELETON_SHA256` set to the new `.docx` sha256, and a header paragraph added recording this edit.

| | sha256 | bytes |
|---|---|---|
| before (`HEAD:src/forms/skeletons/disclosuresSkeleton.ts`) | `67d4ad1e9462c1e852c5ef4dece7de908f88563e61285f4ef8088beec13640c7` | 26,492 |
| after (working tree) | `ca6e01c3af1518e4706187282c98412219308c0146bf7347d219aa3f47b9bb44` | 27,385 |

The size pin in `src/forms/__tests__/engine.test.ts` moves 16937 → 16898; `src/forms/__tests__/masterTitleTokens.test.ts` holds the tokens, the reconstruction (its sha256 equals the baseline `ebcf45d2…`), every pre-edit member hash, the untouched footer and the one-client byte identity shut.
