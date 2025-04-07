"use client";

import { Room } from "@prisma/client";
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

interface RoomCardProps {
  room: Room & {
    devices: any[];
    _count: {
      devices: number;
    };
  };
  isTeamOwner: boolean;
  onRoomDeleted?: () => void;
}

export const RoomCard = ({
  room,
  isTeamOwner,
  onRoomDeleted,
}: RoomCardProps) => {
  const router = useRouter();
  const roomModal = useRoomModal();
  const devicePairingModal = useDevicePairingModal();
  const [isDeleting, setIsDeleting] = useState(false);

  const deviceCount = room._count.devices;
  const hasDevices = deviceCount > 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/rooms/${room.id}`);
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
        <div className="flex flex-col items-center justify-center h-36 bg-muted/20 rounded-md p-4">
          <p className="text-muted-foreground text-sm text-center">
            No devices paired yet
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => devicePairingModal.onOpen(room)}
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
        {room.devices.slice(0, 3).map((device) => (
          <div
            key={device.device_id}
            className="flex items-center justify-between bg-muted/30 p-2 rounded-md"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-1 rounded-full mr-2">
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
          </div>
        ))}

        {deviceCount > 3 && (
          <div className="text-center text-sm text-muted-foreground mt-1">
            + {deviceCount - 3} more devices
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      className="w-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/rooms/${room.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{room.name}</CardTitle>
            <CardDescription className="mt-1">
              {room.description || "No description provided"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {deviceCount} {deviceCount === 1 ? "device" : "devices"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>{getDeviceStatusDisplay()}</CardContent>
      <CardFooter className="bg-muted/30 pt-3 pb-3 flex justify-between gap-2">
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
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            roomModal.onOpenEdit(room);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>

        {isTeamOwner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Room</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this room? This action cannot
                  be undone and will remove all device associations with this
                  room.
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
      </CardFooter>
    </Card>
  );
};
