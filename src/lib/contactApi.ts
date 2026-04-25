export function getContactApiUrl(): string {
  const fromEnv = import.meta.env.VITE_CONTACT_API?.trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && (window as unknown as { GSM_CONTACT_API?: string }).GSM_CONTACT_API) {
    const w = String((window as unknown as { GSM_CONTACT_API?: string }).GSM_CONTACT_API ?? '').trim();
    if (w) return w;
  }
  // Vite dev: same-origin /contact is proxied to contact-server (see vite.config.ts). Avoids CORS and localhost vs 127.0.0.1 issues.
  if (import.meta.env.DEV) {
    return '/contact';
  }
  return 'http://127.0.0.1:9006/contact';
}

export const CONTACT_API_ERROR_MESSAGES: Record<string, string> = {
  invalid_phone: 'Enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).',
  missing_fields: 'Please fill in all required fields.',
  too_long: 'One or more fields are too long. Please shorten and try again.',
};

export function phoneDigitsOnly(raw: unknown): string {
  return String(raw ?? '').replace(/\D/g, '');
}

export function isValidContactPhone(raw: unknown): boolean {
  const d = phoneDigitsOnly(raw);
  return d.length === 10 && /^[6-9]\d{9}$/.test(d);
}
