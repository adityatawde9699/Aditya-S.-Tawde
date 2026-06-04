import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Menu, X, Download } from 'lucide-react';
import { RESUME_PATH } from '../config/social';

const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  // Handle Scroll (Hide/Show + Active Section)
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

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = navActive ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navActive]);

  // Close nav on outside click
  useEffect(() => {
    if (!navActive) return;
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) &&
          !event.target.closest(`.${styles.hamburger}`)) {
        setNavActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navActive]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') setNavActive(false); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    setNavActive(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!visible ? styles.hide : ''}`}
      id="navbar"
    >
      <div className={styles.headerContent}>
        {/* Logo — Terminal Style */}
        <button
          className={styles.logo}
          onClick={() => scrollToSection('home')}
          aria-label="Go to top"
        >
          <span className={styles.logoPrompt} aria-hidden="true">&gt;</span>
          <span className={styles.logoText}>AST</span>
          <span className={styles.logoCursor} aria-hidden="true">_</span>
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${navActive ? styles.active : ''}`}
          aria-label={navActive ? 'Close menu' : 'Open menu'}
          aria-expanded={navActive}
          onClick={() => setNavActive(!navActive)}
        >
          {navActive ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navigation */}
        <nav
          ref={navRef}
          className={`${styles.mainNav} ${navActive ? styles.active : ''}`}
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {NAV_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`${styles.navLink} ${activeSection === id ? styles.navLinkActive : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <a href={RESUME_PATH} className={styles.cvBtn} download>
                <Download size={14} aria-hidden="true" />
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
