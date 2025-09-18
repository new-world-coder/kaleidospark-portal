// Simple in-memory cache for API responses
class APICache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

// Create cache instances for different data types
export const staticDataCache = new APICache(30 * 60 * 1000); // 30 minutes for static data
export const userDataCache = new APICache(5 * 60 * 1000); // 5 minutes for user data
export const analyticsCache = new APICache(10 * 60 * 1000); // 10 minutes for analytics

// Cache key generators
export const generateCacheKey = (prefix, ...params) => {
  return `${prefix}:${params.join(':')}`;
};

// Cache utilities
export const withCache = (cache, keyGenerator) => {
  return async (fn, ...params) => {
    const key = keyGenerator(...params);
    
    // Try to get from cache first
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn(...params);
    cache.set(key, result);
    return result;
  };
};