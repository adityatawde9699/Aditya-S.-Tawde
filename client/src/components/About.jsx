import React, { useState } from 'react';
import { Brain, Code2, Lightbulb, Rocket, GraduationCap, Zap } from 'lucide-react';
import styles from './About.module.css';

const STATS = [
    { value: '10+', label: 'AI/ML Projects', icon: Brain },
    { value: '15+', label: 'Certifications', icon: GraduationCap },
    { value: '2+',  label: 'Years Coding',   icon: Code2 },
];

const TECH_STACK = [
    'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn',
    'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Pandas', 'NumPy',
];

const TABS = {
    skills: {
        icon: Zap,
        title: 'Technical Skills',
        content: [
            '🤖 Machine Learning & Deep Learning',
            '📊 Data Analysis & Visualization',
            '🌐 Full Stack Web Development',
            '🐍 Python & JavaScript/TypeScript',
            '🗄️ SQL & NoSQL Databases',
            '☁️ Cloud & MLOps Fundamentals',
        ],
    },
    experience: {
        icon: Rocket,
        title: 'What I Build',
        content: [
            '🔬 End-to-end ML pipelines & model deployment',
            '📈 Data science research & EDA',
            '🛠️ Production-grade REST APIs with FastAPI',
            '🖥️ Responsive full-stack web applications',
            '⚙️ Process automation & scripting',
            '🤝 Open-source collaboration & teamwork',
        ],
    },
    interests: {
        icon: Lightbulb,
        title: 'Interests',
        content: [
            '🧠 Large Language Models & Generative AI',
            '👁️ Computer Vision & Image Recognition',
            '💬 Natural Language Processing',
            '☁️ Cloud-Native ML Infrastructure',
            '🚀 Emerging AI Research & Papers',
            '🏗️ Building AI-powered products',
        ],
    },
};

const About = () => {
    const [activeTab, setActiveTab] = useState('skills');

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className={`${styles.aboutSection} animate-fade-in-up`}
        >
            {/* Section Header */}
            <div className={styles.sectionHeader}>
                <span className="section-label">About</span>
                <h2 id="about-heading" className={`section-heading ${styles.headingCenter}`}>
                    Who I Am
                </h2>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                {STATS.map(({ value, label, icon: Icon }) => (
                    <div key={label} className={styles.statCard}>
                        <Icon size={22} className={styles.statIcon} aria-hidden="true" />
                        <strong className={styles.statValue}>{value}</strong>
                        <span className={styles.statLabel}>{label}</span>
                    </div>
                ))}
            </div>

            <div className={styles.aboutContent}>
                {/* Bio */}
                <div className={styles.aboutText}>
                    <p className={styles.aboutIntro}>
                        Hi, I&apos;m <strong>Aditya S. Tawde</strong> — an aspiring{' '}
                        <strong className={styles.highlight}>AI &amp; Data Science Engineer</strong> currently
                        pursuing a <strong>B.Tech at JNEC</strong>. My passion lives at the intersection of
                        mathematics, data, and software: building systems that can <em>learn, reason, and adapt</em>.
                    </p>
                    <p className={styles.aboutIntro}>
                        Whether it&apos;s training a deep learning model, designing a scalable API, or visualizing
                        complex datasets — I approach every problem with curiosity and a focus on impact.
                        I&apos;m actively seeking <strong>internship &amp; collaboration opportunities</strong> where
                        I can contribute to cutting-edge AI solutions.
                    </p>

                    {/* Currently building with */}
                    <div className={styles.currentlyBuilding}>
                        <span className={styles.buildingLabel}>
                            <Zap size={13} aria-hidden="true" />
                            Currently building with:
                        </span>
                        <div className={styles.techPills}>
                            {TECH_STACK.map(tech => (
                                <span key={tech} className={styles.techPill}>{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className={styles.tabsContainer}>
                        <div className={styles.tabsHeader} role="tablist" aria-label="About tabs">
                            {Object.entries(TABS).map(([key, { icon: Icon, title }]) => (
                                <button
                                    key={key}
                                    role="tab"
                                    aria-selected={activeTab === key}
                                    className={`${styles.tabButton} ${activeTab === key ? styles.active : ''}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    <Icon size={15} aria-hidden="true" />
                                    {title}
                                </button>
                            ))}
                        </div>

                        <div className={styles.tabContent} role="tabpanel">
                            <ul className={styles.tabList}>
                                {TABS[activeTab].content.map((item, idx) => (
                                    <li key={idx} className={styles.tabItem}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Looking For */}
                    <div className={styles.aboutCta}>
                        <h3 className={styles.ctaHeading}>Open to Opportunities In</h3>
                        <div className={styles.opportunitiesGrid}>
                            {['AI/Data Science', 'ML Engineering', 'Research Roles', 'Remote Positions'].map(opp => (
                                <div key={opp} className={styles.opportunityCard}>
                                    <Rocket size={14} aria-hidden="true" />
                                    {opp}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;