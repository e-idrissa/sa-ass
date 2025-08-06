"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CalendarCogIcon } from "lucide-react";

interface Props {
  data: {
    status: string;
    appointments: number;
    fill: string;
  }[];
}

const chartConfig = {
  appointments: {
    label: "Appointments",
  },
  pending: {
    label: "Pending",
    color: "#1d4ed8",
  },
  confirmed: {
    label: "Confirmed",
    color: "#3b82f6",
  },
  completed: {
    label: "Completed",
    color: "#60a5fa",
  },
  rejected: {
    label: "Rejected",
    color: "#bfdbfe",
  },
} satisfies ChartConfig;

export function AppointmentsChart({ data }: Props) {
  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.appointments, 0);
  }, [data]);

  return (
    <Card className="flex flex-col w-1/3">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Appointments Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <CalendarCogIcon className="size-5 text-muted-foreground"/>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="appointments"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Appointments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
