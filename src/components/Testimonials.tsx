import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    relation: "Mother of Arjun (4 years)",
    rating: 5,
    text: "Little Leaders has been incredible for Arjun's development. The teachers genuinely care about each child's unique needs, and the blend of structured learning with creative play is perfect. He comes home excited to share what he learned every day!",
    location: "Motera Campus"
  },
  {
    id: 2,
    name: "Rajesh Patel",
    relation: "Father of Kavya (3 years)",
    rating: 5,
    text: "We're amazed by the holistic approach at Little Leaders. Kavya has grown so much in confidence and social skills. The facilities are top-notch, and the emphasis on values alongside academics is exactly what we wanted for our daughter.",
    location: "Mithakhali Campus"
  },
  {
    id: 3,
    name: "Meera Desai",
    relation: "Mother of twins Aarav & Anaya (5 years)",
    rating: 5,
    text: "Having twins with different personalities, I was worried about finding the right fit. Little Leaders has nurtured both their individual strengths beautifully. The school-readiness program has prepared them wonderfully for primary school.",
    location: "Motera Campus"
  },
  {
    id: 4,
    name: "Amit Kumar",
    relation: "Father of Sara (2.5 years)",
    rating: 5,
    text: "The transition to preschool was seamless thanks to the caring teachers at Little Leaders. Sara loves the swimming classes and the pet park especially. As working parents, we're grateful for the extended hours and nutritious meal programs.",
    location: "Mithakhali Campus"
  },
  {
    id: 5,
    name: "Neha Agarwal",
    relation: "Mother of Dev (4.5 years)",
    rating: 5,
    text: "The IIM alumni founding team brings such a professional yet warm approach to early childhood education. Dev's creativity has flourished in the art studio, and his mathematical thinking has developed remarkably through their play-based learning methods.",
    location: "Motera Campus"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Parents
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from families who've entrusted us with their children's early learning journey.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative p-8 md:p-12 bg-gradient-to-br from-white to-muted border-none shadow-xl overflow-hidden animate-fade-in">
            {/* Quote decoration */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-20 h-20 text-primary" />
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-primary fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-center text-foreground leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-1">
                  {currentTestimonial.name}
                </p>
                <p className="text-muted-foreground mb-2">
                  {currentTestimonial.relation}
                </p>
                <p className="text-sm text-primary font-medium">
                  {currentTestimonial.location}
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-12 h-12 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center animate-fade-in transition-all duration-300 hover:scale-110" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-4xl font-bold mb-2">
              100%
            </div>
            <p className="text-muted-foreground">Parent Satisfaction Rate</p>
          </div>
          <div className="text-center animate-fade-in transition-all duration-300 hover:scale-110" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent text-4xl font-bold mb-2">
              800+
            </div>
            <p className="text-muted-foreground">Happy Families</p>
          </div>
          <div className="text-center animate-fade-in transition-all duration-300 hover:scale-110" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-info to-primary bg-clip-text text-transparent text-4xl font-bold mb-2">
              5.0★
            </div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join Our Happy Family Community
            </h3>
            <p className="text-muted-foreground mb-6">
              Experience the Little Leaders difference for your child.
            </p>
            <Button variant="hero" size="lg">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;