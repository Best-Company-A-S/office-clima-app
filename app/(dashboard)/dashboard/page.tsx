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

interface DeviceData {
  temperature?: number;
  humidity?: number;
  lastSeenAt?: string;
}

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
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground text-sm">
              Chart visualization would appear here
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Activity</CardTitle>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Comfort index and room activity</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground text-sm">
              Activity metrics would appear here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
