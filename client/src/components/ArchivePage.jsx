import { useMemo, useState } from 'react';
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS, additionalProjects, mergeProjects } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import usePageMetadata from '../hooks/usePageMetadata';
import styles from './ArchivePage.module.css';

const filters = ['All', 'AI / ML', 'Software', 'Data'];
const aiTerms = /ai|llm|python|pytorch|scikit|whisper|gemini|vision|rag|ocr|geospatial/i;
const dataTerms = /data|pandas|postgres|sqlite|prisma|plotly|prediction|finance/i;
const category = project => aiTerms.test([project.purpose, ...project.techStack].join(' ')) ? 'AI / ML' : dataTerms.test([project.purpose, ...project.techStack].join(' ')) ? 'Data' : 'Software';

export default function ArchivePage() {
  const { projects = [], projectVisibility = {} } = usePortfolio();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const entries = useMemo(() => [
    ...mergeProjects(FEATURED_PROJECTS, projects, projectVisibility).map(project => ({ ...project, purpose: project.subtitle, featured: true })),
    ...mergeProjects(ARCHIVE_PROJECTS, projects, projectVisibility),
    ...additionalProjects(projects, projectVisibility),
  ], [projects, projectVisibility]);
  const matching = entries.filter(project => {
    const text = [project.title, project.purpose, ...project.techStack].join(' ').toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (filter === 'All' || category(project) === filter);
  });
  usePageMetadata('Project Archive — Aditya S. Tawde', 'Explore Aditya S. Tawde’s AI systems, software projects, experiments, and earlier builds.', '/archive');
  return <div className={styles.page}>
    <div className={styles.breadcrumb}><a href="/#archive">← BACK TO LAB</a><span>AST_ / REPOSITORY INDEX</span></div>
    <header className={styles.header}><p className="mono muted">06 / PROJECT ARCHIVE</p><h1>THE ARCHIVE<span>.</span></h1><p>Systems, experiments, and earlier builds. Search by project, purpose, or technology.</p></header>
    <div className={styles.controls}><label htmlFor="archive-search" className="sr-only">Search projects</label><input id="archive-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="SEARCH PROJECTS / TECHNOLOGIES" />
      <div role="group" aria-label="Filter projects" className={styles.filters}>{filters.map(name => <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div></div>
    <div className={styles.results}><span>SHOWING {String(matching.length).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span><span>REPOSITORY / PURPOSE / STACK</span></div>
    <div className={styles.list}>{matching.length ? matching.map((project, index) => <article key={project.id} className={styles.row}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><div className={styles.identity}><h2>{project.title}</h2><p>{project.purpose}</p><ul>{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul></div><div className={styles.actions}>{project.featured && <a href={`/systems/${project.id}`}>CASE STUDY ↗</a>}{project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>}</div></article>) : <p className={styles.empty}>No projects match this search. Try another term or filter.</p>}</div>
  </div>;
}
