"use client";

// import { parseDate } from "chrono-node";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { PrescriptionDetails } from "./prescription-details";
import { EditPrescriptionFrom } from "./edit-prescription-form";
import { DeleteConfirmation } from "../delete-confimation";
import { FileTextIcon } from "lucide-react";
import { Filter } from "./filter";
import { cn, formatDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  userId: string;
  role: string;
  prescriptions: IPrescription[];
  page?: string;
}

interface CardProps {
  userId: string;
  role: string;
  prescription: IPrescription;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PrescriptionCard = ({
  prescription,
  isOpen,
  setIsOpen,
  role,
  userId,
}: CardProps) => {
  return (
    <Card className="relative group border-none hover:border-card h-44">
      <CardContent className="">
        <div className="absolute top-0 left-0 inset-0 w-full h-full hidden group-hover:flex rounded-xl items-center justify-center bg-accent/80">
          <PrescriptionDetails
            prescription={prescription}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {role !== "patient" && (
            <EditPrescriptionFrom prescription={prescription} />
          )}
          {userId && <DeleteConfirmation id={prescription.id} category="prescription"/>}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <FileTextIcon className="size-16 mb-3 stroke-1" />
          <p className="text-sm text-center font-medium">
            Prescription #{prescription.id}
          </p>
          <p className="text-xs text-center text-muted-foreground">
            Since 12 days
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const PrescriptionGrid = ({
  userId,
  role,
  prescriptions,
  page,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const data = date
    ? prescriptions.filter((p) => p.createdAt <= date)
    : prescriptions;

  return (
    <Card className="bg-transparent">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl text-semibold flex items-center gap-2">
            Prescription Grid
            <div className="flex items-center rounded-md border-2 px-2 py-1.5 gap-2">
              <span className="text-sm text-blue-600">{data.length}</span>
            </div>
          </CardTitle>
          <CardDescription>
            {date
              ? `All prescriptions from ${formatDate(date)} and before.`
              : "All of your prescriptions are listed here."}
          </CardDescription>
        </div>
        <Filter date={date} setDate={setDate} />
      </CardHeader>
      <ScrollArea className="">
        <CardContent
          className={cn(
            "size-full grid gap-8",
            page === "admin/analytics" ? "max-h-120" : "max-h-170",
            page === "admin/prescriptions" ? "grid-cols-8" : 
            page === "profile" ? "grid-cols-5" : "grid-cols-6"
          )}
        >
          {data.map((p) => (
            <PrescriptionCard
              key={p.id}
              prescription={p}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              userId={userId}
              role={role}
            />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
