"use client";

import {
  ClipboardPlusIcon,
  FileSpreadsheetIcon,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", appointments: 186, prescriptions: 80 },
  { month: "February", appointments: 305, prescriptions: 200 },
  { month: "March", appointments: 237, prescriptions: 120 },
  { month: "April", appointments: 73, prescriptions: 190 },
  { month: "May", appointments: 209, prescriptions: 130 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "var(--chart-1)",
  },
  prescriptions: {
    label: "Prescriptions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface StatCardProps {
  count: number;
  label: string;
}

const StatCard = ({ count, label }: StatCardProps) => {
  const color =
    label === "pending"
      ? "text-orange-500"
      : label === "confirmed"
      ? "text-blue-500"
      : label === "completed"
      ? "text-green-500"
      : label === "rejected"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="text-sm border bg-sidebar rounded-md flex items-center gap-1 p-1">
      <div className={cn("text-xs px-1 rounded w-fit font-semibold", color)}>
        {count}
      </div>
      <code className="capitalize">{label}</code>
    </div>
  );
};

export function SideCard() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet</CardDescription>
              </div>
              <FileSpreadsheetIcon className="size-5" />
            </div>
            <div className="flex items-center justify-between">
              <p className="w-24 font-semibold text-4xl">123</p>
              <div className="w-fit text-green-600 flex items-center gap-2">
                <TrendingUp className="size-5" />
                <span>+7.5%</span>
              </div>
            </div>
          </div>
          <Button size={"sm"} className="w-full">
            <ClipboardPlusIcon className="size-4" />
            New Prescription
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Performance for the last 5 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
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
              <Bar
                dataKey="appointments"
                fill="var(--color-appointments)"
                radius={4}
              />
              <Bar
                dataKey="prescriptions"
                fill="var(--color-prescriptions)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total appointments for the last 6 months
          </div>
          <div className="grid grid-cols-4 gap-2 w-full mt-4">
            <StatCard count={35} label="pending" />
            <StatCard count={65} label="confirmed" />
            <StatCard count={60} label="completed" />
            <StatCard count={10} label="rejected" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
