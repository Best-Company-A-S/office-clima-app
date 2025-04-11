"use client";

import { Button } from "@/components/ui/button";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useJoinTeamModal } from "@/hooks/useJoinTeamModal";
import {
  UserPlus,
  Users,
  School,
  GraduationCap,
  ClipboardList,
  ArrowRight,
  BookOpen,
  Network,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const EmptyTeams = () => {
  const teamModal = useTeamModal();
  const joinTeamModal = useJoinTeamModal();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto"
      >
        <Card className="border border-gray-200 shadow-md overflow-hidden relative bg-white dark:bg-gray-950 dark:border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

          {/* Decorative elements - more subtle and professional */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="absolute right-10 top-10 opacity-10">
            <School className="h-24 w-24 text-primary" />
          </div>
          <div className="absolute left-10 bottom-10 opacity-10">
            <Users className="h-20 w-20 text-primary/70" />
          </div>
          <div className="absolute right-40 bottom-20 opacity-10">
            <BookOpen className="h-16 w-16 text-primary/60" />
          </div>

          <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center z-10 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10"
            >
              <GraduationCap className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-gray-50">
                Welcome to Clima for Schools
              </h2>
              <p className="text-muted-foreground mt-2 mb-8 max-w-xl text-base">
                Create or join a school department to begin monitoring classroom
                environmental conditions. Track temperature, humidity, and air
                quality factors to ensure optimal learning environments.
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
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <ClipboardList className="h-5 w-5" />
                Create Department
                <ArrowRight className="h-4 w-4 ml-1 opacity-70" />
              </Button>

              <Button
                onClick={joinTeamModal.onOpen}
                variant="outline"
                size="lg"
                className="gap-2 border-primary/20 hover:border-primary/40"
              >
                <UserPlus className="h-5 w-5 text-primary" />
                Join Existing Department
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-4 border-t border-border/40 w-full max-w-xl flex justify-between text-xs text-muted-foreground"
            >
              <div className="flex gap-1 items-center">
                <Users className="h-3 w-3" />
                <span>Faculty collaboration</span>
              </div>
              <div className="flex gap-1 items-center">
                <Network className="h-3 w-3" />
                <span>Connect multiple classrooms</span>
              </div>
              <div className="flex gap-1 items-center">
                <ShieldCheck className="h-3 w-3" />
                <span>Secure data management</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
