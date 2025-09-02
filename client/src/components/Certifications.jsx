import React from 'react';
import styles from './Certifications.module.css';

const certificationsData = [
    {
        logo: "/images/IBM.svg",
        alt: "IBM Logo",
        title: "Python for Data Science and AI",
        issuer: "Coursera â€“ IBM Developer Skills Network",
        date: "Issued June 2025",
        description:
            "Recognized by IBM for demonstrating foundational knowledge in Python programming for data science and AI applications including data manipulation, analysis, and visualization.",
        tech: ["Python", "Data Science", "AI"],
        link: "https://www.credly.com/badges/9be4a308-457d-40de-b6b4-d95cc70a2b87",
    },
    {
        logo: "/images/IBM.svg",
        alt: "IBM Logo",
        title: "IBM Data Analysis with Python",
        issuer: "Coursera – IBM Developer Skills Network",
        date: "Issued July 2025",
        description:
            "Mastered data analysis using Python, including data cleaning and visualization with Pandas. Developed expertise in building Data Pipelines and Machine Learning models for Regression using Scikit-learn, with strong focus on model evaluation and optimization.",
        tech: ["Python", "Pandas", "Scikit-learn", "Data Analysis", "NumPy"],
        link: "https://www.credly.com/badges/b1094d6f2bc8-42c1-8bf4-fc3f00b2dacb",
    },
    {
        logo: "/images/University of Washington.svg",
        alt: "University of Washington Logo",
        title: "Machine Learning Foundations: A Case Study Approach",
        issuer: "Coursera - University of Washington",
        date: "Issued July 2023",
        description: 
            "Completed comprehensive study of machine learning foundations through case studies, covering fundamental ML concepts and practical applications in data analysis.",
        tech: ["Machine Learning", "Data Analysis", "Case Studies"],
        link: "https://coursera.org/verify/UT69BZRJTHNW"
    },
    // Add more certifications here as needed
];

const Certifications = () => (
    <section
        id="certifications"
        className={styles["certifications-section"]}
        aria-labelledby="certifications-heading"
    >
        <h2 id="certifications-heading">Certifications & Courses</h2>
        <div className={styles['certification-flex']}>
            {certificationsData.map((cert, idx) => (
                <div className={styles["certifications-container"]} key={idx}>
                    <div className={styles["certification-card"]}>
                        <div className={styles["certification-logo"]}>
                            <img
                                src={cert.logo}
                                alt={cert.alt}
                                style={{ width: "60px", height: "auto" }}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles["certification-content"]}>
                            <h3>{cert.title}</h3>
                            <div className={styles["certification-issuer"]}>{cert.issuer}</div>
                            <p className={styles["certification-date"]}>{cert.date}</p>
                            <div className={styles["certification-description"]}>
                                {cert.description}
                            </div>
                            <div className={styles["certification-tech"]}>
                                {cert.tech.map((tech, i) => (
                                    <span key={i}>{tech}</span>
                                ))}
                            </div>
                            <a
                                href={cert.link}
                                className={styles["certification-link"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View certificate for ${cert.title}`}
                            >
                                View Certificate <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Certifications;
