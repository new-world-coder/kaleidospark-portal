import React, { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import SearchModal from './SearchModal';

// Move navigation data outside component to prevent recreation on every render
const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'AI Strategy & Readiness', href: '/services/1' },
      { name: 'Process Transformation', href: '/services/2' },
      { name: 'GenAI & Copilots', href: '/services/3' },
      { name: 'Data & MLOps', href: '/services/4' },
      { name: 'Training & Change', href: '/services/5' }
    ]
  },
  {
    name: 'Industries',
    href: '/industries',
    dropdown: [
      { name: 'Retail', href: '/industries/1' },
      { name: 'Manufacturing', href: '/industries/2' },
      { name: 'Healthcare', href: '/industries/3' },
      { name: 'Real Estate', href: '/industries/4' },
      { name: 'Fintech', href: '/industries/5' }
    ]
  },
  { name: 'Case Studies', href: '/case-studies' },
  {
    name: 'Company',
    href: '/about',
    dropdown: [
      { name: 'About Us', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Responsible AI', href: '/responsible-ai' }
    ]
  },
  {
    name: 'Resources',
    href: '/resources',
    dropdown: [
      { name: 'Downloads', href: '/resources' },
      { name: 'Events', href: '/events' }
    ]
  }
];

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="header-nav">
      <div className="container">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-xl font-bold text-gray-900">
              KaleidoSpark
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-gray-600 ${
                    isActivePath(item.href) ? 'text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="btn-nav"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link to="/contact" className="btn-secondary">
              Get Started
            </Link>
            <Link to="/contact" className="btn-primary">
              Book Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden btn-nav"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block text-base font-medium py-2 ${
                      isActivePath(item.href) ? 'text-gray-900' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-sm text-gray-600 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/contact"
                  className="btn-secondary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
});

export default Header;