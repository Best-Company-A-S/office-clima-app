"use client";

import { Room } from "@prisma/client";
import { RoomCard } from "./RoomCard";
import { Button } from "@/components/ui/button";
import { useRoomModal } from "@/app/hooks/useRoomModal";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoomsListProps {
  rooms: Array<
    Room & {
      devices: any[];
      _count: {
        devices: number;
      };
    }
  >;
  isTeamOwner: boolean;
  teamId: string;
}

export const RoomsList = ({ rooms, isTeamOwner, teamId }: RoomsListProps) => {
  const roomModal = useRoomModal();
  const router = useRouter();

  const onRoomDeleted = () => {
    router.refresh();
  };

  if (!rooms.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 p-4 rounded-full bg-primary/10">
          <PlusCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">No rooms yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Create your first room to start pairing devices and monitoring climate
          data.
        </p>
        <Button
          onClick={() => roomModal.onOpen(teamId)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create a Room
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <Button
          onClick={() => roomModal.onOpen(teamId)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Room
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isTeamOwner={isTeamOwner}
            onRoomDeleted={onRoomDeleted}
          />
        ))}
      </div>
    </div>
  );
};
