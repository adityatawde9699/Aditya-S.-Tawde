import { RESUME_PATH } from '../config/social';
import styles from './Hero.module.css';

const focus = ['GENERATIVE AI', 'RAG / LLMs', 'NLP CLASSIFICATION', 'MACHINE LEARNING', 'FULL-STACK APPS'];

export default function Hero() {
  return <section id="home" className={styles.hero} aria-labelledby="hero-heading">
    <div className={styles.scene} aria-hidden="true">
      <picture>
        <source media="(max-width: 640px)" srcSet="/images/workstation/hero-mobile.webp" />
        <img src="/images/workstation/hero.webp" alt="" width="1920" height="711" fetchPriority="high" decoding="async" />
      </picture>
    </div>
    <div className={styles.grid} aria-hidden="true" />
    <div className={`mono ${styles.topline}`}><span>00 / PERSONAL SYSTEMS LAB</span><span>AST_001</span></div>
    <div className={styles.layout}>
      <div className={styles.identity}>
        <p className={`mono ${styles.role}`}>AI &amp; DATA SCIENCE STUDENT<br /><span>GENERATIVE AI / MACHINE LEARNING</span></p>
        <h1 id="hero-heading" className={styles.name}>Aditya S. <span>Tawde</span></h1>
        <p className={`mono ${styles.focus}`}>PYTHON / LANGGRAPH / SCIKIT-LEARN / FASTAPI</p>
        <p className={styles.copy}>I’m a B.Tech AI &amp; Data Science student at JNEC, MGM University. I build LLM applications, retrieval-augmented generation systems, and supervised machine-learning projects with working interfaces.</p>
        <div className={styles.actions}>
          <a href="#projects" className="button">View my work <span aria-hidden="true">→</span></a>
          <a href={RESUME_PATH} download className="button secondary">Download résumé <span aria-hidden="true">↓</span></a>
        </div>
        <div className={`mono ${styles.metadata}`}>
          <span><span aria-hidden="true">⌖</span> INDIA</span>
          <span><span aria-hidden="true">▤</span> JNEC / MGM UNIVERSITY</span>
          <span><span aria-hidden="true">↳</span> JUNE 2024 — PRESENT</span>
        </div>
      </div>
      <aside className={styles.rail} aria-label="System profile">
        <div><span className={styles.label}>SYSTEM</span><p className="eyebrow"><span className="status-dot" /> ONLINE</p></div>
        <div><span className={styles.label}>LOCATION</span><p>INDIA</p></div>
        <div className={styles.focusPanel}><span className={styles.label}>PROJECT FOCUS</span><ul>{focus.map(item => <li key={item}><span aria-hidden="true">/</span> {item}</li>)}</ul></div>
      </aside>
    </div>
    <div className={styles.runtime} aria-hidden="true">
      <span>RUNTIME STUDY / LOCAL-FIRST</span>
      <code>request → plan → tools → memory<span className={styles.cursor}>▌</span></code>
    </div>
    <div className={`mono ${styles.bottomline}`}><span>IBM GENERATIVE AI ENGINEERING CERTIFIED</span><a href="#projects">EXPLORE THE SYSTEMS <span aria-hidden="true">↓</span></a></div>
  </section>;
}
