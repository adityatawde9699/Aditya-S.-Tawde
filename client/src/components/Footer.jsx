import { SOCIAL_LINKS } from '../config/social';
import styles from './Footer.module.css';
export default function Footer() {
  return <footer className={`container ${styles.footer}`}><div className={styles.inner}><a href="#home" className={styles.brand} aria-label="Back to top">AST_</a><span className="mono muted">© {new Date().getFullYear()} ADITYA S. TAWDE</span><div className={styles.links}>{SOCIAL_LINKS.map(({ name, href }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div><a href="#home" className="mono" aria-label="Back to top">BACK TO TOP ↑</a></div></footer>;
}
