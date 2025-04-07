import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Validation schema for updating team
const updateTeamSchema = z.object({
  name: z.string().min(1, "Team name is required").max(100).optional(),
  description: z.string().max(500).optional(),
});

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teamId = request.url.split("/").pop();

  try {
    // Check if user is a member or owner of the team
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Check if user is authorized to view this team
    const userId = parseInt(session.user.id);
    const isOwner = team.ownerId === userId;
    const isMember = team.members.some(
      (member: { userId: number; teamId: string; id: string }) =>
        member.userId === userId
    );

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Add current user ID to response
    return NextResponse.json({
      ...team,
      currentUserId: session.user.id,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teamId = request.url.split("/").pop();

  try {
    // Verify user is the team owner
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const userId = parseInt(session.user.id);
    if (team.ownerId !== userId) {
      return NextResponse.json(
        { error: "Only the team owner can update team details" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validation = updateTeamSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    // Update team
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: validation.data,
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teamId = request.url.split("/").pop();

  try {
    // Verify user is the team owner
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const userId = parseInt(session.user.id);
    if (team.ownerId !== userId) {
      return NextResponse.json(
        { error: "Only the team owner can delete the team" },
        { status: 403 }
      );
    }

    // Delete team members
    await prisma.teamMember.deleteMany({
      where: { teamId },
    });

    // Delete team invites
    await prisma.teamInvite.deleteMany({
      where: { teamId },
    });

    // Delete the team
    await prisma.team.delete({
      where: { id: teamId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}
