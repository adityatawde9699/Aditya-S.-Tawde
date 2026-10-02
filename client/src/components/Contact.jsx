import { useState, useRef } from 'react';
import { sendContact } from '../services/api';
import { CONTACT_EMAIL, SOCIAL_LINKS, RESUME_PATH } from '../config/social';
import SectionHeader from './SectionHeader';
import styles from './Contact.module.css';
const initialForm = { name: '', email: '', message: '' };
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const submitting = useRef(false);
  const change = event => {
    const { name, value } = event.target;
    setForm(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: '' }));
    setStatus('');
  };
  const submit = async event => {
    event.preventDefault();
    if (submitting.current) return;
    const invalid = {};
    if (!form.name.trim()) invalid.name = 'Name is required';
    else if (form.name.trim().length < 2 || form.name.trim().length > 100) invalid.name = 'Name must be between 2 and 100 characters.';
    if (!form.email.trim()) invalid.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) invalid.email = 'Enter a valid email address.';
    if (!form.message.trim()) invalid.message = 'Message is required';
    else if (form.message.trim().length < 10 || form.message.trim().length > 5000) invalid.message = 'Message must be between 10 and 5000 characters.';
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      formRef.current?.querySelector(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true; setLoading(true); setStatus('');
    try {
      const response = await sendContact({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      setStatus(response.data.message || 'Message sent successfully!'); setStatusType('success'); setForm(initialForm);
    } catch (error) {
      setStatus(error.message || 'Failed to send. Please email me directly.'); setStatusType('error');
      const fields = error.data?.error;
      if (fields && typeof fields === 'object') setErrors(Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value.join(' ') : String(value)])));
    } finally { submitting.current = false; setLoading(false); }
  };
  const links = [
    { name: 'GitHub', href: SOCIAL_LINKS.find(link => link.name === 'GitHub')?.href },
    { name: 'LinkedIn', href: SOCIAL_LINKS.find(link => link.name === 'LinkedIn')?.href },
    { name: 'Email', href: `mailto:${CONTACT_EMAIL}` },
    { name: 'Résumé', href: RESUME_PATH, download: true },
  ];
  return <section id="contact" className="lab-section" aria-labelledby="contact-heading"><SectionHeader id="contact-heading" label="07" title="Contact" subtitle="OPEN TO INTERESTING PROBLEMS" />
    <p className={`mono muted ${styles.prompt}`}>HAVE AN INTERESTING PROBLEM?</p><h3 className={styles.title}>LET’S<br /><span>BUILD IT.</span><span className={styles.arrow} aria-hidden="true">↗</span></h3>
    <div className={styles.links}>{links.filter(link => link.href).map(link => <a key={link.name} className="button secondary" href={link.href} download={link.download || undefined} target={link.download || link.name === 'Email' ? undefined : '_blank'} rel={link.download || link.name === 'Email' ? undefined : 'noopener noreferrer'}>{link.name}<span aria-hidden="true">{link.download ? '↓' : '↗'}</span></a>)}</div>
    <div className={styles.contactGrid}><div className={styles.note}><span className="mono muted">DIRECT CHANNEL / INDIA</span><p>Research questions.<br />Useful software.<br />Systems worth building.</p><a href={`mailto:${CONTACT_EMAIL}`} className="text-link">{CONTACT_EMAIL} ↗</a></div>
      <form ref={formRef} className={styles.form} onSubmit={submit} noValidate aria-label="Send a message" aria-busy={loading}>
        <div className={styles.inputRow}>{['name', 'email'].map(name => <div className={styles.field} key={name}><label htmlFor={`contact-${name}`} className="mono">{name} <span aria-hidden="true">*</span></label><input id={`contact-${name}`} name={name} type={name === 'email' ? 'email' : 'text'} autoComplete={name} value={form[name]} onChange={change} required maxLength={name === 'email' ? 254 : 100} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} placeholder={name === 'email' ? 'you@example.com' : 'Your name'} />{errors[name] && <span id={`${name}-error`} className={styles.error}>{errors[name]}</span>}</div>)}</div>
        <div className={styles.field}><label htmlFor="contact-message" className="mono">MESSAGE <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" value={form.message} onChange={change} required minLength={10} maxLength={5000} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell me about the problem…" />{errors.message && <span id="message-error" className={styles.error}>{errors.message}</span>}</div>
        <div role="status" aria-live="polite" aria-atomic="true">{status && <p className={styles.feedback}><span className="mono">{statusType === 'success' ? 'SENT / ' : 'NOTICE / '}</span>{status}</p>}</div>
        <button type="submit" className="button" disabled={loading}>{loading ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
      </form>
    </div>
  </section>;
}
