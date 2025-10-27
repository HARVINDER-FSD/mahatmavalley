import { Button } from "@/components/ui/button";
import { Calendar, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-preschool-new.jpg";
import { useState } from "react";
import LeadForm from "@/components/modals/LeadForm";
import VisitScheduler from "@/components/modals/VisitScheduler";

const Hero = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Happy children learning and playing at Mahatma Valley Pre-school"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            Nurturing Tomorrow's
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              Leaders
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Where curiosity meets care, and every child's unique potential is celebrated and nurtured through play-based learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="animate-bounce-gentle w-full sm:w-auto"
              onClick={() => setShowLeadForm(true)}
            >
              Apply Now for 2025-26
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground w-full sm:w-auto"
              onClick={() => setShowVisitScheduler(true)}
            >
              Schedule a Visit
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-fade-in transition-all duration-300 hover:bg-white/20 hover:scale-105" style={{ animationDelay: '0.3s' }}>
              <div className="bg-primary/20 p-2 rounded-full">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm sm:text-base">800 +</p>
                <p className="text-white/80 text-xs sm:text-sm">Happy Families</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-fade-in transition-all duration-300 hover:bg-white/20 hover:scale-105" style={{ animationDelay: '0.5s' }}>
              <div className="bg-secondary/20 p-2 rounded-full">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm sm:text-base">36 +</p>
                <p className="text-white/80 text-xs sm:text-sm">Years of Educating India</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-fade-in transition-all duration-300 hover:bg-white/20 hover:scale-105" style={{ animationDelay: '0.7s' }}>
              <div className="bg-accent/20 p-2 rounded-full">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm sm:text-base">Founder :</p>
                <p className="text-white/80 text-xs sm:text-sm">IIM Ahmedabad Alumni</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
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
      </div>
    </section>
  );
};

export default Hero;