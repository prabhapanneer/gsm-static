/**
 * Extract product page content (header.top + main) from *_v12.html into JSON for React.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const pages = [
  { file: 'mutual-funds_v12.html', slug: 'mutual-funds', title: 'Mutual Funds' },
  { file: 'insurance-planning_v12.html', slug: 'insurance', title: 'Insurance' },
  { file: 'fixed-deposits-bonds_v12.html', slug: 'fixed-deposits-bonds', title: 'Fixed Deposits & Bonds' },
  { file: 'capital-gain-tax-saving_v12.html', slug: 'capital-gain-tax-saving', title: 'Capital Gain Tax Saving' },
  { file: 'nri-investment-services_v12.html', slug: 'nri-investment-services', title: 'NRI Investment Services' },
  { file: 'aif-pms-sif_v12.html', slug: 'aif-pms-sif', title: 'AIF, PMS & SIF' },
  { file: 'real-estate_v12.html', slug: 'real-estate', title: 'Real Estate' },
];

function rewriteLinks(html) {
  return html
    .replace(/href="index\.html#([^"]+)"/g, 'href="/#$1"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="mutual-funds_v12\.html"/g, 'href="/mutual-funds"')
    .replace(/href="insurance-planning_v12\.html"/g, 'href="/insurance"')
    .replace(/href="fixed-deposits-bonds_v12\.html"/g, 'href="/fixed-deposits-bonds"')
    .replace(/href="capital-gain-tax-saving_v12\.html"/g, 'href="/capital-gain-tax-saving"')
    .replace(/href="nri-investment-services_v12\.html"/g, 'href="/nri-investment-services"')
    .replace(/href="aif-pms-sif_v12\.html"/g, 'href="/aif-pms-sif"')
    .replace(/href="real-estate_v12\.html"/g, 'href="/real-estate"');
}

const out = {};
for (const p of pages) {
  const raw = fs.readFileSync(path.join(root, p.file), 'utf8');
  const headerMatch = raw.match(/<header class="top">[\s\S]*?<\/header>/);
  const mainMatch = raw.match(/<main class="content">[\s\S]*?<\/main>/);
  if (!headerMatch || !mainMatch) {
    console.error('Failed extract', p.file);
    process.exit(1);
  }
  out[p.slug] = {
    slug: p.slug,
    title: p.title,
    documentTitle: `${p.title} | GSM Investment Services`,
    html: rewriteLinks(headerMatch[0] + '\n' + mainMatch[0]),
  };
}

const dest = path.join(root, 'src', 'data', 'productPages.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log('Wrote', dest, Object.keys(out).length, 'pages');
