import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, FileText, Users, Calendar, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, industries, caseStudies, resources, events, teamMembers } from '../mockData';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchTimeout = setTimeout(() => {
      performSearch(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const performSearch = (searchQuery) => {
    const searchTerm = searchQuery.toLowerCase();
    const searchResults = [];

    // Search services
    services.forEach(service => {
      if (
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.outcomes.some(outcome => outcome.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          type: 'service',
          id: service.id,
          title: service.title,
          description: service.description,
          url: `/services/${service.id}`,
          icon: 'service'
        });
      }
    });

    // Search industries
    industries.forEach(industry => {
      if (
        industry.name.toLowerCase().includes(searchTerm) ||
        industry.description.toLowerCase().includes(searchTerm) ||
        industry.challenges.some(challenge => challenge.toLowerCase().includes(searchTerm)) ||
        industry.solutions.some(solution => solution.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          type: 'industry',
          id: industry.id,
          title: industry.name,
          description: industry.description,
          url: `/industries/${industry.id}`,
          icon: 'industry'
        });
      }
    });

    // Search case studies
    caseStudies.forEach(caseStudy => {
      if (
        caseStudy.title.toLowerCase().includes(searchTerm) ||
        caseStudy.industry.toLowerCase().includes(searchTerm) ||
        caseStudy.challenge.toLowerCase().includes(searchTerm) ||
        caseStudy.approach.toLowerCase().includes(searchTerm) ||
        caseStudy.outcome.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: 'case-study',
          id: caseStudy.id,
          title: caseStudy.title,
          description: `${caseStudy.industry} - ${caseStudy.challenge.substring(0, 100)}...`,
          url: '/case-studies',
          icon: 'case-study'
        });
      }
    });

    // Search resources
    resources.forEach(resource => {
      if (
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.category.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: 'resource',
          id: resource.id,
          title: resource.title,
          description: resource.description,
          url: '/resources',
          icon: 'resource'
        });
      }
    });

    // Search events
    events.forEach(event => {
      if (
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.type.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: 'event',
          id: event.id,
          title: event.title,
          description: event.description,
          url: '/events',
          icon: 'event'
        });
      }
    });

    // Search team members
    teamMembers.forEach(member => {
      if (
        member.name.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.bio.toLowerCase().includes(searchTerm) ||
        member.expertise.some(skill => skill.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          type: 'team',
          id: member.id,
          title: member.name,
          description: `${member.role} - ${member.bio.substring(0, 100)}...`,
          url: '/team',
          icon: 'team'
        });
      }
    });

    // Static pages search
    const staticPages = [
      { title: 'About Us', description: 'Learn about KaleidoSpark and our mission', url: '/about', keywords: ['about', 'company', 'mission', 'values'] },
      { title: 'Responsible AI', description: 'Our approach to ethical and compliant AI', url: '/responsible-ai', keywords: ['responsible', 'ethical', 'compliance', 'governance'] },
      { title: 'Contact', description: 'Get in touch with our team', url: '/contact', keywords: ['contact', 'get in touch', 'reach out'] }
    ];

    staticPages.forEach(page => {
      if (
        page.title.toLowerCase().includes(searchTerm) ||
        page.description.toLowerCase().includes(searchTerm) ||
        page.keywords.some(keyword => keyword.includes(searchTerm))
      ) {
        searchResults.push({
          type: 'page',
          id: page.url,
          title: page.title,
          description: page.description,
          url: page.url,
          icon: 'page'
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  };

  const getResultIcon = (iconType) => {
    switch (iconType) {
      case 'service':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'industry':
        return <Building className="w-4 h-4 text-green-600" />;
      case 'case-study':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'resource':
        return <FileText className="w-4 h-4 text-orange-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-pink-600" />;
      case 'team':
        return <Users className="w-4 h-4 text-indigo-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getResultTypeLabel = (type) => {
    switch (type) {
      case 'case-study':
        return 'Case Study';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleResultClick = () => {
    onClose();
    setQuery('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services, industries, resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((result, index) => (
                <Link
                  key={index}
                  to={result.url}
                  onClick={handleResultClick}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    {getResultIcon(result.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{result.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {getResultTypeLabel(result.type)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{result.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No results found for "{query}"</p>
              <p className="text-sm text-gray-500 mt-2">Try searching for services, industries, or resources</p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Start typing to search...</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {['AI Strategy', 'Healthcare', 'Automation', 'Case Studies'].map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Footer */}
        {query.trim() && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Press Enter to search • ESC to close</span>
              <Link
                to="/contact"
                onClick={handleResultClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Can't find what you need? Contact us →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;