import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        text: "Aditya's work is truly outstanding. His attention to detail and futuristic design sense is incredible! The AI solution he developed transformed our data analytics process.",
        author: 'Neel Belsare',
        title: 'Project Manager, Tech Innovations',
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        text: "He delivered the project ahead of time, and the quality was top-notch. Aditya's ability to understand requirements and translate them into solutions is remarkable.",
        author: 'Jane Wilson',
        title: 'Lead Developer, Digital Solutions',
        img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        text: "Working with Aditya was a pleasure. His ability to blend AI and web development is next level! Couldn't be happier with the results of our collaboration.",
        author: 'John Smith',
        title: 'CTO, AI Startups Inc.',
        img: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
];

const AVATAR_FALLBACK =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="%23e3e3e3"/><text x="50%" y="54%" text-anchor="middle" fill="%23777" font-size="20" font-family="Arial" dy=".3em">?</text></svg>';

const QUOTE_SVG = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.5 14C12.5 10.9624 10.0376 8.5 7 8.5C3.96243 8.5 1.5 10.9624 1.5 14C1.5 17.0376 3.96243 19.5 7 19.5C7.82843 19.5 8.5 20.1716 8.5 21V23C8.5 23.8284 7.82843 24.5 7 24.5C6.17157 24.5 5.5 23.8284 5.5 23V22.5" stroke="#f7b32b" strokeWidth="2" strokeLinecap="round" /><path d="M30.5 14C30.5 10.9624 28.0376 8.5 25 8.5C21.9624 8.5 19.5 10.9624 19.5 14C19.5 17.0376 21.9624 19.5 25 19.5C25.8284 19.5 26.5 20.1716 26.5 21V23C26.5 23.8284 25.8284 24.5 25 24.5C24.1716 24.5 23.5 23.8284 23.5 23V22.5" stroke="#f7b32b" strokeWidth="2" strokeLinecap="round" /></svg>
);

const LEFT_ARROW = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="14" cy="14" r="14" fill="#fffbe6" /><path d="M16.5 8L11 14L16.5 20" stroke="#f7b32b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const RIGHT_ARROW = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="14" cy="14" r="14" fill="#fffbe6" /><path d="M11.5 8L17 14L11.5 20" stroke="#f7b32b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Avatar({ src, alt }) {
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <img
            src={imgSrc}
            alt={alt}
            width={48}
            height={48}
            onError={() => setImgSrc(AVATAR_FALLBACK)}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
    );
}

const AUTO_PLAY_INTERVAL = 6000;

const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef();
    const testimonialCount = testimonials.length;

    const goTo = useCallback(
        (idx) => setCurrent((idx + testimonialCount) % testimonialCount),
        [testimonialCount]
    );

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            goTo(current + 1);
        }, AUTO_PLAY_INTERVAL);
        return () => clearTimeout(timeoutRef.current);
    }, [current, goTo]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft') goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [current, goTo]);

    return (
        <section
            id="testimonials"
            className={styles['testimonials-section']}
            aria-labelledby="testimonials-heading"
            tabIndex={-1}
        >
            <div className={styles['bg-pattern']} aria-hidden="true"></div>
            <div className={styles['section-title']}>
                <span className={styles['section-subtitle']}>Testimonials</span>
                <h2 id="testimonials-heading">What People Say</h2>
            </div>
            <div className={styles['carousel-nav']}>
                <button
                    className={`${styles['carousel-arrow']} ${styles['carousel-arrow-left']}`}
                    aria-label="Previous testimonial"
                    onClick={() => goTo(current - 1)}
                    tabIndex={0}
                >
                    {LEFT_ARROW}
                </button>
                <div className={styles['testimonials-container']} role="list">
                    {testimonials.map((t, idx) => (
                        <div
                            key={t.author}
                            className={`${styles['testimonial-card']} ${current === idx ? styles['active'] : ''}`}
                            role="listitem"
                            aria-hidden={current !== idx}
                        >
                            <div className={styles['quote-icon']}>{QUOTE_SVG}</div>
                            <p className={styles['testimonial-text']}>{t.text}</p>
                            <div className={styles['testimonial-author']}>
                                <Avatar src={t.img} alt={t.author} />
                                <div className={styles['author-info']}>
                                    <span className={styles['author-name']}>{t.author}</span>
                                    <span className={styles['author-title']}>{t.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className={`${styles['carousel-arrow']} ${styles['carousel-arrow-right']}`}
                    aria-label="Next testimonial"
                    onClick={() => goTo(current + 1)}
                    tabIndex={0}
                >
                    {RIGHT_ARROW}
                </button>
            </div>
            <div className={styles['testimonial-dots']} role="tablist" aria-label="Testimonial navigation dots">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles['dot']} ${current === idx ? styles['active'] : ''}`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        aria-selected={current === idx}
                        aria-controls={`testimonial-panel-${idx}`}
                        tabIndex={current === idx ? 0 : -1}
                        onClick={() => goTo(idx)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;