"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { QrScanner } from "@/components/QrScanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, QrCode, Clipboard, Search, RefreshCw } from "lucide-react";
import { Room } from "@prisma/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Configuration step form schema
const configDeviceSchema = z.object({
  name: z.string().min(1, "Device name is required").max(100),
  description: z.string().max(500).optional(),
  roomId: z.string().optional(),
});

type ConfigFormValues = z.infer<typeof configDeviceSchema>;

// Manual ID entry form schema
const manualIdSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
});

type ManualIdFormValues = z.infer<typeof manualIdSchema>;

export const DevicePairingModal = () => {
  const {
    isOpen,
    onClose,
    currentStep,
    setStep,
    deviceId,
    setDeviceId,
    deviceDetails,
    setDeviceDetails,
    preselectedRoom,
  } = useDevicePairingModal();

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const router = useRouter();

  // Form for device configuration
  const configForm = useForm<ConfigFormValues>({
    resolver: zodResolver(configDeviceSchema),
    defaultValues: {
      name: "",
      description: "",
      roomId: preselectedRoom?.id || "none",
    },
  });

  // Form for manual device ID entry
  const manualForm = useForm<ManualIdFormValues>({
    resolver: zodResolver(manualIdSchema),
    defaultValues: {
      deviceId: deviceId || "",
    },
  });

  // Load available rooms for the dropdown
  useEffect(() => {
    const fetchRooms = async () => {
      if (currentStep === "configure" && isOpen) {
        try {
          // Get the team ID from the preselected room
          const teamId = preselectedRoom?.teamId;

          if (teamId) {
            const response = await axios.get(`/api/rooms?teamId=${teamId}`);
            setAvailableRooms(response.data);
          }
        } catch (error) {
          console.error("Error fetching rooms:", error);
          toast.error("Failed to load rooms");
        }
      }
    };

    fetchRooms();
  }, [currentStep, isOpen, preselectedRoom]);

  // Update the config form when device details or preselected room changes
  useEffect(() => {
    if (currentStep === "configure") {
      configForm.reset({
        name: deviceDetails?.name || "",
        description: deviceDetails?.description || "",
        // If there's a preselectedRoom, use its ID, otherwise use the device's roomId or "none"
        roomId: preselectedRoom?.id || deviceDetails?.roomId || "none",
      });
    }
  }, [deviceDetails, preselectedRoom, currentStep, configForm]);

  // Handle QR code scan result
  const handleScanResult = (result: string) => {
    setDeviceId(result);
    verifyDevice(result);
  };

  // Verify the device ID exists
  const verifyDevice = async (id: string) => {
    setIsVerifying(true);
    try {
      const response = await axios.get(`/api/devices/check?deviceId=${id}`);
      const { exists, device } = response.data;

      if (exists) {
        setDeviceDetails(device);
        toast.success("Device found");
      } else {
        toast.error("Device not found");
        setDeviceDetails(null);
      }
    } catch (error) {
      console.error("Error verifying device:", error);
      toast.error("Failed to verify device");
      setDeviceDetails(null);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle manual device ID verification
  const onSubmitManualId = async (data: ManualIdFormValues) => {
    setDeviceId(data.deviceId);
    verifyDevice(data.deviceId);
  };

  // Handle device configuration submission
  const onSubmitConfig = async (data: ConfigFormValues) => {
    if (!deviceId) {
      toast.error("Device ID is required");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/devices/pair", {
        device_id: deviceId,
        ...data,
        roomId: data.roomId === "none" ? null : data.roomId,
      });

      toast.success("Device paired successfully");
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error pairing device:", error);
      toast.error("Failed to pair device");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate the dialog title based on the current step
  const getTitle = () => {
    switch (currentStep) {
      case "scan":
        return "Pair a Device";
      case "manual":
        return "Enter Device ID";
      case "configure":
        return "Configure Device";
      default:
        return "Pair a Device";
    }
  };

  // Generate the dialog description based on the current step
  const getDescription = () => {
    switch (currentStep) {
      case "scan":
        return "Scan the QR code on your device or enter the device ID manually";
      case "manual":
        return "Enter the device ID found on your device";
      case "configure":
        return "Configure your device settings";
      default:
        return "Follow the steps to pair your device";
    }
  };

  // Render content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case "scan":
        return (
          <div className="space-y-6">
            <div className="text-center border rounded-lg p-4 bg-muted/50">
              <QrCode className="mx-auto h-12 w-12 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">
                Position the QR code within the camera view to scan it
              </p>
            </div>

            <div className="aspect-square overflow-hidden rounded-lg border border-border">
              <QrScanner onResult={handleScanResult} />
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setStep("manual")}
                className="gap-2"
              >
                <Clipboard className="h-4 w-4" />
                Enter Manually
              </Button>
            </div>
          </div>
        );

      case "manual":
        return (
          <Form {...manualForm}>
            <form
              onSubmit={manualForm.handleSubmit(onSubmitManualId)}
              className="space-y-4"
            >
              <FormField
                control={manualForm.control}
                name="deviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device ID</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          disabled={isVerifying}
                          placeholder="Enter the device ID"
                          {...field}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          disabled={isVerifying}
                        >
                          {isVerifying ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      The device ID is usually printed on the device or on its
                      packaging
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("scan")}
                  className="gap-2"
                  disabled={isVerifying}
                >
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </Button>
                <Button type="submit" disabled={isVerifying}>
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Verify Device
                </Button>
              </div>
            </form>
          </Form>
        );

      case "configure":
        return (
          <Form {...configForm}>
            <form
              onSubmit={configForm.handleSubmit(onSubmitConfig)}
              className="space-y-4"
            >
              {deviceDetails?.isPaired && (
                <Alert
                  variant="default"
                  className="bg-yellow-50 text-yellow-800 border-yellow-200"
                >
                  <AlertDescription>
                    This device is already paired. Re-pairing will update its
                    configuration.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/50 p-3 rounded-md mb-2">
                <p className="text-sm font-medium">Device ID: {deviceId}</p>
                {deviceDetails?.model && (
                  <p className="text-xs text-muted-foreground">
                    Model: {deviceDetails.model}
                  </p>
                )}
              </div>

              <FormField
                control={configForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Living Room Sensor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={configForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Notes about this device..."
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={configForm.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to Room (Optional)</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a room" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No room assignment</SelectItem>
                        {availableRooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDeviceId("");
                    setDeviceDetails(null);
                    setStep("scan");
                  }}
                  disabled={isLoading}
                  className="mr-auto gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Restart
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Pair Device
                </Button>
              </DialogFooter>
            </form>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};
