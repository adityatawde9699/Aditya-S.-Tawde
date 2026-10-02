import styles from './About.module.css';
import { FEATURED_PROJECTS, ARCHIVE_PROJECTS, CERTIFICATIONS } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
export default function About() {
  const { projectVisibility = {} } = usePortfolio();
  const count = [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS].filter(project => projectVisibility[project.id] !== false).length;
  const fields = [['Role', 'AI Engineer'], ['Focus', 'AI Systems'], ['Primary', 'Python / PyTorch / LLMs'], ['Mode', 'Building'], ['Location', 'India'], ['Education', 'JNEC / MGM University']];
  return <><div className={styles.profile} aria-label="System profile">
    <p className={`mono ${styles.label}`}>SYSTEM<br />PROFILE <span className="muted">↗</span></p>
    <dl className={styles.fields}>{fields.map(([label, value]) => <div key={label}><dt className="mono muted">{label}</dt><dd>{value}</dd></div>)}</dl>
  </div><dl className={styles.metrics} aria-label="Documented portfolio at a glance">{[[count, 'Documented projects'], [CERTIFICATIONS.length, 'Certifications'], [FEATURED_PROJECTS.filter(project => projectVisibility[project.id] !== false).length, 'Selected systems']].map(([value, label]) => <div key={label}><dt className="mono muted">{label}</dt><dd>{String(value).padStart(2, '0')}<span aria-hidden="true">↗</span></dd></div>)}</dl></>;
}
