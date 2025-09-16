import React, { useState } from 'react';
import styles from './About.module.css';
import TechStackScroll from './tech_stack';

const About = () => {
    const [activeTab, setActiveTab] = useState('skills');

    const tabs = {
        skills: {
            title: 'Technical Skills',
            content: [
                'Machine Learning & Deep Learning',
                'Data Analysis & Visualization',
                'Full Stack Development',
                'Python & JavaScript Programming',
                'Database Management (SQL/NoSQL)'
            ]
        },
        experience: {
            title: 'Experience',
            content: [
                'AI/ML Project Development',
                'Data Science Research',
                'Web Application Development',
                'Process Automation',
                'Team Collaboration'
            ]
        },
        interests: {
            title: 'Interests',
            content: [
                'Artificial Intelligence',
                'Computer Vision',
                'Natural Language Processing',
                'Cloud Computing',
                'Emerging Technologies'
            ]
        }
    };

    return (
        <section id="about" aria-labelledby="about-heading" className={styles['about-section']}>
            <h2 id="about-heading">About Me</h2>
            <div className={styles['about-content']}>
                <div className={styles['about-text']}>
                  <p className={styles['about-intro']}>
                    <strong>Hello!</strong> I'm Aditya S. Tawde, an aspiring <strong>AI & Data Science</strong> enthusiast currently seeking internship opportunities. I am pursuing a <strong>B.Tech</strong> at JNEC, where I'm focused on blending technical proficiency with a zeal for solving complex, real-world challenges.
                  </p>
                  <p className={styles['about-intro']}>
                    This portfolio is a showcase of my journey, projects, and the skills I've developed. I'm excited to connect and explore how I can contribute to innovative tech solutions.
                  </p>
                    
                    <div className={styles['tabs-container']}>
                        <div className={styles['tabs-header']}>
                            {Object.keys(tabs).map(tab => (
                                <button
                                    key={tab}
                                    className={`${styles['tab-button']} ${activeTab === tab ? styles['active'] : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tabs[tab].title}
                                </button>
                            ))}
                        </div>
                        
                        <div className={styles['tab-content']}>
                            <ul>
                                {tabs[activeTab].content.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles['about-cta']}>
                        <h3>Looking for Opportunities In:</h3>
                        <div className={styles['opportunities-grid']}>
                            <div className={styles['opportunity-card']}>AI/Data Science Projects</div>
                            <div className={styles['opportunity-card']}>Research Projects</div>
                            <div className={styles['opportunity-card']}>Development Work</div>
                            <div className={styles['opportunity-card']}>Remote Positions</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;