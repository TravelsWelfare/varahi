import { Shield, Users, Award, Clock, Heart, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "30,000+ Happy Travelers",
    description: "Join our growing family of pilgrims who've experienced the divine journey with our expert guidance and care."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Guaranteed Darshan",
    description: "We ensure you get hassle-free darshan at all temple locations with our special darshan assistance."
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Handpicked Accommodations",
    description: "Stay in the best available hotels at each location, personally verified by our team for quality and comfort."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "24/7 Customer Support",
    description: "Our dedicated team is always available to assist you throughout your journey, ensuring a worry-free experience."
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Personalized Care",
    description: "We treat every traveler like family, offering customized services based on your specific needs and preferences."
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: "Expert Local Guides",
    description: "Our knowledgeable guides share deep insights about the spiritual significance of each destination."
  }
];

const WhyChooseUsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-himalaya-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold mb-2 block">Your Trusted Travel Partner</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
            Why Choose Varahi journey?
          </h2>
          <p className="text-himalaya-600 text-lg">
            We're not just a travel agency; we're your spiritual journey partner. Here's why thousands of pilgrims trust us.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl bg-white border border-himalaya-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transform transition-transform hover:scale-110 duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-himalaya-800 mb-3">{feature.title}</h3>
              <p className="text-himalaya-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
            onClick={() => window.location.href = '/contact'}
          >
            Book Your Yatra Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
