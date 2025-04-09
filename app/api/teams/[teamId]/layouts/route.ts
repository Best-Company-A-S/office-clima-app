import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema for layout validation
const layoutItemSchema = z.object({
  i: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  minW: z.number().optional(),
  minH: z.number().optional(),
  maxW: z.number().optional(),
  maxH: z.number().optional(),
});

const layoutSchema = z.object({
  lg: z.array(layoutItemSchema).optional(),
  md: z.array(layoutItemSchema).optional(),
  sm: z.array(layoutItemSchema).optional(),
  xs: z.array(layoutItemSchema).optional(),
  xxs: z.array(layoutItemSchema).optional(),
});

const dashboardLayoutSchema = z.object({
  name: z.string(),
  isDefault: z.boolean().optional(),
  layout: layoutSchema,
  teamId: z.string(),
});

// GET /api/teams/[teamId]/layouts - Get all layouts for a team
export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId } = params;

    // Get all layouts for this team
    const layouts = await prisma.dashboardLayout.findMany({
      where: {
        teamId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(layouts);
  } catch (error) {
    console.error("Error fetching layouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch layouts" },
      { status: 500 }
    );
  }
}

// POST /api/teams/[teamId]/layouts - Create a new layout
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

    // Get the request body and validate it
    const body = await request.json();

    // Validate the request body
    try {
      dashboardLayoutSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request data", details: error },
        { status: 400 }
      );
    }

    // Set isDefault to false for all layouts if this one is default
    if (body.isDefault) {
      await prisma.dashboardLayout.updateMany({
        where: {
          teamId,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Create the new layout
    const newLayout = await prisma.dashboardLayout.create({
      data: {
        name: body.name,
        isDefault: body.isDefault || false,
        layout: body.layout,
        teamId,
      },
    });

    return NextResponse.json(newLayout, { status: 201 });
  } catch (error) {
    console.error("Error creating layout:", error);
    return NextResponse.json(
      { error: "Failed to create layout" },
      { status: 500 }
    );
  }
}
