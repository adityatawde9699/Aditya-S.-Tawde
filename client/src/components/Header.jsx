import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', type: 'route' },
  { to: '/certificates', label: 'Certificates', type: 'route' },
  { to: '/projects', label: 'Projects', type: 'route' },
];

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Handle Scroll (Hide/Show)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !navActive) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navActive]);

  // Lock Body Scroll when Mobile Menu is Active
  useEffect(() => {
    if (navActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [navActive]);

  // Close nav on outside click
  useEffect(() => {
    if (!navActive) return;
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest(`.${styles.hamburgerMenu}`)) {
        setNavActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navActive]);

  // Close nav on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setNavActive(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavLinkClick = () => {
    setNavActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!visible ? styles.hide : ''}`}
      id="navbar"
    >
      <div className={styles.headerContent}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={styles.logoMonogram} aria-hidden="true">AST</span>
          <span className={styles.logoText}>Aditya S. Tawde</span>
          <span className={styles.logoBadge}>AI Engineer</span>
        </Link>

        <button
          className={`${styles.hamburgerMenu} ${navActive ? styles.active : ''}`}
          aria-label={navActive ? 'Close menu' : 'Open menu'}
          aria-expanded={navActive}
          onClick={() => setNavActive(!navActive)}
        >
          {navActive ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          ref={navRef}
          className={`${styles.mainNav} ${navActive ? styles.active : ''}`}
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.type === 'route' ? (
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${location.pathname === link.to ? styles.navLinkActive : ''}`}
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
            <li>
              <Link
                to="/contact"
                className={styles.hireBtn}
                onClick={handleNavLinkClick}
              >
                <Sparkles size={14} aria-hidden="true" />
                Hire Me
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
