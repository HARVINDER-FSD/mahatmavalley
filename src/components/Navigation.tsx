import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import LeadForm from "@/components/modals/LeadForm";
import VisitScheduler from "@/components/modals/VisitScheduler";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/favicon.png"
              alt="Mahatma Valley Pre-school Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Mahatma Valley</h1>
              <p className="text-sm text-muted-foreground">Pre-school</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Home
            </a>
            <a href="/#about" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              About
            </a>
            <a href="/#programs" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Programs
            </a>
            <a href="/#facilities" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Facilities
            </a>
            <a href="/gallery" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Gallery
            </a>
            <a href="/#contact" className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Contact
            </a>
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+919099921467"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                +91 9099921467
              </a>
            </div>
            <Button variant="hero" size="sm" onClick={() => setShowLeadForm(true)}>
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary-soft"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="/#about"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="/#programs"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Programs
              </a>
              <a
                href="/#facilities"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Facilities
              </a>
              <a
                href="/gallery"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Gallery
              </a>
              <a
                href="/#contact"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:+919099921467"
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    +91 9099921467
                  </a>
                </div>
                <Button variant="hero" size="sm" className="w-full" onClick={() => setShowLeadForm(true)}>
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <LeadForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        type="application"
      />

      <VisitScheduler
        isOpen={showVisitScheduler}
        onClose={() => setShowVisitScheduler(false)}
      />
    </nav>
  );
};

export default Navigation;