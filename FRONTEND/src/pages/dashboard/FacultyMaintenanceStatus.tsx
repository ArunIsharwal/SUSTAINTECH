import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const maintenanceData = [
  {
    id: 1,
    issue: "Projector not working",
    location: "Room A-201",
    status: "In Progress",
  },
  {
    id: 2,
    issue: "AC not cooling",
    location: "Lab B-102",
    status: "Completed",
  },
];

const FacultyMaintenanceStatus = () => {
  return (
    <DashboardLayout userRole="faculty" userName="Faculty / HOD">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Maintenance Status</h2>

        {maintenanceData.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="font-semibold">{item.issue}</p>
                <p className="text-muted-foreground">{item.location}</p>
              </div>
              <Badge>{item.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FacultyMaintenanceStatus;
