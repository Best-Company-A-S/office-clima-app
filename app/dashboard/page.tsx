"use client";

import { TeamsList } from "@/app/components/TeamsList";
import { Separator } from "@/components/ui/separator";
import { TeamButtonsClient } from "./_components/TeamButtonsClient";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
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

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Teams</h1>
        <div className="flex gap-3 items-center">
          <TeamButtonsClient />
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      <Separator className="mb-6" />

      <TeamsList teams={teams} userId={session?.user?.id || ""} />
    </div>
  );
};

export default DashboardPage;
