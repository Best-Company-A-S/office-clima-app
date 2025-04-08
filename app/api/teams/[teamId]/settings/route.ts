import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

const settingsSchema = z.object({
  temperatureUnit: z.enum(["C", "F"]),
  humidityUnit: z.enum(["%", "g/m³"]),
  temperatureThreshold: z.coerce.number().min(0).max(50),
  humidityThreshold: z.coerce.number().min(0).max(100),
  temperatureAlert: z.boolean(),
  temperatureAlertThreshold: z.coerce.number().min(0).max(50),
  humidityAlert: z.boolean(),
  humidityAlertThreshold: z.coerce.number().min(0).max(100),
  temperatureAlertWebhook: z.string().url().optional().or(z.literal("")),
  humidityAlertWebhook: z.string().url().optional().or(z.literal("")),
  wallpaperUrl: z.string().url().optional().or(z.literal("")),
  wallpaperBlur: z.coerce.number().min(0).max(20),
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

    // Get team settings
    const settings = await prisma.teamSettings.findFirst({
      where: {
        teamId: params.teamId,
      },
    });

    if (!settings) {
      // Create default settings if they don't exist
      const defaultSettings = await prisma.teamSettings.create({
        data: {
          teamId: params.teamId,
          temperatureUnit: "C",
          humidityUnit: "%",
          temperatureThreshold: 25.0,
          humidityThreshold: 50.0,
          temperatureAlert: false,
          temperatureAlertThreshold: 25.0,
          humidityAlert: false,
          humidityAlertThreshold: 50.0,
          wallpaperBlur: 0,
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
    console.log("PATCH request received for teamId:", params.teamId);

    const session = await auth();
    console.log("Auth session:", JSON.stringify(session, null, 2));

    if (!session?.user?.id) {
      console.log("No user ID in session, unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("User ID from session:", session.user.id);

    try {
      const body = await req.json();
      console.log("Request body:", JSON.stringify(body, null, 2));

      // Extract only the fields defined in the schema
      const settingsData = {
        temperatureUnit: body.temperatureUnit,
        humidityUnit: body.humidityUnit,
        temperatureThreshold: body.temperatureThreshold,
        humidityThreshold: body.humidityThreshold,
        temperatureAlert: body.temperatureAlert,
        temperatureAlertThreshold: body.temperatureAlertThreshold,
        humidityAlert: body.humidityAlert,
        humidityAlertThreshold: body.humidityAlertThreshold,
        temperatureAlertWebhook: body.temperatureAlertWebhook || "",
        humidityAlertWebhook: body.humidityAlertWebhook || "",
        wallpaperUrl: body.wallpaperUrl || "",
        wallpaperBlur: body.wallpaperBlur,
      };

      console.log(
        "Filtered settings data:",
        JSON.stringify(settingsData, null, 2)
      );
      const validatedData = settingsSchema.parse(settingsData);
      console.log("Validated data:", JSON.stringify(validatedData, null, 2));

      // Get existing settings first
      const existingSettings = await prisma.teamSettings.findFirst({
        where: {
          teamId: params.teamId,
        },
      });

      console.log(
        "Existing settings:",
        JSON.stringify(existingSettings, null, 2)
      );

      if (!existingSettings) {
        console.log("No existing settings, creating new settings");
        // Create new settings if they don't exist
        const settings = await prisma.teamSettings.create({
          data: {
            teamId: params.teamId,
            ...validatedData,
          },
        });
        console.log("Created settings:", JSON.stringify(settings, null, 2));
        return NextResponse.json(settings);
      }

      console.log("Updating existing settings with ID:", existingSettings.id);
      // Update existing settings
      try {
        // Directly set values to ensure proper format
        console.log(
          "Before update - temperatureThreshold:",
          existingSettings.temperatureThreshold
        );
        console.log(
          "Attempting to update to:",
          validatedData.temperatureThreshold
        );

        // Try using Prisma's executeRaw for direct database update
        // This bypasses any potential caching or transformation issues
        const query = `
          UPDATE "TeamSettings"
          SET 
            "temperatureUnit" = $1,
            "humidityUnit" = $2,
            "temperatureThreshold" = $3,
            "humidityThreshold" = $4,
            "temperatureAlert" = $5,
            "temperatureAlertThreshold" = $6,
            "humidityAlert" = $7,
            "humidityAlertThreshold" = $8,
            "temperatureAlertWebhook" = $9,
            "humidityAlertWebhook" = $10,
            "wallpaperUrl" = $11,
            "wallpaperBlur" = $12,
            "updatedAt" = NOW()
          WHERE "id" = $13
        `;

        // Convert values to appropriate types
        const temperatureThreshold = Number(validatedData.temperatureThreshold);
        const humidityThreshold = Number(validatedData.humidityThreshold);
        const temperatureAlertThreshold = Number(
          validatedData.temperatureAlertThreshold
        );
        const humidityAlertThreshold = Number(
          validatedData.humidityAlertThreshold
        );
        const wallpaperBlur = Number(validatedData.wallpaperBlur);

        // Log the values being sent to the database
        console.log("SQL update values:", {
          temperatureThreshold,
          humidityThreshold,
          temperatureAlertThreshold,
          humidityAlertThreshold,
          wallpaperBlur,
        });

        // Execute the raw query
        await prisma.$executeRaw`
          UPDATE "TeamSettings"
          SET 
            "temperatureUnit" = ${validatedData.temperatureUnit},
            "humidityUnit" = ${validatedData.humidityUnit},
            "temperatureThreshold" = ${temperatureThreshold},
            "humidityThreshold" = ${humidityThreshold},
            "temperatureAlert" = ${validatedData.temperatureAlert},
            "temperatureAlertThreshold" = ${temperatureAlertThreshold},
            "humidityAlert" = ${validatedData.humidityAlert},
            "humidityAlertThreshold" = ${humidityAlertThreshold},
            "temperatureAlertWebhook" = ${
              validatedData.temperatureAlertWebhook || null
            },
            "humidityAlertWebhook" = ${
              validatedData.humidityAlertWebhook || null
            },
            "wallpaperUrl" = ${validatedData.wallpaperUrl || null},
            "wallpaperBlur" = ${wallpaperBlur},
            "updatedAt" = NOW()
          WHERE "id" = ${existingSettings.id}
        `;

        // After direct SQL update, fetch the latest data
        const updatedSettings = await prisma.teamSettings.findUnique({
          where: { id: existingSettings.id },
        });

        console.log(
          "After update - Check temperatureThreshold:",
          updatedSettings?.temperatureThreshold
        );
        console.log(
          "Updated settings:",
          JSON.stringify(updatedSettings, null, 2)
        );

        return NextResponse.json(updatedSettings);
      } catch (updateError: unknown) {
        console.error("Error updating settings:", updateError);
        if (updateError instanceof Error) {
          return new NextResponse(
            `Error updating settings: ${updateError.message}`,
            { status: 500 }
          );
        }
        return new NextResponse("Error updating settings", { status: 500 });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Zod validation error:", error.errors);
        return new NextResponse(
          "Invalid request data: " + JSON.stringify(error.errors),
          { status: 400 }
        );
      }

      console.error("[TEAM_SETTINGS_PATCH]", error);
      if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
      }
      return new NextResponse("Internal Error", { status: 500 });
    }
  } catch (outerError) {
    console.error("Outer error in PATCH handler:", outerError);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
