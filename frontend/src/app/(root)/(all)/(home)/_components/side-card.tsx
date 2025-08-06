"use client";

import {
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
import { StatCard } from "@/components/shared/stat-card";
import { NewPrescriptionForm } from "./new-prescription-form";
import { admin } from "@/lib/tmp/user";

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
    color: "#2563eb",
  },
  prescriptions: {
    label: "Prescriptions",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

export function SideCard() {
  const { role, id } = admin

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
          {role === "patient" ? null : (
            <NewPrescriptionForm doctorId={id}/>
          )}
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
