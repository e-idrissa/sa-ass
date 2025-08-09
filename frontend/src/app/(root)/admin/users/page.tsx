import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { HeartPulseIcon, StethoscopeIcon } from "lucide-react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { usersTableData } from "@/lib/tmp/table-data";
import { NewUserForm } from "./_components/new-user-form";
import { StatCard } from "@/components/shared/stat-card";
const Home = () => {
  const doctors = usersTableData.filter((user) => user.role === "doctor");
  const pendingDoctors = doctors.filter((user) => user.isVerified === false);
  const confirmedDoctors = doctors.filter((user) => user.isVerified === true);
  const patients = usersTableData.filter((user) => user.role === "patient");
  const pendingPatients = patients.filter((user) => user.isVerified === false);
  const confirmedPatients = patients.filter(
    (user) => user.isVerified === true
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Manage Users"} />
      <div className="w-full">
        <Tabs defaultValue="doctors" className="w-full">
          <TabsList>
            <TabsTrigger value="doctors">
              {" "}
              <StethoscopeIcon className="size-4" /> Doctors
            </TabsTrigger>
            <TabsTrigger value="patients">
              <HeartPulseIcon className="size-4" /> Patients
            </TabsTrigger>
          </TabsList>
          <TabsContent value="doctors">
            <Card className="bg-transparent">
              <CardContent className="">
                <div className="flex gap-8">
                  <DataTable columns={columns} data={doctors} />
                  <div className="flex-1 space-y-8 border p-8 rounded-xl bg-transparent">
                    <div className="space-y-4 border p-4 rounded-xl">
                      <CardTitle className="text-xl text-semibold">
                        Doctors Stats
                      </CardTitle>
                      <div className="grid grid-cols-3 gap-4">
                        <StatCard count={doctors.length} label="total" />
                        <StatCard
                          count={pendingDoctors.length}
                          label="pending"
                        />
                        <StatCard
                          count={confirmedDoctors.length}
                          label="confirmed"
                        />
                      </div>
                    </div>
                    <NewUserForm role="doctor" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="patients">
            <Card className="bg-transparent">
              <CardContent className="">
                <div className="flex gap-8">
                  <DataTable columns={columns} data={patients} />
                  <div className="flex-1 space-y-8 border p-8 rounded-xl bg-transparent">
                    <div className="space-y-4 border p-4 rounded-xl">
                      <CardTitle className="text-xl text-semibold">
                        Patients Stats
                      </CardTitle>
                      <div className="grid grid-cols-3 gap-4">
                        <StatCard count={patients.length} label="total" />
                        <StatCard
                          count={pendingPatients.length}
                          label="pending"
                        />
                        <StatCard
                          count={confirmedPatients.length}
                          label="confirmed"
                        />
                      </div>
                    </div>
                    <NewUserForm role="patient" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
