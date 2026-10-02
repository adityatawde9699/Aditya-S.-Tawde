import { describe, expect, it } from 'vitest';
import { FEATURED_PROJECTS, ARCHIVE_PROJECTS, CERTIFICATIONS, mergeProjects, additionalProjects, repositoryKey } from '../data/projectData';

describe('portfolio content and CMS compatibility', () => {
  it('keeps case-study architecture when an older CMS payload loads', () => {
    const source = FEATURED_PROJECTS[0];
    const [project] = mergeProjects([source], [{ id: 1, github_link: `${source.githubLink.toUpperCase()}.git`, description: 'Legacy copy', live_link: 'https://example.com/demo' }]);
    expect(project.system).toBe(source.system);
    expect(project.flow).toEqual(source.flow);
    expect(project.liveLink).toBe('https://example.com/demo');
  });
  it('never restores a curated project explicitly hidden by the CMS', () => {
    expect(mergeProjects(FEATURED_PROJECTS, [], { 'amadeus-ai': false })).not.toContainEqual(expect.objectContaining({ id: 'amadeus-ai' }));
    expect(mergeProjects(ARCHIVE_PROJECTS, [], { librarypro: false })).not.toContainEqual(expect.objectContaining({ id: 'librarypro' }));
  });
  it('retains verified projects with an unavailable or older backend', () => {
    expect(mergeProjects(FEATURED_PROJECTS)).toHaveLength(6);
    expect(CERTIFICATIONS).toHaveLength(8);
  });
  it('adds published CMS repositories without duplicating curated records', () => {
    const data = [
      { id: 1, title: 'Amadeus', github_link: FEATURED_PROJECTS[0].githubLink },
      { id: 2, title: 'Another build', github_link: 'https://github.com/example/build', description: 'New record', tech_stack: [{ name: 'Python' }] },
      { id: 3, title: 'Draft', status: 'DRAFT', github_link: 'https://github.com/example/draft' },
    ];
    expect(additionalProjects(data)).toEqual([expect.objectContaining({ title: 'Another build', techStack: ['Python'] })]);
  });
  it('normalizes repository keys and rejects non-GitHub links', () => {
    expect(repositoryKey('https://github.com/ADITYATAWDE9699/Cognate/')).toBe('/adityatawde9699/cognate');
    expect(repositoryKey('not a url')).toBeNull();
    expect(repositoryKey('https://example.com/Cognate')).toBeNull();
  });
});
