import { type FormEvent, type KeyboardEvent, useCallback, useEffect, useState } from 'react';
import {
  CONTACT_API_ERROR_MESSAGES,
  getContactApiUrl,
  isValidContactPhone,
  phoneDigitsOnly,
} from '../lib/contactApi';

type FlashKind = 'ok' | 'err';

export function ContactSection() {
  const [flash, setFlash] = useState<{ kind: FlashKind; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const showFlash = useCallback((kind: FlashKind, message: string) => {
    setFlash({ kind, text: message });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const st = params.get('contact');
    if (st === 'sent') {
      showFlash('ok', 'Thank you — we received your request and will contact you soon.');
    } else if (st === 'error') {
      showFlash('err', 'Something went wrong. Please call us or try again in a moment.');
    }
    if (st) {
      const path = window.location.pathname || '';
      window.history.replaceState({}, '', `${path}#contact`);
    }
  }, [showFlash]);

  const onPhoneKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    if (/\d/.test(e.key)) return;
    e.preventDefault();
  }, []);

  const onPhoneInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const d = phoneDigitsOnly(el.value).slice(0, 10);
    if (el.value !== d) el.value = d;
  }, []);

  const onPhonePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const paste = e.clipboardData.getData('text') || '';
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const merged = el.value.slice(0, start) + paste + el.value.slice(end);
    el.value = phoneDigitsOnly(merged).slice(0, 10);
    try {
      el.setSelectionRange(el.value.length, el.value.length);
    } catch {
      /* ignore */
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const raw = new FormData(form);
    const payload: Record<string, string> = {};
    raw.forEach((v, k) => {
      payload[k] = String(v);
    });

    if (payload.phone != null && !isValidContactPhone(payload.phone)) {
      showFlash('err', CONTACT_API_ERROR_MESSAGES.invalid_phone);
      document.getElementById('contact-phone')?.focus();
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(getContactApiUrl(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        /* non-JSON */
      }
      if (res.ok && data.ok !== false) {
        showFlash('ok', 'Thank you — we received your request and will contact you soon.');
        form.reset();
      } else {
        const code = data.error;
        const msg =
          (code && CONTACT_API_ERROR_MESSAGES[code]) ||
          code ||
          (res.status === 0 ? 'Network error.' : 'Something went wrong. Please call us or try again.');
        showFlash('err', msg);
        if (code === 'invalid_phone') document.getElementById('contact-phone')?.focus();
      }
    } catch {
      showFlash(
        'err',
        'Could not reach the email service. If you are testing locally, run: cd contact-server && npm run dev',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="cta" id="contact">
      <div className="si cta-inner">
        <div>
          <div className="stag">
            <span className="stag-line" />
            <span className="stag-text">Get in Touch</span>
          </div>
          <h2 className="cta-heading">
            Ready to begin your <em>financial journey</em> with GSM?
          </h2>
          <p className="cta-desc">
            Whether you are just starting out, reviewing your portfolio, or planning for a specific goal — a simple initial conversation is all it takes.
          </p>
          <ul className="cta-promises">
            <li>Suitable for first-time investors and experienced investors</li>
            <li>Your information will be kept confidential</li>
            <li>Guidance based on your need and profile</li>
            <li>Available online or at our Chennai office</li>
          </ul>
        </div>
        <form className="cform" id="contact-form" method="post" action="#" onSubmit={onSubmit}>
          <div className="cform-title">📋 Schedule an Initial Discussion</div>
          <div
            id="contact-form-flash"
            className={`contact-form-flash${
              flash ? (flash.kind === 'ok' ? ' contact-form-flash--ok' : ' contact-form-flash--err') : ''
            }`}
            hidden={!flash}
            role="status"
          >
            {flash?.text}
          </div>
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="contact-website">Company website</label>
            <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="frow">
            <div className="field">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="full_name"
                type="text"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">Phone Number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                minLength={10}
                maxLength={10}
                title="10-digit mobile number only (starts with 6, 7, 8, or 9)."
                onKeyDown={onPhoneKeyDown}
                onInput={onPhoneInput}
                onPaste={onPhonePaste}
              />
            </div>
          </div>
          <div className="frow">
            <div className="field ffull">
              <label htmlFor="contact-topic">I would like guidance on</label>
              <select id="contact-topic" name="topic" required>
                <option value="">Select a topic...</option>
                <option value="Mutual Fund Investment Planning">Mutual Fund Investment Planning</option>
                <option value="Insurance">Insurance</option>
                <option value="Goal-Based Investment Discussion">Goal-Based Investment Discussion</option>
                <option value="Tax Saving Guide">Tax Saving Guide</option>
                <option value="NRI Investment Support">NRI Investment Support</option>
                <option value="AIF, PMS & SIF">AIF, PMS & SIF</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Complete Financial Planning Review">Complete Financial Planning Review</option>
              </select>
            </div>
          </div>
          <div className="frow">
            <div className="field ffull">
              <label htmlFor="contact-mode">Preferred Mode</label>
              <select id="contact-mode" name="mode" defaultValue="Online (Zoom / Video Call)">
                <option value="Online (Zoom / Video Call)">Online (Zoom / Video Call)</option>
                <option value="In-Person (Chennai Office)">In-Person (Chennai Office)</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>
          </div>
          <button type="submit" className="fsub" disabled={busy} aria-busy={busy || undefined}>
            Request a Call Back →
          </button>
          <div className="fnote">
            🔒 Your details will be kept confidential and used only to contact you regarding your enquiry.
          </div>
        </form>
      </div>
    </section>
  );
}
