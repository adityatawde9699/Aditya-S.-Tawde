import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from '../data/projectData';
import SectionHeader from './SectionHeader';
import styles from './Projects.module.css';

const COLOR_MAP = {
  purple: '#BD93F9',
  pink: '#FF79C6',
  cyan: '#8BE9FD',
  green: '#50FA7B',
  orange: '#FFB86C',
  yellow: '#F1FA8C',
  red: '#FF5555',
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <SectionHeader
          label="// projects"
          title="Featured Projects"
          subtitle="Production-grade systems, not toy demos. Each project solves real problems."
          center
        />

        {/* Category Filters */}
        <div className={styles.filterBar}>
          {PROJECT_CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${activeCategory === key ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div className={styles.projectGrid} layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const accentColor = COLOR_MAP[project.color] || COLOR_MAP.purple;

              return (
                <motion.article
                  key={project.id}
                  className={styles.projectCard}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  style={{ '--project-accent': accentColor }}
                >
                  {/* Image / Placeholder */}
                  <div className={styles.cardImage}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <Layers size={32} aria-hidden="true" />
                      </div>
                    )}
                    <span className={styles.categoryBadge} style={{ color: accentColor }}>
                      {project.categoryDisplay}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDescription}>{project.description}</p>

                    {/* Architecture */}
                    {project.architecture && (
                      <div className={styles.architecture}>
                        <span className={styles.archLabel}>Architecture:</span>
                        <span className={styles.archText}>{project.architecture}</span>
                      </div>
                    )}

                    {/* Impact */}
                    {project.impact && (
                      <div className={styles.impact}>
                        <span className={styles.impactLabel}>↗</span>
                        <span className={styles.impactText}>{project.impact}</span>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className={styles.techStack}>
                      {project.techStack.map(tech => (
                        <span key={tech} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className={styles.cardLinks}>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardLink}
                          aria-label={`View ${project.title} source code`}
                        >
                          <Github size={16} aria-hidden="true" />
                          Source
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.cardLink} ${styles.liveLink}`}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;