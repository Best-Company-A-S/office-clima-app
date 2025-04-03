"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  QrCode,
  LineChart,
  ThermometerSun,
  Droplets,
  Wind,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import axios from "axios";

// Types for our data
interface RoomData {
  id: string;
  name: string;
  description: string | null;
  teamId: string;
  devices: Array<{
    id: string;
    name: string;
    deviceId: string;
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
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<RoomData | null>(null);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/rooms/${params.roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
        toast.error("Failed to load room data");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.roomId) {
      fetchRoomData();
    }
  }, [params.roomId]);

  const handleCreateSurvey = async () => {
    try {
      const response = await axios.post(`/api/rooms/${params.roomId}/surveys`);
      const { surveyId, qrCode } = response.data;
      setActiveSurvey(surveyId);
      setQrCodeUrl(qrCode);
      toast.success("Survey created successfully");
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
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
          <Button onClick={handleCreateSurvey} className="gap-2">
            <QrCode className="h-4 w-4" />
            Start Survey
          </Button>
        </div>

        <Separator />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Temperature Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temperature
                  </CardTitle>
                  <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {averageReadings
                      ? `${averageReadings.temperature.toFixed(1)}°C`
                      : "No data"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average across all devices
                  </p>
                </CardContent>
              </Card>

              {/* Humidity Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Humidity
                  </CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {averageReadings
                      ? `${averageReadings.humidity.toFixed(1)}%`
                      : "No data"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average across all devices
                  </p>
                </CardContent>
              </Card>

              {/* Air Quality Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Air Quality
                  </CardTitle>
                  <Wind className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {averageReadings
                      ? `${averageReadings.airQuality.toFixed(0)}`
                      : "No data"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average AQI across all devices
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart will be added here */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
                <CardDescription>
                  Temperature and humidity trends over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* We'll add a chart component here later */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <LineChart className="h-8 w-8" />
                  <span className="ml-2">
                    Historical data visualization coming soon
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.devices.map((device) => (
                <Card key={device.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <CardDescription>{device.deviceId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {device.lastReading ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Temperature:
                          </span>
                          <span>{device.lastReading.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Humidity:
                          </span>
                          <span>{device.lastReading.humidity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Air Quality:
                          </span>
                          <span>{device.lastReading.airQuality}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Last updated:{" "}
                          {new Date(
                            device.lastReading.timestamp
                          ).toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No recent readings
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            {activeSurvey && qrCodeUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Survey</CardTitle>
                  <CardDescription>
                    Share this QR code to collect feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-64 h-64 bg-white p-4 rounded-lg">
                    <img
                      src={qrCodeUrl}
                      alt="Survey QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      navigator.clipboard.writeText(qrCodeUrl);
                      toast.success("QR Code URL copied to clipboard");
                    }}
                  >
                    Copy Link
                  </Button>
                </CardContent>
              </Card>
            )}

            {surveys.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surveys.map((survey) => (
                  <Card key={survey.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <CardDescription>
                        Created{" "}
                        {new Date(survey.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{survey.responses} responses</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Surveys Yet</CardTitle>
                  <CardDescription>
                    Create a survey to gather feedback about this room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleCreateSurvey} className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Start New Survey
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
