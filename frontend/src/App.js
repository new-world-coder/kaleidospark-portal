import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import GoogleAnalytics from './components/GoogleAnalytics';
import { measureWebVitals, logBundleSize, logMemoryUsage } from './utils/performance';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Industries = lazy(() => import("./pages/Industries"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const ResponsibleAI = lazy(() => import("./pages/ResponsibleAI"));
const Resources = lazy(() => import("./pages/Resources"));
const Events = lazy(() => import("./pages/Events"));

// Admin Components - Lazy loaded
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    measureWebVitals();
    logBundleSize();
    
    // Log memory usage periodically
    const memoryInterval = setInterval(logMemoryUsage, 30000); // Every 30 seconds
    
    return () => clearInterval(memoryInterval);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GoogleAnalytics />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin/subscribers" element={
              <ProtectedRoute>
                <AdminSubscribers />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="page-content">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/:serviceId" element={<ServiceDetail />} />
                      <Route path="/industries" element={<Industries />} />
                      <Route path="/industries/:industryId" element={<IndustryDetail />} />
                      <Route path="/case-studies" element={<CaseStudies />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/responsible-ai" element={<ResponsibleAI />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/events" element={<Events />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </Suspense>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;