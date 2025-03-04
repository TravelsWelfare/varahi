
import { MapPin, Users, Award, Clock, Shield, Heart } from "lucide-react";

const AboutContent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our team planning Char Dham journey" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-himalaya-800">10+ Years Experience</h3>
                  <p className="text-himalaya-600 text-sm">Serving pilgrims with dedication</p>
                </div>
              </div>
              <div className="h-1 w-20 bg-primary mb-4"></div>
              <p className="text-himalaya-700">
                We've guided thousands of pilgrims on their sacred journey to the Char Dham shrines.
              </p>
            </div>
          </div>
          
          {/* Right column: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-6">
              Our Story & Mission
            </h2>
            <p className="text-himalaya-600 mb-6">
              Founded in 2012, Varahi journey was born from a deep passion for spiritual journey and 
              a recognition that pilgrims deserved better service, comfort, and guidance during their 
              sacred Char Dham Yatra.
            </p>
            <p className="text-himalaya-600 mb-8">
              Our mission is to transform the traditional pilgrimage experience by combining authentic 
              spiritual practices with modern comforts, making the divine journey accessible to all devotees, 
              regardless of age or physical capability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-3 h-min">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-himalaya-800 mb-2">Local Expertise</h3>
                  <p className="text-himalaya-600 text-sm">
                    Deep knowledge of routes, accommodations, and sacred traditions
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-3 h-min">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-himalaya-800 mb-2">Small Groups</h3>
                  <p className="text-himalaya-600 text-sm">
                    Personalized attention with focused spiritual guidance
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-3 h-min">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-himalaya-800 mb-2">24/7 Support</h3>
                  <p className="text-himalaya-600 text-sm">
                    Continuous assistance throughout your spiritual journey
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 rounded-full p-3 h-min">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-himalaya-800 mb-2">Safety First</h3>
                  <p className="text-himalaya-600 text-sm">
                    Comprehensive medical support and emergency preparations
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 border-t border-gray-200 pt-6">
              <Heart className="h-12 w-12 text-primary" />
              <p className="text-himalaya-700 font-medium italic">
                "Our deepest fulfillment comes from connecting pilgrims with the divine energy of the 
                Char Dham shrines, creating memories and spiritual growth that last a lifetime."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
