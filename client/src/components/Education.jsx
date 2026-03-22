import React from 'react';
import { useApi } from '../hooks';
import { getEducation } from '../services/api';
import styles from './Education.module.css';

const formatEducationPeriod = (startDate, endDate) => {
    const startYear = startDate ? new Date(startDate).getFullYear() : 'Present';
    const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${startYear} - ${endYear}`;
};

const Education = () => {
    const { data: education = [], loading, error } = useApi(getEducation, {
        cacheTime: 5 * 60 * 1000,
    });

    if (loading) {
        return (
            <section id="education" aria-labelledby="education-heading" className={styles['education-section']}>
                <h2 id="education-heading">Education</h2>
                <div className={styles['education-timeline']}>Loading education...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="education" aria-labelledby="education-heading" className={styles['education-section']}>
                <h2 id="education-heading">Education</h2>
                <div className={styles['education-timeline']}>Could not load education details right now.</div>
            </section>
        );
    }

    if (!education.length) {
        return null;
    }

    return (
        <section id="education" aria-labelledby="education-heading" className={styles['education-section']}>
            <h2 id="education-heading">Education</h2>
            <div className={styles['education-timeline']}>
                {education.map((entry) => (
                    <div key={entry.id} className={styles['education-item']}>
                        <div className={styles['education-year']}>
                            {formatEducationPeriod(entry.start_date, entry.end_date)}
                        </div>
                        <div className={styles['education-content']}>
                            <h3>{entry.degree}</h3>
                            <h4>{entry.institution}</h4>
                            {entry.description && <p>{entry.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
