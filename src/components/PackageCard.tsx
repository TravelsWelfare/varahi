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
  const itinerary = packageItineraries.find(i => i.packageId === pkg.id);

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
      <div 
        className={cn(
          "rounded-xl bg-white border border-himalaya-100 shadow-sm overflow-hidden card-hover transition-all duration-300",
          isItineraryOpen && "lg:col-span-2"
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className={cn(
          "grid gap-4",
          isItineraryOpen && "lg:grid-cols-2"
        )}>
          <div>
            <div className="aspect-[16/9] relative">
              <Image
                src={pkg.image}
                alt={pkg.title}
                className="object-cover w-full h-full transition-transform duration-300"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
              />
              <Badge 
                className="absolute top-4 left-4 bg-primary text-primary-foreground"
              >
                {pkg.badgeText}
              </Badge>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-himalaya-800">{pkg.title}</h3>
                <div className="flex items-center text-himalaya-600 whitespace-nowrap">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
              </div>
              
              <p className="text-himalaya-600 mb-4 line-clamp-2">{pkg.description}</p>
              
              <div className="flex items-center text-himalaya-600 mb-4">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{pkg.location}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-himalaya-800 mb-2">Package Includes:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-sm text-himalaya-600 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-himalaya-600">Starting from</span>
                      <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsItineraryOpen(!isItineraryOpen)}
                      className="gap-2"
                    >
                      View Itinerary
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isItineraryOpen && "rotate-180"
                      )} />
                    </Button>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      to={`/packages/${pkg.id}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline"
                        className="w-full"
                      >
                        Get Details
                      </Button>
                    </Link>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
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
          {isItineraryOpen && itinerary && (
            <div className="p-6 border-l">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-himalaya-800 mb-2">Day-by-Day Itinerary</h3>
                <p className="text-himalaya-600">Detailed breakdown of your spiritual journey</p>
              </div>
              <PackageItinerary days={itinerary.days} />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

PackageCard.displayName = 'PackageCard';

export default PackageCard;