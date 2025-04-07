"use client";

import { Team } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Users,
  Settings,
  Share2,
  Trash2,
  Building2,
  ChevronRight,
  Boxes,
} from "lucide-react";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useInviteModal } from "@/hooks/useInviteModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamCardProps {
  team: Team & {
    _count?: {
      rooms?: number;
      members?: number;
    };
  };
  isOwner: boolean;
  membersCount?: number;
  index?: number;
}

export const TeamCard = ({
  team,
  isOwner,
  membersCount = 0,
  index = 0,
}: TeamCardProps) => {
  const router = useRouter();
  const teamModal = useTeamModal();
  const inviteModal = useInviteModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onView = () => {
    router.push(`/teams/${team.id}`);
  };

  const handleDeleteTeam = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/teams/${team.id}`);
      toast.success("Team deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Failed to delete team");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Animation variants for card
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Generate a gradient based on team name for visual identity
  const getTeamGradient = (name: string) => {
    // Simple hash function to generate consistent colors
    const hash = Array.from(name).reduce(
      (acc, char) => char.charCodeAt(0) + acc,
      0
    );
    const hue1 = hash % 360;
    const hue2 = (hue1 + 30) % 360;

    return `from-[hsl(${hue1},70%,90%)] to-[hsl(${hue2},60%,85%)]`;
  };

  const gradient = getTeamGradient(team.name);

  return (
    <>
      <motion.div
        variants={item}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          className="w-full overflow-hidden border-none shadow-lg transition-all group"
          onClick={onView}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 -z-10`}
          ></div>
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] -z-10"></div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl -z-10"></div>

          <CardHeader className="pb-2 relative">
            <div className="absolute top-4 right-4 size-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {team.name}
                </CardTitle>
                {isOwner && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 font-medium"
                  >
                    Owner
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {team.description || "No description provided"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                {membersCount + (isOwner ? 1 : 0)}{" "}
                {membersCount + (isOwner ? 1 : 0) === 1 ? "member" : "members"}
              </div>

              <div className="flex items-center">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Boxes className="h-4 w-4 text-primary" />
                </div>
                {team._count?.rooms || 0}{" "}
                {(team._count?.rooms || 0) === 1 ? "room" : "rooms"}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-primary/5 pt-3 pb-3 flex justify-between items-center gap-2 border-t border-border/40">
            <Button
              variant="ghost"
              className="flex-1 gap-1 group-hover:text-primary group-hover:bg-primary/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
            >
              View Team
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </Button>

            {isOwner && (
              <div className="flex gap-1">
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          teamModal.onOpenEdit(team);
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Team</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          inviteModal.onOpen(team);
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Invite Members</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(true);
                        }}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Team</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="border-destructive/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Delete "{team.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the team and remove all members. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Team"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
