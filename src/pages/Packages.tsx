import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { packages } from "@/data/packages";
import PackageCard from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";

// Define resources to prefetch for likely navigation from the packages page
const prefetchResources = [
  '/packages/1',
  '/packages/2',
  '/packages/3',
  '/contact',
  '/assets/package-details.js'
];

// Prefetch package details data
const prefetchPackageDetails = () => {
  // This would be implemented to prefetch package details data
  // For example, you might prefetch the most popular package details
  return import('@/data/packageItineraries');
};

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPackages, setFilteredPackages] = useState(packages);

  // Filter packages based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPackages(packages);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(lowercasedSearch) || 
        pkg.location.toLowerCase().includes(lowercasedSearch) ||
        pkg.description.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredPackages(filtered);
    }
  }, [searchTerm]);

  // Prefetch package details for popular packages
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchPackageDetails();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Best Char Dham Yatra Packages 2024 | Kedarnath & Badrinath Tours"
        description="Explore our range of Char Dham Yatra packages. Find the perfect pilgrimage package with comfortable accommodations, expert guides, and seamless travel arrangements."
        keywords={["char dham packages", "kedarnath package", "badrinath package", "pilgrimage tour", "spiritual journey packages"]}
        canonicalUrl="/packages"
        prefetchResources={prefetchResources}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Char Dham Yatra Packages",
          "description": "Explore our range of Char Dham Yatra packages with expert guides and comfortable accommodations.",
          "url": "https://varahijourney.com/packages",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": packages.map((pkg, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": pkg.title,
                "description": pkg.description,
                "image": pkg.image,
                "offers": {
                  "@type": "Offer",
                  "price": pkg.price.replace('₹', '').replace(',', ''),
                  "priceCurrency": "INR"
                }
              }
            }))
          }
        }}
      />
      
      <Navbar />
      
      <main className="pt-20">
        <div className="bg-gradient-to-r from-himalaya-50 to-himalaya-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-himalaya-800 mb-4">Char Dham Yatra Packages</h1>
            <p className="text-xl text-himalaya-600 max-w-3xl mb-8">
              Discover our carefully crafted pilgrimage packages designed to provide a seamless and spiritually enriching experience.
            </p>
            
            <div className="relative max-w-md">
              <Input
                type="text"
                placeholder="Search packages by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-himalaya-200 focus:border-primary focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-himalaya-400 h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-himalaya-700 mb-4">No packages found</h2>
              <p className="text-himalaya-500 mb-6">We couldn't find any packages matching your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="border-himalaya-300 text-himalaya-700 hover:bg-himalaya-50"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Packages;
