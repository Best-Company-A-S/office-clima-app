import { create } from "zustand";
import { Room } from "@prisma/client";

interface RoomModalStore {
  isOpen: boolean;
  roomToEdit: Room | null;
  teamId: string | null;
  onOpen: (teamId: string) => void;
  onClose: () => void;
  onOpenEdit: (room: Room) => void;
}

export const useRoomModal = create<RoomModalStore>((set) => ({
  isOpen: false,
  roomToEdit: null,
  teamId: null,
  onOpen: (teamId: string) => set({ isOpen: true, roomToEdit: null, teamId }),
  onClose: () => set({ isOpen: false, roomToEdit: null, teamId: null }),
  onOpenEdit: (room: Room) =>
    set({ isOpen: true, roomToEdit: room, teamId: room.teamId }),
}));
