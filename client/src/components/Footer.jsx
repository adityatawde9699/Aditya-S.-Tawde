import React, { useEffect, useState } from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/social';
import styles from './Footer.module.css';

const Footer = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                {/* Brand */}
                <div className={styles.brand}>
                    <div className={styles.brandLogo}>
                        <span className={styles.brandMonogram}>AST</span>
                        <span className={styles.brandName}>Aditya S. Tawde</span>
                    </div>
                    <p className={styles.tagline}>
                        Building the future with AI &amp; Data Science
                    </p>
                    <span className={styles.openBadge}>
                        <Sparkles size={12} aria-hidden="true" />
                        Open to Internships &amp; Opportunities
                    </span>
                </div>

                {/* Social Icons */}
                <div className={styles.socialIcons}>
                    {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} Profile`}
                            className={`${styles.socialLink} ${styles[`social${name}`]}`}
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Copyright */}
                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} Aditya S. Tawde &mdash; All Rights Reserved
                    </p>
                    <p className={styles.builtby}>
                        Built with
                        <Heart size={12} fill="currentColor" color="#ef4444" aria-label="love" />
                        &amp; a lot of Python
                    </p>
                </div>
            </div>

            {/* Back to top */}
            <button
                className={`${styles.backToTop} ${showTopBtn ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    );
};

export default Footer;
