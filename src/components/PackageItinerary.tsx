import { useState } from 'react';
import { Sun, ArrowRight, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DayActivity {
  title: string;
  description: string;
  activities: string[];
  location: string;
  overnight?: string;
}

interface PackageItineraryProps {
  days: DayActivity[];
  isOpen?: boolean;
}

export function PackageItinerary({ days, isOpen = false }: PackageItineraryProps) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <motion.div 
      className="space-y-4"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {/* Timeline view */}
      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 h-full w-px bg-primary/20" />
        <div className="space-y-3 sm:space-y-4">
          {days.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "flex gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all cursor-pointer",
                  "hover:bg-primary/5",
                  activeDay === index ? "bg-primary/10" : ""
                )}
                onClick={() => setActiveDay(index)}
              >
                {/* Day indicator */}
                <div className="relative">
                  <motion.div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: index * 0.1 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-himalaya-800 mb-1 line-clamp-1">
                    {day.title}
                  </h3>
                  <p className="text-sm text-himalaya-600 mb-2 line-clamp-2">{day.description}</p>
                  
                  {/* Location */}
                  <div className="flex items-center text-xs sm:text-sm text-himalaya-600">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{day.location}</span>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {activeDay === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="mt-3 sm:mt-4 space-y-3 overflow-hidden"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm sm:text-base text-himalaya-700">Today's Activities:</h4>
                          <ul className="list-disc list-inside text-himalaya-600 space-y-1 pl-1">
                            {day.activities.map((activity, idx) => (
                              <motion.li 
                                key={idx} 
                                className="text-xs sm:text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <span className="line-clamp-2">{activity}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        {day.overnight && (
                          <motion.div 
                            className="pt-2 border-t"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <p className="text-xs sm:text-sm text-himalaya-600">
                              <span className="font-medium">Overnight Stay:</span> {day.overnight}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expand indicator */}
                <div className="self-center flex-shrink-0">
                  <motion.div
                    animate={{ rotate: activeDay === index ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}