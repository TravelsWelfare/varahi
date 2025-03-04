
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialOffers from "@/components/SpecialOffers";
import CtaSection from "@/components/CtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Offers = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Special Discounts on Char Dham Yatra Packages 2024 | Exclusive Offers</title>
        <meta 
          name="description" 
          content="Exclusive discounts on Char Dham Yatra 2024 packages. Early bird offers, senior citizen discounts, group packages for Kedarnath and Badrinath. Book now & save!" 
        />
        <meta name="keywords" content="Char Dham Yatra discounts, Kedarnath package offers, Badrinath special deals, Senior citizen Char Dham tour package, Budget Char Dham tour" />
        <link rel="canonical" href="https://Varahijourney.com/offers" />
        <meta property="og:title" content="Special Discounts on Char Dham Yatra Packages 2024 | Exclusive Offers" />
        <meta property="og:description" content="Exclusive discounts on Char Dham Yatra 2024 packages. Early bird offers, senior citizen discounts, group packages for Kedarnath and Badrinath." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Varahijourney.com/offers" />
        <meta property="og:image" content="https://Varahijourney.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Special Discounts on Char Dham Yatra Packages 2024 | Exclusive Offers" />
        <meta name="twitter:description" content="Exclusive discounts on Char Dham Yatra 2024 packages. Early bird offers, senior citizen discounts, group packages for Kedarnath and Badrinath." />
        <meta name="twitter:image" content="https://Varahijourney.com/og-image.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SpecialAnnouncement",
              "name": "Special Offers on Char Dham Yatra 2024",
              "datePosted": "2024-01-01T08:00:00+05:30",
              "expires": "2024-12-31T23:59:59+05:30",
              "category": "https://schema.org/SpecialOffer",
              "text": "Limited time discounts on Char Dham Yatra packages including early bird offers, senior citizen packages, and group booking discounts.",
              "announcementLocation": {
                "@type": "TravelAgency",
                "name": "Varahi journey",
                "url": "https://Varahijourney.com"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "When is the best time to book Char Dham Yatra for maximum discounts?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For maximum discounts, book your Char Dham Yatra 3-4 months in advance to avail our early bird offer of 15% off. The early booking period typically runs from November to February for the next yatra season."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there any special discounts for senior citizens?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, travelers aged 60+ receive complimentary medical check-ups and oxygen support services with all our Char Dham packages, along with priority darshan assistance and special care throughout the journey."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What discounts are available for group bookings?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Groups of 5 or more pilgrims receive ₹2,500 discount per person on any package. For larger groups of 10+, we offer additional benefits including a free tour guide and customized itinerary options."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <div className="pt-20 bg-himalaya-50">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-himalaya-800 text-center">
              Exclusive Offers on Char Dham Yatra 2024
            </h1>
            <p className="text-center text-himalaya-600 max-w-3xl mx-auto mt-4">
              Take advantage of our limited-time discounts and special packages designed to make your 
              spiritual journey to Kedarnath, Badrinath, Yamunotri, and Gangotri more affordable and comfortable.
            </p>
          </div>
        </div>
        <SpecialOffers />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-himalaya-800 mb-6 text-center">
              Frequently Asked Questions About Our Offers
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-himalaya-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-himalaya-800 mb-2">When is the best time to book Char Dham Yatra for maximum discounts?</h3>
                <p className="text-himalaya-600">For maximum discounts, book your Char Dham Yatra 3-4 months in advance to avail our early bird offer of 15% off. The early booking period typically runs from November to February for the next yatra season.</p>
              </div>
              <div className="bg-himalaya-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-himalaya-800 mb-2">Are there any special discounts for senior citizens?</h3>
                <p className="text-himalaya-600">Yes, travelers aged 60+ receive complimentary medical check-ups and oxygen support services with all our Char Dham packages, along with priority darshan assistance and special care throughout the journey.</p>
              </div>
              <div className="bg-himalaya-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-himalaya-800 mb-2">What discounts are available for group bookings?</h3>
                <p className="text-himalaya-600">Groups of 5 or more pilgrims receive ₹2,500 discount per person on any package. For larger groups of 10+, we offer additional benefits including a free tour guide and customized itinerary options.</p>
              </div>
              <div className="bg-himalaya-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-himalaya-800 mb-2">Do you offer last-minute deals on Char Dham packages?</h3>
                <p className="text-himalaya-600">Yes, we offer last-minute deals with up to 10% off on select departure dates, subject to availability. These deals are perfect for spontaneous travelers or those with flexible schedules.</p>
              </div>
              <div className="bg-himalaya-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-himalaya-800 mb-2">Can I combine multiple discounts for my booking?</h3>
                <p className="text-himalaya-600">Yes, many of our offers can be combined with package discounts. For example, a senior citizen can benefit from both the senior package benefits and the early bird discount if booking in advance.</p>
              </div>
            </div>
          </div>
        </section>
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Offers;
