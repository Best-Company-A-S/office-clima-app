import { create } from "zustand";
import { Room } from "@prisma/client";

interface DeviceWithRoom {
  device_id: string;
  name?: string | null;
  description?: string | null;
  model?: string | null;
  firmwareVersion?: string | null;
  isPaired: boolean;
  lastSeenAt?: Date | null;
  roomId?: string | null;
  pairedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

type PairingStep = "scan" | "manual" | "configure";

interface DevicePairingModalStore {
  isOpen: boolean;
  currentStep: PairingStep;
  deviceId: string | null;
  deviceDetails: DeviceWithRoom | null;
  preselectedRoom: Room | null;

  // Open the initial modal with choice of scan QR or manual entry
  onOpen: (preselectedRoom?: Room | null) => void;

  // Close the modal and reset state
  onClose: () => void;

  // Set the current step in the pairing process
  setStep: (step: PairingStep) => void;

  // Set the device ID (from QR code or manual entry)
  setDeviceId: (deviceId: string) => void;

  // Set the device details after fetching from API
  setDeviceDetails: (deviceDetails: DeviceWithRoom | null) => void;
}

export const useDevicePairingModal = create<DevicePairingModalStore>((set) => ({
  isOpen: false,
  currentStep: "scan",
  deviceId: null,
  deviceDetails: null,
  preselectedRoom: null,

  onOpen: (preselectedRoom = null) =>
    set({
      isOpen: true,
      currentStep: "scan",
      deviceId: null,
      deviceDetails: null,
      preselectedRoom,
    }),

  onClose: () =>
    set({
      isOpen: false,
      currentStep: "scan",
      deviceId: null,
      deviceDetails: null,
      preselectedRoom: null,
    }),

  setStep: (step) => set({ currentStep: step }),

  setDeviceId: (deviceId) => set({ deviceId }),

  setDeviceDetails: (deviceDetails) =>
    set({
      deviceDetails,
      currentStep: deviceDetails ? "configure" : "manual",
    }),
}));
