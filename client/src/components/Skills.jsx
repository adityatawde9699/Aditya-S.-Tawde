import React, { useState, useEffect } from 'react';
import { getSkills } from '../services/api';
import styles from './Skills.module.css';

const categoryConfig = {
    'FRONTEND': { icon: 'fab fa-html5', title: 'Web Development' },
    'BACKEND': { icon: 'fas fa-server', title: 'Backend Development' },
    'AI_ML': { icon: 'fas fa-brain', title: 'Machine Learning' },
    'TOOLS': { icon: 'fas fa-cloud', title: 'Cloud & DevOps' },
    'OTHER': { icon: 'fas fa-project-diagram', title: 'Project Management' },
    // Fallback
    'default': { icon: 'fas fa-code', title: 'Other Skills' }
};

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await getSkills();
                const rawSkills = response.data;

                // Group by category
                const groups = rawSkills.reduce((acc, skill) => {
                    const cat = skill.category || 'OTHER';
                    if (!acc[cat]) {
                        acc[cat] = [];
                    }
                    acc[cat].push(skill.name);
                    return acc;
                }, {});

                // Transform to UI format
                const transformed = Object.keys(groups).map(cat => {
                    const config = categoryConfig[cat] || categoryConfig['default'];
                    return {
                        icon: config.icon,
                        title: config.title, // Or config.title
                        badges: groups[cat]
                    };
                });

                setSkillsData(transformed);
            } catch (err) {
                console.error("Failed to fetch skills", err);
                // Fallback to empty or keep static if needed, but for now empty
            }
        };

        fetchSkills();
    }, []);

    if (skillsData.length === 0) {
        // Optional: Loading state or fallback
        return null;
    }

    return (
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
};

export default Skills;