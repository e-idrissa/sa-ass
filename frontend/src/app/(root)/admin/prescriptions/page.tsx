import { PageHeader } from "@/components/shared/page-header";
import { PrescriptionGrid } from "@/components/shared/prescriptions/prescription-grid";
import { prescriptionsData } from "@/lib/tmp/table-data";
import { admin } from "@/lib/tmp/user";
import React from "react";

const PrescriptionsPage = () => {
  const { role, id } = admin;
  const prescriptions = prescriptionsData;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Prescriptions"} />
      <div className="flex gap-8">
        <div className="w-full">
          <PrescriptionGrid
            role={role}
            userId={id}
            prescriptions={prescriptions}
            page="admin/prescriptions"
          />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
