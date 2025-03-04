
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
        style={{
          backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/45/360/53/lord-shiva-hindu-gods-hinduism-india-hd-wallpaper-preview.jpg",
          filter: "brightness(0.3)"
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-lg font-medium text-primary mb-3">
            Begin Your Sacred Journey Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Experience the Divine Char Dham Yatra with Comfort & Peace
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Connect with us for a customized itinerary tailored to your preferences, budget, and schedule. Our travel experts are ready to craft the perfect spiritual journey for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg group"
            >
              Plan Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-black hover:bg-white/20 hover:border-primary transition-all duration-300 text-lg group"
            >
              Contact Us
              <svg 
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
              </svg>
            </Button>
          </div>
          
          <p className="mt-8 text-white/80 text-sm">
            No obligation. Get a free quote and start planning your divine journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
