import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PackageItinerary } from "./PackageItinerary";
import { packageItineraries } from "@/data/packageItineraries";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PackageCardProps {
  package: {
    id: number;
    title: string;
    duration: string;
    price: string;
    image: string;
    icon: React.ReactNode;
    badgeText: string;
    description: string;
    features: string[];
    highlights: string[];
    location: string;
  };
  onBook: () => void;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

const PackageCard = memo(({ package: pkg, onBook, isHovered, onHover, onLeave }: PackageCardProps) => {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const itinerary = packageItineraries.find(i => i.packageId === pkg.id);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
    console.error(`Failed to load image for package: ${pkg.title}`);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.description,
    "touristType": ["Pilgrimage", "Religious tourism"],
    "offers": {
      "@type": "Offer",
      "price": pkg.price.replace('₹', '').replace(',', ''),
      "priceCurrency": "INR"
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
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <motion.div 
        className={cn(
          "rounded-xl bg-white border border-himalaya-100 shadow-sm overflow-hidden transition-all duration-500",
          isHovered && "shadow-xl scale-[1.02]",
          isItineraryOpen && "lg:col-span-2"
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        layout
      >
        <div className={cn(
          "grid gap-4",
          isItineraryOpen && "lg:grid-cols-2"
        )}>
          <div>
            <div className="aspect-[16/9] relative overflow-hidden group">
              <div className={cn(
                "absolute inset-0 bg-himalaya-100 animate-pulse",
                (imageLoaded && !imageError) && "hidden"
              )} />
              {!imageError ? (
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={cn(
                    "object-cover w-full h-full transition-all duration-700",
                    "group-hover:scale-110",
                    !imageLoaded && "opacity-0"
                  )}
                  fallback="/placeholder.svg"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-himalaya-50 text-himalaya-500">
                  <div className="text-center p-4">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">{pkg.location}</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Badge 
                className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg"
              >
                {pkg.badgeText}
              </Badge>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-himalaya-800 group-hover:text-primary transition-colors duration-300">{pkg.title}</h3>
                <div className="flex items-center text-himalaya-600 whitespace-nowrap">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0 text-primary" />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-himalaya-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{pkg.description}</p>
              
              <div className="flex items-center text-himalaya-600 mb-4">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-primary" />
                <span className="text-sm truncate">{pkg.location}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-himalaya-800 mb-2">Package Includes:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-xs sm:text-sm text-himalaya-600 flex items-center group">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-xs sm:text-sm text-himalaya-600">Starting from</span>
                      <div className="text-xl sm:text-2xl font-bold text-primary">{pkg.price}</div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsItineraryOpen(!isItineraryOpen)}
                      className="w-full sm:w-auto gap-2 text-sm group"
                    >
                      View Itinerary
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isItineraryOpen && "rotate-180"
                      )} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      to={`/packages/${pkg.id}`}
                      className="w-full sm:flex-1"
                    >
                      <Button 
                        variant="outline"
                        className="w-full text-sm hover:bg-primary/5 transition-colors duration-300"
                      >
                        Get Details
                      </Button>
                    </Link>
                    <Button 
                      className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm transform hover:scale-105 transition-all duration-300"
                      onClick={onBook}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <AnimatePresence>
            {isItineraryOpen && itinerary && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 sm:p-6 border-t sm:border-t-0 sm:border-l"
              >
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-himalaya-800 mb-2">Day-by-Day Itinerary</h3>
                  <p className="text-sm sm:text-base text-himalaya-600">Detailed breakdown of your spiritual journey</p>
                </div>
                <PackageItinerary days={itinerary.days} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
});

PackageCard.displayName = 'PackageCard';

export default PackageCard;