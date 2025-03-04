import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle, Calendar, Shield, Star, Users, ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    tourDate: "",
    packageType: "standard",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Booking Request Received!",
      description: "Our team will contact you within 2 hours to confirm your booking.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      tourDate: "",
      packageType: "standard",
    });
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Delhi",
      quote: "The best decision I made was booking with Varahi journey. Their attention to detail and care made our Char Dham Yatra truly divine.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      location: "Mumbai",
      quote: "From the moment I contacted them, I felt I was in good hands. The team arranged everything perfectly, and the local food was amazing!",
      rating: 5,
    },
    {
      name: "Suresh Kumar",
      location: "Bangalore",
      quote: "As senior citizens, we were worried about the journey, but their guides took such good care of us. Highly recommend!",
      rating: 5,
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Book Your Char Dham Yatra | Varahi journey</title>
        <meta 
          name="description" 
          content="Book your divine Char Dham Yatra journey today with Varahi journey. Limited spots available for the upcoming season. Secure your spiritual journey now!" 
        />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section with Urgency */}
        <section className="relative pt-20 bg-gradient-to-b from-himalaya-800 to-himalaya-700 text-white">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
               style={{backgroundImage: "url('https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"}}></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block bg-primary/20 text-primary px-6 py-2 rounded-full mb-6 text-lg font-medium backdrop-blur-sm">
                  Limited Spots Available for 2024 Season
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                  Book Your Sacred <span className="text-primary">Char Dham Journey</span> Today
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  Secure your spot now for the most comfortable and authentic spiritual experience. 
                  Our packages are filling up fast for the upcoming season.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Next available departure: </span>
                    <span className="font-bold text-primary">May 15, 2024</span>
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm ml-2">
                      Only 8 spots left
                    </span>
                  </div>
                </div>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full animate-pulse"
                  onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Book Now & Save 15%
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="container mx-auto px-4 pb-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { icon: <Users className="h-6 w-6" />, text: "10,000+ Happy Pilgrims" },
                  { icon: <Star className="h-6 w-6" />, text: "4.9/5 Customer Rating" },
                  { icon: <Shield className="h-6 w-6" />, text: "100% Secure Booking" },
                  { icon: <CheckCircle className="h-6 w-6" />, text: "Govt. Authorized" }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-primary/20 p-3 rounded-full mb-3">
                      {item.icon}
                    </div>
                    <p className="text-white text-sm md:text-base font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Enhanced Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Enhanced Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="booking-form"
                className="bg-white p-8 rounded-xl shadow-xl border border-primary/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 rounded-bl-xl font-medium">
                  Fast-Track Booking
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-himalaya-800 mb-2">Book Your Journey Now</h2>
                <p className="text-himalaya-600 mb-6">Fill this form to secure your spot. We'll contact you within 2 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Your contact number"
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tourDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Travel Date*
                      </label>
                      <Input
                        id="tourDate"
                        name="tourDate"
                        type="date"
                        value={formData.tourDate}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-1">
                        Package Type*
                      </label>
                      <select
                        id="packageType"
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary py-2 px-3"
                      >
                        <option value="standard">Standard Package</option>
                        <option value="premium">Premium Package</option>
                        <option value="deluxe">Deluxe Package</option>
                        <option value="custom">Custom Package</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions?"
                      rows={3}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-himalaya-800">Early Bird Discount</h4>
                        <p className="text-sm text-himalaya-600">Book now and get 15% off on all packages for the upcoming season!</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-lg"
                  >
                    Secure Your Booking Now
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                    No payment required at this stage.
                  </p>
                </form>
              </motion.div>

              {/* Contact Information and Testimonials */}
              <div className="space-y-10">
                {/* Direct Contact Options */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-himalaya-50 p-8 rounded-xl border border-gray-100"
                >
                  <h2 className="text-2xl font-display font-bold text-himalaya-800 mb-6">
                    Need Immediate Assistance?
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Call Us Directly</h3>
                        <p className="text-primary font-bold text-lg">+91 98765XXXXX</p>
                        <p className="text-gray-600 text-sm">Available 9:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email Us</h3>
                        <p className="text-primary font-bold">bookings@Varahijourney.com</p>
                        <p className="text-gray-600 text-sm">We respond within 2 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">WhatsApp Us</h3>
                        <p className="text-green-600 font-bold">+91 98765XXXXX</p>
                        <p className="text-gray-600 text-sm">Instant responses</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Testimonials */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-display font-bold text-himalaya-800 mb-6">
                    What Our Pilgrims Say
                  </h2>
                  
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                            <p className="text-gray-600 text-sm">{testimonial.location}</p>
                          </div>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        <div className="absolute -top-2 -left-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                          "
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline"
                      className="text-primary border-primary hover:bg-primary/10"
                      onClick={() => window.open("#", "_blank")}
                    >
                      Read More Reviews <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Enhanced Design */}
        <section className="py-16 bg-himalaya-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-display font-bold text-himalaya-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-himalaya-600">
                Get quick answers to common questions about booking your Char Dham Yatra
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  question: "How can I book a Char Dham tour?",
                  answer: "You can book by filling out our booking form above, calling us directly, or via WhatsApp. We'll confirm your booking within 2 hours and guide you through the next steps."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit/debit cards, bank transfers, and digital payment methods like PayTM, Google Pay, and PhonePe. We offer secure payment options with installment facilities."
                },
                {
                  question: "Do you offer customized tour packages?",
                  answer: "Yes, we specialize in creating customized tour packages based on your preferences, budget, and time constraints. Our experts will work with you to design the perfect itinerary."
                },
                {
                  question: "How far in advance should I book?",
                  answer: "We recommend booking at least 2-3 months in advance, especially during peak season (May-June and September-October). Early booking ensures better accommodation options and special discounts."
                },
                {
                  question: "What's included in your packages?",
                  answer: "Our packages include accommodation, meals, transportation, guide services, all temple arrangements, and necessary permits. Premium packages also include special pujas and additional comfort features."
                },
                {
                  question: "Is there a cancellation policy?",
                  answer: "Yes, we offer flexible cancellation. Full refund for cancellations 30+ days before departure, 75% refund for 15-29 days, and 50% refund for 7-14 days. Special circumstances are considered case by case."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-himalaya-800 text-lg flex items-start gap-3">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                      Q
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 mt-3 ml-9">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-himalaya-600 mb-6">
                Still have questions? We're here to help you plan your perfect pilgrimage.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Final CTA Banner */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                  Ready to Begin Your Sacred Journey?
                </h2>
                <p className="text-white/90 mt-2">
                  Limited spots available for the upcoming season. Book now to secure your dates.
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
