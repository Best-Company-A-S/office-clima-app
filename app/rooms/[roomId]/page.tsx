"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  LineChart,
  ThermometerSun,
  Droplets,
  Wind,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "@/app/components/SurveyList";
import { toast } from "sonner";
import axios from "axios";
import { DeviceList } from "@/app/components/DeviceList";

// Types for our data
interface RoomData {
  id: string;
  name: string;
  description: string | null;
  teamId: string;
  devices: Array<{
    device_id: string;
    name: string | null;
    description: string | null;
    model: string | null;
    firmwareVersion: string | null;
    isPaired: boolean;
    lastSeenAt: string | null;
    roomId: string | null;
    pairedAt: string | null;
    createdAt: string;
    updatedAt: string;
    lastReading?: {
      temperature: number;
      humidity: number;
      airQuality: number;
      timestamp: string;
    };
  }>;
}

interface SurveyData {
  id: string;
  title: string;
  active: boolean;
  createdAt: string;
  responses: number;
}

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<RoomData | null>(null);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [roomResponse, surveysResponse] = await Promise.all([
        axios.get(`/api/rooms/${params.roomId}`),
        axios.get(`/api/rooms/${params.roomId}/surveys`),
      ]);
      setRoom(roomResponse.data);
      setSurveys(surveysResponse.data);
    } catch (error) {
      toast.error("Failed to load room data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.roomId]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 animate-pulse bg-muted rounded" />
            <div className="h-8 w-48 animate-pulse bg-muted rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-48 animate-pulse bg-muted rounded" />
            <div className="h-48 animate-pulse bg-muted rounded" />
            <div className="h-48 animate-pulse bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The room you're looking for doesn't exist or you don't have access.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const getAverageReadings = () => {
    const devices = room.devices || [];
    if (devices.length === 0) return null;

    let totalTemp = 0;
    let totalHumidity = 0;
    let totalAirQuality = 0;
    let readingsCount = 0;

    devices.forEach((device) => {
      if (device.lastReading) {
        totalTemp += device.lastReading.temperature;
        totalHumidity += device.lastReading.humidity;
        totalAirQuality += device.lastReading.airQuality;
        readingsCount++;
      }
    });

    if (readingsCount === 0) return null;

    return {
      temperature: totalTemp / readingsCount,
      humidity: totalHumidity / readingsCount,
      airQuality: totalAirQuality / readingsCount,
    };
  };

  const averageReadings = getAverageReadings();

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{room.name}</h1>
              {room.description && (
                <p className="text-muted-foreground">{room.description}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <ThermometerSun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageReadings
                  ? `${averageReadings.temperature.toFixed(1)}°C`
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Average across all devices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageReadings
                  ? `${averageReadings.humidity.toFixed(1)}%`
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Average across all devices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageReadings
                  ? `${averageReadings.airQuality.toFixed(0)}`
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Average AQI across all devices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
                <CardDescription>
                  Temperature and humidity trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-8 w-8 mr-2" />
                  <span>Historical data visualization coming soon</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="devices">
            <DeviceList
              roomId={params.roomId}
              devices={room.devices.map((d) => ({
                id: d.device_id,
                name: d.name || "Unnamed Device",
                lastReading: d.lastReading,
              }))}
            />
          </TabsContent>
          <TabsContent value="surveys">
            <SurveyList
              roomId={params.roomId}
              surveys={surveys}
              onSurveyDeleted={fetchData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
