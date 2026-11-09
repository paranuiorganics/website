// Post-build check: every internal href/src in dist/*.html resolves to a built file,
// every #fragment exists on its target page, and every legacy path is still served.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const LEGACY_PATHS = [
  '/', '/products', '/suppliers', '/contact',
  '/palmerstonnorth', '/wanganui', '/levin', '/feilding', '/foxton', '/shannon',
  '/otaki', '/waikanae', '/plimmerton', '/wellington', '/naenae', '/masterton-1', '/marton-copy', '/marton',
  '/ashhurst', '/commercial-recycling',
];

const resolve = (path) => {
  const p = decodeURIComponent(path).replace(/\/$/, '') || '/';
  const candidates = p === '/' ? ['index.html'] : [p.slice(1), `${p.slice(1)}.html`, `${p.slice(1)}/index.html`];
  return candidates.map((c) => join(DIST, c)).find((f) => existsSync(f) && !f.endsWith('/'));
};

const pages = readdirSync(DIST, { recursive: true }).filter((f) => f.endsWith('.html'));
const ids = new Map(pages.map((f) => [join(DIST, f), new Set([...readFileSync(join(DIST, f), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const errors = [];

for (const page of pages) {
  const html = readFileSync(join(DIST, page), 'utf8');
  for (const [, attr, url] of html.matchAll(/\s(href|src|srcset|imagesrcset)="([^"]+)"/g)) {
    const urls = attr.endsWith('srcset') ? url.split(',').map((s) => s.trim().split(/\s+/)[0]) : [url];
    for (const u of urls) {
      if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(u)) continue;
      const [path, frag] = u.split('#');
      const target = path ? resolve(path.startsWith('/') ? path : `/${path}`) : join(DIST, page);
      if (!target) { errors.push(`${page}: broken ${attr} -> ${u}`); continue; }
      if (frag && target.endsWith('.html') && !ids.get(target)?.has(frag)) errors.push(`${page}: missing #${frag} in ${u}`);
    }
  }
}
for (const p of LEGACY_PATHS) if (!resolve(p)) errors.push(`legacy path not served: ${p}`);

if (errors.length) {
  console.error(`✗ ${errors.length} link problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages checked, all internal links resolve, ${LEGACY_PATHS.length} legacy paths served.`);
