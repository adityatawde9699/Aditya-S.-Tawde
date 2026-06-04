import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, MessageSquare, Send,
  CheckCircle, AlertCircle, Loader2,
  MapPin, Github, Linkedin,
} from 'lucide-react';
import { sendContact } from '../services/api';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../config/social';
import SectionHeader from './SectionHeader';
import styles from './Contact.module.css';

const initialForm = { name: '', email: '', message: '' };
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    color: '#BD93F9',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chh. Sambhajinagar, India',
    href: null,
    color: '#FF79C6',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@adityatawde9699',
    href: 'https://github.com/adityatawde9699',
    color: '#8BE9FD',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Aditya S. Tawde',
    href: SOCIAL_LINKS.find(l => l.name === 'LinkedIn')?.href || '#',
    color: '#50FA7B',
  },
];

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) { setStatus(''); setStatusType(''); }
    if (errors[e.target.name]) {
      setErrors(prev => { const n = { ...prev }; delete n[e.target.name]; return n; });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setStatus('');

    try {
      const response = await sendContact(form);
      setStatus(response.data.message || 'Message sent successfully!');
      setStatusType('success');
      setForm(initialForm);
    } catch (error) {
      setStatus(error.message || 'Failed to send. Please try again.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <SectionHeader
          label="// contact"
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Let's talk."
          center
        />

        <div className={styles.grid}>
          {/* Info Cards */}
          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className={styles.infoCard}>
                <div className={styles.infoIcon} style={{ background: `${color}15`, color }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <span className={styles.infoLabel}>{label}</span>
                  {href ? (
                    <a href={href} className={styles.infoValue} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <span className={styles.infoValue}>{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* GitHub Activity */}
            <div className={styles.githubGraph}>
              <span className={styles.graphLabel}>
                <Github size={14} aria-hidden="true" />
                GitHub Contributions
              </span>
              <img
                src="https://ghchart.rshah.org/BD93F9/adityatawde9699"
                alt="Aditya's GitHub contribution graph"
                className={styles.graphImage}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="contact-name" className={styles.label}>
                <User size={14} aria-hidden="true" /> Name *
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Your name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="contact-email" className={styles.label}>
                <Mail size={14} aria-hidden="true" /> Email *
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="you@example.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label htmlFor="contact-message" className={styles.label}>
                <MessageSquare size={14} aria-hidden="true" /> Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Tell me about your project..."
                rows={5}
              />
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            {/* Status */}
            {status && (
              <div className={`${styles.status} ${styles[statusType]}`}>
                {statusType === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className={styles.spinner} />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
