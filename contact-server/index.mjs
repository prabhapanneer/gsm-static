/**
 * Optional standalone contact gateway (e.g. production Node host on its own port).
 * Local development: use repo root `npm run dev` — one port for the site + POST /contact.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { registerGsmContactRoutes, ROOT, getSmtpConfig, redirectUrls } from './gateway.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

function getPort() {
  const p = Number(process.env.PORT || process.env.CONTACT_PORT || process.env.FORMS_PORT);
  return Number.isFinite(p) && p > 0 ? p : 9006;
}

const app = express();
registerGsmContactRoutes(app, { rootInfo: true });
const PORT = getPort();
const { ok: REDIRECT_OK } = redirectUrls();

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
