import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
  }

  try {
    // Check if user is authorized to see rooms for this team (member or owner)
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          where: { userId: session.user.email },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isOwner = team.ownerId === session.user.email;
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
    const roomsWithCounts = rooms.map((room) => ({
      ...room,
      _count: {
        devices: room.devices.length,
      },
    }));

    return NextResponse.json(roomsWithCounts);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
