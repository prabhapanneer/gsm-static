import fs from 'node:fs';
import path from 'node:path';

const lines = [
  'GSM Investment Services',
  'Monthly Newsletter - Sample Edition',
  'August 2026',
  '',
  'This is a sample newsletter PDF so visitors can try',
  'View and Download on the Newsletter archive page.',
  '',
  'Replace this file with your real monthly PDF and',
  'update src/data/newsletters.ts when you publish.',
  '',
  'Contents in a typical edition may include:',
  '- Market notes in plain language',
  '- Mutual fund and SIP reminders',
  '- Practical planning tips for families',
  '',
  'www.gsminvestservices.blog',
  'info@gsminvestservices.com',
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const contentParts = ['BT', '/F1 16 Tf', '50 780 Td', '18 TL'];
lines.forEach((line, i) => {
  const escaped = esc(line);
  if (i === 0) contentParts.push(`(${escaped}) Tj`);
  else contentParts.push('T*', `(${escaped}) Tj`);
});
contentParts.push('ET');
const stream = contentParts.join('\n');
const streamLen = Buffer.byteLength(stream, 'utf8');

const objects = [
  '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n',
  '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n',
  '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n',
  `4 0 obj<< /Length ${streamLen} >>stream\n${stream}\nendstream\nendobj\n`,
  '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n',
];

let pdf = '%PDF-1.4\n';
const offsets = [0];
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'));
  pdf += obj;
}
const xrefPos = Buffer.byteLength(pdf, 'utf8');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

const outDir = path.join('assets', 'newsletters');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'gsm-newsletter-2026-08-sample.pdf');
fs.writeFileSync(outFile, pdf);
console.log('wrote', outFile, fs.statSync(outFile).size, 'bytes');
