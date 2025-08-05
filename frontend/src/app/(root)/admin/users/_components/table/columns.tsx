"use client";

import { TableBadge } from "@/components/shared/table-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ScanBarcodeIcon, MoreHorizontal } from "lucide-react";
import { UserDetails } from "../user-details";
import { sampleUser } from "@/lib/tmp/user";
import { useState } from "react";

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

      return (
        <div className="">
          <Badge>{role}</Badge>
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isSheetOpen, setSheetOpen] = useState(false);

      return (
        <div className="flex items-center">
          <UserDetails
            user={user}
            isOpen={isSheetOpen}
            setOpen={setSheetOpen}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
