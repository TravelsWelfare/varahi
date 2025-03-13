import { Helmet } from "react-helmet";
import { memo } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, any>;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  prefetchResources?: string[];
}

const SEO = memo(({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/og-image.jpg',
  twitterCard = 'summary_large_image',
  structuredData,
  keywords = [],
  author = 'Varahi Journey',
  publishedTime,
  modifiedTime,
  prefetchResources = [],
}: SEOProps) => {
  // Base URL for absolute URLs
  const baseUrl = 'https://varahijourney.com';
  
  // Ensure ogImage is an absolute URL
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Ensure canonical URL is absolute
  const canonicalUrlFull = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${baseUrl}${canonicalUrl}`) : undefined;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      {canonicalUrlFull && <link rel="canonical" href={canonicalUrlFull} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrlFull && <meta property="og:url" content={canonicalUrlFull} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Varahi Journey" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#4f46e5" />
      
      {/* Resource Hints - Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://unpkg.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      {/* DNS Prefetching for faster subsequent page loads */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      
      {/* Prefetch resources for likely navigation */}
      {prefetchResources.map((resource, index) => (
        <link key={`prefetch-${index}`} rel="prefetch" href={resource} />
      ))}
      
      {/* Preload critical assets */}
      <link rel="preload" href="/earth-blue-marble.jpg" as="image" />
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
});

SEO.displayName = 'SEO';

export default SEO; 