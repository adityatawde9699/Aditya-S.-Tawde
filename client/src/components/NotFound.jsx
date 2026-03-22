import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="container" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '4rem 1.5rem' }}>
    <section style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>404</p>
      <h1 style={{ marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The page you requested does not exist or may have moved.</p>
      <Link to="/" style={{ color: 'var(--primary)' }}>Return home</Link>
    </section>
  </main>
);

export default NotFound;
