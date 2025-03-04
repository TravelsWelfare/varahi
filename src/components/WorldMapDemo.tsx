import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Route } from "lucide-react";

export function WorldMapDemo() {
  return (
    <div className="py-20 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Customized Sacred Journeys
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl dark:text-white text-black mb-6">
              Your Journey,{" "}
              <span className="text-primary">
                Your Way
              </span>
            </h2>
            <p className="text-base md:text-lg text-neutral-500 max-w-3xl mx-auto">
              Choose your preferred route, schedule, and comfort level. We adapt to your spiritual needs 
              and travel preferences, creating a personalized Char Dham experience just for you.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <Route className="h-6 w-6 text-primary" />,
              title: "Flexible Routes",
              description: "Customize your pilgrimage path based on your preferences and time constraints"
            },
            {
              icon: <Calendar className="h-6 w-6 text-primary" />,
              title: "Choose Your Dates",
              description: "Travel when it suits you best, with year-round availability"
            },
            {
              icon: <Users className="h-6 w-6 text-primary" />,
              title: "Group Size Options",
              description: "Private tours, family groups, or join other devotees"
            },
            {
              icon: <MapPin className="h-6 w-6 text-primary" />,
              title: "Additional Destinations",
              description: "Include other sacred sites in your journey"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/10"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold dark:text-white text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <div className="relative">
        <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
          
          {/* Call to Action Overlay */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/20"
            >
              <p className="text-sm md:text-base text-black mb-4 max-w-md">
                Ready to plan your personalized spiritual journey? Let's create your perfect itinerary together.
              </p>
              <Button 
                onClick={() => window.location.href = '/contact'}
                className="bg-primary hover:bg-primary/90 text-white font-medium"
              >
                Plan Your Custom Journey
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 