import React, { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

const initialForm = { name: '', email: '', message: '' };

const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const icons = {
    name: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#bdbdbd" strokeWidth="1.5" /><path d="M4 20c0-2.761 3.582-5 8-5s8 2.239 8 5" stroke="#bdbdbd" strokeWidth="1.5" strokeLinecap="round" /></svg>
    ),
    email: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#bdbdbd" strokeWidth="1.5" /><path d="M3 7l9 6 9-6" stroke="#bdbdbd" strokeWidth="1.5" /></svg>
    ),
    message: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#bdbdbd" strokeWidth="1.5" /><path d="M8 10h8M8 14h5" stroke="#bdbdbd" strokeWidth="1.5" strokeLinecap="round" /></svg>
    ),
    check: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#d1fae5" /><path d="M7 13l3 3 7-7" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    error: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fee2e2" /><path d="M15 9l-6 6M9 9l6 6" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" /></svg>
    ),
    successBig: (
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#d1fae5" /><path d="M20 34l10 10 14-18" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
};

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [successAnim, setSuccessAnim] = useState(false);
    const [shake, setShake] = useState(false);
    const textareaRef = useRef(null);
    const formRef = useRef(null);
    const nameInputRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // Fade-in on scroll
    useEffect(() => {
        const onScroll = () => {
            if (formRef.current) {
                const rect = formRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) setVisible(true);
            }
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [form.message]);

    // Validation
    useEffect(() => {
        const newErrors = {};
        if (touched.name && !form.name.trim()) newErrors.name = 'Name is required.';
        if (touched.email && !form.email.trim()) newErrors.email = 'Email is required.';
        else if (touched.email && !validateEmail(form.email)) newErrors.email = 'Invalid email address.';
        if (touched.message && !form.message.trim()) newErrors.message = 'Message is required.';
        setErrors(newErrors);
    }, [form, touched]);

    // Progress bar logic
    useEffect(() => {
        let filled = 0;
        if (form.name.trim()) filled++;
        if (form.email.trim() && validateEmail(form.email)) filled++;
        if (form.message.trim()) filled++;
        setProgress(filled / 3);
    }, [form]);

    // Auto-focus first field
    useEffect(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
    }, []);

    // Success animation
    useEffect(() => {
        if (statusType === 'success') {
            setTimeout(() => setSuccessAnim(true), 400);
            setTimeout(() => setSuccessAnim(false), 2500);
        }
    }, [statusType]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });
        if (Object.keys(errors).length > 0 || !form.name || !form.email || !form.message) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        setLoading(true);
        setStatus('');
        setStatusType('');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contact/send/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(form),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setStatus(data.message || 'Message sent successfully!');
                setStatusType('success');
                setForm(initialForm);
                setTouched({});
            } else {
                setStatus(data.error || 'Failed to send message.');
                setStatusType('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('An error occurred. Please try again later.');
            setStatusType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setTouched({});
        setErrors({});
        setStatus('');
        setStatusType('');
    };

    // Floating label logic
    const isFilled = (field) => form[field] && form[field].length > 0;

    return (
        <section id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Get in Touch</h2>
         
            <div className={styles['progress-bar']} aria-hidden="true">
                <div className={styles['progress-fill']} style={{ width: `${progress * 100}%` }} />
            </div>
            <form
                id="contact-form"
                className={styles['contact-form'] + (visible ? ' ' + styles['fadeIn'] : '') + (shake ? ' ' + styles['shake'] : '')}
                onSubmit={handleSubmit}
                ref={formRef}
                noValidate
                aria-describedby={status ? 'form-status' : undefined}
                autoComplete="on"
            >
                <div className={styles['form-group']}>
                    <div className={styles['input-wrapper']}>
                        <span className={styles['input-icon']}>{icons.name}</span>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            autoComplete="name"
                            ref={nameInputRef}
                            className={isFilled('name') ? styles['filled'] : ''}
                            placeholder=" "
                        />
                        <label htmlFor="name" className={isFilled('name') ? styles['float'] : ''}>Name</label>
                        {touched.name && !errors.name && form.name && (
                            <span className={styles['input-status'] + ' ' + styles['valid']}>{icons.check}</span>
                        )}
                        {touched.name && errors.name && (
                            <span className={styles['input-status'] + ' ' + styles['invalid']}>{icons.error}</span>
                        )}
                    </div>
                    {errors.name && <span className={styles['field-error']} id="name-error">{errors.name}</span>}
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['input-wrapper']}>
                        <span className={styles['input-icon']}>{icons.email}</span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            autoComplete="email"
                            className={isFilled('email') ? styles['filled'] : ''}
                            placeholder=" "
                        />
                        <label htmlFor="email" className={isFilled('email') ? styles['float'] : ''}>Email</label>
                        {touched.email && !errors.email && form.email && (
                            <span className={styles['input-status'] + ' ' + styles['valid']}>{icons.check}</span>
                        )}
                        {touched.email && errors.email && (
                            <span className={styles['input-status'] + ' ' + styles['invalid']}>{icons.error}</span>
                        )}
                    </div>
                    {errors.email && <span className={styles['field-error']} id="email-error">{errors.email}</span>}
                </div>
                <div className={styles['form-group']}>
                    <div className={styles['input-wrapper']}>
                        <span className={styles['input-icon']}>{icons.message}</span>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            ref={textareaRef}
                            rows={3}
                            className={isFilled('message') ? styles['filled'] : ''}
                            placeholder=" "
                        />
                        <label htmlFor="message" className={isFilled('message') ? styles['float'] : ''}>Message</label>
                        {touched.message && !errors.message && form.message && (
                            <span className={styles['input-status'] + ' ' + styles['valid']}>{icons.check}</span>
                        )}
                        {touched.message && errors.message && (
                            <span className={styles['input-status'] + ' ' + styles['invalid']}>{icons.error}</span>
                        )}
                    </div>
                    {errors.message && <span className={styles['field-error']} id="message-error">{errors.message}</span>}
                </div>
                <div className={styles['form-actions']}>
                    <button
                        type="submit"
                        className={styles['btn'] + ' ' + styles['primary']}
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? (
                            <span className={styles['spinner']} />
                        ) : (
                            'Send Message'
                        )}
                    </button>
                    <button
                        type="button"
                        className={styles['btn']}
                        onClick={handleReset}
                        disabled={loading}
                        style={{ marginLeft: '1rem' }}
                    >
                        Reset
                    </button>
                </div>
                {status && (
                    <p
                        className={styles['form-status'] + ' ' + styles[statusType]}
                        id="form-status"
                        role={statusType === 'error' ? 'alert' : 'status'}
                        aria-live="polite"
                    >
                        {statusType === 'success' && icons.check}
                        {statusType === 'error' && icons.error}
                        {status}
                    </p>
                )}
                {successAnim && (
                    <div className={styles['success-anim']}>
                        {icons.successBig}
                        <span>Thank you!</span>
                    </div>
                )}
            </form>
            <div className={styles['external-contact']}>
                <p>Or reach out via:</p>
                <div className={styles['external-links']}>
                    <a
                        href="https://www.fiverr.com/s/m52EYZ9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['external-btn'] + ' ' + styles['fiverr']}
                        aria-label="Contact on Fiverr"
                    >
                        Fiverr
                    </a>
                    <a
                        href="https://www.freelancer.com/u/AdityaST9699?sb=t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['external-btn'] + ' ' + styles['freelancer']}
                        aria-label="Contact on Freelancer"
                    >
                        Freelancer
                    </a>
                </div>
            </div>
          
        </section>
    );
};

export default Contact; 
