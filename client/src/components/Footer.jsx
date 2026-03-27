import React, { useEffect, useState } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles['social-icons']}>
                {SOCIAL_LINKS.map(({ name, href, icon: SocialIcon }) => (
                    <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} Profile`}
                    >
                        <SocialIcon size={24} />
                    </a>
                ))}
            </div>

            <p className={styles.copyright}>
                &copy; {currentYear} Aditya S. Tawde | All Rights Reserved
            </p>

            <p className={styles.builtby}>
                Built by <span className={styles.author}>Aditya S. Tawde</span> with
                <Heart size={14} fill="currentColor" color="#ef4444" style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
            </p>

            <button
                className={`${styles.backToTop} ${showTopBtn ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
                style={{ display: showTopBtn ? 'flex' : 'none' }}
            >
                <ArrowUp size={24} />
            </button>
        </footer>
    );
};

export default Footer;
