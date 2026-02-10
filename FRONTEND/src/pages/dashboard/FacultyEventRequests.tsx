import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { baseUrl } from "@/App";

const FacultyEventRequests = () => {
  const [events, setEvents] = useState<any[]>([]);

  const handleStatusChange = async (
    eventId: string,
    status: "Approved" | "Rejected",
  ) => {
    try {
      const res = await fetch(`${baseUrl}/api/staff/event/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ eventId, status }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error("Failed to update status");

      setEvents((prev) =>
        prev.map((e) => (e._id === eventId ? data.event : e)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/staff/get-all-events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error("Failed to fetch events");

        setEvents(data.events);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <DashboardLayout userRole="faculty" userName="Faculty / HOD">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Event Confirmation Requests</h2>

        {events.map((event) => (
          <Card key={event._id} className="border-l-4 border-primary">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {event.title}

                <Badge
                  variant={
                    event.status === "Rejected"
                      ? "destructive"
                      : event.status === "Pending"
                        ? "outline"
                        : "secondary"
                  }
                  className={
                    event.status === "Approved"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : ""
                  }
                >
                  {event.status}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <b>Requested By:</b> {event.studentId}
              </p>
              <p>
                <b>Date:</b> {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <b>Time:</b> {event.startTime} – {event.endTime}
              </p>
              <p>
                <b>Participants:</b> {event.expectedParticipants}
              </p>
              <p>
                <b>Purpose:</b> {event.purpose}
              </p>

              {event.status === "Pending" && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="hero"
                    onClick={() => handleStatusChange(event._id, "Approved")}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleStatusChange(event._id, "Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FacultyEventRequests;
