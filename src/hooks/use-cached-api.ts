import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface FetchConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  priority?: 'high' | 'low' | 'auto';
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'max-age=3600'
};

export function useCachedApi<T>(
  key: string[],
  config: FetchConfig,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const response = await fetch(config.url, {
          method: config.method || 'GET',
          headers: {
            ...defaultHeaders,
            ...config.headers,
          },
          body: config.body ? JSON.stringify(config.body) : undefined,
          signal: controller.signal,
          cache: config.cache || 'force-cache',
          priority: config.priority || 'auto',
          credentials: 'same-origin'
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Cache successful responses in localStorage for offline access
        const data = await response.json();
        if (config.method === 'GET') {
          try {
            localStorage.setItem(`cache_${key.join('_')}`, JSON.stringify({
              data,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn('Cache storage failed:', e);
          }
        }

        return data;
      } catch (error) {
        // On network error, try to load from cache
        if (config.method === 'GET') {
          const cached = localStorage.getItem(`cache_${key.join('_')}`);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            // Return cached data if it's less than 24 hours old
            if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
              return data;
            }
          }
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache kept for 30 minutes
    retry: (failureCount, error) => {
      // Only retry on network errors, not 4xx/5xx responses
      return failureCount < 3 && error.message.includes('Network');
    },
    ...options,
  });
}