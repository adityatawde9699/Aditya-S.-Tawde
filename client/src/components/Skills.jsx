import React, { useMemo } from 'react';
import { getSkills } from '../services/api';
import { useApi } from '../hooks';
import styles from './Skills.module.css';

/**
 * Category configuration for skill display.
 * Maps backend category codes to icons and display titles.
 */
const categoryConfig = {
    'FRONTEND': { icon: 'fab fa-html5', title: 'Web Development' },
    'BACKEND': { icon: 'fas fa-server', title: 'Backend Development' },
    'AI_ML': { icon: 'fas fa-brain', title: 'Machine Learning' },
    'TOOLS': { icon: 'fas fa-cloud', title: 'Cloud & DevOps' },
    'OTHER': { icon: 'fas fa-project-diagram', title: 'Project Management' },
    'default': { icon: 'fas fa-code', title: 'Other Skills' }
};

/**
 * Skills component displays categorized skills with badges.
 * 
 * Uses the useApi hook for data fetching with 5-minute caching.
 * Skills are grouped by category with appropriate icons.
 */
const Skills = () => {
    // Use the custom hook with caching
    const { data: rawSkills, loading, error } = useApi(getSkills, {
        cacheTime: 5 * 60 * 1000, // 5 minute cache
    });

    // Transform raw skills into grouped UI format
    const skillsData = useMemo(() => {
        if (!rawSkills || rawSkills.length === 0) return [];

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
        return Object.keys(groups).map(cat => {
            const config = categoryConfig[cat] || categoryConfig['default'];
            return {
                icon: config.icon,
                title: config.title,
                badges: groups[cat]
            };
        });
    }, [rawSkills]);

    // Explicit loading state (not returning null)
    if (loading) {
        return (
            <section id="skills" className={styles.skillsSection} aria-labelledby="skills-heading">
                <h2 id="skills-heading" className={styles.skillsTitle}>Skills</h2>
                <div className={styles.skillsGrid}>
                    {/* Loading skeleton placeholders */}
                    {[1, 2, 3].map(i => (
                        <div className={`${styles.skillCard} ${styles.loading}`} key={i}>
                            <div className={styles.loadingIcon}></div>
                            <div className={styles.loadingTitle}></div>
                            <div className={styles.loadingBadges}></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section id="skills" className={styles.skillsSection} aria-labelledby="skills-heading">
                <h2 id="skills-heading" className={styles.skillsTitle}>Skills</h2>
                <div className="text-center p-10 text-red-500">
                    Could not load skills. Please try again later.
                </div>
            </section>
        );
    }

    // Empty state (no skills in database)
    if (skillsData.length === 0) {
        return null; // Don't show section if no skills
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