"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { LatestReadings } from "./LatestReadings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Device {
  device_id: string;
  name: string | null;
  description: string | null;
  model: string | null;
  firmwareVersion: string | null;
  isPaired: boolean;
  lastSeenAt: string | null;
  roomId: string | null;
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
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  if (devices.length === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>No Devices</CardTitle>
          <CardDescription>This room has no devices yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <Card
            key={device.device_id}
            className={`cursor-pointer hover:border-primary/50 transition-colors ${
              selectedDevice?.device_id === device.device_id
                ? "border-primary"
                : ""
            }`}
            onClick={() => setSelectedDevice(device)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{device.name || "Unnamed Device"}</CardTitle>
              <CardDescription>{device.device_id}</CardDescription>
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
                  {device.lastSeenAt && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Last seen:{" "}
                      {formatDistanceToNow(new Date(device.lastSeenAt), {
                        addSuffix: true,
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No recent readings</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDevice && (
        <div className="pt-4">
          <LatestReadings
            deviceId={selectedDevice.device_id}
            deviceName={selectedDevice.name || "Device"}
          />
        </div>
      )}
    </div>
  );
}
