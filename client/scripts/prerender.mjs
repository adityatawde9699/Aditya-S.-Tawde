import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, PUBLIC_PATHS, SITE_URL, pageMetadata, pageStructuredData } from '../dist-ssr/entry-server.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
// Lazy-section styles must also be available before JavaScript runs.
const manifest = JSON.parse(await readFile(resolve(root, 'dist/.vite/manifest.json'), 'utf8'));
const styles = [...new Set(Object.values(manifest).flatMap(entry => entry.css || []))];
template = template.replace('</head>', `${styles.filter(file => !template.includes(`/${file}`)).map(file => `<link rel="stylesheet" href="/${file}" />`).join('\n')}\n</head>`);
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const path of [...PUBLIC_PATHS, '/404']) {
  const metadata = pageMetadata(path);
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`);
  const tags = [
    ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:url', metadata.url],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
    ['name', 'robots', metadata.index ? 'index, follow' : 'noindex, follow'],
    ['name', 'googlebot', metadata.index ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'],
  ];
  for (const [attribute, value, content] of tags) {
    html = html.replace(new RegExp(`<meta\\s+${attribute}="${value}"[^>]*>`), `<meta ${attribute}="${value}" content="${escape(content)}" />`);
  }
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escape(metadata.url)}" />`);
  html = html.replace(/<script id="portfolio-schema" type="application\/ld\+json">.*?<\/script>/s,
    `<script id="portfolio-schema" type="application/ld+json">${JSON.stringify(pageStructuredData(path)).replaceAll('<', '\\u003c')}</script>`);
  const rendered = await render(path);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${rendered}</div>`);
  const destination = resolve(root, 'dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
  console.log(`Prerendered ${path}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PUBLIC_PATHS.map(path => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
