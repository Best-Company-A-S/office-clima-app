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
import { Users, Settings, Share2, Trash2 } from "lucide-react";
import { useTeamModal } from "@/app/hooks/useTeamModal";
import { useInviteModal } from "@/app/hooks/useInviteModal";
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

interface TeamCardProps {
  team: Team;
  isOwner: boolean;
  membersCount?: number;
}

export const TeamCard = ({
  team,
  isOwner,
  membersCount = 0,
}: TeamCardProps) => {
  const router = useRouter();
  const teamModal = useTeamModal();
  const inviteModal = useInviteModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  return (
    <>
      <Card className="w-full overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
              <CardDescription className="mt-1">
                {team.description || "No description provided"}
              </CardDescription>
            </div>
            {isOwner && (
              <Badge variant="secondary" className="ml-2">
                Owner
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {membersCount + (isOwner ? 1 : 0)}{" "}
              {membersCount + (isOwner ? 1 : 0) === 1 ? "member" : "members"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-3 pb-3 flex justify-between gap-2">
          <Button variant="default" className="flex-1" onClick={onView}>
            View Team
          </Button>
          {isOwner && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => teamModal.onOpenEdit(team)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => inviteModal.onOpen(team)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the team "{team.name}" and remove all
              members. This action cannot be undone.
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
