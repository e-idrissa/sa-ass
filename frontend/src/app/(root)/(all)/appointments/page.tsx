import { PageHeader } from "@/components/shared/page-header";
import { admin } from "@/lib/tmp/user";
import { DataTable } from "@/components/shared/appointments/data-table";
import { NewAppointmentForm } from "@/components/shared/appointments/new-appointment-form";
import { homeTableData, usersTableData } from "@/lib/tmp/table-data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { columns } from "@/components/shared/appointments/columns";

const AppointmentsPage = () => {
  const { role, id } = admin;
  const users = usersTableData;
  const pendingAppointments = homeTableData.filter(
    (a) => a.status === "pending"
  );
  const confirmedAppointments = homeTableData.filter(
    (a) => a.status === "confirmed"
  );
  const completedAppointments = homeTableData.filter(
    (a) => a.status === "completed"
  );
  const rejectedAppointments = homeTableData.filter(
    (a) => a.status === "rejected"
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Appointments"} />
      <div className="flex gap-8">
        <div className="w-2/3">
          <DataTable columns={columns} data={homeTableData} />
        </div>
        <div className="flex-1">
          <Card className="bg-transparent">
            <CardContent className="space-y-8">
              <div className="space-y-4 border p-4 rounded-xl">
                <CardTitle className="text-xl text-semibold">
                  Appointments Stats
                </CardTitle>
                <div className="grid grid-cols-4 gap-2">
                  <StatCard
                    count={pendingAppointments.length}
                    label="pending"
                  />
                  <StatCard
                    count={confirmedAppointments.length}
                    label="confirmed"
                  />
                  <StatCard
                    count={completedAppointments.length}
                    label="completed"
                  />
                  <StatCard
                    count={rejectedAppointments.length}
                    label="rejected"
                  />
                </div>
              </div>
              <NewAppointmentForm role={role} doctorId={id} users={users} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
