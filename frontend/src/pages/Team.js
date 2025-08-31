import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail, Award, GraduationCap, Briefcase } from 'lucide-react';
import { teamMembers } from '../mockData';

const Team = () => {
  const values = [
    'Growth mindset',
    'Continuous learning',
    'Diversity & inclusion',
    'Work-life balance',
    'Client impact',
    'Ethical AI'
  ];

  const openRoles = [
    {
      title: 'Senior AI Strategy Consultant',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Lead enterprise AI transformations with Fortune 500 clients'
    },
    {
      title: 'ML Engineering Lead',
      location: 'Remote / New York',
      type: 'Full-time',
      description: 'Build and deploy production ML systems at enterprise scale'
    },
    {
      title: 'Data Governance Specialist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design compliance frameworks for regulated industries'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Meet the Team Behind the Transformation
          </h1>
          
          <p className="body-large hero-subtitle">
            We're a diverse group of AI strategists, engineers, and domain experts united by a passion for responsible AI that drives real business outcomes.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Leadership Team</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Experienced leaders who've guided AI transformations at the world's largest enterprises.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="voice-card accent-grey hover-lift">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="voice-card-title">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                  </div>

                  <p className="voice-card-description mb-6">{member.bio}</p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="heading-3 mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <a
                      href={member.linkedin}
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:hello@kaleidospark.com"
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Our Culture</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We believe great work happens when people are supported, challenged, and empowered to make an impact.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="heading-3 mb-3">Learning & Growth</h3>
                <p className="body-medium text-gray-700">
                  Annual learning budget, conference attendance, and dedicated time for skill development.
                </p>
              </div>
              
              <div className="text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="heading-3 mb-3">Impact & Recognition</h3>
                <p className="body-medium text-gray-700">
                  Work on meaningful projects that transform enterprises and get recognized for your contributions.
                </p>
              </div>
              
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="heading-3 mb-3">Flexibility & Balance</h3>
                <p className="body-medium text-gray-700">
                  Remote-first culture with flexible hours and a focus on outcomes, not hours worked.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-xl p-8">
              <h3 className="heading-2 text-center mb-6">What We Value</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Join Our Team</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We're growing our team of AI experts and looking for people who share our passion for responsible, impactful AI.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 mb-12">
              {openRoles.map((role, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="heading-3 mb-2">{role.title}</h3>
                      <p className="body-medium text-gray-700 mb-2">{role.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{role.location}</span>
                        <span>•</span>
                        <span>{role.type}</span>
                      </div>
                    </div>
                    <Link to="/contact" className="btn-secondary shrink-0">
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Don't see a fit? */}
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <h3 className="heading-2 mb-4">Don't See a Perfect Fit?</h3>
              <p className="body-medium text-gray-700 mb-6">
                We're always interested in connecting with talented individuals who are passionate about responsible AI. Send us your resume and tell us what excites you about our mission.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Diversity & Inclusion</h2>
            <p className="body-large text-gray-600 mb-8">
              We believe diverse teams build better AI. We're committed to creating an inclusive environment where everyone can do their best work and contribute to shaping the future of responsible AI.
            </p>
            
            <div className="bg-white rounded-xl p-8">
              <p className="body-medium text-gray-700">
                "At KaleidoSpark, we know that AI systems reflect the teams that build them. That's why we prioritize diversity not just as a moral imperative, but as a business necessity for creating AI that serves everyone."
              </p>
              <cite className="text-sm text-gray-600 font-medium mt-4 block">
                — Sarah Chen, Founder & CEO
              </cite>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;