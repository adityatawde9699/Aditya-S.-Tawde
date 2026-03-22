import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('../components/Hero', () => ({ default: () => <div>Hero</div> }));
vi.mock('../components/About', () => ({ default: () => <div>About</div> }));
vi.mock('../components/TechStack', () => ({ default: () => <div>TechStack</div> }));
vi.mock('../components/Skills', () => ({ default: () => <div>Skills</div> }));
vi.mock('../components/Education', () => ({ default: () => <div>Education</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../components/ErrorBoundary', () => ({ default: ({ children }) => <>{children}</> }));
vi.mock('../components/Certifications', () => ({ default: () => <div>Certifications</div> }));
vi.mock('../components/Projects', () => ({ default: () => <div>Projects</div> }));
vi.mock('../components/Contact', () => ({ default: () => <div>Contact</div> }));

import App from '../App';

let container;
let root;

const renderApp = async (path = '/') => {
  window.history.pushState({}, '', path);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () => {
    root.render(<App />);
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
  window.history.pushState({}, '', '/');
});

describe('App routing', () => {
  it('renders homepage sections on the root route', async () => {
    await renderApp('/');

    expect(container.textContent).toContain('Hero');
    expect(container.textContent).toContain('Education');
  });

  it('renders the not found route for unknown paths', async () => {
    await renderApp('/missing-route');

    expect(container.textContent).toContain('Page not found');
    expect(container.textContent).toContain('Return home');
  });
});
