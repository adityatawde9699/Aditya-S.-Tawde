import { useEffect } from 'react';
import { pageMetadata, pageStructuredData } from '../data/seo';

export default function usePageMetadata(path) {
  useEffect(() => {
    const metadata = pageMetadata(path);
    document.title = metadata.title;
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
      let tag = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.url;
    let schema = document.querySelector('#portfolio-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'portfolio-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(pageStructuredData(path));
  }, [path]);
}
