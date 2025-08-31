import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Award, Shield, Zap, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Responsible First',
      description: 'We build governance, compliance, and transparency into every AI solution from day one.'
    },
    {
      icon: Target,
      title: 'Outcome Driven',
      description: 'Every engagement is designed around measurable business impact and ROI.'
    },
    {
      icon: Users,
      title: 'Human Centered',
      description: 'Technology serves people, not the other way around. Change management is core to our approach.'
    },
    {
      icon: Zap,
      title: 'Agile Execution',
      description: 'Boutique agility meets enterprise rigor. We move fast without breaking things.'
    }
  ];

  const differentiators = [
    {
      title: 'Boutique Focus',
      description: 'Unlike Big-4 firms, we provide personalized attention and rapid decision-making.',
      highlight: 'Personal attention'
    },
    {
      title: 'Proven Expertise',
      description: 'Unlike startups, we bring deep enterprise experience and battle-tested frameworks.',
      highlight: 'Enterprise ready'
    },
    {
      title: 'Responsible AI',
      description: 'Unlike pure tech vendors, we prioritize governance, compliance, and ethical AI.',
      highlight: 'Trust-first approach'
    },
    {
      title: 'Industry Depth',
      description: 'We focus on sectors where AI impact and compliance requirements are highest.',
      highlight: 'Domain expertise'
    }
  ];

  const stats = [
    { number: '50+', label: 'Enterprise Clients' },
    { number: '$100M+', label: 'Value Generated' },
    { number: '95%', label: 'Success Rate' },
    { number: '5', label: 'Key Industries' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-announcement">
            <Heart className="w-4 h-4" />
            <span>Boutique AI Consultancy</span>
          </div>
          
          <h1 className="heading-hero hero-title">
            The Pragmatic Middle Path for Enterprise AI
          </h1>
          
          <p className="body-large hero-subtitle">
            Big-4 consulting can feel bloated. Startups can feel risky. KaleidoSpark is your expert, agile partner built for measurable AI transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/team" className="btn-primary">
              Meet Our Team
            </Link>
            <Link to="/contact" className="btn-secondary">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-1 mb-6">Our Story</h2>
              <p className="body-large text-gray-600">
                Founded by enterprise AI veterans who saw the gap between strategy and execution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="heading-2 mb-4">Why We Started KaleidoSpark</h3>
                <p className="body-medium text-gray-700 mb-6">
                  After years of working with Fortune 500 companies, we noticed a consistent pattern: brilliant AI strategies that failed in execution, and technical implementations that ignored business realities.
                </p>
                <p className="body-medium text-gray-700 mb-6">
                  We founded KaleidoSpark to bridge that gap — combining strategic rigor with hands-on implementation, always through the lens of responsible AI and measurable outcomes.
                </p>
                <p className="body-medium text-gray-700">
                  Today, we help enterprises navigate AI transformation with confidence, knowing that every solution is built for scale, compliance, and real business impact.
                </p>
              </div>
              
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="heading-2 text-blue-600 mb-2">{stat.number}</div>
                      <div className="body-small text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Our Values</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we build.
            </p>
          </div>

          <div className="voice-grid max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="voice-card accent-blue hover-lift">
                <div className="flex items-center mb-4">
                  <value.icon className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="voice-card-title">{value.title}</h3>
                </div>
                <p className="voice-card-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">What Makes Us Different</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We occupy the sweet spot between agility and expertise, between innovation and responsibility.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((diff, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {diff.highlight}
                    </div>
                  </div>
                  <h3 className="heading-3 mb-3">{diff.title}</h3>
                  <p className="body-medium text-gray-700">{diff.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Partner Ecosystem</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We work with best-in-class technology partners to deliver comprehensive solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="heading-3 mb-4">Cloud Providers</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Microsoft Azure</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Amazon Web Services</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Google Cloud</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="heading-3 mb-4">AI Platforms</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">OpenAI</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Anthropic</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Databricks</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="heading-3 mb-4">Integration Partners</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Snowflake</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Salesforce</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-600">ServiceNow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Ready to Work Together?</h2>
            <p className="body-large text-gray-600 mb-8">
              Let's discuss how our boutique approach can accelerate your AI transformation while maintaining the highest standards of responsibility and governance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary">
                Start the Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/case-studies" className="btn-secondary">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;