import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStackScroll from './components/tech_stack';
import './components/tech_stack.css';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    <Router>
      <ScrollToTopOnLoad />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="container">
              <Hero />
              <About />
              <TechStackScroll />
              <Skills />
              <Education />
            </main>
          }
        />
        <Route path="/certificates" element={<Certifications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
