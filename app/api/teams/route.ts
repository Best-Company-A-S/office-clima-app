import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = parseInt(session.user.id);

    // Get teams where the user is a member
    const memberTeams = await prisma.teamMember.findMany({
      where: {
        userId,
      },
      include: {
        team: true,
      },
    });

    // Get teams where the user is an owner
    const ownedTeams = await prisma.team.findMany({
      where: {
        ownerId: userId,
      },
    });

    // Combine teams (excluding duplicates)
    const memberTeamIds = memberTeams.map(
      (membership: { team: { id: string } }) => membership.team.id
    );
    const uniqueOwnedTeams = ownedTeams.filter(
      (team: { id: string }) => !memberTeamIds.includes(team.id)
    );

    const teams = [
      ...memberTeams.map((membership: { team: any }) => membership.team),
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
