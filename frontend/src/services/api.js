import axios from 'axios';
import { trackFormSubmission } from '../components/GoogleAnalytics';
import { staticDataCache, generateCacheKey, withCache } from './cache';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for caching
apiClient.interceptors.request.use(
  (config) => {
    // Add cache-busting for POST/PUT/DELETE requests
    if (['post', 'put', 'delete'].includes(config.method)) {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
);

// API functions
export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role || null,
      message: formData.message,
      interest: formData.interest || 'general'
    });
    
    // Track successful form submission
    trackFormSubmission('contact_form', true);
    
    return response;
  } catch (error) {
    // Track failed form submission
    trackFormSubmission('contact_form', false);
    throw error;
  }
};

export const bookDiscoveryCall = async (bookingData) => {
  try {
    const response = await apiClient.post('/book-call', {
      name: bookingData.name,
      email: bookingData.email,
      company: bookingData.company,
      preferred_date: bookingData.preferredDate,
      preferred_time: bookingData.preferredTime,
      timezone: bookingData.timezone
    });
    
    // Track successful booking
    trackFormSubmission('discovery_call_booking', true);
    
    return response;
  } catch (error) {
    // Track failed booking
    trackFormSubmission('discovery_call_booking', false);
    throw error;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await apiClient.post('/newsletter/subscribe', {
      email: email
    });
    
    // Track successful newsletter subscription
    trackFormSubmission('newsletter_subscription', true);
    
    return response;
  } catch (error) {
    // Track failed newsletter subscription
    trackFormSubmission('newsletter_subscription', false);
    throw error;
  }
};

export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await apiClient.post(`/events/${eventId}/register`, {
      name: registrationData.name,
      email: registrationData.email,
      company: registrationData.company || null
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Admin API functions with caching
export const getContactSubmissions = withCache(
  staticDataCache,
  () => generateCacheKey('contacts')
)(async () => {
  try {
    const response = await apiClient.get('/admin/contacts');
    return response;
  } catch (error) {
    throw error;
  }
});

export const getDiscoveryCallBookings = withCache(
  staticDataCache,
  () => generateCacheKey('bookings')
)(async () => {
  try {
    const response = await apiClient.get('/admin/bookings');
    return response;
  } catch (error) {
    throw error;
  }
});

export const getNewsletterSubscribers = withCache(
  staticDataCache,
  () => generateCacheKey('subscribers')
)(async () => {
  try {
    const response = await apiClient.get('/admin/subscribers');
    return response;
  } catch (error) {
    throw error;
  }
});

// Health check
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/');
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiClient;