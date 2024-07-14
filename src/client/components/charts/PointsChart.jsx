"use client";

import { Medal } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/client/components/ui/chart";
const chartData = [
  { houseName: "innovators", points: 275, fill: "var(--color-innovators)" },
  { houseName: "sentinels", points: 200, fill: "var(--color-sentinels)" },
  { houseName: "cybernetics", points: 287, fill: "var(--color-cybernetics)" },
  { houseName: "chronos", points: 173, fill: "var(--color-chronos)" },
];

const chartConfig = {
  points: {
    label: "Points",
  },
  innovators: {
    label: "Inno",
    color: "hsl(var(--chart-1))",
  },
  sentinels: {
    label: "Senti",
    color: "hsl(var(--chart-2))",
  },
  cybernetics: {
    label: "Cyber",
    color: "hsl(var(--chart-3))",
  },
  chronos: {
    label: "Chronos",
    color: "hsl(var(--chart-4))",
  },
};

const PointsChart = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Final House Standings</CardTitle>
        <CardDescription>As of June 29, 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="houseName"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label || value}
            />
            <XAxis dataKey="points" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="points" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total points garnered by the 4 houses.
          <Medal className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Innovators, Sentinels, Cybernetics, Chronos
        </div>
      </CardFooter>
    </Card>
  );
};

export default PointsChart;
