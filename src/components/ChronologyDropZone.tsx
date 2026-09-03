/**
 * The chronology DROP ZONE — ONE zone, on the Medical tab, per client (§14.1,
 * `AS-Q4`, D-9).
 *
 * "One" is RULED: an in-app text box was proposed and REJECTED, and there is no
 * second drop anywhere. The wizard shows a read-only pointer at the version in
 * use and never a drop of its own.
 *
 * ⚠ **THE FILE IS NOT KEPT.** It is reduced to text at the drop and the TEXT is
 * what is stored — no bytes, no base64, no blob, no handle. That is `AS-Q4`
 * ("(i) Extracted text per version in the database; bytes not retained; file
 * store at gate 7"), and it is why this component reads the file and then lets
 * it go.
 *
 * ⚠ **AN UNREADABLE FILE IS FLAGGED AND NEVER SENT** (D-62). A scanned PDF with
 * one OCR'd header has SOME text, so "has a text layer" is not a usable test;
 * the threshold is in `isReadable`. A version below it is kept, shown, and
 * excluded from "newest" — it never reaches a model.
 *
 * There is deliberately NO in-app viewer of the extracted text: metadata only
 * (D-60). The text is a model payload, not a reading surface, and a viewer
 * would be a second place PHI is displayed for no benefit anyone asked for.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '../data';
import {
  newestReadableVersion, type CaseChronologyVersion,
} from '../domain/caseProviders';
import {
  UnsupportedChronologyFormat, formatFor, isReadable, readDocxText, readTextual,
  readXlsxText,
} from '../forms/chronology/readers';

/** D-60: the browser store is finite, so demo mode caps stored text. The cap
 *  TRUNCATES and FLAGS; it never changes `readable`, because the file was
 *  readable — this is a storage limit, not a property of the document. */
const DEMO_TEXT_CAP = 1_000_000;

interface Props {
  caseId: string;
  clientId?: string;
  clientLabel?: string;
  onDropped?: (version: CaseChronologyVersion) => void | Promise<void>;
}

export default function ChronologyDropZone({ caseId, clientId, clientLabel, onDropped }: Props) {
  const [versions, setVersions] = useState<CaseChronologyVersion[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    const all = await db.listChronologyVersions(caseId);
    setVersions(all.filter((v) => (v.clientId ?? null) === (clientId ?? null)));
  }, [caseId, clientId]);

  useEffect(() => { refresh(); }, [refresh]);

  const current = newestReadableVersion(versions);

  const accept = async (file: File) => {
    setBusy(true);
    setError(null);
    setNote(null);
    try {
      const format = formatFor(file.name);        // throws on an unread format
      let text: string;
      if (format === 'docx') {
        text = await readDocxText(new Uint8Array(await file.arrayBuffer()));
      } else if (format === 'xlsx') {
        text = await readXlsxText(new Uint8Array(await file.arrayBuffer()));
      } else if (format === 'pdf') {
        const { extractPdfText } = await import('../oaa/pdfText');
        text = await extractPdfText(await file.arrayBuffer());
      } else {
        text = readTextual(await file.text(), format);
      }

      const readable = isReadable(text, format);
      const capped = text.length > DEMO_TEXT_CAP;
      const stored = capped ? text.slice(0, DEMO_TEXT_CAP) : text;

      const version = await db.createChronologyVersion({
        caseId,
        clientId,
        droppedAt: new Date().toISOString(),
        sourceFilename: file.name,
        sourceFormat: format,
        extractedText: stored,
        readable,
        charCount: text.length,
      });

      if (!readable) {
        setNote(
          'This file has little or no text layer — it looks like a scan. It is kept and listed, '
          + 'but it is NOT sent anywhere and it does not become the current chronology. Run it '
          + 'through OCR and drop it again.',
        );
      } else if (capped) {
        setNote(
          'Stored, but truncated for the browser demo store. In the real database the whole '
          + 'text is kept.',
        );
      }

      await refresh();
      // Extraction fires HERE, at a readable drop (D-44) — the caller owns it,
      // because it needs the facility list and the writer.
      if (readable) await onDropped?.(version);
    } catch (e) {
      setError(e instanceof UnsupportedChronologyFormat
        ? e.message
        : `Could not read that file: ${(e as Error).message}`);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remove = async (v: CaseChronologyVersion) => {
    // D-60. A mis-dropped chronology is PHI in the WRONG MATTER, which is why
    // the confirm names the reason rather than asking a generic "are you sure".
    const ok = window.confirm(
      `Remove chronology v${v.versionNo} (${v.sourceFilename})?\n\n`
      + 'Use this when a chronology was dropped on the wrong matter or the wrong client — '
      + 'those are records about someone else, and they should not sit here.\n\n'
      + 'The people it named keep their rows on the Medical tab; they simply lose their '
      + 'source. The version is never sent to a model again.',
    );
    if (!ok) return;
    setBusy(true);
    try {
      await db.removeChronologyVersion(v.id);
      await refresh();
    } finally { setBusy(false); }
  };

  return (
    <div style={{ border: '1px solid #dde', borderRadius: 6, padding: 10, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <strong>Medical chronology{clientLabel ? ` — ${clientLabel}` : ''}</strong>
        <span className="small muted">
          {current ? `current: v${current.versionNo}` : 'none'}
        </span>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) accept(file);
        }}
        style={{
          marginTop: 8, padding: 14, textAlign: 'center', borderRadius: 6,
          border: `2px dashed ${dragging ? '#4a7' : '#ccd'}`,
          background: dragging ? '#f2fbf6' : '#fafbfc',
        }}
      >
        <div className="small">
          {busy ? 'Reading…' : 'Drop the chronology here, or'}{' '}
          {!busy && (
            <button className="btn small secondary" onClick={() => inputRef.current?.click()}>
              choose a file
            </button>
          )}
        </div>
        <div className="small muted" style={{ marginTop: 4 }}>
          PDF, Word, Excel, CSV, JSON or plain text. The file itself is not stored — only the
          text is kept, and it is never shown back here.
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.xlsx,.csv,.json,.txt"
          style={{ display: 'none' }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) accept(f); }}
        />
      </div>

      {error && <p className="notice" style={{ marginTop: 8 }}>{error}</p>}
      {note && <p className="notice" style={{ marginTop: 8 }}>{note}</p>}

      {versions.length > 0 && (
        <table className="tbl" style={{ marginTop: 8 }}>
          <thead>
            <tr><th>Version</th><th>File</th><th>Dropped</th><th>State</th><th /></tr>
          </thead>
          <tbody>
            {versions.slice().sort((a, b) => b.versionNo - a.versionNo).map((v) => (
              <tr key={v.id} style={v.removedAt ? { opacity: 0.5 } : undefined}>
                <td>v{v.versionNo}</td>
                <td className="small">{v.sourceFilename}</td>
                <td className="small muted">{v.droppedAt.slice(0, 10)}</td>
                <td className="small">
                  {v.removedAt
                    ? 'removed'
                    : v.readable
                      ? (current?.id === v.id ? 'current' : 'superseded')
                      : 'no text layer — not sent'}
                  {v.charCount != null && !v.removedAt && (
                    <span className="muted"> · {v.charCount.toLocaleString()} chars</span>
                  )}
                </td>
                <td>
                  {!v.removedAt && (
                    <button className="btn small secondary" disabled={busy} onClick={() => remove(v)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
