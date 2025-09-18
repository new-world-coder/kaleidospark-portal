import React, { useState, memo, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, Heart } from 'lucide-react';
import { getServiceIcon, getIndustryIcon } from '../utils/icons';
import AIReadinessAssessment from '../components/AIReadinessAssessment';
import TestimonialsSlider from '../components/TestimonialsSlider';
import { services, industries, caseStudies } from '../mockData';

// Move static data outside component to prevent recreation
const trustBadges = [
  { name: 'Responsible AI', icon: Shield },
  { name: 'GDPR/CCPA', icon: Award },
  { name: 'HIPAA Aligned', icon: Heart }
];

const Home = memo(() => {
  const [showAssessment, setShowAssessment] = useState(false);

  const renderServiceIcon = useCallback((iconName) => {
    const IconComponent = getServiceIcon(iconName);
    return <IconComponent className="w-6 h-6" />;
  }, []);

  const renderIndustryIcon = useCallback((iconName) => {
    const IconComponent = getIndustryIcon(iconName);
    return <IconComponent className="w-6 h-6" />;
  }, []);

  const handleAssessmentToggle = useCallback(() => {
    setShowAssessment(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-announcement">
            <Star className="w-4 h-4" />
            <span>Boutique AI Consulting</span>
          </div>
          
          <h1 className="heading-hero hero-title">
            AI-Powered Strategy, Delivered with Boutique Precision
          </h1>
          
          <p className="body-large hero-subtitle">
            KaleidoSpark helps enterprises unlock efficiency, compliance, and growth through responsible AI and intelligent transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Book a Discovery Call
            </Link>
            <button 
              onClick={handleAssessmentToggle}
              className="btn-secondary"
            >
              Take AI Readiness Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Why Enterprises Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Why Enterprises Choose Us</h2>
            <p className="body-large text-gray-600">
              Big-4 consulting can feel bloated. Startups can feel risky. KaleidoSpark is your pragmatic middle path — expert, agile, and built for measurable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Services Snapshot</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              From strategy to execution, we deliver AI solutions that drive measurable business outcomes.
            </p>
          </div>
          
          <div className="voice-grid max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={`voice-card ${service.color} hover-lift`}
              >
                <div className="flex items-center mb-4">
                  {renderServiceIcon(service.icon)}
                  <h3 className="voice-card-title ml-3">{service.title}</h3>
                </div>
                <p className="voice-card-description">{service.description}</p>
                <div className="flex items-center text-sm font-medium mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Industries We Serve</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We focus on sectors where compliance and impact go hand-in-hand.
            </p>
          </div>
          
          <div className="voice-grid max-w-6xl mx-auto">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                to={`/industries/${industry.id}`}
                className={`voice-card ${industry.color} hover-lift`}
              >
                <div className="flex items-center mb-4">
                  {renderIndustryIcon(industry.icon)}
                  <h3 className="voice-card-title ml-3">{industry.name}</h3>
                </div>
                <p className="voice-card-description">{industry.description}</p>
                <div className="flex items-center text-sm font-medium mt-4">
                  <span>Explore solutions</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/industries" className="btn-primary">
              View All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* Proof & Trust */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Proof & Trust</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Real results from enterprises who trust us with their AI transformation.
            </p>
          </div>

          {/* Case Study Highlight */}
          <div className="max-w-4xl mx-auto mb-12">
            <TestimonialsSlider />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <badge.icon className="w-8 h-8 mx-auto mb-3 text-gray-700" />
                <h4 className="heading-3">{badge.name}</h4>
              </div>
            ))}
          </div>

          {/* Partner Logos Placeholder */}
          <div className="text-center">
            <p className="caption mb-6">Trusted by leading enterprises across industries</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Cloud Partner</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">AI Platform</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Tech Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Start Building AI Confidence Today</h2>
            <p className="body-large text-gray-600 mb-8">
              Ready to unlock your enterprise's AI potential? Book a discovery call or download our comprehensive AI readiness toolkit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Book Discovery Call
              </Link>
              <button 
                onClick={handleAssessmentToggle}
                className="btn-secondary"
              >
                Take AI Readiness Assessment
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <AIReadinessAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
      />
    </div>
  );
});

export default Home;