import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

const settingsSchema = z.object({
  temperatureUnit: z.enum(["C", "F"]).optional(),
  humidityUnit: z.enum(["%", "g/m³"]).optional(),
  temperatureThreshold: z.coerce.number().min(0).max(50).optional(),
  humidityThreshold: z.coerce.number().min(0).max(100).optional(),
  temperatureAlert: z.boolean().optional(),
  temperatureAlertThreshold: z.coerce.number().min(0).max(50).optional(),
  humidityAlert: z.boolean().optional(),
  humidityAlertThreshold: z.coerce.number().min(0).max(100).optional(),
  temperatureAlertWebhook: z.string().url().optional().or(z.literal("")),
  humidityAlertWebhook: z.string().url().optional().or(z.literal("")),
  wallpaperUrl: z.string().url().optional().or(z.literal("")),
  wallpaperBlur: z.coerce.number().min(0).max(20).optional(),
  realtimeEnabled: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { teamId } = await params;

    // Get team settings
    const settings = await prisma.teamSettings.findFirst({
      where: {
        teamId: teamId,
      },
    });

    if (!settings) {
      // Create default settings if they don't exist
      const defaultSettings = await prisma.teamSettings.create({
        data: {
          teamId: teamId,
          temperatureUnit: "C",
          humidityUnit: "%",
          temperatureThreshold: 25.0,
          humidityThreshold: 50.0,
          temperatureAlert: false,
          temperatureAlertThreshold: 25.0,
          humidityAlert: false,
          humidityAlertThreshold: 50.0,
          wallpaperBlur: 0,
          realtimeEnabled: false,
        },
      });

      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("[TEAM_SETTINGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const validatedData = settingsSchema.parse(body);
    // Find the settings row by teamId
    const settings = await prisma.teamSettings.findFirst({ where: { teamId } });
    if (!settings) {
      return new NextResponse("Settings not found", { status: 404 });
    }
    // Update by id
    const updatedSettings = await prisma.teamSettings.update({
      where: { id: settings.id },
      data: validatedData,
    });
    return NextResponse.json(updatedSettings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        "Invalid request data: " + JSON.stringify(error.errors),
        { status: 400 }
      );
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
