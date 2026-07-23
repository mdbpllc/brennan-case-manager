// Minimal renderer for the report generator's markdown (headings, tables,
// blockquotes, lists, bold/italic). No dependency, no HTML injection — text
// nodes only.

import type { ReactNode } from 'react';

function inline(text: string, key: number): ReactNode {
  // **bold** and *italic* only — split conservatively.
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) parts.push(<strong key={`${key}-${i++}`}>{tok.slice(2, -2)}</strong>);
    else parts.push(<em key={`${key}-${i++}`}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function MarkdownLite({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  const out: ReactNode[] = [];

  blocks.forEach((block, bi) => {
    const lines = block.split('\n').filter((l) => l.trim() !== '');
    if (lines.length === 0) return;

    if (lines[0].startsWith('| ') && lines.length >= 2) {
      const rows = lines.filter((l) => !/^\|[\s|:-]+\|$/.test(l)).map((l) =>
        l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const [head, ...body] = rows;
      out.push(
        <table className="list" key={bi} style={{ margin: '8px 0' }}>
          <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{body.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c, ci)}</td>)}</tr>)}</tbody>
        </table>,
      );
      return;
    }
    if (lines[0].startsWith('# ')) { out.push(<h2 key={bi}>{inline(lines[0].slice(2), bi)}</h2>); return; }
    if (lines[0].startsWith('## ')) { out.push(<h3 key={bi}>{inline(lines[0].slice(3), bi)}</h3>); return; }
    if (lines[0].startsWith('> ')) {
      out.push(<blockquote className="report-callout" key={bi}>{lines.map((l, i) => <p key={i}>{inline(l.replace(/^>\s?/, ''), i)}</p>)}</blockquote>);
      return;
    }
    if (lines.every((l) => l.startsWith('- '))) {
      out.push(<ul key={bi}>{lines.map((l, i) => <li key={i}>{inline(l.slice(2), i)}</li>)}</ul>);
      return;
    }
    out.push(<p key={bi}>{lines.map((l, i) => <span key={i}>{inline(l, i)}{i < lines.length - 1 ? ' ' : ''}</span>)}</p>);
  });

  return <div className="report-view">{out}</div>;
}
