// import { ReactNode } from "react";
// import { motion } from "framer-motion";
// import { 
//   Leaf, 
//   Home, 
//   Calendar, 
//   FileText, 
//   Wrench, 
//   BarChart3, 
//   Settings, 
//   LogOut,
//   Bell,
//   User,
//   Menu
// } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// interface DashboardLayoutProps {
//   children: ReactNode;
//   userRole: "student" | "faculty" | "admin" | "maintenance";
//   userName?: string;
// }

// const roleNavItems = {
//   student: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/student" },
//     { icon: Calendar, label: "Request Event", path: "/dashboard/student/request" },
//     { icon: FileText, label: "My Requests", path: "/dashboard/student/requests" },
//     { icon: Wrench, label: "Report Issue", path: "/dashboard/student/maintenance" },
//     { icon: BarChart3, label: "Green Points", path: "/dashboard/student/points" },
//   ],
//   faculty: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/faculty" },
//     { icon: FileText, label: "Pending Approvals", path: "/dashboard/faculty/approvals" },
//     { icon: Calendar, label: "My Classes", path: "/dashboard/faculty/classes" },
//     { icon: BarChart3, label: "Reports", path: "/dashboard/faculty/reports" },
//   ],
//   admin: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/admin" },
//     { icon: FileText, label: "All Requests", path: "/dashboard/admin/requests" },
//     { icon: Calendar, label: "Room Management", path: "/dashboard/admin/rooms" },
//     { icon: Wrench, label: "Maintenance", path: "/dashboard/admin/maintenance" },
//     { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
//     { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
//   ],
//   maintenance: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/maintenance" },
//     { icon: Wrench, label: "Open Tickets", path: "/dashboard/maintenance/tickets" },
//     { icon: FileText, label: "My Tasks", path: "/dashboard/maintenance/tasks" },
//     { icon: BarChart3, label: "Performance", path: "/dashboard/maintenance/performance" },
//   ],
// };

// const DashboardLayout = ({ children, userRole, userName = "User" }: DashboardLayoutProps) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   const navItems = roleNavItems[userRole];

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-6 border-b border-sidebar-border">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
//                 <Leaf className="w-6 h-6 text-sidebar-primary-foreground" />
//               </div>
//               <span className="font-display text-xl font-bold text-sidebar-foreground">OptiCampus</span>
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-sidebar-accent text-sidebar-primary"
//                       : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* User section */}
//           <div className="p-4 border-t border-sidebar-border">
//             <div className="flex items-center gap-3 mb-4 px-4">
//               <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
//                 <User className="w-5 h-5 text-sidebar-foreground" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
//                 <p className="text-xs text-sidebar-foreground/50 capitalize">{userRole}</p>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
//               onClick={() => navigate("/login")}
//             >
//               <LogOut className="w-5 h-5 mr-3" />
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 lg:ml-64">
//         {/* Top bar */}
//         <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="lg:hidden"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 <Menu className="w-5 h-5" />
//               </Button>
//               <h1 className="font-display text-xl font-semibold capitalize">
//                 {userRole} Dashboard
//               </h1>
//             </div>
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" size="icon" className="relative">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
//               </Button>
//               <Button variant="ghost" size="icon" asChild>
//                 <Link to={`/dashboard/${userRole}/settings`}>
//                   <Settings className="w-5 h-5" />
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {children}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// import { ReactNode, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Leaf,
//   Home,
//   Calendar,
//   FileText,
//   Wrench,
//   BarChart3,
//   Settings,
//   LogOut,
//   Bell,
//   User,
//   Menu,
// } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// interface DashboardLayoutProps {
//   children: ReactNode;
//   userRole: "student" | "faculty" | "admin" | "maintenance";
//   userName?: string; // optional (kept for compatibility)
// }

// const roleNavItems = {
//   student: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/student" },
//     { icon: Calendar, label: "Request Event", path: "/dashboard/student/request" },
//     { icon: FileText, label: "My Requests", path: "/dashboard/student/requests" },
//     { icon: Wrench, label: "Report Issue", path: "/dashboard/student/maintenance" },
//     { icon: BarChart3, label: "Green Points", path: "/dashboard/student/points" },
//   ],
//   faculty: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/faculty" },
//     { icon: FileText, label: "Pending Approvals", path: "/dashboard/faculty/approvals" },
//     { icon: Calendar, label: "My Classes", path: "/dashboard/faculty/classes" },
//     { icon: BarChart3, label: "Reports", path: "/dashboard/faculty/reports" },
//   ],
//   admin: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/admin" },
//     { icon: FileText, label: "All Requests", path: "/dashboard/admin/requests" },
//     { icon: Calendar, label: "Room Management", path: "/dashboard/admin/rooms" },
//     { icon: Wrench, label: "Maintenance", path: "/dashboard/admin/maintenance" },
//     { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
//     { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
//   ],
//   maintenance: [
//     { icon: Home, label: "Dashboard", path: "/dashboard/maintenance" },
//     { icon: Wrench, label: "Open Tickets", path: "/dashboard/maintenance/tickets" },
//     { icon: FileText, label: "My Tasks", path: "/dashboard/maintenance/tasks" },
//     { icon: BarChart3, label: "Performance", path: "/dashboard/maintenance/performance" },
//   ],
// };

// const DashboardLayout = ({ children, userRole, userName }: DashboardLayoutProps) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentUserName, setCurrentUserName] = useState<string>("User");

//   // ✅ Read user from localStorage ONCE
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser);
//         if (parsed?.name) {
//           setCurrentUserName(parsed.name);
//           console.log("User loaded from localStorage:", parsed.name);
//         }
//       } catch {}
//     }
//   }, []);

//   const navItems = roleNavItems[userRole];

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-6 border-b border-sidebar-border">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
//                 <Leaf className="w-6 h-6 text-sidebar-primary-foreground" />
//               </div>
//               <span className="font-display text-xl font-bold text-sidebar-foreground">
//                 OptiCampus
//               </span>
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-sidebar-accent text-sidebar-primary"
//                       : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* User section */}
//           <div className="p-4 border-t border-sidebar-border">
//             <div className="flex items-center gap-3 mb-4 px-4">
//               <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
//                 <User className="w-5 h-5 text-sidebar-foreground" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-sidebar-foreground truncate">
//                   {userName || currentUserName}
//                 </p>
//                 <p className="text-xs text-sidebar-foreground/50 capitalize">
//                   {userRole}
//                 </p>
//               </div>
//             </div>

//             <Button
//               variant="ghost"
//               className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
//               onClick={() => {
//                 localStorage.removeItem("user");
//                 navigate("/login");
//               }}
//             >
//               <LogOut className="w-5 h-5 mr-3" />
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 lg:ml-64">
//         <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="lg:hidden"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 <Menu className="w-5 h-5" />
//               </Button>
//               <h1 className="font-display text-xl font-semibold capitalize">
//                 {userRole} Dashboard
//               </h1>
//             </div>
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" size="icon" className="relative">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
//               </Button>
//               <Button variant="ghost" size="icon" asChild>
//                 <Link to={`/dashboard/${userRole}/settings`}>
//                   <Settings className="w-5 h-5" />
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </header>

//         <main className="p-6">
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
//             {children}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Home,
  Calendar,
  FileText,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  User,
  Menu,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "faculty" | "admin" | "maintenance";
  userName?: string;
}

const roleNavItems = {
  student: [
    { icon: Home, label: "Dashboard", path: "/dashboard/student" },
    { icon: Calendar, label: "Request Event", path: "/dashboard/student/request" },
    { icon: FileText, label: "My Requests", path: "/dashboard/student/myrequest" }, // ✅ FIX
    { icon: Wrench, label: "Report Issue", path: "/dashboard/student/maintenance" },
    { icon: BarChart3, label: "Green Points", path: "/dashboard/student/greenpoints" }, // ✅ FIX
  ],
faculty: [
  { icon: Home, label: "Dashboard", path: "/dashboard/faculty" },
  { icon: Calendar, label: "Event Requests", path: "/dashboard/faculty/event-requests" },
  { icon: Wrench, label: "Maintenance Status", path: "/dashboard/faculty/maintenance-status" },
],


  admin: [
    { icon: Home, label: "Dashboard", path: "/dashboard/admin" },
  ],
  maintenance: [
    { icon: Home, label: "Dashboard", path: "/dashboard/maintenance" },
  ],
};

const DashboardLayout = ({
  children,
  userRole,
  userName = "User",
}: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = roleNavItems[userRole];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-sidebar-foreground">
                OptiCampus
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4 px-4">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">
                  {userName}
                </p>
                <p className="text-xs text-sidebar-foreground/50 capitalize">
                  {userRole}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
          <div className="flex justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="font-display text-xl font-semibold capitalize">
                {userRole} Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <Settings className="w-5 h-5" />
            </div>
          </div>
        </header>

        <main className="p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
