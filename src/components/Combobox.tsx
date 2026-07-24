// Standard type-to-filter picker for long lists (v0.1 feedback item b).
// Typing live-filters on label and sublabel; non-matches drop out. Use this
// instead of a plain <select> anywhere the option list is open-ended record
// data — parties, providers, courts — not for short fixed vocabularies.
import { useRef, useState } from 'react';

export interface ComboOption {
  value: string;
  label: string;
  /** Shown dimmed after the label; included in filter matching (e.g. party type). */
  sublabel?: string;
}

export function Combobox({ options, value, onChange, placeholder }: {
  options: ComboOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hi, setHi] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
  const q = query.trim().toLowerCase();
  const shown = q
    ? options.filter((o) => `${o.label} ${o.sublabel ?? ''}`.toLowerCase().includes(q))
    : options;

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  return (
    <div className="combo">
      <input
        ref={inputRef}
        type="text"
        value={open ? query : selected?.label ?? ''}
        placeholder={selected ? selected.label : placeholder ?? 'Type to search…'}
        onFocus={() => { setOpen(true); setQuery(''); setHi(0); }}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setHi(0); }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, shown.length - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
          else if (e.key === 'Enter') { e.preventDefault(); if (shown[hi]) pick(shown[hi].value); }
          else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
        }}
      />
      {value !== '' && !open && (
        <button
          type="button" className="combo-clear" title="Clear"
          onMouseDown={(e) => e.preventDefault()} onClick={() => onChange('')}
        >×</button>
      )}
      {open && (
        <div className="combo-list">
          {shown.length === 0 && <div className="combo-empty">No matches.</div>}
          {shown.map((o, i) => (
            <div
              key={o.value}
              className={`combo-item${i === hi ? ' active' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); pick(o.value); }}
              onMouseEnter={() => setHi(i)}
            >
              {o.label}
              {o.sublabel && <span className="combo-sub"> — {o.sublabel}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
