import { PageHeader } from "@/components/shared/page-header";
import { PrescriptionGrid } from "@/components/shared/prescriptions/prescription-grid";
import { prescriptionsData } from "@/lib/tmp/table-data";
import { admin } from "@/lib/tmp/user";
import { cn } from "@/lib/utils";
import React from "react";
import { NewPrescriptionForm } from "../../../../components/shared/prescriptions/new-prescription-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PrescriptionsPage = () => {
  const { role, id } = admin;
  const prescriptions = prescriptionsData;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Prescriptions"} />
      <div className="flex gap-8">
        <div className={cn(role === "doctor" ? "w-2/3" : "w-full")}>
          <PrescriptionGrid
            userId={id}
            prescriptions={prescriptions}
          />
        </div>
        <div className={cn(role === "patient" ? "hidden" : "w-1/3")}>
          <Card>
            <CardHeader>
              <CardTitle>New Prescription</CardTitle>
              <CardDescription>
                Enter your prescription details here. Click save when
                you&apos;re done.
              </CardDescription>
            </CardHeader>
            <NewPrescriptionForm id={id}/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
