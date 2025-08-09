"use client";

import { TableBadge } from "@/components/shared/table-badge";
import { ColumnDef } from "@tanstack/react-table";
import { AppointmentDetails } from "@/components/shared/appointments/appointment-details";
import { EditAppointmentForm } from "@/components/shared/appointments/edit-appointment-form";
import { DeleteConfirmation } from "@/components/shared/delete-confimation";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, MoreHorizontalIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { admin } from "@/lib/tmp/user";

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: "user",
    header: () => <div className="w-50 ml-2">Guest</div>,
    cell: ({ row }) => {
      const creatorId = row.original.creatorId
      const patient = row.original.patient
      const doctor = row.original.doctor
      const user = creatorId === patient.id ? doctor : patient

      return (
        <div className="ml-2">
          <div>{user.name}</div>
          <div className="text-muted-foreground text-sm">{user.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const variant = row.original.status;

      return (
        <div className="">
          <TableBadge variant={variant} />
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: () => <div className="">Reason</div>,
    cell: ({ row }) => {
      const reason = row.original.reason;

      return <div className="">{reason}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="">Date</div>,
    cell: ({ row }) => {
      const date = row.original.date;

      return <div className="">{formatDate(date)}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="w-12" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <AppointmentDetails appointment={row.original} />
          <EditAppointmentForm appointment={row.original} userId={admin.id}/>
          <DeleteConfirmation id={row.original.id} category="appointment"/>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              
            >
              <Button variant={"ghost"} size={"icon"}>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={row.original.status !== "pending"}><CheckIcon />Accept</DropdownMenuItem>
                <DropdownMenuItem disabled={row.original.status !== "pending"}><XIcon />Reject</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
