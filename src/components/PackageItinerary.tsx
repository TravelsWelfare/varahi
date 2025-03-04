import { useState } from 'react';
import { Sun, ArrowRight, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DayActivity {
  title: string;
  description: string;
  location: string;
  activities: string[];
  overnight?: string;
}

interface PackageItineraryProps {
  days: DayActivity[];
  isOpen?: boolean;
}

export function PackageItinerary({ days, isOpen = false }: PackageItineraryProps) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="space-y-4">
      {/* Timeline view */}
      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-px bg-primary/20" />
        <div className="space-y-4">
          {days.map((day, index) => (
            <div key={index} className="relative">
              <div
                className={cn(
                  "flex gap-4 p-4 rounded-lg transition-all cursor-pointer",
                  activeDay === index
                    ? "bg-primary/10"
                    : "hover:bg-primary/5"
                )}
                onClick={() => setActiveDay(index)}
              >
                {/* Day indicator */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sun className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-himalaya-800 mb-1">
                    {day.title}
                  </h3>
                  <p className="text-himalaya-600 mb-2">{day.description}</p>
                  
                  {/* Location */}
                  <div className="flex items-center text-sm text-himalaya-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{day.location}</span>
                  </div>

                  {/* Expanded content */}
                  {activeDay === index && (
                    <div className="mt-4 space-y-3 animate-in fade-in-50">
                      <div className="space-y-2">
                        <h4 className="font-medium text-himalaya-700">Today's Activities:</h4>
                        <ul className="list-disc list-inside text-himalaya-600 space-y-1">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="text-sm">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {day.overnight && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-himalaya-600">
                            <span className="font-medium">Overnight Stay:</span> {day.overnight}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Expand indicator */}
                <div className="self-center">
                  <ArrowRight className={cn(
                    "h-5 w-5 text-primary transition-transform",
                    activeDay === index ? "rotate-90" : ""
                  )} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}