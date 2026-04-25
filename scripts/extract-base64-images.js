/**
 * One-off: replace data:image/...;base64,... in HTML with assets/images/img-<hash>.<ext>
 * Run: node scripts/extract-base64-images.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const imgDir = path.join(root, 'assets', 'images');
const MIME_EXT = { jpeg: 'jpg', jpg: 'jpg', png: 'png', gif: 'gif', webp: 'webp' };

const uriToRel = new Map();
const toWrite = new Map();

function registerUri(fullUri) {
  if (uriToRel.has(fullUri)) return uriToRel.get(fullUri);
  const m = fullUri.match(/^data:image\/(\w+);base64,(.+)$/i);
  if (!m) return null;
  const mime = m[1].toLowerCase();
  const b64 = m[2];
  const ext = MIME_EXT[mime] || 'bin';
  const buf = Buffer.from(b64, 'base64');
  const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
  const fname = `img-${hash}.${ext}`;
  const rel = `assets/images/${fname}`;
  uriToRel.set(fullUri, rel);
  if (!toWrite.has(fname)) toWrite.set(fname, buf);
  return rel;
}

const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

for (const f of htmlFiles) {
  const p = path.join(root, f);
  const html = fs.readFileSync(p, 'utf8');
  const re = /data:image\/\w+;base64,[^"]+/gi;
  let m;
  while ((m = re.exec(html)) !== null) registerUri(m[0]);
}

fs.mkdirSync(imgDir, { recursive: true });
for (const [fname, buf] of toWrite) {
  fs.writeFileSync(path.join(imgDir, fname), buf);
}

for (const f of htmlFiles) {
  const p = path.join(root, f);
  let html = fs.readFileSync(p, 'utf8');
  const uris = [...uriToRel.keys()].sort((a, b) => b.length - a.length);
  for (const uri of uris) {
    const rel = uriToRel.get(uri);
    html = html.split(uri).join(rel);
  }
  fs.writeFileSync(p, html);
}

console.log('Wrote', toWrite.size, 'image file(s); updated', htmlFiles.length, 'HTML file(s).');
