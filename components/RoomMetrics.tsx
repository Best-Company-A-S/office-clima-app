"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  DropletIcon,
  ThermometerIcon,
  BarChartIcon,
} from "lucide-react";
import axios from "axios";

interface RoomMetricsProps {
  roomId: string;
}

export function RoomMetrics({ roomId }: RoomMetricsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `/api/devices/readings/stats?roomId=${roomId}&period=day`
        );
        setMetrics(response.data.overallStats);
      } catch (err: any) {
        console.error("Error fetching room metrics:", err);
        setError(err.response?.data?.error || "Failed to load metrics");
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchMetrics();
    }
  }, [roomId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 animate-pulse bg-muted rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Room Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              {error || "No climate data available"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formattedMetrics = [
    {
      title: "Average Temperature",
      value: metrics.avg_temperature
        ? `${parseFloat(metrics.avg_temperature).toFixed(1)}°C`
        : "N/A",
      icon: <ThermometerIcon className="h-4 w-4" />,
      color: "text-red-500",
    },
    {
      title: "Average Humidity",
      value: metrics.avg_humidity
        ? `${parseFloat(metrics.avg_humidity).toFixed(1)}%`
        : "N/A",
      icon: <DropletIcon className="h-4 w-4" />,
      color: "text-blue-500",
    },
    {
      title: "Total Readings",
      value: metrics.reading_count
        ? metrics.reading_count.toLocaleString()
        : "0",
      icon: <BarChartIcon className="h-4 w-4" />,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {formattedMetrics.map((metric, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className={`flex items-center text-sm ${metric.color}`}>
              {metric.icon}
              <span className="ml-2">{metric.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
