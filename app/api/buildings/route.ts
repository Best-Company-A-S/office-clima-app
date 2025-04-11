import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { validateBuildingData } from "@/lib/validations/building";

const prisma = new PrismaClient();

/**
 * GET /api/buildings
 *
 * Retrieves all buildings.
 * Can be filtered with query parameters: name, createdAfter
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const createdAfter = searchParams.get("createdAfter");

    // Build filter conditions
    const whereClause: any = {};

    if (name) {
      whereClause.name = {
        contains: name,
        mode: "insensitive", // Case-insensitive search
      };
    }

    if (createdAfter) {
      const date = new Date(createdAfter);
      if (!isNaN(date.getTime())) {
        whereClause.createdAt = {
          gte: date,
        };
      }
    }

    // Fetch buildings with filters
    const buildings = await prisma.building.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(buildings);
  } catch (error) {
    console.error("Failed to fetch buildings:", error);
    return NextResponse.json(
      { error: "Failed to fetch buildings" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/buildings
 *
 * Creates a new building.
 * Required fields: name
 * Optional fields: description, logoUrl, address
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    // Create the building
    const building = await prisma.building.create({
      data: {
        name: body.name,
        description: body.description || null,
        logoUrl: body.logoUrl || null,
        address: body.address || null,
      },
    });

    // Add the creator as admin member
    if (session.user.id) {
      await prisma.buildingMember.create({
        data: {
          buildingId: building.id,
          userId: session.user.id,
          invitedByUserId: session.user.id, // self-invited as creator
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(building, { status: 201 });
  } catch (error) {
    console.error("Failed to create building:", error);
    return NextResponse.json(
      { error: "Failed to create building" },
      { status: 500 }
    );
  }
}
