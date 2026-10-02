import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import Logo from './Logo';
const sections = [['projects', 'Work'], ['about', 'About'], ['skills', 'Stack'], ['experience', 'Journey'], ['contact', 'Contact']];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const nav = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nav.current?.querySelector('a')?.focus();
    const close = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...nav.current.querySelectorAll('a')];
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 900) setOpen(false); };
    document.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [open]);
  const navigate = (event, id) => {
    if (!open) return;
    setOpen(false);
    requestAnimationFrame(() => {
      const heading = document.querySelector(`#${id} h2`);
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    });
  };
  return <header className={styles.header}>
    <div className={`container ${styles.inner}`}>
      <a href="/#home" className={styles.brand} aria-label="Aditya S. Tawde — home"><Logo /><span className={styles.mobileBrand}>&gt; AST_</span></a>
      <button ref={toggle} className={styles.toggle} aria-expanded={open} aria-controls="lab-nav" onClick={() => setOpen(!open)}>{open ? '[ CLOSE ]' : '[ MENU ]'}</button>
      <nav ref={nav} id="lab-nav" aria-label="Main navigation" className={`${styles.nav} ${open ? styles.open : ''}`}>
        {sections.map(([id, label], index) => <a href={`/#${id}`} key={id} onClick={e => navigate(e, id)}><span className={styles.navNumber}>0{index + 1} / </span>{label}</a>)}
      </nav>
      <span className={`mono eyebrow ${styles.available}`}><span className="status-dot" />Available</span>
    </div>
  </header>;
}
