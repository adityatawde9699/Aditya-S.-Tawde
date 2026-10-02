import { ARCHIVE_PROJECTS, mergeProjects, additionalProjects } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import SectionHeader from './SectionHeader';
import styles from './Archive.module.css';
export default function Archive() {
  const { projects = [], projectVisibility = {} } = usePortfolio();
  const entries = [...mergeProjects(ARCHIVE_PROJECTS, projects, projectVisibility), ...additionalProjects(projects, projectVisibility)];
  return <section id="archive" className="lab-section" aria-labelledby="archive-heading"><SectionHeader id="archive-heading" label="06" title="Archive" subtitle="MORE EXPERIMENTS / EARLIER BUILDS" />
    <div className={styles.table}>
      <div className={`mono muted ${styles.tableHeader}`}><span>REPOSITORY</span><span>PURPOSE / IMPLEMENTATION</span><span>SOURCE</span></div>
      {entries.slice(0, 7).map(project => <article key={project.id} className={styles.row}><h3>{project.title}</h3><div><p>{project.purpose}</p><span className="mono muted">{project.techStack.join(' / ')}</span></div>{project.githubLink ? <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${project.title} GitHub source`}>GitHub <span aria-hidden="true">↗</span></a> : <span className={`mono muted ${styles.sourceNote}`}>{project.sourceNote || 'Source unavailable'}</span>}</article>)}
    </div>
    <a className="text-link" href="/archive">Explore full archive ↗</a>
  </section>;
}
