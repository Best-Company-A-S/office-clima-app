import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const kioskModeSchema = z.object({
  enabled: z.boolean(),
});

export async function POST(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId } = params;
    const body = await request.json();

    // Validate request body
    const validation = kioskModeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { enabled } = validation.data;
    const userId = parseInt(session.user.id);

    // Check if user is a member of the team
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          where: { userId },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isOwner = team.ownerId === userId;
    const isMember = team.members.length > 0;

    if (!isOwner && !isMember) {
      return NextResponse.json(
        { error: "You don't have permission to update this team's settings" },
        { status: 403 }
      );
    }

    // Update or create team settings
    const settings = await prisma.teamSettings.upsert({
      where: {
        id: await prisma.teamSettings
          .findFirst({
            where: { teamId },
            select: { id: true },
          })
          .then((result) => result?.id ?? ""),
      },
      update: {
        kioskMode: enabled,
      },
      create: {
        teamId,
        kioskMode: enabled,
      },
    });

    return NextResponse.json({
      kioskMode: settings.kioskMode,
    });
  } catch (error) {
    console.error("Error updating kiosk mode:", error);
    return NextResponse.json(
      { error: "Failed to update kiosk mode" },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId } = params;
    const userId = parseInt(session.user.id);

    // Check if user is a member of the team
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          where: { userId },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isOwner = team.ownerId === userId;
    const isMember = team.members.length > 0;

    if (!isOwner && !isMember) {
      return NextResponse.json(
        { error: "You don't have permission to view this team's settings" },
        { status: 403 }
      );
    }

    // Get team settings
    const settings = await prisma.teamSettings.findFirst({
      where: { teamId },
    });

    return NextResponse.json({
      kioskMode: settings?.kioskMode || false,
    });
  } catch (error) {
    console.error("Error fetching kiosk mode status:", error);
    return NextResponse.json(
      { error: "Failed to fetch kiosk mode status" },
      { status: 500 }
    );
  }
}
