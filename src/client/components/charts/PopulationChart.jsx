"use client";

import React from "react";
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

// Define your colors for each house
const chartConfig = {
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
  const [chartData, setChartData] = React.useState([]);
  const [totalMembers, setTotalMembers] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the correct API endpoint
        const response = await fetch("/countMembers", { // Update the URL here if needed
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const formattedData = data.map((item) => ({
          houseName: item.houseName.toLowerCase(),
          members: item.members,
          fill: `var(--color-${item.houseName.toLowerCase()})`
        }));
        setChartData(formattedData);
        console.log(formattedData); 
        // Calculate total members
        const total = data.reduce((acc, curr) => acc + curr.members, 0);
        setTotalMembers(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
              // Apply colors to each segment
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
                          {totalMembers.toLocaleString()}
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
          Showing total population of all houses.
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