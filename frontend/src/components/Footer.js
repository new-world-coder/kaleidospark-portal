import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { subscribeNewsletter } from '../mockData';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const result = await subscribeNewsletter(email);
      if (result.success) {
        toast.success(result.message);
        setEmail('');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = {
    Services: [
      { name: 'AI Strategy & Readiness', href: '/services/1' },
      { name: 'Process Transformation', href: '/services/2' },
      { name: 'GenAI & Copilots', href: '/services/3' },
      { name: 'Data & MLOps', href: '/services/4' },
      { name: 'Training & Change', href: '/services/5' }
    ],
    Industries: [
      { name: 'Retail', href: '/industries/1' },
      { name: 'Manufacturing', href: '/industries/2' },
      { name: 'Healthcare', href: '/industries/3' },
      { name: 'Real Estate', href: '/industries/4' },
      { name: 'Fintech', href: '/industries/5' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Responsible AI', href: '/responsible-ai' }
    ],
    Resources: [
      { name: 'Downloads', href: '/resources' },
      { name: 'Events', href: '/events' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-md mx-auto text-center">
            <h3 className="heading-2 mb-4">Stay Informed</h3>
            <p className="body-medium text-gray-600 mb-6">
              Get insights on AI strategy and responsible implementation.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="btn-primary shrink-0"
              >
                {isSubscribing ? 'Subscribing...' : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="text-xl font-bold text-gray-900 mb-4">
                  KaleidoSpark
                </div>
                <p className="body-medium text-gray-600 mb-6">
                  Boutique AI consultancy helping enterprises unlock efficiency and growth through responsible AI and intelligent transformation.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="body-small">hello@kaleidospark.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="body-small">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="body-small">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="heading-3 mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="body-small text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <Link to="/privacy" className="caption hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link to="/terms" className="caption hover:text-gray-900">
                Terms of Service
              </Link>
              <Link to="/cookies" className="caption hover:text-gray-900">
                Cookie Policy
              </Link>
            </div>
            <div className="caption">
              © 2025 KaleidoSpark. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;