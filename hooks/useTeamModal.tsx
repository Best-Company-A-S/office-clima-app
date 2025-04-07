import { create } from "zustand";
import { Team } from "@prisma/client";

interface TeamModalStore {
  isOpen: boolean;
  teamToEdit: Team | null;
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (team: Team) => void;
}

export const useTeamModal = create<TeamModalStore>((set) => ({
  isOpen: false,
  teamToEdit: null,
  onOpen: () => set({ isOpen: true, teamToEdit: null }),
  onClose: () => set({ isOpen: false, teamToEdit: null }),
  onOpenEdit: (team: Team) => set({ isOpen: true, teamToEdit: team }),
}));
