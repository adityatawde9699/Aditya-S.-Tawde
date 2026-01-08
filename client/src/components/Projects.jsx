import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/api';
import styles from './Projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Since we don't have tags in the model yet (stored as JSON), we'll do simple client-side logic later
  // For now, fetching all projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError("Could not load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center p-10">Loading projects...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <section id="projects" aria-labelledby="projects-heading" className={styles['projects-section']}>
      <h2 id="projects-heading">Featured Projects</h2>

      <div className={styles['project-grid']}>
        {projects.map((project, idx) => (
          <motion.article
            key={project.id || idx}
            className={styles['project-card']}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles['project-image']}>
              {project.image ? (
                <img src={project.image} alt={project.title} loading="lazy" />
              ) : (
                <div className={styles['project-placeholder']}></div>
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
              <div className={styles['project-tech']}>
                {/* Check if tech_stack is an array or string */}
                {Array.isArray(project.tech_stack) ? project.tech_stack.map((tech, tIdx) => (
                  <span key={tIdx} className={styles['tech-tag']}>{tech}</span>
                )) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects; 