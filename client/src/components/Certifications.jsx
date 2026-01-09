import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Award, Calendar, Building } from 'lucide-react';
import { getCertifications } from '../services/api';
import styles from './Certifications.module.css';

const Certifications = () => {
    const [certificationsData, setCertificationsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inView, setInView] = useState([]);
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    // Fetch certifications from API
    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await getCertifications();
                setCertificationsData(response.data);
            } catch (err) {
                console.error("Failed to fetch certifications", err);
                setError("Could not load certifications.");
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setInView(prev => [...new Set([...prev, index])]);
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: '50px' }
        );

        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [certificationsData]);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    if (loading) return <div className="text-center p-10">Loading certifications...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (certificationsData.length === 0) return null;

    const ParticleBackground = () => (
        <div className={styles['particle-background']}>
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className={styles.particle}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        '--duration': `${3 + Math.random() * 4}s`
                    }}
                />
            ))}
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className={styles['certifications-section']}
            id="certifications"
            aria-labelledby="certifications-heading"
        >
            {/* Background Elements */}
            <div className={styles['background-overlay']}>
                <div className={styles['background-gradient-1']} />
                <div className={styles['background-gradient-2']} />
            </div>

            <ParticleBackground />

            {/* Grid Pattern */}
            <div className={styles['grid-pattern']} />

            <div className={styles.container}>
                {/* Header Section */}
                <div className={styles.header}>
                    <div className={styles.badge}>
                        <Award className={styles['badge-icon']} />
                        <span className={styles['badge-text']}>Professional Certifications</span>
                    </div>

                    <h2 id="certifications-heading" className={styles['main-title']}>
                        Certifications & Expertise
                    </h2>

                    <p className={styles.subtitle}>
                        Validated skills and continuous learning in cutting-edge technologies
                    </p>
                </div>

                {/* Cards Grid */}
                <div className={styles['cards-grid']}>
                    {certificationsData.map((cert, index) => (
                        <div
                            key={cert.id || index}
                            ref={el => cardRefs.current[index] = el}
                            className={`${styles['card-wrapper']} ${inView.includes(index) ? styles['in-view'] : ''
                                }`}
                            style={{
                                transitionDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Card Container */}
                            <div className={styles.card}>

                                {/* Card Glow Effect */}
                                <div className={styles['card-glow']} />

                                {/* Card Content */}
                                <div className={styles['card-content']}>
                                    {/* Logo Section - only show if image exists */}
                                    {cert.image && (
                                        <div className={styles['logo-section']}>
                                            <div className={styles['logo-container']}>
                                                <img
                                                    src={cert.image}
                                                    alt={`${cert.name} certification`}
                                                    className={styles['logo-image']}
                                                    loading="lazy"
                                                />
                                                <div className={styles['logo-overlay']} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Title and Meta Info */}
                                    <div className={styles['title-section']}>
                                        <h3 className={styles['card-title']}>
                                            {cert.name}
                                        </h3>

                                        <div className={styles['issuer-info']}>
                                            <Building className={styles['issuer-icon']} />
                                            <span>{cert.issuer}</span>
                                        </div>

                                        <div className={styles['meta-info']}>
                                            <div className={styles['meta-item']}>
                                                <Calendar className={styles['meta-icon']} />
                                                <span>{formatDate(cert.date_issued)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description - only show if exists */}
                                    {cert.description && (
                                        <div className={styles['description-section']}>
                                            <p className={styles['description-text']}>
                                                {cert.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* CTA Button - only show if url exists */}
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles['cta-button']}
                                            aria-label={`View certificate for ${cert.name}`}
                                        >
                                            <span className={styles['cta-text']}>View Certificate</span>
                                            <ExternalLink className={styles['cta-icon']} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;