import React from 'react';
import styles from './Skills.module.css';
const skillsData = [
    {
        icon: 'fab fa-python',
        title: 'Python',
        badges: ['NumPy', 'Pandas', 'Scikit-learn'],
    },
    {
        icon: 'fas fa-brain',
        title: 'Machine Learning',
        badges: ['Classification', 'Regression', 'Deep Learning'],
    },
    {
        icon: 'fas fa-database',
        title: 'Data Analysis',
        badges: ['Data Cleaning', 'Visualization', 'Statistical Analysis'],
    },
    {
        icon: 'fab fa-html5',
        title: 'Web Development',
        badges: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
    },
    {
        icon: 'fas fa-cloud',
        title: 'Cloud & DevOps',
        badges: ['AWS', 'Docker', 'Git'],
    },
    {
        icon: 'fas fa-project-diagram',
        title: 'Project Management',
        badges: ['Agile', 'Scrum', 'Team Leadership'],
    },
];

const Skills = () => (
    <section id="skills" className={styles.skillsSection} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.skillsTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
            {skillsData.map(skill => (
                <div className={styles.skillCard} tabIndex={0} key={skill.title}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <h3>{skill.title}</h3>
                    <div className={styles.skillBadges}>
                        {skill.badges.map(badge => (
                            <span className={styles.badge} key={badge}>{badge}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Skills;