"use client";

import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useJoinTeamModal } from "@/hooks/useJoinTeamModal";

export const TeamButtonsClient = () => {
  const teamModal = useTeamModal();
  const joinTeamModal = useJoinTeamModal();

  return (
    <>
      <Button className="flex items-center gap-2" onClick={teamModal.onOpen}>
        <Users className="h-4 w-4" />
        Create Team
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={joinTeamModal.onOpen}
      >
        <UserPlus className="h-4 w-4" />
        Join Team
      </Button>
    </>
  );
};
