import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get teams where the user is a member
    const memberTeams = await prisma.teamMember.findMany({
      where: {
        userId: session.user.email,
      },
      include: {
        team: true,
      },
    });

    // Get teams where the user is an owner
    const ownedTeams = await prisma.team.findMany({
      where: {
        ownerId: session.user.email,
      },
    });

    // Combine teams (excluding duplicates)
    const memberTeamIds = memberTeams.map((membership) => membership.team.id);
    const uniqueOwnedTeams = ownedTeams.filter(
      (team) => !memberTeamIds.includes(team.id)
    );

    const teams = [
      ...memberTeams.map((membership) => membership.team),
      ...uniqueOwnedTeams,
    ];

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
