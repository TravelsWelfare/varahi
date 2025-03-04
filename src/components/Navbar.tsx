import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { PreloadLink } from "./PreloadLink";

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled?: boolean;
}

const NavLink = ({ href, label, isScrolled }: NavLinkProps) => (
  <PreloadLink
    to={href}
    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isScrolled ? "text-himalaya-600 hover:text-himalaya-800" : "text-white hover:text-white/80"
    }`}
  >
    {label}
  </PreloadLink>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <PreloadLink to="/" className="flex items-center">
            <h1 className={`text-2xl font-display font-bold ${isScrolled ? "text-himalaya-800" : "text-white text-shadow"}`}>
              Varahi journey
            </h1>
          </PreloadLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" isScrolled={isScrolled} />
            <NavLink href="/about" label="About Us" isScrolled={isScrolled} />
            <NavLink href="/packages" label="Packages" isScrolled={isScrolled} />
            <NavLink href="/blog" label="Blog" isScrolled={isScrolled} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Phone size={18} />
              <span className={isScrolled ? "text-himalaya-800" : "text-white"}>
                +91 1234567890
              </span>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.location.href = "/contact"}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${
              isScrolled ? "bg-himalaya-800" : "bg-white"
            }`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${
              isScrolled ? "bg-himalaya-800" : "bg-white"
            }`} />
            <div className={`w-6 h-0.5 transition-all ${
              isScrolled ? "bg-himalaya-800" : "bg-white"
            }`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-2">
              <NavLink href="/" label="Home" isScrolled={true} />
              <NavLink href="/about" label="About Us" isScrolled={true} />
              <NavLink href="/packages" label="Packages" isScrolled={true} />
              <NavLink href="/blog" label="Blog" isScrolled={true} />
              <NavLink href="/contact" label="Contact" isScrolled={true} />
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
