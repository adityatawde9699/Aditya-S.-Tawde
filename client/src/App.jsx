import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Engineering from './components/Engineering';
import CurrentWork from './components/CurrentWork';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import ErrorBoundary from './components/ErrorBoundary';
import { PortfolioContext, usePortfolioData } from './hooks/usePortfolio';
import './App.css';
import useScrollMotion from './hooks/useScrollMotion';
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Archive = lazy(() => import('./components/Archive'));
const Contact = lazy(() => import('./components/Contact'));
const SectionLoader = () => <div className="loading-container" role="status">Loading section…</div>;
export default function App() {
  const portfolio = usePortfolioData();
  const motionRoot = useScrollMotion();
  return <ErrorBoundary><PortfolioContext.Provider value={portfolio}><div className="app"><Backdrop /><a className="skip-link" href="#main-content">Skip to content</a><Header />
    <main ref={motionRoot} id="main-content" className="container"><Hero /><About />
      <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
      <Engineering /><Skills /><CurrentWork />
      <Suspense fallback={<SectionLoader />}><Experience /></Suspense>
      <Suspense fallback={<SectionLoader />}><Archive /></Suspense>
      <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
    </main><Footer /></div></PortfolioContext.Provider></ErrorBoundary>;
}
