"use client";

import { useEffect, useState } from "react";
import { TeamModal } from "@/app/components/modals/TeamModal";
import { JoinTeamModal } from "@/app/components/modals/JoinTeamModal";
import { InviteModal } from "@/app/components/modals/InviteModal";
import { useJoinTeamModal } from "@/app/hooks/useJoinTeamModal";
import { useInviteModal } from "@/app/hooks/useInviteModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const joinTeamModal = useJoinTeamModal();
  const inviteModal = useInviteModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TeamModal />
      <JoinTeamModal
        isOpen={joinTeamModal.isOpen}
        onClose={joinTeamModal.onClose}
      />
      {inviteModal.team && (
        <InviteModal
          isOpen={inviteModal.isOpen}
          onClose={inviteModal.onClose}
          team={inviteModal.team}
        />
      )}
    </>
  );
};
