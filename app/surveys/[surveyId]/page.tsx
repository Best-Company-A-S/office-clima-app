"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { Star, StarOff } from "lucide-react";

export default function SurveyPage() {
  const params = useParams();
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`/api/surveys/${params.surveyId}/responses`, {
        rating,
        comment: comment.trim() || null,
      });

      setSubmitted(true);
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit survey");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container max-w-lg mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-center text-muted-foreground">
              Your response helps us improve the room conditions for everyone.
            </p>
            <Button onClick={() => window.close()}>Close Window</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Room Comfort Survey</CardTitle>
          <CardDescription>
            Please rate your comfort level in this room
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating */}
          <div className="space-y-4">
            <label className="text-sm font-medium">
              How comfortable is the room?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={rating === value ? "default" : "outline"}
                  size="lg"
                  className="h-12 w-12"
                  onClick={() => setRating(value)}
                >
                  {value <= (rating || 0) ? (
                    <Star className="h-6 w-6 fill-current" />
                  ) : (
                    <StarOff className="h-6 w-6" />
                  )}
                  <span className="sr-only">Rate {value} stars</span>
                </Button>
              ))}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {rating
                ? `You rated ${rating} star${rating !== 1 ? "s" : ""}`
                : "Click to rate"}
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Additional comments (optional)
            </label>
            <Textarea
              placeholder="Share your thoughts about the room comfort..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting || !rating}
          >
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
