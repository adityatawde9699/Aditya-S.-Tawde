import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

/**
 * Social links — configurable via environment variables.
 * Set VITE_SOCIAL_* in your .env to override defaults.
 */
export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/in/aditya-s-tawde',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: import.meta.env.VITE_SOCIAL_GITHUB || 'https://github.com/adityatawde9699',
    icon: Github,
  },
  {
    name: 'Instagram',
    href: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://www.instagram.com/adityasuniltawde',
    icon: Instagram,
  },
  {
    name: 'Twitter',
    href: import.meta.env.VITE_SOCIAL_TWITTER || '#',
    icon: Twitter,
  },
].filter(link => link.href && link.href !== '#');

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'adityatawde9699@gmail.com';

export const RESUME_PATH = '/Aditya_Tawde_Resume.docx';

export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'adityatawde9699';
