import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Factory, Heart, Building, CreditCard, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { industries } from '../mockData';

const IndustryDetail = () => {
  const { industryId } = useParams();
  const industry = industries.find(i => i.id === parseInt(industryId));

  if (!industry) {
    return (
      <div className="page-content py-16">
        <div className="container text-center">
          <h1 className="heading-1 mb-4">Industry Not Found</h1>
          <Link to="/industries" className="btn-primary">Back to Industries</Link>
        </div>
      </div>
    );
  }

  const getIndustryIcon = (iconName) => {
    const icons = {
      'shopping-cart': ShoppingCart,
      factory: Factory,
      heart: Heart,
      building: Building,
      'credit-card': CreditCard
    };
    const IconComponent = icons[iconName] || ShoppingCart;
    return <IconComponent className="w-12 h-12" />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section solid">
        <div className="hero-content">
          <div className="flex items-center justify-center mb-6">
            {getIndustryIcon(industry.icon)}
          </div>
          
          <h1 className="heading-hero hero-title">
            Responsible AI for {industry.name}
          </h1>
          
          <p className="body-large hero-subtitle">
            {industry.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Book Discovery Call
            </Link>
            <Link to="/resources" className="btn-secondary">
              Download {industry.name} Playbook
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Details */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Challenges */}
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="heading-2 text-red-900">Key Challenges</h3>
                </div>
                <ul className="space-y-3">
                  {industry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="body-small text-red-800">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="heading-2 text-blue-900">Our Solutions</h3>
                </div>
                <ul className="space-y-3">
                  {industry.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 mr-3 shrink-0" />
                      <span className="body-small text-blue-800">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="heading-2 text-green-900">Expected Outcomes</h3>
                </div>
                <ul className="space-y-3">
                  {industry.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-1 mr-3 shrink-0" />
                      <span className="body-small text-green-800">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Proof Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center mb-12">
              <h3 className="heading-2 mb-4">Proven Success</h3>
              <blockquote className="body-large italic text-gray-700 mb-4">
                "{industry.proof}"
              </blockquote>
              <div className="flex justify-center">
                <Link to="/case-studies" className="btn-secondary">
                  Read Full Case Studies
                </Link>
              </div>
            </div>

            {/* Compliance & Governance */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="heading-1 mb-6 text-center">Industry-Specific Compliance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="heading-3 mb-3">Regulatory Alignment</h4>
                  <ul className="space-y-2">
                    {industry.name === 'Healthcare' && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">HIPAA Compliance</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">FDA Guidelines</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">Patient Privacy</span>
                        </li>
                      </>
                    )}
                    {industry.name === 'Fintech' && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">EU AI Act</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">PCI DSS</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">SOX Compliance</span>
                        </li>
                      </>
                    )}
                    {industry.name === 'Retail' && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">GDPR/CCPA</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">Data Privacy</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">Consumer Rights</span>
                        </li>
                      </>
                    )}
                    {(industry.name === 'Manufacturing' || industry.name === 'Real Estate') && (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">GDPR/CCPA</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">Industry Standards</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="body-small">Data Governance</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="heading-3 mb-3">Governance Framework</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="body-small">Explainable AI</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="body-small">Bias Auditing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="body-small">Model Monitoring</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="body-small">Audit Trails</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Ready to Transform {industry.name}?</h2>
            <p className="body-large text-gray-600 mb-8">
              Let's discuss how our industry-specific AI solutions can address your unique challenges and compliance requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Book Discovery Call
              </Link>
              <Link to="/case-studies" className="btn-secondary">
                View {industry.name} Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="heading-1 text-center mb-12">Other Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {industries
              .filter(i => i.id !== industry.id)
              .map((relatedIndustry) => (
                <Link
                  key={relatedIndustry.id}
                  to={`/industries/${relatedIndustry.id}`}
                  className={`voice-card ${relatedIndustry.color} hover-lift`}
                >
                  <div className="flex items-center mb-4">
                    {getIndustryIcon(relatedIndustry.icon)}
                    <h4 className="voice-card-title ml-3">{relatedIndustry.name}</h4>
                  </div>
                  <p className="voice-card-description text-sm">{relatedIndustry.description}</p>
                  <div className="flex items-center text-sm font-medium mt-4">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;