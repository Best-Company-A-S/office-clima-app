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

const dashboardLayoutUpdateSchema = z.object({
  name: z.string().optional(),
  isDefault: z.boolean().optional(),
  layout: layoutSchema.optional(),
  teamId: z.string().optional(),
});

// GET /api/teams/[teamId]/layouts/[layoutId] - Get a specific layout
export async function GET(
  request: Request,
  { params }: { params: { teamId: string; layoutId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId, layoutId } = params;

    // Get the layout
    const layout = await prisma.dashboardLayout.findFirst({
      where: {
        id: layoutId,
        teamId,
      },
    });

    if (!layout) {
      return NextResponse.json({ error: "Layout not found" }, { status: 404 });
    }

    return NextResponse.json(layout);
  } catch (error) {
    console.error("Error fetching layout:", error);
    return NextResponse.json(
      { error: "Failed to fetch layout" },
      { status: 500 }
    );
  }
}

// PUT /api/teams/[teamId]/layouts/[layoutId] - Update a layout
export async function PUT(
  request: Request,
  { params }: { params: { teamId: string; layoutId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId, layoutId } = params;

    // Check if layout exists
    const existingLayout = await prisma.dashboardLayout.findFirst({
      where: {
        id: layoutId,
        teamId,
      },
    });

    if (!existingLayout) {
      return NextResponse.json({ error: "Layout not found" }, { status: 404 });
    }

    // Get the request body and validate it
    const body = await request.json();

    // Validate the request body
    try {
      dashboardLayoutUpdateSchema.parse(body);
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
          id: { not: layoutId },
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Update the layout
    const updatedLayout = await prisma.dashboardLayout.update({
      where: {
        id: layoutId,
      },
      data: {
        name: body.name,
        isDefault: body.isDefault,
        layout: body.layout,
      },
    });

    return NextResponse.json(updatedLayout);
  } catch (error) {
    console.error("Error updating layout:", error);
    return NextResponse.json(
      { error: "Failed to update layout" },
      { status: 500 }
    );
  }
}

// DELETE /api/teams/[teamId]/layouts/[layoutId] - Delete a layout
export async function DELETE(
  request: Request,
  { params }: { params: { teamId: string; layoutId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId, layoutId } = params;

    // Check if layout exists
    const existingLayout = await prisma.dashboardLayout.findFirst({
      where: {
        id: layoutId,
        teamId,
      },
    });

    if (!existingLayout) {
      return NextResponse.json({ error: "Layout not found" }, { status: 404 });
    }

    // Don't allow deleting the default layout
    if (existingLayout.isDefault) {
      return NextResponse.json(
        { error: "Cannot delete the default layout" },
        { status: 400 }
      );
    }

    // Delete the layout
    await prisma.dashboardLayout.delete({
      where: {
        id: layoutId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting layout:", error);
    return NextResponse.json(
      { error: "Failed to delete layout" },
      { status: 500 }
    );
  }
}
