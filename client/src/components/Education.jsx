import React from 'react';
import styles from './Education.module.css';

const Education = () => (
    <section id="education" aria-labelledby="education-heading" className={styles['education-section']}>
        <h2 id="education-heading">Education</h2>
        <div className={styles['education-timeline']}>
            <div className={styles['education-item']}>
                <div className={styles['education-year']}>2024 - Present</div>
                <div className={styles['education-content']}>
                    <h3>B.Tech in AI & Data Science</h3>
                    <h4>Jawaharlal Nehru Engineering College, MGMU</h4>
                    <p>Pursuing specialization in Artificial Intelligence and Data Science with focus on machine learning, deep learning, and data analysis methodologies.</p>
                    <div className={styles['education-highlights']}>
                        <span>CGPA: 7.19/10</span>
                    </div>
                </div>
            </div>
            <div className={styles['education-item']}>
                <div className={styles['education-year']}>2019 - 2021</div>
                <div className={styles['education-content']}>
                    <h3>Higher Secondary Education</h3>
                    <h4>Maharashtra State Board</h4>
                    <p>Completed Higher Secondary with focus on Science and Mathematics, laying the foundation for technical education.</p>
                    <div className={styles['education-highlights']}>
                        <span>77.17% Aggregate</span>
                    </div>
                </div>
            </div>
            <div className={styles['education-item']}>
                <div className={styles['education-year']}>2021</div>
                <div className={styles['education-content']}>
                    <h3>Secondary School Certificate</h3>
                    <h4>Maharashtra State Board</h4>
                    <p>Completed SSC with distinction, showing early aptitude in science and technology subjects.</p>
                    <div className={styles['education-highlights']}>
                        <span>86% Aggregate</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Education;