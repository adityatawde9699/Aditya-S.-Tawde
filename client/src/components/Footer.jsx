import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles['social-icons']}>
            <a href="https://www.linkedin.com/in/aditya-tawde-7a1392315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener" role="button" aria-label="LinkedIn Profile for Aditya Tawde">
                <img src="https://img.icons8.com/?size=60&id=114445&format=png&color=000000" alt="LinkedIn Profile for Aditya Tawde" />
            </a>
            <a href="https://www.instagram.com/adityasuniltawde" target="_blank" rel="noopener" role="button" aria-label="Instagram Profile for Aditya Tawde">
                <img src="https://img.icons8.com/?size=60&id=aimNrfnvOM9T&format=png&color=000000" alt="Instagram Profile for Aditya Tawde" />
            </a>
            <a href="https://github.com/adityatawde9699" target="_blank" rel="noopener" role="button" aria-label="GitHub Profile for Aditya Tawde">
                <img src="https://img.icons8.com/?size=60&id=12599&format=png&color=000000" alt="GitHub Profile for Aditya Tawde" />
            </a>
        </div>
        <p className={styles.copyright}>© 2024 Aditya S. Tawde | All Rights Reserved</p>
        <p className={styles.builtby}>
            Built by <span className={styles.author}>Aditya S. Tawde</span> with <span aria-label="love" role="img">❤️</span>
        </p>
    </footer>
);

export default Footer; 