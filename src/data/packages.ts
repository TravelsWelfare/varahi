import { Plane, Car, Calendar, Users, Shield, MapPin } from "lucide-react";

type PackageIcon = typeof Plane | typeof Car | typeof Calendar | typeof Users | typeof Shield | typeof MapPin;

const createIcon = (Icon: PackageIcon) => {
  return {
    type: Icon,
    props: { className: "h-5 w-5" }
  };
};

export const packages = [
  {
    id: 1,
    title: "Kedarnath Helicopter Package",
    duration: "2 Days",
    price: "₹30,000",
    image: "https://www.chardhamtourism.com/images/chardham-by-helicopter/kedarnath-yatra-by-helicopter.jpg",
    icon: createIcon(Plane),
    badgeText: "Popular",
    description: "Experience the divine with our exclusive helicopter package to Kedarnath. Skip the trek and maximize your darshan time.",
    features: ["Direct helicopter ride", "VIP Darshan", "Comfortable stay", "All meals included"],
    highlights: ["Fast booking process", "No trekking required", "Priority temple entry"],
    location: "Kedarnath"
  },
  {
    id: 2,
    title: "Complete Char Dham Yatra",
    duration: "10 Days",
    price: "₹29,999",
    image: "https://www.chardham.in/uploads/chardham-yatra-guide.jpg",
    icon: createIcon(Car),
    badgeText: "Best Value",
    description: "Visit all four divine destinations - Yamunotri, Gangotri, Kedarnath, and Badrinath in one spiritual journey.",
    features: ["All-inclusive travel", "Premium stays & meals", "Experienced guides", "Darshan assistance"],
    highlights: ["Complete spiritual experience", "Guided tours at each shrine", "Traditional welcome ceremonies"],
    location: "Yamunotri, Gangotri, Kedarnath, Badrinath"
  },
  {
    id: 3,
    title: "Kedarnath & Badrinath Package",
    duration: "6 Days",
    price: "₹12,500",
    image: "https://www.chardhamyatra2022.com/wp-content/uploads/2023/02/Do-Dham-Yatra-from-Haridwar-1536x768.jpg",
    icon: createIcon(Calendar),
    badgeText: "Most Chosen",
    description: "Experience the divine energy of both Kedarnath and Badrinath with comfortable travel and accommodation.",
    features: ["Scenic road trip", "Stay in best-rated hotels", "Guided sightseeing", "Spiritual activities"],
    highlights: ["Witness aarti ceremonies", "Local cultural experiences", "Photography opportunities"],
    location: "Kedarnath, Badrinath"
  },
  {
    id: 4,
    title: "Budget Char Dham Yatra",
    duration: "12 Days",
    price: "₹24,999",
    image: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: createIcon(Users),
    badgeText: "Budget-Friendly",
    description: "An economical way to experience the complete Char Dham Yatra without compromising on the spiritual essence.",
    features: ["Comfortable transportation", "Clean accommodations", "Experienced guides", "All meals included"],
    highlights: ["Group discounts available", "Flexible payment options", "Perfect for large groups"],
    location: "Yamunotri, Gangotri, Kedarnath, Badrinath"
  },
  {
    id: 5,
    title: "Senior Citizens Special Package",
    duration: "14 Days",
    price: "₹34,999",
    image: "https://images.unsplash.com/photo-1465919292275-c60ba49da6ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: createIcon(Shield),
    badgeText: "Senior Special",
    description: "A carefully paced journey designed specifically for senior citizens, with extra comfort, medical assistance, and care.",
    features: ["Medical support throughout", "Slower-paced itinerary", "Premium accommodations", "Special assistance"],
    highlights: ["Wheelchair accessibility", "Medical check-ups included", "Oxygen support available"],
    location: "Yamunotri, Gangotri, Kedarnath, Badrinath"
  },
  {
    id: 6,
    title: "Gangotri & Yamunotri Only",
    duration: "5 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: createIcon(MapPin),
    badgeText: "Easy Access",
    description: "Focus on the beautiful temples and natural surroundings of Gangotri and Yamunotri with this specialized package.",
    features: ["Luxury vehicles", "Premium hotels", "Expert local guides", "Cultural experiences"],
    highlights: ["River-side meditation sessions", "Photography opportunities", "Local cuisine exploration"],
    location: "Gangotri, Yamunotri"
  }
] as const;