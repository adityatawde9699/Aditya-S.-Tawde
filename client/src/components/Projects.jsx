import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/api';
import styles from './Projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);

        // Extract unique categories from projects
        const uniqueCategories = [...new Set(response.data.map(p => p.category))];
        setCategories(['all', ...uniqueCategories]);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError("Could not load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Category display names
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      'all': 'All Projects',
      'WEB': 'Web Development',
      'MOBILE': 'Mobile Apps',
      'AI_ML': 'AI/ML',
      'DATA': 'Data Science',
      'DESKTOP': 'Desktop Apps',
      'OTHER': 'Other'
    };
    return displayNames[category] || category;
  };

  if (loading) return <div className="text-center p-10">Loading projects...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

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