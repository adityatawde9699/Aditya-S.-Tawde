import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Award, Calendar, Building, Code, ChevronDown } from 'lucide-react';
import { getCertifications } from '../services/api';
import styles from './Certifications.module.css';

const Certifications = () => {
    const [certificationsData, setCertificationsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [expandedCard, setExpandedCard] = useState(null);
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

    // Get unique categories from data
    const categories = ['all', ...new Set(certificationsData.map(cert => cert.category))];

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

    if (loading) return <div className="text-center p-10">Loading certifications...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (certificationsData.length === 0) return null;

    const filteredCerts = filter === 'all'
        ? certificationsData
        : certificationsData.filter(cert => cert.category === filter);

    const getLevelClass = (level) => {
        switch (level) {
            case 'Beginner': return styles['level-beginner'];
            case 'Intermediate': return styles['level-intermediate'];
            case 'Advanced': return styles['level-advanced'];
            default: return styles['level-intermediate'];
        }
    };

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

                    {/* Filter Tabs */}
                    <div className={styles['filter-container']}>
                        <div className={styles['filter-tabs']}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`${styles['filter-button']} ${filter === category ? styles.active : ''
                                        }`}
                                >
                                    <span className={styles['filter-button-text']}>{category}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className={styles['cards-grid']}>
                    {filteredCerts.map((cert, index) => (
                        <div
                            key={index}
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

                                {/* Level Badge */}
                                <div className={`${styles['level-badge']} ${getLevelClass(cert.level)}`}>
                                    {cert.level}
                                </div>

                                {/* Card Content */}
                                <div className={styles['card-content']}>
                                    {/* Logo Section */}
                                    <div className={styles['logo-section']}>
                                        <div className={styles['logo-container']}>
                                            <img
                                                src={cert.logo}
                                                alt={cert.alt}
                                                className={styles['logo-image']}
                                                loading="lazy"
                                            />
                                            <div className={styles['logo-overlay']} />
                                        </div>
                                    </div>

                                    {/* Title and Meta Info */}
                                    <div className={styles['title-section']}>
                                        <h3 className={styles['card-title']}>
                                            {cert.title}
                                        </h3>

                                        <div className={styles['issuer-info']}>
                                            <Building className={styles['issuer-icon']} />
                                            <span>{cert.issuer}</span>
                                        </div>

                                        <div className={styles['meta-info']}>
                                            <div className={styles['meta-item']}>
                                                <Calendar className={styles['meta-icon']} />
                                                <span>{cert.date}</span>
                                            </div>
                                            <div className={styles['meta-item']}>
                                                <span className={styles['duration-dot']} />
                                                <span>{cert.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className={styles['description-section']}>
                                        <p className={`${styles['description-text']} ${expandedCard === index ? styles.expanded : styles.clamped
                                            }`}>
                                            {cert.description}
                                        </p>

                                        <button
                                            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                                            className={styles['expand-button']}
                                            aria-label={`${expandedCard === index ? 'Collapse' : 'Expand'} description for ${cert.title}`}
                                        >
                                            {expandedCard === index ? 'Show Less' : 'Show More'}
                                            <ChevronDown className={`${styles['expand-icon']} ${expandedCard === index ? styles.rotated : ''
                                                }`} />
                                        </button>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className={styles['tech-tags']}>
                                        {cert.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className={styles['tech-tag']}
                                            >
                                                <Code className={styles['tech-icon']} />
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles['cta-button']}
                                        aria-label={`View certificate for ${cert.title}`}
                                    >
                                        <span className={styles['cta-text']}>View Certificate</span>
                                        <ExternalLink className={styles['cta-icon']} />
                                    </a>
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