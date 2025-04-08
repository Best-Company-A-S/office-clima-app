"use client";

import { useState, useEffect } from "react";
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

interface Team {
  id: string;
  name: string;
  ownerId: string;
}

interface Room {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  size: number | null;
  capacity: number | null;
  teamId: string;
  devices: Array<{
    id: string;
    name: string;
  }>;
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
  room?: Room;
  teamId: string;
  onSave: (room: Room) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!room;

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
    } else if (isOpen && !room) {
      form.reset({
        name: "",
        description: "",
        type: "",
        size: undefined,
        capacity: undefined,
      });
    }
  }, [isOpen, room, form]);

  const onSubmit = async (values: RoomFormValues) => {
    setIsLoading(true);

    try {
      const endpoint = isEditing
        ? `/api/rooms/${room.id}`
        : "/api/rooms/create";

      const method = isEditing ? "PATCH" : "POST";

      // Ensure numeric values are properly handled
      const payload = {
        ...values,
        teamId: isEditing ? undefined : teamId,
        size: Number(values.size),
        capacity: Number(values.capacity),
      };

      console.log("Sending room data:", payload);

      const response = await axios({
        method,
        url: endpoint,
        data: payload,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(`Room ${isEditing ? "updated" : "created"} successfully`);
        onSave(response.data);
        onClose();
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditing ? "update" : "create"} room:`,
        error
      );
      // Show more detailed error message if available
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        toast.error(
          typeof errorData === "string"
            ? errorData
            : `Failed to ${
                isEditing ? "update" : "create"
              } room: ${JSON.stringify(errorData)}`
        );
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "create"} room`);
      }
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
  const [activeItem, setActiveItem] = useState("dashboard");
  const [kiskMode, setKiskMode] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loadingStates, setLoadingStates] = useState({
    teams: false,
    rooms: false,
    kiosk: false,
    live: false,
    createTeam: false,
    createRoom: false,
  });
  const devicePairingModal = useDevicePairingModal();
  const [editingTeam, setEditingTeam] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "team" | "room";
    id: string;
    name: string;
  } | null>(null);

  // Update URL when team/room changes
  const updateURL = (teamId?: string, roomId?: string) => {
    const params = new URLSearchParams(searchParams);
    if (teamId) params.set("teamId", teamId);
    if (roomId) params.set("roomId", roomId);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Fetch teams on mount
  useEffect(() => {
    const fetchTeams = async () => {
      if (status !== "authenticated") return;

      try {
        setLoadingStates((prev) => ({ ...prev, teams: true }));
        const response = await api.get<Team[]>("/teams");
        const fetchedTeams = response.data;

        setTeams(fetchedTeams);

        // Select team from URL or first team
        const urlTeamId = searchParams.get("teamId");
        const teamToSelect = urlTeamId
          ? fetchedTeams.find((t) => t.id === urlTeamId)
          : fetchedTeams[0];

        if (teamToSelect) {
          setSelectedTeam(teamToSelect);
          if (!urlTeamId) updateURL(teamToSelect.id);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, teams: false }));
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
        const response = await api.get<Room[]>(
          `/rooms?teamId=${selectedTeam.id}`
        );
        setRooms(response.data);

        // Select room from URL or first room
        const urlRoomId = searchParams.get("roomId");
        const roomToSelect = urlRoomId
          ? response.data.find((r) => r.id === urlRoomId)
          : response.data[0];

        if (roomToSelect) {
          setSelectedRoom(roomToSelect);
          if (!urlRoomId) updateURL(selectedTeam.id, roomToSelect.id);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, rooms: false }));
      }
    };

    fetchRooms();
  }, [selectedTeam?.id, status, searchParams]);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    updateURL(team.id);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    updateURL(selectedTeam?.id, room.id);
  };

  const handleCreateTeam = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, createTeam: true }));
      const response = await api.post<Team>("/teams/create", {
        name: "New Team",
      });
      setTeams((prev) => [...prev, response.data]);
      handleTeamSelect(response.data);
    } catch (error) {
      console.error("Failed to create team:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, createTeam: false }));
    }
  };

  const handleCreateRoom = async () => {
    if (!selectedTeam) return;
    setRoomToEdit(null);
    setRoomModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setRoomToEdit(room);
    setRoomModalOpen(true);
  };

  const handleRoomSave = (room: Room) => {
    if (roomToEdit) {
      // Update existing room in the list
      setRooms((prev) => prev.map((r) => (r.id === room.id ? room : r)));

      // If we're editing the selected room, update that too
      if (selectedRoom?.id === room.id) {
        setSelectedRoom(room);
      }
    } else {
      // Add new room to the list
      setRooms((prev) => [...prev, room]);
      handleRoomSelect(room);
    }
  };

  const handleNavigation = (route: string) => {
    setActiveItem(route);
    router.push(`/${route}`);
  };

  const handleModeToggle = async (mode: "kiosk" | "live") => {
    const loadingKey = mode === "kiosk" ? "kiosk" : "live";
    try {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }));

      const response = await api.post<ApiResponse<{ enabled: boolean }>>(
        `/device/settings/${mode}`,
        {
          enabled: mode === "kiosk" ? !kiskMode : !liveUpdate,
          teamId: selectedTeam?.id,
        }
      );

      if (!response.data.error) {
        if (mode === "kiosk") {
          setKiskMode(!kiskMode);
        } else {
          setLiveUpdate(!liveUpdate);
        }
      }
    } catch (error) {
      console.error(`Failed to toggle ${mode} mode:`, error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }));
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
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, name: newName } : team
        )
      );
      setEditingTeam(null);
      toast.success("Team updated successfully");
    } catch (error) {
      console.error("Failed to update team:", error);
      toast.error("Failed to update team");
    } finally {
      setLoadingStates((prev) => ({ ...prev, teams: false }));
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, teams: true }));
      await api.delete(`/teams/${teamId}`);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
      if (selectedTeam?.id === teamId) {
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
    } finally {
      setLoadingStates((prev) => ({ ...prev, teams: false }));
      setDeleteConfirmation(null);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, rooms: true }));
      await api.delete(`/rooms/${roomId}`);
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
      if (selectedRoom?.id === roomId) {
        const nextRoom = rooms.find((room) => room.id !== roomId);
        if (nextRoom) {
          handleRoomSelect(nextRoom);
        } else {
          updateURL(selectedTeam?.id);
        }
      }
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room:", error);
      toast.error("Failed to delete room");
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
                  loading={loadingStates.rooms}
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
                  {rooms.map((room) => (
                    <div key={room.id} className="group flex items-center">
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                        onClick={() => handleRoomSelect(room)}
                        className={cn(
                          "flex-1 px-2.5 py-1.5 rounded-md text-white/70 text-sm text-left",
                          selectedRoom?.id === room.id &&
                            "bg-white/5 text-white"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{room.name}</span>
                          <span className="text-xs text-white/40">
                            {room.devices?.length || 0}
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
                  ))}
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={handleCreateRoom}
                    disabled={loadingStates.createRoom || !selectedTeam}
                    className={cn(
                      "px-2.5 py-1.5 mt-1 border-t border-white/5 rounded-md text-sm text-left w-full",
                      "flex items-center space-x-2",
                      selectedTeam
                        ? "text-white/40 hover:text-white/70"
                        : "text-white/20 cursor-not-allowed"
                    )}
                  >
                    {loadingStates.createRoom ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    <span>Create Room</span>
                  </motion.button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </nav>

        {/* Mode Toggles */}
        <div className="flex flex-col space-y-4 mt-6">
          <NavItem
            icon={<Radio className={cn("w-4 h-4", kiskMode && "text-white")} />}
            active={kiskMode}
            onClick={() => handleModeToggle("kiosk")}
            loading={loadingStates.kiosk}
            label="Kiosk Mode"
          />
          <NavItem
            icon={
              <Wifi className={cn("w-4 h-4", liveUpdate && "text-white")} />
            }
            active={liveUpdate}
            onClick={() => handleModeToggle("live")}
            loading={loadingStates.live}
            label="Live Updates"
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
      {selectedTeam && (
        <RoomModal
          isOpen={roomModalOpen}
          onClose={() => {
            setRoomModalOpen(false);
            setRoomToEdit(null);
          }}
          room={roomToEdit || undefined}
          teamId={selectedTeam.id}
          onSave={handleRoomSave}
        />
      )}

      <AlertDialog
        open={deleteConfirmation !== null}
        onOpenChange={() => setDeleteConfirmation(null)}
      >
        <AlertDialogContent className="bg-neutral-950/95 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteConfirmation?.type === "team" ? "Team" : "Room"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {deleteConfirmation?.name}
              </span>
              ? This action cannot be undone.
              {deleteConfirmation?.type === "team" && (
                <p className="mt-2 text-red-400">
                  This will also delete all rooms and device associations within
                  this team.
                </p>
              )}
              {deleteConfirmation?.type === "room" && (
                <p className="mt-2 text-red-400">
                  This will remove all device associations within this room.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
              onClick={() => setDeleteConfirmation(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
              onClick={() => {
                if (deleteConfirmation?.type === "team") {
                  handleDeleteTeam(deleteConfirmation.id);
                } else if (deleteConfirmation?.type === "room") {
                  handleDeleteRoom(deleteConfirmation.id);
                }
              }}
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
