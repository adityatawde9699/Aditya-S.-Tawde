import React, { useEffect, useState } from 'react';
import { Download, SendHorizonal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESUME_PATH, SOCIAL_LINKS } from '../config/social';
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
                setTimeout(() => setIsDeleting(true), 2000);
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
        'AI & Data Science Professional',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast',
    ];

    return (
        <section id="home" className={styles.hero} aria-labelledby="hero-heading">
            <div className={styles.heroContent}>
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

                <span className={styles.eyebrow}>Hello, I&apos;m</span>

                <h1 id="hero-heading" className={styles.title}>
                    <span className={styles.titleGradient}>Aditya S. Tawde</span>
                </h1>

                <div className={styles.subtitle}>
                    <span>I am an</span>
                    <Typewriter roles={roles} />
                </div>

                <p className={styles.description}>
                    Welcome! I&apos;m a B.Tech candidate at JNEC with a passion for building
                    intelligent systems and seamless web experiences.
                    Explore my work in AI, Data Science, and Development.
                </p>

                <div className={styles.actions}>
                    <a href={RESUME_PATH} className={styles.primaryBtn} download>
                        <Download size={18} aria-hidden="true" />
                        Download Resume
                    </a>

                    <Link to="/contact" className={styles.secondaryBtn}>
                        <SendHorizonal size={18} aria-hidden="true" />
                        Contact Me
                    </Link>
                </div>

                <div className={styles.socials}>
                    {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={name}
                        >
                            <Icon size={20} aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
