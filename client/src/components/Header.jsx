import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', type: 'route' },
  { to: '/certificates', label: 'Certificates', type: 'route' },
  { to: '/projects', label: 'Projects', type: 'route' },
  { to: '/contact', label: 'Contact', type: 'route' },
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

      // Determine if scrolled (for background)
      setScrolled(currentScrollY > 20);

      // Determine visibility
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !navActive) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up or at top
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
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Aditya S. Tawde
        </Link>

        <button
          className={`${styles.hamburgerMenu} ${navActive ? styles.active : ''}`}
          aria-label={navActive ? "Close menu" : "Open menu"}
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
