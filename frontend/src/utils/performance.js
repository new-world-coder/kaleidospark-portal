// Performance monitoring utilities
import { useEffect } from 'react';

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');
  
  const metrics = {
    // Navigation timing
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    firstByte: navigation.responseStart - navigation.requestStart,
    
    // Paint timing
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    
    // Resource timing
    totalResources: performance.getEntriesByType('resource').length,
    totalSize: performance.getEntriesByType('resource').reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0)
  };

  return metrics;
};

// Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support FID
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Browser doesn't support CLS
    }
  }
};

// Component performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    };
  });
};

// Bundle size monitoring
export const logBundleSize = () => {
  if (typeof window === 'undefined') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  const totalScriptSize = scripts.reduce((total, script) => {
    return total + (script.src ? 1 : 0); // Approximate
  }, 0);
  
  const totalStyleSize = stylesheets.reduce((total, link) => {
    return total + (link.href ? 1 : 0); // Approximate
  }, 0);
  
  console.log('Bundle analysis:', {
    scripts: scripts.length,
    stylesheets: stylesheets.length,
    totalResources: totalScriptSize + totalStyleSize
  });
};

// Memory usage monitoring
export const logMemoryUsage = () => {
  if (typeof window === 'undefined' || !window.performance.memory) return;

  const memory = window.performance.memory;
  console.log('Memory usage:', {
    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
  });
};