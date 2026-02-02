import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/api';
import { useApi } from '../hooks';
import styles from './Projects.module.css';

/**
 * Projects component displays portfolio projects with category filtering.
 * 
 * Uses the useApi hook for data fetching with 5-minute caching.
 * Category display names come from backend to avoid duplication.
 */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Use the custom hook with caching
  const { data: projects, loading, error } = useApi(getProjects, {
    cacheTime: 5 * 60 * 1000, // 5 minute cache
  });

  // Extract unique categories from projects
  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ['all'];
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return ['all', ...uniqueCategories];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return activeCategory === 'all'
      ? projects
      : projects.filter(project => project.category === activeCategory);
  }, [projects, activeCategory]);

  // Use backend's category_display when available, fallback to friendly names
  const getCategoryDisplayName = (category) => {
    if (category === 'all') return 'All Projects';

    // Find a project with this category to get the display name
    const project = projects?.find(p => p.category === category);
    if (project?.category_display) return project.category_display;

    // Fallback mapping
    const displayNames = {
      'WEB': 'Web Development',
      'MOBILE': 'Mobile Apps',
      'AI_ML': 'AI/ML',
      'DATA': 'Data Science',
      'DESKTOP': 'Desktop Apps',
      'OTHER': 'Other'
    };
    return displayNames[category] || category;
  };

  if (loading) {
    return (
      <section className={styles['projects-section']}>
        <h2>Featured Projects</h2>
        <div className={styles['loading-state']}>
          <div className="text-center p-10">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles['projects-section']}>
        <h2>Featured Projects</h2>
        <div className="text-center p-10 text-red-500">
          {error || 'Could not load projects. Please try again later.'}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className={styles['projects-section']}>
      <h2 id="projects-heading">Featured Projects</h2>

      {/* Category Filter Tabs */}
      <div className={styles['category-filter']}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles['filter-btn']} ${activeCategory === category ? styles['active'] : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryDisplayName(category)}
          </button>
        ))}
      </div>

      <div className={styles['project-grid']}>
        {filteredProjects.map((project, idx) => (
          <motion.article
            key={project.id || idx}
            className={styles['project-card']}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            layout
          >
            <div className={styles['project-image']}>
              {project.image ? (
                <img src={project.image} alt={project.title} loading="lazy" />
              ) : (
                <div className={styles['project-placeholder']}></div>
              )}

              {/* Category Badge */}
              {project.category_display && (
                <span className={styles['category-badge']}>
                  {project.category_display}
                </span>
              )}

              <div className={styles['project-overlay']}>
                <div className={styles['project-links']}>
                  {project.github_link && (
                    <a href={project.github_link} className={styles['project-link']} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> Source Code
                    </a>
                  )}
                  {project.live_link && (
                    <a href={project.live_link} className={styles['project-link']} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className={styles['project-content']}>
              <h3>{project.title}</h3>
              <p className={styles['project-description']}>{project.description}</p>

              {/* Tech Stack Display */}
              <div className={styles['project-tech']}>
                {Array.isArray(project.tech_stack) && project.tech_stack.map((tech, tIdx) => (
                  <span key={tIdx} className={styles['tech-tag']}>
                    {tech.icon_class && <i className={tech.icon_class}></i>}
                    {tech.name || tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className={styles['empty-state']}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default Projects; 