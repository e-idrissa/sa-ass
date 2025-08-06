"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { ClipboardListIcon } from "lucide-react";

interface Props {
  data: { month: string; prescriptions: number }[];
}

const chartConfig = {
  prescriptions: {
    label: "Prescriptions",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function PrescriptionsChart({ data }: Props) {
  return (
    <Card className="w-1/3">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Prescriptions Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <ClipboardListIcon className="size-5 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="prescriptions"
              type="natural"
              fill="var(--color-prescriptions)"
              fillOpacity={0.4}
              stroke="var(--color-prescriptions)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
