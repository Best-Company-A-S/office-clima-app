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
  TrendingUpIcon,
  BarChartIcon,
  LineChartIcon,
  AreaChartIcon,
  MoonIcon,
  SunIcon,
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
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
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
      icon: ThermometerIcon,
      theme: {
        light: "hsl(340, 70%, 50%)",
        dark: "hsl(340, 70%, 60%)",
      },
    },
    avg_humidity: {
      label: "Humidity",
      icon: DropletIcon,
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

  const getLatestValues = () => {
    if (!data.length) return { temp: "-", humidity: "-" };
    const lastItem = data[data.length - 1];
    return {
      temp: lastItem.avg_temperature,
      humidity: lastItem.avg_humidity,
    };
  };

  const getMinMaxValues = () => {
    if (!data.length)
      return { minTemp: "-", maxTemp: "-", minHumidity: "-", maxHumidity: "-" };

    const temps = data.map((item) => Number(item.avg_temperature));
    const humidities = data.map((item) => Number(item.avg_humidity));

    return {
      minTemp: Math.min(...temps).toFixed(1),
      maxTemp: Math.max(...temps).toFixed(1),
      minHumidity: Math.min(...humidities).toFixed(1),
      maxHumidity: Math.max(...humidities).toFixed(1),
    };
  };

  const getRateOfChange = () => {
    if (data.length < 2) return { tempChange: 0, humidityChange: 0 };

    const first = data[0];
    const last = data[data.length - 1];

    const tempChange =
      Number(last.avg_temperature) - Number(first.avg_temperature);
    const humidityChange =
      Number(last.avg_humidity) - Number(first.avg_humidity);

    return {
      tempChange,
      humidityChange,
    };
  };

  const latestValues = getLatestValues();
  const minMaxValues = getMinMaxValues();
  const rateOfChange = getRateOfChange();

  if (isLoading) {
    return (
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Room Climate Dashboard
          </CardTitle>
          <CardDescription>
            Temperature and humidity trends over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">
              Loading climate data...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Room Climate Dashboard
          </CardTitle>
          <CardDescription>Failed to load climate data</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center text-destructive">
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
      <Card className="border-border/40 shadow-md dark:shadow-none dark:bg-card/90">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Room Climate Dashboard
          </CardTitle>
          <CardDescription>
            Temperature and humidity trends over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
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
    <Card className="border-border/40 shadow-md overflow-hidden dark:shadow-none dark:bg-card/90">
      <CardHeader className="bg-muted/20 pb-2 dark:bg-muted/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg font-semibold">
                Room Climate Dashboard
              </CardTitle>
              <Badge variant="outline" className="font-normal text-xs">
                {formatTimeLabel(period)}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              {data.length} data points, {overallStats?.reading_count || 0}{" "}
              total readings
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={fetchData}
            >
              <RefreshCcwIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={downloadCSV}
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Current Temperature Card */}
          <Card className="border-border/30 shadow-sm dark:shadow-none dark:bg-card/60 dark:border-border/10">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Current Temperature
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {latestValues.temp}°C
                    </h3>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Badge
                          variant={
                            rateOfChange.tempChange >= 0
                              ? "default"
                              : "destructive"
                          }
                          className="ml-2 h-5"
                        >
                          <span className="flex items-center text-xs">
                            {rateOfChange.tempChange >= 0 ? "+" : ""}
                            {rateOfChange.tempChange.toFixed(1)}°
                            <TrendingUpIcon
                              className={`h-3 w-3 ml-1 ${
                                rateOfChange.tempChange < 0 ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit p-2">
                        <span className="text-xs">Change over period</span>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <div className="bg-primary/10 p-2 rounded-md dark:bg-primary/20">
                  <ThermometerIcon className="text-primary h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Range: {minMaxValues.minTemp}°C - {minMaxValues.maxTemp}°C
              </p>
            </CardContent>
          </Card>

          {/* Current Humidity Card */}
          <Card className="border-border/30 shadow-sm dark:shadow-none dark:bg-card/60 dark:border-border/10">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Current Humidity
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {latestValues.humidity}%
                    </h3>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Badge
                          variant={
                            rateOfChange.humidityChange >= 0
                              ? "default"
                              : "destructive"
                          }
                          className="ml-2 h-5"
                        >
                          <span className="flex items-center text-xs">
                            {rateOfChange.humidityChange >= 0 ? "+" : ""}
                            {rateOfChange.humidityChange.toFixed(1)}%
                            <TrendingUpIcon
                              className={`h-3 w-3 ml-1 ${
                                rateOfChange.humidityChange < 0
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </span>
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit p-2">
                        <span className="text-xs">Change over period</span>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-md dark:bg-blue-500/20">
                  <DropletIcon className="text-blue-500 h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Range: {minMaxValues.minHumidity}% - {minMaxValues.maxHumidity}%
              </p>
            </CardContent>
          </Card>

          {/* Total Readings Card */}
          <Card className="border-border/30 shadow-sm md:col-span-2 dark:shadow-none dark:bg-card/60 dark:border-border/10">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Period Selection
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <Select value={period} onValueChange={handlePeriodChange}>
                        <SelectTrigger className="w-[160px] h-8">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minute">
                            Minute by minute
                          </SelectItem>
                          <SelectItem value="hour">Hour by hour</SelectItem>
                          <SelectItem value="day">Day by hour</SelectItem>
                          <SelectItem value="week">Week by day</SelectItem>
                          <SelectItem value="month">Month by day</SelectItem>
                          <SelectItem value="year">Year by month</SelectItem>
                        </SelectContent>
                      </Select>

                      <Separator orientation="vertical" className="h-8" />

                      <div className="flex items-center space-x-1">
                        <Button
                          variant={chartType === "line" ? "default" : "outline"}
                          size="sm"
                          className="h-8 px-2 aspect-square"
                          onClick={() => setChartType("line")}
                        >
                          <LineChartIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={chartType === "area" ? "default" : "outline"}
                          size="sm"
                          className="h-8 px-2 aspect-square"
                          onClick={() => setChartType("area")}
                        >
                          <AreaChartIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={chartType === "bar" ? "default" : "outline"}
                          size="sm"
                          className="h-8 px-2 aspect-square"
                          onClick={() => setChartType("bar")}
                        >
                          <BarChartIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {formatTimeLabel(period)} • Last updated:{" "}
                  {format(new Date(), "MMM d, yyyy HH:mm")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChartContainer config={chartConfig} className="h-[350px] w-full mt-2">
          {chartType === "bar" ? (
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                yAxisId="left"
                dataKey="avg_temperature"
                fill="var(--color-avg_temperature)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
              <Bar
                yAxisId="right"
                dataKey="avg_humidity"
                fill="var(--color-avg_humidity)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart accessibilityLayer data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
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
                animationDuration={1000}
                animationEasing="ease-out"
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
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </LineChart>
          ) : (
            <AreaChart accessibilityLayer data={data}>
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
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="left"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                orientation="right"
                tick={{ fontSize: 11 }}
                domain={["auto", "auto"]}
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
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="avg_humidity"
                stroke="var(--color-avg_humidity)"
                fillOpacity={1}
                fill="url(#colorHumid)"
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>

      <CardFooter className="border-t border-border/20 px-6 py-3 bg-muted/10 dark:bg-muted/5">
        <p className="text-xs text-muted-foreground">
          Data collected from climate monitoring sensors.{" "}
          {overallStats?.reading_count || 0} measurements in database.
        </p>
      </CardFooter>
    </Card>
  );
}
