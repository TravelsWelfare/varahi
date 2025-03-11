import React, { useState, useEffect, useMemo, useRef } from "react";
import { Globe } from "@/components/ui/globe";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, X, Loader2 } from "lucide-react";
import { COBEOptions } from "cobe";

// Define types for our destinations
type Region = "Asia" | "Middle East" | "Europe" | "Americas" | "Africa";

interface SpiritualDestination {
  name: string;
  location: [number, number]; // [latitude, longitude]
  size: number;
  description: string;
  region: Region;
}

// Reduced number of destinations for better performance
const SPIRITUAL_DESTINATIONS: SpiritualDestination[] = [
  {
    name: "Kedarnath",
    location: [30.7346, 79.0669],
    size: 0.5,
    description: "One of the twelve Jyotirlingas of Lord Shiva, located in the Himalayas.",
    region: "Asia"
  },
  {
    name: "Badrinath",
    location: [30.7433, 79.4938],
    size: 0.5,
    description: "Sacred to Lord Vishnu, one of the Char Dham pilgrimage sites.",
    region: "Asia"
  },
  {
    name: "Varanasi",
    location: [25.3176, 83.0062],
    size: 0.6,
    description: "One of the oldest continuously inhabited cities and a major spiritual center for Hinduism.",
    region: "Asia"
  },
  {
    name: "Jerusalem",
    location: [31.7683, 35.2137],
    size: 0.6,
    description: "Sacred city to three major Abrahamic religions: Judaism, Christianity, and Islam.",
    region: "Middle East"
  },
  {
    name: "Vatican City",
    location: [41.9022, 12.4539],
    size: 0.5,
    description: "The spiritual center of the Roman Catholic Church and home to the Pope.",
    region: "Europe"
  },
  {
    name: "Bodh Gaya",
    location: [24.6961, 84.9911],
    size: 0.5,
    description: "The place where Gautama Buddha attained enlightenment beneath the Bodhi Tree.",
    region: "Asia"
  },
  {
    name: "Machu Picchu",
    location: [-13.1631, -72.5450],
    size: 0.5,
    description: "Ancient Incan citadel set high in the Andes Mountains, a spiritual center of the Inca civilization.",
    region: "Americas"
  },
  {
    name: "Lalibela",
    location: [12.0319, 39.0476],
    size: 0.4,
    description: "Famous for its rock-cut monolithic churches and a place of pilgrimage for Ethiopian Orthodox Christians.",
    region: "Africa"
  }
];

const GlobeDemo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeRegions, setActiveRegions] = useState<Region[]>(["Asia", "Middle East", "Europe", "Americas", "Africa"]);
  const [hoveredDestination, setHoveredDestination] = useState<SpiritualDestination | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const globeRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Preload the globe texture image
  useEffect(() => {
    const img = new Image();
    img.src = "/earth-blue-marble.jpg";
    img.onload = () => setIsImageLoaded(true);
    img.onerror = (err) => console.error("Failed to load globe texture:", err);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Filter destinations by active regions
  const filteredDestinations = useMemo(() => {
    return SPIRITUAL_DESTINATIONS.filter(dest => activeRegions.includes(dest.region));
  }, [activeRegions]);

  // Format markers for the globe
  const formattedMarkers = useMemo(() => {
    return filteredDestinations.map(dest => ({
      location: dest.location,
      size: dest.size,
      destination: dest // Pass the full destination object for tooltip
    }));
  }, [filteredDestinations]);

  // Configure the globe with reduced quality settings for better performance
  const globeConfig = useMemo(() => {
    return {
      width: isMobile ? 300 : 500,
      height: isMobile ? 300 : 500,
      globeImageUrl: "/earth-blue-marble.jpg",
      backgroundColor: "rgba(0,0,0,0)",
      atmosphereColor: "#3a93e0",
      atmosphereAltitude: 0.15,
      enableZoom: true,
      enableRotate: true,
      markers: formattedMarkers,
      markerColor: "#FF5733",
      glowColor: "#3a93e0",
      devicePixelRatio: 1, // Reduced for better performance
      mapSamples: isMobile ? 2000 : 5000, // Reduced for better performance
      diffuse: 1.2,
      dark: 0.3,
      baseColor: [0.3, 0.3, 1],
      onRender: () => {
        // Set globe as loaded after first render
        if (!isGlobeLoaded) {
          setIsGlobeLoaded(true);
        }
      },
      onMarkerHover: (marker: { destination: SpiritualDestination }, event: MouseEvent) => {
        if (marker && marker.destination) {
          setHoveredDestination(marker.destination);
          setTooltipPosition({ 
            x: event.clientX, 
            y: event.clientY 
          });
        } else {
          setHoveredDestination(null);
        }
      },
      autoRotate: isRotating && !hoveredDestination,
      autoRotateSpeed: 0.5
    };
  }, [isMobile, formattedMarkers, isRotating, hoveredDestination, isGlobeLoaded]);

  // Toggle a region
  const toggleRegion = (region: Region) => {
    if (activeRegions.includes(region)) {
      // Don't remove if it's the last active region
      if (activeRegions.length > 1) {
        setActiveRegions(activeRegions.filter(r => r !== region));
      }
    } else {
      setActiveRegions([...activeRegions, region]);
    }
  };

  // Get color for region badge
  const getRegionColor = (region: Region): string => {
    const colors: Record<Region, string> = {
      "Asia": activeRegions.includes("Asia") ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400",
      "Middle East": activeRegions.includes("Middle East") ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-300 hover:bg-gray-400",
      "Europe": activeRegions.includes("Europe") ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400",
      "Americas": activeRegions.includes("Americas") ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-300 hover:bg-gray-400",
      "Africa": activeRegions.includes("Africa") ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 hover:bg-gray-400"
    };
    return colors[region];
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold text-himalaya-800 mb-2">Sacred Destinations</h3>
        <p className="text-himalaya-600 text-sm max-w-md">
          Explore spiritual sites from around the world. Filter by region and hover over markers to learn more.
        </p>
      </div>
      
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {(["Asia", "Middle East", "Europe", "Americas", "Africa"] as Region[]).map(region => (
          <Badge 
            key={region}
            className={`cursor-pointer ${getRegionColor(region)} text-white`}
            onClick={() => toggleRegion(region)}
          >
            {region}
          </Badge>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2 h-6 px-2"
          onClick={() => setIsRotating(!isRotating)}
        >
          {isRotating ? "Pause" : "Rotate"}
        </Button>
      </div>

      <div 
        ref={globeRef}
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-b from-transparent to-blue-50/30 rounded-full p-4"
      >
        {/* Loading indicator */}
        {(!isGlobeLoaded || !isImageLoaded) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/80 rounded-lg">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
            <p className="text-himalaya-600 font-medium">Loading interactive globe...</p>
          </div>
        )}
        
        {/* Globe container */}
       
        <div className={`relative ${(!isGlobeLoaded || !isImageLoaded) ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`} style={{ width: isMobile ? 300 : 500, height: isMobile ? 300 : 500 }}>
          <Globe className="w-full h-full" config={globeConfig as unknown as COBEOptions} />
        </div>
      </div>

      {hoveredDestination && (
        <motion.div 
          className="absolute z-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 max-w-[250px]"
          style={{
            left: `${Math.min(Math.max(tooltipPosition.x, 125), window.innerWidth - 125)}px`,
            top: `${Math.min(Math.max(tooltipPosition.y - 100, 100), window.innerHeight - 200)}px`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-himalaya-800">{hoveredDestination.name}</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setHoveredDestination(null)}
            >
              <X size={14} />
            </button>
          </div>
          <Badge className={`mt-1 mb-2 ${getRegionColor(hoveredDestination.region)} text-white`}>
            {hoveredDestination.region}
          </Badge>
          <p className="text-sm text-gray-700">{hoveredDestination.description}</p>
        </motion.div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          <Info className="inline-block mr-1 h-4 w-4" /> 
          Hover over markers to learn about sacred sites. Click region badges to filter destinations.
        </p>
      </div>
    </motion.div>
  );
};

export default GlobeDemo; 