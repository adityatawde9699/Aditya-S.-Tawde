import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Award, Calendar, Building, Code, ChevronDown } from 'lucide-react';
import styles from './Certifications.module.css';

const certificationsData = [
     {
        logo: "/images/IBM.svg",
        alt: "IBM Logo",
        title: "Introduction to Artificial Intelligence (AI)",
        issuer: "Coursera – IBM Developer Skills Network",
        date: "Issued September 2025",
        description: "Gained a comprehensive understanding of AI's fundamental concepts and applications. Mastered core principles of machine learning, deep learning, and neural networks through real-world scenarios, and analyzed the transformative role of generative AI in business. Designed an ethical generative AI solution for an organizational challenge.",
        tech: ["AI", "Machine Learning", "Deep Learning", "Generative AI", "NLP", "ChatGPT"],
        link: "https://www.coursera.org/account/accomplishments/verify/L9U6S7VXNDSM",
        category: "AI",
        level: "Beginner",
        duration: "1 week"
    },
    {
    "logo": "/images/IBM.svg",
    "alt": "IBM Logo",
    "title": "Generative AI: Introduction and Applications",
    "issuer": "Coursera – IBM Developer Skills Network",
    "date": "Issued September 2025",
    "description": "Learned the fundamentals of generative AI and its distinction from discriminative AI. Explored the capabilities, real-world use cases, and applications of generative AI across various sectors. Identified and explored common generative AI models and tools for text, code, image, audio, and video generation.",
    "tech": ["Generative AI", "Artificial Intelligence and Machine Learning (AI/ML)", "Machine Learning", "ChatGPT", "Virtual Environment"],
    "link": "https://www.coursera.org/account/accomplishments/verify/HEAXEL5WWV1L",
    "category": "AI",
    "level": "Beginner",
    "duration": "1 week"
   },
   {
    "logo": "/images/IBM.svg",
    "alt": "IBM Logo",
    "title": "Generative AI: Prompt Engineering Basics",
    "issuer": "Coursera – IBM Developer Skills Network",
    "date": "Issued September 13, 2025",
    "description": "Gained a comprehensive understanding of prompt engineering, its relevance in generative AI models, and best practices for prompt creation. Learned to apply common prompt engineering techniques and assess various tools to write effective prompts.",
    "tech": ["Generative AI", "Prompt Engineering", "ChatGPT"],
    "link": "https://www.coursera.org/account/accomplishments/verify/DTEZI8ROEZPR",
    "category": "AI",
    "level": "Beginner",
    "duration": "1 Week"
   },
    {
        logo: "/images/IBM.svg",
        alt: "IBM Logo",
        title: "Python for Data Science and AI",
        issuer: "Coursera – IBM Developer Skills Network",
        date: "Issued June 2025",
        description: "Recognized by IBM for demonstrating foundational knowledge in Python programming for data science and AI applications including data manipulation, analysis, and visualization.",
        tech: ["Python", "Data Science", "AI"],
        link: "https://www.coursera.org/account/accomplishments/verify/PI3SRNL9JKCV",
        category: "Data Science",
        level: "Intermediate",
        duration: "3 weeks"
    },
    {
        logo: "/images/IBM.svg", 
        alt: "IBM Logo",
        title: "IBM Data Analysis with Python",
        issuer: "Coursera – IBM Developer Skills Network",
        date: "Issued July 2025",
        description: "Mastered data analysis using Python, including data cleaning and visualization with Pandas. Developed expertise in building Data Pipelines and Machine Learning models for Regression using Scikit-learn, with strong focus on model evaluation and optimization.",
        tech: ["Python", "Pandas", "Scikit-learn", "Data Analysis", "NumPy"],
        link: "https://www.coursera.org/account/accomplishments/verify/UGIKDK39CALC",
        category: "Data Science",
        level: "Advanced", 
        duration: "6 weeks"
    },
    {
        logo: "/images/University of Washington.svg",
        alt: "University of Washington Logo", 
        title: "Machine Learning Foundations: A Case Study Approach",
        issuer: "Coursera - University of Washington",
        date: "Issued July 2023",
        description: "Completed comprehensive study of machine learning foundations through case studies, covering fundamental ML concepts and practical applications in data analysis.",
        tech: ["Machine Learning", "Data Analysis", "Case Studies"],
        link: "https://coursera.org/verify/UT69BZRJTHNW",
        category: "Machine Learning",
        level: "Intermediate",
        duration: "5 weeks"
    },
];

const Certifications = () => {
    const [filter, setFilter] = useState('all');
    const [expandedCard, setExpandedCard] = useState(null);
    const [inView, setInView] = useState([]);
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    const categories = ['all', 'Data Science', 'Machine Learning', 'AI', 'Cloud Computing', 'Web Development', ];

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
    }, []);

    const filteredCerts = filter === 'all' 
        ? certificationsData 
        : certificationsData.filter(cert => cert.category === filter);

    const getLevelClass = (level) => {
        switch(level) {
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
                                    className={`${styles['filter-button']} ${
                                        filter === category ? styles.active : ''
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
                            className={`${styles['card-wrapper']} ${
                                inView.includes(index) ? styles['in-view'] : ''
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
                                        <p className={`${styles['description-text']} ${
                                            expandedCard === index ? styles.expanded : styles.clamped
                                        }`}>
                                            {cert.description}
                                        </p>
                                        
                                        <button
                                            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                                            className={styles['expand-button']}
                                            aria-label={`${expandedCard === index ? 'Collapse' : 'Expand'} description for ${cert.title}`}
                                        >
                                            {expandedCard === index ? 'Show Less' : 'Show More'}
                                            <ChevronDown className={`${styles['expand-icon']} ${
                                                expandedCard === index ? styles.rotated : ''
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