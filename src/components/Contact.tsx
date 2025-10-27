import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import VisitScheduler from "@/components/modals/VisitScheduler";
import { sendContactEmail } from "@/lib/email";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle
} from "lucide-react";

const campuses = [
  {
    id: 1,
    name: "Motera Campus",
    address: "Opposite Shrusti Arcade, T.P, 44, Visat Gandhinagar Highway, Chandkheda, Ahmedabad, Gujarat 382424 : motera address",
    phone: "+91 9099921467",
    email: "mahatmavalley@gmail.com",
    timings: "Mon-Fri: 7:30 AM - 6:30 PM\nSat: 8:00 AM - 12:00 PM",
    mapUrl: "https://maps.app.goo.gl/domvkTu4NNp254xF7"
  },
  {
    id: 2,
    name: "Mithakhali Campus",
    address: "1, Triveni Duplex, Mithakhali Cir, opp. Mangal Vidhyalay, Maharashtra Society, Navrangpura, Ahmedabad, Gujarat 380006",
    phone: "+91 9099921467",
    email: "mahatmavalley@gmail.com",
    timings: "Mon-Fri: 7:30 AM - 6:30 PM\nSat: 8:00 AM - 12:00 PM",
    mapUrl: "https://maps.app.goo.gl/WWs6MtEhDZ6w8sjU6"
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    campus: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);

      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          campus: "",
          message: ""
        });
      }, 3000);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDirections = (mapUrl: string) => {
    window.open(mapUrl, '_blank');
  };

  const openWhatsApp = (phone: string, campusName: string) => {
    const message = encodeURIComponent(`Hello! I'm interested in learning more about admission at ${campusName}. Could you please provide more information?`);
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to begin your child's learning journey? Contact us to schedule a visit or learn more about our programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="p-8 shadow-lg border-none bg-gradient-to-br from-white to-muted">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-muted-foreground">
                    Thank you for your inquiry. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Parent Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="campus" className="text-foreground">Preferred Campus</Label>
                    <select
                      id="campus"
                      value={formData.campus}
                      onChange={(e) => handleInputChange("campus", e.target.value)}
                      className="mt-1 w-full h-10 px-3 border border-input bg-background rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="">Select Campus</option>
                      <option value="motera">Motera Campus</option>
                      <option value="mithakhali">Mithakhali Campus</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your child and any specific questions you have..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {campuses.map((campus, index) => (
              <Card key={campus.id} className="p-6 shadow-lg border-none bg-gradient-to-br from-white to-muted transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                <h3 className="text-xl font-bold text-foreground mb-4">{campus.name}</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{campus.address}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href={`tel:${campus.phone}`} className="text-muted-foreground hover:text-secondary transition-colors">
                      {campus.phone}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <a href={`mailto:${campus.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {campus.email}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-info mt-1 flex-shrink-0" />
                    <div className="text-muted-foreground">
                      {campus.timings.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openDirections(campus.mapUrl)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => openWhatsApp(campus.phone, campus.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </Card>
            ))}

            {/* Quick Contact Options */}
            <Card className="p-6 shadow-lg border-none bg-gradient-to-r from-primary/10 to-accent/10 animate-fade-in transition-all duration-300 hover:shadow-xl" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full transition-transform duration-300 hover:scale-105"
                  onClick={() => window.open('tel:+919099921467', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full transition-transform duration-300 hover:scale-105"
                  onClick={() => openWhatsApp('+91 9099921467', 'Mahatma Valley Pre-school')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="w-full transition-transform duration-300 hover:scale-105"
                  onClick={() => window.open('mailto:mahatmavalley@gmail.com', '_self')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-secondary/10 to-info/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Have Questions? We're Here to Help!
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our frequently asked questions or schedule a personal consultation with our admission team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('#faqs', '_self')}
              >
                View FAQs
              </Button>
              <Button variant="hero" size="lg" onClick={() => setShowVisitScheduler(true)}>
                Schedule Consultation
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

export default Contact;