import { AppLogo } from "@/components/shared/app-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, formatDateWithTime } from "@/lib/utils";
import { CheckIcon, InfoIcon } from "lucide-react";

interface Props {
  appointment: IAppointment;
}

export function AppointmentDetails({ appointment }: Props) {
  const { id, status, patient, reason, date } = appointment;
  const color =
    status === "pending"
      ? "text-orange-500"
      : status === "confirmed"
      ? "text-blue-500"
      : status === "completed"
      ? "text-green-500"
      : status === "rejected"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <InfoIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <AppLogo />
          <SheetTitle className="flex items-center gap-2">
            Appointment Details{" "}
            <div className="flex items-center rounded-md border-2 px-2 py-1 gap-2">
              <span className="text-sm text-blue-600">{id}</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            View details about your appointment.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-4 px-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Status:</span>
            <code
              className={cn("px-2 py-1 rounded-lg bg-sidebar border", color)}
            >
              {status}
            </code>
          </div>
          <div className="flex gap-6">
            <span className="font-medium">Date:</span>
            <div className="px-2 py-1 rounded-lg bg-sidebar border flex flex-col">
              <code className="text-muted-foreground">
                {formatDateWithTime(date)}
              </code>
            </div>
          </div>
          <div className="flex gap-[1.30rem]">
            <span className="font-medium">From:</span>
            <div className="flex flex-col px-2 py-1 rounded-lg bg-sidebar border">
              <code className="text-muted-foreground">{patient.name}</code>
              <code className="text-muted-foreground">{patient.email}</code>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Reason:</span>
            <code className="px-2 py-1 rounded-lg bg-sidebar border text-muted-foreground">
              {reason}
            </code>
          </div>
        </div>
        <SheetFooter>
          <Button disabled={status !== "pending"}><CheckIcon />Confirm</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
