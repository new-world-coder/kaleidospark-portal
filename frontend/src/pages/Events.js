import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Video, ArrowRight, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { events } from '../mockData';
import { registerForEvent } from '../services/api';

const Events = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [registrationModal, setRegistrationModal] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const eventTypes = ['all', 'Webinar', 'Workshop', 'Conference'];
  
  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  const handleRegistration = (event) => {
    setRegistrationModal(event);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (!registrationModal) return;

    setIsRegistering(true);
    try {
      const result = await registerForEvent(registrationModal.id.toString(), registrationForm);
      if (result.success) {
        toast.success(result.message);
        setRegistrationForm({ name: '', email: '', company: '' });
        setRegistrationModal(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register for event. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const closeModal = () => {
    setRegistrationModal(null);
    setRegistrationForm({ name: '', email: '', company: '' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'Webinar':
        return <Video className="w-5 h-5" />;
      case 'Workshop':
        return <Users className="w-5 h-5" />;
      case 'Conference':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  // Mock upcoming events for demonstration
  const upcomingEvents = [
    ...events,
    {
      id: 3,
      title: 'AI Governance Summit 2025',
      date: '2025-03-15',
      time: '9:00 AM EST',
      type: 'Conference',
      description: 'Two-day conference on AI governance, compliance, and responsible AI implementation.',
      registrationUrl: '#'
    },
    {
      id: 4,
      title: 'Manufacturing AI Workshop',
      date: '2025-03-22',
      time: '1:00 PM EST',
      type: 'Workshop',
      description: 'Hands-on workshop for manufacturing leaders on predictive maintenance and quality control.',
      registrationUrl: '#'
    }
  ];

  const pastEvents = [
    {
      id: 101,
      title: 'Getting Started with AI Strategy',
      date: '2024-12-15',
      type: 'Webinar',
      attendees: 247,
      recording: '#'
    },
    {
      id: 102,
      title: 'GDPR and AI Compliance',
      date: '2024-11-28',
      type: 'Workshop',
      attendees: 89,
      recording: '#'
    },
    {
      id: 103,
      title: 'Healthcare AI Innovation',
      date: '2024-11-10',
      type: 'Webinar',
      attendees: 156,
      recording: '#'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section subtle">
        <div className="hero-content">
          <h1 className="heading-hero hero-title">
            Learn, Connect, Transform
          </h1>
          
          <p className="body-large hero-subtitle">
            Join our events to stay at the forefront of responsible AI and connect with fellow AI leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary">
              Request Private Session
            </Link>
            <Link to="/resources" className="btn-secondary">
              View Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`btn-tag ${selectedType === type ? 'active' : ''}`}
              >
                {type === 'all' ? 'All Events' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Upcoming Events</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Reserve your spot at our upcoming sessions and workshops.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingEvents
              .filter(event => selectedType === 'all' || event.type === selectedType)
              .map((event) => (
                <div key={event.id} className="voice-card accent-green hover-lift">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-6 lg:mb-0 lg:mr-8">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-2 text-green-600">
                          {getEventIcon(event.type)}
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                            {event.type}
                          </span>
                        </div>
                      </div>

                      <h3 className="voice-card-title mb-3">{event.title}</h3>
                      <p className="voice-card-description mb-4">{event.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
                      <button
                        onClick={() => handleRegistration(event)}
                        className="btn-primary"
                      >
                        Register Now
                      </button>
                      <Link to="/contact" className="btn-secondary">
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {upcomingEvents.filter(event => selectedType === 'all' || event.type === selectedType).length === 0 && (
            <div className="text-center py-12">
              <p className="body-medium text-gray-600 mb-6">
                No upcoming events of this type.
              </p>
              <button
                onClick={() => setSelectedType('all')}
                className="btn-secondary"
              >
                View All Events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past Events / Recordings */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Past Events</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Catch up on sessions you missed with our event recordings.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="voice-card accent-grey hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                  </div>

                  <h3 className="voice-card-title mb-4">{event.title}</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  <button
                    onClick={() => console.log(`Playing recording: ${event.title}`)}
                    className="btn-secondary w-full"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Watch Recording
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Info */}
      <section className="py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Event Formats</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We offer different formats to match your learning preferences and schedule.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Webinars</h3>
                <p className="body-medium text-gray-700 mb-4">
                  45-60 minute online presentations on specific AI topics, with Q&A sessions.
                </p>
                <div className="text-sm text-gray-600">
                  • Interactive Q&A<br />
                  • Expert insights<br />
                  • Recording provided
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Workshops</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Half-day hands-on sessions with practical exercises and small group discussions.
                </p>
                <div className="text-sm text-gray-600">
                  • Hands-on exercises<br />
                  • Small groups<br />
                  • Take-home materials
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="heading-3 mb-3">Conferences</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Multi-day events with keynotes, panels, and networking opportunities.
                </p>
                <div className="text-sm text-gray-600">
                  • Multiple sessions<br />
                  • Networking<br />
                  • Industry leaders
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Private Events & Training</h2>
            <p className="body-large text-gray-600 mb-8">
              Need customized training for your team? We offer private workshops and consulting sessions tailored to your specific needs and industry.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-left">
                <h3 className="heading-3 mb-3">Team Workshops</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Customized workshops for your leadership team or technical staff.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tailored to your industry</li>
                  <li>• Your own use cases</li>
                  <li>• Flexible scheduling</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-left">
                <h3 className="heading-3 mb-3">Executive Briefings</h3>
                <p className="body-medium text-gray-700 mb-4">
                  Strategic AI briefings for C-level executives and board members.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Strategic focus</li>
                  <li>• Risk assessment</li>
                  <li>• Investment guidance</li>
                </ul>
              </div>
            </div>
            
            <Link to="/contact" className="btn-primary">
              Request Private Session
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;