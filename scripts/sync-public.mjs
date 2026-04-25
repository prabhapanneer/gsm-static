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
rmrf(path.join(publicDir, 'assets'));
copyDir(path.join(root, 'assets'), path.join(publicDir, 'assets'));

for (const f of fs.readdirSync(root)) {
  if (f.endsWith('_v12.html')) {
    fs.copyFileSync(path.join(root, f), path.join(publicDir, f));
  }
}

console.log('sync-public: copied assets/ and *_v12.html to public/');
