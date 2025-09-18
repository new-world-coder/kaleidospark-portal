// Image optimization utilities
import { useState, useEffect } from 'react';

// Lazy loading hook
export const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setIsError(true);
    };
    
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded, isError };
};

// Image preloader
export const preloadImages = (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });
  
  return Promise.all(promises);
};

// Responsive image utility
export const getResponsiveImageSrc = (baseSrc, sizes = [320, 640, 1024, 1280]) => {
  return sizes.map(size => `${baseSrc}?w=${size}`).join(', ');
};

// WebP support detection
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Optimized image component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  loading = 'lazy',
  ...props 
}) => {
  const { imageSrc, isLoaded, isError } = useLazyImage(src, placeholder);

  if (isError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={loading}
      {...props}
    />
  );
};