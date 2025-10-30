import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { sendLeadEmail } from "@/lib/email";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'application' | 'inquiry';
}

const LeadForm = ({ isOpen, onClose, type }: LeadFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    campus: "",
    preferredStartDate: "",
    program: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.parentName || !formData.email || !formData.phone || !formData.childName) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendLeadEmail({
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        childName: formData.childName,
        childAge: formData.childAge || formData.program,
        campus: formData.campus,
        preferredStartDate: formData.preferredStartDate || "2025-26"
      });
      
      toast({
        title: type === 'application' ? "Application Submitted!" : "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours."
      });
      
      onClose();
      // Reset form
      setFormData({
        parentName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        campus: "",
        preferredStartDate: "",
        program: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Failed to submit",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {type === 'application' ? 'Apply for 2025-26' : 'Submit Inquiry'}
          </DialogTitle>
          <DialogDescription>
            {type === 'application' 
              ? 'Start your child\'s journey with Mahatma Valley Pre-school'
              : 'Get more information about our programs and facilities'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parentName">Parent/Guardian Name *</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name *</Label>
              <Input
                id="childName"
                value={formData.childName}
                onChange={(e) => handleInputChange('childName', e.target.value)}
                placeholder="Child's full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campus">Preferred Campus</Label>
            <Select onValueChange={(value) => handleInputChange('campus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motera">Motera Campus</SelectItem>
                <SelectItem value="mithakhali">Mithakhali Campus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === 'application' && (
            <div className="space-y-2">
              <Label htmlFor="program">Program Interest</Label>
              <Select onValueChange={(value) => handleInputChange('program', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eyp">EYP – 1.5+ to 2 years & above</SelectItem>
                  <SelectItem value="pre-k">PRE K – 3 years & above</SelectItem>
                  <SelectItem value="k1">K1 – 4 years & above</SelectItem>
                  <SelectItem value="k2">K2 – 5 years & above</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Any specific questions or requirements..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (type === 'application' ? 'Submit Application' : 'Send Inquiry')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;