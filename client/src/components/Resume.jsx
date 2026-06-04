import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BrainCircuit, Code2, GraduationCap } from 'lucide-react';
import { RESUME_PATH } from '../config/social';
import styles from './Resume.module.css';

const HIGHLIGHTS = [
  { icon: BrainCircuit, label: '10+ AI Projects', color: '#BD93F9' },
  { icon: Code2, label: '2+ Years Coding', color: '#8BE9FD' },
  { icon: GraduationCap, label: '15+ Certifications', color: '#FF79C6' },
];

const Resume = () => {
  return (
    <section id="resume" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
        >
          {/* Terminal header */}
          <div className={styles.terminalBar}>
            <div className={styles.terminalDots}>
              <span style={{ background: '#FF5555' }} />
              <span style={{ background: '#FFB86C' }} />
              <span style={{ background: '#50FA7B' }} />
            </div>
            <span className={styles.terminalTitle}>resume.pdf</span>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.iconArea}>
              <FileText size={48} strokeWidth={1.5} />
            </div>

            <div className={styles.textArea}>
              <h3 className={styles.title}>Get My Resume</h3>
              <p className={styles.subtitle}>
                Full overview of my education, skills, projects, and experience — all on one page.
              </p>

              <div className={styles.highlights}>
                {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
                  <div key={label} className={styles.highlight}>
                    <Icon size={16} style={{ color }} aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <a href={RESUME_PATH} className={styles.downloadBtn} download>
                <Download size={18} aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
