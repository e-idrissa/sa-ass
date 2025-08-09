"use client";

import { TableBadge } from "@/components/shared/table-badge";
import { ColumnDef } from "@tanstack/react-table";
import { AppointmentDetails } from "@/components/shared/appointments/appointment-details";
import { EditAppointmentForm } from "@/components/shared/appointments/edit-appointment-form";
import { DeleteConfirmation } from "@/components/shared/delete-confimation";
import { formatDate } from "@/lib/utils";
import { admin } from "@/lib/tmp/user";

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: "doctor",
    header: () => <div className="w-45 ml-2">Doctor</div>,
    cell: ({ row }) => {
      const user = row.original.doctor.name;
      const email = row.original.doctor.email;

      return (
        <div className="ml-2">
          <div>{user}</div>
          <div className="text-muted-foreground text-sm">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "patient",
    header: () => <div className="w-45">Patient</div>,
    cell: ({ row }) => {
      const user = row.original.patient.name;
      const email = row.original.patient.email;

      return (
        <div className="">
          <div>{user}</div>
          <div className="text-muted-foreground text-sm">{email}</div>
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

      return <div className="">{reason.slice(0, 29)}{"..."}</div>;
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
          <EditAppointmentForm appointment={row.original} userId={admin.id} />
          <DeleteConfirmation id={row.original.id} category="category" />
        </div>
      );
    },
  },
];
