/**
 * Copy tracked `assets/` into `public/assets/` for Vite (publicDir).
 * Merge-only: does not delete extra files already in public/.
 */
import { cpSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'assets');
const dest = join(root, 'public', 'assets');
const htaccessSrc = join(root, 'public', '.htaccess');
const htaccessTracked = join(root, 'static', '.htaccess');

mkdirSync(join(root, 'public'), { recursive: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

// Always refresh SPA rewrite rules from tracked static/.htaccess
if (existsSync(htaccessTracked)) {
  copyFileSync(htaccessTracked, htaccessSrc);
}

console.log('Synced assets/ → public/assets/');
