import React from 'react';
import styles from './Hero.module.css';

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
            <h1 id="hero-heading" className={styles.title}>
                Welcome to My Portfolio
            </h1>
            <p className={styles.subtitle}>
                Hello! I'm Aditya S. Tawde, an aspiring AI & Data Science enthusiast looking for internship opportunities. Currently, I'm pursuing a B.Tech at JNEC, where I blend technical proficiency with a zeal for addressing real-world challenges using technology. Discover my work, skills, and projects below. Let's connect and craft something incredible together! About Me As a B.Tech candidate specializing in AI & Data Science at JNEC, I merge strong technical abilities with a fervor for devising innovative tech solutions for real-world issues.
            </p>
            <p className={styles['cta-text']}>
                Explore my work, skills, and projects below. Let's connect and create something amazing together!
            </p>
            <div className={styles['cta-buttons']}>
                <a href="..\Aditya_Portfolio.pdf" className={`${styles.btn} ${styles.primary}`} download>
                    <i className="fas fa-download"></i> Download Resume
                </a>
                <a href="/contact" className={`${styles.btn} ${styles.secondary}`}>
                    <i className="fas fa-arrow-right"></i> Hire Me
                </a>
            </div>
        </div>
    </section>
);

export default Hero;
