import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Brain, Palette, Rocket, Zap } from 'lucide-react';
import SectionHeader from './SectionHeader';
import styles from './About.module.css';

const TECH_STACK = [
  'Python', 'PyTorch', 'React', 'FastAPI', 'PostgreSQL',
  'Docker', 'Pandas', 'NumPy', 'Rust', 'TypeScript',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};

const About = () => {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <SectionHeader
          label="// about"
          title="Who I Am"
          subtitle="AI & Data Science engineer building intelligent systems that learn, reason, and adapt."
        />

        {/* Bento Grid */}
        <motion.div
          className={styles.bentoGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Bio Card — spans 2 columns */}
          <motion.div className={`${styles.bentoCard} ${styles.bioCard}`} variants={fadeUp}>
            <div className={styles.cardIcon}>
              <Code2 size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>The Developer</h3>
            <p className={styles.cardText}>
              I&apos;m <strong>Aditya S. Tawde</strong> — an{' '}
              <span className={styles.highlight}>AI & Data Science Engineer</span> pursuing
              B.Tech at JNEC (MGMU). My passion lives at the intersection of mathematics,
              data, and software engineering.
            </p>
            <p className={styles.cardText}>
              I build production-grade systems — from autonomous AI assistants with semantic
              tool routing to full-stack finance platforms with multi-LLM fallback chains.
              Every project is engineered for real-world constraints, not toy demos.
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div className={`${styles.bentoCard} ${styles.eduCard}`} variants={fadeUp}>
            <div className={styles.cardIcon}>
              <GraduationCap size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Education</h3>
            <div className={styles.eduInfo}>
              <p className={styles.eduDegree}>B.Tech — AI & Data Science</p>
              <p className={styles.eduCollege}>
                Jawaharlal Nehru Engineering College
              </p>
              <p className={styles.eduUni}>MGMU · Chh. Sambhajinagar</p>
              <span className={styles.eduYear}>2024 – 2028</span>
            </div>
          </motion.div>

          {/* AI Focus Card */}
          <motion.div className={`${styles.bentoCard} ${styles.aiCard}`} variants={fadeUp}>
            <div className={styles.cardIcon}>
              <Brain size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>AI Focus Areas</h3>
            <ul className={styles.focusList}>
              <li>Large Language Models & RAG</li>
              <li>Agent Systems & Tool Routing</li>
              <li>Local-first Inference (4GB RAM)</li>
              <li>Computer Vision & NLP</li>
            </ul>
          </motion.div>

          {/* What I Build Card */}
          <motion.div className={`${styles.bentoCard} ${styles.buildCard}`} variants={fadeUp}>
            <div className={styles.cardIcon}>
              <Rocket size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>What I Build</h3>
            <ul className={styles.focusList}>
              <li>End-to-end ML pipelines</li>
              <li>Production REST APIs</li>
              <li>Full-stack web applications</li>
              <li>Desktop apps (Tauri + Rust)</li>
            </ul>
          </motion.div>

          {/* Beyond Code Card */}
          <motion.div className={`${styles.bentoCard} ${styles.beyondCard}`} variants={fadeUp}>
            <div className={styles.cardIcon}>
              <Palette size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Beyond Code</h3>
            <ul className={styles.focusList}>
              <li>Pencil sketching & anime art</li>
              <li>Japanese language learning</li>
              <li>Trekking & hiking</li>
              <li>Open-source contribution</li>
            </ul>
          </motion.div>

          {/* Tech Stack Bar — spans full width */}
          <motion.div className={`${styles.bentoCard} ${styles.techBar}`} variants={fadeUp}>
            <div className={styles.techBarHeader}>
              <Zap size={14} aria-hidden="true" />
              <span>Currently building with</span>
            </div>
            <div className={styles.techPills}>
              {TECH_STACK.map(tech => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;