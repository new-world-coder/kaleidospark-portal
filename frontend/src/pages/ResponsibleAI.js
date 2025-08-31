import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Scale, FileCheck, Users, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const ResponsibleAI = () => {
  const principles = [
    {
      icon: Shield,
      title: 'Governance Framework',
      description: 'Comprehensive AI governance aligned with EU AI Act, NIST RMF, and industry standards.',
      details: [
        'Risk assessment protocols',
        'Model validation procedures',
        'Continuous monitoring systems',
        'Stakeholder accountability'
      ]
    },
    {
      icon: Eye,
      title: 'Transparency & Explainability',
      description: 'Clear understanding of how AI systems make decisions and their potential impacts.',
      details: [
        'Model interpretability tools',
        'Decision audit trails',
        'User-friendly explanations',
        'Documentation standards'
      ]
    },
    {
      icon: Scale,
      title: 'Fairness & Bias Mitigation',
      description: 'Proactive identification and mitigation of bias across all stages of AI development.',
      details: [
        'Bias detection algorithms',
        'Diverse training datasets',
        'Regular fairness audits',
        'Corrective action protocols'
      ]
    },
    {
      icon: FileCheck,
      title: 'Compliance & Regulation',
      description: 'Full alignment with GDPR, CCPA, HIPAA, and emerging AI regulations.',
      details: [
        'Regulatory mapping',
        'Compliance monitoring',
        'Legal requirement tracking',
        'Audit preparation'
      ]
    }
  ];

  const frameworks = [
    {
      name: 'EU AI Act',
      description: 'Comprehensive compliance with European AI regulation',
      status: 'Implemented'
    },
    {
      name: 'NIST AI RMF',
      description: 'US National Institute of Standards framework',
      status: 'Implemented'
    },
    {
      name: 'GDPR/CCPA',
      description: 'Data privacy and protection compliance',
      status: 'Implemented'
    },
    {
      name: 'HIPAA',
      description: 'Healthcare data security and privacy',
      status: 'Implemented'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management',
      status: 'Certified'
    },
    {
      name: 'SOC 2',
      description: 'Service organization controls',
      status: 'Compliant'
    }
  ];

  const differentiators = [
    {
      title: 'Built-In, Not Bolted-On',
      description: 'We integrate responsible AI practices from the very beginning of every project, not as an afterthought.'
    },
    {
      title: 'Industry-Specific Compliance',
      description: 'Deep understanding of regulatory requirements across healthcare, financial services, and other regulated industries.'
    },
    {
      title: 'Proactive Risk Management',
      description: 'Continuous monitoring and early warning systems to identify and address potential issues before they impact your business.'
    },
    {
      title: 'Human-Centered Design',
      description: 'AI systems designed to augment human capabilities while maintaining human oversight and control.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-announcement">
            <Shield className="w-4 h-4" />
            <span>Trust-First AI</span>
          </div>
          
          <h1 className="heading-hero hero-title">
            Trust Is Our First Deliverable
          </h1>
          
          <p className="body-large hero-subtitle">
            Governance, compliance, and transparency are embedded from day one. We don't just build AI — we build AI you can trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Discuss Your Requirements
            </Link>
            <Link to="/resources" className="btn-secondary">
              Download Framework Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Our Responsible AI Principles</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Every AI solution we build is grounded in these four foundational principles.
            </p>
          </div>

          <div className="ai-grid">
            {principles.map((principle, index) => (
              <div key={index} className="voice-card accent-blue hover-lift">
                <div className="flex items-center mb-6">
                  <principle.icon className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="voice-card-title">{principle.title}</h3>
                </div>
                
                <p className="voice-card-description mb-6">{principle.description}</p>
                
                <div>
                  <h4 className="heading-3 mb-3">Key Components</h4>
                  <ul className="space-y-2">
                    {principle.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Compliance & Standards</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We align with leading international standards and regulatory frameworks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-3">{framework.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      framework.status === 'Implemented' || framework.status === 'Certified' || framework.status === 'Compliant'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {framework.status}
                    </span>
                  </div>
                  <p className="body-small text-gray-700">{framework.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Why We're Different</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Most organizations treat responsible AI as a compliance checkbox. We make it the foundation of everything we build.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((diff, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="heading-3 mb-4">{diff.title}</h3>
                  <p className="body-medium text-gray-700">{diff.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Process */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Our Risk Management Process</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Systematic approach to identifying, assessing, and mitigating AI risks throughout the project lifecycle.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Identify</h3>
                <p className="body-small text-gray-700">
                  Comprehensive risk assessment across technical, ethical, and regulatory dimensions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Assess</h3>
                <p className="body-small text-gray-700">
                  Quantify risk levels and potential impact on business and stakeholders.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Mitigate</h3>
                <p className="body-small text-gray-700">
                  Implement controls and safeguards to reduce risks to acceptable levels.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Monitor</h3>
                <p className="body-small text-gray-700">
                  Continuous monitoring and adjustment as systems evolve and new risks emerge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human-AI Collaboration */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-1 mb-6">Human-Centered AI</h2>
                <p className="body-medium text-gray-700 mb-6">
                  We believe AI should augment human capabilities, not replace human judgment. Every system we build maintains meaningful human oversight and control.
                </p>
                <p className="body-medium text-gray-700 mb-8">
                  Our approach ensures that humans remain in the loop for critical decisions, with AI providing insights and recommendations that enhance human decision-making rather than automating it away.
                </p>
                <Link to="/contact" className="btn-primary">
                  Discuss Your Approach
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="heading-2 mb-6">Human Oversight Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Human-in-the-Loop</div>
                      <div className="text-sm text-gray-600">Critical decisions require human approval</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Eye className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Explainable Decisions</div>
                      <div className="text-sm text-gray-600">Clear reasoning for every AI recommendation</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Override Capabilities</div>
                      <div className="text-sm text-gray-600">Humans can always override AI decisions</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Audit Trails</div>
                      <div className="text-sm text-gray-600">Complete record of all decisions and overrides</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Ready to Build Trustworthy AI?</h2>
            <p className="body-large text-gray-600 mb-8">
              Let's discuss how our responsible AI framework can help you build systems that are not only powerful, but also trustworthy, compliant, and aligned with your values.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Start the Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/resources" className="btn-secondary">
                Download Framework Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsibleAI;