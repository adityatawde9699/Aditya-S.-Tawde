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
import ProjectCasePage from './components/ProjectCasePage';
import ArchivePage from './components/ArchivePage';
import { FEATURED_PROJECTS } from './data/projectData';
import usePageMetadata from './hooks/usePageMetadata';
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Archive = lazy(() => import('./components/Archive'));
const Contact = lazy(() => import('./components/Contact'));
const SectionLoader = () => <div className="loading-container" role="status">Loading section…</div>;
export default function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }) {
  const portfolio = usePortfolioData();
  const motionRoot = useScrollMotion();
  const path = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  usePageMetadata(path);
  const project = path.startsWith('/systems/') ? FEATURED_PROJECTS.find(item => `/systems/${item.id}` === path) : null;
  const isHome = path === '/';
  const isArchive = path === '/archive';
  return <ErrorBoundary><PortfolioContext.Provider value={portfolio}><div className="app"><Backdrop /><a className="skip-link" href="#main-content">Skip to content</a><Header />
    <main ref={motionRoot} id="main-content" className="container">{isHome ? <><Hero /><About />
      <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
      <Engineering /><Skills /><CurrentWork />
      <Suspense fallback={<SectionLoader />}><Experience /></Suspense>
      <Suspense fallback={<SectionLoader />}><Archive /></Suspense>
      <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
    </> : isArchive ? <ArchivePage /> : project ? <ProjectCasePage project={project} /> : <section className="route-not-found"><p className="mono muted">404 / UNKNOWN ROUTE</p><h1>Page not found.</h1><a className="text-link" href="/">Return to the lab ↗</a></section>}</main><Footer /></div></PortfolioContext.Provider></ErrorBoundary>;
}
