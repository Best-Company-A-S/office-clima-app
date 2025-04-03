import { create } from "zustand";
import { Team } from "@prisma/client";

interface InviteModalStore {
  isOpen: boolean;
  team: Team | null;
  onOpen: (team: Team) => void;
  onClose: () => void;
}

export const useInviteModal = create<InviteModalStore>((set) => ({
  isOpen: false,
  team: null,
  onOpen: (team: Team) => set({ isOpen: true, team }),
  onClose: () => set({ isOpen: false, team: null }),
}));
