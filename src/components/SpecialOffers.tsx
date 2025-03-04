
import { useState } from "react";
import { ArrowRight, Tag, Percent, Calendar, Gift, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const offers = [
  {
    id: 1,
    title: "Early Bird Discount",
    description: "Book your Char Dham Yatra 3 months in advance and receive 15% off the package price.",
    discount: "15% Off",
    validUntil: "Valid until March 30, 2024",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-[#FFF3CC]",
    textColor: "text-[#997300]",
    iconColor: "text-[#FFBF00]"
  },
  {
    id: 2,
    title: "Group Pilgrimage Special",
    description: "Groups of 5 or more pilgrims receive ₹2,500 discount per person on any package.",
    discount: "₹2,500 Off Per Person",
    validUntil: "Valid for all 2024 bookings",
    icon: <Users className="h-5 w-5" />,
    color: "bg-[#E9EFF5]",
    textColor: "text-[#526F73]",
    iconColor: "text-[#8CAFBC]"
  },
  {
    id: 3,
    title: "Senior Citizens Package",
    description: "Travelers aged 60+ receive complimentary medical check-ups and oxygen support services.",
    discount: "Free Medical Services",
    validUntil: "Valid for all packages",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-[#F2EBE4]",
    textColor: "text-[#7E5C46]", 
    iconColor: "text-[#BF977A]"
  },
  {
    id: 4,
    title: "Last Minute Deals",
    description: "Special rates for bookings made within 2 weeks of departure. Up to 10% off select dates.",
    discount: "Up to 10% Off",
    validUntil: "Based on availability",
    icon: <Clock className="h-5 w-5" />,
    color: "bg-[#E5D6C9]",
    textColor: "text-[#553D2F]",
    iconColor: "text-[#A67C5E]"
  }
];

const SpecialOffers = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleClaimOffer = (offerTitle: string) => {
    toast({
      title: "Offer Claimed!",
      description: `You've claimed the ${offerTitle} offer. We'll apply it to your next booking.`,
      duration: 5000,
    });
  };

  return (
    <section className="py-20 bg-himalaya-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 border-primary text-primary font-medium">
            Limited Time Offers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
            Special Discounts for Your Divine Journey
          </h2>
          <p className="text-himalaya-600 mb-8">
            We're pleased to offer these exclusive discounts and special packages to make your
            spiritual journey more accessible and comfortable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <div 
              key={offer.id}
              className={`rounded-xl overflow-hidden border border-transparent transition-all duration-300 ${
                hoveredIndex === index ? "shadow-xl transform -translate-y-1 border-primary/20" : "shadow-md"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`p-6 ${offer.color}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-3 gap-2">
                      <div className={`p-2 rounded-full bg-white/80 ${offer.iconColor}`}>
                        {offer.icon}
                      </div>
                      <h3 className={`text-xl font-semibold ${offer.textColor}`}>{offer.title}</h3>
                    </div>
                    <p className={`${offer.textColor} mb-4 opacity-80`}>{offer.description}</p>
                  </div>
                  <Badge className="bg-white font-semibold text-primary border-primary">
                    {offer.discount}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className={`text-sm ${offer.textColor} opacity-70`}>{offer.validUntil}</span>
                  <Button 
                    size="sm"
                    variant="outline" 
                    className={`border-current ${offer.textColor} hover:bg-white/30`}
                    onClick={() => handleClaimOffer(offer.title)}
                  >
                    Claim Offer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Percent className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">All offers can be combined with package discounts</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-himalaya-700 mb-6">
              Ready to start planning your spiritual journey with these special offers?
              Contact our team today to learn more about how we can customize your Char Dham Yatra experience.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.location.href = "/contact"}
            >
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
