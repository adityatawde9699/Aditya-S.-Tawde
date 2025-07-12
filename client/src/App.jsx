import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStackScroll from './components/tech_stack';
import './components/tech_stack.css';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Hero />
        <About />
        <TechStackScroll />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Testimonials />
        <Contact />
        {/* Other sections will be added here */}
      </main>
      <Footer />
    </>
  );
}

export default App;
