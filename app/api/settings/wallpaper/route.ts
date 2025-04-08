import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get teamId from URL query params
    const url = new URL(req.url);
    const teamId = url.searchParams.get("teamId");

    if (!teamId) {
      return new NextResponse("Team ID is required", { status: 400 });
    }

    // Get team settings for the specified team
    const settings = await prisma.teamSettings.findFirst({
      where: {
        teamId,
      },
      select: {
        wallpaperUrl: true,
        wallpaperBlur: true,
      },
    });

    if (!settings) {
      // Return default settings if none found
      return NextResponse.json({
        wallpaperUrl: "",
        wallpaperBlur: 0,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("[WALLPAPER_SETTINGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
