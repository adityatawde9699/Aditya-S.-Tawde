import React from 'react';
import styles from './Skills.module.css';

const skillsData = [
    {
        icon: 'fab fa-python',
        title: 'Python',
        badges: ['NumPy', 'Pandas', 'Scikit-learn'],
        progress: 90,
        progressClass: styles.pythonProgress,
    },
    {
        icon: 'fas fa-brain',
        title: 'Machine Learning',
        badges: ['Classification', 'Regression', 'Deep Learning'],
        progress: 85,
        progressClass: styles.mlProgress,
    },
    {
        icon: 'fas fa-database',
        title: 'Data Analysis',
        badges: ['Data Cleaning', 'Visualization', 'Statistical Analysis'],
        progress: 80,
        progressClass: styles.dataProgress,
    },
    {
        icon: 'fab fa-html5',
        title: 'Web Development',
        badges: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
        progress: 85,
        progressClass: styles.webProgress,
    },
    {
        icon: 'fas fa-cloud',
        title: 'Cloud & DevOps',
        badges: ['AWS', 'Docker', 'Git'],
        progress: 75,
        progressClass: styles.cloudProgress,
    },
    {
        icon: 'fas fa-project-diagram',
        title: 'Project Management',
        badges: ['Agile', 'Scrum', 'Team Leadership'],
        progress: 80,
        progressClass: styles.pmProgress,
    },
];

const Skills = () => (
    <section id="skills" aria-labelledby="skills-heading">
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
                    <div className={styles.progressBar} aria-label={`${skill.title} proficiency`} role="progressbar" aria-valuenow={skill.progress} aria-valuemin={0} aria-valuemax={100}>
                        <div
                            className={`${styles.progress} ${skill.progressClass}`}
                            style={{ width: `${skill.progress}%` }}
                            data-progress={skill.progress}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Skills;
