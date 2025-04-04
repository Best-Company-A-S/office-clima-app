import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for updating readings
const updateReadingSchema = z.object({
  temperature: z.number().min(-50).max(100).optional(),
  humidity: z.number().min(0).max(100).optional(),
  timestamp: z
    .number()
    .transform((val) => new Date(val * 1000))
    .optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const readingId = params.id;

    const reading = await prisma.$queryRaw`
      SELECT dr.*, d.name as device_name, d.room_id as room_id, r.name as room_name
      FROM "DeviceReading" dr
      JOIN "Device" d ON dr.device_id = d.device_id
      LEFT JOIN "Room" r ON d.room_id = r.id
      WHERE dr.id = ${readingId}
    `;

    if (!reading || !Array.isArray(reading) || reading.length === 0) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    return NextResponse.json(reading[0]);
  } catch (error) {
    console.error("[DEVICE_READING_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const readingId = params.id;
    const body = await request.json();

    // Validate request body
    const validation = updateReadingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    // Check if reading exists
    const existingReading = await prisma.$queryRaw`
      SELECT dr.*, d.room_id, r.team_id
      FROM "DeviceReading" dr
      JOIN "Device" d ON dr.device_id = d.device_id
      LEFT JOIN "Room" r ON d.room_id = r.id
      WHERE dr.id = ${readingId}
    `;

    if (
      !existingReading ||
      !Array.isArray(existingReading) ||
      existingReading.length === 0
    ) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    // Check user access to the team
    const reading = existingReading[0];
    if (reading.room_id && reading.team_id) {
      const userId = parseInt(session.user.id);
      const isTeamMember = await prisma.$queryRaw`
        SELECT * FROM "TeamMember" tm
        WHERE tm.team_id = ${reading.team_id}
        AND tm.user_id = ${userId}
      `;

      const isTeamOwner = await prisma.$queryRaw`
        SELECT * FROM "Team" t
        WHERE t.id = ${reading.team_id}
        AND t.owner_id = ${userId}
      `;

      if (
        (!isTeamMember ||
          !Array.isArray(isTeamMember) ||
          isTeamMember.length === 0) &&
        (!isTeamOwner ||
          !Array.isArray(isTeamOwner) ||
          isTeamOwner.length === 0)
      ) {
        return NextResponse.json(
          { error: "Unauthorized to update this reading" },
          { status: 403 }
        );
      }
    }

    // Update the reading
    const updatedReading = await prisma.$executeRaw`
      UPDATE "DeviceReading"
      SET 
        temperature = COALESCE(${validation.data.temperature}, temperature),
        humidity = COALESCE(${validation.data.humidity}, humidity),
        timestamp = COALESCE(${validation.data.timestamp}, timestamp)
      WHERE id = ${readingId}
    `;

    // Fetch the updated reading
    const result = await prisma.$queryRaw`
      SELECT * FROM "DeviceReading" WHERE id = ${readingId}
    `;

    return NextResponse.json((result as any[])[0]);
  } catch (error) {
    console.error("[DEVICE_READING_UPDATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const readingId = params.id;

    // Check if reading exists and get team info
    const existingReading = await prisma.$queryRaw`
      SELECT dr.*, d.room_id, r.team_id
      FROM "DeviceReading" dr
      JOIN "Device" d ON dr.device_id = d.device_id
      LEFT JOIN "Room" r ON d.room_id = r.id
      WHERE dr.id = ${readingId}
    `;

    if (
      !existingReading ||
      !Array.isArray(existingReading) ||
      existingReading.length === 0
    ) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    // Check user access to the team
    const reading = existingReading[0];
    if (reading.room_id && reading.team_id) {
      const userId = parseInt(session.user.id);
      const isTeamMember = await prisma.$queryRaw`
        SELECT * FROM "TeamMember" tm
        WHERE tm.team_id = ${reading.team_id}
        AND tm.user_id = ${userId}
      `;

      const isTeamOwner = await prisma.$queryRaw`
        SELECT * FROM "Team" t
        WHERE t.id = ${reading.team_id}
        AND t.owner_id = ${userId}
      `;

      if (
        (!isTeamMember ||
          !Array.isArray(isTeamMember) ||
          isTeamMember.length === 0) &&
        (!isTeamOwner ||
          !Array.isArray(isTeamOwner) ||
          isTeamOwner.length === 0)
      ) {
        return NextResponse.json(
          { error: "Unauthorized to delete this reading" },
          { status: 403 }
        );
      }
    }

    // Delete the reading
    await prisma.$executeRaw`
      DELETE FROM "DeviceReading" WHERE id = ${readingId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DEVICE_READING_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
