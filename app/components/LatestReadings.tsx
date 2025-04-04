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
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Reading {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
  createdAt: string;
}

interface LatestReadingsProps {
  deviceId: string;
  deviceName: string;
}

export function LatestReadings({ deviceId, deviceName }: LatestReadingsProps) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        `/api/devices/readings?deviceId=${deviceId}&limit=5`
      );
      setReadings(response.data.data);
    } catch (err: any) {
      console.error("Error fetching device readings:", err);
      setError(err.response?.data?.error || "Failed to load readings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (deviceId) {
      fetchReadings();
    }
  }, [deviceId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {deviceName || "Device"} - Latest Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {deviceName || "Device"} - Latest Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (readings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {deviceName || "Device"} - Latest Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
          No readings available for this device
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {deviceName || "Device"} - Latest Readings
        </CardTitle>
        <CardDescription>
          Most recent climate data from this device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Time</th>
                <th className="text-right py-2 font-medium">Temp</th>
                <th className="text-right py-2 font-medium">Humidity</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading) => (
                <tr key={reading.id} className="border-b border-muted">
                  <td className="py-2 text-muted-foreground">
                    {format(new Date(reading.timestamp), "MMM d, HH:mm")}
                  </td>
                  <td className="py-2 text-right font-medium">
                    {reading.temperature.toFixed(1)}°C
                  </td>
                  <td className="py-2 text-right font-medium">
                    {reading.humidity.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={fetchReadings}
        >
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}
