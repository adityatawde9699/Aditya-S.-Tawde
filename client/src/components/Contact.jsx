import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { sendContact } from '../services/api';

const initialForm = { firstName: '', lastName: '', company: '', email: '', phone: '', message: '' };
const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // Validation
    useEffect(() => {
        const newErrors = {};
        if (touched.firstName && !form.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (touched.email && !form.email.trim()) newErrors.email = 'Email is required.';
        else if (touched.email && !validateEmail(form.email)) newErrors.email = 'Invalid email address.';
        if (touched.message && !form.message.trim()) newErrors.message = 'Message is required.';
        setErrors(newErrors);
    }, [form, touched]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ firstName: true, email: true, message: true });

        if (!form.firstName || !form.email || !form.message) return;
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        setStatus('');
        setStatusType('');

        try {
            // Combine first and last name for API
            const payload = {
                name: `${form.firstName} ${form.lastName}`.trim(),
                email: form.email,
                message: form.message
            };
            const response = await sendContact(payload);
            setStatus(response.data.message || 'Message sent successfully!');
            setStatusType('success');
            setForm(initialForm);
            setTouched({});
            setAgreed(false);
        } catch (error) {
            setStatus(error.message || 'An error occurred. Please try again.');
            setStatusType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 overflow-hidden">
            {/* Background Gradient - Top Left */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            {/* Header - Centered */}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Contact sales
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-400">
                    Aute magna irure deserunt veniam aliqua magna enim voluptate.
                </p>
            </div>

            {/* Form - Centered */}
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-white">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={form.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-white">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={form.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-white">
                            Company
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="company"
                                name="company"
                                type="text"
                                value={form.company}
                                onChange={handleChange}
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="email"
                                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-white/10'
                                    }`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">
                            Phone number
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option>US</option>
                                    <option>CA</option>
                                    <option>EU</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                                />
                            </div>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                                placeholder="123-456-7890"
                                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 pl-20 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.message ? 'ring-red-500' : 'ring-white/10'
                                    }`}
                            />
                            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                        </div>
                    </div>

                    {/* Agreement Switch */}
                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <button
                                type="button"
                                role="switch"
                                aria-checked={agreed}
                                onClick={() => setAgreed(!agreed)}
                                className={`flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${agreed ? 'bg-indigo-500' : 'bg-white/10'
                                    }`}
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${agreed ? 'translate-x-3.5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                        <label className="text-sm leading-6 text-gray-400">
                            By selecting this, you agree to our{' '}
                            <a href="#" className="font-semibold text-indigo-400">
                                privacy&nbsp;policy
                            </a>
                            .
                        </label>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className={`mt-6 p-4 rounded-md flex items-center gap-3 ${statusType === 'success'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}>
                        {statusType === 'success' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {status}
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            "Let's talk"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
