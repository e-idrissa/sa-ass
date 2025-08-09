"use client";

import { TableBadge } from "@/components/shared/table-badge";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ScanBarcodeIcon } from "lucide-react";
import { UserDetails } from "../user-details";
import { sampleUser } from "@/lib/tmp/user";
import { DeleteConfirmation } from "../../../../../../components/shared/delete-confimation";
import { EditUserForm } from "../edit-user-form";

export const columns: ColumnDef<IUsersTableData>[] = [
  {
    accessorKey: "matricule",
    header: () => <div className="w-24 ml-2">Matricule</div>,
    cell: ({ row }) => {
      const matricule = row.original.matricule;

      return (
        <div className="ml-2 flex gap-2">
          <ScanBarcodeIcon className="size-5" />
          {matricule}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: () => <div className="w-70">User</div>,
    cell: ({ row }) => {
      const user = row.original.user;
      const email = row.original.email;

      return (
        <div className="">
          <div>{user}</div>
          <div className="text-muted-foreground text-sm">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="w-24">Role</div>,
    cell: ({ row }) => {
      const role = row.original.role;
      const variant = role === "doctor" ? "default" : "secondary"

      return (
        <div className="">
          <Badge variant={variant} className="capitalize">{role}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isConfirmed",
    header: () => <div className="w-36">Status</div>,
    cell: ({ row }) => {
      const isConfirmed = row.original.isConfirmed;
      const variant = isConfirmed ? "confirmed" : "pending";

      return (
        <div className="">
          <TableBadge variant={variant} />
        </div>
      );
    },
  },
  {
    accessorKey: "telephone",
    header: () => <div className="w-36">Telephone</div>,
    cell: ({ row }) => {
      const telephone = row.original.telephone;

      return <div className="">{telephone}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="w-12" />,
    cell: ({ row }) => {
      const user = sampleUser;

      return (
        <div className="flex items-center">
          <UserDetails user={user} />
          <EditUserForm user={user} />
          <DeleteConfirmation id={row.original.id} category="user"/>
        </div>
      );
    },
  },
];
