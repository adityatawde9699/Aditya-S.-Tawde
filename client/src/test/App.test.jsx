import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// App renders a single page with all sections (no router).
// Mock each section so the test stays fast and focused on composition.
vi.mock('../components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('../components/Hero', () => ({ default: () => <div>Hero</div> }));
vi.mock('../components/About', () => ({ default: () => <div>About</div> }));
vi.mock('../components/Skills', () => ({ default: () => <div>Skills</div> }));
vi.mock('../components/Engineering', () => ({ default: () => <div>Engineering</div> }));
vi.mock('../components/CurrentWork', () => ({ default: () => <div>CurrentWork</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../components/Backdrop', () => ({ default: () => <div>Backdrop</div> }));
vi.mock('../components/ErrorBoundary', () => ({ default: ({ children }) => <>{children}</> }));
// Lazy-loaded sections
vi.mock('../components/Projects', () => ({ default: () => <div>Projects</div> }));
vi.mock('../components/Experience', () => ({ default: () => <div>Experience</div> }));
vi.mock('../components/Archive', () => ({ default: () => <div>Archive</div> }));
vi.mock('../components/Contact', () => ({ default: () => <div>Contact</div> }));

import App from '../App';

let container;
let root;

const renderApp = async (pathname = '/') => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () => {
    root.render(<App pathname={pathname} />);
  });
  // Flush the Suspense boundary so lazy sections resolve.
  await act(async () => {
    await Promise.resolve();
  });
};

afterEach(async () => {
  if (root) {
    await act(async () => {
      root.unmount();
    });
  }
  container?.remove();
  container = null;
  root = null;
});

describe('App', () => {
  it('renders the eager homepage sections', async () => {
    await renderApp();

    expect(container.textContent).toContain('Header');
    expect(container.textContent).toContain('Hero');
    expect(container.textContent).toContain('About');
    expect(container.textContent).toContain('Skills');
    expect(container.textContent).toContain('Engineering');
    expect(container.textContent).toContain('CurrentWork');
    expect(container.textContent).toContain('Footer');
  });

  it('renders the lazy-loaded sections', async () => {
    await renderApp();

    expect(container.textContent).toContain('Projects');
    expect(container.textContent).toContain('Experience');
    expect(container.textContent).toContain('Archive');
    expect(container.textContent).toContain('Contact');
  });

  it('keeps search and social metadata aligned and restores indexing after an unknown route', async () => {
    await renderApp('/missing-page');
    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
    await act(async () => { root.render(<App pathname="/archive" />); });
    expect(document.querySelector('meta[name="robots"]').content).toBe('index, follow');
    expect(document.querySelector('meta[property="og:title"]').content).toBe(document.title);
    expect(document.querySelector('meta[name="twitter:title"]').content).toBe(document.title);
    expect(document.querySelector('link[rel="canonical"]').href).toBe('https://adityastawde.vercel.app/archive');
    expect(JSON.parse(document.querySelector('#portfolio-schema').textContent)['@graph']).toContainEqual(expect.objectContaining({ '@type': 'CollectionPage' }));
  });
});
