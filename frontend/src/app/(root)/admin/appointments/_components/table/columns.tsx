"use client";

import { TableBadge } from "@/components/shared/table-badge";
import { ColumnDef } from "@tanstack/react-table";
import { AppointmentDetails } from "@/components/shared/appointments/appointment-details";
import { EditAppointmentForm } from "@/components/shared/appointments/edit-appointment-form";
import { DeleteConfirmation } from "@/components/shared/delete-confimation";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: "user",
    header: () => <div className="w-50 ml-2">Guest</div>,
    cell: ({ row }) => {
      const user = row.original.user;
      const email = row.original.email;

      return (
        <div className="ml-2">
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
          <EditAppointmentForm appointment={row.original} />
          <DeleteConfirmation id={row.original.id} />
        </div>
      );
    },
  },
];
