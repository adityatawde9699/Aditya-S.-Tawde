import styles from './Logo.module.css';

export default function Logo() {
  return <span className={styles.logo} aria-hidden="true">
    <img className={styles.image} src="/logo.svg" width="190" height="44" alt="" />
  </span>;
}
