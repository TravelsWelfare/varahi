import { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "./ui/optimized-image";

const HeroSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Char Dham Yatra"
          priority
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundAttachment: "fixed",
          }}
        />
        
        {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-block bg-primary/90 backdrop-blur-sm rounded-lg px-4 py-1 mb-6">
            <p className="text-primary-foreground font-medium">Char Dham Yatra Specialists</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white text-shadow-lg leading-tight mb-6">
            Embark on a Sacred Journey – Experience the Divine, Comfortably & Hassle-Free!
          </h1>
          
          <p className="text-xl text-white text-shadow mb-8 max-w-2xl">
            Join thousands of travelers who trust Varahi journey for their Char Dham Yatra. Safe, comfortable, and personalized travel just for you!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Book Your Yatra Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-lg"
              onClick={() => window.location.href = '/itinerary'}
            >
              View Sample Packages
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 text-white">
            <TrustBadge icon={<Star className="text-primary" />} text="4.9/5 Customer Ratings" />
            <TrustBadge icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>} text="Safe Transportation" />
            <TrustBadge icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H6V1.5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 12 .326zM12 4.5h-4V6h4V4.5zm0 3h-4V9h4V7.5zm0 3h-4v1.5h4V10.5z"/></svg>} text="Comfortable Hotels" />
            <TrustBadge icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z"/></svg>} text="Hygienic Meals" />
            <TrustBadge icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>} text="24/7 Assistance" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex flex-col items-center text-center backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10">
    <div className="mb-2">{icon}</div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default HeroSection;
