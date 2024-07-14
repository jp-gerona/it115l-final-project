"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { houseName: "innovators", members: 275, fill: "var(--color-innovators)" },
  { houseName: "sentinels", members: 200, fill: "var(--color-sentinels)" },
  { houseName: "cybernetics", members: 287, fill: "var(--color-cybernetics)" },
  { houseName: "chronos", members: 173, fill: "var(--color-chronos)" },
];

const chartConfig = {
  members: {
    label: "members",
  },
  innovators: {
    label: "Innovators",
    color: "hsl(var(--chart-1))",
  },
  sentinels: {
    label: "Sentinels",
    color: "hsl(var(--chart-2))",
  },
  cybernetics: {
    label: "Cybernetics",
    color: "hsl(var(--chart-3))",
  },
  chronos: {
    label: "Chronos",
    color: "hsl(var(--chart-4))",
  },
};

const PopulationChart = () => {
  const totalmembers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.members, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Population</CardTitle>
        <CardDescription>CCIS Week 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="members"
              nameKey="houseName"
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
                          {totalmembers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total population of all 4 houses.
          <Users className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Innovators, Sentinels, Cybernetics, Chronos
        </div>
      </CardFooter>
    </Card>
  );
};

export default PopulationChart;
