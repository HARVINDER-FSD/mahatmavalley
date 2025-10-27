import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VisitScheduler from "@/components/modals/VisitScheduler";
import { 
  TreePine, 
  Waves, 
  BookOpenCheck, 
  Music, 
  Heart, 
  Palette,
  Gamepad2
} from "lucide-react";
import playgroundImage from "@/assets/playground.jpg";
import libraryImage from "@/assets/library.jpg";

const facilities = [
  {
    id: 1,
    title: "Adventure Playground",
    icon: TreePine,
    color: "from-secondary to-secondary-soft",
    description: "Safe, modern playground equipment designed for different age groups with soft play surfaces.",
    fullDescription: "Our state-of-the-art playground features age-appropriate equipment including slides, swings, climbing structures, and sandbox areas. All equipment meets international safety standards with impact-absorbing surfaces and regular maintenance.",
    image: playgroundImage,
    features: ["Age-appropriate equipment", "Soft play surfaces", "Shaded areas", "Safety certified"]
  },
  {
    id: 2,
    title: "Swimming Pool", 
    icon: Waves,
    color: "from-info to-info-soft",
    description: "Child-friendly swimming pool with qualified instructors for water safety and basic swimming skills.",
    fullDescription: "Our heated swimming pool is designed specifically for young children with shallow areas and non-slip surfaces. Professional swim instructors provide water safety education and age-appropriate swimming lessons.",
    image: null,
    features: ["Heated water", "Shallow depth", "Professional instructors", "Safety equipment"]
  },
  {
    id: 3,
    title: "Learning Library",
    icon: BookOpenCheck,
    color: "from-primary to-primary-soft", 
    description: "Cozy reading spaces filled with age-appropriate books and interactive learning materials.",
    fullDescription: "Our library features thousands of carefully selected books, comfortable reading nooks, and interactive learning stations that encourage a love for reading and exploration.",
    image: libraryImage,
    features: ["Age-appropriate books", "Reading nooks", "Interactive stations", "Quiet study areas"]
  },
  {
    id: 4,
    title: "Music & Dance Room",
    icon: Music,
    color: "from-accent to-accent-soft",
    description: "Dedicated space for musical exploration with child-sized instruments and movement activities.",
    fullDescription: "Acoustically designed room with a variety of musical instruments, sound systems, and open space for creative movement and dance activities.",
    image: null,
    features: ["Musical instruments", "Sound systems", "Dance space", "Acoustic design"]
  },
  {
    id: 5,
    title: "Pet Park",
    icon: Heart,
    color: "from-secondary to-secondary-soft",
    description: "Safe interaction space with gentle animals to teach empathy and responsibility.",
    fullDescription: "Our supervised pet park allows children to interact with friendly animals, learning about care, empathy, and responsibility in a safe environment.",
    image: null,
    features: ["Gentle animals", "Supervised interaction", "Safety protocols", "Educational programs"]
  },
  {
    id: 8,
    title: "Art Studio",
    icon: Palette,
    color: "from-accent to-accent-soft", 
    description: "Creative space equipped with art supplies and tools for unlimited artistic expression.",
    fullDescription: "Well-lit art studio with easels, paints, clay, and various art materials where children can explore their creativity under guidance of art specialists.",
    image: null,
    features: ["Art supplies", "Natural lighting", "Easels & tables", "Specialist guidance"]
  },
  {
    id: 9,
    title: "Indoor Play Area",
    icon: Gamepad2,
    color: "from-secondary to-secondary-soft",
    description: "Weather-independent play space with soft play equipment and interactive games.",
    fullDescription: "Climate-controlled indoor play area with soft play structures, educational games, and interactive learning toys for year-round active play.",
    image: null,
    features: ["Soft play equipment", "Climate controlled", "Educational games", "Safety padded"]
  }
];

const Facilities = () => {
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);

  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            World-Class
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Facilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every corner of our campus is designed to inspire learning, creativity, and joyful exploration.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {facilities.map((facility, index) => {
            const IconComponent = facility.icon;
            return (
              <Dialog key={facility.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`p-6 card-hover cursor-pointer border-none shadow-lg animate-slide-up bg-gradient-to-br ${facility.color} text-white h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{facility.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${facility.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span>{facility.title}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {facility.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={facility.image}
                          alt={facility.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-muted-foreground leading-relaxed">
                      {facility.fullDescription}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        {/* Campus Tour CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Experience Our Campus Firsthand
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join us for a guided tour to see how our facilities create the perfect learning environment for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => setShowVisitScheduler(true)}>
                Schedule Campus Tour
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Open virtual tour link or contact for virtual tour
                  window.open('https://wa.me/919099921467?text=Hi! I would like to schedule a virtual tour of your facilities. Could you please help me with this?', '_blank');
                }}
              >
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <VisitScheduler
        isOpen={showVisitScheduler}
        onClose={() => setShowVisitScheduler(false)}
      />
    </section>
  );
};

export default Facilities;