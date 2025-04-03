import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for updating room
const updateRoomSchema = z.object({
  name: z.string().min(1, "Room name is required").max(100).optional(),
  description: z.string().max(500).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id);
  const roomId = params.roomId;

  try {
    // Get the room with its devices
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        team: {
          include: {
            members: {
              where: { userId },
            },
          },
        },
        devices: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is authorized to view this room
    const isOwner = room.team.ownerId === userId;
    const isMember = room.team.members.length > 0;

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Transform the response to include useful stats
    const transformedRoom = {
      id: room.id,
      name: room.name,
      description: room.description,
      teamId: room.teamId,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      devices: room.devices,
      _count: {
        devices: room.devices.length,
      },
    };

    return NextResponse.json(transformedRoom);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id);
  const roomId = params.roomId;

  try {
    // Get the room with its team to check permissions
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        team: {
          include: {
            members: {
              where: { userId },
            },
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is authorized to update this room
    const isOwner = room.team.ownerId === userId;
    const isMember = room.team.members.length > 0;

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();

    // Validate request body
    const validation = updateRoomSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    // Update the room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: validation.data,
      include: {
        devices: true,
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id);
  const roomId = params.roomId;

  try {
    // Get the room with its team to check permissions
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        team: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is authorized to delete this room (only team owner can delete)
    const isOwner = room.team.ownerId === userId;

    if (!isOwner) {
      return NextResponse.json(
        { error: "Only the team owner can delete rooms" },
        { status: 403 }
      );
    }

    // Update devices to remove room association
    await prisma.device.updateMany({
      where: { roomId },
      data: { roomId: null },
    });

    // Delete the room
    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
