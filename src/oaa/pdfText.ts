// PDF → text for OAA intake. Lazy-loads pdfjs-dist so demo sessions that never
// touch OAA intake don't fetch it (same pattern as the MSAL chunk).
// Layout matters: the Tier 1 parser splits table columns on runs of 2+ spaces,
// so horizontal gaps between text items are rendered as double spaces.

interface TextItemLike {
  str: string;
  transform: number[]; // [a,b,c,d,x,y]
  width: number;
}

export async function extractPdfText(data: ArrayBuffer): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const loadingTask = pdfjs.getDocument({ data });
  const doc = await loadingTask.promise;
  const pages: string[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const items = (content.items as TextItemLike[]).filter((it) => it.str !== '');

    // Group into lines by y (PDF y grows upward), tolerance 3 units.
    const lines: { y: number; items: TextItemLike[] }[] = [];
    for (const it of items) {
      const y = it.transform[5];
      const line = lines.find((l) => Math.abs(l.y - y) < 3);
      if (line) line.items.push(it);
      else lines.push({ y, items: [it] });
    }
    lines.sort((a, b) => b.y - a.y);

    const text = lines.map((line) => {
      line.items.sort((a, b) => a.transform[4] - b.transform[4]);
      let out = '';
      let prevEnd: number | null = null;
      for (const it of line.items) {
        const x = it.transform[4];
        if (prevEnd !== null) {
          const gap = x - prevEnd;
          // Wide gap → column boundary (double space); small gap → word space.
          if (gap > 12) out += '  ';
          else if (gap > 1 && !out.endsWith(' ')) out += ' ';
        }
        out += it.str;
        prevEnd = x + it.width;
      }
      return out;
    }).join('\n');
    pages.push(text);
  }
  await loadingTask.destroy();
  return pages.join('\n\n');
}
