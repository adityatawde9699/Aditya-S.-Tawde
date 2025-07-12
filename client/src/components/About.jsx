import React from 'react';
import styles from './About.module.css';
import TechStackScroll from './tech_stack';

const About = () => (
    <section id="about" aria-labelledby="about-heading" className={styles['about-section']}>
        <h2 id="about-heading">About Me</h2>
        <div className={styles['about-content']}>
            <div className={styles['about-text']}>
                <p className={styles['about-intro']}>
                    As a B.Tech student specializing in AI & Data Science at JNEC, I combine strong technical skills with a passion for solving real-world problems through innovative technology solutions.
                </p>
                <div className={styles['about-details']}>
                    <div className={styles['about-column']}>
                        <h3>What I Do</h3>
                        <ul>
                            <li>Develop machine learning models for real-world applications</li>
                            <li>Create data visualization solutions for complex datasets</li>
                            <li>Build full-stack web applications with modern technologies</li>
                            <li>Automate processes using Python scripting</li>
                        </ul>
                    </div>
                    <div className={styles['about-column']}>
                        <h3>What I'm Looking For</h3>
                        <ul>
                            <li>AI/ML internship opportunities</li>
                            <li>Data Science research projects</li>
                            <li>Collaborative development work</li>
                            <li>Remote or hybrid work arrangements</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
      
    </section>
);

export default About; 