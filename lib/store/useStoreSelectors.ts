"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { shallow } from "zustand/shallow";

// Type-safe selector hook factory
export function createSelectors<TState>() {
  return function useSelectors<TSelectors>(
    store: UseBoundStore<StoreApi<TState>>,
    selectors: (state: TState) => TSelectors
  ): TSelectors {
    // Create refs to store previous values
    const storeRef = useRef(store);
    const selectorsRef = useRef(selectors);
    const stateRef = useRef<TSelectors | null>(null);

    // For React 18 concurrent mode safety, use state
    const [selectedState, setSelectedState] = useState<TSelectors>(() =>
      selectors(store.getState())
    );

    // Keep refs up to date
    useEffect(() => {
      selectorsRef.current = selectors;
      storeRef.current = store;
    }, [store, selectors]);

    // Setup subscription to the store
    useEffect(() => {
      const unsubscribe = store.subscribe((state) => {
        // Get new selected state
        const newSelectedState = selectorsRef.current(state);

        // Only update if something changed (shallow equality check)
        if (!stateRef.current || !shallow(stateRef.current, newSelectedState)) {
          stateRef.current = newSelectedState;
          setSelectedState(newSelectedState);
        }
      });

      // Initial state
      const initialState = selectorsRef.current(store.getState());
      stateRef.current = initialState;
      setSelectedState(initialState);

      return unsubscribe;
    }, [store]);

    return selectedState;
  };
}

// Example usage:
// const useRoomsSelectors = createSelectors<RoomsState>();
// const { rooms, isLoading } = useRoomsSelectors(useRoomsStore, (state) => ({
//   rooms: state.rooms,
//   isLoading: state.isLoading
// }));
