import { Instagram, Twitter, Facebook, Phone, Mail, MapPin, Heart } from "lucide-react";
import { PreloadLink } from "./PreloadLink";
import { Button } from "@/components/ui/button";

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <PreloadLink 
      to={href} 
      className="text-himalaya-600 hover:text-primary transition-colors"
    >
      {label}
    </PreloadLink>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-himalaya-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-display font-semibold text-himalaya-800 mb-4">
              Varahi journey
            </h3>
            <p className="text-himalaya-700 mb-4">
              Making your Char Dham Yatra a divine, peaceful, and enriching experience with personalized care and comfort.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-himalaya-600 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-himalaya-600 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-himalaya-600 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-himalaya-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/packages" label="Travel Packages" />
              <FooterLink href="/testimonials" label="Testimonials" />
              <FooterLink href="/blog" label="Travel Blog" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold text-himalaya-800 mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <FooterLink href="/destinations/kedarnath" label="Kedarnath" />
              <FooterLink href="/destinations/badrinath" label="Badrinath" />
              <FooterLink href="/destinations/gangotri" label="Gangotri" />
              <FooterLink href="/destinations/yamunotri" label="Yamunotri" />
              <FooterLink href="/destinations/rishikesh" label="Rishikesh" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-himalaya-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-primary mt-1 mr-2" />
                <p className="text-himalaya-700">
                  123 Seva Marg, <br />
                  Rishikesh, Uttarakhand 249201
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-primary mr-2" />
                <p className="text-himalaya-700">+91 98765XXXXX</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-primary mr-2" />
                <p className="text-himalaya-700">info@Varahijourney.com</p>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-himalaya-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-himalaya-600 text-sm">
              © {new Date().getFullYear()} Varahi journey. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-sm text-himalaya-600 flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> by Varahi journey Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
