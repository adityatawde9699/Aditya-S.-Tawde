import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { Linkedin, Instagram, Github, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Social Icons */}
            <div className={styles['social-icons']}>
                <a
                    href="https://www.linkedin.com/in/aditya-s-tawde-7a1392315"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                >
                    <Linkedin size={24} />
                </a>
                <a
                    href="https://www.instagram.com/adityasuniltawde"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                >
                    <Instagram size={24} />
                </a>
                <a
                    href="https://github.com/adityatawde9699"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                >
                    <Github size={24} />
                </a>
            </div>

            {/* Copyright */}
            <p className={styles.copyright}>
                &copy; {currentYear} Aditya S. Tawde | All Rights Reserved
            </p>

            {/* Attribution */}
            <p className={styles.builtby}>
                Built by <span className={styles.author}>Aditya S. Tawde</span> with
                <Heart size={14} fill="currentColor" color="#ef4444" style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
            </p>

            {/* Back to Top Button */}
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
