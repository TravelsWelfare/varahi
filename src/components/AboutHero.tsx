
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-himalaya-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full mb-5">
            <span className="text-primary font-medium">Our Sacred Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            About Varahi <span className="text-primary">journey</span>
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            We are a dedicated team of spiritual travel specialists committed to providing 
            authentic, comfortable, and transformative Char Dham Yatra experiences that honor 
            the sacred traditions while embracing modern comforts.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base group"
            >
              View Packages 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-base"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
