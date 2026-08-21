const DEFAULT_ENQUIRY_API = 'https://tools.yourstore.io/api/enquiry/gsm_enquiry';

export function getContactApiUrl(): string {
  const fromEnv = import.meta.env.VITE_CONTACT_API?.trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && (window as unknown as { GSM_CONTACT_API?: string }).GSM_CONTACT_API) {
    const w = String((window as unknown as { GSM_CONTACT_API?: string }).GSM_CONTACT_API ?? '').trim();
    if (w) return w;
  }
  return DEFAULT_ENQUIRY_API;
}

export type EnquiryPayload = {
  name: string;
  gsm: string;
  guidance_topic: string;
  preferred_mode: string;
};

/** Map contact form fields to the tools.yourstore.io enquiry API body. */
export function buildEnquiryPayload(form: FormData): EnquiryPayload | { honeypot: true } | { error: string } {
  if (String(form.get('website') ?? '').trim() !== '') {
    return { honeypot: true };
  }

  const name = String(form.get('full_name') ?? '').trim();
  const gsm = phoneDigitsOnly(form.get('phone')).slice(0, 10);
  const guidance_topic = String(form.get('topic') ?? '').trim();
  const preferred_mode = String(form.get('mode') ?? '').trim();

  if (!name || !gsm || !guidance_topic) {
    return { error: 'missing_fields' };
  }
  if (!isValidContactPhone(gsm)) {
    return { error: 'invalid_phone' };
  }

  return { name, gsm, guidance_topic, preferred_mode };
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
