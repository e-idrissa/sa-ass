import { PageHeader } from "@/components/shared/page-header";

const AppointmentsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Appointments"} />
      <div className="flex gap-8">
        <div className="w-2/3">{/* <Hometable role={role} /> */}</div>
        <div className="flex-1">{/* <SideCard /> */}</div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
