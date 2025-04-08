"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Loader2,
  ThermometerSun,
  Droplets,
  Bell,
  Palette,
  Image as ImageIcon,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const settingsFormSchema = z.object({
  temperatureUnit: z.enum(["C", "F"]),
  humidityUnit: z.enum(["%", "g/m³"]),
  temperatureThreshold: z.number().min(0).max(50),
  humidityThreshold: z.number().min(0).max(100),
  temperatureAlert: z.boolean(),
  temperatureAlertThreshold: z.number().min(0).max(50),
  humidityAlert: z.boolean(),
  humidityAlertThreshold: z.number().min(0).max(100),
  temperatureAlertWebhook: z.string().url().optional().or(z.literal("")),
  humidityAlertWebhook: z.string().url().optional().or(z.literal("")),
  wallpaperUrl: z.string().url().optional().or(z.literal("")),
  wallpaperBlur: z.number().min(0).max(20),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// Wallpaper Preview component
const WallpaperPreview = ({ url, blur }: { url: string; blur: number }) => {
  const isValidUrl = url && url.trim() !== "";
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset error state when URL changes
  useEffect(() => {
    if (isValidUrl) {
      setIsLoading(true);
      setImageError(false);

      // Preload the image
      const img = new window.Image();
      img.src = url;
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setImageError(true);
        setIsLoading(false);
      };
    }
  }, [url, isValidUrl]);

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-border relative">
      <div className="aspect-video w-full bg-muted flex items-center justify-center">
        {isValidUrl && !imageError ? (
          <div className="w-full h-full relative">
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-card/50">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium">Loading wallpaper...</p>
                </div>
              </div>
            )}

            {/* Background image with blur */}
            <div
              className="absolute inset-0 bg-cover bg-center z-10"
              style={{
                backgroundImage: `url(${url})`,
                filter: `blur(${blur}px)`,
                transform: "scale(1.1)", // Prevent blur from showing edges
              }}
            >
              {/* Hidden image to test if URL is valid */}
              <img
                src={url}
                alt=""
                className="hidden"
                onError={() => setImageError(true)}
              />
            </div>

            {/* Dashboard overlay */}
            <div className="absolute inset-0 flex p-4 z-20">
              <div className="w-16 h-full bg-card/80 backdrop-blur-sm rounded-lg mr-4 border border-border flex flex-col items-center py-4">
                {/* Sidebar mock */}
                <div className="w-8 h-8 rounded-full bg-primary/20 mb-6"></div>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg ${
                        i === 0 ? "bg-primary/20" : "bg-muted/50"
                      } mb-2 mt-2`}
                    ></div>
                  ))}
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {/* Top section */}
                <div className="flex gap-4 h-1/2">
                  <div className="w-2/3 bg-card/80 backdrop-blur-sm rounded-lg border border-border p-3">
                    <div className="h-4 w-1/3 bg-muted/50 rounded mb-2"></div>
                    <div className="grid grid-cols-2 gap-2 h-[calc(100%-1.5rem)]">
                      <div className="bg-muted/30 rounded-lg"></div>
                      <div className="bg-muted/30 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="w-1/3 bg-card/80 backdrop-blur-sm rounded-lg border border-border p-3">
                    <div className="h-4 w-1/3 bg-muted/50 rounded mb-2"></div>
                    <div className="h-[calc(100%-1.5rem)] bg-muted/30 rounded-lg"></div>
                  </div>
                </div>

                {/* Bottom section */}
                <div className="flex gap-4 h-1/2">
                  <div className="w-1/3 bg-card/80 backdrop-blur-sm rounded-lg border border-border p-3">
                    <div className="h-4 w-1/3 bg-muted/50 rounded mb-2"></div>
                    <div className="h-[calc(100%-1.5rem)] bg-muted/30 rounded-lg"></div>
                  </div>
                  <div className="w-2/3 bg-card/80 backdrop-blur-sm rounded-lg border border-border p-3">
                    <div className="h-4 w-1/3 bg-muted/50 rounded mb-2"></div>
                    <div className="h-[calc(100%-1.5rem)] bg-muted/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-8">
            <ImageIcon className="h-12 w-12 mb-2" />
            <p className="text-center">
              {imageError
                ? "Unable to load image. Please check the URL."
                : "Enter a valid wallpaper URL to see a preview"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Sample wallpapers
const SAMPLE_WALLPAPERS = [
  {
    name: "Mountain Vista",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Abstract Blue",
    url: "https://images.unsplash.com/photo-1528818955841-a7f1425131b5?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "City Skyline",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Gradient Purple",
    url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Forest Mist",
    url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Minimal Workspace",
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Dark Texture",
    url: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=1920&auto=format&fit=crop",
  },
  {
    name: "Clean Grey",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      temperatureUnit: "C",
      humidityUnit: "%",
      temperatureThreshold: 25.0,
      humidityThreshold: 50.0,
      temperatureAlert: false,
      temperatureAlertThreshold: 25.0,
      humidityAlert: false,
      humidityAlertThreshold: 50.0,
      temperatureAlertWebhook: "",
      humidityAlertWebhook: "",
      wallpaperUrl: "",
      wallpaperBlur: 0,
    },
  });

  // Load settings when team changes
  useEffect(() => {
    const fetchSettings = async () => {
      const teamId = searchParams.get("teamId");
      if (!teamId) return;

      console.log("Fetching settings for team:", teamId);
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/teams/${teamId}/settings`);
        console.log("Loaded settings from API:", response.data);
        form.reset(response.data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [searchParams, form]);

  const onSubmit = async (data: SettingsFormValues) => {
    console.log("Form submission triggered with data:", data);

    const teamId = searchParams.get("teamId");
    if (!teamId) {
      toast.error("No team selected");
      return;
    }

    // Use the same approach as the Direct Update Test which works correctly
    // Force using Number for numeric fields
    const settingsData = {
      temperatureUnit: data.temperatureUnit,
      humidityUnit: data.humidityUnit,
      temperatureThreshold: Number(data.temperatureThreshold),
      humidityThreshold: Number(data.humidityThreshold),
      temperatureAlert: Boolean(data.temperatureAlert),
      temperatureAlertThreshold: Number(data.temperatureAlertThreshold),
      humidityAlert: Boolean(data.humidityAlert),
      humidityAlertThreshold: Number(data.humidityAlertThreshold),
      temperatureAlertWebhook: data.temperatureAlertWebhook || "",
      humidityAlertWebhook: data.humidityAlertWebhook || "",
      wallpaperUrl: data.wallpaperUrl || "",
      wallpaperBlur: Number(data.wallpaperBlur),
    };

    console.log("Saving settings with prepared data:", settingsData);
    setIsSaving(true);
    try {
      console.log("Sending request to:", `/api/teams/${teamId}/settings`);
      // Use the same headers configuration that works with Direct Update Test
      const response = await axios.patch(
        `/api/teams/${teamId}/settings`,
        settingsData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response received:", response);

      if (response.status === 200) {
        toast.success("Settings saved successfully");

        // Refresh settings from server after a delay to ensure DB update is complete
        setTimeout(async () => {
          try {
            const refreshResponse = await axios.get(
              `/api/teams/${teamId}/settings`
            );
            console.log("Refreshed settings from DB:", refreshResponse.data);
            form.reset(refreshResponse.data);
          } catch (refreshError) {
            console.error("Failed to refresh settings:", refreshError);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "Failed to save settings";
        console.error("API Error:", errorMessage);
        toast.error(
          typeof errorMessage === "string"
            ? errorMessage
            : "Invalid settings data"
        );
      } else {
        toast.error("Failed to save settings");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-8">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            console.log("Form onSubmit triggered");

            // Get the current form values directly
            const data = form.getValues();
            console.log("Form data on submit:", data);

            // Call onSubmit directly rather than through handleSubmit
            onSubmit(data);
          }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Settings
              </h2>
              <p className="text-muted-foreground">
                Manage your team's preferences and configurations.
              </p>
            </div>

            <Tabs defaultValue="climate" className="space-y-4">
              <TabsList>
                <TabsTrigger value="climate" className="gap-2">
                  <ThermometerSun className="h-4 w-4" />
                  Climate
                </TabsTrigger>
                <TabsTrigger value="alerts" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="climate" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Climate Settings</CardTitle>
                    <CardDescription>
                      Configure your temperature and humidity preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="temperatureUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature Unit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="C">Celsius (°C)</SelectItem>
                                <SelectItem value="F">
                                  Fahrenheit (°F)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="humidityUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Humidity Unit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="%">
                                  Percentage (%)
                                </SelectItem>
                                <SelectItem value="g/m³">
                                  Absolute (g/m³)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="temperatureThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature Threshold</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={50}
                                  step={0.5}
                                  value={[field.value]}
                                  onValueChange={([value]) =>
                                    field.onChange(value)
                                  }
                                />
                              </FormControl>
                              <span className="w-12 text-sm">
                                {field.value}°{form.watch("temperatureUnit")}
                              </span>
                            </div>
                            <FormDescription>
                              The baseline temperature for comfort calculations.
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="humidityThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Humidity Threshold</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={([value]) =>
                                    field.onChange(value)
                                  }
                                />
                              </FormControl>
                              <span className="w-12 text-sm">
                                {field.value}
                                {form.watch("humidityUnit")}
                              </span>
                            </div>
                            <FormDescription>
                              The baseline humidity for comfort calculations.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Temperature Alerts</CardTitle>
                    <CardDescription>
                      Configure temperature-based notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="temperatureAlert"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Enable Temperature Alerts</FormLabel>
                            <FormDescription>
                              Get notified when temperature exceeds the
                              threshold.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("temperatureAlert") && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="temperatureAlertThreshold"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alert Threshold</FormLabel>
                              <div className="flex items-center space-x-4">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={50}
                                    step={0.5}
                                    value={[field.value]}
                                    onValueChange={([value]) =>
                                      field.onChange(value)
                                    }
                                  />
                                </FormControl>
                                <span className="w-12 text-sm">
                                  {field.value}°{form.watch("temperatureUnit")}
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="temperatureAlertWebhook"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Webhook URL (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://..."
                                  {...field}
                                  type="url"
                                />
                              </FormControl>
                              <FormDescription>
                                Receive alerts via webhook when temperature
                                exceeds the threshold.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Humidity Alerts</CardTitle>
                    <CardDescription>
                      Configure humidity-based notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="humidityAlert"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Enable Humidity Alerts</FormLabel>
                            <FormDescription>
                              Get notified when humidity exceeds the threshold.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("humidityAlert") && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="humidityAlertThreshold"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alert Threshold</FormLabel>
                              <div className="flex items-center space-x-4">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={([value]) =>
                                      field.onChange(value)
                                    }
                                  />
                                </FormControl>
                                <span className="w-12 text-sm">
                                  {field.value}
                                  {form.watch("humidityUnit")}
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="humidityAlertWebhook"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Webhook URL (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://..."
                                  {...field}
                                  type="url"
                                />
                              </FormControl>
                              <FormDescription>
                                Receive alerts via webhook when humidity exceeds
                                the threshold.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize the visual appearance of your dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="wallpaperUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wallpaper URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              type="url"
                            />
                          </FormControl>
                          <div className="flex justify-end mt-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                >
                                  Try Sample Wallpaper
                                  <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {SAMPLE_WALLPAPERS.map((wallpaper) => (
                                  <DropdownMenuItem
                                    key={wallpaper.name}
                                    onClick={() => {
                                      field.onChange(wallpaper.url);
                                      toast.success(
                                        `Applied "${wallpaper.name}" wallpaper`
                                      );
                                    }}
                                  >
                                    {wallpaper.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <FormDescription>
                            Add a custom background image to your dashboard.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wallpaperBlur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wallpaper Blur</FormLabel>
                          <div className="flex items-center space-x-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={20}
                                step={1}
                                value={[field.value]}
                                onValueChange={([value]) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <span className="w-12 text-sm">
                              {field.value}px
                            </span>
                          </div>
                          <FormDescription>
                            Adjust the blur intensity of the background image.
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    {/* Wallpaper Preview */}
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">
                        Wallpaper Preview
                      </h3>
                      <WallpaperPreview
                        url={form.watch("wallpaperUrl") || ""}
                        blur={form.watch("wallpaperBlur") || 0}
                      />
                    </div>

                    {/* Helpful Info Panel */}
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <Palette className="h-4 w-4 text-primary" />
                        How Wallpapers Work
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The wallpaper will be applied to your entire dashboard.
                        For best results:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                        <li>
                          Use high-resolution images (recommended: 1920×1080 or
                          higher)
                        </li>
                        <li>
                          Images with good contrast work best with the card
                          overlays
                        </li>
                        <li>Adjust the blur to ensure text remains readable</li>
                        <li>Use landscape-oriented images for best coverage</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button
                type="button"
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
                onClick={(e) => {
                  e.preventDefault();
                  const formValues = form.getValues();
                  console.log("Save button clicked, form state:", formValues);
                  onSubmit(formValues);
                }}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
