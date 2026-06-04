import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, SendHorizonal, BrainCircuit, Layers, Cpu, Database } from 'lucide-react';
import { RESUME_PATH, SOCIAL_LINKS } from '../config/social';
import styles from './Hero.module.css';

/**
 * Typewriter with terminal-style cursor
 */
const Typewriter = ({ roles }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 120);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <span className={styles.typingWrapper}>
      <span className={styles.typingText}>{text}</span>
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  );
};

const STATS = [
  { icon: BrainCircuit, value: '10+', label: 'AI Projects' },
  { icon: Layers,       value: '15+', label: 'Certifications' },
  { icon: Cpu,          value: '2+',  label: 'Years Coding' },
  { icon: Database,     value: '5+',  label: 'ML Models' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
};

const Hero = () => {
  const roles = [
    'AI Systems Engineer',
    'ML Pipeline Builder',
    'Full Stack Developer',
    'Data Science Practitioner',
  ];

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <motion.div
        className={styles.heroContent}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow badge */}
        <motion.div variants={item} className={styles.eyebrowRow}>
          <span className={styles.eyebrowBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            Available for Opportunities
          </span>
        </motion.div>

        {/* Terminal greeting */}
        <motion.div variants={item} className={styles.terminalGreeting}>
          <span className={styles.prompt}>&gt;</span> Hello, World
          <span className="terminal-cursor" aria-hidden="true" />
        </motion.div>

        {/* Profile Image */}
        <motion.div variants={item} className={styles.profileContainer}>
          <div className={styles.profileRing} aria-hidden="true" />
          <img
            src="/images/profile-photo.jpg"
            alt="Aditya S. Tawde"
            className={styles.profileImage}
            loading="eager"
            width="180"
            height="180"
          />
        </motion.div>

        {/* Name */}
        <motion.h1 variants={item} id="hero-heading" className={styles.title}>
          <span className={styles.titleGradient}>Aditya S. Tawde</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div variants={item} className={styles.subtitle}>
          <span className={styles.subtitleLabel}>I build </span>
          <Typewriter roles={roles} />
        </motion.div>

        {/* Description */}
        <motion.p variants={item} className={styles.description}>
          B.Tech AI & Data Science student at <strong>JNEC, MGMU</strong>.
          I turn raw data into intelligent systems and ideas into production-ready applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className={styles.actions}>
          <a href={RESUME_PATH} className={styles.primaryBtn} download>
            <Download size={18} aria-hidden="true" />
            Download Resume
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            <SendHorizonal size={18} aria-hidden="true" />
            Let&apos;s Talk
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className={styles.socials}>
          {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={name}
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className={styles.statsRow}>
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className={styles.statItem}>
              <Icon size={16} className={styles.statIcon} aria-hidden="true" />
              <strong className={styles.statValue}>{value}</strong>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
