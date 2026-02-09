import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FacultyDashboard = () => {
  return (
    <DashboardLayout userRole="faculty" userName="Faculty / HOD">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Request Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            Review and confirm student event requests.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Status</CardTitle>
          </CardHeader>
          <CardContent>
            Track maintenance work progress for classrooms and labs.
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
