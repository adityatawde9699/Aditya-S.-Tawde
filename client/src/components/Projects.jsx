import { FEATURED_PROJECTS, mergeProjects } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import SectionHeader from './SectionHeader';
import SystemDiagram from './SystemDiagram';
import styles from './Projects.module.css';
export default function Projects() {
  const { projects = [], projectVisibility = {} } = usePortfolio();
  const selected = mergeProjects(FEATURED_PROJECTS, projects, projectVisibility);
  return <section id="projects" className="lab-section" aria-labelledby="projects-heading">
    <SectionHeader id="projects-heading" label="01" title="Selected systems" subtitle="RESEARCH → ARCHITECTURE → IMPLEMENTATION" />
    <p className={styles.intro}>Ideas are the starting point.<br /><span>The system is the work.</span></p>
    <div className={styles.index}><span className="mono muted">SELECTED WORK / {String(selected.length).padStart(2, '0')} SYSTEMS</span><span className="mono muted">SOURCE AVAILABLE ↗</span></div>
    {selected.map(project => <article key={project.id} id={project.id} className={styles.caseStudy} aria-labelledby={`${project.id}-title`}>
      <div className={styles.projectMeta}><span className="mono muted">SYS_{String(FEATURED_PROJECTS.indexOf(FEATURED_PROJECTS.find(p => p.id === project.id)) + 1).padStart(3, '0')}</span><span className="mono muted">{project.categoryDisplay}</span><span className="mono eyebrow"><span className="status-dot" />{project.status}</span></div>
      <div className={styles.projectGrid}>
        <div className={styles.copy} data-motion><h3 id={`${project.id}-title`}>{project.title}</h3><p className={`mono ${styles.subtitle}`}>{project.subtitle}</p>
          <dl className={styles.explanation}>{[['Problem', project.problem], ['System', project.system], ['Built', project.built]].map(([key, value]) => <div key={key}><dt className="mono muted">{key}</dt><dd>{value}</dd></div>)}</dl>
          <ul className={styles.tech} aria-label={`${project.title} technology stack`}>{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul>
          <div className={styles.links}><a href={project.githubLink} className="text-link" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub source`}>GitHub <span aria-hidden="true">↗</span></a>{project.liveLink && <a href={project.liveLink} className="text-link" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} demo`}>Demo <span aria-hidden="true">↗</span></a>}</div>
        </div>
        <div className={styles.visual}><div className={styles.visualHeading}><span>SYSTEM STUDY / {project.visual.toUpperCase()}</span><span>↗</span></div><SystemDiagram project={project} /><ul className={styles.notes}>{project.notes.map(note => <li key={note}>{note}</li>)}</ul></div>
      </div>
    </article>)}
  </section>;
}
