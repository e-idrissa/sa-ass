import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sampleUser } from "@/lib/tmp/user";
import {
  DropletsIcon,
  GaugeIcon,
  MailIcon,
  PhoneIcon,
  RulerDimensionLineIcon,
  ShieldIcon,
  UserRoundIcon,
} from "lucide-react";
import React from "react";
import PasswordDrawer from "./_components/password-drawer";
import { PrescriptionGrid } from "@/components/shared/prescriptions/prescription-grid";
import { homeTableData, prescriptionsData } from "@/lib/tmp/table-data";
import { WeekAppointments } from "./_components/week-appointments";
import { EditUser } from "@/components/shared/edit-user-sheet";

const ProfilePage = () => {
  const user = sampleUser;
  const prescriptions = prescriptionsData;

  return (
    <div className="flex gap-8 items-center py-8">
      <div className="flex flex-col items-center gap-8 w-2/5">
        <div className="relative size-30">
          <UserRoundIcon className="size-30 rounded-full stroke-1 p-6 bg-sidebar" />
          <EditUser user={sampleUser} onProfile={true} className="absolute -right-2 bottom-2" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"} className="capitalize">
            {user.role}
          </Badge>
          <Badge
            variant={user.isVerified ? "success" : "warning"}
            className="capitalize"
          >
            {user.isVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl text-center font-medium">{user.user}</h3>
          <div className="flex items-center gap-2 justify-center">
            <MailIcon className="size-5 text-muted-foreground" />
            <p className="text-center text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <PhoneIcon className="size-5 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              {user.telephone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <DropletsIcon className="size-5 text-red-700" />
            {user.bloodGroup}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <RulerDimensionLineIcon className="size-5 text-blue-600 rotate-90" />
            {user.height}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <GaugeIcon className="size-5 text-green-600" />
            {user.pound}
          </div>
        </div>
        <WeekAppointments appointments={homeTableData} />
        <Card className="bg-transparent w-127">
          <CardContent>
            <CardHeader className="bg-card flex items-center py-4 rounded-lg font-semibold">
              <ShieldIcon />
              Security
            </CardHeader>
            <div className="mt-4 text-muted-foreground text-sm">
              Be careful with this section. It is about your password. If you
              are sure you wnat to change it, proceed.
              <br />
              <br />
              This action cannot be undone.
              <div className="mt-4 space-y-4">
                <Input placeholder="••••••••" disabled className="w-full" />
                <PasswordDrawer />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-8 w-3/5">
        <PrescriptionGrid
          userId={sampleUser.id}
          prescriptions={prescriptions}
          page="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
