"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  RefreshCcwIcon,
  AreaChartIcon,
  LineChartIcon,
  BarChartIcon,
} from "lucide-react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ChartData {
  period: string;
  avg_temperature: number;
  avg_humidity: number;
  reading_count: number;
  originalHour?: string | Date;
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
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("area");

  // Define chart configuration with theme support for dark/light mode
  const chartConfig: ChartConfig = {
    avg_temperature: {
      label: "Temperature",
      theme: {
        light: "hsl(340, 70%, 50%)",
        dark: "hsl(340, 70%, 60%)",
      },
    },
    avg_humidity: {
      label: "Humidity",
      theme: {
        light: "hsl(220, 70%, 50%)",
        dark: "hsl(220, 70%, 60%)",
      },
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        `/api/devices/readings/stats?roomId=${roomId}&period=${period}`
      );

      const timeSeriesData = response.data.timeSeriesData || [];
      setRawData(timeSeriesData);

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

          // Ensure numeric values are properly parsed
          const tempValue =
            typeof item.avg_temperature === "string"
              ? parseFloat(item.avg_temperature)
              : Number(item.avg_temperature || 0);

          const humidValue =
            typeof item.avg_humidity === "string"
              ? parseFloat(item.avg_humidity)
              : Number(item.avg_humidity || 0);

          return {
            ...item,
            period: periodLabel,
            originalHour: item.hour, // Keep original for debugging
            avg_temperature: Number(tempValue.toFixed(1)),
            avg_humidity: Number(humidValue.toFixed(1)),
          };
        } catch (err) {
          console.error("Error formatting chart data:", err, item);
          return {
            ...item,
            period: `Point ${index + 1}`,
            avg_temperature: 0,
            avg_humidity: 0,
          };
        }
      });

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

  if (isLoading) {
    return (
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Climate Data</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Climate Data</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-destructive">
          <div className="text-center">
            <p className="mb-4">{error}</p>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCcwIcon className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Climate Data</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="mb-4">No climate data available for this period</p>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCcwIcon className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">
              Climate Data
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {formatTimeLabel(period)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[130px] h-8">
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

            <div className="flex items-center space-x-1">
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setChartType("line")}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setChartType("area")}
              >
                <AreaChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setChartType("bar")}
              >
                <BarChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-1 py-2">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          {chartType === "bar" ? (
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={10}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}°`}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                yAxisId="left"
                dataKey="avg_temperature"
                fill="var(--color-avg_temperature)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                name="Temperature"
              />
              <Bar
                yAxisId="right"
                dataKey="avg_humidity"
                fill="var(--color-avg_humidity)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                name="Humidity"
              />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={10}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}°`}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avg_temperature"
                stroke="var(--color-avg_temperature)"
                dot={{
                  stroke: "var(--color-avg_temperature)",
                  strokeWidth: 2,
                  r: 3,
                }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                name="Temperature"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avg_humidity"
                stroke="var(--color-avg_humidity)"
                dot={{
                  stroke: "var(--color-avg_humidity)",
                  strokeWidth: 2,
                  r: 3,
                }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                name="Humidity"
              />
            </LineChart>
          ) : (
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-avg_temperature)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-avg_temperature)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-avg_humidity)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-avg_humidity)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={10}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}°`}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avg_temperature"
                stroke="var(--color-avg_temperature)"
                fillOpacity={1}
                fill="url(#colorTemp)"
                isAnimationActive={true}
                name="Temperature"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="avg_humidity"
                stroke="var(--color-avg_humidity)"
                fillOpacity={1}
                fill="url(#colorHumid)"
                isAnimationActive={true}
                name="Humidity"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
