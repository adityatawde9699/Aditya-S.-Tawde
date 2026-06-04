import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable section header with terminal-style label and gradient underline.
 * @param {string} label - Monospace label (e.g. "// about")
 * @param {string} title - Section title
 * @param {string} [subtitle] - Optional subtitle text
 * @param {boolean} [center] - Center-align (default: false)
 */
const SectionHeader = ({ label, title, subtitle, center = false }) => {
  return (
    <motion.div
      className="section-header-wrapper"
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '3rem',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent-primary)',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          {label}
        </span>
      )}

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          position: 'relative',
          display: center ? 'block' : 'inline-block',
        }}
      >
        {title}
        <span
          style={{
            display: 'block',
            width: center ? '60px' : '50px',
            height: '3px',
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-full)',
            marginTop: '12px',
            marginLeft: center ? 'auto' : '0',
            marginRight: center ? 'auto' : '0',
          }}
        />
      </h2>

      {subtitle && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            marginTop: '1rem',
            maxWidth: '600px',
            marginLeft: center ? 'auto' : '0',
            marginRight: center ? 'auto' : '0',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
