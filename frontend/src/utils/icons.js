// Optimized icon imports to reduce bundle size
// Only import the icons we actually use

// Service icons
export { Target } from 'lucide-react';
export { Settings } from 'lucide-react';
export { Brain } from 'lucide-react';
export { Database } from 'lucide-react';
export { Users } from 'lucide-react';

// Industry icons
export { ShoppingCart } from 'lucide-react';
export { Factory } from 'lucide-react';
export { Heart } from 'lucide-react';
export { Building } from 'lucide-react';
export { CreditCard } from 'lucide-react';

// UI icons
export { ArrowRight } from 'lucide-react';
export { Star } from 'lucide-react';
export { Shield } from 'lucide-react';
export { Award } from 'lucide-react';
export { Menu } from 'lucide-react';
export { X } from 'lucide-react';
export { ChevronDown } from 'lucide-react';
export { Search } from 'lucide-react';
export { ChevronLeft } from 'lucide-react';
export { ChevronRight } from 'lucide-react';
export { Quote } from 'lucide-react';
export { CheckCircle } from 'lucide-react';
export { AlertTriangle } from 'lucide-react';
export { TrendingUp } from 'lucide-react';
export { Download } from 'lucide-react';

// Icon mapping utilities
export const serviceIcons = {
  target: Target,
  settings: Settings,
  brain: Brain,
  database: Database,
  users: Users
};

export const industryIcons = {
  'shopping-cart': ShoppingCart,
  factory: Factory,
  heart: Heart,
  building: Building,
  'credit-card': CreditCard
};

// Utility functions for icon rendering
export const getServiceIcon = (iconName) => {
  const IconComponent = serviceIcons[iconName] || Target;
  return IconComponent;
};

export const getIndustryIcon = (iconName) => {
  const IconComponent = industryIcons[iconName] || ShoppingCart;
  return IconComponent;
};