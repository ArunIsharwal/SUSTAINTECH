// import { motion } from "framer-motion";
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import {
//   Calendar,
//   Wrench,
//   Leaf,
//   ArrowRight,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   FileText
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const recentRequests = [
//   { id: 1, title: "Annual Tech Fest Meeting", status: "approved", room: "A-201", date: "Feb 8, 2024" },
//   { id: 2, title: "Study Group Session", status: "pending", room: "Library L2", date: "Feb 10, 2024" },
//   { id: 3, title: "Club Registration Drive", status: "rejected", room: "Main Hall", date: "Feb 5, 2024" },
// ];

// const statusStyles = {
//   approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
//   pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
//   rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
// };

// const StudentDashboard = () => {
//   return (
//     <DashboardLayout userRole="student" userName="Alex Johnson">
//       {/* Welcome section */}
//       <div className="mb-8">
//         <h2 className="font-display text-3xl font-bold mb-2">Welcome back, Alex! 👋</h2>
//         <p className="text-muted-foreground">
//           Here's what's happening with your campus activities.
//         </p>
//       </div>

//       {/* Quick stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         {[
//           { label: "Active Requests", value: "3", icon: FileText, color: "text-primary" },
//           { label: "Approved Events", value: "12", icon: CheckCircle2, color: "text-success" },
//           { label: "Issues Reported", value: "5", icon: Wrench, color: "text-warning" },
//           { label: "Green Points", value: "245", icon: Leaf, color: "text-primary" },
//         ].map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-card border border-border rounded-2xl p-5"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <stat.icon className={`w-6 h-6 ${stat.color}`} />
//               <span className="text-2xl font-display font-bold">{stat.value}</span>
//             </div>
//             <p className="text-sm text-muted-foreground">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Quick actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
//         >
//           <Calendar className="w-10 h-10 mb-4" />
//           <h3 className="font-display text-xl font-bold mb-2">Request an Event</h3>
//           <p className="text-primary-foreground/80 mb-4">
//             Book a room for your next class, meeting, or campus event.
//           </p>
//           <Button variant="glass" asChild>
//             <Link to="/dashboard/student/request">
//               Create Request <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//           </Button>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-gradient-to-br from-warning to-warning/80 rounded-2xl p-6 text-warning-foreground"
//         >
//           <Wrench className="w-10 h-10 mb-4" />
//           <h3 className="font-display text-xl font-bold mb-2">Report an Issue</h3>
//           <p className="text-warning-foreground/80 mb-4">
//             Spot a problem? Report it instantly and earn Green Points!
//           </p>
//           <Button variant="glass" asChild>
//             <Link to="/dashboard/student/maintenance">
//               Snap & Fix <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//           </Button>
//         </motion.div>
//       </div>

//       {/* Recent requests */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="bg-card border border-border rounded-2xl overflow-hidden"
//       >
//         <div className="p-6 border-b border-border flex justify-between items-center">
//           <h3 className="font-display text-lg font-semibold">Recent Requests</h3>
//           <Button variant="ghost" size="sm" asChild>
//             <Link to="/dashboard/student/requests">View All</Link>
//           </Button>
//         </div>
//         <div className="divide-y divide-border">
//           {recentRequests.map((request) => {
//             const status = statusStyles[request.status as keyof typeof statusStyles];
//             return (
//               <div key={request.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
//                 <div className="flex items-center gap-4">
//                   <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}>
//                     <status.icon className={`w-5 h-5 ${status.color}`} />
//                   </div>
//                   <div>
//                     <p className="font-medium">{request.title}</p>
//                     <p className="text-sm text-muted-foreground">{request.room} • {request.date}</p>
//                   </div>
//                 </div>
//                 <span className={`text-sm font-medium capitalize ${status.color}`}>
//                   {request.status}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </motion.div>
//     </DashboardLayout>
//   );
// };

// export default StudentDashboard;

import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Wrench,
  Leaf,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import useGetEventsForStudents from "@/hooks/GetEventsForStudents";
import { baseUrl } from "@/App";

// const recentRequests = [
//   { id: 1, title: "Annual Tech Fest Meeting", status: "approved", room: "A-201", date: "Feb 8, 2024" },
//   { id: 2, title: "Study Group Session", status: "pending", room: "Library L2", date: "Feb 10, 2024" },
//   { id: 3, title: "Club Registration Drive", status: "rejected", room: "Main Hall", date: "Feb 5, 2024" },
// ];

// const statusStyles = {
//   approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
//   pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
//   rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
// };

const StudentDashboard = () => {
  const [green, setGreen] = useState(0);
  useGetEventsForStudents();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser?.name || "Student";
  const { totalEvents } = useSelector((state: RootState) => state.events);
  const { totalSuccessRequests } = useSelector(
    (state: RootState) => state.events,
  );
  const { totalPendingRequests } = useSelector(
    (state: RootState) => state.events,
  );

  useEffect(() => {
    // console.log("Uss");

    const fetchPoints = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/student/get-green-point`, {
          method: "GET",
          credentials: "include", //
        });

        const data = await res.json();

        console.log(data);

        setGreen(data?.greenPoint ?? 0);
        console.log("API value:", data?.greenPoint);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoints();
  }, []);

  // const [numbers, setNumbers] = useState<Number | null>(0);

  // console.log(totalEvents);
  // console.log(totalSuccessRequests);
  // console.log(totalPendingRequests);

  return (
    <DashboardLayout userRole="student" userName={userName}>
      {/* Welcome section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold mb-2">
            Welcome back, {userName}! 👋
          </h2>

          <p className="text-muted-foreground">
            Here's what's happening with your campus activities.
          </p>
        </div>

        {/* Stylish green points */}
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold shadow-md">
          {green}
          <span className="absolute -inset-0.5 rounded-full bg-green-400 opacity-30 blur-sm"></span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Requests",
            value: totalPendingRequests,
            icon: FileText,
            color: "text-primary",
          },
          {
            label: "Approved Requests",
            value: totalSuccessRequests,
            icon: CheckCircle2,
            color: "text-success",
          },
          {
            label: "Total Reported",
            value: totalEvents,
            icon: Wrench,
            color: "text-warning",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <span className="text-2xl font-display font-bold">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
        >
          <Calendar className="w-10 h-10 mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">
            Request an Event
          </h3>
          <p className="text-primary-foreground/80 mb-4">
            Book a room for your next class, meeting, or campus event.
          </p>
          <Button variant="glass" asChild>
            <Link to="/dashboard/student/request">
              Create Request <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-warning to-warning/80 rounded-2xl p-6 text-warning-foreground"
        >
          <Wrench className="w-10 h-10 mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">
            Report an Issue
          </h3>
          <p className="text-warning-foreground/80 mb-4">
            Spot a problem? Report it instantly and earn Green Points!
          </p>
          <Button variant="glass" asChild>
            <Link to="/dashboard/student/maintenance">
              Create Issue <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
