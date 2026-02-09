import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const eventRequests = [
  {
    id: 1,
    title: "Tech Fest Meeting",
    student: "Rahul Sharma",
    date: "15-03-2026",
    time: "10:00 AM – 12:00 PM",
    participants: 60,
    purpose: "Event",
  },
];

const FacultyEventRequests = () => {
  return (
    <DashboardLayout userRole="faculty" userName="Faculty / HOD">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Event Confirmation Requests</h2>

        {eventRequests.map((event) => (
          <Card key={event.id} className="border-l-4 border-primary">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {event.title}
                <Badge variant="outline">Pending</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p><b>Requested By:</b> {event.student}</p>
              <p><b>Date:</b> {event.date}</p>
              <p><b>Time:</b> {event.time}</p>
              <p><b>Participants:</b> {event.participants}</p>
              <p><b>Purpose:</b> {event.purpose}</p>

              <div className="flex gap-3 pt-4">
                <Button variant="hero">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FacultyEventRequests;
