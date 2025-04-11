import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
// PUT /api/teams/[teamId]/layouts/default/[layoutId] - Set a layout as the default
export async function PUT(
  request: Request,
  { params }: { params: { teamId: string; layoutId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId, layoutId } = await params;

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

    // Update all layouts to not be default
    await prisma.dashboardLayout.updateMany({
      where: {
        teamId,
      },
      data: {
        isDefault: false,
      },
    });

    // Set this layout as default
    const updatedLayout = await prisma.dashboardLayout.update({
      where: {
        id: layoutId,
      },
      data: {
        isDefault: true,
      },
    });

    return NextResponse.json(updatedLayout);
  } catch (error) {
    console.error("Error setting default layout:", error);
    return NextResponse.json(
      { error: "Failed to set default layout" },
      { status: 500 }
    );
  }
}
