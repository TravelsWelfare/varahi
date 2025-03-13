import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Users, Calendar, Award, Heart, Shield, Star, Coffee, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>About Us | Varahi journey Char Dham Yatra</title>
        <meta 
          name="description" 
          content="Experience the divine Char Dham Yatra with authentic local cuisine, expert guides, and comprehensive safety measures. Your comfort is our priority." 
        />
      </Helmet>
      <Navbar />
      
      <main>
        {/* Enhanced Hero Section with Parallax Effect */}
        <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg')",
              transform: `scale(1.1) translateY(${scrollY * 0.1}px)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariant}
              className="max-w-4xl mx-auto"
            >
              <motion.span 
                variants={fadeInUpVariant} 
                custom={1}
                className="inline-block bg-primary/20 text-primary px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-lg font-medium backdrop-blur-sm"
              >
                Trusted by 10,000+ Pilgrims
              </motion.span>
              <motion.h1 
                variants={fadeInUpVariant} 
                custom={2}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 sm:mb-8 leading-tight"
              >
                Your Divine Journey <br />
                <span className="text-primary">Begins Here</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUpVariant} 
                custom={3}
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-12 leading-relaxed"
              >
                Experience the sacred Char Dham Yatra with unmatched comfort, 
                authentic local cuisine, and expert spiritual guidance.
              </motion.p>
              <motion.div 
                variants={fadeInUpVariant} 
                custom={4}
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-primary/20"
                >
                  Start Planning Your Yatra
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full mt-3 sm:mt-0 backdrop-blur-sm"
                >
                  Watch Customer Stories
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[120%] h-20 bg-white rounded-[100%_100%_0_0] z-10"></div>
        </section>

        {/* Enhanced Stats Section with Trust Indicators */}
        <section className="py-12 sm:py-16 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { number: "15+", label: "Years of Excellence", icon: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" /> },
                { number: "10k+", label: "Happy Pilgrims", icon: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" /> },
                { number: "50+", label: "Expert Local Guides", icon: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" /> },
                { number: "4.9", label: "Customer Rating", icon: <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  {stat.icon}
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-sm sm:text-base text-himalaya-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-16 sm:py-20 bg-himalaya-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-8 md:mb-16 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-medium text-base md:text-lg mb-3 md:mb-4 block">Our Commitment to You</span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-himalaya-800 mb-4 md:mb-6">
                Experience the Varahi journey Difference
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-himalaya-600">
                We go beyond traditional travel services to ensure your spiritual journey is 
                comfortable, safe, and deeply meaningful.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Expert Local Guides",
                  description: "15+ years experienced guides who know every spiritual and cultural aspect of the journey.",
                  highlight: "Certified Guides"
                },
                {
                  icon: <Coffee className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Home-Style Food",
                  description: "Traditional recipes prepared by local chefs using fresh ingredients from our own farms.",
                  highlight: "Pure Vegetarian"
                },
                {
                  icon: <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Complete Safety",
                  description: "24/7 police support, medical assistance, and emergency evacuation services.",
                  highlight: "ISO Certified"
                },
                {
                  icon: <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Personalized Care",
                  description: "Custom packages tailored to your needs, including special dietary requirements.",
                  highlight: "24/7 Support"
                },
                {
                  icon: <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Hidden Gems Access",
                  description: "Visit lesser-known spiritual spots and experience local traditions.",
                  highlight: "Exclusive Access"
                },
                {
                  icon: <Star className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />,
                  title: "Premium Comfort",
                  description: "Carefully selected accommodations with modern amenities and cleanliness.",
                  highlight: "5-Star Rated"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.01, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="absolute top-0 right-0 bg-primary/10 text-primary px-3 py-1 text-xs md:text-sm font-medium rounded-bl-xl">
                    {service.highlight}
                  </div>
                  <div className="bg-primary/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-himalaya-800 mb-2 md:mb-4">{service.title}</h3>
                  <p className="text-sm md:text-base text-himalaya-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Food & Hygiene Section with Staggered Animation */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <span className="text-primary font-medium text-base sm:text-lg mb-3 sm:mb-4 block">Pure & Traditional</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-himalaya-800 mb-4 sm:mb-8">
                  Authentic Local Cuisine with Modern Hygiene Standards
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-himalaya-600 mb-6 sm:mb-8">
                  Experience the taste of traditional Uttarakhand cuisine prepared with love and care, 
                  following strict hygiene protocols and using fresh, locally-sourced ingredients.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {[
                    "Fresh Farm Ingredients",
                    "Daily Sanitization",
                    "Pure Vegetarian Menu",
                    "Special Diet Options",
                    "Health Certifications",
                    "Local Chef Expertise"
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-himalaya-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 rounded-full shadow-lg hover:shadow-primary/20"
                >
                  View Sample Menu
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative mt-8 lg:mt-0"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Traditional local cuisine" 
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-himalaya-800 mb-1 sm:mb-2">
                        Traditional Garhwali Thali
                      </h3>
                      <p className="text-sm sm:text-base text-himalaya-600">
                        Experience the authentic taste of Uttarakhand with our carefully curated meals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-primary/10 rounded-full z-0"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-himalaya-100 rounded-full z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section with Improved Mobile Responsiveness */}
        <section className="py-16 sm:py-20 lg:py-24 bg-himalaya-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            <img 
              src="https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block bg-white/10 text-white px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-lg backdrop-blur-sm">
                  Limited Time Offer
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
                  Book Now and Save 15% <br />
                  <span className="text-primary">on Early Bird Packages</span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-12 max-w-2xl mx-auto">
                  Start your spiritual journey with peace of mind. Book now to secure your preferred dates 
                  and enjoy special early bird discounts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-primary/20"
                  >
                    Book Your Journey Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full mt-3 sm:mt-0 backdrop-blur-sm"
                  >
                    Download Brochure
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Testimonials Section */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-himalaya-800 to-transparent opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-medium text-base md:text-lg mb-3 md:mb-4 block">Pilgrim Stories</span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-himalaya-800 mb-4 md:mb-6">
                What Our Travelers Say
              </h2>
              <p className="text-base sm:text-lg text-himalaya-600">
                Hear from those who have experienced the divine journey with us
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "Rajesh Sharma",
                  location: "Delhi",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  quote: "The attention to detail and care provided by the Varahi team made our Char Dham Yatra truly memorable. The food was exceptional and the guides were knowledgeable."
                },
                {
                  name: "Priya Patel",
                  location: "Mumbai",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  quote: "As a solo female traveler, safety was my priority. Varahi Journey exceeded my expectations with their 24/7 support and well-planned itinerary."
                },
                {
                  name: "Suresh Iyer",
                  location: "Bangalore",
                  image: "https://randomuser.me/api/portraits/men/62.jpg",
                  quote: "The spiritual guidance provided during our yatra added depth to our journey. The accommodations were comfortable and the food was authentic and delicious."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 sm:p-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-himalaya-800">{testimonial.name}</h4>
                      <p className="text-sm text-himalaya-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-4 -left-2 text-primary/20 text-6xl font-serif">"</div>
                    <p className="text-himalaya-700 relative z-10 text-sm sm:text-base leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -bottom-8 -right-2 text-primary/20 text-6xl font-serif">"</div>
                  </div>
                  <div className="mt-6 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
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
