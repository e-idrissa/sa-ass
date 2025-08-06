import { PageHeader } from "@/components/shared/page-header";
import { PrescriptionGrid } from "@/components/shared/prescriptions/prescription-grid";
import { prescriptionsData } from "@/lib/tmp/table-data";
import { admin } from "@/lib/tmp/user";
import { cn } from "@/lib/utils";
import React from "react";
import { NewPrescriptionForm } from "./_components/new-prescription-form";

const PrescriptionsPage = () => {
  const { role, id } = admin;
  const prescriptions = prescriptionsData;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Prescriptions"} />
      <div className="flex gap-8">
        <div className={cn(role === "doctor" ? "w-2/3" : "w-full")}>
          <PrescriptionGrid
            role={role}
            userId={id}
            prescriptions={prescriptions}
          />
        </div>
        <div className={cn(role === "patient" ? "hidden" : "w-1/3")}>
          <NewPrescriptionForm id={id}/>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
