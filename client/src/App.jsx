import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy-load heavier sections for performance
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback
const SectionLoader = () => (
  <div className="loading-container" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '30vh',
    fontSize: '1rem',
    color: 'var(--accent-primary)',
    fontFamily: 'var(--font-mono)',
  }}>
    Loading
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Backdrop />
        <Header />
        <Suspense fallback={<SectionLoader />}>
          <main className="container">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Resume />
            <Contact />
          </main>
        </Suspense>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
