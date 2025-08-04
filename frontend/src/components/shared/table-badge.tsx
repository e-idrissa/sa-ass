import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  variant: "pending" | "confirmed" | "completed" | "rejected";
}

export const TableBadge = ({ variant }: Props) => {
  const color =
    variant === "pending"
      ? "bg-orange-500"
      : variant === "confirmed"
      ? "bg-blue-500"
      : variant === "completed"
      ? "bg-green-500"
      : variant === "rejected"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-input bg-sidebar w-fit">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <code className="text-xs capitalize">{variant}</code>
    </div>
  );
};
