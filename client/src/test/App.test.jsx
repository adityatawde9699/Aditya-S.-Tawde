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
vi.mock('../components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../components/Backdrop', () => ({ default: () => <div>Backdrop</div> }));
vi.mock('../components/ErrorBoundary', () => ({ default: ({ children }) => <>{children}</> }));
// Lazy-loaded sections
vi.mock('../components/Projects', () => ({ default: () => <div>Projects</div> }));
vi.mock('../components/Experience', () => ({ default: () => <div>Experience</div> }));
vi.mock('../components/Resume', () => ({ default: () => <div>Resume</div> }));
vi.mock('../components/Contact', () => ({ default: () => <div>Contact</div> }));

import App from '../App';

let container;
let root;

const renderApp = async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () => {
    root.render(<App />);
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
    expect(container.textContent).toContain('Footer');
  });

  it('renders the lazy-loaded sections', async () => {
    await renderApp();

    expect(container.textContent).toContain('Projects');
    expect(container.textContent).toContain('Experience');
    expect(container.textContent).toContain('Resume');
    expect(container.textContent).toContain('Contact');
  });
});
