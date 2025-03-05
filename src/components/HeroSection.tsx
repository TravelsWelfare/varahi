import { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "./ui/optimized-image";
import { motion } from "framer-motion";

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
    <div className="relative h-screen w-full overflow-hidden">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Char Dham Yatra"
          priority
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${offset}px) scale(1.1)`,
            backgroundAttachment: "fixed",
          }}
        />
        
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10 backdrop-blur-[2px]" />
      
        {/* Hero Content with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 h-full flex items-center relative z-20 pt-24 md:pt-0"
        >
          <div className="max-w-3xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 shadow-lg"
            >
              <p className="text-primary-foreground font-medium text-xs md:text-base">Char Dham Yatra Specialists</p>
            </motion.div>
          
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-3 md:mb-6 drop-shadow-2xl"
            >
              Embark on a Sacred Journey – Experience the Divine!
            </motion.h1>
          
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl drop-shadow-lg font-light"
            >
              Join thousands of travelers who trust Varahi journey for their Char Dham Yatra. Safe, comfortable, and personalized travel just for you!
            </motion.p>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm md:text-base transform transition-all hover:scale-105 shadow-xl w-full sm:w-auto"
                onClick={() => window.location.href = '/contact'}
              >
                Book Your Yatra Now
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm md:text-base transform transition-all hover:scale-105 shadow-xl w-full sm:w-auto"
                onClick={() => window.location.href = '/packages'}
              >
                View Sample Packages
                <Star className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          
            {/* Enhanced Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 md:mt-12 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 text-white"
            >
              <TrustBadge icon={<Star className="text-primary h-4 w-4 md:h-6 md:w-6" />} text="4.9/5 Ratings" />
              <TrustBadge icon={<svg className="h-4 w-4 md:h-6 md:w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>} text="Safe Travel" />
              <TrustBadge icon={<svg className="h-4 w-4 md:h-6 md:w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H6V1.5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 12 .326zM12 4.5h-4V6h4V4.5zm0 3h-4V9h4V7.5zm0 3h-4v1.5h4V10.5z"/></svg>} text="Best Hotels" />
              <TrustBadge icon={<svg className="h-4 w-4 md:h-6 md:w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z"/></svg>} text="Clean Food" />
              <TrustBadge icon={<svg className="h-4 w-4 md:h-6 md:w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>} text="24/7 Help" />
            </motion.div>
          </div>
        </motion.div>
    </div>
  );
};

const TrustBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center text-center backdrop-blur-sm bg-white/10 rounded-lg p-2 md:p-3 border border-white/20 shadow-lg transition-all hover:bg-white/15"
  >
    <div className="mb-1 md:mb-2">{icon}</div>
    <span className="text-xs md:text-sm font-medium leading-tight">{text}</span>
  </motion.div>
);

export default HeroSection;
