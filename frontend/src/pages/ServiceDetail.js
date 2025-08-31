import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Target, Settings, Brain, Database, Users, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { services } from '../mockData';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === parseInt(serviceId));

  if (!service) {
    return (
      <div className="page-content py-16">
        <div className="container text-center">
          <h1 className="heading-1 mb-4">Service Not Found</h1>
          <Link to="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  const getServiceIcon = (iconName) => {
    const icons = {
      target: Target,
      settings: Settings,
      brain: Brain,
      database: Database,
      users: Users
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-12 h-12" />;
  };

  // Service-specific content
  const serviceDetails = {
    1: {
      pain: "Leaders want AI ROI but lack clarity on use cases, risks, and investment priorities.",
      solution: "We assess current maturity, define high-value opportunities, and create an actionable roadmap.",
      deliverables: [
        "AI Maturity Assessment",
        "Use Case Prioritization Matrix",
        "Risk & Governance Framework",
        "18-Month Roadmap",
        "Executive Alignment Sessions"
      ]
    },
    2: {
      pain: "Manual processes drain resources and create bottlenecks that slow business growth.",
      solution: "We identify automation opportunities and implement AI-powered workflows that scale with your business.",
      deliverables: [
        "Process Discovery & Mapping",
        "Automation Opportunity Analysis",
        "RPA + AI Implementation",
        "Change Management Plan",
        "Performance Monitoring Setup"
      ]
    },
    3: {
      pain: "Knowledge workers need AI assistance but security and compliance concerns create barriers.",
      solution: "We build secure, domain-specific copilots that accelerate work while maintaining enterprise controls.",
      deliverables: [
        "Domain-Specific Copilot Development",
        "Security & Compliance Framework",
        "User Training Programs",
        "Performance Analytics",
        "Continuous Improvement Process"
      ]
    },
    4: {
      pain: "Data silos and governance gaps prevent reliable AI deployment at enterprise scale.",
      solution: "We create robust data infrastructure and MLOps practices that enable scalable, compliant AI.",
      deliverables: [
        "Data Pipeline Architecture",
        "MLOps Platform Setup",
        "Governance & Compliance Controls",
        "Model Monitoring & Management",
        "Team Training & Documentation"
      ]
    },
    5: {
      pain: "AI initiatives fail when people don't adopt new tools and processes effectively.",
      solution: "We design comprehensive change programs that ensure AI transformation sticks across your organization.",
      deliverables: [
        "Change Readiness Assessment",
        "Training Curriculum Development",
        "Communication Strategy",
        "Champion Network Setup",
        "Adoption Metrics & Feedback Loops"
      ]
    }
  };

  const detail = serviceDetails[service.id] || serviceDetails[1];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section solid">
        <div className="hero-content">
          <div className="flex items-center justify-center mb-6">
            {getServiceIcon(service.icon)}
          </div>
          
          <h1 className="heading-hero hero-title">
            {service.title}
          </h1>
          
          <p className="body-large hero-subtitle">
            {service.description}
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

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Pain Point */}
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="heading-2 text-red-900">The Challenge</h3>
                </div>
                <p className="body-medium text-red-800">{detail.pain}</p>
              </div>

              {/* Solution */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="heading-2 text-blue-900">Our Solution</h3>
                </div>
                <p className="body-medium text-blue-800">{detail.solution}</p>
              </div>

              {/* Outcomes */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="heading-2 text-green-900">Results</h3>
                </div>
                <ul className="space-y-2">
                  {service.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-center text-sm text-green-800">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="heading-1 mb-6 text-center">What You'll Receive</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {detail.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0" />
                    <span className="body-medium">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center mb-12">
              <h3 className="heading-2 mb-4">Proven Results</h3>
              <blockquote className="body-large italic text-gray-700 mb-4">
                "{service.proof}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Ready to Get Started?</h2>
            <p className="body-large text-gray-600 mb-8">
              Let's discuss how {service.title.toLowerCase()} can transform your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Book Strategy Session
              </Link>
              <Link to="/case-studies" className="btn-secondary">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="heading-1 text-center mb-12">Related Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map((relatedService) => (
                <Link
                  key={relatedService.id}
                  to={`/services/${relatedService.id}`}
                  className={`voice-card ${relatedService.color} hover-lift`}
                >
                  <h4 className="voice-card-title mb-3">{relatedService.title}</h4>
                  <p className="voice-card-description">{relatedService.description}</p>
                  <div className="flex items-center text-sm font-medium mt-4">
                    <span>Learn more</span>
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

export default ServiceDetail;