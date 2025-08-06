import { PageHeader } from "@/components/shared/page-header";
import { PrescriptionGrid } from "@/components/shared/prescriptions/prescription-grid";
import { drugsData, prescriptionsData } from "@/lib/tmp/table-data";
import { admin } from "@/lib/tmp/user";
import React from "react";
import { UsersChart } from "./_components/users-chart";
import {
  appointmentsChartData,
  prescriptionChartData,
  userChartData,
} from "@/lib/tmp/chart-data";
import { AppointmentsChart } from "./_components/appointments-chart";
import { PrescriptionsChart } from "./_components/prescriptions-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PillIcon } from "lucide-react";
import { DrugDialog } from "./_components/drug-dialog";
import { Separator } from "@/components/ui/separator";
import { DeleteConfirmation } from "@/components/shared/delete-confimation";
import { ScrollArea } from "@/components/ui/scroll-area";

const AnalyticsPage = () => {
  const { role, id } = admin;
  const prescriptions = prescriptionChartData;
  const users = userChartData;
  const appointments = appointmentsChartData;
  const drugs = drugsData;

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader title={"Analytics"} />
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-8 w-full">
          <UsersChart data={users} />
          <AppointmentsChart data={appointments} />
          <PrescriptionsChart data={prescriptions} />
        </CardContent>
      </Card>
      <div className="flex gap-8">
        <PrescriptionGrid
          userId={id}
          role={role}
          prescriptions={prescriptionsData}
          page={"admin/analytics"}
        />
        <Card className="bg-transparent w-1/3">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-semibold flex items-center gap-2">
                Drugs
                <div className="flex items-center rounded-md border-2 px-2 py-1.5 gap-2">
                  <span className="text-sm text-blue-600">{drugs.length}</span>
                </div>
              </CardTitle>
              <CardDescription>
                A complete list of your current drogs
              </CardDescription>
            </div>
            <DrugDialog />
          </CardHeader>
          <ScrollArea className="max-h-120">
            <CardContent>
              {drugs.map((drug) => (
                <React.Fragment key={drug.id}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm flex items-center gap-2">
                      <PillIcon className="size-4" />
                      {drug.name}
                    </div>
                    <DeleteConfirmation id={drug.id} />
                  </div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
