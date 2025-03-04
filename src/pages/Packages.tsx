
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackagesSection from "@/components/PackagesSection";
import CtaSection from "@/components/CtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Packages = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Best Char Dham Yatra Packages 2024 | Kedarnath & Badrinath Tours</title>
        <meta 
          name="description" 
          content="Explore our Char Dham Yatra packages for 2024. VIP darshan at Kedarnath, Badrinath, Gangotri & Yamunotri. Helicopter services, comfortable stays & expert guides available." 
        />
        <meta name="keywords" content="Char Dham Yatra packages, Kedarnath tour package, Badrinath Yatra booking, Kedarnath helicopter booking, Budget Char Dham tour, Senior citizen Char Dham tour package" />
        <link rel="canonical" href="https://Varahijourney.com/packages" />
        <meta property="og:title" content="Best Char Dham Yatra Packages 2024 | Kedarnath & Badrinath Tours" />
        <meta property="og:description" content="Explore our Char Dham Yatra packages for 2024. VIP darshan at Kedarnath, Badrinath, Gangotri & Yamunotri." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Varahijourney.com/packages" />
        <meta property="og:image" content="https://Varahijourney.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Char Dham Yatra Packages 2024 | Kedarnath & Badrinath Tours" />
        <meta name="twitter:description" content="Explore our Char Dham Yatra packages for 2024. VIP darshan at Kedarnath, Badrinath, Gangotri & Yamunotri." />
        <meta name="twitter:image" content="https://Varahijourney.com/og-image.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "TouristTrip",
                  "name": "Kedarnath Helicopter Package",
                  "touristType": ["Pilgrimage", "Religious Tourism"],
                  "description": "Experience the divine with our exclusive helicopter package to Kedarnath. Skip the trek and maximize your darshan time.",
                  "offers": {
                    "@type": "Offer",
                    "price": "13999",
                    "priceCurrency": "INR"
                  },
                  "itinerary": {
                    "@type": "ItemList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                          "@type": "TouristAttraction",
                          "name": "Kedarnath Temple",
                          "description": "Ancient Hindu temple dedicated to Lord Shiva"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "TouristTrip",
                  "name": "Complete Char Dham Yatra",
                  "touristType": ["Pilgrimage", "Religious Tourism"],
                  "description": "Visit all four divine destinations - Yamunotri, Gangotri, Kedarnath, and Badrinath in one spiritual journey.",
                  "offers": {
                    "@type": "Offer",
                    "price": "29999",
                    "priceCurrency": "INR"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <div className="relative pt-20 bg-himalaya-50">
          <div className="absolute inset-0 opacity-55 z-0">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("https://images.unsplash.com/photo-1539867462940-bc733134d96e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
          <div className="container mx-auto px-4 py-12 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-6 text-shadow-lg">
              Our Char Dham Yatra Packages
            </h1>
            <p className="text-center text-white text-lg md:text-xl max-w-3xl mx-auto mt-4 text-shadow font-medium hidden">
              Choose from our carefully curated packages designed to provide you with a comfortable, 
              spiritual, and memorable journey to the sacred Char Dham destinations.
            </p>
          </div>
        </div>
        <PackagesSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Packages;
