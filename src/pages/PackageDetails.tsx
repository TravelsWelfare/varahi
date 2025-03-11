import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { PackageItinerary } from "@/components/PackageItinerary";
import { packageItineraries } from "@/data/packageItineraries";
import { packages } from "@/data/packages";
import { useBooking } from "@/context/BookingContext";
import { useToast } from "@/components/ui/use-toast";
import { OptimizedImage } from "@/components/ui/optimized-image";
import SEO from "@/components/SEO";
import { useMemo } from "react";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectPackage } = useBooking();
  const { toast } = useToast();
  const pkg = packages.find(p => p.id === Number(id));
  const itinerary = packageItineraries.find(i => i.packageId === Number(id));

  // Generate structured data for the package - moved before conditional return
  const structuredData = useMemo(() => {
    if (!pkg) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip", 
      "name": pkg.title,
      "description": pkg.description,
      "touristType": ["Pilgrimage", "Religious tourism"],
      "offers": {
        "@type": "Offer",
        "price": pkg.price.replace('₹', '').replace(',', ''),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
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
      },
      "image": pkg.image
    };
  }, [pkg]);

  if (!pkg) {
    return <div>Package not found</div>;
  }

  const handleBookNow = () => {
    selectPackage(pkg.id, pkg.title, pkg.price);
    
    toast({
      title: "Package Selected",
      description: `${pkg.title} has been selected. Please complete your booking details.`,
      duration: 3000,
    });
    
    navigate('/contact');
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${pkg.title} | Varahi Journey`}
        description={pkg.description}
        canonicalUrl={`/packages/${pkg.id}`}
        ogImage={pkg.image}
        ogType="website"
        keywords={[pkg.title, "Char Dham", "Pilgrimage", "Travel Package", pkg.location]}
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <OptimizedImage
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full"
            priority={true}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pkg.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl mb-6">{pkg.description}</p>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{pkg.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-himalaya-800 mb-4">Package Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                      <span className="text-himalaya-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-himalaya-800 mb-4">Package Includes</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                      <span className="text-himalaya-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {itinerary && (
                <section>
                  <h2 className="text-2xl font-bold text-himalaya-800 mb-4">Detailed Itinerary</h2>
                  <PackageItinerary days={itinerary.days} isOpen={true} />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-white p-6 space-y-6">
                <div>
                  <span className="text-sm text-himalaya-600">Starting from</span>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleBookNow}
                >
                  Book Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="text-sm text-himalaya-600">
                  <p>✓ Instant confirmation</p>
                  <p>✓ Free cancellation up to 48 hours before departure</p>
                  <p>✓ Secure payment gateway</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PackageDetails;