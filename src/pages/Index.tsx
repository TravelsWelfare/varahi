import { Helmet } from "react-helmet";
import { Suspense, lazy } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components
const HeroSection = lazy(() => import("@/components/HeroSection"));
const PackagesSection = lazy(() => import("@/components/PackagesSection"));
const SpecialOffers = lazy(() => import("@/components/SpecialOffers"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));

const SectionLoader = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-[400px] w-full rounded-xl" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Varahi journey - Your Trusted Char Dham Yatra Partner</title>
        <meta 
          name="description" 
          content="Experience a spiritual journey with our expertly crafted Char Dham Yatra packages. Professional guides, comfortable accommodation, and seamless travel arrangements." 
        />
        <meta name="keywords" content="char dham yatra, kedarnath, badrinath, gangotri, yamunotri, pilgrimage packages, spiritual journey" />
        <link rel="canonical" href="https://Varahijourney.com" />
        <meta property="og:title" content="Varahi journey - Char Dham Yatra Specialists" />
        <meta property="og:description" content="Experience a spiritual journey with our expertly crafted Char Dham Yatra packages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Varahijourney.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Varahi journey - Your Trusted Char Dham Yatra Partner" />
        <meta name="twitter:description" content="Experience a spiritual journey with our expertly crafted Char Dham Yatra packages. Professional guides, comfortable accommodation, and seamless travel arrangements." />
        <meta name="twitter:image" content="/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Varahi journey",
            "description": "Expert Char Dham Yatra travel services",
            "url": "https://Varahijourney.com",
            "image": "/og-image.png",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "priceRange": "₹₹₹"
          })}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <PackagesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SpecialOffers />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CtaSection />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
