import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Device {
  device_id: string;
  name: string | null;
  description: string | null;
  model: string | null;
  firmwareVersion: string | null;
  isPaired: boolean;
  lastSeenAt: string | null;
  roomId: string | null;
  lastReading?: {
    temperature: number;
    humidity: number;
    airQuality: number;
    batteryVoltage?: number;
    batteryPercentage?: number;
    batteryTimeRemaining?: number;
    timestamp: string;
  };
}

interface DevicesState {
  devices: Device[];
  selectedDeviceId: string | null;
  isLoading: boolean;
  error: string | null;
  setDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  updateDevice: (deviceId: string, data: Partial<Device>) => void;
  removeDevice: (deviceId: string) => void;
  setSelectedDeviceId: (deviceId: string | null) => void;
  getDeviceById: (deviceId: string) => Device | undefined;
  getDevicesByRoomId: (roomId: string) => Device[];
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDevicesStore = create<DevicesState>()(
  persist(
    (set, get) => ({
      devices: [],
      selectedDeviceId: null,
      isLoading: false,
      error: null,

      setDevices: (devices) => set({ devices }),

      addDevice: (device) =>
        set((state) => ({
          devices: [...state.devices, device],
        })),

      updateDevice: (deviceId, data) =>
        set((state) => ({
          devices: state.devices.map((device) =>
            device.device_id === deviceId ? { ...device, ...data } : device
          ),
        })),

      removeDevice: (deviceId) =>
        set((state) => ({
          devices: state.devices.filter(
            (device) => device.device_id !== deviceId
          ),
        })),

      setSelectedDeviceId: (deviceId) => set({ selectedDeviceId: deviceId }),

      getDeviceById: (deviceId) => {
        return get().devices.find((device) => device.device_id === deviceId);
      },

      getDevicesByRoomId: (roomId) => {
        return get().devices.filter((device) => device.roomId === roomId);
      },

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "devices-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        devices: state.devices,
        selectedDeviceId: state.selectedDeviceId,
      }),
    }
  )
);
