"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface DeviceDetails {
  device_id: string;
  name: string;
  description: string;
  model: string;
  firmwareVersion: string;
  isPaired: boolean;
  roomId: string | null;
  roomName?: string;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function DeviceDetailsPage() {
  const router = useRouter();
  const { deviceId } = useParams();
  const [device, setDevice] = useState<DeviceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/devices/${deviceId}`);
        setDevice(response.data);
      } catch (error) {
        console.error("Error fetching device details:", error);
        toast.error("Failed to load device details");
      } finally {
        setIsLoading(false);
      }
    };

    if (deviceId) {
      fetchDeviceDetails();
    }
  }, [deviceId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="p-6">
        <Link href="/devices">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Devices
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium">Device not found</h2>
              <p className="text-muted-foreground">
                The device you're looking for doesn't exist or you don't have
                permission to view it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/devices">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Devices
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{device.name || device.device_id}</CardTitle>
            <CardDescription>
              {device.description || `Device ID: ${device.device_id}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Model
                </h3>
                <p>{device.model || "Unknown"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Room
                </h3>
                <p>{device.roomName || "Not assigned"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Last Seen
                </h3>
                <p>
                  {device.lastSeenAt
                    ? new Date(device.lastSeenAt).toLocaleString()
                    : "Never"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Paired
                </h3>
                <p>{device.isPaired ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Firmware Version
                </h3>
                <p>{device.firmwareVersion || "Unknown"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>
                  View and manage device information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Firmware Management
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Device firmware is now managed centrally from the Updates
                      page. This allows you to update multiple devices at once.
                    </p>
                    <Button onClick={() => router.push("/updates")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Go to Updates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Settings</CardTitle>
                <CardDescription>
                  Configure device settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Device settings will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
