import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { deferThirdPartyLoad } from "@/lib/utils";
import { BookingProvider } from "@/context/BookingContext";
import { ThemeProvider } from "next-themes";

// Import ChatDialog normally to avoid type issues with lazy loading
import { ChatDialog } from "@/components/ChatDialog";

// Lazy load components with prefetch and chunk naming
const Index = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Index"));
const Packages = lazy(() => import(/* webpackChunkName: "packages" */ "./pages/Packages"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "./pages/Blog"));
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/About"));
const Offers = lazy(() => import(/* webpackChunkName: "offers" */ "./pages/Offers"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));
const BlogPost = lazy(() => import(/* webpackChunkName: "blog-post" */ './pages/BlogPost'));
const PackageDetails = lazy(() => import(/* webpackChunkName: "package-details" */ "./pages/PackageDetails"));

// Enhanced loading fallback with progress
const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      <Skeleton className="h-[200px] w-full mb-8 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Configure React Query for optimal data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data is fresh for 1 minute
      gcTime: 5 * 60 * 1000, // Cache is kept for 5 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch on window focus for better performance
    },
  },
});

// PWA registration with error handling and offline support
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show notification to user
              console.log('New content is available; please refresh.');
            }
          });
        }
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  }
};

const App = () => {
  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Defer loading of non-critical resources
    deferThirdPartyLoad(() => {
      // Load analytics or other third-party scripts here
      // Example: loadScript('https://www.googletagmanager.com/gtag/js?id=YOUR-ID');
    });
    
    // Preload critical assets
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/images/hero-bg.jpg',
        '/images/logo.png'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };
    
    preloadCriticalImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {[
                  { path: "/", element: <Index /> },
                  { path: "/packages", element: <Packages /> },
                  { path: "/packages/:id", element: <PackageDetails /> },
                  { path: "/blog", element: <Blog /> },
                  { path: "/blog/:slug", element: <BlogPost /> },
                  { path: "/contact", element: <Contact /> },
                  { path: "/about", element: <About /> },
                  { path: "/offers", element: <Offers /> },
                  { path: "*", element: <NotFound /> }
                ].map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        {element}
                      </Suspense>
                    }
                  />
                ))}
              </Routes>
              <ChatDialog />
            </BrowserRouter>
          </TooltipProvider>
        </BookingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
