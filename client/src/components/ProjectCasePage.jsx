import { FEATURED_PROJECTS } from '../data/projectData';
import SystemDiagram from './SystemDiagram';
import styles from './ProjectCasePage.module.css';

export default function ProjectCasePage({ project }) {
  const index = FEATURED_PROJECTS.findIndex(item => item.id === project.id);
  const next = FEATURED_PROJECTS[(index + 1) % FEATURED_PROJECTS.length];
  return <article className={styles.page}>
    <div className={styles.breadcrumb}><a href="/#projects">← SELECTED SYSTEMS</a><span>SYS_{String(index + 1).padStart(3, '0')} / CASE STUDY</span></div>
    <header className={styles.header}>
      <div className={styles.kicker}><span>{project.categoryDisplay}</span><span><i className="status-dot" />{project.status}</span></div>
      <h1>{project.title}</h1>
      <p className={styles.subtitle}>{project.subtitle}</p>
      <div className={styles.summary}><p>{project.caseStudy?.challenge || project.problem}</p><div><span className="mono muted">STACK / IMPLEMENTATION</span><ul>{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul></div></div>
    </header>
    <section className={styles.figure} aria-labelledby="system-architecture"><div className={styles.figureHeading}><h2 id="system-architecture">FIG. 01 / SYSTEM ARCHITECTURE</h2><span>{project.visual.toUpperCase()} / STUDY</span></div><SystemDiagram project={project} showPipeline={false} /></section>
    <div className={styles.studies}>
      <section><div className={styles.studyHeading}><span>01 /</span><h2>Design approach</h2></div><p>{project.caseStudy?.approach || project.system}</p></section>
      <section><div className={styles.studyHeading}><span>02 /</span><h2>System flow</h2></div><ol className={styles.flow}>{project.flow.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol></section>
      <section><div className={styles.studyHeading}><span>03 /</span><h2>What I built</h2></div><p>{project.caseStudy?.implementation || project.built}</p><ul className={styles.notes}>{project.notes.map((note, i) => <li key={note}><span>{String(i + 1).padStart(2, '0')}</span>{note}</li>)}</ul></section>
      <section><div className={styles.studyHeading}><span>04 /</span><h2>Constraints & status</h2></div><p>{project.caseStudy?.boundaries || project.detail}</p></section>
    </div>
    <div className={styles.outbound}><a className="text-link" href={project.githubLink} target="_blank" rel="noopener noreferrer">VIEW SOURCE ↗</a>{project.liveLink && <a className="text-link" href={project.liveLink} target="_blank" rel="noopener noreferrer">VIEW DEMO ↗</a>}</div>
    <a className={styles.next} href={`/systems/${next.id}`}><span>NEXT SYSTEM / SYS_{String((index + 1) % FEATURED_PROJECTS.length + 1).padStart(3, '0')}</span><strong>{next.title}</strong><span aria-hidden="true">↗</span></a>
  </article>;
}
