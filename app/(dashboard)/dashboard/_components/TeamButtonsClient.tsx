"use client";

import { Button } from "@/components/ui/button";
import { Users, UserPlus, Sparkles, Building, Plus } from "lucide-react";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useJoinTeamModal } from "@/hooks/useJoinTeamModal";
import { motion } from "framer-motion";

export const TeamButtonsClient = () => {
  const teamModal = useTeamModal();
  const joinTeamModal = useJoinTeamModal();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          className="gap-2 shadow-sm bg-gradient-to-r from-primary to-primary/90 hover:shadow-md transition-all duration-300"
          onClick={teamModal.onOpen}
        >
          <Sparkles className="h-4 w-4" />
          Create Team
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant="outline"
          className="gap-2 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 hover:border-primary/40 transition-all duration-300 shadow-sm"
          onClick={joinTeamModal.onOpen}
        >
          <UserPlus className="h-4 w-4 text-primary" />
          Join Team
        </Button>
      </motion.div>
    </div>
  );
};
