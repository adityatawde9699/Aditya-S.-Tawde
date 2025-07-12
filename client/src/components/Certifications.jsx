import React from 'react';
import styles from './Certifications.module.css';

const certificationsData = [
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        alt: "IBM Logo",
        title: "Python for Data Science and AI",
        issuer: "Coursera – IBM Developer Skills Network",
        date: "Issued June 2025",
        description:
            "Recognized by IBM for demonstrating foundational knowledge in Python programming for data science and AI applications including data manipulation, analysis, and visualization.",
        tech: ["Python", "Data Science", "AI"],
        link: "https://www.credly.com/badges/9be4a308-457d-40de-b6b4-d95cc70a2b87",
    },
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_Cloud_logo.svg",
        alt: "Google Cloud Logo",
        title: "Google Cloud Fundamentals: Core Infrastructure",
        issuer: "Coursera – Google Cloud",
        date: "Issued May 2025",
        description:
            "Completed a comprehensive course on Google Cloud Platform fundamentals, covering core services, architecture, and best practices for cloud solutions.",
        tech: ["Google Cloud", "Cloud Computing", "Infrastructure"],
        link: "https://www.credly.com/badges/12345678-1234-1234-1234-123456789012",
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
