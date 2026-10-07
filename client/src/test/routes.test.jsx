import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FEATURED_PROJECTS } from '../data/projectData';
import ArchivePage from '../components/ArchivePage';
import ProjectCasePage from '../components/ProjectCasePage';

vi.mock('../components/SystemDiagram', () => ({ default: ({ project }) => <div>{project.title} architecture</div> }));

let host;
let root;
async function render(element) {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => { root.render(element); });
}
afterEach(async () => {
  if (root) await act(async () => { root.unmount(); });
  host?.remove();
  host = null;
  root = null;
});

describe('project routes', () => {
  it('shows a sourced case study with its architecture, flow, and next project', async () => {
    await render(<ProjectCasePage project={FEATURED_PROJECTS[0]} />);
    expect(host.querySelector('h1').textContent).toBe('Amadeus AI');
    expect(host.textContent).toContain('Permission-gated tools');
    expect(host.textContent).toContain('Fake Review Detection');
    expect(host.querySelector('a[href="/systems/fake-review-system"]')).toBeTruthy();
  });
  it('filters the archive by project name and provides a case-study route', async () => {
    await render(<ArchivePage />);
    const input = host.querySelector('#archive-search');
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'LunaMatch');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(host.textContent).toContain('LunaMatch');
    expect(host.textContent).toContain('SHOWING 01 / 17');
    expect(host.textContent).not.toContain('Amadeus AI');
    expect(host.querySelector('a[href="/systems/lunamatch"]')).toBeTruthy();
  });
});
