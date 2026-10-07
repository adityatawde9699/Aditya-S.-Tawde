import { CERTIFICATIONS, ACTIVITIES, PROFESSIONAL_CERTIFICATION } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import SectionHeader from './SectionHeader';
import styles from './Experience.module.css';
export default function Experience() {
  const { certifications = [] } = usePortfolio();
  const certificates = [...CERTIFICATIONS];
  for (const certificate of certifications) {
    if (certificate.name.toLowerCase() !== PROFESSIONAL_CERTIFICATION.name.toLowerCase() && !certificates.some(item => item.name.toLowerCase() === certificate.name.toLowerCase())) certificates.push(certificate);
  }
  return <section id="experience" className="lab-section" aria-labelledby="experience-heading"><SectionHeader id="experience-heading" label="05" title="Journey" subtitle="A FOUNDATION, STILL IN PROGRESS" />
    <div className={styles.education}>
      <div className={styles.timeline}><span>JUNE 2024</span><div aria-hidden="true"><i /></div><span>PRESENT</span></div>
      <div className={styles.degree}><p className="mono muted">EDUCATION / IN PROGRESS</p><h3>B.Tech<br /><span>Artificial Intelligence<br />&amp; Data Science</span></h3><p className={styles.college}>MGM’s Jawaharlal Nehru Engineering College (JNEC)<br /><span>MGM University / Chh. Sambhajinagar, India</span></p></div>
    </div>
    <div className={styles.archiveHeader}><h3 className="mono">Certifications</h3><span className="mono muted">{String(certificates.length).padStart(2, '0')} / CONTINUOUS LEARNING</span></div>
    <div className={styles.credential}><p className="mono muted">PROFESSIONAL CERTIFICATE</p><h4>{PROFESSIONAL_CERTIFICATION.name}</h4><p>{PROFESSIONAL_CERTIFICATION.issuer} · {PROFESSIONAL_CERTIFICATION.date} · {PROFESSIONAL_CERTIFICATION.courses} courses</p></div>
    <ol className={styles.certificates}>{certificates.map((certificate, i) => <li key={certificate.name}><span className="mono muted">{String(i + 1).padStart(2, '0')}</span><span>{certificate.name}{certificate.courses && <small className={styles.courseCount}>{certificate.courses}-course professional certificate</small>}</span><span className="mono muted">{certificate.issuer}{certificate.date && <><br />{certificate.date}</>}</span>{certificate.url && <a className="text-link" href={certificate.url} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certificate.name}`}>Verify ↗</a>}</li>)}</ol>
    <div className={styles.archiveHeader}><h3 className="mono">Activities &amp; milestones</h3><span className="mono muted">BUILD / PARTICIPATE / LEARN</span></div>
    <div className={styles.activities}>{ACTIVITIES.map(activity => <div key={activity.name}><span className="mono muted">{activity.date}</span><h4>{activity.name}</h4><p>{activity.detail}</p></div>)}</div>
  </section>;
}
