// Masked phone input (v0.1 feedback item a): shows the formatted number while
// typing, hands back the stored digit form. Storage/format rules live in
// domain/phone.ts.
import { formatPhone, normalizePhone } from '../domain/phone';

export function PhoneInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (stored: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="tel"
      value={formatPhone(value)}
      placeholder={placeholder ?? '(555) 555-0100'}
      onChange={(e) => onChange(normalizePhone(e.target.value))}
    />
  );
}
