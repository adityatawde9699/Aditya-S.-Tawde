import React, { useMemo } from 'react';
import { Globe, Server, BrainCircuit, Cloud, BarChart2, Code2 } from 'lucide-react';
import { getSkills } from '../services/api';
import { useApi } from '../hooks';
import styles from './Skills.module.css';

/**
 * Static fallback skills shown when backend is unavailable.
 * Keeps the portfolio functional even when the API is cold-starting.
 */
const FALLBACK_SKILLS = [
    {
        icon: BrainCircuit,
        title: 'AI & Machine Learning',
        color: 'ai',
        badges: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face'],
    },
    {
        icon: BarChart2,
        title: 'Data Science',
        color: 'data',
        badges: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Jupyter', 'Plotly'],
    },
    {
        icon: Globe,
        title: 'Web Development',
        color: 'web',
        badges: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'Tailwind'],
    },
    {
        icon: Server,
        title: 'Backend & APIs',
        color: 'backend',
        badges: ['FastAPI', 'Django', 'Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'],
    },
    {
        icon: Cloud,
        title: 'Cloud & DevOps',
        color: 'cloud',
        badges: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'Render', 'Vercel'],
    },
    {
        icon: Code2,
        title: 'Languages & Tools',
        color: 'tools',
        badges: ['Python', 'JavaScript', 'TypeScript', 'Bash', 'SQL', 'LaTeX'],
    },
];

const CATEGORY_ICON_MAP = {
    FRONTEND:  Globe,
    BACKEND:   Server,
    AI_ML:     BrainCircuit,
    TOOLS:     Cloud,
    OTHER:     Code2,
    default:   Code2,
};

const CATEGORY_COLOR_MAP = {
    FRONTEND: 'web',
    BACKEND:  'backend',
    AI_ML:    'ai',
    TOOLS:    'cloud',
    OTHER:    'tools',
};

const Skills = () => {
    const { data: rawSkills, loading, error } = useApi(getSkills, {
        cacheTime: 5 * 60 * 1000,
    });

    const skillsData = useMemo(() => {
        if (!rawSkills || rawSkills.length === 0) return FALLBACK_SKILLS;

        const groups = rawSkills.reduce((acc, skill) => {
            const cat = skill.category || 'OTHER';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill.name);
            return acc;
        }, {});

        return Object.keys(groups).map(cat => {
            const IconComponent = CATEGORY_ICON_MAP[cat] || CATEGORY_ICON_MAP.default;
            return {
                icon: IconComponent,
                title: cat === 'AI_ML' ? 'AI & Machine Learning'
                    : cat === 'FRONTEND' ? 'Web Development'
                    : cat === 'BACKEND' ? 'Backend & APIs'
                    : cat === 'TOOLS' ? 'Cloud & DevOps'
                    : 'Other Skills',
                color: CATEGORY_COLOR_MAP[cat] || 'tools',
                badges: groups[cat],
            };
        });
    }, [rawSkills]);

    return (
        <section id="skills" className={styles.skillsSection} aria-labelledby="skills-heading">
            <div className={styles.sectionHeader}>
                <span className="section-label">Expertise</span>
                <h2 id="skills-heading" className={`section-heading ${styles.headingCenter}`}>
                    Skills &amp; Technologies
                </h2>
                <p className={styles.sectionSubtitle}>
                    Tools and technologies I work with to build intelligent systems
                </p>
            </div>

            {loading ? (
                <div className={styles.skillsGrid}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div className={`${styles.skillCard} ${styles.loading}`} key={i}>
                            <div className={styles.loadingIcon} />
                            <div className={styles.loadingTitle} />
                            <div className={styles.loadingBadges} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.skillsGrid}>
                    {skillsData.map(skill => {
                        const Icon = skill.icon;
                        return (
                            <div
                                className={`${styles.skillCard} ${styles[`color-${skill.color}`]}`}
                                tabIndex={0}
                                key={skill.title}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrapper}>
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <h3 className={styles.cardTitle}>{skill.title}</h3>
                                </div>
                                <div className={styles.skillBadges}>
                                    {skill.badges.map(badge => (
                                        <span className={styles.badge} key={badge}>{badge}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {error && !loading && (
                <p className={styles.errorNote}>
                    Showing cached skills — live data temporarily unavailable
                </p>
            )}
        </section>
    );
};

export default Skills;