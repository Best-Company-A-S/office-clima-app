"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, StarOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function SurveyPage() {
  const params = useParams();
  const router = useRouter();
  const [comfort, setComfort] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (comfort === null) {
      toast.error("Please rate your comfort level");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`/api/surveys/${params.surveyId}/responses`, {
        answers: {
          comfort,
          suggestions,
        },
      });
      setSubmitted(true);
      toast.success("Thank you for your feedback!");
    } catch (error) {
      toast.error("Failed to submit survey");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container max-w-lg mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been recorded. You can close this window now.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => window.close()} className="w-full">
              Close Window
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Indoor Climate Survey</CardTitle>
          <CardDescription>
            Please help us improve your comfort by answering these quick
            questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">
              How do you feel about the indoor climate?
            </h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={comfort === rating ? "default" : "outline"}
                  size="lg"
                  className="h-12 w-12"
                  onClick={() => setComfort(rating)}
                >
                  {comfort === rating ? (
                    <Star className="h-6 w-6" />
                  ) : (
                    <StarOff className="h-6 w-6" />
                  )}
                </Button>
              ))}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {comfort ? `${comfort} out of 5 stars` : "Select your rating"}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">
              Do you have any suggestions for improvement?
            </h3>
            <Textarea
              placeholder="Your suggestions (optional)"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
