import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { useApi } from '../hooks';
import { getEducation } from '../services/api';
import styles from './Education.module.css';

const formatEducationPeriod = (startDate, endDate) => {
    const startYear = startDate ? new Date(startDate).getFullYear() : 'Present';
    const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${startYear} – ${endYear}`;
};

/** Static fallback shown when backend is unavailable */
const FALLBACK_EDUCATION = [
    {
        id: 'jnec',
        degree: 'B.Tech in AI & Data Science',
        institution: 'Jawaharlal Nehru Engineering College (JNEC), Chhatrapati Sambhajinagar',
        start_date: '2022-07-01',
        end_date: null, // Present
        description: 'Pursuing a Bachelor of Technology with a specialization in Artificial Intelligence and Data Science. Coursework includes Machine Learning, Deep Learning, Data Structures, Database Management, and Full Stack Development.',
    },
];

const Education = () => {
    const { data: education = [], loading, error } = useApi(getEducation, {
        cacheTime: 5 * 60 * 1000,
    });

    // Use API data if available, otherwise fallback
    const displayEducation = (!loading && Array.isArray(education) && education.length > 0)
        ? education
        : FALLBACK_EDUCATION;


    return (
        <section id="education" aria-labelledby="education-heading" className={styles['education-section']}>
            <div className={styles.sectionHeader}>
                <span className="section-label">Background</span>
                <h2 id="education-heading" className={`section-heading ${styles.headingCenter}`}>
                    Education
                </h2>
            </div>

            {loading && (
                <div className={styles['education-timeline']}>
                    <div className={styles['education-item']}>
                        <div className={`${styles['education-year']} ${styles.loadingPill}`} />
                        <div className={styles['education-content']}>
                            <div className={styles.loadingLine} style={{ width: '60%', height: '1.5rem', marginBottom: '0.5rem' }} />
                            <div className={styles.loadingLine} style={{ width: '80%' }} />
                        </div>
                    </div>
                </div>
            )}

            {!loading && (
                <div className={styles['education-timeline']}>
                    {displayEducation.map((entry) => (
                        <div key={entry.id} className={styles['education-item']}>
                            <div className={styles['education-year']}>
                                <Calendar size={14} aria-hidden="true" />
                                {formatEducationPeriod(entry.start_date, entry.end_date)}
                            </div>
                            <div className={styles['education-content']}>
                                <div className={styles.degreeRow}>
                                    <GraduationCap size={20} className={styles.degreeIcon} aria-hidden="true" />
                                    <h3>{entry.degree}</h3>
                                </div>
                                <h4>{entry.institution}</h4>
                                {entry.description && <p>{entry.description}</p>}
                                {entry.id === 'jnec' && !error && (
                                    <span className={styles.currentBadge}>Currently Enrolled</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Education;
