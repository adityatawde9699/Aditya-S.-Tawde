import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const navRef = useRef(null);

  // Close nav on outside click
  useEffect(() => {
    if (!navActive) return;
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navActive]);

  // Close nav on Escape key
  useEffect(() => {
    if (!navActive) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setNavActive(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navActive]);

  const handleHamburgerClick = () => {
    setNavActive((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setNavActive(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.logo}>Aditya S. Tawde</span>
        <button
          className={`${styles.hamburgerMenu} ${navActive ? styles.active : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={navActive}
          onClick={handleHamburgerClick}
        >
          {/* Hamburger SVG icon for better visibility and accessibility */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <rect y="6" width="28" height="3.2" rx="1.6" fill="currentColor" />
            <rect y="12.4" width="28" height="3.2" rx="1.6" fill="currentColor" />
            <rect y="18.8" width="28" height="3.2" rx="1.6" fill="currentColor" />
          </svg>
        </button>
        <nav
          ref={navRef}
          className={navActive ? `${styles.mainNav} ${styles.active}` : styles.mainNav}
          aria-label="Main navigation"
          aria-expanded={navActive}
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.label === 'Home' ? (
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={e => { e.preventDefault(); window.location.replace(window.location.pathname); }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;