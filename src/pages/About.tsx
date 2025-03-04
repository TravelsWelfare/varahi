import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Users, Calendar, Award, Heart, Shield, Star, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us | Varahi journey Char Dham Yatra</title>
        <meta 
          name="description" 
          content="Experience the divine Char Dham Yatra with authentic local cuisine, expert guides, and comprehensive safety measures. Your comfort is our priority." 
        />
      </Helmet>
      <Navbar />
      
      <main>
        {/* Enhanced Hero Section with Video Background */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              transform: "scale(1.1)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-primary/20 text-primary px-6 py-2 rounded-full mb-6 text-lg font-medium">
                Trusted by 10,000+ Pilgrims
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
                Your Divine Journey <br />
                <span className="text-primary">Begins Here</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the sacred Char Dham Yatra with unmatched comfort, 
                authentic local cuisine, and expert spiritual guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full transform transition hover:scale-105"
                >
                  Start Planning Your Yatra
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
                >
                  Watch Customer Stories
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Stats Section with Trust Indicators */}
        <section className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "15+", label: "Years of Excellence", icon: <Award className="h-8 w-8 text-primary mb-4" /> },
                { number: "10k+", label: "Happy Pilgrims", icon: <Users className="h-8 w-8 text-primary mb-4" /> },
                { number: "50+", label: "Expert Local Guides", icon: <MapPin className="h-8 w-8 text-primary mb-4" /> },
                { number: "4.9", label: "Customer Rating", icon: <Star className="h-8 w-8 text-primary mb-4" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.icon}
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-himalaya-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-20 bg-himalaya-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-lg mb-4 block">Our Commitment to You</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-himalaya-800 mb-6">
                Experience the Varahi journey Difference
              </h2>
              <p className="text-xl text-himalaya-600">
                We go beyond traditional travel services to ensure your spiritual journey is 
                comfortable, safe, and deeply meaningful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-12 w-12 text-primary" />,
                  title: "Expert Local Guides",
                  description: "15+ years experienced guides who know every spiritual and cultural aspect of the journey.",
                  highlight: "Certified Guides"
                },
                {
                  icon: <Coffee className="h-12 w-12 text-primary" />,
                  title: "Home-Style Food",
                  description: "Traditional recipes prepared by local chefs using fresh ingredients from our own farms.",
                  highlight: "Pure Vegetarian"
                },
                {
                  icon: <Shield className="h-12 w-12 text-primary" />,
                  title: "Complete Safety",
                  description: "24/7 police support, medical assistance, and emergency evacuation services.",
                  highlight: "ISO Certified"
                },
                {
                  icon: <Heart className="h-12 w-12 text-primary" />,
                  title: "Personalized Care",
                  description: "Custom packages tailored to your needs, including special dietary requirements.",
                  highlight: "24/7 Support"
                },
                {
                  icon: <MapPin className="h-12 w-12 text-primary" />,
                  title: "Hidden Gems Access",
                  description: "Visit lesser-known spiritual spots and experience local traditions.",
                  highlight: "Exclusive Access"
                },
                {
                  icon: <Star className="h-12 w-12 text-primary" />,
                  title: "Premium Comfort",
                  description: "Carefully selected accommodations with modern amenities and cleanliness.",
                  highlight: "5-Star Rated"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute top-0 right-0 bg-primary/10 text-primary px-4 py-1 text-sm font-medium rounded-bl-xl">
                    {service.highlight}
                  </div>
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-himalaya-800 mb-4">{service.title}</h3>
                  <p className="text-himalaya-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Food & Hygiene Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <span className="text-primary font-medium text-lg mb-4 block">Pure & Traditional</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-himalaya-800 mb-8">
                  Authentic Local Cuisine with Modern Hygiene Standards
                </h2>
                <p className="text-xl text-himalaya-600 mb-8">
                  Experience the taste of traditional Uttarakhand cuisine prepared with love and care, 
                  following strict hygiene protocols and using fresh, locally-sourced ingredients.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    "Fresh Farm Ingredients",
                    "Daily Sanitization",
                    "Pure Vegetarian Menu",
                    "Special Diet Options",
                    "Health Certifications",
                    "Local Chef Expertise"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-himalaya-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 rounded-full"
                >
                  View Sample Menu
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Traditional local cuisine" 
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-himalaya-800 mb-2">
                        Traditional Garhwali Thali
                      </h3>
                      <p className="text-himalaya-600">
                        Experience the authentic taste of Uttarakhand with our carefully curated meals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-himalaya-100 rounded-full z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-himalaya-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            <img 
              src="https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block bg-white/10 text-white px-6 py-2 rounded-full mb-6 text-lg backdrop-blur-sm">
                  Limited Time Offer
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  Book Now and Save 15% <br />
                  <span className="text-primary">on Early Bird Packages</span>
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                  Start your spiritual journey with peace of mind. Book now to secure your preferred dates 
                  and enjoy special early bird discounts.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 rounded-full transform transition hover:scale-105"
                  >
                    Book Your Journey Now
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6 rounded-full"
                  >
                    Download Brochure
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
