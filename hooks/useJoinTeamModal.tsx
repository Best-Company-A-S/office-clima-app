import { create } from "zustand";

interface JoinTeamModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useJoinTeamModal = create<JoinTeamModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
