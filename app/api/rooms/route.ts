import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const roomSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  size: z.number().int().positive().optional(),
  capacity: z.number().int().positive().optional(),
  teamId: z.string(),
});

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
  }

  try {
    const userId = parseInt(session.user.id);

    // Check if user is authorized to see rooms for this team (member or owner)
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
        { error: "Unauthorized access to team" },
        { status: 403 }
      );
    }

    // Get all rooms for this team
    const rooms = await prisma.room.findMany({
      where: { teamId },
      include: {
        devices: true,
      },
    });

    // Transform the response to include device count
    const roomsWithCounts = rooms.map(
      (room: {
        id: string;
        name: string;
        description: string | null;
        teamId: string;
        createdAt: Date;
        updatedAt: Date;
        devices: any[];
      }) => ({
        ...room,
        _count: {
          devices: room.devices.length,
        },
      })
    );

    return NextResponse.json(roomsWithCounts);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, teamId, type, size, capacity } =
      roomSchema.parse(body);

    // ... existing code ...

    // Create the room
    const room = await prisma.room.create({
      data: {
        name,
        description,
        type,
        size,
        capacity,
        teamId,
      },
    });

    // ... existing code ...
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
