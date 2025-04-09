import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get all firmware entries, or filter by modelType if provided
    const { searchParams } = new URL(request.url);
    const modelType = searchParams.get("modelType");

    const firmwares = await prisma.firmware.findMany({
      where: modelType ? { modelType } : undefined,
      orderBy: [
        { status: "asc" }, // RELEASED comes before DRAFT
        { createdAt: "desc" }, // Newest first
      ],
    });

    return NextResponse.json(firmwares);
  } catch (error) {
    console.error("Error fetching firmware:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
