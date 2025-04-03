"use client";

import { useEffect, useState } from "react";
import { TeamModal } from "@/app/components/modals/TeamModal";
import { JoinTeamModal } from "@/app/components/modals/JoinTeamModal";
import { InviteModal } from "@/app/components/modals/InviteModal";
import { RoomModal } from "@/app/components/modals/RoomModal";
import { DevicePairingModal } from "@/app/components/modals/DevicePairingModal";
import { useJoinTeamModal } from "@/app/hooks/useJoinTeamModal";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import { useRoomModal } from "@/app/hooks/useRoomModal";
import { useDevicePairingModal } from "@/app/hooks/useDevicePairingModal";

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
