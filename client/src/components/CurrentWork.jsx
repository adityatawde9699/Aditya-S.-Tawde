import { CURRENT_WORK } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import SectionHeader from './SectionHeader';
import styles from './CurrentWork.module.css';
export default function CurrentWork() {
  const { projectVisibility = {} } = usePortfolio();
  return <section id="building" className="lab-section" aria-labelledby="building-heading"><SectionHeader id="building-heading" label="04" title="Currently building" subtitle="AN OPEN WORKBENCH" />
    <div className={styles.board}>{CURRENT_WORK.filter(([, , , id]) => !id || projectVisibility[id] !== false).map(([name, focus, status, id]) => <div key={name} className={styles.row}>
      {id ? <a href={`#${id}`} className={styles.name}>{name}<span aria-hidden="true">↗</span></a> : <span className={styles.name}>{name}</span>}
      <span className={`mono muted ${styles.focus}`}>{focus}</span><span className={`mono eyebrow ${styles.status}`}><span className="status-dot" />{status}</span>
    </div>)}</div>
  </section>;
}
