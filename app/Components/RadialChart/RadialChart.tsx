"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
} satisfies ChartConfig;

function RadialChart() {
  const { tasks, completedTasks, activeTasks } = useTasks();

  const chartData = [
    { completed: completedTasks.length, pending: activeTasks.length },
  ];

  return (
    <Card className="bg-[#EDEDED] border-none shadow-none">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-base">Completed vs Pending</CardTitle>
        <CardDescription className="text-xs">
          Task completion status
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-[220px] aspect-square"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={60}
            outerRadius={100}
          >
            <RadialBar dataKey="completed" stackId="a" fill="var(--color-desktop)" />
            <RadialBar dataKey="pending" stackId="a" fill="var(--color-mobile)" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


export default RadialChart;
