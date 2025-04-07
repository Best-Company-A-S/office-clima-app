"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Trash2, QrCode, ChartBar, Share2, Copy, Check, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface SurveyListProps {
  roomId: string;
  surveys: Array<{
    id: string;
    title: string;
    active: boolean;
    createdAt: string;
    responses: number;
  }>;
  onSurveyDeleted?: () => void;
}

export const SurveyList = ({
  roomId,
  surveys,
  onSurveyDeleted,
}: SurveyListProps) => {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [responses, setResponses] = useState<any[] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedSurveyForShare, setSelectedSurveyForShare] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);

  const handleCreateSurvey = async () => {
    try {
      const response = await axios.post(`/api/rooms/${roomId}/surveys`);
      const { qrCode } = response.data;
      setQrCode(qrCode);
      if (onSurveyDeleted) onSurveyDeleted();
    } catch (error) {
      toast.error("Failed to create survey");
    }
  };

  const handleViewResponses = async (surveyId: string) => {
    try {
      const response = await axios.get(`/api/surveys/${surveyId}/responses`);
      setResponses(response.data);
      setSelectedSurvey(surveyId);
    } catch (error) {
      toast.error("Failed to load responses");
    }
  };

  const handleDeleteSurvey = async (surveyId: string) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/surveys/${surveyId}`);
      toast.success("Survey deleted successfully");
      if (onSurveyDeleted) onSurveyDeleted();
    } catch (error) {
      toast.error("Failed to delete survey");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async (surveyId: string) => {
    try {
      const response = await axios.get(`/api/surveys/${surveyId}/qr`);
      setQrCode(response.data.qrCode);
      setSelectedSurveyForShare(surveyId);
      setShareDialogOpen(true);
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleCopyLink = async (surveyId: string) => {
    const surveyUrl = `${window.location.origin}/surveys/${surveyId}`;
    try {
      await navigator.clipboard.writeText(surveyUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const renderResponseStats = (responses: any[]) => {
    if (!responses.length)
      return <p className="text-muted-foreground">No responses yet</p>;

    const comfortRatings = responses
      .map(
        (r: { answers: { comfort: number; suggestions?: string } }) =>
          r.answers.comfort
      )
      .filter(Boolean);
    const avgComfort = comfortRatings.length
      ? (
          comfortRatings.reduce((a, b) => a + b, 0) / comfortRatings.length
        ).toFixed(1)
      : "N/A";

    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Average Comfort Rating</h4>
          <div className="text-2xl font-bold">{avgComfort} / 5</div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Recent Suggestions</h4>
          <div className="space-y-2">
            {responses.slice(0, 3).map((response, i) => (
              <div key={i} className="bg-muted p-3 rounded-md">
                {response.answers.suggestions || "No suggestion provided"}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Surveys</h2>
        <Button onClick={handleCreateSurvey}>Create New Survey</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{survey.title}</CardTitle>
              <CardDescription>
                Created{" "}
                {formatDistanceToNow(new Date(survey.createdAt), {
                  addSuffix: true,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {survey.responses} responses
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewResponses(survey.id)}
                >
                  <ChartBar className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(survey.id)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteSurvey(survey.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!qrCode && shareDialogOpen}
        onOpenChange={(open) => {
          setShareDialogOpen(open);
          if (!open) {
            setQrCode(null);
            setSelectedSurveyForShare(null);
            setCopied(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Share Survey</DialogTitle>
            </div>
            <DialogDescription>
              Share this survey via QR code or link
            </DialogDescription>
          </DialogHeader>
          {qrCode && (
            <div className="space-y-6">
              <div className="flex justify-center p-6 bg-white rounded-lg">
                <Image
                  src={qrCode}
                  alt="Survey QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  className="w-full max-w-[200px]"
                  onClick={() => handleCopyLink(selectedSurveyForShare!)}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedSurvey}
        onOpenChange={() => setSelectedSurvey(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Survey Responses</DialogTitle>
            <DialogDescription>
              View all responses for this survey
            </DialogDescription>
          </DialogHeader>
          {responses && renderResponseStats(responses)}
        </DialogContent>
      </Dialog>
    </div>
  );
};
