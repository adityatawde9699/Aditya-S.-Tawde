import styles from './Logo.module.css';

export default function Logo() {
  return (
    <span className={styles.logo} aria-hidden="true">
      <svg className={styles.mark} viewBox="0 0 32 32" focusable="false">
        <text x="16" y="22" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="800" letterSpacing="-.8" textAnchor="middle">AST</text>
        <path d="M3 28.5h26" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className={styles.wordmark}>AST_</span>
    </span>
  );
}
