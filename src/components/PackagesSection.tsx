import { useState, useMemo, useCallback, memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { packages } from "@/data/packages";
import { useBooking } from "@/context/BookingContext";
import SEO from "@/components/SEO";

const PackageCard = lazy(() => import("./PackageCard"));

const PackageCardSkeleton = memo(() => (
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
));

PackageCardSkeleton.displayName = 'PackageCardSkeleton';

// Filter buttons component
const FilterButtons = memo(({ 
  locations, 
  filterLocation, 
  onFilterChange 
}: { 
  locations: string[]; 
  filterLocation: string | null; 
  onFilterChange: (location: string | null) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-8">
    <Button 
      variant={filterLocation === null ? "default" : "outline"} 
      onClick={() => onFilterChange(null)}
      className={filterLocation === null ? "bg-primary text-primary-foreground" : ""}
    >
      All Destinations
    </Button>
    {locations.map(location => (
      <Button 
        key={location}
        variant={filterLocation === location ? "default" : "outline"}
        onClick={() => onFilterChange(location)}
        className={filterLocation === location ? "bg-primary text-primary-foreground" : ""}
      >
        {location}
      </Button>
    ))}
  </div>
));

FilterButtons.displayName = 'FilterButtons';

const PackagesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const { toast } = useToast();
  const { selectPackage } = useBooking();

  // Extract unique locations for filtering
  const locations = useMemo(() => 
    Array.from(new Set(packages.map(pkg => pkg.location.split(', ')[0]))),
    []
  );

  // Filter packages based on selected location
  const filteredPackages = useMemo(() => 
    filterLocation 
      ? packages.filter(pkg => pkg.location.includes(filterLocation)) 
      : packages,
    [filterLocation]
  );

  // Generate structured data for packages list
  const structuredData = useMemo(() => ({
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
  }), []);

  const handleBookNow = useCallback((packageId: number) => {
    // Find the package details
    const selectedPackage = packages.find(pkg => pkg.id === packageId);
    
    if (selectedPackage) {
      // Update the context with selected package
      selectPackage(selectedPackage.id, selectedPackage.title, selectedPackage.price);
      
      // Show toast notification
      toast({
        title: "Package Selected",
        description: `${selectedPackage.title} has been selected. Proceed to booking form to complete your reservation.`,
        duration: 5000,
      });
      
      // Redirect to contact page with booking form
      window.location.href = `/contact?package=${packageId}`;
    }
  }, [selectPackage, toast]);

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleFilterChange = useCallback((location: string | null) => {
    setFilterLocation(location);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <SEO
        title="Travel Packages | Varahi Journey"
        description="Choose from our carefully designed packages for a comfortable and spiritually fulfilling journey to the sacred Char Dham destinations."
        canonicalUrl="/packages"
        keywords={["Char Dham Packages", "Pilgrimage Tours", "Spiritual Journey", "Kedarnath", "Badrinath"]}
        structuredData={structuredData}
      />
      
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
          
          <FilterButtons 
            locations={locations} 
            filterLocation={filterLocation} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
          {filteredPackages.map((pkg, index) => (
            <Suspense key={pkg.id} fallback={<PackageCardSkeleton />}>
              <PackageCard
                package={pkg}
                onBook={() => handleBookNow(pkg.id)}
                isHovered={hoveredIndex === index}
                onHover={() => handleHover(index)}
                onLeave={handleLeave}
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

export default memo(PackagesSection);
