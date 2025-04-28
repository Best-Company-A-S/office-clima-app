"use client";

import { useState, useEffect, useRef } from "react";
import { useDataRevalidation } from "./useDataRevalidation";
import { useTeamsStore } from "@/lib/store/useTeamsStore";
import { useRoomsStore } from "@/lib/store/useRoomsStore";
import { useDevicesStore } from "@/lib/store/useDevicesStore";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

interface UseRealtimeUpdatesOptions {
  enabled?: boolean;
  pollingInterval?: number;
  showToast?: boolean;
}

const DEFAULT_POLLING_INTERVAL = 30000; // 30 seconds

export function useRealtimeUpdates({
  enabled = true,
  pollingInterval = DEFAULT_POLLING_INTERVAL,
  showToast = true,
}: UseRealtimeUpdatesOptions = {}) {
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Get store selectors for current state
  const selectedTeamId = useTeamsStore((state) => state.selectedTeamId);
  const selectedRoomId = useRoomsStore((state) => state.selectedRoomId);
  const devices = useDevicesStore((state) => state.devices);

  // Get data revalidation functions
  const { revalidateData, isRevalidating, lastRevalidation } =
    useDataRevalidation();

  // Start polling
  const startPolling = () => {
    if (isPolling || !enabled) return;

    setIsPolling(true);

    // Perform initial data fetch
    revalidateData(selectedTeamId || undefined, selectedRoomId || undefined);

    // Set up polling interval
    pollingRef.current = setInterval(() => {
      revalidateData(selectedTeamId || undefined, selectedRoomId || undefined);

      if (showToast) {
        toast.success("Dashboard data updated", {
          id: "dashboard-update",
          duration: 2000,
        });
      }
    }, pollingInterval);
  };

  // Stop polling
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setIsPolling(false);
  };

  // Manually trigger a data refresh
  const refreshData = () => {
    return revalidateData(
      selectedTeamId || undefined,
      selectedRoomId || undefined
    );
  };

  // Watch for active state changes
  useEffect(() => {
    if (enabled) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, pollingInterval, selectedTeamId, selectedRoomId]);

  return {
    isPolling,
    startPolling,
    stopPolling,
    refreshData,
    isRevalidating,
    lastRevalidation,
  };
}
