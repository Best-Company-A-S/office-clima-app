"use client";

import { Button } from "@/components/ui/button";
import { useTeamModal } from "@/app/hooks/useTeamModal";
import { useJoinTeamModal } from "@/app/hooks/useJoinTeamModal";
import { UserPlus, Users } from "lucide-react";

export const EmptyTeams = () => {
  const teamModal = useTeamModal();
  const joinTeamModal = useJoinTeamModal();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="mb-4 p-4 rounded-full bg-primary/10">
        <Users className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">No teams yet</h2>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">
        Create your first team to start collaborating with others or join an
        existing team with an invite code.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={teamModal.onOpen} className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Create a Team
        </Button>
        <Button
          onClick={joinTeamModal.onOpen}
          variant="outline"
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Join a Team
        </Button>
      </div>
    </div>
  );
};
