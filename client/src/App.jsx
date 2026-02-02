import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import './components/tech_stack.css';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load route-based components for code splitting
const Certifications = lazy(() => import('./components/Certifications'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Simple loading fallback component
const LoadingFallback = () => (
  <div className="loading-container" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '1.2rem',
    color: 'var(--accent-color, #646cff)'
  }}>
    Loading...
  </div>
);

function ScrollToTopOnLoad() {
  useEffect(() => {
    // Remove hash from URL if present and scroll to top smoothly
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Optionally, handle navigation events to scroll to top
    const handlePopState = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTopOnLoad />
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <main className="container">
                  <Hero />
                  <About />
                  <TechStack />
                  <Skills />
                  <Education />
                </main>
              }
            />
            <Route path="/certificates" element={<Certifications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;

