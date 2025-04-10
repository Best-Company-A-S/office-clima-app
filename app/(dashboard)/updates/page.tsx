"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Download,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Laptop,
  Terminal,
  GitBranch,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

interface Firmware {
  id: string;
  version: string;
  modelType: string;
  releaseNotes: string;
  filename: string;
  fileSize: number;
  status: string;
  createdAt: string;
}

interface Device {
  device_id: string;
  name: string | null;
  model: string | null;
  firmwareVersion: string | null;
  firmwareStatus: string | null;
  lastUpdatedAt: string | null;
  autoUpdate: boolean;
  lastSeenAt: string | null;
  roomId: string | null;
  roomName?: string | null;
}

export default function UpdatesPage() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");

  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [firmwares, setFirmwares] = useState<Firmware[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeletingFirmware, setIsDeletingFirmware] = useState<string | null>(
    null
  );
  const [firmwareToDelete, setFirmwareToDelete] = useState<Firmware | null>(
    null
  );
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedFirmware, setSelectedFirmware] = useState<string | null>(null);
  const [showDeployConfirmation, setShowDeployConfirmation] = useState(false);

  // Fetch devices and firmware
  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) return;

      setIsLoading(true);
      try {
        // Fetch devices for this team
        const devicesResponse = await axios.get(
          `/api/devices?teamId=${teamId}&extended=true`
        );
        setDevices(devicesResponse.data);

        // Fetch available firmware
        const firmwareResponse = await axios.get("/api/firmware");
        setFirmwares(firmwareResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load devices or firmware information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  // Refresh data
  const refreshData = async () => {
    if (!teamId) return;

    setIsRefreshing(true);
    try {
      // Fetch devices for this team
      const devicesResponse = await axios.get(
        `/api/devices?teamId=${teamId}&extended=true`
      );
      setDevices(devicesResponse.data);

      // Fetch available firmware
      const firmwareResponse = await axios.get("/api/firmware");
      setFirmwares(firmwareResponse.data);

      toast.success("Data refreshed successfully");
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Renamed from syncWithGitHub to downloadFromGitHub
  const downloadFromGitHub = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.post("/api/firmware/sync-github");
      toast.success(
        response.data.message || "Downloaded firmware from GitHub releases"
      );

      // Refresh firmware list
      const firmwareResponse = await axios.get("/api/firmware");
      setFirmwares(firmwareResponse.data);
    } catch (error: any) {
      console.error("Error downloading from GitHub:", error);

      // Handle repository not found error specifically
      if (error.response?.status === 404) {
        toast.error(
          <div>
            <p className="font-medium">
              {error.response.data.message || "Failed to download from GitHub"}
            </p>
            <p className="text-sm mt-1">
              Check that your GitHub token has proper permissions.
            </p>
          </div>,
          { duration: 10000 }
        );
      } else {
        toast.error(
          error.response?.data?.error || "Failed to download from GitHub"
        );
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Toggle device selection
  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  // Select all devices
  const selectAllDevices = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map((device) => device.device_id));
    }
  };

  // Toggle auto-update for a device
  const toggleAutoUpdate = async (deviceId: string, currentValue: boolean) => {
    try {
      await axios.patch(`/api/devices/${deviceId}`, {
        autoUpdate: !currentValue,
      });

      // Update local state
      setDevices(
        devices.map((device) =>
          device.device_id === deviceId
            ? { ...device, autoUpdate: !currentValue }
            : device
        )
      );

      toast.success(
        `Auto-update ${!currentValue ? "enabled" : "disabled"} for device`
      );
    } catch (error) {
      console.error("Error toggling auto-update:", error);
      toast.error("Failed to update device settings");
    }
  };

  // Deploy firmware to selected devices
  const deployToSelectedDevices = async () => {
    if (selectedDevices.length === 0) {
      toast.error("Please select at least one device to deploy firmware to");
      return;
    }

    if (!selectedFirmware) {
      toast.error("Please select a firmware version to deploy");
      return;
    }

    setIsDeploying(true);
    try {
      // Update each selected device with the selected firmware
      await Promise.all(
        selectedDevices.map((deviceId) =>
          axios.post(`/api/devices/${deviceId}/deployFirmware`, {
            firmwareId: selectedFirmware,
          })
        )
      );

      toast.success(
        `Firmware will be deployed to ${selectedDevices.length} devices on their next check-in`
      );

      // Reset selection
      setSelectedDevices([]);
      setSelectedFirmware(null);
      setShowDeployConfirmation(false);

      // Refresh data after a short delay
      setTimeout(() => refreshData(), 1000);
    } catch (error) {
      console.error("Error deploying firmware:", error);
      toast.error("Failed to deploy firmware to devices");
    } finally {
      setIsDeploying(false);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string | null) => {
    if (!status)
      return (
        <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          Unknown
        </Badge>
      );

    switch (status) {
      case "UP_TO_DATE":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-600 border-green-500/20"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Up to date
          </Badge>
        );
      case "UPDATING":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-600 border-blue-500/20"
          >
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Updating
          </Badge>
        );
      case "UPDATE_FAILED":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-600 border-red-500/20"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case "UPDATE_AVAILABLE":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 border-amber-500/20"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
            {status}
          </Badge>
        );
    }
  };

  // Delete firmware version
  const deleteFirmware = async (firmwareId: string) => {
    setIsDeletingFirmware(firmwareId);
    try {
      await axios.delete(`/api/firmware/${firmwareId}`);

      // Update state
      setFirmwares(firmwares.filter((firmware) => firmware.id !== firmwareId));
      toast.success("Firmware version deleted successfully");

      // Close confirmation dialog
      setFirmwareToDelete(null);
    } catch (error) {
      console.error("Error deleting firmware:", error);
      toast.error("Failed to delete firmware version");
    } finally {
      setIsDeletingFirmware(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Device Updates</h1>
          <p className="text-muted-foreground">
            Manage firmware updates for all your devices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={refreshData}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            onClick={downloadFromGitHub}
            disabled={isDownloading}
          >
            <GitBranch
              className={`h-4 w-4 mr-2 ${isDownloading ? "animate-spin" : ""}`}
            />
            <span>Download from GitHub</span>
          </Button>

          <Button
            onClick={() => {
              if (selectedFirmware && selectedDevices.length > 0) {
                setShowDeployConfirmation(true);
              } else if (!selectedFirmware) {
                toast.error("Please select a firmware version to deploy");
              } else {
                toast.error("Please select at least one device");
              }
            }}
            disabled={
              selectedDevices.length === 0 || isDeploying || !selectedFirmware
            }
          >
            {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Download className="h-4 w-4 mr-2" />
            <span>Deploy to Selected ({selectedDevices.length})</span>
          </Button>
        </div>
      </div>

      {/* Available Firmware */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Available Firmware</CardTitle>
          <CardDescription>
            Firmware versions that can be deployed to your devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {firmwares.length === 0 ? (
            <div className="text-center py-6">
              <Terminal className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No firmware available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Download firmware from GitHub to get started
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Released</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firmwares.map((firmware) => (
                  <TableRow key={firmware.id}>
                    <TableCell>
                      <input
                        type="radio"
                        name="selectedFirmware"
                        checked={selectedFirmware === firmware.id}
                        onChange={() => setSelectedFirmware(firmware.id)}
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary/80"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {firmware.version}
                    </TableCell>
                    <TableCell>{firmware.modelType}</TableCell>
                    <TableCell>
                      {(firmware.fileSize / 1024).toFixed(2)} KB
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(firmware.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">
                            <span className="truncate">
                              {firmware.releaseNotes || "No release notes"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>{firmware.releaseNotes || "No release notes"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setFirmwareToDelete(firmware)}
                              disabled={isDeletingFirmware === firmware.id}
                            >
                              {isDeletingFirmware === firmware.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-red-500" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete firmware</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Firmware Confirmation Dialog */}
      <AlertDialog
        open={firmwareToDelete !== null}
        onOpenChange={(open) => !open && setFirmwareToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Delete Firmware Version
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete firmware version{" "}
              <strong>{firmwareToDelete?.version}</strong> for{" "}
              <strong>{firmwareToDelete?.modelType}</strong>?
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                This action cannot be undone. Devices that are currently using
                this firmware version will not be affected, but you will no
                longer be able to deploy this version to devices.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                firmwareToDelete && deleteFirmware(firmwareToDelete.id)
              }
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeletingFirmware ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deploy Confirmation Dialog */}
      <AlertDialog
        open={showDeployConfirmation}
        onOpenChange={setShowDeployConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy Firmware</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deploy the selected firmware to{" "}
              {selectedDevices.length} device
              {selectedDevices.length !== 1 ? "s" : ""}?
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
                <p className="font-medium mb-1">Selected firmware:</p>
                {selectedFirmware &&
                firmwares.find((f) => f.id === selectedFirmware) ? (
                  <ul className="list-disc ml-4 space-y-1">
                    <li>
                      Version:{" "}
                      {
                        firmwares.find((f) => f.id === selectedFirmware)
                          ?.version
                      }
                    </li>
                    <li>
                      Model:{" "}
                      {
                        firmwares.find((f) => f.id === selectedFirmware)
                          ?.modelType
                      }
                    </li>
                    <li>
                      Size:{" "}
                      {(firmwares.find((f) => f.id === selectedFirmware)
                        ?.fileSize || 0) / 1024}{" "}
                      KB
                    </li>
                  </ul>
                ) : (
                  <p>No firmware selected</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deployToSelectedDevices}
              disabled={isDeploying}
              className="bg-primary hover:bg-primary/90"
            >
              {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deploy Firmware
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Device Firmware Status</CardTitle>
          <CardDescription>
            Manage updates for all connected devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {devices.length === 0 ? (
            <div className="text-center py-6">
              <Laptop className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No devices found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add devices to your team to manage their firmware
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-2">
                <Button variant="outline" size="sm" onClick={selectAllDevices}>
                  {selectedDevices.length === devices.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <span className="sr-only">Select</span>
                    </TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Current Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Auto-Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.device_id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedDevices.includes(device.device_id)}
                          onChange={() =>
                            toggleDeviceSelection(device.device_id)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/80"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {device.name || device.device_id}
                      </TableCell>
                      <TableCell>{device.roomName || "Unassigned"}</TableCell>
                      <TableCell>
                        {device.firmwareVersion || "Unknown"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(device.firmwareStatus)}
                      </TableCell>
                      <TableCell>
                        {device.lastUpdatedAt
                          ? formatDistanceToNow(
                              new Date(device.lastUpdatedAt),
                              { addSuffix: true }
                            )
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={device.autoUpdate}
                          onCheckedChange={() =>
                            toggleAutoUpdate(
                              device.device_id,
                              device.autoUpdate
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xs text-muted-foreground">
            {devices.length} device{devices.length !== 1 ? "s" : ""} total
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
