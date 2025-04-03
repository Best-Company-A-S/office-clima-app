"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RoomsList } from "@/app/components/RoomsList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import axios from "axios";
import { toast } from "sonner";

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

  // Loading state
  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-destructive">
            Error Loading Team
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button variant="outline" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Check if team was found
  if (!team) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Team Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The team you're looking for does not exist or you don't have access
            to it.
          </p>
          <Button variant="outline" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = team.ownerId === team.currentUserId;

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            {team.description && (
              <p className="text-muted-foreground mt-1">{team.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleInvite}
              className="gap-2"
              disabled={!isOwner}
            >
              <Share2 className="h-4 w-4" />
              Invite Members
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <RoomsList rooms={rooms} isTeamOwner={isOwner} teamId={teamId} />
      </div>
    </div>
  );
}
