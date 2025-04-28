import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Room } from "@prisma/client";

export interface ExtendedRoom extends Room {
  _count?: {
    devices: number;
  };
  devices?: any[];
}

interface RoomsState {
  rooms: ExtendedRoom[];
  selectedRoomId: string | null;
  isLoading: boolean;
  error: string | null;
  setRooms: (rooms: ExtendedRoom[]) => void;
  addRoom: (room: ExtendedRoom) => void;
  updateRoom: (roomId: string, data: Partial<ExtendedRoom>) => void;
  removeRoom: (roomId: string) => void;
  setSelectedRoomId: (roomId: string | null) => void;
  getRoomById: (roomId: string) => ExtendedRoom | undefined;
  getRoomsByTeamId: (teamId: string) => ExtendedRoom[];
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRoomsStore = create<RoomsState>()(
  persist(
    (set, get) => ({
      rooms: [],
      selectedRoomId: null,
      isLoading: false,
      error: null,

      setRooms: (rooms) => set({ rooms }),

      addRoom: (room) =>
        set((state) => ({
          rooms: [...state.rooms, room],
        })),

      updateRoom: (roomId, data) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId ? { ...room, ...data } : room
          ),
        })),

      removeRoom: (roomId) =>
        set((state) => ({
          rooms: state.rooms.filter((room) => room.id !== roomId),
          selectedRoomId:
            state.selectedRoomId === roomId ? null : state.selectedRoomId,
        })),

      setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),

      getRoomById: (roomId) => {
        return get().rooms.find((room) => room.id === roomId);
      },

      getRoomsByTeamId: (teamId) => {
        return get().rooms.filter((room) => room.teamId === teamId);
      },

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "rooms-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        rooms: state.rooms,
        selectedRoomId: state.selectedRoomId,
      }),
    }
  )
);
