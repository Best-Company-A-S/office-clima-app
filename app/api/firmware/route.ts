import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all firmware, ordered by createdAt descending (newest first)
    const firmwares = await prisma.firmware.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(firmwares);
  } catch (error) {
    console.error("Error fetching firmware:", error);
    return NextResponse.json(
      { error: "Failed to fetch firmware" },
      { status: 500 }
    );
  }
}
