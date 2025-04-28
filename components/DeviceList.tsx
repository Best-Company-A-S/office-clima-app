"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LatestReadings } from "./LatestReadings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Thermometer,
  Droplet,
  Wind,
  Activity,
  WifiIcon,
  WifiOffIcon,
  Clock,
  Info,
  BarChart4,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Settings,
  Battery,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Device, useDevicesStore } from "@/lib/store/useDevicesStore";
import { createSelectors } from "@/lib/store/useStoreSelectors";

interface DeviceListProps {
  roomId: string;
  initialDevices: Device[];
}

// Create typed selectors for DevicesStore
const useDevicesSelectors =
  createSelectors<ReturnType<typeof useDevicesStore.getState>>();

export function DeviceList({ roomId, initialDevices }: DeviceListProps) {
  // Use atomic state selectors for better performance
  const {
    devices,
    selectedDeviceId,
    setDevices,
    setSelectedDeviceId,
    getDevicesByRoomId,
    setIsLoading,
  } = useDevicesSelectors(useDevicesStore, (state) => ({
    devices: state.devices,
    selectedDeviceId: state.selectedDeviceId,
    setDevices: state.setDevices,
    setSelectedDeviceId: state.setSelectedDeviceId,
    getDevicesByRoomId: state.getDevicesByRoomId,
    setIsLoading: state.setIsLoading,
  }));

  // Local state for view mode and refresh handling
  const { view, setView, isRefreshing, setIsRefreshing } = useViewState();

  // Initialize devices in the store if needed
  useEffect(() => {
    if (initialDevices.length > 0 && devices.length === 0) {
      setDevices(initialDevices);
    }
  }, [initialDevices, devices.length, setDevices]);

  // Get filtered devices for this room
  const roomDevices = getDevicesByRoomId(roomId);

  // Get selected device
  const selectedDevice = selectedDeviceId
    ? devices.find((d) => d.device_id === selectedDeviceId)
    : roomDevices[0] || null;

  // Auto-select first device when component mounts or when devices change
  useEffect(() => {
    if (roomDevices.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(roomDevices[0].device_id);
    }
  }, [roomDevices, selectedDeviceId, setSelectedDeviceId]);

  // Simulate refresh functionality
  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 1500);
  };

  // Get device status
  const getDeviceStatus = (device: Device) => {
    if (!device.lastSeenAt) return "offline";

    const lastSeen = new Date(device.lastSeenAt);
    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 5) return "online";
    if (diffMins < 60) return "idle";
    return "offline";
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-500";
      case "idle":
        return "text-amber-500";
      case "offline":
        return "text-slate-400";
      default:
        return "text-slate-400";
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Online
          </Badge>
        );
      case "idle":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20"
          >
            <Clock className="h-3 w-3 mr-1" />
            Idle
          </Badge>
        );
      case "offline":
        return (
          <Badge
            variant="outline"
            className="bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20"
          >
            <WifiOffIcon className="h-3 w-3 mr-1" />
            Offline
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
            Unknown
          </Badge>
        );
    }
  };

  // Map air quality value to label
  const getAirQualityLabel = (value: number) => {
    if (value < 50) return "Excellent";
    if (value < 100) return "Good";
    if (value < 150) return "Moderate";
    if (value < 200) return "Poor";
    return "Hazardous";
  };

  // Get air quality color
  const getAirQualityColor = (value: number) => {
    if (value < 50) return "text-green-500";
    if (value < 100) return "text-emerald-500";
    if (value < 150) return "text-amber-500";
    if (value < 200) return "text-orange-500";
    return "text-red-500";
  };

  if (roomDevices.length === 0) {
    return (
      <Card className="col-span-full border-none shadow-md rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle>No Devices Found</CardTitle>
          <CardDescription>
            This room has no devices connected yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <WifiOffIcon className="h-8 w-8 text-primary/70" />
          </div>
          <p className="text-center text-muted-foreground max-w-md">
            To start monitoring climate conditions, add a device to this room.
          </p>
          <Button className="mt-4">Add Device</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header with view toggle and action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-1 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Connected Devices
          </h2>
          <p className="text-sm text-muted-foreground">
            {devices.length} {devices.length === 1 ? "device" : "devices"} in
            this room
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Tabs defaultValue={view} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="grid"
                onClick={() => setView("grid")}
                className="text-xs px-2"
              >
                Grid View
              </TabsTrigger>
              <TabsTrigger
                value="list"
                onClick={() => setView("list")}
                className="text-xs px-2"
              >
                List View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Device Grid View */}
      <AnimatePresence mode="wait">
        {view === "grid" && (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {devices.map((device) => {
              const status = getDeviceStatus(device);
              const statusColor = getStatusColor(status);
              const statusBadge = getStatusBadge(status);

              return (
                <motion.div
                  key={device.device_id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card
                    className={`h-full cursor-pointer transition-all ${
                      selectedDevice?.device_id === device.device_id
                        ? "border-primary/70 shadow-md bg-primary/5"
                        : "hover:border-primary/30 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedDeviceId(device.device_id)}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="flex items-center gap-2 mb-1">
                          {device.name || "Unnamed Device"}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    status === "online"
                                      ? "bg-green-500"
                                      : status === "idle"
                                      ? "bg-amber-500"
                                      : "bg-slate-400"
                                  } animate-pulse`}
                                ></div>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>
                                  {status === "online"
                                    ? "Online"
                                    : status === "idle"
                                    ? "Idle"
                                    : "Offline"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <span className="truncate max-w-[180px]">
                            {device.device_id}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {statusBadge}
                        <Link href={`/devices/${device.device_id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {device.lastReading ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Thermometer className="h-3.5 w-3.5" />
                                  Temperature
                                </span>
                                <span className="font-semibold">
                                  {device.lastReading.temperature.toFixed(1)}°C
                                </span>
                              </div>
                              <Progress
                                value={Math.min(
                                  100,
                                  (device.lastReading.temperature / 40) * 100
                                )}
                                className="h-1.5 bg-slate-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Droplet className="h-3.5 w-3.5" />
                                  Humidity
                                </span>
                                <span className="font-semibold">
                                  {device.lastReading.humidity.toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={device.lastReading.humidity}
                                className="h-1.5 bg-slate-200"
                              />
                            </div>
                          </div>

                          {device.lastReading.batteryVoltage && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Battery className="h-3.5 w-3.5" />
                                  Battery
                                </span>
                                <span className="font-semibold">
                                  {device.lastReading.batteryVoltage.toFixed(2)}
                                  V
                                  {device.lastReading.batteryPercentage !==
                                    undefined && (
                                    <span className="ml-1">
                                      ({device.lastReading.batteryPercentage}%)
                                    </span>
                                  )}
                                  {device.lastReading.batteryTimeRemaining !==
                                    undefined && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      {Math.floor(
                                        device.lastReading
                                          .batteryTimeRemaining / 60
                                      )}
                                      h{" "}
                                      {device.lastReading.batteryTimeRemaining %
                                        60}
                                      m left
                                    </span>
                                  )}
                                </span>
                              </div>
                              <Progress
                                value={
                                  device.lastReading.batteryPercentage !==
                                  undefined
                                    ? device.lastReading.batteryPercentage
                                    : Math.min(
                                        100,
                                        (device.lastReading.batteryVoltage /
                                          3.3) *
                                          100
                                      )
                                }
                                className="h-1.5 bg-slate-200"
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Wind className="h-3.5 w-3.5" />
                                Air Quality
                              </span>
                              <span
                                className={`font-semibold ${getAirQualityColor(
                                  device.lastReading.airQuality
                                )}`}
                              >
                                {getAirQualityLabel(
                                  device.lastReading.airQuality
                                )}
                              </span>
                            </div>
                            <Progress
                              value={Math.min(
                                100,
                                (device.lastReading.airQuality / 300) * 100
                              )}
                              className="h-1.5 bg-slate-200"
                            />
                          </div>

                          {device.lastSeenAt && (
                            <div className="pt-2 flex items-center justify-between text-xs border-t border-border/50">
                              <span className="text-muted-foreground">
                                Last updated
                              </span>
                              <span className={statusColor}>
                                {formatDistanceToNow(
                                  new Date(device.lastSeenAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 space-y-2">
                          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
                          <p className="text-muted-foreground text-sm text-center">
                            No readings available
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end">
                      <Link
                        href={`/devices/${device.device_id}`}
                        className="text-xs text-muted-foreground hover:text-primary hover:underline"
                      >
                        Manage device
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Device List View */}
        {view === "list" && (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-none shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground text-sm">
                          Device
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground text-sm">
                          Status
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground text-sm">
                          Temperature
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground text-sm">
                          Humidity
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground text-sm">
                          Battery
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground text-sm">
                          Air Quality
                        </th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground text-sm">
                          Last Seen
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device) => {
                        const status = getDeviceStatus(device);
                        const statusColor = getStatusColor(status);
                        const statusBadge = getStatusBadge(status);

                        return (
                          <tr
                            key={device.device_id}
                            className={`border-b hover:bg-muted/20 cursor-pointer transition-colors ${
                              selectedDevice?.device_id === device.device_id
                                ? "bg-primary/5"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedDeviceId(device.device_id)
                            }
                          >
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {device.name || "Unnamed Device"}
                                </span>
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {device.device_id}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {statusBadge}
                            </td>
                            <td className="px-4 py-3 text-center font-medium">
                              {device.lastReading
                                ? `${device.lastReading.temperature.toFixed(
                                    1
                                  )}°C`
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3 text-center font-medium">
                              {device.lastReading
                                ? `${device.lastReading.humidity.toFixed(1)}%`
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3 text-center font-medium">
                              {device.lastReading?.batteryVoltage
                                ? `${device.lastReading.batteryVoltage.toFixed(
                                    2
                                  )}V${
                                    device.lastReading.batteryPercentage !==
                                    undefined
                                      ? ` (${device.lastReading.batteryPercentage}%)`
                                      : ""
                                  }${
                                    device.lastReading.batteryTimeRemaining !==
                                    undefined
                                      ? ` • ${Math.floor(
                                          device.lastReading
                                            .batteryTimeRemaining / 60
                                        )}h ${
                                          device.lastReading
                                            .batteryTimeRemaining % 60
                                        }m left`
                                      : ""
                                  }`
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {device.lastReading ? (
                                <span
                                  className={getAirQualityColor(
                                    device.lastReading.airQuality
                                  )}
                                >
                                  {getAirQualityLabel(
                                    device.lastReading.airQuality
                                  )}
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {device.lastSeenAt ? (
                                <span className={statusColor}>
                                  {formatDistanceToNow(
                                    new Date(device.lastSeenAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </span>
                              ) : (
                                <span className="text-slate-400">Never</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Device Details */}
      {selectedDevice && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <LatestReadings
              deviceId={selectedDevice.device_id}
              deviceName={selectedDevice.name || "Device"}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

// Extract view state to a custom hook
function useViewState() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);

  return { view, setView, isRefreshing, setIsRefreshing };
}
