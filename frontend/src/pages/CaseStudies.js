import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Clock } from 'lucide-react';
import { caseStudies } from '../mockData';

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))];
  
  const filteredCaseStudies = selectedIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Real Results, Delivered Responsibly
          </h1>
          
          <p className="body-large hero-subtitle">
            Every engagement drives measurable outcomes — without hype.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`btn-tag ${selectedIndustry === industry ? 'active' : ''}`}
              >
                {industry === 'all' ? 'All Industries' : industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="ai-grid">
            {filteredCaseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className="voice-card accent-grey hover-lift">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="btn-tag active text-xs">{caseStudy.industry}</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>

                <h3 className="voice-card-title mb-4">{caseStudy.title}</h3>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="heading-3 mb-2 text-red-700">Challenge</h4>
                  <p className="body-small text-gray-700">{caseStudy.challenge}</p>
                </div>

                {/* Approach */}
                <div className="mb-6">
                  <h4 className="heading-3 mb-2 text-blue-700">Approach</h4>
                  <p className="body-small text-gray-700">{caseStudy.approach}</p>
                </div>

                {/* Outcome */}
                <div className="mb-6">
                  <h4 className="heading-3 mb-2 text-green-700">Outcome</h4>
                  <p className="body-small text-gray-700">{caseStudy.outcome}</p>
                </div>

                {/* Metrics */}
                <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
                  <h4 className="heading-3 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <blockquote className="body-small italic text-blue-900 mb-3">
                    "{caseStudy.testimonial}"
                  </blockquote>
                  <cite className="text-xs text-blue-700 font-medium">
                    — {caseStudy.client}
                  </cite>
                </div>

                {/* Read Time */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>5 min read</span>
                  </div>
                  <span>Case Study</span>
                </div>
              </div>
            ))}
          </div>

          {/* Show more button if needed */}
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="body-medium text-gray-600 mb-6">
                No case studies found for the selected industry.
              </p>
              <button
                onClick={() => setSelectedIndustry('all')}
                className="btn-secondary"
              >
                View All Case Studies
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Ready to Create Your Success Story?</h2>
            <p className="body-large text-gray-600 mb-8">
              Join the enterprises who have transformed their operations with responsible AI. Let's discuss how we can help you achieve similar results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Start Your Transformation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn About Our Approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-1 text-center mb-12">Our Track Record</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="heading-hero text-blue-600 mb-2">50+</div>
                <div className="body-medium text-gray-700">Successful Projects</div>
              </div>
              <div>
                <div className="heading-hero text-green-600 mb-2">$100M+</div>
                <div className="body-medium text-gray-700">Client Value Generated</div>
              </div>
              <div>
                <div className="heading-hero text-purple-600 mb-2">95%</div>
                <div className="body-medium text-gray-700">Client Satisfaction</div>
              </div>
              <div>
                <div className="heading-hero text-orange-600 mb-2">18</div>
                <div className="body-medium text-gray-700">Month Avg ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;