/**
 * Import / normalize team portraits from assets/images/team (or public copy).
 * Usage: node scripts/import-team-photos.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const destDir = path.join(root, 'assets', 'images', 'team');

const targets = [
  { out: 'ganesan.jpg', match: /ganesan/i },
  { out: 'vishal.jpg', match: /vishal/i },
  { out: 'sethuraman.jpg', match: /seth(u|uraman)/i },
  { out: 'rajendran.jpg', match: /rajendran/i },
  { out: 'kalaimani.jpg', match: /kalaimani/i },
  { out: 'chitra.jpg', match: /chitra/i },
  { out: 'magesh.jpg', match: /magesh/i },
  { out: 'sivaram.jpg', match: /sivaram/i },
  { out: 'joni.jpg', match: /joni/i },
];

const searchDirs = [
  destDir,
  path.join(root, 'public', 'assets', 'images', 'team'),
  path.join(root, 'assets', 'images'),
];

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => path.join(dir, f));
}

const files = searchDirs.flatMap(listImages);
if (!files.length) {
  console.error('No team images found. Place files in assets/images/team/ then re-run.');
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

let written = 0;
for (const t of targets) {
  const src = files.find((f) => t.match.test(path.basename(f)));
  if (!src) {
    console.warn('missing:', t.out);
    continue;
  }
  const out = path.join(destDir, t.out);
  await sharp(src)
    .rotate()
    .resize(700, 700, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log('wrote', path.relative(root, out), '←', path.basename(src));
  written += 1;
}

console.log(`done: ${written}/${targets.length}`);
if (written === 0) process.exit(1);
