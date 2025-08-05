import { PageHeader } from "@/components/shared/page-header";
import { admin } from "@/lib/tmp/user";
import React from "react";
import { Hometable } from "./_components/home-table";
import { SideCard } from "./_components/side-card";

const Home = () => {
  const { role } = admin;
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={"Home"} role={role} />
      <div className="flex gap-8">
        <div className="w-2/3">
          <Hometable role={role} />
        </div>
        <div className="flex-1">
          <SideCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
