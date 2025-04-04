"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "@/app/components/SurveyList";
import { toast } from "sonner";
import axios from "axios";
import { DeviceList } from "@/app/components/DeviceList";
import { DeviceReadingsChart } from "@/app/components/DeviceReadingsChart";
import { RoomMetrics } from "@/app/components/RoomMetrics";

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

        {/* Room Metrics */}
        <RoomMetrics roomId={room.id} />

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DeviceReadingsChart roomId={room.id} />
          </TabsContent>
          <TabsContent value="devices">
            <DeviceList roomId={room.id} devices={room.devices} />
          </TabsContent>
          <TabsContent value="surveys">
            <SurveyList
              roomId={room.id}
              surveys={surveys}
              onSurveyDeleted={fetchData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
