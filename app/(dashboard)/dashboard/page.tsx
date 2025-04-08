"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thermometer, Droplet, BarChart, Activity, Clock } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { DeviceReadingsChart } from "@/components/DeviceReadingsChart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface DeviceData {
  temperature?: number;
  humidity?: number;
  lastSeenAt?: string;
}

// Sample data for daily trends chart
const dailyTrendData = [
  { time: "00:00", temperature: 21.5, humidity: 45 },
  { time: "04:00", temperature: 20.8, humidity: 46 },
  { time: "08:00", temperature: 22.2, humidity: 43 },
  { time: "12:00", temperature: 24.1, humidity: 40 },
  { time: "16:00", temperature: 23.5, humidity: 42 },
  { time: "20:00", temperature: 22.0, humidity: 44 },
  { time: "23:59", temperature: 21.2, humidity: 45 },
];

// Sample data for comfort index chart
const comfortData = [
  { day: "Mon", comfort: 85, activity: 24 },
  { day: "Tue", comfort: 88, activity: 35 },
  { day: "Wed", comfort: 92, activity: 42 },
  { day: "Thu", comfort: 84, activity: 38 },
  { day: "Fri", comfort: 79, activity: 40 },
  { day: "Sat", comfort: 86, activity: 22 },
  { day: "Sun", comfort: 89, activity: 18 },
];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [settings, setSettings] = useState<{
    temperatureUnit: string;
    humidityUnit: string;
  }>({
    temperatureUnit: "C",
    humidityUnit: "%",
  });

  // Chart configuration
  const dailyTrendConfig: ChartConfig = {
    temperature: {
      label: "Temperature",
      icon: Thermometer,
      theme: {
        light: "hsl(340, 70%, 50%)",
        dark: "hsl(340, 70%, 60%)",
      },
    },
    humidity: {
      label: "Humidity",
      icon: Droplet,
      theme: {
        light: "hsl(220, 70%, 50%)",
        dark: "hsl(220, 70%, 60%)",
      },
    },
  };

  // Chart configuration for comfort index
  const comfortConfig: ChartConfig = {
    comfort: {
      label: "Comfort Index",
      theme: {
        light: "hsl(150, 70%, 50%)",
        dark: "hsl(150, 70%, 60%)",
      },
    },
    activity: {
      label: "Room Activity",
      theme: {
        light: "hsl(280, 70%, 50%)",
        dark: "hsl(280, 70%, 60%)",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const teamId = searchParams.get("teamId");
      if (!teamId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch settings for temperature and humidity units
        const settingsResponse = await axios.get(
          `/api/teams/${teamId}/settings`
        );
        setSettings({
          temperatureUnit: settingsResponse.data.temperatureUnit || "C",
          humidityUnit: settingsResponse.data.humidityUnit || "%",
        });

        // Here you would normally fetch device data from an API
        // For now, we'll use mock data
        setDeviceData([
          {
            temperature: 22.5,
            humidity: 45,
            lastSeenAt: new Date().toISOString(),
          },
          {
            temperature: 21.2,
            humidity: 48,
            lastSeenAt: new Date().toISOString(),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // Calculate averages
  const averageTemperature = deviceData.length
    ? deviceData.reduce((acc, device) => acc + (device.temperature || 0), 0) /
      deviceData.length
    : 0;

  const averageHumidity = deviceData.length
    ? deviceData.reduce((acc, device) => acc + (device.humidity || 0), 0) /
      deviceData.length
    : 0;

  // Use roomId from URL or fallback
  const roomId = searchParams.get("roomId") || "";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your climate data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Temperature</CardTitle>
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Average across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {averageTemperature.toFixed(1)}°{settings.temperatureUnit}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {deviceData.length} device{deviceData.length !== 1 ? "s" : ""}{" "}
              reporting
            </div>
          </CardContent>
        </Card>

        {/* Humidity Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Humidity</CardTitle>
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Average across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {averageHumidity.toFixed(0)}
              {settings.humidityUnit}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {deviceData.length} device{deviceData.length !== 1 ? "s" : ""}{" "}
              reporting
            </div>
          </CardContent>
        </Card>

        {/* Last Updated Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Last Updated
              </CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Most recent device readings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deviceData.length > 0
                ? new Date(
                    Math.max(
                      ...deviceData
                        .filter((d) => d.lastSeenAt)
                        .map((d) => new Date(d.lastSeenAt!).getTime())
                    )
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No data"}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section - charts or other data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Trends Chart */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Daily Trends
              </CardTitle>
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Temperature over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={dailyTrendConfig}
              className="h-[200px] w-full"
            >
              <AreaChart data={dailyTrendData} accessibilityLayer>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-temperature)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-temperature)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-humidity)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-humidity)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--color-temperature)"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  isAnimationActive={true}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="var(--color-humidity)"
                  fillOpacity={1}
                  fill="url(#colorHumid)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Comfort Index Chart */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Comfort Index
              </CardTitle>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Comfort level and room activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={comfortConfig} className="h-[200px] w-full">
              <LineChart data={comfortData} accessibilityLayer>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="comfort"
                  stroke="var(--color-comfort)"
                  strokeWidth={2}
                  dot={{ stroke: "var(--color-comfort)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="var(--color-activity)"
                  strokeWidth={2}
                  dot={{
                    stroke: "var(--color-activity)",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Full Device Readings Chart */}
      <div className="mt-6">
        {roomId && <DeviceReadingsChart roomId={roomId} initialPeriod="day" />}
      </div>
    </div>
  );
};

export default Dashboard;
