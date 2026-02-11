import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Calendar,
  Users,
  Clock,
  Building2,
  Leaf,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { baseUrl } from "@/App";

const EventRequestPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser?.name || "Student";
  
  const [step, setStep] = useState(1);
  // const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    purpose: "class",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/student/create-event`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          expectedParticipants: Number(formData.participants),
          purpose: formData.purpose,
          // roomId: selectedRoom, // optional, if backend supports
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      console.log("Data: ", data);

      setStep(3);
    } catch (error: any) {
      console.error("Event request failed:", error.message);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout userRole="student" userName={userName}>
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          {[
            { num: 1, label: "Event Details" },
            { num: 2, label: "Select Room" },
            { num: 3, label: "Confirmation" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${step >= s.num ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className="font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < 2 && (
                <div
                  className={`w-12 h-0.5 mx-4 ${step > s.num ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-2">
              Event Details
            </h2>
            <p className="text-muted-foreground mb-6">
              Tell us about your event so we can find the perfect room.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Annual Tech Fest Meeting"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your event..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-10"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      className="pl-10"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants">Expected Participants</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="participants"
                    type="number"
                    placeholder="25"
                    className="pl-10"
                    value={formData.participants}
                    onChange={(e) =>
                      setFormData({ ...formData, participants: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Purpose</Label>
                <RadioGroup
                  value={formData.purpose}
                  onValueChange={(value) =>
                    setFormData({ ...formData, purpose: value })
                  }
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {[
                    { id: "class", label: "Class" },
                    { id: "meeting", label: "Meeting" },
                    { id: "event", label: "Event" },
                    { id: "workshop", label: "Workshop" },
                  ].map((type) => (
                    <Label
                      key={type.id}
                      htmlFor={type.id}
                      className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.purpose === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <RadioGroupItem
                        value={type.id}
                        id={type.id}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Request <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Request Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your event request has been sent for approval. You'll receive a
              notification once it's processed.
            </p>

            <div className="bg-muted rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium mb-1">
                {formData.title || "Tech Fest Meeting"}
              </p>
              <p className="text-sm text-muted-foreground">
                Room A-105 • {formData.date || "Feb 10, 2024"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.startTime || "10:00"} - {formData.endTime || "12:00"}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-primary mb-6">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">
                +15 Green Points for choosing an eco-friendly room!
              </span>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() => setStep(1)}
              className="w-full"
            >
              Create Another Request
            </Button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default EventRequestPage;
