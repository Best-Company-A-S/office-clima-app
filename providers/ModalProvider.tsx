"use client";

import { useEffect, useState } from "react";
import { TeamModal } from "@/components/modals/TeamModal";
import { JoinTeamModal } from "@/components/modals/JoinTeamModal";
import { InviteModal } from "@/components/modals/InviteModal";
import { RoomModal } from "@/components/modals/RoomModal";
import { DevicePairingModal } from "@/components/modals/DevicePairingModal";
import { useJoinTeamModal } from "@/hooks/useJoinTeamModal";
import { useInviteModal } from "@/hooks/useInviteModal";
import { useRoomModal } from "@/hooks/useRoomModal";
import { useDevicePairingModal } from "@/hooks/useDevicePairingModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const joinTeamModal = useJoinTeamModal();
  const inviteModal = useInviteModal();
  const roomModal = useRoomModal();
  const devicePairingModal = useDevicePairingModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TeamModal />
      <RoomModal />
      <DevicePairingModal />
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
