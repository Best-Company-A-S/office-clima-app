import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { validateBuildingData } from "@/lib/validations/building";

const prisma = new PrismaClient();

/**
 * Checks if the current user has admin access to the specified building
 * @param buildingId - The ID of the building to check permissions for
 * @param userId - The ID of the current user
 * @returns boolean - Whether the user has admin permissions
 */
async function hasAdminAccess(
  buildingId: string,
  userId: string
): Promise<boolean> {
  const member = await prisma.buildingMember.findFirst({
    where: {
      buildingId,
      userId,
      role: "ADMIN",
    },
  });

  return !!member;
}

/**
 * GET /api/buildings/[buildingId]
 *
 * Retrieves a specific building by ID.
 * Also returns basic membership info and settings.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { buildingId: string } }
) {
  try {
    // Extract the buildingId from the URL params
    const { buildingId } = params;

    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the building
    const building = await prisma.building.findUnique({
      where: {
        id: buildingId,
      },
    });

    if (!building) {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    // Check if user is a member of this building
    if (session.user.id) {
      const membership = await prisma.buildingMember.findFirst({
        where: {
          buildingId,
          userId: session.user.id,
        },
      });

      if (!membership) {
        return NextResponse.json(
          { error: "You don't have access to this building" },
          { status: 403 }
        );
      }
    }

    // Get building settings
    const settings = await prisma.buildingSettings.findFirst({
      where: {
        buildingId,
      },
    });

    // Get room count
    const roomCount = await prisma.room.count({
      where: {
        buildingId,
      },
    });

    // Get member count
    const memberCount = await prisma.buildingMember.count({
      where: {
        buildingId,
      },
    });

    // Return building with additional info
    return NextResponse.json({
      ...building,
      settings,
      stats: {
        roomCount,
        memberCount,
      },
    });
  } catch (error) {
    console.error("Failed to fetch building:", error);
    return NextResponse.json(
      { error: "Failed to fetch building" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/buildings/[buildingId]
 *
 * Updates a specific building by ID.
 * Requires admin permission.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { buildingId: string } }
) {
  try {
    // Extract the buildingId from the URL params
    const { buildingId } = params;

    // Check authentication
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin access
    const isAdmin = await hasAdminAccess(buildingId, session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to update this building" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate building data
    const validationResult = validateBuildingData(body);
    if (!validationResult.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.errors },
        { status: 400 }
      );
    }

    // Update the building
    const updatedBuilding = await prisma.building.update({
      where: {
        id: buildingId,
      },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        description:
          body.description !== undefined ? body.description : undefined,
        logoUrl: body.logoUrl !== undefined ? body.logoUrl : undefined,
        address: body.address !== undefined ? body.address : undefined,
      },
    });

    return NextResponse.json(updatedBuilding);
  } catch (error) {
    console.error("Failed to update building:", error);

    // Handle "not found" error specifically
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update building" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/buildings/[buildingId]
 *
 * Deletes a specific building by ID.
 * Requires admin permission.
 * This is a permanent action and will delete all associated data.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { buildingId: string } }
) {
  try {
    // Extract the buildingId from the URL params
    const { buildingId } = params;

    // Check authentication
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin access
    const isAdmin = await hasAdminAccess(buildingId, session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to delete this building" },
        { status: 403 }
      );
    }

    // Begin a transaction to ensure all related data is properly cleaned up
    await prisma.$transaction(async (tx) => {
      // Delete all building members
      await tx.buildingMember.deleteMany({
        where: { buildingId },
      });

      // Delete all building settings
      await tx.buildingSettings.deleteMany({
        where: { buildingId },
      });

      // Delete all building invitations
      await tx.buildingInvitation.deleteMany({
        where: { buildingId },
      });

      // Find all rooms in the building
      const rooms = await tx.room.findMany({
        where: { buildingId },
        select: { id: true },
      });

      const roomIds = rooms.map((room) => room.id);

      // Delete all device readings from devices in those rooms
      if (roomIds.length > 0) {
        // First find all devices
        const devices = await tx.device.findMany({
          where: { roomId: { in: roomIds } },
          select: { id: true },
        });

        const deviceIds = devices.map((device) => device.id);

        // Delete device readings
        if (deviceIds.length > 0) {
          await tx.deviceReading.deleteMany({
            where: { deviceId: { in: deviceIds } },
          });
        }

        // Delete devices
        await tx.device.deleteMany({
          where: { roomId: { in: roomIds } },
        });
      }

      // Delete room surveys and responses
      await tx.roomSurveyResponse.deleteMany({
        where: {
          surveyId: {
            in: await tx.roomSurvey
              .findMany({
                where: { roomId: { in: roomIds } },
                select: { id: true },
              })
              .then((surveys) => surveys.map((s) => s.id)),
          },
        },
      });

      await tx.roomSurvey.deleteMany({
        where: { roomId: { in: roomIds } },
      });

      // Delete rooms
      await tx.room.deleteMany({
        where: { buildingId },
      });

      // Finally, delete the building itself
      await tx.building.delete({
        where: { id: buildingId },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Building and all associated data has been deleted",
    });
  } catch (error) {
    console.error("Failed to delete building:", error);

    // Handle "not found" error specifically
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete building" },
      { status: 500 }
    );
  }
}
