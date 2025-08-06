import { cn } from "@/lib/utils";

interface StatCardProps {
  count: number;
  label: string;
}

export const StatCard = ({ count, label }: StatCardProps) => {
  const color =
    label === "pending"
      ? "text-orange-500"
      : label === "confirmed"
      ? "text-blue-500"
      : label === "completed"
      ? "text-green-500"
      : label === "rejected"
      ? "text-red-500"
      : "text-teal-500";

  return (
    <div className="text-sm border bg-sidebar rounded-md flex items-center gap-1 p-1">
      <div className={cn("text-xs px-1 rounded w-fit font-semibold", color)}>
        {count}
      </div>
      <code className="capitalize">{label}</code>
    </div>
  );
};
