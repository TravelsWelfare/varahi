
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919876543210?text=Hi! I'm interested in booking a Char Dham Yatra package. Could you please provide more information?`, "_blank");
  };

  return (
    <div className={`sticky-whatsapp transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <Button
        onClick={handleWhatsAppClick}
        className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center group relative"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute whitespace-nowrap right-full mr-3 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">
          Chat with us!
        </span>
      </Button>
    </div>
  );
};

export default WhatsAppButton;
