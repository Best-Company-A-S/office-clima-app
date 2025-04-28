"use client";

import React, { useEffect, useRef } from "react";
import { useDevicesStore } from "./useDevicesStore";
import { useRoomsStore } from "./useRoomsStore";
import { useTeamsStore } from "./useTeamsStore";
import { useReadingsStore } from "./useReadingsStore";

interface StoreProviderProps {
  children: React.ReactNode;
}

/**
 * StoreProvider initializes and manages atomic state stores at the app root
 * This component can be used to:
 * 1. Reset stores when needed
 * 2. Hydrate stores from server data
 * 3. Handle any store initialization logic
 */
export function StoreProvider({ children }: StoreProviderProps) {
  const isInitialized = useRef(false);

  // If needed, add reset logic or hydration from server data here
  useEffect(() => {
    if (!isInitialized.current) {
      // Clear any previously persisted state if needed
      // One-time initialization logic can go here

      isInitialized.current = true;
    }

    // Clean up stores when component unmounts (optional)
    return () => {
      // Reset stores if needed on application exit
      // This is usually not necessary with sessionStorage persistence
    };
  }, []);

  return <>{children}</>;
}
