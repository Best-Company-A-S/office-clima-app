"use client";

import { useState, useEffect, useRef } from "react";
import {
  Home,
  Settings,
  Users,
  DoorClosed,
  Radio,
  Laptop,
  LogOut,
  Wifi,
  Loader2,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Thermometer,
  Maximize,
  RefreshCw,
  Download,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { DevicePairingModal } from "@/components/modals/DevicePairingModal";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Import atomic stores
import { Team, useTeamsStore } from "@/lib/store/useTeamsStore";
import { ExtendedRoom, useRoomsStore } from "@/lib/store/useRoomsStore";
import { useDevicesStore } from "@/lib/store/useDevicesStore";
import { createSelectors } from "@/lib/store/useStoreSelectors";

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
  label: string;
}

const NavItem = ({ icon, active, onClick, loading, label }: NavItemProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center relative group",
      "transition-all duration-200 ease-out",
      active
        ? "bg-primary/20 text-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    <AnimatePresence>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <div className="w-4 h-4">{icon}</div>
      )}
    </AnimatePresence>

    {/* Tooltip */}
    <div
      className="absolute left-12 px-2 py-1 bg-card/80 backdrop-blur-sm text-foreground
                 text-xs rounded-md opacity-0 invisible group-hover:opacity-100 
                 group-hover:visible transition-all duration-200 whitespace-nowrap
                 border border-border z-50"
    >
      {label}
    </div>
  </motion.button>
);

// Use our atomic store interface instead of duplicating
// interface Team already defined in useTeamsStore.ts

// Update Room to match ExtendedRoom or use the imported type
interface DeviceBasic {
  id: string;
  name: string;
}

// Convert Room interface to use ExtendedRoom and add any missing fields
interface RoomWithDevices extends ExtendedRoom {
  devices: DeviceBasic[];
}

interface ApiResponse<T> {
  error?: string;
  data?: T;
}

// API client setup
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Room form schema
const roomFormSchema = z.object({
  name: z.string().min(1, "Room name is required").max(100),
  description: z.string().max(500).optional(),
  type: z.string().min(1, "Room type is required").max(100),
  size: z.coerce
    .number()
    .positive("Size must be a positive number")
    .min(1, "Room size is required"),
  capacity: z.coerce
    .number()
    .positive("Capacity must be a positive number")
    .min(1, "Room capacity is required"),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

// Create typed selectors for rooms store
const useRoomsSelectors =
  createSelectors<ReturnType<typeof useRoomsStore.getState>>();

// Room Modal Component
const RoomModal = ({
  isOpen,
  onClose,
  room,
  teamId,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  room?: ExtendedRoom;
  teamId: string;
  onSave: (room: ExtendedRoom) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!room;

  // Use atomic state selectors
  const { addRoom, updateRoom } = useRoomsSelectors(useRoomsStore, (state) => ({
    addRoom: state.addRoom,
    updateRoom: state.updateRoom,
  }));

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: room?.name || "",
      description: room?.description || "",
      type: room?.type || "",
      size: room?.size || undefined,
      capacity: room?.capacity || undefined,
    },
  });

  useEffect(() => {
    if (isOpen && room) {
      form.reset({
        name: room.name,
        description: room.description || "",
        type: room.type || "",
        size: room.size || undefined,
        capacity: room.capacity || undefined,
      });
    }
  }, [form, isOpen, room]);

  const onSubmit = async (values: RoomFormValues) => {
    setIsLoading(true);
    try {
      if (isEditing && room) {
        // Update existing room
        const response = await api.patch<ExtendedRoom>(
          `/rooms/${room.id}`,
          values
        );
        // Update store directly
        updateRoom(room.id, values);
        onSave(response.data);
      } else {
        // Create new room
        const response = await api.post<ExtendedRoom>(
          `/rooms?teamId=${teamId}`,
          values
        );
        // Add to store directly
        addRoom(response.data);
        onSave(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const roomTypes = [
    { value: "office", label: "Office" },
    { value: "classroom", label: "Classroom" },
    { value: "meeting_room", label: "Meeting Room" },
    { value: "lab", label: "Laboratory" },
    { value: "common_area", label: "Common Area" },
    { value: "other", label: "Other" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Room" : "Create New Room"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of your room."
              : "Add a new room to your team."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground mb-2">
              <p>
                Room type, size, and capacity are required fields for accurate
                climate quality analysis.
              </p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Room name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the room"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Room Type <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Required for climate analysis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Size in m² <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Room size"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Required for air quality calculations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Capacity <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Max. persons"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Required for occupancy analysis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Update Room" : "Create Room"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // Create typed selectors for stores
  const useTeamsSelectors =
    createSelectors<ReturnType<typeof useTeamsStore.getState>>();
  const useRoomsSelectors =
    createSelectors<ReturnType<typeof useRoomsStore.getState>>();

  // Use atomic state selectors for teams
  const {
    teams,
    selectedTeamId,
    setTeams,
    setSelectedTeamId,
    addTeam,
    updateTeam,
    removeTeam,
    isLoading: teamsLoading,
    setIsLoading: setTeamsLoading,
    setError: setTeamsError,
  } = useTeamsSelectors(useTeamsStore, (state) => ({
    teams: state.teams,
    selectedTeamId: state.selectedTeamId,
    setTeams: state.setTeams,
    setSelectedTeamId: state.setSelectedTeamId,
    addTeam: state.addTeam,
    updateTeam: state.updateTeam,
    removeTeam: state.removeTeam,
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
  }));

  // Use atomic state selectors for rooms
  const {
    rooms,
    selectedRoomId,
    setRooms,
    setSelectedRoomId,
    getRoomsByTeamId,
    getRoomById,
    addRoom,
    updateRoom,
    removeRoom,
    isLoading: roomsLoading,
    setIsLoading: setRoomsLoading,
    setError: setRoomsError,
  } = useRoomsSelectors(useRoomsStore, (state) => ({
    rooms: state.rooms,
    selectedRoomId: state.selectedRoomId,
    setRooms: state.setRooms,
    setSelectedRoomId: state.setSelectedRoomId,
    getRoomsByTeamId: state.getRoomsByTeamId,
    getRoomById: state.getRoomById,
    addRoom: state.addRoom,
    updateRoom: state.updateRoom,
    removeRoom: state.removeRoom,
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
  }));

  // Get selected team and room from atomic state
  const selectedTeam = selectedTeamId
    ? teams.find((t) => t.id === selectedTeamId)
    : null;
  const selectedRoom = selectedRoomId ? getRoomById(selectedRoomId) : null;

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname.includes("/dashboard")) return "dashboard";
    if (pathname.includes("/devices")) return "devices";
    if (pathname.includes("/updates")) return "updates";
    if (pathname.includes("/settings")) return "settings";
    return "dashboard"; // Default
  });
  const [kioskMode, setKioskMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    teams: false,
    rooms: false,
    kiosk: false,
    createTeam: false,
    createRoom: false,
  });
  const devicePairingModal = useDevicePairingModal();
  const [editingTeam, setEditingTeam] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<ExtendedRoom | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "team" | "room";
    id: string;
    name: string;
  } | null>(null);
  const refreshInProgressRef = useRef(false);

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Function to refresh the page without causing component re-renders
  const refreshPage = () => {
    // Skip if a refresh is already in progress
    if (refreshInProgressRef.current) return;

    refreshInProgressRef.current = true;

    // For dashboard, we'll reload the data without causing state updates
    try {
      if (selectedTeam?.id) {
        // We'll make the API calls but won't update any state
        // This helps refresh the data in the browser cache without triggering re-renders

        // Make API calls in parallel to refresh data
        Promise.all([
          // Refreshing team data
          axios
            .get(`/api/teams/${selectedTeam.id}`)
            .catch((err) => console.error("Refresh teams error:", err)),

          // Room data if needed
          selectedRoom?.id
            ? axios
                .get(`/api/rooms/${selectedRoom.id}`)
                .catch((err) => console.error("Refresh room error:", err))
            : Promise.resolve(),

          // Device readings using the appropriate endpoint
          axios
            .get(
              `/api/devices/readings/stats?${
                selectedRoom?.id
                  ? `roomId=${selectedRoom.id}`
                  : `teamId=${selectedTeam.id}`
              }&period=day`
            )
            .catch((err) => console.error("Refresh readings error:", err)),
        ]).then(() => {
          // After data is refreshed, trigger a gentle DOM update that doesn't cause re-renders
          // We'll add a small visual indicator to show the data was refreshed
          const indicator = document.createElement("div");
          indicator.style.position = "fixed";
          indicator.style.bottom = "20px";
          indicator.style.right = "20px";
          indicator.style.background = "rgba(0,0,0,0.7)";
          indicator.style.color = "white";
          indicator.style.padding = "5px 10px";
          indicator.style.borderRadius = "5px";
          indicator.style.fontSize = "12px";
          indicator.style.zIndex = "9999";
          indicator.style.opacity = "0";
          indicator.style.transition = "opacity 0.3s ease-in-out";
          indicator.textContent = "Data refreshed";

          document.body.appendChild(indicator);

          // Show then fade out
          setTimeout(() => {
            indicator.style.opacity = "1";
            setTimeout(() => {
              indicator.style.opacity = "0";
              setTimeout(() => {
                document.body.removeChild(indicator);
              }, 300);
            }, 1500);
          }, 100);

          // Allow future refreshes
          refreshInProgressRef.current = false;
        });
      }
    } catch (error) {
      console.error("Error during kiosk mode refresh:", error);
      refreshInProgressRef.current = false;
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Setup auto-refresh when kiosk mode is enabled
  useEffect(() => {
    if (kioskMode) {
      // Set up auto-refresh every minute
      const interval = setInterval(() => {
        // Instead of calling router.refresh() which causes a full re-render,
        // use the custom refresh function
        refreshPage();
      }, 60000); // 60 seconds
      setAutoRefresh(interval);

      // Go fullscreen when entering kiosk mode
      if (!isFullscreen && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // Clear auto-refresh when kiosk mode is disabled
      if (autoRefresh) {
        clearInterval(autoRefresh);
        setAutoRefresh(null);
      }

      // Exit fullscreen when leaving kiosk mode
      if (isFullscreen && document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }

    return () => {
      if (autoRefresh) {
        clearInterval(autoRefresh);
      }
    };
  }, [kioskMode, isFullscreen]); // Removed autoRefresh from dependencies to prevent extra renders

  // Fetch kiosk mode settings when team changes
  useEffect(() => {
    const fetchKioskMode = async () => {
      if (!selectedTeam) return;

      try {
        const response = await axios.get(`/api/teams/${selectedTeam.id}/kiosk`);
        if (response.data.kioskMode !== undefined) {
          setKioskMode(response.data.kioskMode);
        }
      } catch (error) {
        console.error("Failed to fetch kiosk mode setting:", error);
      }
    };

    fetchKioskMode();
  }, [selectedTeam]);

  // Update URL when team/room changes
  const updateURL = (teamId?: string, roomId?: string) => {
    const params = new URLSearchParams(searchParams);

    if (teamId) {
      params.set("teamId", teamId);
    } else {
      params.delete("teamId");
    }

    if (roomId) {
      params.set("roomId", roomId);
    } else {
      params.delete("roomId");
    }

    const newPathname = `${pathname}?${params.toString()}`;
    router.push(newPathname);
  };

  // Effect to update activeItem when pathname changes
  useEffect(() => {
    if (pathname.includes("/dashboard")) setActiveItem("dashboard");
    else if (pathname.includes("/devices")) setActiveItem("devices");
    else if (pathname.includes("/updates")) setActiveItem("updates");
    else if (pathname.includes("/settings")) setActiveItem("settings");
  }, [pathname]);

  // Fetch teams on mount
  useEffect(() => {
    const fetchTeams = async () => {
      if (status !== "authenticated") return;

      try {
        setLoadingStates((prev) => ({ ...prev, teams: true }));
        setTeamsLoading(true);

        const response = await api.get<Team[]>("/teams");
        const fetchedTeams = response.data;

        // Update store
        setTeams(fetchedTeams);

        // Select team from URL or first team
        const urlTeamId = searchParams.get("teamId");
        const teamToSelect = urlTeamId
          ? fetchedTeams.find((t) => t.id === urlTeamId)
          : fetchedTeams[0];

        if (teamToSelect) {
          setSelectedTeamId(teamToSelect.id);
          if (!urlTeamId) updateURL(teamToSelect.id);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        setTeamsError("Failed to fetch teams");
      } finally {
        setLoadingStates((prev) => ({ ...prev, teams: false }));
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, [status, searchParams]);

  // Fetch rooms when selected team changes
  useEffect(() => {
    const fetchRooms = async () => {
      if (!selectedTeam?.id || status !== "authenticated") return;

      try {
        setLoadingStates((prev) => ({ ...prev, rooms: true }));
        setRoomsLoading(true);

        const response = await api.get<ExtendedRoom[]>(
          `/rooms?teamId=${selectedTeam.id}`
        );

        // Update store
        setRooms(response.data);

        // Select room from URL or first room
        const urlRoomId = searchParams.get("roomId");
        const roomToSelect = urlRoomId
          ? response.data.find((r) => r.id === urlRoomId)
          : response.data[0];

        if (roomToSelect) {
          setSelectedRoomId(roomToSelect.id);
          if (!urlRoomId) updateURL(selectedTeam.id, roomToSelect.id);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRoomsError("Failed to fetch rooms");
      } finally {
        setLoadingStates((prev) => ({ ...prev, rooms: false }));
        setRoomsLoading(false);
      }
    };

    fetchRooms();
  }, [selectedTeam?.id, status, searchParams]);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeamId(team.id);
    updateURL(team.id);
  };

  const handleRoomSelect = (room: ExtendedRoom) => {
    setSelectedRoomId(room.id);
    updateURL(selectedTeam?.id, room.id);
  };

  const handleCreateTeam = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, createTeam: true }));
      const response = await api.post<Team>("/teams/create", {
        name: "New Team",
      });

      // Add to store directly
      addTeam(response.data);
      handleTeamSelect(response.data);
    } catch (error) {
      console.error("Failed to create team:", error);
      setTeamsError("Failed to create team");
    } finally {
      setLoadingStates((prev) => ({ ...prev, createTeam: false }));
    }
  };

  const handleCreateRoom = async () => {
    if (!selectedTeam) return;
    setRoomToEdit(null);
    setRoomModalOpen(true);
  };

  const handleEditRoom = (room: ExtendedRoom) => {
    setRoomToEdit(room);
    setRoomModalOpen(true);
  };

  const handleRoomSave = (room: ExtendedRoom) => {
    if (roomToEdit) {
      // If we're editing the selected room, update the selected ID
      if (selectedRoomId === room.id) {
        setSelectedRoomId(room.id);
      }
    } else {
      // Select the newly created room
      setSelectedRoomId(room.id);
    }
  };

  const handleNavigation = (route: string) => {
    setActiveItem(route);
    // Preserve team and room IDs when navigating
    const params = new URLSearchParams();
    if (selectedTeam?.id) params.set("teamId", selectedTeam.id);
    if (selectedRoom?.id) params.set("roomId", selectedRoom.id);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    router.push(`/${route}${queryString}`);
  };

  const handleKioskModeToggle = async () => {
    if (!selectedTeam) {
      toast.error("Please select a team first");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, kiosk: true }));

    try {
      const response = await axios.post(`/api/teams/${selectedTeam.id}/kiosk`, {
        enabled: !kioskMode,
      });

      if (response.data.kioskMode !== undefined) {
        setKioskMode(response.data.kioskMode);

        if (response.data.kioskMode) {
          toast.success("Kiosk mode enabled with auto-refresh");
        } else {
          toast.success("Kiosk mode disabled");
        }
      }
    } catch (error) {
      console.error("Failed to toggle kiosk mode:", error);
      toast.error("Failed to toggle kiosk mode");
    } finally {
      setLoadingStates((prev) => ({ ...prev, kiosk: false }));
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTeam = async (teamId: string, newName: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, teams: true }));
      await api.patch(`/teams/${teamId}`, { name: newName });

      // Update store directly
      updateTeam(teamId, { name: newName });
      setEditingTeam(null);
      toast.success("Team updated successfully");
    } catch (error) {
      console.error("Failed to update team:", error);
      toast.error("Failed to update team");
      setTeamsError("Failed to update team");
    } finally {
      setLoadingStates((prev) => ({ ...prev, teams: false }));
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, teams: true }));
      await api.delete(`/teams/${teamId}`);

      // Remove from store directly
      removeTeam(teamId);

      // If we deleted the selected team, select another one
      if (selectedTeamId === teamId) {
        const nextTeam = teams.find((team) => team.id !== teamId);
        if (nextTeam) {
          handleTeamSelect(nextTeam);
        } else {
          updateURL();
        }
      }
      toast.success("Team deleted successfully");
    } catch (error) {
      console.error("Failed to delete team:", error);
      toast.error("Failed to delete team");
      setTeamsError("Failed to delete team");
    } finally {
      setLoadingStates((prev) => ({ ...prev, teams: false }));
      setDeleteConfirmation(null);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, rooms: true }));
      await api.delete(`/rooms/${roomId}`);

      // Remove from store directly
      removeRoom(roomId);

      // If we deleted the selected room, select another one
      if (selectedRoomId === roomId) {
        const nextRoom = rooms.find((room) => room.id !== roomId);
        if (nextRoom) {
          setSelectedRoomId(nextRoom.id);
        } else {
          updateURL(selectedTeam?.id);
        }
      }
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room:", error);
      toast.error("Failed to delete room");
      setRoomsError("Failed to delete room");
    } finally {
      setLoadingStates((prev) => ({ ...prev, rooms: false }));
      setDeleteConfirmation(null);
    }
  };

  if (status === "loading") {
    return (
      <div
        className="h-screen w-16 bg-neutral-950/50 backdrop-blur-xl border-r 
                      border-white/5 flex items-center justify-center fixed left-0 top-0"
      >
        <Loader2 className="w-5 h-5 text-white/60 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="h-screen w-16 bg-card/80 backdrop-blur-sm border-r 
                border-border flex flex-col items-center py-6 fixed left-0 top-0 z-10"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-10 h-10 rounded-lg bg-primary/20 flex items-center 
                   justify-center mb-8"
        >
          <span className="text-foreground font-medium">C</span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col items-center space-y-4">
          <NavItem
            icon={<Home className="w-4 h-4" />}
            active={activeItem === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
            label="Dashboard"
          />
          <NavItem
            icon={<Thermometer className="w-4 h-4" />}
            active={activeItem === "devices"}
            onClick={() => handleNavigation("devices")}
            label="Devices"
          />
          <NavItem
            icon={<Download className="w-4 h-4" />}
            active={activeItem === "updates"}
            onClick={() => handleNavigation("updates")}
            label="Updates"
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            active={activeItem === "settings"}
            onClick={() => handleNavigation("settings")}
            label="Settings"
          />

          {/* Team Switcher */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <div>
                <NavItem
                  icon={<Users className="w-4 h-4" />}
                  loading={loadingStates.teams}
                  label="Switch Team"
                />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-[100] w-56 rounded-lg bg-neutral-950/95 backdrop-blur-xl 
                           border border-white/5 p-1.5 shadow-xl animate-in 
                           data-[side=left]:slide-in-from-right-2 
                           data-[side=right]:slide-in-from-left-2"
                sideOffset={12}
                align="start"
                side="right"
              >
                <div className="flex flex-col">
                  {teams.map((team) => (
                    <div key={team.id} className="group flex items-center">
                      {editingTeam?.id === team.id ? (
                        <input
                          autoFocus
                          className="flex-1 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 
                                     text-white/70 text-sm outline-none"
                          defaultValue={team.name}
                          onBlur={(e) =>
                            handleEditTeam(team.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleEditTeam(team.id, e.currentTarget.value);
                            if (e.key === "Escape") setEditingTeam(null);
                          }}
                        />
                      ) : (
                        <>
                          <motion.button
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.03)",
                            }}
                            onClick={() => handleTeamSelect(team)}
                            className={cn(
                              "flex-1 px-2.5 py-1.5 rounded-md text-white/70 text-sm text-left",
                              selectedTeam?.id === team.id &&
                                "bg-white/5 text-white"
                            )}
                          >
                            {team.name}
                          </motion.button>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded-md">
                                <MoreVertical className="h-4 w-4 text-white/40" />
                              </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                className="z-[100] min-w-[180px] rounded-md bg-neutral-950/95 backdrop-blur-xl 
                                          border border-white/5 p-1 shadow-xl"
                              >
                                <DropdownMenu.Item
                                  onClick={() => setEditingTeam(team)}
                                  className="flex items-center gap-2 px-2 py-1.5 text-sm text-white/70 
                                           hover:bg-white/5 rounded-sm cursor-pointer"
                                >
                                  <Pencil className="h-4 w-4" />
                                  Edit Team
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  onClick={() =>
                                    setDeleteConfirmation({
                                      type: "team",
                                      id: team.id,
                                      name: team.name,
                                    })
                                  }
                                  className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-400/80 
                                           hover:bg-white/5 rounded-sm cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete Team
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </>
                      )}
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={handleCreateTeam}
                    disabled={loadingStates.createTeam}
                    className="px-2.5 py-1.5 mt-1 border-t border-white/5 rounded-md 
                             text-white/40 hover:text-white/70 text-sm text-left w-full
                             flex items-center space-x-2"
                  >
                    {loadingStates.createTeam ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    <span>Create Team</span>
                  </motion.button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* Room Switcher */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <div>
                <NavItem
                  icon={<DoorClosed className="w-4 h-4" />}
                  loading={roomsLoading}
                  label="Switch Room"
                />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-[100] w-56 rounded-lg bg-neutral-950/95 backdrop-blur-xl 
                           border border-white/5 p-1.5 shadow-xl animate-in 
                           data-[side=left]:slide-in-from-right-2 
                           data-[side=right]:slide-in-from-left-2"
                sideOffset={12}
                align="start"
                side="right"
              >
                <div className="flex flex-col">
                  {selectedTeam ? (
                    <>
                      {getRoomsByTeamId(selectedTeam.id).length === 0 ? (
                        <div className="p-2 text-xs text-white/30 text-center">
                          No rooms yet
                        </div>
                      ) : (
                        getRoomsByTeamId(selectedTeam.id).map((room) => (
                          <div
                            key={room.id}
                            className="group flex items-center"
                          >
                            <motion.button
                              whileHover={{
                                backgroundColor: "rgba(255,255,255,0.03)",
                              }}
                              onClick={() => setSelectedRoomId(room.id)}
                              className={cn(
                                "flex-1 px-2.5 py-1.5 rounded-md text-white/70 text-sm text-left",
                                selectedRoomId === room.id &&
                                  "bg-white/5 text-white"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span>{room.name}</span>
                                <span className="text-xs text-white/40">
                                  {room._count?.devices || 0}
                                </span>
                              </div>
                            </motion.button>
                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded-md">
                                  <MoreVertical className="h-4 w-4 text-white/40" />
                                </button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                  className="z-[100] min-w-[180px] rounded-md bg-neutral-950/95 backdrop-blur-xl 
                                            border border-white/5 p-1 shadow-xl"
                                >
                                  <DropdownMenu.Item
                                    onClick={() => handleEditRoom(room)}
                                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-white/70 
                                             hover:bg-white/5 rounded-sm cursor-pointer"
                                  >
                                    <Pencil className="h-4 w-4" />
                                    Edit Room
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() =>
                                      setDeleteConfirmation({
                                        type: "room",
                                        id: room.id,
                                        name: room.name,
                                      })
                                    }
                                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-400/80 
                                             hover:bg-white/5 rounded-sm cursor-pointer"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Room
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </div>
                        ))
                      )}
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                        onClick={handleCreateRoom}
                        disabled={loadingStates.createRoom}
                        className="px-2.5 py-1.5 mt-1 border-t border-white/5 rounded-md 
                                text-white/40 hover:text-white/70 text-sm text-left w-full
                                flex items-center space-x-2"
                      >
                        {loadingStates.createRoom ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                        <span>Create Room</span>
                      </motion.button>
                    </>
                  ) : (
                    <div className="p-2 text-xs text-white/30 text-center">
                      Select a team first
                    </div>
                  )}
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </nav>

        {/* Mode Toggles */}
        <div className="flex flex-col space-y-4 mt-6">
          <NavItem
            icon={
              <Radio className={cn("w-4 h-4", kioskMode && "text-white")} />
            }
            active={kioskMode}
            onClick={handleKioskModeToggle}
            loading={loadingStates.kiosk}
            label="Kiosk Mode"
          />
          <NavItem
            icon={<Maximize className="w-4 h-4" />}
            active={isFullscreen}
            onClick={toggleFullscreen}
            label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          />
          <NavItem
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={refreshPage}
            label="Refresh Data"
          />
        </div>

        {/* User Menu */}
        <div className="mt-auto">
          <Popover.Root>
            <Popover.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center 
                           justify-center cursor-pointer"
              >
                <Image
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </motion.button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="z-[100] w-56 rounded-lg bg-neutral-950/95 backdrop-blur-xl 
                           border border-white/5 p-1.5 shadow-xl animate-in 
                           data-[side=left]:slide-in-from-right-2 
                           data-[side=right]:slide-in-from-left-2"
                sideOffset={12}
                align="start"
                side="right"
              >
                <div className="flex flex-col">
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={() => {
                      // Open the modal with the current room
                      devicePairingModal.onOpen();
                    }}
                    className="px-2.5 py-1.5 rounded-md text-white/70 text-sm text-left 
                               flex items-center space-x-2 w-full"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Pair Device</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="px-2.5 py-1.5 rounded-md text-red-400/80 text-sm text-left 
                               flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <LogOut className="w-3.5 h-3.5" />
                    )}
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </motion.div>
      <DevicePairingModal />

      {/* Room Modal */}
      {roomModalOpen && selectedTeam && (
        <RoomModal
          isOpen={roomModalOpen}
          onClose={() => setRoomModalOpen(false)}
          room={roomToEdit || undefined}
          teamId={selectedTeam.id}
          onSave={handleRoomSave}
        />
      )}

      {/* Confirmation Dialog for Deletion */}
      <AlertDialog
        open={!!deleteConfirmation}
        onOpenChange={(open) => !open && setDeleteConfirmation(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteConfirmation?.type === "team" ? "Team" : "Room"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;
              {deleteConfirmation?.name || ""}
              &quot;? This action cannot be undone.
              {deleteConfirmation?.type === "team" && (
                <span className="block mt-2 text-red-500">
                  This will also delete all rooms and device associations within
                  this team.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmation?.type === "team" && deleteConfirmation) {
                  handleDeleteTeam(deleteConfirmation.id);
                } else if (deleteConfirmation) {
                  handleDeleteRoom(deleteConfirmation.id);
                }
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Sidebar;
