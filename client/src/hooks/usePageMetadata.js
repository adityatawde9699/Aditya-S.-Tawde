import { useEffect } from 'react';

const site = 'https://adityastawde.vercel.app';

export default function usePageMetadata(title, description, path) {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const previous = [document.title, canonical?.content || canonical?.href, metaDescription?.content, ogTitle?.content, ogDescription?.content, ogUrl?.content];
    document.title = title;
    if (canonical) canonical.href = `${site}${path}`;
    if (metaDescription) metaDescription.content = description;
    if (ogTitle) ogTitle.content = title;
    if (ogDescription) ogDescription.content = description;
    if (ogUrl) ogUrl.content = `${site}${path}`;
    return () => {
      document.title = previous[0];
      if (canonical && previous[1]) canonical.href = previous[1];
      if (metaDescription && previous[2]) metaDescription.content = previous[2];
      if (ogTitle && previous[3]) ogTitle.content = previous[3];
      if (ogDescription && previous[4]) ogDescription.content = previous[4];
      if (ogUrl && previous[5]) ogUrl.content = previous[5];
    };
  }, [title, description, path]);
}
