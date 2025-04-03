import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";

// Validation schema for team invite
const createInviteSchema = z.object({
  teamId: z.string().uuid("Invalid team ID"),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validation = createInviteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    const { teamId } = validation.data;

    // Check if user is the team owner
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    if (team.ownerId !== session.user.email) {
      return NextResponse.json(
        { error: "Only the team owner can generate invite codes" },
        { status: 403 }
      );
    }

    // Generate a unique invite code
    const uniqueCode = randomUUID().slice(0, 8);

    // Create the invite
    const invite = await prisma.teamInvite.create({
      data: {
        teamId,
        code: uniqueCode,
        createdById: session.user.email,
      },
    });

    return NextResponse.json(invite);
  } catch (error) {
    console.error("Error creating team invite:", error);
    return NextResponse.json(
      { error: "Failed to create team invite" },
      { status: 500 }
    );
  }
}
