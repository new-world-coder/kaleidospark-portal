import React, { useState, useEffect, memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

// Move testimonials data outside component to prevent recreation
const testimonials = [
  {
    id: 1,
    quote: "KaleidoSpark was the first firm that delivered AI with both speed and governance. Their approach transformed our supply chain.",
    author: "Sarah Johnson",
    role: "VP of Operations",
    company: "Global Retail Chain",
    industry: "Retail",
    result: "$8M in recovered sales",
    rating: 5
  },
  {
    id: 2,
    quote: "The governance framework they built gave us confidence to scale AI across sensitive healthcare data.",
    author: "Dr. Michael Chen",
    role: "Chief Technology Officer",
    company: "Healthcare Network",
    industry: "Healthcare",
    result: "15% error reduction",
    rating: 5
  },
  {
    id: 3,
    quote: "Their predictive maintenance solution paid for itself in the first year while improving our operations.",
    author: "Maria Rodriguez",
    role: "Plant Manager",
    company: "Manufacturing Company",
    industry: "Manufacturing",
    result: "$1.2M cost savings",
    rating: 5
  },
  {
    id: 4,
    quote: "KaleidoSpark's boutique approach gave us the personal attention we needed while delivering enterprise-grade results.",
    author: "David Kim",
    role: "Chief Data Officer",
    company: "Fintech Startup",
    industry: "Fintech",
    result: "45% fraud reduction",
    rating: 5
  },
  {
    id: 5,
    quote: "They didn't just implement AI - they transformed how we think about technology and business processes.",
    author: "Jennifer Walsh",
    role: "Head of Digital Innovation",
    company: "Real Estate Firm",
    industry: "Real Estate",
    result: "22% valuation accuracy",
    rating: 5
  }
];

const TestimonialsSlider = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className="relative bg-white rounded-2xl p-8 shadow-sm"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 left-6">
        <Quote className="w-8 h-8 text-blue-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
          "{currentTestimonial.quote}"
        </blockquote>

        {/* Author Info */}
        <div className="mb-4">
          <div className="font-semibold text-gray-900">{currentTestimonial.author}</div>
          <div className="text-gray-600">{currentTestimonial.role}</div>
          <div className="text-gray-500">{currentTestimonial.company}</div>
        </div>

        {/* Industry & Result */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentTestimonial.industry}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentTestimonial.result}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prevSlide}
          className="btn-nav"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="btn-nav"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Auto-play indicator */}
      <div className="absolute bottom-2 right-2">
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>
    </div>
  );
});

export default TestimonialsSlider;