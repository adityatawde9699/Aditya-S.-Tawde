import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../data/projectData';
import { getExperience } from '../services/api';
import { useApi } from '../hooks';
import SectionHeader from './SectionHeader';
import styles from './Experience.module.css';

const COLOR_MAP = {
  purple: { dot: '#BD93F9', bg: 'rgba(189, 147, 249, 0.1)', border: 'rgba(189, 147, 249, 0.2)' },
  cyan:   { dot: '#8BE9FD', bg: 'rgba(139, 233, 253, 0.1)', border: 'rgba(139, 233, 253, 0.2)' },
  green:  { dot: '#50FA7B', bg: 'rgba(80, 250, 123, 0.1)',  border: 'rgba(80, 250, 123, 0.2)' },
  pink:   { dot: '#FF79C6', bg: 'rgba(255, 121, 198, 0.1)', border: 'rgba(255, 121, 198, 0.2)' },
  orange: { dot: '#FFB86C', bg: 'rgba(255, 184, 108, 0.1)', border: 'rgba(255, 184, 108, 0.2)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};

const Experience = () => {
  const { data: apiData } = useApi(getExperience, { cacheTime: 300000 });
  const data = apiData?.length > 0 ? apiData : EXPERIENCE_DATA;

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <SectionHeader
          label="// experience"
          title="Experience & Journey"
          subtitle="Hackathons, engineering projects, and continuous learning"
        />

        <motion.div
          className={styles.timeline}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Timeline line */}
          <div className={styles.timelineLine} aria-hidden="true" />

          {data.map((group) => {
            const color = COLOR_MAP[group.color] || COLOR_MAP.purple;

            return (
              <motion.div
                key={group.id}
                className={styles.timelineGroup}
                variants={fadeUp}
              >
                {/* Timeline dot */}
                <div
                  className={styles.timelineDot}
                  style={{ background: color.dot, boxShadow: `0 0 12px ${color.dot}40` }}
                  aria-hidden="true"
                />

                {/* Group card */}
                <div className={styles.groupCard}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupIcon} aria-hidden="true">{group.icon}</span>
                    <h3 className={styles.groupTitle}>{group.title}</h3>
                  </div>

                  <div className={styles.itemsList}>
                    {group.items.map((item, idx) => (
                      <div key={idx} className={styles.item}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span
                            className={styles.itemDate}
                            style={{ color: color.dot, background: color.bg, borderColor: color.border }}
                          >
                            {item.date}
                          </span>
                        </div>
                        <p className={styles.itemDetail}>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
