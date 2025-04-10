"use client";

import { Button } from "@/components/ui/button";
import { useRoomModal } from "@/hooks/useRoomModal";
import {
  Home,
  PlusCircle,
  Sparkles,
  ArrowRight,
  BarChart,
  Thermometer,
  Droplet,
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
        <Card className="border-none shadow-xl overflow-hidden relative bg-gradient-to-br from-background to-background/90">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="absolute right-10 top-10 opacity-10">
            <BarChart className="h-32 w-32 text-primary" />
          </div>
          <div className="absolute left-10 bottom-10 opacity-10">
            <Thermometer className="h-24 w-24 text-rose-400" />
          </div>
          <div className="absolute right-40 bottom-20 opacity-10">
            <Droplet className="h-20 w-20 text-blue-400" />
          </div>

          <CardContent className="flex flex-col items-center justify-center py-20 px-6 text-center z-10 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 p-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/10 shadow-xl"
            >
              <Home className="h-14 w-14 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Add Your First Room
              </h2>
              <p className="text-muted-foreground mt-2 mb-10 max-w-xl text-lg leading-relaxed">
                Create rooms to track temperature, humidity, and other climate
                metrics. Monitor conditions in real-time and optimize comfort in
                your spaces.
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
                className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                Create Your First Room
                <ArrowRight className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 pt-6 border-t border-border/40 w-full max-w-xl flex justify-between text-xs text-muted-foreground"
            >
              <div className="flex gap-1 items-center">
                <Thermometer className="h-3 w-3" />
                <span>Track temperature trends</span>
              </div>
              <div className="flex gap-1 items-center">
                <Droplet className="h-3 w-3" />
                <span>Monitor humidity levels</span>
              </div>
              <div className="flex gap-1 items-center">
                <BarChart className="h-3 w-3" />
                <span>Visualize climate data</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
