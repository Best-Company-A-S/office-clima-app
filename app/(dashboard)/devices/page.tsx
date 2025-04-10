"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { DeviceList } from "@/components/DeviceList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Activity,
  Loader2,
  PlusCircle,
  Trash,
  MoreHorizontal,
  Settings,
  Thermometer,
  ExternalLink,
  Search,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";
import { DevicePairingModal } from "@/components/modals/DevicePairingModal";
import { Room } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

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
    batteryVoltage?: number;
    batteryPercentage?: number;
    batteryTimeRemaining?: number;
    timestamp: string;
  };
}

// We extend the Prisma Room type to include devices if needed
interface RoomWithDevices extends Room {
  devices?: Device[];
}

export default function DevicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const roomId = searchParams.get("roomId");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<RoomWithDevices[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(roomId);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
          setFilteredDevices(devicesResponse.data);
        } else {
          // If no room is selected, fetch all devices for the team
          const devicesResponse = await axios.get(
            `/api/devices?teamId=${teamId}`
          );
          setDevices(devicesResponse.data);
          setFilteredDevices(devicesResponse.data);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.error || "Failed to load data");
        setDevices([]);
        setFilteredDevices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [teamId, roomId]);

  // Filter devices based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDevices(devices);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = devices.filter(
        (device) =>
          device.name?.toLowerCase().includes(query) ||
          false ||
          device.device_id.toLowerCase().includes(query) ||
          device.model?.toLowerCase().includes(query) ||
          false
      );
      setFilteredDevices(filtered);
    }
  }, [searchQuery, devices]);

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
          setFilteredDevices(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching all devices:", err);
          setError(err.response?.data?.error || "Failed to load devices");
          setDevices([]);
          setFilteredDevices([]);
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
          setFilteredDevices(response.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching devices for room:", err);
          setError(err.response?.data?.error || "Failed to load devices");
          setDevices([]);
          setFilteredDevices([]);
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

  // Handle device delete
  const handleDeleteDevice = async () => {
    if (!deviceToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/api/devices/${deviceToDelete.device_id}`);

      // Update local state after successful deletion
      setDevices(
        devices.filter((d) => d.device_id !== deviceToDelete.device_id)
      );
      setFilteredDevices(
        filteredDevices.filter((d) => d.device_id !== deviceToDelete.device_id)
      );

      toast.success(
        `Device ${
          deviceToDelete.name || deviceToDelete.device_id
        } deleted successfully`
      );
      setDeviceToDelete(null);
    } catch (error) {
      console.error("Error deleting device:", error);
      toast.error("Failed to delete device");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle refresh
  const handleRefreshData = async () => {
    if (!teamId) return;

    setIsRefreshing(true);
    try {
      if (activeRoomId) {
        const response = await axios.get(`/api/devices?roomId=${activeRoomId}`);
        setDevices(response.data);
        setFilteredDevices(response.data);
      } else {
        const response = await axios.get(`/api/devices?teamId=${teamId}`);
        setDevices(response.data);
        setFilteredDevices(response.data);
      }
      toast.success("Devices refreshed successfully");
    } catch (error) {
      console.error("Error refreshing devices:", error);
      toast.error("Failed to refresh devices");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Function to get status for a device
  const getDeviceStatus = (device: Device) => {
    if (!device.lastSeenAt) return { badge: "offline", label: "Offline" };

    const lastSeen = new Date(device.lastSeenAt);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - lastSeen.getTime()) / 60000
    );

    if (diffMinutes < 5) return { badge: "online", label: "Online" };
    if (diffMinutes < 60) return { badge: "idle", label: "Idle" };
    return { badge: "offline", label: "Offline" };
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
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>

          <Button variant="outline" onClick={() => router.push("/updates")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>Updates</span>
          </Button>

          <Button size="sm" className="h-9" onClick={handleAddDevice}>
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Add Device</span>
          </Button>
        </div>
      </div>

      {rooms.length > 0 ? (
        <>
          <Tabs
            defaultValue={activeRoomId || "all"}
            className="space-y-4"
            onValueChange={handleRoomChange}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
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

              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardHeader className="px-6 pb-3">
                <CardTitle>Device List</CardTitle>
                <CardDescription>
                  {filteredDevices.length} device
                  {filteredDevices.length !== 1 ? "s" : ""}{" "}
                  {activeRoomId !== "all" && selectedRoom
                    ? `in ${selectedRoom.name}`
                    : "across all rooms"}
                </CardDescription>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                        Device
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                        Model
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                        Firmware
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                        Last Seen
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground w-10">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDevices.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-muted-foreground"
                        >
                          <Activity className="h-8 w-8 mx-auto mb-2" />
                          <p>No devices found</p>
                          <Button
                            variant="link"
                            onClick={handleAddDevice}
                            className="mt-2"
                          >
                            Add a device
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      filteredDevices.map((device) => {
                        const status = getDeviceStatus(device);
                        return (
                          <tr
                            key={device.device_id}
                            className="border-b hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <Thermometer className="h-8 w-8 mr-3 text-primary p-1.5 bg-primary/10 rounded-md" />
                                <div>
                                  <div className="font-medium">
                                    {device.name || device.device_id}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {device.description || device.device_id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                variant={
                                  status.badge === "online"
                                    ? "default"
                                    : status.badge === "idle"
                                    ? "secondary"
                                    : "outline"
                                }
                                className={`flex items-center gap-1 w-[90px] justify-center ${
                                  status.badge === "online"
                                    ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
                                    : status.badge === "idle"
                                    ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20"
                                    : "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20"
                                }`}
                              >
                                {status.badge === "online" ? (
                                  <CheckCircle className="h-3 w-3" />
                                ) : status.badge === "idle" ? (
                                  <AlertCircle className="h-3 w-3" />
                                ) : (
                                  <AlertCircle className="h-3 w-3" />
                                )}
                                {status.label}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              {device.model || "Unknown"}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              {device.firmwareVersion || "Unknown"}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              {device.lastSeenAt
                                ? formatDistanceToNow(
                                    new Date(device.lastSeenAt),
                                    { addSuffix: true }
                                  )
                                : "Never"}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(
                                        `/devices/${device.device_id}`
                                      )
                                    }
                                  >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Device Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => setDeviceToDelete(device)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete Device
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tabs>
        </>
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

      {/* Delete Device Confirmation Dialog */}
      <AlertDialog
        open={deviceToDelete !== null}
        onOpenChange={(open) => !open && setDeviceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Device</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the device &quot;
              {deviceToDelete?.name || deviceToDelete?.device_id}&quot;? This
              action cannot be undone and will remove all device data and
              readings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDevice}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Include the device pairing modal */}
      <DevicePairingModal />
    </div>
  );
}
