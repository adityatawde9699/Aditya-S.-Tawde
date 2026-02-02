import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

/**
 * Typewriter Effect Component
 * Cycles through the roles array with a typing animation.
 */
const Typewriter = ({ roles }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    return (
        <span className={styles.typingText}>
            {text}
        </span>
    );
};

const Hero = () => {
    const roles = [
        "AI & Data Science Professional",
        "Full Stack Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];

    return (
        <section id="home" className={styles.hero} aria-labelledby="hero-heading">
            {/* Main Content */}
            <div className={styles.heroContent}>
                {/* Profile Image with float & glow */}
                <div className={styles.profileContainer}>
                    <img
                        src="/images/profile-photo.jpg"
                        alt="Aditya Tawde"
                        className={styles.profileImage}
                        loading="eager"
                        width="200"
                        height="200"
                    />
                </div>

                {/* Typography */}
                <span className={styles.eyebrow}>Hello, I'm</span>

                <h1 id="hero-heading" className={styles.title}>
                    <span className={styles.titleGradient}>Aditya S. Tawde</span>
                </h1>

                <div className={styles.subtitle}>
                    <span>I am an</span>
                    <Typewriter roles={roles} />
                </div>

                <p className={styles.description}>
                    Welcome! I'm a B.Tech candidate at JNEC with a passion for building
                    intelligent systems and seamless web experiences.
                    Explore my work in AI, Data Science, and Development.
                </p>

                {/* Call to Actions */}
                <div className={styles.actions}>
                    <a href="/Aditya_Portfolio.pdf" className={styles.primaryBtn} download>
                        <i className="fas fa-download"></i>
                        Download Resume
                    </a>

                    <a href="#contact" className={styles.secondaryBtn}>
                        <i className="fas fa-paper-plane"></i>
                        Contact Me
                    </a>
                </div>

                {/* Social Links */}
                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
            </div>

            {/* Scroll/Mouse Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;