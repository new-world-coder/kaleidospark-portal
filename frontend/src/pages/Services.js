import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Settings, Brain, Database, Users, CheckCircle } from 'lucide-react';
import { services } from '../mockData';

const Services = () => {
  const getServiceIcon = (iconName) => {
    const icons = {
      target: Target,
      settings: Settings,
      brain: Brain,
      database: Database,
      users: Users
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Strategy + AI Execution, Done Responsibly
          </h1>
          
          <p className="body-large hero-subtitle">
            From roadmaps to copilots, KaleidoSpark accelerates enterprise transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Book Strategy Session
            </Link>
            <Link to="/resources" className="btn-secondary">
              Download Service Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Copy */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="body-large text-gray-600">
              We bridge the gap between strategy and execution. Each service is designed to solve enterprise-scale challenges — with measurable outcomes and built-in compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="ai-grid">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={`voice-card ${service.color} hover-lift`}
              >
                <div className="flex items-center mb-6">
                  {getServiceIcon(service.icon)}
                  <h3 className="voice-card-title ml-4">{service.title}</h3>
                </div>
                
                <p className="voice-card-description mb-6">{service.description}</p>
                
                {/* Outcomes */}
                <div className="mb-6">
                  <h4 className="heading-3 mb-3">Key Outcomes</h4>
                  <ul className="space-y-2">
                    {service.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proof */}
                <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
                  <p className="text-sm italic">"{service.proof}"</p>
                </div>

                <div className="flex items-center text-sm font-medium mt-auto">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Not Sure Where to Start?</h2>
            <p className="body-large text-gray-600 mb-8">
              Take our free AI Readiness Assessment to identify your priorities and create a custom roadmap.
            </p>
            
            <Link to="/contact" className="btn-primary">
              Take AI Readiness Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;