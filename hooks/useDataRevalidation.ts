"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useTeamsStore,
  useRoomsStore,
  useDevicesStore,
  useReadingsStore,
} from "@/lib/store";
import axios from "axios";

export function useDataRevalidation() {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [lastRevalidation, setLastRevalidation] = useState<Date | null>(null);

  // Get store actions
  const { setTeams, setIsLoading: setTeamsLoading } = useTeamsStore();
  const { setRooms, setIsLoading: setRoomsLoading } = useRoomsStore();
  const { setDevices, setIsLoading: setDevicesLoading } = useDevicesStore();
  const {
    setReadings,
    setIsLoading: setReadingsLoading,
    timeRange,
  } = useReadingsStore();

  // Fetch teams data function
  const fetchTeams = useCallback(async () => {
    try {
      setTeamsLoading(true);
      const response = await axios.get("/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setTeamsLoading(false);
    }
  }, [setTeams, setTeamsLoading]);

  // Fetch rooms data function for a specific team
  const fetchRooms = useCallback(
    async (teamId: string) => {
      if (!teamId) return;

      try {
        setRoomsLoading(true);
        const response = await axios.get(`/api/rooms?teamId=${teamId}`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setRoomsLoading(false);
      }
    },
    [setRooms, setRoomsLoading]
  );

  // Fetch devices data function for a specific room
  const fetchDevices = useCallback(
    async (roomId: string) => {
      if (!roomId) return;

      try {
        setDevicesLoading(true);
        const response = await axios.get(`/api/devices?roomId=${roomId}`);
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setDevicesLoading(false);
      }
    },
    [setDevices, setDevicesLoading]
  );

  // Fetch readings data function for a specific device
  const fetchReadings = useCallback(
    async (deviceId: string) => {
      if (!deviceId) return;

      try {
        setReadingsLoading(true);
        const response = await axios.get(
          `/api/devices/readings?deviceId=${deviceId}&period=${timeRange}`
        );
        setReadings(deviceId, response.data);
      } catch (error) {
        console.error("Error fetching readings:", error);
      } finally {
        setReadingsLoading(false);
      }
    },
    [setReadings, setReadingsLoading, timeRange]
  );

  // Revalidation function for all data (can be customized based on the dashboard's current view)
  const revalidateData = useCallback(
    async (teamId?: string, roomId?: string, deviceId?: string) => {
      if (isRevalidating) return;

      setIsRevalidating(true);

      try {
        await fetchTeams();

        if (teamId) {
          await fetchRooms(teamId);
        }

        if (roomId) {
          await fetchDevices(roomId);
        }

        if (deviceId) {
          await fetchReadings(deviceId);
        }

        setLastRevalidation(new Date());
      } catch (error) {
        console.error("Error revalidating data:", error);
      } finally {
        setIsRevalidating(false);
      }
    },
    [fetchTeams, fetchRooms, fetchDevices, fetchReadings, isRevalidating]
  );

  return {
    revalidateData,
    isRevalidating,
    lastRevalidation,
    fetchTeams,
    fetchRooms,
    fetchDevices,
    fetchReadings,
  };
}
