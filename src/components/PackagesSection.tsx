import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { packages } from "@/data/packages";

const PackageCard = lazy(() => import("./PackageCard"));

const PackageCardSkeleton = () => (
  <div className="rounded-xl bg-white border border-himalaya-100 shadow-sm overflow-hidden">
    <div className="aspect-[16/9] relative bg-himalaya-50" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-himalaya-50 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-himalaya-50 rounded w-3/4" />
        <div className="h-4 bg-himalaya-50 rounded w-1/2" />
      </div>
    </div>
  </div>
);

const PackagesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const { toast } = useToast();

  const locations = ["Kedarnath", "Badrinath", "Yamunotri", "Gangotri"];

  const filteredPackages = filterLocation 
    ? packages.filter(pkg => pkg.location.includes(filterLocation)) 
    : packages;

  const handleBookNow = (packageTitle: string) => {
    toast({
      title: "Booking Request Received",
      description: `We've received your request for ${packageTitle}. Our team will contact you shortly!`,
      duration: 5000,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
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
                "itinerary": {
                  "@type": "ItemList",
                  "itemListElement": pkg.features.map((feature, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "name": feature
                  }))
                },
                "offers": {
                  "@type": "Offer",
                  "price": pkg.price.replace('₹', '').replace(',', ''),
                  "priceCurrency": "INR"
                }
              }
            }))
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 border-primary text-primary font-medium">
            Travel Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
            Our Most Popular Packages
          </h2>
          <p className="text-himalaya-600 mb-8">
            Choose from our carefully designed packages for a comfortable and spiritually fulfilling journey to the sacred Char Dham destinations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button 
              variant={filterLocation === null ? "default" : "outline"} 
              onClick={() => setFilterLocation(null)}
              className={filterLocation === null ? "bg-primary text-primary-foreground" : ""}
            >
              All Destinations
            </Button>
            {locations.map(location => (
              <Button 
                key={location}
                variant={filterLocation === location ? "default" : "outline"}
                onClick={() => setFilterLocation(location)}
                className={filterLocation === location ? "bg-primary text-primary-foreground" : ""}
              >
                {location}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
          {filteredPackages.map((pkg, index) => (
            <Suspense key={pkg.id} fallback={<PackageCardSkeleton />}>
              <PackageCard
                package={pkg}
                onBook={() => handleBookNow(pkg.title)}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            </Suspense>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-himalaya-700 mb-4">
            Looking for something specific? Get in touch for a custom plan tailored to your needs.
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
