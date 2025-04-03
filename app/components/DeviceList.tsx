"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Device {
  id: string;
  name: string;
  lastReading?: {
    temperature: number;
    humidity: number;
    airQuality: number;
    timestamp: string;
  };
}

interface DeviceListProps {
  roomId: string;
  devices: Device[];
}

export function DeviceList({ roomId, devices }: DeviceListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {devices.map((device) => (
        <Card key={device.id}>
          <CardHeader>
            <CardTitle>{device.name}</CardTitle>
            <CardDescription>{device.id}</CardDescription>
          </CardHeader>
          <CardContent>
            {device.lastReading ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span>{device.lastReading.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Humidity:</span>
                  <span>{device.lastReading.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Air Quality:</span>
                  <span>{device.lastReading.airQuality}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last updated:{" "}
                  {formatDistanceToNow(new Date(device.lastReading.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No recent readings</p>
            )}
          </CardContent>
        </Card>
      ))}
      {devices.length === 0 && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>No Devices</CardTitle>
            <CardDescription>This room has no devices yet.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
