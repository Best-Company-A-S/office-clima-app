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
import { useRoomModal } from "@/hooks/useRoomModal";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Room name is required.",
  }),
  description: z.string().optional(),
  type: z.string().optional(),
  size: z.coerce.number().int().positive().optional(),
  capacity: z.coerce.number().int().positive().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const RoomModal = () => {
  const { isOpen, onClose, roomToEdit, teamId } = useRoomModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const title = roomToEdit ? "Edit Room" : "Create a New Room";
  const description = roomToEdit
    ? "Update your room details"
    : "Create a new room for your devices";
  const action = roomToEdit ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      size: undefined,
      capacity: undefined,
    },
  });

  // Fetch room data when editing
  useEffect(() => {
    if (roomToEdit && isOpen) {
      setIsFetching(true);

      const fetchRoomDetails = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/rooms/${roomToEdit.id}`);

          form.setValue("name", response.data.name);
          form.setValue("description", response.data.description || "");
          form.setValue("type", response.data.type || "");
          form.setValue("size", response.data.size || undefined);
          form.setValue("capacity", response.data.capacity || undefined);
        } catch (error) {
          console.error("Failed to fetch room details:", error);
          toast.error("Failed to load room details");
        } finally {
          setIsLoading(false);
          setIsFetching(false);
        }
      };

      fetchRoomDetails();
    } else if (!roomToEdit && isOpen) {
      // Clear form when creating a new room
      form.reset({
        name: "",
        description: "",
        type: "",
        size: undefined,
        capacity: undefined,
      });
    }
  }, [roomToEdit, isOpen, form]);

  const onSubmit = async (data: FormValues) => {
    if (!teamId && !roomToEdit) {
      toast.error("Team ID is required");
      return;
    }

    setIsLoading(true);
    try {
      if (roomToEdit) {
        // Update existing room
        await axios.patch(`/api/rooms/${roomToEdit.id}`, data);
        toast.success("Room updated successfully");
      } else {
        // Create new room
        await axios.post("/api/rooms/create", {
          ...data,
          teamId,
        });
        toast.success("Room created successfully");
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Room name"
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
                          placeholder="A brief description of this room"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type (Optional)</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="meeting">
                              Meeting Room
                            </SelectItem>
                            <SelectItem value="classroom">Classroom</SelectItem>
                            <SelectItem value="lab">Laboratory</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size in m² (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="Size"
                            {...field}
                            value={field.value === undefined ? "" : field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="Max people"
                            {...field}
                            value={field.value === undefined ? "" : field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
