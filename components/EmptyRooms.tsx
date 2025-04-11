"use client";

import { Button } from "@/components/ui/button";
import { useRoomModal } from "@/hooks/useRoomModal";
import {
  School,
  PlusCircle,
  BookOpen,
  ArrowRight,
  BarChart,
  Thermometer,
  Droplet,
  Building,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyRoomsProps {
  teamId: string;
}

export const EmptyRooms = ({ teamId }: EmptyRoomsProps) => {
  const roomModal = useRoomModal();

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
          {/* Decorative elements - more subtle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="absolute right-10 top-10 opacity-10">
            <BarChart className="h-24 w-24 text-primary" />
          </div>
          <div className="absolute left-10 bottom-10 opacity-10">
            <Thermometer className="h-20 w-20 text-rose-400" />
          </div>
          <div className="absolute right-40 bottom-20 opacity-10">
            <Droplet className="h-16 w-16 text-blue-400" />
          </div>

          <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center z-10 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10"
            >
              <Building className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-gray-50">
                Add Your First Classroom
              </h2>
              <p className="text-muted-foreground mt-2 mb-8 max-w-xl text-base">
                Create classrooms to monitor environmental conditions that
                impact student learning. Track temperature, humidity, and air
                quality to maintain an optimal educational environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
            >
              <Button
                onClick={() => roomModal.onOpen(teamId)}
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <PlusCircle className="h-5 w-5" />
                Add Classroom
                <ArrowRight className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-4 border-t border-border/40 w-full max-w-xl flex justify-between text-xs text-muted-foreground"
            >
              <div className="flex gap-1 items-center">
                <Thermometer className="h-3 w-3" />
                <span>Optimize learning temperature</span>
              </div>
              <div className="flex gap-1 items-center">
                <Droplet className="h-3 w-3" />
                <span>Monitor humidity levels</span>
              </div>
              <div className="flex gap-1 items-center">
                <Users className="h-3 w-3" />
                <span>Improve student comfort</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
