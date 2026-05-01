import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40, 
          textAlign: 'center', 
          minHeight: '60vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <div style={{
            width: 80, 
            height: 80, 
            background: '#FEE2E2', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: 24
          }}>
            <span style={{ fontSize: 40 }}>⚠️</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ color: '#64748B', maxWidth: 400, margin: '0 auto 32px' }}>
            {this.state.error?.message || 'The component failed to render. Please try refreshing or return to the login page.'}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#0EA5E9',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
            <button 
              onClick={() => window.location.href='/agent/login'}
              style={{
                background: 'white',
                color: '#1E293B',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 700,
                border: '1px solid #E2E8F0',
                cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
