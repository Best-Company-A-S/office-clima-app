"use client";

import { TeamsList } from "@/components/TeamsList";
import { Separator } from "@/components/ui/separator";
import { TeamButtonsClient } from "./_components/TeamButtonsClient";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  LogOut,
  PlusCircle,
  Home,
  LayoutGrid,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we know the user is not authenticated
    if (status === "unauthenticated") {
      router.replace("/");
    }

    if (status === "authenticated" && session?.user?.id) {
      const fetchTeams = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get("/api/teams");
          setTeamsData(response.data);
        } catch (error) {
          console.error("Failed to fetch teams:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeams();
    }
  }, [status, session, router]);

  // Show loading indicator while checking auth
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex flex-col items-center gap-6 relative">
          <div className="absolute inset-0 rounded-full blur-3xl bg-primary/10 -z-10"></div>
          <svg
            className="animate-spin h-16 w-16 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg font-medium text-primary animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Loading your IoT workspace...
          </p>
        </div>
      </div>
    );
  }

  // Safety check - shouldn't render this if redirected, but just in case
  if (status === "unauthenticated") {
    return null;
  }

  // Augment the data to match the expected format
  const teams = teamsData.map((team: any) => ({
    ...team,
    _count: {
      members: team.members?.length || 0,
    },
  }));

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const userInitials = getInitials(session?.user?.name || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto py-8 px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-10 border-none overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/5 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                <div className="relative p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-lg">
                          <AvatarImage src={session?.user?.image || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                            Welcome back
                            {session?.user?.name
                              ? `, ${session.user.name.split(" ")[0]}`
                              : ""}
                          </h1>
                          <p className="text-muted-foreground mt-1">
                            Control your IoT ecosystem from one central
                            dashboard
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-2">
                        <Button
                          variant="outline"
                          className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 hover:border-primary/40 transition-all duration-300"
                          onClick={() => router.push("/profile")}
                        >
                          <Settings className="h-4 w-4 mr-2 text-primary" />
                          Settings
                        </Button>

                        <Button
                          variant="outline"
                          className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 hover:border-primary/40 transition-all duration-300"
                          onClick={() => signOut()}
                        >
                          <LogOut className="h-4 w-4 mr-2 text-primary" />
                          Sign Out
                        </Button>
                      </div>
                    </div>

                    <motion.div
                      className="hidden md:block"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Card className="border-none shadow-md bg-gradient-to-br from-background to-background/80 backdrop-blur-md">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-3">
                              <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Quick Stats</p>
                              <p className="text-sm text-muted-foreground">
                                Your IoT ecosystem
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-background/50 rounded-md p-3">
                              <p className="text-sm text-muted-foreground">
                                Teams
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {teams.length}
                              </p>
                            </div>
                            <div className="bg-background/50 rounded-md p-3">
                              <p className="text-sm text-muted-foreground">
                                Devices
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {teams.reduce(
                                  (sum: number, team: any) =>
                                    sum + (team._count?.devices || 0),
                                  0
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Your Teams
              </h2>
            </div>
            <TeamButtonsClient />
          </div>
          <Separator className="my-6 bg-primary/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TeamsList teams={teams} userId={session?.user?.id || ""} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
