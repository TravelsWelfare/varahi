import { Helmet } from "react-helmet";
import { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { WorldMap } from "@/components/ui/world-map";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe as GlobeIcon } from "lucide-react";
import { Globe } from "@/components/ui/globe";

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
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGlobeImageLoaded, setIsGlobeImageLoaded] = useState(false);

  // Preload the globe image
  useEffect(() => {
    const img = new Image();
    img.src = "/earth-blue-marble.jpg";
    img.onload = () => {
      setIsGlobeImageLoaded(true);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Lazy load the globe when it's about to be visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGlobeVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const globeSection = document.getElementById('globe-section');
    if (globeSection) {
      observer.observe(globeSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Simple globe configuration
  const globeConfig = {
    width: isMobile ? 300 : 500,
    height: isMobile ? 300 : 500,
    globeImageUrl: "/earth-blue-marble.jpg",
    backgroundColor: "rgba(255,255,255,0.8)",
    atmosphereColor: "#3a93e0",
    atmosphereAltitude: 0.25,
    enableZoom: true,
    enableRotate: true,
    devicePixelRatio: 1,
    mapSamples: 4000,
    diffuse: 1.2,
    dark: 0.3,
    baseColor: [0.3, 0.3, 1] as [number, number, number],
    markerColor: [251/255, 100/255, 21/255] as [number, number, number],
    glowColor: [1, 1, 1] as [number, number, number],
    markers: [
      { location: [30.7346, 79.0669] as [number, number], size: 0.5 }, // Kedarnath
      { location: [30.7433, 79.4938] as [number, number], size: 0.5 }, // Badrinath
      { location: [25.3176, 83.0062] as [number, number], size: 0.6 }, // Varanasi
      { location: [31.7683, 35.2137] as [number, number], size: 0.6 }, // Jerusalem
      { location: [41.9022, 12.4539] as [number, number], size: 0.5 }, // Vatican City
      { location: [24.6961, 84.9911] as [number, number], size: 0.5 }, // Bodh Gaya
    ],
    autoRotate: true,
    autoRotateSpeed: 0.5,
    onRender: () => {},
    phi: 0,
    theta: 0.3,
    mapBrightness: 1.2
  };

  return (
    <div className="min-h-screen w-full p-0 m-0">
      <Helmet>
        <title>Varahi journey - Your Trusted Char Dham Yatra Partner</title>
        <meta 
          name="description" 
          content="Experience a spiritual journey with our expertly crafted Char Dham Yatra packages. Professional guides, comfortable accommodation, and seamless travel arrangements." 
        />
        <link rel="preload" href="/earth-blue-marble.jpg" as="image" />
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
         
        {/* <Suspense fallback={<SectionLoader />}>
          <Globe />
        </Suspense>  */}
{/*         
        <section id="globe-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GlobeIcon className="h-4 w-4" />
                <span>Global Sacred Sites</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
                Explore Sacred Sites Worldwide
              </h2>
              <p className="text-himalaya-600 mb-4 max-w-2xl mx-auto">
                Our spiritual journeys extend beyond Char Dham. Discover sacred destinations around the world and connect with diverse spiritual traditions.
              </p>
            </div>
            
            <div className="flex justify-center">
              {!isGlobeVisible || !isGlobeImageLoaded ? (
                <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex flex-col items-center justify-center bg-gray-50 rounded-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
                  <p className="text-himalaya-600 font-medium">Loading interactive globe...</p>
                </div>
              ) : (
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full bg-blue-50">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-blue-100/30 z-0"></div>
                  <div className="relative w-full h-full z-10">
                    <Globe config={globeConfig} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.location.href = '/contact'}
              >
                Inquire About Global Tours <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section> */}
       
  
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
