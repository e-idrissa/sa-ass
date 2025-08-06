"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { UsersRoundIcon } from "lucide-react";

interface Props {
  data: {
    month: string;
    doctors: number;
    patients: number;
  }[];
}

const chartConfig = {
  doctors: {
    label: "Doctors",
    color: "#2563eb",
  },
  patients: {
    label: "Patients",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

export function UsersChart({ data }: Props) {
  return (
    <Card className="w-1/3">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Users Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <UsersRoundIcon className="size-5 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="doctors" fill="var(--color-doctors)" radius={4} />
            <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
