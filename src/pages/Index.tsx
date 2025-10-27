import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import Contact from "@/components/Contact";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Programs />
        <Facilities />
        <Testimonials />
        <VideoTestimonials />
        <Contact />
      </main>
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/favicon.png" 
                  alt="Mahatma Valley Pre-school Logo"
                  className="w-8 h-8 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">Mahatma Valley Pre-school</h3>
                  <p className="text-sm text-white/80">Nurturing Tomorrow's Leaders</p>
                </div>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Where curiosity meets care, and every child's unique potential is celebrated through innovative, play-based learning approaches at Mahatma Valley.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/mahatma_valley/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                  aria-label="Visit our Instagram profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Facilities</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Motera Campus:<br />+91 9099921467</p>
                <p>Mithakhali Campus:<br />+91 9099921467</p>
                <p>mahatmavalley@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2024 Mahatma Valley Pre-school. All rights reserved. | Designed with ❤️ for children</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
