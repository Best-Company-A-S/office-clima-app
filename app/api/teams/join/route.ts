import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for joining team
const joinTeamSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validation = joinTeamSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    const { inviteCode } = validation.data;
    const userId = parseInt(session.user.id);

    // Find the invite
    const invite = await prisma.teamInvite.findUnique({
      where: { code: inviteCode },
      include: { team: true },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 404 }
      );
    }

    // Check if user is already a member of the team
    const existingMembership = await prisma.teamMember.findFirst({
      where: {
        teamId: invite.teamId,
        userId,
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { error: "You are already a member of this team" },
        { status: 400 }
      );
    }

    // Check if user is already the owner of the team
    if (invite.team.ownerId === userId) {
      return NextResponse.json(
        { error: "You are the owner of this team" },
        { status: 400 }
      );
    }

    // Create team membership
    const membership = await prisma.teamMember.create({
      data: {
        teamId: invite.teamId,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      teamId: invite.teamId,
      teamName: invite.team.name,
    });
  } catch (error) {
    console.error("Error joining team:", error);
    return NextResponse.json({ error: "Failed to join team" }, { status: 500 });
  }
}
