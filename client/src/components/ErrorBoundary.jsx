import React from 'react';

/**
 * Error Boundary component to catch and handle React component errors gracefully.
 * 
 * Prevents the entire app from crashing when a component throws an error.
 * Displays a user-friendly fallback UI and logs errors for debugging.
 * 
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 * 
 *   // With custom fallback:
 *   <ErrorBoundary fallback={<CustomErrorUI />}>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error);
        console.error('Component stack:', errorInfo.componentStack);

        this.setState({ errorInfo });

        // In production, you could send this to an error reporting service
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-secondary, #1a1a2e)',
                    borderRadius: '8px',
                    margin: '1rem'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                    }}>
                        😵
                    </div>
                    <h2 style={{
                        color: 'var(--accent-color, #ff6b6b)',
                        marginBottom: '0.5rem',
                        fontSize: '1.5rem'
                    }}>
                        Something went wrong
                    </h2>
                    <p style={{
                        color: 'var(--text-muted, #888)',
                        marginBottom: '1.5rem',
                        maxWidth: '400px'
                    }}>
                        We're sorry, but something unexpected happened.
                        Please try refreshing the page.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            backgroundColor: 'var(--accent-color, #646cff)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--accent-hover, #535bf2)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--accent-color, #646cff)'}
                    >
                        Try Again
                    </button>

                    {/* Show error details in development */}
                    {import.meta.env?.DEV && this.state.error && (
                        <details style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                            textAlign: 'left',
                            maxWidth: '100%',
                            overflow: 'auto'
                        }}>
                            <summary style={{
                                cursor: 'pointer',
                                color: 'var(--text-muted, #888)',
                                marginBottom: '0.5rem'
                            }}>
                                Error Details (Dev Only)
                            </summary>
                            <pre style={{
                                color: '#ff6b6b',
                                fontSize: '0.875rem',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {this.state.error.toString()}
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
