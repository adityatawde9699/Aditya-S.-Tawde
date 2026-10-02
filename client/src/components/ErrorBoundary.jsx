import { Component } from 'react';
export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Portfolio rendering error:', error, info.componentStack); }
  render() {
    if (this.state.hasError) return <main className="container lab-section"><p className="mono muted">AST_ / RENDER INTERRUPTED</p><h1 style={{ marginBlock: '2rem', fontSize: '2rem' }}>Something went wrong.</h1><p className="muted">Refresh the page to reload the portfolio.</p><button className="button" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>Reload →</button></main>;
    return this.props.children;
  }
}
