import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home', type: 'route' },
  { to: '/projects', label: 'Projects', type: 'route' },
  { to: '/contact', label: 'Contact', type: 'route' },
];

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const headerRef = useRef(null);

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

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (headerRef.current) {
        headerRef.current.style.top = prevScrollpos > currentScrollPos ? '0' : '-60px';
      }
      setScrolled(currentScrollPos > 0);
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHamburgerClick = () => {
    setNavActive((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setNavActive(false);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      ref={headerRef}
      id="navbar"
    >
      <div className={styles.headerContent}>
        <span className={styles.logo}>Aditya S. Tawde</span>
        <button
          className={`${styles.hamburgerMenu} ${navActive ? styles.active : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={navActive}
          onClick={handleHamburgerClick}
        >
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
              <li key={link.label}>
                {link.type === 'route' ? (
                  <Link
                    to={link.to}
                    className={styles.navLink}
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </Link>
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
