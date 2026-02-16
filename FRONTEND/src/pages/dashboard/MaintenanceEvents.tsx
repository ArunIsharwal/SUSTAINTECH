import { baseUrl } from "@/App";
import React, { useEffect, useState } from "react";

const MaintenanceEvents = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/maintenance/get-events`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setTickets(data.events || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  console.log("Gt: ", tickets);
  

  return (
    <div>
      {tickets.length === 0 ? (
        <p>No events found</p>
      ) : (
        tickets.map((event) => (
          <div key={event._id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
            <h3>{event.title}</h3>
            <p>Status: {event.status}</p>
            <p>
              Start Time: {new Date(event.startTime).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MaintenanceEvents;
