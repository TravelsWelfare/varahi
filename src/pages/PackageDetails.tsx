import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { PackageItinerary } from "@/components/PackageItinerary";
import { packageItineraries } from "@/data/packageItineraries";
import { packages } from "@/data/packages";

const PackageDetails = () => {
  const { id } = useParams();
  const pkg = packages.find(p => p.id === Number(id));
  const itinerary = packageItineraries.find(i => i.packageId === Number(id));

  if (!pkg) {
    return <div>Package not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pkg.title} | Varahi journey</title>
        <meta name="description" content={pkg.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
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
              {/* Features */}
              <section>
                <h2 className="text-2xl font-bold text-himalaya-800 mb-4">Package Includes</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-white">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-himalaya-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-2xl font-bold text-himalaya-800 mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-white">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-himalaya-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Itinerary */}
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