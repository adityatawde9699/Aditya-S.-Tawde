import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
export { PUBLIC_PATHS, SITE_URL, pageMetadata, pageStructuredData } from './data/seo';

// Wait for lazy sections so crawlers receive the same complete content as users.
export function render(pathname) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = '';
    output.setEncoding('utf8');
    output.on('data', chunk => { html += chunk; });
    output.on('end', () => resolve(html));
    output.on('error', reject);
    const stream = renderToPipeableStream(<App pathname={pathname} />, {
      onAllReady() { stream.pipe(output); },
      onError(error) { reject(error); },
    });
  });
}
