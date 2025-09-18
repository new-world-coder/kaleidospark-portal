// Critical CSS utilities for above-the-fold content optimization

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for initial render */
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #FFF9F2;
    color: #232323;
  }

  .header-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 80px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
    transition: all 0.3s ease;
  }

  .hero-section {
    background: linear-gradient(180deg, rgba(252, 202, 199, 1) 0%, rgba(253, 215, 197, 0.8) 25%, rgba(254, 241, 229, 0.6) 50%, rgba(255, 250, 243, 0.8) 75%, rgba(252, 202, 199, 1) 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5rem 1.2rem 3rem;
    position: relative;
  }

  .hero-content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .heading-hero {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #232323;
  }

  .body-large {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
    font-weight: 400;
    color: #232323;
  }

  .btn-primary {
    background: #232323;
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 1.2rem;
    font-family: 'SF Mono', monospace;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 2.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    line-height: 1.2;
  }

  .btn-primary:hover {
    background: #353535;
    transform: scale(1.02);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: #232323;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    padding: 0.75rem 1.2rem;
    font-family: 'SF Mono', monospace;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 2.25rem;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    line-height: 1.2;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  .page-content {
    padding-top: 80px;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.2rem;
  }

  /* Loading spinner */
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (min-width: 768px) {
    .container {
      padding: 0 2.25rem;
    }
  }

  @media (min-width: 1280px) {
    .container {
      padding: 0;
    }
  }

  @media (max-width: 767px) {
    .hero-section {
      padding: 6rem 1rem 2rem;
      min-height: 80vh;
    }
    
    .btn-primary,
    .btn-secondary {
      width: 100%;
      min-height: 3rem;
    }
    
    .header-nav {
      padding: 0 1rem;
    }
  }
`;

// Inject critical CSS into the document head
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.setAttribute('data-critical', 'true');
  
  // Insert at the beginning of head for highest priority
  const head = document.head;
  head.insertBefore(style, head.firstChild);
};

// Remove critical CSS after main stylesheet loads
export const removeCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const criticalStyle = document.querySelector('style[data-critical]');
  if (criticalStyle) {
    criticalStyle.remove();
  }
};