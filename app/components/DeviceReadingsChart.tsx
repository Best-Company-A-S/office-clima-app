"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Loader2,
  DropletIcon,
  ThermometerIcon,
  DownloadIcon,
  RefreshCcwIcon,
} from "lucide-react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartData {
  period: string;
  avg_temperature: number;
  avg_humidity: number;
  reading_count: number;
}

interface DeviceReadingChartProps {
  roomId: string;
  initialPeriod?: "minute" | "hour" | "day" | "week" | "month" | "year";
}

export function DeviceReadingsChart({
  roomId,
  initialPeriod = "day",
}: DeviceReadingChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChartData[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [overallStats, setOverallStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<
    "minute" | "hour" | "day" | "week" | "month" | "year"
  >(initialPeriod);

  // Define chart configuration
  const chartConfig: ChartConfig = {
    avg_temperature: {
      label: "Temperature",
      icon: ThermometerIcon,
      color: "hsl(var(--chart-1))",
    },
    avg_humidity: {
      label: "Humidity",
      icon: DropletIcon,
      color: "hsl(var(--chart-2))",
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Fetching data for room ${roomId} with period ${period}`);

      const response = await axios.get(
        `/api/devices/readings/stats?roomId=${roomId}&period=${period}`
      );

      const timeSeriesData = response.data.timeSeriesData || [];
      setRawData(timeSeriesData);

      console.log(`Received ${timeSeriesData.length} data points`);

      if (timeSeriesData.length > 0) {
        console.log("Sample data point:", timeSeriesData[0]);
      }

      // Format the data for the chart based on period
      const formattedData = timeSeriesData.map((item: any, index: number) => {
        try {
          // Handle timestamp values properly
          let periodLabel;
          let timestamp = null;

          if (item.hour) {
            if (typeof item.hour === "string") {
              try {
                timestamp = parseISO(item.hour);
              } catch (e) {
                console.error("Failed to parse ISO string:", item.hour);
              }
            } else if (item.hour instanceof Date) {
              timestamp = item.hour;
            }

            if (timestamp && !isNaN(timestamp.getTime())) {
              // Format based on period
              switch (period) {
                case "minute":
                  periodLabel = format(timestamp, "HH:mm:ss");
                  break;
                case "hour":
                  periodLabel = format(timestamp, "HH:mm");
                  break;
                case "day":
                  periodLabel = format(timestamp, "HH:mm");
                  break;
                case "week":
                  periodLabel = format(timestamp, "EEE");
                  break;
                case "month":
                  periodLabel = format(timestamp, "d MMM");
                  break;
                case "year":
                  periodLabel = format(timestamp, "MMM");
                  break;
                default:
                  periodLabel = format(timestamp, "HH:mm d MMM");
              }
            } else {
              periodLabel = `Point ${index + 1}`;
            }
          } else {
            periodLabel = `Point ${index + 1}`;
          }

          return {
            ...item,
            period: periodLabel,
            originalHour: item.hour, // Keep original for debugging
            avg_temperature: parseFloat(item.avg_temperature || 0).toFixed(1),
            avg_humidity: parseFloat(item.avg_humidity || 0).toFixed(1),
          };
        } catch (err) {
          console.error("Error formatting chart data:", err, item);
          return {
            ...item,
            period: `Point ${index + 1}`,
            avg_temperature: parseFloat(item.avg_temperature || 0).toFixed(1),
            avg_humidity: parseFloat(item.avg_humidity || 0).toFixed(1),
          };
        }
      });

      console.log(`Formatted ${formattedData.length} data points for chart`);
      setData(formattedData);
      setOverallStats(response.data.overallStats);
    } catch (err: any) {
      console.error("Error fetching device readings:", err);
      setError(err.response?.data?.error || "Failed to load chart data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchData();
    }
  }, [roomId, period]);

  const handlePeriodChange = (value: string) => {
    if (
      value === "minute" ||
      value === "hour" ||
      value === "day" ||
      value === "week" ||
      value === "month" ||
      value === "year"
    ) {
      setPeriod(value);
    }
  };

  const formatTimeLabel = (period: string) => {
    switch (period) {
      case "minute":
        return "Last 60 minutes";
      case "hour":
        return "Last 24 hours";
      case "day":
        return "Last 24 hours by hour";
      case "week":
        return "Last 7 days";
      case "month":
        return "Last 30 days";
      case "year":
        return "Last 12 months";
      default:
        return "";
    }
  };

  const downloadCSV = () => {
    if (!data.length) return;

    const headers = [
      "Period",
      "Temperature (°C)",
      "Humidity (%)",
      "Readings Count",
    ];
    const csvContent = [
      headers.join(","),
      ...data.map((row) => {
        return [
          row.period,
          row.avg_temperature,
          row.avg_humidity,
          row.reading_count,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `climate-data-${roomId}-${period}-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Climate History</CardTitle>
          <CardDescription>
            Temperature and humidity trends over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Climate History</CardTitle>
          <CardDescription>Failed to load climate data</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-destructive">
          <div className="text-center">
            <p className="mb-4">{error}</p>
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCcwIcon className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Climate History</CardTitle>
          <CardDescription>
            Temperature and humidity trends over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="mb-4">No climate data available for this period</p>
          <p className="text-sm mb-4">
            Total readings in database: {overallStats?.reading_count || 0}
          </p>
          <Button
            onClick={fetchData}
            variant="outline"
            size="sm"
            className="gap-2 mb-4"
          >
            <RefreshCcwIcon className="h-4 w-4" />
            Refresh Data
          </Button>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium">Period</p>
              <Select value={period} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minute">Minute by minute</SelectItem>
                  <SelectItem value="hour">Hour by hour</SelectItem>
                  <SelectItem value="day">Day by hour</SelectItem>
                  <SelectItem value="week">Week by day</SelectItem>
                  <SelectItem value="month">Month by day</SelectItem>
                  <SelectItem value="year">Year by month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Room Climate History</CardTitle>
          <CardDescription>
            {formatTimeLabel(period)}
            <span className="ml-2 text-xs">
              ({data.length} data points, {overallStats?.reading_count || 0}{" "}
              total readings)
            </span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={fetchData}
          >
            <RefreshCcwIcon className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={downloadCSV}
          >
            <DownloadIcon className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap justify-start gap-4 mb-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium">Period</p>
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minute">Minute by minute</SelectItem>
                <SelectItem value="hour">Hour by hour</SelectItem>
                <SelectItem value="day">Day by hour</SelectItem>
                <SelectItem value="week">Week by day</SelectItem>
                <SelectItem value="month">Month by day</SelectItem>
                <SelectItem value="year">Year by month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              orientation="left"
            />
            <YAxis
              yAxisId="right"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              orientation="right"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              yAxisId="left"
              dataKey="avg_temperature"
              fill="var(--color-avg_temperature)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="avg_humidity"
              fill="var(--color-avg_humidity)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
