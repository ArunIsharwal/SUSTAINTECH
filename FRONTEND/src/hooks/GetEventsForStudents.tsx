import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../App";
import {
  setEventsForStudents,
  Event,
  setTotalRequests,
  setTotalSuccessRequests,
  setTotalPendingRequests,
} from "../slices/eventSlice";
import type { RootState, AppDispatch } from "../store/store";

const useGetEventsForStudents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const [eventRes, issueRes] = await Promise.all([
          fetch(`${baseUrl}/api/student/get-events`, {
            credentials: "include",
          }),
          fetch(`${baseUrl}/api/student/get-issues`, {
            credentials: "include",
          }),
        ]);

        if (!eventRes.ok) {
          throw new Error("Failed to fetch events");
        }

        const data1 = await eventRes.json();   // events
        const data2 = await issueRes.json();   // issues
        dispatch(setEventsForStudents(data1.issues as Event[]));

        const total = data1.events.length + data2.issues.length;

        console.log("Data1: " , data1);
        console.log("Data2: ", data2);

        const totalSuceesEvents = data1.events.filter(
          (e: any) => e.status == "Approved",
        );
        const totalSuceesIssues = data2.issues.filter(
          (e: any) => e.status == "Success",
        );

        const totalPendingEvents = data1.events.filter(
          (e: any) => e.status == "Pending",
        );
        const totalPendingIssues = data2.issues.filter(
          (e: any) => e.status == "Pending",
        );

        const total1 = totalSuceesEvents.length + totalSuceesIssues.length;
        const total2 = totalPendingEvents.length + totalPendingIssues.length;


        dispatch(setTotalRequests(total));
        dispatch(setTotalSuccessRequests(total1));
        dispatch(setTotalPendingRequests(total2));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [dispatch]);

  return { events, loading, error };
};

export default useGetEventsForStudents;
