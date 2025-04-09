import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

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

interface DeviceInfo {
  device_id: string;
  name: string;
  model: string;
  firmwareVersion: string;
  firmwareStatus: string;
  lastUpdatedAt: string;
  autoUpdate?: boolean;
}

interface DeviceFirmwareManagerProps {
  deviceId: string;
  onUpdated?: () => void;
}

export default function DeviceFirmwareManager({
  deviceId,
  onUpdated,
}: DeviceFirmwareManagerProps) {
  const [firmwares, setFirmwares] = useState<Firmware[]>([]);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isForcingUpdate, setIsForcingUpdate] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isTogglingAutoUpdate, setIsTogglingAutoUpdate] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    version: "",
    modelType: "Arduino_UNO_R4_WiFi",
    releaseNotes: "",
  });
  const [firmwareFile, setFirmwareFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch device information and available firmware
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch device info
        const deviceResponse = await axios.get(`/api/devices/${deviceId}`);
        setDeviceInfo(deviceResponse.data);

        // Fetch available firmware
        const firmwareResponse = await axios.get("/api/firmware");
        setFirmwares(firmwareResponse.data);
      } catch (error) {
        console.error("Error fetching firmware data:", error);
        toast.error("Failed to load firmware information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  // Force update the device
  const forceUpdate = async () => {
    setIsForcingUpdate(true);
    try {
      await axios.post(`/api/devices/${deviceId}/forceUpdate`);
      toast.success("The device will update on its next check-in");
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error("Error forcing update:", error);
      toast.error("Failed to initiate device update");
    } finally {
      setIsForcingUpdate(false);
    }
  };

  // Toggle auto-update feature
  const toggleAutoUpdate = async () => {
    if (!deviceInfo) return;

    setIsTogglingAutoUpdate(true);
    try {
      const response = await axios.patch(`/api/devices/${deviceId}`, {
        autoUpdate: !deviceInfo.autoUpdate,
      });

      setDeviceInfo((prev) =>
        prev ? { ...prev, autoUpdate: !prev.autoUpdate } : null
      );
      toast.success(
        `Auto-update ${!deviceInfo.autoUpdate ? "enabled" : "disabled"}`
      );
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error("Error toggling auto-update:", error);
      toast.error("Failed to update device settings");
    } finally {
      setIsTogglingAutoUpdate(false);
    }
  };

  // Sync with GitHub releases
  const syncWithGitHub = async () => {
    try {
      const response = await axios.post("/api/firmware/sync-github");
      toast.success(
        response.data.message || "Synchronized firmware with GitHub releases"
      );

      // Refresh firmware list
      const firmwareResponse = await axios.get("/api/firmware");
      setFirmwares(firmwareResponse.data);
    } catch (error: any) {
      console.error("Error syncing with GitHub:", error);

      // Handle repository not found error specifically
      if (error.response?.status === 404) {
        // Get token setup instructions
        try {
          const tokenGuideResponse = await axios.get(
            "/api/firmware/github-token"
          );
          const tokenGuide = tokenGuideResponse.data;

          toast.error(
            <div>
              <p className="font-medium">
                {error.response.data.message || "Failed to sync with GitHub"}
              </p>
              <p className="text-sm mt-1">
                Check that your GitHub token has proper permissions.
              </p>
              <a
                href="/api/firmware/github-token"
                target="_blank"
                className="text-sm underline mt-1 block"
              >
                View GitHub Token Setup Guide
              </a>
            </div>,
            { duration: 10000 }
          );
        } catch (guideError) {
          toast.error(
            error.response.data.message || "Failed to sync with GitHub releases"
          );
        }
      } else {
        toast.error(
          error.response?.data?.error || "Failed to sync with GitHub releases"
        );
      }
    }
  };

  // Handle firmware file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFirmwareFile(e.target.files[0]);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUploadFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle model type selection
  const handleModelChange = (value: string) => {
    setUploadFormData((prev) => ({ ...prev, modelType: value }));
  };

  // Handle firmware upload
  const uploadFirmware = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmwareFile) {
      toast.error("Please select a firmware file to upload");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", firmwareFile);
    formData.append("version", uploadFormData.version);
    formData.append("modelType", uploadFormData.modelType);
    formData.append("releaseNotes", uploadFormData.releaseNotes);

    try {
      const response = await axios.post("/api/firmware/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `Firmware version ${uploadFormData.version} uploaded successfully`
      );

      // Reset form
      setFirmwareFile(null);
      setUploadFormData({
        version: "",
        modelType: "Arduino_UNO_R4_WiFi",
        releaseNotes: "",
      });
      setShowUploadForm(false);

      // Refresh firmware list
      const firmwareResponse = await axios.get("/api/firmware");
      setFirmwares(firmwareResponse.data);
    } catch (error: any) {
      console.error("Error uploading firmware:", error);
      toast.error(
        error.response?.data?.error || "Failed to upload firmware file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading firmware information...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Device Firmware</CardTitle>
              <CardDescription>
                Manage firmware updates for this device
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={syncWithGitHub}>
                Sync with GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("/api/firmware/github-token", "_blank")
                }
              >
                GitHub Token Guide
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUploadForm(!showUploadForm)}
              >
                {showUploadForm ? "Cancel" : "Upload Firmware"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {deviceInfo && (
            <div className="mb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Current Version
                  </h3>
                  <p className="text-base">
                    {deviceInfo.firmwareVersion || "Unknown"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h3>
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        deviceInfo.firmwareStatus === "UP_TO_DATE"
                          ? "bg-green-500"
                          : deviceInfo.firmwareStatus === "UPDATING"
                          ? "bg-blue-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <p className="text-base">
                      {deviceInfo.firmwareStatus || "Unknown"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Model
                  </h3>
                  <p className="text-base">{deviceInfo.model || "Unknown"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </h3>
                  <p className="text-base">
                    {deviceInfo.lastUpdatedAt
                      ? new Date(deviceInfo.lastUpdatedAt).toLocaleString()
                      : "Never"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Auto-update from GitHub releases:
                  </span>
                  <Switch
                    checked={deviceInfo.autoUpdate || false}
                    onCheckedChange={toggleAutoUpdate}
                    disabled={isTogglingAutoUpdate}
                  />
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={isForcingUpdate}
                    >
                      {isForcingUpdate ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Initiating update...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Force Update
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Force Firmware Update</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will force the device to update its firmware on the
                        next check-in. The device may be offline during the
                        update process.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={forceUpdate}>
                        Update
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}

          {showUploadForm && (
            <form onSubmit={uploadFirmware} className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Upload New Firmware</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      name="version"
                      placeholder="v0.7.0"
                      value={uploadFormData.version}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelType">Model Type</Label>
                    <Select
                      value={uploadFormData.modelType}
                      onValueChange={handleModelChange}
                    >
                      <SelectTrigger id="modelType">
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arduino_UNO_R4_WiFi">
                          Arduino UNO R4 WiFi
                        </SelectItem>
                        <SelectItem value="ESP32">ESP32</SelectItem>
                        <SelectItem value="ESP8266">ESP8266</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firmware-file">Firmware File</Label>
                  <Input
                    id="firmware-file"
                    type="file"
                    accept=".bin"
                    onChange={handleFileChange}
                    required
                  />
                  {firmwareFile && (
                    <p className="text-xs text-muted-foreground">
                      Selected file: {firmwareFile.name} (
                      {Math.round(firmwareFile.size / 1024)} KB)
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseNotes">Release Notes</Label>
                  <Textarea
                    id="releaseNotes"
                    name="releaseNotes"
                    placeholder="Describe what's new in this firmware version"
                    value={uploadFormData.releaseNotes}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isUploading || !firmwareFile}
                  className="w-40"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {firmwares.length > 0 && (
            <div className={`${showUploadForm ? "mt-6 pt-6 border-t" : ""}`}>
              <h3 className="text-sm font-medium mb-3">Available Firmware</h3>
              <div className="space-y-3">
                {firmwares.map((firmware) => (
                  <div
                    key={firmware.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {firmware.version}
                        </span>
                        {firmware.status === "RELEASED" && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            Released
                          </span>
                        )}
                        {firmware.status === "DRAFT" && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Size: {Math.round(firmware.fileSize / 1024)} KB | Model:{" "}
                        {firmware.modelType} | Uploaded:{" "}
                        {new Date(firmware.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Deploy
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Deploy Firmware</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deploy firmware version {firmware.version} to this
                            device? The device will update on its next check-in.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              try {
                                await axios.post(
                                  `/api/devices/${deviceId}/deployFirmware`,
                                  {
                                    firmwareId: firmware.id,
                                  }
                                );
                                toast.success(
                                  `Firmware ${firmware.version} deployment initiated`
                                );
                                if (onUpdated) onUpdated();
                              } catch (error) {
                                console.error(
                                  "Error deploying firmware:",
                                  error
                                );
                                toast.error("Failed to deploy firmware");
                              }
                            }}
                          >
                            Deploy
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
