# Docx-Surgery Helper Reference

Status: reference implementation, unbuilt; canonical at docs/specs/form-engine-helpers.md.

These are the generalized helpers from the 2026-07-31 live POC (see form-engine.md POC-learnings section). They are REFERENCE code for the future engine build — proven mechanics, not production code. All example values are neutral placeholders; nothing here derives from any real case.

Preconditions assumed throughout: the .docx is unzipped to a working directory, symlink entries stripped, and merge_runs.py has been run on it (mandatory — see learnings §1). `xml` is the full text of word/document.xml as a Python string.

```python
import re

def rep(old, new, expect=1, which=None):
    """Replace occurrences of `old` with `new` in the global xml string.
    expect = how many occurrences MUST exist (hard assertion — fail loudly).
    which  = 1-based list of occurrences to replace (default: all).
    Anchor at the text-node level ('>EXAMPLE CO.<') whenever the target
    string could be a substring of a longer line elsewhere."""
    global xml
    idxs, start = [], 0
    while True:
        i = xml.find(old, start)
        if i < 0: break
        idxs.append(i); start = i + len(old)
    assert len(idxs) == expect, f'EXPECT {expect} got {len(idxs)} for: {old[:70]!r}'
    targets = idxs if which is None else [idxs[w-1] for w in which]
    for i in sorted(targets, reverse=True):
        xml = xml[:i] + new + xml[i+len(old):]

def para_span(anchor, occ=1):
    """(start, end) byte offsets of the paragraph containing the occ-th
    occurrence of anchor. Paragraph = enclosing <w:p ...>...</w:p>.
    NOTE: self-closing empty paragraphs (<w:p ... />) are invisible to
    naive <w:p>...</w:p> regex splitting — never index paragraphs by
    position; always locate by anchor."""
    start, i = 0, -1
    for _ in range(occ):
        i = xml.find(anchor, start)
        assert i >= 0, f'anchor not found: {anchor[:60]!r}'
        start = i + len(anchor)
    s = xml.rfind('<w:p ', 0, i)
    e = xml.find('</w:p>', i) + len('</w:p>')
    return s, e

def set_text(template, text):
    """Clone mechanic: blank every <w:t> in a captured paragraph template,
    set the first to `text` (xml:space preserved). pPr survives byte-for-byte,
    which is what preserves formatting. Use single-run paragraphs as templates
    where possible."""
    out, done, pos = [], False, 0
    for m in re.finditer(r'(<w:t(?: [^>]*)?>)([^<]*)(</w:t>)', template):
        out.append(template[pos:m.start()])
        out.append('<w:t xml:space="preserve">' + (text if not done else '') + '</w:t>')
        done = True
        pos = m.end()
    out.append(template[pos:])
    assert done, 'template had no w:t'
    return ''.join(out)

def del_para_in(block, anchor):
    """Delete the whole paragraph containing anchor from a cloned block string.
    Delete, never blank — an emptied paragraph renders as a stray blank line."""
    i = block.find(anchor)
    assert i >= 0, f'clone anchor missing: {anchor!r}'
    s = block.rfind('<w:p ', 0, i)
    e = block.find('</w:p>', i) + len('</w:p>')
    return block[:s] + block[e:]

def strip_bookmarks(frag):
    """Strip bookmarkStart/End from a fragment ABOUT TO BE CLONED, so the
    clone doesn't duplicate bookmark IDs."""
    return re.sub(r'<w:bookmark(?:Start|End)\b[^>]*/>', '', frag)

def dedup_bookmarks():
    """Global post-pass, run unconditionally after any clone-bearing edit:
    keep the first bookmarkStart/End per ID, drop subsequent duplicates.
    Duplicate IDs fail XSD validation."""
    global xml
    seen_s, seen_e = set(), set()
    def fix(m):
        tag = m.group(0)
        kind = 'Start' if 'bookmarkStart' in tag else 'End'
        mid = re.search(r'w:id="(\d+)"', tag)
        if not mid: return tag
        i = mid.group(1)
        pool = seen_s if kind == 'Start' else seen_e
        if i in pool: return ''
        pool.add(i)
        return tag
    xml = re.sub(r'<w:bookmark(?:Start|End)\b[^>]*/>', fix, xml)
```

## Composition pattern (span-capture-and-rebuild)

For a repeating-block section (e.g., N provider blocks):

1. `para_span` the first paragraph of the first block and the last paragraph of the last block → section span.
2. Capture one paragraph of each distinct style in the section as templates (plain line, small-caps line, narrative), via `para_span` + slicing.
3. Capture the raw chunk BETWEEN two adjacent blocks (end of one paragraph to start of the next) as the spacer — the document supplies its own spacing; never fabricate it.
4. Build each new block as `''.join(set_text(tpl, line) for ...)`, join blocks with the spacer, splice over the span.
5. `dedup_bookmarks()`, then the ship gate: leftover-sweep assertions → rezip → XSD validate vs original → render and inspect every page → parts-diff (only word/document.xml may differ).
