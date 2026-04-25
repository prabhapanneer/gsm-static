/**
 * GSM — contact / enquiry only (no Strapi, no career uploads).
 * POST /contact (application/x-www-form-urlencoded or JSON)
 *
 * Run from this folder: npm install && npm run dev
 * Configure .env (see .env.example). Gmail: use an App Password, not your normal password.
 */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

function strEnv(...keys) {
  for (const k of keys) {
    const v = process.env[k];
    if (v == null || !String(v).trim()) continue;
    let s = String(v).trim();
    if (
      (s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'"))
    ) {
      s = s.slice(1, -1).trim();
    }
    return s;
  }
  return '';
}

function getSmtpConfig() {
  const host = strEnv('SMTP_HOST') || 'smtp.gmail.com';
  const portParsed = Number(strEnv('SMTP_PORT'));
  const port = Number.isFinite(portParsed) && portParsed > 0 ? portParsed : 587;
  const user = strEnv('SMTP_USER', 'GMAIL_USER', 'EMAIL_USER') || '';
  const passRaw = strEnv('SMTP_PASS', 'GMAIL_APP_PASSWORD', 'EMAIL_PASSWORD', 'SMTP_PASSWORD') || '';
  const pass = passRaw.replace(/\s/g, '');
  const mailTo = strEnv('MAIL_TO') || '';
  const mailBcc = strEnv('MAIL_BCC') || '';
  const skipEmail =
    strEnv('FORMS_SKIP_EMAIL') === '1' ||
    String(strEnv('FORMS_SKIP_EMAIL')).toLowerCase() === 'true';
  return { host, port, user, pass, mailTo, mailBcc, skipEmail };
}

function getPort() {
  const p = Number(strEnv('PORT', 'CONTACT_PORT', 'FORMS_PORT'));
  return Number.isFinite(p) && p > 0 ? p : 9006;
}

function stripCrlf(s) {
  return String(s).replace(/[\r\n%0a%0d]/gi, '');
}

function redirectUrls() {
  const ok =
    strEnv('CONTACT_SUCCESS_REDIRECT') ||
    'http://localhost/GSM/index.html?contact=sent#contact';
  const err =
    strEnv('CONTACT_ERROR_REDIRECT') ||
    'http://localhost/GSM/index.html?contact=error#contact';
  return { ok, err };
}

/** Branding for HTML emails (logo must be an absolute URL). */
function getMailBranding() {
  const logoUrl = strEnv('MAIL_LOGO_URL') || '';
  const siteUrl = strEnv('MAIL_SITE_URL', 'PUBLIC_SITE_URL') || 'https://gsminvestservices.com';
  const siteLabel = strEnv('MAIL_SITE_LABEL') || 'GSM Investment Services';
  const year = new Date().getFullYear();
  return { logoUrl, siteUrl, siteLabel, year };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mailTableRow(label, value) {
  return `<tr>
<td style="background-color:#efefef;width:30%;padding:5px 20px;">${escapeHtml(label)}</td>
<td align="left" style="width:70%;padding:5px 20px;background-color:rgba(0,0,0,0.03);font-weight:500;color:#000000">${escapeHtml(value)}</td>
</tr>`;
}

function buildEnquiryEmailHtml({ name, phone, topic, mode }) {
  const { logoUrl, siteUrl, siteLabel, year } = getMailBranding();
  const modeDisplay = mode && String(mode).trim() ? mode : '—';

  const logoBlock = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(siteLabel)}" width="200" style="vertical-align:middle;clear:both;width:100px!important;height:auto;padding-top:40px;padding-bottom:40px">`
    : `<div style="font-size:20px;font-weight:600;padding:40px 20px 30px;color:#0B1F3A;font-family:Jost,Helvetica,Arial,sans-serif;">${escapeHtml(siteLabel)}</div>`;

  const rows = [
    mailTableRow('Full name', name),
    mailTableRow('Phone', phone),
    mailTableRow('I would like guidance on', topic),
    mailTableRow('Preferred mode', modeDisplay),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
<title>${escapeHtml(siteLabel)} — Discussion request</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
</head>
<body style="margin:10px">
<div style="background-color:#f7f7f7;margin:0;padding:0;font-family:Jost,Helvetica,Arial,sans-serif!important;font-size:16px;height:100%;width:100%;min-width:100%">
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="background-color:#f7f7f7;font-family:Jost,Helvetica,Arial,sans-serif!important;font-size:16px;color:#3d3d3d;line-height:1.5;width:100%;min-width:100%">
<tbody>
<tr>
<td align="center" valign="top">
<table border="0" cellpadding="0" cellspacing="0" width="700" style="width:700px;max-width:100%;background-color:#ffffff">
<tbody>
<tr>
<td align="center" valign="top" width="100%" style="width:100%;min-width:100%;background-color:#ffffff">
<table cellpadding="0" border="0" cellspacing="0" width="100%" style="width:100%;min-width:100%">
<tbody>
<tr>
<td align="center" valign="middle" width="100%" style="height:4px;background-color:#0B1F3A;width:100%;min-width:100%;font-size:4px;line-height:4px">
<span style="color:transparent;background:none;opacity:0;width:100%;min-width:100%;height:1px;padding:0;font-size:0">&nbsp;</span>
</td>
</tr>
<tr>
<td align="center" valign="middle" width="100%" style="width:100%;min-width:100%">
${logoBlock}
</td>
</tr>
<tr>
<td align="center" valign="middle" style="padding:0">
<h1 style="font-size:24px;font-weight:600;margin:0;text-align:center;padding-top:10px;padding-bottom:20px;color:#0B1F3A;font-family:Jost,Helvetica,Arial,sans-serif;">Initial discussion request</h1>
<hr style="height:1px;color:#eaf0f6;background-color:#eaf0f6;border:none;margin:0;padding:0">
</td>
</tr>
</tbody>
</table>
<div style="font-size:16px;padding-left:30px;padding-right:30px;line-height:200%;margin-bottom:3rem" align="left">
<div style="font-size:16px;font-family:Jost,Helvetica,Arial,sans-serif!important;width:100%;padding-top:20px;">
<table width="100%" border="0" cellpadding="2" cellspacing="2">
${rows}
</table>
</div>
</div>
<table cellpadding="0" border="0" cellspacing="0" width="100%" style="width:100%;min-width:100%">
<tbody>
<tr>
<td align="center" style="width:100%;padding:5px 20px;font-weight:500;color:#000000">
<p style="font-size:12px;font-weight:500;margin:0;padding-top:10px;text-align:center;padding-bottom:15px;color:rgba(0,0,0,0.3);letter-spacing:0.05em;font-family:Jost,Helvetica,Arial,sans-serif!important">
© ${year}
<a style="text-decoration:none;color:rgba(0,0,0,0.3)!important;font-weight:bold;font-family:Jost,Helvetica,Arial,sans-serif!important" href="${escapeHtml(siteUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(siteLabel)}</a>.
All rights reserved.
</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</body>
</html>`;
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body;
  }
  return {};
}

async function sendEnquiryMail({ name, phone, topic, mode }) {
  const cfg = getSmtpConfig();
  if (cfg.skipEmail) {
    console.warn('[gsm-contact] FORMS_SKIP_EMAIL set — not sending email.');
    return;
  }
  if (!cfg.user || !cfg.pass) {
    throw new Error(
      'SMTP not configured. Set SMTP_USER and SMTP_PASS in contact-server/.env (see .env.example).',
    );
  }
  if (!cfg.mailTo) {
    throw new Error('Set MAIL_TO in contact-server/.env.');
  }

  const subject = `GSM website: discussion request — ${stripCrlf(name.slice(0, 80))}`;
  const text = [
    'New enquiry from the GSM website (Schedule an Initial Discussion).',
    '',
    `Full name: ${name}`,
    `Phone: ${phone}`,
    `Topic: ${topic}`,
    `Preferred mode: ${mode || '(not specified)'}`,
    '',
    `— Sent ${new Date().toISOString()}`,
  ].join('\r\n');

  const html = buildEnquiryEmailHtml({ name, phone, topic, mode });

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
  });

  const safeFromName = stripCrlf(String(name || 'GSM Website').replace(/["<>]/g, '').slice(0, 120));
  const mail = {
    from: `"${safeFromName}" <${cfg.user}>`,
    to: cfg.mailTo,
    subject,
    text,
    html,
  };
  if (cfg.mailBcc) mail.bcc = cfg.mailBcc;

  await transport.sendMail(mail);
}

/** Digits only, for validation (allows +91, spaces, dashes in input). */
function phoneDigitsOnly(raw) {
  return String(raw ?? '').replace(/\D/g, '');
}

/** 10-digit Indian mobile (first digit 6–9). */
function isValidContactPhone(raw) {
  const d = phoneDigitsOnly(raw);
  return d.length === 10 && /^[6-9]\d{9}$/.test(d);
}

function validateAndExtract(body) {
  const website = String(body.website ?? '').trim();
  if (website !== '') {
    return { honeypot: true, name: '', phone: '', topic: '', mode: '' };
  }

  const name = String(body.full_name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const topic = String(body.topic ?? '').trim();
  const mode = String(body.mode ?? '').trim();

  if (!name || !phone || !topic) {
    return { error: 'missing_fields' };
  }
  if (name.length > 200 || phone.length > 10 || topic.length > 300 || mode.length > 200) {
    return { error: 'too_long' };
  }
  if (!isValidContactPhone(phone)) {
    return { error: 'invalid_phone' };
  }
  return { name, phone, topic, mode };
}

const app = express();
const PORT = getPort();
const { ok: REDIRECT_OK, err: REDIRECT_ERR } = redirectUrls();

app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({
    service: 'gsm-contact-gateway',
    post: '/contact',
    health: '/__smtp-check',
  });
});

app.get('/__smtp-check', (_req, res) => {
  const cfg = getSmtpConfig();
  res.json({
    smtpReady: Boolean(cfg.user && cfg.pass && cfg.mailTo) || cfg.skipEmail,
    skipEmail: cfg.skipEmail,
    hasMailTo: Boolean(cfg.mailTo),
    smtpUserLength: cfg.user.length,
    smtpPassLength: cfg.pass.length,
    envPath: path.join(__dirname, '.env'),
    envExists: fs.existsSync(path.join(__dirname, '.env')),
  });
});

app.post('/contact', async (req, res) => {
  const body = parseBody(req);
  const v = validateAndExtract(body);

  const wantsJson = String(req.get('accept') || '').includes('application/json');

  if (v.honeypot) {
    if (wantsJson) return res.json({ ok: true });
    return res.redirect(302, REDIRECT_OK);
  }
  if (v.error) {
    if (wantsJson) {
      return res.status(400).json({ ok: false, error: v.error });
    }
    return res.redirect(302, REDIRECT_ERR);
  }

  try {
    await sendEnquiryMail(v);
    if (wantsJson) return res.json({ ok: true });
    return res.redirect(302, REDIRECT_OK);
  } catch (e) {
    console.error('[gsm-contact]', e);
    if (wantsJson) {
      return res.status(500).json({ ok: false, error: e instanceof Error ? e.message : String(e) });
    }
    return res.redirect(302, REDIRECT_ERR);
  }
});

app.listen(PORT, () => {
  const cfg = getSmtpConfig();
  console.log(`GSM contact gateway: http://127.0.0.1:${PORT}`);
  console.log(`  POST /contact  (same fields as GSM website form)`);
  console.log(`  Site root (for reference): ${ROOT}`);
  console.log(`  Success redirect: ${REDIRECT_OK}`);
  if (cfg.skipEmail) console.warn('  FORMS_SKIP_EMAIL: mail disabled.');
  else if (!cfg.user || !cfg.pass) console.warn('  SMTP: set SMTP_USER + SMTP_PASS in .env');
  else if (!cfg.mailTo) console.warn('  Set MAIL_TO in .env');
  else console.log(`  SMTP: ok (→ ${cfg.mailTo})`);
});
