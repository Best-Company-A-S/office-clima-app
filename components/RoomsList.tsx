"use client";

import { useEffect } from "react";
import { RoomCard } from "./RoomCard";
import { Button } from "@/components/ui/button";
import { useRoomModal } from "@/hooks/useRoomModal";
import { PlusCircle, Home, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExtendedRoom, useRoomsStore } from "@/lib/store/useRoomsStore";
import { createSelectors } from "@/lib/store/useStoreSelectors";

interface RoomsListProps {
  initialRooms: ExtendedRoom[];
  isTeamOwner: boolean;
  teamId: string;
}

// Create typed selectors for RoomsStore
const useRoomsSelectors =
  createSelectors<ReturnType<typeof useRoomsStore.getState>>();

export const RoomsList = ({
  initialRooms,
  isTeamOwner,
  teamId,
}: RoomsListProps) => {
  const roomModal = useRoomModal();
  const router = useRouter();

  // Use atomic state selectors for better performance
  const { rooms, setRooms, getRoomsByTeamId, setIsLoading } = useRoomsSelectors(
    useRoomsStore,
    (state) => ({
      rooms: state.rooms,
      setRooms: state.setRooms,
      getRoomsByTeamId: state.getRoomsByTeamId,
      setIsLoading: state.setIsLoading,
    })
  );

  // Initialize rooms in the store if needed
  useEffect(() => {
    if (initialRooms.length > 0 && rooms.length === 0) {
      setRooms(initialRooms);
    }
  }, [initialRooms, rooms.length, setRooms]);

  const onRoomDeleted = () => {
    setIsLoading(true);
    router.refresh();
    // The actual state will be updated by the parent component when it fetches new data
  };

  // Get filtered rooms for this team
  const teamRooms = getRoomsByTeamId(teamId);

  if (!teamRooms.length) {
    return (
      <Card className="border border-dashed border-muted-foreground/20 bg-background shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 p-4 rounded-full bg-primary/10">
            <Home className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            No rooms yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Create your first room to start pairing devices and monitoring
            climate data.
          </p>
          <Button
            onClick={() => roomModal.onOpen(teamId)}
            className="flex items-center gap-2"
            size="lg"
          >
            <PlusCircle className="h-4 w-4" />
            Create Your First Room
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Rooms</h2>
        </div>
        <Button
          onClick={() => roomModal.onOpen(teamId)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <RoomCard
              room={room}
              isTeamOwner={isTeamOwner}
              onRoomDeleted={onRoomDeleted}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
