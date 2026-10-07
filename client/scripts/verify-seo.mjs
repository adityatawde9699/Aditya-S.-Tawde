import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Window } from 'happy-dom';
import { PUBLIC_PATHS, SITE_URL } from '../dist-ssr/entry-server.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const titles = new Set();
const manifest = JSON.parse(await readFile(resolve(root, '.vite/manifest.json'), 'utf8'));
const styles = new Set(Object.values(manifest).flatMap(entry => entry.css || []));

for (const path of [...PUBLIC_PATHS, '/404']) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  const window = new Window();
  const document = new window.DOMParser().parseFromString(await readFile(resolve(root, file), 'utf8'), 'text/html');
  assert.equal(document.querySelectorAll('h1').length, 1, `${path}: one visible page heading`);
  assert.ok(!titles.has(document.title), `${path}: unique title`);
  titles.add(document.title);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, `${path}: one canonical`);
  assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'), `${SITE_URL}${path}`);
  const description = document.querySelector('meta[name="description"]').content;
  assert.ok(description.length > 50, `${path}: descriptive summary`);
  assert.equal(document.querySelector('meta[property="og:title"]').content, document.title);
  assert.equal(document.querySelector('meta[name="twitter:title"]').content, document.title);
  assert.equal(document.querySelector('meta[property="og:description"]').content, description);
  assert.equal(document.querySelector('meta[name="twitter:description"]').content, description);
  assert.equal(document.querySelector('meta[property="og:url"]').content, `${SITE_URL}${path}`);
  assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1);
  const schema = JSON.parse(document.querySelector('#portfolio-schema').textContent);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.ok(schema['@graph'].some(item => item['@type'] === 'Person'));
  const page = schema['@graph'].find(item => item.url === `${SITE_URL}${path}` && item['@id']?.endsWith('#webpage'));
  if (path !== '/404') {
    assert.equal(page.name, document.title);
    assert.equal(page.description, description);
    assert.equal(document.querySelector('meta[name="robots"]').content, 'index, follow');
  } else assert.equal(document.querySelector('meta[name="robots"]').content, 'noindex, follow');
  for (const style of styles) assert.ok(document.querySelector(`link[rel="stylesheet"][href="/${style}"]`), `${path}: static styles for ${style}`);
  for (const element of document.querySelectorAll('img[src], script[src], link[rel="stylesheet"], a[download]')) {
    const resource = element.getAttribute('src') || element.getAttribute('href');
    if (resource?.startsWith('/')) await access(resolve(root, resource.slice(1)));
  }
  if (path === '/') {
    assert.equal(document.querySelectorAll('#experience ol li').length, 18, 'All original course certificates are rendered');
    assert.ok(document.body.textContent.includes('IBM Generative AI Engineering Professional Certificate'));
    assert.ok(document.body.textContent.includes('1,142 held-out reviews'));
    assert.ok(document.body.textContent.includes('2,000 held-out samples'));
    assert.ok(document.querySelector('a[download][href="/Aditya_Tawde_Resume.docx"]'));
  }
  await window.happyDOM.close();
}
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(locations.sort(), PUBLIC_PATHS.map(path => `${SITE_URL}${path}`).sort());
console.log(`SEO checks passed: ${PUBLIC_PATHS.length} public pages, 404 metadata, static content/assets, and sitemap.`);
