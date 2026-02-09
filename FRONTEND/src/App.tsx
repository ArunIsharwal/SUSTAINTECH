import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import MaintenanceDashboard from "./pages/dashboard/MaintenanceDashboard";
import EventRequestPage from "./pages/dashboard/EventRequestPage";
import MaintenanceReportPage from "./pages/dashboard/MaintenanceReportPage";
import NotFound from "./pages/NotFound";
import VerifyOtp from "./pages/VerifyOtp";
import MyRequests from "./pages/dashboard/MyRequests";
import MyRequestshistory from "./pages/dashboard/MyRequests";
import GreenPoints from "./pages/dashboard/GreenPoints";
import { store } from "./store/store";
import { Provider } from "react-redux";
import FacultyMaintenanceStatus from "./pages/dashboard/FacultyMaintenanceStatus";
import FacultyEventRequests from "./pages/dashboard/FacultyEventRequests";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";

const queryClient = new QueryClient();

export const baseUrl = import.meta.env.VITE_BASE_URL;

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Dashboard Routes */}
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route
              path="/dashboard/student/request"
              element={<EventRequestPage />}
            />
            <Route
              path="/dashboard/student/maintenance"
              element={<MaintenanceReportPage />}
            />
            <Route
              path="/dashboard/student/myrequest"
              element={<MyRequestshistory />}
            />
            <Route
              path="/dashboard/student/greenpoints"
              element={<GreenPoints />}
            />
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />

            {/* Maintenance Dashboard Routes */}
            <Route
              path="/dashboard/maintenance"
              element={<MaintenanceDashboard />}
            />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
            <Route path="/dashboard/faculty/event-requests" element={<FacultyEventRequests />} />
            <Route path="/dashboard/faculty/maintenance-status" element={<FacultyMaintenanceStatus />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
