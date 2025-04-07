"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useTeamModal } from "@/hooks/useTeamModal";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Team name is required").max(100),
  description: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const TeamModal = () => {
  const { isOpen, onClose, teamToEdit } = useTeamModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const title = teamToEdit ? "Edit Team" : "Create a New Team";
  const description = teamToEdit
    ? "Update your team details"
    : "Create a new team to collaborate with others";
  const action = teamToEdit ? "Save changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch team data when editing
  useEffect(() => {
    if (teamToEdit && isOpen) {
      setIsFetching(true);

      const fetchTeamDetails = async () => {
        try {
          const response = await axios.get(`/api/teams/${teamToEdit.id}`);
          const teamData = response.data;

          // Reset form with fetched values
          form.reset({
            name: teamData.name,
            description: teamData.description || "",
          });
        } catch (error) {
          console.error("Error fetching team details:", error);
          toast.error("Failed to load team details");
        } finally {
          setIsFetching(false);
        }
      };

      fetchTeamDetails();
    } else if (!teamToEdit && isOpen) {
      // Clear form when creating a new team
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [teamToEdit, isOpen, form]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (teamToEdit) {
        // Update existing team
        await axios.patch(`/api/teams/${teamToEdit.id}`, data);
        toast.success("Team updated successfully");
      } else {
        // Create new team
        await axios.post("/api/teams/create", data);
        toast.success("Team created successfully");
      }

      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="My Awesome Team"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="What's this team about?"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {action}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
