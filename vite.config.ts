import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { gsmContactPlugin } from './scripts/vite-plugin-gsm-contact.mjs';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [gsmContactPlugin(), react(), cloudflare()],
  // Absolute base so React Router paths (/mutual-funds) and /contact API work on the same origin
  base: '/',
  publicDir: 'public',
});