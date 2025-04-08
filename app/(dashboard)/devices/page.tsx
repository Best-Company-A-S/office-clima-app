"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { DeviceList } from "@/components/DeviceList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";
import { DevicePairingModal } from "@/components/modals/DevicePairingModal";
import { Room } from "@prisma/client";

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

// We extend the Prisma Room type to include devices if needed
interface RoomWithDevices extends Room {
  devices?: Device[];
}

export default function DevicesPage() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const roomId = searchParams.get("roomId");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<RoomWithDevices[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(roomId);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Use the device pairing modal
  const devicePairingModal = useDevicePairingModal();

  // Fetch rooms and devices
  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) {
        setError("No team selected");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch rooms for this team
        const roomsResponse = await axios.get(`/api/rooms?teamId=${teamId}`);
        setRooms(roomsResponse.data);

        // If no roomId is specified but we have rooms, use the first room as default
        if (!roomId && roomsResponse.data.length > 0) {
          setActiveRoomId(roomsResponse.data[0].id);
          setSelectedRoom(roomsResponse.data[0]);
        } else if (roomId) {
          // Find the selected room if roomId is specified
          const room = roomsResponse.data.find(
            (r: RoomWithDevices) => r.id === roomId
          );
          if (room) {
            setSelectedRoom(room);
          }
        }

        // If a roomId is specified or we have a default room, fetch devices for that room
        const targetRoomId =
          roomId ||
          (roomsResponse.data.length > 0 ? roomsResponse.data[0].id : null);

        if (targetRoomId) {
          const devicesResponse = await axios.get(
            `/api/devices?roomId=${targetRoomId}`
          );
          setDevices(devicesResponse.data);
        } else {
          // If no room is selected, fetch all devices for the team
          const devicesResponse = await axios.get(
            `/api/devices?teamId=${teamId}`
          );
          setDevices(devicesResponse.data);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.error || "Failed to load data");
        setDevices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [teamId, roomId]);

  // Handle room tab change
  const handleRoomChange = (value: string) => {
    if (value === "all") {
      setActiveRoomId(null);
      setSelectedRoom(null);
      setIsLoading(true);

      // Fetch all devices for the team
      axios
        .get(`/api/devices?teamId=${teamId}`)
        .then((response) => {
          setDevices(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching all devices:", err);
          setError(err.response?.data?.error || "Failed to load devices");
          setDevices([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Handle room selection
      setActiveRoomId(value);
      const room = rooms.find((r) => r.id === value) || null;
      setSelectedRoom(room);
      setIsLoading(true);

      // Fetch devices for the selected room
      axios
        .get(`/api/devices?roomId=${value}`)
        .then((response) => {
          setDevices(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching devices for room:", err);
          setError(err.response?.data?.error || "Failed to load devices");
          setDevices([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Handle add device click
  const handleAddDevice = () => {
    if (selectedRoom) {
      devicePairingModal.onOpen(selectedRoom);
    } else {
      devicePairingModal.onOpen();
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading devices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load devices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Devices</h1>
          <p className="text-muted-foreground">
            Manage and monitor your climate devices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="h-9" onClick={handleAddDevice}>
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Add Device</span>
          </Button>
        </div>
      </div>

      {rooms.length > 0 ? (
        <Tabs
          defaultValue={activeRoomId || "all"}
          className="space-y-4"
          onValueChange={handleRoomChange}
        >
          <TabsList className="bg-muted/60 p-1 overflow-x-auto flex flex-nowrap max-w-full">
            <TabsTrigger value="all" className="whitespace-nowrap">
              All Devices
            </TabsTrigger>
            {rooms.map((room) => (
              <TabsTrigger
                key={room.id}
                value={room.id}
                className="whitespace-nowrap"
              >
                {room.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <DeviceList roomId="" devices={devices} />
          </TabsContent>

          {rooms.map((room) => (
            <TabsContent key={room.id} value={room.id} className="space-y-4">
              <DeviceList roomId={room.id} devices={devices} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              No Rooms Found
            </CardTitle>
            <CardDescription>
              Create a room first to add devices
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
            <Button>Create Room</Button>
          </CardContent>
        </Card>
      )}

      {/* Include the device pairing modal */}
      <DevicePairingModal />
    </div>
  );
}
