"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { Team } from "@prisma/client";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
}

export const InviteModal = ({ isOpen, onClose, team }: InviteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const onCopy = () => {
    if (!inviteCode) return;

    navigator.clipboard.writeText(inviteCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onGenerateInvite = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/teams/invite", {
        teamId: team.id,
      });
      setInviteCode(response.data.code);
      toast.success("Invite code generated");
    } catch (error) {
      toast.error("Failed to generate invite code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to {team.name}</DialogTitle>
          <DialogDescription>
            Generate an invite code to allow others to join your team
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          {inviteCode ? (
            <div className="flex items-center space-x-2">
              <Input value={inviteCode} readOnly />
              <Button size="icon" onClick={onCopy} variant="outline">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={onGenerateInvite}
              className="w-full"
              disabled={isLoading}
            >
              Generate Invite Code
            </Button>
          )}
          <div className="text-xs text-muted-foreground">
            This invite code will allow anyone with it to join your team. Be
            careful who you share it with.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
