import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Team {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  inviteCode: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    rooms: number;
    members: number;
  };
  members?: any[];
  rooms?: any[];
}

interface TeamsState {
  teams: Team[];
  selectedTeamId: string | null;
  isLoading: boolean;
  error: string | null;
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  updateTeam: (teamId: string, data: Partial<Team>) => void;
  removeTeam: (teamId: string) => void;
  setSelectedTeamId: (teamId: string | null) => void;
  getTeamById: (teamId: string) => Team | undefined;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTeamsStore = create<TeamsState>()(
  persist(
    (set, get) => ({
      teams: [],
      selectedTeamId: null,
      isLoading: false,
      error: null,

      setTeams: (teams) => set({ teams }),

      addTeam: (team) =>
        set((state) => ({
          teams: [...state.teams, team],
        })),

      updateTeam: (teamId, data) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, ...data } : team
          ),
        })),

      removeTeam: (teamId) =>
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== teamId),
          selectedTeamId:
            state.selectedTeamId === teamId ? null : state.selectedTeamId,
        })),

      setSelectedTeamId: (teamId) => set({ selectedTeamId: teamId }),

      getTeamById: (teamId) => {
        return get().teams.find((team) => team.id === teamId);
      },

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "teams-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        teams: state.teams,
        selectedTeamId: state.selectedTeamId,
      }),
    }
  )
);
