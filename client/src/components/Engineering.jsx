import SectionHeader from './SectionHeader';
import styles from './Engineering.module.css';
const principles = [
  ['Build systems', 'Think in data flows, boundaries, and failure modes. The interface is one part of the system.'],
  ['Evaluate the method', 'Compare baselines, use cross-validation, and report held-out results with their dataset context.'],
  ['Engineer for constraints', 'Design around memory, compute, connectivity, and privacy. Constraints shape the architecture.'],
  ['Ship → measure → iterate', 'Make it work, inspect its behavior, and improve it with evidence.'],
];
export default function Engineering() {
  return <section id="about" className={`lab-section ${styles.engineering}`} aria-labelledby="engineering-heading"><SectionHeader id="engineering-heading" label="02" title="Engineering" subtitle="HOW I APPROACH THE WORK" />
    <h3 className={styles.statement}>FROM MODEL,<br /><span>TO WORKING SOFTWARE.</span></h3>
    <div className={styles.principles}>{principles.map(([title, copy], i) => <article key={title}><span className="mono muted">0{i + 1}</span><h4>{title}</h4><p>{copy}</p></article>)}</div>
  </section>;
}
