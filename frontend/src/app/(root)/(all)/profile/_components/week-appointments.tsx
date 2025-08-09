import { weekAppointments } from "@/lib/tmp/user";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  appointments: IAppointment[];
};

export const WeekAppointments = (props: Props) => {
  const program = weekAppointments;
  const today = new Date().getDay();

  return (
    <div className="rounded-lg border p-2 flex items-center gap-2">
      {program.map((p, idx) => {
        const dot = p.count === 0 ? "bg-transparent" : p.count > 0 && idx === today-1 ? "bg-blue-600" : "bg-muted-foreground";

        return (
          <div
            key={idx}
            className={cn(
              "py-1 px-2 rounded flex flex-col h-18 w-16 items-center",
              idx === today - 1
                ? "text-blue-600 bg-blue-600/30"
                : "bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors text-muted-foreground"
            )}
          >
            <span className="text-xl font-medium">{p.date}</span>
            <span className="text-sm -mt-1">{p.day}</span>
            <span
              className={cn(
                "size-2 rounded-full mt-1",
                dot
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
