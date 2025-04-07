"use client";

import { Button } from "@/components/ui/button";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useJoinTeamModal } from "@/hooks/useJoinTeamModal";
import { UserPlus, Users, Building2, Building, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const EmptyTeams = () => {
  const teamModal = useTeamModal();
  const joinTeamModal = useJoinTeamModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-40 -z-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10"></div>

        <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 p-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 ring-2 ring-primary/5 shadow-xl"
          >
            <Building className="h-12 w-12 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              No Teams Yet
            </h2>
            <p className="text-muted-foreground mt-2 mb-8 max-w-md text-lg">
              Create your first team to start collaborating with others or join
              an existing team with an invite code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
          >
            <Button
              onClick={teamModal.onOpen}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              Create a Team
            </Button>

            <Button
              onClick={joinTeamModal.onOpen}
              variant="outline"
              size="lg"
              className="gap-2 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background/80 shadow-md transition-all duration-300"
            >
              <UserPlus className="h-5 w-5 text-primary" />
              Join a Team
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
