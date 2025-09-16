import React from 'react';
import styles from './Hero.module.css';

// Import FontAwesome icons if you're using react-icons
// (Alternatively, ensure Font Awesome CSS is linked in your project's index.html)
// import { FaDownload, FaArrowRight, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Hero = () => (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles['hero-content']}>
            <div className={styles.profile}>
                <img
                    src="./images/profile-photo.jpg"
                    alt="Aditya Tawde - AI & Data Science Professional"
                    loading="lazy"
                    width="200"
                    height="200"
                />
            </div>
            
            {/* CHANGED: Title is now more direct */}
            <h1 id="hero-heading" className={styles.title}>
                Aditya S. Tawde
            </h1>

            {/* CHANGED: Subtitle is now a punchy tagline using the .highlight style */}
            <p className={styles.subtitle}>
                Aspiring <span className={styles.highlight}>AI & Data Science</span> Professional
            </p>

            {/* CHANGED: Combined and shortened the redundant paragraphs into one clear intro */}
            <p className={styles['cta-text']}>
                Welcome! I'm a B.Tech candidate at JNEC with a passion for solving
                real-world challenges using technology. Explore my work and skills below.
            </p>

            <div className={styles['cta-buttons']}>
                <a href="..\Aditya_Portfolio.pdf" className={`${styles.btn} ${styles.primary}`} download>
                    <i className="fas fa-download"></i> Download Resume
                </a>
                
                {/* CHANGED: "Hire Me" to "Contact Me" is a slightly softer CTA */}
                <a href="/contact" className={`${styles.btn} ${styles.secondary}`}>
                    <i className="fas fa-arrow-right"></i> Contact Me
                </a>
            </div>

            {/* NEW: Added the social icons section, which already had styles in the CSS */}
            <div className={styles['social-icons']}>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                </a>
            </div>
        </div>
    </section>
);

export default Hero;