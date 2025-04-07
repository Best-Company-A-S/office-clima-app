"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RoomsList } from "@/components/RoomsList";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Users,
  Share2,
  Building,
  Info,
  Building2,
  Sparkles,
  Crown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useInviteModal } from "@/hooks/useInviteModal";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const inviteModal = useInviteModal();
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const teamId = params.teamId as string;

  // Fetch team and room data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch team details
        const teamResponse = await axios.get(`/api/teams/${teamId}`);
        setTeam(teamResponse.data);

        // Fetch rooms for the team
        const roomsResponse = await axios.get(`/api/rooms?teamId=${teamId}`);
        setRooms(roomsResponse.data);

        setError(null);
      } catch (error: any) {
        console.error("Error fetching team data:", error);
        setError(error.response?.data?.error || "Failed to load team data");
        toast.error("Failed to load team data");
      } finally {
        setIsLoading(false);
      }
    };

    if (teamId) {
      fetchData();
    }
  }, [teamId]);

  // Handle back navigation
  const handleBack = () => {
    router.push("/dashboard");
  };

  // Handle invite members
  const handleInvite = () => {
    if (team) {
      inviteModal.onOpen(team);
    }
  };

  // Generate a gradient based on team name for visual identity
  const getTeamGradient = (name: string) => {
    // Simple hash function to generate consistent colors
    const hash = Array.from(name).reduce(
      (acc, char) => char.charCodeAt(0) + acc,
      0
    );
    const hue1 = hash % 360;
    const hue2 = (hue1 + 30) % 360;

    return `from-[hsl(${hue1},70%,90%)] to-[hsl(${hue2},60%,85%)]`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container max-w-7xl mx-auto py-8 px-4 sm:px-6"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>

            <Card className="border-none shadow-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10"></div>
              <CardContent className="p-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-4 w-96" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-md" />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
              <Info className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-destructive">
              Error Loading Team
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md text-lg">
              {error}
            </p>
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2 px-6 py-6 text-base"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Check if team was found
  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Building className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Team Not Found
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md text-lg">
              The team you're looking for does not exist or you don't have
              access to it.
            </p>
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2 px-6 py-6 text-base"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const isOwner = team.ownerId === team.currentUserId;
  const memberCount = team.members?.length || 0;
  const gradient = getTeamGradient(team.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container max-w-7xl mx-auto py-8 px-4 sm:px-6"
      >
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              onClick={handleBack}
              className="group gap-2 hover:bg-background/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-none overflow-hidden shadow-xl">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 -z-10`}
              ></div>
              <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] -z-10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10"></div>

              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                              {team.name}
                            </h1>
                            {isOwner && (
                              <Badge className="bg-primary/10 text-primary border-none">
                                <Crown className="h-3 w-3 mr-1 text-primary" />
                                Owner
                              </Badge>
                            )}
                          </div>
                          {team.description && (
                            <p className="text-muted-foreground mt-1">
                              {team.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span>
                          {memberCount + (isOwner ? 1 : 0)}{" "}
                          {memberCount + (isOwner ? 1 : 0) === 1
                            ? "member"
                            : "members"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-primary/10">
                          <Building className="h-4 w-4 text-primary" />
                        </div>
                        <span>
                          {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleInvite}
                      className="gap-2 shadow-sm transition-all duration-300 hover:shadow-md"
                      disabled={!isOwner}
                      variant={isOwner ? "default" : "outline"}
                      size="lg"
                    >
                      <Share2 className="h-4 w-4" />
                      {isOwner ? "Invite Members" : "View Members"}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <RoomsList rooms={rooms} isTeamOwner={isOwner} teamId={teamId} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
