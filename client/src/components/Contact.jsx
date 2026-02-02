import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    Building,
    MessageSquare,
    Send,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { sendContact } from '../services/api';
import styles from './Contact.module.css';

const initialForm = { firstName: '', lastName: '', company: '', email: '', phone: '', message: '' };
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState(''); // 'success' | 'error'
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState({});

    // Validation Effect
    useEffect(() => {
        const newErrors = {};
        if (touched.firstName && !form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (touched.email && !form.email.trim()) newErrors.email = 'Email is required';
        else if (touched.email && !validateEmail(form.email)) newErrors.email = 'Invalid email address';
        if (touched.message && !form.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
    }, [form, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        // Clear status when user starts typing again
        if (status) {
            setStatus('');
            setStatusType('');
        }
    };

    const handleFocus = (e) => {
        setFocused(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleBlur = (e) => {
        setFocused(prev => ({ ...prev, [e.target.name]: false }));
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all as touched
        setTouched({
            firstName: true,
            lastName: true,
            company: true,
            email: true,
            phone: true,
            message: true
        });

        // Basic validation check
        if (!form.firstName || !form.email || !form.message) return;
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        setStatus('');

        try {
            const payload = {
                name: `${form.firstName} ${form.lastName}`.trim(),
                email: form.email,
                message: form.message,
                // Add extra fields if backend supports them, typically mapped to message body
                company: form.company,
                phone: form.phone
            };

            const response = await sendContact(payload);
            setStatus(response.data.message || 'Message sent successfully!');
            setStatusType('success');
            setForm(initialForm);
            setTouched({});
        } catch (error) {
            console.error('Contact Error:', error);
            setStatus(error.message || 'Failed to send message. Please try again.');
            setStatusType('error');
        } finally {
            setLoading(false);
        }
    };

    // Helper to determine if label should float
    const isFloat = (name) => focused[name] || form[name]?.length > 0;

    return (
        <section id="contact" className={styles['contact-section']}>
            {/* Header */}
            <div className={styles['section-header']}>
                <h2>Get in Touch</h2>
                <div className={styles['progress-bar']}>
                    <div className={styles['progress-fill']}></div>
                </div>
            </div>

            <div className={styles['contact-form-container']}>
                <form
                    onSubmit={handleSubmit}
                    className={`${styles['contact-form']} ${styles.fadeIn}`}
                    noValidate
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className={styles['form-group']}>
                            <div className={styles['input-wrapper']}>
                                <div className={styles['input-icon']}>
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className={errors.firstName ? styles.error : ''}
                                />
                                <label htmlFor="firstName" className={isFloat('firstName') ? styles.float : ''}>
                                    First Name *
                                </label>
                                {touched.firstName && !errors.firstName && (
                                    <div className={styles['input-status']}>
                                        <CheckCircle size={16} className="text-green-500" />
                                    </div>
                                )}
                            </div>
                            {errors.firstName && <div className={styles['field-error']}>{errors.firstName}</div>}
                        </div>

                        {/* Last Name */}
                        <div className={styles['form-group']}>
                            <div className={styles['input-wrapper']}>
                                <div className={styles['input-icon']}>
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="lastName" className={isFloat('lastName') ? styles.float : ''}>
                                    Last Name
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className={styles['form-group']}>
                            <div className={styles['input-wrapper']}>
                                <div className={styles['input-icon']}>
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className={errors.email ? styles.error : ''}
                                />
                                <label htmlFor="email" className={isFloat('email') ? styles.float : ''}>
                                    Email Address *
                                </label>
                            </div>
                            {errors.email && <div className={styles['field-error']}>{errors.email}</div>}
                        </div>

                        {/* Phone */}
                        <div className={styles['form-group']}>
                            <div className={styles['input-wrapper']}>
                                <div className={styles['input-icon']}>
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="phone" className={isFloat('phone') ? styles.float : ''}>
                                    Phone Number
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className={styles['form-group']}>
                        <div className={styles['input-wrapper']}>
                            <div className={styles['input-icon']}>
                                <Building size={18} />
                            </div>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="company" className={isFloat('company') ? styles.float : ''}>
                                Company / Organization
                            </label>
                        </div>
                    </div>

                    {/* Message */}
                    <div className={styles['form-group']}>
                        <div className={`${styles['input-wrapper']} items-start`}>
                            {/* Icon aligned top for textarea */}
                            <div className={`${styles['input-icon']}`} style={{ top: '25px', transform: 'none' }}>
                                <MessageSquare size={18} />
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className={errors.message ? styles.error : ''}
                                rows={5}
                            ></textarea>
                            <label htmlFor="message" className={isFloat('message') ? styles.float : ''}>
                                Your Message *
                            </label>
                        </div>
                        {errors.message && <div className={styles['field-error']}>{errors.message}</div>}
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className={`${styles['form-status']} ${styles[statusType]}`}>
                            {statusType === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{status}</span>
                        </div>
                    )}

                    {/* Submit Buttom */}
                    <div className={styles['form-actions']}>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.primary}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className={styles.spinner} size={20} />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Success Overlay Animation */}
                    {statusType === 'success' && (
                        <div className={styles['success-anim']}>
                            <CheckCircle size={64} className="text-green-500 mb-4" />
                            <span>Message Sent!</span>
                            <p className="text-gray-400 mt-2">I'll get back to you soon.</p>
                        </div>
                    )}
                </form>
            </div>

            {/* External Links (Optional) */}
            {/* 
            <div className={styles['external-contact']}>
                <p>Or find me on these platforms</p>
                <div className={styles['external-links']}>
                    <a href="#" className={`${styles['external-btn']} ${styles.fiverr}`}>Fiverr</a>
                    <a href="#" className={`${styles['external-btn']} ${styles.freelancer}`}>Freelancer</a>
                </div>
            </div> 
            */}
        </section>
    );
};

export default Contact;
