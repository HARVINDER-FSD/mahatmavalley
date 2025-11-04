import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendVisitScheduleEmail } from "@/lib/email";

interface VisitSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitScheduler = ({ isOpen, onClose }: VisitSchedulerProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const campuses = [
    { value: "motera", label: "Motera Campus", address: "Motera, Ahmedabad" },
    { value: "mithakhali", label: "Mithakhali Campus", address: "Mithakhali, Ahmedabad" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedCampus || !parentName || !phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendVisitScheduleEmail({
        parentName,
        phone,
        email,
        preferredDate: format(selectedDate, 'PPP'),
        preferredTime: selectedTime,
        campus: selectedCampus
      });

      toast({
        title: "Visit Scheduled!",
        description: `Your visit is confirmed for ${format(selectedDate, 'PPP')} at ${selectedTime}`
      });

      onClose();
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedCampus("");
      setParentName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Failed to schedule visit",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Schedule Campus Visit
          </DialogTitle>
          <DialogDescription>
            Book a personalized tour of Mahatma Valley Pre-school campus
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campus Selection */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Select Campus *</Label>
            <Select onValueChange={setSelectedCampus} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose your preferred campus" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((campus) => (
                  <SelectItem key={campus.value} value={campus.value}>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{campus.label}</div>
                        <div className="text-sm text-muted-foreground">{campus.address}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Select Date *</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" side="bottom">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false); // Close calendar immediately after selection
                    }}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Select Time *</Label>
              <Select onValueChange={setSelectedTime} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VisitScheduler;