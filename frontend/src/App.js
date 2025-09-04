import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import ResponsibleAI from "./pages/ResponsibleAI";
import Resources from "./pages/Resources";
import Events from "./pages/Events";

// Admin Components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="page-content">
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
              </main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;