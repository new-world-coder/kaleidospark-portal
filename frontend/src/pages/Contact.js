import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Download, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContactForm, bookDiscoveryCall } from '../services/api';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    interest: 'general'
  });
  
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'EST'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(contactForm);
      if (result.success) {
        toast.success(result.message);
        setContactForm({
          name: '',
          email: '',
          company: '',
          role: '',
          message: '',
          interest: 'general'
        });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await bookDiscoveryCall(bookingForm);
      if (result.success) {
        toast.success(result.message);
        setBookingForm({
          name: '',
          email: '',
          company: '',
          preferredDate: '',
          preferredTime: '',
          timezone: 'EST'
        });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section solid">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Let's Start the Conversation
          </h1>
          
          <p className="body-large hero-subtitle">
            Ready to unlock your enterprise's AI potential? Get in touch to discuss your specific needs and challenges.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="heading-1 mb-6">Get in Touch</h2>
                <p className="body-medium text-gray-600 mb-8">
                  Whether you're just starting your AI journey or looking to scale existing initiatives, we're here to help you navigate the complexities and unlock real business value.
                </p>

                {/* Contact Details */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-gray-500" />
                    <div>
                      <div className="heading-3">Email</div>
                      <div className="body-medium text-gray-600">hello@kaleidospark.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-gray-500" />
                    <div>
                      <div className="heading-3">Phone</div>
                      <div className="body-medium text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-gray-500" />
                    <div>
                      <div className="heading-3">Location</div>
                      <div className="body-medium text-gray-600">San Francisco, CA</div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="heading-3 text-green-900 mb-2">Quick Response</h3>
                  <p className="body-small text-green-800">
                    We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>

              {/* Forms */}
              <div>
                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'contact'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'booking'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Call</span>
                  </button>
                </div>

                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          required
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Your company"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          value={contactForm.role}
                          onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Your role"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                        Area of Interest
                      </label>
                      <select
                        id="interest"
                        value={contactForm.interest}
                        onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="ai-strategy">AI Strategy & Readiness</option>
                        <option value="automation">Process Transformation</option>
                        <option value="genai">GenAI & Copilots</option>
                        <option value="data">Data & MLOps</option>
                        <option value="training">Training & Change Management</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Tell us about your AI challenges and goals..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                    </button>
                  </form>
                )}

                {/* Discovery Call Booking Form */}
                {activeTab === 'booking' && (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="booking-name"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="booking-email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="booking-company"
                        required
                        value={bookingForm.company}
                        onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Your company"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferred-date" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferred-date"
                          required
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          id="preferred-time"
                          required
                          value={bookingForm.preferredTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        value={bookingForm.timezone}
                        onChange={(e) => setBookingForm({ ...bookingForm, timezone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="MST">Mountain Time (MST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                        <option value="CET">Central European Time (CET)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? 'Booking...' : 'Book Discovery Call'}
                      {!isSubmitting && <Calendar className="w-4 h-4 ml-2" />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Download Our Free Resources</h2>
            <p className="body-large text-gray-600 mb-8">
              Get started with our comprehensive guides and toolkits while you wait for our response.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Download className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                <h3 className="heading-3 mb-2">AI Readiness Toolkit</h3>
                <p className="body-small text-gray-600 mb-4">Assessment framework and implementation roadmap</p>
                <button className="btn-secondary w-full">Download PDF</button>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Download className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                <h3 className="heading-3 mb-2">RFP Template</h3>
                <p className="body-small text-gray-600 mb-4">Template for evaluating AI vendors and solutions</p>
                <button className="btn-secondary w-full">Download Word</button>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <Download className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                <h3 className="heading-3 mb-2">Prompt Playbook</h3>
                <p className="body-small text-gray-600 mb-4">Best practices for effective prompt engineering</p>
                <button className="btn-secondary w-full">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;