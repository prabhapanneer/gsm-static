import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { gsmContactPlugin } from './scripts/vite-plugin-gsm-contact.mjs';

export default defineConfig({
  plugins: [gsmContactPlugin(), react()],
  // Absolute base so React Router paths (/mutual-funds) and /contact API work on the same origin
  base: '/',
  publicDir: 'public',
});
