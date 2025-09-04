import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null;
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType, success = true) => {
  trackEvent('form_submission', {
    event_category: 'forms',
    event_label: formType,
    success: success
  });
};

// Track resource downloads
export const trackResourceDownload = (resourceName, resourceType) => {
  trackEvent('resource_download', {
    event_category: 'resources',
    event_label: resourceName,
    resource_type: resourceType
  });
};

// Track page engagement
export const trackPageEngagement = (pageName, timeSpent) => {
  trackEvent('page_engagement', {
    event_category: 'engagement',
    event_label: pageName,
    value: timeSpent
  });
};

export default GoogleAnalytics;