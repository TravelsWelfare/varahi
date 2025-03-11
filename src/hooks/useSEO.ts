import { useMemo } from 'react';

interface TouristPackage {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  features: string[];
  image: string;
}

interface BlogPost {
  title: string;
  description: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  slug: string;
}

interface UseSEOProps {
  baseUrl?: string;
  siteName?: string;
  defaultImage?: string;
}

/**
 * Custom hook for generating SEO data including structured data
 */
export const useSEO = ({
  baseUrl = 'https://varahijourney.com',
  siteName = 'Varahi Journey',
  defaultImage = '/images/og-image.jpg'
}: UseSEOProps = {}) => {
  
  /**
   * Generate structured data for a tourist package
   */
  const generatePackageStructuredData = (pkg: TouristPackage) => {
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": pkg.title,
      "description": pkg.description,
      "touristType": ["Pilgrimage", "Religious tourism"],
      "offers": {
        "@type": "Offer",
        "price": pkg.price.replace('₹', '').replace(',', ''),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
      },
      "location": {
        "@type": "Place",
        "name": pkg.location,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": pkg.features.map((feature, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": feature
        }))
      },
      "image": pkg.image.startsWith('http') ? pkg.image : `${baseUrl}${pkg.image}`
    };
  };
  
  /**
   * Generate structured data for a list of packages
   */
  const generatePackageListStructuredData = (packages: TouristPackage[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": packages.map((pkg, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "name": pkg.title,
          "description": pkg.description,
          "touristType": ["Pilgrimage", "Religious tourism"],
          "offers": {
            "@type": "Offer",
            "price": pkg.price.replace('₹', '').replace(',', ''),
            "priceCurrency": "INR"
          },
          "image": pkg.image.startsWith('http') ? pkg.image : `${baseUrl}${pkg.image}`
        }
      }))
    };
  };
  
  /**
   * Generate structured data for a blog post
   */
  const generateBlogPostStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": post.datePublished,
      "dateModified": post.dateModified || post.datePublished,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`
      }
    };
  };
  
  /**
   * Generate structured data for a list of blog posts
   */
  const generateBlogListStructuredData = (posts: BlogPost[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "datePublished": post.datePublished,
          "url": `${baseUrl}/blog/${post.slug}`
        }
      }))
    };
  };
  
  /**
   * Generate structured data for the organization
   */
  const generateOrganizationStructuredData = (
    name = siteName,
    logo = `${baseUrl}/logo.png`,
    url = baseUrl,
    contactPoint = {
      telephone: "+91-1234567890",
      contactType: "customer service"
    }
  ) => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": name,
      "url": url,
      "logo": logo,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": contactPoint.telephone,
        "contactType": contactPoint.contactType
      },
      "sameAs": [
        "https://www.facebook.com/varahijourney",
        "https://www.instagram.com/varahijourney",
        "https://twitter.com/varahijourney"
      ]
    };
  };
  
  /**
   * Generate structured data for a FAQ page
   */
  const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };
  
  /**
   * Generate breadcrumb structured data
   */
  const generateBreadcrumbStructuredData = (
    items: Array<{ name: string; url: string }>
  ) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
      }))
    };
  };
  
  return {
    generatePackageStructuredData,
    generatePackageListStructuredData,
    generateBlogPostStructuredData,
    generateBlogListStructuredData,
    generateOrganizationStructuredData,
    generateFAQStructuredData,
    generateBreadcrumbStructuredData,
    baseUrl,
    siteName,
    defaultImage
  };
};

export default useSEO; 