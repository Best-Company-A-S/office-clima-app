import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Reading {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  airQuality: number;
  batteryVoltage?: number;
  batteryPercentage?: number;
  batteryTimeRemaining?: number;
  timestamp: string;
}

interface ReadingsState {
  readings: Record<string, Reading[]>; // deviceId -> readings array
  isLoading: boolean;
  error: string | null;
  timeRange: "hour" | "day" | "week" | "month" | "year";
  setReadings: (deviceId: string, readings: Reading[]) => void;
  addReading: (reading: Reading) => void;
  getReadingsByDeviceId: (deviceId: string) => Reading[];
  getLatestReadingByDeviceId: (deviceId: string) => Reading | undefined;
  clearReadingsForDevice: (deviceId: string) => void;
  setTimeRange: (range: "hour" | "day" | "week" | "month" | "year") => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useReadingsStore = create<ReadingsState>()(
  persist(
    (set, get) => ({
      readings: {},
      isLoading: false,
      error: null,
      timeRange: "day",

      setReadings: (deviceId, readings) =>
        set((state) => ({
          readings: {
            ...state.readings,
            [deviceId]: readings,
          },
        })),

      addReading: (reading) =>
        set((state) => {
          const deviceReadings = state.readings[reading.deviceId] || [];
          return {
            readings: {
              ...state.readings,
              [reading.deviceId]: [...deviceReadings, reading],
            },
          };
        }),

      getReadingsByDeviceId: (deviceId) => {
        return get().readings[deviceId] || [];
      },

      getLatestReadingByDeviceId: (deviceId) => {
        const deviceReadings = get().readings[deviceId] || [];
        if (deviceReadings.length === 0) return undefined;

        // Sort by timestamp and return the latest
        return [...deviceReadings].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0];
      },

      clearReadingsForDevice: (deviceId) =>
        set((state) => {
          const { [deviceId]: _, ...rest } = state.readings;
          return { readings: rest };
        }),

      setTimeRange: (range) => set({ timeRange: range }),

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "readings-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        // Only persist the last 100 readings per device to avoid storage limits
        readings: Object.fromEntries(
          Object.entries(state.readings).map(([deviceId, readings]) => [
            deviceId,
            readings.slice(-100),
          ])
        ),
        timeRange: state.timeRange,
      }),
    }
  )
);
