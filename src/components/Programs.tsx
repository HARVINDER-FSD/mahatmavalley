import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Baby, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import VisitScheduler from "@/components/modals/VisitScheduler";

const programs = [
  {
    id: 1,
    title: "Early Year Program (EYP)",
    ageRange: "1,5 - 2 year + above",
    icon: Baby,
    color: "from-primary to-primary-soft",
    description: "First steps into social learning with sensory exploration and basic skills development.",
    highlights: [
      "Sensory play & exploration",
      "Social interaction basics", 
      "Motor skills development",
      "Art & craft activities"
    ]
  },
  {
    id: 2,
    title: "Pre K",
    ageRange: "3 year + above",
    icon: Sparkles,
    color: "from-secondary to-secondary-soft",
    description: "Building independence and creativity through structured play and early learning activities.",
    highlights: [
      "Language development",
      "Creative expression",
      "Independence building",
      "Nature exploration"
    ]
  },
  {
    id: 3,
    title: "K1",
    ageRange: "4 year + above",
    icon: BookOpen,
    color: "from-accent to-accent-soft",
    description: "Introduction to formal learning concepts while maintaining the joy of discovery.",
    highlights: [
      "Pre-reading & writing",
      "Number concepts",
      "Scientific thinking",
      "Cultural awareness"
    ]
  },
  {
    id: 4,
    title: "K2",
    ageRange: "5 year + above",
    icon: GraduationCap,
    color: "from-info to-info-soft",
    description: "Preparing for primary school with advanced skills and confident independence.",
    highlights: [
      "Reading fluency",
      "Mathematical concepts",
      "Leadership skills",
      "School readiness"
    ]
  }
];

const Programs = () => {
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);
  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Age-Appropriate 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Programs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully designed programs that grow with your child, fostering development at every stage.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card
                key={program.id}
                className={`p-6 card-hover cursor-pointer border-none shadow-lg animate-slide-up bg-gradient-to-br ${program.color} text-white`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-6">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <p className="text-white/90 font-medium">{program.ageRange}</p>
                </div>

                <p className="text-white/90 text-center mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-2">
                  {program.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-white/90">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Begin Your Child's Learning Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Schedule a campus visit to see our programs in action and meet our caring educators.
            </p>
            <Button variant="hero" size="lg" onClick={() => setShowVisitScheduler(true)}>
              Book Campus Visit
            </Button>
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

export default Programs;