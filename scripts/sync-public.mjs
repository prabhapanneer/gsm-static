import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });
rmrf(path.join(publicDir, 'assets'));
copyDir(path.join(root, 'assets'), path.join(publicDir, 'assets'));

// Product pages are React routes now — do not copy *_v12.html into public.
for (const f of fs.readdirSync(publicDir)) {
  if (f.endsWith('_v12.html')) {
    fs.unlinkSync(path.join(publicDir, f));
  }
}

const htaccess = `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccess);

console.log('sync-public: copied assets/ + .htaccess (product pages are SPA routes)');
