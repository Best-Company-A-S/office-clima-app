"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  PlusCircle,
  Thermometer,
  Droplet,
  Gauge,
  Info,
  Home,
} from "lucide-react";
import { useRoomModal } from "@/hooks/useRoomModal";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendedRoom, useRoomsStore } from "@/lib/store/useRoomsStore";
import { createSelectors } from "@/lib/store/useStoreSelectors";

interface RoomCardProps {
  room: ExtendedRoom;
  isTeamOwner: boolean;
  onRoomDeleted?: () => void;
}

// Create typed selectors for RoomsStore
const useRoomsSelectors =
  createSelectors<ReturnType<typeof useRoomsStore.getState>>();

export const RoomCard = ({
  room,
  isTeamOwner,
  onRoomDeleted,
}: RoomCardProps) => {
  const router = useRouter();
  const roomModal = useRoomModal();
  const devicePairingModal = useDevicePairingModal();
  const [isDeleting, setIsDeleting] = useState(false);

  // Use atomic state selectors
  const { removeRoom } = useRoomsSelectors(useRoomsStore, (state) => ({
    removeRoom: state.removeRoom,
  }));

  const deviceCount = room._count?.devices || 0;
  const hasDevices = deviceCount > 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/rooms/${room.id}`);
      // Update local state immediately
      removeRoom(room.id);
      toast.success("Room deleted successfully");
      if (onRoomDeleted) {
        onRoomDeleted();
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete room");
    } finally {
      setIsDeleting(false);
    }
  };

  const getDeviceStatusDisplay = () => {
    if (!hasDevices) {
      return (
        <div className="flex flex-col items-center justify-center h-36 bg-background rounded-md border border-dashed border-muted-foreground/20 p-4">
          <div className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center mb-2">
            <Thermometer className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm text-center mb-2">
            No devices paired yet
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-1"
            onClick={(e) => {
              e.stopPropagation();
              devicePairingModal.onOpen(room);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      );
    }

    // Display brief info about the devices
    return (
      <div className="grid grid-cols-1 gap-2">
        {room.devices &&
          room.devices.slice(0, 3).map((device) => (
            <div
              key={device.device_id}
              className="flex items-center justify-between bg-muted/10 p-3 rounded-md border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-full mr-3">
                  <Thermometer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {device.name || "Unnamed Device"}
                  </p>
                  {device.lastSeenAt && (
                    <p className="text-xs text-muted-foreground">
                      Last active{" "}
                      {formatDistanceToNow(new Date(device.lastSeenAt), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                </div>
              </div>

              {device.lastReading && (
                <div className="flex gap-1.5">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-xs font-medium flex items-center">
                          <Thermometer className="h-3 w-3 mr-1 text-red-500" />
                          {device.lastReading.temperature}°C
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">Temperature</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-xs font-medium flex items-center">
                          <Droplet className="h-3 w-3 mr-1 text-blue-500" />
                          {device.lastReading.humidity}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">Humidity</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          ))}

        {deviceCount > 3 && (
          <div className="text-center text-sm text-muted-foreground mt-1 p-1 bg-muted/10 rounded-md border border-border/50">
            + {deviceCount - 3} more devices
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      className="w-full overflow-hidden hover:shadow-md transition-all hover:border-primary/20 cursor-pointer group"
      onClick={() => router.push(`/rooms/${room.id}`)}
    >
      <CardHeader className="pb-2 relative">
        <div className="absolute top-3 right-3 size-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Home className="h-4 w-4 text-primary" />
        </div>
        <div className="pr-12">
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
            {room.name}
          </CardTitle>
          <CardDescription className="mt-1">
            {room.description || "No description provided"}
          </CardDescription>
          <Badge variant="outline" className="mt-2">
            {deviceCount} {deviceCount === 1 ? "device" : "devices"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>{getDeviceStatusDisplay()}</CardContent>
      <CardFooter className="bg-muted/10 pt-3 pb-3 flex justify-between gap-2 border-t border-border/30">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            devicePairingModal.onOpen(room);
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Pair Device
        </Button>

        <div className="flex gap-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    roomModal.onOpenEdit(room);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Edit Room</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isTeamOwner && (
            <AlertDialog>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Delete Room</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Room</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this room? This action
                    cannot be undone and will remove all device associations
                    with this room.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
