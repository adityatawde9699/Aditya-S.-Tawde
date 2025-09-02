import React, { useState } from 'react';
import styles from './Projects.module.css';


const projectData = [
  {
    title: 'Interactive Portfolio',
    image: '/images/interactive-porfolio.png',
    alt: 'Interactive Portfolio Website',
    links: [
      { href: 'https://github.com/adityatawde9699/interactive-portfolio-website', label: 'Source Code', icon: 'fab fa-github' },
      { href: 'https://adityatawde9699.github.io/interactive-portfolio-website/', label: 'Live Demo', icon: 'fas fa-external-link-alt' },
    ],
    description: 'A modern, interactive portfolio website featuring smooth animations, dynamic content loading, and a responsive design. Includes dark mode support and accessibility features.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design', 'Web Accessibility'],
    tags: ['web'],
  },
  {
    title: 'WeatherForesite - weather web app',
    image: '/images/weatherForesite.png',
    alt: 'Weather Website',
    links: [
      { href: 'https://github.com/adityatawde9699/WeatherForesite', label: 'Source Code', icon: 'fab fa-github' },
    ],
    description: 'A weather web application that provides real-time weather updates and forecasts. Built with React.js it fetches data from a public API to display current weather conditions and forecasts for any location.',
    tech: ['React.js', 'CSS3', 'Responsive Design', 'Web Accessibility'],
    tags: ['web'],
  },
  {
    title: 'Amadeus - AI assistant',
    image: '/images/Amadeus.png',
    alt: 'Ai Assistant',
    links: [
      { href: 'https://github.com/adityatawde9699/Amadeus-AI', label: 'Source Code', icon: 'fab fa-github' },
    ],
    description: 'Amadeus is an AI assistant that helps users with various tasks, including scheduling, reminders, and information retrieval, open and closing, and general queries. It uses gemini ai intelligence for natural language processing to understand user queries and provide relevant responses.',
    tech: ['Python', 'Gemini AI', 'Natural Language Processing', 'Machine Learning', 'Deep Learning'],
    tags: ['ai'],
  },
  {
    title: 'DataScraperViz- webscraping and data visualization',
    image: '/images/price_vs_volume_interactive.png',
    alt: 'data visualization',
    links: [
      { href: 'https://github.com/adityatawde9699/DataScraperViz', label: 'Source Code', icon: 'fab fa-github' },
    ],
    description: 'A Python toolkit that scrapes and analyzes real-time stock market data using Alpha Vantage and job listings from LinkedIn using Selenium. It includes interactive and static visualizations using Matplotlib, Seaborn, and Plotly for actionable insights into financial trends and job market opportunities.',
    tech: ['Python', 'Web Scraping', 'Data Visualization', 'Matplotlib', 'Seaborn', 'Plotly', 'Selenium', 'Alpha Vantage'],
    tags: ['web scrapping', 'data', 'data science', 'visualization'],
  },
];

const tagOptions = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Dev', value: 'web' },
  { label: 'AI/ML', value: 'ai' },
  { label: 'Web Scrapping', value: 'web scrapping' },
  { label: 'Data Science', value: 'data' },
  { label: 'UI/UX', value: 'ui' },
  { label: 'Visualization', value: 'visualization' },
];

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  const filteredProjects =
    selectedTag === 'all'
      ? projectData
      : projectData.filter((project) =>
          project.tags && project.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
        );

  return (
    <section id="projects" aria-labelledby="projects-heading" className={styles['projects-section']}>
      <h2 id="projects-heading">Featured Projects</h2>
      <div className={styles['project-filters']}>
        {tagOptions.map((tag) => (
          <button
            key={tag.value}
            className={
              styles['filter-btn'] +
              (selectedTag === tag.value ? ' ' + styles['active'] : '')
            }
            data-filter={tag.value}
            onClick={() => setSelectedTag(tag.value)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className={styles['project-grid']}>
        {filteredProjects.map((project, idx) => (
          <article
            key={project.title + idx}
            className={styles['project-card']}
            data-category={project.tags ? project.tags.join(' ') : ''}
          >
            <div className={styles['project-image']}>
              <img src={project.image} alt={project.alt} loading="lazy" />
              <div className={styles['project-overlay']}>
                <div className={styles['project-links']}>
                  {project.links.map((link, lidx) => (
                    <a
                      key={link.href + lidx}
                      href={link.href}
                      className={styles['project-link']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={link.icon}></i> {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles['project-content']}>
              <h3>{project.title}</h3>
              <p className={styles['project-description']}>{project.description}</p>
              <div className={styles['project-tech']}>
                {project.tech.map((tech, tIdx) => (
                  <span key={tech + tIdx} className={styles['tech-tag']}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects; 