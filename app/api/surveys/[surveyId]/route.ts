import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const surveyId = request.url.split("/").pop();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the survey and check permissions
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        room: {
          include: {
            team: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    // Check if user has permission to delete the survey
    const userId = parseInt(session.user?.id || "0", 10);
    const isOwner = survey.room.team.ownerId === userId;
    const isMember = survey.room.team.members.some(
      (member: { userId: number; teamId: string; id: string }) =>
        member.userId === userId
    );

    if (!isOwner && !isMember) {
      return NextResponse.json(
        { error: "You don't have permission to delete this survey" },
        { status: 403 }
      );
    }

    // Delete the survey
    await prisma.survey.delete({
      where: { id: surveyId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SURVEY_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
