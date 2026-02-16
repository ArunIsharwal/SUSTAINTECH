import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { baseUrl } from "@/App";

const getBadgeVariant = (status?: string) => {
  if (status === "approved") return "default";
  if (status === "rejected") return "destructive";
  return "outline";
};

const FacultyMaintenanceStatus = () => {
  const [events, setEvents] = useState<any[]>([]);

  const handleGivePoints = async (event) => {
    try {
      const res = await fetch(`${baseUrl}/api/staff/give-green-point`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          issueId: event._id,
          points: Number(event.pointsToGive || 0),
        }),
      });

      const data = await res.json();
      console.log("Points given:", data);

      if (res.ok) {
        // ✅ update UI
        setEvents((prev) =>
          prev.map((e) =>
            e._id === event._id ? { ...e, pointsGiven: true } : e,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/maintenance/get-all-issues`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error("Failed to fetch events");

        setEvents(data.issues);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  console.log(events);

  return (
    <DashboardLayout userRole="faculty" userName="Faculty / HOD">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Maintenance Status</h2>

        {/* {events.map((event) => (
          <Card key={event._id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="text-muted-foreground mt-2">
                  Problem: {event.issueType}
                </p>
                <p className="font-semibold">{event.title}</p>

                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
              </div>

              <Badge variant={getBadgeVariant(event.status)}>
                {event.resolve === false ? "Pending" : "Success"}
              </Badge>
            </CardContent>
          </Card>
        ))} */}

        {events.length === 0 ? (
          <div className="text-center py-16 border rounded-lg">
            <p className="text-lg font-semibold">No issues found</p>
            <p className="text-sm text-muted-foreground mt-1">
              There are currently no maintenance requests.
            </p>
          </div>
        ) : (
          events.map((event) => (
            <Card key={event._id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground mt-2">
                      Problem: {event.issueType}
                    </p>
                    <p className="font-semibold">{event.title}</p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>

                  <Badge variant={getBadgeVariant(event.status)}>
                    {event?.status}
                  </Badge>
                </div>

                {!event.pointsGiven && (
                  <div className="flex items-center gap-3 border-t pt-4">
                    <input
                      type="number"
                      placeholder="Points"
                      className="w-24 px-3 py-2 border rounded-md text-sm"
                      onChange={(e) => (event.pointsToGive = e.target.value)}
                    />

                    <button
                      className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:opacity-90"
                      onClick={() => handleGivePoints(event)}
                    >
                      Give Points
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default FacultyMaintenanceStatus;
