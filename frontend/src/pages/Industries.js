import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Factory, Heart, Building, CreditCard } from 'lucide-react';
import { industries } from '../mockData';

const Industries = () => {
  const getIndustryIcon = (iconName) => {
    const icons = {
      'shopping-cart': ShoppingCart,
      factory: Factory,
      heart: Heart,
      building: Building,
      'credit-card': CreditCard
    };
    const IconComponent = icons[iconName] || ShoppingCart;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Industry-Specific AI, Built for Trust
          </h1>
          
          <p className="body-large hero-subtitle">
            We focus on sectors where compliance and impact go hand-in-hand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Book Discovery Call
            </Link>
            <Link to="/resources" className="btn-secondary">
              Download Industry Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Industries We Serve</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Deep expertise in sectors where AI can drive the most impact while maintaining the highest standards of compliance and governance.
            </p>
          </div>

          <div className="ai-grid">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                to={`/industries/${industry.id}`}
                className={`voice-card ${industry.color} hover-lift`}
              >
                <div className="flex items-center mb-6">
                  {getIndustryIcon(industry.icon)}
                  <h3 className="voice-card-title ml-4">{industry.name}</h3>
                </div>
                
                <p className="voice-card-description mb-6">{industry.description}</p>
                
                {/* Key Solutions */}
                <div className="mb-6">
                  <h4 className="heading-3 mb-3">Key Solutions</h4>
                  <ul className="space-y-2">
                    {industry.solutions.slice(0, 3).map((solution, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ArrowRight className="w-3 h-3 mr-2 text-gray-600" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proof */}
                <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
                  <p className="text-sm italic">"{industry.proof}"</p>
                </div>

                <div className="flex items-center text-sm font-medium mt-auto">
                  <span>Explore solutions</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Don't See Your Industry?</h2>
            <p className="body-large text-gray-600 mb-8">
              We work with enterprises across many sectors. Our responsible AI approach adapts to your industry's specific compliance and operational requirements.
            </p>
            
            <Link to="/contact" className="btn-primary">
              Discuss Your Industry
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;