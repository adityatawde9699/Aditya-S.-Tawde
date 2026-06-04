import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, BrainCircuit, Cloud, BarChart2, Code2 } from 'lucide-react';
import { SKILLS_DATA } from '../data/projectData';
import { getSkills } from '../services/api';
import { useApi } from '../hooks';
import SectionHeader from './SectionHeader';
import styles from './Skills.module.css';

const ICON_MAP = {
  brain: BrainCircuit,
  chart: BarChart2,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  code: Code2,
};

const COLOR_MAP = {
  purple: { bg: 'rgba(189, 147, 249, 0.1)', border: 'rgba(189, 147, 249, 0.2)', text: '#BD93F9' },
  cyan:   { bg: 'rgba(139, 233, 253, 0.1)', border: 'rgba(139, 233, 253, 0.2)', text: '#8BE9FD' },
  pink:   { bg: 'rgba(255, 121, 198, 0.1)', border: 'rgba(255, 121, 198, 0.2)', text: '#FF79C6' },
  green:  { bg: 'rgba(80, 250, 123, 0.1)',  border: 'rgba(80, 250, 123, 0.2)',  text: '#50FA7B' },
  orange: { bg: 'rgba(255, 184, 108, 0.1)', border: 'rgba(255, 184, 108, 0.2)', text: '#FFB86C' },
  yellow: { bg: 'rgba(241, 250, 140, 0.1)', border: 'rgba(241, 250, 140, 0.2)', text: '#F1FA8C' },
};

const CATEGORY_MAP = {
  FRONTEND: { icon: 'globe', color: 'pink', title: 'Web Development' },
  BACKEND:  { icon: 'server', color: 'green', title: 'Backend & APIs' },
  AI_ML:    { icon: 'brain', color: 'purple', title: 'AI & Machine Learning' },
  TOOLS:    { icon: 'cloud', color: 'orange', title: 'Cloud & DevOps' },
  OTHER:    { icon: 'code', color: 'yellow', title: 'Languages & Tools' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};

const Skills = () => {
  const { data: rawSkills, loading } = useApi(getSkills, {
    cacheTime: 5 * 60 * 1000,
  });

  const skillsData = useMemo(() => {
    if (!rawSkills || rawSkills.length === 0) return SKILLS_DATA;

    const groups = rawSkills.reduce((acc, skill) => {
      const cat = skill.category || 'OTHER';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill.name);
      return acc;
    }, {});

    return Object.keys(groups).map(cat => {
      const mapped = CATEGORY_MAP[cat] || CATEGORY_MAP.OTHER;
      return {
        icon: mapped.icon,
        color: mapped.color,
        title: mapped.title,
        badges: groups[cat],
      };
    });
  }, [rawSkills]);

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className={styles.container}>
        <SectionHeader
          label="// skills"
          title="Skills & Technologies"
          subtitle="Tools and technologies I use to build intelligent systems"
          center
        />

        <motion.div
          className={styles.skillsGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {(loading ? Array(6).fill(null) : skillsData).map((skill, idx) => {
            if (!skill) {
              return (
                <div className={`${styles.skillCard} ${styles.skeleton}`} key={idx}>
                  <div className={styles.skeletonIcon} />
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonBadges} />
                </div>
              );
            }

            const Icon = ICON_MAP[skill.icon] || Code2;
            const color = COLOR_MAP[skill.color] || COLOR_MAP.purple;

            return (
              <motion.div
                className={styles.skillCard}
                key={skill.title}
                variants={fadeUp}
                style={{
                  '--card-accent-bg': color.bg,
                  '--card-accent-border': color.border,
                  '--card-accent-text': color.text,
                }}
              >
                <div className={styles.cardAccent} aria-hidden="true" />
                <div className={styles.iconWrapper}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{skill.title}</h3>
                <div className={styles.badges}>
                  {skill.badges.map(badge => (
                    <span className={styles.badge} key={badge}>{badge}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;