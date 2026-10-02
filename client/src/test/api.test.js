import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

describe('portfolio API behavior', () => {
  it('serves curated fallback without requesting the visitor’s localhost', async () => {
    vi.stubEnv('VITE_API_URL', '');
    const { default: api, getPortfolio, sendContact } = await import('../services/api');
    const adapter = vi.fn();
    api.defaults.adapter = adapter;
    expect((await getPortfolio()).data.projects).toEqual([]);
    await expect(sendContact({})).rejects.toHaveProperty('message', expect.stringContaining('email me directly'));
    expect(adapter).not.toHaveBeenCalled();
  });
  it('coalesces section requests into one populated CMS payload', async () => {
    vi.stubEnv('VITE_API_URL', 'https://example.com/api');
    const { default: api, getPortfolio, getProjects, getSkills } = await import('../services/api');
    const payload = { projects: [{ id: 7, title: 'Build', category: 'AI_ML' }], skills: [{ name: 'Python' }], projectVisibility: { cognate: false } };
    const adapter = vi.fn(async config => ({ data: payload, status: 200, statusText: 'OK', headers: {}, config }));
    api.defaults.adapter = adapter;
    const [all, projects, skills] = await Promise.all([getPortfolio(), getProjects(), getSkills()]);
    expect(all.data.projectVisibility.cognate).toBe(false);
    expect(projects.data).toEqual(payload.projects);
    expect(skills.data).toEqual(payload.skills);
    expect(adapter).toHaveBeenCalledTimes(1);
  });
  it('does not retry contact POSTs after a server failure', async () => {
    vi.stubEnv('VITE_API_URL', 'https://example.com/api');
    const { default: api, sendContact } = await import('../services/api');
    const adapter = vi.fn(async config => { throw { config, response: { status: 500, data: { detail: 'Unavailable' } } }; });
    api.defaults.adapter = adapter;
    await expect(sendContact({ name: 'Aditya' })).rejects.toHaveProperty('message', 'Unavailable');
    expect(adapter).toHaveBeenCalledTimes(1);
  });
  it('clears a failed read cache so a subsequent request can recover', async () => {
    vi.stubEnv('VITE_API_URL', 'https://example.com/api');
    const { default: api, getPortfolio } = await import('../services/api');
    const adapter = vi.fn().mockImplementationOnce(async config => { throw { config, response: { status: 404, data: {} } }; })
      .mockImplementationOnce(async config => ({ data: { projects: [] }, status: 200, statusText: 'OK', headers: {}, config }));
    api.defaults.adapter = adapter;
    await expect(getPortfolio()).rejects.toHaveProperty('status', 404);
    expect((await getPortfolio()).data.projects).toEqual([]);
    expect(adapter).toHaveBeenCalledTimes(2);
  });
});
