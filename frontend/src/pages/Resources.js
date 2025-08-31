import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, BookOpen, Video, ArrowRight, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { resources } from '../mockData';
import { subscribeNewsletter } from '../services/api';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const categories = ['all', 'Strategy', 'Implementation', 'Procurement'];
  
  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const handleDownload = (resource) => {
    // Mock download functionality
    console.log(`Downloading: ${resource.title}`);
    // In a real app, this would trigger the actual download
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    try {
      const result = await subscribeNewsletter(newsletterEmail);
      if (result.success) {
        toast.success(result.message);
        setNewsletterEmail('');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'PDF Guide':
      case 'PDF Playbook':
        return <FileText className="w-6 h-6" />;
      case 'Word Document':
        return <BookOpen className="w-6 h-6" />;
      case 'Video':
        return <Video className="w-6 h-6" />;
      default:
        return <Download className="w-6 h-6" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Free Resources for AI Leaders
          </h1>
          
          <p className="body-large hero-subtitle">
            Comprehensive guides, toolkits, and templates to accelerate your AI transformation journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Get Personalized Recommendations
            </Link>
            <Link to="/events" className="btn-secondary">
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn-tag ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Resources' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Featured Downloads</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Our most popular resources for enterprise AI implementation.
            </p>
          </div>

          <div className="voice-grid max-w-5xl mx-auto">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="voice-card accent-blue hover-lift">
                <div className="flex items-center mb-4">
                  {getResourceIcon(resource.type)}
                  <div className="ml-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <h3 className="voice-card-title mb-4">{resource.title}</h3>
                <p className="voice-card-description mb-6">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{resource.category}</span>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="btn-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="body-medium text-gray-600 mb-6">
                No resources found in the selected category.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-secondary"
              >
                View All Resources
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="heading-1 text-center mb-12">More Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Webinars & Events */}
              <div className="bg-gray-50 rounded-xl p-6">
                <Video className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="heading-3 mb-3">Webinars & Events</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Join our live sessions and learn from AI experts about the latest trends and best practices.
                </p>
                <Link to="/events" className="flex items-center text-purple-600 font-medium hover:text-purple-700">
                  View Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Case Studies */}
              <div className="bg-gray-50 rounded-xl p-6">
                <BookOpen className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="heading-3 mb-3">Case Studies</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Real-world examples of successful AI implementations across different industries.
                </p>
                <Link to="/case-studies" className="flex items-center text-green-600 font-medium hover:text-green-700">
                  Read Stories
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Consultation */}
              <div className="bg-gray-50 rounded-xl p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="heading-3 mb-3">Free Consultation</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Get personalized advice on your AI strategy and implementation approach.
                </p>
                <Link to="/contact" className="flex items-center text-blue-600 font-medium hover:text-blue-700">
                  Book Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-4">Stay Updated</h2>
            <p className="body-large text-gray-600 mb-8">
              Get the latest AI insights, resources, and event notifications delivered to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="btn-primary shrink-0"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              <p className="text-xs text-gray-600 mt-3">
                No spam. Unsubscribe anytime. Read our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Need Something Specific?</h2>
            <p className="body-large text-gray-600 mb-8">
              Can't find what you're looking for? We're happy to create custom resources tailored to your specific needs and industry.
            </p>
            
            <Link to="/contact" className="btn-primary">
              Request Custom Resource
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;