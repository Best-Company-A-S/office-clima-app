"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Home,
  Activity,
  Thermometer,
  Droplet,
  Gauge,
  LayoutGrid,
  Wind,
  Users,
  Clock,
  RefreshCw,
  Settings,
  PanelTop,
  AreaChart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "@/components/SurveyList";
import { toast } from "sonner";
import axios from "axios";
import { DeviceList } from "@/components/DeviceList";
import { DeviceReadingsChart } from "@/components/DeviceReadingsChart";
import { RoomMetrics } from "@/components/RoomMetrics";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Types for our data
interface RoomData {
  id: string;
  name: string;
  description: string | null;
  teamId: string;
  devices: Array<{
    device_id: string;
    name: string | null;
    description: string | null;
    model: string | null;
    firmwareVersion: string | null;
    isPaired: boolean;
    lastSeenAt: string | null;
    roomId: string | null;
    pairedAt: string | null;
    createdAt: string;
    updatedAt: string;
    lastReading?: {
      temperature: number;
      humidity: number;
      airQuality: number;
      timestamp: string;
    };
  }>;
}

interface SurveyData {
  id: string;
  title: string;
  active: boolean;
  createdAt: string;
  responses: number;
}

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<RoomData | null>(null);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      if (!refreshing) setIsLoading(true);
      setRefreshing(true);
      const [roomResponse, surveysResponse] = await Promise.all([
        axios.get(`/api/rooms/${params.roomId}`),
        axios.get(`/api/rooms/${params.roomId}/surveys`),
      ]);
      setRoom(roomResponse.data);
      setSurveys(surveysResponse.data);
    } catch (error) {
      toast.error("Failed to load room data");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.roomId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse bg-primary/20 rounded-full flex items-center justify-center">
                  <ChevronLeft className="h-5 w-5 text-primary/40" />
                </div>
                <div className="h-8 w-48 animate-pulse bg-primary/10 rounded" />
              </div>
              <div className="h-10 w-10 animate-pulse bg-primary/20 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none shadow-md rounded-xl overflow-hidden relative mb-6 bg-gradient-to-br from-background to-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-30 -z-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10"></div>

                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10 animate-pulse">
                          <Home className="h-6 w-6 text-primary/40" />
                        </div>
                        <div className="h-10 w-full max-w-[250px] animate-pulse bg-primary/10 rounded" />
                      </div>
                      <div className="h-4 w-full max-w-[350px] animate-pulse bg-muted rounded" />
                      <div className="h-4 w-24 animate-pulse bg-muted rounded" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 animate-pulse bg-primary/10 rounded-lg" />
                      <div className="h-10 w-10 animate-pulse bg-primary/10 rounded-lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="h-36 animate-pulse bg-card rounded-xl shadow-sm border border-border/50" />
                <div className="h-36 animate-pulse bg-card rounded-xl shadow-sm border border-border/50" />
                <div className="h-36 animate-pulse bg-card rounded-xl shadow-sm border border-border/50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-none shadow-sm rounded-xl mb-6">
                <CardContent className="p-0">
                  <div className="h-16 animate-pulse bg-card rounded-t-xl border-b border-border/50" />
                </CardContent>
              </Card>

              <div className="h-[400px] animate-pulse bg-card rounded-xl shadow-sm border border-border/50" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-muted/80 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Home className="h-10 w-10 text-muted-foreground/70" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Room Not Found
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md text-lg">
              The room you're looking for doesn't exist or you don't have access
              to view it.
            </p>
            <Button
              onClick={() => router.back()}
              size="lg"
              className="gap-2 rounded-full px-6"
            >
              <ChevronLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const lastUpdated = room.devices.reduce((latest, device) => {
    if (!device.lastSeenAt) return latest;
    const deviceDate = new Date(device.lastSeenAt);
    return deviceDate > latest ? deviceDate : latest;
  }, new Date(0));

  const hasRecentData = lastUpdated.getTime() > 0;
  const timeAgo = hasRecentData ? formatTimeAgo(lastUpdated) : "No recent data";

  function formatTimeAgo(date: Date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="gap-2 rounded-lg hover:bg-primary/10 group"
              >
                <ChevronLeft className="h-5 w-5 group-hover:translate-x-[-2px] transition-transform" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 rounded-lg"
                  onClick={fetchData}
                  disabled={refreshing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 rounded-lg"
                  onClick={() => router.push(`/rooms/${room.id}/settings`)}
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </div>
            </div>

            {/* Room Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="mb-6 border-none shadow-md rounded-xl overflow-hidden relative bg-gradient-to-br from-background to-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-30 -z-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10"></div>

                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-primary/20 text-primary shadow-sm">
                          <Home className="h-6 w-6" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight">
                            {room.name}
                          </h1>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground gap-4">
                            <div className="flex items-center gap-1">
                              <PanelTop className="h-3.5 w-3.5" />
                              <span>Room ID: {room.id.slice(0, 6)}...</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>Updated: {timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {room.description && (
                        <p className="text-muted-foreground max-w-2xl">
                          {room.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10"
                        >
                          <LayoutGrid className="h-3.5 w-3.5 mr-1" />
                          {room.devices.length}{" "}
                          {room.devices.length === 1 ? "device" : "devices"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10"
                        >
                          <Wind className="h-3.5 w-3.5 mr-1" />
                          Climate Monitoring
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10"
                        >
                          <Users className="h-3.5 w-3.5 mr-1" />
                          {surveys.length}{" "}
                          {surveys.length === 1 ? "survey" : "surveys"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Room Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RoomMetrics roomId={room.id} />
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <Card className="border-none shadow-sm rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <TabsList className="w-full rounded-none bg-card border-b border-border/50 p-0 h-auto">
                      <TabsTrigger
                        value="overview"
                        className={`rounded-none data-[state=active]:bg-background data-[state=active]:border-primary data-[state=active]:border-b-2 py-4 px-6 transition-all ${
                          activeTab === "overview"
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="devices"
                        className={`rounded-none data-[state=active]:bg-background data-[state=active]:border-primary data-[state=active]:border-b-2 py-4 px-6 transition-all ${
                          activeTab === "devices"
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Thermometer className="h-4 w-4 mr-2" />
                        Devices
                      </TabsTrigger>
                      <TabsTrigger
                        value="surveys"
                        className={`rounded-none data-[state=active]:bg-background data-[state=active]:border-primary data-[state=active]:border-b-2 py-4 px-6 transition-all ${
                          activeTab === "surveys"
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Gauge className="h-4 w-4 mr-2" />
                        Surveys
                      </TabsTrigger>
                    </TabsList>
                  </CardContent>
                </Card>

                <TabsContent value="overview" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                  >
                    <Card className="border-none shadow-md rounded-xl overflow-hidden">
                      <CardHeader className="pb-0">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <AreaChart className="h-5 w-5 text-primary" />
                          Climate Analytics Dashboard
                        </CardTitle>
                        <CardDescription>
                          Historical temperature, humidity, and air quality data
                          from all devices
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <DeviceReadingsChart roomId={room.id} />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="devices" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <DeviceList roomId={room.id} devices={room.devices} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="surveys" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <SurveyList
                      roomId={room.id}
                      surveys={surveys}
                      onSurveyDeleted={fetchData}
                    />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
