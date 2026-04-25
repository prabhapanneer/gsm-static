import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { gsmContactPlugin } from './scripts/vite-plugin-gsm-contact.mjs';

// Use './' so the built `dist` works when served from a subfolder on Apache or opened as static files.
export default defineConfig({
  // Contact API in dev: POST /contact, GET /__smtp-check (contact-server/.env) — no second port
  plugins: [gsmContactPlugin(), react()],
  base: './',
  publicDir: 'public',
});
