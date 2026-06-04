import React from 'react';
import { SOCIAL_LINKS } from '../config/social';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.prompt}>&gt;</span> AST
            <span className={styles.cursor}>_</span>
          </span>
          <span className={styles.tagline}>Built with React + Django</span>
        </div>

        {/* Social Links */}
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
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>
          © {year} Aditya S. Tawde. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
